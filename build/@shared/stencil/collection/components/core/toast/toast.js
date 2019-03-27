import { present, dismiss, eventMethod } from '../../../utils/ionic';
import { setAnimation, isIphoneX, lifecycleEvents, cloudinary, isWeb, translate } from '../../../utils';
import { getAppContext } from '../../../index';
const LIFECYCLE_MAP = {
    'ionToastDidPresent': 'ionViewDidEnter',
    'ionToastWillPresent': 'ionViewWillEnter',
    'ionToastWillDismiss': 'ionViewWillDismiss',
    'ionToastDidDismiss': 'ionViewDidDismiss'
};
export class YooToastComponent {
    constructor() {
        this.overlayId = 0;
    }
    lifecycle(modalEvent) {
        lifecycleEvents(modalEvent, this.usersElement, LIFECYCLE_MAP);
    }
    async present() {
        await present(this, 'toastEnter', () => {
            if (this.position === 'bottom') {
                return setAnimation('slide_vertical', this.outerContainerDiv, { open: true, up: true }).finished;
            }
            else if (this.position === 'top') {
                return setAnimation('slide_vertical', this.outerContainerDiv, { open: true }).finished;
            }
        });
        if (this.duration) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration);
        }
    }
    dismiss(data, role, overlayDismiss = false) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, overlayDismiss, 'toastLeave', () => {
            if (this.position === 'bottom') {
                return setAnimation('slide_vertical', this.outerContainerDiv, { open: false, up: true }).finished;
            }
            else if (this.position === 'top') {
                return setAnimation('slide_vertical', this.outerContainerDiv, { open: false }).finished;
            }
        });
    }
    onDidDismiss(callback) {
        return eventMethod(this.host, 'ionToastDidDismiss', callback);
    }
    onWillDismiss(callback) {
        return eventMethod(this.host, 'ionToastWillDismiss', callback);
    }
    componentWillLoad() {
        if (this.progressEvent) {
            this.progressEvent.subscribe((progress) => {
                this.updateProgress(progress);
            });
        }
        // If we are on web and the position is not specified, we default to showing the toast at the bottom
        if (isWeb() && this.position !== 'top') {
            this.position = 'bottom';
        }
    }
    updateProgress(progress) {
        this.progress = progress;
        if (this.progress === 100) {
            setTimeout(() => this.dismiss(), this.duration >= 0 ? this.duration : 0);
        }
    }
    onButtonClick() {
        this.dismiss(true);
    }
    renderCount() {
        return (h("div", { class: "count-container" }, this.count.toLocaleString()));
    }
    renderImage() {
        return (h("div", { class: "image-container" },
            h("yoo-img", { type: "back", class: "image", src: cloudinary(this.image, 50, 50) })));
    }
    renderIcon() {
        return (h("div", { class: "icon-container" },
            h("yoo-icon", { class: this.icon })));
    }
    renderExtraButtons(extraButton) {
        return (h("div", { class: 'extra-button ' + (extraButton.cssClass ? extraButton.cssClass() : ''), onClick: () => {
                if (extraButton.handler) {
                    extraButton.handler(this);
                }
            } },
            h("yoo-tooltip", { content: extraButton && extraButton.text && translate(extraButton.text()), cssOnly: true },
                h("yoo-icon", { class: extraButton.icon ? extraButton.icon() : '' }))));
    }
    hostData() {
        return {
            class: Object.assign({ [this.position]: this.position, [this.cssClass]: this.cssClass, ['progress']: this.progressEvent, 'header': this.position !== 'bottom' }, getAppContext(true))
        };
    }
    render() {
        return [
            h("div", { ref: (el) => this.outerContainerDiv = el, class: { 'outer-container': true, 'iphone-x': isIphoneX() }, style: { 'z-index': (20000 + this.overlayId).toString() } },
                this.count > 0 && this.renderCount(),
                this.image && this.renderImage(),
                this.icon && !this.image && this.renderIcon(),
                h("div", { class: "text-container" },
                    h("span", { class: "message" }, this.message)),
                this.extraButtons && this.extraButtons.filter(b => b.isVisible ? b.isVisible() : true).map(extraButton => this.renderExtraButtons(extraButton)),
                this.closeButtonText && this.showCloseButton && !this.progressEvent && (!this.extraButtons || this.extraButtons.length === 0) &&
                    h("div", { class: "button-container" },
                        h("span", { class: {
                                'danger': this.closeButtonText === translate('CANCEL'),
                                'success': this.closeButtonText === translate('OK')
                            }, onClick: () => this.onButtonClick() }, this.closeButtonText)),
                this.progressEvent && h("div", { class: "progressbar-wrapper" },
                    h("yoo-progress-bar-core", { shape: "line", percentColorScheme: false, progressValue: this.progress, progressAnimationDuration: 200, progressLabelColor: "success" }))),
            this.showBackdrop && h("div", { class: "overlay", style: { 'z-index': (19999 + this.overlayId).toString() } })
        ];
    }
    static get is() { return "yoo-toast"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "closeButtonText": {
            "type": String,
            "attr": "close-button-text"
        },
        "count": {
            "type": Number,
            "attr": "count"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "extraButtons": {
            "type": "Any",
            "attr": "extra-buttons"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "image": {
            "type": String,
            "attr": "image"
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "message": {
            "type": String,
            "attr": "message"
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayId": {
            "type": Number,
            "attr": "overlay-id"
        },
        "position": {
            "type": String,
            "attr": "position",
            "mutable": true
        },
        "present": {
            "method": true
        },
        "progress": {
            "state": true
        },
        "progressEvent": {
            "type": "Any",
            "attr": "progress-event"
        },
        "renameValue": {
            "state": true
        },
        "showBackdrop": {
            "type": Boolean,
            "attr": "show-backdrop"
        },
        "showCloseButton": {
            "type": Boolean,
            "attr": "show-close-button"
        },
        "willAnimate": {
            "type": Boolean,
            "attr": "will-animate"
        }
    }; }
    static get events() { return [{
            "name": "ionToastDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastDidDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastWillDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionToastDidPresent",
            "method": "lifecycle"
        }, {
            "name": "ionToastWillPresent",
            "method": "lifecycle"
        }, {
            "name": "ionToastWillDismiss",
            "method": "lifecycle"
        }, {
            "name": "ionToastDidDismiss",
            "method": "lifecycle"
        }]; }
    static get style() { return "/**style-placeholder:yoo-toast:**/"; }
}

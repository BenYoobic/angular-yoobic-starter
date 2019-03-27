import { h } from '../design-system.core.js';

import { cp as lifecycleEvents, cq as present, a8 as setAnimation, cr as dismiss, cs as eventMethod, W as isWeb, _ as cloudinary, m as translate, a5 as getAppContext, be as isIphoneX } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

const LIFECYCLE_MAP = {
    'ionToastDidPresent': 'ionViewDidEnter',
    'ionToastWillPresent': 'ionViewWillEnter',
    'ionToastWillDismiss': 'ionViewWillDismiss',
    'ionToastDidDismiss': 'ionViewDidDismiss'
};
class YooToastComponent {
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
    static get style() { return ":host .outer-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  bottom: unset;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  min-height: 2.25rem;\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid var(--stable-30, #E6E6E6);\n  background: var(--light, #FFFFFF);\n  font-size: var(--font-m, 15px); }\n  :host .outer-container .button-container {\n    padding: 0 1rem; }\n    :host .outer-container .button-container .danger {\n      color: var(--danger, #ff625f); }\n    :host .outer-container .button-container .success {\n      color: var(--success, #04CC99); }\n  :host .outer-container .text-container {\n    -ms-flex: 1;\n    flex: 1;\n    color: var(--dark, #2b3648); }\n  :host .outer-container .icon-container {\n    -ms-flex: 0.1;\n    flex: 0.1; }\n    :host .outer-container .icon-container yoo-icon {\n      display: block; }\n  :host .outer-container .image-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex: 0.25;\n    flex: 0.25;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n    :host .outer-container .image-container yoo-img {\n      width: 25px;\n      height: 25px;\n      border-radius: 50%; }\n  :host .outer-container .extra-button {\n    min-width: 55px;\n    min-height: 55px;\n    margin-right: 0.8rem;\n    margin-bottom: 0.5rem;\n    border-radius: 50%;\n    line-height: 55px;\n    text-align: center; }\n    :host .outer-container .extra-button.bg-danger {\n      background: var(--danger, #ff625f); }\n    :host .outer-container .extra-button.bg-success {\n      background: var(--success, #04CC99); }\n\n:host .overlay {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  background-color: var(--black, #000000);\n  opacity: 0.4; }\n\n:host(.bg-stable-light) .outer-container {\n  background: var(--stable-light, #f1f1f1); }\n\n:host(.bg-danger) .outer-container {\n  background: var(--danger, #ff625f); }\n  :host(.bg-danger) .outer-container .text-container {\n    -ms-flex: 1;\n    flex: 1;\n    color: var(--light, #FFFFFF); }\n  :host(.bg-danger) .outer-container .button-container {\n    padding: 0 1rem; }\n    :host(.bg-danger) .outer-container .button-container .danger {\n      color: var(--black, #000000); }\n    :host(.bg-danger) .outer-container .button-container .success {\n      color: var(--light, #FFFFFF); }\n\n:host(.global-actions) {\n  -webkit-box-shadow: 0 5px 30px 0 rgba(40, 47, 54, 0.2);\n  box-shadow: 0 5px 30px 0 rgba(40, 47, 54, 0.2); }\n  :host(.global-actions) .outer-container {\n    height: 2.75rem !important;\n    margin-bottom: 0 !important;\n    padding: 0;\n    border-radius: 5px;\n    overflow: hidden; }\n    :host(.global-actions) .outer-container .count-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      height: 100%;\n      padding: 0 1rem;\n      background: var(--success, #04CC99);\n      color: var(--light, #FFFFFF);\n      line-height: 44px; }\n    :host(.global-actions) .outer-container .text-container {\n      -ms-flex: 1;\n      flex: 1; }\n    :host(.global-actions) .outer-container .extra-button {\n      width: 2rem;\n      min-width: initial;\n      height: 2rem;\n      min-height: initial;\n      margin: 0;\n      font-size: var(--font-ll, 20px);\n      line-height: 2rem; }\n      :host(.global-actions) .outer-container .extra-button:last-child {\n        margin-right: 1rem; }\n\n:host(.bottom) .outer-container {\n  top: unset;\n  bottom: 0;\n  border-top: 1px solid var(--stable-30, #E6E6E6);\n  border-bottom: none; }\n\n:host(.progress) .outer-container {\n  -ms-flex-direction: column;\n  flex-direction: column;\n  height: inherit;\n  padding: 0.75rem 1rem; }\n  :host(.progress) .outer-container .text-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n    padding: 0.5rem 0rem; }\n    :host(.progress) .outer-container .text-container .message,\n    :host(.progress) .outer-container .text-container .icon-container {\n      display: initial;\n      margin: 0; }\n  :host(.progress) .outer-container .progressbar-wrapper {\n    width: 100%; }\n\n:host(.header) .outer-container.iphone-x {\n  padding-top: 2.75rem !important; }\n\n:host(.header.ios) .outer-container {\n  padding-top: 1.75rem; }\n\n:host(.web) {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%; }\n  :host(.web) .outer-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -ms-flex-align: center;\n    align-items: center;\n    width: 450px;\n    height: 60px;\n    margin-top: 4.25rem;\n    border-radius: 0.375rem;\n    -webkit-box-shadow: 0 5px 30px 0 rgba(40, 47, 54, 0.2);\n    box-shadow: 0 5px 30px 0 rgba(40, 47, 54, 0.2); }\n    :host(.web) .outer-container .message {\n      margin: 0 0 0 var(--padding-15, 0.9375rem); }\n    :host(.web) .outer-container .button {\n      margin-bottom: 0; }\n\n:host(.web.top.progress) .outer-container .message {\n  display: block;\n  white-space: nowrap; }\n\n:host(.web.top.header) .outer-container {\n  border-bottom: none; }\n  :host(.web.top.header) .outer-container .icon-container {\n    margin-bottom: 0; }\n\n:host(.web.bottom) .outer-container {\n  -ms-flex-item-align: end;\n  align-self: flex-end;\n  margin-top: 0;\n  margin-bottom: var(--padding-20, 1.25rem); }"; }
}

export { YooToastComponent as YooToast };

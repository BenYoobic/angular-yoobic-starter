import { setAnimation, querySelectorDeep, lifecycleEvents } from '../../../utils';
import { present, dismiss, eventMethod } from '../../../utils/ionic';
const LIFECYCLE_MAP = {
    'ionAlertDidPresent': 'ionViewDidEnter',
    'ionAlertWillPresent': 'ionViewWillEnter',
    'ionAlertWillDismiss': 'ionViewWillDismiss',
    'ionAlertDidDismiss': 'ionViewDidDismiss'
};
export class YooAlertComponent {
    lifecycle(modalEvent) {
        lifecycleEvents(modalEvent, this.usersElement, LIFECYCLE_MAP);
    }
    async present() {
        return present(this, 'alertEnter', () => {
            setAnimation('background_fade', querySelectorDeep(this.host, 'div.overlay'), { open: true, targetOpacity: 0.7 });
            return setAnimation('slide_down', querySelectorDeep(this.host, 'div.outer-container'), { open: true }).finished;
        });
    }
    async dismiss(data, role, overlayDismiss = false) {
        return dismiss(this, data, role, overlayDismiss, 'alertLeave', () => setAnimation('slide_down', querySelectorDeep(this.host, 'div.outer-container'), { open: false, up: false }).finished);
    }
    async onDidDismiss(callback) {
        return eventMethod(this.host, 'ionAlertDidDismiss', callback);
    }
    async onWillDismiss(callback) {
        return eventMethod(this.host, 'ionAlertWillDismiss', callback);
    }
    closeAlert(overlayDismiss = false) {
        this.dismiss(undefined, undefined, overlayDismiss);
    }
    onButtonClick(button) {
        const retData = { newName: this.renameValue };
        if (button.handler) {
            button.handler(retData);
        }
        if (button.cancel) {
            this.dismiss();
        }
        else {
            this.dismiss(retData);
        }
    }
    renderButtons() {
        return (h("div", { class: "buttons-container" }, (this.buttons || []).map((button, index) => h("div", { class: 'button ' + (button.cssClass ? button.cssClass : '') + (index === this.buttons.length - 1 ? ' last' : ''), onClick: () => this.onButtonClick(button) },
            h("span", { class: "button-text" }, button.text)))));
    }
    renderRename() {
        return (h("div", { class: "input-container" },
            h("yoo-form-input", { value: this.renameValue, onInputChanged: (ev) => this.renameValue = ev.detail, type: "text" })));
    }
    renderHeader() {
        return h("yoo-ion-toolbar", { color: "transparent", style: { 'z-index': (20001 + this.overlayId).toString() } },
            h("yoo-ion-buttons", { slot: "start" },
                h("yoo-ion-button", { class: "close button-clear", onClick: () => this.dismiss() },
                    h("yoo-icon", { slot: "icon-only", class: "yo-close" }))));
    }
    hostData() {
        return {
            class: {
                [this.cssClass]: this.cssClass
            }
        };
    }
    render() {
        return [
            this.cssClass && this.cssClass.includes('badge') ? this.renderHeader() : null,
            h("div", { class: "overlay", onClick: () => this.closeAlert(true), style: { 'z-index': (20000 + this.overlayId).toString() } }),
            h("div", { class: "outer-container", style: { 'z-index': (20000 + this.overlayId).toString() } },
                h("div", { class: "alert-container" },
                    this.icon ?
                        h("div", { class: 'icon-container' },
                            h("yoo-icon", { class: this.icon }))
                        : null,
                    this.img ?
                        h("div", { class: "img-container" },
                            h("yoo-avatar", { class: "large", imgSrc: this.img }))
                        : null,
                    h("div", { class: {
                            'header-container': true,
                            'with-image': this.img && this.img.length > 0
                        } }, this.header ? h("span", { class: "header", innerHTML: this.header }) : null),
                    this.message ?
                        h("div", { class: "message-container" },
                            h("span", { class: "message", innerHTML: this.message }))
                        : null,
                    this.rename ? this.renderRename() : null,
                    this.cssClass && this.cssClass.includes('badge') ? null : this.renderButtons()))
        ];
    }
    static get is() { return "yoo-alert"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "buttons": {
            "type": "Any",
            "attr": "buttons"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "img": {
            "type": String,
            "attr": "img"
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
        "present": {
            "method": true
        },
        "rename": {
            "type": Boolean,
            "attr": "rename"
        },
        "renameValue": {
            "type": String,
            "attr": "rename-value",
            "mutable": true
        },
        "willAnimate": {
            "type": Boolean,
            "attr": "will-animate"
        }
    }; }
    static get events() { return [{
            "name": "ionAlertDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionAlertWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionAlertWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionAlertDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionAlertDidPresent",
            "method": "lifecycle"
        }, {
            "name": "ionAlertWillPresent",
            "method": "lifecycle"
        }, {
            "name": "ionAlertWillDismiss",
            "method": "lifecycle"
        }, {
            "name": "ionAlertDidDismiss",
            "method": "lifecycle"
        }]; }
    static get style() { return "/**style-placeholder:yoo-alert:**/"; }
}

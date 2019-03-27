const h = window.DesignSystem.h;

import { cp as lifecycleEvents, cq as present, a8 as setAnimation, L as querySelectorDeep, cr as dismiss, cs as eventMethod, cu as removeLastOverlay, cv as createOverlay, cw as dismissOverlay, cx as getTopOverlay } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

const LIFECYCLE_MAP = {
    'ionAlertDidPresent': 'ionViewDidEnter',
    'ionAlertWillPresent': 'ionViewWillEnter',
    'ionAlertWillDismiss': 'ionViewWillDismiss',
    'ionAlertDidDismiss': 'ionViewDidDismiss'
};
class YooAlertComponent {
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
    static get style() { return "\@-webkit-keyframes bounce {\n  0% {\n    -webkit-transform: translateY(2rem);\n    transform: translateY(2rem);\n    opacity: 0; }\n  30% {\n    -webkit-transform: translateY(-2rem);\n    opacity: 0.5; }\n  60%,\n  100% {\n    -webkit-transform: translateY(0);\n    opacity: 1; }\n  80% {\n    -webkit-transform: translateY(-0.3rem); } }\n\n\@keyframes bounce {\n  0% {\n    -webkit-transform: translateY(2rem);\n    transform: translateY(2rem);\n    opacity: 0; }\n  30% {\n    -webkit-transform: translateY(-2rem);\n    transform: translateY(-2rem);\n    opacity: 0.5; }\n  60%,\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n    opacity: 1; }\n  80% {\n    -webkit-transform: translateY(-0.3rem);\n    transform: translateY(-0.3rem); } }\n\n:host .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.7);\n  z-index: 20001; }\n\n:host .outer-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  :host .outer-container .alert-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: 70%;\n    max-width: 270px;\n    min-height: 90px;\n    padding-top: 1rem;\n    border-radius: 8px;\n    background: var(--light, #FFFFFF); }\n    :host .outer-container .alert-container .img-container {\n      display: -ms-flexbox;\n      display: flex;\n      position: absolute;\n      top: -4rem;\n      left: 33%;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 5.5rem;\n      height: 5.5rem;\n      border-radius: 50%;\n      background-color: white;\n      -webkit-animation: bounce 0.7s ease-out 0.3s 1 normal both;\n      animation: bounce 0.7s ease-out 0.3s 1 normal both; }\n      :host .outer-container .alert-container .img-container yoo-avatar {\n        position: absolute;\n        top: 10%; }\n    :host .outer-container .alert-container .header-container,\n    :host .outer-container .alert-container .message-container,\n    :host .outer-container .alert-container .icon-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: center;\n      justify-content: center; }\n    :host .outer-container .alert-container .icon-container {\n      font-size: var(--icon-alert, 50px); }\n    :host .outer-container .alert-container .header-container {\n      padding: 0 0.5rem;\n      color: var(--dark, #2b3648);\n      font-size: var(--font-l, 17px);\n      font-weight: 700;\n      text-align: center; }\n      :host .outer-container .alert-container .header-container span {\n        color: var(--black, #000000); }\n      :host .outer-container .alert-container .header-container.with-image {\n        padding-top: 1rem; }\n    :host .outer-container .alert-container .message-container {\n      padding: 0.5rem 1rem 0;\n      color: var(--text-color, #807f83);\n      font-size: var(--font-m, 15px);\n      text-align: center; }\n    :host .outer-container .alert-container .input-container {\n      padding: 1rem 1rem 0; }\n    :host .outer-container .alert-container .buttons-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: distribute;\n      justify-content: space-around;\n      height: 43px;\n      margin-top: 1.5rem;\n      border-top: 1px solid var(--stable-light, #f1f1f1);\n      color: var(--dark, #2b3648);\n      font-weight: 700; }\n      :host .outer-container .alert-container .buttons-container .button {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        width: 100%;\n        border-right: 1px solid var(--stable-light, #f1f1f1);\n        color: var(--black, #000000); }\n        :host .outer-container .alert-container .buttons-container .button.last {\n          border-right: none; }\n        :host .outer-container .alert-container .buttons-container .button.danger {\n          font-weight: 300; }\n\n:host yoo-ion-toolbar yoo-icon.yo-close {\n  color: var(--always-light, #FFFFFF); }\n\n:host(.photo-editor-alert) .outer-container .alert-container .buttons-container .button.danger {\n  color: var(--dark, #2b3648);\n  font-weight: normal; }\n\n:host(.photo-editor-alert) .outer-container .alert-container .buttons-container .button.last {\n  color: var(--danger, #ff625f);\n  font-weight: normal; }\n\n:host(.badge) yoo-ion-toolbar {\n  padding: 0; }\n\n:host(.badge) .outer-container .alert-container .header-container {\n  font-weight: 400; }\n\n:host(.badge) .outer-container .alert-container .message-container {\n  color: var(--stable, #adadad); }\n\n:host(.timed-lesson) .outer-container .alert-container .buttons-container .last {\n  color: var(--danger-light, #F46885);\n  font-weight: 400; }"; }
}

class YooIonAlertControllerComponent {
    constructor() {
        this.alerts = new Map();
    }
    alertWillPresent(ev) {
        this.alerts.set(ev.target.overlayId, ev.target);
    }
    alertWillDismiss(ev) {
        this.alerts.delete(ev.target.overlayId);
    }
    escapeKeyUp(event) {
        if (event && event.key === 'escape') {
            removeLastOverlay(this.alerts);
        }
    }
    /**
     * Create an alert overlay with alert options
     */
    async create(opts) {
        return createOverlay(this.doc.createElement('yoo-alert'), opts);
    }
    /**
     * Dismiss the open alert overlay.
     */
    async dismiss(data, role, alertId = -1) {
        return dismissOverlay(data, role, this.alerts, alertId, 'YOO-ALERT');
    }
    /**
     * Get the most recently opened alert overlay.
     */
    async getTop() {
        return getTopOverlay(this.alerts);
    }
    static get is() { return "yoo-ion-alert-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
    static get listeners() { return [{
            "name": "body:ionModalWillPresent",
            "method": "alertWillPresent"
        }, {
            "name": "body:ionAlertWillDismiss",
            "method": "alertWillDismiss"
        }, {
            "name": "body:ionAlertDidUnload",
            "method": "alertWillDismiss"
        }, {
            "name": "body:keyup",
            "method": "escapeKeyUp"
        }]; }
}

export { YooAlertComponent as YooAlert, YooIonAlertControllerComponent as YooIonAlertController };

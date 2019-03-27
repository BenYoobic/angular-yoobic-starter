const h = window.DesignSystem.h;

import { at as showImageModal, m as translate, x as getSession } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooContactDetailComponent {
    onSendTextMessage() {
        this.textMessage.emit(this.item);
        if (this.item && this.item.telephone) {
            window.open('sms:' + this.item.telephone, '_system');
        }
    }
    onCall() {
        this.call.emit(this.item);
        if (this.item && this.item.telephone) {
            window.open('tel:' + this.item.telephone, '_system');
        }
    }
    onEmail() {
        this.email.emit(this.item);
        if (this.item && this.item.email) {
            window.open('mailto:' + this.item.email, '_system');
        }
    }
    onAvatarSelect() {
        if (this.item && this.item.imageData) {
            showImageModal(this.item.imageData);
        }
    }
    onChat() {
        this.chat.emit(this.item);
    }
    render() {
        return h("div", { class: "container" },
            h("yoo-avatar", { class: "large", user: this.item, onClick: ev => this.onAvatarSelect() }),
            h("div", { class: "user-name" },
                this.item.firstName,
                " ",
                this.item.lastName),
            this.item.role ? h("div", { class: "user-role" }, translate(this.item.role)) : null,
            h("div", { class: "buttons-container" },
                this.isUser && getSession().userId !== this.item._id && this.canChat ?
                    h("div", { class: "button-container" },
                        h("yoo-button", { class: "icon-only gradient-success", icon: "yo-chat", onClick: ev => this.onChat() }),
                        h("span", { class: "button-title" }, translate('MESSAGE')))
                    : null,
                h("div", { class: "button-container" },
                    h("yoo-button", { disabled: !this.item.telephone, class: "icon-only gradient-success", icon: "yo-sms", onClick: ev => this.onSendTextMessage() }),
                    h("span", { class: "button-title" }, translate('SMS'))),
                h("div", { class: "button-container" },
                    h("yoo-button", { disabled: !this.item.telephone, class: "icon-only gradient-success", icon: "yo-phone", onClick: ev => this.onCall() }),
                    h("span", { class: "button-title" }, translate('CALL'))),
                h("div", { class: "button-container" },
                    h("yoo-button", { disabled: !this.item.email, class: "icon-only gradient-success", icon: "yo-email", onClick: ev => this.onEmail() }),
                    h("span", { class: "button-title" }, translate('EMAIL')))));
    }
    static get is() { return "yoo-contact-detail"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "canChat": {
            "type": Boolean,
            "attr": "can-chat"
        },
        "host": {
            "elementRef": true
        },
        "isUser": {
            "type": Boolean,
            "attr": "is-user"
        },
        "item": {
            "type": "Any",
            "attr": "item"
        }
    }; }
    static get events() { return [{
            "name": "chat",
            "method": "chat",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "email",
            "method": "email",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "call",
            "method": "call",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "textMessage",
            "method": "textMessage",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .container {\n  margin-top: 1rem;\n  text-align: center; }\n  :host .container .user-name {\n    line-height: 1.3125rem; }\n  :host .container .user-role {\n    color: var(--stable, #adadad);\n    font-size: var(--font-s, 13px);\n    line-height: 1rem; }\n  :host .container .buttons-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n    margin: 2rem; }\n    :host .container .buttons-container .button-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-line-pack: center;\n      align-content: center;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center; }\n      :host .container .buttons-container .button-container .button-title {\n        padding-top: var(--padding-5, 0.3125rem);\n        color: var(--success, #04CC99);\n        font-size: var(--font-xs, 10px); }"; }
}

export { YooContactDetailComponent as YooContactDetail };

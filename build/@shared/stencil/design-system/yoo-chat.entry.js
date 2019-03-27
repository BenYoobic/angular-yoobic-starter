const h = window.DesignSystem.h;

import { k as isCordova, o as isIOS, aD as enableKeyboardResize, b7 as disableKeyboardResize, ae as isNullOrUndefined, x as getSession, ba as showActionSheet, m as translate, W as isWeb, be as isIphoneX, L as querySelectorDeep, bO as getPicture, bM as PictureSourceType, bN as MediaType, bS as isIE, bT as isIE11, bU as getVideoDevices, a_ as showModal, a5 as getAppContext, bd as getUserDisplayName } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooChatComponent {
    constructor() {
        this.messages = []; // suppose that messages are ordered to most recent to the older one
        this.loaded = false;
        this.selectedTimeTokens = [];
    }
    async scrollToBottom() {
        if (this.scroll) {
            if (this.loaded) {
                this.scroll.scrollToPoint(0, 9999, 0);
            }
            else {
                setTimeout(() => this.scroll.scrollToPoint(0, 9999, 0), 200);
            }
        }
    }
    async scrollToTop() {
        if (this.scroll) {
            if (this.loaded) {
                this.scroll.scrollToPoint(0, 0, 0);
            }
            else {
                setTimeout(() => this.scroll.scrollToPoint(0, 0, 0), 200);
            }
        }
    }
    async componentDidLoad() {
        this.scroll = await this.ionConent.getScrollElement();
        if (isCordova() && isIOS() && this.enableKeyboardResizing) {
            enableKeyboardResize(Keyboard);
        }
    }
    componentDidUnload() {
        if (isCordova() && isIOS() && this.enableKeyboardResizing) {
            disableKeyboardResize(Keyboard);
        }
    }
    isSomeoneTyping() {
        return this.usersTyping && Object.keys(this.usersTyping).length > 0;
    }
    getLastMessage(index) {
        if (index === (this.newMessageArr.length - 1)) {
            return true;
        }
        else if (this.newMessageArr[index].author !== this.newMessageArr[index + 1].author) {
            return true;
        }
        else {
            return false;
        }
    }
    getFirstMessage(index) {
        if (index === 0) {
            return true;
        }
        else if (this.newMessageArr[index].author !== this.newMessageArr[index - 1].author) {
            return true;
        }
        else {
            return false;
        }
    }
    isNextImage(index) {
        return this.newMessageArr && this.newMessageArr[index + 1] && !isNullOrUndefined(this.newMessageArr[index + 1].img);
    }
    onSendText(ev) {
        ev.stopPropagation();
        this.sendText.emit(ev.detail);
    }
    onSendPicture(ev) {
        ev.stopPropagation();
        this.sendChatPicture.emit(ev.detail);
    }
    onPullToRefresh() {
        this.loadMoreClicked.emit(true);
        setTimeout(() => {
            this.refresher.complete();
        }, 300);
    }
    onCloseDeleteMode() {
        this.selectedTimeTokens = [];
        this.closeDeleteMode.emit(false);
    }
    onSelectMessages(allOrNone = true) {
        this.selectedTimeTokens = [];
        if (allOrNone) {
            this.messages.forEach((m, i) => {
                if (!m.deleted && m.author && m.author._id === getSession().user._id) {
                    this.selectedTimeTokens.push(m.timetoken);
                }
            });
        }
        this.selected.emit(this.selectedTimeTokens);
    }
    onClickMessage(ev, timetoken) {
        let isSelected = ev.detail || false;
        this.selectedTimeTokens = [];
        this.messages.forEach((m, i) => {
            if ((m.timetoken !== timetoken && m.selected) || (m.timetoken === timetoken && isSelected)) {
                this.selectedTimeTokens.push(m.timetoken);
            }
        });
        this.selected.emit(this.selectedTimeTokens);
    }
    onDeleteMessages() {
        if (this.selectedTimeTokens.length > 0) {
            showActionSheet([{
                    text: translate('DELETE'),
                    cssClass: 'danger',
                    handler: () => {
                        this.selectedTimeTokens = [];
                        this.deleteMessages.emit(true);
                    }
                }], 'stable');
        }
    }
    onIsTyping(ev) {
        let isTyping = ev && ev.detail || false;
        this.isTyping.emit(isTyping);
    }
    renderReadOnlyHeader() {
        return h("yoo-ion-header", { class: "shadow", "no-border": true },
            h("yoo-ion-toolbar", { color: "light" },
                (this.closeIcon || !isWeb()) &&
                    h("yoo-ion-buttons", { slot: "start" },
                        h("yoo-ion-button", { color: "dark", onClick: () => this.closePage.emit(true) },
                            h("yoo-icon", { slot: "icon-only", class: this.closeIcon ? this.closeIcon : "yo-left" }))),
                h("yoo-ion-title", null, this.heading),
                h("yoo-ion-buttons", { slot: "end" },
                    h("yoo-ion-button", { color: "dark", onClick: () => this.showMore.emit(true) },
                        h("yoo-icon", { slot: "icon-only", class: "yo-more" })))));
    }
    renderEditableHeader() {
        return h("yoo-ion-header", { class: "shadow delete-mode-header", "no-border": true },
            h("yoo-ion-toolbar", { color: "success" },
                h("yoo-ion-buttons", { slot: "start" },
                    h("yoo-ion-button", { color: "success", onClick: () => this.onSelectMessages(true) }, translate('SELECTALL'))),
                h("yoo-ion-buttons", { slot: "end" },
                    h("yoo-ion-button", { color: "success", onClick: () => this.onCloseDeleteMode() }, translate('CANCEL')))));
    }
    renderInputBar() {
        return h("yoo-input-bar", { class: "footer", placeholder: this.inputPlaceHolder, keepFocusAfterAction: true, onIsTyping: (isTyping) => { this.onIsTyping(isTyping); }, onSendText: (ev) => this.onSendText(ev), onSendPicture: (ev) => this.onSendPicture(ev) });
    }
    renderDeleteModeFooter() {
        return h("div", { class: 'delete-mode-footer ' + (this.selectedTimeTokens.length > 0 ? 'enabled' : 'disabled') },
            h("div", { class: "inner-container", onClick: () => this.onDeleteMessages() },
                h("yoo-icon", { class: "yo-delete" }),
                " ",
                translate(this.selectedTimeTokens.length <= 1 ? 'DELETE_MESSAGE' : 'DELETE_MESSAGES', { number: this.selectedTimeTokens.length })));
    }
    renderTypingIcon() {
        return [
            h("div", { class: "user-typing" },
                h("div", { class: "typing-indicator" },
                    h("span", null),
                    h("span", null),
                    h("span", null)))
        ];
    }
    renderUserName(user) {
        return user && user.firstName && user.lastName && h("div", { class: "username" }, `${user.firstName} ${user.lastName} ${translate('ISTYPING')}...`);
    }
    renderUser(user) {
        return (h("div", { class: "user-container" }, user && h("yoo-avatar", { class: "small", user: user })));
    }
    renderIsTypingMultiple() {
        return Object.keys(this.usersTyping).map((key) => {
            return [
                this.renderUserName(this.usersTyping[key]),
                h("div", { class: "bottom-part" },
                    this.renderUser(this.usersTyping[key]),
                    this.renderTypingIcon())
            ];
        });
    }
    renderSomeoneIsTyping() {
        return [
            h("div", { class: "someone-typing-container" }, this.isMultiple ? this.renderIsTypingMultiple() : this.renderTypingIcon())
        ];
    }
    renderChatMessage() {
        this.newMessageArr = this.messages.filter(m => !m.deleted);
        return this.newMessageArr.map((m, index) => {
            return h("yoo-chat-message", { onConferenceMessageClicked: (ev) => { this.conferenceMessageClicked.emit(ev.detail); }, message: m, isLast: this.getLastMessage(index), isFirst: this.getFirstMessage(index), onClicked: (ev) => this.onClickMessage(ev, m.timetoken), isNextImage: this.isNextImage(index), isGroup: this.isMultiple });
        });
    }
    render() {
        return [
            this.deleteModeEnabled ? this.renderEditableHeader() : this.renderReadOnlyHeader(),
            h("yoo-ion-content", { class: "bg-light", forceOverscroll: false, ref: (el) => this.ionConent = el },
                h("yoo-ion-refresher", { slot: "fixed", onIonRefresh: () => this.onPullToRefresh(), disabled: this.deleteModeEnabled, ref: (el) => this.refresher = el },
                    h("yoo-ion-refresher-content", { pullingText: translate('PULLTOREFRESH') })),
                h("div", { class: { 'messages-container': true, 'iphone-x': isIphoneX() } },
                    this.messages && this.renderChatMessage(),
                    this.isSomeoneTyping() && this.renderSomeoneIsTyping())),
            this.deleteModeEnabled ? this.renderDeleteModeFooter() : this.renderInputBar()
        ];
    }
    static get is() { return "yoo-chat"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "closeIcon": {
            "type": String,
            "attr": "close-icon"
        },
        "deleteModeEnabled": {
            "type": Boolean,
            "attr": "delete-mode-enabled"
        },
        "displayLoadMore": {
            "type": Boolean,
            "attr": "display-load-more"
        },
        "enableKeyboardResizing": {
            "type": Boolean,
            "attr": "enable-keyboard-resizing"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "inputPlaceHolder": {
            "type": String,
            "attr": "input-place-holder"
        },
        "isMultiple": {
            "type": Boolean,
            "attr": "is-multiple"
        },
        "loaded": {
            "state": true
        },
        "messages": {
            "type": "Any",
            "attr": "messages"
        },
        "scrollHeight": {
            "state": true
        },
        "scrollToBottom": {
            "method": true
        },
        "scrollToTop": {
            "method": true
        },
        "usersTyping": {
            "type": "Any",
            "attr": "users-typing"
        }
    }; }
    static get events() { return [{
            "name": "loadMoreClicked",
            "method": "loadMoreClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "sendText",
            "method": "sendText",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "sendChatPicture",
            "method": "sendChatPicture",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "closePage",
            "method": "closePage",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "showMore",
            "method": "showMore",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "closeDeleteMode",
            "method": "closeDeleteMode",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "selected",
            "method": "selected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "deleteMessages",
            "method": "deleteMessages",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "conferenceMessageClicked",
            "method": "conferenceMessageClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "isTyping",
            "method": "isTyping",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --typing-username-padding-left: 45px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  height: 100%; }\n\n\@-webkit-keyframes slide-up {\n  0% {\n    -webkit-transform: translateY(3rem);\n    transform: translateY(3rem); }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n\@keyframes slide-up {\n  0% {\n    -webkit-transform: translateY(3rem);\n    transform: translateY(3rem); }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n\@-webkit-keyframes slide-down {\n  0% {\n    -webkit-transform: translateY(-3rem);\n    transform: translateY(-3rem); }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n\@keyframes slide-down {\n  0% {\n    -webkit-transform: translateY(-3rem);\n    transform: translateY(-3rem); }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n  :host .chat-header {\n    text-align: center; }\n  :host .delete-mode-header {\n    -webkit-animation: slide-down 0.4s ease;\n    animation: slide-down 0.4s ease; }\n  :host .load-more {\n    -ms-flex-pack: center;\n    justify-content: center;\n    background: var(--dark-10, #e6eaf0);\n    color: var(--text-color, #807f83); }\n  :host .messages-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    margin-top: 0.2rem;\n    padding: 0.3125rem 0.625rem 3.625rem 0.625rem; }\n    :host .messages-container.iphone-x {\n      padding-bottom: 4.25rem; }\n    :host .messages-container .someone-typing-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      padding-top: var(--padding-10, 0.625rem); }\n      :host .messages-container .someone-typing-container .user-typing {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        width: 56px;\n        height: 36px;\n        border-radius: 18px;\n        background-color: var(--stable-light); }\n        :host .messages-container .someone-typing-container .user-typing .typing-indicator {\n          background-color: #E6E7ED;\n          will-change: transform;\n          width: auto;\n          border-radius: 50px;\n          display: -ms-flexbox;\n          display: flex;\n          margin: 0 auto;\n          position: relative;\n          -webkit-animation: 2s bulge infinite ease-out;\n          animation: 2s bulge infinite ease-out; }\n          :host .messages-container .someone-typing-container .user-typing .typing-indicator::before, :host .messages-container .someone-typing-container .user-typing .typing-indicator::after {\n            content: '';\n            position: absolute;\n            bottom: -2px;\n            left: -2px;\n            height: 8px;\n            width: 8px;\n            border-radius: 50%;\n            background-color: #E6E7ED; }\n          :host .messages-container .someone-typing-container .user-typing .typing-indicator::after {\n            height: 3px;\n            width: 3px;\n            left: -3px;\n            bottom: -3px; }\n          :host .messages-container .someone-typing-container .user-typing .typing-indicator span {\n            height: 8px;\n            width: 8px;\n            float: left;\n            margin: 0 1px;\n            background-color: #9E9EA1;\n            display: block;\n            border-radius: 50%;\n            opacity: 0.4; }\n            :host .messages-container .someone-typing-container .user-typing .typing-indicator span:nth-of-type(1) {\n              -webkit-animation: 1s blink infinite 0.3333s;\n              animation: 1s blink infinite 0.3333s; }\n            :host .messages-container .someone-typing-container .user-typing .typing-indicator span:nth-of-type(2) {\n              -webkit-animation: 1s blink infinite 0.6666s;\n              animation: 1s blink infinite 0.6666s; }\n            :host .messages-container .someone-typing-container .user-typing .typing-indicator span:nth-of-type(3) {\n              -webkit-animation: 1s blink infinite 0.9999s;\n              animation: 1s blink infinite 0.9999s; }\n\n\@-webkit-keyframes blink {\n  50% {\n    opacity: 1; } }\n\n\@keyframes blink {\n  50% {\n    opacity: 1; } }\n\n\@-webkit-keyframes bulge {\n  50% {\n    -webkit-transform: scale(1.05);\n    transform: scale(1.05); } }\n\n\@keyframes bulge {\n  50% {\n    -webkit-transform: scale(1.05);\n    transform: scale(1.05); } }\n      :host .messages-container .someone-typing-container .username {\n        padding-bottom: 3px;\n        padding-left: var(--typing-username-padding-left);\n        color: var(--text-color, #807f83);\n        font-size: var(--font-s, 13px); }\n      :host .messages-container .someone-typing-container .bottom-part {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        padding-left: var(--padding-5, 0.3125rem); }\n  :host .delete-mode-footer {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    min-height: 3rem;\n    background: var(--light, #FFFFFF);\n    font-weight: 300;\n    -webkit-box-shadow: var(--footer-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15));\n    box-shadow: var(--footer-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15));\n    -webkit-animation: slide-up 0.4s ease;\n    animation: slide-up 0.4s ease; }\n    :host .delete-mode-footer .inner-container {\n      margin-left: var(--padding-15, 0.9375rem); }\n    :host .delete-mode-footer.enabled {\n      color: var(--success, #04CC99); }\n    :host .delete-mode-footer.disabled {\n      color: var(--stable-30, #E6E6E6); }\n  :host yoo-input-bar {\n    --padding-input-container: 0;\n    position: absolute;\n    bottom: 0px;\n    width: 100%;\n    z-index: 40000; }"; }
}

const MODAL_ANIMATION_TIME = 500;
class YooInputBarComponent {
    constructor() {
        this.icon = 'yo-camera';
        this.iconAction = 'yo-photo-library';
        this.actionText = translate('SEND');
        this.value = '';
        this.placeholder = translate('ADDCOMMENT');
        this.topIndication = null;
        this.replyToUser = null;
        this.keepFocusAfterAction = false;
    }
    focusInputField(hasText = false) {
        let formTextArea = querySelectorDeep(this.host, 'yoo-form-text-area');
        this.hasTextInside = hasText ? true : false;
        if (formTextArea) {
            formTextArea.setFocus();
        }
    }
    componentWillLoad() {
        if (this.host.classList.contains('footer') && isIphoneX()) {
            this.host.classList.add('iphone-x-padding');
        }
    }
    componentDidLoad() {
        if (this.focusOnOpen) {
            setTimeout(() => {
                this.focusInputField();
            }, MODAL_ANIMATION_TIME);
        }
    }
    onActionClick() {
        if (this.keepFocusAfterAction && this.formTextArea) {
            this.formTextArea.setFocus();
        }
        if (this.hasTextInside || (this.value && this.value !== '')) {
            this.sendText.emit(this.value);
            this.value = null;
            this.hasTextInside = false;
        }
        else {
            this.browseLibrary.emit(true);
            if (isCordova()) {
                getPicture(70, PictureSourceType.PHOTOLIBRARY, MediaType.PICTURE, false).then((imageData) => {
                    this.sendPicture.emit(imageData);
                });
            }
            else {
                this.captureFile();
            }
        }
    }
    captureFile() {
        if (this.fileInput) {
            let event;
            if (isIE() || isIE11()) {
                event = document.createEvent('MouseEvent');
                event.initMouseEvent('click', false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            else {
                event = new MouseEvent('click', { bubbles: false });
            }
            this.fileInput.dispatchEvent(event);
        }
    }
    async onCaptureClick() {
        this.iconClicked.emit(true);
        if (isCordova()) {
            getPicture(70, PictureSourceType.CAMERA, MediaType.PICTURE, false).then((imageData) => {
                this.sendPicture.emit(imageData);
            });
        }
        else {
            let devices = await getVideoDevices();
            let webcam = document.createElement('yoo-form-capture-webcam-dialog');
            if (devices && devices.length > 0) {
                webcam.device = devices[0];
                showModal(webcam).then(ret => {
                    if (ret && ret.data) {
                        this.sendPicture.emit(ret.data);
                    }
                    webcam = null;
                });
            }
            else {
                // No webcam detected; add messages to user here
                return;
            }
        }
    }
    onInput(ev) {
        this.value = ev.target.value;
        this.hasTextInside = this.value ? true : false;
        this.onEmitTypingEvent(true);
    }
    onEmitTypingEvent(isTyping) {
        if (isTyping !== this.previousIsTyping) {
            this.isTyping.emit(isTyping);
            this.previousIsTyping = isTyping;
        }
    }
    onFileSelect(ev) {
        if (!isCordova() && ev.target.files) {
            let file = ev.target.files[0];
            this.sendPicture.emit(file);
        }
    }
    onCloseReplyMode(event) {
        this.replyToUser = null;
        this.replyCancelled.emit(true);
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.topIndication || this.replyToUser ?
                h("div", { class: "indications-container" },
                    h("span", { class: "indications-inner" }, this.topIndication ?
                        this.topIndication
                        : this.replyToUser ?
                            h("span", null,
                                translate('REPLY_TO') + ' ',
                                h("span", { class: "user-indication" }, getUserDisplayName(this.replyToUser)))
                            : null),
                    this.replyToUser ? h("span", { class: "close-reply", onClick: (event) => this.onCloseReplyMode(event) },
                        h("yoo-icon", { class: "yo-close" })) : null)
                : null,
            h("div", { class: "input-container" },
                h("div", { class: "icon-container" },
                    h("div", { class: "capture-icon", onClick: () => this.onCaptureClick() },
                        h("yoo-icon", { class: this.icon }))),
                h("div", { class: "input-zone" },
                    h("yoo-form-text-area", { ref: (el) => this.formTextArea = el, class: "input-bar", resizable: "none", value: this.value, placeholder: this.placeholder, initialRows: 1, maxRows: 5, disableEnter: isWeb() ? true : false, onInputBlurred: (ev) => this.onEmitTypingEvent(false), onInputChanged: (ev) => this.onInput(ev), onEnterPressed: () => isWeb() ? this.onActionClick() : null }),
                    h("div", { class: "input-action", onClick: () => this.onActionClick() },
                        h("div", null,
                            h("span", null, this.hasTextInside ? this.actionText : h("yoo-icon", { class: this.iconAction })),
                            !this.hasTextInside ? h("input", { ref: el => this.fileInput = el, type: "file", class: "invisible", onChange: (ev) => this.onFileSelect(ev) }) : null))))));
    }
    static get is() { return "yoo-input-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "actionText": {
            "type": String,
            "attr": "action-text"
        },
        "focusInputField": {
            "method": true
        },
        "focusOnOpen": {
            "type": Boolean,
            "attr": "focus-on-open"
        },
        "hasTextInside": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "iconAction": {
            "type": String,
            "attr": "icon-action"
        },
        "keepFocusAfterAction": {
            "type": Boolean,
            "attr": "keep-focus-after-action"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder",
            "mutable": true
        },
        "replyToUser": {
            "type": "Any",
            "attr": "reply-to-user",
            "mutable": true
        },
        "topIndication": {
            "type": String,
            "attr": "top-indication"
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "sendText",
            "method": "sendText",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "iconClicked",
            "method": "iconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "browseLibrary",
            "method": "browseLibrary",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "rowNumberChanged",
            "method": "rowNumberChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "sendPicture",
            "method": "sendPicture",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "replyCancelled",
            "method": "replyCancelled",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "isTyping",
            "method": "isTyping",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --padding-input-container: 0.5625rem var(--padding-15, 0.9375rem) 1rem var(--padding-15, 0.9375rem);\n  --input-bar-placeholder-font-size: var(--font-m, 15px); }\n\n:host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: end;\n  align-items: flex-end;\n  background: var(--light, #FFFFFF); }\n  :host .outer-container .indications-container {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    width: 100%;\n    padding-left: var(--padding-15, 0.9375rem);\n    background: var(--stable-light, #f1f1f1);\n    color: var(--text-color, #807f83);\n    font-size: var(--font-xs, 10px); }\n    :host .outer-container .indications-container .close-reply {\n      padding-right: var(--padding-15, 0.9375rem); }\n      :host .outer-container .indications-container .close-reply yoo-icon {\n        color: var(--black, #000000);\n        font-weight: 600; }\n    :host .outer-container .indications-container .indications-inner {\n      -ms-flex: 1;\n      flex: 1;\n      padding-left: var(--padding-15, 0.9375rem); }\n      :host .outer-container .indications-container .indications-inner .user-indication {\n        -ms-flex: 1;\n        flex: 1;\n        color: var(--black, #000000);\n        font-weight: 600; }\n  :host .outer-container .input-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    width: 100%;\n    padding: var(--padding-input-container);\n    padding: 0; }\n    :host .outer-container .input-container .icon-container {\n      -ms-flex-item-align: center;\n      align-self: center;\n      margin-right: 0.5rem;\n      margin-left: var(--padding-15, 0.9375rem); }\n      :host .outer-container .input-container .icon-container .capture-icon {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        width: 2rem;\n        height: 2rem;\n        border: 1px solid var(--success, #04CC99);\n        border-radius: 50%;\n        background-color: var(--light, #FFFFFF);\n        color: var(--success, #04CC99); }\n    :host .outer-container .input-container .input-zone {\n      display: -ms-flexbox;\n      display: flex;\n      position: relative;\n      -ms-flex-align: center;\n      align-items: center;\n      width: 100%;\n      margin-right: 0.875rem;\n      padding: 0 0.75rem 0 0.8125rem;\n      border: 1px solid var(--control-icon-color, #adadad);\n      border-radius: 1.03125rem;\n      background-color: var(--light, #FFFFFF); }\n      :host .outer-container .input-container .input-zone yoo-form-text-area {\n        --textarea-placeholder-font-size: var(--input-bar-placeholder-font-size);\n        padding-right: 4rem; }\n      :host .outer-container .input-container .input-zone .input-action {\n        top: auto;\n        right: 0.8125rem;\n        bottom: 7px;\n        left: auto;\n        position: absolute;\n        color: var(--success, #04CC99); }\n        :host .outer-container .input-container .input-zone .input-action div.text {\n          margin-bottom: 0.2rem; }\n        :host .outer-container .input-container .input-zone .input-action div span {\n          display: inline-block; }\n        :host .outer-container .input-container .input-zone .input-action .invisible {\n          display: block;\n          position: absolute;\n          top: 0;\n          left: 50%;\n          width: 70px;\n          margin-left: -50px;\n          border-radius: 50%;\n          outline: none;\n          background: white;\n          text-align: right;\n          cursor: inherit;\n          opacity: 0;\n          filter: alpha(opacity=0); }\n        :host .outer-container .input-container .input-zone .input-action yoo-icon {\n          font-size: var(--font-m, 15px); }\n        :host .outer-container .input-container .input-zone .input-action input[type=file] {\n          pointer-events: none; }\n\n:host(.footer) .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  min-height: 3rem;\n  -webkit-box-shadow: var(--footer-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15));\n  box-shadow: var(--footer-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15)); }\n  :host(.footer) .outer-container .input-container .input-zone {\n    margin: 0.5rem 0.875rem 0.5rem 0; }\n\n:host(.iphone-x-padding) .outer-container {\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  min-height: 4.375rem; }\n\n:host(.boost) .outer-container .input-container .icon-container .capture-icon {\n  border: 1px solid var(--danger-light, #F46885);\n  background-color: var(--danger-light, #F46885);\n  color: var(--always-light, #FFFFFF); }\n\n:host(.boost) .outer-container .input-container .input-zone .input-action {\n  color: var(--danger-light, #F46885); }\n\n:host(.accent) .outer-container .input-container {\n  background-color: var(--accent, #1FB6FF); }\n  :host(.accent) .outer-container .input-container .input-zone {\n    border: 1px solid var(--accent, #1FB6FF); }\n\n:host(.info) .outer-container .input-container {\n  background-color: var(--info, #fc459e); }\n  :host(.info) .outer-container .input-container .input-zone {\n    border: 1px solid var(--info, #fc459e); }\n\n:host(.dark) .outer-container .input-container {\n  background-color: var(--dark, #2b3648); }\n  :host(.dark) .outer-container .input-container .input-zone {\n    border: 1px solid var(--dark, #2b3648); }\n\n:host(.danger) .outer-container .input-container {\n  background-color: var(--danger, #ff625f); }\n  :host(.danger) .outer-container .input-container .input-zone {\n    border: 1px solid var(--danger, #ff625f); }\n\n:host(.warning) .outer-container .input-container {\n  background-color: var(--warning, #ff6402); }\n  :host(.warning) .outer-container .input-container .input-zone {\n    border: 1px solid var(--warning, #ff6402); }\n\n:host(.success) .outer-container .input-container {\n  background-color: rgba(46, 219, 183, 0.5); }\n  :host(.success) .outer-container .input-container .input-zone {\n    border: 1px solid var(--success, #04CC99); }\n\n:host(.squared) .outer-container .input-container .input-zone {\n  border-radius: 0.25rem; }"; }
}

export { YooChatComponent as YooChat, YooInputBarComponent as YooInputBar };

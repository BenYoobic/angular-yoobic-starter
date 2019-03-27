import { showActionSheet, translate, getSession, isIphoneX, isWeb, isCordova, isIOS, enableKeyboardResize, disableKeyboardResize, isNullOrUndefined } from '../../../utils';
export class YooChatComponent {
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
    static get style() { return "/**style-placeholder:yoo-chat:**/"; }
}

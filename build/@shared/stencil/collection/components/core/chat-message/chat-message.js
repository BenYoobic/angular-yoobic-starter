import { cloudinary, pipes, getSession, showImageModal, getAppContext, isNullOrUndefined, isCordova } from '../../../utils';
export class YooChatMessageComponent {
    constructor() {
        this.hideEmptyCheckbox = false;
    }
    get isConferenceMessage() {
        return this.message && this.message.type === 'conference';
    }
    onClickMessage() {
        if (!this.message.readonly && this.message.author && this.message.author._id === getSession().userId) {
            this.message.selected = !this.message.selected;
            this.clicked.emit(this.message.selected);
        }
        if (this.isConferenceMessage && this.message && this.message.content) {
            this.conferenceMessageClicked.emit(this.message.content);
        }
    }
    onShowImage() {
        if (this.message.readonly && this.message.img) {
            showImageModal(this.message.img, null, true);
        }
    }
    renderConferenceMessage() {
        return h("div", { class: "conference-message-container" },
            h("yoo-icon", { class: "yo-play" }, " "),
            this.message && this.message.content);
    }
    renderUser() {
        return (h("div", { class: "user-container" }, this.message.author && ((this.isLast && this.isFirst) || (this.isLast && !this.isFirst)) &&
            h("yoo-avatar", { class: "small", user: this.message.author })));
    }
    renderTimeStamp() {
        return (this.message.time && this.isFirst &&
            h("div", { class: "info-container center" },
                h("span", null, pipes.timeAgo.transform(this.message.time))));
    }
    renderUserName() {
        if (this.message.author && this.message.author.firstName && this.message.author.lastName) {
            return [
                h("div", { class: {
                        'username': true
                    } }, `${this.message.author.firstName} ${this.message.author.lastName}`)
            ];
        }
        return null;
    }
    renderMessageContent() {
        return (h("div", { class: {
                "message-content": true,
                "first": this.isFirst,
                "last": this.isLast,
                "img": !isNullOrUndefined(this.message.img),
                "next-img": this.isNextImage
            }, onClick: () => this.onShowImage() },
            this.message.img ?
                (h("div", { class: "image-container" },
                    h("yoo-img", { type: "back", class: "image", src: cloudinary(this.message.img) })))
                : null,
            h("span", { class: "text" }, this.isConferenceMessage && !isCordova() ? this.renderConferenceMessage() : this.message.content)));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: 'message ' + ((this.message.isAlternate) ? 'user-message' : 'other-message'), onClick: () => this.onClickMessage() },
            this.renderTimeStamp(),
            this.message.readonly ? null : (this.message.author && this.message.author._id === getSession().userId ? h("yoo-form-checkbox", { class: "btn-form-choice", value: this.message.selected }) : !this.hideEmptyCheckbox ? h("div", { class: "empty-checkbox" }) : null),
            this.isGroup && this.message.author && this.message.author._id !== getSession().userId ?
                [
                    this.isFirst && this.renderUserName(),
                    h("div", { class: "group-message-container" },
                        this.renderUser(),
                        this.renderMessageContent())
                ]
                : this.renderMessageContent()));
    }
    static get is() { return "yoo-chat-message"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "hideEmptyCheckbox": {
            "type": Boolean,
            "attr": "hide-empty-checkbox"
        },
        "host": {
            "elementRef": true
        },
        "isFirst": {
            "type": Boolean,
            "attr": "is-first"
        },
        "isGroup": {
            "type": Boolean,
            "attr": "is-group"
        },
        "isLast": {
            "type": Boolean,
            "attr": "is-last"
        },
        "isNextImage": {
            "type": Boolean,
            "attr": "is-next-image"
        },
        "message": {
            "type": "Any",
            "attr": "message",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "clicked",
            "method": "clicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "conferenceMessageClicked",
            "method": "conferenceMessageClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-chat-message:**/"; }
}

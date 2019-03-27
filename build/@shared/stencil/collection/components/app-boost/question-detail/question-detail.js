import { getUserDisplayName, pipes, translate } from '../../../index';
import { cloudinary } from '../../../utils';
export class YooQuestionDetailComponent {
    constructor() {
        this.imageWidth = 335;
        this.imageHeight = 260;
    }
    componentWillLoad() {
        this.updateActions();
    }
    onQuestionUpdate() {
        this.updateActions();
    }
    updateActions() {
        if (this.question) {
            this.actions = [
                { text: translate('REPLY'), handler: () => this.replyClicked.emit() },
                {
                    text: translate('LIKECOUNT', { count: this.question.likesCount || 0 }),
                    cssClass: this.question.isLikedByMe ? 'danger-light' : '',
                    handler: () => this.liked.emit(!this.question.isLikedByMe)
                }
            ];
        }
    }
    renderQuestionTop() {
        return (h("div", { class: "question-top" },
            h("yoo-avatar", { class: "list-small", imgSrc: this.question ? this.question.user.imageData : null, user: this.question ? this.question.user : null }),
            h("div", { class: "question-heading" },
                this.question && this.question.user ? h("span", null, getUserDisplayName(this.question.user)) : null,
                this.question && this.question.user ? h("span", { class: "question-subheading" }, translate(this.question.user.role)) : null)));
    }
    renderBottomAction() {
        return (h("div", { class: "question-bottom" }, this.actions ?
            this.actions.map((action) => {
                return h("div", { class: "button-container" },
                    h("yoo-button", { onClick: (ev) => action.handler(), text: action.text, class: action.cssClass || '', disabled: false }));
            }) : null));
    }
    renderTags() {
        if (!this.question || !this.question.tags) {
            return;
        }
        return (h("div", { class: 'hashtags' }, this.question.tags.map(a => a && h("span", { class: "hashtag", innerHTML: `#${a.toLowerCase()} ` }))));
    }
    renderImage() {
        if (!this.question || !this.question.imageData) {
            return;
        }
        return (h("div", { class: "image-container" },
            h("yoo-img", { type: "back", class: "image", src: cloudinary(this.question.imageData, this.imageWidth, this.imageHeight) })));
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.renderQuestionTop(),
            this.renderImage(),
            h("div", { class: "content-container" },
                h("div", { class: "question-description" }, this.question.title),
                this.question ? h("span", { class: "question-date" }, pipes.timeAgo.transform(this.question._ect || new Date())) : null,
                this.renderTags(),
                this.renderBottomAction())));
    }
    static get is() { return "yoo-question-detail"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "actions": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "imageHeight": {
            "state": true
        },
        "imageWidth": {
            "state": true
        },
        "question": {
            "type": "Any",
            "attr": "question",
            "watchCallbacks": ["onQuestionUpdate"]
        }
    }; }
    static get events() { return [{
            "name": "liked",
            "method": "liked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "replyClicked",
            "method": "replyClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-question-detail:**/"; }
}

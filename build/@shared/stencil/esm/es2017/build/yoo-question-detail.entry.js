import { h } from '../design-system.core.js';

import { m as translate, bd as getUserDisplayName, _ as cloudinary } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';
import './index.js';

class YooQuestionDetailComponent {
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
    static get style() { return ":host .question-bottom {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: center;\n  align-items: center;\n  margin-top: 1rem; }\n  :host .question-bottom .button-container {\n    width: 100%; }\n\n:host {\n  cursor: pointer; }\n  :host .outer-container {\n    padding: 1.25rem 1rem;\n    padding-bottom: 0.4rem; }\n    :host .outer-container mark {\n      background-color: transparent;\n      color: var(--black, #000000) !important; }\n    :host .outer-container .question-top {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-align: center;\n      align-items: center; }\n      :host .outer-container .question-top yoo-avatar {\n        margin-right: 0.8rem;\n        -webkit-transform: translateY(3px);\n        transform: translateY(3px); }\n      :host .outer-container .question-top .question-heading {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex: 1;\n        flex: 1;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        color: var(--dark, #2b3648);\n        font-size: var(--font-s, 13px);\n        font-weight: normal;\n        line-height: 1.25; }\n        :host .outer-container .question-top .question-heading .question-subheading {\n          color: var(--stable, #adadad); }\n    :host .outer-container .image-container {\n      position: relative;\n      height: 260px;\n      margin: 0.5rem 0.25rem;\n      color: var(--always-black, #000000); }\n      :host .outer-container .image-container .image {\n        width: 100%;\n        height: 100%;\n        border-radius: 5px;\n        background: var(--stable-light, #f1f1f1);\n        -webkit-box-shadow: 0 2px 4px 0 rgba(40, 47, 54, 0.08);\n        box-shadow: 0 2px 4px 0 rgba(40, 47, 54, 0.08); }\n    :host .outer-container .hashtags {\n      font-size: var(--font-s, 13px); }\n      :host .outer-container .hashtags .hashtag {\n        color: var(--danger-light, #F46885); }\n    :host .outer-container .content-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      font-size: var(--font-m, 15px); }\n      :host .outer-container .content-container .image-container {\n        position: relative;\n        height: 260px;\n        margin: 0.5rem 0.25rem;\n        color: var(--always-black, #000000); }\n        :host .outer-container .content-container .image-container .image {\n          width: 100%;\n          height: 100%;\n          border-radius: 5px;\n          background: var(--stable-light, #f1f1f1);\n          -webkit-box-shadow: 0 2px 4px 0 rgba(40, 47, 54, 0.08);\n          box-shadow: 0 2px 4px 0 rgba(40, 47, 54, 0.08); }\n        :host .outer-container .content-container .image-container .inner-icon {\n          padding: 0.2em 0.45em;\n          border-radius: 50%;\n          background-color: var(--always-light, #FFFFFF); }\n        :host .outer-container .content-container .image-container .bottom-left-icon {\n          bottom: 0.9375rem;\n          left: 0.9375rem;\n          position: absolute;\n          -webkit-box-shadow: var(--attachment-icon-shadow, 0 6px 18px 0 rgba(40, 47, 54, 0.08));\n          box-shadow: var(--attachment-icon-shadow, 0 6px 18px 0 rgba(40, 47, 54, 0.08)); }\n        :host .outer-container .content-container .image-container .bottom-right-icon {\n          bottom: 0.9375rem;\n          right: 0.9375rem;\n          position: absolute; }\n        :host .outer-container .content-container .image-container .top-left-icon {\n          top: 0.9375rem;\n          left: 0.9375rem;\n          position: absolute; }\n        :host .outer-container .content-container .image-container .top-right-icon {\n          top: 0.9375rem;\n          right: 0.9375rem;\n          position: absolute; }\n        :host .outer-container .content-container .image-container .badge-bottom-left {\n          bottom: 0.9375rem;\n          left: 0.9375rem;\n          position: absolute; }\n        :host .outer-container .content-container .image-container .badge-bottom-right {\n          bottom: 0.9375rem;\n          right: 0.9375rem;\n          position: absolute; }\n        :host .outer-container .content-container .image-container .badge-top-left {\n          top: 0.9375rem;\n          left: 0.9375rem;\n          position: absolute; }\n        :host .outer-container .content-container .image-container .badge-top-right {\n          top: 0.9375rem;\n          right: 0.9375rem;\n          position: absolute; }\n        :host .outer-container .content-container .image-container .bottom-left-icon,\n        :host .outer-container .content-container .image-container .bottom-right-icon,\n        :host .outer-container .content-container .image-container .top-left-icon,\n        :host .outer-container .content-container .image-container .top-right-icon {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-align: center;\n          align-items: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n          width: 1.875rem;\n          height: 1.875rem;\n          padding: 0; }\n      :host .outer-container .content-container .question-date {\n        color: var(--stable, #adadad);\n        font-size: var(--font-s, 13px); }\n      :host .outer-container .content-container.no-img {\n        padding-top: var(--padding-10, 0.625rem); }\n      :host .outer-container .content-container .question-badges {\n        margin-bottom: 0.625rem; }\n      :host .outer-container .content-container .question-description {\n        position: relative;\n        padding-bottom: 0.25rem;\n        color: var(--dark, #2b3648);\n        font-size: var(--font-l, 17px);\n        font-weight: bold;\n        line-height: normal;\n        white-space: normal;\n        overflow: hidden; }\n        :host .outer-container .content-container .question-description.photos {\n          color: var(--stable, #adadad); }\n        :host .outer-container .content-container .question-description.short-text .description-content .text {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          padding-right: 2.5rem; }\n        :host .outer-container .content-container .question-description.short-text .description-content .ellipsis {\n          display: none; }\n        :host .outer-container .content-container .question-description.short-text .description-content .more-button {\n          display: block;\n          position: absolute;\n          right: 0;\n          bottom: 0;\n          width: 2.5rem;\n          padding-left: 2px;\n          background-color: var(--light, #FFFFFF);\n          color: var(--text-color, #807f83);\n          font-size: var(--font-s, 13px); }\n        :host .outer-container .content-container .question-description.short-text-no-img {\n          height: 96px;\n          max-height: 96px; }\n          :host .outer-container .content-container .question-description.short-text-no-img .description-content {\n            max-height: inherit;\n            color: inherit;\n            font-size: inherit;\n            line-height: inherit;\n            text-overflow: ellipsis;\n            white-space: normal;\n            overflow: hidden; }\n            :host .outer-container .content-container .question-description.short-text-no-img .description-content .text {\n              max-height: inherit; }\n            :host .outer-container .content-container .question-description.short-text-no-img .description-content .ellipsis {\n              display: block;\n              position: absolute;\n              right: 0;\n              bottom: 0;\n              width: 1rem;\n              padding-right: 2.5rem;\n              padding-left: 0.3125rem;\n              background-color: var(--light, #FFFFFF); }\n            :host .outer-container .content-container .question-description.short-text-no-img .description-content .more-button {\n              display: block;\n              position: absolute;\n              right: 0;\n              bottom: 0;\n              width: 2.5rem;\n              padding-left: 2px;\n              background-color: var(--light, #FFFFFF);\n              color: var(--text-color, #807f83);\n              font-size: var(--font-s, 13px); }\n        :host .outer-container .content-container .question-description.long-text .description-content .more-button {\n          color: var(--text-color, #807f83); }\n      :host .outer-container .content-container .question-hashtags {\n        line-height: 1.2rem; }\n        :host .outer-container .content-container .question-hashtags .hashtag {\n          margin-left: 2px; }\n      :host .outer-container .content-container .question-bottom-action {\n        width: -webkit-fit-content;\n        width: -moz-fit-content;\n        width: fit-content;\n        color: var(--text-color, #807f83);\n        font-size: var(--font-s, 13px);\n        line-height: 1.7rem;\n        cursor: pointer; }\n  :host .question-icons {\n    display: -ms-flexbox;\n    display: flex;\n    padding-top: 0.625rem;\n    padding-bottom: 0.625rem; }\n    :host .question-icons .question-icon {\n      padding-top: 0.2rem;\n      padding-right: 0.9375rem;\n      color: var(--black, #000000); }\n      :host .question-icons .question-icon yoo-icon {\n        font-size: var(--font-ll, 20px); }\n      :host .question-icons .question-icon.text {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex: 1;\n        flex: 1;\n        -ms-flex-pack: end;\n        justify-content: flex-end;\n        margin-right: 0;\n        padding-right: var(--padding-5, 0.3125rem);\n        font-size: 0.75rem; }\n        :host .question-icons .question-icon.text .icon-text {\n          -ms-flex-item-align: center;\n          align-self: center;\n          padding-right: var(--padding-5, 0.3125rem); }\n        :host .question-icons .question-icon.text yoo-icon {\n          font-size: 1.3125rem; }\n  :host .info-question {\n    color: var(--dark, #2b3648); }\n    :host .info-question span {\n      margin-left: -0.5rem;\n      padding-top: var(--padding-5, 0.3125rem);\n      padding-bottom: var(--padding-5, 0.3125rem);\n      font-size: var(--font-m, 15px); }\n  :host .answer-question {\n    padding-left: 1rem;\n    color: var(--dark, #2b3648);\n    font-weight: normal; }\n\n:host(.boost) .question-hashtags {\n  color: var(--danger-light, #F46885); }\n\n:host(.operations) .question-hashtags {\n  color: var(--success, #04CC99); }\n\n:host(.offline) .outer-container {\n  opacity: 0.7; }\n\n:host(.offline)::before, :host(.offline)::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  right: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n:host(.offline)::after {\n  border-width: 0.5em;\n  border-right-color: var(--energized, #fed05b);\n  border-top-color: var(--energized, #fed05b); }"; }
}

export { YooQuestionDetailComponent as YooQuestionDetail };

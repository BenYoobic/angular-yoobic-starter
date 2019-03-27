const h = window.DesignSystem.h;

import { _ as cloudinary, ac as getPlanDueDate, m as translate, W as isWeb, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooCardCourseRowComponent {
    constructor() {
        this.imageWidth = 345;
        this.imageHeight = 270;
    }
    renderCardImage() {
        return (this.entry && this.entry.plan && this.entry.plan.background && this.entry.plan.background._downloadURL &&
            h("yoo-img", { type: "back", disabled: this.entry.isLocked, class: "image", src: cloudinary(this.entry.plan.background._downloadURL, this.imageWidth, this.imageHeight) }, this.entry.isLocked && h("yoo-icon", { class: "yo-lock" })));
    }
    renderDueDate() {
        let dueDate = getPlanDueDate(this.entry.plan, this.entry.assignmentDate);
        if (dueDate) {
            return [
                h("span", { class: "danger-light" },
                    h("yoo-icon", { class: "yo-alarm" }),
                    dueDate.toLocaleDateString())
            ];
        }
        else {
            return null;
        }
    }
    renderCourseContent() {
        let lessonLabel = translate((this.entry.plan && this.entry.plan.lessonsCount || 0) > 1 ? 'LESSONS' : 'LESSON');
        return (h("div", { class: "content-container" },
            h("div", { class: "inner-container" },
                h("div", { class: "info-row" },
                    this.entry.finished && h("span", null,
                        h("yoo-icon", { class: "yo-check" }),
                        translate('COMPLETED')),
                    !this.entry.finished && h("span", null,
                        h("yoo-icon", { class: "yo-todo-boost" }),
                        this.entry.finishedLessonsCount || 0,
                        "/",
                        this.entry.plan && this.entry.plan.lessonsCount || 0,
                        " ",
                        lessonLabel),
                    isWeb() && !this.entry.finished && this.renderDueDate()),
                h("div", { class: { 'title-row': true, 'two-line-truncate': !isWeb(), 'ellipsis': isWeb() } }, this.entry.plan && this.entry.plan.title),
                isWeb() &&
                    h("div", { class: "description-row" }, this.entry.plan && this.entry.plan.description))));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return h("div", { class: "outer-container" },
            this.entry && h("div", { class: "image-container" }, this.renderCardImage()),
            this.entry && this.renderCourseContent());
    }
    static get is() { return "yoo-card-course-row"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "entry": {
            "type": "Any",
            "attr": "entry"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ":host {\n  cursor: pointer; }\n  :host p {\n    -webkit-margin-before: 0;\n    -webkit-margin-after: 0;\n    -webkit-margin-start: 0;\n    -webkit-margin-end: 0; }\n  :host .two-line-truncate {\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n    word-break: break-all; }\n  :host .ellipsis {\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden; }\n  :host .danger-light {\n    color: var(--danger-light, #F46885); }\n  :host .outer-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    height: 6rem;\n    padding: 0.25rem 0; }\n    :host .outer-container .image-container {\n      position: relative;\n      width: 9.5rem;\n      height: 11rem;\n      margin-top: 0.5rem; }\n      :host .outer-container .image-container .image {\n        width: 100%;\n        height: 50%;\n        border-radius: var(--border-radius-input, 5px); }\n        :host .outer-container .image-container .image yoo-icon {\n          position: absolute;\n          right: var(--padding-15, 0.9375rem);\n          bottom: var(--padding-15, 0.9375rem);\n          padding: 0.5rem;\n          border: none;\n          border-radius: 50%;\n          background: var(--stable, #adadad);\n          color: var(--light, #FFFFFF);\n          font-size: var(--font-l, 17px);\n          z-index: 5; }\n    :host .outer-container .content-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 65%;\n      margin: 0 0.75rem;\n      border-bottom: 1px solid var(--stable-alt, #d0d0d0);\n      font-size: var(--font-s, 13px); }\n      :host .outer-container .content-container .inner-container {\n        height: 100%;\n        margin-top: 0.5rem; }\n        :host .outer-container .content-container .inner-container .info-row {\n          color: var(--stable, #adadad); }\n          :host .outer-container .content-container .inner-container .info-row span {\n            padding-right: 0.5rem; }\n          :host .outer-container .content-container .inner-container .info-row yoo-icon {\n            padding: 0.25rem; }\n        :host .outer-container .content-container .inner-container .title-row {\n          color: var(--dark, #2b3648);\n          font-size: var(--font-m, 15px); }\n        :host .outer-container .content-container .inner-container .description-row {\n          color: var(--dark, #2b3648);\n          font-size: var(--font-s, 13px); }\n        :host .outer-container .content-container .inner-container .course-points-date {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n          margin: 5px 0; }\n          :host .outer-container .content-container .inner-container .course-points-date .date {\n            color: var(--danger-light, #F46885);\n            font-size: 13px;\n            font-weight: normal; }\n            :host .outer-container .content-container .inner-container .course-points-date .date .date-label {\n              color: var(--black, #000000); }\n\n:host(.web) .outer-container {\n  padding: 0.75rem 0; }\n  :host(.web) .outer-container .content-container {\n    width: calc(100% - 11rem); }\n    :host(.web) .outer-container .content-container .inner-container {\n      margin-top: 0; }\n      :host(.web) .outer-container .content-container .inner-container .image-container {\n        position: relative;\n        width: 13rem;\n        height: 18rem;\n        margin-top: 0; }\n      :host(.web) .outer-container .content-container .inner-container .title-row {\n        padding-top: 0.5rem;\n        padding-bottom: 0.25rem; }\n      :host(.web) .outer-container .content-container .inner-container .description-row {\n        color: var(--stable, #adadad); }"; }
}

export { YooCardCourseRowComponent as YooCardCourseRow };

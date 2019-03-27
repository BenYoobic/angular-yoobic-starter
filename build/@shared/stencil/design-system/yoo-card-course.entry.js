const h = window.DesignSystem.h;

import { _ as cloudinary, ac as getPlanDueDate, m as translate, B as isNumber } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooCardCourseComponent {
    constructor() {
        this.imageWidth = 345;
        this.imageHeight = 270;
    }
    renderCardImage() {
        return (this.entry && this.entry.plan && this.entry.plan.background && this.entry.plan.background._downloadURL &&
            h("yoo-img", { type: "back", disabled: this.entry.isLocked, class: "image", src: cloudinary(this.entry.plan.background._downloadURL, this.imageWidth, this.imageHeight) }, this.entry.isLocked && h("yoo-icon", { class: "yo-lock" })));
    }
    renderCourseContent() {
        let dueDate = getPlanDueDate(this.entry.plan, this.entry.assignmentDate);
        let lessonLabel = translate((this.entry.plan && this.entry.plan.lessonsCount || 0) > 1 ? 'LESSONS' : 'LESSON');
        return (h("div", { class: 'content-container' },
            h("h3", { class: "course-title" }, this.entry.plan.title),
            h("div", { class: "course-description" }, this.entry.plan.description),
            h("div", { class: "course-points" }, (isNumber(this.entry.plan.availablePoints) && this.entry.plan.availablePoints > 0) &&
                h("span", null,
                    h("yoo-icon", { class: "yo-star" }),
                    (this.entry.plan.availablePoints) + '')),
            h("div", { class: "course-info" },
                h("div", { class: "lessons" }, !this.entry.finished && h("span", null,
                    h("yoo-icon", { class: "yo-todo-boost" }),
                    this.entry.finishedLessonsCount || 0,
                    "/",
                    this.entry.plan && this.entry.plan.lessonsCount || 0,
                    " ",
                    lessonLabel)),
                h("div", { class: "date" }, dueDate &&
                    h("span", null,
                        h("yoo-icon", { class: "yo-alarm" }),
                        " ",
                        dueDate.toLocaleDateString()))),
            h("yoo-progress-bar-core", { shape: "line", progressValue: this.entry.finishedLessonsCount ? (this.entry.finishedLessonsCount / this.entry.plan.lessonsCount) * 100 : 0 })));
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.entry && h("div", { class: "image-container" }, this.renderCardImage()),
            this.entry && this.entry.plan && this.renderCourseContent()));
    }
    static get is() { return "yoo-card-course"; }
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
    static get style() { return ":host {\n  cursor: pointer; }\n  :host .outer-container {\n    margin-right: 0.325rem;\n    margin-bottom: 1rem;\n    margin-left: 0.325rem;\n    padding-bottom: var(--padding-10, 0.625rem);\n    border-radius: 5px;\n    background: var(--light-to-dark, #FFFFFF);\n    -webkit-box-shadow: var(--card-shadow-2, 0 5px 15px 0 rgba(40, 47, 54, 0.08));\n    box-shadow: var(--card-shadow-2, 0 5px 15px 0 rgba(40, 47, 54, 0.08)); }\n    :host .outer-container .image-container {\n      position: relative;\n      height: 270px;\n      margin-top: 0.5rem;\n      margin-bottom: 0.8rem; }\n      :host .outer-container .image-container .image {\n        width: 100%;\n        height: 100%;\n        border-radius: 5px 5px 0 0; }\n        :host .outer-container .image-container .image yoo-icon {\n          position: absolute;\n          right: var(--padding-15, 0.9375rem);\n          bottom: var(--padding-15, 0.9375rem);\n          padding: 0.5rem;\n          border: none;\n          border-radius: 50%;\n          background: var(--stable, #adadad);\n          color: var(--light, #FFFFFF);\n          font-size: var(--font-l, 17px); }\n    :host .outer-container .content-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      margin: 0 var(--padding-10, 0.625rem);\n      font-size: var(--font-m, 15px); }\n      :host .outer-container .content-container .course-title {\n        margin: 5px 0;\n        color: var(--black, #000000);\n        font-size: 17px;\n        font-weight: normal;\n        line-height: 21px; }\n      :host .outer-container .content-container .course-description {\n        position: relative;\n        margin: 5px 0;\n        color: var(--stable, #adadad);\n        font-size: 13px;\n        line-height: normal;\n        white-space: normal;\n        overflow: hidden; }\n      :host .outer-container .content-container .course-points {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-pack: justify;\n        justify-content: space-between;\n        margin: 5px 0; }\n        :host .outer-container .content-container .course-points span {\n          color: var(--dark, #2b3648); }\n          :host .outer-container .content-container .course-points span yoo-icon {\n            padding-right: 0.25rem;\n            color: var(--energized, #fed05b); }\n      :host .outer-container .content-container .course-info {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        padding: 0.25rem 0;\n        font-size: var(--font-s, 13px); }\n        :host .outer-container .content-container .course-info .date {\n          color: var(--danger-light, #F46885); }\n          :host .outer-container .content-container .course-info .date .date-label {\n            color: var(--black, #000000); }\n        :host .outer-container .content-container .course-info .lessons span {\n          padding-right: 0.5rem;\n          color: var(--stable, #adadad); }\n          :host .outer-container .content-container .course-info .lessons span yoo-icon {\n            padding-right: 0.25rem; }\n  :host p {\n    -webkit-margin-before: 0;\n    -webkit-margin-after: 0;\n    -webkit-margin-start: 0;\n    -webkit-margin-end: 0; }\n\n:host(.offline) .outer-container {\n  opacity: 0.7; }\n\n:host(.offline)::before, :host(.offline)::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  right: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n:host(.offline)::after {\n  border-width: 0.5em;\n  border-right-color: var(--energized, #fed05b);\n  border-top-color: var(--energized, #fed05b); }"; }
}

export { YooCardCourseComponent as YooCardCourse };

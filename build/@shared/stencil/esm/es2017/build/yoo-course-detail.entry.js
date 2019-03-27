import { h } from '../design-system.core.js';

import { q as Cloudinary, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooCourseDetailComponent {
    constructor() {
        this.imageHeight = 180;
        this.imageWidth = 117;
    }
    getAvailablePoints() {
        return (this.course.plan.availablePoints || 0).toString();
    }
    get image() {
        return new Cloudinary(this.course.plan.background._downloadURL);
    }
    getCourseImage() {
        return this.image
            .width(this.imageWidth)
            .height(this.imageHeight)
            .crop('fill')
            .getUrl();
    }
    render() {
        return (h("div", { class: "course-info" },
            h("yoo-img", { class: "course-image", src: this.getCourseImage() }),
            h("h3", { class: "course-title" }, this.course.plan.title),
            h("div", { class: "course-description" }, this.course.plan.description),
            h("div", { class: "course-points" },
                h("yoo-badge", { "icon-left": "yo-star", text: this.getAvailablePoints(), class: "round gradient-energized" })),
            h("div", { class: "course-due-date" }, this.planDueDate ? h("div", null,
                h("span", { class: "date-label" }, translate('DUEDATE')),
                this.planDueDate) : null),
            h("div", { class: "course-nb-lessons" },
                this.course.plan.lessonsCount,
                " ",
                translate('LESSONS')),
            h("div", { class: "progress-bar-wrapper" },
                h("yoo-progress-bar-core", { shape: "line", horizontalAlign: "right", verticalAlign: "top", progressValue: this.courseProgress }))));
    }
    static get is() { return "yoo-course-detail"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "course": {
            "type": "Any",
            "attr": "course"
        },
        "courseProgress": {
            "type": Number,
            "attr": "course-progress",
            "mutable": true
        },
        "planDueDate": {
            "type": String,
            "attr": "plan-due-date"
        }
    }; }
    static get style() { return ":host .course-info {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  padding: 0 0.9375rem;\n  border-bottom: 1px solid var(--stable-30, #E6E6E6); }\n  :host .course-info .course-image {\n    width: 117px;\n    height: 180px;\n    border-radius: 5px;\n    -webkit-box-shadow: 0 2px 5px 0 rgba(40, 47, 54, 0.08);\n    box-shadow: 0 2px 5px 0 rgba(40, 47, 54, 0.08); }\n  :host .course-info .course-background-image {\n    width: 100%;\n    height: 280px;\n    text-align: center; }\n  :host .course-info .course-title {\n    margin-top: var(--padding-20, 1.25rem);\n    margin-bottom: 0.5rem;\n    color: var(--black, #000000);\n    font-size: var(--font-l, 17px);\n    font-weight: normal;\n    text-align: center; }\n  :host .course-info .course-description {\n    margin-top: var(--padding-5, 0.3125rem);\n    padding: 0 2.1875rem;\n    color: var(--stable, #adadad);\n    font-size: var(--font-s, 13px);\n    font-weight: 300;\n    line-height: 1rem;\n    text-align: center; }\n  :host .course-info .course-points {\n    margin-top: 0.4375rem; }\n  :host .course-info .course-due-date {\n    margin-top: 0.375rem;\n    color: var(--danger-light, #F46885);\n    font-size: var(--font-s, 13px);\n    text-align: center; }\n    :host .course-info .course-due-date .date-label {\n      margin-right: 0.5rem;\n      color: var(--black, #000000); }\n  :host .course-info .course-nb-lessons {\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n    margin-top: var(--padding-25, 1.5625rem);\n    margin-bottom: -1.25rem;\n    color: var(--black, #000000);\n    font-size: var(--font-s, 13px); }\n  :host .course-info .progress-bar-wrapper {\n    width: 100%;\n    padding-bottom: var(--padding-20, 1.25rem); }"; }
}

export { YooCourseDetailComponent as YooCourseDetail };

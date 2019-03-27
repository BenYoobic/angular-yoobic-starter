import { Cloudinary, translate } from '../../../index'; //'../../../../stencil';
export class YooCourseDetailComponent {
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
    static get style() { return "/**style-placeholder:yoo-course-detail:**/"; }
}

import { cloudinary, translate, getPlanDueDate } from '../../../utils';
import { isNumber } from 'lodash-es';
export class YooCardCourseComponent {
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
    static get style() { return "/**style-placeholder:yoo-card-course:**/"; }
}

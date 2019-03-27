import { isWeb, getAppContext } from '../../../index';
import { cloudinary, translate, getPlanDueDate } from '../../../utils';
export class YooCardCourseRowComponent {
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
    static get style() { return "/**style-placeholder:yoo-card-course-row:**/"; }
}

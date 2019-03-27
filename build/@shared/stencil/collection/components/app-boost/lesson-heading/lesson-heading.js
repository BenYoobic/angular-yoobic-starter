import { translate, translateMulti, getPlanDueDate, isWeb } from '../../../index'; //'../../../../stencil';
export class YooLessonHeadingComponent {
    renderDueDate() {
        let dueDate = getPlanDueDate(this.lesson.plan, this.assignmentDate);
        return dueDate ? dueDate.toLocaleDateString() : null;
    }
    render() {
        return (h("div", { class: {
                'heading-container': true,
                'border-bottom': isWeb(),
                'stable-light': !isWeb()
            } },
            this.lesson && this.lesson.points && h("yoo-badge", { "icon-left": "yo-star", text: this.lesson.points + '', class: 'round gradient-energized' }),
            h("div", { class: "lesson-order" }, translate('LESSONOFCOURSE', { lesson: (translate('LESSON') + ' ' + (this.lesson.description ? this.lesson.description.order : '') + ''), course: this.lesson.plan.title })),
            (this.lesson && this.lesson.title) ? h("div", { class: "lesson-title" }, translateMulti(this.lesson.title)) : null,
            this.renderDueDate() ? h("div", { class: "lesson-date" },
                h("span", { class: "date-label" }, translate('DUEDATE')),
                h("span", null, this.renderDueDate())) : null));
    }
    static get is() { return "yoo-lesson-heading"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "assignmentDate": {
            "type": "Any",
            "attr": "assignment-date"
        },
        "host": {
            "elementRef": true
        },
        "lesson": {
            "type": "Any",
            "attr": "lesson"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-lesson-heading:**/"; }
}

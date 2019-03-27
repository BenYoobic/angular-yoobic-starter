import { translate } from '../../../utils';
import { getLessonTypeIcon, isLessonCompleted } from '../../../utils/helpers';
export class YooCardLessonComponent {
    getLessonOrder() {
        if (this.lesson && this.lesson.description) {
            return translate('LESSONOFCOURSE', { lesson: (translate('LESSON') + ' ' + this.lesson.description.order + ''), course: this.lesson.plan.title });
        }
        return '';
    }
    getLessonType() {
        if (this.lesson && this.lesson.description) {
            return this.lesson.description.lessonType;
        }
        return null;
    }
    render() {
        let classList = {
            'outer-container': true,
            'finished': isLessonCompleted(this.lesson),
            'locked': this.lesson.locked
        };
        let badgeText = null;
        let earnedPoints = null;
        if (this.lesson.points) {
            badgeText = this.lesson.points + '';
            if (this.lesson.score && this.lesson.score.completed) {
                earnedPoints = Math.round(this.lesson.score.value * this.lesson.points / 100);
                badgeText = earnedPoints + '/' + this.lesson.points;
            }
        }
        return h("div", { class: classList },
            h("div", { class: "type-icon-container" },
                h("yoo-icon", { class: getLessonTypeIcon(this.getLessonType()) })),
            h("div", { class: "info-container" },
                h("div", { class: "title-container" }, this.lesson ? this.lesson.title : ''),
                h("div", { class: "order-container" }, this.getLessonOrder()),
                h("div", { class: "remaining-points-container" }, badgeText ? (this.lesson.locked || isLessonCompleted(this.lesson)) ? h("yoo-badge", { "icon-left": "yo-star always-light", text: badgeText }) : h("yoo-badge", { "icon-left": "yo-star energized-to-white", text: badgeText }) : null)),
            h("div", { class: "extra-icon-container" },
                this.lesson.locked ? h("yoo-icon", { class: "yo-lock" }) : null,
                earnedPoints && !(earnedPoints === this.lesson.points) ? h("yoo-icon", { class: "yo-restart" }) : null));
    }
    static get is() { return "yoo-card-lesson"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "lesson": {
            "type": "Any",
            "attr": "lesson"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-card-lesson:**/"; }
}

import { translate, isContentOnly, closeModal, dateAdd, formatDistanceFromNow } from '../../../index';
export class YooLessonQuestionResultComponent {
    constructor() {
        this.resultType = 'question';
        this.showHeader = false;
        this.footerActions = [{ type: 'continue', text: translate('CONTINUE'), cssClass: 'danger-light', handler: () => closeModal(null) }];
    }
    componentWillLoad() {
        if (this.resultType === 'lesson') {
            this.result = {
                img: this.validated ? 'medal' : 'sorry_star',
                title: this.validated ? 'LESSON_CONGRATULATIONS' : 'LESSON_FAILURE',
                text: this.validated ? (isContentOnly(this.lessonType) ? 'LESSON_FINISH_TEXT' : 'LESSON_CONGRATULATIONS_TEXT') : 'LESSON_FAILURE_TEXT'
            };
            this.footerActions = [
                { type: 'course', text: translate('COURSE'), cssClass: '', handler: () => closeModal(null) }
            ];
            if (this.validated && this.nextLesson) {
                let nextLessonDuration = formatDistanceFromNow(dateAdd(new Date(), 'minutes', this.nextLesson.duration || 10));
                this.footerActions.push({ type: 'nextwithduration', text: translate('NEXT_WITH_DURATION', { duration: nextLessonDuration }), cssClass: 'danger-light', handler: () => closeModal('NEXT') });
            }
            else if (!this.nextLesson) {
                this.footerActions = [
                    { text: translate('FINISH'), cssClass: 'danger-light', handler: () => closeModal('FINISH') }
                ];
            }
        }
        else if (this.resultType === 'question') {
            this.result = {
                img: this.validated ? 'celebration' : 'not_quite',
                title: this.validated ? 'QUESTION_CONGRATULATIONS' : 'QUESTION_FAILURE'
            };
        }
        else if (this.resultType === 'course') {
            this.footerActions = [
                { type: 'course', text: translate('COURSE'), cssClass: 'danger-light', handler: () => closeModal(null) }
            ];
            this.result = {
                img: this.validated ? 'trophy' : 'sorry_star',
                title: this.validated ? 'LESSON_CONGRATULATIONS' : 'LESSON_FAILURE',
                text: this.validated ? 'COURSE_CONGRATULATIONS_TEXT' : 'COURSE_FAILURE_TEXT'
            };
        }
        else if (this.resultType === 'timeout') {
            this.result = {
                img: 'time_up',
                title: 'TIMESUP',
                text: 'TIMESUPCONFIRM'
            };
        }
    }
    renderBadge(badge) {
        return h("div", { class: "badge" },
            h("yoo-img", { src: './assets/badges/' + badge + '.svg' }),
            h("div", { class: "badge-title" }, translate(badge.toUpperCase())));
    }
    renderHeader() {
        return h("yoo-ion-toolbar", { color: "light" },
            h("yoo-ion-buttons", { slot: "start" },
                h("yoo-ion-button", { class: "close button-clear", onClick: () => closeModal(null) },
                    h("yoo-icon", { slot: "icon-only", class: "yo-close" }))));
    }
    renderQuestionResult() {
        return [
            h("h1", { class: "result-title" }, translate(this.result.title)),
            this.questionExplanation ? h("div", { class: "result-text explanation" }, this.questionExplanation) : null,
            this.explanationDocument ? h("div", { class: "document-title" }, translate('READOURDOCUMENT')) : null,
            this.explanationDocument ? h("yoo-form-document", { document: this.explanationDocument }) : null
        ];
    }
    renderLessonResult() {
        return [
            this.validated && (this.earnedPoints > 0) ? h("yoo-badge", { "icon-left": "yo-star", text: (this.earnedPoints || 0) + '', class: "round gradient-energized" }) : null,
            h("h1", { class: "result-title" }, translate(this.result.title)),
            h("div", { class: "result-text" },
                translate(this.result.text, { title: this.lessonTitle, nbAnswered: this.nbAnswered, minForCompliance: this.lessonMinForCompliance && this.lessonMinForCompliance || 0 }),
                this.earnedPoints > 0 ? (' ' + translate('EARNEDPOINTS_TEXT', { earnedPoints: this.earnedPoints })) : '!'),
            this.earnedBadge && this.validated ? h("div", { class: "result-badge" },
                h("span", null, translate('NEW_BADGE_COLLECTED')),
                " ",
                this.renderBadge(this.earnedBadge)) : null
        ];
    }
    renderFooter() {
        return (h("yoo-form-footer", { buttons: this.footerActions }));
    }
    hostData() {
        return {
            class: {
                'validated': this.validated === true,
                'failed': this.validated === false,
                'timedout': this.validated === undefined,
                [`${this.resultType}`]: true
            }
        };
    }
    render() {
        return [
            h("yoo-ion-scroll", { forceOverscroll: false },
                this.showHeader ? this.renderHeader() : null,
                h("div", { class: 'wall ' + (this.showHeader ? 'with-header' : '') },
                    h("yoo-img", { src: 'assets/states/' + this.result.img + '.svg' })),
                (this.resultType === 'question') ? this.renderQuestionResult() : this.renderLessonResult(),
                h("div", { class: "scroll-spacer" })),
            this.renderFooter()
        ];
    }
    static get is() { return "yoo-lesson-question-result"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "earnedBadge": {
            "type": String,
            "attr": "earned-badge"
        },
        "earnedPoints": {
            "type": Number,
            "attr": "earned-points"
        },
        "explanationDocument": {
            "type": "Any",
            "attr": "explanation-document"
        },
        "footerActions": {
            "type": "Any",
            "attr": "footer-actions",
            "mutable": true
        },
        "host": {
            "elementRef": true
        },
        "lessonMinForCompliance": {
            "type": Number,
            "attr": "lesson-min-for-compliance"
        },
        "lessonTitle": {
            "type": String,
            "attr": "lesson-title"
        },
        "lessonType": {
            "type": String,
            "attr": "lesson-type"
        },
        "nbAnswered": {
            "type": Number,
            "attr": "nb-answered"
        },
        "nextLesson": {
            "type": "Any",
            "attr": "next-lesson"
        },
        "questionExplanation": {
            "type": String,
            "attr": "question-explanation"
        },
        "resultType": {
            "type": String,
            "attr": "result-type"
        },
        "showHeader": {
            "type": Boolean,
            "attr": "show-header"
        },
        "validated": {
            "type": Boolean,
            "attr": "validated"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-lesson-question-result:**/"; }
}

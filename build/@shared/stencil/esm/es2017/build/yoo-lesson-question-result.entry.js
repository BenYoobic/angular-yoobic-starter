import { h } from '../design-system.core.js';

import { m as translate, Q as closeModal, by as isContentOnly, cZ as formatDistanceFromNow, ag as dateAdd } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooLessonQuestionResultComponent {
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
    static get style() { return ":host {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  background-color: var(--light, #FFFFFF); }\n  :host yoo-ion-toolbar {\n    --background: transparent; }\n  :host yoo-ion-scroll {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host yoo-ion-scroll .wall {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 100%;\n      min-height: 14.8125rem;\n      margin-bottom: 10rem;\n      mix-blend-mode: multiply;\n      background-image: linear-gradient(53deg, var(--light-to-dark-two, #FFFFFF), var(--light_grey-to-dark-two, #eaedf0)); }\n      :host yoo-ion-scroll .wall.with-header {\n        margin-top: -44px; }\n      :host yoo-ion-scroll .wall yoo-img {\n        position: absolute;\n        top: 3.75rem;\n        -ms-flex-item-align: center;\n        align-self: center;\n        min-width: 10rem;\n        min-height: 14rem; }\n    :host yoo-ion-scroll .result-title {\n      margin: 0.5rem 0 0.9375rem 0;\n      font-size: var(--font-xl, 36px);\n      font-weight: 600;\n      line-height: var(--font-xl, 36px);\n      text-align: center; }\n    :host yoo-ion-scroll .result-text {\n      margin: 0 3.75rem;\n      color: var(--text-color, #807f83);\n      line-height: 1.5625rem;\n      text-align: center; }\n      :host yoo-ion-scroll .result-text.explanation {\n        margin-top: 0.9375rem; }\n    :host yoo-ion-scroll .result-badge {\n      margin-top: 1.875rem; }\n      :host yoo-ion-scroll .result-badge span {\n        color: var(--black, #000000);\n        font-size: var(--font-m, 15px); }\n      :host yoo-ion-scroll .result-badge .badge {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        margin: auto;\n        font-size: var(--font-xs, 10px); }\n        :host yoo-ion-scroll .result-badge .badge yoo-img {\n          min-height: 50px;\n          max-height: 60px;\n          margin: var(--padding-10, 0.625rem) 0; }\n        :host yoo-ion-scroll .result-badge .badge .badge-title {\n          text-align: center; }\n    :host yoo-ion-scroll .document-title {\n      margin-top: 1.875rem;\n      font-size: var(--font-m, 15px);\n      text-align: center; }\n    :host yoo-ion-scroll yoo-form-document {\n      --outer-container-padding: 0.9375rem 0.9375rem;\n      width: calc(100% - 0.9375rem); }\n    :host yoo-ion-scroll .scroll-spacer {\n      min-height: 5.75rem; }\n\n:host(.validated) .wall {\n  margin-bottom: 9rem; }\n  :host(.validated) .wall yoo-img {\n    min-width: 11rem;\n    min-height: 16rem; }\n\n:host(.validated) .result-title {\n  color: var(--energized, #fed05b); }\n\n:host(.question.validated) .wall yoo-img {\n  top: 4.5rem;\n  min-width: 12rem;\n  min-height: 18rem; }\n\n:host(.failed) .wall yoo-img {\n  min-width: 21.25rem; }\n\n:host(.failed) .result-title {\n  color: var(--danger-light, #F46885); }\n\n:host(.question.failed) .wall {\n  margin-bottom: 11.7rem; }\n  :host(.question.failed) .wall yoo-img {\n    top: 8rem; }\n\n:host(.lesson.failed) .wall yoo-img {\n  top: 6.5rem; }\n\n:host(.timedout) .result-title {\n  color: var(--danger-light, #F46885); }\n\n:host(.absolute) {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }"; }
}

export { YooLessonQuestionResultComponent as YooLessonQuestionResult };

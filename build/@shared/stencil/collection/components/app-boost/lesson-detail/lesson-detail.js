import { translate, isIonic, decreaseMaxHeight, translateMulti, isWeb } from '../../../index';
import { getSession } from '../../../utils';
import { isEmpty } from 'lodash-es';
export class YooLessonDetailComponent {
    componentWillLoad() {
        this.isMobile = isIonic();
        this.session = getSession();
    }
    getSizeContainer() {
        let maxHeight = window.innerHeight;
        maxHeight = decreaseMaxHeight(maxHeight, '.lesson-footer', this.host);
        return { height: maxHeight + 'px' };
    }
    onStart(ev) {
        ev.stopPropagation();
        if (this.session.timerCountDownState) {
            this.session.timerCountDownState = null;
        }
        this.start.emit();
    }
    renderButton() {
        return (h("div", { class: "button-container" },
            h("yoo-button", { onClick: (ev) => this.onStart(ev), setMaxWidth: true, text: translate(isEmpty(this.lessonData) ? 'START' : 'RETRY'), class: 'danger-light ' + (this.isMobile ? 'large' : 'x-x-medium') })));
    }
    renderStartButton() {
        return (h("yoo-form-footer", { buttons: [{ text: translate('START'), cssClass: 'danger-light', handler: (ev) => this.onStart(ev) }] }));
    }
    renderSimpleSection(value, title, icon, isInnerHTML = false) {
        return (h("li", { class: "menu-item" },
            h("div", { class: "menu-left" },
                h("span", { class: "menu-icon" },
                    h("yoo-icon", { class: icon })),
                h("div", { class: "border" })),
            h("div", { class: "menu-right" },
                h("div", { class: "menu-title" }, translateMulti(title)),
                (isInnerHTML ?
                    h("div", { class: "menu-content", innerHTML: value })
                    : h("div", { class: "menu-content" }, value)))));
    }
    renderUserSection(user, title, icon) {
        return (user && (user.email || user.firstName || user.lastName) ?
            h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: icon })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate(title)),
                    ((user.firstName || user.lastName) ?
                        h("div", { class: "menu-content menu-requestor" },
                            (user.imageData ? h("yoo-avatar", { class: "xsmall", imgSrc: user.imageData }) : null),
                            user.firstName,
                            " ",
                            user.lastName)
                        : null),
                    (user.email ? h("div", { class: "menu-content" }, user.email) : null)))
            : null);
    }
    renderAnswers() {
        return (h("div", { class: "heading-container" },
            h("div", { class: "title" }, translate('ANSWERS')),
            h("yoo-form-dynamic", { scrollable: false, forceReadonly: true, slides: this.lesson.description.slides, data: this.lessonData, suffix: ".value", showTabs: false, showRecap: true })));
    }
    renderLesson() {
        return (h("div", { class: 'lesson-detail ' + (this.isMobile ? '' : 'web') },
            h("yoo-ion-content", null,
                h("div", { class: "lesson-content" },
                    h("yoo-lesson-heading", { lesson: this.lesson, assignmentDate: this.assignmentDate }),
                    h("ul", { class: "menu" },
                        this.lesson.description ? this.renderSimpleSection(this.lesson.description.text, 'DESCRIPTION', 'yo-description', true) : null,
                        this.renderSimpleSection((this.lesson.description && this.lesson.description.duration ? this.lesson.description.duration : '10') + ' mins', 'DURATION', 'yo-schedule-user', true),
                        this.lesson.badges && this.lesson.badges.length > 0 ? h("yoo-lesson-badges", { badges: this.lesson.badges }) : null,
                        this.highscores && this.highscores.length > 0 ? h("yoo-lesson-highscores", { ranks: this.highscores }) : null),
                    h("slot", null)),
                !isWeb() && (!this.lessonData || (this.lessonData && this.lesson.description.preventRetry !== true)) ? this.renderButton() : null,
                this.lesson.description.showAnswers && this.lessonData && this.renderAnswers()),
            isWeb() && this.renderStartButton()));
    }
    render() {
        return this.lesson ? this.renderLesson() : null;
    }
    static get is() { return "yoo-lesson-detail"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "assignmentDate": {
            "type": "Any",
            "attr": "assignment-date"
        },
        "highscores": {
            "type": "Any",
            "attr": "highscores"
        },
        "host": {
            "elementRef": true
        },
        "lesson": {
            "type": "Any",
            "attr": "lesson"
        },
        "lessonData": {
            "type": "Any",
            "attr": "lesson-data"
        },
        "scrollHeight": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "start",
            "method": "start",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-lesson-detail:**/"; }
}

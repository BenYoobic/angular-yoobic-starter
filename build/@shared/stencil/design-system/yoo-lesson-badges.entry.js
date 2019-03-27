const h = window.DesignSystem.h;

import { m as translate, ad as isIonic, x as getSession, cY as decreaseMaxHeight, bw as isEmpty, b6 as translateMulti, W as isWeb, ac as getPlanDueDate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooLessonBadgesComponent {
    render() {
        return ((this.badges && this.badges.length) ?
            h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: "yo-badge" })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate('BADGES')),
                    h("div", { class: "menu-content" }, this.badges.map((badge) => h("div", { class: "badge" },
                        h("yoo-img", { src: './assets/badges/' + badge + '.svg' }),
                        h("div", { class: "badge-title" }, translate(badge.toUpperCase())))))))
            : null);
    }
    static get is() { return "yoo-lesson-badges"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "badges": {
            "type": "Any",
            "attr": "badges"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ":host {\n  --display-border: inherit; }\n\n:host .menu-item {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  :host .menu-item .menu-left {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host .menu-item .menu-left .menu-icon {\n      height: 1.875rem;\n      width: 1.875rem; }\n      :host .menu-item .menu-left .menu-icon yoo-icon {\n        height: 1.1875rem;\n        width: 1.1875rem;\n        font-size: var(--font-l, 17px);\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-pack: center;\n        justify-content: center;\n        background-color: var(--light, #FFFFFF);\n        border: solid 0.03125rem #d0d0d0;\n        border-radius: 50%;\n        padding: 0.34375rem; }\n    :host .menu-item .menu-left .border {\n      width: 1px;\n      height: 100%;\n      background-color: #d0d0d0; }\n  :host .menu-item .menu-right {\n    margin-left: 0.625rem;\n    width: 100%;\n    overflow: hidden; }\n    :host .menu-item .menu-right .menu-title {\n      font-weight: 600;\n      line-height: 1.125rem;\n      margin-top: 0.375rem; }\n    :host .menu-item .menu-right .menu-content {\n      margin-top: 0.25rem;\n      margin-bottom: 1.25rem; }\n\n:host .menu-item .menu-right .menu-title {\n  margin-bottom: 0.625rem; }\n\n:host .menu-item .menu-right .menu-content span {\n  margin-right: 1.25rem; }\n\n:host .menu-item .menu-right .menu-content yoo-avatar {\n  margin-right: 0.3125rem; }\n\n:host .menu-item .menu-right .menu-content .badge {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 60px;\n  font-size: var(--font-xs, 10px); }\n  :host .menu-item .menu-right .menu-content .badge yoo-img {\n    max-width: 60px;\n    min-height: 50px;\n    max-height: 60px;\n    margin: var(--padding-10, 0.625rem) 0; }\n  :host .menu-item .menu-right .menu-content .badge .badge-title {\n    text-align: center; }\n\n:host .menu-item .menu-left .border {\n  display: var(--display-border); }\n\n:host .menu-item .menu-left .menu-icon yoo-icon {\n  -ms-flex-align: center;\n  align-items: center;\n  border: solid 0.03125 var(--danger-light, #F46885);\n  background-color: var(--danger-light, #F46885);\n  color: var(--always-light, #FFFFFF);\n  font-size: var(--font-m, 15px); }"; }
}

class YooLessonDetailComponent {
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
    static get style() { return ":host {\n  height: 100%;\n  font-size: var(--font-m, 15px);\n  font-weight: 300; }\n  :host .lesson-detail {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    height: 100%; }\n    :host .lesson-detail .lesson-content .menu {\n      list-style: none outside none;\n      background: none repeat scroll 0 0 transparent;\n      border: 0 none;\n      font-size: 100%;\n      margin: 0;\n      outline: 0 none;\n      padding: 0;\n      vertical-align: baseline;\n      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n      margin-top: 1.875rem;\n      padding: var(--padding, 1rem);\n      list-style: none; }\n      :host .lesson-detail .lesson-content .menu .menu-item {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: row;\n        flex-direction: row; }\n        :host .lesson-detail .lesson-content .menu .menu-item .menu-left {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: column;\n          flex-direction: column;\n          -ms-flex-align: center;\n          align-items: center; }\n          :host .lesson-detail .lesson-content .menu .menu-item .menu-left .menu-icon {\n            height: 1.875rem;\n            width: 1.875rem; }\n            :host .lesson-detail .lesson-content .menu .menu-item .menu-left .menu-icon yoo-icon {\n              height: 1.1875rem;\n              width: 1.1875rem;\n              font-size: var(--font-l, 17px);\n              display: -ms-flexbox;\n              display: flex;\n              -ms-flex-pack: center;\n              justify-content: center;\n              background-color: var(--light, #FFFFFF);\n              border: solid 0.03125rem #d0d0d0;\n              border-radius: 50%;\n              padding: 0.34375rem; }\n          :host .lesson-detail .lesson-content .menu .menu-item .menu-left .border {\n            width: 1px;\n            height: 100%;\n            background-color: #d0d0d0; }\n        :host .lesson-detail .lesson-content .menu .menu-item .menu-right {\n          margin-left: 0.625rem;\n          width: 100%;\n          overflow: hidden; }\n          :host .lesson-detail .lesson-content .menu .menu-item .menu-right .menu-title {\n            font-weight: 600;\n            line-height: 1.125rem;\n            margin-top: 0.375rem; }\n          :host .lesson-detail .lesson-content .menu .menu-item .menu-right .menu-content {\n            margin-top: 0.25rem;\n            margin-bottom: 1.25rem; }\n      :host .lesson-detail .lesson-content .menu .menu-item .menu-right .menu-title {\n        margin-bottom: 0.625rem; }\n      :host .lesson-detail .lesson-content .menu .menu-item .menu-right .menu-content span {\n        margin-right: 1.25rem; }\n      :host .lesson-detail .lesson-content .menu .menu-item .menu-right .menu-content yoo-avatar {\n        margin-right: 0.3125rem; }\n      :host .lesson-detail .lesson-content .menu .menu-item .menu-left .menu-icon yoo-icon {\n        -ms-flex-align: center;\n        align-items: center;\n        border: solid 0.03125 var(--danger-light, #F46885);\n        background-color: var(--danger-light, #F46885);\n        color: var(--always-light, #FFFFFF);\n        font-size: var(--font-m, 15px); }\n      :host .lesson-detail .lesson-content .menu .menu-item:last-child .menu-left .border {\n        display: none; }\n      :host .lesson-detail .lesson-content .menu yoo-lesson-badges:last-child {\n        --display-border: none; }\n      :host .lesson-detail .lesson-content .menu yoo-lesson-highscores:last-child {\n        --display-border: none; }\n    :host .lesson-detail .button-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-pack: distribute;\n      justify-content: space-around;\n      width: 100%;\n      margin-bottom: var(--padding, 1rem); }\n    :host .lesson-detail .heading-container {\n      margin-top: var(--padding, 1rem); }\n      :host .lesson-detail .heading-container .title {\n        margin-top: 0.3125rem;\n        padding: var(--padding-30, 1.875rem) var(--padding, 1rem);\n        background: var(--stable-light, #f1f1f1);\n        font-size: 1.6825rem;\n        line-height: 2.0625rem; }\n      :host .lesson-detail .heading-container yoo-form-dynamic {\n        display: block;\n        margin: 0 var(--padding, 1rem); }\n\n:host .web {\n  border-radius: 8px;\n  -webkit-box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08));\n  box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08)); }\n  :host .web .lesson-footer {\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    padding-right: 1.875rem;\n    padding-left: 1.875rem;\n    border-radius: 8px;\n    -webkit-box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08));\n    box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08)); }\n    :host .web .lesson-footer yoo-button {\n      margin-right: var(--padding-10, 0.625rem); }\n    :host .web .lesson-footer .continue {\n      -ms-flex-order: 1;\n      order: 1; }"; }
}

class YooLessonHeadingComponent {
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
    static get style() { return ":host .heading-container {\n  padding: var(--padding, 1rem); }\n  :host .heading-container.stable-light {\n    background: var(--stable-light, #f1f1f1); }\n  :host .heading-container.border-bottom {\n    border-bottom: 1px solid var(--stable-30, #E6E6E6); }\n  :host .heading-container .lesson-order {\n    margin-top: 1.625rem;\n    color: var(--danger-light, #F46885);\n    font-size: var(--font-xs, 10px);\n    letter-spacing: 1px;\n    line-height: normal;\n    text-transform: uppercase; }\n  :host .heading-container .lesson-title {\n    margin-top: 0.3125rem;\n    font-size: 1.6825rem;\n    line-height: 2.0625rem; }\n  :host .heading-container .lesson-date {\n    margin-top: 0.3125rem;\n    color: var(--danger-light, #F46885); }\n    :host .heading-container .lesson-date .date-label {\n      margin-right: 0.5rem;\n      color: var(--black, #000000); }"; }
}

class YooLessonHighscoresComponent {
    render() {
        return ((this.ranks && this.ranks.length) ?
            h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: "yo-medal" })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate('HIGHSCORES')),
                    h("div", { class: "menu-content" },
                        h("yoo-grid", { items: this.ranks, entityType: 'userranks', displayType: 'card-list' }))))
            : null);
    }
    static get is() { return "yoo-lesson-highscores"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "ranks": {
            "type": "Any",
            "attr": "ranks"
        }
    }; }
    static get style() { return ":host {\n  --display-border: inherit; }\n\n:host .menu-item {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  :host .menu-item .menu-left {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host .menu-item .menu-left .menu-icon {\n      height: 1.875rem;\n      width: 1.875rem; }\n      :host .menu-item .menu-left .menu-icon yoo-icon {\n        height: 1.1875rem;\n        width: 1.1875rem;\n        font-size: var(--font-l, 17px);\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-pack: center;\n        justify-content: center;\n        background-color: var(--light, #FFFFFF);\n        border: solid 0.03125rem #d0d0d0;\n        border-radius: 50%;\n        padding: 0.34375rem; }\n    :host .menu-item .menu-left .border {\n      width: 1px;\n      height: 100%;\n      background-color: #d0d0d0; }\n  :host .menu-item .menu-right {\n    margin-left: 0.625rem;\n    width: 100%;\n    overflow: hidden; }\n    :host .menu-item .menu-right .menu-title {\n      font-weight: 600;\n      line-height: 1.125rem;\n      margin-top: 0.375rem; }\n    :host .menu-item .menu-right .menu-content {\n      margin-top: 0.25rem;\n      margin-bottom: 1.25rem; }\n\n:host .menu-item .menu-right .menu-title {\n  margin-bottom: 0.625rem; }\n\n:host .menu-item .menu-right .menu-content span {\n  margin-right: 1.25rem; }\n\n:host .menu-item .menu-right .menu-content yoo-avatar {\n  margin-right: 0.3125rem; }\n\n:host .menu-item .menu-right .menu-content .menu-content-contact {\n  margin-bottom: var(--padding-10, 0.625rem); }\n\n:host .menu-item .menu-left .border {\n  display: var(--display-border); }"; }
}

export { YooLessonBadgesComponent as YooLessonBadges, YooLessonDetailComponent as YooLessonDetail, YooLessonHeadingComponent as YooLessonHeading, YooLessonHighscoresComponent as YooLessonHighscores };

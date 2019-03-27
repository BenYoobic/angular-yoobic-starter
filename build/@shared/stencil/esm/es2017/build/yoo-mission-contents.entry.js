import { h } from '../design-system.core.js';

import { m as translate, ax as hideShowTabbar, k as isCordova, o as isIOS, bb as isSafari, ad as isIonic, c_ as getSizeModal, cY as decreaseMaxHeight, a3 as isOffline, b6 as translateMulti, x as getSession, W as isWeb } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';
import './index.js';

class YooMissionContentsComponent {
    render() {
        return ((this.slidesNumber || this.photosNumber || this.questionsNumber) ?
            h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: "yo-attachment success" })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate('QUESTIONS')),
                    h("div", { class: "menu-content" },
                        (this.slidesNumber ?
                            h("span", null,
                                h("yoo-icon", { class: "yo-pages" }),
                                " ",
                                this.slidesNumber,
                                " ",
                                translate('PAGES')) : null),
                        (this.photosNumber ?
                            h("span", null,
                                h("yoo-icon", { class: "yo-photo-library" }),
                                " ",
                                this.photosNumber,
                                " ",
                                translate('PHOTOS')) : null),
                        (this.questionsNumber ?
                            h("span", null,
                                h("yoo-icon", { class: "yo-questions" }),
                                " ",
                                this.questionsNumber,
                                " ",
                                translate('QUESTIONS')) : null))))
            : null);
    }
    static get is() { return "yoo-mission-contents"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "photosNumber": {
            "type": Number,
            "attr": "photos-number"
        },
        "questionsNumber": {
            "type": Number,
            "attr": "questions-number"
        },
        "slidesNumber": {
            "type": Number,
            "attr": "slides-number"
        }
    }; }
    static get style() { return ":host {\n  --display-border: inherit; }\n\n:host .menu-item {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  :host .menu-item .menu-left {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host .menu-item .menu-left .menu-icon {\n      height: 1.875rem;\n      width: 1.875rem; }\n      :host .menu-item .menu-left .menu-icon yoo-icon {\n        height: 1.1875rem;\n        width: 1.1875rem;\n        font-size: var(--font-l, 17px);\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-pack: center;\n        justify-content: center;\n        background-color: var(--light, #FFFFFF);\n        border: solid 0.03125rem #d0d0d0;\n        border-radius: 50%;\n        padding: 0.34375rem; }\n    :host .menu-item .menu-left .border {\n      width: 1px;\n      height: 100%;\n      background-color: #d0d0d0; }\n  :host .menu-item .menu-right {\n    margin-left: 0.625rem;\n    width: 100%;\n    overflow: hidden; }\n    :host .menu-item .menu-right .menu-title {\n      font-weight: 600;\n      line-height: 1.125rem;\n      margin-top: 0.375rem; }\n    :host .menu-item .menu-right .menu-content {\n      margin-top: 0.25rem;\n      margin-bottom: 1.25rem; }\n\n:host .menu-item .menu-right .menu-title {\n  margin-bottom: 0.625rem; }\n\n:host .menu-item .menu-right .menu-content span {\n  margin-right: 1.25rem; }\n\n:host .menu-item .menu-right .menu-content yoo-avatar {\n  margin-right: 0.3125rem; }\n\n:host .menu-item .menu-right .menu-content .menu-content-contact {\n  margin-bottom: var(--padding-10, 0.625rem); }\n\n:host .menu-item .menu-left .border {\n  display: var(--display-border); }"; }
}

class YooMissionDetailComponent {
    constructor() {
        this.isTabbarHidden = false;
    }
    onHideTabbar(ev) {
        this.isTabbarHidden = hideShowTabbar(ev, this.footer, this.isTabbarHidden);
        if (isCordova() && isIOS() || isSafari()) {
            const TABBAR_HIDDEN_ANIMATION_TIME = 100;
            let timeout = this.isTabbarHidden ? TABBAR_HIDDEN_ANIMATION_TIME : 0;
            let display = this.isTabbarHidden ? 'none' : 'block';
            setTimeout(() => {
                if (this.footer) {
                    this.footer.style.display = display;
                }
            }, timeout);
        }
    }
    componentWillLoad() {
        this.isMobile = isIonic();
    }
    getSizeContainer() {
        let maxHeight = window.innerHeight;
        maxHeight = (this.tagContainer ? getSizeModal(this.host, maxHeight, this.tagContainer) : getSizeModal(this.host, maxHeight));
        maxHeight = decreaseMaxHeight(maxHeight, '.mission-footer', this.host);
        return { height: maxHeight + 'px' };
    }
    onBook(action, ev) {
        ev.stopPropagation();
        this.book.emit(action);
    }
    onScoreSelect(conf) {
        this.showScoreChart.emit(conf);
    }
    onCloseIconClicked() {
        this.shouldClose.emit(true);
    }
    renderPriority() {
        return (this.mission.priority ?
            h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: "yo-priority success" })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate('PRIORITY')),
                    (this.isMobile ? h("div", { class: "menu-content" },
                        "P",
                        this.mission.priority)
                        : h("yoo-form-star-rating", { value: this.mission.priority, readonly: true }))))
            : null);
    }
    renderButtonFooter() {
        if (this.isBookable && this.isBookable(this.mission)) {
            let buttons;
            if (!this.mission.status) {
                buttons = [{ type: 'start', text: translate('START'), cssClass: ('gradient-success large'), handler: (ev) => this.onBook('start', ev) }];
            }
            else {
                buttons = [
                    ...(isOffline() ? [] : [{ text: translate('UNBOOK'), cssClass: ('light unbook outline'), handler: (ev) => this.onBook('unbook', ev) }]),
                    { type: 'continue', text: translate('CONTINUE'), cssClass: ('continue gradient-success'), handler: (ev) => this.onBook('continue', ev) }
                ];
            }
            return (h("yoo-form-footer", { ref: el => this.footer = el, buttons: buttons }));
        }
        return null;
    }
    renderSimpleSection(value, title, icon, isInnerHTML = false, last = false) {
        return (h("li", { class: "menu-item" },
            h("div", { class: "menu-left" },
                h("span", { class: "menu-icon" },
                    h("yoo-icon", { class: icon + ' success' })),
                last ? null : h("div", { class: "border" })),
            h("div", { class: "menu-right" },
                h("div", { class: "menu-title" }, translateMulti(title)),
                (isInnerHTML ?
                    h("div", { class: "menu-content", innerHTML: translateMulti(value) })
                    : h("div", { class: "menu-content" }, translateMulti(value))))));
    }
    renderServiceData() {
        return h("li", { class: "menu-item" },
            h("div", { class: "menu-left" },
                h("span", { class: "menu-icon" },
                    h("yoo-icon", { class: "yo-mission success" }))),
            h("div", { class: "menu-right" },
                h("div", { class: "menu-title" }, translate('MYREQUEST')),
                h("div", { class: "menu-content" },
                    h("yoo-form-dynamic", { class: "inline", slides: this.serviceSlides, data: this.mission.serviceData, forceReadonly: true, suffix: ".value", animated: false, showRecap: false }))));
    }
    renderUserSection(user, title, icon) {
        return (user && (user.email || user.firstName || user.lastName) ?
            h("li", { class: "menu-item", onClick: ev => this.showUser.emit(user) },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: icon + ' success' })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate(title)),
                    h("div", { class: "menu-content menu-requestor" },
                        (user ? h("yoo-avatar", { class: "xsmall", user: user }) : null),
                        h("span", { class: "text" }, user.firstName + ' ' + user.lastName))))
            : null);
    }
    renderMission() {
        const isStoreManager = (getSession().user && getSession().user.locationRef && (getSession().user.locationRef === this.mission.locationRef));
        let description = {}, location = {}, creator = {}, owner = {};
        if (this.mission) {
            description = this.mission.description;
            location = this.mission.location;
            creator = this.mission.creator;
            owner = this.mission.owner;
        }
        return (this.mission ? [
            h("div", { class: {
                    'mission-detail': true,
                    'web': !this.isMobile
                } },
                h("yoo-ion-content", { class: "no-scrollbar", scrollEvents: true },
                    h("div", null,
                        h("div", { class: "mission-content" },
                            h("yoo-mission-heading", { mission: this.mission, progress: (this.progress && this.progress.value ? this.progress.value : null) }),
                            h("ul", { class: "menu" },
                                this.renderPriority(),
                                description && description.text ? this.renderSimpleSection(description.text, 'MISSIONDESCRIPTION', 'yo-description', true) : null,
                                this.mission.address && !isStoreManager ? this.renderSimpleSection(this.mission.address, 'ADDRESS', 'yo-map', true) : null,
                                h("yoo-mission-contents", { slidesNumber: this.slidesNumber, photosNumber: this.photosNumber, questionsNumber: this.questionsNumber }),
                                location && (location.contactname || location.contactphone || location.contactemail) ?
                                    h("li", { class: "menu-item" },
                                        h("div", { class: "menu-left" },
                                            h("span", { class: "menu-icon" },
                                                h("yoo-icon", { class: "yo-contact success" })),
                                            h("div", { class: "border" })),
                                        h("div", { class: "menu-right" },
                                            h("div", { class: "menu-title" }, translate('CONTACT')),
                                            h("div", { class: "menu-content" },
                                                (location.contactname ? h("div", { class: "menu-content-contact", innerHTML: location.contactname }) : null),
                                                (location.contactemail ? h("div", { class: "menu-content-contact", innerHTML: location.contactemail }) : null),
                                                (location.contactphone ? h("div", { class: "menu-content-contact", innerHTML: location.contactphone }) : null))))
                                    : null,
                                this.mission.comments ? this.renderSimpleSection(this.mission.comments, 'NOTES', 'yo-note', true) : null,
                                location && location.info ? this.renderSimpleSection(location.info, 'INFO', 'yo-info', true, true) : null,
                                this.mission.originalUnvalidatedReason ? this.renderSimpleSection(this.mission.originalUnvalidatedReason, 'COMMENTS', 'yo-comment', true) : null,
                                this.renderUserSection(creator, 'REQUESTOR', 'yo-plus'),
                                owner && owner._id && owner._id !== getSession().userId ? this.renderUserSection(owner, this.mission.isAssigned ? 'ASSIGNEE' : 'STARTEDBY', 'yo-user') : null,
                                this.mission.duration ? this.renderSimpleSection(this.mission.duration + ' min', 'MISSIONDURATION', 'yo-plus') : null,
                                this.mission.validFrom || this.mission.validUntil ? this.renderSimpleSection((pipes.dateFormat.transform(this.mission.validFrom, 'L LT') || '?') + ' - ' + (pipes.dateFormat.transform(this.mission.validUntil, 'L LT') || '?'), 'VALIDITY', 'yo-plus') : null,
                                this.serviceSlides && this.serviceSlides.length > 0 ? this.renderServiceData() : null),
                            h("yoo-mission-score", { charts: this.charts, header: "PREVIOUSSCORE", networkScore: this.networkScore, onScoreSelect: ev => this.onScoreSelect(ev.detail) }),
                            h("slot", null)),
                        h("slot", { name: "end" }),
                        h("div", { class: "scroll-spacer" }))),
                this.renderButtonFooter())
        ]
            : null);
    }
    renderMenuItem(title, withContent = true) {
        return (h("li", { class: "menu-item" },
            this.renderMenuLeft('yo-link'),
            this.renderMenuRight(title, withContent)));
    }
    renderMenuRight(title, withContent) {
        return (h("div", { class: "menu-right" },
            h("div", { class: "menu-title" }, translate(title.toUpperCase())),
            h("div", { class: "menu-content" }, withContent ? h("yoo-form-dynamic", { class: "inline", slides: [{ title: 'GENERAL', items: [this.mission.todo.field] }], data: { [this.mission.todo.field.name]: Object.assign({ value: this.mission.todo.fieldValue }, this.mission.todo.fieldExtra) }, forceReadonly: true, suffix: ".value", animated: false, showRecap: false })
                : h("yoo-form-star-rating", { value: this.mission.todo.priority, readonly: true }))));
    }
    renderMenuLeft(iconClass) {
        return (h("div", { class: "menu-left" },
            h("span", { class: "menu-icon" },
                h("yoo-icon", { class: iconClass + ' success' })),
            h("div", { class: "border" })));
    }
    renderTodo() {
        const isStoreManager = (getSession().user && getSession().user.locationRef && (getSession().user.locationRef === this.mission.locationRef));
        return (this.mission &&
            h("div", { class: 'mission-detail mission-todo ' + (this.isMobile ? '' : 'web') },
                h("div", { class: "mission-content" },
                    h("yoo-mission-heading", { mission: this.mission, progress: (this.progress && this.progress.value && this.progress.value) }),
                    h("ul", { class: "menu" },
                        (this.mission.todo && this.mission.todo.field && this.mission.todo.fieldValue && this.renderMenuItem('LINKEDTO', true)),
                        (this.mission.todo && this.mission.todo.priority && this.renderMenuItem('PRIORITY', false)),
                        this.renderUserSection(this.mission.creator, 'CREATEDBY', 'yo-user'),
                        this.renderUserSection(this.mission.owner, 'ASSIGNTO', 'yo-user'),
                        this.mission.address && !isStoreManager && this.renderSimpleSection(this.mission.address, 'ADDRESS', 'yo-map', true),
                        this.mission.originalUnvalidatedReason && this.renderSimpleSection(this.mission.originalUnvalidatedReason, 'COMMENTS', 'yo-comment', true)),
                    h("slot", null))));
    }
    hostData() {
        return {
            class: {
                'web': isWeb()
            }
        };
    }
    render() {
        if (this.mission && this.mission.type) {
            switch (this.mission.type) {
                case 'todo':
                    return this.renderTodo();
                case 'mission':
                case 'poll':
                case 'service':
                default:
                    return this.renderMission();
            }
        }
    }
    static get is() { return "yoo-mission-detail"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "charts": {
            "type": "Any",
            "attr": "charts"
        },
        "host": {
            "elementRef": true
        },
        "isBookable": {
            "type": "Any",
            "attr": "is-bookable"
        },
        "linkedField": {
            "type": "Any",
            "attr": "linked-field"
        },
        "linkedFieldValue": {
            "type": "Any",
            "attr": "linked-field-value"
        },
        "mission": {
            "type": "Any",
            "attr": "mission"
        },
        "networkScore": {
            "type": Number,
            "attr": "network-score"
        },
        "photosNumber": {
            "type": Number,
            "attr": "photos-number"
        },
        "progress": {
            "type": "Any",
            "attr": "progress"
        },
        "questionsNumber": {
            "type": Number,
            "attr": "questions-number"
        },
        "scrollHeight": {
            "state": true
        },
        "serviceSlides": {
            "type": "Any",
            "attr": "service-slides"
        },
        "slidesNumber": {
            "type": Number,
            "attr": "slides-number"
        },
        "tagContainer": {
            "type": String,
            "attr": "tag-container"
        }
    }; }
    static get events() { return [{
            "name": "book",
            "method": "book",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "showScoreChart",
            "method": "showScoreChart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "showUser",
            "method": "showUser",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "shouldClose",
            "method": "shouldClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "hideTabbar",
            "method": "onHideTabbar"
        }]; }
    static get style() { return ":host {\n  height: 100%;\n  font-size: var(--font-m, 15px);\n  font-weight: 400; }\n  :host .mission-detail {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    height: 100%; }\n    :host .mission-detail .scroll-spacer {\n      height: 5.75rem; }\n    :host .mission-detail .mission-content {\n      padding: var(--padding, 1rem); }\n      :host .mission-detail .mission-content .menu {\n        list-style: none outside none;\n        background: none repeat scroll 0 0 transparent;\n        border: 0 none;\n        font-size: 100%;\n        margin: 0;\n        outline: 0 none;\n        padding: 0;\n        vertical-align: baseline;\n        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n        margin-top: 1rem;\n        padding: 0;\n        list-style: none; }\n        :host .mission-detail .mission-content .menu .menu-item {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: row;\n          flex-direction: row; }\n          :host .mission-detail .mission-content .menu .menu-item .menu-left {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: column;\n            flex-direction: column;\n            -ms-flex-align: center;\n            align-items: center; }\n            :host .mission-detail .mission-content .menu .menu-item .menu-left .menu-icon {\n              height: 1.875rem;\n              width: 1.875rem; }\n              :host .mission-detail .mission-content .menu .menu-item .menu-left .menu-icon yoo-icon {\n                height: 1.1875rem;\n                width: 1.1875rem;\n                font-size: var(--font-l, 17px);\n                display: -ms-flexbox;\n                display: flex;\n                -ms-flex-pack: center;\n                justify-content: center;\n                background-color: var(--light, #FFFFFF);\n                border: solid 0.03125rem #d0d0d0;\n                border-radius: 50%;\n                padding: 0.34375rem; }\n            :host .mission-detail .mission-content .menu .menu-item .menu-left .border {\n              width: 1px;\n              height: 100%;\n              background-color: #d0d0d0; }\n          :host .mission-detail .mission-content .menu .menu-item .menu-right {\n            margin-left: 0.625rem;\n            width: 100%;\n            overflow: hidden; }\n            :host .mission-detail .mission-content .menu .menu-item .menu-right .menu-title {\n              font-weight: 600;\n              line-height: 1.125rem;\n              margin-top: 0.375rem; }\n            :host .mission-detail .mission-content .menu .menu-item .menu-right .menu-content {\n              margin-top: 0.25rem;\n              margin-bottom: 1.25rem; }\n        :host .mission-detail .mission-content .menu .menu-item .menu-right .menu-title {\n          margin-bottom: 0.625rem; }\n        :host .mission-detail .mission-content .menu .menu-item .menu-right .menu-content span {\n          margin-right: 1.25rem; }\n        :host .mission-detail .mission-content .menu .menu-item .menu-right .menu-content yoo-avatar {\n          margin-right: 0.3125rem; }\n        :host .mission-detail .mission-content .menu .menu-item .menu-right .menu-content .menu-content-contact {\n          margin-bottom: var(--padding-10, 0.625rem); }\n        :host .mission-detail .mission-content .menu .menu-item .menu-right .menu-requestor {\n          display: -ms-flexbox;\n          display: flex; }\n        :host .mission-detail .mission-content .menu .menu-item:last-child .menu-left .border {\n          display: none; }\n        :host .mission-detail .mission-content .menu yoo-mission-contents:last-child {\n          --display-border: none; }\n  :host .mission-todo .mission-content .menu .menu-item .menu-right .menu-title {\n    font-weight: 400; }\n\n:host(.web) {\n  border-radius: 8px;\n  background: var(--light, #FFFFFF);\n  -webkit-box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08));\n  box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08)); }\n  :host(.web) yoo-ion-header yoo-ion-toolbar {\n    height: 3.75rem; }\n  :host(.web) .mission-footer {\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    padding-right: 1.875rem;\n    padding-left: 1.875rem;\n    border-radius: 8px;\n    -webkit-box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08));\n    box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08)); }\n    :host(.web) .mission-footer yoo-button {\n      margin-right: var(--padding-10, 0.625rem); }\n    :host(.web) .mission-footer .unbook {\n      -ms-flex-order: 2;\n      order: 2; }\n    :host(.web) .mission-footer .continue {\n      -ms-flex-order: 1;\n      order: 1; }\n\n:host(.border) .mission-detail.web yoo-ion-content {\n  border-radius: 0.375rem; }\n\n:host(.border) .mission-detail.web yoo-form-footer {\n  --border-radius: 0 0 0.375rem 0.375rem; }\n\n:host .score-item .mission-title {\n  margin-top: 1rem;\n  margin-bottom: var(--padding-15, 0.9375rem);\n  font-size: 1.6825rem;\n  line-height: 2.0625rem; }\n\n:host .score-item .menu-content .score-active-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  margin-bottom: 2rem; }\n\n:host .score-item .menu-content .menu-content-scoring {\n  padding-bottom: 0.5rem; }\n  :host .score-item .menu-content .menu-content-scoring .centered {\n    text-align: center;\n    padding: 0.5rem; }\n  :host .score-item .menu-content .menu-content-scoring .network {\n    color: var(--text-color, #807f83);\n    margin-top: 1rem; }\n  :host .score-item .menu-content .menu-content-scoring.extra-score .score-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n    :host .score-item .menu-content .menu-content-scoring.extra-score .score-container.points-container {\n      -ms-flex-align: center;\n      align-items: center;\n      padding: 1em 0.5rem; }\n    :host .score-item .menu-content .menu-content-scoring.extra-score .score-container.contrasted {\n      background-color: rgba(241, 241, 241, 0.5); }\n  :host .score-item .menu-content .menu-content-scoring.points {\n    padding: 0 !important; }\n  :host .score-item .menu-content .menu-content-scoring.mixed {\n    padding-top: 0.75rem; }\n  :host .score-item .menu-content .menu-content-scoring.no-divider {\n    padding-top: 0; }\n  :host .score-item .menu-content .menu-content-scoring.divider {\n    border-bottom: 1px solid var(--stable-light, #f1f1f1);\n    padding-bottom: 0.75rem;\n    padding-top: 0; }"; }
}

export { YooMissionContentsComponent as YooMissionContents, YooMissionDetailComponent as YooMissionDetail };

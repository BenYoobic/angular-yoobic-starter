import { translate, isIonic, pipes, getSizeModal, decreaseMaxHeight, getSession, translateMulti, hideShowTabbar, isIOS, isCordova, isSafari, isOffline, isWeb } from '../../../index';
export class YooMissionDetailComponent {
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
    static get style() { return "/**style-placeholder:yoo-mission-detail:**/"; }
}

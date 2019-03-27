import { translate, translateMulti, getSession, isIonic, pipes, formatDistanceFromNow, dateAdd } from '../../../index'; //'../../../../stencil';
export class YooMissionResultsComponent {
    componentWillLoad() {
        this.isMobile = isIonic();
    }
    onScoreSelect(conf) {
        this.showScoreChart.emit(conf);
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
    renderMissionOwner() {
        return (h("li", { class: "menu-item", onClick: ev => this.selectUser.emit() },
            h("div", { class: "menu-left" },
                h("span", { class: "menu-icon" },
                    h("yoo-icon", { class: "yo-user success" })),
                h("div", { class: "border" })),
            h("div", { class: "menu-right" },
                h("div", { class: "menu-title" }, translate('FINISHEDBY')),
                h("div", { class: "menu-content menu-author" }, this.mission.needsRebooking && this.mission.assigneeOwnerDisplayName ?
                    h("span", { class: "text" }, this.mission.assigneeOwnerDisplayName) :
                    [
                        this.mission.owner && h("yoo-avatar", { class: "xsmall", user: this.mission.owner }),
                        h("span", { class: "text" }, this.mission.ownerDisplayName),
                        this.mission && this.mission.finishedDate && h("div", { class: "mission-date" }, pipes.dateFormat.transform(this.mission.finishedDate, 'L LT'))
                    ]))));
    }
    renderMissionDuration() {
        return (h("li", { class: "menu-item" },
            h("div", { class: "menu-left" },
                h("span", { class: "menu-icon" },
                    h("yoo-icon", { class: "yo-date-time  success" })),
                h("div", { class: "border" })),
            h("div", { class: "menu-right" },
                h("div", { class: "menu-title" }, translate('DURATION')),
                h("div", { class: "menu-content" }, formatDistanceFromNow(dateAdd(new Date(), 'minutes', this.mission.actualDuration))))));
    }
    renderMissionValidator() {
        return this.mission.validatedBy && (this.mission.validated === true || this.mission.validated === false) ?
            h("li", { class: "menu-item", onClick: ev => this.selectValidator.emit() },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        this.mission.validated === false ? h("yoo-icon", { class: "yo-rejector success" }) : h("yoo-icon", { class: "yo-validator success" }),
                        " "),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate(this.mission.validated === false ? 'REJECTEDBY' : 'VALIDATEDBY')),
                    h("div", { class: "menu-content menu-author" },
                        this.mission.validatedByUser ? h("yoo-avatar", { class: "xsmall", user: this.mission.validatedByUser }) : null,
                        h("span", { class: "text" },
                            " ",
                            this.mission.validatedByUser ? (this.mission.validatedByUser.firstName + ' ' + this.mission.validatedByUser.lastName) : this.mission.validatedBy),
                        this.mission && this.mission.validatedDate ?
                            h("div", { class: "mission-date" }, pipes.dateFormat.transform(this.mission.validatedDate, 'L'))
                            : null)))
            : null;
    }
    renderMissionLocation() {
        return (h("li", { class: "menu-item", onClick: ev => this.selectLocation.emit() },
            h("div", { class: "menu-left" },
                h("span", { class: "menu-icon" },
                    h("yoo-icon", { class: "yo-pin success" })),
                h("div", { class: "border" })),
            h("div", { class: "menu-right" },
                h("div", { class: "menu-title" }, translate('STORE')),
                h("div", { class: "menu-content" }, (this.mission.location ? this.mission.location.title : '') || this.mission.address))));
    }
    renderVisitDescription() {
        return (h("li", { class: "menu-item" },
            h("div", { class: "menu-left" },
                h("span", { class: "menu-icon" },
                    h("yoo-icon", { class: "yo-mission success" })),
                h("div", { class: "border" })),
            h("div", { class: "menu-right" },
                h("div", { class: "menu-title" }, translate('DESCRIPTION')),
                h("div", { class: "menu-content" }, this.mission.visitDescription))));
    }
    renderAudit() {
        return this.hasAudit ?
            h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: "yo-step success" })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate('AUDIT')),
                    h("div", { class: "menu-content" },
                        this.satisfactoryCount > 0 ? h("div", { class: "menu-content-scoring success" },
                            h("span", null,
                                translateMulti('SATISFACTORY'),
                                ":"),
                            h("span", { class: "float" },
                                " ",
                                this.satisfactoryCount)) : null,
                        this.unsatisfactoryCount > 0 ? h("div", { class: "menu-content-scoring danger" },
                            h("span", null,
                                translateMulti('UNSATISFACTORY'),
                                ":"),
                            h("span", { class: "float" },
                                " ",
                                this.unsatisfactoryCount)) : null,
                        this.nonapplicableCount > 0 ? h("div", { class: "menu-content-scoring black" },
                            h("span", null,
                                translateMulti('NONAPPLICABLE'),
                                ":"),
                            h("span", { class: "float" },
                                " ",
                                this.nonapplicableCount)) : null)))
            : null;
    }
    renderUnvalidatedReason() {
        if (this.mission.unvalidatedReason) {
            return h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: "yo-reason success" })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate(this.mission.validated === false ? 'REASON' : 'COMMENTNOUN')),
                    h("div", { class: "menu-content", innerHTML: this.mission.unvalidatedReason })));
        }
    }
    render() {
        const isStoreManager = (getSession().user && getSession().user.locationRef && (getSession().user.locationRef === this.mission.locationRef));
        return (this.mission ?
            h("div", { class: "mission-results" },
                h("div", { class: "content" },
                    h("yoo-mission-heading", { mission: this.mission }),
                    h("ul", { class: "menu" },
                        !isStoreManager && (this.mission.location || this.mission.address) ? this.renderMissionLocation() : null,
                        (this.mission.ownerDisplayName && this.mission.type !== 'visit' ? this.renderMissionOwner() : null),
                        this.mission.actualDuration > 0 ? this.renderMissionDuration() : null,
                        this.mission.skipValidation ? null : this.renderMissionValidator(),
                        this.renderPriority(),
                        this.mission.type === 'visit' ? this.renderVisitDescription() : null,
                        this.renderUnvalidatedReason(),
                        this.renderAudit()),
                    h("yoo-mission-score", { charts: this.charts, networkScore: this.networkScore, onScoreSelect: ev => this.onScoreSelect(ev.detail) })))
            : null);
    }
    static get is() { return "yoo-mission-results"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "charts": {
            "type": "Any",
            "attr": "charts"
        },
        "hasAudit": {
            "type": Boolean,
            "attr": "has-audit"
        },
        "host": {
            "elementRef": true
        },
        "mission": {
            "type": "Any",
            "attr": "mission"
        },
        "networkScore": {
            "type": Number,
            "attr": "network-score"
        },
        "nonapplicableCount": {
            "type": Number,
            "attr": "nonapplicable-count"
        },
        "satisfactoryCount": {
            "type": Number,
            "attr": "satisfactory-count"
        },
        "unsatisfactoryCount": {
            "type": Number,
            "attr": "unsatisfactory-count"
        }
    }; }
    static get events() { return [{
            "name": "selectLocation",
            "method": "selectLocation",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "selectUser",
            "method": "selectUser",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "selectValidator",
            "method": "selectValidator",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "showScoreChart",
            "method": "showScoreChart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-mission-results:**/"; }
}

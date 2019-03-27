import { translate, pipes } from '../../../utils';
import { take } from 'lodash-es';
export class YooCampaignEditorRecapComponent {
    renderEmptyContainer(section, iconClass, content) {
        return (h("div", { class: "top-container" },
            h("div", { class: "left-part" },
                h("div", { class: "heading-container" },
                    h("div", { class: "title-container" },
                        h("yoo-icon", { class: { 'yo-check': true, [iconClass]: true } }),
                        translate('CAMPAIGNEDITOR' + section.toUpperCase()))),
                content ? h("div", { class: "description-container" }, content) : h("div", { class: "description-container", innerHTML: translate('CAMPAIGNEDITOR' + section.toUpperCase() + 'DESCRIPTION') })),
            h("div", { class: "right-part" },
                section === 'content' && h("yoo-button", { class: "edit x-x-medium", onClick: () => this.previewed.emit(section), text: translate('PREVIEW') }),
                h("yoo-button", { class: "edit x-x-medium", onClick: () => this.edited.emit(section), text: translate('CAMPAIGNEDITOR' + section.toUpperCase() + 'EDIT') }))));
    }
    renderCategory(text) {
        return h("span", { class: "black" }, translate(text) + ': ');
    }
    renderStores() {
        if (this.campaign && this.campaign.storesQuery && this.campaign.storesQuery.total > 0) {
            return this.renderEmptyContainer('stores', 'success', this.campaign.storesQuery.total.toLocaleString() + ' ' + translate('CAMPAIGNEDITORSTORES'));
        }
        return this.renderEmptyContainer('stores');
    }
    renderSchedule() {
        if (this.campaign.validFrom || this.campaign.validUntil || this.campaign.duedate) {
            let content = h("div", null,
                this.campaign.validFrom && h("span", null,
                    this.renderCategory('VALIDFROM'),
                    pipes.dateFormat.transform(this.campaign.validFrom, 'L LT')),
                h("span", { class: "date-spacer" }),
                this.campaign.validUntil && h("span", null,
                    this.renderCategory('VALIDUNTIL'),
                    pipes.dateFormat.transform(this.campaign.validUntil, 'L LT'),
                    " "),
                h("span", { class: "date-spacer" }),
                this.campaign.duedate && h("span", null,
                    this.renderCategory('DUEDATE'),
                    pipes.dateFormat.transform(this.campaign.duedate, 'L LT'),
                    " "));
            return this.renderEmptyContainer('schedule', 'success', content);
        }
        return this.renderEmptyContainer('schedule');
    }
    renderContent() {
        if (this.campaign.slides && this.campaign.slides.length > 0) {
            return this.renderEmptyContainer('content', 'success', this.campaign.slides.length.toLocaleString() + ' ' + translate('PAGES'));
        }
        return this.renderEmptyContainer('content');
    }
    renderSettings() {
        if (this.campaign.group || this.campaign.serviceGroups || this.campaign.finishedGroups || this.campaign.roles || this.campaign.missionTags || this.campaign.skipValidation || this.campaign.allowSameUserValidation || this.campaign.autoRenew || this.campaign.autoRenewOnBooking || this.campaign.locationOptions || this.campaign.duration || this.campaign.submittext || this.campaign.successtext || this.campaign.versionmin) {
            let content = h("div", null,
                (this.campaign.group || this.campaign.serviceGroups || this.campaign.finishedGroups || this.campaign.roles) && h("div", null,
                    this.campaign.group && [
                        h("div", null,
                            this.renderCategory('MISSIONGROUPS'),
                            take(this.campaign.group, 5).join(', '))
                    ],
                    this.campaign.serviceGroups && [
                        h("div", null,
                            this.renderCategory('MISSIONGROUPS'),
                            take(this.campaign.serviceGroups, 5).join(', '))
                    ],
                    this.campaign.finishedGroups && [
                        h("div", null,
                            this.renderCategory('FINISHEDGROUPS'),
                            take(this.campaign.finishedGroups, 5).join(', '))
                    ],
                    this.campaign.roles && [
                        h("div", null,
                            this.renderCategory('ROLES'),
                            take(this.campaign.roles.map(r => translate(r.toUpperCase())), 5).join(', '))
                    ],
                    h("br", null)),
                (this.campaign.skipValidation || this.campaign.allowSameUserValidation) && h("div", null,
                    this.campaign.skipValidation && [
                        h("span", null,
                            this.renderCategory('SKIPVALIDATION'),
                            translate('YES')),
                        h("span", { class: "date-spacer" })
                    ],
                    this.campaign.allowSameUserValidation && [
                        h("span", null,
                            this.renderCategory('ALLOWSAMEUSERVALIDATION'),
                            translate('YES')),
                        h("span", { class: "date-spacer" })
                    ],
                    h("br", null),
                    h("br", null)),
                (this.campaign.autoRenew || this.campaign.autoRenewOnBooking || this.campaign.locationOptions) && h("div", null,
                    this.campaign.skipValidation && [
                        h("div", null,
                            this.renderCategory('AUTORENEW'),
                            translate('YES'))
                    ],
                    this.campaign.autoRenewOnBooking && [
                        h("div", null,
                            this.renderCategory('AUTORENEWONBOOKING'),
                            translate('YES'))
                    ],
                    this.campaign.locationOptions && [
                        h("div", null,
                            this.renderCategory('CHECK'),
                            translate(this.campaign.locationOptions))
                    ],
                    h("br", null)),
                (this.campaign.duration || this.campaign.submittext || this.campaign.successtext || this.campaign.versionmin) && h("div", null,
                    this.campaign.duration && [
                        h("span", null,
                            this.renderCategory('MISSIONDURATION'),
                            this.campaign.duration + translate('MIN')),
                        h("span", { class: "date-spacer" })
                    ],
                    this.campaign.submittext && [
                        h("span", null,
                            this.renderCategory('SUBMITTEXT'),
                            this.campaign.submittext.substr(0, 10)),
                        h("span", { class: "date-spacer" })
                    ],
                    this.campaign.successtext && [
                        h("span", null,
                            this.renderCategory('SUCCESSTEXT'),
                            this.campaign.successtext.substr(0, 10)),
                        h("span", { class: "date-spacer" })
                    ],
                    this.campaign.versionmin && [
                        h("span", null,
                            this.renderCategory('SUCCESSTEXT'),
                            this.campaign.versionmin),
                        h("span", { class: "date-spacer" })
                    ],
                    h("br", null)));
            return this.renderEmptyContainer('settings', 'success', content);
        }
        return this.renderEmptyContainer('settings');
    }
    renderNotifications() {
        if (this.campaign.notify || this.campaign.notificationemail || this.campaign.disableLocationNotificationemail || this.campaign.pdfMode) {
            let content = h("div", null,
                this.campaign.notify && h("span", null,
                    this.renderCategory('NOTIFY'),
                    translate('YES')),
                h("span", { class: "date-spacer" }),
                this.campaign.notifyBody && h("span", null,
                    this.renderCategory('NOTIFICATION'),
                    this.campaign.notifyBody.substr(0, 10)),
                h("span", { class: "date-spacer" }),
                this.campaign.notifyScheduledDate && h("span", null,
                    this.renderCategory('SCHEDULEDDATE'),
                    pipes.dateFormat.transform(this.campaign.notifyScheduledDate, 'L LT')),
                h("span", { class: "date-spacer" }),
                this.campaign.notificationemail && h("div", null,
                    h("br", null),
                    h("span", null,
                        this.renderCategory('NOTIFICATIONEMAILS'),
                        take(this.campaign.notificationemail, 5).join(', ')),
                    h("span", { class: "date-spacer" }),
                    this.campaign.disableLocationNotificationemail === false && h("span", null,
                        this.renderCategory('DISABLENOTIFICATIONEMAIL'),
                        translate('NO'))),
                this.campaign.pdfMode && h("div", null,
                    h("br", null),
                    h("span", null,
                        this.renderCategory('PDFEXPORT'),
                        translate(this.campaign.pdfMode))));
            return this.renderEmptyContainer('notifications', 'success', content);
        }
        return this.renderEmptyContainer('notifications');
    }
    render() {
        return [
            this.renderStores(),
            this.campaign && this.campaign.type !== 'service' ? this.renderSchedule() : null,
            this.renderContent(),
            this.renderSettings(),
            this.renderNotifications()
        ];
    }
    static get is() { return "yoo-campaign-editor-recap"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "campaign": {
            "type": "Any",
            "attr": "campaign"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get events() { return [{
            "name": "edited",
            "method": "edited",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "previewed",
            "method": "previewed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-campaign-editor-recap:**/"; }
}

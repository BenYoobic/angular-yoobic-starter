import { translate, getCampaignStateBadges, dateFormat } from '../../../utils';
export class YooCampaignHeadingComponent {
    constructor() {
        this.showSecondaryActions = false;
        this.showMore = false;
        this.secondaryActions = [
            { text: translate('PUBLISH'), icon: 'yo-publish', handler: () => this.published.emit(this.campaign) },
            { text: translate('NOTIFY'), icon: 'yo-send', handler: () => this.notified.emit(true) },
            { text: translate('LIVEPREVIEW'), icon: 'yo-iphone', handler: () => this.livePreviewed.emit(this.campaign) },
            { text: translate('ARCHIVECAMPAIGN'), icon: 'yo-archive', handler: () => this.archived.emit(this.campaign) },
            { text: translate('FINISHCAMPAIGN'), icon: 'yo-unbook', handler: () => this.finished.emit(this.campaign) }
        ];
    }
    toggleMore() {
        this.showMore = !this.showMore;
    }
    renderTags() {
        return (this.campaign.tags && h("div", { class: "tags-container" }, this.campaign.tags.map(tag => {
            return h("span", { class: "hashtag", innerHTML: `#${tag.toLowerCase()}` });
        })));
    }
    renderBadgesContainer() {
        const campaignBadges = getCampaignStateBadges(this.campaign);
        return (h("div", { class: "badges-container" }, campaignBadges ? campaignBadges.map(b => h("yoo-badge", { text: b.text, class: b.cssClass })) : null));
    }
    renderTopContainer() {
        return (h("div", { class: "top-container" },
            h("div", { class: "left-part" },
                h("div", { class: "heading-container" },
                    h("div", { class: "title-container" }, this.campaign.title),
                    this.renderBadgesContainer()),
                h("div", { class: "description-container", innerHTML: this.campaign.text }),
                this.renderTags()),
            h("div", { class: "right-part" },
                h("yoo-button", { class: "edit x-x-medium", onClick: () => this.edited.emit(true), text: translate('EDIT') }),
                h("yoo-context-menu", { contentButtons: this.secondaryActions, contentPosition: { top: '4rem', right: '0', bottom: 'auto', left: 'auto' } },
                    h("yoo-button", { class: "secondary-actions icon-only", icon: "yo-more" })))));
    }
    renderMoreContent() {
        return (h("div", { class: "more-content" },
            h("div", { class: "row" },
                h("div", { class: "campaign-type" },
                    h("span", { class: "black" }, `${translate('CAMPAIGNTYPE')}: `),
                    h("span", { class: "text" }, `${translate(this.campaign.type.toUpperCase())} • ${this.campaign.recurring ? translate('RECURRING') : ''}`)),
                h("div", { class: "campaign-pages" },
                    h("span", { class: "black" }, `${translate('PAGES')}: `),
                    h("span", { class: "text" }, `${this.campaign.slides ? this.campaign.slides.length : 0}`))),
            h("div", { class: "row" },
                h("div", { class: "edited-by" },
                    h("span", { class: "black" }, `${translate('EDITED')}: `),
                    h("span", { class: "text" }, `${dateFormat(this.campaign._ect, 'L')} ${translate('BY').toLowerCase()}`)))));
    }
    renderBottomContainer() {
        return (h("div", { class: { 'bottom-container': true, 'no-border': this.alwaysExpanded } },
            !this.alwaysExpanded && h("div", { class: { "more-container": true, 'open': this.showMore }, onClick: () => this.toggleMore() },
                h("span", { class: "more-icon" },
                    h("yoo-icon", { class: this.showMore ? 'yo-down' : 'yo-right' })),
                h("span", { class: "more-text" }, translate('MORE'))),
            (this.showMore || this.alwaysExpanded) && this.renderMoreContent()));
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "inner-container" },
                this.renderTopContainer(),
                this.renderBottomContainer())));
    }
    static get is() { return "yoo-campaign-heading"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "alwaysExpanded": {
            "type": Boolean,
            "attr": "always-expanded"
        },
        "campaign": {
            "type": "Any",
            "attr": "campaign"
        },
        "host": {
            "elementRef": true
        },
        "showMore": {
            "state": true
        },
        "showSecondaryActions": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "edited",
            "method": "edited",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "published",
            "method": "published",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "notified",
            "method": "notified",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "livePreviewed",
            "method": "livePreviewed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "archived",
            "method": "archived",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "finished",
            "method": "finished",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-campaign-heading:**/"; }
}

const h = window.DesignSystem.h;

import { m as translate, ab as getCampaignStateBadges, A as dateFormat } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooCampaignHeadingComponent {
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
    static get style() { return ":host .outer-container {\n  padding: var(--padding-20, 1.25rem) var(--padding-40, 2.5rem) 0 var(--padding-40, 2.5rem);\n  background: var(--light, #FFFFFF); }\n  :host .outer-container .inner-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n    :host .outer-container .inner-container .top-container {\n      display: -ms-flexbox;\n      display: flex; }\n      :host .outer-container .inner-container .top-container .left-part {\n        -ms-flex: 1;\n        flex: 1; }\n        :host .outer-container .inner-container .top-container .left-part .heading-container {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-align: center;\n          align-items: center; }\n          :host .outer-container .inner-container .top-container .left-part .heading-container .title-container {\n            padding-right: var(--padding-10, 0.625rem);\n            font-size: var(--font-lx, 27px);\n            font-weight: normal; }\n          :host .outer-container .inner-container .top-container .left-part .heading-container .badges-container yoo-badge {\n            margin-right: 0.3rem; }\n        :host .outer-container .inner-container .top-container .left-part .description-container {\n          margin-bottom: var(--padding-5, 0.3125rem);\n          color: var(--text-color, #807f83);\n          font-size: var(--font-m, 15px);\n          font-weight: normal; }\n          :host .outer-container .inner-container .top-container .left-part .description-container p {\n            margin: 0; }\n        :host .outer-container .inner-container .top-container .left-part .tags-container {\n          display: block;\n          margin-bottom: var(--padding-5, 0.3125rem);\n          color: var(--success, #04CC99); }\n          :host .outer-container .inner-container .top-container .left-part .tags-container .hashtag {\n            padding-right: var(--padding-10, 0.625rem); }\n      :host .outer-container .inner-container .top-container .right-part {\n        display: -ms-flexbox;\n        display: flex;\n        position: relative;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center; }\n        :host .outer-container .inner-container .top-container .right-part yoo-button.edit {\n          --color-value: var(--black, #000000);\n          --shadow: none;\n          --border-container: 1px solid var(--stable-light, #f1f1f1);\n          margin-right: var(--padding-20, 1.25rem); }\n        :host .outer-container .inner-container .top-container .right-part yoo-button.secondary-actions {\n          --color-value: var(--light, #FFFFFF);\n          --width-icon-only-container: 1.125rem;\n          --height-icon-only-container: 1.125rem;\n          --font-size-icon: 0.75rem;\n          --background-container: var(--text-color, #807f83); }\n    :host .outer-container .inner-container .bottom-container {\n      padding-bottom: var(--padding-10, 0.625rem);\n      color: var(--text-color, #807f83);\n      font-size: var(--font-s, 13px); }\n      :host .outer-container .inner-container .bottom-container:not(.no-border) {\n        border-bottom: 1px solid var(--stable-light, #f1f1f1); }\n      :host .outer-container .inner-container .bottom-container .more-container.open {\n        margin-bottom: var(--padding-5, 0.3125rem); }\n      :host .outer-container .inner-container .bottom-container .more-container .more-icon {\n        padding-right: var(--padding-5, 0.3125rem);\n        font-size: var(--font-xs, 10px); }\n      :host .outer-container .inner-container .bottom-container .more-content {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column; }\n        :host .outer-container .inner-container .bottom-container .more-content .row {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex: 1;\n          flex: 1;\n          margin-bottom: var(--padding-5, 0.3125rem); }\n          :host .outer-container .inner-container .bottom-container .more-content .row .black {\n            color: var(--black, #000000); }\n          :host .outer-container .inner-container .bottom-container .more-content .row .campaign-type {\n            padding-right: var(--padding-30, 1.875rem); }"; }
}

export { YooCampaignHeadingComponent as YooCampaignHeading };

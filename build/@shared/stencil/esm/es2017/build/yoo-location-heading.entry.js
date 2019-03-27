import { h } from '../design-system.core.js';

import { at as showImageModal, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';
import './index.js';

class YooLocationHeadingComponent {
    onIconClick() {
        let image = this.location.imageData; // || getGoogleMapStreeView(this.location, window.innerWidth, window.innerHeight);
        if (image) {
            showImageModal(image, this.location.title);
        }
    }
    renderVipBagde() {
        return (h("div", { class: "top-right-vip" },
            h("yoo-badge", { iconLeft: 'yo-star', class: "round energized icon-only" })));
    }
    renderTags() {
        return (this.location.tags && h("div", { class: "tags-container" }, this.location.tags.slice(0, 5).map(tag => {
            return h("span", { class: "hashtag", innerHTML: `#${tag.toLowerCase()}` });
        })));
    }
    hostData() {
        return {
            class: {
                'vip': this.location.vip
            }
        };
    }
    render() {
        let image = this.location.imageData; // || getGoogleMapStreeView(this.location, 70, 70);
        return (h("div", { class: "outer-container" },
            h("div", { class: "image-container", onClick: () => this.onIconClick() },
                h("yoo-avatar", { class: "medium", imgSrc: image, icon: 'yo-store success' }),
                this.location.vip && this.renderVipBagde()),
            h("div", { class: "text-container" },
                h("div", { class: "title" }, this.location.title),
                h("div", { class: "address" },
                    h("div", null, this.location.address),
                    this.renderTags()),
                this.lastVisitDate && h("div", { class: "last-visit" },
                    h("span", { class: "black" },
                        translate('VISIT'),
                        ":"),
                    h("span", null,
                        "\u00A0",
                        pipes.dateFormat.transform(this.lastVisitDate, 'L LT'))),
                this.location.countVisits && h("div", { class: "last-visit" },
                    h("span", { class: "black" },
                        translate('VISITCOUNT'),
                        ":"),
                    h("span", null,
                        "\u00A0",
                        this.location.countVisits.toString())))));
    }
    static get is() { return "yoo-location-heading"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "lastVisitDate": {
            "type": "Any",
            "attr": "last-visit-date"
        },
        "location": {
            "type": "Any",
            "attr": "location"
        }
    }; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-flow: row wrap;\n  flex-flow: row wrap;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n  padding: 0.8em 0;\n  padding-bottom: 0;\n  background: var(--light, #FFFFFF); }\n  :host .outer-container .image-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -ms-flex: 0.4;\n    flex: 0.4;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    text-align: center; }\n    :host .outer-container .image-container .top-right-vip {\n      position: absolute;\n      top: -5px;\n      right: 10px; }\n      :host .outer-container .image-container .top-right-vip yoo-badge {\n        --inner-container-default-padding: 0.5rem 0.5rem;\n        --outer-container-border: 2px solid var(--light, #FFFFFF);\n        --font-size-inner-container: var(--font-l, 17px); }\n  :host .outer-container .large-address {\n    padding-top: 1em; }\n  :host .outer-container .text-container {\n    -ms-flex: 1;\n    flex: 1;\n    padding-top: 0.3rem;\n    padding-right: 0.5em;\n    font-size: var(--font-s, 13px); }\n    :host .outer-container .text-container .title {\n      color: var(--black, #000000);\n      font-size: var(--font-l, 17px); }\n    :host .outer-container .text-container .black {\n      color: var(--black, #000000); }\n    :host .outer-container .text-container .address,\n    :host .outer-container .text-container .last-visit {\n      padding-top: 0.1em;\n      color: var(--text-color, #807f83); }\n    :host .outer-container .text-container .tags-container {\n      color: var(--success, #04CC99);\n      word-break: break-all; }\n      :host .outer-container .text-container .tags-container .hashtag {\n        padding-right: var(--padding-10, 0.625rem); }\n\n:host(.vip) .outer-container .image-container yoo-avatar {\n  --border-initial: 2px solid var(--light, #FFFFFF);\n  --image-shadow: 0 0 0 3px var(--energized, #fed05b); }"; }
}

export { YooLocationHeadingComponent as YooLocationHeading };

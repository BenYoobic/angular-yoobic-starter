const h = window.DesignSystem.h;

import { m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';
import './index.js';

class YooLocationInfoComponent {
    render() {
        if (!this.location.info && !this.location.contactname && !this.location.contactemail && !this.location.contactphone) {
            return;
        }
        return h("div", { class: "outer-container" },
            h("div", { class: "menu-content" },
                h("span", null, translate('MAINCONTACT')),
                (this.location.contactname && h("div", { class: "menu-content-contact name", innerHTML: this.location.contactname })),
                (this.location.contactemail && h("div", null,
                    h("a", { href: 'email:' + this.location.contactemail, class: "menu-content-contact email", innerHTML: this.location.contactemail }))),
                (this.location.contactphone && h("div", null,
                    h("a", { href: 'tel:' + this.location.contactphone, class: "menu-content-contact phone", innerHTML: this.location.contactphone })))),
            this.location && this.location.info && h("div", { class: "info", innerHTML: pipes.https.transform(this.location.info) }));
    }
    static get is() { return "yoo-location-info"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "location": {
            "type": "Any",
            "attr": "location"
        }
    }; }
    static get style() { return ":host .outer-container {\n  padding: 0.5rem 1rem;\n  border-top: 1px solid var(--stable-30, #E6E6E6);\n  background: var(--light, #FFFFFF); }\n  :host .outer-container .menu-content {\n    line-height: 1.75; }\n    :host .outer-container .menu-content span {\n      color: var(--black, #000000);\n      font-size: var(--font-ll, 20px);\n      font-weight: 600;\n      line-height: 1em; }\n    :host .outer-container .menu-content .menu-content-contact {\n      text-decoration: none; }\n      :host .outer-container .menu-content .menu-content-contact.name {\n        font-size: var(--font-l, 17px); }\n      :host .outer-container .menu-content .menu-content-contact.email {\n        color: var(--success, #04CC99); }\n      :host .outer-container .menu-content .menu-content-contact.phone {\n        color: var(--dark, #2b3648); }"; }
}

export { YooLocationInfoComponent as YooLocationInfo };

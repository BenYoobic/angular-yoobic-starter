import { h } from '../design-system.core.js';

import { m as translate, dg as getPeriodOfDay } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooWelcomeBannerComponent {
    constructor() {
        this.mainText = '';
    }
    render() {
        return (h("div", { class: "container" },
            h("h1", { class: "text" }, this.user ? translate('HELLO_USER', {
                day_period: translate(getPeriodOfDay()),
                user_firstname: this.user.firstName ? this.user.firstName : this.user.username
            }) : translate(this.mainText)),
            this.subText ? h("h3", { class: "sub-text" },
                translate(this.subText),
                " ") : null));
    }
    static get is() { return "yoo-welcome-banner"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "mainText": {
            "type": String,
            "attr": "main-text"
        },
        "subText": {
            "type": String,
            "attr": "sub-text"
        },
        "user": {
            "type": "Any",
            "attr": "user"
        }
    }; }
    static get style() { return ":host {\n  --text-font: 1.375rem;\n  --sub-text-font: var(--font-m, 15px); }\n  :host .container {\n    padding: 0.5rem 1rem 0 1rem; }\n    :host .container .text {\n      font-size: var(--text-font);\n      font-weight: normal;\n      -webkit-margin-before: 0;\n      margin-block-start: 0;\n      -webkit-margin-after: 0;\n      margin-block-end: 0; }\n    :host .container .sub-text {\n      color: var(--stable, #adadad);\n      font-size: var(--sub-text-font);\n      font-weight: normal;\n      -webkit-margin-before: 0;\n      margin-block-start: 0;\n      -webkit-margin-after: 0;\n      margin-block-end: 0; }\n\n:host(.padding) .container {\n  padding: 2.4rem 1rem 0.4rem 1rem; }\n  :host(.padding) .container .text {\n    font-size: 27px; }"; }
}

export { YooWelcomeBannerComponent as YooWelcomeBanner };

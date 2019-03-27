const h = window.DesignSystem.h;

import { b6 as translateMulti, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooResultDialogComponent {
    onClose() {
        this.close.emit();
    }
    render() {
        return ([
            h("div", { class: "outer-container" },
                h("img", { class: "result-dialog-icon", src: this.success ? 'assets/empty-states/check.svg' : 'assets/empty-states/reject.svg' }),
                (this.heading ?
                    h("div", { class: "result-dialog-heading", innerHTML: translateMulti(this.heading) }) : null),
                (this.subheading ? h("div", { class: "result-dialog-subheading", innerHTML: translateMulti(this.subheading) }) : null),
                h("div", { class: "result-dialog-footer" },
                    h("div", { class: "border" }),
                    h("div", { class: "result-dialog-footer-button", onClick: () => this.onClose() }, translate(this.buttonText || 'OK'))))
        ]);
    }
    static get is() { return "yoo-result-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "buttonText": {
            "type": String,
            "attr": "button-text"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "subheading": {
            "type": String,
            "attr": "subheading"
        },
        "success": {
            "type": Boolean,
            "attr": "success"
        }
    }; }
    static get events() { return [{
            "name": "close",
            "method": "close",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  min-width: 300px;\n  border-radius: 0.5rem;\n  background: var(--light, #FFFFFF);\n  text-align: center;\n  -webkit-box-shadow: var(--card-shadow, 0 2px 4px 0 rgba(40, 47, 54, 0.08));\n  box-shadow: var(--card-shadow, 0 2px 4px 0 rgba(40, 47, 54, 0.08));\n  z-index: 1; }\n  :host .outer-container .result-dialog-icon {\n    width: 50px;\n    margin-top: 2.5rem;\n    margin-bottom: 1.25rem; }\n  :host .outer-container .result-dialog-heading {\n    margin-bottom: 0.3125rem;\n    padding-right: 1rem;\n    padding-left: 1rem;\n    font-size: var(--font-l, 17px);\n    font-weight: 600;\n    line-height: var(--padding-25, 1.5625rem); }\n  :host .outer-container .result-dialog-subheading {\n    margin-bottom: 2.21875rem;\n    padding-right: 1rem;\n    padding-left: 1rem;\n    color: var(--text-color, #807f83);\n    font-size: var(--padding-15, 0.9375rem);\n    line-height: 1.33; }\n  :host .outer-container .border {\n    width: 100%;\n    height: 1px;\n    background-color: var(--stable-alt, #d0d0d0); }\n  :host .outer-container .result-dialog-footer {\n    width: 100%;\n    font-size: var(--font-l, 17px);\n    font-weight: 600; }\n    :host .outer-container .result-dialog-footer .result-dialog-footer-button {\n      padding-top: 0.65625rem;\n      padding-bottom: 0.75rem; }"; }
}

export { YooResultDialogComponent as YooResultDialog };

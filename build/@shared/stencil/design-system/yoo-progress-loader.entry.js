const h = window.DesignSystem.h;

import { m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooProgressLoaderComponent {
    constructor() {
        this.logo = './assets/logo/operations_simple.svg';
    }
    hostData() {
        return {
            class: {
                [`${this.progressBarClass}-color`]: true
            }
        };
    }
    render() {
        return (h("div", { class: "progress-loader-container" },
            h("div", { class: "logo-container" },
                h("img", { src: this.logo, height: '75', alt: "YOOBIC Logo" })),
            h("div", { class: "progress-bar-container" },
                h("yoo-progress-bar-core", { progressValue: this.progress, maxValue: 100 })),
            h("div", { class: "progress-text-container" },
                h("span", { class: "progress-text" }, translate('LIVEUPDATEPROGRESS')))));
    }
    static get is() { return "yoo-progress-loader"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "logo": {
            "type": String,
            "attr": "logo"
        },
        "progress": {
            "type": Number,
            "attr": "progress"
        },
        "progressBarClass": {
            "type": String,
            "attr": "progress-bar-class"
        }
    }; }
    static get style() { return ":host {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  background: var(--light, #FFFFFF);\n  opacity: 1;\n  z-index: 500; }\n  :host .progress-loader-container .logo-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  :host .progress-loader-container .progress-bar-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n    justify-content: center;\n    margin: 1.25rem 6.875rem 1.12rem 6.875rem; }\n  :host .progress-loader-container .progress-text-container {\n    margin: 0 3.75rem;\n    text-align: center; }\n    :host .progress-loader-container .progress-text-container .progress-text {\n      font-size: var(--font-m, 15px);\n      font-style: normal;\n      font-weight: 300;\n      letter-spacing: normal;\n      line-height: normal; }"; }
}

export { YooProgressLoaderComponent as YooProgressLoader };

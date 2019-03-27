const h = window.DesignSystem.h;

import { m as translate, G as getGrade, H as getDeviceType, I as getOS } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooAboutComponent {
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "content" },
                h("img", { src: this.logo, height: "51.8", alt: "YOOBIC Logo" }),
                h("div", { class: "informations" },
                    h("div", { class: "information" },
                        this.app,
                        " ",
                        this.version),
                    h("div", { class: "information" },
                        "\u00A9 2014 - ",
                        new Date().getFullYear(),
                        " Yoobic Ltd."),
                    h("div", { class: "information" },
                        translate('DEVICE') + ': ',
                        " ",
                        translate('GRADE') + ' ' + getGrade() + ' - ',
                        " ",
                        getDeviceType() + ' - ',
                        " ",
                        getOS())),
                h("div", { class: "links-container" },
                    this.twitter ? h("a", { href: this.twitter, target: "_blank" },
                        h("yoo-icon", { class: "yo-twitter" })) : null,
                    this.linkedin ? h("a", { href: this.linkedin, target: "_blank" },
                        h("yoo-icon", { class: "yo-linkedin" })) : null)),
            h("div", { class: "footer" },
                h("div", { class: "powered-by" },
                    translate('POWEREDBY'),
                    h("div", { class: "powered-img" },
                        h("img", { src: "./assets/logo/yoobic_simple.svg", height: "12.8" })),
                    h("div", { class: "yoobic-text" }, "YOOBIC")))));
    }
    static get is() { return "yoo-about"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "app": {
            "type": String,
            "attr": "app"
        },
        "host": {
            "elementRef": true
        },
        "linkedin": {
            "type": String,
            "attr": "linkedin"
        },
        "logo": {
            "type": String,
            "attr": "logo"
        },
        "twitter": {
            "type": String,
            "attr": "twitter"
        },
        "version": {
            "type": String,
            "attr": "version"
        }
    }; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  height: 100%;\n  text-align: center; }\n  :host .outer-container .content {\n    padding-top: 1.25rem; }\n    :host .outer-container .content .informations {\n      margin-top: 1.4375rem; }\n      :host .outer-container .content .informations .information {\n        font-size: 12px;\n        font-weight: 300;\n        text-transform: capitalize; }\n    :host .outer-container .content .links-container {\n      margin-top: 1.3125rem; }\n      :host .outer-container .content .links-container a {\n        margin-right: var(--padding-15, 0.9375rem);\n        color: var(--dark, #2b3648);\n        text-decoration: none; }\n  :host .outer-container .footer {\n    padding-bottom: 1.25rem; }\n    :host .outer-container .footer .powered-by {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      font-size: 11px; }\n      :host .outer-container .footer .powered-by .powered-img {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        padding-right: 0.25rem;\n        padding-left: 0.3125rem; }"; }
}

export { YooAboutComponent as YooAbout };

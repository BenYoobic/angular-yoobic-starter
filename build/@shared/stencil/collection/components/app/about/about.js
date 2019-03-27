import { getGrade, translate, getDeviceType, getOS } from '../../../index'; //'../../../../stencil';
export class YooAboutComponent {
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
    static get style() { return "/**style-placeholder:yoo-about:**/"; }
}

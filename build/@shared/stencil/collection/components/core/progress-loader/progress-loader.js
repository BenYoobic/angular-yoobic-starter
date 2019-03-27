import { translate } from '../../../utils';
export class YooProgressLoaderComponent {
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
    static get style() { return "/**style-placeholder:yoo-progress-loader:**/"; }
}

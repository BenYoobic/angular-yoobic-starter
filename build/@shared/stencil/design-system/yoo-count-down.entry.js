const h = window.DesignSystem.h;

import { m as translate, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooCountDownComponent {
    constructor() {
        this.start = 0;
        this.showGetReady = true;
    }
    componentDidLoad() {
        this.showGetReady = false;
        this.countdownInterval = setInterval(() => {
            this.start--;
            if (this.start < 0) {
                clearInterval(this.countdownInterval);
                this.finish.emit();
            }
        }, 1000);
    }
    componentDidUnload() {
        clearInterval(this.countdownInterval);
    }
    renderGetReady() {
        return (h("div", { class: "getready" }, translate('GETREADY')));
    }
    renderTimer() {
        return (h("div", { class: "ripple" },
            h("div", { class: "ripple" },
                h("div", { class: "timer" }, this.start + 1))));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "outer-container" }, this.showGetReady ? this.renderGetReady() : this.renderTimer()));
    }
    static get is() { return "yoo-count-down"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "start": {
            "type": Number,
            "attr": "start",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "finish",
            "method": "finish",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n\n\@-webkit-keyframes pulse {\n  0% {\n    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);\n    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1); }\n  100% {\n    -webkit-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);\n    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1); } }\n\n\@keyframes pulse {\n  0% {\n    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);\n    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1); }\n  100% {\n    -webkit-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);\n    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1); } }\n  :host .outer-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    height: 100%; }\n    :host .outer-container .ripple {\n      padding: 1.5625rem;\n      border-radius: 100%;\n      background-color: var(--light, #FFFFFF);\n      -webkit-animation: pulse 1s infinite;\n      animation: pulse 1s infinite; }\n    :host .outer-container .getready {\n      -ms-flex-align: center;\n      align-items: center;\n      color: var(--danger-light, #F46885);\n      font-size: calc(var(--font-ll, 20px) * 2);\n      font-weight: bold;\n      text-align: center; }\n    :host .outer-container .timer {\n      width: 9.375rem;\n      height: 9.375rem;\n      border-radius: 100%;\n      background-color: var(--gradient-danger-light, #F46885);\n      color: var(--light, #FFFFFF);\n      font-size: calc(var(--font-ll, 20px) * 4);\n      line-height: 9.375rem;\n      text-align: center;\n      -webkit-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);\n      box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);\n      -webkit-animation: pulse 1s infinite;\n      animation: pulse 1s infinite; }\n\n:host(.web) .outer-container {\n  background: var(--light, #FFFFFF);\n  position: absolute;\n  left: 0;\n  right: 0; }"; }
}

export { YooCountDownComponent as YooCountDown };

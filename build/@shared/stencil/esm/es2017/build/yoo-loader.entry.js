import { h } from '../design-system.core.js';

import { L as querySelectorDeep, bb as isSafari, a5 as getAppContext, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooLoaderComponent {
    constructor() {
        this.enableAnimation = false;
    }
    showLoadingAnimation() {
        this.enableAnimation = true;
        this.host.forceUpdate();
    }
    componentDidLoad() {
        if (this.height) {
            querySelectorDeep(this.host, '.container').setAttribute('style', `height: ${this.height}px; top: unset;`);
        }
    }
    componentDidUpdate() {
        if (this.enableAnimation && this.showFinishAnimation) {
            this.checkMarkDiv.classList.add('active');
            this.progressDiv.style.display = 'none';
            this.enableAnimation = false;
            setTimeout(() => { this.onAnimationEnd(); }, 1500);
        }
    }
    onAnimationEnd() {
        this.animationCompleted.emit(true);
    }
    renderCheckMark() {
        return h("svg", { class: "checkmark", ref: el => this.checkMarkDiv = el, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 52 52" },
            h("circle", { class: "checkmark-circle", cx: "26", cy: "26", r: "25", fill: "none" }),
            h("path", { class: "checkmark-check", fill: "none", d: "M14.1 27.2l7.1 7.2 16.7-16.8" }));
    }
    hostData() {
        return {
            class: {
                'safari': isSafari()
            }
        };
    }
    render() {
        //setAnimation(animations.fade, this.host, { open: true });
        return h("div", { class: "container" },
            h("div", { class: "value", ref: el => this.progressDiv = el },
                getAppContext()['boost'] ? h("img", { src: "assets/loader/loading_thin_boost.svg" }) : h("img", { src: "assets/loader/loading_thin.svg" }),
                this.progress ? h("yoo-progress-bar-core", { progressValue: this.progress, maxValue: this.maxValue }) : null,
                this.text ? h("div", { class: "text", innerHTML: translate(this.text) + ' ...' }) : null),
            this.showFinishAnimation ? this.renderCheckMark() : null);
    }
    static get is() { return "yoo-loader"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "height": {
            "type": Number,
            "attr": "height"
        },
        "host": {
            "elementRef": true
        },
        "maxValue": {
            "type": Number,
            "attr": "max-value"
        },
        "progress": {
            "type": Number,
            "attr": "progress"
        },
        "showFinishAnimation": {
            "type": Boolean,
            "attr": "show-finish-animation"
        },
        "showLoadingAnimation": {
            "method": true
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "animationCompleted",
            "method": "animationCompleted",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --curve: cubic-bezier(0.650, 0.000, 0.450, 1.000); }\n\n:host {\n  display: block; }\n  :host .container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    text-align: center; }\n\n\@-webkit-keyframes stroke {\n  100% {\n    stroke-dashoffset: 0; } }\n\n\@keyframes stroke {\n  100% {\n    stroke-dashoffset: 0; } }\n\n\@-webkit-keyframes scale {\n  0%, 100% {\n    -webkit-transform: none;\n    transform: none; }\n  50% {\n    -webkit-transform: scale3d(1.1, 1.1, 1);\n    transform: scale3d(1.1, 1.1, 1); } }\n\n\@keyframes scale {\n  0%, 100% {\n    -webkit-transform: none;\n    transform: none; }\n  50% {\n    -webkit-transform: scale3d(1.1, 1.1, 1);\n    transform: scale3d(1.1, 1.1, 1); } }\n\n\@-webkit-keyframes fill {\n  100% {\n    -webkit-box-shadow: inset 0px 0px 0px 30px var(--success, #04CC99);\n    box-shadow: inset 0px 0px 0px 30px var(--success, #04CC99); } }\n\n\@keyframes fill {\n  100% {\n    -webkit-box-shadow: inset 0px 0px 0px 30px var(--success, #04CC99);\n    box-shadow: inset 0px 0px 0px 30px var(--success, #04CC99); } }\n    :host .container .value {\n      font-size: var(--font-l, 17px);\n      font-weight: bold;\n      line-height: 1.5;\n      text-align: center; }\n      :host .container .value img {\n        width: 1rem;\n        height: 1rem; }\n    :host .container .checkmark-circle {\n      stroke-dasharray: 166;\n      stroke-dashoffset: 166;\n      stroke-width: 2;\n      stroke-miterlimit: 10;\n      stroke: var(--success, #04CC99);\n      fill: none; }\n    :host .container .checkmark {\n      display: block;\n      position: absolute;\n      width: 40px;\n      height: 40px;\n      margin: 10% auto;\n      border-radius: 50%;\n      -webkit-box-shadow: inset 0px 0px 0px var(--success, #04CC99);\n      box-shadow: inset 0px 0px 0px var(--success, #04CC99);\n      opacity: 0;\n      stroke-width: 2;\n      stroke: #fff;\n      stroke-miterlimit: 10; }\n      :host .container .checkmark.active {\n        position: initial;\n        opacity: 1;\n        -webkit-animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;\n        animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both; }\n        :host .container .checkmark.active .checkmark-check {\n          -webkit-animation: stroke 0.3s var(--curve) 0.8s forwards;\n          animation: stroke 0.3s var(--curve) 0.8s forwards; }\n        :host .container .checkmark.active .checkmark-circle {\n          -webkit-animation: stroke 0.6s var(--curve) forwards;\n          animation: stroke 0.6s var(--curve) forwards; }\n    :host .container .checkmark-check {\n      -webkit-transform-origin: 50% 50%;\n      transform-origin: 50% 50%;\n      stroke-dasharray: 48;\n      stroke-dashoffset: 48; }\n    :host .container .text {\n      margin: 1rem;\n      color: var(--text-color, #807f83);\n      font-weight: 400; }\n\n:host(.absolute) {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9; }\n\n:host(.absolute.safari) .container {\n  position: absolute; }\n\n:host(.fixed) {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9; }\n\n:host(.backdrop) .container {\n  background: var(--backdrop-light, rgba(255, 255, 255, 0.8)); }\n\n:host(.backdrop-dark) .container {\n  background: var(--backdrop, rgba(4, 4, 15, 0.4)); }\n\n:host(.dark) .container {\n  background: var(--black, #000000); }\n\n:host(.small) .container .value img {\n  width: 1rem;\n  height: 1rem; }\n\n:host(.medium) .container .value img {\n  width: 1.75rem;\n  height: 1.75rem; }\n\n:host(.large) .container .value img {\n  width: 2.5rem;\n  height: 2.5rem; }"; }
}

export { YooLoaderComponent as YooLoader };

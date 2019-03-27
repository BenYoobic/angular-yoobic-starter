const h = window.DesignSystem.h;

import { a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooTappableComponent {
    constructor() {
        this.tapped = false;
        this.hovered = false;
        this.touchFlag = true;
        this.touch_timeout = 500;
    }
    onTouchDown() {
        if (!this.tapped) {
            this.touchFlag = false;
            this.dotDiv.classList.add('tapped');
            setTimeout(() => {
                if (this.dotDiv && this.dotDiv.classList) {
                    this.dotDiv.classList.remove('tapped');
                    this.tapped = false;
                    this.touchFlag = true;
                }
            }, this.touch_timeout);
        }
    }
    onMouseOver() {
        if (!this.hovered && this.touchFlag) {
            this.hovered = true;
            this.dotDiv.classList.add('hovered');
        }
    }
    onMouseOut() {
        if (this.hovered && this.touchFlag) {
            this.hovered = false;
            this.dotDiv.classList.remove('hovered');
        }
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return [
            h("slot", null),
            h("div", { class: "dot", ref: el => this.dotDiv = el })
        ];
    }
    static get is() { return "yoo-tappable"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "hovered": {
            "state": true
        },
        "tapped": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "touchstart",
            "method": "onTouchDown",
            "passive": true
        }, {
            "name": "mouseover",
            "method": "onMouseOver",
            "passive": true
        }, {
            "name": "mouseleave",
            "method": "onMouseOut",
            "passive": true
        }]; }
    static get style() { return ":host {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  width: 100%;\n  z-index: 0; }\n\n:host(.neutral) .dot {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  z-index: -1;\n  background-color: var(--dark, #2b3648) !important;\n  opacity: 0.2; }\n\n\@-webkit-keyframes expand-to-full {\n  0% {\n    width: 0%;\n    background-color: var(--dark, #2b3648) !important;\n    opacity: 0; }\n  100% {\n    width: 100%;\n    background-color: var(--dark, #2b3648) !important;\n    opacity: 0.8; } }\n\n\@keyframes expand-to-full {\n  0% {\n    width: 0%;\n    background-color: var(--dark, #2b3648) !important;\n    opacity: 0; }\n  100% {\n    width: 100%;\n    background-color: var(--dark, #2b3648) !important;\n    opacity: 0.8; } }\n\n\@-webkit-keyframes anim-in {\n  0% {\n    width: 0%; }\n  100% {\n    width: 100%;\n    z-index: -1; } }\n\n\@keyframes anim-in {\n  0% {\n    width: 0%; }\n  100% {\n    width: 100%;\n    z-index: -1; } }\n  :host(.neutral) .dot:before {\n    position: relative;\n    content: '';\n    display: block;\n    margin-top: 100%;\n    border-radius: 50%; }\n  :host(.neutral) .dot:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    border-radius: 50%; }\n  :host(.neutral) .dot.tapped, :host(.neutral) .dot.active, :host(.neutral) .dot.tapped:after, :host(.neutral) .dot.active:after {\n    border-radius: 50%;\n    -webkit-animation: anim-in 0.35s;\n    animation: anim-in 0.35s; }\n  :host(.neutral) .dot.hovered, :host(.neutral) .dot.hovered:after {\n    border-radius: 50%;\n    -webkit-animation: anim-in 0.15s;\n    animation: anim-in 0.15s;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards; }\n\n:host(.operations) .dot {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  z-index: -1;\n  background-color: var(--success, #04CC99);\n  opacity: 0.2; }\n\n\@keyframes expand-to-full {\n  0% {\n    width: 0%;\n    background-color: var(--success, #04CC99);\n    opacity: 0; }\n  100% {\n    width: 100%;\n    background-color: var(--success, #04CC99);\n    opacity: 0.8; } }\n\n\@keyframes anim-in {\n  0% {\n    width: 0%; }\n  100% {\n    width: 100%;\n    z-index: -1; } }\n  :host(.operations) .dot:before {\n    position: relative;\n    content: '';\n    display: block;\n    margin-top: 100%;\n    border-radius: 50%; }\n  :host(.operations) .dot:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    border-radius: 50%; }\n  :host(.operations) .dot.tapped, :host(.operations) .dot.active, :host(.operations) .dot.tapped:after, :host(.operations) .dot.active:after {\n    border-radius: 50%;\n    -webkit-animation: anim-in 0.35s;\n    animation: anim-in 0.35s; }\n  :host(.operations) .dot.hovered, :host(.operations) .dot.hovered:after {\n    border-radius: 50%;\n    -webkit-animation: anim-in 0.15s;\n    animation: anim-in 0.15s;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards; }\n\n:host(.boost) .dot {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  z-index: -1;\n  background-color: var(--danger-light, #F46885);\n  opacity: 0.2; }\n\n\@keyframes expand-to-full {\n  0% {\n    width: 0%;\n    background-color: var(--danger-light, #F46885);\n    opacity: 0; }\n  100% {\n    width: 100%;\n    background-color: var(--danger-light, #F46885);\n    opacity: 0.8; } }\n\n\@keyframes anim-in {\n  0% {\n    width: 0%; }\n  100% {\n    width: 100%;\n    z-index: -1; } }\n  :host(.boost) .dot:before {\n    position: relative;\n    content: '';\n    display: block;\n    margin-top: 100%;\n    border-radius: 50%; }\n  :host(.boost) .dot:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    border-radius: 50%; }\n  :host(.boost) .dot.tapped, :host(.boost) .dot.active, :host(.boost) .dot.tapped:after, :host(.boost) .dot.active:after {\n    border-radius: 50%;\n    -webkit-animation: anim-in 0.35s;\n    animation: anim-in 0.35s; }\n  :host(.boost) .dot.hovered, :host(.boost) .dot.hovered:after {\n    border-radius: 50%;\n    -webkit-animation: anim-in 0.15s;\n    animation: anim-in 0.15s;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards; }\n\n:host(.center) {\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center; }"; }
}

export { YooTappableComponent as YooTappable };

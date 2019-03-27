import { getAppContext } from '../../../utils';
export class YooTappableComponent {
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
    static get style() { return "/**style-placeholder:yoo-tappable:**/"; }
}

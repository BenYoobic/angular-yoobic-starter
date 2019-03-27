import { translate, getAppContext } from '../../../index'; //'../../../../stencil';
export class YooCountDownComponent {
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
    static get style() { return "/**style-placeholder:yoo-count-down:**/"; }
}

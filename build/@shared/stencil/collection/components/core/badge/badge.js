import { execHandlerAndStopEvent, getElementDimensions, getAppContext } from '../../../utils';
export class YooBadgeComponent {
    constructor() {
        this.closed = false;
    }
    componentDidLoad() {
        if (getElementDimensions(this.textSpan).height >= 32) {
            this.host.classList.add('multiple-line');
        }
    }
    onClose() {
        this.tagClosed.emit(true);
    }
    onLeftIconClicked() {
        this.leftIconClicked.emit(true);
    }
    onRightIconClicked() {
        this.rightIconClicked.emit(true);
    }
    hostData() {
        return {
            class: Object.assign({ 'history': this.isHistory }, getAppContext())
        };
    }
    render() {
        return (h("div", { class: 'outer-container' + ((this.closed) ? ' closed' : '') },
            h("div", { class: "inner-container" },
                this.iconLeft ? h("yoo-icon", { class: 'icon-left ' + this.iconLeft, onClick: this.onLeftIconClicked.bind(this) }) : null,
                this.text ? h("span", { ref: el => this.textSpan = el, class: "inner-text", innerHTML: this.text }) : null,
                this.iconRight ? h("yoo-icon", { class: 'icon-right ' + this.iconRight, onClick: this.onRightIconClicked.bind(this) }) : null,
                this.closable ? h("yoo-icon", { class: "icon-close yo-cross", onClick: (ev) => execHandlerAndStopEvent(ev, () => this.onClose()) }) : null)));
    }
    static get is() { return "yoo-badge"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "closable": {
            "type": Boolean,
            "attr": "closable"
        },
        "closed": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "iconLeft": {
            "type": String,
            "attr": "icon-left"
        },
        "iconRight": {
            "type": String,
            "attr": "icon-right"
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "tagClosed",
            "method": "tagClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "rightIconClicked",
            "method": "rightIconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "leftIconClicked",
            "method": "leftIconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-badge:**/"; }
}

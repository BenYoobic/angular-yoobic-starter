import { setAnimation, isIphoneX } from '../../../utils';
export class YooBannerComponent {
    componentDidLoad() {
        setAnimation(this.animationName, this.host, { open: true });
    }
    onActionTextClick() {
        this.alertActionSelected.emit(true);
    }
    onDismissButtonClick() {
        this.alertClosed.emit(true);
        this.closed = true;
    }
    hostData() {
        return {
            class: {
                'closed': this.closed
            }
        };
    }
    render() {
        return (h("div", { class: {
                'container': true,
                'closed': this.closed,
                'iphone-x': isIphoneX()
            } },
            this.link ? h("div", { class: "link", onClick: () => this.onActionTextClick() }, this.link) : null,
            h("div", { class: "inner-container" },
                this.icon ? h("span", { class: "icon" },
                    h("yoo-icon", { class: this.icon })) : null,
                h("div", { class: "text-container" },
                    this.heading ? h("span", { class: "heading" }, this.heading) : null,
                    h("span", { class: "value" }, this.text))),
            h("div", { class: "close-container" }, this.closeable ? h("span", { class: "close", onClick: () => this.onDismissButtonClick() },
                " ",
                h("yoo-icon", { class: "yo-close" })) : null)));
    }
    static get is() { return "yoo-banner"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "animationName": {
            "type": String,
            "attr": "animation-name"
        },
        "closeable": {
            "type": Boolean,
            "attr": "closeable"
        },
        "closed": {
            "state": true
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "link": {
            "type": String,
            "attr": "link"
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "alertClosed",
            "method": "alertClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "alertActionSelected",
            "method": "alertActionSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-banner:**/"; }
}

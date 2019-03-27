export class YooStickyComponent {
    constructor() {
        this.top = null;
        this.bottom = null;
    }
    getTranslateStyle() {
        return { position: 'sticky', top: this.top, bottom: this.bottom };
    }
    render() {
        return (h("div", { class: "outer-container", style: this.getTranslateStyle() },
            h("slot", null)));
    }
    static get is() { return "yoo-sticky"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "bottom": {
            "type": String,
            "attr": "bottom"
        },
        "host": {
            "elementRef": true
        },
        "top": {
            "type": String,
            "attr": "top"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-sticky:**/"; }
}

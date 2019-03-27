export class YooTileComponent {
    render() {
        return (h("div", { class: "outer-container" },
            (this.icon ? h("yoo-icon", { class: this.icon }) : null),
            h("div", { class: "tile-value" }, this.value),
            h("div", { class: "tile-text" }, this.text)));
    }
    static get is() { return "yoo-tile"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "value": {
            "type": String,
            "attr": "value"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-tile:**/"; }
}

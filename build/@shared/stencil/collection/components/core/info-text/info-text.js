export class YooInfoTextComponent {
    render() {
        return (h("div", { class: "outer-container", innerHTML: this.text || '' }));
    }
    static get is() { return "yoo-info-text"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-info-text:**/"; }
}

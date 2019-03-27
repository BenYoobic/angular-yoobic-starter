import { h } from '../design-system.core.js';

class YooTileComponent {
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
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  width: 10.3125rem;\n  height: 8rem;\n  padding: 0.625rem 0 0.625rem 1.25rem;\n  border-radius: 0.5rem;\n  background-color: var(--light, #FFFFFF);\n  -webkit-box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08));\n  box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08)); }\n  :host .outer-container yoo-icon {\n    margin-bottom: var(--padding-15, 0.9375rem);\n    font-size: var(--font-xl, 36px); }\n    :host .outer-container yoo-icon.yo-no-data {\n      height: 1rem; }\n  :host .outer-container .tile-text {\n    margin-top: 0.125rem;\n    color: var(--stable, #adadad);\n    font-size: var(--font-m, 15px);\n    letter-spacing: 1px;\n    line-height: 1.0625rem;\n    text-transform: uppercase; }\n  :host .outer-container .tile-value {\n    font-size: var(--font-l, 17px);\n    font-weight: 300;\n    line-height: 1.8125rem; }\n\n:host .outer-container .yo-chart-up {\n  width: 50px;\n  background: var(--gradient-success, #04CC99);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  font-size: 50px;\n  line-height: 11px; }\n\n:host .outer-container .yo-chart-down {\n  width: 50px;\n  background: var(--gradient-danger, #ff625f);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  font-size: 50px;\n  line-height: 11px; }"; }
}

export { YooTileComponent as YooTile };

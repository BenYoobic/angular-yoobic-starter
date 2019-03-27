import { h } from '../design-system.core.js';

class YooInfoTextComponent {
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
    static get style() { return ":host() {\n  --info-text-color: var(--text-color, #807f83); }\n\n:host .outer-container {\n  padding: 0.5rem 1rem;\n  color: var(--info-text-color);\n  font-size: var(--font-small); }\n\n:host(.no-padding-bottom) .outer-container {\n  padding-bottom: 0; }\n\n:host(.margin-bottom) .outer-container {\n  border-bottom: 1px solid var(--stable-30, #E6E6E6); }\n\n:host(.no-padding) .outer-container {\n  padding: 0; }"; }
}

export { YooInfoTextComponent as YooInfoText };

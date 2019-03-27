const h = window.DesignSystem.h;

import { aa as querySelectorAllDeep } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooButtonGroupComponent {
    constructor() {
        this.isDropdown = false;
    }
    componentDidLoad() {
        const buttons = querySelectorAllDeep(this.host, 'yoo-button');
        if (buttons) {
            buttons[0].classList.add('first-button');
            buttons[buttons.length - 1].classList.add('last-button');
        }
    }
    render() {
        return ((this.isDropdown ? h("yoo-context-menu", null,
            h("yoo-button", { slot: "trigger", class: "button-group-menu", icon: "yo-arrow-dropdown", text: this.dropdownTitle }),
            h("div", { class: "context-container" },
                h("slot", null)))
            : h("div", { class: "group-container" },
                h("slot", null))));
    }
    static get is() { return "yoo-button-group"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "dropdownTitle": {
            "type": String,
            "attr": "dropdown-title"
        },
        "host": {
            "elementRef": true
        },
        "isDropdown": {
            "type": Boolean,
            "attr": "is-dropdown"
        }
    }; }
    static get style() { return ":host .group-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n\n:host .context-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  padding-left: 10px; }\n  :host .context-container yoo-button {\n    width: inherit; }\n\n:host(.vertical) .group-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 100%; }\n\n:host(.justified) .group-container {\n  -ms-flex-pack: justify;\n  justify-content: space-between; }\n  :host(.justified) .group-container yoo-button {\n    --border-container: 1px solid var(--dark-40, #9cabc4);\n    --border-radius-container: var(--border-radius-input, 5px); }"; }
}

export { YooButtonGroupComponent as YooButtonGroup };

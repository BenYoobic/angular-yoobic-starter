import { querySelectorAllDeep } from '../../../utils';
export class YooButtonGroupComponent {
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
    static get style() { return "/**style-placeholder:yoo-button-group:**/"; }
}

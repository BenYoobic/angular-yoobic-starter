import { h } from '../design-system.core.js';

const DEFAULT_COLOR = '#ffffff';
class YooFormColorPickerComponent {
    constructor() {
        this.color = DEFAULT_COLOR;
        this.hideLabel = false;
    }
    componentWillLoad() {
        this.colorValidation(this.color);
    }
    colorValidation(newValue) {
        let validation = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'); // Regular Expression to validate hexadecimal color
        if (validation.test(newValue) && newValue.length === 7) {
            this.currentColor = newValue;
        }
        else {
            this.currentColor = DEFAULT_COLOR;
        }
    }
    onInputChange(ev) {
        this.currentColor = ev.target.value; //Use to re-render !! needed to reset input value
        this.colorValidation(ev.target.value);
        this.colorSelected.emit(this.currentColor);
    }
    render() {
        let colorSelectorStyle = { background: this.currentColor };
        return (h("div", { class: "outer-container" },
            h("div", { class: "color-selector", style: colorSelectorStyle },
                h("input", { type: "color", value: this.currentColor, onChange: (event) => this.onInputChange(event), onInput: (event) => this.onInputChange(event) })),
            this.hideLabel ? null :
                h("input", { type: "text", value: this.currentColor, onChange: (event) => this.onInputChange(event) })));
    }
    static get is() { return "yoo-form-color-picker"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "currentColor": {
            "state": true
        },
        "hideLabel": {
            "type": Boolean,
            "attr": "hide-label"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get events() { return [{
            "name": "colorSelected",
            "method": "colorSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: center;\n  align-items: center;\n  width: 6rem;\n  padding: 0.2rem; }\n  :host .outer-container input[type=text] {\n    width: 4rem;\n    border-color: transparent;\n    outline: none;\n    background: transparent;\n    font-size: var(--font-m, 15px);\n    text-align: center;\n    -webkit-appearance: none; }\n  :host .outer-container .color-selector {\n    width: 1.3rem;\n    height: 1.3rem;\n    border: 1px solid var(--dark-40, #9cabc4);\n    border-radius: 50%; }\n    :host .outer-container .color-selector input[type=color] {\n      width: 1rem;\n      height: 1rem;\n      border: none;\n      outline: none;\n      background: transparent;\n      opacity: 0;\n      -webkit-appearance: none; }\n    :host .outer-container .color-selector input[type=color]::-webkit-color-swatch-wrapper {\n      padding: 0px;\n      background: transparent;\n      -webkit-appearance: none; }\n    :host .outer-container .color-selector input[type=color]::-webkit-color-swatch {\n      border: none;\n      border-radius: 50%; }\n    :host .outer-container .color-selector input {\n      margin: 0;\n      border: 0;\n      padding: 0;\n      display: inline-block;\n      vertical-align: middle;\n      white-space: normal;\n      background: none;\n      line-height: 1;\n      font-size: var(--font-m, 15px);\n      font-family: \"Lato\" !important;\n      min-width: 0;\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box; }\n      :host .outer-container .color-selector input:focus {\n        outline: 0; }\n      :host .outer-container .color-selector input[type=reset], :host .outer-container .color-selector input[type=button], :host .outer-container .color-selector input[type=submit], :host .outer-container .color-selector input[type=checkbox], :host .outer-container .color-selector input[type=radio] {\n        -webkit-box-sizing: border-box;\n        box-sizing: border-box; }\n      :host .outer-container .color-selector input[type=search] {\n        -webkit-appearance: textfield;\n        -webkit-box-sizing: content-box;\n        box-sizing: content-box; }\n\n:host(.large) .outer-container .color-selector {\n  width: 1.7rem;\n  min-width: 1.7rem;\n  height: 1.7rem;\n  min-height: 1.7rem; }\n  :host(.large) .outer-container .color-selector input[type=color] {\n    width: 1.5rem;\n    height: 1.5rem; }"; }
}

export { YooFormColorPickerComponent as YooFormColorPicker };

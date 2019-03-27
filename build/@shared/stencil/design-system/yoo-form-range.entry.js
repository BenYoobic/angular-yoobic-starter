const h = window.DesignSystem.h;

import { aN as setValidator, aQ as setValueAndValidateInput, aj as isArray } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooFormRangeComponent {
    constructor() {
        this.validators = [];
        this.min = 0;
        this.max = 100;
    }
    componentWillLoad() {
        setValidator(this);
        let extraAttrs = {
            min: this.min,
            max: this.max,
            type: 'number',
            required: false
        };
        if (this.validators.length > 0) {
            extraAttrs.required = true;
        }
        this.requiredValidator = [{ name: 'number', options: Object.assign({}, extraAttrs) }];
    }
    onSliderChange(ev) {
        let oldValue = this.value;
        let value;
        if (ev && ev.detail) {
            if ((ev.detail.lowValue || ev.detail.lowValue === 0) && (ev.detail.highValue || ev.detail.highValue === 0)) {
                value = [ev.detail.lowValue, ev.detail.highValue];
            }
        }
        if (oldValue !== value) {
            setValueAndValidateInput(value, this, false, false);
        }
    }
    onSingleSliderChange(ev) {
        let oldValue = this.value;
        let value;
        if (ev && ev.detail) {
            value = ev.detail;
        }
        if (oldValue !== value) {
            setValueAndValidateInput(parseInt(value, 10), this, false, true);
            this.singleFormInput.validity = this.validity;
            this.validityChanged.emit(this.validity);
        }
    }
    onInputChanged(ev, position) {
        ev.stopPropagation();
        let value;
        let incomingVal = ev.detail;
        if (this.double) {
            if (position === 'sup') {
                let sup = this.value[0] <= incomingVal ? incomingVal : this.value[0];
                value = [this.value[0], sup];
            }
            else if (position === 'inf') {
                let inf = this.value[1] >= incomingVal ? incomingVal : this.value[1];
                value = [inf, this.value[1]];
            }
        }
        else {
            value = incomingVal;
        }
        setValueAndValidateInput(value, this, false, false);
    }
    onValidityChanged(ev, position) {
        if (ev) {
            if (this.double) {
                if (position === 'sup') {
                    this.supValidity = ev.detail;
                }
                else if (position === 'inf') {
                    this.infValidity = ev.detail;
                }
                this.validity = this.supValidity && this.infValidity;
            }
            else {
                this.validity = ev.detail;
            }
        }
    }
    renderReadonly() {
        return (h("div", { class: "readonly" },
            h("div", null, this.value && this.double ? this.value[0] : (this.value && !this.double) || this.value === 0 ? this.value : null),
            h("div", null, this.value && this.double ? this.value[1] : null)));
    }
    renderEditable() {
        let inputValue = this.value;
        return (h("div", { class: "outer-container" },
            h("div", { class: "inputs-container" },
                this.double ?
                    [h("div", { class: "input" },
                            h("yoo-form-input", { type: "number", validators: this.requiredValidator, value: (isArray(inputValue) ? inputValue[0] : inputValue), forceValueUpdate: true, placeholder: this.placeholder, onInputChanged: (ev) => this.onInputChanged(ev, 'inf'), onValidityChanged: (ev) => this.onValidityChanged(ev, 'inf') }, ">")),
                        h("div", { class: "separator" })]
                    : null,
                h("div", { class: 'input ' + (this.double ? '' : 'single') },
                    h("yoo-form-input", { ref: (el) => this.singleFormInput = el, type: "number", value: (isArray(inputValue) ? inputValue[1] : inputValue), validators: this.requiredValidator, placeholder: this.placeholder, forceValueUpdate: true, onInputChanged: (ev) => this.onInputChanged(ev, 'sup'), onValidityChanged: (ev) => this.onValidityChanged(ev, 'sup') }))),
            h("div", { class: "slider-container" },
                h("yoo-form-slider", { class: "gradient-success range-display", hideLabel: true, hideReferences: false, doubleSlider: this.double, initialLowValue: this.value ? this.value[0] || 0 : 0, initialValue: this.value ? isArray(this.value) ? this.value[1] : this.value : 0, minimum: this.min ? this.min : null, maximum: this.max ? this.max : null, onDoubleSliderChanged: (ev) => this.onSliderChange(ev), onSingleSliderChanged: (ev) => this.onSingleSliderChange(ev) }))));
    }
    hostData() {
        return {
            class: {
                'swiper-no-swiping': true
            }
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-range"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "double": {
            "type": Boolean,
            "attr": "double"
        },
        "host": {
            "elementRef": true
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "min": {
            "type": Number,
            "attr": "min"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "type": Boolean,
            "attr": "validity",
            "mutable": true
        },
        "value": {
            "type": Number,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n  :host .outer-container .inputs-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    padding: 0 0.3rem; }\n    :host .outer-container .inputs-container .separator {\n      width: 0.75rem;\n      height: 0.125rem;\n      margin: 0 0.875rem;\n      border-radius: 1px;\n      background: var(--stable, #adadad); }\n    :host .outer-container .inputs-container .input {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      height: 2.5rem;\n      border-radius: 5px; }\n      :host .outer-container .inputs-container .input.single {\n        width: 100%; }\n      :host .outer-container .inputs-container .input yoo-form-input {\n        --display-invalid-message: none;\n        width: 100%; }\n  :host .outer-container .slider-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n\n:host .readonly {\n  padding: 0.5rem;\n  padding-left: 0;\n  padding-bottom: 0; }\n\n:host(.history) .readonly {\n  padding: 0 !important; }"; }
}

export { YooFormRangeComponent as YooFormRange };

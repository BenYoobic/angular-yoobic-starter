import { setValidator, setValueAndValidateInput } from '../../../utils';
import { isArray } from 'lodash-es';
export class YooFormRangeComponent {
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
    static get style() { return "/**style-placeholder:yoo-form-range:**/"; }
}

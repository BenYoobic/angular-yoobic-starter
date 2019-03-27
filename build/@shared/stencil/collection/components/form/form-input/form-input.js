import { translate, isSamsung, debounce as _debounce, querySelectorDeep, setValidator, onInputBlurred, setValueAndValidateInput, onInputFocused, onInputClear, onIconClicked, parseNumber, parseStringToNumber, convertValueForInputType, isNullOrUndefined, isCordova, isAndroid, getAppContext, validate, isIOS, isSafari } from '../../../utils';
export class YooFormInputComponent {
    constructor() {
        this.validators = [];
        this.externalValidators = [];
        this.uiValidation = { valid: true, invalid: true }; // valid to show success, invalid to show fail
        this.disabled = false;
        this.type = 'text';
        this.showPasswordToggle = false;
        this.clearable = true;
    }
    onValueChange() {
        validate(this);
        if (this.forceValueUpdate) {
            this.localValue = this.value;
        }
    }
    async getElement() {
        return this;
    }
    async isValidityNotEmpty() {
        return !isNullOrUndefined(this.validity);
    }
    clear() {
        this.value = null;
    }
    setFocus() {
        if (this.inputElement) {
            this.inputElement.focus();
        }
    }
    componentWillLoad() {
        setValidator(this);
        this.inputType = this.type;
        this.localValue = this.value;
        this.emitValueAndSetValidity = _debounce((value) => {
            setValueAndValidateInput(value, this);
            this.validityChanged.emit(this.validity);
        }, this.debounce || 0);
        if (isSamsung() && this.isNumberInput(this.type)) {
            this.isNumberAndSamsung = true;
            this.inputType = 'text';
        }
        else {
            this.isNumberAndSamsung = false;
        }
        switch (this.type) {
            case 'email':
                this.finalIconPrefix = 'yo-email';
                break;
            case 'number':
                this.finalIconPrefix = 'yo-ranking';
                break;
            case 'tel':
                this.finalIconPrefix = 'yo-phone';
                break;
            case 'password':
                this.finalIconPrefix = 'yo-password';
                break;
            case 'text':
            default:
                if (this.iconPrefix !== 'yo-shorttext') {
                    this.finalIconPrefix = this.iconPrefix; //'yo-pen';
                }
                break;
        }
    }
    onInputChanged(ev) {
        let el = querySelectorDeep(this.host, 'input'); //ev.target;
        let value;
        if (el) {
            if (this.isTextInput(this.type) && this.isNumberAndSamsung) {
                let parsedValue = parseStringToNumber(el.value);
                el.value = parsedValue;
                value = parseNumber(parsedValue.replace(',', '.'));
            }
            else {
                if (this.isNumberInput(this.type)) {
                    if (ev.data === 'e' || ev.data === '+') {
                        el.value = this.value;
                    }
                }
                else if (this.isTelInput(this.type)) {
                    el.value = el.value.replace(/[^0-9+(*#)\-]/g, '');
                }
                value = convertValueForInputType(el.value, this.type);
            }
            this.emitValueAndSetValidity(value);
            this.localValue = value;
        }
    }
    onKeyPress(ev) {
        if (ev.key === 'Enter') {
            this.enterPressed.emit(true);
        }
        if (ev.key === 'Tab') {
            this.tabPressed.emit(true);
        }
        if (this.type === 'number') {
            //This only allows the keycodes of numbers 0-9
            //otherwise the event is prevented (minus keycode = 189)
            if ((isIOS() && isCordova()) || isSafari()) {
                const COMMA_KEYCODE = 188;
                const DECIMAL_POINT_KEYCODE = 190;
                const ZERO_KEYCODE = 48;
                const NINE_KEYCODE = 57;
                const BACKSPACE_KEYCODE = 8;
                let keycode = ev.keyCode;
                if ((keycode >= ZERO_KEYCODE && keycode <= NINE_KEYCODE) || (keycode >= COMMA_KEYCODE && keycode <= DECIMAL_POINT_KEYCODE) || (keycode === BACKSPACE_KEYCODE)) {
                    return false;
                }
                else {
                    ev.preventDefault();
                }
            }
        }
    }
    onShowPassword() {
        this.isPasswordInput(this.inputType) ? this.inputType = 'text' : this.inputType = 'password';
        let cordovaAndroid = isCordova() && isAndroid();
        onIconClicked('yo-eye', this, cordovaAndroid);
    }
    clearInput(ev) {
        this.localValue = null;
        onInputClear(ev, this);
    }
    getPattern() {
        if (this.isNumberInput(this.inputType)) {
            return '[+-]?[0-9]+[,\.]?([0-9]+)?';
        }
    }
    isTextInput(inputType) {
        return inputType === 'text';
    }
    isTelInput(inputType) {
        return inputType === 'tel';
    }
    isPasswordInput(inputType) {
        return inputType === 'password';
    }
    isNumberInput(inputType) {
        return inputType === 'number';
    }
    renderReadonly() {
        return (h("div", { class: "input-container noborder", onClick: ev => onInputFocused(ev, this, '.input-container') },
            h("div", { class: "readonly" }, this.value)));
    }
    renderEditable() {
        let hasValue = !isNullOrUndefined(this.value) && this.value !== '';
        return [
            this.placeholdertolabel && this.placeholder &&
                h("div", { class: (this.placeholdertolabel ? 'label' : 'label active') },
                    this.placeholder,
                    this.required && h("span", { class: "label-required" }, "*")),
            h("div", { class: {
                    'input-container': true,
                    'placeholderlabel': this.placeholdertolabel,
                    'valid': this.validity,
                    'invalid': this.validity === false
                } },
                this.finalIconPrefix &&
                    h("div", { class: "icon-prefix", onClick: () => this.inputElement.focus() },
                        h("yoo-icon", { class: this.finalIconPrefix })),
                h("input", { type: this.inputType, ref: el => this.inputElement = el, autocapitalize: this.autocapitalize, autocorrect: this.autocorrect, placeholder: !this.placeholdertolabel ? this.placeholder : '', value: this.localValue, required: this.required, onBlur: ev => onInputBlurred(ev, this, '.input-container', this.type, this.uiValidation), onInput: ev => this.onInputChanged(ev), onFocus: ev => onInputFocused(ev, this, '.input-container'), onKeyDown: ev => this.onKeyPress(ev), min: this.min, max: this.max, pattern: this.getPattern(), step: this.step, class: (hasValue && this.clearable) || (this.type === 'password' && this.showPasswordToggle) ? '' : 'last' }),
                this.host.classList.contains('warning') &&
                    h("div", { class: "warning-icon" }),
                hasValue && !isNullOrUndefined(this.validity) && (!this.isTextInput(this.inputType) || this.isNumberAndSamsung)
                    && this.uiValidation && (this.uiValidation.valid && this.validity) || (this.uiValidation.invalid && this.validity === false) &&
                    h("div", { class: 'valid-icon ' + (this.validity ? 'valid' : 'invalid') },
                        h("yoo-icon", { class: this.validity ? 'yo-check' : 'yo-rejected2' })),
                this.type === 'password' && this.showPasswordToggle &&
                    h("div", { class: 'icon-suffix-focus' + (hasValue && this.clearable ? '' : ' last'), onClick: this.onShowPassword.bind(this) },
                        h("yoo-icon", { class: this.inputType === 'password' ? 'yo-eye black' : 'yo-eye stable-alt' })),
                hasValue && this.clearable &&
                    h("div", { class: "icon-suffix-focus last icon-close", onClick: ev => this.clearInput(ev) },
                        h("yoo-icon", { class: "yo-cross" })),
                this.iconSuffix &&
                    h("div", { class: "icon-suffix", onClick: ev => onIconClicked(this.iconSuffix, this) },
                        h("yoo-tooltip", null,
                            h("yoo-icon", { class: this.iconSuffix, title: this.tooltip })))),
            (!this.isTextInput(this.inputType) || this.isNumberAndSamsung) && h("div", { class: "invalid-message" }, translate('INCORRECTFORMAT'))
        ];
    }
    hostData() {
        return {
            class: Object.assign({ 'swiper-no-swiping': true, 'disabled': this.disabled, 'has-invalid-format': !this.isTextInput(this.inputType) }, getAppContext())
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-input"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "autocapitalize": {
            "type": String,
            "attr": "autocapitalize"
        },
        "autocorrect": {
            "type": String,
            "attr": "autocorrect"
        },
        "clear": {
            "method": true
        },
        "clearable": {
            "type": Boolean,
            "attr": "clearable"
        },
        "debounce": {
            "type": Number,
            "attr": "debounce"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "externalValidators": {
            "type": "Any",
            "attr": "external-validators"
        },
        "forceValueUpdate": {
            "type": Boolean,
            "attr": "force-value-update"
        },
        "getElement": {
            "method": true
        },
        "host": {
            "elementRef": true
        },
        "iconPrefix": {
            "type": String,
            "attr": "icon-prefix"
        },
        "iconSuffix": {
            "type": String,
            "attr": "icon-suffix"
        },
        "inputType": {
            "state": true
        },
        "isValidityNotEmpty": {
            "method": true
        },
        "max": {
            "type": String,
            "attr": "max",
            "reflectToAttr": true
        },
        "min": {
            "type": String,
            "attr": "min",
            "reflectToAttr": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "placeholdertolabel": {
            "type": Boolean,
            "attr": "placeholdertolabel"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "setFocus": {
            "method": true
        },
        "showPasswordToggle": {
            "type": Boolean,
            "attr": "show-password-toggle"
        },
        "step": {
            "type": Number,
            "attr": "step"
        },
        "tooltip": {
            "type": String,
            "attr": "tooltip"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "uiValidation": {
            "type": "Any",
            "attr": "ui-validation"
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
            "type": "Any",
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["onValueChange"]
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
        }, {
            "name": "iconClicked",
            "method": "iconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "enterPressed",
            "method": "enterPressed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "tabPressed",
            "method": "tabPressed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-input:**/"; }
}

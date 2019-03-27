import { h } from '../design-system.core.js';

import { c4 as validate, ae as isNullOrUndefined, aN as setValidator, a6 as debounce, aQ as setValueAndValidateInput, r as isSamsung, L as querySelectorDeep, c5 as parseStringToNumber, c6 as parseNumber, aP as convertValueForInputType, o as isIOS, k as isCordova, bb as isSafari, v as isAndroid, c7 as onIconClicked, aV as onInputClear, aU as onInputFocused, aM as onInputBlurred, m as translate, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooFormInputComponent {
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
        this.emitValueAndSetValidity = debounce((value) => {
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
    static get style() { return ":host {\n  --display-invalid-message: block;\n  --input-text-color: cssvar(text-color);\n  --input-icon-color: cssvar(input-icon-color); }\n\n\@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n\@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n:host {\n  display: block; }\n  :host .input-container {\n    display: -ms-flexbox;\n    display: flex;\n    border: 1px solid var(--input-container-border-color, #E6E6E6);\n    border-radius: var(--border-radius-input, 5px); }\n    :host .input-container.noborder {\n      border: none !important; }\n    :host .input-container.valid {\n      border: 1px solid var(--success, #04CC99); }\n    :host .input-container.invalid {\n      border: 1px solid var(--danger, #ff625f); }\n      :host .input-container.invalid .valid-icon {\n        color: var(--danger, #ff625f); }\n    :host .input-container.focused {\n      border: 1px solid var(--dark, #2b3648); }\n      :host .input-container.focused .valid-icon {\n        display: none; }\n    :host .input-container .icon-prefix,\n    :host .input-container .icon-suffix {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-align: center;\n      align-items: center;\n      padding: 0.5rem 1rem;\n      color: var(--stable, #adadad);\n      font-size: var(--icon-m, 20px); }\n      :host .input-container .icon-prefix .yo-down,\n      :host .input-container .icon-prefix .yo-up,\n      :host .input-container .icon-suffix .yo-down,\n      :host .input-container .icon-suffix .yo-up {\n        margin: 0 0 0 -0.8rem;\n        font-size: var(--font-xs, 10px); }\n      :host .input-container .icon-prefix .yo-cross,\n      :host .input-container .icon-suffix .yo-cross {\n        margin: 0 0 0 -0.8rem; }\n    :host .input-container .icon-prefix {\n      border-right: 1px solid var(--input-container-border-color, #E6E6E6);\n      color: csscolor(stable); }\n    :host .input-container .icon-suffix {\n      border-left: 1px solid var(--input-container-border-color, #E6E6E6); }\n    :host .input-container .valid-icon,\n    :host .input-container .icon-suffix-focus {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-align: center;\n      align-items: center;\n      padding: 0.5rem 1rem;\n      color: var(--stable, #adadad);\n      font-size: var(--icon-m, 20px);\n      display: none;\n      padding-right: var(--padding-10, 0.625rem); }\n      :host .input-container .valid-icon .yo-down,\n      :host .input-container .valid-icon .yo-up,\n      :host .input-container .icon-suffix-focus .yo-down,\n      :host .input-container .icon-suffix-focus .yo-up {\n        margin: 0 0 0 -0.8rem;\n        font-size: var(--font-xs, 10px); }\n      :host .input-container .valid-icon .yo-cross,\n      :host .input-container .icon-suffix-focus .yo-cross {\n        margin: 0 0 0 -0.8rem; }\n    :host .input-container .valid-icon {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      color: var(--success, #04CC99); }\n      :host .input-container .valid-icon.valid {\n        color: var(--success, #04CC99); }\n      :host .input-container .valid-icon.invalid {\n        color: var(--danger, #ff625f); }\n    :host .input-container .icon-close {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-align: center;\n      align-items: center;\n      padding: 0.5rem 1rem;\n      color: var(--stable, #adadad);\n      font-size: var(--icon-m, 20px); }\n      :host .input-container .icon-close .yo-down,\n      :host .input-container .icon-close .yo-up {\n        margin: 0 0 0 -0.8rem;\n        font-size: var(--font-xs, 10px); }\n      :host .input-container .icon-close .yo-cross {\n        margin: 0 0 0 -0.8rem; }\n    :host .input-container .icon-suffix-focus {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row; }\n    :host .input-container .warning-icon {\n      width: 0.375rem;\n      height: 0.375rem;\n      margin-top: 1.0625rem;\n      margin-right: 1.25rem;\n      border: none;\n      border-radius: 50%;\n      background-color: var(--warning, #ff6402); }\n    :host .input-container input {\n      -webkit-box-sizing: border-box;\n      -moz-box-sizing: border-box;\n      box-sizing: border-box;\n      display: block;\n      position: relative;\n      -ms-flex: 1;\n      flex: 1;\n      width: 100%;\n      min-width: 0;\n      padding: 0.5rem;\n      border: none;\n      border-radius: var(--border-radius-input, 5px);\n      caret-color: var(--success, #04CC99);\n      background: transparent;\n      background: var(--light, #FFFFFF);\n      color: var(--black, #000000);\n      font-family: \"Lato\" !important;\n      font-size: var(--font-m, 15px);\n      font-weight: 400;\n      line-height: 1.5;\n      text-align: left;\n      -webkit-box-shadow: var(--light, #FFFFFF) 0px 0px 0px 1000px inset !important;\n      box-shadow: var(--light, #FFFFFF) 0px 0px 0px 1000px inset !important;\n      -webkit-appearance: none; }\n      :host .input-container input::-webkit-input-placeholder {\n        color: var(--dark-40, #9cabc4);\n        font-family: \"Lato\" !important !important;\n        font-weight: 300; }\n      :host .input-container input:-ms-input-placeholder {\n        color: var(--dark-40, #9cabc4);\n        font-family: \"Lato\" !important !important;\n        font-weight: 300; }\n      :host .input-container input::-ms-input-placeholder {\n        color: var(--dark-40, #9cabc4);\n        font-family: \"Lato\" !important !important;\n        font-weight: 300; }\n      :host .input-container input::placeholder {\n        color: var(--dark-40, #9cabc4);\n        font-family: \"Lato\" !important !important;\n        font-weight: 300; }\n      :host .input-container input::-webkit-input-placeholder {\n        color: var(--dark-40, #9cabc4);\n        font-family: \"Lato\" !important !important;\n        font-weight: 300; }\n      :host .input-container input:-moz-placeholder {\n        color: var(--dark-40, #9cabc4);\n        font-family: \"Lato\" !important !important;\n        font-weight: 300; }\n      :host .input-container input::-moz-placeholder {\n        color: var(--dark-40, #9cabc4);\n        font-family: \"Lato\" !important !important;\n        font-weight: 300; }\n      :host .input-container input:-ms-input-placeholder {\n        color: var(--dark-40, #9cabc4);\n        font-family: \"Lato\" !important !important;\n        font-weight: 300; }\n      :host .input-container input:focus {\n        outline: none; }\n    :host .input-container .readonly {\n      padding: 0.5rem;\n      padding-left: 0;\n      padding-bottom: 0;\n      display: block;\n      position: relative;\n      -ms-flex: 1;\n      flex: 1;\n      width: 100%;\n      border: none;\n      border-radius: var(--border-radius-input, 5px);\n      color: var(--black, #000000);\n      font-weight: 400;\n      line-height: 1.5;\n      text-align: left; }\n  :host .placeholderlabel {\n    margin-top: 0.5rem; }\n    :host .placeholderlabel.active {\n      margin-top: 0rem; }\n  :host .label {\n    margin-bottom: 0.25rem;\n    padding-left: 0.5rem;\n    -webkit-transform: translateY(1.875rem);\n    transform: translateY(1.875rem);\n    -webkit-transition: -webkit-transform 0.2s ease-in;\n    transition: -webkit-transform 0.2s ease-in;\n    transition: transform 0.2s ease-in;\n    transition: transform 0.2s ease-in, -webkit-transform 0.2s ease-in;\n    color: var(--input-text-color);\n    font-size: var(--font-m, 15px);\n    letter-spacing: 2px;\n    line-height: 1.5;\n    text-align: left; }\n    :host .label.active {\n      margin-top: 0.25rem;\n      -webkit-transform: translateY(0rem);\n      transform: translateY(0rem); }\n    :host .label .label-required {\n      margin-left: 0.25rem;\n      color: var(--danger, #ff625f); }\n  :host .invalid-message {\n    display: none;\n    min-height: 15px;\n    color: var(--danger, #ff625f);\n    font-size: var(--font-xs, 10px);\n    text-align: right; }\n    :host .invalid-message.invalid {\n      display: var(--display-invalid-message);\n      color: var(--danger, #ff625f); }\n\n:host(.noborder) .input-container {\n  border: none !important; }\n\n:host(.translucent) .input-container {\n  border: none !important; }\n  :host(.translucent) .input-container .icon-prefix,\n  :host(.translucent) .input-container .icon-suffix,\n  :host(.translucent) .input-container .valid-icon,\n  :host(.translucent) .input-container .icon-suffix-focus {\n    background-color: rgba(255, 255, 255, 0.3); }\n    :host(.translucent) .input-container .icon-prefix.icon-close,\n    :host(.translucent) .input-container .icon-suffix.icon-close,\n    :host(.translucent) .input-container .valid-icon.icon-close,\n    :host(.translucent) .input-container .icon-suffix-focus.icon-close {\n      color: var(--always-light, #FFFFFF); }\n    :host(.translucent) .input-container .icon-prefix yoo-icon.yo-eye.stable-alt,\n    :host(.translucent) .input-container .icon-suffix yoo-icon.yo-eye.stable-alt,\n    :host(.translucent) .input-container .valid-icon yoo-icon.yo-eye.stable-alt,\n    :host(.translucent) .input-container .icon-suffix-focus yoo-icon.yo-eye.stable-alt {\n      color: var(--always-light, #FFFFFF); }\n    :host(.translucent) .input-container .icon-prefix yoo-icon.yo-eye.black,\n    :host(.translucent) .input-container .icon-suffix yoo-icon.yo-eye.black,\n    :host(.translucent) .input-container .valid-icon yoo-icon.yo-eye.black,\n    :host(.translucent) .input-container .icon-suffix-focus yoo-icon.yo-eye.black {\n      color: var(--stable-alt, #d0d0d0); }\n  :host(.translucent) .input-container .icon-prefix {\n    border-right: 1px solid rgba(255, 255, 255, 0.1);\n    border-top-left-radius: var(--border-radius-input, 5px);\n    border-bottom-left-radius: var(--border-radius-input, 5px);\n    color: var(--always-light, #FFFFFF); }\n  :host(.translucent) .input-container input {\n    margin: 0;\n    border-radius: 0;\n    background-color: rgba(255, 255, 255, 0.3);\n    color: var(--always-light, #FFFFFF);\n    -webkit-box-shadow: none !important;\n    box-shadow: none !important; }\n  :host(.translucent) .input-container input.last,\n  :host(.translucent) .input-container .icon-suffix.last,\n  :host(.translucent) .input-container .icon-suffix-focus.last,\n  :host(.translucent) .input-container .icon-close {\n    border-top-right-radius: var(--border-radius-input, 5px);\n    border-bottom-right-radius: var(--border-radius-input, 5px); }\n\n:host(.small) .input-container input {\n  padding: 0.1875rem 1rem; }\n\n:host(.small) .input-container .icon-prefix,\n:host(.small) .input-container .icon-suffix {\n  padding: 0.1875rem 1rem; }\n\n:host(.simple) .input-container {\n  border: none;\n  border-bottom: 1px solid var(--input-container-border-color, #E6E6E6); }\n  :host(.simple) .input-container input {\n    padding: 0.5rem 0; }\n  :host(.simple) .input-container .icon-suffix {\n    padding: 0rem;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    border: none;\n    background: var(--light, #FFFFFF);\n    color: var(--stable, #adadad);\n    font-size: var(--icon-m, 20px); }\n  :host(.simple) .input-container .icon-prefix {\n    padding: 0rem;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    border: none;\n    background: var(--light, #FFFFFF);\n    color: var(--stable, #adadad);\n    font-size: var(--icon-m, 20px); }\n\n:host(.simple-icon) .input-container .icon-suffix {\n  padding: 0rem;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  border: none;\n  background: var(--light, #FFFFFF);\n  color: var(--stable, #adadad);\n  font-size: var(--icon-m, 20px); }\n\n:host(.simple-icon) .input-container .icon-prefix {\n  padding: 0rem;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  border: none;\n  background: var(--light, #FFFFFF);\n  color: var(--stable, #adadad);\n  font-size: var(--icon-m, 20px); }\n\n:host(.round) .input-container {\n  border-radius: 1.5rem; }\n  :host(.round) .input-container .icon-prefix {\n    border-top-left-radius: 1.5rem;\n    border-bottom-left-radius: 1.5rem; }\n  :host(.round) .input-container .icon-suffix {\n    border-top-right-radius: 1.5rem;\n    border-bottom-right-radius: 1.5rem; }\n  :host(.round) .input-container input {\n    border-radius: 1.5rem; }\n\n:host(.search) .input-container {\n  -webkit-animation: fadeIn 0.6s forwards;\n  animation: fadeIn 0.6s forwards;\n  width: 100%;\n  height: 2.25rem;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  border: none;\n  border: 1px solid var(--input-container-border-color, #E6E6E6);\n  border-radius: 0.5rem;\n  background: var(--light, #FFFFFF);\n  overflow: hidden; }\n  :host(.search) .input-container.focused {\n    border: 1px solid var(--dark, #2b3648); }\n  :host(.search) .input-container .icon-prefix {\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    border-right: none;\n    border-top-left-radius: 0.5rem;\n    border-bottom-left-radius: 0.5rem;\n    color: var(--control-icon-color, #adadad); }\n  :host(.search) .input-container .icon-suffix {\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    border-top-right-radius: 0.5rem;\n    border-bottom-right-radius: 0.5rem; }\n  :host(.search) .input-container input {\n    padding: 0.1875rem 0;\n    padding-right: 1rem;\n    padding-left: var(--padding-10, 0.625rem);\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    border-radius: 0.5rem;\n    border-top-left-radius: 0rem;\n    border-bottom-left-radius: 0rem;\n    background: var(--light, #FFFFFF);\n    -webkit-box-shadow: var(--light, #FFFFFF) 0px 0px 0px 1000px inset !important;\n    box-shadow: var(--light, #FFFFFF) 0px 0px 0px 1000px inset !important; }\n    :host(.search) .input-container input::-webkit-input-placeholder {\n      color: var(--stable, #adadad);\n      opacity: 1; }\n    :host(.search) .input-container input:-ms-input-placeholder {\n      color: var(--stable, #adadad);\n      opacity: 1; }\n    :host(.search) .input-container input::-ms-input-placeholder {\n      color: var(--stable, #adadad);\n      opacity: 1; }\n    :host(.search) .input-container input::placeholder {\n      color: var(--stable, #adadad);\n      opacity: 1; }\n    :host(.search) .input-container input::-webkit-input-placeholder {\n      color: var(--stable, #adadad);\n      opacity: 1; }\n    :host(.search) .input-container input:-moz-placeholder {\n      color: var(--stable, #adadad);\n      opacity: 1; }\n    :host(.search) .input-container input::-moz-placeholder {\n      color: var(--stable, #adadad);\n      opacity: 1; }\n    :host(.search) .input-container input:-ms-input-placeholder {\n      color: var(--stable, #adadad);\n      opacity: 1; }\n  :host(.search) .input-container .icon-prefix,\n  :host(.search) .input-container .icon-suffix {\n    padding: 0.1875rem 0;\n    padding-left: 0.75rem;\n    background: var(--light, #FFFFFF); }\n  :host(.search) .input-container .valid-icon {\n    display: none !important; }\n\n:host(.search.disabled) .input-container {\n  border: 1px solid var(--stable-ultralight, #F5F5F5); }\n  :host(.search.disabled) .input-container .icon-prefix,\n  :host(.search.disabled) .input-container .icon-suffix {\n    opacity: 0.6; }\n  :host(.search.disabled) .input-container input {\n    opacity: 0.6; }\n\n:host(.with-toggle) {\n  width: calc(100% - 4rem) !important; }\n\n:host(.grid-search) {\n  width: 100%; }\n\n:host(.has-invalid-format) {\n  margin-top: var(--padding-5, 0.3125rem); }\n\n:host(.web-menu) .input-container {\n  width: 250px;\n  height: 24px;\n  border: none;\n  background: var(--stable-light, #f1f1f1);\n  color: var(--stable, #adadad); }\n  :host(.web-menu) .input-container input {\n    background: var(--stable-light, #f1f1f1);\n    font-size: var(--font-s, 13px);\n    -webkit-box-shadow: none !important;\n    box-shadow: none !important; }\n  :host(.web-menu) .input-container .icon-prefix,\n  :host(.web-menu) .input-container .icon-suffix {\n    background: transparent;\n    font-size: var(--font-s, 13px); }\n\n:host(.history) {\n  margin: 0 !important;\n  padding: 0 !important;\n  border: none !important; }\n  :host(.history) .readonly {\n    padding: 0 !important;\n    text-align: left; }\n\n:host(.photos-tab) {\n  padding-left: 2.5rem !important; }\n\n:host(.boost) .input-container input {\n  caret-color: var(--danger-light, #F46885); }\n\n:host(.web) .input-container input {\n  font-size: var(--font-m, 15px); }\n\n:host(.full-width) {\n  width: 100%; }\n  :host(.full-width) .input-container {\n    width: 100%; }\n\n:host(.accent) .input-container {\n  border-color: var(--accent, #1FB6FF); }\n  :host(.accent) .input-container .icon-prefix {\n    border-right: none;\n    color: var(--accent, #1FB6FF); }\n  :host(.accent) .input-container .icon-suffix {\n    border-left: none;\n    color: var(--accent, #1FB6FF); }\n  :host(.accent) .input-container input {\n    margin: 0;\n    border: 0;\n    padding: 0;\n    display: inline-block;\n    vertical-align: middle;\n    white-space: normal;\n    background: none;\n    line-height: 1;\n    font-size: var(--font-m, 15px);\n    font-family: \"Lato\" !important;\n    min-width: 0;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    color: var(--accent, #1FB6FF); }\n    :host(.accent) .input-container input::-webkit-input-placeholder {\n      color: var(--accent, #1FB6FF); }\n    :host(.accent) .input-container input:-ms-input-placeholder {\n      color: var(--accent, #1FB6FF); }\n    :host(.accent) .input-container input::-ms-input-placeholder {\n      color: var(--accent, #1FB6FF); }\n    :host(.accent) .input-container input::placeholder {\n      color: var(--accent, #1FB6FF); }\n    :host(.accent) .input-container input::-webkit-input-placeholder {\n      color: var(--accent, #1FB6FF); }\n    :host(.accent) .input-container input:-moz-placeholder {\n      color: var(--accent, #1FB6FF); }\n    :host(.accent) .input-container input::-moz-placeholder {\n      color: var(--accent, #1FB6FF); }\n    :host(.accent) .input-container input:-ms-input-placeholder {\n      color: var(--accent, #1FB6FF); }\n    :host(.accent) .input-container input:focus {\n      outline: 0; }\n    :host(.accent) .input-container input[type=reset], :host(.accent) .input-container input[type=button], :host(.accent) .input-container input[type=submit], :host(.accent) .input-container input[type=checkbox], :host(.accent) .input-container input[type=radio] {\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box; }\n    :host(.accent) .input-container input[type=search] {\n      -webkit-appearance: textfield;\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box; }\n  :host(.accent) .input-container .label {\n    color: var(--accent, #1FB6FF); }\n\n:host(.success) .input-container {\n  border-color: var(--success, #04CC99); }\n  :host(.success) .input-container .icon-prefix {\n    border-right: none;\n    color: var(--success, #04CC99); }\n  :host(.success) .input-container .icon-suffix {\n    border-left: none;\n    color: var(--success, #04CC99); }\n  :host(.success) .input-container input {\n    margin: 0;\n    border: 0;\n    padding: 0;\n    display: inline-block;\n    vertical-align: middle;\n    white-space: normal;\n    background: none;\n    line-height: 1;\n    font-size: var(--font-m, 15px);\n    font-family: \"Lato\" !important;\n    min-width: 0;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    color: var(--success, #04CC99); }\n    :host(.success) .input-container input::-webkit-input-placeholder {\n      color: var(--success, #04CC99); }\n    :host(.success) .input-container input:-ms-input-placeholder {\n      color: var(--success, #04CC99); }\n    :host(.success) .input-container input::-ms-input-placeholder {\n      color: var(--success, #04CC99); }\n    :host(.success) .input-container input::placeholder {\n      color: var(--success, #04CC99); }\n    :host(.success) .input-container input::-webkit-input-placeholder {\n      color: var(--success, #04CC99); }\n    :host(.success) .input-container input:-moz-placeholder {\n      color: var(--success, #04CC99); }\n    :host(.success) .input-container input::-moz-placeholder {\n      color: var(--success, #04CC99); }\n    :host(.success) .input-container input:-ms-input-placeholder {\n      color: var(--success, #04CC99); }\n    :host(.success) .input-container input:focus {\n      outline: 0; }\n    :host(.success) .input-container input[type=reset], :host(.success) .input-container input[type=button], :host(.success) .input-container input[type=submit], :host(.success) .input-container input[type=checkbox], :host(.success) .input-container input[type=radio] {\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box; }\n    :host(.success) .input-container input[type=search] {\n      -webkit-appearance: textfield;\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box; }\n  :host(.success) .input-container .label {\n    color: var(--success, #04CC99); }\n\n:host(.info) .input-container {\n  border-color: var(--info, #fc459e); }\n  :host(.info) .input-container .icon-prefix {\n    border-right: none;\n    color: var(--info, #fc459e); }\n  :host(.info) .input-container .icon-suffix {\n    border-left: none;\n    color: var(--info, #fc459e); }\n  :host(.info) .input-container input {\n    margin: 0;\n    border: 0;\n    padding: 0;\n    display: inline-block;\n    vertical-align: middle;\n    white-space: normal;\n    background: none;\n    line-height: 1;\n    font-size: var(--font-m, 15px);\n    font-family: \"Lato\" !important;\n    min-width: 0;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    color: var(--info, #fc459e); }\n    :host(.info) .input-container input::-webkit-input-placeholder {\n      color: var(--info, #fc459e); }\n    :host(.info) .input-container input:-ms-input-placeholder {\n      color: var(--info, #fc459e); }\n    :host(.info) .input-container input::-ms-input-placeholder {\n      color: var(--info, #fc459e); }\n    :host(.info) .input-container input::placeholder {\n      color: var(--info, #fc459e); }\n    :host(.info) .input-container input::-webkit-input-placeholder {\n      color: var(--info, #fc459e); }\n    :host(.info) .input-container input:-moz-placeholder {\n      color: var(--info, #fc459e); }\n    :host(.info) .input-container input::-moz-placeholder {\n      color: var(--info, #fc459e); }\n    :host(.info) .input-container input:-ms-input-placeholder {\n      color: var(--info, #fc459e); }\n    :host(.info) .input-container input:focus {\n      outline: 0; }\n    :host(.info) .input-container input[type=reset], :host(.info) .input-container input[type=button], :host(.info) .input-container input[type=submit], :host(.info) .input-container input[type=checkbox], :host(.info) .input-container input[type=radio] {\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box; }\n    :host(.info) .input-container input[type=search] {\n      -webkit-appearance: textfield;\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box; }\n  :host(.info) .input-container .label {\n    color: var(--info, #fc459e); }\n\n:host(.warning) .input-container {\n  border-color: var(--warning, #ff6402); }\n  :host(.warning) .input-container .icon-prefix {\n    border-right: none;\n    color: var(--warning, #ff6402); }\n  :host(.warning) .input-container .icon-suffix {\n    border-left: none;\n    color: var(--warning, #ff6402); }\n  :host(.warning) .input-container input {\n    margin: 0;\n    border: 0;\n    padding: 0;\n    display: inline-block;\n    vertical-align: middle;\n    white-space: normal;\n    background: none;\n    line-height: 1;\n    font-size: var(--font-m, 15px);\n    font-family: \"Lato\" !important;\n    min-width: 0;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    color: var(--warning, #ff6402); }\n    :host(.warning) .input-container input::-webkit-input-placeholder {\n      color: var(--warning, #ff6402); }\n    :host(.warning) .input-container input:-ms-input-placeholder {\n      color: var(--warning, #ff6402); }\n    :host(.warning) .input-container input::-ms-input-placeholder {\n      color: var(--warning, #ff6402); }\n    :host(.warning) .input-container input::placeholder {\n      color: var(--warning, #ff6402); }\n    :host(.warning) .input-container input::-webkit-input-placeholder {\n      color: var(--warning, #ff6402); }\n    :host(.warning) .input-container input:-moz-placeholder {\n      color: var(--warning, #ff6402); }\n    :host(.warning) .input-container input::-moz-placeholder {\n      color: var(--warning, #ff6402); }\n    :host(.warning) .input-container input:-ms-input-placeholder {\n      color: var(--warning, #ff6402); }\n    :host(.warning) .input-container input:focus {\n      outline: 0; }\n    :host(.warning) .input-container input[type=reset], :host(.warning) .input-container input[type=button], :host(.warning) .input-container input[type=submit], :host(.warning) .input-container input[type=checkbox], :host(.warning) .input-container input[type=radio] {\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box; }\n    :host(.warning) .input-container input[type=search] {\n      -webkit-appearance: textfield;\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box; }\n  :host(.warning) .input-container .label {\n    color: var(--warning, #ff6402); }\n\n:host(.danger) .input-container {\n  border-color: var(--danger, #ff625f); }\n  :host(.danger) .input-container .icon-prefix {\n    border-right: none;\n    color: var(--danger, #ff625f); }\n  :host(.danger) .input-container .icon-suffix {\n    border-left: none;\n    color: var(--danger, #ff625f); }\n  :host(.danger) .input-container input {\n    margin: 0;\n    border: 0;\n    padding: 0;\n    display: inline-block;\n    vertical-align: middle;\n    white-space: normal;\n    background: none;\n    line-height: 1;\n    font-size: var(--font-m, 15px);\n    font-family: \"Lato\" !important;\n    min-width: 0;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    color: var(--danger, #ff625f); }\n    :host(.danger) .input-container input::-webkit-input-placeholder {\n      color: var(--danger, #ff625f); }\n    :host(.danger) .input-container input:-ms-input-placeholder {\n      color: var(--danger, #ff625f); }\n    :host(.danger) .input-container input::-ms-input-placeholder {\n      color: var(--danger, #ff625f); }\n    :host(.danger) .input-container input::placeholder {\n      color: var(--danger, #ff625f); }\n    :host(.danger) .input-container input::-webkit-input-placeholder {\n      color: var(--danger, #ff625f); }\n    :host(.danger) .input-container input:-moz-placeholder {\n      color: var(--danger, #ff625f); }\n    :host(.danger) .input-container input::-moz-placeholder {\n      color: var(--danger, #ff625f); }\n    :host(.danger) .input-container input:-ms-input-placeholder {\n      color: var(--danger, #ff625f); }\n    :host(.danger) .input-container input:focus {\n      outline: 0; }\n    :host(.danger) .input-container input[type=reset], :host(.danger) .input-container input[type=button], :host(.danger) .input-container input[type=submit], :host(.danger) .input-container input[type=checkbox], :host(.danger) .input-container input[type=radio] {\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box; }\n    :host(.danger) .input-container input[type=search] {\n      -webkit-appearance: textfield;\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box; }\n  :host(.danger) .input-container .label {\n    color: var(--danger, #ff625f); }\n\n:host(.dark) .input-container {\n  border-color: var(--dark, #2b3648); }\n  :host(.dark) .input-container .icon-prefix {\n    border-right: none;\n    color: var(--dark, #2b3648); }\n  :host(.dark) .input-container .icon-suffix {\n    border-left: none;\n    color: var(--dark, #2b3648); }\n  :host(.dark) .input-container input {\n    margin: 0;\n    border: 0;\n    padding: 0;\n    display: inline-block;\n    vertical-align: middle;\n    white-space: normal;\n    background: none;\n    line-height: 1;\n    font-size: var(--font-m, 15px);\n    font-family: \"Lato\" !important;\n    min-width: 0;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    color: var(--dark, #2b3648); }\n    :host(.dark) .input-container input::-webkit-input-placeholder {\n      color: var(--dark, #2b3648); }\n    :host(.dark) .input-container input:-ms-input-placeholder {\n      color: var(--dark, #2b3648); }\n    :host(.dark) .input-container input::-ms-input-placeholder {\n      color: var(--dark, #2b3648); }\n    :host(.dark) .input-container input::placeholder {\n      color: var(--dark, #2b3648); }\n    :host(.dark) .input-container input::-webkit-input-placeholder {\n      color: var(--dark, #2b3648); }\n    :host(.dark) .input-container input:-moz-placeholder {\n      color: var(--dark, #2b3648); }\n    :host(.dark) .input-container input::-moz-placeholder {\n      color: var(--dark, #2b3648); }\n    :host(.dark) .input-container input:-ms-input-placeholder {\n      color: var(--dark, #2b3648); }\n    :host(.dark) .input-container input:focus {\n      outline: 0; }\n    :host(.dark) .input-container input[type=reset], :host(.dark) .input-container input[type=button], :host(.dark) .input-container input[type=submit], :host(.dark) .input-container input[type=checkbox], :host(.dark) .input-container input[type=radio] {\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box; }\n    :host(.dark) .input-container input[type=search] {\n      -webkit-appearance: textfield;\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box; }\n  :host(.dark) .input-container .label {\n    color: var(--dark, #2b3648); }\n\n:host(.control-icon-color) .input-container {\n  border-color: var(--input-container-border-color, #E6E6E6); }\n  :host(.control-icon-color) .input-container .icon-prefix {\n    border-right: none;\n    color: var(--text-color, #807f83); }\n  :host(.control-icon-color) .input-container .icon-suffix {\n    border-left: none;\n    color: var(--text-color, #807f83); }\n  :host(.control-icon-color) .input-container input {\n    margin: 0;\n    border: 0;\n    padding: 0;\n    display: inline-block;\n    vertical-align: middle;\n    white-space: normal;\n    background: none;\n    line-height: 1;\n    font-size: var(--font-m, 15px);\n    font-family: \"Lato\" !important;\n    min-width: 0;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    color: var(--text-color, #807f83); }\n    :host(.control-icon-color) .input-container input::-webkit-input-placeholder {\n      color: var(--text-color, #807f83); }\n    :host(.control-icon-color) .input-container input:-ms-input-placeholder {\n      color: var(--text-color, #807f83); }\n    :host(.control-icon-color) .input-container input::-ms-input-placeholder {\n      color: var(--text-color, #807f83); }\n    :host(.control-icon-color) .input-container input::placeholder {\n      color: var(--text-color, #807f83); }\n    :host(.control-icon-color) .input-container input::-webkit-input-placeholder {\n      color: var(--text-color, #807f83); }\n    :host(.control-icon-color) .input-container input:-moz-placeholder {\n      color: var(--text-color, #807f83); }\n    :host(.control-icon-color) .input-container input::-moz-placeholder {\n      color: var(--text-color, #807f83); }\n    :host(.control-icon-color) .input-container input:-ms-input-placeholder {\n      color: var(--text-color, #807f83); }\n    :host(.control-icon-color) .input-container input:focus {\n      outline: 0; }\n    :host(.control-icon-color) .input-container input[type=reset], :host(.control-icon-color) .input-container input[type=button], :host(.control-icon-color) .input-container input[type=submit], :host(.control-icon-color) .input-container input[type=checkbox], :host(.control-icon-color) .input-container input[type=radio] {\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box; }\n    :host(.control-icon-color) .input-container input[type=search] {\n      -webkit-appearance: textfield;\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box; }\n  :host(.control-icon-color) .input-container .label {\n    color: var(--text-color, #807f83); }"; }
}

export { YooFormInputComponent as YooFormInput };

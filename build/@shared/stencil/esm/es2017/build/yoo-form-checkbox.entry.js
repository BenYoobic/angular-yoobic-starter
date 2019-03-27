import { h } from '../design-system.core.js';

import { aQ as setValueAndValidateInput, aN as setValidator, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

// import { Vibration } from '@ionic-native/vibration';
class YooFormCheckboxComponent {
    constructor() {
        /**
         * Checks the validity of the component.
         */
        this.validators = [];
        /**
         * FormDisplayType property
         */
        this.type = 'normal';
        /**
         * Defines the default value of the component
         */
        this.value = false;
        /**
         * Specifies wheter the component is in readonly mode.
         */
        this.readonly = false;
        /**
         * Specifies wheter the component is a required field.
         */
        this.required = false;
    }
    requiredWatch() {
        this.validate();
    }
    onCheckboxClick() {
        // if (!getSession().user.disableHapticFeedback) {
        //     Vibration.vibrate(200);
        // }
        setValueAndValidateInput(!this.value, this);
    }
    componentWillLoad() {
        this.isFormChoice = this.host.classList.contains('btn-form-choice');
        setValidator(this);
    }
    componentDidLoad() {
        if (this.type === 'line') {
            this.host.classList.add('line');
        }
    }
    componentDidUpdate() {
        if (this.type === 'line') {
            this.host.classList.add('line');
        }
    }
    validate() {
        let isValid = true;
        if (this.required && !this.value) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validity = isValid;
            this.validityChanged.emit(isValid);
        }
        return this.validity;
    }
    renderCheck() {
        let newClass;
        if (this.readonly) {
            if (this.value) {
                newClass = {
                    'yo-check success': this.value
                };
            }
            else {
                newClass = {
                    'yo-cross danger': this.value === false,
                    'yo-circle disabled': this.value !== false
                };
            }
        }
        else {
            if (this.value) {
                newClass = {
                    'yo-check': this.value
                };
            }
            else {
                newClass = {
                    'yo-circle': true,
                    'undefined': this.value !== false,
                    'form-choice': this.isFormChoice
                };
            }
        }
        return h("yoo-icon", { class: newClass });
    }
    renderFormChoiceMask() {
        if (this.isFormChoice) {
            return h("div", { class: "check-background-mask" });
        }
        else {
            return null;
        }
    }
    renderHeader() {
        if (!this.header) {
            return null;
        }
        let baseClass = {
            'label': true,
            'readonly': this.readonly
        };
        return h("div", { class: baseClass },
            h("span", { innerHTML: this.header }));
    }
    renderReadonly() {
        return (h("div", { class: "readonly" },
            this.renderHeader(),
            this.renderCheck()));
    }
    renderEditable() {
        return (h("div", { class: "outer-container", onClick: () => this.onCheckboxClick() },
            this.renderFormChoiceMask(),
            this.renderCheck(),
            this.renderHeader()));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "host": {
            "elementRef": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "onCheckboxClick": {
            "method": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required",
            "watchCallbacks": ["requiredWatch"]
        },
        "type": {
            "type": String,
            "attr": "type",
            "reflectToAttr": true
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": Boolean,
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
    static get style() { return ":host {\n  --margin-top-container: 0;\n  --yo-circle-color: var(--stable, #adadad);\n  --font-size-outer-container: var(--font-l, 17px); }\n\n:host .optional {\n  margin-left: 0.5rem !important;\n  color: var(--stable, #adadad);\n  white-space: nowrap; }\n\n:host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  font-size: var(--font-size-outer-container);\n  word-break: break-word; }\n  :host .outer-container yoo-icon {\n    font-size: var(--checkbox-size, 20px);\n    line-height: 1; }\n  :host .outer-container .yo-circle {\n    color: var(--yo-circle-color); }\n  :host .outer-container .yo-circle.undefined {\n    color: var(--yo-circle-color); }\n  :host .outer-container .yo-check {\n    -ms-flex: 0;\n    flex: 0; }\n  :host .outer-container .label {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex: 1;\n    flex: 1;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    padding-left: var(--padding-10, 0.625rem);\n    color: inherit;\n    font-size: var(--font-m, 15px);\n    font-weight: normal;\n    line-height: 1.5;\n    text-align: left;\n    font-variant-caps: normal; }\n    :host .outer-container .label .required {\n      margin-right: 0.25rem;\n      color: var(--danger, #ff625f);\n      font-variant-caps: normal; }\n    :host .outer-container .label .label-required {\n      margin-left: 0.25rem;\n      color: var(--danger, #ff625f); }\n    :host .outer-container .label.readonly {\n      letter-spacing: 0px; }\n\n:host .readonly {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  font-size: var(--font-size-outer-container);\n  word-break: break-word; }\n  :host .readonly yoo-icon {\n    font-size: var(--checkbox-size, 20px);\n    line-height: 1; }\n  :host .readonly .yo-circle {\n    color: var(--yo-circle-color); }\n  :host .readonly .yo-circle.undefined {\n    color: var(--yo-circle-color); }\n  :host .readonly .yo-circle.disabled {\n    border-radius: 50%;\n    background: var(--stable-light, #f1f1f1); }\n  :host .readonly .yo-check {\n    -ms-flex: 0;\n    flex: 0; }\n  :host .readonly .label {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex: 1;\n    flex: 1;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    padding-bottom: var(--padding-15, 0.9375rem);\n    color: var(--text-color, #807f83);\n    font-size: var(--font-m, 15px);\n    font-weight: normal;\n    line-height: 1.5;\n    text-align: left;\n    font-variant-caps: normal; }\n    :host .readonly .label .required {\n      margin-right: 0.25rem;\n      color: var(--danger, #ff625f);\n      font-variant-caps: normal; }\n    :host .readonly .label .label-required {\n      margin-left: 0.25rem;\n      color: var(--danger, #ff625f); }\n\n:host(.btn-form-choice) .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  width: var(--checkbox-size, 20px);\n  height: var(--checkbox-size, 20px);\n  margin: 0.3125rem;\n  border-radius: 50%;\n  background-color: transparent;\n  font-size: var(--font-m, 15px); }\n  :host(.btn-form-choice) .outer-container .check-background-mask {\n    position: absolute;\n    width: var(--checkbox-size, 20px);\n    height: var(--checkbox-size, 20px);\n    border-radius: 50%;\n    background: var(--light, #FFFFFF);\n    color: var(--light, #FFFFFF); }\n  :host(.btn-form-choice) .outer-container yoo-icon.form-choice {\n    z-index: 1; }\n  :host(.btn-form-choice) .outer-container yoo-icon.yoo-circle {\n    color: var(--yo-circle-color); }\n  :host(.btn-form-choice) .outer-container yoo-icon.yo-check {\n    z-index: 1; }\n\n:host(.history) .readonly {\n  font-size: 14px !important; }\n  :host(.history) .readonly yoo-icon {\n    font-size: 14px !important; }\n\n.yo-circle\n:host(.operations) .outer-container:hover {\n  color: var(--success, #04CC99); }\n\n:host(.operations) .outer-container .yo-check {\n  color: var(--success, #04CC99); }\n\n:host(.operations) .readonly .yo-check {\n  color: var(--success, #04CC99); }\n\n.yo-circle\n:host(.boost) .outer-container:hover {\n  color: var(--danger-light, #F46885); }\n\n:host(.boost) .outer-container .yo-check {\n  color: var(--danger-light, #F46885); }\n\n:host(.boost) .readonly .yo-check {\n  color: var(--danger-light, #F46885); }"; }
}

export { YooFormCheckboxComponent as YooFormCheckbox };

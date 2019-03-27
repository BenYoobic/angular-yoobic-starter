import { setValidator, setValueAndValidateInput, getAppContext } from '../../../utils';
// import { Vibration } from '@ionic-native/vibration';
export class YooFormCheckboxComponent {
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
    static get style() { return "/**style-placeholder:yoo-form-checkbox:**/"; }
}

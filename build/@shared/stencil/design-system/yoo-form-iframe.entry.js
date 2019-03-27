const h = window.DesignSystem.h;

import { aQ as setValueAndValidateInput, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooFormIFrameComponent {
    constructor() {
        this.validators = [];
    }
    requiredWatch() {
        this.validate();
    }
    validate() {
        let isValid = true;
        if (this.required && !this.value) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validityChanged.emit(isValid);
            this.validity = isValid;
        }
        return this.validity;
    }
    openScene(url) {
        setValueAndValidateInput(this.value, this);
        window.open(url, '_blank', `location=no,toolbar=yes,closebuttoncaption=${translate("CLOSE")}`);
    }
    render() {
        return [
            h("yoo-button", { text: translate('OPEN'), disabled: false, onClick: () => { this.openScene(this.source); } })
        ];
    }
    static get is() { return "yoo-form-iframe"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
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
        "source": {
            "type": String,
            "attr": "source"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": "Any",
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
    static get style() { return ""; }
}

export { YooFormIFrameComponent as YooFormIframe };

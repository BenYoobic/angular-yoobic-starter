import { h } from '../design-system.core.js';

import { a5 as getAppContext, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooResetPasswordComponent {
    constructor() {
        this.isMagicLink = false;
        this.showTitle = true;
    }
    validateEmaiInput() {
        if (this.emailInput && this.submitButton) {
            this.validateInput = this.emailInput.validity;
            this.validateInput ? this.submitButton.disabled = false : this.submitButton.disabled = true;
        }
    }
    onSubmit() {
        if (this.validateInput) {
            this.passwordResetRequestSubmitted.emit({ email: this.userEmail, isMagicLink: this.isMagicLink });
        }
    }
    onInputChanged(ev) {
        this.userEmail = ev.detail;
        this.validateEmaiInput();
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: 'container' },
            this.showTitle ?
                (h("div", { class: 'title' }, this.heading))
                : null,
            h("div", { class: 'subtitle' }, this.subheading),
            h("div", { class: 'input' },
                h("yoo-form-input-container", { field: { title: translate('EMAIL') }, hideOptional: true },
                    h("yoo-form-input", { ref: (el) => this.emailInput = el, validators: [{ name: 'email' }, { name: 'required' }], type: "email", uiValidation: { valid: false, invalid: true }, onInputChanged: (event) => this.onInputChanged(event) }))),
            h("div", { class: 'button' },
                h("yoo-button", { ref: (el) => this.submitButton = el, class: this.buttonClass + ' large full-width', text: translate('SUBMIT'), disabled: true, onClick: () => this.onSubmit() }))));
    }
    static get is() { return "yoo-reset-password"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "borderClass": {
            "type": String,
            "attr": "border-class"
        },
        "buttonClass": {
            "type": String,
            "attr": "button-class"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "isMagicLink": {
            "type": Boolean,
            "attr": "is-magic-link"
        },
        "showTitle": {
            "type": Boolean,
            "attr": "show-title"
        },
        "subheading": {
            "type": String,
            "attr": "subheading"
        },
        "validateInput": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "passwordResetRequestSubmitted",
            "method": "passwordResetRequestSubmitted",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: justify;\n  justify-content: space-between; }\n  :host .container .title {\n    padding-bottom: 0.75rem;\n    font-size: var(--font-l, 17px);\n    opacity: 0.8; }\n  :host .container .subtitle {\n    padding-bottom: 2.8125rem;\n    font-size: var(--font-m, 15px);\n    opacity: 0.8; }\n  :host .container .button {\n    -ms-flex-item-align: center;\n    align-self: center;\n    width: 100%;\n    padding-top: 2.5rem; }\n\n:host(.mobile) .container {\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  padding: 0 1.875rem; }\n  :host(.mobile) .container .title {\n    font-size: var(--font-l, 17px) !important;\n    opacity: 1 !important; }\n  :host(.mobile) .container .subtitle {\n    padding-top: 3.875rem;\n    padding-right: 1.875rem;\n    padding-bottom: 3rem !important;\n    padding-left: 1.875rem;\n    font-size: var(--font-l, 17px) !important;\n    text-align: center;\n    opacity: 1 !important; }\n  :host(.mobile) .container .input {\n    width: 100%;\n    padding: 0 1.875rem; }\n  :host(.mobile) .container .button {\n    padding-top: 2.875rem !important; }\n\n:host(.web) .container {\n  max-width: 500px;\n  margin: auto; }\n  :host(.web) .container .subtitle {\n    text-align: center; }"; }
}

export { YooResetPasswordComponent as YooResetPassword };

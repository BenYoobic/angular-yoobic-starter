import { translate, getAppContext } from '../../../index'; //'../../../../stencil';
export class YooResetPasswordComponent {
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
    static get style() { return "/**style-placeholder:yoo-reset-password:**/"; }
}

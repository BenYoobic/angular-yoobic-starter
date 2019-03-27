import { translate } from '../../../utils';
export class YooFieldValidityComponent {
    renderExplanation() {
        return (h("div", { class: "explanation-container" },
            h("div", { class: "explanation-label" }, translate('WHY?')),
            h("div", { class: "explanation-text" }, this.explanation),
            this.explanationDocument ? [h("div", { class: "explanation-label" }, translate('EXTRA')), h("yoo-form-document", { document: this.explanationDocument })] : null));
    }
    render() {
        return [
            h("div", { class: 'validity-label ' + (this.isValid ? 'valid' : 'invalid') }, translate(this.isValid ? 'CORRECT' : 'INCORRECT')),
            !this.isValid && this.explanation ? this.renderExplanation() : null
        ];
    }
    static get is() { return "yoo-field-validity"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "explanation": {
            "type": String,
            "attr": "explanation"
        },
        "explanationDocument": {
            "type": "Any",
            "attr": "explanation-document"
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "type": Boolean,
            "attr": "is-valid"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-field-validity:**/"; }
}

import { setValueAndValidateInput } from '../../../utils';
import pell from 'pell';
export class YooFormTextEditorComponent {
    constructor() {
        this.validators = [];
    }
    componentDidLoad() {
        if (!this.readonly && this.containerEl) {
            this.editor = pell.init({
                element: this.containerEl,
                actions: [
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'heading1',
                    'heading2',
                    'paragraph',
                    'quote',
                    'olist',
                    'ulist',
                    //'code',
                    'line'
                    // {
                    //     name: 'link',
                    //     icon: '<yoo-icon class="yo-link"></yoo-icon>',
                    //     result: () => {
                    //         showRename(
                    //             translate('INSERTLINK'),
                    //             null,
                    //             '').then(ret => {
                    //                 if (ret) {
                    //                     pell.exec('createLink', ret);
                    //                 }
                    //             })
                    //     }
                    // }
                    //'image'
                ],
                onChange: (html) => this.onChange(html)
            });
            if (this.value) {
                this.editor.content.innerHTML = this.value;
            }
        }
    }
    componentDidUnload() {
        if (this.editor && this.editor.disable) {
            this.editor.disable();
        }
    }
    onChange(html) {
        // if (this.editor) {
        //     let value = this.editor.getContents();
        //     // tslint:disable-next-line:no-console
        //     console.log(value);
        //     setValueAndValidateInput(value, this);
        // }
        setValueAndValidateInput(html, this);
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
    renderEditable() {
        return (h("div", { class: "container", ref: el => this.containerEl = el }));
    }
    renderReadonly() {
        return h("div", { class: "readonly", innerHTML: this.value || '' });
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-text-editor"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": String,
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
    static get style() { return "/**style-placeholder:yoo-form-text-editor:**/"; }
}

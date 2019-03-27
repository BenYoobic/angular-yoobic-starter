import { setValidator, setValueAndValidateInput, cloudinary, showModal } from '../../../utils';
export class YooFormSignaturePadComponent {
    constructor() {
        this.validators = [];
    }
    componentWillLoad() {
        setValidator(this);
    }
    onShowDialog() {
        let dialog = document.createElement('yoo-form-signature-pad-dialog');
        dialog.value = this.value;
        dialog.readonly = this.readonly;
        showModal(dialog).then(ret => {
            if (ret) {
                // this.value = ret.data;
                setValueAndValidateInput(ret.data, this);
            }
            dialog = null;
        });
    }
    renderEditable() {
        return h("div", { class: "outer-container" },
            h("div", { class: "signature-container", onClick: (ev) => this.onShowDialog() },
                this.required ? h("span", { class: "required" }, "*") : null,
                this.value ? h("yoo-img", { type: "back", class: "preview", src: cloudinary(this.value, 500, 500) }) : null,
                this.value ? h("div", { class: "overlay" }) : null,
                h("yoo-icon", { class: 'yo-signature' + (this.value ? ' light' : ' success') })));
    }
    renderReadonly() {
        return this.value ? h("div", { class: "readonly" },
            h("div", { class: "signature-container", onClick: () => this.onShowDialog() },
                h("yoo-img", { type: "back", class: "preview", src: cloudinary(this.value, 500, 500) }))) : null;
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
    static get is() { return "yoo-form-signature-pad"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "name": {
            "type": String,
            "attr": "name"
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
    static get style() { return "/**style-placeholder:yoo-form-signature-pad:**/"; }
}

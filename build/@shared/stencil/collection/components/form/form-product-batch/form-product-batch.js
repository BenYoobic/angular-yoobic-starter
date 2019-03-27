import { translate, getProductBatchDateBadge, showModal } from '../../../index';
import { setValidator } from '../../../utils/helpers/form-input-helpers';
export class YooFormProductBatchComponent {
    constructor() {
        this.validators = [];
    }
    requiredWatch() {
        this.validate();
    }
    componentWillLoad() {
        setValidator(this);
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
    onOpenImage() {
        let photoEditor = document.createElement('yoo-photo-editor');
        photoEditor.readonly = true;
        photoEditor.isModal = true;
        photoEditor.src = this.value.product.image._downloadURL;
        showModal(photoEditor, {}, '', 'slideYEnterAnimation', 'slideYLeaveAnimation').then(() => {
            if (photoEditor) {
                photoEditor = null;
            }
        });
    }
    renderReadonly() {
        if (!this.value || !this.value.product) {
            return;
        }
        let badge = getProductBatchDateBadge(this.value, 'medium');
        return h("div", { class: "readonly" },
            this.value && this.value.product && this.value.product.image && this.value.product.image._downloadURL && h("yoo-img", { type: "back", src: this.value.product.image._downloadURL, class: "contain", onClick: ev => this.onOpenImage() }),
            h("div", { class: "title" }, this.value.product.title),
            h("div", { class: "subtitle" },
                h("span", null,
                    translate('CODE'),
                    ":"),
                h("span", { class: "value" }, this.value.product.reference)),
            badge && h("yoo-badge", { class: badge.cssClass ? badge.cssClass : '', text: badge.text }));
    }
    renderEditable() {
        return h("div", null, this.value);
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-product-batch"; }
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
    static get style() { return "/**style-placeholder:yoo-form-product-batch:**/"; }
}

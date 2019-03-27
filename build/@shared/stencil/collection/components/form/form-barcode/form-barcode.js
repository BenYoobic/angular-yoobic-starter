import { showModal, setValidator, setValueAndValidateInput, getSession, isCordova, closeModal } from '../../../utils';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
export class YooFormBarcodeComponent {
    constructor() {
        this.validators = [];
        this.scanning = false;
    }
    //private dialog: any;
    componentWillLoad() {
        setValidator(this);
    }
    onOpenScanner() {
        if (this.scanning) {
            return;
        }
        if (isCordova() && !getSession().hasScandit) {
            this.scanning = true;
            return BarcodeScanner.scan({
                showFlipCameraButton: true,
                showTorchButton: true
            }).then((result) => {
                this.scanning = false;
                if (result && result.text) {
                    let value = result.text;
                    setValueAndValidateInput(value, this);
                }
            });
        }
        else if (getSession().hasScandit) {
            let dialog = document.createElement('yoo-form-barcode-dialog');
            dialog.mainMode = 'default';
            let scannedSuccessListener = (ev) => {
                if (ev && ev.detail) {
                    setValueAndValidateInput(ev.detail, this);
                    this.value = ev.detail;
                }
                closeModal(dialog);
            };
            dialog.addEventListener('scannedSuccess', scannedSuccessListener);
            showModal(dialog).then(() => {
                if (dialog) {
                    dialog.removeEventListener('scannedSuccess', scannedSuccessListener);
                    dialog = null;
                }
            });
        }
    }
    renderReadonly() {
        return (h("div", { class: "readonly" }, this.value));
    }
    renderEditable() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "barcode-container", onClick: (ev) => this.onOpenScanner() },
                h("yoo-icon", { class: "center yo-barcode success" })),
            h("div", { class: "value-container" },
                h("div", null,
                    this.placeholder ? h("div", null, this.placeholder) : null,
                    this.value && !this.hideValue ? h("div", null, this.value) : null))));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-barcode"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "hideValue": {
            "type": Boolean,
            "attr": "hide-value"
        },
        "host": {
            "elementRef": true
        },
        "name": {
            "type": String,
            "attr": "name"
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
    static get style() { return "/**style-placeholder:yoo-form-barcode:**/"; }
}

import { showModal, setValueAndValidateInput, isCordova } from '../../../utils';
import { setValidator } from '../../../utils/helpers/form-input-helpers';
import { range } from 'lodash-es';
export class YooFormNumberPickerComponent {
    constructor() {
        this.min = 0;
        this.max = 10;
        this.value = null;
        this.validators = [];
        this.placeholder = 'Choose a number';
        this.clearable = true;
        this.selection = null;
    }
    async isValid() {
        return this.validity;
    }
    setValue(value) {
        setValueAndValidateInput(value, this);
        this.selection = value;
    }
    componentWillLoad() {
        setValidator(this);
    }
    componentDidLoad() {
        this.keyboard = Keyboard;
    }
    showContainerDialog() {
        this.dialog = document.createElement('yoo-form-number-picker-dialog');
        this.dialog.values = Array.from(range(this.min, this.max + 1));
        if (this.selection !== null) {
            this.dialog.value = this.selection;
        }
        showModal(this.dialog, { half: true }, null, 'slideYEnterAnimation', 'slideYLeaveAnimation', true, false).then(ret => {
            if (ret && !ret.overlayDismiss) {
                this.setValue(ret.data);
            }
            this.dialog = null;
        });
    }
    onInputFocused(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        if (isCordova()) {
            this.keyboard.hide();
        }
        this.showContainerDialog();
    }
    onIconClicked(ev) {
        if (ev && ev.detail && ev.detail === 'clear') {
            this.setValue(null);
        }
    }
    renderReadonly() {
        return (h("div", { class: "input-container noborder" },
            h("div", { class: "readonly" }, this.value)));
    }
    renderEditable() {
        return h("div", { class: "outer-container" },
            h("yoo-form-input", { type: "number", value: this.value, clearable: this.clearable, required: this.required, readonly: this.readonly, validity: this.validity, onIconClicked: (ev) => this.onIconClicked(ev), onInputFocused: (ev) => this.onInputFocused(ev) }));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-number-picker"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "clearable": {
            "type": Boolean,
            "attr": "clearable"
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "method": true
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "min": {
            "type": Number,
            "attr": "min"
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
        "selection": {
            "state": true
        },
        "setValue": {
            "method": true
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "type": Boolean,
            "attr": "validity",
            "mutable": true
        },
        "value": {
            "type": Number,
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
    static get style() { return "/**style-placeholder:yoo-form-number-picker:**/"; }
}

const h = window.DesignSystem.h;

import { aQ as setValueAndValidateInput, aN as setValidator, c9 as range, a_ as showModal, k as isCordova, m as translate, Q as closeModal, W as isWeb } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooFormNumberPickerComponent {
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
    static get style() { return ""; }
}

const HEADER_HEIGHT = 44;
class YooFormNumberPickerDialogComponent {
    constructor() {
        this.fullscreen = false;
    }
    handleModalPresent(ev) {
        if (this.selectedElement) {
            setTimeout(() => {
                this.selectedElement.scrollIntoView();
            }, 100);
        }
    }
    componentDidLoad() {
        this.selection = this.value;
    }
    componentDidUnload() {
        this.value = null;
        this.selection = null;
        this.selectedElement = null;
    }
    get fullScrollHeight() {
        let pageHeight = window.innerHeight;
        return pageHeight - HEADER_HEIGHT;
    }
    getDialogTitle() {
        return translate('PICKANUMBER');
    }
    onItemSelect(ev, itemValue) {
        ev.stopPropagation();
        this.selection = itemValue;
        closeModal(this.selection);
    }
    render() {
        const web = isWeb();
        let numberValues = this.values.length + this.values[0];
        return (h("div", { class: "outer-container" },
            h("yoo-ion-toolbar", { color: "light", class: "aautocomplete" },
                h("yoo-ion-title", null, this.getDialogTitle())),
            h("div", { class: "content" },
                h("yoo-ion-scroll", null, this.values.map(i => h("div", { ref: this.value === i ? el => this.selectedElement = el : null, class: this.value === i ? 'item-selected numberpicker' : 'numberpicker', onClick: (ev) => this.onItemSelect(ev, i) },
                    h("div", { class: numberValues === i + 1 ? 'lastElement center' : 'center' },
                        " ",
                        i)))),
                h("div", { class: { 'footer-background bottom': true } }),
                h("div", { class: { 'footer-background middle': true, 'web': web } }),
                h("div", { class: { 'footer-background top': true, 'web': web } }))));
    }
    static get is() { return "yoo-form-number-picker-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "fullscreen": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "selection": {
            "state": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        },
        "values": {
            "type": "Any",
            "attr": "values",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "swipedUp",
            "method": "swipedUp",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "swipedDown",
            "method": "swipedDown",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:ionModalDidPresent",
            "method": "handleModalPresent"
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  height: 100%; }\n  :host .outer-container yoo-ion-toolbar {\n    max-height: 44px;\n    -webkit-box-shadow: var(--toolbar-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15));\n    box-shadow: var(--toolbar-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15)); }\n  :host .outer-container .content {\n    position: relative;\n    height: calc(100% - 44px);\n    background-color: var(--light, #FFFFFF); }\n    :host .outer-container .content yoo-ion-scroll {\n      top: auto;\n      height: 100%;\n      -webkit-transition: 0.3s;\n      transition: 0.3s; }\n  :host .outer-container .item-selected {\n    color: var(--success, #04CC99); }\n\n:host .center {\n  padding-top: 0.5rem;\n  text-align: center; }\n\n:host .lastElement {\n  padding-bottom: 5rem; }\n\n:host .footer-background {\n  top: auto;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  z-index: 1; }\n  :host .footer-background.bottom {\n    height: 2.875rem;\n    border: var(--border);\n    border-radius: var(--border-radius, 1px);\n    background: var(--light, #FFFFFF); }\n  :host .footer-background.middle {\n    bottom: 2.875rem;\n    height: 1.4375rem;\n    background-image: var(--footer-background-middle, linear-gradient(to bottom, rgba(255, 255, 255, 0.7), white)); }\n    :host .footer-background.middle.web {\n      height: 2.875rem; }\n  :host .footer-background.top {\n    bottom: 4.3125rem;\n    height: 1.4375rem;\n    background-image: var(--footer-background-top, linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7))); }\n    :host .footer-background.top.web {\n      bottom: 5.75rem;\n      height: 2.875rem; }"; }
}

export { YooFormNumberPickerComponent as YooFormNumberPicker, YooFormNumberPickerDialogComponent as YooFormNumberPickerDialog };

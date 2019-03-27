import { isWeb, querySelectorDeep, findParent, setValidator, setValueAndValidateInput, getFormBottomPosition } from '../../../utils';
import Pickr from 'pickr-widget/dist/pickr.min.js';
const PICKR_HEIGHT = 280;
const ANIMATION_TIME = 150;
export class YooFormColorFieldComponent {
    constructor() {
        this.readonly = false;
        this.hexInput = true;
        this.rgbaInput = false;
        this.hsvaInput = false;
        this.position = 'right';
    }
    componentWillLoad() {
        setValidator(this);
        this.default = this.value ? this.value : '#FFFFFF';
    }
    componentDidLoad() {
        this.formDynamic = findParent(this.host);
        this.formDynamicBottom = getFormBottomPosition(this.formDynamic);
        this.fieldPlaceholder = this.host.parentNode.parentElement;
        this.fieldPlaceholder = this.fieldPlaceholder.classList.contains('field-placeholder') ? this.fieldPlaceholder : null;
        if (this.readonly) {
            querySelectorDeep(this.host, '.readonly').setAttribute('style', `background-color: #${this.default};`);
        }
        else {
            this._pickr = new Pickr({
                el: querySelectorDeep(this.host, '.color-picker'),
                default: this.default,
                position: this.position,
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,
                    interaction: {
                        hex: this.hexInput,
                        rgba: this.rgbaInput,
                        hsva: this.hsvaInput,
                        input: true,
                        save: true
                    }
                },
                onSave: (hsva) => {
                    let hex = hsva.toHEX().toString();
                    setValueAndValidateInput(hex, this);
                    this.formDynamic.setScrollSpacerHeight(0);
                }
            });
        }
        if (this.formDynamic) {
            this.clickListener = () => this.pickrClicked();
            this.formDynamic.addEventListener('click', this.clickListener);
        }
    }
    componentDidUnload() {
        if (this.formDynamic) {
            this.formDynamic.removeEventListener('click', this.clickListener);
        }
    }
    pickrClicked() {
        let pickrDisplay = querySelectorDeep(this.host, '.pcr-app');
        if (pickrDisplay.classList.contains('visible')) {
            if (this.fieldPlaceholder) {
                this.fieldPlaceholder.setAttribute('style', 'z-index: 99;');
            }
            if (isWeb()) {
                let pickrBottom = this.host.getBoundingClientRect().bottom + PICKR_HEIGHT;
                if (pickrBottom > this.formDynamicBottom) {
                    // this.formDynamic.setScrollSpacerHeight(pickrBottom - this.formDynamicBottom);
                    this.formDynamic.scrollToPoint(pickrBottom - this.formDynamicBottom);
                }
            }
        }
        else {
            if (this.fieldPlaceholder) {
                setTimeout(() => {
                    this.fieldPlaceholder.setAttribute('style', 'z-index: 1;');
                }, ANIMATION_TIME);
            }
            if (isWeb()) {
                this.formDynamic.setScrollSpacerHeight(0);
            }
        }
    }
    renderEditable() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "color-picker" })));
    }
    renderReadonly() {
        return (h("div", { class: "readonly" }));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-color-field"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "hexInput": {
            "type": Boolean,
            "attr": "hex-input"
        },
        "host": {
            "elementRef": true
        },
        "hsvaInput": {
            "type": Boolean,
            "attr": "hsva-input"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "position": {
            "type": String,
            "attr": "position"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "rgbaInput": {
            "type": Boolean,
            "attr": "rgba-input"
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
    static get style() { return "/**style-placeholder:yoo-form-color-field:**/"; }
}

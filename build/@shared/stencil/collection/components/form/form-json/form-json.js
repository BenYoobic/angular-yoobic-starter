import { translate, setValidator, setValueAndValidateInput } from '../../../utils/';
import JSONEditor from 'jsoneditor/dist/jsoneditor.min';
import ClipboardJS from 'clipboard';
export class YooFormJsonComponent {
    constructor() {
        this.validators = [];
    }
    requiredWatch() {
        this.validate();
    }
    componentWillLoad() {
        setValidator(this);
    }
    componentDidLoad() {
        if (this.containerEl) {
            this.jsonEditor = new JSONEditor(this.containerEl, {
                mode: this.readonly ? 'view' : 'text',
                modes: ['code', 'form', 'text', 'tree', 'view'],
                onChange: this.readonly ? null : () => this.onChange()
            });
            if (this.value) {
                this.jsonEditor.set(this.value);
            }
            else {
                this.jsonEditor.set({});
            }
        }
        if (this.copyButtonEl) {
            this.copyIntance = new ClipboardJS(this.copyButtonEl, {
                text: (trigger) => {
                    let json = this.jsonEditor.get();
                    return JSON.stringify(json, null, 4);
                }
            });
        }
    }
    componentDidUnload() {
        if (this.jsonEditor) {
            this.jsonEditor.destroy();
        }
        if (this.copyIntance) {
            this.copyIntance.destroy();
        }
    }
    onChange() {
        try {
            let json = this.jsonEditor.get();
            setValueAndValidateInput(json, this);
        }
        catch (err) {
        }
    }
    onChangeMode(mode) {
        if (this.jsonEditor) {
            this.jsonEditor.setMode(mode);
        }
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
    renderBase() {
        return [
            h("div", { class: 'toolbar' },
                h("yoo-ion-header", null,
                    h("yoo-ion-toolbar", { color: "light", class: "menu-page no-border" },
                        h("yoo-ion-buttons", { class: "icons", slot: "start" },
                            h("yoo-tooltip", { placement: "bottom", content: translate('FORM') },
                                h("yoo-ion-button", { class: "neutral text-color", onClick: ev => this.onChangeMode('form') },
                                    h("yoo-icon", { slot: "icon-only", class: "yo-list-view" }))),
                            h("yoo-tooltip", { placement: "bottom", content: translate('TEXT') },
                                h("yoo-ion-button", { class: "neutral text-color", onClick: ev => this.onChangeMode('text') },
                                    h("yoo-icon", { slot: "icon-only", class: "yo-align-left" }))),
                            h("yoo-tooltip", { placement: "bottom", content: translate('TREE') },
                                h("yoo-ion-button", { class: "neutral text-color", onClick: ev => this.onChangeMode('tree') },
                                    h("yoo-icon", { slot: "icon-only", class: "yo-single-choice" }))),
                            h("yoo-tooltip", { placement: "bottom", content: translate('VIEW') },
                                h("yoo-ion-button", { class: "neutral text-color", onClick: ev => this.onChangeMode('view') },
                                    h("yoo-icon", { slot: "icon-only", class: "yo-eye" }))),
                            h("yoo-tooltip", { placement: "bottom", content: translate('COPYTOCLIPBARD') },
                                h("yoo-ion-button", { class: "neutral text-color", ref: el => this.copyButtonEl = el },
                                    h("yoo-icon", { slot: "icon-only", class: "yo-duplicate" }))))))),
            h("div", { class: "container", ref: el => this.containerEl = el })
        ];
    }
    renderReadonly() {
        return this.renderBase();
    }
    renderEditable() {
        return this.renderBase();
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-json"; }
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
            "attr": "required",
            "watchCallbacks": ["requiredWatch"]
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
    static get style() { return "/**style-placeholder:yoo-form-json:**/"; }
}

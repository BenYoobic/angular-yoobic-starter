import { querySelectorDeep, setValidator, onInputBlurred, setValueAndValidateInput, onInputFocused, getAppContext, translate } from '../../../utils';
const LINE_HEIGHT = 16;
export class YooFormTextAreaComponent {
    constructor() {
        this.validators = [];
        this.initialRows = 4;
        this.resizable = 'both';
        this.disableEnter = false;
        this.validateInput = true;
    }
    setFocus() {
        let textArea = querySelectorDeep(this.host, 'textarea');
        if (textArea) {
            textArea.focus();
        }
    }
    clear() {
        this.value = null;
        this.rows = this.initialRows;
    }
    componentWillLoad() {
        setValidator(this);
        this.rows = this.initialRows;
    }
    componentDidLoad() {
        if (this.resizable !== 'both') {
            let textArea = querySelectorDeep(this.host, 'textarea');
            textArea.setAttribute('style', `resize: ${this.resizable};`);
        }
    }
    componentDidUpdate() {
        this.updateRows();
    }
    // tslint:disable-next-line:member-ordering
    onInputChanged(ev) {
        let value = querySelectorDeep(this.host, 'textarea').value; //ev.target.value;
        if (this.maxRows) {
            this.updateRows();
        }
        setValueAndValidateInput(value, this, null, this.validateInput);
    }
    updateRows() {
        let textArea = querySelectorDeep(this.host, 'textarea');
        textArea.style.height = 'auto';
        let height = textArea.scrollHeight - LINE_HEIGHT;
        if (this.maxRows && height / LINE_HEIGHT > this.maxRows) {
            height = (this.maxRows * LINE_HEIGHT);
        }
        textArea.style.height = (height) + 'px';
    }
    onKeyPress(ev) {
        if (ev.key === 'Enter' && !ev.shiftKey) {
            if (this.disableEnter) {
                ev.preventDefault();
            }
            this.enterPressed.emit(true);
        }
        if (ev.key === 'Tab') {
            this.tabPressed.emit(true);
        }
    }
    renderEditable() {
        return (h("div", { class: "outer-container" },
            h("textarea", { value: this.value, onClick: ev => ev.preventDefault(), contenteditable: "true", placeholder: translate(this.placeholder), readonly: this.readonly, rows: this.rows, onBlur: ev => onInputBlurred(ev, this, 'textarea'), onInput: ev => this.onInputChanged(ev), onFocus: ev => onInputFocused(ev, this, 'textarea'), onKeyPress: ev => this.onKeyPress(ev) })));
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.value);
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext(true))
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-text-area"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "clear": {
            "method": true
        },
        "disableEnter": {
            "type": Boolean,
            "attr": "disable-enter"
        },
        "host": {
            "elementRef": true
        },
        "initialRows": {
            "type": Number,
            "attr": "initial-rows"
        },
        "maxRows": {
            "type": Number,
            "attr": "max-rows"
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
        "resizable": {
            "type": String,
            "attr": "resizable"
        },
        "rows": {
            "state": true
        },
        "setFocus": {
            "method": true
        },
        "validateInput": {
            "type": Boolean,
            "attr": "validate-input"
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
        }, {
            "name": "enterPressed",
            "method": "enterPressed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "tabPressed",
            "method": "tabPressed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-text-area:**/"; }
}

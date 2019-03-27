export class YooFormRadioComponent {
    constructor() {
        this.state = 'unchecked';
    }
    onRadioCheck() {
        if (this.state === 'unchecked') {
            this.state = 'checked';
        }
        else if (this.state === 'checked') {
            this.state = 'unchecked';
        }
        this.radioClicked.emit(this.state);
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.disabled ?
                h("div", { class: this.state === 'unchecked' ? 'icon-container empty disabled' : 'icon-container disabled' },
                    h("div", { class: this.state === 'unchecked' ? 'icon empty' : 'icon disabled' }))
                :
                    h("div", { class: this.state === 'unchecked' ? 'icon-container empty enabled' : 'icon-container enabled', onClick: () => this.onRadioCheck() },
                        h("div", { class: this.state === 'unchecked' ? 'icon empty' : 'icon' },
                            h("yoo-icon", { class: "yo-check" }))),
            this.disabled ?
                h("div", { class: "text-container disabled" }, this.text) :
                h("div", { class: "text-container enabled", onClick: () => this.onRadioCheck() }, this.text)));
    }
    static get is() { return "yoo-form-radio"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "host": {
            "elementRef": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "state": {
            "type": String,
            "attr": "state",
            "mutable": true
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "radioClicked",
            "method": "radioClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-radio:**/"; }
}

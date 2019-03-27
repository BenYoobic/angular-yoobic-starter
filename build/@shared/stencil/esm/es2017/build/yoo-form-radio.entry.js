import { h } from '../design-system.core.js';

class YooFormRadioComponent {
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
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  :host .outer-container .icon-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    border: 0.0625rem solid;\n    border-radius: 1rem; }\n    :host .outer-container .icon-container.enabled {\n      background-color: var(--light, #FFFFFF); }\n      :host .outer-container .icon-container.enabled:hover {\n        cursor: pointer; }\n    :host .outer-container .icon-container.disabled {\n      border-color: var(--stable-30, #E6E6E6); }\n    :host .outer-container .icon-container.empty.enabled {\n      border-color: var(--stable, #adadad);\n      background-color: var(--light, #FFFFFF); }\n      :host .outer-container .icon-container.empty.enabled:hover {\n        cursor: pointer; }\n    :host .outer-container .icon-container.empty.disabled {\n      border-color: var(--stable-30, #E6E6E6);\n      background-color: var(--light, #FFFFFF); }\n    :host .outer-container .icon-container .icon {\n      width: 0.375rem;\n      height: 0.375rem;\n      -webkit-transition: all 0.3s;\n      transition: all 0.3s;\n      border-radius: 0.1875rem;\n      background: var(--dark-40, #9cabc4); }\n      :host .outer-container .icon-container .icon.disabled {\n        background: var(--stable-30, #E6E6E6); }\n      :host .outer-container .icon-container .icon.empty {\n        opacity: 0; }\n  :host .outer-container .text-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    padding-left: 0.5rem;\n    color: var(--dark, #2b3648);\n    font-size: var(--font-m, 15px); }\n    :host .outer-container .text-container.disabled {\n      color: var(--stable-30, #E6E6E6); }\n    :host .outer-container .text-container.enabled:hover {\n      cursor: pointer; }\n\n:host(.accent) .outer-container .icon-container.enabled {\n  border-color: var(--accent, #1FB6FF); }\n\n:host(.accent) .outer-container .icon-container .icon {\n  background: var(--accent, #1FB6FF); }\n\n:host(.accent) .outer-container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.danger) .outer-container .icon-container.enabled {\n  border-color: var(--danger, #ff625f); }\n\n:host(.danger) .outer-container .icon-container .icon {\n  background: var(--danger, #ff625f); }\n\n:host(.danger) .outer-container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.success) .outer-container .icon-container.enabled {\n  border-color: var(--success, #04CC99); }\n\n:host(.success) .outer-container .icon-container .icon {\n  background: var(--success, #04CC99); }\n\n:host(.success) .outer-container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.info) .outer-container .icon-container.enabled {\n  border-color: var(--info, #fc459e); }\n\n:host(.info) .outer-container .icon-container .icon {\n  background: var(--info, #fc459e); }\n\n:host(.info) .outer-container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.warning) .outer-container .icon-container.enabled {\n  border-color: var(--warning, #ff6402); }\n\n:host(.warning) .outer-container .icon-container .icon {\n  background: var(--warning, #ff6402); }\n\n:host(.warning) .outer-container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.dark) .outer-container .icon-container.enabled {\n  border-color: var(--stable-30, #E6E6E6); }\n\n:host(.dark) .outer-container .icon-container .icon {\n  background: var(--stable-30, #E6E6E6); }\n\n:host(.dark) .outer-container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.stable) .outer-container .text-container {\n  color: var(--stable, #adadad); }\n  :host(.stable) .outer-container .text-container.disabled {\n    color: var(--stable-30, #E6E6E6); }\n\n:host(.stable) .outer-container .icon-container.disabled {\n  border-color: var(--stable-30, #E6E6E6); }\n\n:host(.stable) .outer-container .icon-container.empty.enabled {\n  border-color: var(--stable, #adadad); }\n\n:host(.stable) .outer-container .icon-container.empty.disabled {\n  border-color: var(--stable-30, #E6E6E6);\n  background-color: var(--light, #FFFFFF); }\n\n:host(.stable) .outer-container .icon-container .icon {\n  width: 100%;\n  height: 100%;\n  border-radius: 40%;\n  color: var(--light, #FFFFFF); }\n  :host(.stable) .outer-container .icon-container .icon.disabled {\n    background-color: var(--stable-30, #E6E6E6); }"; }
}

export { YooFormRadioComponent as YooFormRadio };

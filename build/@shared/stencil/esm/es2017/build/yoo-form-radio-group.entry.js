import { h } from '../design-system.core.js';

class YooFormRadioGroupComponent {
    constructor() {
        this.values = [];
        this.multiple = false;
        this.items = [];
    }
    componentWillLoad() {
        this.items = this.values;
    }
    radioReset() {
        this.items = this.items.map((item) => {
            return { text: item.text, checked: false };
        });
    }
    calculateRadioSelection(index) {
        if (this.multiple) {
            this.items[index].checked = !this.items[index].checked;
        }
        else {
            let alreadyChecked = this.items[index].checked;
            this.radioReset();
            this.items[index].checked = !alreadyChecked;
        }
    }
    onRadioClicked(index) {
        this.calculateRadioSelection(index);
        this.selectionChanged.emit(this.items);
    }
    render() {
        return (h("div", { class: "outer-container" }, this.items.map((obj, index) => h("div", { class: "inner-container" },
            h("yoo-form-radio", { text: obj.text, class: this.host.className, state: obj.checked ? 'checked' : 'unchecked', onRadioClicked: () => this.onRadioClicked(index) })))));
    }
    static get is() { return "yoo-form-radio-group"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "items": {
            "state": true
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "selectionChanged",
            "method": "selectionChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column; }"; }
}

export { YooFormRadioGroupComponent as YooFormRadioGroup };

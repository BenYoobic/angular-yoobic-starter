import { translate } from '../../../utils';
export class YooEntitySearchRecentComponent {
    constructor() {
        this.header = 'RECENT';
    }
    setValues(values) {
        this.values = values;
    }
    componentWillLoad() {
        this.clearText = translate('CLEAR');
    }
    onClear() {
        this.clear.emit(true);
    }
    onSelect(ev, value) {
        ev.stopPropagation();
        this.select.emit(value);
    }
    renderLi(value) {
        return h("li", { class: "menu-item", onClick: ev => this.onSelect(ev, value) }, value);
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.header && this.values && this.values.length > 0 ?
                h("div", { class: "menu-title" },
                    h("div", { class: "title" }, this.header),
                    h("div", { class: "clear", onClick: () => this.onClear() }, this.clearText))
                : null,
            this.values && this.values.length > 0 ?
                h("ul", { class: "menu" }, this.values.map(value => {
                    return this.renderLi(value);
                }))
                : null));
    }
    static get is() { return "yoo-entity-search-recent"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "header": {
            "type": String,
            "attr": "header"
        },
        "host": {
            "elementRef": true
        },
        "setValues": {
            "method": true
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "clear",
            "method": "clear",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "select",
            "method": "select",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-entity-search-recent:**/"; }
}

import { translate } from '../../../utils';
export class YooEntitySearchSortsComponent {
    constructor() {
        this.header = 'SORTBY';
        this.values = [];
        this.sorts = [];
    }
    componentWillLoad() {
        this.sorts = this.values || [];
    }
    onUpdateValues() {
        this.sorts = this.values || [];
        this.host.forceUpdate();
    }
    getDir(name) {
        if (this.values) {
            for (let value of this.values) {
                if (name === value.colId) {
                    return value.sort;
                }
            }
        }
        return null;
    }
    getIcon(dir) {
        switch (dir) {
            case 'asc':
                return 'yo-up success';
            case 'desc':
                return 'yo-down success';
        }
        return 'yo-no-data';
    }
    changeDir(dir) {
        switch (dir) {
            case 'asc':
                return 'desc';
            case 'desc':
                return null;
            default:
                return 'asc';
        }
    }
    onSort(field) {
        let sort = this.sorts.find(s => s.colId === field.name);
        if (!sort) {
            sort = { colId: field.name, sort: field.invertedSort ? 'desc' : 'asc' };
            this.sorts.push(sort);
        }
        else {
            sort.sort = this.changeDir(sort.sort);
            if (!sort.sort) {
                this.sorts = this.sorts.filter(s => s.colId !== field.name);
            }
        }
        this.sorts = [...this.sorts];
        this.sort.emit(this.sorts);
    }
    hasSorts() {
        return this.fields && this.fields.some(s => s.sortable);
    }
    renderLi(field) {
        let index = this.sorts.findIndex(s => s.colId === field.name);
        let icon = index > -1 ? this.getIcon(this.sorts[index].sort) : null;
        if (!field.sortable) {
            return null;
        }
        return [h("li", { class: "menu-item", onClick: () => this.onSort(field) },
                h("div", { class: "text" }, translate(field.title || field.name.toUpperCase())),
                index > -1 ? h("yoo-badge", { class: "gradient-success", text: (index + 1).toString() }) : null,
                h("yoo-icon", { class: icon })),
            h("div", { class: "border" })
        ];
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.header && this.hasSorts() ?
                h("div", { class: "heading" }, translate(this.header))
                : null,
            this.fields ?
                h("ul", { class: "menu" }, this.fields.map(field => {
                    return this.renderLi(field);
                }))
                : null));
    }
    static get is() { return "yoo-entity-search-sorts"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "fields": {
            "type": "Any",
            "attr": "fields"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "host": {
            "elementRef": true
        },
        "sorts": {
            "state": true
        },
        "values": {
            "type": "Any",
            "attr": "values",
            "watchCallbacks": ["onUpdateValues"]
        }
    }; }
    static get events() { return [{
            "name": "sort",
            "method": "sort",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-entity-search-sorts:**/"; }
}

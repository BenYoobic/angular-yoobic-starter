import { FormFieldType } from '../../../interfaces';
import { translate, isNullOrUndefined } from '../../../utils';
import { compact, isObject } from 'lodash-es';
export class YooEntitySearchFiltersComponent {
    constructor() {
        this.header = 'FILTERBY';
        this.values = [];
        this.filters = [];
    }
    componentWillLoad() {
        this.filters = this.values || [];
    }
    onUpdateValues() {
        this.filters = this.values || [];
        this.host.forceUpdate();
    }
    getFieldFilterName(field) {
        return (field.filterName || field.name);
    }
    onAutocompleteChange(ev, field) {
        ev.stopPropagation();
        this.filters = this.filters.filter(f => f.fieldname !== this.getFieldFilterName(field));
        let values = compact([].concat(ev.detail[field.name]));
        if (values.length > 0) {
            this.filters.push({
                fieldname: this.getFieldFilterName(field),
                values: values,
                type: FormFieldType.autocomplete,
                handleUndefined: field.handleUndefined,
                subQuery: field.subQuery,
                isSubQuery: field.isSubQuery,
                collectionName: field.collectionName
            });
        }
        this.filter.emit(this.filters);
    }
    onSimpleFilter(ev, item, field, type) {
        ev.stopPropagation();
        let filters = this.filters || [];
        let found = false;
        let remove = false;
        let value;
        if (isObject(item) && item._id) {
            value = item._id;
        }
        else {
            value = item;
        }
        for (let filter of filters) {
            if (filter.fieldname === this.getFieldFilterName(field)) {
                found = true;
                let index = filter.values.indexOf(value);
                if (index > -1) {
                    filter.values.splice(index, 1);
                    remove = filter.values.length === 0;
                    break;
                }
                else {
                    filter.values.push(value);
                    break;
                }
            }
        }
        if (!found && !remove) {
            filters.push({ fieldname: this.getFieldFilterName(field), values: [value], type: type, handleUndefined: field.handleUndefined });
        }
        if (found && remove) {
            this.filters = this.filters.filter(f => f.fieldname !== this.getFieldFilterName(field));
        }
        this.filters = [...this.filters];
        this.filter.emit(this.filters);
    }
    onDateChange(ev, field) {
        ev.stopPropagation();
        this.filters = this.filters.filter(f => f.fieldname !== this.getFieldFilterName(field));
        let values = ev.detail;
        if (values && values.length > 0) {
            this.filters.push({ fieldname: this.getFieldFilterName(field), values: values, type: 'date' });
        }
        this.filter.emit(this.filters);
    }
    onNumberChange(ev, field) {
        ev.stopPropagation();
        this.filters = this.filters.filter(f => f.fieldname !== this.getFieldFilterName(field));
        let value = ev.detail;
        if (isObject(value)) {
            this.filters.push({ fieldname: this.getFieldFilterName(field), values: value, type: 'number' });
        }
        this.filter.emit(this.filters);
    }
    onFieldFetchData(ev, newField) {
        ev.stopPropagation();
        if (newField.form) {
            ev.detail.form = newField.form;
        }
        this.fieldFetchData.emit(ev.detail);
    }
    hasFilters() {
        return this.fields && this.fields.some(f => f.filterable && (f.type === FormFieldType.autocomplete || f.type === FormFieldType.date || f.type === FormFieldType.datetime || f.type === FormFieldType.checkbox || f.type === FormFieldType.toggle || f.type === FormFieldType.location || f.type === FormFieldType.catalog));
    }
    getDisplayValue(field, v) {
        if (v === true) {
            return translate('TRUE');
        }
        else if (v === false) {
            return translate('FALSE');
        }
        else if (field.handleUndefined && isNullOrUndefined(v)) {
            return translate('PENDING');
        }
        else if (isObject(v) && v._id && v.title) {
            return translate(v.title);
        }
        else {
            return translate(field.translate && v && v.toUpperCase ? v.toUpperCase() : (v ? v.toString() : ''));
        }
    }
    isChecked(item, field) {
        let value;
        if (isObject(item) && item._id) {
            value = item._id;
        }
        else {
            value = item;
        }
        for (let filter of this.filters) {
            if (filter.fieldname === this.getFieldFilterName(field)) {
                return (filter.values.indexOf(value) > -1);
            }
        }
        return false;
    }
    isFieldWithValues(field) {
        let types = [
            FormFieldType.autocomplete,
            FormFieldType.select,
            FormFieldType.selectbuttons,
            FormFieldType.selectbuttonsmulti,
            FormFieldType.selectchat
        ];
        return types.indexOf(field.type) >= 0 && field.values && field.values.length > 0;
    }
    isFieldWithNumber(field) {
        let types = [
            FormFieldType.starrating,
            FormFieldType.number,
            FormFieldType.numberpicker
        ];
        return types.indexOf(field.type) >= 0;
    }
    renderUl(field) {
        let name = field.name;
        if (field.filterable && this.isFieldWithValues(field)) {
            return h("div", { class: "filter-container" },
                h("div", { class: "menu-title" }, name ? h("div", { class: "title" }, translate(field.title || field.name.toUpperCase())) : null),
                h("ul", { class: "menu" }, field.values.map(v => {
                    return [h("li", { class: "menu-item", onClick: (ev) => this.onSimpleFilter(ev, v, field, 'autocomplete') },
                            h("div", { class: "menu-item-title" },
                                " ",
                                this.getDisplayValue(field, v),
                                " "),
                            h("yoo-form-checkbox", { value: this.isChecked(v, field) })),
                        h("div", { class: "border" })
                    ];
                })));
        }
        else if (field.filterable && (field.type === FormFieldType.checkbox || field.type === FormFieldType.toggle)) {
            return h("div", { class: "filter-container" },
                h("div", { class: "menu-title" }, name ? h("div", { class: "title" }, translate(field.title || field.name.toUpperCase())) : null),
                h("ul", { class: "menu" }, [true, false].map(v => {
                    return [h("li", { class: "menu-item", onClick: (ev) => this.onSimpleFilter(ev, v, field, 'checkbox') },
                            h("div", { class: "menu-item-title" },
                                " ",
                                this.getDisplayValue(field, v),
                                " "),
                            h("yoo-form-checkbox", { value: this.isChecked(v, field) })),
                        h("div", { class: "border" })
                    ];
                })));
        }
        else if (field.filterable && (field.type === FormFieldType.autocomplete && field.collectionName) || (field.type === FormFieldType.location) || (field.type === FormFieldType.catalog)) {
            let newField = Object.assign({}, field, { name: this.getFieldFilterName(field), multiple: true, required: false, clearable: true });
            delete newField.advanced;
            delete newField.secondary;
            delete newField.visible;
            if (newField.title) {
                delete newField.description;
            }
            let slides = [{ title: 'GENERAL', items: [newField] }];
            let filter = this.filters.find(f => f.fieldname === this.getFieldFilterName(field));
            let data = {};
            if (filter) {
                data[this.getFieldFilterName(field)] = filter.values;
            }
            let retVal = [h("yoo-form-dynamic", { class: "inline margin-top", ref: el => newField.form = el, animated: false, showRecap: false, slides: slides, data: data, hideOptional: true, onDataChanged: ev => this.onAutocompleteChange(ev, newField), onFieldFetchData: ev => this.onFieldFetchData(ev, newField) })];
            return retVal;
        }
        else if (field.filterable && (field.type === FormFieldType.date || field.type === FormFieldType.datetime)) {
            let newField = Object.assign({}, field, { name: this.getFieldFilterName(field), required: false, clearable: true });
            let filter = this.filters.find(f => f.fieldname === this.getFieldFilterName(field));
            let value = null;
            if (filter) {
                value = filter.values;
            }
            return h("yoo-form-input-container", { field: newField, hideOptional: true },
                h("yoo-form-date-time", { onInputChanged: ev => this.onDateChange(ev, newField), isRange: true, clearable: true, value: value }));
        }
        else if (field.filterable && this.isFieldWithNumber(field)) {
            let newField = Object.assign({}, field, { name: this.getFieldFilterName(field), required: false, clearable: true });
            let slides = [{
                    title: 'GENERAL', items: [
                        { name: 'min', type: FormFieldType.number, flex: 50 },
                        { name: 'max', type: FormFieldType.number, flex: 50 } //field.type
                    ]
                }];
            let filter = this.filters.find(f => f.fieldname === this.getFieldFilterName(field));
            let data = {};
            if (filter) {
                data = filter.values;
            }
            let retVal = h("yoo-form-input-container", { field: newField, hideOptional: true },
                h("yoo-form-dynamic", { class: "inline flex", animated: false, showRecap: false, slides: slides, data: data, hideOptional: true, onDataChanged: ev => this.onNumberChange(ev, field) }));
            return retVal;
        }
        return null;
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.header && this.hasFilters() ?
                h("div", { class: "heading" }, translate(this.header))
                : null,
            this.fields ?
                this.fields.map(field => {
                    return this.renderUl(field);
                })
                : null));
    }
    static get is() { return "yoo-entity-search-filters"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "fields": {
            "type": "Any",
            "attr": "fields"
        },
        "filters": {
            "state": true
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "host": {
            "elementRef": true
        },
        "values": {
            "type": "Any",
            "attr": "values",
            "watchCallbacks": ["onUpdateValues"]
        }
    }; }
    static get events() { return [{
            "name": "filter",
            "method": "filter",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fieldFetchData",
            "method": "fieldFetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-entity-search-filters:**/"; }
}

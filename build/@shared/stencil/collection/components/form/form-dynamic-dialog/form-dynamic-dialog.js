import { translate, closeModal, querySelectorDeep } from '../../../utils';
export class YooFormDynamicModalComponent {
    constructor() {
        this.validity = false;
    }
    componentWillLoad() {
        this.currentData = this.data || {};
    }
    onCancel() {
        closeModal(null);
    }
    onSave() {
        if (this.validity) {
            closeModal(this.currentData);
        }
    }
    //@Listen('dataChanged')
    onDataChanged(ev) {
        ev.stopPropagation();
        this.currentData = ev.detail;
    }
    //@Listen('fieldFetchData')
    onInternalFieldFetchData(ev) {
        ev.stopPropagation();
        if (this.onFieldFetchData) {
            this.onFieldFetchData(Object.assign({}, ev.detail, { form: querySelectorDeep(this.host, 'yoo-form-dynamic') }));
        }
    }
    onValidityChanged(ev) {
        ev.stopPropagation();
        this.validity = ev.detail;
    }
    render() {
        return [
            h("yoo-ion-header", { class: "shadow", "no-border": true },
                h("yoo-ion-toolbar", { color: "light" },
                    h("yoo-ion-buttons", { slot: "start" },
                        h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                            h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                    h("yoo-ion-title", null, this.header ? this.header : translate('ADVANCED')),
                    h("yoo-ion-buttons", { slot: "end", onClick: () => this.onSave() },
                        h("yoo-ion-button", { color: "success", class: "button-clear", disabled: !this.validity }, translate('SAVE'))))),
            h("yoo-ion-content", { class: "flex", forceOverscroll: false, scrollEnabled: false },
                h("yoo-form-dynamic", { slides: this.slides, data: this.data, showRecap: this.showRecap, suffix: this.suffix, forceReadonly: this.forceReadonly, onDataChanged: (ev) => this.onDataChanged(ev), onFormValidityChanged: (ev) => this.onValidityChanged(ev), onFieldFetchData: (ev) => this.onInternalFieldFetchData(ev) }))
        ];
    }
    static get is() { return "yoo-form-dynamic-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "currentData": {
            "state": true
        },
        "data": {
            "type": "Any",
            "attr": "data"
        },
        "forceReadonly": {
            "type": Boolean,
            "attr": "force-readonly"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "host": {
            "elementRef": true
        },
        "onFieldFetchData": {
            "type": "Any",
            "attr": "on-field-fetch-data"
        },
        "showRecap": {
            "type": Boolean,
            "attr": "show-recap"
        },
        "showTabs": {
            "type": Boolean,
            "attr": "show-tabs"
        },
        "slides": {
            "type": "Any",
            "attr": "slides"
        },
        "suffix": {
            "type": String,
            "attr": "suffix"
        },
        "validity": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-form-dynamic-dialog:**/"; }
}

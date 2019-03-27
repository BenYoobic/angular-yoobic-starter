import { closeModal, translate, showAlert, hideShowTabbar } from '../../../utils';
export class YooEntitySearchDialogComponent {
    constructor() {
        this.isTabbarHidden = false;
    }
    onHideTabbar(ev) {
        this.isTabbarHidden = hideShowTabbar(ev, this.footer, this.isTabbarHidden);
    }
    componentWillLoad() {
        if (this.values) {
            this.sorts = this.values.sorts;
            this.filters = this.values.filters;
            if ((this.sorts && this.sorts.length > 0) || (this.filters && this.filters.length > 0)) {
                this.isDirty = true;
            }
        }
    }
    onCancel() {
        closeModal(null);
    }
    onApply() {
        closeModal({ sorts: this.sorts, filters: this.filters });
    }
    onClearAll() {
        if (this.isDirty) {
            let message = translate('DELETEALLFILTERS');
            showAlert(translate('DELETE'), [translate('CANCEL'), translate('OK')], null, message).then(ret => {
                if (ret === true) {
                    this.values = { filters: [], sorts: [] };
                    this.sorts = [];
                    this.filters = [];
                    this.isDirty = false;
                }
            });
        }
    }
    onSort(ev) {
        this.sorts = ev.detail;
        if (this.sorts && this.sorts.length > 0) {
            this.isDirty = true;
        }
    }
    onFilter(ev) {
        this.filters = ev.detail;
        if (this.filters && this.filters.length > 0) {
            this.isDirty = true;
        }
    }
    onFieldFetchData(ev) {
        ev.stopPropagation();
        this.fieldFetchData.emit(ev.detail);
    }
    render() {
        return [
            h("yoo-ion-header", { class: "shadow", "no-border": true },
                h("yoo-ion-toolbar", { color: "light" },
                    h("yoo-ion-buttons", { slot: "start" },
                        h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                            h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                    h("yoo-ion-title", null, translate('ADVANCEDFILTERS')),
                    h("yoo-ion-buttons", { slot: "end" },
                        h("yoo-ion-button", { color: "success", class: "button-clear", disabled: !this.isDirty, onClick: () => this.onClearAll() }, translate('CLEARALL'))))),
            h("yoo-ion-content", { scrollEnabled: true, scrollEvents: true },
                h("div", null,
                    h("yoo-entity-search-sorts", { fields: this.model.fields, values: this.values ? this.values.sorts : null, onSort: (ev) => this.onSort(ev) }),
                    h("yoo-entity-search-filters", { fields: this.model.fields, values: this.values ? this.values.filters : null, onFilter: (ev) => this.onFilter(ev), onFieldFetchData: ev => this.onFieldFetchData(ev) }),
                    h("div", { class: "spacer" }))),
            h("yoo-form-footer", { buttons: [{ text: translate('APPLY'), cssClass: 'gradient-success', handler: () => this.onApply() }], ref: el => this.footer = el })
        ];
    }
    static get is() { return "yoo-entity-search-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "isDirty": {
            "state": true
        },
        "model": {
            "type": "Any",
            "attr": "model"
        },
        "values": {
            "type": "Any",
            "attr": "values",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "fieldFetchData",
            "method": "fieldFetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "hideTabbar",
            "method": "onHideTabbar"
        }]; }
    static get style() { return "/**style-placeholder:yoo-entity-search-dialog:**/"; }
}

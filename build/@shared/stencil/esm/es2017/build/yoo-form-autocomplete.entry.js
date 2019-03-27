import { h } from '../design-system.core.js';

import { a6 as debounce, aj as isArray, ae as isNullOrUndefined, aQ as setValueAndValidateInput, ad as isIonic, aN as setValidator, a7 as findParent, bF as getFormBottomPosition, W as isWeb, a_ as showModal, ay as showAlert, m as translate, bG as convertItem, $ as execHandlerAndStopEvent, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

const AUTOCOMPLETE_DROPDOWN_HEIGHT = 268;
const OPACITY_ANIMATION_TIME = 200;
class YooFormAutocompleteComponent {
    constructor() {
        this.multiple = false;
        this.hideSelectionFromInput = false;
        this.displayType = 'card-list';
        this.values = [];
        this.pageSize = 20;
        this.selection = [];
        this.showFormInput = false;
        this.showEmptyItemsAddNewTag = false;
        this.emitFetchData = debounce((ev) => {
            this.fetchData.emit({ search: ev.detail, appendData: false, currentPage: 0, pageSize: this.pageSize });
        });
        this.localValues = [];
    }
    onValueChange() {
        this.updateSelection();
    }
    updateValues(values, forceOpen) {
        this.values = values;
        if (this.dialog) {
            this.dialog.values = this.dialog.isLoading && this.isLocal ? this.localValues : values;
            this.dialog.value = this.hideSelectionFromInput ? null : this.value;
            this.dialog.isLoading = false;
        }
        else if (forceOpen) {
            this.onInputFocused();
        }
    }
    setValue(value) {
        if (!isArray(value) && this.multiple && this.max === 1) {
            if (isNullOrUndefined(value)) {
                value = [];
            }
            else {
                value = [value];
            }
        }
        setValueAndValidateInput(value, this);
        this.selection = value;
        if (!this.isMultiple()) {
            this.selection = [value];
            this.hideContainer();
        }
    }
    hideContainer() {
        if (!isIonic() && (this.itemsContainer && this.itemsContainer.classList.contains('show-display')) || this.showFormInput) {
            if (this.webGrid && this.webGrid.forceAddNewTag) {
                this.webGrid.forceAddNewTag = false;
            }
            if (!this.hostClick) {
                this.removeAddItemContainerClasses(true);
                this.showFormInput = false;
                if (this.formDynamic) {
                    this.formDynamic.setScrollSpacerHeight(100);
                }
                if (this.showEmptyItemsAddNewTag) {
                    this.showEmptyItemsAddNewTag = false;
                }
            }
            else {
                this.hostClick = false;
            }
        }
    }
    clear(emitEvent = false) {
        this.selection = null;
        if (emitEvent) {
            this.setValue(this.selection);
        }
    }
    componentWillLoad() {
        this.updateSelection();
        setValidator(this);
        if (this.values && this.values.length > 0 && this.isLocal !== false) {
            this.isLocal = true;
            this.localValues = this.values;
        }
        else if (this.isLocal !== true) {
            this.isLocal = false;
        }
    }
    componentDidLoad() {
        this.formDynamic = findParent(this.host);
        this.hostClickListener = () => this.hostClick = true;
        this.hideContainerListener = () => this.hideContainer();
        if (this.formDynamic) {
            this.formDynamicBottom = getFormBottomPosition(this.formDynamic);
            this.formDynamic.addEventListener('click', this.hideContainerListener);
        }
        this.host.addEventListener('click', this.hostClickListener);
    }
    componentDidUpdate() {
        if (this.showFormInput && !isNullOrUndefined(this.searchInput)) {
            this.searchInput.setFocus();
            if (this.itemsContainer && this.inputContainer) {
                const PADDING = 10;
                this.itemsContainer.setAttribute('style', `top: ${this.inputContainer.clientHeight + PADDING}px;`);
            }
        }
    }
    componentDidUnload() {
        if (this.host) {
            this.host.removeEventListener('click', this.hostClickListener);
        }
        if (this.formDynamic) {
            this.formDynamic.removeEventListener('click', this.hideContainerListener);
        }
    }
    get dropdownOpenUp() {
        let inputBottom = this.host.getBoundingClientRect().bottom;
        return (inputBottom + AUTOCOMPLETE_DROPDOWN_HEIGHT > this.formDynamicBottom);
    }
    get scrollDistance() {
        let inputBottom = this.host.getBoundingClientRect().bottom;
        return ((inputBottom + AUTOCOMPLETE_DROPDOWN_HEIGHT) > this.formDynamicBottom) ? ((inputBottom + AUTOCOMPLETE_DROPDOWN_HEIGHT) - this.formDynamicBottom) : 0;
    }
    isMultiple() {
        return this.multiple && this.max !== 1;
    }
    onInputClear(ev) {
        ev.stopPropagation();
        this.clear(true);
    }
    updateSelection() {
        if (this.value) {
            this.selection = [].concat(this.value);
        }
        else {
            this.selection = [];
        }
    }
    onFetchData(ev) {
        ev.stopPropagation();
        this.currentGridSearch = ev.detail;
        this.refresh();
    }
    refresh() {
        if (this.currentGridSearch) {
            this.currentGridSearch.tags = this.currentSelectedTags;
        }
        this.fetchData.emit(this.currentGridSearch);
    }
    onInputFocused() {
        this.inputFocused.emit();
        isIonic() ? this.showContainerDialog() : this.showContainer();
    }
    onSearchInputChanged(ev, clear = false) {
        if (ev) {
            this.searchText = ev.detail;
            if (this.searchText && !this.showEmptyItemsAddNewTag) {
                this.showEmptyItemsAddNewTag = true;
            }
            else if (!this.searchText && this.showEmptyItemsAddNewTag) {
                this.showEmptyItemsAddNewTag = false;
            }
        }
        if (!clear) {
            ev.stopPropagation();
        }
        if (this.allowCustomTag && isWeb() && this.searchText && this.webGrid) {
            const MINIMUM_VALUES_TO_SHOW_ADD_NEW_TAG = 4;
            this.webGrid.forceAddNewTag = this.values && this.values.length < MINIMUM_VALUES_TO_SHOW_ADD_NEW_TAG;
        }
        this.emitFetchData(ev);
    }
    showContainer() {
        if (this.itemsContainer) {
            if (this.itemsContainer.classList.contains('show-display')) {
                this.removeAddItemContainerClasses(true);
            }
            else {
                this.removeAddItemContainerClasses(false);
            }
            if (this.scrollDistance !== 0 && this.formDynamic) {
                this.formDynamic.scrollToPoint(this.scrollDistance);
            }
        }
        if (this.showFormInput && this.showEmptyItemsAddNewTag) {
            this.showEmptyItemsAddNewTag = false;
        }
        else if (!this.showFormInput && !this.showEmptyItemsAddNewTag && this.searchText && this.searchText.length > 0) {
            this.showEmptyItemsAddNewTag = true;
        }
        this.showFormInput = !this.showFormInput;
    }
    showContainerDialog() {
        this.dialog = document.createElement('yoo-form-autocomplete-dialog');
        this.dialog.multiple = this.isMultiple();
        this.dialog.displayType = this.displayType;
        this.dialog.entityType = this.allowCustomTag || this.tag ? 'tag' : this.entityType;
        this.dialog.originalEntityType = this.entityType;
        this.dialog.isLocal = this.isLocal;
        this.dialog.useTranslate = this.useTranslate;
        this.dialog.allowCustomTag = this.allowCustomTag;
        this.dialog.idOnly = this.idOnly;
        this.dialog.idAttributeName = this.idAttributeName;
        this.dialog.emptyState = this.emptyState || this.entityType;
        this.dialog.tags = this.tags;
        this.dialog.tag = this.tag;
        this.dialog.hideTags = this.hideTags;
        this.dialog.customModel = this.customModel;
        if (this.isLocal) {
            this.dialog.values = this.localValues;
            this.dialog.value = this.hideSelectionFromInput ? null : this.value;
            this.dialog.isLoading = false;
        }
        this.dialog.addEventListener('fetchData', (ev) => {
            ev.stopPropagation();
            this.onFetchData(ev);
        });
        this.dialog.addEventListener('tagsSelect', (ev) => {
            ev.stopPropagation();
            this.onTagsSelect(ev);
        });
        showModal(this.dialog, { half: true }, null, 'slideYEnterAnimation', 'slideYLeaveAnimation', true).then(ret => {
            if (ret && !ret.overlayDismiss) {
                this.setValue(ret.data);
            }
            this.dialog = null;
        });
    }
    onItemSelect(ev) {
        ev.stopPropagation();
        this.setValue(ev.detail);
    }
    onCustomTagCreated(ev) {
        if (this.allowCustomTag || this.tag) {
            showAlert(translate('NEWTAGFOUND'), [translate('CANCEL'), translate('ADD')], `"${ev.detail}" ${translate('NEWTAGFOUNDDESCRIPTION')}`).then(ret => {
                if (ret === true) {
                    const newItem = convertItem(ev.detail);
                    this.selection = [...(this.selection || []), newItem];
                }
            });
        }
    }
    onSelectionRemoved(selection) {
        this.selection = this.selection.filter(a => a !== selection);
        this.setValue(this.selection);
    }
    onTagsSelect(ev) {
        ev.stopPropagation();
        this.currentSelectedTags = ev.detail;
        if (this.currentGridSearch) {
            this.currentGridSearch.appendData = false;
            this.refresh();
        }
    }
    onSearchInputBlurred(ev) {
        ev.preventDefault();
    }
    onEnterOrTabPresed(ev) {
        if (this.allowCustomTag) {
            this.addNewTag();
        }
    }
    removeAddItemContainerClasses(remove) {
        if (remove && this.itemsContainer) {
            this.itemsContainer.classList.remove('show-opacity');
            setTimeout(() => {
                this.itemsContainer.classList.remove('show-display');
            }, OPACITY_ANIMATION_TIME);
        }
        else if (this.itemsContainer) {
            this.itemsContainer.classList.add('show-display');
            setTimeout(() => {
                this.itemsContainer.classList.add('show-opacity');
            }, OPACITY_ANIMATION_TIME);
        }
    }
    addNewTag() {
        if (this.multiple) {
            if (this.value) {
                if (this.value.indexOf(this.searchText) === -1) {
                    this.value = [...(this.value), this.searchText];
                }
            }
            else {
                this.value = [this.searchText];
            }
        }
        else {
            this.value = this.searchText;
        }
        this.setValue(this.value);
    }
    renderSelectedContent() {
        let iconPrefix;
        if (this.tag) {
            iconPrefix = 'tag';
        }
        else if (this.entityType === 'users' || this.entityType === 'user') {
            iconPrefix = 'user';
        }
        else if (this.entityType === 'emails') {
            iconPrefix = 'email';
        }
        else if (this.entityType === 'catalogs' || this.entityType === 'products') {
            iconPrefix = 'catalogue';
        }
        else if (this.entityType === 'files') {
            iconPrefix = 'photo-library';
        }
        else if (this.entityType === 'locations') {
            iconPrefix = 'store';
        }
        else if (this.entityType === 'missiondescriptions') {
            iconPrefix = 'campaign';
        }
        else if (this.entityType === 'googlemaps') {
            iconPrefix = 'map';
        }
        else if (this.entityType === 'tenants') {
            iconPrefix = 'company';
        }
        else if (this.entityType === 'mediacapturedevices') {
            iconPrefix = 'camera';
        }
        else if (this.entityType === 'regex') {
            iconPrefix = 'barcode';
        }
        else if (this.iconPrefix) {
            iconPrefix = this.iconPrefix;
        }
        let hasValue = !isNullOrUndefined(this.value) && (!isArray(this.value) || this.value.length > 0);
        return (this.renderClickableSelectedContent(iconPrefix, hasValue, this.showFormInput));
    }
    renderFormInput() {
        return (h("div", { class: {
                'form-input-container': true,
                'active': this.showFormInput,
                'full-width': !this.multiple
            } },
            h("yoo-form-input", { ref: el => this.searchInput = el, class: { 'noborder': true, 'full-width': !this.multiple }, onInputChanged: (ev) => this.onSearchInputChanged(ev), onInputBlurred: (ev) => this.onSearchInputBlurred(ev), onEnterPressed: (ev) => this.onEnterOrTabPresed(ev), onTabPressed: (ev) => this.onEnterOrTabPresed(ev), clearable: !this.multiple, onClick: (ev) => ev.stopPropagation() })));
    }
    renderEntities() {
        return (h("div", { class: {
                'entity-container': true,
                'single': !this.isMultiple(),
                'placeholder': this.hideSelectionFromInput && (!this.selection || this.selection.length === 0) && !this.showFormInput,
                'active': this.showFormInput
            } },
            (!this.showFormInput || this.multiple) &&
                (this.selection && this.selection.length > 0 && !this.hideSelectionFromInput ?
                    (this.selection || []).map((selection) => h("yoo-entity", { class: "autocomplete", readonly: this.readonly, clearable: this.isMultiple(), columnDefinition: this.columnDefinition, useTranslate: this.useTranslate, customModel: this.customModel, displayType: this.isMultiple() ? 'card-tag' : 'card-tag-single', entityType: this.allowCustomTag || this.tag ? 'tag' : this.entityType, item: !this.isMultiple() && isArray(selection) ? selection[0] : selection, onClosed: (ev) => execHandlerAndStopEvent(ev, () => this.onSelectionRemoved(selection)), isCollapsible: false })) :
                    (!this.showFormInput && translate(this.placeholder))),
            isWeb() && this.renderFormInput()));
    }
    renderIconSuffixes(hasValue) {
        return (h("div", { class: { 'icon-container': true } },
            this.entityType === 'users' && this.isMultiple() && this.selection && this.selection.length ?
                h("div", { class: "icon-suffix" },
                    h("span", { class: "avatar-count" }, this.selection.length))
                : null,
            this.extraButtons ?
                this.extraButtons.map(e => {
                    return h("div", { class: "icon-suffix", onClick: (ev) => {
                            ev.stopPropagation();
                            e.handler();
                        } },
                        h("yoo-icon", { class: e.icon }));
                }) : null,
            hasValue && this.clearable && !this.isMultiple() ?
                h("div", { class: "icon-suffix-focus last icon-close", onClick: ev => this.onInputClear(ev) },
                    h("yoo-icon", { class: "yo-cross" }))
                : null,
            this.readonly || this.showFormInput ? null :
                h("div", { class: "icon-suffix" },
                    h("yoo-icon", { class: "yo-down" }))));
    }
    renderClickableSelectedContent(iconPrefix, hasValue, active = false) {
        return [
            iconPrefix && !this.readonly &&
                h("div", { class: "icon-container" },
                    h("div", { class: "icon-prefix" },
                        h("yoo-icon", { class: 'yo-' + iconPrefix })),
                    " "),
            this.renderEntities(),
            !active && this.renderIconSuffixes(hasValue)
        ];
    }
    renderAddNewTag() {
        return (this.showEmptyItemsAddNewTag &&
            h("div", { class: "empty-new-tag show" },
                h("div", { class: "text-container" }, translate('NEWTAGFOUNDDESCRIPTION')),
                h("yoo-button", { class: "gradient-success medium", text: translate('ADD'), onClick: () => this.addNewTag() })));
    }
    renderEditable() {
        return h("div", { class: "outer-container" },
            h("div", { ref: (el) => this.inputContainer = el, class: { 'action-click input-container': true, 'focused': this.showFormInput && isWeb() }, onClick: () => this.onInputFocused() }, this.renderSelectedContent()),
            this.values && !isIonic() &&
                ((this.allowCustomTag && this.isLocal && this.values.length === 0) ? this.renderAddNewTag() :
                    h("div", { ref: el => this.itemsContainer = el, class: "items-container down animated fadeIn" },
                        h("div", { class: "scroll-container" },
                            h("yoo-ion-scroll", { forceOverscroll: false, onClick: (ev) => ev.stopPropagation() },
                                h("yoo-grid", { ref: (el) => this.webGrid = el, class: "show-select-circles no-margin no-text-break", items: this.values, keepSelection: true, multiple: this.isMultiple(), displayType: this.displayType, displayModes: this.displayType === 'card-cell' ? ['card-cell', 'card-list'] : null, onSelect: (ev) => this.onItemSelect(ev), entityType: this.allowCustomTag || this.tag ? 'tag' : this.entityType, onSearchInputEnterPressed: (ev) => this.onCustomTagCreated(ev), onFetchData: (ev) => this.onFetchData(ev), hideHeader: false, hideFooter: true, isLocal: this.isLocal, useTranslate: this.useTranslate, initialSelection: this.value, idOnly: this.idOnly || this.allowCustomTag, idAttributeName: this.idAttributeName || '_id', emptyState: this.emptyState || this.entityType, allowCustomTag: this.allowCustomTag || this.tag, searchBarPlaceholder: this.allowCustomTag ? translate('SEARCHORADD') : translate('SEARCH'), tags: this.tags, hideAdvancedFilters: true, showFilters: !this.tag && !this.hideTags && !this.isLocal, onTagsSelect: (ev) => this.onTagsSelect(ev), isCollapsible: false, onAddNewTagPressed: () => this.addNewTag(), searchFieldOutsideComponent: true }))))));
    }
    renderReadonly() {
        if (this.selection.length > 0) {
            return h("div", { class: "readonly" },
                h("div", { class: 'entity-container ' + (this.isMultiple() ? '' : 'single') + (!this.hideSelectionFromInput && this.selection ? '' : ' placeholder') }, [].concat(this.selection).map((selected, index) => {
                    return [h("yoo-entity", { class: "autocomplete", columnDefinition: this.columnDefinition, readonly: true, clearable: false, useTranslate: this.useTranslate, customModel: this.customModel, displayType: this.isMultiple() ? 'card-tag' : 'card-tag-single', entityType: this.allowCustomTag || this.tag ? 'tag' : this.entityType, item: selected, isHistory: this.isHistory }),
                        index === (this.selection.length - 1) ? null : h("span", { class: "comma-separator" }, ",")
                    ];
                })));
        }
        return null;
    }
    renderHistory() {
        if (this.isMultiple()) {
            return this.renderReadonly();
        }
        return h("div", { class: "history-container" },
            h("yoo-text-truncate", { maxLine: 2, content: this.value && this.value.title ? this.value.title : '', hideMoreButton: true }, " "));
    }
    hostData() {
        return {
            class: Object.assign({ 'inline': this.inline }, getAppContext())
        };
    }
    render() {
        if (this.isHistory) {
            this.renderHistory();
        }
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-autocomplete"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowCustomTag": {
            "type": Boolean,
            "attr": "allow-custom-tag"
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "clear": {
            "method": true
        },
        "clearable": {
            "type": Boolean,
            "attr": "clearable"
        },
        "columnDefinition": {
            "type": "Any",
            "attr": "column-definition"
        },
        "customModel": {
            "type": "Any",
            "attr": "custom-model"
        },
        "displayType": {
            "type": String,
            "attr": "display-type"
        },
        "emptyState": {
            "type": String,
            "attr": "empty-state"
        },
        "entityType": {
            "type": String,
            "attr": "entity-type"
        },
        "extraButtons": {
            "type": "Any",
            "attr": "extra-buttons"
        },
        "hideContainer": {
            "method": true
        },
        "hideSelectionFromInput": {
            "type": Boolean,
            "attr": "hide-selection-from-input"
        },
        "hideTags": {
            "type": Boolean,
            "attr": "hide-tags"
        },
        "host": {
            "elementRef": true
        },
        "iconPrefix": {
            "type": String,
            "attr": "icon-prefix"
        },
        "idAttributeName": {
            "type": String,
            "attr": "id-attribute-name"
        },
        "idOnly": {
            "type": Boolean,
            "attr": "id-only"
        },
        "inline": {
            "type": Boolean,
            "attr": "inline"
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "isLocal": {
            "type": Boolean,
            "attr": "is-local",
            "mutable": true
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "pageSize": {
            "type": Number,
            "attr": "page-size",
            "mutable": true
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "selection": {
            "state": true
        },
        "setValue": {
            "method": true
        },
        "showEmptyItemsAddNewTag": {
            "state": true
        },
        "showFormInput": {
            "state": true
        },
        "tag": {
            "type": Boolean,
            "attr": "tag"
        },
        "tags": {
            "type": "Any",
            "attr": "tags"
        },
        "tagType": {
            "type": String,
            "attr": "tag-type"
        },
        "updateValues": {
            "method": true
        },
        "useTranslate": {
            "type": Boolean,
            "attr": "use-translate"
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
            "type": "Any",
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["onValueChange"]
        },
        "values": {
            "type": "Any",
            "attr": "values",
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
            "name": "fetchData",
            "method": "fetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container,\n:host .readonly {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n  :host .outer-container .comma-separator,\n  :host .readonly .comma-separator {\n    margin-right: 0.5rem;\n    margin-left: -0.5rem; }\n  :host .outer-container .input-container,\n  :host .readonly .input-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    width: 100%;\n    min-height: 2.5rem;\n    border: 1px solid var(--input-container-border-color, #E6E6E6);\n    border-radius: var(--border-radius-input, 5px); }\n    :host .outer-container .input-container.no-border,\n    :host .readonly .input-container.no-border {\n      border: none; }\n    :host .outer-container .input-container.focused,\n    :host .readonly .input-container.focused {\n      -ms-flex-pack: start;\n      justify-content: flex-start; }\n    :host .outer-container .input-container .icon-container,\n    :host .readonly .input-container .icon-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      min-width: 2rem;\n      color: var(--text-color, #807f83); }\n      :host .outer-container .input-container .icon-container .icon-prefix,\n      :host .outer-container .input-container .icon-container .icon-suffix,\n      :host .outer-container .input-container .icon-container .icon-suffix-focus,\n      :host .outer-container .input-container .icon-container .icon-close,\n      :host .readonly .input-container .icon-container .icon-prefix,\n      :host .readonly .input-container .icon-container .icon-suffix,\n      :host .readonly .input-container .icon-container .icon-suffix-focus,\n      :host .readonly .input-container .icon-container .icon-close {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-align: center;\n        align-items: center;\n        padding: 0.5rem 1rem;\n        color: var(--stable, #adadad);\n        font-size: var(--icon-m, 20px); }\n        :host .outer-container .input-container .icon-container .icon-prefix .yo-down,\n        :host .outer-container .input-container .icon-container .icon-prefix .yo-up,\n        :host .outer-container .input-container .icon-container .icon-suffix .yo-down,\n        :host .outer-container .input-container .icon-container .icon-suffix .yo-up,\n        :host .outer-container .input-container .icon-container .icon-suffix-focus .yo-down,\n        :host .outer-container .input-container .icon-container .icon-suffix-focus .yo-up,\n        :host .outer-container .input-container .icon-container .icon-close .yo-down,\n        :host .outer-container .input-container .icon-container .icon-close .yo-up,\n        :host .readonly .input-container .icon-container .icon-prefix .yo-down,\n        :host .readonly .input-container .icon-container .icon-prefix .yo-up,\n        :host .readonly .input-container .icon-container .icon-suffix .yo-down,\n        :host .readonly .input-container .icon-container .icon-suffix .yo-up,\n        :host .readonly .input-container .icon-container .icon-suffix-focus .yo-down,\n        :host .readonly .input-container .icon-container .icon-suffix-focus .yo-up,\n        :host .readonly .input-container .icon-container .icon-close .yo-down,\n        :host .readonly .input-container .icon-container .icon-close .yo-up {\n          margin: 0 0 0 -0.8rem;\n          font-size: var(--font-xs, 10px); }\n        :host .outer-container .input-container .icon-container .icon-prefix .yo-cross,\n        :host .outer-container .input-container .icon-container .icon-suffix .yo-cross,\n        :host .outer-container .input-container .icon-container .icon-suffix-focus .yo-cross,\n        :host .outer-container .input-container .icon-container .icon-close .yo-cross,\n        :host .readonly .input-container .icon-container .icon-prefix .yo-cross,\n        :host .readonly .input-container .icon-container .icon-suffix .yo-cross,\n        :host .readonly .input-container .icon-container .icon-suffix-focus .yo-cross,\n        :host .readonly .input-container .icon-container .icon-close .yo-cross {\n          margin: 0 0 0 -0.8rem; }\n      :host .outer-container .input-container .icon-container .icon-prefix,\n      :host .readonly .input-container .icon-container .icon-prefix {\n        border-right: 1px solid var(--input-container-border-color, #E6E6E6);\n        color: csscolor(stable); }\n      :host .outer-container .input-container .icon-container .icon-suffix .avatar-count,\n      :host .readonly .input-container .icon-container .icon-suffix .avatar-count {\n        position: absolute;\n        top: 50%;\n        -webkit-transform: translateY(-50%);\n        transform: translateY(-50%);\n        font-size: var(--font-m, 15px); }\n      :host .outer-container .input-container .icon-container .icon-suffix yoo-icon,\n      :host .readonly .input-container .icon-container .icon-suffix yoo-icon {\n        color: var(--control-icon-color, #adadad); }\n    :host .outer-container .input-container .form-input-container,\n    :host .readonly .input-container .form-input-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: start;\n      justify-content: flex-start; }\n  :host .outer-container .entity-container,\n  :host .readonly .entity-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex: 1;\n    flex: 1;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n    max-width: 100%;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    color: var(--text-color, #807f83);\n    font-size: var(--font-m, 15px); }\n    :host .outer-container .entity-container.placeholder,\n    :host .readonly .entity-container.placeholder {\n      padding-bottom: 0;\n      padding-left: var(--padding-15, 0.9375rem); }\n    :host .outer-container .entity-container yoo-entity,\n    :host .readonly .entity-container yoo-entity {\n      padding: 0.3125rem;\n      padding-left: 0;\n      background: transparent; }\n    :host .outer-container .entity-container.single,\n    :host .readonly .entity-container.single {\n      width: 100%; }\n      :host .outer-container .entity-container.single yoo-entity,\n      :host .readonly .entity-container.single yoo-entity {\n        width: 100%; }\n    :host .outer-container .entity-container.icon-border,\n    :host .readonly .entity-container.icon-border {\n      border-left: 1px solid var(--input-container-border-color, #E6E6E6); }\n    :host .outer-container .entity-container .form-input-container,\n    :host .readonly .entity-container .form-input-container {\n      display: none; }\n      :host .outer-container .entity-container .form-input-container.active,\n      :host .readonly .entity-container .form-input-container.active {\n        display: block; }\n      :host .outer-container .entity-container .form-input-container.full-width,\n      :host .readonly .entity-container .form-input-container.full-width {\n        width: 100%; }\n  :host .outer-container .items-container,\n  :host .outer-container .empty-new-tag,\n  :host .readonly .items-container,\n  :host .readonly .empty-new-tag {\n    display: none;\n    position: absolute !important;\n    top: 3rem;\n    left: 0;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: 100%;\n    height: 260px;\n    margin-bottom: 0.5rem;\n    -webkit-transition: 0.2s;\n    transition: 0.2s;\n    border: 1px solid var(--input-container-border-color, #E6E6E6);\n    border-radius: var(--border-radius-input, 5px);\n    background-color: var(--light, #FFFFFF);\n    -webkit-box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07));\n    box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07));\n    opacity: 0;\n    overflow: auto;\n    z-index: 3; }\n    :host .outer-container .items-container.show-display,\n    :host .outer-container .empty-new-tag.show-display,\n    :host .readonly .items-container.show-display,\n    :host .readonly .empty-new-tag.show-display {\n      display: -ms-flexbox;\n      display: flex; }\n    :host .outer-container .items-container.show-opacity,\n    :host .outer-container .empty-new-tag.show-opacity,\n    :host .readonly .items-container.show-opacity,\n    :host .readonly .empty-new-tag.show-opacity {\n      opacity: 1; }\n  :host .outer-container .empty-new-tag,\n  :host .readonly .empty-new-tag {\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n    :host .outer-container .empty-new-tag .text-container,\n    :host .readonly .empty-new-tag .text-container {\n      padding-bottom: var(--padding-15, 0.9375rem); }\n  :host .outer-container .items-container.extra,\n  :host .readonly .items-container.extra {\n    height: 200px; }\n  :host .outer-container .items-container .scroll-container,\n  :host .readonly .items-container .scroll-container {\n    position: relative;\n    height: 100%; }\n  :host .outer-container .items-container yoo-entity,\n  :host .readonly .items-container yoo-entity {\n    padding: 0.3125rem; }\n  :host .outer-container .extra-container,\n  :host .readonly .extra-container {\n    display: none;\n    position: absolute !important;\n    position: relative;\n    top: 2.625rem;\n    left: 0;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: 100%;\n    height: 260px;\n    margin-bottom: 0.5rem;\n    border: 1px solid var(--input-container-border-color, #E6E6E6);\n    border-radius: var(--border-radius-input, 5px);\n    -webkit-box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07));\n    box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07));\n    overflow: auto; }\n\n:host .readonly .entity-container {\n  padding-left: 0; }\n  :host .readonly .entity-container.single {\n    padding-left: 0; }\n  :host .readonly .entity-container yoo-entity {\n    padding: 0.3125rem 0; }\n\n:host(.map-locations) {\n  margin: 0 var(--padding-10, 0.625rem); }\n  :host(.map-locations) .outer-container .input-container {\n    background: var(--light, #FFFFFF); }\n\n:host(.history) {\n  border: none !important; }\n  :host(.history) .readonly .entity-container yoo-entity yoo-badge {\n    --inner-container-padding: 0; }\n\n:host(.inline) .outer-container {\n  padding-right: 2px; }\n\n:host(.web) .outer-container .input-container {\n  overflow: hidden; }"; }
}

export { YooFormAutocompleteComponent as YooFormAutocomplete };

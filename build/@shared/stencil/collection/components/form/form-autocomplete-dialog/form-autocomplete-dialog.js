import { showAlert, closeModal, querySelectorDeep, translate, isCordova, isIOS, getAppContext } from '../../../utils';
import { compact } from 'lodash-es';
const HEADER_HEIGHT = 44;
export class YooFormAutocompleteDialogComponent {
    constructor() {
        this.multiple = false;
        this.displayType = 'card-list';
        this.isLoading = true;
        this.values = [];
        this.fullscreen = false;
        this.dialogTitleMap = {
            defaults: ['SELECTITEM', 'SELECTITEMS', 'SELECTEDITEM', 'SELECTEDITEMS'],
            tags: ['SELECTTAG', 'SELECTTAGS', 'SELECTEDTAG', 'SELECTEDTAGS'],
            googlemaps: ['SELECTADDRESS', 'SELECTADDRESSES', 'SELECTEDADDRESS', 'SELECTEDADDRESSES'],
            users: ['SELECTUSER', 'SELECTUSERS', 'SELECTEDUSER', 'SELECTEDUSERS'],
            files: ['SELECTFILE', 'SELECTFILES', 'SELECTEDFILE', 'SELECTEDFILES'],
            products: ['SELECTPRODUCT', 'SELECTPRODUCTS', 'SELECTEDPRODUCT', 'SELECTEDPRODUCTS'],
            locations: ['SELECTSTORE', 'SELECTSTORES', 'SELECTEDSTORE', 'SELECTEDSTORES'],
            groups: ['SELECTGROUP', 'SELECTGROUPS', 'SELECTEDGROUP', 'SELECTEDGROUPS'],
            missiondescriptions: ['SELECTCAMPAIGN', 'SELECTCAMPAIGNS2', 'SELECTEDCAMPAIGN', 'SELECTEDCAMPAIGNS'],
            tenants: ['SELECTCOMPANY', 'SELECTCOMPANIES', 'SELECTEDCOMPANY', 'SELECTEDCOMPANIES'],
            emails: ['SELECTEMAIL', 'SELECTEMAILS', 'SELECTEDEMAIL', 'SELECTEDEMAILS'],
            catalogs: ['SELECTCATALOG', 'SELECTCATALOGS', 'SELECTEDCATALOG', 'SELECTEDCATALOGS'],
            memos: ['SELECTMEMO', 'SELECTMEMOS', 'SELECTEDMEMO', 'SELECTEDMEMOS']
        };
    }
    get fullScrollHeight() {
        let pageHeight = window.innerHeight;
        return pageHeight - HEADER_HEIGHT;
    }
    onValueChanged() {
        this.selection = this.value;
    }
    onSwipeUp() {
        this.swipedUp.emit(true);
        if (!this.fullscreen) {
            this.fullscreen = true;
        }
    }
    componentWillLoad() {
        if (this.openFullscreen) {
            this.fullscreen = true;
        }
    }
    componentDidLoad() {
        this.selection = compact([].concat(this.value || []));
        setTimeout(() => {
            if (this.grid) {
                this.grid.setAttribute('style', 'min-height:45px;');
            }
        }, 100);
    }
    onSwipeDown() {
        this.swipedDown.emit(true);
        if (this.fullscreen) {
            this.fullscreen = false;
        }
    }
    onCancel() {
        closeModal(this.value);
    }
    onSave() {
        closeModal(this.selection);
    }
    onItemSelect(ev) {
        ev.stopPropagation();
        if (ev.detail !== undefined) {
            this.selection = ev.detail;
        }
    }
    onFetchGridData(ev) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }
    getDialogTitle() {
        const SELECT_SINGULAR = 0;
        const SELECT_PLURAL = 1;
        const SELECTED_SINGULAR = 2;
        const SELECTED_PLURAL = 3;
        let translateParams = {};
        let entityType = this.originalEntityType || 'defaults';
        const titleArray = this.dialogTitleMap[entityType] || this.dialogTitleMap[entityType + 's'] || this.dialogTitleMap['defaults'];
        let titleBtf = titleArray[!this.multiple ? SELECT_SINGULAR : SELECT_PLURAL];
        let selection = compact([].concat(this.selection));
        if (selection && selection.length > 0) {
            if (selection.length === 1) {
                titleBtf = titleArray[SELECTED_SINGULAR];
            }
            else {
                titleBtf = titleArray[SELECTED_PLURAL];
                translateParams['n'] = selection.length;
            }
        }
        return translate(titleBtf, translateParams);
    }
    onCustomTagCreated(ev) {
        if (this.allowCustomTag || this.tag) {
            showAlert(translate('NEWTAGFOUND'), [translate('CANCEL'), translate('ADD')], `"${ev.detail}" ${translate('NEWTAGFOUNDDESCRIPTION')}`).then(ret => {
                if (ret === true) {
                    this.addNewTag(ev);
                }
            });
        }
    }
    addNewTag(ev) {
        const newItem = ev.detail; //convertItem()
        if (this.multiple) {
            if (this.selection && this.selection.indexOf(newItem) === -1) {
                this.selection = [...this.selection, newItem];
            }
            else if (!this.selection) {
                this.selection = [newItem];
            }
        }
        else {
            this.selection = newItem;
        }
        this.onSave();
    }
    onHeaderClick() {
        querySelectorDeep(this.host, 'yoo-ion-scroll').scrollToTop(200);
    }
    onTagsSelect(ev) {
        ev.stopPropagation();
        this.tagsSelect.emit(ev.detail);
    }
    onPullToRefresh() {
        if (this.refresher && this.grid) {
            this.grid.pullToRefresh(this.refresher);
        }
    }
    getTitleClassName() {
        if (this.fullscreen && isCordova() && isIOS()) {
            return '';
        }
        return 'autocomplete-half-screen';
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("yoo-swipe-container", { onSwipedUp: () => this.onSwipeUp(), onSwipedDown: () => this.onSwipeDown() },
                h("yoo-ion-toolbar", { color: "light", class: "autocomplete", halfScreen: !this.fullscreen },
                    h("yoo-ion-buttons", { slot: "start", halfScreen: !this.fullscreen },
                        h("yoo-ion-button", { class: "close button-clear", color: "dark", onClick: () => this.onCancel() },
                            h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                    h("yoo-ion-title", { class: this.getTitleClassName(), onClick: (ev) => this.onHeaderClick(), halfScreen: !this.fullscreen }, this.getDialogTitle()),
                    h("yoo-ion-buttons", { slot: "end", onClick: () => this.onSave(), halfScreen: !this.fullscreen },
                        h("yoo-ion-button", { color: "success", class: "button-clear" }, translate('DONE'))))),
            h("yoo-ion-content", { class: "bg-light", forceOverscroll: false },
                h("yoo-ion-refresher", { ref: el => this.refresher = el, slot: "fixed", onIonRefresh: ev => this.onPullToRefresh(), disabled: this.isLocal },
                    h("yoo-ion-refresher-content", { pullingText: translate('PULLTOREFRESH') }, " ")),
                h("yoo-grid", { ref: el => this.grid = el, class: 'show-select-circles relative-empty no-text-break' + (this.fullscreen ? '' : ' half'), items: this.values, keepSelection: true, multiple: this.multiple, displayType: this.displayType, displayModes: this.displayType === 'card-cell' ? ['card-cell', 'card-list'] : null, entityType: this.entityType, hideHeader: false, showSearch: true, hideFooter: true, customModel: this.customModel, isLocal: this.isLocal, useTranslate: this.useTranslate, initialSelection: this.value, onSelect: (ev) => this.onItemSelect(ev), onFetchData: (ev) => this.onFetchGridData(ev), allowCustomTag: this.allowCustomTag || this.tag, idOnly: this.idOnly || this.allowCustomTag || this.tag, idAttributeName: this.idAttributeName || '_id', onSearchInputEnterPressed: (ev) => this.onCustomTagCreated(ev), onAddNewTagPressed: (ev) => this.addNewTag(ev), searchBarPlaceholder: this.allowCustomTag || this.tag ? 'SEARCHORADD' : 'SEARCH', emptyState: this.emptyState, tags: this.tags, hideAdvancedFilters: true, showFilters: !this.tag && !this.hideTags && !this.isLocal, onTagsSelect: (ev) => this.onTagsSelect(ev), isCollapsible: false, isLoading: this.isLoading, clearTags: true }))));
    }
    static get is() { return "yoo-form-autocomplete-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowCustomTag": {
            "type": Boolean,
            "attr": "allow-custom-tag"
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
        "fullscreen": {
            "state": true
        },
        "hideTags": {
            "type": Boolean,
            "attr": "hide-tags"
        },
        "host": {
            "elementRef": true
        },
        "idAttributeName": {
            "type": String,
            "attr": "id-attribute-name"
        },
        "idOnly": {
            "type": Boolean,
            "attr": "id-only"
        },
        "isLoading": {
            "type": Boolean,
            "attr": "is-loading"
        },
        "isLocal": {
            "type": Boolean,
            "attr": "is-local"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "openFullscreen": {
            "type": Boolean,
            "attr": "open-fullscreen"
        },
        "originalEntityType": {
            "type": String,
            "attr": "original-entity-type"
        },
        "selection": {
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
        "useTranslate": {
            "type": Boolean,
            "attr": "use-translate"
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["onValueChanged"]
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "fetchData",
            "method": "fetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "tagsSelect",
            "method": "tagsSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "swipedUp",
            "method": "swipedUp",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "swipedDown",
            "method": "swipedDown",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "searchInputFocused",
            "method": "onSwipeUp"
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-autocomplete-dialog:**/"; }
}

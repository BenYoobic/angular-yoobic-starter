const h = window.DesignSystem.h;

import { L as querySelectorDeep, m as translate, a_ as showModal, W as isWeb } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooEntitySearchComponent {
    constructor() {
        this.isLoading = false;
    }
    updateData(data, request) {
        let tab = request.tab;
        let index = this.config.indexOf(tab);
        let grid = querySelectorDeep(this.host, '[attr-name=grid-' + index + ']');
        if (request.appendData) {
            grid.items = [...(grid.items || []), ...data];
        }
        else {
            grid.items = data;
        }
        this.isLoading = false;
    }
    upsertData(item, tabIndex) {
        let grid = querySelectorDeep(this.host, '[attr-name=grid-' + tabIndex + ']');
        if (grid.items) {
            let index = grid.items.findIndex(i => i._id === item._id);
            if (index >= 0) {
                grid.items[index] = Object.assign({}, item);
            }
            else {
                grid.items.unshift(item);
                grid.items = grid.items.slice();
            }
        }
    }
    removeData(item, tabIndex) {
        let grid = querySelectorDeep(this.host, '[attr-name=grid-' + tabIndex + ']');
        if (grid.items) {
            let index = grid.items.findIndex(i => i._id === item._id);
            if (index >= 0) {
                grid.items = [...grid.items.filter(i => {
                        return i._id !== item._id;
                    })];
            }
        }
    }
    componentWillLoad() {
        this.tabs = this.config.map(c => ({ title: c.title || translate(c.collectionName.toUpperCase()), value: c.id }));
        this.refreshers = {};
        this.grids = {};
    }
    componentDidLoad() {
        this.currentTagsSelected = {};
        this.currentSortsAndFilters = {};
    }
    onCancel() {
        this.cancel.emit(null);
    }
    refresh(gridSearch) {
        if (this.ionSlides) {
            this.ionSlides.getActiveIndex().then(index => {
                if (this.navBar && this.navBar.selectedTab) {
                    this.search.emit({
                        search: this.currentSearch,
                        tab: this.config[index],
                        tags: this.currentTagsSelected[this.navBar.selectedTab.value],
                        sortsAndFilters: this.currentSortsAndFilters[this.navBar.selectedTab.value],
                        currentPage: gridSearch ? gridSearch.currentPage : 0,
                        pageSize: gridSearch ? gridSearch.pageSize : 20,
                        appendData: gridSearch ? gridSearch.appendData : false,
                        infiniteScroll: gridSearch ? gridSearch.infiniteScroll : null
                    });
                }
                this.isLoading = true;
            });
        }
    }
    onGridFetchData(ev, tab) {
        this.refresh(ev.detail);
    }
    onGridPullToRefresh(tab) {
        let grid = this.grids[tab.id];
        let refresher = this.refreshers[tab.id];
        if (grid && refresher) {
            grid.pullToRefresh(refresher);
        }
    }
    onEntitySelect(ev, tab) {
        ev.stopPropagation();
        this.select.emit({ entity: ev.detail, tab });
    }
    onShowFilterAdvanced(model) {
        if (this.navBar && this.navBar.selectedTab) {
            let modal = document.createElement('yoo-entity-search-dialog');
            modal.model = model;
            modal.values = this.currentSortsAndFilters[this.navBar.selectedTab.value];
            let fieldFetchDataListener = (ev) => {
                ev.stopPropagation();
                this.fieldFetchData.emit(ev.detail);
            };
            modal.addEventListener('fieldFetchData', fieldFetchDataListener);
            showModal(modal).then(ret => {
                if (modal) {
                    modal.removeEventListener('fieldFetchData', fieldFetchDataListener);
                    modal = null;
                }
                if (ret && ret.data) {
                    this.currentSortsAndFilters[this.navBar.selectedTab.value] = ret.data;
                    this.refresh();
                }
            });
        }
    }
    onIonSlideDidChange(ev) {
        if (this.ionSlides && this.navBar) {
            this.ionSlides.getActiveIndex().then(index => {
                this.navBar.getActiveIndex().then(activeIndex => {
                    if (activeIndex !== index) {
                        this.navBar.setActive(index);
                    }
                    if (this.currentSearch) {
                        this.refresh();
                    }
                });
            });
        }
    }
    onTabSelected(ev) {
        if (this.ionSlides && this.navBar) {
            this.navBar.getActiveIndex().then(index => {
                return this.ionSlides.getActiveIndex().then(activeIndex => {
                    if (activeIndex !== index) {
                        this.ionSlides.slideTo(index, 200, true);
                    }
                });
            });
        }
    }
    onTagSelect(ev) {
        ev.stopPropagation();
        if (this.navBar && this.navBar.selectedTab && this.navBar.selectedTab.value) {
            this.currentTagsSelected[this.navBar.selectedTab.value] = ev.detail;
            this.refresh();
        }
    }
    onRecentSearchSelect(ev) {
        this.onInputChanged(ev);
    }
    onRecentClear(tab) {
        this.clearRecents.emit(tab);
    }
    onInputChanged(ev) {
        this.currentSearch = ev.detail;
        this.refresh();
    }
    renderHeader() {
        return (h("yoo-ion-header", { "no-border": true },
            h("yoo-ion-toolbar", { color: "light", centerTitle: false },
                h("yoo-form-input", { value: this.currentSearch, class: "search", "icon-prefix": "yo-search", onInputChanged: (ev) => this.onInputChanged(ev), placeholder: translate('SEARCH') }),
                h("yoo-ion-buttons", { slot: "end" },
                    h("yoo-ion-button", { class: {
                            'close': true,
                            'button-clear': true,
                            'text-color': isWeb()
                        }, onClick: () => this.onCancel() }, isWeb() ? h("yoo-icon", { class: "yo-close" }) : translate('CANCEL')))),
            h("yoo-navbar", { class: "items-space-around", ref: (el) => this.navBar = el, withLine: true, tabs: this.tabs, onTabSelected: (ev) => this.onTabSelected(ev) })));
    }
    renderBody() {
        return (h("yoo-ion-content", { class: "bg-light", scrollEnabled: false },
            h("yoo-ion-slides", { class: "entity-search-display", ref: (el) => this.ionSlides = el, onIonSlideDidChange: ev => this.onIonSlideDidChange(ev), options: { autoplay: false } }, this.config ? this.config.map((t, i) => h("yoo-ion-slide", null,
                h("yoo-ion-content", null,
                    h("div", { class: "toolbar" },
                        h("yoo-entity-search-tags", { onFilterAdvanced: () => this.onShowFilterAdvanced(t), tags: t.tags, sortsAndFilters: this.currentSortsAndFilters ? this.currentSortsAndFilters[t.id] : null, hideAdvancedFilters: t.hideAdvancedFilters === true, onSelect: (ev) => this.onTagSelect(ev) })),
                    h("yoo-ion-refresher", { ref: el => this.refreshers[t.id] = el, slot: "fixed", onIonRefresh: ev => this.onGridPullToRefresh(t), disabled: false },
                        h("yoo-ion-refresher-content", { pullingText: translate('PULLTOREFRESH') })),
                    h("yoo-grid", { ref: el => this.grids[t.id] = el, class: "entity-search", hideHeader: true, hideEmptyState: t.recents && t.recents.length > 0, isLocal: false, emptyState: t.emptyState || t.collectionName, entityType: t.collectionName, displayType: t.displayType || 'card-list', "attr-name": 'grid-' + i, isCollapsible: t.isCollapsible, onSelect: (ev) => this.onEntitySelect(ev, t), onFetchData: (ev) => this.onGridFetchData(ev, t) }, t.recents && t.recents.length > 0 ? h("yoo-entity-search-recent", { slot: "emptystate", values: t.recents, onSelect: ev => this.onRecentSearchSelect(ev), onClear: ev => this.onRecentClear(t) }) : null)))) : null),
            this.isLoading ? h("yoo-loader", { class: "large" }) : null));
    }
    render() {
        return [
            this.renderHeader(),
            this.renderBody()
        ];
    }
    static get is() { return "yoo-entity-search"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "host": {
            "elementRef": true
        },
        "isLoading": {
            "state": true
        },
        "removeData": {
            "method": true
        },
        "updateData": {
            "method": true
        },
        "upsertData": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "search",
            "method": "search",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "cancel",
            "method": "cancel",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "select",
            "method": "select",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "clearRecents",
            "method": "clearRecents",
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
    static get style() { return ":host {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: justify;\n  justify-content: space-between; }\n  :host .header,\n  :host yoo-ion-header {\n    width: unset;\n    padding: 0.5rem;\n    padding-bottom: 0;\n    background: var(--light, #FFFFFF);\n    -webkit-box-shadow: var(--input-bar-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15));\n    box-shadow: var(--input-bar-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15)); }\n    :host .header yoo-ion-buttons,\n    :host yoo-ion-header yoo-ion-buttons {\n      margin-left: 1rem; }\n  :host .content yoo-ion-slides,\n  :host yoo-ion-content yoo-ion-slides {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0; }\n  :host .content .toolbar,\n  :host yoo-ion-content .toolbar {\n    padding-top: 1rem; }\n  :host yoo-navbar {\n    --width-outer-container: unset; }"; }
}

class YooEntitySearchRecentComponent {
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
    static get style() { return ":host .outer-container {\n  padding: 1rem;\n  padding-top: 2rem; }\n  :host .outer-container .menu {\n    list-style: none outside none;\n    background: none repeat scroll 0 0 transparent;\n    border: 0 none;\n    font-size: 100%;\n    margin: 0;\n    outline: 0 none;\n    padding: 0;\n    vertical-align: baseline;\n    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n    margin: 0;\n    padding: 0;\n    padding-bottom: 0.3125rem;\n    list-style: none; }\n    :host .outer-container .menu .menu-item {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      height: 100%;\n      min-height: 2.75rem;\n      padding: 0 0.9375rem 0 0;\n      font-weight: 400;\n      -ms-flex-align: center;\n      align-items: center; }\n      :host .outer-container .menu .menu-item div {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-item-align: center;\n        align-self: center; }\n        :host .outer-container .menu .menu-item div .menu-item-title {\n          width: 100%;\n          margin-left: 0.625rem; }\n    :host .outer-container .menu .border {\n      width: 100%;\n      height: 0;\n      border-top: 1px solid var(--stable-30, #E6E6E6); }\n  :host .outer-container .menu-title {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    margin-top: 1.2rem;\n    font-size: var(--font-m, 15px); }\n  :host .outer-container .menu-title {\n    margin-top: 0; }\n  :host .outer-container .menu {\n    color: var(--black, #000000); }"; }
}

export { YooEntitySearchComponent as YooEntitySearch, YooEntitySearchRecentComponent as YooEntitySearchRecent };

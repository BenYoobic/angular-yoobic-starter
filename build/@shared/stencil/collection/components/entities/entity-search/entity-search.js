import { translate, querySelectorDeep, showModal, isWeb } from '../../../index';
export class YooEntitySearchComponent {
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
    static get style() { return "/**style-placeholder:yoo-entity-search:**/"; }
}

import { FormFieldType, ItemSlidingType } from '../../../interfaces';
import { pipes, querySelectorAllDeep, querySelectorDeep, debounceEvent, getNextValueInArray, showActionSheet, translate, translateMulti, showModal, getElementDimensions, isWeb, dashboardAnimation, HorizontalSlidesAnimation, getAppContext, isAnimationsDisabled } from '../../../utils';
import { findIndex, isEqual, range, compact, isString, isEmpty, debounce } from 'lodash-es';
export class YooGridComponent {
    constructor() {
        this.items = [];
        this.isLocal = false;
        this.columnDefs = [];
        this.total = 0;
        this.hideFooter = true;
        this.showFilters = false;
        this.showSearch = false;
        this.hideTags = false;
        this.showCreate = true;
        this.pageSize = 20;
        this.multiple = false;
        this.animated = true;
        this.extraClass = '';
        this.progressbarAlignMode = 'normal';
        this.clearTags = false;
        this.hasVerticalLine = false;
        this.scrollable = false;
        this.showGlobalActions = false;
        this.loadMoreButton = false;
        this.forceHeading = false;
        this.hideRefreshButton = false;
        this.forceAddNewTag = false;
        this.secondaryActionsDropdown = false;
        this.searchFieldOutsideComponent = false;
        this.iconDisplayNext = 'yo-grid-view';
        this.markers = [];
        this.headerDivs = [];
        this.currentPage = 0;
        this.searchText = '';
        this.joinedItems = [[]];
        this.hasItemsRendered = false;
        this.tapped = false;
        this.horizontalSlidesAnim = new HorizontalSlidesAnimation();
        this.slidesOptions = {
            slidesPerView: 1.2,
            spaceBetween: 15,
            slidesOffsetBefore: 15,
            slidesOffsetAfter: 15,
            autoplay: false
        };
        this.itemsSliding = [];
    }
    componentWillLoad() {
        this.searchText = this.search || '';
        this.selection = compact([].concat(this.initialSelection || []));
        this.setDisplayIcon();
        this.updateGridConfig();
    }
    componentDidLoad() {
        this.fetchData = debounceEvent(this.fetchData, 500);
        if (!this.items || isEmpty(this.items) && !this.isAgGrid()) {
            this.onFetchData();
        }
        if (this.clearTags) {
            this.onTagSelect();
        }
        this.updateSlides();
        this.resizeListener = debounce(this.updateSlides, 500).bind(this);
        window.addEventListener('resize', this.resizeListener);
        let list = this.host.shadowRoot.querySelector('yoo-ion-list');
        let header = this.host.shadowRoot.querySelector('.frame-header');
        dashboardAnimation.addHeaderElement(header).addListElement(list);
        if (this.entityType === 'lessons' && this.hasVerticalLine && !this.hasItemsRendered) {
            this.hasItemsRendered = true;
            this.host.forceUpdate();
        }
    }
    componentDidUpdate() {
        this.updateItemSliding();
        this.updateSlides();
        this.setDisplayIcon();
        if (this.tapped) {
            this.dotDiv.classList.add('active');
            setTimeout(() => {
                if (this.dotDiv) {
                    this.dotDiv.classList.remove('active');
                    this.tapped = false;
                    this.host.forceUpdate();
                }
            }, 1000);
        }
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    onInitialSelectionChanged() {
        this.selection = compact([].concat(this.initialSelection || []));
    }
    onDataChanged(newItems, oldItems) {
        //scrollrevealSync(300);
        if (!newItems || newItems.length === 0) {
            this.host.classList.add('empty');
            this.emptyResults.emit(true);
        }
        else {
            this.host.classList.remove('empty');
            this.emptyResults.emit(false);
        }
        if (this.isGeoLocEntity) {
            this.updateMarkers();
        }
    }
    onGridConfigUpdate() {
        this.updateGridConfig();
    }
    scrollItem(index) {
        if (index < 0 || index >= this.items.length) {
            return;
        }
        let items = this.host.shadowRoot.querySelectorAll('yoo-ion-item');
        items[index].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    pullToRefresh(refresher) {
        this.currentPage = 0;
        if (this.isAgGrid()) {
            if (this.gridApi) {
                this.gridApi.purgeServerSideCache();
            }
        }
        else {
            this.fetchData.emit({
                search: this.searchText,
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                appendData: false,
                infiniteScroll: refresher,
                infiniteScrollType: 'pullToRefresh'
            });
        }
    }
    closeItemsSliding() {
        if (this.itemsSliding) {
            this.itemsSliding.forEach((itemSliding) => {
                itemSliding.close();
            });
        }
    }
    resetSearchText() {
        this.searchText = '';
    }
    clearSelection(keepSelectionMode, noEmit) {
        this.selection = [];
        if (noEmit !== true) {
            this.select.emit(this.multiple ? [] : null);
        }
        this.isSelectionMode = keepSelectionMode || false;
        if (this.isAgGrid() && this.columnApi) {
            this.columnApi.setColumnVisible('checkboxes', this.isSelectionMode);
        }
    }
    updateGridConfig() {
        this.finalGridConfig = Object.assign({}, this.gridConfig, { onGridReady: params => {
                this.gridApi = params.api;
                this.columnApi = params.columnApi;
                this.gridApi.setServerSideDatasource({
                    getRows: p => {
                        this.fetchData.emit({
                            search: this.searchText,
                            currentPage: p.request.startRow / this.pageSize,
                            pageSize: this.pageSize,
                            appendData: true,
                            infiniteScrollType: 'datasource',
                            datasourceSuccess: p.successCallback,
                            sorts: p.request.sortModel
                        });
                    }
                });
            }, onSelectionChanged: params => {
                if (!this.isSelectAll) {
                    this.selection = params.api.getSelectedRows();
                    this.select.emit(this.multiple ? this.selection : (this.selection.length > 0 ? this.selection[0] : null));
                }
            }, onFirstDataRendered(params) {
                // setTimeout(() => {
                //     params.api.sizeColumnsToFit();
                // }, 500);
            }, getContextMenuItems: (params) => {
                let item = params.node.data;
                if (this.secondaryActions) {
                    return this.secondaryActions.filter(a => !a.isVisible || a.isVisible(item)).map((a) => ({
                        name: translate(a.text(item)),
                        action: () => {
                            a.handler(item);
                        } //,
                        //cssClasses: [a.cssClass ? a.cssClass(item) : '']
                    }));
                }
            } });
        if (this.finalGridConfig && this.finalGridConfig.columnDefs) {
            let selectionColumn = this.finalGridConfig.columnDefs.find((c) => c.checkboxSelection === true || c.checkboxSelection === false);
            if (selectionColumn) {
                selectionColumn.hide = !this.isSelectionMode;
            }
        }
    }
    updateSlides() {
        if (!this.isMap()) {
            // setTimeout(() => {
            if (this.slides) {
                this.slides.update();
                const container = querySelectorDeep(this.host, '.container-horizontal');
                const cardSticky = querySelectorDeep(this.host, 'div.slide');
                if (container && cardSticky) {
                    const old = this.slidesOptions.slidesPerView;
                    this.slidesOptions.slidesPerView = Math.max(container.clientWidth / (cardSticky.clientWidth), 1);
                    if (this.slidesOptions.slidesPerView !== old) {
                        this.slidesOptions = Object.assign({}, this.slidesOptions);
                    }
                }
                this.horizontalSlidesAnim.addElements(this.slides.querySelectorAll('yoo-ion-slide'));
            }
            // }, 300);
        }
    }
    onIonSlideDidChange() {
        this.slides.getActiveIndex().then(index => {
            if (index + 1 >= this.items.length) {
                this.slides.lockSwipeToNext(true);
            }
            else {
                this.slides.lockSwipeToNext(false);
            }
        });
    }
    updateItemSliding() {
        setTimeout(() => {
            if (this.itemsSliding) {
                this.itemsSliding.forEach(itemSliding => {
                    if (itemSliding) {
                        itemSliding.updateOptions();
                    }
                });
            }
        }, 500);
    }
    updateMarkers() {
        let markers = [];
        this.items.map((item, index) => {
            if (item._geoloc && item._geoloc.length === 2) {
                markers.push({ longitude: item._geoloc[0], latitude: item._geoloc[1], selected: index === 0 ? true : false });
            }
        });
        this.markers = markers;
    }
    setScrollAnimation() {
        if (this.animated) {
            //this.displayType === 'card-cell' ?
            // scrollrevealReveal('.grid-cell', findParent(this.host, 'yoo-ion-scroll')) :
            // scrollrevealReveal('yoo-ion-item', findParent(this.host, 'yoo-ion-scroll'));
        }
    }
    getCustomPosition() {
        if (this.isMap() && this.gridMap) {
            return this.gridMap.getCenter().then(p => {
                return { latitude: p.lat, longitude: p.lng };
            });
        }
        return Promise.resolve(null);
    }
    onFetchData() {
        if (this.isAgGrid()) {
            if (this.gridApi) {
                this.gridApi.purgeServerSideCache();
            }
        }
        else {
            this.getCustomPosition().then(position => {
                this.fetchData.emit({
                    search: this.searchText,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    appendData: false,
                    customPosition: position
                });
            });
        }
    }
    onInfiniteScroll(ev) {
        this.currentPage += 1;
        this.fetchData.emit({
            search: this.searchText,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            appendData: true,
            infiniteScroll: ev ? ev.target : null,
            infiniteScrollType: 'infiniteScroll'
        });
    }
    findIndex(item) {
        let selection = compact([].concat(this.selection));
        if (isString(item)) {
            let index = findIndex(selection, (s) => s && s && isEqual(item, s));
            return index;
        }
        else {
            let index = findIndex(selection, (s) => (s && s._id && isEqual(item._id, s._id)) || (this.idOnly && isEqual(item[this.idAttributeName || '_id'], s)));
            return index;
        }
    }
    isCardListNonSelectable(item) {
        if (this.isMap()) {
            // Get all the collapsed entities
            let collapsedEntities = querySelectorAllDeep(this.host, 'yoo-entity.collapsed');
            collapsedEntities = collapsedEntities.filter((entityEl) => {
                return item._id === entityEl.item._id;
            });
            return collapsedEntities.length > 0;
        }
        return false;
    }
    onItemSelect(ev, item) {
        if (this.isSelectAll) {
            return;
        }
        if (item === null || item === undefined) {
            return;
        }
        const isBlocked = this.isCardListNonSelectable(item);
        if (this.isReadonly || isBlocked) {
            return;
        }
        let index = this.findIndex(item);
        if (this.multiple) {
            if (index >= 0) {
                this.selection.splice(index, 1);
                this.selection = [...this.selection];
            }
            else {
                this.selection = [...this.selection, item];
            }
        }
        else {
            if (index >= 0 && this.keepSelection) {
                this.selection = [];
            }
            else {
                this.selection = [item];
            }
        }
        let selection;
        if (this.idOnly) {
            selection = compact(this.selection).map(s => s[this.idAttributeName || '_id'] || s);
        }
        else {
            selection = this.selection;
        }
        this.select.emit(this.multiple ? selection : (selection.length > 0 ? selection[0] : null));
    }
    isSelected(item) {
        if (this.keepSelection) {
            if (this.isSelectAll) {
                return true;
            }
            let index = this.findIndex(item);
            return index >= 0;
        }
        return false;
    }
    onToggleSelectionMode() {
        this.isSelectionMode = !this.isSelectionMode;
        if (this.isSelectionMode === false) {
            this.isSelectAll = false;
        }
        if (this.isAgGrid() && this.columnApi) {
            this.columnApi.setColumnVisible('checkboxes', this.isSelectionMode);
        }
        else {
            this.updateGridConfig();
        }
    }
    onToggleSelectAll() {
        this.clearSelection(true);
        this.isSelectAll = !this.isSelectAll;
    }
    onSearchInputChange(ev) {
        this.searchText = ev.detail;
        this.currentPage = 0;
        this.onFetchData();
        if (this.isLocal) {
            this.host.forceUpdate();
        }
    }
    onSearchInputFocused() {
        this.searchInputFocused.emit(true);
    }
    onSearchInputBlurred() {
        this.searchInputBlurred.emit(true);
    }
    onPageChanged(ev) {
        this.currentPage = ev.detail;
        this.onFetchData();
    }
    onItemsPerPageChanged(ev) {
        this.pageSize = ev.detail;
        this.onFetchData();
    }
    onChangeDisplay() {
        if (this.displayModes && this.displayModes.length > 1) {
            this.displayType = getNextValueInArray(this.displayModes, this.displayType);
            this.setDisplayIcon();
            this.displayTypeChange.emit(this.displayType);
        }
    }
    onFrameIconClicked() {
        this.isFrameExpanded = !this.isFrameExpanded;
        this.frameExpanded.emit(this.isFrameExpanded);
    }
    onEntityCollapsed(event) {
        this.entityCollapsed.emit(event.detail);
        if (this.gridMap) {
            let entities = querySelectorAllDeep(this.host, 'yoo-entity');
            if (entities.length > 0) {
                this.gridMap.gridMapCardCollapsed = true;
                // If any of the entities is in the open state then add the class to the map
                // to ensure correct positioning of the locate me button
                entities.forEach((entity) => {
                    if (entity.classList.contains('open')) {
                        this.gridMap.gridMapCardCollapsed = false;
                    }
                });
            }
        }
    }
    setDisplayIcon() {
        const nextDisplayType = getNextValueInArray(this.displayModes, this.displayType);
        switch (nextDisplayType) {
            case 'card-list':
            case 'card-course-row':
                this.iconDisplayNext = 'yo-list-view';
                break;
            case 'card-cell':
                this.iconDisplayNext = 'yo-grid-view';
                break;
            case 'card-grid':
                this.iconDisplayNext = 'yo-table';
                break;
            default:
                this.iconDisplayNext = 'yo-single-view';
        }
    }
    getItems() {
        if (this.isFramed) {
            return this.isFrameExpanded ? this.items.slice(0, 10) : this.items.slice(0, 3);
        }
        else {
            return this.items;
        }
    }
    isNewTag() {
        let isNewTag = true;
        if (this.items) {
            this.items.map(item => {
                if (item._id === this.searchText) {
                    isNewTag = false;
                }
            });
        }
        return isNewTag;
    }
    onSearchInputEnterPressed(ev) {
        this.searchInputEnterPressed.emit(this.searchText);
        ev.stopPropagation();
    }
    onAddNewTag() {
        this.addNewTagPressed.emit(this.searchText);
    }
    onShowFilterAdvanced() {
        if (this.model) {
            this.dialogSortsAndFilters = document.createElement('yoo-entity-search-dialog');
            this.dialogSortsAndFilters.model = this.model;
            this.dialogSortsAndFilters.values = this.sortsAndFilters;
            this.dialogSortsAndFilters.addEventListener('fieldFetchData', (ev) => {
                ev.stopPropagation();
                this.fieldFetchData.emit(ev.detail);
            });
            showModal(this.dialogSortsAndFilters, null, null, 'slideYEnterAnimation', 'slideYLeaveAnimation').then(ret => {
                if (ret && ret.data) {
                    this.sortsAndFilters = ret.data;
                    if (this.gridApi) {
                        this.gridApi.purgeServerSideCache();
                    }
                    this.sortsAndFiltersChange.emit(this.sortsAndFilters);
                    this.host.forceUpdate();
                }
                this.dialogSortsAndFilters = null;
            });
            this.sortsAndFiltersShowed.emit(true);
        }
    }
    hasFilters() {
        return this.sortsAndFilters && this.sortsAndFilters.filters && this.sortsAndFilters.filters.length > 0;
    }
    onTagSelect(ev) {
        if (ev) {
            ev.stopPropagation();
            this.tagsSelect.emit(ev.detail);
        }
        else {
            this.tagsSelect.emit([]);
        }
        if (this.gridApi) {
            this.gridApi.purgeServerSideCache();
        }
    }
    onHeadingClick() {
        this.headingClicked.emit(true);
    }
    isMap() {
        return this.displayType === 'card-map';
    }
    isAgGrid() {
        return this.displayType === 'card-grid';
    }
    toggleMarkerSelection(index) {
        this.markers = this.markers.map((marker, i) => {
            if (marker.selected) {
                marker.selected = false;
            }
            if (index === i) {
                marker.selected = true;
            }
            return marker;
        });
    }
    onStoreEntityClicked(index) {
        this.toggleMarkerSelection(index);
        let selectedMarker = this.markers.find((marker) => marker.selected === true);
        this.gridMap.flyTo(selectedMarker.longitude, selectedMarker.latitude);
    }
    onMarkerSelected(event) {
        event.stopPropagation();
        const [marker] = event.detail;
        const markerIndex = this.markers.indexOf(marker);
        let entityElements = this.host.shadowRoot.querySelector('yoo-ion-scroll').querySelectorAll('yoo-entity');
        if (!entityElements.length || markerIndex < 0) {
            return;
        }
        const cardPadding = 5;
        let pos = Array.from(entityElements)
            .slice(0, markerIndex)
            .map(el => el.getBoundingClientRect().width)
            .reduce((acc, val) => acc + val + cardPadding, 0);
        this.mapScroll.scrollToPoint(pos, 0, 150);
    }
    onAddressFetchData(ev) {
        const searchData = ev.detail;
        const formSearch = { field: { type: FormFieldType.address }, search: searchData, grid: this };
        this.fieldFetchData.emit(formSearch);
    }
    onAddressChanged(ev) {
        ev.stopPropagation();
        if (ev.detail && this.gridMap && ev.detail._geoloc && ev.detail._geoloc.length > 1) {
            this.gridMap.flyTo(ev.detail._geoloc[0], ev.detail._geoloc[1]);
        }
    }
    onItemSlidingDrag(item, index) {
        if (this.itemsSliding[index]) {
            let promise = this.itemsSliding[index].getSlidingRatio();
            if (promise && promise.then) {
                promise.then(percent => {
                    if (percent >= 1) {
                        this.swipeEnd.emit(item);
                    }
                });
            }
        }
    }
    onHorizontalSlidingEnd(ev) {
        ev.stopPropagation();
        this.swipeEnd.emit();
    }
    forceFieldUpdate(field, fieldData, formSearch) {
        if (field.type === FormFieldType.address && this.addressAutocomplete) {
            this.addressAutocomplete.updateValues(field.tmpValues);
        }
    }
    onMapScroll(ev) {
        if (this.mapScroll) {
            const currentScroll = ev.detail.currentX;
            const scrollWidth = this.mapScroll.scrollWidth;
            const scrollClientWidth = this.mapScroll.clientWidth;
            const isLastScroll = (currentScroll === (scrollWidth - scrollClientWidth));
            if (isLastScroll) {
                this.onInfiniteScroll();
            }
        }
    }
    onFetchMapData(event) {
        this.onFetchData();
    }
    onHeaderContainerTouchStart() {
        this.tapped = true;
        this.host.forceUpdate();
    }
    isWebTab() {
        return isWeb() && (this.isPhotosTab() || this.host.classList.contains('history-tab'));
    }
    isPhotosTab() {
        return this.host.classList.contains('photos-tab');
    }
    getIconColor(item) {
        if (this.valuesColor && item) {
            if (!this.isSelected(item)) {
                return null;
            }
            let color = this.valuesColor.find(e => e.key === item._id.toString());
            if (color && color.value) {
                return color.value;
            }
            else {
                return null;
            }
        }
        return null;
    }
    getClassList() {
        let list = ['container-base'];
        if (this.direction === 'horizontal') {
            list.push('container-horizontal');
        }
        else {
            list.push('container');
            if (!this.items || !this.items.length) {
                list.push('empty');
            }
        }
        if (this.showFilters && this.showSearch) {
            list.push('filters');
        }
        if (this.isCollapsible) {
            list.push('collapsible');
        }
        if (this.scrollable) {
            list.push('scrollable');
        }
        return list.join(' ');
    }
    renderSearch() {
        return (h("div", { class: "search-container" },
            h("yoo-form-input", { disabled: this.isLoading, autocapitalize: "none", autocorrect: "off", class: {
                    'flex search': true,
                    'grid-search': true,
                    'with-toggle': this.isToggleModeVisible()
                }, "icon-prefix": "yo-search", value: this.searchText, placeholder: this.searchBarPlaceholder ? translateMulti(this.searchBarPlaceholder) : translate('SEARCH'), onInputChanged: (ev) => this.onSearchInputChange(ev), onInputFocused: () => this.onSearchInputFocused(), onInputBlurred: () => this.onSearchInputBlurred(), onEnterPressed: (ev) => this.onSearchInputEnterPressed(ev) }),
            this.renderDisplayMode(),
            isWeb() && !this.hideRefreshButton ?
                h("yoo-tooltip", { content: translate('REFRESH'), cssOnly: true, placement: "bottom" },
                    h("yoo-ion-button", { class: "margin-left-negative", color: "text-color", onClick: () => this.pullToRefresh() },
                        h("yoo-icon", { slot: "icon-only", class: "yo-refresh" })))
                : null,
            isWeb() && this.showGlobalActions && this.isSelectionMode ?
                h("yoo-ion-button", { class: "margin-left-negative", color: "success", onClick: () => this.onToggleSelectAll() }, translate(this.isSelectAll ? 'GRIDUNSELECTALL' : 'GRIDSELECTALL'))
                : null,
            isWeb() && this.showGlobalActions ?
                h("yoo-ion-button", { class: "margin-left-negative", color: this.isSelectionMode ? 'text-color' : 'success', onClick: () => this.onToggleSelectionMode() }, this.isSelectionMode ? translate('CANCEL') : translate('GRIDSELECT'))
                : null,
            h("slot", { name: "search-buttons" })));
    }
    renderChangeDisplayButton() {
        return h("yoo-ion-button", { class: "margin-left-negative", color: "text-color", onClick: () => this.onChangeDisplay() },
            h("yoo-icon", { slot: "icon-only", class: this.iconDisplayNext }));
    }
    renderDisplayMode() {
        if (!this.isToggleModeVisible()) {
            return;
        }
        return (isWeb() ? h("yoo-tooltip", { content: translate('CHANGEDISPLAYMODE'), cssOnly: true, placement: "bottom" }, this.renderChangeDisplayButton()) : this.renderChangeDisplayButton());
    }
    renderAddressAutocomplete() {
        return (h("yoo-form-autocomplete", { ref: el => this.addressAutocomplete = el, class: "map-locations", iconPrefix: "yo-map", multiple: false, isLocal: false, entityType: 'googlemaps', displayType: 'card-list', emptyState: 'map', clearable: false, hideTags: true, onFetchData: (ev) => this.onAddressFetchData(ev), onInputChanged: (ev) => this.onAddressChanged(ev) }));
    }
    renderEntitySearchTags() {
        return (h("yoo-entity-search-tags", { class: { 'flex': !this.hideTags }, sortsAndFilters: this.sortsAndFilters, onFilterAdvanced: () => this.onShowFilterAdvanced(), tags: this.tags, values: this.selectedTags, hideAdvancedFilters: this.hideAdvancedFilters, onSelect: (ev) => this.onTagSelect(ev) }));
    }
    renderHeader() {
        return ([this.isFramed ?
                h("div", { class: "frame-header" },
                    h("div", { class: "row" },
                        this.heading || this.subheading ?
                            h("div", { class: "text-container", onClick: () => this.onHeadingClick(), onTouchStart: () => { this.onHeaderContainerTouchStart(); } }, this.heading ?
                                h("div", null, this.isLoading && this.total <= 0 ?
                                    h("yoo-card-placeholder", { displayType: this.displayType, entityType: this.entityType, header: this.progressCss })
                                    :
                                        h("span", { class: 'heading' },
                                            h("div", { class: "dot", ref: el => this.dotDiv = el }),
                                            translate(this.heading),
                                            this.total > 0 && !this.hideTotal ? h("yoo-badge", { text: pipes.number.transform(this.total), class: 'round medium always-black' }) : null))
                                : null)
                            : null,
                        this.total >= 0 && this.total <= 3 ? null :
                            h("div", { class: "icon-container", onClick: () => this.onFrameIconClicked() },
                                h("yoo-icon", { class: this.isFrameExpanded ? 'yo-up' : 'yo-down' })),
                        h("slot", { name: "header" })),
                    this.progress && this.total > 0 ?
                        h("div", { class: "progressbar-wrapper" },
                            h("yoo-progress-bar-core", { shape: "line", progressValue: this.progress }))
                        : null)
                : this.forceHeading ?
                    h("div", { class: "header-container" },
                        h("div", { class: "header-title" },
                            h("div", null, translate(this.heading)),
                            h("div", { class: "total-number" }, this.total > 0 && this.total)),
                        (this.entityType === 'courses' || this.entityType === 'plans') && this.renderDisplayMode())
                    : this.progress && this.total > 0 ?
                        h("div", { class: "progressbar-wrapper" },
                            h("yoo-progress-bar-core", { shape: "line", progressValue: this.progress }))
                        : null,
            this.hideHeader || this.isFramed ? null :
                h("yoo-toolbar", { class: "top-grid" },
                    h("div", { class: { 'toolbar-content': true, 'hide-tags': this.hideTags && (this.isTagsVisible() || this.hasFilters()) } },
                        this.hideTags && this.isTagsVisible() && ((this.items && this.items.length > 0) || this.hasFilters() ||
                            this.entityType === 'locations' || this.isAgGrid()) && this.renderEntitySearchTags(),
                        (this.showSearch || (!isWeb() && this.allowCustomTag)) && ((this.items && this.items.length > 0) ||
                            this.allowCustomTag || this.searchText || this.entityType === 'locations' || this.isAgGrid()) && !this.isMap() ?
                            this.renderSearch() : this.isMap() ? this.renderAddressAutocomplete() :
                            h("span", { class: "flex" }),
                        !this.hideTags && this.isTagsVisible() && ((this.items && this.items.length > 0) || this.hasFilters() ||
                            this.entityType === 'locations' || this.isAgGrid()) && this.renderEntitySearchTags()))]);
    }
    isToggleModeVisible() {
        return (!this.isFramed || this.isFrameExpanded) && this.displayModes && this.displayModes.length > 0 && this.items && this.items.length > 0;
    }
    isTagsVisible() {
        return this.showFilters && ((this.tags && this.tags.length > 0) || this.hideAdvancedFilters !== true);
    }
    isCollapsibleCheck() {
        return this.isCollapsible && !this.isFramed && this.entityType === 'locations';
    }
    hasNoKpi(item) {
        return (this.entityType === 'locations' || this.displayType === 'card-map') && item && (!item.kpiData || (item.kpiData && item.kpiData.length <= 0)) && !this.host.classList.contains('show-select-circles');
    }
    renderFooter() {
        return this.hideFooter ? '' :
            h("yoo-toolbar", { class: "bottom" },
                h("yoo-pagination", { totalItems: this.total, currentPage: this.currentPage, itemsPerPage: this.pageSize, showTotal: true, "max-page-size": "7", class: "dark flex", onPageChanged: (ev) => this.onPageChanged(ev), onItemsPerPageChanged: (ev) => this.onItemsPerPageChanged(ev) }));
    }
    renderAgGrid() {
        return this.finalGridConfig ?
            h("yoo-ag-grid", { class: this.isSelectionMode && this.isSelectAll ? 'select-all' : '', config: this.finalGridConfig }) : null;
    }
    renderMapGrid() {
        return (h("div", { class: "map-scroll-container" },
            h("yoo-map", { class: "absolute", ref: (el) => this.gridMap = el, isGridMap: true, markers: this.markers, position: this.currentPosition, onFetchMapData: (event) => this.onFetchMapData(event), onSelect: (event) => this.onMarkerSelected(event) }),
            h("yoo-ion-scroll", { class: "horizontal", ref: (el) => this.mapScroll = el, scrollEvents: true, onIonScroll: (event) => this.onMapScroll(event) },
                h("div", { class: "entities-container" }, this.items.map((item, index) => h("div", { class: "entity-container", onClick: () => this.onStoreEntityClicked(index) }, this.renderEntity(item)))))));
    }
    renderEntityItems(header, headerIndex, lastItemIndex, hasVerticalLine, alreadyRendered) {
        let defaultElements = [
            h("yoo-ion-item-divider", null,
                h("span", null, header.text)),
            this.secondaryActions && this.secondaryActions.length && this.displayType === 'card-list' ?
                this.items.slice(header.index, lastItemIndex).map((item, i) => this.showActionsAsMore ? this.renderItemWithMore(item) : this.renderItemSliding(item, headerIndex === this.items.length - 1, i))
                : (this.items.slice(header.index, lastItemIndex).map((item, idx) => {
                    return [
                        alreadyRendered && hasVerticalLine && (idx < (lastItemIndex - (header.index + 1))) ? this.renderJoinLine(headerIndex, idx) : null,
                        h("yoo-ion-item", { lines: "none", class: { 'selected': this.isSelected(item) }, ref: (el) => this.joinedItems[headerIndex][idx] = el }, this.renderEntity(item))
                    ];
                }))
        ];
        if (hasVerticalLine) {
            this.joinedItems[headerIndex] = [];
            return [h("div", { ref: (el) => this.headerDivs[headerIndex] = el }, defaultElements)];
        }
        else {
            return defaultElements;
        }
    }
    renderBody() {
        if (this.isAgGrid()) {
            return this.renderAgGrid();
        }
        if (this.isMap()) {
            return this.renderMapGrid();
        }
        else if (this.displayType === 'card-cell' && this.items && (this.items.length > 0) && this.direction !== 'horizontal') {
            if (this.headerFn) {
                // compute headers with the headerFn, if null then no header to add
                let headers = this.items.map((item, index, records) => {
                    return { text: this.headerFn(item, index, records), index: index };
                }).filter(i => i.text);
                return [
                    headers.map((header, index, array) => {
                        let end = index === array.length - 1 ? this.items.length : array[index + 1].index;
                        return [
                            h("yoo-ion-item-divider", null,
                                h("span", { class: "divider-text" }, header.text)),
                            h("div", { class: "grid-cell" },
                                this.items.slice(header.index, end).map(item => this.renderEntity(item)),
                                h("yoo-entity", { class: "empty-entity" }),
                                h("yoo-entity", { class: "empty-entity" }),
                                h("yoo-entity", { class: "empty-entity" }),
                                h("yoo-entity", { class: "empty-entity" }),
                                h("yoo-entity", { class: "empty-entity" }),
                                h("yoo-entity", { class: "empty-entity" }),
                                h("yoo-entity", { class: "empty-entity" }))
                        ];
                    }),
                    this.renderInfiniteScroll()
                ];
            }
            else {
                return [
                    h("slot", { name: "header" }),
                    h("div", { class: "grid-cell" },
                        this.items.map(item => this.renderEntity(item)),
                        h("yoo-entity", { class: (this.entityType === 'photos' ? 'photos' : '') + ' empty-entity ' }),
                        h("yoo-entity", { class: (this.entityType === 'photos' ? 'photos' : '') + ' empty-entity ' }),
                        h("yoo-entity", { class: (this.entityType === 'photos' ? 'photos' : '') + ' empty-entity ' }),
                        h("yoo-entity", { class: (this.entityType === 'photos' ? 'photos' : '') + ' empty-entity ' }),
                        h("yoo-entity", { class: (this.entityType === 'photos' ? 'photos' : '') + ' empty-entity ' }),
                        h("yoo-entity", { class: (this.entityType === 'photos' ? 'photos' : '') + ' empty-entity ' })),
                    this.renderInfiniteScroll()
                ];
            }
        }
        else if (this.items && (this.items.length > 0) && this.direction === 'horizontal') {
            return [
                h("slot", { name: "header" }),
                h("yoo-ion-slides", { ref: el => this.slides = el, class: 'body-container ' + this.displayType, options: this.slidesOptions, onIonSlideTransitionEnd: (ev) => this.onHorizontalSlidingEnd(ev), onIonSlideDidChange: () => this.onIonSlideDidChange() },
                    this.items.map(item => h("yoo-ion-slide", { class: "news-feed-slide" },
                        h("div", { class: "slide" }, this.renderEntity(item)))),
                    h("yoo-ion-slide", { class: "empty" }),
                    h("yoo-ion-slide", { class: "empty" }),
                    h("yoo-ion-slide", { class: "empty" }),
                    h("yoo-ion-slide", { class: "empty" }),
                    h("yoo-ion-slide", { class: "empty" }),
                    h("yoo-ion-slide", { class: "empty" }))
            ];
        }
        else if (this.items && (this.items.length > 0) && this.direction !== 'horizontal' && this.headerFn) {
            let headers = this.items.map((item, index, records) => {
                return { text: this.headerFn(item, index, records), index: index };
            }).filter(i => i.text);
            return [
                h("yoo-ion-list", { class: `body-container ${this.displayType}` }, headers.map((header, index, array) => {
                    return this.renderEntityItems(header, index, index === array.length - 1 ? this.items.length : array[index + 1].index, this.entityType === 'lessons' && this.hasVerticalLine, this.hasItemsRendered);
                })),
                this.renderInfiniteScroll(),
                this.host.classList.contains('half') && this.renderScrollSpacer()
            ];
        }
        else if (this.items && (this.items.length > 0) && this.direction !== 'horizontal' && !this.headerFn) {
            return [
                h("yoo-ion-list", { class: {
                        'body-container': true,
                        [this.displayType]: true,
                        'top-margin': this.hideHeader && !this.isFramed,
                        'no-fade-delay': this.isFramed,
                        'loaded': !this.isLoading,
                        'web-photos-tab': this.isPhotosTab()
                    } }, this.secondaryActions && this.secondaryActions.length && this.displayType === 'card-list' && !this.isSelectionMode ?
                    this.getItems().map((item, index) => this.showActionsAsMore ? this.renderItemWithMore(item) : this.renderItemSliding(item, index === this.getItems().length - 1, index)) :
                    (this.getItems().map((item, index) => h("yoo-ion-item", { lines: "none", class: { [this.displayType]: true, 'selected': this.isSelected(item), 'first': index === 0 } }, this.renderEntity(item, index === this.getItems().length - 1))))),
                this.renderInfiniteScroll(),
                this.host.classList.contains('half') && this.renderScrollSpacer()
            ];
        }
        else if (this.isLoading) {
            return this.renderPlaceholders();
        }
        else if (!this.isFramed && !this.allowCustomTag && (this.direction !== 'horizontal' || this.emptyState)) {
            return this.hideEmptyState ? h("slot", { name: "emptystate" }) :
                h("yoo-empty-state", { class: {
                        'empty-state-grid': true,
                        'absolute': !this.host.classList.contains('relative-empty-state'),
                        'header-padding': !this.hideHeader || this.host.classList.contains('entity-search'),
                        'small': this.host.classList.contains('half')
                    }, type: this.emptyState, emptyText: this.emptyStateDescription, fadeIn: true }, this.emptyStateButtonText && this.emptyStateHandler ?
                    h("div", { class: "empty-button" },
                        h("yoo-button", { class: 'large ' + (this.progressCss ? this.progressCss : 'success'), text: translate(this.emptyStateButtonText), onClick: () => this.emptyStateHandler() }))
                    : null);
        }
        else if (this.isFramed && !this.isCompact && !this.allowCustomTag) {
            return (h("div", { class: "empty-framed" },
                h("div", { class: "description-container flex" },
                    this.emptyStateDescription ?
                        h("div", null,
                            h("span", { class: "empty-description", innerHTML: translate(this.emptyStateDescription) }))
                        : null,
                    this.emptyStateButtonText && this.emptyStateHandler ?
                        h("div", { class: "empty-button" },
                            h("yoo-button", { class: 'medium ' + (this.progressCss ? this.progressCss : 'success'), text: translate(this.emptyStateButtonText), onClick: () => this.emptyStateHandler() }))
                        : null),
                h("div", { class: "empty-state-container" },
                    h("yoo-empty-state", { class: 'empty-state-framed' + (this.host.classList.contains('half') ? ' small' : ''), type: this.emptyState }))));
        }
    }
    renderAddNewTag() {
        if (this.forceAddNewTag || (this.allowCustomTag && (this.items ? this.items.length < 6 : null) && this.isNewTag() && ((this.searchText && this.searchText.length > 0) || this.searchFieldOutsideComponent))) {
            let searchText = this.forceAddNewTag || this.searchFieldOutsideComponent ? null : `"${this.searchText}"`;
            return h("div", { class: "empty-new-tag" },
                h("div", { class: "text-container" },
                    searchText,
                    " ",
                    translate('NEWTAGFOUNDDESCRIPTION')),
                h("yoo-button", { class: "gradient-success medium", text: translate('ADD'), onClick: () => this.onAddNewTag() }));
        }
    }
    presentActionSheet(actions, item) {
        // IONIC ACTION SHEETS
        showActionSheet(actions.map(a => ({
            icon: null,
            text: a.text(item),
            handler: () => a.handler(item)
        })));
    }
    renderItemWithMore(item) {
        const actions = this.secondaryActions.filter(a => a.isVisible ? a.isVisible(item) : true);
        return (h("yoo-ion-item", { lines: "none", class: { 'selected': this.isSelected(item) } },
            this.renderEntity(item),
            actions.length ?
                h("div", { class: "more-container", onClick: () => this.presentActionSheet(actions, item) },
                    h("yoo-icon", { class: "yo-more" }))
                : null));
    }
    renderItemSliding(item, isLast = false, index) {
        const actions = this.secondaryActions.filter(a => a.isVisible ? a.isVisible(item) : true);
        let slidingType = isWeb() ? ItemSlidingType.hover : ItemSlidingType.swipe;
        let itemSlidingStyle = this.secondaryActionsDropdown ? { 'position': 'relative', 'z-index': `${this.items.length - index}` } : {};
        if (isWeb()) {
            setTimeout(() => this.enableWebOptionsContainers(), 1000);
        }
        return (h("yoo-ion-item-sliding", { slidingType: slidingType, onIonDrag: (ev) => { this.onItemSlidingDrag(item, index); }, ref: (el) => this.itemsSliding[index] = el, style: itemSlidingStyle },
            h("yoo-ion-item", { lines: "none", class: { 'selected': this.isSelected(item), 'overflow-visible': this.secondaryActionsDropdown } }, this.renderEntity(item, isLast)),
            actions.length > 0 && !this.secondaryActionsDropdown ?
                h("yoo-ion-item-options", null,
                    h("div", { class: { 'options-container': true, 'web': isWeb() } },
                        actions.map(action => isWeb() ? this.renderWebItemOptionButtons(action, item) : this.renderMobileItemOptionButtons(action, item)),
                        isWeb() && h("div", { class: "hover-overlay", onClick: (ev) => this.onItemSelect(ev, item) })))
                : null));
    }
    enableWebOptionsContainers() {
        let containers = this.host.shadowRoot.querySelectorAll('.options-container.web');
        if (containers.length) {
            Array.from(containers).forEach(el => el['style'].display = 'flex');
        }
    }
    renderWebItemOptionButtons(action, item) {
        return (h("div", { class: {
                'icon-container': true,
                [action.cssClass(item)]: true
            }, onClick: () => this.onItemOptionSelect(action, item) },
            h("yoo-tooltip", { content: translate(action.text(item)), cssOnly: true, placement: "bottom" },
                h("yoo-icon", { class: action.icon(item) }))));
    }
    renderMobileItemOptionButtons(action, item) {
        return (h("button", { "ion-button": true, onClick: () => {
                this.onItemOptionSelect(action, item);
                this.closeItemsSliding();
            }, class: action.cssClass ? action.cssClass(item) : '' },
            action.icon ? h("yoo-icon", { class: action.icon(item) }) : null,
            action.text ? h("span", { class: "text-action" }, translate(action.text(item))) : null));
    }
    onItemOptionSelect(action, item) {
        action.handler(item);
        this.itemOptionSelected.emit({ action: action, item: item });
    }
    renderJoinLine(headerIndex, itemIndex) {
        let lineTop = 0;
        for (let i = 0; i < headerIndex; i++) {
            lineTop += getElementDimensions(this.headerDivs[i]).height;
        }
        for (let i = 0; i <= itemIndex; i++) {
            lineTop += getElementDimensions(this.joinedItems[headerIndex][i]).height;
        }
        let elementDimensions = getElementDimensions(this.joinedItems[headerIndex][itemIndex]);
        let element = querySelectorDeep(this.joinedItems[headerIndex][itemIndex].querySelector('yoo-entity'), 'div.outer-container');
        let css = {
            'top': lineTop + 'px',
            'height': elementDimensions.height / 2 + 'px'
        };
        return (h("div", { class: 'join-line ' + (element.classList.contains('finished') ? 'finished' : ''), style: css }));
    }
    renderEntity(item, isLast = false) {
        return h("div", { class: {
                'entity-inner-container': true,
                [this.displayType]: true,
                'collapsible': this.isCollapsibleCheck(),
                'no-kpi': this.hasNoKpi(item),
                'overflow-visible': this.secondaryActionsDropdown
            }, onClick: (ev) => this.onItemSelect(ev, item) },
            h("yoo-entity", { 
                //ref={(el) => this.entityComponent = el as HTMLYooEntityElement}
                iconColor: this.getIconColor(item), useTranslate: this.useTranslate, onCollapsed: (ev) => this.onEntityCollapsed(ev), onViewMoreToggled: (ev) => { ev.stopPropagation(); this.viewMoreToggled.emit(item); }, class: {
                    'selected check-selected': this.isSelected(item) && !this.showGlobalActions,
                    'selected check-selected-left': this.isSelected(item) && this.showGlobalActions && this.isSelectionMode,
                    'check-unselected': (((this.host.classList.contains('show-select-circles') || this.host.classList.contains('radio-button-choice')) && !this.isSelected(item)) || (this.multiple && !this.isSelected(item))) && !this.showGlobalActions,
                    'check-unselected-left': (((this.host.classList.contains('show-select-circles') || this.host.classList.contains('radio-button-choice')) && !this.isSelected(item)) || (this.multiple && !this.isSelected(item))) && this.showGlobalActions && this.isSelectionMode,
                    'child': item && item.isChild,
                    'last': isLast,
                    'form-choice': this.host.classList.contains('form-choice'),
                    'framed': this.isFramed,
                    'full-width': this.host.classList.contains('full-width'),
                    'preview': this.host.classList.contains('preview'),
                    'no-kpi': this.hasNoKpi(item),
                    'no-text-break': this.host.classList.contains('no-text-break')
                }, item: item, items: this.entityType === 'photos' ? this.items : undefined, displayType: this.displayType, entityType: this.entityType, icons: this.icons, topActions: this.topActions, bottomActions: this.bottomActions, secondaryActions: this.secondaryActions, customModel: this.customModel, isCollapsible: this.isCollapsibleCheck(), isMap: this.isMap(), isFramed: this.isFramed, secondaryActionsDropdown: this.secondaryActionsDropdown }));
    }
    renderInfiniteScroll() {
        return !this.isLocal && !this.isFramed &&
            (this.loadMoreButton ?
                h("yoo-button", { text: translate('LOADMORE'), class: "medium link-transparent-stable", onClick: () => this.onInfiniteScroll() }) :
                h("yoo-ion-infinite-scroll", { onIonInfinite: ev => this.onInfiniteScroll(ev), disabled: this.infiniteScrollDisabled },
                    h("yoo-ion-infinite-scroll-content", { loadingSpinner: "dots" })));
    }
    renderPlaceholders() {
        if (this.direction === 'horizontal') {
            return h("yoo-ion-scroll", { class: "horizontal relative" },
                h("div", { class: "entity-placeholder" }, this.renderPlaceholderContent()));
        }
        else {
            return (h("yoo-ion-list", { class: 'no-fade-delay body-container ' + this.displayType }, this.renderPlaceholderContent()));
        }
    }
    renderPlaceholderContent(useSlide = false) {
        const Tag = useSlide ? 'yoo-ion-slide' : 'yoo-ion-item';
        let placeholders;
        if (this.displayType === 'card-list' || 'card-cell') {
            placeholders = range(0, this.isFramed ? 3 : 20);
        }
        else {
            placeholders = range(0, 3);
        }
        return placeholders.map((_, index) => h(Tag, { lines: "none" },
            h("yoo-card-placeholder", { displayType: this.displayType, entityType: this.entityType, header: index === 0 && (this.showSearch || this.showFilters) ? 'search' : null })));
    }
    renderGlobalActions() {
        let numberOfSelectedItems = (this.selection && this.selection.length ? this.selection.length : this.isSelectAll ? this.total : 0) || 0;
        if (numberOfSelectedItems > 0) {
            let message = translate('SELECTEDITEMS', { n: '' });
            let extraButtons = [...(this.globalActions || []), {
                    icon: (item) => 'yo-cross',
                    tooltip: (item) => translate('CLOSE'),
                    handler: () => {
                        this.onToggleSelectionMode();
                    }
                }];
            return (this.globalActions &&
                h("yoo-toast", { class: "bg-light global-actions", message: message, extraButtons: extraButtons, count: numberOfSelectedItems }));
        }
    }
    renderScrollSpacer() {
        return (h("div", { class: "scroll-spacer" }));
    }
    renderContent() {
        return [
            this.renderHeader(),
            this.renderBody(),
            this.renderAddNewTag(),
            this.renderFooter()
        ];
    }
    renderBase() {
        return [
            h("div", { class: this.getClassList() }, this.scrollable && !this.isAgGrid() ?
                h("yoo-ion-scroll", { class: "no-scrollbar relative" }, this.renderContent())
                :
                    this.renderContent()),
            isWeb() && this.showGlobalActions && this.isSelectionMode && this.renderGlobalActions()
        ];
    }
    hostData() {
        return {
            class: Object.assign({ [this.extraClass]: true, framed: this.isFramed, 'no-animation': isAnimationsDisabled(), map: this.isMap(), [this.displayType]: true, [this.entityType || 'simple']: true, 'tapped': this.tapped }, getAppContext())
        };
    }
    render() {
        return (this.isFramed ?
            h("div", { class: { 'frame-container': true, 'web': isWeb() } }, this.renderBase())
            : this.renderBase());
    }
    static get is() { return "yoo-grid"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowCustomTag": {
            "type": Boolean,
            "attr": "allow-custom-tag"
        },
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "bottomActions": {
            "type": "Any",
            "attr": "bottom-actions"
        },
        "clearSelection": {
            "method": true
        },
        "clearTags": {
            "type": Boolean,
            "attr": "clear-tags"
        },
        "closeItemsSliding": {
            "method": true
        },
        "columnDefs": {
            "type": "Any",
            "attr": "column-defs"
        },
        "currentPosition": {
            "type": "Any",
            "attr": "current-position"
        },
        "customModel": {
            "type": "Any",
            "attr": "custom-model"
        },
        "direction": {
            "type": String,
            "attr": "direction"
        },
        "displayModes": {
            "type": "Any",
            "attr": "display-modes"
        },
        "displayType": {
            "type": String,
            "attr": "display-type",
            "mutable": true
        },
        "emptyState": {
            "type": String,
            "attr": "empty-state"
        },
        "emptyStateButtonText": {
            "type": String,
            "attr": "empty-state-button-text"
        },
        "emptyStateDescription": {
            "type": String,
            "attr": "empty-state-description"
        },
        "emptyStateHandler": {
            "type": "Any",
            "attr": "empty-state-handler"
        },
        "entityType": {
            "type": String,
            "attr": "entity-type"
        },
        "extraClass": {
            "type": String,
            "attr": "extra-class"
        },
        "forceAddNewTag": {
            "type": Boolean,
            "attr": "force-add-new-tag"
        },
        "forceHeading": {
            "type": Boolean,
            "attr": "force-heading"
        },
        "globalActions": {
            "type": "Any",
            "attr": "global-actions"
        },
        "gridConfig": {
            "type": "Any",
            "attr": "grid-config",
            "watchCallbacks": ["onGridConfigUpdate"]
        },
        "hasVerticalLine": {
            "type": Boolean,
            "attr": "has-vertical-line"
        },
        "headerDivs": {
            "state": true
        },
        "headerFn": {
            "type": "Any",
            "attr": "header-fn"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "hideAdvancedFilters": {
            "type": Boolean,
            "attr": "hide-advanced-filters"
        },
        "hideEmptyState": {
            "type": Boolean,
            "attr": "hide-empty-state"
        },
        "hideFooter": {
            "type": Boolean,
            "attr": "hide-footer"
        },
        "hideHeader": {
            "type": Boolean,
            "attr": "hide-header"
        },
        "hideRefreshButton": {
            "type": Boolean,
            "attr": "hide-refresh-button"
        },
        "hideTags": {
            "type": Boolean,
            "attr": "hide-tags"
        },
        "hideTotal": {
            "type": Boolean,
            "attr": "hide-total"
        },
        "host": {
            "elementRef": true
        },
        "iconDisplayNext": {
            "state": true
        },
        "icons": {
            "type": "Any",
            "attr": "icons"
        },
        "idAttributeName": {
            "type": String,
            "attr": "id-attribute-name"
        },
        "idOnly": {
            "type": Boolean,
            "attr": "id-only"
        },
        "infiniteScrollDisabled": {
            "type": Boolean,
            "attr": "infinite-scroll-disabled"
        },
        "initialSelection": {
            "type": "Any",
            "attr": "initial-selection",
            "watchCallbacks": ["onInitialSelectionChanged"]
        },
        "isCollapsible": {
            "type": Boolean,
            "attr": "is-collapsible"
        },
        "isCompact": {
            "type": Boolean,
            "attr": "is-compact"
        },
        "isFramed": {
            "type": Boolean,
            "attr": "is-framed"
        },
        "isFrameExpanded": {
            "state": true
        },
        "isGeoLocEntity": {
            "type": Boolean,
            "attr": "is-geo-loc-entity"
        },
        "isLoading": {
            "type": Boolean,
            "attr": "is-loading"
        },
        "isLocal": {
            "type": Boolean,
            "attr": "is-local"
        },
        "isReadonly": {
            "type": Boolean,
            "attr": "is-readonly"
        },
        "isSelectAll": {
            "state": true
        },
        "isSelectionMode": {
            "type": Boolean,
            "attr": "is-selection-mode",
            "mutable": true
        },
        "items": {
            "type": "Any",
            "attr": "items",
            "watchCallbacks": ["onDataChanged"]
        },
        "keepSelection": {
            "type": Boolean,
            "attr": "keep-selection"
        },
        "loadMoreButton": {
            "type": Boolean,
            "attr": "load-more-button"
        },
        "markers": {
            "state": true
        },
        "model": {
            "type": "Any",
            "attr": "model"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "pageSize": {
            "type": Number,
            "attr": "page-size",
            "mutable": true
        },
        "progress": {
            "type": Number,
            "attr": "progress"
        },
        "progressbarAlignMode": {
            "type": String,
            "attr": "progressbar-align-mode"
        },
        "progressCss": {
            "type": String,
            "attr": "progress-css"
        },
        "pullToRefresh": {
            "method": true
        },
        "resetSearchText": {
            "method": true
        },
        "scrollable": {
            "type": Boolean,
            "attr": "scrollable"
        },
        "scrollItem": {
            "method": true
        },
        "search": {
            "type": String,
            "attr": "search"
        },
        "searchBarPlaceholder": {
            "type": String,
            "attr": "search-bar-placeholder"
        },
        "searchFieldOutsideComponent": {
            "type": Boolean,
            "attr": "search-field-outside-component"
        },
        "secondaryActions": {
            "type": "Any",
            "attr": "secondary-actions"
        },
        "secondaryActionsDropdown": {
            "type": Boolean,
            "attr": "secondary-actions-dropdown"
        },
        "selectedTags": {
            "type": "Any",
            "attr": "selected-tags"
        },
        "selection": {
            "state": true
        },
        "showActionsAsMore": {
            "type": Boolean,
            "attr": "show-actions-as-more"
        },
        "showCreate": {
            "type": Boolean,
            "attr": "show-create"
        },
        "showFilters": {
            "type": Boolean,
            "attr": "show-filters"
        },
        "showGlobalActions": {
            "type": Boolean,
            "attr": "show-global-actions"
        },
        "showSearch": {
            "type": Boolean,
            "attr": "show-search"
        },
        "slidesOptions": {
            "state": true
        },
        "sortsAndFilters": {
            "type": "Any",
            "attr": "sorts-and-filters",
            "mutable": true
        },
        "subheading": {
            "type": String,
            "attr": "subheading"
        },
        "tags": {
            "type": "Any",
            "attr": "tags"
        },
        "topActions": {
            "type": "Any",
            "attr": "top-actions"
        },
        "total": {
            "type": Number,
            "attr": "total"
        },
        "useTranslate": {
            "type": Boolean,
            "attr": "use-translate"
        },
        "valuesColor": {
            "type": "Any",
            "attr": "values-color"
        }
    }; }
    static get events() { return [{
            "name": "fetchData",
            "method": "fetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fieldFetchData",
            "method": "fieldFetchData",
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
            "name": "searchInputFocused",
            "method": "searchInputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "searchInputBlurred",
            "method": "searchInputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "searchInputEnterPressed",
            "method": "searchInputEnterPressed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "headingClicked",
            "method": "headingClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "displayTypeChange",
            "method": "displayTypeChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "addNewTagPressed",
            "method": "addNewTagPressed",
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
            "name": "sortsAndFiltersChange",
            "method": "sortsAndFiltersChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "sortsAndFiltersShowed",
            "method": "sortsAndFiltersShowed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "emptyResults",
            "method": "emptyResults",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "frameExpanded",
            "method": "frameExpanded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "swipeEnd",
            "method": "swipeEnd",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "viewMoreToggled",
            "method": "viewMoreToggled",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "entityCollapsed",
            "method": "entityCollapsed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "itemOptionSelected",
            "method": "itemOptionSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-grid:**/"; }
}

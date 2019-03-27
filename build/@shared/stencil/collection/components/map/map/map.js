import { isCurrentLanguageChinese, isWebGLSupported, closeModal, translate, showDirectionsActionSheet } from '../../../utils';
export class YooMapComponent {
    constructor() {
        this.useCluster = false;
        this.position = { longitude: 2.3522220, latitude: 48.856614 };
        this.showFullscreenControl = false;
        this.showLegend = false;
        this.filterGroups = [];
        this.legendColors = [
            { markerStatus: 'available', color: '#F2C83A' },
            { markerStatus: 'booked', color: '#1C76FC' },
            { markerStatus: 'validated', color: '#07ccc0' },
            { markerStatus: 'rejected', color: '#ef6e7f' },
            { markerStatus: 'tobevalidated', color: '#6A61FF' },
            { markerStatus: 'archived', color: '#3A3569' }
        ];
        this.fitToMarkers = true;
        this.showControls = true;
        this.showDirections = false;
        this.disableZoom = false;
        this.mapEntry = {};
        this.isModal = false;
        this.showGetDirectionsButton = false;
        this.isGridMap = false;
        this.gridMapCardCollapsed = true;
        this.forceReRender = false;
        this.isChinese = false;
    }
    // Listen to card list event to change position of the controls in the map-grid depending on whether
    // the card list is open or closed
    onCardListCollapsed(event) {
        let isCollapsed = event.detail;
        if (this.previousCollapseState) {
        }
        this.previousCollapseState = isCollapsed;
    }
    setProps(mapEntry) {
        // Needs to be tested
        this.mapEntry = Object.assign(this.mapEntry, mapEntry);
    }
    flyTo(longitude, latitude, zoom) {
        if (this.mapGL) {
            this.mapGL.flyTo(longitude, latitude, zoom);
        }
        else if (this.mapJS) {
            this.mapJS.flyTo(longitude, latitude, zoom);
        }
        //TODO: add AMap
    }
    getCenter() {
        if (this.mapGL) {
            return this.mapGL.getCenter();
        }
        else if (this.mapJS) {
            //this.mapJS.getCenter();
        }
        return null;
        //TODO: add AMap
    }
    componentWillLoad() {
        if (isCurrentLanguageChinese()) {
            this.isChinese = true;
        }
        this.zoom = this.isChinese ? 6 : 12;
        this.populateMapEntry();
    }
    onSelected(event) {
        event.stopPropagation();
        this.select.emit(event.detail);
    }
    onFilterGroupsChanged(event) {
        event.stopPropagation();
        this.filterGroupsChanged.emit(event.detail);
    }
    onFetchData(event) {
        event.stopPropagation();
        this.fetchMapData.emit(true);
    }
    isEmpty(object) {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    populateMapEntry() {
        if (this.isEmpty(this.mapEntry)) {
            this.mapEntry.markers = this.markers;
            this.mapEntry.useCluster = this.useCluster;
            this.mapEntry.currentLanguage = this.currentLanguage;
            this.mapEntry.position = this.position;
            this.mapEntry.zoom = this.zoom;
            this.mapEntry.minZoom = this.minZoom;
            this.mapEntry.maxZoom = this.maxZoom;
            this.mapEntry.showFullscreenControl = this.showFullscreenControl;
            // this.getPopupTemplate = mapEntry.getPopupTemplate;
            this.mapEntry.groupBy = this.groupBy;
            this.mapEntry.showLegend = this.showLegend;
            this.mapEntry.filterGroups = this.filterGroups;
            this.mapEntry.legendColors = this.legendColors;
            this.mapEntry.fitToMarkers = this.fitToMarkers;
            this.mapEntry.showControls = this.showControls;
            this.mapEntry.showDirections = this.showDirections;
            this.mapEntry.disableZoom = this.disableZoom;
            this.mapEntry.icon = this.icon;
        }
    }
    showGetDirectionsActionSheet() {
        let selectedIndex = this.markers.findIndex(marker => marker.selected === true);
        let address = this.markers[selectedIndex] && this.markers[selectedIndex].address ? this.markers[selectedIndex].address : '';
        let title = this.markers[selectedIndex] && this.markers[selectedIndex].title ? this.markers[selectedIndex].title : '';
        showDirectionsActionSheet(this.markers[selectedIndex].latitude, this.markers[selectedIndex].longitude, title, address)
            .then((action) => {
            switch (action) {
                case 'googlemaps':
                    this.useGoogleMaps.emit();
                    break;
                case 'applemaps':
                    this.useAppleMaps.emit();
                    break;
                case 'citymapper':
                    this.useCityMapper.emit();
                    break;
                case 'copyaddress':
                    this.useCopyAddress.emit();
                    break;
            }
        });
    }
    renderHeader() {
        return (h("yoo-ion-header", { class: "shadow", "no-border": true },
            h("yoo-ion-toolbar", { color: "light" },
                h("yoo-ion-buttons", { slot: "start" },
                    h("yoo-ion-button", { color: "dark", onClick: () => closeModal(null) },
                        h("yoo-icon", { slot: "icon-only", class: "yo-left" }))),
                h("yoo-ion-title", null, translate('MAP')),
                this.showGetDirectionsButton ?
                    h("yoo-ion-buttons", { slot: "end" },
                        h("yoo-ion-button", { color: "success", onClick: () => this.showGetDirectionsActionSheet() },
                            h("div", null, translate('DIRECTIONS')))) : null)));
    }
    renderMapGL() {
        return (h("yoo-map-gl", { class: {
                'grid-map': this.isGridMap,
                'grid-map-card-open': !this.gridMapCardCollapsed
            }, ref: (el) => this.mapGL = el, mapEntry: this.mapEntry, markers: this.markers, onSelect: (ev) => this.onSelected(ev), onFilterGroupsChanged: (ev) => this.onFilterGroupsChanged(ev), onFetchData: (ev) => this.onFetchData(ev) }));
    }
    renderMapJS() {
        return (h("yoo-map-js", { ref: (el) => this.mapJS = el, mapEntry: this.mapEntry, markers: this.markers, onSelect: (ev) => this.onSelected(ev), onFilterGroupsChanged: (ev) => this.onFilterGroupsChanged(ev) }));
    }
    renderAMap() {
        return (h("yoo-amap", { mapEntry: this.mapEntry },
            "onSelect=",
            (ev) => this.onSelected(ev),
            "onFilterGroupsChanged=",
            (ev) => this.onFilterGroupsChanged(ev)));
    }
    renderContent() {
        let isSupported = isWebGLSupported();
        return (h("div", { class: 'content-container' + (this.isModal ? ' modal-header' : '') }, this.isChinese ? this.renderAMap() : isSupported ? this.renderMapGL() : this.renderMapJS()));
    }
    render() {
        return [
            this.isModal ? this.renderHeader() : null,
            this.renderContent()
        ];
    }
    static get is() { return "yoo-map"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "currentLanguage": {
            "type": String,
            "attr": "current-language"
        },
        "disableZoom": {
            "type": Boolean,
            "attr": "disable-zoom"
        },
        "filterGroups": {
            "type": "Any",
            "attr": "filter-groups"
        },
        "fitToMarkers": {
            "type": Boolean,
            "attr": "fit-to-markers"
        },
        "flyTo": {
            "method": true
        },
        "forceReRender": {
            "state": true
        },
        "getCenter": {
            "method": true
        },
        "gridMapCardCollapsed": {
            "type": Boolean,
            "attr": "grid-map-card-collapsed"
        },
        "groupBy": {
            "type": String,
            "attr": "group-by"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "isChinese": {
            "state": true
        },
        "isGridMap": {
            "type": Boolean,
            "attr": "is-grid-map"
        },
        "isModal": {
            "type": Boolean,
            "attr": "is-modal"
        },
        "legendColors": {
            "type": "Any",
            "attr": "legend-colors"
        },
        "mapEntry": {
            "type": "Any",
            "attr": "map-entry"
        },
        "markers": {
            "type": "Any",
            "attr": "markers"
        },
        "maxZoom": {
            "type": Number,
            "attr": "max-zoom"
        },
        "minZoom": {
            "type": Number,
            "attr": "min-zoom"
        },
        "position": {
            "type": "Any",
            "attr": "position"
        },
        "setProps": {
            "method": true
        },
        "showControls": {
            "type": Boolean,
            "attr": "show-controls"
        },
        "showDirections": {
            "type": Boolean,
            "attr": "show-directions"
        },
        "showFullscreenControl": {
            "type": Boolean,
            "attr": "show-fullscreen-control"
        },
        "showGetDirectionsButton": {
            "type": Boolean,
            "attr": "show-get-directions-button"
        },
        "showLegend": {
            "type": Boolean,
            "attr": "show-legend"
        },
        "useCluster": {
            "type": Boolean,
            "attr": "use-cluster"
        },
        "zoom": {
            "type": Number,
            "attr": "zoom",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "select",
            "method": "select",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "filterGroupsChanged",
            "method": "filterGroupsChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fetchMapData",
            "method": "fetchMapData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "useAppleMaps",
            "method": "useAppleMaps",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "useGoogleMaps",
            "method": "useGoogleMaps",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "useCityMapper",
            "method": "useCityMapper",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "useCopyAddress",
            "method": "useCopyAddress",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "listCollapsed",
            "method": "onCardListCollapsed"
        }]; }
    static get style() { return "/**style-placeholder:yoo-map:**/"; }
}

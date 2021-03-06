import { isCordova, loadScript, generateFilterGroups, layersFromKeys, hasSameMarkers, querySelectorDeep } from '../../../utils';
export class YooAmapComponent {
    constructor() {
        this.filterGroups = [];
        this.mapEntry = {};
        this.isLoading = true;
        this.amapKey = '206fa92104679ea432b9f73d424409250';
        this.amapUrl = 'https://webapi.amap.com/maps?v=1.4.5&key=' + this.amapKey + '&plugin=AMap.MarkerClusterer';
        this.layers = [];
        this.markersByLayer = {};
        this.clusterByLayer = {};
        this.isLoaded = false;
        this.isDestroyed = false;
        this.legendsOld = { available: 'warning', booked: 'info', validated: 'success', rejected: 'danger', tobevalidated: 'royal', archived: 'dark' };
    }
    onMapEntryChanged(newMapEntry, oldMapEntry) {
        if (!hasSameMarkers(newMapEntry, oldMapEntry)) {
            // Re-initialize markers
            this.initMarkers();
        }
    }
    async componentDidLoad() {
        await this.initMap();
        this.isLoading = false;
    }
    componentDidUnload() {
        this.isDestroyed = true;
    }
    onToggleFilterGroup(filterGroup, ev) {
        filterGroup.visible = !filterGroup.visible;
        // if the <yoo-form-checkbox> element is pressed, toggle the container
        if (ev.target.tagName === 'YOO-FORM-CHECKBOX') {
            ev.target.checkPressed();
        }
        this.onFilterGroupsChange(filterGroup.visible, filterGroup);
    }
    getAMap() {
        if (window.AMap) {
            return Promise.resolve(true);
        }
        else {
            return loadScript(this.amapUrl).then(() => {
                return Promise.resolve(window.AMap);
            });
        }
    }
    async initMap() {
        if (this.isDestroyed) {
            return;
        }
        this.getAMap().then((aMap) => {
            if (aMap && aMap.Map) {
                this.map = new aMap.Map(querySelectorDeep(this.host, '#map-container'), {
                    center: [this.mapEntry.position.longitude, this.mapEntry.position.latitude],
                    zoom: this.mapEntry.zoom,
                    resizeEnable: true
                });
                this.isLoaded = true;
                this.initMarkers();
            }
        });
    }
    initMarkers() {
        if (this.isDestroyed) {
            return;
        }
        let aMap = window.AMap;
        if (this.mapEntry.markers && this.isLoaded) {
            this.clearClusters();
            this.populateLayers();
            this.layers.forEach(layerId => {
                let markers = this.mapEntry.markers.filter(m => {
                    if (this.mapEntry.groupBy) {
                        return m[this.mapEntry.groupBy] === layerId;
                    }
                    else {
                        return true;
                    }
                });
                this.markersByLayer[layerId] = markers;
            });
            if (this.mapEntry.useCluster) {
                Object.keys(this.markersByLayer).forEach(layerId => {
                    let markers = this.markersByLayer[layerId];
                    this.addCluster(layerId, markers, this.getIconUrl(layerId));
                });
            }
            else {
                // attach markers without clustering
                Object.keys(this.markersByLayer).forEach(layerId => {
                    let markers = this.markersByLayer[layerId];
                    markers.forEach(m => {
                        let aMarker = new aMap.Marker({
                            position: [m.longitude, m.latitude],
                            extData: m._id
                        });
                        aMarker.setMap(this.map);
                        this.attachMarkerClickHandler(aMarker);
                    });
                });
            }
        }
    }
    populateLayers() {
        this.layers = [];
        if (this.mapEntry.groupBy) {
            this.filterGroups = generateFilterGroups(this.mapEntry.markers, this.mapEntry.groupBy);
            this.layers = layersFromKeys(this.filterGroups);
        }
        else {
            this.layers.push('markers');
        }
    }
    clearClusters() {
        // clear map and remove all the markers by cluster layer
        this.map.clearMap();
        if (this.clusterByLayer) {
            Object.keys(this.clusterByLayer).forEach((layerId) => {
                let cluster = this.clusterByLayer[layerId];
                cluster.clearMarkers();
                cluster = null;
            });
        }
    }
    addCluster(layerId, markers, iconUrl) {
        let aMap = window.AMap;
        let aMarkers = [];
        markers.forEach(m => {
            let aMarker = new aMap.Marker({
                position: [m.longitude, m.latitude],
                icon: iconUrl,
                extData: m._id,
                offset: new aMap.Pixel(-15, -15)
            });
            aMarkers.push(aMarker);
            this.attachMarkerClickHandler(aMarker);
        });
        let styles = [{
                url: iconUrl,
                size: new aMap.Size(44, 44),
                offset: new aMap.Pixel(-22, -22),
                textColor: '#FFFFFF',
                textSize: 12
            }];
        let cluster = new aMap.MarkerClusterer(this.map, aMarkers, {
            gridSize: 80,
            styles: styles,
            zoomOnClick: false
        });
        this.clusterByLayer[layerId] = cluster;
        // listen to the click event on a marker
        cluster.on('click', (e) => {
            let markersId = e.markers.map(m => m.G.extData);
            let clickedMarkers = this.mapEntry.markers.filter(m => {
                return markersId.indexOf(m._id) > -1;
            });
            // for multiple markers, show up the first one
            this.select.emit(clickedMarkers);
        });
    }
    attachMarkerClickHandler(aMarker) {
        aMarker.on(isCordova() ? 'touchend' : 'click', (e) => {
            let markerId = e.target.F.extData;
            let clickedMarker = this.mapEntry.markers.filter(m => {
                return m._id === markerId;
            });
            this.select.emit(clickedMarker);
        });
    }
    onFilterGroupsChange(visible, filterGroup) {
        let visibility = visible ? 'visible' : 'none';
        filterGroup.visible = visible;
        let layerId = filterGroup.value;
        if (this.mapEntry.useCluster) {
            this.toggleMarkers(visibility, layerId, true);
        }
        else {
            this.toggleMarkers(visibility, layerId, false);
        }
        this.filterGroupsChanged.emit(this.filterGroups);
    }
    toggleMarkers(visibility, layerId, useCluster) {
        let markers = this.markersByLayer[layerId];
        if (useCluster) {
            let cluster = this.clusterByLayer[layerId];
            if (visibility === 'visible') {
                this.addCluster(layerId, markers, this.getIconUrl(layerId));
            }
            else {
                cluster.clearMarkers();
                cluster = null;
            }
        }
        else {
            markers.forEach(m => {
                if (visibility === 'visible') {
                    m.show();
                }
                else {
                    m.hide();
                }
            });
        }
    }
    getIconUrl(layerId) {
        let icon = '';
        if (this.mapEntry.legendColors) {
            this.mapEntry.legendColors.forEach(markerColor => {
                if (this.mapEntry.icon || markerColor.markerStatus === layerId) {
                    let oldColor = this.legendsOld[markerColor.markerStatus];
                    icon = 'marker_' + oldColor;
                }
            });
        }
        return './assets/markers/' + icon + '.svg';
    }
    render() {
        // let legendsNew = getOldCSSClasses();
        return (h("div", { class: "column-container" },
            h("div", { id: "map-container" }),
            this.isLoading ? h("yoo-loader", { class: "large" }) : null,
            this.mapEntry.showLegend && this.filterGroups && this.filterGroups.length > 0 ?
                h("nav", { class: "filter-group" }, this.filterGroups.map((f) => h("div", { class: "filter" })))
                : null,
            this.mapEntry.showDirections ? (this.mapEntry.markers && this.mapEntry.markers.length === 1 ?
                h("div", { class: "marker-info" },
                    h("div", { class: "title" }, this.mapEntry.markers[0].title),
                    h("div", { class: "address" }, this.mapEntry.markers[0].address)) : null) : null));
    }
    static get is() { return "yoo-amap"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "filterGroups": {
            "type": "Any",
            "attr": "filter-groups",
            "mutable": true
        },
        "host": {
            "elementRef": true
        },
        "isLoading": {
            "state": true
        },
        "mapEntry": {
            "type": "Any",
            "attr": "map-entry",
            "watchCallbacks": ["onMapEntryChanged"]
        }
    }; }
    static get events() { return [{
            "name": "filterGroupsChanged",
            "method": "filterGroupsChanged",
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
    static get style() { return "/**style-placeholder:yoo-amap:**/"; }
}

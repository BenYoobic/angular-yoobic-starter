import { uniqBy } from 'lodash-es';
import { loadScript, generateFilterGroups, layersFromKeys, querySelectorDeep } from '../../../utils';
export class YooMapJsComponent {
    constructor() {
        this.mapEntry = {};
        this.filterGroups = [];
        this.markers = [];
        this.isLoading = true;
        this.layers = [];
        this.clusterRadius = 50;
        this.isDestroyed = false;
        this.isLoaded = false;
        this.colorLegends = { available: 'accent', booked: 'warning', validated: 'success', rejected: 'danger', tobevalidated: 'info', archived: 'dark' };
    }
    onMarkersChanged() {
        this.addUnclusteredMarkers(window.L);
    }
    flyTo(longitude, latitude, zoom = 12) {
        if (isNaN(longitude) || isNaN(latitude)) {
            return;
        }
        if (this.map) {
            let center = this.map.getCenter();
            let currentZoom = this.map.getZoom();
            if (longitude !== center.lng || latitude !== center.lat || zoom !== currentZoom) {
                this.getMapbox().then(L => {
                    this.map.panTo(L.latLng(latitude, longitude));
                    let icon = L.divIcon({
                        className: 'marker success'
                    });
                    let marker = L.marker([latitude, longitude], {
                        icon: icon
                    });
                    this.map.addLayer(marker);
                    this.map.setZoom(zoom);
                });
            }
        }
    }
    componentWillLoad() {
        if (this.mapEntry.groupBy) {
            this.filterGroups = this.mapEntry.filterGroups ? this.mapEntry.filterGroups : generateFilterGroups(this.markers, this.mapEntry.groupBy);
        }
    }
    componentDidLoad() {
        this.isLoading = false;
        this.initMap();
    }
    componentDidUnload() {
        this.isDestroyed = true;
        if (this.map) {
            this.map.remove();
        }
    }
    onToggleFilterGroup(event) {
        let eventFilter = event.detail;
        this.filterGroups = this.filterGroups.map(filter => {
            if (filter.value === eventFilter.value) {
                filter.visible = !filter.visible;
                return filter;
            }
            return filter;
        });
        this.onFilterGroupsChange();
    }
    getMapbox() {
        if (window.L) {
            return Promise.resolve(window.L);
        }
        else {
            // loading the mapbox JS
            return loadScript('https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js').then(() => {
                return Promise.resolve(window.L);
            });
        }
    }
    initMap() {
        if (this.isDestroyed) {
            return;
        }
        // L --> handler to access Leaftet
        this.getMapbox().then(L => {
            // validate the mapbox-js token
            if (L.mapbox) {
                L.mapbox.accessToken = 'pk.eyJ1IjoieW9vYmljIiwiYSI6ImNpcTNxaGgwYzAwNjhodm5rdDRmM3JtMmwifQ.Ro3b2vKP5fMMd8ibPKy65A';
            }
            this.map = new L.mapbox.map(querySelectorDeep(this.host, '.map-container'), 'mapbox.streets');
            this.popup = new L.popup({
                closeButton: false,
                closeOnClick: true
            });
            this.map.on('load', () => {
                // set zoom after loading, otherwise this method is never called
                this.map.setZoom(this.mapEntry.zoom);
                this.map.setView(L.latLng(this.mapEntry.position.latitude, this.mapEntry.position.longitude));
                this.isLoaded = true;
                // add a new control here
                if (this.mapEntry.showControls) {
                    this.addControls(L);
                }
                // setup yoobic custom map styles
                let styleLayer = L.mapbox.styleLayer('mapbox://styles/yoobic/ciq7yppji0085cqm7c0np246c');
                this.map.addLayer(styleLayer);
                this.initLanguage();
                this.initMarkers();
                if (this.mapEntry.disableZoom) {
                    // disable the zoom with the JS API - scrollWheelZoom is a property of map.options
                    this.map.scrollWheelZoom.disable();
                }
                if (this.mapEntry.showDirections) {
                    this.addDirections('mapbox.cycling');
                }
            });
        });
    }
    addControls(L) {
        let zoomControl = L.control.zoom({
            position: 'topright',
            zoomInText: '+',
            zoomOutText: '-'
        });
        this.map.addControl(zoomControl);
    }
    initLanguage() {
    }
    initMarkers() {
        if (this.isDestroyed) {
            return;
        }
        this.getMapbox().then(L => {
            let coords = this.markers.map(m => ([m.longitude, m.latitude]));
            coords = uniqBy(coords, (c) => JSON.stringify(c));
            if (this.mapEntry.fitToMarkers && coords.length > 1) {
                // fit to markers
                this.fitToMarkers(L);
            }
            else if (this.mapEntry.fitToMarkers && coords.length === 1) {
                this.flyTo(this.markers[0].longitude, this.markers[0].latitude, 16);
            }
            if (this.markers && this.isLoaded) {
                // let originalFilterGroups = this.mapEntry.filterGroups || [];
                this.layers = [];
                if (this.mapEntry.groupBy) {
                    this.layers = layersFromKeys(this.filterGroups);
                }
                else {
                    this.layers.push('markers');
                }
                this.layers = this.layers.slice();
                if (this.mapEntry.groupBy) {
                    // create the cluster groups and add to map
                    this.createClusterGroup(this.layers);
                }
                else {
                    this.addUnclusteredMarkers(L);
                }
            }
        });
    }
    fitToMarkers(L) {
        let bounds = L.latLngBounds(L.latLng(this.markers[0].latitude, this.markers[0].longitude), L.latLng(this.markers[1].latitude, this.markers[1].longitude));
        this.markers.forEach(function (m) {
            bounds.extend(L.latLng(m.latitude, m.longitude));
        });
        if (bounds.getNorth() !== bounds.getSouth()) {
            try {
                this.map.fitBounds(bounds);
            }
            catch (err) { }
        }
    }
    createClusterGroup(clusters = []) {
        this.getMapbox().then(L => {
            loadScript('https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/leaflet.markercluster.js').then(() => {
                if (L.MarkerClusterGroup && this.mapEntry.legendColors) {
                    clusters.forEach(cluster => {
                        let color = this.getColor(cluster);
                        let markers = this.createCluster(L, cluster, color);
                        this.map.addLayer(markers);
                    });
                }
            });
        });
    }
    createCluster(L, status, color) {
        if (this.mapEntry.groupBy) {
            let cluster = new L.MarkerClusterGroup({
                iconCreateFunction: (c) => {
                    return L.divIcon({
                        html: `<div class="${status}-cluster">${c.getChildCount()}</div>`,
                        className: color
                    });
                }
            });
            this.addClusteredMarkers(L, status, color, cluster);
            return cluster;
        }
    }
    addUnclusteredMarkers(L) {
        this.markers.forEach((marker) => {
            let title = marker.title;
            let latitude = marker.latitude;
            let longitude = marker.longitude;
            let icon = L.divIcon({
                className: `marker ${marker.selected ? `gradient_success` : 'plain'}`
            });
            let markerToAdd = L.marker([latitude, longitude], {
                icon: icon
            });
            if (title) {
                markerToAdd.bindPopup(title);
            }
            markerToAdd.on('click', (event) => this.handleUnclusteredMarkerClick(event, L, marker));
            this.map.addLayer(markerToAdd);
        });
    }
    handleUnclusteredMarkerClick(event, L, marker) {
        this.markers = this.markers.map((markerUnselect) => {
            markerUnselect.selected = false;
            return markerUnselect;
        });
        // Always references the marker that was clicked without the need to check
        marker.selected = true;
        this.addUnclusteredMarkers(L);
        this.select.emit([marker]);
    }
    // removeMarkerLayers() {
    //     for (let key in this.map._layers) {
    //         // Remove only clusters which are feature groups
    //         if (this.map._layers[key].options.icon) {
    //             this.map.removeLayer(this.map._layers[key]);
    //         }
    //     }
    // }
    addClusteredMarkers(L, status, color, cluster) {
        let filteredMarkers = this.markers.filter((marker) => {
            return marker.status === status;
        });
        filteredMarkers.forEach(marker => {
            let title = marker.title;
            let latitude = marker.latitude;
            let longitude = marker.longitude;
            let icon = L.divIcon({
                className: `${color} marker`
            });
            let markerToAdd = L.marker([latitude, longitude], {
                icon: icon
            });
            markerToAdd.bindPopup(title);
            markerToAdd.on('click', (event) => this.handleClusterMarkerClick(event, L));
            cluster.addLayer(markerToAdd);
        });
    }
    handleClusterMarkerClick(ev, L) {
        let properties = [];
        let pointsInCluster = this.markers.filter(mm => {
            let pointPixels = this.map.project(L.latLng(mm.latitude, mm.longitude));
            let clickPixels = this.map.project(ev.latlng);
            let pixelDistance = Math.sqrt(Math.pow(clickPixels.x - pointPixels.x, 2) +
                Math.pow(clickPixels.y - pointPixels.y, 2));
            return (Math.abs(pixelDistance) <= this.clusterRadius);
        });
        properties = properties.concat(pointsInCluster);
        this.select.emit(properties);
    }
    getColor(cluster) {
        let color = '';
        if (this.mapEntry.legendColors) {
            this.mapEntry.legendColors.forEach(markerColor => {
                if (markerColor.markerStatus === cluster) {
                    color = this.colorLegends[markerColor.markerStatus];
                }
            });
        }
        return color;
    }
    addDirections(profile) {
        this.getMapbox().then(L => {
            loadScript('https://api.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.4.0/mapbox.directions.js').then(() => {
                let directions = L.mapbox.directions({
                    profile: profile
                });
                let directionsLayer = L.mapbox.directions.layer(directions);
                directionsLayer.addTo(this.map);
                let directionsInputControl = L.mapbox.directions.inputControl('inputs', directions);
                directionsInputControl.addTo(this.map);
                let directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions);
                directionsErrorsControl.addTo(this.map);
                let directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions);
                directionsRoutesControl.addTo(this.map);
                let directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions);
                directionsInstructionsControl.addTo(this.map);
            });
        });
    }
    removeFeatureGroupLayers() {
        for (let key in this.map._layers) {
            // Remove only clusters which are feature groups
            if (this.map._layers[key]._featureGroup) {
                this.map.removeLayer(this.map._layers[key]);
            }
        }
    }
    onFilterGroupsChange() {
        this.getMapbox().then(L => {
            loadScript('https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/leaflet.markercluster.js').then(() => {
                if (this.mapEntry.legendColors) {
                    // remove all feature layers of the map
                    this.removeFeatureGroupLayers();
                    for (let filter of this.filterGroups) {
                        // restore the feature layers for the checked markers
                        if (filter.visible === true) {
                            // pass L to avoid re-loading MarkerClusterGroup script multiple times
                            let color = this.getColor(filter.value);
                            let markers = this.createCluster(L, filter.value, color);
                            this.map.addLayer(markers);
                        }
                    }
                }
                this.filterGroupsChanged.emit(this.filterGroups);
            });
        });
    }
    render() {
        return (h("div", { class: "column-container" },
            h("div", { class: "map-container" }),
            this.mapEntry.showDirections ? [
                h("div", { id: "inputs" }),
                h("div", { id: "errors" }),
                h("div", { class: "directions-container" },
                    h("div", { id: "routes" }),
                    h("div", { id: "instructions" }))
            ]
                : null,
            this.isLoading ? h("yoo-loader", { class: "large" }) : null,
            this.mapEntry.showLegend && this.filterGroups && this.filterGroups.length > 0 ?
                h("yoo-map-legend", { filterGroups: this.filterGroups, onFilterClicked: (ev) => this.onToggleFilterGroup(ev) })
                : null,
            this.mapEntry.showDirections ? (this.markers && this.markers.length === 1 ?
                h("div", { class: "marker-info" },
                    h("div", { class: "title" }, this.markers[0].title),
                    h("div", { class: "address" }, this.markers[0].address)) : null) : null));
    }
    static get is() { return "yoo-map-js"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "filterGroups": {
            "type": "Any",
            "attr": "filter-groups",
            "mutable": true
        },
        "flyTo": {
            "method": true
        },
        "host": {
            "elementRef": true
        },
        "isLoading": {
            "state": true
        },
        "mapEntry": {
            "type": "Any",
            "attr": "map-entry"
        },
        "markers": {
            "type": "Any",
            "attr": "markers",
            "mutable": true,
            "watchCallbacks": ["onMarkersChanged"]
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
    static get style() { return "/**style-placeholder:yoo-map-js:**/"; }
}

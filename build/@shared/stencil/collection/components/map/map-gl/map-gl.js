import { flatten, uniqBy, take } from 'lodash-es';
import { isAndroid, isCordova, generateFilterGroups, layersFromKeys, isWeb, getMapCSSClasses, isMarkersLayer, isSelectedMarkersLayer } from '../../../utils';
const mapboxgl = window.mapboxgl;
export class YooMapGLComponent {
    constructor() {
        this.filterGroups = [];
        this.mapEntry = {};
        this.markers = [];
        this.isLoading = true;
        this.isMaximized = false;
        this.layers = [];
        this.clusterRadius = 50;
        this.clusterCircleSize = 25;
        this.isDestroyed = false;
        this.isLoaded = false;
        this.clusterColors = {
            available: '#1FB6FF',
            tobevalidated: '#fc459e',
            validated: '#04CC99',
            rejected: '#ff625f',
            booked: '#ff6402',
            archived: '#2b3648'
        };
    }
    onMarkersChanged() {
        this.addGeoJSONSources();
    }
    flyTo(longitude, latitude, zoom = 16) {
        if (this.map) {
            let center = this.map.getCenter();
            let currentZoom = this.map.getZoom();
            if (longitude !== center.lng || latitude !== center.lat || zoom !== currentZoom) {
                this.map.flyTo({ center: { lng: longitude, lat: latitude }, zoom: zoom });
            }
        }
    }
    getCenter() {
        if (this.map) {
            return Promise.resolve(this.map.getCenter());
        }
    }
    componentWillLoad() {
        if (this.mapEntry.filterGroups) {
            this.filterGroups = this.mapEntry.filterGroups;
        }
        this.iconColors = getMapCSSClasses();
    }
    componentDidLoad() {
        const ANIMATION_DURATION = isCordova ? 500 : 0;
        this.isLoading = false;
        mapboxgl.accessToken = 'pk.eyJ1IjoieW9vYmljIiwiYSI6ImNpcTNxaGgwYzAwNjhodm5rdDRmM3JtMmwifQ.Ro3b2vKP5fMMd8ibPKy65A';
        setTimeout(() => {
            this.initMap();
        }, ANIMATION_DURATION);
    }
    componentDidUnload() {
        this.isDestroyed = true;
        if (this.map) {
            this.map.remove();
        }
    }
    onToggleFilterGroup(event) {
        if (event) {
            let filterGroup = event.detail;
            filterGroup.visible = !filterGroup.visible;
            this.onFilterGroupsChange(filterGroup.visible, filterGroup);
        }
    }
    initMap() {
        if (this.isDestroyed) {
            return;
        }
        let center = [this.mapEntry.position.longitude, this.mapEntry.position.latitude];
        this.mapCenter = center;
        // Basic map setup
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/yoobic/ciq7yppji0085cqm7c0np246c',
            center,
            maxZoom: this.mapEntry.maxZoom,
            minZoom: this.mapEntry.minZoom,
            zoom: this.mapEntry.zoom
        });
        if (this.mapEntry.showControls) {
            this.addControls();
        }
        this.popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true
        });
        // Map Event Handling below
        this.map.on('load', () => {
            this.isLoaded = true;
            this.initMarkers();
            if (this.mapEntry.disableZoom) {
                this.map.scrollZoom.disable();
            }
        });
        this.map.on('mousemove', (event) => {
            // this.handleMouseMove(event);
        });
        this.map.on(isCordova() ? 'touchend' : 'click', (event) => {
            this.handleMapClick(event);
        });
        this.map.on('moveend', (event) => {
            this.handleMapMove(event);
        });
    }
    handleMapMove(event) {
        const [prevLongitude, prevLatitude] = this.mapCenter;
        const currentCenter = this.map.getCenter();
        const currentLongitude = currentCenter.lng;
        const currentLatitude = currentCenter.lat;
        const newBounds = this.map.getBounds();
        if (this.currentBounds) {
            const southWest = this.currentBounds._sw;
            const swLongitude = southWest.lng;
            const swLatitude = southWest.lat;
            const northEast = this.currentBounds._ne;
            const neLongitude = northEast.lng;
            const neLatitude = northEast.lat;
            // Check whether previous center is inside the updated bounds
            if (prevLatitude > swLatitude && prevLatitude < neLatitude && prevLongitude > swLongitude && prevLongitude < neLongitude) {
                this.currentBounds = newBounds;
                return;
            }
        }
        this.fetchData.emit(true);
        this.mapCenter = [currentLongitude, currentLatitude];
        this.currentBounds = newBounds;
    }
    isFeatureMarker(featureMarker, markerToCompare) {
        return featureMarker.longitude === markerToCompare.longitude && featureMarker.latitude === markerToCompare.latitude && featureMarker.selected === markerToCompare.selected;
    }
    handleMapClick(event) {
        let renderedFeatures = this.map.queryRenderedFeatures(event.point, { layers: this.layers });
        if (renderedFeatures.length) {
            let properties = [];
            renderedFeatures.forEach((feature) => {
                let layer = feature.layer.id;
                if (isMarkersLayer(layer)) {
                    this.markers.map(marker => {
                        if (this.isFeatureMarker(feature.properties, marker)) {
                            marker.selected = true;
                            this.select.emit([marker]);
                            this.flyTo(marker.longitude, marker.latitude, 16);
                            return marker;
                        }
                        else {
                            marker.selected = false;
                            return marker;
                        }
                    });
                }
                else if (isSelectedMarkersLayer(layer)) {
                    this.markers.map(marker => {
                        if (this.isFeatureMarker(feature.properties, marker) && marker.selected) {
                            marker.selected = false;
                            return marker;
                        }
                        else {
                            return marker;
                        }
                    });
                }
                else if (feature.properties.cluster) {
                    // let clusterId = feature.properties.cluster_id;
                    // console.log('coordinates', feature.geometry.coordinates);
                    // this.map.getSource('data_cluster_validated').getClusterExpansionZoom(clusterId, (err, zoom) => {
                    //     if (err) { return; }
                    //     this.map.easeTo({
                    //         center: feature.geometry.coordinates,
                    //         zoom
                    //     });
                    // });
                    let statusLayer = feature.source.split('_')[1];
                    properties = this.handleClusterClick(event, properties).filter((property) => {
                        return property.status === statusLayer;
                    });
                    this.select.emit(properties);
                }
                else {
                    properties = this.handleMarkerClick(renderedFeatures, properties);
                    this.select.emit(properties);
                }
            });
            this.addGeoJSONSources();
        }
    }
    handleMarkerClick(renderedFeatures, singleMarker) {
        if (this.map.getLayer('point')) {
            this.map.setLayoutProperty('point', 'visibility', 'visible');
        }
        let singlePoint = this.map.getSource('single-point'); //GeoJSONSource
        if (singlePoint) {
            singlePoint.setData({
                type: 'Point',
                coordinates: [renderedFeatures[0].properties.longitude, renderedFeatures[0].properties.latitude]
            });
        }
        return singleMarker.concat(renderedFeatures.map(f => f.properties));
    }
    handleClusterClick(event, markerClusterPoints) {
        let pointsInCluster = this.markers.filter(m => {
            // Pixel coordinates relative to map container
            let pointPixels = this.map.project(new mapboxgl.LngLat(m.longitude, m.latitude));
            let pixelDistance = Math.sqrt(Math.pow(event.point.x - pointPixels.x, 2) +
                Math.pow(event.point.y - pointPixels.y, 2));
            return Math.abs(pixelDistance) <= this.clusterRadius;
        });
        return markerClusterPoints.concat(pointsInCluster);
    }
    handleMouseMove(event) {
        let features = this.map.queryRenderedFeatures(event.point);
        this.map.getCanvas().style.cursor = (features && features.length) ? 'pointer' : '';
        if (!features.length) {
            this.popup.remove();
            return;
        }
        let uniqFeatures = uniqBy(features.map(f => f.properties), (p) => p.id);
        if (uniqFeatures.length > 0 && uniqFeatures[0].cluster !== true) {
            this.popup.setLngLat([uniqFeatures[0].longitude, uniqFeatures[0].latitude]).setHTML(this.getPopupTemplate(uniqFeatures)).addTo(this.map);
        }
    }
    addControls() {
        if (isWeb()) {
            this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        }
        let geolocateCtrl = new mapboxgl.GeolocateControl({
            trackUserLocation: true,
            showUserLocation: true
        });
        this.map.addControl(geolocateCtrl, 'bottom-left');
    }
    initMarkers() {
        if (this.isDestroyed) {
            return;
        }
        if (this.markers && this.isLoaded) {
            let originalFilterGroups = this.mapEntry.filterGroups || [];
            this.removeLayers();
            this.layers = [];
            if (this.mapEntry.groupBy) {
                if (!this.mapEntry.filterGroups) {
                    this.filterGroups = generateFilterGroups(this.markers, this.mapEntry.groupBy);
                }
                this.layers = layersFromKeys(this.filterGroups);
            }
            else {
                // if nothing to group by, there will be a single marker's layer
                this.layers.push('markers');
                this.layers.push('markers_selected');
            }
            this.layers = this.layers.slice();
            // Construct the GeoJSON data to feed to the map - get the markers for each layer
            this.addGeoJSONSources();
            // Fit map to markers
            let coords = this.markers.map(m => ([m.longitude, m.latitude]));
            coords = uniqBy(coords, (c) => JSON.stringify(c));
            if (this.mapEntry.fitToMarkers && coords.length > 1) {
                this.fitToMarkers();
            }
            else if (this.mapEntry.fitToMarkers && coords.length === 1) {
                // if only one marker - flyTo its location
                setTimeout(() => {
                    this.flyTo(this.markers[0].longitude, this.markers[0].latitude, 16);
                }, 500);
            }
            this.currentBounds = this.map.getBounds();
            // add layers to the map to make markers visible
            if (this.mapEntry.useCluster) {
                this.addClusteredLayers();
            }
            else {
                this.addUnClusteredLayers();
            }
            // set original filter-groups
            this.setOriginalFilterGroups(originalFilterGroups);
            if (isAndroid()) {
                this.onResize();
            }
        }
    }
    removeLayers() {
        // re-initialize the map layers
        this.layers.forEach(l => {
            if (this.map.getLayer(l)) {
                this.map.removeLayer(l);
            }
        });
    }
    addGeoJSONSources() {
        this.layers.forEach(layerId => {
            let data = {
                'type': 'FeatureCollection',
                'features': this.markers.filter(m => {
                    if (this.mapEntry.groupBy) {
                        return m[this.mapEntry.groupBy] === layerId;
                    }
                    else if (isMarkersLayer(layerId) && !m.selected) {
                        return true;
                    }
                    else if (isSelectedMarkersLayer(layerId) && m.selected) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }).map((m) => {
                    return {
                        'type': 'Feature',
                        'properties': m,
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [m.longitude, m.latitude]
                        }
                    };
                })
            };
            if (this.map.getSource('data_' + layerId)) {
                this.map.getSource('data_' + layerId).setData(data);
            }
            else {
                //  Add the data source to the map
                this.map.addSource('data_' + layerId, { type: 'geojson', 'data': data, cluster: this.mapEntry.useCluster, clusterMaxZoom: 20, clusterRadius: this.clusterRadius });
            }
        });
    }
    addUnClusteredLayers() {
        this.layers.forEach(layerId => {
            let config = {
                'id': layerId,
                'type': 'symbol',
                'source': 'data_' + layerId
            };
            config.layout = {
                'icon-image': isMarkersLayer(layerId) ? 'marker_plain' : isSelectedMarkersLayer(layerId) ? 'marker_gradient_success' : 'marker',
                'icon-size': 1
            };
            if (this.mapEntry.groupBy) {
                config.filter = ['==', this.mapEntry.groupBy, layerId];
            }
            this.map.addLayer(config);
        });
    }
    fitToMarkers() {
        let bounds = new mapboxgl.LngLatBounds(new mapboxgl.LngLat(this.markers[0].longitude, this.markers[0].latitude), new mapboxgl.LngLat(this.markers[1].longitude, this.markers[1].latitude));
        this.markers.forEach(m => {
            bounds.extend(new mapboxgl.LngLat(m.longitude, m.latitude));
        });
        // fit to marker bounds
        if (bounds.getNorth() !== bounds.getSouth()) {
            setTimeout(() => {
                this.map.fitBounds(bounds, { padding: 10 });
            }, 500);
        }
    }
    removeSinglePointSrc() {
        if (this.map.getSource('single-point')) {
            this.map.removeSource('single-point');
        }
    }
    removePointLayer() {
        if (this.map.getLayer('point')) {
            this.map.removeLayer('point');
        }
    }
    addClusteredLayers() {
        // Display the earthquake data in three layers, each filtered to a range of count values. Each range gets a different fill color.
        let clusteredLayers = this.layers.map((layerId) => {
            let color = this.getColor(layerId);
            let icon = this.getIcon(layerId);
            // Add layer for unclustered single markers
            this.map.addLayer({
                'id': 'unclustered_' + layerId,
                'type': 'symbol',
                'source': 'data_' + layerId,
                'filter': ['!has', 'point_count'],
                'layout': { 'icon-image': icon }
            });
            // Add cluster layer colors
            this.map.addLayer({
                'id': 'cluster_' + layerId,
                'type': 'circle',
                'source': 'data_' + layerId,
                'paint': { 'circle-color': color, 'circle-radius': this.clusterCircleSize, 'circle-opacity': 0.7 },
                'filter': ['>=', 'point_count', 0]
            });
            // Add a layer for the clusters' count labels
            this.map.addLayer({
                'id': 'cluster_count_' + layerId,
                'type': 'symbol',
                'source': 'data_' + layerId,
                'paint': { 'text-color': '#FFFFFF' },
                'filter': ['>=', 'point_count', 0],
                'layout': { 'text-field': '{point_count}', 'text-size': 12 }
            });
            // return the newly created layers
            return ['unclustered_' + layerId, 'cluster_' + layerId, 'cluster_count_' + layerId];
        });
        this.layers = flatten(clusteredLayers);
    }
    setOriginalFilterGroups(originalFilterGroups) {
        this.filterGroups.forEach(filter => {
            let original = originalFilterGroups.find(o => o.value === filter.value);
            if (original) {
                filter.visible = original.visible;
                this.onFilterGroupsChange(original.visible, original);
            }
        });
    }
    getColor(layerId) {
        // Dark
        let color = '#2b3648';
        if (this.clusterColors[layerId]) {
            color = this.clusterColors[layerId];
        }
        return color;
    }
    getIcon(layerId) {
        let icon = 'marker';
        if (this.mapEntry.legendColors) {
            this.mapEntry.legendColors.forEach(markerColor => {
                if (this.mapEntry.icon || markerColor.markerStatus === layerId) {
                    let iconColor = this.iconColors[markerColor.markerStatus];
                    icon = 'marker_' + iconColor;
                }
            });
        }
        return icon;
    }
    getPopupTemplate(properties, collectionName) {
        let retVal = '';
        const MISSIONS_TO_DISPLAY = 8;
        if (collectionName === 'missions') {
            take(properties, MISSIONS_TO_DISPLAY).forEach(p => {
                let status = ' - ' + 'AVAILABlE';
                let validated = p.status !== 'finished' ? '' : ' - ' + (p.validated === true ? 'VALIDATED' : p.validated === false ? 'REJECTED' : 'TOBEVALIDATED');
                retVal += `<div class="popup-title">${p.title || ''}${status}${validated}</div>`;
            });
        }
        else {
            retVal = `<div class="popup-title">${properties[0].title}</div>`;
        }
        retVal += `<p class="popup-subtitle">${properties[0].address || ''}</p>`;
        return retVal;
    }
    onFilterGroupsChange(visible, layer) {
        let visibility = visible ? 'visible' : 'none';
        layer.visible = visible;
        if (this.map) {
            if (this.mapEntry.useCluster) {
                this.map.setLayoutProperty('unclustered_' + layer.value, 'visibility', visibility);
                this.map.setLayoutProperty('cluster_' + layer.value, 'visibility', visibility);
                this.map.setLayoutProperty('cluster_count_' + layer.value, 'visibility', visibility);
            }
            else {
                this.map.setLayoutProperty(layer.value, 'visibility', visibility);
            }
        }
        this.filterGroups = this.filterGroups.slice();
        this.filterGroupsChanged.emit(this.mapEntry.filterGroups);
    }
    onResize() {
        this.map.resize();
    }
    onToggleSize() {
        this.isMaximized = !this.isMaximized;
        this.sizeToggled.emit(this.isMaximized);
    }
    renderLegend() {
        return (h("yoo-map-legend", { filterGroups: this.filterGroups, onFilterClicked: (ev) => this.onToggleFilterGroup(ev) }));
    }
    shouldShowLegend() {
        return this.mapEntry.showLegend && this.filterGroups && this.filterGroups.length > 0;
    }
    render() {
        let mapStyles = {
            height: '100%',
            width: '100%'
        };
        return ([
            h("div", { class: "column-container" },
                h("div", { class: "map-container", style: mapStyles, ref: (el) => this.mapContainer = el }),
                this.isLoading && h("yoo-loader", { class: "large" }),
                this.shouldShowLegend() && this.renderLegend(),
                this.mapEntry.showDirections && this.markers && this.markers.length === 1 &&
                    h("div", { class: "marker-info" },
                        h("div", { class: "title" }, this.markers[0].title),
                        h("div", { class: "address" }, this.markers[0].address)),
                this.mapEntry.showFullscreenControl &&
                    h("div", { class: `control control-size`, onClick: () => this.onToggleSize() },
                        h("yoo-icon", { class: this.isMaximized ? 'yo-minimize' : 'yo-maximize' })))
        ]);
    }
    static get is() { return "yoo-map-gl"; }
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
        "getCenter": {
            "method": true
        },
        "host": {
            "elementRef": true
        },
        "isLoading": {
            "state": true
        },
        "isMaximized": {
            "state": true
        },
        "mapEntry": {
            "type": "Any",
            "attr": "map-entry"
        },
        "markers": {
            "type": "Any",
            "attr": "markers",
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
        }, {
            "name": "fetchData",
            "method": "fetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "sizeToggled",
            "method": "sizeToggled",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-map-gl:**/"; }
}

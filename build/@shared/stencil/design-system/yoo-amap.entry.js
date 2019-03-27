const h = window.DesignSystem.h;

import { J as hasSameMarkers, K as loadScript, L as querySelectorDeep, M as generateFilterGroups, N as layersFromKeys, k as isCordova, O as isCurrentLanguageChinese, P as showDirectionsActionSheet, Q as closeModal, m as translate, R as isWebGLSupported, S as getMapCSSClasses, T as isMarkersLayer, U as isSelectedMarkersLayer, V as uniqBy, W as isWeb, v as isAndroid, X as flatten, Y as take } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooAmapComponent {
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
    static get style() { return ":host {\n  display: block;\n  width: 100%;\n  height: 100%; }\n  :host .amap-copyright, :host .version {\n    font-family: Arial, sans-serif; }\n  :host .vml {\n    behavior: url(#default#VML);\n    display: inline-block;\n    position: absolute; }\n  :host .amap-sug-result {\n    position: fixed;\n    z-index: 1024;\n    background-color: #fefefe;\n    border: 1px solid #d1d1d1; }\n  :host .auto-item:hover {\n    background-color: #CAE1FF; }\n  :host .auto-item {\n    font-size: 12px;\n    cursor: pointer;\n    padding: 4px; }\n  :host .auto-item-span {\n    color: #C1C1C1;\n    padding-left: 4px; }\n  :host .amap-custom {\n    top: 0;\n    left: 0;\n    position: absolute; }\n  :host .amap-container img {\n    max-width: none !important;\n    max-height: none !important; }\n  :host .amap-container {\n    touch-action: none;\n    position: relative;\n    overflow: hidden;\n    background: url(data:image/png;base64,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) #fcf9f2;\n    -ms-touch-action: none; }\n  :host .amap-drags, :host .amap-layers {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    overflow: hidden; }\n  :host .amap-layer img {\n    pointer-events: none; }\n  :host .amap-e, :host .amap-maps {\n    width: 100%;\n    height: 100%; }\n  :host .amap-e, :host .amap-layers, :host .amap-maps, :host .amap-tile, :host .amap-tile-container {\n    position: absolute;\n    left: 0;\n    top: 0;\n    overflow: hidden; }\n  :host .amap-context, :host .amap-graph, :host .amap-marker, :host .amap-markers, :host .amap-overlays, :host .amap-statics {\n    position: absolute;\n    left: 0;\n    top: 0; }\n  :host .amap-layers {\n    z-index: 0; }\n  :host .amap-overlays {\n    z-index: 110;\n    cursor: default; }\n  :host .amap-info, :host .amap-markers {\n    z-index: 120; }\n  :host .amap-statics {\n    z-index: 140; }\n  :host .amap-controls {\n    z-index: 150; }\n  :host .amap-copyright, :host .amap-logo {\n    position: absolute;\n    bottom: 0;\n    z-index: 160;\n    line-height: 16px; }\n  :host .version {\n    font-size: 8px; }\n  :host .amap-copyright {\n    display: block !important;\n    left: 70px;\n    height: 16px;\n    font-size: 11px; }\n  :host .google-copyright .google_logo {\n    vertical-align: middle;\n    width: 46px;\n    height: 18px; }\n  :host .amap-logo {\n    left: 0;\n    height: 17px;\n    margin: 0 1px; }\n  :host .amap-logo img {\n    width: 67px !important;\n    height: 16px !important;\n    border: none;\n    vertical-align: baseline !important; }\n  :host .amap-icon {\n    position: relative;\n    z-index: 1;\n    overflow: hidden; }\n  :host .amap-icon img {\n    position: absolute;\n    z-index: -1; }\n  :host .amap-marker-label {\n    position: absolute;\n    z-index: 2;\n    border: 1px solid #00f;\n    background-color: #fff;\n    white-space: nowrap;\n    cursor: default;\n    padding: 3px;\n    font-size: 12px;\n    line-height: 14px; }\n  :host .amap-info, :host .amap-menu {\n    z-index: 140;\n    position: absolute; }\n  :host .amap-info {\n    left: 0; }\n  :host .amap-info-close {\n    position: absolute;\n    right: 5px;\n    top: 5px;\n    color: #C3C3C3;\n    text-decoration: none;\n    font: 700 16px/14px Tahoma, Verdana, sans-serif;\n    width: 14px;\n    height: 14px; }\n  :host .amap-info-sharp, :host .amap-marker-content {\n    position: relative; }\n  :host .amap-info-outer, :host .amap-menu-outer {\n    -webkit-box-shadow: 0 3px 14px rgba(0, 0, 100, 0.6);\n    box-shadow: 0 3px 14px rgba(0, 0, 100, 0.6);\n    background: #fff;\n    border-radius: 2px;\n    padding: 1px;\n    text-align: left;\n    border: 1px solid silver; }\n  :host .amap-info-outer:hover, :host .amap-menu-outer:hover {\n    -webkit-box-shadow: 0 3px 14px rgba(0, 0, 0, 0.75);\n    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.75); }\n  :host .amap-info-content {\n    background: #fff;\n    border: 1px solid #ccc;\n    padding: 10px 18px 10px 10px;\n    line-height: 1.4;\n    overflow: auto; }\n  :host .amap-info {\n    width: 320px; }\n  :host .amap-info-sharp {\n    height: 23px;\n    margin: 0 auto;\n    overflow: hidden;\n    top: -1px;\n    width: 30px;\n    background-image: url(./sharp.png); }\n  :host .amap-menu-outer {\n    margin: 0;\n    padding: 0;\n    list-style-type: none; }\n  :host ul.amap-menu-outer li {\n    cursor: pointer;\n    height: 35px;\n    line-height: 35px;\n    word-break: break-word;\n    padding: 0 10px;\n    font-size: 12px;\n    white-space: nowrap; }\n  :host ul.amap-menu-outer li a {\n    text-decoration: none;\n    font-size: 13px;\n    margin: 0 5px;\n    color: #000;\n    padding: 5px; }\n  :host ul.amap-menu-outer li:hover {\n    background-color: #F3F3EE; }\n  :host .amap-menu-split {\n    border-bottom: #ccc solid 1px; }\n  :host .amap-menu-cp {\n    font-size: 10px; }\n  :host .amap-maptypecontrol, :host .amap-overviewcontrol, :host .amap-scalecontrol, :host .amap-toolbar {\n    z-index: 150; }\n  :host .amap-toolbar {\n    position: absolute;\n    width: 52px;\n    overflow: visible; }\n  :host .amap-pancontrol {\n    width: 52px;\n    height: 52px;\n    background: url(./map_view.png) 0 -140px;\n    position: absolute; }\n  :host .amap-pan-bottom, :host .amap-pan-left, :host .amap-pan-right, :host .amap-pan-top {\n    position: absolute;\n    cursor: pointer; }\n  :host .amap-pan-left, :host .amap-pan-right {\n    width: 12px;\n    height: 18px;\n    top: 17px; }\n  :host .amap-pan-bottom, :host .amap-pan-top {\n    width: 18px;\n    height: 12px;\n    left: 17px; }\n  :host .amap-pan-left {\n    left: 8px; }\n  :host .amap-pan-right {\n    left: 32px; }\n  :host .amap-pan-top {\n    top: 8px; }\n  :host .amap-pan-bottom {\n    top: 31px; }\n  :host .amap-pan-bottom:hover, :host .amap-pan-left:hover, :host .amap-pan-right:hover, :host .amap-pan-top:hover {\n    background: url(./map_view.png); }\n  :host .amap-pan-left:hover {\n    background-position: -52px -110px; }\n  :host .amap-pan-top:hover {\n    background-position: -70px -112px; }\n  :host .amap-pan-right:hover {\n    background-position: -61px -110px; }\n  :host .amap-pan-bottom:hover {\n    background-position: -84px -110px; }\n  :host .amap-pan-left-hover {\n    background-position: -52px -110px; }\n  :host .amap-pan-top-hover {\n    background-position: -70px -112px; }\n  :host .amap-pan-right-hover {\n    background-position: -61px -110px; }\n  :host .amap-pan-bottom-hover {\n    background-position: -84px -110px; }\n  :host .amap-zoomcontrol {\n    width: 24px;\n    position: absolute;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    user-select: none; }\n  :host .amap-zoom-cursor, :host .amap-zoom-label-city, :host .amap-zoom-label-country, :host .amap-zoom-label-province, :host .amap-zoom-label-street, :host .amap-zoom-minus, :host .amap-zoom-plus {\n    background: url(./map_view.png);\n    cursor: pointer; }\n  :host .amap-zoom-mask, :host .amap-zoom-ruler {\n    background: url(./toolbar_rbg.png);\n    cursor: pointer; }\n  :host .amap-zoom-minus, :host .amap-zoom-plus {\n    width: 24px;\n    height: 21px; }\n  :host .amap-zoom-plus {\n    background-position: 0 -217px; }\n  :host .amap-zoom-plus:hover {\n    background-position: 0 -194px; }\n  :host .amap-zoom-minus {\n    background-position: -26px -224px; }\n  :host .amap-zoom-minus:hover {\n    background-position: -26px -195px; }\n  :host .amap-zoom-plus2:hover {\n    background-position: -50px -194px;\n    cursor: default; }\n  :host .amap-zoom-minus2:hover {\n    background-position: -50px -223px;\n    cursor: default; }\n  :host .amap-zoom-ruler {\n    overflow: visible;\n    width: 12px;\n    height: 147px;\n    position: relative;\n    left: 6px;\n    background-position: 0 0; }\n  :host .amap-locate, :host .amap-scalecontrol, :host .amap-toolbar-geo, :host .amap-zoom-cursor, :host .amap-zoom-label-city, :host .amap-zoom-label-country, :host .amap-zoom-label-province, :host .amap-zoom-label-street, :host .amap-zoom-labels, :host .amap-zoom-mask {\n    position: absolute; }\n  :host .amap-zoom-mask {\n    width: 12px;\n    height: 106px;\n    background-position: -14px 0; }\n  :host .amap-zoom-cursor {\n    width: 24px;\n    height: 20px;\n    left: -6px;\n    top: 106px;\n    background-position: -127px -164px; }\n  :host .amap-zoom-cursor:hover {\n    background-position: -127px -141px; }\n  :host .amap-zoom-labels {\n    display: none; }\n  :host .amap-zoom-label-city, :host .amap-zoom-label-country, :host .amap-zoom-label-province, :host .amap-zoom-label-street {\n    width: 39px;\n    height: 31px;\n    left: 20px; }\n  :host .amap-zoom-label-street {\n    top: 0;\n    background-position: -87px -140px; }\n  :host .amap-zoom-label-city {\n    top: 54px;\n    background-position: -87px -171px; }\n  :host .amap-zoom-label-province {\n    top: 92px;\n    background-position: -87px -203px; }\n  :host .amap-zoom-label-country {\n    top: 129px;\n    background-position: -87px -235px; }\n  :host .amap-locate {\n    width: 18px;\n    height: 18px;\n    background: url(./map_view.png) -130px -185px;\n    cursor: pointer; }\n  :host .amap-geo {\n    width: 30px;\n    height: 30px;\n    cursor: pointer;\n    bottom: 18px;\n    right: 7px; }\n  :host .amap-scale-text {\n    text-align: center;\n    font-size: 10px; }\n  :host .amap-scale-line {\n    position: relative;\n    height: 8px; }\n  :host .amap-scale-line div {\n    -webkit-box-sizing: content-box !important;\n    -moz-box-sizing: content-box !important;\n    box-sizing: content-box !important; }\n  :host .amap-scale-edgeleft, :host .amap-scale-edgeright, :host .amap-scale-middle {\n    position: absolute;\n    background-color: #333;\n    overflow: hidden; }\n  :host .amap-scale-edgeleft, :host .amap-scale-edgeright {\n    width: 1px;\n    height: 6px;\n    border: 1px solid #fff; }\n  :host .amap-scale-middle {\n    height: 2px;\n    left: 2px;\n    top: 2px;\n    border-top: solid 1px #fff;\n    border-bottom: solid 1px #fff; }\n  :host .amap-overviewcontrol {\n    width: 120px;\n    height: 120px;\n    background: #fff;\n    position: absolute;\n    right: 0;\n    bottom: 0; }\n  :host .amap-overview-main {\n    width: 115px;\n    height: 115px;\n    position: absolute;\n    left: 5px;\n    top: 5px;\n    overflow: hidden; }\n  :host .amap-overview-main, :host .amap-overviewcontrol {\n    border-top: solid 1px #ccc;\n    border-left: solid 1px #ccc; }\n  :host .amap-overview-map {\n    position: absolute; }\n  :host .amap-overview-button {\n    width: 17px;\n    height: 17px;\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    background: url(./mapcontrols.png) -40px -386px;\n    cursor: pointer; }\n  :host .amap-overview-win {\n    width: 62px;\n    height: 35px;\n    background: #91a3d8;\n    opacity: .25;\n    border: 2px solid #44b;\n    filter: alpha(opacity=25);\n    position: absolute;\n    top: 40px;\n    left: 26px;\n    cursor: move; }\n  :host .amap-maptypecontrol {\n    position: absolute;\n    top: 12px;\n    right: 12px;\n    z-index: 304; }\n  :host .amap-maptype-wrap {\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 64px;\n    height: 64px; }\n  :host .amap-maptype-con {\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 60px;\n    height: 60px;\n    background: #fff;\n    border: 1px solid #ccc;\n    cursor: pointer; }\n  :host .amap-maptype-win {\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    width: 56px;\n    height: 56px;\n    overflow: hidden;\n    background: #ccc;\n    border: 1px solid #ccc; }\n  :host .amap-maptype-title {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 60px;\n    height: 20px;\n    color: #333;\n    text-align: center;\n    font-size: 12px;\n    line-height: 20px;\n    background: #fff; }\n  :host .amap-maptype-title:hover {\n    background-color: #eee; }\n  :host .amap-maptype-list {\n    position: absolute;\n    top: 64px;\n    right: 0;\n    width: 100px;\n    background: #fff;\n    border: 1px solid #ccc;\n    overflow: hidden; }\n  :host .amap-maptype-list p {\n    width: 100px;\n    height: 20px;\n    margin: 0;\n    cursor: pointer;\n    background: #fff; }\n  :host .amap-maptype-lsit p:hover {\n    background: #eee; }\n  :host .amap-maptype-check {\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    margin-left: 2px;\n    background: url(./maptype-bg.png) -30px 4px no-repeat; }\n  :host .amap-maptype-checked {\n    background-position: 0 4px; }\n  :host .amap-maptype-check-hover {\n    background-position: -15px 4px; }\n  :host .amap-maptype-label {\n    display: inline-block;\n    width: 60px;\n    height: 15px;\n    color: #333;\n    font-size: 12px;\n    line-height: 15px;\n    margin-left: 10px; }\n  :host .amap-ranging-label {\n    font-size: 12px;\n    line-height: 14px;\n    background: #fff;\n    border: 1px solid #ccc;\n    padding: 3px 7px 3px 2px;\n    white-space: nowrap; }\n  :host .amap-dis {\n    border-width: 0;\n    -moz-box-shadow: 0 3px 3px #888;\n    -webkit-box-shadow: 0 3px 3px #888;\n    box-shadow: 0 3px 3px #888; }\n  :host .amap-ranging-label span {\n    height: 12px;\n    vertical-align: center;\n    display: inline-block;\n    white-space: nowrap;\n    margin-left: 5px; }\n  :host .amap-ranging-label span img {\n    margin-top: -2px; }\n  :host .amap-ranging-label span .delimg {\n    margin-bottom: -3px; }\n  :host .amap-touch-toolbar .amap-zoomcontrol {\n    position: absolute;\n    right: 4px;\n    bottom: -80px;\n    z-index: 500;\n    width: 35px;\n    background-color: #fff;\n    background-color: rgba(255, 255, 255, 0.9);\n    border-radius: 3px;\n    border: 1px solid #ccc;\n    -webkit-box-shadow: 1px 1px 10px 0 #ccc;\n    box-shadow: 1px 1px 10px 0 #ccc; }\n  :host .amap-touch-toolbar .amap-zoomcontrol:after {\n    position: absolute;\n    content: '';\n    height: 1px;\n    background: #ddd;\n    top: 48px;\n    width: 60%;\n    margin: auto;\n    left: 0;\n    right: 0; }\n  :host .amap-geolocation-con .amap-geo, :host .amap-touch-toolbar .amap-geo {\n    background: url(./markers/b/loc_gray.png) 50% 50% no-repeat #fff;\n    width: 35px;\n    height: 35px;\n    border: 1px solid #ccc;\n    border-radius: 3px;\n    right: 4px; }\n  :host .amap-toolbar-geo-secc {\n    background-image: url(./markers/b/loc.png) !important;\n    background-size: 22px 22px !important;\n    background-position-x: 6px !important; }\n  :host .amap-locate-loading .amap-geo, :host .amap-touch-toolbar .amap-locate-loading {\n    background-image: url(./loading.gif); }\n  :host .amap-zoom-touch-plus {\n    margin-bottom: 5px; }\n  :host .amap-zoom-touch-minus, :host .amap-zoom-touch-plus {\n    width: 100%;\n    height: 43px;\n    background-color: #fff;\n    background-color: rgba(255, 255, 255, 0.5); }\n  :host .amap-zoom-touch-minus > div, :host .amap-zoom-touch-plus > div {\n    margin: auto;\n    font-size: 26px;\n    line-height: 43px;\n    font-family: verdana;\n    text-align: center;\n    color: #666;\n    height: 100%;\n    cursor: pointer; }\n  :host .amap-zoom-touch > div {\n    opacity: .2; }\n  :host .amap-popup {\n    text-align: center;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    margin-left: -165px;\n    margin-top: -170px; }\n  :host .amap-popup-content {\n    vertical-align: middle;\n    line-height: 200px;\n    overflow: hidden;\n    background-color: #fff;\n    border: solid #ddf;\n    border-width: 3px 1px;\n    border-radius: 5px;\n    margin: 0 auto;\n    text-align: center;\n    height: 340px; }\n  :host .column-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: 100%;\n    height: 100%; }\n    :host .column-container #map-container {\n      display: -ms-flexbox;\n      display: flex;\n      position: relative;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      width: 100%;\n      height: 600px;\n      border: var(--border-width, 1px) solid var(--stable-30, #E6E6E6);\n      background: var(--dark, #2b3648); }\n    :host .column-container .marker-info {\n      padding-bottom: var(--padding-10, 0.625rem);\n      border-top: var(--border-width, 1px) solid var(--border-color);\n      background: var(--light, #FFFFFF);\n      text-align: center; }\n      :host .column-container .marker-info .title {\n        margin-top: var(--padding-10, 0.625rem);\n        font-weight: 500; }"; }
}

class YooMapComponent {
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
    static get style() { return ":host {\n  width: 100%;\n  height: 100%; }\n  :host .content-container {\n    width: 100%;\n    height: 100%; }\n    :host .content-container.modal-header {\n      height: calc(100% - 44px); }\n  :host.absolute {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0; }\n  :host:not(.absolute) {\n    position: relative; }"; }
}

const mapboxgl = window.mapboxgl;
class YooMapGLComponent {
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
    static get style() { return ":host {\n  --locate-me-background-color: var(--gradient-success, #04CC99); }\n\n:host {\n  /* https://bugzilla.mozilla.org/show_bug.cgi?id=140562 */\n  /* stylelint-disable-next-line selector-class-pattern */\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%; }\n  :host .mapboxgl-map {\n    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;\n    overflow: hidden;\n    position: relative;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }\n  :host .mapboxgl-map:-webkit-full-screen {\n    width: 100%;\n    height: 100%; }\n  :host .mapboxgl-canary {\n    background-color: salmon; }\n  :host .mapboxgl-canvas-container.mapboxgl-interactive,\n  :host .mapboxgl-ctrl-group > button.mapboxgl-ctrl-compass {\n    cursor: -webkit-grab;\n    cursor: -moz-grab;\n    cursor: grab;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  :host .mapboxgl-canvas-container.mapboxgl-interactive:active,\n  :host .mapboxgl-ctrl-group > button.mapboxgl-ctrl-compass:active {\n    cursor: -webkit-grabbing;\n    cursor: -moz-grabbing;\n    cursor: grabbing; }\n  :host .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate,\n  :host .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate .mapboxgl-canvas {\n    -ms-touch-action: pan-x pan-y;\n    touch-action: pan-x pan-y; }\n  :host .mapboxgl-canvas-container.mapboxgl-touch-drag-pan,\n  :host .mapboxgl-canvas-container.mapboxgl-touch-drag-pan .mapboxgl-canvas {\n    -ms-touch-action: pinch-zoom;\n    touch-action: pinch-zoom; }\n  :host .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan,\n  :host .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan .mapboxgl-canvas {\n    -ms-touch-action: none;\n    touch-action: none; }\n  :host .mapboxgl-ctrl-top-left,\n  :host .mapboxgl-ctrl-top-right,\n  :host .mapboxgl-ctrl-bottom-left,\n  :host .mapboxgl-ctrl-bottom-right {\n    position: absolute;\n    pointer-events: none;\n    z-index: 2; }\n  :host .mapboxgl-ctrl-top-left {\n    top: 0;\n    left: 0; }\n  :host .mapboxgl-ctrl-top-right {\n    top: 0;\n    right: 0; }\n  :host .mapboxgl-ctrl-bottom-left {\n    bottom: 0;\n    left: 0; }\n  :host .mapboxgl-ctrl-bottom-right {\n    right: 0;\n    bottom: 0; }\n  :host .mapboxgl-ctrl {\n    clear: both;\n    pointer-events: auto; }\n  :host .mapboxgl-ctrl-top-left .mapboxgl-ctrl {\n    margin: 10px 0 0 10px;\n    float: left; }\n  :host .mapboxgl-ctrl-top-right .mapboxgl-ctrl {\n    margin: 10px 10px 0 0;\n    float: right; }\n  :host .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl {\n    margin: 0 0 10px 10px;\n    float: left; }\n  :host .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl {\n    margin: 0 10px 10px 0;\n    float: right; }\n  :host .mapboxgl-ctrl-group {\n    border-radius: 4px;\n    -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);\n    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);\n    overflow: hidden;\n    background: #fff; }\n  :host .mapboxgl-ctrl-group > button {\n    width: 30px;\n    height: 30px;\n    display: block;\n    padding: 0;\n    outline: none;\n    border: 0;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    background-color: transparent;\n    cursor: pointer; }\n  :host .mapboxgl-ctrl-group > button + button {\n    border-top: 1px solid #ddd; }\n  :host .mapboxgl-ctrl > button::-moz-focus-inner {\n    border: 0;\n    padding: 0; }\n  :host .mapboxgl-ctrl > button:hover {\n    background-color: rgba(0, 0, 0, 0.05); }\n  :host .mapboxgl-ctrl-icon,\n  :host .mapboxgl-ctrl-icon > .mapboxgl-ctrl-compass-arrow {\n    speak: none;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale; }\n  :host .mapboxgl-ctrl-icon {\n    padding: 5px; }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-out {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath style='fill:%23333333;' d='m 7,9 c -0.554,0 -1,0.446 -1,1 0,0.554 0.446,1 1,1 l 6,0 c 0.554,0 1,-0.446 1,-1 0,-0.554 -0.446,-1 -1,-1 z'/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-in {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath style='fill:%23333333;' d='M 10 6 C 9.446 6 9 6.4459904 9 7 L 9 9 L 7 9 C 6.446 9 6 9.446 6 10 C 6 10.554 6.446 11 7 11 L 9 11 L 9 13 C 9 13.55401 9.446 14 10 14 C 10.554 14 11 13.55401 11 13 L 11 11 L 13 11 C 13.554 11 14 10.554 14 10 C 14 9.446 13.554 9 13 9 L 11 9 L 11 7 C 11 6.4459904 10.554 6 10 6 z'/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E %3Cpath d='M10 4C9 4 9 5 9 5L9 5.1A5 5 0 0 0 5.1 9L5 9C5 9 4 9 4 10 4 11 5 11 5 11L5.1 11A5 5 0 0 0 9 14.9L9 15C9 15 9 16 10 16 11 16 11 15 11 15L11 14.9A5 5 0 0 0 14.9 11L15 11C15 11 16 11 16 10 16 9 15 9 15 9L14.9 9A5 5 0 0 0 11 5.1L11 5C11 5 11 4 10 4zM10 6.5A3.5 3.5 0 0 1 13.5 10 3.5 3.5 0 0 1 10 13.5 3.5 3.5 0 0 1 6.5 10 3.5 3.5 0 0 1 10 6.5zM10 8.3A1.8 1.8 0 0 0 8.3 10 1.8 1.8 0 0 0 10 11.8 1.8 1.8 0 0 0 11.8 10 1.8 1.8 0 0 0 10 8.3z'/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate:disabled {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23aaa'%3E %3Cpath d='M10 4C9 4 9 5 9 5L9 5.1A5 5 0 0 0 5.1 9L5 9C5 9 4 9 4 10 4 11 5 11 5 11L5.1 11A5 5 0 0 0 9 14.9L9 15C9 15 9 16 10 16 11 16 11 15 11 15L11 14.9A5 5 0 0 0 14.9 11L15 11C15 11 16 11 16 10 16 9 15 9 15 9L14.9 9A5 5 0 0 0 11 5.1L11 5C11 5 11 4 10 4zM10 6.5A3.5 3.5 0 0 1 13.5 10 3.5 3.5 0 0 1 10 13.5 3.5 3.5 0 0 1 6.5 10 3.5 3.5 0 0 1 10 6.5zM10 8.3A1.8 1.8 0 0 0 8.3 10 1.8 1.8 0 0 0 10 11.8 1.8 1.8 0 0 0 11.8 10 1.8 1.8 0 0 0 10 8.3z'/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E %3Cpath d='M10 4C9 4 9 5 9 5L9 5.1A5 5 0 0 0 5.1 9L5 9C5 9 4 9 4 10 4 11 5 11 5 11L5.1 11A5 5 0 0 0 9 14.9L9 15C9 15 9 16 10 16 11 16 11 15 11 15L11 14.9A5 5 0 0 0 14.9 11L15 11C15 11 16 11 16 10 16 9 15 9 15 9L14.9 9A5 5 0 0 0 11 5.1L11 5C11 5 11 4 10 4zM10 6.5A3.5 3.5 0 0 1 13.5 10 3.5 3.5 0 0 1 10 13.5 3.5 3.5 0 0 1 6.5 10 3.5 3.5 0 0 1 10 6.5zM10 8.3A1.8 1.8 0 0 0 8.3 10 1.8 1.8 0 0 0 10 11.8 1.8 1.8 0 0 0 11.8 10 1.8 1.8 0 0 0 10 8.3z'/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e58978'%3E %3Cpath d='M10 4C9 4 9 5 9 5L9 5.1A5 5 0 0 0 5.1 9L5 9C5 9 4 9 4 10 4 11 5 11 5 11L5.1 11A5 5 0 0 0 9 14.9L9 15C9 15 9 16 10 16 11 16 11 15 11 15L11 14.9A5 5 0 0 0 14.9 11L15 11C15 11 16 11 16 10 16 9 15 9 15 9L14.9 9A5 5 0 0 0 11 5.1L11 5C11 5 11 4 10 4zM10 6.5A3.5 3.5 0 0 1 13.5 10 3.5 3.5 0 0 1 10 13.5 3.5 3.5 0 0 1 6.5 10 3.5 3.5 0 0 1 10 6.5zM10 8.3A1.8 1.8 0 0 0 8.3 10 1.8 1.8 0 0 0 10 11.8 1.8 1.8 0 0 0 11.8 10 1.8 1.8 0 0 0 10 8.3z'/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E %3Cpath d='M 10,4 C 9,4 9,5 9,5 L 9,5.1 C 7.0357113,5.5006048 5.5006048,7.0357113 5.1,9 L 5,9 c 0,0 -1,0 -1,1 0,1 1,1 1,1 l 0.1,0 c 0.4006048,1.964289 1.9357113,3.499395 3.9,3.9 L 9,15 c 0,0 0,1 1,1 1,0 1,-1 1,-1 l 0,-0.1 c 1.964289,-0.400605 3.499395,-1.935711 3.9,-3.9 l 0.1,0 c 0,0 1,0 1,-1 C 16,9 15,9 15,9 L 14.9,9 C 14.499395,7.0357113 12.964289,5.5006048 11,5.1 L 11,5 c 0,0 0,-1 -1,-1 z m 0,2.5 c 1.932997,0 3.5,1.5670034 3.5,3.5 0,1.932997 -1.567003,3.5 -3.5,3.5 C 8.0670034,13.5 6.5,11.932997 6.5,10 6.5,8.0670034 8.0670034,6.5 10,6.5 Z'/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e54e33'%3E %3Cpath d='M 10,4 C 9,4 9,5 9,5 L 9,5.1 C 7.0357113,5.5006048 5.5006048,7.0357113 5.1,9 L 5,9 c 0,0 -1,0 -1,1 0,1 1,1 1,1 l 0.1,0 c 0.4006048,1.964289 1.9357113,3.499395 3.9,3.9 L 9,15 c 0,0 0,1 1,1 1,0 1,-1 1,-1 l 0,-0.1 c 1.964289,-0.400605 3.499395,-1.935711 3.9,-3.9 l 0.1,0 c 0,0 1,0 1,-1 C 16,9 15,9 15,9 L 14.9,9 C 14.499395,7.0357113 12.964289,5.5006048 11,5.1 L 11,5 c 0,0 0,-1 -1,-1 z m 0,2.5 c 1.932997,0 3.5,1.5670034 3.5,3.5 0,1.932997 -1.567003,3.5 -3.5,3.5 C 8.0670034,13.5 6.5,11.932997 6.5,10 6.5,8.0670034 8.0670034,6.5 10,6.5 Z'/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-waiting {\n    -webkit-animation: mapboxgl-spin 2s infinite linear;\n    -moz-animation: mapboxgl-spin 2s infinite linear;\n    -o-animation: mapboxgl-spin 2s infinite linear;\n    -ms-animation: mapboxgl-spin 2s infinite linear;\n    animation: mapboxgl-spin 2s infinite linear; }\n\n\@-webkit-keyframes mapboxgl-spin {\n  0% {\n    -webkit-transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg); } }\n\n\@-moz-keyframes mapboxgl-spin {\n  0% {\n    -moz-transform: rotate(0deg); }\n  100% {\n    -moz-transform: rotate(360deg); } }\n\n\@-o-keyframes mapboxgl-spin {\n  0% {\n    -o-transform: rotate(0deg); }\n  100% {\n    -o-transform: rotate(360deg); } }\n\n\@-ms-keyframes mapboxgl-spin {\n  :host 0% {\n    -ms-transform: rotate(0deg); }\n  :host 100% {\n    -ms-transform: rotate(360deg); } }\n\n\@keyframes mapboxgl-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-fullscreen {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M 5 4 C 4.5 4 4 4.5 4 5 L 4 6 L 4 9 L 4.5 9 L 5.7773438 7.296875 C 6.7771319 8.0602131 7.835765 8.9565728 8.890625 10 C 7.8257121 11.0633 6.7761791 11.951675 5.78125 12.707031 L 4.5 11 L 4 11 L 4 15 C 4 15.5 4.5 16 5 16 L 9 16 L 9 15.5 L 7.2734375 14.205078 C 8.0428931 13.187886 8.9395441 12.133481 9.9609375 11.068359 C 11.042371 12.14699 11.942093 13.2112 12.707031 14.21875 L 11 15.5 L 11 16 L 14 16 L 15 16 C 15.5 16 16 15.5 16 15 L 16 14 L 16 11 L 15.5 11 L 14.205078 12.726562 C 13.177985 11.949617 12.112718 11.043577 11.037109 10.009766 C 12.151856 8.981061 13.224345 8.0798624 14.228516 7.3046875 L 15.5 9 L 16 9 L 16 5 C 16 4.5 15.5 4 15 4 L 11 4 L 11 4.5 L 12.703125 5.7773438 C 11.932647 6.7864834 11.026693 7.8554712 9.9707031 8.9199219 C 8.9584739 7.8204943 8.0698767 6.7627188 7.3046875 5.7714844 L 9 4.5 L 9 4 L 6 4 L 5 4 z '/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-shrink {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath style='fill:%23000000;' d='M 4.2421875 3.4921875 A 0.750075 0.750075 0 0 0 3.71875 4.78125 L 5.9648438 7.0273438 L 4 8.5 L 4 9 L 8 9 C 8.500001 8.9999988 9 8.4999992 9 8 L 9 4 L 8.5 4 L 7.0175781 5.9550781 L 4.78125 3.71875 A 0.750075 0.750075 0 0 0 4.2421875 3.4921875 z M 15.734375 3.4921875 A 0.750075 0.750075 0 0 0 15.21875 3.71875 L 12.984375 5.953125 L 11.5 4 L 11 4 L 11 8 C 11 8.4999992 11.499999 8.9999988 12 9 L 16 9 L 16 8.5 L 14.035156 7.0273438 L 16.28125 4.78125 A 0.750075 0.750075 0 0 0 15.734375 3.4921875 z M 4 11 L 4 11.5 L 5.9648438 12.972656 L 3.71875 15.21875 A 0.75130096 0.75130096 0 1 0 4.78125 16.28125 L 7.0273438 14.035156 L 8.5 16 L 9 16 L 9 12 C 9 11.500001 8.500001 11.000001 8 11 L 4 11 z M 12 11 C 11.499999 11.000001 11 11.500001 11 12 L 11 16 L 11.5 16 L 12.972656 14.035156 L 15.21875 16.28125 A 0.75130096 0.75130096 0 1 0 16.28125 15.21875 L 14.035156 12.972656 L 16 11.5 L 16 11 L 12 11 z '/%3E %3C/svg%3E\"); }\n  :host .mapboxgl-ctrl-icon.mapboxgl-ctrl-compass > .mapboxgl-ctrl-compass-arrow {\n    width: 20px;\n    height: 20px;\n    margin: 5px;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpolygon fill='%23333333' points='6,9 10,1 14,9'/%3E %3Cpolygon fill='%23CCCCCC' points='6,11 10,19 14,11 '/%3E %3C/svg%3E\");\n    background-repeat: no-repeat;\n    display: inline-block; }\n  :host a.mapboxgl-ctrl-logo {\n    width: 85px;\n    height: 21px;\n    margin: 0 0 -3px -3px;\n    display: block;\n    background-repeat: no-repeat;\n    cursor: pointer;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 84.49 21' style='enable-background:new 0 0 84.49 21;' xml:space='preserve'%3E%3Cg%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M83.25,14.26c0,0.12-0.09,0.21-0.21,0.21h-1.61c-0.13,0-0.24-0.06-0.3-0.17l-1.44-2.39l-1.44,2.39 c-0.06,0.11-0.18,0.17-0.3,0.17h-1.61c-0.04,0-0.08-0.01-0.12-0.03c-0.09-0.06-0.13-0.19-0.06-0.28l0,0l2.43-3.68L76.2,6.84 c-0.02-0.03-0.03-0.07-0.03-0.12c0-0.12,0.09-0.21,0.21-0.21h1.61c0.13,0,0.24,0.06,0.3,0.17l1.41,2.36l1.4-2.35 c0.06-0.11,0.18-0.17,0.3-0.17H83c0.04,0,0.08,0.01,0.12,0.03c0.09,0.06,0.13,0.19,0.06,0.28l0,0l-2.37,3.63l2.43,3.67 C83.24,14.18,83.25,14.22,83.25,14.26z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M66.24,9.59c-0.39-1.88-1.96-3.28-3.84-3.28c-1.03,0-2.03,0.42-2.73,1.18V3.51c0-0.13-0.1-0.23-0.23-0.23h-1.4 c-0.13,0-0.23,0.11-0.23,0.23v10.72c0,0.13,0.1,0.23,0.23,0.23h1.4c0.13,0,0.23-0.11,0.23-0.23V13.5c0.71,0.75,1.7,1.18,2.73,1.18 c1.88,0,3.45-1.41,3.84-3.29C66.37,10.79,66.37,10.18,66.24,9.59L66.24,9.59z M62.08,13c-1.32,0-2.39-1.11-2.41-2.48v-0.06 c0.02-1.38,1.09-2.48,2.41-2.48s2.42,1.12,2.42,2.51S63.41,13,62.08,13z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M71.67,6.32c-1.98-0.01-3.72,1.35-4.16,3.29c-0.13,0.59-0.13,1.19,0,1.77c0.44,1.94,2.17,3.32,4.17,3.3 c2.35,0,4.26-1.87,4.26-4.19S74.04,6.32,71.67,6.32z M71.65,13.01c-1.33,0-2.42-1.12-2.42-2.51s1.08-2.52,2.42-2.52 c1.33,0,2.42,1.12,2.42,2.51S72.99,13,71.65,13.01L71.65,13.01z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M62.08,7.98c-1.32,0-2.39,1.11-2.41,2.48v0.06C59.68,11.9,60.75,13,62.08,13s2.42-1.12,2.42-2.51 S63.41,7.98,62.08,7.98z M62.08,11.76c-0.63,0-1.14-0.56-1.17-1.25v-0.04c0.01-0.69,0.54-1.25,1.17-1.25 c0.63,0,1.17,0.57,1.17,1.27C63.24,11.2,62.73,11.76,62.08,11.76z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M71.65,7.98c-1.33,0-2.42,1.12-2.42,2.51S70.32,13,71.65,13s2.42-1.12,2.42-2.51S72.99,7.98,71.65,7.98z M71.65,11.76c-0.64,0-1.17-0.57-1.17-1.27c0-0.7,0.53-1.26,1.17-1.26s1.17,0.57,1.17,1.27C72.82,11.21,72.29,11.76,71.65,11.76z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M45.74,6.53h-1.4c-0.13,0-0.23,0.11-0.23,0.23v0.73c-0.71-0.75-1.7-1.18-2.73-1.18 c-2.17,0-3.94,1.87-3.94,4.19s1.77,4.19,3.94,4.19c1.04,0,2.03-0.43,2.73-1.19v0.73c0,0.13,0.1,0.23,0.23,0.23h1.4 c0.13,0,0.23-0.11,0.23-0.23V6.74c0-0.12-0.09-0.22-0.22-0.22C45.75,6.53,45.75,6.53,45.74,6.53z M44.12,10.53 C44.11,11.9,43.03,13,41.71,13s-2.42-1.12-2.42-2.51s1.08-2.52,2.4-2.52c1.33,0,2.39,1.11,2.41,2.48L44.12,10.53z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M41.71,7.98c-1.33,0-2.42,1.12-2.42,2.51S40.37,13,41.71,13s2.39-1.11,2.41-2.48v-0.06 C44.1,9.09,43.03,7.98,41.71,7.98z M40.55,10.49c0-0.7,0.52-1.27,1.17-1.27c0.64,0,1.14,0.56,1.17,1.25v0.04 c-0.01,0.68-0.53,1.24-1.17,1.24C41.08,11.75,40.55,11.19,40.55,10.49z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M52.41,6.32c-1.03,0-2.03,0.42-2.73,1.18V6.75c0-0.13-0.1-0.23-0.23-0.23h-1.4c-0.13,0-0.23,0.11-0.23,0.23 v10.72c0,0.13,0.1,0.23,0.23,0.23h1.4c0.13,0,0.23-0.1,0.23-0.23V13.5c0.71,0.75,1.7,1.18,2.74,1.18c2.17,0,3.94-1.87,3.94-4.19 S54.58,6.32,52.41,6.32z M52.08,13.01c-1.32,0-2.39-1.11-2.42-2.48v-0.07c0.02-1.38,1.09-2.49,2.4-2.49c1.32,0,2.41,1.12,2.41,2.51 S53.4,13,52.08,13.01L52.08,13.01z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M52.08,7.98c-1.32,0-2.39,1.11-2.42,2.48v0.06c0.03,1.38,1.1,2.48,2.42,2.48s2.41-1.12,2.41-2.51 S53.4,7.98,52.08,7.98z M52.08,11.76c-0.63,0-1.14-0.56-1.17-1.25v-0.04c0.01-0.69,0.54-1.25,1.17-1.25c0.63,0,1.17,0.58,1.17,1.27 S52.72,11.76,52.08,11.76z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M36.08,14.24c0,0.13-0.1,0.23-0.23,0.23h-1.41c-0.13,0-0.23-0.11-0.23-0.23V9.68c0-0.98-0.74-1.71-1.62-1.71 c-0.8,0-1.46,0.7-1.59,1.62l0.01,4.66c0,0.13-0.11,0.23-0.23,0.23h-1.41c-0.13,0-0.23-0.11-0.23-0.23V9.68 c0-0.98-0.74-1.71-1.62-1.71c-0.85,0-1.54,0.79-1.6,1.8v4.48c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.11-0.23-0.23V6.74 c0.01-0.13,0.1-0.22,0.23-0.22h1.4c0.13,0,0.22,0.11,0.23,0.22V7.4c0.5-0.68,1.3-1.09,2.16-1.1h0.03c1.09,0,2.09,0.6,2.6,1.55 c0.45-0.95,1.4-1.55,2.44-1.56c1.62,0,2.93,1.25,2.9,2.78L36.08,14.24z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M84.34,13.59l-0.07-0.13l-1.96-2.99l1.94-2.95c0.44-0.67,0.26-1.56-0.41-2.02c-0.02,0-0.03,0-0.04-0.01 c-0.23-0.15-0.5-0.22-0.78-0.22h-1.61c-0.56,0-1.08,0.29-1.37,0.78L79.72,6.6l-0.34-0.56C79.09,5.56,78.57,5.27,78,5.27h-1.6 c-0.6,0-1.13,0.37-1.35,0.92c-2.19-1.66-5.28-1.47-7.26,0.45c-0.35,0.34-0.65,0.72-0.89,1.14c-0.9-1.62-2.58-2.72-4.5-2.72 c-0.5,0-1.01,0.07-1.48,0.23V3.51c0-0.82-0.66-1.48-1.47-1.48h-1.4c-0.81,0-1.47,0.66-1.47,1.47v3.75 c-0.95-1.36-2.5-2.18-4.17-2.19c-0.74,0-1.46,0.16-2.12,0.47c-0.24-0.17-0.54-0.26-0.84-0.26h-1.4c-0.45,0-0.87,0.21-1.15,0.56 c-0.02-0.03-0.04-0.05-0.07-0.08c-0.28-0.3-0.68-0.47-1.09-0.47h-1.39c-0.3,0-0.6,0.09-0.84,0.26c-0.67-0.3-1.39-0.46-2.12-0.46 c-1.83,0-3.43,1-4.37,2.5c-0.2-0.46-0.48-0.89-0.83-1.25c-0.8-0.81-1.89-1.25-3.02-1.25h-0.01c-0.89,0.01-1.75,0.33-2.46,0.88 c-0.74-0.57-1.64-0.88-2.57-0.88H28.1c-0.29,0-0.58,0.03-0.86,0.11c-0.28,0.06-0.56,0.16-0.82,0.28c-0.21-0.12-0.45-0.18-0.7-0.18 h-1.4c-0.82,0-1.47,0.66-1.47,1.47v7.5c0,0.82,0.66,1.47,1.47,1.47h1.4c0.82,0,1.48-0.66,1.48-1.48l0,0V9.79 c0.03-0.36,0.23-0.59,0.36-0.59c0.18,0,0.38,0.18,0.38,0.47v4.57c0,0.82,0.66,1.47,1.47,1.47h1.41c0.82,0,1.47-0.66,1.47-1.47 l-0.01-4.57c0.06-0.32,0.25-0.47,0.35-0.47c0.18,0,0.38,0.18,0.38,0.47v4.57c0,0.82,0.66,1.47,1.47,1.47h1.41 c0.82,0,1.47-0.66,1.47-1.47v-0.38c0.96,1.29,2.46,2.06,4.06,2.06c0.74,0,1.46-0.16,2.12-0.47c0.24,0.17,0.54,0.26,0.84,0.26h1.39 c0.3,0,0.6-0.09,0.84-0.26v2.01c0,0.82,0.66,1.47,1.47,1.47h1.4c0.82,0,1.47-0.66,1.47-1.47v-1.77c0.48,0.15,0.99,0.23,1.49,0.22 c1.7,0,3.22-0.87,4.17-2.2v0.52c0,0.82,0.66,1.47,1.47,1.47h1.4c0.3,0,0.6-0.09,0.84-0.26c0.66,0.31,1.39,0.47,2.12,0.47 c1.92,0,3.6-1.1,4.49-2.73c1.54,2.65,4.95,3.53,7.58,1.98c0.18-0.11,0.36-0.22,0.53-0.36c0.22,0.55,0.76,0.91,1.35,0.9H78 c0.56,0,1.08-0.29,1.37-0.78l0.37-0.61l0.37,0.61c0.29,0.48,0.81,0.78,1.38,0.78h1.6c0.81,0,1.46-0.66,1.45-1.46 C84.49,14.02,84.44,13.8,84.34,13.59L84.34,13.59z M35.86,14.47h-1.41c-0.13,0-0.23-0.11-0.23-0.23V9.68 c0-0.98-0.74-1.71-1.62-1.71c-0.8,0-1.46,0.7-1.59,1.62l0.01,4.66c0,0.13-0.1,0.23-0.23,0.23h-1.41c-0.13,0-0.23-0.11-0.23-0.23 V9.68c0-0.98-0.74-1.71-1.62-1.71c-0.85,0-1.54,0.79-1.6,1.8v4.48c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.11-0.23-0.23 V6.74c0.01-0.13,0.11-0.22,0.23-0.22h1.4c0.13,0,0.22,0.11,0.23,0.22V7.4c0.5-0.68,1.3-1.09,2.16-1.1h0.03 c1.09,0,2.09,0.6,2.6,1.55c0.45-0.95,1.4-1.55,2.44-1.56c1.62,0,2.93,1.25,2.9,2.78l0.01,5.16C36.09,14.36,35.98,14.46,35.86,14.47 L35.86,14.47z M45.97,14.24c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.11-0.23-0.23V13.5c-0.7,0.76-1.69,1.18-2.72,1.18 c-2.17,0-3.94-1.87-3.94-4.19s1.77-4.19,3.94-4.19c1.03,0,2.02,0.43,2.73,1.18V6.74c0-0.13,0.1-0.23,0.23-0.23h1.4 c0.12-0.01,0.22,0.08,0.23,0.21c0,0.01,0,0.01,0,0.02v7.51h-0.01V14.24z M52.41,14.67c-1.03,0-2.02-0.43-2.73-1.18v3.97 c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.1-0.23-0.23V6.75c0-0.13,0.1-0.22,0.23-0.22h1.4c0.13,0,0.23,0.11,0.23,0.23v0.73 c0.71-0.76,1.7-1.18,2.73-1.18c2.17,0,3.94,1.86,3.94,4.18S54.58,14.67,52.41,14.67z M66.24,11.39c-0.39,1.87-1.96,3.29-3.84,3.29 c-1.03,0-2.02-0.43-2.73-1.18v0.73c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.11-0.23-0.23V3.51c0-0.13,0.1-0.23,0.23-0.23 h1.4c0.13,0,0.23,0.11,0.23,0.23v3.97c0.71-0.75,1.7-1.18,2.73-1.17c1.88,0,3.45,1.4,3.84,3.28C66.37,10.19,66.37,10.8,66.24,11.39 L66.24,11.39L66.24,11.39z M71.67,14.68c-2,0.01-3.73-1.35-4.17-3.3c-0.13-0.59-0.13-1.19,0-1.77c0.44-1.94,2.17-3.31,4.17-3.3 c2.36,0,4.26,1.87,4.26,4.19S74.03,14.68,71.67,14.68L71.67,14.68z M83.04,14.47h-1.61c-0.13,0-0.24-0.06-0.3-0.17l-1.44-2.39 l-1.44,2.39c-0.06,0.11-0.18,0.17-0.3,0.17h-1.61c-0.04,0-0.08-0.01-0.12-0.03c-0.09-0.06-0.13-0.19-0.06-0.28l0,0l2.43-3.68 L76.2,6.84c-0.02-0.03-0.03-0.07-0.03-0.12c0-0.12,0.09-0.21,0.21-0.21h1.61c0.13,0,0.24,0.06,0.3,0.17l1.41,2.36l1.41-2.36 c0.06-0.11,0.18-0.17,0.3-0.17h1.61c0.04,0,0.08,0.01,0.12,0.03c0.09,0.06,0.13,0.19,0.06,0.28l0,0l-2.38,3.64l2.43,3.67 c0.02,0.03,0.03,0.07,0.03,0.12C83.25,14.38,83.16,14.47,83.04,14.47L83.04,14.47L83.04,14.47z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M10.5,1.24c-5.11,0-9.25,4.15-9.25,9.25s4.15,9.25,9.25,9.25s9.25-4.15,9.25-9.25 C19.75,5.38,15.61,1.24,10.5,1.24z M14.89,12.77c-1.93,1.93-4.78,2.31-6.7,2.31c-0.7,0-1.41-0.05-2.1-0.16c0,0-1.02-5.64,2.14-8.81 c0.83-0.83,1.95-1.28,3.13-1.28c1.27,0,2.49,0.51,3.39,1.42C16.59,8.09,16.64,11,14.89,12.77z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M10.5-0.01C4.7-0.01,0,4.7,0,10.49s4.7,10.5,10.5,10.5S21,16.29,21,10.49C20.99,4.7,16.3-0.01,10.5-0.01z M10.5,19.74c-5.11,0-9.25-4.15-9.25-9.25s4.14-9.26,9.25-9.26s9.25,4.15,9.25,9.25C19.75,15.61,15.61,19.74,10.5,19.74z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M14.74,6.25C12.9,4.41,9.98,4.35,8.23,6.1c-3.16,3.17-2.14,8.81-2.14,8.81s5.64,1.02,8.81-2.14 C16.64,11,16.59,8.09,14.74,6.25z M12.47,10.34l-0.91,1.87l-0.9-1.87L8.8,9.43l1.86-0.9l0.9-1.87l0.91,1.87l1.86,0.9L12.47,10.34z'/%3E %3Cpolygon class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' points='14.33,9.43 12.47,10.34 11.56,12.21 10.66,10.34 8.8,9.43 10.66,8.53 11.56,6.66 12.47,8.53 '/%3E%3C/g%3E%3C/svg%3E\"); }\n  :host a.mapboxgl-ctrl-logo.mapboxgl-compact {\n    width: 21px;\n    height: 21px;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 21 21' style='enable-background:new 0 0 21 21;' xml:space='preserve'%3E%3Cg transform='translate(0,0.01)'%3E%3Cpath d='m 10.5,1.24 c -5.11,0 -9.25,4.15 -9.25,9.25 0,5.1 4.15,9.25 9.25,9.25 5.1,0 9.25,-4.15 9.25,-9.25 0,-5.11 -4.14,-9.25 -9.25,-9.25 z m 4.39,11.53 c -1.93,1.93 -4.78,2.31 -6.7,2.31 -0.7,0 -1.41,-0.05 -2.1,-0.16 0,0 -1.02,-5.64 2.14,-8.81 0.83,-0.83 1.95,-1.28 3.13,-1.28 1.27,0 2.49,0.51 3.39,1.42 1.84,1.84 1.89,4.75 0.14,6.52 z' style='opacity:0.9;fill:%23ffffff;enable-background:new' class='st0'/%3E%3Cpath d='M 10.5,-0.01 C 4.7,-0.01 0,4.7 0,10.49 c 0,5.79 4.7,10.5 10.5,10.5 5.8,0 10.5,-4.7 10.5,-10.5 C 20.99,4.7 16.3,-0.01 10.5,-0.01 Z m 0,19.75 c -5.11,0 -9.25,-4.15 -9.25,-9.25 0,-5.1 4.14,-9.26 9.25,-9.26 5.11,0 9.25,4.15 9.25,9.25 0,5.13 -4.14,9.26 -9.25,9.26 z' style='opacity:0.35;enable-background:new' class='st1'/%3E%3Cpath d='M 14.74,6.25 C 12.9,4.41 9.98,4.35 8.23,6.1 5.07,9.27 6.09,14.91 6.09,14.91 c 0,0 5.64,1.02 8.81,-2.14 C 16.64,11 16.59,8.09 14.74,6.25 Z m -2.27,4.09 -0.91,1.87 -0.9,-1.87 -1.86,-0.91 1.86,-0.9 0.9,-1.87 0.91,1.87 1.86,0.9 z' style='opacity:0.35;enable-background:new' class='st1'/%3E%3Cpolygon points='11.56,12.21 10.66,10.34 8.8,9.43 10.66,8.53 11.56,6.66 12.47,8.53 14.33,9.43 12.47,10.34 ' style='opacity:0.9;fill:%23ffffff;enable-background:new' class='st0'/%3E%3C/g%3E%3C/svg%3E\"); }\n  :host .mapboxgl-ctrl.mapboxgl-ctrl-attrib {\n    padding: 0 5px;\n    background-color: rgba(255, 255, 255, 0.5);\n    margin: 0; }\n  \@media screen {\n    :host .mapboxgl-ctrl-attrib.mapboxgl-compact {\n      padding-top: 2px;\n      padding-bottom: 2px;\n      margin: 0 10px 10px;\n      position: relative;\n      padding-right: 24px;\n      background-color: #fff;\n      border-radius: 3px 12px 12px 3px;\n      visibility: hidden; }\n    :host .mapboxgl-ctrl-attrib.mapboxgl-compact:hover {\n      visibility: visible; }\n    :host .mapboxgl-ctrl-attrib.mapboxgl-compact::after {\n      content: '';\n      cursor: pointer;\n      position: absolute;\n      bottom: 0;\n      right: 0;\n      background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill='%23333333' fill-rule='evenodd' d='M4,10a6,6 0 1,0 12,0a6,6 0 1,0 -12,0 M9,7a1,1 0 1,0 2,0a1,1 0 1,0 -2,0 M9,10a1,1 0 1,1 2,0l0,3a1,1 0 1,1 -2,0'/%3E %3C/svg%3E\");\n      background-color: rgba(255, 255, 255, 0.5);\n      width: 24px;\n      height: 24px;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      visibility: visible;\n      border-radius: 12px; } }\n  :host .mapboxgl-ctrl-attrib a {\n    color: rgba(0, 0, 0, 0.75);\n    text-decoration: none; }\n  :host .mapboxgl-ctrl-attrib a:hover {\n    color: inherit;\n    text-decoration: underline; }\n  :host .mapboxgl-ctrl-attrib .mapbox-improve-map {\n    font-weight: bold;\n    margin-left: 2px; }\n  :host .mapboxgl-attrib-empty {\n    display: none; }\n  :host .mapboxgl-ctrl-scale {\n    background-color: rgba(255, 255, 255, 0.75);\n    font-size: 10px;\n    border-width: medium 2px 2px;\n    border-style: none solid solid;\n    border-color: #333;\n    padding: 0 5px;\n    color: #333;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  :host .mapboxgl-popup {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    will-change: transform;\n    pointer-events: none; }\n  :host .mapboxgl-popup-anchor-top,\n  :host .mapboxgl-popup-anchor-top-left,\n  :host .mapboxgl-popup-anchor-top-right {\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  :host .mapboxgl-popup-anchor-bottom,\n  :host .mapboxgl-popup-anchor-bottom-left,\n  :host .mapboxgl-popup-anchor-bottom-right {\n    -webkit-flex-direction: column-reverse;\n    -ms-flex-direction: column-reverse;\n    flex-direction: column-reverse; }\n  :host .mapboxgl-popup-anchor-left {\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n  :host .mapboxgl-popup-anchor-right {\n    -webkit-flex-direction: row-reverse;\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse; }\n  :host .mapboxgl-popup-tip {\n    width: 0;\n    height: 0;\n    border: 10px solid transparent;\n    z-index: 1; }\n  :host .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    align-self: center;\n    border-top: none;\n    border-bottom-color: #fff; }\n  :host .mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {\n    -webkit-align-self: flex-start;\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n    border-top: none;\n    border-left: none;\n    border-bottom-color: #fff; }\n  :host .mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {\n    -webkit-align-self: flex-end;\n    -ms-flex-item-align: end;\n    align-self: flex-end;\n    border-top: none;\n    border-right: none;\n    border-bottom-color: #fff; }\n  :host .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    align-self: center;\n    border-bottom: none;\n    border-top-color: #fff; }\n  :host .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {\n    -webkit-align-self: flex-start;\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n    border-bottom: none;\n    border-left: none;\n    border-top-color: #fff; }\n  :host .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {\n    -webkit-align-self: flex-end;\n    -ms-flex-item-align: end;\n    align-self: flex-end;\n    border-bottom: none;\n    border-right: none;\n    border-top-color: #fff; }\n  :host .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    align-self: center;\n    border-left: none;\n    border-right-color: #fff; }\n  :host .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    align-self: center;\n    border-right: none;\n    border-left-color: #fff; }\n  :host .mapboxgl-popup-close-button {\n    position: absolute;\n    right: 0;\n    top: 0;\n    border: 0;\n    border-radius: 0 3px 0 0;\n    cursor: pointer;\n    background-color: transparent; }\n  :host .mapboxgl-popup-close-button:hover {\n    background-color: rgba(0, 0, 0, 0.05); }\n  :host .mapboxgl-popup-content {\n    position: relative;\n    background: #fff;\n    border-radius: 3px;\n    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n    padding: 10px 10px 15px;\n    pointer-events: auto; }\n  :host .mapboxgl-popup-anchor-top-left .mapboxgl-popup-content {\n    border-top-left-radius: 0; }\n  :host .mapboxgl-popup-anchor-top-right .mapboxgl-popup-content {\n    border-top-right-radius: 0; }\n  :host .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-content {\n    border-bottom-left-radius: 0; }\n  :host .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-content {\n    border-bottom-right-radius: 0; }\n  :host .mapboxgl-marker {\n    position: absolute;\n    top: 0;\n    left: 0;\n    will-change: transform; }\n  :host .mapboxgl-user-location-dot {\n    background-color: #1da1f2;\n    width: 15px;\n    height: 15px;\n    border-radius: 50%;\n    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);\n    box-shadow: 0 0 2px rgba(0, 0, 0, 0.25); }\n  :host .mapboxgl-user-location-dot::before {\n    background-color: #1da1f2;\n    content: '';\n    width: 15px;\n    height: 15px;\n    border-radius: 50%;\n    position: absolute;\n    -webkit-animation: mapboxgl-user-location-dot-pulse 2s infinite;\n    -moz-animation: mapboxgl-user-location-dot-pulse 2s infinite;\n    -ms-animation: mapboxgl-user-location-dot-pulse 2s infinite;\n    animation: mapboxgl-user-location-dot-pulse 2s infinite; }\n  :host .mapboxgl-user-location-dot::after {\n    border-radius: 50%;\n    border: 2px solid #fff;\n    content: '';\n    height: 19px;\n    left: -2px;\n    position: absolute;\n    top: -2px;\n    width: 19px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n\n\@-webkit-keyframes mapboxgl-user-location-dot-pulse {\n  0% {\n    -webkit-transform: scale(1);\n    opacity: 1; }\n  70% {\n    -webkit-transform: scale(3);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n    opacity: 0; } }\n\n\@-ms-keyframes mapboxgl-user-location-dot-pulse {\n  :host 0% {\n    -ms-transform: scale(1);\n    opacity: 1; }\n  :host 70% {\n    -ms-transform: scale(3);\n    opacity: 0; }\n  :host 100% {\n    -ms-transform: scale(1);\n    opacity: 0; } }\n\n\@keyframes mapboxgl-user-location-dot-pulse {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1; }\n  70% {\n    -webkit-transform: scale(3);\n    transform: scale(3);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0; } }\n  :host .mapboxgl-user-location-dot-stale {\n    background-color: #aaa; }\n  :host .mapboxgl-user-location-dot-stale::after {\n    display: none; }\n  :host .mapboxgl-crosshair,\n  :host .mapboxgl-crosshair .mapboxgl-interactive,\n  :host .mapboxgl-crosshair .mapboxgl-interactive:active {\n    cursor: crosshair; }\n  :host .mapboxgl-boxzoom {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    background: #fff;\n    border: 2px dotted #202020;\n    opacity: 0.5; }\n  \@media print {\n    :host {\n      /* stylelint-disable-next-line selector-class-pattern */ }\n      :host .mapbox-improve-map {\n        display: none; } }\n  :host .column-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: 100%;\n    height: 100%; }\n    :host .column-container .control {\n      display: -ms-flexbox;\n      display: flex;\n      position: absolute;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 1.5rem;\n      height: 1.5rem;\n      border-radius: 50%;\n      z-index: 5; }\n      :host .column-container .control.control-size {\n        bottom: var(--padding-10, 0.625rem);\n        left: var(--padding-35, 2.1875rem);\n        margin: 0 0 var(--padding-10, 0.625rem) var(--padding-10, 0.625rem);\n        background: var(--black, #000000);\n        color: white; }\n    :host .column-container .map-container {\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      position: absolute;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row; }\n      :host .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl.mapboxgl-ctrl-attrib.mapboxgl-compact {\n        display: none; }\n      :host .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-left {\n        bottom: var(--padding-10, 0.625rem); }\n        :host .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl {\n          float: unset;\n          border-radius: 50%;\n          -webkit-box-shadow: none;\n          box-shadow: none; }\n          :host .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl .mapboxgl-ctrl-logo {\n            display: none; }\n          :host .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl button {\n            width: 1.5rem;\n            height: 1.5rem;\n            border-radius: 50%;\n            background: none;\n            font-family: \"yoobicons\" !important;\n            font-size: 1.5rem;\n            text-align: center; }\n            :host .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl button:before {\n              content: \"\\e9b3\"; }\n      :host .column-container .map-container .mapboxgl-canvas-container .mapboxgl-user-location-dot {\n        background: var(--locate-me-background-color); }\n        :host .column-container .map-container .mapboxgl-canvas-container .mapboxgl-user-location-dot:before {\n          background: var(--locate-me-background-color); }\n    :host .column-container .marker-info {\n      padding-bottom: var(--padding-10, 0.625rem);\n      border-top: var(--border-width, 1px) solid var(--border-color);\n      background: var(--light, #FFFFFF);\n      text-align: center; }\n      :host .column-container .marker-info .title {\n        margin-top: var(--padding-10, 0.625rem);\n        font-weight: 500; }\n\n:host(.grid-map) .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-left {\n  top: unset;\n  right: unset;\n  bottom: 6.5rem;\n  left: var(--padding-15, 0.9375rem); }\n  :host(.grid-map) .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl {\n    margin: 0; }\n\n:host(.grid-map-card-open) .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-left {\n  top: unset;\n  right: unset;\n  bottom: 11rem;\n  left: var(--padding-15, 0.9375rem); }\n  :host(.grid-map-card-open) .column-container .map-container .mapboxgl-control-container .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl {\n    margin: 0; }"; }
}

class YooMapJsComponent {
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
    static get style() { return ":host {\n  /* Basics */\n  /* Inputs */\n  /* Errors */\n  /* Routes */\n  /* Instructions */\n  /* icons */\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%; }\n  :host .leaflet-container {\n    background: #fff;\n    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;\n    color: #404040;\n    color: rgba(0, 0, 0, 0.75);\n    -ms-touch-action: none; }\n  :host .leaflet-container *, :host .leaflet-container :after, :host .leaflet-container :before {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box; }\n  :host .leaflet-container h1, :host .leaflet-container h2, :host .leaflet-container h3, :host .leaflet-container h4, :host .leaflet-container h5, :host .leaflet-container h6, :host .leaflet-container p {\n    font-size: var(--font-m, 15px);\n    line-height: 20px;\n    margin: 0 0 10px; }\n  :host .leaflet-container .marker-description img {\n    margin-bottom: 10px; }\n  :host .leaflet-container a {\n    color: #3887BE;\n    font-weight: 400;\n    text-decoration: none; }\n  :host .leaflet-container a:hover, :host .leaflet-container.dark a {\n    color: #63b6e5; }\n  :host .leaflet-container.dark a:hover {\n    color: #8fcaec; }\n  :host .leaflet-container .mapbox-button, :host .leaflet-container.dark .mapbox-button {\n    background-color: #3887be;\n    display: inline-block;\n    height: 40px;\n    line-height: 40px;\n    text-decoration: none;\n    color: #fff;\n    font-size: var(--font-s, 13px);\n    white-space: nowrap;\n    text-overflow: ellipsis; }\n  :host .leaflet-container .mapbox-button:hover, :host .leaflet-container.dark .mapbox-button:hover {\n    color: #fff;\n    background-color: #3bb2d0; }\n  :host .leaflet-image-layer, :host .leaflet-layer, :host .leaflet-map-pane canvas, :host .leaflet-map-pane svg, :host .leaflet-marker-icon, :host .leaflet-marker-shadow, :host .leaflet-pane, :host .leaflet-tile, :host .leaflet-tile-container, :host .leaflet-zoom-box {\n    position: absolute;\n    left: 0;\n    top: 0; }\n  :host .leaflet-container {\n    overflow: hidden; }\n  :host .leaflet-marker-icon, :host .leaflet-marker-shadow, :host .leaflet-tile {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-user-drag: none; }\n  :host .leaflet-safari .leaflet-tile {\n    image-rendering: -webkit-optimize-contrast; }\n  :host .leaflet-safari .leaflet-tile-container {\n    width: 1600px;\n    height: 1600px;\n    -webkit-transform-origin: 0 0; }\n  :host .leaflet-marker-icon, :host .leaflet-marker-shadow {\n    display: block; }\n  :host .leaflet-container .leaflet-marker-pane img, :host .leaflet-container .leaflet-overlay-pane svg, :host .leaflet-container .leaflet-tile-pane img, :host .leaflet-container img.leaflet-image-layer {\n    max-width: none !important; }\n  :host .leaflet-container.leaflet-touch-zoom {\n    -ms-touch-action: pan-x pan-y;\n    touch-action: pan-x pan-y; }\n  :host .leaflet-container.leaflet-touch-drag {\n    -ms-touch-action: pinch-zoom; }\n  :host .leaflet-container.leaflet-touch-drag.leaflet-touch-drag {\n    -ms-touch-action: none;\n    touch-action: none; }\n  :host .leaflet-tile {\n    -webkit-filter: inherit;\n    filter: inherit;\n    visibility: hidden; }\n  :host .leaflet-tile-loaded {\n    visibility: inherit; }\n  :host .leaflet-zoom-box {\n    width: 0;\n    height: 0;\n    z-index: 800; }\n  :host .leaflet-map-pane canvas {\n    z-index: 1; }\n  :host .leaflet-map-pane svg, :host .leaflet-tile-pane {\n    z-index: 2; }\n  :host .leaflet-overlay-pane {\n    z-index: 4; }\n  :host .leaflet-shadow-pane {\n    z-index: 5; }\n  :host .leaflet-marker-pane {\n    z-index: 6; }\n  :host .leaflet-tooltip-pane {\n    z-index: 7; }\n  :host .leaflet-popup-pane {\n    z-index: 8; }\n  :host .leaflet-control {\n    position: relative;\n    z-index: 800;\n    pointer-events: visiblePainted;\n    pointer-events: auto; }\n  :host .leaflet-bottom, :host .leaflet-top {\n    position: absolute;\n    z-index: 1000;\n    pointer-events: none; }\n  :host .leaflet-top {\n    top: 0; }\n  :host .leaflet-right {\n    right: 0; }\n  :host .leaflet-bottom {\n    bottom: 0; }\n  :host .leaflet-left {\n    left: 0; }\n  :host .leaflet-control {\n    float: left;\n    clear: both; }\n  :host .leaflet-right .leaflet-control {\n    float: right; }\n  :host .leaflet-top .leaflet-control {\n    margin-top: 10px; }\n  :host .leaflet-bottom .leaflet-control {\n    margin-bottom: 10px; }\n  :host .leaflet-left .leaflet-control {\n    margin-left: 10px; }\n  :host .leaflet-right .leaflet-control {\n    margin-right: 10px; }\n  :host .leaflet-fade-anim .leaflet-tile {\n    will-change: opacity; }\n  :host .leaflet-fade-anim .leaflet-popup {\n    opacity: 0;\n    -webkit-transition: opacity .2s linear;\n    -moz-transition: opacity .2s linear;\n    -o-transition: opacity .2s linear;\n    transition: opacity .2s linear; }\n  :host .leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\n    opacity: 1; }\n  :host .leaflet-zoom-animated {\n    -webkit-transform-origin: 0 0;\n    -ms-transform-origin: 0 0;\n    transform-origin: 0 0; }\n  :host .leaflet-zoom-anim .leaflet-zoom-animated {\n    will-change: transform;\n    -webkit-transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.25, 1);\n    -moz-transition: -moz-transform 0.25s cubic-bezier(0, 0, 0.25, 1);\n    -o-transition: -o-transform 0.25s cubic-bezier(0, 0, 0.25, 1);\n    transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.25, 1);\n    transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1);\n    transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1), -webkit-transform 0.25s cubic-bezier(0, 0, 0.25, 1); }\n  :host .leaflet-pan-anim .leaflet-tile, :host .leaflet-zoom-anim .leaflet-tile {\n    -webkit-transition: none;\n    -moz-transition: none;\n    -o-transition: none;\n    transition: none; }\n  :host .leaflet-zoom-anim .leaflet-zoom-hide {\n    visibility: hidden; }\n  :host .leaflet-interactive {\n    cursor: pointer; }\n  :host .leaflet-grab {\n    cursor: -webkit-grab;\n    cursor: -moz-grab; }\n  :host .leaflet-crosshair, :host .leaflet-crosshair .leaflet-interactive {\n    cursor: crosshair; }\n  :host .leaflet-control, :host .leaflet-popup-pane {\n    cursor: auto; }\n  :host .leaflet-dragging .leaflet-grab, :host .leaflet-dragging .leaflet-grab .leaflet-interactive, :host .leaflet-dragging .leaflet-marker-draggable {\n    cursor: move;\n    cursor: -webkit-grabbing;\n    cursor: -moz-grabbing; }\n  :host .leaflet-image-layer, :host .leaflet-marker-icon, :host .leaflet-marker-shadow, :host .leaflet-pane > svg path, :host .leaflet-tile-container {\n    pointer-events: none; }\n  :host .leaflet-image-layer.leaflet-interactive, :host .leaflet-marker-icon.leaflet-interactive, :host .leaflet-pane > svg path.leaflet-interactive {\n    pointer-events: visiblePainted;\n    pointer-events: auto; }\n  :host .leaflet-container {\n    outline: 0; }\n  :host .leaflet-zoom-box {\n    background: #fff;\n    border: 2px dotted #202020;\n    opacity: .5; }\n  :host .leaflet-bar, :host .leaflet-control-layers {\n    background-color: #fff;\n    border: 1px solid #999;\n    border-color: rgba(0, 0, 0, 0.4);\n    border-radius: 3px;\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n  :host .leaflet-bar a, :host .leaflet-bar a:hover {\n    color: #404040;\n    color: rgba(0, 0, 0, 0.75);\n    border-bottom: 1px solid #ddd;\n    border-bottom-color: rgba(0, 0, 0, 0.1); }\n  :host .leaflet-bar a:last-child {\n    border-bottom: 0; }\n  :host .leaflet-bar a:active, :host .leaflet-bar a:hover {\n    background-color: #f8f8f8;\n    cursor: pointer; }\n  :host .leaflet-bar a:hover:first-child {\n    border-radius: 3px 3px 0 0; }\n  :host .leaflet-bar a:hover:last-child {\n    border-radius: 0 0 3px 3px; }\n  :host .leaflet-bar a:hover:only-of-type {\n    border-radius: 3px; }\n  :host .leaflet-bar .leaflet-disabled {\n    cursor: default;\n    opacity: .75; }\n  :host .leaflet-control-zoom-in, :host .leaflet-control-zoom-out {\n    display: block;\n    content: '';\n    text-align: center;\n    font-size: var(--font-xl, 36px);\n    color: black; }\n  :host .leaflet-control-layers .leaflet-control-layers-list, :host .leaflet-control-layers-expanded .leaflet-control-layers-toggle {\n    display: none; }\n  :host .leaflet-control-layers-expanded .leaflet-control-layers-list {\n    display: block;\n    position: relative; }\n  :host .leaflet-control-layers-expanded {\n    background: #fff;\n    padding: 6px 10px 6px 6px;\n    color: #404040;\n    color: rgba(0, 0, 0, 0.75); }\n  :host .leaflet-control-layers-selector {\n    margin-top: 2px;\n    position: relative;\n    top: 1px; }\n  :host .leaflet-control-layers label {\n    display: block; }\n  :host .leaflet-control-layers-separator {\n    height: 0;\n    border-top: 1px solid #ddd;\n    border-top-color: rgba(0, 0, 0, 0.1);\n    margin: 5px -10px 5px -6px; }\n  :host .leaflet-container .leaflet-control-attribution {\n    background-color: rgba(255, 255, 255, 0.5);\n    margin: 0;\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n  :host .leaflet-container .leaflet-control-attribution a, :host .leaflet-container .map-info-container a {\n    color: #404040; }\n  :host .leaflet-control-attribution a:hover, :host .map-info-container a:hover {\n    color: inherit;\n    text-decoration: underline; }\n  :host .leaflet-control-attribution, :host .leaflet-control-scale-line {\n    padding: 0 5px; }\n  :host .leaflet-left .leaflet-control-scale {\n    margin-left: 5px; }\n  :host .leaflet-bottom .leaflet-control-scale {\n    margin-bottom: 5px; }\n  :host .leaflet-container .mapbox-improve-map {\n    font-weight: 700; }\n  :host .leaflet-control-scale-line {\n    background-color: rgba(255, 255, 255, 0.5);\n    border: 1px solid #999;\n    border-color: rgba(0, 0, 0, 0.4);\n    border-top: 0;\n    padding: 2px 5px 1px;\n    white-space: nowrap;\n    overflow: hidden; }\n  :host .leaflet-control-scale-line:last-child {\n    border-top: 2px solid #ddd;\n    border-top-color: rgba(0, 0, 0, 0.1);\n    border-bottom: 0;\n    margin-top: -2px; }\n  :host .leaflet-container .leaflet-control-attribution.leaflet-compact-attribution {\n    margin: 10px;\n    background: #fff;\n    border-radius: 3px 13px 13px 3px;\n    padding: 3px 31px 3px 3px;\n    visibility: hidden; }\n  :host .leaflet-control-attribution.leaflet-compact-attribution:hover {\n    visibility: visible; }\n  :host .leaflet-control-attribution.leaflet-compact-attribution:after {\n    content: '';\n    background-color: #fff;\n    background-color: rgba(255, 255, 255, 0.5);\n    background-position: 0 -78px;\n    border-radius: 50%;\n    position: absolute;\n    display: inline-block;\n    width: 26px;\n    height: 26px;\n    vertical-align: middle;\n    bottom: 0;\n    z-index: 1;\n    visibility: visible;\n    cursor: pointer; }\n  :host .leaflet-control-attribution.leaflet-compact-attribution:hover:after {\n    background-color: #fff; }\n  :host .leaflet-right .leaflet-control-attribution.leaflet-compact-attribution:after {\n    right: 0; }\n  :host .leaflet-left .leaflet-control-attribution.leaflet-compact-attribution:after {\n    left: 0; }\n  :host .leaflet-touch .leaflet-bar, :host .leaflet-touch .leaflet-control-layers {\n    border: 2px solid rgba(0, 0, 0, 0.2);\n    background-clip: padding-box; }\n  :host .leaflet-popup {\n    position: absolute;\n    text-align: center;\n    pointer-events: none; }\n  :host .leaflet-popup-content-wrapper {\n    padding: 1px;\n    text-align: left;\n    pointer-events: all; }\n  :host .leaflet-popup-content {\n    padding: 10px 10px 15px;\n    margin: 0;\n    line-height: inherit; }\n  :host .leaflet-popup-close-button + .leaflet-popup-content-wrapper .leaflet-popup-content {\n    padding-top: 15px; }\n  :host .leaflet-popup-tip-container {\n    width: 20px;\n    height: 20px;\n    margin: 0 auto;\n    position: relative; }\n  :host .leaflet-popup-tip {\n    width: 0;\n    height: 0;\n    margin: 0;\n    border-left: 10px solid transparent;\n    border-right: 10px solid transparent;\n    border-top: 10px solid #fff;\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n  :host .leaflet-popup-close-button {\n    text-indent: -999em;\n    position: absolute;\n    top: 0;\n    right: 0;\n    pointer-events: all; }\n  :host .leaflet-popup-close-button:hover {\n    background-color: #f8f8f8; }\n  :host .leaflet-popup-scrolled {\n    overflow: auto;\n    border-bottom: 1px solid #ddd;\n    border-top: 1px solid #ddd; }\n  :host .leaflet-div-icon {\n    background: #fff;\n    border: 1px solid #999;\n    border-color: rgba(0, 0, 0, 0.4); }\n  :host .leaflet-editing-icon {\n    border-radius: 3px; }\n  :host .leaflet-tooltip {\n    position: absolute;\n    padding: 5px;\n    background-color: #fff;\n    border: 1px solid #fff;\n    border-radius: 3px;\n    white-space: nowrap;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    pointer-events: none; }\n  :host .leaflet-tooltip.leaflet-clickable {\n    cursor: pointer;\n    pointer-events: auto; }\n  :host .leaflet-tooltip-bottom:before, :host .leaflet-tooltip-left:before, :host .leaflet-tooltip-right:before, :host .leaflet-tooltip-top:before {\n    content: '';\n    position: absolute;\n    pointer-events: none;\n    border: 5px solid transparent;\n    background: 0 0; }\n  :host .leaflet-tooltip-bottom {\n    margin-top: 5px; }\n  :host .leaflet-tooltip-top {\n    margin-top: -5px; }\n  :host .leaflet-tooltip-bottom:before, :host .leaflet-tooltip-top:before {\n    left: 50%;\n    margin-left: -5px; }\n  :host .leaflet-tooltip-top:before {\n    bottom: 0;\n    margin-bottom: -10px;\n    border-top-color: #fff; }\n  :host .leaflet-tooltip-bottom:before {\n    top: 0;\n    margin-top: -15px;\n    margin-left: -5px;\n    border-bottom-color: #fff; }\n  :host .leaflet-tooltip-left {\n    margin-left: -5px; }\n  :host .leaflet-tooltip-right {\n    margin-left: 5px; }\n  :host .leaflet-tooltip-left:before, :host .leaflet-tooltip-right:before {\n    top: 50%;\n    margin-top: -5px; }\n  :host .leaflet-tooltip-left:before {\n    right: 0;\n    margin-right: -10px;\n    border-left-color: #fff; }\n  :host .leaflet-tooltip-right:before {\n    left: 0;\n    margin-left: -10px;\n    border-right-color: #fff; }\n  :host .leaflet-bar a, :host .leaflet-control-layers-toggle, :host .leaflet-popup-close-button, :host .map-tooltip.closable .close, :host .mapbox-button-icon:before, :host .mapbox-icon {\n    content: '';\n    display: inline-block;\n    width: 26px;\n    height: 26px;\n    vertical-align: middle;\n    background-repeat: no-repeat; }\n  :host .leaflet-bar a {\n    display: block; }\n  :host .leaflet-container.dark .map-tooltip .close, :host .leaflet-control-attribution:after, :host .leaflet-control-layers-toggle, :host .leaflet-control-zoom-in, :host .leaflet-control-zoom-out, :host .leaflet-popup-close-button, :host .map-tooltip .close, :host .mapbox-icon {\n    opacity: .75;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(transparent));\n    background-image: linear-gradient(transparent, transparent);\n    background-repeat: no-repeat;\n    background-size: 26px 260px; }\n  :host .leaflet-container.dark .leaflet-control-attribution:after, :host .leaflet-container.dark .leaflet-control-layers-toggle, :host .leaflet-container.dark .leaflet-control-zoom-in, :host .leaflet-container.dark .leaflet-control-zoom-out, :host .leaflet-container.dark .mapbox-icon, :host .mapbox-button-icon:before {\n    opacity: 1;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(transparent));\n    background-image: linear-gradient(transparent, transparent);\n    background-size: 26px 260px; }\n  :host .leaflet-bar .leaflet-control-zoom-in {\n    background-position: 0 0; }\n  :host .leaflet-bar .leaflet-control-zoom-out {\n    background-position: 0 -26px; }\n  :host .leaflet-popup-close-button, :host .map-tooltip.closable .close {\n    background-position: -3px -55px;\n    width: 20px;\n    height: 20px;\n    border-radius: 0 3px 0 0; }\n  :host .mapbox-icon-info {\n    background-position: 0 -78px; }\n  :host .leaflet-control-layers-toggle {\n    background-position: 0 -104px; }\n  :host .mapbox-icon.mapbox-icon-share, :host .mapbox-icon.mapbox-icon-share:before {\n    background-position: 0 -130px; }\n  :host .mapbox-icon.mapbox-icon-geocoder, :host .mapbox-icon.mapbox-icon-geocoder:before {\n    background-position: 0 -156px; }\n  :host .mapbox-icon-facebook, :host .mapbox-icon-facebook:before {\n    background-position: 0 -182px; }\n  :host .mapbox-icon-twitter, :host .mapbox-icon-twitter:before {\n    background-position: 0 -208px; }\n  :host .mapbox-icon-pinterest, :host .mapbox-icon-pinterest:before {\n    background-position: 0 -234px; }\n  :host .leaflet-popup-content-wrapper, :host .map-legends, :host .map-tooltip {\n    background: #fff;\n    border-radius: 3px;\n    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); }\n  :host .map-legends, :host .map-tooltip {\n    max-width: 300px; }\n  :host .map-legends .map-legend {\n    padding: 10px; }\n  :host .map-tooltip {\n    z-index: 999999;\n    padding: 10px;\n    min-width: 180px;\n    max-height: 400px;\n    overflow: auto;\n    opacity: 1;\n    -webkit-transition: opacity 150ms;\n    -moz-transition: opacity 150ms;\n    -o-transition: opacity 150ms;\n    transition: opacity 150ms; }\n  :host .map-tooltip .close {\n    text-indent: -999em;\n    overflow: hidden;\n    display: none; }\n  :host .map-tooltip.closable .close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-radius: 3px; }\n  :host .map-tooltip.closable .close:active {\n    background-color: #f8f8f8; }\n  :host .leaflet-control-interaction {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    width: 300px; }\n  :host .leaflet-popup-content .marker-title {\n    font-weight: 700; }\n  :host .leaflet-control .mapbox-button {\n    background-color: #fff;\n    border: 1px solid #ddd;\n    border-color: rgba(0, 0, 0, 0.1);\n    padding: 5px 10px;\n    border-radius: 3px; }\n  :host .mapbox-modal > div {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: -1;\n    overflow-y: auto; }\n  :host .mapbox-modal.active > div {\n    z-index: 99999;\n    -webkit-transition: all .2s, z-index 0 0;\n    transition: all .2s, z-index 0 0; }\n  :host .mapbox-modal .mapbox-modal-mask {\n    background: rgba(0, 0, 0, 0.5);\n    opacity: 0; }\n  :host .mapbox-modal.active .mapbox-modal-mask {\n    opacity: 1; }\n  :host .mapbox-modal .mapbox-modal-content {\n    -webkit-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    transform: translateY(-100%); }\n  :host .mapbox-modal.active .mapbox-modal-content {\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0); }\n  :host .mapbox-modal-body {\n    position: relative;\n    background: #fff;\n    padding: 20px;\n    z-index: 1000;\n    width: 50%;\n    margin: 20px 0 20px 25%; }\n  :host .mapbox-share-buttons {\n    margin: 0 0 20px; }\n  :host .mapbox-share-buttons a {\n    width: 33.3333%;\n    border-left: 1px solid #fff;\n    text-align: center;\n    border-radius: 0; }\n  :host .mapbox-share-buttons a:last-child {\n    border-radius: 0 3px 3px 0; }\n  :host .mapbox-share-buttons a:first-child {\n    border: 0;\n    border-radius: 3px 0 0 3px; }\n  :host .mapbox-modal input {\n    width: 100%;\n    height: 40px;\n    padding: 10px;\n    border: 1px solid #ddd;\n    border-color: rgba(0, 0, 0, 0.1);\n    color: rgba(0, 0, 0, 0.5); }\n  :host .mapbox-modal label {\n    display: block;\n    margin-top: 5px; }\n  :host .leaflet-control-mapbox-geocoder {\n    position: relative; }\n  :host .leaflet-control-mapbox-geocoder.searching {\n    opacity: .75; }\n  :host .leaflet-control-mapbox-geocoder .leaflet-control-mapbox-geocoder-wrap {\n    background: #fff;\n    position: absolute;\n    border: 1px solid #999;\n    border-color: rgba(0, 0, 0, 0.4);\n    overflow: hidden;\n    left: 26px;\n    height: 28px;\n    width: 0;\n    top: -1px;\n    border-radius: 0 3px 3px 0;\n    opacity: 0;\n    -webkit-transition: opacity 100ms;\n    -moz-transition: opacity 100ms;\n    -o-transition: opacity 100ms;\n    transition: opacity 100ms; }\n  :host .leaflet-control-mapbox-geocoder.active .leaflet-control-mapbox-geocoder-wrap {\n    width: 180px;\n    opacity: 1; }\n  :host .leaflet-bar .leaflet-control-mapbox-geocoder-toggle, :host .leaflet-bar .leaflet-control-mapbox-geocoder-toggle:hover {\n    border-bottom: 0; }\n  :host .leaflet-control-mapbox-geocoder-toggle {\n    border-radius: 3px; }\n  :host .leaflet-control-mapbox-geocoder.active, :host .leaflet-control-mapbox-geocoder.active .leaflet-control-mapbox-geocoder-toggle {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0; }\n  :host .leaflet-control-mapbox-geocoder .leaflet-control-mapbox-geocoder-form input {\n    background: 0 0;\n    border: 0;\n    width: 180px;\n    padding: 0 0 0 10px;\n    height: 26px;\n    outline: 0; }\n  :host .leaflet-control-mapbox-geocoder-results {\n    width: 180px;\n    position: absolute;\n    left: 26px;\n    top: 25px;\n    border-radius: 0 0 3px 3px; }\n  :host .leaflet-control-mapbox-geocoder.active .leaflet-control-mapbox-geocoder-results {\n    background: #fff;\n    border: 1px solid #999;\n    border-color: rgba(0, 0, 0, 0.4); }\n  :host .leaflet-control-mapbox-geocoder-results a, :host .leaflet-control-mapbox-geocoder-results span {\n    padding: 0 10px;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n    width: 100%;\n    font-size: 12px;\n    line-height: 26px;\n    text-align: left;\n    overflow: hidden; }\n  :host .leaflet-container.dark .leaflet-control .leaflet-control-mapbox-geocoder-results a:hover, :host .leaflet-control-mapbox-geocoder-results a:hover {\n    background: #f8f8f8;\n    opacity: 1; }\n  :host .leaflet-right .leaflet-control-mapbox-geocoder-results, :host .leaflet-right .leaflet-control-mapbox-geocoder-wrap {\n    left: auto;\n    right: 26px; }\n  :host .leaflet-right .leaflet-control-mapbox-geocoder-wrap {\n    border-radius: 3px 0 0 3px; }\n  :host .leaflet-right .leaflet-control-mapbox-geocoder.active, :host .leaflet-right .leaflet-control-mapbox-geocoder.active .leaflet-control-mapbox-geocoder-toggle {\n    border-radius: 0 3px 3px 0; }\n  :host .leaflet-bottom .leaflet-control-mapbox-geocoder-results {\n    top: auto;\n    bottom: 25px;\n    border-radius: 3px 3px 0 0; }\n  :host .mapbox-logo.mapbox-logo-true {\n    margin: 0 0 5px 5px; }\n  :host .mapbox-logo-true:before {\n    content: '';\n    display: inline-block;\n    width: 85px;\n    height: 21px;\n    vertical-align: middle; }\n  :host .mapbox-logo.mapbox-logo-true {\n    background-repeat: no-repeat;\n    background-size: 85px 21px;\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgODAuNDcgMjAuMDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDgwLjQ3IDIwLjAyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe29wYWNpdHk6MC42O2ZpbGw6I0ZGRkZGRjtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30uc3Qxe29wYWNpdHk6MC42O2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7fTwvc3R5bGU+PGc+PHBhdGggY2xhc3M9InN0MCIgZD0iTTc5LjI5LDEzLjYxYzAsMC4xMS0wLjA5LDAuMi0wLjIsMC4yaC0xLjUzYy0wLjEyLDAtMC4yMy0wLjA2LTAuMjktMC4xNmwtMS4zNy0yLjI4bC0xLjM3LDIuMjhjLTAuMDYsMC4xLTAuMTcsMC4xNi0wLjI5LDAuMTZoLTEuNTNjLTAuMDQsMC0wLjA4LTAuMDEtMC4xMS0wLjAzYy0wLjA5LTAuMDYtMC4xMi0wLjE4LTAuMDYtMC4yN2MwLDAsMCwwLDAsMGwyLjMxLTMuNWwtMi4yOC0zLjQ3Yy0wLjAyLTAuMDMtMC4wMy0wLjA3LTAuMDMtMC4xMWMwLTAuMTEsMC4wOS0wLjIsMC4yLTAuMmgxLjUzYzAuMTIsMCwwLjIzLDAuMDYsMC4yOSwwLjE2bDEuMzQsMi4yNWwxLjMzLTIuMjRjMC4wNi0wLjEsMC4xNy0wLjE2LDAuMjktMC4xNmgxLjUzYzAuMDQsMCwwLjA4LDAuMDEsMC4xMSwwLjAzYzAuMDksMC4wNiwwLjEyLDAuMTgsMC4wNiwwLjI3YzAsMCwwLDAsMCwwTDc2Ljk2LDEwbDIuMzEsMy41Qzc5LjI4LDEzLjUzLDc5LjI5LDEzLjU3LDc5LjI5LDEzLjYxeiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02My4wOSw5LjE2Yy0wLjM3LTEuNzktMS44Ny0zLjEyLTMuNjYtMy4xMmMtMC45OCwwLTEuOTMsMC40LTIuNiwxLjEyVjMuMzdjMC0wLjEyLTAuMS0wLjIyLTAuMjItMC4yMmgtMS4zM2MtMC4xMiwwLTAuMjIsMC4xLTAuMjIsMC4yMnYxMC4yMWMwLDAuMTIsMC4xLDAuMjIsMC4yMiwwLjIyaDEuMzNjMC4xMiwwLDAuMjItMC4xLDAuMjItMC4yMnYtMC43YzAuNjgsMC43MSwxLjYyLDEuMTIsMi42LDEuMTJjMS43OSwwLDMuMjktMS4zNCwzLjY2LTMuMTNDNjMuMjEsMTAuMyw2My4yMSw5LjcyLDYzLjA5LDkuMTZMNjMuMDksOS4xNnogTTU5LjEyLDEyLjQxYy0xLjI2LDAtMi4yOC0xLjA2LTIuMy0yLjM2VjkuOTljMC4wMi0xLjMxLDEuMDQtMi4zNiwyLjMtMi4zNnMyLjMsMS4wNywyLjMsMi4zOVM2MC4zOSwxMi40MSw1OS4xMiwxMi40MXoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjguMjYsNi4wNGMtMS44OS0wLjAxLTMuNTQsMS4yOS0zLjk2LDMuMTNjLTAuMTIsMC41Ni0wLjEyLDEuMTMsMCwxLjY5YzAuNDIsMS44NSwyLjA3LDMuMTYsMy45NywzLjE0YzIuMjQsMCw0LjA2LTEuNzgsNC4wNi0zLjk5UzcwLjUxLDYuMDQsNjguMjYsNi4wNHogTTY4LjI0LDEyLjQyYy0xLjI3LDAtMi4zLTEuMDctMi4zLTIuMzlzMS4wMy0yLjQsMi4zLTIuNHMyLjMsMS4wNywyLjMsMi4zOVM2OS41MSwxMi40MSw2OC4yNCwxMi40Mkw2OC4yNCwxMi40MnoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTkuMTIsNy42M2MtMS4yNiwwLTIuMjgsMS4wNi0yLjMsMi4zNnYwLjA2YzAuMDIsMS4zMSwxLjA0LDIuMzYsMi4zLDIuMzZzMi4zLTEuMDcsMi4zLTIuMzlTNjAuMzksNy42Myw1OS4xMiw3LjYzeiBNNTkuMTIsMTEuMjNjLTAuNiwwLTEuMDktMC41My0xLjExLTEuMTlWMTBjMC4wMS0wLjY2LDAuNTEtMS4xOSwxLjExLTEuMTlzMS4xMSwwLjU0LDEuMTEsMS4yMVM1OS43NCwxMS4yMyw1OS4xMiwxMS4yM3oiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNNjguMjQsNy42M2MtMS4yNywwLTIuMywxLjA3LTIuMywyLjM5czEuMDMsMi4zOSwyLjMsMi4zOXMyLjMtMS4wNywyLjMtMi4zOVM2OS41MSw3LjYzLDY4LjI0LDcuNjN6IE02OC4yNCwxMS4yM2MtMC42MSwwLTEuMTEtMC41NC0xLjExLTEuMjFzMC41LTEuMiwxLjExLTEuMnMxLjExLDAuNTQsMS4xMSwxLjIxUzY4Ljg1LDExLjIzLDY4LjI0LDExLjIzeiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My41Niw2LjI0aC0xLjMzYy0wLjEyLDAtMC4yMiwwLjEtMC4yMiwwLjIydjAuN2MtMC42OC0wLjcxLTEuNjItMS4xMi0yLjYtMS4xMmMtMi4wNywwLTMuNzUsMS43OC0zLjc1LDMuOTlzMS42OSwzLjk5LDMuNzUsMy45OWMwLjk5LDAsMS45My0wLjQxLDIuNi0xLjEzdjAuN2MwLDAuMTIsMC4xLDAuMjIsMC4yMiwwLjIyaDEuMzNjMC4xMiwwLDAuMjItMC4xLDAuMjItMC4yMlY2LjQ0YzAtMC4xMS0wLjA5LTAuMjEtMC4yMS0wLjIxQzQzLjU3LDYuMjQsNDMuNTcsNi4yNCw0My41Niw2LjI0eiBNNDIuMDIsMTAuMDVjLTAuMDEsMS4zMS0xLjA0LDIuMzYtMi4zLDIuMzZzLTIuMy0xLjA3LTIuMy0yLjM5czEuMDMtMi40LDIuMjktMi40YzEuMjcsMCwyLjI4LDEuMDYsMi4zLDIuMzZMNDIuMDIsMTAuMDV6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTM5LjcyLDcuNjNjLTEuMjcsMC0yLjMsMS4wNy0yLjMsMi4zOXMxLjAzLDIuMzksMi4zLDIuMzlzMi4yOC0xLjA2LDIuMy0yLjM2VjkuOTlDNDIsOC42OCw0MC45OCw3LjYzLDM5LjcyLDcuNjN6IE0zOC42MiwxMC4wMmMwLTAuNjcsMC41LTEuMjEsMS4xMS0xLjIxYzAuNjEsMCwxLjA5LDAuNTMsMS4xMSwxLjE5djAuMDRjLTAuMDEsMC42NS0wLjUsMS4xOC0xLjExLDEuMThTMzguNjIsMTAuNjgsMzguNjIsMTAuMDJ6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTQ5LjkxLDYuMDRjLTAuOTgsMC0xLjkzLDAuNC0yLjYsMS4xMlY2LjQ1YzAtMC4xMi0wLjEtMC4yMi0wLjIyLTAuMjJoLTEuMzNjLTAuMTIsMC0wLjIyLDAuMS0wLjIyLDAuMjJ2MTAuMjFjMCwwLjEyLDAuMSwwLjIyLDAuMjIsMC4yMmgxLjMzYzAuMTIsMCwwLjIyLTAuMSwwLjIyLTAuMjJ2LTMuNzhjMC42OCwwLjcxLDEuNjIsMS4xMiwyLjYxLDEuMTJjMi4wNywwLDMuNzUtMS43OCwzLjc1LTMuOTlTNTEuOTgsNi4wNCw0OS45MSw2LjA0eiBNNDkuNiwxMi40MmMtMS4yNiwwLTIuMjgtMS4wNi0yLjMtMi4zNlY5Ljk5YzAuMDItMS4zMSwxLjA0LTIuMzcsMi4yOS0yLjM3YzEuMjYsMCwyLjMsMS4wNywyLjMsMi4zOVM1MC44NiwxMi40MSw0OS42LDEyLjQyTDQ5LjYsMTIuNDJ6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTQ5LjYsNy42M2MtMS4yNiwwLTIuMjgsMS4wNi0yLjMsMi4zNnYwLjA2YzAuMDIsMS4zMSwxLjA0LDIuMzYsMi4zLDIuMzZzMi4zLTEuMDcsMi4zLTIuMzlTNTAuODYsNy42Myw0OS42LDcuNjN6IE00OS42LDExLjIzYy0wLjYsMC0xLjA5LTAuNTMtMS4xMS0xLjE5VjEwQzQ4LjUsOS4zNCw0OSw4LjgxLDQ5LjYsOC44MWMwLjYsMCwxLjExLDAuNTUsMS4xMSwxLjIxUzUwLjIxLDExLjIzLDQ5LjYsMTEuMjN6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTM0LjM2LDEzLjU5YzAsMC4xMi0wLjEsMC4yMi0wLjIyLDAuMjJoLTEuMzRjLTAuMTIsMC0wLjIyLTAuMS0wLjIyLTAuMjJWOS4yNGMwLTAuOTMtMC43LTEuNjMtMS41NC0xLjYzYy0wLjc2LDAtMS4zOSwwLjY3LTEuNTEsMS41NGwwLjAxLDQuNDRjMCwwLjEyLTAuMSwwLjIyLTAuMjIsMC4yMmgtMS4zNGMtMC4xMiwwLTAuMjItMC4xLTAuMjItMC4yMlY5LjI0YzAtMC45My0wLjctMS42My0xLjU0LTEuNjNjLTAuODEsMC0xLjQ3LDAuNzUtMS41MiwxLjcxdjQuMjdjMCwwLjEyLTAuMSwwLjIyLTAuMjIsMC4yMmgtMS4zM2MtMC4xMiwwLTAuMjItMC4xLTAuMjItMC4yMlY2LjQ0YzAuMDEtMC4xMiwwLjEtMC4yMSwwLjIyLTAuMjFoMS4zM2MwLjEyLDAsMC4yMSwwLjEsMC4yMiwwLjIxdjAuNjNjMC40OC0wLjY1LDEuMjQtMS4wNCwyLjA2LTEuMDVoMC4wM2MxLjA0LDAsMS45OSwwLjU3LDIuNDgsMS40OGMwLjQzLTAuOSwxLjMzLTEuNDgsMi4zMi0xLjQ5YzEuNTQsMCwyLjc5LDEuMTksMi43NiwyLjY1TDM0LjM2LDEzLjU5eiIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04MC4zMiwxMi45N2wtMC4wNy0wLjEyTDc4LjM4LDEwbDEuODUtMi44MWMwLjQyLTAuNjQsMC4yNS0xLjQ5LTAuMzktMS45MmMtMC4wMS0wLjAxLTAuMDItMC4wMS0wLjAzLTAuMDJjLTAuMjItMC4xNC0wLjQ4LTAuMjEtMC43NC0wLjIxaC0xLjUzYy0wLjUzLDAtMS4wMywwLjI4LTEuMywwLjc0bC0wLjMyLDAuNTNsLTAuMzItMC41M2MtMC4yOC0wLjQ2LTAuNzctMC43NC0xLjMxLTAuNzRoLTEuNTNjLTAuNTcsMC0xLjA4LDAuMzUtMS4yOSwwLjg4Yy0yLjA5LTEuNTgtNS4wMy0xLjQtNi45MSwwLjQzYy0wLjMzLDAuMzItMC42MiwwLjY5LTAuODUsMS4wOWMtMC44NS0xLjU1LTIuNDUtMi42LTQuMjgtMi42Yy0wLjQ4LDAtMC45NiwwLjA3LTEuNDEsMC4yMlYzLjM3YzAtMC43OC0wLjYzLTEuNDEtMS40LTEuNDFoLTEuMzNjLTAuNzcsMC0xLjQsMC42My0xLjQsMS40djMuNTdjLTAuOS0xLjMtMi4zOC0yLjA4LTMuOTctMi4wOWMtMC43LDAtMS4zOSwwLjE1LTIuMDIsMC40NWMtMC4yMy0wLjE2LTAuNTEtMC4yNS0wLjgtMC4yNWgtMS4zM2MtMC40MywwLTAuODMsMC4yLTEuMSwwLjUzYy0wLjAyLTAuMDMtMC4wNC0wLjA1LTAuMDctMC4wOGMtMC4yNy0wLjI5LTAuNjUtMC40NS0xLjA0LTAuNDVoLTEuMzJjLTAuMjksMC0wLjU3LDAuMDktMC44LDAuMjVDNDAuOCw1LDQwLjEyLDQuODUsMzkuNDIsNC44NWMtMS43NCwwLTMuMjcsMC45NS00LjE2LDIuMzhjLTAuMTktMC40NC0wLjQ2LTAuODUtMC43OS0xLjE5Yy0wLjc2LTAuNzctMS44LTEuMTktMi44OC0xLjE5aC0wLjAxYy0wLjg1LDAuMDEtMS42NywwLjMxLTIuMzQsMC44NGMtMC43LTAuNTQtMS41Ni0wLjg0LTIuNDUtMC44NGgtMC4wM2MtMC4yOCwwLTAuNTUsMC4wMy0wLjgyLDAuMWMtMC4yNywwLjA2LTAuNTMsMC4xNS0wLjc4LDAuMjdjLTAuMi0wLjExLTAuNDMtMC4xNy0wLjY3LTAuMTdoLTEuMzNjLTAuNzgsMC0xLjQsMC42My0xLjQsMS40djcuMTRjMCwwLjc4LDAuNjMsMS40LDEuNCwxLjRoMS4zM2MwLjc4LDAsMS40MS0wLjYzLDEuNDEtMS40MWMwLDAsMCwwLDAsMFY5LjM1YzAuMDMtMC4zNCwwLjIyLTAuNTYsMC4zNC0wLjU2YzAuMTcsMCwwLjM2LDAuMTcsMC4zNiwwLjQ1djQuMzVjMCwwLjc4LDAuNjMsMS40LDEuNCwxLjRoMS4zNGMwLjc4LDAsMS40LTAuNjMsMS40LTEuNGwtMC4wMS00LjM1YzAuMDYtMC4zLDAuMjQtMC40NSwwLjMzLTAuNDVjMC4xNywwLDAuMzYsMC4xNywwLjM2LDAuNDV2NC4zNWMwLDAuNzgsMC42MywxLjQsMS40LDEuNGgxLjM0YzAuNzgsMCwxLjQtMC42MywxLjQtMS40di0wLjM2YzAuOTEsMS4yMywyLjM0LDEuOTYsMy44NywxLjk2YzAuNywwLDEuMzktMC4xNSwyLjAyLTAuNDVjMC4yMywwLjE2LDAuNTEsMC4yNSwwLjgsMC4yNWgxLjMyYzAuMjksMCwwLjU3LTAuMDksMC44LTAuMjV2MS45MWMwLDAuNzgsMC42MywxLjQsMS40LDEuNGgxLjMzYzAuNzgsMCwxLjQtMC42MywxLjQtMS40di0xLjY5YzAuNDYsMC4xNCwwLjk0LDAuMjIsMS40MiwwLjIxYzEuNjIsMCwzLjA3LTAuODMsMy45Ny0yLjF2MC41YzAsMC43OCwwLjYzLDEuNCwxLjQsMS40aDEuMzNjMC4yOSwwLDAuNTctMC4wOSwwLjgtMC4yNWMwLjYzLDAuMywxLjMyLDAuNDUsMi4wMiwwLjQ1YzEuODMsMCwzLjQzLTEuMDUsNC4yOC0yLjZjMS40NywyLjUyLDQuNzEsMy4zNiw3LjIyLDEuODljMC4xNy0wLjEsMC4zNC0wLjIxLDAuNS0wLjM0YzAuMjEsMC41MiwwLjcyLDAuODcsMS4yOSwwLjg2aDEuNTNjMC41MywwLDEuMDMtMC4yOCwxLjMtMC43NGwwLjM1LTAuNThsMC4zNSwwLjU4YzAuMjgsMC40NiwwLjc3LDAuNzQsMS4zMSwwLjc0aDEuNTJjMC43NywwLDEuMzktMC42MywxLjM4LTEuMzlDODAuNDcsMTMuMzgsODAuNDIsMTMuMTcsODAuMzIsMTIuOTdMODAuMzIsMTIuOTd6IE0zNC4xNSwxMy44MWgtMS4zNGMtMC4xMiwwLTAuMjItMC4xLTAuMjItMC4yMlY5LjI0YzAtMC45My0wLjctMS42My0xLjU0LTEuNjNjLTAuNzYsMC0xLjM5LDAuNjctMS41MSwxLjU0bDAuMDEsNC40NGMwLDAuMTItMC4xLDAuMjItMC4yMiwwLjIyaC0xLjM0Yy0wLjEyLDAtMC4yMi0wLjEtMC4yMi0wLjIyVjkuMjRjMC0wLjkzLTAuNy0xLjYzLTEuNTQtMS42M2MtMC44MSwwLTEuNDcsMC43NS0xLjUyLDEuNzF2NC4yN2MwLDAuMTItMC4xLDAuMjItMC4yMiwwLjIyaC0xLjMzYy0wLjEyLDAtMC4yMi0wLjEtMC4yMi0wLjIyVjYuNDRjMC4wMS0wLjEyLDAuMS0wLjIxLDAuMjItMC4yMWgxLjMzYzAuMTIsMCwwLjIxLDAuMSwwLjIyLDAuMjF2MC42M2MwLjQ4LTAuNjUsMS4yNC0xLjA0LDIuMDYtMS4wNWgwLjAzYzEuMDQsMCwxLjk5LDAuNTcsMi40OCwxLjQ4YzAuNDMtMC45LDEuMzMtMS40OCwyLjMyLTEuNDljMS41NCwwLDIuNzksMS4xOSwyLjc2LDIuNjVsMC4wMSw0LjkxQzM0LjM3LDEzLjcsMzQuMjcsMTMuOCwzNC4xNSwxMy44MUMzNC4xNSwxMy44MSwzNC4xNSwxMy44MSwzNC4xNSwxMy44MXogTTQzLjc4LDEzLjU5YzAsMC4xMi0wLjEsMC4yMi0wLjIyLDAuMjJoLTEuMzNjLTAuMTIsMC0wLjIyLTAuMS0wLjIyLTAuMjJ2LTAuNzFDNDEuMzQsMTMuNiw0MC40LDE0LDM5LjQyLDE0Yy0yLjA3LDAtMy43NS0xLjc4LTMuNzUtMy45OXMxLjY5LTMuOTksMy43NS0zLjk5YzAuOTgsMCwxLjkyLDAuNDEsMi42LDEuMTJ2LTAuN2MwLTAuMTIsMC4xLTAuMjIsMC4yMi0wLjIyaDEuMzNjMC4xMS0wLjAxLDAuMjEsMC4wOCwwLjIyLDAuMmMwLDAuMDEsMCwwLjAxLDAsMC4wMlYxMy41OXogTTQ5LjkxLDE0Yy0wLjk4LDAtMS45Mi0wLjQxLTIuNi0xLjEydjMuNzhjMCwwLjEyLTAuMSwwLjIyLTAuMjIsMC4yMmgtMS4zM2MtMC4xMiwwLTAuMjItMC4xLTAuMjItMC4yMlY2LjQ1YzAtMC4xMiwwLjEtMC4yMSwwLjIyLTAuMjFoMS4zM2MwLjEyLDAsMC4yMiwwLjEsMC4yMiwwLjIydjAuN2MwLjY4LTAuNzIsMS42Mi0xLjEyLDIuNi0xLjEyYzIuMDcsMCwzLjc1LDEuNzcsMy43NSwzLjk4UzUxLjk4LDE0LDQ5LjkxLDE0eiBNNjMuMDksMTAuODdDNjIuNzIsMTIuNjUsNjEuMjIsMTQsNTkuNDMsMTRjLTAuOTgsMC0xLjkyLTAuNDEtMi42LTEuMTJ2MC43YzAsMC4xMi0wLjEsMC4yMi0wLjIyLDAuMjJoLTEuMzNjLTAuMTIsMC0wLjIyLTAuMS0wLjIyLTAuMjJWMy4zN2MwLTAuMTIsMC4xLTAuMjIsMC4yMi0wLjIyaDEuMzNjMC4xMiwwLDAuMjIsMC4xLDAuMjIsMC4yMnYzLjc4YzAuNjgtMC43MSwxLjYyLTEuMTIsMi42LTEuMTFjMS43OSwwLDMuMjksMS4zMywzLjY2LDMuMTJDNjMuMjEsOS43Myw2My4yMSwxMC4zMSw2My4wOSwxMC44N0w2My4wOSwxMC44N0w2My4wOSwxMC44N3ogTTY4LjI2LDE0LjAxYy0xLjksMC4wMS0zLjU1LTEuMjktMy45Ny0zLjE0Yy0wLjEyLTAuNTYtMC4xMi0xLjEzLDAtMS42OWMwLjQyLTEuODUsMi4wNy0zLjE1LDMuOTctMy4xNGMyLjI1LDAsNC4wNiwxLjc4LDQuMDYsMy45OVM3MC41LDE0LjAxLDY4LjI2LDE0LjAxTDY4LjI2LDE0LjAxeiBNNzkuMDksMTMuODFoLTEuNTNjLTAuMTIsMC0wLjIzLTAuMDYtMC4yOS0wLjE2bC0xLjM3LTIuMjhsLTEuMzcsMi4yOGMtMC4wNiwwLjEtMC4xNywwLjE2LTAuMjksMC4xNmgtMS41M2MtMC4wNCwwLTAuMDgtMC4wMS0wLjExLTAuMDNjLTAuMDktMC4wNi0wLjEyLTAuMTgtMC4wNi0wLjI3YzAsMCwwLDAsMCwwbDIuMzEtMy41bC0yLjI4LTMuNDdjLTAuMDItMC4wMy0wLjAzLTAuMDctMC4wMy0wLjExYzAtMC4xMSwwLjA5LTAuMiwwLjItMC4yaDEuNTNjMC4xMiwwLDAuMjMsMC4wNiwwLjI5LDAuMTZsMS4zNCwyLjI1bDEuMzQtMi4yNWMwLjA2LTAuMSwwLjE3LTAuMTYsMC4yOS0wLjE2aDEuNTNjMC4wNCwwLDAuMDgsMC4wMSwwLjExLDAuMDNjMC4wOSwwLjA2LDAuMTIsMC4xOCwwLjA2LDAuMjdjMCwwLDAsMCwwLDBMNzYuOTYsMTBsMi4zMSwzLjVjMC4wMiwwLjAzLDAuMDMsMC4wNywwLjAzLDAuMTFDNzkuMjksMTMuNzIsNzkuMiwxMy44MSw3OS4wOSwxMy44MUM3OS4wOSwxMy44MSw3OS4wOSwxMy44MSw3OS4wOSwxMy44MUw3OS4wOSwxMy44MXoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAsMS4yMWMtNC44NywwLTguODEsMy45NS04LjgxLDguODFzMy45NSw4LjgxLDguODEsOC44MXM4LjgxLTMuOTUsOC44MS04LjgxQzE4LjgxLDUuMTUsMTQuODcsMS4yMSwxMCwxLjIxeiBNMTQuMTgsMTIuMTljLTEuODQsMS44NC00LjU1LDIuMi02LjM4LDIuMmMtMC42NywwLTEuMzQtMC4wNS0yLTAuMTVjMCwwLTAuOTctNS4zNywyLjA0LTguMzljMC43OS0wLjc5LDEuODYtMS4yMiwyLjk4LTEuMjJjMS4yMSwwLDIuMzcsMC40OSwzLjIzLDEuMzVDMTUuOCw3LjczLDE1Ljg1LDEwLjUsMTQuMTgsMTIuMTl6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLDAuMDJjLTUuNTIsMC0xMCw0LjQ4LTEwLDEwczQuNDgsMTAsMTAsMTBzMTAtNC40OCwxMC0xMEMxOS45OSw0LjUsMTUuNTIsMC4wMiwxMCwwLjAyeiBNMTAsMTguODNjLTQuODcsMC04LjgxLTMuOTUtOC44MS04LjgxUzUuMTMsMS4yLDEwLDEuMnM4LjgxLDMuOTUsOC44MSw4LjgxQzE4LjgxLDE0Ljg5LDE0Ljg3LDE4LjgzLDEwLDE4LjgzeiIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNC4wNCw1Ljk4Yy0xLjc1LTEuNzUtNC41My0xLjgxLTYuMi0wLjE0QzQuODMsOC44Niw1LjgsMTQuMjMsNS44LDE0LjIzczUuMzcsMC45Nyw4LjM5LTIuMDRDMTUuODUsMTAuNSwxNS44LDcuNzMsMTQuMDQsNS45OHogTTExLjg4LDkuODdsLTAuODcsMS43OGwtMC44Ni0xLjc4TDguMzgsOS4wMWwxLjc3LTAuODZsMC44Ni0xLjc4bDAuODcsMS43OGwxLjc3LDAuODZMMTEuODgsOS44N3oiLz48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjEzLjY1LDkuMDEgMTEuODgsOS44NyAxMS4wMSwxMS42NSAxMC4xNSw5Ljg3IDguMzgsOS4wMSAxMC4xNSw4LjE1IDExLjAxLDYuMzcgMTEuODgsOC4xNSAiLz48L2c+PC9zdmc+); }\n  :host .leaflet-container.dark .leaflet-bar {\n    background-color: #404040;\n    border-color: #202020;\n    border-color: rgba(0, 0, 0, 0.75); }\n  :host .leaflet-container.dark .leaflet-bar a {\n    color: #404040;\n    border-color: rgba(0, 0, 0, 0.5); }\n  :host .leaflet-container.dark .leaflet-bar a:active, :host .leaflet-container.dark .leaflet-bar a:hover {\n    background-color: #505050; }\n  :host .leaflet-container.dark .leaflet-control-attribution, :host .leaflet-container.dark .leaflet-control-attribution:after, :host .leaflet-container.dark .map-info-container, :host .leaflet-container.dark .mapbox-info-toggle {\n    background-color: rgba(0, 0, 0, 0.5);\n    color: #f8f8f8; }\n  :host .leaflet-container.dark .leaflet-control-attribution a, :host .leaflet-container.dark .leaflet-control-attribution a:hover, :host .leaflet-container.dark .map-info-container a, :host .leaflet-container.dark .map-info-container a:hover {\n    color: #fff; }\n  :host .leaflet-container.dark .leaflet-control-attribution:hover:after {\n    background-color: #000; }\n  :host .leaflet-container.dark .leaflet-control-layers-list span {\n    color: #f8f8f8; }\n  :host .leaflet-container.dark .leaflet-control-layers-separator {\n    border-top-color: rgba(255, 255, 255, 0.1); }\n  :host .leaflet-container.dark .leaflet-bar a.leaflet-disabled, :host .leaflet-container.dark .leaflet-control .mapbox-button.disabled {\n    background-color: #252525;\n    color: #404040; }\n  :host .leaflet-container.dark .leaflet-control-mapbox-geocoder > div {\n    border-color: #202020;\n    border-color: rgba(0, 0, 0, 0.75); }\n  :host .leaflet-container.dark .leaflet-control .leaflet-control-mapbox-geocoder-results a {\n    border-color: #ddd #202020;\n    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.75); }\n  :host .leaflet-container.dark .leaflet-control .leaflet-control-mapbox-geocoder-results span {\n    border-color: #202020;\n    border-color: rgba(0, 0, 0, 0.75); }\n  \@media only screen and (max-width: 800px) {\n    :host .mapbox-modal-body {\n      width: 83.3333%;\n      margin-left: 8.3333%; } }\n  \@media only screen and (max-width: 640px) {\n    :host .mapbox-modal-body {\n      width: 100%;\n      height: 100%;\n      margin: 0; } }\n  \@media print {\n    :host .mapbox-improve-map {\n      display: none; } }\n  :host .leaflet-vml-shape {\n    width: 1px;\n    height: 1px; }\n  :host .lvml {\n    behavior: url(#default#VML);\n    display: inline-block;\n    position: absolute; }\n  :host .leaflet-container img.leaflet-tile {\n    max-width: none !important; }\n  :host .leaflet-container img.leaflet-marker-icon {\n    max-width: none; }\n  :host .leaflet-container img.leaflet-image-layer {\n    max-width: 15000px !important; }\n  :host .leaflet-overlay-pane svg {\n    -moz-user-select: none; }\n  :host .leaflet-oldie .mapbox-modal .mapbox-modal-content {\n    display: none; }\n  :host .leaflet-oldie .mapbox-modal.active .mapbox-modal-content {\n    display: block; }\n  :host .map-tooltip {\n    width: 280px; }\n  :host .leaflet-oldie .leaflet-container.dark .map-tooltip .close, :host .leaflet-oldie .leaflet-control-layers-toggle, :host .leaflet-oldie .leaflet-control-zoom-in, :host .leaflet-oldie .leaflet-control-zoom-out, :host .leaflet-oldie .leaflet-popup-close-button, :host .leaflet-oldie .map-tooltip .close, :host .leaflet-oldie .mapbox-icon {\n    background-image: url(data:image/png;base64,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); }\n  :host .leaflet-oldie .leaflet-container.dark .leaflet-control-layers-toggle, :host .leaflet-oldie .leaflet-container.dark .leaflet-control-zoom-in, :host .leaflet-oldie .leaflet-container.dark .leaflet-control-zoom-out, :host .leaflet-oldie .leaflet-container.dark .mapbox-icon, :host .leaflet-oldie .mapbox-button-icon:before {\n    background-image: url(data:image/png;base64,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); }\n  :host .leaflet-oldie .mapbox-logo-true {\n    background-image: none; }\n  :host .mapbox-directions-inputs,\n  :host .mapbox-directions-errors,\n  :host .mapbox-directions-routes,\n  :host .mapbox-directions-instructions {\n    font: 15px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif; }\n  :host .mapbox-directions-inputs,\n  :host .mapbox-directions-inputs *,\n  :host .mapbox-directions-errors,\n  :host .mapbox-directions-errors *,\n  :host .mapbox-directions-routes,\n  :host .mapbox-directions-routes *,\n  :host .mapbox-directions-instructions,\n  :host .mapbox-directions-instructions * {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box; }\n  :host .mapbox-directions-origin,\n  :host .mapbox-directions-destination {\n    background-color: white;\n    position: relative; }\n  :host .mapbox-form-label {\n    cursor: pointer;\n    position: absolute;\n    left: 0;\n    top: 0;\n    background: #444;\n    color: rgba(0, 0, 0, 0.75);\n    font-weight: bold;\n    text-align: center;\n    padding: 10px;\n    line-height: 20px;\n    font-size: var(--font-s, 13px); }\n  :host .mapbox-directions-origin .mapbox-form-label {\n    background-color: #3bb2d0; }\n  :host .mapbox-directions-inputs input {\n    font-size: var(--font-s, 13px);\n    width: 100%;\n    border: 0;\n    background-color: transparent;\n    height: 40px;\n    margin: 0;\n    color: rgba(0, 0, 0, 0.5);\n    padding: 10px 10px 10px 50px; }\n  :host .mapbox-directions-inputs input:focus {\n    color: rgba(0, 0, 0, 0.75);\n    outline: 0;\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n  :host .mapbox-directions-destination input {\n    border-top: 1px solid rgba(0, 0, 0, 0.1); }\n  :host .mapbox-directions-reverse-input {\n    position: absolute;\n    z-index: 10;\n    background: white;\n    left: 50px;\n    top: 30px;\n    cursor: pointer; }\n  :host .mapbox-directions-inputs .mapbox-close-icon {\n    opacity: .5;\n    z-index: 2;\n    position: absolute;\n    right: 5px;\n    top: 10px;\n    cursor: pointer; }\n  :host input:not(:valid) + .mapbox-close-icon {\n    display: none; }\n  :host .mapbox-close-icon:hover {\n    opacity: .75; }\n  :host .mapbox-directions-profile {\n    margin-top: 5px;\n    margin-bottom: 5px;\n    padding: 2px;\n    border-radius: 15px;\n    vertical-align: middle;\n    background: rgba(0, 0, 0, 0.1); }\n  :host .mapbox-directions-profile label {\n    cursor: pointer;\n    vertical-align: top;\n    display: inline-block;\n    border-radius: 16px;\n    padding: 3px 5px;\n    font-size: var(--font-s, 13px);\n    color: rgba(0, 0, 0, 0.5);\n    line-height: 20px;\n    text-align: center;\n    width: 33.33%; }\n  :host .mapbox-directions-profile input[type=radio] {\n    display: none; }\n  :host .mapbox-directions-profile input[type=radio]:checked + label {\n    background: white;\n    color: rgba(0, 0, 0, 0.5); }\n  :host .mapbox-directions-error {\n    color: white;\n    display: inline-block;\n    padding: 0 5px; }\n  :host .mapbox-directions-routes ul {\n    list-style: none;\n    margin: 0;\n    padding: 10px 10px 0 10px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.25); }\n  :host .mapbox-directions-routes li {\n    font-size: var(--font-s, 13px);\n    padding: 10px 10px 10px 80px;\n    display: block;\n    position: relative;\n    cursor: pointer;\n    color: rgba(255, 255, 255, 0.5);\n    min-height: 60px; }\n  :host .mapbox-directions-routes li:hover,\n  :host .mapbox-directions-routes .mapbox-directions-route-active {\n    color: white; }\n  :host .mapbox-directions-route-heading {\n    position: absolute;\n    left: 10px;\n    top: 10px; }\n  :host .mapbox-directions-route-summary {\n    display: none; }\n  :host .mapbox-directions-route-active .mapbox-directions-route-summary {\n    display: block; }\n  :host .mapbox-directions-route-details {\n    font-size: var(--font-s, 13px);\n    color: rgba(255, 255, 255, 0.5); }\n  :host .mapbox-directions-steps {\n    position: relative;\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n  :host .mapbox-directions-step {\n    position: relative;\n    color: rgba(255, 255, 255, 0.75);\n    cursor: pointer;\n    padding: 20px 20px 20px 40px;\n    font-size: var(--font-l, 17px);\n    line-height: 25px; }\n  :host .mapbox-directions-step-distance {\n    color: rgba(255, 255, 255, 0.5);\n    position: absolute;\n    padding: 5px 10px;\n    font-size: var(--font-s, 13px);\n    left: 30px;\n    bottom: -15px; }\n  :host .mapbox-directions-step:hover {\n    color: white; }\n  :host .mapbox-directions-step:after {\n    content: \"\";\n    position: absolute;\n    top: 50px;\n    bottom: -20px;\n    border-left: 2px dotted rgba(255, 255, 255, 0.2);\n    left: 20px; }\n  :host .mapbox-directions-step:last-child:after,\n  :host .mapbox-directions-step:last-child .mapbox-directions-step-distance {\n    display: none; }\n  :host .mapbox-directions-icon {\n    background-image: url(\"mapbox.directions.png\");\n    -webkit-background-size: 280px 20px;\n    background-size: 280px 20px;\n    background-repeat: no-repeat;\n    margin: 0;\n    content: '';\n    display: inline-block;\n    vertical-align: top;\n    width: 20px;\n    height: 20px; }\n  :host .mapbox-directions-instructions .mapbox-directions-icon {\n    position: absolute;\n    left: 10px;\n    top: 25px;\n    margin: auto; }\n  :host .mapbox-continue-icon {\n    background-position: 0 0; }\n  :host .mapbox-sharp-right-icon {\n    background-position: -20px 0; }\n  :host .mapbox-turn-right-icon {\n    background-position: -40px 0; }\n  :host .mapbox-bear-right-icon {\n    background-position: -60px 0; }\n  :host .mapbox-u-turn-icon {\n    background-position: -80px 0; }\n  :host .mapbox-sharp-left-icon {\n    background-position: -100px 0; }\n  :host .mapbox-turn-left-icon {\n    background-position: -120px 0; }\n  :host .mapbox-bear-left-icon {\n    background-position: -140px 0; }\n  :host .mapbox-depart-icon {\n    background-position: -160px 0; }\n  :host .mapbox-enter-roundabout-icon {\n    background-position: -180px 0; }\n  :host .mapbox-arrive-icon {\n    background-position: -200px 0; }\n  :host .mapbox-close-icon {\n    background-position: -220px 0; }\n  :host .mapbox-reverse-icon {\n    background-position: -240px 0; }\n  :host .mapbox-error-icon {\n    background-position: -260px 0; }\n  :host .mapbox-marker-drag-icon {\n    display: block;\n    background-color: #444;\n    border-radius: 50%;\n    -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);\n    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5); }\n  :host .mapbox-marker-drag-icon-step {\n    background-color: #3BB2D0; }\n  :host .column-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: 100%;\n    height: 100%; }\n    :host .column-container yoo-map-legend {\n      position: absolute;\n      right: 0;\n      bottom: 0; }\n    :host .column-container #inputs {\n      position: absolute;\n      width: 33.3333%;\n      min-width: 200px;\n      max-width: 300px;\n      bottom: 10px;\n      left: 10px;\n      z-index: 99; }\n    :host .column-container .directions-container {\n      position: absolute;\n      width: 33.3333%;\n      min-width: 200px;\n      max-width: 300px;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0, 0, 0, 0.8);\n      overflow: auto;\n      z-index: 99; }\n    :host .column-container .map-container {\n      display: -ms-flexbox;\n      display: flex;\n      position: absolute;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      width: 100%;\n      height: 100%;\n      border: var(--border-width, 1px) solid var(--stable-30, #E6E6E6);\n      background: var(--dark, #2b3648);\n      z-index: 1; }\n    :host .column-container .marker-info {\n      padding-bottom: var(--padding-10, 0.625rem);\n      border-top: var(--border-width, 1px) solid var(--border-color);\n      background: var(--light, #FFFFFF);\n      text-align: center; }\n      :host .column-container .marker-info .title {\n        margin-top: var(--padding-10, 0.625rem);\n        font-weight: 500; }\n    :host .column-container .leaflet-control-container .leaflet-bottom.leaflet-left {\n      display: none; }\n    :host .column-container .leaflet-control-container .leaflet-bottom.leaflet-right {\n      display: none; }\n    :host .column-container .leaflet-control-container .leaflet-top.leaflet-left {\n      display: none; }\n    :host .column-container .leaflet-marker-icon {\n      width: 1.875rem !important;\n      height: 1.875rem !important; }\n      :host .column-container .leaflet-marker-icon .booked-cluster {\n        padding: 0.3125rem 0.125rem;\n        border-radius: var(--padding-25, 1.5625rem);\n        border-color: var(--warning, #ff6402);\n        background-color: var(--warning, #ff6402);\n        color: var(--light, #FFFFFF);\n        text-align: center;\n        opacity: 0.7; }\n      :host .column-container .leaflet-marker-icon .tobevalidated-cluster {\n        padding: 0.3125rem 0.125rem;\n        border-radius: var(--padding-25, 1.5625rem);\n        border-color: var(--info, #fc459e);\n        background-color: var(--info, #fc459e);\n        color: var(--light, #FFFFFF);\n        text-align: center;\n        opacity: 0.7; }\n      :host .column-container .leaflet-marker-icon .rejected-cluster {\n        padding: 0.3125rem 0.125rem;\n        border-radius: var(--padding-25, 1.5625rem);\n        border-color: var(--danger, #ff625f);\n        background-color: var(--danger, #ff625f);\n        color: var(--light, #FFFFFF);\n        text-align: center;\n        opacity: 0.7; }\n      :host .column-container .leaflet-marker-icon .validated-cluster {\n        padding: 0.3125rem 0.125rem;\n        border-radius: var(--padding-25, 1.5625rem);\n        border-color: var(--success, #04CC99);\n        background-color: var(--success, #04CC99);\n        color: var(--light, #FFFFFF);\n        text-align: center;\n        opacity: 0.7; }\n      :host .column-container .leaflet-marker-icon .archived-cluster {\n        padding: 0.3125rem 0.125rem;\n        border-radius: var(--padding-25, 1.5625rem);\n        border-color: var(--dark, #2b3648);\n        background-color: var(--dark, #2b3648);\n        color: var(--light, #FFFFFF);\n        text-align: center;\n        opacity: 0.7; }\n      :host .column-container .leaflet-marker-icon .dark-cluster {\n        padding: 0.3125rem 0.125rem;\n        border-radius: var(--padding-25, 1.5625rem);\n        border-color: var(--dark, #2b3648);\n        background-color: var(--dark, #2b3648);\n        color: var(--light, #FFFFFF);\n        text-align: center;\n        opacity: 0.7; }\n      :host .column-container .leaflet-marker-icon .available-cluster {\n        padding: 0.3125rem 0.125rem;\n        border-radius: var(--padding-25, 1.5625rem);\n        border-color: var(--accent, #1FB6FF);\n        background-color: var(--accent, #1FB6FF);\n        color: var(--light, #FFFFFF);\n        text-align: center;\n        opacity: 0.7; }\n      :host .column-container .leaflet-marker-icon.danger.marker {\n        background-color: transparent;\n        background-image: url(\"/assets/markers/marker_danger.svg\");\n        background-size: cover; }\n      :host .column-container .leaflet-marker-icon.energized.marker {\n        background-color: transparent;\n        background-image: url(\"/assets/markers/marker_energized.svg\");\n        background-size: cover; }\n      :host .column-container .leaflet-marker-icon.gradient_success.marker {\n        background-color: transparent;\n        background-image: url(\"/assets/markers/marker_gradient_success.svg\");\n        background-size: cover; }\n      :host .column-container .leaflet-marker-icon.plain.marker {\n        background-color: transparent;\n        background-image: url(\"/assets/markers/marker_plain.svg\");\n        background-size: cover; }\n      :host .column-container .leaflet-marker-icon.info.marker {\n        background-color: transparent;\n        background-image: url(\"/assets/markers/marker_info.svg\");\n        background-size: cover; }\n      :host .column-container .leaflet-marker-icon.success.marker {\n        background-color: transparent;\n        background-image: url(\"/assets/markers/marker_success.svg\");\n        background-size: cover; }\n      :host .column-container .leaflet-marker-icon.warning.marker {\n        background-color: transparent;\n        background-image: url(\"/assets/markers/marker_warning.svg\");\n        background-size: cover; }\n      :host .column-container .leaflet-marker-icon.marker {\n        width: 2.3rem !important;\n        height: 2.8rem !important; }\n      :host .column-container .leaflet-marker-icon.dark.marker {\n        background-color: var(--dark, #2b3648);\n        background-color: transparent;\n        background-size: cover; }\n    :host .column-container img.leaflet-marker-draggable {\n      width: 1.875rem !important;\n      height: 4.375rem !important; }\n    :host .column-container .mapbox-marker-drag-icon {\n      width: 0.75rem !important;\n      height: 0.75rem !important; }"; }
}

export { YooAmapComponent as YooAmap, YooMapComponent as YooMap, YooMapGLComponent as YooMapGl, YooMapJsComponent as YooMapJs };

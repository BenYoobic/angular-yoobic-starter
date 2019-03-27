import { h } from '../design-system.core.js';

import { P as showDirectionsActionSheet, a_ as showModal, m as translate, ad as isIonic } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooLocationMapComponent {
    constructor() {
        this.address = [];
        this.position = { longitude: 2.3522220, latitude: 48.856614 };
        this.marker = [];
    }
    // private openingHours: string;
    componentWillLoad() {
        this.setAddress(this.location.address);
        this.setLocationMarkers(this.location._geoloc[0], this.location._geoloc[1], this.location.address);
        // this.setOpeningTimes(this.location);
    }
    setAddress(address) {
        this.address = address.split(',');
    }
    setLocationMarkers(longitude, latitude, address) {
        this.position.longitude = longitude;
        this.position.latitude = latitude;
        this.marker[0] = {
            longitude: longitude,
            latitude: latitude,
            selected: true,
            address: address
        };
    }
    setOpeningTimes() {
        //setopening hours here
    }
    onGetDirections() {
        showDirectionsActionSheet(this.location._geoloc[1], this.location._geoloc[0], this.location.title, this.location.address)
            .then((action) => {
            switch (action) {
                case 'googlemaps':
                    this.useGoogleMaps.emit(this.location);
                    break;
                case 'applemaps':
                    this.useAppleMaps.emit(this.location);
                    break;
                case 'citymapper':
                    this.useCityMapper.emit(this.location);
                    break;
                case 'copyaddress':
                    this.useCopyAddress.emit(this.location);
                    break;
            }
        });
        this.direction.emit(this.location);
    }
    onOpenFullscreenMap() {
        let mapModal = document.createElement('yoo-map');
        mapModal.position = this.position;
        mapModal.markers = this.marker;
        mapModal.showControls = true;
        mapModal.isModal = true;
        mapModal.showGetDirectionsButton = true;
        let appleListener = (e) => this.useAppleMaps.emit(e);
        let googleListener = (e) => this.useGoogleMaps.emit(e);
        let cityListener = (e) => this.useCityMapper.emit(e);
        let copyListener = (e) => this.useCopyAddress.emit(e);
        mapModal.addEventListener('useAppleMaps', appleListener);
        mapModal.addEventListener('useGoogleMaps', googleListener);
        mapModal.addEventListener('useCityMapper', cityListener);
        mapModal.addEventListener('useCopyAddress', copyListener);
        showModal(mapModal).then(() => {
            if (mapModal) {
                mapModal.removeEventListener('useAppleMaps', appleListener);
                mapModal.removeEventListener('useGoogleMaps', googleListener);
                mapModal.removeEventListener('useCityMapper', cityListener);
                mapModal.removeEventListener('useCopyAddress', copyListener);
                mapModal = null;
            }
        });
        this.openFullscreen.emit(this.location);
    }
    renderAddress(addressLine) {
        return (h("div", { class: "text-line" }, addressLine));
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "background-image" },
                h("yoo-map", { showControls: false, position: this.position, markers: this.marker })),
            h("div", { class: "content", onClick: () => this.onOpenFullscreenMap() },
                h("div", { class: "text-line top" }, translate('MAP')),
                h("div", { class: "title" },
                    translate('ADDRESS'),
                    this.address.map(addressLine => this.renderAddress(addressLine))),
                h("div", { class: "title" })),
            h("div", { class: "footer" },
                h("yoo-button", { text: translate('GETDIRECTIONS'), class: 'link-transparent-success' + (isIonic() ? ' x-medium' : ''), onClick: () => this.onGetDirections() }))));
    }
    static get is() { return "yoo-location-map"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "location": {
            "type": "Any",
            "attr": "location"
        }
    }; }
    static get events() { return [{
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
        }, {
            "name": "openFullscreen",
            "method": "openFullscreen",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "direction",
            "method": "direction",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  height: 15.5rem;\n  margin-top: 10px;\n  background: var(--light, #FFFFFF); }\n  :host .outer-container .background-image {\n    top: 0;\n    right: 0;\n    bottom: 2.1rem;\n    left: 30%;\n    position: absolute; }\n  :host .outer-container .content {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    height: 100%;\n    padding-left: var(--padding-15, 0.9375rem);\n    background-image: -webkit-gradient(linear, right top, left top, from(var(--transparent-color, rgba(255, 255, 255, 0))), color-stop(var(--transparent-color, rgba(255, 255, 255, 0))), color-stop(var(--light, #FFFFFF)), to(var(--light, #FFFFFF)));\n    background-image: linear-gradient(0.75turn, var(--transparent-color, rgba(255, 255, 255, 0)), var(--transparent-color, rgba(255, 255, 255, 0)), var(--light, #FFFFFF), var(--light, #FFFFFF));\n    z-index: 2; }\n    :host .outer-container .content .title {\n      color: var(--stable, #adadad);\n      font-size: var(--font-xs, 10px);\n      text-transform: uppercase; }\n    :host .outer-container .content .text-line {\n      color: var(--black, #000000);\n      font-size: var(--font-s, 13px);\n      text-transform: none; }\n      :host .outer-container .content .text-line.top {\n        padding-top: var(--padding-20, 1.25rem);\n        font-size: var(--font-ll, 20px);\n        font-weight: 600;\n        line-height: 1em; }\n  :host .outer-container .footer {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    height: 2.4375rem;\n    border-top: 1px solid var(--stable-light, #f1f1f1); }"; }
}

export { YooLocationMapComponent as YooLocationMap };

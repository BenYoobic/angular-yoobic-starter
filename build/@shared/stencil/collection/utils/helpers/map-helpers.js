import { map, countBy, sortBy } from 'lodash-es';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { isCordova, isIOS } from '../config';
import { showActionSheet, copyToClipboard } from './common-helpers';
import { translate } from '../translate';
function mapMarkerCountToFilterGroup(markerCounts) {
    return map(markerCounts, (i, k) => {
        return {
            title: k.toUpperCase(),
            value: k,
            count: i,
            visible: true
        };
    });
}
export function generateFilterGroups(markers, groupBy) {
    let markerCounts = countBy(markers, groupBy);
    let filterGroups = mapMarkerCountToFilterGroup(markerCounts);
    return sortBy(filterGroups, 'count');
}
export function layersFromKeys(filterGroups) {
    let layers = filterGroups.map(filterGroup => {
        return filterGroup.value;
    });
    return layers;
}
export function isMarkersLayer(layerId) {
    return layerId === 'markers';
}
export function isSelectedMarkersLayer(layerId) {
    return layerId === 'markers_selected';
}
// Account for the mismatch between the classes in operations and the current syle classes
export function getMapCSSClasses() {
    let legendColorsNew = {
        available: 'accent',
        booked: 'warning',
        validated: 'success',
        rejected: 'danger',
        tobevalidated: 'info',
        archived: 'dark'
    };
    return legendColorsNew;
}
export function hasSameMarkers(newMapEntry, oldMapEntry) {
    let newMarker = newMapEntry.markers[0];
    let oldMarker = oldMapEntry.markers[0];
    return newMarker._id === oldMarker._id || newMarker.selected === oldMarker.selected;
}
export function isWebGLSupported() {
    let mapboxgl = window.mapboxgl;
    return mapboxgl ? mapboxgl.supported() : false;
}
export async function showDirectionsActionSheet(latitude, longitude, title, address) {
    let isGoogleMaps = false;
    let isAppleMaps = false;
    let isCityMapper = false;
    let resolveFn;
    if (isCordova()) {
        isGoogleMaps = await LaunchNavigator.isAppAvailable(LaunchNavigator.APP.GOOGLE_MAPS);
        isAppleMaps = await LaunchNavigator.isAppAvailable(LaunchNavigator.APP.APPLE_MAPS);
        isCityMapper = await LaunchNavigator.isAppAvailable(LaunchNavigator.APP.CITYMAPPER);
    }
    let actions = [
        {
            text: translate('USEAPPLEMAPS'),
            isVisible: () => isCordova() && isIOS() && isAppleMaps,
            handler: () => {
                navigateAppleMaps(latitude, longitude);
                resolveFn('applemaps');
            }
        },
        {
            text: translate('USEGOOGLEMAPS'),
            isVisible: () => !isCordova() || isGoogleMaps,
            handler: () => {
                navigateGoogleMaps(latitude, longitude);
                resolveFn('googlemaps');
            }
        },
        {
            text: translate('USECITYMAPPER'),
            isVisible: () => !isCordova() || isCityMapper,
            handler: () => {
                navigateCityMapper(latitude, longitude, title, address);
                resolveFn('citymapper');
            }
        },
        {
            text: translate('COPYADDRESS'),
            handler: () => {
                copyToClipboard(address);
                resolveFn('copyaddress');
            }
        }
    ];
    showActionSheet(actions);
    return new Promise(res => (resolveFn = res));
}
export function navigateAppleMaps(latitude, longitude) {
    if (isCordova() && isIOS()) {
        deviceNavigate(LaunchNavigator.APP.APPLE_MAPS, latitude, longitude);
    }
}
export function navigateCityMapper(latitude, longitude, title, address) {
    if (isCordova()) {
        deviceNavigate(LaunchNavigator.APP.CITYMAPPER, latitude, longitude);
    }
    else {
        let locationUrl = `endcoord=${latitude}%2C${longitude}`;
        let endNameUrl = 'endname=' + title.replace(' ', '%20');
        let addressNameUrl = 'endaddress=' + address.replace(' ', '%20');
        let cityMapperUrl = 'https://citymapper.com/directions?' + locationUrl + '&' + endNameUrl + '&' + addressNameUrl;
        window.open(cityMapperUrl);
    }
}
export function navigateGoogleMaps(latitude, longitude) {
    if (isCordova()) {
        deviceNavigate(LaunchNavigator.APP.GOOGLE_MAPS, latitude, longitude);
    }
    else {
        let googleMapUrl = `https://www.google.com/maps?saddr=My+Location&daddr=${latitude},${longitude}`;
        window.open(googleMapUrl);
    }
}
function deviceNavigate(app, latitude, longitude) {
    LaunchNavigator.isAppAvailable(app).then(isAvailable => {
        if (isAvailable) {
            app = app;
        }
        else {
            app = LaunchNavigator.APP.USER_SELECT;
        }
        LaunchNavigator.navigate([latitude, longitude], {
            app: app
        });
    });
}

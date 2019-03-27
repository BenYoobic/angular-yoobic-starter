import { translate, cloudinary, toDate, dateFormat, dateParse, pipes, dateDiff, toHours, utc, getUserDisplayName, translateMulti } from '../../../utils';
import { isObject, isNumber, isArray, isEmpty, indexOf, map } from 'lodash-es';
function defaultRenderer(params) {
    let retVal = params.value || '';
    if (isArray(retVal)) {
        return retVal.map(v => translateMulti(v || '')).join(', ');
    }
    return translateMulti(retVal.toString());
}
function booleanRenderer(params) {
    let value = params.value;
    if (value === true || value === 'true') {
        return '<yoo-form-checkbox value="true" readonly="true"></yoo-form-checkbox>';
    }
    else if (value === false || value === 'false') {
        return '<yoo-form-checkbox value="false" readonly="true"></yoo-form-checkbox>';
    }
    else if (value !== false && value !== true) {
        return '<yoo-icon class="yo-circle stable"></yoo-icon>';
    }
    return '';
}
function numberRenderer(params) {
    let retVal = params.value;
    let format = '1.0-1';
    if (params.colDef && params.colDef.cellRendererParams && params.colDef.cellRendererParams.precision > 0) {
        format = '1.0-' + params.colDef.cellRendererParams.precision;
    }
    if (retVal && isFinite(retVal - 0)) {
        retVal = retVal - 0;
    }
    if (isNumber(retVal)) {
        retVal = pipes.decimal.transform(retVal, format).toString();
    }
    else if (retVal && retVal.toString) {
        retVal = retVal.toString();
    }
    else {
        retVal = '';
    }
    return retVal.toString();
}
function percentageRenderer(params) {
    let retVal = params.value;
    if (retVal && isFinite(retVal - 0)) {
        retVal = retVal - 0;
    }
    if (isNumber(retVal)) {
        retVal = pipes.percent.transform(retVal).toString();
    }
    else if (retVal && retVal.toString) {
        retVal = retVal.toString();
    }
    else {
        retVal = '';
    }
    return retVal.toString();
}
function durationRenderer(params) {
    let value = params.value;
    return isNumber(value) ? Math.round(value) + ' ' + translate('MIN').toLowerCase() + '.' : value;
}
function distanceRenderer(params) {
    let keyPath = params.colDef.field.split('.');
    let value;
    if (isArray(keyPath) && keyPath.indexOf('distance') > -1 && params && params.node && params.data && params.node.data.getIn) {
        let _geoloc = params.node.data.getIn(['_geoloc']);
        let _geolocSave = params.node.data.getIn(['_geolocSave']);
        _geoloc = isEmpty(_geoloc) === false ? (_geoloc.toJS ? _geoloc.toJS() : _geoloc) : '';
        _geolocSave = isEmpty(_geolocSave) === false ? (_geolocSave.toJS ? _geolocSave.toJS() : _geolocSave) : '';
        if (_geoloc && _geoloc.length === 2 && _geolocSave && _geolocSave.length === 2) {
            value = getDistance(_geolocSave[1], _geolocSave[0], _geoloc[1], _geoloc[0]);
        }
    }
    return value ? value : '';
}
function getDistance(lat1, lon1, lat2, lon2, unit = 'K') {
    let radlat1 = (Math.PI * lat1) / 180;
    let radlat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radtheta = (Math.PI * theta) / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
        dist = dist * 1.609344;
    }
    if (unit === 'N') {
        dist = dist * 0.8684;
    }
    return dist;
}
function deltaRenderer(params) {
    let value = params.value || '';
    let rows = params.node.parent.allLeafChildren;
    let index = indexOf(rows, params.node);
    let field = params.colDef.field;
    if (index > 0 && index < rows.length) {
        let current = rows[index].data[field];
        let previous = rows[index - 1].data[field];
        if (isNumber(current) && isNumber(previous) && Math.abs(previous) > 0) {
            let delta = Math.round(((current - previous) / previous) * 100);
            if (Math.abs(delta) > 0) {
                value += '<span style="margin-left:10px" class="' + (delta > 0 ? 'success' : 'danger') + '"> (' + delta + '%)</span>';
            }
        }
    }
    return value;
}
function datetimeGenericRenderer(params, format) {
    let value = params.value;
    if (isObject(value) && value.value) {
        value = value.value;
    }
    if (value) {
        let date;
        date = toDate(value);
        return dateFormat(date, format);
    }
    return '';
}
function dateTimeRenderer(params) {
    return datetimeGenericRenderer(params, 'L LT');
}
function dateRenderer(params) {
    return datetimeGenericRenderer(params, 'L');
}
function timeRenderer(params) {
    let value = params.value;
    if (value) {
        if (/^\d\d:\d\d/.test(value)) {
            return dateFormat(dateParse(value, 'HH:mm'), 'LT');
        }
        else {
            return dateFormat(toDate(value), 'LT');
        }
    }
    return '';
}
function photoRenderer(params) {
    return params.value ? '<yoo-img class="ag-cell-image" src="' + cloudinary(params.value || '', 30, 30) + '" />' : '';
}
function multiphotoRenderer(params) {
    let photos = params.value;
    if (photos && photos.length > 0) {
        return photos.map(p => '<yoo-img class="ag-cell-image" src="' + cloudinary(p || '', 30, 30) + '" />').join(' ');
    }
    return '';
}
function videoRenderer(params) {
    return '<video class="ag-cell-image video" [src]="' + params.value + '"></video>';
}
function starratingRenderer(params) {
    let max = 5;
    if (params.colDef && params.colDef.cellRendererParams && params.colDef.cellRendererParams.max) {
        max = params.colDef.cellRendererParams.max;
    }
    return '<yoo-form-star-rating class="ag-cell-image energized" readonly="true" max="' + max + '" value="' + params.value + '"></yoo-form-star-rating>';
}
function addressRenderer(params) {
    return params.value ? (params.value.address ? params.value.address : params.value) : '';
}
function locationRenderer(params) {
    let value = params.value;
    return value ? (value.title ? value.title + ' - ' : '') + value.address : '';
}
function todoRenderer(params) {
    let value = params.value;
    if (value && value.values) {
        return map(value.values, (v) => v.text.value).join(', ');
    }
    return '';
}
function timerRenderer(params) {
    let value = params.value;
    if (value && value.startDate && value.endDate) {
        let ms = dateDiff(toDate(value.endDate), toDate(value.startDate));
        let s = Math.floor(toHours(ms)) + dateFormat(utc(new Date(ms)), ':mm:ss');
        return s;
    }
    else {
        return '';
    }
}
function checklistRenderer(params) {
    return defaultRenderer(params);
}
function customModelRenderer(params) {
    return defaultRenderer(params);
}
function userFullNameRenderer(params) {
    let user;
    if (params.node && params.node.data) {
        user = params.node.data;
    }
    else {
        user = params.value;
    }
    return getUserDisplayName(user);
}
function buttonRenderer(params) {
    if (params.colDef && params.colDef.cellRendererParams) {
        let color = params.colDef.cellRendererParams.color || '';
        //let text = translate(params.colDef.context.text) || '';
        let icon = params.colDef.cellRendererParams.icon || '';
        return '<yoo-button icon="' + icon + '" class="small outline-dark ' + color + '"></yoo-button>'; //text="' + text + '"
    }
    return '';
}
function missionValidationRenderer(params) {
    let value = params.value;
    let status = '';
    if (params.node && params.node.data) {
        status = params.node.data.status;
    }
    if (value === true || value === 'true' || value === 'validated') {
        return '<yoo-badge class="success" text="' + translate('VALIDATED') + '"></yoo-badge>';
    }
    else if (value === false || value === 'false' || value === 'rejected') {
        return '<yoo-badge class="danger" text="' + translate('REJECTED') + '"></yoo-badge>';
    }
    else if ((status === 'finished' && value !== false && value !== true && value !== 'false' && value !== 'true') || value === 'tobevalidated') {
        return '<yoo-badge class="royal" text="' + translate('TOBEVALIDATED') + '"></yoo-badge>';
    }
    if (params.node.group && params.colDef.cellRenderer === 'group') {
        return '<yoo-badge class="stable" text="' + translate('N/A') + '"></yoo-badge>';
    }
    return '';
}
function missionStatusRenderer(params) {
    let value = params.value;
    if (value === 'finished') {
        return '<yoo-badge class="dark" text="' + translate('FINISHED') + '"></yoo-badge>';
    }
    else if (value === 'booked') {
        return '<yoo-badge class="info" text="' + translate('BOOKED') + '"></yoo-badge>';
    }
    else if (value === 'available') {
        return '<yoo-badge class="energized" text="' + translate('AVAILABLE') + '"></yoo-badge>';
    }
    return value ? value.toString() : '';
}
function conformityProgressRenderer(params) {
    let retVal = '';
    if (params.node && params.node.aggData) {
        if (params.node.aggData.status && params.node.aggData.validated) {
            params.node.aggData.conformityprogress = conformityProgressValue(params.node);
            retVal += getKeyTemplate('conformityprogress', params.node.aggData.conformityprogress, ' %', true, true);
        }
    }
    return retVal;
}
export function conformityProgressValue(node) {
    if (node.aggData && node.aggData.validated && node.aggData.validated.counts) {
        let retVal = Math.round(((node.aggData.validated.counts.validated || 0) * 100) / ((node.aggData.validated.counts.validated || 0) + (node.aggData.validated.counts.rejected || 0)));
        return isNaN(retVal) ? 0 : retVal;
    }
    return 0;
}
function progressRenderer(params) {
    let retVal = '';
    if (params.node && params.node.aggData) {
        if (params.node.aggData.status && params.node.aggData.validated) {
            params.node.aggData.progress = progressValue(params.node);
            retVal += getKeyTemplate('progress', params.node.aggData.progress, ' %', true, true);
        }
    }
    return retVal;
}
export function progressValue(node) {
    if (node && node.aggData && node.aggData.status && node.aggData.status.counts) {
        let retVal = Math.round(((node.aggData.status.counts.finished || 0) * 100) / ((node.aggData.status.counts.finished || 0) + (node.aggData.status.counts.available || 0)));
        return isNaN(retVal) ? 0 : retVal;
    }
    return 0;
}
function validationProgressRenderer(params) {
    let retVal = '';
    if (params.node && params.node.aggData) {
        if (params.node.aggData.status && params.node.aggData.validated) {
            params.node.aggData.validationprogress = validationProgressValue(params.node);
            retVal += getKeyTemplate('validationprogress', params.node.aggData.validationprogress, ' %', true, true);
        }
    }
    return retVal;
}
export function validationProgressValue(node) {
    if (node.aggData && node.aggData.validated && node.aggData.validated.counts) {
        let retVal = Math.round((((node.aggData.validated.counts.validated || 0) + (node.aggData.validated.counts.rejected || 0)) * 100) / (node.aggData.status.counts.finished || 0));
        return isNaN(retVal) ? 0 : retVal;
    }
    return 0;
}
function conformityRelativeProgressRenderer(params) {
    let retVal = '';
    if (params.node && params.node.aggData) {
        if (params.node.aggData.status && params.node.aggData.validated) {
            params.node.aggData.conformityrelativeprogress = conformityRelativeProgressValue(params.node);
            retVal += getKeyTemplate('conformityrelativeprogress', params.node.aggData.conformityrelativeprogress, ' %', true, true);
        }
    }
    return retVal;
}
export function conformityRelativeProgressValue(node) {
    let campaignProgress = progressValue(node);
    let campaignConformityProgress = conformityProgressValue(node);
    let retVal = Math.round((campaignConformityProgress * campaignProgress) / 100);
    return isNaN(retVal) ? 0 : retVal;
}
export function getKeyTemplate(key, count, suffix = '', useCircle = false, hideKey = false) {
    //let color = getColor(key);
    let displayName = key;
    //if (color) {
    //    displayName = translate(key.toUpperCase());
    //}
    if (isNaN(count)) {
        count = '?';
        suffix = '';
    }
    // if (useCircle) {
    let circleColor = 'success';
    if (count === '?') {
        circleColor = 'dark';
    }
    else if (count < 33) {
        circleColor = 'danger';
    }
    else if (count < 75) {
        circleColor = 'energized';
    }
    return '<yoo-badge class="' + circleColor + '" text="' + (hideKey ? '' : displayName + ':') + count + suffix + '" ></yoo-badge>';
    // } else {
    //     return '<span class="badge ' + (color && false ? color.class : 'light minwidth') + ' margin-right">' + (hideKey ? '' : (displayName + ':')) + '<b>' + count + suffix + '</b></span>';
    // }
}
class MissionResultsRenderer {
    getGui() {
        return this.eGui;
    }
    init(params) {
        let missionResults = document.createElement('yoo-mission-results');
        missionResults.className = 'inline';
        missionResults.mission = params.data;
        this.eGui = missionResults;
    }
}
export function getRenderer(renderer) {
    switch (renderer) {
        case 'booleanRenderer':
            return booleanRenderer;
        case 'numberRenderer':
            return numberRenderer;
        case 'dateRenderer':
            return dateRenderer;
        case 'dateTimeRenderer':
            return dateTimeRenderer;
        case 'timeRenderer':
            return timeRenderer;
        case 'percentageRenderer':
            return percentageRenderer;
        case 'durationRenderer':
            return durationRenderer;
        case 'distanceRenderer':
            return distanceRenderer;
        case 'deltaRenderer':
            return deltaRenderer;
        case 'photoRenderer':
            return photoRenderer;
        case 'multiphotoRenderer':
            return multiphotoRenderer;
        case 'videoRenderer':
            return videoRenderer;
        case 'starratingRenderer':
            return starratingRenderer;
        case 'addressRenderer':
            return addressRenderer;
        case 'locationRenderer':
            return locationRenderer;
        case 'todoRenderer':
            return todoRenderer;
        case 'timerRenderer':
            return timerRenderer;
        case 'checklistRenderer':
            return checklistRenderer;
        case 'customModelRenderer':
            return customModelRenderer;
        case 'userFullNameRenderer':
            return userFullNameRenderer;
        case 'buttonRenderer':
            return buttonRenderer;
        case 'missionStatusRenderer':
            return missionStatusRenderer;
        case 'missionValidationRenderer':
            return missionValidationRenderer;
        case 'progressRenderer':
            return progressRenderer;
        case 'validationProgressRenderer':
            return validationProgressRenderer;
        case 'conformityProgressRenderer':
            return conformityProgressRenderer;
        case 'conformityRelativeProgressRenderer':
            return conformityRelativeProgressRenderer;
        case 'agGroupCellRenderer':
            return 'agGroupCellRenderer';
        case 'agAnimateShowChangeCellRenderer':
            return 'agAnimateShowChangeCellRenderer';
        case 'agAnimateSlideCellRenderer':
            return 'agAnimateSlideCellRenderer';
        case 'missionResultsRenderer':
            return MissionResultsRenderer;
        case 'defaultRenderer':
        default:
            return defaultRenderer;
    }
}

import { getSession } from './common-helpers';
import { translate } from '../translate';
import { dateDiffInCalendarDays, dateDiff, toHours, endOf } from '../date';
import { isNumber } from 'lodash-es';
export function getCampaignStateBadges(campaign) {
    let badge = {
        text: translate('ONGOING'),
        cssClass: 'small round info'
    };
    if (campaign.archived) {
        badge.text = translate('ARCHIVED');
        badge.cssClass = 'small round black';
    }
    let retVal = [badge];
    if (campaign.type) {
        retVal.unshift({
            text: translate(campaign.type.toUpperCase()),
            cssClass: 'small round stable'
        });
    }
    return retVal;
}
export function getMissionStateBadges(mission, includeVIPText) {
    let pendingBadge = {
        text: translate(mission.type === 'mission' ? 'PENDINGVALIDATION' : 'PENDING'),
        cssClass: 'small round stable',
        progressClass: 'warning'
    };
    let pendingOfflineBadge = {
        text: translate('PENDINGOFFLINE'),
        cssClass: 'small round energized',
        progressClass: null
    };
    let badge;
    if (mission.type === 'visit') {
        badge = { text: null, cssClass: null, progressClass: null };
    }
    else if (mission.status === 'pending') {
        badge = pendingOfflineBadge;
    }
    else if (mission.status === 'booked') {
        if (mission.needsRebooking) {
            badge = { text: translate('REVIEW'), cssClass: 'small round royal', progressClass: 'royal' };
        }
        else if (mission.isAssigned && mission.creatorRef === getSession().userId) {
            badge = {
                text: translate('ASSIGNED'),
                cssClass: 'small round warning',
                progressClass: 'info'
            };
        }
        else {
            badge = { text: translate('BOOKED'), cssClass: 'small round info', progressClass: 'info' };
        }
    }
    else if (mission.status === 'finished') {
        if (mission.validated === true) {
            badge = {
                text: translate('VALIDATED'),
                cssClass: 'small round gradient-success',
                progressClass: undefined
            };
        }
        else if (mission.validated === false) {
            badge = {
                text: translate('REJECTED'),
                cssClass: 'small round danger',
                progressClass: undefined
            };
        }
        else {
            badge = pendingBadge;
        }
    }
    else if (mission.status === 'draft') {
        badge = { text: translate('DRAFT'), cssClass: 'small round black', progressClass: undefined };
    }
    else if (mission.type === 'service' && mission.creatorRef === getSession().userId) {
        if (mission._id && mission._id.startsWith('offline_')) {
            badge = pendingOfflineBadge;
        }
        else {
            badge = pendingBadge;
        }
    }
    else if (mission.republishCount > 0 && !mission.autoRenew && !mission.autoRenewOnBooking) {
        badge = {
            text: translate('REPUBLISHED'),
            cssClass: 'small round royal',
            progressClass: undefined
        };
    }
    else {
        if (dateDiffInCalendarDays(new Date(), mission._ect) <= 1) {
            badge = {
                text: translate('NEW'),
                cssClass: 'small round accent',
                progressClass: 'gradient-success'
            };
        }
    }
    let badges = [];
    if (badge) {
        badges.push(badge);
    }
    if (mission.vip) {
        badges.unshift({
            iconLeft: 'yo-star',
            text: includeVIPText ? 'VIP' : '',
            cssClass: 'small round energized ' + (includeVIPText ? '' : 'icon-only')
        });
    }
    return badges;
}
export function getMissionDataStateBadge(missiondata) {
    let pendingBadge = {
        text: translate('PENDING'),
        cssClass: 'small round stable',
        progressClass: 'warning'
    };
    let badge;
    if (missiondata.validated === true) {
        badge = {
            text: translate('VALIDATED'),
            cssClass: 'small round gradient-success',
            progressClass: undefined
        };
    }
    else if (missiondata.validated === false) {
        badge = {
            text: translate('REJECTED'),
            cssClass: 'small round danger',
            progressClass: undefined
        };
    }
    else {
        badge = pendingBadge;
    }
    return badge;
}
export function getProductBatchDateBadge(productBatch, size = 'small') {
    let badge;
    if (productBatch.archived) {
        badge = {
            text: translate('TREATED'),
            cssClass: size + ' round stable',
            progressClass: undefined
        };
    }
    else if (productBatch.isOutOfStock) {
        badge = {
            text: translate('OUTOFSTOCK'),
            cssClass: size + ' round black',
            progressClass: undefined
        };
    }
    else if (productBatch.isNew) {
        badge = {
            text: translate('NEW'),
            cssClass: size + ' round accent',
            progressClass: undefined
        };
    }
    else {
        let delay = getProductBatchDelayInHours(productBatch);
        if (isNumber(delay) && delay <= 24) {
            badge = {
                text: translate('PRODUCTBATCH24HOURS'),
                cssClass: size + ' round danger',
                progressClass: undefined
            };
        }
        else if (isNumber(delay) && delay > 24 && delay <= 48) {
            badge = {
                text: translate('PRODUCTBATCH48HOURS'),
                cssClass: size + ' round success',
                progressClass: undefined
            };
        }
        else if (isNumber(delay) && delay <= 72) {
            badge = {
                text: translate('PRODUCTBATCH72HOURS'),
                cssClass: size + ' round warning',
                progressClass: undefined
            };
        }
        else if (isNumber(delay) && delay > 72) {
            badge = {
                text: translate('PRODUCTBATCHVALID'),
                cssClass: size + ' round success',
                progressClass: undefined
            };
        }
    }
    return badge;
}
export function getProductBatchDelayInHours(productBatch) {
    if (!productBatch.date) {
        return null;
    }
    let delay = toHours(dateDiff(endOf(productBatch.date, 'day'), endOf(new Date(), 'day')));
    return delay;
}
export function getMissionStatusIconClass(mission) {
    if (mission && mission.status === 'finished') {
        if (mission.validated) {
            return { class: 'yo-check success', style: 'success', text: 'APPROVED' };
        }
        else {
            return { class: 'yo-rejected2 danger', style: 'danger', text: 'REJECTED' };
        }
    }
    return null;
}
export function getProductBatchProgressColor(progress) {
    if (progress < 20) {
        return 'danger';
    }
    else if (progress < 80) {
        return 'warning';
    }
    else {
        return 'success';
    }
}
export function getGoogleMapStreeView(loc, width, height) {
    let token = getSession().token;
    let apiUrl = getSession().apiUrl;
    if (loc && loc._geoloc && loc._geoloc.length > 1) {
        return apiUrl + 'GoogleMaps/streetview?access_token=' + token + '&size=' + width * 2 + 'x' + height * 2 + '&location=' + loc._geoloc[1] + ',' + loc._geoloc[0] + '&locationRef=' + loc._id;
    }
    return null;
}

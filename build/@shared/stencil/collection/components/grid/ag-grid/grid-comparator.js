import { dateParse } from '../../../utils';
import { progressValue, validationProgressValue, conformityProgressValue, conformityRelativeProgressValue } from './grid-renderers';
import { reduce } from 'lodash-es';
function exists(value) {
    if (value === null || value === undefined || value === '') {
        return false;
    }
    else {
        return true;
    }
}
function defaultComparator(valueA, valueB) {
    const valueAMissing = valueA === null || valueA === undefined;
    const valueBMissing = valueB === null || valueB === undefined;
    if (valueAMissing && valueBMissing) {
        return 0;
    }
    if (valueAMissing) {
        return -1;
    }
    if (valueBMissing) {
        return 1;
    }
    if (typeof valueA === 'string') {
        try {
            // using local compare also allows chinese comparisons
            return valueA.localeCompare(valueB);
        }
        catch (e) {
            // if something wrong with localeCompare, eg not supported
            // by browser, then just continue without using it
        }
    }
    if (valueA < valueB) {
        return -1;
    }
    else if (valueA > valueB) {
        return 1;
    }
    else {
        return 0;
    }
}
function coreGroupComparator(valueA, valueB, nodeA, nodeB) {
    const nodeAIsGroup = exists(nodeA) && nodeA.group;
    const nodeBIsGroup = exists(nodeB) && nodeB.group;
    const bothAreGroups = nodeAIsGroup && nodeBIsGroup;
    const bothAreNormal = !nodeAIsGroup && !nodeBIsGroup;
    if (bothAreGroups) {
        return defaultComparator(nodeA.key, nodeB.key);
    }
    else if (bothAreNormal) {
        return defaultComparator(valueA, valueB);
    }
    else if (nodeAIsGroup) {
        return 1;
    }
    else {
        return -1;
    }
}
function defaultGroupComparator(valueA, valueB, nodeA, nodeB) {
    if (nodeA.group === true && nodeB.group === true) {
        return defaultComparator(nodeA.allChildrenCount, nodeB.allChildrenCount);
    }
    else {
        return coreGroupComparator(valueA, valueB, nodeA, nodeB);
    }
}
function dateComparator(valueA, valueB, nodeA, nodeB, isInverted) {
    if (valueA && valueB) {
        let dateA = dateParse(valueA, 'L');
        let dateB = dateParse(valueB, 'L');
        return defaultComparator(dateA, dateB);
    }
    else {
        return coreGroupComparator(valueA, valueB, nodeA, nodeB);
    }
}
function progressComparator(valueA, valueB, nodeA, nodeB) {
    if (nodeA.group === true && nodeB.group === true) {
        let progressA = progressValue(nodeA);
        let progressB = progressValue(nodeB);
        return defaultComparator(progressA, progressB);
    }
    else {
        return coreGroupComparator(valueA, valueB, nodeA, nodeB);
    }
}
function validationProgressComparator(valueA, valueB, nodeA, nodeB) {
    if (nodeA.group === true && nodeB.group === true) {
        let progressA = validationProgressValue(nodeA);
        let progressB = validationProgressValue(nodeB);
        return defaultComparator(progressA, progressB);
    }
    else {
        return coreGroupComparator(valueA, valueB, nodeA, nodeB);
    }
}
function conformityProgressComparator(valueA, valueB, nodeA, nodeB) {
    if (nodeA.group === true && nodeB.group === true) {
        let progressA = conformityProgressValue(nodeA);
        let progressB = conformityProgressValue(nodeB);
        return defaultComparator(progressA, progressB);
    }
    else {
        return coreGroupComparator(valueA, valueB, nodeA, nodeB);
    }
}
function confirmityRelativeProgressComparator(valueA, valueB, nodeA, nodeB) {
    if (nodeA.group === true && nodeB.group === true) {
        let progressA = conformityRelativeProgressValue(nodeA);
        let progressB = conformityRelativeProgressValue(nodeB);
        return defaultComparator(progressA, progressB);
    }
    else {
        return coreGroupComparator(valueA, valueB, nodeA, nodeB);
    }
}
function missionStatusComparator(valueA, valueB, nodeA, nodeB) {
    if (nodeA && nodeB && nodeA.group === true && nodeB.group === true) {
        nodeA.aggData = nodeA.aggData || {};
        nodeA.aggData.status = nodeA.aggData.status || {};
        let progressA = reduce(nodeA.aggData.status.counts, (prev, val) => prev + (val || 0), 0);
        nodeB.aggData = nodeB.aggData || {};
        nodeB.aggData.status = nodeB.aggData.status || {};
        let progressB = reduce(nodeB.aggData.status.counts, (prev, val) => prev + (val || 0), 0);
        return defaultComparator(progressA, progressB);
    }
    else {
        return coreGroupComparator(valueA, valueB, nodeA, nodeB);
    }
}
function missionValidationComparator(valueA, valueB, nodeA, nodeB) {
    if (nodeA && nodeB && nodeA.group === true && nodeB.group === true && nodeA.aggData && nodeA.aggData.validated && nodeA.aggData.validated.counts && nodeB.aggData && nodeB.aggData.validated && nodeB.aggData.validated.counts) {
        let progressA = reduce(nodeA.aggData.validated.counts, (prev, val) => prev + (val || 0), 0);
        let progressB = reduce(nodeB.aggData.validated.counts, (prev, val) => prev + (val || 0), 0);
        return defaultComparator(progressA, progressB);
    }
    else {
        return coreGroupComparator(valueA, valueB, nodeA, nodeB);
    }
}
export function getComparator(comparator) {
    switch (comparator) {
        case 'dateComparator':
            return dateComparator;
        case 'defaultGroupComparator':
            return defaultGroupComparator;
        case 'coreGroupComparator':
            return coreGroupComparator;
        case 'defaultComparator':
            return defaultComparator;
        case 'progressComparator':
            return progressComparator;
        case 'validationProgressComparator':
            return validationProgressComparator;
        case 'conformityProgressComparator':
            return conformityProgressComparator;
        case 'confirmityRelativeProgressComparator':
            return confirmityRelativeProgressComparator;
        case 'missionStatusComparator':
            return missionStatusComparator;
        case 'missionValidationComparator':
            return missionValidationComparator;
        default:
            // tslint:disable-next-line:no-console
            console.log('cannot find comparator ' + comparator);
            break;
    }
    return null;
}

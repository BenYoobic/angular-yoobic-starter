import { compact, isObject, max as _max, min as _min, sum as _sum, isNumber, keys as _keys, sortBy } from 'lodash-es';
import { getKeyTemplate } from './grid-renderers';
export function maxAggFunc(values) {
    let array = compact(values.map(v => (isObject(v) ? v.value : v)));
    let max = _max(array);
    let result = {
        value: max,
        toString: function () {
            if (this.value) {
                return this.value;
            }
            return '';
        }
    };
    return result;
}
export function minAggFunc(values) {
    let array = compact(values.map(v => (isObject(v) ? v.value : v)));
    let min = _min(array);
    let result = {
        value: min,
        toString: function () {
            if (this.value) {
                return this.value;
            }
            return '';
        }
    };
    return result;
}
export function avgAggFunc(values) {
    let sum = 0;
    let count = 0;
    let avg = 0;
    values.forEach(function (value) {
        let groupNode = value !== null && value !== undefined && typeof value === 'object';
        if (groupNode) {
            sum += value.avg * value.count;
            count += value.count;
        }
        else {
            if (typeof value === 'number') {
                sum += value;
                count++;
            }
        }
    });
    if (count !== 0) {
        avg = sum / count;
    }
    else {
        avg = null;
    }
    let result = {
        count: count,
        avg: avg,
        toString: function () {
            return isNumber(this.avg) ? Math.round(((this.avg * 100) / 100) * 100) / 100 : this.avg;
        }
    };
    return result;
}
export function sumAggFunc(values) {
    let array = compact(values.map(v => (isObject(v) ? v.value : v)));
    let sum = 0;
    if (array.length > 0) {
        sum = _sum(array);
    }
    let result = {
        value: sum,
        toString: function () {
            if (isNumber(this.value)) {
                return Math.round(this.value * 100) / 100;
            }
            return '';
        }
    };
    return result;
}
export function countValuesAggFunc(values) {
    let counts = {};
    values.forEach(function (value) {
        if (value && isObject(value) && value.counts) {
            //we are on a grouped row here
            let keys = _keys(value.counts);
            keys.forEach(key => {
                counts[key] = (counts[key] || 0) + value.counts[key];
            });
        }
        else if (value) {
            counts[value] = (counts[value] || 0) + 1;
        }
    });
    let result = {
        counts: counts,
        toString: function () {
            let retVal = '';
            if (this.counts) {
                let keys = sortBy(_keys(this.counts), k => k);
                keys.forEach(key => {
                    retVal += getKeyTemplate(key, counts[key]);
                });
            }
            return retVal;
        }
    };
    return result;
}

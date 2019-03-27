import { Pipe } from '../base';
import { translate } from '../../translate';
import { isNumber } from 'lodash-es';
export class DistancePipe extends Pipe {
    transform(value, options) {
        if (!value && !isNumber(value)) {
            return '';
        }
        let unit = translate('DISTANCEUNIT');
        if (unit === 'mi') {
            value = value / 1.609;
            if (value > 1) {
                return value.toFixed(0) + ' ' + unit;
            }
            else {
                return value.toFixed(1) + ' ' + unit;
            }
        }
        else {
            if (value > 1) {
                return value.toFixed(0) + ' k' + unit;
            }
            else {
                return value.toFixed(1) + ' ' + unit;
            }
        }
    }
}

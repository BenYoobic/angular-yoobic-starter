import { Pipe } from '../base';
import { filter, round } from 'lodash-es';
import { translate } from '../../translate';
import { getSession } from '../../../utils/helpers/common-helpers';
export class CurrencyPipe extends Pipe {
    transform(value, options = '€') {
        let precision;
        if (!value && value !== 0) {
            return '';
        }
        if (Math.abs(value) >= 1 || value === 0) {
            precision = 0;
        }
        else {
            precision = 2;
        }
        let symbol = translate('CURRENCY');
        let rates = filter(getSession().currencies, c => c.symbol === symbol);
        let rate = 1;
        if (rates.length > 0) {
            rate = rates[0].rate;
        }
        let displayValue = round(value * rate, precision);
        if (symbol === '£') {
            return symbol + ' ' + displayValue;
        }
        else {
            return displayValue + ' ' + symbol;
        }
    }
}

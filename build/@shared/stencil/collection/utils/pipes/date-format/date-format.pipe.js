import { Pipe } from '../base';
import { dateFormat, fromNow } from '../../date';
export class DateFormatPipe extends Pipe {
    transform(value, options = '') {
        if (value) {
            let isTime = /^\d\d:\d\d/.test(value.toString());
            if (options === 'fromNow') {
                return fromNow(isTime ? dateFormat(value, 'HH:mm') : value);
            }
            return dateFormat(isTime ? dateFormat(value, 'HH:mm') : value, options);
        }
        return '';
    }
}

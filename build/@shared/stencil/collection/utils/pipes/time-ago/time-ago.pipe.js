import { Pipe } from '../base';
import { fromNow } from '../../date';
export class TimeAgoPipe extends Pipe {
    transform(value) {
        if (value) {
            return fromNow(value);
        }
        return value;
    }
}

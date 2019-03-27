import { Pipe } from '../base';
export class DecimalPipe extends Pipe {
    transform(value, format) {
        return value.toString();
    }
}

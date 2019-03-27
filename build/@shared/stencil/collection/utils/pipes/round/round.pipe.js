import { Pipe } from '../base';
export class RoundPipe extends Pipe {
    transform(value) {
        return Math.round(value);
    }
}

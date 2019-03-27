import { Pipe } from '../base';
export class PercentPipe extends Pipe {
    transform(value, format) {
        return (Math.round(value * 100) / 100).toString() + ' %';
    }
}

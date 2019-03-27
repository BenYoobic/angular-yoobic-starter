import { Pipe } from '../base';
export declare class TimeAgoPipe extends Pipe<string | number | Date, any> {
    transform(value: string | number | Date): any;
}

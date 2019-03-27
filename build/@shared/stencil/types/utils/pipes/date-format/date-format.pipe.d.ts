import { Pipe } from '../base';
export declare class DateFormatPipe extends Pipe<string | number | Date, any> {
    transform(value: string | number | Date, options?: string): any;
}

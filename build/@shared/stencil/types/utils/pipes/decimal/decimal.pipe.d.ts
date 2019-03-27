import { Pipe } from '../base';
export declare class DecimalPipe extends Pipe<number, string> {
    transform(value: number, format?: string): string;
}

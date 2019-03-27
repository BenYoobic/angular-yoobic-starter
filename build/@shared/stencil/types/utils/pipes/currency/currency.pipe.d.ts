import { Pipe } from '../base';
export declare class CurrencyPipe extends Pipe<number, string> {
    transform(value: number, options?: string): string;
}

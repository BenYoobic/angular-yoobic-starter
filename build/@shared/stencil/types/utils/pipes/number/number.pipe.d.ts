import { Pipe } from '../base';
export declare class NumberPipe extends Pipe<number, string> {
    transform(value: number, options?: string): string;
}

import { Pipe } from '../base';
export declare class PercentPipe extends Pipe<number, string> {
    transform(value: number, format?: string): string;
}

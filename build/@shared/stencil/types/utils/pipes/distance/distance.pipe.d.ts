import { Pipe } from '../base';
export declare class DistancePipe extends Pipe<number, string> {
    transform(value: number, options?: string): string;
}

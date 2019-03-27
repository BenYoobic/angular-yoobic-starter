import { Pipe } from '../base';
export declare class FileSizePipe extends Pipe<number, string> {
    transform(value: number): string;
}

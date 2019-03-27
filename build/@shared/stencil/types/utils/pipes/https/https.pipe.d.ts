import { Pipe } from '../base';
export declare class HttpsPipe extends Pipe<string, string> {
    transform(value: string): string;
}

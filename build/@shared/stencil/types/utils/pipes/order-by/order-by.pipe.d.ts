import { Pipe } from '../base';
export declare class OrderByPipe extends Pipe<Array<any>, Array<any>> {
    transform(value: Array<any>, options: string[]): any[];
}

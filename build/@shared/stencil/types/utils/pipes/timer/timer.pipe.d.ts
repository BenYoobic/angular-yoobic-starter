import { Pipe } from '../base';
export declare class TimerPipe implements Pipe<number, string> {
    transform(value: number, options?: 'seconds' | 'minutes' | 'hours'): string;
    secondParser(time: number, precision?: string): string;
    padder(num: number): string;
}

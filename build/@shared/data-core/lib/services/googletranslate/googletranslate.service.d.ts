import { Requestor } from '../requestor/requestor.service';
import { Observable } from 'rxjs';
export declare class Googletranslate {
    static get(query: string, source: string, target: string, rq: Requestor): Observable<any>;
    static fixLanguage(language: string): string;
    static getAll(query: string, source: string, rq: Requestor): Observable<{
        language: string;
        value: any;
    }[]>;
    constructor();
}

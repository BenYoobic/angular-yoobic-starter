import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Observable } from 'rxjs';
export declare class Algorithms {
    private config;
    private rq;
    constructor(config: Config, rq: Requestor);
    process(imageUrl: string, algorithmId: string): Observable<any>;
    processMultiple(imageUrls: Array<string>, algorithmId: string): Observable<any>;
}

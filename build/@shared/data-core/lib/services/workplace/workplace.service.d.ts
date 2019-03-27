import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { Observable } from 'rxjs';
export declare class Workplace {
    private rq;
    private config;
    private readonly apiUrl;
    constructor(rq: Requestor, config: Config);
    getAllGroups(): Observable<any>;
    postOnGroup(groupIds: Array<string>, options: any): Observable<any>;
}

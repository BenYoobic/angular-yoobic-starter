import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Observable } from 'rxjs';
import { CoreConfig } from '@shared/common';
export declare class Box {
    private config;
    private rq;
    private coreConfig;
    constructor(config: Config, rq: Requestor, coreConfig: CoreConfig);
    upload(documentUrl: string): Observable<any>;
    createViewingSession(boxId: string): Observable<any>;
    getViewingContent(contentUrl: string): Observable<any>;
}

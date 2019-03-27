import { CoreConfig } from '@shared/common';
import { Translate } from '@shared/translate';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Observable } from 'rxjs';
export declare class Blog {
    protected coreConfig: CoreConfig;
    protected config: Config;
    protected rq: Requestor;
    protected translate: Translate;
    constructor(coreConfig: CoreConfig, config: Config, rq: Requestor, translate: Translate);
    getUrl(): string;
    get(blogUrl: string, limit?: number, skip?: number): Observable<any>;
    getLatestArticleDate(blogUrl: string): Observable<any>;
}

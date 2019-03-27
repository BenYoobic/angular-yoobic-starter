import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { Observable } from 'rxjs';
export declare class BackupService {
    protected rq: Requestor;
    protected config: Config;
    private readonly apiUrl;
    constructor(rq: Requestor, config: Config);
    getAll(date?: Date): Observable<string[]>;
    restore(backupName: string, collections?: Array<string>): Observable<any>;
}

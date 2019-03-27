import { Files } from '../files/files.service';
import { Broker } from '../broker/broker.service';
import { Dashboard } from '../dashboard/dashboard.service';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { Observable } from 'rxjs';
export declare class FilesBroker {
    private dashboard;
    private broker;
    protected files: Files;
    constructor(dashboard: Dashboard, broker: Broker, files: Files);
    getFilesTransform(): (res: ResponseObject) => ResponseObject;
    getFilesFoldersTransformAsync(): (res: ResponseObject, search: any, filters: any, start: any, pageSize: any) => Observable<ResponseObject>;
    cleanupFolder(folderId: any): Observable<any>;
    updateFileIcon(f: any): void;
}

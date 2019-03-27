import { Filters, SubQuery, IFormField } from '@shared/stencil';
import { Translate } from '@shared/translate';
import { ChartDefinition } from '../../interfaces/chart-definition/chart-definition.interface';
import { Dashboard as IDashboard } from '../../interfaces/dashboard/dashboard.interface';
import { User } from '../../interfaces/user/user.interface';
import { MissionDescription } from '../../interfaces/mission-description/mission-description.interface';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { Broker } from '../broker/broker.service';
import { Session } from '../session/session.service';
import { Observable } from 'rxjs';
export declare class Dashboard {
    protected broker: Broker;
    protected translate: Translate;
    protected session: Session;
    constructor(broker: Broker, translate: Translate, session: Session);
    publish(dashboard: IDashboard, users: Array<User>): Observable<any>;
    deletePublished(dashboard: IDashboard): Observable<any>;
    updatePublished(dashboard: IDashboard): Observable<any>;
    copy(dashboard: IDashboard, title: string): Observable<any>;
    aggregateQuery(collectionName: string, filters?: Filters, options?: Array<any>, excludedFields?: Array<any>, customFilter?: any, subQuery?: SubQuery): Observable<any>;
    setTimescale(filters: Filters, timescale: string, dateField?: string, endDate?: Date | string, previous?: boolean): void;
    getChartDefinition(title: string, filters?: Array<any>, collectionName?: string, dateGrouping?: string, groupByDate?: boolean, timeScale?: string): ChartDefinition;
    getPhotos(missionDescription?: MissionDescription, fields?: Array<IFormField>, start?: number, locationTags?: Array<string>): Observable<ResponseObject>;
    getFolderFolderStat(folderIds: Array<string>): Observable<Array<{
        _id: string;
        folders: number;
    }>>;
    getFolderFileStat(folderIds: Array<string>, keepHideMobile?: boolean): Observable<Array<{
        _id: string;
        files: number;
    }>>;
}

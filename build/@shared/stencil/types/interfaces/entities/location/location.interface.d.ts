import { IEntity } from '../entity/entity.interface';
import { IKpiData } from '../tenant/tenant.interface';
export declare class ILocation extends IEntity {
    _id: string;
    clientid: string;
    title: string;
    address: string;
    imageData?: string;
    vip: boolean;
    tags: Array<string>;
    type: any;
    typeRef: string;
    missiondescriptions?: Array<any>;
    missiondescriptionsRef?: Array<string>;
    notificationemail?: Array<string>;
    contactname?: string;
    contactemail?: string;
    contactphone?: string;
    info?: string;
    _geoloc: [number, number];
    properties?: any;
    distance?: number;
    stats?: Array<{
        title: string;
        value: number;
        color: string;
    }>;
    lastVisit?: Date;
    countVisits?: number;
    status?: string;
    placesearch?: string;
    kpiData?: Array<IKpiData>;
    kpiDate?: Date;
    kpiValue?: number;
    aisles?: Array<string>;
    smartTagId?: string;
    hasAvailableMissions?: boolean;
    availableMissions?: number;
}

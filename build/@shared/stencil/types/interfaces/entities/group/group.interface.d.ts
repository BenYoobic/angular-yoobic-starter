import { IEntity } from '../entity/entity.interface';
export declare class IGroup extends IEntity {
    _tenantRef?: string;
    code?: string;
    _id: string;
    title: string;
    description: string;
    icon: any;
    team?: boolean;
    isRole?: boolean;
    service?: boolean;
    users?: any;
    groups?: any;
    _ect?: any;
}

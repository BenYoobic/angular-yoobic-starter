import { IGroup } from '@shared/stencil';
import { Tenant } from '../tenant/tenant.interface';
export declare class Group extends IGroup {
    _id: string;
    title: string;
    description: string;
    icon: any;
    _tenant: Tenant;
    team?: boolean;
    isRole?: boolean;
    service?: boolean;
    users?: any;
    groups?: any;
    _ect?: any;
}

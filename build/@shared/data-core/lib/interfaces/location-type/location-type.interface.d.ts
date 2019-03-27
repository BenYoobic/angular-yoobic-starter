import { ILocationType } from '@shared/stencil';
import { Tenant } from '../tenant/tenant.interface';
export declare class LocationType extends ILocationType {
    _id?: string;
    name: string;
    group?: Array<any>;
    count?: number;
    _tenant: Tenant;
    _tenantRef?: string;
}

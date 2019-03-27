import { IEntity } from '../entity/entity.interface';
import { ITenant } from '../tenant/tenant.interface';
export declare class ITableau extends IEntity {
    _tenantRef?: string;
    path: string;
    _tenant: ITenant;
}

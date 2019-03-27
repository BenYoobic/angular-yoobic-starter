import { ITableau } from '@shared/stencil';
import { Tenant } from '../tenant/tenant.interface';
export declare class Tableau extends ITableau {
    path: string;
    _tenant: Tenant;
}

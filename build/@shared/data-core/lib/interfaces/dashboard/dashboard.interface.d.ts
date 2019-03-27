import { ChartDefinition } from '../chart-definition/chart-definition.interface';
import { IDashboard } from '@shared/stencil';
import { Tenant } from '../tenant/tenant.interface';
export declare class Dashboard extends IDashboard {
    title: string;
    description: string;
    _lmt: any;
    tabs: Array<{
        title: string;
        items: Array<{
            col: number;
            row: number;
            sizex: number;
            sizey: number;
            definition: ChartDefinition;
        }>;
    }>;
    _tenant: Tenant;
    _tenantRef?: string;
}

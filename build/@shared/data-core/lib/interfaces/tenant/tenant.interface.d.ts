import { ITenant, ILocationKpi } from '@shared/stencil';
export declare class Tenant extends ITenant {
    name: string;
    title: string;
    description: string;
    icon: any;
    ssoOnly: boolean;
    protected: boolean;
    locationKpis?: Array<ILocationKpi>;
}

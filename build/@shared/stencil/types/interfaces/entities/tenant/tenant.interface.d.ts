import { IEntity } from '../entity/entity.interface';
export declare class ITenant extends IEntity {
    name: string;
    title: string;
    description: string;
    icon: any;
    ssoOnly: boolean;
    protected: boolean;
    locationKpis?: Array<ILocationKpi>;
}
export declare class ILocationKpi {
    title: string;
    icon?: string;
    type: string;
    category: string;
    extraSymbol?: string;
    timescale?: string;
    timescalesliding?: boolean;
}
export declare class IKpiData {
    category: string;
    icon: string;
    value: number;
    variation?: number;
    extraSymbol?: string;
}

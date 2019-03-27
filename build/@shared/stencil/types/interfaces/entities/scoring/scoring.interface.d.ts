import { IEntity } from '../entity/entity.interface';
export declare class IScoring extends IEntity {
    title: string;
    description: string;
    initialValue: number;
    minValue: number;
    isActive: boolean;
    isLive?: boolean;
    isPercentage: boolean;
    percentageBasis: number;
    category: any;
    categoryRef: string;
}
export declare class IMissionScoring {
    value?: number;
    total?: number;
    isPercentage?: boolean;
    title?: string;
    isActive?: boolean;
}

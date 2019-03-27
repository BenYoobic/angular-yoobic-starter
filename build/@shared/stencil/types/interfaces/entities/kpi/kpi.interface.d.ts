import { IEntity } from '../entity/entity.interface';
export declare class IKpi extends IEntity {
    useCreationDate?: boolean;
    pointPadding: boolean;
    numberPrecision: number;
}
export declare type IKpiTypes = 'map' | 'micro' | 'calendar' | 'carousel' | 'grid' | 'chart' | 'eternal' | 'chartio';

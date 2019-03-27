import { Entity } from '../../interfaces/entity/entity.interface';
export interface IModelConfig {
    collectionName?: string;
    className: string;
    fields?: Array<string>;
    include?: any;
    searchSubquery?: {
        collectionName: string;
        field: string;
        values: string;
    };
    feathersService?: string;
    detailComponent?: string;
    icon?: string;
}
export declare function Model(config: IModelConfig): (target: typeof Entity) => void;
export declare function ModelExtended(config: {
    baseClass: string;
    extendedClass: string;
}): (target: any) => void;

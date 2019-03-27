import { IEntity } from '../entity/entity.interface';
export declare class ICurrency extends IEntity {
    currency: string;
    symbol: string;
    rate: number;
}

import { ICurrency } from '@shared/stencil';
import { IAcl } from '../entity/entity.interface';
export declare class Currency implements ICurrency {
    _id?: string;
    _acl?: IAcl;
    _lmt?: string;
    _ect?: string;
    currency: string;
    symbol: string;
    rate: number;
}

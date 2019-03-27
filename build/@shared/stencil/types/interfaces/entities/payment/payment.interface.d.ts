import { IEntity } from '../entity/entity.interface';
export declare class IPayment extends IEntity {
    _id?: string;
    type?: string;
    userId?: string;
    details?: string;
    title?: string;
    amount?: number;
    paypalEmail?: string;
    transactionDate?: Date;
}

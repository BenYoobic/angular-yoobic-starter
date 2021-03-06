import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';
export declare class IPharmaoneNotification extends IEntity {
    userId: string;
    title: string;
    amount: number;
    user: IUser;
    date: Date;
    comments: string;
}
export declare class IPharmaonePayment extends IEntity {
    _id?: string;
    type: string;
    userId: string;
    title: string;
    amount: number;
    details?: string;
    transactionDate: Date;
    user: any;
}

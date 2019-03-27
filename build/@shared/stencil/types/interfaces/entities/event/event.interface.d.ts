import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';
export declare class IEvent extends IEntity {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    users?: Array<IUser>;
    usersRef?: Array<string>;
    group: Array<string>;
    reminderDate?: Date;
    creatorRef?: string;
    creator?: IUser;
}

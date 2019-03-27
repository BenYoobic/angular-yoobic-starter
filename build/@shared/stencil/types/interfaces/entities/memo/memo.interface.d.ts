import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';
import { ILocation } from '../location/location.interface';
export declare class IMemo extends IEntity {
    tags: Array<string>;
    title: string;
    description?: string;
    duedate?: Date;
    users?: Array<IUser>;
    usersRef?: Array<string>;
    imageData?: string;
    imageEdit?: string;
    group: Array<string>;
    isRecurring?: boolean;
    creatorRef?: string;
    creator?: IUser;
    locationRef?: string;
    location?: ILocation;
    done: boolean;
}
export declare class IMemoList {
    _id: Array<string>;
    total: number;
    done: number;
    users?: Array<IUser>;
    usersRef?: Array<string>;
}

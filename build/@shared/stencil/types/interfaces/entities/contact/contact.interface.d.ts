import { IEntity } from '../entity/entity.interface';
import { ILocation } from '../location/location.interface';
import { IUser } from '../user/user.interface';
export declare class IContact extends IEntity {
    location: ILocation;
    locationRef: string;
    ownerRef?: string;
    owner?: IUser;
    _id: string;
    imageData: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    company: string;
    sendFinishedEmail: boolean;
    note: string;
    tags?: Array<string>;
}

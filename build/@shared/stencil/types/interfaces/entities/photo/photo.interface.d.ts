import { IEntity } from '../entity/entity.interface';
import { IMissionDescription } from '../mission-description/mission-description.interface';
import { ILocation } from '../location/location.interface';
import { IUser } from '../user/user.interface';
export declare class IPhoto extends IEntity {
    _id: string;
    missiondescriptionRef: string;
    missiondataRef: string;
    missionRef: string;
    userRef: string;
    name: string;
    edit: string;
    texts: Array<any>;
    svgData?: string;
    editBy?: string;
    type: string;
    isMulti?: boolean;
    multiIndex?: number;
    feedRef?: string;
    missiondescription: IMissionDescription;
    missiondescriptionTitle: string;
    title: string;
    address: string;
    validated: boolean;
    flagged: boolean;
    tags: Array<string>;
    locationId: string;
    location: ILocation;
    date: Date;
    group: string | Array<string>;
    userDisplayname: string;
    user: IUser;
    value: string;
    phash?: string;
    mediaType?: string;
    fieldTitle?: string;
}
export declare class IPhotoTag extends IEntity {
    tags: Array<string>;
}
export declare class IPhotoExport extends IEntity {
    oneFolderPerStore: boolean;
    mode: string;
    emails: Array<string>;
}

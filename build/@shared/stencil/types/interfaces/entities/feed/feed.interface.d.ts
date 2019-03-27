import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';
import { IFile } from '../file/file.interface';
import { IMissionDescription } from '../mission-description/mission-description.interface';
export declare class IFeed extends IEntity {
    _id: string;
    title?: string;
    description: string;
    tags?: Array<string>;
    image: any;
    document: IFile;
    documentRef: string;
    group: string | Array<string>;
    disableNotifications: boolean;
    disableLikes: boolean;
    disableComments: boolean;
    showCalendar: boolean;
    startDate: Date;
    endDate: Date;
    language: string;
    _ect?: any;
    comments: Array<IFeedComment>;
    likesCount: number;
    viewsCount: number;
    isLikedByMe: boolean;
    isViewedByMe: boolean;
    date: Date;
    entityType?: string;
    entityId?: string;
    address?: string;
    _geoloc: [number, number];
    instagramRef?: string;
    instagramUrl?: string;
    userRef?: string;
    user?: IUser;
    missiondescriptionRef?: string;
    missiondescription?: IMissionDescription;
    fieldName?: string;
}
export declare class IFeedComment extends IEntity {
    _id?: string;
    group?: string | Array<string>;
    text: string;
    date: Date;
    image?: any;
    address?: string;
    missionRef?: string;
    userRef?: string;
    user?: any;
    likesCount?: number;
    isLikedByMe?: boolean;
    comments?: Array<IFeedComment>;
    feedRef?: string;
    feed?: IFeed;
    parent?: IFeedComment;
    isChild?: boolean;
}
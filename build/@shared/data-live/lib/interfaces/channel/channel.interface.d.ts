import { Entity, IAcl, User } from '@shared/data-core';
export declare class Channel extends Entity {
    _id: string;
    _acl: IAcl;
    _lmt?: string;
    _ect?: string;
    channel: string;
    isSupport: boolean;
    isFavorite: boolean;
    isOnline: boolean;
    users: Array<User>;
    others: Array<User>;
    lastMessage: any;
    lastMessageAlternate: boolean;
    lastMessageDate?: any;
    deleteMessages: Array<any>;
}

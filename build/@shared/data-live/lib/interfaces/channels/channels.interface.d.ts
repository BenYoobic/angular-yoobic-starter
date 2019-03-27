import { Entity, IAcl, User } from '@shared/data-core';
export declare class Channels extends Entity {
    _id: string;
    _acl: IAcl;
    _lmt?: string;
    _ect?: string;
    channel: string;
    name: string;
    background: any;
    group: string;
    users: Array<User>;
    others: Array<User>;
    lastMessage: any;
    lastMessageAlternate: boolean;
    lastMessageDate?: any;
    deleteMessages: Array<any>;
}

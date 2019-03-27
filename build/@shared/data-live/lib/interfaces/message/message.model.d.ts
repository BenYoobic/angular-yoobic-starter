import { MessageInterface } from './message.interface';
import { Entity, IAcl } from '@shared/data-core';
export declare class Message extends Entity implements MessageInterface {
    _id?: string;
    _acl?: IAcl;
    _lmt?: string;
    _ect?: string;
    to: Array<string>;
    title: string;
    body: string;
    actionURL: string;
    actionText: string;
    thankyou: string;
}

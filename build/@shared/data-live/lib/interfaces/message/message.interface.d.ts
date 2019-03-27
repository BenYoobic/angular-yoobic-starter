import { IEntity } from '@shared/data-core';
export interface ChatMessage {
    channel: string;
    message: string;
    type?: string;
    sender_id?: string;
    sender_username?: string;
    sender_photo?: string;
    receiver_id?: string;
    receiver_username?: string;
    isGroup?: boolean;
    groupName?: string;
    date_sent?: Date;
    options?: any;
    icon?: string;
    photo?: any;
    timetoken?: number;
}
export interface MessageInterface extends IEntity {
    to: Array<string>;
    title: string;
    body: string;
    messageURL?: string;
    pageTitle?: string;
    actionURL?: string;
    action?: boolean;
    thankyou?: string;
}

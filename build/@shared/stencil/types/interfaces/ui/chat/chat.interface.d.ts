import { IUser } from '../../entities/user/user.interface';
export interface IChatMessage {
    channel?: string;
    content: string;
    message?: string;
    author?: IUser;
    time?: Date;
    isAlternate?: boolean;
    img?: string;
    deleted?: boolean;
    readonly?: boolean;
    selected?: boolean;
    isGroup?: boolean;
    groupName?: string;
    sender_id?: string;
    sender_username?: string;
    sender_photo?: string;
    type?: string;
    timetoken?: number;
}

import { INotification } from '@shared/stencil';
import { User } from '../user/user.interface';
export declare class Notification extends INotification {
    mode: 'email' | 'notification' | 'allnotification';
    title: string;
    body?: string;
    scheduledDate?: Date;
    apps?: Array<string>;
    sender?: User;
    senderRef?: string;
}

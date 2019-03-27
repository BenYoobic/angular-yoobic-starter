import { IUser } from '../../entities/user/user.interface';
export interface IWebMenuEntry {
    logo?: string;
    items?: Array<IWebMenuItem>;
    user?: IUser;
}
export interface IWebMenuItem {
    label: string;
    icon: string;
    iconSelected?: string;
    href?: string;
    name?: string;
    handler?: Function;
    separator?: boolean;
    notif?: string | number | boolean;
    openPreview?: boolean;
    position?: any;
}

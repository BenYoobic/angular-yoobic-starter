import { IUser, IUserSettings, ISimpleUser, IRole } from '@shared/stencil';
import { Location } from '../location/location.interface';
import { Tenant } from '../tenant/tenant.interface';
export declare function onUserLocationChange(value: any, data: any): void;
export declare class User extends IUser {
    _id?: string;
    imageData?: string;
    username: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    _tenant: Tenant;
    isTeam?: boolean;
    tags?: Array<string>;
    role?: IRole;
    telephone?: string;
    company?: string;
    position?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: any;
    location?: Location;
    locationRef?: string;
    _aclGroupsR?: any;
    lastSeen?: any;
    version?: any;
    mobileVersion?: any;
    platform?: any;
    language?: string;
    device?: string;
    uuid?: string;
    target?: string;
    photoMaxWidth?: number;
    sso?: boolean;
    disableTracking?: boolean;
    disableDatabaseSync?: boolean;
    static getDisplayName(user: any): string;
    static getSimpleFields(): string[];
}
export declare class UserSettings extends IUserSettings {
    useBigFonts: boolean;
    disableHapticFeedback: boolean;
    showScrollbars: boolean;
    disableEmailNotifications: boolean;
    disablePushNotifications: boolean;
    disableSmsNotifications: boolean;
    sendFinishedEmail: boolean;
    photoMaxWidth?: number;
    deletePhotos: boolean;
    enableMissionLiveSync: boolean;
    allowPhotoEdit: boolean;
    disablePhotoOrientationAutoFix: boolean;
    orderServicesByDate: boolean;
    goToBasket: boolean;
    radius: any;
    timezone: any;
}
export declare class SimpleUser extends ISimpleUser {
    _id?: string;
    imageData: string;
    username: string;
    email: string;
    password: string;
}

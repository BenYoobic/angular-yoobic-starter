import { IEntity } from '../entity/entity.interface';
import { ILocation } from '../location/location.interface';
import { IRole } from '../role/role.interface';
import { ITenant } from '../tenant/tenant.interface';
export declare class IUser extends IEntity {
    _geoloc?: Array<number>;
    _messaging?: {
        pushTokens: Array<{
            platform: string;
            token: string;
        }>;
    };
    pendingBadges?: {
        feeds?: number;
        available?: {
            missions?: number;
            polls?: number;
            services?: number;
            todos?: number;
        };
        communicate?: number;
        _communicate?: {
            direct?: number;
            team?: number;
        };
    };
    oneSignalId?: Array<string>;
    oneSignalAppIds?: {
        [appName: string]: Array<string>;
    };
    _tenantRef?: string;
    _tenant: ITenant;
    paypalEmail?: string;
    radius?: any;
    sendFinishedEmail?: boolean;
    enableMissionLiveSync?: boolean;
    disableEmailNotifications?: boolean;
    disablePushNotifications?: boolean;
    disableSmsNotifications?: boolean;
    disableHapticFeedback?: boolean;
    disableTracking?: boolean;
    disableDatabaseSync?: boolean;
    deletePhotos?: boolean;
    allowPhotoEdit?: boolean;
    disablePhotoOrientationAutoFix?: boolean;
    timezone?: string;
    goToBasket?: boolean;
    orderServicesByDate?: boolean;
    showScrollbars?: boolean;
    invited?: boolean;
    darkTheme?: boolean;
    useBigFonts?: boolean;
    useBeta?: boolean;
    photoMaxWidth?: number;
    imageData?: string;
    firstName?: string;
    lastName?: string;
    username: string;
    email?: string;
    password?: string;
    isTeam?: boolean;
    tags?: Array<string>;
    role?: IRole;
    telephone?: string;
    company?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: any;
    location?: ILocation;
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
    sso?: boolean;
}
export declare class IUserSettings extends IEntity {
    useBeta: boolean;
    viewlist: boolean;
    darkTheme: boolean;
    useBigFonts: boolean;
    showScrollbars: boolean;
    enableMissionLiveSync: boolean;
    disableEmailNotifications: boolean;
    disablePushNotifications: boolean;
    disableSmsNotifications: boolean;
    disableHapticFeedback: boolean;
    sendFinishedEmail: boolean;
    deletePhotos: boolean;
    allowPhotoEdit: boolean;
    disablePhotoOrientationAutoFix: boolean;
    photoMaxWidth?: number;
    orderServicesByDate: boolean;
    goToBasket: boolean;
    radius: any;
    timezone: any;
}
export declare class ISimpleUser extends IEntity {
    imageData: string;
    username: string;
    email: string;
    password: string;
}
export declare class IUserRank extends IEntity {
    _id: string;
    user: IUser;
    rank: number;
    points: number;
    latePlans: number;
}
export declare class IUserStats extends IEntity {
    lessonsCount: number;
    lessonsValidated: number;
    availablePoints: number;
    earnedPoints: number;
    earnedBadges: Array<string>;
}

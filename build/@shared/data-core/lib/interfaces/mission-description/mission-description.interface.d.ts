import { IMissionDescription, IScoring, IFormField, IRole, SelectionQuery } from '@shared/stencil';
import { Slide } from '../slide/slide.interface';
import { Condition } from '../condition/condition.interface';
import { Tenant } from '../tenant/tenant.interface';
export declare const MISSION_TYPES_NO_ADMIN: string[];
export declare const MISSION_TYPES: string[];
export declare const MISSION_STATUS: string[];
export declare function onMissionDescriptionTypeChange(value: any, data: any, field: any): void;
export declare class MissionDescription extends IMissionDescription {
    _id?: string;
    type: string;
    title: string;
    text: string;
    icon: any;
    tags: Array<string>;
    background: any;
    group: Array<string>;
    serviceGroups: Array<string>;
    missionTags: Array<string>;
    slides: Array<Slide>;
    public: boolean;
    skipValidation: boolean;
    allowSameUserValidation: boolean;
    allowMultiple: boolean;
    quizz: boolean;
    quizzMode: string;
    showAnswers: boolean;
    audit: boolean;
    recurring: boolean;
    category: MissionDescription;
    language: string;
    submittext: string;
    successtext: string;
    versionmin: string;
    finishedGroups: Array<string>;
    roles?: Array<IRole>;
    archived: boolean;
    count: number;
    storesQuery?: SelectionQuery;
    latest: Date;
    _ect: any;
    conditions: Array<Condition>;
    scoring: Array<Scoring>;
    _tenant: Tenant;
    _tenantRef?: string;
    validFrom: Date;
    validUntil: Date;
    duedate: Date;
    notify?: boolean;
    notifyBody?: string;
    notifyScheduledDate?: Date;
    notificationemail?: Array<string>;
    disableLocationNotificationemail?: boolean;
    pdfMode?: string;
}
export declare class MissionDescriptionCreate extends IMissionDescription {
    type: string;
    title: string;
    text: string;
    icon: any;
    priority: any;
    audit: boolean;
    recurring: boolean;
    allowMultiple: boolean;
    quizz: boolean;
    quizzMode: string;
    showAnswers: boolean;
    language: string;
    tags: Array<string>;
    slides: Array<Slide>;
    _tenant: Tenant;
    _tenantRef?: string;
}
export declare class MissionDescriptionSchedule extends IMissionDescription {
    validFrom: Date;
    validUntil: Date;
    duedate: Date;
}
export declare class MissionDescriptionNotifications extends IMissionDescription {
    notify: boolean;
    notifyBody: string;
    notifyScheduledDate: Date;
    notificationemail: Array<string>;
    disableLocationNotificationemail: boolean;
    pdfMode?: string;
}
export declare class MissionDescriptionSettings extends IMissionDescription {
    group: Array<string>;
    serviceGroups: Array<string>;
    finishedGroups: Array<string>;
    roles?: Array<IRole>;
    missionTags: Array<string>;
    skipValidation: boolean;
    allowSameUserValidation: boolean;
    autoRenew: boolean;
    autoRenewOnBooking: boolean;
    locationOptions: string;
    duration: number;
    submittext: string;
    successtext: string;
    versionmin: string;
}
export declare class Scoring extends IScoring {
    title: string;
    description: string;
    initialValue: number;
    minValue: number;
    isActive: boolean;
    isLive: boolean;
    isPercentage: boolean;
    percentageBasis: number;
    selectedFields: Array<IFormField>;
}

import { Filters } from '../filters/filters.interface';
export interface IAcl {
    creator: string;
    groups: {
        r: Array<string>;
        w: Array<string>;
    };
}
export declare class IEntity {
    _id?: string;
    _acl?: IAcl;
    _lmt?: string;
    _ect?: string;
    isChild?: boolean;
    parentRef?: string;
    _tenantRef?: string;
    _tenant?: any;
    tags?: any;
    _geoloc?: any;
}
export interface IProperty {
    title?: string;
    type?: string;
    headers?: Array<string>;
    values: Array<any>;
    value?: any;
    group?: string | Array<string>;
    role?: string | Array<string>;
}
export declare type EntityType = 'missions' | 'channel' | 'channels' | 'environnement' | 'feeds' | 'feedsComments' | 'blog' | 'users' | 'notifications' | 'files' | 'folders' | 'filesFolders' | 'groups' | 'translations' | 'missiondescriptions' | 'dashboards' | 'contacts' | 'notes' | 'googlemaps' | 'locations' | 'locationtypes' | 'geofilters' | 'missiondatas' | 'visits' | 'catalogs' | 'products' | 'tenants' | 'memolist' | 'memos' | 'calendarEvents' | 'tag' | 'version' | 'emails' | 'custommodels' | 'photos' | 'courses' | 'plans' | 'lessons' | 'userranks' | 'apps' | 'badges' | 'questions' | 'questionsanswers' | 'mediacapturedevices' | 'videocallusers' | 'operations' | 'productbatch' | 'productbatchlist' | 'tableau' | 'regex' | 'publicAPITokens' | 'unsplash';
export interface IEntityAction {
    type?: string;
    isVisible?: (item?: IEntity) => boolean;
    isDisabled?: (item?: IEntity) => boolean;
    handler?: (item?: IEntity, dialog?: any) => void;
    icon?: (item?: IEntity) => string;
    text?: (item?: IEntity) => string;
    textClass?: (item?: IEntity) => string;
    cssClass?: (item?: IEntity) => string;
}
export interface IEntitiesAction {
    type?: string;
    isVisible?: (items?: Array<IEntity>) => boolean;
    isDisabled?: (items?: Array<IEntity>) => boolean;
    handler?: (items?: Array<IEntity>) => void;
    icon?: (items?: Array<IEntity>) => string;
    text?: (items?: Array<IEntity>) => string;
    cssClass?: (items?: Array<IEntity>) => string;
}
export interface ISyncedCollection {
    name: string;
    max?: number;
    filters?: Filters;
    fields?: Array<string>;
    addToCache?: Array<string>;
}

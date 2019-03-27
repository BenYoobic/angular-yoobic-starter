export interface IAcl {
    creator: string;
    groups: {
        r: Array<string>;
        w: Array<string>;
    };
}
export interface IEntity {
    _id?: string | number | boolean;
    _acl?: IAcl;
    _lmt?: string;
    _ect?: string;
}
export interface IProperty {
    title?: string;
    type?: string;
    values: Array<any>;
}
export declare class Entity implements IEntity {
    _id?: string | number | boolean;
    _acl?: IAcl;
    _lmt?: string;
    _ect?: string;
    properties?: IProperty[];
    constructor(source?: any);
}

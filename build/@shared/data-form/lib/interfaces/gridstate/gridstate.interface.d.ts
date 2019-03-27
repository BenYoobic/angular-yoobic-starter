import { Entity, IAcl } from '@shared/data-core';
export declare class GridState extends Entity {
    _id: string;
    _acl: IAcl;
    _lmt?: string;
    _ect?: string;
    title: string;
    description: string;
    group: string | Array<string>;
    collectionName: string;
    filters: any;
    sortModel: any;
    visibleFields: any;
    mode: any;
}

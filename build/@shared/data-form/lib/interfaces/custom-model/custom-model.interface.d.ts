import { IAcl, Slide } from '@shared/data-core';
import { IFormField, ICustomModel } from '@shared/stencil';
export declare class CustomModel extends ICustomModel {
    _id: string;
    _acl: IAcl;
    _lmt?: string;
    _ect?: string;
    title: string;
    name: string;
    shortDescription: string;
    group: Array<string>;
    allowInventory: boolean;
    background: any;
    feathersService: string;
    fields: Array<IFormField>;
    properties?: Array<any>;
    permissions?: string;
    appearance?: Map<string, Array<string>>;
    slides?: Array<Slide>;
}

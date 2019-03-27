import { Entity, IAcl, Condition } from '@shared/data-core';
import { IFormField } from '@shared/stencil';
export declare class CustomFormField extends Entity {
    _id: string;
    _acl: IAcl;
    _lmt?: string;
    _ect?: string;
    title: string;
    description: string;
    fields: Array<IFormField>;
    conditions: Array<Condition>;
    group: string;
}

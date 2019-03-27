import { IFormField } from '@shared/stencil';
export declare class IModel {
    className: string;
    collectionName: string;
    searchableFields: Array<string>;
    fields: Array<string>;
    mappingFields: Map<number, string>;
    appearance: Map<string, any>;
    include: Array<string>;
    searchSubquery: {
        collectionName: string;
        field: string;
        values: string;
    };
    feathersService?: string;
    type: any;
    isCustom?: boolean;
    detailComponent?: string;
    icon?: string;
    private _formFields;
    formFields: Array<IFormField>;
    constructor(className: any);
}

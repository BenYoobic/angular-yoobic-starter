import { IFormField, FormFieldType, ICondition, IConditionalField } from '@shared/stencil';
import { CONDITION_TYPES, ROLES, ROLES_ASK, ROLES_CONDITIONS } from './icondition.interface';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
export { CONDITION_TYPES, ROLES, ROLES_ASK, ROLES_CONDITIONS };
export declare function getGroupsTransform(res: ResponseObject): ResponseObject;
export declare function isNotInformationField(m: any): boolean;
export declare function getFormFieldValues(): FormFieldType[];
export declare class Condition extends ICondition {
    title: string;
    type: string;
    field?: IFormField;
    operator: string;
    tags?: Array<string>;
    group?: Array<string>;
    values: Array<any>;
    value: any;
}
export declare class ConditionalField extends IConditionalField {
    fieldTitle: string;
    operator: string;
    values: Array<any>;
    value: any;
    newFieldType: string;
    newfieldTitle: string;
    newfieldDescription: string;
    newFieldRequired: boolean;
}

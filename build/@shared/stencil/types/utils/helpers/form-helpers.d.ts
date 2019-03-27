import { IFormField, ISlide, ICondition } from '../../interfaces';
export declare function isVisible(field: IFormField | ISlide, readonly: boolean, data: any, suffix?: string, session?: any): boolean;
export declare function isRequired(field: IFormField, data: any, visible: any, suffix?: string, session?: any): boolean;
export declare function isReadonly(field: IFormField, data: any, suffix?: string, session?: any): boolean;
export declare function isFieldWithNoValue(field: IFormField): boolean;
export declare function hasValue(field: IFormField, data: any, suffix?: string): boolean;
export declare function evalConditionsInContext(conditions: Array<ICondition>, data: any, suffix?: string, session?: any): boolean;
export declare function updateFormulas(slides: Array<ISlide>, data: any, suffix?: string): boolean;
export declare function setFieldData(field: IFormField, value: any, data: any, suffix: any): void;
export declare function evalInContext(js: string, data: any, rawValue?: boolean): any;
export declare function isNumberField(field: IFormField): boolean;
export declare function isBooleanField(field: IFormField): boolean;
export declare function isPhotoField(field: IFormField): boolean;
export declare function isMultiPhotosField(field: IFormField): boolean;
export declare function isPhotoOrMultiPhotosField(field: IFormField): boolean;
export declare function isVideoField(field: IFormField): boolean;
export declare function isDateTimeField(field: IFormField): boolean;
export declare function isIntervalField(field: IFormField): boolean;
export declare function isMultipleField(field: IFormField): boolean;
export declare function isColoredField(field: IFormField): boolean;
export declare function answerIsValid(value: any, answer: any, field: IFormField): boolean;
export declare function getFieldPath(field: IFormField, suffix: string): string;
export declare function getFieldValue(field: IFormField, initialData: Object, suffix: string): any;
/**
 * Generates the field label name
 */
export declare function generateLabel(field: any): any;

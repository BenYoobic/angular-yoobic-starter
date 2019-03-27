/// <reference path="../../../../../../../types/jsx/index.d.ts" />
import { ValidatorEntry, Validator, AsyncValidator } from '../../services/validators/validators.interface';
import { IGridSearch } from '../../ui/grid/grid.interface';
import { IFormField } from '../../entities/form-field/form-field.interface';
import { IAlgorithm } from '../../entities/algorithm/algorithm.interface';
import { ILocation } from '../../entities/location/location.interface';
import { IUser } from '../../entities/user/user.interface';
import { ITodo, ITodoTaskSimple } from '../../entities/todo/todo.interface';
export interface IEventEmitter<T = any> {
    emit: (data?: T) => void;
}
export interface IFormInputContainer {
    field?: IFormField;
    readonly?: boolean;
    commented: IEventEmitter<string>;
}
export interface IFormInputBase<T> {
    value: T;
    readonly?: boolean;
    required?: boolean;
    validity?: boolean;
    validators?: Array<Validator<T> | ValidatorEntry>;
    asyncValidators?: Array<AsyncValidator<T>>;
    validityChanged: IEventEmitter<boolean>;
    inputBlurred: IEventEmitter<any>;
    inputFocused: IEventEmitter<any>;
    inputChanged: IEventEmitter<T>;
    iconClicked?: IEventEmitter<string>;
    host?: HTMLElement;
    borderColor?: string;
    _validator?: Validator<T>;
    _asyncValidator?: AsyncValidator<T>;
    renderReadonly: () => any;
    renderEditable: () => any;
    render: () => any;
}
export interface IFormDatetime extends IFormInputBase<any> {
    type: string;
    minDate?: Date;
    maxDate?: Date;
}
export interface IFormCheckbox extends IFormInputBase<boolean> {
    type?: FormDisplayType;
}
export interface IFormToggle extends IFormInputBase<boolean> {
    type?: FormDisplayType;
}
export declare type FormDisplayType = 'line' | 'normal';
export interface IFormRange extends IFormInputBase<number | Array<number>> {
    min: number;
    max: number;
}
export interface IFormStarRating extends IFormInputBase<number> {
    type: FormStarType;
}
export declare type FormStarType = 'star' | 'button';
export interface IFormSelect extends IFormInputBase<Array<string> | string> {
    multiple: boolean;
}
export interface IFormAutocomplete<T> extends IFormInputBase<Array<T>> {
    multiple: boolean;
    collectionName?: string;
    values?: Array<T>;
    fetchData: IEventEmitter<IGridSearch>;
    useTranslate?: boolean;
}
export interface IFormCapture extends IFormInputBase<Array<string> | string> {
    type: string;
    multiple: boolean;
    min: number;
    max: number;
    maxWidth: number;
    duration: number;
    saveGeoloc: boolean;
    allowLibrary: boolean;
    allowAnnotate: boolean;
    isImageRecognition: boolean;
    isBackgroundProcess: boolean;
    algorithm?: IAlgorithm;
}
export interface IFormDocument {
    document: any;
    type: any;
}
export interface IFormFormula extends IFormInputBase<number> {
}
export interface IFormLocation extends IFormInputBase<ILocation | Array<ILocation>> {
    multiple: boolean;
}
export interface IFormBarcode extends IFormInputBase<string> {
}
export interface IFormBarcodeOcrRegex {
    _id: string;
    title: string;
    parsingPattern: string;
    regex: string;
}
export interface IFormCatalog extends IFormInputBase<{
    [productRef: string]: number;
}> {
    isInventory: boolean;
    isPresence: boolean;
    isCheck: boolean;
}
export interface IFormChecklistValue {
    previousTasks: Array<{
        text: string;
        validated?: boolean;
    }>;
    currentTasks: Array<string>;
}
export interface IFormChecklist extends IFormInputBase<IFormChecklistValue> {
    previousTasks: Array<{
        text: string;
        validated?: boolean;
    }>;
    currentTasks: Array<string>;
}
export interface IFormEmailreport extends IFormInputBase<Array<IUser>> {
    stateful: boolean;
    fieldValues: Array<string>;
}
export interface IFormTodo extends IFormInputBase<ITodo> {
    allPhotosRequired: boolean;
    allowLibrary: boolean;
    values: Array<string>;
    linked: boolean;
}
export interface IFormTask extends IFormInputBase<Array<ITodoTaskSimple>> {
}
export interface IFormUIValidation {
    valid: boolean;
    invalid: boolean;
}
export interface IFormUploader extends IFormInputBase<any> {
    extensions: Array<string>;
    multiple: boolean;
}

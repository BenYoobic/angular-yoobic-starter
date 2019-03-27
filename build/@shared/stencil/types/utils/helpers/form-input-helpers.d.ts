import { IFormInputBase, IFormUIValidation } from '../../interfaces';
export declare function setValidator(inputElement: IFormInputBase<any>, type?: string, validateInput?: boolean): void;
export declare function parseNumber(value: string): string | number;
export declare function parseStringToNumber(value: any): string;
export declare function convertValueForInputType(v: any, type: string): any;
export declare function getTimeDisplayValue(value: any, is24Hour?: boolean): any;
export declare function formatMinMaxDate(minDate: Date | number, maxDate: Date | number): {
    minDate: number | Date;
    maxDate: number | Date;
};
export declare function blurActiveElement(event: any): void;
export declare function onValidityChanged(ev: any, inputElement: IFormInputBase<any>): void;
export declare function onFocus(ev: any, inputElement: IFormInputBase<any>): void;
export declare function onInputFocused(ev: any, inputElement: IFormInputBase<any>, borderContainerSelector?: string, type?: string): void;
export declare function onInputBlurred(ev: any, inputElement: IFormInputBase<any>, borderContainerSelector?: string, type?: string, validation?: IFormUIValidation): void;
export declare function onInputClear(ev: any, inputElement: IFormInputBase<any>, borderContainerSelector?: string): void;
export declare function onIconClicked(icon: any, inputElement: IFormInputBase<any>, isCordovaAndroid?: boolean): void;
export declare function validate(inputElement: any, forceNullValidation?: boolean): Promise<any>;
export declare function setValueAndValidateInput(value: any, inputElement: any, forceNullValidation?: boolean, validateInput?: boolean): void;
export declare function taskStyle(finished: {
    value: boolean;
}): {
    icon: string;
    style: string;
    breakText: string;
};
export declare function getFormBottomPosition(formDynamic: HTMLYooFormDynamicElement): number;
export declare function isNullOrUndefined(value: any): boolean;
export declare function setInputElementValidatorOptions(inputElement: any, externalElement: any): any;

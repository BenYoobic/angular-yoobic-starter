import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator, IFormRange } from '../../../interfaces';
export declare class YooFormRangeComponent implements IFormRange {
    value: number | Array<number>;
    validators: Array<Validator<number | Array<number>> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<number | Array<number>>>;
    readonly: boolean;
    placeholder: string;
    min: number;
    max: number;
    double: boolean;
    name: string;
    validity: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    singleFormInput: HTMLYooFormInputElement;
    private requiredValidator;
    private supValidity;
    private infValidity;
    componentWillLoad(): void;
    onSliderChange(ev: CustomEvent<{
        lowValue: number;
        highValue: number;
    }>): void;
    onSingleSliderChange(ev: CustomEvent<number>): void;
    onInputChanged(ev: any, position: string): void;
    onValidityChanged(ev: any, position: string): void;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    hostData(): {
        class: {
            'swiper-no-swiping': boolean;
        };
    };
    render(): JSX.Element;
}

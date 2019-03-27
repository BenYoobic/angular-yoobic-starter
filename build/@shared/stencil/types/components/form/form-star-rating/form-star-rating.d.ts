import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IFormStarRating, FormStarType, Validator, AsyncValidator, ValidatorEntry } from '../../../interfaces';
export declare class YooFormStarRatingComponent implements IFormStarRating {
    value: number;
    max: number;
    validators: Array<Validator<number> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<number>>;
    readonly: boolean;
    type: FormStarType;
    name: string;
    isHistory: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<boolean>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    getArray(): Array<number>;
    onStarClick(index: number): void;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    renderHistory(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator, IFormFormula } from '../../../interfaces';
export declare class YooFormFormulaComponent implements IFormFormula {
    value: number;
    validators: Array<Validator<number> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<number>>;
    placeholder: string;
    required: boolean;
    readonly: boolean;
    type: string;
    name: string;
    validity: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    render(): JSX.Element;
}

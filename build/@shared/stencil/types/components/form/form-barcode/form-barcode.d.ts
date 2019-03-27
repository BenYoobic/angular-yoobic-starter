import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IFormBarcode, Validator, AsyncValidator, ValidatorEntry } from '../../../interfaces';
export declare class YooFormBarcodeComponent implements IFormBarcode {
    placeholder: string;
    value: string;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    readonly: boolean;
    required: boolean;
    name: string;
    hideValue: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    private scanning;
    componentWillLoad(): void;
    onOpenScanner(): Promise<void>;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    render(): JSX.Element;
}

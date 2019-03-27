import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator, IFormUploader } from '../../../interfaces';
export declare class YooFormUploaderComponent implements IFormUploader {
    value: boolean;
    validators: Array<Validator<boolean> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<boolean>>;
    readonly: boolean;
    extensions: Array<string>;
    multiple: boolean;
    required: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    validity: boolean;
    private pond;
    private inputElement;
    requiredWatch(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    validate(): boolean;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    render(): JSX.Element;
}

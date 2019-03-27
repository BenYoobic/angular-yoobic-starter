import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator, IProductBatch } from '../../../interfaces';
export declare class YooFormProductBatchComponent {
    value: IProductBatch;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    placeholder: string;
    readonly: boolean;
    type: string;
    required: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    validity: boolean;
    requiredWatch(): void;
    componentWillLoad(): void;
    validate(): boolean;
    onOpenImage(): void;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    render(): JSX.Element;
}

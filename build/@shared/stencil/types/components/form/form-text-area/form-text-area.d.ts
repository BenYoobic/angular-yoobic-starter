import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator, IFormInputBase } from '../../../interfaces';
export declare class YooFormTextAreaComponent implements IFormInputBase<string> {
    value: string;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    placeholder: string;
    readonly: boolean;
    initialRows: number;
    maxRows: number;
    resizable: 'both' | 'vertical' | 'horizontal' | 'none';
    name: string;
    disableEnter: boolean;
    validity: boolean;
    validateInput: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    enterPressed: EventEmitter<boolean>;
    tabPressed: EventEmitter<boolean>;
    rows: number;
    host: HTMLStencilElement;
    setFocus(): void;
    clear(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    onInputChanged(ev: any): void;
    updateRows(): void;
    onKeyPress(ev: KeyboardEvent): void;
    renderEditable(): JSX.Element;
    renderReadonly(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

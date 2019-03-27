import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator } from '../../../interfaces';
export declare class YooFormNumberPickerComponent {
    min: number;
    max: number;
    value: number;
    validity: boolean;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    placeholder: string;
    clearable: boolean;
    required: boolean;
    readonly: boolean;
    type: string;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    selection: number;
    host: HTMLStencilElement;
    private dialog;
    private keyboard;
    isValid(): Promise<boolean>;
    setValue(value: any): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    showContainerDialog(): void;
    onInputFocused(ev: any): void;
    onIconClicked(ev: any): void;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    render(): JSX.Element;
}

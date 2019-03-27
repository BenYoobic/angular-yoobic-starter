import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IFormToggle, FormDisplayType, Validator, AsyncValidator, ValidatorEntry } from '../../../interfaces';
export declare class YooFormToggleComponent implements IFormToggle {
    value: boolean;
    validators: Array<Validator<boolean> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<boolean>>;
    readonly: boolean;
    type: FormDisplayType;
    name: string;
    header: string;
    required: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    clicked: EventEmitter<boolean>;
    host: HTMLStencilElement;
    validity: boolean;
    private innerContainer;
    requiredWatch(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    validate(): boolean;
    onToggle(): void;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

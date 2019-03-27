import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IFormCheckbox, FormDisplayType, Validator, AsyncValidator, ValidatorEntry } from '../../../interfaces';
export declare class YooFormCheckboxComponent implements IFormCheckbox {
    /**
     * Checks the validity of the component.
     */
    validators: Array<Validator<boolean> | ValidatorEntry>;
    /**
     * Checks the validity of the component using async.
     */
    asyncValidators: Array<AsyncValidator<boolean>>;
    /**
     * FormDisplayType property
     */
    type: FormDisplayType;
    /**
     * Defines the default value of the component
     */
    value: boolean;
    /**
     * Specifies wheter the component is in readonly mode.
     */
    readonly: boolean;
    /**
     * Allows the definition of a name parameter.
     */
    name: string;
    /**
     * The header appears as a checkbox label.
     */
    header: string;
    /**
     * Specifies wheter the component is a required field.
     */
    required: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<boolean>;
    host: HTMLStencilElement;
    validity: boolean;
    private isFormChoice;
    requiredWatch(): void;
    onCheckboxClick(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    validate(): boolean;
    renderCheck(): JSX.Element;
    renderFormChoiceMask(): JSX.Element;
    renderHeader(): JSX.Element;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

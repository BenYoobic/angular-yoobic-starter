import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator, IFormEmailreport, IUser, IGridSearch, IEntitySearchTags, IFormSearch } from '../../../interfaces';
export declare class YooFormEmailreportComponent implements IFormEmailreport {
    value: Array<IUser>;
    validators: Array<Validator<Array<IUser>> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<Array<IUser>>>;
    readonly: boolean;
    name: string;
    validity: boolean;
    stateful: boolean;
    fieldValues: Array<string>;
    tags: Array<IEntitySearchTags>;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    fetchData: EventEmitter<IGridSearch>;
    host: HTMLStencilElement;
    protected formAutocomplete: HTMLYooFormAutocompleteElement;
    updateValues(values: Array<IUser>, formSearch?: IFormSearch): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onFetchData(ev: CustomEvent<IGridSearch>): void;
    onInputChanged(ev: CustomEvent<Array<IUser>>): void;
    onInputBlurred(ev: CustomEvent<any>): void;
    onInputFocused(ev: CustomEvent<any>): void;
    onAutoCompleteValidityChanged(ev: CustomEvent<any>): void;
    renderInput(): JSX.Element;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    render(): JSX.Element;
}

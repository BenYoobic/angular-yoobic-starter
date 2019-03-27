import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IFormField, IEntitySearchFilters, IFormSearch } from '../../../interfaces';
export declare class YooEntitySearchFiltersComponent {
    header: string;
    fields: Array<IFormField>;
    values: Array<IEntitySearchFilters>;
    filter: EventEmitter<Array<IEntitySearchFilters>>;
    fieldFetchData: EventEmitter<IFormSearch>;
    filters: Array<IEntitySearchFilters>;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    onUpdateValues(): void;
    getFieldFilterName(field: IFormField): string;
    onAutocompleteChange(ev: CustomEvent<any>, field: IFormField): void;
    onSimpleFilter(ev: MouseEvent, item: any, field: IFormField, type: any): void;
    onDateChange(ev: CustomEvent<any>, field: IFormField): void;
    onNumberChange(ev: CustomEvent<any>, field: IFormField): void;
    onFieldFetchData(ev: CustomEvent<IFormSearch>, newField: any): void;
    hasFilters(): boolean;
    getDisplayValue(field: IFormField, v: any): any;
    isChecked(item: any, field: IFormField): boolean;
    isFieldWithValues(field: IFormField): boolean;
    isFieldWithNumber(field: any): boolean;
    renderUl(field: IFormField): JSX.Element;
    render(): JSX.Element;
}

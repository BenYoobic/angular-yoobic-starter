import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IAppSearchTab, ISort, IEntitySearchFilters, IFormSearch } from '../../../interfaces';
export declare class YooEntitySearchDialogComponent {
    model: IAppSearchTab;
    values: {
        filters: Array<IEntitySearchFilters>;
        sorts: Array<ISort>;
    };
    fieldFetchData: EventEmitter<IFormSearch>;
    isDirty: boolean;
    host: HTMLStencilElement;
    protected sorts: Array<ISort>;
    protected filters: Array<IEntitySearchFilters>;
    private footer;
    private isTabbarHidden;
    onHideTabbar(ev: any): void;
    componentWillLoad(): void;
    onCancel(): void;
    onApply(): void;
    onClearAll(): void;
    onSort(ev: CustomEvent<Array<ISort>>): void;
    onFilter(ev: CustomEvent<Array<IEntitySearchFilters>>): void;
    onFieldFetchData(ev: CustomEvent<IFormSearch>): void;
    render(): JSX.Element[];
}

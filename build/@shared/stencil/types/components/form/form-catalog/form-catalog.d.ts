import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator, IFormCatalog, IProduct, IGridSearch, IEntitySearchTags } from '../../../interfaces';
export declare class YooFormCatalogComponent implements IFormCatalog {
    value: {
        [productRef: string]: number;
    };
    validators: Array<Validator<{
        [productRef: string]: number;
    }> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<{
        [productRef: string]: number;
    }>>;
    readonly: boolean;
    multiple: boolean;
    isHistory: boolean;
    name: string;
    validity: boolean;
    tags: Array<IEntitySearchTags>;
    isInventory: boolean;
    isPresence: boolean;
    isCheck: boolean;
    catalog: string;
    products: Array<IProduct>;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    fetchData: EventEmitter<IGridSearch>;
    notFoundError: string;
    host: HTMLStencilElement;
    protected formAutocomplete: HTMLYooFormAutocompleteElement;
    private dialog;
    updateValues(values: any): void;
    componentWillLoad(): void;
    onSelect(ev: CustomEvent<Array<IProduct>>): void;
    readonly selectedProducts: any[];
    onFetchData(ev: CustomEvent<IGridSearch>): void;
    onScanned(ev: CustomEvent<string>): void;
    onInputBlurred(ev: CustomEvent<any>): void;
    onInputFocused(ev: CustomEvent<any>): void;
    addProducts(products: Array<IProduct>): void;
    addProduct(product: IProduct): void;
    removeProduct(product: IProduct): void;
    clearProduct(product: IProduct): void;
    getProductRefs(): string[];
    getTotalAndPrice(): {
        total: number;
        price: number;
    };
    setValue(value: any): void;
    onOpenCatalogDialog(product: IProduct): void;
    renderProducts(readonly: boolean): JSX.Element;
    renderInnerProducts(readonly: boolean): JSX.Element;
    onAutoCompleteValidityChanged(ev: CustomEvent<any>): void;
    renderEditable(): JSX.Element;
    renderHistory(): JSX.Element;
    renderReadonly(): JSX.Element;
    render(): JSX.Element;
}

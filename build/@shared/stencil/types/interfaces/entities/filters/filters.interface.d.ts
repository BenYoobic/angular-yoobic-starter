export declare type ISortDir = 'desc' | 'asc';
export interface ISort {
    colId: string;
    sort: ISortDir;
}
export interface FilterOperator {
    _id: string;
    title?: string;
    interval?: boolean;
}
export interface FilterField {
    field?: string;
    type?: string;
    defaultFields?: Array<string>;
    handleUndefined?: boolean;
    operator?: FilterOperator;
    radius?: number;
    value?: any;
    min?: any;
    max?: any;
    subQuery?: SubQuery;
    collectionName?: string;
    removeFromOffline?: boolean;
}
export interface Filter extends Array<FilterField> {
}
export interface Filters extends Array<Filter> {
}
export interface SubQuery {
    collectionName?: string;
    where?: any;
    field: string;
    values?: string;
    exclude?: boolean;
    leftJoin?: boolean;
}
export interface Query {
    skip?: number;
    limit?: number;
    order?: Array<string>;
    fields?: Array<string>;
    where?: any;
    include?: Array<string>;
    subQuery?: SubQuery | Array<SubQuery>;
    options?: Array<any>;
    includeCount?: boolean;
}
export interface IDatesRange {
    mode: string;
    amount?: number;
    timescale?: string;
    startDate?: Date;
    endDate?: Date;
    notsliding?: boolean;
}
export interface IEntitySearchFilters {
    fieldname: string;
    type: 'autocomplete' | 'date' | 'checkbox' | 'number';
    values: any;
    handleUndefined?: boolean;
    isSubQuery?: boolean;
    subQuery?: any;
    collectionName?: string;
}
export interface SelectionQuery {
    query: Query;
    sortsAndFilters: {
        filters: Array<IEntitySearchFilters>;
        sorts: Array<ISort>;
    };
    tags?: Array<any>;
    total: number;
    search?: string;
    mode: 'query' | 'selection';
}

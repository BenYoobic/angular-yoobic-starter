import { IEntitySearchTags } from '../../entities/entity-search/entity-search.interface';
import { IPosition } from '../maps/maps.interface';
import { Filters, SubQuery, ISort } from '../../entities/filters/filters.interface';
export interface IGridSearch {
    search: string;
    currentPage: number;
    pageSize: number;
    appendData: boolean;
    infiniteScroll?: {
        complete: Function;
        disabled: boolean;
    };
    infiniteScrollType?: 'pullToRefresh' | 'infiniteScroll' | 'datasource';
    aroundMe?: boolean;
    customPosition?: IPosition;
    tags?: IEntitySearchTags[];
    datasourceSuccess?: (rowsThisBlock: any[], lastRow?: number) => void;
    sorts?: Array<ISort>;
}
export interface IGridConfig {
    title: string;
    icon?: string;
    sorts?: Array<ISort>;
    filters?: Filters;
    subQuery?: SubQuery;
    mapTransform?: (x: any) => any;
    mapTransformAsync?: boolean;
    aggregateOptions?: (skip: any, limit: any) => Array<any>;
    aggregateOptionsOffline?: (skip: any, limit: any) => Array<any>;
}
export interface IGetRowsParams {
    startRow: number;
    endRow: number;
    sortModel: any;
    filterModel: any;
    context: any;
    successCallback(rowsThisBlock: any[], lastRow?: number): void;
    failCallback(): void;
}
export interface IDatasource {
    getRows(params: IGetRowsParams): void;
    destroy?(): void;
}

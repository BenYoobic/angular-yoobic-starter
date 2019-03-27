import { Filters, ISort, IEntitySearchFilters } from '../filters/filters.interface';
import { IFormField } from '../form-field/form-field.interface';
import { CardType } from '../../ui/card/card.interface';
export interface IEntitySearchRequest {
    search?: string;
    tab: IAppSearchTab;
    tags?: IEntitySearchTags[];
    sortsAndFilters: {
        filters: Array<IEntitySearchFilters>;
        sorts: Array<ISort>;
    };
    currentPage?: number;
    pageSize?: number;
    appendData?: boolean;
    infiniteScroll?: {
        complete: Function;
        disabled: boolean;
    };
}
export interface IEntitySearchTags {
    _id: string;
    count: number;
    tag: string;
}
export interface IAppSearchTab {
    id: string;
    title?: string;
    collectionName: string;
    emptyState?: string;
    filters?: Filters;
    advancedFiltersFields?: Array<IFormField>;
    hideAdvancedFilters?: boolean;
    fields?: Array<IFormField>;
    tags?: Array<string>;
    recents?: Array<string>;
    subscriptions?: Array<any>;
    mapTransform?: Function;
    mapTransformAsync?: boolean;
    isCollapsible?: boolean;
    displayType?: CardType;
}
export interface IModelSearch {
    fields: Array<IFormField>;
    tags?: Array<string>;
}

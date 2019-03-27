import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IEntitySearchTags, ISort, IEntitySearchFilters } from '../../../interfaces';
export declare class YooEntitySearchTagsComponent {
    tags: Array<any>;
    sortsAndFilters: {
        filters: Array<IEntitySearchFilters>;
        sorts: Array<ISort>;
    };
    values: Array<IEntitySearchTags>;
    hideAdvancedFilters: boolean;
    select: EventEmitter<Array<IEntitySearchTags>>;
    filterAdvanced: EventEmitter<boolean>;
    selects: Array<IEntitySearchTags>;
    slidesOptions: any;
    host: HTMLStencilElement;
    constructor();
    componentWillLoad(): void;
    isSelected(item: any): boolean;
    updateSelects(item: IEntitySearchTags): Array<IEntitySearchTags>;
    onSelect(ev: Event, item: IEntitySearchTags): void;
    onFilterAdvanced(): void;
    renderLi(item: IEntitySearchTags): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

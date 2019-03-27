import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { CardType, EntityType, IGridSearch, IEntitySearchTags, ICustomModel } from '../../../interfaces';
export declare class YooFormAutocompleteDialogComponent {
    multiple: boolean;
    displayType: CardType;
    entityType: EntityType;
    originalEntityType: EntityType;
    isLocal: boolean;
    useTranslate: boolean;
    allowCustomTag: boolean;
    idOnly: boolean;
    idAttributeName: string;
    emptyState: string;
    tag: boolean;
    tags: Array<IEntitySearchTags>;
    hideTags: boolean;
    isLoading: boolean;
    values: any[];
    customModel: ICustomModel;
    /**
     * Used when we want to force fullscreen if we are opening the autocomplete dialog directly without going
     * through an autocomplete.
     */
    openFullscreen: boolean;
    value: Array<any>;
    fetchData: EventEmitter<IGridSearch>;
    tagsSelect: EventEmitter<Array<IEntitySearchTags>>;
    swipedUp: EventEmitter<boolean>;
    swipedDown: EventEmitter<boolean>;
    selection: Array<any> | any;
    fullscreen: boolean;
    host: HTMLStencilElement;
    private grid;
    private refresher;
    private dialogTitleMap;
    readonly fullScrollHeight: number;
    onValueChanged(): void;
    onSwipeUp(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onSwipeDown(): void;
    onCancel(): void;
    onSave(): void;
    onItemSelect(ev: CustomEvent<any>): void;
    onFetchGridData(ev: CustomEvent<IGridSearch>): void;
    getDialogTitle(): string;
    onCustomTagCreated(ev: CustomEvent<string>): void;
    addNewTag(ev: CustomEvent<string>): void;
    onHeaderClick(): void;
    onTagsSelect(ev: CustomEvent<IEntitySearchTags[]>): void;
    onPullToRefresh(): void;
    private getTitleClassName;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

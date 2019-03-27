import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { CardType, ICardListEntry, EntityType, ICustomModel, IEntityAction, IFormField, IEntity, IColumnDefinition } from '../../../interfaces';
export declare class YooEntityComponent {
    item: any;
    items: Array<IEntity>;
    displayType: CardType;
    entityType: EntityType;
    useTranslate: boolean;
    iconColor: string;
    icons: Array<IEntityAction>;
    topActions: Array<IEntityAction>;
    bottomActions: Array<IEntityAction>;
    secondaryActions: Array<IEntityAction>;
    readonly: boolean;
    clearable: boolean;
    customModel: ICustomModel;
    isHistory: boolean;
    isCollapsible: boolean;
    isMap: boolean;
    isFramed: boolean;
    columnDefinition: IColumnDefinition;
    secondaryActionsDropdown: boolean;
    closed: EventEmitter<boolean>;
    collapsed: EventEmitter<{
        collapsed: boolean;
        item: ICardListEntry;
    }>;
    viewMoreToggled: EventEmitter<boolean>;
    host: HTMLStencilElement;
    onEntityClosed(): void;
    getCustomModelValue(key: string, data: any, fields: Array<IFormField>): any;
    onListCollapsed(event: CustomEvent<{
        collapsed: boolean;
        item: ICardListEntry;
    }>): void;
    onCardCellMoreActionClicked(event: CustomEvent<boolean>): void;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

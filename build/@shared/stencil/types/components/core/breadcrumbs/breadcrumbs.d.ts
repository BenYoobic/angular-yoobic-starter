import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooBreadcrumbsComponent {
    items: string[];
    itemSelected: EventEmitter<string>;
    visibleItems: number;
    host: HTMLStencilElement;
    ITEM_WIDTH: number;
    MAX_VISIBLE_ITEMS: number;
    private resizeListener;
    componentWillLoad(): void;
    commponentDidUnload(): void;
    setItemNumber(): void;
    selectItem(item: string): void;
    isLastItem(index: number, arr: string[]): boolean;
    renderDefaultBreadcrumbItem(item: string, index: number, arr: string[]): JSX.Element;
    renderCollapsedBreadcrumbItem(item: string): JSX.Element;
    render(): JSX.Element;
}

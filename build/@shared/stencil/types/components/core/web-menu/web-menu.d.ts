import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IWebMenuEntry, IWebMenuItem } from '../../../interfaces';
export declare class YooWebMenuComponent {
    leftEntry: IWebMenuEntry;
    rightEntry: IWebMenuEntry;
    /**
     * The name of the active page
     */
    activePage: string;
    itemClicked: EventEmitter<IWebMenuItem>;
    previewIconMoved: EventEmitter<number>;
    searchClicked: EventEmitter<void>;
    activePreviewPage: string;
    host: HTMLStencilElement;
    private previewIcon;
    /**
     * Local reference to active page to avoid making this.active page mutable
     */
    private _activePage;
    private resizeListener;
    activePageChange(activePage: string): void;
    onIonModalDidDismiss(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    isActivePage(page: any, isClickOnMenuItem?: boolean): boolean;
    isHighlightedPage(page: any): boolean;
    isAProfilePage(activePage: string, isClickOnMenuItem: boolean): boolean;
    onItemClicked(item: IWebMenuItem, itemContainer: HTMLElement): void;
    resizePage(): void;
    getPreviewIconPosition(itemContainer: HTMLElement): number;
    renderUser(entry: IWebMenuEntry): JSX.Element;
    renderLogo(entry: IWebMenuEntry): JSX.Element;
    renderItems(entry: IWebMenuEntry, renderUser: boolean): JSX.Element;
    renderItem(item: IWebMenuItem): JSX.Element;
    renderLeftContainer(): JSX.Element;
    renderMiddleContainer(): JSX.Element;
    renderRightContainer(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

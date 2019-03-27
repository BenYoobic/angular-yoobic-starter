import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IButton } from '../../../interfaces';
export declare class YooContextMenuComponent {
    contentButtons: Array<IButton>;
    contentPosition: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    };
    insideScroll: boolean;
    contextMenuOpened: EventEmitter<boolean>;
    contextMenuClosed: EventEmitter<boolean>;
    opened: boolean;
    host: HTMLStencilElement;
    private toggleWindowListener;
    private dropdownContent;
    onContextMenuOpened(): void;
    open(): void;
    close(): void;
    componentWillLoad(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    setupListeners(): void;
    removeListeners(): void;
    checkPosition(): void;
    toggle(): void;
    toggleWindow(): void;
    onItemClick(item: IButton): void;
    render(): JSX.Element;
}

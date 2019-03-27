import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ICardCellEntry } from '../../../interfaces';
export declare class YooCardCellComponent {
    entry: ICardCellEntry;
    moreActionsClicked: EventEmitter<boolean>;
    imageWidth: number;
    imageHeight: number;
    host: HTMLStencilElement;
    presentActionSheet(): void;
    onContextMenuToggled(opened: boolean): void;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

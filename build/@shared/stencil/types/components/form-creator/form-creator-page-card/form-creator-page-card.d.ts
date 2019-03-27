import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IPageCardEntry } from '../../../interfaces';
export declare class YooFormCreatorPageCardComponent {
    /**
     * The entry for the page info to show in the card. The blockNumber corresponds to the number of fields
     * in a page.
     */
    pageCardEntry: IPageCardEntry;
    pageClicked: EventEmitter<void>;
    host: HTMLStencilElement;
    onPageCardClicked(): void;
    renderHeading(): JSX.Element;
    renderSubheading(): JSX.Element;
    renderFooter(): JSX.Element;
    render(): JSX.Element;
}

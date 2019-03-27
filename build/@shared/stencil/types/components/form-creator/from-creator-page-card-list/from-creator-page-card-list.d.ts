import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ISlide } from '../../../interfaces';
export declare class YooFromCreatorPageCardListComponent {
    /**
     * The pages of the currently selected campaign; each page contains a series of items.
     */
    missionSlides: ISlide[];
    /**
     * The index of the currently selected page.
     */
    selectedPageIndex: number;
    /**
     * This event is propagated from each card but will be populated with
     * the index of the clicked card in this step
     */
    pageClicked: EventEmitter<number>;
    selectPageIndexState: number;
    host: HTMLStencilElement;
    onPageIndexSelected(newIndex: number): void;
    componentWillLoad(): void;
    onPageClicked(event: CustomEvent<void>, pageIndex: number): void;
    renderPageCards(): JSX.Element;
    render(): JSX.Element;
}

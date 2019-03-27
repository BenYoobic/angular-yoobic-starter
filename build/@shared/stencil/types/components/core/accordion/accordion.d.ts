import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IAccordionItem, IAccordionEntry, IButton } from '../../../interfaces';
export declare class YooAccordionComponent {
    /**
     * have a master title for the accordion
     */
    masterTitle: string;
    /**
     * Enable or disable multiple selection
     */
    allowMultipleSelection: boolean;
    /**
     * Icon pair to be toggled between the two supplied icons
     * [0] --> non-selected state; [1] --> selected state;
     * positioned to the left of the title
     */
    iconPairLeft: string[];
    /**
     * Icon pair to be toggled between the two supplied icons
     * [0] --> non-selected state; [1] --> selected state;
     * positioned to the right of the title
     */
    iconPairRight: string[];
    /**
     * If true, each item will have a border bottom of 1px
     */
    showBottomBorder: boolean;
    /**
     * Entries are the strings that will populate each row of the accordion
     */
    entries: IAccordionEntry[];
    accordionSelected: EventEmitter<number>;
    items: IAccordionItem[];
    host: HTMLStencilElement;
    private selectedIndex;
    private previousSelectedIndex;
    private accordionContentContainers;
    private accordionSelectors;
    private shouldAnimateAfterReRender;
    onTitlesChange(): void;
    componentWillLoad(): void;
    componentDidUpdate(): void;
    populateItems(selectedValue?: boolean): Array<IAccordionItem>;
    reRenderItems(): void;
    closeSingleSelection(index: number): void;
    openItem(index: number): void;
    isAnItemSelected(): boolean;
    handleMultiSelect(item: IAccordionItem, index: number): void;
    handleSingleDeselect(index: number): void;
    handleSingleSelect(index: number): void;
    onAccordionClick(item: IAccordionItem, index: number): void;
    onMasterTitleClicked(): void;
    animateTransition(currentIndex: number, isAnimatedUp: boolean): void;
    renderIconPair(item: IAccordionItem, buttonPair: string[]): JSX.Element;
    renderAccordionTitle(item: IAccordionItem, index: number, masterTitle?: boolean): JSX.Element;
    renderActionButton(actionButton: IButton): JSX.Element;
    renderSlot(item: IAccordionItem, index: number): JSX.Element;
    renderMasterTitle(): JSX.Element;
    hostData(): {
        class: {
            'bottom-border': boolean;
        };
    };
    render(): JSX.Element;
}

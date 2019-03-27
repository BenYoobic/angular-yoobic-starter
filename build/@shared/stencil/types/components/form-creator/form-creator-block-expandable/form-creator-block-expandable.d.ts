import '../../../stencil.core';
import { IFormCreatorBlock } from '../../../interfaces';
export declare class YooFormCreatorBlockExpandableComponent {
    /**
     * The form field that will render as a form creator block
     */
    formField: IFormCreatorBlock;
    isExpanded: boolean;
    host: HTMLStencilElement;
    onHeaderIconClicked(icon: string): void;
    renderHeader(): JSX.Element;
    renderIcon(icon: string): JSX.Element;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}

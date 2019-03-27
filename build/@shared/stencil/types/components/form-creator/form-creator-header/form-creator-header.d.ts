import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooFormCreatorHeaderComponent {
    /**
     * The title of the campaign to be displayed in the breadcrumbs
     */
    formTitle: string;
    /**
     * Determines if the live preview icon is selected or not
     */
    isLivePreviewVisible: boolean;
    helpClicked: EventEmitter<void>;
    saveCloseClicked: EventEmitter<void>;
    toggleLivePreviewClicked: EventEmitter<void>;
    exportClicked: EventEmitter<void>;
    importClicked: EventEmitter<void>;
    host: HTMLStencilElement;
    private secondaryActions;
    renderLogoImage(): JSX.Element;
    renderBreadCrumbs(): JSX.Element;
    renderButtons(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMissionDescription } from '../../../interfaces';
export declare class YooCampaignEditorRecapComponent {
    campaign: IMissionDescription;
    edited: EventEmitter<string>;
    previewed: EventEmitter<string>;
    host: HTMLStencilElement;
    renderEmptyContainer(section: string, iconClass?: string, content?: any): JSX.Element;
    renderCategory(text: string): JSX.Element;
    renderStores(): JSX.Element;
    renderSchedule(): JSX.Element;
    renderContent(): JSX.Element;
    renderSettings(): JSX.Element;
    renderNotifications(): JSX.Element;
    render(): JSX.Element;
}

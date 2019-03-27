import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMissionDescription } from '../../../interfaces';
export declare class YooCampaignHeadingComponent {
    /**
     * The campaign with all relevant attributes of the campaign heading.
     */
    campaign: IMissionDescription;
    alwaysExpanded: boolean;
    edited: EventEmitter<boolean>;
    published: EventEmitter<IMissionDescription>;
    notified: EventEmitter<boolean>;
    livePreviewed: EventEmitter<IMissionDescription>;
    archived: EventEmitter<IMissionDescription>;
    finished: EventEmitter<IMissionDescription>;
    showSecondaryActions: boolean;
    showMore: boolean;
    host: HTMLStencilElement;
    private secondaryActions;
    toggleMore(): void;
    renderTags(): JSX.Element;
    renderBadgesContainer(): JSX.Element;
    renderTopContainer(): JSX.Element;
    renderMoreContent(): JSX.Element;
    renderBottomContainer(): JSX.Element;
    render(): JSX.Element;
}

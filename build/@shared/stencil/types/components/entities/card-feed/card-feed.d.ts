import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ICardEntry } from '../../../interfaces';
export declare class YooCardFeedComponent {
    entry: ICardEntry;
    groupClicked: EventEmitter<any>;
    bottomActionClicked: EventEmitter<boolean>;
    viewMoreToggled: EventEmitter<boolean>;
    imageWidth: number;
    imageHeight: number;
    host: HTMLStencilElement;
    private isPhotos;
    componentWillLoad(): void;
    isBlog(): boolean;
    renderCardImage(): JSX.Element;
    renderImageContainerContent(): JSX.Element;
    renderEntryDescription(): JSX.Element;
    renderFeedBadges(): JSX.Element;
    renderFeedTags(): JSX.Element;
    renderTopActions(): JSX.Element;
    renderBottomActions(): JSX.Element;
    renderFeedIcons(): JSX.Element;
    renderFeedDocument(): JSX.Element;
    onShowActions(ev: MouseEvent): void;
    renderFeedSubheading(): JSX.Element;
    renderPhotosSubheading(): JSX.Element;
    renderMoreButton(): JSX.Element;
    renderFeedTop(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

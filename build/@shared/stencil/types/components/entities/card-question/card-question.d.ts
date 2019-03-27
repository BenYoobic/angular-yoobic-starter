import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ICardEntry } from '../../../interfaces';
export declare class YooCardQuestionComponent {
    entry: ICardEntry;
    bottomActionClicked: EventEmitter<boolean>;
    viewMoreToggled: EventEmitter<boolean>;
    imageWidth: number;
    imageHeight: number;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    isAnswer(): boolean;
    renderCardImage(): JSX.Element;
    renderImageContainerContent(): JSX.Element;
    renderEntryDescription(): JSX.Element;
    renderQuestionTags(): JSX.Element;
    renderTopActions(): JSX.Element;
    renderBottomActions(): JSX.Element;
    renderTopIcons(): JSX.Element;
    onShowActions(ev: MouseEvent): void;
    renderTop(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

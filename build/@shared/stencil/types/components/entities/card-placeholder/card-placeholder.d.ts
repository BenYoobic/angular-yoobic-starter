import '../../../stencil.core';
import { CardType, EntityType } from '../../../interfaces';
export declare class YooCardPlaceholderComponent {
    displayType: CardType;
    entityType: EntityType;
    header: string;
    host: HTMLStencilElement;
    renderCardFeed(): JSX.Element;
    renderCardDashboard(): JSX.Element;
    renderCardCourse(): JSX.Element;
    renderCardQuestion(): JSX.Element;
    renderCardQuestionAnswers(): JSX.Element;
    renderCardList(): JSX.Element;
    renderCardListLessons(): JSX.Element;
    renderCardListViews(): JSX.Element;
    renderUserRanks(): JSX.Element;
    renderCardSticky(): JSX.Element;
    renderCardCell(): JSX.Element;
    render(): JSX.Element;
}

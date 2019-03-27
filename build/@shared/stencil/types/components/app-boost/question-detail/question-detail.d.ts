import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IButton, IQuestion } from '../../../index';
export declare class YooQuestionDetailComponent {
    question: IQuestion;
    liked: EventEmitter<boolean>;
    replyClicked: EventEmitter<any>;
    actions: Array<IButton>;
    imageWidth: number;
    imageHeight: number;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    onQuestionUpdate(): void;
    updateActions(): void;
    renderQuestionTop(): JSX.Element;
    renderBottomAction(): JSX.Element;
    renderTags(): JSX.Element;
    renderImage(): JSX.Element;
    render(): JSX.Element;
}

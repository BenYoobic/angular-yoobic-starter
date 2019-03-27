import '../../../stencil.core';
import { IButton, IFile, IMissionDescription } from '../../../index';
export declare class YooLessonQuestionResultComponent {
    resultType: 'question' | 'lesson' | 'timeout' | 'course';
    nextLesson: IMissionDescription;
    validated: boolean;
    earnedPoints: number;
    earnedBadge: string;
    nbAnswered: number;
    lessonTitle: string;
    lessonType: string;
    lessonMinForCompliance: number;
    questionExplanation: string;
    explanationDocument: IFile;
    showHeader: boolean;
    footerActions: Array<IButton>;
    host: HTMLStencilElement;
    protected result: {
        img: string;
        title: string;
        text?: string;
    };
    componentWillLoad(): void;
    renderBadge(badge: string): JSX.Element;
    renderHeader(): JSX.Element;
    renderQuestionResult(): JSX.Element;
    renderLessonResult(): JSX.Element;
    renderFooter(): JSX.Element;
    hostData(): {
        class: {
            [x: string]: boolean;
            'validated': boolean;
            'failed': boolean;
            'timedout': boolean;
        };
    };
    render(): JSX.Element;
}

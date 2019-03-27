import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ILesson, IUser, IUserRank, IFormField } from '../../../index';
export declare class YooLessonDetailComponent {
    assignmentDate: Date;
    highscores: Array<IUserRank>;
    lesson: ILesson;
    lessonData: Array<IFormField>;
    start: EventEmitter<any>;
    scrollHeight: string;
    host: HTMLStencilElement;
    private isMobile;
    private session;
    componentWillLoad(): void;
    getSizeContainer(): {
        height: string;
    };
    onStart(ev: MouseEvent): void;
    renderButton(): JSX.Element;
    renderStartButton(): JSX.Element;
    renderSimpleSection(value: string, title: string, icon: string, isInnerHTML?: boolean): JSX.Element;
    renderUserSection(user: IUser, title: string, icon: string): JSX.Element;
    renderAnswers(): JSX.Element;
    renderLesson(): JSX.Element;
    render(): JSX.Element;
}

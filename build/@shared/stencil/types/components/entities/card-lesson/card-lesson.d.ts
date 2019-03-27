import '../../../stencil.core';
import { ILesson } from '../../../interfaces';
export declare class YooCardLessonComponent {
    lesson: ILesson;
    host: HTMLStencilElement;
    getLessonOrder(): any;
    getLessonType(): string;
    render(): JSX.Element;
}

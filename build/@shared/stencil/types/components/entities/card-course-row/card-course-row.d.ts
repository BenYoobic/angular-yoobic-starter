import '../../../stencil.core';
import { ICourse } from '../../../interfaces';
export declare class YooCardCourseRowComponent {
    entry: ICourse;
    host: HTMLStencilElement;
    protected imageWidth: number;
    protected imageHeight: number;
    renderCardImage(): JSX.Element;
    renderDueDate(): JSX.Element[];
    renderCourseContent(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

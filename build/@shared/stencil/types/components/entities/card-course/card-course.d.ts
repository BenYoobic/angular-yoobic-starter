import '../../../stencil.core';
import { ICourse } from '../../../interfaces';
export declare class YooCardCourseComponent {
    entry: ICourse;
    host: HTMLStencilElement;
    protected imageWidth: number;
    protected imageHeight: number;
    renderCardImage(): JSX.Element;
    renderCourseContent(): JSX.Element;
    render(): JSX.Element;
}

import '../../../stencil.core';
import { ICourse } from '../../../index';
export declare class YooCourseDetailComponent {
    course: ICourse;
    courseProgress: number;
    planDueDate: string;
    private imageHeight;
    private imageWidth;
    private getAvailablePoints;
    private readonly image;
    private getCourseImage;
    render(): JSX.Element;
}

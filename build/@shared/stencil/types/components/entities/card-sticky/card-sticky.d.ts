import '../../../stencil.core';
import { ICardStickyEntry } from '../../../interfaces';
export declare class YooCardStickyComponent {
    entry: ICardStickyEntry;
    type?: string;
    imageWidth: number;
    imageHeight: number;
    showEllipsis: boolean;
    host: HTMLStencilElement;
    MAX_LINE_HEIGHT: number;
    renderNewsfeedCard(): JSX.Element;
    renderCoursesCard(): JSX.Element;
    renderBase(): JSX.Element;
    renderBasedOnType(): JSX.Element;
    hostData(): {
        class: {
            'web': any;
        };
    };
    render(): JSX.Element;
}

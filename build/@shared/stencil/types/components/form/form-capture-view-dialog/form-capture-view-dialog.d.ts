import '../../../stencil.core';
import { IProperty } from '../../../interfaces';
export declare class YooFormCaptureViewDialogComponent {
    label: string;
    preview: any;
    allowAnnotate: boolean;
    edit: any;
    imageRecognitionResults: Array<{
        title: string;
        value: any;
        rawValue: any;
        color: string;
        hidden?: boolean;
        key: string;
    }>;
    imageRecognitionDisplay: any;
    isStitch: boolean;
    host: HTMLStencilElement;
    protected properties: Array<IProperty>;
    private ionSlides;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onCancel(): void;
    getResultColor(color: any): any;
    renderWebBody(): JSX.Element;
    renderMobileBody(): JSX.Element;
    render(): JSX.Element[];
}

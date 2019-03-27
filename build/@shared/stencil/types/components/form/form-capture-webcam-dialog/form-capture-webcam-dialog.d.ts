import '../../../stencil.core';
export declare class YooFormCaptureWebcamDialogComponent {
    device: any;
    host: HTMLStencilElement;
    private holderRef;
    private webcamCamera;
    private isReady;
    componentDidLoad(): void;
    componentDidUnload(): void;
    initWebcam(): void;
    cleanUpCamera(): void;
    onCancel(): void;
    onSave(): void;
    render(): JSX.Element[];
}

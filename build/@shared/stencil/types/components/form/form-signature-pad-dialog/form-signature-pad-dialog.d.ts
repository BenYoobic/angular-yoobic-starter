import '../../../stencil.core';
import SignaturePad from 'signature_pad';
export declare class YooFormSignaturePadDialogComponent {
    value: string;
    readonly: boolean;
    isAnimationFinished: boolean;
    hasContent: boolean;
    host: HTMLStencilElement;
    protected signaturePad: SignaturePad;
    protected isDirty: boolean;
    protected isCanvasSetup: boolean;
    private canvasEl;
    private signatureContainerDiv;
    componentWillUpdate(): void;
    canvasSetup(): void;
    onCancel(): void;
    onSave(): void;
    onClear(): void;
    renderSignaturePad(): JSX.Element;
    renderReadonly(): JSX.Element;
    renderHeader(): JSX.Element;
    renderContent(): JSX.Element;
    renderBottom(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

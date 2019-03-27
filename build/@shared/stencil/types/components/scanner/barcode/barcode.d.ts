import '../../../stencil.core';
export declare class YooBarcodeComponent {
    type: string;
    height: number;
    value: string;
    host: HTMLStencilElement;
    private svg;
    onValueChanged(): void;
    componentDidLoad(): void;
    updateBarcode(): void;
    render(): JSX.Element;
}

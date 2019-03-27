import '../../../stencil.core';
export declare class YooSliderScaleComponent {
    triangleBackgroundColor: string;
    sliderValue: number;
    type: 'range' | 'scale';
    host: HTMLStencilElement;
    private progressStyle;
    componentDidLoad(): void;
    private isType;
    private setSliderScaleStyle;
    private properProgress;
    renderRangeSlider(): JSX.Element;
    renderScaleSlider(): JSX.Element;
    render(): JSX.Element;
}

import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooFormSliderComponent {
    name: string;
    step: number;
    disabled: boolean;
    hideLabel: boolean;
    hideReferences: boolean;
    doubleSlider: boolean;
    triangleColor: string;
    minimum: number;
    maximum: number;
    initialLowValue: number;
    initialValue: number;
    singleSliderChanged: EventEmitter<number>;
    doubleSliderChanged: EventEmitter<{
        lowValue: number;
        highValue: number;
    }>;
    value: number;
    secondValue: number;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    initialValueChanged(newValue: number): void;
    initialLowValueChanged(newValue: number): void;
    private getProgress;
    onChange(event: any): void;
    onChangeSecond(event: any): void;
    handleEvent(): void;
    setDoubleProgressStyle(): void;
    renderInputNumber(): JSX.Element;
    renderInputRange(): JSX.Element;
    renderDoubleSlider(): JSX.Element;
    hostData(): {
        class: {
            'swiper-no-swiping': boolean;
        };
    };
    render(): JSX.Element;
}

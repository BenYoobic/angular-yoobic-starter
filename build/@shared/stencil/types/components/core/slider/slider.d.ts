import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooSliderComponent {
    isDoubleSlider: boolean;
    showTriangleBackground: boolean;
    orientation: 'horizontal' | 'vertical';
    secondaryValue: number;
    minValue: number;
    maxValue: number;
    primaryValue: number;
    singleSliderChanged: EventEmitter<number>;
    slotDimension: number;
    host: HTMLStencilElement;
    private sliderElement;
    private thumbPrimaryElement;
    private thumbSecondaryElement;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    initInteractDraggable(draggableContainer: HTMLDivElement): void;
    isHorizontal(): boolean;
    onTouch(event: any): void;
    getInitialThumbPosition(): void;
    getCurrentSlot(event: any): number;
    getSlotDimension(): void;
    renderPrimaryThumb(): JSX.Element;
    renderSecondaryThumb(): JSX.Element;
    render(): JSX.Element;
}

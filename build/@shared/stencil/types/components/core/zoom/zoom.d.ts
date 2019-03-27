import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IZoomTransform } from '../../../interfaces';
export declare class YooZoomComponent {
    initialScale: number;
    lockPan: boolean;
    pinched: EventEmitter<boolean>;
    transformsChanged: EventEmitter<IZoomTransform>;
    host: HTMLStencilElement;
    private parentContainer;
    private childContainer;
    private containerWidth;
    private containerHeight;
    private currentScale;
    private adjustScale;
    private adjustDeltaX;
    private adjustDeltaY;
    private maxScale;
    private currentDeltaX;
    private currentDeltaY;
    private transforms;
    private hammerCtrl;
    componentWillLoad(): void;
    componentDidLoad(): void;
    initGestures(): void;
    addGestureRecognizers(): void;
    handleDoubleTap(event: any): void;
    setTransform(event: any): void;
    emitTransforms(): void;
    limitDraggingAreaOnPan(): void;
    saveTransform(): void;
    render(): JSX.Element;
}

import '../../../stencil.core';
export declare class YooTappableComponent {
    tapped: boolean;
    hovered: boolean;
    host: HTMLStencilElement;
    private dotDiv;
    private touchFlag;
    private touch_timeout;
    onTouchDown(): void;
    onMouseOver(): void;
    onMouseOut(): void;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

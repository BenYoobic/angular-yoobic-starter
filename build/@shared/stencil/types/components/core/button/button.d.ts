import '../../../stencil.core';
export declare class YooButtonComponent {
    text: string;
    translateText: boolean;
    disabled: boolean;
    isLoading: boolean;
    icon: string;
    bgColor: string;
    setMaxWidth: boolean;
    badge: string;
    badgeClass: string;
    hasMoreBtn: boolean;
    textOverflown: boolean;
    host: HTMLStencilElement;
    private textSpan;
    private value;
    private button;
    private dotDiv;
    private textWidth;
    private tapped;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    isTextOverflown(textWidth: number, containerWidth: number): void;
    addSlidingAnimation(textSpan: HTMLElement, textWidth: number): void;
    getStyle(): {
        'color': string;
    } | {
        'color'?: undefined;
    };
    getBackgroundStyle(): {
        'background': string;
    } | {
        'background'?: undefined;
    };
    getMaxWidthValueParent(): number;
    renderLoadingContainer(): JSX.Element;
    renderButtonContent(): JSX.Element;
    renderSlidingLabel(): JSX.Element;
    onItemTouchStart(ev: any): void;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

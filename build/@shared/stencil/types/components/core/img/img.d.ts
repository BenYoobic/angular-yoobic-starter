import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooImgComponent {
    height: string;
    alt: string;
    contain: boolean;
    type: 'back' | 'image';
    loadStrategy: 'on-visible' | 'instant';
    showFallback: boolean;
    disabled: boolean;
    src: string;
    imageLoaded: EventEmitter<any>;
    finalSrc: string;
    isElementVisible: boolean;
    showFallbackIcon: boolean;
    host: HTMLStencilElement;
    private observer;
    componentDidLoad(): void;
    updateSrc(): void;
    onImageLoaded(event: any): void;
    wrapperCheck(): boolean;
    getBackImageStyle(): any;
    observeVisibility(): void;
    onImageLoadError(): void;
    renderFinalImage(): JSX.Element;
    renderFallbackIcon(): JSX.Element;
    hostData(): {
        class: {
            'has-fallback': boolean;
        };
    };
    render(): JSX.Element;
}

import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IWalkthroughEntry, IWalkthroughSlideEvent } from '../../../index';
export declare class YooWalkthroughComponent {
    config: Array<IWalkthroughEntry>;
    slideChanged: EventEmitter<IWalkthroughSlideEvent>;
    walkthroughSkipped: EventEmitter<boolean>;
    getStartedClicked: EventEmitter<boolean>;
    lastSlide: boolean;
    host: HTMLStencilElement;
    private ionSlides;
    update(): void;
    slideNext(): void;
    isEnd(): Promise<boolean>;
    lockSwipes(shouldLock: boolean): void;
    onWalkthroughSkipped(): void;
    onNextClicked(): void;
    onIonSlideDidChange(event: CustomEvent<any>): void;
    onGetStartedClicked(): void;
    isLastSlide(slides: Array<IWalkthroughEntry>, currentIndex: number): void;
    renderStepButtons(): JSX.Element;
    renderGetStartedButton(): JSX.Element;
    renderSlide(slide: any): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

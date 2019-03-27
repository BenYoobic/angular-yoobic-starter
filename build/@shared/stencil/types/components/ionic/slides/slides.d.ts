import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooIonSlidesComponent {
    /**
     * If true, show the pagination. Defaults to `false`.
     */
    pager: boolean;
    /**
    * If true, show the navigation
    * (navigation should not be seen on mobile). Defaults to `isWeb`.
    */
    navigation: boolean;
    /**
     * The initial slide to open
     */
    initialSlide: number;
    /**
     * If true, show the scrollbar. Defaults to `false`.
     */
    scrollbar: boolean;
    /**
   * Options to pass to the swiper instance.
   * See http://idangero.us/swiper/api/ for valid options
   */
    options: any;
    /**
     * Emitted after Swiper initialization
     */
    ionSlidesDidLoad: EventEmitter<void>;
    /**
     * Emitted when the user taps/clicks on the slide's container.
     */
    ionSlideTap: EventEmitter<void>;
    /**
     * Emitted when the user double taps on the slide's container.
     */
    ionSlideDoubleTap: EventEmitter<void>;
    /**
     * Emitted before the active slide has changed.
     */
    ionSlideWillChange: EventEmitter<void>;
    /**
     * Emitted after the active slide has changed.
     */
    ionSlideDidChange: EventEmitter<void>;
    /**
     * Emitted when the next slide has started.
     */
    ionSlideNextStart: EventEmitter<void>;
    /**
     * Emitted when the previous slide has started.
     */
    ionSlidePrevStart: EventEmitter<void>;
    /**
     * Emitted when the next slide has ended.
     */
    ionSlideNextEnd: EventEmitter<void>;
    /**
     * Emitted when the previous slide has ended.
     */
    ionSlidePrevEnd: EventEmitter<void>;
    /**
     * Emitted when the slide transition has started.
     */
    ionSlideTransitionStart: EventEmitter<void>;
    /**
     * Emitted when the slide transition has ended.
     */
    ionSlideTransitionEnd: EventEmitter<void>;
    /**
     * Emitted when the slider is actively being moved.
     */
    ionSlideDrag: EventEmitter<void>;
    /**
     * Emitted when the slider is at its initial position.
     */
    ionSlideReachStart: EventEmitter<void>;
    /**
     * Emitted when the slider is at the last slide.
     */
    ionSlideReachEnd: EventEmitter<void>;
    /**
     * Emitted when the user first touches the slider.
     */
    ionSlideTouchStart: EventEmitter<void>;
    /**
     * Emitted when the user releases the touch.
     */
    ionSlideTouchEnd: EventEmitter<void>;
    el: HTMLStencilElement;
    /**
       * If true, show the navigation. Defaults to `false`.
       */
    private scrollbarEl?;
    private paginationEl?;
    private navigationNextEl?;
    private navigationPreviousEl?;
    private didInit;
    private currentHeight;
    private readySwiper;
    private swiper;
    optionsChanged(): Promise<void>;
    onkeypress(ev: any): void;
    onSlideChanged(): void;
    syncSlideHeight(): void;
    /**
     * Update the underlying slider implementation. Call this if you've added or removed
     * child slides.
     */
    update(): Promise<void>;
    /**
     * Transition to the specified slide.
     */
    slideTo(index: number, speed?: number, runCallbacks?: boolean): Promise<void>;
    /**
     * Transition to the next slide.
     */
    slideNext(speed?: number, runCallbacks?: boolean): Promise<void>;
    /**
     * Transition to the previous slide.
     */
    slidePrev(speed?: number, runCallbacks?: boolean): Promise<void>;
    /**
     * Get the index of the active slide.
     */
    getActiveIndex(): Promise<number>;
    /**
     * Get the index of the previous slide.
     */
    getPreviousIndex(): Promise<number>;
    /**
     * Get the total number of slides.
     */
    length(): Promise<number>;
    /**
     * Get whether or not the current slide is the last slide.
     *
     */
    isEnd(): Promise<boolean>;
    /**
     * Get whether or not the current slide is the first slide.
     */
    isBeginning(): Promise<boolean>;
    /**
     * Start auto play.
     */
    startAutoplay(): Promise<void>;
    /**
     * Stop auto play.
     */
    stopAutoplay(): Promise<void>;
    /**
     * Lock or unlock the ability to slide to the next slides.
     */
    lockSwipeToNext(shouldLockSwipeToNext: boolean): Promise<void>;
    /**
     * Lock or unlock the ability to slide to the previous slides.
     */
    lockSwipeToPrev(shouldLockSwipeToPrev: boolean): Promise<void>;
    /**
     * Lock or unlock the ability to slide to change slides.
     */
    lockSwipes(shouldLockSwipes: boolean): Promise<void>;
    componentDidLoad(): void;
    componentDidUnload(): Promise<void>;
    private showHideNavigationButtons;
    private initSwiper;
    private getSwiper;
    private setSlidesOverflow;
    private normalizeOptions;
    hostData(): {
        class: {
            'swiper-container': boolean;
        };
    };
    render(): JSX.Element[];
}

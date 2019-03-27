import { createThemedClasses, rIC } from '../../../utils/ionic';
import { isWeb } from '../../../index';
export class YooIonSlidesComponent {
    constructor() {
        /**
         * If true, show the pagination. Defaults to `false`.
         */
        this.pager = false;
        /**
        * If true, show the navigation
        * (navigation should not be seen on mobile). Defaults to `isWeb`.
        */
        this.navigation = isWeb();
        /**
         * The initial slide to open
         */
        this.initialSlide = 0;
        /**
         * If true, show the scrollbar. Defaults to `false`.
         */
        this.scrollbar = false;
        /**
       * Options to pass to the swiper instance.
       * See http://idangero.us/swiper/api/ for valid options
       */
        this.options = {}; // SwiperOptions;  // TODO
        this.didInit = false;
        this.swiper = new Promise(resolve => { this.readySwiper = resolve; });
    }
    async optionsChanged() {
        if (this.didInit) {
            const swiper = await this.getSwiper();
            Object.assign(swiper.params, this.options);
            await this.update();
        }
    }
    onkeypress(ev) {
        if (isWeb() && ev && ev.key === 'ArrowRight' && this.navigation) {
            this.slideNext();
        }
        else if (isWeb() && ev && ev.key === 'ArrowLeft' && this.navigation) {
            this.slidePrev();
        }
    }
    onSlideChanged() {
        if (this.didInit) {
            this.update();
        }
    }
    syncSlideHeight() {
        this.currentHeight = parseInt(this.el.style.height, 10);
        const slidesTop = this.el.getBoundingClientRect().top;
        const slidesHeight = window.innerHeight - slidesTop;
        if (this.currentHeight !== slidesHeight) {
            this.el.style.height = `${slidesHeight}px`;
        }
    }
    /**
     * Update the underlying slider implementation. Call this if you've added or removed
     * child slides.
     */
    async update() {
        const swiper = await this.getSwiper();
        swiper.update();
    }
    /**
     * Transition to the specified slide.
     */
    async slideTo(index, speed, runCallbacks) {
        const swiper = await this.getSwiper();
        swiper.slideTo(index, speed, runCallbacks);
    }
    /**
     * Transition to the next slide.
     */
    async slideNext(speed, runCallbacks) {
        this.setSlidesOverflow(speed);
        const swiper = await this.getSwiper();
        swiper.slideNext(speed, runCallbacks);
        await this.showHideNavigationButtons();
    }
    /**
     * Transition to the previous slide.
     */
    async slidePrev(speed, runCallbacks) {
        this.setSlidesOverflow(speed);
        const swiper = await this.getSwiper();
        swiper.slidePrev(speed, runCallbacks);
        await this.showHideNavigationButtons();
    }
    /**
     * Get the index of the active slide.
     */
    async getActiveIndex() {
        const swiper = await this.getSwiper();
        return swiper.activeIndex;
    }
    /**
     * Get the index of the previous slide.
     */
    async getPreviousIndex() {
        const swiper = await this.getSwiper();
        return swiper.previousIndex;
    }
    /**
     * Get the total number of slides.
     */
    async length() {
        const swiper = await this.getSwiper();
        return swiper.slides.length;
    }
    /**
     * Get whether or not the current slide is the last slide.
     *
     */
    async isEnd() {
        const swiper = await this.getSwiper();
        return swiper.isEnd;
    }
    /**
     * Get whether or not the current slide is the first slide.
     */
    async isBeginning() {
        const swiper = await this.getSwiper();
        return swiper.isBeginning;
    }
    /**
     * Start auto play.
     */
    async startAutoplay() {
        const swiper = await this.getSwiper();
        if (swiper.autoplay) {
            swiper.autoplay.start();
        }
    }
    /**
     * Stop auto play.
     */
    async stopAutoplay() {
        const swiper = await this.getSwiper();
        if (swiper.autoplay) {
            swiper.autoplay.stop();
        }
    }
    /**
     * Lock or unlock the ability to slide to the next slides.
     */
    async lockSwipeToNext(shouldLockSwipeToNext) {
        const swiper = await this.getSwiper();
        swiper.allowSlideNext = !shouldLockSwipeToNext;
    }
    /**
     * Lock or unlock the ability to slide to the previous slides.
     */
    async lockSwipeToPrev(shouldLockSwipeToPrev) {
        const swiper = await this.getSwiper();
        swiper.allowSlidePrev = !shouldLockSwipeToPrev;
    }
    /**
     * Lock or unlock the ability to slide to change slides.
     */
    async lockSwipes(shouldLockSwipes) {
        const swiper = await this.getSwiper();
        swiper.allowSlideNext = !shouldLockSwipes;
        swiper.allowSlidePrev = !shouldLockSwipes;
        swiper.allowTouchMove = !shouldLockSwipes;
    }
    componentDidLoad() {
        rIC(() => this.initSwiper());
    }
    async componentDidUnload() {
        const swiper = await this.getSwiper();
        swiper.destroy(true, true);
    }
    async showHideNavigationButtons() {
        if (isWeb() && this.didInit) {
            let index = await this.getActiveIndex();
            let length = await this.length();
            if (index === 0 && this.navigationPreviousEl && !this.navigationPreviousEl.classList.contains('hidden')) {
                this.navigationPreviousEl.classList.add('hidden');
            }
            else if (this.navigationPreviousEl && this.navigationPreviousEl.classList.contains('hidden')) {
                this.navigationPreviousEl.classList.remove('hidden');
            }
            if (index === length - 1 && this.navigationNextEl && !this.navigationNextEl.classList.contains('hidden')) {
                this.navigationNextEl.classList.add('hidden');
            }
            else if (this.navigationNextEl && this.navigationNextEl.classList.contains('hidden')) {
                this.navigationNextEl.classList.remove('hidden');
            }
        }
    }
    async initSwiper() {
        const finalOptions = this.normalizeOptions();
        // init swiper core
        const { Swiper } = await import('./swiper/swiper');
        const swiper = new Swiper(this.el, finalOptions);
        this.didInit = true;
        this.readySwiper(swiper);
    }
    getSwiper() {
        return this.swiper;
    }
    setSlidesOverflow(speed = 300) {
        if (isWeb() && this.el && this.el.classList.contains('outside-navigation-arrows')) {
            this.el.setAttribute('style', 'overflow: hidden;');
            setTimeout(() => {
                this.el.setAttribute('style', 'overflow: visible;');
            }, speed);
        }
    }
    normalizeOptions() {
        const swiperOptions = {
            effect: 'slide',
            direction: 'horizontal',
            initialSlide: this.initialSlide,
            loop: false,
            parallax: false,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 300,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            touchEventsTarget: 'container',
            autoplay: false,
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            autoHeight: false,
            setWrapperSize: false,
            zoom: {
                maxRatio: 3,
                minRatio: 1,
                toggle: true
            },
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            threshold: 30,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            resistance: true,
            resistanceRatio: 0.85,
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            loopAdditionalSlides: 0,
            noSwiping: true,
            runCallbacksOnInit: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            flipEffect: {
                slideShadows: true,
                limitRotation: true
            },
            cubeEffect: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fadeEffect: {
                crossfade: false
            },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide'
            }
        };
        if (this.pager) {
            swiperOptions.pagination = {
                el: this.paginationEl,
                type: 'bullets',
                clickable: isWeb(),
                hideOnClick: false
            };
        }
        if (this.scrollbar) {
            swiperOptions.scrollbar = {
                el: this.scrollbarEl,
                hide: true
            };
        }
        // Keep the event options separate, we dont want users
        // overwriting these
        const eventOptions = {
            on: {
                init: () => {
                    setTimeout(() => {
                        this.ionSlidesDidLoad.emit();
                    }, 20);
                },
                slideChangeTransitionStart: this.ionSlideWillChange.emit,
                slideChangeTransitionEnd: this.ionSlideDidChange.emit,
                slideNextTransitionStart: this.ionSlideNextStart.emit,
                slidePrevTransitionStart: this.ionSlidePrevStart.emit,
                slideNextTransitionEnd: this.ionSlideNextEnd.emit,
                slidePrevTransitionEnd: this.ionSlidePrevEnd.emit,
                transitionStart: this.ionSlideTransitionStart.emit,
                transitionEnd: this.ionSlideTransitionEnd.emit,
                sliderMove: this.ionSlideDrag.emit,
                reachBeginning: this.ionSlideReachStart.emit,
                reachEnd: this.ionSlideReachEnd.emit,
                touchStart: this.ionSlideTouchStart.emit,
                touchEnd: this.ionSlideTouchEnd.emit,
                tap: this.ionSlideTap.emit,
                doubleTap: this.ionSlideDoubleTap.emit
            }
        };
        // Merge the base, user options, and events together then pas to swiper
        return Object.assign({}, swiperOptions, this.options, eventOptions);
    }
    hostData() {
        return {
            class: Object.assign({}, createThemedClasses('ios', 'slides'), { 'swiper-container': true })
        };
    }
    render() {
        return [
            h("div", { class: "swiper-wrapper" },
                h("slot", null)),
            this.pager && h("div", { class: "swiper-pagination", ref: el => this.paginationEl = el }),
            this.navigation && isWeb() && [
                h("div", { ref: el => this.navigationPreviousEl = el, class: { 'swiper-button-prev': true, 'hidden': this.initialSlide === 0 }, onClick: () => this.slidePrev() },
                    h("yoo-icon", { class: "yo-left" })),
                h("div", { ref: el => this.navigationNextEl = el, class: "swiper-button-next", onClick: () => this.slideNext() },
                    h("yoo-icon", { class: "yo-right" }))
            ],
            this.scrollbar && h("div", { class: "swiper-scrollbar", ref: el => this.scrollbarEl = el })
        ];
    }
    static get is() { return "yoo-ion-slides"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "getActiveIndex": {
            "method": true
        },
        "getPreviousIndex": {
            "method": true
        },
        "initialSlide": {
            "type": Number,
            "attr": "initial-slide"
        },
        "isBeginning": {
            "method": true
        },
        "isEnd": {
            "method": true
        },
        "length": {
            "method": true
        },
        "lockSwipes": {
            "method": true
        },
        "lockSwipeToNext": {
            "method": true
        },
        "lockSwipeToPrev": {
            "method": true
        },
        "navigation": {
            "type": Boolean,
            "attr": "navigation"
        },
        "options": {
            "type": "Any",
            "attr": "options",
            "watchCallbacks": ["optionsChanged"]
        },
        "pager": {
            "type": Boolean,
            "attr": "pager"
        },
        "scrollbar": {
            "type": Boolean,
            "attr": "scrollbar"
        },
        "slideNext": {
            "method": true
        },
        "slidePrev": {
            "method": true
        },
        "slideTo": {
            "method": true
        },
        "startAutoplay": {
            "method": true
        },
        "stopAutoplay": {
            "method": true
        },
        "syncSlideHeight": {
            "method": true
        },
        "update": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "ionSlidesDidLoad",
            "method": "ionSlidesDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideTap",
            "method": "ionSlideTap",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideDoubleTap",
            "method": "ionSlideDoubleTap",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideWillChange",
            "method": "ionSlideWillChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideDidChange",
            "method": "ionSlideDidChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideNextStart",
            "method": "ionSlideNextStart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlidePrevStart",
            "method": "ionSlidePrevStart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideNextEnd",
            "method": "ionSlideNextEnd",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlidePrevEnd",
            "method": "ionSlidePrevEnd",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideTransitionStart",
            "method": "ionSlideTransitionStart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideTransitionEnd",
            "method": "ionSlideTransitionEnd",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideDrag",
            "method": "ionSlideDrag",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideReachStart",
            "method": "ionSlideReachStart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideReachEnd",
            "method": "ionSlideReachEnd",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideTouchStart",
            "method": "ionSlideTouchStart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSlideTouchEnd",
            "method": "ionSlideTouchEnd",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:keyup",
            "method": "onkeypress"
        }, {
            "name": "ionSlideChanged",
            "method": "onSlideChanged"
        }]; }
    static get style() { return "/**style-placeholder:yoo-ion-slides:**/"; }
}

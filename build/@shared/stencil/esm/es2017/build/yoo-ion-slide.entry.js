import { h } from '../design-system.core.js';

import { a5 as getAppContext, W as isWeb, cN as rIC, ct as createThemedClasses } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooIonSlideComponent {
    hostData() {
        return {
            class: Object.assign({ 'slide-zoom': true, 'swiper-slide': true }, getAppContext())
        };
    }
    static get is() { return "yoo-ion-slide"; }
    static get style() { return "yoo-ion-slide {\n  display: block;\n  width: 100%;\n  height: 100%; }\n\n.news-feed-slide {\n  max-width: 310px; }\n\n.slide-zoom {\n  display: block;\n  width: 100%;\n  text-align: center; }\n\n.swiper-slide {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.swiper-slide img {\n  width: auto;\n  max-width: 100%;\n  height: auto;\n  max-height: 100%; }\n\n.recap yoo-ion-scroll {\n  background: transparent; }\n\n.zoomed .slide-container {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  margin: 0;\n  margin-bottom: 0;\n  border-radius: 0; }\n  .zoomed .slide-container yoo-ion-scroll {\n    padding: 0; }\n\nyoo-ion-slide.empty {\n  width: 0 !important; }\n\nyoo-ion-slide.navigation-padding.web {\n  padding: 0 2.75rem; }\n\nyoo-ion-slide:not(.swiper-slide-active).web.outside-navigation-arrows {\n  opacity: 0;\n  pointer-events: none; }"; }
}

class YooIonSlidesComponent {
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
        const { Swiper } = await import('./chunk-d0199f76.js');
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
    static get style() { return ":host {\n  --host-background-color: unset;\n  --bullet-background: var(--stable, #adadad);\n  --bullet-background-active: var(--ion-color-primary, #1FB6FF);\n  --swiper-container-height: 100%;\n  --progress-bar-background: rgba(var(--ion-text-color-rgb), 0.25);\n  --progress-bar-background-active: var(--ion-color-primary-shade, get-color-shade(#1FB6FF));\n  --scroll-bar-background: rgba(var(--ion-text-color-rgb), 0.1);\n  --scroll-bar-background-active: rgba(var(--ion-text-color-rgb), 0.5);\n  --pagination-bottom-position: 0.625rem;\n  --pagination-left-position: 0;\n  --pagination-container-width: 100%;\n  --pagination-z-index: 10; }\n\n/**\n * Swiper 4.4.0\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * http://www.idangero.us/swiper/\n *\n * Copyright 2014-2018 Vladimir Kharlampidi\n *\n * Released under the MIT License\n *\n * Released on: September 14, 2018\n */\n.swiper-container {\n  position: relative;\n  margin: 0 auto;\n  padding: 0;\n  list-style: none;\n  overflow: hidden;\n  /* Fix of Webkit flickering */\n  z-index: 1; }\n\n.swiper-container-no-flexbox .swiper-slide {\n  float: left; }\n\n.swiper-container-vertical > .swiper-wrapper {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n.swiper-wrapper {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  -webkit-transition-property: -webkit-transform;\n  -o-transition-property: transform;\n  transition-property: -webkit-transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n  z-index: 1;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box; }\n\n.swiper-container-android .swiper-slide,\n.swiper-wrapper {\n  -webkit-transform: translate3d(0px, 0, 0);\n  transform: translate3d(0px, 0, 0); }\n\n.swiper-container-multirow > .swiper-wrapper {\n  -webkit-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n\n.swiper-container-free-mode > .swiper-wrapper {\n  margin: 0 auto;\n  -webkit-transition-timing-function: ease-out;\n  -o-transition-timing-function: ease-out;\n  transition-timing-function: ease-out; }\n\n.swiper-slide {\n  position: relative;\n  -webkit-flex-shrink: 0;\n  flex-shrink: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transition-property: -webkit-transform;\n  -o-transition-property: transform;\n  transition-property: -webkit-transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n  -ms-flex-negative: 0; }\n\n.swiper-slide-invisible-blank {\n  visibility: hidden; }\n\n/* Auto Height */\n.swiper-container-autoheight,\n.swiper-container-autoheight .swiper-slide {\n  height: auto; }\n\n.swiper-container-autoheight .swiper-wrapper {\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n  -webkit-transition-property: height, -webkit-transform;\n  -o-transition-property: transform, height;\n  transition-property: height, -webkit-transform;\n  transition-property: transform, height;\n  transition-property: transform, height, -webkit-transform;\n  -webkit-box-align: start;\n  -ms-flex-align: start; }\n\n/* 3D Effects */\n.swiper-container-3d {\n  -webkit-perspective: 1200px;\n  perspective: 1200px; }\n\n.swiper-container-3d .swiper-wrapper,\n.swiper-container-3d .swiper-slide,\n.swiper-container-3d .swiper-slide-shadow-left,\n.swiper-container-3d .swiper-slide-shadow-right,\n.swiper-container-3d .swiper-slide-shadow-top,\n.swiper-container-3d .swiper-slide-shadow-bottom,\n.swiper-container-3d .swiper-cube-shadow {\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d; }\n\n.swiper-container-3d .swiper-slide-shadow-left,\n.swiper-container-3d .swiper-slide-shadow-right,\n.swiper-container-3d .swiper-slide-shadow-top,\n.swiper-container-3d .swiper-slide-shadow-bottom {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 10;\n  pointer-events: none; }\n\n.swiper-container-3d .swiper-slide-shadow-left {\n  background-image: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  background-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: -o-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); }\n\n.swiper-container-3d .swiper-slide-shadow-right {\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); }\n\n.swiper-container-3d .swiper-slide-shadow-top {\n  background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: -o-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); }\n\n.swiper-container-3d .swiper-slide-shadow-bottom {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); }\n\n/* IE10 Windows Phone 8 Fixes */\n.swiper-container-wp8-horizontal,\n.swiper-container-wp8-horizontal > .swiper-wrapper {\n  -ms-touch-action: pan-y;\n  touch-action: pan-y; }\n\n.swiper-container-wp8-vertical,\n.swiper-container-wp8-vertical > .swiper-wrapper {\n  -ms-touch-action: pan-x;\n  touch-action: pan-x; }\n\n.swiper-button-prev,\n.swiper-button-next {\n  position: absolute;\n  top: 50%;\n  width: 27px;\n  height: 44px;\n  margin-top: -22px;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 27px 44px;\n  cursor: pointer;\n  z-index: 10; }\n\n.swiper-button-prev.swiper-button-disabled,\n.swiper-button-next.swiper-button-disabled {\n  cursor: auto;\n  opacity: 0.35;\n  pointer-events: none; }\n\n.swiper-button-prev,\n.swiper-container-rtl .swiper-button-next {\n  right: auto;\n  left: 10px;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\"); }\n\n.swiper-button-next,\n.swiper-container-rtl .swiper-button-prev {\n  right: 10px;\n  left: auto;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\"); }\n\n.swiper-button-prev.swiper-button-white,\n.swiper-container-rtl .swiper-button-next.swiper-button-white {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\"); }\n\n.swiper-button-next.swiper-button-white,\n.swiper-container-rtl .swiper-button-prev.swiper-button-white {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\"); }\n\n.swiper-button-prev.swiper-button-black,\n.swiper-container-rtl .swiper-button-next.swiper-button-black {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\"); }\n\n.swiper-button-next.swiper-button-black,\n.swiper-container-rtl .swiper-button-prev.swiper-button-black {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\"); }\n\n.swiper-button-lock {\n  display: none; }\n\n.swiper-pagination {\n  position: absolute;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  -webkit-transition: 300ms opacity;\n  -o-transition: 300ms opacity;\n  transition: 300ms opacity;\n  text-align: center;\n  z-index: var(--pagination-z-index); }\n\n.swiper-pagination.swiper-pagination-hidden {\n  opacity: 0; }\n\n/* Common Styles */\n.swiper-pagination-fraction,\n.swiper-pagination-custom,\n.swiper-container-horizontal > .swiper-pagination-bullets {\n  bottom: var(--pagination-bottom-position);\n  left: var(--pagination-left-position);\n  width: var(--pagination-container-width); }\n\n/* Bullets */\n.swiper-pagination-bullets-dynamic {\n  font-size: 0;\n  overflow: hidden; }\n\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {\n  position: relative;\n  -webkit-transform: scale(0.33);\n  -ms-transform: scale(0.33);\n  transform: scale(0.33); }\n\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {\n  -webkit-transform: scale(1);\n  -ms-transform: scale(1);\n  transform: scale(1); }\n\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {\n  -webkit-transform: scale(1);\n  -ms-transform: scale(1);\n  transform: scale(1); }\n\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {\n  -webkit-transform: scale(0.66);\n  -ms-transform: scale(0.66);\n  transform: scale(0.66); }\n\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {\n  -webkit-transform: scale(0.33);\n  -ms-transform: scale(0.33);\n  transform: scale(0.33); }\n\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {\n  -webkit-transform: scale(0.66);\n  -ms-transform: scale(0.66);\n  transform: scale(0.66); }\n\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {\n  -webkit-transform: scale(0.33);\n  -ms-transform: scale(0.33);\n  transform: scale(0.33); }\n\n.swiper-pagination-bullet {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 100%;\n  background: var(--black, #000000);\n  opacity: 0.2; }\n\nbutton.swiper-pagination-bullet {\n  margin: 0;\n  padding: 0;\n  border: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\n.swiper-pagination-clickable .swiper-pagination-bullet {\n  cursor: pointer; }\n\n.swiper-pagination-bullet-active {\n  background: #007aff;\n  opacity: 1; }\n\n.swiper-container-vertical > .swiper-pagination-bullets {\n  top: 50%;\n  right: 10px;\n  -webkit-transform: translate3d(0px, -50%, 0);\n  transform: translate3d(0px, -50%, 0); }\n\n.swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {\n  display: block;\n  margin: 6px 0; }\n\n.swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {\n  top: 50%;\n  width: 8px;\n  -webkit-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  transform: translateY(-50%); }\n\n.swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {\n  display: inline-block;\n  -webkit-transition: 200ms top, 200ms -webkit-transform;\n  -o-transition: 200ms transform, 200ms top;\n  transition: 200ms top, 200ms -webkit-transform;\n  transition: 200ms transform, 200ms top;\n  transition: 200ms transform, 200ms top, 200ms -webkit-transform; }\n\n.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {\n  margin: 0 4px; }\n\n.swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  transform: translateX(-50%);\n  white-space: nowrap; }\n\n.swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {\n  -webkit-transition: 200ms left, 200ms -webkit-transform;\n  -o-transition: 200ms transform, 200ms left;\n  transition: 200ms left, 200ms -webkit-transform;\n  transition: 200ms transform, 200ms left;\n  transition: 200ms transform, 200ms left, 200ms -webkit-transform; }\n\n.swiper-container-horizontal.swiper-container-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {\n  -webkit-transition: 200ms right, 200ms -webkit-transform;\n  -o-transition: 200ms transform, 200ms right;\n  transition: 200ms right, 200ms -webkit-transform;\n  transition: 200ms transform, 200ms right;\n  transition: 200ms transform, 200ms right, 200ms -webkit-transform; }\n\n/* Progress */\n.swiper-pagination-progressbar {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.25); }\n\n.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-transform-origin: left top;\n  -ms-transform-origin: left top;\n  transform-origin: left top;\n  background: #007aff; }\n\n.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {\n  -webkit-transform-origin: right top;\n  -ms-transform-origin: right top;\n  transform-origin: right top; }\n\n.swiper-container-horizontal > .swiper-pagination-progressbar,\n.swiper-container-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px; }\n\n.swiper-container-vertical > .swiper-pagination-progressbar,\n.swiper-container-horizontal > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {\n  top: 0;\n  left: 0;\n  width: 4px;\n  height: 100%; }\n\n.swiper-pagination-white .swiper-pagination-bullet-active {\n  background: #ffffff; }\n\n.swiper-pagination-progressbar.swiper-pagination-white {\n  background: rgba(255, 255, 255, 0.25); }\n\n.swiper-pagination-progressbar.swiper-pagination-white .swiper-pagination-progressbar-fill {\n  background: #ffffff; }\n\n.swiper-pagination-black .swiper-pagination-bullet-active {\n  background: #000000; }\n\n.swiper-pagination-progressbar.swiper-pagination-black {\n  background: rgba(0, 0, 0, 0.25); }\n\n.swiper-pagination-progressbar.swiper-pagination-black .swiper-pagination-progressbar-fill {\n  background: #000000; }\n\n.swiper-pagination-lock {\n  display: none; }\n\n/* Scrollbar */\n.swiper-scrollbar {\n  position: relative;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.1);\n  -ms-touch-action: none; }\n\n.swiper-container-horizontal > .swiper-scrollbar {\n  position: absolute;\n  bottom: 3px;\n  left: 1%;\n  width: 98%;\n  height: 5px;\n  z-index: 50; }\n\n.swiper-container-vertical > .swiper-scrollbar {\n  position: absolute;\n  top: 1%;\n  right: 3px;\n  width: 5px;\n  height: 98%;\n  z-index: 50; }\n\n.swiper-scrollbar-drag {\n  position: relative;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.5); }\n\n.swiper-scrollbar-cursor-drag {\n  cursor: move; }\n\n.swiper-scrollbar-lock {\n  display: none; }\n\n.swiper-zoom-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center; }\n\n.swiper-zoom-container > img,\n.swiper-zoom-container > svg,\n.swiper-zoom-container > canvas {\n  max-width: 100%;\n  max-height: 100%;\n  -o-object-fit: contain;\n  object-fit: contain; }\n\n.swiper-slide-zoomed {\n  cursor: move; }\n\n/* Preloader */\n.swiper-lazy-preloader {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 42px;\n  height: 42px;\n  margin-top: -21px;\n  margin-left: -21px;\n  -webkit-transform-origin: 50%;\n  -ms-transform-origin: 50%;\n  transform-origin: 50%;\n  z-index: 10;\n  -webkit-animation: swiper-preloader-spin 1s steps(12, end) infinite;\n  animation: swiper-preloader-spin 1s steps(12, end) infinite; }\n\n.swiper-lazy-preloader:after {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 100%;\n  content: \"\"; }\n\n.swiper-lazy-preloader-white:after {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\"); }\n\n\@-webkit-keyframes swiper-preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n\@keyframes swiper-preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n/* a11y */\n.swiper-container .swiper-notification {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  z-index: -1000;\n  pointer-events: none; }\n\n.swiper-container-fade.swiper-container-free-mode .swiper-slide {\n  -webkit-transition-timing-function: ease-out;\n  -o-transition-timing-function: ease-out;\n  transition-timing-function: ease-out; }\n\n.swiper-container-fade .swiper-slide {\n  pointer-events: none;\n  -webkit-transition-property: opacity;\n  -o-transition-property: opacity;\n  transition-property: opacity; }\n\n.swiper-container-fade .swiper-slide .swiper-slide {\n  pointer-events: none; }\n\n.swiper-container-fade .swiper-slide-active,\n.swiper-container-fade .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto; }\n\n.swiper-container-cube {\n  overflow: visible; }\n\n.swiper-container-cube .swiper-slide {\n  width: 100%;\n  height: 100%;\n  -webkit-transform-origin: 0 0;\n  -ms-transform-origin: 0 0;\n  transform-origin: 0 0;\n  visibility: hidden;\n  z-index: 1;\n  pointer-events: none;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden; }\n\n.swiper-container-cube .swiper-slide .swiper-slide {\n  pointer-events: none; }\n\n.swiper-container-cube.swiper-container-rtl .swiper-slide {\n  -webkit-transform-origin: 100% 0;\n  -ms-transform-origin: 100% 0;\n  transform-origin: 100% 0; }\n\n.swiper-container-cube .swiper-slide-active,\n.swiper-container-cube .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto; }\n\n.swiper-container-cube .swiper-slide-active,\n.swiper-container-cube .swiper-slide-next,\n.swiper-container-cube .swiper-slide-prev,\n.swiper-container-cube .swiper-slide-next + .swiper-slide {\n  pointer-events: auto;\n  visibility: visible; }\n\n.swiper-container-cube .swiper-slide-shadow-top,\n.swiper-container-cube .swiper-slide-shadow-bottom,\n.swiper-container-cube .swiper-slide-shadow-left,\n.swiper-container-cube .swiper-slide-shadow-right {\n  z-index: 0;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden; }\n\n.swiper-container-cube .swiper-cube-shadow {\n  position: absolute;\n  bottom: 0px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #000;\n  opacity: 0.6;\n  z-index: 0;\n  -webkit-filter: blur(50px);\n  filter: blur(50px); }\n\n.swiper-container-flip {\n  overflow: visible; }\n\n.swiper-container-flip .swiper-slide {\n  pointer-events: none;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  z-index: 1; }\n\n.swiper-container-flip .swiper-slide .swiper-slide {\n  pointer-events: none; }\n\n.swiper-container-flip .swiper-slide-active,\n.swiper-container-flip .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto; }\n\n.swiper-container-flip .swiper-slide-shadow-top,\n.swiper-container-flip .swiper-slide-shadow-bottom,\n.swiper-container-flip .swiper-slide-shadow-left,\n.swiper-container-flip .swiper-slide-shadow-right {\n  z-index: 0;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden; }\n\n.swiper-container-coverflow .swiper-wrapper {\n  /* Windows 8 IE 10 fix */\n  -ms-perspective: 1200px; }\n\n.slides {\n  /**\n  * \@prop --bullet-background: Background of the pagination bullets\n  * \@prop --bullet-background-active: Background of the active pagination bullet\n  */\n  display: block;\n  background-color: var(--host-background-color);\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.swiper-container {\n  height: var(--swiper-container-height); }\n\n.swiper-pagination-bullet {\n  background: var(--bullet-background);\n  opacity: 0.32; }\n\n.swiper-pagination-bullet-active {\n  background: var(--bullet-background-active);\n  opacity: 1; }\n\n.swiper-pagination-progressbar {\n  background: var(--progress-bar-background); }\n\n.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {\n  background: var(--progress-bar-background-active); }\n\n.swiper-button-prev,\n.swiper-button-next {\n  background-image: none !important; }\n\n.swiper-button-prev.hidden,\n.swiper-button-next.hidden {\n  display: none; }\n\n.swiper-scrollbar {\n  background: var(--scroll-bar-background); }\n\n.swiper-scrollbar-drag {\n  background: var(--scroll-bar-background-active); }\n\n:host(.entity-search-display) .scroll-inner,\n:host(.entity-search-display) .slides,\n:host(.entity-search-display) .swiper-container {\n  height: 100%; }\n\n:host(.entity-search-display) .swiper-slide {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n.swiper-container.outside-navigation-arrows {\n  overflow: visible; }\n  .swiper-container.outside-navigation-arrows .swiper-button-prev,\n  .swiper-container.outside-navigation-arrows .swiper-button-next {\n    color: var(--always-light, #FFFFFF);\n    font-size: 2rem; }\n  .swiper-container.outside-navigation-arrows .swiper-button-prev {\n    left: -2.5rem; }\n  .swiper-container.outside-navigation-arrows .swiper-button-next {\n    right: -2.5rem; }"; }
}

export { YooIonSlideComponent as YooIonSlide, YooIonSlidesComponent as YooIonSlides };

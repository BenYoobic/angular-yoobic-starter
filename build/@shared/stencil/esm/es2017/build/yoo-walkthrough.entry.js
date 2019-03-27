import { h } from '../design-system.core.js';

import { bh as lockSwipes, k as isCordova, m as translate, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooWalkthroughComponent {
    constructor() {
        this.lastSlide = false;
    }
    update() {
        if (this.ionSlides) {
            this.ionSlides.update();
        }
    }
    slideNext() {
        if (this.ionSlides) {
            this.ionSlides.slideNext(300);
        }
    }
    async isEnd() {
        if (this.ionSlides) {
            return this.ionSlides.isEnd();
        }
        return false;
    }
    lockSwipes(shouldLock) {
        lockSwipes(this.ionSlides, shouldLock);
    }
    onWalkthroughSkipped() {
        this.walkthroughSkipped.emit(true);
    }
    onNextClicked() {
        this.slideNext();
    }
    onIonSlideDidChange(event) {
        this.ionSlides.getActiveIndex().then(index => {
            let slide = this.config[index];
            this.isLastSlide(this.config, index);
            this.slideChanged.emit({ event: event.detail, slide });
        });
    }
    onGetStartedClicked() {
        this.getStartedClicked.emit(true);
    }
    isLastSlide(slides, currentIndex) {
        let lastSlideIndex = slides.length - 1;
        this.lastSlide = lastSlideIndex === currentIndex;
    }
    renderStepButtons() {
        return (h("div", { class: {
                'fade-in slide-controls-container': true,
                'swiper-no-swiping': isCordova()
            } },
            h("yoo-ion-buttons", null,
                h("yoo-ion-button", { class: "clear text-color", onClick: () => this.onWalkthroughSkipped() }, translate('SKIP').toUpperCase()),
                h("yoo-ion-button", { class: "clear", onClick: () => this.onNextClicked() }, translate('NEXT').toUpperCase()))));
    }
    renderGetStartedButton() {
        return h("div", { class: "button-container" },
            h("yoo-button", { class: {
                    'fade-in': true,
                    'large': true,
                    'swiper-no-swiping': !isCordova(),
                    'absolute': true
                }, text: translate('GETSTARTED'), onClick: () => this.onGetStartedClicked() }));
    }
    renderSlide(slide) {
        return (h("yoo-ion-slide", null,
            h("div", { class: "slide-content" },
                h("div", { class: "content-container" },
                    h("div", { class: "image-container" },
                        h("img", { src: slide.imageUrl })),
                    h("div", { class: "text-container" },
                        h("div", { class: "slide-title", innerHTML: slide.title }),
                        h("div", { class: "slide-subtitle", innerHTML: slide.subtitle }))))));
    }
    hostData() {
        return {
            class: getAppContext()
        };
    }
    render() {
        let config = this.config || [];
        return (h("div", { class: {
                'outer-container': true,
                'no-pager': this.lastSlide
            } },
            h("div", { class: "slide-container" },
                h("yoo-ion-slides", { ref: (el) => this.ionSlides = el, onIonSlideDidChange: event => this.onIonSlideDidChange(event), pager: true, options: { autoplay: false }, navigation: false }, config.map((slide) => this.renderSlide(slide)))),
            this.lastSlide ? this.renderGetStartedButton() : this.renderStepButtons()));
    }
    static get is() { return "yoo-walkthrough"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "host": {
            "elementRef": true
        },
        "isEnd": {
            "method": true
        },
        "lastSlide": {
            "state": true
        },
        "lockSwipes": {
            "method": true
        },
        "slideNext": {
            "method": true
        },
        "update": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "slideChanged",
            "method": "slideChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "walkthroughSkipped",
            "method": "walkthroughSkipped",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "getStartedClicked",
            "method": "getStartedClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  background-color: var(--light, #FFFFFF); }\n  :host .outer-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    height: 100%; }\n    :host .outer-container.no-pager .swiper-pagination {\n      display: none !important; }\n    :host .outer-container .slide-container {\n      height: 100%; }\n      :host .outer-container .slide-container yoo-ion-slides {\n        --bullet-background: var(--success, #04CC99) !important;\n        --bullet-background-active: var(--success, #04CC99) !important;\n        --pagination-left-position: 50%;\n        top: 0;\n        height: 100%; }\n        :host .outer-container .slide-container yoo-ion-slides .swiper-pagination {\n          position: absolute;\n          left: 0;\n          width: 100%;\n          height: 8%; }\n        :host .outer-container .slide-container yoo-ion-slides .swiper-container {\n          position: fixed; }\n    :host .outer-container .fade-in {\n      opacity: 1;\n      -webkit-animation-name: fadeInTransition;\n      animation-name: fadeInTransition;\n      -webkit-animation-iteration-count: 1;\n      animation-iteration-count: 1;\n      -webkit-animation-timing-function: ease-in;\n      animation-timing-function: ease-in;\n      -webkit-animation-duration: 0.5s;\n      animation-duration: 0.5s; }\n    :host .outer-container .slide-controls-container {\n      position: absolute;\n      bottom: 0;\n      width: 100%;\n      height: 10%;\n      z-index: 8; }\n      :host .outer-container .slide-controls-container yoo-ion-buttons {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-pack: justify;\n        justify-content: space-between;\n        width: 100%; }\n        :host .outer-container .slide-controls-container yoo-ion-buttons yoo-ion-button {\n          --padding-end: var(--padding-30, 1.875rem);\n          --padding-start: var(--padding-30, 1.875rem);\n          font-size: var(--font-s, 13px);\n          letter-spacing: 1px; }\n      :host .outer-container .slide-controls-container yoo-ion-button:not(.text-color) {\n        color: var(--success, #04CC99); }\n    :host .outer-container .slide-zoom {\n      max-width: 100%;\n      height: 100%; }\n    :host .outer-container .swiper-slide {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center; }\n    :host .outer-container .slide-content {\n      display: -ms-flexbox;\n      display: flex;\n      height: calc(100% - 4rem); }\n      :host .outer-container .slide-content .content-container {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -ms-flex-pack: center;\n        justify-content: center;\n        width: 100%; }\n        :host .outer-container .slide-content .content-container .text-container {\n          padding: 1rem 2.5rem; }\n          :host .outer-container .slide-content .content-container .text-container .slide-title {\n            margin-bottom: 0.75rem;\n            color: var(--black, #000000);\n            font-size: var(--font-l, 17px); }\n          :host .outer-container .slide-content .content-container .text-container .slide-subtitle {\n            margin-bottom: 2.75rem;\n            color: var(--text-color, #807f83);\n            font-size: var(--font-m, 15px); }\n    :host .outer-container .button-container {\n      position: absolute;\n      bottom: 0;\n      -ms-flex-item-align: center;\n      align-self: center;\n      height: 15%;\n      z-index: 1; }\n      :host .outer-container .button-container yoo-button {\n        --color-value: var(--light, #FFFFFF); }\n    :host .outer-container yoo-ion-button:not(.text-color) {\n      color: var(--success, #04CC99) !important; }\n\n\@-webkit-keyframes fadeInTransition {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 0.5; }\n  100% {\n    opacity: 1; } }\n\n\@keyframes fadeInTransition {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 0.5; }\n  100% {\n    opacity: 1; } }\n\n:host(.full-width) .slide-content {\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  :host(.full-width) .slide-content img {\n    width: 100%;\n    max-height: inherit; }\n  :host(.full-width) .slide-content .slide-title {\n    margin-top: 0.5rem; }\n\n:host(.operations) yoo-button {\n  --background-container: var(--success, #04CC99); }\n\n:host(.boost) .outer-container yoo-ion-slides {\n  --bullet-background: var(--danger-light, #F46885) !important;\n  --bullet-background-active: var(--danger-light, #F46885) !important; }\n\n:host(.boost) yoo-ion-button:not(.text-color) {\n  color: var(--danger-light, #F46885) !important; }\n\n:host(.boost) yoo-ion-button.text-color {\n  font-size: var(--font-m, 15px) !important; }\n\n:host(.boost) yoo-button {\n  --background-container: var(--danger-light, #F46885); }"; }
}

export { YooWalkthroughComponent as YooWalkthrough };

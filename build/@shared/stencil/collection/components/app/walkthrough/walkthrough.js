import { lockSwipes, translate, isCordova, getAppContext } from '../../../index';
export class YooWalkthroughComponent {
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
    static get style() { return "/**style-placeholder:yoo-walkthrough:**/"; }
}

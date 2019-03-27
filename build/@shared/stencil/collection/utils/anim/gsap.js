import { TimelineMax, Elastic, TweenMax, TweenLite, Expo, Power3, Power1 } from 'gsap';
import { isAnimationsDisabled } from '../config';
/**
 * This is GSAP helper class for managing several
 * timelines across Angular and Stencil components.
 */
class Gsap {
    constructor() {
        this.isPrepared = false;
        this.childTimelines = [];
    }
    /**
     * @param timeline TimelineMax
     * @param delay positive or negative value of delay in seconds of previous ordered timeline
     * @param order timeline will be placed to master Timeline in given order
     * @param label string label for timeline in master timeline
     */
    addTimeline(timeline, delay = 0, order) {
        timeline.pause();
        if (!order) {
            order = Math.max(...this.childTimelines.map(tl => tl.order), 0) + 1;
        }
        let label = 'scene' + (this.childTimelines.length + 1);
        this.childTimelines.push({ label: label, delay: delay, order: order, timeline: timeline });
        this.isPrepared = false;
        this.checkAutoplay();
        return label;
    }
    clean() {
        this.childTimelines = [];
        return this;
    }
    play() {
        this.prepareTimeline();
        this.masterTimeline.play();
        return this;
    }
    stop() {
        if (this.masterTimeline) {
            this.masterTimeline.kill();
        }
        return this;
    }
    pause() {
        if (this.masterTimeline) {
            this.masterTimeline.pause();
        }
        return this;
    }
    reverse() {
        if (this.masterTimeline) {
            this.masterTimeline.reverse();
        }
        return this;
    }
    getTimelineByLabel(label) {
        return this.childTimelines.find(child => child.label === label);
    }
    checkAutoplay() {
        if (this.autoplayInTimelineNum && this.childTimelines.length >= this.autoplayInTimelineNum) {
            this.play();
        }
    }
    translateDelayToPosition(delay) {
        return (delay < 0 ? '-' : '+') + '=' + Math.abs(delay || 0);
    }
    prepareTimeline() {
        if (this.isPrepared) {
            return;
        }
        let config = {
            paused: true,
            onStart: () => (this.onStart ? this.onStart() : null),
            onComplete: () => (this.onComplete ? this.onComplete() : null) // change callback scope to Gsap
        };
        this.masterTimeline = new TimelineMax(config);
        this.childTimelines.sort((a, b) => a.order - b.order).forEach(child => this.masterTimeline.add([child.timeline.play(), child.label.toString()], this.translateDelayToPosition(child.delay)));
        this.isPrepared = true;
    }
}
class DashboardGsapAnimation extends Gsap {
    constructor() {
        super(...arguments);
        // containers must be added first and animation is not active if any container is added
        this.isActive = false;
    }
    onStart() {
        this.isActive = false;
    }
    addContainerElements(elements, disableChildrenAnimation = false) {
        if (isAnimationsDisabled()) {
            return this;
        }
        if (!disableChildrenAnimation) {
            this.isActive = elements && elements.length > 0;
            if (!this.isActive) {
                return this;
            }
        }
        // all containers in one timeline and each header and list has its own timeline
        this.autoplayInTimelineNum = 3 * elements.length - elements.length;
        let order = 1;
        let timeline = new TimelineMax();
        let from = { y: window.innerHeight };
        let to = { ease: Expo.easeOut, y: 0 };
        timeline.delay(0.1).staggerFromTo(elements, 0.5, from, to, 0.1, 0);
        this.clean().addTimeline(timeline, 0, order);
        return this;
    }
    instantPlay() {
        if (!isAnimationsDisabled()) {
            this.stop().play();
        }
        return new Promise(resolve => (this.onComplete = resolve));
    }
    addHeaderElement(el) {
        if (!this.isActive || isAnimationsDisabled()) {
            return this;
        }
        if (!el) {
            // decrement number of expected timelines to auto-play
            this.autoplayInTimelineNum--;
            return this;
        }
        let order = 2;
        let timeline = new TimelineMax();
        timeline.fromTo(el, 0.1, { x: -15, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
        this.addTimeline(timeline, -0.4, order);
        return this;
    }
    addListElement(el) {
        if (!this.isActive || isAnimationsDisabled()) {
            return this;
        }
        if (!el) {
            // decrement number of expected timelines to auto-play
            this.autoplayInTimelineNum--;
            return this;
        }
        let order = 3;
        let timeline = new TimelineMax();
        timeline.fromTo(el, 0.4, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 });
        this.addTimeline(timeline, -0.2, order);
        return this;
    }
}
// dashboardAnimation singleton
export const dashboardAnimation = new DashboardGsapAnimation();
export class HorizontalSlidesAnimation extends Gsap {
    constructor() {
        super(...arguments);
        this.done = false;
    }
    addElements(elements) {
        if (!elements || !elements.length || this.done || isAnimationsDisabled()) {
            return;
        }
        if (this.updateTimeout) {
            clearInterval(this.updateTimeout);
            super.clean();
        }
        let timeline = new TimelineMax();
        let from = { x: window.innerWidth, opacity: 1 };
        let to = { x: 5, ease: Expo.easeOut };
        timeline.delay(0.1).staggerFromTo(Array.from(elements).slice(0, 4), 0.6, from, to, 0.1);
        this.addTimeline(timeline);
        this.updateTimeout = setTimeout(() => {
            this.play();
            this.updateTimeout = null;
            this.done = true;
        }, 100);
    }
}
// export const horizontalSlidesAnimation = new HorizontalSlidesAnimation();
export class LoginFocusAnimation extends Gsap {
    addContainer(el) {
        if (isAnimationsDisabled()) {
            return this;
        }
        let logoEl = el.querySelector('.logo');
        let textEl = el.querySelector('.text');
        if (!el || !logoEl || !textEl) {
            return this;
        }
        let timeline = new TimelineMax();
        timeline.delay(0.1);
        timeline.add('start');
        timeline.to(el, 0.4, { height: 80, ease: Expo.easeOut }, 'start');
        timeline.fromTo(logoEl, 0.4, { opacity: 1, y: 0 }, { opacity: 0, y: -20, ease: Expo.easeOut }, 'start');
        timeline.fromTo(textEl, 0.4, { opacity: 0, y: 20 }, { opacity: 1, ease: Expo.easeOut }, 'start');
        this.addTimeline(timeline);
        return this;
    }
    playFocus() {
        if (!isAnimationsDisabled()) {
            this.play();
        }
        return this;
    }
    playBlur() {
        if (isAnimationsDisabled()) {
            this.reverse();
        }
        return this;
    }
}
export function slideXEnterAnimation(element, duration = 0.5) {
    if (isAnimationsDisabled()) {
        return Promise.resolve();
    }
    return new Promise(resolve => {
        let from = {
            x: window.innerWidth
        };
        let to = {
            x: 0,
            ease: Power3.easeOut,
            onComplete: resolve,
            lazy: true
        };
        TweenLite.fromTo(element, duration, from, to);
    });
}
export function slideXLeaveAnimation(element, duration = 0.4) {
    if (isAnimationsDisabled()) {
        return Promise.resolve();
    }
    return new Promise(resolve => {
        let to = {
            x: window.innerWidth,
            ease: Power1.easeIn,
            onComplete: resolve,
            lazy: true
        };
        TweenLite.to(element, duration, to);
    });
}
export function slideYEnterAnimation(element, duration = 0.5) {
    if (isAnimationsDisabled()) {
        return Promise.resolve();
    }
    return new Promise(resolve => {
        let from = {
            y: window.innerHeight
        };
        let to = {
            y: 0,
            ease: Power3.easeOut,
            onComplete: resolve,
            lazy: true
        };
        TweenLite.fromTo(element, duration, from, to);
    });
}
export function slideYLeaveAnimation(element, duration = 0.4) {
    if (isAnimationsDisabled()) {
        return Promise.resolve();
    }
    return new Promise(resolve => {
        let to = {
            y: window.innerHeight,
            ease: Power1.easeIn,
            onComplete: resolve,
            lazy: true
        };
        TweenLite.to(element, duration, to);
    });
}
function fadeAnimation(element, opacity = 1, duration = 0.3) {
    return new Promise(resolve => {
        let from = {
            opacity: opacity > 0 ? 0 : 1
        };
        let to = {
            opacity: opacity,
            onComplete: resolve,
            lazy: true
        };
        TweenLite.fromTo(element, duration, from, to);
    });
}
export function fadeEnterAnimation(element, duration = 0.3) {
    if (isAnimationsDisabled()) {
        return Promise.resolve();
    }
    return fadeAnimation(element, 1, duration);
}
export function fadeLeaveAnimation(element, duration = 0.3) {
    if (isAnimationsDisabled()) {
        return Promise.resolve();
    }
    return fadeAnimation(element, 0, duration);
}
export function bounceAnimation(element) {
    if (!element || isAnimationsDisabled()) {
        return Promise.resolve();
    }
    return new Promise(resolve => {
        TweenMax.from(element, 1.5, { scale: 0.95, repeat: 0, ease: Elastic.easeOut.config(10, 0.3), onComplete: resolve });
    });
}
export function staggerBounceAnimation(elements) {
    if (!elements || !elements.length || isAnimationsDisabled()) {
        return;
    }
    let timeline = new TimelineMax();
    let bounce = TweenMax.staggerFrom(elements, 1.2, { scale: 0.99, ease: Elastic.easeOut.config(7, 0.2) }, 0.05);
    timeline.add(bounce);
    return timeline;
}

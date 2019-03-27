const h = window.DesignSystem.h;

import { W as isWeb, cM as isFirefox } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

// import { createThemedClasses } from '../../utils/theme';
const SCROLL_DISTANCE_TO_HIDE_TABBAR = 75;
class YooIonScrollComponent {
    constructor() {
        this.height = null;
        //   /** If true, the component will emit scroll events. */
        this.scrollEvents = false;
        //   /** If true, the component will show scrollbar. */
        this.showScrollbar = false;
        //   /** If true, the component will use horizontal scroll instead of vertical. */
        this.horizontalMode = false;
        this.isScrolling = false;
        this.lastScroll = 0;
        this.lastDeltaY = 0;
        // Detail is used in a hot loop in the scroll event, by allocating it here
        // V8 will be able to inline any read/write to it since it's a monomorphic class.
        // https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html
        this.detail = {
            positions: [],
            scrollTop: 0,
            scrollLeft: 0,
            type: 'scroll',
            event: undefined,
            startX: 0,
            startY: 0,
            startTimeStamp: 0,
            currentX: 0,
            currentY: 0,
            velocityX: 0,
            velocityY: 0,
            deltaX: 0,
            deltaY: 0,
            timeStamp: 0,
            data: undefined,
            isScrolling: true
        };
        this.queued = false;
        this.preventDefault = e => e.preventDefault();
    }
    onScroll(ev) {
        const timeStamp = Date.now();
        const didStart = !this.isScrolling;
        this.lastScroll = timeStamp;
        if (didStart) {
            this.onScrollStart();
        }
        if (!this.queued && this.scrollEvents) {
            this.queued = true;
            // tslint:disable-next-line:no-shadowed-variable
            this.queue.read(timeStamp => {
                this.queued = false;
                this.detail.event = ev;
                // tslint:disable-next-line:no-non-null-assertion
                updateScrollDetail(this.detail, this.el, timeStamp, didStart);
                this.ionScroll.emit(this.detail);
                let scrollEnd = this.el.scrollHeight - this.elementHeight - 10;
                if (this.detail && this.detail.currentY >= scrollEnd) {
                    this.hideTabbar.emit(false);
                }
                else {
                    if (this.lastDeltaY <= SCROLL_DISTANCE_TO_HIDE_TABBAR && this.detail.deltaY > SCROLL_DISTANCE_TO_HIDE_TABBAR) {
                        this.hideTabbar.emit(true);
                    }
                    if (this.lastDeltaY >= -SCROLL_DISTANCE_TO_HIDE_TABBAR && this.detail.deltaY < -SCROLL_DISTANCE_TO_HIDE_TABBAR) {
                        this.hideTabbar.emit(false);
                    }
                }
                this.lastDeltaY = this.detail.deltaY;
            });
        }
    }
    onMouseWheel(ev) {
        if (isWeb() && this.isActive && this.el.classList.contains('horizontal') && ev) {
            if (ev.deltaY && ev.deltaY !== 0) {
                this.scrollByPoint(ev.deltaY, 0, 0);
            }
            else if (ev.deltaX && ev.deltaX !== 0) {
                this.scrollByPoint(ev.deltaX, 0, 0);
            }
        }
    }
    onMouseEnter() {
        if (isWeb() && this.el.classList.contains('horizontal')) {
            this.isActive = true;
        }
    }
    onMouseLeave() {
        if (isWeb() && this.el.classList.contains('horizontal')) {
            this.isActive = false;
        }
    }
    async isScrollDistanceBiggerThanScroll(y) {
        return (y + this.el.scrollTop) > (this.el.scrollHeight - this.el.clientHeight);
    }
    /** Scroll to the top of the component */
    scrollToTop(duration) {
        return this.scrollToPoint(0, 0, duration);
    }
    /** Scroll to the bottom of the component */
    scrollToBottom(duration) {
        const y = this.el.scrollHeight - this.el.clientHeight;
        return this.scrollToPoint(0, y, duration);
    }
    /** Scroll by a specified X/Y distance in the component */
    scrollByPoint(x, y, duration, done) {
        return this.scrollToPoint(x + this.el.scrollLeft, y + this.el.scrollTop, duration);
    }
    /** Re-render the scroll component */
    refresh() {
        this.el.forceUpdate();
    }
    /** Scroll to a specified X/Y location in the component */
    async scrollToPoint(x, y, duration = 0) {
        const el = this.el;
        if (duration < 32) {
            if (y !== null) {
                el.scrollTop = y;
            }
            if (x !== null) {
                el.scrollLeft = x;
            }
            return;
        }
        let resolve;
        let startTime = 0;
        const promise = new Promise(r => resolve = r);
        const fromY = el.scrollTop;
        const fromX = el.scrollLeft;
        const deltaY = y !== null ? y - fromY : 0;
        const deltaX = x !== null ? x - fromX : 0;
        // scroll loop
        const step = (timeStamp) => {
            const linearTime = Math.min(1, ((timeStamp - startTime) / duration)) - 1;
            const easedT = Math.pow(linearTime, 3) + 1;
            if (deltaY !== 0) {
                el.scrollTop = Math.floor((easedT * deltaY) + fromY);
            }
            if (deltaX !== 0) {
                el.scrollLeft = Math.floor((easedT * deltaX) + fromX);
            }
            if (easedT < 1) {
                // do not use DomController here
                // must use nativeRaf in order to fire in the next frame
                requestAnimationFrame(step);
            }
            else {
                resolve();
            }
        };
        // chill out for a frame first
        requestAnimationFrame(ts => {
            startTime = ts;
            step(ts);
        });
        return promise;
    }
    componentWillLoad() {
        if (this.forceOverscroll === undefined) {
            this.forceOverscroll = ('ontouchstart' in window);
        }
    }
    componentDidLoad() {
        this.elementHeight = this.el.getBoundingClientRect().height;
        if (this.el && this.el.classList.contains('horizontal') && isWeb()) {
            this.el.addEventListener('mousewheel', this.preventDefault, false);
        }
    }
    componentDidUnload() {
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
        if (this.el && this.el.classList.contains('horizontal') && isWeb()) {
            this.el.removeEventListener('mousewheel', this.preventDefault, false);
        }
    }
    onScrollStart() {
        this.isScrolling = true;
        this.ionScrollStart.emit({
            isScrolling: true
        });
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
        // watchdog
        this.watchDog = setInterval(() => {
            if (this.lastScroll < Date.now() - 120) {
                this.onScrollEnd();
            }
        }, 100);
    }
    onScrollEnd() {
        clearInterval(this.watchDog);
        this.watchDog = null;
        this.isScrolling = false;
        this.ionScrollEnd.emit({
            isScrolling: false
        });
    }
    hostData() {
        return {
            class: {
                overscroll: this.forceOverscroll,
                isFirefox: isFirefox(),
                'no-scrollbar': !this.showScrollbar,
                'horizontal': this.horizontalMode
            }
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "yoo-ion-scroll"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "forceOverscroll": {
            "type": Boolean,
            "attr": "force-overscroll",
            "mutable": true
        },
        "height": {
            "type": String,
            "attr": "height"
        },
        "horizontalMode": {
            "type": Boolean,
            "attr": "horizontal-mode"
        },
        "isScrollDistanceBiggerThanScroll": {
            "method": true
        },
        "queue": {
            "context": "queue"
        },
        "refresh": {
            "method": true
        },
        "scrollByPoint": {
            "method": true
        },
        "scrollEvents": {
            "type": Boolean,
            "attr": "scroll-events"
        },
        "scrollToBottom": {
            "method": true
        },
        "scrollToPoint": {
            "method": true
        },
        "scrollToTop": {
            "method": true
        },
        "showScrollbar": {
            "type": Boolean,
            "attr": "show-scrollbar"
        }
    }; }
    static get events() { return [{
            "name": "ionScrollStart",
            "method": "ionScrollStart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionScroll",
            "method": "ionScroll",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "hideTabbar",
            "method": "hideTabbar",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionScrollEnd",
            "method": "ionScrollEnd",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "scroll",
            "method": "onScroll",
            "passive": true
        }, {
            "name": "window:mousewheel",
            "method": "onMouseWheel",
            "passive": true
        }, {
            "name": "mouseover",
            "method": "onMouseEnter",
            "passive": true
        }, {
            "name": "mouseout",
            "method": "onMouseLeave",
            "passive": true
        }]; }
    static get style() { return ":host {\n  --background-color: transparent;\n  --left-pos: 0;\n  --right-pos: 0;\n  --bottom-pos: 0;\n  --top-pos: 0; }\n\n:host {\n  top: var(--top-pos);\n  right: var(--right-pos);\n  bottom: var(--bottom-pos);\n  left: var(--left-pos);\n  position: absolute;\n  display: block;\n  background-color: var(--background-color);\n  contain: size style layout;\n  z-index: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: scroll-position; }\n\n:host(.isFirefox) {\n  will-change: auto; }\n\n:host(.overscroll)::before,\n:host(.overscroll)::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  content: \"\"; }\n\n:host(.overscroll)::before {\n  bottom: -1px; }\n\n:host(.overscroll)::after {\n  top: -1px; }\n\n:host(.horizontal) {\n  display: -ms-flexbox;\n  display: flex;\n  overflow-x: auto;\n  overflow-y: hidden; }\n\n:host(.vertical-center) {\n  -ms-flex-align: center;\n  align-items: center; }\n\n:host(.no-scrollbar)::-webkit-scrollbar {\n  display: none; }\n\n:host(.relative) {\n  --relative-contain: unset;\n  position: relative;\n  height: 100%;\n  contain: var(--relative-contain); }"; }
}
// ******** DOM READ ****************
function updateScrollDetail(detail, el, timestamp, didStart) {
    const prevX = detail.currentX;
    const prevY = detail.currentY;
    const prevT = detail.timeStamp;
    const currentX = el.scrollLeft;
    const currentY = el.scrollTop;
    if (didStart) {
        // remember the start positions
        detail.startTimeStamp = timestamp;
        detail.startX = currentX;
        detail.startY = currentY;
        detail.velocityX = detail.velocityY = 0;
    }
    detail.timeStamp = timestamp;
    detail.currentX = detail.scrollLeft = currentX;
    detail.currentY = detail.scrollTop = currentY;
    detail.deltaX = currentX - detail.startX;
    detail.deltaY = currentY - detail.startY;
    const timeDelta = timestamp - prevT;
    if (timeDelta > 0 && timeDelta < 100) {
        const velocityX = (currentX - prevX) / timeDelta;
        const velocityY = (currentY - prevY) / timeDelta;
        detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
        detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
    }
}

export { YooIonScrollComponent as YooIonScroll };

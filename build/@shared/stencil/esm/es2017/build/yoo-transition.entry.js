import { h } from '../design-system.core.js';

import { aa as querySelectorAllDeep, a8 as setAnimation, a9 as animations, L as querySelectorDeep } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooTransitionComponent {
    constructor() {
        this.type = 'fade';
    }
    componentWillLoad() {
        this.host.className = this.host.className + ' ' + this.type;
    }
    componentDidLoad() {
        querySelectorAllDeep(this.host, 'div')[3].setAttribute('style', 'display: flex;');
    }
    onMouseEnter() {
        if (this.type === 'scale-up') {
            setAnimation(animations.transitionScale, querySelectorDeep(this.host, '.slot-container'), { open: true });
        }
        else {
            this.animationHandler(10, true, false, 'flex');
        }
    }
    onMouseLeave() {
        if (this.type === 'scale-up') {
            setAnimation(animations.transitionScale, querySelectorDeep(this.host, '.slot-container'), { open: false });
        }
        else {
            this.animationHandler(200, false, true, 'none');
        }
    }
    animationHandler(timeout, openFade, closeBottom, displayString) {
        let halfHeight = querySelectorDeep(this.host, '.container').clientHeight / 2;
        let overlay = querySelectorDeep(this.host, '.overlay');
        let subOverlay = querySelectorDeep(this.host, '.sub-overlay');
        switch (this.type) {
            case 'bottom':
                setAnimation(animations.slideVertical, overlay, { up: true, distance: halfHeight, open: !closeBottom, duration: 200 });
                break;
            case 'fade':
                setAnimation(animations.fade, overlay, { open: openFade, duration: 200, opacityValue: 0.7 });
                break;
            case 'icon':
                setAnimation(animations.fade, overlay, { open: openFade, duration: 200, opacityValue: 1 });
                break;
            case 'image':
                setAnimation(animations.fade, overlay, { open: openFade, duration: 200, opacityValue: 1 });
                break;
            case 'heading':
                setAnimation(animations.slideVertical, overlay, { up: false, distance: halfHeight, open: !closeBottom, duration: 200 });
                if (subOverlay) {
                    setAnimation(animations.slideVertical, subOverlay, { up: true, distance: halfHeight, open: !closeBottom, duration: 200 });
                }
                break;
        }
        setTimeout(() => {
            overlay.setAttribute('style', `display: ${displayString};`);
            if (subOverlay) {
                subOverlay.setAttribute('style', `display: ${displayString};`);
            }
        }, timeout);
    }
    render() {
        return (h("div", { class: "container", onMouseEnter: () => this.onMouseEnter(), onMouseLeave: () => this.onMouseLeave() },
            h("div", { class: "overlay" }, this.image ? h("yoo-img", { src: this.image, alt: "Image" }) : (this.icon ? h("div", null,
                h("yoo-icon", { class: this.icon })) : this.heading)),
            this.subHeading ? h("div", { class: "sub-overlay" }, this.subHeading) : null,
            h("div", { class: "slot-container" },
                h("slot", null))));
    }
    static get is() { return "yoo-transition"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "image": {
            "type": String,
            "attr": "image"
        },
        "subHeading": {
            "type": String,
            "attr": "sub-heading"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return ":host .container {\n  display: inline-block;\n  position: relative;\n  overflow: hidden; }\n  :host .container .overlay {\n    display: none;\n    position: absolute;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    background-color: var(--stable-30, #E6E6E6);\n    color: var(--dark, #2b3648);\n    font-size: var(--font-xl, 36px);\n    opacity: 0.8;\n    z-index: 1000; }\n  :host .container .sub-overlay {\n    display: none;\n    position: absolute;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    background-color: transparent;\n    color: var(--dark, #2b3648);\n    font-size: 2rem;\n    opacity: 1;\n    z-index: 1000; }\n\n:host(.bottom) .container .overlay {\n  top: 50%;\n  left: 0%;\n  width: 100%;\n  height: 50%; }\n\n:host(.fade) .container .overlay {\n  top: 2.5%;\n  left: 2.5%;\n  width: 95%;\n  height: 95%; }\n\n:host(.icon) .container .overlay {\n  top: 0%;\n  left: 0%;\n  width: 100%;\n  height: 100%; }\n\n:host(.icon) .container .overlay {\n  background-color: transparent;\n  font-size: var(--font-xxl, 60px);\n  opacity: 1; }\n\n:host(.image) .container .overlay {\n  top: 0%;\n  left: 0%;\n  width: 100%;\n  height: 100%; }\n\n:host(.image) .container .overlay {\n  background-color: transparent;\n  opacity: 1; }\n\n:host(.heading) .container .overlay {\n  top: 0%;\n  left: 0%;\n  width: 100%;\n  height: 50%;\n  background-color: transparent;\n  opacity: 1; }\n\n:host(.heading) .container .sub-overlay {\n  bottom: 0%;\n  left: 0%;\n  width: 100%;\n  height: 50%; }\n\n:host(.accent) .container .overlay {\n  color: var(--accent, #1FB6FF); }\n\n:host(.accent) .container .sub-overlay {\n  color: var(--accent, #1FB6FF); }\n\n:host(.dark) .container .overlay {\n  color: var(--dark, #2b3648); }\n\n:host(.dark) .container .sub-overlay {\n  color: var(--dark, #2b3648); }\n\n:host(.danger) .container .overlay {\n  color: var(--danger, #ff625f); }\n\n:host(.danger) .container .sub-overlay {\n  color: var(--danger, #ff625f); }\n\n:host(.success) .container .overlay {\n  color: var(--success, #04CC99); }\n\n:host(.success) .container .sub-overlay {\n  color: var(--success, #04CC99); }\n\n:host(.info) .container .overlay {\n  color: var(--info, #fc459e); }\n\n:host(.info) .container .sub-overlay {\n  color: var(--info, #fc459e); }\n\n:host(.warning) .container .overlay {\n  color: var(--warning, #ff6402); }\n\n:host(.warning) .container .sub-overlay {\n  color: var(--warning, #ff6402); }\n\n:host(.light) .container .overlay {\n  color: var(--light, #FFFFFF); }\n\n:host(.light) .container .sub-overlay {\n  color: var(--light, #FFFFFF); }"; }
}

export { YooTransitionComponent as YooTransition };

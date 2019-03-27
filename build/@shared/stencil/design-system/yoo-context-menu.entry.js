const h = window.DesignSystem.h;

import { a6 as debounce, a7 as findParent, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

const ANIMATION_DURATION = 300;
class YooContextMenuComponent {
    constructor() {
        this.contentPosition = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
        this.insideScroll = false;
        this.opened = false;
    }
    onContextMenuOpened() {
        if (this.opened) {
            this.toggle();
        }
    }
    open() {
        this.opened = true;
    }
    close() {
        this.opened = false;
    }
    componentWillLoad() {
        this.setupListeners();
    }
    componentDidUpdate() {
        if (this.insideScroll) {
            this.checkPosition();
        }
    }
    componentDidUnload() {
        this.removeListeners();
    }
    setupListeners() {
        this.toggleWindowListener = debounce(this.toggleWindow, 0).bind(this);
        window.addEventListener('click', this.toggleWindowListener);
        window.addEventListener('touchstart', this.toggleWindowListener);
    }
    removeListeners() {
        window.addEventListener('click', this.toggleWindowListener);
        window.addEventListener('touchstart', this.toggleWindowListener);
    }
    checkPosition() {
        const parentIonScroll = findParent(this.host, 'yoo-ion-scroll');
        if (parentIonScroll && this.dropdownContent && this.dropdownContent.classList.contains('show')) {
            const scrollLeft = parentIonScroll.getBoundingClientRect().left;
            const scrollRight = parentIonScroll.getBoundingClientRect().right;
            const contentLeft = this.dropdownContent.getBoundingClientRect().left;
            const contentright = this.dropdownContent.getBoundingClientRect().right;
            if (contentLeft < scrollLeft) {
                this.dropdownContent.style.left = '0px';
            }
            if (contentright > scrollRight) {
                this.dropdownContent.style.right = '0px';
            }
        }
    }
    toggle() {
        if (!this.opened) {
            this.contextMenuOpened.emit(true);
            setTimeout(() => {
                this.open();
            }, 50);
        }
        else {
            this.close();
            this.contextMenuClosed.emit(true);
        }
    }
    toggleWindow() {
        if (this.opened) {
            this.close();
            setTimeout(() => {
                this.contextMenuClosed.emit(true);
            }, ANIMATION_DURATION);
        }
    }
    onItemClick(item) {
        if (item && item.handler) {
            item.handler();
        }
        this.toggle();
    }
    render() {
        return [
            h("span", { "aria-haspopup": "true", "aria-expanded": "false", onClick: () => this.toggle() },
                h("slot", null)),
            h("div", { class: `${this.opened ? 'show' : ''} dropdown-content`, ref: (el) => this.dropdownContent = el, style: {
                    'top': this.contentPosition.top,
                    'right': this.contentPosition.right,
                    'bottom': this.contentPosition.bottom,
                    'left': this.contentPosition.left
                } }, this.contentButtons && this.contentButtons.length > 0 &&
                this.contentButtons.map((item) => {
                    const contentClass = item.cssClass ? item.cssClass : 'black';
                    return h("div", { class: { 'content': true, [contentClass]: true }, onClick: () => this.onItemClick(item) },
                        h("span", { class: "content-detail" },
                            h("yoo-icon", { class: item.icon }),
                            translate(item.text)));
                }))
        ];
    }
    static get is() { return "yoo-context-menu"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "close": {
            "method": true
        },
        "contentButtons": {
            "type": "Any",
            "attr": "content-buttons"
        },
        "contentPosition": {
            "type": "Any",
            "attr": "content-position"
        },
        "host": {
            "elementRef": true
        },
        "insideScroll": {
            "type": Boolean,
            "attr": "inside-scroll"
        },
        "open": {
            "method": true
        },
        "opened": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "contextMenuOpened",
            "method": "contextMenuOpened",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "contextMenuClosed",
            "method": "contextMenuClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:contextMenuOpened",
            "method": "onContextMenuOpened"
        }]; }
    static get style() { return ":host {\n  --width-dropdown-content: 9.375rem; }\n\n:host {\n  display: block; }\n\n:host([hidden]) {\n  display: none; }\n\n:host .dropdown-toggle ::slotted(*) {\n  cursor: pointer; }\n\n:host .dropdown-content {\n  top: auto;\n  right: auto;\n  bottom: auto;\n  left: auto;\n  position: absolute;\n  width: var(--width-dropdown-content);\n  max-width: var(--width-dropdown-content);\n  -webkit-transform: translateY(-2em);\n  transform: translateY(-2em);\n  -webkit-transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;\n  transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;\n  border-radius: 4px;\n  background: var(--light, #FFFFFF);\n  font-size: var(--font-s, 13px);\n  -webkit-box-shadow: 0 5px 13px 0 rgba(40, 47, 54, 0.08);\n  box-shadow: 0 5px 13px 0 rgba(40, 47, 54, 0.08);\n  /* hides sub-menu */\n  opacity: 0;\n  visibility: hidden;\n  z-index: 1; }\n  :host .dropdown-content .content {\n    padding: var(--padding-5, 0.3125rem) var(--padding-10, 0.625rem); }\n    :host .dropdown-content .content:first-child {\n      padding-top: var(--padding-10, 0.625rem); }\n    :host .dropdown-content .content:last-child {\n      padding-bottom: var(--padding-10, 0.625rem); }\n    :host .dropdown-content .content:hover {\n      background: var(--success-light, rgba(46, 219, 183, 0.1)); }\n    :host .dropdown-content .content .content-detail yoo-icon {\n      padding-right: var(--padding-5, 0.3125rem); }\n\n:host .dropdown-content.show {\n  -webkit-transform: translateY(0%);\n  transform: translateY(0%);\n  -webkit-transition-delay: 0s, 0s, 0.3s;\n  transition-delay: 0s, 0s, 0.3s;\n  /* shows sub-menu */\n  opacity: 1;\n  visibility: visible;\n  z-index: 10000;\n  /* this removes the transition delay so the menu will be visible while the other styles transition */ }\n\n:host(.flex-column) .dropdown-content {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: start;\n  align-items: flex-start; }\n\n:host(.tab-vertical) .dropdown-content {\n  -webkit-transform: translateY(-100%) translateX(5.5rem);\n  transform: translateY(-100%) translateX(5.5rem); }\n\n:host(.tab-vertical) .tab-title-other .yo-right {\n  padding-left: 0.2rem; }\n\n:host(.tab-vertical) .tab-title-other:hover {\n  border-bottom-width: 0rem; }\n\n:host(.tab) {\n  display: inline-block; }\n  :host(.tab) .tab-title-other {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host(.tab) .tab-title-other .yo-arrow-dropdown {\n      padding-left: 0.2rem; }\n    :host(.tab) .tab-title-other:hover {\n      color: var(--success, #04CC99); }"; }
}

export { YooContextMenuComponent as YooContextMenu };

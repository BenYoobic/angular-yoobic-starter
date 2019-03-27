const h = window.DesignSystem.h;

import { W as isWeb, cp as lifecycleEvents, cq as present, a8 as setAnimation, L as querySelectorDeep, cr as dismiss, cs as eventMethod, m as translate, ct as createThemedClasses, a5 as getAppContext, k as isCordova, cu as removeLastOverlay, cv as createOverlay, cw as dismissOverlay, cx as getTopOverlay } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

const LIFECYCLE_MAP = {
    'ionActionSheetDidPresent': 'ionViewDidEnter',
    'ionActionSheetWillPresent': 'ionViewWillEnter',
    'ionActionSheetWillDismiss': 'ionViewWillDismiss',
    'ionActionSheetDidDismiss': 'ionViewDidDismiss'
};
const DEFAULT_ANIMATION = isWeb() ? 'fade' : 'slide_down';
class YooActionSheetComponent {
    constructor() {
        this.buttons = [];
        this.overlayId = 0;
        this.actionClickDivs = [];
        this.preventDefault = e => e.preventDefault();
    }
    lifecycle(modalEvent) {
        lifecycleEvents(modalEvent, this.usersElement, LIFECYCLE_MAP);
    }
    async present() {
        return present(this, 'actionSheetEnter', () => {
            setAnimation('background_fade', querySelectorDeep(this.host, 'div.overlay'), { open: true, targetOpacity: 0.7 });
            return setAnimation(DEFAULT_ANIMATION, querySelectorDeep(this.host, 'div.outer-container'), { open: true }).finished;
        });
    }
    async dismiss(data, role, overlayDismiss = false) {
        return dismiss(this, data, role, overlayDismiss, 'actionSheetLeave', () => setAnimation(DEFAULT_ANIMATION, querySelectorDeep(this.host, 'div.outer-container'), { open: false, up: false }).finished);
    }
    async onDidDismiss(callback) {
        return eventMethod(this.host, 'ionActionSheetDidDismiss', callback);
    }
    async onWillDismiss(callback) {
        return eventMethod(this.host, 'ionActionSheetWillDismiss', callback);
    }
    async onActionSelected(callback) {
        return eventMethod(this.host, 'actionSelected', callback);
    }
    componentDidLoad() {
        this.getProperHeight();
        if (this.topContainer) {
            const disableContentScroll = (this.innerDiv.scrollHeight - 10) < this.topContainer.clientHeight;
            if (disableContentScroll) {
                this.outerDiv.addEventListener('touchmove', this.preventDefault, false);
            }
        }
        this.overlay.addEventListener('touchmove', this.preventDefault, false);
    }
    componentDidUnload() {
        if (this.outerDiv) {
            this.outerDiv.removeEventListener('touchmove', this.preventDefault, false);
        }
        if (this.overlay) {
            this.overlay.removeEventListener('touchmove', this.preventDefault, false);
        }
    }
    closeActionSheet(overlayDismiss = false, isCancel = false) {
        this.dismiss(undefined, isCancel ? 'cancel' : undefined, overlayDismiss);
        this.actionSheetClosed.emit(true);
    }
    onButtonClick(button) {
        if (!button.disabled) {
            this.actionSelected.emit(button);
            this.closeActionSheet();
            if (button.handler) {
                button.handler();
            }
        }
    }
    onItemTouchStart(targetDiv) {
        targetDiv.classList.add('tapped');
    }
    onItemTouchEnd(targetDiv) {
        if (targetDiv && targetDiv.classList) {
            targetDiv.classList.remove('tapped');
        }
    }
    getProperHeight() {
        let maxHeight = window.innerHeight;
        return { 'max-height': Math.round(0.8 * maxHeight) + 'px' };
    }
    renderLiButton(buttons, button, index) {
        let lastIndex = index === buttons.length - 1;
        let firstIndex = index === 0;
        return h("li", { class: {
                'action-click inner-container ': true,
                'icon ': button.icon,
                'description ': button.description,
                'first-icon-description ': firstIndex && (button.icon || button.description),
                'last ': lastIndex && !(button.icon || button.description)
            }, onClick: () => this.onButtonClick(button), ref: el => (this.actionClickDivs[index] = el), onTouchStart: () => {
                this.onItemTouchStart(this.actionClickDivs[index]);
            }, onTouchEnd: () => {
                this.onItemTouchEnd(this.actionClickDivs[index]);
            } },
            button.icon ? h("div", { class: "icon-container" },
                h("yoo-icon", { class: button.icon })) : null,
            h("div", { class: 'text-container' + (index === buttons.length - 1 ? ' last' : '') + (button.icon || button.description ? ' icon-description' : '') },
                h("p", { innerHTML: button.text }),
                button.description && h("div", { class: "description-container" }, button.description),
                !lastIndex && h("div", { class: "divider" })),
            isWeb() && h("div", { class: "selection-overlay" }));
    }
    renderBottomContainer() {
        return (h("div", { class: "bottom-container" },
            h("div", { class: "cancel-container", onClick: () => this.closeActionSheet(false, true), ref: el => this.cancelDiv = el, onTouchStart: () => { this.onItemTouchStart(this.cancelDiv); }, onTouchEnd: () => { this.onItemTouchEnd(this.cancelDiv); } }, translate('CANCEL'))));
    }
    renderCardHeader() {
        return (h("div", { class: { 'card-header': true, [this.cardHeader.cssClass || '']: true } },
            this.cardHeader.title &&
                h("div", { class: 'title' }, translate(this.cardHeader.title)),
            this.cardHeader.img &&
                h("img", { src: this.cardHeader.img })));
    }
    renderHeader() {
        return (this.heading || isWeb() ?
            h("div", { class: "heading-container" },
                isWeb() && h("yoo-icon", { class: "yo-close", onClick: () => this.closeActionSheet(false, true) }),
                h("span", null, this.heading ? translate(this.heading) : translate('ADDANACTIVITY')),
                isWeb() && h("div", { class: "spacer" })) : null);
    }
    renderFooter() {
        return (h("div", { class: "footer" },
            this.footer.text && h("div", { class: "text" }, translate(this.footer.text)),
            this.footer.actionableText && h("div", { class: "actionable-text", onClick: () => this.footer.actionableText.handler() }, translate(this.footer.actionableText.text))));
    }
    renderTopContainer() {
        const buttons = this.buttons.filter(b => !b.isVisible || b.isVisible());
        return (h("div", { class: 'top-container' + (buttons[0] && (buttons[0].description || buttons[0].icon ? ' solid' : '')), ref: el => this.topContainer = el },
            h("div", { style: this.getProperHeight() },
                h("ul", { class: "inner", ref: el => this.innerDiv = el },
                    this.renderHeader(),
                    this.cardHeader && isWeb() && this.renderCardHeader(),
                    buttons.map((button, index) => {
                        return this.renderLiButton(buttons, button, index);
                    }),
                    this.footer && isWeb() && this.renderFooter()))));
    }
    hostData() {
        return {
            class: Object.assign({}, createThemedClasses(null, (this.cssClass ? this.cssClass : '')), getAppContext(), { 'mobile-emulate': !isWeb() && !isCordova() })
        };
    }
    render() {
        return (h("div", { class: "full-page-container", ref: el => this.outerDiv = el },
            h("div", { ref: el => this.overlay = el, class: "overlay", onClick: () => this.closeActionSheet(true), style: { 'z-index': (20000 + this.overlayId).toString() } }),
            h("div", { class: "outer-container", style: { 'z-index': (20001 + this.overlayId).toString() } },
                this.renderTopContainer(),
                !isWeb() && this.renderBottomContainer())));
    }
    static get is() { return "yoo-action-sheet"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "buttons": {
            "type": "Any",
            "attr": "buttons"
        },
        "cardHeader": {
            "type": "Any",
            "attr": "card-header"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "footer": {
            "type": "Any",
            "attr": "footer"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "onActionSelected": {
            "method": true
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayId": {
            "type": Number,
            "attr": "overlay-id"
        },
        "present": {
            "method": true
        },
        "willAnimate": {
            "type": Boolean,
            "attr": "will-animate"
        }
    }; }
    static get events() { return [{
            "name": "ionActionSheetDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetDidDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetWillDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionSelected",
            "method": "actionSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionSheetClosed",
            "method": "actionSheetClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionActionSheetDidPresent",
            "method": "lifecycle"
        }, {
            "name": "ionActionSheetWillPresent",
            "method": "lifecycle"
        }, {
            "name": "ionActionSheetWillDismiss",
            "method": "lifecycle"
        }, {
            "name": "ionActionSheetDidDismiss",
            "method": "lifecycle"
        }]; }
    static get style() { return ":host {\n  width: 100%;\n  font-size: var(--font-s, 13px); }\n  :host .outer-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: fixed;\n    right: var(--padding-10, 0.625rem);\n    bottom: var(--padding-10, 0.625rem);\n    left: var(--padding-10, 0.625rem);\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: auto; }\n  :host .top-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 100%;\n    padding-bottom: 0;\n    border-radius: 0.8125rem;\n    background-color: var(--stable-light, #f1f1f1);\n    overflow-y: scroll !important;\n    -webkit-overflow-scrolling: touch !important; }\n    :host .top-container.solid {\n      background-color: var(--light, #FFFFFF); }\n      :host .top-container.solid .inner-container {\n        text-align: left; }\n    :host .top-container .height-block {\n      max-height: 28rem; }\n    :host .top-container .inner {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1;\n      flex: 1;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      margin: 0;\n      padding: 0;\n      -webkit-transition: background-color .3s ease;\n      transition: background-color .3s ease;\n      line-height: 1.65rem;\n      overflow: auto; }\n      :host .top-container .inner .action-click.tapped {\n        -webkit-transition: background-color .3s ease;\n        transition: background-color .3s ease;\n        background-color: var(--stable-light, #f1f1f1); }\n    :host .top-container .heading-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      padding: 0.25rem 1rem;\n      height: 2.875rem;\n      border-bottom: 1px solid var(--stable-30, #E6E6E6);\n      color: var(--success, #04CC99);\n      font-size: var(--font-m, 15px);\n      font-weight: 400; }\n    :host .top-container .inner-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      padding: 0.25rem 1rem;\n      padding: 1rem;\n      border-bottom: 1px solid var(--backdrop, rgba(4, 4, 15, 0.4));\n      color: var(--dark, #2b3648);\n      font-size: var(--font-l, 17px);\n      font-weight: 400;\n      text-align: center; }\n      :host .top-container .inner-container.icon {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-pack: start;\n        justify-content: flex-start;\n        border: none; }\n      :host .top-container .inner-container.description {\n        -ms-flex-align: start;\n        align-items: flex-start;\n        padding: 0.35rem 1rem !important;\n        border: none; }\n      :host .top-container .inner-container.first-icon-description {\n        padding-top: 0.75rem !important; }\n      :host .top-container .inner-container.last {\n        padding: 0.85rem;\n        border: none;\n        border-radius: .8125rem; }\n      :host .top-container .inner-container.success {\n        color: var(--success, #04CC99); }\n      :host .top-container .inner-container.danger {\n        color: var(--danger, #ff625f); }\n      :host .top-container .inner-container .icon-container {\n        width: 2rem;\n        padding-top: 0.25rem;\n        color: var(--success, #04CC99);\n        font-size: var(--font-l, 17px); }\n      :host .top-container .inner-container .text-container p {\n        margin: 0;\n        font-size: var(--font-l, 17px); }\n      :host .top-container .inner-container .text-container.icon-description {\n        -ms-flex: 1;\n        flex: 1; }\n      :host .top-container .inner-container .text-container.last {\n        border: none; }\n      :host .top-container .inner-container .text-container .description-container {\n        padding-bottom: 0.5rem;\n        color: var(--text-color, #807f83);\n        font-size: var(--font-s, 13px);\n        font-weight: 400;\n        line-height: 1.2rem; }\n      :host .top-container .inner-container .text-container .divider {\n        border-bottom: 1px solid var(--stable-light, #f1f1f1); }\n  :host .bottom-container {\n    width: 100%;\n    padding-top: 0.5rem;\n    background-color: transparent; }\n    :host .bottom-container .cancel-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      padding: 0.25rem 1rem;\n      padding: 0.85rem;\n      border-radius: 0.8125rem;\n      background-color: var(--light, #FFFFFF);\n      color: var(--black, #000000);\n      font-size: var(--font-l, 17px);\n      font-weight: 500; }\n      :host .bottom-container .cancel-container.tapped {\n        -webkit-transition: background-color .3s ease;\n        transition: background-color .3s ease;\n        background-color: var(--stable-light, #f1f1f1); }\n  :host .overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: var(--always-black, #000000);\n    opacity: var(--overlay-opacity, 0.4);\n    z-index: 19999; }\n\n:host(.boost) .outer-container .top-container .heading-container {\n  color: var(--danger-light, #F46885); }\n\n:host(.boost) .outer-container .top-container .inner-container .icon-container {\n  color: var(--danger-light, #F46885); }\n\n:host(.iphone-x) .column {\n  margin-bottom: var(--padding-20, 1.25rem); }\n\n:host(.iphone-x) .bottom-container {\n  margin-bottom: 25px; }\n\n:host(.mobile-emulate) .outer-container {\n  position: absolute; }\n\n:host(.web) .full-page-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n:host(.web) .height-block {\n  max-height: unset; }\n\n:host(.web) .outer-container {\n  position: relative;\n  top: 4.25rem;\n  width: 44% !important;\n  min-width: 432px; }\n  :host(.web) .outer-container .top-container {\n    max-height: unset;\n    border-radius: 0.375rem;\n    overflow-y: auto !important; }\n    :host(.web) .outer-container .top-container .inner {\n      -ms-flex-align: center;\n      align-items: center; }\n      :host(.web) .outer-container .top-container .inner .heading-container {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: justify;\n        justify-content: space-between;\n        width: calc(100% - 2rem);\n        color: var(--black, #000000);\n        font-size: var(--font-l, 17px); }\n        :host(.web) .outer-container .top-container .inner .heading-container yoo-icon {\n          color: var(--text-color, #807f83);\n          font-size: var(--font-ll, 20px); }\n      :host(.web) .outer-container .top-container .inner .card-header {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: justify;\n        justify-content: space-between;\n        width: 100%;\n        height: 290px;\n        margin-bottom: 2.1875rem;\n        overflow: hidden; }\n        :host(.web) .outer-container .top-container .inner .card-header.success {\n          background-color: var(--success, #04CC99);\n          color: var(--always-light, #FFFFFF); }\n        :host(.web) .outer-container .top-container .inner .card-header .title {\n          padding-top: 1.875rem;\n          padding-bottom: 1.875rem;\n          font-size: var(--font-l, 17px);\n          font-weight: 400; }\n      :host(.web) .outer-container .top-container .inner .footer {\n        display: -ms-flexbox;\n        display: flex;\n        padding: 6.25rem 0 var(--padding-20, 1.25rem); }\n        :host(.web) .outer-container .top-container .inner .footer .text {\n          color: var(--black, #000000); }\n        :host(.web) .outer-container .top-container .inner .footer .actionable-text {\n          padding-left: var(--padding-5, 0.3125rem);\n          color: var(--success, #04CC99);\n          text-decoration: underline; }\n      :host(.web) .outer-container .top-container .inner .action-click {\n        position: relative;\n        width: 400px; }\n        :host(.web) .outer-container .top-container .inner .action-click .text-container span {\n          color: var(--black, #000000); }\n        :host(.web) .outer-container .top-container .inner .action-click .selection-overlay {\n          top: -0.375rem;\n          right: 0;\n          bottom: 0.375rem;\n          left: 0;\n          position: absolute;\n          -webkit-transition: 0.2s;\n          transition: 0.2s;\n          border-radius: var(--padding-5, 0.3125rem);\n          background: var(--success, #04CC99);\n          opacity: 0;\n          z-index: 2; }\n        :host(.web) .outer-container .top-container .inner .action-click:hover .selection-overlay {\n          opacity: 0.1; }"; }
}

class YooIonActionSheetControllerComponent {
    constructor() {
        this.actionSheets = new Map();
    }
    actionSheetWillPresent(ev) {
        this.actionSheets.set(ev.target.overlayId, ev.target);
    }
    actionSheetWillDismiss(ev) {
        this.actionSheets.delete(ev.target.overlayId);
    }
    escapeKeyUp(event) {
        if (event && event.key === 'escape') {
            removeLastOverlay(this.actionSheets);
        }
    }
    /**
     * Create an action sheet overlay with action sheet options.
     */
    async create(opts) {
        return createOverlay(this.doc.createElement('yoo-action-sheet'), opts);
    }
    /**
     * Dismiss the open action sheet overlay.
     */
    async dismiss(data, role, actionSheetId = -1) {
        return dismissOverlay(data, role, this.actionSheets, actionSheetId, 'YOO-ACTION-SHEET');
    }
    /**
     * Get the most recently opened action sheet overlay.
     */
    async getTop() {
        return getTopOverlay(this.actionSheets);
    }
    static get is() { return "yoo-ion-action-sheet-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
    static get listeners() { return [{
            "name": "body:ionModalWillPresent",
            "method": "actionSheetWillPresent"
        }, {
            "name": "body:ionActionSheetWillDismiss",
            "method": "actionSheetWillDismiss"
        }, {
            "name": "body:ionActionSheetDidUnload",
            "method": "actionSheetWillDismiss"
        }, {
            "name": "body:keyup",
            "method": "escapeKeyUp"
        }]; }
}

export { YooActionSheetComponent as YooActionSheet, YooIonActionSheetControllerComponent as YooIonActionSheetController };

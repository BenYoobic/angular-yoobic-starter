import { setAnimation, translate, querySelectorDeep, lifecycleEvents, isWeb, getAppContext, present, dismiss, eventMethod, createThemedClasses, isCordova } from '../../../index';
const LIFECYCLE_MAP = {
    'ionActionSheetDidPresent': 'ionViewDidEnter',
    'ionActionSheetWillPresent': 'ionViewWillEnter',
    'ionActionSheetWillDismiss': 'ionViewWillDismiss',
    'ionActionSheetDidDismiss': 'ionViewDidDismiss'
};
const DEFAULT_ANIMATION = isWeb() ? 'fade' : 'slide_down';
export class YooActionSheetComponent {
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
    static get style() { return "/**style-placeholder:yoo-action-sheet:**/"; }
}

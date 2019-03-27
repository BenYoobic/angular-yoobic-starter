import { h } from '../design-system.core.js';

import { cD as isAnimationsDisabled, L as querySelectorDeep, cE as slideXEnterAnimation, cF as slideXLeaveAnimation, cG as fadeEnterAnimation, cH as fadeLeaveAnimation, a8 as setAnimation, cI as BACKDROP, cp as lifecycleEvents, cJ as attachComponent, W as isWeb, cq as present, cr as dismiss, cK as detachComponent, cs as eventMethod, a6 as debounce, aa as querySelectorAllDeep, aj as isArray, ct as createThemedClasses, cL as getClassMap, ad as isIonic, bb as isSafari, a3 as isOffline, be as isIphoneX, cu as removeLastOverlay, cv as createOverlay, cw as dismissOverlay, cx as getTopOverlay } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

const DEFAULT_ANIMATIONS = {
    ENTER: 'slideXEnterAnimation',
    LEAVE: 'slideXLeaveAnimation'
};
function modalAnimationFactory(animationName, host, preview = false) {
    if (isAnimationsDisabled()) {
        return Promise.resolve();
    }
    const element = preview ? host : querySelectorDeep(host, 'div.modal-wrapper');
    switch (animationName) {
        case 'slideXEnterAnimation':
            return slideXEnterAnimation(element);
        case 'slideXLeaveAnimation':
            return slideXLeaveAnimation(element);
        case 'slideYEnterAnimation':
            return slideYEnterAnimation(host, element); // keep animejs for now -> better performance
        case 'slideYLeaveAnimation':
            return slideYLeaveAnimation(host, element); // keep animejs for now -> better performance
        case 'fadeEnterAnimation':
            return fadeEnterAnimation(element);
        case 'fadeLeaveAnimation':
            return fadeLeaveAnimation(element);
    }
}
const ENTER_Y_ANIMATION_DURATION = 400;
// const ENTER_X_ANIMATION_DURATION: number = 400;
// const ENTER_FADE_ANIMATION_DURATION: number = 400;
const LEAVE_ANIMATION_DURATION = 400;
const ENTER_ANIMATION_EASE = [0.3, 0.8, 0.3, 1.0]; // http://cubic-bezier.com/#.3,.8,.3,1.0
const LEAVE_ANIMATION_EASE = [0.4, 0.0, 0.7, 0.2]; // http://cubic-bezier.com/#.4,0,.7,.2
function slideYEnterAnimation(host, element) {
    return setAnimation('slide_vertical', element, {
        open: true,
        up: true,
        distance: 900,
        duration: ENTER_Y_ANIMATION_DURATION,
        easing: ENTER_ANIMATION_EASE
    }).finished;
}
function slideYLeaveAnimation(host, element) {
    return setAnimation('slide_vertical', element, {
        open: false,
        up: true,
        distance: 900,
        duration: LEAVE_ANIMATION_DURATION,
        easing: LEAVE_ANIMATION_EASE
    }).finished;
}

const LIFECYCLE_MAP = {
    'ionModalDidPresent': 'ionViewDidEnter',
    'ionModalWillPresent': 'ionViewWillEnter',
    'ionModalWillDismiss': 'ionViewWillDismiss',
    'ionModalDidDismiss': 'ionViewDidDismiss'
};
const WEB_MENU_WIDTH = 1070;
const ACTIVE_INDICATOR_HALF_WIDTH = 12.5;
const PREVIEW_DIALOG_HALF_WDITH = 187.5;
class YooIonModalComponent {
    constructor() {
        this.keyboardClose = true;
        /**
         * If true, the modal will be dismissed when the backdrop is clicked. Defaults to `true`.
         */
        this.enableBackdropDismiss = true;
        /**
         * If true, a backdrop will be displayed behind the modal. Defaults to `true`.
         */
        this.showBackdrop = true;
        /**
         * If true, the modal will animate. Defaults to `true`.
         */
        this.willAnimate = true;
        this.displayFullscreenButton = true;
        this.fullscreen = false;
        this.presented = false;
        this.hasPresented = false;
    }
    onDismiss(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    }
    onBackdropTap() {
        this.dismiss(null, BACKDROP);
    }
    lifecycle(modalEvent) {
        lifecycleEvents(modalEvent, this.usersElement, LIFECYCLE_MAP);
    }
    onDidPresent() {
        this.hasPresented = true;
    }
    onInputFocused() {
        if (this.componentProps && this.componentProps.half && !this.fullscreen) {
            this.fullscreen = true;
            this.setFullscreen();
        }
    }
    onSwipeDown() {
        if (this.fullscreen) {
            this.fullscreen = false;
            this.setFullscreen();
        }
    }
    /**
     * Present the modal overlay after it has been created.
     */
    async present() {
        if (this.presented) {
            return;
        }
        if (!this.dialogElement) {
            throw new Error('container is undefined');
        }
        const componentProps = Object.assign({}, this.componentProps, { modal: this.host });
        this.usersElement = await attachComponent(this.delegate, this.dialogElement, this.component, ['ion-page'], componentProps);
        //we need to keep a ref to the angular instance of the component
        if (this.usersElement.componentInstance) {
            this.componentInstance = this.usersElement.componentInstance;
        }
        const fullscreenButton = querySelectorDeep(this.host, '.fullscreen-container');
        if (this.componentProps && this.componentProps.half) {
            this.usersElement.classList.add('half');
            if (fullscreenButton) {
                fullscreenButton.classList.add('show');
                fullscreenButton.classList.remove('hide');
            }
            this.setToolbarProps(this.componentProps.half);
        }
        let enterAnimation = this.enterAnimation ? this.enterAnimation : DEFAULT_ANIMATIONS.ENTER;
        if (!this.forceCustomAnimationOnWeb && isWeb()) {
            enterAnimation = 'fadeEnterAnimation';
        }
        const overlay = querySelectorDeep(this.host, '.overlay');
        if (this.showBackdrop && overlay) {
            overlay.classList.add('show');
            overlay.classList.remove('hide');
        }
        if (this.host.classList.contains('preview') && this.dialogElement) {
            this.webMenuIconPosition = this.componentProps.position - this.claculatePageMenuOffset(window.innerWidth, WEB_MENU_WIDTH);
            let leftDialogPosition = this.checkPreviewModalIsVisible(this.componentProps.position);
            this.usersElement.classList.add('preview');
            this.dialogElement.setAttribute('style', `left: ${leftDialogPosition}px; z-index: ${20000 + this.overlayId}`);
        }
        return present(this, 'modalEnter', () => modalAnimationFactory(enterAnimation, this.host, this.host.classList.contains('preview')));
    }
    /**
     * Dismiss the modal overlay after it has been presented.
     */
    async dismiss(data, role, overlayDismiss = false) {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
        }
        let leaveAnimation = this.leaveAnimation ? this.leaveAnimation : DEFAULT_ANIMATIONS.LEAVE;
        if (!this.forceCustomAnimationOnWeb && isWeb()) {
            leaveAnimation = 'fadeLeaveAnimation';
        }
        const overlay = querySelectorDeep(this.host, '.overlay');
        if (this.showBackdrop && overlay) {
            overlay.classList.remove('show');
            overlay.classList.add('hide');
        }
        const fullscreenButton = querySelectorDeep(this.host, '.fullscreen-container');
        if (this.componentProps && this.componentProps.half && fullscreenButton) {
            fullscreenButton.classList.remove('show');
            fullscreenButton.classList.add('hide');
        }
        await dismiss(this, data, role, overlayDismiss, 'modalLeave', () => modalAnimationFactory(leaveAnimation, this.host, this.host.classList.contains('preview')));
        await detachComponent(this.delegate, this.usersElement);
    }
    /**
     * Returns a promise that resolves when the modal did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     */
    onDidDismiss(callback) {
        return eventMethod(this.host, 'ionModalDidDismiss', callback);
    }
    /**
     * Returns a promise that resolves when the modal will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     */
    onWillDismiss(callback) {
        return eventMethod(this.host, 'ionModalWillDismiss', callback);
    }
    componentDidLoad() {
        this.ionModalDidLoad.emit();
        if (this.host.classList.contains('preview') && isWeb()) {
            this.resizeListener = debounce(this.setPreviewModalPosition, 500).bind(this);
            window.addEventListener('resize', this.resizeListener);
        }
    }
    componentDidUnload() {
        this.ionModalDidUnload.emit();
        if (this.host.classList.contains('preview') && isWeb() && this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
        }
    }
    onFullscreen() {
        this.fullscreen = !this.fullscreen;
        this.setFullscreen();
    }
    setFullscreen() {
        if (this.usersElement) {
            let height = this.fullscreen ? '100%' : '19rem';
            this.usersElement.setAttribute('style', `height: ${height};`);
            this.fullscreen && !this.usersElement.classList.contains('fullscreen') ? this.usersElement.classList.add('fullscreen') : this.usersElement.classList.remove('fullscreen');
            this.overlayDismiss.setAttribute('style', `z-index: ${this.fullscreen ? 0 : (20000 + this.overlayId).toString()};`);
        }
        this.setToolbarProps(!this.fullscreen);
    }
    setToolbarProps(halfScreen) {
        let dialogElement = querySelectorDeep(this.host, 'yoo-form-autocomplete-dialog');
        if (!dialogElement) {
            // for all others dialogs use this.host
            dialogElement = this.host;
        }
        if (dialogElement) {
            const toolbar = querySelectorDeep(dialogElement, 'yoo-ion-toolbar');
            const title = querySelectorDeep(dialogElement, 'yoo-ion-title');
            const buttons = querySelectorAllDeep(dialogElement, 'yoo-ion-buttons');
            if (toolbar) {
                toolbar.halfScreen = halfScreen;
            }
            if (title) {
                title.halfScreen = halfScreen;
            }
            if (buttons && isArray(buttons)) {
                buttons.forEach(button => {
                    button.halfScreen = halfScreen;
                });
            }
        }
    }
    setPreviewModalPosition() {
        if (this.dialogElement && this.activeIndicator) {
            let centerIconPosition = this.webMenuIconPosition + this.claculatePageMenuOffset(window.innerWidth, WEB_MENU_WIDTH);
            let leftActiveIndicatorPosition = centerIconPosition - ACTIVE_INDICATOR_HALF_WIDTH;
            let leftDialogPosition = this.checkPreviewModalIsVisible(centerIconPosition);
            this.dialogElement.setAttribute('style', `left: ${leftDialogPosition}px; z-index: ${20000 + this.overlayId}`);
            this.activeIndicator.setAttribute('style', `left: ${leftActiveIndicatorPosition}px; z-index: ${20000 + this.overlayId}`);
        }
    }
    checkPreviewModalIsVisible(centerIconPosition) {
        const PADDING = 15;
        let leftDialogPosition = centerIconPosition - PREVIEW_DIALOG_HALF_WDITH;
        if (centerIconPosition + PREVIEW_DIALOG_HALF_WDITH > (window.innerWidth - PADDING)) {
            leftDialogPosition = window.innerWidth - (PREVIEW_DIALOG_HALF_WDITH * 2) - PADDING;
        }
        return leftDialogPosition;
    }
    claculatePageMenuOffset(pageWidth, webMenuWidth) {
        let offset = (pageWidth - webMenuWidth) / 2;
        return offset;
    }
    onOverlayDismissClick(event) {
        if (!this.fullscreen && this.hasPresented) {
            this.dismiss(undefined, undefined, true);
        }
    }
    closeModal() {
        return this.dismiss();
    }
    onTouchStartDismiss(event) {
        event.stopPropagation();
    }
    onTouchMoveDismiss(event) {
        event.stopPropagation();
        event.preventDefault();
    }
    renderFullscreenButton() {
        return h("div", { class: "fullscreen-container hide", style: { 'z-index': (20000 + this.overlayId).toString() } },
            h("yoo-button", { class: "icon-only black fullscreen-button", icon: this.fullscreen ? 'yo-minimize' : 'yo-maximize', onClick: () => this.onFullscreen() }));
    }
    renderDismissOverlay() {
        return (h("div", { class: "overlay-dismiss", ref: el => this.overlayDismiss = el, onClick: (event) => this.onOverlayDismissClick(event), onTouchStart: (event) => this.onTouchStartDismiss(event), onTouchMove: (event) => this.onTouchMoveDismiss(event), style: { 'z-index': (20000 + this.overlayId).toString() } }));
    }
    renderPreviewModal() {
        return ([
            h("div", { ref: el => this.activeIndicator = el, class: "active-indicator", style: { left: `calc(${this.componentProps.position}px - ${ACTIVE_INDICATOR_HALF_WIDTH}px)` } }),
            this.renderDismissOverlay()
        ]);
    }
    // This modal type is used in the form-autocomplete
    renderHalfModal() {
        return ([
            this.renderDismissOverlay(),
            this.displayFullscreenButton && this.renderFullscreenButton()
        ]);
    }
    hostData() {
        return {
            'no-router': true,
            class: Object.assign({}, createThemedClasses(undefined, 'modal'), getClassMap(this.cssClass), { 'mobile': isIonic(), 
                // If in the web but not with a custom host - the modal should be centered with fixed width/height
                'web-center': isWeb() && this.componentProps && !this.componentProps.customHost && !this.fullscreen, 'half': this.componentProps && this.componentProps.half, 'safari': isSafari(), 'offline': isOffline() && !isIphoneX(), 'offline-iphone-x': isOffline() && isIphoneX() }),
            style: {
                zIndex: 20000 + this.overlayId
            }
        };
    }
    render() {
        const dialogClasses = Object.assign({}, createThemedClasses(undefined, 'modal-wrapper'));
        return [
            h("div", { class: "overlay hide", style: { 'z-index': (20000 + this.overlayId).toString() }, onClick: (event) => this.onOverlayDismissClick(event) }),
            this.host.classList.contains('preview') && this.renderPreviewModal(),
            h("div", { ref: el => this.dialogElement = el, role: "dialog", class: dialogClasses, style: { 'z-index': (20000 + this.overlayId).toString() } }),
            this.componentProps && this.componentProps.half && this.renderHalfModal()
        ];
    }
    static get is() { return "yoo-ion-modal"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "component": {
            "type": String,
            "attr": "component"
        },
        "componentInstance": {
            "type": "Any",
            "attr": "component-instance",
            "mutable": true
        },
        "componentProps": {
            "type": "Any",
            "attr": "component-props"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "delegate": {
            "type": "Any",
            "attr": "delegate"
        },
        "dismiss": {
            "method": true
        },
        "displayFullscreenButton": {
            "type": Boolean,
            "attr": "display-fullscreen-button"
        },
        "enableBackdropDismiss": {
            "type": Boolean,
            "attr": "enable-backdrop-dismiss"
        },
        "enterAnimation": {
            "type": String,
            "attr": "enter-animation"
        },
        "forceCustomAnimationOnWeb": {
            "type": Boolean,
            "attr": "force-custom-animation-on-web"
        },
        "fullscreen": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": String,
            "attr": "leave-animation"
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
        "showBackdrop": {
            "type": Boolean,
            "attr": "show-backdrop"
        },
        "willAnimate": {
            "type": Boolean,
            "attr": "will-animate"
        }
    }; }
    static get events() { return [{
            "name": "ionModalDidLoad",
            "method": "ionModalDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalDidUnload",
            "method": "ionModalDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionDismiss",
            "method": "onDismiss"
        }, {
            "name": "ionBackdropTap",
            "method": "onBackdropTap"
        }, {
            "name": "ionModalDidPresent",
            "method": "lifecycle"
        }, {
            "name": "ionModalWillPresent",
            "method": "lifecycle"
        }, {
            "name": "ionModalWillDismiss",
            "method": "lifecycle"
        }, {
            "name": "ionModalDidDismiss",
            "method": "lifecycle"
        }, {
            "name": "ionModalDidPresent",
            "method": "onDidPresent"
        }, {
            "name": "searchInputFocused",
            "method": "onInputFocused"
        }, {
            "name": "inputFocused",
            "method": "onInputFocused"
        }, {
            "name": "swipedUp",
            "method": "onInputFocused"
        }, {
            "name": "swipedDown",
            "method": "onSwipeDown"
        }]; }
    static get style() { return "yoo-ion-modal.sc-yoo-ion-modal {\n  right: 0;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  contain: strict; }\n\nyoo-ion-modal-controller.sc-yoo-ion-modal {\n  display: none; }\n\n\@media not all and (min-width: 768px) and (min-height: 600px) {\n  yoo-ion-modal.sc-yoo-ion-modal   ion-backdrop.sc-yoo-ion-modal {\n    display: none; } }\n\n.safari.sc-yoo-ion-modal-h {\n  display: none; }\n\n.modal-wrapper.sc-yoo-ion-modal {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  contain: strict;\n  z-index: 10; }\n  .modal-wrapper.sc-yoo-ion-modal   .ion-app.sc-yoo-ion-modal {\n    background: var(--light, #FFFFFF); }\n\n.half.sc-yoo-ion-modal-h   .overlay.sc-yoo-ion-modal, .half.sc-yoo-ion-modal-h   .fullscreen-container.sc-yoo-ion-modal {\n  -webkit-transition: 0.2s;\n  transition: 0.2s; }\n  .half.sc-yoo-ion-modal-h   .overlay.hide.sc-yoo-ion-modal, .half.sc-yoo-ion-modal-h   .fullscreen-container.hide.sc-yoo-ion-modal {\n    opacity: 0; }\n  .half.sc-yoo-ion-modal-h   .overlay.show.sc-yoo-ion-modal, .half.sc-yoo-ion-modal-h   .fullscreen-container.show.sc-yoo-ion-modal {\n    opacity: 1; }\n\n.half.sc-yoo-ion-modal-h   .overlay.sc-yoo-ion-modal {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: var(--backdrop, rgba(4, 4, 15, 0.4)); }\n\n.mobile.sc-yoo-ion-modal-h   .modal-wrapper.sc-yoo-ion-modal {\n  width: 100% !important;\n  height: 100% !important;\n  overflow: hidden; }\n\n.mobile.sc-yoo-ion-modal-h   .fullscreen-container.sc-yoo-ion-modal {\n  top: auto;\n  right: var(--padding-10, 0.625rem);\n  bottom: var(--padding-10, 0.625rem);\n  left: auto;\n  position: absolute; }\n\n.mobile.sc-yoo-ion-modal-h   .overlay-dismiss.sc-yoo-ion-modal {\n  top: 0;\n  right: 0;\n  bottom: 19rem;\n  left: 0;\n  position: absolute;\n  background-color: transparent; }\n\n.mobile.offline.sc-yoo-ion-modal-h   .modal-wrapper.sc-yoo-ion-modal {\n  bottom: var(--padding-20, 1.25rem);\n  height: auto !important; }\n\n.mobile.offline.sc-yoo-ion-modal-h   .overlay.sc-yoo-ion-modal {\n  bottom: var(--padding-20, 1.25rem); }\n\n.mobile.offline.sc-yoo-ion-modal-h   .overlay-dismiss.sc-yoo-ion-modal {\n  top: 0;\n  right: 0;\n  bottom: 20.3125rem;\n  left: 0;\n  position: absolute; }\n\n.mobile.offline-iphone-x.sc-yoo-ion-modal-h   .modal-wrapper.sc-yoo-ion-modal {\n  bottom: var(--padding-40, 2.5rem);\n  height: auto !important; }\n\n.mobile.offline-iphone-x.sc-yoo-ion-modal-h   .overlay.sc-yoo-ion-modal {\n  bottom: var(--padding-40, 2.5rem); }\n\n.mobile.offline-iphone-x.sc-yoo-ion-modal-h   .overlay-dismiss.sc-yoo-ion-modal {\n  top: 0;\n  right: 0;\n  bottom: 21.5rem;\n  left: 0;\n  position: absolute; }\n\n.preview.sc-yoo-ion-modal-h   .modal-wrapper.sc-yoo-ion-modal {\n  top: 62px;\n  right: auto;\n  bottom: auto;\n  left: auto;\n  position: absolute;\n  width: 375px;\n  height: 100%;\n  max-height: 544px;\n  background: var(--light, #FFFFFF);\n  -webkit-box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.15); }\n\n.preview.sc-yoo-ion-modal-h   .overlay-dismiss.sc-yoo-ion-modal {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n\n.preview.sc-yoo-ion-modal-h   .active-indicator.sc-yoo-ion-modal {\n  top: 33px;\n  right: auto;\n  bottom: auto;\n  left: calc(187.5px - 12.5px);\n  position: absolute;\n  border-top: 15px solid transparent;\n  border-right: 12.5px solid transparent;\n  border-bottom: 15px solid var(--light, #FFFFFF);\n  border-left: 12.5px solid transparent; }\n\n.web-center.sc-yoo-ion-modal-h:not(.preview):not(.fullscreen)   .modal-wrapper.sc-yoo-ion-modal {\n  top: 68px;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  max-width: 60%;\n  max-height: calc(75.00% - 68px);\n  margin: 0 auto;\n  border-radius: 0.375rem; }\n\n.web-center.sc-yoo-ion-modal-h:not(.preview):not(.fullscreen)   .overlay.sc-yoo-ion-modal {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: var(--black, #000000);\n  opacity: 0.4; }\n\n.left-view-full.sc-yoo-ion-modal-h   .modal-wrapper.sc-yoo-ion-modal {\n  padding-right: var(--padding-20, 1.25rem);\n  border-radius: 0.375rem 0.375rem 0 0; }\n\n.web-center.visible-overflow.sc-yoo-ion-modal-h   .modal-wrapper.sc-yoo-ion-modal {\n  contain: unset; }"; }
}

class YooIonModalControllerComponent {
    constructor() {
        this.modals = new Map();
        this.topOverlayID = 0;
    }
    modalWillPresent(ev) {
        this.modals.set(ev.target.overlayId, ev.target);
        this.topOverlayID = ev.target.overlayId;
    }
    modalWillDismiss(ev) {
        this.modals.delete(ev.target.overlayId);
        this.topOverlayID = this.topOverlayID - 1;
    }
    escapeKeyUp(event) {
        if (event && event.key === 'escape') {
            let topOverlayElement = this.modals.get(this.topOverlayID);
            if (topOverlayElement && topOverlayElement.classList.contains('modal')) {
                removeLastOverlay(this.modals);
            }
        }
    }
    /**
     * Create a modal overlay with modal options.
     */
    async create(opts) {
        return createOverlay(this.doc.createElement('yoo-ion-modal'), opts, opts.host);
    }
    /**
     * Dismiss the open modal overlay.
     */
    async dismiss(data, role, modalId = -1) {
        return dismissOverlay(data, role, this.modals, modalId, 'YOO-ION-MODAL');
    }
    /**
     * Get the most recently opened modal overlay.
     */
    async getTop() {
        return getTopOverlay(this.modals);
    }
    static get is() { return "yoo-ion-modal-controller"; }
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
            "method": "modalWillPresent"
        }, {
            "name": "body:ionModalWillDismiss",
            "method": "modalWillDismiss"
        }, {
            "name": "body:ionModalDidUnload",
            "method": "modalWillDismiss"
        }, {
            "name": "body:keyup",
            "method": "escapeKeyUp"
        }]; }
}

export { YooIonModalComponent as YooIonModal, YooIonModalControllerComponent as YooIonModalController };

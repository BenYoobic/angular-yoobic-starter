import { BACKDROP, dismiss, eventMethod, present, attachComponent, detachComponent, createThemedClasses, getClassMap } from '../../../utils/ionic';
import { modalAnimationFactory, DEFAULT_ANIMATIONS } from './modal-animations';
import { querySelectorDeep, isIonic, lifecycleEvents, isIphoneX, querySelectorAllDeep, isWeb, isSafari, isOffline, debounce } from '../../../utils';
import { isArray } from 'lodash-es';
const LIFECYCLE_MAP = {
    'ionModalDidPresent': 'ionViewDidEnter',
    'ionModalWillPresent': 'ionViewWillEnter',
    'ionModalWillDismiss': 'ionViewWillDismiss',
    'ionModalDidDismiss': 'ionViewDidDismiss'
};
const WEB_MENU_WIDTH = 1070;
const ACTIVE_INDICATOR_HALF_WIDTH = 12.5;
const PREVIEW_DIALOG_HALF_WDITH = 187.5;
export class YooIonModalComponent {
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
    static get style() { return "/**style-placeholder:yoo-ion-modal:**/"; }
}

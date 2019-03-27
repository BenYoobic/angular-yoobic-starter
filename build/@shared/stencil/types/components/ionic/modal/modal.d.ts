import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { OverlayEventDetail, OverlayInterface, FrameworkDelegate, ComponentRef, ComponentProps, ModalOptions, ModalAnimation } from '../../../utils/ionic';
export declare class YooIonModalComponent implements OverlayInterface, ModalOptions {
    enterAnimation?: ModalAnimation;
    leaveAnimation?: ModalAnimation;
    overlayId: number;
    delegate?: FrameworkDelegate;
    keyboardClose: boolean;
    /**
     * The component to display inside of the modal.
     */
    component: ComponentRef;
    /**
     * The data to pass to the modal component.
     */
    componentProps?: ComponentProps;
    componentInstance?: any;
    /**
     * Additional classes to apply for custom CSS. If multiple classes are
     * provided they should be separated by spaces.
     */
    cssClass?: string | string[];
    /**
     * If true, the modal will be dismissed when the backdrop is clicked. Defaults to `true`.
     */
    enableBackdropDismiss: boolean;
    /**
     * The modal animation on web will be force to fade in and fade out by default, unless this prop
     * is set to true, it will overide the enterAnimation and leaveAnimation passed in.
     */
    forceCustomAnimationOnWeb: boolean;
    /**
     * If true, a backdrop will be displayed behind the modal. Defaults to `true`.
     */
    showBackdrop: boolean;
    /**
     * If true, the modal will animate. Defaults to `true`.
     */
    willAnimate: boolean;
    displayFullscreenButton: boolean;
    /**
     * Emitted after the modal has loaded.
     */
    ionModalDidLoad: EventEmitter<void>;
    /**
     * Emitted after the modal has unloaded.
     */
    ionModalDidUnload: EventEmitter<void>;
    /**
     * Emitted after the modal has presented.
     */
    didPresent: EventEmitter<void>;
    /**
     * Emitted before the modal has presented.
     */
    willPresent: EventEmitter<void>;
    /**
     * Emitted before the modal has dismissed.
     */
    willDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the modal has dismissed.
     */
    didDismiss: EventEmitter<OverlayEventDetail>;
    fullscreen: boolean;
    host: HTMLElement;
    animation: Animation | undefined;
    presented: boolean;
    private usersElement?;
    private dialogElement;
    private activeIndicator;
    private overlayDismiss;
    private webMenuIconPosition;
    private resizeListener;
    private hasPresented;
    protected onDismiss(ev: UIEvent): void;
    protected onBackdropTap(): void;
    protected lifecycle(modalEvent: CustomEvent): void;
    onDidPresent(): void;
    onInputFocused(): void;
    onSwipeDown(): void;
    /**
     * Present the modal overlay after it has been created.
     */
    present(): Promise<void>;
    /**
     * Dismiss the modal overlay after it has been presented.
     */
    dismiss(data?: any, role?: string, overlayDismiss?: boolean): Promise<void>;
    /**
     * Returns a promise that resolves when the modal did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     */
    onDidDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    /**
     * Returns a promise that resolves when the modal will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     */
    onWillDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    onFullscreen(): void;
    setFullscreen(): void;
    setToolbarProps(halfScreen: boolean): void;
    setPreviewModalPosition(): void;
    checkPreviewModalIsVisible(centerIconPosition: number): number;
    claculatePageMenuOffset(pageWidth: number, webMenuWidth: number): number;
    onOverlayDismissClick(event: any): void;
    closeModal(): Promise<void>;
    onTouchStartDismiss(event: any): void;
    onTouchMoveDismiss(event: any): void;
    renderFullscreenButton(): JSX.Element;
    renderDismissOverlay(): JSX.Element;
    renderPreviewModal(): JSX.Element[];
    renderHalfModal(): JSX.Element[];
    hostData(): {
        'no-router': boolean;
        class: {
            'mobile': any;
            'web-center': boolean;
            'half': any;
            'safari': boolean;
            'offline': boolean;
            'offline-iphone-x': boolean;
        };
        style: {
            zIndex: number;
        };
    };
    render(): JSX.Element[];
}

export interface CssClassMap {
    [className: string]: boolean;
}
export declare type PredefinedColors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';
export declare type Color = PredefinedColors | string;
export declare type RouterDirection = 'forward' | 'back' | 'root';
export declare type Side = 'start' | 'end';
export interface GestureDetail {
    type: string;
    startX: number;
    startY: number;
    startTimeStamp: number;
    currentX: number;
    currentY: number;
    velocityX: number;
    velocityY: number;
    deltaX: number;
    deltaY: number;
    timeStamp: number;
    event: UIEvent;
    data?: any;
}
export declare type GestureCallback = (detail?: GestureDetail) => boolean | void;
export interface GestureConfig {
    name: string;
    priority?: number;
    disableScroll?: boolean;
}
export interface BlockerConfig {
    disable?: string[];
    disableScroll?: boolean;
}
export interface ScrollBaseDetail {
    isScrolling: boolean;
}
export interface ScrollDetail extends GestureDetail, ScrollBaseDetail {
    positions: number[];
    scrollTop: number;
    scrollLeft: number;
}
export interface RouteWrite {
    changed: boolean;
    element: HTMLElement | undefined;
    markVisible?: () => void | Promise<void>;
}
export interface RouteID {
    id: string;
    element: HTMLElement | undefined;
    params?: any;
}
export interface NavOutlet {
    setRouteId(id: string, data: any, direction: number): Promise<RouteWrite>;
    getRouteId(): Promise<RouteID | undefined>;
}
export declare type ScrollCallback = (detail?: ScrollDetail) => boolean | void;
export declare type TabbarLayout = 'icon-top' | 'icon-start' | 'icon-end' | 'icon-bottom' | 'icon-hide' | 'label-hide';
export declare type TabbarPlacement = 'top' | 'bottom';
export declare type ComponentRef = Function | HTMLElement | string;
export declare type ComponentProps = {
    [key: string]: any;
};
export interface ModalOptions {
    component: ComponentRef;
    componentProps?: ComponentProps;
    showBackdrop?: boolean;
    enableBackdropDismiss?: boolean;
    enterAnimation?: ModalAnimation;
    leaveAnimation?: ModalAnimation;
    cssClass?: string | string[];
    delegate?: any;
    isOffline?: boolean;
    host?: HTMLElement;
}
export declare type AnimationDirection = 'Enter' | 'Leave';
export declare type AnimationAxis = 'X' | 'Y';
export declare const enum ViewLifecycle {
    WillEnter = "ionViewWillEnter",
    DidEnter = "ionViewDidEnter",
    WillLeave = "ionViewWillLeave",
    DidLeave = "ionViewDidLeave",
    WillUnload = "ionViewWillUnload"
}
export declare type ModalAnimation = 'slideXEnterAnimation' | 'slideXLeaveAnimation' | 'slideYEnterAnimation' | 'slideYLeaveAnimation' | 'fadeEnterAnimation' | 'fadeLeaveAnimation';

export declare const BACKDROP = "backdrop";
export declare function isFullScreenFalse(): boolean;
export declare function createOverlay<T extends HTMLYooIonOverlayElement, B>(element: T, opts: B, host?: any): Promise<T>;
export declare function dismissOverlay(data: any, role: string | undefined, overlays: OverlayMap, id: number, type: OverlayType): Promise<void>;
export declare function getTopOverlay<T extends HTMLYooIonOverlayElement>(overlays: OverlayMap): T;
export declare function getHighestId(overlays: OverlayMap): number;
export declare function getHighestMacthingTypeId(overlays: OverlayMap, type: OverlayType): number;
export declare function removeLastOverlay(overlays: OverlayMap): Promise<void>;
export declare function present(overlay: OverlayInterface, name: string, animationFn: () => Promise<void>, opts?: any): Promise<void>;
export declare function dismiss(overlay: OverlayInterface, data: any | undefined, role: string | undefined, overlayDismiss: boolean | undefined, name: string, animationFn: () => Promise<void>, opts?: any): Promise<void>;
export declare function autoFocus(containerEl: HTMLElement): HTMLElement | null;
export declare function eventMethod<T>(element: HTMLElement, eventName: string, callback?: (detail: T) => void): Promise<T>;
export declare function onceEvent(element: HTMLElement, eventName: string, callback: (ev: Event) => void): void;
export declare function isCancel(role: string | undefined): boolean;
export interface OverlayEventDetail<T = any> {
    data?: T;
    role?: string;
    overlayDismiss?: boolean;
}
export interface OverlayInterface {
    host: HTMLElement;
    willAnimate: boolean;
    keyboardClose: boolean;
    presented: boolean;
    animation?: Animation;
    didPresent: any;
    willPresent: any;
    willDismiss: any;
    didDismiss: any;
    present(): Promise<void>;
    dismiss(data?: any, role?: string): Promise<void>;
}
export interface OverlayController {
    create(opts?: any): Promise<HTMLElement>;
    dismiss(data?: any, role?: string, alertId?: number): Promise<void>;
    getTop(): Promise<HTMLElement>;
}
export interface HTMLYooIonOverlayElement extends HTMLStencilElement {
    overlayId: number;
    dismiss(data?: any, role?: string): Promise<void>;
}
export declare type OverlayMap = Map<number, HTMLYooIonOverlayElement>;
export declare type OverlayType = 'YOO-ION-MODAL' | 'YOO-ACTION-SHEET' | 'YOO-TOAST' | 'YOO-ALERT';

export declare const Hammer: any;
export declare const hammerTypes: {
    PAN: string;
    PINCH: string;
    PRESS: string;
    ROTATE: string;
    SWIPE: string;
    TAP: string;
};
export declare const hammerDirections: {
    vertical: any;
    horizontal: any;
    all: any;
};
export interface IHammerOptions {
    handleFn?: (ev?: any) => void;
    direction?: number;
}
export declare function setupHammer(element: HTMLElement, gestureType: string, hammerOptions: IHammerOptions): void;
export declare function isTopSwipe(deltaY: number): boolean;
export declare function isBottomSwipe(deltaY: number): boolean;

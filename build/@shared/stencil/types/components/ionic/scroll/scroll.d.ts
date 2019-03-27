import '../../../stencil.core';
import { EventEmitter, QueueApi } from '../../../stencil.core';
import { /**Config, Mode,**/ ScrollBaseDetail, ScrollDetail } from '../../../utils/ionic';
export declare class YooIonScrollComponent {
    height: string;
    forceOverscroll?: boolean;
    scrollEvents: boolean;
    showScrollbar: boolean;
    horizontalMode: boolean;
    queue: QueueApi;
    ionScrollStart: EventEmitter<ScrollBaseDetail>;
    ionScroll: EventEmitter<ScrollDetail>;
    hideTabbar: EventEmitter<boolean>;
    ionScrollEnd: EventEmitter<ScrollBaseDetail>;
    el: HTMLStencilElement;
    private watchDog;
    private isScrolling;
    private lastScroll;
    private lastDeltaY;
    private detail;
    private queued;
    private elementHeight;
    private isActive;
    constructor();
    private preventDefault;
    onScroll(ev: UIEvent): void;
    onMouseWheel(ev: any): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    isScrollDistanceBiggerThanScroll(y: number): Promise<boolean>;
    /** Scroll to the top of the component */
    scrollToTop(duration: number): Promise<void>;
    /** Scroll to the bottom of the component */
    scrollToBottom(duration: number): Promise<void>;
    /** Scroll by a specified X/Y distance in the component */
    scrollByPoint(x: number, y: number, duration: number, done?: Function): Promise<any>;
    /** Re-render the scroll component */
    refresh(): void;
    /** Scroll to a specified X/Y location in the component */
    scrollToPoint(x: number | undefined | null, y: number | undefined | null, duration?: number): Promise<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private onScrollStart;
    private onScrollEnd;
    hostData(): {
        class: {
            overscroll: boolean;
            isFirefox: boolean;
            'no-scrollbar': boolean;
            'horizontal': boolean;
        };
    };
    render(): JSX.Element;
}

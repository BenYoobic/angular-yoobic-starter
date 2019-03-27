import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ItemSlidingType } from '../../../interfaces';
declare const enum SlidingState {
    Disabled = 2,
    Enabled = 4,
    End = 8,
    Start = 16,
    SwipeEnd = 32,
    SwipeStart = 64
}
export declare class YooIonItemSlidingComponent {
    slidingType: ItemSlidingType;
    ionDrag: EventEmitter;
    state: SlidingState;
    el: HTMLYooIonItemSlidingElement;
    private item;
    private list;
    private openAmount;
    private initialOpenAmount;
    private optsWidthRightSide;
    private optsWidthLeftSide;
    private sides;
    private tmr;
    private leftOptions?;
    private rightOptions?;
    private optsDirty;
    /**
     * Get the amount the item is open in pixels.
     */
    getOpenAmount(): Promise<number>;
    /**
     * Get the ratio of the open amount of the item compared to the width of the options.
     * If the number returned is positive, then the options on the right side are open.
     * If the number returned is negative, then the options on the left side are open.
     * If the absolute value of the number is greater than 1, the item is open more than
     * the width of the options.
     */
    getSlidingRatio(): Promise<number>;
    /**
     * Close the sliding item. Items can also be closed from the [List](../../list/List).
     */
    close(): void;
    updateOptions(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private getSlidingRatioSync;
    /**
     * Close all of the sliding items in the list. Items can also be closed from the [List](../../list/List).
     */
    closeOpened(): Promise<boolean>;
    private canStart;
    private onDragStart;
    private onDragMove;
    private onDragEnd;
    private calculateOptsWidth;
    private setOpenAmount;
    onHoverElement(enter: boolean): void;
    renderSwipe(): JSX.Element;
    renderHover(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
export {};

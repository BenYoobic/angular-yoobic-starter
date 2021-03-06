import { EventEmitter } from '../../../stencil.core';
import { Side } from '../../../utils/ionic';
export declare class YooIonItemOptionsComponent {
    /**
     * The side the option button should be on. Possible values: `"start"` and `"end"`. Defaults to `"end"`. If you have multiple `ion-item-options`, a side must be provided for each.
     *
     */
    side: Side;
    /**
     * Emitted when the item has been fully swiped.
     */
    ionSwipe: EventEmitter<void>;
    el: HTMLElement;
    fireSwipeEvent(): void;
    hostData(): {
        class: {
            'item-options-start': boolean;
            'item-options-end': boolean;
        };
    };
}

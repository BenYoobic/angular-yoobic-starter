import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IHammerOptions } from '../../../utils';
export declare class YooSwipeContainerComponent {
    showSwipeControl: boolean;
    controlOnly: boolean;
    hammerOptions: IHammerOptions;
    swipedUp: EventEmitter<boolean>;
    swipedDown: EventEmitter<boolean>;
    host: HTMLStencilElement;
    private swipeWrapper;
    private swipeControl;
    componentDidLoad(): void;
    onSwipe(event: any): void;
    private normalizeOptions;
    renderSwipeControl(): JSX.Element;
    render(): JSX.Element;
}

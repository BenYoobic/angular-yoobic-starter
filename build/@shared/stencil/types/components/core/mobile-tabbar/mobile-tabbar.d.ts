import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMobileTabbarItem } from '../../../interfaces';
export declare class YooMobileTabbarComponent {
    items: Array<IMobileTabbarItem>;
    tabChanged: EventEmitter<IMobileTabbarItem>;
    activeIndex: number;
    host: HTMLStencilElement;
    private isBusy;
    setActiveIcon(index: number): void;
    onIconClick(item: IMobileTabbarItem, index: number): void;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooFormNumberPickerDialogComponent {
    value: Array<any> | any;
    values: Array<any>;
    swipedUp: EventEmitter<boolean>;
    swipedDown: EventEmitter<boolean>;
    selection: Array<any> | any;
    fullscreen: boolean;
    host: HTMLStencilElement;
    private selectedElement;
    handleModalPresent(ev: CustomEvent): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    readonly fullScrollHeight: number;
    getDialogTitle(): any;
    onItemSelect(ev: any, itemValue: number): void;
    render(): JSX.Element;
}

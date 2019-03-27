import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooFormRadioComponent {
    text: string;
    state: string;
    disabled: boolean;
    name: string;
    radioClicked: EventEmitter;
    host: HTMLStencilElement;
    onRadioCheck(): void;
    render(): JSX.Element;
}

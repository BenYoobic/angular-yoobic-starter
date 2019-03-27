import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooResultDialogComponent {
    heading: string;
    subheading: string;
    success: boolean;
    buttonText: string;
    close: EventEmitter<string>;
    host: HTMLStencilElement;
    onClose(): void;
    render(): JSX.Element;
}

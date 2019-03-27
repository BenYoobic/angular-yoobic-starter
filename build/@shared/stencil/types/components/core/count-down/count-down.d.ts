import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooCountDownComponent {
    start: number;
    finish: EventEmitter<any>;
    host: HTMLStencilElement;
    protected countdownInterval: any;
    private showGetReady;
    componentDidLoad(): void;
    componentDidUnload(): void;
    renderGetReady(): JSX.Element;
    renderTimer(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooBannerComponent {
    text: string;
    heading: string;
    icon: string;
    closeable: boolean;
    animationName: string;
    link: string;
    alertClosed: EventEmitter<boolean>;
    alertActionSelected: EventEmitter<boolean>;
    closed: boolean;
    host: HTMLStencilElement;
    componentDidLoad(): void;
    onActionTextClick(): void;
    onDismissButtonClick(): void;
    hostData(): {
        class: {
            'closed': boolean;
        };
    };
    render(): JSX.Element;
}

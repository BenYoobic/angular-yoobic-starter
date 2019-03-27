import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooBadgeComponent {
    text: string;
    closable: boolean;
    iconLeft: string;
    iconRight: string;
    isHistory: boolean;
    tagClosed: EventEmitter<boolean>;
    rightIconClicked: EventEmitter<boolean>;
    leftIconClicked: EventEmitter<boolean>;
    closed: boolean;
    host: HTMLStencilElement;
    private textSpan;
    componentDidLoad(): void;
    onClose(): void;
    onLeftIconClicked(): void;
    onRightIconClicked(): void;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

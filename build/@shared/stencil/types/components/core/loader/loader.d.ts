import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooLoaderComponent {
    progress: number;
    maxValue: number;
    height: number;
    text: string;
    showFinishAnimation: boolean;
    animationCompleted: EventEmitter<boolean>;
    protected host: HTMLStencilElement;
    private checkMarkDiv;
    private progressDiv;
    private enableAnimation;
    showLoadingAnimation(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    onAnimationEnd(): void;
    renderCheckMark(): JSX.Element;
    hostData(): {
        class: {
            'safari': boolean;
        };
    };
    render(): JSX.Element;
}

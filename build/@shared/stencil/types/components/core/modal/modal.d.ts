import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IAnimationProp, IModalIcon } from '../../../interfaces';
export declare class YooModalComponent {
    heading: string;
    headingIcons: IModalIcon[];
    content: HTMLElement;
    primaryButtonText: string;
    secondaryButtonText: string;
    hasHeader: boolean;
    hasFooter: boolean;
    footerText: string;
    cssClass: string;
    animationName: string;
    animationProp: IAnimationProp;
    primaryFn: Function;
    withYooCtrl: boolean;
    scrollEnabled: boolean;
    overlayId: number;
    closeIcon: boolean;
    primaryButtonClicked: EventEmitter<boolean>;
    closed: EventEmitter<boolean>;
    host: HTMLStencilElement;
    private resizeListener;
    onInputBarRawChange(): void;
    /**
     * Dismiss the modal overlay after it has been presented.
     */
    dismiss(data?: any, role?: string): Promise<void>;
    close(): void;
    resize(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    onPrimaryButtonClick(ev: UIEvent): void;
    animation(open: boolean, sentFromClose?: boolean): void;
    setContentInModal(): void;
    getSizeContainer(): {
        height: string;
        width: string;
    };
    renderHeadingIcons(headingIcons: IModalIcon[]): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

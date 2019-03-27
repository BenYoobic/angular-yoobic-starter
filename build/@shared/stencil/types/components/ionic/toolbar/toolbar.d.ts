import '../../../stencil.core';
export declare class YooIonToolbarComponent {
    color?: string;
    translucent: boolean;
    halfScreen: boolean;
    animateOnLoad: boolean;
    secondary: boolean;
    centerTitle: boolean;
    host: HTMLStencilElement;
    private elementStart;
    private elementSecondary;
    private elementPrimary;
    private elementEnd;
    private elementTitle;
    componentDidLoad(): void;
    adjustPositionTitle(): void;
    hostData(): {
        class: any;
    };
    render(): JSX.Element[];
}

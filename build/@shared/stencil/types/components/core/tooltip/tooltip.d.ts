import '../../../stencil.core';
export declare class YooTooltipComponent {
    placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'auto';
    cssOnly: boolean;
    options: any;
    content: string;
    protected host: HTMLStencilElement;
    protected tippy: any;
    onOptionsChange(): void;
    onTextChange(): void;
    componentWillLoad(): void;
    loadTippy(): void;
    renderCssOnly(): JSX.Element;
    hostData(): {
        class: {
            'css-only': boolean;
        };
    };
    render(): JSX.Element;
}

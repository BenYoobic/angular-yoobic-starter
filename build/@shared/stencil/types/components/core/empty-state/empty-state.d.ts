import '../../../stencil.core';
export declare class YooEmptyStateComponent {
    type: string;
    hasText: boolean;
    emptyText: string;
    fadeIn: boolean;
    iconSrc: string;
    emptyTitle: string;
    host: HTMLStencilElement;
    private _iconMap;
    private _titleMap;
    private _textMap;
    componentWillLoad(): void;
    componentDidLoad(): void;
    getIconSrc(): string;
    getEmptyTitle(): any;
    getEmptyText(): any;
    hostData(): {
        class: {
            'fade-in': boolean;
        };
    };
    render(): JSX.Element;
}

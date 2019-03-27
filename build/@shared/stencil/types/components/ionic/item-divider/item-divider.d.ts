import '../../../stencil.core';
export declare class YooIonItemDividerComponent {
    /**
     * The color to use for the item-divider
     */
    color?: string;
    /**
     * The mode determines which platform styles to use.
     * Possible values are: `"ios"` or `"md"`.
     */
    el: HTMLElement;
    componentDidLoad(): void;
    hostData(): {
        class: import("../../../utils").CssClassMap;
    };
    render(): JSX.Element[];
}

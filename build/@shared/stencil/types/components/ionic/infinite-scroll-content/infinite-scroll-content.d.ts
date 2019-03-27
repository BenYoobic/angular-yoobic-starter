import '../../../stencil.core';
export declare class YooInfiniteScrollContentComponent {
    /**
     * An animated SVG spinner that shows while loading.
     */
    loadingSpinner?: string;
    /**
     * Optional text to display while loading.
     */
    loadingText?: string;
    hostData(): {
        class: import("../../../utils/ionic").CssClassMap;
    };
    render(): JSX.Element;
}

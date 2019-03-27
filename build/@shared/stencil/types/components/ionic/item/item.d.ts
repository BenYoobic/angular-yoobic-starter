import '../../../stencil.core';
import { RouterDirection } from '../../../utils/ionic';
export declare class YooIonItemComponent {
    /**
     * The color to use for the background of the item.
     */
    color?: string;
    /**
     * The mode determines which platform styles to use.
     * Possible values are: `"ios"` or `"md"`.
     */
    /**
     * If true, a button tag will be rendered and the item will be tappable. Defaults to `false`.
     */
    button: boolean;
    /**
     * If true, a detail arrow will appear on the item. Defaults to `false` unless the `mode`
     * is `ios` and an `href`, `onclick` or `button` property is present.
     */
    detail?: boolean;
    /**
     * The icon to use when `detail` is set to `true`. Defaults to `"ios-arrow-forward"`.
     */
    detailIcon: string;
    /**
     * If true, the user cannot interact with the item. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href?: string;
    /**
     * How the bottom border should be displayed on the item.
     */
    lines?: 'full' | 'inset' | 'none';
    state?: 'valid' | 'invalid' | 'focus';
    /**
     * When using a router, it specifies the transition direction when navigating to
     * another page using `href`.
     */
    routerDirection?: RouterDirection;
    el: HTMLStencilElement;
    private itemStyles;
    itemStyle(ev: UIEvent): void;
    componentDidLoad(): void;
    private isClickable;
    hostData(): {
        'tappable': boolean;
        class: any;
    };
    render(): JSX.Element;
}

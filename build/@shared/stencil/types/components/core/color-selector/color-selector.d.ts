import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooColorSelectorComponent {
    /**
     * Array of colors to show in the selector, the user will be able to pick amongst any of these
     */
    colors: string[];
    /**
     * Determines whether we should show a tick icon or not when the color is selected; if false, the colors will be animated
     */
    showTickIcon: boolean;
    colorChanged: EventEmitter<string>;
    currentColor: string;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    onColorSelected(color: string): void;
    getStyleColorWhenWhite(color: string): string;
    hostData(): {
        class: {
            'no-tick': boolean;
        };
    };
    render(): JSX.Element;
}

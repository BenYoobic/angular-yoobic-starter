import '../../../stencil.core';
import { Color } from '../../../utils/ionic';
export declare class YooIonToolbarTitleComponent {
    color?: Color;
    halfScreen: boolean;
    hostData(): {
        class: {
            'ios': boolean;
            'iphone-x': boolean;
        };
    };
    render(): JSX.Element[];
}

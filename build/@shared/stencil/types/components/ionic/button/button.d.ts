import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { Color, RouterDirection } from '../../../utils/ionic';
export declare class YooIonButtonComponent {
    color?: Color;
    buttonType: string;
    disabled: boolean;
    expand?: 'full' | 'block';
    fill?: 'clear' | 'outline' | 'solid' | 'default';
    routerDirection?: RouterDirection;
    href?: string;
    shape?: 'round';
    size?: 'small' | 'default' | 'large';
    strong: boolean;
    type: 'submit' | 'reset' | 'button';
    tapAnimation: boolean;
    ionFocus: EventEmitter<void>;
    ionBlur: EventEmitter<void>;
    keyFocus: boolean;
    el: HTMLElement;
    componentWillLoad(): void;
    onFocus(): void;
    onKeyUp(): void;
    onBlur(): void;
    renderButton(): JSX.Element;
    getExtraClasses(): string;
    hostData(): {
        class: any;
        'tappable': boolean;
    };
    protected render(): JSX.Element;
}

import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator } from '../../../interfaces';
export declare class YooFormSignaturePadComponent {
    value: string;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    name: string;
    isHistory: boolean;
    required: boolean;
    readonly: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    onShowDialog(): void;
    renderEditable(): JSX.Element;
    renderReadonly(): JSX.Element;
    hostData(): {
        class: {
            'swiper-no-swiping': boolean;
        };
    };
    render(): JSX.Element;
}

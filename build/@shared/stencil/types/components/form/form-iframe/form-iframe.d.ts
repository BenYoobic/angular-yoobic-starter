import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator } from '../../../interfaces';
export declare class YooFormIFrameComponent {
    source: string;
    type: 'omnivirt' | 'thinglink';
    value: string | number;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    placeholder: string;
    readonly: boolean;
    required: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    validity: boolean;
    requiredWatch(): void;
    validate(): boolean;
    openScene(url: any): void;
    render(): JSX.Element;
}

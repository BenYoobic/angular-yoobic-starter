import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator } from '../../../interfaces';
export declare class YooFormTextEditorComponent {
    value: string;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    readonly: boolean;
    required: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    validity: boolean;
    private containerEl;
    private editor;
    componentDidLoad(): void;
    componentDidUnload(): void;
    onChange(html: any): void;
    validate(): boolean;
    renderEditable(): JSX.Element;
    renderReadonly(): JSX.Element;
    render(): JSX.Element;
}

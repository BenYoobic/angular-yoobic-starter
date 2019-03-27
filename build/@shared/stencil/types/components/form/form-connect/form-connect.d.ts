import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator } from '../../../interfaces';
export declare class YooFormConnectComponent {
    answer: Array<any>;
    value: Array<any>;
    values: Array<any>;
    validity: boolean;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    placeholder: string;
    readonly: boolean;
    type: string;
    required: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    private outerContainerElement;
    private colorArray;
    isValid(): Promise<boolean>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    requiredWatch(): void;
    validate(): boolean;
    initInteract(): void;
    initInteractDraggable(): void;
    initInteractDroppable(): void;
    updateValue(leftWord: string, rightWord: string): void;
    isConnected(word: string): string;
    getAnswerColor(word: string): string;
    onClickBadge(word: string): void;
    onDropWord(event: any): void;
    clearInteractEvents(): void;
    dragMoveListener(event: any): void;
    dragEndListener(event: any): void;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    render(): JSX.Element;
}

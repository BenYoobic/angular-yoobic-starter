import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { Validator, AsyncValidator, ValidatorEntry } from '../../../interfaces';
export declare class YooFormFeedbackComponent {
    value: number;
    validators: Array<Validator<number> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<number>>;
    readonly: boolean;
    name: string;
    isHistory: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<boolean>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    private values;
    private buttonElements;
    componentWillLoad(): void;
    private animateSelectedButton;
    private onStateClick;
    private getBackgroundColorClass;
    private renderButtons;
    renderReadonly(): JSX.Element;
    renderEditable(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

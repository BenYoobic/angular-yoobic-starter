import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator, IFormChecklist, IFormChecklistValue } from '../../../interfaces';
export declare class YooFormChecklistComponent implements IFormChecklist {
    value: IFormChecklistValue;
    validators: Array<Validator<IFormChecklistValue> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<IFormChecklistValue>>;
    readonly: boolean;
    multiple: boolean;
    placeholder: string;
    name: string;
    isHistory: boolean;
    previousTasks: Array<{
        text: string;
        validated?: boolean;
    }>;
    currentTasks: Array<string>;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    host: HTMLStencilElement;
    private rows;
    componentWillLoad(): void;
    onValidate(i: any): void;
    onReject(i: any): void;
    onReport(i: any): void;
    onNewTaskRemove(i: any): void;
    onInputChanged(ev: CustomEvent): void;
    onInputBlurred(ev: any): void;
    onUpdateValue(): void;
    renderPreviousTasks(readonly: boolean): JSX.Element[];
    renderCurrentTasks(readonly: boolean): JSX.Element[];
    renderTextArea(): JSX.Element;
    renderEditable(): JSX.Element;
    renderReadonly(): JSX.Element;
    parseHistoryData(): string;
    renderHistory(): JSX.Element;
    render(): JSX.Element;
}
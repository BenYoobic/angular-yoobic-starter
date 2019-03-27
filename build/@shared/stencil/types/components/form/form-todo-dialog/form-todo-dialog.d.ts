import '../../../stencil.core';
import { ITodo, ISlide, ITodoTask } from '../../../interfaces';
export declare class YooFormTodoDialogComponent {
    todo: ITodo;
    onFieldFetchData: any;
    slidesTodo: Array<ISlide>;
    slidesTodoTask: Array<ISlide>;
    allPhotosRequired: boolean;
    allowLibrary: boolean;
    values: Array<string>;
    linked: boolean;
    validity: boolean;
    host: HTMLStencilElement;
    private currentTask;
    onInternalFieldFetchData(ev: CustomEvent): void;
    onDataChanged(ev: CustomEvent<any>): void;
    onInputChanged(ev: CustomEvent<string>): void;
    onEnterPressed(): void;
    componentWillLoad(): void;
    onValidityChanged(ev: CustomEvent<boolean>): void;
    isValid(): boolean;
    onCancel(): void;
    onSave(): void;
    onAddTask(): void;
    onEditTask(task: ITodoTask): void;
    onRemoveTask(task: ITodoTask): void;
    onShowActionSheet(task: ITodoTask): void;
    onSelect(ev: CustomEvent<Array<{
        _id: string;
        title: string;
    }>>): void;
    renderLinkedField(): JSX.Element;
    renderTasks(): JSX.Element;
    render(): JSX.Element[];
}

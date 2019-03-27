import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ITodoTask } from '../../../interfaces';
export declare class YooFormTodoSingleComponent {
    values: ITodoTask[];
    readonly: boolean;
    type: 'mission' | 'form';
    update: EventEmitter<ITodoTask[]>;
    valuesState: ITodoTask[];
    showComments: boolean[];
    host: HTMLStencilElement;
    onCommentsChange: (...args: any[]) => void;
    componentWillLoad(): void;
    onIconClick(todo: ITodoTask, index: number, value: boolean): void;
    onImageChanged(ev: CustomEvent<any>, index: number): void;
    onToggleComments(todo: ITodoTask, index: number): void;
    onFocusComments(index: number): void;
    renderComments(index: number): JSX.Element;
    renderIconCheck(todo: ITodoTask, index: number): JSX.Element;
    renderContentLeft(todo: ITodoTask, index: number): JSX.Element;
    renderLinkedField(todo: ITodoTask): JSX.Element;
    render(): JSX.Element;
}

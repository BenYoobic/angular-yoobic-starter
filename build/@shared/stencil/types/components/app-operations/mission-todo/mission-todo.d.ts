import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMission, ITodoTask } from '../../../index';
export declare class YooMissionTodoComponent {
    mission: IMission;
    readonly: boolean;
    update: EventEmitter<IMission>;
    missionState: IMission;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    onUpdateTodo(ev: CustomEvent<ITodoTask[]>): void;
    render(): JSX.Element;
}

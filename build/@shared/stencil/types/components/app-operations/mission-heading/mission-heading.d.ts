import '../../../stencil.core';
import { IMission } from '../../../index';
export declare class YooMissionHeadingComponent {
    mission: IMission;
    progress: number;
    host: HTMLStencilElement;
    private isMobile;
    componentWillLoad(): void;
    renderMissionDate(): JSX.Element;
    renderTodoDate(): JSX.Element;
    render(): JSX.Element;
}

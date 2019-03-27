import '../../../stencil.core';
import { GridOptions } from 'ag-grid-community';
export declare class YooAgGridComponent {
    config: GridOptions;
    host: HTMLStencilElement;
    private containerEl;
    private grid;
    private options;
    componentDidLoad(): void;
    componentDidUnload(): void;
    onConfigChange(): void;
    updateConfig(): void;
    renderGrid(): any;
    render(): JSX.Element;
}

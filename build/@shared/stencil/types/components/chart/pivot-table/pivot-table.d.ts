import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IChartDefinition } from '../../../interfaces';
export declare class YooPivotTableComponent {
    definition: IChartDefinition;
    isFullScreen: boolean;
    config: {
        columnDefs?: Array<any>;
        rowData: Array<any>;
    };
    rowClick: EventEmitter<any>;
    rowDoubleClick: EventEmitter<Array<string>>;
    host: HTMLStencilElement;
    private options;
    componentWillLoad(): void;
    onConfigChange(): void;
    updateConfig(): void;
    onGridRestore(setColumns: boolean): void;
    campaignsPivotTableKpiSortRows(rows: Array<any>): any[];
    campaignsPivotTableKpiSetColumns(): void;
    render(): JSX.Element;
}

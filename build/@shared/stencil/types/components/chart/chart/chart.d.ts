import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IChartDefinition } from '../../../interfaces';
export declare class YooChartComponent {
    definition: IChartDefinition;
    isFullScreen: boolean;
    config: any;
    chartClick: EventEmitter<any>;
    chartDoubleClick: EventEmitter<Array<string>>;
    chartLegendItemClick: EventEmitter<any>;
    protected host: HTMLStencilElement;
    private doubleClicker;
    private chart;
    private chartContainer;
    componentDidLoad(): void;
    componentDidUnload(): void;
    onConfigChange(): void;
    isChartEmpty(): boolean;
    renderChart(): void;
    setupLegendListener(options: any): void;
    resetDoubleClick(): void;
    render(): JSX.Element;
}

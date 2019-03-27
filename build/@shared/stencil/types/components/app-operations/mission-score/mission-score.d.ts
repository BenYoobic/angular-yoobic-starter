import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMissionScoring, IChartDefinition } from '../../../index';
export declare class YooMissionScoreComponent {
    charts: Array<{
        score: IMissionScoring;
        chart: IChartDefinition;
    }>;
    networkScore: number;
    header: string;
    scoreSelect: EventEmitter<IChartDefinition>;
    host: HTMLStencilElement;
    onScoreSelect(conf: IChartDefinition): void;
    getChartsType(): "percentage" | "points" | "mixed";
    renderMissionScore(): JSX.Element;
    renderScoreActive(conf: any, type: any): JSX.Element;
    renderMissionScoreNotActive(conf: any, type: any, index: any): JSX.Element;
    render(): JSX.Element;
}

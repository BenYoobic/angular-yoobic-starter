import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMission, IMissionScoring, IChartDefinition } from '../../../index';
export declare class YooMissionResultsComponent {
    mission: IMission;
    hasAudit: boolean;
    satisfactoryCount: number;
    unsatisfactoryCount: number;
    nonapplicableCount: number;
    charts: Array<{
        score: IMissionScoring;
        chart: IChartDefinition;
    }>;
    networkScore: number;
    selectLocation: EventEmitter<any>;
    selectUser: EventEmitter<any>;
    selectValidator: EventEmitter<any>;
    showScoreChart: EventEmitter<IChartDefinition>;
    host: HTMLStencilElement;
    private isMobile;
    componentWillLoad(): void;
    onScoreSelect(conf: any): void;
    renderPriority(): JSX.Element;
    renderMissionOwner(): JSX.Element;
    renderMissionDuration(): JSX.Element;
    renderMissionValidator(): JSX.Element;
    renderMissionLocation(): JSX.Element;
    renderVisitDescription(): JSX.Element;
    renderAudit(): JSX.Element;
    renderUnvalidatedReason(): JSX.Element;
    render(): JSX.Element;
}

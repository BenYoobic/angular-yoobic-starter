import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IKpiTypes, IChartDefinition } from '../../../interfaces';
export declare class YooKpiContainerComponent {
    heading: string;
    type: IKpiTypes;
    config: any;
    isFullScreen: boolean;
    isFullHeight: boolean;
    definition: IChartDefinition;
    hideHeader: boolean;
    showDetail: EventEmitter<number>;
    kpiClick: EventEmitter<any>;
    kpiDoubleClick: EventEmitter<Array<string>>;
    kpiLegendItemClick: EventEmitter<any>;
    share: EventEmitter<string>;
    host: HTMLStencilElement;
    onShowDialog(index?: number): void;
    onShowMore(): void;
    onKpiClick(ev: CustomEvent<any>): void;
    onKpiDoubleClick(ev: CustomEvent<any>): void;
    onKpiLegendItemClick(ev: CustomEvent<any>): void;
    renderKpiContent(): JSX.Element;
    renderKpi(photoSrc?: string): JSX.Element;
    hostData(): {
        class: {
            'web': any;
        };
    };
    render(): JSX.Element;
}

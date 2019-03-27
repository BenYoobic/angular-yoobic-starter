import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IKpiTypes, IChartDefinition, IMarker } from '../../../interfaces';
export declare class YooKpiComponent {
    type: IKpiTypes;
    config: any;
    photoSrc: string;
    definition: IChartDefinition;
    isFullScreen: boolean;
    isFullHeight: boolean;
    kpiClick: EventEmitter<any>;
    kpiDoubleClick: EventEmitter<Array<string>>;
    kpiLegendItemClick: EventEmitter<any>;
    fetchDetails: EventEmitter<any>;
    host: HTMLStencilElement;
    onChartClick(ev: CustomEvent<any>): void;
    onChartDoubleClick(ev: CustomEvent<any>): void;
    onChartLegendItemClick(ev: CustomEvent<any>): void;
    onMarkersSelect(ev: CustomEvent<IMarker[]>): void;
    hostData(): {
        class: {
            'full-height': boolean;
            'web': any;
        };
    };
    render(): JSX.Element;
}

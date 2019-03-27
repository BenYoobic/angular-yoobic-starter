import { IFormField, Filters, IChartDefinition } from '@shared/stencil';
import { MissionDescription } from '../mission-description/mission-description.interface';
export declare const CHART_TYPES: string[];
export declare const CHART_DATEGROUPINGBY: string[];
export declare const CHART_SHOW_AS: string[];
export declare const CHART_DATETIMEFORMAT: string[];
export declare const CHART_TIMESCALE: string[];
export interface IMissionField {
    selectedDescription: MissionDescription;
    fields?: Array<IFormField> | IFormField;
}
export interface IMissionFields {
    selectedDescription: MissionDescription;
    fields?: Array<IFormField>;
}
export declare function onChartMissionFieldsChange(missionfields: any, data: any): void;
export declare class ChartDefinition extends IChartDefinition {
    collectionName?: string;
    missionfields?: IMissionField;
    title: string;
    description?: string;
    showAs?: string;
    type?: string;
    palette?: string;
    groupByDate?: boolean;
    datetimeFormat?: string;
    timescale?: string;
    dateGrouping?: string;
    groupByTag?: boolean;
    groupByCampaign?: boolean;
    showLegend?: boolean;
    showValues?: boolean;
    colorByPoint?: boolean;
    stacked?: string;
    custom?: string;
    mapTransform?: (retVal: Array<{
        _id: string;
        serie?: string;
        value: number;
        color?: string;
    }>, cd?: ChartDefinition, broker?: any, component?: any) => {};
    filters?: Filters;
    showPreviousYear?: boolean;
}

import { IKpi, Filters, IDatesRange } from '@shared/stencil';
import { MissionDescription } from '../mission-description/mission-description.interface';
import { ChartDefinition } from '../chart-definition/chart-definition.interface';
import { Translate } from '@shared/translate';
export declare class BaseKpi extends IKpi {
    pointPadding: boolean;
    numberPrecision: number;
    dates: IDatesRange;
    accumulator: string;
    static getChartDefinition(kpi: any, cd: ChartDefinition, translate: Translate): void;
    static getDateFormat(groupBy: any): string;
    static getDates(kpi: BaseKpi, showPreviousYear?: boolean): {
        startDate?: string;
        endDate?: string;
    };
    static getStartAndEndDates(timescale: any, endDate?: Date | string, amount?: number, notsliding?: boolean): string[];
    static fixDates(cd: ChartDefinition, date: string): any;
    static getColor(value: any): any;
    static setDateFilters(filters: Filters, dates: {
        startDate?: string;
        endDate?: string;
    }, field?: string, allowNotExits?: boolean): void;
    static setLocationTagsFilters(filters: Filters, locationTags: Array<string>): void;
    static setUserTagsFilters(filters: Filters, userTags: Array<string>): void;
    static setCampaignFilters(campaigns: Array<MissionDescription>, campaignTags: Array<string>, filters: Filters, missionType: string): void;
    static getDateFormatMoment(groupBy: any): string;
}

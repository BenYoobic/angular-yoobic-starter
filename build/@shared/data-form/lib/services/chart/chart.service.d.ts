import { DecimalPipe } from '@angular/common';
import { CoreConfig, LocalForageService, Utils } from '@shared/common';
import { Broker, Requestor, ChartDefinition, Dashboard, DashboardCore, Cache } from '@shared/data-core';
import { Filters, HighchartsOptions } from '@shared/stencil';
import { Translate } from '@shared/translate';
import { Observable } from 'rxjs';
export interface ChartCache {
    date: Date;
    data: any;
}
export declare class Chart {
    protected broker: Broker;
    protected dashboard: DashboardCore;
    protected rq: Requestor;
    protected translate: Translate;
    protected localForage: LocalForageService;
    protected coreConfig: CoreConfig;
    protected utils: Utils;
    protected cache: Cache;
    PDF_ROW_WIDTH: number;
    PDF_ROW_HEIGHT: number;
    protected palette0: string[];
    protected palette1: string[];
    protected palette2: string[];
    protected palette3: string[];
    protected paletteBoost: string[];
    protected textStyle: {
        fontFamily: string;
        color: any;
        fontWeight: string;
        fontSize: string;
        whiteSpace: string;
        textShadow: boolean;
    };
    protected lineColor: string;
    protected gridLineColor: string;
    protected decimalPipe: DecimalPipe;
    constructor(broker: Broker, dashboard: DashboardCore, rq: Requestor, translate: Translate, localForage: LocalForageService, coreConfig: CoreConfig, utils: Utils, cache: Cache);
    getFilenameSuffix(): string;
    encodeChart(chart: ChartDefinition): void;
    decodeChart(chart: ChartDefinition): void;
    encode(entity: Dashboard): Dashboard;
    decode(entity: Dashboard): Dashboard;
    clone(cd: ChartDefinition): ChartDefinition;
    saveDashboard(entity: Dashboard): Observable<Dashboard>;
    deleteDashboard(id: string): Observable<any>;
    getData(cd: ChartDefinition, component: any, forceRefresh?: boolean, start?: number, showPreviousYear?: boolean): Observable<any>;
    getAggregateQuery(cd: ChartDefinition, collectionName: string, filters?: Filters, options?: Array<any>, forceRefresh?: boolean): Observable<any>;
    getChartCache(id: string): Promise<any>;
    setChartCache(id: string, cache: any): Promise<any>;
    clearChartCache(id: string): Observable<{}>;
    getDataFromCache(cd: ChartDefinition): Promise<any>;
    addDataToCache(cd: ChartDefinition, data: any): Promise<any>;
    getKpiData(cd: ChartDefinition, component: any, forceRefresh?: boolean, showPreviousYear?: boolean): Observable<any>;
    getKpiClass(type: string): any;
    getKpiIcon(type: string): any;
    getKpiIconByType(type: string): any;
    getDataObservable(cd: ChartDefinition, component: any, forceRefresh?: boolean, start?: number, showPreviousYear?: boolean): Observable<any>;
    getChartConfig(cd: ChartDefinition, data: any): any;
    getGridConfig(cd: ChartDefinition, data: any): any;
    getMapConfig(cd: ChartDefinition, data: Array<any>): any;
    getMicroConfig(cd: ChartDefinition, data: any): {
        title: string;
        value: any;
        delta: any;
        info: string;
    };
    getPivotTableConfig(cd: ChartDefinition, data: any): {
        rowHeight: number;
        rowStyle: {
            'line-height': string;
        };
        headerHeight: number;
        defaultColDef: {
            sortable: boolean;
            resizable: boolean;
        };
        suppressTouch: boolean;
    };
    protected campaignsPivotTableKpiSortRows(cd: ChartDefinition, rows: Array<any>): any[];
    getCalendarData(dates: any, data: Array<any>): any;
    getCalendarConfig(cd: ChartDefinition, data: Array<any>): any;
    getHCChartConfig(cd: ChartDefinition, data: any): HighchartsOptions;
    isChartEmpty(config: HighchartsOptions): boolean;
    getChartEmptyImage(config: HighchartsOptions): string;
    getURL(svg: any, width: any, height: any, options?: any): Observable<string>;
    formatSVGs(svgs: Array<string>, maxHeight: number | string, pdfRowWidth?: number): any;
    exportAll(options: any, svgs: Array<string>, maxHeight: any, pdfRowWidth?: number): void;
    getChartIOUrl(dashboardId: string, env?: any): Observable<any>;
    getTableauUrl(dashboardId: string, env?: any): Observable<any>;
    protected applyAreaSplineGradients(cd: ChartDefinition, config: HighchartsOptions): void;
    protected applySubtitleSum(config: HighchartsOptions): void;
    protected applyLegendState(config: HighchartsOptions, cd: ChartDefinition): void;
    protected addCorelationLine(data: Array<{
        x: number;
        y: number;
    }>, config: HighchartsOptions): void;
    protected setHCChartType(cd: ChartDefinition): HighchartsOptions;
    protected setHCUseDates(config: HighchartsOptions): void;
    protected getPalette(cd: ChartDefinition): any;
    protected getNumberFormat(cd: ChartDefinition): string;
    protected getDateTimeIntervalByGroupingDate(groupingDate: string, groupBySlider?: string): any;
    protected getDateTimeFormat(groupingDate: string, groupBySlider?: string): string;
    protected getHCDefaultConfig(cd: ChartDefinition): HighchartsOptions;
    protected getDataLabelFormatter(cd: ChartDefinition): () => string;
    protected useContrast(cd: ChartDefinition): boolean;
    protected getDataLabels(cd: ChartDefinition): {
        enabled: boolean;
        useHTML: boolean;
        style: any;
        formatter: () => string;
    };
    protected getHCDefaultLine(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultSpline(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultArea(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultAreaSpline(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultColumn(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultHeatmap(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultBar(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultPie(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultDoughnut(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultRadar(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultTreemap(cd: ChartDefinition): HighchartsOptions;
    protected getHCDefaultScatter(cd: ChartDefinition): HighchartsOptions;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Colors, CoreConfig, LocalForageService, Utils } from '@shared/common';
import { Broker, Requestor, DashboardCore, BaseKpi, CACHE_KEYS, Cache } from '@shared/data-core';
import { toDate, dateFormat, dateDiff, toMinutes, dateAdd, endOf, day, daysInMonth, getDateOfMonth, getUUID } from '@shared/stencil';
import { CellRenderer } from '../../services/cell-renderer/cell-renderer.service';
//import { DeltaRendererComponent } from '../../renderers/delta/delta-renderer.component';
import { Translate } from '@shared/translate';
import { assign, cloneDeep, defaultsDeep, find, findIndex, forEach, isArray, isNumber, isObject, isString, keys, last, map as _map, max, merge, min, sortBy, sum, sumBy, pick } from 'lodash-es';
import { from, of, throwError } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
/**
 * @record
 */
export function ChartCache() { }
if (false) {
    /** @type {?} */
    ChartCache.prototype.date;
    /** @type {?} */
    ChartCache.prototype.data;
}
var Chart = /** @class */ (function () {
    function Chart(broker, dashboard, rq, translate, localForage, coreConfig, utils, cache) {
        this.broker = broker;
        this.dashboard = dashboard;
        this.rq = rq;
        this.translate = translate;
        this.localForage = localForage;
        this.coreConfig = coreConfig;
        this.utils = utils;
        this.cache = cache;
        this.PDF_ROW_WIDTH = 1200;
        this.PDF_ROW_HEIGHT = 800;
        this.palette0 = ['#04CC99', '#FF625F', '#1FB6FF', '#FC459E', '#FF6402', '#FED05B', '#ADADAD', '#845CFF', '#FC459E', '#000000', '#D0D0D0', '#ADADAD'];
        // ['#3e4666', '#39a0ed', '#36f1cd', '#b0bcff', '#ffe377', '#EDB4CA'];
        this.palette1 = ['#04CC99', '#FF625F', , '#1FB6FF', '#FC459E', '#FF6402', '#FED05B', '#ADADAD', '#845CFF', '#FC459E', '#000000', '#D0D0D0', '#ADADAD'];
        // ['#877def', '#7ddf64', '#f76c6c', '#5bc0eb', '#fde74c', '#404e4d'];
        this.palette2 = ['#04CC99', '#FF625F', , '#1FB6FF', '#FC459E', '#FF6402', '#FED05B', '#ADADAD', '#845CFF', '#FC459E', '#000000', '#D0D0D0', '#ADADAD'];
        // ['#51E3C2', '#4A90E2', '#F9BB4E', '#F76C6C', '#1D977E', '#4ED2B8', '#54CBE1', '#6F87D5', '#C06ADC', '#645098'];
        this.palette3 = ['#04CC99', '#FF625F', , '#1FB6FF', '#FC459E', '#FF6402', '#FED05B', '#ADADAD', '#845CFF', '#FC459E', '#000000', '#D0D0D0', '#ADADAD'];
        // ['#7F8FA4', '#f76c6c', '#32d2b6', '#5bc0eb', '#fdef57', '#877def'];
        this.paletteBoost = ['#F46885', '#FCAE49', '#1FB6FF', '#FC459E', '#FF6402', '#FED05B', '#ADADAD', '#845CFF', '#FC459E', '#000000', '#D0D0D0', '#ADADAD'];
        this.textStyle = {
            fontFamily: 'Lato',
            color: Colors.black,
            fontWeight: '300',
            fontSize: '13px',
            whiteSpace: 'normal',
            textShadow: false
        };
        this.lineColor = '#E1E8EE';
        this.gridLineColor = '#F4F8FC';
        this.decimalPipe = new DecimalPipe(this.translate.getCurrentAngularLocale());
    }
    /**
     * @return {?}
     */
    Chart.prototype.getFilenameSuffix = /**
     * @return {?}
     */
    function () {
        return this.rq.getFilenameSuffix();
    };
    /**
     * @param {?} chart
     * @return {?}
     */
    Chart.prototype.encodeChart = /**
     * @param {?} chart
     * @return {?}
     */
    function (chart) {
        if (chart.aggregateOptions && !isString(chart.aggregateOptions)) {
            chart.aggregateOptions = (/** @type {?} */ (JSON.stringify(chart.aggregateOptions)));
        }
        if (chart.kpiFormValues && chart.kpiFormValues.campaigns) {
            chart.kpiFormValues.campaigns = chart.kpiFormValues.campaigns.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return pick(c, ['title', '_id', 'scoring']); }));
        }
        if (chart.kpiFormValues && chart.kpiFormValues.missionscores) {
            if (chart.kpiFormValues.missionscores.selectedDescription) {
                chart.kpiFormValues.missionscores.selectedDescription = pick(chart.kpiFormValues.missionscores.selectedDescription, ['title', '_id', 'scoring']);
            }
            if (chart.kpiFormValues.missionscores.scores) {
                /** @type {?} */
                var score = chart.kpiFormValues.missionscores.scores;
                if (isArray(score) && ((/** @type {?} */ (score))).length > 0) {
                    score = score[0];
                }
                chart.kpiFormValues.missionscores.scores = pick(score, ['title', 'isActive']);
            }
        }
    };
    /**
     * @param {?} chart
     * @return {?}
     */
    Chart.prototype.decodeChart = /**
     * @param {?} chart
     * @return {?}
     */
    function (chart) {
        if (chart.aggregateOptions && isString(chart.aggregateOptions)) {
            chart.aggregateOptions = (/** @type {?} */ (JSON.parse((/** @type {?} */ (chart.aggregateOptions)))));
        }
        if (((/** @type {?} */ (chart))).aggregateData && isString(((/** @type {?} */ (chart))).aggregateData)) {
            ((/** @type {?} */ (chart))).aggregateData = (/** @type {?} */ (JSON.parse(((/** @type {?} */ (chart))).aggregateData)));
        }
        if (!chart._id) {
            chart._id = getUUID();
        }
    };
    /**
     * @param {?} entity
     * @return {?}
     */
    Chart.prototype.encode = /**
     * @param {?} entity
     * @return {?}
     */
    function (entity) {
        var _this = this;
        if (!entity) {
            return entity;
        }
        /** @type {?} */
        var newentity = cloneDeep(entity);
        forEach(newentity.tabs, (/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) {
            if (tab && tab.items) {
                forEach(tab.items, (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item && item.definition) {
                        _this.encodeChart(item.definition);
                    }
                }));
            }
        }));
        if (newentity.tabs && newentity.tabs.length > 0 && newentity.tabs[0].items && newentity.tabs[0].items.length > 0 && newentity.tabs[0].items[0].definition && newentity.tabs[0].items[0].definition.kpiType) {
            newentity.icon = this.getKpiIcon(newentity.tabs[0].items[0].definition.kpiType);
        }
        return newentity;
    };
    /**
     * @param {?} entity
     * @return {?}
     */
    Chart.prototype.decode = /**
     * @param {?} entity
     * @return {?}
     */
    function (entity) {
        var _this = this;
        forEach(entity.tabs, (/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) {
            forEach(tab.items, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item && item.definition) {
                    _this.decodeChart(item.definition);
                }
            }));
        }));
        return entity;
    };
    /**
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.clone = /**
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        /** @type {?} */
        var newCd = cloneDeep(cd);
        newCd._id = getUUID();
        return newCd;
    };
    /**
     * @param {?} entity
     * @return {?}
     */
    Chart.prototype.saveDashboard = /**
     * @param {?} entity
     * @return {?}
     */
    function (entity) {
        var _this = this;
        /** @type {?} */
        var newEntity = this.encode(entity);
        return this.broker.upsert('dashboards', newEntity).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) { return _this.decode(retVal); })));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    Chart.prototype.deleteDashboard = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.broker.delete('dashboards', id);
    };
    /**
     * @param {?} cd
     * @param {?} component
     * @param {?=} forceRefresh
     * @param {?=} start
     * @param {?=} showPreviousYear
     * @return {?}
     */
    Chart.prototype.getData = /**
     * @param {?} cd
     * @param {?} component
     * @param {?=} forceRefresh
     * @param {?=} start
     * @param {?=} showPreviousYear
     * @return {?}
     */
    function (cd, component, forceRefresh, start, showPreviousYear) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (start === void 0) { start = 0; }
        if (showPreviousYear === void 0) { showPreviousYear = false; }
        return this.getDataObservable(cd, component, forceRefresh, start, showPreviousYear).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            return throwError('error');
        })));
    };
    /**
     * @param {?} cd
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} options
     * @param {?=} forceRefresh
     * @return {?}
     */
    Chart.prototype.getAggregateQuery = /**
     * @param {?} cd
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} options
     * @param {?=} forceRefresh
     * @return {?}
     */
    function (cd, collectionName, filters, options, forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        return from(this.getDataFromCache(cd)).pipe(mergeMap((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return data && forceRefresh !== true ? of(data) : _this.broker.aggregateQuery(collectionName, filters, options);
        })), mergeMap((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return from(_this.addDataToCache(cd, data));
        })));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    Chart.prototype.getChartCache = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.cache.get(CACHE_KEYS.chart, id).toPromise();
        //return this.localForage.get<ChartCache>(CACHE_KEYS.chart + '.' + id);
    };
    /**
     * @param {?} id
     * @param {?} cache
     * @return {?}
     */
    Chart.prototype.setChartCache = /**
     * @param {?} id
     * @param {?} cache
     * @return {?}
     */
    function (id, cache) {
        return this.cache.add(CACHE_KEYS.chart, id, cache);
        //return this.localForage.set<ChartCache>(CACHE_KEYS.chart + '.' + id, cache);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    Chart.prototype.clearChartCache = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.cache.remove(CACHE_KEYS.chart, id);
        //return this.localForage.remove(CACHE_KEYS.chart + '.' + id);
    };
    /**
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getDataFromCache = /**
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        if (cd._id) {
            return this.getChartCache(cd._id).then((/**
             * @param {?} cache
             * @return {?}
             */
            function (cache) {
                if (cache) {
                    if (toMinutes(dateDiff(new Date(), toDate(cache.date))) < 15) {
                        return cache.data;
                    }
                }
                return null;
            }));
        }
        return Promise.resolve(null);
    };
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    Chart.prototype.addDataToCache = /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    function (cd, data) {
        var _this = this;
        if (cd._id) {
            return this.getChartCache(cd._id)
                .then((/**
             * @param {?} cache
             * @return {?}
             */
            function (cache) {
                cache = { date: new Date(), data: cloneDeep(data) };
                return _this.setChartCache(cd._id, cache);
            }))
                .then((/**
             * @return {?}
             */
            function () {
                return data;
            }));
        }
        else {
            return Promise.resolve(data);
        }
    };
    /**
     * @param {?} cd
     * @param {?} component
     * @param {?=} forceRefresh
     * @param {?=} showPreviousYear
     * @return {?}
     */
    Chart.prototype.getKpiData = /**
     * @param {?} cd
     * @param {?} component
     * @param {?=} forceRefresh
     * @param {?=} showPreviousYear
     * @return {?}
     */
    function (cd, component, forceRefresh, showPreviousYear) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (showPreviousYear === void 0) { showPreviousYear = false; }
        /** @type {?} */
        var type = this.getKpiClass(cd.kpiType);
        type.getChartDefinition(cd.kpiFormValues, cd, this.translate);
        if (cd && cd.kpiType === 'ChartIOKpi') {
            return of([]);
        }
        /** @type {?} */
        var aggregate = type.getAggregate(cd.kpiFormValues, this.translate, showPreviousYear);
        if (cd.kpiFormValues.pointPadding) {
            cd.pointPadding = cd.kpiFormValues.pointPadding;
        }
        if (cd.kpiFormValues.numberPrecision) {
            cd.numberPrecision = cd.kpiFormValues.numberPrecision;
        }
        if (aggregate.mapTransform && aggregate.mapTransformAsync) {
            return this.getAggregateQuery(cd, aggregate.collectionName, aggregate.filters, aggregate.aggregateOptions, forceRefresh).pipe(mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                return aggregate.mapTransform(res, cd, _this.broker, component);
            })));
        }
        else {
            return this.getAggregateQuery(cd, aggregate.collectionName, aggregate.filters, aggregate.aggregateOptions, forceRefresh).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                return aggregate.mapTransform ? aggregate.mapTransform(res, cd, _this.broker, component) : res;
            })));
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Chart.prototype.getKpiClass = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return null;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Chart.prototype.getKpiIcon = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return null;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Chart.prototype.getKpiIconByType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return null;
    };
    /**
     * @param {?} cd
     * @param {?} component
     * @param {?=} forceRefresh
     * @param {?=} start
     * @param {?=} showPreviousYear
     * @return {?}
     */
    Chart.prototype.getDataObservable = /**
     * @param {?} cd
     * @param {?} component
     * @param {?=} forceRefresh
     * @param {?=} start
     * @param {?=} showPreviousYear
     * @return {?}
     */
    function (cd, component, forceRefresh, start, showPreviousYear) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (start === void 0) { start = 0; }
        if (showPreviousYear === void 0) { showPreviousYear = false; }
        this.decodeChart(cd);
        if (cd.data) {
            return of(cd.data);
        }
        else if (cd.kpi) {
            return this.getKpiData(cd, component, forceRefresh, showPreviousYear);
        }
        else {
            if (cd.groupByDate) {
                this.dashboard.setTimescale(cd.filters, cd.timescale, cd.dateField || 'finishedDate', cd.endDate);
                /** @type {?} */
                var format = BaseKpi.getDateFormat(cd.dateGrouping);
                if (cd.aggregateOptions && cd.aggregateOptions.length > 0) {
                    return this.getAggregateQuery(cd, cd.collectionName, cd.filters, cd.aggregateOptions, forceRefresh).pipe(map((/**
                     * @param {?} res
                     * @return {?}
                     */
                    function (res) {
                        return cd.mapTransform ? cd.mapTransform(res, cd, _this.broker, component) : res;
                    })));
                }
                else {
                    /** @type {?} */
                    var aggregateOptions = [];
                    if (cd.groupByCampaign) {
                        aggregateOptions.push({
                            $project: {
                                _id: 1,
                                title: '$title',
                                date: {
                                    $dateToString: { format: format, date: '$' + (cd.dateField || 'finishedDate') }
                                }
                            }
                        });
                        aggregateOptions.push({
                            $group: {
                                _id: { date: '$date', title: '$title' },
                                value: { $sum: 1 },
                                keys: { $addToSet: '$_id' }
                            }
                        });
                    }
                    else {
                        /** @type {?} */
                        var match = {};
                        match[cd.dateField || 'finishedDate'] = { $type: 9 };
                        aggregateOptions.push({ $match: match });
                        aggregateOptions.push({
                            $group: {
                                _id: {
                                    $dateToString: { format: format, date: '$' + (cd.dateField || 'finishedDate') }
                                },
                                value: { $sum: 1 },
                                keys: { $addToSet: '$_id' }
                            }
                        });
                    }
                    return this.getAggregateQuery(cd, cd.collectionName, cd.filters, aggregateOptions, forceRefresh);
                }
            }
            else {
                if ((cd.aggregateOptions && cd.aggregateOptions.length > 0) || (cd.filters && cd.filters.length > 0)) {
                    return this.getAggregateQuery(cd, cd.collectionName, cd.filters, cd.aggregateOptions, forceRefresh).pipe(map((/**
                     * @param {?} res
                     * @return {?}
                     */
                    function (res) {
                        return cd.mapTransform ? cd.mapTransform(res, cd, _this.broker, component) : res;
                    })));
                }
                else {
                    return of([]);
                }
            }
        }
    };
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    Chart.prototype.getChartConfig = /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    function (cd, data) {
        return this.getHCChartConfig(cd, data);
    };
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    Chart.prototype.getGridConfig = /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    function (cd, data) {
        var _this = this;
        if (cd.kpiType === 'CampaignsPivotTableKpi') {
            return {
                columnDefs: cd.kpiColumns,
                rowData: data
            };
        }
        /** @type {?} */
        var config = this.getHCChartConfig(cd, data);
        /** @type {?} */
        var columnDefs = [
            {
                headerName: cd.groupByDate ? this.translate.get('DATE') : this.translate.get('CATEGORY'),
                field: 'key'
            }
        ];
        if (cd.groupByDate) {
            columnDefs[0].comparator = 'dateComparator';
        }
        /** @type {?} */
        var rows = new Map();
        config.series.forEach((/**
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        function (s, i) {
            if (s.name === 'Regression') {
                return;
            }
            columnDefs.push((/** @type {?} */ ({
                headerName: s.name,
                field: 'serie' + i,
                headerTooltip: s.name,
                minWidth: 40
            })));
            if (cd.type === 'scatter') {
                columnDefs.push((/** @type {?} */ ({
                    headerName: s.name,
                    field: 'seriex' + i,
                    headerTooltip: s.name + ': x',
                    minWidth: 40
                })));
            }
            if (cd.showDelta) {
                last(columnDefs).cellRenderer = 'deltaRenderer'; //DeltaRendererComponent.renderer;
            }
            forEach(((/** @type {?} */ (s))).data, (/**
             * @param {?} d
             * @param {?} index
             * @return {?}
             */
            function (d, index) {
                /** @type {?} */
                var key;
                /** @type {?} */
                var value;
                /** @type {?} */
                var x;
                if (isArray(d)) {
                    key = dateFormat(toDate(d[0]), 'L');
                    value = d[1];
                }
                else if (isObject(d) && d.name) {
                    key = d.name;
                    value = d.y;
                    if (cd.type === 'scatter') {
                        x = d.x;
                    }
                }
                else if (isObject(d) && d.x) {
                    key = dateFormat(toDate(d.x), 'L');
                    value = d.y;
                }
                else if (config.xAxis && ((/** @type {?} */ (config.xAxis))).categories && ((/** @type {?} */ (config.xAxis))).categories.length > 0) {
                    key = ((/** @type {?} */ (config.xAxis))).categories[index];
                    value = d;
                }
                if (key) {
                    /** @type {?} */
                    var row = rows.get(key) || { key: key };
                    row['serie' + i] = isNumber(value) ? _this.decimalPipe.transform(value, _this.getNumberFormat(cd)) : value && value.toString ? value.toString() : value;
                    if (cd.type === 'scatter') {
                        row['seriex' + i] = x;
                    }
                    rows.set(key, row);
                }
            }));
        }));
        return {
            columnDefs: columnDefs,
            rowData: Array.from(rows.values())
        };
    };
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    Chart.prototype.getMapConfig = /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    function (cd, data) {
        return null;
    };
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    Chart.prototype.getMicroConfig = /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    function (cd, data) {
        /** @type {?} */
        var value;
        /** @type {?} */
        var delta;
        if (isArray(data)) {
            value = Math.round(data && data.length > 0 ? ((/** @type {?} */ (data)))[0].value : 0);
        }
        else {
            value = data.value;
            delta = data.delta;
        }
        return {
            title: cd.title,
            value: value,
            delta: delta,
            info: cd.microInfo
        };
    };
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    Chart.prototype.getPivotTableConfig = /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    function (cd, data) {
        /** @type {?} */
        var gridConfig = this.getGridConfig(cd, data);
        /** @type {?} */
        var gridOptions = {
            rowHeight: 52,
            rowStyle: { 'line-height': '32px' },
            headerHeight: 40,
            defaultColDef: { sortable: true, resizable: true },
            //dateComponent: null,
            suppressTouch: true
        };
        assign(gridOptions, {
            filter: true,
            //showToolPanel: false,
            pivotPanelShow: false,
            //toolPanelSuppressSideButtons: true,
            rowSelection: 'single',
            columnDefs: gridConfig.columnDefs,
            rowData: gridConfig.rowData
        });
        //row sorting
        if (cd.kpiType === 'CampaignsPivotTableKpi') {
            assign(gridOptions, CellRenderer.getPivotConfig(this.translate));
            assign(gridOptions, {
                pivotMode: cd.gridPivotMode //,
                //onModelUpdated: (event) => this.onGridModelUpdated(event)
            });
            gridConfig.rows = this.campaignsPivotTableKpiSortRows(cd, gridConfig.rows);
            //     if (!this.showFullscreen) {
            //         gridOptions.columnDefs.unshift({
            //             headerName: this.translate.get('VIEW'),
            //             colId: 'viewButton',
            //             groupId: 'view',
            //             width: 70,
            //             headerClass: 'centered',
            //             cellClass: 'overflow',
            //             suppressExport: true,
            //             sortable: false,
            //             suppressFilter: true,
            //             pinned: 'left',
            //             menuTabs: ['filterMenuTab'],
            //             context: {
            //                 icon: 'yo-eye',
            //                 color: 'dark',
            //                 text: this.translate.get('VIEW')
            //             },
            //             cellRendererFramework: ButtonRendererComponent,
            //             onCellClicked: (params) => {
            //                 let keys;
            //                 if (params.data && params.data._id) {
            //                     keys = [params.data._id];
            //                 } else if (params && params.node && params.node.allLeafChildren) {
            //                     keys = params.node.allLeafChildren.map(c => c.data._id);
            //                 }
            //                 if (keys && keys.length > 0) {
            //                     if (this.coreConfig.isWeb()) {
            //                         this.doubleClick.emit(keys);
            //                     } else {
            //                         this.clicked.emit({ keys });
            //                     }
            //                 }
            //                 return false;
            //             }
            //         });
            //     }
            //
        }
        return gridOptions;
    };
    /**
     * @protected
     * @param {?} cd
     * @param {?} rows
     * @return {?}
     */
    Chart.prototype.campaignsPivotTableKpiSortRows = /**
     * @protected
     * @param {?} cd
     * @param {?} rows
     * @return {?}
     */
    function (cd, rows) {
        /** @type {?} */
        var sorts = [];
        for (var i = 1; i <= 5; i++) {
            /** @type {?} */
            var columnName = 'tagGroup' + i;
            if (cd.kpiFormValues[columnName]) {
                sorts.push(columnName);
            }
        }
        if (sorts.length > 0) {
            return sortBy(rows, sorts);
        }
        else {
            return rows;
        }
    };
    /**
     * @param {?=} dates
     * @param {?=} data
     * @return {?}
     */
    Chart.prototype.getCalendarData = /**
     * @param {?=} dates
     * @param {?=} data
     * @return {?}
     */
    function (dates, data) {
        if (dates === void 0) { dates = null; }
        if (dates === null) {
            return {};
        }
        // need to get dates from the component
        /** @type {?} */
        var timeSpan = dates.amount - 1;
        /** @type {?} */
        var timeScale = dates.timescale;
        /** @type {?} */
        var outputData = [];
        /** @type {?} */
        var xAxis = [];
        if (data && data.length > 0) {
            /** @type {?} */
            var currentDate = toDate(data[0]._id);
            /** @type {?} */
            var stopDate = endOf(dateAdd(toDate(data[0]._id), timeScale, timeSpan), timeScale);
            /** @type {?} */
            var weekNumber = 0;
            /** @type {?} */
            var dayToY = [0, 6, 5, 4, 3, 2, 1];
            var _loop_1 = function () {
                /** @type {?} */
                var stringDate = dateFormat(toDate(currentDate), 'YYYY-MM-dd');
                /** @type {?} */
                var retVal = {
                    _id: stringDate,
                    x: weekNumber,
                    y: dayToY[day(toDate(currentDate))],
                    value: 0,
                    keys: null,
                    date: stringDate
                };
                /** @type {?} */
                var v = find(data, (/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s._id === stringDate; }));
                if (v) {
                    retVal.keys = v.keys;
                    retVal.value = v.value;
                }
                outputData.push(retVal);
                // Beginning of month
                if (getDateOfMonth(toDate(currentDate)) === 1) {
                    xAxis.push(dateFormat(toDate(currentDate), 'MMM'));
                }
                // End of month
                if (getDateOfMonth(toDate(currentDate)) === daysInMonth(toDate(currentDate))) {
                    weekNumber++; // skip one column
                    xAxis.push('');
                    weekNumber++; // start on a new column
                    // End of week
                }
                else {
                    if (retVal.y <= 0) {
                        // end of week
                        weekNumber++;
                        xAxis.push('');
                    }
                }
                currentDate = dateAdd(toDate(currentDate), 'days', 1);
            };
            while (currentDate <= stopDate) {
                _loop_1();
            }
        }
        return { data: outputData, xAxis: xAxis };
    };
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    Chart.prototype.getCalendarConfig = /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    function (cd, data) {
        /** @type {?} */
        var config = this.setHCChartType(cd);
        /** @type {?} */
        var chartData = this.getCalendarData(cd.kpiFormValues.dates, data);
        config.chart.marginTop = -8;
        config.chart.marginLeft = 10;
        config.chart.marginBottom = 0;
        config.chart.spacing = [0, -2, 10, 0];
        config.legend = Object.assign(config.legend, {
            enabled: true,
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            symbolHeight: 100,
            itemMarginTop: 20
        });
        config.yAxis = (/** @type {?} */ ({
            visible: false,
            min: 0,
            max: 6,
            labels: {
                fontSize: '13px'
            }
        }));
        config.xAxis = (/** @type {?} */ ({
            visible: true,
            categories: chartData.xAxis,
            opposite: true,
            lineWidth: 0,
            tickWidth: 0,
            min: 0,
            max: 17,
            labels: {
                align: 'center',
                autoRotation: false,
                y: 20,
                fontSize: '13px'
            }
        }));
        config.plotOptions.series = Object.assign(config.plotOptions.series, {
            borderColor: '#FFFFFF',
            borderRadius: 6,
            borderWidth: 4,
            maxPointWidth: 15,
            pointWidth: 15
        });
        config.colorAxis = {
            min: 0,
            stops: [[0, '#f1f1f1'], [0.001, '#c6e6df'], [0.2, '#a9ded3'], [0.4, '#8cd6c8'], [0.6, '#6fcebc'], [0.8, '#44C3AA']]
        };
        config.tooltip.formatter = (/**
         * @return {?}
         */
        function () {
            return dateFormat(toDate(((/** @type {?} */ (this.point))).date), 'MMM DD, YYYY dddd') + '<br><br>' + ((/** @type {?} */ (this.point))).value + ' users';
        });
        config.series = (/** @type {?} */ ([{ data: chartData.data }]));
        return config;
    };
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    Chart.prototype.getHCChartConfig = /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    function (cd, data) {
        this.textStyle = {
            fontFamily: 'Lato',
            color: Colors.black,
            fontWeight: '300',
            fontSize: '13px',
            whiteSpace: 'normal',
            textShadow: false
        };
        /** @type {?} */
        var config = this.setHCChartType(cd);
        /** @type {?} */
        var originalData = data;
        if (!isArray(data)) {
            return;
        }
        if (cd.groupByDate && cd.type !== 'pie') {
            this.setHCUseDates(config);
            if (cd.groupByCampaign) {
                /* beautify ignore:start */
                /** @type {?} */
                var series_1 = new Map();
                /* beautify ignore:end */
                data.forEach((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    /** @type {?} */
                    var s = series_1.get(d._id.title) || { name: d._id.title, data: [] };
                    /** @type {?} */
                    var date = BaseKpi.fixDates(cd, d._id.date);
                    s.data.push({ x: date, y: d.value, color: d.color, keys: d.keys });
                    series_1.set(d._id.title, s);
                }));
                config.series = Array.from(series_1.values());
                config.series.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return (s.data = sortBy((/** @type {?} */ (s.data)), (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.x; }))); }));
            }
            else {
                config.series = (/** @type {?} */ ([
                    {
                        name: cd.title,
                        data: sortBy(data.map((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            /** @type {?} */
                            var date = BaseKpi.fixDates(cd, d._id);
                            return { x: date, y: d.value, color: d.color, keys: d.keys };
                        })), (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return d.x; }))
                    }
                ]));
            }
        }
        else if (cd.type === 'treemap') {
            if (isArray(data)) {
                config.series = (/** @type {?} */ ([
                    {
                        layoutAlgorithm: 'squarified',
                        data: _map(data, (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return ({ name: d._id, value: d.value, colorValue: d.value }); }))
                    }
                ]));
            }
        }
        else if (cd.type === 'scatter') {
            config.series = (/** @type {?} */ ([
                {
                    name: cd.title,
                    data: data
                }
            ]));
            //add option to disable regression
            if (!cd.hideRegression) {
                this.addCorelationLine((/** @type {?} */ (data)), config);
            }
        }
        else {
            /** @type {?} */
            var series_2 = new Map();
            /** @type {?} */
            var categories_1 = new Set();
            if (isArray(data) && data.length > 0 && (((/** @type {?} */ (data[0]))).serie || ((/** @type {?} */ (data[0]))).serie === 0)) {
                forEach(data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    /** @type {?} */
                    var serie = series_2.get(d.serie) || {};
                    serie[d._id] = { y: d.value, keys: d.keys };
                    categories_1.add(d._id);
                    series_2.set(d.serie, serie);
                }));
                config.xAxis = Object.assign(config.xAxis || {}, {
                    categories: sortBy(Array.from(categories_1.values()), (/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return x; })),
                    crosshair: true
                });
            }
            else {
                if (isArray(data)) {
                    data = ((/** @type {?} */ (data))).reduce((/**
                     * @param {?} acc
                     * @param {?} memo
                     * @return {?}
                     */
                    function (acc, memo) {
                        acc[memo._id] = { y: memo.value, keys: memo.keys };
                        return acc;
                    }), {});
                }
                else {
                    delete ((/** @type {?} */ (data))).value;
                }
                config.xAxis = Object.assign(config.xAxis || {}, {
                    categories: _map(data, (/**
                     * @param {?} v
                     * @param {?} l
                     * @return {?}
                     */
                    function (v, l) {
                        return l;
                    })),
                    crosshair: true
                });
                series_2.set(cd.title, data);
            }
            config.series = [];
            /** @type {?} */
            var width_1 = 100 / series_2.size;
            series_2.forEach((/**
             * @param {?} serie
             * @param {?} name
             * @return {?}
             */
            function (serie, name) {
                /** @type {?} */
                var index = config.series.length + 1;
                //fill in missing data
                if (config.xAxis && ((/** @type {?} */ (config.xAxis))).categories) {
                    ((/** @type {?} */ (config.xAxis))).categories.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        if (!serie[c]) {
                            serie[c] = null;
                        }
                    }));
                }
                config.series.push((/** @type {?} */ ({
                    name: name,
                    size: (width_1 * 0.7).toString() + '%',
                    center: [(width_1 * index - width_1 / 2).toString() + '%', null],
                    data: cd.type === 'radar'
                        ? _map((/** @type {?} */ (((/** @type {?} */ (config.xAxis))).categories)), (/**
                         * @param {?} c
                         * @return {?}
                         */
                        function (c) {
                            return serie[c];
                        }))
                        : sortBy(_map((/** @type {?} */ (serie)), (/**
                         * @param {?} v
                         * @param {?} l
                         * @return {?}
                         */
                        function (v, l) {
                            return assign({ name: l }, v);
                        })), (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            //we have to map to string because the object keys we re getting back are string
                            return ((/** @type {?} */ (config.xAxis))).categories.map((/**
                             * @param {?} x
                             * @return {?}
                             */
                            function (x) { return x.toString(); })).indexOf(d.name);
                        }))
                })));
            }));
        }
        config.series.forEach((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            originalData.forEach((/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                if (s.name === o.serie || s.name === o._id) {
                    s.color = o.color;
                    if (o.textColor) {
                        s.dataLabels = s.dataLabels || {};
                        s.dataLabels.color = o.textColor;
                    }
                    s.index = s.index || 0;
                    s.index = -o.index;
                    s.legendIndex = o.index;
                }
                if (cd.colors) {
                    keys(cd.colors).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) {
                        if (s.name && s.name.toString() === k.toString()) {
                            s.color = cd.colors[k];
                        }
                    }));
                }
                if (isArray(s.data)) {
                    ((/** @type {?} */ (s.data))).forEach((/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) {
                        if (d && (d.name === o.serie || (!o.serie && d.name === o._id)) && !d.color) {
                            d.color = o.color;
                            d.index = d.index || 0;
                            d.index = -o.index;
                            d.legendIndex = o.index;
                        }
                        if (cd.colors) {
                            keys(cd.colors).forEach((/**
                             * @param {?} k
                             * @return {?}
                             */
                            function (k) {
                                if (d.name && d.name.toString() === k.toString()) {
                                    d.color = cd.colors[k];
                                }
                            }));
                        }
                    }));
                }
            }));
            if (cd.showCumulate) {
                //let serieData = cloneDeep((<any>s.data));
                for (var i = 1; i < s.data.length; i++) {
                    ((/** @type {?} */ (s.data)))[i].y += ((/** @type {?} */ (s.data[i - 1]))).y || 0;
                }
            }
            if (s.name && s.name.indexOf('N-1') >= 0) {
                s.color = Colors.stable;
            }
        }));
        this.applyAreaSplineGradients(cd, config);
        this.applySubtitleSum(config);
        this.applyLegendState(config, cd);
        return config;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    Chart.prototype.isChartEmpty = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        if (!config.series || (config.series.length === 1 && (!((/** @type {?} */ (config.series[0]))).data || ((/** @type {?} */ (config.series[0]))).data.length === 0))) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    Chart.prototype.getChartEmptyImage = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var emptyImage = './images/empty-states/speedometer.svg';
        if (config && config.chart && config.chart.type) {
            switch ((/** @type {?} */ (config.chart.type))) {
                case 'line':
                    emptyImage = '../kpi/lines.svg';
                    break;
                case 'spline':
                    emptyImage = '../kpi/splines.svg';
                    break;
                case 'area':
                    emptyImage = '../kpi/splineroyal.svg';
                    break;
                case 'areaspline':
                    emptyImage = '../kpi/splineroyal.svg';
                    break;
                case 'column':
                    emptyImage = '../kpi/column.svg';
                    break;
                case 'bar':
                    emptyImage = '../kpi/column.svg';
                    break;
                case 'radar':
                case 'treemap':
                case 'pie':
                case 'doughnut':
                default:
                    emptyImage = '../kpi/pie.svg';
                    break;
            }
        }
        return emptyImage;
    };
    /**
     * @param {?} svg
     * @param {?} width
     * @param {?} height
     * @param {?=} options
     * @return {?}
     */
    Chart.prototype.getURL = /**
     * @param {?} svg
     * @param {?} width
     * @param {?} height
     * @param {?=} options
     * @return {?}
     */
    function (svg, width, height, options) {
        var _this = this;
        /** @type {?} */
        var type = 'image/png';
        /** @type {?} */
        var config = {
            filename: options ? options.filename : null,
            type: type,
            async: true,
            scale: 2,
            width: width * 2,
            height: height * 2,
            svg: svg
        };
        /** @type {?} */
        var exportUrl = 'https://export.highcharts.com/';
        return this.rq.postMultiPart(exportUrl, config).pipe(mergeMap((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var url = exportUrl + res;
            return _this.rq.getBinaryContent(url);
        })), mergeMap((/**
         * @param {?} arrayBuffer
         * @return {?}
         */
        function (arrayBuffer) {
            /** @type {?} */
            var blob = new Blob([arrayBuffer], { type: type });
            return from(_this.broker.upload(blob));
        })), map((/**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            return url;
        })));
    };
    /**
     * @param {?} svgs
     * @param {?} maxHeight
     * @param {?=} pdfRowWidth
     * @return {?}
     */
    Chart.prototype.formatSVGs = /**
     * @param {?} svgs
     * @param {?} maxHeight
     * @param {?=} pdfRowWidth
     * @return {?}
     */
    function (svgs, maxHeight, pdfRowWidth) {
        if (pdfRowWidth === void 0) { pdfRowWidth = 1200; }
        svgs = [].concat(svgs);
        /** @type {?} */
        var svg;
        if (svgs.length === 1) {
            svg = svgs[0];
        }
        else {
            svg = '<svg height="' + maxHeight + '" width="' + pdfRowWidth + '" version="1.1" xmlns="http://www.w3.org/2000/svg">';
            svg += svgs.join('');
            svg += '</svg>';
        }
        return svg
            .replace(/visby/gi, 'Lato')
            .replace(/text-shadow/gi, 'ttext-shadow')
            .replace(/class="highcharts-text-outline" fill="#000000" stroke="#000000" stroke-width="2px"/gi, 'class="highcharts-text-outline" fill="#7F8FA4" stroke="#7F8FA4" stroke-width="1px"');
    };
    /**
     * @param {?} options
     * @param {?} svgs
     * @param {?} maxHeight
     * @param {?=} pdfRowWidth
     * @return {?}
     */
    Chart.prototype.exportAll = /**
     * @param {?} options
     * @param {?} svgs
     * @param {?} maxHeight
     * @param {?=} pdfRowWidth
     * @return {?}
     */
    function (options, svgs, maxHeight, pdfRowWidth) {
        var _this = this;
        if (pdfRowWidth === void 0) { pdfRowWidth = 1200; }
        /** @type {?} */
        var svg = this.formatSVGs(svgs, maxHeight);
        options = merge({
            type: 'image/png',
            url: 'https://export.highcharts.com/',
            printMaxWidth: 780,
            scale: 2,
            buttons: {
                contextButton: {
                    className: 'highcharts-contextbutton',
                    menuClassName: 'highcharts-contextmenu',
                    symbol: 'menu',
                    _titleKey: 'contextButtonTitle',
                    menuItems: [{ textKey: 'printChart' }, { separator: true }, { textKey: 'downloadPNG' }, { textKey: 'downloadJPEG' }, { textKey: 'downloadSVG' }, { textKey: 'downloadPDF' }]
                }
            },
            libURL: 'https://code.highcharts.com/5.0.10/lib/'
        }, options);
        this.rq
            .postRaw('https://export.highcharts.com', {
            filename: options.filename || 'chart',
            type: options.type,
            scale: 1,
            width: pdfRowWidth,
            //height: this.PDF_ROW_HEIGHT,
            svg: svg
        }, true)
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res && res.body) {
                _this.rq.saveArrayBuffer(res.body, (options.filename || 'chart') + '.pdf');
            }
        }));
    };
    /**
     * @param {?} dashboardId
     * @param {?=} env
     * @return {?}
     */
    Chart.prototype.getChartIOUrl = /**
     * @param {?} dashboardId
     * @param {?=} env
     * @return {?}
     */
    function (dashboardId, env) {
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'dashboards/getToken';
        return this.rq.post(url, { dashboardId: dashboardId, env: env || {} }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            return retVal;
        })));
    };
    /**
     * @param {?} dashboardId
     * @param {?=} env
     * @return {?}
     */
    Chart.prototype.getTableauUrl = /**
     * @param {?} dashboardId
     * @param {?=} env
     * @return {?}
     */
    function (dashboardId, env) {
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'tableau/getViewUrl';
        return this.rq.post(url, { path: dashboardId }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            return retVal;
        })));
    };
    /**
     * @protected
     * @param {?} cd
     * @param {?} config
     * @return {?}
     */
    Chart.prototype.applyAreaSplineGradients = /**
     * @protected
     * @param {?} cd
     * @param {?} config
     * @return {?}
     */
    function (cd, config) {
        if (config.chart && config.chart.type === 'areaspline') {
            /** @type {?} */
            var palette_1 = this.getPalette(cd);
            /** @type {?} */
            var alpha_1 = 0.15;
            config.series.forEach((/**
             * @param {?} s
             * @param {?} i
             * @return {?}
             */
            function (s, i) {
                var _a = tslib_1.__read(palette_1[i].match(/\w\w/g).map((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return parseInt(x, 16); })), 3), r = _a[0], g = _a[1], b = _a[2];
                s.fillColor = "rgba(" + r + "," + g + "," + b + "," + alpha_1 + ")";
                s.dataLabels = s.dataLabels || {};
                s.dataLabels.color = Colors.black;
                //     color: '#04CC99'
                //     linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                //     stops: [[0, s.color || palette[i % (palette.length - 1)]], [1, 'rgba(255,255,255,0)']]
                // };
            }));
        }
    };
    /**
     * @protected
     * @param {?} config
     * @return {?}
     */
    Chart.prototype.applySubtitleSum = /**
     * @protected
     * @param {?} config
     * @return {?}
     */
    function (config) {
        if (config.chart && config.chart.type === 'areaspline' && config.series.length === 1) {
            /** @type {?} */
            var subtitleSum = sumBy(((/** @type {?} */ (config.series[0]))).data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d[1]; }));
            if (subtitleSum) {
                config.subtitle = {
                    text: subtitleSum.toLocaleString(),
                    style: defaultsDeep({ fontSize: '18px', fontWeight: 300, color: Colors.black }, this.textStyle),
                    align: 'right'
                };
            }
        }
    };
    /**
     * @protected
     * @param {?} config
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.applyLegendState = /**
     * @protected
     * @param {?} config
     * @param {?} cd
     * @return {?}
     */
    function (config, cd) {
        if (cd.chartLegendState) {
            forEach(config.series, (/**
             * @param {?} s
             * @return {?}
             */
            function (s) {
                if (s && s.name === false) {
                    s.visible = false;
                }
                if (isArray(s.data)) {
                    ((/** @type {?} */ (s.data))).forEach((/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) {
                        if (d && cd.chartLegendState[d.name] === false) {
                            d.visible = false;
                        }
                    }));
                }
            }));
        }
    };
    /**
     * @protected
     * @param {?} data
     * @param {?} config
     * @return {?}
     */
    Chart.prototype.addCorelationLine = /**
     * @protected
     * @param {?} data
     * @param {?} config
     * @return {?}
     */
    function (data, config) {
        /** @type {?} */
        var n = data.length;
        /** @type {?} */
        var sx = sum(data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.x; })));
        /** @type {?} */
        var sy = sum(data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.y; })));
        /** @type {?} */
        var sxy = sum(data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.x * d.y; })));
        /** @type {?} */
        var sx2 = sum(data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.x * d.x; })));
        /** @type {?} */
        var a = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
        /** @type {?} */
        var b = (sy - a * sx) / n;
        /** @type {?} */
        var minx = min(data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.x; })));
        /** @type {?} */
        var maxx = max(data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.x; })));
        config.series.push((/** @type {?} */ ({
            type: 'line',
            name: 'Regression',
            color: Colors.black,
            data: [[minx, a * minx + b], [maxx, a * maxx + b]],
            marker: { enabled: false },
            enableMouseTracking: false
        })));
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.setHCChartType = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        /** @type {?} */
        var config = this.getHCDefaultConfig(cd);
        switch (cd.type) {
            case 'line':
                config = merge(config, this.getHCDefaultLine(cd));
                break;
            case 'spline':
                config = merge(config, this.getHCDefaultSpline(cd));
                break;
            case 'area':
                config = merge(config, this.getHCDefaultArea(cd));
                break;
            case 'areaspline':
                config = merge(config, this.getHCDefaultAreaSpline(cd));
                break;
            case 'bar':
                config = merge(config, this.getHCDefaultBar(cd));
                break;
            case 'column':
                config = merge(config, this.getHCDefaultColumn(cd));
                break;
            case 'heatmap':
                config = merge(config, this.getHCDefaultHeatmap(cd));
                break;
            case 'doughnut':
                config = merge(config, this.getHCDefaultDoughnut(cd));
                break;
            case 'pie':
                config = merge(config, this.getHCDefaultPie(cd));
                break;
            case 'radar':
                config = merge(config, this.getHCDefaultRadar(cd));
                break;
            case 'treemap':
                config = merge(config, this.getHCDefaultTreemap(cd));
                break;
            case 'scatter':
                config = merge(config, this.getHCDefaultScatter(cd));
                break;
        }
        config.legend.enabled = cd.showLegend === true;
        if (cd.marginBottom) {
            config.chart.marginBottom = cd.marginBottom;
        }
        if (cd.legendVerticalAlign) {
            config.legend.verticalAlign = cd.legendVerticalAlign;
        }
        if (cd.legendAlign) {
            config.legend.align = cd.legendAlign;
        }
        if (cd.legendWidth) {
            config.legend.width = cd.legendWidth;
            config.legend.itemMarginBottom = 5;
        }
        // if (cd.hideAxis) {
        //     config.chart.marginTop = -5;
        //     config.chart.marginLeft = -5;
        //     config.chart.marginRight = -5;
        //     config.chart.marginBottom = -5;
        // }
        delete config.chart.margin;
        delete config.chart.marginTop;
        delete config.chart.marginLeft;
        delete config.chart.marginRight;
        delete config.chart.marginBottom;
        if (cd.showLabelsY === false && config.yAxis && ((/** @type {?} */ (config.yAxis))).labels) {
            ((/** @type {?} */ (config.yAxis))).labels.enabled = false;
        }
        //config.title.text = cd.title;
        return config;
    };
    /**
     * @protected
     * @param {?} config
     * @return {?}
     */
    Chart.prototype.setHCUseDates = /**
     * @protected
     * @param {?} config
     * @return {?}
     */
    function (config) {
        config.xAxis = config.xAxis || {};
        config.chart.zoomType = 'x';
        config.chart.panning = true;
        config.chart.panKey = 'shift';
        //delete config.tooltip.formatter;
        ((/** @type {?} */ (config.xAxis))).type = 'datetime';
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getPalette = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        if (!cd || !cd.palette || !this[cd.palette]) {
            return this.palette0;
        }
        return this[cd.palette];
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getNumberFormat = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        if (cd.numberPrecision && cd.numberPrecision >= 1) {
            return '1.0-' + (Math.floor(cd.numberPrecision) || 0);
        }
        return '1.0-0';
    };
    /**
     * @protected
     * @param {?} groupingDate
     * @param {?=} groupBySlider
     * @return {?}
     */
    Chart.prototype.getDateTimeIntervalByGroupingDate = /**
     * @protected
     * @param {?} groupingDate
     * @param {?=} groupBySlider
     * @return {?}
     */
    function (groupingDate, groupBySlider) {
        if (groupBySlider === void 0) { groupBySlider = ''; }
        /** @type {?} */
        var BASE_HOUR_MILLISECOND = 3600 * 1000;
        // 3 600 000
        /** @type {?} */
        var BASE_DAY_MILLISECOND = 24 * BASE_HOUR_MILLISECOND;
        // 86 400 000
        /** @type {?} */
        var BASE_WEEK_MILLISECOND = 7 * BASE_DAY_MILLISECOND;
        // 604 800 000
        /** @type {?} */
        var BASE_MONTH_MILISECOND = 30 * BASE_DAY_MILLISECOND;
        // 259 200 000
        /** @type {?} */
        var BASE_GROUPING_DATE_MILISECOND = {
            hour: BASE_HOUR_MILLISECOND,
            day: BASE_DAY_MILLISECOND,
            week: BASE_WEEK_MILLISECOND,
            month: BASE_MONTH_MILISECOND
        };
        if (groupBySlider && groupBySlider === '3months') {
            return BASE_GROUPING_DATE_MILISECOND['month'];
        }
        return BASE_GROUPING_DATE_MILISECOND[groupingDate];
    };
    /**
     * @protected
     * @param {?} groupingDate
     * @param {?=} groupBySlider
     * @return {?}
     */
    Chart.prototype.getDateTimeFormat = /**
     * @protected
     * @param {?} groupingDate
     * @param {?=} groupBySlider
     * @return {?}
     */
    function (groupingDate, groupBySlider) {
        if (groupBySlider === void 0) { groupBySlider = ''; }
        /** @type {?} */
        var BASE_GROUPING_DATE_HCFORMAT = {
            hour: '%H:%M',
            day: '%e. %b',
            week: '%e. %b',
            month: '%b'
        };
        if (groupBySlider && groupBySlider === '3months') {
            return '{value:' + BASE_GROUPING_DATE_HCFORMAT['month'] + '}';
        }
        return '{value:' + BASE_GROUPING_DATE_HCFORMAT[groupingDate] + '}';
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultConfig = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        /** @type {?} */
        var chartService = this;
        /** @type {?} */
        var groupBySlider = cd.kpiFormValues && cd.kpiFormValues.groupBySlider;
        /** @type {?} */
        var isSalesDatasKpi = cd.kpiType && cd.kpiType === 'SalesDatasKpi';
        return (/** @type {?} */ ({
            title: {
                text: cd.title,
                style: defaultsDeep({ fontSize: '14px', fontWeight: 400, color: Colors.black }, this.textStyle),
                align: 'right'
            },
            chart: {
                style: { fontFamily: 'Lato' },
                backgroundColor: null,
                resetZoomButton: {
                    theme: {
                        fill: 'white',
                        stroke: Colors.black,
                        style: this.textStyle
                    }
                }
            },
            xAxis: cd.type === 'radar'
                ? { labels: { style: defaultsDeep({ color: Colors.black }, this.textStyle) } }
                : {
                    visible: !cd.hideAxis,
                    lineWidth: cd.hideAxis ? 0 : 1,
                    lineColor: this.lineColor,
                    gridLineWidth: 0,
                    //padding: 0,
                    gridLineColor: this.gridLineColor,
                    labels: {
                        autoRotation: [-90],
                        padding: 10,
                        style: defaultsDeep({ color: Colors.black }, this.textStyle),
                        format: isSalesDatasKpi ? this.getDateTimeFormat(cd.dateGrouping, groupBySlider) : null
                    },
                    max: cd.maxX,
                    tickInterval: isSalesDatasKpi ? this.getDateTimeIntervalByGroupingDate(cd.dateGrouping, groupBySlider) : null
                },
            yAxis: cd.type === 'radar'
                ? { labels: { style: defaultsDeep({ color: Colors.black }, this.textStyle) } }
                : {
                    visible: !cd.hideAxis,
                    title: '',
                    lineWidth: cd.hideAxis ? 0 : 1,
                    lineColor: this.lineColor,
                    gridLineWidth: cd.hideAxis ? 0 : 1,
                    gridLineColor: this.gridLineColor,
                    //padding: 0,
                    labels: { style: defaultsDeep({ color: Colors.black }, this.textStyle) },
                    endOnTick: false,
                    maxPadding: 0.2,
                    max: cd.maxY
                },
            colors: this.getPalette(cd),
            legend: {
                enabled: false,
                itemStyle: defaultsDeep({ fontSize: '14px', lineHeight: '14px', fontWeight: 400, color: Colors.black }, this.textStyle),
                //ackgroundColor: '#F1F1F1',
                labelFormatter: (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var retVal = '';
                    if (this.yData && this.yData.length > 0) {
                        /** @type {?} */
                        var total = 0;
                        if (cd.showCumulate) {
                            total = (/** @type {?} */ (max(this.yData)));
                        }
                        else if (!cd.legendValue || cd.legendValue === 'sum') {
                            total = sum(this.yData);
                        }
                        else if (cd.legendValue === 'avg') {
                            total = sum(this.yData) / this.yData.length;
                        }
                        else if (cd.legendValue === 'min') {
                            total = (/** @type {?} */ (min(this.yData)));
                        }
                        else if (cd.legendValue === 'max') {
                            total = (/** @type {?} */ (max(this.yData)));
                        }
                        retVal = this.name + ': ' + chartService.decimalPipe.transform(total, chartService.getNumberFormat(cd));
                    }
                    else if (this.y) {
                        retVal = this.name + ': ' + chartService.decimalPipe.transform(this.y, chartService.getNumberFormat(cd));
                    }
                    else {
                        retVal = this.name;
                    }
                    if (cd.unit) {
                        retVal += ' ' + cd.unit;
                    }
                    return retVal;
                })
            },
            plotOptions: {
                series: (/** @type {?} */ ({
                    turboThreshold: 0,
                    groupPadding: 0,
                    pointPadding: cd.pointPadding || (cd.colorByPoint ? 0 : 0.1),
                    stacking: cd.stacked,
                    allowPointSelect: cd.allowPointSelect || false,
                    marker: {
                        enabled: true,
                        states: { select: { fillColor: Colors.success } }
                    },
                    states: { select: { color: Colors.success } },
                    animation: !this.coreConfig.isWeb(),
                    dataLabels: {
                        color: Colors.black
                    }
                }))
            },
            credits: { enabled: false },
            exporting: { enabled: false },
            tooltip: {
                followTouchMove: false,
                style: defaultsDeep({}, this.textStyle),
                backgroundColor: Colors.stable,
                borderRadius: 0,
                shadow: false,
                borderColor: this.lineColor,
                useHTML: false,
                formatter: (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var name = (this.series ? this.series.name : '') || '';
                    if (name && name !== ' ') {
                        name += '<br/>';
                    }
                    /** @type {?} */
                    var t = name + (this.x ? (cd.groupByDate ? dateFormat(toDate(this.x), 'L') : this.x) + ': ' : this.key + ': ' || '') + chartService.decimalPipe.transform(this.y, chartService.getNumberFormat(cd));
                    if (cd.stacked === 'percent') {
                        t += '<br/>' + Math.round(this.percentage) + ' %';
                    }
                    else if (cd.unit) {
                        t += ' ' + cd.unit;
                    }
                    if (cd.type === 'scatter') {
                        t += '<br/>' + this.point.name;
                    }
                    return t;
                })
            }
        }));
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getDataLabelFormatter = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        /** @type {?} */
        var chartService = this;
        return (/**
         * @return {?}
         */
        function () {
            var _this = this;
            if ((cd.stacked === 'percent' && this.percentage > 0) || (cd.stacked !== 'percent' && Math.abs(this.y) >= 0)) {
                /** @type {?} */
                var t = cd.stacked === 'percent' ? Math.round(this.percentage) + ' %' : chartService.decimalPipe.transform(this.y, chartService.getNumberFormat(cd));
                if (cd.unit && t) {
                    t += ' ' + cd.unit;
                }
                if (!t) {
                    t = '';
                }
                if (cd.showDelta && this.series && isArray(this.series.data)) {
                    /** @type {?} */
                    var index = findIndex(this.series.data, (/**
                     * @param {?} point
                     * @return {?}
                     */
                    function (point) { return point.x === _this.x; }));
                    if (index > 0 && Math.abs(this.series.data[index - 1].y) > 0) {
                        /** @type {?} */
                        var delta = Math.round((100 * (this.series.data[index].y - this.series.data[index - 1].y)) / this.series.data[index - 1].y);
                        t += '<br/><g>(' + delta + '%)</g>';
                    }
                }
                return t;
            }
            return '';
        });
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.useContrast = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return true; //Colors.isDarkTheme() ? false : cd && cd.type !== 'spline' && cd.type !== 'areaspline' && cd.type !== 'line' && cd.type !== 'area';
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getDataLabels = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            enabled: cd.showValues !== false,
            useHTML: false,
            style: defaultsDeep({ color: Colors.black, textOutline: 'none' }, this.textStyle),
            formatter: this.getDataLabelFormatter(cd)
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultLine = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { type: 'line', marginTop: 10 },
            plotOptions: {
                line: {
                    //connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultSpline = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { type: 'spline', marginTop: 10 },
            plotOptions: {
                spline: {
                    //connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                },
                series: {
                    marker: (/** @type {?} */ ({
                        enabled: true,
                        fillOpacity: 0.5,
                        fillColor: Colors.light,
                        lineWidth: 2,
                        lineColor: null
                    }))
                }
            }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultArea = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { type: 'area', marginTop: 10 },
            plotOptions: {
                area: {
                    connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultAreaSpline = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { type: 'areaspline', marginTop: 30 },
            plotOptions: {
                areaspline: {
                    connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultColumn = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { type: 'column', marginTop: 10, marginBottom: cd.showLegend ? 30 : 30 },
            plotOptions: {
                column: {
                    borderRadius: 0,
                    borderWidth: 0,
                    colorByPoint: cd.colorByPoint,
                    shadow: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultHeatmap = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { type: 'heatmap', marginTop: 10 }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultBar = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { type: 'bar', marginTop: 10 },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    borderWidth: 0,
                    colorByPoint: cd.colorByPoint,
                    shadow: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultPie = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            title: { style: { color: 'transparent' } },
            chart: { type: 'pie', spacingBottom: 10, spacingTop: -20 },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    //size: '90%',
                    borderWidth: 0,
                    //innerSize: '10%',
                    //minSize: 30,
                    dataLabels: {
                        enabled: cd.showValues !== false,
                        useHTML: false,
                        style: defaultsDeep({}, this.textStyle),
                        format: '{point.y:.0f} ({point.percentage:.0f} %)',
                        //<b>{point.name}</b>:
                        distance: 5
                    },
                    showInLegend: true
                }
            }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultDoughnut = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return defaultsDeep({
            plotOptions: {
                pie: { startAngle: -90, endAngle: 90, center: ['50%', '75%'], innerSize: '90%' }
            }
        }, this.getHCDefaultPie(cd));
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultRadar = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { polar: true, type: 'area' },
            pane: { size: '70%' },
            yAxis: (/** @type {?} */ ({ gridLineInterpolation: 'polygon', labels: { enabled: false }, lineWidth: 0 })),
            xAxis: { tickmarkPlacement: 'on', lineWidth: 0 }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultTreemap = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { type: 'treemap' },
            colorAxis: {
                minColor: Colors.light,
                maxColor: this.getPalette(cd)[0]
            }
        };
    };
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    Chart.prototype.getHCDefaultScatter = /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    function (cd) {
        return {
            chart: { type: 'scatter', zoomType: 'xy' },
            xAxis: { gridLineWidth: 1 },
            plotOptions: {
                series: { marker: (/** @type {?} */ ({ enabled: true, fillOpacity: 0.5 })) }
            }
        };
    };
    Chart.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Chart.ctorParameters = function () { return [
        { type: Broker },
        { type: DashboardCore },
        { type: Requestor },
        { type: Translate },
        { type: LocalForageService },
        { type: CoreConfig },
        { type: Utils },
        { type: Cache }
    ]; };
    return Chart;
}());
export { Chart };
if (false) {
    /** @type {?} */
    Chart.prototype.PDF_ROW_WIDTH;
    /** @type {?} */
    Chart.prototype.PDF_ROW_HEIGHT;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.palette0;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.palette1;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.palette2;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.palette3;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.paletteBoost;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.textStyle;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.lineColor;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.gridLineColor;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.decimalPipe;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.dashboard;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.translate;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.localForage;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.coreConfig;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.utils;
    /**
     * @type {?}
     * @protected
     */
    Chart.prototype.cache;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jaGFydC9jaGFydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQThCLGFBQWEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdILE9BQU8sRUFBVyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBcUIsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakssT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9EQUFvRCxDQUFDOztBQUVsRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRWpNLE9BQU8sRUFBYyxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUUzRCxnQ0FHQzs7O0lBRkMsMEJBQVc7O0lBQ1gsMEJBQVU7O0FBR1o7SUEyQkUsZUFBc0IsTUFBYyxFQUFZLFNBQXdCLEVBQVksRUFBYSxFQUFZLFNBQW9CLEVBQVksV0FBK0IsRUFBWSxVQUFzQixFQUFZLEtBQVksRUFBWSxLQUFZO1FBQXhPLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBWSxjQUFTLEdBQVQsU0FBUyxDQUFlO1FBQVksT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUFZLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBWSxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFBWSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVksVUFBSyxHQUFMLEtBQUssQ0FBTztRQUFZLFVBQUssR0FBTCxLQUFLLENBQU87UUF6QnZQLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsR0FBRyxDQUFDO1FBRWxCLGFBQVEsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7O1FBRWhKLGFBQVEsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsQUFBRCxFQUFHLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztRQUVsSixhQUFRLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEFBQUQsRUFBRyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzs7UUFFbEosYUFBUSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxBQUFELEVBQUcsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7O1FBRWxKLGlCQUFZLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXBKLGNBQVMsR0FBRztZQUNwQixVQUFVLEVBQUUsTUFBTTtZQUNsQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsVUFBVSxFQUFFLEtBQUs7WUFDakIsUUFBUSxFQUFFLE1BQU07WUFDaEIsVUFBVSxFQUFFLFFBQVE7WUFDcEIsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQztRQUNRLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxTQUFTLENBQUM7UUFJbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDOzs7O0lBRUQsaUNBQWlCOzs7SUFBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVELDJCQUFXOzs7O0lBQVgsVUFBWSxLQUFzQjtRQUNoQyxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUMvRCxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsbUJBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBQSxDQUFDO1NBQ3RFO1FBQ0QsSUFBSSxLQUFLLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQ3hELEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQXBDLENBQW9DLEVBQUMsQ0FBQztTQUM5RztRQUNELElBQUksS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUM1RCxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFO2dCQUN6RCxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDbEo7WUFDRCxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTs7b0JBQ3hDLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2dCQUNwRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDN0MsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEI7Z0JBQ0QsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUMvRTtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFRCwyQkFBVzs7OztJQUFYLFVBQVksS0FBc0I7UUFDaEMsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzlELEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxtQkFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFLLEtBQUssQ0FBQyxnQkFBZ0IsRUFBQSxDQUFDLEVBQUEsQ0FBQztTQUN2RTtRQUNELElBQUksQ0FBQyxtQkFBSyxLQUFLLEVBQUEsQ0FBQyxDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUMsQ0FBQyxtQkFBSyxLQUFLLEVBQUEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3RFLENBQUMsbUJBQUssS0FBSyxFQUFBLENBQUMsQ0FBQyxhQUFhLEdBQUcsbUJBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUEsQ0FBQztTQUMxRTtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ2QsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7O0lBRUQsc0JBQU07Ozs7SUFBTixVQUFPLE1BQWlCO1FBQXhCLGlCQW1CQztRQWxCQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTyxNQUFNLENBQUM7U0FDZjs7WUFDRyxTQUFTLEdBQWMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUM1QyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUk7Ozs7UUFBRSxVQUFBLEdBQUc7WUFDekIsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLOzs7O2dCQUFFLFVBQUEsSUFBSTtvQkFDckIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTt3QkFDM0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ25DO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUMxTSxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFRCxzQkFBTTs7OztJQUFOLFVBQU8sTUFBaUI7UUFBeEIsaUJBU0M7UUFSQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7UUFBRSxVQUFBLEdBQUc7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLOzs7O1lBQUUsVUFBQSxJQUFJO2dCQUNyQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUMzQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDbkM7WUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFRCxxQkFBSzs7OztJQUFMLFVBQU0sRUFBbUI7O1lBQ25CLEtBQUssR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFDdEIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7OztJQUVELDZCQUFhOzs7O0lBQWIsVUFBYyxNQUFpQjtRQUEvQixpQkFHQzs7WUFGSyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQW5CLENBQW1CLEVBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7Ozs7O0lBRUQsK0JBQWU7Ozs7SUFBZixVQUFnQixFQUFVO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7Ozs7OztJQUVELHVCQUFPOzs7Ozs7OztJQUFQLFVBQVEsRUFBbUIsRUFBRSxTQUFjLEVBQUUsWUFBb0IsRUFBRSxLQUFTLEVBQUUsZ0JBQXdCO1FBQXpELDZCQUFBLEVBQUEsb0JBQW9CO1FBQUUsc0JBQUEsRUFBQSxTQUFTO1FBQUUsaUNBQUEsRUFBQSx3QkFBd0I7UUFDcEcsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUN0RixVQUFVOzs7O1FBQUMsVUFBQSxHQUFHO1lBQ1osT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7OztJQUVELGlDQUFpQjs7Ozs7Ozs7SUFBakIsVUFBa0IsRUFBbUIsRUFBRSxjQUFzQixFQUFFLE9BQWlCLEVBQUUsT0FBb0IsRUFBRSxZQUFvQjtRQUE1SCxpQkFTQztRQVR1Ryw2QkFBQSxFQUFBLG9CQUFvQjtRQUMxSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pDLFFBQVE7Ozs7UUFBQyxVQUFBLElBQUk7WUFDWCxPQUFPLElBQUksSUFBSSxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakgsQ0FBQyxFQUFDLEVBQ0YsUUFBUTs7OztRQUFDLFVBQUMsSUFBUztZQUNqQixPQUFPLElBQUksQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7OztJQUVELDZCQUFhOzs7O0lBQWIsVUFBYyxFQUFVO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4RCx1RUFBdUU7SUFDekUsQ0FBQzs7Ozs7O0lBRUQsNkJBQWE7Ozs7O0lBQWIsVUFBYyxFQUFVLEVBQUUsS0FBSztRQUM3QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELDhFQUE4RTtJQUNoRixDQUFDOzs7OztJQUVELCtCQUFlOzs7O0lBQWYsVUFBZ0IsRUFBVTtRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsOERBQThEO0lBQ2hFLENBQUM7Ozs7O0lBRUQsZ0NBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQW1CO1FBQ2xDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsS0FBSztnQkFDMUMsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUM1RCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUM7cUJBQ25CO2lCQUNGO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7SUFFRCw4QkFBYzs7Ozs7SUFBZCxVQUFlLEVBQW1CLEVBQUUsSUFBSTtRQUF4QyxpQkFhQztRQVpDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUM5QixJQUFJOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUNULEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDcEQsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxFQUFDO2lCQUNELElBQUk7OztZQUFDO2dCQUNKLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxFQUFDLENBQUM7U0FDTjthQUFNO1lBQ0wsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFFRCwwQkFBVTs7Ozs7OztJQUFWLFVBQVcsRUFBbUIsRUFBRSxTQUFTLEVBQUUsWUFBb0IsRUFBRSxnQkFBd0I7UUFBekYsaUJBNEJDO1FBNUIwQyw2QkFBQSxFQUFBLG9CQUFvQjtRQUFFLGlDQUFBLEVBQUEsd0JBQXdCOztZQUNuRixJQUFJLEdBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUQsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sS0FBSyxZQUFZLEVBQUU7WUFDckMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDZjs7WUFFRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUM7UUFFckYsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtZQUNqQyxFQUFFLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRTtZQUNwQyxFQUFFLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDO1NBQ3ZEO1FBQ0QsSUFBSSxTQUFTLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRTtZQUN6RCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQzNILFFBQVE7Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQ1YsT0FBTyxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNqRSxDQUFDLEVBQUMsQ0FDSCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDM0gsR0FBRzs7OztZQUFDLFVBQUEsR0FBRztnQkFDTCxPQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEcsQ0FBQyxFQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFFRCwyQkFBVzs7OztJQUFYLFVBQVksSUFBWTtRQUN0QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRUQsMEJBQVU7Ozs7SUFBVixVQUFXLElBQVk7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7OztJQUVELGdDQUFnQjs7OztJQUFoQixVQUFpQixJQUFZO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7Ozs7O0lBRUQsaUNBQWlCOzs7Ozs7OztJQUFqQixVQUFrQixFQUFtQixFQUFFLFNBQWMsRUFBRSxZQUFvQixFQUFFLEtBQVMsRUFBRSxnQkFBd0I7UUFBaEgsaUJBK0RDO1FBL0RzRCw2QkFBQSxFQUFBLG9CQUFvQjtRQUFFLHNCQUFBLEVBQUEsU0FBUztRQUFFLGlDQUFBLEVBQUEsd0JBQXdCO1FBQzlHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3ZFO2FBQU07WUFDTCxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxJQUFJLGNBQWMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7O29CQUM5RixNQUFNLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNuRCxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDekQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUN0RyxHQUFHOzs7O29CQUFDLFVBQUEsR0FBRzt3QkFDTCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQ2xGLENBQUMsRUFBQyxDQUNILENBQUM7aUJBQ0g7cUJBQU07O3dCQUNELGdCQUFnQixHQUFHLEVBQUU7b0JBQ3pCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRTt3QkFDdEIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDOzRCQUNwQixRQUFRLEVBQUU7Z0NBQ1IsR0FBRyxFQUFFLENBQUM7Z0NBQ04sS0FBSyxFQUFFLFFBQVE7Z0NBQ2YsSUFBSSxFQUFFO29DQUNKLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDLEVBQUU7aUNBQ2hGOzZCQUNGO3lCQUNGLENBQUMsQ0FBQzt3QkFDSCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7NEJBQ3BCLE1BQU0sRUFBRTtnQ0FDTixHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7Z0NBQ3ZDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7Z0NBQ2xCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7NkJBQzVCO3lCQUNGLENBQUMsQ0FBQztxQkFDSjt5QkFBTTs7NEJBQ0QsS0FBSyxHQUFRLEVBQUU7d0JBQ25CLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUNyRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDOzRCQUNwQixNQUFNLEVBQUU7Z0NBQ04sR0FBRyxFQUFFO29DQUNILGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDLEVBQUU7aUNBQ2hGO2dDQUNELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7Z0NBQ2xCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7NkJBQzVCO3lCQUNGLENBQUMsQ0FBQztxQkFDSjtvQkFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDO2lCQUNsRzthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3BHLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDdEcsR0FBRzs7OztvQkFBQyxVQUFBLEdBQUc7d0JBQ0wsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUNsRixDQUFDLEVBQUMsQ0FDSCxDQUFDO2lCQUNIO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNmO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7OztJQUVELDhCQUFjOzs7OztJQUFkLFVBQWUsRUFBbUIsRUFBRSxJQUFJO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFFRCw2QkFBYTs7Ozs7SUFBYixVQUFjLEVBQW1CLEVBQUUsSUFBSTtRQUF2QyxpQkF3RUM7UUF2RUMsSUFBSSxFQUFFLENBQUMsT0FBTyxLQUFLLHdCQUF3QixFQUFFO1lBQzNDLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVO2dCQUN6QixPQUFPLEVBQUUsSUFBSTthQUNkLENBQUM7U0FDSDs7WUFDRyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUM7O1lBQ3hDLFVBQVUsR0FBZTtZQUMzQjtnQkFDRSxVQUFVLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztnQkFDeEYsS0FBSyxFQUFFLEtBQUs7YUFDYjtTQUNGO1FBQ0QsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1lBQ2xCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7U0FDN0M7O1lBQ0csSUFBSSxHQUFHLElBQUksR0FBRyxFQUFrQjtRQUVwQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7O1FBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO2dCQUMzQixPQUFPO2FBQ1I7WUFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFLO2dCQUNuQixVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ2xCLEtBQUssRUFBRSxPQUFPLEdBQUcsQ0FBQztnQkFDbEIsYUFBYSxFQUFFLENBQUMsQ0FBQyxJQUFJO2dCQUNyQixRQUFRLEVBQUUsRUFBRTthQUNiLEVBQUEsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDekIsVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBSztvQkFDbkIsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJO29CQUNsQixLQUFLLEVBQUUsUUFBUSxHQUFHLENBQUM7b0JBQ25CLGFBQWEsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUs7b0JBQzdCLFFBQVEsRUFBRSxFQUFFO2lCQUNiLEVBQUEsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsa0NBQWtDO2FBQ3BGO1lBQ0QsT0FBTyxDQUFDLENBQUMsbUJBQUEsQ0FBQyxFQUFPLENBQUMsQ0FBQyxJQUFJOzs7OztZQUFFLFVBQUMsQ0FBTSxFQUFFLEtBQUs7O29CQUNqQyxHQUFHOztvQkFBRSxLQUFLOztvQkFBRSxDQUFDO2dCQUNqQixJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDZCxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDcEMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDZDtxQkFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFO29CQUNoQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDYixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWixJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO3dCQUN6QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDVDtpQkFDRjtxQkFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUM3QixHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ25DLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiO3FCQUFNLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLG1CQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUEsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLG1CQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN0RyxHQUFHLEdBQUcsQ0FBQyxtQkFBSyxNQUFNLENBQUMsS0FBSyxFQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVDLEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQ1g7Z0JBQ0QsSUFBSSxHQUFHLEVBQUU7O3dCQUNILEdBQUcsR0FBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQkFDNUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDdEosSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTt3QkFDekIsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3ZCO29CQUNELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNwQjtZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPO1lBQ0wsVUFBVSxFQUFFLFVBQVU7WUFDdEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ25DLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFRCw0QkFBWTs7Ozs7SUFBWixVQUFhLEVBQW1CLEVBQUUsSUFBZ0I7UUFDaEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUFFRCw4QkFBYzs7Ozs7SUFBZCxVQUFlLEVBQW1CLEVBQUUsSUFBUzs7WUFDdkMsS0FBSzs7WUFDTCxLQUFLO1FBQ1QsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFLLElBQUksRUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RTthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDcEI7UUFDRCxPQUFPO1lBQ0wsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUztTQUNuQixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRUQsbUNBQW1COzs7OztJQUFuQixVQUFvQixFQUFtQixFQUFFLElBQVM7O1lBQzVDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUM7O1lBQ3pDLFdBQVcsR0FBRztZQUNoQixTQUFTLEVBQUUsRUFBRTtZQUNiLFFBQVEsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUU7WUFDbkMsWUFBWSxFQUFFLEVBQUU7WUFDaEIsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFOztZQUVsRCxhQUFhLEVBQUUsSUFBSTtTQUNwQjtRQUVELE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDbEIsTUFBTSxFQUFFLElBQUk7O1lBRVosY0FBYyxFQUFFLEtBQUs7O1lBRXJCLFlBQVksRUFBRSxRQUFRO1lBQ3RCLFVBQVUsRUFBRSxVQUFVLENBQUMsVUFBVTtZQUNqQyxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87U0FDNUIsQ0FBQyxDQUFDO1FBRUgsYUFBYTtRQUNiLElBQUksRUFBRSxDQUFDLE9BQU8sS0FBSyx3QkFBd0IsRUFBRTtZQUMzQyxNQUFNLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakUsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRztnQkFDL0IsMkRBQTJEO2FBQzVELENBQUMsQ0FBQztZQUNILFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0Usa0NBQWtDO1lBQ2xDLDJDQUEyQztZQUMzQyxzREFBc0Q7WUFDdEQsbUNBQW1DO1lBQ25DLCtCQUErQjtZQUMvQix5QkFBeUI7WUFDekIsdUNBQXVDO1lBQ3ZDLHFDQUFxQztZQUNyQyxvQ0FBb0M7WUFDcEMsK0JBQStCO1lBQy9CLG9DQUFvQztZQUNwQyw4QkFBOEI7WUFDOUIsMkNBQTJDO1lBQzNDLHlCQUF5QjtZQUN6QixrQ0FBa0M7WUFDbEMsaUNBQWlDO1lBQ2pDLG1EQUFtRDtZQUNuRCxpQkFBaUI7WUFDakIsOERBQThEO1lBQzlELDJDQUEyQztZQUMzQyw0QkFBNEI7WUFDNUIsd0RBQXdEO1lBQ3hELGdEQUFnRDtZQUNoRCxxRkFBcUY7WUFDckYsK0VBQStFO1lBQy9FLG9CQUFvQjtZQUVwQixpREFBaUQ7WUFDakQscURBQXFEO1lBQ3JELHVEQUF1RDtZQUN2RCwrQkFBK0I7WUFDL0IsdURBQXVEO1lBQ3ZELHdCQUF3QjtZQUN4QixvQkFBb0I7WUFDcEIsZ0NBQWdDO1lBQ2hDLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QsUUFBUTtZQUNSLEVBQUU7U0FDSDtRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7SUFFUyw4Q0FBOEI7Ozs7OztJQUF4QyxVQUF5QyxFQUFtQixFQUFFLElBQWdCOztZQUN4RSxLQUFLLEdBQUcsRUFBRTtRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUN2QixVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUM7WUFDL0IsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0Y7UUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7Ozs7OztJQUVELCtCQUFlOzs7OztJQUFmLFVBQWdCLEtBQWlCLEVBQUUsSUFBZ0I7UUFBbkMsc0JBQUEsRUFBQSxZQUFpQjtRQUMvQixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7U0FDWDs7O1lBRUcsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7WUFDM0IsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTOztZQUMzQixVQUFVLEdBQUcsRUFBRTs7WUFDZixLQUFLLEdBQUcsRUFBRTtRQUNkLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFDdkIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDOztnQkFDakMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUUsU0FBUyxDQUFDOztnQkFFOUUsVUFBVSxHQUFHLENBQUM7O2dCQUNkLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7O29CQUU1QixVQUFVLEdBQVcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxZQUFZLENBQUM7O29CQUNsRSxNQUFNLEdBQVE7b0JBQ2hCLEdBQUcsRUFBRSxVQUFVO29CQUNmLENBQUMsRUFBRSxVQUFVO29CQUNiLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxLQUFLLEVBQUUsQ0FBQztvQkFDUixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsVUFBVTtpQkFDakI7O29CQUNHLENBQUMsR0FBUSxJQUFJLENBQUMsSUFBSTs7OztnQkFBRSxVQUFDLENBQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxHQUFHLEtBQUssVUFBVSxFQUFwQixDQUFvQixFQUFDO2dCQUN6RCxJQUFJLENBQUMsRUFBRTtvQkFDTCxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztpQkFDeEI7Z0JBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFeEIscUJBQXFCO2dCQUNyQixJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzdDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUNwRDtnQkFDRCxlQUFlO2dCQUNmLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRTtvQkFDNUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxrQkFBa0I7b0JBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2YsVUFBVSxFQUFFLENBQUMsQ0FBQyx3QkFBd0I7b0JBQ3RDLGNBQWM7aUJBQ2Y7cUJBQU07b0JBQ0wsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDakIsY0FBYzt3QkFDZCxVQUFVLEVBQUUsQ0FBQzt3QkFDYixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNoQjtpQkFDRjtnQkFDRCxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1lBbEN4RCxPQUFPLFdBQVcsSUFBSSxRQUFROzthQW1DN0I7U0FDRjtRQUNELE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBRUQsaUNBQWlCOzs7OztJQUFqQixVQUFrQixFQUFtQixFQUFFLElBQWdCOztZQUNqRCxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7O1lBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUNsRSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUMzQyxPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRSxPQUFPO1lBQ2QsTUFBTSxFQUFFLFVBQVU7WUFDbEIsTUFBTSxFQUFFLENBQUM7WUFDVCxhQUFhLEVBQUUsS0FBSztZQUNwQixZQUFZLEVBQUUsR0FBRztZQUNqQixhQUFhLEVBQUUsRUFBRTtTQUNsQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsS0FBSyxHQUFHLG1CQUFLO1lBQ2xCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLE1BQU0sRUFBRTtnQkFDTixRQUFRLEVBQUUsTUFBTTthQUNqQjtTQUNGLEVBQUEsQ0FBQztRQUNGLE1BQU0sQ0FBQyxLQUFLLEdBQUcsbUJBQUs7WUFDbEIsT0FBTyxFQUFFLElBQUk7WUFDYixVQUFVLEVBQUUsU0FBUyxDQUFDLEtBQUs7WUFDM0IsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsQ0FBQztZQUNaLFNBQVMsRUFBRSxDQUFDO1lBQ1osR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsRUFBRTtZQUNQLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsUUFBUTtnQkFDZixZQUFZLEVBQUUsS0FBSztnQkFDbkIsQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLE1BQU07YUFDakI7U0FDRixFQUFBLENBQUM7UUFDRixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ25FLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLENBQUM7WUFDZCxhQUFhLEVBQUUsRUFBRTtZQUNqQixVQUFVLEVBQUUsRUFBRTtTQUNmLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxTQUFTLEdBQUc7WUFDakIsR0FBRyxFQUFFLENBQUM7WUFDTixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNwSCxDQUFDO1FBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7UUFBRztZQUN6QixPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxtQkFBSyxJQUFJLENBQUMsS0FBSyxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLG1CQUFLLElBQUksQ0FBQyxLQUFLLEVBQUEsQ0FBQyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDM0gsQ0FBQyxDQUFBLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxHQUFHLG1CQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUEsQ0FBQztRQUNoRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFFRCxnQ0FBZ0I7Ozs7O0lBQWhCLFVBQWlCLEVBQW1CLEVBQUUsSUFBUztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2YsVUFBVSxFQUFFLE1BQU07WUFDbEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUM7O1lBQ0UsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDOztZQUNoQyxZQUFZLEdBQUcsSUFBSTtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUNELElBQUksRUFBRSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRTs7O29CQUVsQixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQWU7Z0JBQ25DLHlCQUF5QjtnQkFDekIsSUFBSSxDQUFDLE9BQU87Ozs7Z0JBQUMsVUFBQyxDQUFNOzt3QkFDZCxDQUFDLEdBQVEsUUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O3dCQUNuRSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ25FLFFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsRUFBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxtQkFBSyxDQUFDLENBQUMsSUFBSSxFQUFBOzs7O2dCQUFFLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQyxFQUEvQyxDQUErQyxFQUFDLENBQUM7YUFDcEY7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLE1BQU0sR0FBRyxtQkFBSztvQkFDbkI7d0JBQ0UsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLO3dCQUNkLElBQUksRUFBRSxNQUFNLENBQ1YsSUFBSSxDQUFDLEdBQUc7Ozs7d0JBQUMsVUFBQyxDQUFNOztnQ0FDVixJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs0QkFDdEMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDL0QsQ0FBQyxFQUFDOzs7O3dCQUNGLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQ1Q7cUJBQ0Y7aUJBQ0YsRUFBQSxDQUFDO2FBQ0g7U0FDRjthQUFNLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsbUJBQUs7b0JBQ25CO3dCQUNFLGVBQWUsRUFBRSxZQUFZO3dCQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Ozs7d0JBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUF0RCxDQUFzRCxFQUFDO3FCQUNyRjtpQkFDRixFQUFBLENBQUM7YUFDSDtTQUNGO2FBQU0sSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNoQyxNQUFNLENBQUMsTUFBTSxHQUFHLG1CQUFLO2dCQUNuQjtvQkFDRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUs7b0JBQ2QsSUFBSSxFQUFFLElBQUk7aUJBQ1g7YUFDRixFQUFBLENBQUM7WUFDRixrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBSyxJQUFJLEVBQUEsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUMzQztTQUNGO2FBQU07O2dCQUNELFFBQU0sR0FBRyxJQUFJLEdBQUcsRUFBMkI7O2dCQUMzQyxZQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVU7WUFDbEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLG1CQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsbUJBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFBLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzVGLE9BQU8sQ0FBQyxJQUFJOzs7O2dCQUFFLFVBQUMsQ0FBTTs7d0JBQ2YsS0FBSyxHQUFHLFFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ3JDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUM1QyxZQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEIsUUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixDQUFDLEVBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7b0JBQy9DLFVBQVUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7b0JBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUQsQ0FBQyxFQUFDO29CQUMzRCxTQUFTLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2pCLElBQUksR0FBRyxDQUFDLG1CQUF5RCxJQUFJLEVBQUEsQ0FBQyxDQUFDLE1BQU07Ozs7O29CQUFDLFVBQUMsR0FBRyxFQUFFLElBQVM7d0JBQzNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNuRCxPQUFPLEdBQUcsQ0FBQztvQkFDYixDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ1I7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLG1CQUFLLElBQUksRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDO2lCQUMxQjtnQkFDRCxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7b0JBQy9DLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSTs7Ozs7b0JBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBUzt3QkFDMUMsT0FBTyxDQUFDLENBQUM7b0JBQ1gsQ0FBQyxFQUFDO29CQUNGLFNBQVMsRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUM7Z0JBQ0gsUUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7O2dCQUNmLE9BQUssR0FBRyxHQUFHLEdBQUcsUUFBTSxDQUFDLElBQUk7WUFDN0IsUUFBTSxDQUFDLE9BQU87Ozs7O1lBQUMsVUFBQyxLQUFVLEVBQUUsSUFBSTs7b0JBQzFCLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNwQyxzQkFBc0I7Z0JBQ3RCLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLG1CQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUEsQ0FBQyxDQUFDLFVBQVUsRUFBRTtvQkFDbEQsQ0FBQyxtQkFBSyxNQUFNLENBQUMsS0FBSyxFQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztvQkFBQyxVQUFBLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ2IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt5QkFDakI7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7Z0JBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQUs7b0JBQ3RCLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxDQUFDLE9BQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHO29CQUNwQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQUssR0FBRyxLQUFLLEdBQUcsT0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUM7b0JBQzVELElBQUksRUFDRixFQUFFLENBQUMsSUFBSSxLQUFLLE9BQU87d0JBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQWUsQ0FBQyxtQkFBSyxNQUFNLENBQUMsS0FBSyxFQUFBLENBQUMsQ0FBQyxVQUFVLEVBQUE7Ozs7d0JBQUUsVUFBQSxDQUFDOzRCQUNuRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsQ0FBQyxFQUFDO3dCQUNKLENBQUMsQ0FBQyxNQUFNLENBQ0osSUFBSSxDQUFDLG1CQUFLLEtBQUssRUFBQTs7Ozs7d0JBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQzs0QkFDcEIsT0FBTyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLENBQUMsRUFBQzs7Ozt3QkFDRixVQUFBLENBQUM7NEJBQ0MsZ0ZBQWdGOzRCQUNoRixPQUFPLENBQUMsbUJBQUssTUFBTSxDQUFDLEtBQUssRUFBQSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7NEJBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQVosQ0FBWSxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDL0UsQ0FBQyxFQUNGO2lCQUNSLEVBQUEsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsQ0FBTTtZQUMzQixZQUFZLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFO29CQUMxQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTt3QkFDZixDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO3dCQUNsQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO3FCQUNsQztvQkFDRCxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO29CQUN2QixDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDbkIsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2lCQUN6QjtnQkFDRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOzRCQUNoRCxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3hCO29CQUNILENBQUMsRUFBQyxDQUFDO2lCQUNKO2dCQUNELElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbkIsQ0FBQyxtQkFBTyxDQUFDLENBQUMsSUFBSSxFQUFBLENBQUMsQ0FBQyxPQUFPOzs7OztvQkFBQyxVQUFDLENBQUMsRUFBRSxDQUFDO3dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTs0QkFDM0UsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDOzRCQUNsQixDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDOzRCQUN2QixDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs0QkFDbkIsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO3lCQUN6Qjt3QkFDRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7NEJBQ2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7OzRCQUFDLFVBQUEsQ0FBQztnQ0FDdkIsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO29DQUNoRCxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUNBQ3hCOzRCQUNILENBQUMsRUFBQyxDQUFDO3lCQUNKO29CQUNILENBQUMsRUFBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDSCxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUU7Z0JBQ25CLDJDQUEyQztnQkFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0QyxDQUFDLG1CQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNuRDthQUNGO1lBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEMsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsd0JBQXdCLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsNEJBQVk7Ozs7SUFBWixVQUFhLE1BQXlCO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsSSxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7OztJQUVELGtDQUFrQjs7OztJQUFsQixVQUFtQixNQUF5Qjs7WUFDdEMsVUFBVSxHQUFXLHVDQUF1QztRQUNoRSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQy9DLFFBQVEsbUJBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQU8sRUFBRTtnQkFDaEMsS0FBSyxNQUFNO29CQUNULFVBQVUsR0FBRyxrQkFBa0IsQ0FBQztvQkFDaEMsTUFBTTtnQkFDUixLQUFLLFFBQVE7b0JBQ1gsVUFBVSxHQUFHLG9CQUFvQixDQUFDO29CQUNsQyxNQUFNO2dCQUNSLEtBQUssTUFBTTtvQkFDVCxVQUFVLEdBQUcsd0JBQXdCLENBQUM7b0JBQ3RDLE1BQU07Z0JBQ1IsS0FBSyxZQUFZO29CQUNmLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQztvQkFDdEMsTUFBTTtnQkFDUixLQUFLLFFBQVE7b0JBQ1gsVUFBVSxHQUFHLG1CQUFtQixDQUFDO29CQUNqQyxNQUFNO2dCQUNSLEtBQUssS0FBSztvQkFDUixVQUFVLEdBQUcsbUJBQW1CLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1IsS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxTQUFTLENBQUM7Z0JBQ2YsS0FBSyxLQUFLLENBQUM7Z0JBQ1gsS0FBSyxVQUFVLENBQUM7Z0JBQ2hCO29CQUNFLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztvQkFDOUIsTUFBTTthQUNUO1NBQ0Y7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7OztJQUVELHNCQUFNOzs7Ozs7O0lBQU4sVUFBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFRO1FBQW5DLGlCQXlCQzs7WUF4QkssSUFBSSxHQUFHLFdBQVc7O1lBQ2xCLE1BQU0sR0FBRztZQUNYLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDM0MsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQztZQUNsQixHQUFHLEVBQUUsR0FBRztTQUNUOztZQUNHLFNBQVMsR0FBRyxnQ0FBZ0M7UUFDaEQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUNsRCxRQUFROzs7O1FBQUMsVUFBQSxHQUFHOztnQkFDTixHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUc7WUFDekIsT0FBTyxLQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxFQUNGLFFBQVE7Ozs7UUFBQyxVQUFBLFdBQVc7O2dCQUNkLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQztZQUM1QyxPQUFPLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFBQyxFQUNGLEdBQUc7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDTCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRUQsMEJBQVU7Ozs7OztJQUFWLFVBQVcsSUFBbUIsRUFBRSxTQUEwQixFQUFFLFdBQTBCO1FBQTFCLDRCQUFBLEVBQUEsa0JBQTBCO1FBQ3BGLElBQUksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUNuQixHQUFHO1FBQ1AsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNyQixHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2Y7YUFBTTtZQUNMLEdBQUcsR0FBRyxlQUFlLEdBQUcsU0FBUyxHQUFHLFdBQVcsR0FBRyxXQUFXLEdBQUcscURBQXFELENBQUM7WUFDdEgsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckIsR0FBRyxJQUFJLFFBQVEsQ0FBQztTQUNqQjtRQUNELE9BQU8sR0FBRzthQUNQLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDO2FBQzFCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO2FBQ3hDLE9BQU8sQ0FBQyxzRkFBc0YsRUFBRSxvRkFBb0YsQ0FBQyxDQUFDO0lBQzNMLENBQUM7Ozs7Ozs7O0lBRUQseUJBQVM7Ozs7Ozs7SUFBVCxVQUFVLE9BQU8sRUFBRSxJQUFtQixFQUFFLFNBQVMsRUFBRSxXQUEwQjtRQUE3RSxpQkF1Q0M7UUF2Q2tELDRCQUFBLEVBQUEsa0JBQTBCOztZQUN2RSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO1FBQzFDLE9BQU8sR0FBRyxLQUFLLENBQ2I7WUFDRSxJQUFJLEVBQUUsV0FBVztZQUNqQixHQUFHLEVBQUUsZ0NBQWdDO1lBQ3JDLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRTtvQkFDYixTQUFTLEVBQUUsMEJBQTBCO29CQUNyQyxhQUFhLEVBQUUsd0JBQXdCO29CQUN2QyxNQUFNLEVBQUUsTUFBTTtvQkFDZCxTQUFTLEVBQUUsb0JBQW9CO29CQUMvQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQztpQkFDN0s7YUFDRjtZQUNELE1BQU0sRUFBRSx5Q0FBeUM7U0FDbEQsRUFDRCxPQUFPLENBQ1IsQ0FBQztRQUNGLElBQUksQ0FBQyxFQUFFO2FBQ0osT0FBTyxDQUNOLCtCQUErQixFQUMvQjtZQUNFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU87WUFDckMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLFdBQVc7O1lBRWxCLEdBQUcsRUFBRSxHQUFHO1NBQ1QsRUFDRCxJQUFJLENBQ0w7YUFDQSxTQUFTOzs7O1FBQUMsVUFBQSxHQUFHO1lBQ1osSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDbkIsS0FBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7YUFDM0U7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVELDZCQUFhOzs7OztJQUFiLFVBQWMsV0FBbUIsRUFBRSxHQUFTOztZQUN0QyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxxQkFBcUI7UUFDekQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLGFBQUEsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUM1RCxHQUFHOzs7O1FBQUMsVUFBQSxNQUFNO1lBQ1IsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVELDZCQUFhOzs7OztJQUFiLFVBQWMsV0FBbUIsRUFBRSxHQUFTOztZQUN0QyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxvQkFBb0I7UUFDeEQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2xELEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU07WUFDUixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVTLHdDQUF3Qjs7Ozs7O0lBQWxDLFVBQW1DLEVBQW1CLEVBQUUsTUFBeUI7UUFDL0UsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTs7Z0JBQ2hELFNBQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQzs7Z0JBQzdCLE9BQUssR0FBRyxJQUFJO1lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTzs7Ozs7WUFBQyxVQUFDLENBQU0sRUFBRSxDQUFDO2dCQUN4QixJQUFBOzs7OzhEQUErRCxFQUE5RCxTQUFDLEVBQUUsU0FBQyxFQUFFLFNBQXdEO2dCQUNyRSxDQUFDLENBQUMsU0FBUyxHQUFHLFVBQVEsQ0FBQyxTQUFJLENBQUMsU0FBSSxDQUFDLFNBQUksT0FBSyxNQUFHLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2xDLHVCQUF1QjtnQkFDdkIsc0RBQXNEO2dCQUN0RCw2RkFBNkY7Z0JBQzdGLEtBQUs7WUFDUCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7O0lBRVMsZ0NBQWdCOzs7OztJQUExQixVQUEyQixNQUF5QjtRQUNsRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7Z0JBQ2hGLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxtQkFBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFBLENBQUMsQ0FBQyxJQUFJOzs7O1lBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUosQ0FBSSxFQUFDO1lBQ2hFLElBQUksV0FBVyxFQUFFO2dCQUNmLE1BQU0sQ0FBQyxRQUFRLEdBQUc7b0JBQ2hCLElBQUksRUFBRSxXQUFXLENBQUMsY0FBYyxFQUFFO29CQUNsQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDL0YsS0FBSyxFQUFFLE9BQU87aUJBQ2YsQ0FBQzthQUNIO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7O0lBRVMsZ0NBQWdCOzs7Ozs7SUFBMUIsVUFBMkIsTUFBeUIsRUFBRSxFQUFtQjtRQUN2RSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07Ozs7WUFBRSxVQUFDLENBQU07Z0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO29CQUN6QixDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNuQixDQUFDLG1CQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUEsQ0FBQyxDQUFDLE9BQU87Ozs7O29CQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFOzRCQUM5QyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzt5QkFDbkI7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7OztJQUVTLGlDQUFpQjs7Ozs7O0lBQTNCLFVBQTRCLElBQXFDLEVBQUUsTUFBeUI7O1lBQ3RGLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTs7WUFDZixFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxDQUFDOztZQUM1QixFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxDQUFDOztZQUM1QixHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQVQsQ0FBUyxFQUFDLENBQUM7O1lBQ25DLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBVCxDQUFTLEVBQUMsQ0FBQzs7WUFDbkMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7O1lBQzdDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQzs7WUFDckIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQzs7WUFDOUIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQztRQUVsQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBSztZQUN0QixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxZQUFZO1lBQ2xCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUMxQixtQkFBbUIsRUFBRSxLQUFLO1NBQzNCLEVBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRVMsOEJBQWM7Ozs7O0lBQXhCLFVBQXlCLEVBQW1COztZQUN0QyxNQUFNLEdBQXNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7UUFDM0QsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFO1lBQ2YsS0FBSyxNQUFNO2dCQUNULE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1IsS0FBSyxZQUFZO2dCQUNmLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNO1lBQ1IsS0FBSyxLQUFLO2dCQUNSLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakQsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsTUFBTTtZQUNSLEtBQUssU0FBUztnQkFDWixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckQsTUFBTTtZQUNSLEtBQUssVUFBVTtnQkFDYixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsTUFBTTtZQUNSLEtBQUssS0FBSztnQkFDUixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELE1BQU07U0FDVDtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDO1FBQy9DLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRTtZQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxFQUFFLENBQUMsbUJBQW1CLEVBQUU7WUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1NBQ3REO1FBQ0QsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDdEM7UUFDRCxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7WUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztTQUNwQztRQUNELHFCQUFxQjtRQUNyQixtQ0FBbUM7UUFDbkMsb0NBQW9DO1FBQ3BDLHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMsSUFBSTtRQUVKLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDM0IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUM5QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQy9CLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDaEMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUVqQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxtQkFBSyxNQUFNLENBQUMsS0FBSyxFQUFBLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDMUUsQ0FBQyxtQkFBSyxNQUFNLENBQUMsS0FBSyxFQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUM1QztRQUNELCtCQUErQjtRQUMvQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFFUyw2QkFBYTs7Ozs7SUFBdkIsVUFBd0IsTUFBeUI7UUFDL0MsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUM5QixrQ0FBa0M7UUFDbEMsQ0FBQyxtQkFBSyxNQUFNLENBQUMsS0FBSyxFQUFBLENBQUMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0lBQ3hDLENBQUM7Ozs7OztJQUVTLDBCQUFVOzs7OztJQUFwQixVQUFxQixFQUFtQjtRQUN0QyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUVTLCtCQUFlOzs7OztJQUF6QixVQUEwQixFQUFtQjtRQUMzQyxJQUFJLEVBQUUsQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLGVBQWUsSUFBSSxDQUFDLEVBQUU7WUFDakQsT0FBTyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN2RDtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFFUyxpREFBaUM7Ozs7OztJQUEzQyxVQUE0QyxZQUFvQixFQUFFLGFBQTBCO1FBQTFCLDhCQUFBLEVBQUEsa0JBQTBCOztZQUNwRixxQkFBcUIsR0FBRyxJQUFJLEdBQUcsSUFBSTs7O1lBQ25DLG9CQUFvQixHQUFHLEVBQUUsR0FBRyxxQkFBcUI7OztZQUNqRCxxQkFBcUIsR0FBRyxDQUFDLEdBQUcsb0JBQW9COzs7WUFDaEQscUJBQXFCLEdBQUcsRUFBRSxHQUFHLG9CQUFvQjs7O1lBQ2pELDZCQUE2QixHQUFHO1lBQ3BDLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsR0FBRyxFQUFFLG9CQUFvQjtZQUN6QixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFDRCxJQUFJLGFBQWEsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQ2hELE9BQU8sNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLDZCQUE2QixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7Ozs7SUFFUyxpQ0FBaUI7Ozs7OztJQUEzQixVQUE0QixZQUFvQixFQUFFLGFBQTBCO1FBQTFCLDhCQUFBLEVBQUEsa0JBQTBCOztZQUNwRSwyQkFBMkIsR0FBRztZQUNsQyxJQUFJLEVBQUUsT0FBTztZQUNiLEdBQUcsRUFBRSxRQUFRO1lBQ2IsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0QsSUFBSSxhQUFhLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUNoRCxPQUFPLFNBQVMsR0FBRywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDL0Q7UUFDRCxPQUFPLFNBQVMsR0FBRywyQkFBMkIsQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDckUsQ0FBQzs7Ozs7O0lBRVMsa0NBQWtCOzs7OztJQUE1QixVQUE2QixFQUFtQjs7WUFDMUMsWUFBWSxHQUFHLElBQUk7O1lBQ25CLGFBQWEsR0FBRyxFQUFFLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYTs7WUFDbEUsZUFBZSxHQUFHLEVBQUUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLE9BQU8sS0FBSyxlQUFlO1FBQ2xFLE9BQU8sbUJBQUs7WUFDVixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLO2dCQUNkLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUMvRixLQUFLLEVBQUUsT0FBTzthQUNmO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Z0JBQzdCLGVBQWUsRUFBRSxJQUFJO2dCQUNyQixlQUFlLEVBQUU7b0JBQ2YsS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSxPQUFPO3dCQUNiLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSzt3QkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTO3FCQUN0QjtpQkFDRjthQUNGO1lBQ0QsS0FBSyxFQUNILEVBQUUsQ0FBQyxJQUFJLEtBQUssT0FBTztnQkFDakIsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlFLENBQUMsQ0FBQztvQkFDRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUTtvQkFDckIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO29CQUN6QixhQUFhLEVBQUUsQ0FBQzs7b0JBQ2hCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtvQkFDakMsTUFBTSxFQUFFO3dCQUNOLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUNuQixPQUFPLEVBQUUsRUFBRTt3QkFDWCxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUM1RCxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtxQkFDeEY7b0JBQ0QsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJO29CQUNaLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2lCQUM5RztZQUNQLEtBQUssRUFDSCxFQUFFLENBQUMsSUFBSSxLQUFLLE9BQU87Z0JBQ2pCLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFO2dCQUM5RSxDQUFDLENBQUM7b0JBQ0UsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVE7b0JBQ3JCLEtBQUssRUFBRSxFQUFFO29CQUNULFNBQVMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztvQkFDekIsYUFBYSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhOztvQkFDakMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUN4RSxTQUFTLEVBQUUsS0FBSztvQkFDaEIsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJO2lCQUNiO1lBQ1AsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQzNCLE1BQU0sRUFBRTtnQkFDTixPQUFPLEVBQUUsS0FBSztnQkFDZCxTQUFTLEVBQUUsWUFBWSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDOztnQkFFdkgsY0FBYzs7O2dCQUFFOzt3QkFDVixNQUFNLEdBQUcsRUFBRTtvQkFFZixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzs0QkFDbkMsS0FBSyxHQUFHLENBQUM7d0JBQ2IsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFOzRCQUNuQixLQUFLLEdBQUcsbUJBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQSxDQUFDO3lCQUM5Qjs2QkFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTs0QkFDdEQsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3pCOzZCQUFNLElBQUksRUFBRSxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7NEJBQ25DLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO3lCQUM3Qzs2QkFBTSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEtBQUssS0FBSyxFQUFFOzRCQUNuQyxLQUFLLEdBQUcsbUJBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQSxDQUFDO3lCQUM5Qjs2QkFBTSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEtBQUssS0FBSyxFQUFFOzRCQUNuQyxLQUFLLEdBQUcsbUJBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQSxDQUFDO3lCQUM5Qjt3QkFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDekc7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFO3dCQUNqQixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQzFHO3lCQUFNO3dCQUNMLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO3FCQUNwQjtvQkFDRCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUU7d0JBQ1gsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO3FCQUN6QjtvQkFDRCxPQUFPLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQyxDQUFBO2FBQ0Y7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLG1CQUFLO29CQUNYLGNBQWMsRUFBRSxDQUFDO29CQUNqQixZQUFZLEVBQUUsQ0FBQztvQkFDZixZQUFZLEVBQUUsRUFBRSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUM1RCxRQUFRLEVBQUUsRUFBRSxDQUFDLE9BQU87b0JBQ3BCLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsSUFBSSxLQUFLO29CQUM5QyxNQUFNLEVBQUU7d0JBQ04sT0FBTyxFQUFFLElBQUk7d0JBQ2IsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtxQkFDbEQ7b0JBQ0QsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDN0MsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQ25DLFVBQVUsRUFBRTt3QkFDVixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7cUJBQ3BCO2lCQUNGLEVBQUE7YUFDRjtZQUNELE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDM0IsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxNQUFNLENBQUMsTUFBTTtnQkFDOUIsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUMzQixPQUFPLEVBQUUsS0FBSztnQkFDZCxTQUFTOzs7Z0JBQUU7O3dCQUNMLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFO29CQUN0RCxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO3dCQUN4QixJQUFJLElBQUksT0FBTyxDQUFDO3FCQUNqQjs7d0JBQ0csQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbk0sSUFBSSxFQUFFLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTt3QkFDNUIsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQ25EO3lCQUFNLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTt3QkFDbEIsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO3FCQUNwQjtvQkFDRCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO3dCQUN6QixDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3FCQUNoQztvQkFDRCxPQUFPLENBQUMsQ0FBQztnQkFDWCxDQUFDLENBQUE7YUFDRjtTQUNGLEVBQUEsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVTLHFDQUFxQjs7Ozs7SUFBL0IsVUFBZ0MsRUFBbUI7O1lBQzdDLFlBQVksR0FBRyxJQUFJO1FBQ3ZCOzs7UUFBTztZQUFBLGlCQW1CTjtZQWxCQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOztvQkFDeEcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEosSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtvQkFDaEIsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO2lCQUNwQjtnQkFDRCxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUNOLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ1I7Z0JBQ0QsSUFBSSxFQUFFLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7O3dCQUN4RCxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztvQkFBRSxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUssQ0FBQyxDQUFDLEtBQUssS0FBSSxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsRUFBQztvQkFDM0UsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTs7NEJBQ3hELEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNILENBQUMsSUFBSSxXQUFXLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQztxQkFDckM7aUJBQ0Y7Z0JBQ0QsT0FBTyxDQUFDLENBQUM7YUFDVjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRVMsMkJBQVc7Ozs7O0lBQXJCLFVBQXNCLEVBQW1CO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLENBQUMsb0lBQW9JO0lBQ25KLENBQUM7Ozs7OztJQUVTLDZCQUFhOzs7OztJQUF2QixVQUF3QixFQUFtQjtRQUN6QyxPQUFPO1lBQ0wsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEtBQUssS0FBSztZQUNoQyxPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNqRixTQUFTLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQztTQUMxQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRVMsZ0NBQWdCOzs7OztJQUExQixVQUEyQixFQUFtQjtRQUM1QyxPQUFPO1lBQ0wsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUU7O29CQUVKLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztpQkFDbkM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFUyxrQ0FBa0I7Ozs7O0lBQTVCLFVBQTZCLEVBQW1CO1FBQzlDLE9BQU87WUFDTCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7WUFDeEMsV0FBVyxFQUFFO2dCQUNYLE1BQU0sRUFBRTs7b0JBRU4sVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO2lCQUNuQztnQkFDRCxNQUFNLEVBQUU7b0JBQ04sTUFBTSxFQUFFLG1CQUFLO3dCQUNYLE9BQU8sRUFBRSxJQUFJO3dCQUNiLFdBQVcsRUFBRSxHQUFHO3dCQUNoQixTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUs7d0JBQ3ZCLFNBQVMsRUFBRSxDQUFDO3dCQUNaLFNBQVMsRUFBRSxJQUFJO3FCQUNoQixFQUFBO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRVMsZ0NBQWdCOzs7OztJQUExQixVQUEyQixFQUFtQjtRQUM1QyxPQUFPO1lBQ0wsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0osWUFBWSxFQUFFLEtBQUs7b0JBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztpQkFDbkM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFUyxzQ0FBc0I7Ozs7O0lBQWhDLFVBQWlDLEVBQW1CO1FBQ2xELE9BQU87WUFDTCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7WUFDNUMsV0FBVyxFQUFFO2dCQUNYLFVBQVUsRUFBRTtvQkFDVixZQUFZLEVBQUUsS0FBSztvQkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO2lCQUNuQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVTLGtDQUFrQjs7Ozs7SUFBNUIsVUFBNkIsRUFBbUI7UUFDOUMsT0FBTztZQUNMLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0UsV0FBVyxFQUFFO2dCQUNYLE1BQU0sRUFBRTtvQkFDTixZQUFZLEVBQUUsQ0FBQztvQkFDZixXQUFXLEVBQUUsQ0FBQztvQkFDZCxZQUFZLEVBQUUsRUFBRSxDQUFDLFlBQVk7b0JBQzdCLE1BQU0sRUFBRSxLQUFLO29CQUNiLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztpQkFDbkM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFUyxtQ0FBbUI7Ozs7O0lBQTdCLFVBQThCLEVBQW1CO1FBQy9DLE9BQU87WUFDTCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7U0FDMUMsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVTLCtCQUFlOzs7OztJQUF6QixVQUEwQixFQUFtQjtRQUMzQyxPQUFPO1lBQ0wsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO1lBQ3JDLFdBQVcsRUFBRTtnQkFDWCxHQUFHLEVBQUU7b0JBQ0gsWUFBWSxFQUFFLENBQUM7b0JBQ2YsV0FBVyxFQUFFLENBQUM7b0JBQ2QsWUFBWSxFQUFFLEVBQUUsQ0FBQyxZQUFZO29CQUM3QixNQUFNLEVBQUUsS0FBSztvQkFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7aUJBQ25DO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRVMsK0JBQWU7Ozs7O0lBQXpCLFVBQTBCLEVBQW1CO1FBQzNDLE9BQU87WUFDTCxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUU7WUFDMUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxRCxXQUFXLEVBQUU7Z0JBQ1gsR0FBRyxFQUFFO29CQUNILE1BQU0sRUFBRSxTQUFTOztvQkFFakIsV0FBVyxFQUFFLENBQUM7OztvQkFHZCxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEtBQUssS0FBSzt3QkFDaEMsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsS0FBSyxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDdkMsTUFBTSxFQUFFLDBDQUEwQzs7d0JBQ2xELFFBQVEsRUFBRSxDQUFDO3FCQUNaO29CQUNELFlBQVksRUFBRSxJQUFJO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVTLG9DQUFvQjs7Ozs7SUFBOUIsVUFBK0IsRUFBbUI7UUFDaEQsT0FBTyxZQUFZLENBQ2pCO1lBQ0UsV0FBVyxFQUFFO2dCQUNYLEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO2FBQ2pGO1NBQ0YsRUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUN6QixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRVMsaUNBQWlCOzs7OztJQUEzQixVQUE0QixFQUFtQjtRQUM3QyxPQUFPO1lBQ0wsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3BDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDckIsS0FBSyxFQUFFLG1CQUFLLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUE7WUFDMUYsS0FBSyxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUU7U0FDakQsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVTLG1DQUFtQjs7Ozs7SUFBN0IsVUFBOEIsRUFBbUI7UUFDL0MsT0FBTztZQUNMLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDMUIsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSztnQkFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVTLG1DQUFtQjs7Ozs7SUFBN0IsVUFBOEIsRUFBbUI7UUFDL0MsT0FBTztZQUNMLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtZQUMxQyxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFO1lBQzNCLFdBQVcsRUFBRTtnQkFDWCxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsbUJBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsRUFBQSxFQUFFO2FBQzdEO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQXA1Q0YsVUFBVTs7OztnQkFoQkYsTUFBTTtnQkFBeUMsYUFBYTtnQkFBcEQsU0FBUztnQkFJakIsU0FBUztnQkFMVyxrQkFBa0I7Z0JBQTlCLFVBQVU7Z0JBQXNCLEtBQUs7Z0JBQ3NDLEtBQUs7O0lBcTZDakcsWUFBQztDQUFBLEFBcjVDRCxJQXE1Q0M7U0FwNUNZLEtBQUs7OztJQUNoQiw4QkFBNEI7O0lBQzVCLCtCQUE0Qjs7Ozs7SUFFNUIseUJBQTBKOzs7OztJQUUxSix5QkFBNEo7Ozs7O0lBRTVKLHlCQUE0Sjs7Ozs7SUFFNUoseUJBQTRKOzs7OztJQUU1Siw2QkFBOEo7Ozs7O0lBRTlKLDBCQU9FOzs7OztJQUNGLDBCQUFnQzs7Ozs7SUFDaEMsOEJBQW9DOzs7OztJQUNwQyw0QkFBbUM7Ozs7O0lBRXZCLHVCQUF3Qjs7Ozs7SUFBRSwwQkFBa0M7Ozs7O0lBQUUsbUJBQXVCOzs7OztJQUFFLDBCQUE4Qjs7Ozs7SUFBRSw0QkFBeUM7Ozs7O0lBQUUsMkJBQWdDOzs7OztJQUFFLHNCQUFzQjs7Ozs7SUFBRSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWNpbWFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbG9ycywgQ29yZUNvbmZpZywgTG9jYWxGb3JhZ2VTZXJ2aWNlLCBVdGlscyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IEJyb2tlciwgUmVxdWVzdG9yLCBDaGFydERlZmluaXRpb24sIERhc2hib2FyZCwgRGFzaGJvYXJkQ29yZSwgQmFzZUtwaSwgQ0FDSEVfS0VZUywgQ2FjaGUgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJzLCB0b0RhdGUsIGRhdGVGb3JtYXQsIGRhdGVEaWZmLCB0b01pbnV0ZXMsIGRhdGVBZGQsIGVuZE9mLCBkYXksIGRheXNJbk1vbnRoLCBnZXREYXRlT2ZNb250aCwgSGlnaGNoYXJ0c09wdGlvbnMsIGdldFVVSUQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgQ2VsbFJlbmRlcmVyIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2VsbC1yZW5kZXJlci9jZWxsLXJlbmRlcmVyLnNlcnZpY2UnO1xuLy9pbXBvcnQgeyBEZWx0YVJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcmVuZGVyZXJzL2RlbHRhL2RlbHRhLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5cbmltcG9ydCB7IGFzc2lnbiwgY2xvbmVEZWVwLCBkZWZhdWx0c0RlZXAsIGZpbmQsIGZpbmRJbmRleCwgZm9yRWFjaCwgaXNBcnJheSwgaXNOdW1iZXIsIGlzT2JqZWN0LCBpc1N0cmluZywga2V5cywgbGFzdCwgbWFwIGFzIF9tYXAsIG1heCwgbWVyZ2UsIG1pbiwgc29ydEJ5LCBzdW0sIHN1bUJ5LCBwaWNrIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1lcmdlTWFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcnRDYWNoZSB7XG4gIGRhdGU6IERhdGU7XG4gIGRhdGE6IGFueTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENoYXJ0IHtcbiAgcHVibGljIFBERl9ST1dfV0lEVEggPSAxMjAwO1xuICBwdWJsaWMgUERGX1JPV19IRUlHSFQgPSA4MDA7XG5cbiAgcHJvdGVjdGVkIHBhbGV0dGUwID0gWycjMDRDQzk5JywgJyNGRjYyNUYnLCAnIzFGQjZGRicsICcjRkM0NTlFJywgJyNGRjY0MDInLCAnI0ZFRDA1QicsICcjQURBREFEJywgJyM4NDVDRkYnLCAnI0ZDNDU5RScsICcjMDAwMDAwJywgJyNEMEQwRDAnLCAnI0FEQURBRCddO1xuICAvLyBbJyMzZTQ2NjYnLCAnIzM5YTBlZCcsICcjMzZmMWNkJywgJyNiMGJjZmYnLCAnI2ZmZTM3NycsICcjRURCNENBJ107XG4gIHByb3RlY3RlZCBwYWxldHRlMSA9IFsnIzA0Q0M5OScsICcjRkY2MjVGJywgLCAnIzFGQjZGRicsICcjRkM0NTlFJywgJyNGRjY0MDInLCAnI0ZFRDA1QicsICcjQURBREFEJywgJyM4NDVDRkYnLCAnI0ZDNDU5RScsICcjMDAwMDAwJywgJyNEMEQwRDAnLCAnI0FEQURBRCddO1xuICAvLyBbJyM4NzdkZWYnLCAnIzdkZGY2NCcsICcjZjc2YzZjJywgJyM1YmMwZWInLCAnI2ZkZTc0YycsICcjNDA0ZTRkJ107XG4gIHByb3RlY3RlZCBwYWxldHRlMiA9IFsnIzA0Q0M5OScsICcjRkY2MjVGJywgLCAnIzFGQjZGRicsICcjRkM0NTlFJywgJyNGRjY0MDInLCAnI0ZFRDA1QicsICcjQURBREFEJywgJyM4NDVDRkYnLCAnI0ZDNDU5RScsICcjMDAwMDAwJywgJyNEMEQwRDAnLCAnI0FEQURBRCddO1xuICAvLyBbJyM1MUUzQzInLCAnIzRBOTBFMicsICcjRjlCQjRFJywgJyNGNzZDNkMnLCAnIzFEOTc3RScsICcjNEVEMkI4JywgJyM1NENCRTEnLCAnIzZGODdENScsICcjQzA2QURDJywgJyM2NDUwOTgnXTtcbiAgcHJvdGVjdGVkIHBhbGV0dGUzID0gWycjMDRDQzk5JywgJyNGRjYyNUYnLCAsICcjMUZCNkZGJywgJyNGQzQ1OUUnLCAnI0ZGNjQwMicsICcjRkVEMDVCJywgJyNBREFEQUQnLCAnIzg0NUNGRicsICcjRkM0NTlFJywgJyMwMDAwMDAnLCAnI0QwRDBEMCcsICcjQURBREFEJ107XG4gIC8vIFsnIzdGOEZBNCcsICcjZjc2YzZjJywgJyMzMmQyYjYnLCAnIzViYzBlYicsICcjZmRlZjU3JywgJyM4NzdkZWYnXTtcbiAgcHJvdGVjdGVkIHBhbGV0dGVCb29zdCA9IFsnI0Y0Njg4NScsICcjRkNBRTQ5JywgJyMxRkI2RkYnLCAnI0ZDNDU5RScsICcjRkY2NDAyJywgJyNGRUQwNUInLCAnI0FEQURBRCcsICcjODQ1Q0ZGJywgJyNGQzQ1OUUnLCAnIzAwMDAwMCcsICcjRDBEMEQwJywgJyNBREFEQUQnXTtcblxuICBwcm90ZWN0ZWQgdGV4dFN0eWxlID0ge1xuICAgIGZvbnRGYW1pbHk6ICdMYXRvJyxcbiAgICBjb2xvcjogQ29sb3JzLmJsYWNrLFxuICAgIGZvbnRXZWlnaHQ6ICczMDAnLFxuICAgIGZvbnRTaXplOiAnMTNweCcsXG4gICAgd2hpdGVTcGFjZTogJ25vcm1hbCcsXG4gICAgdGV4dFNoYWRvdzogZmFsc2VcbiAgfTtcbiAgcHJvdGVjdGVkIGxpbmVDb2xvciA9ICcjRTFFOEVFJztcbiAgcHJvdGVjdGVkIGdyaWRMaW5lQ29sb3IgPSAnI0Y0RjhGQyc7XG4gIHByb3RlY3RlZCBkZWNpbWFsUGlwZTogRGVjaW1hbFBpcGU7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGJyb2tlcjogQnJva2VyLCBwcm90ZWN0ZWQgZGFzaGJvYXJkOiBEYXNoYm9hcmRDb3JlLCBwcm90ZWN0ZWQgcnE6IFJlcXVlc3RvciwgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlLCBwcm90ZWN0ZWQgbG9jYWxGb3JhZ2U6IExvY2FsRm9yYWdlU2VydmljZSwgcHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByb3RlY3RlZCB1dGlsczogVXRpbHMsIHByb3RlY3RlZCBjYWNoZTogQ2FjaGUpIHtcbiAgICB0aGlzLmRlY2ltYWxQaXBlID0gbmV3IERlY2ltYWxQaXBlKHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRBbmd1bGFyTG9jYWxlKCkpO1xuICB9XG5cbiAgZ2V0RmlsZW5hbWVTdWZmaXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ycS5nZXRGaWxlbmFtZVN1ZmZpeCgpO1xuICB9XG5cbiAgZW5jb2RlQ2hhcnQoY2hhcnQ6IENoYXJ0RGVmaW5pdGlvbikge1xuICAgIGlmIChjaGFydC5hZ2dyZWdhdGVPcHRpb25zICYmICFpc1N0cmluZyhjaGFydC5hZ2dyZWdhdGVPcHRpb25zKSkge1xuICAgICAgY2hhcnQuYWdncmVnYXRlT3B0aW9ucyA9IDxhbnk+SlNPTi5zdHJpbmdpZnkoY2hhcnQuYWdncmVnYXRlT3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChjaGFydC5rcGlGb3JtVmFsdWVzICYmIGNoYXJ0LmtwaUZvcm1WYWx1ZXMuY2FtcGFpZ25zKSB7XG4gICAgICBjaGFydC5rcGlGb3JtVmFsdWVzLmNhbXBhaWducyA9IGNoYXJ0LmtwaUZvcm1WYWx1ZXMuY2FtcGFpZ25zLm1hcChjID0+IHBpY2soYywgWyd0aXRsZScsICdfaWQnLCAnc2NvcmluZyddKSk7XG4gICAgfVxuICAgIGlmIChjaGFydC5rcGlGb3JtVmFsdWVzICYmIGNoYXJ0LmtwaUZvcm1WYWx1ZXMubWlzc2lvbnNjb3Jlcykge1xuICAgICAgaWYgKGNoYXJ0LmtwaUZvcm1WYWx1ZXMubWlzc2lvbnNjb3Jlcy5zZWxlY3RlZERlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNoYXJ0LmtwaUZvcm1WYWx1ZXMubWlzc2lvbnNjb3Jlcy5zZWxlY3RlZERlc2NyaXB0aW9uID0gcGljayhjaGFydC5rcGlGb3JtVmFsdWVzLm1pc3Npb25zY29yZXMuc2VsZWN0ZWREZXNjcmlwdGlvbiwgWyd0aXRsZScsICdfaWQnLCAnc2NvcmluZyddKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFydC5rcGlGb3JtVmFsdWVzLm1pc3Npb25zY29yZXMuc2NvcmVzKSB7XG4gICAgICAgIGxldCBzY29yZSA9IGNoYXJ0LmtwaUZvcm1WYWx1ZXMubWlzc2lvbnNjb3Jlcy5zY29yZXM7XG4gICAgICAgIGlmIChpc0FycmF5KHNjb3JlKSAmJiAoPGFueT5zY29yZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHNjb3JlID0gc2NvcmVbMF07XG4gICAgICAgIH1cbiAgICAgICAgY2hhcnQua3BpRm9ybVZhbHVlcy5taXNzaW9uc2NvcmVzLnNjb3JlcyA9IHBpY2soc2NvcmUsIFsndGl0bGUnLCAnaXNBY3RpdmUnXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVjb2RlQ2hhcnQoY2hhcnQ6IENoYXJ0RGVmaW5pdGlvbikge1xuICAgIGlmIChjaGFydC5hZ2dyZWdhdGVPcHRpb25zICYmIGlzU3RyaW5nKGNoYXJ0LmFnZ3JlZ2F0ZU9wdGlvbnMpKSB7XG4gICAgICBjaGFydC5hZ2dyZWdhdGVPcHRpb25zID0gPGFueT5KU09OLnBhcnNlKDxhbnk+Y2hhcnQuYWdncmVnYXRlT3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICgoPGFueT5jaGFydCkuYWdncmVnYXRlRGF0YSAmJiBpc1N0cmluZygoPGFueT5jaGFydCkuYWdncmVnYXRlRGF0YSkpIHtcbiAgICAgICg8YW55PmNoYXJ0KS5hZ2dyZWdhdGVEYXRhID0gPGFueT5KU09OLnBhcnNlKCg8YW55PmNoYXJ0KS5hZ2dyZWdhdGVEYXRhKTtcbiAgICB9XG4gICAgaWYgKCFjaGFydC5faWQpIHtcbiAgICAgIGNoYXJ0Ll9pZCA9IGdldFVVSUQoKTtcbiAgICB9XG4gIH1cblxuICBlbmNvZGUoZW50aXR5OiBEYXNoYm9hcmQpIHtcbiAgICBpZiAoIWVudGl0eSkge1xuICAgICAgcmV0dXJuIGVudGl0eTtcbiAgICB9XG4gICAgbGV0IG5ld2VudGl0eTogRGFzaGJvYXJkID0gY2xvbmVEZWVwKGVudGl0eSk7XG4gICAgZm9yRWFjaChuZXdlbnRpdHkudGFicywgdGFiID0+IHtcbiAgICAgIGlmICh0YWIgJiYgdGFiLml0ZW1zKSB7XG4gICAgICAgIGZvckVhY2godGFiLml0ZW1zLCBpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmRlZmluaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZW5jb2RlQ2hhcnQoaXRlbS5kZWZpbml0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG5ld2VudGl0eS50YWJzICYmIG5ld2VudGl0eS50YWJzLmxlbmd0aCA+IDAgJiYgbmV3ZW50aXR5LnRhYnNbMF0uaXRlbXMgJiYgbmV3ZW50aXR5LnRhYnNbMF0uaXRlbXMubGVuZ3RoID4gMCAmJiBuZXdlbnRpdHkudGFic1swXS5pdGVtc1swXS5kZWZpbml0aW9uICYmIG5ld2VudGl0eS50YWJzWzBdLml0ZW1zWzBdLmRlZmluaXRpb24ua3BpVHlwZSkge1xuICAgICAgbmV3ZW50aXR5Lmljb24gPSB0aGlzLmdldEtwaUljb24obmV3ZW50aXR5LnRhYnNbMF0uaXRlbXNbMF0uZGVmaW5pdGlvbi5rcGlUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld2VudGl0eTtcbiAgfVxuXG4gIGRlY29kZShlbnRpdHk6IERhc2hib2FyZCkge1xuICAgIGZvckVhY2goZW50aXR5LnRhYnMsIHRhYiA9PiB7XG4gICAgICBmb3JFYWNoKHRhYi5pdGVtcywgaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZGVmaW5pdGlvbikge1xuICAgICAgICAgIHRoaXMuZGVjb2RlQ2hhcnQoaXRlbS5kZWZpbml0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGVudGl0eTtcbiAgfVxuXG4gIGNsb25lKGNkOiBDaGFydERlZmluaXRpb24pIHtcbiAgICBsZXQgbmV3Q2QgPSBjbG9uZURlZXAoY2QpO1xuICAgIG5ld0NkLl9pZCA9IGdldFVVSUQoKTtcbiAgICByZXR1cm4gbmV3Q2Q7XG4gIH1cblxuICBzYXZlRGFzaGJvYXJkKGVudGl0eTogRGFzaGJvYXJkKSB7XG4gICAgbGV0IG5ld0VudGl0eSA9IHRoaXMuZW5jb2RlKGVudGl0eSk7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLnVwc2VydCgnZGFzaGJvYXJkcycsIG5ld0VudGl0eSkucGlwZShtYXAocmV0VmFsID0+IHRoaXMuZGVjb2RlKHJldFZhbCkpKTtcbiAgfVxuXG4gIGRlbGV0ZURhc2hib2FyZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmRlbGV0ZSgnZGFzaGJvYXJkcycsIGlkKTtcbiAgfVxuXG4gIGdldERhdGEoY2Q6IENoYXJ0RGVmaW5pdGlvbiwgY29tcG9uZW50OiBhbnksIGZvcmNlUmVmcmVzaCA9IGZhbHNlLCBzdGFydCA9IDAsIHNob3dQcmV2aW91c1llYXIgPSBmYWxzZSkge1xuICAgIHJldHVybiB0aGlzLmdldERhdGFPYnNlcnZhYmxlKGNkLCBjb21wb25lbnQsIGZvcmNlUmVmcmVzaCwgc3RhcnQsIHNob3dQcmV2aW91c1llYXIpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKCdlcnJvcicpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0QWdncmVnYXRlUXVlcnkoY2Q6IENoYXJ0RGVmaW5pdGlvbiwgY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZmlsdGVycz86IEZpbHRlcnMsIG9wdGlvbnM/OiBBcnJheTxhbnk+LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICAgIHJldHVybiBmcm9tKHRoaXMuZ2V0RGF0YUZyb21DYWNoZShjZCkpLnBpcGUoXG4gICAgICBtZXJnZU1hcChkYXRhID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgZm9yY2VSZWZyZXNoICE9PSB0cnVlID8gb2YoZGF0YSkgOiB0aGlzLmJyb2tlci5hZ2dyZWdhdGVRdWVyeShjb2xsZWN0aW9uTmFtZSwgZmlsdGVycywgb3B0aW9ucyk7XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5hZGREYXRhVG9DYWNoZShjZCwgZGF0YSkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0Q2hhcnRDYWNoZShpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KENBQ0hFX0tFWVMuY2hhcnQsIGlkKS50b1Byb21pc2UoKTtcbiAgICAvL3JldHVybiB0aGlzLmxvY2FsRm9yYWdlLmdldDxDaGFydENhY2hlPihDQUNIRV9LRVlTLmNoYXJ0ICsgJy4nICsgaWQpO1xuICB9XG5cbiAgc2V0Q2hhcnRDYWNoZShpZDogc3RyaW5nLCBjYWNoZSkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmFkZChDQUNIRV9LRVlTLmNoYXJ0LCBpZCwgY2FjaGUpO1xuICAgIC8vcmV0dXJuIHRoaXMubG9jYWxGb3JhZ2Uuc2V0PENoYXJ0Q2FjaGU+KENBQ0hFX0tFWVMuY2hhcnQgKyAnLicgKyBpZCwgY2FjaGUpO1xuICB9XG5cbiAgY2xlYXJDaGFydENhY2hlKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5yZW1vdmUoQ0FDSEVfS0VZUy5jaGFydCwgaWQpO1xuICAgIC8vcmV0dXJuIHRoaXMubG9jYWxGb3JhZ2UucmVtb3ZlKENBQ0hFX0tFWVMuY2hhcnQgKyAnLicgKyBpZCk7XG4gIH1cblxuICBnZXREYXRhRnJvbUNhY2hlKGNkOiBDaGFydERlZmluaXRpb24pIHtcbiAgICBpZiAoY2QuX2lkKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRDaGFydENhY2hlKGNkLl9pZCkudGhlbihjYWNoZSA9PiB7XG4gICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgIGlmICh0b01pbnV0ZXMoZGF0ZURpZmYobmV3IERhdGUoKSwgdG9EYXRlKGNhY2hlLmRhdGUpKSkgPCAxNSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLmRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cblxuICBhZGREYXRhVG9DYWNoZShjZDogQ2hhcnREZWZpbml0aW9uLCBkYXRhKSB7XG4gICAgaWYgKGNkLl9pZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2hhcnRDYWNoZShjZC5faWQpXG4gICAgICAgIC50aGVuKGNhY2hlID0+IHtcbiAgICAgICAgICBjYWNoZSA9IHsgZGF0ZTogbmV3IERhdGUoKSwgZGF0YTogY2xvbmVEZWVwKGRhdGEpIH07XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0Q2hhcnRDYWNoZShjZC5faWQsIGNhY2hlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgICB9XG4gIH1cblxuICBnZXRLcGlEYXRhKGNkOiBDaGFydERlZmluaXRpb24sIGNvbXBvbmVudCwgZm9yY2VSZWZyZXNoID0gZmFsc2UsIHNob3dQcmV2aW91c1llYXIgPSBmYWxzZSkge1xuICAgIGxldCB0eXBlOiBhbnkgPSB0aGlzLmdldEtwaUNsYXNzKGNkLmtwaVR5cGUpO1xuICAgIHR5cGUuZ2V0Q2hhcnREZWZpbml0aW9uKGNkLmtwaUZvcm1WYWx1ZXMsIGNkLCB0aGlzLnRyYW5zbGF0ZSk7XG4gICAgaWYgKGNkICYmIGNkLmtwaVR5cGUgPT09ICdDaGFydElPS3BpJykge1xuICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICB9XG5cbiAgICBsZXQgYWdncmVnYXRlID0gdHlwZS5nZXRBZ2dyZWdhdGUoY2Qua3BpRm9ybVZhbHVlcywgdGhpcy50cmFuc2xhdGUsIHNob3dQcmV2aW91c1llYXIpO1xuXG4gICAgaWYgKGNkLmtwaUZvcm1WYWx1ZXMucG9pbnRQYWRkaW5nKSB7XG4gICAgICBjZC5wb2ludFBhZGRpbmcgPSBjZC5rcGlGb3JtVmFsdWVzLnBvaW50UGFkZGluZztcbiAgICB9XG4gICAgaWYgKGNkLmtwaUZvcm1WYWx1ZXMubnVtYmVyUHJlY2lzaW9uKSB7XG4gICAgICBjZC5udW1iZXJQcmVjaXNpb24gPSBjZC5rcGlGb3JtVmFsdWVzLm51bWJlclByZWNpc2lvbjtcbiAgICB9XG4gICAgaWYgKGFnZ3JlZ2F0ZS5tYXBUcmFuc2Zvcm0gJiYgYWdncmVnYXRlLm1hcFRyYW5zZm9ybUFzeW5jKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBZ2dyZWdhdGVRdWVyeShjZCwgYWdncmVnYXRlLmNvbGxlY3Rpb25OYW1lLCBhZ2dyZWdhdGUuZmlsdGVycywgYWdncmVnYXRlLmFnZ3JlZ2F0ZU9wdGlvbnMsIGZvcmNlUmVmcmVzaCkucGlwZShcbiAgICAgICAgbWVyZ2VNYXAocmVzID0+IHtcbiAgICAgICAgICByZXR1cm4gYWdncmVnYXRlLm1hcFRyYW5zZm9ybShyZXMsIGNkLCB0aGlzLmJyb2tlciwgY29tcG9uZW50KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEFnZ3JlZ2F0ZVF1ZXJ5KGNkLCBhZ2dyZWdhdGUuY29sbGVjdGlvbk5hbWUsIGFnZ3JlZ2F0ZS5maWx0ZXJzLCBhZ2dyZWdhdGUuYWdncmVnYXRlT3B0aW9ucywgZm9yY2VSZWZyZXNoKS5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICByZXR1cm4gYWdncmVnYXRlLm1hcFRyYW5zZm9ybSA/IGFnZ3JlZ2F0ZS5tYXBUcmFuc2Zvcm0ocmVzLCBjZCwgdGhpcy5icm9rZXIsIGNvbXBvbmVudCkgOiByZXM7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGdldEtwaUNsYXNzKHR5cGU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRLcGlJY29uKHR5cGU6IHN0cmluZykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0S3BpSWNvbkJ5VHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldERhdGFPYnNlcnZhYmxlKGNkOiBDaGFydERlZmluaXRpb24sIGNvbXBvbmVudDogYW55LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSwgc3RhcnQgPSAwLCBzaG93UHJldmlvdXNZZWFyID0gZmFsc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuZGVjb2RlQ2hhcnQoY2QpO1xuICAgIGlmIChjZC5kYXRhKSB7XG4gICAgICByZXR1cm4gb2YoY2QuZGF0YSk7XG4gICAgfSBlbHNlIGlmIChjZC5rcGkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEtwaURhdGEoY2QsIGNvbXBvbmVudCwgZm9yY2VSZWZyZXNoLCBzaG93UHJldmlvdXNZZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNkLmdyb3VwQnlEYXRlKSB7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkLnNldFRpbWVzY2FsZShjZC5maWx0ZXJzLCBjZC50aW1lc2NhbGUsIGNkLmRhdGVGaWVsZCB8fCAnZmluaXNoZWREYXRlJywgY2QuZW5kRGF0ZSk7XG4gICAgICAgIGxldCBmb3JtYXQgPSBCYXNlS3BpLmdldERhdGVGb3JtYXQoY2QuZGF0ZUdyb3VwaW5nKTtcbiAgICAgICAgaWYgKGNkLmFnZ3JlZ2F0ZU9wdGlvbnMgJiYgY2QuYWdncmVnYXRlT3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWdncmVnYXRlUXVlcnkoY2QsIGNkLmNvbGxlY3Rpb25OYW1lLCBjZC5maWx0ZXJzLCBjZC5hZ2dyZWdhdGVPcHRpb25zLCBmb3JjZVJlZnJlc2gpLnBpcGUoXG4gICAgICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNkLm1hcFRyYW5zZm9ybSA/IGNkLm1hcFRyYW5zZm9ybShyZXMsIGNkLCB0aGlzLmJyb2tlciwgY29tcG9uZW50KSA6IHJlcztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgYWdncmVnYXRlT3B0aW9ucyA9IFtdO1xuICAgICAgICAgIGlmIChjZC5ncm91cEJ5Q2FtcGFpZ24pIHtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZU9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICRwcm9qZWN0OiB7XG4gICAgICAgICAgICAgICAgX2lkOiAxLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnJHRpdGxlJyxcbiAgICAgICAgICAgICAgICBkYXRlOiB7XG4gICAgICAgICAgICAgICAgICAkZGF0ZVRvU3RyaW5nOiB7IGZvcm1hdDogZm9ybWF0LCBkYXRlOiAnJCcgKyAoY2QuZGF0ZUZpZWxkIHx8ICdmaW5pc2hlZERhdGUnKSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZU9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgICAgIF9pZDogeyBkYXRlOiAnJGRhdGUnLCB0aXRsZTogJyR0aXRsZScgfSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogeyAkc3VtOiAxIH0sXG4gICAgICAgICAgICAgICAga2V5czogeyAkYWRkVG9TZXQ6ICckX2lkJyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbWF0Y2g6IGFueSA9IHt9O1xuICAgICAgICAgICAgbWF0Y2hbY2QuZGF0ZUZpZWxkIHx8ICdmaW5pc2hlZERhdGUnXSA9IHsgJHR5cGU6IDkgfTtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZU9wdGlvbnMucHVzaCh7ICRtYXRjaDogbWF0Y2ggfSk7XG4gICAgICAgICAgICBhZ2dyZWdhdGVPcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgICAgICBfaWQ6IHtcbiAgICAgICAgICAgICAgICAgICRkYXRlVG9TdHJpbmc6IHsgZm9ybWF0OiBmb3JtYXQsIGRhdGU6ICckJyArIChjZC5kYXRlRmllbGQgfHwgJ2ZpbmlzaGVkRGF0ZScpIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB7ICRzdW06IDEgfSxcbiAgICAgICAgICAgICAgICBrZXlzOiB7ICRhZGRUb1NldDogJyRfaWQnIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmdldEFnZ3JlZ2F0ZVF1ZXJ5KGNkLCBjZC5jb2xsZWN0aW9uTmFtZSwgY2QuZmlsdGVycywgYWdncmVnYXRlT3B0aW9ucywgZm9yY2VSZWZyZXNoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKChjZC5hZ2dyZWdhdGVPcHRpb25zICYmIGNkLmFnZ3JlZ2F0ZU9wdGlvbnMubGVuZ3RoID4gMCkgfHwgKGNkLmZpbHRlcnMgJiYgY2QuZmlsdGVycy5sZW5ndGggPiAwKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldEFnZ3JlZ2F0ZVF1ZXJ5KGNkLCBjZC5jb2xsZWN0aW9uTmFtZSwgY2QuZmlsdGVycywgY2QuYWdncmVnYXRlT3B0aW9ucywgZm9yY2VSZWZyZXNoKS5waXBlKFxuICAgICAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBjZC5tYXBUcmFuc2Zvcm0gPyBjZC5tYXBUcmFuc2Zvcm0ocmVzLCBjZCwgdGhpcy5icm9rZXIsIGNvbXBvbmVudCkgOiByZXM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENoYXJ0Q29uZmlnKGNkOiBDaGFydERlZmluaXRpb24sIGRhdGEpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmdldEhDQ2hhcnRDb25maWcoY2QsIGRhdGEpO1xuICB9XG5cbiAgZ2V0R3JpZENvbmZpZyhjZDogQ2hhcnREZWZpbml0aW9uLCBkYXRhKTogYW55IHtcbiAgICBpZiAoY2Qua3BpVHlwZSA9PT0gJ0NhbXBhaWduc1Bpdm90VGFibGVLcGknKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb2x1bW5EZWZzOiBjZC5rcGlDb2x1bW5zLFxuICAgICAgICByb3dEYXRhOiBkYXRhXG4gICAgICB9O1xuICAgIH1cbiAgICBsZXQgY29uZmlnID0gdGhpcy5nZXRIQ0NoYXJ0Q29uZmlnKGNkLCBkYXRhKTtcbiAgICBsZXQgY29sdW1uRGVmczogQXJyYXk8YW55PiA9IFtcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyTmFtZTogY2QuZ3JvdXBCeURhdGUgPyB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0RBVEUnKSA6IHRoaXMudHJhbnNsYXRlLmdldCgnQ0FURUdPUlknKSxcbiAgICAgICAgZmllbGQ6ICdrZXknXG4gICAgICB9XG4gICAgXTtcbiAgICBpZiAoY2QuZ3JvdXBCeURhdGUpIHtcbiAgICAgIGNvbHVtbkRlZnNbMF0uY29tcGFyYXRvciA9ICdkYXRlQ29tcGFyYXRvcic7XG4gICAgfVxuICAgIGxldCByb3dzID0gbmV3IE1hcDxzdHJpbmcsIE9iamVjdD4oKTtcblxuICAgIGNvbmZpZy5zZXJpZXMuZm9yRWFjaCgocywgaSkgPT4ge1xuICAgICAgaWYgKHMubmFtZSA9PT0gJ1JlZ3Jlc3Npb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbHVtbkRlZnMucHVzaCg8YW55PntcbiAgICAgICAgaGVhZGVyTmFtZTogcy5uYW1lLFxuICAgICAgICBmaWVsZDogJ3NlcmllJyArIGksXG4gICAgICAgIGhlYWRlclRvb2x0aXA6IHMubmFtZSxcbiAgICAgICAgbWluV2lkdGg6IDQwXG4gICAgICB9KTtcbiAgICAgIGlmIChjZC50eXBlID09PSAnc2NhdHRlcicpIHtcbiAgICAgICAgY29sdW1uRGVmcy5wdXNoKDxhbnk+e1xuICAgICAgICAgIGhlYWRlck5hbWU6IHMubmFtZSxcbiAgICAgICAgICBmaWVsZDogJ3NlcmlleCcgKyBpLFxuICAgICAgICAgIGhlYWRlclRvb2x0aXA6IHMubmFtZSArICc6IHgnLFxuICAgICAgICAgIG1pbldpZHRoOiA0MFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjZC5zaG93RGVsdGEpIHtcbiAgICAgICAgbGFzdChjb2x1bW5EZWZzKS5jZWxsUmVuZGVyZXIgPSAnZGVsdGFSZW5kZXJlcic7IC8vRGVsdGFSZW5kZXJlckNvbXBvbmVudC5yZW5kZXJlcjtcbiAgICAgIH1cbiAgICAgIGZvckVhY2goKHMgYXMgYW55KS5kYXRhLCAoZDogYW55LCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQga2V5LCB2YWx1ZSwgeDtcbiAgICAgICAgaWYgKGlzQXJyYXkoZCkpIHtcbiAgICAgICAgICBrZXkgPSBkYXRlRm9ybWF0KHRvRGF0ZShkWzBdKSwgJ0wnKTtcbiAgICAgICAgICB2YWx1ZSA9IGRbMV07XG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZCkgJiYgZC5uYW1lKSB7XG4gICAgICAgICAga2V5ID0gZC5uYW1lO1xuICAgICAgICAgIHZhbHVlID0gZC55O1xuICAgICAgICAgIGlmIChjZC50eXBlID09PSAnc2NhdHRlcicpIHtcbiAgICAgICAgICAgIHggPSBkLng7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGQpICYmIGQueCkge1xuICAgICAgICAgIGtleSA9IGRhdGVGb3JtYXQodG9EYXRlKGQueCksICdMJyk7XG4gICAgICAgICAgdmFsdWUgPSBkLnk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnhBeGlzICYmICg8YW55PmNvbmZpZy54QXhpcykuY2F0ZWdvcmllcyAmJiAoPGFueT5jb25maWcueEF4aXMpLmNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGtleSA9ICg8YW55PmNvbmZpZy54QXhpcykuY2F0ZWdvcmllc1tpbmRleF07XG4gICAgICAgICAgdmFsdWUgPSBkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICBsZXQgcm93OiBhbnkgPSByb3dzLmdldChrZXkpIHx8IHsga2V5OiBrZXkgfTtcbiAgICAgICAgICByb3dbJ3NlcmllJyArIGldID0gaXNOdW1iZXIodmFsdWUpID8gdGhpcy5kZWNpbWFsUGlwZS50cmFuc2Zvcm0odmFsdWUsIHRoaXMuZ2V0TnVtYmVyRm9ybWF0KGNkKSkgOiB2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZyA/IHZhbHVlLnRvU3RyaW5nKCkgOiB2YWx1ZTtcbiAgICAgICAgICBpZiAoY2QudHlwZSA9PT0gJ3NjYXR0ZXInKSB7XG4gICAgICAgICAgICByb3dbJ3NlcmlleCcgKyBpXSA9IHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJvd3Muc2V0KGtleSwgcm93KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbHVtbkRlZnM6IGNvbHVtbkRlZnMsXG4gICAgICByb3dEYXRhOiBBcnJheS5mcm9tKHJvd3MudmFsdWVzKCkpXG4gICAgfTtcbiAgfVxuXG4gIGdldE1hcENvbmZpZyhjZDogQ2hhcnREZWZpbml0aW9uLCBkYXRhOiBBcnJheTxhbnk+KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRNaWNyb0NvbmZpZyhjZDogQ2hhcnREZWZpbml0aW9uLCBkYXRhOiBhbnkpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgbGV0IGRlbHRhO1xuICAgIGlmIChpc0FycmF5KGRhdGEpKSB7XG4gICAgICB2YWx1ZSA9IE1hdGgucm91bmQoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDAgPyAoPGFueT5kYXRhKVswXS52YWx1ZSA6IDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICBkZWx0YSA9IGRhdGEuZGVsdGE7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogY2QudGl0bGUsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBkZWx0YTogZGVsdGEsXG4gICAgICBpbmZvOiBjZC5taWNyb0luZm9cbiAgICB9O1xuICB9XG5cbiAgZ2V0UGl2b3RUYWJsZUNvbmZpZyhjZDogQ2hhcnREZWZpbml0aW9uLCBkYXRhOiBhbnkpIHtcbiAgICBsZXQgZ3JpZENvbmZpZyA9IHRoaXMuZ2V0R3JpZENvbmZpZyhjZCwgZGF0YSk7XG4gICAgbGV0IGdyaWRPcHRpb25zID0ge1xuICAgICAgcm93SGVpZ2h0OiA1MixcbiAgICAgIHJvd1N0eWxlOiB7ICdsaW5lLWhlaWdodCc6ICczMnB4JyB9LFxuICAgICAgaGVhZGVySGVpZ2h0OiA0MCxcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHsgc29ydGFibGU6IHRydWUsIHJlc2l6YWJsZTogdHJ1ZSB9LFxuICAgICAgLy9kYXRlQ29tcG9uZW50OiBudWxsLFxuICAgICAgc3VwcHJlc3NUb3VjaDogdHJ1ZVxuICAgIH07XG5cbiAgICBhc3NpZ24oZ3JpZE9wdGlvbnMsIHtcbiAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgIC8vc2hvd1Rvb2xQYW5lbDogZmFsc2UsXG4gICAgICBwaXZvdFBhbmVsU2hvdzogZmFsc2UsXG4gICAgICAvL3Rvb2xQYW5lbFN1cHByZXNzU2lkZUJ1dHRvbnM6IHRydWUsXG4gICAgICByb3dTZWxlY3Rpb246ICdzaW5nbGUnLFxuICAgICAgY29sdW1uRGVmczogZ3JpZENvbmZpZy5jb2x1bW5EZWZzLFxuICAgICAgcm93RGF0YTogZ3JpZENvbmZpZy5yb3dEYXRhXG4gICAgfSk7XG5cbiAgICAvL3JvdyBzb3J0aW5nXG4gICAgaWYgKGNkLmtwaVR5cGUgPT09ICdDYW1wYWlnbnNQaXZvdFRhYmxlS3BpJykge1xuICAgICAgYXNzaWduKGdyaWRPcHRpb25zLCBDZWxsUmVuZGVyZXIuZ2V0UGl2b3RDb25maWcodGhpcy50cmFuc2xhdGUpKTtcbiAgICAgIGFzc2lnbihncmlkT3B0aW9ucywge1xuICAgICAgICBwaXZvdE1vZGU6IGNkLmdyaWRQaXZvdE1vZGUgLy8sXG4gICAgICAgIC8vb25Nb2RlbFVwZGF0ZWQ6IChldmVudCkgPT4gdGhpcy5vbkdyaWRNb2RlbFVwZGF0ZWQoZXZlbnQpXG4gICAgICB9KTtcbiAgICAgIGdyaWRDb25maWcucm93cyA9IHRoaXMuY2FtcGFpZ25zUGl2b3RUYWJsZUtwaVNvcnRSb3dzKGNkLCBncmlkQ29uZmlnLnJvd3MpO1xuICAgICAgLy8gICAgIGlmICghdGhpcy5zaG93RnVsbHNjcmVlbikge1xuICAgICAgLy8gICAgICAgICBncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnVuc2hpZnQoe1xuICAgICAgLy8gICAgICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy50cmFuc2xhdGUuZ2V0KCdWSUVXJyksXG4gICAgICAvLyAgICAgICAgICAgICBjb2xJZDogJ3ZpZXdCdXR0b24nLFxuICAgICAgLy8gICAgICAgICAgICAgZ3JvdXBJZDogJ3ZpZXcnLFxuICAgICAgLy8gICAgICAgICAgICAgd2lkdGg6IDcwLFxuICAgICAgLy8gICAgICAgICAgICAgaGVhZGVyQ2xhc3M6ICdjZW50ZXJlZCcsXG4gICAgICAvLyAgICAgICAgICAgICBjZWxsQ2xhc3M6ICdvdmVyZmxvdycsXG4gICAgICAvLyAgICAgICAgICAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICAgIC8vICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICAgIC8vICAgICAgICAgICAgIHN1cHByZXNzRmlsdGVyOiB0cnVlLFxuICAgICAgLy8gICAgICAgICAgICAgcGlubmVkOiAnbGVmdCcsXG4gICAgICAvLyAgICAgICAgICAgICBtZW51VGFiczogWydmaWx0ZXJNZW51VGFiJ10sXG4gICAgICAvLyAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAvLyAgICAgICAgICAgICAgICAgaWNvbjogJ3lvLWV5ZScsXG4gICAgICAvLyAgICAgICAgICAgICAgICAgY29sb3I6ICdkYXJrJyxcbiAgICAgIC8vICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnRyYW5zbGF0ZS5nZXQoJ1ZJRVcnKVxuICAgICAgLy8gICAgICAgICAgICAgfSxcbiAgICAgIC8vICAgICAgICAgICAgIGNlbGxSZW5kZXJlckZyYW1ld29yazogQnV0dG9uUmVuZGVyZXJDb21wb25lbnQsXG4gICAgICAvLyAgICAgICAgICAgICBvbkNlbGxDbGlja2VkOiAocGFyYW1zKSA9PiB7XG4gICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGtleXM7XG4gICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5kYXRhICYmIHBhcmFtcy5kYXRhLl9pZCkge1xuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBrZXlzID0gW3BhcmFtcy5kYXRhLl9pZF07XG4gICAgICAvLyAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMgJiYgcGFyYW1zLm5vZGUgJiYgcGFyYW1zLm5vZGUuYWxsTGVhZkNoaWxkcmVuKSB7XG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGtleXMgPSBwYXJhbXMubm9kZS5hbGxMZWFmQ2hpbGRyZW4ubWFwKGMgPT4gYy5kYXRhLl9pZCk7XG4gICAgICAvLyAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKGtleXMgJiYga2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNXZWIoKSkge1xuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3VibGVDbGljay5lbWl0KGtleXMpO1xuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkLmVtaXQoeyBrZXlzIH0pO1xuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAvLyAgICAgfVxuICAgICAgLy9cbiAgICB9XG4gICAgcmV0dXJuIGdyaWRPcHRpb25zO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNhbXBhaWduc1Bpdm90VGFibGVLcGlTb3J0Um93cyhjZDogQ2hhcnREZWZpbml0aW9uLCByb3dzOiBBcnJheTxhbnk+KSB7XG4gICAgbGV0IHNvcnRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XG4gICAgICBsZXQgY29sdW1uTmFtZSA9ICd0YWdHcm91cCcgKyBpO1xuICAgICAgaWYgKGNkLmtwaUZvcm1WYWx1ZXNbY29sdW1uTmFtZV0pIHtcbiAgICAgICAgc29ydHMucHVzaChjb2x1bW5OYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBzb3J0Qnkocm93cywgc29ydHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcm93cztcbiAgICB9XG4gIH1cblxuICBnZXRDYWxlbmRhckRhdGEoZGF0ZXM6IGFueSA9IG51bGwsIGRhdGE6IEFycmF5PGFueT4pOiBhbnkge1xuICAgIGlmIChkYXRlcyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAvLyBuZWVkIHRvIGdldCBkYXRlcyBmcm9tIHRoZSBjb21wb25lbnRcbiAgICBsZXQgdGltZVNwYW4gPSBkYXRlcy5hbW91bnQgLSAxO1xuICAgIGxldCB0aW1lU2NhbGUgPSBkYXRlcy50aW1lc2NhbGU7XG4gICAgbGV0IG91dHB1dERhdGEgPSBbXTtcbiAgICBsZXQgeEF4aXMgPSBbXTtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBjdXJyZW50RGF0ZSA9IHRvRGF0ZShkYXRhWzBdLl9pZCk7XG4gICAgICBsZXQgc3RvcERhdGUgPSBlbmRPZihkYXRlQWRkKHRvRGF0ZShkYXRhWzBdLl9pZCksIHRpbWVTY2FsZSwgdGltZVNwYW4pLCB0aW1lU2NhbGUpO1xuXG4gICAgICBsZXQgd2Vla051bWJlciA9IDA7XG4gICAgICBsZXQgZGF5VG9ZID0gWzAsIDYsIDUsIDQsIDMsIDIsIDFdOyAvLyBNb25kYXkgaXMgNlxuICAgICAgd2hpbGUgKGN1cnJlbnREYXRlIDw9IHN0b3BEYXRlKSB7XG4gICAgICAgIGxldCBzdHJpbmdEYXRlOiBzdHJpbmcgPSBkYXRlRm9ybWF0KHRvRGF0ZShjdXJyZW50RGF0ZSksICdZWVlZLU1NLWRkJyk7XG4gICAgICAgIGxldCByZXRWYWw6IGFueSA9IHtcbiAgICAgICAgICBfaWQ6IHN0cmluZ0RhdGUsXG4gICAgICAgICAgeDogd2Vla051bWJlcixcbiAgICAgICAgICB5OiBkYXlUb1lbZGF5KHRvRGF0ZShjdXJyZW50RGF0ZSkpXSxcbiAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICBrZXlzOiBudWxsLFxuICAgICAgICAgIGRhdGU6IHN0cmluZ0RhdGVcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHY6IGFueSA9IGZpbmQoZGF0YSwgKHM6IGFueSkgPT4gcy5faWQgPT09IHN0cmluZ0RhdGUpO1xuICAgICAgICBpZiAodikge1xuICAgICAgICAgIHJldFZhbC5rZXlzID0gdi5rZXlzO1xuICAgICAgICAgIHJldFZhbC52YWx1ZSA9IHYudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKHJldFZhbCk7XG5cbiAgICAgICAgLy8gQmVnaW5uaW5nIG9mIG1vbnRoXG4gICAgICAgIGlmIChnZXREYXRlT2ZNb250aCh0b0RhdGUoY3VycmVudERhdGUpKSA9PT0gMSkge1xuICAgICAgICAgIHhBeGlzLnB1c2goZGF0ZUZvcm1hdCh0b0RhdGUoY3VycmVudERhdGUpLCAnTU1NJykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEVuZCBvZiBtb250aFxuICAgICAgICBpZiAoZ2V0RGF0ZU9mTW9udGgodG9EYXRlKGN1cnJlbnREYXRlKSkgPT09IGRheXNJbk1vbnRoKHRvRGF0ZShjdXJyZW50RGF0ZSkpKSB7XG4gICAgICAgICAgd2Vla051bWJlcisrOyAvLyBza2lwIG9uZSBjb2x1bW5cbiAgICAgICAgICB4QXhpcy5wdXNoKCcnKTtcbiAgICAgICAgICB3ZWVrTnVtYmVyKys7IC8vIHN0YXJ0IG9uIGEgbmV3IGNvbHVtblxuICAgICAgICAgIC8vIEVuZCBvZiB3ZWVrXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHJldFZhbC55IDw9IDApIHtcbiAgICAgICAgICAgIC8vIGVuZCBvZiB3ZWVrXG4gICAgICAgICAgICB3ZWVrTnVtYmVyKys7XG4gICAgICAgICAgICB4QXhpcy5wdXNoKCcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudERhdGUgPSBkYXRlQWRkKHRvRGF0ZShjdXJyZW50RGF0ZSksICdkYXlzJywgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGRhdGE6IG91dHB1dERhdGEsIHhBeGlzIH07XG4gIH1cblxuICBnZXRDYWxlbmRhckNvbmZpZyhjZDogQ2hhcnREZWZpbml0aW9uLCBkYXRhOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICBsZXQgY29uZmlnID0gdGhpcy5zZXRIQ0NoYXJ0VHlwZShjZCk7XG4gICAgbGV0IGNoYXJ0RGF0YSA9IHRoaXMuZ2V0Q2FsZW5kYXJEYXRhKGNkLmtwaUZvcm1WYWx1ZXMuZGF0ZXMsIGRhdGEpO1xuICAgIGNvbmZpZy5jaGFydC5tYXJnaW5Ub3AgPSAtODtcbiAgICBjb25maWcuY2hhcnQubWFyZ2luTGVmdCA9IDEwO1xuICAgIGNvbmZpZy5jaGFydC5tYXJnaW5Cb3R0b20gPSAwO1xuICAgIGNvbmZpZy5jaGFydC5zcGFjaW5nID0gWzAsIC0yLCAxMCwgMF07XG4gICAgY29uZmlnLmxlZ2VuZCA9IE9iamVjdC5hc3NpZ24oY29uZmlnLmxlZ2VuZCwge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGFsaWduOiAncmlnaHQnLFxuICAgICAgbGF5b3V0OiAndmVydGljYWwnLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICBzeW1ib2xIZWlnaHQ6IDEwMCxcbiAgICAgIGl0ZW1NYXJnaW5Ub3A6IDIwXG4gICAgfSk7XG4gICAgY29uZmlnLnlBeGlzID0gPGFueT57XG4gICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogNixcbiAgICAgIGxhYmVsczoge1xuICAgICAgICBmb250U2l6ZTogJzEzcHgnXG4gICAgICB9XG4gICAgfTtcbiAgICBjb25maWcueEF4aXMgPSA8YW55PntcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBjYXRlZ29yaWVzOiBjaGFydERhdGEueEF4aXMsXG4gICAgICBvcHBvc2l0ZTogdHJ1ZSxcbiAgICAgIGxpbmVXaWR0aDogMCxcbiAgICAgIHRpY2tXaWR0aDogMCxcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogMTcsXG4gICAgICBsYWJlbHM6IHtcbiAgICAgICAgYWxpZ246ICdjZW50ZXInLFxuICAgICAgICBhdXRvUm90YXRpb246IGZhbHNlLFxuICAgICAgICB5OiAyMCxcbiAgICAgICAgZm9udFNpemU6ICcxM3B4J1xuICAgICAgfVxuICAgIH07XG4gICAgY29uZmlnLnBsb3RPcHRpb25zLnNlcmllcyA9IE9iamVjdC5hc3NpZ24oY29uZmlnLnBsb3RPcHRpb25zLnNlcmllcywge1xuICAgICAgYm9yZGVyQ29sb3I6ICcjRkZGRkZGJyxcbiAgICAgIGJvcmRlclJhZGl1czogNixcbiAgICAgIGJvcmRlcldpZHRoOiA0LFxuICAgICAgbWF4UG9pbnRXaWR0aDogMTUsXG4gICAgICBwb2ludFdpZHRoOiAxNVxuICAgIH0pO1xuICAgIGNvbmZpZy5jb2xvckF4aXMgPSB7XG4gICAgICBtaW46IDAsXG4gICAgICBzdG9wczogW1swLCAnI2YxZjFmMSddLCBbMC4wMDEsICcjYzZlNmRmJ10sIFswLjIsICcjYTlkZWQzJ10sIFswLjQsICcjOGNkNmM4J10sIFswLjYsICcjNmZjZWJjJ10sIFswLjgsICcjNDRDM0FBJ11dXG4gICAgfTtcbiAgICBjb25maWcudG9vbHRpcC5mb3JtYXR0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkYXRlRm9ybWF0KHRvRGF0ZSgoPGFueT50aGlzLnBvaW50KS5kYXRlKSwgJ01NTSBERCwgWVlZWSBkZGRkJykgKyAnPGJyPjxicj4nICsgKDxhbnk+dGhpcy5wb2ludCkudmFsdWUgKyAnIHVzZXJzJztcbiAgICB9O1xuICAgIGNvbmZpZy5zZXJpZXMgPSA8YW55Plt7IGRhdGE6IGNoYXJ0RGF0YS5kYXRhIH1dO1xuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICBnZXRIQ0NoYXJ0Q29uZmlnKGNkOiBDaGFydERlZmluaXRpb24sIGRhdGE6IGFueSk6IEhpZ2hjaGFydHNPcHRpb25zIHtcbiAgICB0aGlzLnRleHRTdHlsZSA9IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdMYXRvJyxcbiAgICAgIGNvbG9yOiBDb2xvcnMuYmxhY2ssXG4gICAgICBmb250V2VpZ2h0OiAnMzAwJyxcbiAgICAgIGZvbnRTaXplOiAnMTNweCcsXG4gICAgICB3aGl0ZVNwYWNlOiAnbm9ybWFsJyxcbiAgICAgIHRleHRTaGFkb3c6IGZhbHNlXG4gICAgfTtcbiAgICBsZXQgY29uZmlnID0gdGhpcy5zZXRIQ0NoYXJ0VHlwZShjZCk7XG4gICAgbGV0IG9yaWdpbmFsRGF0YSA9IGRhdGE7XG4gICAgaWYgKCFpc0FycmF5KGRhdGEpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjZC5ncm91cEJ5RGF0ZSAmJiBjZC50eXBlICE9PSAncGllJykge1xuICAgICAgdGhpcy5zZXRIQ1VzZURhdGVzKGNvbmZpZyk7XG4gICAgICBpZiAoY2QuZ3JvdXBCeUNhbXBhaWduKSB7XG4gICAgICAgIC8qIGJlYXV0aWZ5IGlnbm9yZTpzdGFydCAqL1xuICAgICAgICBsZXQgc2VyaWVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTsgLy9IaWdoY2hhcnRzU2VyaWVzT3B0aW9uc1xuICAgICAgICAvKiBiZWF1dGlmeSBpZ25vcmU6ZW5kICovXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZDogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IHM6IGFueSA9IHNlcmllcy5nZXQoZC5faWQudGl0bGUpIHx8IHsgbmFtZTogZC5faWQudGl0bGUsIGRhdGE6IFtdIH07XG4gICAgICAgICAgbGV0IGRhdGUgPSBCYXNlS3BpLmZpeERhdGVzKGNkLCBkLl9pZC5kYXRlKTtcbiAgICAgICAgICBzLmRhdGEucHVzaCh7IHg6IGRhdGUsIHk6IGQudmFsdWUsIGNvbG9yOiBkLmNvbG9yLCBrZXlzOiBkLmtleXMgfSk7XG4gICAgICAgICAgc2VyaWVzLnNldChkLl9pZC50aXRsZSwgcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25maWcuc2VyaWVzID0gQXJyYXkuZnJvbShzZXJpZXMudmFsdWVzKCkpO1xuICAgICAgICBjb25maWcuc2VyaWVzLmZvckVhY2goKHM6IGFueSkgPT4gKHMuZGF0YSA9IHNvcnRCeSg8YW55PnMuZGF0YSwgKGQ6IGFueSkgPT4gZC54KSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uZmlnLnNlcmllcyA9IDxhbnk+W1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IGNkLnRpdGxlLFxuICAgICAgICAgICAgZGF0YTogc29ydEJ5KFxuICAgICAgICAgICAgICBkYXRhLm1hcCgoZDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBCYXNlS3BpLmZpeERhdGVzKGNkLCBkLl9pZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogZGF0ZSwgeTogZC52YWx1ZSwgY29sb3I6IGQuY29sb3IsIGtleXM6IGQua2V5cyB9O1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgZCA9PiBkLnhcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjZC50eXBlID09PSAndHJlZW1hcCcpIHtcbiAgICAgIGlmIChpc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIGNvbmZpZy5zZXJpZXMgPSA8YW55PltcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYXlvdXRBbGdvcml0aG06ICdzcXVhcmlmaWVkJyxcbiAgICAgICAgICAgIGRhdGE6IF9tYXAoZGF0YSwgKGQ6IGFueSkgPT4gKHsgbmFtZTogZC5faWQsIHZhbHVlOiBkLnZhbHVlLCBjb2xvclZhbHVlOiBkLnZhbHVlIH0pKVxuICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNkLnR5cGUgPT09ICdzY2F0dGVyJykge1xuICAgICAgY29uZmlnLnNlcmllcyA9IDxhbnk+W1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogY2QudGl0bGUsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9XG4gICAgICBdO1xuICAgICAgLy9hZGQgb3B0aW9uIHRvIGRpc2FibGUgcmVncmVzc2lvblxuICAgICAgaWYgKCFjZC5oaWRlUmVncmVzc2lvbikge1xuICAgICAgICB0aGlzLmFkZENvcmVsYXRpb25MaW5lKDxhbnk+ZGF0YSwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHNlcmllcyA9IG5ldyBNYXA8c3RyaW5nIHwgbnVtYmVyLCBPYmplY3Q+KCk7XG4gICAgICBsZXQgY2F0ZWdvcmllcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgaWYgKGlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPiAwICYmICgoPGFueT5kYXRhWzBdKS5zZXJpZSB8fCAoPGFueT5kYXRhWzBdKS5zZXJpZSA9PT0gMCkpIHtcbiAgICAgICAgZm9yRWFjaChkYXRhLCAoZDogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IHNlcmllID0gc2VyaWVzLmdldChkLnNlcmllKSB8fCB7fTtcbiAgICAgICAgICBzZXJpZVtkLl9pZF0gPSB7IHk6IGQudmFsdWUsIGtleXM6IGQua2V5cyB9O1xuICAgICAgICAgIGNhdGVnb3JpZXMuYWRkKGQuX2lkKTtcbiAgICAgICAgICBzZXJpZXMuc2V0KGQuc2VyaWUsIHNlcmllKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbmZpZy54QXhpcyA9IE9iamVjdC5hc3NpZ24oY29uZmlnLnhBeGlzIHx8IHt9LCB7XG4gICAgICAgICAgY2F0ZWdvcmllczogc29ydEJ5KEFycmF5LmZyb20oY2F0ZWdvcmllcy52YWx1ZXMoKSksIHggPT4geCksXG4gICAgICAgICAgY3Jvc3NoYWlyOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICBkYXRhID0gKDxBcnJheTx7IF9pZDogc3RyaW5nOyB5OiBudW1iZXI7IGtleXM/OiBBcnJheTxzdHJpbmc+IH0+PmRhdGEpLnJlZHVjZSgoYWNjLCBtZW1vOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGFjY1ttZW1vLl9pZF0gPSB7IHk6IG1lbW8udmFsdWUsIGtleXM6IG1lbW8ua2V5cyB9O1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlICg8YW55PmRhdGEpLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpZy54QXhpcyA9IE9iamVjdC5hc3NpZ24oY29uZmlnLnhBeGlzIHx8IHt9LCB7XG4gICAgICAgICAgY2F0ZWdvcmllczogX21hcChkYXRhLCBmdW5jdGlvbih2LCBsOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBsO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGNyb3NzaGFpcjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgc2VyaWVzLnNldChjZC50aXRsZSwgZGF0YSk7XG4gICAgICB9XG4gICAgICBjb25maWcuc2VyaWVzID0gW107XG4gICAgICBsZXQgd2lkdGggPSAxMDAgLyBzZXJpZXMuc2l6ZTtcbiAgICAgIHNlcmllcy5mb3JFYWNoKChzZXJpZTogYW55LCBuYW1lKSA9PiB7XG4gICAgICAgIGxldCBpbmRleCA9IGNvbmZpZy5zZXJpZXMubGVuZ3RoICsgMTtcbiAgICAgICAgLy9maWxsIGluIG1pc3NpbmcgZGF0YVxuICAgICAgICBpZiAoY29uZmlnLnhBeGlzICYmICg8YW55PmNvbmZpZy54QXhpcykuY2F0ZWdvcmllcykge1xuICAgICAgICAgICg8YW55PmNvbmZpZy54QXhpcykuY2F0ZWdvcmllcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgaWYgKCFzZXJpZVtjXSkge1xuICAgICAgICAgICAgICBzZXJpZVtjXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuc2VyaWVzLnB1c2goPGFueT57XG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBzaXplOiAod2lkdGggKiAwLjcpLnRvU3RyaW5nKCkgKyAnJScsXG4gICAgICAgICAgY2VudGVyOiBbKHdpZHRoICogaW5kZXggLSB3aWR0aCAvIDIpLnRvU3RyaW5nKCkgKyAnJScsIG51bGxdLFxuICAgICAgICAgIGRhdGE6XG4gICAgICAgICAgICBjZC50eXBlID09PSAncmFkYXInXG4gICAgICAgICAgICAgID8gX21hcCg8QXJyYXk8c3RyaW5nPj4oPGFueT5jb25maWcueEF4aXMpLmNhdGVnb3JpZXMsIGMgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcmllW2NdO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIDogc29ydEJ5KFxuICAgICAgICAgICAgICAgICAgX21hcCg8YW55PnNlcmllLCAodiwgbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKHsgbmFtZTogbCB9LCB2KTtcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vd2UgaGF2ZSB0byBtYXAgdG8gc3RyaW5nIGJlY2F1c2UgdGhlIG9iamVjdCBrZXlzIHdlIHJlIGdldHRpbmcgYmFjayBhcmUgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoPGFueT5jb25maWcueEF4aXMpLmNhdGVnb3JpZXMubWFwKHggPT4geC50b1N0cmluZygpKS5pbmRleE9mKGQubmFtZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25maWcuc2VyaWVzLmZvckVhY2goKHM6IGFueSkgPT4ge1xuICAgICAgb3JpZ2luYWxEYXRhLmZvckVhY2gobyA9PiB7XG4gICAgICAgIGlmIChzLm5hbWUgPT09IG8uc2VyaWUgfHwgcy5uYW1lID09PSBvLl9pZCkge1xuICAgICAgICAgIHMuY29sb3IgPSBvLmNvbG9yO1xuICAgICAgICAgIGlmIChvLnRleHRDb2xvcikge1xuICAgICAgICAgICAgcy5kYXRhTGFiZWxzID0gcy5kYXRhTGFiZWxzIHx8IHt9O1xuICAgICAgICAgICAgcy5kYXRhTGFiZWxzLmNvbG9yID0gby50ZXh0Q29sb3I7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMuaW5kZXggPSBzLmluZGV4IHx8IDA7XG4gICAgICAgICAgcy5pbmRleCA9IC1vLmluZGV4O1xuICAgICAgICAgIHMubGVnZW5kSW5kZXggPSBvLmluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZC5jb2xvcnMpIHtcbiAgICAgICAgICBrZXlzKGNkLmNvbG9ycykuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgIGlmIChzLm5hbWUgJiYgcy5uYW1lLnRvU3RyaW5nKCkgPT09IGsudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICBzLmNvbG9yID0gY2QuY29sb3JzW2tdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KHMuZGF0YSkpIHtcbiAgICAgICAgICAoPFthbnldPnMuZGF0YSkuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGQgJiYgKGQubmFtZSA9PT0gby5zZXJpZSB8fCAoIW8uc2VyaWUgJiYgZC5uYW1lID09PSBvLl9pZCkpICYmICFkLmNvbG9yKSB7XG4gICAgICAgICAgICAgIGQuY29sb3IgPSBvLmNvbG9yO1xuICAgICAgICAgICAgICBkLmluZGV4ID0gZC5pbmRleCB8fCAwO1xuICAgICAgICAgICAgICBkLmluZGV4ID0gLW8uaW5kZXg7XG4gICAgICAgICAgICAgIGQubGVnZW5kSW5kZXggPSBvLmluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNkLmNvbG9ycykge1xuICAgICAgICAgICAgICBrZXlzKGNkLmNvbG9ycykuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZC5uYW1lICYmIGQubmFtZS50b1N0cmluZygpID09PSBrLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgIGQuY29sb3IgPSBjZC5jb2xvcnNba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoY2Quc2hvd0N1bXVsYXRlKSB7XG4gICAgICAgIC8vbGV0IHNlcmllRGF0YSA9IGNsb25lRGVlcCgoPGFueT5zLmRhdGEpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAoPGFueT5zLmRhdGEpW2ldLnkgKz0gKDxhbnk+cy5kYXRhW2kgLSAxXSkueSB8fCAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocy5uYW1lICYmIHMubmFtZS5pbmRleE9mKCdOLTEnKSA+PSAwKSB7XG4gICAgICAgIHMuY29sb3IgPSBDb2xvcnMuc3RhYmxlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYXBwbHlBcmVhU3BsaW5lR3JhZGllbnRzKGNkLCBjb25maWcpO1xuICAgIHRoaXMuYXBwbHlTdWJ0aXRsZVN1bShjb25maWcpO1xuICAgIHRoaXMuYXBwbHlMZWdlbmRTdGF0ZShjb25maWcsIGNkKTtcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgaXNDaGFydEVtcHR5KGNvbmZpZzogSGlnaGNoYXJ0c09wdGlvbnMpIHtcbiAgICBpZiAoIWNvbmZpZy5zZXJpZXMgfHwgKGNvbmZpZy5zZXJpZXMubGVuZ3RoID09PSAxICYmICghKDxhbnk+Y29uZmlnLnNlcmllc1swXSkuZGF0YSB8fCAoPGFueT5jb25maWcuc2VyaWVzWzBdKS5kYXRhLmxlbmd0aCA9PT0gMCkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0Q2hhcnRFbXB0eUltYWdlKGNvbmZpZzogSGlnaGNoYXJ0c09wdGlvbnMpIHtcbiAgICBsZXQgZW1wdHlJbWFnZTogc3RyaW5nID0gJy4vaW1hZ2VzL2VtcHR5LXN0YXRlcy9zcGVlZG9tZXRlci5zdmcnO1xuICAgIGlmIChjb25maWcgJiYgY29uZmlnLmNoYXJ0ICYmIGNvbmZpZy5jaGFydC50eXBlKSB7XG4gICAgICBzd2l0Y2ggKGNvbmZpZy5jaGFydC50eXBlIGFzIGFueSkge1xuICAgICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgICBlbXB0eUltYWdlID0gJy4uL2twaS9saW5lcy5zdmcnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzcGxpbmUnOlxuICAgICAgICAgIGVtcHR5SW1hZ2UgPSAnLi4va3BpL3NwbGluZXMuc3ZnJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYXJlYSc6XG4gICAgICAgICAgZW1wdHlJbWFnZSA9ICcuLi9rcGkvc3BsaW5lcm95YWwuc3ZnJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYXJlYXNwbGluZSc6XG4gICAgICAgICAgZW1wdHlJbWFnZSA9ICcuLi9rcGkvc3BsaW5lcm95YWwuc3ZnJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY29sdW1uJzpcbiAgICAgICAgICBlbXB0eUltYWdlID0gJy4uL2twaS9jb2x1bW4uc3ZnJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYmFyJzpcbiAgICAgICAgICBlbXB0eUltYWdlID0gJy4uL2twaS9jb2x1bW4uc3ZnJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmFkYXInOlxuICAgICAgICBjYXNlICd0cmVlbWFwJzpcbiAgICAgICAgY2FzZSAncGllJzpcbiAgICAgICAgY2FzZSAnZG91Z2hudXQnOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGVtcHR5SW1hZ2UgPSAnLi4va3BpL3BpZS5zdmcnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW1wdHlJbWFnZTtcbiAgfVxuXG4gIGdldFVSTChzdmcsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnM/KSB7XG4gICAgbGV0IHR5cGUgPSAnaW1hZ2UvcG5nJztcbiAgICBsZXQgY29uZmlnID0ge1xuICAgICAgZmlsZW5hbWU6IG9wdGlvbnMgPyBvcHRpb25zLmZpbGVuYW1lIDogbnVsbCxcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICAgIHNjYWxlOiAyLFxuICAgICAgd2lkdGg6IHdpZHRoICogMixcbiAgICAgIGhlaWdodDogaGVpZ2h0ICogMixcbiAgICAgIHN2Zzogc3ZnXG4gICAgfTtcbiAgICBsZXQgZXhwb3J0VXJsID0gJ2h0dHBzOi8vZXhwb3J0LmhpZ2hjaGFydHMuY29tLyc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdE11bHRpUGFydChleHBvcnRVcmwsIGNvbmZpZykucGlwZShcbiAgICAgIG1lcmdlTWFwKHJlcyA9PiB7XG4gICAgICAgIGxldCB1cmwgPSBleHBvcnRVcmwgKyByZXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJxLmdldEJpbmFyeUNvbnRlbnQodXJsKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAoYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFthcnJheUJ1ZmZlcl0sIHsgdHlwZSB9KTtcbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5icm9rZXIudXBsb2FkKGJsb2IpKTtcbiAgICAgIH0pLFxuICAgICAgbWFwKHVybCA9PiB7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBmb3JtYXRTVkdzKHN2Z3M6IEFycmF5PHN0cmluZz4sIG1heEhlaWdodDogbnVtYmVyIHwgc3RyaW5nLCBwZGZSb3dXaWR0aDogbnVtYmVyID0gMTIwMCkge1xuICAgIHN2Z3MgPSBbXS5jb25jYXQoc3Zncyk7XG4gICAgbGV0IHN2ZztcbiAgICBpZiAoc3Zncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHN2ZyA9IHN2Z3NbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHN2ZyA9ICc8c3ZnIGhlaWdodD1cIicgKyBtYXhIZWlnaHQgKyAnXCIgd2lkdGg9XCInICsgcGRmUm93V2lkdGggKyAnXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4nO1xuICAgICAgc3ZnICs9IHN2Z3Muam9pbignJyk7XG4gICAgICBzdmcgKz0gJzwvc3ZnPic7XG4gICAgfVxuICAgIHJldHVybiBzdmdcbiAgICAgIC5yZXBsYWNlKC92aXNieS9naSwgJ0xhdG8nKVxuICAgICAgLnJlcGxhY2UoL3RleHQtc2hhZG93L2dpLCAndHRleHQtc2hhZG93JylcbiAgICAgIC5yZXBsYWNlKC9jbGFzcz1cImhpZ2hjaGFydHMtdGV4dC1vdXRsaW5lXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2U9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMnB4XCIvZ2ksICdjbGFzcz1cImhpZ2hjaGFydHMtdGV4dC1vdXRsaW5lXCIgZmlsbD1cIiM3RjhGQTRcIiBzdHJva2U9XCIjN0Y4RkE0XCIgc3Ryb2tlLXdpZHRoPVwiMXB4XCInKTtcbiAgfVxuXG4gIGV4cG9ydEFsbChvcHRpb25zLCBzdmdzOiBBcnJheTxzdHJpbmc+LCBtYXhIZWlnaHQsIHBkZlJvd1dpZHRoOiBudW1iZXIgPSAxMjAwKSB7XG4gICAgbGV0IHN2ZyA9IHRoaXMuZm9ybWF0U1ZHcyhzdmdzLCBtYXhIZWlnaHQpO1xuICAgIG9wdGlvbnMgPSBtZXJnZShcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgIHVybDogJ2h0dHBzOi8vZXhwb3J0LmhpZ2hjaGFydHMuY29tLycsXG4gICAgICAgIHByaW50TWF4V2lkdGg6IDc4MCxcbiAgICAgICAgc2NhbGU6IDIsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICBjb250ZXh0QnV0dG9uOiB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdoaWdoY2hhcnRzLWNvbnRleHRidXR0b24nLFxuICAgICAgICAgICAgbWVudUNsYXNzTmFtZTogJ2hpZ2hjaGFydHMtY29udGV4dG1lbnUnLFxuICAgICAgICAgICAgc3ltYm9sOiAnbWVudScsXG4gICAgICAgICAgICBfdGl0bGVLZXk6ICdjb250ZXh0QnV0dG9uVGl0bGUnLFxuICAgICAgICAgICAgbWVudUl0ZW1zOiBbeyB0ZXh0S2V5OiAncHJpbnRDaGFydCcgfSwgeyBzZXBhcmF0b3I6IHRydWUgfSwgeyB0ZXh0S2V5OiAnZG93bmxvYWRQTkcnIH0sIHsgdGV4dEtleTogJ2Rvd25sb2FkSlBFRycgfSwgeyB0ZXh0S2V5OiAnZG93bmxvYWRTVkcnIH0sIHsgdGV4dEtleTogJ2Rvd25sb2FkUERGJyB9XVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbGliVVJMOiAnaHR0cHM6Ly9jb2RlLmhpZ2hjaGFydHMuY29tLzUuMC4xMC9saWIvJ1xuICAgICAgfSxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuICAgIHRoaXMucnFcbiAgICAgIC5wb3N0UmF3KFxuICAgICAgICAnaHR0cHM6Ly9leHBvcnQuaGlnaGNoYXJ0cy5jb20nLFxuICAgICAgICB7XG4gICAgICAgICAgZmlsZW5hbWU6IG9wdGlvbnMuZmlsZW5hbWUgfHwgJ2NoYXJ0JyxcbiAgICAgICAgICB0eXBlOiBvcHRpb25zLnR5cGUsXG4gICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgd2lkdGg6IHBkZlJvd1dpZHRoLFxuICAgICAgICAgIC8vaGVpZ2h0OiB0aGlzLlBERl9ST1dfSEVJR0hULFxuICAgICAgICAgIHN2Zzogc3ZnXG4gICAgICAgIH0sXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuYm9keSkge1xuICAgICAgICAgIHRoaXMucnEuc2F2ZUFycmF5QnVmZmVyKHJlcy5ib2R5LCAob3B0aW9ucy5maWxlbmFtZSB8fCAnY2hhcnQnKSArICcucGRmJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2hhcnRJT1VybChkYXNoYm9hcmRJZDogc3RyaW5nLCBlbnY/OiBhbnkpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAnZGFzaGJvYXJkcy9nZXRUb2tlbic7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgZGFzaGJvYXJkSWQsIGVudjogZW52IHx8IHt9IH0pLnBpcGUoXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldFRhYmxlYXVVcmwoZGFzaGJvYXJkSWQ6IHN0cmluZywgZW52PzogYW55KSB7XG4gICAgbGV0IHVybCA9IHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ3RhYmxlYXUvZ2V0Vmlld1VybCc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgcGF0aDogZGFzaGJvYXJkSWQgfSkucGlwZShcbiAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5QXJlYVNwbGluZUdyYWRpZW50cyhjZDogQ2hhcnREZWZpbml0aW9uLCBjb25maWc6IEhpZ2hjaGFydHNPcHRpb25zKSB7XG4gICAgaWYgKGNvbmZpZy5jaGFydCAmJiBjb25maWcuY2hhcnQudHlwZSA9PT0gJ2FyZWFzcGxpbmUnKSB7XG4gICAgICBjb25zdCBwYWxldHRlID0gdGhpcy5nZXRQYWxldHRlKGNkKTtcbiAgICAgIGNvbnN0IGFscGhhID0gMC4xNTtcbiAgICAgIGNvbmZpZy5zZXJpZXMuZm9yRWFjaCgoczogYW55LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IFtyLCBnLCBiXSA9IHBhbGV0dGVbaV0ubWF0Y2goL1xcd1xcdy9nKS5tYXAoeCA9PiBwYXJzZUludCh4LCAxNikpO1xuICAgICAgICBzLmZpbGxDb2xvciA9IGByZ2JhKCR7cn0sJHtnfSwke2J9LCR7YWxwaGF9KWA7XG4gICAgICAgIHMuZGF0YUxhYmVscyA9IHMuZGF0YUxhYmVscyB8fCB7fTtcbiAgICAgICAgcy5kYXRhTGFiZWxzLmNvbG9yID0gQ29sb3JzLmJsYWNrO1xuICAgICAgICAvLyAgICAgY29sb3I6ICcjMDRDQzk5J1xuICAgICAgICAvLyAgICAgbGluZWFyR3JhZGllbnQ6IHsgeDE6IDAsIHkxOiAwLCB4MjogMCwgeTI6IDEgfSxcbiAgICAgICAgLy8gICAgIHN0b3BzOiBbWzAsIHMuY29sb3IgfHwgcGFsZXR0ZVtpICUgKHBhbGV0dGUubGVuZ3RoIC0gMSldXSwgWzEsICdyZ2JhKDI1NSwyNTUsMjU1LDApJ11dXG4gICAgICAgIC8vIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwbHlTdWJ0aXRsZVN1bShjb25maWc6IEhpZ2hjaGFydHNPcHRpb25zKSB7XG4gICAgaWYgKGNvbmZpZy5jaGFydCAmJiBjb25maWcuY2hhcnQudHlwZSA9PT0gJ2FyZWFzcGxpbmUnICYmIGNvbmZpZy5zZXJpZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBsZXQgc3VidGl0bGVTdW0gPSBzdW1CeSgoPGFueT5jb25maWcuc2VyaWVzWzBdKS5kYXRhLCBkID0+IGRbMV0pO1xuICAgICAgaWYgKHN1YnRpdGxlU3VtKSB7XG4gICAgICAgIGNvbmZpZy5zdWJ0aXRsZSA9IHtcbiAgICAgICAgICB0ZXh0OiBzdWJ0aXRsZVN1bS50b0xvY2FsZVN0cmluZygpLFxuICAgICAgICAgIHN0eWxlOiBkZWZhdWx0c0RlZXAoeyBmb250U2l6ZTogJzE4cHgnLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBDb2xvcnMuYmxhY2sgfSwgdGhpcy50ZXh0U3R5bGUpLFxuICAgICAgICAgIGFsaWduOiAncmlnaHQnXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5TGVnZW5kU3RhdGUoY29uZmlnOiBIaWdoY2hhcnRzT3B0aW9ucywgY2Q6IENoYXJ0RGVmaW5pdGlvbikge1xuICAgIGlmIChjZC5jaGFydExlZ2VuZFN0YXRlKSB7XG4gICAgICBmb3JFYWNoKGNvbmZpZy5zZXJpZXMsIChzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHMgJiYgcy5uYW1lID09PSBmYWxzZSkge1xuICAgICAgICAgIHMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KHMuZGF0YSkpIHtcbiAgICAgICAgICAoPFthbnldPnMuZGF0YSkuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGQgJiYgY2QuY2hhcnRMZWdlbmRTdGF0ZVtkLm5hbWVdID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBkLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFkZENvcmVsYXRpb25MaW5lKGRhdGE6IEFycmF5PHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfT4sIGNvbmZpZzogSGlnaGNoYXJ0c09wdGlvbnMpIHtcbiAgICBsZXQgbiA9IGRhdGEubGVuZ3RoO1xuICAgIGxldCBzeCA9IHN1bShkYXRhLm1hcChkID0+IGQueCkpO1xuICAgIGxldCBzeSA9IHN1bShkYXRhLm1hcChkID0+IGQueSkpO1xuICAgIGxldCBzeHkgPSBzdW0oZGF0YS5tYXAoZCA9PiBkLnggKiBkLnkpKTtcbiAgICBsZXQgc3gyID0gc3VtKGRhdGEubWFwKGQgPT4gZC54ICogZC54KSk7XG4gICAgbGV0IGEgPSAobiAqIHN4eSAtIHN4ICogc3kpIC8gKG4gKiBzeDIgLSBzeCAqIHN4KTtcbiAgICBsZXQgYiA9IChzeSAtIGEgKiBzeCkgLyBuO1xuICAgIGxldCBtaW54ID0gbWluKGRhdGEubWFwKGQgPT4gZC54KSk7XG4gICAgbGV0IG1heHggPSBtYXgoZGF0YS5tYXAoZCA9PiBkLngpKTtcblxuICAgIGNvbmZpZy5zZXJpZXMucHVzaCg8YW55PntcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIG5hbWU6ICdSZWdyZXNzaW9uJyxcbiAgICAgIGNvbG9yOiBDb2xvcnMuYmxhY2ssXG4gICAgICBkYXRhOiBbW21pbngsIGEgKiBtaW54ICsgYl0sIFttYXh4LCBhICogbWF4eCArIGJdXSxcbiAgICAgIG1hcmtlcjogeyBlbmFibGVkOiBmYWxzZSB9LFxuICAgICAgZW5hYmxlTW91c2VUcmFja2luZzogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRIQ0NoYXJ0VHlwZShjZDogQ2hhcnREZWZpbml0aW9uKTogSGlnaGNoYXJ0c09wdGlvbnMge1xuICAgIGxldCBjb25maWc6IEhpZ2hjaGFydHNPcHRpb25zID0gdGhpcy5nZXRIQ0RlZmF1bHRDb25maWcoY2QpO1xuICAgIHN3aXRjaCAoY2QudHlwZSkge1xuICAgICAgY2FzZSAnbGluZSc6XG4gICAgICAgIGNvbmZpZyA9IG1lcmdlKGNvbmZpZywgdGhpcy5nZXRIQ0RlZmF1bHRMaW5lKGNkKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3BsaW5lJzpcbiAgICAgICAgY29uZmlnID0gbWVyZ2UoY29uZmlnLCB0aGlzLmdldEhDRGVmYXVsdFNwbGluZShjZCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2FyZWEnOlxuICAgICAgICBjb25maWcgPSBtZXJnZShjb25maWcsIHRoaXMuZ2V0SENEZWZhdWx0QXJlYShjZCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2FyZWFzcGxpbmUnOlxuICAgICAgICBjb25maWcgPSBtZXJnZShjb25maWcsIHRoaXMuZ2V0SENEZWZhdWx0QXJlYVNwbGluZShjZCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Jhcic6XG4gICAgICAgIGNvbmZpZyA9IG1lcmdlKGNvbmZpZywgdGhpcy5nZXRIQ0RlZmF1bHRCYXIoY2QpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjb2x1bW4nOlxuICAgICAgICBjb25maWcgPSBtZXJnZShjb25maWcsIHRoaXMuZ2V0SENEZWZhdWx0Q29sdW1uKGNkKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaGVhdG1hcCc6XG4gICAgICAgIGNvbmZpZyA9IG1lcmdlKGNvbmZpZywgdGhpcy5nZXRIQ0RlZmF1bHRIZWF0bWFwKGNkKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZG91Z2hudXQnOlxuICAgICAgICBjb25maWcgPSBtZXJnZShjb25maWcsIHRoaXMuZ2V0SENEZWZhdWx0RG91Z2hudXQoY2QpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwaWUnOlxuICAgICAgICBjb25maWcgPSBtZXJnZShjb25maWcsIHRoaXMuZ2V0SENEZWZhdWx0UGllKGNkKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmFkYXInOlxuICAgICAgICBjb25maWcgPSBtZXJnZShjb25maWcsIHRoaXMuZ2V0SENEZWZhdWx0UmFkYXIoY2QpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0cmVlbWFwJzpcbiAgICAgICAgY29uZmlnID0gbWVyZ2UoY29uZmlnLCB0aGlzLmdldEhDRGVmYXVsdFRyZWVtYXAoY2QpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzY2F0dGVyJzpcbiAgICAgICAgY29uZmlnID0gbWVyZ2UoY29uZmlnLCB0aGlzLmdldEhDRGVmYXVsdFNjYXR0ZXIoY2QpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbmZpZy5sZWdlbmQuZW5hYmxlZCA9IGNkLnNob3dMZWdlbmQgPT09IHRydWU7XG4gICAgaWYgKGNkLm1hcmdpbkJvdHRvbSkge1xuICAgICAgY29uZmlnLmNoYXJ0Lm1hcmdpbkJvdHRvbSA9IGNkLm1hcmdpbkJvdHRvbTtcbiAgICB9XG4gICAgaWYgKGNkLmxlZ2VuZFZlcnRpY2FsQWxpZ24pIHtcbiAgICAgIGNvbmZpZy5sZWdlbmQudmVydGljYWxBbGlnbiA9IGNkLmxlZ2VuZFZlcnRpY2FsQWxpZ247XG4gICAgfVxuICAgIGlmIChjZC5sZWdlbmRBbGlnbikge1xuICAgICAgY29uZmlnLmxlZ2VuZC5hbGlnbiA9IGNkLmxlZ2VuZEFsaWduO1xuICAgIH1cbiAgICBpZiAoY2QubGVnZW5kV2lkdGgpIHtcbiAgICAgIGNvbmZpZy5sZWdlbmQud2lkdGggPSBjZC5sZWdlbmRXaWR0aDtcbiAgICAgIGNvbmZpZy5sZWdlbmQuaXRlbU1hcmdpbkJvdHRvbSA9IDU7XG4gICAgfVxuICAgIC8vIGlmIChjZC5oaWRlQXhpcykge1xuICAgIC8vICAgICBjb25maWcuY2hhcnQubWFyZ2luVG9wID0gLTU7XG4gICAgLy8gICAgIGNvbmZpZy5jaGFydC5tYXJnaW5MZWZ0ID0gLTU7XG4gICAgLy8gICAgIGNvbmZpZy5jaGFydC5tYXJnaW5SaWdodCA9IC01O1xuICAgIC8vICAgICBjb25maWcuY2hhcnQubWFyZ2luQm90dG9tID0gLTU7XG4gICAgLy8gfVxuXG4gICAgZGVsZXRlIGNvbmZpZy5jaGFydC5tYXJnaW47XG4gICAgZGVsZXRlIGNvbmZpZy5jaGFydC5tYXJnaW5Ub3A7XG4gICAgZGVsZXRlIGNvbmZpZy5jaGFydC5tYXJnaW5MZWZ0O1xuICAgIGRlbGV0ZSBjb25maWcuY2hhcnQubWFyZ2luUmlnaHQ7XG4gICAgZGVsZXRlIGNvbmZpZy5jaGFydC5tYXJnaW5Cb3R0b207XG5cbiAgICBpZiAoY2Quc2hvd0xhYmVsc1kgPT09IGZhbHNlICYmIGNvbmZpZy55QXhpcyAmJiAoPGFueT5jb25maWcueUF4aXMpLmxhYmVscykge1xuICAgICAgKDxhbnk+Y29uZmlnLnlBeGlzKS5sYWJlbHMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICAvL2NvbmZpZy50aXRsZS50ZXh0ID0gY2QudGl0bGU7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRIQ1VzZURhdGVzKGNvbmZpZzogSGlnaGNoYXJ0c09wdGlvbnMpIHtcbiAgICBjb25maWcueEF4aXMgPSBjb25maWcueEF4aXMgfHwge307XG4gICAgY29uZmlnLmNoYXJ0Lnpvb21UeXBlID0gJ3gnO1xuICAgIGNvbmZpZy5jaGFydC5wYW5uaW5nID0gdHJ1ZTtcbiAgICBjb25maWcuY2hhcnQucGFuS2V5ID0gJ3NoaWZ0JztcbiAgICAvL2RlbGV0ZSBjb25maWcudG9vbHRpcC5mb3JtYXR0ZXI7XG4gICAgKDxhbnk+Y29uZmlnLnhBeGlzKS50eXBlID0gJ2RhdGV0aW1lJztcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYWxldHRlKGNkOiBDaGFydERlZmluaXRpb24pIHtcbiAgICBpZiAoIWNkIHx8ICFjZC5wYWxldHRlIHx8ICF0aGlzW2NkLnBhbGV0dGVdKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYWxldHRlMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbY2QucGFsZXR0ZV07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0TnVtYmVyRm9ybWF0KGNkOiBDaGFydERlZmluaXRpb24pIHtcbiAgICBpZiAoY2QubnVtYmVyUHJlY2lzaW9uICYmIGNkLm51bWJlclByZWNpc2lvbiA+PSAxKSB7XG4gICAgICByZXR1cm4gJzEuMC0nICsgKE1hdGguZmxvb3IoY2QubnVtYmVyUHJlY2lzaW9uKSB8fCAwKTtcbiAgICB9XG4gICAgcmV0dXJuICcxLjAtMCc7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGF0ZVRpbWVJbnRlcnZhbEJ5R3JvdXBpbmdEYXRlKGdyb3VwaW5nRGF0ZTogc3RyaW5nLCBncm91cEJ5U2xpZGVyOiBzdHJpbmcgPSAnJykge1xuICAgIGNvbnN0IEJBU0VfSE9VUl9NSUxMSVNFQ09ORCA9IDM2MDAgKiAxMDAwOyAvLyAzIDYwMCAwMDBcbiAgICBjb25zdCBCQVNFX0RBWV9NSUxMSVNFQ09ORCA9IDI0ICogQkFTRV9IT1VSX01JTExJU0VDT05EOyAvLyA4NiA0MDAgMDAwXG4gICAgY29uc3QgQkFTRV9XRUVLX01JTExJU0VDT05EID0gNyAqIEJBU0VfREFZX01JTExJU0VDT05EOyAvLyA2MDQgODAwIDAwMFxuICAgIGNvbnN0IEJBU0VfTU9OVEhfTUlMSVNFQ09ORCA9IDMwICogQkFTRV9EQVlfTUlMTElTRUNPTkQ7IC8vIDI1OSAyMDAgMDAwXG4gICAgY29uc3QgQkFTRV9HUk9VUElOR19EQVRFX01JTElTRUNPTkQgPSB7XG4gICAgICBob3VyOiBCQVNFX0hPVVJfTUlMTElTRUNPTkQsXG4gICAgICBkYXk6IEJBU0VfREFZX01JTExJU0VDT05ELFxuICAgICAgd2VlazogQkFTRV9XRUVLX01JTExJU0VDT05ELFxuICAgICAgbW9udGg6IEJBU0VfTU9OVEhfTUlMSVNFQ09ORFxuICAgIH07XG4gICAgaWYgKGdyb3VwQnlTbGlkZXIgJiYgZ3JvdXBCeVNsaWRlciA9PT0gJzNtb250aHMnKSB7XG4gICAgICByZXR1cm4gQkFTRV9HUk9VUElOR19EQVRFX01JTElTRUNPTkRbJ21vbnRoJ107XG4gICAgfVxuICAgIHJldHVybiBCQVNFX0dST1VQSU5HX0RBVEVfTUlMSVNFQ09ORFtncm91cGluZ0RhdGVdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldERhdGVUaW1lRm9ybWF0KGdyb3VwaW5nRGF0ZTogc3RyaW5nLCBncm91cEJ5U2xpZGVyOiBzdHJpbmcgPSAnJykge1xuICAgIGNvbnN0IEJBU0VfR1JPVVBJTkdfREFURV9IQ0ZPUk1BVCA9IHtcbiAgICAgIGhvdXI6ICclSDolTScsXG4gICAgICBkYXk6ICclZS4gJWInLFxuICAgICAgd2VlazogJyVlLiAlYicsXG4gICAgICBtb250aDogJyViJ1xuICAgIH07XG4gICAgaWYgKGdyb3VwQnlTbGlkZXIgJiYgZ3JvdXBCeVNsaWRlciA9PT0gJzNtb250aHMnKSB7XG4gICAgICByZXR1cm4gJ3t2YWx1ZTonICsgQkFTRV9HUk9VUElOR19EQVRFX0hDRk9STUFUWydtb250aCddICsgJ30nO1xuICAgIH1cbiAgICByZXR1cm4gJ3t2YWx1ZTonICsgQkFTRV9HUk9VUElOR19EQVRFX0hDRk9STUFUW2dyb3VwaW5nRGF0ZV0gKyAnfSc7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SENEZWZhdWx0Q29uZmlnKGNkOiBDaGFydERlZmluaXRpb24pOiBIaWdoY2hhcnRzT3B0aW9ucyB7XG4gICAgbGV0IGNoYXJ0U2VydmljZSA9IHRoaXM7XG4gICAgbGV0IGdyb3VwQnlTbGlkZXIgPSBjZC5rcGlGb3JtVmFsdWVzICYmIGNkLmtwaUZvcm1WYWx1ZXMuZ3JvdXBCeVNsaWRlcjtcbiAgICBsZXQgaXNTYWxlc0RhdGFzS3BpID0gY2Qua3BpVHlwZSAmJiBjZC5rcGlUeXBlID09PSAnU2FsZXNEYXRhc0twaSc7XG4gICAgcmV0dXJuIDxhbnk+e1xuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdGV4dDogY2QudGl0bGUsXG4gICAgICAgIHN0eWxlOiBkZWZhdWx0c0RlZXAoeyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiBDb2xvcnMuYmxhY2sgfSwgdGhpcy50ZXh0U3R5bGUpLFxuICAgICAgICBhbGlnbjogJ3JpZ2h0J1xuICAgICAgfSxcbiAgICAgIGNoYXJ0OiB7XG4gICAgICAgIHN0eWxlOiB7IGZvbnRGYW1pbHk6ICdMYXRvJyB9LFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsXG4gICAgICAgIHJlc2V0Wm9vbUJ1dHRvbjoge1xuICAgICAgICAgIHRoZW1lOiB7XG4gICAgICAgICAgICBmaWxsOiAnd2hpdGUnLFxuICAgICAgICAgICAgc3Ryb2tlOiBDb2xvcnMuYmxhY2ssXG4gICAgICAgICAgICBzdHlsZTogdGhpcy50ZXh0U3R5bGVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB4QXhpczpcbiAgICAgICAgY2QudHlwZSA9PT0gJ3JhZGFyJ1xuICAgICAgICAgID8geyBsYWJlbHM6IHsgc3R5bGU6IGRlZmF1bHRzRGVlcCh7IGNvbG9yOiBDb2xvcnMuYmxhY2sgfSwgdGhpcy50ZXh0U3R5bGUpIH0gfVxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICB2aXNpYmxlOiAhY2QuaGlkZUF4aXMsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogY2QuaGlkZUF4aXMgPyAwIDogMSxcbiAgICAgICAgICAgICAgbGluZUNvbG9yOiB0aGlzLmxpbmVDb2xvcixcbiAgICAgICAgICAgICAgZ3JpZExpbmVXaWR0aDogMCwgLy9wYWRkaW5nOiAwLFxuICAgICAgICAgICAgICBncmlkTGluZUNvbG9yOiB0aGlzLmdyaWRMaW5lQ29sb3IsXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIGF1dG9Sb3RhdGlvbjogWy05MF0sXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMTAsXG4gICAgICAgICAgICAgICAgc3R5bGU6IGRlZmF1bHRzRGVlcCh7IGNvbG9yOiBDb2xvcnMuYmxhY2sgfSwgdGhpcy50ZXh0U3R5bGUpLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogaXNTYWxlc0RhdGFzS3BpID8gdGhpcy5nZXREYXRlVGltZUZvcm1hdChjZC5kYXRlR3JvdXBpbmcsIGdyb3VwQnlTbGlkZXIpIDogbnVsbFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBtYXg6IGNkLm1heFgsXG4gICAgICAgICAgICAgIHRpY2tJbnRlcnZhbDogaXNTYWxlc0RhdGFzS3BpID8gdGhpcy5nZXREYXRlVGltZUludGVydmFsQnlHcm91cGluZ0RhdGUoY2QuZGF0ZUdyb3VwaW5nLCBncm91cEJ5U2xpZGVyKSA6IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICB5QXhpczpcbiAgICAgICAgY2QudHlwZSA9PT0gJ3JhZGFyJ1xuICAgICAgICAgID8geyBsYWJlbHM6IHsgc3R5bGU6IGRlZmF1bHRzRGVlcCh7IGNvbG9yOiBDb2xvcnMuYmxhY2sgfSwgdGhpcy50ZXh0U3R5bGUpIH0gfVxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICB2aXNpYmxlOiAhY2QuaGlkZUF4aXMsXG4gICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiBjZC5oaWRlQXhpcyA/IDAgOiAxLFxuICAgICAgICAgICAgICBsaW5lQ29sb3I6IHRoaXMubGluZUNvbG9yLFxuICAgICAgICAgICAgICBncmlkTGluZVdpZHRoOiBjZC5oaWRlQXhpcyA/IDAgOiAxLFxuICAgICAgICAgICAgICBncmlkTGluZUNvbG9yOiB0aGlzLmdyaWRMaW5lQ29sb3IsIC8vcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7IHN0eWxlOiBkZWZhdWx0c0RlZXAoeyBjb2xvcjogQ29sb3JzLmJsYWNrIH0sIHRoaXMudGV4dFN0eWxlKSB9LFxuICAgICAgICAgICAgICBlbmRPblRpY2s6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXhQYWRkaW5nOiAwLjIsXG4gICAgICAgICAgICAgIG1heDogY2QubWF4WVxuICAgICAgICAgICAgfSxcbiAgICAgIGNvbG9yczogdGhpcy5nZXRQYWxldHRlKGNkKSxcbiAgICAgIGxlZ2VuZDoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgaXRlbVN0eWxlOiBkZWZhdWx0c0RlZXAoeyBmb250U2l6ZTogJzE0cHgnLCBsaW5lSGVpZ2h0OiAnMTRweCcsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6IENvbG9ycy5ibGFjayB9LCB0aGlzLnRleHRTdHlsZSksXG4gICAgICAgIC8vYWNrZ3JvdW5kQ29sb3I6ICcjRjFGMUYxJyxcbiAgICAgICAgbGFiZWxGb3JtYXR0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxldCByZXRWYWwgPSAnJztcblxuICAgICAgICAgIGlmICh0aGlzLnlEYXRhICYmIHRoaXMueURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGlmIChjZC5zaG93Q3VtdWxhdGUpIHtcbiAgICAgICAgICAgICAgdG90YWwgPSA8YW55Pm1heCh0aGlzLnlEYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNkLmxlZ2VuZFZhbHVlIHx8IGNkLmxlZ2VuZFZhbHVlID09PSAnc3VtJykge1xuICAgICAgICAgICAgICB0b3RhbCA9IHN1bSh0aGlzLnlEYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2QubGVnZW5kVmFsdWUgPT09ICdhdmcnKSB7XG4gICAgICAgICAgICAgIHRvdGFsID0gc3VtKHRoaXMueURhdGEpIC8gdGhpcy55RGF0YS5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNkLmxlZ2VuZFZhbHVlID09PSAnbWluJykge1xuICAgICAgICAgICAgICB0b3RhbCA9IDxhbnk+bWluKHRoaXMueURhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjZC5sZWdlbmRWYWx1ZSA9PT0gJ21heCcpIHtcbiAgICAgICAgICAgICAgdG90YWwgPSA8YW55Pm1heCh0aGlzLnlEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldFZhbCA9IHRoaXMubmFtZSArICc6ICcgKyBjaGFydFNlcnZpY2UuZGVjaW1hbFBpcGUudHJhbnNmb3JtKHRvdGFsLCBjaGFydFNlcnZpY2UuZ2V0TnVtYmVyRm9ybWF0KGNkKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnkpIHtcbiAgICAgICAgICAgIHJldFZhbCA9IHRoaXMubmFtZSArICc6ICcgKyBjaGFydFNlcnZpY2UuZGVjaW1hbFBpcGUudHJhbnNmb3JtKHRoaXMueSwgY2hhcnRTZXJ2aWNlLmdldE51bWJlckZvcm1hdChjZCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRWYWwgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjZC51bml0KSB7XG4gICAgICAgICAgICByZXRWYWwgKz0gJyAnICsgY2QudW5pdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBsb3RPcHRpb25zOiB7XG4gICAgICAgIHNlcmllczogPGFueT57XG4gICAgICAgICAgdHVyYm9UaHJlc2hvbGQ6IDAsXG4gICAgICAgICAgZ3JvdXBQYWRkaW5nOiAwLFxuICAgICAgICAgIHBvaW50UGFkZGluZzogY2QucG9pbnRQYWRkaW5nIHx8IChjZC5jb2xvckJ5UG9pbnQgPyAwIDogMC4xKSxcbiAgICAgICAgICBzdGFja2luZzogY2Quc3RhY2tlZCxcbiAgICAgICAgICBhbGxvd1BvaW50U2VsZWN0OiBjZC5hbGxvd1BvaW50U2VsZWN0IHx8IGZhbHNlLFxuICAgICAgICAgIG1hcmtlcjoge1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXRlczogeyBzZWxlY3Q6IHsgZmlsbENvbG9yOiBDb2xvcnMuc3VjY2VzcyB9IH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0YXRlczogeyBzZWxlY3Q6IHsgY29sb3I6IENvbG9ycy5zdWNjZXNzIH0gfSxcbiAgICAgICAgICBhbmltYXRpb246ICF0aGlzLmNvcmVDb25maWcuaXNXZWIoKSxcbiAgICAgICAgICBkYXRhTGFiZWxzOiB7XG4gICAgICAgICAgICBjb2xvcjogQ29sb3JzLmJsYWNrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY3JlZGl0czogeyBlbmFibGVkOiBmYWxzZSB9LFxuICAgICAgZXhwb3J0aW5nOiB7IGVuYWJsZWQ6IGZhbHNlIH0sXG4gICAgICB0b29sdGlwOiB7XG4gICAgICAgIGZvbGxvd1RvdWNoTW92ZTogZmFsc2UsXG4gICAgICAgIHN0eWxlOiBkZWZhdWx0c0RlZXAoe30sIHRoaXMudGV4dFN0eWxlKSxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBDb2xvcnMuc3RhYmxlLFxuICAgICAgICBib3JkZXJSYWRpdXM6IDAsXG4gICAgICAgIHNoYWRvdzogZmFsc2UsXG4gICAgICAgIGJvcmRlckNvbG9yOiB0aGlzLmxpbmVDb2xvcixcbiAgICAgICAgdXNlSFRNTDogZmFsc2UsXG4gICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbGV0IG5hbWUgPSAodGhpcy5zZXJpZXMgPyB0aGlzLnNlcmllcy5uYW1lIDogJycpIHx8ICcnO1xuICAgICAgICAgIGlmIChuYW1lICYmIG5hbWUgIT09ICcgJykge1xuICAgICAgICAgICAgbmFtZSArPSAnPGJyLz4nO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgdCA9IG5hbWUgKyAodGhpcy54ID8gKGNkLmdyb3VwQnlEYXRlID8gZGF0ZUZvcm1hdCh0b0RhdGUodGhpcy54KSwgJ0wnKSA6IHRoaXMueCkgKyAnOiAnIDogdGhpcy5rZXkgKyAnOiAnIHx8ICcnKSArIGNoYXJ0U2VydmljZS5kZWNpbWFsUGlwZS50cmFuc2Zvcm0odGhpcy55LCBjaGFydFNlcnZpY2UuZ2V0TnVtYmVyRm9ybWF0KGNkKSk7XG4gICAgICAgICAgaWYgKGNkLnN0YWNrZWQgPT09ICdwZXJjZW50Jykge1xuICAgICAgICAgICAgdCArPSAnPGJyLz4nICsgTWF0aC5yb3VuZCh0aGlzLnBlcmNlbnRhZ2UpICsgJyAlJztcbiAgICAgICAgICB9IGVsc2UgaWYgKGNkLnVuaXQpIHtcbiAgICAgICAgICAgIHQgKz0gJyAnICsgY2QudW5pdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNkLnR5cGUgPT09ICdzY2F0dGVyJykge1xuICAgICAgICAgICAgdCArPSAnPGJyLz4nICsgdGhpcy5wb2ludC5uYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGF0YUxhYmVsRm9ybWF0dGVyKGNkOiBDaGFydERlZmluaXRpb24pIHtcbiAgICBsZXQgY2hhcnRTZXJ2aWNlID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoKGNkLnN0YWNrZWQgPT09ICdwZXJjZW50JyAmJiB0aGlzLnBlcmNlbnRhZ2UgPiAwKSB8fCAoY2Quc3RhY2tlZCAhPT0gJ3BlcmNlbnQnICYmIE1hdGguYWJzKHRoaXMueSkgPj0gMCkpIHtcbiAgICAgICAgbGV0IHQgPSBjZC5zdGFja2VkID09PSAncGVyY2VudCcgPyBNYXRoLnJvdW5kKHRoaXMucGVyY2VudGFnZSkgKyAnICUnIDogY2hhcnRTZXJ2aWNlLmRlY2ltYWxQaXBlLnRyYW5zZm9ybSh0aGlzLnksIGNoYXJ0U2VydmljZS5nZXROdW1iZXJGb3JtYXQoY2QpKTtcbiAgICAgICAgaWYgKGNkLnVuaXQgJiYgdCkge1xuICAgICAgICAgIHQgKz0gJyAnICsgY2QudW5pdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXQpIHtcbiAgICAgICAgICB0ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNkLnNob3dEZWx0YSAmJiB0aGlzLnNlcmllcyAmJiBpc0FycmF5KHRoaXMuc2VyaWVzLmRhdGEpKSB7XG4gICAgICAgICAgbGV0IGluZGV4ID0gZmluZEluZGV4KHRoaXMuc2VyaWVzLmRhdGEsIChwb2ludDogYW55KSA9PiBwb2ludC54ID09PSB0aGlzLngpO1xuICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgTWF0aC5hYnModGhpcy5zZXJpZXMuZGF0YVtpbmRleCAtIDFdLnkpID4gMCkge1xuICAgICAgICAgICAgbGV0IGRlbHRhID0gTWF0aC5yb3VuZCgoMTAwICogKHRoaXMuc2VyaWVzLmRhdGFbaW5kZXhdLnkgLSB0aGlzLnNlcmllcy5kYXRhW2luZGV4IC0gMV0ueSkpIC8gdGhpcy5zZXJpZXMuZGF0YVtpbmRleCAtIDFdLnkpO1xuICAgICAgICAgICAgdCArPSAnPGJyLz48Zz4oJyArIGRlbHRhICsgJyUpPC9nPic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgdXNlQ29udHJhc3QoY2Q6IENoYXJ0RGVmaW5pdGlvbikge1xuICAgIHJldHVybiB0cnVlOyAvL0NvbG9ycy5pc0RhcmtUaGVtZSgpID8gZmFsc2UgOiBjZCAmJiBjZC50eXBlICE9PSAnc3BsaW5lJyAmJiBjZC50eXBlICE9PSAnYXJlYXNwbGluZScgJiYgY2QudHlwZSAhPT0gJ2xpbmUnICYmIGNkLnR5cGUgIT09ICdhcmVhJztcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXREYXRhTGFiZWxzKGNkOiBDaGFydERlZmluaXRpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgZW5hYmxlZDogY2Quc2hvd1ZhbHVlcyAhPT0gZmFsc2UsXG4gICAgICB1c2VIVE1MOiBmYWxzZSxcbiAgICAgIHN0eWxlOiBkZWZhdWx0c0RlZXAoeyBjb2xvcjogQ29sb3JzLmJsYWNrLCB0ZXh0T3V0bGluZTogJ25vbmUnIH0sIHRoaXMudGV4dFN0eWxlKSxcbiAgICAgIGZvcm1hdHRlcjogdGhpcy5nZXREYXRhTGFiZWxGb3JtYXR0ZXIoY2QpXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRIQ0RlZmF1bHRMaW5lKGNkOiBDaGFydERlZmluaXRpb24pOiBIaWdoY2hhcnRzT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNoYXJ0OiB7IHR5cGU6ICdsaW5lJywgbWFyZ2luVG9wOiAxMCB9LFxuICAgICAgcGxvdE9wdGlvbnM6IHtcbiAgICAgICAgbGluZToge1xuICAgICAgICAgIC8vY29ubmVjdE51bGxzOiBmYWxzZSxcbiAgICAgICAgICBkYXRhTGFiZWxzOiB0aGlzLmdldERhdGFMYWJlbHMoY2QpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEhDRGVmYXVsdFNwbGluZShjZDogQ2hhcnREZWZpbml0aW9uKTogSGlnaGNoYXJ0c09wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBjaGFydDogeyB0eXBlOiAnc3BsaW5lJywgbWFyZ2luVG9wOiAxMCB9LFxuICAgICAgcGxvdE9wdGlvbnM6IHtcbiAgICAgICAgc3BsaW5lOiB7XG4gICAgICAgICAgLy9jb25uZWN0TnVsbHM6IGZhbHNlLFxuICAgICAgICAgIGRhdGFMYWJlbHM6IHRoaXMuZ2V0RGF0YUxhYmVscyhjZClcbiAgICAgICAgfSxcbiAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgbWFya2VyOiA8YW55PntcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogMC41LFxuICAgICAgICAgICAgZmlsbENvbG9yOiBDb2xvcnMubGlnaHQsXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICBsaW5lQ29sb3I6IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEhDRGVmYXVsdEFyZWEoY2Q6IENoYXJ0RGVmaW5pdGlvbik6IEhpZ2hjaGFydHNPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hhcnQ6IHsgdHlwZTogJ2FyZWEnLCBtYXJnaW5Ub3A6IDEwIH0sXG4gICAgICBwbG90T3B0aW9uczoge1xuICAgICAgICBhcmVhOiB7XG4gICAgICAgICAgY29ubmVjdE51bGxzOiBmYWxzZSxcbiAgICAgICAgICBkYXRhTGFiZWxzOiB0aGlzLmdldERhdGFMYWJlbHMoY2QpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEhDRGVmYXVsdEFyZWFTcGxpbmUoY2Q6IENoYXJ0RGVmaW5pdGlvbik6IEhpZ2hjaGFydHNPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hhcnQ6IHsgdHlwZTogJ2FyZWFzcGxpbmUnLCBtYXJnaW5Ub3A6IDMwIH0sXG4gICAgICBwbG90T3B0aW9uczoge1xuICAgICAgICBhcmVhc3BsaW5lOiB7XG4gICAgICAgICAgY29ubmVjdE51bGxzOiBmYWxzZSxcbiAgICAgICAgICBkYXRhTGFiZWxzOiB0aGlzLmdldERhdGFMYWJlbHMoY2QpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEhDRGVmYXVsdENvbHVtbihjZDogQ2hhcnREZWZpbml0aW9uKTogSGlnaGNoYXJ0c09wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBjaGFydDogeyB0eXBlOiAnY29sdW1uJywgbWFyZ2luVG9wOiAxMCwgbWFyZ2luQm90dG9tOiBjZC5zaG93TGVnZW5kID8gMzAgOiAzMCB9LFxuICAgICAgcGxvdE9wdGlvbnM6IHtcbiAgICAgICAgY29sdW1uOiB7XG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAwLFxuICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxuICAgICAgICAgIGNvbG9yQnlQb2ludDogY2QuY29sb3JCeVBvaW50LFxuICAgICAgICAgIHNoYWRvdzogZmFsc2UsXG4gICAgICAgICAgZGF0YUxhYmVsczogdGhpcy5nZXREYXRhTGFiZWxzKGNkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRIQ0RlZmF1bHRIZWF0bWFwKGNkOiBDaGFydERlZmluaXRpb24pOiBIaWdoY2hhcnRzT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNoYXJ0OiB7IHR5cGU6ICdoZWF0bWFwJywgbWFyZ2luVG9wOiAxMCB9XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRIQ0RlZmF1bHRCYXIoY2Q6IENoYXJ0RGVmaW5pdGlvbik6IEhpZ2hjaGFydHNPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hhcnQ6IHsgdHlwZTogJ2JhcicsIG1hcmdpblRvcDogMTAgfSxcbiAgICAgIHBsb3RPcHRpb25zOiB7XG4gICAgICAgIGJhcjoge1xuICAgICAgICAgIGJvcmRlclJhZGl1czogMCxcbiAgICAgICAgICBib3JkZXJXaWR0aDogMCxcbiAgICAgICAgICBjb2xvckJ5UG9pbnQ6IGNkLmNvbG9yQnlQb2ludCxcbiAgICAgICAgICBzaGFkb3c6IGZhbHNlLFxuICAgICAgICAgIGRhdGFMYWJlbHM6IHRoaXMuZ2V0RGF0YUxhYmVscyhjZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SENEZWZhdWx0UGllKGNkOiBDaGFydERlZmluaXRpb24pOiBIaWdoY2hhcnRzT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB7IHN0eWxlOiB7IGNvbG9yOiAndHJhbnNwYXJlbnQnIH0gfSxcbiAgICAgIGNoYXJ0OiB7IHR5cGU6ICdwaWUnLCBzcGFjaW5nQm90dG9tOiAxMCwgc3BhY2luZ1RvcDogLTIwIH0sXG4gICAgICBwbG90T3B0aW9uczoge1xuICAgICAgICBwaWU6IHtcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAvL3NpemU6ICc5MCUnLFxuICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxuICAgICAgICAgIC8vaW5uZXJTaXplOiAnMTAlJyxcbiAgICAgICAgICAvL21pblNpemU6IDMwLFxuICAgICAgICAgIGRhdGFMYWJlbHM6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IGNkLnNob3dWYWx1ZXMgIT09IGZhbHNlLFxuICAgICAgICAgICAgdXNlSFRNTDogZmFsc2UsXG4gICAgICAgICAgICBzdHlsZTogZGVmYXVsdHNEZWVwKHt9LCB0aGlzLnRleHRTdHlsZSksXG4gICAgICAgICAgICBmb3JtYXQ6ICd7cG9pbnQueTouMGZ9ICh7cG9pbnQucGVyY2VudGFnZTouMGZ9ICUpJywgLy88Yj57cG9pbnQubmFtZX08L2I+OlxuICAgICAgICAgICAgZGlzdGFuY2U6IDVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNob3dJbkxlZ2VuZDogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRIQ0RlZmF1bHREb3VnaG51dChjZDogQ2hhcnREZWZpbml0aW9uKTogSGlnaGNoYXJ0c09wdGlvbnMge1xuICAgIHJldHVybiBkZWZhdWx0c0RlZXAoXG4gICAgICB7XG4gICAgICAgIHBsb3RPcHRpb25zOiB7XG4gICAgICAgICAgcGllOiB7IHN0YXJ0QW5nbGU6IC05MCwgZW5kQW5nbGU6IDkwLCBjZW50ZXI6IFsnNTAlJywgJzc1JSddLCBpbm5lclNpemU6ICc5MCUnIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRoaXMuZ2V0SENEZWZhdWx0UGllKGNkKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SENEZWZhdWx0UmFkYXIoY2Q6IENoYXJ0RGVmaW5pdGlvbik6IEhpZ2hjaGFydHNPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hhcnQ6IHsgcG9sYXI6IHRydWUsIHR5cGU6ICdhcmVhJyB9LFxuICAgICAgcGFuZTogeyBzaXplOiAnNzAlJyB9LFxuICAgICAgeUF4aXM6IDxhbnk+eyBncmlkTGluZUludGVycG9sYXRpb246ICdwb2x5Z29uJywgbGFiZWxzOiB7IGVuYWJsZWQ6IGZhbHNlIH0sIGxpbmVXaWR0aDogMCB9LFxuICAgICAgeEF4aXM6IHsgdGlja21hcmtQbGFjZW1lbnQ6ICdvbicsIGxpbmVXaWR0aDogMCB9XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRIQ0RlZmF1bHRUcmVlbWFwKGNkOiBDaGFydERlZmluaXRpb24pOiBIaWdoY2hhcnRzT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNoYXJ0OiB7IHR5cGU6ICd0cmVlbWFwJyB9LFxuICAgICAgY29sb3JBeGlzOiB7XG4gICAgICAgIG1pbkNvbG9yOiBDb2xvcnMubGlnaHQsXG4gICAgICAgIG1heENvbG9yOiB0aGlzLmdldFBhbGV0dGUoY2QpWzBdXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRIQ0RlZmF1bHRTY2F0dGVyKGNkOiBDaGFydERlZmluaXRpb24pOiBIaWdoY2hhcnRzT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNoYXJ0OiB7IHR5cGU6ICdzY2F0dGVyJywgem9vbVR5cGU6ICd4eScgfSxcbiAgICAgIHhBeGlzOiB7IGdyaWRMaW5lV2lkdGg6IDEgfSxcbiAgICAgIHBsb3RPcHRpb25zOiB7XG4gICAgICAgIHNlcmllczogeyBtYXJrZXI6IDxhbnk+eyBlbmFibGVkOiB0cnVlLCBmaWxsT3BhY2l0eTogMC41IH0gfVxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiJdfQ==
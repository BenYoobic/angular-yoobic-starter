(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/forms'), require('@angular/common'), require('@shared/translate'), require('rxjs'), require('@angular/core'), require('@shared/common'), require('rxjs/operators'), require('lodash-es'), require('@shared/data-core'), require('@shared/stencil')) :
    typeof define === 'function' && define.amd ? define('data-form', ['exports', '@angular/forms', '@angular/common', '@shared/translate', 'rxjs', '@angular/core', '@shared/common', 'rxjs/operators', 'lodash-es', '@shared/data-core', '@shared/stencil'], factory) :
    (factory((global['data-form'] = {}),global.ng.forms,global.ng.common,global['@shared/translate'],global.rxjs,global.ng.core,global['@shared/common'],global.rxjs.operators,global['lodash-es'],global['@shared/data-core'],global.DesignSystem));
}(this, (function (exports,forms,common,translate,rxjs,core,common$1,operators,lodashEs,dataCore,stencil) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CellRenderer = /** @class */ (function () {
        function CellRenderer() {
        }
        /**
         * @param {?} key
         * @return {?}
         */
        CellRenderer.getColor = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                /**
                 * @param {?} color
                 * @return {?}
                 */
                function isSameColor(color) {
                    return color.name === key;
                }
                return this.colors.find(isSameColor);
            };
        /**
         * @param {?} field
         * @param {?} translate
         * @param {?=} visibleFields
         * @param {?=} sortModel
         * @param {?=} component
         * @return {?}
         */
        CellRenderer.getColumnDefinition = /**
         * @param {?} field
         * @param {?} translate
         * @param {?=} visibleFields
         * @param {?=} sortModel
         * @param {?=} component
         * @return {?}
         */
            function (field, translate$$1, visibleFields, sortModel, component) {
                /** @type {?} */
                var fieldName = dataCore.Models.getFieldName(field);
                /** @type {?} */
                var col = ( /** @type {?} */({
                    headerName: dataCore.Models.getFieldTitle(field, translate$$1),
                    headerTooltip: dataCore.Models.getFieldTitle(field, translate$$1),
                    field: fieldName,
                    minWidth: field.columnDefinition && field.columnDefinition.width ? field.columnDefinition.width : 40,
                    width: field.columnDefinition && field.columnDefinition.width ? field.columnDefinition.width : 100,
                    hide: field.visible === false || (field.columnDefinition ? field.columnDefinition.hidden : false),
                    sortable: !(field.columnDefinition && field.columnDefinition.name && field.columnDefinition && field.columnDefinition.name.length > 0),
                    forceExport: field.forceExport,
                    exportOrder: field.exportOrder,
                    suppressExport: field.suppressExport,
                    menuTabs: ['filterMenuTab']
                }));
                if (field.type) {
                    (( /** @type {?} */(col))).type = field.type;
                }
                if (visibleFields && visibleFields.length > 0) {
                    col.hide = visibleFields.indexOf(fieldName) < 0;
                }
                if (sortModel && sortModel.indexOf({ colId: col.field, sort: 'asc' }) >= 0) {
                    col.sort = 'asc';
                }
                if (sortModel && sortModel.indexOf({ colId: col.field, sort: 'desc' }) >= 0) {
                    col.sort = 'desc';
                }
                if (col.headerName && col.headerName.toUpperCase() === col.headerName) {
                    col.headerName = translate$$1.get(col.headerName);
                }
                if (dataCore.Models.isBooleanField(field)) {
                    col.cellRenderer = 'booleanRenderer';
                }
                else if (dataCore.Models.isVideoField(field)) {
                    col.cellRenderer = 'videoRenderer'; //VideoRendererComponent;
                    // col.onCellClicked = (params) => {
                    //     let url = DefaultRendererComponent.renderer(params);
                    //     if (url && component && component.onVideoSelect) {
                    //         component.onVideoSelect(url);
                    //     }
                    // };
                }
                else if (dataCore.Models.isPhotoField(field)) {
                    col.cellRenderer = 'photoRenderer';
                    // col.onCellClicked = (params) => {
                    //     let photo = Models.getPhotoFromParams(params);
                    //     if (photo && component && component.onPhotoSelect) {
                    //         component.onPhotoSelect(photo);
                    //     }
                    // };
                }
                else if (dataCore.Models.isMultiPhotosField(field)) {
                    col.cellRenderer = 'multiphotoRenderer';
                    // col.onCellClicked = (params) => {
                    //     let photos = Models.getPhotosFromParams(params);
                    //     if (photos && photos.length > 0 && component && component.onPhotoSelect) {
                    //         component.onPhotoSelect(photos[0]);
                    //     }
                    // };
                }
                else if ((( /** @type {?} */(field))).isDistanceField === true) {
                    col.cellRenderer = 'distanceRenderer';
                    col.sortable = false;
                    col.comparator = 'distanceComparator';
                }
                else if (field.type === stencil.FormFieldType.number) {
                    col.cellRenderer = 'numberRenderer';
                }
                else if (field.type === stencil.FormFieldType.date) {
                    col.cellRenderer = 'dateRenderer';
                }
                else if (dataCore.Models.isDateTimeField(field)) {
                    col.cellRenderer = 'dateTimeRenderer';
                }
                else if (field.type === stencil.FormFieldType.time) {
                    col.cellRenderer = 'timeRenderer';
                }
                else if (field.type === stencil.FormFieldType.address) {
                    col.cellRenderer = 'addressRenderer';
                }
                else if (field.type === stencil.FormFieldType.location) {
                    col.cellRenderer = 'locationRenderer';
                }
                else if (field.type === stencil.FormFieldType.starrating) {
                    col.cellRenderer = 'starratingRenderer';
                    col.cellRendererParams = { max: field.max };
                }
                else if (field.type === stencil.FormFieldType.todo) {
                    col.cellRenderer = 'todoRenderer';
                }
                else if (field.type === stencil.FormFieldType.timer) {
                    col.cellRenderer = 'timerRenderer';
                }
                else if (field.type === stencil.FormFieldType.checklist) {
                    col.cellRenderer = 'checklistRenderer';
                }
                else if (field.type === stencil.FormFieldType.autocomplete && field.collectionName && dataCore.Models.getModelByCollectionName(field.collectionName) && dataCore.Models.getModelByCollectionName(field.collectionName).isCustom) {
                    col.cellRenderer = 'customModelRenderer';
                }
                else {
                    col.cellRenderer = 'defaultRenderer';
                }
                if (field.columnDefinition && field.columnDefinition.rendererType) {
                    switch (field.columnDefinition.rendererType) {
                        case 'percentage':
                            col.cellRenderer = 'percentageRenderer';
                            break;
                        case 'duration':
                            col.cellRenderer = 'durationRenderer';
                            break;
                        case 'userfullname':
                            col.cellRenderer = 'userFullNameRenderer';
                            break;
                    }
                }
                if (field.columnDefinition && field.columnDefinition.cellRenderer) {
                    col.cellRenderer = field.columnDefinition.cellRenderer;
                }
                return col;
            };
        /**
         * @return {?}
         */
        CellRenderer.getColumnTypes = /**
         * @return {?}
         */
            function () {
                return {
                    address: {},
                    audio: {},
                    autocomplete: {},
                    barcode: {},
                    'between-date': {},
                    'between-number': {},
                    button: {},
                    catalog: {},
                    checkbox: {},
                    color: {},
                    date: {},
                    daterange: {},
                    'datetime-local': {},
                    document: {},
                    documentuploader: {},
                    email: {},
                    emailreport: {},
                    filter: {},
                    grid: {},
                    image: {},
                    information: {},
                    inttel: {},
                    invite: {},
                    json: {},
                    location: {},
                    missionfield: {},
                    missionscore: {},
                    number: {},
                    password: {},
                    multiphotos: {},
                    photo: {},
                    productcheck: {},
                    range: {},
                    ranking: {},
                    select: {},
                    selectbuttons: {},
                    selectbuttonsmulti: {},
                    selectimage: {},
                    selectmulti: {},
                    signature: {},
                    starrating: {},
                    string: {},
                    stripecard: {},
                    tel: {},
                    text: {},
                    textarea: {},
                    time: {},
                    timer: {},
                    todo: {},
                    toggle: {},
                    video: {},
                    knob: {},
                    selectchat: {},
                    missingword: {},
                    swipeselect: {},
                    checklist: {},
                    formula: {},
                    videoplayer: {}
                };
            };
        /**
         * @param {?} multiple
         * @param {?} rowModelType
         * @param {?} infiniteScrolling
         * @param {?} pageSize
         * @param {?} translate
         * @return {?}
         */
        CellRenderer.getConfig = /**
         * @param {?} multiple
         * @param {?} rowModelType
         * @param {?} infiniteScrolling
         * @param {?} pageSize
         * @param {?} translate
         * @return {?}
         */
            function (multiple, rowModelType, infiniteScrolling, pageSize, translate$$1) {
                return {
                    rowHeight: 52,
                    rowStyle: { 'line-height': '32px' },
                    headerHeight: 40,
                    defaultColDef: { sortable: true, resizable: true },
                    rowDeselection: true,
                    rowSelection: multiple ? 'multiple' : 'single',
                    rowModelType: rowModelType || 'serverSide',
                    rowBuffer: 0,
                    maxConcurrentDatasourceRequests: 1,
                    infiniteInitialRowCount: pageSize,
                    cacheOverflowSize: 2,
                    //maxBlocksInCache: 10,
                    pagination: !infiniteScrolling,
                    paginationPageSize: pageSize,
                    cacheBlockSize: pageSize,
                    suppressPropertyNamesCheck: true,
                    animateRows: true,
                    localeText: CellRenderer.getTranslation(translate$$1),
                    //suppressContextMenu: true,
                    columnTypes: CellRenderer.getColumnTypes()
                };
            };
        /**
         * @param {?} translate
         * @return {?}
         */
        CellRenderer.getPivotConfig = /**
         * @param {?} translate
         * @return {?}
         */
            function (translate$$1) {
                return {
                    rowHeight: 52,
                    rowStyle: { 'line-height': '32px' },
                    headerHeight: 40,
                    defaultColDef: { sortable: true, resizable: true },
                    filter: true,
                    suppressPreventDefaultOnMouseWheel: false,
                    suppressPropertyNamesCheck: true,
                    rememberGroupStateWhenNewData: true,
                    suppressAggFuncInHeader: true,
                    groupDefaultExpanded: 0,
                    groupSuppressGroupColumn: true,
                    suppressRowHoverClass: true,
                    autoGroupColumnDef: {
                        headerName: translate$$1.get('GROUP'),
                        cellRenderer: 'agGroupCellRenderer',
                        comparator: 'defaultGroupComparator'
                    },
                    icons: {
                        menu: '<yoo-icon class="yo-menu"></yoo-icon>',
                        filter: '<yoo-icon class="yo-filter"></yoo-icon>',
                        groupExpanded: '<yoo-icon class="yo-circle-minor"></yoo-icon>',
                        groupContracted: '<yoo-icon class="yo-circle-plus"></yoo-icon>',
                        columnGroupOpened: '<yoo-icon class="yo-nodata"></yoo-icon>',
                        columnGroupClosed: '<yoo-icon class="yo-plus"></yoo-icon>',
                        columnSelectOpen: '<yoo-icon class="yo-nodata"></yoo-icon>',
                        columnSelectClosed: '<yoo-icon class="yo-plus"></yoo-icon>',
                        checkboxChecked: '<yoo-icon class="yo-check"></yoo-icon>',
                        checkboxUnchecked: '<yoo-icon class="yo-circle"></yoo-icon>',
                        checkboxIndeterminate: '<yoo-icon class="yo-circle"></yoo-icon>',
                        sortAscending: '<yoo-icon class="yo-up"></yoo-icon>',
                        sortDescending: '<yoo-icon class="yo-down"></yoo-icon>',
                        columnMoveGroup: '<yoo-icon class="yo-direction-select"></yoo-icon>',
                        dropNotAllowed: '<yoo-icon class="yo-rejected2"></yoo-icon>'
                    },
                    columnTypes: CellRenderer.getColumnTypes(),
                    localeText: CellRenderer.getTranslation(translate$$1),
                    groupUseEntireRow: false,
                    groupRowInnerRenderer: 'progressRenderer'
                };
            };
        /**
         * @param {?} translate
         * @return {?}
         */
        CellRenderer.getTranslation = /**
         * @param {?} translate
         * @return {?}
         */
            function (translate$$1) {
                return {
                    next: '<i class="yo-right"></i>',
                    previous: '<i class="yo-left"></i>',
                    page: ' ',
                    of: '/',
                    more: translate$$1.get('AGGRIDMORE'),
                    to: ' - ',
                    loadingOoo: translate$$1.get('AGGRIDLOADINGOOO'),
                    selectAll: translate$$1.get('AGGRIDSELECTALL'),
                    searchOoo: translate$$1.get('AGGRIDSEARCHOOO'),
                    blanks: translate$$1.get('AGGRIDBLANKS'),
                    filterOoo: translate$$1.get('AGGRIDFILTEROOO'),
                    applyFilter: translate$$1.get('AGGRIDAPPLYFILTER'),
                    equals: translate$$1.get('AGGRIDEQUALS'),
                    lessThan: translate$$1.get('AGGRIDLESSTHAN'),
                    greaterThan: translate$$1.get('AGGRIDGREATERTHAN'),
                    contains: translate$$1.get('AGGRIDCONTAINS'),
                    startsWith: translate$$1.get('AGGRIDSTARTSWITH'),
                    endsWith: translate$$1.get('AGGRIDENDSWITH'),
                    group: translate$$1.get('AGGRIDGROUP'),
                    columns: translate$$1.get('AGGRIDCOLUMNS'),
                    rowGroupColumns: translate$$1.get('AGGRIDROWGROUPCOLUMNS'),
                    rowGroupColumnsEmptyMessage: translate$$1.get('AGGRIDROWGROUPCOLUMNSEMPTYMESSAGE'),
                    valueColumns: translate$$1.get('AGGRIDVALUECOLUMNS'),
                    pivotMode: translate$$1.get('AGGRIDPIVOTMODE'),
                    groups: translate$$1.get('AGGRIDGROUPS'),
                    values: translate$$1.get('AGGRIDVALUES'),
                    pivots: translate$$1.get('AGGRIDPIVOTS'),
                    valueColumnsEmptyMessage: translate$$1.get('AGGRIDVALUECOLUMNSEMPTYMESSAGE'),
                    pivotColumnsEmptyMessage: translate$$1.get('AGGRIDPIVOTCOLUMNSEMPTYMESSAGE'),
                    noRowsToShow: translate$$1.get('AGGRIDNOROWSTOSHOW'),
                    pinColumn: translate$$1.get('AGGRIDPINCOLUMN'),
                    valueAggregation: translate$$1.get('AGGRIDVALUEAGGREGATION'),
                    autosizeThiscolumn: translate$$1.get('AGGRIDAUTOSIZETHISCOLUMN'),
                    autosizeAllColumns: translate$$1.get('AGGRIDAUTOSIZEALLCOLUMNS'),
                    groupBy: translate$$1.get('AGGRIDGROUPBY'),
                    ungroupBy: translate$$1.get('AGGRIDUNGROUPBY'),
                    resetColumns: translate$$1.get('AGGRIDRESETCOLUMNS'),
                    expandAll: translate$$1.get('AGGRIDEXPANDALL'),
                    collapseAll: translate$$1.get('AGGRIDCOLLAPSEALL'),
                    toolPanel: translate$$1.get('AGGRIDTOOLPANEL'),
                    pinLeft: translate$$1.get('AGGRIDPINLEFT'),
                    pinRight: translate$$1.get('AGGRIDPINRIGHT'),
                    noPin: translate$$1.get('AGGRIDNOPIN'),
                    sum: translate$$1.get('AGGRIDSUM'),
                    min: translate$$1.get('AGGRIDMIN'),
                    max: translate$$1.get('AGGRIDMAX'),
                    none: translate$$1.get('AGGRIDNONE'),
                    count: translate$$1.get('AGGRIDCOUNT'),
                    average: translate$$1.get('AGGRIDAVERAGE'),
                    avg: translate$$1.get('AGGRIDAVERAGE'),
                    copy: translate$$1.get('AGGRIDCOPY'),
                    ctrlC: translate$$1.get('AGGRIDCTRLC'),
                    paste: translate$$1.get('AGGRIDPASTE'),
                    ctrlV: translate$$1.get('AGGRIDCTRLV')
                };
            };
        /**
         * @param {?=} collectionName
         * @param {?=} translate
         * @param {?=} campaignFields
         * @param {?=} customColumnDefs
         * @param {?=} includeDistance
         * @param {?=} infiniteScrolling
         * @param {?=} itemButtons
         * @param {?=} colMinWidth
         * @param {?=} visibleFields
         * @param {?=} sortModel
         * @param {?=} grid
         * @param {?=} hiddenColumns
         * @return {?}
         */
        CellRenderer.createColumnDefs = /**
         * @param {?=} collectionName
         * @param {?=} translate
         * @param {?=} campaignFields
         * @param {?=} customColumnDefs
         * @param {?=} includeDistance
         * @param {?=} infiniteScrolling
         * @param {?=} itemButtons
         * @param {?=} colMinWidth
         * @param {?=} visibleFields
         * @param {?=} sortModel
         * @param {?=} grid
         * @param {?=} hiddenColumns
         * @return {?}
         */
            function (collectionName, translate$$1, campaignFields, customColumnDefs, includeDistance, infiniteScrolling, itemButtons, colMinWidth, visibleFields, sortModel, grid, hiddenColumns) {
                /** @type {?} */
                var columnDefs = [];
                if (customColumnDefs && customColumnDefs.length > 0) {
                    columnDefs = lodashEs.cloneDeep(customColumnDefs);
                }
                else {
                    if (!collectionName) {
                        return;
                    } // || (items && items.length > 0)
                    // || (items && items.length > 0)
                    /** @type {?} */
                    var formFields = [];
                    /** @type {?} */
                    var model = dataCore.Models.getModelByCollectionName(collectionName);
                    if (model) {
                        formFields = model.formFields;
                        if (campaignFields && campaignFields.length > 0) {
                            campaignFields = lodashEs.cloneDeep(campaignFields);
                            campaignFields.forEach(( /**
                             * @param {?} c
                             * @return {?}
                             */function (c) { return (c.name += '.value'); }));
                            formFields = lodashEs.concat(formFields, campaignFields);
                        }
                    }
                    columnDefs = [];
                    formFields.forEach(( /**
                     * @param {?} field
                     * @return {?}
                     */function (field) {
                        /** @type {?} */
                        var colEdit;
                        /** @type {?} */
                        var col = CellRenderer.getColumnDefinition(field, translate$$1, visibleFields, sortModel, grid);
                        if (colMinWidth > 0 && col.minWidth === 40) {
                            col.minWidth = colMinWidth;
                        }
                        col.menuTabs = [];
                        if (field.type === stencil.FormFieldType.catalog) {
                            col.cellRenderer = 'catalogRenderer';
                            col.isCheck = field.check;
                            col.isPresence = field.presence;
                            col.isInventory = field.inventory;
                        }
                        if (field.type === stencil.FormFieldType.multiphotos) {
                            col.suppressExport = true;
                        }
                        //if (col.hide !== true) {
                        if (!hiddenColumns || hiddenColumns.indexOf(col.field) < 0) {
                            columnDefs.push(col);
                        }
                        if (field.isImageRecognition && field.type === stencil.FormFieldType.photo) {
                            colEdit = lodashEs.cloneDeep(col);
                            colEdit.hide = true;
                            colEdit.headerName += ' - Markup';
                            colEdit.forceExport = true;
                            colEdit.field = colEdit.field.replace('.value', '.edit');
                            columnDefs.push(colEdit);
                        }
                        if (field.type === stencil.FormFieldType.multiphotos) {
                            for (var i = 0; i < field.maxPhotos; i++) {
                                /** @type {?} */
                                var colPhoto = lodashEs.cloneDeep(col);
                                colPhoto.hide = true;
                                colPhoto.suppressExport = false;
                                colPhoto.headerName += ' ' + i;
                                colPhoto.forceExport = true;
                                colPhoto.field = colPhoto.field.replace('.value', '.value[' + i + ']');
                                columnDefs.push(colPhoto);
                                if (field.isImageRecognition) {
                                    colEdit = lodashEs.cloneDeep(col);
                                    colEdit.hide = true;
                                    colEdit.suppressExport = false;
                                    colEdit.headerName += ' - Markup ' + i;
                                    colEdit.forceExport = true;
                                    colEdit.field = colEdit.field.replace('.value', '.extraData[' + i + '].edit');
                                    columnDefs.push(colEdit);
                                }
                            }
                        }
                        //}
                    }));
                }
                if (includeDistance) {
                    /** @type {?} */
                    var distanceField = {
                        name: 'distance',
                        title: 'Distance',
                        type: stencil.FormFieldType.number,
                        columnDefinition: { width: 150 },
                        isDistanceField: true
                    };
                    /** @type {?} */
                    var distanceCol = CellRenderer.getColumnDefinition(distanceField, translate$$1);
                    columnDefs.push(distanceCol);
                }
                if (infiniteScrolling === true) {
                    columnDefs.unshift({
                        headerName: '#',
                        width: 50,
                        cellRenderer: ( /**
                         * @param {?} params
                         * @return {?}
                         */function (params) { return params.node.id + 1; })
                    });
                }
                if (itemButtons && itemButtons.length > 0) {
                    itemButtons.forEach(( /**
                     * @param {?} button
                     * @return {?}
                     */function (button) {
                        columnDefs.push({
                            //minWidth: 45,
                            width: 45,
                            //headerClass: 'centered',
                            cellClass: 'overflow',
                            suppressExport: true,
                            sortable: false,
                            suppressFilter: true,
                            pinned: 'right',
                            menuTabs: ['filterMenuTab'],
                            context: {
                                icon: button.icon,
                                color: button.color,
                                text: button.text
                            },
                            cellRenderer: 'buttonRenderer',
                            onCellClicked: ( /**
                             * @param {?} params
                             * @return {?}
                             */function (params) {
                                button.handler(params.data && params.data.toJS ? params.data.toJS() : params.data);
                                return false;
                            })
                        });
                    }));
                }
                return columnDefs;
            };
        CellRenderer.colors = [
            { name: 'finished', value: common$1.Colors.black, class: 'black', index: 0, textValue: common$1.Colors.light },
            { name: 'booked', value: common$1.Colors.warning, class: 'warning', index: 1, textValue: common$1.Colors.black },
            { name: 'available', value: common$1.Colors.stable, class: 'stable', index: 2, textValue: common$1.Colors.black },
            { name: 'visited', value: common$1.Colors.black, class: 'black', index: 3, textValue: common$1.Colors.light },
            {
                name: 'notvisited',
                value: common$1.Colors.stable,
                class: 'stable',
                index: 4,
                textValue: common$1.Colors.black
            },
            {
                name: 'analyzed',
                value: common$1.Colors.success,
                class: 'success',
                index: 5,
                textValue: common$1.Colors.black
            },
            {
                name: 'validated',
                value: common$1.Colors.success,
                class: 'success',
                index: 6,
                textValue: common$1.Colors.black
            },
            {
                name: 'tobevalidated',
                value: common$1.Colors.stable,
                class: 'stable',
                index: 7,
                textValue: common$1.Colors.light
            },
            { name: 'rejected', value: common$1.Colors.danger, class: 'danger', index: 8, textValue: common$1.Colors.light },
            { name: 'progress', value: common$1.Colors.stable, class: 'stable', index: 9, textValue: common$1.Colors.black },
            {
                name: 'validationprogress',
                value: common$1.Colors.stable,
                class: 'stable',
                index: 10,
                textValue: common$1.Colors.black
            },
            {
                name: 'conformityprogress',
                value: common$1.Colors.stable,
                class: 'stable',
                index: 11,
                textValue: common$1.Colors.black
            },
            {
                name: 'conformityrelativeprogress',
                value: common$1.Colors.stable,
                class: 'stable',
                index: 12,
                textValue: common$1.Colors.black
            },
            {
                name: 'ontime',
                value: common$1.Colors.success,
                class: 'success',
                index: 13,
                textValue: common$1.Colors.success
            },
            { name: 'late', value: common$1.Colors.danger, class: 'danger', index: 14, textValue: common$1.Colors.danger },
            {
                name: 'satisfactory',
                value: common$1.Colors.success,
                class: 'success',
                index: 15,
                textValue: common$1.Colors.success
            },
            {
                name: 'unsatisfactory',
                value: common$1.Colors.danger,
                class: 'danger',
                index: 16,
                textValue: common$1.Colors.danger
            },
            {
                name: 'nonapplicable',
                value: common$1.Colors.black,
                class: 'black',
                index: 17,
                textValue: common$1.Colors.light
            }
        ];
        CellRenderer.decorators = [
            { type: core.Injectable }
        ];
        return CellRenderer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Conditions = /** @class */ (function () {
        function Conditions() {
        }
        /**
         * @return {?}
         */
        Conditions.prototype.generateConditionId = /**
         * @return {?}
         */
            function () {
                return stencil.getUUID();
            };
        /**
         * @param {?} op
         * @return {?}
         */
        Conditions.prototype.convertOperator = /**
         * @param {?} op
         * @return {?}
         */
            function (op) {
                if (!op) {
                    return 'in';
                }
                /** @type {?} */
                var retVal;
                switch (op.toLowerCase().replace(/\s/g, '')) {
                    case 'equals':
                    case '==':
                    case '===':
                    case 'égal':
                        retVal = 'equals';
                        break;
                    case 'notequals':
                    case '!=':
                    case '!==':
                    case 'différentde':
                        retVal = 'notequals';
                        break;
                    case 'greaterthan':
                    case '>=':
                    case 'plusgrandque':
                        retVal = 'greaterthan';
                        break;
                    case 'lessthan':
                    case '<=':
                    case 'pluspetitque':
                        retVal = 'lessthan';
                        break;
                    case 'in':
                    case 'contient':
                    case 'contains':
                        retVal = 'in';
                        break;
                    case 'notin':
                    case 'necontientpas':
                    case 'notcontains':
                        retVal = 'notin';
                        break;
                }
                return retVal;
            };
        /**
         * @param {?} type
         * @return {?}
         */
        Conditions.prototype.convertType = /**
         * @param {?} type
         * @return {?}
         */
            function (type) {
                if (!type) {
                    return;
                }
                /** @type {?} */
                var retVal;
                switch (type.toLowerCase().replace(/\s/g, '')) {
                    case 'field':
                    case 'champ':
                        retVal = 'field';
                        break;
                    case 'tags':
                        retVal = 'tags';
                        break;
                    case 'groups':
                    case 'groupes':
                        retVal = 'groups';
                        break;
                    default:
                        retVal = '';
                        break;
                }
                return retVal;
            };
        /**
         * @param {?} f
         * @return {?}
         */
        Conditions.prototype.convertField = /**
         * @param {?} f
         * @return {?}
         */
            function (f) {
                if (!f) {
                    return;
                }
                /** @type {?} */
                var res = { name: f.name, title: f.title, type: f.type };
                if (f.values) {
                    res['values'] = f.values;
                }
                return res;
            };
        /**
         * @param {?} c
         * @return {?}
         */
        Conditions.prototype.isValid = /**
         * @param {?} c
         * @return {?}
         */
            function (c) {
                if (!c) {
                    return false;
                }
                /** @type {?} */
                var isTitleValid = c.title && !!c.title.replace(/\s/g, '');
                /** @type {?} */
                var isOpValid = c.operator && dataCore.CONDITION_ALL_OPERATORS.indexOf(c.operator) >= 0;
                /** @type {?} */
                var isTypeValid = c.type && dataCore.CONDITION_TYPES.indexOf(c.type) >= 0;
                /** @type {?} */
                var isFieldValid = c.type === 'field' && c.field;
                /** @type {?} */
                var isTagsValid = c.type === 'tags' && c.tags && lodashEs.isArray(c.tags) && c.tags.length > 0;
                /** @type {?} */
                var isGroupValid = c.type === 'groups' && c.group && lodashEs.isArray(c.group) && c.group.length > 0;
                /** @type {?} */
                var isValueValid = c.type === 'field' && isFieldValid && dataCore.SIMPLE_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.value;
                /** @type {?} */
                var areValuesValid = c.type === 'field' && isFieldValid && dataCore.WITH_VALUES_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.values && lodashEs.isArray(c.values) && c.values.length > 0;
                return isTitleValid && isOpValid && isTypeValid && (isGroupValid || isTagsValid || (isFieldValid && (isValueValid || areValuesValid)));
            };
        /**
         * @param {?} c1
         * @param {?} c2
         * @return {?}
         */
        Conditions.prototype.areEqual = /**
         * @param {?} c1
         * @param {?} c2
         * @return {?}
         */
            function (c1, c2) {
                if (c1._id && c2._id) {
                    return c1._id === c2._id;
                }
                else if (!c1._id && !c2._id) {
                    return lodashEs.isEqual(c1, c2);
                }
                else if (c1._id && !c2._id) {
                    return lodashEs.isEqual(c2, lodashEs.omit(c1, '_id'));
                }
                else if (!c1._id && c2._id) {
                    return lodashEs.isEqual(c1, lodashEs.omit(c2, '_id'));
                }
            };
        Conditions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Conditions.ctorParameters = function () { return []; };
        return Conditions;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormDynamicBuilder = /** @class */ (function () {
        function FormDynamicBuilder(translate$$1) {
            this.translate = translate$$1;
            //private builder: FormBuilder, private session: Session,, private coreConfig: CoreConfig, private log: Log, private injector: Injector
        }
        /**
         * @return {?}
         */
        FormDynamicBuilder.prototype.generateFieldName = /**
         * @return {?}
         */
            function () {
                return stencil.getUUID();
            };
        /**
         * @param {?} value
         * @param {?} answer
         * @param {?} field
         * @return {?}
         */
        FormDynamicBuilder.prototype.answerIsValid = /**
         * @param {?} value
         * @param {?} answer
         * @param {?} field
         * @return {?}
         */
            function (value, answer, field) {
                return stencil.answerIsValid(value, answer, field);
            };
        /**
         * @param {?} missiondescription
         * @return {?}
         */
        FormDynamicBuilder.prototype.hasScoring = /**
         * @param {?} missiondescription
         * @return {?}
         */
            function (missiondescription) {
                if (missiondescription && missiondescription.scoring && missiondescription.scoring.length > 0) {
                    // && _some(missiondescription.scoring, (score: any) => score.isActive)) {
                    return true;
                }
                return false;
            };
        /**
         * @param {?} mission
         * @param {?} data
         * @return {?}
         */
        FormDynamicBuilder.prototype.calculateScoring = /**
         * @param {?} mission
         * @param {?} data
         * @return {?}
         */
            function (mission, data) {
                var _this = this;
                if (mission.description.scoring.length > 1) {
                    mission.extraScores = {};
                }
                lodashEs.forEach(mission.description.scoring, ( /**
                 * @param {?} scoring
                 * @return {?}
                 */function (scoring) {
                    //let scoring = _find(mission.description.scoring, (s: any) => s.isActive);
                    /** @type {?} */
                    var scoreValue = scoring.initialValue || 0;
                    /** @type {?} */
                    var scorePercentageBasis = scoring.percentageBasis || 0;
                    lodashEs.forEach(data, ( /**
                     * @param {?} value
                     * @param {?} key
                     * @return {?}
                     */function (value, key) {
                        if (value && lodashEs.isArray(value.value)) {
                            lodashEs.forEach(value.value, ( /**
                             * @param {?} v
                             * @return {?}
                             */function (v) {
                                if (v && lodashEs.isNumber(scoring[key + _this.encodeScoringValue(v)])) {
                                    /** @type {?} */
                                    var numValue = scoring[key + _this.encodeScoringValue(v)];
                                    if (numValue < 0 && -numValue % 1337 === 0) {
                                        scorePercentageBasis -= -numValue / 1337;
                                    }
                                    else {
                                        scoreValue += numValue;
                                    }
                                }
                            }));
                        }
                        else {
                            if (value && lodashEs.isNumber(scoring[key + _this.encodeScoringValue(value.value)])) {
                                /** @type {?} */
                                var numValue = scoring[key + _this.encodeScoringValue(value.value)];
                                if (numValue < 0 && -numValue % 1337 === 0) {
                                    scorePercentageBasis -= -numValue / 1337;
                                }
                                else {
                                    scoreValue += numValue;
                                }
                            }
                            else if (value && lodashEs.isNumber(value.value) && lodashEs.isNumber(scoring[key])) {
                                scoreValue += value.value * scoring[key];
                            }
                            else if (lodashEs.isBoolean(value.value) && scoring[key + 'value']) {
                                //not sure why we have the 'value' in the form creator
                                if (value.value && lodashEs.isNumber(scoring[key + 'value'].value)) {
                                    scoreValue += scoring[key + 'value'].value;
                                }
                                else if (!value.value && lodashEs.isNumber(scoring[key + 'value'].novalue)) {
                                    scoreValue += scoring[key + 'value'].novalue;
                                }
                            }
                        }
                        if (value && stencil.isPresent(value.value) && scoring[key + 'value'] && lodashEs.isNumber(scoring[key + 'value'].visible)) {
                            scorePercentageBasis += scoring[key + 'value'].visible;
                        }
                    }));
                    if (scoring.isPercentage && scorePercentageBasis > 0) {
                        scoreValue = Math.round((scoreValue * 100) / scorePercentageBasis);
                    }
                    /** @type {?} */
                    var score = { value: scoreValue, isPercentage: scoring.isPercentage, title: scoring.title };
                    if (scoring.isActive || mission.description.scoring.length === 1) {
                        mission.score = score;
                        if ((scoring.minValue || scoring.minValue === 0) && scoreValue < scoring.minValue) {
                            mission.validated = false;
                        }
                        else if ((scoring.minValue || scoring.minValue === 0) && scoreValue >= scoring.minValue) {
                            delete mission.validated;
                        }
                    }
                    else {
                        mission.extraScores[score.title] = score;
                    }
                }));
            };
        /**
         * @param {?} mission
         * @param {?} slides
         * @param {?} data
         * @return {?}
         */
        FormDynamicBuilder.prototype.calculateScoringQuizz = /**
         * @param {?} mission
         * @param {?} slides
         * @param {?} data
         * @return {?}
         */
            function (mission, slides, data) {
                var _this = this;
                /** @type {?} */
                var score = { total: 0, value: 0 };
                /** @type {?} */
                var fields = dataCore.Models.getFieldsFromSlides(slides);
                lodashEs.forEach(fields, ( /**
                 * @param {?} field
                 * @return {?}
                 */function (field) {
                    if (field.answer && field.answer.length > 0) {
                        score.total += 1;
                    }
                    if (data[field.name] && _this.answerIsValid(data[field.name].value, field.answer, field)) {
                        score.value += 1;
                    }
                }));
                mission.score = score;
            };
        /**
         * @param {?} formDefinition
         * @return {?}
         */
        FormDynamicBuilder.prototype.hasTabs = /**
         * @param {?} formDefinition
         * @return {?}
         */
            function (formDefinition) {
                return formDefinition.some(( /**
                 * @param {?} f
                 * @return {?}
                 */function (f) { return f.tab && f.tab.length > 0; }));
            };
        /**
         * @param {?} formDefinition
         * @return {?}
         */
        FormDynamicBuilder.prototype.getSlides = /**
         * @param {?} formDefinition
         * @return {?}
         */
            function (formDefinition) {
                var _this = this;
                /** @type {?} */
                var map = new Map();
                map.set('GENERAL', ( /** @type {?} */({ title: this.translate.get('GENERAL'), items: [], order: 0 })));
                formDefinition.forEach(( /**
                 * @param {?} f
                 * @return {?}
                 */function (f) {
                    /** @type {?} */
                    var tabName = _this.getTabName(f);
                    if (!f.tab) {
                        map.get('GENERAL').items.push(f);
                    }
                    else if (map.has(tabName)) {
                        map.get(tabName).items.push(f);
                        if (f.tabCondition) {
                            map.get(tabName).condition = ( /** @type {?} */(f.tabCondition));
                        }
                    }
                    else {
                        map.set(tabName, ( /** @type {?} */({ title: tabName, items: [f], condition: f.tabCondition })));
                    }
                }));
                return lodashEs.filter(lodashEs.sortBy(Array.from(map.values()), ( /**
                 * @param {?} slide
                 * @return {?}
                 */function (slide) { return slide.title; })), ( /**
                 * @param {?} slide
                 * @return {?}
                 */function (slide) { return slide.items.length > 0; }));
            };
        /**
         * @param {?} data
         * @param {?} fields
         * @return {?}
         */
        FormDynamicBuilder.prototype.updateDataFieldType = /**
         * @param {?} data
         * @param {?} fields
         * @return {?}
         */
            function (data, fields) {
                var _this = this;
                data.nonapplicableCount = 0;
                data.satisfactoryCount = 0;
                data.unsatisfactoryCount = 0;
                lodashEs.forEach(fields, ( /**
                 * @param {?} field
                 * @return {?}
                 */function (field) {
                    if (lodashEs.isObject(data[field.name])) {
                        data[field.name].fieldType = field.type;
                        data[field.name].fieldTitle = field.title;
                        if (data[field.name] && data[field.name].value && field.type === stencil.FormFieldType.photo && field.values && (!data[field.name].tags || data[field.name].tags.length < 1)) {
                            data[field.name].tags = field.values;
                        }
                        else if (data[field.name] && data[field.name].value && field.type === stencil.FormFieldType.multiphotos && field.values) {
                            data[field.name].extraData = data[field.name].extraData || {};
                            data[field.name].value.forEach(( /**
                             * @param {?} v
                             * @param {?} i
                             * @return {?}
                             */function (v, i) {
                                data[field.name].extraData[i] = data[field.name].extraData[i] || {};
                                if (!data[field.name].extraData[i].tags || data[field.name].extraData[i].tags.length < 1) {
                                    data[field.name].extraData[i].tags = field.values;
                                }
                            }));
                        }
                        if (field.shareToFeed) {
                            data[field.name].fieldShareToFeed = field.shareToFeed;
                        }
                        if (field.answer) {
                            data[field.name].answer = field.answer;
                            data[field.name].fieldValidity = _this.answerIsValid(data[field.name].value, field.answer, field);
                        }
                        if (field.explanation) {
                            data[field.name].explanation = field.explanation;
                        }
                        if (field.valuesType) {
                            /** @type {?} */
                            var value_1 = data[field.name].value;
                            /** @type {?} */
                            var type = field.valuesType.find(( /**
                             * @param {?} t
                             * @return {?}
                             */function (t) { return t.key === value_1; }));
                            if (type) {
                                data[field.name].valueType = type.value;
                            }
                        }
                        if (field.valuesType && data[field.name] && data[field.name].value) {
                            /** @type {?} */
                            var values = [].concat(data[field.name].value);
                            values.forEach(( /**
                             * @param {?} key
                             * @return {?}
                             */function (key) {
                                /** @type {?} */
                                var type = field.valuesType.find(( /**
                                 * @param {?} t
                                 * @return {?}
                                 */function (t) { return t.key === key; }));
                                if (type) {
                                    if (type.value === 'satisfactory') {
                                        data.satisfactoryCount += 1;
                                    }
                                    else if (type.value === 'unsatisfactory') {
                                        data.unsatisfactoryCount += 1;
                                    }
                                    else if (type.value === 'nonapplicable') {
                                        data.nonapplicableCount += 1;
                                    }
                                }
                            }));
                        }
                    }
                }));
            };
        /**
         * @param {?} field
         * @return {?}
         */
        FormDynamicBuilder.prototype.getTabName = /**
         * @param {?} field
         * @return {?}
         */
            function (field) {
                /** @type {?} */
                var retVal = '';
                if (field.tabIndex) {
                    retVal += field.tabIndex + '. ';
                }
                if (field.tab) {
                    retVal += this.translate.get(field.tab);
                }
                return retVal;
            };
        /**
         * @param {?} v
         * @return {?}
         */
        FormDynamicBuilder.prototype.encodeScoringValue = /**
         * @param {?} v
         * @return {?}
         */
            function (v) {
                if (v && v.toString) {
                    return v.toString().replace(/\./, '_');
                }
                else {
                    return v;
                }
            };
        FormDynamicBuilder.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        FormDynamicBuilder.ctorParameters = function () {
            return [
                { type: translate.Translate }
            ];
        };
        return FormDynamicBuilder;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Mapping = /** @class */ (function () {
        function Mapping(rq, googlemaps, broker, conditionsService, config, translate$$1, xlsx) {
            this.rq = rq;
            this.googlemaps = googlemaps;
            this.broker = broker;
            this.conditionsService = conditionsService;
            this.config = config;
            this.translate = translate$$1;
            this.xlsx = xlsx;
            this._stringToArray = ( /**
             * @param {?} str
             * @return {?}
             */function (str) {
                /** @type {?} */
                var array = str ? lodashEs.trimEnd(lodashEs.trimStart(str, '['), ']').split(',') : [];
                for (var i = 0; i < array.length; i++) {
                    if (/^\s/.test(array[i])) {
                        array[i] = array[i].substring(1);
                    }
                }
                return array;
            });
        }
        /**
         * @param {?} mapping
         * @return {?}
         */
        Mapping.prototype.getTotal = /**
         * @param {?} mapping
         * @return {?}
         */
            function (mapping) {
                if (mapping.document) {
                    return this.xlsx.read(mapping.document).then(( /**
                     * @param {?} data
                     * @return {?}
                     */function (data) {
                        return data.length - 1;
                    }));
                }
                else {
                    return Promise.resolve(0);
                }
            };
        /**
         * @param {?} slides
         * @param {?} conditions
         * @return {?}
         */
        Mapping.prototype.convertMissionForExcelExport = /**
         * @param {?} slides
         * @param {?} conditions
         * @return {?}
         */
            function (slides, conditions) {
                /** @type {?} */
                var conditionsData = this.convertConditonsForExcelExport(conditions);
                /** @type {?} */
                var slidesData = this.convertSlidesForExcelExport(slides);
                return [slidesData, conditionsData];
            };
        /**
         * @param {?} slides
         * @return {?}
         */
        Mapping.prototype.convertSlidesForExcelExport = /**
         * @param {?} slides
         * @return {?}
         */
            function (slides) {
                /** @type {?} */
                var columns = [
                    { name: 'id' },
                    { name: 'pageTitle' },
                    { name: 'pageDescription' },
                    { name: 'title' },
                    { name: 'description' },
                    { name: 'type' },
                    { name: 'allowComments' },
                    { name: 'required' },
                    { name: 'values' },
                    { name: 'allowLibrary' },
                    { name: 'min' },
                    { name: 'max' },
                    { name: 'step' },
                    { name: 'minDate' },
                    { name: 'maxDate' },
                    { name: 'hideMobile' },
                    { name: 'allowHistory' },
                    { name: 'showOnLocation' },
                    { name: 'allowAnnotate' },
                    { name: 'showUsers' },
                    { name: 'showService' },
                    { name: 'allowOther' },
                    { name: 'radius' },
                    { name: 'multiple' },
                    { name: 'clearable' },
                    { name: 'duration' },
                    { name: 'anwser' },
                    { name: 'explanation' },
                    { name: 'conditions' },
                    { name: 'allowTime' },
                    { name: 'image' }
                ];
                /** @type {?} */
                var data = [];
                //let counter = 1;
                lodashEs.forEach(slides, ( /**
                 * @param {?} slide
                 * @return {?}
                 */function (slide) {
                    lodashEs.forEach(slide.items, ( /**
                     * @param {?} field
                     * @return {?}
                     */function (field) {
                        data.push({
                            id: field.name,
                            pageTitle: slide.title,
                            pageDescription: slide.description,
                            title: field.title,
                            description: field.type === 'information' ? field.value : field.description,
                            type: field.type,
                            allowComments: field.allowComments,
                            required: field.required,
                            values: field.values,
                            allowLibrary: field.allowLibrary,
                            min: field.min,
                            max: field.max,
                            step: field.step,
                            minDate: field.minDate,
                            maxDate: field.maxDate,
                            hideMobile: field.hideMobile,
                            allowHistory: field.allowHistory,
                            showOnLocation: field.showOnLocation,
                            allowAnnotate: field.allowAnnotate,
                            showUsers: field.showUsers,
                            showService: field.showService,
                            allowOther: field.allowOther,
                            radius: field.radius,
                            multiple: field.multiple,
                            clearable: field.clearable,
                            duration: field.duration,
                            anwser: field.anwser,
                            explanation: field.explanation,
                            conditions: field.condition ? field.condition.map(( /**
                             * @param {?} c
                             * @return {?}
                             */function (c) { return c.title; })) : '',
                            allowTime: field.allowTime,
                            image: field.image
                        });
                    }));
                }));
                return { columns: columns, data: data, title: 'Slides' };
            };
        /**
         * @param {?} conditions
         * @return {?}
         */
        Mapping.prototype.convertConditonsForExcelExport = /**
         * @param {?} conditions
         * @return {?}
         */
            function (conditions) {
                /** @type {?} */
                var columns = [{ name: 'title' }, { name: 'type' }, { name: 'field' }, { name: 'operator' }, { name: 'values' }, { name: 'id' }];
                /** @type {?} */
                var data = [];
                lodashEs.forEach(conditions, ( /**
                 * @param {?} condition
                 * @return {?}
                 */function (condition) {
                    data.push({
                        title: condition.title,
                        type: condition.type,
                        field: condition.field ? condition.field.name : '',
                        operator: condition.operator,
                        values: condition.values || condition.value || condition.tags || condition.group,
                        id: condition._id
                    });
                }));
                return { columns: columns, data: data, title: 'Conditions' };
            };
        /**
         * @param {?} mapping
         * @param {?} collectionName
         * @param {?=} progress
         * @return {?}
         */
        Mapping.prototype.upload = /**
         * @param {?} mapping
         * @param {?} collectionName
         * @param {?=} progress
         * @return {?}
         */
            function (mapping, collectionName, progress) {
                var _this = this;
                /** @type {?} */
                var publicCollectionName = dataCore.Models.getPublicCollectionName(collectionName);
                return this.rq
                    .postFile(this.config.publicApiUrl + publicCollectionName + '/import', mapping.document)
                    .toPromise()
                    .then(( /**
             * @param {?} ret
             * @return {?}
             */function (ret) {
                    if (ret._id) {
                        return rxjs.timer(1000, 500)
                            .pipe(operators.concatMap(( /**
                     * @return {?}
                     */function () {
                            return _this.rq.get(_this.config.publicApiUrl + 'jobs/' + ret._id, false, null).pipe(operators.catchError(( /**
                             * @return {?}
                             */function () {
                                return rxjs.of({});
                            })));
                        })))
                            .pipe(operators.filter(( /**
                     * @param {?} s
                     * @return {?}
                     */function (s) {
                            if (progress && s && s.progress) {
                                progress.emit(s.progress * 100);
                            }
                            return s && s.progress === 1;
                        })))
                            .pipe(operators.take(1))
                            .toPromise()
                            .then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) {
                            /** @type {?} */
                            var errors = lodashEs.get(res, 'data.output.errors');
                            return errors || [];
                        }));
                    }
                }));
            };
        /**
         * @param {?} data
         * @return {?}
         */
        Mapping.prototype.convertTranslations = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                var _this = this;
                data.shift();
                /** @type {?} */
                var translations = [];
                lodashEs.forEach(data, ( /**
                 * @param {?} row
                 * @param {?} i
                 * @return {?}
                 */function (row, i) {
                    if (row[1]) {
                        /** @type {?} */
                        var translation = {
                            language: row[1],
                            key: row[2],
                            value: row[3],
                            en: row[4],
                            us: row[5],
                            fr: row[6],
                            es: row[7],
                            pl: row[8],
                            nl: row[9],
                            de: row[10],
                            it: row[11],
                            ru: row[12],
                            zhs: row[13],
                            zht: row[14],
                            pt: row[15],
                            kr: row[16],
                            ja: row[17],
                            ua: row[18],
                            he: row[19],
                            ar: row[20],
                            cz: row[21],
                            th: row[22],
                            tr: row[23],
                            bg: row[24],
                            el: row[25],
                            sl: row[26],
                            sk: row[27],
                            ro: row[28],
                            hu: row[29],
                            et: row[30],
                            br: row[31],
                            isReject: _this.isTrue(row[32]),
                            group: _this._stringToArray(row[33]),
                            isPhotoAnnotation: _this.isTrue(row[34])
                        };
                        if (row[0]) {
                            translation._id = row[0];
                        }
                        translations.push(translation);
                    }
                }));
                return translations;
            };
        /**
         * @param {?} data
         * @param {?} progress
         * @param {?} cd
         * @return {?}
         */
        Mapping.prototype.convertLocations = /**
         * @param {?} data
         * @param {?} progress
         * @param {?} cd
         * @return {?}
         */
            function (data, progress, cd) {
                var _this = this;
                //: Observable<Array<Location>>
                data.shift();
                progress.total = data.length;
                /** @type {?} */
                var typeNames = [];
                data.forEach(( /**
                 * @param {?} row
                 * @return {?}
                 */function (row) {
                    if (typeNames.indexOf(row[2]) < 0) {
                        typeNames.push(row[2]);
                    }
                }));
                return this.broker.getAll('locationtypes', null, null, null, [[{ field: 'name', operator: { _id: 'inq' }, value: typeNames }]]).pipe(operators.map(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) { return res.data; })), operators.mergeMap(( /**
                 * @param {?} types
                 * @return {?}
                 */function (types) {
                    /** @type {?} */
                    var obs = [];
                    data.forEach(( /**
                     * @param {?} row
                     * @param {?} index
                     * @return {?}
                     */function (row, index) {
                        if (row[0] && row[1]) {
                            /** @type {?} */
                            var location_1 = new dataCore.Location();
                            location_1.title = row[0];
                            location_1.address = row[1];
                            location_1.placesearch = row[4] ? row[4] : location_1.title; // + ' ' + location.address;
                            location_1.contactname = row[5];
                            location_1.contactemail = row[6];
                            location_1.contactphone = row[7];
                            location_1.info = row[8];
                            location_1.tags = _this._stringToArray(row[9]);
                            location_1.notificationemail = row[10];
                            location_1.clientid = row[11];
                            if (row[12]) {
                                location_1._id = row[12];
                            }
                            else {
                                location_1._id = 'mapping_' + index;
                            }
                            if (row[13]) {
                                location_1.vip = _this.isTrue(row[13]);
                            }
                            location_1.type = types.find(( /**
                             * @param {?} t
                             * @return {?}
                             */function (t) { return t.name === row[2]; }));
                            if (row[14]) {
                                location_1.missiondescriptionsRef = _this._stringToArray(row[14]);
                            }
                            if (!row[3]) {
                                /** @type {?} */
                                var o = _this.googlemaps.resolveAddressLocation(location_1.address, _this.translate.getCurrentLanguage(), location_1.placesearch).pipe(operators.map(( /**
                                 * @param {?} value
                                 * @return {?}
                                 */function (value) {
                                    if (value && value.coords) {
                                        location_1.status = value.source;
                                        location_1._geoloc = [value.coords.lng, value.coords.lat];
                                    }
                                    else {
                                        location_1.status = 'error';
                                    }
                                    progress.count += 1;
                                    cd.markForCheck();
                                    return location_1;
                                })));
                                obs.push(o);
                            }
                            else {
                                location_1._geoloc = JSON.parse(row[3]);
                                location_1.status = 'file';
                                progress.count += 1;
                                cd.markForCheck();
                                obs.push(rxjs.of(location_1));
                            }
                        }
                    }));
                    return rxjs.forkJoin(obs);
                })));
            };
        /**
         * @param {?} data
         * @param {?} formDynamicBuilder
         * @return {?}
         */
        Mapping.prototype.convertFormAndConditions = /**
         * @param {?} data
         * @param {?} formDynamicBuilder
         * @return {?}
         */
            function (data, formDynamicBuilder) {
                var _this = this;
                /** @type {?} */
                var convertError = [];
                /** @type {?} */
                var slides = ( /** @type {?} */([]));
                /** @type {?} */
                var conditions = [];
                /** @type {?} */
                var fieldsDef = this.removeEmptyRows(data[0]);
                /** @type {?} */
                var conditionsDef = data.length >= 2 ? this.removeEmptyRows(data[1]) : [];
                fieldsDef.shift();
                conditionsDef.shift();
                /** @type {?} */
                var currentSlide = ( /** @type {?} */({}));
                /** @type {?} */
                var fields = new Map();
                /** @type {?} */
                var conditionedFields = new Map();
                fieldsDef.forEach(( /**
                 * @param {?} row
                 * @return {?}
                 */function (row) {
                    if (row[1] && currentSlide.title !== row[1]) {
                        currentSlide = ( /** @type {?} */({ title: row[1], description: row[2], items: [] }));
                        slides.push(currentSlide);
                    }
                    if (currentSlide) {
                        if (row[5]) {
                            /** @type {?} */
                            var f = _this.createField(row, formDynamicBuilder);
                            if (row[28]) {
                                /** @type {?} */
                                var conditionsTitles = _this._stringToArray(row[28]);
                                if (conditionsTitles.length > 0) {
                                    /** @type {?} */
                                    var cara = {
                                        conditions: conditionsTitles,
                                        slideId: slides.length - 1
                                    };
                                    conditionedFields.set(f.name, cara);
                                }
                            }
                            currentSlide.items.push(f);
                            fields.set(row[0], f);
                        }
                    }
                }));
                conditionsDef.forEach(( /**
                 * @param {?} condition
                 * @return {?}
                 */function (condition) {
                    /** @type {?} */
                    var c = _this.createCondition(condition, fields);
                    if (_this.conditionsService.isValid(c)) {
                        conditions.push(c);
                    }
                    else {
                        convertError.push('CONVERTCONDITIONERROR : ' + condition[0]);
                    }
                }));
                conditionedFields.forEach(( /**
                 * @param {?} value
                 * @param {?} key
                 * @return {?}
                 */function (value, key) {
                    /** @type {?} */
                    var i = lodashEs.findIndex(slides[value.slideId].items, ( /**
                     * @param {?} f
                     * @return {?}
                     */function (f) { return f.name === key; }));
                    if (i >= 0) {
                        slides[value.slideId].items[i].condition = [];
                        value.conditions.forEach(( /**
                         * @param {?} title
                         * @return {?}
                         */function (title) {
                            /** @type {?} */
                            var cond = lodashEs.find(conditions, ( /**
                             * @param {?} c
                             * @return {?}
                             */function (c) { return c.title === title; }));
                            if (cond) {
                                (( /** @type {?} */(slides[value.slideId].items[i].condition))).push(cond);
                            }
                        }));
                    }
                }));
                return { slides: slides, conditions: conditions, errors: convertError };
            };
        /**
         * @private
         * @param {?} row
         * @param {?} formDynamicBuilder
         * @return {?}
         */
        Mapping.prototype.createField = /**
         * @private
         * @param {?} row
         * @param {?} formDynamicBuilder
         * @return {?}
         */
            function (row, formDynamicBuilder) {
                /** @type {?} */
                var field = ( /** @type {?} */({
                    name: row[0] || formDynamicBuilder.generateFieldName(),
                    type: ( /** @type {?} */(row[5].toLowerCase())),
                    title: row[3],
                    description: row[4],
                    allowComments: this.isTrue(row[6]),
                    required: this.isTrue(row[7]),
                    values: this._stringToArray(row[8]),
                    allowLibrary: this.isTrue(row[9]),
                    min: row[10],
                    max: row[11],
                    step: row[12],
                    minDate: row[13],
                    maxDate: row[14],
                    hideMobile: this.isTrue(row[15]),
                    allowHistory: this.isTrue(row[16]),
                    showOnLocation: this.isTrue(row[17]),
                    allowAnnotate: this.isTrue(row[18]),
                    showUsers: this.isTrue(row[19]),
                    showService: this.isTrue(row[20]),
                    allowOther: this.isTrue(row[21]),
                    radius: row[22],
                    multiple: this.isTrue(row[23]),
                    clearable: this.isTrue(row[24]),
                    duration: row[25],
                    anwser: this._stringToArray(row[26]),
                    explanation: row[27],
                    allowTime: this.isTrue(row[29])
                }));
                if (row[30] && field.type === 'image') {
                    field.image = { _downloadURL: row[30] };
                }
                if (field.type === 'information') {
                    field.value = field.description;
                    delete field.description;
                }
                return field;
            };
        /**
         * @private
         * @param {?} row
         * @param {?} fields
         * @return {?}
         */
        Mapping.prototype.createCondition = /**
         * @private
         * @param {?} row
         * @param {?} fields
         * @return {?}
         */
            function (row, fields) {
                /** @type {?} */
                var c = ( /** @type {?} */({
                    title: row[0]
                }));
                c.operator = this.conditionsService.convertOperator(row[3]);
                c.type = this.conditionsService.convertType(row[1]);
                if (row[5]) {
                    c._id = row[5];
                }
                if (c.type === 'field') {
                    c.field = this.conditionsService.convertField(fields.get(row[2]));
                    if (!c.field) {
                        return;
                    }
                    if (lodashEs.indexOf(dataCore.SIMPLE_FIELD_TYPES, c.field.type) >= 0) {
                        c.value = row[4];
                    }
                    else {
                        c.values = this._stringToArray(row[4]);
                    }
                }
                else if (c.type === 'tags') {
                    c.tags = this._stringToArray(row[4]);
                }
                else if (c.type === 'groups') {
                    c.group = this._stringToArray(row[4]);
                }
                else {
                    return;
                }
                return c;
            };
        /**
         * @private
         * @param {?} array
         * @return {?}
         */
        Mapping.prototype.removeEmptyRows = /**
         * @private
         * @param {?} array
         * @return {?}
         */
            function (array) {
                return lodashEs.filter(array, ( /**
                 * @param {?} row
                 * @return {?}
                 */function (row) {
                    return lodashEs.filter(row, ( /**
                     * @param {?} v
                     * @return {?}
                     */function (v) { return v && !!v.replace(/\s/g, ''); })).length > 0;
                }));
            };
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        Mapping.prototype.isTrue = /**
         * @private
         * @param {?} str
         * @return {?}
         */
            function (str) {
                return str === 'TRUE' || str === 'VRAI' || str === 'true' || str === 'vrai';
            };
        Mapping.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Mapping.ctorParameters = function () {
            return [
                { type: dataCore.Requestor },
                { type: dataCore.Googlemaps },
                { type: dataCore.Broker },
                { type: Conditions },
                { type: dataCore.Config },
                { type: translate.Translate },
                { type: dataCore.Xlsx }
            ];
        };
        return Mapping;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Chart = /** @class */ (function () {
        function Chart(broker, dashboard, rq, translate$$1, localForage, coreConfig, utils, cache) {
            this.broker = broker;
            this.dashboard = dashboard;
            this.rq = rq;
            this.translate = translate$$1;
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
                color: common$1.Colors.black,
                fontWeight: '300',
                fontSize: '13px',
                whiteSpace: 'normal',
                textShadow: false
            };
            this.lineColor = '#E1E8EE';
            this.gridLineColor = '#F4F8FC';
            this.decimalPipe = new common.DecimalPipe(this.translate.getCurrentAngularLocale());
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
                if (chart.aggregateOptions && !lodashEs.isString(chart.aggregateOptions)) {
                    chart.aggregateOptions = ( /** @type {?} */(JSON.stringify(chart.aggregateOptions)));
                }
                if (chart.kpiFormValues && chart.kpiFormValues.campaigns) {
                    chart.kpiFormValues.campaigns = chart.kpiFormValues.campaigns.map(( /**
                     * @param {?} c
                     * @return {?}
                     */function (c) { return lodashEs.pick(c, ['title', '_id', 'scoring']); }));
                }
                if (chart.kpiFormValues && chart.kpiFormValues.missionscores) {
                    if (chart.kpiFormValues.missionscores.selectedDescription) {
                        chart.kpiFormValues.missionscores.selectedDescription = lodashEs.pick(chart.kpiFormValues.missionscores.selectedDescription, ['title', '_id', 'scoring']);
                    }
                    if (chart.kpiFormValues.missionscores.scores) {
                        /** @type {?} */
                        var score = chart.kpiFormValues.missionscores.scores;
                        if (lodashEs.isArray(score) && (( /** @type {?} */(score))).length > 0) {
                            score = score[0];
                        }
                        chart.kpiFormValues.missionscores.scores = lodashEs.pick(score, ['title', 'isActive']);
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
                if (chart.aggregateOptions && lodashEs.isString(chart.aggregateOptions)) {
                    chart.aggregateOptions = ( /** @type {?} */(JSON.parse(( /** @type {?} */(chart.aggregateOptions)))));
                }
                if ((( /** @type {?} */(chart))).aggregateData && lodashEs.isString((( /** @type {?} */(chart))).aggregateData)) {
                    (( /** @type {?} */(chart))).aggregateData = ( /** @type {?} */(JSON.parse((( /** @type {?} */(chart))).aggregateData)));
                }
                if (!chart._id) {
                    chart._id = stencil.getUUID();
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
                var newentity = lodashEs.cloneDeep(entity);
                lodashEs.forEach(newentity.tabs, ( /**
                 * @param {?} tab
                 * @return {?}
                 */function (tab) {
                    if (tab && tab.items) {
                        lodashEs.forEach(tab.items, ( /**
                         * @param {?} item
                         * @return {?}
                         */function (item) {
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
                lodashEs.forEach(entity.tabs, ( /**
                 * @param {?} tab
                 * @return {?}
                 */function (tab) {
                    lodashEs.forEach(tab.items, ( /**
                     * @param {?} item
                     * @return {?}
                     */function (item) {
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
                var newCd = lodashEs.cloneDeep(cd);
                newCd._id = stencil.getUUID();
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
                return this.broker.upsert('dashboards', newEntity).pipe(operators.map(( /**
                 * @param {?} retVal
                 * @return {?}
                 */function (retVal) { return _this.decode(retVal); })));
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
                if (forceRefresh === void 0) {
                    forceRefresh = false;
                }
                if (start === void 0) {
                    start = 0;
                }
                if (showPreviousYear === void 0) {
                    showPreviousYear = false;
                }
                return this.getDataObservable(cd, component, forceRefresh, start, showPreviousYear).pipe(operators.catchError(( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
                    return rxjs.throwError('error');
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
                if (forceRefresh === void 0) {
                    forceRefresh = false;
                }
                return rxjs.from(this.getDataFromCache(cd)).pipe(operators.mergeMap(( /**
                 * @param {?} data
                 * @return {?}
                 */function (data) {
                    return data && forceRefresh !== true ? rxjs.of(data) : _this.broker.aggregateQuery(collectionName, filters, options);
                })), operators.mergeMap(( /**
                 * @param {?} data
                 * @return {?}
                 */function (data) {
                    return rxjs.from(_this.addDataToCache(cd, data));
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
                return this.cache.get(dataCore.CACHE_KEYS.chart, id).toPromise();
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
                return this.cache.add(dataCore.CACHE_KEYS.chart, id, cache);
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
                return this.cache.remove(dataCore.CACHE_KEYS.chart, id);
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
                    return this.getChartCache(cd._id).then(( /**
                     * @param {?} cache
                     * @return {?}
                     */function (cache) {
                        if (cache) {
                            if (stencil.toMinutes(stencil.dateDiff(new Date(), stencil.toDate(cache.date))) < 15) {
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
                        .then(( /**
                 * @param {?} cache
                 * @return {?}
                 */function (cache) {
                        cache = { date: new Date(), data: lodashEs.cloneDeep(data) };
                        return _this.setChartCache(cd._id, cache);
                    }))
                        .then(( /**
                 * @return {?}
                 */function () {
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
                if (forceRefresh === void 0) {
                    forceRefresh = false;
                }
                if (showPreviousYear === void 0) {
                    showPreviousYear = false;
                }
                /** @type {?} */
                var type = this.getKpiClass(cd.kpiType);
                type.getChartDefinition(cd.kpiFormValues, cd, this.translate);
                if (cd && cd.kpiType === 'ChartIOKpi') {
                    return rxjs.of([]);
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
                    return this.getAggregateQuery(cd, aggregate.collectionName, aggregate.filters, aggregate.aggregateOptions, forceRefresh).pipe(operators.mergeMap(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) {
                        return aggregate.mapTransform(res, cd, _this.broker, component);
                    })));
                }
                else {
                    return this.getAggregateQuery(cd, aggregate.collectionName, aggregate.filters, aggregate.aggregateOptions, forceRefresh).pipe(operators.map(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) {
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
                if (forceRefresh === void 0) {
                    forceRefresh = false;
                }
                if (start === void 0) {
                    start = 0;
                }
                if (showPreviousYear === void 0) {
                    showPreviousYear = false;
                }
                this.decodeChart(cd);
                if (cd.data) {
                    return rxjs.of(cd.data);
                }
                else if (cd.kpi) {
                    return this.getKpiData(cd, component, forceRefresh, showPreviousYear);
                }
                else {
                    if (cd.groupByDate) {
                        this.dashboard.setTimescale(cd.filters, cd.timescale, cd.dateField || 'finishedDate', cd.endDate);
                        /** @type {?} */
                        var format = dataCore.BaseKpi.getDateFormat(cd.dateGrouping);
                        if (cd.aggregateOptions && cd.aggregateOptions.length > 0) {
                            return this.getAggregateQuery(cd, cd.collectionName, cd.filters, cd.aggregateOptions, forceRefresh).pipe(operators.map(( /**
                             * @param {?} res
                             * @return {?}
                             */function (res) {
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
                            return this.getAggregateQuery(cd, cd.collectionName, cd.filters, cd.aggregateOptions, forceRefresh).pipe(operators.map(( /**
                             * @param {?} res
                             * @return {?}
                             */function (res) {
                                return cd.mapTransform ? cd.mapTransform(res, cd, _this.broker, component) : res;
                            })));
                        }
                        else {
                            return rxjs.of([]);
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
                config.series.forEach(( /**
                 * @param {?} s
                 * @param {?} i
                 * @return {?}
                 */function (s, i) {
                    if (s.name === 'Regression') {
                        return;
                    }
                    columnDefs.push(( /** @type {?} */({
                        headerName: s.name,
                        field: 'serie' + i,
                        headerTooltip: s.name,
                        minWidth: 40
                    })));
                    if (cd.type === 'scatter') {
                        columnDefs.push(( /** @type {?} */({
                            headerName: s.name,
                            field: 'seriex' + i,
                            headerTooltip: s.name + ': x',
                            minWidth: 40
                        })));
                    }
                    if (cd.showDelta) {
                        lodashEs.last(columnDefs).cellRenderer = 'deltaRenderer'; //DeltaRendererComponent.renderer;
                    }
                    lodashEs.forEach((( /** @type {?} */(s))).data, ( /**
                     * @param {?} d
                     * @param {?} index
                     * @return {?}
                     */function (d, index) {
                        /** @type {?} */
                        var key;
                        /** @type {?} */
                        var value;
                        /** @type {?} */
                        var x;
                        if (lodashEs.isArray(d)) {
                            key = stencil.dateFormat(stencil.toDate(d[0]), 'L');
                            value = d[1];
                        }
                        else if (lodashEs.isObject(d) && d.name) {
                            key = d.name;
                            value = d.y;
                            if (cd.type === 'scatter') {
                                x = d.x;
                            }
                        }
                        else if (lodashEs.isObject(d) && d.x) {
                            key = stencil.dateFormat(stencil.toDate(d.x), 'L');
                            value = d.y;
                        }
                        else if (config.xAxis && (( /** @type {?} */(config.xAxis))).categories && (( /** @type {?} */(config.xAxis))).categories.length > 0) {
                            key = (( /** @type {?} */(config.xAxis))).categories[index];
                            value = d;
                        }
                        if (key) {
                            /** @type {?} */
                            var row = rows.get(key) || { key: key };
                            row['serie' + i] = lodashEs.isNumber(value) ? _this.decimalPipe.transform(value, _this.getNumberFormat(cd)) : value && value.toString ? value.toString() : value;
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
                if (lodashEs.isArray(data)) {
                    value = Math.round(data && data.length > 0 ? (( /** @type {?} */(data)))[0].value : 0);
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
                lodashEs.assign(gridOptions, {
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
                    lodashEs.assign(gridOptions, CellRenderer.getPivotConfig(this.translate));
                    lodashEs.assign(gridOptions, {
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
                    return lodashEs.sortBy(rows, sorts);
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
                if (dates === void 0) {
                    dates = null;
                }
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
                    var currentDate = stencil.toDate(data[0]._id);
                    /** @type {?} */
                    var stopDate = stencil.endOf(stencil.dateAdd(stencil.toDate(data[0]._id), timeScale, timeSpan), timeScale);
                    /** @type {?} */
                    var weekNumber = 0;
                    /** @type {?} */
                    var dayToY = [0, 6, 5, 4, 3, 2, 1];
                    var _loop_1 = function () {
                        /** @type {?} */
                        var stringDate = stencil.dateFormat(stencil.toDate(currentDate), 'YYYY-MM-dd');
                        /** @type {?} */
                        var retVal = {
                            _id: stringDate,
                            x: weekNumber,
                            y: dayToY[stencil.day(stencil.toDate(currentDate))],
                            value: 0,
                            keys: null,
                            date: stringDate
                        };
                        /** @type {?} */
                        var v = lodashEs.find(data, ( /**
                         * @param {?} s
                         * @return {?}
                         */function (s) { return s._id === stringDate; }));
                        if (v) {
                            retVal.keys = v.keys;
                            retVal.value = v.value;
                        }
                        outputData.push(retVal);
                        // Beginning of month
                        if (stencil.getDateOfMonth(stencil.toDate(currentDate)) === 1) {
                            xAxis.push(stencil.dateFormat(stencil.toDate(currentDate), 'MMM'));
                        }
                        // End of month
                        if (stencil.getDateOfMonth(stencil.toDate(currentDate)) === stencil.daysInMonth(stencil.toDate(currentDate))) {
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
                        currentDate = stencil.dateAdd(stencil.toDate(currentDate), 'days', 1);
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
                config.yAxis = ( /** @type {?} */({
                    visible: false,
                    min: 0,
                    max: 6,
                    labels: {
                        fontSize: '13px'
                    }
                }));
                config.xAxis = ( /** @type {?} */({
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
                config.tooltip.formatter = ( /**
                 * @return {?}
                 */function () {
                    return stencil.dateFormat(stencil.toDate((( /** @type {?} */(this.point))).date), 'MMM DD, YYYY dddd') + '<br><br>' + (( /** @type {?} */(this.point))).value + ' users';
                });
                config.series = ( /** @type {?} */([{ data: chartData.data }]));
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
                    color: common$1.Colors.black,
                    fontWeight: '300',
                    fontSize: '13px',
                    whiteSpace: 'normal',
                    textShadow: false
                };
                /** @type {?} */
                var config = this.setHCChartType(cd);
                /** @type {?} */
                var originalData = data;
                if (!lodashEs.isArray(data)) {
                    return;
                }
                if (cd.groupByDate && cd.type !== 'pie') {
                    this.setHCUseDates(config);
                    if (cd.groupByCampaign) {
                        /* beautify ignore:start */
                        /** @type {?} */
                        var series_1 = new Map();
                        /* beautify ignore:end */
                        data.forEach(( /**
                         * @param {?} d
                         * @return {?}
                         */function (d) {
                            /** @type {?} */
                            var s = series_1.get(d._id.title) || { name: d._id.title, data: [] };
                            /** @type {?} */
                            var date = dataCore.BaseKpi.fixDates(cd, d._id.date);
                            s.data.push({ x: date, y: d.value, color: d.color, keys: d.keys });
                            series_1.set(d._id.title, s);
                        }));
                        config.series = Array.from(series_1.values());
                        config.series.forEach(( /**
                         * @param {?} s
                         * @return {?}
                         */function (s) {
                            return (s.data = lodashEs.sortBy(( /** @type {?} */(s.data)), ( /**
                             * @param {?} d
                             * @return {?}
                             */function (d) { return d.x; })));
                        }));
                    }
                    else {
                        config.series = ( /** @type {?} */([
                            {
                                name: cd.title,
                                data: lodashEs.sortBy(data.map(( /**
                                 * @param {?} d
                                 * @return {?}
                                 */function (d) {
                                    /** @type {?} */
                                    var date = dataCore.BaseKpi.fixDates(cd, d._id);
                                    return { x: date, y: d.value, color: d.color, keys: d.keys };
                                })), ( /**
                                 * @param {?} d
                                 * @return {?}
                                 */function (d) { return d.x; }))
                            }
                        ]));
                    }
                }
                else if (cd.type === 'treemap') {
                    if (lodashEs.isArray(data)) {
                        config.series = ( /** @type {?} */([
                            {
                                layoutAlgorithm: 'squarified',
                                data: lodashEs.map(data, ( /**
                                 * @param {?} d
                                 * @return {?}
                                 */function (d) { return ({ name: d._id, value: d.value, colorValue: d.value }); }))
                            }
                        ]));
                    }
                }
                else if (cd.type === 'scatter') {
                    config.series = ( /** @type {?} */([
                        {
                            name: cd.title,
                            data: data
                        }
                    ]));
                    //add option to disable regression
                    if (!cd.hideRegression) {
                        this.addCorelationLine(( /** @type {?} */(data)), config);
                    }
                }
                else {
                    /** @type {?} */
                    var series_2 = new Map();
                    /** @type {?} */
                    var categories_1 = new Set();
                    if (lodashEs.isArray(data) && data.length > 0 && ((( /** @type {?} */(data[0]))).serie || (( /** @type {?} */(data[0]))).serie === 0)) {
                        lodashEs.forEach(data, ( /**
                         * @param {?} d
                         * @return {?}
                         */function (d) {
                            /** @type {?} */
                            var serie = series_2.get(d.serie) || {};
                            serie[d._id] = { y: d.value, keys: d.keys };
                            categories_1.add(d._id);
                            series_2.set(d.serie, serie);
                        }));
                        config.xAxis = Object.assign(config.xAxis || {}, {
                            categories: lodashEs.sortBy(Array.from(categories_1.values()), ( /**
                             * @param {?} x
                             * @return {?}
                             */function (x) { return x; })),
                            crosshair: true
                        });
                    }
                    else {
                        if (lodashEs.isArray(data)) {
                            data = (( /** @type {?} */(data))).reduce(( /**
                             * @param {?} acc
                             * @param {?} memo
                             * @return {?}
                             */function (acc, memo) {
                                acc[memo._id] = { y: memo.value, keys: memo.keys };
                                return acc;
                            }), {});
                        }
                        else {
                            delete (( /** @type {?} */(data))).value;
                        }
                        config.xAxis = Object.assign(config.xAxis || {}, {
                            categories: lodashEs.map(data, ( /**
                             * @param {?} v
                             * @param {?} l
                             * @return {?}
                             */function (v, l) {
                                return l;
                            })),
                            crosshair: true
                        });
                        series_2.set(cd.title, data);
                    }
                    config.series = [];
                    /** @type {?} */
                    var width_1 = 100 / series_2.size;
                    series_2.forEach(( /**
                     * @param {?} serie
                     * @param {?} name
                     * @return {?}
                     */function (serie, name) {
                        /** @type {?} */
                        var index = config.series.length + 1;
                        //fill in missing data
                        if (config.xAxis && (( /** @type {?} */(config.xAxis))).categories) {
                            (( /** @type {?} */(config.xAxis))).categories.forEach(( /**
                             * @param {?} c
                             * @return {?}
                             */function (c) {
                                if (!serie[c]) {
                                    serie[c] = null;
                                }
                            }));
                        }
                        config.series.push(( /** @type {?} */({
                            name: name,
                            size: (width_1 * 0.7).toString() + '%',
                            center: [(width_1 * index - width_1 / 2).toString() + '%', null],
                            data: cd.type === 'radar'
                                ? lodashEs.map(( /** @type {?} */((( /** @type {?} */(config.xAxis))).categories)), ( /**
                                 * @param {?} c
                                 * @return {?}
                                 */function (c) {
                                    return serie[c];
                                }))
                                : lodashEs.sortBy(lodashEs.map(( /** @type {?} */(serie)), ( /**
                                 * @param {?} v
                                 * @param {?} l
                                 * @return {?}
                                 */function (v, l) {
                                    return lodashEs.assign({ name: l }, v);
                                })), ( /**
                                 * @param {?} d
                                 * @return {?}
                                 */function (d) {
                                    //we have to map to string because the object keys we re getting back are string
                                    return (( /** @type {?} */(config.xAxis))).categories.map(( /**
                                     * @param {?} x
                                     * @return {?}
                                     */function (x) { return x.toString(); })).indexOf(d.name);
                                }))
                        })));
                    }));
                }
                config.series.forEach(( /**
                 * @param {?} s
                 * @return {?}
                 */function (s) {
                    originalData.forEach(( /**
                     * @param {?} o
                     * @return {?}
                     */function (o) {
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
                            lodashEs.keys(cd.colors).forEach(( /**
                             * @param {?} k
                             * @return {?}
                             */function (k) {
                                if (s.name && s.name.toString() === k.toString()) {
                                    s.color = cd.colors[k];
                                }
                            }));
                        }
                        if (lodashEs.isArray(s.data)) {
                            (( /** @type {?} */(s.data))).forEach(( /**
                             * @param {?} d
                             * @param {?} i
                             * @return {?}
                             */function (d, i) {
                                if (d && (d.name === o.serie || (!o.serie && d.name === o._id)) && !d.color) {
                                    d.color = o.color;
                                    d.index = d.index || 0;
                                    d.index = -o.index;
                                    d.legendIndex = o.index;
                                }
                                if (cd.colors) {
                                    lodashEs.keys(cd.colors).forEach(( /**
                                     * @param {?} k
                                     * @return {?}
                                     */function (k) {
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
                            (( /** @type {?} */(s.data)))[i].y += (( /** @type {?} */(s.data[i - 1]))).y || 0;
                        }
                    }
                    if (s.name && s.name.indexOf('N-1') >= 0) {
                        s.color = common$1.Colors.stable;
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
                if (!config.series || (config.series.length === 1 && (!(( /** @type {?} */(config.series[0]))).data || (( /** @type {?} */(config.series[0]))).data.length === 0))) {
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
                    switch (( /** @type {?} */(config.chart.type))) {
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
                return this.rq.postMultiPart(exportUrl, config).pipe(operators.mergeMap(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    /** @type {?} */
                    var url = exportUrl + res;
                    return _this.rq.getBinaryContent(url);
                })), operators.mergeMap(( /**
                 * @param {?} arrayBuffer
                 * @return {?}
                 */function (arrayBuffer) {
                    /** @type {?} */
                    var blob = new Blob([arrayBuffer], { type: type });
                    return rxjs.from(_this.broker.upload(blob));
                })), operators.map(( /**
                 * @param {?} url
                 * @return {?}
                 */function (url) {
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
                if (pdfRowWidth === void 0) {
                    pdfRowWidth = 1200;
                }
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
                if (pdfRowWidth === void 0) {
                    pdfRowWidth = 1200;
                }
                /** @type {?} */
                var svg = this.formatSVGs(svgs, maxHeight);
                options = lodashEs.merge({
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
                    .subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
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
                return this.rq.post(url, { dashboardId: dashboardId, env: env || {} }).pipe(operators.map(( /**
                 * @param {?} retVal
                 * @return {?}
                 */function (retVal) {
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
                return this.rq.post(url, { path: dashboardId }).pipe(operators.map(( /**
                 * @param {?} retVal
                 * @return {?}
                 */function (retVal) {
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
                    config.series.forEach(( /**
                     * @param {?} s
                     * @param {?} i
                     * @return {?}
                     */function (s, i) {
                        var _a = __read(palette_1[i].match(/\w\w/g).map(( /**
                         * @param {?} x
                         * @return {?}
                         */function (x) { return parseInt(x, 16); })), 3), r = _a[0], g = _a[1], b = _a[2];
                        s.fillColor = "rgba(" + r + "," + g + "," + b + "," + alpha_1 + ")";
                        s.dataLabels = s.dataLabels || {};
                        s.dataLabels.color = common$1.Colors.black;
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
                    var subtitleSum = lodashEs.sumBy((( /** @type {?} */(config.series[0]))).data, ( /**
                     * @param {?} d
                     * @return {?}
                     */function (d) { return d[1]; }));
                    if (subtitleSum) {
                        config.subtitle = {
                            text: subtitleSum.toLocaleString(),
                            style: lodashEs.defaultsDeep({ fontSize: '18px', fontWeight: 300, color: common$1.Colors.black }, this.textStyle),
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
                    lodashEs.forEach(config.series, ( /**
                     * @param {?} s
                     * @return {?}
                     */function (s) {
                        if (s && s.name === false) {
                            s.visible = false;
                        }
                        if (lodashEs.isArray(s.data)) {
                            (( /** @type {?} */(s.data))).forEach(( /**
                             * @param {?} d
                             * @param {?} i
                             * @return {?}
                             */function (d, i) {
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
                var sx = lodashEs.sum(data.map(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) { return d.x; })));
                /** @type {?} */
                var sy = lodashEs.sum(data.map(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) { return d.y; })));
                /** @type {?} */
                var sxy = lodashEs.sum(data.map(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) { return d.x * d.y; })));
                /** @type {?} */
                var sx2 = lodashEs.sum(data.map(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) { return d.x * d.x; })));
                /** @type {?} */
                var a = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
                /** @type {?} */
                var b = (sy - a * sx) / n;
                /** @type {?} */
                var minx = lodashEs.min(data.map(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) { return d.x; })));
                /** @type {?} */
                var maxx = lodashEs.max(data.map(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) { return d.x; })));
                config.series.push(( /** @type {?} */({
                    type: 'line',
                    name: 'Regression',
                    color: common$1.Colors.black,
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
                        config = lodashEs.merge(config, this.getHCDefaultLine(cd));
                        break;
                    case 'spline':
                        config = lodashEs.merge(config, this.getHCDefaultSpline(cd));
                        break;
                    case 'area':
                        config = lodashEs.merge(config, this.getHCDefaultArea(cd));
                        break;
                    case 'areaspline':
                        config = lodashEs.merge(config, this.getHCDefaultAreaSpline(cd));
                        break;
                    case 'bar':
                        config = lodashEs.merge(config, this.getHCDefaultBar(cd));
                        break;
                    case 'column':
                        config = lodashEs.merge(config, this.getHCDefaultColumn(cd));
                        break;
                    case 'heatmap':
                        config = lodashEs.merge(config, this.getHCDefaultHeatmap(cd));
                        break;
                    case 'doughnut':
                        config = lodashEs.merge(config, this.getHCDefaultDoughnut(cd));
                        break;
                    case 'pie':
                        config = lodashEs.merge(config, this.getHCDefaultPie(cd));
                        break;
                    case 'radar':
                        config = lodashEs.merge(config, this.getHCDefaultRadar(cd));
                        break;
                    case 'treemap':
                        config = lodashEs.merge(config, this.getHCDefaultTreemap(cd));
                        break;
                    case 'scatter':
                        config = lodashEs.merge(config, this.getHCDefaultScatter(cd));
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
                if (cd.showLabelsY === false && config.yAxis && (( /** @type {?} */(config.yAxis))).labels) {
                    (( /** @type {?} */(config.yAxis))).labels.enabled = false;
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
                (( /** @type {?} */(config.xAxis))).type = 'datetime';
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
                if (groupBySlider === void 0) {
                    groupBySlider = '';
                }
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
                if (groupBySlider === void 0) {
                    groupBySlider = '';
                }
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
                return ( /** @type {?} */({
                    title: {
                        text: cd.title,
                        style: lodashEs.defaultsDeep({ fontSize: '14px', fontWeight: 400, color: common$1.Colors.black }, this.textStyle),
                        align: 'right'
                    },
                    chart: {
                        style: { fontFamily: 'Lato' },
                        backgroundColor: null,
                        resetZoomButton: {
                            theme: {
                                fill: 'white',
                                stroke: common$1.Colors.black,
                                style: this.textStyle
                            }
                        }
                    },
                    xAxis: cd.type === 'radar'
                        ? { labels: { style: lodashEs.defaultsDeep({ color: common$1.Colors.black }, this.textStyle) } }
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
                                style: lodashEs.defaultsDeep({ color: common$1.Colors.black }, this.textStyle),
                                format: isSalesDatasKpi ? this.getDateTimeFormat(cd.dateGrouping, groupBySlider) : null
                            },
                            max: cd.maxX,
                            tickInterval: isSalesDatasKpi ? this.getDateTimeIntervalByGroupingDate(cd.dateGrouping, groupBySlider) : null
                        },
                    yAxis: cd.type === 'radar'
                        ? { labels: { style: lodashEs.defaultsDeep({ color: common$1.Colors.black }, this.textStyle) } }
                        : {
                            visible: !cd.hideAxis,
                            title: '',
                            lineWidth: cd.hideAxis ? 0 : 1,
                            lineColor: this.lineColor,
                            gridLineWidth: cd.hideAxis ? 0 : 1,
                            gridLineColor: this.gridLineColor,
                            //padding: 0,
                            labels: { style: lodashEs.defaultsDeep({ color: common$1.Colors.black }, this.textStyle) },
                            endOnTick: false,
                            maxPadding: 0.2,
                            max: cd.maxY
                        },
                    colors: this.getPalette(cd),
                    legend: {
                        enabled: false,
                        itemStyle: lodashEs.defaultsDeep({ fontSize: '14px', lineHeight: '14px', fontWeight: 400, color: common$1.Colors.black }, this.textStyle),
                        //ackgroundColor: '#F1F1F1',
                        labelFormatter: ( /**
                         * @return {?}
                         */function () {
                            /** @type {?} */
                            var retVal = '';
                            if (this.yData && this.yData.length > 0) {
                                /** @type {?} */
                                var total = 0;
                                if (cd.showCumulate) {
                                    total = ( /** @type {?} */(lodashEs.max(this.yData)));
                                }
                                else if (!cd.legendValue || cd.legendValue === 'sum') {
                                    total = lodashEs.sum(this.yData);
                                }
                                else if (cd.legendValue === 'avg') {
                                    total = lodashEs.sum(this.yData) / this.yData.length;
                                }
                                else if (cd.legendValue === 'min') {
                                    total = ( /** @type {?} */(lodashEs.min(this.yData)));
                                }
                                else if (cd.legendValue === 'max') {
                                    total = ( /** @type {?} */(lodashEs.max(this.yData)));
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
                        series: ( /** @type {?} */({
                            turboThreshold: 0,
                            groupPadding: 0,
                            pointPadding: cd.pointPadding || (cd.colorByPoint ? 0 : 0.1),
                            stacking: cd.stacked,
                            allowPointSelect: cd.allowPointSelect || false,
                            marker: {
                                enabled: true,
                                states: { select: { fillColor: common$1.Colors.success } }
                            },
                            states: { select: { color: common$1.Colors.success } },
                            animation: !this.coreConfig.isWeb(),
                            dataLabels: {
                                color: common$1.Colors.black
                            }
                        }))
                    },
                    credits: { enabled: false },
                    exporting: { enabled: false },
                    tooltip: {
                        followTouchMove: false,
                        style: lodashEs.defaultsDeep({}, this.textStyle),
                        backgroundColor: common$1.Colors.stable,
                        borderRadius: 0,
                        shadow: false,
                        borderColor: this.lineColor,
                        useHTML: false,
                        formatter: ( /**
                         * @return {?}
                         */function () {
                            /** @type {?} */
                            var name = (this.series ? this.series.name : '') || '';
                            if (name && name !== ' ') {
                                name += '<br/>';
                            }
                            /** @type {?} */
                            var t = name + (this.x ? (cd.groupByDate ? stencil.dateFormat(stencil.toDate(this.x), 'L') : this.x) + ': ' : this.key + ': ' || '') + chartService.decimalPipe.transform(this.y, chartService.getNumberFormat(cd));
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
                return ( /**
                 * @return {?}
                 */function () {
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
                        if (cd.showDelta && this.series && lodashEs.isArray(this.series.data)) {
                            /** @type {?} */
                            var index = lodashEs.findIndex(this.series.data, ( /**
                             * @param {?} point
                             * @return {?}
                             */function (point) { return point.x === _this.x; }));
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
                    style: lodashEs.defaultsDeep({ color: common$1.Colors.black, textOutline: 'none' }, this.textStyle),
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
                            marker: ( /** @type {?} */({
                                enabled: true,
                                fillOpacity: 0.5,
                                fillColor: common$1.Colors.light,
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
                                style: lodashEs.defaultsDeep({}, this.textStyle),
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
                return lodashEs.defaultsDeep({
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
                    yAxis: ( /** @type {?} */({ gridLineInterpolation: 'polygon', labels: { enabled: false }, lineWidth: 0 })),
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
                        minColor: common$1.Colors.light,
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
                        series: { marker: ( /** @type {?} */({ enabled: true, fillOpacity: 0.5 })) }
                    }
                };
            };
        Chart.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Chart.ctorParameters = function () {
            return [
                { type: dataCore.Broker },
                { type: dataCore.DashboardCore },
                { type: dataCore.Requestor },
                { type: translate.Translate },
                { type: common$1.LocalForageService },
                { type: common$1.CoreConfig },
                { type: common$1.Utils },
                { type: dataCore.Cache }
            ];
        };
        return Chart;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var conditions = {
        isAllowInventory: 'allowInventory == 1'
    };
    var CustomModel = /** @class */ (function (_super) {
        __extends(CustomModel, _super);
        function CustomModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            dataCore.Editable('CustomModel', { type: stencil.FormFieldType.text, visible: false }),
            __metadata("design:type", String)
        ], CustomModel.prototype, "_id", void 0);
        __decorate([
            dataCore.Editable('CustomModel', { required: true, type: stencil.FormFieldType.text }),
            dataCore.Searchable('CustomModel'),
            __metadata("design:type", String)
        ], CustomModel.prototype, "title", void 0);
        __decorate([
            dataCore.Editable('CustomModel', { required: true, type: stencil.FormFieldType.text }),
            dataCore.Searchable('CustomModel'),
            __metadata("design:type", String)
        ], CustomModel.prototype, "name", void 0);
        __decorate([
            dataCore.Editable('CustomModel', { required: false, type: stencil.FormFieldType.textarea }),
            dataCore.Searchable('CustomModel'),
            __metadata("design:type", String)
        ], CustomModel.prototype, "shortDescription", void 0);
        __decorate([
            dataCore.Editable('CustomModel', {
                required: true,
                flex: 100,
                type: stencil.FormFieldType.autocomplete,
                collectionName: 'groups',
                filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
                hiddenFields: ['isRole', 'type'],
                idOnly: true,
                mapTransform: dataCore.getGroupsTransform,
                multiple: true,
                clearable: false
            }),
            __metadata("design:type", Array)
        ], CustomModel.prototype, "group", void 0);
        __decorate([
            dataCore.Editable('CustomModel', {
                type: stencil.FormFieldType.checkbox,
                flex: 100,
                title: 'INVENTORY',
                columnDefinition: { width: 80 }
            }),
            __metadata("design:type", Boolean)
        ], CustomModel.prototype, "allowInventory", void 0);
        __decorate([
            dataCore.Editable('CustomModel', {
                type: stencil.FormFieldType.autocomplete,
                required: true,
                condition: conditions.isAllowInventory,
                filters: dataCore.FORM_FILES_IMAGE_FILTER,
                forceModal: true,
                hiddenFields: ['mimeType'],
                mode: 'tile',
                pageSize: 20,
                fixedPosition: true,
                maxWidth: 750,
                maxHeight: 240,
                crop: 'square',
                collectionName: 'files',
                title: 'BACKGROUND',
                columnDefinition: { name: '_downloadURL' },
                filterable: false,
                sortable: false
            }),
            __metadata("design:type", Object)
        ], CustomModel.prototype, "background", void 0);
        CustomModel = __decorate([
            dataCore.Model({
                className: 'CustomModel',
                collectionName: 'custommodels',
                fields: ['*']
            })
        ], CustomModel);
        return CustomModel;
    }(stencil.ICustomModel));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CustomModels = /** @class */ (function () {
        function CustomModels(config, rq, broker, network) {
            this.config = config;
            this.rq = rq;
            this.broker = broker;
            this.network = network;
        }
        /**
         * @param {?} name
         * @param {?} customModel
         * @return {?}
         */
        CustomModels.prototype.registerModel = /**
         * @param {?} name
         * @param {?} customModel
         * @return {?}
         */
            function (name, customModel) {
                var _this = this;
                /** @type {?} */
                var properties = customModel.fields.map(( /**
                 * @param {?} field
                 * @return {?}
                 */function (field) {
                    /** @type {?} */
                    var retVal = {};
                    retVal[field.name] = {
                        type: 'string'
                    };
                    return retVal;
                }));
                properties.unshift({
                    _id: ( /** @type {?} */({
                        type: 'string',
                        id: true,
                        generated: true
                    }))
                });
                customModel.properties = properties;
                customModel.permissions = 'private';
                return this.broker.upsert('custommodels', customModel).pipe(operators.map(( /**
                 * @return {?}
                 */function () {
                    _this.registerModelForClient(customModel);
                })));
            };
        /**
         * @param {?} customModel
         * @return {?}
         */
        CustomModels.prototype.registerModelForClient = /**
         * @param {?} customModel
         * @return {?}
         */
            function (customModel) {
                dataCore.Models.clearCollectionName(customModel.name);
                dataCore.Models.setCollectionName(customModel.name, customModel.name, ['*'], [], null, customModel.feathersService, CustomModel, true);
                if (customModel.fields) {
                    customModel.fields.forEach(( /**
                     * @param {?} field
                     * @return {?}
                     */function (field) {
                        if (field) {
                            dataCore.Models.addFormField(customModel.name, field);
                            if (field.searchable) {
                                dataCore.Models.addSearchableField(customModel.name, field.name);
                            }
                        }
                    }));
                }
                if (customModel.appearance) {
                    for (var key in customModel.appearance) {
                        if (customModel.appearance.hasOwnProperty(key)) {
                            dataCore.Models.addAppearance(customModel.name, key, customModel.appearance[key]);
                        }
                    }
                }
            };
        /**
         * @return {?}
         */
        CustomModels.prototype.registerModelsForClient = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.network.isOffline()) {
                    this.broker.getAll('custommodels', null, null, null, null, null, null, 10000).subscribe(( /**
                     * @param {?} ret
                     * @return {?}
                     */function (ret) {
                        if (ret.data) {
                            _this.customModels = ret.data;
                            ret.data.forEach(( /**
                             * @param {?} customModel
                             * @return {?}
                             */function (customModel) {
                                _this.registerModelForClient(customModel);
                            }));
                        }
                    }));
                }
                else if (this.customModels) {
                    this.customModels.forEach(( /**
                     * @param {?} customModel
                     * @return {?}
                     */function (customModel) {
                        _this.registerModelForClient(customModel);
                    }));
                }
            };
        CustomModels.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CustomModels.ctorParameters = function () {
            return [
                { type: dataCore.Config },
                { type: dataCore.Requestor },
                { type: dataCore.Broker },
                { type: common$1.Network }
            ];
        };
        __decorate([
            common$1.Persistent('custommodels.offline', false, null, true),
            __metadata("design:type", Array)
        ], CustomModels.prototype, "customModels", void 0);
        return CustomModels;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PROVIDERS = [CellRenderer, Conditions, FormDynamicBuilder, Mapping, Chart, CustomModels];
    var DataFormModule = /** @class */ (function () {
        function DataFormModule() {
        }
        /**
         * @param {?=} configuredProviders
         * @return {?}
         */
        DataFormModule.forRoot = /**
         * @param {?=} configuredProviders
         * @return {?}
         */
            function (configuredProviders) {
                if (configuredProviders === void 0) {
                    configuredProviders = [];
                }
                return {
                    ngModule: DataFormModule,
                    providers: __spread(PROVIDERS, configuredProviders)
                };
            };
        DataFormModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [],
                        entryComponents: [],
                        imports: [forms.FormsModule, forms.ReactiveFormsModule, dataCore.DataCoreModule, translate.TranslateModule, common$1.CommonModule],
                        exports: [forms.FormsModule, forms.ReactiveFormsModule, dataCore.DataCoreModule, translate.TranslateModule, common$1.CommonModule]
                    },] }
        ];
        return DataFormModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CustomFormField = /** @class */ (function (_super) {
        __extends(CustomFormField, _super);
        function CustomFormField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            dataCore.Editable('CustomFormField', { type: stencil.FormFieldType.text, required: true }),
            __metadata("design:type", String)
        ], CustomFormField.prototype, "title", void 0);
        __decorate([
            dataCore.Editable('CustomFormField', { type: stencil.FormFieldType.textarea }),
            __metadata("design:type", String)
        ], CustomFormField.prototype, "description", void 0);
        __decorate([
            dataCore.Editable('CustomFormField', {
                type: stencil.FormFieldType.autocomplete,
                multiple: true,
                required: true,
                idAttributeName: 'name',
                displayType: 'formfield'
            }),
            __metadata("design:type", Array)
        ], CustomFormField.prototype, "fields", void 0);
        __decorate([
            dataCore.Editable('CustomFormField', {
                title: 'GROUPS',
                type: stencil.FormFieldType.autocomplete,
                collectionName: 'groups',
                filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
                hiddenFields: ['isRole', 'type'],
                idOnly: true,
                mapTransform: dataCore.getGroupsTransform,
                multiple: true,
                clearable: false,
                required: true,
                allowCustomTag: true,
                tag: false
            }),
            __metadata("design:type", String)
        ], CustomFormField.prototype, "group", void 0);
        CustomFormField = __decorate([
            dataCore.Model({
                className: 'CustomFormField',
                collectionName: 'customFormFields',
                fields: ['*'],
                include: []
            })
        ], CustomFormField);
        return CustomFormField;
    }(dataCore.Entity));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var conditions$1 = {
        isNotInformation: 'type!="information"',
        isNotInformationOrTask: 'type!="information" and type!="task"',
        isNotInformationOrDocumentOrImage: 'type!="information" and type!="image" and type!="document"',
        isInformation: 'type=="information"',
        isVideoplayer: 'type=="videoplayer"',
        isAutocomplete: 'type=="autocomplete"',
        isCatalog: 'type=="catalog"',
        isImage: 'type=="image"',
        isDocument: 'type=="document"',
        isPhoto: 'type=="photo" or type=="multiphotos"',
        isMultiPhotos: 'type=="multiphotos"',
        isImageRecognition: 'isImageRecognition==1',
        hasAllowLibrary: 'type=="photo" or type=="video" or type=="multiphotos" or type=="todo"',
        isPhotoOrVideo: 'type=="photo" or type=="video" or type=="multiphotos"',
        isEmailReport: 'type=="emailreport"',
        isSelect: 'type=="select"',
        isSelectImage: 'type=="selectimage"',
        isAdress: 'type=="address"',
        isNumber: 'type=="number"',
        isDate: 'type=="date"',
        isTodo: 'type=="todo"',
        isNumberOrRange: 'type=="number" or type=="range" or type=="knob"',
        isNumberOrRangeOrStarrating: 'type=="number" or type=="range" or type=="starrating"or type=="knob"',
        isStarRating: 'type=="starrating"',
        isAudioOrVideo: 'type=="audio" or type=="video"',
        isConnect: 'type == "connect"',
        isGame: 'type == "game"',
        isFormula: 'type=="formula"',
        hasValues: 'type=="todo" or type=="photo" or type=="multiphotos" or type=="ranking" or type=="select" or type=="selectmulti" or type=="selectbuttons" or type=="selectchat" or type=="selectbuttonsmulti" or type=="autocomplete" or type=="emailreport" or type=="selectimage" or type=="missingword" or type=="swipeselect" or type=="game"',
        missionIsQuizz: ( /** @type {?} */({ type: 'missionDescriptionAttribute', key: 'quizz', value: true })),
        hasSentence: 'type=="missingword" or type=="swipeselect" or type=="selectchat"',
        hasMultiple: 'type=="autocomplete" or type=="selectchat" or type=="selectimage" ',
        isReadOnly: 'readonly == 1'
    };
    // export function setConnectAnswerHandler(value, controls, data, form, requestor, dialog, viewContainerRef, changeDetectorRef) {
    //   dialog
    //     .upsert(
    //       {},
    //       '',
    //       viewContainerRef,
    //       null,
    //       [
    //         {
    //           name: 'connectAnswer',
    //           title: 'CONNECT',
    //           type: FormFieldType.connect,
    //           connectMode: data.connectMode,
    //           leftValues: data.leftValues,
    //           rightValues: data.rightValues
    //         }
    //       ],
    //       null,
    //       null,
    //       null,
    //       null,
    //       null,
    //       null,
    //       null,
    //       null,
    //       null,
    //       null,
    //       null,
    //       false,
    //       null
    //     )
    //     .then(retVal => {
    //       if (retVal) {
    //         data.answer = flatMap(retVal['connectAnswer']);
    //         changeDetectorRef.markForCheck();
    //       }
    //     });
    // }
    var FormField = /** @class */ (function (_super) {
        __extends(FormField, _super);
        function FormField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            dataCore.Editable('FormField', { type: stencil.FormFieldType.text, visible: false }),
            __metadata("design:type", String)
        ], FormField.prototype, "name", void 0);
        __decorate([
            dataCore.Editable('FormField', { type: stencil.FormFieldType.text, required: true }),
            __metadata("design:type", String)
        ], FormField.prototype, "title", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'INSTRUCTIONS',
                type: stencil.FormFieldType.textarea,
                condition: conditions$1.isNotInformation,
                language: 'html'
            }),
            __metadata("design:type", String)
        ], FormField.prototype, "description", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'VALUE',
                required: true,
                type: stencil.FormFieldType.textarea,
                condition: conditions$1.isInformation,
                language: 'html'
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "value", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'URL',
                required: true,
                type: stencil.FormFieldType.text,
                condition: conditions$1.isVideoplayer
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "url", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'SENTENCE',
                type: stencil.FormFieldType.textarea,
                condition: conditions$1.hasSentence
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "sentence", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'FORMULA',
                type: stencil.FormFieldType.textarea,
                condition: conditions$1.isFormula
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "formula", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                required: true,
                values: lodashEs.map(stencil.MOBILE_FORM_FIELDS_ALL, 'type'),
                translate: true
            }),
            __metadata("design:type", String)
        ], FormField.prototype, "type", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'GAME',
                type: stencil.FormFieldType.autocomplete,
                values: ['runner-game', 'memory-card-game'],
                translate: true,
                condition: conditions$1.isGame,
                required: true
            }),
            __metadata("design:type", String)
        ], FormField.prototype, "game", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                required: true,
                collectionName: 'catalogs',
                idOnly: true,
                condition: conditions$1.isCatalog
            }),
            __metadata("design:type", String)
        ], FormField.prototype, "catalog", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.checkbox,
                condition: [conditions$1.isCatalog, 'presence != 1'],
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "inventory", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.checkbox,
                condition: [conditions$1.isCatalog, 'inventory != 1'],
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "presence", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'CUSTOMMODEL',
                type: stencil.FormFieldType.autocomplete,
                collectionName: 'custommodels',
                idAttributeName: 'name',
                idOnly: true,
                condition: conditions$1.isAutocomplete,
                advanced: true
            }),
            __metadata("design:type", String)
        ], FormField.prototype, "collectionName", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.toggle,
                condition: conditions$1.isAutocomplete,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "filterByLocation", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                tag: true,
                multiple: true,
                allowCustomTag: true,
                condition: conditions$1.hasValues
            }),
            __metadata("design:type", Array)
        ], FormField.prototype, "values", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'MODE',
                type: stencil.FormFieldType.autocomplete,
                values: ['dragndrop', 'drawing'],
                translate: true,
                condition: conditions$1.isConnect,
                required: true
            }),
            __metadata("design:type", String)
        ], FormField.prototype, "connectMode", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                tag: true,
                multiple: true,
                allowCustomTag: true,
                condition: conditions$1.isConnect
            }),
            __metadata("design:type", Array)
        ], FormField.prototype, "leftValues", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                tag: true,
                multiple: true,
                allowCustomTag: true,
                condition: conditions$1.isConnect
            }),
            __metadata("design:type", Array)
        ], FormField.prototype, "rightValues", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                tag: true,
                multiple: true,
                allowCustomTag: true,
                condition: conditions$1.isGame
            }),
            __metadata("design:type", Array)
        ], FormField.prototype, "correctValues", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                tag: true,
                multiple: true,
                allowCustomTag: true,
                condition: conditions$1.isGame
            }),
            __metadata("design:type", Array)
        ], FormField.prototype, "wrongValues", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                collectionName: 'user',
                multiple: true,
                required: false,
                tag: true,
                condition: [conditions$1.isTodo],
                advanced: true
            }),
            __metadata("design:type", Array)
        ], FormField.prototype, "userTags", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'IMAGE',
                type: stencil.FormFieldType.autocomplete,
                filters: dataCore.FORM_FILES_IMAGE_FILTER,
                forceModal: true,
                hiddenFields: ['mimeType'],
                mode: 'tile',
                pageSize: 20,
                fixedPosition: true,
                collectionName: 'files',
                condition: conditions$1.isImage,
                columnDefinition: { name: '_filename' }
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "image", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'IMAGE',
                type: stencil.FormFieldType.autocomplete,
                multiple: true,
                filters: dataCore.FORM_FILES_IMAGE_FILTER,
                forceModal: true,
                hiddenFields: ['mimeType'],
                mode: 'tile',
                pageSize: 20,
                fixedPosition: true,
                collectionName: 'files',
                condition: conditions$1.isSelectImage,
                columnDefinition: { name: '_filename' }
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "images", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'DOCUMENT',
                type: stencil.FormFieldType.autocomplete,
                collectionName: 'files',
                condition: conditions$1.isDocument,
                columnDefinition: { name: '_filename' }
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "document", void 0);
        __decorate([
            dataCore.Editable('FormField', { type: stencil.FormFieldType.checkbox, condition: conditions$1.hasMultiple }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "multiple", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'BUTTONS',
                type: stencil.FormFieldType.checkbox,
                condition: conditions$1.isStarRating
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "useButtons", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'MODE',
                type: stencil.FormFieldType.autocomplete,
                values: ['youtube', 'url'],
                translate: true,
                condition: conditions$1.isVideoplayer,
                required: true
            }),
            __metadata("design:type", String)
        ], FormField.prototype, "mode", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                visible: false,
                type: stencil.FormFieldType.autocomplete,
                tag: true,
                multiple: true,
                allowCustomTag: true,
                condition: conditions$1.missionIsQuizz,
                dynamicValues: 'values'
            }),
            __metadata("design:type", Array)
        ], FormField.prototype, "answer", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                visible: false,
                type: stencil.FormFieldType.textarea,
                condition: conditions$1.missionIsQuizz
            }),
            __metadata("design:type", String)
        ], FormField.prototype, "explanation", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'EXPLANATIONDOCUMENT',
                type: stencil.FormFieldType.autocomplete,
                collectionName: 'files',
                condition: conditions$1.missionIsQuizz,
                columnDefinition: { name: '_filename' }
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "explanationDocument", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.number,
                condition: [conditions$1.isMultiPhotos],
                flex: 50,
                externalValidators: [{ externalFieldName: 'maxPhotos', rule: 'lower' }]
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "minPhotos", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.number,
                condition: [conditions$1.isMultiPhotos],
                flex: 50,
                required: true,
                externalValidators: [{ externalFieldName: 'minPhotos', rule: 'higher' }]
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "maxPhotos", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'MANDATORY',
                type: stencil.FormFieldType.checkbox,
                condition: conditions$1.isNotInformationOrDocumentOrImage,
                flex: 50
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "required", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'ALLOWCOMMENTS',
                type: stencil.FormFieldType.checkbox,
                condition: conditions$1.isNotInformation,
                flex: 50
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "allowComments", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'AUTORELOAD',
                type: stencil.FormFieldType.checkbox,
                condition: conditions$1.isNotInformation,
                flex: 50
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "autoreload", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'ALLOWTASK',
                type: stencil.FormFieldType.checkbox,
                condition: [conditions$1.isNotInformationOrTask, dataCore.ROLES_CONDITIONS.hasTodo],
                flex: 50
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "allowTask", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'SHARETOFEED',
                type: stencil.FormFieldType.checkbox,
                flex: 50,
                condition: [conditions$1.isPhoto]
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "shareToFeed", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'ALLPHOTOSREQUIRED',
                type: stencil.FormFieldType.checkbox,
                flex: 100,
                condition: [conditions$1.isTodo]
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "allPhotosRequired", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.checkbox,
                condition: conditions$1.isAutocomplete,
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "clearable", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'ALLOWTIME',
                type: stencil.FormFieldType.checkbox,
                condition: [conditions$1.isNotInformation],
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "allowTime", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'ALLOWLIBRARY',
                type: stencil.FormFieldType.checkbox,
                condition: conditions$1.hasAllowLibrary,
                flex: 100
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "allowLibrary", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'GEOLOC',
                type: stencil.FormFieldType.checkbox,
                condition: conditions$1.isPhotoOrVideo,
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "saveGeoloc", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'ALLOWHISTORY',
                type: stencil.FormFieldType.checkbox,
                condition: [dataCore.ROLES_CONDITIONS.hasTodoOrScore],
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "allowHistory", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'ALLOWOPENDETAILS',
                type: stencil.FormFieldType.checkbox,
                flex: 100,
                condition: conditions$1.isSelectImage,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "allowOpenDetails", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'LINKTOPREVIOUSQUESTION',
                type: stencil.FormFieldType.checkbox,
                flex: 100,
                condition: [conditions$1.isTodo],
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "linked", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'ALLOWANNOTATE',
                type: stencil.FormFieldType.checkbox,
                condition: [conditions$1.isPhoto],
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "allowAnnotate", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'SHOWUSERSEMAIL',
                type: stencil.FormFieldType.checkbox,
                condition: conditions$1.isEmailReport,
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "showUsers", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'HIDEMOBILE',
                type: stencil.FormFieldType.checkbox,
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "hideMobile", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'OTHER1',
                type: stencil.FormFieldType.checkbox,
                condition: conditions$1.isSelect,
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "allowOther", void 0);
        __decorate([
            dataCore.Editable('FormField', { type: stencil.FormFieldType.checkbox, flex: 100, advanced: true }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "readonly", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'RADIUS',
                type: stencil.FormFieldType.number,
                condition: conditions$1.isAdress,
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "radius", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'MIN',
                type: stencil.FormFieldType.number,
                condition: conditions$1.isNumberOrRange,
                flex: 100,
                advanced: false,
                externalValidators: [{ externalFieldName: 'max', rule: 'lower' }]
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "min", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'MAX',
                type: stencil.FormFieldType.number,
                condition: conditions$1.isNumberOrRangeOrStarrating,
                flex: 100,
                advanced: false,
                externalValidators: [{ externalFieldName: 'min', rule: 'higher' }]
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "max", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'STEP',
                type: stencil.FormFieldType.number,
                condition: conditions$1.isNumber,
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "step", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'MIN',
                type: stencil.FormFieldType.date,
                condition: conditions$1.isDate,
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Date)
        ], FormField.prototype, "minDate", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'MAX',
                type: stencil.FormFieldType.date,
                condition: conditions$1.isDate,
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Date)
        ], FormField.prototype, "maxDate", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'SHOWSERVICE',
                type: stencil.FormFieldType.checkbox,
                flex: 100,
                condition: dataCore.ROLES_CONDITIONS.hasService,
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "showService", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.number,
                condition: [conditions$1.isPhoto],
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "maxWidth", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.number,
                condition: [conditions$1.isPhoto],
                flex: 100,
                advanced: true
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "maxHeight", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.toggle,
                condition: [conditions$1.isPhoto, dataCore.ROLES_CONDITIONS.isAdmin],
                flex: 100,
                title: 'PHOTOLIVECOUNTER',
                advanced: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "isImageRecognition", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.toggle,
                condition: [conditions$1.isImageRecognition, dataCore.ROLES_CONDITIONS.isAdmin],
                flex: 100,
                title: 'BACKGROUNDPROCESS',
                advanced: true,
                translate: true
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "isBackgroundProcess", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'DONTSAVEIFHIDDEN',
                type: stencil.FormFieldType.checkbox,
                flex: 100,
                advanced: true,
                condition: conditions$1.isReadOnly
            }),
            __metadata("design:type", Boolean)
        ], FormField.prototype, "dontSaveIfHidden", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                required: true,
                collectionName: 'algorithm',
                condition: conditions$1.isImageRecognition,
                flex: 100,
                title: 'ALGORITHM',
                advanced: true
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "imageRecognitionAlgorithm", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.json,
                title: 'DISPLAY',
                condition: conditions$1.isImageRecognition,
                filterable: false,
                sortable: false,
                suppressExport: true,
                advanced: true
            }),
            __metadata("design:type", Object)
        ], FormField.prototype, "imageRecognitionDisplay", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'DURATIONMAX',
                type: stencil.FormFieldType.number,
                condition: conditions$1.isAudioOrVideo,
                flex: 100,
                max: 60
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "duration", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                type: stencil.FormFieldType.autocomplete,
                multiple: true,
                clearable: true,
                advanced: true
            }),
            __metadata("design:type", Array)
        ], FormField.prototype, "condition", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'FLEX',
                type: stencil.FormFieldType.number,
                flex: 100,
                min: 0,
                max: 100,
                advanced: true
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "flex", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'LEGEND',
                type: stencil.FormFieldType.textarea,
                condition: conditions$1.isNotInformation,
                advanced: true
            }),
            __metadata("design:type", String)
        ], FormField.prototype, "caption", void 0);
        __decorate([
            dataCore.Editable('FormField', {
                title: 'REPORTORDER',
                type: stencil.FormFieldType.number,
                condition: [dataCore.ROLES_CONDITIONS.hasTodoOrScore],
                flex: 100,
                min: 0,
                advanced: true
            }),
            __metadata("design:type", Number)
        ], FormField.prototype, "reportOrder", void 0);
        // export function setConnectAnswerHandler(value, controls, data, form, requestor, dialog, viewContainerRef, changeDetectorRef) {
        //   dialog
        //     .upsert(
        //       {},
        //       '',
        //       viewContainerRef,
        //       null,
        //       [
        //         {
        //           name: 'connectAnswer',
        //           title: 'CONNECT',
        //           type: FormFieldType.connect,
        //           connectMode: data.connectMode,
        //           leftValues: data.leftValues,
        //           rightValues: data.rightValues
        //         }
        //       ],
        //       null,
        //       null,
        //       null,
        //       null,
        //       null,
        //       null,
        //       null,
        //       null,
        //       null,
        //       null,
        //       null,
        //       false,
        //       null
        //     )
        //     .then(retVal => {
        //       if (retVal) {
        //         data.answer = flatMap(retVal['connectAnswer']);
        //         changeDetectorRef.markForCheck();
        //       }
        //     });
        // }
        FormField = __decorate([
            dataCore.Model({ className: 'FormField' })
        ], FormField);
        return FormField;
    }(dataCore.Entity));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GridState = /** @class */ (function (_super) {
        __extends(GridState, _super);
        function GridState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            dataCore.Editable('GridState', { required: true, type: stencil.FormFieldType.text }),
            dataCore.Searchable('GridState'),
            __metadata("design:type", String)
        ], GridState.prototype, "title", void 0);
        __decorate([
            dataCore.Editable('GridState', { required: true, title: 'DESCRIPTION', type: stencil.FormFieldType.textarea }),
            dataCore.Searchable('GridState'),
            __metadata("design:type", String)
        ], GridState.prototype, "description", void 0);
        __decorate([
            dataCore.Editable('GridState', {
                title: 'GROUPS',
                type: stencil.FormFieldType.autocomplete,
                collectionName: 'groups',
                filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
                hiddenFields: ['isRole', 'type'],
                idOnly: true,
                mapTransform: dataCore.getGroupsTransform,
                multiple: true
            }),
            __metadata("design:type", Object)
        ], GridState.prototype, "group", void 0);
        GridState = __decorate([
            dataCore.Model({
                className: 'GridState',
                collectionName: 'gridstate',
                fields: ['*'],
                include: []
            })
        ], GridState);
        return GridState;
    }(dataCore.Entity));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.DataFormModule = DataFormModule;
    exports.CustomFormField = CustomFormField;
    exports.FormField = FormField;
    exports.GridState = GridState;
    exports.CustomModel = CustomModel;
    exports.CellRenderer = CellRenderer;
    exports.Chart = Chart;
    exports.FormDynamicBuilder = FormDynamicBuilder;
    exports.Conditions = Conditions;
    exports.Mapping = Mapping;
    exports.CustomModels = CustomModels;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data-form.umd.js.map
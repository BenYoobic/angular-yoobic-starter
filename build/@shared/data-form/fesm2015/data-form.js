import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Translate, TranslateModule } from '@shared/translate';
import { of, forkJoin, timer, from, throwError } from 'rxjs';
import { Injectable, NgModule } from '@angular/core';
import { Colors, CoreConfig, LocalForageService, Utils, Network, Persistent, CommonModule } from '@shared/common';
import { mergeMap, map, concatMap, catchError, filter as filter$1, take } from 'rxjs/operators';
import { cloneDeep, concat, isEqual, omit, isArray, isObject, forEach, filter, sortBy, isNumber, isBoolean, find, findIndex, indexOf, trimEnd, trimStart, get, assign, defaultsDeep, isString, keys, last, map as map$1, max, merge, min, sum, sumBy, pick } from 'lodash-es';
import { __decorate, __metadata } from 'tslib';
import { Models, CONDITION_TYPES, CONDITION_ALL_OPERATORS, SIMPLE_FIELD_TYPES, WITH_VALUES_FIELD_TYPES, Location, Xlsx, Config, Broker, Requestor, Googlemaps, DashboardCore, BaseKpi, CACHE_KEYS, Cache, Model, Searchable, Editable, getGroupsTransform, FORM_FILES_IMAGE_FILTER, DataCoreModule, Entity, ROLES_CONDITIONS } from '@shared/data-core';
import { FormFieldType, getUUID, isPresent, answerIsValid, toDate, dateFormat, dateDiff, toMinutes, dateAdd, endOf, day, daysInMonth, getDateOfMonth, ICustomModel, MOBILE_FORM_FIELDS_ALL } from '@shared/stencil';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CellRenderer {
    /**
     * @param {?} key
     * @return {?}
     */
    static getColor(key) {
        /**
         * @param {?} color
         * @return {?}
         */
        function isSameColor(color) {
            return color.name === key;
        }
        return this.colors.find(isSameColor);
    }
    /**
     * @param {?} field
     * @param {?} translate
     * @param {?=} visibleFields
     * @param {?=} sortModel
     * @param {?=} component
     * @return {?}
     */
    static getColumnDefinition(field, translate, visibleFields, sortModel, component) {
        /** @type {?} */
        let fieldName = Models.getFieldName(field);
        /** @type {?} */
        let col = (/** @type {?} */ ({
            headerName: Models.getFieldTitle(field, translate),
            headerTooltip: Models.getFieldTitle(field, translate),
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
            ((/** @type {?} */ (col))).type = field.type;
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
            col.headerName = translate.get(col.headerName);
        }
        if (Models.isBooleanField(field)) {
            col.cellRenderer = 'booleanRenderer';
        }
        else if (Models.isVideoField(field)) {
            col.cellRenderer = 'videoRenderer'; //VideoRendererComponent;
            // col.onCellClicked = (params) => {
            //     let url = DefaultRendererComponent.renderer(params);
            //     if (url && component && component.onVideoSelect) {
            //         component.onVideoSelect(url);
            //     }
            // };
        }
        else if (Models.isPhotoField(field)) {
            col.cellRenderer = 'photoRenderer';
            // col.onCellClicked = (params) => {
            //     let photo = Models.getPhotoFromParams(params);
            //     if (photo && component && component.onPhotoSelect) {
            //         component.onPhotoSelect(photo);
            //     }
            // };
        }
        else if (Models.isMultiPhotosField(field)) {
            col.cellRenderer = 'multiphotoRenderer';
            // col.onCellClicked = (params) => {
            //     let photos = Models.getPhotosFromParams(params);
            //     if (photos && photos.length > 0 && component && component.onPhotoSelect) {
            //         component.onPhotoSelect(photos[0]);
            //     }
            // };
        }
        else if (((/** @type {?} */ (field))).isDistanceField === true) {
            col.cellRenderer = 'distanceRenderer';
            col.sortable = false;
            col.comparator = 'distanceComparator';
        }
        else if (field.type === FormFieldType.number) {
            col.cellRenderer = 'numberRenderer';
        }
        else if (field.type === FormFieldType.date) {
            col.cellRenderer = 'dateRenderer';
        }
        else if (Models.isDateTimeField(field)) {
            col.cellRenderer = 'dateTimeRenderer';
        }
        else if (field.type === FormFieldType.time) {
            col.cellRenderer = 'timeRenderer';
        }
        else if (field.type === FormFieldType.address) {
            col.cellRenderer = 'addressRenderer';
        }
        else if (field.type === FormFieldType.location) {
            col.cellRenderer = 'locationRenderer';
        }
        else if (field.type === FormFieldType.starrating) {
            col.cellRenderer = 'starratingRenderer';
            col.cellRendererParams = { max: field.max };
        }
        else if (field.type === FormFieldType.todo) {
            col.cellRenderer = 'todoRenderer';
        }
        else if (field.type === FormFieldType.timer) {
            col.cellRenderer = 'timerRenderer';
        }
        else if (field.type === FormFieldType.checklist) {
            col.cellRenderer = 'checklistRenderer';
        }
        else if (field.type === FormFieldType.autocomplete && field.collectionName && Models.getModelByCollectionName(field.collectionName) && Models.getModelByCollectionName(field.collectionName).isCustom) {
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
    }
    /**
     * @return {?}
     */
    static getColumnTypes() {
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
    }
    /**
     * @param {?} multiple
     * @param {?} rowModelType
     * @param {?} infiniteScrolling
     * @param {?} pageSize
     * @param {?} translate
     * @return {?}
     */
    static getConfig(multiple, rowModelType, infiniteScrolling, pageSize, translate) {
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
            localeText: CellRenderer.getTranslation(translate),
            //suppressContextMenu: true,
            columnTypes: CellRenderer.getColumnTypes()
        };
    }
    /**
     * @param {?} translate
     * @return {?}
     */
    static getPivotConfig(translate) {
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
                headerName: translate.get('GROUP'),
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
            localeText: CellRenderer.getTranslation(translate),
            groupUseEntireRow: false,
            groupRowInnerRenderer: 'progressRenderer'
        };
    }
    /**
     * @param {?} translate
     * @return {?}
     */
    static getTranslation(translate) {
        return {
            next: '<i class="yo-right"></i>',
            previous: '<i class="yo-left"></i>',
            page: ' ',
            of: '/',
            more: translate.get('AGGRIDMORE'),
            to: ' - ',
            loadingOoo: translate.get('AGGRIDLOADINGOOO'),
            selectAll: translate.get('AGGRIDSELECTALL'),
            searchOoo: translate.get('AGGRIDSEARCHOOO'),
            blanks: translate.get('AGGRIDBLANKS'),
            filterOoo: translate.get('AGGRIDFILTEROOO'),
            applyFilter: translate.get('AGGRIDAPPLYFILTER'),
            equals: translate.get('AGGRIDEQUALS'),
            lessThan: translate.get('AGGRIDLESSTHAN'),
            greaterThan: translate.get('AGGRIDGREATERTHAN'),
            contains: translate.get('AGGRIDCONTAINS'),
            startsWith: translate.get('AGGRIDSTARTSWITH'),
            endsWith: translate.get('AGGRIDENDSWITH'),
            group: translate.get('AGGRIDGROUP'),
            columns: translate.get('AGGRIDCOLUMNS'),
            rowGroupColumns: translate.get('AGGRIDROWGROUPCOLUMNS'),
            rowGroupColumnsEmptyMessage: translate.get('AGGRIDROWGROUPCOLUMNSEMPTYMESSAGE'),
            valueColumns: translate.get('AGGRIDVALUECOLUMNS'),
            pivotMode: translate.get('AGGRIDPIVOTMODE'),
            groups: translate.get('AGGRIDGROUPS'),
            values: translate.get('AGGRIDVALUES'),
            pivots: translate.get('AGGRIDPIVOTS'),
            valueColumnsEmptyMessage: translate.get('AGGRIDVALUECOLUMNSEMPTYMESSAGE'),
            pivotColumnsEmptyMessage: translate.get('AGGRIDPIVOTCOLUMNSEMPTYMESSAGE'),
            noRowsToShow: translate.get('AGGRIDNOROWSTOSHOW'),
            pinColumn: translate.get('AGGRIDPINCOLUMN'),
            valueAggregation: translate.get('AGGRIDVALUEAGGREGATION'),
            autosizeThiscolumn: translate.get('AGGRIDAUTOSIZETHISCOLUMN'),
            autosizeAllColumns: translate.get('AGGRIDAUTOSIZEALLCOLUMNS'),
            groupBy: translate.get('AGGRIDGROUPBY'),
            ungroupBy: translate.get('AGGRIDUNGROUPBY'),
            resetColumns: translate.get('AGGRIDRESETCOLUMNS'),
            expandAll: translate.get('AGGRIDEXPANDALL'),
            collapseAll: translate.get('AGGRIDCOLLAPSEALL'),
            toolPanel: translate.get('AGGRIDTOOLPANEL'),
            pinLeft: translate.get('AGGRIDPINLEFT'),
            pinRight: translate.get('AGGRIDPINRIGHT'),
            noPin: translate.get('AGGRIDNOPIN'),
            sum: translate.get('AGGRIDSUM'),
            min: translate.get('AGGRIDMIN'),
            max: translate.get('AGGRIDMAX'),
            none: translate.get('AGGRIDNONE'),
            count: translate.get('AGGRIDCOUNT'),
            average: translate.get('AGGRIDAVERAGE'),
            avg: translate.get('AGGRIDAVERAGE'),
            copy: translate.get('AGGRIDCOPY'),
            ctrlC: translate.get('AGGRIDCTRLC'),
            paste: translate.get('AGGRIDPASTE'),
            ctrlV: translate.get('AGGRIDCTRLV')
        };
    }
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
    static createColumnDefs(collectionName, translate, campaignFields, customColumnDefs, includeDistance, infiniteScrolling, itemButtons, colMinWidth, visibleFields, sortModel, grid, hiddenColumns) {
        /** @type {?} */
        let columnDefs = [];
        if (customColumnDefs && customColumnDefs.length > 0) {
            columnDefs = cloneDeep(customColumnDefs);
        }
        else {
            if (!collectionName) {
                return;
            } // || (items && items.length > 0)
            // || (items && items.length > 0)
            /** @type {?} */
            let formFields = [];
            /** @type {?} */
            let model = Models.getModelByCollectionName(collectionName);
            if (model) {
                formFields = model.formFields;
                if (campaignFields && campaignFields.length > 0) {
                    campaignFields = cloneDeep(campaignFields);
                    campaignFields.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => (c.name += '.value')));
                    formFields = concat(formFields, campaignFields);
                }
            }
            columnDefs = [];
            formFields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            field => {
                /** @type {?} */
                let colEdit;
                /** @type {?} */
                let col = CellRenderer.getColumnDefinition(field, translate, visibleFields, sortModel, grid);
                if (colMinWidth > 0 && col.minWidth === 40) {
                    col.minWidth = colMinWidth;
                }
                col.menuTabs = [];
                if (field.type === FormFieldType.catalog) {
                    col.cellRenderer = 'catalogRenderer';
                    col.isCheck = field.check;
                    col.isPresence = field.presence;
                    col.isInventory = field.inventory;
                }
                if (field.type === FormFieldType.multiphotos) {
                    col.suppressExport = true;
                }
                //if (col.hide !== true) {
                if (!hiddenColumns || hiddenColumns.indexOf(col.field) < 0) {
                    columnDefs.push(col);
                }
                if (field.isImageRecognition && field.type === FormFieldType.photo) {
                    colEdit = cloneDeep(col);
                    colEdit.hide = true;
                    colEdit.headerName += ' - Markup';
                    colEdit.forceExport = true;
                    colEdit.field = colEdit.field.replace('.value', '.edit');
                    columnDefs.push(colEdit);
                }
                if (field.type === FormFieldType.multiphotos) {
                    for (let i = 0; i < field.maxPhotos; i++) {
                        /** @type {?} */
                        let colPhoto = cloneDeep(col);
                        colPhoto.hide = true;
                        colPhoto.suppressExport = false;
                        colPhoto.headerName += ' ' + i;
                        colPhoto.forceExport = true;
                        colPhoto.field = colPhoto.field.replace('.value', '.value[' + i + ']');
                        columnDefs.push(colPhoto);
                        if (field.isImageRecognition) {
                            colEdit = cloneDeep(col);
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
            let distanceField = {
                name: 'distance',
                title: 'Distance',
                type: FormFieldType.number,
                columnDefinition: { width: 150 },
                isDistanceField: true
            };
            /** @type {?} */
            let distanceCol = CellRenderer.getColumnDefinition(distanceField, translate);
            columnDefs.push(distanceCol);
        }
        if (infiniteScrolling === true) {
            columnDefs.unshift({
                headerName: '#',
                width: 50,
                cellRenderer: (/**
                 * @param {?} params
                 * @return {?}
                 */
                params => params.node.id + 1)
            });
        }
        if (itemButtons && itemButtons.length > 0) {
            itemButtons.forEach((/**
             * @param {?} button
             * @return {?}
             */
            button => {
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
                    onCellClicked: (/**
                     * @param {?} params
                     * @return {?}
                     */
                    params => {
                        button.handler(params.data && params.data.toJS ? params.data.toJS() : params.data);
                        return false;
                    })
                });
            }));
        }
        return columnDefs;
    }
}
CellRenderer.colors = [
    { name: 'finished', value: Colors.black, class: 'black', index: 0, textValue: Colors.light },
    { name: 'booked', value: Colors.warning, class: 'warning', index: 1, textValue: Colors.black },
    { name: 'available', value: Colors.stable, class: 'stable', index: 2, textValue: Colors.black },
    { name: 'visited', value: Colors.black, class: 'black', index: 3, textValue: Colors.light },
    {
        name: 'notvisited',
        value: Colors.stable,
        class: 'stable',
        index: 4,
        textValue: Colors.black
    },
    {
        name: 'analyzed',
        value: Colors.success,
        class: 'success',
        index: 5,
        textValue: Colors.black
    },
    {
        name: 'validated',
        value: Colors.success,
        class: 'success',
        index: 6,
        textValue: Colors.black
    },
    {
        name: 'tobevalidated',
        value: Colors.stable,
        class: 'stable',
        index: 7,
        textValue: Colors.light
    },
    { name: 'rejected', value: Colors.danger, class: 'danger', index: 8, textValue: Colors.light },
    { name: 'progress', value: Colors.stable, class: 'stable', index: 9, textValue: Colors.black },
    {
        name: 'validationprogress',
        value: Colors.stable,
        class: 'stable',
        index: 10,
        textValue: Colors.black
    },
    {
        name: 'conformityprogress',
        value: Colors.stable,
        class: 'stable',
        index: 11,
        textValue: Colors.black
    },
    {
        name: 'conformityrelativeprogress',
        value: Colors.stable,
        class: 'stable',
        index: 12,
        textValue: Colors.black
    },
    {
        name: 'ontime',
        value: Colors.success,
        class: 'success',
        index: 13,
        textValue: Colors.success
    },
    { name: 'late', value: Colors.danger, class: 'danger', index: 14, textValue: Colors.danger },
    {
        name: 'satisfactory',
        value: Colors.success,
        class: 'success',
        index: 15,
        textValue: Colors.success
    },
    {
        name: 'unsatisfactory',
        value: Colors.danger,
        class: 'danger',
        index: 16,
        textValue: Colors.danger
    },
    {
        name: 'nonapplicable',
        value: Colors.black,
        class: 'black',
        index: 17,
        textValue: Colors.light
    }
];
CellRenderer.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Conditions {
    constructor() { }
    /**
     * @return {?}
     */
    generateConditionId() {
        return getUUID();
    }
    /**
     * @param {?} op
     * @return {?}
     */
    convertOperator(op) {
        if (!op) {
            return 'in';
        }
        /** @type {?} */
        let retVal;
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
    }
    /**
     * @param {?} type
     * @return {?}
     */
    convertType(type) {
        if (!type) {
            return;
        }
        /** @type {?} */
        let retVal;
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
    }
    /**
     * @param {?} f
     * @return {?}
     */
    convertField(f) {
        if (!f) {
            return;
        }
        /** @type {?} */
        let res = { name: f.name, title: f.title, type: f.type };
        if (f.values) {
            res['values'] = f.values;
        }
        return res;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    isValid(c) {
        if (!c) {
            return false;
        }
        /** @type {?} */
        let isTitleValid = c.title && !!c.title.replace(/\s/g, '');
        /** @type {?} */
        let isOpValid = c.operator && CONDITION_ALL_OPERATORS.indexOf(c.operator) >= 0;
        /** @type {?} */
        let isTypeValid = c.type && CONDITION_TYPES.indexOf(c.type) >= 0;
        /** @type {?} */
        let isFieldValid = c.type === 'field' && c.field;
        /** @type {?} */
        let isTagsValid = c.type === 'tags' && c.tags && isArray(c.tags) && c.tags.length > 0;
        /** @type {?} */
        let isGroupValid = c.type === 'groups' && c.group && isArray(c.group) && c.group.length > 0;
        /** @type {?} */
        let isValueValid = c.type === 'field' && isFieldValid && SIMPLE_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.value;
        /** @type {?} */
        let areValuesValid = c.type === 'field' && isFieldValid && WITH_VALUES_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.values && isArray(c.values) && c.values.length > 0;
        return isTitleValid && isOpValid && isTypeValid && (isGroupValid || isTagsValid || (isFieldValid && (isValueValid || areValuesValid)));
    }
    /**
     * @param {?} c1
     * @param {?} c2
     * @return {?}
     */
    areEqual(c1, c2) {
        if (c1._id && c2._id) {
            return c1._id === c2._id;
        }
        else if (!c1._id && !c2._id) {
            return isEqual(c1, c2);
        }
        else if (c1._id && !c2._id) {
            return isEqual(c2, omit(c1, '_id'));
        }
        else if (!c1._id && c2._id) {
            return isEqual(c1, omit(c2, '_id'));
        }
    }
}
Conditions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Conditions.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormDynamicBuilder {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        //private builder: FormBuilder, private session: Session,, private coreConfig: CoreConfig, private log: Log, private injector: Injector
    }
    /**
     * @return {?}
     */
    generateFieldName() {
        return getUUID();
    }
    /**
     * @param {?} value
     * @param {?} answer
     * @param {?} field
     * @return {?}
     */
    answerIsValid(value, answer, field) {
        return answerIsValid(value, answer, field);
    }
    /**
     * @param {?} missiondescription
     * @return {?}
     */
    hasScoring(missiondescription) {
        if (missiondescription && missiondescription.scoring && missiondescription.scoring.length > 0) {
            // && _some(missiondescription.scoring, (score: any) => score.isActive)) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} mission
     * @param {?} data
     * @return {?}
     */
    calculateScoring(mission, data) {
        if (mission.description.scoring.length > 1) {
            mission.extraScores = {};
        }
        forEach(mission.description.scoring, (/**
         * @param {?} scoring
         * @return {?}
         */
        (scoring) => {
            //let scoring = _find(mission.description.scoring, (s: any) => s.isActive);
            /** @type {?} */
            let scoreValue = scoring.initialValue || 0;
            /** @type {?} */
            let scorePercentageBasis = scoring.percentageBasis || 0;
            forEach(data, (/**
             * @param {?} value
             * @param {?} key
             * @return {?}
             */
            (value, key) => {
                if (value && isArray(value.value)) {
                    forEach(value.value, (/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => {
                        if (v && isNumber(scoring[key + this.encodeScoringValue(v)])) {
                            /** @type {?} */
                            let numValue = scoring[key + this.encodeScoringValue(v)];
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
                    if (value && isNumber(scoring[key + this.encodeScoringValue(value.value)])) {
                        /** @type {?} */
                        let numValue = scoring[key + this.encodeScoringValue(value.value)];
                        if (numValue < 0 && -numValue % 1337 === 0) {
                            scorePercentageBasis -= -numValue / 1337;
                        }
                        else {
                            scoreValue += numValue;
                        }
                    }
                    else if (value && isNumber(value.value) && isNumber(scoring[key])) {
                        scoreValue += value.value * scoring[key];
                    }
                    else if (isBoolean(value.value) && scoring[key + 'value']) {
                        //not sure why we have the 'value' in the form creator
                        if (value.value && isNumber(scoring[key + 'value'].value)) {
                            scoreValue += scoring[key + 'value'].value;
                        }
                        else if (!value.value && isNumber(scoring[key + 'value'].novalue)) {
                            scoreValue += scoring[key + 'value'].novalue;
                        }
                    }
                }
                if (value && isPresent(value.value) && scoring[key + 'value'] && isNumber(scoring[key + 'value'].visible)) {
                    scorePercentageBasis += scoring[key + 'value'].visible;
                }
            }));
            if (scoring.isPercentage && scorePercentageBasis > 0) {
                scoreValue = Math.round((scoreValue * 100) / scorePercentageBasis);
            }
            /** @type {?} */
            let score = { value: scoreValue, isPercentage: scoring.isPercentage, title: scoring.title };
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
    }
    /**
     * @param {?} mission
     * @param {?} slides
     * @param {?} data
     * @return {?}
     */
    calculateScoringQuizz(mission, slides, data) {
        /** @type {?} */
        let score = { total: 0, value: 0 };
        /** @type {?} */
        let fields = Models.getFieldsFromSlides(slides);
        forEach(fields, (/**
         * @param {?} field
         * @return {?}
         */
        field => {
            if (field.answer && field.answer.length > 0) {
                score.total += 1;
            }
            if (data[field.name] && this.answerIsValid(data[field.name].value, field.answer, field)) {
                score.value += 1;
            }
        }));
        mission.score = score;
    }
    /**
     * @param {?} formDefinition
     * @return {?}
     */
    hasTabs(formDefinition) {
        return formDefinition.some((/**
         * @param {?} f
         * @return {?}
         */
        f => f.tab && f.tab.length > 0));
    }
    /**
     * @param {?} formDefinition
     * @return {?}
     */
    getSlides(formDefinition) {
        /** @type {?} */
        let map$$1 = new Map();
        map$$1.set('GENERAL', (/** @type {?} */ ({ title: this.translate.get('GENERAL'), items: [], order: 0 })));
        formDefinition.forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => {
            /** @type {?} */
            let tabName = this.getTabName(f);
            if (!f.tab) {
                map$$1.get('GENERAL').items.push(f);
            }
            else if (map$$1.has(tabName)) {
                map$$1.get(tabName).items.push(f);
                if (f.tabCondition) {
                    map$$1.get(tabName).condition = (/** @type {?} */ (f.tabCondition));
                }
            }
            else {
                map$$1.set(tabName, (/** @type {?} */ ({ title: tabName, items: [f], condition: f.tabCondition })));
            }
        }));
        return filter(sortBy(Array.from(map$$1.values()), (/**
         * @param {?} slide
         * @return {?}
         */
        slide => slide.title)), (/**
         * @param {?} slide
         * @return {?}
         */
        slide => slide.items.length > 0));
    }
    /**
     * @param {?} data
     * @param {?} fields
     * @return {?}
     */
    updateDataFieldType(data, fields) {
        data.nonapplicableCount = 0;
        data.satisfactoryCount = 0;
        data.unsatisfactoryCount = 0;
        forEach(fields, (/**
         * @param {?} field
         * @return {?}
         */
        field => {
            if (isObject(data[field.name])) {
                data[field.name].fieldType = field.type;
                data[field.name].fieldTitle = field.title;
                if (data[field.name] && data[field.name].value && field.type === FormFieldType.photo && field.values && (!data[field.name].tags || data[field.name].tags.length < 1)) {
                    data[field.name].tags = field.values;
                }
                else if (data[field.name] && data[field.name].value && field.type === FormFieldType.multiphotos && field.values) {
                    data[field.name].extraData = data[field.name].extraData || {};
                    data[field.name].value.forEach((/**
                     * @param {?} v
                     * @param {?} i
                     * @return {?}
                     */
                    (v, i) => {
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
                    data[field.name].fieldValidity = this.answerIsValid(data[field.name].value, field.answer, field);
                }
                if (field.explanation) {
                    data[field.name].explanation = field.explanation;
                }
                if (field.valuesType) {
                    /** @type {?} */
                    let value = data[field.name].value;
                    /** @type {?} */
                    let type = field.valuesType.find((/**
                     * @param {?} t
                     * @return {?}
                     */
                    t => t.key === value));
                    if (type) {
                        data[field.name].valueType = type.value;
                    }
                }
                if (field.valuesType && data[field.name] && data[field.name].value) {
                    /** @type {?} */
                    let values = [].concat(data[field.name].value);
                    values.forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    key => {
                        /** @type {?} */
                        let type = field.valuesType.find((/**
                         * @param {?} t
                         * @return {?}
                         */
                        t => t.key === key));
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
    }
    /**
     * @param {?} field
     * @return {?}
     */
    getTabName(field) {
        /** @type {?} */
        let retVal = '';
        if (field.tabIndex) {
            retVal += field.tabIndex + '. ';
        }
        if (field.tab) {
            retVal += this.translate.get(field.tab);
        }
        return retVal;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    encodeScoringValue(v) {
        if (v && v.toString) {
            return v.toString().replace(/\./, '_');
        }
        else {
            return v;
        }
    }
}
FormDynamicBuilder.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FormDynamicBuilder.ctorParameters = () => [
    { type: Translate }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Mapping {
    /**
     * @param {?} rq
     * @param {?} googlemaps
     * @param {?} broker
     * @param {?} conditionsService
     * @param {?} config
     * @param {?} translate
     * @param {?} xlsx
     */
    constructor(rq, googlemaps, broker, conditionsService, config, translate, xlsx) {
        this.rq = rq;
        this.googlemaps = googlemaps;
        this.broker = broker;
        this.conditionsService = conditionsService;
        this.config = config;
        this.translate = translate;
        this.xlsx = xlsx;
        this._stringToArray = (/**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            let array = str ? trimEnd(trimStart(str, '['), ']').split(',') : [];
            for (let i = 0; i < array.length; i++) {
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
    getTotal(mapping) {
        if (mapping.document) {
            return this.xlsx.read(mapping.document).then((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                return data.length - 1;
            }));
        }
        else {
            return Promise.resolve(0);
        }
    }
    /**
     * @param {?} slides
     * @param {?} conditions
     * @return {?}
     */
    convertMissionForExcelExport(slides, conditions) {
        /** @type {?} */
        let conditionsData = this.convertConditonsForExcelExport(conditions);
        /** @type {?} */
        let slidesData = this.convertSlidesForExcelExport(slides);
        return [slidesData, conditionsData];
    }
    /**
     * @param {?} slides
     * @return {?}
     */
    convertSlidesForExcelExport(slides) {
        /** @type {?} */
        let columns = [
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
        let data = [];
        //let counter = 1;
        forEach(slides, (/**
         * @param {?} slide
         * @return {?}
         */
        function (slide) {
            forEach(slide.items, (/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
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
                    conditions: field.condition ? field.condition.map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => c.title)) : '',
                    allowTime: field.allowTime,
                    image: field.image
                });
            }));
        }));
        return { columns: columns, data: data, title: 'Slides' };
    }
    /**
     * @param {?} conditions
     * @return {?}
     */
    convertConditonsForExcelExport(conditions) {
        /** @type {?} */
        let columns = [{ name: 'title' }, { name: 'type' }, { name: 'field' }, { name: 'operator' }, { name: 'values' }, { name: 'id' }];
        /** @type {?} */
        let data = [];
        forEach(conditions, (/**
         * @param {?} condition
         * @return {?}
         */
        function (condition) {
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
    }
    /**
     * @param {?} mapping
     * @param {?} collectionName
     * @param {?=} progress
     * @return {?}
     */
    upload(mapping, collectionName, progress) {
        /** @type {?} */
        let publicCollectionName = Models.getPublicCollectionName(collectionName);
        return this.rq
            .postFile(this.config.publicApiUrl + publicCollectionName + '/import', mapping.document)
            .toPromise()
            .then((/**
         * @param {?} ret
         * @return {?}
         */
        ret => {
            if (ret._id) {
                return timer(1000, 500)
                    .pipe(concatMap((/**
                 * @return {?}
                 */
                () => {
                    return this.rq.get(this.config.publicApiUrl + 'jobs/' + ret._id, false, null).pipe(catchError((/**
                     * @return {?}
                     */
                    () => {
                        return of({});
                    })));
                })))
                    .pipe(filter$1((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => {
                    if (progress && s && s.progress) {
                        progress.emit(s.progress * 100);
                    }
                    return s && s.progress === 1;
                })))
                    .pipe(take(1))
                    .toPromise()
                    .then((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => {
                    /** @type {?} */
                    let errors = get(res, 'data.output.errors');
                    return errors || [];
                }));
            }
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    convertTranslations(data) {
        data.shift();
        /** @type {?} */
        let translations = [];
        forEach(data, (/**
         * @param {?} row
         * @param {?} i
         * @return {?}
         */
        (row, i) => {
            if (row[1]) {
                /** @type {?} */
                let translation = {
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
                    isReject: this.isTrue(row[32]),
                    group: this._stringToArray(row[33]),
                    isPhotoAnnotation: this.isTrue(row[34])
                };
                if (row[0]) {
                    translation._id = row[0];
                }
                translations.push(translation);
            }
        }));
        return translations;
    }
    /**
     * @param {?} data
     * @param {?} progress
     * @param {?} cd
     * @return {?}
     */
    convertLocations(data, progress, cd) {
        //: Observable<Array<Location>>
        data.shift();
        progress.total = data.length;
        /** @type {?} */
        let typeNames = [];
        data.forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => {
            if (typeNames.indexOf(row[2]) < 0) {
                typeNames.push(row[2]);
            }
        }));
        return this.broker.getAll('locationtypes', null, null, null, [[{ field: 'name', operator: { _id: 'inq' }, value: typeNames }]]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => res.data)), mergeMap((/**
         * @param {?} types
         * @return {?}
         */
        (types) => {
            /** @type {?} */
            let obs = [];
            data.forEach((/**
             * @param {?} row
             * @param {?} index
             * @return {?}
             */
            (row, index) => {
                if (row[0] && row[1]) {
                    /** @type {?} */
                    let location = new Location();
                    location.title = row[0];
                    location.address = row[1];
                    location.placesearch = row[4] ? row[4] : location.title; // + ' ' + location.address;
                    location.contactname = row[5];
                    location.contactemail = row[6];
                    location.contactphone = row[7];
                    location.info = row[8];
                    location.tags = this._stringToArray(row[9]);
                    location.notificationemail = row[10];
                    location.clientid = row[11];
                    if (row[12]) {
                        location._id = row[12];
                    }
                    else {
                        location._id = 'mapping_' + index;
                    }
                    if (row[13]) {
                        location.vip = this.isTrue(row[13]);
                    }
                    location.type = types.find((/**
                     * @param {?} t
                     * @return {?}
                     */
                    t => t.name === row[2]));
                    if (row[14]) {
                        location.missiondescriptionsRef = this._stringToArray(row[14]);
                    }
                    if (!row[3]) {
                        /** @type {?} */
                        let o = this.googlemaps.resolveAddressLocation(location.address, this.translate.getCurrentLanguage(), location.placesearch).pipe(map((/**
                         * @param {?} value
                         * @return {?}
                         */
                        value => {
                            if (value && value.coords) {
                                location.status = value.source;
                                location._geoloc = [value.coords.lng, value.coords.lat];
                            }
                            else {
                                location.status = 'error';
                            }
                            progress.count += 1;
                            cd.markForCheck();
                            return location;
                        })));
                        obs.push(o);
                    }
                    else {
                        location._geoloc = JSON.parse(row[3]);
                        location.status = 'file';
                        progress.count += 1;
                        cd.markForCheck();
                        obs.push(of(location));
                    }
                }
            }));
            return forkJoin(obs);
        })));
    }
    /**
     * @param {?} data
     * @param {?} formDynamicBuilder
     * @return {?}
     */
    convertFormAndConditions(data, formDynamicBuilder) {
        /** @type {?} */
        let convertError = [];
        /** @type {?} */
        let slides = (/** @type {?} */ ([]));
        /** @type {?} */
        let conditions = [];
        /** @type {?} */
        let fieldsDef = this.removeEmptyRows(data[0]);
        /** @type {?} */
        let conditionsDef = data.length >= 2 ? this.removeEmptyRows(data[1]) : [];
        fieldsDef.shift();
        conditionsDef.shift();
        /** @type {?} */
        let currentSlide = (/** @type {?} */ ({}));
        /** @type {?} */
        let fields = new Map();
        /** @type {?} */
        let conditionedFields = new Map();
        fieldsDef.forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => {
            if (row[1] && currentSlide.title !== row[1]) {
                currentSlide = (/** @type {?} */ ({ title: row[1], description: row[2], items: [] }));
                slides.push(currentSlide);
            }
            if (currentSlide) {
                if (row[5]) {
                    /** @type {?} */
                    let f = this.createField(row, formDynamicBuilder);
                    if (row[28]) {
                        /** @type {?} */
                        let conditionsTitles = this._stringToArray(row[28]);
                        if (conditionsTitles.length > 0) {
                            /** @type {?} */
                            let cara = {
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
        conditionsDef.forEach((/**
         * @param {?} condition
         * @return {?}
         */
        condition => {
            /** @type {?} */
            let c = this.createCondition(condition, fields);
            if (this.conditionsService.isValid(c)) {
                conditions.push(c);
            }
            else {
                convertError.push('CONVERTCONDITIONERROR : ' + condition[0]);
            }
        }));
        conditionedFields.forEach((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        (value, key) => {
            /** @type {?} */
            let i = findIndex(slides[value.slideId].items, (/**
             * @param {?} f
             * @return {?}
             */
            (f) => f.name === key));
            if (i >= 0) {
                slides[value.slideId].items[i].condition = [];
                value.conditions.forEach((/**
                 * @param {?} title
                 * @return {?}
                 */
                title => {
                    /** @type {?} */
                    let cond = find(conditions, (/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => c.title === title));
                    if (cond) {
                        ((/** @type {?} */ (slides[value.slideId].items[i].condition))).push(cond);
                    }
                }));
            }
        }));
        return { slides: slides, conditions: conditions, errors: convertError };
    }
    /**
     * @private
     * @param {?} row
     * @param {?} formDynamicBuilder
     * @return {?}
     */
    createField(row, formDynamicBuilder) {
        /** @type {?} */
        let field = (/** @type {?} */ ({
            name: row[0] || formDynamicBuilder.generateFieldName(),
            type: (/** @type {?} */ (row[5].toLowerCase())),
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
    }
    /**
     * @private
     * @param {?} row
     * @param {?} fields
     * @return {?}
     */
    createCondition(row, fields) {
        /** @type {?} */
        let c = (/** @type {?} */ ({
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
            if (indexOf(SIMPLE_FIELD_TYPES, c.field.type) >= 0) {
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
    }
    /**
     * @private
     * @param {?} array
     * @return {?}
     */
    removeEmptyRows(array) {
        return filter(array, (/**
         * @param {?} row
         * @return {?}
         */
        row => {
            return filter(row, (/**
             * @param {?} v
             * @return {?}
             */
            v => v && !!v.replace(/\s/g, ''))).length > 0;
        }));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    isTrue(str) {
        return str === 'TRUE' || str === 'VRAI' || str === 'true' || str === 'vrai';
    }
}
Mapping.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Mapping.ctorParameters = () => [
    { type: Requestor },
    { type: Googlemaps },
    { type: Broker },
    { type: Conditions },
    { type: Config },
    { type: Translate },
    { type: Xlsx }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Chart {
    /**
     * @param {?} broker
     * @param {?} dashboard
     * @param {?} rq
     * @param {?} translate
     * @param {?} localForage
     * @param {?} coreConfig
     * @param {?} utils
     * @param {?} cache
     */
    constructor(broker, dashboard, rq, translate, localForage, coreConfig, utils, cache) {
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
    getFilenameSuffix() {
        return this.rq.getFilenameSuffix();
    }
    /**
     * @param {?} chart
     * @return {?}
     */
    encodeChart(chart) {
        if (chart.aggregateOptions && !isString(chart.aggregateOptions)) {
            chart.aggregateOptions = (/** @type {?} */ (JSON.stringify(chart.aggregateOptions)));
        }
        if (chart.kpiFormValues && chart.kpiFormValues.campaigns) {
            chart.kpiFormValues.campaigns = chart.kpiFormValues.campaigns.map((/**
             * @param {?} c
             * @return {?}
             */
            c => pick(c, ['title', '_id', 'scoring'])));
        }
        if (chart.kpiFormValues && chart.kpiFormValues.missionscores) {
            if (chart.kpiFormValues.missionscores.selectedDescription) {
                chart.kpiFormValues.missionscores.selectedDescription = pick(chart.kpiFormValues.missionscores.selectedDescription, ['title', '_id', 'scoring']);
            }
            if (chart.kpiFormValues.missionscores.scores) {
                /** @type {?} */
                let score = chart.kpiFormValues.missionscores.scores;
                if (isArray(score) && ((/** @type {?} */ (score))).length > 0) {
                    score = score[0];
                }
                chart.kpiFormValues.missionscores.scores = pick(score, ['title', 'isActive']);
            }
        }
    }
    /**
     * @param {?} chart
     * @return {?}
     */
    decodeChart(chart) {
        if (chart.aggregateOptions && isString(chart.aggregateOptions)) {
            chart.aggregateOptions = (/** @type {?} */ (JSON.parse((/** @type {?} */ (chart.aggregateOptions)))));
        }
        if (((/** @type {?} */ (chart))).aggregateData && isString(((/** @type {?} */ (chart))).aggregateData)) {
            ((/** @type {?} */ (chart))).aggregateData = (/** @type {?} */ (JSON.parse(((/** @type {?} */ (chart))).aggregateData)));
        }
        if (!chart._id) {
            chart._id = getUUID();
        }
    }
    /**
     * @param {?} entity
     * @return {?}
     */
    encode(entity) {
        if (!entity) {
            return entity;
        }
        /** @type {?} */
        let newentity = cloneDeep(entity);
        forEach(newentity.tabs, (/**
         * @param {?} tab
         * @return {?}
         */
        tab => {
            if (tab && tab.items) {
                forEach(tab.items, (/**
                 * @param {?} item
                 * @return {?}
                 */
                item => {
                    if (item && item.definition) {
                        this.encodeChart(item.definition);
                    }
                }));
            }
        }));
        if (newentity.tabs && newentity.tabs.length > 0 && newentity.tabs[0].items && newentity.tabs[0].items.length > 0 && newentity.tabs[0].items[0].definition && newentity.tabs[0].items[0].definition.kpiType) {
            newentity.icon = this.getKpiIcon(newentity.tabs[0].items[0].definition.kpiType);
        }
        return newentity;
    }
    /**
     * @param {?} entity
     * @return {?}
     */
    decode(entity) {
        forEach(entity.tabs, (/**
         * @param {?} tab
         * @return {?}
         */
        tab => {
            forEach(tab.items, (/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (item && item.definition) {
                    this.decodeChart(item.definition);
                }
            }));
        }));
        return entity;
    }
    /**
     * @param {?} cd
     * @return {?}
     */
    clone(cd) {
        /** @type {?} */
        let newCd = cloneDeep(cd);
        newCd._id = getUUID();
        return newCd;
    }
    /**
     * @param {?} entity
     * @return {?}
     */
    saveDashboard(entity) {
        /** @type {?} */
        let newEntity = this.encode(entity);
        return this.broker.upsert('dashboards', newEntity).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => this.decode(retVal))));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    deleteDashboard(id) {
        return this.broker.delete('dashboards', id);
    }
    /**
     * @param {?} cd
     * @param {?} component
     * @param {?=} forceRefresh
     * @param {?=} start
     * @param {?=} showPreviousYear
     * @return {?}
     */
    getData(cd, component, forceRefresh = false, start = 0, showPreviousYear = false) {
        return this.getDataObservable(cd, component, forceRefresh, start, showPreviousYear).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            return throwError('error');
        })));
    }
    /**
     * @param {?} cd
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} options
     * @param {?=} forceRefresh
     * @return {?}
     */
    getAggregateQuery(cd, collectionName, filters, options, forceRefresh = false) {
        return from(this.getDataFromCache(cd)).pipe(mergeMap((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            return data && forceRefresh !== true ? of(data) : this.broker.aggregateQuery(collectionName, filters, options);
        })), mergeMap((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return from(this.addDataToCache(cd, data));
        })));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getChartCache(id) {
        return this.cache.get(CACHE_KEYS.chart, id).toPromise();
        //return this.localForage.get<ChartCache>(CACHE_KEYS.chart + '.' + id);
    }
    /**
     * @param {?} id
     * @param {?} cache
     * @return {?}
     */
    setChartCache(id, cache) {
        return this.cache.add(CACHE_KEYS.chart, id, cache);
        //return this.localForage.set<ChartCache>(CACHE_KEYS.chart + '.' + id, cache);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    clearChartCache(id) {
        return this.cache.remove(CACHE_KEYS.chart, id);
        //return this.localForage.remove(CACHE_KEYS.chart + '.' + id);
    }
    /**
     * @param {?} cd
     * @return {?}
     */
    getDataFromCache(cd) {
        if (cd._id) {
            return this.getChartCache(cd._id).then((/**
             * @param {?} cache
             * @return {?}
             */
            cache => {
                if (cache) {
                    if (toMinutes(dateDiff(new Date(), toDate(cache.date))) < 15) {
                        return cache.data;
                    }
                }
                return null;
            }));
        }
        return Promise.resolve(null);
    }
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    addDataToCache(cd, data) {
        if (cd._id) {
            return this.getChartCache(cd._id)
                .then((/**
             * @param {?} cache
             * @return {?}
             */
            cache => {
                cache = { date: new Date(), data: cloneDeep(data) };
                return this.setChartCache(cd._id, cache);
            }))
                .then((/**
             * @return {?}
             */
            () => {
                return data;
            }));
        }
        else {
            return Promise.resolve(data);
        }
    }
    /**
     * @param {?} cd
     * @param {?} component
     * @param {?=} forceRefresh
     * @param {?=} showPreviousYear
     * @return {?}
     */
    getKpiData(cd, component, forceRefresh = false, showPreviousYear = false) {
        /** @type {?} */
        let type = this.getKpiClass(cd.kpiType);
        type.getChartDefinition(cd.kpiFormValues, cd, this.translate);
        if (cd && cd.kpiType === 'ChartIOKpi') {
            return of([]);
        }
        /** @type {?} */
        let aggregate = type.getAggregate(cd.kpiFormValues, this.translate, showPreviousYear);
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
            res => {
                return aggregate.mapTransform(res, cd, this.broker, component);
            })));
        }
        else {
            return this.getAggregateQuery(cd, aggregate.collectionName, aggregate.filters, aggregate.aggregateOptions, forceRefresh).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                return aggregate.mapTransform ? aggregate.mapTransform(res, cd, this.broker, component) : res;
            })));
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getKpiClass(type) {
        return null;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getKpiIcon(type) {
        return null;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getKpiIconByType(type) {
        return null;
    }
    /**
     * @param {?} cd
     * @param {?} component
     * @param {?=} forceRefresh
     * @param {?=} start
     * @param {?=} showPreviousYear
     * @return {?}
     */
    getDataObservable(cd, component, forceRefresh = false, start = 0, showPreviousYear = false) {
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
                let format = BaseKpi.getDateFormat(cd.dateGrouping);
                if (cd.aggregateOptions && cd.aggregateOptions.length > 0) {
                    return this.getAggregateQuery(cd, cd.collectionName, cd.filters, cd.aggregateOptions, forceRefresh).pipe(map((/**
                     * @param {?} res
                     * @return {?}
                     */
                    res => {
                        return cd.mapTransform ? cd.mapTransform(res, cd, this.broker, component) : res;
                    })));
                }
                else {
                    /** @type {?} */
                    let aggregateOptions = [];
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
                        let match = {};
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
                    res => {
                        return cd.mapTransform ? cd.mapTransform(res, cd, this.broker, component) : res;
                    })));
                }
                else {
                    return of([]);
                }
            }
        }
    }
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    getChartConfig(cd, data) {
        return this.getHCChartConfig(cd, data);
    }
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    getGridConfig(cd, data) {
        if (cd.kpiType === 'CampaignsPivotTableKpi') {
            return {
                columnDefs: cd.kpiColumns,
                rowData: data
            };
        }
        /** @type {?} */
        let config = this.getHCChartConfig(cd, data);
        /** @type {?} */
        let columnDefs = [
            {
                headerName: cd.groupByDate ? this.translate.get('DATE') : this.translate.get('CATEGORY'),
                field: 'key'
            }
        ];
        if (cd.groupByDate) {
            columnDefs[0].comparator = 'dateComparator';
        }
        /** @type {?} */
        let rows = new Map();
        config.series.forEach((/**
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        (s, i) => {
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
            (d, index) => {
                /** @type {?} */
                let key;
                /** @type {?} */
                let value;
                /** @type {?} */
                let x;
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
                    let row = rows.get(key) || { key: key };
                    row['serie' + i] = isNumber(value) ? this.decimalPipe.transform(value, this.getNumberFormat(cd)) : value && value.toString ? value.toString() : value;
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
    }
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    getMapConfig(cd, data) {
        return null;
    }
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    getMicroConfig(cd, data) {
        /** @type {?} */
        let value;
        /** @type {?} */
        let delta;
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
    }
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    getPivotTableConfig(cd, data) {
        /** @type {?} */
        let gridConfig = this.getGridConfig(cd, data);
        /** @type {?} */
        let gridOptions = {
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
    }
    /**
     * @protected
     * @param {?} cd
     * @param {?} rows
     * @return {?}
     */
    campaignsPivotTableKpiSortRows(cd, rows) {
        /** @type {?} */
        let sorts = [];
        for (let i = 1; i <= 5; i++) {
            /** @type {?} */
            let columnName = 'tagGroup' + i;
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
    }
    /**
     * @param {?=} dates
     * @param {?=} data
     * @return {?}
     */
    getCalendarData(dates = null, data) {
        if (dates === null) {
            return {};
        }
        // need to get dates from the component
        /** @type {?} */
        let timeSpan = dates.amount - 1;
        /** @type {?} */
        let timeScale = dates.timescale;
        /** @type {?} */
        let outputData = [];
        /** @type {?} */
        let xAxis = [];
        if (data && data.length > 0) {
            /** @type {?} */
            let currentDate = toDate(data[0]._id);
            /** @type {?} */
            let stopDate = endOf(dateAdd(toDate(data[0]._id), timeScale, timeSpan), timeScale);
            /** @type {?} */
            let weekNumber = 0;
            /** @type {?} */
            let dayToY = [0, 6, 5, 4, 3, 2, 1];
            while (currentDate <= stopDate) {
                /** @type {?} */
                let stringDate = dateFormat(toDate(currentDate), 'YYYY-MM-dd');
                /** @type {?} */
                let retVal = {
                    _id: stringDate,
                    x: weekNumber,
                    y: dayToY[day(toDate(currentDate))],
                    value: 0,
                    keys: null,
                    date: stringDate
                };
                /** @type {?} */
                let v = find(data, (/**
                 * @param {?} s
                 * @return {?}
                 */
                (s) => s._id === stringDate));
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
            }
        }
        return { data: outputData, xAxis };
    }
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    getCalendarConfig(cd, data) {
        /** @type {?} */
        let config = this.setHCChartType(cd);
        /** @type {?} */
        let chartData = this.getCalendarData(cd.kpiFormValues.dates, data);
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
    }
    /**
     * @param {?} cd
     * @param {?} data
     * @return {?}
     */
    getHCChartConfig(cd, data) {
        this.textStyle = {
            fontFamily: 'Lato',
            color: Colors.black,
            fontWeight: '300',
            fontSize: '13px',
            whiteSpace: 'normal',
            textShadow: false
        };
        /** @type {?} */
        let config = this.setHCChartType(cd);
        /** @type {?} */
        let originalData = data;
        if (!isArray(data)) {
            return;
        }
        if (cd.groupByDate && cd.type !== 'pie') {
            this.setHCUseDates(config);
            if (cd.groupByCampaign) {
                /* beautify ignore:start */
                /** @type {?} */
                let series = new Map();
                /* beautify ignore:end */
                data.forEach((/**
                 * @param {?} d
                 * @return {?}
                 */
                (d) => {
                    /** @type {?} */
                    let s = series.get(d._id.title) || { name: d._id.title, data: [] };
                    /** @type {?} */
                    let date = BaseKpi.fixDates(cd, d._id.date);
                    s.data.push({ x: date, y: d.value, color: d.color, keys: d.keys });
                    series.set(d._id.title, s);
                }));
                config.series = Array.from(series.values());
                config.series.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                (s) => (s.data = sortBy((/** @type {?} */ (s.data)), (/**
                 * @param {?} d
                 * @return {?}
                 */
                (d) => d.x)))));
            }
            else {
                config.series = (/** @type {?} */ ([
                    {
                        name: cd.title,
                        data: sortBy(data.map((/**
                         * @param {?} d
                         * @return {?}
                         */
                        (d) => {
                            /** @type {?} */
                            let date = BaseKpi.fixDates(cd, d._id);
                            return { x: date, y: d.value, color: d.color, keys: d.keys };
                        })), (/**
                         * @param {?} d
                         * @return {?}
                         */
                        d => d.x))
                    }
                ]));
            }
        }
        else if (cd.type === 'treemap') {
            if (isArray(data)) {
                config.series = (/** @type {?} */ ([
                    {
                        layoutAlgorithm: 'squarified',
                        data: map$1(data, (/**
                         * @param {?} d
                         * @return {?}
                         */
                        (d) => ({ name: d._id, value: d.value, colorValue: d.value })))
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
            let series = new Map();
            /** @type {?} */
            let categories = new Set();
            if (isArray(data) && data.length > 0 && (((/** @type {?} */ (data[0]))).serie || ((/** @type {?} */ (data[0]))).serie === 0)) {
                forEach(data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                (d) => {
                    /** @type {?} */
                    let serie = series.get(d.serie) || {};
                    serie[d._id] = { y: d.value, keys: d.keys };
                    categories.add(d._id);
                    series.set(d.serie, serie);
                }));
                config.xAxis = Object.assign(config.xAxis || {}, {
                    categories: sortBy(Array.from(categories.values()), (/**
                     * @param {?} x
                     * @return {?}
                     */
                    x => x)),
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
                    (acc, memo) => {
                        acc[memo._id] = { y: memo.value, keys: memo.keys };
                        return acc;
                    }), {});
                }
                else {
                    delete ((/** @type {?} */ (data))).value;
                }
                config.xAxis = Object.assign(config.xAxis || {}, {
                    categories: map$1(data, (/**
                     * @param {?} v
                     * @param {?} l
                     * @return {?}
                     */
                    function (v, l) {
                        return l;
                    })),
                    crosshair: true
                });
                series.set(cd.title, data);
            }
            config.series = [];
            /** @type {?} */
            let width = 100 / series.size;
            series.forEach((/**
             * @param {?} serie
             * @param {?} name
             * @return {?}
             */
            (serie, name) => {
                /** @type {?} */
                let index = config.series.length + 1;
                //fill in missing data
                if (config.xAxis && ((/** @type {?} */ (config.xAxis))).categories) {
                    ((/** @type {?} */ (config.xAxis))).categories.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => {
                        if (!serie[c]) {
                            serie[c] = null;
                        }
                    }));
                }
                config.series.push((/** @type {?} */ ({
                    name: name,
                    size: (width * 0.7).toString() + '%',
                    center: [(width * index - width / 2).toString() + '%', null],
                    data: cd.type === 'radar'
                        ? map$1((/** @type {?} */ (((/** @type {?} */ (config.xAxis))).categories)), (/**
                         * @param {?} c
                         * @return {?}
                         */
                        c => {
                            return serie[c];
                        }))
                        : sortBy(map$1((/** @type {?} */ (serie)), (/**
                         * @param {?} v
                         * @param {?} l
                         * @return {?}
                         */
                        (v, l) => {
                            return assign({ name: l }, v);
                        })), (/**
                         * @param {?} d
                         * @return {?}
                         */
                        d => {
                            //we have to map to string because the object keys we re getting back are string
                            return ((/** @type {?} */ (config.xAxis))).categories.map((/**
                             * @param {?} x
                             * @return {?}
                             */
                            x => x.toString())).indexOf(d.name);
                        }))
                })));
            }));
        }
        config.series.forEach((/**
         * @param {?} s
         * @return {?}
         */
        (s) => {
            originalData.forEach((/**
             * @param {?} o
             * @return {?}
             */
            o => {
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
                    k => {
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
                    (d, i) => {
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
                            k => {
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
                for (let i = 1; i < s.data.length; i++) {
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
    }
    /**
     * @param {?} config
     * @return {?}
     */
    isChartEmpty(config) {
        if (!config.series || (config.series.length === 1 && (!((/** @type {?} */ (config.series[0]))).data || ((/** @type {?} */ (config.series[0]))).data.length === 0))) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getChartEmptyImage(config) {
        /** @type {?} */
        let emptyImage = './images/empty-states/speedometer.svg';
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
    }
    /**
     * @param {?} svg
     * @param {?} width
     * @param {?} height
     * @param {?=} options
     * @return {?}
     */
    getURL(svg, width, height, options) {
        /** @type {?} */
        let type = 'image/png';
        /** @type {?} */
        let config = {
            filename: options ? options.filename : null,
            type: type,
            async: true,
            scale: 2,
            width: width * 2,
            height: height * 2,
            svg: svg
        };
        /** @type {?} */
        let exportUrl = 'https://export.highcharts.com/';
        return this.rq.postMultiPart(exportUrl, config).pipe(mergeMap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            /** @type {?} */
            let url = exportUrl + res;
            return this.rq.getBinaryContent(url);
        })), mergeMap((/**
         * @param {?} arrayBuffer
         * @return {?}
         */
        arrayBuffer => {
            /** @type {?} */
            let blob = new Blob([arrayBuffer], { type });
            return from(this.broker.upload(blob));
        })), map((/**
         * @param {?} url
         * @return {?}
         */
        url => {
            return url;
        })));
    }
    /**
     * @param {?} svgs
     * @param {?} maxHeight
     * @param {?=} pdfRowWidth
     * @return {?}
     */
    formatSVGs(svgs, maxHeight, pdfRowWidth = 1200) {
        svgs = [].concat(svgs);
        /** @type {?} */
        let svg;
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
    }
    /**
     * @param {?} options
     * @param {?} svgs
     * @param {?} maxHeight
     * @param {?=} pdfRowWidth
     * @return {?}
     */
    exportAll(options, svgs, maxHeight, pdfRowWidth = 1200) {
        /** @type {?} */
        let svg = this.formatSVGs(svgs, maxHeight);
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
        res => {
            if (res && res.body) {
                this.rq.saveArrayBuffer(res.body, (options.filename || 'chart') + '.pdf');
            }
        }));
    }
    /**
     * @param {?} dashboardId
     * @param {?=} env
     * @return {?}
     */
    getChartIOUrl(dashboardId, env) {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'dashboards/getToken';
        return this.rq.post(url, { dashboardId, env: env || {} }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            return retVal;
        })));
    }
    /**
     * @param {?} dashboardId
     * @param {?=} env
     * @return {?}
     */
    getTableauUrl(dashboardId, env) {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'tableau/getViewUrl';
        return this.rq.post(url, { path: dashboardId }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            return retVal;
        })));
    }
    /**
     * @protected
     * @param {?} cd
     * @param {?} config
     * @return {?}
     */
    applyAreaSplineGradients(cd, config) {
        if (config.chart && config.chart.type === 'areaspline') {
            /** @type {?} */
            const palette = this.getPalette(cd);
            /** @type {?} */
            const alpha = 0.15;
            config.series.forEach((/**
             * @param {?} s
             * @param {?} i
             * @return {?}
             */
            (s, i) => {
                const [r, g, b] = palette[i].match(/\w\w/g).map((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => parseInt(x, 16)));
                s.fillColor = `rgba(${r},${g},${b},${alpha})`;
                s.dataLabels = s.dataLabels || {};
                s.dataLabels.color = Colors.black;
                //     color: '#04CC99'
                //     linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                //     stops: [[0, s.color || palette[i % (palette.length - 1)]], [1, 'rgba(255,255,255,0)']]
                // };
            }));
        }
    }
    /**
     * @protected
     * @param {?} config
     * @return {?}
     */
    applySubtitleSum(config) {
        if (config.chart && config.chart.type === 'areaspline' && config.series.length === 1) {
            /** @type {?} */
            let subtitleSum = sumBy(((/** @type {?} */ (config.series[0]))).data, (/**
             * @param {?} d
             * @return {?}
             */
            d => d[1]));
            if (subtitleSum) {
                config.subtitle = {
                    text: subtitleSum.toLocaleString(),
                    style: defaultsDeep({ fontSize: '18px', fontWeight: 300, color: Colors.black }, this.textStyle),
                    align: 'right'
                };
            }
        }
    }
    /**
     * @protected
     * @param {?} config
     * @param {?} cd
     * @return {?}
     */
    applyLegendState(config, cd) {
        if (cd.chartLegendState) {
            forEach(config.series, (/**
             * @param {?} s
             * @return {?}
             */
            (s) => {
                if (s && s.name === false) {
                    s.visible = false;
                }
                if (isArray(s.data)) {
                    ((/** @type {?} */ (s.data))).forEach((/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    (d, i) => {
                        if (d && cd.chartLegendState[d.name] === false) {
                            d.visible = false;
                        }
                    }));
                }
            }));
        }
    }
    /**
     * @protected
     * @param {?} data
     * @param {?} config
     * @return {?}
     */
    addCorelationLine(data, config) {
        /** @type {?} */
        let n = data.length;
        /** @type {?} */
        let sx = sum(data.map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.x)));
        /** @type {?} */
        let sy = sum(data.map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.y)));
        /** @type {?} */
        let sxy = sum(data.map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.x * d.y)));
        /** @type {?} */
        let sx2 = sum(data.map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.x * d.x)));
        /** @type {?} */
        let a = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
        /** @type {?} */
        let b = (sy - a * sx) / n;
        /** @type {?} */
        let minx = min(data.map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.x)));
        /** @type {?} */
        let maxx = max(data.map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.x)));
        config.series.push((/** @type {?} */ ({
            type: 'line',
            name: 'Regression',
            color: Colors.black,
            data: [[minx, a * minx + b], [maxx, a * maxx + b]],
            marker: { enabled: false },
            enableMouseTracking: false
        })));
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    setHCChartType(cd) {
        /** @type {?} */
        let config = this.getHCDefaultConfig(cd);
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
    }
    /**
     * @protected
     * @param {?} config
     * @return {?}
     */
    setHCUseDates(config) {
        config.xAxis = config.xAxis || {};
        config.chart.zoomType = 'x';
        config.chart.panning = true;
        config.chart.panKey = 'shift';
        //delete config.tooltip.formatter;
        ((/** @type {?} */ (config.xAxis))).type = 'datetime';
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getPalette(cd) {
        if (!cd || !cd.palette || !this[cd.palette]) {
            return this.palette0;
        }
        return this[cd.palette];
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getNumberFormat(cd) {
        if (cd.numberPrecision && cd.numberPrecision >= 1) {
            return '1.0-' + (Math.floor(cd.numberPrecision) || 0);
        }
        return '1.0-0';
    }
    /**
     * @protected
     * @param {?} groupingDate
     * @param {?=} groupBySlider
     * @return {?}
     */
    getDateTimeIntervalByGroupingDate(groupingDate, groupBySlider = '') {
        /** @type {?} */
        const BASE_HOUR_MILLISECOND = 3600 * 1000;
        // 3 600 000
        /** @type {?} */
        const BASE_DAY_MILLISECOND = 24 * BASE_HOUR_MILLISECOND;
        // 86 400 000
        /** @type {?} */
        const BASE_WEEK_MILLISECOND = 7 * BASE_DAY_MILLISECOND;
        // 604 800 000
        /** @type {?} */
        const BASE_MONTH_MILISECOND = 30 * BASE_DAY_MILLISECOND;
        // 259 200 000
        /** @type {?} */
        const BASE_GROUPING_DATE_MILISECOND = {
            hour: BASE_HOUR_MILLISECOND,
            day: BASE_DAY_MILLISECOND,
            week: BASE_WEEK_MILLISECOND,
            month: BASE_MONTH_MILISECOND
        };
        if (groupBySlider && groupBySlider === '3months') {
            return BASE_GROUPING_DATE_MILISECOND['month'];
        }
        return BASE_GROUPING_DATE_MILISECOND[groupingDate];
    }
    /**
     * @protected
     * @param {?} groupingDate
     * @param {?=} groupBySlider
     * @return {?}
     */
    getDateTimeFormat(groupingDate, groupBySlider = '') {
        /** @type {?} */
        const BASE_GROUPING_DATE_HCFORMAT = {
            hour: '%H:%M',
            day: '%e. %b',
            week: '%e. %b',
            month: '%b'
        };
        if (groupBySlider && groupBySlider === '3months') {
            return '{value:' + BASE_GROUPING_DATE_HCFORMAT['month'] + '}';
        }
        return '{value:' + BASE_GROUPING_DATE_HCFORMAT[groupingDate] + '}';
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultConfig(cd) {
        /** @type {?} */
        let chartService = this;
        /** @type {?} */
        let groupBySlider = cd.kpiFormValues && cd.kpiFormValues.groupBySlider;
        /** @type {?} */
        let isSalesDatasKpi = cd.kpiType && cd.kpiType === 'SalesDatasKpi';
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
                    let retVal = '';
                    if (this.yData && this.yData.length > 0) {
                        /** @type {?} */
                        let total = 0;
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
                    let name = (this.series ? this.series.name : '') || '';
                    if (name && name !== ' ') {
                        name += '<br/>';
                    }
                    /** @type {?} */
                    let t = name + (this.x ? (cd.groupByDate ? dateFormat(toDate(this.x), 'L') : this.x) + ': ' : this.key + ': ' || '') + chartService.decimalPipe.transform(this.y, chartService.getNumberFormat(cd));
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
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getDataLabelFormatter(cd) {
        /** @type {?} */
        let chartService = this;
        return (/**
         * @return {?}
         */
        function () {
            if ((cd.stacked === 'percent' && this.percentage > 0) || (cd.stacked !== 'percent' && Math.abs(this.y) >= 0)) {
                /** @type {?} */
                let t = cd.stacked === 'percent' ? Math.round(this.percentage) + ' %' : chartService.decimalPipe.transform(this.y, chartService.getNumberFormat(cd));
                if (cd.unit && t) {
                    t += ' ' + cd.unit;
                }
                if (!t) {
                    t = '';
                }
                if (cd.showDelta && this.series && isArray(this.series.data)) {
                    /** @type {?} */
                    let index = findIndex(this.series.data, (/**
                     * @param {?} point
                     * @return {?}
                     */
                    (point) => point.x === this.x));
                    if (index > 0 && Math.abs(this.series.data[index - 1].y) > 0) {
                        /** @type {?} */
                        let delta = Math.round((100 * (this.series.data[index].y - this.series.data[index - 1].y)) / this.series.data[index - 1].y);
                        t += '<br/><g>(' + delta + '%)</g>';
                    }
                }
                return t;
            }
            return '';
        });
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    useContrast(cd) {
        return true; //Colors.isDarkTheme() ? false : cd && cd.type !== 'spline' && cd.type !== 'areaspline' && cd.type !== 'line' && cd.type !== 'area';
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getDataLabels(cd) {
        return {
            enabled: cd.showValues !== false,
            useHTML: false,
            style: defaultsDeep({ color: Colors.black, textOutline: 'none' }, this.textStyle),
            formatter: this.getDataLabelFormatter(cd)
        };
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultLine(cd) {
        return {
            chart: { type: 'line', marginTop: 10 },
            plotOptions: {
                line: {
                    //connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultSpline(cd) {
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
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultArea(cd) {
        return {
            chart: { type: 'area', marginTop: 10 },
            plotOptions: {
                area: {
                    connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultAreaSpline(cd) {
        return {
            chart: { type: 'areaspline', marginTop: 30 },
            plotOptions: {
                areaspline: {
                    connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultColumn(cd) {
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
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultHeatmap(cd) {
        return {
            chart: { type: 'heatmap', marginTop: 10 }
        };
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultBar(cd) {
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
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultPie(cd) {
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
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultDoughnut(cd) {
        return defaultsDeep({
            plotOptions: {
                pie: { startAngle: -90, endAngle: 90, center: ['50%', '75%'], innerSize: '90%' }
            }
        }, this.getHCDefaultPie(cd));
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultRadar(cd) {
        return {
            chart: { polar: true, type: 'area' },
            pane: { size: '70%' },
            yAxis: (/** @type {?} */ ({ gridLineInterpolation: 'polygon', labels: { enabled: false }, lineWidth: 0 })),
            xAxis: { tickmarkPlacement: 'on', lineWidth: 0 }
        };
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultTreemap(cd) {
        return {
            chart: { type: 'treemap' },
            colorAxis: {
                minColor: Colors.light,
                maxColor: this.getPalette(cd)[0]
            }
        };
    }
    /**
     * @protected
     * @param {?} cd
     * @return {?}
     */
    getHCDefaultScatter(cd) {
        return {
            chart: { type: 'scatter', zoomType: 'xy' },
            xAxis: { gridLineWidth: 1 },
            plotOptions: {
                series: { marker: (/** @type {?} */ ({ enabled: true, fillOpacity: 0.5 })) }
            }
        };
    }
}
Chart.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Chart.ctorParameters = () => [
    { type: Broker },
    { type: DashboardCore },
    { type: Requestor },
    { type: Translate },
    { type: LocalForageService },
    { type: CoreConfig },
    { type: Utils },
    { type: Cache }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let conditions = {
    isAllowInventory: 'allowInventory == 1'
};
let CustomModel = class CustomModel extends ICustomModel {
};
__decorate([
    Editable('CustomModel', { type: FormFieldType.text, visible: false }),
    __metadata("design:type", String)
], CustomModel.prototype, "_id", void 0);
__decorate([
    Editable('CustomModel', { required: true, type: FormFieldType.text }),
    Searchable('CustomModel'),
    __metadata("design:type", String)
], CustomModel.prototype, "title", void 0);
__decorate([
    Editable('CustomModel', { required: true, type: FormFieldType.text }),
    Searchable('CustomModel'),
    __metadata("design:type", String)
], CustomModel.prototype, "name", void 0);
__decorate([
    Editable('CustomModel', { required: false, type: FormFieldType.textarea }),
    Searchable('CustomModel'),
    __metadata("design:type", String)
], CustomModel.prototype, "shortDescription", void 0);
__decorate([
    Editable('CustomModel', {
        required: true,
        flex: 100,
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true,
        clearable: false
    }),
    __metadata("design:type", Array)
], CustomModel.prototype, "group", void 0);
__decorate([
    Editable('CustomModel', {
        type: FormFieldType.checkbox,
        flex: 100,
        title: 'INVENTORY',
        columnDefinition: { width: 80 }
    }),
    __metadata("design:type", Boolean)
], CustomModel.prototype, "allowInventory", void 0);
__decorate([
    Editable('CustomModel', {
        type: FormFieldType.autocomplete,
        required: true,
        condition: conditions.isAllowInventory,
        filters: FORM_FILES_IMAGE_FILTER,
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
    Model({
        className: 'CustomModel',
        collectionName: 'custommodels',
        fields: ['*']
    })
], CustomModel);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CustomModels {
    /**
     * @param {?} config
     * @param {?} rq
     * @param {?} broker
     * @param {?} network
     */
    constructor(config, rq, broker, network) {
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
    registerModel(name, customModel) {
        /** @type {?} */
        let properties = customModel.fields.map((/**
         * @param {?} field
         * @return {?}
         */
        field => {
            /** @type {?} */
            let retVal = {};
            retVal[field.name] = {
                type: 'string'
            };
            return retVal;
        }));
        properties.unshift({
            _id: (/** @type {?} */ ({
                type: 'string',
                id: true,
                generated: true
            }))
        });
        customModel.properties = properties;
        customModel.permissions = 'private';
        return this.broker.upsert('custommodels', customModel).pipe(map((/**
         * @return {?}
         */
        () => {
            this.registerModelForClient(customModel);
        })));
    }
    /**
     * @param {?} customModel
     * @return {?}
     */
    registerModelForClient(customModel) {
        Models.clearCollectionName(customModel.name);
        Models.setCollectionName(customModel.name, customModel.name, ['*'], [], null, customModel.feathersService, CustomModel, true);
        if (customModel.fields) {
            customModel.fields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            field => {
                if (field) {
                    Models.addFormField(customModel.name, field);
                    if (field.searchable) {
                        Models.addSearchableField(customModel.name, field.name);
                    }
                }
            }));
        }
        if (customModel.appearance) {
            for (let key in customModel.appearance) {
                if (customModel.appearance.hasOwnProperty(key)) {
                    Models.addAppearance(customModel.name, key, customModel.appearance[key]);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    registerModelsForClient() {
        if (!this.network.isOffline()) {
            this.broker.getAll('custommodels', null, null, null, null, null, null, 10000).subscribe((/**
             * @param {?} ret
             * @return {?}
             */
            ret => {
                if (ret.data) {
                    this.customModels = ret.data;
                    ret.data.forEach((/**
                     * @param {?} customModel
                     * @return {?}
                     */
                    (customModel) => {
                        this.registerModelForClient(customModel);
                    }));
                }
            }));
        }
        else if (this.customModels) {
            this.customModels.forEach((/**
             * @param {?} customModel
             * @return {?}
             */
            (customModel) => {
                this.registerModelForClient(customModel);
            }));
        }
    }
}
CustomModels.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CustomModels.ctorParameters = () => [
    { type: Config },
    { type: Requestor },
    { type: Broker },
    { type: Network }
];
__decorate([
    Persistent('custommodels.offline', false, null, true),
    __metadata("design:type", Array)
], CustomModels.prototype, "customModels", void 0);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PROVIDERS = [CellRenderer, Conditions, FormDynamicBuilder, Mapping, Chart, CustomModels];
class DataFormModule {
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    static forRoot(configuredProviders = []) {
        return {
            ngModule: DataFormModule,
            providers: [...PROVIDERS, ...configuredProviders]
        };
    }
}
DataFormModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                entryComponents: [],
                imports: [FormsModule, ReactiveFormsModule, DataCoreModule, TranslateModule, CommonModule],
                exports: [FormsModule, ReactiveFormsModule, DataCoreModule, TranslateModule, CommonModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let CustomFormField = class CustomFormField extends Entity {
};
__decorate([
    Editable('CustomFormField', { type: FormFieldType.text, required: true }),
    __metadata("design:type", String)
], CustomFormField.prototype, "title", void 0);
__decorate([
    Editable('CustomFormField', { type: FormFieldType.textarea }),
    __metadata("design:type", String)
], CustomFormField.prototype, "description", void 0);
__decorate([
    Editable('CustomFormField', {
        type: FormFieldType.autocomplete,
        multiple: true,
        required: true,
        idAttributeName: 'name',
        displayType: 'formfield'
    }),
    __metadata("design:type", Array)
], CustomFormField.prototype, "fields", void 0);
__decorate([
    Editable('CustomFormField', {
        title: 'GROUPS',
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true,
        clearable: false,
        required: true,
        allowCustomTag: true,
        tag: false
    }),
    __metadata("design:type", String)
], CustomFormField.prototype, "group", void 0);
CustomFormField = __decorate([
    Model({
        className: 'CustomFormField',
        collectionName: 'customFormFields',
        fields: ['*'],
        include: []
    })
], CustomFormField);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let conditions$1 = {
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
    missionIsQuizz: (/** @type {?} */ ({ type: 'missionDescriptionAttribute', key: 'quizz', value: true })),
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
let FormField = 
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
class FormField extends Entity {
};
__decorate([
    Editable('FormField', { type: FormFieldType.text, visible: false }),
    __metadata("design:type", String)
], FormField.prototype, "name", void 0);
__decorate([
    Editable('FormField', { type: FormFieldType.text, required: true }),
    __metadata("design:type", String)
], FormField.prototype, "title", void 0);
__decorate([
    Editable('FormField', {
        title: 'INSTRUCTIONS',
        type: FormFieldType.textarea,
        condition: conditions$1.isNotInformation,
        language: 'html'
    }),
    __metadata("design:type", String)
], FormField.prototype, "description", void 0);
__decorate([
    Editable('FormField', {
        title: 'VALUE',
        required: true,
        type: FormFieldType.textarea,
        condition: conditions$1.isInformation,
        language: 'html'
    }),
    __metadata("design:type", Object)
], FormField.prototype, "value", void 0);
__decorate([
    Editable('FormField', {
        title: 'URL',
        required: true,
        type: FormFieldType.text,
        condition: conditions$1.isVideoplayer
    }),
    __metadata("design:type", Object)
], FormField.prototype, "url", void 0);
__decorate([
    Editable('FormField', {
        title: 'SENTENCE',
        type: FormFieldType.textarea,
        condition: conditions$1.hasSentence
    }),
    __metadata("design:type", Object)
], FormField.prototype, "sentence", void 0);
__decorate([
    Editable('FormField', {
        title: 'FORMULA',
        type: FormFieldType.textarea,
        condition: conditions$1.isFormula
    }),
    __metadata("design:type", Object)
], FormField.prototype, "formula", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        required: true,
        values: map$1(MOBILE_FORM_FIELDS_ALL, 'type'),
        translate: true
    }),
    __metadata("design:type", String)
], FormField.prototype, "type", void 0);
__decorate([
    Editable('FormField', {
        title: 'GAME',
        type: FormFieldType.autocomplete,
        values: ['runner-game', 'memory-card-game'],
        translate: true,
        condition: conditions$1.isGame,
        required: true
    }),
    __metadata("design:type", String)
], FormField.prototype, "game", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        required: true,
        collectionName: 'catalogs',
        idOnly: true,
        condition: conditions$1.isCatalog
    }),
    __metadata("design:type", String)
], FormField.prototype, "catalog", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.checkbox,
        condition: [conditions$1.isCatalog, 'presence != 1'],
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "inventory", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.checkbox,
        condition: [conditions$1.isCatalog, 'inventory != 1'],
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "presence", void 0);
__decorate([
    Editable('FormField', {
        title: 'CUSTOMMODEL',
        type: FormFieldType.autocomplete,
        collectionName: 'custommodels',
        idAttributeName: 'name',
        idOnly: true,
        condition: conditions$1.isAutocomplete,
        advanced: true
    }),
    __metadata("design:type", String)
], FormField.prototype, "collectionName", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.toggle,
        condition: conditions$1.isAutocomplete,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "filterByLocation", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions$1.hasValues
    }),
    __metadata("design:type", Array)
], FormField.prototype, "values", void 0);
__decorate([
    Editable('FormField', {
        title: 'MODE',
        type: FormFieldType.autocomplete,
        values: ['dragndrop', 'drawing'],
        translate: true,
        condition: conditions$1.isConnect,
        required: true
    }),
    __metadata("design:type", String)
], FormField.prototype, "connectMode", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions$1.isConnect
    }),
    __metadata("design:type", Array)
], FormField.prototype, "leftValues", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions$1.isConnect
    }),
    __metadata("design:type", Array)
], FormField.prototype, "rightValues", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions$1.isGame
    }),
    __metadata("design:type", Array)
], FormField.prototype, "correctValues", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions$1.isGame
    }),
    __metadata("design:type", Array)
], FormField.prototype, "wrongValues", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
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
    Editable('FormField', {
        title: 'IMAGE',
        type: FormFieldType.autocomplete,
        filters: FORM_FILES_IMAGE_FILTER,
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
    Editable('FormField', {
        title: 'IMAGE',
        type: FormFieldType.autocomplete,
        multiple: true,
        filters: FORM_FILES_IMAGE_FILTER,
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
    Editable('FormField', {
        title: 'DOCUMENT',
        type: FormFieldType.autocomplete,
        collectionName: 'files',
        condition: conditions$1.isDocument,
        columnDefinition: { name: '_filename' }
    }),
    __metadata("design:type", Object)
], FormField.prototype, "document", void 0);
__decorate([
    Editable('FormField', { type: FormFieldType.checkbox, condition: conditions$1.hasMultiple }),
    __metadata("design:type", Boolean)
], FormField.prototype, "multiple", void 0);
__decorate([
    Editable('FormField', {
        title: 'BUTTONS',
        type: FormFieldType.checkbox,
        condition: conditions$1.isStarRating
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "useButtons", void 0);
__decorate([
    Editable('FormField', {
        title: 'MODE',
        type: FormFieldType.autocomplete,
        values: ['youtube', 'url'],
        translate: true,
        condition: conditions$1.isVideoplayer,
        required: true
    }),
    __metadata("design:type", String)
], FormField.prototype, "mode", void 0);
__decorate([
    Editable('FormField', {
        visible: false,
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions$1.missionIsQuizz,
        dynamicValues: 'values'
    }),
    __metadata("design:type", Array)
], FormField.prototype, "answer", void 0);
__decorate([
    Editable('FormField', {
        visible: false,
        type: FormFieldType.textarea,
        condition: conditions$1.missionIsQuizz
    }),
    __metadata("design:type", String)
], FormField.prototype, "explanation", void 0);
__decorate([
    Editable('FormField', {
        title: 'EXPLANATIONDOCUMENT',
        type: FormFieldType.autocomplete,
        collectionName: 'files',
        condition: conditions$1.missionIsQuizz,
        columnDefinition: { name: '_filename' }
    }),
    __metadata("design:type", Object)
], FormField.prototype, "explanationDocument", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.number,
        condition: [conditions$1.isMultiPhotos],
        flex: 50,
        externalValidators: [{ externalFieldName: 'maxPhotos', rule: 'lower' }]
    }),
    __metadata("design:type", Number)
], FormField.prototype, "minPhotos", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.number,
        condition: [conditions$1.isMultiPhotos],
        flex: 50,
        required: true,
        externalValidators: [{ externalFieldName: 'minPhotos', rule: 'higher' }]
    }),
    __metadata("design:type", Number)
], FormField.prototype, "maxPhotos", void 0);
__decorate([
    Editable('FormField', {
        title: 'MANDATORY',
        type: FormFieldType.checkbox,
        condition: conditions$1.isNotInformationOrDocumentOrImage,
        flex: 50
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "required", void 0);
__decorate([
    Editable('FormField', {
        title: 'ALLOWCOMMENTS',
        type: FormFieldType.checkbox,
        condition: conditions$1.isNotInformation,
        flex: 50
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "allowComments", void 0);
__decorate([
    Editable('FormField', {
        title: 'AUTORELOAD',
        type: FormFieldType.checkbox,
        condition: conditions$1.isNotInformation,
        flex: 50
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "autoreload", void 0);
__decorate([
    Editable('FormField', {
        title: 'ALLOWTASK',
        type: FormFieldType.checkbox,
        condition: [conditions$1.isNotInformationOrTask, ROLES_CONDITIONS.hasTodo],
        flex: 50
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "allowTask", void 0);
__decorate([
    Editable('FormField', {
        title: 'SHARETOFEED',
        type: FormFieldType.checkbox,
        flex: 50,
        condition: [conditions$1.isPhoto]
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "shareToFeed", void 0);
__decorate([
    Editable('FormField', {
        title: 'ALLPHOTOSREQUIRED',
        type: FormFieldType.checkbox,
        flex: 100,
        condition: [conditions$1.isTodo]
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "allPhotosRequired", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.checkbox,
        condition: conditions$1.isAutocomplete,
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "clearable", void 0);
__decorate([
    Editable('FormField', {
        title: 'ALLOWTIME',
        type: FormFieldType.checkbox,
        condition: [conditions$1.isNotInformation],
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "allowTime", void 0);
__decorate([
    Editable('FormField', {
        title: 'ALLOWLIBRARY',
        type: FormFieldType.checkbox,
        condition: conditions$1.hasAllowLibrary,
        flex: 100
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "allowLibrary", void 0);
__decorate([
    Editable('FormField', {
        title: 'GEOLOC',
        type: FormFieldType.checkbox,
        condition: conditions$1.isPhotoOrVideo,
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "saveGeoloc", void 0);
__decorate([
    Editable('FormField', {
        title: 'ALLOWHISTORY',
        type: FormFieldType.checkbox,
        condition: [ROLES_CONDITIONS.hasTodoOrScore],
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "allowHistory", void 0);
__decorate([
    Editable('FormField', {
        title: 'ALLOWOPENDETAILS',
        type: FormFieldType.checkbox,
        flex: 100,
        condition: conditions$1.isSelectImage,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "allowOpenDetails", void 0);
__decorate([
    Editable('FormField', {
        title: 'LINKTOPREVIOUSQUESTION',
        type: FormFieldType.checkbox,
        flex: 100,
        condition: [conditions$1.isTodo],
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "linked", void 0);
__decorate([
    Editable('FormField', {
        title: 'ALLOWANNOTATE',
        type: FormFieldType.checkbox,
        condition: [conditions$1.isPhoto],
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "allowAnnotate", void 0);
__decorate([
    Editable('FormField', {
        title: 'SHOWUSERSEMAIL',
        type: FormFieldType.checkbox,
        condition: conditions$1.isEmailReport,
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "showUsers", void 0);
__decorate([
    Editable('FormField', {
        title: 'HIDEMOBILE',
        type: FormFieldType.checkbox,
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "hideMobile", void 0);
__decorate([
    Editable('FormField', {
        title: 'OTHER1',
        type: FormFieldType.checkbox,
        condition: conditions$1.isSelect,
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "allowOther", void 0);
__decorate([
    Editable('FormField', { type: FormFieldType.checkbox, flex: 100, advanced: true }),
    __metadata("design:type", Boolean)
], FormField.prototype, "readonly", void 0);
__decorate([
    Editable('FormField', {
        title: 'RADIUS',
        type: FormFieldType.number,
        condition: conditions$1.isAdress,
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Number)
], FormField.prototype, "radius", void 0);
__decorate([
    Editable('FormField', {
        title: 'MIN',
        type: FormFieldType.number,
        condition: conditions$1.isNumberOrRange,
        flex: 100,
        advanced: false,
        externalValidators: [{ externalFieldName: 'max', rule: 'lower' }]
    }),
    __metadata("design:type", Number)
], FormField.prototype, "min", void 0);
__decorate([
    Editable('FormField', {
        title: 'MAX',
        type: FormFieldType.number,
        condition: conditions$1.isNumberOrRangeOrStarrating,
        flex: 100,
        advanced: false,
        externalValidators: [{ externalFieldName: 'min', rule: 'higher' }]
    }),
    __metadata("design:type", Number)
], FormField.prototype, "max", void 0);
__decorate([
    Editable('FormField', {
        title: 'STEP',
        type: FormFieldType.number,
        condition: conditions$1.isNumber,
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Number)
], FormField.prototype, "step", void 0);
__decorate([
    Editable('FormField', {
        title: 'MIN',
        type: FormFieldType.date,
        condition: conditions$1.isDate,
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Date)
], FormField.prototype, "minDate", void 0);
__decorate([
    Editable('FormField', {
        title: 'MAX',
        type: FormFieldType.date,
        condition: conditions$1.isDate,
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Date)
], FormField.prototype, "maxDate", void 0);
__decorate([
    Editable('FormField', {
        title: 'SHOWSERVICE',
        type: FormFieldType.checkbox,
        flex: 100,
        condition: ROLES_CONDITIONS.hasService,
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "showService", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.number,
        condition: [conditions$1.isPhoto],
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Number)
], FormField.prototype, "maxWidth", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.number,
        condition: [conditions$1.isPhoto],
        flex: 100,
        advanced: true
    }),
    __metadata("design:type", Number)
], FormField.prototype, "maxHeight", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.toggle,
        condition: [conditions$1.isPhoto, ROLES_CONDITIONS.isAdmin],
        flex: 100,
        title: 'PHOTOLIVECOUNTER',
        advanced: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "isImageRecognition", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.toggle,
        condition: [conditions$1.isImageRecognition, ROLES_CONDITIONS.isAdmin],
        flex: 100,
        title: 'BACKGROUNDPROCESS',
        advanced: true,
        translate: true
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "isBackgroundProcess", void 0);
__decorate([
    Editable('FormField', {
        title: 'DONTSAVEIFHIDDEN',
        type: FormFieldType.checkbox,
        flex: 100,
        advanced: true,
        condition: conditions$1.isReadOnly
    }),
    __metadata("design:type", Boolean)
], FormField.prototype, "dontSaveIfHidden", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
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
    Editable('FormField', {
        type: FormFieldType.json,
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
    Editable('FormField', {
        title: 'DURATIONMAX',
        type: FormFieldType.number,
        condition: conditions$1.isAudioOrVideo,
        flex: 100,
        max: 60
    }),
    __metadata("design:type", Number)
], FormField.prototype, "duration", void 0);
__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        multiple: true,
        clearable: true,
        advanced: true
    }),
    __metadata("design:type", Array)
], FormField.prototype, "condition", void 0);
__decorate([
    Editable('FormField', {
        title: 'FLEX',
        type: FormFieldType.number,
        flex: 100,
        min: 0,
        max: 100,
        advanced: true
    }),
    __metadata("design:type", Number)
], FormField.prototype, "flex", void 0);
__decorate([
    Editable('FormField', {
        title: 'LEGEND',
        type: FormFieldType.textarea,
        condition: conditions$1.isNotInformation,
        advanced: true
    }),
    __metadata("design:type", String)
], FormField.prototype, "caption", void 0);
__decorate([
    Editable('FormField', {
        title: 'REPORTORDER',
        type: FormFieldType.number,
        condition: [ROLES_CONDITIONS.hasTodoOrScore],
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
    Model({ className: 'FormField' })
], FormField);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let GridState = class GridState extends Entity {
};
__decorate([
    Editable('GridState', { required: true, type: FormFieldType.text }),
    Searchable('GridState'),
    __metadata("design:type", String)
], GridState.prototype, "title", void 0);
__decorate([
    Editable('GridState', { required: true, title: 'DESCRIPTION', type: FormFieldType.textarea }),
    Searchable('GridState'),
    __metadata("design:type", String)
], GridState.prototype, "description", void 0);
__decorate([
    Editable('GridState', {
        title: 'GROUPS',
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true
    }),
    __metadata("design:type", Object)
], GridState.prototype, "group", void 0);
GridState = __decorate([
    Model({
        className: 'GridState',
        collectionName: 'gridstate',
        fields: ['*'],
        include: []
    })
], GridState);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DataFormModule, CustomFormField, FormField, GridState, CustomModel, CellRenderer, Chart, FormDynamicBuilder, Conditions, Mapping, CustomModels };

//# sourceMappingURL=data-form.js.map
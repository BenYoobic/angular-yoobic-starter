/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Colors } from '@shared/common';
import { Models } from '@shared/data-core';
import { FormFieldType } from '@shared/stencil';
import { cloneDeep, concat } from 'lodash-es';
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
    function (field, translate, visibleFields, sortModel, component) {
        /** @type {?} */
        var fieldName = Models.getFieldName(field);
        /** @type {?} */
        var col = (/** @type {?} */ ({
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
    function (multiple, rowModelType, infiniteScrolling, pageSize, translate) {
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
    };
    /**
     * @param {?} translate
     * @return {?}
     */
    CellRenderer.getPivotConfig = /**
     * @param {?} translate
     * @return {?}
     */
    function (translate) {
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
    };
    /**
     * @param {?} translate
     * @return {?}
     */
    CellRenderer.getTranslation = /**
     * @param {?} translate
     * @return {?}
     */
    function (translate) {
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
    function (collectionName, translate, campaignFields, customColumnDefs, includeDistance, infiniteScrolling, itemButtons, colMinWidth, visibleFields, sortModel, grid, hiddenColumns) {
        /** @type {?} */
        var columnDefs = [];
        if (customColumnDefs && customColumnDefs.length > 0) {
            columnDefs = cloneDeep(customColumnDefs);
        }
        else {
            if (!collectionName) {
                return;
            } // || (items && items.length > 0)
            // || (items && items.length > 0)
            /** @type {?} */
            var formFields = [];
            /** @type {?} */
            var model = Models.getModelByCollectionName(collectionName);
            if (model) {
                formFields = model.formFields;
                if (campaignFields && campaignFields.length > 0) {
                    campaignFields = cloneDeep(campaignFields);
                    campaignFields.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return (c.name += '.value'); }));
                    formFields = concat(formFields, campaignFields);
                }
            }
            columnDefs = [];
            formFields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                /** @type {?} */
                var colEdit;
                /** @type {?} */
                var col = CellRenderer.getColumnDefinition(field, translate, visibleFields, sortModel, grid);
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
                    for (var i = 0; i < field.maxPhotos; i++) {
                        /** @type {?} */
                        var colPhoto = cloneDeep(col);
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
            var distanceField = {
                name: 'distance',
                title: 'Distance',
                type: FormFieldType.number,
                columnDefinition: { width: 150 },
                isDistanceField: true
            };
            /** @type {?} */
            var distanceCol = CellRenderer.getColumnDefinition(distanceField, translate);
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
                function (params) { return params.node.id + 1; })
            });
        }
        if (itemButtons && itemButtons.length > 0) {
            itemButtons.forEach((/**
             * @param {?} button
             * @return {?}
             */
            function (button) {
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
                    function (params) {
                        button.handler(params.data && params.data.toJS ? params.data.toJS() : params.data);
                        return false;
                    })
                });
            }));
        }
        return columnDefs;
    };
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
    return CellRenderer;
}());
export { CellRenderer };
if (false) {
    /** @type {?} */
    CellRenderer.colors;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZW5kZXJlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NlbGwtcmVuZGVyZXIvY2VsbC1yZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxFQUFjLGFBQWEsRUFBcUIsTUFBTSxpQkFBaUIsQ0FBQztBQUUvRSxPQUFPLEVBQXdELFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFcEc7SUFBQTtJQXNnQkEsQ0FBQzs7Ozs7SUE3YWUscUJBQVE7Ozs7SUFBdEIsVUFBdUIsR0FBRzs7Ozs7UUFDeEIsU0FBUyxXQUFXLENBQUMsS0FBSztZQUN4QixPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDO1FBQzVCLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7Ozs7OztJQUVhLGdDQUFtQjs7Ozs7Ozs7SUFBakMsVUFBa0MsS0FBaUIsRUFBRSxTQUFjLEVBQUUsYUFBNkIsRUFBRSxTQUFzQixFQUFFLFNBQXVGOztZQUM3TSxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7O1lBQ3RDLEdBQUcsR0FBUSxtQkFBSztZQUNsQixVQUFVLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDO1lBQ2xELGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUM7WUFDckQsS0FBSyxFQUFFLFNBQVM7WUFDaEIsUUFB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RSxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUM1RjtZQUNFLElBQUksRUFBRSxjQUFjO1lBQ3BCLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUUsU0FBUztZQUNoQixLQUFLLEVBQUUsRUFBRTtZQUNULFNBQVMsRUFBRSxNQUFNLENBQUMsT0FBTztTQUMxQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDcEIsS0FBSyxFQUFFLFFBQVE7WUFDZixLQUFLLEVBQUUsRUFBRTtZQUNULFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTTtTQUN6QjtRQUNEO1lBQ0UsSUFBSSxFQUFFLGVBQWU7WUFDckIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLEVBQUU7WUFDVCxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUs7U0FDeEI7S0FDRixDQUFDOztnQkF2RkgsVUFBVTs7SUFzZ0JYLG1CQUFDO0NBQUEsQUF0Z0JELElBc2dCQztTQXJnQlksWUFBWTs7O0lBQ3ZCLG9CQXFGRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcbmltcG9ydCB7IENvbG9ycyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcblxuaW1wb3J0IHsgTW9kZWxzIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgSUZvcm1GaWVsZCwgRm9ybUZpZWxkVHlwZSwgSUNvbHVtbkRlZmluaXRpb24gfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBzdW0gYXMgX3N1bSwgbWluIGFzIF9taW4sIG1heCBhcyBfbWF4LCBrZXlzIGFzIF9rZXlzLCBjbG9uZURlZXAsIGNvbmNhdCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDZWxsUmVuZGVyZXIge1xuICBwdWJsaWMgc3RhdGljIGNvbG9ycyA9IFtcbiAgICB7IG5hbWU6ICdmaW5pc2hlZCcsIHZhbHVlOiBDb2xvcnMuYmxhY2ssIGNsYXNzOiAnYmxhY2snLCBpbmRleDogMCwgdGV4dFZhbHVlOiBDb2xvcnMubGlnaHQgfSxcbiAgICB7IG5hbWU6ICdib29rZWQnLCB2YWx1ZTogQ29sb3JzLndhcm5pbmcsIGNsYXNzOiAnd2FybmluZycsIGluZGV4OiAxLCB0ZXh0VmFsdWU6IENvbG9ycy5ibGFjayB9LFxuICAgIHsgbmFtZTogJ2F2YWlsYWJsZScsIHZhbHVlOiBDb2xvcnMuc3RhYmxlLCBjbGFzczogJ3N0YWJsZScsIGluZGV4OiAyLCB0ZXh0VmFsdWU6IENvbG9ycy5ibGFjayB9LFxuICAgIHsgbmFtZTogJ3Zpc2l0ZWQnLCB2YWx1ZTogQ29sb3JzLmJsYWNrLCBjbGFzczogJ2JsYWNrJywgaW5kZXg6IDMsIHRleHRWYWx1ZTogQ29sb3JzLmxpZ2h0IH0sXG4gICAge1xuICAgICAgbmFtZTogJ25vdHZpc2l0ZWQnLFxuICAgICAgdmFsdWU6IENvbG9ycy5zdGFibGUsXG4gICAgICBjbGFzczogJ3N0YWJsZScsXG4gICAgICBpbmRleDogNCxcbiAgICAgIHRleHRWYWx1ZTogQ29sb3JzLmJsYWNrXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnYW5hbHl6ZWQnLFxuICAgICAgdmFsdWU6IENvbG9ycy5zdWNjZXNzLFxuICAgICAgY2xhc3M6ICdzdWNjZXNzJyxcbiAgICAgIGluZGV4OiA1LFxuICAgICAgdGV4dFZhbHVlOiBDb2xvcnMuYmxhY2tcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd2YWxpZGF0ZWQnLFxuICAgICAgdmFsdWU6IENvbG9ycy5zdWNjZXNzLFxuICAgICAgY2xhc3M6ICdzdWNjZXNzJyxcbiAgICAgIGluZGV4OiA2LFxuICAgICAgdGV4dFZhbHVlOiBDb2xvcnMuYmxhY2tcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd0b2JldmFsaWRhdGVkJyxcbiAgICAgIHZhbHVlOiBDb2xvcnMuc3RhYmxlLFxuICAgICAgY2xhc3M6ICdzdGFibGUnLFxuICAgICAgaW5kZXg6IDcsXG4gICAgICB0ZXh0VmFsdWU6IENvbG9ycy5saWdodFxuICAgIH0sXG4gICAgeyBuYW1lOiAncmVqZWN0ZWQnLCB2YWx1ZTogQ29sb3JzLmRhbmdlciwgY2xhc3M6ICdkYW5nZXInLCBpbmRleDogOCwgdGV4dFZhbHVlOiBDb2xvcnMubGlnaHQgfSxcbiAgICB7IG5hbWU6ICdwcm9ncmVzcycsIHZhbHVlOiBDb2xvcnMuc3RhYmxlLCBjbGFzczogJ3N0YWJsZScsIGluZGV4OiA5LCB0ZXh0VmFsdWU6IENvbG9ycy5ibGFjayB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd2YWxpZGF0aW9ucHJvZ3Jlc3MnLFxuICAgICAgdmFsdWU6IENvbG9ycy5zdGFibGUsXG4gICAgICBjbGFzczogJ3N0YWJsZScsXG4gICAgICBpbmRleDogMTAsXG4gICAgICB0ZXh0VmFsdWU6IENvbG9ycy5ibGFja1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2NvbmZvcm1pdHlwcm9ncmVzcycsXG4gICAgICB2YWx1ZTogQ29sb3JzLnN0YWJsZSxcbiAgICAgIGNsYXNzOiAnc3RhYmxlJyxcbiAgICAgIGluZGV4OiAxMSxcbiAgICAgIHRleHRWYWx1ZTogQ29sb3JzLmJsYWNrXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnY29uZm9ybWl0eXJlbGF0aXZlcHJvZ3Jlc3MnLFxuICAgICAgdmFsdWU6IENvbG9ycy5zdGFibGUsXG4gICAgICBjbGFzczogJ3N0YWJsZScsXG4gICAgICBpbmRleDogMTIsXG4gICAgICB0ZXh0VmFsdWU6IENvbG9ycy5ibGFja1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ29udGltZScsXG4gICAgICB2YWx1ZTogQ29sb3JzLnN1Y2Nlc3MsXG4gICAgICBjbGFzczogJ3N1Y2Nlc3MnLFxuICAgICAgaW5kZXg6IDEzLFxuICAgICAgdGV4dFZhbHVlOiBDb2xvcnMuc3VjY2Vzc1xuICAgIH0sXG4gICAgeyBuYW1lOiAnbGF0ZScsIHZhbHVlOiBDb2xvcnMuZGFuZ2VyLCBjbGFzczogJ2RhbmdlcicsIGluZGV4OiAxNCwgdGV4dFZhbHVlOiBDb2xvcnMuZGFuZ2VyIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3NhdGlzZmFjdG9yeScsXG4gICAgICB2YWx1ZTogQ29sb3JzLnN1Y2Nlc3MsXG4gICAgICBjbGFzczogJ3N1Y2Nlc3MnLFxuICAgICAgaW5kZXg6IDE1LFxuICAgICAgdGV4dFZhbHVlOiBDb2xvcnMuc3VjY2Vzc1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3Vuc2F0aXNmYWN0b3J5JyxcbiAgICAgIHZhbHVlOiBDb2xvcnMuZGFuZ2VyLFxuICAgICAgY2xhc3M6ICdkYW5nZXInLFxuICAgICAgaW5kZXg6IDE2LFxuICAgICAgdGV4dFZhbHVlOiBDb2xvcnMuZGFuZ2VyXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbm9uYXBwbGljYWJsZScsXG4gICAgICB2YWx1ZTogQ29sb3JzLmJsYWNrLFxuICAgICAgY2xhc3M6ICdibGFjaycsXG4gICAgICBpbmRleDogMTcsXG4gICAgICB0ZXh0VmFsdWU6IENvbG9ycy5saWdodFxuICAgIH1cbiAgXTtcblxuICBwdWJsaWMgc3RhdGljIGdldENvbG9yKGtleSkge1xuICAgIGZ1bmN0aW9uIGlzU2FtZUNvbG9yKGNvbG9yKSB7XG4gICAgICByZXR1cm4gY29sb3IubmFtZSA9PT0ga2V5O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbG9ycy5maW5kKGlzU2FtZUNvbG9yKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Q29sdW1uRGVmaW5pdGlvbihmaWVsZDogSUZvcm1GaWVsZCwgdHJhbnNsYXRlOiBhbnksIHZpc2libGVGaWVsZHM/OiBBcnJheTxzdHJpbmc+LCBzb3J0TW9kZWw/OiBBcnJheTxhbnk+LCBjb21wb25lbnQ/OiB7IHBob3Rvcz86IEFycmF5PGFueT47IG9uUGhvdG9TZWxlY3Q/OiBGdW5jdGlvbjsgb25WaWRlb1NlbGVjdD86IEZ1bmN0aW9uIH0pOiBhbnkge1xuICAgIGxldCBmaWVsZE5hbWUgPSBNb2RlbHMuZ2V0RmllbGROYW1lKGZpZWxkKTtcbiAgICBsZXQgY29sOiBhbnkgPSA8YW55PntcbiAgICAgIGhlYWRlck5hbWU6IE1vZGVscy5nZXRGaWVsZFRpdGxlKGZpZWxkLCB0cmFuc2xhdGUpLFxuICAgICAgaGVhZGVyVG9vbHRpcDogTW9kZWxzLmdldEZpZWxkVGl0bGUoZmllbGQsIHRyYW5zbGF0ZSksXG4gICAgICBmaWVsZDogZmllbGROYW1lLFxuICAgICAgbWluV2lkdGg6IGZpZWxkLmNvbHVtbkRlZmluaXRpb24gJiYgZmllbGQuY29sdW1uRGVmaW5pdGlvbi53aWR0aCA/IGZpZWxkLmNvbHVtbkRlZmluaXRpb24ud2lkdGggOiA0MCxcbiAgICAgIHdpZHRoOiBmaWVsZC5jb2x1bW5EZWZpbml0aW9uICYmIGZpZWxkLmNvbHVtbkRlZmluaXRpb24ud2lkdGggPyBmaWVsZC5jb2x1bW5EZWZpbml0aW9uLndpZHRoIDogMTAwLFxuICAgICAgaGlkZTogZmllbGQudmlzaWJsZSA9PT0gZmFsc2UgfHwgKGZpZWxkLmNvbHVtbkRlZmluaXRpb24gPyBmaWVsZC5jb2x1bW5EZWZpbml0aW9uLmhpZGRlbiA6IGZhbHNlKSxcbiAgICAgIHNvcnRhYmxlOiAhKGZpZWxkLmNvbHVtbkRlZmluaXRpb24gJiYgZmllbGQuY29sdW1uRGVmaW5pdGlvbi5uYW1lICYmIGZpZWxkLmNvbHVtbkRlZmluaXRpb24gJiYgZmllbGQuY29sdW1uRGVmaW5pdGlvbi5uYW1lLmxlbmd0aCA+IDApLFxuICAgICAgZm9yY2VFeHBvcnQ6IGZpZWxkLmZvcmNlRXhwb3J0LFxuICAgICAgZXhwb3J0T3JkZXI6IGZpZWxkLmV4cG9ydE9yZGVyLFxuICAgICAgc3VwcHJlc3NFeHBvcnQ6IGZpZWxkLnN1cHByZXNzRXhwb3J0LFxuICAgICAgbWVudVRhYnM6IFsnZmlsdGVyTWVudVRhYiddXG4gICAgfTtcblxuICAgIGlmIChmaWVsZC50eXBlKSB7XG4gICAgICAoPGFueT5jb2wpLnR5cGUgPSBmaWVsZC50eXBlO1xuICAgIH1cblxuICAgIGlmICh2aXNpYmxlRmllbGRzICYmIHZpc2libGVGaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgY29sLmhpZGUgPSB2aXNpYmxlRmllbGRzLmluZGV4T2YoZmllbGROYW1lKSA8IDA7XG4gICAgfVxuICAgIGlmIChzb3J0TW9kZWwgJiYgc29ydE1vZGVsLmluZGV4T2YoeyBjb2xJZDogY29sLmZpZWxkLCBzb3J0OiAnYXNjJyB9KSA+PSAwKSB7XG4gICAgICBjb2wuc29ydCA9ICdhc2MnO1xuICAgIH1cbiAgICBpZiAoc29ydE1vZGVsICYmIHNvcnRNb2RlbC5pbmRleE9mKHsgY29sSWQ6IGNvbC5maWVsZCwgc29ydDogJ2Rlc2MnIH0pID49IDApIHtcbiAgICAgIGNvbC5zb3J0ID0gJ2Rlc2MnO1xuICAgIH1cbiAgICBpZiAoY29sLmhlYWRlck5hbWUgJiYgY29sLmhlYWRlck5hbWUudG9VcHBlckNhc2UoKSA9PT0gY29sLmhlYWRlck5hbWUpIHtcbiAgICAgIGNvbC5oZWFkZXJOYW1lID0gdHJhbnNsYXRlLmdldChjb2wuaGVhZGVyTmFtZSk7XG4gICAgfVxuXG4gICAgaWYgKE1vZGVscy5pc0Jvb2xlYW5GaWVsZChmaWVsZCkpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAnYm9vbGVhblJlbmRlcmVyJztcbiAgICB9IGVsc2UgaWYgKE1vZGVscy5pc1ZpZGVvRmllbGQoZmllbGQpKSB7XG4gICAgICBjb2wuY2VsbFJlbmRlcmVyID0gJ3ZpZGVvUmVuZGVyZXInOyAvL1ZpZGVvUmVuZGVyZXJDb21wb25lbnQ7XG4gICAgICAvLyBjb2wub25DZWxsQ2xpY2tlZCA9IChwYXJhbXMpID0+IHtcbiAgICAgIC8vICAgICBsZXQgdXJsID0gRGVmYXVsdFJlbmRlcmVyQ29tcG9uZW50LnJlbmRlcmVyKHBhcmFtcyk7XG4gICAgICAvLyAgICAgaWYgKHVybCAmJiBjb21wb25lbnQgJiYgY29tcG9uZW50Lm9uVmlkZW9TZWxlY3QpIHtcbiAgICAgIC8vICAgICAgICAgY29tcG9uZW50Lm9uVmlkZW9TZWxlY3QodXJsKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyB9O1xuICAgIH0gZWxzZSBpZiAoTW9kZWxzLmlzUGhvdG9GaWVsZChmaWVsZCkpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAncGhvdG9SZW5kZXJlcic7XG4gICAgICAvLyBjb2wub25DZWxsQ2xpY2tlZCA9IChwYXJhbXMpID0+IHtcbiAgICAgIC8vICAgICBsZXQgcGhvdG8gPSBNb2RlbHMuZ2V0UGhvdG9Gcm9tUGFyYW1zKHBhcmFtcyk7XG4gICAgICAvLyAgICAgaWYgKHBob3RvICYmIGNvbXBvbmVudCAmJiBjb21wb25lbnQub25QaG90b1NlbGVjdCkge1xuICAgICAgLy8gICAgICAgICBjb21wb25lbnQub25QaG90b1NlbGVjdChwaG90byk7XG4gICAgICAvLyAgICAgfVxuXG4gICAgICAvLyB9O1xuICAgIH0gZWxzZSBpZiAoTW9kZWxzLmlzTXVsdGlQaG90b3NGaWVsZChmaWVsZCkpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAnbXVsdGlwaG90b1JlbmRlcmVyJztcbiAgICAgIC8vIGNvbC5vbkNlbGxDbGlja2VkID0gKHBhcmFtcykgPT4ge1xuICAgICAgLy8gICAgIGxldCBwaG90b3MgPSBNb2RlbHMuZ2V0UGhvdG9zRnJvbVBhcmFtcyhwYXJhbXMpO1xuICAgICAgLy8gICAgIGlmIChwaG90b3MgJiYgcGhvdG9zLmxlbmd0aCA+IDAgJiYgY29tcG9uZW50ICYmIGNvbXBvbmVudC5vblBob3RvU2VsZWN0KSB7XG4gICAgICAvLyAgICAgICAgIGNvbXBvbmVudC5vblBob3RvU2VsZWN0KHBob3Rvc1swXSk7XG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gfTtcbiAgICB9IGVsc2UgaWYgKCg8YW55PmZpZWxkKS5pc0Rpc3RhbmNlRmllbGQgPT09IHRydWUpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAnZGlzdGFuY2VSZW5kZXJlcic7XG4gICAgICBjb2wuc29ydGFibGUgPSBmYWxzZTtcbiAgICAgIGNvbC5jb21wYXJhdG9yID0gJ2Rpc3RhbmNlQ29tcGFyYXRvcic7XG4gICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLm51bWJlcikge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdudW1iZXJSZW5kZXJlcic7XG4gICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLmRhdGUpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAnZGF0ZVJlbmRlcmVyJztcbiAgICB9IGVsc2UgaWYgKE1vZGVscy5pc0RhdGVUaW1lRmllbGQoZmllbGQpKSB7XG4gICAgICBjb2wuY2VsbFJlbmRlcmVyID0gJ2RhdGVUaW1lUmVuZGVyZXInO1xuICAgIH0gZWxzZSBpZiAoZmllbGQudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS50aW1lKSB7XG4gICAgICBjb2wuY2VsbFJlbmRlcmVyID0gJ3RpbWVSZW5kZXJlcic7XG4gICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLmFkZHJlc3MpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAnYWRkcmVzc1JlbmRlcmVyJztcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUubG9jYXRpb24pIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAnbG9jYXRpb25SZW5kZXJlcic7XG4gICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLnN0YXJyYXRpbmcpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAnc3RhcnJhdGluZ1JlbmRlcmVyJztcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXJQYXJhbXMgPSB7IG1heDogZmllbGQubWF4IH07XG4gICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLnRvZG8pIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAndG9kb1JlbmRlcmVyJztcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUudGltZXIpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAndGltZXJSZW5kZXJlcic7XG4gICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLmNoZWNrbGlzdCkge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdjaGVja2xpc3RSZW5kZXJlcic7XG4gICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSAmJiBmaWVsZC5jb2xsZWN0aW9uTmFtZSAmJiBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGZpZWxkLmNvbGxlY3Rpb25OYW1lKSAmJiBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGZpZWxkLmNvbGxlY3Rpb25OYW1lKS5pc0N1c3RvbSkge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdjdXN0b21Nb2RlbFJlbmRlcmVyJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdkZWZhdWx0UmVuZGVyZXInO1xuICAgIH1cblxuICAgIGlmIChmaWVsZC5jb2x1bW5EZWZpbml0aW9uICYmIGZpZWxkLmNvbHVtbkRlZmluaXRpb24ucmVuZGVyZXJUeXBlKSB7XG4gICAgICBzd2l0Y2ggKGZpZWxkLmNvbHVtbkRlZmluaXRpb24ucmVuZGVyZXJUeXBlKSB7XG4gICAgICAgIGNhc2UgJ3BlcmNlbnRhZ2UnOlxuICAgICAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAncGVyY2VudGFnZVJlbmRlcmVyJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdkdXJhdGlvbic6XG4gICAgICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdkdXJhdGlvblJlbmRlcmVyJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd1c2VyZnVsbG5hbWUnOlxuICAgICAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAndXNlckZ1bGxOYW1lUmVuZGVyZXInO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmllbGQuY29sdW1uRGVmaW5pdGlvbiAmJiBmaWVsZC5jb2x1bW5EZWZpbml0aW9uLmNlbGxSZW5kZXJlcikge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9IGZpZWxkLmNvbHVtbkRlZmluaXRpb24uY2VsbFJlbmRlcmVyO1xuICAgIH1cbiAgICByZXR1cm4gY29sO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRDb2x1bW5UeXBlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkcmVzczoge30sXG4gICAgICBhdWRpbzoge30sXG4gICAgICBhdXRvY29tcGxldGU6IHt9LFxuICAgICAgYmFyY29kZToge30sXG4gICAgICAnYmV0d2Vlbi1kYXRlJzoge30sXG4gICAgICAnYmV0d2Vlbi1udW1iZXInOiB7fSxcbiAgICAgIGJ1dHRvbjoge30sXG4gICAgICBjYXRhbG9nOiB7fSxcbiAgICAgIGNoZWNrYm94OiB7fSxcbiAgICAgIGNvbG9yOiB7fSxcbiAgICAgIGRhdGU6IHt9LFxuICAgICAgZGF0ZXJhbmdlOiB7fSxcbiAgICAgICdkYXRldGltZS1sb2NhbCc6IHt9LFxuICAgICAgZG9jdW1lbnQ6IHt9LFxuICAgICAgZG9jdW1lbnR1cGxvYWRlcjoge30sXG4gICAgICBlbWFpbDoge30sXG4gICAgICBlbWFpbHJlcG9ydDoge30sXG4gICAgICBmaWx0ZXI6IHt9LFxuICAgICAgZ3JpZDoge30sXG4gICAgICBpbWFnZToge30sXG4gICAgICBpbmZvcm1hdGlvbjoge30sXG4gICAgICBpbnR0ZWw6IHt9LFxuICAgICAgaW52aXRlOiB7fSxcbiAgICAgIGpzb246IHt9LFxuICAgICAgbG9jYXRpb246IHt9LFxuICAgICAgbWlzc2lvbmZpZWxkOiB7fSxcbiAgICAgIG1pc3Npb25zY29yZToge30sXG4gICAgICBudW1iZXI6IHt9LFxuICAgICAgcGFzc3dvcmQ6IHt9LFxuICAgICAgbXVsdGlwaG90b3M6IHt9LFxuICAgICAgcGhvdG86IHt9LFxuICAgICAgcHJvZHVjdGNoZWNrOiB7fSxcbiAgICAgIHJhbmdlOiB7fSxcbiAgICAgIHJhbmtpbmc6IHt9LFxuICAgICAgc2VsZWN0OiB7fSxcbiAgICAgIHNlbGVjdGJ1dHRvbnM6IHt9LFxuICAgICAgc2VsZWN0YnV0dG9uc211bHRpOiB7fSxcbiAgICAgIHNlbGVjdGltYWdlOiB7fSxcbiAgICAgIHNlbGVjdG11bHRpOiB7fSxcbiAgICAgIHNpZ25hdHVyZToge30sXG4gICAgICBzdGFycmF0aW5nOiB7fSxcbiAgICAgIHN0cmluZzoge30sXG4gICAgICBzdHJpcGVjYXJkOiB7fSxcbiAgICAgIHRlbDoge30sXG4gICAgICB0ZXh0OiB7fSxcbiAgICAgIHRleHRhcmVhOiB7fSxcbiAgICAgIHRpbWU6IHt9LFxuICAgICAgdGltZXI6IHt9LFxuICAgICAgdG9kbzoge30sXG4gICAgICB0b2dnbGU6IHt9LFxuICAgICAgdmlkZW86IHt9LFxuICAgICAga25vYjoge30sXG4gICAgICBzZWxlY3RjaGF0OiB7fSxcbiAgICAgIG1pc3Npbmd3b3JkOiB7fSxcbiAgICAgIHN3aXBlc2VsZWN0OiB7fSxcbiAgICAgIGNoZWNrbGlzdDoge30sXG4gICAgICBmb3JtdWxhOiB7fSxcbiAgICAgIHZpZGVvcGxheWVyOiB7fVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldENvbmZpZyhtdWx0aXBsZTogYm9vbGVhbiwgcm93TW9kZWxUeXBlOiBzdHJpbmcsIGluZmluaXRlU2Nyb2xsaW5nOiBib29sZWFuLCBwYWdlU2l6ZTogbnVtYmVyLCB0cmFuc2xhdGU6IFRyYW5zbGF0ZSk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvd0hlaWdodDogNTIsXG4gICAgICByb3dTdHlsZTogeyAnbGluZS1oZWlnaHQnOiAnMzJweCcgfSxcbiAgICAgIGhlYWRlckhlaWdodDogNDAsXG4gICAgICBkZWZhdWx0Q29sRGVmOiB7IHNvcnRhYmxlOiB0cnVlLCByZXNpemFibGU6IHRydWUgfSxcbiAgICAgIHJvd0Rlc2VsZWN0aW9uOiB0cnVlLFxuICAgICAgcm93U2VsZWN0aW9uOiBtdWx0aXBsZSA/ICdtdWx0aXBsZScgOiAnc2luZ2xlJyxcbiAgICAgIHJvd01vZGVsVHlwZTogcm93TW9kZWxUeXBlIHx8ICdzZXJ2ZXJTaWRlJyxcbiAgICAgIHJvd0J1ZmZlcjogMCxcbiAgICAgIG1heENvbmN1cnJlbnREYXRhc291cmNlUmVxdWVzdHM6IDEsXG4gICAgICBpbmZpbml0ZUluaXRpYWxSb3dDb3VudDogcGFnZVNpemUsXG4gICAgICBjYWNoZU92ZXJmbG93U2l6ZTogMixcbiAgICAgIC8vbWF4QmxvY2tzSW5DYWNoZTogMTAsXG4gICAgICBwYWdpbmF0aW9uOiAhaW5maW5pdGVTY3JvbGxpbmcsXG4gICAgICBwYWdpbmF0aW9uUGFnZVNpemU6IHBhZ2VTaXplLFxuICAgICAgY2FjaGVCbG9ja1NpemU6IHBhZ2VTaXplLFxuICAgICAgc3VwcHJlc3NQcm9wZXJ0eU5hbWVzQ2hlY2s6IHRydWUsXG4gICAgICBhbmltYXRlUm93czogdHJ1ZSxcbiAgICAgIGxvY2FsZVRleHQ6IENlbGxSZW5kZXJlci5nZXRUcmFuc2xhdGlvbih0cmFuc2xhdGUpLFxuICAgICAgLy9zdXBwcmVzc0NvbnRleHRNZW51OiB0cnVlLFxuICAgICAgY29sdW1uVHlwZXM6IENlbGxSZW5kZXJlci5nZXRDb2x1bW5UeXBlcygpXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0UGl2b3RDb25maWcodHJhbnNsYXRlOiBUcmFuc2xhdGUpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICByb3dIZWlnaHQ6IDUyLFxuICAgICAgcm93U3R5bGU6IHsgJ2xpbmUtaGVpZ2h0JzogJzMycHgnIH0sXG4gICAgICBoZWFkZXJIZWlnaHQ6IDQwLFxuICAgICAgZGVmYXVsdENvbERlZjogeyBzb3J0YWJsZTogdHJ1ZSwgcmVzaXphYmxlOiB0cnVlIH0sXG4gICAgICBmaWx0ZXI6IHRydWUsXG4gICAgICBzdXBwcmVzc1ByZXZlbnREZWZhdWx0T25Nb3VzZVdoZWVsOiBmYWxzZSxcbiAgICAgIHN1cHByZXNzUHJvcGVydHlOYW1lc0NoZWNrOiB0cnVlLFxuICAgICAgcmVtZW1iZXJHcm91cFN0YXRlV2hlbk5ld0RhdGE6IHRydWUsXG4gICAgICBzdXBwcmVzc0FnZ0Z1bmNJbkhlYWRlcjogdHJ1ZSxcbiAgICAgIGdyb3VwRGVmYXVsdEV4cGFuZGVkOiAwLFxuICAgICAgZ3JvdXBTdXBwcmVzc0dyb3VwQ29sdW1uOiB0cnVlLFxuICAgICAgc3VwcHJlc3NSb3dIb3ZlckNsYXNzOiB0cnVlLFxuICAgICAgYXV0b0dyb3VwQ29sdW1uRGVmOiB7XG4gICAgICAgIGhlYWRlck5hbWU6IHRyYW5zbGF0ZS5nZXQoJ0dST1VQJyksXG4gICAgICAgIGNlbGxSZW5kZXJlcjogJ2FnR3JvdXBDZWxsUmVuZGVyZXInLFxuICAgICAgICBjb21wYXJhdG9yOiAnZGVmYXVsdEdyb3VwQ29tcGFyYXRvcidcbiAgICAgIH0sXG4gICAgICBpY29uczoge1xuICAgICAgICBtZW51OiAnPHlvby1pY29uIGNsYXNzPVwieW8tbWVudVwiPjwveW9vLWljb24+JyxcbiAgICAgICAgZmlsdGVyOiAnPHlvby1pY29uIGNsYXNzPVwieW8tZmlsdGVyXCI+PC95b28taWNvbj4nLFxuICAgICAgICBncm91cEV4cGFuZGVkOiAnPHlvby1pY29uIGNsYXNzPVwieW8tY2lyY2xlLW1pbm9yXCI+PC95b28taWNvbj4nLFxuICAgICAgICBncm91cENvbnRyYWN0ZWQ6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1jaXJjbGUtcGx1c1wiPjwveW9vLWljb24+JyxcbiAgICAgICAgY29sdW1uR3JvdXBPcGVuZWQ6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1ub2RhdGFcIj48L3lvby1pY29uPicsXG4gICAgICAgIGNvbHVtbkdyb3VwQ2xvc2VkOiAnPHlvby1pY29uIGNsYXNzPVwieW8tcGx1c1wiPjwveW9vLWljb24+JyxcbiAgICAgICAgY29sdW1uU2VsZWN0T3BlbjogJzx5b28taWNvbiBjbGFzcz1cInlvLW5vZGF0YVwiPjwveW9vLWljb24+JyxcbiAgICAgICAgY29sdW1uU2VsZWN0Q2xvc2VkOiAnPHlvby1pY29uIGNsYXNzPVwieW8tcGx1c1wiPjwveW9vLWljb24+JyxcbiAgICAgICAgY2hlY2tib3hDaGVja2VkOiAnPHlvby1pY29uIGNsYXNzPVwieW8tY2hlY2tcIj48L3lvby1pY29uPicsXG4gICAgICAgIGNoZWNrYm94VW5jaGVja2VkOiAnPHlvby1pY29uIGNsYXNzPVwieW8tY2lyY2xlXCI+PC95b28taWNvbj4nLFxuICAgICAgICBjaGVja2JveEluZGV0ZXJtaW5hdGU6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1jaXJjbGVcIj48L3lvby1pY29uPicsXG4gICAgICAgIHNvcnRBc2NlbmRpbmc6ICc8eW9vLWljb24gY2xhc3M9XCJ5by11cFwiPjwveW9vLWljb24+JyxcbiAgICAgICAgc29ydERlc2NlbmRpbmc6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1kb3duXCI+PC95b28taWNvbj4nLFxuICAgICAgICBjb2x1bW5Nb3ZlR3JvdXA6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1kaXJlY3Rpb24tc2VsZWN0XCI+PC95b28taWNvbj4nLFxuICAgICAgICBkcm9wTm90QWxsb3dlZDogJzx5b28taWNvbiBjbGFzcz1cInlvLXJlamVjdGVkMlwiPjwveW9vLWljb24+J1xuICAgICAgfSxcbiAgICAgIGNvbHVtblR5cGVzOiBDZWxsUmVuZGVyZXIuZ2V0Q29sdW1uVHlwZXMoKSxcbiAgICAgIGxvY2FsZVRleHQ6IENlbGxSZW5kZXJlci5nZXRUcmFuc2xhdGlvbih0cmFuc2xhdGUpLFxuICAgICAgZ3JvdXBVc2VFbnRpcmVSb3c6IGZhbHNlLFxuICAgICAgZ3JvdXBSb3dJbm5lclJlbmRlcmVyOiAncHJvZ3Jlc3NSZW5kZXJlcidcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRUcmFuc2xhdGlvbih0cmFuc2xhdGU6IFRyYW5zbGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiAnPGkgY2xhc3M9XCJ5by1yaWdodFwiPjwvaT4nLFxuICAgICAgcHJldmlvdXM6ICc8aSBjbGFzcz1cInlvLWxlZnRcIj48L2k+JyxcbiAgICAgIHBhZ2U6ICcgJyxcbiAgICAgIG9mOiAnLycsXG4gICAgICBtb3JlOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURNT1JFJyksXG4gICAgICB0bzogJyAtICcsXG4gICAgICBsb2FkaW5nT29vOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURMT0FESU5HT09PJyksXG4gICAgICBzZWxlY3RBbGw6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFNFTEVDVEFMTCcpLFxuICAgICAgc2VhcmNoT29vOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURTRUFSQ0hPT08nKSxcbiAgICAgIGJsYW5rczogdHJhbnNsYXRlLmdldCgnQUdHUklEQkxBTktTJyksXG4gICAgICBmaWx0ZXJPb286IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJREZJTFRFUk9PTycpLFxuICAgICAgYXBwbHlGaWx0ZXI6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJREFQUExZRklMVEVSJyksXG4gICAgICBlcXVhbHM6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJREVRVUFMUycpLFxuICAgICAgbGVzc1RoYW46IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRExFU1NUSEFOJyksXG4gICAgICBncmVhdGVyVGhhbjogdHJhbnNsYXRlLmdldCgnQUdHUklER1JFQVRFUlRIQU4nKSxcbiAgICAgIGNvbnRhaW5zOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURDT05UQUlOUycpLFxuICAgICAgc3RhcnRzV2l0aDogdHJhbnNsYXRlLmdldCgnQUdHUklEU1RBUlRTV0lUSCcpLFxuICAgICAgZW5kc1dpdGg6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJREVORFNXSVRIJyksXG4gICAgICBncm91cDogdHJhbnNsYXRlLmdldCgnQUdHUklER1JPVVAnKSxcbiAgICAgIGNvbHVtbnM6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRENPTFVNTlMnKSxcbiAgICAgIHJvd0dyb3VwQ29sdW1uczogdHJhbnNsYXRlLmdldCgnQUdHUklEUk9XR1JPVVBDT0xVTU5TJyksXG4gICAgICByb3dHcm91cENvbHVtbnNFbXB0eU1lc3NhZ2U6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFJPV0dST1VQQ09MVU1OU0VNUFRZTUVTU0FHRScpLFxuICAgICAgdmFsdWVDb2x1bW5zOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURWQUxVRUNPTFVNTlMnKSxcbiAgICAgIHBpdm90TW9kZTogdHJhbnNsYXRlLmdldCgnQUdHUklEUElWT1RNT0RFJyksXG4gICAgICBncm91cHM6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJREdST1VQUycpLFxuICAgICAgdmFsdWVzOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURWQUxVRVMnKSxcbiAgICAgIHBpdm90czogdHJhbnNsYXRlLmdldCgnQUdHUklEUElWT1RTJyksXG4gICAgICB2YWx1ZUNvbHVtbnNFbXB0eU1lc3NhZ2U6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFZBTFVFQ09MVU1OU0VNUFRZTUVTU0FHRScpLFxuICAgICAgcGl2b3RDb2x1bW5zRW1wdHlNZXNzYWdlOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURQSVZPVENPTFVNTlNFTVBUWU1FU1NBR0UnKSxcbiAgICAgIG5vUm93c1RvU2hvdzogdHJhbnNsYXRlLmdldCgnQUdHUklETk9ST1dTVE9TSE9XJyksXG4gICAgICBwaW5Db2x1bW46IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFBJTkNPTFVNTicpLFxuICAgICAgdmFsdWVBZ2dyZWdhdGlvbjogdHJhbnNsYXRlLmdldCgnQUdHUklEVkFMVUVBR0dSRUdBVElPTicpLFxuICAgICAgYXV0b3NpemVUaGlzY29sdW1uOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURBVVRPU0laRVRISVNDT0xVTU4nKSxcbiAgICAgIGF1dG9zaXplQWxsQ29sdW1uczogdHJhbnNsYXRlLmdldCgnQUdHUklEQVVUT1NJWkVBTExDT0xVTU5TJyksXG4gICAgICBncm91cEJ5OiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURHUk9VUEJZJyksXG4gICAgICB1bmdyb3VwQnk6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFVOR1JPVVBCWScpLFxuICAgICAgcmVzZXRDb2x1bW5zOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURSRVNFVENPTFVNTlMnKSxcbiAgICAgIGV4cGFuZEFsbDogdHJhbnNsYXRlLmdldCgnQUdHUklERVhQQU5EQUxMJyksXG4gICAgICBjb2xsYXBzZUFsbDogdHJhbnNsYXRlLmdldCgnQUdHUklEQ09MTEFQU0VBTEwnKSxcbiAgICAgIHRvb2xQYW5lbDogdHJhbnNsYXRlLmdldCgnQUdHUklEVE9PTFBBTkVMJyksXG4gICAgICBwaW5MZWZ0OiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURQSU5MRUZUJyksXG4gICAgICBwaW5SaWdodDogdHJhbnNsYXRlLmdldCgnQUdHUklEUElOUklHSFQnKSxcbiAgICAgIG5vUGluOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSUROT1BJTicpLFxuICAgICAgc3VtOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURTVU0nKSxcbiAgICAgIG1pbjogdHJhbnNsYXRlLmdldCgnQUdHUklETUlOJyksXG4gICAgICBtYXg6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRE1BWCcpLFxuICAgICAgbm9uZTogdHJhbnNsYXRlLmdldCgnQUdHUklETk9ORScpLFxuICAgICAgY291bnQ6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRENPVU5UJyksXG4gICAgICBhdmVyYWdlOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURBVkVSQUdFJyksXG4gICAgICBhdmc6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJREFWRVJBR0UnKSxcbiAgICAgIGNvcHk6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRENPUFknKSxcbiAgICAgIGN0cmxDOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURDVFJMQycpLFxuICAgICAgcGFzdGU6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFBBU1RFJyksXG4gICAgICBjdHJsVjogdHJhbnNsYXRlLmdldCgnQUdHUklEQ1RSTFYnKVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbHVtbkRlZnMoY29sbGVjdGlvbk5hbWU/OiBzdHJpbmcsIHRyYW5zbGF0ZT86IFRyYW5zbGF0ZSwgY2FtcGFpZ25GaWVsZHM/OiBBcnJheTxhbnk+LCBjdXN0b21Db2x1bW5EZWZzPzogQXJyYXk8YW55PiwgaW5jbHVkZURpc3RhbmNlPzogYm9vbGVhbiwgaW5maW5pdGVTY3JvbGxpbmc/OiBib29sZWFuLCBpdGVtQnV0dG9ucz86IEFycmF5PGFueT4sIGNvbE1pbldpZHRoPzogbnVtYmVyLCB2aXNpYmxlRmllbGRzPywgc29ydE1vZGVsPywgZ3JpZD8sIGhpZGRlbkNvbHVtbnM/KSB7XG4gICAgbGV0IGNvbHVtbkRlZnM6IEFycmF5PElDb2x1bW5EZWZpbml0aW9uPiA9IFtdO1xuICAgIGlmIChjdXN0b21Db2x1bW5EZWZzICYmIGN1c3RvbUNvbHVtbkRlZnMubGVuZ3RoID4gMCkge1xuICAgICAgY29sdW1uRGVmcyA9IGNsb25lRGVlcChjdXN0b21Db2x1bW5EZWZzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIHx8IChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKVxuICAgICAgbGV0IGZvcm1GaWVsZHM6IEFycmF5PElGb3JtRmllbGQ+ID0gW107XG4gICAgICBsZXQgbW9kZWwgPSBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgIGlmIChtb2RlbCkge1xuICAgICAgICBmb3JtRmllbGRzID0gbW9kZWwuZm9ybUZpZWxkcztcbiAgICAgICAgaWYgKGNhbXBhaWduRmllbGRzICYmIGNhbXBhaWduRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjYW1wYWlnbkZpZWxkcyA9IGNsb25lRGVlcChjYW1wYWlnbkZpZWxkcyk7XG4gICAgICAgICAgY2FtcGFpZ25GaWVsZHMuZm9yRWFjaChjID0+IChjLm5hbWUgKz0gJy52YWx1ZScpKTtcbiAgICAgICAgICBmb3JtRmllbGRzID0gY29uY2F0KGZvcm1GaWVsZHMsIGNhbXBhaWduRmllbGRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29sdW1uRGVmcyA9IFtdO1xuICAgICAgZm9ybUZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgbGV0IGNvbEVkaXQ7XG4gICAgICAgIGxldCBjb2wgPSBDZWxsUmVuZGVyZXIuZ2V0Q29sdW1uRGVmaW5pdGlvbihmaWVsZCwgdHJhbnNsYXRlLCB2aXNpYmxlRmllbGRzLCBzb3J0TW9kZWwsIGdyaWQpO1xuICAgICAgICBpZiAoY29sTWluV2lkdGggPiAwICYmIGNvbC5taW5XaWR0aCA9PT0gNDApIHtcbiAgICAgICAgICBjb2wubWluV2lkdGggPSBjb2xNaW5XaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjb2wubWVudVRhYnMgPSBbXTtcbiAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuY2F0YWxvZykge1xuICAgICAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAnY2F0YWxvZ1JlbmRlcmVyJztcbiAgICAgICAgICBjb2wuaXNDaGVjayA9IGZpZWxkLmNoZWNrO1xuICAgICAgICAgIGNvbC5pc1ByZXNlbmNlID0gZmllbGQucHJlc2VuY2U7XG4gICAgICAgICAgY29sLmlzSW52ZW50b3J5ID0gZmllbGQuaW52ZW50b3J5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLm11bHRpcGhvdG9zKSB7XG4gICAgICAgICAgY29sLnN1cHByZXNzRXhwb3J0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL2lmIChjb2wuaGlkZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAoIWhpZGRlbkNvbHVtbnMgfHwgaGlkZGVuQ29sdW1ucy5pbmRleE9mKGNvbC5maWVsZCkgPCAwKSB7XG4gICAgICAgICAgY29sdW1uRGVmcy5wdXNoKGNvbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLmlzSW1hZ2VSZWNvZ25pdGlvbiAmJiBmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLnBob3RvKSB7XG4gICAgICAgICAgY29sRWRpdCA9IGNsb25lRGVlcChjb2wpO1xuICAgICAgICAgIGNvbEVkaXQuaGlkZSA9IHRydWU7XG4gICAgICAgICAgY29sRWRpdC5oZWFkZXJOYW1lICs9ICcgLSBNYXJrdXAnO1xuICAgICAgICAgIGNvbEVkaXQuZm9yY2VFeHBvcnQgPSB0cnVlO1xuICAgICAgICAgIGNvbEVkaXQuZmllbGQgPSBjb2xFZGl0LmZpZWxkLnJlcGxhY2UoJy52YWx1ZScsICcuZWRpdCcpO1xuICAgICAgICAgIGNvbHVtbkRlZnMucHVzaChjb2xFZGl0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmllbGQudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5tdWx0aXBob3Rvcykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGQubWF4UGhvdG9zOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb2xQaG90byA9IGNsb25lRGVlcChjb2wpO1xuICAgICAgICAgICAgY29sUGhvdG8uaGlkZSA9IHRydWU7XG4gICAgICAgICAgICBjb2xQaG90by5zdXBwcmVzc0V4cG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgY29sUGhvdG8uaGVhZGVyTmFtZSArPSAnICcgKyBpO1xuICAgICAgICAgICAgY29sUGhvdG8uZm9yY2VFeHBvcnQgPSB0cnVlO1xuICAgICAgICAgICAgY29sUGhvdG8uZmllbGQgPSBjb2xQaG90by5maWVsZC5yZXBsYWNlKCcudmFsdWUnLCAnLnZhbHVlWycgKyBpICsgJ10nKTtcbiAgICAgICAgICAgIGNvbHVtbkRlZnMucHVzaChjb2xQaG90byk7XG5cbiAgICAgICAgICAgIGlmIChmaWVsZC5pc0ltYWdlUmVjb2duaXRpb24pIHtcbiAgICAgICAgICAgICAgY29sRWRpdCA9IGNsb25lRGVlcChjb2wpO1xuICAgICAgICAgICAgICBjb2xFZGl0LmhpZGUgPSB0cnVlO1xuICAgICAgICAgICAgICBjb2xFZGl0LnN1cHByZXNzRXhwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbEVkaXQuaGVhZGVyTmFtZSArPSAnIC0gTWFya3VwICcgKyBpO1xuICAgICAgICAgICAgICBjb2xFZGl0LmZvcmNlRXhwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY29sRWRpdC5maWVsZCA9IGNvbEVkaXQuZmllbGQucmVwbGFjZSgnLnZhbHVlJywgJy5leHRyYURhdGFbJyArIGkgKyAnXS5lZGl0Jyk7XG4gICAgICAgICAgICAgIGNvbHVtbkRlZnMucHVzaChjb2xFZGl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy99XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaW5jbHVkZURpc3RhbmNlKSB7XG4gICAgICBsZXQgZGlzdGFuY2VGaWVsZCA9IHtcbiAgICAgICAgbmFtZTogJ2Rpc3RhbmNlJyxcbiAgICAgICAgdGl0bGU6ICdEaXN0YW5jZScsXG4gICAgICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgICAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiAxNTAgfSxcbiAgICAgICAgaXNEaXN0YW5jZUZpZWxkOiB0cnVlXG4gICAgICB9O1xuICAgICAgbGV0IGRpc3RhbmNlQ29sID0gQ2VsbFJlbmRlcmVyLmdldENvbHVtbkRlZmluaXRpb24oZGlzdGFuY2VGaWVsZCwgdHJhbnNsYXRlKTtcbiAgICAgIGNvbHVtbkRlZnMucHVzaChkaXN0YW5jZUNvbCk7XG4gICAgfVxuXG4gICAgaWYgKGluZmluaXRlU2Nyb2xsaW5nID09PSB0cnVlKSB7XG4gICAgICBjb2x1bW5EZWZzLnVuc2hpZnQoe1xuICAgICAgICBoZWFkZXJOYW1lOiAnIycsXG4gICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgY2VsbFJlbmRlcmVyOiBwYXJhbXMgPT4gcGFyYW1zLm5vZGUuaWQgKyAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbUJ1dHRvbnMgJiYgaXRlbUJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgaXRlbUJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBjb2x1bW5EZWZzLnB1c2goe1xuICAgICAgICAgIC8vbWluV2lkdGg6IDQ1LFxuICAgICAgICAgIHdpZHRoOiA0NSxcbiAgICAgICAgICAvL2hlYWRlckNsYXNzOiAnY2VudGVyZWQnLFxuICAgICAgICAgIGNlbGxDbGFzczogJ292ZXJmbG93JyxcbiAgICAgICAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgICAgICAgc3VwcHJlc3NGaWx0ZXI6IHRydWUsXG4gICAgICAgICAgcGlubmVkOiAncmlnaHQnLFxuICAgICAgICAgIG1lbnVUYWJzOiBbJ2ZpbHRlck1lbnVUYWInXSxcbiAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICBpY29uOiBidXR0b24uaWNvbixcbiAgICAgICAgICAgIGNvbG9yOiBidXR0b24uY29sb3IsXG4gICAgICAgICAgICB0ZXh0OiBidXR0b24udGV4dFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2VsbFJlbmRlcmVyOiAnYnV0dG9uUmVuZGVyZXInLFxuICAgICAgICAgIG9uQ2VsbENsaWNrZWQ6IHBhcmFtcyA9PiB7XG4gICAgICAgICAgICBidXR0b24uaGFuZGxlcihwYXJhbXMuZGF0YSAmJiBwYXJhbXMuZGF0YS50b0pTID8gcGFyYW1zLmRhdGEudG9KUygpIDogcGFyYW1zLmRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbkRlZnM7XG4gIH1cbn1cbiJdfQ==
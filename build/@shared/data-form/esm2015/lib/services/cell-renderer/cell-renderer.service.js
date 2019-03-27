/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Colors } from '@shared/common';
import { Models } from '@shared/data-core';
import { FormFieldType } from '@shared/stencil';
import { cloneDeep, concat } from 'lodash-es';
export class CellRenderer {
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
if (false) {
    /** @type {?} */
    CellRenderer.colors;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZW5kZXJlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NlbGwtcmVuZGVyZXIvY2VsbC1yZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxFQUFjLGFBQWEsRUFBcUIsTUFBTSxpQkFBaUIsQ0FBQztBQUUvRSxPQUFPLEVBQXdELFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHcEcsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBd0ZoQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUc7Ozs7O1FBQ3hCLFNBQVMsV0FBVyxDQUFDLEtBQUs7WUFDeEIsT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQztRQUM1QixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7Ozs7SUFFTSxNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBaUIsRUFBRSxTQUFjLEVBQUUsYUFBNkIsRUFBRSxTQUFzQixFQUFFLFNBQXVGOztZQUM3TSxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7O1lBQ3RDLEdBQUcsR0FBUSxtQkFBSztZQUNsQixVQUFVLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDO1lBQ2xELGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUM7WUFDckQsS0FBSyxFQUFFLFNBQVM7WUFDaEIsUUFBUSxFQUFF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RSxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUU7SUFDOUYsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtJQUM5RjtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNO1FBQ3BCLEtBQUssRUFBRSxRQUFRO1FBQ2YsS0FBSyxFQUFFLEVBQUU7UUFDVCxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDeEI7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNO1FBQ3BCLEtBQUssRUFBRSxRQUFRO1FBQ2YsS0FBSyxFQUFFLEVBQUU7UUFDVCxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDeEI7SUFDRDtRQUNFLElBQUksRUFBRSw0QkFBNEI7UUFDbEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNO1FBQ3BCLEtBQUssRUFBRSxRQUFRO1FBQ2YsS0FBSyxFQUFFLEVBQUU7UUFDVCxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDeEI7SUFDRDtRQUNFLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1FBQ3JCLEtBQUssRUFBRSxTQUFTO1FBQ2hCLEtBQUssRUFBRSxFQUFFO1FBQ1QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPO0tBQzFCO0lBQ0QsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTtJQUM1RjtRQUNFLElBQUksRUFBRSxjQUFjO1FBQ3BCLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTztRQUNyQixLQUFLLEVBQUUsU0FBUztRQUNoQixLQUFLLEVBQUUsRUFBRTtRQUNULFNBQVMsRUFBRSxNQUFNLENBQUMsT0FBTztLQUMxQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU07UUFDcEIsS0FBSyxFQUFFLFFBQVE7UUFDZixLQUFLLEVBQUUsRUFBRTtRQUNULFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTTtLQUN6QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1FBQ25CLEtBQUssRUFBRSxPQUFPO1FBQ2QsS0FBSyxFQUFFLEVBQUU7UUFDVCxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDeEI7Q0FDRixDQUFDOztZQXZGSCxVQUFVOzs7O0lBRVQsb0JBcUZFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuaW1wb3J0IHsgQ29sb3JzIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuXG5pbXBvcnQgeyBNb2RlbHMgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBJRm9ybUZpZWxkLCBGb3JtRmllbGRUeXBlLCBJQ29sdW1uRGVmaW5pdGlvbiB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmltcG9ydCB7IHN1bSBhcyBfc3VtLCBtaW4gYXMgX21pbiwgbWF4IGFzIF9tYXgsIGtleXMgYXMgX2tleXMsIGNsb25lRGVlcCwgY29uY2F0IH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENlbGxSZW5kZXJlciB7XG4gIHB1YmxpYyBzdGF0aWMgY29sb3JzID0gW1xuICAgIHsgbmFtZTogJ2ZpbmlzaGVkJywgdmFsdWU6IENvbG9ycy5ibGFjaywgY2xhc3M6ICdibGFjaycsIGluZGV4OiAwLCB0ZXh0VmFsdWU6IENvbG9ycy5saWdodCB9LFxuICAgIHsgbmFtZTogJ2Jvb2tlZCcsIHZhbHVlOiBDb2xvcnMud2FybmluZywgY2xhc3M6ICd3YXJuaW5nJywgaW5kZXg6IDEsIHRleHRWYWx1ZTogQ29sb3JzLmJsYWNrIH0sXG4gICAgeyBuYW1lOiAnYXZhaWxhYmxlJywgdmFsdWU6IENvbG9ycy5zdGFibGUsIGNsYXNzOiAnc3RhYmxlJywgaW5kZXg6IDIsIHRleHRWYWx1ZTogQ29sb3JzLmJsYWNrIH0sXG4gICAgeyBuYW1lOiAndmlzaXRlZCcsIHZhbHVlOiBDb2xvcnMuYmxhY2ssIGNsYXNzOiAnYmxhY2snLCBpbmRleDogMywgdGV4dFZhbHVlOiBDb2xvcnMubGlnaHQgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbm90dmlzaXRlZCcsXG4gICAgICB2YWx1ZTogQ29sb3JzLnN0YWJsZSxcbiAgICAgIGNsYXNzOiAnc3RhYmxlJyxcbiAgICAgIGluZGV4OiA0LFxuICAgICAgdGV4dFZhbHVlOiBDb2xvcnMuYmxhY2tcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdhbmFseXplZCcsXG4gICAgICB2YWx1ZTogQ29sb3JzLnN1Y2Nlc3MsXG4gICAgICBjbGFzczogJ3N1Y2Nlc3MnLFxuICAgICAgaW5kZXg6IDUsXG4gICAgICB0ZXh0VmFsdWU6IENvbG9ycy5ibGFja1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3ZhbGlkYXRlZCcsXG4gICAgICB2YWx1ZTogQ29sb3JzLnN1Y2Nlc3MsXG4gICAgICBjbGFzczogJ3N1Y2Nlc3MnLFxuICAgICAgaW5kZXg6IDYsXG4gICAgICB0ZXh0VmFsdWU6IENvbG9ycy5ibGFja1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3RvYmV2YWxpZGF0ZWQnLFxuICAgICAgdmFsdWU6IENvbG9ycy5zdGFibGUsXG4gICAgICBjbGFzczogJ3N0YWJsZScsXG4gICAgICBpbmRleDogNyxcbiAgICAgIHRleHRWYWx1ZTogQ29sb3JzLmxpZ2h0XG4gICAgfSxcbiAgICB7IG5hbWU6ICdyZWplY3RlZCcsIHZhbHVlOiBDb2xvcnMuZGFuZ2VyLCBjbGFzczogJ2RhbmdlcicsIGluZGV4OiA4LCB0ZXh0VmFsdWU6IENvbG9ycy5saWdodCB9LFxuICAgIHsgbmFtZTogJ3Byb2dyZXNzJywgdmFsdWU6IENvbG9ycy5zdGFibGUsIGNsYXNzOiAnc3RhYmxlJywgaW5kZXg6IDksIHRleHRWYWx1ZTogQ29sb3JzLmJsYWNrIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3ZhbGlkYXRpb25wcm9ncmVzcycsXG4gICAgICB2YWx1ZTogQ29sb3JzLnN0YWJsZSxcbiAgICAgIGNsYXNzOiAnc3RhYmxlJyxcbiAgICAgIGluZGV4OiAxMCxcbiAgICAgIHRleHRWYWx1ZTogQ29sb3JzLmJsYWNrXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnY29uZm9ybWl0eXByb2dyZXNzJyxcbiAgICAgIHZhbHVlOiBDb2xvcnMuc3RhYmxlLFxuICAgICAgY2xhc3M6ICdzdGFibGUnLFxuICAgICAgaW5kZXg6IDExLFxuICAgICAgdGV4dFZhbHVlOiBDb2xvcnMuYmxhY2tcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdjb25mb3JtaXR5cmVsYXRpdmVwcm9ncmVzcycsXG4gICAgICB2YWx1ZTogQ29sb3JzLnN0YWJsZSxcbiAgICAgIGNsYXNzOiAnc3RhYmxlJyxcbiAgICAgIGluZGV4OiAxMixcbiAgICAgIHRleHRWYWx1ZTogQ29sb3JzLmJsYWNrXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnb250aW1lJyxcbiAgICAgIHZhbHVlOiBDb2xvcnMuc3VjY2VzcyxcbiAgICAgIGNsYXNzOiAnc3VjY2VzcycsXG4gICAgICBpbmRleDogMTMsXG4gICAgICB0ZXh0VmFsdWU6IENvbG9ycy5zdWNjZXNzXG4gICAgfSxcbiAgICB7IG5hbWU6ICdsYXRlJywgdmFsdWU6IENvbG9ycy5kYW5nZXIsIGNsYXNzOiAnZGFuZ2VyJywgaW5kZXg6IDE0LCB0ZXh0VmFsdWU6IENvbG9ycy5kYW5nZXIgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnc2F0aXNmYWN0b3J5JyxcbiAgICAgIHZhbHVlOiBDb2xvcnMuc3VjY2VzcyxcbiAgICAgIGNsYXNzOiAnc3VjY2VzcycsXG4gICAgICBpbmRleDogMTUsXG4gICAgICB0ZXh0VmFsdWU6IENvbG9ycy5zdWNjZXNzXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAndW5zYXRpc2ZhY3RvcnknLFxuICAgICAgdmFsdWU6IENvbG9ycy5kYW5nZXIsXG4gICAgICBjbGFzczogJ2RhbmdlcicsXG4gICAgICBpbmRleDogMTYsXG4gICAgICB0ZXh0VmFsdWU6IENvbG9ycy5kYW5nZXJcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdub25hcHBsaWNhYmxlJyxcbiAgICAgIHZhbHVlOiBDb2xvcnMuYmxhY2ssXG4gICAgICBjbGFzczogJ2JsYWNrJyxcbiAgICAgIGluZGV4OiAxNyxcbiAgICAgIHRleHRWYWx1ZTogQ29sb3JzLmxpZ2h0XG4gICAgfVxuICBdO1xuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Q29sb3Ioa2V5KSB7XG4gICAgZnVuY3Rpb24gaXNTYW1lQ29sb3IoY29sb3IpIHtcbiAgICAgIHJldHVybiBjb2xvci5uYW1lID09PSBrZXk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29sb3JzLmZpbmQoaXNTYW1lQ29sb3IpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRDb2x1bW5EZWZpbml0aW9uKGZpZWxkOiBJRm9ybUZpZWxkLCB0cmFuc2xhdGU6IGFueSwgdmlzaWJsZUZpZWxkcz86IEFycmF5PHN0cmluZz4sIHNvcnRNb2RlbD86IEFycmF5PGFueT4sIGNvbXBvbmVudD86IHsgcGhvdG9zPzogQXJyYXk8YW55Pjsgb25QaG90b1NlbGVjdD86IEZ1bmN0aW9uOyBvblZpZGVvU2VsZWN0PzogRnVuY3Rpb24gfSk6IGFueSB7XG4gICAgbGV0IGZpZWxkTmFtZSA9IE1vZGVscy5nZXRGaWVsZE5hbWUoZmllbGQpO1xuICAgIGxldCBjb2w6IGFueSA9IDxhbnk+e1xuICAgICAgaGVhZGVyTmFtZTogTW9kZWxzLmdldEZpZWxkVGl0bGUoZmllbGQsIHRyYW5zbGF0ZSksXG4gICAgICBoZWFkZXJUb29sdGlwOiBNb2RlbHMuZ2V0RmllbGRUaXRsZShmaWVsZCwgdHJhbnNsYXRlKSxcbiAgICAgIGZpZWxkOiBmaWVsZE5hbWUsXG4gICAgICBtaW5XaWR0aDogZmllbGQuY29sdW1uRGVmaW5pdGlvbiAmJiBmaWVsZC5jb2x1bW5EZWZpbml0aW9uLndpZHRoID8gZmllbGQuY29sdW1uRGVmaW5pdGlvbi53aWR0aCA6IDQwLFxuICAgICAgd2lkdGg6IGZpZWxkLmNvbHVtbkRlZmluaXRpb24gJiYgZmllbGQuY29sdW1uRGVmaW5pdGlvbi53aWR0aCA/IGZpZWxkLmNvbHVtbkRlZmluaXRpb24ud2lkdGggOiAxMDAsXG4gICAgICBoaWRlOiBmaWVsZC52aXNpYmxlID09PSBmYWxzZSB8fCAoZmllbGQuY29sdW1uRGVmaW5pdGlvbiA/IGZpZWxkLmNvbHVtbkRlZmluaXRpb24uaGlkZGVuIDogZmFsc2UpLFxuICAgICAgc29ydGFibGU6ICEoZmllbGQuY29sdW1uRGVmaW5pdGlvbiAmJiBmaWVsZC5jb2x1bW5EZWZpbml0aW9uLm5hbWUgJiYgZmllbGQuY29sdW1uRGVmaW5pdGlvbiAmJiBmaWVsZC5jb2x1bW5EZWZpbml0aW9uLm5hbWUubGVuZ3RoID4gMCksXG4gICAgICBmb3JjZUV4cG9ydDogZmllbGQuZm9yY2VFeHBvcnQsXG4gICAgICBleHBvcnRPcmRlcjogZmllbGQuZXhwb3J0T3JkZXIsXG4gICAgICBzdXBwcmVzc0V4cG9ydDogZmllbGQuc3VwcHJlc3NFeHBvcnQsXG4gICAgICBtZW51VGFiczogWydmaWx0ZXJNZW51VGFiJ11cbiAgICB9O1xuXG4gICAgaWYgKGZpZWxkLnR5cGUpIHtcbiAgICAgICg8YW55PmNvbCkudHlwZSA9IGZpZWxkLnR5cGU7XG4gICAgfVxuXG4gICAgaWYgKHZpc2libGVGaWVsZHMgJiYgdmlzaWJsZUZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb2wuaGlkZSA9IHZpc2libGVGaWVsZHMuaW5kZXhPZihmaWVsZE5hbWUpIDwgMDtcbiAgICB9XG4gICAgaWYgKHNvcnRNb2RlbCAmJiBzb3J0TW9kZWwuaW5kZXhPZih7IGNvbElkOiBjb2wuZmllbGQsIHNvcnQ6ICdhc2MnIH0pID49IDApIHtcbiAgICAgIGNvbC5zb3J0ID0gJ2FzYyc7XG4gICAgfVxuICAgIGlmIChzb3J0TW9kZWwgJiYgc29ydE1vZGVsLmluZGV4T2YoeyBjb2xJZDogY29sLmZpZWxkLCBzb3J0OiAnZGVzYycgfSkgPj0gMCkge1xuICAgICAgY29sLnNvcnQgPSAnZGVzYyc7XG4gICAgfVxuICAgIGlmIChjb2wuaGVhZGVyTmFtZSAmJiBjb2wuaGVhZGVyTmFtZS50b1VwcGVyQ2FzZSgpID09PSBjb2wuaGVhZGVyTmFtZSkge1xuICAgICAgY29sLmhlYWRlck5hbWUgPSB0cmFuc2xhdGUuZ2V0KGNvbC5oZWFkZXJOYW1lKTtcbiAgICB9XG5cbiAgICBpZiAoTW9kZWxzLmlzQm9vbGVhbkZpZWxkKGZpZWxkKSkge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdib29sZWFuUmVuZGVyZXInO1xuICAgIH0gZWxzZSBpZiAoTW9kZWxzLmlzVmlkZW9GaWVsZChmaWVsZCkpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAndmlkZW9SZW5kZXJlcic7IC8vVmlkZW9SZW5kZXJlckNvbXBvbmVudDtcbiAgICAgIC8vIGNvbC5vbkNlbGxDbGlja2VkID0gKHBhcmFtcykgPT4ge1xuICAgICAgLy8gICAgIGxldCB1cmwgPSBEZWZhdWx0UmVuZGVyZXJDb21wb25lbnQucmVuZGVyZXIocGFyYW1zKTtcbiAgICAgIC8vICAgICBpZiAodXJsICYmIGNvbXBvbmVudCAmJiBjb21wb25lbnQub25WaWRlb1NlbGVjdCkge1xuICAgICAgLy8gICAgICAgICBjb21wb25lbnQub25WaWRlb1NlbGVjdCh1cmwpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vIH07XG4gICAgfSBlbHNlIGlmIChNb2RlbHMuaXNQaG90b0ZpZWxkKGZpZWxkKSkge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdwaG90b1JlbmRlcmVyJztcbiAgICAgIC8vIGNvbC5vbkNlbGxDbGlja2VkID0gKHBhcmFtcykgPT4ge1xuICAgICAgLy8gICAgIGxldCBwaG90byA9IE1vZGVscy5nZXRQaG90b0Zyb21QYXJhbXMocGFyYW1zKTtcbiAgICAgIC8vICAgICBpZiAocGhvdG8gJiYgY29tcG9uZW50ICYmIGNvbXBvbmVudC5vblBob3RvU2VsZWN0KSB7XG4gICAgICAvLyAgICAgICAgIGNvbXBvbmVudC5vblBob3RvU2VsZWN0KHBob3RvKTtcbiAgICAgIC8vICAgICB9XG5cbiAgICAgIC8vIH07XG4gICAgfSBlbHNlIGlmIChNb2RlbHMuaXNNdWx0aVBob3Rvc0ZpZWxkKGZpZWxkKSkge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdtdWx0aXBob3RvUmVuZGVyZXInO1xuICAgICAgLy8gY29sLm9uQ2VsbENsaWNrZWQgPSAocGFyYW1zKSA9PiB7XG4gICAgICAvLyAgICAgbGV0IHBob3RvcyA9IE1vZGVscy5nZXRQaG90b3NGcm9tUGFyYW1zKHBhcmFtcyk7XG4gICAgICAvLyAgICAgaWYgKHBob3RvcyAmJiBwaG90b3MubGVuZ3RoID4gMCAmJiBjb21wb25lbnQgJiYgY29tcG9uZW50Lm9uUGhvdG9TZWxlY3QpIHtcbiAgICAgIC8vICAgICAgICAgY29tcG9uZW50Lm9uUGhvdG9TZWxlY3QocGhvdG9zWzBdKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyB9O1xuICAgIH0gZWxzZSBpZiAoKDxhbnk+ZmllbGQpLmlzRGlzdGFuY2VGaWVsZCA9PT0gdHJ1ZSkge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdkaXN0YW5jZVJlbmRlcmVyJztcbiAgICAgIGNvbC5zb3J0YWJsZSA9IGZhbHNlO1xuICAgICAgY29sLmNvbXBhcmF0b3IgPSAnZGlzdGFuY2VDb21wYXJhdG9yJztcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUubnVtYmVyKSB7XG4gICAgICBjb2wuY2VsbFJlbmRlcmVyID0gJ251bWJlclJlbmRlcmVyJztcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuZGF0ZSkge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdkYXRlUmVuZGVyZXInO1xuICAgIH0gZWxzZSBpZiAoTW9kZWxzLmlzRGF0ZVRpbWVGaWVsZChmaWVsZCkpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAnZGF0ZVRpbWVSZW5kZXJlcic7XG4gICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLnRpbWUpIHtcbiAgICAgIGNvbC5jZWxsUmVuZGVyZXIgPSAndGltZVJlbmRlcmVyJztcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuYWRkcmVzcykge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdhZGRyZXNzUmVuZGVyZXInO1xuICAgIH0gZWxzZSBpZiAoZmllbGQudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5sb2NhdGlvbikge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdsb2NhdGlvblJlbmRlcmVyJztcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuc3RhcnJhdGluZykge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdzdGFycmF0aW5nUmVuZGVyZXInO1xuICAgICAgY29sLmNlbGxSZW5kZXJlclBhcmFtcyA9IHsgbWF4OiBmaWVsZC5tYXggfTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUudG9kbykge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICd0b2RvUmVuZGVyZXInO1xuICAgIH0gZWxzZSBpZiAoZmllbGQudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS50aW1lcikge1xuICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICd0aW1lclJlbmRlcmVyJztcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuY2hlY2tsaXN0KSB7XG4gICAgICBjb2wuY2VsbFJlbmRlcmVyID0gJ2NoZWNrbGlzdFJlbmRlcmVyJztcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlICYmIGZpZWxkLmNvbGxlY3Rpb25OYW1lICYmIE1vZGVscy5nZXRNb2RlbEJ5Q29sbGVjdGlvbk5hbWUoZmllbGQuY29sbGVjdGlvbk5hbWUpICYmIE1vZGVscy5nZXRNb2RlbEJ5Q29sbGVjdGlvbk5hbWUoZmllbGQuY29sbGVjdGlvbk5hbWUpLmlzQ3VzdG9tKSB7XG4gICAgICBjb2wuY2VsbFJlbmRlcmVyID0gJ2N1c3RvbU1vZGVsUmVuZGVyZXInO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2wuY2VsbFJlbmRlcmVyID0gJ2RlZmF1bHRSZW5kZXJlcic7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkLmNvbHVtbkRlZmluaXRpb24gJiYgZmllbGQuY29sdW1uRGVmaW5pdGlvbi5yZW5kZXJlclR5cGUpIHtcbiAgICAgIHN3aXRjaCAoZmllbGQuY29sdW1uRGVmaW5pdGlvbi5yZW5kZXJlclR5cGUpIHtcbiAgICAgICAgY2FzZSAncGVyY2VudGFnZSc6XG4gICAgICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdwZXJjZW50YWdlUmVuZGVyZXInO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2R1cmF0aW9uJzpcbiAgICAgICAgICBjb2wuY2VsbFJlbmRlcmVyID0gJ2R1cmF0aW9uUmVuZGVyZXInO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3VzZXJmdWxsbmFtZSc6XG4gICAgICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICd1c2VyRnVsbE5hbWVSZW5kZXJlcic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaWVsZC5jb2x1bW5EZWZpbml0aW9uICYmIGZpZWxkLmNvbHVtbkRlZmluaXRpb24uY2VsbFJlbmRlcmVyKSB7XG4gICAgICBjb2wuY2VsbFJlbmRlcmVyID0gZmllbGQuY29sdW1uRGVmaW5pdGlvbi5jZWxsUmVuZGVyZXI7XG4gICAgfVxuICAgIHJldHVybiBjb2w7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldENvbHVtblR5cGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhZGRyZXNzOiB7fSxcbiAgICAgIGF1ZGlvOiB7fSxcbiAgICAgIGF1dG9jb21wbGV0ZToge30sXG4gICAgICBiYXJjb2RlOiB7fSxcbiAgICAgICdiZXR3ZWVuLWRhdGUnOiB7fSxcbiAgICAgICdiZXR3ZWVuLW51bWJlcic6IHt9LFxuICAgICAgYnV0dG9uOiB7fSxcbiAgICAgIGNhdGFsb2c6IHt9LFxuICAgICAgY2hlY2tib3g6IHt9LFxuICAgICAgY29sb3I6IHt9LFxuICAgICAgZGF0ZToge30sXG4gICAgICBkYXRlcmFuZ2U6IHt9LFxuICAgICAgJ2RhdGV0aW1lLWxvY2FsJzoge30sXG4gICAgICBkb2N1bWVudDoge30sXG4gICAgICBkb2N1bWVudHVwbG9hZGVyOiB7fSxcbiAgICAgIGVtYWlsOiB7fSxcbiAgICAgIGVtYWlscmVwb3J0OiB7fSxcbiAgICAgIGZpbHRlcjoge30sXG4gICAgICBncmlkOiB7fSxcbiAgICAgIGltYWdlOiB7fSxcbiAgICAgIGluZm9ybWF0aW9uOiB7fSxcbiAgICAgIGludHRlbDoge30sXG4gICAgICBpbnZpdGU6IHt9LFxuICAgICAganNvbjoge30sXG4gICAgICBsb2NhdGlvbjoge30sXG4gICAgICBtaXNzaW9uZmllbGQ6IHt9LFxuICAgICAgbWlzc2lvbnNjb3JlOiB7fSxcbiAgICAgIG51bWJlcjoge30sXG4gICAgICBwYXNzd29yZDoge30sXG4gICAgICBtdWx0aXBob3Rvczoge30sXG4gICAgICBwaG90bzoge30sXG4gICAgICBwcm9kdWN0Y2hlY2s6IHt9LFxuICAgICAgcmFuZ2U6IHt9LFxuICAgICAgcmFua2luZzoge30sXG4gICAgICBzZWxlY3Q6IHt9LFxuICAgICAgc2VsZWN0YnV0dG9uczoge30sXG4gICAgICBzZWxlY3RidXR0b25zbXVsdGk6IHt9LFxuICAgICAgc2VsZWN0aW1hZ2U6IHt9LFxuICAgICAgc2VsZWN0bXVsdGk6IHt9LFxuICAgICAgc2lnbmF0dXJlOiB7fSxcbiAgICAgIHN0YXJyYXRpbmc6IHt9LFxuICAgICAgc3RyaW5nOiB7fSxcbiAgICAgIHN0cmlwZWNhcmQ6IHt9LFxuICAgICAgdGVsOiB7fSxcbiAgICAgIHRleHQ6IHt9LFxuICAgICAgdGV4dGFyZWE6IHt9LFxuICAgICAgdGltZToge30sXG4gICAgICB0aW1lcjoge30sXG4gICAgICB0b2RvOiB7fSxcbiAgICAgIHRvZ2dsZToge30sXG4gICAgICB2aWRlbzoge30sXG4gICAgICBrbm9iOiB7fSxcbiAgICAgIHNlbGVjdGNoYXQ6IHt9LFxuICAgICAgbWlzc2luZ3dvcmQ6IHt9LFxuICAgICAgc3dpcGVzZWxlY3Q6IHt9LFxuICAgICAgY2hlY2tsaXN0OiB7fSxcbiAgICAgIGZvcm11bGE6IHt9LFxuICAgICAgdmlkZW9wbGF5ZXI6IHt9XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Q29uZmlnKG11bHRpcGxlOiBib29sZWFuLCByb3dNb2RlbFR5cGU6IHN0cmluZywgaW5maW5pdGVTY3JvbGxpbmc6IGJvb2xlYW4sIHBhZ2VTaXplOiBudW1iZXIsIHRyYW5zbGF0ZTogVHJhbnNsYXRlKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgcm93SGVpZ2h0OiA1MixcbiAgICAgIHJvd1N0eWxlOiB7ICdsaW5lLWhlaWdodCc6ICczMnB4JyB9LFxuICAgICAgaGVhZGVySGVpZ2h0OiA0MCxcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHsgc29ydGFibGU6IHRydWUsIHJlc2l6YWJsZTogdHJ1ZSB9LFxuICAgICAgcm93RGVzZWxlY3Rpb246IHRydWUsXG4gICAgICByb3dTZWxlY3Rpb246IG11bHRpcGxlID8gJ211bHRpcGxlJyA6ICdzaW5nbGUnLFxuICAgICAgcm93TW9kZWxUeXBlOiByb3dNb2RlbFR5cGUgfHwgJ3NlcnZlclNpZGUnLFxuICAgICAgcm93QnVmZmVyOiAwLFxuICAgICAgbWF4Q29uY3VycmVudERhdGFzb3VyY2VSZXF1ZXN0czogMSxcbiAgICAgIGluZmluaXRlSW5pdGlhbFJvd0NvdW50OiBwYWdlU2l6ZSxcbiAgICAgIGNhY2hlT3ZlcmZsb3dTaXplOiAyLFxuICAgICAgLy9tYXhCbG9ja3NJbkNhY2hlOiAxMCxcbiAgICAgIHBhZ2luYXRpb246ICFpbmZpbml0ZVNjcm9sbGluZyxcbiAgICAgIHBhZ2luYXRpb25QYWdlU2l6ZTogcGFnZVNpemUsXG4gICAgICBjYWNoZUJsb2NrU2l6ZTogcGFnZVNpemUsXG4gICAgICBzdXBwcmVzc1Byb3BlcnR5TmFtZXNDaGVjazogdHJ1ZSxcbiAgICAgIGFuaW1hdGVSb3dzOiB0cnVlLFxuICAgICAgbG9jYWxlVGV4dDogQ2VsbFJlbmRlcmVyLmdldFRyYW5zbGF0aW9uKHRyYW5zbGF0ZSksXG4gICAgICAvL3N1cHByZXNzQ29udGV4dE1lbnU6IHRydWUsXG4gICAgICBjb2x1bW5UeXBlczogQ2VsbFJlbmRlcmVyLmdldENvbHVtblR5cGVzKClcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRQaXZvdENvbmZpZyh0cmFuc2xhdGU6IFRyYW5zbGF0ZSk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvd0hlaWdodDogNTIsXG4gICAgICByb3dTdHlsZTogeyAnbGluZS1oZWlnaHQnOiAnMzJweCcgfSxcbiAgICAgIGhlYWRlckhlaWdodDogNDAsXG4gICAgICBkZWZhdWx0Q29sRGVmOiB7IHNvcnRhYmxlOiB0cnVlLCByZXNpemFibGU6IHRydWUgfSxcbiAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgIHN1cHByZXNzUHJldmVudERlZmF1bHRPbk1vdXNlV2hlZWw6IGZhbHNlLFxuICAgICAgc3VwcHJlc3NQcm9wZXJ0eU5hbWVzQ2hlY2s6IHRydWUsXG4gICAgICByZW1lbWJlckdyb3VwU3RhdGVXaGVuTmV3RGF0YTogdHJ1ZSxcbiAgICAgIHN1cHByZXNzQWdnRnVuY0luSGVhZGVyOiB0cnVlLFxuICAgICAgZ3JvdXBEZWZhdWx0RXhwYW5kZWQ6IDAsXG4gICAgICBncm91cFN1cHByZXNzR3JvdXBDb2x1bW46IHRydWUsXG4gICAgICBzdXBwcmVzc1Jvd0hvdmVyQ2xhc3M6IHRydWUsXG4gICAgICBhdXRvR3JvdXBDb2x1bW5EZWY6IHtcbiAgICAgICAgaGVhZGVyTmFtZTogdHJhbnNsYXRlLmdldCgnR1JPVVAnKSxcbiAgICAgICAgY2VsbFJlbmRlcmVyOiAnYWdHcm91cENlbGxSZW5kZXJlcicsXG4gICAgICAgIGNvbXBhcmF0b3I6ICdkZWZhdWx0R3JvdXBDb21wYXJhdG9yJ1xuICAgICAgfSxcbiAgICAgIGljb25zOiB7XG4gICAgICAgIG1lbnU6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1tZW51XCI+PC95b28taWNvbj4nLFxuICAgICAgICBmaWx0ZXI6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1maWx0ZXJcIj48L3lvby1pY29uPicsXG4gICAgICAgIGdyb3VwRXhwYW5kZWQ6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1jaXJjbGUtbWlub3JcIj48L3lvby1pY29uPicsXG4gICAgICAgIGdyb3VwQ29udHJhY3RlZDogJzx5b28taWNvbiBjbGFzcz1cInlvLWNpcmNsZS1wbHVzXCI+PC95b28taWNvbj4nLFxuICAgICAgICBjb2x1bW5Hcm91cE9wZW5lZDogJzx5b28taWNvbiBjbGFzcz1cInlvLW5vZGF0YVwiPjwveW9vLWljb24+JyxcbiAgICAgICAgY29sdW1uR3JvdXBDbG9zZWQ6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1wbHVzXCI+PC95b28taWNvbj4nLFxuICAgICAgICBjb2x1bW5TZWxlY3RPcGVuOiAnPHlvby1pY29uIGNsYXNzPVwieW8tbm9kYXRhXCI+PC95b28taWNvbj4nLFxuICAgICAgICBjb2x1bW5TZWxlY3RDbG9zZWQ6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1wbHVzXCI+PC95b28taWNvbj4nLFxuICAgICAgICBjaGVja2JveENoZWNrZWQ6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1jaGVja1wiPjwveW9vLWljb24+JyxcbiAgICAgICAgY2hlY2tib3hVbmNoZWNrZWQ6ICc8eW9vLWljb24gY2xhc3M9XCJ5by1jaXJjbGVcIj48L3lvby1pY29uPicsXG4gICAgICAgIGNoZWNrYm94SW5kZXRlcm1pbmF0ZTogJzx5b28taWNvbiBjbGFzcz1cInlvLWNpcmNsZVwiPjwveW9vLWljb24+JyxcbiAgICAgICAgc29ydEFzY2VuZGluZzogJzx5b28taWNvbiBjbGFzcz1cInlvLXVwXCI+PC95b28taWNvbj4nLFxuICAgICAgICBzb3J0RGVzY2VuZGluZzogJzx5b28taWNvbiBjbGFzcz1cInlvLWRvd25cIj48L3lvby1pY29uPicsXG4gICAgICAgIGNvbHVtbk1vdmVHcm91cDogJzx5b28taWNvbiBjbGFzcz1cInlvLWRpcmVjdGlvbi1zZWxlY3RcIj48L3lvby1pY29uPicsXG4gICAgICAgIGRyb3BOb3RBbGxvd2VkOiAnPHlvby1pY29uIGNsYXNzPVwieW8tcmVqZWN0ZWQyXCI+PC95b28taWNvbj4nXG4gICAgICB9LFxuICAgICAgY29sdW1uVHlwZXM6IENlbGxSZW5kZXJlci5nZXRDb2x1bW5UeXBlcygpLFxuICAgICAgbG9jYWxlVGV4dDogQ2VsbFJlbmRlcmVyLmdldFRyYW5zbGF0aW9uKHRyYW5zbGF0ZSksXG4gICAgICBncm91cFVzZUVudGlyZVJvdzogZmFsc2UsXG4gICAgICBncm91cFJvd0lubmVyUmVuZGVyZXI6ICdwcm9ncmVzc1JlbmRlcmVyJ1xuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFRyYW5zbGF0aW9uKHRyYW5zbGF0ZTogVHJhbnNsYXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6ICc8aSBjbGFzcz1cInlvLXJpZ2h0XCI+PC9pPicsXG4gICAgICBwcmV2aW91czogJzxpIGNsYXNzPVwieW8tbGVmdFwiPjwvaT4nLFxuICAgICAgcGFnZTogJyAnLFxuICAgICAgb2Y6ICcvJyxcbiAgICAgIG1vcmU6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRE1PUkUnKSxcbiAgICAgIHRvOiAnIC0gJyxcbiAgICAgIGxvYWRpbmdPb286IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRExPQURJTkdPT08nKSxcbiAgICAgIHNlbGVjdEFsbDogdHJhbnNsYXRlLmdldCgnQUdHUklEU0VMRUNUQUxMJyksXG4gICAgICBzZWFyY2hPb286IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFNFQVJDSE9PTycpLFxuICAgICAgYmxhbmtzOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURCTEFOS1MnKSxcbiAgICAgIGZpbHRlck9vbzogdHJhbnNsYXRlLmdldCgnQUdHUklERklMVEVST09PJyksXG4gICAgICBhcHBseUZpbHRlcjogdHJhbnNsYXRlLmdldCgnQUdHUklEQVBQTFlGSUxURVInKSxcbiAgICAgIGVxdWFsczogdHJhbnNsYXRlLmdldCgnQUdHUklERVFVQUxTJyksXG4gICAgICBsZXNzVGhhbjogdHJhbnNsYXRlLmdldCgnQUdHUklETEVTU1RIQU4nKSxcbiAgICAgIGdyZWF0ZXJUaGFuOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURHUkVBVEVSVEhBTicpLFxuICAgICAgY29udGFpbnM6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRENPTlRBSU5TJyksXG4gICAgICBzdGFydHNXaXRoOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURTVEFSVFNXSVRIJyksXG4gICAgICBlbmRzV2l0aDogdHJhbnNsYXRlLmdldCgnQUdHUklERU5EU1dJVEgnKSxcbiAgICAgIGdyb3VwOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURHUk9VUCcpLFxuICAgICAgY29sdW1uczogdHJhbnNsYXRlLmdldCgnQUdHUklEQ09MVU1OUycpLFxuICAgICAgcm93R3JvdXBDb2x1bW5zOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURST1dHUk9VUENPTFVNTlMnKSxcbiAgICAgIHJvd0dyb3VwQ29sdW1uc0VtcHR5TWVzc2FnZTogdHJhbnNsYXRlLmdldCgnQUdHUklEUk9XR1JPVVBDT0xVTU5TRU1QVFlNRVNTQUdFJyksXG4gICAgICB2YWx1ZUNvbHVtbnM6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFZBTFVFQ09MVU1OUycpLFxuICAgICAgcGl2b3RNb2RlOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURQSVZPVE1PREUnKSxcbiAgICAgIGdyb3VwczogdHJhbnNsYXRlLmdldCgnQUdHUklER1JPVVBTJyksXG4gICAgICB2YWx1ZXM6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFZBTFVFUycpLFxuICAgICAgcGl2b3RzOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURQSVZPVFMnKSxcbiAgICAgIHZhbHVlQ29sdW1uc0VtcHR5TWVzc2FnZTogdHJhbnNsYXRlLmdldCgnQUdHUklEVkFMVUVDT0xVTU5TRU1QVFlNRVNTQUdFJyksXG4gICAgICBwaXZvdENvbHVtbnNFbXB0eU1lc3NhZ2U6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFBJVk9UQ09MVU1OU0VNUFRZTUVTU0FHRScpLFxuICAgICAgbm9Sb3dzVG9TaG93OiB0cmFuc2xhdGUuZ2V0KCdBR0dSSUROT1JPV1NUT1NIT1cnKSxcbiAgICAgIHBpbkNvbHVtbjogdHJhbnNsYXRlLmdldCgnQUdHUklEUElOQ09MVU1OJyksXG4gICAgICB2YWx1ZUFnZ3JlZ2F0aW9uOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURWQUxVRUFHR1JFR0FUSU9OJyksXG4gICAgICBhdXRvc2l6ZVRoaXNjb2x1bW46IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJREFVVE9TSVpFVEhJU0NPTFVNTicpLFxuICAgICAgYXV0b3NpemVBbGxDb2x1bW5zOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURBVVRPU0laRUFMTENPTFVNTlMnKSxcbiAgICAgIGdyb3VwQnk6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJREdST1VQQlknKSxcbiAgICAgIHVuZ3JvdXBCeTogdHJhbnNsYXRlLmdldCgnQUdHUklEVU5HUk9VUEJZJyksXG4gICAgICByZXNldENvbHVtbnM6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFJFU0VUQ09MVU1OUycpLFxuICAgICAgZXhwYW5kQWxsOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURFWFBBTkRBTEwnKSxcbiAgICAgIGNvbGxhcHNlQWxsOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURDT0xMQVBTRUFMTCcpLFxuICAgICAgdG9vbFBhbmVsOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURUT09MUEFORUwnKSxcbiAgICAgIHBpbkxlZnQ6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFBJTkxFRlQnKSxcbiAgICAgIHBpblJpZ2h0OiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURQSU5SSUdIVCcpLFxuICAgICAgbm9QaW46IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRE5PUElOJyksXG4gICAgICBzdW06IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRFNVTScpLFxuICAgICAgbWluOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURNSU4nKSxcbiAgICAgIG1heDogdHJhbnNsYXRlLmdldCgnQUdHUklETUFYJyksXG4gICAgICBub25lOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSUROT05FJyksXG4gICAgICBjb3VudDogdHJhbnNsYXRlLmdldCgnQUdHUklEQ09VTlQnKSxcbiAgICAgIGF2ZXJhZ2U6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJREFWRVJBR0UnKSxcbiAgICAgIGF2ZzogdHJhbnNsYXRlLmdldCgnQUdHUklEQVZFUkFHRScpLFxuICAgICAgY29weTogdHJhbnNsYXRlLmdldCgnQUdHUklEQ09QWScpLFxuICAgICAgY3RybEM6IHRyYW5zbGF0ZS5nZXQoJ0FHR1JJRENUUkxDJyksXG4gICAgICBwYXN0ZTogdHJhbnNsYXRlLmdldCgnQUdHUklEUEFTVEUnKSxcbiAgICAgIGN0cmxWOiB0cmFuc2xhdGUuZ2V0KCdBR0dSSURDVFJMVicpXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29sdW1uRGVmcyhjb2xsZWN0aW9uTmFtZT86IHN0cmluZywgdHJhbnNsYXRlPzogVHJhbnNsYXRlLCBjYW1wYWlnbkZpZWxkcz86IEFycmF5PGFueT4sIGN1c3RvbUNvbHVtbkRlZnM/OiBBcnJheTxhbnk+LCBpbmNsdWRlRGlzdGFuY2U/OiBib29sZWFuLCBpbmZpbml0ZVNjcm9sbGluZz86IGJvb2xlYW4sIGl0ZW1CdXR0b25zPzogQXJyYXk8YW55PiwgY29sTWluV2lkdGg/OiBudW1iZXIsIHZpc2libGVGaWVsZHM/LCBzb3J0TW9kZWw/LCBncmlkPywgaGlkZGVuQ29sdW1ucz8pIHtcbiAgICBsZXQgY29sdW1uRGVmczogQXJyYXk8SUNvbHVtbkRlZmluaXRpb24+ID0gW107XG4gICAgaWYgKGN1c3RvbUNvbHVtbkRlZnMgJiYgY3VzdG9tQ29sdW1uRGVmcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb2x1bW5EZWZzID0gY2xvbmVEZWVwKGN1c3RvbUNvbHVtbkRlZnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gfHwgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApXG4gICAgICBsZXQgZm9ybUZpZWxkczogQXJyYXk8SUZvcm1GaWVsZD4gPSBbXTtcbiAgICAgIGxldCBtb2RlbCA9IE1vZGVscy5nZXRNb2RlbEJ5Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpO1xuICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgIGZvcm1GaWVsZHMgPSBtb2RlbC5mb3JtRmllbGRzO1xuICAgICAgICBpZiAoY2FtcGFpZ25GaWVsZHMgJiYgY2FtcGFpZ25GaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNhbXBhaWduRmllbGRzID0gY2xvbmVEZWVwKGNhbXBhaWduRmllbGRzKTtcbiAgICAgICAgICBjYW1wYWlnbkZpZWxkcy5mb3JFYWNoKGMgPT4gKGMubmFtZSArPSAnLnZhbHVlJykpO1xuICAgICAgICAgIGZvcm1GaWVsZHMgPSBjb25jYXQoZm9ybUZpZWxkcywgY2FtcGFpZ25GaWVsZHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb2x1bW5EZWZzID0gW107XG4gICAgICBmb3JtRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBsZXQgY29sRWRpdDtcbiAgICAgICAgbGV0IGNvbCA9IENlbGxSZW5kZXJlci5nZXRDb2x1bW5EZWZpbml0aW9uKGZpZWxkLCB0cmFuc2xhdGUsIHZpc2libGVGaWVsZHMsIHNvcnRNb2RlbCwgZ3JpZCk7XG4gICAgICAgIGlmIChjb2xNaW5XaWR0aCA+IDAgJiYgY29sLm1pbldpZHRoID09PSA0MCkge1xuICAgICAgICAgIGNvbC5taW5XaWR0aCA9IGNvbE1pbldpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGNvbC5tZW51VGFicyA9IFtdO1xuICAgICAgICBpZiAoZmllbGQudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5jYXRhbG9nKSB7XG4gICAgICAgICAgY29sLmNlbGxSZW5kZXJlciA9ICdjYXRhbG9nUmVuZGVyZXInO1xuICAgICAgICAgIGNvbC5pc0NoZWNrID0gZmllbGQuY2hlY2s7XG4gICAgICAgICAgY29sLmlzUHJlc2VuY2UgPSBmaWVsZC5wcmVzZW5jZTtcbiAgICAgICAgICBjb2wuaXNJbnZlbnRvcnkgPSBmaWVsZC5pbnZlbnRvcnk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUubXVsdGlwaG90b3MpIHtcbiAgICAgICAgICBjb2wuc3VwcHJlc3NFeHBvcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vaWYgKGNvbC5oaWRlICE9PSB0cnVlKSB7XG4gICAgICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCBoaWRkZW5Db2x1bW5zLmluZGV4T2YoY29sLmZpZWxkKSA8IDApIHtcbiAgICAgICAgICBjb2x1bW5EZWZzLnB1c2goY29sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmllbGQuaXNJbWFnZVJlY29nbml0aW9uICYmIGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUucGhvdG8pIHtcbiAgICAgICAgICBjb2xFZGl0ID0gY2xvbmVEZWVwKGNvbCk7XG4gICAgICAgICAgY29sRWRpdC5oaWRlID0gdHJ1ZTtcbiAgICAgICAgICBjb2xFZGl0LmhlYWRlck5hbWUgKz0gJyAtIE1hcmt1cCc7XG4gICAgICAgICAgY29sRWRpdC5mb3JjZUV4cG9ydCA9IHRydWU7XG4gICAgICAgICAgY29sRWRpdC5maWVsZCA9IGNvbEVkaXQuZmllbGQucmVwbGFjZSgnLnZhbHVlJywgJy5lZGl0Jyk7XG4gICAgICAgICAgY29sdW1uRGVmcy5wdXNoKGNvbEVkaXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLm11bHRpcGhvdG9zKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZC5tYXhQaG90b3M7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvbFBob3RvID0gY2xvbmVEZWVwKGNvbCk7XG4gICAgICAgICAgICBjb2xQaG90by5oaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbFBob3RvLnN1cHByZXNzRXhwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICBjb2xQaG90by5oZWFkZXJOYW1lICs9ICcgJyArIGk7XG4gICAgICAgICAgICBjb2xQaG90by5mb3JjZUV4cG9ydCA9IHRydWU7XG4gICAgICAgICAgICBjb2xQaG90by5maWVsZCA9IGNvbFBob3RvLmZpZWxkLnJlcGxhY2UoJy52YWx1ZScsICcudmFsdWVbJyArIGkgKyAnXScpO1xuICAgICAgICAgICAgY29sdW1uRGVmcy5wdXNoKGNvbFBob3RvKTtcblxuICAgICAgICAgICAgaWYgKGZpZWxkLmlzSW1hZ2VSZWNvZ25pdGlvbikge1xuICAgICAgICAgICAgICBjb2xFZGl0ID0gY2xvbmVEZWVwKGNvbCk7XG4gICAgICAgICAgICAgIGNvbEVkaXQuaGlkZSA9IHRydWU7XG4gICAgICAgICAgICAgIGNvbEVkaXQuc3VwcHJlc3NFeHBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgY29sRWRpdC5oZWFkZXJOYW1lICs9ICcgLSBNYXJrdXAgJyArIGk7XG4gICAgICAgICAgICAgIGNvbEVkaXQuZm9yY2VFeHBvcnQgPSB0cnVlO1xuICAgICAgICAgICAgICBjb2xFZGl0LmZpZWxkID0gY29sRWRpdC5maWVsZC5yZXBsYWNlKCcudmFsdWUnLCAnLmV4dHJhRGF0YVsnICsgaSArICddLmVkaXQnKTtcbiAgICAgICAgICAgICAgY29sdW1uRGVmcy5wdXNoKGNvbEVkaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL31cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpbmNsdWRlRGlzdGFuY2UpIHtcbiAgICAgIGxldCBkaXN0YW5jZUZpZWxkID0ge1xuICAgICAgICBuYW1lOiAnZGlzdGFuY2UnLFxuICAgICAgICB0aXRsZTogJ0Rpc3RhbmNlJyxcbiAgICAgICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDE1MCB9LFxuICAgICAgICBpc0Rpc3RhbmNlRmllbGQ6IHRydWVcbiAgICAgIH07XG4gICAgICBsZXQgZGlzdGFuY2VDb2wgPSBDZWxsUmVuZGVyZXIuZ2V0Q29sdW1uRGVmaW5pdGlvbihkaXN0YW5jZUZpZWxkLCB0cmFuc2xhdGUpO1xuICAgICAgY29sdW1uRGVmcy5wdXNoKGRpc3RhbmNlQ29sKTtcbiAgICB9XG5cbiAgICBpZiAoaW5maW5pdGVTY3JvbGxpbmcgPT09IHRydWUpIHtcbiAgICAgIGNvbHVtbkRlZnMudW5zaGlmdCh7XG4gICAgICAgIGhlYWRlck5hbWU6ICcjJyxcbiAgICAgICAgd2lkdGg6IDUwLFxuICAgICAgICBjZWxsUmVuZGVyZXI6IHBhcmFtcyA9PiBwYXJhbXMubm9kZS5pZCArIDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpdGVtQnV0dG9ucyAmJiBpdGVtQnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBpdGVtQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGNvbHVtbkRlZnMucHVzaCh7XG4gICAgICAgICAgLy9taW5XaWR0aDogNDUsXG4gICAgICAgICAgd2lkdGg6IDQ1LFxuICAgICAgICAgIC8vaGVhZGVyQ2xhc3M6ICdjZW50ZXJlZCcsXG4gICAgICAgICAgY2VsbENsYXNzOiAnb3ZlcmZsb3cnLFxuICAgICAgICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgICBzdXBwcmVzc0ZpbHRlcjogdHJ1ZSxcbiAgICAgICAgICBwaW5uZWQ6ICdyaWdodCcsXG4gICAgICAgICAgbWVudVRhYnM6IFsnZmlsdGVyTWVudVRhYiddLFxuICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgIGljb246IGJ1dHRvbi5pY29uLFxuICAgICAgICAgICAgY29sb3I6IGJ1dHRvbi5jb2xvcixcbiAgICAgICAgICAgIHRleHQ6IGJ1dHRvbi50ZXh0XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjZWxsUmVuZGVyZXI6ICdidXR0b25SZW5kZXJlcicsXG4gICAgICAgICAgb25DZWxsQ2xpY2tlZDogcGFyYW1zID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5oYW5kbGVyKHBhcmFtcy5kYXRhICYmIHBhcmFtcy5kYXRhLnRvSlMgPyBwYXJhbXMuZGF0YS50b0pTKCkgOiBwYXJhbXMuZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uRGVmcztcbiAgfVxufVxuIl19
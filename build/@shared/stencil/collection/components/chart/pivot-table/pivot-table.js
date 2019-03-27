import { translate, isWeb } from '../../../utils';
import { cloneDeep, sortBy } from 'lodash-es';
import { getRenderer } from '../../grid/ag-grid/grid-renderers';
export class YooPivotTableComponent {
    componentWillLoad() {
        this.updateConfig();
    }
    onConfigChange() {
        this.updateConfig();
    }
    updateConfig() {
        this.options = cloneDeep(this.config);
        if (this.definition.kpiType === 'CampaignsPivotTableKpi') {
            this.options.rowData = this.campaignsPivotTableKpiSortRows(this.options.rowData);
            if (this.isFullScreen) {
                this.options.columnDefs.unshift({
                    headerName: translate('VIEW'),
                    colId: 'viewButton',
                    groupId: 'view',
                    width: 90,
                    headerClass: 'centered',
                    cellClass: 'overflow',
                    suppressExport: true,
                    sortable: false,
                    suppressFilter: true,
                    pinned: 'left',
                    menuTabs: ['filterMenuTab'],
                    cellRenderer: getRenderer('buttonRenderer'),
                    cellRendererParams: {
                        icon: 'yo-eye',
                        color: 'dark',
                        text: translate('VIEW')
                    }, onCellClicked: (params) => {
                        let keys;
                        if (params.data && params.data._id) {
                            keys = [params.data._id];
                        }
                        else if (params && params.node && params.node.allLeafChildren) {
                            keys = params.node.allLeafChildren.map(c => c.data._id);
                        }
                        if (keys && keys.length > 0) {
                            if (isWeb()) {
                                this.rowDoubleClick.emit(keys);
                            }
                            else {
                                this.rowClick.emit(keys);
                            }
                        }
                        return false;
                    }
                });
            }
        }
        this.options.onGridReady = (event) => {
            this.onGridRestore(true);
        };
        // ,
        //     onDragStarted: (event) => this.onDragStarted(event),
        //     onDragStopped: (event) => this.onDragStopped(event),
        //     onRowDoubleClicked: (event) => this.onRowDoubleClicked(event.data, event.rowIndex, event),
        //     onColumnResized: (event) => this.onGridModelUpdated(event),
        //     onColumnMoved: (event) => this.onGridModelUpdated(event),
        //     onColumnVisible: (event) => this.onGridModelUpdated(event),
        //     onColumnPinned: (event) => this.onGridModelUpdated(event) //,
    }
    onGridRestore(setColumns) {
        if (this.definition.gridState && this.options && this.options.columnApi) {
            this.definition.gridState.forEach(c => delete c.pinned);
            if (this.isFullScreen) {
                this.definition.gridState = this.definition.gridState.filter(f => f.colId !== 'viewButton');
                this.definition.gridState.unshift({ colId: 'viewButton', hide: false });
            }
            this.options.columnApi.setColumnState(this.definition.gridState);
        }
        else if (setColumns) {
            if (this.definition.kpiType === 'CampaignsPivotTableKpi') {
                this.campaignsPivotTableKpiSetColumns();
            }
        }
    }
    campaignsPivotTableKpiSortRows(rows) {
        let sorts = [];
        for (let i = 1; i <= 5; i++) {
            let columnName = 'tagGroup' + i;
            if (this.definition.kpiFormValues[columnName]) {
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
    campaignsPivotTableKpiSetColumns() {
        if (!this.options || !this.options.columnApi) {
            return;
        }
        for (let i = 1; i <= 5; i++) {
            let columnName = 'tagGroup' + i;
            if (this.definition.kpiFormValues[columnName]) {
                this.options.columnApi.addRowGroupColumn(columnName);
            }
        }
        this.options.columnApi.addValueColumn('progress');
        this.options.columnApi.addValueColumn('validationprogress');
        this.options.columnApi.addValueColumn('conformityprogress');
        this.options.columnApi.addValueColumn('conformityrelativeprogress');
        let col = this.options.columnApi.getColumn('status');
        if (col) {
            this.options.columnApi.setColumnAggFunc(col, 'countValues');
            this.options.columnApi.addValueColumn('status');
        }
        col = this.options.columnApi.getColumn('validated');
        if (col) {
            this.options.columnApi.setColumnAggFunc(col, 'countValues');
            this.options.columnApi.addValueColumn('validated');
        }
        col = this.options.columnApi.getColumn('score');
        if (col) {
            this.options.columnApi.setColumnAggFunc(col, 'avg');
            this.options.columnApi.addValueColumn('score');
        }
        this.options.columnApi.autoSizeAllColumns();
    }
    render() {
        return (this.options ? h("div", { class: "flex container" },
            h("yoo-ag-grid", { config: this.options })) : null);
    }
    static get is() { return "yoo-pivot-table"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config",
            "watchCallbacks": ["onConfigChange"]
        },
        "definition": {
            "type": "Any",
            "attr": "definition"
        },
        "host": {
            "elementRef": true
        },
        "isFullScreen": {
            "type": Boolean,
            "attr": "is-full-screen"
        }
    }; }
    static get events() { return [{
            "name": "rowClick",
            "method": "rowClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "rowDoubleClick",
            "method": "rowDoubleClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-pivot-table:**/"; }
}

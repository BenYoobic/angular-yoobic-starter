const h = window.DesignSystem.h;

import { W as isWeb, ba as showActionSheet, m as translate, bg as cloneDeep, cP as sortBy } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import { a as getRenderer } from './chunk-377244f3.js';

class YooKpiComponent {
    onChartClick(ev) {
        ev.stopPropagation();
        this.kpiClick.emit(ev.detail);
    }
    onChartDoubleClick(ev) {
        ev.stopPropagation();
        this.kpiDoubleClick.emit(ev.detail);
    }
    onChartLegendItemClick(ev) {
        ev.stopPropagation();
        this.kpiLegendItemClick.emit(ev.detail);
    }
    onMarkersSelect(ev) {
        ev.stopPropagation();
        this.kpiClick.emit(ev.detail.map(m => m._id));
    }
    hostData() {
        return {
            class: {
                'full-height': this.isFullHeight,
                'web': isWeb()
            }
        };
    }
    render() {
        switch (this.type) {
            case 'micro':
            case 'calendar':
                return null;
            case 'carousel':
                return (this.photoSrc ?
                    h("div", { class: "photo-container" },
                        h("yoo-photo-editor", { readonly: true, src: this.photoSrc }))
                    : h("yoo-empty-state", { class: "absolute small", type: "photo" }));
            case 'grid':
                return h("yoo-pivot-table", { onRowClick: ev => this.onChartClick(ev), onRowDoubleClick: ev => this.onChartDoubleClick(ev), config: this.config, definition: this.definition, isFullScreen: this.isFullScreen });
            case 'map':
                return h("yoo-map", { markers: this.config.markers, useCluster: true, groupBy: "status", filterGroups: this.definition.mapFilters, showLegend: this.isFullScreen || isWeb() ? this.definition.showLegend : false, showFullscreenControl: isWeb(), onSelect: ev => this.onMarkersSelect(ev) });
            case 'chartio':
                return h("yoo-kpi-external", { config: this.config, definition: this.definition, isFullScreen: this.isFullScreen });
            case 'chart':
            default:
                return h("yoo-chart", { onChartClick: ev => this.onChartClick(ev), onChartDoubleClick: ev => this.onChartDoubleClick(ev), onChartLegendItemClick: ev => this.onChartLegendItemClick(ev), config: this.config, definition: this.definition, isFullScreen: this.isFullScreen });
        }
    }
    static get is() { return "yoo-kpi"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "definition": {
            "type": "Any",
            "attr": "definition"
        },
        "host": {
            "elementRef": true
        },
        "isFullHeight": {
            "type": Boolean,
            "attr": "is-full-height"
        },
        "isFullScreen": {
            "type": Boolean,
            "attr": "is-full-screen"
        },
        "photoSrc": {
            "type": String,
            "attr": "photo-src"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get events() { return [{
            "name": "kpiClick",
            "method": "kpiClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "kpiDoubleClick",
            "method": "kpiDoubleClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "kpiLegendItemClick",
            "method": "kpiLegendItemClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fetchDetails",
            "method": "fetchDetails",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --chart-height: 250px; }\n\n:host yoo-chart,\n:host yoo-pivot-table {\n  --height:var(--chart-height); }\n\n:host .photo-container {\n  position: relative;\n  width: 100%;\n  height: 100%; }\n  :host .photo-container yoo-photo-editor {\n    width: 100%;\n    height: var(--chart-height); }\n\n:host(.full-height) {\n  display: block;\n  height: 100%; }\n  :host(.full-height) yoo-chart,\n  :host(.full-height) yoo-pivot-table {\n    display: block;\n    height: 100%; }"; }
}

class YooKpiContainerComponent {
    onShowDialog(index) {
        this.showDetail.emit(index);
    }
    onShowMore() {
        showActionSheet([
            { text: translate('SHARE') + ' : ' + translate('FEEDS'), handler: () => this.share.emit('feeds') }
        ]);
    }
    onKpiClick(ev) {
        ev.stopPropagation();
        this.kpiClick.emit(ev.detail);
    }
    onKpiDoubleClick(ev) {
        ev.stopPropagation();
        this.kpiDoubleClick.emit(ev.detail);
    }
    onKpiLegendItemClick(ev) {
        ev.stopPropagation();
        this.kpiLegendItemClick.emit(ev.detail);
    }
    renderKpiContent() {
        if (!this.config) {
            return h("yoo-loader", { class: "absolute large" });
        }
        return [
            this.config.photos && this.config.photos.length > 0 && this.type === 'carousel' ?
                this.config.photos.map((photo, index) => {
                    return h("div", { class: 'kpi-container ' + this.type, onClick: () => this.onShowDialog(index) }, this.renderKpi(photo.value));
                })
                :
                    h("div", { class: 'kpi-container ' + this.type, onClick: (ev) => this.onShowDialog() }, this.renderKpi())
        ];
    }
    // There may be more than one photo in the config, which is not the case for the other KPIs
    renderKpi(photoSrc) {
        return (h("yoo-kpi", { config: this.config, photoSrc: photoSrc, type: this.type, isFullScreen: this.isFullScreen, isFullHeight: this.isFullHeight, definition: this.definition, onKpiClick: ev => this.onKpiClick(ev), onKpiDoubleClick: ev => this.onKpiDoubleClick(ev), onKpiLegendItemClick: ev => this.onKpiLegendItemClick(ev) }));
    }
    hostData() {
        return {
            class: {
                'web': isWeb()
            }
        };
    }
    render() {
        return h("div", { class: {
                'container': true,
                'fullscreen': this.isFullScreen,
                'full-height': this.isFullHeight
            } },
            this.isFullScreen || this.hideHeader ? null : h("div", { class: "heading" },
                h("span", null, this.heading)),
            h("slot", { name: "start" }),
            h("div", { class: "content" }, this.renderKpiContent()),
            h("slot", null));
    }
    static get is() { return "yoo-kpi-container"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "definition": {
            "type": "Any",
            "attr": "definition"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "hideHeader": {
            "type": Boolean,
            "attr": "hide-header"
        },
        "host": {
            "elementRef": true
        },
        "isFullHeight": {
            "type": Boolean,
            "attr": "is-full-height"
        },
        "isFullScreen": {
            "type": Boolean,
            "attr": "is-full-screen"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get events() { return [{
            "name": "showDetail",
            "method": "showDetail",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "kpiClick",
            "method": "kpiClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "kpiDoubleClick",
            "method": "kpiDoubleClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "kpiLegendItemClick",
            "method": "kpiLegendItemClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "share",
            "method": "share",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  display: block; }\n  :host .container {\n    display: block;\n    width: 100%;\n    height: 100%;\n    background: var(--light, #FFFFFF); }\n    :host .container:not(.fullscreen) {\n      border-bottom: 10px solid var(--stable-ultralight, #F5F5F5); }\n      :host .container:not(.fullscreen) .content {\n        position: relative;\n        width: 100%;\n        min-height: 250px; }\n        :host .container:not(.fullscreen) .content yoo-kpi {\n          pointer-events: none; }\n      :host .container:not(.fullscreen) .kpi-container {\n        height: 100%; }\n        :host .container:not(.fullscreen) .kpi-container.carousel, :host .container:not(.fullscreen) .kpi-container.map {\n          height: 250px; }\n        :host .container:not(.fullscreen) .kpi-container.carousel {\n          border-bottom: 1px solid var(--stable-30, #E6E6E6); }\n    :host .container .heading {\n      padding: 0.5rem;\n      font-size: var(--font-l, 17px); }\n    :host .container.fullscreen .content {\n      position: relative;\n      width: 100%;\n      height: 380px; }\n      :host .container.fullscreen .content yoo-kpi {\n        --chart-height: 380px; }\n    :host .container.fullscreen.full-height {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1;\n      flex: 1;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n      :host .container.fullscreen.full-height .content {\n        -ms-flex: 1;\n        flex: 1; }\n        :host .container.fullscreen.full-height .content yoo-kpi {\n          --chart-height: 100%;\n          display: block;\n          height: 100%; }\n    :host .container .kpi-container {\n      height: 100%; }\n\n:host(.web:not(.insights)) .container:not(.fullscreen) {\n  height: 100%;\n  border-bottom: 1px solid var(--stable-ultralight, #F5F5F5); }\n  :host(.web:not(.insights)) .container:not(.fullscreen) .content {\n    height: 250px; }\n\n:host(.web.insights) .container {\n  height: 100%;\n  padding-bottom: var(--padding-15, 0.9375rem); }\n  :host(.web.insights) .container .heading {\n    padding-left: 1rem; }\n  :host(.web.insights) .container .content {\n    height: 250px;\n    padding-top: 1.125rem; }\n\n:host(.no-border) .container {\n  border-top: none;\n  border-bottom: none; }\n\n:host(.web) {\n  display: block;\n  height: 100%; }"; }
}

class YooKpiExternalComponent {
    render() {
        return (this.config && this.config.url ? h("iframe", { src: this.config.url }) : null);
    }
    static get is() { return "yoo-kpi-external"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
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
    static get style() { return ":host {\n  --height: 250px;\n  display: block;\n  height: var(--height); }\n  :host iframe {\n    width: 100%;\n    height: 100%;\n    border: 0 none; }"; }
}

class YooPivotTableComponent {
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
    static get style() { return ":host {\n  --height: 250px; }\n\n:host {\n  display: block;\n  height: 100%; }\n  :host .container {\n    width: 100%;\n    height: var(--height); }"; }
}

export { YooKpiComponent as YooKpi, YooKpiContainerComponent as YooKpiContainer, YooKpiExternalComponent as YooKpiExternal, YooPivotTableComponent as YooPivotTable };

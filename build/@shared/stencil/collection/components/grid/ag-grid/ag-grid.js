import { getRenderer } from './grid-renderers';
import { getComparator } from './grid-comparator';
import { cloneDeep, omit, isString } from 'lodash-es';
import { countValuesAggFunc, maxAggFunc, minAggFunc, avgAggFunc, sumAggFunc } from './grid-aggregate';
import { isDarkTheme } from '../../../index';
try {
    if (agGrid) {
        agGrid.LicenseManager.setLicenseKey('Yoobic_Yoobic_1Devs17_October_2019__MTU3MTI2NjgwMDAwMA==1c7f5f6453e03b399ef9180baa246eaa');
    }
}
catch (e) { }
export class YooAgGridComponent {
    componentDidLoad() {
        this.renderGrid();
    }
    componentDidUnload() {
        if (this.grid) {
            this.grid.destroy();
        }
    }
    onConfigChange() {
        this.renderGrid();
    }
    updateConfig() {
        this.options = cloneDeep(this.config);
        this.options.columnDefs = this.options.columnDefs.map((c) => (Object.assign({}, omit(c, ['cellRendererFramework', 'type', 'suppressExport', 'exportOrder', 'forceExport']), { cellRenderer: isString(c.cellRenderer) ? getRenderer(c.cellRenderer) : c.cellRenderer, cellRendererParams: c.cellRendererParams ? Object.assign({}, c.cellRendererParams, { innerRenderer: getRenderer(c.cellRendererParams.innerRenderer) }) : null, comparator: c.comparator ? getComparator(c.comparator) : null })));
        if (this.options.groupRowInnerRenderer) {
            this.options.groupRowInnerRenderer = getRenderer(this.options.groupRowInnerRenderer);
        }
        if (this.options.autoGroupColumnDef && this.options.autoGroupColumnDef.comparator) {
            this.options.autoGroupColumnDef.comparator = getComparator(this.options.autoGroupColumnDef.comparator);
        }
        if (this.options.detailCellRenderer && isString(this.options.detailCellRenderer)) {
            this.options.components = this.options.components || {};
            this.options.components[this.options.detailCellRenderer] = getRenderer(this.options.detailCellRenderer);
        }
        this.options.aggFuncs = {
            countValues: (values) => countValuesAggFunc(values),
            max: (values) => maxAggFunc(values),
            min: (values) => minAggFunc(values),
            avg: (values) => avgAggFunc(values),
            sum: (values) => sumAggFunc(values)
        };
    }
    renderGrid() {
        this.updateConfig();
        if (this.containerEl) {
            if (this.grid) {
                this.grid.destroy();
            }
            if (agGrid) {
                this.grid = new agGrid.Grid(this.containerEl, this.options);
            }
        }
    }
    render() {
        return (h("div", { ref: el => this.containerEl = el, class: {
                'flex container': true,
                'ag-theme-balham': !isDarkTheme(),
                'ag-theme-balham-dark': isDarkTheme()
            } }));
    }
    static get is() { return "yoo-ag-grid"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config",
            "watchCallbacks": ["onConfigChange"]
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-ag-grid:**/"; }
}

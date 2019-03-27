import { isWeb } from '../../../utils';
export class YooKpiComponent {
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
    static get style() { return "/**style-placeholder:yoo-kpi:**/"; }
}

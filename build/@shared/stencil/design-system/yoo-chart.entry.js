const h = window.DesignSystem.h;

import { ad as isIonic } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { e as Highcharts } from './chunk-262e5ad4.js';

class YooChartComponent {
    constructor() {
        this.doubleClicker = { clickedOnce: false, timer: null, timeBetweenClicks: 400 };
    }
    //private resizeListener: any;
    componentDidLoad() {
        const CHART_ANIMATION_TIMEOUT = 500;
        setTimeout(() => {
            this.renderChart();
        }, CHART_ANIMATION_TIMEOUT);
    }
    componentDidUnload() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
    onConfigChange() {
        this.renderChart();
    }
    isChartEmpty() {
        if (!this.config || !this.config.series || this.config.series.length === 0 || (this.config.series.length === 1 && (!this.config.series[0].data || this.config.series[0].data.length === 0))) {
            return true;
        }
        if (this.config && this.config.noData) {
            return true;
        }
        return false;
    }
    renderChart() {
        let options = this.config || {};
        if (!this.isChartEmpty()) {
            options.title = false;
            this.setupLegendListener(options);
            if (this.chartContainer) {
                this.chart = Highcharts.chart(this.chartContainer, options);
            }
        }
        else {
            if (this.chartContainer) {
                this.chartContainer.innerHTML = '';
                let emptyState = document.createElement('yoo-empty-state');
                let emptyStateClassSize = this.definition && this.definition.kpi ? 'small' : 'xsmall';
                emptyState.type = 'speedometer';
                emptyState.className = `absolute ${emptyStateClassSize}`;
                this.chartContainer.appendChild(emptyState);
            }
        }
    }
    // resize() {
    //     if (this.chart) {
    //         //this.chart.reflow();
    //     }
    // }
    setupLegendListener(options) {
        let context = this;
        options.plotOptions = options.plotOptions || {};
        options.plotOptions.series = options.plotOptions.series || {};
        if (isIonic()) {
            options.plotOptions.series.point = {
                cursor: 'pointer',
                events: {
                    click: function ($event) {
                        let point = this;
                        context.chartClick.emit(point);
                    },
                    dblclick: function ($event) {
                        let point = this;
                        context.chartDoubleClick.emit(point.keys || []);
                    }
                }
            };
        }
        else {
            options.plotOptions.series.point = {
                cursor: 'pointer',
                events: {
                    click: function ($event) {
                        let point = this;
                        context.chartClick.emit(point);
                        if (context.doubleClicker.clickedOnce === true && context.doubleClicker.timer) {
                            context.resetDoubleClick();
                            context.chartDoubleClick.emit(point.keys || []);
                        }
                        else {
                            context.doubleClicker.clickedOnce = true;
                            context.doubleClicker.timer = setTimeout(function () {
                                context.resetDoubleClick();
                            }, context.doubleClicker.timeBetweenClicks);
                        }
                    }
                }
            };
        }
        if (options.chart.type !== 'pie') {
            options.plotOptions.series.events = {
                legendItemClick: function () {
                    let serie = this;
                    context.chartLegendItemClick.emit({ [serie.name]: !serie.visible });
                }
            };
        }
        else {
            options.plotOptions.pie = options.plotOptions.pie || { point: {} };
            options.plotOptions.pie.point = options.plotOptions.pie.point || {};
            options.plotOptions.pie.point.events = {
                legendItemClick: function () {
                    let serie = this;
                    context.chartLegendItemClick.emit({ [serie.name]: !serie.visible });
                }
            };
        }
    }
    resetDoubleClick() {
        clearTimeout(this.doubleClicker.timer);
        this.doubleClicker.timer = null;
        this.doubleClicker.clickedOnce = false;
    }
    render() {
        return (h("div", { ref: (el) => this.chartContainer = el, class: "container" }));
    }
    static get is() { return "yoo-chart"; }
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
            "name": "chartClick",
            "method": "chartClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "chartDoubleClick",
            "method": "chartDoubleClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "chartLegendItemClick",
            "method": "chartLegendItemClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --height: 250px; }\n\n:host {\n  display: block; }\n  :host .container {\n    position: relative;\n    width: 100%;\n    height: var(--height); }\n\n.highcharts-credits {\n  display: none; }"; }
}

export { YooChartComponent as YooChart };

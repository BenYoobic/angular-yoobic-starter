import { translate, closeModal, dateFormat, isDarkTheme, isWeb, getAppContext } from '../../../index';
export class YooHealthscoreDialogComponent {
    constructor() {
        this.hideToolbar = false;
        this.selectedMode = 0;
        this.timeTabs = [];
    }
    componentWillLoad() {
        this.timeTabs = this.getTimesTabObject();
        this.setChartStyles();
        if (this.evolutions) {
            this.reverseEvolutionOrder();
            this.initChart();
        }
    }
    componentWillUpdate() {
        if (!this.evolution) {
            this.initChart();
        }
    }
    getTimesTabObject() {
        return [
            {
                title: translate('WEEK'),
                value: 'week'
            },
            {
                title: translate('MONTH'),
                value: 'month'
            },
            {
                title: translate('3MONTHS'),
                value: 'quarter'
            }
        ];
    }
    getChartTooltipOptions(formatter) {
        return {
            style: {
                color: isDarkTheme() ? '#212936' : '#ffffff'
            },
            backgroundColor: isDarkTheme() ? '#ffffff' : '#000000',
            borderRadius: 5,
            borderWidth: 0,
            formatter: formatter,
            crosshairs: [false, false],
            shadow: false
        };
    }
    onCancel() {
        this.reverseEvolutionOrder();
        closeModal(null);
    }
    setChartStyles() {
        const style = {
            fontSize: '10px',
            color: isDarkTheme() ? '#fff' : '#d0d0d0'
        };
        this.xAxis = {
            labels: {
                style: style,
                y: 25
            }
        };
        this.yAxis = {
            labels: {
                style: style
            },
            tickColor: '#d0d0d0'
        };
    }
    reverseEvolutionOrder() {
        for (let i = 0; i < this.evolutions.length; i++) {
            this.evolutions[i].evolution.reverse();
        }
    }
    initEvolution() {
        const EVOLUTION_CHART_HEIGHT_MOBILE = '151px';
        const EVOLUTION_CHART_HEIGHT_WEB = '180px';
        this.chartEvolutionConfig = {
            tooltip: this.getChartTooltipOptions(function () {
                return this.selectedMode === 0 ? `${this.x}` + ' : ' + `${this.y}` :
                    dateFormat(`${this.x}`.split('#')[1], 'DM') + ' : ' + `${this.y}`;
            }),
            chart: {
                height: isWeb() ? EVOLUTION_CHART_HEIGHT_WEB : EVOLUTION_CHART_HEIGHT_MOBILE,
                backgroundColor: isDarkTheme() ? '#212936' : '#fff'
            },
            title: { text: null },
            xAxis: Object.assign({}, this.xAxis, { tickmarkPlacement: 'on', tickInterval: this.selectedMode === 0 ? 1 : this.selectedMode === 1 ? 5 : 10, categories: [], title: {
                    text: translate('TIME')
                }, labels: {
                    formatter: function () {
                        let categorieDate = this.value.split('#')[0];
                        let selectedMode = this.value.split('#')[2];
                        if (typeof this.value === 'string') {
                            if (selectedMode === '0') {
                                return categorieDate;
                            }
                            else {
                                return dateFormat(categorieDate, 'DM');
                            }
                        }
                    },
                    style: {
                        'color': isDarkTheme() ? '#fff' : '#d0d0d0',
                        textOverflow: 'none'
                    }
                } }),
            yAxis: Object.assign({ min: 0, max: 100, title: {
                    text: translate('HEALTHSCORE')
                } }, this.yAxis),
            legend: {
                enabled: false
            },
            series: [{
                    type: 'areaspline',
                    data: [],
                    color: this.getColor('rgb(0, 255, 120)', 'rgb(21, 218, 186)', 0, 1)
                }],
            plotOptions: {
                areaspline: {
                    pointPlacement: 'on',
                    fillColor: this.getColor('rgb(128, 255, 188)', 'rgb(138, 237, 221)', 0, 1),
                    marker: {
                        enabled: false
                    },
                    lineWidth: 1
                }
            }
        };
        if (this.evolution && this.evolution.evolution) {
            const dayConvert = [translate('SUN'), translate('MON'), translate('TUE'), translate('WED'), translate('THU'), translate('FRI'), translate('SAT')];
            let series = this.chartEvolutionConfig.series;
            let categories = this.chartEvolutionConfig.xAxis.categories;
            let tempCategories = [];
            let realDates = [];
            this.evolution.evolution.map((e, index) => {
                let date = e.date;
                index = index + 1;
                switch (this.selectedMode) {
                    case 0:
                        let xDayValue = dayConvert[new Date(date).getDay()].toUpperCase();
                        series[0].data.push([xDayValue, e.value]);
                        categories.push(xDayValue + '#' + date + '#' + this.selectedMode);
                        break;
                    case 1:
                    case 2:
                        series[0].data.push([e.date, e.value]);
                        realDates.push(date);
                        if (index === 1 || index % 5 === 0) {
                            for (let i = 0; i < 5; i++) {
                                tempCategories.push(date);
                            }
                        }
                        else if (index === this.evolution.evolution.length) {
                            tempCategories.push(date);
                        }
                        break;
                    default:
                        break;
                }
            });
            if (tempCategories.length > 0) {
                for (let i = 0; i < tempCategories.length; i++) {
                    categories.push(tempCategories[i] + '#' + realDates[i] + '#' + this.selectedMode);
                }
            }
        }
    }
    initComparison() {
        const EVOLUTION_CHART_HEIGHT_MOBILE = '157px';
        const EVOLUTION_CHART_HEIGHT_WEB = '180px';
        let maxNumberStore = 0;
        let maxStoreScore = 0;
        let groupRange = 0;
        if (this.evolution) {
            maxNumberStore = Math.max.apply(Math, this.evolution.comparison.numberOfStoresInGroup.map(function (o) { if (o.value) {
                return o.value;
            } return null; }));
            groupRange = this.evolution.comparison.chartSettings.groupRange;
            maxStoreScore = groupRange * this.evolution.comparison.chartSettings.numberOfGroups;
        }
        this.chartComparisonConfig = {
            tooltip: this.getChartTooltipOptions(function () {
                return `${translate('NUMBERSTORES')}: ${this.y}`;
            }),
            chart: {
                type: 'column',
                height: isWeb() ? EVOLUTION_CHART_HEIGHT_WEB : EVOLUTION_CHART_HEIGHT_MOBILE,
                backgroundColor: isDarkTheme() ? '#212936' : '#fff'
            },
            title: { text: translate('COMPARISON') },
            xAxis: Object.assign({}, this.xAxis, { categories: [], min: this.evolution.comparison.chartSettings.startPoint, max: maxStoreScore, tickInterval: groupRange, title: {
                    text: translate('HEALTHSCORE')
                }, labels: {
                    formatter: function () {
                        return this.value === 1 ? 0 : Math.round(this.value / 10) * 10;
                    },
                    style: {
                        'color': isDarkTheme() ? '#fff' : '#d0d0d0',
                        textOverflow: 'none'
                    }
                } }),
            yAxis: Object.assign({ min: 0, max: maxNumberStore, tickInterval: 1, title: {
                    text: translate('NUMBERSTORES')
                } }, this.yAxis),
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    groupPadding: 0,
                    dataLabels: {
                        enabled: true
                    }
                },
                column: {
                    //stacking: 'normal',
                    grouping: false,
                    shadow: false,
                    borderWidth: 0,
                    pointPadding: 0
                }
            },
            series: [
                {
                    data: [],
                    dataLabels: {
                        enabled: false
                    },
                    color: this.getColor('#c3cfe2', '#f5f7fa', 1, 0),
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    pointWidth: 25,
                    xAxis: 0
                },
                {
                    data: [],
                    dataLabels: {
                        enabled: false
                    },
                    color: this.getColor('#c3cfe2', '#f5f7fa', 1, 0),
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    pointWidth: 25,
                    xAxis: 0
                },
                {
                    data: [],
                    dataLabels: {
                        enabled: false
                    },
                    color: this.getColor('#c3cfe2', '#f5f7fa', 1, 0),
                    xAxis: 0
                },
                {
                    data: [],
                    inside: false,
                    dataLabels: {
                        format: '{point.store}',
                        color: '#04cc99',
                        crop: false,
                        overflow: 'allow'
                    },
                    color: this.getColor('#04cc99', '#04cc99', 1, 0),
                    pointWidth: 2,
                    xAxis: 0,
                    enableMouseTracking: false
                },
                {
                    data: [],
                    inside: false,
                    dataLabels: {
                        format: '{point.average}',
                        color: '#fc459e',
                        crop: false,
                        overflow: 'allow'
                    },
                    color: this.getColor('#fc459e', '#fc459e', 1, 0),
                    pointWidth: 2,
                    xAxis: 0,
                    enableMouseTracking: false
                }
            ]
        };
        if (this.evolution && this.evolution.comparison && this.evolution.comparison.numberOfStoresInGroup) {
            let storeGroupNumber = this.evolution.comparison.myStore.groupNumber;
            let averageGroupNumber = this.evolution.comparison.average.groupNumber;
            let storeValue = this.evolution.comparison.myStore.value;
            let averageValue = this.evolution.comparison.average.value;
            let series = this.chartComparisonConfig.series;
            let categories = this.chartComparisonConfig.xAxis.categories;
            this.evolution.comparison.numberOfStoresInGroup.map((e, index) => {
                index = index + 1;
                const isStore = (e.groupNumber === storeGroupNumber);
                const isAverage = (e.groupNumber === averageGroupNumber);
                (!isStore && !isAverage && e.value) ? series[0].data.push({ 'x': (e.groupNumber - .5) * 10, 'y': e.value }) : series[0].data.push(null);
                isStore && e.value ? series[1].data.push({ 'x': (e.groupNumber - .5) * 10, 'y': e.value }) : series[1].data.push(null);
                isAverage && e.value ? series[2].data.push({ 'x': (e.groupNumber - .5) * 10, 'y': e.value }) : series[2].data.push(null);
                isStore && e.value && this.evolution.comparison.myStore.value ? series[3].data.push({ 'x': storeValue - 1, 'y': maxNumberStore * 0.9, 'store': Math.round(this.evolution.comparison.myStore.value) }) : series[3].data.push(0);
                isAverage && this.evolution.comparison.average.value ? series[4].data.push({ 'x': averageValue - 1, 'y': maxNumberStore * 0.9, 'average': Math.round(this.evolution.comparison.average.value) }) : series[4].data.push(0);
                categories.push(e.groupNumber);
            });
        }
    }
    getColor(start, end, y1, x2) {
        let color = {
            linearGradient: {
                x1: 0,
                y1: y1,
                x2: x2,
                y2: 0
            },
            stops: [
                [0, start],
                [1, end]
            ]
        };
        return color;
    }
    initChart() {
        this.evolution = this.evolutions[this.selectedMode];
        this.initEvolution();
        this.initComparison();
    }
    renderHealthscoreRange(range) {
        return (h("div", { class: "healthscore-number" }, (this.evolution[range] ?
            h("div", { class: range },
                h("div", { class: "value" }, this.evolution[range]),
                h("div", { class: "text" }, translate(range.toUpperCase())))
            : h("div", { class: "black" },
                h("div", { class: "value" }, "."),
                h("div", { class: "text" }, translate('NA'))))));
    }
    renderHealthscoreNumbers() {
        return (h("div", { class: "healthscore-numbers" },
            this.renderHealthscoreRange('lowest'),
            h("div", { class: "vertical-border" }),
            this.renderHealthscoreRange('current'),
            h("div", { class: "vertical-border" }),
            this.renderHealthscoreRange('highest')));
    }
    onTimeTabSelected(event) {
        let selectedTab = event.detail;
        let selectedTimeFrameIndex = this.timeTabs.indexOf(selectedTab);
        this.selectedMode = selectedTimeFrameIndex;
        this.initChart();
    }
    renderHealthscoreNavbar() {
        return (h("yoo-navbar", { class: "items-space-around small swiper-no-swiping", withLine: true, tabs: this.timeTabs, onTabSelected: (ev) => this.onTimeTabSelected(ev) }));
    }
    renderHealthscoreChart(chartConfig) {
        return (h("div", { class: "healthscore-chart" },
            h("yoo-chart", { config: chartConfig })));
    }
    renderHealthscoreEvolution() {
        return (h("div", { class: "healthscore-evolution" },
            !isWeb() && this.renderHealthscoreNavbar(),
            this.renderHealthscoreChart(this.chartEvolutionConfig)));
    }
    renderHealthscoreComparisonLegend() {
        return (h("div", { class: "legends" },
            h("div", { class: "legend" },
                h("div", { class: "text success" }, translate('MYSTORE2')),
                h("div", { class: "text info" }, translate('AVG'))),
            h("div", { class: "legend" },
                h("div", { class: "text stable-alt" }, translate('LASTHOUR')))));
    }
    renderHealthscoreComparison() {
        return (h("div", { class: "healthscore-comparison" },
            this.renderHealthscoreComparisonLegend(),
            this.renderHealthscoreChart(this.chartComparisonConfig)));
    }
    renderHealthscoreTitle(title) {
        return (h("div", { class: "healthscore-title swiper-no-swiping" }, translate(title.toUpperCase())));
    }
    renderEvolution() {
        return (this.evolution &&
            h("div", { class: "outer-container" },
                this.renderHealthscoreTitle('evolution'),
                this.renderHealthscoreNumbers(),
                this.renderHealthscoreEvolution(),
                this.renderHealthscoreTitle('comparison'),
                this.renderHealthscoreComparison()));
    }
    renderWeb() {
        return (this.evolution &&
            h("div", { class: { 'outer-container': true, 'toolbar': !this.hideToolbar } }, this.renderWebSlides()));
    }
    renderWebSlides() {
        let charts = ['evolution', 'comparison'];
        return (h("yoo-ion-slides", { pager: true }, charts.map((chartTitle) => {
            return h("yoo-ion-slide", { class: "navigation-padding" },
                h("div", { class: "slide-content" },
                    this.renderHealthscoreTitle(chartTitle),
                    this.renderHealthscoreNavbar(),
                    chartTitle === 'evolution' && [
                        this.renderHealthscoreNumbers(),
                        this.renderHealthscoreEvolution()
                    ],
                    chartTitle === 'comparison' && this.renderHealthscoreComparison()));
        })));
    }
    renderMobileContent() {
        return (h("yoo-ion-content", { scrollEnabled: true }, this.renderEvolution()));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return [
            !this.hideToolbar && h("yoo-ion-header", { class: "shadow", "no-border": true },
                h("yoo-ion-toolbar", { color: "light" },
                    h("yoo-ion-buttons", { slot: "start" },
                        h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                            h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                    h("yoo-ion-title", null, translate('OVERVIEW2')))),
            isWeb() ? this.renderWeb() : this.renderMobileContent()
        ];
    }
    static get is() { return "yoo-healthscore-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "evolution": {
            "state": true
        },
        "evolutions": {
            "type": "Any",
            "attr": "evolutions"
        },
        "hideToolbar": {
            "type": Boolean,
            "attr": "hide-toolbar"
        },
        "host": {
            "elementRef": true
        },
        "selectedMode": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-healthscore-dialog:**/"; }
}

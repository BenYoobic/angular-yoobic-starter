const h = window.DesignSystem.h;

import { cl as dashboardAnimation, B as isNumber, a_ as showModal, m as translate, ay as showAlert, b6 as translateMulti, W as isWeb, cm as isDarkTheme, a5 as getAppContext, Q as closeModal, A as dateFormat } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

const DEFAULT_HEALTHSCORE_LABELS = {
    reactivity: 'reactivity',
    complicance: 'compliance',
    accuracy: 'accuracy',
    review: 'review',
    visitScore: 'visitscore',
    healthScore: 'healthscore'
};
class YooHealthscoreComponent {
    constructor() {
        this.displayMode = 'regular';
        this.evolutions = [];
    }
    onScoresChanged(newScores) {
        this.setScoreAndEvolutions(newScores);
    }
    componentWillLoad() {
        this.setScoreAndEvolutions(this.scores);
    }
    componentDidLoad() {
        let elements = (this.host.shadowRoot || this.host).querySelectorAll('yoo-progress-bar-core');
        dashboardAnimation.addContainerElements(elements, true).instantPlay();
    }
    isMode(mode) {
        return this.displayMode === mode;
    }
    setupHealthscores(scores) {
        if (scores && scores.length && scores.map) {
            return scores[0];
        }
        return null;
    }
    getCurrentScore(scoreType, scoreValueType = 'today') {
        let formattedScoreType = scoreType === DEFAULT_HEALTHSCORE_LABELS.visitScore ? DEFAULT_HEALTHSCORE_LABELS.review : scoreType;
        let score = this.score && this.score[formattedScoreType] && this.score[formattedScoreType][scoreValueType];
        if (!isNumber(score)) {
            return null;
        }
        return score;
    }
    setScoreAndEvolutions(scores) {
        if (scores && scores.length) {
            this.score = this.setupHealthscores(scores);
            this.evolutions = scores.map(score => score.evolution);
        }
        else {
            this.score = null;
            this.evolutions = [];
        }
    }
    onShowDialog() {
        this.showDialog.emit(true);
        let dialog = document.createElement('yoo-healthscore-dialog');
        dialog.evolutions = this.evolutions;
        showModal(dialog, null, this.modalHost ? 'fullscreen' : null, 'slideYEnterAnimation', 'slideYLeaveAnimation', null, null, this.modalHost)
            .then(() => {
            if (dialog) {
                dialog = null;
            }
        });
    }
    onShowHelp(mode) {
        this.showHelp.emit(mode);
        let description = translate(mode.toUpperCase() + 'DESCRIPTION');
        showAlert(translate(mode.toUpperCase()), [translate('OK')], null, description);
    }
    renderShowDetailsButton() {
        return h("div", { class: "show-details-row" },
            h("yoo-button", { class: "medium gradient-success", onClick: () => this.onShowDialog(), text: translateMulti('SHOWDETAILS') }));
    }
    renderHelpButton(scoreType) {
        return (h("div", { class: "help-button", onClick: () => this.onShowHelp(scoreType) },
            h("yoo-icon", { class: "yo-help stable-alt" })));
    }
    renderTileContainer(scoreType) {
        if (this.score) {
            return (h("div", { class: "tile-container" },
                h("div", { class: "options" },
                    this.renderHelpButton(scoreType),
                    this.renderChangeContainer(this.getCurrentScore(scoreType, 'change'))),
                this.renderProgressLineContainer(scoreType)));
        }
        return null;
    }
    renderProgressLineContainer(scoreType) {
        let space = this.isMode('regular') ? '&nbsp;&nbsp;' : '';
        let progressLineParams = {
            extraLabel: `${space}${translate(scoreType.toUpperCase())}`,
            extraLabelFontSize: this.isMode('mini') ? 'small' : 'large'
        };
        return (h("div", { class: "progress-container" },
            h("yoo-progress-bar-core", { shape: "line", horizontalAlign: "left", verticalAlign: "top", allowNonAvailableValue: true, progressValue: this.getCurrentScore(scoreType), progressLabelFontSize: this.isMode('mini') ? 'small' : 'extra-large', progressUnitLabel: "none", progressParameters: progressLineParams })));
    }
    renderChangeContainer(change) {
        let isPositiveChange = change > 0;
        let isNegativeChange = change < 0;
        return (h("div", { class: "change-container" },
            h("div", { class: {
                    change: true,
                    success: isPositiveChange,
                    danger: isNegativeChange
                } },
                change !== 0 && (h("yoo-icon", { class: {
                        success: isPositiveChange,
                        danger: isNegativeChange,
                        'yo-big-arrow-up': isPositiveChange,
                        'yo-big-arrow-down': isNegativeChange
                    } })),
                h("div", { class: "change-amount" }, Math.round(change * 100) / 100))));
    }
    renderRegularHealthScore() {
        let currentHealthScore = this.getCurrentScore(DEFAULT_HEALTHSCORE_LABELS.healthScore);
        let currentHealthChange = this.getCurrentScore(DEFAULT_HEALTHSCORE_LABELS.healthScore, 'change');
        let currentNetworkScore = this.evolutions && this.evolutions[0] && this.evolutions[0].comparison.average.value || 0;
        let progressSemiCircleParams = {
            score: Math.round(currentNetworkScore),
            scoreDisplay: translate('NETWORK'),
            scoreFontSize: isWeb() ? 'small' : 'medium',
            scoreTextFontColor: isWeb() ? 'stable' : 'dark'
        };
        return (h("div", { class: "regular-container" },
            h("div", { class: {
                    'progress-block': isWeb()
                } },
                isWeb() && h("div", { class: "title-row" }, translate('HEALTHSCORE')),
                h("div", { class: "healthscore-container" },
                    h("div", { class: "semi-circle-row" },
                        h("div", { class: "low-container" },
                            h("span", { class: "low" }, translate('LOW'))),
                        h("div", { class: "semi-circle-container" },
                            h("yoo-progress-bar-core", { shape: "semi-circle", progressUnitLabel: "none", horizontalAlign: "middle", allowNonAvailableValue: true, progressLabelFontSize: "extra-large", progressParameters: progressSemiCircleParams, progressValue: currentHealthScore })),
                        h("div", { class: "high-container" },
                            this.renderHelpButton(DEFAULT_HEALTHSCORE_LABELS.healthScore),
                            this.renderChangeContainer(currentHealthChange),
                            h("div", null,
                                h("span", { class: "high" }, translate('HIGH'))))))),
            !isWeb() && this.renderShowDetailsButton(),
            !isWeb() ? this.renderTilesRow() :
                h("yoo-ion-scroll", { class: "relative" }, this.renderTilesRow())));
    }
    renderTilesRow() {
        return h("div", { class: "tiles-row" },
            this.renderTileContainer(DEFAULT_HEALTHSCORE_LABELS.reactivity),
            this.renderTileContainer(DEFAULT_HEALTHSCORE_LABELS.complicance),
            this.renderTileContainer(DEFAULT_HEALTHSCORE_LABELS.accuracy),
            this.renderTileContainer(DEFAULT_HEALTHSCORE_LABELS.visitScore));
    }
    renderMiniHealthScore() {
        let currentHealthScore = this.getCurrentScore(DEFAULT_HEALTHSCORE_LABELS.healthScore);
        let progressCircleParams = {
            score: Math.round(this.evolutions[0].comparison.average.value) || 0,
            scoreDisplay: translate('NETWORK'),
            scoreFontSize: 'extra-small',
            circleWidth: isWeb() ? 60 : 85
        };
        return h("div", { class: "mini-container", onClick: () => this.onShowDialog() },
            h("div", { class: "header-container" },
                h("div", { class: "title" },
                    " ",
                    translate('HEALTHSCORE')),
                h("div", { class: "subtitle" },
                    translate('RATED'),
                    " ",
                    currentHealthScore,
                    " ",
                    translate('OUTOF100'))),
            h("div", { class: "content-container" },
                h("div", { class: "circle-container" },
                    h("yoo-progress-bar-core", { shape: "circle", progressUnitLabel: "none", progressLabelFontSize: "extra-large", allowNonAvailableValue: true, progressParameters: progressCircleParams, progressValue: currentHealthScore })),
                h("div", { class: "lines-container" },
                    this.renderProgressLineContainer(DEFAULT_HEALTHSCORE_LABELS.reactivity),
                    this.renderProgressLineContainer(DEFAULT_HEALTHSCORE_LABELS.complicance),
                    this.renderProgressLineContainer(DEFAULT_HEALTHSCORE_LABELS.accuracy),
                    this.renderProgressLineContainer(DEFAULT_HEALTHSCORE_LABELS.visitScore))));
    }
    hostData() {
        return {
            class: Object.assign({ regular: this.isMode('regular'), mini: this.isMode('mini'), dark: isDarkTheme(), light: !isDarkTheme() }, getAppContext())
        };
    }
    render() {
        return this.isMode('mini') ? this.renderMiniHealthScore() : this.renderRegularHealthScore();
    }
    static get is() { return "yoo-healthscore"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "displayMode": {
            "type": String,
            "attr": "display-mode"
        },
        "evolutions": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "modalHost": {
            "type": "Any",
            "attr": "modal-host"
        },
        "score": {
            "state": true
        },
        "scores": {
            "type": "Any",
            "attr": "scores",
            "watchCallbacks": ["onScoresChanged"]
        }
    }; }
    static get events() { return [{
            "name": "showDialog",
            "method": "showDialog",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "showHelp",
            "method": "showHelp",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .progress-container {\n  width: 100%; }\n\n:host .regular-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n  :host .regular-container .title-row {\n    text-align: center; }\n  :host .regular-container .healthscore-container {\n    padding: 1rem; }\n    :host .regular-container .healthscore-container .semi-circle-row {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row; }\n      :host .regular-container .healthscore-container .semi-circle-row .low-container {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: end;\n        align-items: flex-end;\n        padding-right: 1rem;\n        color: var(--danger, #ff625f); }\n      :host .regular-container .healthscore-container .semi-circle-row .semi-circle-container {\n        -ms-flex-positive: 1;\n        flex-grow: 1; }\n      :host .regular-container .healthscore-container .semi-circle-row .high-container {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        padding-left: 1rem; }\n        :host .regular-container .healthscore-container .semi-circle-row .high-container span {\n          color: var(--success, #04CC99); }\n  :host .regular-container .show-details-row {\n    padding: 0 1rem; }\n  :host .regular-container .tiles-row {\n    padding: 1rem; }\n    :host .regular-container .tiles-row .tile-container {\n      margin: 0.75rem 0;\n      padding: 0.75rem 1rem 1rem 1rem;\n      border-radius: 0.5rem;\n      background-color: var(--ion-item-background-color, white);\n      -webkit-box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08));\n      box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08)); }\n      :host .regular-container .tiles-row .tile-container .options {\n        position: absolute;\n        right: 2rem;\n        width: 10%;\n        color: var(--dark, #2b3648);\n        z-index: 6; }\n        :host .regular-container .tiles-row .tile-container .options .change-container {\n          float: right; }\n  :host .regular-container .help-button {\n    color: var(--stable-alt, #d0d0d0);\n    text-align: right; }\n  :host .regular-container .change-container {\n    height: 100%;\n    color: var(--dark, #2b3648);\n    font-size: var(--font-s, 13px); }\n    :host .regular-container .change-container .change {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center; }\n      :host .regular-container .change-container .change yoo-icon {\n        font-size: 8px; }\n      :host .regular-container .change-container .change .change-amount {\n        width: 100%;\n        padding-left: 0.25rem;\n        text-align: right; }\n\n:host .mini-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  margin-bottom: 0.75rem;\n  padding-bottom: 0.75rem;\n  background-color: var(--light, #FFFFFF); }\n  \@media only screen and (min-width: 500px) {\n    :host .mini-container.container {\n      padding: 1.5rem 1rem; } }\n  :host .mini-container .header-container {\n    padding: 0.5rem 1rem;\n    color: var(--dark, #2b3648);\n    font-size: var(--font-s, 13px); }\n  :host .mini-container .content-container {\n    display: -ms-flexbox;\n    display: flex;\n    padding: 0.5rem 1rem; }\n    :host .mini-container .content-container .circle-container {\n      -ms-flex: 1.25;\n      flex: 1.25; }\n    :host .mini-container .content-container .lines-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 2;\n      flex: 2;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-flow: wrap;\n      flex-flow: wrap;\n      -ms-flex-align: center;\n      align-items: center;\n      padding: 0 0.5rem; }\n\n:host .subtitle {\n  color: var(--stable, #adadad); }\n\n:host(.web) .regular-container {\n  height: 100%; }\n  :host(.web) .regular-container .progress-block {\n    position: relative;\n    padding: var(--padding-15, 0.9375rem);\n    background-color: var(--light, #FFFFFF); }\n\n:host(.web) .mini-container .header-container .title {\n  font-size: var(--font-l, 17px); }\n\n:host(.location-detail) .mini-container .content-container .circle-container {\n  -ms-flex: initial;\n  flex: initial;\n  width: var(circle-size);\n  height: var(circle-size);\n  margin-right: 40px; }"; }
}

class YooHealthscoreDialogComponent {
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
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n  :host .outer-container .healthscore-title {\n    margin-top: var(--padding-20, 1.25rem);\n    text-align: center;\n    text-transform: uppercase; }\n  :host .outer-container .healthscore-numbers {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: center;\n    justify-content: center;\n    margin: 1.875rem 0.9375rem 0 0.9375rem; }\n    :host .outer-container .healthscore-numbers .healthscore-number {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-align: center;\n      align-items: center;\n      padding: 0 var(--padding-20, 1.25rem); }\n      :host .outer-container .healthscore-numbers .healthscore-number .highest {\n        color: var(--success, #04CC99); }\n      :host .outer-container .healthscore-numbers .healthscore-number .lowest {\n        color: var(--danger, #ff625f); }\n      :host .outer-container .healthscore-numbers .healthscore-number .value {\n        font-size: var(--font-xl, 36px);\n        font-weight: 300;\n        letter-spacing: 1px;\n        line-height: 2.625rem;\n        text-align: center; }\n      :host .outer-container .healthscore-numbers .healthscore-number .text {\n        margin-top: var(--padding-10, 0.625rem);\n        color: var(--stable, #adadad);\n        font-size: var(--font-xs, 10px);\n        letter-spacing: 0.7px;\n        text-transform: uppercase; }\n    :host .outer-container .healthscore-numbers .vertical-border {\n      width: 1px;\n      height: 1.875rem;\n      margin-top: 0.75rem;\n      border: solid 0.5px var(--stable-light, #f1f1f1); }\n  :host .outer-container .healthscore-evolution {\n    margin-top: 3.125rem;\n    border-bottom: 1px solid var(--stable-light, #f1f1f1); }\n    :host .outer-container .healthscore-evolution .healthscore-chart {\n      height: 10.3125rem;\n      margin-top: 1.875rem; }\n  :host .outer-container .healthscore-comparison .healthscore-chart {\n    height: 12.1875rem; }\n  :host .outer-container .healthscore-comparison .legends {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n    :host .outer-container .healthscore-comparison .legends .legend {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      padding: var(--padding-10, 0.625rem) 0.6875rem 0.3125rem 0.6875rem;\n      font-size: 0.625rem; }\n      :host .outer-container .healthscore-comparison .legends .legend .success {\n        color: var(--success, #04CC99); }\n      :host .outer-container .healthscore-comparison .legends .legend .info {\n        color: var(--info, #fc459e); }\n      :host .outer-container .healthscore-comparison .legends .legend .danger {\n        color: var(--danger, #ff625f); }\n      :host .outer-container .healthscore-comparison .legends .legend .stable-alt {\n        color: var(--text-color, #807f83); }\n\n:host .border {\n  width: 100%;\n  height: 0;\n  border-top: 1px solid var(--stable-30, #E6E6E6); }\n  :host .border.selected {\n    border-top: 1px solid var(--success, #04CC99); }\n\n:host(.web) {\n  background: var(--light, #FFFFFF); }\n  :host(.web) .outer-container {\n    display: block;\n    width: 100%;\n    height: 100%; }\n    :host(.web) .outer-container.toolbar {\n      height: calc(100% - 3rem); }\n    :host(.web) .outer-container yoo-ion-slides yoo-ion-slide .slide-content {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      width: 100%;\n      height: 100%;\n      padding-left: var(--padding-5, 0.3125rem); }\n      :host(.web) .outer-container yoo-ion-slides yoo-ion-slide .slide-content .healthscore-title {\n        margin-bottom: var(--padding-20, 1.25rem);\n        text-transform: unset; }\n      :host(.web) .outer-container yoo-ion-slides yoo-ion-slide .slide-content yoo-navbar {\n        margin: 0 var(--padding-20, 1.25rem); }\n      :host(.web) .outer-container yoo-ion-slides yoo-ion-slide .slide-content .healthscore-numbers {\n        -ms-flex-pack: start;\n        justify-content: flex-start;\n        margin: var(--padding-15, 0.9375rem) 0 0 var(--padding-10, 0.625rem); }\n        :host(.web) .outer-container yoo-ion-slides yoo-ion-slide .slide-content .healthscore-numbers .healthscore-number .value {\n          font-size: var(--font-lx, 27px); }\n        :host(.web) .outer-container yoo-ion-slides yoo-ion-slide .slide-content .healthscore-numbers .healthscore-number .text {\n          margin: 0; }\n      :host(.web) .outer-container yoo-ion-slides yoo-ion-slide .slide-content .healthscore-evolution {\n        margin-top: 0; }\n        :host(.web) .outer-container yoo-ion-slides yoo-ion-slide .slide-content .healthscore-evolution .healthscore-chart {\n          margin-top: var(--padding-10, 0.625rem); }\n    :host(.web) .outer-container yoo-ion-slides .swiper-pagination .swiper-pagination-bullet {\n      --bullet-background-active: var(--black, #000000); }"; }
}

export { YooHealthscoreComponent as YooHealthscore, YooHealthscoreDialogComponent as YooHealthscoreDialog };

import { translate, translateMulti } from '../../../index'; //'../../../../stencil';
import { sortBy } from 'lodash-es';
export class YooMissionScoreComponent {
    onScoreSelect(conf) {
        this.scoreSelect.emit(conf);
    }
    getChartsType() {
        let isPercentage = 0;
        let isNumber = 0;
        this.charts.map((conf) => {
            if (conf.score.isPercentage) {
                isPercentage++;
            }
            else {
                isNumber++;
            }
        });
        if (isPercentage && isNumber) {
            return 'mixed';
        }
        else if (isPercentage) {
            return 'percentage';
        }
        else {
            return 'points';
        }
    }
    renderMissionScore() {
        let type = this.getChartsType();
        let countActive = 0;
        let charts = sortBy(this.charts, c => c.score && c.score.isActive ? 0 : 1);
        return (h("div", { class: "score-item" },
            h("div", { class: "score-item-content" },
                h("div", { class: "mission-title" }, translate(this.header || 'SCORE')),
                h("div", { class: "menu-content" }, charts.map((conf, i) => {
                    if (conf.score.isActive && countActive < 1) {
                        countActive = 1;
                        return this.renderScoreActive(conf, type);
                    }
                    else {
                        return this.renderMissionScoreNotActive(conf, type, i);
                    }
                })))));
    }
    renderScoreActive(conf, type) {
        let unit = conf.score.isPercentage ? 'percentage' : type === 'mixed' ? 'points' : type;
        let progressCircleParameters = {
            score: this.networkScore,
            scoreFontSize: 'small',
            scoreDisplay: translate('NETWORKSCORE'),
            scoreValueFontColor: 'text-color',
            scoreUnitDisplay: unit,
            circleWidth: 60
        };
        return h("div", { class: "score-active-container" },
            h("div", { class: "menu-content-scoring", onClick: ev => this.onScoreSelect(conf) },
                h("div", null,
                    h("yoo-progress-bar-core", { shape: "circle", progressUnitLabel: unit, progressLabelFontSize: "extra-large", progressValue: conf.score.value, progressParameters: progressCircleParameters })),
                conf.score.title ? h("div", { class: "menu-title centered" }, translate(conf.score.title)) : null,
                conf.chart ? h("yoo-button", { text: translate('VIEWINSIGHTS'), class: "gradient-success medium" }) : null));
    }
    renderMissionScoreNotActive(conf, type, index) {
        let isOdd = Boolean(index & 1);
        let unit = conf.score.isPercentage ? 'percentage' : type === 'mixed' ? 'points' : type;
        let lineProgressParams = {
            lineWidth: type === 'points' ? 0 : 100
        };
        return h("div", { class: {
                'menu-content-scoring': true,
                'contrasted': isOdd,
                'percentage-display': conf.score.isPercentage && (type === 'percentage' || type === 'mixed'),
                'mixed-display': !conf.score.isPercentage && type === 'mixed',
                'points-display': type === 'points'
            }, onClick: ev => this.onScoreSelect(conf) },
            h("div", { class: "score-container" },
                h("span", null, translateMulti(conf.score.title))),
            h("div", { class: "progressbar-wrapper" },
                h("yoo-progress-bar-core", { shape: "line", verticalAlign: conf.score.isPercentage ? 'middle' : 'top', horizontalAlign: "right", progressUnitLabel: unit, progressParameters: lineProgressParams, progressValue: conf.score.value })));
    }
    render() {
        return this.charts && this.charts.length > 0 ? this.renderMissionScore() : null;
    }
    static get is() { return "yoo-mission-score"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "charts": {
            "type": "Any",
            "attr": "charts"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "host": {
            "elementRef": true
        },
        "networkScore": {
            "type": Number,
            "attr": "network-score"
        }
    }; }
    static get events() { return [{
            "name": "scoreSelect",
            "method": "scoreSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-mission-score:**/"; }
}

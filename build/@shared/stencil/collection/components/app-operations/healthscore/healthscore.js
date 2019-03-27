import { translate, translateMulti, showModal, showAlert, isWeb, dashboardAnimation, getAppContext } from '../../../index';
import { isDarkTheme } from '../../../utils';
import { isNumber } from 'lodash-es';
const DEFAULT_HEALTHSCORE_LABELS = {
    reactivity: 'reactivity',
    complicance: 'compliance',
    accuracy: 'accuracy',
    review: 'review',
    visitScore: 'visitscore',
    healthScore: 'healthscore'
};
export class YooHealthscoreComponent {
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
    static get style() { return "/**style-placeholder:yoo-healthscore:**/"; }
}

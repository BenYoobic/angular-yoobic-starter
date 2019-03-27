import { getAppContext } from '../../../index';
import { isFirefox, translate } from '../../../utils';
import * as progressBar from 'progressbar.js';
import { isNumber } from 'lodash-es';
const DEFAULT_TEXT_CLASS = 'progressbar-text';
const ProgressBar = progressBar.default;
const DEFAULT_PROGRESS_PARAMETERS = {
    trailWidth: 1
};
const DEFAULT_COLORS_THRESHOLD = {
    stable: {
        threshold: 0,
        color: '#eeeeee'
    },
    danger: {
        threshold: 0.2,
        color: '#ff625f'
    },
    warning: {
        threshold: 0.5,
        color: '#ff6402'
    },
    success: {
        threshold: 0.8,
        color: '#04CC99'
    },
    dangerlight: {
        threshold: null,
        color: '#F46885'
    }
};
const DEFAULT_PROGRESS_UNITS = {
    percentage: '%',
    points: ['pt', 'pts']
};
export class YooProgressBarCoreComponent {
    constructor() {
        this.progressUnitLabel = 'percentage';
        this.progressLabelFontSize = 'medium';
        this.progressLabelColor = 'dark';
        this.horizontalAlign = 'right';
        this.verticalAlign = 'middle';
        this.percentColorScheme = true;
        this.allowNonAvailableValue = false;
        this.progressAnimationDuration = 1400;
    }
    onProgressValueChanged(newProgress) {
        if (newProgress >= 0) {
            this.updatedProgress = newProgress;
        }
    }
    onCurrentStepChanged(updatedStep) {
        if (updatedStep >= 0) {
            this.updatedStep = updatedStep;
        }
    }
    onprogressParametersChange(newParams) {
        if (newParams) {
            this.progressParameters = newParams;
        }
    }
    componentWillLoad() {
        this.baseClass = !isFirefox() && this.host.shadowRoot ? '' : `sc-yoo-progress-bar-${this.shape}`;
    }
    componentDidLoad() {
        this.loadedProgressContainer = this.progressContainer;
        this.getFormattedScoreToDisplay();
    }
    componentDidUpdate() {
        this.getFormattedProgressValue();
        this.getFormattedScoreToDisplay();
    }
    /**
     * @description display the proper progress color based on the current progress value
     * @returns the proper class color for the progress bar
     */
    getProperColorProgressClass(progressElement, progress, percentColorScheme, isPointUnit) {
        let appContextClass = getAppContext();
        let colorArr = {
            'success': appContextClass.operations
                && !isPointUnit
                && (progress >= DEFAULT_COLORS_THRESHOLD.success.threshold
                    || !percentColorScheme),
            'warning': appContextClass.operations
                && !isPointUnit
                && percentColorScheme
                && progress >= DEFAULT_COLORS_THRESHOLD.warning.threshold
                && progress < DEFAULT_COLORS_THRESHOLD.success.threshold,
            'danger': appContextClass.operations
                && !isPointUnit
                && percentColorScheme
                && progress < DEFAULT_COLORS_THRESHOLD.warning.threshold
                && progress >= DEFAULT_COLORS_THRESHOLD.stable.threshold,
            'dangerlight': appContextClass.boost || false,
            'stable': isPointUnit
        };
        let properColor = Object.keys(colorArr).find(isProperColor => colorArr[isProperColor] === true);
        let strokeColor = DEFAULT_COLORS_THRESHOLD[properColor] ? DEFAULT_COLORS_THRESHOLD[properColor].color : DEFAULT_COLORS_THRESHOLD['stable'].color;
        progressElement.path.setAttribute('stroke', strokeColor);
    }
    /**
     *
     * @param progressValue
     * @param progressStepValues
     * @description display the proper label for the progress based on the unit and the progress value
     * @return a span containing the formatted text to display
     */
    getFormatedLabelToDisplay(progressValue, progressValueFontSize, progressStepValues) {
        let formattedProgress;
        if (!isNumber(progressValue)) {
            formattedProgress = translate('NA');
        }
        else {
            formattedProgress = Math.round(progressValue * 100);
        }
        let properPointUnit = formattedProgress > 1 ? ' pts' : ' pt';
        const FORMATTED_PROGRESS_DISPLAY = {
            'percentage': `<span>${formattedProgress}<span class="medium">%</span></span>`,
            'points': `<span>${formattedProgress}</span><span class="progress-point">${properPointUnit}</span>`,
            'step': progressStepValues ? `<span>${progressValue}/${progressStepValues[1]}</span>` : '',
            'none': formattedProgress
        };
        return `<span class="${progressValueFontSize}">${FORMATTED_PROGRESS_DISPLAY[this.progressUnitLabel]}</span>`;
    }
    /**
     * @description handle the calcul of the progress percentage for step mode
     * @returns a number value between 0 and 1.0 to set for the progress bar
     */
    getFormattedProgressValue() {
        if (this.progressUnitLabel === 'step') {
            return this.currentStep && this.maxStep ? this.currentStep / this.maxStep : 0;
        }
        else {
            return this.getPercentProgress();
        }
    }
    /**
     * @description handle the calculation of the progress in case of having a maxValue (export mode)
     * @returns a number value between 0 and 1.0 to set for the progress bar
     */
    getPercentProgress() {
        let progressValue = this.updatedProgress || this.progressValue;
        let properProgress;
        if (progressValue === null) {
            return null;
        }
        else {
            if (this.maxValue) {
                properProgress = progressValue / this.maxValue;
            }
            else {
                properProgress = progressValue / 100;
            }
            return Math.abs(properProgress);
        }
    }
    /**
     * @description get the proper css class for positioning the progress label based on its parameters
     * @returns a css class
     */
    getProperLabelPositionClass() {
        if (this.verticalAlign === this.horizontalAlign) {
            return this.verticalAlign;
        }
        return `${this.verticalAlign}-${this.horizontalAlign}`;
    }
    /**
     * @description display the proper network score label based on its parameters (only for semi-circle and circle)
     * @returns a span containing the formatted network score display
     */
    getFormattedScoreToDisplay() {
        let scoreDisplay = '';
        if (this.progressParameters) {
            let scoreValue;
            if (typeof this.progressParameters.score === 'number') {
                scoreValue = Math.round(this.progressParameters.score) || null;
            }
            else {
                scoreValue = this.progressParameters.score;
            }
            let scoreText = this.progressParameters.scoreDisplay || '';
            let scoreTextCase = this.progressParameters.scoreTextCase || 'capitalize';
            let scoreSizeClass = this.progressParameters.scoreFontSize || 'medium';
            let scoreUnit = this.getProperProgressUnitDisplay(this.progressParameters.scoreUnitDisplay, scoreValue) || '';
            let scoreTextColorClass = this.progressParameters.scoreTextFontColor || 'dark';
            let scoreValueColorClass = this.progressParameters.scoreValueFontColor || 'dark';
            let flipScoreDisplay = this.progressParameters.flipScoreDisplay ? 'flipped' : '';
            if (scoreValue) {
                scoreDisplay = `<p class="score-display ${flipScoreDisplay} ${scoreSizeClass} ${this.baseClass}">
                                    <span class="${scoreTextColorClass} ${scoreTextCase} ${this.baseClass}">${scoreText}</span>
                                    <span class="${scoreValueColorClass} ${this.baseClass}">${scoreValue}${scoreUnit}</span>
                                </p>`;
                this.progressParameters.generatedScoreDisplay = scoreDisplay;
            }
        }
    }
    getProperProgressUnitDisplay(unit, value) {
        if (unit === 'points' && value) {
            return value > 1 ? DEFAULT_PROGRESS_UNITS[unit][1] : DEFAULT_PROGRESS_UNITS[unit][0];
        }
        else {
            return DEFAULT_PROGRESS_UNITS[unit];
        }
    }
    /**
     * @description programatically add the 'sc-yoo-progress-bar-{shape}' class for every element generated by the progressbar.js library (svg, path0, path1, divs etc..)
     * without adding those classes, the respective class from the child component scss file wont be recognize in scoped mode
     */
    addBaseClass(progressElement, scopedBaseClass, colorProgress) {
        if (scopedBaseClass) {
            progressElement.svg.classList.add(scopedBaseClass);
            progressElement.svg.children[0].classList.add(scopedBaseClass);
            progressElement.svg.children[1].classList.add(scopedBaseClass, colorProgress);
        }
        else {
            progressElement.svg.children[1].classList.add(colorProgress);
        }
    }
    /**
     * @description concat all the class needed for correctly displaying the label based on the position, font-size etc..
     * @returns concatenation of css class
     */
    getProgressLabelClassAttribute() {
        let appContextClass = getAppContext();
        let negativeDisplay = this.progressValue < 0 ? 'negative-display' : '';
        let formattedProgressLabelColor = (appContextClass.boost && this.progressLabelColor !== 'dark') ? this.progressLabelColor = 'danger-light' : this.progressLabelColor;
        return `${this.baseClass} ${DEFAULT_TEXT_CLASS} ${this.getProperLabelPositionClass()} ${this.progressLabelFontSize} ${formattedProgressLabelColor} ${negativeDisplay}`;
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        let step = this.updatedStep || this.currentStep;
        const TagType = `yoo-progress-bar-${this.shape}`;
        let progressBarCoreAttrs = {
            progressValue: this.getFormattedProgressValue(),
            progressUnitLabel: this.progressUnitLabel,
            progressInstance: ProgressBar,
            progressStepValues: (step && this.maxStep) ? [step, this.maxStep] : null,
            progressLabelClassAttribute: this.getProgressLabelClassAttribute(),
            progressColorClassAttribute: this.getProperColorProgressClass,
            progressAnimationDuration: this.progressAnimationDuration,
            getFormatedLabelToDisplay: this.getFormatedLabelToDisplay,
            addBaseClass: this.addBaseClass,
            allowNonAvailableValue: this.allowNonAvailableValue,
            progressCoreParameters: DEFAULT_PROGRESS_PARAMETERS,
            progressCustomParameters: this.progressParameters,
            percentColorScheme: this.percentColorScheme
        };
        return (h(TagType, Object.assign({}, progressBarCoreAttrs)));
    }
    static get is() { return "yoo-progress-bar-core"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowNonAvailableValue": {
            "type": Boolean,
            "attr": "allow-non-available-value"
        },
        "currentStep": {
            "type": Number,
            "attr": "current-step",
            "watchCallbacks": ["onCurrentStepChanged"]
        },
        "horizontalAlign": {
            "type": String,
            "attr": "horizontal-align"
        },
        "host": {
            "elementRef": true
        },
        "loadedProgressContainer": {
            "state": true
        },
        "maxStep": {
            "type": Number,
            "attr": "max-step"
        },
        "maxValue": {
            "type": Number,
            "attr": "max-value"
        },
        "percentColorScheme": {
            "type": Boolean,
            "attr": "percent-color-scheme"
        },
        "progressAnimationDuration": {
            "type": Number,
            "attr": "progress-animation-duration"
        },
        "progressLabelColor": {
            "type": String,
            "attr": "progress-label-color",
            "mutable": true
        },
        "progressLabelFontSize": {
            "type": String,
            "attr": "progress-label-font-size"
        },
        "progressParameters": {
            "type": "Any",
            "attr": "progress-parameters",
            "mutable": true,
            "watchCallbacks": ["onprogressParametersChange"]
        },
        "progressUnitLabel": {
            "type": String,
            "attr": "progress-unit-label"
        },
        "progressValue": {
            "type": Number,
            "attr": "progress-value",
            "watchCallbacks": ["onProgressValueChanged"]
        },
        "properColorProgress": {
            "state": true
        },
        "shape": {
            "type": String,
            "attr": "shape"
        },
        "updatedProgress": {
            "state": true
        },
        "updatedStep": {
            "state": true
        },
        "verticalAlign": {
            "type": String,
            "attr": "vertical-align"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-progress-bar-core:**/"; }
}

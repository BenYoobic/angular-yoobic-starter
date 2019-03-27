import { getAppContext } from '../../../index';
import { isNumber } from 'lodash-es';
export class YooProgressBarSemiCircleComponent {
    constructor() {
        this.allowNonAvailableValue = false;
    }
    onProgressChange(newProgress) {
        if (this.progressBarElement) {
            this.animateProgressBar(newProgress);
        }
    }
    onprogressCustomParametersChange(newParams) {
        if (newParams) {
            this.progressCustomParameters = newParams;
        }
    }
    componentDidLoad() {
        if (this.progressContainer) {
            let progressLine = this.initProgressLine(this.progressContainer);
            if (progressLine) {
                this.animateProgressBar();
            }
        }
    }
    initProgressLine(progressContainer) {
        let progressConfig = Object.assign(this.progressCoreParameters, {
            easing: 'easeInOut',
            duration: this.progressAnimationDuration,
            svgStyle: {
                width: this.progressCustomParameters && this.progressCustomParameters.semiCircleWidth >= 0 ? `${this.progressCustomParameters.semiCircleWidth}%` : '100%'
            },
            text: {
                className: this.progressLabelClassAttribute
            },
            step: (state, semiCircleElement) => {
                if (semiCircleElement) {
                    let progressValue;
                    if (!isNumber(this.progressValue) && this.allowNonAvailableValue) {
                        progressValue = null;
                    }
                    else {
                        progressValue = this.progressValue > 1 ? semiCircleElement.value() * this.progressValue : semiCircleElement.value();
                    }
                    const baseClass = this.progressLabelClassAttribute.split(' ')[0];
                    let properColor = this.progressColorClassAttribute(semiCircleElement, progressValue, this.percentColorScheme, this.progressUnitLabel === 'points');
                    this.addBaseClass(semiCircleElement, baseClass, properColor);
                    let scoreDisplay = this.progressCustomParameters && this.progressCustomParameters.generatedScoreDisplay || '';
                    let progressValueFontSize = this.progressLabelClassAttribute.split(' ')[3];
                    let progressText = `${this.getFormatedLabelToDisplay(progressValue, progressValueFontSize)} ${scoreDisplay}`;
                    semiCircleElement.setText(progressText);
                }
            }
        });
        this.progressBarElement = new this.progressInstance.SemiCircle(progressContainer, progressConfig);
        return this.progressBarElement;
    }
    animateProgressBar(newProgress) {
        let progress = newProgress || this.progressValue;
        let formattedProgress = progress > 1 ? Math.round((progress * (100 / progress)) / 100) : progress;
        return this.progressBarElement.animate(formattedProgress);
    }
    renderProgressContainer() {
        let arrClassAttribute = this.progressLabelClassAttribute.split(' ');
        return h("div", { ref: el => this.progressContainer = el, class: `progressbar-container-semi-circle ${arrClassAttribute[2]}` });
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return this.renderProgressContainer();
    }
    static get is() { return "yoo-progress-bar-semi-circle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "addBaseClass": {
            "type": "Any",
            "attr": "add-base-class"
        },
        "allowNonAvailableValue": {
            "type": Boolean,
            "attr": "allow-non-available-value"
        },
        "getFormatedLabelToDisplay": {
            "type": "Any",
            "attr": "get-formated-label-to-display"
        },
        "host": {
            "elementRef": true
        },
        "percentColorScheme": {
            "type": Boolean,
            "attr": "percent-color-scheme"
        },
        "progressAnimationDuration": {
            "type": Number,
            "attr": "progress-animation-duration"
        },
        "progressColorClassAttribute": {
            "type": "Any",
            "attr": "progress-color-class-attribute"
        },
        "progressCoreParameters": {
            "type": "Any",
            "attr": "progress-core-parameters"
        },
        "progressCustomParameters": {
            "type": "Any",
            "attr": "progress-custom-parameters",
            "mutable": true,
            "watchCallbacks": ["onprogressCustomParametersChange"]
        },
        "progressInstance": {
            "type": "Any",
            "attr": "progress-instance"
        },
        "progressLabelClassAttribute": {
            "type": String,
            "attr": "progress-label-class-attribute"
        },
        "progressUnitLabel": {
            "type": String,
            "attr": "progress-unit-label"
        },
        "progressValue": {
            "type": Number,
            "attr": "progress-value",
            "watchCallbacks": ["onProgressChange"]
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-progress-bar-semi-circle:**/"; }
}

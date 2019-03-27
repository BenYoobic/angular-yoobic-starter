import { getAppContext } from '../../../index';
import { isNumber } from 'lodash-es';
export class YooProgressBarLineComponent {
    constructor() {
        this.allowNonAvailableValue = false;
    }
    onProgressChange(newProgress) {
        if (this.progressBarElement) {
            this.animateProgressBar(newProgress);
        }
    }
    onProgressStepValuesChange(newProgressStepValues) {
        if (newProgressStepValues) {
            this.updatedProgressValue = newProgressStepValues;
        }
    }
    componentDidLoad() {
        if (this.progressContainer) {
            this.negativeDisplay = this.progressContainer.classList.contains('negative-display');
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
                width: this.progressCustomParameters && this.progressCustomParameters.lineWidth >= 0 ? `${this.progressCustomParameters.lineWidth}%` : '100%'
            },
            text: {
                className: this.progressLabelClassAttribute
            },
            step: (state, lineElement) => {
                let progressText = '';
                let progressValue;
                if (!isNumber(this.progressValue) && this.allowNonAvailableValue) {
                    progressValue = null;
                }
                else {
                    progressValue = this.progressValue > 1 ? lineElement.value() * this.progressValue : lineElement.value();
                }
                let hideDisplayProgress = this.progressCustomParameters && this.progressCustomParameters.hideProgressValue;
                if (lineElement) {
                    const baseClass = this.progressLabelClassAttribute.split(' ')[0];
                    let properColor = this.progressColorClassAttribute(lineElement, progressValue, this.percentColorScheme, this.progressUnitLabel === 'points');
                    this.addBaseClass(lineElement, baseClass, properColor);
                    if (!hideDisplayProgress) {
                        let extraLabelFontSizeClass = this.getCustomParameters('extraLabelFontSize') || 'medium';
                        let extraLabel = this.getCustomParameters('extraLabel') || '';
                        let formattedExtraTitle = extraLabel ? `<span class="${baseClass} ${extraLabelFontSizeClass}">${extraLabel}</span>` : '';
                        let progressValueFontSize = this.progressLabelClassAttribute.split(' ')[3];
                        if (this.negativeDisplay) {
                            progressValue = 0 - lineElement.value() * 2;
                            //     this.setNegativeProgressStyle(progressElement, progressValue);
                        }
                        else if (this.progressStepValues && this.progressStepValues.length) {
                            let stepValues = this.updatedProgressValue || this.progressStepValues;
                            let currentStep = stepValues[0];
                            progressValue = Math.round(lineElement.value() * (currentStep / lineElement.value()));
                            progressText = `${this.getFormatedLabelToDisplay(progressValue, progressValueFontSize, stepValues)} ${formattedExtraTitle}`;
                            lineElement.setText(progressText);
                        }
                        else {
                            progressText = `<p class="${baseClass}">${this.getFormatedLabelToDisplay(progressValue, progressValueFontSize)} ${formattedExtraTitle}</p>`;
                            lineElement.setText(progressText);
                        }
                    }
                }
            }
        });
        this.progressBarElement = new this.progressInstance.Line(progressContainer, progressConfig);
        return this.progressBarElement;
    }
    animateProgressBar(newProgress) {
        let progress = this.progressValue;
        if (newProgress) {
            progress = newProgress;
        }
        let uploadingMode = this.progressCustomParameters && this.progressCustomParameters.uploadingMode || false;
        if (uploadingMode) {
            let processUploadingProgressAnimation = this.setUploadingMode();
            return processUploadingProgressAnimation;
        }
        else {
            let formattedProgress = progress > 1 ? Math.round((progress * (100 / progress)) / 100) : progress;
            let processUpdatedProgressAnimation = this.progressBarElement.animate(formattedProgress);
            return processUpdatedProgressAnimation;
        }
    }
    /**
     * Negative display for progress bar currently disabled
     */
    // private setNegativeProgressStyle(progressElement: any, progressValue: number) {
    //     const NEGATIVE_PROGRESS_PATH = 'M 50,0.5 L 100,0.5';
    //     progressElement.path.setAttribute('stroke', '#f1f1f1');       
    //     progressElement.path.style.strokeDashoffset = progressElement.path.style.strokeDashoffset * 2;
    //     progressElement.path.setAttribute('d', NEGATIVE_PROGRESS_PATH);
    //     if (progressValue >= -1 && progressValue <= 0) {
    //         progressElement.path.setAttribute('stroke', '#845cff');
    //         progressText = `${this.getFormatedLabelToDisplay(progressValue, progressValueFontSize, this.progressStepValues)} ${formattedExtraTitle}`
    //         console.log('progressValue : ', progressValue);
    //         progressElement.setText(progressText);
    //     }
    // }
    setUploadingMode() {
        for (let i = 0; i < 33; i++) {
            let timeoutProgress = 1000 * i;
            let uploadingProgress = 0;
            setTimeout(() => {
                let progress = uploadingProgress += i * (0.03);
                if (this.progressBarElement) {
                    this.progressBarElement.animate(progress);
                }
            }, timeoutProgress);
        }
    }
    getCustomParameters(parameter) {
        if (this.progressCustomParameters) {
            if (this.progressCustomParameters[parameter]) {
                return this.progressCustomParameters[parameter];
            }
        }
        return '';
    }
    renderProgressContainer() {
        let arrClassAttribute = this.progressLabelClassAttribute.split(' ');
        let negativeDisplay = arrClassAttribute[5];
        let classPosition = !(this.progressCustomParameters && this.progressCustomParameters.hideProgressValue) ? arrClassAttribute[2] : '';
        return h("div", { ref: el => this.progressContainer = el, class: `progressbar-container-line ${classPosition} ${negativeDisplay}` },
            negativeDisplay && h("span", { class: "marker" }),
            negativeDisplay && h("span", { class: "base-graduation" }, "0"));
    }
    hostData() {
        return {
            class: getAppContext()
        };
    }
    render() {
        return this.renderProgressContainer();
    }
    static get is() { return "yoo-progress-bar-line"; }
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
            "attr": "progress-custom-parameters"
        },
        "progressInstance": {
            "type": "Any",
            "attr": "progress-instance"
        },
        "progressLabelClassAttribute": {
            "type": String,
            "attr": "progress-label-class-attribute"
        },
        "progressStepValues": {
            "type": "Any",
            "attr": "progress-step-values",
            "watchCallbacks": ["onProgressStepValuesChange"]
        },
        "progressUnitLabel": {
            "type": String,
            "attr": "progress-unit-label"
        },
        "progressValue": {
            "type": Number,
            "attr": "progress-value",
            "watchCallbacks": ["onProgressChange"]
        },
        "updatedProgressValue": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-progress-bar-line:**/"; }
}

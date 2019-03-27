import { h } from '../design-system.core.js';

import { B as isNumber, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooProgressBarLineComponent {
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
    static get style() { return ":host .extra-small {\n  font-size: var(--font-xs, 10px) !important; }\n\n:host .small {\n  font-size: var(--font-s, 13px) !important; }\n\n:host .medium {\n  font-size: var(--font-m, 15px) !important; }\n\n:host .large {\n  font-size: var(--font-l, 17px) !important; }\n\n:host .extra-large {\n  font-size: var(--font-xl, 36px) !important; }\n\n:host .extra-extra-large {\n  font-size: var(--font-xxl, 60px) !important; }\n\n:host .dark {\n  color: var(--dark, #2b3648) !important; }\n\n:host .stable {\n  color: var(--stable, #adadad) !important; }\n\n:host .text-color {\n  color: var(--text-color, #807f83) !important; }\n\n:host .lowercase {\n  text-transform: lowercase !important; }\n\n:host .uppercase {\n  text-transform: uppercase !important; }\n\n:host .capitalize {\n  text-transform: capitalize !important; }\n\n:host .pb-success {\n  stroke: var(--success, #04CC99) !important; }\n\n:host .pb-warning {\n  stroke: var(--warning, #ff6402) !important; }\n\n:host .pb-danger {\n  stroke: var(--danger, #ff625f) !important; }\n\n:host .pb-stable {\n  stroke: var(--trail-bar-color, #ebebeb) !important; }\n\n:host .pb-danger-light {\n  stroke: var(--danger-light, #F46885) !important; }\n\n:host .progressbar-container-line {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative; }\n  :host .progressbar-container-line svg {\n    max-height: 0.125rem;\n    padding: 0; }\n  :host .progressbar-container-line.negative-display svg {\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg); }\n  :host .progressbar-container-line.negative-display .marker {\n    position: absolute;\n    height: 0.5rem;\n    border: 0.5px solid var(--royal, #845cff);\n    z-index: 2; }\n  :host .progressbar-container-line.negative-display .base-graduation {\n    position: absolute;\n    font-size: var(--font-xs, 10px); }\n  :host .progressbar-container-line.negative-display[class*=\"top\"] .marker {\n    right: 50%;\n    margin-top: 0.15rem; }\n  :host .progressbar-container-line.negative-display[class*=\"top\"] .base-graduation {\n    right: 49.5%;\n    margin-top: 1.15rem; }\n  :host .progressbar-container-line.negative-display[class*=\"bottom\"] .marker {\n    right: 50%;\n    margin-top: -0.15rem; }\n  :host .progressbar-container-line.negative-display[class*=\"bottom\"] .base-graduation {\n    right: 49.5%;\n    margin-top: 0.5rem; }\n  :host .progressbar-container-line.negative-display.middle-left svg {\n    padding-right: 1rem !important;\n    padding-left: 0 !important; }\n  :host .progressbar-container-line.negative-display.middle-left .marker {\n    right: calc(50% - 1.45rem);\n    margin-top: 0.3rem; }\n  :host .progressbar-container-line.negative-display.middle-left .base-graduation {\n    top: 0.9rem;\n    right: calc(50% - 1.6rem); }\n  :host .progressbar-container-line.negative-display.middle-right svg {\n    padding-right: 0 !important;\n    padding-left: 1rem !important; }\n  :host .progressbar-container-line.negative-display.middle-right .marker {\n    right: calc(50% + 1.75rem);\n    margin-top: 0.35rem; }\n  :host .progressbar-container-line.negative-display.middle-right .base-graduation {\n    top: 0.9rem;\n    right: calc(50% + 1.6rem); }\n  :host .progressbar-container-line[class*=\"top\"] {\n    -ms-flex-direction: column-reverse;\n    flex-direction: column-reverse; }\n  :host .progressbar-container-line[class*=\"bottom\"] {\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  :host .progressbar-container-line.middle-right {\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host .progressbar-container-line.middle-right svg {\n      padding-right: 1rem !important; }\n  :host .progressbar-container-line.middle-left {\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host .progressbar-container-line.middle-left svg {\n      padding-left: 1rem !important; }\n  :host .progressbar-container-line .progressbar-text {\n    position: inherit !important;\n    left: auto !important;\n    -webkit-transform: inherit !important;\n    transform: inherit !important;\n    white-space: nowrap; }\n    :host .progressbar-container-line .progressbar-text p {\n      margin: 0; }\n    :host .progressbar-container-line .progressbar-text[class*=\"right\"] {\n      text-align: right; }\n    :host .progressbar-container-line .progressbar-text[class*=\"middle\"] {\n      text-align: center; }\n    :host .progressbar-container-line .progressbar-text[class*=\"left\"] {\n      text-align: left; }\n    :host .progressbar-container-line .progressbar-text[class*=\"top\"] {\n      padding-bottom: 0.25rem !important; }\n    :host .progressbar-container-line .progressbar-text[class*=\"bottom\"] {\n      padding-top: 0.25rem !important; }\n\n/** MOBILE SPECIFIC STYLE **/\n/** WEB SPECIFIC STYLE **/\n:host(.web) .progressbar-container-line svg path {\n  stroke-width: 1 !important; }"; }
}

export { YooProgressBarLineComponent as YooProgressBarLine };

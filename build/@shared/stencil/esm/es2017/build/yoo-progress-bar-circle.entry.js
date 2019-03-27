import { h } from '../design-system.core.js';

import { x as getSession, B as isNumber, dd as getFormattedCountDownToDisplay, v as isAndroid, de as requestInterval } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooProgressBarCircleComponent {
    constructor() {
        this.allowNonAvailableValue = false;
    }
    onprogressCustomParametersChange(newParams) {
        if (newParams) {
            this.progressCustomParameters = newParams;
        }
    }
    onProgressChange(newProgress) {
        if (this.progressBarElement) {
            this.animateProgressBar(newProgress);
        }
    }
    componentWillLoad() {
        this.session = getSession();
    }
    componentDidLoad() {
        if (this.progressContainer) {
            let progressLine = this.initProgressLine(this.progressContainer);
            if (progressLine) {
                let timerMode = this.progressCustomParameters && this.progressCustomParameters.countDownMode;
                if (timerMode) {
                    this.initTimer();
                }
                else {
                    this.animateProgressBar();
                }
            }
        }
    }
    initProgressLine(progressContainer) {
        let progressConfig = Object.assign(this.progressCoreParameters, {
            easing: this.progressValue ? 'easeInOut' : 'linear',
            duration: this.progressAnimationDuration,
            svgStyle: {
                width: this.progressCustomParameters && this.progressCustomParameters.circleWidth >= 0 ? `${this.progressCustomParameters.circleWidth}%` : '100%'
            },
            text: {
                className: this.progressLabelClassAttribute
            },
            step: (state, circleElement) => {
                if (circleElement) {
                    if (!this.circleElement) {
                        this.circleElement = circleElement;
                    }
                    let progressValue;
                    if (!isNumber(this.progressValue) && this.allowNonAvailableValue) {
                        progressValue = null;
                    }
                    else {
                        progressValue = this.progressValue > 1 ? circleElement.value() * this.progressValue : circleElement.value();
                    }
                    const baseClass = this.progressLabelClassAttribute.split(' ')[0];
                    let properColor = this.progressColorClassAttribute(circleElement, progressValue, this.percentColorScheme, this.progressUnitLabel === 'points');
                    this.addBaseClass(circleElement, baseClass, properColor);
                    let timerMode = this.progressCustomParameters && this.progressCustomParameters.countDownMode;
                    if (!timerMode) {
                        let scoreDisplay = this.progressCustomParameters && this.progressCustomParameters.generatedScoreDisplay || '';
                        let progressValueFontSize = this.progressLabelClassAttribute.split(' ')[3];
                        let progressText = `${this.getFormatedLabelToDisplay(progressValue, progressValueFontSize)} ${scoreDisplay}`;
                        circleElement.setText(progressText);
                    }
                }
            }
        });
        this.progressBarElement = new this.progressInstance.Circle(progressContainer, progressConfig);
        return this.progressBarElement;
    }
    initTimer() {
        const ONE_SECOND_INTERVAL = 1000;
        const FULL_PROGRESS = 1;
        let countDownValue = 0;
        let countDownStartValue = (this.progressCustomParameters && this.progressCustomParameters.countDownStartValue) || 0;
        if (this.circleElement && this.progressBarElement) {
            if (this.session && this.session.timerCountDownState) {
                countDownValue = this.session.timerCountDownState;
                this.circleElement.setText(getFormattedCountDownToDisplay(countDownValue));
                if (!isAndroid()) {
                    let resumedProgress = countDownValue / countDownStartValue;
                    this.progressBarElement.set(resumedProgress);
                }
                else {
                    this.progressBarElement.set(FULL_PROGRESS);
                }
            }
            else {
                this.circleElement.setText(getFormattedCountDownToDisplay(countDownStartValue));
                this.progressBarElement.set(FULL_PROGRESS);
                countDownValue = countDownStartValue + 1;
            }
            requestInterval(() => {
                countDownValue--;
                if (countDownValue >= 0) {
                    this.sendTimerCountDownState.emit(countDownValue);
                    this.circleElement.setText(getFormattedCountDownToDisplay(countDownValue));
                    if (!isAndroid()) {
                        this.progressBarElement.animate(countDownValue / countDownStartValue);
                    }
                    if (countDownValue === 0) {
                        this.timeFinished.emit();
                    }
                }
            }, ONE_SECOND_INTERVAL);
        }
    }
    animateProgressBar(newProgress) {
        let progress = newProgress || this.progressValue;
        let formattedProgress = progress > 1 ? Math.round((this.progressValue * (100 / progress)) / 100) : progress;
        this.progressBarElement.animate(formattedProgress);
    }
    renderProgressContainer() {
        return h("div", { ref: el => this.progressContainer = el, class: "progressbar-container-circle" });
    }
    render() {
        return this.renderProgressContainer();
    }
    static get is() { return "yoo-progress-bar-circle"; }
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
        "circleElement": {
            "state": true
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
        },
        "timerDisplay": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "timeFinished",
            "method": "timeFinished",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "sendTimerCountDownState",
            "method": "sendTimerCountDownState",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .extra-small {\n  font-size: var(--font-xs, 10px) !important; }\n\n:host .small {\n  font-size: var(--font-s, 13px) !important; }\n\n:host .medium {\n  font-size: var(--font-m, 15px) !important; }\n\n:host .large {\n  font-size: var(--font-l, 17px) !important; }\n\n:host .extra-large {\n  font-size: var(--font-xl, 36px) !important; }\n\n:host .extra-extra-large {\n  font-size: var(--font-xxl, 60px) !important; }\n\n:host .dark {\n  color: var(--dark, #2b3648) !important; }\n\n:host .stable {\n  color: var(--stable, #adadad) !important; }\n\n:host .text-color {\n  color: var(--text-color, #807f83) !important; }\n\n:host .lowercase {\n  text-transform: lowercase !important; }\n\n:host .uppercase {\n  text-transform: uppercase !important; }\n\n:host .capitalize {\n  text-transform: capitalize !important; }\n\n:host .pb-success {\n  stroke: var(--success, #04CC99) !important; }\n\n:host .pb-warning {\n  stroke: var(--warning, #ff6402) !important; }\n\n:host .pb-danger {\n  stroke: var(--danger, #ff625f) !important; }\n\n:host .pb-stable {\n  stroke: var(--trail-bar-color, #ebebeb) !important; }\n\n:host .pb-danger-light {\n  stroke: var(--danger-light, #F46885) !important; }\n\n:host .progressbar-container-circle {\n  display: -ms-flexbox;\n  display: flex; }\n  :host .progressbar-container-circle svg {\n    display: -ms-flexbox;\n    display: flex;\n    margin: 0 auto;\n    overflow: inherit; }\n    :host .progressbar-container-circle svg path {\n      stroke-width: 1.25 !important; }\n\n:host .progressbar-text {\n  display: -ms-flexbox;\n  display: flex;\n  top: 50% !important;\n  bottom: inherit !important;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translate(-50%, -50%) !important;\n  transform: translate(-50%, -50%) !important;\n  text-align: center; }\n  :host .progressbar-text .score-display {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    margin: 0; }\n    :host .progressbar-text .score-display.flipped {\n      -ms-flex-direction: row-reverse !important;\n      flex-direction: row-reverse !important; }\n    :host .progressbar-text .score-display span {\n      padding: 0 0.125rem; }"; }
}

export { YooProgressBarCircleComponent as YooProgressBarCircle };

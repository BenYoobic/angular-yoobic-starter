const h = window.DesignSystem.h;

import { B as isNumber, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooProgressBarSemiCircleComponent {
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
    static get style() { return ":host .extra-small {\n  font-size: var(--font-xs, 10px) !important; }\n\n:host .small {\n  font-size: var(--font-s, 13px) !important; }\n\n:host .medium {\n  font-size: var(--font-m, 15px) !important; }\n\n:host .large {\n  font-size: var(--font-l, 17px) !important; }\n\n:host .extra-large {\n  font-size: var(--font-xl, 36px) !important; }\n\n:host .extra-extra-large {\n  font-size: var(--font-xxl, 60px) !important; }\n\n:host .dark {\n  color: var(--dark, #2b3648) !important; }\n\n:host .stable {\n  color: var(--stable, #adadad) !important; }\n\n:host .text-color {\n  color: var(--text-color, #807f83) !important; }\n\n:host .lowercase {\n  text-transform: lowercase !important; }\n\n:host .uppercase {\n  text-transform: uppercase !important; }\n\n:host .capitalize {\n  text-transform: capitalize !important; }\n\n:host .pb-success {\n  stroke: var(--success, #04CC99) !important; }\n\n:host .pb-warning {\n  stroke: var(--warning, #ff6402) !important; }\n\n:host .pb-danger {\n  stroke: var(--danger, #ff625f) !important; }\n\n:host .pb-stable {\n  stroke: var(--trail-bar-color, #ebebeb) !important; }\n\n:host .pb-danger-light {\n  stroke: var(--danger-light, #F46885) !important; }\n\n:host .progressbar-container-semi-circle svg {\n  overflow: inherit; }\n  :host .progressbar-container-semi-circle svg path:first-child {\n    stroke-opacity: 1;\n    fill-opacity: 1;\n    fill: var(--ion-item-background-color, white); }\n  :host .progressbar-container-semi-circle svg path:last-child {\n    stroke-width: 1.5 !important; }\n\n:host .progressbar-text {\n  display: -ms-flexbox;\n  display: flex;\n  top: 50% !important;\n  bottom: inherit !important;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translate(-50%, -40%) !important;\n  transform: translate(-50%, -40%) !important;\n  text-align: center; }\n  :host .progressbar-text.extra-extra-large {\n    -webkit-transform: translate(-50%, -50%) !important;\n    transform: translate(-50%, -50%) !important; }\n  :host .progressbar-text .score-display {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    margin: 0; }\n    :host .progressbar-text .score-display.flipped {\n      -ms-flex-direction: row-reverse !important;\n      flex-direction: row-reverse !important; }\n    :host .progressbar-text .score-display span {\n      padding: 0 0.125rem; }\n\n/** MOBILE SPECIFIC STYLE **/\n:host(.mobile) .progressbar-container-semi-circle svg path:first-child {\n  stroke-opacity: 0 !important; }\n\n/** WEB SPECIFIC STYLE **/"; }
}

export { YooProgressBarSemiCircleComponent as YooProgressBarSemiCircle };

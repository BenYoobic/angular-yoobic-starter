import { getElementDimensions, isIonic, translateMulti, debounce } from '../../../utils';
export class YooFormProgressIndicatorComponent {
    constructor() {
        this.steps = [];
        this.isCompleted = false;
        this.displayMode = 'number';
        this.shownSteps = 7;
        // Index position for the context menu
        this.contextStep = this.shownSteps - 2;
        this.MAX_STEPS = 7;
        this.STEP_SIZE = 135;
        this.collapsedSteps = [];
        this.visibleSteps = [];
    }
    componentWillLoad() {
        // check on load
        if (!isIonic()) {
            this.setStepNumber();
            // check on resize
            // check the body width here and set max steps accordingly
            this.resizeListener = debounce(this.setStepNumber, 500).bind(this);
            window.addEventListener('resize', this.resizeListener);
        }
    }
    componentDidLoad() {
        this.setProgressStyles();
        this.centerCurrentProgress();
    }
    componentDidUpdate() {
        this.setProgressStyles();
        this.centerCurrentProgress();
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    selectStep(event, index) {
        if (event) {
            this.stepSelected.emit(index);
            if (this.isCurrentStep(index)) {
                this.centerCurrentProgress();
            }
            else {
                this.textTruncate.hideText();
            }
        }
    }
    setStepNumber() {
        let dimensions = getElementDimensions(this.host.parentElement);
        let width = dimensions.width;
        let height = dimensions.height;
        if (this.host.classList.contains('vertical')) {
            this.shownSteps = Math.min(Math.floor(height / this.STEP_SIZE), this.MAX_STEPS - 1);
        }
        else {
            this.shownSteps = Math.min(Math.floor(width / this.STEP_SIZE), this.MAX_STEPS - 1);
        }
        this.contextStep = this.shownSteps - 1;
    }
    async centerCurrentProgress() {
        const TEXT_TRUNCATE_RENDER_TIME = 100;
        const textTruncate = this.textTruncate ? await this.textTruncate.getSingleLineTextElement() : undefined;
        const moreButton = this.textTruncate ? await this.textTruncate.getSingleLineButttonElement() : undefined;
        setTimeout(() => {
            if (this.scroll) {
                const PADDING = 15;
                let leftPosition = (this.scroll.getBoundingClientRect().left);
                let rightPostion = (this.scroll.getBoundingClientRect().right);
                let textTruncateRight = textTruncate ? textTruncate.getBoundingClientRect().right : 0;
                let currentCirclePosition = this.currentCircle ? this.currentCircle.getBoundingClientRect().left : 0;
                if (currentCirclePosition < 15 || moreButton) {
                    let distanceToLeft = currentCirclePosition - (leftPosition) - PADDING;
                    this.scroll.scrollByPoint(distanceToLeft, 0, 300);
                }
                else if (textTruncateRight > rightPostion) {
                    let distanceToRight = (textTruncateRight - rightPostion) + PADDING;
                    this.scroll.scrollByPoint(distanceToRight, 0, 300);
                }
            }
        }, TEXT_TRUNCATE_RENDER_TIME);
    }
    setProgressStyles() {
        const SIDE_PADDING = 15;
        const STEP_CONTAINER_WIDTH = 32;
        let scrollWidth = getElementDimensions(this.scroll).width;
        if (this.lastContainer) {
            this.lastContainer.setAttribute('style', `margin-right: ${scrollWidth - (SIDE_PADDING + STEP_CONTAINER_WIDTH)}px;`);
        }
        if (this.textTruncate) {
            this.textTruncate.setAttribute('style', `width: ${scrollWidth - (SIDE_PADDING * 2)}px;`);
        }
    }
    isCollapsed() {
        return this.steps.length > this.shownSteps + 1;
    }
    isValidStep(index) {
        return this.steps[index].valid;
    }
    isInvalidStep(index) {
        return this.steps[index].valid === false;
    }
    isContextStep(index) {
        return index === this.contextStep;
    }
    isContextMenuCompleted() {
        // Mark context menu as complete if the last step is the current step
        return this.currentStep === this.steps.length - 1;
    }
    isCurrentStep(index) {
        return index === this.currentStep;
    }
    isLastStep(index) {
        return index === this.steps.length - 1;
    }
    onTextTruncateStatusChange(ev) {
        const BASE_SCROLL_HEIGHT = 5;
        let titleHeight = BASE_SCROLL_HEIGHT;
        if (ev && ev.detail) {
            if (ev.detail.isTextVisible) {
                const VIEW_LESS_BUTTON_PADDING = 2;
                titleHeight = titleHeight + ev.detail.numberOfLines + VIEW_LESS_BUTTON_PADDING;
            }
            this.scrollContainer.setAttribute('style', `height: ${titleHeight}rem;`);
            this.titleLinesChanged.emit(titleHeight);
        }
    }
    renderCompletedIndicator() {
        return (this.visibleSteps.map((step, index) => h("div", { class: "step-container" },
            h("div", { class: "step-title" },
                h("span", null, step)),
            this.isContextStep(index) && this.isCollapsed() ?
                this.renderContextMenu()
                : h("div", { class: "step-circle completed", onClick: (event) => this.selectStep(event, index) },
                    h("span", { class: "completed-icon" },
                        h("yoo-icon", { class: "yo-check" }))),
            (index < this.visibleSteps.length - 1 ? h("div", { class: "progress-line" }) : null))));
    }
    renderContextMenu() {
        if (!isIonic()) {
            return ((this.isCompleted || this.isContextMenuCompleted() ?
                h("yoo-context-menu", null,
                    h("div", { slot: "trigger", class: "step-circle completed" },
                        h("span", { class: "completed-icon" },
                            h("yoo-icon", { class: "yo-more" }))),
                    h("div", { class: "context-container" }, this.collapsedSteps.map((step, index) => h("span", { onClick: (event) => this.selectStep(event, index) },
                        step,
                        h("yoo-icon", { class: "yo-check" })))))
                : h("yoo-context-menu", null,
                    h("div", { slot: "trigger", class: 'step-circle ' + (this.collapsedSteps.indexOf(this.steps[this.currentStep]) !== -1 ? 'current ' : ' ') + 'more' },
                        h("span", null,
                            h("yoo-icon", { class: "yo-more" }))),
                    h("div", { class: "context-container" }, this.collapsedSteps.map((step, index) => h("span", { class: this.isCurrentStep(index) ? 'context-current' : '', onClick: (event) => this.selectStep(event, index) },
                        step,
                        this.isValidStep(index) ? h("yoo-icon", { class: "yo-check" }) : null))))));
        }
        else {
            return null;
        }
    }
    renderStepContainer(step, index, lastIndex) {
        let displayIndex = index + 1;
        return (h("div", { class: {
                'step-container ': true,
                'last': this.isLastStep(index),
                'active': this.isCurrentStep(index)
            }, ref: (el) => {
                if (this.isLastStep(index)) {
                    this.lastContainer = el;
                }
            } },
            (!isIonic() && this.isContextStep(index) && this.isCollapsed() ? this.renderContextMenu()
                :
                    h("div", { class: { 'step-circle-outer': true, 'active': this.isCurrentStep(index) } },
                        h("div", { class: {
                                'step-circle ': true,
                                ' current': this.isCurrentStep(index),
                                ' completed': this.isValidStep(index) && !this.lockIndex[index],
                                ' invalid': this.isInvalidStep(index) && !this.lockIndex[index],
                                ' locked': this.lockIndex[index]
                            }, ref: (el) => {
                                if (this.isCurrentStep(index)) {
                                    this.currentCircle = el;
                                }
                            }, onClick: (event) => this.selectStep(event, index) }, this.displayMode === 'icon' ? this.renderIcon(index) : this.renderNumber(index)))),
            this.renderProgresLine(index, lastIndex),
            this.isCurrentStep(index) ? h("div", { class: "step-title" },
                h("yoo-text-truncate", { animationLoadTime: 300, ref: el => this.textTruncate = el, maxLine: 1, content: displayIndex + '. ' + translateMulti(step), onStatusChanges: (ev) => this.onTextTruncateStatusChange(ev) })) : null));
    }
    renderNumber(index) {
        return (this.lockIndex[index] ? h("yoo-icon", { class: "yo-lock" }) :
            h("span", null, this.isLastStep(index) ? this.steps.length : index + 1));
    }
    renderIcon(index) {
        let step = this.steps[index];
        if (this.isInvalidStep(index) && !this.lockIndex[index]) {
            return (h("yoo-icon", { class: "yo-rejected2" }));
        }
        else if (step.validityPercentage > 0 && step.validityPercentage < 100 && !this.lockIndex[index]) {
            return (h("div", { class: "percentage-fill", style: { 'height': `${step.validityPercentage}%` } }));
        }
        if (this.lockIndex[index]) {
            return (h("yoo-icon", { class: "yo-lock" }));
        }
        else if (this.isValidStep(index)) {
            return (h("yoo-icon", { class: "yo-thick" }));
        }
        else {
            return (h("yoo-icon", { class: "yo-step" }));
        }
    }
    isProgressCompleted(index, lastIndex) {
        let nextIndex = index === lastIndex ? index - 1 : index + 1;
        return (this.steps[index].valid && !this.lockIndex[index] && (this.steps[nextIndex].valid) && !this.lockIndex[nextIndex]);
    }
    renderProgresLine(index, lastIndex) {
        return (h("div", { class: {
                'progress-line': true,
                'first': index === 0,
                'last': index === lastIndex,
                'active': this.isCurrentStep(index),
                'active-next': index === lastIndex ? false : this.isCurrentStep(index + 1),
                'completed': this.isProgressCompleted(index, lastIndex)
            } }));
    }
    render() {
        let lastStep = this.steps[this.steps.length - 1];
        let lastIndex = this.steps.length - 1;
        // Collapse Items include all steps after the Context-Index (included) except for the last step
        if (!isIonic()) {
            this.collapsedSteps = this.steps.slice(this.contextStep, this.steps.length - 1);
            if (this.isCollapsed()) {
                this.visibleSteps = this.steps.slice(0, this.contextStep + 1);
                this.visibleSteps.push(lastStep);
            }
            else {
                this.visibleSteps = this.steps;
            }
        }
        else {
            this.visibleSteps = this.steps;
        }
        return (h("div", { class: "scroll-container", ref: el => this.scrollContainer = el },
            h("yoo-ion-scroll", { class: "horizontal no-scrollbar", ref: el => this.scroll = el },
                h("div", { class: "outer-container" }, this.isCompleted ? this.renderCompletedIndicator() :
                    this.visibleSteps.map((step, index) => this.renderStepContainer(step.title, index, lastIndex))))));
    }
    static get is() { return "yoo-form-progress-indicator"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "contextStep": {
            "state": true
        },
        "currentStep": {
            "type": Number,
            "attr": "current-step"
        },
        "displayMode": {
            "type": String,
            "attr": "display-mode"
        },
        "host": {
            "elementRef": true
        },
        "isCompleted": {
            "type": Boolean,
            "attr": "is-completed"
        },
        "lockIndex": {
            "type": "Any",
            "attr": "lock-index"
        },
        "shownSteps": {
            "state": true
        },
        "steps": {
            "type": "Any",
            "attr": "steps"
        }
    }; }
    static get events() { return [{
            "name": "stepSelected",
            "method": "stepSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "titleLinesChanged",
            "method": "titleLinesChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-progress-indicator:**/"; }
}

import { translateMulti, translate, getElementDimensions } from '../../../utils';
export class YooTextTruncateComponent {
    constructor() {
        this.hideMoreButton = false;
        this.animationLoadTime = 0;
        this.showBreakLine = false;
        this.maxLine = 1;
        this.expanded = false;
        this.showEllipsis = false;
        this.forceRefresh = false;
        this.actualSingleHeight = 19;
        this.lineClampSupport = false;
        this.textOverflown = false;
        this.singleLine = false;
        this.textTruncateDirty = false;
    }
    onContentUpdate() {
        this.expanded = false;
        setTimeout(() => { this.updateTruncate(); }, 200);
    }
    async getSingleLineTextElement() {
        return this.singleLineTextElement;
    }
    async getSingleLineButttonElement() {
        return this.singleLineButtonElement;
    }
    updateTruncate() {
        this.forceRefresh = !this.forceRefresh;
    }
    showText() {
        this.expanded = true;
        let eventDetail = { isTextVisible: this.expanded, numberOfLines: this.untruncatedNumberOfLines };
        this.statusChanges.emit(eventDetail);
    }
    hideText() {
        this.expanded = false;
        let eventDetail = { isTextVisible: this.expanded, numberOfLines: this.untruncatedNumberOfLines };
        this.statusChanges.emit(eventDetail);
    }
    componentWillLoad() {
        this.lineClampSupport = this.isLineClampSupported();
        this.singleLine = this.isSingleLineTruncate();
    }
    componentDidLoad() {
        this.host.style.setProperty('--max-line', this.maxLine.toString());
        this.checkOverflow();
        this.lineClampSupport = this.isLineClampSupported();
        this.actualSingleHeight = getElementDimensions(this.hiddenDiv).height;
        this.maxHeightAllowed = Math.round(this.maxLine * this.actualSingleHeight / 25) * 25;
        this.host.style.setProperty('--text-max-height', this.maxHeightAllowed + 'px');
        this.forceRefresh = true;
    }
    componentWillUpdate() {
        this.checkOverflow();
    }
    componentDidUpdate() {
        if (!this.textTruncateDirty && this.forceRefresh) {
            this.textTruncateDirty = true;
            this.textTruncateLoaded.emit(true);
        }
    }
    checkOverflow() {
        if (!this.shoudUseOverflow()) {
            this.textOverflown = this.isTextOverflow();
        }
    }
    shoudUseOverflow() {
        return this.lineClampSupport && this.hideMoreButton;
    }
    isTextOverflow() {
        let descirptionDim = getElementDimensions(this.contentWrapperDiv);
        let descriptionHeight = descirptionDim ? descirptionDim.height : 0;
        this.untruncatedNumberOfLines = descriptionHeight / this.actualSingleHeight;
        this.maxHeightAllowed = this.actualSingleHeight * this.maxLine;
        return descriptionHeight > this.maxHeightAllowed || descriptionHeight === 0;
    }
    toggleText(ev) {
        ev.stopPropagation();
        if (!this.expanded) {
            this.showText();
        }
        else {
            this.hideText();
        }
        this.toggled.emit(this.expanded);
    }
    isLineClampSupported() {
        return typeof (this.host.style['webkitLineClamp']) !== 'undefined';
    }
    isSingleLineTruncate() {
        return this.maxLine === 1;
    }
    renderUsingLineClamp() {
        return h("div", { class: "line-clamp" },
            h("div", { class: "text-container", innerHTML: translateMulti(this.content) }));
    }
    renderNormalText() {
        return [
            h("div", { class: {
                    'normal-text': true,
                    'show-break-line': this.showBreakLine
                }, innerHTML: translateMulti(this.content) }),
            h("div", { class: "normal-more-button", onClick: (ev) => { this.toggleText(ev); } }, translate('VIEWLESS'))
        ];
    }
    // Fallback if line-clamp is not supported.
    renderWithPureCss() {
        return h("div", { class: "multi-line-truncate-container" },
            h("div", { class: "multi-line-text", innerHTML: translateMulti(this.content), ref: el => this.contentWrapperDiv = el }, " "),
            this.textOverflown ? [
                h("div", { class: "ellipsis" }, "..."),
                (this.hideMoreButton ? null : h("div", { class: "more-button", onClick: (ev) => { this.toggleText(ev); } }, translate('MORE')))
            ] : null);
    }
    renderSingleLineWithCss() {
        return h("div", { class: "single-line-truncate-container", ref: el => this.contentWrapperDiv = el },
            h("div", { class: {
                    'single-line-text': true,
                    'truncate': this.textOverflown
                }, ref: (el) => this.singleLineTextElement = el, innerHTML: translateMulti(this.content) }),
            this.hideMoreButton || !this.textOverflown ? null :
                h("div", { ref: (el) => this.singleLineButtonElement = el, onClick: (ev) => { this.toggleText(ev); }, class: "single-line-button" }, translate('MORE')));
    }
    renderBasedOnSupport() {
        if (this.singleLine) {
            return this.renderSingleLineWithCss();
        }
        else {
            if (this.shoudUseOverflow()) {
                return this.renderUsingLineClamp();
            }
            else {
                return this.renderWithPureCss();
            }
        }
    }
    render() {
        return [
            this.expanded ? this.renderNormalText() : this.renderBasedOnSupport(),
            h("div", { class: "hidden-text", ref: el => this.hiddenDiv = el }, "...")
        ];
    }
    static get is() { return "yoo-text-truncate"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "animationLoadTime": {
            "type": Number,
            "attr": "animation-load-time"
        },
        "content": {
            "type": String,
            "attr": "content",
            "watchCallbacks": ["onContentUpdate"]
        },
        "expanded": {
            "state": true
        },
        "forceRefresh": {
            "state": true
        },
        "getSingleLineButttonElement": {
            "method": true
        },
        "getSingleLineTextElement": {
            "method": true
        },
        "hideMoreButton": {
            "type": Boolean,
            "attr": "hide-more-button"
        },
        "hideText": {
            "method": true
        },
        "host": {
            "elementRef": true
        },
        "maxLine": {
            "type": Number,
            "attr": "max-line",
            "mutable": true
        },
        "showBreakLine": {
            "type": Boolean,
            "attr": "show-break-line"
        },
        "showEllipsis": {
            "state": true
        },
        "showText": {
            "method": true
        },
        "updateTruncate": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "statusChanges",
            "method": "statusChanges",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "textTruncateLoaded",
            "method": "textTruncateLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "toggled",
            "method": "toggled",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-text-truncate:**/"; }
}

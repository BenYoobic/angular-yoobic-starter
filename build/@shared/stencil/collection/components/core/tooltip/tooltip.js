import tippy from 'tippy.js';
export class YooTooltipComponent {
    constructor() {
        this.tippy = null;
    }
    onOptionsChange() {
        if (!this.cssOnly) {
            this.loadTippy();
        }
    }
    onTextChange() {
        if (!this.cssOnly) {
            this.loadTippy();
        }
    }
    componentWillLoad() {
        if (!this.cssOnly) {
            this.loadTippy();
        }
    }
    loadTippy() {
        if (this.tippy) {
            this.tippy.destroy(this.tippy);
        }
        let tippyOptions = Object.assign({ theme: 'light', placement: this.placement, arrow: true, arrowType: 'round', zIndex: 25000 }, this.options, { content: this.content });
        // Moved tooltip to always be on the host element
        this.tippy = tippy(this.host, tippyOptions);
    }
    renderCssOnly() {
        return h("div", { class: `css-only hint--${this.placement} hint--rounded`, "aria-label": this.content },
            h("slot", null));
    }
    hostData() {
        return {
            class: {
                'css-only': this.cssOnly
            }
        };
    }
    render() {
        return this.cssOnly ? this.renderCssOnly() : h("slot", null);
    }
    static get is() { return "yoo-tooltip"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "content": {
            "type": String,
            "attr": "content",
            "watchCallbacks": ["onTextChange"]
        },
        "cssOnly": {
            "type": Boolean,
            "attr": "css-only"
        },
        "host": {
            "elementRef": true
        },
        "options": {
            "type": "Any",
            "attr": "options",
            "watchCallbacks": ["onOptionsChange"]
        },
        "placement": {
            "type": String,
            "attr": "placement"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-tooltip:**/"; }
}

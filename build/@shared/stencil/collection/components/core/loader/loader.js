import { querySelectorDeep, translate, getAppContext, isSafari } from '../../../utils'; //, setAnimation, animations
export class YooLoaderComponent {
    constructor() {
        this.enableAnimation = false;
    }
    showLoadingAnimation() {
        this.enableAnimation = true;
        this.host.forceUpdate();
    }
    componentDidLoad() {
        if (this.height) {
            querySelectorDeep(this.host, '.container').setAttribute('style', `height: ${this.height}px; top: unset;`);
        }
    }
    componentDidUpdate() {
        if (this.enableAnimation && this.showFinishAnimation) {
            this.checkMarkDiv.classList.add('active');
            this.progressDiv.style.display = 'none';
            this.enableAnimation = false;
            setTimeout(() => { this.onAnimationEnd(); }, 1500);
        }
    }
    onAnimationEnd() {
        this.animationCompleted.emit(true);
    }
    renderCheckMark() {
        return h("svg", { class: "checkmark", ref: el => this.checkMarkDiv = el, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 52 52" },
            h("circle", { class: "checkmark-circle", cx: "26", cy: "26", r: "25", fill: "none" }),
            h("path", { class: "checkmark-check", fill: "none", d: "M14.1 27.2l7.1 7.2 16.7-16.8" }));
    }
    hostData() {
        return {
            class: {
                'safari': isSafari()
            }
        };
    }
    render() {
        //setAnimation(animations.fade, this.host, { open: true });
        return h("div", { class: "container" },
            h("div", { class: "value", ref: el => this.progressDiv = el },
                getAppContext()['boost'] ? h("img", { src: "assets/loader/loading_thin_boost.svg" }) : h("img", { src: "assets/loader/loading_thin.svg" }),
                this.progress ? h("yoo-progress-bar-core", { progressValue: this.progress, maxValue: this.maxValue }) : null,
                this.text ? h("div", { class: "text", innerHTML: translate(this.text) + ' ...' }) : null),
            this.showFinishAnimation ? this.renderCheckMark() : null);
    }
    static get is() { return "yoo-loader"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "height": {
            "type": Number,
            "attr": "height"
        },
        "host": {
            "elementRef": true
        },
        "maxValue": {
            "type": Number,
            "attr": "max-value"
        },
        "progress": {
            "type": Number,
            "attr": "progress"
        },
        "showFinishAnimation": {
            "type": Boolean,
            "attr": "show-finish-animation"
        },
        "showLoadingAnimation": {
            "method": true
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "animationCompleted",
            "method": "animationCompleted",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-loader:**/"; }
}

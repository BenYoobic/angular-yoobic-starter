import { setAnimation, animations, getElementDimensions, findParent, querySelectorDeep, translate, getAppContext } from '../../../utils';
export class YooButtonComponent {
    constructor() {
        this.translateText = true;
        this.disabled = false;
        this.setMaxWidth = false;
        this.hasMoreBtn = false;
        this.textOverflown = false;
        this.tapped = false;
    }
    componentDidLoad() {
        this.textWidth = getElementDimensions(this.textSpan).width;
        const buttonGroup = findParent(this.host, 'yoo-button-group');
        if (buttonGroup) {
            this.host.classList.add('in-group');
            if (buttonGroup.classList.contains('vertical')) {
                this.host.classList.add('vertical');
            }
        }
        if (this.textWidth && this.value) {
            this.isTextOverflown(this.textWidth, this.value.clientWidth);
        }
        if (this.setMaxWidth && getElementDimensions(this.host).width > this.getMaxWidthValueParent() && !this.host.classList.contains('block') && !this.host.classList.contains('fab')) {
            const BUTTON_PADDING = 20;
            this.button.setAttribute('style', `max-width: ${this.getMaxWidthValueParent() - BUTTON_PADDING}px;`);
        }
        this.addSlidingAnimation(this.textSpan, this.textWidth);
    }
    componentDidUpdate() {
        this.addSlidingAnimation(this.textSpan, this.textWidth);
        if (this.tapped) {
            this.dotDiv.classList.add('active');
            setTimeout(() => {
                if (this.dotDiv) {
                    this.dotDiv.classList.remove('active');
                    this.tapped = false;
                    this.host.forceUpdate();
                }
            }, 1000);
        }
    }
    isTextOverflown(textWidth, containerWidth) {
        const NO_PADDING = 10;
        if (this.host.classList.contains('link-transparent-success') || this.host.classList.contains('link-transparent-danger-light')) {
            containerWidth = containerWidth + NO_PADDING;
        }
        this.textOverflown = textWidth > containerWidth;
    }
    addSlidingAnimation(textSpan, textWidth) {
        if (this.textOverflown) {
            let textSpanTwo = querySelectorDeep(this.host, '.span-two');
            if (textSpanTwo) {
                let speed = 20; //50 pixels per second
                let padding = 20;
                let distance = padding + textWidth;
                let duration = (distance / speed) * 1000;
                setAnimation(animations.infiniteLeftSlide, textSpan, { startPosition: padding, endPosition: (-textWidth), duration: duration });
                setAnimation(animations.infiniteLeftSlide, textSpanTwo, { startPosition: ((padding * 2) + textWidth), endPosition: padding, duration: duration });
            }
        }
    }
    getStyle() {
        return this.bgColor && this.bgColor !== 'gradient-success' ? { 'color': 'white' } : {};
    }
    getBackgroundStyle() {
        if (this.bgColor && this.bgColor !== 'gradient-success') {
            this.host.style.setProperty('--color-value', 'white');
            return { 'background': this.bgColor };
        }
        else {
            return {};
        }
    }
    getMaxWidthValueParent() {
        return getElementDimensions(findParent(this.host, 'div')).width;
    }
    renderLoadingContainer() {
        return (h("div", { class: "container loading" },
            h("span", { class: "value" },
                h("yoo-img", { src: "assets/loader/loading.svg" }))));
    }
    renderButtonContent() {
        return ((this.textOverflown ? this.renderSlidingLabel() :
            h("div", { class: "value", ref: el => this.value = el },
                h("span", { class: this.text ? 'text' : '', ref: el => this.textSpan = el, innerHTML: this.translateText ? translate(this.text) : this.text }),
                this.icon ? h("span", { class: "icon" },
                    h("yoo-icon", { class: this.icon })) : null,
                this.badge ? h("yoo-badge", { class: this.badgeClass || 'light round', text: this.badge }) : null)));
    }
    renderSlidingLabel() {
        return [
            h("div", { style: this.getStyle(), class: "value sliding", ref: el => this.value = el },
                h("span", { ref: el => this.textSpan = el, class: 'sliding' + (this.text ? ' text' : ''), innerHTML: this.translateText ? translate(this.text) : this.text }),
                h("span", { class: 'span-two sliding' + (this.text ? ' text' : ''), innerHTML: translate(this.text) }),
                this.icon ? h("span", { class: "icon" },
                    h("yoo-icon", { class: this.icon })) : null),
            h("div", { class: "blur-left" }),
            h("div", { class: "blur-right" })
        ];
    }
    onItemTouchStart(ev) {
        this.tapped = true;
        if (!this.isTextOverflown) {
            this.host.forceUpdate();
        }
    }
    hostData() {
        return {
            class: Object.assign({ 'tapped': this.tapped }, getAppContext())
        };
    }
    render() {
        return ((this.isLoading ? this.renderLoadingContainer() :
            h("button", { ref: el => this.button = el, onTouchStart: (ev) => { this.onItemTouchStart(ev); }, tabindex: "-1", type: "button", class: 'container ' + (this.disabled ? 'disabled' : '') + (this.textOverflown ? ' sliding' : ''), style: this.getBackgroundStyle() },
                this.renderButtonContent(),
                h("div", { class: "dot", ref: el => this.dotDiv = el }))));
    }
    static get is() { return "yoo-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "badge": {
            "type": String,
            "attr": "badge"
        },
        "badgeClass": {
            "type": String,
            "attr": "badge-class"
        },
        "bgColor": {
            "type": String,
            "attr": "bg-color"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "reflectToAttr": true
        },
        "hasMoreBtn": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "isLoading": {
            "type": Boolean,
            "attr": "is-loading"
        },
        "setMaxWidth": {
            "type": Boolean,
            "attr": "set-max-width"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "textOverflown": {
            "state": true
        },
        "translateText": {
            "type": Boolean,
            "attr": "translate-text"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-button:**/"; }
}

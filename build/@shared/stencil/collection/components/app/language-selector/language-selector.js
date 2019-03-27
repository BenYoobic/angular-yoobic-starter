import { setAnimation, translate, closeModal } from '../../../index'; //'../../../../stencil';
export class YooLanguageSelectorComponent {
    constructor() {
        this.hasPreseneted = false;
    }
    componentDidLoad() {
        if (this.wrapperElement) {
            this.wrapperElement.style.top = `${this.topPosition}px`;
        }
        setAnimation('fade', this.host, { open: true });
        const FADE_DURATION = 500;
        setTimeout(() => {
            this.hasPreseneted = true;
        }, FADE_DURATION);
    }
    componentDidUpdate() {
        if (this.wrapperElement) {
            this.wrapperElement.style.top = `${this.topPosition}px`;
        }
    }
    onLanguageSelector(language) {
        this.languageSelected.emit(language);
        closeModal(language);
    }
    closeLanguageSelector() {
        if (this.hasPreseneted) {
            closeModal(null);
        }
    }
    renderList(language) {
        return (h("div", { class: "item" },
            h("div", { class: 'icon ' + (this.currentLanguage === language.value ? 'current' : ''), onClick: () => this.onLanguageSelector(language.value) },
                h("yoo-icon", { class: language.icon + ' icon-class' }),
                this.currentLanguage.toLowerCase() === language.value ? [
                    h("div", { class: "overlay" }),
                    h("div", { class: "check" },
                        h("yoo-icon", { class: "yo-check" }))
                ]
                    : null),
            h("div", { class: "item-title" }, language.title)));
    }
    render() {
        return (h("div", { class: "wrapper", onClick: () => this.closeLanguageSelector() },
            h("div", { class: "inner-wrapper", ref: el => this.wrapperElement = el },
                h("div", { class: "heading" }, translate('LANGUAGE')),
                h("div", { class: "lists-container" },
                    this.languages.map((language) => this.renderList(language)),
                    h("div", { class: "item-empty" }),
                    h("div", { class: "item-empty" }),
                    h("div", { class: "item-empty" }),
                    h("div", { class: "item-empty" })))));
    }
    static get is() { return "yoo-language-selector"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "currentLanguage": {
            "type": String,
            "attr": "current-language"
        },
        "host": {
            "elementRef": true
        },
        "languages": {
            "type": "Any",
            "attr": "languages"
        },
        "topPosition": {
            "type": Number,
            "attr": "top-position"
        }
    }; }
    static get events() { return [{
            "name": "languageSelected",
            "method": "languageSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-language-selector:**/"; }
}

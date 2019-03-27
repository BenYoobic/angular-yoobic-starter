import { translate } from '../../../index'; //'../../../../stencil';
export class YooMissionContentsComponent {
    render() {
        return ((this.slidesNumber || this.photosNumber || this.questionsNumber) ?
            h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: "yo-attachment success" })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate('QUESTIONS')),
                    h("div", { class: "menu-content" },
                        (this.slidesNumber ?
                            h("span", null,
                                h("yoo-icon", { class: "yo-pages" }),
                                " ",
                                this.slidesNumber,
                                " ",
                                translate('PAGES')) : null),
                        (this.photosNumber ?
                            h("span", null,
                                h("yoo-icon", { class: "yo-photo-library" }),
                                " ",
                                this.photosNumber,
                                " ",
                                translate('PHOTOS')) : null),
                        (this.questionsNumber ?
                            h("span", null,
                                h("yoo-icon", { class: "yo-questions" }),
                                " ",
                                this.questionsNumber,
                                " ",
                                translate('QUESTIONS')) : null))))
            : null);
    }
    static get is() { return "yoo-mission-contents"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "photosNumber": {
            "type": Number,
            "attr": "photos-number"
        },
        "questionsNumber": {
            "type": Number,
            "attr": "questions-number"
        },
        "slidesNumber": {
            "type": Number,
            "attr": "slides-number"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-mission-contents:**/"; }
}

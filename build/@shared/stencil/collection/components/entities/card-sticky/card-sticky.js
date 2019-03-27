import { cloudinary, isWeb } from '../../../utils';
export class YooCardStickyComponent {
    constructor() {
        this.imageWidth = 335;
        this.imageHeight = 260;
        this.showEllipsis = false;
        this.MAX_LINE_HEIGHT = 54;
    }
    renderNewsfeedCard() {
        return (h("div", { class: 'outer-container ' + this.type },
            h("yoo-img", { type: "back", class: "image-container", src: this.entry && this.entry.imgSrc ? cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight) : null }),
            this.entry ?
                h("div", { class: "bottom-container" },
                    h("div", { class: "text-wrapper" },
                        h("yoo-text-truncate", { class: "light", hideMoreButton: true, maxLine: 3, content: this.entry.title }, " ")),
                    this.entry.subheadings && this.entry.subheadings[0]
                        ? h("div", { class: "subheading" },
                            this.entry.postedBy ? h("span", null,
                                this.entry.postedBy,
                                " \u2022 ") : null,
                            " ",
                            this.entry.subheadings[0])
                        : null)
                : null));
    }
    renderCoursesCard() {
        return (h("div", { class: 'outer-container ' + this.type },
            h("yoo-img", { type: "back", class: "image-container", disabled: this.entry.isLocked, src: this.entry && this.entry.imgSrc ? cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight) : null }, this.entry.isLocked && h("yoo-icon", { class: "yo-lock" })),
            this.entry ?
                h("div", { class: "bottom-container" },
                    h("div", { class: "text-wrapper" }, this.entry.title),
                    this.entry.subheadings && this.entry.subheadings[0]
                        ? h("div", { class: "subheading" }, this.entry.subheadings[0])
                        : null)
                : null));
    }
    renderBase() {
        return (h("div", { class: "outer-container image" },
            h("div", { class: "gradient-container" },
                h("div", { class: "text-container" },
                    this.entry && this.entry.category ?
                        h("div", { class: "category" },
                            h("span", null, this.entry.category))
                        : null,
                    this.entry && this.entry.title ?
                        h("div", { class: "title" },
                            h("span", null, this.entry.title))
                        : null,
                    this.entry && this.entry.buttonText ?
                        h("yoo-button", { class: "gradient-success small", text: this.entry.buttonText, onClick: () => this.entry.handler ? this.entry.handler() : {} })
                        : null)),
            h("yoo-img", { type: "back", class: "image-container", src: this.entry && this.entry.imgSrc ? cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight) : null })));
    }
    renderBasedOnType() {
        switch (this.type) {
            case 'feeds':
                return this.renderNewsfeedCard();
            case 'courses':
                return this.renderCoursesCard();
            default:
                return this.renderBase();
        }
    }
    hostData() {
        return {
            class: {
                'web': isWeb()
            }
        };
    }
    render() {
        return this.renderBasedOnType();
    }
    static get is() { return "yoo-card-sticky"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "entry": {
            "type": "Any",
            "attr": "entry"
        },
        "host": {
            "elementRef": true
        },
        "imageHeight": {
            "state": true
        },
        "imageWidth": {
            "state": true
        },
        "showEllipsis": {
            "state": true
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-card-sticky:**/"; }
}

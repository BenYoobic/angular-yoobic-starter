import { cloudinary } from '../../../utils';
export class YooCardImageComponent {
    constructor() {
        this.imageWidth = 335;
        this.imageHeight = 86;
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "overlay" }),
            this.entry && this.entry.imgSrc ?
                h("yoo-img", { type: "back", class: "image", src: cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight) })
                : null,
            this.entry && this.entry.title ?
                h("div", { class: "title-container" },
                    h("span", null, this.entry.title))
                : null));
    }
    static get is() { return "yoo-card-image"; }
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
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-card-image:**/"; }
}

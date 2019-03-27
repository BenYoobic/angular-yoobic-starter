import { cloudinary } from '../../../utils';
export class YooCardFileComponent {
    constructor() {
        this.iconClass = '';
    }
    hasImageSource() {
        return (this.imgSrc && this.imgSrc !== '');
    }
    hasIcon() {
        return (this.icon && this.icon !== '');
    }
    isVideoFile() {
        return this.type === 'video';
    }
    renderIconBasedOnSource() {
        let baseClass = {};
        baseClass[this.type] = true;
        baseClass = Object.assign({ 'image-container': true }, baseClass);
        if (this.hasImageSource()) {
            return h("yoo-img", { type: "back", class: baseClass, src: (cloudinary(this.imgSrc, 100, 100)) }, this.renderIconWithImageSource());
        }
        if (this.hasIcon()) {
            return h("div", { class: baseClass },
                h("yoo-icon", { class: this.icon + ' ' + this.iconClass }));
        }
        return null;
    }
    // This renders default style for unspecified file type
    renderBase() {
        return h("div", { class: "outer-container" },
            (this.isClosable ?
                h("div", { class: "close-btn" },
                    h("yoo-icon", { class: "yo-close" }))
                : null),
            this.renderIconBasedOnSource(),
            h("div", { class: "top-container" },
                (this.heading ? h("div", { class: "heading-container" }, this.heading)
                    : null),
                (this.subheading ? h("div", { class: "subheading-container" }, this.subheading)
                    : null)));
    }
    renderIconWithImageSource() {
        if (this.isVideoFile()) {
            return [
                h("div", { class: "overlay" }),
                h("yoo-icon", { class: "yo-play" })
            ];
        }
        return null;
    }
    // Swtich function to render content differnetly.
    renderBasedOnType() {
        switch (this.type) {
            case 'audio':
                return this.renderAudioCard();
            default:
                return this.renderBase();
        }
    }
    renderAudioCard() {
        return h("yoo-audio-player", { _downloadURL: this._downloadURL });
    }
    render() {
        return this.renderBasedOnType();
    }
    static get is() { return "yoo-card-file"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "_downloadURL": {
            "type": String,
            "attr": "_download-u-r-l"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "iconClass": {
            "type": String,
            "attr": "icon-class"
        },
        "imgSrc": {
            "type": String,
            "attr": "img-src"
        },
        "isClosable": {
            "type": Boolean,
            "attr": "is-closable"
        },
        "subheading": {
            "type": String,
            "attr": "subheading"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-card-file:**/"; }
}

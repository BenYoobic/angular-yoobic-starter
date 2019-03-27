import { Cloudinary, CloudinaryGradientLayer, getScreenHeight, getScreenWidth } from '../../../utils/helpers';
import { isOffline, cacheFile, getCachedFileURL } from '../../../utils';
export class YooBackgroundBlurComponent {
    constructor() {
        // settings
        this.opacity = 0.8;
        this.blur = 1000;
        this.cropMode = 'fill';
        this.imageFlag = 'lossy';
        this.gradientLayer = new CloudinaryGradientLayer('y', -0.4);
    }
    componentWillLoad() {
        return this.prepareImgSrc();
    }
    componentWillUpdate() {
        return this.prepareImgSrc();
    }
    getWidth() {
        return this.width || getScreenWidth();
    }
    getHeight() {
        return this.height || getScreenHeight();
    }
    async prepareImgSrc() {
        const url = new Cloudinary(this.imageUrl)
            .width(this.getWidth())
            .height(this.getHeight())
            .crop(this.cropMode)
            .blur(this.blur)
            .flag(this.imageFlag)
            .opacity(this.opacity * 100)
            .addLayer(this.gradientLayer)
            .getUrl();
        if (isOffline()) {
            this.imgSrc = await getCachedFileURL(url);
        }
        else {
            cacheFile(url);
            this.imgSrc = url;
        }
    }
    getBackgroundImageCss() {
        return { 'background-image': `url('${this.imgSrc}')` };
    }
    render() {
        return (h("div", { class: "background-blur-image", style: this.getBackgroundImageCss() },
            h("slot", null)));
    }
    static get is() { return "yoo-background-blur"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "height": {
            "type": Number,
            "attr": "height"
        },
        "imageUrl": {
            "type": String,
            "attr": "image-url"
        },
        "width": {
            "type": Number,
            "attr": "width"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-background-blur:**/"; }
}

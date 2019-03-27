import { h } from '../design-system.core.js';

import { o as isIOS, bb as isSafari, a3 as isOffline, ae as isNullOrUndefined, a7 as findParent, E as isWKWebView, F as cleanupWKWebViewImagePath, cn as replaceSuffix, co as intersectionObserve, k as isCordova } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { c as getCachedFileURL, b as pipes, d as cacheFile } from './chunk-262e5ad4.js';

class YooImgComponent {
    constructor() {
        this.type = 'image';
        this.loadStrategy = 'on-visible';
        this.disabled = false;
    }
    componentDidLoad() {
        if (this.loadStrategy === 'on-visible' && this.wrapperCheck() && !isIOS() && !isSafari()) {
            this.observeVisibility();
        }
        else {
            this.isElementVisible = true;
            this.updateSrc();
        }
    }
    updateSrc() {
        if (this.src && this.src.length > 0 && this.src.startsWith && this.src.startsWith('https') && !this.src.startsWith('http://localhost') && !this.src.startsWith('https://localhost') && !this.src.startsWith('https://imgart.casinodrive.fr')) {
            if (isOffline()) {
                getCachedFileURL(this.src).then(finalSrc => {
                    this.finalSrc = pipes.https.transform(finalSrc);
                    ;
                });
            }
            else {
                this.finalSrc = pipes.https.transform(this.src);
                cacheFile(this.finalSrc);
            }
        }
        else {
            this.finalSrc = pipes.https.transform(this.src);
        }
    }
    onImageLoaded(event) {
        this.imageLoaded.emit(event);
    }
    // Fail safe check for the items that can't be observed, such as slides
    wrapperCheck() {
        return isNullOrUndefined(findParent(this.host, 'yoo-ion-slides'));
    }
    getBackImageStyle() {
        if (this.finalSrc && this.finalSrc.split) {
            let url = this.finalSrc;
            if (url && url.indexOf && url.indexOf('file:') >= 0 && isWKWebView()) {
                url = cleanupWKWebViewImagePath(url);
            }
            let urlArr = url.split('.');
            let mediaExtension = urlArr[urlArr.length - 1];
            if (url && url.replace && mediaExtension.length < 5 && !mediaExtension.includes('png') && !mediaExtension.includes('svg') && !mediaExtension.includes('gif') && !mediaExtension.includes('jpg')) {
                url = replaceSuffix(url, '.jpg');
            }
            if (url && url.length > 0 && url !== 'undefined') {
                let styleObj = {
                    'background-repeat': 'no-repeat',
                    'background-attachment': 'center',
                    'background-size': this.contain ? 'contain' : 'cover',
                    'background-position-x': 'center',
                    'background-position-y': 'center',
                    'background-image': 'url("' + url + '")'
                };
                if (this.disabled === true) {
                    styleObj = {
                        'background': 'linear-gradient(rgba(216, 216, 216, 0.9), rgba(216, 216, 216, 0.9)), url("' + url + '") center center / ' + (this.contain ? 'contain' : 'cover') + ' no-repeat'
                    };
                }
                return styleObj;
            }
        }
        return {};
    }
    observeVisibility() {
        this.observer = intersectionObserve(this.host, (nodes) => {
            // Ignore intersection ratio in ios
            if (nodes[0].isIntersecting && (nodes[0].intersectionRatio > 0 || ((isIOS() && isCordova()) || isSafari()))) {
                this.isElementVisible = true;
                this.updateSrc();
                this.observer.disconnect();
            }
        }, {
            rootMargin: '30px',
            threshold: [0, 0.25, 0.75, 1],
            root: null
        });
    }
    onImageLoadError() {
        if (this.showFallback) {
            this.showFallbackIcon = true;
            this.isElementVisible = false;
        }
    }
    renderFinalImage() {
        return this.type === 'back' ? (h("div", { style: this.getBackImageStyle() },
            h("slot", null))) : (this.finalSrc ? h("img", { src: this.finalSrc, alt: this.alt, height: this.height, onLoad: ev => this.onImageLoaded(ev), onError: () => this.onImageLoadError() }) : this.renderFallbackIcon());
    }
    renderFallbackIcon() {
        return h("div", { class: "fallback-icon-container" },
            h("yoo-icon", { class: "yo-no-image" }));
    }
    hostData() {
        return {
            class: {
                'has-fallback': this.showFallback
            }
        };
    }
    render() {
        return [
            this.isElementVisible ? this.renderFinalImage() : null,
            this.showFallbackIcon && this.renderFallbackIcon()
        ];
    }
    static get is() { return "yoo-img"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "alt": {
            "type": String,
            "attr": "alt"
        },
        "contain": {
            "type": Boolean,
            "attr": "contain"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "finalSrc": {
            "state": true
        },
        "height": {
            "type": String,
            "attr": "height"
        },
        "host": {
            "elementRef": true
        },
        "isElementVisible": {
            "state": true
        },
        "loadStrategy": {
            "type": String,
            "attr": "load-strategy"
        },
        "showFallback": {
            "type": Boolean,
            "attr": "show-fallback"
        },
        "showFallbackIcon": {
            "state": true
        },
        "src": {
            "type": String,
            "attr": "src",
            "watchCallbacks": ["updateSrc"]
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get events() { return [{
            "name": "imageLoaded",
            "method": "imageLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".sc-yoo-img-h {\n  display: block;\n  position: relative;\n  overflow: hidden; }\n  .sc-yoo-img-h    > div.sc-yoo-img, .sc-yoo-img-h   img.sc-yoo-img {\n    position: absolute;\n    width: 100%;\n    height: 100%; }\n  .sc-yoo-img-h   .fallback-icon-container.sc-yoo-img {\n    display: -ms-flexbox;\n    display: flex;\n    position: absolute;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    background-color: var(--media-fallback-background, #f4f4f4); }\n    .sc-yoo-img-h   .fallback-icon-container.sc-yoo-img   yoo-icon.sc-yoo-img {\n      color: var(--stable-alt, #d0d0d0);\n      font-size: var(--font-xl, 36px); }\n\n.ag-cell-image.sc-yoo-img-h {\n  width: 30px;\n  height: 30px;\n  border: 1px solid var(--input-container-border-color, #E6E6E6);\n  border-radius: 50%; }\n  .ag-cell-image.sc-yoo-img-h   .fallback-icon-container.sc-yoo-img   yoo-icon.sc-yoo-img {\n    margin-right: 0;\n    font-size: var(--font-m, 15px); }\n\n.contain.sc-yoo-img-h    > div.sc-yoo-img {\n  background-size: contain !important; }\n\n.contain.sc-yoo-img-h    > img.sc-yoo-img {\n  height: auto !important; }"; }
}

export { YooImgComponent as YooImg };

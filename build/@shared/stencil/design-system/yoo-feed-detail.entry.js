const h = window.DesignSystem.h;

import { bd as getUserDisplayName, m as translate, b6 as translateMulti, x as getSession, be as isIphoneX } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes, C as getType } from './chunk-262e5ad4.js';
import './index.js';

class YooFeedDetailComponent {
    constructor() {
        this.imageEnlarged = false;
        this.hasGradient = true;
        this.MAX_LINE_HEIGHT = 20;
        this.textExpanded = false;
    }
    onTextTruncatedLoaded() {
        if (this.bottomContainer) {
            this.bottomContainerInitHeight = this.bottomContainer.clientHeight;
            this.updateBottomContainerHeight();
        }
        else {
            setTimeout(() => {
                if (this.bottomContainer) {
                    this.bottomContainerInitHeight = this.bottomContainer.clientHeight;
                    this.updateBottomContainerHeight();
                }
                else {
                    this.onTextTruncatedLoaded();
                }
            }, 200);
        }
    }
    onTextExpanded(ev) {
        this.textExpanded = ev.isTextVisible;
        if (!this.textExpanded) {
            this.updateBottomContainerHeight();
            this.hideOverlay();
        }
        else {
            this.bottomContainer.style.maxHeight = '50vh';
            this.bottomContainer.style.height = 'auto';
            this.showOverlay();
        }
        this.updateIonScroll();
    }
    updateIonScroll() {
        if (this.ionScrollDiv) {
            this.ionScrollDiv.refresh();
        }
    }
    onOverlayClick() {
        this.hideOverlay();
        this.hideText();
    }
    hideOverlay() {
        this.feedDetailContainer.classList.remove('show-overlay');
    }
    updateBottomContainerHeight() {
        this.bottomContainer.style.height = Math.floor(this.bottomContainerInitHeight / 30) * 30 + 'px';
    }
    hideText() {
        this.updateBottomContainerHeight();
        this.textTruncateDiv.hideText();
    }
    showOverlay() {
        this.feedDetailContainer.classList.add('show-overlay');
    }
    handleImageClick() {
        this.hasGradient = !this.hasGradient;
        this.imageEnlarged = !this.imageEnlarged;
        this.imageClicked.emit(this.imageEnlarged);
        this.updatePhotoEditorImageScale();
    }
    updatePhotoEditorImageScale() {
        let imageDiv = this.photoEditorDiv.querySelector('.image');
        if (this.photoEditorDiv && imageDiv && this.photoEditorDiv.classList.contains('initialscale')) {
            this.photoEditorDiv.classList.remove('initialscale');
            imageDiv.classList.add('fullscale');
        }
        else {
            this.photoEditorDiv.classList.add('initialscale');
            imageDiv.classList.remove('fullscale');
        }
    }
    handleGradientClick() {
        if (this.feedDetailContainer.classList.contains('show-overlay')) {
            this.hideText();
            this.hideOverlay();
        }
        else {
            this.handleImageClick();
        }
    }
    renderInteraction(icon, count, click = () => { }, cssClass = '') {
        return (h("div", { class: 'interaction ' + (cssClass ? cssClass : ''), onClick: () => click() },
            icon ? h("yoo-icon", { class: icon }) : null,
            h("span", { class: "interaction-counter" }, count)));
    }
    renderHeader() {
        return (h("div", { class: "feed-header" },
            h("yoo-avatar", { class: "small", user: this.feed ? this.feed.user : null, onClick: ev => this.userClicked.emit() }),
            h("div", { class: "feed-heading" },
                this.feed && this.feed.user ? h("span", null, getUserDisplayName(this.feed.user)) : null,
                h("div", null,
                    this.feed && this.feed.date ?
                        h("span", { class: "feed-date" },
                            pipes.timeAgo.transform(this.feed._ect),
                            ".")
                        : null,
                    this.feed && this.feed.group && this.feed.group.length ? [
                        h("span", { class: "feed-shared-in" },
                            " ",
                            translate('SHAREDIN') + ' '),
                        h("span", { class: "feed-subheading" }, typeof this.feed.group === 'string' ?
                            [h("span", null, " "), h("span", { class: "feed-group", onClick: () => this.groupClicked.emit(this.feed.group) }, this.feed.group)]
                            : this.feed.group.length ?
                                this.feed.group.slice(0, 1).map(g => [h("span", null, " "), h("span", { class: "feed-group", onClick: () => this.groupClicked.emit(g) }, g)])
                                : null)
                    ]
                        : null))));
    }
    renderText() {
        return (h("div", { class: "feed-text" },
            this.feed && this.feed.description ?
                h("div", { class: "feed-description" },
                    h("div", { class: "description-content" },
                        h("div", { class: "scroll-wrapper" },
                            h("yoo-ion-scroll", { class: 'relative', showScrollbar: false, ref: el => this.ionScrollDiv = el }, this.feed && !this.feed.image && !this.feed.document ?
                                translateMulti(this.feed.description)
                                :
                                    h("yoo-text-truncate", { class: "dark", maxLine: 1, showBreakLine: true, onStatusChanges: ev => this.onTextExpanded(ev.detail), onTextTruncateLoaded: () => this.onTextTruncatedLoaded(), ref: el => this.textTruncateDiv = el, content: this.feed.description }))))) : null,
            this.feed && this.feed.tags ?
                h("div", { class: "feed-hashtags" }, this.feed && this.feed.tags.map(a => h("span", { class: "hashtag", innerHTML: `#${a.toLowerCase()} ` }))) : null));
    }
    renderFile() {
        return h("div", { class: "feed-file" }, this.feed && this.feed.document ?
            h("yoo-form-document", { class: "dark", document: this.feed.document })
            : null);
    }
    renderImage() {
        return (this.feed && this.feed.image && this.feed.image._downloadURL ?
            h("div", { class: "feed-image" },
                h("yoo-photo-editor", { class: 'feed-image initialscale', onClick: () => this.handleImageClick(), ref: el => this.photoEditorDiv = el, src: this.feed.image._downloadURL, readonly: true }),
                this.hasGradient ? h("div", { onClick: () => this.handleGradientClick(), class: "gradient" }) : null)
            : null);
    }
    renderOverlay() {
        return h("div", { onClick: () => { this.onOverlayClick(); }, class: "overlay" });
    }
    renderInteractionContainer() {
        return h("div", { class: "feed-interactions" }, this.isOffline ? null : [
            this.feed.disableLikes ? null : this.renderInteraction(this.feed.isLikedByMe ? 'yo-heart liked' : 'yo-heart stable-alt', '', () => this.likeClicked.emit(true)),
            this.feed.disableComments ? null : this.renderInteraction('yo-comment  stable-alt', '', () => this.commentClicked.emit(true)),
            this.feed.disableLikes ? null : this.renderInteraction(null, (this.feed.likesCount || 0) + ' ' + translate('LIKES'), () => this.likeCountClicked.emit(true)),
            this.feed.disableComments ? null : this.renderInteraction(null, this.feed.comments && this.feed.comments.length ? translate('VIEWALLCOMMENTS', { count: this.feed.comments.length || 0 }) : translate('FIRSTCOMMENT'), () => this.commentCountClicked.emit(true), 'stable comment'),
            !this.feed.user || (this.feed.user._id !== getSession().userId) ? null : this.renderInteraction('yo-eye stable-alt', (this.feed.viewsCount ? this.feed.viewsCount : 0).toString(), () => this.viewCountClicked.emit(true), 'counter')
        ]);
    }
    addExtraClass(oldClass, newClass) {
        return oldClass + ' ' + newClass;
    }
    // dynamic class for feed-detail-containers
    _class(baseClass) {
        let extraClass = baseClass;
        switch (baseClass) {
            case 'feed-details-container': {
                if (isIphoneX()) {
                    extraClass = this.addExtraClass(extraClass, 'iphone-x');
                }
                if (this.feed && this.feed.document) {
                    extraClass = this.addExtraClass(extraClass, getType(this.feed.document));
                }
                if (this.feed && !this.feed.image) {
                    extraClass = this.addExtraClass(extraClass, 'no-image');
                }
                if (this.feed && !this.feed.document) {
                    extraClass = this.addExtraClass(extraClass, 'no-document');
                }
                if (this.imageEnlarged) {
                    extraClass = this.addExtraClass(extraClass, 'image-focus');
                }
                return extraClass;
            }
            default:
                return baseClass;
        }
    }
    render() {
        return h("div", { class: this._class('feed-details-container'), ref: el => this.feedDetailContainer = el },
            this.renderOverlay(),
            h("div", { class: "image-container" }, this.renderImage()),
            h("div", { class: "bottom-container", ref: el => this.bottomContainer = el },
                this.renderHeader(),
                this.renderText(),
                this.renderFile(),
                this.renderInteractionContainer()));
    }
    static get is() { return "yoo-feed-detail"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "feed": {
            "type": "Any",
            "attr": "feed"
        },
        "hasGradient": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "imageEnlarged": {
            "state": true
        },
        "isOffline": {
            "type": Boolean,
            "attr": "is-offline"
        },
        "treatedSrc": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "groupClicked",
            "method": "groupClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "commentClicked",
            "method": "commentClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "likeClicked",
            "method": "likeClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "likeCountClicked",
            "method": "likeCountClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "commentCountClicked",
            "method": "commentCountClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "viewCountClicked",
            "method": "viewCountClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "imageClicked",
            "method": "imageClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "userClicked",
            "method": "userClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "\@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n\@keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n:host .feed-details-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  padding-top: 3rem;\n  background-color: black;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-height: normal;\n  font-stretch: normal; }\n  :host .feed-details-container.text-expanded .bottom-container {\n    -ms-flex-align: start;\n    align-items: flex-start;\n    height: 100vh;\n    -webkit-transition: all .5s ease;\n    transition: all .5s ease;\n    background-color: rgba(0, 0, 0, 0.6) !important; }\n    :host .feed-details-container.text-expanded .bottom-container div {\n      opacity: 1; }\n  :host .feed-details-container.no-document .image-container {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%; }\n    :host .feed-details-container.no-document .image-container .feed-image {\n      -webkit-animation-name: fadeIn;\n      animation-name: fadeIn;\n      -webkit-animation-duration: 0.5s;\n      animation-duration: 0.5s;\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      margin: auto;\n      padding: 0; }\n  :host .feed-details-container.image-focus .bottom-container {\n    -webkit-transition: opacity .5s ease;\n    transition: opacity .5s ease;\n    opacity: 0; }\n  :host .feed-details-container.no-image .bottom-container {\n    height: 100%;\n    margin-top: 0;\n    -webkit-transition: all .5s ease;\n    transition: all .5s ease; }\n  :host .feed-details-container.hide-overlay .overlay {\n    display: none; }\n  :host .feed-details-container .bottom-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n    margin-top: auto;\n    padding: 16px;\n    -webkit-transition: all .5s ease;\n    transition: all .5s ease;\n    opacity: 1;\n    z-index: 3; }\n    :host .feed-details-container .bottom-container .feed-header {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-align: center;\n      align-items: center;\n      padding-bottom: var(--padding-15, 0.9375rem); }\n      :host .feed-details-container .bottom-container .feed-header yoo-avatar {\n        margin-right: 0.8rem;\n        -webkit-transform: translateY(3px);\n        transform: translateY(3px); }\n      :host .feed-details-container .bottom-container .feed-header .feed-heading {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        color: var(--always-light, #FFFFFF); }\n        :host .feed-details-container .bottom-container .feed-header .feed-heading .feed-date,\n        :host .feed-details-container .bottom-container .feed-header .feed-heading .feed-shared-in {\n          color: var(--stable-alt, #d0d0d0);\n          font-size: var(--font-s, 13px);\n          font-weight: 400; }\n        :host .feed-details-container .bottom-container .feed-header .feed-heading .feed-subheading {\n          color: var(--always-light, #FFFFFF); }\n          :host .feed-details-container .bottom-container .feed-header .feed-heading .feed-subheading .feed-group {\n            padding-left: 0.125rem;\n            color: var(--always-light, #FFFFFF);\n            font-weight: 400; }\n    :host .feed-details-container .bottom-container .feed-text {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1;\n      flex: 1;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n      :host .feed-details-container .bottom-container .feed-text .feed-hashtags {\n        display: block;\n        color: var(--success, #04CC99);\n        line-height: 1.2rem; }\n      :host .feed-details-container .bottom-container .feed-text .feed-description {\n        font-size: 14px; }\n      :host .feed-details-container .bottom-container .feed-text .feed-description .description-content .scroll-wrapper {\n        display: block;\n        position: relative;\n        -ms-flex: 1;\n        flex: 1;\n        height: 100%; }\n        :host .feed-details-container .bottom-container .feed-text .feed-description .description-content .scroll-wrapper yoo-text-truncate {\n          --more-button-size: inherit;\n          --current-background-color: black;\n          --text-color: white; }\n    :host .feed-details-container .bottom-container .feed-file {\n      display: -ms-flexbox;\n      display: flex;\n      width: 100%;\n      margin-top: auto;\n      margin-bottom: var(--padding-5, 0.3125rem); }\n      :host .feed-details-container .bottom-container .feed-file yoo-form-document {\n        width: 100%; }\n    :host .feed-details-container .bottom-container .feed-interactions {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      padding-top: var(--padding-15, 0.9375rem);\n      white-space: nowrap; }\n      :host .feed-details-container .bottom-container .feed-interactions .interaction {\n        display: inline-block;\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        margin: 0rem 1rem 0rem 0rem;\n        color: var(--always-light, #FFFFFF);\n        cursor: pointer; }\n        :host .feed-details-container .bottom-container .feed-interactions .interaction yoo-icon {\n          padding-right: 2px;\n          font-size: 1.2rem; }\n          :host .feed-details-container .bottom-container .feed-interactions .interaction yoo-icon.liked {\n            color: var(--danger, #ff625f); }\n        :host .feed-details-container .bottom-container .feed-interactions .interaction.counter {\n          margin-right: 0;\n          margin-left: auto; }\n        :host .feed-details-container .bottom-container .feed-interactions .interaction.stable {\n          color: var(--stable, #adadad); }\n        :host .feed-details-container .bottom-container .feed-interactions .interaction.comment, :host .feed-details-container .bottom-container .feed-interactions .interaction.comment span {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap; }\n  :host .feed-details-container .image-container {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%; }\n    :host .feed-details-container .image-container .feed-image {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      padding: 0; }\n      :host .feed-details-container .image-container .feed-image .hidden-img {\n        display: block;\n        position: absolute;\n        opacity: 0; }\n      :host .feed-details-container .image-container .feed-image .image {\n        width: 100%;\n        background: var(--light, #FFFFFF); }\n      :host .feed-details-container .image-container .feed-image .gradient {\n        position: absolute;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-image: -webkit-gradient(linear, left top, left bottom, color-stop(60%, transparent), to(rgba(0, 0, 0, 0.8))), -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.7)), color-stop(10%, transparent));\n        background-image: linear-gradient(transparent 60%, rgba(0, 0, 0, 0.8) 100%), linear-gradient(rgba(0, 0, 0, 0.7) 0%, transparent 10%); }\n  :host .feed-details-container .overlay {\n    top: auto;\n    right: auto;\n    bottom: 0;\n    left: 0;\n    position: absolute;\n    display: none;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.6);\n    z-index: 2; }\n  :host .feed-details-container.show-overlay .bottom-container {\n    -ms-flex-align: start;\n    align-items: flex-start;\n    height: 100%;\n    max-height: 100vh;\n    -webkit-transition: all .5s ease;\n    transition: all .5s ease; }\n    :host .feed-details-container.show-overlay .bottom-container .feed-text .feed-description {\n      display: -ms-flexbox;\n      display: flex; }\n  :host .feed-details-container.show-overlay .overlay {\n    display: -ms-flexbox;\n    display: flex; }\n  :host .feed-details-container.image-focus .image-container {\n    z-index: 3; }\n  :host .feed-details-container.image-focus .bottom-container {\n    -webkit-transition: all .5s ease;\n    transition: all .5s ease;\n    opacity: 0 !important;\n    z-index: 2; }\n  :host .feed-details-container.no-image .bottom-container {\n    height: 100% !important;\n    max-height: 100vh;\n    margin-top: 0;\n    -webkit-transition: all .5s ease;\n    transition: all .5s ease; }"; }
}

export { YooFeedDetailComponent as YooFeedDetail };

import { getUserDisplayName, pipes, translate, isIphoneX, getType, getSession, translateMulti } from '../../../index'; //'../../../../stencil';
export class YooFeedDetailComponent {
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
    static get style() { return "/**style-placeholder:yoo-feed-detail:**/"; }
}

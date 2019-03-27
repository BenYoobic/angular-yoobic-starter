import { translate, pipes, showActionSheet, showModal, isIphoneX, findParent, lockSwipes, isItemAnnotated, getSession, translateMulti, downloadFile, closeModal, isWeb } from '../../../utils';
export class YooPhotoEditorsComponent {
    constructor() {
        this.index = 0;
        this.isReadonly = false;
        this.canAnnotate = false;
        this.canChat = false;
        this.hideCloseButton = false;
        this.hideContainer = false;
        this.isFirstLoad = true;
        this.itemFocused = false;
        this.isZoomed = false;
    }
    handlePinchZoom(event) {
        this.isZoomed = event.detail;
        lockSwipes(this.slides, this.isZoomed);
    }
    async updatePhoto(photo) {
        let activeIndex = await this.slides.getActiveIndex();
        if (activeIndex >= 0) {
            let items = [...this.items];
            items[activeIndex] = photo;
            this.items = items;
        }
    }
    componentWillLoad() {
        this.currentIndex = this.index;
        //This stops an infinite loader as opening on index 0
        //does not trigger a slide change
        if (this.index === 0) {
            this.isFirstLoad = false;
        }
    }
    componentDidLoad() {
        this.modal = findParent(this.host, 'yoo-ion-modal');
    }
    onSwipeDown() {
        if (this.modal && !this.isZoomed) {
            this.modal.dismiss();
        }
    }
    onActionButtonClick(button, index) {
        if (this.slides) {
            this.slides.getActiveIndex().then(activeIndex => {
                let item = this.items[activeIndex];
                switch (button) {
                    case 'flag':
                        item.flagged = !item.flagged;
                        this.flag.emit(item);
                        this.host.forceUpdate();
                        break;
                    case 'tag':
                        this.onTag(item);
                        break;
                    case 'pen':
                        this.onAnnotate(item, index);
                        break;
                    case 'download':
                        break;
                    case 'more':
                        this.showMoreActionSheet();
                        break;
                }
            });
        }
    }
    onItemClicked() {
        const ANIMATION_DURATION = 300;
        if (this.itemFocused) {
            this.host.classList.remove('focused');
            this.host.classList.remove('focused-display-none');
        }
        else {
            this.host.classList.add('focused');
            setTimeout(() => {
                this.host.classList.add('focused-display-none');
            }, ANIMATION_DURATION);
        }
        this.itemFocused = !this.itemFocused;
    }
    showMoreActionSheet() {
        this.slides.getActiveIndex().then(activeIndex => {
            let item = this.items[activeIndex];
            let url = item.value || item._downloadURL;
            if (this.isReadonly) {
                showActionSheet([
                    { text: translate('DOWNLOAD'), isVisible: () => true, handler: () => downloadFile(url, item.description) }
                ]);
            }
            else {
                showActionSheet([
                    { text: translate('OPENMISSION'), isVisible: () => item.missionRef, handler: () => this.openMission.emit(item) },
                    { text: translate('USERPROFILE'), isVisible: () => item.userRef && item.userRef !== getSession().userId, handler: () => this.userProfile.emit(item) },
                    // { text: translate('LINK'), isVisible: () => item._id, handler: () => this.linkRequested.emit(item._id) },
                    // { text: translate('SHARE'), isVisible: () => item._id, handler: () => this.share.emit(item._id) },
                    ...(this.canChat ? [{ text: translate('CHAT'), isVisible: () => item.userRef !== getSession().userId, handler: () => this.chat.emit(item) }] : []),
                    {
                        text: translate('DOWNLOAD'), isVisible: () => true, handler: () => {
                            downloadFile(url, item.description);
                            this.download.emit(item);
                        }
                    }
                ]);
            }
        });
    }
    async onAnnotate(photo, index) {
        let photoEditor = document.createElement('yoo-photo-editor');
        photoEditor.readonly = false;
        photoEditor.src = photo.value;
        photoEditor.annotatedImgSrc = photo.edit;
        photoEditor.texts = photo.texts;
        photoEditor.svgData = photo.svgData;
        photoEditor.editInPhotoEditors = true;
        showModal(photoEditor).then(retVal => {
            if (retVal.data) {
                this.items[index].canvasData = retVal.data.edit;
                this.items[index].texts = retVal.data.texts;
                this.items[index].svgData = retVal.data.svgData;
                let extraData = { edit: retVal.data.canvasData, texts: retVal.data.texts, svgData: retVal.data.svgData };
                Object.assign(photo, extraData);
                this.items = [...this.items];
                this.annotate.emit(photo);
            }
            photoEditor = null;
        });
    }
    onTag(photo) {
        this.tag.emit(photo);
    }
    renderMissionDescription(item) {
        return [
            translate('DERIVEDFROM'),
            h("mark", null, ' "' + translateMulti(item.title) + '" ')
        ];
    }
    renderFieldTitle(item) {
        return [
            translate('IN'),
            h("mark", null,
                " ",
                ' "' + item.missiondescription.title + '" '),
            translate('MISSION')
        ];
    }
    renderImageTitle(item) {
        return (h("mark", null,
            " ",
            item.imageTitle));
    }
    onSlideDidChange(isNext) {
        //This method gets called when an image is opened for an index !== 0
        //This is behaviour from swiper.js
        if (this.isFirstLoad) {
            this.isFirstLoad = false;
        }
        let increment = isNext ? 1 : -1;
        this.currentIndex += increment;
    }
    onVideoPlayerInputChanged(ev) {
        if (ev.detail) {
            const stateVideo = ev.detail;
            if (stateVideo === -1 || stateVideo === 2) {
                this.hideContainer = false;
            }
            else {
                this.hideContainer = true;
            }
        }
    }
    rotateImage(item) {
        if (item.value) {
            return item.value.includes && item.value.includes('rotate_image');
        }
        else if (item._downloadURL) {
            return item._downloadURL.includes && item._downloadURL.includes('rotate_image');
        }
        else {
            return false;
        }
    }
    shouldRenderSlideContent(index) {
        return (index === this.currentIndex || index === this.currentIndex - 1 || index === this.currentIndex - 2);
    }
    renderActionButtons() {
        let buttonClass = {
            'icon-only no-shadow': true,
            'transparent': !this.isLight,
            'light': this.isLight
        };
        return (h("div", { class: {
                'top-container': true,
                'iphone-x': isIphoneX(),
                'fade-in': this.hideContainer
            } },
            h("div", { class: "action-buttons" },
                h("div", { class: "close" }, !this.hideCloseButton &&
                    h("yoo-button", { icon: "yo-close", class: buttonClass, onClick: () => closeModal(null) })),
                h("div", { class: "more" },
                    h("yoo-button", { icon: "yo-more", class: buttonClass, onClick: () => this.onActionButtonClick('more') })))));
    }
    renderBottomContainer(item, index) {
        return (h("div", { class: {
                'bottom-container': true,
                'iphone-x': isIphoneX(),
                'fade-in': this.hideContainer
            } },
            item.user && this.renderUserInfo(item),
            h("div", { class: "photo-information" },
                item.missiondescription && this.renderMissionDescription(item),
                item.fieldTitle && this.renderFieldTitle(item),
                item.imageTitle && this.renderImageTitle(item)),
            item.tags &&
                h("div", { class: "tags" }, item.tags.map((tag) => '#' + tag)),
            this.renderBottomContainerActionButtons(item, index)));
    }
    renderBottomContainerActionButtons(item, index) {
        // Will need to look into this code once all the permissions for this are fully settled,
        // Currently it has been made consistent between what is seen in the feed view of the photos
        // and when the photo-editors open - canAnnotate and the readonly variable are toggled from the activity page
        return (!this.isReadonly ?
            h("div", { class: "action-buttons" },
                h("yoo-icon", { class: item.flagged ? 'yo-flag success' : 'yo-flag stable-alt', onClick: () => this.onActionButtonClick('flag') }),
                h("yoo-icon", { class: (item.tags && item.tags.length > 0) ? 'yo-tag success' : 'yo-tag stable-alt', onClick: () => this.onActionButtonClick('tag') }),
                item.type !== 'video' ? h("yoo-icon", { class: isItemAnnotated(item) ? 'yo-pen success' : 'yo-pen stable-alt', onClick: () => this.onActionButtonClick('pen', index) }) : null) : this.canAnnotate && (item.allowAnnotate === false ? false : true) && item.type !== 'video' ?
            h("div", { class: "action-buttons" },
                h("yoo-icon", { class: isItemAnnotated(item) ? 'yo-pen success' : 'yo-pen stable-alt', onClick: () => this.onActionButtonClick('pen', index) }))
            : null);
    }
    renderUserInfo(item) {
        return (h("div", { class: "user-info" },
            h("yoo-avatar", { user: item.user }),
            item && item.location && item.location.title ?
                h("div", { class: "user-title" },
                    translate('BY'),
                    h("mark", null, ' ' + item.userDisplayname + ' '),
                    translate('AT'),
                    h("mark", null, ' ' + item.location.title),
                    item.date ? h("div", { class: "time" }, pipes.timeAgo.transform(item.date)) : null) : h("div", { class: "user-title" },
                translate('BY'),
                h("mark", null, ' ' + item.userDisplayname + ' '),
                item.date ? h("div", { class: "time" }, pipes.timeAgo.transform(item.date)) : null)));
    }
    renderSlideContent(item, index) {
        return [
            this.renderActionButtons(),
            h("div", { class: "content-container" },
                item.type === 'video' ?
                    h("yoo-form-videoplayer", { onClick: () => this.onItemClicked(), disableHeader: true, source: item.value || item._downloadURL, isModal: true, type: "url", onInputChanged: (ev) => this.onVideoPlayerInputChanged(ev) })
                    :
                        h("yoo-photo-editor", { class: {
                                'light': this.isLight
                            }, isStitch: item.stitch ? true : false, onZoomClicked: () => this.onItemClicked(), readonly: true, isModal: true, src: item.value || item._downloadURL, disableHeader: true, annotatedImgSrc: item.edit, texts: item.texts, svgData: item.svgData, rotateImage: this.rotateImage(item) }),
                this.renderBottomContainer(item, index)),
            (item.user || item.missiondescription || item.fieldTitle || item.tags) && h("div", { class: "toolbar-shadow-portrait" })
        ];
    }
    render() {
        return (h("div", { class: "photo-editors-container" },
            h("yoo-swipe-container", { onSwipedDown: () => this.onSwipeDown() },
                h("div", { class: "slides-container" },
                    h("yoo-ion-slides", { ref: el => this.slides = el, class: { 'outside-navigation-arrows': isWeb() }, initialSlide: this.index, onIonSlideNextEnd: () => this.onSlideDidChange(true), onIonSlidePrevEnd: () => this.onSlideDidChange(false) },
                        this.isFirstLoad && h("yoo-loader", { class: { 'fixed large': true, 'dark': !this.isLight } }),
                        this.items.map((item, index) => {
                            return (h("yoo-ion-slide", { class: { 'outside-navigation-arrows': isWeb() } }, this.shouldRenderSlideContent(index) && this.renderSlideContent(item, index)));
                        }))))));
    }
    static get is() { return "yoo-photo-editors"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "canAnnotate": {
            "type": Boolean,
            "attr": "can-annotate"
        },
        "canChat": {
            "type": Boolean,
            "attr": "can-chat"
        },
        "currentIndex": {
            "state": true
        },
        "hideCloseButton": {
            "type": Boolean,
            "attr": "hide-close-button"
        },
        "hideContainer": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "index": {
            "type": Number,
            "attr": "index"
        },
        "isLight": {
            "type": Boolean,
            "attr": "is-light"
        },
        "isReadonly": {
            "type": Boolean,
            "attr": "is-readonly"
        },
        "items": {
            "type": "Any",
            "attr": "items",
            "mutable": true
        },
        "updatePhoto": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "openMission",
            "method": "openMission",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "userProfile",
            "method": "userProfile",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "link",
            "method": "link",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "share",
            "method": "share",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "chat",
            "method": "chat",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "download",
            "method": "download",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "flag",
            "method": "flag",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "tag",
            "method": "tag",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "annotate",
            "method": "annotate",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "pinched",
            "method": "handlePinchZoom"
        }]; }
    static get style() { return "/**style-placeholder:yoo-photo-editors:**/"; }
}

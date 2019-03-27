import { closeModal, isDateBefore, querySelectorDeep, getBoxViewingSession, pipes, isCordova, isCurrentLanguageChinese, getType, getNativeDirectory, fileNativeCheckFile, showPdfOnDevice, downloadFileToDevice, changeExtension, isFile, Cloudinary, getMimeType, isOffline, getCachedFileURL, isWeb, downloadFile, showActionSheet, translate, getExtension } from '../../../utils';
export class YooFormDocumentModalComponent {
    constructor() {
        this.modalMode = false;
        this.isVideo = false;
    }
    componentWillLoad() {
        this.updateDocument();
    }
    componentDidLoad() {
        if (!this.modalMode) {
            this.setDocument();
        }
    }
    componentWillUpdate() {
        if (this.isVideoSetup && this.modalMode) {
            this.isVideoSetup = false;
            this.setDocument();
        }
    }
    updateURL() {
        if (!isFile(this.document) && this.document._downloadURL) {
            if (this.document._downloadURL.indexOf('https://res.cloudinary.com') > 0) {
                this.url = changeExtension(this.document._downloadURL, 'mp4');
            }
            else {
                // local file on the devices
                this.url = this.document._downloadURL;
            }
        }
        else {
            this.url = URL.createObjectURL(this.document);
        }
        if (!isOffline()) {
            this.url = new Cloudinary(this.url).getUrl();
        }
    }
    updateDocument() {
        this.type = this.type ? this.type : getType(this.document);
        this.isChinese = isCurrentLanguageChinese();
        this.useBox = !this.isPdf || (this.isPdf && !this.isChinese && !isCordova());
        this.isPdf = getExtension(this.document) === 'pdf';
        this.updateURL();
        if (isOffline()) {
            let promise = getCachedFileURL(this.document._downloadURL);
            promise.then(file => {
                this.url = file;
            });
        }
    }
    setDocument() {
        if (this.isPdf && isCordova()) {
            // fetch the pdf file path for cordova
            this.getPdfForViewer().then((filePath) => {
                this.filePath = filePath;
                this.useBox = false;
                showPdfOnDevice(this.filePath, this.document._filename).then(() => {
                    this.onCancel();
                });
            });
        }
        else if (this.useBox) {
            this.initBox();
        }
    }
    onCancel() {
        if (this.modalMode) {
            if (this.playerElement && this.playerElement.getCurrentTime) {
                return this.playerElement.getCurrentTime().then((endTime) => {
                    closeModal({ endTime });
                });
            }
        }
        else {
            closeModal(null);
        }
    }
    getPdfForViewer() {
        if (this.document._id) {
            return getNativeDirectory('pdf').then((directory) => {
                let filePath = window.localStorage.getItem(this.getCachedKeys(directory.nativeURL)[0]); // dataDirectory + {fileId}
                if (filePath && filePath !== 'undefined') {
                    let pathPartials = filePath.split('/');
                    let fileName = pathPartials.pop();
                    let fileDirPath = pathPartials.join('/') + '/';
                    return fileNativeCheckFile(fileDirPath, fileName).then((fileExists) => {
                        let lastLmt = window.localStorage.getItem(this.getCachedKeys(directory.nativeURL)[1]);
                        let hasBeenUpdated = lastLmt && isDateBefore(lastLmt, this.document._lmt) ? true : false;
                        if (fileExists && !hasBeenUpdated) {
                            return filePath;
                        }
                        else {
                            return this.downloadPdfToStorage();
                        }
                    });
                }
                else {
                    return this.downloadPdfToStorage();
                }
            });
        }
        else {
            return Promise.resolve();
        }
    }
    downloadPdfToStorage() {
        //download and save file to the data directory
        if (this.document._downloadURL) {
            this.isLoading = true;
            return getNativeDirectory('pdf').then((directory) => {
                let target = directory.nativeURL + this.document._id + '.pdf';
                return downloadFileToDevice(this.document._downloadURL, target).then((fileEntry) => {
                    this.isLoading = false;
                    //console.log('has been downloaded to device', fileEntry);
                    let filepath = fileEntry.nativeURL;
                    // save the filepath and last updated date to local storage
                    let pathKey = this.getCachedKeys(directory.nativeURL)[0];
                    let lmtKey = this.getCachedKeys(directory.nativeURL)[1];
                    window.localStorage.setItem(pathKey, filepath);
                    window.localStorage.setItem(lmtKey, this.document._lmt);
                    return filepath;
                });
            });
        }
    }
    getCachedKeys(directoryUrl) {
        let key1 = directoryUrl + '_' + this.document._id;
        let key2 = key1 + '_' + this.document._lmt;
        return [key1, key2];
    }
    openBoxLink(url) {
        let iframe = querySelectorDeep(this.host, 'iframe.box-frame');
        if (iframe) {
            iframe.src = url;
            this.isLoading = false;
        }
    }
    initBox() {
        if (this.document.boxId) {
            this.type = 'document';
            this.isLoading = true;
            getBoxViewingSession(this.document.boxId).then(session => {
                if (session && session.expiring_embed_link && session.expiring_embed_link.url) {
                    this.openBoxLink(session.expiring_embed_link.url);
                    this.isLoading = false;
                }
                else {
                    this.isLoading = false;
                }
            }, err => {
                this.isLoading = false;
            });
        }
    }
    onPlayerTimeUpdate(ev) {
        this.currentEndTime = ev.detail;
    }
    onSwipeDown() {
        if (this.modalMode) {
            closeModal(this.currentEndTime);
        }
        else {
            closeModal(null);
        }
    }
    isDocumentDownloadSupported() {
        if (this.type === 'image' || this.type === 'video') {
            return true;
        }
        return false;
    }
    showMoreActionSheet() {
        showActionSheet([
            { text: translate('DOWNLOAD'), isVisible: () => true, handler: () => downloadFile(this.document._downloadURL, this.document._filename) }
        ]);
    }
    renderDocument() {
        switch (this.type) {
            case 'image':
                return h("yoo-photo-editor", { class: { 'light': isWeb(), 'document': true }, readonly: true, disableHeader: true, src: pipes.https.transform(this.document._downloadURL) });
            case 'audio':
                return (h("div", { class: "outer-container" },
                    h("audio", { controls: true },
                        h("source", { src: this.url, type: "audio/mpeg" }))));
            case 'video':
            case 'youtube':
            case 'url':
                this.isVideoSetup = true;
                return (h("yoo-form-videoplayer", { ref: el => this.playerElement = el, source: this.url, startTime: this.startTime, disableHeader: true, onPlayerTimeUpdate: (ev) => { this.onPlayerTimeUpdate(ev); }, modalMode: this.modalMode, previousPlayerState: this.previousPlayerState, isModal: true, hideFullscreen: this.modalMode, type: this.type === 'youtube' ? 'youtube' : 'url', mediaType: getMimeType(this.document), fullscreen: true }));
            case 'document':
            case 'pdf':
                if (!this.useBox && this.filePath) {
                    return h("yoo-loader", { class: "large absolute" });
                }
                else {
                    return this.renderBox();
                }
            default:
                if (this.useBox) {
                    return this.renderBox();
                }
                return 'not supported yet :' + this.type;
        }
    }
    renderBox() {
        return (h("iframe", { class: "box-frame", seamless: true, frameborder: 0 }));
    }
    renderHeader() {
        return (h("yoo-ion-header", { class: "shadow", "no-border": true },
            h("yoo-ion-toolbar", { color: isWeb() ? 'light' : 'dark' },
                !isWeb() ?
                    h("yoo-ion-buttons", { slot: "start" },
                        h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                            h("yoo-icon", { slot: "icon-only", class: "yo-close" }))) : null,
                h("yoo-ion-title", null, this.modalTitle || this.document._filename),
                h("yoo-ion-buttons", { slot: "end" }, this.isDocumentDownloadSupported() && h("yoo-ion-button", { class: "more", onClick: () => this.showMoreActionSheet() },
                    h("yoo-icon", { slot: "icon-only", class: "yo-more" }))))));
    }
    renderContent() {
        return (h("yoo-ion-content", { scrollEnabled: false },
            this.document ? this.renderDocument() : 'document missing',
            this.isLoading && h("yoo-loader", { class: "large absolute" })));
    }
    hostData() {
        return {
            class: {
                [this.type]: true,
                'web': isWeb()
            }
        };
    }
    render() {
        return isWeb() || this.type !== 'image' ? [
            this.renderHeader(),
            this.renderContent()
        ] :
            h("yoo-swipe-container", { onSwipedDown: () => this.onSwipeDown() },
                this.renderHeader(),
                this.renderContent());
    }
    static get is() { return "yoo-form-document-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "document": {
            "type": "Any",
            "attr": "document"
        },
        "host": {
            "elementRef": true
        },
        "isAnimationFinished": {
            "type": Boolean,
            "attr": "is-animation-finished"
        },
        "isLoading": {
            "state": true
        },
        "modalMode": {
            "type": Boolean,
            "attr": "modal-mode"
        },
        "modalTitle": {
            "type": String,
            "attr": "modal-title"
        },
        "previousPlayerState": {
            "type": Number,
            "attr": "previous-player-state"
        },
        "startTime": {
            "type": "Any",
            "attr": "start-time"
        },
        "type": {
            "type": String,
            "attr": "type",
            "mutable": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-form-document-dialog:**/"; }
}

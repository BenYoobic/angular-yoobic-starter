import { querySelectorDeep, isAndroid, getVideoPoster, changeExtension, closeModal, loadScript, isFile, getMimeType, showModal, translate, isCordova, downloadFile, showActionSheet, getAppContext, urlToFileBlob, Hammer } from '../../../utils';
import { remove, find } from 'lodash-es';
import videojs from 'video.js/dist/video.min.js';
const PLAYER_STATES = {
    ENDED: -1,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5
};
export class YooFormVideoPlayerComponent {
    constructor() {
        this.fullscreen = false;
        this.isModal = false;
        this.isVisible = true;
        this.hideFullscreen = false;
        this.disableHeader = false;
        this.autoplay = true;
        this.disableSeekbar = false;
        this.fullscreenModal = false;
        YooFormVideoPlayerComponent.componentCounter += 1;
    }
    componentWillLoad() {
        this.updateSource();
        if (isAndroid() && isCordova() && this.source && this.source.includes('_file_')) {
            let promise = urlToFileBlob(this.url);
            promise.then((blob) => {
                if (blob) {
                    this.url = URL.createObjectURL(blob);
                }
            });
        }
        this.hostedPlayerId = 'video-player-' + this.getVideoId() + '-' + YooFormVideoPlayerComponent.componentCounter;
    }
    componentDidLoad() {
        if (this.outerContainerElement && this.host.classList.contains('sc-yoo-photo-editors')) {
            this.outerContainerElement.firstElementChild.setAttribute('style', `height:${window.innerHeight}px`);
        }
        if (this.type === 'url') {
            if (this.url.includes('vimeo.com')) {
                this.getVimeoPlayerAPI().then(Vimeo => {
                    if (Vimeo && Vimeo.Player) {
                        this.player = new Vimeo.Player(querySelectorDeep(this.host, 'iframe'));
                        this.player.on('play', () => { this.onVideoPlayerStateChanged(PLAYER_STATES.PLAYING); });
                        this.player.on('pause', () => { this.onVideoPlayerStateChanged(PLAYER_STATES.PAUSED); });
                        this.player.on('ended', () => { this.onVideoPlayerStateChanged(PLAYER_STATES.ENDED); });
                        this.updateCurrentTime(this.startTime);
                    }
                });
            }
            else if (this.url.includes('www.dailymotion.com')) {
                YooFormVideoPlayerComponent.hosts.push(this.host);
                let wrapper = querySelectorDeep(this.host, '.dm-wrapper');
                this.wrapperHeight = wrapper ? wrapper.clientHeight : null;
                this.getDailymotionPlayerAPI().then(DM => {
                    this.player = new DM.player(this.hostedPlayerId, {
                        width: '100%',
                        height: wrapper ? wrapper.clientHeight : '100%',
                        video: this.getVideoId(),
                        params: {
                            api: '1',
                            'queue-autoplay-next': false,
                            'queue-enable': false,
                            controls: (this.enableModalFullscreen && !this.modalMode) ? 0 : 1,
                            allowfullscreen: (this.enableModalFullscreen && !this.modalMode) ? 0 : 1
                        }
                    });
                    this.player.addEventListener('play', () => { this.onVideoPlayerStateChanged(PLAYER_STATES.PLAYING); });
                    this.player.addEventListener('pause', () => { this.onVideoPlayerStateChanged(PLAYER_STATES.PAUSED); });
                    this.player.addEventListener('loadedmetadata', () => { this.updateCurrentTime(this.startTime); });
                });
                if (wrapper) {
                    wrapper.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (this.player && this.player.togglePlay) {
                            this.player.togglePlay();
                        }
                    });
                }
            }
            else {
                this.player = videojs(this.videoEl);
                // Create custom fullscreen toggle to open a modal in fullscreen
                this.player.on('play', () => { this.onVideoPlayerStateChanged(PLAYER_STATES.PLAYING); });
                this.player.on('pause', () => { this.onVideoPlayerStateChanged(PLAYER_STATES.PAUSED); });
                this.player.on('ended', () => { this.onVideoPlayerStateChanged(PLAYER_STATES.ENDED); });
                if (!this.modalMode && this.hideFullscreen) {
                    const Button = videojs.getComponent('Button');
                    const fullscreenToggle = new Button(this.player);
                    fullscreenToggle.el_.classList.add('vjs-fullscreen-control');
                    fullscreenToggle.el_.classList.add('custom');
                    fullscreenToggle.el_.addEventListener('click', () => this.openFullscreenModal());
                    fullscreenToggle.el_.addEventListener('touchend', () => this.openFullscreenModal());
                    this.player.controlBar.addChild(fullscreenToggle);
                }
                else {
                    this.player.on('timeupdate', () => { this.onTimeUpdate(); });
                    this.player.on('loadedmetadata', () => { this.updateCurrentTime(this.startTime); });
                }
            }
        }
        else if (this.type === 'youtube') {
            let wrapper = querySelectorDeep(this.host, '.youtube-wrapper');
            this.wrapperHeight = wrapper ? wrapper.clientHeight : null;
            this.getYoutubeIFrameAPI().then(YT => {
                if (YT && YT.Player) {
                    this.player = new YT.Player(querySelectorDeep(this.host, '.youtube-iframe'), {
                        videoId: this.getVideoId(),
                        height: this.wrapperHeight,
                        start: this.startTime ? this.startTime : 0,
                        playerVars: {
                            fs: this.hideFullscreen || (this.enableModalFullscreen && !this.modalMode) ? 0 : 1,
                            rel: 0,
                            showinfo: 0,
                            modestbranding: 1,
                            controls: this.readonly || (this.enableModalFullscreen && !this.modalMode) ? 0 : 1
                        },
                        events: {
                            'onReady': (ev) => { this.onPlayerReady(ev); },
                            'onStateChange': (ev) => { this.onVideoPlayerStateChanged(ev.data); }
                        }
                    });
                }
            });
            if (wrapper) {
                wrapper.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this.player && this.player.getPlayerState) {
                        if (this.player.getPlayerState() !== PLAYER_STATES.PLAYING) {
                            this.player.playVideo();
                        }
                        else {
                            this.player.pauseVideo();
                        }
                    }
                });
            }
        }
        if (this.enableModalFullscreen) {
            if (this.url && this.url.includes('vimeo.com')) {
                this.hammerCtrl = new Hammer(this.vimeoOverlayEl);
                this.hammerCtrl.on('tap', (event) => {
                    if (this.player) {
                        if (this.playerState === PLAYER_STATES.PLAYING) {
                            this.player.pause();
                        }
                        else {
                            this.player.play();
                        }
                    }
                });
            }
            else {
                this.hammerCtrl = new Hammer(this.outerContainerElement);
            }
            this.hammerCtrl.on('doubletap', (event) => {
                this.pauseVideo();
                this.triggerFullscreenOnPause = true;
            });
        }
    }
    componentDidUnload() {
        remove(YooFormVideoPlayerComponent.hosts, (host) => host === this.host);
    }
    updateCurrentTime(time) {
        if (this.player && (this.hideFullscreen || this.type === 'youtube')) {
            if (time > -1) {
                if (this.type === 'youtube') {
                    this.player.seekTo(time);
                    this.player.playVideo();
                }
                else if (this.url && this.url.includes('vimeo.com')) {
                    this.player.setCurrentTime(time);
                }
                else if (this.url && this.url.includes('dailymotion.com')) {
                    this.player.seek(time);
                }
                else {
                    this.player.currentTime(time);
                }
            }
        }
    }
    getCurrentTime() {
        let promise = Promise.resolve(0);
        if (this.player) {
            if (this.type === 'youtube') {
                promise = Promise.resolve(this.player.getCurrentTime());
            }
            else if (this.url) {
                if (this.url.includes('dailymotion')) {
                    promise = Promise.resolve(this.player.currentTime);
                }
                else if (this.url.includes('vimeo.com')) {
                    promise = this.player.getCurrentTime();
                }
                else {
                    promise = Promise.resolve(this.player.currentTime());
                }
            }
        }
        return promise;
    }
    pauseVideo() {
        if (this.player) {
            if (this.type === 'youtube') {
                this.player.pauseVideo();
            }
            else {
                this.player.pause();
            }
        }
    }
    updateSource() {
        if (this.source) {
            if (this.type === 'url') {
                if (this.source.includes('cloudinary')) {
                    this.poster = getVideoPoster(this.source);
                    this.url = changeExtension(this.source, 'mp4');
                }
                else {
                    // local file on web
                    this.url = this.updateURL();
                }
            }
        }
    }
    updateVisibility() {
        if (!this.isVisible) {
            if (this.type === 'youtube' && this.player && this.player.pauseVideo) {
                this.player.pauseVideo();
            }
            else if (this.type === 'url') {
                if (this.player && this.player.pause) {
                    this.player.pause();
                }
            }
        }
    }
    onPlayerReady(ev) {
        if (ev && ev.target && ev.target.seekTo && this.startTime > 0) {
            if (this.type === 'youtube') {
                ev.target.seekTo(this.startTime);
                if (ev.target.pauseVideo && !this.playsOnFullscreen && this.previousPlayerState !== PLAYER_STATES.PLAYING) {
                    this.pauseOnStateChanges = true;
                }
            }
        }
    }
    getYoutubeIFrameAPI() {
        if (window.YT) {
            return Promise.resolve(window.YT);
        }
        else {
            return loadScript('https://www.youtube.com/iframe_api')
                .then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(window.YT);
                    }, 300); // need to wait for YT to be ready
                });
            })
                .catch(() => {
                return Promise.resolve(null);
            });
        }
    }
    getVimeoPlayerAPI() {
        if (window.Vimeo) {
            return Promise.resolve(window.Vimeo);
        }
        else {
            return loadScript('https://player.vimeo.com/api/player.js')
                .then(() => {
                return new Promise((resolve) => {
                    resolve(window.Vimeo);
                });
            })
                .catch(() => {
                return Promise.resolve(null);
            });
        }
    }
    getDailymotionPlayerAPI() {
        if (window.DM) {
            return Promise.resolve(window.DM);
        }
        else {
            return loadScript('https://api.dmcdn.net/all.js')
                .then(() => {
                return new Promise((resolve) => {
                    // making Dailymotion's $ function Shadow DOM compatible
                    if (!window.DM._$) {
                        window.DM._$ = function (elId) { return document.getElementById(elId); };
                        window.DM.$ = (elId) => {
                            let elHost = find(YooFormVideoPlayerComponent.hosts, (host) => querySelectorDeep(host, '#' + elId) !== undefined);
                            return elHost ? querySelectorDeep(elHost, '#' + elId) : null;
                        };
                    }
                    resolve(window.DM);
                });
            })
                .catch(() => {
                return Promise.resolve(null);
            });
        }
    }
    onTimeUpdate() {
        if (this.modalMode) {
            let currentTime = this.player.currentTime();
            this.playerTimeUpdate.emit(currentTime);
        }
    }
    openFullscreenModal() {
        this.getCurrentTime().then((startTime) => {
            let file;
            if (isFile(this.source)) {
                file = this.source;
            }
            else {
                let newPath = this.source.toString();
                file = { _filename: newPath, _downloadURL: newPath, mimeType: getMimeType(newPath) };
            }
            let documentViewer = document.createElement('yoo-form-document-dialog');
            documentViewer.document = file;
            documentViewer.type = this.type;
            documentViewer.modalTitle = translate('VIDEO');
            documentViewer.startTime = startTime;
            documentViewer.modalMode = true;
            documentViewer.previousPlayerState = this.playerState;
            showModal(documentViewer).then(ret => {
                if (ret.data && ret.data.endTime > -1) {
                    this.updateCurrentTime(ret.data.endTime);
                }
                documentViewer = null;
            });
        });
    }
    showMoreActionSheet() {
        showActionSheet([
            { text: translate('DOWNLOAD'), isVisible: () => true, handler: () => downloadFile(this.source, this.name) }
        ]);
    }
    getVideoId() {
        if (this.type === 'youtube') {
            if (this.source) {
                let splitArr = this.source.split('=');
                return (splitArr && splitArr[1]) ? splitArr[1] : this.source;
            }
            else {
                return this.source;
            }
        }
        if (this.url && (this.url.includes('vimeo.com') || this.url.includes('dailymotion.com'))) {
            let arr = this.url.split('/');
            return arr[arr.length - 1];
        }
        return this.source;
    }
    updateURL() {
        let arr = this.source.split('/');
        let videoId = arr[arr.length - 1];
        let newURL = this.source;
        if (!videoId) {
            return newURL;
        }
        if (newURL.includes('www.dailymotion.com')) {
            newURL = 'https://www.dailymotion.com/embed/video/' + videoId;
        }
        if (newURL.includes('vimeo.com')) {
            newURL = 'https://player.vimeo.com/video/' + videoId;
        }
        return newURL;
    }
    onVideoPlayerStateChanged(state) {
        if (this.host.classList.contains('sc-yoo-photo-editors')) {
            this.videoControlBarElement = querySelectorDeep(this.host, '.vjs-control-bar');
            if (this.videoControlBarElement) {
                if (state === -1 || state === 2) {
                    this.videoControlBarElement.classList.add('fade-in');
                }
                else {
                    if (this.videoControlBarElement.classList.contains('fade-in')) {
                        this.videoControlBarElement.classList.remove('fade-in');
                    }
                }
            }
        }
        if (this.type === 'youtube') {
            if (state === PLAYER_STATES.PLAYING) {
                if (this.fullscreenContainer && !this.fullscreenContainer.classList.contains('fade-in')) {
                    this.fullscreenContainer.classList.add('fade-in');
                }
                if (this.pauseOnStateChanges) {
                    this.player.pauseVideo();
                    this.pauseOnStateChanges = false;
                }
            }
            else {
                if (this.fullscreenContainer && this.fullscreenContainer.classList.contains('fade-in')) {
                    this.fullscreenContainer.classList.remove('fade-in');
                }
            }
        }
        if (this.triggerFullscreenOnPause && !this.modalMode) {
            this.triggerFullscreenOnPause = false;
            this.openFullscreenModal();
        }
        if (state === PLAYER_STATES.PLAYING) {
            this.videoPlayed = true;
        }
        this.playerState = state;
        this.inputChanged.emit(state);
    }
    renderFullscreenButtonOverlay() {
        return [
            h("div", { ref: el => this.fullscreenContainer = el, class: "fullscreen-overlay" },
                h("div", { class: "icon-container", onClick: () => { this.openFullscreenModal(); } }))
        ];
    }
    renderBasedOnVideoURL() {
        let wrapperStyles = {};
        if (this.wrapperHeight) {
            wrapperStyles['height'] = this.wrapperHeight + 'px';
        }
        if (this.type === 'youtube') {
            return h("div", { class: "youtube-wrapper", style: wrapperStyles },
                h("div", { class: "youtube-iframe", style: wrapperStyles }));
        }
        if (this.type === 'url') {
            if (this.url.includes('www.dailymotion.com') || this.url.includes('vimeo.com')) {
                return h("div", { class: "non-youtube-wrapper", style: wrapperStyles }, this.url.includes('www.dailymotion.com') ?
                    h("div", { class: "dm-wrapper", style: wrapperStyles },
                        h("div", { id: this.hostedPlayerId, class: "dm-player" })) :
                    [
                        h("iframe", { frameborder: "0", width: "100%", height: "100%", src: this.updateURL() }),
                        h("div", { class: {
                                'vimeo-overlay': true,
                                'active': this.videoPlayed
                            }, ref: el => this.vimeoOverlayEl = el })
                    ]);
            }
            // we use cloudinary to convert most video formats to mp4
            let videoType = this.url.endsWith('.mp4') ? 'video/mp4' : this.mediaType;
            return h("video", { ref: el => this.videoEl = el, class: "video-js", playsinline: true, autoplay: this.autoplay, src: this.url, controls: !this.enableModalFullscreen && this.modalMode, poster: this.poster },
                h("source", { src: this.url, type: videoType }));
        }
        return null;
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext(), { 'disable-seeking': this.disableSeekbar, 'form-player': this.isInsideForm, 'modal-mode': this.modalMode })
        };
    }
    render() {
        return [
            this.isModal && !this.disableHeader ? h("div", { class: "toolbar" },
                h("div", { class: "close" },
                    h("span", { onClick: () => closeModal(null) },
                        h("yoo-icon", { class: "yo-close" }))),
                h("div", { class: "more" },
                    h("span", { onClick: () => this.showMoreActionSheet() },
                        h("yoo-icon", { class: "yo-more" })))) : null,
            h("div", { ref: el => this.outerContainerElement = el, class: "outer-container" }, this.renderBasedOnVideoURL())
        ];
    }
    static get is() { return "yoo-form-videoplayer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "autoplay": {
            "type": Boolean,
            "attr": "autoplay"
        },
        "disableHeader": {
            "type": Boolean,
            "attr": "disable-header"
        },
        "disableSeekbar": {
            "type": Boolean,
            "attr": "disable-seekbar",
            "mutable": true
        },
        "enableModalFullscreen": {
            "type": Boolean,
            "attr": "enable-modal-fullscreen"
        },
        "fullscreen": {
            "type": Boolean,
            "attr": "fullscreen"
        },
        "fullscreenModal": {
            "state": true
        },
        "getCurrentTime": {
            "method": true
        },
        "hideFullscreen": {
            "type": Boolean,
            "attr": "hide-fullscreen"
        },
        "host": {
            "elementRef": true
        },
        "isInsideForm": {
            "type": Boolean,
            "attr": "is-inside-form"
        },
        "isModal": {
            "type": Boolean,
            "attr": "is-modal"
        },
        "isVisible": {
            "type": Boolean,
            "attr": "is-visible",
            "watchCallbacks": ["updateVisibility"]
        },
        "mediaType": {
            "type": String,
            "attr": "media-type"
        },
        "modalMode": {
            "type": Boolean,
            "attr": "modal-mode"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "pauseVideo": {
            "method": true
        },
        "playsOnFullscreen": {
            "type": Boolean,
            "attr": "plays-on-fullscreen"
        },
        "poster": {
            "state": true
        },
        "previousPlayerState": {
            "type": Number,
            "attr": "previous-player-state"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "source": {
            "type": String,
            "attr": "source",
            "watchCallbacks": ["updateSource"]
        },
        "startTime": {
            "type": "Any",
            "attr": "start-time"
        },
        "type": {
            "type": "Any",
            "attr": "type",
            "watchCallbacks": ["updateSource"]
        },
        "updateCurrentTime": {
            "method": true
        },
        "url": {
            "state": true
        },
        "videoPlayed": {
            "state": true
        },
        "wrapperHeight": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "playerTimeUpdate",
            "method": "playerTimeUpdate",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-videoplayer:**/"; }
}
YooFormVideoPlayerComponent.componentCounter = 0;
YooFormVideoPlayerComponent.hosts = [];

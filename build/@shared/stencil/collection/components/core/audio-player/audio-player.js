import { querySelectorDeep, pipes, translate, Cloudinary } from '../../../utils';
export class YooAudioPlayerComponent {
    constructor() {
        this.currentStatus = 'default';
        this.increment = 100;
    }
    componentWillLoad() {
        this.updatedURL = new Cloudinary(this._downloadURL).getUrl();
    }
    componentDidLoad() {
        this.audioRef = querySelectorDeep(this.host, '.yoo-audio');
        this.loadedmetadataListener = () => { this.getInitDuration(); };
        this.audioRef.addEventListener('loadedmetadata', this.loadedmetadataListener);
        this.progressButton = querySelectorDeep(this.host, '.progress-button');
        this.progressOverlay = querySelectorDeep(this.host, '.progress-overlay');
        this.progressBarWidth = querySelectorDeep(this.host, '.progress-bar').offsetWidth;
        this.progressWrapper = querySelectorDeep(this.host, '.progress-wrapper');
    }
    componentDidUnload() {
        if (this.audioRef) {
            this.audioRef.removeEventListener('loadedmetadata', this.loadedmetadataListener);
        }
        this.onPause();
    }
    onControlClick() {
        if (this.shouldShowPlay()) {
            this.onPlay();
        }
        else {
            this.onPause();
        }
    }
    getInitDuration() {
        this.currentProgressTime = pipes.timer.transform(Math.round(this.audioRef.duration));
    }
    updateCurrentTime(ev) {
        let percent;
        percent = (ev.clientX - this.progressWrapper.getBoundingClientRect().left) / this.progressWrapper.clientWidth;
        if (percent < 0) {
            percent = 0;
        }
        if (percent > 1) {
            percent = 1;
        }
        this.audioRef.currentTime = percent * this.audioRef.duration;
        this.onPlay();
    }
    onPlay() {
        if (this.timer) {
            window.clearInterval(this.timer);
        }
        this.audioRef.play();
        this.currentStatus = 'play';
        this.timer = window.setInterval(() => {
            this.increment = 10 / this.audioRef.duration;
            let percent = Math.min(this.increment * this.audioRef.currentTime * 10, 100);
            let newTime = Math.round(this.audioRef.duration - this.audioRef.currentTime);
            this.currentProgressTime = pipes.timer.transform(newTime);
            this.progressOverlay.style.width = percent + '%';
            let newPosition = (percent * this.progressBarWidth - this.progressButton.clientWidth) / 100;
            if (newPosition < 0) {
                newPosition = 0;
            }
            if (newPosition > this.progressBarWidth - this.progressButton.clientWidth) {
                newPosition = this.progressBarWidth - this.progressButton.clientWidth;
            }
            this.progressButton.style.left = newPosition + 'px';
            if (this.audioRef.ended) {
                window.clearInterval(this.timer);
                this.currentStatus = 'default';
            }
        }, 100);
    }
    shouldShowPlay() {
        return this.currentStatus === 'pause' || this.currentStatus === 'default';
    }
    onPause() {
        window.clearInterval(this.timer);
        this.audioRef.pause();
        this.currentStatus = 'pause';
    }
    render() {
        return h("div", { class: 'outer-container ' + this.displayMode },
            h("audio", { src: this.updatedURL, preload: 'metadata', class: "yoo-audio" }),
            h("div", { class: "audio-player-wrapper" },
                h("div", { onClick: () => this.onControlClick(), class: "play-button" },
                    h("yoo-icon", { class: this.shouldShowPlay() ? 'yo-play' : 'yo-pause' })),
                h("div", { class: "progress-wrapper" },
                    h("div", { onClick: (ev) => this.updateCurrentTime(ev), class: "progress-bar" }),
                    h("div", { onClick: (ev) => this.updateCurrentTime(ev), class: "progress-button" }),
                    h("div", { onClick: (ev) => this.updateCurrentTime(ev), class: "progress-overlay" })),
                h("div", { onClick: (ev) => this.updateCurrentTime(ev), class: "description-wrapper" },
                    h("div", { class: "title" }, translate('AUDIO')),
                    h("div", { class: "subtitle" }, this.currentProgressTime))));
    }
    static get is() { return "yoo-audio-player"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "_downloadURL": {
            "type": String,
            "attr": "_download-u-r-l"
        },
        "currentProgressTime": {
            "state": true
        },
        "currentStatus": {
            "state": true
        },
        "displayMode": {
            "type": String,
            "attr": "display-mode"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-audio-player:**/"; }
}

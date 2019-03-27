import { translate } from '../../../utils';
export class YooCardMediaComponent {
    constructor() {
        /**
         * Width of the video element
         */
        this.videoWidth = '100%';
        /**
         * Height of the video element
         */
        this.videoHeight = '100%';
    }
    componentDidLoad() {
        this.onUpdateVideoCard();
    }
    onParticipantUpdates() {
        this.onUpdateVideoCard();
    }
    hasVideoStream() {
        return this.participant
            && this.participant.stream
            && this.participant.stream.getVideoTracks().length > 0;
    }
    hasAudioStream() {
        return this.participant
            && this.participant.stream
            && this.participant.stream.getAudioTracks().length > 0;
    }
    isLocalParticipant() {
        return this.host
            && this.host.classList
            && this.host.classList.contains('local');
    }
    isMobile() {
        return this.host
            && this.host.classList
            && this.host.classList.contains('mobile');
    }
    isConnecting() {
        if (this.participant && this.participant.waitingToConnect) {
            return true;
        }
        return false;
    }
    onUpdateVideoCard() {
        if (!this.videoRef) {
            this.videoRef = document.createElement('video');
        }
        this.videoRef.setAttribute('width', this.videoWidth);
        this.videoRef.setAttribute('height', this.videoHeight);
        this.trackDiv.appendChild(this.videoRef);
        navigator.attachMediaStream(this.videoRef, this.getStream());
        this.videoRef.autoplay = 'autoplay';
    }
    getStream() {
        if (this.hasVideoStream()) {
            this.showEmptyPlaceholder = false;
            return this.participant.stream;
        }
        else if (this.hasAudioStream()) {
            this.showEmptyPlaceholder = true;
            return this.participant.stream;
        }
        else {
            this.showEmptyPlaceholder = true;
            return null;
        }
    }
    onActionClicked(action) {
        if (action && action.handler) {
            action.handler();
        }
    }
    getParticipantName() {
        if (this.participant && this.participant.userInfo
            && this.participant.userInfo.name) {
            return this.participant.userInfo.name;
        }
        return '';
    }
    getUser() {
        if (this.participant
            && this.participant.user) {
            return this.participant.user;
        }
        return null;
    }
    renderConnectingPlaceholder() {
        return h("yoo-loader", { class: {
                'backdrop large absolute': !this.isMobile(),
                'medium': this.isMobile()
            }, text: this.isMobile() ? '' : translate('WAITINGTOCONNECT') });
    }
    renderAvatarPlaceholder() {
        let user = this.getUser();
        return h("div", { class: "placeholder-container" }, user && h("div", { class: "avatar-container" },
            h("yoo-avatar", { class: "large", user: user })));
    }
    renderPlaceholder() {
        if (this.isConnecting() && !this.isLocalParticipant()) {
            return this.renderConnectingPlaceholder();
        }
        else {
            return this.renderAvatarPlaceholder();
        }
    }
    renderBottomStatus() {
        return this.bottomActions && this.bottomActions.length > 0 && h("div", { class: "status-bar" },
            h("div", { class: "items-wrapper" }, this.bottomActions.map((action) => {
                return this.renderAction(action);
            })));
    }
    renderAction(action) {
        return action && action.icon && h("div", { class: `item ${action.cssClass()}`, onClick: () => { this.onActionClicked(action); } },
            h("yoo-icon", { class: action.icon() }));
    }
    renderRedial() {
        return [
            h("div", { class: "redial-container" },
                h("div", { class: "button-container" },
                    h("yoo-button", { text: 'REDIAL' })))
        ];
    }
    renderBody() {
        return [
            h("div", { ref: el => this.trackDiv = el, class: "remote-media" }, this.showRedialButton && this.renderRedial())
        ];
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.renderBody(),
            this.renderBottomStatus(),
            this.showEmptyPlaceholder && this.renderPlaceholder()));
    }
    static get is() { return "yoo-card-media"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "bottomActions": {
            "type": "Any",
            "attr": "bottom-actions"
        },
        "extraActions": {
            "type": "Any",
            "attr": "extra-actions"
        },
        "host": {
            "elementRef": true
        },
        "participant": {
            "type": "Any",
            "attr": "participant",
            "watchCallbacks": ["onParticipantUpdates"]
        },
        "showEmptyPlaceholder": {
            "state": true
        },
        "showRedialButton": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-card-media:**/"; }
}

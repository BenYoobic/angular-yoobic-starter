const h = window.DesignSystem.h;

import { m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooCardMediaComponent {
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
    static get style() { return ":host {\n  --status-bar-height: 75px;\n  --status-item-size: 50px;\n  --status-bar-gap: 5px; }\n\n:host {\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 100%; }\n  :host .outer-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    position: relative;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: 100%;\n    height: auto;\n    background: var(--black, #000000); }\n    :host .outer-container .placeholder-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      position: absolute;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      width: 100%;\n      text-align: center; }\n      :host .outer-container .placeholder-container .avatar-container {\n        width: 75px;\n        height: 75px;\n        margin-bottom: var(--status-bar-height); }\n    :host .outer-container .remote-media {\n      position: relative;\n      width: 100%;\n      height: auto;\n      max-height: 100%;\n      background: var(--black, #000000); }\n      :host .outer-container .remote-media yoo-loader {\n        position: absolute;\n        width: 100%;\n        height: 100%; }\n    :host .outer-container .status-bar {\n      position: absolute;\n      bottom: 0;\n      width: 100%;\n      height: var(--status-bar-height);\n      background: var(--dark-two, #212936);\n      z-index: 11; }\n      :host .outer-container .status-bar .items-wrapper {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        width: 100%;\n        height: 100%; }\n        :host .outer-container .status-bar .items-wrapper .item {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-align: center;\n          align-items: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n          width: var(--status-item-size);\n          height: var(--status-item-size);\n          margin-right: var(--status-bar-gap);\n          border-radius: 50%;\n          font-size: auto; }\n          :host .outer-container .status-bar .items-wrapper .item.danger {\n            background: var(--danger, #ff625f);\n            color: var(--light, #FFFFFF); }\n          :host .outer-container .status-bar .items-wrapper .item.success {\n            background: var(--success, #04CC99);\n            color: var(--light, #FFFFFF); }\n          :host .outer-container .status-bar .items-wrapper .item.dark {\n            background: var(--dark, #2b3648);\n            color: var(--light, #FFFFFF); }\n\n:host(.mobile) .outer-container {\n  height: 100%; }\n\n:host(.transparent) .outer-container .status-bar {\n  background: transparent; }\n\n:host(.fit) .outer-container .remote-media {\n  width: 100% !important;\n  height: 100% !important; }"; }
}

export { YooCardMediaComponent as YooCardMedia };

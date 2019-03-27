const h = window.DesignSystem.h;

import { _ as cloudinary, $ as execHandlerAndStopEvent } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';

class YooAvatarComponent {
    constructor() {
        this.reversedColor = false;
    }
    hasImageData() {
        return this.user && this.user.imageData;
    }
    hasImageSource() {
        return this.imgSrc;
    }
    hasIcon() {
        return this.icon;
    }
    hasIconText() {
        return this.iconText;
    }
    hasInitial() {
        return this.user;
    }
    renderAvatarWithImage(source) {
        let imageWidth = 100;
        if (this.host.classList.contains('profile')) {
            imageWidth = 27;
        }
        else if (this.host.classList.contains('msmall')) {
            imageWidth = 25;
        }
        else if (this.host.classList.contains('list-small')) {
            imageWidth = 30;
        }
        else if (this.host.classList.contains('small')) {
            imageWidth = 36;
        }
        else if (this.host.classList.contains('xmedium')) {
            imageWidth = 45;
        }
        else if (this.host.classList.contains('medium')) {
            imageWidth = 50;
        }
        else if (this.host.classList.contains('list-xlarge')) {
            imageWidth = 85;
        }
        else if (this.host.classList.contains('xlarge')) {
            imageWidth = 85;
        }
        else if (this.host.classList.contains('large')) {
            imageWidth = 70;
        }
        return h("yoo-img", { type: "back", class: "image", src: cloudinary(source, imageWidth, imageWidth) });
    }
    renderAvatarWithIcon() {
        return h("div", { class: "image icon-container" }, h("yoo-icon", { class: this.icon }));
    }
    renderAvatarWithIconText() {
        return h("div", { class: 'image counter icon-container ' + (this.reversedColor ? 'reversed-color' : 'regular-color') }, h("span", null,
            " ",
            this.iconText.substr(0, 2)));
    }
    renderAvatarWithInitial() {
        return h("div", { class: "image initial-container stable-border" },
            h("span", { class: "user-initial" }, pipes.userInitial.transform(this.user)));
    }
    renderBasedOnSource() {
        if (this.hasImageSource()) {
            return this.renderAvatarWithImage(this.imgSrc);
        }
        if (this.hasIcon()) {
            return this.renderAvatarWithIcon();
        }
        if (this.hasIconText()) {
            return this.renderAvatarWithIconText();
        }
        if (this.hasImageData()) {
            return this.renderAvatarWithImage(this.user.imageData);
        }
        if (this.hasInitial()) {
            return this.renderAvatarWithInitial();
        }
        return null;
    }
    render() {
        return (h("div", { class: {
                'avatar': true,
                'initial': !this.hasImageData()
            } },
            this.topRightIcon ? h("span", { class: "top-right", onClick: (ev) => execHandlerAndStopEvent(ev, () => this.topRightClicked.emit(true)) },
                h("yoo-icon", { class: this.topRightIcon })) : null,
            this.topLeftIcon ? h("span", { class: "top-left", onClick: (ev) => execHandlerAndStopEvent(ev, () => this.topLeftClicked.emit(true)) },
                h("yoo-icon", { class: this.topLeftIcon })) : null,
            this.hasPending && h("yoo-badge", { class: "pending small circle danger" }),
            this.renderBasedOnSource(),
            this.bottomRightIcon ? h("span", { class: "bottom-right", onClick: (ev) => execHandlerAndStopEvent(ev, () => this.bottomRightClicked.emit(true)) },
                h("yoo-icon", { class: this.bottomRightIcon })) : null,
            this.bottomLeftIcon ? h("span", { class: "bottom-left", onClick: (ev) => execHandlerAndStopEvent(ev, () => this.bottomLeftClicked.emit(true)) },
                h("yoo-icon", { class: this.bottomLeftIcon })) : null));
    }
    static get is() { return "yoo-avatar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "bottomLeftIcon": {
            "type": String,
            "attr": "bottom-left-icon"
        },
        "bottomRightIcon": {
            "type": String,
            "attr": "bottom-right-icon"
        },
        "hasPending": {
            "type": Boolean,
            "attr": "has-pending"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "iconText": {
            "type": String,
            "attr": "icon-text"
        },
        "imgSrc": {
            "type": String,
            "attr": "img-src"
        },
        "reversedColor": {
            "type": Boolean,
            "attr": "reversed-color"
        },
        "topLeftIcon": {
            "type": String,
            "attr": "top-left-icon"
        },
        "topRightIcon": {
            "type": String,
            "attr": "top-right-icon"
        },
        "user": {
            "type": "Any",
            "attr": "user"
        }
    }; }
    static get events() { return [{
            "name": "topRightClicked",
            "method": "topRightClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "topLeftClicked",
            "method": "topLeftClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "bottomRightClicked",
            "method": "bottomRightClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "bottomLeftClicked",
            "method": "bottomLeftClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --transform-avatar: none;\n  --border-radius-image: 50%;\n  --background-size-image: auto;\n  --background-color: var(--light, #FFFFFF);\n  --border: 1px solid var(--light, #FFFFFF);\n  --border-initial: 1px solid var(--avatar-border-color, #f1f1f1);\n  --image-shadow: unset; }\n\n:host .avatar {\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  position: relative;\n  -webkit-transform: var(--transform-avatar);\n  transform: var(--transform-avatar); }\n  :host .avatar .top-right,\n  :host .avatar .top-left,\n  :host .avatar .bottom-right,\n  :host .avatar .bottom-left {\n    width: auto;\n    height: auto;\n    font-size: 0.5rem; }\n  :host .avatar .top-right {\n    top: 0rem;\n    right: 0rem; }\n  :host .avatar .top-left {\n    top: 0rem;\n    left: 0rem; }\n  :host .avatar .bottom-right {\n    bottom: 0rem;\n    right: 0rem; }\n  :host .avatar .bottom-left {\n    bottom: 0rem;\n    left: 0rem; }\n  :host .avatar .top-right,\n  :host .avatar .top-left,\n  :host .avatar .bottom-left,\n  :host .avatar .bottom-right {\n    position: absolute;\n    padding: 0.2em 0.45em;\n    border: 1px solid var(--dark-10, #e6eaf0);\n    border-radius: 50%;\n    background-color: var(--light, #FFFFFF);\n    z-index: 1; }\n  :host .avatar .pending {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 1; }\n  :host .avatar .user-initial {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n    color: var(--always-black, #000000);\n    font-weight: 400;\n    text-transform: uppercase;\n    white-space: nowrap; }\n  :host .avatar .image {\n    width: 2.5rem;\n    height: 2.5rem;\n    border: var(--border-initial);\n    border-radius: var(--border-radius-image);\n    background-color: white;\n    background-size: var(--background-size-image);\n    color: var(--light, #FFFFFF);\n    -webkit-box-shadow: var(--image-shadow);\n    box-shadow: var(--image-shadow); }\n    :host .avatar .image.icon-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      border: 1px solid var(--avatar-border-color, #f1f1f1) !important; }\n  :host .avatar .stable-border {\n    border: var(--border-initial); }\n  :host .avatar .regular-color {\n    border: 1px solid var(--avatar-border-color, #f1f1f1);\n    background-color: var(--light, #FFFFFF);\n    color: var(--success, #04CC99); }\n  :host .avatar .reversed-color {\n    border: 1px solid var(--light, #FFFFFF);\n    background: var(--gradient-success, #04CC99);\n    color: var(--light, #FFFFFF); }\n\n:host.squared .avatar .top-right,\n:host.squared .avatar .top-left,\n:host.squared .avatar .bottom-right,\n:host.squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.5rem; }\n\n:host.squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host.squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host.squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host.squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host.squared .avatar .image {\n  border-radius: 10%; }\n\n:host(.avatar-image) {\n  margin-top: 0.08rem; }\n\n:host(.xsmall) .avatar .top-right,\n:host(.xsmall) .avatar .top-left,\n:host(.xsmall) .avatar .bottom-right,\n:host(.xsmall) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.1875rem; }\n\n:host(.xsmall) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.xsmall) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.xsmall) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.xsmall) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.xsmall) .avatar .image {\n  width: 1.375rem;\n  height: 1.375rem; }\n\n:host(.xsmall) .avatar .user-initial,\n:host(.xsmall) .avatar .image.icon-container {\n  font-size: 0.6rem; }\n\n:host(.xsmall).squared .avatar .top-right,\n:host(.xsmall).squared .avatar .top-left,\n:host(.xsmall).squared .avatar .bottom-right,\n:host(.xsmall).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.1875rem; }\n\n:host(.xsmall).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.xsmall).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.xsmall).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.xsmall).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.xsmall) .counter {\n  font-size: 0.65rem !important;\n  font-weight: 400; }\n\n:host(.xsmall) .avatar.initial {\n  border-radius: 50%; }\n\n:host(.msmall) .avatar .top-right,\n:host(.msmall) .avatar .top-left,\n:host(.msmall) .avatar .bottom-right,\n:host(.msmall) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.1875rem; }\n\n:host(.msmall) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.msmall) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.msmall) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.msmall) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.msmall) .avatar .image {\n  width: 1.5625rem;\n  height: 1.5625rem; }\n\n:host(.msmall) .avatar .user-initial,\n:host(.msmall) .avatar .image.icon-container {\n  font-size: 0.6rem; }\n\n:host(.msmall).squared .avatar .top-right,\n:host(.msmall).squared .avatar .top-left,\n:host(.msmall).squared .avatar .bottom-right,\n:host(.msmall).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.1875rem; }\n\n:host(.msmall).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.msmall).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.msmall).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.msmall).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.small) .avatar .top-right,\n:host(.small) .avatar .top-left,\n:host(.small) .avatar .bottom-right,\n:host(.small) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.3125rem; }\n\n:host(.small) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.small) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.small) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.small) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.small) .avatar .image {\n  width: 2.25rem;\n  height: 2.25rem; }\n\n:host(.small) .avatar .user-initial,\n:host(.small) .avatar .image.icon-container {\n  font-size: 1rem; }\n\n:host(.small).squared .avatar .top-right,\n:host(.small).squared .avatar .top-left,\n:host(.small).squared .avatar .bottom-right,\n:host(.small).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.3125rem; }\n\n:host(.small).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.small).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.small).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.small).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.list-small) .avatar .top-right,\n:host(.list-small) .avatar .top-left,\n:host(.list-small) .avatar .bottom-right,\n:host(.list-small) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.5rem; }\n\n:host(.list-small) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.list-small) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.list-small) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.list-small) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.list-small) .avatar .image {\n  width: 1.875rem;\n  height: 1.875rem; }\n\n:host(.list-small) .avatar .user-initial,\n:host(.list-small) .avatar .image.icon-container {\n  font-size: 0.8rem; }\n\n:host(.list-small).squared .avatar .top-right,\n:host(.list-small).squared .avatar .top-left,\n:host(.list-small).squared .avatar .bottom-right,\n:host(.list-small).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.5rem; }\n\n:host(.list-small).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.list-small).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.list-small).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.list-small).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.list-small) .avatar .image.icon-container {\n  color: var(--black, #000000) !important;\n  font-size: 1.2rem !important; }\n\n:host(.xmedium) .avatar .top-right,\n:host(.xmedium) .avatar .top-left,\n:host(.xmedium) .avatar .bottom-right,\n:host(.xmedium) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.5rem; }\n\n:host(.xmedium) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.xmedium) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.xmedium) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.xmedium) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.xmedium) .avatar .image {\n  width: 2.8125rem;\n  height: 2.8125rem; }\n\n:host(.xmedium) .avatar .user-initial,\n:host(.xmedium) .avatar .image.icon-container {\n  font-size: 1.375rem; }\n\n:host(.xmedium).squared .avatar .top-right,\n:host(.xmedium).squared .avatar .top-left,\n:host(.xmedium).squared .avatar .bottom-right,\n:host(.xmedium).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.5rem; }\n\n:host(.xmedium).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.xmedium).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.xmedium).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.xmedium).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.medium) .avatar .top-right,\n:host(.medium) .avatar .top-left,\n:host(.medium) .avatar .bottom-right,\n:host(.medium) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.5rem; }\n\n:host(.medium) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.medium) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.medium) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.medium) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.medium) .avatar .image {\n  width: 3.125rem;\n  height: 3.125rem; }\n\n:host(.medium) .avatar .user-initial,\n:host(.medium) .avatar .image.icon-container {\n  font-size: 1.375rem; }\n\n:host(.medium).squared .avatar .top-right,\n:host(.medium).squared .avatar .top-left,\n:host(.medium).squared .avatar .bottom-right,\n:host(.medium).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.5rem; }\n\n:host(.medium).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.medium).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.medium).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.medium).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.large) .avatar .top-right,\n:host(.large) .avatar .top-left,\n:host(.large) .avatar .bottom-right,\n:host(.large) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.64rem; }\n\n:host(.large) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.large) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.large) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.large) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.large) .avatar .image {\n  width: 4.375rem;\n  height: 4.375rem; }\n\n:host(.large) .avatar .user-initial,\n:host(.large) .avatar .image.icon-container {\n  font-size: 2rem; }\n\n:host(.large).squared .avatar .top-right,\n:host(.large).squared .avatar .top-left,\n:host(.large).squared .avatar .bottom-right,\n:host(.large).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.64rem; }\n\n:host(.large).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.large).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.large).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.large).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.llarge) .avatar .top-right,\n:host(.llarge) .avatar .top-left,\n:host(.llarge) .avatar .bottom-right,\n:host(.llarge) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.64rem; }\n\n:host(.llarge) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.llarge) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.llarge) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.llarge) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.llarge) .avatar .image {\n  width: 6.125rem;\n  height: 6.125rem; }\n\n:host(.llarge) .avatar .user-initial,\n:host(.llarge) .avatar .image.icon-container {\n  font-size: 2rem; }\n\n:host(.llarge).squared .avatar .top-right,\n:host(.llarge).squared .avatar .top-left,\n:host(.llarge).squared .avatar .bottom-right,\n:host(.llarge).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: 0.64rem; }\n\n:host(.llarge).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.llarge).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.llarge).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.llarge).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.xlarge) .avatar .top-right,\n:host(.xlarge) .avatar .top-left,\n:host(.xlarge) .avatar .bottom-right,\n:host(.xlarge) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: var(--font-m, 15px); }\n\n:host(.xlarge) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.xlarge) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.xlarge) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.xlarge) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.xlarge) .avatar .image {\n  width: 5.325rem;\n  height: 5.325rem; }\n\n:host(.xlarge) .avatar .user-initial,\n:host(.xlarge) .avatar .image.icon-container {\n  font-size: 3rem; }\n\n:host(.xlarge).squared .avatar .top-right,\n:host(.xlarge).squared .avatar .top-left,\n:host(.xlarge).squared .avatar .bottom-right,\n:host(.xlarge).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: var(--font-m, 15px); }\n\n:host(.xlarge).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.xlarge).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.xlarge).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.xlarge).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.xxlarge) .avatar .top-right,\n:host(.xxlarge) .avatar .top-left,\n:host(.xxlarge) .avatar .bottom-right,\n:host(.xxlarge) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: var(--font-m, 15px); }\n\n:host(.xxlarge) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.xxlarge) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.xxlarge) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.xxlarge) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.xxlarge) .avatar .image {\n  width: 7.625rem;\n  height: 7.625rem; }\n\n:host(.xxlarge) .avatar .user-initial,\n:host(.xxlarge) .avatar .image.icon-container {\n  font-size: 3rem; }\n\n:host(.xxlarge).squared .avatar .top-right,\n:host(.xxlarge).squared .avatar .top-left,\n:host(.xxlarge).squared .avatar .bottom-right,\n:host(.xxlarge).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: var(--font-m, 15px); }\n\n:host(.xxlarge).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.xxlarge).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.xxlarge).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.xxlarge).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.history) {\n  background-color: transparent !important; }\n  :host(.history) .avatar .top-right,\n  :host(.history) .avatar .top-left,\n  :host(.history) .avatar .bottom-right,\n  :host(.history) .avatar .bottom-left {\n    width: auto;\n    height: auto;\n    font-size: var(--font-m, 15px); }\n  :host(.history) .avatar .top-right {\n    top: 0%;\n    right: 0%; }\n  :host(.history) .avatar .top-left {\n    top: 0%;\n    left: 0%; }\n  :host(.history) .avatar .bottom-right {\n    bottom: 0%;\n    right: 0%; }\n  :host(.history) .avatar .bottom-left {\n    bottom: 0%;\n    left: 0%; }\n  :host(.history) .avatar .image {\n    width: var(--font-m, 15px);\n    height: var(--font-m, 15px); }\n  :host(.history) .avatar .user-initial,\n  :host(.history) .avatar .image.icon-container {\n    font-size: var(--font-m, 15px); }\n  :host(.history).squared .avatar .top-right,\n  :host(.history).squared .avatar .top-left,\n  :host(.history).squared .avatar .bottom-right,\n  :host(.history).squared .avatar .bottom-left {\n    width: auto;\n    height: auto;\n    font-size: var(--font-m, 15px); }\n  :host(.history).squared .avatar .top-right {\n    top: 0%;\n    right: 0%; }\n  :host(.history).squared .avatar .top-left {\n    top: 0%;\n    left: 0%; }\n  :host(.history).squared .avatar .bottom-right {\n    bottom: 0%;\n    right: 0%; }\n  :host(.history).squared .avatar .bottom-left {\n    bottom: 0%;\n    left: 0%; }\n  :host(.history) .avatar .user-initial {\n    font-size: var(--icon-s, 8px); }\n\n:host(.list-xlarge) .avatar .top-right,\n:host(.list-xlarge) .avatar .top-left,\n:host(.list-xlarge) .avatar .bottom-right,\n:host(.list-xlarge) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: var(--font-m, 15px); }\n\n:host(.list-xlarge) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.list-xlarge) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.list-xlarge) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.list-xlarge) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.list-xlarge) .avatar .image {\n  width: 5.325rem;\n  height: 5.325rem; }\n\n:host(.list-xlarge) .avatar .user-initial,\n:host(.list-xlarge) .avatar .image.icon-container {\n  font-size: 2rem; }\n\n:host(.list-xlarge).squared .avatar .top-right,\n:host(.list-xlarge).squared .avatar .top-left,\n:host(.list-xlarge).squared .avatar .bottom-right,\n:host(.list-xlarge).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: var(--font-m, 15px); }\n\n:host(.list-xlarge).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.list-xlarge).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.list-xlarge).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.list-xlarge).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.list-xlarge) .avatar .image {\n  border-radius: var(--button-border-radius, 5px); }\n  :host(.list-xlarge) .avatar .image.icon-container {\n    color: var(--text-color, #807f83); }\n\n:host(.list-xmedium) .avatar .top-right,\n:host(.list-xmedium) .avatar .top-left,\n:host(.list-xmedium) .avatar .bottom-right,\n:host(.list-xmedium) .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: var(--font-m, 15px); }\n\n:host(.list-xmedium) .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.list-xmedium) .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.list-xmedium) .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.list-xmedium) .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.list-xmedium) .avatar .image {\n  width: 2.8125rem;\n  height: 2.8125rem; }\n\n:host(.list-xmedium) .avatar .user-initial,\n:host(.list-xmedium) .avatar .image.icon-container {\n  font-size: 2rem; }\n\n:host(.list-xmedium).squared .avatar .top-right,\n:host(.list-xmedium).squared .avatar .top-left,\n:host(.list-xmedium).squared .avatar .bottom-right,\n:host(.list-xmedium).squared .avatar .bottom-left {\n  width: auto;\n  height: auto;\n  font-size: var(--font-m, 15px); }\n\n:host(.list-xmedium).squared .avatar .top-right {\n  top: -4%;\n  right: -4%; }\n\n:host(.list-xmedium).squared .avatar .top-left {\n  top: -4%;\n  left: -4%; }\n\n:host(.list-xmedium).squared .avatar .bottom-right {\n  bottom: -4%;\n  right: -4%; }\n\n:host(.list-xmedium).squared .avatar .bottom-left {\n  bottom: -4%;\n  left: -4%; }\n\n:host(.list-xmedium) .avatar .image {\n  border-radius: var(--button-border-radius, 5px); }\n  :host(.list-xmedium) .avatar .image.icon-container {\n    color: var(--text-color, #807f83); }\n\n:host(.profile) .avatar .image {\n  width: 1.5625rem;\n  height: 1.5625rem; }\n\n:host(.profile) .avatar .user-initial {\n  font-size: var(--font-s, 13px); }\n\n:host(.large-border) .avatar span:not(.user-initial) {\n  border: 2px solid var(--light, #FFFFFF) !important; }\n\n:host(.entity-display) {\n  display: -ms-flexbox;\n  display: flex;\n  margin-left: -1rem; }\n  :host(.entity-display) .avatar {\n    -webkit-transform: translate(1.25rem, 0);\n    transform: translate(1.25rem, 0); }\n    :host(.entity-display) .avatar.initial {\n      border: 1px solid var(--light, #FFFFFF);\n      border-radius: 50%; }\n\n:host(.counter) .avatar .image {\n  color: var(--always-light, #FFFFFF) !important; }\n\n:host(.web-menu) .avatar {\n  display: block;\n  -webkit-transform: none;\n  transform: none; }\n\n:host(.accent) .avatar .image {\n  color: var(--light, #FFFFFF); }\n\n:host(.accent) .avatar .top-right {\n  background: var(--accent, #1FB6FF);\n  color: var(--light, #FFFFFF); }\n\n:host(.accent) .avatar .top-left {\n  background: var(--accent, #1FB6FF);\n  color: var(--light, #FFFFFF); }\n\n:host(.accent) .avatar .bottom-right {\n  background: var(--accent, #1FB6FF);\n  color: var(--light, #FFFFFF); }\n\n:host(.accent) .avatar .bottom-left {\n  background: var(--accent, #1FB6FF);\n  color: var(--light, #FFFFFF); }\n\n:host(.accent) .avatar .user-initial,\n:host(.accent) .avatar .image.icon-container {\n  color: var(--accent, #1FB6FF); }\n\n:host(.dark) .avatar .image {\n  color: var(--light, #FFFFFF); }\n\n:host(.dark) .avatar .top-right {\n  background: var(--dark-40, #9cabc4);\n  color: var(--light, #FFFFFF); }\n\n:host(.dark) .avatar .top-left {\n  background: var(--dark-40, #9cabc4);\n  color: var(--light, #FFFFFF); }\n\n:host(.dark) .avatar .bottom-right {\n  background: var(--dark-40, #9cabc4);\n  color: var(--light, #FFFFFF); }\n\n:host(.dark) .avatar .bottom-left {\n  background: var(--dark-40, #9cabc4);\n  color: var(--light, #FFFFFF); }\n\n:host(.dark) .avatar .user-initial,\n:host(.dark) .avatar .image.icon-container {\n  color: var(--dark-40, #9cabc4); }\n\n:host(.success) .avatar .image {\n  color: var(--light, #FFFFFF); }\n\n:host(.success) .avatar .top-right {\n  background: var(--success, #04CC99);\n  color: var(--light, #FFFFFF); }\n\n:host(.success) .avatar .top-left {\n  background: var(--success, #04CC99);\n  color: var(--light, #FFFFFF); }\n\n:host(.success) .avatar .bottom-right {\n  background: var(--success, #04CC99);\n  color: var(--light, #FFFFFF); }\n\n:host(.success) .avatar .bottom-left {\n  background: var(--success, #04CC99);\n  color: var(--light, #FFFFFF); }\n\n:host(.success) .avatar .user-initial,\n:host(.success) .avatar .image.icon-container {\n  color: var(--success, #04CC99); }\n\n:host(.danger) .avatar .image {\n  color: var(--light, #FFFFFF); }\n\n:host(.danger) .avatar .top-right {\n  background: var(--danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n:host(.danger) .avatar .top-left {\n  background: var(--danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n:host(.danger) .avatar .bottom-right {\n  background: var(--danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n:host(.danger) .avatar .bottom-left {\n  background: var(--danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n:host(.danger) .avatar .user-initial,\n:host(.danger) .avatar .image.icon-container {\n  color: var(--danger, #ff625f); }\n\n:host(.warning) .avatar .image {\n  color: var(--light, #FFFFFF); }\n\n:host(.warning) .avatar .top-right {\n  background: var(--warning, #ff6402);\n  color: var(--light, #FFFFFF); }\n\n:host(.warning) .avatar .top-left {\n  background: var(--warning, #ff6402);\n  color: var(--light, #FFFFFF); }\n\n:host(.warning) .avatar .bottom-right {\n  background: var(--warning, #ff6402);\n  color: var(--light, #FFFFFF); }\n\n:host(.warning) .avatar .bottom-left {\n  background: var(--warning, #ff6402);\n  color: var(--light, #FFFFFF); }\n\n:host(.warning) .avatar .user-initial,\n:host(.warning) .avatar .image.icon-container {\n  color: var(--warning, #ff6402); }\n\n:host(.info) .avatar .image {\n  color: var(--light, #FFFFFF); }\n\n:host(.info) .avatar .top-right {\n  background: var(--info, #fc459e);\n  color: var(--light, #FFFFFF); }\n\n:host(.info) .avatar .top-left {\n  background: var(--info, #fc459e);\n  color: var(--light, #FFFFFF); }\n\n:host(.info) .avatar .bottom-right {\n  background: var(--info, #fc459e);\n  color: var(--light, #FFFFFF); }\n\n:host(.info) .avatar .bottom-left {\n  background: var(--info, #fc459e);\n  color: var(--light, #FFFFFF); }\n\n:host(.info) .avatar .user-initial,\n:host(.info) .avatar .image.icon-container {\n  color: var(--info, #fc459e); }\n\n:host(.gradient-danger) .avatar .image {\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-danger) .avatar .top-right {\n  background: var(--gradient-danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-danger) .avatar .top-left {\n  background: var(--gradient-danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-danger) .avatar .bottom-right {\n  background: var(--gradient-danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-danger) .avatar .bottom-left {\n  background: var(--gradient-danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-danger) .avatar .user-initial,\n:host(.gradient-danger) .avatar .image.icon-container {\n  color: var(--gradient-danger, #ff625f); }\n\n:host(.gradient-success) .avatar .image {\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-success) .avatar .top-right {\n  background: var(--gradient-success, #04CC99);\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-success) .avatar .top-left {\n  background: var(--gradient-success, #04CC99);\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-success) .avatar .bottom-right {\n  background: var(--gradient-success, #04CC99);\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-success) .avatar .bottom-left {\n  background: var(--gradient-success, #04CC99);\n  color: var(--light, #FFFFFF); }\n\n:host(.gradient-success) .avatar .user-initial,\n:host(.gradient-success) .avatar .image.icon-container {\n  color: var(--gradient-success, #04CC99); }"; }
}

export { YooAvatarComponent as YooAvatar };

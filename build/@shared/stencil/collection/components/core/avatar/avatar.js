import { cloudinary, execHandlerAndStopEvent, pipes } from '../../../utils';
export class YooAvatarComponent {
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
    static get style() { return "/**style-placeholder:yoo-avatar:**/"; }
}

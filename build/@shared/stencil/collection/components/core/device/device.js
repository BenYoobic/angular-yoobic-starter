export class YooDeviceComponent {
    componentWilLoad() {
        if (!this.deviceEntry.selectedColor && this.deviceEntry.colors.length > 0) {
            this.deviceEntry.selectedColor = this.deviceEntry.colors[0];
        }
    }
    getColor() {
        return this.deviceEntry.selectedColor ? this.deviceEntry.selectedColor.colorName :
            this.deviceEntry.colors && this.deviceEntry.colors.length > 0 ? this.deviceEntry.colors[0].colorName : '';
    }
    renderIOS() {
        return (this.deviceEntry.device === 'iphone-x' ?
            this.renderIphoneX() : this.renderIOSMobile());
    }
    renderIOSMobile() {
        return [
            h("div", { class: "top-bar" }),
            h("div", { class: "sleep" }),
            h("div", { class: "volume" }),
            h("div", { class: "camera" }),
            h("div", { class: "sensor" }),
            h("div", { class: "speaker" }),
            h("div", { class: "screen" },
                ",",
                h("slot", null)),
            h("div", { class: "home" }),
            h("div", { class: "bottom-bar" })
        ];
    }
    renderIphoneX() {
        return [
            h("div", { class: "notch" },
                h("div", { class: "camera" }),
                h("div", { class: "speaker" })),
            h("div", { class: "top-bar" }),
            h("div", { class: "sleep" }),
            h("div", { class: "bottom-bar" }),
            h("div", { class: "volume" }),
            h("div", { class: "overflow" },
                ",",
                h("div", { class: "shadow shadow--tr" }),
                h("div", { class: "shadow shadow--tl" }),
                h("div", { class: "shadow shadow--br" }),
                h("div", { class: "shadow shadow--bl" })),
            h("div", { class: "inner-shadow" }),
            h("div", { class: "screen" },
                h("slot", null))
        ];
    }
    renderNote8TopBar() {
        return [
            h("div", { class: "inner" }),
            h("div", { class: "overflow" },
                h("div", { class: "shadow" })),
            h("div", { class: "speaker" }),
            h("div", { class: "sensors" }),
            h("div", { class: "more-sensors" })
        ];
    }
    renderSensorSpeaker() {
        return [
            h("div", { class: "sensor" }),
            h("div", { class: "speaker" })
        ];
    }
    renderAndroid() {
        return [
            this.deviceEntry.device === 'note8' ? this.renderNote8TopBar() : h("div", { class: "top-bar" }),
            this.deviceEntry.device !== 'htc-one' && h("div", { class: "sleep" }),
            this.deviceEntry.device !== 'htc-one' && this.deviceEntry.device !== 's5' && h("div", { class: "volume" }),
            h("div", { class: "camera" }),
            this.deviceEntry.device === 'htc-one' || this.deviceEntry.device === 's5' && this.renderSensorSpeaker(),
            h("div", { class: "screen" },
                h("slot", null))
        ];
    }
    render() {
        return [
            h("div", { class: {
                    'marvel-device': true,
                    [this.deviceEntry.device]: true,
                    [this.getColor()]: true
                } }, this.deviceEntry.isIOSMobile ? this.renderIOS() : this.renderAndroid())
        ];
    }
    static get is() { return "yoo-device"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "deviceEntry": {
            "type": "Any",
            "attr": "device-entry"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-device:**/"; }
}

import { WHITE, BLACK, WHITE_DEVICE } from '../../../index';
export class YooColorSelectorComponent {
    constructor() {
        /**
         * Determines whether we should show a tick icon or not when the color is selected; if false, the colors will be animated
         */
        this.showTickIcon = true;
    }
    componentWillLoad() {
        this.currentColor = this.colors[0];
    }
    onColorSelected(color) {
        this.currentColor = color;
        this.colorChanged.emit(color);
    }
    getStyleColorWhenWhite(color) {
        return color === WHITE || color === WHITE_DEVICE.hexCode ? BLACK : WHITE;
    }
    hostData() {
        return {
            class: {
                'no-tick': !this.showTickIcon
            }
        };
    }
    render() {
        return (h("div", { class: "color-selector-container" }, this.colors.map((color) => [
            h("div", { class: 'color-container', onClick: () => this.onColorSelected(color) },
                h("div", { class: {
                        'color-icon': true,
                        'current': this.currentColor === color
                    }, style: { 'background': color, 'border-color': (this.getStyleColorWhenWhite(color)) } }, this.showTickIcon && this.currentColor === color && h("yoo-icon", { class: "yo-thick", style: { 'color': this.getStyleColorWhenWhite(color) } })))
        ])));
    }
    static get is() { return "yoo-color-selector"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "colors": {
            "type": "Any",
            "attr": "colors"
        },
        "currentColor": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "showTickIcon": {
            "type": Boolean,
            "attr": "show-tick-icon"
        }
    }; }
    static get events() { return [{
            "name": "colorChanged",
            "method": "colorChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-color-selector:**/"; }
}

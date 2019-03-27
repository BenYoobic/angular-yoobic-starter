const h = window.DesignSystem.h;

import { c as cordova, i as cordovaPropertyGet, j as cordovaPropertySet, d as IonicNativePlugin, Z as loadTranslations, k as isCordova, v as isAndroid } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { a as imageCacheInit } from './chunk-262e5ad4.js';
import { a as StatusBar } from './chunk-ed57ca2e.js';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ScreenOrientationOriginal = /** @class */ (function (_super) {
    __extends(ScreenOrientationOriginal, _super);
    function ScreenOrientationOriginal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Convenience enum for possible orientations
         */
        _this.ORIENTATIONS = {
            PORTRAIT_PRIMARY: 'portrait-primary',
            PORTRAIT_SECONDARY: 'portrait-secondary',
            LANDSCAPE_PRIMARY: 'landscape-primary',
            LANDSCAPE_SECONDARY: 'landscape-secondary',
            PORTRAIT: 'portrait',
            LANDSCAPE: 'landscape',
            ANY: 'any'
        };
        return _this;
    }
    ScreenOrientationOriginal.prototype.onChange = function () { return cordova(this, "onChange", { "eventObservable": true, "event": "orientationchange" }, arguments); };
    ScreenOrientationOriginal.prototype.lock = function (orientation) { return cordova(this, "lock", { "otherPromise": true }, arguments); };
    ScreenOrientationOriginal.prototype.unlock = function () { return cordova(this, "unlock", { "sync": true }, arguments); };
    Object.defineProperty(ScreenOrientationOriginal.prototype, "type", {
        get: function () { return cordovaPropertyGet(this, "type"); },
        set: function (value) { cordovaPropertySet(this, "type", value); },
        enumerable: true,
        configurable: true
    });
    ScreenOrientationOriginal.pluginName = "ScreenOrientation";
    ScreenOrientationOriginal.plugin = "cordova-plugin-screen-orientation";
    ScreenOrientationOriginal.pluginRef = "screen.orientation";
    ScreenOrientationOriginal.repo = "https://github.com/apache/cordova-plugin-screen-orientation";
    ScreenOrientationOriginal.platforms = ["Android", "iOS", "Windows"];
    return ScreenOrientationOriginal;
}(IonicNativePlugin));
var ScreenOrientation = new ScreenOrientationOriginal();

class YooAppComponent {
    constructor() {
        imageCacheInit();
    }
    onDarkThemeChanged() {
        this.darkThemeChanged.emit(this.isDarkTheme);
    }
    //@Watch('language')
    onLanguageChange() {
        if (this.language) {
            return fetch('./assets/i18n/' + this.language + '.json')
                .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }
                return response.json();
            })
                .then(json => {
                //console.log(json);
                loadTranslations(json);
                this.host.forceUpdate();
            });
        }
    }
    componentWillLoad() {
        // window.oncontextmenu = function (event) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     return false;
        // };
        this.backbuttonListener = (e) => {
            e.preventDefault();
        };
        document.addEventListener('backbutton', this.backbuttonListener, false);
        if (this.language) {
            this.onLanguageChange();
        }
    }
    componentDidLoad() {
        if (isCordova()) {
            let orientation = isAndroid() ? 'portrait-primary' : 'portrait';
            ScreenOrientation.lock(orientation);
            if (isAndroid()) {
                StatusBar.styleLightContent();
            }
        }
    }
    componentDidUnload() {
        document.removeEventListener('backbutton', this.backbuttonListener, false);
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "yoo-app"; }
    static get properties() { return {
        "getSession": {
            "type": "Any",
            "attr": "get-session"
        },
        "host": {
            "elementRef": true
        },
        "isDarkTheme": {
            "type": Boolean,
            "attr": "is-dark-theme",
            "watchCallbacks": ["onDarkThemeChanged"]
        },
        "isOffline": {
            "type": Boolean,
            "attr": "is-offline"
        },
        "language": {
            "type": String,
            "attr": "language"
        }
    }; }
    static get events() { return [{
            "name": "darkThemeChanged",
            "method": "darkThemeChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

export { YooAppComponent as YooApp };

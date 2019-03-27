const h = window.DesignSystem.h;

import { c as cordova, i as cordovaPropertyGet, j as cordovaPropertySet, d as IonicNativePlugin } from './chunk-30364fba.js';

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
var StatusBarOriginal = /** @class */ (function (_super) {
    __extends(StatusBarOriginal, _super);
    function StatusBarOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusBarOriginal.prototype.overlaysWebView = function (doesOverlay) { return cordova(this, "overlaysWebView", { "sync": true }, arguments); };
    StatusBarOriginal.prototype.styleDefault = function () { return cordova(this, "styleDefault", { "sync": true }, arguments); };
    StatusBarOriginal.prototype.styleLightContent = function () { return cordova(this, "styleLightContent", { "sync": true }, arguments); };
    StatusBarOriginal.prototype.styleBlackTranslucent = function () { return cordova(this, "styleBlackTranslucent", { "sync": true }, arguments); };
    StatusBarOriginal.prototype.styleBlackOpaque = function () { return cordova(this, "styleBlackOpaque", { "sync": true }, arguments); };
    StatusBarOriginal.prototype.backgroundColorByName = function (colorName) { return cordova(this, "backgroundColorByName", { "sync": true }, arguments); };
    StatusBarOriginal.prototype.backgroundColorByHexString = function (hexString) { return cordova(this, "backgroundColorByHexString", { "sync": true }, arguments); };
    StatusBarOriginal.prototype.hide = function () { return cordova(this, "hide", { "sync": true }, arguments); };
    StatusBarOriginal.prototype.show = function () { return cordova(this, "show", { "sync": true }, arguments); };
    Object.defineProperty(StatusBarOriginal.prototype, "isVisible", {
        get: function () { return cordovaPropertyGet(this, "isVisible"); },
        set: function (value) { cordovaPropertySet(this, "isVisible", value); },
        enumerable: true,
        configurable: true
    });
    StatusBarOriginal.pluginName = "StatusBar";
    StatusBarOriginal.plugin = "cordova-plugin-statusbar";
    StatusBarOriginal.pluginRef = "StatusBar";
    StatusBarOriginal.repo = "https://github.com/apache/cordova-plugin-statusbar";
    StatusBarOriginal.platforms = ["Android", "iOS", "Windows"];
    return StatusBarOriginal;
}(IonicNativePlugin));
var StatusBar = new StatusBarOriginal();

export { StatusBar as a };

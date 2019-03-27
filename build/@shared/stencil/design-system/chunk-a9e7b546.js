const h = window.DesignSystem.h;

import { c as cordova, d as IonicNativePlugin } from './chunk-30364fba.js';

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
var CameraPreviewOriginal = /** @class */ (function (_super) {
    __extends(CameraPreviewOriginal, _super);
    function CameraPreviewOriginal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.FOCUS_MODE = {
            FIXED: 'fixed',
            AUTO: 'auto',
            CONTINUOUS: 'continuous',
            CONTINUOUS_PICTURE: 'continuous-picture',
            CONTINUOUS_VIDEO: 'continuous-video',
            EDOF: 'edof',
            INFINITY: 'infinity',
            MACRO: 'macro' // Android Only
        };
        _this.EXPOSURE_MODE = {
            LOCK: 'lock',
            AUTO: 'auto',
            CONTINUOUS: 'continuous',
            CUSTOM: 'custom'
        };
        _this.FLASH_MODE = {
            OFF: 'off',
            ON: 'on',
            AUTO: 'auto',
            RED_EYE: 'red-eye',
            TORCH: 'torch' // Android Only
        };
        _this.COLOR_EFFECT = {
            AQUA: 'aqua',
            BLACKBOARD: 'blackboard',
            MONO: 'mono',
            NEGATIVE: 'negative',
            NONE: 'none',
            POSTERIZE: 'posterize',
            SEPIA: 'sepia',
            SOLARIZE: 'solarize',
            WHITEBOARD: 'whiteboard' // Android Only
        };
        _this.CAMERA_DIRECTION = {
            BACK: 'back',
            FRONT: 'front'
        };
        return _this;
    }
    CameraPreviewOriginal.prototype.startCamera = function (options) { return cordova(this, "startCamera", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    CameraPreviewOriginal.prototype.stopCamera = function () { return cordova(this, "stopCamera", {}, arguments); };
    CameraPreviewOriginal.prototype.switchCamera = function () { return cordova(this, "switchCamera", {}, arguments); };
    CameraPreviewOriginal.prototype.hide = function () { return cordova(this, "hide", {}, arguments); };
    CameraPreviewOriginal.prototype.show = function () { return cordova(this, "show", {}, arguments); };
    CameraPreviewOriginal.prototype.takePicture = function (options) { return cordova(this, "takePicture", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    CameraPreviewOriginal.prototype.setColorEffect = function (effect) { return cordova(this, "setColorEffect", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    CameraPreviewOriginal.prototype.setZoom = function (zoom) { return cordova(this, "setZoom", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    CameraPreviewOriginal.prototype.getMaxZoom = function () { return cordova(this, "getMaxZoom", {}, arguments); };
    CameraPreviewOriginal.prototype.getZoom = function () { return cordova(this, "getZoom", {}, arguments); };
    CameraPreviewOriginal.prototype.setPreviewSize = function (dimensions) { return cordova(this, "setPreviewSize", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    CameraPreviewOriginal.prototype.getFocusMode = function () { return cordova(this, "getFocusMode", {}, arguments); };
    CameraPreviewOriginal.prototype.setFocusMode = function (focusMode) { return cordova(this, "setFocusMode", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    CameraPreviewOriginal.prototype.getSupportedFocusModes = function () { return cordova(this, "getSupportedFocusModes", {}, arguments); };
    CameraPreviewOriginal.prototype.getFlashMode = function () { return cordova(this, "getFlashMode", {}, arguments); };
    CameraPreviewOriginal.prototype.setFlashMode = function (flashMode) { return cordova(this, "setFlashMode", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    CameraPreviewOriginal.prototype.getSupportedFlashModes = function () { return cordova(this, "getSupportedFlashModes", {}, arguments); };
    CameraPreviewOriginal.prototype.getSupportedPictureSizes = function () { return cordova(this, "getSupportedPictureSizes", {}, arguments); };
    CameraPreviewOriginal.prototype.getExposureMode = function () { return cordova(this, "getExposureMode", {}, arguments); };
    CameraPreviewOriginal.prototype.getExposureModes = function () { return cordova(this, "getExposureModes", {}, arguments); };
    CameraPreviewOriginal.prototype.setExposureMode = function (lock) { return cordova(this, "setExposureMode", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    CameraPreviewOriginal.prototype.getExposureCompensation = function () { return cordova(this, "getExposureCompensation", {}, arguments); };
    CameraPreviewOriginal.prototype.setExposureCompensation = function (exposureCompensation) { return cordova(this, "setExposureCompensation", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    CameraPreviewOriginal.prototype.getExposureCompensationRange = function () { return cordova(this, "getExposureCompensationRange", {}, arguments); };
    CameraPreviewOriginal.prototype.tapToFocus = function (xPoint, yPoint) { return cordova(this, "tapToFocus", {}, arguments); };
    CameraPreviewOriginal.prototype.onBackButton = function () { return cordova(this, "onBackButton", {}, arguments); };
    CameraPreviewOriginal.pluginName = "CameraPreview";
    CameraPreviewOriginal.plugin = "cordova-plugin-camera-preview";
    CameraPreviewOriginal.pluginRef = "CameraPreview";
    CameraPreviewOriginal.repo = "https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview";
    CameraPreviewOriginal.platforms = ["Android", "iOS"];
    return CameraPreviewOriginal;
}(IonicNativePlugin));
var CameraPreview = new CameraPreviewOriginal();

export { CameraPreview as a };

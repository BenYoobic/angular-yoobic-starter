import { h } from '../design-system.core.js';

import { c as cordova, i as cordovaPropertyGet, j as cordovaPropertySet, d as IonicNativePlugin, dh as isZebraScanner } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

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
var WebIntentOriginal = /** @class */ (function (_super) {
    __extends(WebIntentOriginal, _super);
    function WebIntentOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebIntentOriginal.prototype.startActivity = function (options) { return cordova(this, "startActivity", {}, arguments); };
    WebIntentOriginal.prototype.startActivityForResult = function (options) { return cordova(this, "startActivityForResult", {}, arguments); };
    WebIntentOriginal.prototype.hasExtra = function (extra) { return cordova(this, "hasExtra", {}, arguments); };
    WebIntentOriginal.prototype.getExtra = function (extra) { return cordova(this, "getExtra", {}, arguments); };
    WebIntentOriginal.prototype.getUri = function () { return cordova(this, "getUri", {}, arguments); };
    WebIntentOriginal.prototype.onIntent = function () { return cordova(this, "onIntent", { "observable": true }, arguments); };
    WebIntentOriginal.prototype.sendBroadcast = function (options) { return cordova(this, "sendBroadcast", {}, arguments); };
    WebIntentOriginal.prototype.startService = function (options) { return cordova(this, "startService", {}, arguments); };
    WebIntentOriginal.prototype.registerBroadcastReceiver = function (filters) { return cordova(this, "registerBroadcastReceiver", { "observable": true }, arguments); };
    WebIntentOriginal.prototype.unregisterBroadcastReceiver = function () { return cordova(this, "unregisterBroadcastReceiver", { "sync": true }, arguments); };
    WebIntentOriginal.prototype.onActivityResult = function () { return cordova(this, "onActivityResult", { "sync": true }, arguments); };
    WebIntentOriginal.prototype.getIntent = function () { return cordova(this, "getIntent", {}, arguments); };
    WebIntentOriginal.prototype.sendResult = function (_a) {
        var _b = _a.extras;
        return cordova(this, "sendResult", {}, arguments);
    };
    Object.defineProperty(WebIntentOriginal.prototype, "ACTION_SEND", {
        get: function () { return cordovaPropertyGet(this, "ACTION_SEND"); },
        set: function (value) { cordovaPropertySet(this, "ACTION_SEND", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "ACTION_VIEW", {
        get: function () { return cordovaPropertyGet(this, "ACTION_VIEW"); },
        set: function (value) { cordovaPropertySet(this, "ACTION_VIEW", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "EXTRA_TEXT", {
        get: function () { return cordovaPropertyGet(this, "EXTRA_TEXT"); },
        set: function (value) { cordovaPropertySet(this, "EXTRA_TEXT", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "EXTRA_SUBJECT", {
        get: function () { return cordovaPropertyGet(this, "EXTRA_SUBJECT"); },
        set: function (value) { cordovaPropertySet(this, "EXTRA_SUBJECT", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "EXTRA_STREAM", {
        get: function () { return cordovaPropertyGet(this, "EXTRA_STREAM"); },
        set: function (value) { cordovaPropertySet(this, "EXTRA_STREAM", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "EXTRA_EMAIL", {
        get: function () { return cordovaPropertyGet(this, "EXTRA_EMAIL"); },
        set: function (value) { cordovaPropertySet(this, "EXTRA_EMAIL", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "ACTION_CALL", {
        get: function () { return cordovaPropertyGet(this, "ACTION_CALL"); },
        set: function (value) { cordovaPropertySet(this, "ACTION_CALL", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "ACTION_SENDTO", {
        get: function () { return cordovaPropertyGet(this, "ACTION_SENDTO"); },
        set: function (value) { cordovaPropertySet(this, "ACTION_SENDTO", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "ACTION_GET_CONTENT", {
        get: function () { return cordovaPropertyGet(this, "ACTION_GET_CONTENT"); },
        set: function (value) { cordovaPropertySet(this, "ACTION_GET_CONTENT", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "ACTION_PICK", {
        get: function () { return cordovaPropertyGet(this, "ACTION_PICK"); },
        set: function (value) { cordovaPropertySet(this, "ACTION_PICK", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "ACTION_INSTALL_PACKAGE", {
        get: function () { return cordovaPropertyGet(this, "ACTION_INSTALL_PACKAGE"); },
        set: function (value) { cordovaPropertySet(this, "ACTION_INSTALL_PACKAGE", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntentOriginal.prototype, "ACTION_UNINSTALL_PACKAGE", {
        get: function () { return cordovaPropertyGet(this, "ACTION_UNINSTALL_PACKAGE"); },
        set: function (value) { cordovaPropertySet(this, "ACTION_UNINSTALL_PACKAGE", value); },
        enumerable: true,
        configurable: true
    });
    WebIntentOriginal.pluginName = "WebIntent";
    WebIntentOriginal.plugin = "com-darryncampbell-cordova-plugin-intent";
    WebIntentOriginal.pluginRef = "plugins.intentShim";
    WebIntentOriginal.repo = "https://github.com/darryncampbell/darryncampbell-cordova-plugin-intent";
    WebIntentOriginal.platforms = ["Android"];
    return WebIntentOriginal;
}(IonicNativePlugin));
var WebIntent = new WebIntentOriginal();

class YooZebraComponent {
    componentDidLoad() {
        if (isZebraScanner()) {
            this.onInitZebraScanner();
        }
    }
    getAppId() {
        return this.appId;
    }
    onInitZebraScanner() {
        if (WebIntent) {
            WebIntent.registerBroadcastReceiver({
                filterActions: [
                    this.getAppId() + '.ACTION',
                    'com.symbol.datawedge.api.RESULT_ACTION'
                ],
                filterCategories: [
                    'android.intent.category.DEFAULT'
                ]
            }).subscribe((intent) => {
                if (intent && intent.extras['com.motorolasolutions.emdk.datawedge.data_string']) {
                    let result = intent.extras['com.motorolasolutions.emdk.datawedge.data_string'];
                    this.scannedSuccess.emit(result);
                }
            });
            WebIntent.sendBroadcast({
                action: 'com.symbol.datawedge.api.ACTION',
                extras: {
                    'com.symbol.datawedge.api.CREATE_PROFILE': 'OperationsV6'
                }
            });
            let profileConfig = {
                'PROFILE_NAME': 'OperationsV6',
                'PROFILE_ENABLED': 'true',
                'CONFIG_MODE': 'UPDATE',
                'PLUGIN_CONFIG': {
                    'PLUGIN_NAME': 'BARCODE',
                    'RESET_CONFIG': 'true',
                    'PARAM_LIST': {}
                },
                'APP_LIST': [{
                        'PACKAGE_NAME': this.getAppId(),
                        'ACTIVITY_LIST': ['*']
                    }]
            };
            WebIntent.sendBroadcast({
                action: 'com.symbol.datawedge.api.ACTION',
                extras: {
                    'com.symbol.datawedge.api.SET_CONFIG': profileConfig,
                    'SEND_RESULT': this.requestResultCodes
                }
            });
            let profileConfig2 = {
                'PROFILE_NAME': 'OperationsV6',
                'PROFILE_ENABLED': 'true',
                'CONFIG_MODE': 'UPDATE',
                'PLUGIN_CONFIG': {
                    'PLUGIN_NAME': 'INTENT',
                    'RESET_CONFIG': 'true',
                    'PARAM_LIST': {
                        'intent_output_enabled': 'true',
                        'intent_action': this.getAppId() + '.ACTION',
                        'intent_delivery': '2' // Broadcast  
                    }
                }
            };
            WebIntent.sendBroadcast({
                action: 'com.symbol.datawedge.api.ACTION',
                extras: {
                    'com.symbol.datawedge.api.SET_CONFIG': profileConfig2,
                    'SEND_RESULT': this.requestResultCodes
                }
            });
        }
    }
    render() {
        return '';
    }
    static get is() { return "yoo-zebra"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "appId": {
            "type": String,
            "attr": "app-id"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get events() { return [{
            "name": "scannedSuccess",
            "method": "scannedSuccess",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

export { YooZebraComponent as YooZebra };

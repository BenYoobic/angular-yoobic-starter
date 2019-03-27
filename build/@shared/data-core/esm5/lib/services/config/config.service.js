/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LocalStorage, CoreConfig } from '@shared/common';
import { Translate } from '@shared/translate';
var Config = /** @class */ (function () {
    function Config(localStorage, coreConfig, translate) {
        this.localStorage = localStorage;
        this.coreConfig = coreConfig;
        this.translate = translate;
    }
    Object.defineProperty(Config.prototype, "servers", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var servers = [
                { _id: 'prod', name: 'Production', url: Config.PROD_URL },
                { _id: 'sandbox', name: 'Sandbox', url: Config.SANDBOX_URL },
                { _id: 'demo', name: 'Demo', url: Config.DEMO_URL },
                { _id: 'demofresh', name: 'Demo Fresh', url: Config.DEMO_FRESH_URL },
                { _id: 'staging', name: 'Staging', url: Config.STAGING_URL },
                { _id: 'dev', name: 'Development', url: Config.DEV_URL },
                { _id: 'dev1', name: 'Development 1', url: Config.DEV1_URL },
                { _id: 'trial', name: 'Trial', url: Config.TRIAL_URL },
                { _id: 'e2e', name: 'E2E', url: Config.E2E_URL }
            ];
            if (!this.coreConfig.isUniversal() || location.hostname === 'localhost') {
                servers.push({ _id: 'localhost', name: 'Localhost', url: Config.LOCALHOST_URL });
                servers.push({ _id: 'testpen', name: 'Testpen', url: Config.TESTPEN_URL });
            }
            if (this.isTestpen) {
                servers = [{ _id: 'testpen', name: 'Testpen', url: Config.TESTPEN_URL }];
            }
            if (this.isSandbox) {
                servers = [{ _id: 'sandbox', name: 'Sandbox', url: Config.SANDBOX_URL }];
            }
            return servers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "serverUrl", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isTestpen) {
                return Config.TESTPEN_URL;
            }
            if (this.isSandbox) {
                return Config.SANDBOX_URL;
            }
            /** @type {?} */
            var defaultServer;
            if (this.server && this.server !== '') {
                defaultServer = this.server;
            }
            else {
                defaultServer = Config.PROD_URL; //Config.DEV_URL;
            }
            this.server = this.localStorage.get('SERVER') || defaultServer;
            return this.server;
        },
        set: /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            this.localStorage.set('SERVER', url);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "serverName", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var server = this.servers.filter((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.url === _this.serverUrl; }));
            if (server && server.length === 1) {
                return server[0].name;
            }
            return this.translate.get('CUSTOM');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "apiUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl + 'api/';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "publicApiUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl + 'public/api/';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "uploadUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'ImageContainers/cloudinary/upload';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "uploadProxyUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'cloudinary/uploadProxyImage';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "zapierInstagramUrl", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var url = this.serverUrl;
            switch (url) {
                case Config.PROD_URL:
                    return Config.ZAPIER_INSTAGRAM_PROD_URL;
                default:
                    return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isTestpen", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.coreConfig.isUniversal() && (location.hostname === 'testpen-dashboard.yoobic.com' || location.hostname === 'testpen-mobile.yoobic.com' || this.server === Config.TESTPEN_URL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isSandbox", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.coreConfig.isUniversal() && (location.hostname === 'dashboard-sandbox.yoobic.com' || location.hostname === 'operations-sandbox.yoobic.com' || location.hostname === 'operations-mobile-sandbox.yoobic.com');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isE2E", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl === Config.E2E_URL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isProduction", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl === Config.PROD_URL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isDemo", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl === Config.DEMO_URL || this.serverUrl === Config.DEMO_FRESH_URL;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Config.prototype.getCurrentConfig = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var items = this.servers.map((/**
         * @param {?} server
         * @return {?}
         */
        function (server) { return ({
            title: server.name,
            url: server.url,
            _id: server._id,
            icon: 'yo-servers'
        }); }));
        /** @type {?} */
        var custom = {
            title: this.translate.get('CUSTOM'),
            url: null,
            _id: 'custom',
            icon: 'yo-edit'
        };
        /** @type {?} */
        var selections = items.filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.url === _this.serverUrl; }));
        /** @type {?} */
        var initialSelection;
        if (selections.length <= 0) {
            custom.url = this.serverUrl;
            initialSelection = custom;
        }
        else {
            initialSelection = selections[0];
        }
        items.unshift(custom);
        return { items: items, initialSelection: initialSelection, custom: custom };
    };
    Config.PROD_URL = 'https://api.yoobic.com/'; //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    //private static CHINA_PROD_URL = 'https://china.yoobic.com/'; //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    Config.SANDBOX_URL = 'https://api-sandbox.yoobic.com/'; //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    Config.STAGING_URL = 'https://yoobic-loopback-staging-v3.herokuapp.com/';
    Config.DEMO_URL = 'https://api-demo.yoobic.com/';
    Config.DEMO_FRESH_URL = 'https://yoobic-loopback-demo-fresh.herokuapp.com/';
    Config.DEV_URL = 'https://yoobic-loopback-dev-v3.herokuapp.com/';
    Config.DEV1_URL = 'https://yoobic-loopback-dev1-v3.herokuapp.com/';
    Config.LOCALHOST_URL = 'https://localhost:3000/';
    Config.TESTPEN_URL = 'https://testpen.yoobic.com/';
    Config.TRIAL_URL = 'https://yoobic-loopback-trial.herokuapp.com/';
    Config.E2E_URL = 'https://yoobic-loopback-e2e.herokuapp.com/';
    Config.IMAGE_URL = 'https://upload.yoobic.com/api/'; // 'https://images.yoobic.com/api/ImageContainers/cloudinary/upload'; //'https://192.168.1.88:3000/api/ImageContainers/cloudinary/upload'//'http://localhost:3000/api/ImageContainers/cloudinary/upload'; //
    // 'https://images.yoobic.com/api/ImageContainers/cloudinary/upload'; //'https://192.168.1.88:3000/api/ImageContainers/cloudinary/upload'//'http://localhost:3000/api/ImageContainers/cloudinary/upload'; //
    Config.ZAPIER_INSTAGRAM_PROD_URL = 'https://etl.yoobic.com/flows/zapier_instagram_start';
    Config.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Config.ctorParameters = function () { return [
        { type: LocalStorage },
        { type: CoreConfig },
        { type: Translate }
    ]; };
    return Config;
}());
export { Config };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Config.PROD_URL;
    /**
     * @type {?}
     * @private
     */
    Config.SANDBOX_URL;
    /**
     * @type {?}
     * @private
     */
    Config.STAGING_URL;
    /**
     * @type {?}
     * @private
     */
    Config.DEMO_URL;
    /**
     * @type {?}
     * @private
     */
    Config.DEMO_FRESH_URL;
    /**
     * @type {?}
     * @private
     */
    Config.DEV_URL;
    /**
     * @type {?}
     * @private
     */
    Config.DEV1_URL;
    /**
     * @type {?}
     * @private
     */
    Config.LOCALHOST_URL;
    /**
     * @type {?}
     * @private
     */
    Config.TESTPEN_URL;
    /**
     * @type {?}
     * @private
     */
    Config.TRIAL_URL;
    /**
     * @type {?}
     * @private
     */
    Config.E2E_URL;
    /**
     * @type {?}
     * @private
     */
    Config.IMAGE_URL;
    /**
     * @type {?}
     * @private
     */
    Config.ZAPIER_INSTAGRAM_PROD_URL;
    /**
     * @type {?}
     * @private
     */
    Config.prototype.server;
    /**
     * @type {?}
     * @protected
     */
    Config.prototype.localStorage;
    /**
     * @type {?}
     * @protected
     */
    Config.prototype.coreConfig;
    /**
     * @type {?}
     * @protected
     */
    Config.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlnL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzlDO0lBb0JFLGdCQUFzQixZQUEwQixFQUFZLFVBQXNCLEVBQVksU0FBb0I7UUFBNUYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBWSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVksY0FBUyxHQUFULFNBQVMsQ0FBVztJQUFHLENBQUM7SUFFdEgsc0JBQVcsMkJBQU87Ozs7UUFBbEI7O2dCQUNNLE9BQU8sR0FBRztnQkFDWixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDekQsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQzVELEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNuRCxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLGNBQWMsRUFBRTtnQkFDcEUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQzVELEVBQUUsR0FBRyxFQUFFLEtBQUss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SkQsSUFvSkM7U0FuSlksTUFBTTs7Ozs7O0lBQ2pCLGdCQUFvRDs7Ozs7SUFFcEQsbUJBQStEOzs7OztJQUMvRCxtQkFBaUY7Ozs7O0lBQ2pGLGdCQUF5RDs7Ozs7SUFDekQsc0JBQW9GOzs7OztJQUNwRixlQUF5RTs7Ozs7SUFDekUsZ0JBQTJFOzs7OztJQUMzRSxxQkFBeUQ7Ozs7O0lBQ3pELG1CQUEyRDs7Ozs7SUFDM0QsaUJBQTBFOzs7OztJQUMxRSxlQUFzRTs7Ozs7SUFFdEUsaUJBQTREOzs7OztJQUU1RCxpQ0FBaUc7Ozs7O0lBQ2pHLHdCQUF1Qjs7Ozs7SUFFWCw4QkFBb0M7Ozs7O0lBQUUsNEJBQWdDOzs7OztJQUFFLDJCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZSwgQ29yZUNvbmZpZyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcbmltcG9ydCB7IElDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpZyBpbXBsZW1lbnRzIElDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgUFJPRF9VUkwgPSAnaHR0cHM6Ly9hcGkueW9vYmljLmNvbS8nOyAvL2h0dHBzOi8veW9vYmljLWxvb3BiYWNrLXByb2QtdjMuaGVyb2t1YXBwLmNvbS8nOyAvLyAnaHR0cHM6Ly9hcGkueW9vYmljLmNvbS8nXG4gIC8vcHJpdmF0ZSBzdGF0aWMgQ0hJTkFfUFJPRF9VUkwgPSAnaHR0cHM6Ly9jaGluYS55b29iaWMuY29tLyc7IC8vaHR0cHM6Ly95b29iaWMtbG9vcGJhY2stcHJvZC12My5oZXJva3VhcHAuY29tLyc7IC8vICdodHRwczovL2FwaS55b29iaWMuY29tLydcbiAgcHJpdmF0ZSBzdGF0aWMgU0FOREJPWF9VUkwgPSAnaHR0cHM6Ly9hcGktc2FuZGJveC55b29iaWMuY29tLyc7IC8vaHR0cHM6Ly95b29iaWMtbG9vcGJhY2stcHJvZC12My5oZXJva3VhcHAuY29tLyc7IC8vICdodHRwczovL2FwaS55b29iaWMuY29tLydcbiAgcHJpdmF0ZSBzdGF0aWMgU1RBR0lOR19VUkwgPSAnaHR0cHM6Ly95b29iaWMtbG9vcGJhY2stc3RhZ2luZy12My5oZXJva3VhcHAuY29tLyc7XG4gIHByaXZhdGUgc3RhdGljIERFTU9fVVJMID0gJ2h0dHBzOi8vYXBpLWRlbW8ueW9vYmljLmNvbS8nO1xuICBwcml2YXRlIHN0YXRpYyBERU1PX0ZSRVNIX1VSTCA9ICdodHRwczovL3lvb2JpYy1sb29wYmFjay1kZW1vLWZyZXNoLmhlcm9rdWFwcC5jb20vJztcbiAgcHJpdmF0ZSBzdGF0aWMgREVWX1VSTCA9ICdodHRwczovL3lvb2JpYy1sb29wYmFjay1kZXYtdjMuaGVyb2t1YXBwLmNvbS8nO1xuICBwcml2YXRlIHN0YXRpYyBERVYxX1VSTCA9ICdodHRwczovL3lvb2JpYy1sb29wYmFjay1kZXYxLXYzLmhlcm9rdWFwcC5jb20vJztcbiAgcHJpdmF0ZSBzdGF0aWMgTE9DQUxIT1NUX1VSTCA9ICdodHRwczovL2xvY2FsaG9zdDozMDAwLyc7XG4gIHByaXZhdGUgc3RhdGljIFRFU1RQRU5fVVJMID0gJ2h0dHBzOi8vdGVzdHBlbi55b29iaWMuY29tLyc7XG4gIHByaXZhdGUgc3RhdGljIFRSSUFMX1VSTCA9ICdodHRwczovL3lvb2JpYy1sb29wYmFjay10cmlhbC5oZXJva3VhcHAuY29tLyc7XG4gIHByaXZhdGUgc3RhdGljIEUyRV9VUkwgPSAnaHR0cHM6Ly95b29iaWMtbG9vcGJhY2stZTJlLmhlcm9rdWFwcC5jb20vJztcblxuICBwcml2YXRlIHN0YXRpYyBJTUFHRV9VUkwgPSAnaHR0cHM6Ly91cGxvYWQueW9vYmljLmNvbS9hcGkvJzsgLy8gJ2h0dHBzOi8vaW1hZ2VzLnlvb2JpYy5jb20vYXBpL0ltYWdlQ29udGFpbmVycy9jbG91ZGluYXJ5L3VwbG9hZCc7IC8vJ2h0dHBzOi8vMTkyLjE2OC4xLjg4OjMwMDAvYXBpL0ltYWdlQ29udGFpbmVycy9jbG91ZGluYXJ5L3VwbG9hZCcvLydodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL0ltYWdlQ29udGFpbmVycy9jbG91ZGluYXJ5L3VwbG9hZCc7IC8vXG5cbiAgcHJpdmF0ZSBzdGF0aWMgWkFQSUVSX0lOU1RBR1JBTV9QUk9EX1VSTCA9ICdodHRwczovL2V0bC55b29iaWMuY29tL2Zsb3dzL3phcGllcl9pbnN0YWdyYW1fc3RhcnQnO1xuICBwcml2YXRlIHNlcnZlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZSwgcHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZSkge31cblxuICBwdWJsaWMgZ2V0IHNlcnZlcnMoKSB7XG4gICAgbGV0IHNlcnZlcnMgPSBbXG4gICAgICB7IF9pZDogJ3Byb2QnLCBuYW1lOiAnUHJvZHVjdGlvbicsIHVybDogQ29uZmlnLlBST0RfVVJMIH0sXG4gICAgICB7IF9pZDogJ3NhbmRib3gnLCBuYW1lOiAnU2FuZGJveCcsIHVybDogQ29uZmlnLlNBTkRCT1hfVVJMIH0sXG4gICAgICB7IF9pZDogJ2RlbW8nLCBuYW1lOiAnRGVtbycsIHVybDogQ29uZmlnLkRFTU9fVVJMIH0sXG4gICAgICB7IF9pZDogJ2RlbW9mcmVzaCcsIG5hbWU6ICdEZW1vIEZyZXNoJywgdXJsOiBDb25maWcuREVNT19GUkVTSF9VUkwgfSxcbiAgICAgIHsgX2lkOiAnc3RhZ2luZycsIG5hbWU6ICdTdGFnaW5nJywgdXJsOiBDb25maWcuU1RBR0lOR19VUkwgfSxcbiAgICAgIHsgX2lkOiAnZGV2JywgbmFtZTogJ0RldmVsb3BtZW50JywgdXJsOiBDb25maWcuREVWX1VSTCB9LFxuICAgICAgeyBfaWQ6ICdkZXYxJywgbmFtZTogJ0RldmVsb3BtZW50IDEnLCB1cmw6IENvbmZpZy5ERVYxX1VSTCB9LFxuICAgICAgeyBfaWQ6ICd0cmlhbCcsIG5hbWU6ICdUcmlhbCcsIHVybDogQ29uZmlnLlRSSUFMX1VSTCB9LFxuICAgICAgeyBfaWQ6ICdlMmUnLCBuYW1lOiAnRTJFJywgdXJsOiBDb25maWcuRTJFX1VSTCB9XG4gICAgXTtcblxuICAgIGlmICghdGhpcy5jb3JlQ29uZmlnLmlzVW5pdmVyc2FsKCkgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnKSB7XG4gICAgICBzZXJ2ZXJzLnB1c2goeyBfaWQ6ICdsb2NhbGhvc3QnLCBuYW1lOiAnTG9jYWxob3N0JywgdXJsOiBDb25maWcuTE9DQUxIT1NUX1VSTCB9KTtcbiAgICAgIHNlcnZlcnMucHVzaCh7IF9pZDogJ3Rlc3RwZW4nLCBuYW1lOiAnVGVzdHBlbicsIHVybDogQ29uZmlnLlRFU1RQRU5fVVJMIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1Rlc3RwZW4pIHtcbiAgICAgIHNlcnZlcnMgPSBbeyBfaWQ6ICd0ZXN0cGVuJywgbmFtZTogJ1Rlc3RwZW4nLCB1cmw6IENvbmZpZy5URVNUUEVOX1VSTCB9XTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNTYW5kYm94KSB7XG4gICAgICBzZXJ2ZXJzID0gW3sgX2lkOiAnc2FuZGJveCcsIG5hbWU6ICdTYW5kYm94JywgdXJsOiBDb25maWcuU0FOREJPWF9VUkwgfV07XG4gICAgfVxuICAgIHJldHVybiBzZXJ2ZXJzO1xuICB9XG5cbiAgcHVibGljIGdldCBzZXJ2ZXJVcmwoKSB7XG4gICAgaWYgKHRoaXMuaXNUZXN0cGVuKSB7XG4gICAgICByZXR1cm4gQ29uZmlnLlRFU1RQRU5fVVJMO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NhbmRib3gpIHtcbiAgICAgIHJldHVybiBDb25maWcuU0FOREJPWF9VUkw7XG4gICAgfVxuICAgIGxldCBkZWZhdWx0U2VydmVyO1xuICAgIGlmICh0aGlzLnNlcnZlciAmJiB0aGlzLnNlcnZlciAhPT0gJycpIHtcbiAgICAgIGRlZmF1bHRTZXJ2ZXIgPSB0aGlzLnNlcnZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmYXVsdFNlcnZlciA9IENvbmZpZy5QUk9EX1VSTDsgLy9Db25maWcuREVWX1VSTDtcbiAgICB9XG4gICAgdGhpcy5zZXJ2ZXIgPSB0aGlzLmxvY2FsU3RvcmFnZS5nZXQoJ1NFUlZFUicpIHx8IGRlZmF1bHRTZXJ2ZXI7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyO1xuICB9XG5cbiAgcHVibGljIGdldCBzZXJ2ZXJOYW1lKCkge1xuICAgIGxldCBzZXJ2ZXIgPSB0aGlzLnNlcnZlcnMuZmlsdGVyKHMgPT4gcy51cmwgPT09IHRoaXMuc2VydmVyVXJsKTtcbiAgICBpZiAoc2VydmVyICYmIHNlcnZlci5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBzZXJ2ZXJbMF0ubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmdldCgnQ1VTVE9NJyk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNlcnZlclVybCh1cmwpIHtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXQoJ1NFUlZFUicsIHVybCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFwaVVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXJVcmwgKyAnYXBpLyc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHB1YmxpY0FwaVVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXJVcmwgKyAncHVibGljL2FwaS8nO1xuICB9XG5cbiAgcHVibGljIGdldCB1cGxvYWRVcmwoKSB7XG4gICAgcmV0dXJuICh0aGlzLmxvY2FsU3RvcmFnZS5nZXQoJ1NFUlZFUl9JTUFHRScpIHx8IENvbmZpZy5JTUFHRV9VUkwpICsgJ0ltYWdlQ29udGFpbmVycy9jbG91ZGluYXJ5L3VwbG9hZCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHVwbG9hZFByb3h5VXJsKCkge1xuICAgIHJldHVybiAodGhpcy5sb2NhbFN0b3JhZ2UuZ2V0KCdTRVJWRVJfSU1BR0UnKSB8fCBDb25maWcuSU1BR0VfVVJMKSArICdjbG91ZGluYXJ5L3VwbG9hZFByb3h5SW1hZ2UnO1xuICB9XG5cbiAgcHVibGljIGdldCB6YXBpZXJJbnN0YWdyYW1VcmwoKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuc2VydmVyVXJsO1xuICAgIHN3aXRjaCAodXJsKSB7XG4gICAgICBjYXNlIENvbmZpZy5QUk9EX1VSTDpcbiAgICAgICAgcmV0dXJuIENvbmZpZy5aQVBJRVJfSU5TVEFHUkFNX1BST0RfVVJMO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNUZXN0cGVuKCkge1xuICAgIHJldHVybiAhdGhpcy5jb3JlQ29uZmlnLmlzVW5pdmVyc2FsKCkgJiYgKGxvY2F0aW9uLmhvc3RuYW1lID09PSAndGVzdHBlbi1kYXNoYm9hcmQueW9vYmljLmNvbScgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09ICd0ZXN0cGVuLW1vYmlsZS55b29iaWMuY29tJyB8fCB0aGlzLnNlcnZlciA9PT0gQ29uZmlnLlRFU1RQRU5fVVJMKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNTYW5kYm94KCkge1xuICAgIHJldHVybiAhdGhpcy5jb3JlQ29uZmlnLmlzVW5pdmVyc2FsKCkgJiYgKGxvY2F0aW9uLmhvc3RuYW1lID09PSAnZGFzaGJvYXJkLXNhbmRib3gueW9vYmljLmNvbScgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09ICdvcGVyYXRpb25zLXNhbmRib3gueW9vYmljLmNvbScgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09ICdvcGVyYXRpb25zLW1vYmlsZS1zYW5kYm94Lnlvb2JpYy5jb20nKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNFMkUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyVXJsID09PSBDb25maWcuRTJFX1VSTDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNQcm9kdWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZlclVybCA9PT0gQ29uZmlnLlBST0RfVVJMO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0RlbW8oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyVXJsID09PSBDb25maWcuREVNT19VUkwgfHwgdGhpcy5zZXJ2ZXJVcmwgPT09IENvbmZpZy5ERU1PX0ZSRVNIX1VSTDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50Q29uZmlnKCkge1xuICAgIGxldCBpdGVtcyA9IHRoaXMuc2VydmVycy5tYXAoc2VydmVyID0+ICh7XG4gICAgICB0aXRsZTogc2VydmVyLm5hbWUsXG4gICAgICB1cmw6IHNlcnZlci51cmwsXG4gICAgICBfaWQ6IHNlcnZlci5faWQsXG4gICAgICBpY29uOiAneW8tc2VydmVycydcbiAgICB9KSk7XG4gICAgbGV0IGN1c3RvbTogeyB0aXRsZTogc3RyaW5nOyB1cmw6IHN0cmluZzsgX2lkOiBzdHJpbmc7IGljb246IHN0cmluZyB9ID0ge1xuICAgICAgdGl0bGU6IHRoaXMudHJhbnNsYXRlLmdldCgnQ1VTVE9NJyksXG4gICAgICB1cmw6IG51bGwsXG4gICAgICBfaWQ6ICdjdXN0b20nLFxuICAgICAgaWNvbjogJ3lvLWVkaXQnXG4gICAgfTtcbiAgICBsZXQgc2VsZWN0aW9ucyA9IGl0ZW1zLmZpbHRlcihzID0+IHMudXJsID09PSB0aGlzLnNlcnZlclVybCk7XG4gICAgbGV0IGluaXRpYWxTZWxlY3Rpb246IHsgdGl0bGU6IHN0cmluZzsgdXJsOiBzdHJpbmc7IF9pZDogc3RyaW5nOyBpY29uOiBzdHJpbmcgfTtcbiAgICBpZiAoc2VsZWN0aW9ucy5sZW5ndGggPD0gMCkge1xuICAgICAgY3VzdG9tLnVybCA9IHRoaXMuc2VydmVyVXJsO1xuICAgICAgaW5pdGlhbFNlbGVjdGlvbiA9IGN1c3RvbTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdGlhbFNlbGVjdGlvbiA9IHNlbGVjdGlvbnNbMF07XG4gICAgfVxuICAgIGl0ZW1zLnVuc2hpZnQoY3VzdG9tKTtcblxuICAgIHJldHVybiB7IGl0ZW1zLCBpbml0aWFsU2VsZWN0aW9uLCBjdXN0b20gfTtcbiAgfVxufVxuIl19
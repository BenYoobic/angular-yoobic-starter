/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LocalStorage, CoreConfig } from '@shared/common';
import { Translate } from '@shared/translate';
export class Config {
    /**
     * @param {?} localStorage
     * @param {?} coreConfig
     * @param {?} translate
     */
    constructor(localStorage, coreConfig, translate) {
        this.localStorage = localStorage;
        this.coreConfig = coreConfig;
        this.translate = translate;
    }
    /**
     * @return {?}
     */
    get servers() {
        /** @type {?} */
        let servers = [
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
    }
    /**
     * @return {?}
     */
    get serverUrl() {
        if (this.isTestpen) {
            return Config.TESTPEN_URL;
        }
        if (this.isSandbox) {
            return Config.SANDBOX_URL;
        }
        /** @type {?} */
        let defaultServer;
        if (this.server && this.server !== '') {
            defaultServer = this.server;
        }
        else {
            defaultServer = Config.PROD_URL; //Config.DEV_URL;
        }
        this.server = this.localStorage.get('SERVER') || defaultServer;
        return this.server;
    }
    /**
     * @return {?}
     */
    get serverName() {
        /** @type {?} */
        let server = this.servers.filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s.url === this.serverUrl));
        if (server && server.length === 1) {
            return server[0].name;
        }
        return this.translate.get('CUSTOM');
    }
    /**
     * @param {?} url
     * @return {?}
     */
    set serverUrl(url) {
        this.localStorage.set('SERVER', url);
    }
    /**
     * @return {?}
     */
    get apiUrl() {
        return this.serverUrl + 'api/';
    }
    /**
     * @return {?}
     */
    get publicApiUrl() {
        return this.serverUrl + 'public/api/';
    }
    /**
     * @return {?}
     */
    get uploadUrl() {
        return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'ImageContainers/cloudinary/upload';
    }
    /**
     * @return {?}
     */
    get uploadProxyUrl() {
        return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'cloudinary/uploadProxyImage';
    }
    /**
     * @return {?}
     */
    get zapierInstagramUrl() {
        /** @type {?} */
        let url = this.serverUrl;
        switch (url) {
            case Config.PROD_URL:
                return Config.ZAPIER_INSTAGRAM_PROD_URL;
            default:
                return '';
        }
    }
    /**
     * @return {?}
     */
    get isTestpen() {
        return !this.coreConfig.isUniversal() && (location.hostname === 'testpen-dashboard.yoobic.com' || location.hostname === 'testpen-mobile.yoobic.com' || this.server === Config.TESTPEN_URL);
    }
    /**
     * @return {?}
     */
    get isSandbox() {
        return !this.coreConfig.isUniversal() && (location.hostname === 'dashboard-sandbox.yoobic.com' || location.hostname === 'operations-sandbox.yoobic.com' || location.hostname === 'operations-mobile-sandbox.yoobic.com');
    }
    /**
     * @return {?}
     */
    get isE2E() {
        return this.serverUrl === Config.E2E_URL;
    }
    /**
     * @return {?}
     */
    get isProduction() {
        return this.serverUrl === Config.PROD_URL;
    }
    /**
     * @return {?}
     */
    get isDemo() {
        return this.serverUrl === Config.DEMO_URL || this.serverUrl === Config.DEMO_FRESH_URL;
    }
    /**
     * @return {?}
     */
    getCurrentConfig() {
        /** @type {?} */
        let items = this.servers.map((/**
         * @param {?} server
         * @return {?}
         */
        server => ({
            title: server.name,
            url: server.url,
            _id: server._id,
            icon: 'yo-servers'
        })));
        /** @type {?} */
        let custom = {
            title: this.translate.get('CUSTOM'),
            url: null,
            _id: 'custom',
            icon: 'yo-edit'
        };
        /** @type {?} */
        let selections = items.filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s.url === this.serverUrl));
        /** @type {?} */
        let initialSelection;
        if (selections.length <= 0) {
            custom.url = this.serverUrl;
            initialSelection = custom;
        }
        else {
            initialSelection = selections[0];
        }
        items.unshift(custom);
        return { items, initialSelection, custom };
    }
}
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
Config.ctorParameters = () => [
    { type: LocalStorage },
    { type: CoreConfig },
    { type: Translate }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlnL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSTlDLE1BQU0sT0FBTyxNQUFNOzs7Ozs7SUFtQmpCLFlBQXNCLFlBQTBCLEVBQVksVUFBc0IsRUFBWSxTQUFvQjtRQUE1RixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFZLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBWSxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQzs7OztJQUV0SCxJQUFXLE9BQU87O1lBQ1osT0FBTyxHQUFHO1lBQ1osRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDekQsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDNUQsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbkQsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUU7WUFDcEUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDNUQsRUFBRSxHQUFHLEVBQUUs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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2UsIENvcmVDb25maWcgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBJQ29uZmlnU2VydmljZSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWcgaW1wbGVtZW50cyBJQ29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgc3RhdGljIFBST0RfVVJMID0gJ2h0dHBzOi8vYXBpLnlvb2JpYy5jb20vJzsgLy9odHRwczovL3lvb2JpYy1sb29wYmFjay1wcm9kLXYzLmhlcm9rdWFwcC5jb20vJzsgLy8gJ2h0dHBzOi8vYXBpLnlvb2JpYy5jb20vJ1xuICAvL3ByaXZhdGUgc3RhdGljIENISU5BX1BST0RfVVJMID0gJ2h0dHBzOi8vY2hpbmEueW9vYmljLmNvbS8nOyAvL2h0dHBzOi8veW9vYmljLWxvb3BiYWNrLXByb2QtdjMuaGVyb2t1YXBwLmNvbS8nOyAvLyAnaHR0cHM6Ly9hcGkueW9vYmljLmNvbS8nXG4gIHByaXZhdGUgc3RhdGljIFNBTkRCT1hfVVJMID0gJ2h0dHBzOi8vYXBpLXNhbmRib3gueW9vYmljLmNvbS8nOyAvL2h0dHBzOi8veW9vYmljLWxvb3BiYWNrLXByb2QtdjMuaGVyb2t1YXBwLmNvbS8nOyAvLyAnaHR0cHM6Ly9hcGkueW9vYmljLmNvbS8nXG4gIHByaXZhdGUgc3RhdGljIFNUQUdJTkdfVVJMID0gJ2h0dHBzOi8veW9vYmljLWxvb3BiYWNrLXN0YWdpbmctdjMuaGVyb2t1YXBwLmNvbS8nO1xuICBwcml2YXRlIHN0YXRpYyBERU1PX1VSTCA9ICdodHRwczovL2FwaS1kZW1vLnlvb2JpYy5jb20vJztcbiAgcHJpdmF0ZSBzdGF0aWMgREVNT19GUkVTSF9VUkwgPSAnaHR0cHM6Ly95b29iaWMtbG9vcGJhY2stZGVtby1mcmVzaC5oZXJva3VhcHAuY29tLyc7XG4gIHByaXZhdGUgc3RhdGljIERFVl9VUkwgPSAnaHR0cHM6Ly95b29iaWMtbG9vcGJhY2stZGV2LXYzLmhlcm9rdWFwcC5jb20vJztcbiAgcHJpdmF0ZSBzdGF0aWMgREVWMV9VUkwgPSAnaHR0cHM6Ly95b29iaWMtbG9vcGJhY2stZGV2MS12My5oZXJva3VhcHAuY29tLyc7XG4gIHByaXZhdGUgc3RhdGljIExPQ0FMSE9TVF9VUkwgPSAnaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMC8nO1xuICBwcml2YXRlIHN0YXRpYyBURVNUUEVOX1VSTCA9ICdodHRwczovL3Rlc3RwZW4ueW9vYmljLmNvbS8nO1xuICBwcml2YXRlIHN0YXRpYyBUUklBTF9VUkwgPSAnaHR0cHM6Ly95b29iaWMtbG9vcGJhY2stdHJpYWwuaGVyb2t1YXBwLmNvbS8nO1xuICBwcml2YXRlIHN0YXRpYyBFMkVfVVJMID0gJ2h0dHBzOi8veW9vYmljLWxvb3BiYWNrLWUyZS5oZXJva3VhcHAuY29tLyc7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgSU1BR0VfVVJMID0gJ2h0dHBzOi8vdXBsb2FkLnlvb2JpYy5jb20vYXBpLyc7IC8vICdodHRwczovL2ltYWdlcy55b29iaWMuY29tL2FwaS9JbWFnZUNvbnRhaW5lcnMvY2xvdWRpbmFyeS91cGxvYWQnOyAvLydodHRwczovLzE5Mi4xNjguMS44ODozMDAwL2FwaS9JbWFnZUNvbnRhaW5lcnMvY2xvdWRpbmFyeS91cGxvYWQnLy8naHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9JbWFnZUNvbnRhaW5lcnMvY2xvdWRpbmFyeS91cGxvYWQnOyAvL1xuXG4gIHByaXZhdGUgc3RhdGljIFpBUElFUl9JTlNUQUdSQU1fUFJPRF9VUkwgPSAnaHR0cHM6Ly9ldGwueW9vYmljLmNvbS9mbG93cy96YXBpZXJfaW5zdGFncmFtX3N0YXJ0JztcbiAgcHJpdmF0ZSBzZXJ2ZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbG9jYWxTdG9yYWdlOiBMb2NhbFN0b3JhZ2UsIHByb3RlY3RlZCBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnLCBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGUpIHt9XG5cbiAgcHVibGljIGdldCBzZXJ2ZXJzKCkge1xuICAgIGxldCBzZXJ2ZXJzID0gW1xuICAgICAgeyBfaWQ6ICdwcm9kJywgbmFtZTogJ1Byb2R1Y3Rpb24nLCB1cmw6IENvbmZpZy5QUk9EX1VSTCB9LFxuICAgICAgeyBfaWQ6ICdzYW5kYm94JywgbmFtZTogJ1NhbmRib3gnLCB1cmw6IENvbmZpZy5TQU5EQk9YX1VSTCB9LFxuICAgICAgeyBfaWQ6ICdkZW1vJywgbmFtZTogJ0RlbW8nLCB1cmw6IENvbmZpZy5ERU1PX1VSTCB9LFxuICAgICAgeyBfaWQ6ICdkZW1vZnJlc2gnLCBuYW1lOiAnRGVtbyBGcmVzaCcsIHVybDogQ29uZmlnLkRFTU9fRlJFU0hfVVJMIH0sXG4gICAgICB7IF9pZDogJ3N0YWdpbmcnLCBuYW1lOiAnU3RhZ2luZycsIHVybDogQ29uZmlnLlNUQUdJTkdfVVJMIH0sXG4gICAgICB7IF9pZDogJ2RldicsIG5hbWU6ICdEZXZlbG9wbWVudCcsIHVybDogQ29uZmlnLkRFVl9VUkwgfSxcbiAgICAgIHsgX2lkOiAnZGV2MScsIG5hbWU6ICdEZXZlbG9wbWVudCAxJywgdXJsOiBDb25maWcuREVWMV9VUkwgfSxcbiAgICAgIHsgX2lkOiAndHJpYWwnLCBuYW1lOiAnVHJpYWwnLCB1cmw6IENvbmZpZy5UUklBTF9VUkwgfSxcbiAgICAgIHsgX2lkOiAnZTJlJywgbmFtZTogJ0UyRScsIHVybDogQ29uZmlnLkUyRV9VUkwgfVxuICAgIF07XG5cbiAgICBpZiAoIXRoaXMuY29yZUNvbmZpZy5pc1VuaXZlcnNhbCgpIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0Jykge1xuICAgICAgc2VydmVycy5wdXNoKHsgX2lkOiAnbG9jYWxob3N0JywgbmFtZTogJ0xvY2FsaG9zdCcsIHVybDogQ29uZmlnLkxPQ0FMSE9TVF9VUkwgfSk7XG4gICAgICBzZXJ2ZXJzLnB1c2goeyBfaWQ6ICd0ZXN0cGVuJywgbmFtZTogJ1Rlc3RwZW4nLCB1cmw6IENvbmZpZy5URVNUUEVOX1VSTCB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNUZXN0cGVuKSB7XG4gICAgICBzZXJ2ZXJzID0gW3sgX2lkOiAndGVzdHBlbicsIG5hbWU6ICdUZXN0cGVuJywgdXJsOiBDb25maWcuVEVTVFBFTl9VUkwgfV07XG4gICAgfVxuICAgIGlmICh0aGlzLmlzU2FuZGJveCkge1xuICAgICAgc2VydmVycyA9IFt7IF9pZDogJ3NhbmRib3gnLCBuYW1lOiAnU2FuZGJveCcsIHVybDogQ29uZmlnLlNBTkRCT1hfVVJMIH1dO1xuICAgIH1cbiAgICByZXR1cm4gc2VydmVycztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2VydmVyVXJsKCkge1xuICAgIGlmICh0aGlzLmlzVGVzdHBlbikge1xuICAgICAgcmV0dXJuIENvbmZpZy5URVNUUEVOX1VSTDtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNTYW5kYm94KSB7XG4gICAgICByZXR1cm4gQ29uZmlnLlNBTkRCT1hfVVJMO1xuICAgIH1cbiAgICBsZXQgZGVmYXVsdFNlcnZlcjtcbiAgICBpZiAodGhpcy5zZXJ2ZXIgJiYgdGhpcy5zZXJ2ZXIgIT09ICcnKSB7XG4gICAgICBkZWZhdWx0U2VydmVyID0gdGhpcy5zZXJ2ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmF1bHRTZXJ2ZXIgPSBDb25maWcuUFJPRF9VUkw7IC8vQ29uZmlnLkRFVl9VUkw7XG4gICAgfVxuICAgIHRoaXMuc2VydmVyID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0KCdTRVJWRVInKSB8fCBkZWZhdWx0U2VydmVyO1xuICAgIHJldHVybiB0aGlzLnNlcnZlcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2VydmVyTmFtZSgpIHtcbiAgICBsZXQgc2VydmVyID0gdGhpcy5zZXJ2ZXJzLmZpbHRlcihzID0+IHMudXJsID09PSB0aGlzLnNlcnZlclVybCk7XG4gICAgaWYgKHNlcnZlciAmJiBzZXJ2ZXIubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gc2VydmVyWzBdLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0NVU1RPTScpO1xuICB9XG5cbiAgcHVibGljIHNldCBzZXJ2ZXJVcmwodXJsKSB7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2Uuc2V0KCdTRVJWRVInLCB1cmwpO1xuICB9XG5cbiAgcHVibGljIGdldCBhcGlVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyVXJsICsgJ2FwaS8nO1xuICB9XG5cbiAgcHVibGljIGdldCBwdWJsaWNBcGlVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyVXJsICsgJ3B1YmxpYy9hcGkvJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXBsb2FkVXJsKCkge1xuICAgIHJldHVybiAodGhpcy5sb2NhbFN0b3JhZ2UuZ2V0KCdTRVJWRVJfSU1BR0UnKSB8fCBDb25maWcuSU1BR0VfVVJMKSArICdJbWFnZUNvbnRhaW5lcnMvY2xvdWRpbmFyeS91cGxvYWQnO1xuICB9XG5cbiAgcHVibGljIGdldCB1cGxvYWRQcm94eVVybCgpIHtcbiAgICByZXR1cm4gKHRoaXMubG9jYWxTdG9yYWdlLmdldCgnU0VSVkVSX0lNQUdFJykgfHwgQ29uZmlnLklNQUdFX1VSTCkgKyAnY2xvdWRpbmFyeS91cGxvYWRQcm94eUltYWdlJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgemFwaWVySW5zdGFncmFtVXJsKCkge1xuICAgIGxldCB1cmwgPSB0aGlzLnNlcnZlclVybDtcbiAgICBzd2l0Y2ggKHVybCkge1xuICAgICAgY2FzZSBDb25maWcuUFJPRF9VUkw6XG4gICAgICAgIHJldHVybiBDb25maWcuWkFQSUVSX0lOU1RBR1JBTV9QUk9EX1VSTDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzVGVzdHBlbigpIHtcbiAgICByZXR1cm4gIXRoaXMuY29yZUNvbmZpZy5pc1VuaXZlcnNhbCgpICYmIChsb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ3Rlc3RwZW4tZGFzaGJvYXJkLnlvb2JpYy5jb20nIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSAndGVzdHBlbi1tb2JpbGUueW9vYmljLmNvbScgfHwgdGhpcy5zZXJ2ZXIgPT09IENvbmZpZy5URVNUUEVOX1VSTCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzU2FuZGJveCgpIHtcbiAgICByZXR1cm4gIXRoaXMuY29yZUNvbmZpZy5pc1VuaXZlcnNhbCgpICYmIChsb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ2Rhc2hib2FyZC1zYW5kYm94Lnlvb2JpYy5jb20nIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSAnb3BlcmF0aW9ucy1zYW5kYm94Lnlvb2JpYy5jb20nIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSAnb3BlcmF0aW9ucy1tb2JpbGUtc2FuZGJveC55b29iaWMuY29tJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzRTJFKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZlclVybCA9PT0gQ29uZmlnLkUyRV9VUkw7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzUHJvZHVjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXJVcmwgPT09IENvbmZpZy5QUk9EX1VSTDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNEZW1vKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZlclVybCA9PT0gQ29uZmlnLkRFTU9fVVJMIHx8IHRoaXMuc2VydmVyVXJsID09PSBDb25maWcuREVNT19GUkVTSF9VUkw7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudENvbmZpZygpIHtcbiAgICBsZXQgaXRlbXMgPSB0aGlzLnNlcnZlcnMubWFwKHNlcnZlciA9PiAoe1xuICAgICAgdGl0bGU6IHNlcnZlci5uYW1lLFxuICAgICAgdXJsOiBzZXJ2ZXIudXJsLFxuICAgICAgX2lkOiBzZXJ2ZXIuX2lkLFxuICAgICAgaWNvbjogJ3lvLXNlcnZlcnMnXG4gICAgfSkpO1xuICAgIGxldCBjdXN0b206IHsgdGl0bGU6IHN0cmluZzsgdXJsOiBzdHJpbmc7IF9pZDogc3RyaW5nOyBpY29uOiBzdHJpbmcgfSA9IHtcbiAgICAgIHRpdGxlOiB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0NVU1RPTScpLFxuICAgICAgdXJsOiBudWxsLFxuICAgICAgX2lkOiAnY3VzdG9tJyxcbiAgICAgIGljb246ICd5by1lZGl0J1xuICAgIH07XG4gICAgbGV0IHNlbGVjdGlvbnMgPSBpdGVtcy5maWx0ZXIocyA9PiBzLnVybCA9PT0gdGhpcy5zZXJ2ZXJVcmwpO1xuICAgIGxldCBpbml0aWFsU2VsZWN0aW9uOiB7IHRpdGxlOiBzdHJpbmc7IHVybDogc3RyaW5nOyBfaWQ6IHN0cmluZzsgaWNvbjogc3RyaW5nIH07XG4gICAgaWYgKHNlbGVjdGlvbnMubGVuZ3RoIDw9IDApIHtcbiAgICAgIGN1c3RvbS51cmwgPSB0aGlzLnNlcnZlclVybDtcbiAgICAgIGluaXRpYWxTZWxlY3Rpb24gPSBjdXN0b207XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXRpYWxTZWxlY3Rpb24gPSBzZWxlY3Rpb25zWzBdO1xuICAgIH1cbiAgICBpdGVtcy51bnNoaWZ0KGN1c3RvbSk7XG5cbiAgICByZXR1cm4geyBpdGVtcywgaW5pdGlhbFNlbGVjdGlvbiwgY3VzdG9tIH07XG4gIH1cbn1cbiJdfQ==
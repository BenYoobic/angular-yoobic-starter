/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, PLATFORM_ID, RendererFactory2, ViewEncapsulation } from '@angular/core';
// import { Router } from '@angular/router';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
/**
 * A provider with every Intercom.JS method
 */
export class WebIntercom {
    // private router: Router;
    /**
     * @param {?} platformId
     * @param {?} rendererFactory
     * @param {?} document
     */
    constructor(platformId, rendererFactory, document) {
        this.platformId = platformId;
        this.rendererFactory = rendererFactory;
        this.document = document;
        this.isInitialized = false;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        // this.router = this.injector.get(Router);
        this.renderer2 = this.rendererFactory.createRenderer(this.document, {
            id: '-1',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
        });
        // Subscribe to router changes
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    init(config = { appId: '' }) {
        this.config = config;
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = false;
        // if (config && config.updateOnRouterChange) {
        //   this.router.events.subscribe(event => {
        //     this.update();
        //   });
        // } else if (isDevMode()) {
        //   console.warn(`
        //   Common practice in single page applications is to update whenever the route changes.
        //   ng-intercom supports this functionality out of the box just set 'updateOnRouterChange' to true in your Intercom Module config.
        //   This warning will not appear in production, if you choose not to use router updating.
        //   `);
        // }
    }
    /**
     * If you'd like to control when Intercom is loaded, you can use the 'boot' method.
     * This is useful in situations like a one-page Javascript based application where the user may not be logged in
     * when the page loads. You call this method with the standard intercomSettings object.
     * @param {?=} __0
     * @return {?}
     */
    boot(_a = {}) {
        var { app_id } = _a, intercomData = tslib_1.__rest(_a, ["app_id"]);
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (app_id !== this.config.appId) {
            this.config.appId = app_id || this.config.appId;
            if (((/** @type {?} */ (window))).Intercom) {
                this.shutdown();
            }
        }
        // Run load and attach to window
        this.loadIntercom(this.config, (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // then boot the intercom js
            /** @type {?} */
            const data = Object.assign({}, intercomData, { app_id: this.config.appId });
            return ((/** @type {?} */ (window))).Intercom('boot', data);
        }));
    }
    /**
     * If you have the Respond product (combined with another product like Engage)
     * you should call the Intercom shutdown method to clear your users’ conversations anytime they logout
     * of your application. Otherwise, the cookie we use to track who was most recently logged in on a given device
     * or computer will keep these conversations in the Messenger for one week.
     * This method will effectively clear out any user data that you have been passing through the JS API.
     * @return {?}
     */
    shutdown() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('shutdown');
    }
    /**
     * Calling the update method without any other arguments will trigger the JavaScript to look for new messages
     * that should be displayed to the current user (the one whose details are in the window.intercomSettings variable)
     * and show them if they exist.
     *
     * Calling the update method with a JSON object of user details will update those fields on the current user
     * in addition to logging an impression at the current URL and looking for new messages for the user.
     * @param {?=} data
     * @return {?}
     */
    update(data) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        if (data) {
            return ((/** @type {?} */ (window))).Intercom('update', data);
        }
        else {
            return ((/** @type {?} */ (window))).Intercom('update');
        }
    }
    /**
     * This will hide the main Messenger panel if it is open. It will not hide the Messenger Launcher.
     * @return {?}
     */
    hide() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('hide');
    }
    /**
     * This will show the Messenger. If there are no conversations it will open with the new message view,
     * if there are it will open with the message list.
     *
     * If a `message` parameter is supplied, it will automatically open a new message window, aliasing showNewMessage().
     *
     * @param {?=} message
     * @return {?}
     */
    show(message) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        if (message) {
            return ((/** @type {?} */ (window))).Intercom('show');
        }
        else {
            return this.showNewMessage(message);
        }
    }
    /**
     * To open the message window with the message list you can call `showMessages()`.
     * @return {?}
     */
    showMessages() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('showMessages');
    }
    /**
     * To open the message window with the new message view you can call showNewMessage().
     *
     * This function takes an optional parameter that can be used to pre-populate the message composer as shown below.
     * @param {?=} message
     * @return {?}
     */
    showNewMessage(message) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        if (message) {
            return ((/** @type {?} */ (window))).Intercom('showNewMessage', message);
        }
        else {
            return ((/** @type {?} */ (window))).Intercom('showNewMessage');
        }
    }
    /**
     * You can submit an event using the trackEvent method.
     * This will associate the event with the currently logged in user and send it to Intercom.
     * The final parameter is a map that can be used to send optional metadata about the event.
     *
     * You can also add custom information to events in the form of event metadata.
     * @param {?} eventName
     * @param {?=} metadata
     * @return {?}
     */
    trackEvent(eventName, metadata) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        if (metadata) {
            return ((/** @type {?} */ (window))).Intercom('trackEvent', eventName, metadata);
        }
        else {
            return ((/** @type {?} */ (window))).Intercom('trackEvent', eventName);
        }
    }
    /**
     * A visitor is someone who goes to your site but does not use the messenger.
     * You can track these visitors via the visitor user_id.
     * This user_id can be used to retrieve the visitor or lead through the REST API.
     * @return {?}
     */
    getVisitorId() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('getVisitorId');
    }
    /**
     * Alias for getVisitorId()
     * \@alias getVisitorId()
     * \@readonly
     * @return {?}
     */
    get visitorId() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('getVisitorId');
    }
    /**
     * Gives you the ability to hook into the show event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    onShow(handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('onShow', handler);
    }
    /**
     * Gives you the ability to hook into the hide event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    onHide(handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('onHide', handler);
    }
    /**
     * This method allows you to register a function that will be called when the current number of unread messages changes.
     * @param {?} handler
     * @return {?}
     */
    onUnreadCountChange(handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('onUnreadCountChange', handler);
    }
    /**
     * @param {?} conf
     * @param {?} afterInjectCallback
     * @return {?}
     */
    injectIntercomScript(conf, afterInjectCallback) {
        // if (!isPlatformBrowser(this.platformId)) {
        //   return
        // }
        // if (!isPlatformBrowser(this.platformId)) {
        //   return
        // }
        /** @type {?} */
        const s = this.document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = `https://widget.intercom.io/widget/${this.id}`;
        if (s.attachEvent) {
            s.attachEvent('onload', afterInjectCallback);
        }
        else {
            s.addEventListener('load', afterInjectCallback, false);
        }
        if (this.renderer2 && this.renderer2.appendChild) {
            this.renderer2.appendChild(this.document.head, s);
        }
        ((/** @type {?} */ (window))).Intercom('update', conf);
    }
    /**
     * @param {?} config
     * @param {?} afterLoadCallback
     * @return {?}
     */
    loadIntercom(config, afterLoadCallback) {
        this.id = config.appId;
        /** @type {?} */
        const w = (/** @type {?} */ (window));
        /** @type {?} */
        const ic = w.Intercom;
        if (typeof ic === 'function') {
            ic('reattach_activator');
            ic('update', config);
        }
        else {
            /** @type {?} */
            const i = (/**
             * @return {?}
             */
            function () {
                i.c(arguments);
            });
            i.q = [];
            i.c = (/**
             * @param {?} args
             * @return {?}
             */
            function (args) {
                i.q.push(args);
            });
            w.Intercom = i;
            this.injectIntercomScript(config, afterLoadCallback);
        }
    }
}
WebIntercom.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WebIntercom.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: RendererFactory2 },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebIntercom.prototype.id;
    /**
     * @type {?}
     * @private
     */
    WebIntercom.prototype.renderer2;
    /**
     * @type {?}
     * @private
     */
    WebIntercom.prototype.config;
    /**
     * @type {?}
     * @private
     */
    WebIntercom.prototype.isInitialized;
    /**
     * @type {?}
     * @protected
     */
    WebIntercom.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    WebIntercom.prototype.rendererFactory;
    /**
     * @type {?}
     * @private
     */
    WebIntercom.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWludGVyY29tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWxpdmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvaW50ZXJjb20vd2ViLWludGVyY29tLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQWlELGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVwSixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFROUQsTUFBTSxPQUFPLFdBQVc7Ozs7Ozs7SUFTdEIsWUFFaUMsVUFBa0IsRUFFekMsZUFBaUMsRUFDZixRQUFRO1FBSEgsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUV6QyxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDZixhQUFRLEdBQVIsUUFBUSxDQUFBO1FBVDVCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBV3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsT0FBTztTQUNSO1FBRUQsMkNBQTJDO1FBRTNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsRSxFQUFFLEVBQUUsSUFBSTtZQUNSLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLE1BQU0sRUFBRSxFQUFFO1lBQ1YsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFDLENBQUM7UUFFSCw4QkFBOEI7SUFDaEMsQ0FBQzs7Ozs7SUFDTSxJQUFJLENBQUMsU0FBeUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixPQUFPO1NB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QUFpQixDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDOzs7WUExVEYsVUFBVTs7OztZQVlvQyxNQUFNLHVCQUFoRCxNQUFNLFNBQUMsV0FBVztZQXJCa0UsZ0JBQWdCOzRDQXdCcEcsTUFBTSxTQUFDLFFBQVE7Ozs7Ozs7SUFibEIseUJBQW1COzs7OztJQUVuQixnQ0FBNkI7Ozs7O0lBQzdCLDZCQUErQjs7Ozs7SUFDL0Isb0NBQXVDOzs7OztJQU1yQyxpQ0FBaUQ7Ozs7O0lBRWpELHNDQUF5Qzs7Ozs7SUFDekMsK0JBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCwgLypPcHRpb25hbCwgSW5qZWN0b3IsIGlzRGV2TW9kZSwgKi8gUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyLCBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEludGVyY29tQ29uZmlnLCBBbnksIEJvb3RJbnB1dCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW50ZXJjb20vaW50ZXJjb20uaW50ZXJmYWNlJztcblxuLyoqXG4gKiBBIHByb3ZpZGVyIHdpdGggZXZlcnkgSW50ZXJjb20uSlMgbWV0aG9kXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJJbnRlcmNvbSB7XG4gIHByaXZhdGUgaWQ6IHN0cmluZztcblxuICBwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyO1xuICBwcml2YXRlIGNvbmZpZzogSW50ZXJjb21Db25maWc7XG4gIHByaXZhdGUgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy8gcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJvdGVjdGVkIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICAvLyBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnRcbiAgKSB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdGhpcy5yb3V0ZXIgPSB0aGlzLmluamVjdG9yLmdldChSb3V0ZXIpO1xuXG4gICAgdGhpcy5yZW5kZXJlcjIgPSB0aGlzLnJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcih0aGlzLmRvY3VtZW50LCB7XG4gICAgICBpZDogJy0xJyxcbiAgICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgICBzdHlsZXM6IFtdLFxuICAgICAgZGF0YToge31cbiAgICB9KTtcblxuICAgIC8vIFN1YnNjcmliZSB0byByb3V0ZXIgY2hhbmdlc1xuICB9XG4gIHB1YmxpYyBpbml0KGNvbmZpZzogSW50ZXJjb21Db25maWcgPSB7IGFwcElkOiAnJyB9KSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAvLyBpZiAoY29uZmlnICYmIGNvbmZpZy51cGRhdGVPblJvdXRlckNoYW5nZSkge1xuICAgIC8vICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgLy8gICAgIHRoaXMudXBkYXRlKCk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9IGVsc2UgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgLy8gICBjb25zb2xlLndhcm4oYFxuICAgIC8vICAgQ29tbW9uIHByYWN0aWNlIGluIHNpbmdsZSBwYWdlIGFwcGxpY2F0aW9ucyBpcyB0byB1cGRhdGUgd2hlbmV2ZXIgdGhlIHJvdXRlIGNoYW5nZXMuXG4gICAgLy8gICBuZy1pbnRlcmNvbSBzdXBwb3J0cyB0aGlzIGZ1bmN0aW9uYWxpdHkgb3V0IG9mIHRoZSBib3gganVzdCBzZXQgJ3VwZGF0ZU9uUm91dGVyQ2hhbmdlJyB0byB0cnVlIGluIHlvdXIgSW50ZXJjb20gTW9kdWxlIGNvbmZpZy5cbiAgICAvLyAgIFRoaXMgd2FybmluZyB3aWxsIG5vdCBhcHBlYXIgaW4gcHJvZHVjdGlvbiwgaWYgeW91IGNob29zZSBub3QgdG8gdXNlIHJvdXRlciB1cGRhdGluZy5cbiAgICAvLyAgIGApO1xuICAgIC8vIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB5b3UnZCBsaWtlIHRvIGNvbnRyb2wgd2hlbiBJbnRlcmNvbSBpcyBsb2FkZWQsIHlvdSBjYW4gdXNlIHRoZSAnYm9vdCcgbWV0aG9kLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBpbiBzaXR1YXRpb25zIGxpa2UgYSBvbmUtcGFnZSBKYXZhc2NyaXB0IGJhc2VkIGFwcGxpY2F0aW9uIHdoZXJlIHRoZSB1c2VyIG1heSBub3QgYmUgbG9nZ2VkIGluXG4gICAqIHdoZW4gdGhlIHBhZ2UgbG9hZHMuIFlvdSBjYWxsIHRoaXMgbWV0aG9kIHdpdGggdGhlIHN0YW5kYXJkIGludGVyY29tU2V0dGluZ3Mgb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGJvb3QoeyBhcHBfaWQsIC4uLmludGVyY29tRGF0YSB9OiBCb290SW5wdXQgPSB7fSk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoYXBwX2lkICE9PSB0aGlzLmNvbmZpZy5hcHBJZCkge1xuICAgICAgdGhpcy5jb25maWcuYXBwSWQgPSBhcHBfaWQgfHwgdGhpcy5jb25maWcuYXBwSWQ7XG4gICAgICBpZiAoKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgICB0aGlzLnNodXRkb3duKCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJ1biBsb2FkIGFuZCBhdHRhY2ggdG8gd2luZG93XG4gICAgdGhpcy5sb2FkSW50ZXJjb20odGhpcy5jb25maWcsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIC8vIHRoZW4gYm9vdCB0aGUgaW50ZXJjb20ganNcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIC4uLmludGVyY29tRGF0YSxcbiAgICAgICAgYXBwX2lkOiB0aGlzLmNvbmZpZy5hcHBJZFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ2Jvb3QnLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB5b3UgaGF2ZSB0aGUgUmVzcG9uZCBwcm9kdWN0IChjb21iaW5lZCB3aXRoIGFub3RoZXIgcHJvZHVjdCBsaWtlIEVuZ2FnZSlcbiAgICogeW91IHNob3VsZCBjYWxsIHRoZSBJbnRlcmNvbSBzaHV0ZG93biBtZXRob2QgdG8gY2xlYXIgeW91ciB1c2Vyc+KAmSBjb252ZXJzYXRpb25zIGFueXRpbWUgdGhleSBsb2dvdXRcbiAgICogb2YgeW91ciBhcHBsaWNhdGlvbi4gT3RoZXJ3aXNlLCB0aGUgY29va2llIHdlIHVzZSB0byB0cmFjayB3aG8gd2FzIG1vc3QgcmVjZW50bHkgbG9nZ2VkIGluIG9uIGEgZ2l2ZW4gZGV2aWNlXG4gICAqIG9yIGNvbXB1dGVyIHdpbGwga2VlcCB0aGVzZSBjb252ZXJzYXRpb25zIGluIHRoZSBNZXNzZW5nZXIgZm9yIG9uZSB3ZWVrLlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGVmZmVjdGl2ZWx5IGNsZWFyIG91dCBhbnkgdXNlciBkYXRhIHRoYXQgeW91IGhhdmUgYmVlbiBwYXNzaW5nIHRocm91Z2ggdGhlIEpTIEFQSS5cbiAgICovXG4gIHB1YmxpYyBzaHV0ZG93bigpOiB2b2lkIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoPGFueT53aW5kb3cpLkludGVyY29tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoPGFueT53aW5kb3cpLkludGVyY29tKCdzaHV0ZG93bicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxpbmcgdGhlIHVwZGF0ZSBtZXRob2Qgd2l0aG91dCBhbnkgb3RoZXIgYXJndW1lbnRzIHdpbGwgdHJpZ2dlciB0aGUgSmF2YVNjcmlwdCB0byBsb29rIGZvciBuZXcgbWVzc2FnZXNcbiAgICogdGhhdCBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSBjdXJyZW50IHVzZXIgKHRoZSBvbmUgd2hvc2UgZGV0YWlscyBhcmUgaW4gdGhlIHdpbmRvdy5pbnRlcmNvbVNldHRpbmdzIHZhcmlhYmxlKVxuICAgKiBhbmQgc2hvdyB0aGVtIGlmIHRoZXkgZXhpc3QuXG4gICAqXG4gICAqIENhbGxpbmcgdGhlIHVwZGF0ZSBtZXRob2Qgd2l0aCBhIEpTT04gb2JqZWN0IG9mIHVzZXIgZGV0YWlscyB3aWxsIHVwZGF0ZSB0aG9zZSBmaWVsZHMgb24gdGhlIGN1cnJlbnQgdXNlclxuICAgKiBpbiBhZGRpdGlvbiB0byBsb2dnaW5nIGFuIGltcHJlc3Npb24gYXQgdGhlIGN1cnJlbnQgVVJMIGFuZCBsb29raW5nIGZvciBuZXcgbWVzc2FnZXMgZm9yIHRoZSB1c2VyLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkYXRhPzogQW55KTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGF0YSkge1xuICAgICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ3VwZGF0ZScsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgndXBkYXRlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBoaWRlIHRoZSBtYWluIE1lc3NlbmdlciBwYW5lbCBpZiBpdCBpcyBvcGVuLiBJdCB3aWxsIG5vdCBoaWRlIHRoZSBNZXNzZW5nZXIgTGF1bmNoZXIuXG4gICAqL1xuICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoPGFueT53aW5kb3cpLkludGVyY29tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoPGFueT53aW5kb3cpLkludGVyY29tKCdoaWRlJyk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyB3aWxsIHNob3cgdGhlIE1lc3Nlbmdlci4gSWYgdGhlcmUgYXJlIG5vIGNvbnZlcnNhdGlvbnMgaXQgd2lsbCBvcGVuIHdpdGggdGhlIG5ldyBtZXNzYWdlIHZpZXcsXG4gICAqIGlmIHRoZXJlIGFyZSBpdCB3aWxsIG9wZW4gd2l0aCB0aGUgbWVzc2FnZSBsaXN0LlxuICAgKlxuICAgKiBJZiBhIGBtZXNzYWdlYCBwYXJhbWV0ZXIgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBvcGVuIGEgbmV3IG1lc3NhZ2Ugd2luZG93LCBhbGlhc2luZyBzaG93TmV3TWVzc2FnZSgpLlxuICAgKlxuICAgKi9cbiAgcHVibGljIHNob3cobWVzc2FnZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiAoPGFueT53aW5kb3cpLkludGVyY29tKCdzaG93Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dOZXdNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUbyBvcGVuIHRoZSBtZXNzYWdlIHdpbmRvdyB3aXRoIHRoZSBtZXNzYWdlIGxpc3QgeW91IGNhbiBjYWxsIGBzaG93TWVzc2FnZXMoKWAuXG4gICAqL1xuICBwdWJsaWMgc2hvd01lc3NhZ2VzKCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ3Nob3dNZXNzYWdlcycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvIG9wZW4gdGhlIG1lc3NhZ2Ugd2luZG93IHdpdGggdGhlIG5ldyBtZXNzYWdlIHZpZXcgeW91IGNhbiBjYWxsIHNob3dOZXdNZXNzYWdlKCkuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJlLXBvcHVsYXRlIHRoZSBtZXNzYWdlIGNvbXBvc2VyIGFzIHNob3duIGJlbG93LlxuICAgKi9cbiAgcHVibGljIHNob3dOZXdNZXNzYWdlKG1lc3NhZ2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoPGFueT53aW5kb3cpLkludGVyY29tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgnc2hvd05ld01lc3NhZ2UnLCBtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ3Nob3dOZXdNZXNzYWdlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFlvdSBjYW4gc3VibWl0IGFuIGV2ZW50IHVzaW5nIHRoZSB0cmFja0V2ZW50IG1ldGhvZC5cbiAgICogVGhpcyB3aWxsIGFzc29jaWF0ZSB0aGUgZXZlbnQgd2l0aCB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyIGFuZCBzZW5kIGl0IHRvIEludGVyY29tLlxuICAgKiBUaGUgZmluYWwgcGFyYW1ldGVyIGlzIGEgbWFwIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VuZCBvcHRpb25hbCBtZXRhZGF0YSBhYm91dCB0aGUgZXZlbnQuXG4gICAqXG4gICAqIFlvdSBjYW4gYWxzbyBhZGQgY3VzdG9tIGluZm9ybWF0aW9uIHRvIGV2ZW50cyBpbiB0aGUgZm9ybSBvZiBldmVudCBtZXRhZGF0YS5cbiAgICovXG4gIHB1YmxpYyB0cmFja0V2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBtZXRhZGF0YT86IGFueSk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgndHJhY2tFdmVudCcsIGV2ZW50TmFtZSwgbWV0YWRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgndHJhY2tFdmVudCcsIGV2ZW50TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgdmlzaXRvciBpcyBzb21lb25lIHdobyBnb2VzIHRvIHlvdXIgc2l0ZSBidXQgZG9lcyBub3QgdXNlIHRoZSBtZXNzZW5nZXIuXG4gICAqIFlvdSBjYW4gdHJhY2sgdGhlc2UgdmlzaXRvcnMgdmlhIHRoZSB2aXNpdG9yIHVzZXJfaWQuXG4gICAqIFRoaXMgdXNlcl9pZCBjYW4gYmUgdXNlZCB0byByZXRyaWV2ZSB0aGUgdmlzaXRvciBvciBsZWFkIHRocm91Z2ggdGhlIFJFU1QgQVBJLlxuICAgKi9cbiAgcHVibGljIGdldFZpc2l0b3JJZCgpOiBzdHJpbmcge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ2dldFZpc2l0b3JJZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciBnZXRWaXNpdG9ySWQoKVxuICAgKiBAYWxpYXMgZ2V0VmlzaXRvcklkKClcbiAgICogQHJlYWRvbmx5XG4gICAqL1xuICBnZXQgdmlzaXRvcklkKCk6IHN0cmluZyB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgnZ2V0VmlzaXRvcklkJyk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZXMgeW91IHRoZSBhYmlsaXR5IHRvIGhvb2sgaW50byB0aGUgc2hvdyBldmVudC4gUmVxdWlyZXMgYSBmdW5jdGlvbiBhcmd1bWVudC5cbiAgICovXG4gIHB1YmxpYyBvblNob3coaGFuZGxlcjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ29uU2hvdycsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVzIHlvdSB0aGUgYWJpbGl0eSB0byBob29rIGludG8gdGhlIGhpZGUgZXZlbnQuIFJlcXVpcmVzIGEgZnVuY3Rpb24gYXJndW1lbnQuXG4gICAqL1xuICBwdWJsaWMgb25IaWRlKGhhbmRsZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoPGFueT53aW5kb3cpLkludGVyY29tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoPGFueT53aW5kb3cpLkludGVyY29tKCdvbkhpZGUnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIHJlZ2lzdGVyIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBjdXJyZW50IG51bWJlciBvZiB1bnJlYWQgbWVzc2FnZXMgY2hhbmdlcy5cbiAgICovXG4gIHB1YmxpYyBvblVucmVhZENvdW50Q2hhbmdlKGhhbmRsZXI6ICh1bnJlYWRDb3VudD86IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ29uVW5yZWFkQ291bnRDaGFuZ2UnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIGluamVjdEludGVyY29tU2NyaXB0KGNvbmY6IEludGVyY29tQ29uZmlnLCBhZnRlckluamVjdENhbGxiYWNrOiAoZXY6IEV2ZW50KSA9PiBhbnkpOiB2b2lkIHtcbiAgICAvLyBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAvLyAgIHJldHVyblxuICAgIC8vIH1cblxuICAgIGNvbnN0IHMgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHMudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHMuYXN5bmMgPSB0cnVlO1xuICAgIHMuc3JjID0gYGh0dHBzOi8vd2lkZ2V0LmludGVyY29tLmlvL3dpZGdldC8ke3RoaXMuaWR9YDtcblxuICAgIGlmIChzLmF0dGFjaEV2ZW50KSB7XG4gICAgICBzLmF0dGFjaEV2ZW50KCdvbmxvYWQnLCBhZnRlckluamVjdENhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYWZ0ZXJJbmplY3RDYWxsYmFjaywgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlbmRlcmVyMiAmJiB0aGlzLnJlbmRlcmVyMi5hcHBlbmRDaGlsZCkge1xuICAgICAgdGhpcy5yZW5kZXJlcjIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCBzKTtcbiAgICB9XG5cbiAgICAoPGFueT53aW5kb3cpLkludGVyY29tKCd1cGRhdGUnLCBjb25mKTtcbiAgfVxuXG4gIGxvYWRJbnRlcmNvbShjb25maWc6IEludGVyY29tQ29uZmlnLCBhZnRlckxvYWRDYWxsYmFjazogKGV2OiBFdmVudCkgPT4gYW55KTogdm9pZCB7XG4gICAgdGhpcy5pZCA9IGNvbmZpZy5hcHBJZDtcbiAgICBjb25zdCB3ID0gPGFueT53aW5kb3c7XG4gICAgY29uc3QgaWMgPSB3LkludGVyY29tO1xuICAgIGlmICh0eXBlb2YgaWMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGljKCdyZWF0dGFjaF9hY3RpdmF0b3InKTtcbiAgICAgIGljKCd1cGRhdGUnLCBjb25maWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpOiBhbnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaS5jKGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgaS5xID0gW107XG4gICAgICBpLmMgPSBmdW5jdGlvbihhcmdzOiBhbnkpIHtcbiAgICAgICAgaS5xLnB1c2goYXJncyk7XG4gICAgICB9O1xuICAgICAgdy5JbnRlcmNvbSA9IGk7XG4gICAgICB0aGlzLmluamVjdEludGVyY29tU2NyaXB0KGNvbmZpZywgYWZ0ZXJMb2FkQ2FsbGJhY2spO1xuICAgIH1cbiAgfVxufVxuIl19
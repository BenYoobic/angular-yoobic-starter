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
var WebIntercom = /** @class */ (function () {
    // private router: Router;
    function WebIntercom(platformId, rendererFactory, document) {
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
    WebIntercom.prototype.init = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = { appId: '' }; }
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
    };
    /**
     * If you'd like to control when Intercom is loaded, you can use the 'boot' method.
     * This is useful in situations like a one-page Javascript based application where the user may not be logged in
     * when the page loads. You call this method with the standard intercomSettings object.
     */
    /**
     * If you'd like to control when Intercom is loaded, you can use the 'boot' method.
     * This is useful in situations like a one-page Javascript based application where the user may not be logged in
     * when the page loads. You call this method with the standard intercomSettings object.
     * @param {?=} __0
     * @return {?}
     */
    WebIntercom.prototype.boot = /**
     * If you'd like to control when Intercom is loaded, you can use the 'boot' method.
     * This is useful in situations like a one-page Javascript based application where the user may not be logged in
     * when the page loads. You call this method with the standard intercomSettings object.
     * @param {?=} __0
     * @return {?}
     */
    function (_a) {
        var _this = this;
        if (_a === void 0) { _a = {}; }
        var app_id = _a.app_id, intercomData = tslib_1.__rest(_a, ["app_id"]);
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
        function (event) {
            // then boot the intercom js
            /** @type {?} */
            var data = tslib_1.__assign({}, intercomData, { app_id: _this.config.appId });
            return ((/** @type {?} */ (window))).Intercom('boot', data);
        }));
    };
    /**
     * If you have the Respond product (combined with another product like Engage)
     * you should call the Intercom shutdown method to clear your users’ conversations anytime they logout
     * of your application. Otherwise, the cookie we use to track who was most recently logged in on a given device
     * or computer will keep these conversations in the Messenger for one week.
     * This method will effectively clear out any user data that you have been passing through the JS API.
     */
    /**
     * If you have the Respond product (combined with another product like Engage)
     * you should call the Intercom shutdown method to clear your users’ conversations anytime they logout
     * of your application. Otherwise, the cookie we use to track who was most recently logged in on a given device
     * or computer will keep these conversations in the Messenger for one week.
     * This method will effectively clear out any user data that you have been passing through the JS API.
     * @return {?}
     */
    WebIntercom.prototype.shutdown = /**
     * If you have the Respond product (combined with another product like Engage)
     * you should call the Intercom shutdown method to clear your users’ conversations anytime they logout
     * of your application. Otherwise, the cookie we use to track who was most recently logged in on a given device
     * or computer will keep these conversations in the Messenger for one week.
     * This method will effectively clear out any user data that you have been passing through the JS API.
     * @return {?}
     */
    function () {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('shutdown');
    };
    /**
     * Calling the update method without any other arguments will trigger the JavaScript to look for new messages
     * that should be displayed to the current user (the one whose details are in the window.intercomSettings variable)
     * and show them if they exist.
     *
     * Calling the update method with a JSON object of user details will update those fields on the current user
     * in addition to logging an impression at the current URL and looking for new messages for the user.
     */
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
    WebIntercom.prototype.update = /**
     * Calling the update method without any other arguments will trigger the JavaScript to look for new messages
     * that should be displayed to the current user (the one whose details are in the window.intercomSettings variable)
     * and show them if they exist.
     *
     * Calling the update method with a JSON object of user details will update those fields on the current user
     * in addition to logging an impression at the current URL and looking for new messages for the user.
     * @param {?=} data
     * @return {?}
     */
    function (data) {
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
    };
    /**
     * This will hide the main Messenger panel if it is open. It will not hide the Messenger Launcher.
     */
    /**
     * This will hide the main Messenger panel if it is open. It will not hide the Messenger Launcher.
     * @return {?}
     */
    WebIntercom.prototype.hide = /**
     * This will hide the main Messenger panel if it is open. It will not hide the Messenger Launcher.
     * @return {?}
     */
    function () {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('hide');
    };
    /**
     * This will show the Messenger. If there are no conversations it will open with the new message view,
     * if there are it will open with the message list.
     *
     * If a `message` parameter is supplied, it will automatically open a new message window, aliasing showNewMessage().
     *
     */
    /**
     * This will show the Messenger. If there are no conversations it will open with the new message view,
     * if there are it will open with the message list.
     *
     * If a `message` parameter is supplied, it will automatically open a new message window, aliasing showNewMessage().
     *
     * @param {?=} message
     * @return {?}
     */
    WebIntercom.prototype.show = /**
     * This will show the Messenger. If there are no conversations it will open with the new message view,
     * if there are it will open with the message list.
     *
     * If a `message` parameter is supplied, it will automatically open a new message window, aliasing showNewMessage().
     *
     * @param {?=} message
     * @return {?}
     */
    function (message) {
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
    };
    /**
     * To open the message window with the message list you can call `showMessages()`.
     */
    /**
     * To open the message window with the message list you can call `showMessages()`.
     * @return {?}
     */
    WebIntercom.prototype.showMessages = /**
     * To open the message window with the message list you can call `showMessages()`.
     * @return {?}
     */
    function () {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('showMessages');
    };
    /**
     * To open the message window with the new message view you can call showNewMessage().
     *
     * This function takes an optional parameter that can be used to pre-populate the message composer as shown below.
     */
    /**
     * To open the message window with the new message view you can call showNewMessage().
     *
     * This function takes an optional parameter that can be used to pre-populate the message composer as shown below.
     * @param {?=} message
     * @return {?}
     */
    WebIntercom.prototype.showNewMessage = /**
     * To open the message window with the new message view you can call showNewMessage().
     *
     * This function takes an optional parameter that can be used to pre-populate the message composer as shown below.
     * @param {?=} message
     * @return {?}
     */
    function (message) {
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
    };
    /**
     * You can submit an event using the trackEvent method.
     * This will associate the event with the currently logged in user and send it to Intercom.
     * The final parameter is a map that can be used to send optional metadata about the event.
     *
     * You can also add custom information to events in the form of event metadata.
     */
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
    WebIntercom.prototype.trackEvent = /**
     * You can submit an event using the trackEvent method.
     * This will associate the event with the currently logged in user and send it to Intercom.
     * The final parameter is a map that can be used to send optional metadata about the event.
     *
     * You can also add custom information to events in the form of event metadata.
     * @param {?} eventName
     * @param {?=} metadata
     * @return {?}
     */
    function (eventName, metadata) {
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
    };
    /**
     * A visitor is someone who goes to your site but does not use the messenger.
     * You can track these visitors via the visitor user_id.
     * This user_id can be used to retrieve the visitor or lead through the REST API.
     */
    /**
     * A visitor is someone who goes to your site but does not use the messenger.
     * You can track these visitors via the visitor user_id.
     * This user_id can be used to retrieve the visitor or lead through the REST API.
     * @return {?}
     */
    WebIntercom.prototype.getVisitorId = /**
     * A visitor is someone who goes to your site but does not use the messenger.
     * You can track these visitors via the visitor user_id.
     * This user_id can be used to retrieve the visitor or lead through the REST API.
     * @return {?}
     */
    function () {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('getVisitorId');
    };
    Object.defineProperty(WebIntercom.prototype, "visitorId", {
        /**
         * Alias for getVisitorId()
         * @alias getVisitorId()
         * @readonly
         */
        get: /**
         * Alias for getVisitorId()
         * \@alias getVisitorId()
         * \@readonly
         * @return {?}
         */
        function () {
            if (!isPlatformBrowser(this.platformId)) {
                return;
            }
            if (!((/** @type {?} */ (window))).Intercom) {
                return;
            }
            return ((/** @type {?} */ (window))).Intercom('getVisitorId');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gives you the ability to hook into the show event. Requires a function argument.
     */
    /**
     * Gives you the ability to hook into the show event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    WebIntercom.prototype.onShow = /**
     * Gives you the ability to hook into the show event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    function (handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('onShow', handler);
    };
    /**
     * Gives you the ability to hook into the hide event. Requires a function argument.
     */
    /**
     * Gives you the ability to hook into the hide event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    WebIntercom.prototype.onHide = /**
     * Gives you the ability to hook into the hide event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    function (handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('onHide', handler);
    };
    /**
     * This method allows you to register a function that will be called when the current number of unread messages changes.
     */
    /**
     * This method allows you to register a function that will be called when the current number of unread messages changes.
     * @param {?} handler
     * @return {?}
     */
    WebIntercom.prototype.onUnreadCountChange = /**
     * This method allows you to register a function that will be called when the current number of unread messages changes.
     * @param {?} handler
     * @return {?}
     */
    function (handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!((/** @type {?} */ (window))).Intercom) {
            return;
        }
        return ((/** @type {?} */ (window))).Intercom('onUnreadCountChange', handler);
    };
    /**
     * @param {?} conf
     * @param {?} afterInjectCallback
     * @return {?}
     */
    WebIntercom.prototype.injectIntercomScript = /**
     * @param {?} conf
     * @param {?} afterInjectCallback
     * @return {?}
     */
    function (conf, afterInjectCallback) {
        // if (!isPlatformBrowser(this.platformId)) {
        //   return
        // }
        // if (!isPlatformBrowser(this.platformId)) {
        //   return
        // }
        /** @type {?} */
        var s = this.document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = "https://widget.intercom.io/widget/" + this.id;
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
    };
    /**
     * @param {?} config
     * @param {?} afterLoadCallback
     * @return {?}
     */
    WebIntercom.prototype.loadIntercom = /**
     * @param {?} config
     * @param {?} afterLoadCallback
     * @return {?}
     */
    function (config, afterLoadCallback) {
        this.id = config.appId;
        /** @type {?} */
        var w = (/** @type {?} */ (window));
        /** @type {?} */
        var ic = w.Intercom;
        if (typeof ic === 'function') {
            ic('reattach_activator');
            ic('update', config);
        }
        else {
            /** @type {?} */
            var i_1 = (/**
             * @return {?}
             */
            function () {
                i_1.c(arguments);
            });
            i_1.q = [];
            i_1.c = (/**
             * @param {?} args
             * @return {?}
             */
            function (args) {
                i_1.q.push(args);
            });
            w.Intercom = i_1;
            this.injectIntercomScript(config, afterLoadCallback);
        }
    };
    WebIntercom.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    WebIntercom.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: RendererFactory2 },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return WebIntercom;
}());
export { WebIntercom };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWludGVyY29tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWxpdmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvaW50ZXJjb20vd2ViLWludGVyY29tLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQWlELGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVwSixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFPOUQ7SUFRRSwwQkFBMEI7SUFFMUIscUJBRWlDLFVBQWtCLEVBRXpDLGVBQWlDLEVBQ2YsUUFBUTtRQUhILGVBQVUsR0FBVixVQUFVLENBQVE7UUFFekMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2YsYUFBUSxHQUFSLFFBQVEsQ0FBQTtRQVQ1QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQVdyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU87U0FDUjtRQUVELDJDQUEyQztRQUUzQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEUsRUFBRSxFQUFFLElBQUk7WUFDUixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxNQUFNLEVBQUUsRUFBRTtZQUNWLElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQyxDQUFDO1FBRUgsOEJBQThCO0lBQ2hDLENBQUM7Ozs7O0lBQ00sMEJBQUk7Ozs7SUFBWCxVQUFZLE1BQXNDO1FBQXRDLHVCQUFBLEVBQUEsV0FBMkIsS0FBSyxFQUFFLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxhQUFh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QzVCLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEI7YUFBTTs7Z0JBQ0MsR0FBQzs7O1lBQVE7Z0JBQ2IsR0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUE7WUFDRCxHQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNULEdBQUMsQ0FBQyxDQUFDOzs7O1lBQUcsVUFBUyxJQUFTO2dCQUN0QixHQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUEsQ0FBQztZQUNGLENBQUMsQ0FBQyxRQUFRLEdBQUcsR0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3REO0lBQ0gsQ0FBQzs7Z0JBMVRGLFVBQVU7Ozs7Z0JBWW9DLE1BQU0sdUJBQWhELE1BQU0sU0FBQyxXQUFXO2dCQXJCa0UsZ0JBQWdCO2dEQXdCcEcsTUFBTSxTQUFDLFFBQVE7O0lBNFNwQixrQkFBQztDQUFBLEFBM1RELElBMlRDO1NBMVRZLFdBQVc7Ozs7OztJQUN0Qix5QkFBbUI7Ozs7O0lBRW5CLGdDQUE2Qjs7Ozs7SUFDN0IsNkJBQStCOzs7OztJQUMvQixvQ0FBdUM7Ozs7O0lBTXJDLGlDQUFpRDs7Ozs7SUFFakQsc0NBQXlDOzs7OztJQUN6QywrQkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lELCAvKk9wdGlvbmFsLCBJbmplY3RvciwgaXNEZXZNb2RlLCAqLyBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgSW50ZXJjb21Db25maWcsIEFueSwgQm9vdElucHV0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbnRlcmNvbS9pbnRlcmNvbS5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIEEgcHJvdmlkZXIgd2l0aCBldmVyeSBJbnRlcmNvbS5KUyBtZXRob2RcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYkludGVyY29tIHtcbiAgcHJpdmF0ZSBpZDogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVuZGVyZXIyOiBSZW5kZXJlcjI7XG4gIHByaXZhdGUgY29uZmlnOiBJbnRlcmNvbUNvbmZpZztcbiAgcHJpdmF0ZSBpc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIC8vIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudFxuICApIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB0aGlzLnJvdXRlciA9IHRoaXMuaW5qZWN0b3IuZ2V0KFJvdXRlcik7XG5cbiAgICB0aGlzLnJlbmRlcmVyMiA9IHRoaXMucmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKHRoaXMuZG9jdW1lbnQsIHtcbiAgICAgIGlkOiAnLTEnLFxuICAgICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICAgIHN0eWxlczogW10sXG4gICAgICBkYXRhOiB7fVxuICAgIH0pO1xuXG4gICAgLy8gU3Vic2NyaWJlIHRvIHJvdXRlciBjaGFuZ2VzXG4gIH1cbiAgcHVibGljIGluaXQoY29uZmlnOiBJbnRlcmNvbUNvbmZpZyA9IHsgYXBwSWQ6ICcnIH0pIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICBpZiAodGhpcy5pc0luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIC8vIGlmIChjb25maWcgJiYgY29uZmlnLnVwZGF0ZU9uUm91dGVyQ2hhbmdlKSB7XG4gICAgLy8gICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAvLyAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH0gZWxzZSBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAvLyAgIGNvbnNvbGUud2FybihgXG4gICAgLy8gICBDb21tb24gcHJhY3RpY2UgaW4gc2luZ2xlIHBhZ2UgYXBwbGljYXRpb25zIGlzIHRvIHVwZGF0ZSB3aGVuZXZlciB0aGUgcm91dGUgY2hhbmdlcy5cbiAgICAvLyAgIG5nLWludGVyY29tIHN1cHBvcnRzIHRoaXMgZnVuY3Rpb25hbGl0eSBvdXQgb2YgdGhlIGJveCBqdXN0IHNldCAndXBkYXRlT25Sb3V0ZXJDaGFuZ2UnIHRvIHRydWUgaW4geW91ciBJbnRlcmNvbSBNb2R1bGUgY29uZmlnLlxuICAgIC8vICAgVGhpcyB3YXJuaW5nIHdpbGwgbm90IGFwcGVhciBpbiBwcm9kdWN0aW9uLCBpZiB5b3UgY2hvb3NlIG5vdCB0byB1c2Ugcm91dGVyIHVwZGF0aW5nLlxuICAgIC8vICAgYCk7XG4gICAgLy8gfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHlvdSdkIGxpa2UgdG8gY29udHJvbCB3aGVuIEludGVyY29tIGlzIGxvYWRlZCwgeW91IGNhbiB1c2UgdGhlICdib290JyBtZXRob2QuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGluIHNpdHVhdGlvbnMgbGlrZSBhIG9uZS1wYWdlIEphdmFzY3JpcHQgYmFzZWQgYXBwbGljYXRpb24gd2hlcmUgdGhlIHVzZXIgbWF5IG5vdCBiZSBsb2dnZWQgaW5cbiAgICogd2hlbiB0aGUgcGFnZSBsb2Fkcy4gWW91IGNhbGwgdGhpcyBtZXRob2Qgd2l0aCB0aGUgc3RhbmRhcmQgaW50ZXJjb21TZXR0aW5ncyBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYm9vdCh7IGFwcF9pZCwgLi4uaW50ZXJjb21EYXRhIH06IEJvb3RJbnB1dCA9IHt9KTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChhcHBfaWQgIT09IHRoaXMuY29uZmlnLmFwcElkKSB7XG4gICAgICB0aGlzLmNvbmZpZy5hcHBJZCA9IGFwcF9pZCB8fCB0aGlzLmNvbmZpZy5hcHBJZDtcbiAgICAgIGlmICgoPGFueT53aW5kb3cpLkludGVyY29tKSB7XG4gICAgICAgIHRoaXMuc2h1dGRvd24oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUnVuIGxvYWQgYW5kIGF0dGFjaCB0byB3aW5kb3dcbiAgICB0aGlzLmxvYWRJbnRlcmNvbSh0aGlzLmNvbmZpZywgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgLy8gdGhlbiBib290IHRoZSBpbnRlcmNvbSBqc1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgLi4uaW50ZXJjb21EYXRhLFxuICAgICAgICBhcHBfaWQ6IHRoaXMuY29uZmlnLmFwcElkXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgnYm9vdCcsIGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHlvdSBoYXZlIHRoZSBSZXNwb25kIHByb2R1Y3QgKGNvbWJpbmVkIHdpdGggYW5vdGhlciBwcm9kdWN0IGxpa2UgRW5nYWdlKVxuICAgKiB5b3Ugc2hvdWxkIGNhbGwgdGhlIEludGVyY29tIHNodXRkb3duIG1ldGhvZCB0byBjbGVhciB5b3VyIHVzZXJz4oCZIGNvbnZlcnNhdGlvbnMgYW55dGltZSB0aGV5IGxvZ291dFxuICAgKiBvZiB5b3VyIGFwcGxpY2F0aW9uLiBPdGhlcndpc2UsIHRoZSBjb29raWUgd2UgdXNlIHRvIHRyYWNrIHdobyB3YXMgbW9zdCByZWNlbnRseSBsb2dnZWQgaW4gb24gYSBnaXZlbiBkZXZpY2VcbiAgICogb3IgY29tcHV0ZXIgd2lsbCBrZWVwIHRoZXNlIGNvbnZlcnNhdGlvbnMgaW4gdGhlIE1lc3NlbmdlciBmb3Igb25lIHdlZWsuXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgZWZmZWN0aXZlbHkgY2xlYXIgb3V0IGFueSB1c2VyIGRhdGEgdGhhdCB5b3UgaGF2ZSBiZWVuIHBhc3NpbmcgdGhyb3VnaCB0aGUgSlMgQVBJLlxuICAgKi9cbiAgcHVibGljIHNodXRkb3duKCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ3NodXRkb3duJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGluZyB0aGUgdXBkYXRlIG1ldGhvZCB3aXRob3V0IGFueSBvdGhlciBhcmd1bWVudHMgd2lsbCB0cmlnZ2VyIHRoZSBKYXZhU2NyaXB0IHRvIGxvb2sgZm9yIG5ldyBtZXNzYWdlc1xuICAgKiB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIGN1cnJlbnQgdXNlciAodGhlIG9uZSB3aG9zZSBkZXRhaWxzIGFyZSBpbiB0aGUgd2luZG93LmludGVyY29tU2V0dGluZ3MgdmFyaWFibGUpXG4gICAqIGFuZCBzaG93IHRoZW0gaWYgdGhleSBleGlzdC5cbiAgICpcbiAgICogQ2FsbGluZyB0aGUgdXBkYXRlIG1ldGhvZCB3aXRoIGEgSlNPTiBvYmplY3Qgb2YgdXNlciBkZXRhaWxzIHdpbGwgdXBkYXRlIHRob3NlIGZpZWxkcyBvbiB0aGUgY3VycmVudCB1c2VyXG4gICAqIGluIGFkZGl0aW9uIHRvIGxvZ2dpbmcgYW4gaW1wcmVzc2lvbiBhdCB0aGUgY3VycmVudCBVUkwgYW5kIGxvb2tpbmcgZm9yIG5ldyBtZXNzYWdlcyBmb3IgdGhlIHVzZXIuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRhdGE/OiBBbnkpOiB2b2lkIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoPGFueT53aW5kb3cpLkludGVyY29tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkYXRhKSB7XG4gICAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgndXBkYXRlJywgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoPGFueT53aW5kb3cpLkludGVyY29tKCd1cGRhdGUnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyB3aWxsIGhpZGUgdGhlIG1haW4gTWVzc2VuZ2VyIHBhbmVsIGlmIGl0IGlzIG9wZW4uIEl0IHdpbGwgbm90IGhpZGUgdGhlIE1lc3NlbmdlciBMYXVuY2hlci5cbiAgICovXG4gIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ2hpZGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgc2hvdyB0aGUgTWVzc2VuZ2VyLiBJZiB0aGVyZSBhcmUgbm8gY29udmVyc2F0aW9ucyBpdCB3aWxsIG9wZW4gd2l0aCB0aGUgbmV3IG1lc3NhZ2UgdmlldyxcbiAgICogaWYgdGhlcmUgYXJlIGl0IHdpbGwgb3BlbiB3aXRoIHRoZSBtZXNzYWdlIGxpc3QuXG4gICAqXG4gICAqIElmIGEgYG1lc3NhZ2VgIHBhcmFtZXRlciBpcyBzdXBwbGllZCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IG9wZW4gYSBuZXcgbWVzc2FnZSB3aW5kb3csIGFsaWFzaW5nIHNob3dOZXdNZXNzYWdlKCkuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgc2hvdyhtZXNzYWdlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobWVzc2FnZSkge1xuICAgICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ3Nob3cnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2hvd05ld01lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvIG9wZW4gdGhlIG1lc3NhZ2Ugd2luZG93IHdpdGggdGhlIG1lc3NhZ2UgbGlzdCB5b3UgY2FuIGNhbGwgYHNob3dNZXNzYWdlcygpYC5cbiAgICovXG4gIHB1YmxpYyBzaG93TWVzc2FnZXMoKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgnc2hvd01lc3NhZ2VzJyk7XG4gIH1cblxuICAvKipcbiAgICogVG8gb3BlbiB0aGUgbWVzc2FnZSB3aW5kb3cgd2l0aCB0aGUgbmV3IG1lc3NhZ2UgdmlldyB5b3UgY2FuIGNhbGwgc2hvd05ld01lc3NhZ2UoKS5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhbiBvcHRpb25hbCBwYXJhbWV0ZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBwcmUtcG9wdWxhdGUgdGhlIG1lc3NhZ2UgY29tcG9zZXIgYXMgc2hvd24gYmVsb3cuXG4gICAqL1xuICBwdWJsaWMgc2hvd05ld01lc3NhZ2UobWVzc2FnZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiAoPGFueT53aW5kb3cpLkludGVyY29tKCdzaG93TmV3TWVzc2FnZScsIG1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgnc2hvd05ld01lc3NhZ2UnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogWW91IGNhbiBzdWJtaXQgYW4gZXZlbnQgdXNpbmcgdGhlIHRyYWNrRXZlbnQgbWV0aG9kLlxuICAgKiBUaGlzIHdpbGwgYXNzb2NpYXRlIHRoZSBldmVudCB3aXRoIHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXIgYW5kIHNlbmQgaXQgdG8gSW50ZXJjb20uXG4gICAqIFRoZSBmaW5hbCBwYXJhbWV0ZXIgaXMgYSBtYXAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZW5kIG9wdGlvbmFsIG1ldGFkYXRhIGFib3V0IHRoZSBldmVudC5cbiAgICpcbiAgICogWW91IGNhbiBhbHNvIGFkZCBjdXN0b20gaW5mb3JtYXRpb24gdG8gZXZlbnRzIGluIHRoZSBmb3JtIG9mIGV2ZW50IG1ldGFkYXRhLlxuICAgKi9cbiAgcHVibGljIHRyYWNrRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIG1ldGFkYXRhPzogYW55KTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgIHJldHVybiAoPGFueT53aW5kb3cpLkludGVyY29tKCd0cmFja0V2ZW50JywgZXZlbnROYW1lLCBtZXRhZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoPGFueT53aW5kb3cpLkludGVyY29tKCd0cmFja0V2ZW50JywgZXZlbnROYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSB2aXNpdG9yIGlzIHNvbWVvbmUgd2hvIGdvZXMgdG8geW91ciBzaXRlIGJ1dCBkb2VzIG5vdCB1c2UgdGhlIG1lc3Nlbmdlci5cbiAgICogWW91IGNhbiB0cmFjayB0aGVzZSB2aXNpdG9ycyB2aWEgdGhlIHZpc2l0b3IgdXNlcl9pZC5cbiAgICogVGhpcyB1c2VyX2lkIGNhbiBiZSB1c2VkIHRvIHJldHJpZXZlIHRoZSB2aXNpdG9yIG9yIGxlYWQgdGhyb3VnaCB0aGUgUkVTVCBBUEkuXG4gICAqL1xuICBwdWJsaWMgZ2V0VmlzaXRvcklkKCk6IHN0cmluZyB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgnZ2V0VmlzaXRvcklkJyk7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIGdldFZpc2l0b3JJZCgpXG4gICAqIEBhbGlhcyBnZXRWaXNpdG9ySWQoKVxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIGdldCB2aXNpdG9ySWQoKTogc3RyaW5nIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoPGFueT53aW5kb3cpLkludGVyY29tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoPGFueT53aW5kb3cpLkludGVyY29tKCdnZXRWaXNpdG9ySWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlcyB5b3UgdGhlIGFiaWxpdHkgdG8gaG9vayBpbnRvIHRoZSBzaG93IGV2ZW50LiBSZXF1aXJlcyBhIGZ1bmN0aW9uIGFyZ3VtZW50LlxuICAgKi9cbiAgcHVibGljIG9uU2hvdyhoYW5kbGVyOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgnb25TaG93JywgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZXMgeW91IHRoZSBhYmlsaXR5IHRvIGhvb2sgaW50byB0aGUgaGlkZSBldmVudC4gUmVxdWlyZXMgYSBmdW5jdGlvbiBhcmd1bWVudC5cbiAgICovXG4gIHB1YmxpYyBvbkhpZGUoaGFuZGxlcjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISg8YW55PndpbmRvdykuSW50ZXJjb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oJ29uSGlkZScsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFsbG93cyB5b3UgdG8gcmVnaXN0ZXIgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHVucmVhZCBtZXNzYWdlcyBjaGFuZ2VzLlxuICAgKi9cbiAgcHVibGljIG9uVW5yZWFkQ291bnRDaGFuZ2UoaGFuZGxlcjogKHVucmVhZENvdW50PzogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKDxhbnk+d2luZG93KS5JbnRlcmNvbSgnb25VbnJlYWRDb3VudENoYW5nZScsIGhhbmRsZXIpO1xuICB9XG5cbiAgaW5qZWN0SW50ZXJjb21TY3JpcHQoY29uZjogSW50ZXJjb21Db25maWcsIGFmdGVySW5qZWN0Q2FsbGJhY2s6IChldjogRXZlbnQpID0+IGFueSk6IHZvaWQge1xuICAgIC8vIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgIC8vICAgcmV0dXJuXG4gICAgLy8gfVxuXG4gICAgY29uc3QgcyA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgcy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgcy5hc3luYyA9IHRydWU7XG4gICAgcy5zcmMgPSBgaHR0cHM6Ly93aWRnZXQuaW50ZXJjb20uaW8vd2lkZ2V0LyR7dGhpcy5pZH1gO1xuXG4gICAgaWYgKHMuYXR0YWNoRXZlbnQpIHtcbiAgICAgIHMuYXR0YWNoRXZlbnQoJ29ubG9hZCcsIGFmdGVySW5qZWN0Q2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBhZnRlckluamVjdENhbGxiYWNrLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVuZGVyZXIyICYmIHRoaXMucmVuZGVyZXIyLmFwcGVuZENoaWxkKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyMi5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHMpO1xuICAgIH1cblxuICAgICg8YW55PndpbmRvdykuSW50ZXJjb20oJ3VwZGF0ZScsIGNvbmYpO1xuICB9XG5cbiAgbG9hZEludGVyY29tKGNvbmZpZzogSW50ZXJjb21Db25maWcsIGFmdGVyTG9hZENhbGxiYWNrOiAoZXY6IEV2ZW50KSA9PiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmlkID0gY29uZmlnLmFwcElkO1xuICAgIGNvbnN0IHcgPSA8YW55PndpbmRvdztcbiAgICBjb25zdCBpYyA9IHcuSW50ZXJjb207XG4gICAgaWYgKHR5cGVvZiBpYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWMoJ3JlYXR0YWNoX2FjdGl2YXRvcicpO1xuICAgICAgaWMoJ3VwZGF0ZScsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGk6IGFueSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpLmMoYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBpLnEgPSBbXTtcbiAgICAgIGkuYyA9IGZ1bmN0aW9uKGFyZ3M6IGFueSkge1xuICAgICAgICBpLnEucHVzaChhcmdzKTtcbiAgICAgIH07XG4gICAgICB3LkludGVyY29tID0gaTtcbiAgICAgIHRoaXMuaW5qZWN0SW50ZXJjb21TY3JpcHQoY29uZmlnLCBhZnRlckxvYWRDYWxsYmFjayk7XG4gICAgfVxuICB9XG59XG4iXX0=
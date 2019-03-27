/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '@shared/common';
import { Authentication, Config, Session } from '@shared/data-core';
import { Subject } from 'rxjs';
import { Intercom as IntercomNative } from '@ionic-native/intercom/ngx';
import { toDate, unix } from '@shared/stencil';
import { WebIntercom } from './web-intercom.service';
var Intercom = /** @class */ (function () {
    function Intercom(coreConfig, config, intercomNative, authentication, session, webIntercom) {
        var _this = this;
        this.coreConfig = coreConfig;
        this.config = config;
        this.intercomNative = intercomNative;
        this.authentication = authentication;
        this.session = session;
        this.webIntercom = webIntercom;
        this.unreadCount$ = new Subject();
        this.authentication.login$.subscribe((/**
         * @return {?}
         */
        function () { return _this.init(); }));
        this.authentication.logout$.subscribe((/**
         * @return {?}
         */
        function () { return _this.logout(); }));
        this.authentication.profileUpdated$.subscribe((/**
         * @param {?} user
         * @return {?}
         */
        function (user) { return _this.identify(user); }));
    }
    Object.defineProperty(Intercom.prototype, "app_id", {
        get: /**
         * @protected
         * @return {?}
         */
        function () {
            return this.config.serverName === 'Production' ? this.coreConfig.getKey('intercomIdProd') : this.coreConfig.getKey('intercomIdDev');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Intercom.prototype.isEnabled = /**
     * @return {?}
     */
    function () {
        if (this.config.isE2E) {
            return false;
        }
        if (this.coreConfig.isLocalhost() && !this.coreConfig.isCordova()) {
            return false;
        }
        return true;
    };
    /**
     * @return {?}
     */
    Intercom.prototype.init = /**
     * @return {?}
     */
    function () {
        // initialize intercom when lauching the app or log in
        if (!this.isEnabled()) {
            return;
        }
        if (!this.coreConfig.isCordova()) {
            this.webIntercom.init({ appId: this.app_id });
            this.webIntercom.boot({
                app_id: this.app_id,
                hide_default_launcher: true
            });
            // if (window.Intercom) {
            //     window.Intercom('boot', {
            //         app_id: this.app_id,
            //         hide_default_launcher: true
            //     });
            // }
        }
        else {
            // register identified user only if the app is loggedin
            if (this.authentication.isLoggedIn() && this.session.userId) {
                this.intercomNative.setLauncherVisibility('GONE');
                this.intercomNative.registerIdentifiedUser({ userId: this.session.userId });
            }
        }
    };
    /**
     * @return {?}
     */
    Intercom.prototype.registerForPush = /**
     * @return {?}
     */
    function () {
        if (this.coreConfig.isCordova()) {
            this.intercomNative.registerForPush();
        }
    };
    /**
     * @return {?}
     */
    Intercom.prototype.logout = /**
     * @return {?}
     */
    function () {
        if (!this.isEnabled()) {
            return;
        }
        // This resets the Intercom integration's cache of your user's identity and wipes the slate clean and also hide the launcher.
        if (!this.coreConfig.isCordova()) {
            this.webIntercom.shutdown();
            // if (window.Intercom) {
            //     window.Intercom('shutdown');
            // }
        }
        else {
            this.intercomNative.reset();
            //this.ionicIntercom.setLauncherVisibility('HIDE');
        }
    };
    /**
     * @param {?} user
     * @return {?}
     */
    Intercom.prototype.identify = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        var _this = this;
        if (!this.isEnabled() || !user) {
            return;
        }
        /** @type {?} */
        var traits = {
            user_id: user._id,
            language_override: user.language,
            avatar: {
                type: 'avatar',
                image_url: user.imageData
            },
            email: user.email || user.username,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: unix(toDate(user._ect)),
            phone: user.telephone,
            gender: user.gender,
            device: user.device,
            target: this.coreConfig.getFullAppName(),
            company: user.company,
            role: user.role,
            tenant: user._tenant ? user._tenant.name : '',
            hide_default_launcher: true //,
            //logrocketURL: 'https://app.logrocket.com/' + this.coreConfig.getKey('logrocketId') + '+/sessions?u=' + user._id
            //custom_launcher_selector: '#intercom_launcher'
        };
        if (!this.coreConfig.isCordova()) {
            this.webIntercom.update(traits);
            this.webIntercom.onUnreadCountChange((/**
             * @param {?} unreadCount
             * @return {?}
             */
            function (unreadCount) {
                _this.unreadCount$.next(unreadCount);
            }));
            // if (window.Intercom) {
            //     window.Intercom('update', traits);
            //     window.Intercom('onUnreadCountChange', (unreadCount) => {
            //         this.unreadCount$.next(unreadCount);
            //     });
            // }
        }
        else {
            this.intercomNative.updateUser(traits);
            this.intercomNative.unreadConversationCount().then((/**
             * @param {?} unreadCount
             * @return {?}
             */
            function (unreadCount) {
                _this.unreadCount$.next(unreadCount);
            }));
        }
    };
    /**
     * @param {?} eventName
     * @param {?} metaData
     * @return {?}
     */
    Intercom.prototype.trackEvent = /**
     * @param {?} eventName
     * @param {?} metaData
     * @return {?}
     */
    function (eventName, metaData) {
        if (!this.coreConfig.isCordova()) {
            this.webIntercom.trackEvent(eventName, metaData);
        }
        else {
            this.intercomNative.logEvent(eventName, metaData);
        }
    };
    /**
     * @param {?} metaData
     * @return {?}
     */
    Intercom.prototype.update = /**
     * @param {?} metaData
     * @return {?}
     */
    function (metaData) {
        if (!this.coreConfig.isCordova()) {
            this.webIntercom.update(metaData);
        }
        else {
            this.intercomNative.updateUser(metaData);
        }
    };
    /**
     * @return {?}
     */
    Intercom.prototype.show = /**
     * @return {?}
     */
    function () {
        if (!this.isEnabled()) {
            return;
        }
        if (!this.coreConfig.isCordova()) {
            this.webIntercom.show();
            // if (window.Intercom) {
            //     window.Intercom('show');
            // }
        }
        else {
            this.intercomNative.displayMessenger();
        }
    };
    Intercom.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Intercom.ctorParameters = function () { return [
        { type: CoreConfig },
        { type: Config },
        { type: IntercomNative },
        { type: Authentication },
        { type: Session },
        { type: WebIntercom }
    ]; };
    return Intercom;
}());
export { Intercom };
if (false) {
    /** @type {?} */
    Intercom.prototype.unreadCount$;
    /**
     * @type {?}
     * @protected
     */
    Intercom.prototype.coreConfig;
    /**
     * @type {?}
     * @protected
     */
    Intercom.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Intercom.prototype.intercomNative;
    /**
     * @type {?}
     * @protected
     */
    Intercom.prototype.authentication;
    /**
     * @type {?}
     * @protected
     */
    Intercom.prototype.session;
    /**
     * @type {?}
     * @protected
     */
    Intercom.prototype.webIntercom;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjb20uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9pbnRlcmNvbS9pbnRlcmNvbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFRLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxRQUFRLElBQUksY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFckQ7SUFRRSxrQkFBc0IsVUFBc0IsRUFBWSxNQUFjLEVBQVksY0FBOEIsRUFBWSxjQUE4QixFQUFZLE9BQWdCLEVBQVksV0FBd0I7UUFBMU4saUJBSUM7UUFKcUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFZLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBWSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBWSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVksZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFObk4saUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTzFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVM7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxFQUFFLEVBQVgsQ0FBVyxFQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxP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UjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIseUJBQXlCO1lBQ3pCLCtCQUErQjtZQUMvQixJQUFJO1NBQ0w7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN4QztJQUNILENBQUM7O2dCQWxKRixVQUFVOzs7O2dCQVJGLFVBQVU7Z0JBQ1ksTUFBTTtnQkFFaEIsY0FBYztnQkFGMUIsY0FBYztnQkFBZ0IsT0FBTztnQkFLckMsV0FBVzs7SUFxSnBCLGVBQUM7Q0FBQSxBQW5KRCxJQW1KQztTQWxKWSxRQUFROzs7SUFDbkIsZ0NBQTRDOzs7OztJQU1oQyw4QkFBZ0M7Ozs7O0lBQUUsMEJBQXdCOzs7OztJQUFFLGtDQUF3Qzs7Ozs7SUFBRSxrQ0FBd0M7Ozs7O0lBQUUsMkJBQTBCOzs7OztJQUFFLCtCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVDb25maWcgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiwgVXNlciwgQ29uZmlnLCBTZXNzaW9uIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW50ZXJjb20gYXMgSW50ZXJjb21OYXRpdmUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2ludGVyY29tL25neCc7XG5pbXBvcnQgeyB0b0RhdGUsIHVuaXggfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBXZWJJbnRlcmNvbSB9IGZyb20gJy4vd2ViLWludGVyY29tLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW50ZXJjb20ge1xuICBwdWJsaWMgdW5yZWFkQ291bnQkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIHByb3RlY3RlZCBnZXQgYXBwX2lkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5zZXJ2ZXJOYW1lID09PSAnUHJvZHVjdGlvbicgPyB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdpbnRlcmNvbUlkUHJvZCcpIDogdGhpcy5jb3JlQ29uZmlnLmdldEtleSgnaW50ZXJjb21JZERldicpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZywgcHJvdGVjdGVkIGludGVyY29tTmF0aXZlOiBJbnRlcmNvbU5hdGl2ZSwgcHJvdGVjdGVkIGF1dGhlbnRpY2F0aW9uOiBBdXRoZW50aWNhdGlvbiwgcHJvdGVjdGVkIHNlc3Npb246IFNlc3Npb24sIHByb3RlY3RlZCB3ZWJJbnRlcmNvbTogV2ViSW50ZXJjb20pIHtcbiAgICB0aGlzLmF1dGhlbnRpY2F0aW9uLmxvZ2luJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pbml0KCkpO1xuICAgIHRoaXMuYXV0aGVudGljYXRpb24ubG9nb3V0JC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5sb2dvdXQoKSk7XG4gICAgdGhpcy5hdXRoZW50aWNhdGlvbi5wcm9maWxlVXBkYXRlZCQuc3Vic2NyaWJlKHVzZXIgPT4gdGhpcy5pZGVudGlmeSh1c2VyKSk7XG4gIH1cblxuICBpc0VuYWJsZWQoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmlzRTJFKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNMb2NhbGhvc3QoKSAmJiAhdGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBpbml0aWFsaXplIGludGVyY29tIHdoZW4gbGF1Y2hpbmcgdGhlIGFwcCBvciBsb2cgaW5cbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHRoaXMud2ViSW50ZXJjb20uaW5pdCh7IGFwcElkOiB0aGlzLmFwcF9pZCB9KTtcbiAgICAgIHRoaXMud2ViSW50ZXJjb20uYm9vdCh7XG4gICAgICAgIGFwcF9pZDogdGhpcy5hcHBfaWQsXG4gICAgICAgIGhpZGVfZGVmYXVsdF9sYXVuY2hlcjogdHJ1ZVxuICAgICAgfSk7XG4gICAgICAvLyBpZiAod2luZG93LkludGVyY29tKSB7XG4gICAgICAvLyAgICAgd2luZG93LkludGVyY29tKCdib290Jywge1xuICAgICAgLy8gICAgICAgICBhcHBfaWQ6IHRoaXMuYXBwX2lkLFxuICAgICAgLy8gICAgICAgICBoaWRlX2RlZmF1bHRfbGF1bmNoZXI6IHRydWVcbiAgICAgIC8vICAgICB9KTtcbiAgICAgIC8vIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVnaXN0ZXIgaWRlbnRpZmllZCB1c2VyIG9ubHkgaWYgdGhlIGFwcCBpcyBsb2dnZWRpblxuICAgICAgaWYgKHRoaXMuYXV0aGVudGljYXRpb24uaXNMb2dnZWRJbigpICYmIHRoaXMuc2Vzc2lvbi51c2VySWQpIHtcbiAgICAgICAgdGhpcy5pbnRlcmNvbU5hdGl2ZS5zZXRMYXVuY2hlclZpc2liaWxpdHkoJ0dPTkUnKTtcbiAgICAgICAgdGhpcy5pbnRlcmNvbU5hdGl2ZS5yZWdpc3RlcklkZW50aWZpZWRVc2VyKHsgdXNlcklkOiB0aGlzLnNlc3Npb24udXNlcklkIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyRm9yUHVzaCgpIHtcbiAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpKSB7XG4gICAgICB0aGlzLmludGVyY29tTmF0aXZlLnJlZ2lzdGVyRm9yUHVzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ291dCgpIHtcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVGhpcyByZXNldHMgdGhlIEludGVyY29tIGludGVncmF0aW9uJ3MgY2FjaGUgb2YgeW91ciB1c2VyJ3MgaWRlbnRpdHkgYW5kIHdpcGVzIHRoZSBzbGF0ZSBjbGVhbiBhbmQgYWxzbyBoaWRlIHRoZSBsYXVuY2hlci5cbiAgICBpZiAoIXRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSkge1xuICAgICAgdGhpcy53ZWJJbnRlcmNvbS5zaHV0ZG93bigpO1xuICAgICAgLy8gaWYgKHdpbmRvdy5JbnRlcmNvbSkge1xuICAgICAgLy8gICAgIHdpbmRvdy5JbnRlcmNvbSgnc2h1dGRvd24nKTtcbiAgICAgIC8vIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnRlcmNvbU5hdGl2ZS5yZXNldCgpO1xuICAgICAgLy90aGlzLmlvbmljSW50ZXJjb20uc2V0TGF1bmNoZXJWaXNpYmlsaXR5KCdISURFJyk7XG4gICAgfVxuICB9XG5cbiAgaWRlbnRpZnkodXNlcjogVXNlcikge1xuICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSB8fCAhdXNlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdHJhaXRzID0ge1xuICAgICAgdXNlcl9pZDogdXNlci5faWQsXG4gICAgICBsYW5ndWFnZV9vdmVycmlkZTogdXNlci5sYW5ndWFnZSxcbiAgICAgIGF2YXRhcjoge1xuICAgICAgICB0eXBlOiAnYXZhdGFyJyxcbiAgICAgICAgaW1hZ2VfdXJsOiB1c2VyLmltYWdlRGF0YVxuICAgICAgfSxcbiAgICAgIGVtYWlsOiB1c2VyLmVtYWlsIHx8IHVzZXIudXNlcm5hbWUsXG4gICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgIGZpcnN0TmFtZTogdXNlci5maXJzdE5hbWUsXG4gICAgICBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcbiAgICAgIGNyZWF0ZWRBdDogdW5peCh0b0RhdGUodXNlci5fZWN0KSksXG4gICAgICBwaG9uZTogdXNlci50ZWxlcGhvbmUsXG4gICAgICBnZW5kZXI6IHVzZXIuZ2VuZGVyLFxuICAgICAgZGV2aWNlOiB1c2VyLmRldmljZSxcbiAgICAgIHRhcmdldDogdGhpcy5jb3JlQ29uZmlnLmdldEZ1bGxBcHBOYW1lKCksXG4gICAgICBjb21wYW55OiB1c2VyLmNvbXBhbnksXG4gICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICB0ZW5hbnQ6IHVzZXIuX3RlbmFudCA/IHVzZXIuX3RlbmFudC5uYW1lIDogJycsXG4gICAgICBoaWRlX2RlZmF1bHRfbGF1bmNoZXI6IHRydWUgLy8sXG4gICAgICAvL2xvZ3JvY2tldFVSTDogJ2h0dHBzOi8vYXBwLmxvZ3JvY2tldC5jb20vJyArIHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ2xvZ3JvY2tldElkJykgKyAnKy9zZXNzaW9ucz91PScgKyB1c2VyLl9pZFxuICAgICAgLy9jdXN0b21fbGF1bmNoZXJfc2VsZWN0b3I6ICcjaW50ZXJjb21fbGF1bmNoZXInXG4gICAgfTtcbiAgICBpZiAoIXRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSkge1xuICAgICAgdGhpcy53ZWJJbnRlcmNvbS51cGRhdGUodHJhaXRzKTtcbiAgICAgIHRoaXMud2ViSW50ZXJjb20ub25VbnJlYWRDb3VudENoYW5nZSh1bnJlYWRDb3VudCA9PiB7XG4gICAgICAgIHRoaXMudW5yZWFkQ291bnQkLm5leHQodW5yZWFkQ291bnQpO1xuICAgICAgfSk7XG4gICAgICAvLyBpZiAod2luZG93LkludGVyY29tKSB7XG4gICAgICAvLyAgICAgd2luZG93LkludGVyY29tKCd1cGRhdGUnLCB0cmFpdHMpO1xuICAgICAgLy8gICAgIHdpbmRvdy5JbnRlcmNvbSgnb25VbnJlYWRDb3VudENoYW5nZScsICh1bnJlYWRDb3VudCkgPT4ge1xuICAgICAgLy8gICAgICAgICB0aGlzLnVucmVhZENvdW50JC5uZXh0KHVucmVhZENvdW50KTtcbiAgICAgIC8vICAgICB9KTtcbiAgICAgIC8vIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnRlcmNvbU5hdGl2ZS51cGRhdGVVc2VyKHRyYWl0cyk7XG4gICAgICB0aGlzLmludGVyY29tTmF0aXZlLnVucmVhZENvbnZlcnNhdGlvbkNvdW50KCkudGhlbih1bnJlYWRDb3VudCA9PiB7XG4gICAgICAgIHRoaXMudW5yZWFkQ291bnQkLm5leHQodW5yZWFkQ291bnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdHJhY2tFdmVudChldmVudE5hbWU6IHN0cmluZywgbWV0YURhdGE6IGFueSkge1xuICAgIGlmICghdGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpKSB7XG4gICAgICB0aGlzLndlYkludGVyY29tLnRyYWNrRXZlbnQoZXZlbnROYW1lLCBtZXRhRGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW50ZXJjb21OYXRpdmUubG9nRXZlbnQoZXZlbnROYW1lLCBtZXRhRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG1ldGFEYXRhOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSkge1xuICAgICAgdGhpcy53ZWJJbnRlcmNvbS51cGRhdGUobWV0YURhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmludGVyY29tTmF0aXZlLnVwZGF0ZVVzZXIobWV0YURhdGEpO1xuICAgIH1cbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpKSB7XG4gICAgICB0aGlzLndlYkludGVyY29tLnNob3coKTtcbiAgICAgIC8vIGlmICh3aW5kb3cuSW50ZXJjb20pIHtcbiAgICAgIC8vICAgICB3aW5kb3cuSW50ZXJjb20oJ3Nob3cnKTtcbiAgICAgIC8vIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnRlcmNvbU5hdGl2ZS5kaXNwbGF5TWVzc2VuZ2VyKCk7XG4gICAgfVxuICB9XG59XG4iXX0=
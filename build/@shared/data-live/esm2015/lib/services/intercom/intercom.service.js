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
export class Intercom {
    /**
     * @param {?} coreConfig
     * @param {?} config
     * @param {?} intercomNative
     * @param {?} authentication
     * @param {?} session
     * @param {?} webIntercom
     */
    constructor(coreConfig, config, intercomNative, authentication, session, webIntercom) {
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
        () => this.init()));
        this.authentication.logout$.subscribe((/**
         * @return {?}
         */
        () => this.logout()));
        this.authentication.profileUpdated$.subscribe((/**
         * @param {?} user
         * @return {?}
         */
        user => this.identify(user)));
    }
    /**
     * @protected
     * @return {?}
     */
    get app_id() {
        return this.config.serverName === 'Production' ? this.coreConfig.getKey('intercomIdProd') : this.coreConfig.getKey('intercomIdDev');
    }
    /**
     * @return {?}
     */
    isEnabled() {
        if (this.config.isE2E) {
            return false;
        }
        if (this.coreConfig.isLocalhost() && !this.coreConfig.isCordova()) {
            return false;
        }
        return true;
    }
    /**
     * @return {?}
     */
    init() {
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
    }
    /**
     * @return {?}
     */
    registerForPush() {
        if (this.coreConfig.isCordova()) {
            this.intercomNative.registerForPush();
        }
    }
    /**
     * @return {?}
     */
    logout() {
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
    }
    /**
     * @param {?} user
     * @return {?}
     */
    identify(user) {
        if (!this.isEnabled() || !user) {
            return;
        }
        /** @type {?} */
        let traits = {
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
            unreadCount => {
                this.unreadCount$.next(unreadCount);
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
            unreadCount => {
                this.unreadCount$.next(unreadCount);
            }));
        }
    }
    /**
     * @param {?} eventName
     * @param {?} metaData
     * @return {?}
     */
    trackEvent(eventName, metaData) {
        if (!this.coreConfig.isCordova()) {
            this.webIntercom.trackEvent(eventName, metaData);
        }
        else {
            this.intercomNative.logEvent(eventName, metaData);
        }
    }
    /**
     * @param {?} metaData
     * @return {?}
     */
    update(metaData) {
        if (!this.coreConfig.isCordova()) {
            this.webIntercom.update(metaData);
        }
        else {
            this.intercomNative.updateUser(metaData);
        }
    }
    /**
     * @return {?}
     */
    show() {
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
    }
}
Intercom.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Intercom.ctorParameters = () => [
    { type: CoreConfig },
    { type: Config },
    { type: IntercomNative },
    { type: Authentication },
    { type: Session },
    { type: WebIntercom }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjb20uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9pbnRlcmNvbS9pbnRlcmNvbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFRLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxRQUFRLElBQUksY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHckQsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7OztJQU9uQixZQUFzQixVQUFzQixFQUFZLE1BQWMsRUFBWSxjQUE4QixFQUFZLGNBQThCLEVBQVksT0FBZ0IsRUFBWSxXQUF3QjtRQUFwTSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBWSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQU5uTixpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFPMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMs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eEIseUJBQXlCO1lBQ3pCLCtCQUErQjtZQUMvQixJQUFJO1NBQ0w7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN4QztJQUNILENBQUM7OztZQWxKRixVQUFVOzs7O1lBUkYsVUFBVTtZQUNZLE1BQU07WUFFaEIsY0FBYztZQUYxQixjQUFjO1lBQWdCLE9BQU87WUFLckMsV0FBVzs7OztJQUlsQixnQ0FBNEM7Ozs7O0lBTWhDLDhCQUFnQzs7Ozs7SUFBRSwwQkFBd0I7Ozs7O0lBQUUsa0NBQXdDOzs7OztJQUFFLGtDQUF3Qzs7Ozs7SUFBRSwyQkFBMEI7Ozs7O0lBQUUsK0JBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZUNvbmZpZyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uLCBVc2VyLCBDb25maWcsIFNlc3Npb24gfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbnRlcmNvbSBhcyBJbnRlcmNvbU5hdGl2ZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvaW50ZXJjb20vbmd4JztcbmltcG9ydCB7IHRvRGF0ZSwgdW5peCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmltcG9ydCB7IFdlYkludGVyY29tIH0gZnJvbSAnLi93ZWItaW50ZXJjb20uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnRlcmNvbSB7XG4gIHB1YmxpYyB1bnJlYWRDb3VudCQgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgcHJvdGVjdGVkIGdldCBhcHBfaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnNlcnZlck5hbWUgPT09ICdQcm9kdWN0aW9uJyA/IHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ2ludGVyY29tSWRQcm9kJykgOiB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdpbnRlcmNvbUlkRGV2Jyk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29yZUNvbmZpZzogQ29yZUNvbmZpZywgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLCBwcm90ZWN0ZWQgaW50ZXJjb21OYXRpdmU6IEludGVyY29tTmF0aXZlLCBwcm90ZWN0ZWQgYXV0aGVudGljYXRpb246IEF1dGhlbnRpY2F0aW9uLCBwcm90ZWN0ZWQgc2Vzc2lvbjogU2Vzc2lvbiwgcHJvdGVjdGVkIHdlYkludGVyY29tOiBXZWJJbnRlcmNvbSkge1xuICAgIHRoaXMuYXV0aGVudGljYXRpb24ubG9naW4kLnN1YnNjcmliZSgoKSA9PiB0aGlzLmluaXQoKSk7XG4gICAgdGhpcy5hdXRoZW50aWNhdGlvbi5sb2dvdXQkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmxvZ291dCgpKTtcbiAgICB0aGlzLmF1dGhlbnRpY2F0aW9uLnByb2ZpbGVVcGRhdGVkJC5zdWJzY3JpYmUodXNlciA9PiB0aGlzLmlkZW50aWZ5KHVzZXIpKTtcbiAgfVxuXG4gIGlzRW5hYmxlZCgpIHtcbiAgICBpZiAodGhpcy5jb25maWcuaXNFMkUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0xvY2FsaG9zdCgpICYmICF0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIGluaXRpYWxpemUgaW50ZXJjb20gd2hlbiBsYXVjaGluZyB0aGUgYXBwIG9yIGxvZyBpblxuICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSkge1xuICAgICAgdGhpcy53ZWJJbnRlcmNvbS5pbml0KHsgYXBwSWQ6IHRoaXMuYXBwX2lkIH0pO1xuICAgICAgdGhpcy53ZWJJbnRlcmNvbS5ib290KHtcbiAgICAgICAgYXBwX2lkOiB0aGlzLmFwcF9pZCxcbiAgICAgICAgaGlkZV9kZWZhdWx0X2xhdW5jaGVyOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIC8vIGlmICh3aW5kb3cuSW50ZXJjb20pIHtcbiAgICAgIC8vICAgICB3aW5kb3cuSW50ZXJjb20oJ2Jvb3QnLCB7XG4gICAgICAvLyAgICAgICAgIGFwcF9pZDogdGhpcy5hcHBfaWQsXG4gICAgICAvLyAgICAgICAgIGhpZGVfZGVmYXVsdF9sYXVuY2hlcjogdHJ1ZVxuICAgICAgLy8gICAgIH0pO1xuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWdpc3RlciBpZGVudGlmaWVkIHVzZXIgb25seSBpZiB0aGUgYXBwIGlzIGxvZ2dlZGluXG4gICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGlvbi5pc0xvZ2dlZEluKCkgJiYgdGhpcy5zZXNzaW9uLnVzZXJJZCkge1xuICAgICAgICB0aGlzLmludGVyY29tTmF0aXZlLnNldExhdW5jaGVyVmlzaWJpbGl0eSgnR09ORScpO1xuICAgICAgICB0aGlzLmludGVyY29tTmF0aXZlLnJlZ2lzdGVySWRlbnRpZmllZFVzZXIoeyB1c2VySWQ6IHRoaXMuc2Vzc2lvbi51c2VySWQgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJGb3JQdXNoKCkge1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHRoaXMuaW50ZXJjb21OYXRpdmUucmVnaXN0ZXJGb3JQdXNoKCk7XG4gICAgfVxuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBUaGlzIHJlc2V0cyB0aGUgSW50ZXJjb20gaW50ZWdyYXRpb24ncyBjYWNoZSBvZiB5b3VyIHVzZXIncyBpZGVudGl0eSBhbmQgd2lwZXMgdGhlIHNsYXRlIGNsZWFuIGFuZCBhbHNvIGhpZGUgdGhlIGxhdW5jaGVyLlxuICAgIGlmICghdGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpKSB7XG4gICAgICB0aGlzLndlYkludGVyY29tLnNodXRkb3duKCk7XG4gICAgICAvLyBpZiAod2luZG93LkludGVyY29tKSB7XG4gICAgICAvLyAgICAgd2luZG93LkludGVyY29tKCdzaHV0ZG93bicpO1xuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmludGVyY29tTmF0aXZlLnJlc2V0KCk7XG4gICAgICAvL3RoaXMuaW9uaWNJbnRlcmNvbS5zZXRMYXVuY2hlclZpc2liaWxpdHkoJ0hJREUnKTtcbiAgICB9XG4gIH1cblxuICBpZGVudGlmeSh1c2VyOiBVc2VyKSB7XG4gICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpIHx8ICF1c2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCB0cmFpdHMgPSB7XG4gICAgICB1c2VyX2lkOiB1c2VyLl9pZCxcbiAgICAgIGxhbmd1YWdlX292ZXJyaWRlOiB1c2VyLmxhbmd1YWdlLFxuICAgICAgYXZhdGFyOiB7XG4gICAgICAgIHR5cGU6ICdhdmF0YXInLFxuICAgICAgICBpbWFnZV91cmw6IHVzZXIuaW1hZ2VEYXRhXG4gICAgICB9LFxuICAgICAgZW1haWw6IHVzZXIuZW1haWwgfHwgdXNlci51c2VybmFtZSxcbiAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgZmlyc3ROYW1lOiB1c2VyLmZpcnN0TmFtZSxcbiAgICAgIGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxuICAgICAgY3JlYXRlZEF0OiB1bml4KHRvRGF0ZSh1c2VyLl9lY3QpKSxcbiAgICAgIHBob25lOiB1c2VyLnRlbGVwaG9uZSxcbiAgICAgIGdlbmRlcjogdXNlci5nZW5kZXIsXG4gICAgICBkZXZpY2U6IHVzZXIuZGV2aWNlLFxuICAgICAgdGFyZ2V0OiB0aGlzLmNvcmVDb25maWcuZ2V0RnVsbEFwcE5hbWUoKSxcbiAgICAgIGNvbXBhbnk6IHVzZXIuY29tcGFueSxcbiAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgIHRlbmFudDogdXNlci5fdGVuYW50ID8gdXNlci5fdGVuYW50Lm5hbWUgOiAnJyxcbiAgICAgIGhpZGVfZGVmYXVsdF9sYXVuY2hlcjogdHJ1ZSAvLyxcbiAgICAgIC8vbG9ncm9ja2V0VVJMOiAnaHR0cHM6Ly9hcHAubG9ncm9ja2V0LmNvbS8nICsgdGhpcy5jb3JlQ29uZmlnLmdldEtleSgnbG9ncm9ja2V0SWQnKSArICcrL3Nlc3Npb25zP3U9JyArIHVzZXIuX2lkXG4gICAgICAvL2N1c3RvbV9sYXVuY2hlcl9zZWxlY3RvcjogJyNpbnRlcmNvbV9sYXVuY2hlcidcbiAgICB9O1xuICAgIGlmICghdGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpKSB7XG4gICAgICB0aGlzLndlYkludGVyY29tLnVwZGF0ZSh0cmFpdHMpO1xuICAgICAgdGhpcy53ZWJJbnRlcmNvbS5vblVucmVhZENvdW50Q2hhbmdlKHVucmVhZENvdW50ID0+IHtcbiAgICAgICAgdGhpcy51bnJlYWRDb3VudCQubmV4dCh1bnJlYWRDb3VudCk7XG4gICAgICB9KTtcbiAgICAgIC8vIGlmICh3aW5kb3cuSW50ZXJjb20pIHtcbiAgICAgIC8vICAgICB3aW5kb3cuSW50ZXJjb20oJ3VwZGF0ZScsIHRyYWl0cyk7XG4gICAgICAvLyAgICAgd2luZG93LkludGVyY29tKCdvblVucmVhZENvdW50Q2hhbmdlJywgKHVucmVhZENvdW50KSA9PiB7XG4gICAgICAvLyAgICAgICAgIHRoaXMudW5yZWFkQ291bnQkLm5leHQodW5yZWFkQ291bnQpO1xuICAgICAgLy8gICAgIH0pO1xuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmludGVyY29tTmF0aXZlLnVwZGF0ZVVzZXIodHJhaXRzKTtcbiAgICAgIHRoaXMuaW50ZXJjb21OYXRpdmUudW5yZWFkQ29udmVyc2F0aW9uQ291bnQoKS50aGVuKHVucmVhZENvdW50ID0+IHtcbiAgICAgICAgdGhpcy51bnJlYWRDb3VudCQubmV4dCh1bnJlYWRDb3VudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB0cmFja0V2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBtZXRhRGF0YTogYW55KSB7XG4gICAgaWYgKCF0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHRoaXMud2ViSW50ZXJjb20udHJhY2tFdmVudChldmVudE5hbWUsIG1ldGFEYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnRlcmNvbU5hdGl2ZS5sb2dFdmVudChldmVudE5hbWUsIG1ldGFEYXRhKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUobWV0YURhdGE6IGFueSkge1xuICAgIGlmICghdGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpKSB7XG4gICAgICB0aGlzLndlYkludGVyY29tLnVwZGF0ZShtZXRhRGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW50ZXJjb21OYXRpdmUudXBkYXRlVXNlcihtZXRhRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHRoaXMud2ViSW50ZXJjb20uc2hvdygpO1xuICAgICAgLy8gaWYgKHdpbmRvdy5JbnRlcmNvbSkge1xuICAgICAgLy8gICAgIHdpbmRvdy5JbnRlcmNvbSgnc2hvdycpO1xuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmludGVyY29tTmF0aXZlLmRpc3BsYXlNZXNzZW5nZXIoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
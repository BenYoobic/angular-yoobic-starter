import Big from 'big.js';
import { Subscription, Observable, Subject, from, of, forkJoin } from 'rxjs';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Translate } from '@shared/translate';
import VoxeetSdk from '@voxeet/voxeet-web-sdk';
import { includes, isObject, pick, forEach, each, merge, uniqBy, orderBy, isFunction } from 'lodash-es';
import { Injectable, Inject, PLATFORM_ID, RendererFactory2, ViewEncapsulation, Injector, NgZone, NgModule } from '@angular/core';
import { Log, CoreConfig, Network, LocalStorage, Colors } from '@shared/common';
import { init, captureException, configureScope } from '@sentry/browser';
import { Intercom } from '@ionic-native/intercom/ngx';
import { __spread, __extends, __decorate, __metadata, __awaiter, __generator, __rest, __assign } from 'tslib';
import { Entity, Model, Editable, User, Authentication, Session, Push, Broker, Users, Config, Requestor, DataCoreModule, Searchable, FORM_FILES_IMAGE_FILTER, getGroupsTransform } from '@shared/data-core';
import { FormFieldType, toDate, unix, showAlert, closeModal } from '@shared/stencil';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Channel = /** @class */ (function (_super) {
    __extends(Channel, _super);
    function Channel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Channel', {
            type: FormFieldType.autocomplete,
            collectionName: 'user',
            multiple: true,
            subQuery: { field: 'usersRef', values: '_id', collectionName: 'user' },
            subQueryOverride: { field: 'usersRef', values: '_id', collectionName: 'user' }
        }),
        __metadata("design:type", Array)
    ], Channel.prototype, "users", void 0);
    Channel = __decorate([
        Model({
            className: 'Channel',
            collectionName: 'channel',
            fields: null,
            include: ['users'],
            searchSubquery: { collectionName: 'user', field: 'usersRef', values: '_id' }
        })
    ], Channel);
    return Channel;
}(Entity));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//import * as pubnubLib from 'pubnub/dist/web/pubnub';
var  
//import * as pubnubLib from 'pubnub/dist/web/pubnub';
PubnubSender = /** @class */ (function () {
    function PubnubSender(id, username, image, appTitle) {
        if (appTitle === void 0) { appTitle = 'YOOBIC'; }
        this.id = id;
        this.username = username;
        this.image = image;
        this.appTitle = appTitle;
    }
    return PubnubSender;
}());
var Pubnub = /** @class */ (function () {
    function Pubnub(authentication, session, translate, log, push, coreConfig) {
        this.authentication = authentication;
        this.session = session;
        this.translate = translate;
        this.log = log;
        this.push = push;
        this.coreConfig = coreConfig;
        this.onlineUsers = new Map();
        this._supportId = '53fb03c6546847ee0536386a';
        this._mainChannel = 'yoobicchannel';
        this._supportPrefix = 'support_';
        this._groupPrefix = 'group_';
        this._channels = {};
        this._presenceSubject = new Subject();
        this._messageSubject = new Subject();
        this._statusSubject = new Subject();
        this._parentSubscription = new Subscription();
    }
    Object.defineProperty(Pubnub.prototype, "supportId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._supportId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} channels
     * @param {?} state
     * @return {?}
     */
    Pubnub.prototype.changeState = /**
     * @param {?} channels
     * @param {?} state
     * @return {?}
     */
    function (channels, state) {
        return this.pubnub.setState({ uuid: this.sender.id, channels: channels, state: state }).then((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r.state; }));
    };
    /**
     * @param {?} channel
     * @param {?} isTyping
     * @return {?}
     */
    Pubnub.prototype.setIsTyping = /**
     * @param {?} channel
     * @param {?} isTyping
     * @return {?}
     */
    function (channel, isTyping) {
        return this.changeState([channel], { isTyping: isTyping.toString() });
    };
    /**
     * @param {?} userId
     * @return {?}
     */
    Pubnub.prototype.isOnline = /**
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        return this.onlineUsers.has(userId);
    };
    /**
     * @param {?} userId
     * @param {?=} channel
     * @return {?}
     */
    Pubnub.prototype.isPresent = /**
     * @param {?} userId
     * @param {?=} channel
     * @return {?}
     */
    function (userId, channel) {
        if (channel === void 0) { channel = this._mainChannel; }
        return this.pubnub
            .whereNow({ uuid: userId })
            .then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return includes(res.channels, channel);
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            // if we get an error, don't reject, just return false;
            return false;
        }));
    };
    /**
     * @param {?} user1Id
     * @param {?} user2Id
     * @return {?}
     */
    Pubnub.prototype.getChannelId = /**
     * @param {?} user1Id
     * @param {?} user2Id
     * @return {?}
     */
    function (user1Id, user2Id) {
        return user1Id < user2Id ? user1Id + '_' + user2Id : user2Id + '_' + user1Id;
    };
    /**
     * @param {?} userId
     * @return {?}
     */
    Pubnub.prototype.getSupportChannelId = /**
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        return this._supportPrefix + this.supportId + '_' + userId;
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    Pubnub.prototype.isSupportChannel = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        return channel.indexOf(this._supportPrefix) >= 0;
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    Pubnub.prototype.parseSupportChannel = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        return channel.replace(this._supportPrefix, '').replace(this._supportId + '_', '');
    };
    /**
     * @param {?} channelId
     * @return {?}
     */
    Pubnub.prototype.getGroupChannelId = /**
     * @param {?} channelId
     * @return {?}
     */
    function (channelId) {
        return this._groupPrefix + channelId;
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    Pubnub.prototype.isGroupChannel = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        return channel.indexOf(this._groupPrefix) === 0;
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    Pubnub.prototype.parseGroupChannel = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        return channel.replace(this._groupPrefix, '');
    };
    /**
     * @param {?} channel
     * @param {?=} count
     * @param {?=} start
     * @return {?}
     */
    Pubnub.prototype.getHistory = /**
     * @param {?} channel
     * @param {?=} count
     * @param {?=} start
     * @return {?}
     */
    function (channel, count, start) {
        if (count === void 0) { count = 10; }
        if (!this.pubnub) {
            return of((/** @type {?} */ ([])));
        }
        return from(this.pubnub.history({ channel: channel, count: count, reverse: false, start: start })).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var messages = _a.messages, startTimeToken = _a.startTimeToken, endTimeToken = _a.endTimeToken;
            return [messages.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return merge(item.entry, { timetoken: item.timetoken }); })), startTimeToken, endTimeToken];
        })));
    };
    /**
     * @param {?} channel
     * @param {?} timetokens
     * @return {?}
     */
    Pubnub.prototype.deleteMessages = /**
     * @param {?} channel
     * @param {?} timetokens
     * @return {?}
     */
    function (channel, timetokens) {
        var _this = this;
        /** @type {?} */
        var promises = timetokens.map((/**
         * @param {?} timetoken
         * @return {?}
         */
        function (timetoken) { return _this.pubnub.deleteMessages({ channel: channel, start: Number(new Big(timetoken).minus(2)), end: Number(new Big(timetoken).plus(2)) }); }));
        return Promise.all(promises).then((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            return ret;
        }));
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    Pubnub.prototype.getChannelTyping = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        if (channel && this._channels[channel] && this._channels[channel].typing) {
            return this._channels[channel].typing;
        }
        else {
            return null;
        }
    };
    /**
     * @param {?} channel
     * @param {?} parent
     * @return {?}
     */
    Pubnub.prototype.initChannelTyping = /**
     * @param {?} channel
     * @param {?} parent
     * @return {?}
     */
    function (channel, parent) {
        var _this = this;
        /** @type {?} */
        var typing = new Subject();
        /** @type {?} */
        var typingSubscription = this._presenceSubject
            .pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m.channel === channel && m.uuid !== _this.sender.id; })), map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var uuid = _a.uuid, action = _a.action, state = _a.state;
            switch (action) {
                case 'leave':
                case 'timeout':
                    return [uuid, false];
                case 'join':
                case 'state-change':
                    return [uuid, isObject(state) && state.isTyping === 'true'];
            }
        })))
            .subscribe(typing);
        parent.add(typing);
        parent.add(typingSubscription);
        return typing;
    };
    /**
     * @param {?} channel
     * @param {?=} withPresence
     * @param {?=} withTyping
     * @return {?}
     */
    Pubnub.prototype.join = /**
     * @param {?} channel
     * @param {?=} withPresence
     * @param {?=} withTyping
     * @return {?}
     */
    function (channel, withPresence, withTyping) {
        if (withPresence === void 0) { withPresence = false; }
        if (withTyping === void 0) { withTyping = false; }
        if (!this._channels[channel] || this._channels[channel].subscription.closed) {
            /** @type {?} */
            var messages = new Subject();
            if (this._messageSubject) {
                /** @type {?} */
                var subscription = this._messageSubject
                    .pipe(filter((/**
                 * @param {?} m
                 * @return {?}
                 */
                function (m) { return m.channel === channel; })), map((/**
                 * @param {?} m
                 * @return {?}
                 */
                function (m) { return merge(m.message, { timetoken: m.timetoken }); })))
                    .subscribe(messages);
                subscription.add(messages);
                /** @type {?} */
                var typing = void 0;
                if (withTyping) {
                    typing = this.initChannelTyping(channel, subscription);
                }
                this._parentSubscription.add(subscription);
                this._channels[channel] = { messages: messages, subscription: subscription, typing: typing };
            }
            if (this.pubnub) {
                this.pubnub.subscribe({ channels: [channel], withPresence: withPresence || withTyping });
            }
        }
        if (this._channels && this._channels[channel] && this._channels[channel].messages) {
            return this._channels[channel].messages;
        }
        else {
            return new Subject();
        }
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    Pubnub.prototype.leave = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        if (channel && this._channels[channel] && this.pubnub) {
            this._channels[channel].subscription.unsubscribe();
            this.pubnub.unsubscribe({ channels: [channel] });
        }
    };
    /**
     * @param {?} channel
     * @param {?} message
     * @return {?}
     */
    Pubnub.prototype.publish = /**
     * @param {?} channel
     * @param {?} message
     * @return {?}
     */
    function (channel, message) {
        this.pubnub.publish({ channel: channel, message: message });
    };
    /**
     * @param {?} channel
     * @param {?} text
     * @param {?} receiverId
     * @param {?} receiverUsername
     * @param {?=} channels
     * @param {?=} photo
     * @param {?=} type
     * @param {?=} options
     * @return {?}
     */
    Pubnub.prototype.sendChatMessage = /**
     * @param {?} channel
     * @param {?} text
     * @param {?} receiverId
     * @param {?} receiverUsername
     * @param {?=} channels
     * @param {?=} photo
     * @param {?=} type
     * @param {?=} options
     * @return {?}
     */
    function (channel, text, receiverId, receiverUsername, channels, photo, type, options) {
        var _this = this;
        if (type === void 0) { type = 'chat'; }
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var isGroup = this.isGroupChannel(channel);
        /** @type {?} */
        var alertText = '';
        if (text.indexOf('ionic-chat-image') >= 0) {
            alertText += '' + this.translate.get('SENDANEWPHOTO'); //': '
        }
        else {
            alertText += '' + text.substr(0, 50) + '...';
        }
        /** @type {?} */
        var message = {
            channel: channel,
            message: text,
            type: type,
            options: options,
            //entityId: entityId,
            sender_id: this.sender.id,
            sender_username: this.sender.username,
            sender_photo: this.sender.image,
            receiver_id: receiverId,
            receiver_username: receiverUsername,
            isGroup: isGroup,
            groupName: !isGroup ? null : channels.name,
            date_sent: new Date(),
            photo: photo ? (/** @type {?} */ (pick(photo, ['_id', 'value', 'edit', 'texts', 'title', 'name', 'missiondescriptionRef', 'missionRef', 'missiondataRef', 'userRef', 'userDisplayname', 'address']))) : null
        };
        // let offlineMessage = Object.assign({}, message, {
        //     pn_apns: { aps: { alert: alertText, badge: 1 }, sender_username: this.sender.username, channel: channel }, //type: type || chatEvent.newMessage,
        //     pn_gcm: { data: { message: alertText, title: 'Yoobic', sender_username: this.sender.username, channel: channel } }, //type: type || chatEvent.newMessage,
        //     pn_debug: false
        // });
        /** @type {?} */
        var otherIds = [];
        if (!isGroup) {
            otherIds = [receiverId];
        }
        else {
            otherIds = channels.others.map((/**
             * @param {?} u
             * @return {?}
             */
            function (u) { return u._id; }));
        }
        otherIds.forEach((/**
         * @param {?} otherId
         * @return {?}
         */
        function (otherId) {
            /** @type {?} */
            var promise = !_this.isOnline(otherId) ? Promise.resolve(false) : _this.isPresent(otherId, channel);
            promise.then((/**
             * @param {?} present
             * @return {?}
             */
            function (present) {
                if (!present) {
                    if (_this.isOnline(otherId)) {
                        _this.publish(otherId, message);
                        _this.push
                            .notifyUserById(otherId, {
                            title: 'SILENTNOTIFICATION',
                            mode: 'notification',
                            pendingBadgePath: 'pendingBadges._communicate' + (isGroup ? '.team' : '.direct'),
                            notificationOptions: {
                                content_available: true
                            }
                        })
                            .subscribe((/**
                         * @return {?}
                         */
                        function () { }));
                    }
                    else {
                        _this.push
                            .notifyUserById(otherId, {
                            title: (isGroup ? channels.name + ' - ' : '') + _this.sender.username,
                            body: alertText,
                            mode: 'notification',
                            pendingBadgePath: 'pendingBadges._communicate' + (isGroup ? '.team' : '.direct'),
                            data: message
                        })
                            .subscribe((/**
                         * @return {?}
                         */
                        function () { }));
                    }
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { }));
        }));
        this.publish(channel, message);
    };
    /**
     * @param {?} channels
     * @return {?}
     */
    Pubnub.prototype.safeMultiplexMessageObservable = /**
     * @param {?} channels
     * @return {?}
     */
    function (channels) {
        var _this = this;
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            forEach(channels, (/**
             * @param {?} channel
             * @return {?}
             */
            function (channel) {
                _this._parentSubscription.add(_this._channels[channel].messages.subscribe((/**
                 * @param {?} m
                 * @return {?}
                 */
                function (m) { return observer.next(m); })));
            }));
        }));
    };
    /**
     * @return {?}
     */
    Pubnub.prototype.isAvailable = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var available = true;
        try {
            if (!PubNub) {
                available = false;
            }
        }
        catch (e) {
            if (e instanceof ReferenceError) {
                available = false;
            }
        }
        return available;
    };
    /**
     * @param {?} user
     * @return {?}
     */
    Pubnub.prototype.init = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        var _this = this;
        //return from(this.getPubnub()).pipe(mergeMap(pubnub => {
        if (!this.isAvailable()) {
            return;
        }
        this._presenceSubject = !this._presenceSubject || this._presenceSubject.closed ? new Subject() : this._presenceSubject;
        this._messageSubject = !this._messageSubject || this._messageSubject.closed ? new Subject() : this._messageSubject;
        this._statusSubject = !this._statusSubject || this._statusSubject.closed ? new Subject() : this._statusSubject;
        this._parentSubscription = !this._parentSubscription || this._parentSubscription.closed ? new Subscription() : this._parentSubscription;
        this.sender = new PubnubSender(user._id, User.getDisplayName(user), user.imageData);
        this.pubnub = new PubNub({
            ssl: true,
            keepAlive: true,
            announceFailedHeartbeats: false,
            heartbeatInterval: 600,
            presenceTimeout: 300,
            // setPresenceTimeout: 0,
            // setPresenceTimeoutWithCustomInterval: 0,
            publishKey: this.coreConfig.getKey('pubnubPublishKey'),
            subscribeKey: this.coreConfig.getKey('pubnubSubscribeKey'),
            uuid: this.sender.id
        });
        this._parentSubscription.add(this._presenceSubject);
        this._parentSubscription.add(this._messageSubject);
        this._parentSubscription.add(this._statusSubject);
        // connect listener to subjects
        this.pubnub.addListener({
            presence: (/**
             * @param {?} p
             * @return {?}
             */
            function (p) {
                if (_this._presenceSubject && _this._presenceSubject.next) {
                    _this._presenceSubject.next(p);
                }
            }),
            message: (/**
             * @param {?} m
             * @return {?}
             */
            function (m) {
                if (_this._messageSubject && _this._messageSubject.next) {
                    _this._messageSubject.next(m);
                }
            }),
            status: (/**
             * @param {?} s
             * @return {?}
             */
            function (s) {
                if (_this._statusSubject && _this._statusSubject.next) {
                    if (s.error) {
                        _this._statusSubject.error(s.error);
                    }
                    else {
                        _this._statusSubject.next(s);
                    }
                }
            })
        });
        // subscribe to _presenceSubject on the main channel to manage online user, ignore own events.
        /** @type {?} */
        var onlineUsersSubscription = this._presenceSubject.pipe(filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var uuid = _a.uuid, channel = _a.channel;
            return uuid !== _this.sender.id && channel === _this._mainChannel;
        }))).subscribe((/**
         * @param {?} presence
         * @return {?}
         */
        function (presence) {
            switch (presence.action) {
                case 'leave':
                    _this.onlineUsers.delete(presence.uuid);
                    break;
                case 'join':
                case 'state-change':
                    _this.onlineUsers.set(presence.uuid, presence.state || {});
                    break;
                case 'timeout':
                    _this.onlineUsers.set(presence.uuid, null);
                    break;
                case 'interval':
                    each(presence.join, (/**
                     * @param {?} userId
                     * @return {?}
                     */
                    function (userId) {
                        _this.onlineUsers.set(userId, {});
                    }));
                    // each(presence.timedout, userId => {
                    //     this.onlineUsers.set(userId, null);
                    // });
                    each(presence.leave, (/**
                     * @param {?} userId
                     * @return {?}
                     */
                    function (userId) {
                        _this.onlineUsers.delete(userId);
                    }));
                    if (presence.here_now_refresh && presence.channel === _this._mainChannel) {
                        _this.updateOnlineUsers();
                    }
                    break;
            }
        }));
        this._parentSubscription.add(onlineUsersSubscription);
        /** @type {?} */
        var initMessageChannels = [];
        //we use the main channel for online/presence detection, subscribe to the presence channel as well.
        this.join(this._mainChannel, true);
        this.updateOnlineUsers();
        initMessageChannels.push(this._mainChannel);
        //we use a specific user channel for notification
        this.join(this.sender.id);
        initMessageChannels.push(this.sender.id);
        //we subscribe to each group of the current user for feed notification for example
        if (!this.authentication.isAdmin() && this.session.groups) {
            this.session.groups.forEach((/**
             * @param {?} group
             * @return {?}
             */
            function (group) {
                _this.join(group);
                initMessageChannels.push(group);
            }));
        }
        return this.safeMultiplexMessageObservable(initMessageChannels);
        //}));
    };
    /**
     * @return {?}
     */
    Pubnub.prototype.updateOnlineUsers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.pubnub.hereNow({ channels: [this._mainChannel], includeUUIDs: true }).then((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            _this.onlineUsers.clear();
            response.channels[_this._mainChannel].occupants.forEach((/**
             * @param {?} occupant
             * @return {?}
             */
            function (occupant) {
                _this.onlineUsers.set(occupant.uuid, occupant.state || {});
            }));
        }));
    };
    /**
     * @return {?}
     */
    Pubnub.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        if (this.sender && this.sender.id && this.pubnub) {
            this.pubnub.unsubscribeAll();
            this.pubnub.removeAllListeners();
            this._channels = {};
            this.pubnub.stop();
        }
        if (this._parentSubscription) {
            this._parentSubscription.unsubscribe();
        }
        delete this._presenceSubject;
        delete this._messageSubject;
        delete this._statusSubject;
        delete this._parentSubscription;
    };
    /**
     * @param {?} token
     * @param {?} channel
     * @param {?} type
     * @return {?}
     */
    Pubnub.prototype.registerDevice = /**
     * @param {?} token
     * @param {?} channel
     * @param {?} type
     * @return {?}
     */
    function (token, channel, type) {
        var _this = this;
        this.pubnub.push.addChannels({ device: token, channels: [channel], pushGateway: type }, (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            if (error) {
                _this.log.log('pubnub registered error ' + token, error);
            }
            else {
                _this.log.log('pubnub registered success ' + token);
            }
        }));
    };
    /**
     * @param {?} token
     * @param {?} channel
     * @param {?} type
     * @return {?}
     */
    Pubnub.prototype.unregisterDevice = /**
     * @param {?} token
     * @param {?} channel
     * @param {?} type
     * @return {?}
     */
    function (token, channel, type) {
        var _this = this;
        this.pubnub.push.removeChannels({ device: token, channels: [channel], pushGateway: type }, (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            if (error) {
                _this.log.log('pubnub unregistered error ' + token, error);
            }
            else {
                _this.log.log('pubnub unregistered success ' + token);
            }
        }));
    };
    Pubnub.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Pubnub.ctorParameters = function () { return [
        { type: Authentication },
        { type: Session },
        { type: Translate },
        { type: Log },
        { type: Push },
        { type: CoreConfig }
    ]; };
    return Pubnub;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Channel$1 = /** @class */ (function () {
    function Channel$$1(broker, pubnub, session, translate) {
        this.broker = broker;
        this.pubnub = pubnub;
        this.session = session;
        this.translate = translate;
    }
    /**
     * @param {?} channels
     * @return {?}
     */
    Channel$$1.prototype.createChannels = /**
     * @param {?} channels
     * @return {?}
     */
    function (channels) {
        var _this = this;
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            _this.broker.save('channels', channels).subscribe((/**
             * @param {?} c
             * @return {?}
             */
            function (c) {
                _this.hydrateOthers(c, true);
                _this.updateChannels(c).subscribe((/**
                 * @param {?} ret
                 * @return {?}
                 */
                function (ret) {
                    observer.next(c);
                    observer.complete();
                }));
            }));
        }));
    };
    /**
     * @param {?} channelsId
     * @return {?}
     */
    Channel$$1.prototype.getChannelsById = /**
     * @param {?} channelsId
     * @return {?}
     */
    function (channelsId) {
        var _this = this;
        return this.broker.getAll('channels', null, null, null, [[{ field: 'channel', operator: { _id: 'eq' }, value: channelsId }]]).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && retVal.data && retVal.data.length > 0) {
                /** @type {?} */
                var channels = retVal.data[0];
                _this.hydrateOthers(channels, true);
                return channels;
            }
            return null;
        })));
    };
    /**
     * @param {?} channelId
     * @return {?}
     */
    Channel$$1.prototype.getChannelById = /**
     * @param {?} channelId
     * @return {?}
     */
    function (channelId) {
        var _this = this;
        return this.broker.getAll('channel', null, null, null, [[{ field: 'channel', operator: { _id: 'eq' }, value: channelId }]]).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && retVal.data && retVal.data.length > 0) {
                /** @type {?} */
                var channel = retVal.data[0];
                _this.hydrateOthers(channel, false);
                return channel;
            }
            return null;
        })));
    };
    //update the channel itself when we publish a new message
    //update the channel itself when we publish a new message
    /**
     * @param {?} channel
     * @return {?}
     */
    Channel$$1.prototype.update = 
    //update the channel itself when we publish a new message
    /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        channel = Object.assign({}, channel);
        delete channel.others;
        return this.broker.save('channel', channel);
    };
    // delete a channel
    // delete a channel
    /**
     * @param {?} channel
     * @return {?}
     */
    Channel$$1.prototype.deleteChannel = 
    // delete a channel
    /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        // TODO: implement pubnub.deleteChannels
        return this.broker.delete('channel', channel._id);
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    Channel$$1.prototype.updateChannels = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        channel = Object.assign({}, channel);
        delete channel.others;
        return this.broker.save('channels', channel);
    };
    // delete a group channel
    // delete a group channel
    /**
     * @param {?} channels
     * @return {?}
     */
    Channel$$1.prototype.deleteChannels = 
    // delete a group channel
    /**
     * @param {?} channels
     * @return {?}
     */
    function (channels) {
        // TODO: implement pubnub.deleteChannels
        return this.broker.delete('channels', channels._id);
    };
    //Get the channel filter for a specific user
    //Get the channel filter for a specific user
    /**
     * @param {?} user1
     * @param {?=} user2
     * @param {?=} isSupport
     * @return {?}
     */
    Channel$$1.prototype.getFilter = 
    //Get the channel filter for a specific user
    /**
     * @param {?} user1
     * @param {?=} user2
     * @param {?=} isSupport
     * @return {?}
     */
    function (user1, user2, isSupport) {
        /** @type {?} */
        var usersRef = [{ field: 'usersRef', operator: { _id: 'inq' }, value: [{ _id: user1._id }] }];
        if (user2) {
            usersRef.push({ field: 'usersRef', operator: { _id: 'inq' }, value: [{ _id: user2._id }] });
        }
        if (!isSupport) {
            usersRef.push({ field: 'usersRef', operator: { _id: 'nin' }, value: Users.adminIds });
        }
        return __spread(usersRef, [{ field: 'channel', operator: { _id: 'like' }, value: '_' }, { field: 'isSupport', operator: { _id: 'eq' }, value: isSupport === true }]);
    };
    /**
     * @param {?} user
     * @return {?}
     */
    Channel$$1.prototype.getChannelsFilter = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        return [{ field: 'usersRef', operator: { _id: 'inq' }, value: [{ _id: user._id }] }];
    };
    /**
     * @param {?} channel
     * @param {?=} isGroup
     * @return {?}
     */
    Channel$$1.prototype.hydrateOthers = /**
     * @param {?} channel
     * @param {?=} isGroup
     * @return {?}
     */
    function (channel, isGroup) {
        var _this = this;
        if (isGroup === void 0) { isGroup = false; }
        if (channel && channel.users) {
            channel.others = channel.users.filter((/**
             * @param {?} u
             * @return {?}
             */
            function (u) { return u._id !== _this.session.userId; }));
        }
        if (isGroup && (!channel.channel || !channel.channel.startsWith('group_'))) {
            channel.channel = 'group_' + channel._id;
        }
        return channel;
    };
    //return the channel beetween 2 users
    //return the channel beetween 2 users
    /**
     * @param {?} user1
     * @param {?=} user2
     * @param {?=} isSupport
     * @return {?}
     */
    Channel$$1.prototype.getByUsers = 
    //return the channel beetween 2 users
    /**
     * @param {?} user1
     * @param {?=} user2
     * @param {?=} isSupport
     * @return {?}
     */
    function (user1, user2, isSupport) {
        var _this = this;
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            _this.broker.getAll('channel', null, null, null, [_this.getFilter(user1, user2, isSupport)]).subscribe((/**
             * @param {?} retVal
             * @return {?}
             */
            function (retVal) {
                /** @type {?} */
                var channel;
                if (retVal.data.length > 0) {
                    channel = retVal.data[0];
                    _this.hydrateOthers(channel);
                    observer.next(channel);
                    observer.complete();
                }
                else {
                    channel = {
                        usersRef: isSupport ? [_this.pubnub.supportId, user1._id] : [user1._id, user2._id],
                        channel: isSupport ? _this.pubnub.getSupportChannelId(user1._id) : _this.pubnub.getChannelId(user1._id, user2._id),
                        isSupport: isSupport === true,
                        isFavorite: false,
                        _tenantRef: user2 ? user2._tenantRef : user1._tenantRef,
                        users: isSupport
                            ? [
                                {
                                    _id: _this.pubnub.supportId,
                                    username: 'smartin@yoobic.com',
                                    firstName: 'Sarah',
                                    lastName: 'Martin',
                                    imageData: 'http://res.cloudinary.com/www-yoobic-com/image/upload/a_exif/v1466421996/jv0vc0yizwqefj22iirh.png'
                                },
                                user1
                            ]
                            : [user1, user2]
                    };
                    _this.broker.setAcl(channel, null, null, null, user2 ? [user1._id, user2._id] : [user1._id]);
                    _this.update((/** @type {?} */ (channel))).subscribe((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        _this.hydrateOthers(c);
                        observer.next(c);
                        observer.complete();
                    }));
                }
            }));
        }));
    };
    //Return the support channel for a specific user
    //Return the support channel for a specific user
    /**
     * @param {?} user
     * @return {?}
     */
    Channel$$1.prototype.getSupportByUser = 
    //Return the support channel for a specific user
    /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        return this.getByUsers(user, null, true);
    };
    /**
     * @param {?} userId
     * @param {?=} isGroup
     * @return {?}
     */
    Channel$$1.prototype.getTransform = /**
     * @param {?} userId
     * @param {?=} isGroup
     * @return {?}
     */
    function (userId, isGroup) {
        var _this = this;
        if (isGroup === void 0) { isGroup = false; }
        return (/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var channels = [];
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                if (res.data && res.data.map) {
                    if (!isGroup) {
                        res.data = uniqBy(res.data, 'channel');
                    }
                    channels = res.data
                        .map((/**
                     * @param {?} channel
                     * @return {?}
                     */
                    function (channel) {
                        _this.hydrateOthers(channel, isGroup);
                        if (channel.others && channel.others.length > 0) {
                            if (!isGroup) {
                                channel.isOnline = _this.pubnub.isOnline(channel.others[0]._id);
                            }
                            return channel;
                        }
                        else {
                            return undefined;
                        }
                    }))
                        .filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return x !== undefined; }));
                }
                if (channels.length === 0) {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
                else {
                    forkJoin(channels.map((/**
                     * @param {?} channel
                     * @return {?}
                     */
                    function (channel) {
                        return _this.pubnub.getHistory(channel.channel, 1).pipe(map((/**
                         * @param {?} retVal
                         * @return {?}
                         */
                        function (retVal) {
                            if (retVal.length > 0) {
                                channel.lastMessage = null;
                                channel.lastMessageAlternate = null;
                                channel.lastMessageDate = '';
                                /** @type {?} */
                                var messages = retVal[0];
                                if (messages.length > 0) {
                                    /** @type {?} */
                                    var lastMessage = messages[0];
                                    if (!channel.deleteMessages || channel.deleteMessages.indexOf(lastMessage.date_sent) < 0) {
                                        channel.lastMessage = lastMessage.message;
                                        channel.lastMessageDate = lastMessage.date_sent;
                                        if (channel.lastMessage && channel.lastMessage.indexOf('ionic-chat-image') > 0) {
                                            channel.lastMessage = _this.translate.get('PHOTO');
                                        }
                                        channel.lastMessageAlternate = lastMessage.sender_id !== _this.session.userId;
                                    }
                                }
                            }
                            return channel;
                        })));
                    }))).subscribe((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        c = orderBy(c, ['lastMessageDate'], ['desc']);
                        observer.next({ count: res.count, data: (/** @type {?} */ (c)) });
                        observer.complete();
                    }));
                }
            }));
        });
    };
    //Remove the current user from the users list and assign the others attribute
    //Remove the current user from the users list and assign the others attribute
    /**
     * @param {?} userId
     * @return {?}
     */
    Channel$$1.prototype.getTransformChannel = 
    //Remove the current user from the users list and assign the others attribute
    /**
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        return this.getTransform(userId, false);
    };
    //Remove the current user from the users list and assign the others attribute
    //Remove the current user from the users list and assign the others attribute
    /**
     * @param {?} userId
     * @return {?}
     */
    Channel$$1.prototype.getTransformChannels = 
    //Remove the current user from the users list and assign the others attribute
    /**
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        return this.getTransform(userId, true);
    };
    Channel$$1.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Channel$$1.ctorParameters = function () { return [
        { type: Broker },
        { type: Pubnub },
        { type: Session },
        { type: Translate }
    ]; };
    return Channel$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        var app_id = _a.app_id, intercomData = __rest(_a, ["app_id"]);
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
            var data = __assign({}, intercomData, { app_id: _this.config.appId });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Intercom$1 = /** @class */ (function () {
    function Intercom$$1(coreConfig, config, intercomNative, authentication, session, webIntercom) {
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
    Object.defineProperty(Intercom$$1.prototype, "app_id", {
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
    Intercom$$1.prototype.isEnabled = /**
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
    Intercom$$1.prototype.init = /**
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
    Intercom$$1.prototype.registerForPush = /**
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
    Intercom$$1.prototype.logout = /**
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
    Intercom$$1.prototype.identify = /**
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
    Intercom$$1.prototype.trackEvent = /**
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
    Intercom$$1.prototype.update = /**
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
    Intercom$$1.prototype.show = /**
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
    Intercom$$1.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Intercom$$1.ctorParameters = function () { return [
        { type: CoreConfig },
        { type: Config },
        { type: Intercom },
        { type: Authentication },
        { type: Session },
        { type: WebIntercom }
    ]; };
    return Intercom$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Messages = /** @class */ (function () {
    function Messages(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    Messages.prototype.getJsonMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        return {
            to: message.to,
            content: {
                title: message.title,
                body: message.body,
                //footer: message.footer,
                actionURL: message.actionURL,
                actionText: message.actionText,
                action: message.actionURL ? true : false,
                thankyou: message.thankyou
            }
        };
    };
    /**
     * @param {?} message
     * @return {?}
     */
    Messages.prototype.sendMail = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        return this.rq.post(this.apiUrl + 'mail', this.getJsonMessage(message));
    };
    /**
     * @param {?} emails
     * @return {?}
     */
    Messages.prototype.unblockEmails = /**
     * @param {?} emails
     * @return {?}
     */
    function (emails) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/unblockEmails', { emails: emails });
    };
    Object.defineProperty(Messages.prototype, "apiUrl", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.broker.getApiUrl() + 'Messages/';
        },
        enumerable: true,
        configurable: true
    });
    Messages.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Messages.ctorParameters = function () { return [
        { type: Broker },
        { type: Requestor }
    ]; };
    return Messages;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//import { captureException, init, sessionURL, getSessionURL, identify } from 'logrocket';
//const LogRocket = require('logrocket');
var Track = /** @class */ (function () {
    function Track(network, push, session, localStorage, authentication, coreConfig, config, log, injector, intercom) {
        this.network = network;
        this.push = push;
        this.session = session;
        this.localStorage = localStorage;
        this.authentication = authentication;
        this.coreConfig = coreConfig;
        this.config = config;
        this.log = log;
        this.injector = injector;
        this.intercom = intercom;
        this.loadAnalytics();
        //this.loadLogRocket();
        //this.loadSessionStack();
    }
    /**
     * @param {?=} forceLoggedIn
     * @param {?=} ignoreE2E
     * @return {?}
     */
    Track.prototype.isEnabled = /**
     * @param {?=} forceLoggedIn
     * @param {?=} ignoreE2E
     * @return {?}
     */
    function (forceLoggedIn, ignoreE2E) {
        if (forceLoggedIn === void 0) { forceLoggedIn = true; }
        if (ignoreE2E === void 0) { ignoreE2E = false; }
        if (this.network.isOffline()) {
            return false;
        }
        if (this.coreConfig.isLocalhost() && !this.coreConfig.isCordova()) {
            return false;
        }
        if (this.coreConfig.getMode() !== 'prod') {
            return false;
        }
        if (this.config.isE2E && !ignoreE2E) {
            return false;
        }
        if (forceLoggedIn && !this.authentication.isLoggedIn()) {
            return false;
        }
        if (this.session.user && this.session.user.disableTracking) {
            return false;
        }
        return true;
    };
    // loadLogRocket() {
    //   if (this.isEnabled(false)) {
    //     try {
    //       LogRocket.init(this.coreConfig.getKey('logrocketId'), {
    //         dom: {
    //           baseHref: this.coreConfig.getCssPublicUrl()
    //         }
    //       });
    //     } catch (error) { }
    //   }
    // }
    // loadLogRocket() {
    //   if (this.isEnabled(false)) {
    //     try {
    //       LogRocket.init(this.coreConfig.getKey('logrocketId'), {
    //         dom: {
    //           baseHref: this.coreConfig.getCssPublicUrl()
    //         }
    //       });
    //     } catch (error) { }
    //   }
    // }
    /**
     * @return {?}
     */
    Track.prototype.loadSessionStack = 
    // loadLogRocket() {
    //   if (this.isEnabled(false)) {
    //     try {
    //       LogRocket.init(this.coreConfig.getKey('logrocketId'), {
    //         dom: {
    //           baseHref: this.coreConfig.getCssPublicUrl()
    //         }
    //       });
    //     } catch (error) { }
    //   }
    // }
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            try {
                if (!window['SessionStack'] && _this.isEnabled(false, true)) {
                    if (_this.coreConfig.isIOS() && _this.coreConfig.isCordova()) {
                        Object.defineProperty(window.document, 'cookie', {
                            enumerable: true,
                            configurable: true,
                            get: (/**
                             * @return {?}
                             */
                            function () {
                                return _this.localStorage.get('document-cookie');
                            }),
                            set: (/**
                             * @param {?} cookieString
                             * @return {?}
                             */
                            function (cookieString) {
                                /** @type {?} */
                                var cookie = _this.localStorage.get('document-cookie');
                                if (cookie) {
                                    /** @type {?} */
                                    var cookies = cookie.split('; ');
                                    /** @type {?} */
                                    var name_1 = cookieString.split('=')[0];
                                    cookies = cookies.filter((/**
                                     * @param {?} c
                                     * @return {?}
                                     */
                                    function (c) { return c.indexOf(name_1 + '=') < 0; }));
                                    cookies.push(cookieString.trim());
                                    cookie = cookies.join('; ');
                                }
                                else {
                                    cookie = cookieString;
                                }
                                _this.localStorage.set('document-cookie', cookie);
                            })
                        });
                    }
                    window['SessionStackKey'] = 'SessionStack';
                    window['SessionStack'] = window['SessionStack'] || {
                        t: _this.coreConfig.isIonic() ? _this.coreConfig.getKey('sessionStackMobile') : _this.coreConfig.getKey('sessionStackWeb'),
                        q: []
                    };
                    ['start', 'stop', 'identify', 'getSessionId', 'log', 'setOnDataCallback'].forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) {
                        window['SessionStack'][key] =
                            window['SessionStack'][key] ||
                                (/**
                                 * @return {?}
                                 */
                                function () {
                                    window['SessionStack'].q.push([key].concat([].slice.call(arguments, 0)));
                                });
                    }));
                    /** @type {?} */
                    var f = document.createElement('script');
                    f.async = !0;
                    f.src = 'https://cdn.sessionstack.com/sessionstack.js';
                    f.onload = (/**
                     * @return {?}
                     */
                    function () {
                        resolve(true);
                    });
                    f.onerror = (/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) {
                        reject(err);
                    });
                    /** @type {?} */
                    var g = document.getElementsByTagName('script')[0];
                    g.parentNode.insertBefore(f, g);
                }
                else {
                    resolve(false);
                }
            }
            catch (err) {
                reject(err);
            }
        }));
    };
    // sendLogRocketError(err) {
    //   try {
    //     if (this.isEnabled(false)) {
    //       LogRocket.captureException(err);
    //     }
    //   } catch (err) { }
    // }
    // getLogRocketSessionUrl() {
    //   try {
    //     return LogRocket.sessionURL;
    //   } catch (error) { }
    //   return '';
    // }
    // sendLogRocketError(err) {
    //   try {
    //     if (this.isEnabled(false)) {
    //       LogRocket.captureException(err);
    //     }
    //   } catch (err) { }
    // }
    // getLogRocketSessionUrl() {
    //   try {
    //     return LogRocket.sessionURL;
    //   } catch (error) { }
    //   return '';
    // }
    /**
     * @return {?}
     */
    Track.prototype.getSessionStackSession = 
    // sendLogRocketError(err) {
    //   try {
    //     if (this.isEnabled(false)) {
    //       LogRocket.captureException(err);
    //     }
    //   } catch (err) { }
    // }
    // getLogRocketSessionUrl() {
    //   try {
    //     return LogRocket.sessionURL;
    //   } catch (error) { }
    //   return '';
    // }
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (window['SessionStack']) {
                window['SessionStack'].getSessionId((/**
                 * @param {?} sessionId
                 * @return {?}
                 */
                function (sessionId) {
                    _this.log.log('SessionStack sessionid', sessionId);
                    resolve(sessionId);
                }));
            }
            else {
                resolve(null);
            }
        }));
    };
    /**
     * @return {?}
     */
    Track.prototype.getSessionStackUrl = /**
     * @return {?}
     */
    function () {
        return 'https://app.sessionstack.com/player/#/sessions/';
    };
    /**
     * @param {?} err
     * @return {?}
     */
    Track.prototype.sendSessionStackError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        // try {
        //   if (this.isEnabled(false) && window['SessionStack']) {
        //     window['SessionStack'].log(err);
        //   }
        // } catch (err) { }
    };
    /**
     * @return {?}
     */
    Track.prototype.loadAnalytics = /**
     * @return {?}
     */
    function () {
        if (!this.isEnabled(false)) {
            return;
        }
        /** @type {?} */
        var analytics = (window.analytics = window.analytics || []);
        if (!analytics.initialize) {
            if (analytics.invoked) {
                this.log.error('Segment snippet included twice.');
            }
            else {
                analytics.invoked = !0;
                analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'debug', 'page', 'once', 'off', 'on'];
                analytics.factory = (/**
                 * @param {?} tt
                 * @return {?}
                 */
                function (tt) {
                    return (/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        var e = Array.prototype.slice.call(arguments);
                        e.unshift(tt);
                        analytics.push(e);
                        return analytics;
                    });
                });
                for (var t = 0; t < analytics.methods.length; t++) {
                    /** @type {?} */
                    var e = analytics.methods[t];
                    analytics[e] = analytics.factory(e);
                }
                analytics.load = (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    /** @type {?} */
                    var e = document.createElement('script');
                    e.type = 'text/javascript';
                    e.async = !0;
                    e.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
                    /** @type {?} */
                    var n = document.getElementsByTagName('script')[0];
                    n.parentNode.insertBefore(e, n);
                });
                analytics.SNIPPET_VERSION = '4.0.0';
                analytics.load(this.config.serverName === 'Production' ? this.coreConfig.getKey('segmentApiWriteKey') : this.coreConfig.getKey('segmentApiWriteKeyDev'));
                analytics.page();
                // LogRocket.getSessionURL(url => {
                //   analytics.track('LogRocket', { sessionURL: url });
                //   this.intercom.trackEvent('LogRocket', { sessionURL: url });
                // });
            }
        }
    };
    /**
     * @param {?} event
     * @param {?=} properties
     * @return {?}
     */
    Track.prototype.track = /**
     * @param {?} event
     * @param {?=} properties
     * @return {?}
     */
    function (event, properties) {
        if (!event || event === '') {
            return;
        }
        event = event
            .split(' ')
            .map((/**
         * @param {?} word
         * @return {?}
         */
        function (word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); }))
            .join(' ');
        if (this.session.debugEvent) {
            this.log.log('EVENT', event, properties);
        }
        if (this.isEnabled() && window.analytics) {
            try {
                window.analytics.track(event, merge(this.globalTrackedProps(this.session.user), properties));
            }
            catch (error) { }
        }
    };
    /**
     * @param {?} name
     * @param {?=} category
     * @param {?=} properties
     * @return {?}
     */
    Track.prototype.page = /**
     * @param {?} name
     * @param {?=} category
     * @param {?=} properties
     * @return {?}
     */
    function (name, category, properties) {
        if (this.isEnabled() && window.analytics) {
            try {
                window.analytics.page(category, name, merge(this.globalTrackedProps(this.session.user), properties));
            }
            catch (error) { }
        }
    };
    /**
     * @param {?} user
     * @return {?}
     */
    Track.prototype.identify = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        var _this = this;
        if (!user) {
            return;
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.isEnabled()) {
                // try {
                // let traits = {
                //   avatar: user.imageData || '',
                //   email: user.email || user.username || '',
                //   firstName: user.firstName || '',
                //   lastName: user.lastName || '',
                //   createdAt: user._ect || '',
                //   phone: user.telephone || '',
                //   gender: user.gender || '',
                //   device: user.device || '',
                //   target: this.coreConfig.getFullAppName(),
                //   language: user.language || ''
                // };
                //   LogRocket.identify(user._id, traits);
                // } catch (error) { }
                if (window.analytics) {
                    try {
                        /** @type {?} */
                        var segment_traits = {
                            user_id: user._id || '',
                            user_tags: user.tags || '',
                            email: user.email || user.username || '',
                            operating_system: _this.coreConfig.getPlatform(),
                            avatar: user.imageData || '',
                            phone: user.telephone || '',
                            gender: user.gender || '',
                            target: _this.coreConfig.getFullAppName(),
                            version: _this.coreConfig.getAppVersion(),
                            is_dark_theme: Colors.isDarkTheme()
                        };
                        window.analytics.identify(user._id, merge(_this.globalTrackedProps(user), segment_traits));
                    }
                    catch (error) { }
                }
                // this.loadSessionStack().then(success => {
                //   if (success && window['SessionStack']) {
                //     //&& !(this.coreConfig.isIOS() && this.coreConfig.isCordova())
                //     try {
                //       this.log.log('SessionStack: identify');
                //       window['SessionStack'].identify({
                //         userId: user._id || '',
                //         email: user.email || user.username || '',
                //         displayName: User.getDisplayName(user),
                //         // Add your own custom user variables here.
                //         user_tags: user.tags || '',
                //         operating_system: this.coreConfig.getPlatform(),
                //         avatar: user.imageData || '',
                //         phone: user.telephone || '',
                //         gender: user.gender || '',
                //         target: this.coreConfig.getFullAppName(),
                //         version: this.coreConfig.getAppVersion();
                //         is_dark_theme: Colors.isDarkTheme()
                //       });
                //       setTimeout(() => {
                //         this.getSessionStackSession().then(sessionId => {
                //           let sessionstackURL = this.getSessionStackUrl() + (sessionId || 'notfound');
                //           this.log.log('SessionStack: link to intercom', sessionstackURL);
                //           this.intercom.update({
                //             sessionstackURL: sessionstackURL
                //           });
                //         });
                //       }, 2000);
                //     } catch (error) { }
                //   }
                // });
            }
            _this.intercom.identify(user);
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (window && window['FS'] && window['FS'].getCurrentSessionURL) {
                    /** @type {?} */
                    var fullstoryURL = window['FS'].getCurrentSessionURL();
                    _this.intercom.update({
                        fullstoryURL: fullstoryURL
                    });
                }
            }), 2000);
        }), 3000);
    };
    /**
     * @return {?}
     */
    Track.prototype.intercomRegisterForPush = /**
     * @return {?}
     */
    function () {
        this.intercom.registerForPush();
    };
    /**
     * @param {?} user
     * @return {?}
     */
    Track.prototype.globalTrackedProps = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        /** @type {?} */
        var props = {
            user_groups: this.authentication.isAdmin() ? [] : this.session.groups,
            user_username: user.username || '',
            user_firstname: user.firstName || '',
            user_lastname: user.lastName || '',
            user_language: user.language || '',
            user_company_name: user.company || '',
            user_tenant: user._tenant ? user._tenant.name : null,
            user_role: user.role || '',
            user_roles: this.session.roles || [],
            user_environment: this.config.serverName.toUpperCase()
        };
        try {
            /** @type {?} */
            var router = void 0;
            router = this.injector.get(Router);
            props = merge(props, { page: router.url });
        }
        catch (err) { }
        return props;
    };
    Track.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Track.ctorParameters = function () { return [
        { type: Network },
        { type: Push },
        { type: Session },
        { type: LocalStorage },
        { type: Authentication },
        { type: CoreConfig },
        { type: Config },
        { type: Log },
        { type: Injector },
        { type: Intercom$1 }
    ]; };
    return Track;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TwilioToken = /** @class */ (function () {
    function TwilioToken(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    /**
     * @return {?}
     */
    TwilioToken.prototype.getToken = /**
     * @return {?}
     */
    function () {
        return this.rq.get(this.config.apiUrl + 'Twilio/getToken').pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            return ret.TwilioVideoToken;
        })));
    };
    TwilioToken.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TwilioToken.ctorParameters = function () { return [
        { type: Requestor },
        { type: Config }
    ]; };
    return TwilioToken;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VideoCall = /** @class */ (function () {
    function VideoCall(session, log, coreConfig, pubnub, translate) {
        this.session = session;
        this.log = log;
        this.coreConfig = coreConfig;
        this.pubnub = pubnub;
        this.translate = translate;
        this.constraints = {
            audio: true,
            video: {
                width: { ideal: 4096 },
                height: { ideal: 2160 }
            }
        };
    }
    /**
     * @return {?}
     */
    VideoCall.prototype.useCordova = /**
     * @return {?}
     */
    function () {
        return this.coreConfig.isCordova() && window['Voxeet'];
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.init = /**
     * @return {?}
     */
    function () {
        if (!this.isInit) {
            this.isInit = true;
            this.onInitUserInfo();
            if (this.useCordova() && window['Voxeet']) {
                this.onInitCordova();
            }
            else {
                this.onInitWeb();
            }
        }
        else {
            this.reconnect();
        }
        return Promise.resolve();
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.onInitUserInfo = /**
     * @return {?}
     */
    function () {
        if (this.session && this.session.user) {
            this.userInfo = this.convertUserInfo(this.session.user);
        }
        else {
            this.userInfo = this.convertUserInfo();
        }
    };
    /**
     * @param {?=} user
     * @return {?}
     */
    VideoCall.prototype.convertUserInfo = /**
     * @param {?=} user
     * @return {?}
     */
    function (user) {
        /** @type {?} */
        var userId = '';
        /** @type {?} */
        var userName = '';
        /** @type {?} */
        var imageData = '';
        if (user) {
            if (user._id) {
                userId = user._id;
            }
            if (User.getDisplayName(user)) {
                userName = User.getDisplayName(user);
            }
            if (user.imageData) {
                imageData = user.imageData;
            }
        }
        return {
            name: userName,
            externalId: userId,
            avatarUrl: imageData
        };
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.onInitCordova = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.voxeet = window['Voxeet'];
        if (this.voxeet) {
            this.voxeet
                .initialize(this.coreConfig.getKey('voxeetKey'), this.coreConfig.getKey('voxeetSecret'))
                .then((/**
             * @param {?} myUserId
             * @return {?}
             */
            function (myUserId) {
                _this.voxeetUserId = myUserId;
                _this.log.log('voxeet is init for cordova:', _this.voxeetUserId);
                _this.voxeet.appearMaximized(true);
            }))
                .then((/**
             * @return {?}
             */
            function () {
                _this.log.log('appearMaximized');
                _this.voxeet.defaultBuiltInSpeaker(true);
            }))
                .then((/**
             * @return {?}
             */
            function () {
                _this.log.log('defaultBuiltInSpeaker');
                _this.voxeet.defaultVideo(true);
            }))
                .then((/**
             * @return {?}
             */
            function () {
                _this.log.log('defaultVideo');
                _this.voxeet.connect(_this.getUserInfo());
            }))
                .then((/**
             * @return {?}
             */
            function () {
                _this.log.log('voxeet connected');
            }));
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.onInitWeb = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.voxeet = new VoxeetSdk();
        if (this.voxeet) {
            return this.voxeet
                .initialize(this.coreConfig.getKey('voxeetKey'), this.coreConfig.getKey('voxeetSecret'), this.getUserInfo())
                .then((/**
             * @param {?} myUserId
             * @return {?}
             */
            function (myUserId) {
                _this.voxeetUserId = myUserId;
                _this.log.log('voxeet is init for web:', _this.voxeetUserId);
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.log.error(error);
            }));
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.getUserInfo = /**
     * @return {?}
     */
    function () {
        if (this.useCordova()) {
            return new window['UserInfo'](this.userInfo.externalId, this.userInfo.name, this.userInfo.avatarUrl);
        }
        else {
            return this.userInfo;
        }
    };
    /**
     * @param {?} alias
     * @return {?}
     */
    VideoCall.prototype.createConference = /**
     * @param {?} alias
     * @return {?}
     */
    function (alias) {
        if (this.useCordova()) {
            return this.voxeet.create({ conferenceAlias: alias, params: { videoCodec: 'H264' } });
        }
        else {
            return this.voxeet.createConference({ alias: alias });
        }
    };
    /**
     * @param {?} conf
     * @param {?=} options
     * @return {?}
     */
    VideoCall.prototype.joinConference = /**
     * @param {?} conf
     * @param {?=} options
     * @return {?}
     */
    function (conf, options) {
        if (this.useCordova()) {
            return this.voxeet.join(conf.conferenceId ? conf.conferenceId : conf);
        }
        else {
            return this.voxeet.joinConference(conf.conferenceId ? conf.conferenceId : conf, options || {
                constraints: { video: true, audio: true },
                user: {
                    name: User.getDisplayName(this.session.user),
                    externalId: this.session.userId,
                    avatarUrl: this.session.user.imageData
                },
                audio3D: true,
                conference: { params: { videoCodec: 'H264', liveRecording: true } }
            });
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.hasWebCam = /**
     * @return {?}
     */
    function () {
        if (window && window.navigator) {
            /** @type {?} */
            var mediaDevices_1 = (/** @type {?} */ (window.navigator.mediaDevices));
            mediaDevices_1.getMedia = mediaDevices_1.getUserMedia || mediaDevices_1.webkitGetUserMedia || mediaDevices_1.mozGetUserMedia || mediaDevices_1.msGetUserMedia;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                mediaDevices_1.getMedia({ video: true }).then((/**
                 * @return {?}
                 */
                function () {
                    resolve(true);
                }), (/**
                 * @return {?}
                 */
                function () { return resolve(false); }));
            }));
        }
        else {
            return Promise.resolve(false);
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.hasMicrophone = /**
     * @return {?}
     */
    function () {
        if (window && window.navigator) {
            /** @type {?} */
            var mediaDevices_2 = (/** @type {?} */ (window.navigator.mediaDevices));
            mediaDevices_2.getMedia = mediaDevices_2.getUserMedia || mediaDevices_2.webkitGetUserMedia || mediaDevices_2.mozGetUserMedia || mediaDevices_2.msGetUserMedia;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                mediaDevices_2.getMedia({ audio: true }).then((/**
                 * @return {?}
                 */
                function () {
                    resolve(true);
                }), (/**
                 * @return {?}
                 */
                function () { return resolve(false); }));
            }));
        }
        else {
            return Promise.resolve(false);
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.getConstraint = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var constraints = this.constraints;
        /** @type {?} */
        var camPromise = this.hasWebCam();
        /** @type {?} */
        var micPromise = this.hasMicrophone();
        camPromise.then((/**
         * @param {?} hasCam
         * @return {?}
         */
        function (hasCam) {
            if (!hasCam) {
                constraints.video = false;
            }
        }));
        micPromise.then((/**
         * @param {?} hasMic
         * @return {?}
         */
        function (hasMic) {
            if (!hasMic) {
                constraints.audio = false;
            }
        }));
        return constraints;
    };
    /**
     * @param {?} conferenceId
     * @param {?} externalIds
     * @return {?}
     */
    VideoCall.prototype.inviteParticipants = /**
     * @param {?} conferenceId
     * @param {?} externalIds
     * @return {?}
     */
    function (conferenceId, externalIds) {
        var _this = this;
        if (this.useCordova()) {
            return this.voxeet.invite(conferenceId, externalIds.map((/**
             * @param {?} user
             * @return {?}
             */
            function (user) {
                /** @type {?} */
                var userInfo = _this.convertUserInfo(user);
                return new window['UserInfo'](userInfo.externalId, userInfo.name, userInfo.avatarUrl);
            })));
        }
        else {
            return this.voxeet.invite(conferenceId, externalIds.map((/**
             * @param {?} user
             * @return {?}
             */
            function (user) { return user._id; })));
        }
    };
    /**
     * @param {?=} leaveRoom
     * @return {?}
     */
    VideoCall.prototype.leaveConference = /**
     * @param {?=} leaveRoom
     * @return {?}
     */
    function (leaveRoom) {
        if (leaveRoom === void 0) { leaveRoom = true; }
        if (this.useCordova()) {
            return this.voxeet.leave();
        }
        else {
            return this.voxeet.leaveConference(leaveRoom);
        }
    };
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    VideoCall.prototype.addListener = /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    function (event, handler) {
        if (!this.useCordova() && event && handler) {
            this.voxeet.on(event, handler);
        }
    };
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    VideoCall.prototype.removeListener = /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    function (event, handler) {
        if (!this.useCordova() && event && handler) {
            this.voxeet.removeListener(event, handler);
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.removeAllListeners = /**
     * @return {?}
     */
    function () {
        if (this.voxeet && this.voxeet.removeAllListeners) {
            return this.voxeet.removeAllListeners();
        }
        return Promise.resolve();
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.getUserId = /**
     * @return {?}
     */
    function () {
        return this.voxeetUserId;
    };
    /**
     * @param {?=} userId
     * @param {?=} constraints
     * @return {?}
     */
    VideoCall.prototype.startVideo = /**
     * @param {?=} userId
     * @param {?=} constraints
     * @return {?}
     */
    function (userId, constraints) {
        if (!this.useCordova()) {
            return this.voxeet.startVideoForUser(userId || this.getUserId(), constraints || this.constraints);
        }
    };
    /**
     * @param {?=} userId
     * @return {?}
     */
    VideoCall.prototype.stopVideo = /**
     * @param {?=} userId
     * @return {?}
     */
    function (userId) {
        if (!this.useCordova()) {
            return this.voxeet.stopVideoForUser(userId || this.getUserId());
        }
    };
    /**
     * @param {?=} userId
     * @return {?}
     */
    VideoCall.prototype.startAudio = /**
     * @param {?=} userId
     * @return {?}
     */
    function (userId) {
        if (!this.useCordova()) {
            return this.voxeet.startAudioForUser(userId || this.getUserId());
        }
    };
    /**
     * @param {?=} userId
     * @return {?}
     */
    VideoCall.prototype.stopAudio = /**
     * @param {?=} userId
     * @return {?}
     */
    function (userId) {
        if (!this.useCordova()) {
            return this.voxeet.stopAudioForUser(userId || this.getUserId());
        }
    };
    /**
     * @param {?} isMuted
     * @param {?=} userId
     * @return {?}
     */
    VideoCall.prototype.muteUser = /**
     * @param {?} isMuted
     * @param {?=} userId
     * @return {?}
     */
    function (isMuted, userId) {
        if (!this.useCordova()) {
            return this.voxeet.muteUser(userId || this.getUserId(), isMuted);
        }
    };
    /**
     * @param {?=} userId
     * @return {?}
     */
    VideoCall.prototype.toggleMute = /**
     * @param {?=} userId
     * @return {?}
     */
    function (userId) {
        if (!this.useCordova()) {
            return this.voxeet.toggleMute(userId || this.getUserId());
        }
    };
    /**
     * @param {?} userId
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    VideoCall.prototype.setUserPosition = /**
     * @param {?} userId
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (userId, x, y) {
        if (!this.useCordova()) {
            return this.voxeet.setUserPosition(userId, x, y);
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.getCurrentSession = /**
     * @return {?}
     */
    function () {
        if (!this.useCordova()) {
            return this.voxeet;
        }
        else {
            return this.voxeet;
        }
    };
    /**
     * @param {?=} option
     * @return {?}
     */
    VideoCall.prototype.getEnumerateAudioDevices = /**
     * @param {?=} option
     * @return {?}
     */
    function (option) {
        if (!this.useCordova()) {
            return this.voxeet.enumerateAudioDevices(option);
        }
        else {
            return Promise.resolve(null);
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.getEnumerateVideoDevices = /**
     * @return {?}
     */
    function () {
        if (!this.useCordova()) {
            return this.voxeet.enumerateVideoDevices();
        }
        else {
            return Promise.resolve(null);
        }
    };
    /**
     * @param {?} deviceId
     * @param {?=} constraints
     * @return {?}
     */
    VideoCall.prototype.selectAudioInput = /**
     * @param {?} deviceId
     * @param {?=} constraints
     * @return {?}
     */
    function (deviceId, constraints) {
        return this.voxeet.selectAudioInput(deviceId, constraints);
    };
    /**
     * @param {?} deviceId
     * @param {?=} constraints
     * @return {?}
     */
    VideoCall.prototype.selectAudioOutput = /**
     * @param {?} deviceId
     * @param {?=} constraints
     * @return {?}
     */
    function (deviceId, constraints) {
        return this.voxeet.selectAudioOutput(deviceId, constraints);
    };
    /**
     * @param {?} deviceId
     * @param {?=} constraints
     * @return {?}
     */
    VideoCall.prototype.selectVideoInput = /**
     * @param {?} deviceId
     * @param {?=} constraints
     * @return {?}
     */
    function (deviceId, constraints) {
        return this.voxeet.selectVideoInput(deviceId, constraints);
    };
    /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    VideoCall.prototype.startVideoForUser = /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    function (userId, constraints) {
        return this.voxeet.startVideoForUser(userId, constraints);
    };
    /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    VideoCall.prototype.stopVideoForUser = /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    function (userId, constraints) {
        return this.voxeet.stopVideoForUser(userId, constraints);
    };
    /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    VideoCall.prototype.startAudioForUser = /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    function (userId, constraints) {
        return this.voxeet.startAudioForUser(userId, constraints);
    };
    /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    VideoCall.prototype.stopAudioForUser = /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    function (userId, constraints) {
        return this.voxeet.stopAudioForUser(userId, constraints);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    VideoCall.prototype.startScreenShare = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this.voxeet.startScreenShare(options);
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.stopScreenShare = /**
     * @return {?}
     */
    function () {
        return this.voxeet.stopScreenShare();
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.startRecording = /**
     * @return {?}
     */
    function () {
        return this.voxeet.startRecording();
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.stopRecording = /**
     * @return {?}
     */
    function () {
        return this.voxeet.stopRecording();
    };
    /**
     * @param {?} conferenceId
     * @param {?=} offset
     * @return {?}
     */
    VideoCall.prototype.replayRecording = /**
     * @param {?} conferenceId
     * @param {?=} offset
     * @return {?}
     */
    function (conferenceId, offset) {
        if (conferenceId && this.voxeet && this.voxeet.replayConference) {
            return this.voxeet.replayConference(conferenceId, offset || 0);
        }
        else {
            return Promise.reject('ConferenceId is not provided');
        }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    VideoCall.prototype.shareVideo = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.voxeet.videoPresentation.start(url);
    };
    /**
     * @param {?} settings
     * @return {?}
     */
    VideoCall.prototype.updateMediaSettings = /**
     * @param {?} settings
     * @return {?}
     */
    function (settings) {
        /** @type {?} */
        var promises = [];
        /** @type {?} */
        var microphone = settings.microphone;
        /** @type {?} */
        var video = settings.video;
        if (microphone && microphone.deviceId) {
            promises.push(this.selectAudioInput(microphone.deviceId));
        }
        if (video && video.deviceId) {
            promises.push(this.selectVideoInput(video.deviceId));
        }
        if (promises.length < 1) {
            promises.push(Promise.resolve());
        }
        return promises;
    };
    /**
     * @param {?} users
     * @param {?} roomName
     * @param {?} conferenceId
     * @return {?}
     */
    VideoCall.prototype.sendChatMessage = /**
     * @param {?} users
     * @param {?} roomName
     * @param {?} conferenceId
     * @return {?}
     */
    function (users, roomName, conferenceId) {
        var _this = this;
        /** @type {?} */
        var others = users.filter((/**
         * @param {?} user
         * @return {?}
         */
        function (user) { return user._id !== _this.session.userId; }));
        if (others) {
            this.inviteParticipants(conferenceId, others);
            others
                .map((/**
             * @param {?} user
             * @return {?}
             */
            function (user) { return user._id; }))
                .forEach((/**
             * @param {?} userId
             * @return {?}
             */
            function (userId) {
                _this.pubnub.sendChatMessage(userId, _this.translate.get('VIDEOCALLCALLING', { user: User.getDisplayName(_this.session.user) }), userId, null, null, null, 'videocall', { conferenceId: conferenceId, user: _this.session.user, users: users });
            }));
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.voxeet && isFunction(this.voxeet.disconnect)) {
            this.isInit = false;
            this.voxeet.disconnect().then((/**
             * @return {?}
             */
            function () {
                _this.log.log('voxeet disconnected');
            }));
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.reconnect = /**
     * @return {?}
     */
    function () {
        if (this.useCordova()) {
            this.voxeet.connect(this.getUserInfo());
        }
    };
    /**
     * @param {?} currentMessage
     * @param {?} channel
     * @return {?}
     */
    VideoCall.prototype.sendRecordedConferenceId = /**
     * @param {?} currentMessage
     * @param {?} channel
     * @return {?}
     */
    function (currentMessage, channel) {
        if (currentMessage && channel && channel.others && channel.others[0] && channel.others[0]._id) {
            this.pubnub.sendChatMessage(channel.channel, currentMessage, channel.others[0]._id, null, (/** @type {?} */ (channel)), {}, 'conference');
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.showNoWebCamAlert = /**
     * @return {?}
     */
    function () {
        showAlert(this.translate.get('NOWEBCAM'), [this.translate.get('OK')], null, '');
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.showFailedConnectAlert = /**
     * @return {?}
     */
    function () {
        showAlert(this.translate.get('CONFERENCEFAILED'), [this.translate.get('OK')], null, '');
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.showCallerLeftAlert = /**
     * @return {?}
     */
    function () {
        return showAlert('', [this.translate.get('OK')], '', this.translate.get('CALLERLEFT'));
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.showRecieverLeft = /**
     * @return {?}
     */
    function () {
        return showAlert('', [this.translate.get('OK')], '', this.translate.get('RECIEVERLEFT'));
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.showRecordCompleteAlert = /**
     * @return {?}
     */
    function () {
        return showAlert('', [this.translate.get('OK')], '', this.translate.get('CALLRECORDED'));
    };
    /**
     * @param {?} toast
     * @return {?}
     */
    VideoCall.prototype.setVideoToast = /**
     * @param {?} toast
     * @return {?}
     */
    function (toast) {
        this.videoToast = toast;
    };
    /**
     * @param {?} modal
     * @return {?}
     */
    VideoCall.prototype.setVideoModal = /**
     * @param {?} modal
     * @return {?}
     */
    function (modal) {
        this.videoModal = modal;
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.closeVideoModal = /**
     * @return {?}
     */
    function () {
        if (this.videoModal) {
            closeModal(this.videoModal);
            this.videoModal = null;
        }
    };
    /**
     * @return {?}
     */
    VideoCall.prototype.dismissVideoToast = /**
     * @return {?}
     */
    function () {
        if (this.videoToast) {
            this.videoToast.dismiss();
            this.videoToast = null;
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    VideoCall.prototype.onSendDeclineMessage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data && data.options && data.sender_id) {
            this.pubnub.sendChatMessage(data.sender_id, this.translate.get('VIDEOCALLCANCEL', { user: User.getDisplayName(this.session.user) }), this.session.user._id, null, null, null, 'videocallcancel', { declineCall: true });
        }
    };
    /**
     * @param {?} users
     * @param {?} conferenceId
     * @return {?}
     */
    VideoCall.prototype.onSendCancelNotificationMessage = /**
     * @param {?} users
     * @param {?} conferenceId
     * @return {?}
     */
    function (users, conferenceId) {
        var _this = this;
        /** @type {?} */
        var others = users.filter((/**
         * @param {?} user
         * @return {?}
         */
        function (user) { return user._id !== _this.session.userId; }));
        if (others) {
            others
                .map((/**
             * @param {?} user
             * @return {?}
             */
            function (user) { return user._id; }))
                .forEach((/**
             * @param {?} userId
             * @return {?}
             */
            function (userId) {
                _this.pubnub.sendChatMessage(userId, _this.translate.get('VIDEOCALLCANCEL', { user: User.getDisplayName(_this.session.user) }), userId, null, null, null, 'videocallcancel', { cancelCall: true });
            }));
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    VideoCall.prototype.onReceiveDeclineMessage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (data && data.options && data.sender_id && this.session.user._id) {
            if (data.options.declineCall && data.sender_id !== this.session.user._id) {
                showAlert('', [this.translate.get('OK')], '', this.translate.get('USERDECLINECALL')).then((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    _this.closeVideoModal();
                }));
            }
            else if (data.options.cancelCall) {
                this.dismissVideoToast();
            }
        }
    };
    VideoCall.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    VideoCall.ctorParameters = function () { return [
        { type: Session },
        { type: Log },
        { type: CoreConfig },
        { type: Pubnub },
        { type: Translate }
    ]; };
    return VideoCall;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SentryErrorHandler = /** @class */ (function () {
    function SentryErrorHandler(log, zone, trackService, coreConfig, config) {
        var _this = this;
        this.log = log;
        this.zone = zone;
        this.trackService = trackService;
        this.coreConfig = coreConfig;
        this.config = config;
        if (this.isEnabled()) {
            try {
                /** @type {?} */
                var currentEnv_1 = this.config.getCurrentConfig().initialSelection;
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var options = {
                        dsn: _this.coreConfig.getKey('sentryClientKey'),
                        release: _this.coreConfig.getAppVersion(),
                        environment: (currentEnv_1 ? currentEnv_1._id : '') || 'prod'
                    };
                    init(options);
                }));
            }
            catch (err) {
                this.log.error(err);
            }
        }
    }
    /**
     * @return {?}
     */
    SentryErrorHandler.prototype.isEnabled = /**
     * @return {?}
     */
    function () {
        return this.coreConfig.getMode() === 'prod' && this.coreConfig.getKey('sentryClientKey') && this.coreConfig.getKey('sentryClientKey').length > 0; //
    };
    /**
     * @param {?} err
     * @return {?}
     */
    SentryErrorHandler.prototype.handleError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        /** @type {?} */
        var disabled = false;
        SentryErrorHandler.disabledErrorMessages.forEach((/**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            if (err && err.message && err.message.indexOf(m) >= 0) {
                disabled = true;
            }
        }));
        if (disabled) {
            return;
        }
        if (err && this.isEnabled()) {
            try {
                captureException(err.originalError || err);
            }
            catch (e) { }
            //this.trackService.sendLogRocketError(err.originalError || err);
            //this.trackService.sendSessionStackError(err.originalError || err);
            this.trackService.track('App Crash', { error: err.originalError || err });
            this.log.error(err.originalError || err);
        }
        else if (err && this.coreConfig.getMode() === 'dev') {
            this.log.error(err);
        }
    };
    /**
     * @param {?} id
     * @param {?} email
     * @param {?} username
     * @return {?}
     */
    SentryErrorHandler.prototype.identify = /**
     * @param {?} id
     * @param {?} email
     * @param {?} username
     * @return {?}
     */
    function (id, email, username) {
        var _this = this;
        if (this.isEnabled() && id) {
            try {
                this.trackService.getSessionStackSession().then((/**
                 * @param {?} session_id
                 * @return {?}
                 */
                function (session_id) {
                    configureScope((/**
                     * @param {?} scope
                     * @return {?}
                     */
                    function (scope) {
                        scope.setUser({ email: email, username: username, id: id });
                        scope.addEventProcessor((/**
                         * @param {?} event
                         * @return {?}
                         */
                        function (event) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                event.contexts = event.contexts || {};
                                event.contexts.sessionstack = {
                                    session_id: session_id,
                                    timestamp: new Date().getTime()
                                };
                                event.extra = event.extra || {};
                                //event.extra.sessionstackUrl = this.trackService.getSessionStackUrl() + session_id;
                                if (window && window['FS'] && window['FS'].getCurrentSessionURL) {
                                    event.extra.fullstoryUrl = window['FS'].getCurrentSessionURL();
                                }
                                return [2 /*return*/, event];
                            });
                        }); }));
                    }));
                }));
            }
            catch (e) { }
        }
    };
    SentryErrorHandler.disabledErrorMessages = ["Cannot read property 'disconnect' of null", 'PubNub call failed', 'PubNub call failed, check status for details', "InvalidStateError: Failed to execute 'transaction'", 'Loading chunk', "You provided 'undefined' where a stream was expected", "Cannot read property 'value' of undefined", 'Uncaught (in promise): OK', 'Uncaught (in promise): Error: Timeout', 'NS_ERROR_NOT_INITIALIZED', 'Error: No available storage method found'];
    SentryErrorHandler.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SentryErrorHandler.ctorParameters = function () { return [
        { type: Log },
        { type: NgZone },
        { type: Track },
        { type: CoreConfig },
        { type: Config }
    ]; };
    return SentryErrorHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DataLiveModule = /** @class */ (function () {
    function DataLiveModule() {
    }
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    DataLiveModule.forRoot = /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    function (configuredProviders) {
        if (configuredProviders === void 0) { configuredProviders = []; }
        return {
            ngModule: DataLiveModule,
            providers: __spread(configuredProviders, [Channel$1, Intercom$1, Intercom, Messages, Pubnub, SentryErrorHandler, Track, TwilioToken, VideoCall, WebIntercom])
        };
    };
    DataLiveModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [DataCoreModule],
                    exports: [DataCoreModule]
                },] }
    ];
    return DataLiveModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Channels = /** @class */ (function (_super) {
    __extends(Channels, _super);
    function Channels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Channels', { required: true, type: FormFieldType.text }),
        Searchable('Channels'),
        __metadata("design:type", String)
    ], Channels.prototype, "name", void 0);
    __decorate([
        Editable('Channels', {
            type: FormFieldType.autocomplete,
            filters: FORM_FILES_IMAGE_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            fixedPosition: true,
            collectionName: 'files',
            title: 'BACKGROUND',
            required: false,
            columnDefinition: { name: '_downloadURL' }
        }),
        __metadata("design:type", Object)
    ], Channels.prototype, "background", void 0);
    __decorate([
        Editable('Channels', {
            title: 'GROUPS',
            flex: 100,
            required: true,
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false
        }),
        __metadata("design:type", String)
    ], Channels.prototype, "group", void 0);
    __decorate([
        Editable('Channels', {
            type: FormFieldType.autocomplete,
            required: true,
            collectionName: 'user',
            clearable: true,
            multiple: true,
            columnDefinition: { name: 'username' }
        }),
        __metadata("design:type", Array)
    ], Channels.prototype, "users", void 0);
    Channels = __decorate([
        Model({
            className: 'Channels',
            collectionName: 'channels',
            fields: ['*'],
            include: ['users']
        })
    ], Channels);
    return Channels;
}(Entity));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Message', {
            title: 'TO',
            type: FormFieldType.emailreport,
            required: true,
            showUsers: true
        }),
        Searchable('Message'),
        __metadata("design:type", Array)
    ], Message.prototype, "to", void 0);
    __decorate([
        Editable('Message', { title: 'SUBJECT', required: true, type: FormFieldType.text }),
        Searchable('Message'),
        __metadata("design:type", String)
    ], Message.prototype, "title", void 0);
    __decorate([
        Editable('Message', { title: 'BODY', required: true, type: FormFieldType.textarea }),
        __metadata("design:type", String)
    ], Message.prototype, "body", void 0);
    __decorate([
        Editable('Message', { title: 'THANKYOU', type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Message.prototype, "thankyou", void 0);
    Message = __decorate([
        Model({
            className: 'Message',
            collectionName: 'messages',
            fields: ['*', 'from.imageData', 'from.username', 'from.email'],
            include: ['from']
        })
    ], Message);
    return Message;
}(Entity));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DataLiveModule, Channel as ChannelInterface, Channels, Message, Channel$1 as Channel, Intercom$1 as Intercom, WebIntercom, Messages, PubnubSender, Pubnub, Track, TwilioToken, VideoCall, SentryErrorHandler };

//# sourceMappingURL=data-live.js.map
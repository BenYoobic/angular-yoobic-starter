/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Log, CoreConfig } from '@shared/common';
import { Translate } from '@shared/translate';
import { User, Authentication, Session, Push } from '@shared/data-core';
import { includes, isObject, pick, forEach, each, merge } from 'lodash-es';
import { Subscription, Observable, Subject, from, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import Big from 'big.js';
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
//import * as pubnubLib from 'pubnub/dist/web/pubnub';
export { PubnubSender };
if (false) {
    /** @type {?} */
    PubnubSender.prototype.id;
    /** @type {?} */
    PubnubSender.prototype.username;
    /** @type {?} */
    PubnubSender.prototype.image;
    /** @type {?} */
    PubnubSender.prototype.appTitle;
}
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
export { Pubnub };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Pubnub.prototype.sender;
    /**
     * @type {?}
     * @protected
     */
    Pubnub.prototype.onlineUsers;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype._supportId;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype._mainChannel;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype._supportPrefix;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype._groupPrefix;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype._channels;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype._presenceSubject;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype._messageSubject;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype._statusSubject;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype._parentSubscription;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype.pubnub;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype.authentication;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype.session;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype.log;
    /**
     * @type {?}
     * @protected
     */
    Pubnub.prototype.push;
    /**
     * @type {?}
     * @private
     */
    Pubnub.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibnViLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWxpdmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcHVibnViL3B1Ym51Yi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU14RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUM7O0FBTXpCOzs7SUFNRSxzQkFBWSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFtQjtRQUFuQix5QkFBQSxFQUFBLG1CQUFtQjtRQUNsRCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFaRCxJQVlDOzs7OztJQVhDLDBCQUFXOztJQUNY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LEVBQUUsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTs7OztRQUFFLFVBQUEsS0FBSztZQUM5RixJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBRyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDM0Q7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUcsS0FBSyxDQUFDLENBQUM7YUFDdEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQWphRixVQUFVOzs7O2dCQTlCSSxjQUFjO2dCQUFFLE9BQU87Z0JBRDdCLFNBQVM7Z0JBRFQsR0FBRztnQkFFNEIsSUFBSTtnQkFGOUIsVUFBVTs7SUFrY3hCLGFBQUM7Q0FBQSxBQWxhRCxJQWthQztTQWphWSxNQUFNOzs7Ozs7SUFHakIsd0JBQStCOzs7OztJQUMvQiw2QkFBK0M7Ozs7O0lBRS9DLDRCQUFnRDs7Ozs7SUFDaEQsOEJBQXVDOzs7OztJQUN2QyxnQ0FBb0M7Ozs7O0lBQ3BDLDhCQUFnQzs7Ozs7SUFDaEMsMkJBTU87Ozs7O0lBQ1Asa0NBQXdEOzs7OztJQUN4RCxpQ0FBc0Q7Ozs7O0lBQ3RELGdDQUFvRDs7Ozs7SUFFcEQscUNBQWlEOzs7OztJQUVqRCx3QkFBd0I7Ozs7O0lBRVosZ0NBQXNDOzs7OztJQUFFLHlCQUF3Qjs7Ozs7SUFBRSwyQkFBNEI7Ozs7O0lBQUUscUJBQWdCOzs7OztJQUFFLHNCQUFvQjs7Ozs7SUFBRSw0QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2csIENvcmVDb25maWcgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBVc2VyLCBBdXRoZW50aWNhdGlvbiwgU2Vzc2lvbiwgUHVzaCB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcblxuaW1wb3J0IHsgQ2hhdE1lc3NhZ2UgYXMgTWVzc2FnZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbWVzc2FnZS9tZXNzYWdlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDaGFubmVscyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvY2hhbm5lbHMvY2hhbm5lbHMuaW50ZXJmYWNlJztcbmltcG9ydCB7IElQdWJOdWIsIFByZXNlbmNlRXZlbnQsIE1lc3NhZ2VFdmVudCwgU3RhdHVzRXZlbnQsIENoYW5uZWxTdGF0ZSwgSGVyZU5vd1Jlc3BvbnNlLCBVVUlEU3RhdGUsIEdsb2JhbFN0YXRlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9wdWJudWIvcHVibnViLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IGluY2x1ZGVzLCBpc09iamVjdCwgcGljaywgZm9yRWFjaCwgZWFjaCwgbWVyZ2UgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIFN1YmplY3QsIGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBCaWcgZnJvbSAnYmlnLmpzJztcblxuZGVjbGFyZSBjb25zdCBQdWJOdWI6IGFueTtcblxuLy9pbXBvcnQgKiBhcyBwdWJudWJMaWIgZnJvbSAncHVibnViL2Rpc3Qvd2ViL3B1Ym51Yic7XG5cbmV4cG9ydCBjbGFzcyBQdWJudWJTZW5kZXIge1xuICBpZDogc3RyaW5nO1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBpbWFnZTogc3RyaW5nO1xuICBhcHBUaXRsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGlkLCB1c2VybmFtZSwgaW1hZ2UsIGFwcFRpdGxlID0gJ1lPT0JJQycpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICB0aGlzLmFwcFRpdGxlID0gYXBwVGl0bGU7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFB1Ym51YiB7XG4gIC8vcHJpdmF0ZSBzdGF0aWMgX3B1Ym51YjogYW55ID0gbnVsbDtcblxuICBwcm90ZWN0ZWQgc2VuZGVyOiBQdWJudWJTZW5kZXI7XG4gIHByb3RlY3RlZCBvbmxpbmVVc2VycyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfc3VwcG9ydElkID0gJzUzZmIwM2M2NTQ2ODQ3ZWUwNTM2Mzg2YSc7XG4gIHByaXZhdGUgX21haW5DaGFubmVsID0gJ3lvb2JpY2NoYW5uZWwnO1xuICBwcml2YXRlIF9zdXBwb3J0UHJlZml4ID0gJ3N1cHBvcnRfJztcbiAgcHJpdmF0ZSBfZ3JvdXBQcmVmaXggPSAnZ3JvdXBfJztcbiAgcHJpdmF0ZSBfY2hhbm5lbHM6IHtcbiAgICBbY2hhbm5lbDogc3RyaW5nXToge1xuICAgICAgbWVzc2FnZXM6IFN1YmplY3Q8TWVzc2FnZT47XG4gICAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICAgIHR5cGluZz86IFN1YmplY3Q8W3N0cmluZywgYm9vbGVhbl0+O1xuICAgIH07XG4gIH0gPSB7fTtcbiAgcHJpdmF0ZSBfcHJlc2VuY2VTdWJqZWN0ID0gbmV3IFN1YmplY3Q8UHJlc2VuY2VFdmVudD4oKTtcbiAgcHJpdmF0ZSBfbWVzc2FnZVN1YmplY3QgPSBuZXcgU3ViamVjdDxNZXNzYWdlRXZlbnQ+KCk7XG4gIHByaXZhdGUgX3N0YXR1c1N1YmplY3QgPSBuZXcgU3ViamVjdDxTdGF0dXNFdmVudD4oKTtcblxuICBwcml2YXRlIF9wYXJlbnRTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgcHJpdmF0ZSBwdWJudWI6IElQdWJOdWI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoZW50aWNhdGlvbjogQXV0aGVudGljYXRpb24sIHByaXZhdGUgc2Vzc2lvbjogU2Vzc2lvbiwgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZSwgcHJpdmF0ZSBsb2c6IExvZywgcHJvdGVjdGVkIHB1c2g6IFB1c2gsIHByaXZhdGUgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge31cblxuICBnZXQgc3VwcG9ydElkKCkge1xuICAgIHJldHVybiB0aGlzLl9zdXBwb3J0SWQ7XG4gIH1cblxuICBjaGFuZ2VTdGF0ZShjaGFubmVsczogc3RyaW5nW10sIHN0YXRlOiBDaGFubmVsU3RhdGUpOiBQcm9taXNlPENoYW5uZWxTdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnB1Ym51Yi5zZXRTdGF0ZSh7IHV1aWQ6IHRoaXMuc2VuZGVyLmlkLCBjaGFubmVscywgc3RhdGUgfSkudGhlbihyID0+IHIuc3RhdGUpO1xuICB9XG5cbiAgc2V0SXNUeXBpbmcoY2hhbm5lbDogc3RyaW5nLCBpc1R5cGluZzogYm9vbGVhbik6IFByb21pc2U8Q2hhbm5lbFN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlU3RhdGUoW2NoYW5uZWxdLCB7IGlzVHlwaW5nOiBpc1R5cGluZy50b1N0cmluZygpIH0pO1xuICB9XG5cbiAgaXNPbmxpbmUodXNlcklkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vbmxpbmVVc2Vycy5oYXModXNlcklkKTtcbiAgfVxuXG4gIGlzUHJlc2VudCh1c2VySWQ6IHN0cmluZywgY2hhbm5lbCA9IHRoaXMuX21haW5DaGFubmVsKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMucHVibnViXG4gICAgICAud2hlcmVOb3coeyB1dWlkOiB1c2VySWQgfSlcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiBpbmNsdWRlcyhyZXMuY2hhbm5lbHMsIGNoYW5uZWwpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAvLyBpZiB3ZSBnZXQgYW4gZXJyb3IsIGRvbid0IHJlamVjdCwganVzdCByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2hhbm5lbElkKHVzZXIxSWQ6IHN0cmluZywgdXNlcjJJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHVzZXIxSWQgPCB1c2VyMklkID8gdXNlcjFJZCArICdfJyArIHVzZXIySWQgOiB1c2VyMklkICsgJ18nICsgdXNlcjFJZDtcbiAgfVxuXG4gIGdldFN1cHBvcnRDaGFubmVsSWQodXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VwcG9ydFByZWZpeCArIHRoaXMuc3VwcG9ydElkICsgJ18nICsgdXNlcklkO1xuICB9XG5cbiAgaXNTdXBwb3J0Q2hhbm5lbChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNoYW5uZWwuaW5kZXhPZih0aGlzLl9zdXBwb3J0UHJlZml4KSA+PSAwO1xuICB9XG5cbiAgcGFyc2VTdXBwb3J0Q2hhbm5lbChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNoYW5uZWwucmVwbGFjZSh0aGlzLl9zdXBwb3J0UHJlZml4LCAnJykucmVwbGFjZSh0aGlzLl9zdXBwb3J0SWQgKyAnXycsICcnKTtcbiAgfVxuXG4gIGdldEdyb3VwQ2hhbm5lbElkKGNoYW5uZWxJZCkge1xuICAgIHJldHVybiB0aGlzLl9ncm91cFByZWZpeCArIGNoYW5uZWxJZDtcbiAgfVxuXG4gIGlzR3JvdXBDaGFubmVsKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY2hhbm5lbC5pbmRleE9mKHRoaXMuX2dyb3VwUHJlZml4KSA9PT0gMDtcbiAgfVxuXG4gIHBhcnNlR3JvdXBDaGFubmVsKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY2hhbm5lbC5yZXBsYWNlKHRoaXMuX2dyb3VwUHJlZml4LCAnJyk7XG4gIH1cblxuICBnZXRIaXN0b3J5KGNoYW5uZWw6IHN0cmluZywgY291bnQgPSAxMCwgc3RhcnQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPFtBcnJheTxNZXNzYWdlPiwgbnVtYmVyLCBudW1iZXJdPiB7XG4gICAgaWYgKCF0aGlzLnB1Ym51Yikge1xuICAgICAgcmV0dXJuIG9mKDxhbnk+W10pO1xuICAgIH1cbiAgICByZXR1cm4gZnJvbSh0aGlzLnB1Ym51Yi5oaXN0b3J5KHsgY2hhbm5lbDogY2hhbm5lbCwgY291bnQ6IGNvdW50LCByZXZlcnNlOiBmYWxzZSwgc3RhcnQ6IHN0YXJ0IH0pKS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAoeyBtZXNzYWdlcywgc3RhcnRUaW1lVG9rZW4sIGVuZFRpbWVUb2tlbiB9KTogW0FycmF5PE1lc3NhZ2U+LCBudW1iZXIsIG51bWJlcl0gPT4ge1xuICAgICAgICAgIHJldHVybiBbbWVzc2FnZXMubWFwKGl0ZW0gPT4gbWVyZ2UoaXRlbS5lbnRyeSwgeyB0aW1ldG9rZW46IGl0ZW0udGltZXRva2VuIH0pKSwgc3RhcnRUaW1lVG9rZW4sIGVuZFRpbWVUb2tlbl07XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZGVsZXRlTWVzc2FnZXMoY2hhbm5lbDogc3RyaW5nLCB0aW1ldG9rZW5zOiBBcnJheTxudW1iZXI+KSB7XG4gICAgbGV0IHByb21pc2VzID0gdGltZXRva2Vucy5tYXAodGltZXRva2VuID0+IHRoaXMucHVibnViLmRlbGV0ZU1lc3NhZ2VzKHsgY2hhbm5lbDogY2hhbm5lbCwgc3RhcnQ6IE51bWJlcihuZXcgQmlnKHRpbWV0b2tlbikubWludXMoMikpLCBlbmQ6IE51bWJlcihuZXcgQmlnKHRpbWV0b2tlbikucGx1cygyKSkgfSkpO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigocmV0OiBhbnkpID0+IHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDaGFubmVsVHlwaW5nKGNoYW5uZWw6IHN0cmluZyk6IFN1YmplY3Q8W3N0cmluZywgYm9vbGVhbl0+IHtcbiAgICBpZiAoY2hhbm5lbCAmJiB0aGlzLl9jaGFubmVsc1tjaGFubmVsXSAmJiB0aGlzLl9jaGFubmVsc1tjaGFubmVsXS50eXBpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGFubmVsc1tjaGFubmVsXS50eXBpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGluaXRDaGFubmVsVHlwaW5nKGNoYW5uZWw6IHN0cmluZywgcGFyZW50OiBTdWJzY3JpcHRpb24pOiBTdWJqZWN0PFtzdHJpbmcsIGJvb2xlYW5dPiB7XG4gICAgbGV0IHR5cGluZyA9IG5ldyBTdWJqZWN0PFtzdHJpbmcsIGJvb2xlYW5dPigpO1xuICAgIGxldCB0eXBpbmdTdWJzY3JpcHRpb24gPSB0aGlzLl9wcmVzZW5jZVN1YmplY3RcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIobSA9PiBtLmNoYW5uZWwgPT09IGNoYW5uZWwgJiYgbS51dWlkICE9PSB0aGlzLnNlbmRlci5pZCksXG4gICAgICAgIG1hcCgoeyB1dWlkLCBhY3Rpb24sIHN0YXRlIH0pID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVhdmUnOlxuICAgICAgICAgICAgY2FzZSAndGltZW91dCc6XG4gICAgICAgICAgICAgIHJldHVybiBbdXVpZCwgZmFsc2VdO1xuICAgICAgICAgICAgY2FzZSAnam9pbic6XG4gICAgICAgICAgICBjYXNlICdzdGF0ZS1jaGFuZ2UnOlxuICAgICAgICAgICAgICByZXR1cm4gW3V1aWQsIGlzT2JqZWN0KHN0YXRlKSAmJiBzdGF0ZS5pc1R5cGluZyA9PT0gJ3RydWUnXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHR5cGluZyk7XG4gICAgcGFyZW50LmFkZCh0eXBpbmcpO1xuICAgIHBhcmVudC5hZGQodHlwaW5nU3Vic2NyaXB0aW9uKTtcbiAgICByZXR1cm4gdHlwaW5nO1xuICB9XG5cbiAgam9pbihjaGFubmVsOiBzdHJpbmcsIHdpdGhQcmVzZW5jZSA9IGZhbHNlLCB3aXRoVHlwaW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPE1lc3NhZ2U+IHtcbiAgICBpZiAoIXRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdIHx8IHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLnN1YnNjcmlwdGlvbi5jbG9zZWQpIHtcbiAgICAgIGxldCBtZXNzYWdlcyA9IG5ldyBTdWJqZWN0PE1lc3NhZ2U+KCk7XG4gICAgICBpZiAodGhpcy5fbWVzc2FnZVN1YmplY3QpIHtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuX21lc3NhZ2VTdWJqZWN0XG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIobSA9PiBtLmNoYW5uZWwgPT09IGNoYW5uZWwpLFxuICAgICAgICAgICAgbWFwKG0gPT4gbWVyZ2UobS5tZXNzYWdlLCB7IHRpbWV0b2tlbjogbS50aW1ldG9rZW4gfSkpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUobWVzc2FnZXMpO1xuICAgICAgICBzdWJzY3JpcHRpb24uYWRkKG1lc3NhZ2VzKTtcbiAgICAgICAgbGV0IHR5cGluZztcbiAgICAgICAgaWYgKHdpdGhUeXBpbmcpIHtcbiAgICAgICAgICB0eXBpbmcgPSB0aGlzLmluaXRDaGFubmVsVHlwaW5nKGNoYW5uZWwsIHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLmFkZChzdWJzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLl9jaGFubmVsc1tjaGFubmVsXSA9IHsgbWVzc2FnZXMsIHN1YnNjcmlwdGlvbiwgdHlwaW5nIH07XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wdWJudWIpIHtcbiAgICAgICAgdGhpcy5wdWJudWIuc3Vic2NyaWJlKHsgY2hhbm5lbHM6IFtjaGFubmVsXSwgd2l0aFByZXNlbmNlOiB3aXRoUHJlc2VuY2UgfHwgd2l0aFR5cGluZyB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzICYmIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdICYmIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLm1lc3NhZ2VzKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0ubWVzc2FnZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgU3ViamVjdDxNZXNzYWdlPigpO1xuICAgIH1cbiAgfVxuXG4gIGxlYXZlKGNoYW5uZWw6IHN0cmluZykge1xuICAgIGlmIChjaGFubmVsICYmIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdICYmIHRoaXMucHVibnViKSB7XG4gICAgICB0aGlzLl9jaGFubmVsc1tjaGFubmVsXS5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMucHVibnViLnVuc3Vic2NyaWJlKHsgY2hhbm5lbHM6IFtjaGFubmVsXSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaXNoKGNoYW5uZWw6IHN0cmluZywgbWVzc2FnZTogTWVzc2FnZSkge1xuICAgIHRoaXMucHVibnViLnB1Ymxpc2goeyBjaGFubmVsOiBjaGFubmVsLCBtZXNzYWdlOiBtZXNzYWdlIH0pO1xuICB9XG5cbiAgc2VuZENoYXRNZXNzYWdlKGNoYW5uZWw6IHN0cmluZywgdGV4dDogc3RyaW5nLCByZWNlaXZlcklkOiBzdHJpbmcsIHJlY2VpdmVyVXNlcm5hbWU6IHN0cmluZywgY2hhbm5lbHM/OiBDaGFubmVscywgcGhvdG8/OiBhbnksIHR5cGUgPSAnY2hhdCcsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBpc0dyb3VwID0gdGhpcy5pc0dyb3VwQ2hhbm5lbChjaGFubmVsKTtcbiAgICBsZXQgYWxlcnRUZXh0ID0gJyc7IC8vdGhpcy5zZW5kZXIudXNlcm5hbWU7XG4gICAgaWYgKHRleHQuaW5kZXhPZignaW9uaWMtY2hhdC1pbWFnZScpID49IDApIHtcbiAgICAgIGFsZXJ0VGV4dCArPSAnJyArIHRoaXMudHJhbnNsYXRlLmdldCgnU0VOREFORVdQSE9UTycpOyAvLyc6ICdcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnRUZXh0ICs9ICcnICsgdGV4dC5zdWJzdHIoMCwgNTApICsgJy4uLic7XG4gICAgfVxuICAgIGxldCBtZXNzYWdlOiBNZXNzYWdlID0ge1xuICAgICAgY2hhbm5lbDogY2hhbm5lbCxcbiAgICAgIG1lc3NhZ2U6IHRleHQsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgIC8vZW50aXR5SWQ6IGVudGl0eUlkLFxuICAgICAgc2VuZGVyX2lkOiB0aGlzLnNlbmRlci5pZCxcbiAgICAgIHNlbmRlcl91c2VybmFtZTogdGhpcy5zZW5kZXIudXNlcm5hbWUsXG4gICAgICBzZW5kZXJfcGhvdG86IHRoaXMuc2VuZGVyLmltYWdlLFxuICAgICAgcmVjZWl2ZXJfaWQ6IHJlY2VpdmVySWQsXG4gICAgICByZWNlaXZlcl91c2VybmFtZTogcmVjZWl2ZXJVc2VybmFtZSxcbiAgICAgIGlzR3JvdXA6IGlzR3JvdXAsXG4gICAgICBncm91cE5hbWU6ICFpc0dyb3VwID8gbnVsbCA6IGNoYW5uZWxzLm5hbWUsXG4gICAgICBkYXRlX3NlbnQ6IG5ldyBEYXRlKCksXG4gICAgICBwaG90bzogcGhvdG8gPyA8YW55PnBpY2socGhvdG8sIFsnX2lkJywgJ3ZhbHVlJywgJ2VkaXQnLCAndGV4dHMnLCAndGl0bGUnLCAnbmFtZScsICdtaXNzaW9uZGVzY3JpcHRpb25SZWYnLCAnbWlzc2lvblJlZicsICdtaXNzaW9uZGF0YVJlZicsICd1c2VyUmVmJywgJ3VzZXJEaXNwbGF5bmFtZScsICdhZGRyZXNzJ10pIDogbnVsbFxuICAgIH07XG4gICAgLy8gbGV0IG9mZmxpbmVNZXNzYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZSwge1xuICAgIC8vICAgICBwbl9hcG5zOiB7IGFwczogeyBhbGVydDogYWxlcnRUZXh0LCBiYWRnZTogMSB9LCBzZW5kZXJfdXNlcm5hbWU6IHRoaXMuc2VuZGVyLnVzZXJuYW1lLCBjaGFubmVsOiBjaGFubmVsIH0sIC8vdHlwZTogdHlwZSB8fCBjaGF0RXZlbnQubmV3TWVzc2FnZSxcbiAgICAvLyAgICAgcG5fZ2NtOiB7IGRhdGE6IHsgbWVzc2FnZTogYWxlcnRUZXh0LCB0aXRsZTogJ1lvb2JpYycsIHNlbmRlcl91c2VybmFtZTogdGhpcy5zZW5kZXIudXNlcm5hbWUsIGNoYW5uZWw6IGNoYW5uZWwgfSB9LCAvL3R5cGU6IHR5cGUgfHwgY2hhdEV2ZW50Lm5ld01lc3NhZ2UsXG4gICAgLy8gICAgIHBuX2RlYnVnOiBmYWxzZVxuICAgIC8vIH0pO1xuXG4gICAgbGV0IG90aGVySWRzID0gW107XG4gICAgaWYgKCFpc0dyb3VwKSB7XG4gICAgICBvdGhlcklkcyA9IFtyZWNlaXZlcklkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3RoZXJJZHMgPSBjaGFubmVscy5vdGhlcnMubWFwKHUgPT4gdS5faWQpO1xuICAgIH1cblxuICAgIG90aGVySWRzLmZvckVhY2gob3RoZXJJZCA9PiB7XG4gICAgICBsZXQgcHJvbWlzZSA9ICF0aGlzLmlzT25saW5lKG90aGVySWQpID8gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKSA6IHRoaXMuaXNQcmVzZW50KG90aGVySWQsIGNoYW5uZWwpO1xuICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICBwcmVzZW50ID0+IHtcbiAgICAgICAgICBpZiAoIXByZXNlbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT25saW5lKG90aGVySWQpKSB7XG4gICAgICAgICAgICAgIHRoaXMucHVibGlzaChvdGhlcklkLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgdGhpcy5wdXNoXG4gICAgICAgICAgICAgICAgLm5vdGlmeVVzZXJCeUlkKG90aGVySWQsIHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU0lMRU5UTk9USUZJQ0FUSU9OJyxcbiAgICAgICAgICAgICAgICAgIG1vZGU6ICdub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgICAgICAgcGVuZGluZ0JhZGdlUGF0aDogJ3BlbmRpbmdCYWRnZXMuX2NvbW11bmljYXRlJyArIChpc0dyb3VwID8gJy50ZWFtJyA6ICcuZGlyZWN0JyksXG4gICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25PcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRfYXZhaWxhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHt9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucHVzaFxuICAgICAgICAgICAgICAgIC5ub3RpZnlVc2VyQnlJZChvdGhlcklkLCB7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogKGlzR3JvdXAgPyBjaGFubmVscy5uYW1lICsgJyAtICcgOiAnJykgKyB0aGlzLnNlbmRlci51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IGFsZXJ0VGV4dCxcbiAgICAgICAgICAgICAgICAgIG1vZGU6ICdub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgICAgICAgcGVuZGluZ0JhZGdlUGF0aDogJ3BlbmRpbmdCYWRnZXMuX2NvbW11bmljYXRlJyArIChpc0dyb3VwID8gJy50ZWFtJyA6ICcuZGlyZWN0JyksXG4gICAgICAgICAgICAgICAgICBkYXRhOiBtZXNzYWdlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7fVxuICAgICAgKTtcbiAgICB9KTtcbiAgICB0aGlzLnB1Ymxpc2goY2hhbm5lbCwgbWVzc2FnZSk7XG4gIH1cblxuICBzYWZlTXVsdGlwbGV4TWVzc2FnZU9ic2VydmFibGUoY2hhbm5lbHM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxNZXNzYWdlPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPE1lc3NhZ2U+KG9ic2VydmVyID0+IHtcbiAgICAgIGZvckVhY2goY2hhbm5lbHMsIChjaGFubmVsOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLmFkZCh0aGlzLl9jaGFubmVsc1tjaGFubmVsXS5tZXNzYWdlcy5zdWJzY3JpYmUobSA9PiBvYnNlcnZlci5uZXh0KG0pKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzQXZhaWxhYmxlKCkge1xuICAgIGxldCBhdmFpbGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIVB1Yk51Yikge1xuICAgICAgICBhdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSB7XG4gICAgICAgIGF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXZhaWxhYmxlO1xuICB9XG5cbiAgaW5pdCh1c2VyOiBVc2VyKTogT2JzZXJ2YWJsZTxNZXNzYWdlPiB7XG4gICAgLy9yZXR1cm4gZnJvbSh0aGlzLmdldFB1Ym51YigpKS5waXBlKG1lcmdlTWFwKHB1Ym51YiA9PiB7XG4gICAgaWYgKCF0aGlzLmlzQXZhaWxhYmxlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmVzZW5jZVN1YmplY3QgPSAhdGhpcy5fcHJlc2VuY2VTdWJqZWN0IHx8IHRoaXMuX3ByZXNlbmNlU3ViamVjdC5jbG9zZWQgPyBuZXcgU3ViamVjdDxQcmVzZW5jZUV2ZW50PigpIDogdGhpcy5fcHJlc2VuY2VTdWJqZWN0O1xuICAgIHRoaXMuX21lc3NhZ2VTdWJqZWN0ID0gIXRoaXMuX21lc3NhZ2VTdWJqZWN0IHx8IHRoaXMuX21lc3NhZ2VTdWJqZWN0LmNsb3NlZCA/IG5ldyBTdWJqZWN0PE1lc3NhZ2VFdmVudD4oKSA6IHRoaXMuX21lc3NhZ2VTdWJqZWN0O1xuICAgIHRoaXMuX3N0YXR1c1N1YmplY3QgPSAhdGhpcy5fc3RhdHVzU3ViamVjdCB8fCB0aGlzLl9zdGF0dXNTdWJqZWN0LmNsb3NlZCA/IG5ldyBTdWJqZWN0PFN0YXR1c0V2ZW50PigpIDogdGhpcy5fc3RhdHVzU3ViamVjdDtcbiAgICB0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24gPSAhdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uIHx8IHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbi5jbG9zZWQgPyBuZXcgU3Vic2NyaXB0aW9uKCkgOiB0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb247XG5cbiAgICB0aGlzLnNlbmRlciA9IG5ldyBQdWJudWJTZW5kZXIodXNlci5faWQsIFVzZXIuZ2V0RGlzcGxheU5hbWUodXNlciksIHVzZXIuaW1hZ2VEYXRhKTtcbiAgICB0aGlzLnB1Ym51YiA9IG5ldyBQdWJOdWIoe1xuICAgICAgc3NsOiB0cnVlLFxuICAgICAga2VlcEFsaXZlOiB0cnVlLFxuICAgICAgYW5ub3VuY2VGYWlsZWRIZWFydGJlYXRzOiBmYWxzZSxcbiAgICAgIGhlYXJ0YmVhdEludGVydmFsOiA2MDAsXG4gICAgICBwcmVzZW5jZVRpbWVvdXQ6IDMwMCxcbiAgICAgIC8vIHNldFByZXNlbmNlVGltZW91dDogMCxcbiAgICAgIC8vIHNldFByZXNlbmNlVGltZW91dFdpdGhDdXN0b21JbnRlcnZhbDogMCxcbiAgICAgIHB1Ymxpc2hLZXk6IHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ3B1Ym51YlB1Ymxpc2hLZXknKSxcbiAgICAgIHN1YnNjcmliZUtleTogdGhpcy5jb3JlQ29uZmlnLmdldEtleSgncHVibnViU3Vic2NyaWJlS2V5JyksXG4gICAgICB1dWlkOiB0aGlzLnNlbmRlci5pZFxuICAgIH0pO1xuXG4gICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLmFkZCh0aGlzLl9wcmVzZW5jZVN1YmplY3QpO1xuICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbi5hZGQodGhpcy5fbWVzc2FnZVN1YmplY3QpO1xuICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbi5hZGQodGhpcy5fc3RhdHVzU3ViamVjdCk7XG4gICAgLy8gY29ubmVjdCBsaXN0ZW5lciB0byBzdWJqZWN0c1xuICAgIHRoaXMucHVibnViLmFkZExpc3RlbmVyKHtcbiAgICAgIHByZXNlbmNlOiAocDogUHJlc2VuY2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fcHJlc2VuY2VTdWJqZWN0ICYmIHRoaXMuX3ByZXNlbmNlU3ViamVjdC5uZXh0KSB7XG4gICAgICAgICAgdGhpcy5fcHJlc2VuY2VTdWJqZWN0Lm5leHQocCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtZXNzYWdlOiAobTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9tZXNzYWdlU3ViamVjdCAmJiB0aGlzLl9tZXNzYWdlU3ViamVjdC5uZXh0KSB7XG4gICAgICAgICAgdGhpcy5fbWVzc2FnZVN1YmplY3QubmV4dChtKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN0YXR1czogKHM6IFN0YXR1c0V2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0dXNTdWJqZWN0ICYmIHRoaXMuX3N0YXR1c1N1YmplY3QubmV4dCkge1xuICAgICAgICAgIGlmIChzLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0dXNTdWJqZWN0LmVycm9yKHMuZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0dXNTdWJqZWN0Lm5leHQocyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gX3ByZXNlbmNlU3ViamVjdCBvbiB0aGUgbWFpbiBjaGFubmVsIHRvIG1hbmFnZSBvbmxpbmUgdXNlciwgaWdub3JlIG93biBldmVudHMuXG4gICAgbGV0IG9ubGluZVVzZXJzU3Vic2NyaXB0aW9uID0gdGhpcy5fcHJlc2VuY2VTdWJqZWN0LnBpcGUoZmlsdGVyKCh7IHV1aWQsIGNoYW5uZWwgfSkgPT4gdXVpZCAhPT0gdGhpcy5zZW5kZXIuaWQgJiYgY2hhbm5lbCA9PT0gdGhpcy5fbWFpbkNoYW5uZWwpKS5zdWJzY3JpYmUoKHByZXNlbmNlOiBQcmVzZW5jZUV2ZW50KSA9PiB7XG4gICAgICBzd2l0Y2ggKHByZXNlbmNlLmFjdGlvbikge1xuICAgICAgICBjYXNlICdsZWF2ZSc6XG4gICAgICAgICAgdGhpcy5vbmxpbmVVc2Vycy5kZWxldGUocHJlc2VuY2UudXVpZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2pvaW4nOlxuICAgICAgICBjYXNlICdzdGF0ZS1jaGFuZ2UnOlxuICAgICAgICAgIHRoaXMub25saW5lVXNlcnMuc2V0KHByZXNlbmNlLnV1aWQsIHByZXNlbmNlLnN0YXRlIHx8IHt9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGltZW91dCc6XG4gICAgICAgICAgdGhpcy5vbmxpbmVVc2Vycy5zZXQocHJlc2VuY2UudXVpZCwgbnVsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ludGVydmFsJzpcbiAgICAgICAgICBlYWNoKHByZXNlbmNlLmpvaW4sIHVzZXJJZCA9PiB7XG4gICAgICAgICAgICB0aGlzLm9ubGluZVVzZXJzLnNldCh1c2VySWQsIHt9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBlYWNoKHByZXNlbmNlLnRpbWVkb3V0LCB1c2VySWQgPT4ge1xuICAgICAgICAgIC8vICAgICB0aGlzLm9ubGluZVVzZXJzLnNldCh1c2VySWQsIG51bGwpO1xuICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgIGVhY2gocHJlc2VuY2UubGVhdmUsIHVzZXJJZCA9PiB7XG4gICAgICAgICAgICB0aGlzLm9ubGluZVVzZXJzLmRlbGV0ZSh1c2VySWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHByZXNlbmNlLmhlcmVfbm93X3JlZnJlc2ggJiYgcHJlc2VuY2UuY2hhbm5lbCA9PT0gdGhpcy5fbWFpbkNoYW5uZWwpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlT25saW5lVXNlcnMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLmFkZChvbmxpbmVVc2Vyc1N1YnNjcmlwdGlvbik7XG5cbiAgICBsZXQgaW5pdE1lc3NhZ2VDaGFubmVsczogc3RyaW5nW10gPSBbXTtcbiAgICAvL3dlIHVzZSB0aGUgbWFpbiBjaGFubmVsIGZvciBvbmxpbmUvcHJlc2VuY2UgZGV0ZWN0aW9uLCBzdWJzY3JpYmUgdG8gdGhlIHByZXNlbmNlIGNoYW5uZWwgYXMgd2VsbC5cbiAgICB0aGlzLmpvaW4odGhpcy5fbWFpbkNoYW5uZWwsIHRydWUpO1xuICAgIHRoaXMudXBkYXRlT25saW5lVXNlcnMoKTtcbiAgICBpbml0TWVzc2FnZUNoYW5uZWxzLnB1c2godGhpcy5fbWFpbkNoYW5uZWwpO1xuXG4gICAgLy93ZSB1c2UgYSBzcGVjaWZpYyB1c2VyIGNoYW5uZWwgZm9yIG5vdGlmaWNhdGlvblxuICAgIHRoaXMuam9pbih0aGlzLnNlbmRlci5pZCk7XG4gICAgaW5pdE1lc3NhZ2VDaGFubmVscy5wdXNoKHRoaXMuc2VuZGVyLmlkKTtcblxuICAgIC8vd2Ugc3Vic2NyaWJlIHRvIGVhY2ggZ3JvdXAgb2YgdGhlIGN1cnJlbnQgdXNlciBmb3IgZmVlZCBub3RpZmljYXRpb24gZm9yIGV4YW1wbGVcbiAgICBpZiAoIXRoaXMuYXV0aGVudGljYXRpb24uaXNBZG1pbigpICYmIHRoaXMuc2Vzc2lvbi5ncm91cHMpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbi5ncm91cHMuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgIHRoaXMuam9pbihncm91cCk7XG4gICAgICAgIGluaXRNZXNzYWdlQ2hhbm5lbHMucHVzaChncm91cCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zYWZlTXVsdGlwbGV4TWVzc2FnZU9ic2VydmFibGUoaW5pdE1lc3NhZ2VDaGFubmVscyk7XG4gICAgLy99KSk7XG4gIH1cblxuICB1cGRhdGVPbmxpbmVVc2VycygpIHtcbiAgICB0aGlzLnB1Ym51Yi5oZXJlTm93KHsgY2hhbm5lbHM6IFt0aGlzLl9tYWluQ2hhbm5lbF0sIGluY2x1ZGVVVUlEczogdHJ1ZSB9KS50aGVuKChyZXNwb25zZTogSGVyZU5vd1Jlc3BvbnNlPFVVSURTdGF0ZTxHbG9iYWxTdGF0ZT4+KSA9PiB7XG4gICAgICB0aGlzLm9ubGluZVVzZXJzLmNsZWFyKCk7XG4gICAgICByZXNwb25zZS5jaGFubmVsc1t0aGlzLl9tYWluQ2hhbm5lbF0ub2NjdXBhbnRzLmZvckVhY2gob2NjdXBhbnQgPT4ge1xuICAgICAgICB0aGlzLm9ubGluZVVzZXJzLnNldChvY2N1cGFudC51dWlkLCBvY2N1cGFudC5zdGF0ZSB8fCB7fSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgaWYgKHRoaXMuc2VuZGVyICYmIHRoaXMuc2VuZGVyLmlkICYmIHRoaXMucHVibnViKSB7XG4gICAgICB0aGlzLnB1Ym51Yi51bnN1YnNjcmliZUFsbCgpO1xuICAgICAgdGhpcy5wdWJudWIucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLl9jaGFubmVscyA9IHt9O1xuICAgICAgdGhpcy5wdWJudWIuc3RvcCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuX3ByZXNlbmNlU3ViamVjdDtcbiAgICBkZWxldGUgdGhpcy5fbWVzc2FnZVN1YmplY3Q7XG4gICAgZGVsZXRlIHRoaXMuX3N0YXR1c1N1YmplY3Q7XG4gICAgZGVsZXRlIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIHJlZ2lzdGVyRGV2aWNlKHRva2VuLCBjaGFubmVsLCB0eXBlKSB7XG4gICAgdGhpcy5wdWJudWIucHVzaC5hZGRDaGFubmVscyh7IGRldmljZTogdG9rZW4sIGNoYW5uZWxzOiBbY2hhbm5lbF0sIHB1c2hHYXRld2F5OiB0eXBlIH0sIGVycm9yID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLmxvZy5sb2coJ3B1Ym51YiByZWdpc3RlcmVkIGVycm9yICcgKyB0b2tlbiwgZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKCdwdWJudWIgcmVnaXN0ZXJlZCBzdWNjZXNzICcgKyB0b2tlbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1bnJlZ2lzdGVyRGV2aWNlKHRva2VuLCBjaGFubmVsLCB0eXBlKSB7XG4gICAgdGhpcy5wdWJudWIucHVzaC5yZW1vdmVDaGFubmVscyh7IGRldmljZTogdG9rZW4sIGNoYW5uZWxzOiBbY2hhbm5lbF0sIHB1c2hHYXRld2F5OiB0eXBlIH0sIGVycm9yID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLmxvZy5sb2coJ3B1Ym51YiB1bnJlZ2lzdGVyZWQgZXJyb3IgJyArIHRva2VuLCBlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZy5sb2coJ3B1Ym51YiB1bnJlZ2lzdGVyZWQgc3VjY2VzcyAnICsgdG9rZW4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=
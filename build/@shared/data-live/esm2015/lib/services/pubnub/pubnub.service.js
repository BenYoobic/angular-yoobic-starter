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
export class PubnubSender {
    /**
     * @param {?} id
     * @param {?} username
     * @param {?} image
     * @param {?=} appTitle
     */
    constructor(id, username, image, appTitle = 'YOOBIC') {
        this.id = id;
        this.username = username;
        this.image = image;
        this.appTitle = appTitle;
    }
}
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
export class Pubnub {
    /**
     * @param {?} authentication
     * @param {?} session
     * @param {?} translate
     * @param {?} log
     * @param {?} push
     * @param {?} coreConfig
     */
    constructor(authentication, session, translate, log, push, coreConfig) {
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
    /**
     * @return {?}
     */
    get supportId() {
        return this._supportId;
    }
    /**
     * @param {?} channels
     * @param {?} state
     * @return {?}
     */
    changeState(channels, state) {
        return this.pubnub.setState({ uuid: this.sender.id, channels, state }).then((/**
         * @param {?} r
         * @return {?}
         */
        r => r.state));
    }
    /**
     * @param {?} channel
     * @param {?} isTyping
     * @return {?}
     */
    setIsTyping(channel, isTyping) {
        return this.changeState([channel], { isTyping: isTyping.toString() });
    }
    /**
     * @param {?} userId
     * @return {?}
     */
    isOnline(userId) {
        return this.onlineUsers.has(userId);
    }
    /**
     * @param {?} userId
     * @param {?=} channel
     * @return {?}
     */
    isPresent(userId, channel = this._mainChannel) {
        return this.pubnub
            .whereNow({ uuid: userId })
            .then((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            return includes(res.channels, channel);
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            // if we get an error, don't reject, just return false;
            return false;
        }));
    }
    /**
     * @param {?} user1Id
     * @param {?} user2Id
     * @return {?}
     */
    getChannelId(user1Id, user2Id) {
        return user1Id < user2Id ? user1Id + '_' + user2Id : user2Id + '_' + user1Id;
    }
    /**
     * @param {?} userId
     * @return {?}
     */
    getSupportChannelId(userId) {
        return this._supportPrefix + this.supportId + '_' + userId;
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    isSupportChannel(channel) {
        return channel.indexOf(this._supportPrefix) >= 0;
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    parseSupportChannel(channel) {
        return channel.replace(this._supportPrefix, '').replace(this._supportId + '_', '');
    }
    /**
     * @param {?} channelId
     * @return {?}
     */
    getGroupChannelId(channelId) {
        return this._groupPrefix + channelId;
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    isGroupChannel(channel) {
        return channel.indexOf(this._groupPrefix) === 0;
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    parseGroupChannel(channel) {
        return channel.replace(this._groupPrefix, '');
    }
    /**
     * @param {?} channel
     * @param {?=} count
     * @param {?=} start
     * @return {?}
     */
    getHistory(channel, count = 10, start) {
        if (!this.pubnub) {
            return of((/** @type {?} */ ([])));
        }
        return from(this.pubnub.history({ channel: channel, count: count, reverse: false, start: start })).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ({ messages, startTimeToken, endTimeToken }) => {
            return [messages.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => merge(item.entry, { timetoken: item.timetoken }))), startTimeToken, endTimeToken];
        })));
    }
    /**
     * @param {?} channel
     * @param {?} timetokens
     * @return {?}
     */
    deleteMessages(channel, timetokens) {
        /** @type {?} */
        let promises = timetokens.map((/**
         * @param {?} timetoken
         * @return {?}
         */
        timetoken => this.pubnub.deleteMessages({ channel: channel, start: Number(new Big(timetoken).minus(2)), end: Number(new Big(timetoken).plus(2)) })));
        return Promise.all(promises).then((/**
         * @param {?} ret
         * @return {?}
         */
        (ret) => {
            return ret;
        }));
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    getChannelTyping(channel) {
        if (channel && this._channels[channel] && this._channels[channel].typing) {
            return this._channels[channel].typing;
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} channel
     * @param {?} parent
     * @return {?}
     */
    initChannelTyping(channel, parent) {
        /** @type {?} */
        let typing = new Subject();
        /** @type {?} */
        let typingSubscription = this._presenceSubject
            .pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m.channel === channel && m.uuid !== this.sender.id)), map((/**
         * @param {?} __0
         * @return {?}
         */
        ({ uuid, action, state }) => {
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
    }
    /**
     * @param {?} channel
     * @param {?=} withPresence
     * @param {?=} withTyping
     * @return {?}
     */
    join(channel, withPresence = false, withTyping = false) {
        if (!this._channels[channel] || this._channels[channel].subscription.closed) {
            /** @type {?} */
            let messages = new Subject();
            if (this._messageSubject) {
                /** @type {?} */
                let subscription = this._messageSubject
                    .pipe(filter((/**
                 * @param {?} m
                 * @return {?}
                 */
                m => m.channel === channel)), map((/**
                 * @param {?} m
                 * @return {?}
                 */
                m => merge(m.message, { timetoken: m.timetoken }))))
                    .subscribe(messages);
                subscription.add(messages);
                /** @type {?} */
                let typing;
                if (withTyping) {
                    typing = this.initChannelTyping(channel, subscription);
                }
                this._parentSubscription.add(subscription);
                this._channels[channel] = { messages, subscription, typing };
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
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    leave(channel) {
        if (channel && this._channels[channel] && this.pubnub) {
            this._channels[channel].subscription.unsubscribe();
            this.pubnub.unsubscribe({ channels: [channel] });
        }
    }
    /**
     * @param {?} channel
     * @param {?} message
     * @return {?}
     */
    publish(channel, message) {
        this.pubnub.publish({ channel: channel, message: message });
    }
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
    sendChatMessage(channel, text, receiverId, receiverUsername, channels, photo, type = 'chat', options = {}) {
        /** @type {?} */
        let isGroup = this.isGroupChannel(channel);
        /** @type {?} */
        let alertText = '';
        if (text.indexOf('ionic-chat-image') >= 0) {
            alertText += '' + this.translate.get('SENDANEWPHOTO'); //': '
        }
        else {
            alertText += '' + text.substr(0, 50) + '...';
        }
        /** @type {?} */
        let message = {
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
        let otherIds = [];
        if (!isGroup) {
            otherIds = [receiverId];
        }
        else {
            otherIds = channels.others.map((/**
             * @param {?} u
             * @return {?}
             */
            u => u._id));
        }
        otherIds.forEach((/**
         * @param {?} otherId
         * @return {?}
         */
        otherId => {
            /** @type {?} */
            let promise = !this.isOnline(otherId) ? Promise.resolve(false) : this.isPresent(otherId, channel);
            promise.then((/**
             * @param {?} present
             * @return {?}
             */
            present => {
                if (!present) {
                    if (this.isOnline(otherId)) {
                        this.publish(otherId, message);
                        this.push
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
                        () => { }));
                    }
                    else {
                        this.push
                            .notifyUserById(otherId, {
                            title: (isGroup ? channels.name + ' - ' : '') + this.sender.username,
                            body: alertText,
                            mode: 'notification',
                            pendingBadgePath: 'pendingBadges._communicate' + (isGroup ? '.team' : '.direct'),
                            data: message
                        })
                            .subscribe((/**
                         * @return {?}
                         */
                        () => { }));
                    }
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            err => { }));
        }));
        this.publish(channel, message);
    }
    /**
     * @param {?} channels
     * @return {?}
     */
    safeMultiplexMessageObservable(channels) {
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        observer => {
            forEach(channels, (/**
             * @param {?} channel
             * @return {?}
             */
            (channel) => {
                this._parentSubscription.add(this._channels[channel].messages.subscribe((/**
                 * @param {?} m
                 * @return {?}
                 */
                m => observer.next(m))));
            }));
        }));
    }
    /**
     * @return {?}
     */
    isAvailable() {
        /** @type {?} */
        let available = true;
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
    }
    /**
     * @param {?} user
     * @return {?}
     */
    init(user) {
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
            (p) => {
                if (this._presenceSubject && this._presenceSubject.next) {
                    this._presenceSubject.next(p);
                }
            }),
            message: (/**
             * @param {?} m
             * @return {?}
             */
            (m) => {
                if (this._messageSubject && this._messageSubject.next) {
                    this._messageSubject.next(m);
                }
            }),
            status: (/**
             * @param {?} s
             * @return {?}
             */
            (s) => {
                if (this._statusSubject && this._statusSubject.next) {
                    if (s.error) {
                        this._statusSubject.error(s.error);
                    }
                    else {
                        this._statusSubject.next(s);
                    }
                }
            })
        });
        // subscribe to _presenceSubject on the main channel to manage online user, ignore own events.
        /** @type {?} */
        let onlineUsersSubscription = this._presenceSubject.pipe(filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ uuid, channel }) => uuid !== this.sender.id && channel === this._mainChannel))).subscribe((/**
         * @param {?} presence
         * @return {?}
         */
        (presence) => {
            switch (presence.action) {
                case 'leave':
                    this.onlineUsers.delete(presence.uuid);
                    break;
                case 'join':
                case 'state-change':
                    this.onlineUsers.set(presence.uuid, presence.state || {});
                    break;
                case 'timeout':
                    this.onlineUsers.set(presence.uuid, null);
                    break;
                case 'interval':
                    each(presence.join, (/**
                     * @param {?} userId
                     * @return {?}
                     */
                    userId => {
                        this.onlineUsers.set(userId, {});
                    }));
                    // each(presence.timedout, userId => {
                    //     this.onlineUsers.set(userId, null);
                    // });
                    each(presence.leave, (/**
                     * @param {?} userId
                     * @return {?}
                     */
                    userId => {
                        this.onlineUsers.delete(userId);
                    }));
                    if (presence.here_now_refresh && presence.channel === this._mainChannel) {
                        this.updateOnlineUsers();
                    }
                    break;
            }
        }));
        this._parentSubscription.add(onlineUsersSubscription);
        /** @type {?} */
        let initMessageChannels = [];
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
            group => {
                this.join(group);
                initMessageChannels.push(group);
            }));
        }
        return this.safeMultiplexMessageObservable(initMessageChannels);
        //}));
    }
    /**
     * @return {?}
     */
    updateOnlineUsers() {
        this.pubnub.hereNow({ channels: [this._mainChannel], includeUUIDs: true }).then((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            this.onlineUsers.clear();
            response.channels[this._mainChannel].occupants.forEach((/**
             * @param {?} occupant
             * @return {?}
             */
            occupant => {
                this.onlineUsers.set(occupant.uuid, occupant.state || {});
            }));
        }));
    }
    /**
     * @return {?}
     */
    disconnect() {
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
    }
    /**
     * @param {?} token
     * @param {?} channel
     * @param {?} type
     * @return {?}
     */
    registerDevice(token, channel, type) {
        this.pubnub.push.addChannels({ device: token, channels: [channel], pushGateway: type }, (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            if (error) {
                this.log.log('pubnub registered error ' + token, error);
            }
            else {
                this.log.log('pubnub registered success ' + token);
            }
        }));
    }
    /**
     * @param {?} token
     * @param {?} channel
     * @param {?} type
     * @return {?}
     */
    unregisterDevice(token, channel, type) {
        this.pubnub.push.removeChannels({ device: token, channels: [channel], pushGateway: type }, (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            if (error) {
                this.log.log('pubnub unregistered error ' + token, error);
            }
            else {
                this.log.log('pubnub unregistered success ' + token);
            }
        }));
    }
}
Pubnub.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Pubnub.ctorParameters = () => [
    { type: Authentication },
    { type: Session },
    { type: Translate },
    { type: Log },
    { type: Push },
    { type: CoreConfig }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibnViLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWxpdmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcHVibnViL3B1Ym51Yi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU14RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUM7O0FBTXpCLE1BQU0sT0FBTyxZQUFZOzs7Ozs7O0lBTXZCLFlBQVksRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxHQUFHLFFBQVE7UUFDbEQsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7OztJQVhDLDBCQUFXOztJQUNYLGdDQUFpQjs7SUFDakIsNkJBQWM7O0lB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dUM7Ozs7O0lBQ3ZDLGdDQUFvQzs7Ozs7SUFDcEMsOEJBQWdDOzs7OztJQUNoQywyQkFNTzs7Ozs7SUFDUCxrQ0FBd0Q7Ozs7O0lBQ3hELGlDQUFzRDs7Ozs7SUFDdEQsZ0NBQW9EOzs7OztJQUVwRCxxQ0FBaUQ7Ozs7O0lBRWpELHdCQUF3Qjs7Ozs7SUFFWixnQ0FBc0M7Ozs7O0lBQUUseUJBQXdCOzs7OztJQUFFLDJCQUE0Qjs7Ozs7SUFBRSxxQkFBZ0I7Ozs7O0lBQUUsc0JBQW9COzs7OztJQUFFLDRCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZywgQ29yZUNvbmZpZyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcbmltcG9ydCB7IFVzZXIsIEF1dGhlbnRpY2F0aW9uLCBTZXNzaW9uLCBQdXNoIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuXG5pbXBvcnQgeyBDaGF0TWVzc2FnZSBhcyBNZXNzYWdlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9tZXNzYWdlL21lc3NhZ2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENoYW5uZWxzIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jaGFubmVscy9jaGFubmVscy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSVB1Yk51YiwgUHJlc2VuY2VFdmVudCwgTWVzc2FnZUV2ZW50LCBTdGF0dXNFdmVudCwgQ2hhbm5lbFN0YXRlLCBIZXJlTm93UmVzcG9uc2UsIFVVSURTdGF0ZSwgR2xvYmFsU3RhdGUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3B1Ym51Yi9wdWJudWIuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgaW5jbHVkZXMsIGlzT2JqZWN0LCBwaWNrLCBmb3JFYWNoLCBlYWNoLCBtZXJnZSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IEJpZyBmcm9tICdiaWcuanMnO1xuXG5kZWNsYXJlIGNvbnN0IFB1Yk51YjogYW55O1xuXG4vL2ltcG9ydCAqIGFzIHB1Ym51YkxpYiBmcm9tICdwdWJudWIvZGlzdC93ZWIvcHVibnViJztcblxuZXhwb3J0IGNsYXNzIFB1Ym51YlNlbmRlciB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGltYWdlOiBzdHJpbmc7XG4gIGFwcFRpdGxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoaWQsIHVzZXJuYW1lLCBpbWFnZSwgYXBwVGl0bGUgPSAnWU9PQklDJykge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIHRoaXMuYXBwVGl0bGUgPSBhcHBUaXRsZTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHVibnViIHtcbiAgLy9wcml2YXRlIHN0YXRpYyBfcHVibnViOiBhbnkgPSBudWxsO1xuXG4gIHByb3RlY3RlZCBzZW5kZXI6IFB1Ym51YlNlbmRlcjtcbiAgcHJvdGVjdGVkIG9ubGluZVVzZXJzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICBwcml2YXRlIF9zdXBwb3J0SWQgPSAnNTNmYjAzYzY1NDY4NDdlZTA1MzYzODZhJztcbiAgcHJpdmF0ZSBfbWFpbkNoYW5uZWwgPSAneW9vYmljY2hhbm5lbCc7XG4gIHByaXZhdGUgX3N1cHBvcnRQcmVmaXggPSAnc3VwcG9ydF8nO1xuICBwcml2YXRlIF9ncm91cFByZWZpeCA9ICdncm91cF8nO1xuICBwcml2YXRlIF9jaGFubmVsczoge1xuICAgIFtjaGFubmVsOiBzdHJpbmddOiB7XG4gICAgICBtZXNzYWdlczogU3ViamVjdDxNZXNzYWdlPjtcbiAgICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgICAgdHlwaW5nPzogU3ViamVjdDxbc3RyaW5nLCBib29sZWFuXT47XG4gICAgfTtcbiAgfSA9IHt9O1xuICBwcml2YXRlIF9wcmVzZW5jZVN1YmplY3QgPSBuZXcgU3ViamVjdDxQcmVzZW5jZUV2ZW50PigpO1xuICBwcml2YXRlIF9tZXNzYWdlU3ViamVjdCA9IG5ldyBTdWJqZWN0PE1lc3NhZ2VFdmVudD4oKTtcbiAgcHJpdmF0ZSBfc3RhdHVzU3ViamVjdCA9IG5ldyBTdWJqZWN0PFN0YXR1c0V2ZW50PigpO1xuXG4gIHByaXZhdGUgX3BhcmVudFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBwcml2YXRlIHB1Ym51YjogSVB1Yk51YjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhlbnRpY2F0aW9uOiBBdXRoZW50aWNhdGlvbiwgcHJpdmF0ZSBzZXNzaW9uOiBTZXNzaW9uLCBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlLCBwcml2YXRlIGxvZzogTG9nLCBwcm90ZWN0ZWQgcHVzaDogUHVzaCwgcHJpdmF0ZSBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnKSB7fVxuXG4gIGdldCBzdXBwb3J0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1cHBvcnRJZDtcbiAgfVxuXG4gIGNoYW5nZVN0YXRlKGNoYW5uZWxzOiBzdHJpbmdbXSwgc3RhdGU6IENoYW5uZWxTdGF0ZSk6IFByb21pc2U8Q2hhbm5lbFN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucHVibnViLnNldFN0YXRlKHsgdXVpZDogdGhpcy5zZW5kZXIuaWQsIGNoYW5uZWxzLCBzdGF0ZSB9KS50aGVuKHIgPT4gci5zdGF0ZSk7XG4gIH1cblxuICBzZXRJc1R5cGluZyhjaGFubmVsOiBzdHJpbmcsIGlzVHlwaW5nOiBib29sZWFuKTogUHJvbWlzZTxDaGFubmVsU3RhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VTdGF0ZShbY2hhbm5lbF0sIHsgaXNUeXBpbmc6IGlzVHlwaW5nLnRvU3RyaW5nKCkgfSk7XG4gIH1cblxuICBpc09ubGluZSh1c2VySWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm9ubGluZVVzZXJzLmhhcyh1c2VySWQpO1xuICB9XG5cbiAgaXNQcmVzZW50KHVzZXJJZDogc3RyaW5nLCBjaGFubmVsID0gdGhpcy5fbWFpbkNoYW5uZWwpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wdWJudWJcbiAgICAgIC53aGVyZU5vdyh7IHV1aWQ6IHVzZXJJZCB9KVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIGluY2x1ZGVzKHJlcy5jaGFubmVscywgY2hhbm5lbCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIC8vIGlmIHdlIGdldCBhbiBlcnJvciwgZG9uJ3QgcmVqZWN0LCBqdXN0IHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gIH1cblxuICBnZXRDaGFubmVsSWQodXNlcjFJZDogc3RyaW5nLCB1c2VyMklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdXNlcjFJZCA8IHVzZXIySWQgPyB1c2VyMUlkICsgJ18nICsgdXNlcjJJZCA6IHVzZXIySWQgKyAnXycgKyB1c2VyMUlkO1xuICB9XG5cbiAgZ2V0U3VwcG9ydENoYW5uZWxJZCh1c2VySWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zdXBwb3J0UHJlZml4ICsgdGhpcy5zdXBwb3J0SWQgKyAnXycgKyB1c2VySWQ7XG4gIH1cblxuICBpc1N1cHBvcnRDaGFubmVsKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY2hhbm5lbC5pbmRleE9mKHRoaXMuX3N1cHBvcnRQcmVmaXgpID49IDA7XG4gIH1cblxuICBwYXJzZVN1cHBvcnRDaGFubmVsKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY2hhbm5lbC5yZXBsYWNlKHRoaXMuX3N1cHBvcnRQcmVmaXgsICcnKS5yZXBsYWNlKHRoaXMuX3N1cHBvcnRJZCArICdfJywgJycpO1xuICB9XG5cbiAgZ2V0R3JvdXBDaGFubmVsSWQoY2hhbm5lbElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwUHJlZml4ICsgY2hhbm5lbElkO1xuICB9XG5cbiAgaXNHcm91cENoYW5uZWwoY2hhbm5lbCkge1xuICAgIHJldHVybiBjaGFubmVsLmluZGV4T2YodGhpcy5fZ3JvdXBQcmVmaXgpID09PSAwO1xuICB9XG5cbiAgcGFyc2VHcm91cENoYW5uZWwoY2hhbm5lbCkge1xuICAgIHJldHVybiBjaGFubmVsLnJlcGxhY2UodGhpcy5fZ3JvdXBQcmVmaXgsICcnKTtcbiAgfVxuXG4gIGdldEhpc3RvcnkoY2hhbm5lbDogc3RyaW5nLCBjb3VudCA9IDEwLCBzdGFydD86IG51bWJlcik6IE9ic2VydmFibGU8W0FycmF5PE1lc3NhZ2U+LCBudW1iZXIsIG51bWJlcl0+IHtcbiAgICBpZiAoIXRoaXMucHVibnViKSB7XG4gICAgICByZXR1cm4gb2YoPGFueT5bXSk7XG4gICAgfVxuICAgIHJldHVybiBmcm9tKHRoaXMucHVibnViLmhpc3RvcnkoeyBjaGFubmVsOiBjaGFubmVsLCBjb3VudDogY291bnQsIHJldmVyc2U6IGZhbHNlLCBzdGFydDogc3RhcnQgfSkpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgICh7IG1lc3NhZ2VzLCBzdGFydFRpbWVUb2tlbiwgZW5kVGltZVRva2VuIH0pOiBbQXJyYXk8TWVzc2FnZT4sIG51bWJlciwgbnVtYmVyXSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFttZXNzYWdlcy5tYXAoaXRlbSA9PiBtZXJnZShpdGVtLmVudHJ5LCB7IHRpbWV0b2tlbjogaXRlbS50aW1ldG9rZW4gfSkpLCBzdGFydFRpbWVUb2tlbiwgZW5kVGltZVRva2VuXTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBkZWxldGVNZXNzYWdlcyhjaGFubmVsOiBzdHJpbmcsIHRpbWV0b2tlbnM6IEFycmF5PG51bWJlcj4pIHtcbiAgICBsZXQgcHJvbWlzZXMgPSB0aW1ldG9rZW5zLm1hcCh0aW1ldG9rZW4gPT4gdGhpcy5wdWJudWIuZGVsZXRlTWVzc2FnZXMoeyBjaGFubmVsOiBjaGFubmVsLCBzdGFydDogTnVtYmVyKG5ldyBCaWcodGltZXRva2VuKS5taW51cygyKSksIGVuZDogTnVtYmVyKG5ldyBCaWcodGltZXRva2VuKS5wbHVzKDIpKSB9KSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKChyZXQ6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENoYW5uZWxUeXBpbmcoY2hhbm5lbDogc3RyaW5nKTogU3ViamVjdDxbc3RyaW5nLCBib29sZWFuXT4ge1xuICAgIGlmIChjaGFubmVsICYmIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdICYmIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLnR5cGluZykge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLnR5cGluZztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaW5pdENoYW5uZWxUeXBpbmcoY2hhbm5lbDogc3RyaW5nLCBwYXJlbnQ6IFN1YnNjcmlwdGlvbik6IFN1YmplY3Q8W3N0cmluZywgYm9vbGVhbl0+IHtcbiAgICBsZXQgdHlwaW5nID0gbmV3IFN1YmplY3Q8W3N0cmluZywgYm9vbGVhbl0+KCk7XG4gICAgbGV0IHR5cGluZ1N1YnNjcmlwdGlvbiA9IHRoaXMuX3ByZXNlbmNlU3ViamVjdFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihtID0+IG0uY2hhbm5lbCA9PT0gY2hhbm5lbCAmJiBtLnV1aWQgIT09IHRoaXMuc2VuZGVyLmlkKSxcbiAgICAgICAgbWFwKCh7IHV1aWQsIGFjdGlvbiwgc3RhdGUgfSkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdsZWF2ZSc6XG4gICAgICAgICAgICBjYXNlICd0aW1lb3V0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIFt1dWlkLCBmYWxzZV07XG4gICAgICAgICAgICBjYXNlICdqb2luJzpcbiAgICAgICAgICAgIGNhc2UgJ3N0YXRlLWNoYW5nZSc6XG4gICAgICAgICAgICAgIHJldHVybiBbdXVpZCwgaXNPYmplY3Qoc3RhdGUpICYmIHN0YXRlLmlzVHlwaW5nID09PSAndHJ1ZSddO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodHlwaW5nKTtcbiAgICBwYXJlbnQuYWRkKHR5cGluZyk7XG4gICAgcGFyZW50LmFkZCh0eXBpbmdTdWJzY3JpcHRpb24pO1xuICAgIHJldHVybiB0eXBpbmc7XG4gIH1cblxuICBqb2luKGNoYW5uZWw6IHN0cmluZywgd2l0aFByZXNlbmNlID0gZmFsc2UsIHdpdGhUeXBpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8TWVzc2FnZT4ge1xuICAgIGlmICghdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0gfHwgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0uc3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgbGV0IG1lc3NhZ2VzID0gbmV3IFN1YmplY3Q8TWVzc2FnZT4oKTtcbiAgICAgIGlmICh0aGlzLl9tZXNzYWdlU3ViamVjdCkge1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gdGhpcy5fbWVzc2FnZVN1YmplY3RcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihtID0+IG0uY2hhbm5lbCA9PT0gY2hhbm5lbCksXG4gICAgICAgICAgICBtYXAobSA9PiBtZXJnZShtLm1lc3NhZ2UsIHsgdGltZXRva2VuOiBtLnRpbWV0b2tlbiB9KSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZShtZXNzYWdlcyk7XG4gICAgICAgIHN1YnNjcmlwdGlvbi5hZGQobWVzc2FnZXMpO1xuICAgICAgICBsZXQgdHlwaW5nO1xuICAgICAgICBpZiAod2l0aFR5cGluZykge1xuICAgICAgICAgIHR5cGluZyA9IHRoaXMuaW5pdENoYW5uZWxUeXBpbmcoY2hhbm5lbCwgc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24uYWRkKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdID0geyBtZXNzYWdlcywgc3Vic2NyaXB0aW9uLCB0eXBpbmcgfTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnB1Ym51Yikge1xuICAgICAgICB0aGlzLnB1Ym51Yi5zdWJzY3JpYmUoeyBjaGFubmVsczogW2NoYW5uZWxdLCB3aXRoUHJlc2VuY2U6IHdpdGhQcmVzZW5jZSB8fCB3aXRoVHlwaW5nIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fY2hhbm5lbHMgJiYgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0gJiYgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0ubWVzc2FnZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGFubmVsc1tjaGFubmVsXS5tZXNzYWdlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBTdWJqZWN0PE1lc3NhZ2U+KCk7XG4gICAgfVxuICB9XG5cbiAgbGVhdmUoY2hhbm5lbDogc3RyaW5nKSB7XG4gICAgaWYgKGNoYW5uZWwgJiYgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0gJiYgdGhpcy5wdWJudWIpIHtcbiAgICAgIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5wdWJudWIudW5zdWJzY3JpYmUoeyBjaGFubmVsczogW2NoYW5uZWxdIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1Ymxpc2goY2hhbm5lbDogc3RyaW5nLCBtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgdGhpcy5wdWJudWIucHVibGlzaCh7IGNoYW5uZWw6IGNoYW5uZWwsIG1lc3NhZ2U6IG1lc3NhZ2UgfSk7XG4gIH1cblxuICBzZW5kQ2hhdE1lc3NhZ2UoY2hhbm5lbDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIHJlY2VpdmVySWQ6IHN0cmluZywgcmVjZWl2ZXJVc2VybmFtZTogc3RyaW5nLCBjaGFubmVscz86IENoYW5uZWxzLCBwaG90bz86IGFueSwgdHlwZSA9ICdjaGF0Jywgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGlzR3JvdXAgPSB0aGlzLmlzR3JvdXBDaGFubmVsKGNoYW5uZWwpO1xuICAgIGxldCBhbGVydFRleHQgPSAnJzsgLy90aGlzLnNlbmRlci51c2VybmFtZTtcbiAgICBpZiAodGV4dC5pbmRleE9mKCdpb25pYy1jaGF0LWltYWdlJykgPj0gMCkge1xuICAgICAgYWxlcnRUZXh0ICs9ICcnICsgdGhpcy50cmFuc2xhdGUuZ2V0KCdTRU5EQU5FV1BIT1RPJyk7IC8vJzogJ1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydFRleHQgKz0gJycgKyB0ZXh0LnN1YnN0cigwLCA1MCkgKyAnLi4uJztcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2U6IE1lc3NhZ2UgPSB7XG4gICAgICBjaGFubmVsOiBjaGFubmVsLFxuICAgICAgbWVzc2FnZTogdGV4dCxcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgLy9lbnRpdHlJZDogZW50aXR5SWQsXG4gICAgICBzZW5kZXJfaWQ6IHRoaXMuc2VuZGVyLmlkLFxuICAgICAgc2VuZGVyX3VzZXJuYW1lOiB0aGlzLnNlbmRlci51c2VybmFtZSxcbiAgICAgIHNlbmRlcl9waG90bzogdGhpcy5zZW5kZXIuaW1hZ2UsXG4gICAgICByZWNlaXZlcl9pZDogcmVjZWl2ZXJJZCxcbiAgICAgIHJlY2VpdmVyX3VzZXJuYW1lOiByZWNlaXZlclVzZXJuYW1lLFxuICAgICAgaXNHcm91cDogaXNHcm91cCxcbiAgICAgIGdyb3VwTmFtZTogIWlzR3JvdXAgPyBudWxsIDogY2hhbm5lbHMubmFtZSxcbiAgICAgIGRhdGVfc2VudDogbmV3IERhdGUoKSxcbiAgICAgIHBob3RvOiBwaG90byA/IDxhbnk+cGljayhwaG90bywgWydfaWQnLCAndmFsdWUnLCAnZWRpdCcsICd0ZXh0cycsICd0aXRsZScsICduYW1lJywgJ21pc3Npb25kZXNjcmlwdGlvblJlZicsICdtaXNzaW9uUmVmJywgJ21pc3Npb25kYXRhUmVmJywgJ3VzZXJSZWYnLCAndXNlckRpc3BsYXluYW1lJywgJ2FkZHJlc3MnXSkgOiBudWxsXG4gICAgfTtcbiAgICAvLyBsZXQgb2ZmbGluZU1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlLCB7XG4gICAgLy8gICAgIHBuX2FwbnM6IHsgYXBzOiB7IGFsZXJ0OiBhbGVydFRleHQsIGJhZGdlOiAxIH0sIHNlbmRlcl91c2VybmFtZTogdGhpcy5zZW5kZXIudXNlcm5hbWUsIGNoYW5uZWw6IGNoYW5uZWwgfSwgLy90eXBlOiB0eXBlIHx8IGNoYXRFdmVudC5uZXdNZXNzYWdlLFxuICAgIC8vICAgICBwbl9nY206IHsgZGF0YTogeyBtZXNzYWdlOiBhbGVydFRleHQsIHRpdGxlOiAnWW9vYmljJywgc2VuZGVyX3VzZXJuYW1lOiB0aGlzLnNlbmRlci51c2VybmFtZSwgY2hhbm5lbDogY2hhbm5lbCB9IH0sIC8vdHlwZTogdHlwZSB8fCBjaGF0RXZlbnQubmV3TWVzc2FnZSxcbiAgICAvLyAgICAgcG5fZGVidWc6IGZhbHNlXG4gICAgLy8gfSk7XG5cbiAgICBsZXQgb3RoZXJJZHMgPSBbXTtcbiAgICBpZiAoIWlzR3JvdXApIHtcbiAgICAgIG90aGVySWRzID0gW3JlY2VpdmVySWRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdGhlcklkcyA9IGNoYW5uZWxzLm90aGVycy5tYXAodSA9PiB1Ll9pZCk7XG4gICAgfVxuXG4gICAgb3RoZXJJZHMuZm9yRWFjaChvdGhlcklkID0+IHtcbiAgICAgIGxldCBwcm9taXNlID0gIXRoaXMuaXNPbmxpbmUob3RoZXJJZCkgPyBQcm9taXNlLnJlc29sdmUoZmFsc2UpIDogdGhpcy5pc1ByZXNlbnQob3RoZXJJZCwgY2hhbm5lbCk7XG4gICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgIHByZXNlbnQgPT4ge1xuICAgICAgICAgIGlmICghcHJlc2VudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNPbmxpbmUob3RoZXJJZCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5wdWJsaXNoKG90aGVySWQsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICB0aGlzLnB1c2hcbiAgICAgICAgICAgICAgICAubm90aWZ5VXNlckJ5SWQob3RoZXJJZCwge1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTSUxFTlROT1RJRklDQVRJT04nLFxuICAgICAgICAgICAgICAgICAgbW9kZTogJ25vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgICBwZW5kaW5nQmFkZ2VQYXRoOiAncGVuZGluZ0JhZGdlcy5fY29tbXVuaWNhdGUnICsgKGlzR3JvdXAgPyAnLnRlYW0nIDogJy5kaXJlY3QnKSxcbiAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudF9hdmFpbGFibGU6IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge30pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5wdXNoXG4gICAgICAgICAgICAgICAgLm5vdGlmeVVzZXJCeUlkKG90aGVySWQsIHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAoaXNHcm91cCA/IGNoYW5uZWxzLm5hbWUgKyAnIC0gJyA6ICcnKSArIHRoaXMuc2VuZGVyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgYm9keTogYWxlcnRUZXh0LFxuICAgICAgICAgICAgICAgICAgbW9kZTogJ25vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgICBwZW5kaW5nQmFkZ2VQYXRoOiAncGVuZGluZ0JhZGdlcy5fY29tbXVuaWNhdGUnICsgKGlzR3JvdXAgPyAnLnRlYW0nIDogJy5kaXJlY3QnKSxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IG1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHt9XG4gICAgICApO1xuICAgIH0pO1xuICAgIHRoaXMucHVibGlzaChjaGFubmVsLCBtZXNzYWdlKTtcbiAgfVxuXG4gIHNhZmVNdWx0aXBsZXhNZXNzYWdlT2JzZXJ2YWJsZShjaGFubmVsczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE1lc3NhZ2U+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8TWVzc2FnZT4ob2JzZXJ2ZXIgPT4ge1xuICAgICAgZm9yRWFjaChjaGFubmVscywgKGNoYW5uZWw6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24uYWRkKHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLm1lc3NhZ2VzLnN1YnNjcmliZShtID0+IG9ic2VydmVyLm5leHQobSkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaXNBdmFpbGFibGUoKSB7XG4gICAgbGV0IGF2YWlsYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghUHViTnViKSB7XG4gICAgICAgIGF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpIHtcbiAgICAgICAgYXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhdmFpbGFibGU7XG4gIH1cblxuICBpbml0KHVzZXI6IFVzZXIpOiBPYnNlcnZhYmxlPE1lc3NhZ2U+IHtcbiAgICAvL3JldHVybiBmcm9tKHRoaXMuZ2V0UHVibnViKCkpLnBpcGUobWVyZ2VNYXAocHVibnViID0+IHtcbiAgICBpZiAoIXRoaXMuaXNBdmFpbGFibGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ByZXNlbmNlU3ViamVjdCA9ICF0aGlzLl9wcmVzZW5jZVN1YmplY3QgfHwgdGhpcy5fcHJlc2VuY2VTdWJqZWN0LmNsb3NlZCA/IG5ldyBTdWJqZWN0PFByZXNlbmNlRXZlbnQ+KCkgOiB0aGlzLl9wcmVzZW5jZVN1YmplY3Q7XG4gICAgdGhpcy5fbWVzc2FnZVN1YmplY3QgPSAhdGhpcy5fbWVzc2FnZVN1YmplY3QgfHwgdGhpcy5fbWVzc2FnZVN1YmplY3QuY2xvc2VkID8gbmV3IFN1YmplY3Q8TWVzc2FnZUV2ZW50PigpIDogdGhpcy5fbWVzc2FnZVN1YmplY3Q7XG4gICAgdGhpcy5fc3RhdHVzU3ViamVjdCA9ICF0aGlzLl9zdGF0dXNTdWJqZWN0IHx8IHRoaXMuX3N0YXR1c1N1YmplY3QuY2xvc2VkID8gbmV3IFN1YmplY3Q8U3RhdHVzRXZlbnQ+KCkgOiB0aGlzLl9zdGF0dXNTdWJqZWN0O1xuICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbiA9ICF0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24gfHwgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLmNsb3NlZCA/IG5ldyBTdWJzY3JpcHRpb24oKSA6IHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbjtcblxuICAgIHRoaXMuc2VuZGVyID0gbmV3IFB1Ym51YlNlbmRlcih1c2VyLl9pZCwgVXNlci5nZXREaXNwbGF5TmFtZSh1c2VyKSwgdXNlci5pbWFnZURhdGEpO1xuICAgIHRoaXMucHVibnViID0gbmV3IFB1Yk51Yih7XG4gICAgICBzc2w6IHRydWUsXG4gICAgICBrZWVwQWxpdmU6IHRydWUsXG4gICAgICBhbm5vdW5jZUZhaWxlZEhlYXJ0YmVhdHM6IGZhbHNlLFxuICAgICAgaGVhcnRiZWF0SW50ZXJ2YWw6IDYwMCxcbiAgICAgIHByZXNlbmNlVGltZW91dDogMzAwLFxuICAgICAgLy8gc2V0UHJlc2VuY2VUaW1lb3V0OiAwLFxuICAgICAgLy8gc2V0UHJlc2VuY2VUaW1lb3V0V2l0aEN1c3RvbUludGVydmFsOiAwLFxuICAgICAgcHVibGlzaEtleTogdGhpcy5jb3JlQ29uZmlnLmdldEtleSgncHVibnViUHVibGlzaEtleScpLFxuICAgICAgc3Vic2NyaWJlS2V5OiB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdwdWJudWJTdWJzY3JpYmVLZXknKSxcbiAgICAgIHV1aWQ6IHRoaXMuc2VuZGVyLmlkXG4gICAgfSk7XG5cbiAgICB0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24uYWRkKHRoaXMuX3ByZXNlbmNlU3ViamVjdCk7XG4gICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLmFkZCh0aGlzLl9tZXNzYWdlU3ViamVjdCk7XG4gICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLmFkZCh0aGlzLl9zdGF0dXNTdWJqZWN0KTtcbiAgICAvLyBjb25uZWN0IGxpc3RlbmVyIHRvIHN1YmplY3RzXG4gICAgdGhpcy5wdWJudWIuYWRkTGlzdGVuZXIoe1xuICAgICAgcHJlc2VuY2U6IChwOiBQcmVzZW5jZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9wcmVzZW5jZVN1YmplY3QgJiYgdGhpcy5fcHJlc2VuY2VTdWJqZWN0Lm5leHQpIHtcbiAgICAgICAgICB0aGlzLl9wcmVzZW5jZVN1YmplY3QubmV4dChwKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1lc3NhZ2U6IChtOiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX21lc3NhZ2VTdWJqZWN0ICYmIHRoaXMuX21lc3NhZ2VTdWJqZWN0Lm5leHQpIHtcbiAgICAgICAgICB0aGlzLl9tZXNzYWdlU3ViamVjdC5uZXh0KG0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3RhdHVzOiAoczogU3RhdHVzRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXR1c1N1YmplY3QgJiYgdGhpcy5fc3RhdHVzU3ViamVjdC5uZXh0KSB7XG4gICAgICAgICAgaWYgKHMuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1c1N1YmplY3QuZXJyb3Iocy5lcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1c1N1YmplY3QubmV4dChzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHN1YnNjcmliZSB0byBfcHJlc2VuY2VTdWJqZWN0IG9uIHRoZSBtYWluIGNoYW5uZWwgdG8gbWFuYWdlIG9ubGluZSB1c2VyLCBpZ25vcmUgb3duIGV2ZW50cy5cbiAgICBsZXQgb25saW5lVXNlcnNTdWJzY3JpcHRpb24gPSB0aGlzLl9wcmVzZW5jZVN1YmplY3QucGlwZShmaWx0ZXIoKHsgdXVpZCwgY2hhbm5lbCB9KSA9PiB1dWlkICE9PSB0aGlzLnNlbmRlci5pZCAmJiBjaGFubmVsID09PSB0aGlzLl9tYWluQ2hhbm5lbCkpLnN1YnNjcmliZSgocHJlc2VuY2U6IFByZXNlbmNlRXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAocHJlc2VuY2UuYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2xlYXZlJzpcbiAgICAgICAgICB0aGlzLm9ubGluZVVzZXJzLmRlbGV0ZShwcmVzZW5jZS51dWlkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnam9pbic6XG4gICAgICAgIGNhc2UgJ3N0YXRlLWNoYW5nZSc6XG4gICAgICAgICAgdGhpcy5vbmxpbmVVc2Vycy5zZXQocHJlc2VuY2UudXVpZCwgcHJlc2VuY2Uuc3RhdGUgfHwge30pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0aW1lb3V0JzpcbiAgICAgICAgICB0aGlzLm9ubGluZVVzZXJzLnNldChwcmVzZW5jZS51dWlkLCBudWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW50ZXJ2YWwnOlxuICAgICAgICAgIGVhY2gocHJlc2VuY2Uuam9pbiwgdXNlcklkID0+IHtcbiAgICAgICAgICAgIHRoaXMub25saW5lVXNlcnMuc2V0KHVzZXJJZCwge30pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGVhY2gocHJlc2VuY2UudGltZWRvdXQsIHVzZXJJZCA9PiB7XG4gICAgICAgICAgLy8gICAgIHRoaXMub25saW5lVXNlcnMuc2V0KHVzZXJJZCwgbnVsbCk7XG4gICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgZWFjaChwcmVzZW5jZS5sZWF2ZSwgdXNlcklkID0+IHtcbiAgICAgICAgICAgIHRoaXMub25saW5lVXNlcnMuZGVsZXRlKHVzZXJJZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAocHJlc2VuY2UuaGVyZV9ub3dfcmVmcmVzaCAmJiBwcmVzZW5jZS5jaGFubmVsID09PSB0aGlzLl9tYWluQ2hhbm5lbCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVPbmxpbmVVc2VycygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24uYWRkKG9ubGluZVVzZXJzU3Vic2NyaXB0aW9uKTtcblxuICAgIGxldCBpbml0TWVzc2FnZUNoYW5uZWxzOiBzdHJpbmdbXSA9IFtdO1xuICAgIC8vd2UgdXNlIHRoZSBtYWluIGNoYW5uZWwgZm9yIG9ubGluZS9wcmVzZW5jZSBkZXRlY3Rpb24sIHN1YnNjcmliZSB0byB0aGUgcHJlc2VuY2UgY2hhbm5lbCBhcyB3ZWxsLlxuICAgIHRoaXMuam9pbih0aGlzLl9tYWluQ2hhbm5lbCwgdHJ1ZSk7XG4gICAgdGhpcy51cGRhdGVPbmxpbmVVc2VycygpO1xuICAgIGluaXRNZXNzYWdlQ2hhbm5lbHMucHVzaCh0aGlzLl9tYWluQ2hhbm5lbCk7XG5cbiAgICAvL3dlIHVzZSBhIHNwZWNpZmljIHVzZXIgY2hhbm5lbCBmb3Igbm90aWZpY2F0aW9uXG4gICAgdGhpcy5qb2luKHRoaXMuc2VuZGVyLmlkKTtcbiAgICBpbml0TWVzc2FnZUNoYW5uZWxzLnB1c2godGhpcy5zZW5kZXIuaWQpO1xuXG4gICAgLy93ZSBzdWJzY3JpYmUgdG8gZWFjaCBncm91cCBvZiB0aGUgY3VycmVudCB1c2VyIGZvciBmZWVkIG5vdGlmaWNhdGlvbiBmb3IgZXhhbXBsZVxuICAgIGlmICghdGhpcy5hdXRoZW50aWNhdGlvbi5pc0FkbWluKCkgJiYgdGhpcy5zZXNzaW9uLmdyb3Vwcykge1xuICAgICAgdGhpcy5zZXNzaW9uLmdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgICAgdGhpcy5qb2luKGdyb3VwKTtcbiAgICAgICAgaW5pdE1lc3NhZ2VDaGFubmVscy5wdXNoKGdyb3VwKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNhZmVNdWx0aXBsZXhNZXNzYWdlT2JzZXJ2YWJsZShpbml0TWVzc2FnZUNoYW5uZWxzKTtcbiAgICAvL30pKTtcbiAgfVxuXG4gIHVwZGF0ZU9ubGluZVVzZXJzKCkge1xuICAgIHRoaXMucHVibnViLmhlcmVOb3coeyBjaGFubmVsczogW3RoaXMuX21haW5DaGFubmVsXSwgaW5jbHVkZVVVSURzOiB0cnVlIH0pLnRoZW4oKHJlc3BvbnNlOiBIZXJlTm93UmVzcG9uc2U8VVVJRFN0YXRlPEdsb2JhbFN0YXRlPj4pID0+IHtcbiAgICAgIHRoaXMub25saW5lVXNlcnMuY2xlYXIoKTtcbiAgICAgIHJlc3BvbnNlLmNoYW5uZWxzW3RoaXMuX21haW5DaGFubmVsXS5vY2N1cGFudHMuZm9yRWFjaChvY2N1cGFudCA9PiB7XG4gICAgICAgIHRoaXMub25saW5lVXNlcnMuc2V0KG9jY3VwYW50LnV1aWQsIG9jY3VwYW50LnN0YXRlIHx8IHt9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdCgpIHtcbiAgICBpZiAodGhpcy5zZW5kZXIgJiYgdGhpcy5zZW5kZXIuaWQgJiYgdGhpcy5wdWJudWIpIHtcbiAgICAgIHRoaXMucHVibnViLnVuc3Vic2NyaWJlQWxsKCk7XG4gICAgICB0aGlzLnB1Ym51Yi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuX2NoYW5uZWxzID0ge307XG4gICAgICB0aGlzLnB1Ym51Yi5zdG9wKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5fcHJlc2VuY2VTdWJqZWN0O1xuICAgIGRlbGV0ZSB0aGlzLl9tZXNzYWdlU3ViamVjdDtcbiAgICBkZWxldGUgdGhpcy5fc3RhdHVzU3ViamVjdDtcbiAgICBkZWxldGUgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgcmVnaXN0ZXJEZXZpY2UodG9rZW4sIGNoYW5uZWwsIHR5cGUpIHtcbiAgICB0aGlzLnB1Ym51Yi5wdXNoLmFkZENoYW5uZWxzKHsgZGV2aWNlOiB0b2tlbiwgY2hhbm5lbHM6IFtjaGFubmVsXSwgcHVzaEdhdGV3YXk6IHR5cGUgfSwgZXJyb3IgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMubG9nLmxvZygncHVibnViIHJlZ2lzdGVyZWQgZXJyb3IgJyArIHRva2VuLCBlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZy5sb2coJ3B1Ym51YiByZWdpc3RlcmVkIHN1Y2Nlc3MgJyArIHRva2VuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVucmVnaXN0ZXJEZXZpY2UodG9rZW4sIGNoYW5uZWwsIHR5cGUpIHtcbiAgICB0aGlzLnB1Ym51Yi5wdXNoLnJlbW92ZUNoYW5uZWxzKHsgZGV2aWNlOiB0b2tlbiwgY2hhbm5lbHM6IFtjaGFubmVsXSwgcHVzaEdhdGV3YXk6IHR5cGUgfSwgZXJyb3IgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMubG9nLmxvZygncHVibnViIHVucmVnaXN0ZXJlZCBlcnJvciAnICsgdG9rZW4sIGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nLmxvZygncHVibnViIHVucmVnaXN0ZXJlZCBzdWNjZXNzICcgKyB0b2tlbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
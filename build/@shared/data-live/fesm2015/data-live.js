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
import { __decorate, __metadata, __awaiter, __rest } from 'tslib';
import { Entity, Model, Editable, User, Authentication, Session, Push, Broker, Users, Config, Requestor, DataCoreModule, Searchable, FORM_FILES_IMAGE_FILTER, getGroupsTransform } from '@shared/data-core';
import { FormFieldType, toDate, unix, showAlert, closeModal } from '@shared/stencil';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Channel = class Channel extends Entity {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//import * as pubnubLib from 'pubnub/dist/web/pubnub';
class PubnubSender {
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
class Pubnub {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Channel$1 {
    /**
     * @param {?} broker
     * @param {?} pubnub
     * @param {?} session
     * @param {?} translate
     */
    constructor(broker, pubnub, session, translate) {
        this.broker = broker;
        this.pubnub = pubnub;
        this.session = session;
        this.translate = translate;
    }
    /**
     * @param {?} channels
     * @return {?}
     */
    createChannels(channels) {
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            this.broker.save('channels', channels).subscribe((/**
             * @param {?} c
             * @return {?}
             */
            c => {
                this.hydrateOthers(c, true);
                this.updateChannels(c).subscribe((/**
                 * @param {?} ret
                 * @return {?}
                 */
                ret => {
                    observer.next(c);
                    observer.complete();
                }));
            }));
        }));
    }
    /**
     * @param {?} channelsId
     * @return {?}
     */
    getChannelsById(channelsId) {
        return this.broker.getAll('channels', null, null, null, [[{ field: 'channel', operator: { _id: 'eq' }, value: channelsId }]]).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && retVal.data && retVal.data.length > 0) {
                /** @type {?} */
                let channels = retVal.data[0];
                this.hydrateOthers(channels, true);
                return channels;
            }
            return null;
        })));
    }
    /**
     * @param {?} channelId
     * @return {?}
     */
    getChannelById(channelId) {
        return this.broker.getAll('channel', null, null, null, [[{ field: 'channel', operator: { _id: 'eq' }, value: channelId }]]).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && retVal.data && retVal.data.length > 0) {
                /** @type {?} */
                let channel = retVal.data[0];
                this.hydrateOthers(channel, false);
                return channel;
            }
            return null;
        })));
    }
    //update the channel itself when we publish a new message
    /**
     * @param {?} channel
     * @return {?}
     */
    update(channel) {
        channel = Object.assign({}, channel);
        delete channel.others;
        return this.broker.save('channel', channel);
    }
    // delete a channel
    /**
     * @param {?} channel
     * @return {?}
     */
    deleteChannel(channel) {
        // TODO: implement pubnub.deleteChannels
        return this.broker.delete('channel', channel._id);
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    updateChannels(channel) {
        channel = Object.assign({}, channel);
        delete channel.others;
        return this.broker.save('channels', channel);
    }
    // delete a group channel
    /**
     * @param {?} channels
     * @return {?}
     */
    deleteChannels(channels) {
        // TODO: implement pubnub.deleteChannels
        return this.broker.delete('channels', channels._id);
    }
    //Get the channel filter for a specific user
    /**
     * @param {?} user1
     * @param {?=} user2
     * @param {?=} isSupport
     * @return {?}
     */
    getFilter(user1, user2, isSupport) {
        /** @type {?} */
        let usersRef = [{ field: 'usersRef', operator: { _id: 'inq' }, value: [{ _id: user1._id }] }];
        if (user2) {
            usersRef.push({ field: 'usersRef', operator: { _id: 'inq' }, value: [{ _id: user2._id }] });
        }
        if (!isSupport) {
            usersRef.push({ field: 'usersRef', operator: { _id: 'nin' }, value: Users.adminIds });
        }
        return [...usersRef, { field: 'channel', operator: { _id: 'like' }, value: '_' }, { field: 'isSupport', operator: { _id: 'eq' }, value: isSupport === true }];
    }
    /**
     * @param {?} user
     * @return {?}
     */
    getChannelsFilter(user) {
        return [{ field: 'usersRef', operator: { _id: 'inq' }, value: [{ _id: user._id }] }];
    }
    /**
     * @param {?} channel
     * @param {?=} isGroup
     * @return {?}
     */
    hydrateOthers(channel, isGroup = false) {
        if (channel && channel.users) {
            channel.others = channel.users.filter((/**
             * @param {?} u
             * @return {?}
             */
            u => u._id !== this.session.userId));
        }
        if (isGroup && (!channel.channel || !channel.channel.startsWith('group_'))) {
            channel.channel = 'group_' + channel._id;
        }
        return channel;
    }
    //return the channel beetween 2 users
    /**
     * @param {?} user1
     * @param {?=} user2
     * @param {?=} isSupport
     * @return {?}
     */
    getByUsers(user1, user2, isSupport) {
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            this.broker.getAll('channel', null, null, null, [this.getFilter(user1, user2, isSupport)]).subscribe((/**
             * @param {?} retVal
             * @return {?}
             */
            retVal => {
                /** @type {?} */
                let channel;
                if (retVal.data.length > 0) {
                    channel = retVal.data[0];
                    this.hydrateOthers(channel);
                    observer.next(channel);
                    observer.complete();
                }
                else {
                    channel = {
                        usersRef: isSupport ? [this.pubnub.supportId, user1._id] : [user1._id, user2._id],
                        channel: isSupport ? this.pubnub.getSupportChannelId(user1._id) : this.pubnub.getChannelId(user1._id, user2._id),
                        isSupport: isSupport === true,
                        isFavorite: false,
                        _tenantRef: user2 ? user2._tenantRef : user1._tenantRef,
                        users: isSupport
                            ? [
                                {
                                    _id: this.pubnub.supportId,
                                    username: 'smartin@yoobic.com',
                                    firstName: 'Sarah',
                                    lastName: 'Martin',
                                    imageData: 'http://res.cloudinary.com/www-yoobic-com/image/upload/a_exif/v1466421996/jv0vc0yizwqefj22iirh.png'
                                },
                                user1
                            ]
                            : [user1, user2]
                    };
                    this.broker.setAcl(channel, null, null, null, user2 ? [user1._id, user2._id] : [user1._id]);
                    this.update((/** @type {?} */ (channel))).subscribe((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => {
                        this.hydrateOthers(c);
                        observer.next(c);
                        observer.complete();
                    }));
                }
            }));
        }));
    }
    //Return the support channel for a specific user
    /**
     * @param {?} user
     * @return {?}
     */
    getSupportByUser(user) {
        return this.getByUsers(user, null, true);
    }
    /**
     * @param {?} userId
     * @param {?=} isGroup
     * @return {?}
     */
    getTransform(userId, isGroup = false) {
        return (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            /** @type {?} */
            let channels = [];
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                if (res.data && res.data.map) {
                    if (!isGroup) {
                        res.data = uniqBy(res.data, 'channel');
                    }
                    channels = res.data
                        .map((/**
                     * @param {?} channel
                     * @return {?}
                     */
                    (channel) => {
                        this.hydrateOthers(channel, isGroup);
                        if (channel.others && channel.others.length > 0) {
                            if (!isGroup) {
                                channel.isOnline = this.pubnub.isOnline(channel.others[0]._id);
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
                    x => x !== undefined));
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
                    (channel) => {
                        return this.pubnub.getHistory(channel.channel, 1).pipe(map((/**
                         * @param {?} retVal
                         * @return {?}
                         */
                        (retVal) => {
                            if (retVal.length > 0) {
                                channel.lastMessage = null;
                                channel.lastMessageAlternate = null;
                                channel.lastMessageDate = '';
                                /** @type {?} */
                                let messages = retVal[0];
                                if (messages.length > 0) {
                                    /** @type {?} */
                                    let lastMessage = messages[0];
                                    if (!channel.deleteMessages || channel.deleteMessages.indexOf(lastMessage.date_sent) < 0) {
                                        channel.lastMessage = lastMessage.message;
                                        channel.lastMessageDate = lastMessage.date_sent;
                                        if (channel.lastMessage && channel.lastMessage.indexOf('ionic-chat-image') > 0) {
                                            channel.lastMessage = this.translate.get('PHOTO');
                                        }
                                        channel.lastMessageAlternate = lastMessage.sender_id !== this.session.userId;
                                    }
                                }
                            }
                            return channel;
                        })));
                    }))).subscribe((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => {
                        c = orderBy(c, ['lastMessageDate'], ['desc']);
                        observer.next({ count: res.count, data: (/** @type {?} */ (c)) });
                        observer.complete();
                    }));
                }
            }));
        });
    }
    //Remove the current user from the users list and assign the others attribute
    /**
     * @param {?} userId
     * @return {?}
     */
    getTransformChannel(userId) {
        return this.getTransform(userId, false);
    }
    //Remove the current user from the users list and assign the others attribute
    /**
     * @param {?} userId
     * @return {?}
     */
    getTransformChannels(userId) {
        return this.getTransform(userId, true);
    }
}
Channel$1.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Channel$1.ctorParameters = () => [
    { type: Broker },
    { type: Pubnub },
    { type: Session },
    { type: Translate }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A provider with every Intercom.JS method
 */
class WebIntercom {
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
        var { app_id } = _a, intercomData = __rest(_a, ["app_id"]);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Intercom$1 {
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
Intercom$1.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Intercom$1.ctorParameters = () => [
    { type: CoreConfig },
    { type: Config },
    { type: Intercom },
    { type: Authentication },
    { type: Session },
    { type: WebIntercom }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Messages {
    /**
     * @param {?} broker
     * @param {?} rq
     */
    constructor(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    getJsonMessage(message) {
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
    }
    /**
     * @param {?} message
     * @return {?}
     */
    sendMail(message) {
        return this.rq.post(this.apiUrl + 'mail', this.getJsonMessage(message));
    }
    /**
     * @param {?} emails
     * @return {?}
     */
    unblockEmails(emails) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/unblockEmails', { emails });
    }
    /**
     * @private
     * @return {?}
     */
    get apiUrl() {
        return this.broker.getApiUrl() + 'Messages/';
    }
}
Messages.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Messages.ctorParameters = () => [
    { type: Broker },
    { type: Requestor }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//import { captureException, init, sessionURL, getSessionURL, identify } from 'logrocket';
//const LogRocket = require('logrocket');
class Track {
    /**
     * @param {?} network
     * @param {?} push
     * @param {?} session
     * @param {?} localStorage
     * @param {?} authentication
     * @param {?} coreConfig
     * @param {?} config
     * @param {?} log
     * @param {?} injector
     * @param {?} intercom
     */
    constructor(network, push, session, localStorage, authentication, coreConfig, config, log, injector, intercom) {
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
    isEnabled(forceLoggedIn = true, ignoreE2E = false) {
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
    }
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
    loadSessionStack() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            try {
                if (!window['SessionStack'] && this.isEnabled(false, true)) {
                    if (this.coreConfig.isIOS() && this.coreConfig.isCordova()) {
                        Object.defineProperty(window.document, 'cookie', {
                            enumerable: true,
                            configurable: true,
                            get: (/**
                             * @return {?}
                             */
                            () => {
                                return this.localStorage.get('document-cookie');
                            }),
                            set: (/**
                             * @param {?} cookieString
                             * @return {?}
                             */
                            cookieString => {
                                /** @type {?} */
                                let cookie = this.localStorage.get('document-cookie');
                                if (cookie) {
                                    /** @type {?} */
                                    let cookies = cookie.split('; ');
                                    /** @type {?} */
                                    let name = cookieString.split('=')[0];
                                    cookies = cookies.filter((/**
                                     * @param {?} c
                                     * @return {?}
                                     */
                                    c => c.indexOf(name + '=') < 0));
                                    cookies.push(cookieString.trim());
                                    cookie = cookies.join('; ');
                                }
                                else {
                                    cookie = cookieString;
                                }
                                this.localStorage.set('document-cookie', cookie);
                            })
                        });
                    }
                    window['SessionStackKey'] = 'SessionStack';
                    window['SessionStack'] = window['SessionStack'] || {
                        t: this.coreConfig.isIonic() ? this.coreConfig.getKey('sessionStackMobile') : this.coreConfig.getKey('sessionStackWeb'),
                        q: []
                    };
                    ['start', 'stop', 'identify', 'getSessionId', 'log', 'setOnDataCallback'].forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    key => {
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
                    let f = document.createElement('script');
                    f.async = !0;
                    f.src = 'https://cdn.sessionstack.com/sessionstack.js';
                    f.onload = (/**
                     * @return {?}
                     */
                    () => {
                        resolve(true);
                    });
                    f.onerror = (/**
                     * @param {?} err
                     * @return {?}
                     */
                    err => {
                        reject(err);
                    });
                    /** @type {?} */
                    let g = document.getElementsByTagName('script')[0];
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
    }
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
    getSessionStackSession() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (window['SessionStack']) {
                window['SessionStack'].getSessionId((/**
                 * @param {?} sessionId
                 * @return {?}
                 */
                sessionId => {
                    this.log.log('SessionStack sessionid', sessionId);
                    resolve(sessionId);
                }));
            }
            else {
                resolve(null);
            }
        }));
    }
    /**
     * @return {?}
     */
    getSessionStackUrl() {
        return 'https://app.sessionstack.com/player/#/sessions/';
    }
    /**
     * @param {?} err
     * @return {?}
     */
    sendSessionStackError(err) {
        // try {
        //   if (this.isEnabled(false) && window['SessionStack']) {
        //     window['SessionStack'].log(err);
        //   }
        // } catch (err) { }
    }
    /**
     * @return {?}
     */
    loadAnalytics() {
        if (!this.isEnabled(false)) {
            return;
        }
        /** @type {?} */
        let analytics = (window.analytics = window.analytics || []);
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
                        let e = Array.prototype.slice.call(arguments);
                        e.unshift(tt);
                        analytics.push(e);
                        return analytics;
                    });
                });
                for (let t = 0; t < analytics.methods.length; t++) {
                    /** @type {?} */
                    let e = analytics.methods[t];
                    analytics[e] = analytics.factory(e);
                }
                analytics.load = (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    /** @type {?} */
                    let e = document.createElement('script');
                    e.type = 'text/javascript';
                    e.async = !0;
                    e.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
                    /** @type {?} */
                    let n = document.getElementsByTagName('script')[0];
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
    }
    /**
     * @param {?} event
     * @param {?=} properties
     * @return {?}
     */
    track(event, properties) {
        if (!event || event === '') {
            return;
        }
        event = event
            .split(' ')
            .map((/**
         * @param {?} word
         * @return {?}
         */
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
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
    }
    /**
     * @param {?} name
     * @param {?=} category
     * @param {?=} properties
     * @return {?}
     */
    page(name, category, properties) {
        if (this.isEnabled() && window.analytics) {
            try {
                window.analytics.page(category, name, merge(this.globalTrackedProps(this.session.user), properties));
            }
            catch (error) { }
        }
    }
    /**
     * @param {?} user
     * @return {?}
     */
    identify(user) {
        if (!user) {
            return;
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.isEnabled()) {
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
                        let segment_traits = {
                            user_id: user._id || '',
                            user_tags: user.tags || '',
                            email: user.email || user.username || '',
                            operating_system: this.coreConfig.getPlatform(),
                            avatar: user.imageData || '',
                            phone: user.telephone || '',
                            gender: user.gender || '',
                            target: this.coreConfig.getFullAppName(),
                            version: this.coreConfig.getAppVersion(),
                            is_dark_theme: Colors.isDarkTheme()
                        };
                        window.analytics.identify(user._id, merge(this.globalTrackedProps(user), segment_traits));
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
            this.intercom.identify(user);
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (window && window['FS'] && window['FS'].getCurrentSessionURL) {
                    /** @type {?} */
                    let fullstoryURL = window['FS'].getCurrentSessionURL();
                    this.intercom.update({
                        fullstoryURL: fullstoryURL
                    });
                }
            }), 2000);
        }), 3000);
    }
    /**
     * @return {?}
     */
    intercomRegisterForPush() {
        this.intercom.registerForPush();
    }
    /**
     * @param {?} user
     * @return {?}
     */
    globalTrackedProps(user) {
        /** @type {?} */
        let props = {
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
            let router;
            router = this.injector.get(Router);
            props = merge(props, { page: router.url });
        }
        catch (err) { }
        return props;
    }
}
Track.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Track.ctorParameters = () => [
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
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TwilioToken {
    /**
     * @param {?} rq
     * @param {?} config
     */
    constructor(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    /**
     * @return {?}
     */
    getToken() {
        return this.rq.get(this.config.apiUrl + 'Twilio/getToken').pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        ret => {
            return ret.TwilioVideoToken;
        })));
    }
}
TwilioToken.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TwilioToken.ctorParameters = () => [
    { type: Requestor },
    { type: Config }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VideoCall {
    /**
     * @param {?} session
     * @param {?} log
     * @param {?} coreConfig
     * @param {?} pubnub
     * @param {?} translate
     */
    constructor(session, log, coreConfig, pubnub, translate) {
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
    useCordova() {
        return this.coreConfig.isCordova() && window['Voxeet'];
    }
    /**
     * @return {?}
     */
    init() {
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
    }
    /**
     * @return {?}
     */
    onInitUserInfo() {
        if (this.session && this.session.user) {
            this.userInfo = this.convertUserInfo(this.session.user);
        }
        else {
            this.userInfo = this.convertUserInfo();
        }
    }
    /**
     * @param {?=} user
     * @return {?}
     */
    convertUserInfo(user) {
        /** @type {?} */
        let userId = '';
        /** @type {?} */
        let userName = '';
        /** @type {?} */
        let imageData = '';
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
    }
    /**
     * @return {?}
     */
    onInitCordova() {
        this.voxeet = window['Voxeet'];
        if (this.voxeet) {
            this.voxeet
                .initialize(this.coreConfig.getKey('voxeetKey'), this.coreConfig.getKey('voxeetSecret'))
                .then((/**
             * @param {?} myUserId
             * @return {?}
             */
            myUserId => {
                this.voxeetUserId = myUserId;
                this.log.log('voxeet is init for cordova:', this.voxeetUserId);
                this.voxeet.appearMaximized(true);
            }))
                .then((/**
             * @return {?}
             */
            () => {
                this.log.log('appearMaximized');
                this.voxeet.defaultBuiltInSpeaker(true);
            }))
                .then((/**
             * @return {?}
             */
            () => {
                this.log.log('defaultBuiltInSpeaker');
                this.voxeet.defaultVideo(true);
            }))
                .then((/**
             * @return {?}
             */
            () => {
                this.log.log('defaultVideo');
                this.voxeet.connect(this.getUserInfo());
            }))
                .then((/**
             * @return {?}
             */
            () => {
                this.log.log('voxeet connected');
            }));
        }
    }
    /**
     * @return {?}
     */
    onInitWeb() {
        this.voxeet = new VoxeetSdk();
        if (this.voxeet) {
            return this.voxeet
                .initialize(this.coreConfig.getKey('voxeetKey'), this.coreConfig.getKey('voxeetSecret'), this.getUserInfo())
                .then((/**
             * @param {?} myUserId
             * @return {?}
             */
            myUserId => {
                this.voxeetUserId = myUserId;
                this.log.log('voxeet is init for web:', this.voxeetUserId);
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            error => {
                this.log.error(error);
            }));
        }
    }
    /**
     * @return {?}
     */
    getUserInfo() {
        if (this.useCordova()) {
            return new window['UserInfo'](this.userInfo.externalId, this.userInfo.name, this.userInfo.avatarUrl);
        }
        else {
            return this.userInfo;
        }
    }
    /**
     * @param {?} alias
     * @return {?}
     */
    createConference(alias) {
        if (this.useCordova()) {
            return this.voxeet.create({ conferenceAlias: alias, params: { videoCodec: 'H264' } });
        }
        else {
            return this.voxeet.createConference({ alias });
        }
    }
    /**
     * @param {?} conf
     * @param {?=} options
     * @return {?}
     */
    joinConference(conf, options) {
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
    }
    /**
     * @return {?}
     */
    hasWebCam() {
        if (window && window.navigator) {
            /** @type {?} */
            let mediaDevices = (/** @type {?} */ (window.navigator.mediaDevices));
            mediaDevices.getMedia = mediaDevices.getUserMedia || mediaDevices.webkitGetUserMedia || mediaDevices.mozGetUserMedia || mediaDevices.msGetUserMedia;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                mediaDevices.getMedia({ video: true }).then((/**
                 * @return {?}
                 */
                () => {
                    resolve(true);
                }), (/**
                 * @return {?}
                 */
                () => resolve(false)));
            }));
        }
        else {
            return Promise.resolve(false);
        }
    }
    /**
     * @return {?}
     */
    hasMicrophone() {
        if (window && window.navigator) {
            /** @type {?} */
            let mediaDevices = (/** @type {?} */ (window.navigator.mediaDevices));
            mediaDevices.getMedia = mediaDevices.getUserMedia || mediaDevices.webkitGetUserMedia || mediaDevices.mozGetUserMedia || mediaDevices.msGetUserMedia;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                mediaDevices.getMedia({ audio: true }).then((/**
                 * @return {?}
                 */
                () => {
                    resolve(true);
                }), (/**
                 * @return {?}
                 */
                () => resolve(false)));
            }));
        }
        else {
            return Promise.resolve(false);
        }
    }
    /**
     * @return {?}
     */
    getConstraint() {
        /** @type {?} */
        let constraints = this.constraints;
        /** @type {?} */
        let camPromise = this.hasWebCam();
        /** @type {?} */
        let micPromise = this.hasMicrophone();
        camPromise.then((/**
         * @param {?} hasCam
         * @return {?}
         */
        hasCam => {
            if (!hasCam) {
                constraints.video = false;
            }
        }));
        micPromise.then((/**
         * @param {?} hasMic
         * @return {?}
         */
        hasMic => {
            if (!hasMic) {
                constraints.audio = false;
            }
        }));
        return constraints;
    }
    /**
     * @param {?} conferenceId
     * @param {?} externalIds
     * @return {?}
     */
    inviteParticipants(conferenceId, externalIds) {
        if (this.useCordova()) {
            return this.voxeet.invite(conferenceId, externalIds.map((/**
             * @param {?} user
             * @return {?}
             */
            user => {
                /** @type {?} */
                let userInfo = this.convertUserInfo(user);
                return new window['UserInfo'](userInfo.externalId, userInfo.name, userInfo.avatarUrl);
            })));
        }
        else {
            return this.voxeet.invite(conferenceId, externalIds.map((/**
             * @param {?} user
             * @return {?}
             */
            user => user._id)));
        }
    }
    /**
     * @param {?=} leaveRoom
     * @return {?}
     */
    leaveConference(leaveRoom = true) {
        if (this.useCordova()) {
            return this.voxeet.leave();
        }
        else {
            return this.voxeet.leaveConference(leaveRoom);
        }
    }
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    addListener(event, handler) {
        if (!this.useCordova() && event && handler) {
            this.voxeet.on(event, handler);
        }
    }
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    removeListener(event, handler) {
        if (!this.useCordova() && event && handler) {
            this.voxeet.removeListener(event, handler);
        }
    }
    /**
     * @return {?}
     */
    removeAllListeners() {
        if (this.voxeet && this.voxeet.removeAllListeners) {
            return this.voxeet.removeAllListeners();
        }
        return Promise.resolve();
    }
    /**
     * @return {?}
     */
    getUserId() {
        return this.voxeetUserId;
    }
    /**
     * @param {?=} userId
     * @param {?=} constraints
     * @return {?}
     */
    startVideo(userId, constraints) {
        if (!this.useCordova()) {
            return this.voxeet.startVideoForUser(userId || this.getUserId(), constraints || this.constraints);
        }
    }
    /**
     * @param {?=} userId
     * @return {?}
     */
    stopVideo(userId) {
        if (!this.useCordova()) {
            return this.voxeet.stopVideoForUser(userId || this.getUserId());
        }
    }
    /**
     * @param {?=} userId
     * @return {?}
     */
    startAudio(userId) {
        if (!this.useCordova()) {
            return this.voxeet.startAudioForUser(userId || this.getUserId());
        }
    }
    /**
     * @param {?=} userId
     * @return {?}
     */
    stopAudio(userId) {
        if (!this.useCordova()) {
            return this.voxeet.stopAudioForUser(userId || this.getUserId());
        }
    }
    /**
     * @param {?} isMuted
     * @param {?=} userId
     * @return {?}
     */
    muteUser(isMuted, userId) {
        if (!this.useCordova()) {
            return this.voxeet.muteUser(userId || this.getUserId(), isMuted);
        }
    }
    /**
     * @param {?=} userId
     * @return {?}
     */
    toggleMute(userId) {
        if (!this.useCordova()) {
            return this.voxeet.toggleMute(userId || this.getUserId());
        }
    }
    /**
     * @param {?} userId
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    setUserPosition(userId, x, y) {
        if (!this.useCordova()) {
            return this.voxeet.setUserPosition(userId, x, y);
        }
    }
    /**
     * @return {?}
     */
    getCurrentSession() {
        if (!this.useCordova()) {
            return this.voxeet;
        }
        else {
            return this.voxeet;
        }
    }
    /**
     * @param {?=} option
     * @return {?}
     */
    getEnumerateAudioDevices(option) {
        if (!this.useCordova()) {
            return this.voxeet.enumerateAudioDevices(option);
        }
        else {
            return Promise.resolve(null);
        }
    }
    /**
     * @return {?}
     */
    getEnumerateVideoDevices() {
        if (!this.useCordova()) {
            return this.voxeet.enumerateVideoDevices();
        }
        else {
            return Promise.resolve(null);
        }
    }
    /**
     * @param {?} deviceId
     * @param {?=} constraints
     * @return {?}
     */
    selectAudioInput(deviceId, constraints) {
        return this.voxeet.selectAudioInput(deviceId, constraints);
    }
    /**
     * @param {?} deviceId
     * @param {?=} constraints
     * @return {?}
     */
    selectAudioOutput(deviceId, constraints) {
        return this.voxeet.selectAudioOutput(deviceId, constraints);
    }
    /**
     * @param {?} deviceId
     * @param {?=} constraints
     * @return {?}
     */
    selectVideoInput(deviceId, constraints) {
        return this.voxeet.selectVideoInput(deviceId, constraints);
    }
    /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    startVideoForUser(userId, constraints) {
        return this.voxeet.startVideoForUser(userId, constraints);
    }
    /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    stopVideoForUser(userId, constraints) {
        return this.voxeet.stopVideoForUser(userId, constraints);
    }
    /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    startAudioForUser(userId, constraints) {
        return this.voxeet.startAudioForUser(userId, constraints);
    }
    /**
     * @param {?} userId
     * @param {?=} constraints
     * @return {?}
     */
    stopAudioForUser(userId, constraints) {
        return this.voxeet.stopAudioForUser(userId, constraints);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    startScreenShare(options) {
        return this.voxeet.startScreenShare(options);
    }
    /**
     * @return {?}
     */
    stopScreenShare() {
        return this.voxeet.stopScreenShare();
    }
    /**
     * @return {?}
     */
    startRecording() {
        return this.voxeet.startRecording();
    }
    /**
     * @return {?}
     */
    stopRecording() {
        return this.voxeet.stopRecording();
    }
    /**
     * @param {?} conferenceId
     * @param {?=} offset
     * @return {?}
     */
    replayRecording(conferenceId, offset) {
        if (conferenceId && this.voxeet && this.voxeet.replayConference) {
            return this.voxeet.replayConference(conferenceId, offset || 0);
        }
        else {
            return Promise.reject('ConferenceId is not provided');
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    shareVideo(url) {
        return this.voxeet.videoPresentation.start(url);
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    updateMediaSettings(settings) {
        /** @type {?} */
        let promises = [];
        /** @type {?} */
        let microphone = settings.microphone;
        /** @type {?} */
        let video = settings.video;
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
    }
    /**
     * @param {?} users
     * @param {?} roomName
     * @param {?} conferenceId
     * @return {?}
     */
    sendChatMessage(users, roomName, conferenceId) {
        /** @type {?} */
        let others = users.filter((/**
         * @param {?} user
         * @return {?}
         */
        user => user._id !== this.session.userId));
        if (others) {
            this.inviteParticipants(conferenceId, others);
            others
                .map((/**
             * @param {?} user
             * @return {?}
             */
            user => user._id))
                .forEach((/**
             * @param {?} userId
             * @return {?}
             */
            userId => {
                this.pubnub.sendChatMessage(userId, this.translate.get('VIDEOCALLCALLING', { user: User.getDisplayName(this.session.user) }), userId, null, null, null, 'videocall', { conferenceId, user: this.session.user, users });
            }));
        }
    }
    /**
     * @return {?}
     */
    disconnect() {
        if (this.voxeet && isFunction(this.voxeet.disconnect)) {
            this.isInit = false;
            this.voxeet.disconnect().then((/**
             * @return {?}
             */
            () => {
                this.log.log('voxeet disconnected');
            }));
        }
    }
    /**
     * @return {?}
     */
    reconnect() {
        if (this.useCordova()) {
            this.voxeet.connect(this.getUserInfo());
        }
    }
    /**
     * @param {?} currentMessage
     * @param {?} channel
     * @return {?}
     */
    sendRecordedConferenceId(currentMessage, channel) {
        if (currentMessage && channel && channel.others && channel.others[0] && channel.others[0]._id) {
            this.pubnub.sendChatMessage(channel.channel, currentMessage, channel.others[0]._id, null, (/** @type {?} */ (channel)), {}, 'conference');
        }
    }
    /**
     * @return {?}
     */
    showNoWebCamAlert() {
        showAlert(this.translate.get('NOWEBCAM'), [this.translate.get('OK')], null, '');
    }
    /**
     * @return {?}
     */
    showFailedConnectAlert() {
        showAlert(this.translate.get('CONFERENCEFAILED'), [this.translate.get('OK')], null, '');
    }
    /**
     * @return {?}
     */
    showCallerLeftAlert() {
        return showAlert('', [this.translate.get('OK')], '', this.translate.get('CALLERLEFT'));
    }
    /**
     * @return {?}
     */
    showRecieverLeft() {
        return showAlert('', [this.translate.get('OK')], '', this.translate.get('RECIEVERLEFT'));
    }
    /**
     * @return {?}
     */
    showRecordCompleteAlert() {
        return showAlert('', [this.translate.get('OK')], '', this.translate.get('CALLRECORDED'));
    }
    /**
     * @param {?} toast
     * @return {?}
     */
    setVideoToast(toast) {
        this.videoToast = toast;
    }
    /**
     * @param {?} modal
     * @return {?}
     */
    setVideoModal(modal) {
        this.videoModal = modal;
    }
    /**
     * @return {?}
     */
    closeVideoModal() {
        if (this.videoModal) {
            closeModal(this.videoModal);
            this.videoModal = null;
        }
    }
    /**
     * @return {?}
     */
    dismissVideoToast() {
        if (this.videoToast) {
            this.videoToast.dismiss();
            this.videoToast = null;
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    onSendDeclineMessage(data) {
        if (data && data.options && data.sender_id) {
            this.pubnub.sendChatMessage(data.sender_id, this.translate.get('VIDEOCALLCANCEL', { user: User.getDisplayName(this.session.user) }), this.session.user._id, null, null, null, 'videocallcancel', { declineCall: true });
        }
    }
    /**
     * @param {?} users
     * @param {?} conferenceId
     * @return {?}
     */
    onSendCancelNotificationMessage(users, conferenceId) {
        /** @type {?} */
        let others = users.filter((/**
         * @param {?} user
         * @return {?}
         */
        user => user._id !== this.session.userId));
        if (others) {
            others
                .map((/**
             * @param {?} user
             * @return {?}
             */
            user => user._id))
                .forEach((/**
             * @param {?} userId
             * @return {?}
             */
            userId => {
                this.pubnub.sendChatMessage(userId, this.translate.get('VIDEOCALLCANCEL', { user: User.getDisplayName(this.session.user) }), userId, null, null, null, 'videocallcancel', { cancelCall: true });
            }));
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    onReceiveDeclineMessage(data) {
        if (data && data.options && data.sender_id && this.session.user._id) {
            if (data.options.declineCall && data.sender_id !== this.session.user._id) {
                showAlert('', [this.translate.get('OK')], '', this.translate.get('USERDECLINECALL')).then((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => {
                    this.closeVideoModal();
                }));
            }
            else if (data.options.cancelCall) {
                this.dismissVideoToast();
            }
        }
    }
}
VideoCall.decorators = [
    { type: Injectable }
];
/** @nocollapse */
VideoCall.ctorParameters = () => [
    { type: Session },
    { type: Log },
    { type: CoreConfig },
    { type: Pubnub },
    { type: Translate }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SentryErrorHandler {
    /**
     * @param {?} log
     * @param {?} zone
     * @param {?} trackService
     * @param {?} coreConfig
     * @param {?} config
     */
    constructor(log, zone, trackService, coreConfig, config) {
        this.log = log;
        this.zone = zone;
        this.trackService = trackService;
        this.coreConfig = coreConfig;
        this.config = config;
        if (this.isEnabled()) {
            try {
                /** @type {?} */
                let currentEnv = this.config.getCurrentConfig().initialSelection;
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    let options = {
                        dsn: this.coreConfig.getKey('sentryClientKey'),
                        release: this.coreConfig.getAppVersion(),
                        environment: (currentEnv ? currentEnv._id : '') || 'prod'
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
    isEnabled() {
        return this.coreConfig.getMode() === 'prod' && this.coreConfig.getKey('sentryClientKey') && this.coreConfig.getKey('sentryClientKey').length > 0; //
    }
    /**
     * @param {?} err
     * @return {?}
     */
    handleError(err) {
        /** @type {?} */
        let disabled = false;
        SentryErrorHandler.disabledErrorMessages.forEach((/**
         * @param {?} m
         * @return {?}
         */
        m => {
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
    }
    /**
     * @param {?} id
     * @param {?} email
     * @param {?} username
     * @return {?}
     */
    identify(id, email, username) {
        if (this.isEnabled() && id) {
            try {
                this.trackService.getSessionStackSession().then((/**
                 * @param {?} session_id
                 * @return {?}
                 */
                session_id => {
                    configureScope((/**
                     * @param {?} scope
                     * @return {?}
                     */
                    scope => {
                        scope.setUser({ email, username, id });
                        scope.addEventProcessor((/**
                         * @param {?} event
                         * @return {?}
                         */
                        (event) => __awaiter(this, void 0, void 0, function* () {
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
                            return event;
                        })));
                    }));
                }));
            }
            catch (e) { }
        }
    }
}
SentryErrorHandler.disabledErrorMessages = ["Cannot read property 'disconnect' of null", 'PubNub call failed', 'PubNub call failed, check status for details', "InvalidStateError: Failed to execute 'transaction'", 'Loading chunk', "You provided 'undefined' where a stream was expected", "Cannot read property 'value' of undefined", 'Uncaught (in promise): OK', 'Uncaught (in promise): Error: Timeout', 'NS_ERROR_NOT_INITIALIZED', 'Error: No available storage method found'];
SentryErrorHandler.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SentryErrorHandler.ctorParameters = () => [
    { type: Log },
    { type: NgZone },
    { type: Track },
    { type: CoreConfig },
    { type: Config }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataLiveModule {
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    static forRoot(configuredProviders = []) {
        return {
            ngModule: DataLiveModule,
            providers: [...configuredProviders, Channel$1, Intercom$1, Intercom, Messages, Pubnub, SentryErrorHandler, Track, TwilioToken, VideoCall, WebIntercom]
        };
    }
}
DataLiveModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [DataCoreModule],
                exports: [DataCoreModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Channels = class Channels extends Entity {
};
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
let Message = class Message extends Entity {
};
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
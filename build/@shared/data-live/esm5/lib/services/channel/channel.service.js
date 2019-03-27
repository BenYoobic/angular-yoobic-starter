/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Broker, Session, Users } from '@shared/data-core';
import { Channel as ChannelInterface } from '../../interfaces/channel/channel.interface';
import { Pubnub } from '../pubnub/pubnub.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { uniqBy, orderBy } from 'lodash-es';
import { Translate } from '@shared/translate';
export { ChannelInterface };
var Channel = /** @class */ (function () {
    function Channel(broker, pubnub, session, translate) {
        this.broker = broker;
        this.pubnub = pubnub;
        this.session = session;
        this.translate = translate;
    }
    /**
     * @param {?} channels
     * @return {?}
     */
    Channel.prototype.createChannels = /**
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
    Channel.prototype.getChannelsById = /**
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
    Channel.prototype.getChannelById = /**
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
    Channel.prototype.update = 
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
    Channel.prototype.deleteChannel = 
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
    Channel.prototype.updateChannels = /**
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
    Channel.prototype.deleteChannels = 
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
    Channel.prototype.getFilter = 
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
        return tslib_1.__spread(usersRef, [{ field: 'channel', operator: { _id: 'like' }, value: '_' }, { field: 'isSupport', operator: { _id: 'eq' }, value: isSupport === true }]);
    };
    /**
     * @param {?} user
     * @return {?}
     */
    Channel.prototype.getChannelsFilter = /**
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
    Channel.prototype.hydrateOthers = /**
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
    Channel.prototype.getByUsers = 
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
    Channel.prototype.getSupportByUser = 
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
    Channel.prototype.getTransform = /**
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
    Channel.prototype.getTransformChannel = 
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
    Channel.prototype.getTransformChannels = 
    //Remove the current user from the users list and assign the others attribute
    /**
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        return this.getTransform(userId, true);
    };
    Channel.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Channel.ctorParameters = function () { return [
        { type: Broker },
        { type: Pubnub },
        { type: Session },
        { type: Translate }
    ]; };
    return Channel;
}());
export { Channel };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Channel.prototype.broker;
    /**
     * @type {?}
     * @private
     */
    Channel.prototype.pubnub;
    /**
     * @type {?}
     * @private
     */
    Channel.prototype.session;
    /**
     * @type {?}
     * @protected
     */
    Channel.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1saXZlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NoYW5uZWwvY2hhbm5lbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFrQixPQUFPLEVBQVEsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHakYsT0FBTyxFQUFFLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRXpGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsVUFBVSxFQUFZLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0FBRTVCO0lBRUUsaUJBQW9CLE1BQWMsRUFBVSxNQUFjLEVBQVUsT0FBZ0IsRUFBWSxTQUFvQjtRQUFoRyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBWSxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQzs7Ozs7SUFFeEgsZ0NBQWM7Ozs7SUFBZCxVQUFlLFFBQWtCO1FBQWpDLGlCQVVDO1FBVEMsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBVyxVQUFDLFFBQTRCO1lBQzNELEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxTQUFTOzs7O1lB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ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb2tlciwgUmVzcG9uc2VPYmplY3QsIFNlc3Npb24sIFVzZXIsIFVzZXJzIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuaW1wb3J0IHsgQ2hhbm5lbCBhcyBDaGFubmVsSW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jaGFubmVsL2NoYW5uZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7IENoYW5uZWxzIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jaGFubmVscy9jaGFubmVscy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHVibnViIH0gZnJvbSAnLi4vcHVibnViL3B1Ym51Yi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB1bmlxQnksIG9yZGVyQnkgfSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuXG5leHBvcnQgeyBDaGFubmVsSW50ZXJmYWNlIH07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGFubmVsIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBicm9rZXI6IEJyb2tlciwgcHJpdmF0ZSBwdWJudWI6IFB1Ym51YiwgcHJpdmF0ZSBzZXNzaW9uOiBTZXNzaW9uLCBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGUpIHt9XG5cbiAgY3JlYXRlQ2hhbm5lbHMoY2hhbm5lbHM6IENoYW5uZWxzKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPENoYW5uZWxzPigob2JzZXJ2ZXI6IE9ic2VydmVyPENoYW5uZWxzPikgPT4ge1xuICAgICAgdGhpcy5icm9rZXIuc2F2ZSgnY2hhbm5lbHMnLCBjaGFubmVscykuc3Vic2NyaWJlKGMgPT4ge1xuICAgICAgICB0aGlzLmh5ZHJhdGVPdGhlcnMoYywgdHJ1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2hhbm5lbHMoYykuc3Vic2NyaWJlKHJldCA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChjKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2hhbm5lbHNCeUlkKGNoYW5uZWxzSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRBbGwoJ2NoYW5uZWxzJywgbnVsbCwgbnVsbCwgbnVsbCwgW1t7IGZpZWxkOiAnY2hhbm5lbCcsIG9wZXJhdG9yOiB7IF9pZDogJ2VxJyB9LCB2YWx1ZTogY2hhbm5lbHNJZCB9XV0pLnBpcGUoXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuZGF0YSAmJiByZXRWYWwuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IGNoYW5uZWxzID0gcmV0VmFsLmRhdGFbMF07XG4gICAgICAgICAgdGhpcy5oeWRyYXRlT3RoZXJzKGNoYW5uZWxzLCB0cnVlKTtcbiAgICAgICAgICByZXR1cm4gY2hhbm5lbHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRDaGFubmVsQnlJZChjaGFubmVsSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRBbGwoJ2NoYW5uZWwnLCBudWxsLCBudWxsLCBudWxsLCBbW3sgZmllbGQ6ICdjaGFubmVsJywgb3BlcmF0b3I6IHsgX2lkOiAnZXEnIH0sIHZhbHVlOiBjaGFubmVsSWQgfV1dKS5waXBlKFxuICAgICAgbWFwKHJldFZhbCA9PiB7XG4gICAgICAgIGlmIChyZXRWYWwgJiYgcmV0VmFsLmRhdGEgJiYgcmV0VmFsLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxldCBjaGFubmVsID0gcmV0VmFsLmRhdGFbMF07XG4gICAgICAgICAgdGhpcy5oeWRyYXRlT3RoZXJzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICByZXR1cm4gY2hhbm5lbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vdXBkYXRlIHRoZSBjaGFubmVsIGl0c2VsZiB3aGVuIHdlIHB1Ymxpc2ggYSBuZXcgbWVzc2FnZVxuICB1cGRhdGUoY2hhbm5lbDogQ2hhbm5lbEludGVyZmFjZSkge1xuICAgIGNoYW5uZWwgPSBPYmplY3QuYXNzaWduKHt9LCBjaGFubmVsKTtcbiAgICBkZWxldGUgY2hhbm5lbC5vdGhlcnM7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLnNhdmUoJ2NoYW5uZWwnLCBjaGFubmVsKTtcbiAgfVxuXG4gIC8vIGRlbGV0ZSBhIGNoYW5uZWxcbiAgZGVsZXRlQ2hhbm5lbChjaGFubmVsOiBDaGFubmVsSW50ZXJmYWNlKSB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IHB1Ym51Yi5kZWxldGVDaGFubmVsc1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5kZWxldGUoJ2NoYW5uZWwnLCBjaGFubmVsLl9pZCk7XG4gIH1cblxuICB1cGRhdGVDaGFubmVscyhjaGFubmVsOiBDaGFubmVscykge1xuICAgIGNoYW5uZWwgPSBPYmplY3QuYXNzaWduKHt9LCBjaGFubmVsKTtcbiAgICBkZWxldGUgY2hhbm5lbC5vdGhlcnM7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLnNhdmUoJ2NoYW5uZWxzJywgY2hhbm5lbCk7XG4gIH1cblxuICAvLyBkZWxldGUgYSBncm91cCBjaGFubmVsXG4gIGRlbGV0ZUNoYW5uZWxzKGNoYW5uZWxzOiBDaGFubmVscykge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCBwdWJudWIuZGVsZXRlQ2hhbm5lbHNcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZGVsZXRlKCdjaGFubmVscycsIGNoYW5uZWxzLl9pZCk7XG4gIH1cblxuICAvL0dldCB0aGUgY2hhbm5lbCBmaWx0ZXIgZm9yIGEgc3BlY2lmaWMgdXNlclxuICBnZXRGaWx0ZXIodXNlcjE6IFVzZXIsIHVzZXIyPzogVXNlciwgaXNTdXBwb3J0PzogYm9vbGVhbik6IEZpbHRlciB7XG4gICAgbGV0IHVzZXJzUmVmID0gW3sgZmllbGQ6ICd1c2Vyc1JlZicsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IFt7IF9pZDogdXNlcjEuX2lkIH1dIH1dO1xuICAgIGlmICh1c2VyMikge1xuICAgICAgdXNlcnNSZWYucHVzaCh7IGZpZWxkOiAndXNlcnNSZWYnLCBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sIHZhbHVlOiBbeyBfaWQ6IHVzZXIyLl9pZCB9XSB9KTtcbiAgICB9XG4gICAgaWYgKCFpc1N1cHBvcnQpIHtcbiAgICAgIHVzZXJzUmVmLnB1c2goeyBmaWVsZDogJ3VzZXJzUmVmJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogVXNlcnMuYWRtaW5JZHMgfSk7XG4gICAgfVxuICAgIHJldHVybiBbLi4udXNlcnNSZWYsIHsgZmllbGQ6ICdjaGFubmVsJywgb3BlcmF0b3I6IHsgX2lkOiAnbGlrZScgfSwgdmFsdWU6ICdfJyB9LCB7IGZpZWxkOiAnaXNTdXBwb3J0Jywgb3BlcmF0b3I6IHsgX2lkOiAnZXEnIH0sIHZhbHVlOiBpc1N1cHBvcnQgPT09IHRydWUgfV07XG4gIH1cblxuICBnZXRDaGFubmVsc0ZpbHRlcih1c2VyOiBVc2VyKTogRmlsdGVyIHtcbiAgICByZXR1cm4gW3sgZmllbGQ6ICd1c2Vyc1JlZicsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IFt7IF9pZDogdXNlci5faWQgfV0gfV07XG4gIH1cblxuICBoeWRyYXRlT3RoZXJzKGNoYW5uZWw6IENoYW5uZWxJbnRlcmZhY2UgfCBDaGFubmVscywgaXNHcm91cCA9IGZhbHNlKTogQ2hhbm5lbEludGVyZmFjZSB8IENoYW5uZWxzIHtcbiAgICBpZiAoY2hhbm5lbCAmJiBjaGFubmVsLnVzZXJzKSB7XG4gICAgICBjaGFubmVsLm90aGVycyA9IGNoYW5uZWwudXNlcnMuZmlsdGVyKHUgPT4gdS5faWQgIT09IHRoaXMuc2Vzc2lvbi51c2VySWQpO1xuICAgIH1cbiAgICBpZiAoaXNHcm91cCAmJiAoIWNoYW5uZWwuY2hhbm5lbCB8fCAhY2hhbm5lbC5jaGFubmVsLnN0YXJ0c1dpdGgoJ2dyb3VwXycpKSkge1xuICAgICAgY2hhbm5lbC5jaGFubmVsID0gJ2dyb3VwXycgKyBjaGFubmVsLl9pZDtcbiAgICB9XG4gICAgcmV0dXJuIGNoYW5uZWw7XG4gIH1cblxuICAvL3JldHVybiB0aGUgY2hhbm5lbCBiZWV0d2VlbiAyIHVzZXJzXG4gIGdldEJ5VXNlcnModXNlcjE6IFVzZXIsIHVzZXIyPzogVXNlciwgaXNTdXBwb3J0PzogYm9vbGVhbikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxDaGFubmVsSW50ZXJmYWNlPigob2JzZXJ2ZXI6IE9ic2VydmVyPENoYW5uZWxJbnRlcmZhY2U+KSA9PiB7XG4gICAgICB0aGlzLmJyb2tlci5nZXRBbGwoJ2NoYW5uZWwnLCBudWxsLCBudWxsLCBudWxsLCBbdGhpcy5nZXRGaWx0ZXIodXNlcjEsIHVzZXIyLCBpc1N1cHBvcnQpXSkuc3Vic2NyaWJlKHJldFZhbCA9PiB7XG4gICAgICAgIGxldCBjaGFubmVsO1xuICAgICAgICBpZiAocmV0VmFsLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNoYW5uZWwgPSByZXRWYWwuZGF0YVswXTtcbiAgICAgICAgICB0aGlzLmh5ZHJhdGVPdGhlcnMoY2hhbm5lbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChjaGFubmVsKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoYW5uZWwgPSB7XG4gICAgICAgICAgICB1c2Vyc1JlZjogaXNTdXBwb3J0ID8gW3RoaXMucHVibnViLnN1cHBvcnRJZCwgdXNlcjEuX2lkXSA6IFt1c2VyMS5faWQsIHVzZXIyLl9pZF0sXG4gICAgICAgICAgICBjaGFubmVsOiBpc1N1cHBvcnQgPyB0aGlzLnB1Ym51Yi5nZXRTdXBwb3J0Q2hhbm5lbElkKHVzZXIxLl9pZCkgOiB0aGlzLnB1Ym51Yi5nZXRDaGFubmVsSWQodXNlcjEuX2lkLCB1c2VyMi5faWQpLFxuICAgICAgICAgICAgaXNTdXBwb3J0OiBpc1N1cHBvcnQgPT09IHRydWUsXG4gICAgICAgICAgICBpc0Zhdm9yaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIF90ZW5hbnRSZWY6IHVzZXIyID8gdXNlcjIuX3RlbmFudFJlZiA6IHVzZXIxLl90ZW5hbnRSZWYsXG4gICAgICAgICAgICB1c2VyczogaXNTdXBwb3J0XG4gICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6IHRoaXMucHVibnViLnN1cHBvcnRJZCxcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdzbWFydGluQHlvb2JpYy5jb20nLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6ICdTYXJhaCcsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiAnTWFydGluJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiAnaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS93d3cteW9vYmljLWNvbS9pbWFnZS91cGxvYWQvYV9leGlmL3YxNDY2NDIxOTk2L2p2MHZjMHlpendxZWZqMjJpaXJoLnBuZydcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB1c2VyMVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgOiBbdXNlcjEsIHVzZXIyXVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5icm9rZXIuc2V0QWNsKGNoYW5uZWwsIG51bGwsIG51bGwsIG51bGwsIHVzZXIyID8gW3VzZXIxLl9pZCwgdXNlcjIuX2lkXSA6IFt1c2VyMS5faWRdKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSg8YW55PmNoYW5uZWwpLnN1YnNjcmliZShjID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHlkcmF0ZU90aGVycyhjKTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoYyk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vUmV0dXJuIHRoZSBzdXBwb3J0IGNoYW5uZWwgZm9yIGEgc3BlY2lmaWMgdXNlclxuICBnZXRTdXBwb3J0QnlVc2VyKHVzZXI6IFVzZXIpOiBPYnNlcnZhYmxlPENoYW5uZWxJbnRlcmZhY2U+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRCeVVzZXJzKHVzZXIsIG51bGwsIHRydWUpO1xuICB9XG5cbiAgZ2V0VHJhbnNmb3JtKHVzZXJJZDogc3RyaW5nLCBpc0dyb3VwID0gZmFsc2UpIHtcbiAgICByZXR1cm4gKHJlczogUmVzcG9uc2VPYmplY3QpID0+IHtcbiAgICAgIGxldCBjaGFubmVscyA9IFtdO1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0Pigob2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlT2JqZWN0PikgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEubWFwKSB7XG4gICAgICAgICAgaWYgKCFpc0dyb3VwKSB7XG4gICAgICAgICAgICByZXMuZGF0YSA9IHVuaXFCeShyZXMuZGF0YSwgJ2NoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hhbm5lbHMgPSByZXMuZGF0YVxuICAgICAgICAgICAgLm1hcCgoY2hhbm5lbDogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaHlkcmF0ZU90aGVycyhjaGFubmVsLCBpc0dyb3VwKTtcbiAgICAgICAgICAgICAgaWYgKGNoYW5uZWwub3RoZXJzICYmIGNoYW5uZWwub3RoZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgIGNoYW5uZWwuaXNPbmxpbmUgPSB0aGlzLnB1Ym51Yi5pc09ubGluZShjaGFubmVsLm90aGVyc1swXS5faWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhbm5lbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcih4ID0+IHggIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5uZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBjb3VudDogMCwgZGF0YTogW10gfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3JrSm9pbihcbiAgICAgICAgICAgIGNoYW5uZWxzLm1hcCgoY2hhbm5lbDogQ2hhbm5lbEludGVyZmFjZSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdWJudWIuZ2V0SGlzdG9yeShjaGFubmVsLmNoYW5uZWwsIDEpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXRWYWw6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWwubGFzdE1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsLmxhc3RNZXNzYWdlQWx0ZXJuYXRlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5sYXN0TWVzc2FnZURhdGUgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZXMgPSByZXRWYWxbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RNZXNzYWdlID0gbWVzc2FnZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGFubmVsLmRlbGV0ZU1lc3NhZ2VzIHx8IGNoYW5uZWwuZGVsZXRlTWVzc2FnZXMuaW5kZXhPZihsYXN0TWVzc2FnZS5kYXRlX3NlbnQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5sYXN0TWVzc2FnZSA9IGxhc3RNZXNzYWdlLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLmxhc3RNZXNzYWdlRGF0ZSA9IGxhc3RNZXNzYWdlLmRhdGVfc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFubmVsLmxhc3RNZXNzYWdlICYmIGNoYW5uZWwubGFzdE1lc3NhZ2UuaW5kZXhPZignaW9uaWMtY2hhdC1pbWFnZScpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLmxhc3RNZXNzYWdlID0gdGhpcy50cmFuc2xhdGUuZ2V0KCdQSE9UTycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5sYXN0TWVzc2FnZUFsdGVybmF0ZSA9IGxhc3RNZXNzYWdlLnNlbmRlcl9pZCAhPT0gdGhpcy5zZXNzaW9uLnVzZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBjaGFubmVsO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICkuc3Vic2NyaWJlKGMgPT4ge1xuICAgICAgICAgICAgYyA9IG9yZGVyQnkoYywgWydsYXN0TWVzc2FnZURhdGUnXSwgWydkZXNjJ10pO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiByZXMuY291bnQsIGRhdGE6IDxhbnk+YyB9KTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICAvL1JlbW92ZSB0aGUgY3VycmVudCB1c2VyIGZyb20gdGhlIHVzZXJzIGxpc3QgYW5kIGFzc2lnbiB0aGUgb3RoZXJzIGF0dHJpYnV0ZVxuICBnZXRUcmFuc2Zvcm1DaGFubmVsKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VHJhbnNmb3JtKHVzZXJJZCwgZmFsc2UpO1xuICB9XG5cbiAgLy9SZW1vdmUgdGhlIGN1cnJlbnQgdXNlciBmcm9tIHRoZSB1c2VycyBsaXN0IGFuZCBhc3NpZ24gdGhlIG90aGVycyBhdHRyaWJ1dGVcbiAgZ2V0VHJhbnNmb3JtQ2hhbm5lbHModXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUcmFuc2Zvcm0odXNlcklkLCB0cnVlKTtcbiAgfVxufVxuIl19
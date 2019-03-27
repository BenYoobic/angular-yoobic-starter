/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Broker, Session, Users } from '@shared/data-core';
import { Channel as ChannelInterface } from '../../interfaces/channel/channel.interface';
import { Pubnub } from '../pubnub/pubnub.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { uniqBy, orderBy } from 'lodash-es';
import { Translate } from '@shared/translate';
export { ChannelInterface };
export class Channel {
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
Channel.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Channel.ctorParameters = () => [
    { type: Broker },
    { type: Pubnub },
    { type: Session },
    { type: Translate }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1saXZlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NoYW5uZWwvY2hhbm5lbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQWtCLE9BQU8sRUFBUSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUdqRixPQUFPLEVBQUUsT0FBTyxJQUFJLGdCQUFnQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFekYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWxELE9BQU8sRUFBRSxVQUFVLEVBQVksUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUM7QUFHNUIsTUFBTSxPQUFPLE9BQU87Ozs7Ozs7SUFDbEIsWUFBb0IsTUFBYyxFQUFVLE1BQWMsRUFBVSxPQUFnQixFQUFZLFNBQW9CO1FBQWhHLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFZLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFBRyxDQUFDOzs7OztJQUV4SCxjQUFjLENBQUMsUUFBa0I7UUFDL0IsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBVyxDQUFDLFFBQTRCLEVBQUUsRUFBRTtZQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMs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ZCxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLG1CQUFLLENBQUMsRUFBQSxFQUFFLENBQUMsQ0FBQzt3QkFDbEQsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN0QixDQUFDLEVBQUMsQ0FBQztpQkFDSjtZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBR0QsbUJBQW1CLENBQUMsTUFBYztRQUNoQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7OztJQUdELG9CQUFvQixDQUFDLE1BQWM7UUFDakMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7WUFqTkYsVUFBVTs7OztZQWRGLE1BQU07WUFLTixNQUFNO1lBTGtCLE9BQU87WUFVL0IsU0FBUzs7Ozs7OztJQU1KLHlCQUFzQjs7Ozs7SUFBRSx5QkFBc0I7Ozs7O0lBQUUsMEJBQXdCOzs7OztJQUFFLDRCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb2tlciwgUmVzcG9uc2VPYmplY3QsIFNlc3Npb24sIFVzZXIsIFVzZXJzIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuaW1wb3J0IHsgQ2hhbm5lbCBhcyBDaGFubmVsSW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jaGFubmVsL2NoYW5uZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7IENoYW5uZWxzIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jaGFubmVscy9jaGFubmVscy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHVibnViIH0gZnJvbSAnLi4vcHVibnViL3B1Ym51Yi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB1bmlxQnksIG9yZGVyQnkgfSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuXG5leHBvcnQgeyBDaGFubmVsSW50ZXJmYWNlIH07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGFubmVsIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBicm9rZXI6IEJyb2tlciwgcHJpdmF0ZSBwdWJudWI6IFB1Ym51YiwgcHJpdmF0ZSBzZXNzaW9uOiBTZXNzaW9uLCBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGUpIHt9XG5cbiAgY3JlYXRlQ2hhbm5lbHMoY2hhbm5lbHM6IENoYW5uZWxzKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPENoYW5uZWxzPigob2JzZXJ2ZXI6IE9ic2VydmVyPENoYW5uZWxzPikgPT4ge1xuICAgICAgdGhpcy5icm9rZXIuc2F2ZSgnY2hhbm5lbHMnLCBjaGFubmVscykuc3Vic2NyaWJlKGMgPT4ge1xuICAgICAgICB0aGlzLmh5ZHJhdGVPdGhlcnMoYywgdHJ1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2hhbm5lbHMoYykuc3Vic2NyaWJlKHJldCA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChjKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2hhbm5lbHNCeUlkKGNoYW5uZWxzSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRBbGwoJ2NoYW5uZWxzJywgbnVsbCwgbnVsbCwgbnVsbCwgW1t7IGZpZWxkOiAnY2hhbm5lbCcsIG9wZXJhdG9yOiB7IF9pZDogJ2VxJyB9LCB2YWx1ZTogY2hhbm5lbHNJZCB9XV0pLnBpcGUoXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuZGF0YSAmJiByZXRWYWwuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IGNoYW5uZWxzID0gcmV0VmFsLmRhdGFbMF07XG4gICAgICAgICAgdGhpcy5oeWRyYXRlT3RoZXJzKGNoYW5uZWxzLCB0cnVlKTtcbiAgICAgICAgICByZXR1cm4gY2hhbm5lbHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRDaGFubmVsQnlJZChjaGFubmVsSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRBbGwoJ2NoYW5uZWwnLCBudWxsLCBudWxsLCBudWxsLCBbW3sgZmllbGQ6ICdjaGFubmVsJywgb3BlcmF0b3I6IHsgX2lkOiAnZXEnIH0sIHZhbHVlOiBjaGFubmVsSWQgfV1dKS5waXBlKFxuICAgICAgbWFwKHJldFZhbCA9PiB7XG4gICAgICAgIGlmIChyZXRWYWwgJiYgcmV0VmFsLmRhdGEgJiYgcmV0VmFsLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxldCBjaGFubmVsID0gcmV0VmFsLmRhdGFbMF07XG4gICAgICAgICAgdGhpcy5oeWRyYXRlT3RoZXJzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICByZXR1cm4gY2hhbm5lbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vdXBkYXRlIHRoZSBjaGFubmVsIGl0c2VsZiB3aGVuIHdlIHB1Ymxpc2ggYSBuZXcgbWVzc2FnZVxuICB1cGRhdGUoY2hhbm5lbDogQ2hhbm5lbEludGVyZmFjZSkge1xuICAgIGNoYW5uZWwgPSBPYmplY3QuYXNzaWduKHt9LCBjaGFubmVsKTtcbiAgICBkZWxldGUgY2hhbm5lbC5vdGhlcnM7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLnNhdmUoJ2NoYW5uZWwnLCBjaGFubmVsKTtcbiAgfVxuXG4gIC8vIGRlbGV0ZSBhIGNoYW5uZWxcbiAgZGVsZXRlQ2hhbm5lbChjaGFubmVsOiBDaGFubmVsSW50ZXJmYWNlKSB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IHB1Ym51Yi5kZWxldGVDaGFubmVsc1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5kZWxldGUoJ2NoYW5uZWwnLCBjaGFubmVsLl9pZCk7XG4gIH1cblxuICB1cGRhdGVDaGFubmVscyhjaGFubmVsOiBDaGFubmVscykge1xuICAgIGNoYW5uZWwgPSBPYmplY3QuYXNzaWduKHt9LCBjaGFubmVsKTtcbiAgICBkZWxldGUgY2hhbm5lbC5vdGhlcnM7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLnNhdmUoJ2NoYW5uZWxzJywgY2hhbm5lbCk7XG4gIH1cblxuICAvLyBkZWxldGUgYSBncm91cCBjaGFubmVsXG4gIGRlbGV0ZUNoYW5uZWxzKGNoYW5uZWxzOiBDaGFubmVscykge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCBwdWJudWIuZGVsZXRlQ2hhbm5lbHNcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZGVsZXRlKCdjaGFubmVscycsIGNoYW5uZWxzLl9pZCk7XG4gIH1cblxuICAvL0dldCB0aGUgY2hhbm5lbCBmaWx0ZXIgZm9yIGEgc3BlY2lmaWMgdXNlclxuICBnZXRGaWx0ZXIodXNlcjE6IFVzZXIsIHVzZXIyPzogVXNlciwgaXNTdXBwb3J0PzogYm9vbGVhbik6IEZpbHRlciB7XG4gICAgbGV0IHVzZXJzUmVmID0gW3sgZmllbGQ6ICd1c2Vyc1JlZicsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IFt7IF9pZDogdXNlcjEuX2lkIH1dIH1dO1xuICAgIGlmICh1c2VyMikge1xuICAgICAgdXNlcnNSZWYucHVzaCh7IGZpZWxkOiAndXNlcnNSZWYnLCBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sIHZhbHVlOiBbeyBfaWQ6IHVzZXIyLl9pZCB9XSB9KTtcbiAgICB9XG4gICAgaWYgKCFpc1N1cHBvcnQpIHtcbiAgICAgIHVzZXJzUmVmLnB1c2goeyBmaWVsZDogJ3VzZXJzUmVmJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogVXNlcnMuYWRtaW5JZHMgfSk7XG4gICAgfVxuICAgIHJldHVybiBbLi4udXNlcnNSZWYsIHsgZmllbGQ6ICdjaGFubmVsJywgb3BlcmF0b3I6IHsgX2lkOiAnbGlrZScgfSwgdmFsdWU6ICdfJyB9LCB7IGZpZWxkOiAnaXNTdXBwb3J0Jywgb3BlcmF0b3I6IHsgX2lkOiAnZXEnIH0sIHZhbHVlOiBpc1N1cHBvcnQgPT09IHRydWUgfV07XG4gIH1cblxuICBnZXRDaGFubmVsc0ZpbHRlcih1c2VyOiBVc2VyKTogRmlsdGVyIHtcbiAgICByZXR1cm4gW3sgZmllbGQ6ICd1c2Vyc1JlZicsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IFt7IF9pZDogdXNlci5faWQgfV0gfV07XG4gIH1cblxuICBoeWRyYXRlT3RoZXJzKGNoYW5uZWw6IENoYW5uZWxJbnRlcmZhY2UgfCBDaGFubmVscywgaXNHcm91cCA9IGZhbHNlKTogQ2hhbm5lbEludGVyZmFjZSB8IENoYW5uZWxzIHtcbiAgICBpZiAoY2hhbm5lbCAmJiBjaGFubmVsLnVzZXJzKSB7XG4gICAgICBjaGFubmVsLm90aGVycyA9IGNoYW5uZWwudXNlcnMuZmlsdGVyKHUgPT4gdS5faWQgIT09IHRoaXMuc2Vzc2lvbi51c2VySWQpO1xuICAgIH1cbiAgICBpZiAoaXNHcm91cCAmJiAoIWNoYW5uZWwuY2hhbm5lbCB8fCAhY2hhbm5lbC5jaGFubmVsLnN0YXJ0c1dpdGgoJ2dyb3VwXycpKSkge1xuICAgICAgY2hhbm5lbC5jaGFubmVsID0gJ2dyb3VwXycgKyBjaGFubmVsLl9pZDtcbiAgICB9XG4gICAgcmV0dXJuIGNoYW5uZWw7XG4gIH1cblxuICAvL3JldHVybiB0aGUgY2hhbm5lbCBiZWV0d2VlbiAyIHVzZXJzXG4gIGdldEJ5VXNlcnModXNlcjE6IFVzZXIsIHVzZXIyPzogVXNlciwgaXNTdXBwb3J0PzogYm9vbGVhbikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxDaGFubmVsSW50ZXJmYWNlPigob2JzZXJ2ZXI6IE9ic2VydmVyPENoYW5uZWxJbnRlcmZhY2U+KSA9PiB7XG4gICAgICB0aGlzLmJyb2tlci5nZXRBbGwoJ2NoYW5uZWwnLCBudWxsLCBudWxsLCBudWxsLCBbdGhpcy5nZXRGaWx0ZXIodXNlcjEsIHVzZXIyLCBpc1N1cHBvcnQpXSkuc3Vic2NyaWJlKHJldFZhbCA9PiB7XG4gICAgICAgIGxldCBjaGFubmVsO1xuICAgICAgICBpZiAocmV0VmFsLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNoYW5uZWwgPSByZXRWYWwuZGF0YVswXTtcbiAgICAgICAgICB0aGlzLmh5ZHJhdGVPdGhlcnMoY2hhbm5lbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChjaGFubmVsKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoYW5uZWwgPSB7XG4gICAgICAgICAgICB1c2Vyc1JlZjogaXNTdXBwb3J0ID8gW3RoaXMucHVibnViLnN1cHBvcnRJZCwgdXNlcjEuX2lkXSA6IFt1c2VyMS5faWQsIHVzZXIyLl9pZF0sXG4gICAgICAgICAgICBjaGFubmVsOiBpc1N1cHBvcnQgPyB0aGlzLnB1Ym51Yi5nZXRTdXBwb3J0Q2hhbm5lbElkKHVzZXIxLl9pZCkgOiB0aGlzLnB1Ym51Yi5nZXRDaGFubmVsSWQodXNlcjEuX2lkLCB1c2VyMi5faWQpLFxuICAgICAgICAgICAgaXNTdXBwb3J0OiBpc1N1cHBvcnQgPT09IHRydWUsXG4gICAgICAgICAgICBpc0Zhdm9yaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIF90ZW5hbnRSZWY6IHVzZXIyID8gdXNlcjIuX3RlbmFudFJlZiA6IHVzZXIxLl90ZW5hbnRSZWYsXG4gICAgICAgICAgICB1c2VyczogaXNTdXBwb3J0XG4gICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6IHRoaXMucHVibnViLnN1cHBvcnRJZCxcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdzbWFydGluQHlvb2JpYy5jb20nLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6ICdTYXJhaCcsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiAnTWFydGluJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiAnaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS93d3cteW9vYmljLWNvbS9pbWFnZS91cGxvYWQvYV9leGlmL3YxNDY2NDIxOTk2L2p2MHZjMHlpendxZWZqMjJpaXJoLnBuZydcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB1c2VyMVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgOiBbdXNlcjEsIHVzZXIyXVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5icm9rZXIuc2V0QWNsKGNoYW5uZWwsIG51bGwsIG51bGwsIG51bGwsIHVzZXIyID8gW3VzZXIxLl9pZCwgdXNlcjIuX2lkXSA6IFt1c2VyMS5faWRdKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSg8YW55PmNoYW5uZWwpLnN1YnNjcmliZShjID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHlkcmF0ZU90aGVycyhjKTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoYyk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vUmV0dXJuIHRoZSBzdXBwb3J0IGNoYW5uZWwgZm9yIGEgc3BlY2lmaWMgdXNlclxuICBnZXRTdXBwb3J0QnlVc2VyKHVzZXI6IFVzZXIpOiBPYnNlcnZhYmxlPENoYW5uZWxJbnRlcmZhY2U+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRCeVVzZXJzKHVzZXIsIG51bGwsIHRydWUpO1xuICB9XG5cbiAgZ2V0VHJhbnNmb3JtKHVzZXJJZDogc3RyaW5nLCBpc0dyb3VwID0gZmFsc2UpIHtcbiAgICByZXR1cm4gKHJlczogUmVzcG9uc2VPYmplY3QpID0+IHtcbiAgICAgIGxldCBjaGFubmVscyA9IFtdO1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0Pigob2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlT2JqZWN0PikgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEubWFwKSB7XG4gICAgICAgICAgaWYgKCFpc0dyb3VwKSB7XG4gICAgICAgICAgICByZXMuZGF0YSA9IHVuaXFCeShyZXMuZGF0YSwgJ2NoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hhbm5lbHMgPSByZXMuZGF0YVxuICAgICAgICAgICAgLm1hcCgoY2hhbm5lbDogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaHlkcmF0ZU90aGVycyhjaGFubmVsLCBpc0dyb3VwKTtcbiAgICAgICAgICAgICAgaWYgKGNoYW5uZWwub3RoZXJzICYmIGNoYW5uZWwub3RoZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgIGNoYW5uZWwuaXNPbmxpbmUgPSB0aGlzLnB1Ym51Yi5pc09ubGluZShjaGFubmVsLm90aGVyc1swXS5faWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhbm5lbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcih4ID0+IHggIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5uZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBjb3VudDogMCwgZGF0YTogW10gfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3JrSm9pbihcbiAgICAgICAgICAgIGNoYW5uZWxzLm1hcCgoY2hhbm5lbDogQ2hhbm5lbEludGVyZmFjZSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdWJudWIuZ2V0SGlzdG9yeShjaGFubmVsLmNoYW5uZWwsIDEpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXRWYWw6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWwubGFzdE1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsLmxhc3RNZXNzYWdlQWx0ZXJuYXRlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5sYXN0TWVzc2FnZURhdGUgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZXMgPSByZXRWYWxbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RNZXNzYWdlID0gbWVzc2FnZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGFubmVsLmRlbGV0ZU1lc3NhZ2VzIHx8IGNoYW5uZWwuZGVsZXRlTWVzc2FnZXMuaW5kZXhPZihsYXN0TWVzc2FnZS5kYXRlX3NlbnQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5sYXN0TWVzc2FnZSA9IGxhc3RNZXNzYWdlLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLmxhc3RNZXNzYWdlRGF0ZSA9IGxhc3RNZXNzYWdlLmRhdGVfc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFubmVsLmxhc3RNZXNzYWdlICYmIGNoYW5uZWwubGFzdE1lc3NhZ2UuaW5kZXhPZignaW9uaWMtY2hhdC1pbWFnZScpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLmxhc3RNZXNzYWdlID0gdGhpcy50cmFuc2xhdGUuZ2V0KCdQSE9UTycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5sYXN0TWVzc2FnZUFsdGVybmF0ZSA9IGxhc3RNZXNzYWdlLnNlbmRlcl9pZCAhPT0gdGhpcy5zZXNzaW9uLnVzZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBjaGFubmVsO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICkuc3Vic2NyaWJlKGMgPT4ge1xuICAgICAgICAgICAgYyA9IG9yZGVyQnkoYywgWydsYXN0TWVzc2FnZURhdGUnXSwgWydkZXNjJ10pO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiByZXMuY291bnQsIGRhdGE6IDxhbnk+YyB9KTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICAvL1JlbW92ZSB0aGUgY3VycmVudCB1c2VyIGZyb20gdGhlIHVzZXJzIGxpc3QgYW5kIGFzc2lnbiB0aGUgb3RoZXJzIGF0dHJpYnV0ZVxuICBnZXRUcmFuc2Zvcm1DaGFubmVsKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VHJhbnNmb3JtKHVzZXJJZCwgZmFsc2UpO1xuICB9XG5cbiAgLy9SZW1vdmUgdGhlIGN1cnJlbnQgdXNlciBmcm9tIHRoZSB1c2VycyBsaXN0IGFuZCBhc3NpZ24gdGhlIG90aGVycyBhdHRyaWJ1dGVcbiAgZ2V0VHJhbnNmb3JtQ2hhbm5lbHModXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUcmFuc2Zvcm0odXNlcklkLCB0cnVlKTtcbiAgfVxufVxuIl19
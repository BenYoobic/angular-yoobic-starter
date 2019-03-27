/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Session, User } from '@shared/data-core';
import { Log, CoreConfig } from '@shared/common';
import { showAlert, closeModal } from '@shared/stencil';
import { Translate } from '@shared/translate';
import VoxeetSdk from '@voxeet/voxeet-web-sdk';
import { Pubnub } from '../pubnub/pubnub.service';
import { isFunction } from 'lodash-es';
export class VideoCall {
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
if (false) {
    /**
     * @type {?}
     * @protected
     */
    VideoCall.prototype.isInit;
    /**
     * @type {?}
     * @private
     */
    VideoCall.prototype.voxeet;
    /**
     * @type {?}
     * @private
     */
    VideoCall.prototype.voxeetUserId;
    /**
     * @type {?}
     * @private
     */
    VideoCall.prototype.userInfo;
    /**
     * @type {?}
     * @private
     */
    VideoCall.prototype.videoModal;
    /**
     * @type {?}
     * @private
     */
    VideoCall.prototype.videoToast;
    /**
     * @type {?}
     * @private
     */
    VideoCall.prototype.constraints;
    /**
     * @type {?}
     * @protected
     */
    VideoCall.prototype.session;
    /**
     * @type {?}
     * @protected
     */
    VideoCall.prototype.log;
    /**
     * @type {?}
     * @protected
     */
    VideoCall.prototype.coreConfig;
    /**
     * @type {?}
     * @protected
     */
    VideoCall.prototype.pubnub;
    /**
     * @type {?}
     * @protected
     */
    VideoCall.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tY2FsbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1saXZlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3ZpZGVvLWNhbGwvdmlkZW8tY2FsbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUd2QyxNQUFNLE9BQU8sU0FBUzs7Ozs7Ozs7SUFjcEIsWUFBc0IsT0FBZ0IsRUFBWSxHQUFRLEVBQVksVUFBc0IsRUFBWSxNQUFjLEVBQVksU0FBb0I7UUFBaEksWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFZLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBWSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFQOUksZ0JBQVcsR0FBRztZQUNwQixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUN0QixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2FBQ3hCO1NBQ0YsQ0FBQztJQUN1SixDQUFDOzs7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QUFDLENBQUMsSUFBSTs7OztnQkFBQyxHQUFHLENBQUMsRUFBRTtvQkFDOUYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN6QixDQUFDLEVBQUMsQ0FBQzthQUNKO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFCO1NBQ0Y7SUFDSCxDQUFDOzs7WUF2ZUYsVUFBVTs7OztZQVZGLE9BQU87WUFDUCxHQUFHO1lBQUUsVUFBVTtZQU1mLE1BQU07WUFITixTQUFTOzs7Ozs7O0lBUWhCLDJCQUEwQjs7Ozs7SUFDMUIsMkJBQTBCOzs7OztJQUMxQixpQ0FBNkI7Ozs7O0lBQzdCLDZCQUFzQjs7Ozs7SUFDdEIsK0JBQTJDOzs7OztJQUMzQywrQkFBd0M7Ozs7O0lBQ3hDLGdDQU1FOzs7OztJQUNVLDRCQUEwQjs7Ozs7SUFBRSx3QkFBa0I7Ozs7O0lBQUUsK0JBQWdDOzs7OztJQUFFLDJCQUF3Qjs7Ozs7SUFBRSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZXNzaW9uLCBVc2VyIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgTG9nLCBDb3JlQ29uZmlnIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgc2hvd0FsZXJ0LCBjbG9zZU1vZGFsIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IFZ4dENvbmZlcmVuY2VDb25maWcsIFdlYlJUQ0NvbnN0cmFpbnRzLCBTY3JlZW5TaGFyZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3ZveGVldC92b3hlZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcblxuaW1wb3J0IFZveGVldFNkayBmcm9tICdAdm94ZWV0L3ZveGVldC13ZWItc2RrJztcbmltcG9ydCB7IFB1Ym51YiB9IGZyb20gJy4uL3B1Ym51Yi9wdWJudWIuc2VydmljZSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZpZGVvQ2FsbCB7XG4gIHByb3RlY3RlZCBpc0luaXQ6IGJvb2xlYW47XG4gIHByaXZhdGUgdm94ZWV0OiBWb3hlZXRTZGs7XG4gIHByaXZhdGUgdm94ZWV0VXNlcklkOiBzdHJpbmc7XG4gIHByaXZhdGUgdXNlckluZm86IGFueTtcbiAgcHJpdmF0ZSB2aWRlb01vZGFsOiBIVE1MWW9vSW9uTW9kYWxFbGVtZW50O1xuICBwcml2YXRlIHZpZGVvVG9hc3Q6IEhUTUxZb29Ub2FzdEVsZW1lbnQ7XG4gIHByaXZhdGUgY29uc3RyYWludHMgPSB7XG4gICAgYXVkaW86IHRydWUsXG4gICAgdmlkZW86IHtcbiAgICAgIHdpZHRoOiB7IGlkZWFsOiA0MDk2IH0sXG4gICAgICBoZWlnaHQ6IHsgaWRlYWw6IDIxNjAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNlc3Npb246IFNlc3Npb24sIHByb3RlY3RlZCBsb2c6IExvZywgcHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByb3RlY3RlZCBwdWJudWI6IFB1Ym51YiwgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlKSB7fVxuXG4gIHVzZUNvcmRvdmEoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSAmJiB3aW5kb3dbJ1ZveGVldCddO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICB0aGlzLmlzSW5pdCA9IHRydWU7XG4gICAgICB0aGlzLm9uSW5pdFVzZXJJbmZvKCk7XG4gICAgICBpZiAodGhpcy51c2VDb3Jkb3ZhKCkgJiYgd2luZG93WydWb3hlZXQnXSkge1xuICAgICAgICB0aGlzLm9uSW5pdENvcmRvdmEoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Jbml0V2ViKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIG9uSW5pdFVzZXJJbmZvKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlc3Npb24gJiYgdGhpcy5zZXNzaW9uLnVzZXIpIHtcbiAgICAgIHRoaXMudXNlckluZm8gPSB0aGlzLmNvbnZlcnRVc2VySW5mbyh0aGlzLnNlc3Npb24udXNlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXNlckluZm8gPSB0aGlzLmNvbnZlcnRVc2VySW5mbygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRVc2VySW5mbyhcbiAgICB1c2VyPzogVXNlclxuICApOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGV4dGVybmFsSWQ6IHN0cmluZztcbiAgICBhdmF0YXJVcmw6IHN0cmluZztcbiAgfSB7XG4gICAgbGV0IHVzZXJJZCA9ICcnO1xuICAgIGxldCB1c2VyTmFtZSA9ICcnO1xuICAgIGxldCBpbWFnZURhdGEgPSAnJztcbiAgICBpZiAodXNlcikge1xuICAgICAgaWYgKHVzZXIuX2lkKSB7XG4gICAgICAgIHVzZXJJZCA9IHVzZXIuX2lkO1xuICAgICAgfVxuICAgICAgaWYgKFVzZXIuZ2V0RGlzcGxheU5hbWUodXNlcikpIHtcbiAgICAgICAgdXNlck5hbWUgPSBVc2VyLmdldERpc3BsYXlOYW1lKHVzZXIpO1xuICAgICAgfVxuICAgICAgaWYgKHVzZXIuaW1hZ2VEYXRhKSB7XG4gICAgICAgIGltYWdlRGF0YSA9IHVzZXIuaW1hZ2VEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdXNlck5hbWUsXG4gICAgICBleHRlcm5hbElkOiB1c2VySWQsXG4gICAgICBhdmF0YXJVcmw6IGltYWdlRGF0YVxuICAgIH07XG4gIH1cblxuICBvbkluaXRDb3Jkb3ZhKCk6IHZvaWQge1xuICAgIHRoaXMudm94ZWV0ID0gd2luZG93WydWb3hlZXQnXTtcbiAgICBpZiAodGhpcy52b3hlZXQpIHtcbiAgICAgIHRoaXMudm94ZWV0XG4gICAgICAgIC5pbml0aWFsaXplKHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ3ZveGVldEtleScpLCB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCd2b3hlZXRTZWNyZXQnKSlcbiAgICAgICAgLnRoZW4obXlVc2VySWQgPT4ge1xuICAgICAgICAgIHRoaXMudm94ZWV0VXNlcklkID0gbXlVc2VySWQ7XG4gICAgICAgICAgdGhpcy5sb2cubG9nKCd2b3hlZXQgaXMgaW5pdCBmb3IgY29yZG92YTonLCB0aGlzLnZveGVldFVzZXJJZCk7XG4gICAgICAgICAgdGhpcy52b3hlZXQuYXBwZWFyTWF4aW1pemVkKHRydWUpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cubG9nKCdhcHBlYXJNYXhpbWl6ZWQnKTtcbiAgICAgICAgICB0aGlzLnZveGVldC5kZWZhdWx0QnVpbHRJblNwZWFrZXIodHJ1ZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZy5sb2coJ2RlZmF1bHRCdWlsdEluU3BlYWtlcicpO1xuICAgICAgICAgIHRoaXMudm94ZWV0LmRlZmF1bHRWaWRlbyh0cnVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmxvZygnZGVmYXVsdFZpZGVvJyk7XG4gICAgICAgICAgdGhpcy52b3hlZXQuY29ubmVjdCh0aGlzLmdldFVzZXJJbmZvKCkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cubG9nKCd2b3hlZXQgY29ubmVjdGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5pdFdlYigpOiB2b2lkIHtcbiAgICB0aGlzLnZveGVldCA9IG5ldyBWb3hlZXRTZGsoKTtcbiAgICBpZiAodGhpcy52b3hlZXQpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldFxuICAgICAgICAuaW5pdGlhbGl6ZSh0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCd2b3hlZXRLZXknKSwgdGhpcy5jb3JlQ29uZmlnLmdldEtleSgndm94ZWV0U2VjcmV0JyksIHRoaXMuZ2V0VXNlckluZm8oKSlcbiAgICAgICAgLnRoZW4obXlVc2VySWQgPT4ge1xuICAgICAgICAgIHRoaXMudm94ZWV0VXNlcklkID0gbXlVc2VySWQ7XG4gICAgICAgICAgdGhpcy5sb2cubG9nKCd2b3hlZXQgaXMgaW5pdCBmb3Igd2ViOicsIHRoaXMudm94ZWV0VXNlcklkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmxvZy5lcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldFVzZXJJbmZvKCk6IGFueSB7XG4gICAgaWYgKHRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gbmV3IHdpbmRvd1snVXNlckluZm8nXSh0aGlzLnVzZXJJbmZvLmV4dGVybmFsSWQsIHRoaXMudXNlckluZm8ubmFtZSwgdGhpcy51c2VySW5mby5hdmF0YXJVcmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy51c2VySW5mbztcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDb25mZXJlbmNlKGFsaWFzOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5jcmVhdGUoeyBjb25mZXJlbmNlQWxpYXM6IGFsaWFzLCBwYXJhbXM6IHsgdmlkZW9Db2RlYzogJ0gyNjQnIH0gfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5jcmVhdGVDb25mZXJlbmNlKHsgYWxpYXMgfSk7XG4gICAgfVxuICB9XG5cbiAgam9pbkNvbmZlcmVuY2UoY29uZjogYW55LCBvcHRpb25zPzogVnh0Q29uZmVyZW5jZUNvbmZpZykge1xuICAgIGlmICh0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LmpvaW4oY29uZi5jb25mZXJlbmNlSWQgPyBjb25mLmNvbmZlcmVuY2VJZCA6IGNvbmYpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQuam9pbkNvbmZlcmVuY2UoXG4gICAgICAgIGNvbmYuY29uZmVyZW5jZUlkID8gY29uZi5jb25mZXJlbmNlSWQgOiBjb25mLFxuICAgICAgICBvcHRpb25zIHx8IHtcbiAgICAgICAgICBjb25zdHJhaW50czogeyB2aWRlbzogdHJ1ZSwgYXVkaW86IHRydWUgfSxcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBuYW1lOiBVc2VyLmdldERpc3BsYXlOYW1lKHRoaXMuc2Vzc2lvbi51c2VyKSxcbiAgICAgICAgICAgIGV4dGVybmFsSWQ6IHRoaXMuc2Vzc2lvbi51c2VySWQsXG4gICAgICAgICAgICBhdmF0YXJVcmw6IHRoaXMuc2Vzc2lvbi51c2VyLmltYWdlRGF0YVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYXVkaW8zRDogdHJ1ZSxcbiAgICAgICAgICBjb25mZXJlbmNlOiB7IHBhcmFtczogeyB2aWRlb0NvZGVjOiAnSDI2NCcsIGxpdmVSZWNvcmRpbmc6IHRydWUgfSB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgaGFzV2ViQ2FtKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcikge1xuICAgICAgbGV0IG1lZGlhRGV2aWNlcyA9IHdpbmRvdy5uYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGFzIGFueTtcbiAgICAgIG1lZGlhRGV2aWNlcy5nZXRNZWRpYSA9IG1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgfHwgbWVkaWFEZXZpY2VzLndlYmtpdEdldFVzZXJNZWRpYSB8fCBtZWRpYURldmljZXMubW96R2V0VXNlck1lZGlhIHx8IG1lZGlhRGV2aWNlcy5tc0dldFVzZXJNZWRpYTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG1lZGlhRGV2aWNlcy5nZXRNZWRpYSh7IHZpZGVvOiB0cnVlIH0pLnRoZW4oXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICgpID0+IHJlc29sdmUoZmFsc2UpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgaGFzTWljcm9waG9uZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIGxldCBtZWRpYURldmljZXMgPSB3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBhcyBhbnk7XG4gICAgICBtZWRpYURldmljZXMuZ2V0TWVkaWEgPSBtZWRpYURldmljZXMuZ2V0VXNlck1lZGlhIHx8IG1lZGlhRGV2aWNlcy53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbWVkaWFEZXZpY2VzLm1vekdldFVzZXJNZWRpYSB8fCBtZWRpYURldmljZXMubXNHZXRVc2VyTWVkaWE7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBtZWRpYURldmljZXMuZ2V0TWVkaWEoeyBhdWRpbzogdHJ1ZSB9KS50aGVuKFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiByZXNvbHZlKGZhbHNlKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldENvbnN0cmFpbnQoKTogeyB2aWRlbzogYW55OyBhdWRpbzogYW55IH0ge1xuICAgIGxldCBjb25zdHJhaW50czogYW55ID0gdGhpcy5jb25zdHJhaW50cztcbiAgICBsZXQgY2FtUHJvbWlzZSA9IHRoaXMuaGFzV2ViQ2FtKCk7XG4gICAgbGV0IG1pY1Byb21pc2UgPSB0aGlzLmhhc01pY3JvcGhvbmUoKTtcbiAgICBjYW1Qcm9taXNlLnRoZW4oaGFzQ2FtID0+IHtcbiAgICAgIGlmICghaGFzQ2FtKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbWljUHJvbWlzZS50aGVuKGhhc01pYyA9PiB7XG4gICAgICBpZiAoIWhhc01pYykge1xuICAgICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb25zdHJhaW50cztcbiAgfVxuXG4gIGludml0ZVBhcnRpY2lwYW50cyhjb25mZXJlbmNlSWQ6IHN0cmluZywgZXh0ZXJuYWxJZHM6IEFycmF5PFVzZXI+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQuaW52aXRlKFxuICAgICAgICBjb25mZXJlbmNlSWQsXG4gICAgICAgIGV4dGVybmFsSWRzLm1hcCh1c2VyID0+IHtcbiAgICAgICAgICBsZXQgdXNlckluZm8gPSB0aGlzLmNvbnZlcnRVc2VySW5mbyh1c2VyKTtcbiAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvd1snVXNlckluZm8nXSh1c2VySW5mby5leHRlcm5hbElkLCB1c2VySW5mby5uYW1lLCB1c2VySW5mby5hdmF0YXJVcmwpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0Lmludml0ZShjb25mZXJlbmNlSWQsIGV4dGVybmFsSWRzLm1hcCh1c2VyID0+IHVzZXIuX2lkKSk7XG4gICAgfVxuICB9XG5cbiAgbGVhdmVDb25mZXJlbmNlKGxlYXZlUm9vbTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZiAodGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5sZWF2ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQubGVhdmVDb25mZXJlbmNlKGxlYXZlUm9vbSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pIHtcbiAgICBpZiAoIXRoaXMudXNlQ29yZG92YSgpICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgIHRoaXMudm94ZWV0Lm9uKGV2ZW50LCBoYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVMaXN0ZW5lcihldmVudDogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbikge1xuICAgIGlmICghdGhpcy51c2VDb3Jkb3ZhKCkgJiYgZXZlbnQgJiYgaGFuZGxlcikge1xuICAgICAgdGhpcy52b3hlZXQucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUFsbExpc3RlbmVycygpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLnZveGVldCAmJiB0aGlzLnZveGVldC5yZW1vdmVBbGxMaXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgZ2V0VXNlcklkKCkge1xuICAgIHJldHVybiB0aGlzLnZveGVldFVzZXJJZDtcbiAgfVxuXG4gIHN0YXJ0VmlkZW8odXNlcklkPzogc3RyaW5nLCBjb25zdHJhaW50cz86IFdlYlJUQ0NvbnN0cmFpbnRzKSB7XG4gICAgaWYgKCF0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LnN0YXJ0VmlkZW9Gb3JVc2VyKHVzZXJJZCB8fCB0aGlzLmdldFVzZXJJZCgpLCBjb25zdHJhaW50cyB8fCB0aGlzLmNvbnN0cmFpbnRzKTtcbiAgICB9XG4gIH1cblxuICBzdG9wVmlkZW8odXNlcklkPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LnN0b3BWaWRlb0ZvclVzZXIodXNlcklkIHx8IHRoaXMuZ2V0VXNlcklkKCkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0QXVkaW8odXNlcklkPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LnN0YXJ0QXVkaW9Gb3JVc2VyKHVzZXJJZCB8fCB0aGlzLmdldFVzZXJJZCgpKTtcbiAgICB9XG4gIH1cblxuICBzdG9wQXVkaW8odXNlcklkPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LnN0b3BBdWRpb0ZvclVzZXIodXNlcklkIHx8IHRoaXMuZ2V0VXNlcklkKCkpO1xuICAgIH1cbiAgfVxuXG4gIG11dGVVc2VyKGlzTXV0ZWQ6IGJvb2xlYW4sIHVzZXJJZD86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghdGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5tdXRlVXNlcih1c2VySWQgfHwgdGhpcy5nZXRVc2VySWQoKSwgaXNNdXRlZCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlTXV0ZSh1c2VySWQ/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQudG9nZ2xlTXV0ZSh1c2VySWQgfHwgdGhpcy5nZXRVc2VySWQoKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlclBvc2l0aW9uKHVzZXJJZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIGlmICghdGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5zZXRVc2VyUG9zaXRpb24odXNlcklkLCB4LCB5KTtcbiAgICB9XG4gIH1cblxuICBnZXRDdXJyZW50U2Vzc2lvbigpIHtcbiAgICBpZiAoIXRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldDtcbiAgICB9XG4gIH1cblxuICBnZXRFbnVtZXJhdGVBdWRpb0RldmljZXMob3B0aW9uPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoIXRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQuZW51bWVyYXRlQXVkaW9EZXZpY2VzKG9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RW51bWVyYXRlVmlkZW9EZXZpY2VzKCk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKCF0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LmVudW1lcmF0ZVZpZGVvRGV2aWNlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEF1ZGlvSW5wdXQoZGV2aWNlSWQ6IHN0cmluZywgY29uc3RyYWludHM/OiB7fSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMudm94ZWV0LnNlbGVjdEF1ZGlvSW5wdXQoZGV2aWNlSWQsIGNvbnN0cmFpbnRzKTtcbiAgfVxuXG4gIHNlbGVjdEF1ZGlvT3V0cHV0KGRldmljZUlkOiBzdHJpbmcsIGNvbnN0cmFpbnRzPzoge30pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnZveGVldC5zZWxlY3RBdWRpb091dHB1dChkZXZpY2VJZCwgY29uc3RyYWludHMpO1xuICB9XG5cbiAgc2VsZWN0VmlkZW9JbnB1dChkZXZpY2VJZDogc3RyaW5nLCBjb25zdHJhaW50cz86IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXQuc2VsZWN0VmlkZW9JbnB1dChkZXZpY2VJZCwgY29uc3RyYWludHMpO1xuICB9XG5cbiAgc3RhcnRWaWRlb0ZvclVzZXIodXNlcklkOiBzdHJpbmcsIGNvbnN0cmFpbnRzPzoge30pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnZveGVldC5zdGFydFZpZGVvRm9yVXNlcih1c2VySWQsIGNvbnN0cmFpbnRzKTtcbiAgfVxuXG4gIHN0b3BWaWRlb0ZvclVzZXIodXNlcklkOiBzdHJpbmcsIGNvbnN0cmFpbnRzPzoge30pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnZveGVldC5zdG9wVmlkZW9Gb3JVc2VyKHVzZXJJZCwgY29uc3RyYWludHMpO1xuICB9XG5cbiAgc3RhcnRBdWRpb0ZvclVzZXIodXNlcklkOiBzdHJpbmcsIGNvbnN0cmFpbnRzPzoge30pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnZveGVldC5zdGFydEF1ZGlvRm9yVXNlcih1c2VySWQsIGNvbnN0cmFpbnRzKTtcbiAgfVxuXG4gIHN0b3BBdWRpb0ZvclVzZXIodXNlcklkOiBzdHJpbmcsIGNvbnN0cmFpbnRzPzoge30pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnZveGVldC5zdG9wQXVkaW9Gb3JVc2VyKHVzZXJJZCwgY29uc3RyYWludHMpO1xuICB9XG5cbiAgc3RhcnRTY3JlZW5TaGFyZShvcHRpb25zOiBBcnJheTxTY3JlZW5TaGFyZU9wdGlvbnM+KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXQuc3RhcnRTY3JlZW5TaGFyZShvcHRpb25zKTtcbiAgfVxuXG4gIHN0b3BTY3JlZW5TaGFyZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnZveGVldC5zdG9wU2NyZWVuU2hhcmUoKTtcbiAgfVxuXG4gIHN0YXJ0UmVjb3JkaW5nKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMudm94ZWV0LnN0YXJ0UmVjb3JkaW5nKCk7XG4gIH1cblxuICBzdG9wUmVjb3JkaW5nKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMudm94ZWV0LnN0b3BSZWNvcmRpbmcoKTtcbiAgfVxuXG4gIHJlcGxheVJlY29yZGluZyhjb25mZXJlbmNlSWQ6IHN0cmluZywgb2Zmc2V0PzogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoY29uZmVyZW5jZUlkICYmIHRoaXMudm94ZWV0ICYmIHRoaXMudm94ZWV0LnJlcGxheUNvbmZlcmVuY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5yZXBsYXlDb25mZXJlbmNlKGNvbmZlcmVuY2VJZCwgb2Zmc2V0IHx8IDApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0NvbmZlcmVuY2VJZCBpcyBub3QgcHJvdmlkZWQnKTtcbiAgICB9XG4gIH1cblxuICBzaGFyZVZpZGVvKHVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXQudmlkZW9QcmVzZW50YXRpb24uc3RhcnQodXJsKTtcbiAgfVxuXG4gIHVwZGF0ZU1lZGlhU2V0dGluZ3Moc2V0dGluZ3M6IHsgbWljcm9waG9uZTogTWVkaWFEZXZpY2VJbmZvOyB2aWRlbzogTWVkaWFEZXZpY2VJbmZvIH0pOiBBcnJheTxQcm9taXNlPGFueT4+IHtcbiAgICBsZXQgcHJvbWlzZXM6IGFueSA9IFtdO1xuICAgIGxldCBtaWNyb3Bob25lID0gc2V0dGluZ3MubWljcm9waG9uZTtcbiAgICBsZXQgdmlkZW8gPSBzZXR0aW5ncy52aWRlbztcbiAgICBpZiAobWljcm9waG9uZSAmJiBtaWNyb3Bob25lLmRldmljZUlkKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKHRoaXMuc2VsZWN0QXVkaW9JbnB1dChtaWNyb3Bob25lLmRldmljZUlkKSk7XG4gICAgfVxuICAgIGlmICh2aWRlbyAmJiB2aWRlby5kZXZpY2VJZCkge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnNlbGVjdFZpZGVvSW5wdXQodmlkZW8uZGV2aWNlSWQpKTtcbiAgICB9XG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHByb21pc2VzLnB1c2goUHJvbWlzZS5yZXNvbHZlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZXM7XG4gIH1cblxuICBzZW5kQ2hhdE1lc3NhZ2UodXNlcnM6IEFycmF5PFVzZXI+LCByb29tTmFtZTogc3RyaW5nLCBjb25mZXJlbmNlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBvdGhlcnMgPSB1c2Vycy5maWx0ZXIodXNlciA9PiB1c2VyLl9pZCAhPT0gdGhpcy5zZXNzaW9uLnVzZXJJZCk7XG4gICAgaWYgKG90aGVycykge1xuICAgICAgdGhpcy5pbnZpdGVQYXJ0aWNpcGFudHMoY29uZmVyZW5jZUlkLCBvdGhlcnMpO1xuICAgICAgb3RoZXJzXG4gICAgICAgIC5tYXAodXNlciA9PiB1c2VyLl9pZClcbiAgICAgICAgLmZvckVhY2godXNlcklkID0+IHtcbiAgICAgICAgICB0aGlzLnB1Ym51Yi5zZW5kQ2hhdE1lc3NhZ2UodXNlcklkLCB0aGlzLnRyYW5zbGF0ZS5nZXQoJ1ZJREVPQ0FMTENBTExJTkcnLCB7IHVzZXI6IFVzZXIuZ2V0RGlzcGxheU5hbWUodGhpcy5zZXNzaW9uLnVzZXIpIH0pLCB1c2VySWQsIG51bGwsIG51bGwsIG51bGwsICd2aWRlb2NhbGwnLCB7IGNvbmZlcmVuY2VJZCwgdXNlcjogdGhpcy5zZXNzaW9uLnVzZXIsIHVzZXJzIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZveGVldCAmJiBpc0Z1bmN0aW9uKHRoaXMudm94ZWV0LmRpc2Nvbm5lY3QpKSB7XG4gICAgICB0aGlzLmlzSW5pdCA9IGZhbHNlO1xuICAgICAgdGhpcy52b3hlZXQuZGlzY29ubmVjdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmxvZy5sb2coJ3ZveGVldCBkaXNjb25uZWN0ZWQnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlY29ubmVjdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHRoaXMudm94ZWV0LmNvbm5lY3QodGhpcy5nZXRVc2VySW5mbygpKTtcbiAgICB9XG4gIH1cblxuICBzZW5kUmVjb3JkZWRDb25mZXJlbmNlSWQoY3VycmVudE1lc3NhZ2U6IHN0cmluZywgY2hhbm5lbCkge1xuICAgIGlmIChjdXJyZW50TWVzc2FnZSAmJiBjaGFubmVsICYmIGNoYW5uZWwub3RoZXJzICYmIGNoYW5uZWwub3RoZXJzWzBdICYmIGNoYW5uZWwub3RoZXJzWzBdLl9pZCkge1xuICAgICAgdGhpcy5wdWJudWIuc2VuZENoYXRNZXNzYWdlKGNoYW5uZWwuY2hhbm5lbCwgY3VycmVudE1lc3NhZ2UsIGNoYW5uZWwub3RoZXJzWzBdLl9pZCwgbnVsbCwgPGFueT5jaGFubmVsLCB7fSwgJ2NvbmZlcmVuY2UnKTtcbiAgICB9XG4gIH1cblxuICBzaG93Tm9XZWJDYW1BbGVydCgpOiB2b2lkIHtcbiAgICBzaG93QWxlcnQodGhpcy50cmFuc2xhdGUuZ2V0KCdOT1dFQkNBTScpLCBbdGhpcy50cmFuc2xhdGUuZ2V0KCdPSycpXSwgbnVsbCwgJycpO1xuICB9XG5cbiAgc2hvd0ZhaWxlZENvbm5lY3RBbGVydCgpOiB2b2lkIHtcbiAgICBzaG93QWxlcnQodGhpcy50cmFuc2xhdGUuZ2V0KCdDT05GRVJFTkNFRkFJTEVEJyksIFt0aGlzLnRyYW5zbGF0ZS5nZXQoJ09LJyldLCBudWxsLCAnJyk7XG4gIH1cblxuICBzaG93Q2FsbGVyTGVmdEFsZXJ0KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHNob3dBbGVydCgnJywgW3RoaXMudHJhbnNsYXRlLmdldCgnT0snKV0sICcnLCB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0NBTExFUkxFRlQnKSk7XG4gIH1cblxuICBzaG93UmVjaWV2ZXJMZWZ0KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHNob3dBbGVydCgnJywgW3RoaXMudHJhbnNsYXRlLmdldCgnT0snKV0sICcnLCB0aGlzLnRyYW5zbGF0ZS5nZXQoJ1JFQ0lFVkVSTEVGVCcpKTtcbiAgfVxuXG4gIHNob3dSZWNvcmRDb21wbGV0ZUFsZXJ0KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHNob3dBbGVydCgnJywgW3RoaXMudHJhbnNsYXRlLmdldCgnT0snKV0sICcnLCB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0NBTExSRUNPUkRFRCcpKTtcbiAgfVxuXG4gIHNldFZpZGVvVG9hc3QodG9hc3Q6IEhUTUxZb29Ub2FzdEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnZpZGVvVG9hc3QgPSB0b2FzdDtcbiAgfVxuXG4gIHNldFZpZGVvTW9kYWwobW9kYWw6IEhUTUxZb29Jb25Nb2RhbEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnZpZGVvTW9kYWwgPSBtb2RhbDtcbiAgfVxuXG4gIGNsb3NlVmlkZW9Nb2RhbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52aWRlb01vZGFsKSB7XG4gICAgICBjbG9zZU1vZGFsKHRoaXMudmlkZW9Nb2RhbCk7XG4gICAgICB0aGlzLnZpZGVvTW9kYWwgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGRpc21pc3NWaWRlb1RvYXN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZpZGVvVG9hc3QpIHtcbiAgICAgIHRoaXMudmlkZW9Ub2FzdC5kaXNtaXNzKCk7XG4gICAgICB0aGlzLnZpZGVvVG9hc3QgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIG9uU2VuZERlY2xpbmVNZXNzYWdlKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmIChkYXRhICYmIGRhdGEub3B0aW9ucyAmJiBkYXRhLnNlbmRlcl9pZCkge1xuICAgICAgdGhpcy5wdWJudWIuc2VuZENoYXRNZXNzYWdlKGRhdGEuc2VuZGVyX2lkLCB0aGlzLnRyYW5zbGF0ZS5nZXQoJ1ZJREVPQ0FMTENBTkNFTCcsIHsgdXNlcjogVXNlci5nZXREaXNwbGF5TmFtZSh0aGlzLnNlc3Npb24udXNlcikgfSksIHRoaXMuc2Vzc2lvbi51c2VyLl9pZCwgbnVsbCwgbnVsbCwgbnVsbCwgJ3ZpZGVvY2FsbGNhbmNlbCcsIHsgZGVjbGluZUNhbGw6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgb25TZW5kQ2FuY2VsTm90aWZpY2F0aW9uTWVzc2FnZSh1c2VyczogQXJyYXk8VXNlcj4sIGNvbmZlcmVuY2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IG90aGVycyA9IHVzZXJzLmZpbHRlcih1c2VyID0+IHVzZXIuX2lkICE9PSB0aGlzLnNlc3Npb24udXNlcklkKTtcbiAgICBpZiAob3RoZXJzKSB7XG4gICAgICBvdGhlcnNcbiAgICAgICAgLm1hcCh1c2VyID0+IHVzZXIuX2lkKVxuICAgICAgICAuZm9yRWFjaCh1c2VySWQgPT4ge1xuICAgICAgICAgIHRoaXMucHVibnViLnNlbmRDaGF0TWVzc2FnZSh1c2VySWQsIHRoaXMudHJhbnNsYXRlLmdldCgnVklERU9DQUxMQ0FOQ0VMJywgeyB1c2VyOiBVc2VyLmdldERpc3BsYXlOYW1lKHRoaXMuc2Vzc2lvbi51c2VyKSB9KSwgdXNlcklkLCBudWxsLCBudWxsLCBudWxsLCAndmlkZW9jYWxsY2FuY2VsJywgeyBjYW5jZWxDYWxsOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvblJlY2VpdmVEZWNsaW5lTWVzc2FnZShkYXRhOiBhbnkpIHtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLm9wdGlvbnMgJiYgZGF0YS5zZW5kZXJfaWQgJiYgdGhpcy5zZXNzaW9uLnVzZXIuX2lkKSB7XG4gICAgICBpZiAoZGF0YS5vcHRpb25zLmRlY2xpbmVDYWxsICYmIGRhdGEuc2VuZGVyX2lkICE9PSB0aGlzLnNlc3Npb24udXNlci5faWQpIHtcbiAgICAgICAgc2hvd0FsZXJ0KCcnLCBbdGhpcy50cmFuc2xhdGUuZ2V0KCdPSycpXSwgJycsIHRoaXMudHJhbnNsYXRlLmdldCgnVVNFUkRFQ0xJTkVDQUxMJykpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICB0aGlzLmNsb3NlVmlkZW9Nb2RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5vcHRpb25zLmNhbmNlbENhbGwpIHtcbiAgICAgICAgdGhpcy5kaXNtaXNzVmlkZW9Ub2FzdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19
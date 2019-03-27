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
export { VideoCall };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tY2FsbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1saXZlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3ZpZGVvLWNhbGwvdmlkZW8tY2FsbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV2QztJQWVFLG1CQUFzQixPQUFnQixFQUFZLEdBQVEsRUFBWSxVQUFzQixFQUFZLE1BQWMsRUFBWSxTQUFvQjtRQUFoSSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVksUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFZLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVksY0FBUyxHQUFULFNBQVMsQ0FBVztRQVA5SSxnQkFBVyxHQUFHO1lBQ3BCLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7Z0JBQ3RCLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDeEI7U0FDRixDQUFDO0lBQ3VKLENBQUM7Ozs7SUFFMUosOEJBQVU7OztJQUFWO1FB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aUNBQTZCOzs7OztJQUM3Qiw2QkFBc0I7Ozs7O0lBQ3RCLCtCQUEyQzs7Ozs7SUFDM0MsK0JBQXdDOzs7OztJQUN4QyxnQ0FNRTs7Ozs7SUFDVSw0QkFBMEI7Ozs7O0lBQUUsd0JBQWtCOzs7OztJQUFFLCtCQUFnQzs7Ozs7SUFBRSwyQkFBd0I7Ozs7O0lBQUUsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2Vzc2lvbiwgVXNlciB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcbmltcG9ydCB7IExvZywgQ29yZUNvbmZpZyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IHNob3dBbGVydCwgY2xvc2VNb2RhbCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBWeHRDb25mZXJlbmNlQ29uZmlnLCBXZWJSVENDb25zdHJhaW50cywgU2NyZWVuU2hhcmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy92b3hlZXQvdm94ZWV0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5cbmltcG9ydCBWb3hlZXRTZGsgZnJvbSAnQHZveGVldC92b3hlZXQtd2ViLXNkayc7XG5pbXBvcnQgeyBQdWJudWIgfSBmcm9tICcuLi9wdWJudWIvcHVibnViLnNlcnZpY2UnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWRlb0NhbGwge1xuICBwcm90ZWN0ZWQgaXNJbml0OiBib29sZWFuO1xuICBwcml2YXRlIHZveGVldDogVm94ZWV0U2RrO1xuICBwcml2YXRlIHZveGVldFVzZXJJZDogc3RyaW5nO1xuICBwcml2YXRlIHVzZXJJbmZvOiBhbnk7XG4gIHByaXZhdGUgdmlkZW9Nb2RhbDogSFRNTFlvb0lvbk1vZGFsRWxlbWVudDtcbiAgcHJpdmF0ZSB2aWRlb1RvYXN0OiBIVE1MWW9vVG9hc3RFbGVtZW50O1xuICBwcml2YXRlIGNvbnN0cmFpbnRzID0ge1xuICAgIGF1ZGlvOiB0cnVlLFxuICAgIHZpZGVvOiB7XG4gICAgICB3aWR0aDogeyBpZGVhbDogNDA5NiB9LFxuICAgICAgaGVpZ2h0OiB7IGlkZWFsOiAyMTYwIH1cbiAgICB9XG4gIH07XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzZXNzaW9uOiBTZXNzaW9uLCBwcm90ZWN0ZWQgbG9nOiBMb2csIHByb3RlY3RlZCBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnLCBwcm90ZWN0ZWQgcHVibnViOiBQdWJudWIsIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZSkge31cblxuICB1c2VDb3Jkb3ZhKCkge1xuICAgIHJldHVybiB0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkgJiYgd2luZG93WydWb3hlZXQnXTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgdGhpcy5pc0luaXQgPSB0cnVlO1xuICAgICAgdGhpcy5vbkluaXRVc2VySW5mbygpO1xuICAgICAgaWYgKHRoaXMudXNlQ29yZG92YSgpICYmIHdpbmRvd1snVm94ZWV0J10pIHtcbiAgICAgICAgdGhpcy5vbkluaXRDb3Jkb3ZhKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uSW5pdFdlYigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICBvbkluaXRVc2VySW5mbygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZXNzaW9uICYmIHRoaXMuc2Vzc2lvbi51c2VyKSB7XG4gICAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy5jb252ZXJ0VXNlckluZm8odGhpcy5zZXNzaW9uLnVzZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy5jb252ZXJ0VXNlckluZm8oKTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0VXNlckluZm8oXG4gICAgdXNlcj86IFVzZXJcbiAgKToge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBleHRlcm5hbElkOiBzdHJpbmc7XG4gICAgYXZhdGFyVXJsOiBzdHJpbmc7XG4gIH0ge1xuICAgIGxldCB1c2VySWQgPSAnJztcbiAgICBsZXQgdXNlck5hbWUgPSAnJztcbiAgICBsZXQgaW1hZ2VEYXRhID0gJyc7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlmICh1c2VyLl9pZCkge1xuICAgICAgICB1c2VySWQgPSB1c2VyLl9pZDtcbiAgICAgIH1cbiAgICAgIGlmIChVc2VyLmdldERpc3BsYXlOYW1lKHVzZXIpKSB7XG4gICAgICAgIHVzZXJOYW1lID0gVXNlci5nZXREaXNwbGF5TmFtZSh1c2VyKTtcbiAgICAgIH1cbiAgICAgIGlmICh1c2VyLmltYWdlRGF0YSkge1xuICAgICAgICBpbWFnZURhdGEgPSB1c2VyLmltYWdlRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHVzZXJOYW1lLFxuICAgICAgZXh0ZXJuYWxJZDogdXNlcklkLFxuICAgICAgYXZhdGFyVXJsOiBpbWFnZURhdGFcbiAgICB9O1xuICB9XG5cbiAgb25Jbml0Q29yZG92YSgpOiB2b2lkIHtcbiAgICB0aGlzLnZveGVldCA9IHdpbmRvd1snVm94ZWV0J107XG4gICAgaWYgKHRoaXMudm94ZWV0KSB7XG4gICAgICB0aGlzLnZveGVldFxuICAgICAgICAuaW5pdGlhbGl6ZSh0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCd2b3hlZXRLZXknKSwgdGhpcy5jb3JlQ29uZmlnLmdldEtleSgndm94ZWV0U2VjcmV0JykpXG4gICAgICAgIC50aGVuKG15VXNlcklkID0+IHtcbiAgICAgICAgICB0aGlzLnZveGVldFVzZXJJZCA9IG15VXNlcklkO1xuICAgICAgICAgIHRoaXMubG9nLmxvZygndm94ZWV0IGlzIGluaXQgZm9yIGNvcmRvdmE6JywgdGhpcy52b3hlZXRVc2VySWQpO1xuICAgICAgICAgIHRoaXMudm94ZWV0LmFwcGVhck1heGltaXplZCh0cnVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmxvZygnYXBwZWFyTWF4aW1pemVkJyk7XG4gICAgICAgICAgdGhpcy52b3hlZXQuZGVmYXVsdEJ1aWx0SW5TcGVha2VyKHRydWUpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cubG9nKCdkZWZhdWx0QnVpbHRJblNwZWFrZXInKTtcbiAgICAgICAgICB0aGlzLnZveGVldC5kZWZhdWx0VmlkZW8odHJ1ZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZy5sb2coJ2RlZmF1bHRWaWRlbycpO1xuICAgICAgICAgIHRoaXMudm94ZWV0LmNvbm5lY3QodGhpcy5nZXRVc2VySW5mbygpKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmxvZygndm94ZWV0IGNvbm5lY3RlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkluaXRXZWIoKTogdm9pZCB7XG4gICAgdGhpcy52b3hlZXQgPSBuZXcgVm94ZWV0U2RrKCk7XG4gICAgaWYgKHRoaXMudm94ZWV0KSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXRcbiAgICAgICAgLmluaXRpYWxpemUodGhpcy5jb3JlQ29uZmlnLmdldEtleSgndm94ZWV0S2V5JyksIHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ3ZveGVldFNlY3JldCcpLCB0aGlzLmdldFVzZXJJbmZvKCkpXG4gICAgICAgIC50aGVuKG15VXNlcklkID0+IHtcbiAgICAgICAgICB0aGlzLnZveGVldFVzZXJJZCA9IG15VXNlcklkO1xuICAgICAgICAgIHRoaXMubG9nLmxvZygndm94ZWV0IGlzIGluaXQgZm9yIHdlYjonLCB0aGlzLnZveGVldFVzZXJJZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRVc2VySW5mbygpOiBhbnkge1xuICAgIGlmICh0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIG5ldyB3aW5kb3dbJ1VzZXJJbmZvJ10odGhpcy51c2VySW5mby5leHRlcm5hbElkLCB0aGlzLnVzZXJJbmZvLm5hbWUsIHRoaXMudXNlckluZm8uYXZhdGFyVXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudXNlckluZm87XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQ29uZmVyZW5jZShhbGlhczogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQuY3JlYXRlKHsgY29uZmVyZW5jZUFsaWFzOiBhbGlhcywgcGFyYW1zOiB7IHZpZGVvQ29kZWM6ICdIMjY0JyB9IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQuY3JlYXRlQ29uZmVyZW5jZSh7IGFsaWFzIH0pO1xuICAgIH1cbiAgfVxuXG4gIGpvaW5Db25mZXJlbmNlKGNvbmY6IGFueSwgb3B0aW9ucz86IFZ4dENvbmZlcmVuY2VDb25maWcpIHtcbiAgICBpZiAodGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5qb2luKGNvbmYuY29uZmVyZW5jZUlkID8gY29uZi5jb25mZXJlbmNlSWQgOiBjb25mKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LmpvaW5Db25mZXJlbmNlKFxuICAgICAgICBjb25mLmNvbmZlcmVuY2VJZCA/IGNvbmYuY29uZmVyZW5jZUlkIDogY29uZixcbiAgICAgICAgb3B0aW9ucyB8fCB7XG4gICAgICAgICAgY29uc3RyYWludHM6IHsgdmlkZW86IHRydWUsIGF1ZGlvOiB0cnVlIH0sXG4gICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgbmFtZTogVXNlci5nZXREaXNwbGF5TmFtZSh0aGlzLnNlc3Npb24udXNlciksXG4gICAgICAgICAgICBleHRlcm5hbElkOiB0aGlzLnNlc3Npb24udXNlcklkLFxuICAgICAgICAgICAgYXZhdGFyVXJsOiB0aGlzLnNlc3Npb24udXNlci5pbWFnZURhdGFcbiAgICAgICAgICB9LFxuICAgICAgICAgIGF1ZGlvM0Q6IHRydWUsXG4gICAgICAgICAgY29uZmVyZW5jZTogeyBwYXJhbXM6IHsgdmlkZW9Db2RlYzogJ0gyNjQnLCBsaXZlUmVjb3JkaW5nOiB0cnVlIH0gfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGhhc1dlYkNhbSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIGxldCBtZWRpYURldmljZXMgPSB3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBhcyBhbnk7XG4gICAgICBtZWRpYURldmljZXMuZ2V0TWVkaWEgPSBtZWRpYURldmljZXMuZ2V0VXNlck1lZGlhIHx8IG1lZGlhRGV2aWNlcy53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbWVkaWFEZXZpY2VzLm1vekdldFVzZXJNZWRpYSB8fCBtZWRpYURldmljZXMubXNHZXRVc2VyTWVkaWE7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBtZWRpYURldmljZXMuZ2V0TWVkaWEoeyB2aWRlbzogdHJ1ZSB9KS50aGVuKFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiByZXNvbHZlKGZhbHNlKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGhhc01pY3JvcGhvbmUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yKSB7XG4gICAgICBsZXQgbWVkaWFEZXZpY2VzID0gd2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMgYXMgYW55O1xuICAgICAgbWVkaWFEZXZpY2VzLmdldE1lZGlhID0gbWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSB8fCBtZWRpYURldmljZXMud2Via2l0R2V0VXNlck1lZGlhIHx8IG1lZGlhRGV2aWNlcy5tb3pHZXRVc2VyTWVkaWEgfHwgbWVkaWFEZXZpY2VzLm1zR2V0VXNlck1lZGlhO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbWVkaWFEZXZpY2VzLmdldE1lZGlhKHsgYXVkaW86IHRydWUgfSkudGhlbihcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4gcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBnZXRDb25zdHJhaW50KCk6IHsgdmlkZW86IGFueTsgYXVkaW86IGFueSB9IHtcbiAgICBsZXQgY29uc3RyYWludHM6IGFueSA9IHRoaXMuY29uc3RyYWludHM7XG4gICAgbGV0IGNhbVByb21pc2UgPSB0aGlzLmhhc1dlYkNhbSgpO1xuICAgIGxldCBtaWNQcm9taXNlID0gdGhpcy5oYXNNaWNyb3Bob25lKCk7XG4gICAgY2FtUHJvbWlzZS50aGVuKGhhc0NhbSA9PiB7XG4gICAgICBpZiAoIWhhc0NhbSkge1xuICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG1pY1Byb21pc2UudGhlbihoYXNNaWMgPT4ge1xuICAgICAgaWYgKCFoYXNNaWMpIHtcbiAgICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29uc3RyYWludHM7XG4gIH1cblxuICBpbnZpdGVQYXJ0aWNpcGFudHMoY29uZmVyZW5jZUlkOiBzdHJpbmcsIGV4dGVybmFsSWRzOiBBcnJheTxVc2VyPik6IHZvaWQge1xuICAgIGlmICh0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0Lmludml0ZShcbiAgICAgICAgY29uZmVyZW5jZUlkLFxuICAgICAgICBleHRlcm5hbElkcy5tYXAodXNlciA9PiB7XG4gICAgICAgICAgbGV0IHVzZXJJbmZvID0gdGhpcy5jb252ZXJ0VXNlckluZm8odXNlcik7XG4gICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3dbJ1VzZXJJbmZvJ10odXNlckluZm8uZXh0ZXJuYWxJZCwgdXNlckluZm8ubmFtZSwgdXNlckluZm8uYXZhdGFyVXJsKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5pbnZpdGUoY29uZmVyZW5jZUlkLCBleHRlcm5hbElkcy5tYXAodXNlciA9PiB1c2VyLl9pZCkpO1xuICAgIH1cbiAgfVxuXG4gIGxlYXZlQ29uZmVyZW5jZShsZWF2ZVJvb206IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQubGVhdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LmxlYXZlQ29uZmVyZW5jZShsZWF2ZVJvb20pO1xuICAgIH1cbiAgfVxuXG4gIGFkZExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKSB7XG4gICAgaWYgKCF0aGlzLnVzZUNvcmRvdmEoKSAmJiBldmVudCAmJiBoYW5kbGVyKSB7XG4gICAgICB0aGlzLnZveGVldC5vbihldmVudCwgaGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pIHtcbiAgICBpZiAoIXRoaXMudXNlQ29yZG92YSgpICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgIHRoaXMudm94ZWV0LnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxMaXN0ZW5lcnMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAodGhpcy52b3hlZXQgJiYgdGhpcy52b3hlZXQucmVtb3ZlQWxsTGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIGdldFVzZXJJZCgpIHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXRVc2VySWQ7XG4gIH1cblxuICBzdGFydFZpZGVvKHVzZXJJZD86IHN0cmluZywgY29uc3RyYWludHM/OiBXZWJSVENDb25zdHJhaW50cykge1xuICAgIGlmICghdGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5zdGFydFZpZGVvRm9yVXNlcih1c2VySWQgfHwgdGhpcy5nZXRVc2VySWQoKSwgY29uc3RyYWludHMgfHwgdGhpcy5jb25zdHJhaW50cyk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFZpZGVvKHVzZXJJZD86IHN0cmluZykge1xuICAgIGlmICghdGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5zdG9wVmlkZW9Gb3JVc2VyKHVzZXJJZCB8fCB0aGlzLmdldFVzZXJJZCgpKTtcbiAgICB9XG4gIH1cblxuICBzdGFydEF1ZGlvKHVzZXJJZD86IHN0cmluZykge1xuICAgIGlmICghdGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5zdGFydEF1ZGlvRm9yVXNlcih1c2VySWQgfHwgdGhpcy5nZXRVc2VySWQoKSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcEF1ZGlvKHVzZXJJZD86IHN0cmluZykge1xuICAgIGlmICghdGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5zdG9wQXVkaW9Gb3JVc2VyKHVzZXJJZCB8fCB0aGlzLmdldFVzZXJJZCgpKTtcbiAgICB9XG4gIH1cblxuICBtdXRlVXNlcihpc011dGVkOiBib29sZWFuLCB1c2VySWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQubXV0ZVVzZXIodXNlcklkIHx8IHRoaXMuZ2V0VXNlcklkKCksIGlzTXV0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZU11dGUodXNlcklkPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LnRvZ2dsZU11dGUodXNlcklkIHx8IHRoaXMuZ2V0VXNlcklkKCkpO1xuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJQb3NpdGlvbih1c2VySWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQuc2V0VXNlclBvc2l0aW9uKHVzZXJJZCwgeCwgeSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q3VycmVudFNlc3Npb24oKSB7XG4gICAgaWYgKCF0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0RW51bWVyYXRlQXVkaW9EZXZpY2VzKG9wdGlvbj86IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKCF0aGlzLnVzZUNvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudm94ZWV0LmVudW1lcmF0ZUF1ZGlvRGV2aWNlcyhvcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGdldEVudW1lcmF0ZVZpZGVvRGV2aWNlcygpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICghdGhpcy51c2VDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnZveGVldC5lbnVtZXJhdGVWaWRlb0RldmljZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RBdWRpb0lucHV0KGRldmljZUlkOiBzdHJpbmcsIGNvbnN0cmFpbnRzPzoge30pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnZveGVldC5zZWxlY3RBdWRpb0lucHV0KGRldmljZUlkLCBjb25zdHJhaW50cyk7XG4gIH1cblxuICBzZWxlY3RBdWRpb091dHB1dChkZXZpY2VJZDogc3RyaW5nLCBjb25zdHJhaW50cz86IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXQuc2VsZWN0QXVkaW9PdXRwdXQoZGV2aWNlSWQsIGNvbnN0cmFpbnRzKTtcbiAgfVxuXG4gIHNlbGVjdFZpZGVvSW5wdXQoZGV2aWNlSWQ6IHN0cmluZywgY29uc3RyYWludHM/OiB7fSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMudm94ZWV0LnNlbGVjdFZpZGVvSW5wdXQoZGV2aWNlSWQsIGNvbnN0cmFpbnRzKTtcbiAgfVxuXG4gIHN0YXJ0VmlkZW9Gb3JVc2VyKHVzZXJJZDogc3RyaW5nLCBjb25zdHJhaW50cz86IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXQuc3RhcnRWaWRlb0ZvclVzZXIodXNlcklkLCBjb25zdHJhaW50cyk7XG4gIH1cblxuICBzdG9wVmlkZW9Gb3JVc2VyKHVzZXJJZDogc3RyaW5nLCBjb25zdHJhaW50cz86IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXQuc3RvcFZpZGVvRm9yVXNlcih1c2VySWQsIGNvbnN0cmFpbnRzKTtcbiAgfVxuXG4gIHN0YXJ0QXVkaW9Gb3JVc2VyKHVzZXJJZDogc3RyaW5nLCBjb25zdHJhaW50cz86IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXQuc3RhcnRBdWRpb0ZvclVzZXIodXNlcklkLCBjb25zdHJhaW50cyk7XG4gIH1cblxuICBzdG9wQXVkaW9Gb3JVc2VyKHVzZXJJZDogc3RyaW5nLCBjb25zdHJhaW50cz86IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXQuc3RvcEF1ZGlvRm9yVXNlcih1c2VySWQsIGNvbnN0cmFpbnRzKTtcbiAgfVxuXG4gIHN0YXJ0U2NyZWVuU2hhcmUob3B0aW9uczogQXJyYXk8U2NyZWVuU2hhcmVPcHRpb25zPik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMudm94ZWV0LnN0YXJ0U2NyZWVuU2hhcmUob3B0aW9ucyk7XG4gIH1cblxuICBzdG9wU2NyZWVuU2hhcmUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy52b3hlZXQuc3RvcFNjcmVlblNoYXJlKCk7XG4gIH1cblxuICBzdGFydFJlY29yZGluZygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnZveGVldC5zdGFydFJlY29yZGluZygpO1xuICB9XG5cbiAgc3RvcFJlY29yZGluZygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnZveGVldC5zdG9wUmVjb3JkaW5nKCk7XG4gIH1cblxuICByZXBsYXlSZWNvcmRpbmcoY29uZmVyZW5jZUlkOiBzdHJpbmcsIG9mZnNldD86IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKGNvbmZlcmVuY2VJZCAmJiB0aGlzLnZveGVldCAmJiB0aGlzLnZveGVldC5yZXBsYXlDb25mZXJlbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy52b3hlZXQucmVwbGF5Q29uZmVyZW5jZShjb25mZXJlbmNlSWQsIG9mZnNldCB8fCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdDb25mZXJlbmNlSWQgaXMgbm90IHByb3ZpZGVkJyk7XG4gICAgfVxuICB9XG5cbiAgc2hhcmVWaWRlbyh1cmw6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMudm94ZWV0LnZpZGVvUHJlc2VudGF0aW9uLnN0YXJ0KHVybCk7XG4gIH1cblxuICB1cGRhdGVNZWRpYVNldHRpbmdzKHNldHRpbmdzOiB7IG1pY3JvcGhvbmU6IE1lZGlhRGV2aWNlSW5mbzsgdmlkZW86IE1lZGlhRGV2aWNlSW5mbyB9KTogQXJyYXk8UHJvbWlzZTxhbnk+PiB7XG4gICAgbGV0IHByb21pc2VzOiBhbnkgPSBbXTtcbiAgICBsZXQgbWljcm9waG9uZSA9IHNldHRpbmdzLm1pY3JvcGhvbmU7XG4gICAgbGV0IHZpZGVvID0gc2V0dGluZ3MudmlkZW87XG4gICAgaWYgKG1pY3JvcGhvbmUgJiYgbWljcm9waG9uZS5kZXZpY2VJZCkge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnNlbGVjdEF1ZGlvSW5wdXQobWljcm9waG9uZS5kZXZpY2VJZCkpO1xuICAgIH1cbiAgICBpZiAodmlkZW8gJiYgdmlkZW8uZGV2aWNlSWQpIHtcbiAgICAgIHByb21pc2VzLnB1c2godGhpcy5zZWxlY3RWaWRlb0lucHV0KHZpZGVvLmRldmljZUlkKSk7XG4gICAgfVxuICAgIGlmIChwcm9taXNlcy5sZW5ndGggPCAxKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKFByb21pc2UucmVzb2x2ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2VzO1xuICB9XG5cbiAgc2VuZENoYXRNZXNzYWdlKHVzZXJzOiBBcnJheTxVc2VyPiwgcm9vbU5hbWU6IHN0cmluZywgY29uZmVyZW5jZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgb3RoZXJzID0gdXNlcnMuZmlsdGVyKHVzZXIgPT4gdXNlci5faWQgIT09IHRoaXMuc2Vzc2lvbi51c2VySWQpO1xuICAgIGlmIChvdGhlcnMpIHtcbiAgICAgIHRoaXMuaW52aXRlUGFydGljaXBhbnRzKGNvbmZlcmVuY2VJZCwgb3RoZXJzKTtcbiAgICAgIG90aGVyc1xuICAgICAgICAubWFwKHVzZXIgPT4gdXNlci5faWQpXG4gICAgICAgIC5mb3JFYWNoKHVzZXJJZCA9PiB7XG4gICAgICAgICAgdGhpcy5wdWJudWIuc2VuZENoYXRNZXNzYWdlKHVzZXJJZCwgdGhpcy50cmFuc2xhdGUuZ2V0KCdWSURFT0NBTExDQUxMSU5HJywgeyB1c2VyOiBVc2VyLmdldERpc3BsYXlOYW1lKHRoaXMuc2Vzc2lvbi51c2VyKSB9KSwgdXNlcklkLCBudWxsLCBudWxsLCBudWxsLCAndmlkZW9jYWxsJywgeyBjb25mZXJlbmNlSWQsIHVzZXI6IHRoaXMuc2Vzc2lvbi51c2VyLCB1c2VycyB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52b3hlZXQgJiYgaXNGdW5jdGlvbih0aGlzLnZveGVldC5kaXNjb25uZWN0KSkge1xuICAgICAgdGhpcy5pc0luaXQgPSBmYWxzZTtcbiAgICAgIHRoaXMudm94ZWV0LmRpc2Nvbm5lY3QoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2cubG9nKCd2b3hlZXQgZGlzY29ubmVjdGVkJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWNvbm5lY3QoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXNlQ29yZG92YSgpKSB7XG4gICAgICB0aGlzLnZveGVldC5jb25uZWN0KHRoaXMuZ2V0VXNlckluZm8oKSk7XG4gICAgfVxuICB9XG5cbiAgc2VuZFJlY29yZGVkQ29uZmVyZW5jZUlkKGN1cnJlbnRNZXNzYWdlOiBzdHJpbmcsIGNoYW5uZWwpIHtcbiAgICBpZiAoY3VycmVudE1lc3NhZ2UgJiYgY2hhbm5lbCAmJiBjaGFubmVsLm90aGVycyAmJiBjaGFubmVsLm90aGVyc1swXSAmJiBjaGFubmVsLm90aGVyc1swXS5faWQpIHtcbiAgICAgIHRoaXMucHVibnViLnNlbmRDaGF0TWVzc2FnZShjaGFubmVsLmNoYW5uZWwsIGN1cnJlbnRNZXNzYWdlLCBjaGFubmVsLm90aGVyc1swXS5faWQsIG51bGwsIDxhbnk+Y2hhbm5lbCwge30sICdjb25mZXJlbmNlJyk7XG4gICAgfVxuICB9XG5cbiAgc2hvd05vV2ViQ2FtQWxlcnQoKTogdm9pZCB7XG4gICAgc2hvd0FsZXJ0KHRoaXMudHJhbnNsYXRlLmdldCgnTk9XRUJDQU0nKSwgW3RoaXMudHJhbnNsYXRlLmdldCgnT0snKV0sIG51bGwsICcnKTtcbiAgfVxuXG4gIHNob3dGYWlsZWRDb25uZWN0QWxlcnQoKTogdm9pZCB7XG4gICAgc2hvd0FsZXJ0KHRoaXMudHJhbnNsYXRlLmdldCgnQ09ORkVSRU5DRUZBSUxFRCcpLCBbdGhpcy50cmFuc2xhdGUuZ2V0KCdPSycpXSwgbnVsbCwgJycpO1xuICB9XG5cbiAgc2hvd0NhbGxlckxlZnRBbGVydCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBzaG93QWxlcnQoJycsIFt0aGlzLnRyYW5zbGF0ZS5nZXQoJ09LJyldLCAnJywgdGhpcy50cmFuc2xhdGUuZ2V0KCdDQUxMRVJMRUZUJykpO1xuICB9XG5cbiAgc2hvd1JlY2lldmVyTGVmdCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBzaG93QWxlcnQoJycsIFt0aGlzLnRyYW5zbGF0ZS5nZXQoJ09LJyldLCAnJywgdGhpcy50cmFuc2xhdGUuZ2V0KCdSRUNJRVZFUkxFRlQnKSk7XG4gIH1cblxuICBzaG93UmVjb3JkQ29tcGxldGVBbGVydCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBzaG93QWxlcnQoJycsIFt0aGlzLnRyYW5zbGF0ZS5nZXQoJ09LJyldLCAnJywgdGhpcy50cmFuc2xhdGUuZ2V0KCdDQUxMUkVDT1JERUQnKSk7XG4gIH1cblxuICBzZXRWaWRlb1RvYXN0KHRvYXN0OiBIVE1MWW9vVG9hc3RFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy52aWRlb1RvYXN0ID0gdG9hc3Q7XG4gIH1cblxuICBzZXRWaWRlb01vZGFsKG1vZGFsOiBIVE1MWW9vSW9uTW9kYWxFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy52aWRlb01vZGFsID0gbW9kYWw7XG4gIH1cblxuICBjbG9zZVZpZGVvTW9kYWwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmlkZW9Nb2RhbCkge1xuICAgICAgY2xvc2VNb2RhbCh0aGlzLnZpZGVvTW9kYWwpO1xuICAgICAgdGhpcy52aWRlb01vZGFsID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBkaXNtaXNzVmlkZW9Ub2FzdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52aWRlb1RvYXN0KSB7XG4gICAgICB0aGlzLnZpZGVvVG9hc3QuZGlzbWlzcygpO1xuICAgICAgdGhpcy52aWRlb1RvYXN0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBvblNlbmREZWNsaW5lTWVzc2FnZShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLm9wdGlvbnMgJiYgZGF0YS5zZW5kZXJfaWQpIHtcbiAgICAgIHRoaXMucHVibnViLnNlbmRDaGF0TWVzc2FnZShkYXRhLnNlbmRlcl9pZCwgdGhpcy50cmFuc2xhdGUuZ2V0KCdWSURFT0NBTExDQU5DRUwnLCB7IHVzZXI6IFVzZXIuZ2V0RGlzcGxheU5hbWUodGhpcy5zZXNzaW9uLnVzZXIpIH0pLCB0aGlzLnNlc3Npb24udXNlci5faWQsIG51bGwsIG51bGwsIG51bGwsICd2aWRlb2NhbGxjYW5jZWwnLCB7IGRlY2xpbmVDYWxsOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uU2VuZENhbmNlbE5vdGlmaWNhdGlvbk1lc3NhZ2UodXNlcnM6IEFycmF5PFVzZXI+LCBjb25mZXJlbmNlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBvdGhlcnMgPSB1c2Vycy5maWx0ZXIodXNlciA9PiB1c2VyLl9pZCAhPT0gdGhpcy5zZXNzaW9uLnVzZXJJZCk7XG4gICAgaWYgKG90aGVycykge1xuICAgICAgb3RoZXJzXG4gICAgICAgIC5tYXAodXNlciA9PiB1c2VyLl9pZClcbiAgICAgICAgLmZvckVhY2godXNlcklkID0+IHtcbiAgICAgICAgICB0aGlzLnB1Ym51Yi5zZW5kQ2hhdE1lc3NhZ2UodXNlcklkLCB0aGlzLnRyYW5zbGF0ZS5nZXQoJ1ZJREVPQ0FMTENBTkNFTCcsIHsgdXNlcjogVXNlci5nZXREaXNwbGF5TmFtZSh0aGlzLnNlc3Npb24udXNlcikgfSksIHVzZXJJZCwgbnVsbCwgbnVsbCwgbnVsbCwgJ3ZpZGVvY2FsbGNhbmNlbCcsIHsgY2FuY2VsQ2FsbDogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25SZWNlaXZlRGVjbGluZU1lc3NhZ2UoZGF0YTogYW55KSB7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5vcHRpb25zICYmIGRhdGEuc2VuZGVyX2lkICYmIHRoaXMuc2Vzc2lvbi51c2VyLl9pZCkge1xuICAgICAgaWYgKGRhdGEub3B0aW9ucy5kZWNsaW5lQ2FsbCAmJiBkYXRhLnNlbmRlcl9pZCAhPT0gdGhpcy5zZXNzaW9uLnVzZXIuX2lkKSB7XG4gICAgICAgIHNob3dBbGVydCgnJywgW3RoaXMudHJhbnNsYXRlLmdldCgnT0snKV0sICcnLCB0aGlzLnRyYW5zbGF0ZS5nZXQoJ1VTRVJERUNMSU5FQ0FMTCcpKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5jbG9zZVZpZGVvTW9kYWwoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGRhdGEub3B0aW9ucy5jYW5jZWxDYWxsKSB7XG4gICAgICAgIHRoaXMuZGlzbWlzc1ZpZGVvVG9hc3QoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==
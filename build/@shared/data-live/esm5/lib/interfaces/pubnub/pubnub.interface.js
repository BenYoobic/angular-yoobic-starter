/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function PubnubEvent() { }
if (false) {
    /** @type {?|undefined} */
    PubnubEvent.prototype.presence;
    /** @type {?|undefined} */
    PubnubEvent.prototype.message;
    /** @type {?|undefined} */
    PubnubEvent.prototype.status;
}
/** @type {?} */
export var PN_STATUS_CATEGORIES = {
    up: 'PNNetworkUpCategory',
    down: 'PNNetworkDownCategory',
    issues: 'PNNetworkIssuesCategory',
    reconnected: 'PNReconnectedCategory',
    connected: 'PNConnectedCategory'
};
/**
 * @record
 */
export function PresenceEvent() { }
if (false) {
    /** @type {?|undefined} */
    PresenceEvent.prototype.action;
    /** @type {?|undefined} */
    PresenceEvent.prototype.uuid;
    /** @type {?|undefined} */
    PresenceEvent.prototype.timestamp;
    /** @type {?|undefined} */
    PresenceEvent.prototype.occupancy;
    /** @type {?|undefined} */
    PresenceEvent.prototype.state;
    /** @type {?|undefined} */
    PresenceEvent.prototype.channel;
    /** @type {?|undefined} */
    PresenceEvent.prototype.subscription;
    /** @type {?|undefined} */
    PresenceEvent.prototype.timetoken;
    /** @type {?|undefined} */
    PresenceEvent.prototype.userMetadata;
    /** @type {?|undefined} */
    PresenceEvent.prototype.join;
    /** @type {?|undefined} */
    PresenceEvent.prototype.timedout;
    /** @type {?|undefined} */
    PresenceEvent.prototype.leave;
    /** @type {?|undefined} */
    PresenceEvent.prototype.here_now_refresh;
}
/**
 * @record
 */
export function MessageEvent() { }
if (false) {
    /** @type {?|undefined} */
    MessageEvent.prototype.message;
    /** @type {?|undefined} */
    MessageEvent.prototype.channel;
    /** @type {?|undefined} */
    MessageEvent.prototype.subscription;
    /** @type {?|undefined} */
    MessageEvent.prototype.timetoken;
    /** @type {?|undefined} */
    MessageEvent.prototype.userMetadata;
}
/**
 * @record
 */
export function StatusEvent() { }
if (false) {
    /** @type {?|undefined} */
    StatusEvent.prototype.error;
    /** @type {?|undefined} */
    StatusEvent.prototype.statusCode;
    /** @type {?|undefined} */
    StatusEvent.prototype.category;
    /** @type {?|undefined} */
    StatusEvent.prototype.errorData;
    /** @type {?|undefined} */
    StatusEvent.prototype.affectedChannels;
    /** @type {?|undefined} */
    StatusEvent.prototype.affectedChannelGroups;
}
/**
 * @record
 */
export function Listener() { }
if (false) {
    /**
     * @param {?} p
     * @return {?}
     */
    Listener.prototype.message = function (p) { };
    /**
     * @param {?} p
     * @return {?}
     */
    Listener.prototype.presence = function (p) { };
    /**
     * @param {?} p
     * @return {?}
     */
    Listener.prototype.status = function (p) { };
}
/**
 * @record
 */
export function HistoryArguments() { }
if (false) {
    /** @type {?} */
    HistoryArguments.prototype.channel;
    /** @type {?|undefined} */
    HistoryArguments.prototype.start;
    /** @type {?|undefined} */
    HistoryArguments.prototype.end;
    /** @type {?|undefined} */
    HistoryArguments.prototype.includeTimetoken;
    /** @type {?|undefined} */
    HistoryArguments.prototype.reverse;
    /** @type {?|undefined} */
    HistoryArguments.prototype.count;
}
/**
 * @record
 */
export function DeleteHistoryArguments() { }
if (false) {
    /** @type {?} */
    DeleteHistoryArguments.prototype.channel;
    /** @type {?|undefined} */
    DeleteHistoryArguments.prototype.start;
    /** @type {?|undefined} */
    DeleteHistoryArguments.prototype.end;
}
/**
 * @record
 */
export function HistoryItem() { }
if (false) {
    /** @type {?|undefined} */
    HistoryItem.prototype.timetoken;
    /** @type {?|undefined} */
    HistoryItem.prototype.entry;
}
/**
 * @record
 */
export function HistoryResponse() { }
if (false) {
    /** @type {?|undefined} */
    HistoryResponse.prototype.messages;
    /** @type {?|undefined} */
    HistoryResponse.prototype.startTimeToken;
    /** @type {?|undefined} */
    HistoryResponse.prototype.endTimeToken;
}
/**
 * @record
 */
export function LeaveArguments() { }
if (false) {
    /** @type {?} */
    LeaveArguments.prototype.channels;
    /** @type {?} */
    LeaveArguments.prototype.channelGroups;
}
/**
 * @record
 */
export function HereNowArguments() { }
if (false) {
    /** @type {?|undefined} */
    HereNowArguments.prototype.channels;
    /** @type {?|undefined} */
    HereNowArguments.prototype.channelGroups;
    /** @type {?|undefined} */
    HereNowArguments.prototype.includeUUIDs;
    /** @type {?|undefined} */
    HereNowArguments.prototype.includeState;
}
/**
 * @record
 */
export function GlobalState() { }
/**
 * @record
 * @template T
 */
export function UUIDState() { }
if (false) {
    /** @type {?} */
    UUIDState.prototype.uuid;
    /** @type {?} */
    UUIDState.prototype.state;
}
/**
 * @record
 * @template T
 */
export function ChannelStatus() { }
if (false) {
    /** @type {?|undefined} */
    ChannelStatus.prototype.occupants;
    /** @type {?} */
    ChannelStatus.prototype.occupancy;
}
/**
 * @record
 * @template T
 */
export function HereNowResponse() { }
if (false) {
    /** @type {?|undefined} */
    HereNowResponse.prototype.totalChannels;
    /** @type {?|undefined} */
    HereNowResponse.prototype.totalOccupancy;
    /** @type {?|undefined} */
    HereNowResponse.prototype.channels;
    /** @type {?|undefined} */
    HereNowResponse.prototype.uuids;
}
/**
 * @record
 */
export function WhereNowArguments() { }
if (false) {
    /** @type {?|undefined} */
    WhereNowArguments.prototype.uuid;
}
/**
 * @record
 */
export function WhereNowResponse() { }
if (false) {
    /** @type {?} */
    WhereNowResponse.prototype.channels;
}
/**
 * @record
 */
export function SubscribeArguments() { }
if (false) {
    /** @type {?|undefined} */
    SubscribeArguments.prototype.channels;
    /** @type {?|undefined} */
    SubscribeArguments.prototype.channelGroups;
    /** @type {?|undefined} */
    SubscribeArguments.prototype.withPresence;
    /** @type {?|undefined} */
    SubscribeArguments.prototype.timetoken;
}
/**
 * @record
 */
export function UnsubscribeArguments() { }
if (false) {
    /** @type {?|undefined} */
    UnsubscribeArguments.prototype.channels;
    /** @type {?|undefined} */
    UnsubscribeArguments.prototype.channelGroups;
}
/**
 * @record
 */
export function GetStateArguments() { }
if (false) {
    /** @type {?|undefined} */
    GetStateArguments.prototype.channels;
    /** @type {?|undefined} */
    GetStateArguments.prototype.channelGroups;
    /** @type {?|undefined} */
    GetStateArguments.prototype.uuid;
}
/**
 * @record
 */
export function SetStateArguments() { }
if (false) {
    /** @type {?|undefined} */
    SetStateArguments.prototype.channels;
    /** @type {?|undefined} */
    SetStateArguments.prototype.channelGroups;
    /** @type {?|undefined} */
    SetStateArguments.prototype.uuid;
    /** @type {?|undefined} */
    SetStateArguments.prototype.state;
}
/**
 * @record
 */
export function GetStateResponse() { }
if (false) {
    /** @type {?|undefined} */
    GetStateResponse.prototype.channels;
}
/**
 * @record
 */
export function SetStateResponse() { }
if (false) {
    /** @type {?|undefined} */
    SetStateResponse.prototype.state;
}
/**
 * @record
 */
export function PublishResponse() { }
if (false) {
    /** @type {?} */
    PublishResponse.prototype.timetoken;
}
/**
 * @record
 */
export function PublishArguments() { }
if (false) {
    /** @type {?} */
    PublishArguments.prototype.message;
    /** @type {?|undefined} */
    PublishArguments.prototype.channel;
    /** @type {?|undefined} */
    PublishArguments.prototype.sendByPost;
    /** @type {?|undefined} */
    PublishArguments.prototype.storeInHistory;
    /** @type {?|undefined} */
    PublishArguments.prototype.meta;
}
/**
 * @record
 */
export function ProxySetup() { }
if (false) {
    /** @type {?} */
    ProxySetup.prototype.port;
    /** @type {?} */
    ProxySetup.prototype.hostname;
    /** @type {?} */
    ProxySetup.prototype.headers;
}
/**
 * @record
 */
export function PubNubSetup() { }
if (false) {
    /** @type {?|undefined} */
    PubNubSetup.prototype.publishKey;
    /** @type {?} */
    PubNubSetup.prototype.subscribeKey;
    /** @type {?|undefined} */
    PubNubSetup.prototype.cipherKey;
    /** @type {?|undefined} */
    PubNubSetup.prototype.origin;
    /** @type {?|undefined} */
    PubNubSetup.prototype.ssl;
    /** @type {?|undefined} */
    PubNubSetup.prototype.shutdown;
    /** @type {?|undefined} */
    PubNubSetup.prototype.uuid;
    /** @type {?|undefined} */
    PubNubSetup.prototype.sendBeacon;
    /** @type {?|undefined} */
    PubNubSetup.prototype.useSendBeacon;
    /** @type {?|undefined} */
    PubNubSetup.prototype.subscribeRequestTimeout;
    /** @type {?|undefined} */
    PubNubSetup.prototype.transactionalRequestTimeout;
    /** @type {?|undefined} */
    PubNubSetup.prototype.proxy;
    /** @type {?|undefined} */
    PubNubSetup.prototype.suppressLev;
    /** @type {?|undefined} */
    PubNubSetup.prototype.db;
}
/**
 * @record
 */
export function Push() { }
if (false) {
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    Push.prototype.addChannels = function (args, cb) { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    Push.prototype.removeChannels = function (args, cb) { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    Push.prototype.listChannels = function (args, cb) { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    Push.prototype.deleteDevice = function (args, cb) { };
}
/**
 * @record
 */
export function IPubNub() { }
if (false) {
    /** @type {?} */
    IPubNub.prototype.push;
    /**
     * @param {?} uuid
     * @return {?}
     */
    IPubNub.prototype.setUUID = function (uuid) { };
    /**
     * @return {?}
     */
    IPubNub.prototype.getUUID = function () { };
    /**
     * @return {?}
     */
    IPubNub.prototype.generateUUID = function () { };
    /**
     * @param {?} authKey
     * @return {?}
     */
    IPubNub.prototype.setAuthKey = function (authKey) { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    IPubNub.prototype.publish = function (args, cb) { };
    /**
     * @param {?} args
     * @return {?}
     */
    IPubNub.prototype.subscribe = function (args) { };
    /**
     * @param {?} args
     * @return {?}
     */
    IPubNub.prototype.unsubscribe = function (args) { };
    /**
     * @return {?}
     */
    IPubNub.prototype.unsubscribeAll = function () { };
    /**
     * @param {?} l
     * @return {?}
     */
    IPubNub.prototype.addListener = function (l) { };
    /**
     * @param {?} l
     * @return {?}
     */
    IPubNub.prototype.removeListener = function (l) { };
    /**
     * @return {?}
     */
    IPubNub.prototype.removeAllListeners = function () { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    IPubNub.prototype.hereNow = function (args, cb) { };
    /**
     * @param {?} args
     * @return {?}
     */
    IPubNub.prototype.hereNow = function (args) { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    IPubNub.prototype.hereNow = function (args, cb) { };
    /**
     * @param {?} args
     * @return {?}
     */
    IPubNub.prototype.hereNow = function (args) { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    IPubNub.prototype.whereNow = function (args, cb) { };
    /**
     * @param {?} args
     * @return {?}
     */
    IPubNub.prototype.whereNow = function (args) { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    IPubNub.prototype.getState = function (args, cb) { };
    /**
     * @param {?} args
     * @return {?}
     */
    IPubNub.prototype.getState = function (args) { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    IPubNub.prototype.setState = function (args, cb) { };
    /**
     * @param {?} args
     * @return {?}
     */
    IPubNub.prototype.setState = function (args) { };
    /**
     * @param {?} args
     * @param {?=} cb
     * @return {?}
     */
    IPubNub.prototype.history = function (args, cb) { };
    /**
     * @param {?} args
     * @return {?}
     */
    IPubNub.prototype.history = function (args) { };
    /**
     * @param {?} args
     * @return {?}
     */
    IPubNub.prototype.deleteMessages = function (args) { };
    /**
     * @return {?}
     */
    IPubNub.prototype.stop = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibnViLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL3B1Ym51Yi9wdWJudWIuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxpQ0FJQzs7O0lBSEMsK0JBQXlCOztJQUN6Qiw4QkFBdUI7O0lBQ3ZCLDZCQUFxQjs7O0FBR3ZCLE1BQU0sS0FBTyxvQkFBb0IsR0FBRztJQUNsQyxFQUFFLEVBQUUscUJBQXFCO0lBQ3pCLElBQUksRUFBRSx1QkFBdUI7SUFDN0IsTUFBTSxFQUFFLHlCQUF5QjtJQUNqQyxXQUFXLEVBQUUsdUJBQXVCO0lBQ3BDLFNBQVMsRUFBRSxxQkFBcUI7Q0FDakM7Ozs7QUFFRCxtQ0FjQzs7O0lBYkMsK0JBQWdCOztJQUNoQiw2QkFBYzs7SUFDZCxrQ0FBbUI7O0lBQ25CLGtDQUFtQjs7SUFDbkIsOEJBQVk7O0lBQ1osZ0NBQWlCOztJQUNqQixxQ0FBc0I7O0lBQ3RCLGtDQUFtQjs7SUFDbkIscUNBQW1COztJQUNuQiw2QkFBcUI7O0lBQ3JCLGlDQUF5Qjs7SUFDekIsOEJBQXNCOztJQUN0Qix5Q0FBMkI7Ozs7O0FBRzdCLGtDQU1DOzs7SUFMQywrQkFBYzs7SUFDZCwrQkFBaUI7O0lBQ2pCLG9DQUFzQjs7SUFDdEIsaUNBQW1COztJQUNuQixvQ0FBbUI7Ozs7O0FBR3JCLGlDQVFDOzs7SUFQQyw0QkFBZ0I7O0lBQ2hCLGlDQUFvQjs7SUFDcEIsK0JBQWtCOztJQUNsQixnQ0FBZ0I7O0lBRWhCLHVDQUFpQzs7SUFDakMsNENBQXNDOzs7OztBQUd4Qyw4QkFJQzs7Ozs7O0lBSEMsOENBQStCOzs7OztJQUMvQiwrQ0FBaUM7Ozs7O0lBQ2pDLDZDQUE2Qjs7Ozs7QUFHL0Isc0NBT0M7OztJQU5DLG1DQUFnQjs7SUFDaEIsaUNBQWU7O0lBQ2YsK0JBQWE7O0lBQ2IsNENBQTJCOztJQUMzQixtQ0FBa0I7O0lBQ2xCLGlDQUFlOzs7OztBQUdqQiw0Q0FJQzs7O0lBSEMseUNBQWdCOztJQUNoQix1Q0FBZTs7SUFDZixxQ0FBYTs7Ozs7QUFHZixpQ0FHQzs7O0lBRkMsZ0NBQW1COztJQUNuQiw0QkFBWTs7Ozs7QUFHZCxxQ0FJQzs7O0lBSEMsbUNBQThCOztJQUM5Qix5Q0FBd0I7O0lBQ3hCLHVDQUFzQjs7Ozs7QUFHeEIsb0NBR0M7OztJQUZDLGtDQUF3Qjs7SUFDeEIsdUNBQTZCOzs7OztBQUcvQixzQ0FLQzs7O0lBSkMsb0NBQXlCOztJQUN6Qix5Q0FBOEI7O0lBQzlCLHdDQUF1Qjs7SUFDdkIsd0NBQXVCOzs7OztBQVF6QixpQ0FFQzs7Ozs7QUFFRCwrQkFHQzs7O0lBRkMseUJBQWE7O0lBQ2IsMEJBQVM7Ozs7OztBQUdYLG1DQUdDOzs7SUFGQyxrQ0FBcUI7O0lBQ3JCLGtDQUFrQjs7Ozs7O0FBR3BCLHFDQU9DOzs7SUFOQyx3Q0FBdUI7O0lBQ3ZCLHlDQUF3Qjs7SUFDeEIsbUNBRUU7O0lBQ0YsZ0NBQWlCOzs7OztBQUduQix1Q0FFQzs7O0lBREMsaUNBQWM7Ozs7O0FBR2hCLHNDQUVDOzs7SUFEQyxvQ0FBd0I7Ozs7O0FBRzFCLHdDQUtDOzs7SUFKQyxzQ0FBeUI7O0lBQ3pCLDJDQUE4Qjs7SUFDOUIsMENBQXVCOztJQUN2Qix1Q0FBbUI7Ozs7O0FBR3JCLDBDQUdDOzs7SUFGQyx3Q0FBeUI7O0lBQ3pCLDZDQUE4Qjs7Ozs7QUFHaEMsdUNBSUM7OztJQUhDLHFDQUF5Qjs7SUFDekIsMENBQThCOztJQUM5QixpQ0FBYzs7Ozs7QUFHaEIsdUNBT0M7OztJQU5DLHFDQUF5Qjs7SUFDekIsMENBQThCOztJQUM5QixpQ0FBYzs7SUFDZCxrQ0FFRTs7Ozs7QUFHSixzQ0FFQzs7O0lBREMsb0NBQXVCOzs7OztBQUd6QixzQ0FFQzs7O0lBREMsaUNBQW9COzs7OztBQUt0QixxQ0FFQzs7O0lBREMsb0NBQWtCOzs7OztBQUdwQixzQ0FNQzs7O0lBTEMsbUNBQWE7O0lBQ2IsbUNBQWlCOztJQUNqQixzQ0FBcUI7O0lBQ3JCLDBDQUF5Qjs7SUFDekIsZ0NBQVc7Ozs7O0FBR2IsZ0NBTUM7OztJQUxDLDBCQUFhOztJQUNiLDhCQUFpQjs7SUFDakIsNkJBRUU7Ozs7O0FBR0osaUNBeUJDOzs7SUF4QkMsaUNBQW9COztJQUNwQixtQ0FBcUI7O0lBQ3JCLGdDQUFtQjs7SUFDbkIsNkJBQWdCOztJQUNoQiwwQkFBYzs7SUFDZCwrQkFBcUI7O0lBRXJCLDJCQUFjOztJQUVkLGlDQUFrQzs7SUFDbEMsb0NBQXdCOztJQUV4Qiw4Q0FBaUM7O0lBQ2pDLGtEQUFxQzs7SUFFckMsNEJBQW1COztJQUVuQixrQ0FBc0I7O0lBR3RCLHlCQUdFOzs7OztBQUdKLDBCQUtDOzs7Ozs7O0lBSkMscURBQXVIOzs7Ozs7SUFDdkgsd0RBQTBIOzs7Ozs7SUFDMUgsc0RBQXNJOzs7Ozs7SUFDdEksc0RBQStGOzs7OztBQUdqRyw2QkFxREM7OztJQXBEQyx1QkFBVzs7Ozs7SUFHWCxnREFBNEI7Ozs7SUFDNUIsNENBQWtCOzs7O0lBQ2xCLGlEQUF1Qjs7Ozs7SUFFdkIsc0RBQTRCOzs7Ozs7SUFFNUIsb0RBU0U7Ozs7O0lBQ0Ysa0RBQXlIOzs7OztJQUN6SCxvREFBK0U7Ozs7SUFDL0UsbURBQXVCOzs7OztJQUV2QixpREFBeUI7Ozs7O0lBQ3pCLG9EQUE0Qjs7OztJQUM1Qix1REFBcUI7Ozs7OztJQUdyQixvREFBeUs7Ozs7O0lBQ3pLLGdEQUFxSTs7Ozs7O0lBQ3JJLG9EQVFFOzs7OztJQUNGLGdEQUE0Szs7Ozs7O0lBQzVLLHFEQUFpRzs7Ozs7SUFDakcsaURBQTZEOzs7Ozs7SUFDN0QscURBQWlHOzs7OztJQUNqRyxpREFBNkQ7Ozs7OztJQUM3RCxxREFBaUc7Ozs7O0lBQ2pHLGlEQUE2RDs7Ozs7O0lBRzdELG9EQUE4Rjs7Ozs7SUFDOUYsZ0RBQTBEOzs7OztJQUMxRCx1REFBbUU7Ozs7SUFDbkUseUNBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFB1Ym51YkV2ZW50IHtcbiAgcHJlc2VuY2U/OiBQcmVzZW5jZUV2ZW50O1xuICBtZXNzYWdlPzogTWVzc2FnZUV2ZW50O1xuICBzdGF0dXM/OiBTdGF0dXNFdmVudDtcbn1cblxuZXhwb3J0IGNvbnN0IFBOX1NUQVRVU19DQVRFR09SSUVTID0ge1xuICB1cDogJ1BOTmV0d29ya1VwQ2F0ZWdvcnknLFxuICBkb3duOiAnUE5OZXR3b3JrRG93bkNhdGVnb3J5JyxcbiAgaXNzdWVzOiAnUE5OZXR3b3JrSXNzdWVzQ2F0ZWdvcnknLFxuICByZWNvbm5lY3RlZDogJ1BOUmVjb25uZWN0ZWRDYXRlZ29yeScsXG4gIGNvbm5lY3RlZDogJ1BOQ29ubmVjdGVkQ2F0ZWdvcnknXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFByZXNlbmNlRXZlbnQge1xuICBhY3Rpb24/OiBzdHJpbmc7XG4gIHV1aWQ/OiBzdHJpbmc7XG4gIHRpbWVzdGFtcD86IG51bWJlcjtcbiAgb2NjdXBhbmN5PzogbnVtYmVyO1xuICBzdGF0ZT86IGFueTtcbiAgY2hhbm5lbD86IHN0cmluZztcbiAgc3Vic2NyaXB0aW9uPzogc3RyaW5nO1xuICB0aW1ldG9rZW4/OiBudW1iZXI7XG4gIHVzZXJNZXRhZGF0YT86IGFueTtcbiAgam9pbj86IEFycmF5PHN0cmluZz47XG4gIHRpbWVkb3V0PzogQXJyYXk8c3RyaW5nPjtcbiAgbGVhdmU/OiBBcnJheTxzdHJpbmc+O1xuICBoZXJlX25vd19yZWZyZXNoPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlRXZlbnQge1xuICBtZXNzYWdlPzogYW55O1xuICBjaGFubmVsPzogc3RyaW5nO1xuICBzdWJzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHRpbWV0b2tlbj86IG51bWJlcjtcbiAgdXNlck1ldGFkYXRhPzogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXR1c0V2ZW50IHtcbiAgZXJyb3I/OiBib29sZWFuO1xuICBzdGF0dXNDb2RlPzogbnVtYmVyO1xuICBjYXRlZ29yeT86IHN0cmluZztcbiAgZXJyb3JEYXRhPzogYW55O1xuICAvLyBzZW5kIGJhY2sgY2hhbm5lbCwgY2hhbm5lbCBncm91cHMgdGhhdCB3ZXJlIGFmZmVjdGVkIGJ5IHRoaXMgb3BlcmF0aW9uXG4gIGFmZmVjdGVkQ2hhbm5lbHM/OiBBcnJheTxzdHJpbmc+O1xuICBhZmZlY3RlZENoYW5uZWxHcm91cHM/OiBBcnJheTxzdHJpbmc+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpc3RlbmVyIHtcbiAgbWVzc2FnZT8ocDogTWVzc2FnZUV2ZW50KTogYW55O1xuICBwcmVzZW5jZT8ocDogUHJlc2VuY2VFdmVudCk6IGFueTtcbiAgc3RhdHVzPyhwOiBTdGF0dXNFdmVudCk6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIaXN0b3J5QXJndW1lbnRzIHtcbiAgY2hhbm5lbDogc3RyaW5nOyAvLyBmZXRjaCBoaXN0b3J5IGZyb20gYSBjaGFubmVsXG4gIHN0YXJ0PzogbnVtYmVyOyAvLyBzdGFydCB0aW1ldG9rZW4gZm9yIGhpc3RvcnkgZmV0Y2hpbmdcbiAgZW5kPzogbnVtYmVyOyAvLyBlbmQgdGltZXRva2VuIGZvciBoaXN0b3J5IGZldGluZ1xuICBpbmNsdWRlVGltZXRva2VuPzogYm9vbGVhbjsgLy8gaW5jbHVkZSB0aW1lIHRva2VuIGZvciBlYWNoIGhpc3RvcnkgY2FsbFxuICByZXZlcnNlPzogYm9vbGVhbjtcbiAgY291bnQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVsZXRlSGlzdG9yeUFyZ3VtZW50cyB7XG4gIGNoYW5uZWw6IHN0cmluZzsgLy8gZGVsZXRlIGhpc3RvcnkgZnJvbSBhIGNoYW5uZWxcbiAgc3RhcnQ/OiBudW1iZXI7IC8vIHN0YXJ0IHRpbWV0b2tlbiBmb3IgaGlzdG9yeSBkZWxldGluZ1xuICBlbmQ/OiBudW1iZXI7IC8vIGVuZCB0aW1ldG9rZW4gZm9yIGhpc3RvcnkgZGVsZXRpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIaXN0b3J5SXRlbSB7XG4gIHRpbWV0b2tlbj86IG51bWJlcjtcbiAgZW50cnk/OiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGlzdG9yeVJlc3BvbnNlIHtcbiAgbWVzc2FnZXM/OiBBcnJheTxIaXN0b3J5SXRlbT47XG4gIHN0YXJ0VGltZVRva2VuPzogbnVtYmVyO1xuICBlbmRUaW1lVG9rZW4/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGVhdmVBcmd1bWVudHMge1xuICBjaGFubmVsczogQXJyYXk8c3RyaW5nPjtcbiAgY2hhbm5lbEdyb3VwczogQXJyYXk8c3RyaW5nPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIZXJlTm93QXJndW1lbnRzIHtcbiAgY2hhbm5lbHM/OiBBcnJheTxzdHJpbmc+O1xuICBjaGFubmVsR3JvdXBzPzogQXJyYXk8c3RyaW5nPjtcbiAgaW5jbHVkZVVVSURzPzogYm9vbGVhbjtcbiAgaW5jbHVkZVN0YXRlPzogYm9vbGVhbjtcbn1cblxuLy8gZXhwb3J0IGludGVyZmFjZSBDaGFubmVsU3RhdGUge1xuLy8gICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXI7XG4vLyB9XG5leHBvcnQgdHlwZSBDaGFubmVsU3RhdGUgPSBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2xvYmFsU3RhdGUge1xuICBbY2hhbm5lbE5hbWU6IHN0cmluZ106IENoYW5uZWxTdGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVVUlEU3RhdGU8VD4ge1xuICB1dWlkOiBzdHJpbmc7XG4gIHN0YXRlOiBUO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5uZWxTdGF0dXM8VD4ge1xuICBvY2N1cGFudHM/OiBBcnJheTxUPjtcbiAgb2NjdXBhbmN5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVyZU5vd1Jlc3BvbnNlPFQ+IHtcbiAgdG90YWxDaGFubmVscz86IG51bWJlcjtcbiAgdG90YWxPY2N1cGFuY3k/OiBudW1iZXI7XG4gIGNoYW5uZWxzPzoge1xuICAgIFtjaGFubmVsTmFtZTogc3RyaW5nXTogQ2hhbm5lbFN0YXR1czxUPjtcbiAgfTtcbiAgdXVpZHM/OiBBcnJheTxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXaGVyZU5vd0FyZ3VtZW50cyB7XG4gIHV1aWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2hlcmVOb3dSZXNwb25zZSB7XG4gIGNoYW5uZWxzOiBBcnJheTxzdHJpbmc+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1YnNjcmliZUFyZ3VtZW50cyB7XG4gIGNoYW5uZWxzPzogQXJyYXk8c3RyaW5nPjtcbiAgY2hhbm5lbEdyb3Vwcz86IEFycmF5PHN0cmluZz47XG4gIHdpdGhQcmVzZW5jZT86IGJvb2xlYW47XG4gIHRpbWV0b2tlbj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVbnN1YnNjcmliZUFyZ3VtZW50cyB7XG4gIGNoYW5uZWxzPzogQXJyYXk8c3RyaW5nPjtcbiAgY2hhbm5lbEdyb3Vwcz86IEFycmF5PHN0cmluZz47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0U3RhdGVBcmd1bWVudHMge1xuICBjaGFubmVscz86IEFycmF5PHN0cmluZz47XG4gIGNoYW5uZWxHcm91cHM/OiBBcnJheTxzdHJpbmc+O1xuICB1dWlkPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldFN0YXRlQXJndW1lbnRzIHtcbiAgY2hhbm5lbHM/OiBBcnJheTxzdHJpbmc+O1xuICBjaGFubmVsR3JvdXBzPzogQXJyYXk8c3RyaW5nPjtcbiAgdXVpZD86IHN0cmluZztcbiAgc3RhdGU/OiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldFN0YXRlUmVzcG9uc2Uge1xuICBjaGFubmVscz86IEdsb2JhbFN0YXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldFN0YXRlUmVzcG9uc2Uge1xuICBzdGF0ZT86IEdsb2JhbFN0YXRlO1xufVxuXG4vLyBwdWJsaXNoXG5cbmV4cG9ydCBpbnRlcmZhY2UgUHVibGlzaFJlc3BvbnNlIHtcbiAgdGltZXRva2VuOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHVibGlzaEFyZ3VtZW50cyB7XG4gIG1lc3NhZ2U6IGFueTsgLy8gdGhlIGNvbnRlbnRzIG9mIHRoZSBkaXNwYXRjaFxuICBjaGFubmVsPzogc3RyaW5nOyAvLyB0aGUgZGVzdGluYXRpb24gb2Ygb3VyIGRpc3BhdGNoXG4gIHNlbmRCeVBvc3Q/OiBib29sZWFuOyAvLyB1c2UgUE9TVCB3aGVuIGRpc3BhdGNoaW5nIHRoZSBtZXNzYWdlXG4gIHN0b3JlSW5IaXN0b3J5PzogYm9vbGVhbjsgLy8gc3RvcmUgdGhlIHB1Ymxpc2hlZCBtZXNzYWdlIGluIHJlbW90ZSBoaXN0b3J5XG4gIG1ldGE/OiBhbnk7IC8vIHBzdjIgc3VwcG9ydHMgZmlsdGVyaW5nIGJ5IG1ldGFkYXRhXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJveHlTZXR1cCB7XG4gIHBvcnQ6IG51bWJlcjtcbiAgaG9zdG5hbWU6IHN0cmluZztcbiAgaGVhZGVyczoge1xuICAgIFtoZWFkZXI6IHN0cmluZ106IGFueTtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQdWJOdWJTZXR1cCB7XG4gIHB1Ymxpc2hLZXk/OiBzdHJpbmc7IC8vIEFQSSBrZXkgcmVxdWlyZWQgZm9yIHB1Ymxpc2hpbmdcbiAgc3Vic2NyaWJlS2V5OiBzdHJpbmc7IC8vIEFQSSBrZXkgcmVxdWlyZWQgdG8gc3Vic2NyaWJlXG4gIGNpcGhlcktleT86IHN0cmluZzsgLy8gZGVjcnlwdGlvbiBrZXlzXG4gIG9yaWdpbj86IHN0cmluZzsgLy8gYW4gb3B0aW9uYWwgRlFETiB3aGljaCB3aWxsIHJlY2lldmUgY2FsbHMgZnJvbSB0aGUgU0RLLlxuICBzc2w/OiBib29sZWFuOyAvLyBpcyBTU0wgZW5hYmxlZD9cbiAgc2h1dGRvd24/OiAoKSA9PiBhbnk7IC8vIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBwdWJudWIgaXMgc2h1dHRpbmcgZG93bi5cblxuICB1dWlkPzogc3RyaW5nOyAvLyBPcHRpb25hbCB1dWlkIHRvIHNldCBjdXN0b20gdXVpZFxuXG4gIHNlbmRCZWFjb24/OiAodXJsOiBzdHJpbmcpID0+IGFueTsgLy8gZXhlY3V0ZXMgYSBjYWxsIGFnYWluc3QgdGhlIEJlYWNvbiBBUElcbiAgdXNlU2VuZEJlYWNvbj86IGJvb2xlYW47IC8vIGVuYWJsZSwgZGlzYWJsZSB1c2FnZSBvZiBzZW5kIGJlYWNvbnNcblxuICBzdWJzY3JpYmVSZXF1ZXN0VGltZW91dD86IG51bWJlcjsgLy8gaG93IGxvbmcgdG8gd2FpdCBmb3Igc3Vic2NyaWJlIHJlcXVzdFxuICB0cmFuc2FjdGlvbmFsUmVxdWVzdFRpbWVvdXQ/OiBudW1iZXI7IC8vIGhvdyBsb25nIHRvIHdhaXQgZm9yIHRyYW5zYWN0aW9uYWwgcmVxdWVzdHNcblxuICBwcm94eT86IFByb3h5U2V0dXA7IC8vIGNvbmZpZ3VyYXRpb24gdG8gc3VwcG9ydCBwcm94eSBzZXR0aW5ncy5cblxuICBzdXBwcmVzc0xldj86IGJvb2xlYW47XG5cbiAgLy8gZ2V0IC8gc2V0IGltcGxlbWVudGF0aW9uIHRvIHN0b3JlIGRhdGFcbiAgZGI/OiB7XG4gICAgZ2V0OiAoa2V5OiBzdHJpbmcpID0+IGFueTtcbiAgICBzZXQ6IChrZXk6IHN0cmluZywgZGF0YTogYW55KSA9PiB2b2lkO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFB1c2gge1xuICBhZGRDaGFubmVscyhhcmdzOiB7IGNoYW5uZWxzOiBBcnJheTxzdHJpbmc+OyBkZXZpY2U6IHN0cmluZzsgcHVzaEdhdGV3YXk6IHN0cmluZyB9LCBjYj86IChzdGF0dXM6IFN0YXR1c0V2ZW50KSA9PiBhbnkpO1xuICByZW1vdmVDaGFubmVscyhhcmdzOiB7IGNoYW5uZWxzOiBBcnJheTxzdHJpbmc+OyBkZXZpY2U6IHN0cmluZzsgcHVzaEdhdGV3YXk6IHN0cmluZyB9LCBjYj86IChzdGF0dXM6IFN0YXR1c0V2ZW50KSA9PiBhbnkpO1xuICBsaXN0Q2hhbm5lbHMoYXJnczogeyBkZXZpY2U6IHN0cmluZzsgcHVzaEdhdGV3YXk6IHN0cmluZyB9LCBjYj86IChzdGF0dXM6IFN0YXR1c0V2ZW50LCByZXNwb25zZTogeyBjaGFubmVsczogQXJyYXk8c3RyaW5nPiB9KSA9PiBhbnkpO1xuICBkZWxldGVEZXZpY2UoYXJnczogeyBkZXZpY2U6IHN0cmluZzsgcHVzaEdhdGV3YXk6IHN0cmluZyB9LCBjYj86IChzdGF0dXM6IFN0YXR1c0V2ZW50KSA9PiBhbnkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQdWJOdWIge1xuICBwdXNoOiBQdXNoO1xuICAvLyBuZXcoc2V0dXA6IFB1Yk51YlNldHVwKTogSVB1Yk51YjtcbiAgLy8gdXVpZFxuICBzZXRVVUlEKHV1aWQ6IHN0cmluZyk6IHZvaWQ7XG4gIGdldFVVSUQoKTogc3RyaW5nO1xuICBnZW5lcmF0ZVVVSUQoKTogc3RyaW5nO1xuICAvLyBhdXRoXG4gIHNldEF1dGhLZXkoYXV0aEtleTogc3RyaW5nKTtcbiAgLy8gcHVibGlzaC9zdWJzY3JpYmUvdW5zdWJzY3JpYmVcbiAgcHVibGlzaChcbiAgICBhcmdzOiB7XG4gICAgICBtZXNzYWdlOiBhbnk7XG4gICAgICBjaGFubmVsPzogc3RyaW5nO1xuICAgICAgc2VuZEJ5UG9zdD86IGJvb2xlYW47XG4gICAgICBzdG9yZUluSGlzdG9yeT86IGJvb2xlYW47XG4gICAgICBtZXRhPzogYW55O1xuICAgIH0sXG4gICAgY2I/OiAocjogeyB0aW1ldG9rZW46IG51bWJlciB9KSA9PiBhbnlcbiAgKTtcbiAgc3Vic2NyaWJlKGFyZ3M6IHsgY2hhbm5lbHM/OiBBcnJheTxzdHJpbmc+OyBjaGFubmVsR3JvdXBzPzogQXJyYXk8c3RyaW5nPjsgd2l0aFByZXNlbmNlPzogYm9vbGVhbjsgdGltZXRva2VuPzogbnVtYmVyIH0pO1xuICB1bnN1YnNjcmliZShhcmdzOiB7IGNoYW5uZWxzPzogQXJyYXk8c3RyaW5nPjsgY2hhbm5lbEdyb3Vwcz86IEFycmF5PHN0cmluZz4gfSk7XG4gIHVuc3Vic2NyaWJlQWxsKCk6IHZvaWQ7XG4gIC8vIGxpc3RlbmVyc1xuICBhZGRMaXN0ZW5lcihsOiBMaXN0ZW5lcik7XG4gIHJlbW92ZUxpc3RlbmVyKGw6IExpc3RlbmVyKTtcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIC8vIHByZXNlbmNlXG4gIC8vIGhlcmVOb3coYXJnczogSGVyZU5vd0FyZ3VtZW50cywgY2I/OiAoc3RhdHVzOiBTdGF0dXNFdmVudCwgcmVzcG9uc2U6IEhlcmVOb3dSZXNwb25zZSkgPT4gYW55KTtcbiAgaGVyZU5vdyhhcmdzOiB7IGNoYW5uZWxzPzogQXJyYXk8c3RyaW5nPjsgY2hhbm5lbEdyb3Vwcz86IEFycmF5PHN0cmluZz47IGluY2x1ZGVVVUlEcz86IGJvb2xlYW4gfSwgY2I/OiAoc3RhdHVzOiBTdGF0dXNFdmVudCwgcmVzcG9uc2U6IEhlcmVOb3dSZXNwb25zZTxzdHJpbmc+KSA9PiBhbnkpO1xuICBoZXJlTm93KGFyZ3M6IHsgY2hhbm5lbHM/OiBBcnJheTxzdHJpbmc+OyBjaGFubmVsR3JvdXBzPzogQXJyYXk8c3RyaW5nPjsgaW5jbHVkZVVVSURzPzogYm9vbGVhbiB9KTogUHJvbWlzZTxIZXJlTm93UmVzcG9uc2U8c3RyaW5nPj47XG4gIGhlcmVOb3coXG4gICAgYXJnczoge1xuICAgICAgY2hhbm5lbHM/OiBBcnJheTxzdHJpbmc+O1xuICAgICAgY2hhbm5lbEdyb3Vwcz86IEFycmF5PHN0cmluZz47XG4gICAgICBpbmNsdWRlVVVJRHM/OiBib29sZWFuO1xuICAgICAgaW5jbHVkZVN0YXRlOiBib29sZWFuO1xuICAgIH0sXG4gICAgY2I/OiAoc3RhdHVzOiBTdGF0dXNFdmVudCwgcmVzcG9uc2U6IEhlcmVOb3dSZXNwb25zZTxVVUlEU3RhdGU8R2xvYmFsU3RhdGU+PikgPT4gYW55XG4gICk7XG4gIGhlcmVOb3coYXJnczogeyBjaGFubmVscz86IEFycmF5PHN0cmluZz47IGNoYW5uZWxHcm91cHM/OiBBcnJheTxzdHJpbmc+OyBpbmNsdWRlVVVJRHM/OiBib29sZWFuOyBpbmNsdWRlU3RhdGU6IGJvb2xlYW4gfSk6IFByb21pc2U8SGVyZU5vd1Jlc3BvbnNlPFVVSURTdGF0ZTxHbG9iYWxTdGF0ZT4+PjtcbiAgd2hlcmVOb3coYXJnczogV2hlcmVOb3dBcmd1bWVudHMsIGNiPzogKHN0YXR1czogU3RhdHVzRXZlbnQsIHJlc3BvbnNlOiBXaGVyZU5vd1Jlc3BvbnNlKSA9PiBhbnkpO1xuICB3aGVyZU5vdyhhcmdzOiBXaGVyZU5vd0FyZ3VtZW50cyk6IFByb21pc2U8V2hlcmVOb3dSZXNwb25zZT47XG4gIGdldFN0YXRlKGFyZ3M6IEdldFN0YXRlQXJndW1lbnRzLCBjYj86IChzdGF0dXM6IFN0YXR1c0V2ZW50LCByZXNwb25zZTogR2V0U3RhdGVSZXNwb25zZSkgPT4gYW55KTtcbiAgZ2V0U3RhdGUoYXJnczogR2V0U3RhdGVBcmd1bWVudHMpOiBQcm9taXNlPEdldFN0YXRlUmVzcG9uc2U+O1xuICBzZXRTdGF0ZShhcmdzOiBTZXRTdGF0ZUFyZ3VtZW50cywgY2I/OiAoc3RhdHVzOiBTdGF0dXNFdmVudCwgcmVzcG9uc2U6IFNldFN0YXRlUmVzcG9uc2UpID0+IGFueSk7XG4gIHNldFN0YXRlKGFyZ3M6IFNldFN0YXRlQXJndW1lbnRzKTogUHJvbWlzZTxTZXRTdGF0ZVJlc3BvbnNlPjtcbiAgLy8gUEFNICYgZ3JvdXBzIG5vdCB1c2VkXG4gIC8vIGhpc3RvcnlcbiAgaGlzdG9yeShhcmdzOiBIaXN0b3J5QXJndW1lbnRzLCBjYj86IChzdGF0dXM6IFN0YXR1c0V2ZW50LCByZXNwb25zZTogSGlzdG9yeVJlc3BvbnNlKSA9PiBhbnkpO1xuICBoaXN0b3J5KGFyZ3M6IEhpc3RvcnlBcmd1bWVudHMpOiBQcm9taXNlPEhpc3RvcnlSZXNwb25zZT47XG4gIGRlbGV0ZU1lc3NhZ2VzKGFyZ3M6IERlbGV0ZUhpc3RvcnlBcmd1bWVudHMpOiBQcm9taXNlPFN0YXR1c0V2ZW50PjtcbiAgc3RvcCgpOiB2b2lkO1xufVxuIl19
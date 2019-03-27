export interface VxtUserInfo {
    /**
     * The user name.
     */
    name?: string;
    /**
     * An external ID for the user.
     * The userInfo.externalId allows you to keep
     * the same user information across different connections.
     */
    externalId?: string;
    /**
     * An avatar URL for the user.
     */
    avatarUrl?: string;
}
export interface VxtParticipant {
    id: string;
    info?: VxtUserInfo;
    stream?: MediaStream;
}
export declare interface VxtUserInfoLight {
    /**
     * The user name.
     */
    name?: string;
    /**
     * The user type (default user).
     */
    type?: 'user' | 'listener';
}

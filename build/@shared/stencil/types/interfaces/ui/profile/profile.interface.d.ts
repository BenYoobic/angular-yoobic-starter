export interface IProfileConfig {
    user: any;
    links: Array<IProfileConfigLink>;
    logoutText?: string;
    hideLogout?: () => boolean;
}
export interface IProfileConfigLink {
    title?: string;
    items: Array<IProfileConfigItem>;
}
export interface IProfileConfigItem {
    title: string;
    icon: string;
    header?: string;
    subtitle?: string;
    clickable?: boolean;
    type?: string;
    checked?: boolean;
    badge?: string;
    color?: string;
    handler: (ev?: any) => void;
    isVisible?: () => boolean;
}

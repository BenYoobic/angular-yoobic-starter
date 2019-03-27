export interface IMobileTabbarItem {
    icon?: string;
    iconActive?: string;
    text?: string;
    name?: string;
    notif?: boolean | string | number;
    handler?: () => void;
}

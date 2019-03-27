export interface INavBarTab {
    title: string;
    value: string;
    notif?: boolean | string | number;
    filterItemsFn?: (item: any) => boolean;
}

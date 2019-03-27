export interface IAlertEntry {
    header?: string;
    message?: string;
    buttons: Array<IAlertButton>;
    rename?: boolean;
    renameValue?: string;
    icon?: string;
    cssClass?: string;
    img?: string;
}
export interface IAlertButton {
    text: string;
    handler?: (ret?: any) => void;
    cssClass?: string;
    cancel?: boolean;
}

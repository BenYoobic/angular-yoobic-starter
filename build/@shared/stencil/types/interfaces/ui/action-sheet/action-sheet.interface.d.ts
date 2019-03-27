import { IButton } from '../button/button.interface';
export interface IActionSheetButton extends IButton {
    description?: string;
}
export interface IActionSheetCardHeader {
    title?: string;
    img?: string;
    cssClass?: string;
}
export interface IActionSheetFooter {
    text?: string;
    actionableText?: {
        text: string;
        handler: () => void;
    };
}
export interface IActionSheet {
    type?: string;
    heading?: string;
    cardHeader?: IActionSheetCardHeader;
    footer?: IActionSheetFooter;
    withYooCtrl?: boolean;
    buttons: IActionSheetButton[];
    cssClass?: string;
}

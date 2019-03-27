import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { OverlayInterface, OverlayEventDetail } from '../../../utils/ionic';
import { IAlertButton, IAlertEntry } from '../../../interfaces';
export declare class YooAlertComponent implements OverlayInterface, IAlertEntry {
    header: string;
    message: string;
    buttons: Array<IAlertButton>;
    rename: boolean;
    icon: string;
    cssClass: string;
    img: string;
    renameValue: string;
    willAnimate: boolean;
    keyboardClose: boolean;
    overlayId: number;
    didPresent: EventEmitter<void>;
    willPresent: EventEmitter<void>;
    willDismiss: EventEmitter<OverlayEventDetail>;
    didDismiss: EventEmitter<OverlayEventDetail>;
    host: HTMLStencilElement;
    presented: boolean;
    animation?: Animation;
    private usersElement?;
    protected lifecycle(modalEvent: CustomEvent): void;
    present(): Promise<void>;
    dismiss(data?: any, role?: string, overlayDismiss?: boolean): Promise<void>;
    onDidDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    onWillDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    closeAlert(overlayDismiss?: boolean): void;
    onButtonClick(button: IAlertButton): void;
    renderButtons(): JSX.Element;
    renderRename(): JSX.Element;
    renderHeader(): JSX.Element;
    hostData(): {
        class: {
            [x: string]: string;
        };
    };
    render(): JSX.Element;
}

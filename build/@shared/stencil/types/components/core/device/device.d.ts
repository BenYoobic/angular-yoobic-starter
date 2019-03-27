import '../../../stencil.core';
import { IDeviceEntry } from '../../../interfaces';
export declare class YooDeviceComponent {
    /**
     * The device type to display, some devices may not have color options
     */
    deviceEntry: IDeviceEntry;
    host: HTMLStencilElement;
    componentWilLoad(): void;
    getColor(): string;
    renderIOS(): JSX.Element;
    renderIOSMobile(): JSX.Element;
    renderIphoneX(): JSX.Element;
    renderNote8TopBar(): JSX.Element;
    renderSensorSpeaker(): JSX.Element;
    renderAndroid(): JSX.Element;
    render(): JSX.Element;
}

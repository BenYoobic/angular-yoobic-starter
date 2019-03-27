import { IDeviceColor } from '../color/color.interface';
export declare const DEVICE_LIST: Array<IDevice>;
export interface IDevice {
    device: string;
    displayTitle: string;
    isIOSMobile: boolean;
    colors?: Array<IDeviceColor>;
}
export interface IDeviceEntry extends IDevice {
    selectedColor?: IDeviceColor;
}

export declare function getPictureMaxSize(isImageRecognition: boolean, maxWidth?: number): number;
export declare function getPicture(quality: any, sourceType: any, mediaType: any, isMultiMode?: boolean, maxWidth?: number, isImageRecognition?: boolean, limit?: number): Promise<any>;
export declare function cleanupCamera(): Promise<any>;
export declare function getVideoDevices(): Promise<{
    _id: string;
    deviceId: string;
    label: string;
    kind: MediaDeviceKind;
}[]>;

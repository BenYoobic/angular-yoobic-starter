import { Camera, DestinationType, EncodingType } from '@ionic-native/camera';
import { isIonic, isCordova, isIOS } from '../config';
import { Device } from '@ionic-native/device';
import { getSession } from './common-helpers';
import { MediaCapture } from '@ionic-native/media-capture';
export function getPictureMaxSize(isImageRecognition, maxWidth) {
    let maxSizeSmall = 1280;
    let maxSize = 2048;
    if (getSession().user && getSession().user.photoMaxWidth > 0) {
        return getSession().user.photoMaxWidth;
    }
    if (isIonic() && isCordova()) {
        if (Device.model === 'MC40N0' || Device.model === 'ET1' || Device.model === 'SM-T580' || Device.platform === 'blackberry10' || Device.model === 'SM-A310F' || Device.model === 'SM-A510F' || Device.model === 'SM-J320FN') {
            return maxSizeSmall;
        }
    }
    if (isImageRecognition) {
        return maxSize;
    }
    return maxWidth || maxSize;
}
export function getPicture(quality, sourceType, mediaType, isMultiMode = false, maxWidth = 0, isImageRecognition = false, limit = 1) {
    if (isMultiMode) {
        let imageOptions = { limit: limit };
        return MediaCapture.captureImage(imageOptions);
    }
    else {
        let allowEdit = !isIOS() && getSession().user && getSession().user.allowPhotoEdit;
        // default configuration
        let config = {};
        config.destinationType = DestinationType.FILE_URL;
        config.correctOrientation = isIOS() ? false : true;
        config.encodingType = EncodingType.JPEG;
        config.saveToPhotoAlbum = getSession().user && getSession().user.deletePhotos ? false : true;
        config.quality = quality;
        config.sourceType = sourceType;
        config.mediaType = mediaType;
        config.allowEdit = allowEdit;
        config.targetWidth = getPictureMaxSize(isImageRecognition, maxWidth);
        config.targetHeight = allowEdit ? Math.round(getPictureMaxSize(isImageRecognition, maxWidth) * (window.innerHeight / window.innerWidth)) : getPictureMaxSize(isImageRecognition, maxWidth);
        return Camera.getPicture(config);
    }
}
export function cleanupCamera() {
    if (Camera.cleanup && isIOS()) {
        return Camera.cleanup();
    }
}
export async function getVideoDevices() {
    if (navigator && navigator.mediaDevices) {
        let devices = await navigator.mediaDevices.enumerateDevices();
        return devices
            .filter(d => d.kind === 'videoinput')
            .map((d, i) => ({
            _id: d.deviceId,
            deviceId: d.deviceId,
            label: d.label || 'webcam ' + i,
            kind: d.kind
        }));
    }
    return;
}

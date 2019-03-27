import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { isCordova } from '../config';
import { download } from './download.js';
import { showToast } from '../helpers';
import { translate } from '../translate';
export const videos = ['mp4', 'avi', 'mov', 'm4v', '3gp', '3gpp'];
export const audios = ['mp3', 'wav', 'm4a'];
export const images = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'];
export const documents = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'csv', 'txt'];
export function getExtension(file) {
    if (file) {
        let url = file._filename || file._downloadURL || file.name || file;
        if (url && url.split) {
            return url
                .split('.')
                .pop()
                .toLowerCase();
        }
    }
    return '';
}
export function isImage(file) {
    let extension = getExtension(file);
    return images.indexOf(extension) >= 0;
}
export function isVideo(file) {
    let extension = getExtension(file);
    return videos.indexOf(extension) >= 0;
}
export function isAudio(file) {
    let extension = getExtension(file);
    return audios.indexOf(extension) >= 0;
}
export function isDocument(file) {
    let extension = getExtension(file);
    return documents.indexOf(extension) >= 0;
}
export function getType(file) {
    if (isImage(file)) {
        return 'image';
    }
    else if (isDocument(file)) {
        return 'document';
    }
    else if (isVideo(file)) {
        return 'video';
    }
    else if (isAudio(file)) {
        return 'audio';
    }
    return 'unknown';
}
export function downloadFile(url, fileName) {
    if (!fileName) {
        let name = url.split('/');
        fileName = name[name.length - 1];
    }
    if (isCordova()) {
        downloadFileMobile(url, fileName);
    }
    else {
        downloadFileWeb(url, fileName);
    }
}
export function downloadFileMobile(url, fileName) {
    let saver = () => {
        if (isImage(url)) {
            return PhotoLibrary.saveImage(url, 'YOOBIC');
        }
        else if (isVideo(url)) {
            const fileTransfer = FileTransfer.create();
            url = url.substr(0, url.lastIndexOf('.')) + '.mp4';
            return fileTransfer.download(url, File.dataDirectory + fileName).then(entry => {
                return PhotoLibrary.saveVideo(entry.toURL(), 'YOOBIC');
            });
        }
    };
    return PhotoLibrary.requestAuthorization({ read: true, write: true }).then(() => {
        return saver()
            .then(() => showToast({
            message: translate('DOWNLOADSUCCESS'),
            duration: 2000,
            showCloseButton: true
        }))
            .catch(() => showToast({
            message: translate('DOWNLOADFAILED'),
            duration: 2000,
            showCloseButton: true
        }));
    });
}
export function downloadFileWeb(url, fileName) {
    let oReq = new XMLHttpRequest();
    oReq.open('GET', url, true);
    oReq.responseType = 'blob';
    oReq.onreadystatechange = function () {
        if (oReq.readyState === 4) {
            showToast({
                message: translate('DOWNLOADSUCCESS'),
                duration: 2000,
                icon: 'yo-icon success'
            });
        }
    };
    oReq.onload = function (oEvent) {
        return download(oReq.response, fileName);
    };
    oReq.send(null);
}

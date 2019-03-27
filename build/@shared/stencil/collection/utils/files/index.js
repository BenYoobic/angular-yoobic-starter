export * from './document';
import { isIOS, isCordova, isSamsung } from '../config';
import { ExifRestorer } from './exif-restorer';
import { isImage, isVideo, isAudio, getExtension } from './document';
import { File as FileNative } from '@ionic-native/file';
import { Device } from '@ionic-native/device';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { Cloudinary, isFile, showToast } from '../helpers/common-helpers';
import uuid from 'js-uuid';
import { clone } from 'lodash-es';
import { translate } from '../translate';
const exifRestorer = new ExifRestorer();
export function getUUID() {
    return uuid.v4();
}
export function isBase64(file) {
    let retVal = file && file.indexOf && file.indexOf('data:') === 0 && file !== 'data:,';
    return retVal;
}
export function isFileUri(file) {
    let retVal;
    if (isIOS()) {
        retVal = file && file.indexOf && (file.indexOf('file:') === 0 || file.indexOf('/var/mobile') === 0);
    }
    else {
        retVal = file && file.indexOf && file.indexOf('file:') === 0;
    }
    return retVal;
}
export function isImageFile(file) {
    return isFile(file) || isBase64(file) || isFileUri(file);
}
export function read(nativeFile, type = 'blob', encoding) {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            resolve(e.target.result);
        };
        fileReader.onerror = e => reject(e);
        if (type === 'blob') {
            fileReader.readAsDataURL(nativeFile);
        }
        else if (type === 'binary') {
            fileReader.readAsBinaryString(nativeFile);
        }
        else {
            fileReader.readAsText(nativeFile, encoding);
        }
    });
}
export function changeExtension(filename, extension) {
    let split = filename.split('.');
    split[split.length - 1] = extension;
    return split.reduce((a, b) => a + '.' + b);
}
export function toPng(value) {
    if (value) {
        return value.substr(0, value.lastIndexOf('.')) + '.png';
    }
    return '';
}
export function getMaxSize(extension) {
    return 100000000;
}
export function isValid(file) {
    let extension = getExtension(file);
    if (file.size < getMaxSize(extension)) {
        return true;
    }
    return false;
}
export function getMimeType(file) {
    let extension = getExtension(file);
    switch (extension) {
        case 'pdf':
            return 'application/pdf';
        case 'xls':
            return 'application/vnd.ms-excel';
        case 'xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        case 'csv':
            return 'text/csv';
        case 'ppt':
            return 'application/vnd.ms-powerpoint';
        case 'pptx':
            return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        case 'doc':
            return 'application/msword';
        case 'docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        case 'png':
            return 'image/png';
        case 'jpeg':
        case 'jpg':
            return 'image/jpeg';
        case 'gif':
            return 'image/gif';
        case 'bmp':
            return 'image/bmp';
        case 'mp4':
        case 'm4v':
            return 'video/mp4';
        case '3gp':
        case '3gpp':
            return 'video/3gpp';
        case 'mov':
            return 'video/mp4';
        case 'mpg':
            return 'video/mpg';
        case 'avi':
            return 'video/avi';
        case 'mp3':
            return 'audio/mpeg';
        case 'wav':
            return 'audio/wav';
        default:
            return 'image/jpeg';
    }
}
export function fileHasIcon(file) {
    if (isImage(file) || isVideo(file)) {
        return false;
    }
    return true;
}
export function getIcon(file) {
    let extension = getExtension(file);
    switch (extension) {
        case 'pdf':
            return 'yo-file-pdf danger';
        case 'xls':
        case 'xlsx':
        case 'csv':
            return 'yo-file-excel success';
        case 'ppt':
        case 'pptx':
            return 'yo-file-powerpoint warning';
        case 'doc':
        case 'docx':
            return 'yo-file-word accent';
        default:
            if (isImage(file)) {
                return 'yo-image royal';
            }
            if (isVideo(file)) {
                return 'yo-svg-play';
            }
            if (isAudio(file)) {
                return 'yo-play';
            }
            return 'yo-attach-file';
    }
}
export function getVideoPoster(value) {
    if (isVideo(value)) {
        value = value.substr(0, value.lastIndexOf('.')) + '.png';
    }
    return value;
}
export function b64toBlob(b64Data, contentType = null, sliceSize = 512) {
    if (!contentType) {
        contentType = getBase64MimeType(b64Data);
    }
    b64Data = b64Data.replace('data:' + contentType + ';base64,', '').replace(/\s/g, '');
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
export function blobToFile(blob) {
    if (blob) {
        blob.lastModifiedDate = new Date();
        blob.name = getUUID() + '.jpg';
    }
    return blob;
}
export function b64ToFile(data, file) {
    let blob = b64toBlob(data);
    blob.lastModifiedDate = new Date();
    blob.name = file.name;
    return blob;
}
export function saveBase64AsImageFile(data) {
    let newName = Math.random()
        .toString(36)
        .substr(2) + getBase64Extension(data);
    let dataBlob = b64toBlob(data);
    return getNativeDirectory('images').then((directory) => {
        return fileNativeWriteFile(directory.nativeURL, newName, dataBlob, { replace: true });
    }, err => { });
}
export function resizeBase64Image(base64, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let ratio = 1;
            if (img.width > maxWidth || img.height > maxHeight) {
                ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                img.width *= ratio;
                img.height *= ratio;
            }
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            let data = canvas.toDataURL('image/jpeg', 0.7);
            data = exifRestorer.restore(base64, data);
            canvas = null;
            resolve(data);
        };
        img.src = base64;
    });
}
export function rotateBase64Image(base64data, degrees, enableURI, useFile = false) {
    return new Promise(function (resolve, reject) {
        //assume 90 degrees if not provided
        degrees = degrees || degrees === 0 ? degrees : 90;
        let canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'hidden-canvas');
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        let image = new Image();
        //assume png if not provided
        if (useFile) {
            image.src = new Cloudinary(base64data).getUrl();
        }
        else {
            image.src = (base64data.indexOf(',') === -1 ? 'data:image/png;base64,' : '') + base64data;
        }
        image.onload = function () {
            let w = image.width;
            let h = image.height;
            let rads = (degrees * Math.PI) / 180;
            let c = Math.cos(rads);
            let s = Math.sin(rads);
            if (s < 0) {
                s = -s;
            }
            if (c < 0) {
                c = -c;
            }
            //use translated width and height for new canvas
            canvas.width = h * s + w * c;
            canvas.height = h * c + w * s;
            //draw the rect in the center of the newly sized canvas
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((degrees * Math.PI) / 180);
            ctx.drawImage(image, -image.width / 2, -image.height / 2);
            //assume plain base64 if not provided
            resolve(enableURI ? canvas.toDataURL() : canvas.toDataURL().split(',')[1]);
            document.body.removeChild(canvas);
        };
        image.onerror = function () {
            reject('Unable to rotate data\n' + image.src);
        };
    });
}
export function getBase64MimeType(base64) {
    return base64.split(';')[0].replace('data:', '');
}
export function getBase64Extension(base64) {
    let mimeType = getBase64MimeType(base64);
    switch (mimeType) {
        case 'image/png':
            return '.png';
        case 'image/jpeg':
        case 'image/jpg':
            return '.jpg';
        default:
            return '.' + mimeType.split('/')[1];
    }
}
export function resizeImage(file, maxWidth, maxHeight) {
    if (!maxWidth || !maxHeight) {
        return Promise.resolve(file);
    }
    return read(file)
        .then((base64) => {
        return resizeBase64Image(base64, maxWidth, maxHeight);
    })
        .then((data) => {
        let f = b64ToFile(data, file);
        return f;
    });
}
export function getNativeDirectory(subfolder) {
    if (isCordova()) {
        return FileNative.resolveDirectoryUrl(FileNative.dataDirectory).then(dataDirectory => {
            return FileNative.getDirectory(dataDirectory, subfolder, { create: true });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, fileSys => {
                fileSys.root.getDirectory(subfolder, {
                    create: true
                }, directory => {
                    resolve(directory);
                });
            });
        });
    }
}
export function updatePathSessionId(oldPath) {
    if (!oldPath) {
        return Promise.resolve(oldPath);
    }
    return resolveFilePath(oldPath).then(res => {
        return Promise.resolve(res.nativeURL);
    });
}
export function urlToFileBlob(filePath) {
    let newPath = filePath;
    if (filePath && filePath.startsWith('_file_')) {
        newPath = `${window.WEBVIEW_SERVER_URL}/${newPath}`;
    }
    return fetch(newPath).then(res => {
        if (res && res.blob) {
            return res.blob();
        }
        else {
            return null;
        }
    });
}
export function resolveFilePath(filePath) {
    if (isCordova()) {
        if (filePath.indexOf('/var/mobile') === 0) {
            filePath = 'file://' + filePath;
        }
        return FileNative.resolveLocalFilesystemUrl(filePath)
            .then((fileEntry) => {
            return fileEntry;
        })
            .catch(err => {
            let fileError = err && err.message ? err.message : 'File Error';
            // For IOS, if the app is updated, the original file path won't be found because the image directory url is changed.
            // Therefore, we need to change the incorrect directory url part in the original file path to retrieve the file successfully.
            if (isIOS() && fileError === 'NOT_FOUND_ERR') {
                return getNativeDirectory('images').then((directory) => {
                    let pathPartials = filePath.split('/');
                    let directoryPartials = directory.nativeURL.split('/');
                    // directoryPartials[8] is the changed part
                    filePath = filePath.replace(pathPartials[8], directoryPartials[8]);
                    return FileNative.resolveLocalFilesystemUrl(filePath).then((fileEntry) => {
                        return fileEntry;
                    }, () => {
                        return Promise.reject(fileError);
                    });
                }, () => {
                    return Promise.reject(fileError);
                });
            }
            return Promise.reject(fileError);
        });
    }
    else {
        return new Promise((resolve, reject) => {
            window.resolveLocalFileSystemURL(filePath, fileEntry => resolve(fileEntry), err => reject(err));
        });
    }
}
export function fixImageOrientation(path, fileName) {
    return FileNative.readAsArrayBuffer(path, fileName).then(arrayBuffer => {
        let view;
        try {
            view = new DataView(arrayBuffer);
        }
        catch (error) {
            return Promise.reject(error);
        }
        if (view.getUint16(0, false) !== 0xffd8) {
            return view;
        }
        let length = view.byteLength, offset = 2;
        while (offset < length) {
            let marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xffe1) {
                if (view.getUint32((offset += 2), false) !== 0x45786966) {
                    return view;
                }
                let little = view.getUint16((offset += 6), false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                let tags = view.getUint16(offset, little);
                offset += 2;
                for (let i = 0; i < tags; i++) {
                    if (view.getUint16(offset + i * 12, little) === 0x0112) {
                        let orientation = view.getUint16(offset + i * 12 + 8, little);
                        if (orientation !== 0) {
                            view.setUint16(offset + i * 12 + 8, 0);
                        }
                        return view;
                    }
                }
            }
            else if ((marker & 0xff00) !== 0xff00) {
                break;
            }
            else {
                offset += view.getUint16(offset, false);
            }
        }
        return view;
    });
}
//should only be called in cordova
export function moveToImageDirectory(originalFilePath, disableOrientationFix = false, fileName = '') {
    if (!isCordova()) {
        return Promise.resolve(originalFilePath);
    }
    else {
        return FileNative.resolveLocalFilesystemUrl(originalFilePath).then((fileEntry) => {
            // For samsung device image, modify the image exif before saving to the new path
            let pathPartials = originalFilePath.split('/');
            pathPartials.pop();
            let fileDirPath = pathPartials.join('/');
            let newName;
            try {
                newName = getUUID() + (fileName || '') + '.' + getExtension(originalFilePath);
            }
            catch (err) {
                newName =
                    Math.random()
                        .toString(36)
                        .substr(2) +
                        (fileName || '') +
                        '.' +
                        getExtension(originalFilePath);
            }
            if (disableOrientationFix !== true && isCordova() && isSamsung()) {
                return promiseTimeout(5000, fixImageOrientation(fileDirPath, fileEntry.name)).then(fixedDataView => {
                    return getNativeDirectory('images').then((directory) => {
                        let blob = new Blob([fixedDataView], { type: 'octet/stream' });
                        return fileNativeWriteFile(directory.nativeURL, newName, blob, { replace: true });
                    }, err => {
                        return originalFilePath;
                    });
                }, err => {
                    return moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath);
                });
            }
            else {
                return moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath);
            }
        });
    }
}
export function moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath) {
    return getNativeDirectory('images').then((directory) => {
        return FileNative.copyFile(fileDirPath, fileEntry.name, directory.nativeURL, newName).then(newFileEntry => {
            return newFileEntry.nativeURL;
        });
    }, err => {
        return originalFilePath;
    });
}
export function fileNativeWriteFile(path, fileName, text, options) {
    return FileNative.writeFile(path, fileName, text, options).then((fileEntry) => {
        return fileEntry.nativeURL;
    }, err => { });
}
export function fileNativeCheckFile(path, fileName) {
    return FileNative.checkFile(path, fileName).then(fileExists => {
        return true;
    }, err => {
        return false;
    });
}
export function fixAbsolutePath(data) {
    if (isCordova() && Device.platform === 'iOS') {
        if (data && data.indexOf('file://') >= 0) {
            let path = data;
            let indexApp = path.indexOf('/Application/');
            let indexLibrary = path.indexOf('/Library/');
            if (indexApp > 0 && indexLibrary > 0) {
                return getNativeDirectory('images').then((directory) => {
                    let directoryPath = directory.nativeURL;
                    let indexAppDirectory = directoryPath.indexOf('/Application/');
                    let indexLibraryDirectory = directoryPath.indexOf('/Library/');
                    let UUID = directoryPath.substring(indexAppDirectory + 13, indexLibraryDirectory);
                    data = path.substring(0, indexApp) + '/Application/' + UUID + path.substring(indexLibrary);
                    return data;
                }, err => {
                    return data;
                });
            }
            else {
                return Promise.resolve(data);
            }
        }
        else {
            return Promise.resolve(data);
        }
    }
    else {
        return Promise.resolve(data);
    }
}
export function getCloudinaryUrl(retVal) {
    if (!retVal || !retVal.cloudinary) {
        return null;
    }
    return retVal.cloudinary.eager && retVal.cloudinary.eager.length > 0 ? retVal.cloudinary.eager[0].secure_url || retVal.cloudinary.eager[0].url : retVal.cloudinary.secure_url || retVal.cloudinary.url;
}
export function getLocalFilePath() {
    let path = '';
    if (isIOS()) {
        path = window.cordova.file.documentsDirectory;
    }
    else {
        path = window.cordova.file.externalDataDirectory;
    }
    return path;
}
export function getLocalFileName(fileName) {
    let newfileName = cleanFileName(fileName);
    newfileName = newfileName.toLowerCase().replace(/[^a-zA-Z0-9.]+/g, '_');
    return newfileName;
}
export function saveToLocalFile(blob, fileName) {
    let path = getLocalFilePath();
    fileName = getLocalFileName(fileName);
    let promise = FileNative.writeFile(path, fileName, blob, {
        append: false,
        replace: true
    });
    // log.log(path);
    // log.log(fileName);
    return promise;
}
export function downloadPdfToStorage(document) {
    let target = getLocalFilePath() + document._id + '.pdf';
    return downloadFileToDevice(document._downloadURL, target).then((fileEntry) => {
        let filepath = fileEntry.nativeURL;
        showToast({
            message: translate('DOWNLOADSUCCESS'),
            duration: 2000,
            showCloseButton: true
        });
        return filepath;
    });
}
export function getUrlWithAnnotations(src, photo) {
    let value = clone(src);
    if (photo && photo.edit && photo.edit.indexOf('cloudinary') > 0) {
        let i = photo.edit.lastIndexOf('/');
        let j = photo.edit.lastIndexOf('.');
        let publicId = photo.edit.substr(i + 1, j - i - 1);
        let k = value.indexOf('upload/') + 7;
        value = value.slice(0, k) + 'l_' + publicId + ',w_1.0,h_1.0,fl_relative,c_fill' + value.slice(k - 1);
    }
    else if (photo && photo.edit && photo.edit.indexOf('storage.googleapis.com') > 0) {
        value = photo.edit;
    }
    return value;
}
export function cleanFileName(fileName) {
    if (fileName && fileName.normalize) {
        fileName = fileName.normalize('NFD');
    }
    if (fileName && fileName.replace) {
        fileName = fileName.replace(/[\u0300-\u036f]/g, '');
    }
    return fileName || 'EMPTY';
}
export function showPdfOnDevice(filePath, fileName = null) {
    return new Promise((resolve, reject) => {
        const onClose = res => {
            resolve(null);
        };
        const options = {
            title: fileName || 'PDF',
            autoClose: { onPause: true }
        };
        const onError = err => { }; //console.log('error in process can view', err);
        const onMissingApp = (appId, installer) => {
            if (confirm(translate('ANDROIDPDFCONFIRM'))) {
                installer();
            }
        };
        const onShow = () => { };
        DocumentViewer.viewDocument(filePath, 'application/pdf', options, onShow, onClose, onMissingApp, onError);
    });
}
export function downloadFileToDevice(source, target) {
    let fileTransfer = FileTransfer.create();
    return fileTransfer.download(source, target);
}
export function openBlob(blob, fileName, mimeType) {
    return saveToLocalFile(blob, fileName)
        .then((file) => {
        afterOpenBlob(file.nativeURL, mimeType);
    }, err => {
        this.log.error(err);
    })
        .catch(err => {
        this.log.error(err);
    });
}
export function afterOpenBlob(filePath, mimeType) {
    return FileOpener.open(filePath, mimeType).then(() => { }, err => {
        this.log.error(err);
    });
}
function promiseTimeout(ms, promise) {
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in ' + ms + 'ms.');
        }, ms);
    });
    // Returns a race between our timeout and the passed in promise
    return Promise.race([promise, timeout]);
}

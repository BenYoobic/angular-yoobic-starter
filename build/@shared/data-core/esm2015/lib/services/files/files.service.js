/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig, Log } from '@shared/common';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { map } from 'rxjs/operators';
import { isFile as _isFile, isBase64 as _isBase64, isFileUri as _isFileUri, isImageFile as _isImageFile, read as _read, getExtension as _getExtension, changeExtension as _changeExtension, getMaxSize as _getMaxSize, toPng as _toPng, isValid as _isValid, isImage as _isImage, isVideo as _isVideo, isAudio as _isAudio, isDocument as _isDocument, getType as _getType, getMimeType as _getMimeType, getIcon as _getIcon, getVideoPoster as _getVideoPoster, b64toBlob as _b64toBlob, blobToFile as _blobToFile, b64ToFile as _b64ToFile, saveBase64AsImageFile as _saveBase64AsImageFile, resizeBase64Image as _resizeBase64Image, getBase64MimeType as _getBase64MimeType, getBase64Extension as _getBase64Extension, resizeImage as _resizeImage, getNativeDirectory as _getNativeDirectory, resolveFilePath as _resolveFilePath, fixImageOrientation as _fixImageOrientation, moveToImageDirectory as _moveToImageDirectory, moveToImageDirectoryBase as _moveToImageDirectoryBase, fileNativeWriteFile as _fileNativeWriteFile, fileNativeCheckFile as _fileNativeCheckFile, fixAbsolutePath as _fixAbsolutePath, getCloudinaryUrl as _getCloudinaryUrl, getLocalFilePath as _getLocalFilePath, getLocalFileName as _getLocalFileName, saveToLocalFile as _saveToLocalFile, cleanFileName as _cleanFileName, getUrlWithAnnotations as _getUrlWithAnnotations, showPdfOnDevice as _showPdfOnDevice, downloadFileToDevice as _downloadFileToDevice, openBlob as _openBlob, afterOpenBlob as _afterOpenBlob } from '@shared/stencil';
export class Files {
    /**
     * @param {?} rq
     * @param {?} coreConfig
     * @param {?} log
     * @param {?} config
     */
    constructor(rq, coreConfig, log, config) {
        this.rq = rq;
        this.coreConfig = coreConfig;
        this.log = log;
        this.config = config;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isFile(file) {
        return _isFile(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isBase64(file) {
        return _isBase64(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isFileUri(file) {
        return _isFileUri(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isImageFile(file) {
        return _isImageFile(file);
    }
    /**
     * @param {?} nativeFile
     * @param {?=} type
     * @param {?=} encoding
     * @return {?}
     */
    read(nativeFile, type = 'blob', encoding) {
        return _read((/** @type {?} */ (nativeFile)), type, encoding);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getExtension(file) {
        return _getExtension(file);
    }
    /**
     * @param {?} filename
     * @param {?} extension
     * @return {?}
     */
    changeExtension(filename, extension) {
        return _changeExtension(filename, extension);
    }
    /**
     * @param {?} extension
     * @return {?}
     */
    getMaxSize(extension) {
        return _getMaxSize(extension);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toPng(value) {
        return _toPng(value);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isValid(file) {
        return _isValid((/** @type {?} */ (file)));
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isImage(file) {
        return _isImage(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isVideo(file) {
        return _isVideo(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isAudio(file) {
        return _isAudio(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isDocument(file) {
        return _isDocument(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getType(file) {
        return _getType(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getMimeType(file) {
        return _getMimeType(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getIcon(file) {
        return _getIcon(file);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getVideoPoster(value) {
        return _getVideoPoster(value);
    }
    /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    b64toBlob(b64Data, contentType = null, sliceSize = 512) {
        return _b64toBlob(b64Data, contentType, sliceSize);
    }
    /**
     * @param {?} blob
     * @return {?}
     */
    blobToFile(blob) {
        return _blobToFile(blob);
    }
    /**
     * @param {?} data
     * @param {?} file
     * @return {?}
     */
    b64ToFile(data, file) {
        return _b64ToFile(data, (/** @type {?} */ (file)));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    saveBase64AsImageFile(data) {
        return _saveBase64AsImageFile(data);
    }
    /**
     * @param {?} base64
     * @param {?} maxWidth
     * @param {?} maxHeight
     * @return {?}
     */
    resizeBase64Image(base64, maxWidth, maxHeight) {
        return _resizeBase64Image(base64, maxWidth, maxHeight);
    }
    /**
     * @param {?} base64
     * @return {?}
     */
    getBase64MimeType(base64) {
        return _getBase64MimeType(base64);
    }
    /**
     * @param {?} base64
     * @return {?}
     */
    getBase64Extension(base64) {
        return _getBase64Extension(base64);
    }
    /**
     * @param {?} file
     * @param {?} maxWidth
     * @param {?} maxHeight
     * @return {?}
     */
    resizeImage(file, maxWidth, maxHeight) {
        return _resizeImage((/** @type {?} */ (file)), maxWidth, maxHeight);
    }
    /**
     * @param {?} subfolder
     * @return {?}
     */
    getNativeDirectory(subfolder) {
        return _getNativeDirectory(subfolder);
    }
    /**
     * @param {?} filePath
     * @return {?}
     */
    resolveFilePath(filePath) {
        return _resolveFilePath(filePath);
    }
    /**
     * @param {?} path
     * @param {?} fileName
     * @return {?}
     */
    fixImageOrientation(path, fileName) {
        return _fixImageOrientation(path, fileName);
    }
    //should only be called in cordova
    /**
     * @param {?} originalFilePath
     * @param {?=} disableOrientationFix
     * @return {?}
     */
    moveToImageDirectory(originalFilePath, disableOrientationFix = false) {
        return _moveToImageDirectory(originalFilePath, disableOrientationFix);
    }
    /**
     * @param {?} fileDirPath
     * @param {?} fileEntry
     * @param {?} newName
     * @param {?} originalFilePath
     * @return {?}
     */
    moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath) {
        return _moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath);
    }
    /**
     * @param {?} path
     * @param {?} fileName
     * @param {?} text
     * @param {?} options
     * @return {?}
     */
    fileNativeWriteFile(path, fileName, text, options) {
        return _fileNativeWriteFile(path, fileName, text, options);
    }
    /**
     * @param {?} path
     * @param {?} fileName
     * @return {?}
     */
    fileNativeCheckFile(path, fileName) {
        return _fileNativeCheckFile(path, fileName);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    fixAbsolutePath(data) {
        return _fixAbsolutePath(data);
    }
    /**
     * @param {?} retVal
     * @return {?}
     */
    getCloudinaryUrl(retVal) {
        return _getCloudinaryUrl(retVal);
    }
    /**
     * @param {?} filename
     * @param {?} mediaType
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    downloadFile(filename, mediaType, url, options) {
        return this.rq.downloadFile(filename, mediaType, url, options);
    }
    /**
     * @return {?}
     */
    getLocalFilePath() {
        return _getLocalFilePath();
    }
    /**
     * @param {?} fileName
     * @return {?}
     */
    getLocalFileName(fileName) {
        return _getLocalFileName(fileName);
    }
    /**
     * @param {?} blob
     * @param {?} fileName
     * @return {?}
     */
    saveToLocalFile(blob, fileName) {
        return _saveToLocalFile(blob, fileName);
    }
    /**
     * @param {?} src
     * @param {?=} photo
     * @return {?}
     */
    getUrlWithAnnotations(src, photo) {
        return _getUrlWithAnnotations(src, photo);
    }
    /**
     * @param {?} fileName
     * @return {?}
     */
    cleanFileName(fileName) {
        return _cleanFileName(fileName);
    }
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    downloadFileToDevice(source, target) {
        return _downloadFileToDevice(source, target);
    }
    /**
     * @param {?} filePath
     * @param {?=} fileName
     * @return {?}
     */
    showPdfOnDevice(filePath, fileName = null) {
        return _showPdfOnDevice(filePath, fileName);
    }
    /**
     * @param {?} photoUrl
     * @return {?}
     */
    uploadProxy(photoUrl) {
        /** @type {?} */
        let url = this.config.uploadProxyUrl;
        return this.rq.post(url, { url: photoUrl }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            return this.getCloudinaryUrl({ cloudinary: retVal });
        })));
    }
    /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    exportToFile(content, type, encoding, filename) {
        encoding = encoding || 'charset=ISO-8859-1';
        filename = filename || 'data.csv';
        type = type || 'data:application/csv;charset=ISO-8859-1;';
        if (encoding === 'base64') {
            content = this.b64toBlob(content, type);
        }
        /** @type {?} */
        let blob = new Blob([content], {
            type: type
        });
        return this.rq.saveBlob(blob, filename);
    }
    /**
     * @param {?} blob
     * @param {?} fileName
     * @param {?} mimeType
     * @return {?}
     */
    openBlob(blob, fileName, mimeType) {
        return _openBlob(blob, fileName, mimeType);
    }
    /**
     * @param {?} filePath
     * @param {?} mimeType
     * @return {?}
     */
    afterOpenBlob(filePath, mimeType) {
        return _afterOpenBlob(filePath, mimeType);
    }
    /**
     * @return {?}
     */
    _requestExternalStoragePermission() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (this.coreConfig.isAndroid() && this.coreConfig.isCordova()) {
                /** @type {?} */
                let permissions = ((/** @type {?} */ (window.cordova.plugins))).permissions;
                permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, (/**
                 * @param {?} initialStatus
                 * @return {?}
                 */
                initialStatus => {
                    if (!initialStatus.hasPermission) {
                        /** @type {?} */
                        let errorCallback = (/**
                         * @return {?}
                         */
                        () => {
                            this.log.error('Storage permission is not turned on');
                            reject(false);
                        });
                        permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, (/**
                         * @param {?} status
                         * @return {?}
                         */
                        status => {
                            if (!status.hasPermission) {
                                errorCallback();
                            }
                            else {
                                resolve(true);
                            }
                        }), errorCallback);
                    }
                    else {
                        resolve(true);
                    }
                }));
            }
            else {
                resolve(true);
            }
        }));
    }
}
Files.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Files.ctorParameters = () => [
    { type: Requestor },
    { type: CoreConfig },
    { type: Log },
    { type: Config }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Files.prototype.rq;
    /**
     * @type {?}
     * @private
     */
    Files.prototype.coreConfig;
    /**
     * @type {?}
     * @private
     */
    Files.prototype.log;
    /**
     * @type {?}
     * @protected
     */
    Files.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9maWxlcy9maWxlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUdsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUVMLE1BQU0sSUFBSSxPQUFPLEVBQ2pCLFFBQVEsSUFBSSxTQUFTLEVBQ3JCLFNBQVMsSUFBSSxVQUFVLEVBQ3ZCLFdBQVcsSUFBSSxZQUFZLEVBQzNCLElBQUksSUFBSSxLQUFLLEVBQ2IsWUFBWSxJQUFJLGFBQWEsRUFDN0IsZUFBZSxJQUFJLGdCQUFnQixFQUNuQyxVQUFVLElBQUksV0FBVyxFQUN6QixLQUFLLElBQUksTUFBTSxFQUNmLE9BQU8sSUFBSSxRQUFRLEVBQ25CLE9BQU8sSUFBSSxRQUFRLEVBQ25CLE9BQU8sSUFBSSxRQUFRLEVBQ25CLE9BQU8sSUFBSSxRQUFRLEVBQ25CLFVBQVUsSUFBSSxXQUFXLEVBQ3pCLE9BQU8sSUFBSSxRQUFRLEVBQ25CLFdBQVcsSUFBSSxZQUFZLEVBQzNCLE9BQU8sSUFBSSxRQUFRLEVBQ25CLGNBQWMsSUFBSSxlQUFlLEVBQ2pDLFNBQVMsSUFBSSxVQUFVLEVBQ3ZCLFVBQVUsSUFBSSxXQUFXLEVBQ3pCLFNBQVMsSUFBSSxVQUFVLEVBQ3ZCLHFCQUFxQixJQUFJLHNCQUFzQixFQUMvQyxpQkFBaUIsSUFBSSxrQkFBa0IsRUFDdkMsaUJBQWlCLElBQUksa0JBQWtCLEVBQ3ZD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QThCOzs7OztJQUFFLG9CQUFnQjs7Ozs7SUFBRSx1QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3JlQ29uZmlnLCBMb2cgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5cbmltcG9ydCB7IEZpbGUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ZpbGUvZmlsZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgSUZpbGVzU2VydmljZSxcbiAgaXNGaWxlIGFzIF9pc0ZpbGUsXG4gIGlzQmFzZTY0IGFzIF9pc0Jhc2U2NCxcbiAgaXNGaWxlVXJpIGFzIF9pc0ZpbGVVcmksXG4gIGlzSW1hZ2VGaWxlIGFzIF9pc0ltYWdlRmlsZSxcbiAgcmVhZCBhcyBfcmVhZCxcbiAgZ2V0RXh0ZW5zaW9uIGFzIF9nZXRFeHRlbnNpb24sXG4gIGNoYW5nZUV4dGVuc2lvbiBhcyBfY2hhbmdlRXh0ZW5zaW9uLFxuICBnZXRNYXhTaXplIGFzIF9nZXRNYXhTaXplLFxuICB0b1BuZyBhcyBfdG9QbmcsXG4gIGlzVmFsaWQgYXMgX2lzVmFsaWQsXG4gIGlzSW1hZ2UgYXMgX2lzSW1hZ2UsXG4gIGlzVmlkZW8gYXMgX2lzVmlkZW8sXG4gIGlzQXVkaW8gYXMgX2lzQXVkaW8sXG4gIGlzRG9jdW1lbnQgYXMgX2lzRG9jdW1lbnQsXG4gIGdldFR5cGUgYXMgX2dldFR5cGUsXG4gIGdldE1pbWVUeXBlIGFzIF9nZXRNaW1lVHlwZSxcbiAgZ2V0SWNvbiBhcyBfZ2V0SWNvbixcbiAgZ2V0VmlkZW9Qb3N0ZXIgYXMgX2dldFZpZGVvUG9zdGVyLFxuICBiNjR0b0Jsb2IgYXMgX2I2NHRvQmxvYixcbiAgYmxvYlRvRmlsZSBhcyBfYmxvYlRvRmlsZSxcbiAgYjY0VG9GaWxlIGFzIF9iNjRUb0ZpbGUsXG4gIHNhdmVCYXNlNjRBc0ltYWdlRmlsZSBhcyBfc2F2ZUJhc2U2NEFzSW1hZ2VGaWxlLFxuICByZXNpemVCYXNlNjRJbWFnZSBhcyBfcmVzaXplQmFzZTY0SW1hZ2UsXG4gIGdldEJhc2U2NE1pbWVUeXBlIGFzIF9nZXRCYXNlNjRNaW1lVHlwZSxcbiAgZ2V0QmFzZTY0RXh0ZW5zaW9uIGFzIF9nZXRCYXNlNjRFeHRlbnNpb24sXG4gIHJlc2l6ZUltYWdlIGFzIF9yZXNpemVJbWFnZSxcbiAgZ2V0TmF0aXZlRGlyZWN0b3J5IGFzIF9nZXROYXRpdmVEaXJlY3RvcnksXG4gIHJlc29sdmVGaWxlUGF0aCBhcyBfcmVzb2x2ZUZpbGVQYXRoLFxuICBmaXhJbWFnZU9yaWVudGF0aW9uIGFzIF9maXhJbWFnZU9yaWVudGF0aW9uLFxuICBtb3ZlVG9JbWFnZURpcmVjdG9yeSBhcyBfbW92ZVRvSW1hZ2VEaXJlY3RvcnksXG4gIG1vdmVUb0ltYWdlRGlyZWN0b3J5QmFzZSBhcyBfbW92ZVRvSW1hZ2VEaXJlY3RvcnlCYXNlLFxuICBmaWxlTmF0aXZlV3JpdGVGaWxlIGFzIF9maWxlTmF0aXZlV3JpdGVGaWxlLFxuICBmaWxlTmF0aXZlQ2hlY2tGaWxlIGFzIF9maWxlTmF0aXZlQ2hlY2tGaWxlLFxuICBmaXhBYnNvbHV0ZVBhdGggYXMgX2ZpeEFic29sdXRlUGF0aCxcbiAgZ2V0Q2xvdWRpbmFyeVVybCBhcyBfZ2V0Q2xvdWRpbmFyeVVybCxcbiAgZ2V0TG9jYWxGaWxlUGF0aCBhcyBfZ2V0TG9jYWxGaWxlUGF0aCxcbiAgZ2V0TG9jYWxGaWxlTmFtZSBhcyBfZ2V0TG9jYWxGaWxlTmFtZSxcbiAgc2F2ZVRvTG9jYWxGaWxlIGFzIF9zYXZlVG9Mb2NhbEZpbGUsXG4gIGNsZWFuRmlsZU5hbWUgYXMgX2NsZWFuRmlsZU5hbWUsXG4gIGdldFVybFdpdGhBbm5vdGF0aW9ucyBhcyBfZ2V0VXJsV2l0aEFubm90YXRpb25zLFxuICBzaG93UGRmT25EZXZpY2UgYXMgX3Nob3dQZGZPbkRldmljZSxcbiAgZG93bmxvYWRGaWxlVG9EZXZpY2UgYXMgX2Rvd25sb2FkRmlsZVRvRGV2aWNlLFxuICBvcGVuQmxvYiBhcyBfb3BlbkJsb2IsXG4gIGFmdGVyT3BlbkJsb2IgYXMgX2FmdGVyT3BlbkJsb2Jcbn0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpbGVzIGltcGxlbWVudHMgSUZpbGVzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcnE6IFJlcXVlc3RvciwgcHJpdmF0ZSBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnLCBwcml2YXRlIGxvZzogTG9nLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcpIHt9XG5cbiAgaXNGaWxlKGZpbGUpIHtcbiAgICByZXR1cm4gX2lzRmlsZShmaWxlKTtcbiAgfVxuXG4gIGlzQmFzZTY0KGZpbGUpIHtcbiAgICByZXR1cm4gX2lzQmFzZTY0KGZpbGUpO1xuICB9XG5cbiAgaXNGaWxlVXJpKGZpbGUpIHtcbiAgICByZXR1cm4gX2lzRmlsZVVyaShmaWxlKTtcbiAgfVxuXG4gIGlzSW1hZ2VGaWxlKGZpbGUpIHtcbiAgICByZXR1cm4gX2lzSW1hZ2VGaWxlKGZpbGUpO1xuICB9XG5cbiAgcmVhZChuYXRpdmVGaWxlOiBGaWxlIHwgQmxvYiwgdHlwZSA9ICdibG9iJywgZW5jb2Rpbmc/OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBfcmVhZCg8YW55Pm5hdGl2ZUZpbGUsIHR5cGUsIGVuY29kaW5nKTtcbiAgfVxuXG4gIGdldEV4dGVuc2lvbihmaWxlOiBGaWxlIHwgYW55KSB7XG4gICAgcmV0dXJuIF9nZXRFeHRlbnNpb24oZmlsZSk7XG4gIH1cblxuICBjaGFuZ2VFeHRlbnNpb24oZmlsZW5hbWU6IHN0cmluZywgZXh0ZW5zaW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBfY2hhbmdlRXh0ZW5zaW9uKGZpbGVuYW1lLCBleHRlbnNpb24pO1xuICB9XG5cbiAgZ2V0TWF4U2l6ZShleHRlbnNpb24pIHtcbiAgICByZXR1cm4gX2dldE1heFNpemUoZXh0ZW5zaW9uKTtcbiAgfVxuXG4gIHRvUG5nKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gX3RvUG5nKHZhbHVlKTtcbiAgfVxuXG4gIGlzVmFsaWQoZmlsZTogRmlsZSkge1xuICAgIHJldHVybiBfaXNWYWxpZCg8YW55PmZpbGUpO1xuICB9XG5cbiAgaXNJbWFnZShmaWxlOiBGaWxlIHwgYW55KSB7XG4gICAgcmV0dXJuIF9pc0ltYWdlKGZpbGUpO1xuICB9XG5cbiAgaXNWaWRlbyhmaWxlOiBGaWxlIHwgYW55KSB7XG4gICAgcmV0dXJuIF9pc1ZpZGVvKGZpbGUpO1xuICB9XG5cbiAgaXNBdWRpbyhmaWxlOiBGaWxlIHwgYW55KSB7XG4gICAgcmV0dXJuIF9pc0F1ZGlvKGZpbGUpO1xuICB9XG5cbiAgaXNEb2N1bWVudChmaWxlOiBGaWxlIHwgYW55KSB7XG4gICAgcmV0dXJuIF9pc0RvY3VtZW50KGZpbGUpO1xuICB9XG5cbiAgZ2V0VHlwZShmaWxlOiBGaWxlIHwgYW55KSB7XG4gICAgcmV0dXJuIF9nZXRUeXBlKGZpbGUpO1xuICB9XG5cbiAgZ2V0TWltZVR5cGUoZmlsZTogRmlsZSB8IGFueSkge1xuICAgIHJldHVybiBfZ2V0TWltZVR5cGUoZmlsZSk7XG4gIH1cblxuICBnZXRJY29uKGZpbGU6IEZpbGUpIHtcbiAgICByZXR1cm4gX2dldEljb24oZmlsZSk7XG4gIH1cblxuICBnZXRWaWRlb1Bvc3Rlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIF9nZXRWaWRlb1Bvc3Rlcih2YWx1ZSk7XG4gIH1cblxuICBiNjR0b0Jsb2IoYjY0RGF0YSwgY29udGVudFR5cGUgPSBudWxsLCBzbGljZVNpemUgPSA1MTIpIHtcbiAgICByZXR1cm4gX2I2NHRvQmxvYihiNjREYXRhLCBjb250ZW50VHlwZSwgc2xpY2VTaXplKTtcbiAgfVxuXG4gIGJsb2JUb0ZpbGUoYmxvYik6IGFueSB7XG4gICAgcmV0dXJuIF9ibG9iVG9GaWxlKGJsb2IpO1xuICB9XG5cbiAgYjY0VG9GaWxlKGRhdGE6IHN0cmluZywgZmlsZTogRmlsZSk6IGFueSB7XG4gICAgcmV0dXJuIF9iNjRUb0ZpbGUoZGF0YSwgZmlsZSBhcyBhbnkpO1xuICB9XG5cbiAgc2F2ZUJhc2U2NEFzSW1hZ2VGaWxlKGRhdGE6IHN0cmluZykge1xuICAgIHJldHVybiBfc2F2ZUJhc2U2NEFzSW1hZ2VGaWxlKGRhdGEpO1xuICB9XG5cbiAgcmVzaXplQmFzZTY0SW1hZ2UoYmFzZTY0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSB7XG4gICAgcmV0dXJuIF9yZXNpemVCYXNlNjRJbWFnZShiYXNlNjQsIG1heFdpZHRoLCBtYXhIZWlnaHQpO1xuICB9XG5cbiAgZ2V0QmFzZTY0TWltZVR5cGUoYmFzZTY0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gX2dldEJhc2U2NE1pbWVUeXBlKGJhc2U2NCk7XG4gIH1cblxuICBnZXRCYXNlNjRFeHRlbnNpb24oYmFzZTY0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gX2dldEJhc2U2NEV4dGVuc2lvbihiYXNlNjQpO1xuICB9XG5cbiAgcmVzaXplSW1hZ2UoZmlsZTogRmlsZSwgbWF4V2lkdGg6IE51bWJlciwgbWF4SGVpZ2h0OiBOdW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBfcmVzaXplSW1hZ2UoZmlsZSBhcyBhbnksIG1heFdpZHRoLCBtYXhIZWlnaHQpO1xuICB9XG5cbiAgZ2V0TmF0aXZlRGlyZWN0b3J5KHN1YmZvbGRlcikge1xuICAgIHJldHVybiBfZ2V0TmF0aXZlRGlyZWN0b3J5KHN1YmZvbGRlcik7XG4gIH1cblxuICByZXNvbHZlRmlsZVBhdGgoZmlsZVBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBfcmVzb2x2ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgfVxuXG4gIGZpeEltYWdlT3JpZW50YXRpb24ocGF0aCwgZmlsZU5hbWUpIHtcbiAgICByZXR1cm4gX2ZpeEltYWdlT3JpZW50YXRpb24ocGF0aCwgZmlsZU5hbWUpO1xuICB9XG5cbiAgLy9zaG91bGQgb25seSBiZSBjYWxsZWQgaW4gY29yZG92YVxuICBtb3ZlVG9JbWFnZURpcmVjdG9yeShvcmlnaW5hbEZpbGVQYXRoOiBzdHJpbmcsIGRpc2FibGVPcmllbnRhdGlvbkZpeDogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gX21vdmVUb0ltYWdlRGlyZWN0b3J5KG9yaWdpbmFsRmlsZVBhdGgsIGRpc2FibGVPcmllbnRhdGlvbkZpeCk7XG4gIH1cblxuICBtb3ZlVG9JbWFnZURpcmVjdG9yeUJhc2UoZmlsZURpclBhdGg6IHN0cmluZywgZmlsZUVudHJ5OiBhbnksIG5ld05hbWU6IHN0cmluZywgb3JpZ2luYWxGaWxlUGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIF9tb3ZlVG9JbWFnZURpcmVjdG9yeUJhc2UoZmlsZURpclBhdGgsIGZpbGVFbnRyeSwgbmV3TmFtZSwgb3JpZ2luYWxGaWxlUGF0aCk7XG4gIH1cblxuICBmaWxlTmF0aXZlV3JpdGVGaWxlKHBhdGgsIGZpbGVOYW1lLCB0ZXh0LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIF9maWxlTmF0aXZlV3JpdGVGaWxlKHBhdGgsIGZpbGVOYW1lLCB0ZXh0LCBvcHRpb25zKTtcbiAgfVxuXG4gIGZpbGVOYXRpdmVDaGVja0ZpbGUocGF0aCwgZmlsZU5hbWUpIHtcbiAgICByZXR1cm4gX2ZpbGVOYXRpdmVDaGVja0ZpbGUocGF0aCwgZmlsZU5hbWUpO1xuICB9XG5cbiAgZml4QWJzb2x1dGVQYXRoKGRhdGE6IHN0cmluZykge1xuICAgIHJldHVybiBfZml4QWJzb2x1dGVQYXRoKGRhdGEpO1xuICB9XG5cbiAgZ2V0Q2xvdWRpbmFyeVVybChyZXRWYWwpIHtcbiAgICByZXR1cm4gX2dldENsb3VkaW5hcnlVcmwocmV0VmFsKTtcbiAgfVxuXG4gIGRvd25sb2FkRmlsZShmaWxlbmFtZSwgbWVkaWFUeXBlLCB1cmwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5ycS5kb3dubG9hZEZpbGUoZmlsZW5hbWUsIG1lZGlhVHlwZSwgdXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIGdldExvY2FsRmlsZVBhdGgoKSB7XG4gICAgcmV0dXJuIF9nZXRMb2NhbEZpbGVQYXRoKCk7XG4gIH1cblxuICBnZXRMb2NhbEZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gX2dldExvY2FsRmlsZU5hbWUoZmlsZU5hbWUpO1xuICB9XG5cbiAgc2F2ZVRvTG9jYWxGaWxlKGJsb2IsIGZpbGVOYW1lKSB7XG4gICAgcmV0dXJuIF9zYXZlVG9Mb2NhbEZpbGUoYmxvYiwgZmlsZU5hbWUpO1xuICB9XG5cbiAgZ2V0VXJsV2l0aEFubm90YXRpb25zKHNyYzogc3RyaW5nLCBwaG90bz86IGFueSkge1xuICAgIHJldHVybiBfZ2V0VXJsV2l0aEFubm90YXRpb25zKHNyYywgcGhvdG8pO1xuICB9XG5cbiAgY2xlYW5GaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIF9jbGVhbkZpbGVOYW1lKGZpbGVOYW1lKTtcbiAgfVxuXG4gIGRvd25sb2FkRmlsZVRvRGV2aWNlKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgcmV0dXJuIF9kb3dubG9hZEZpbGVUb0RldmljZShzb3VyY2UsIHRhcmdldCk7XG4gIH1cblxuICBzaG93UGRmT25EZXZpY2UoZmlsZVBhdGg6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyA9IG51bGwpIHtcbiAgICByZXR1cm4gX3Nob3dQZGZPbkRldmljZShmaWxlUGF0aCwgZmlsZU5hbWUpO1xuICB9XG5cbiAgdXBsb2FkUHJveHkocGhvdG9Vcmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLnVwbG9hZFByb3h5VXJsO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHVybDogcGhvdG9VcmwgfSkucGlwZShcbiAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDbG91ZGluYXJ5VXJsKHsgY2xvdWRpbmFyeTogcmV0VmFsIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZXhwb3J0VG9GaWxlKGNvbnRlbnQsIHR5cGUsIGVuY29kaW5nLCBmaWxlbmFtZSkge1xuICAgIGVuY29kaW5nID0gZW5jb2RpbmcgfHwgJ2NoYXJzZXQ9SVNPLTg4NTktMSc7XG4gICAgZmlsZW5hbWUgPSBmaWxlbmFtZSB8fCAnZGF0YS5jc3YnO1xuICAgIHR5cGUgPSB0eXBlIHx8ICdkYXRhOmFwcGxpY2F0aW9uL2NzdjtjaGFyc2V0PUlTTy04ODU5LTE7JztcblxuICAgIGlmIChlbmNvZGluZyA9PT0gJ2Jhc2U2NCcpIHtcbiAgICAgIGNvbnRlbnQgPSB0aGlzLmI2NHRvQmxvYihjb250ZW50LCB0eXBlKTtcbiAgICB9XG4gICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0sIHtcbiAgICAgIHR5cGU6IHR5cGVcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5ycS5zYXZlQmxvYihibG9iLCBmaWxlbmFtZSk7XG4gIH1cblxuICBvcGVuQmxvYihibG9iLCBmaWxlTmFtZTogc3RyaW5nLCBtaW1lVHlwZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIF9vcGVuQmxvYihibG9iLCBmaWxlTmFtZSwgbWltZVR5cGUpO1xuICB9XG5cbiAgYWZ0ZXJPcGVuQmxvYihmaWxlUGF0aCwgbWltZVR5cGUpIHtcbiAgICByZXR1cm4gX2FmdGVyT3BlbkJsb2IoZmlsZVBhdGgsIG1pbWVUeXBlKTtcbiAgfVxuXG4gIF9yZXF1ZXN0RXh0ZXJuYWxTdG9yYWdlUGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0FuZHJvaWQoKSAmJiB0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgICAgbGV0IHBlcm1pc3Npb25zID0gKDxhbnk+d2luZG93LmNvcmRvdmEucGx1Z2lucykucGVybWlzc2lvbnM7XG4gICAgICAgIHBlcm1pc3Npb25zLmhhc1Blcm1pc3Npb24ocGVybWlzc2lvbnMuUkVBRF9FWFRFUk5BTF9TVE9SQUdFLCBpbml0aWFsU3RhdHVzID0+IHtcbiAgICAgICAgICBpZiAoIWluaXRpYWxTdGF0dXMuaGFzUGVybWlzc2lvbikge1xuICAgICAgICAgICAgbGV0IGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKCdTdG9yYWdlIHBlcm1pc3Npb24gaXMgbm90IHR1cm5lZCBvbicpO1xuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9uKFxuICAgICAgICAgICAgICBwZXJtaXNzaW9ucy5SRUFEX0VYVEVSTkFMX1NUT1JBR0UsXG4gICAgICAgICAgICAgIHN0YXR1cyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0dXMuaGFzUGVybWlzc2lvbikge1xuICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFja1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19
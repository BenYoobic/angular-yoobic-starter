import ImgCache from '@chrisben/imgcache.js/lib/imgcache';
import { isCordova, isChrome, isIOS, isAndroid } from '../config';
import { updatePathSessionId } from '../files';
ImgCache.options.chromeQuota = 50 * 1024 * 1024;
// Need to set this location and decide where.
// ImgCache.options.localCacheFolder = '/image-cache';
// Until this is set use temp cache with setting below
// ImgCache.options.usePersistentCache = false;
ImgCache.options.debug = false;
if (isCordova() && cordova.file && cordova.file.dataDirectory) {
    ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory;
}
export function isImageCacheAvailable() {
    return (window['isImageCacheAvailable'] !== false && isChrome()) || isCordova();
}
export function imageCacheInit() {
    if (!isImageCacheAvailable()) {
        return Promise.resolve();
    }
    if (!window['isImgCacheInit']) {
        window['isImgCacheInit'] = true;
        return new Promise((resolve, reject) => {
            ImgCache.init(() => {
                // tslint:disable-next-line:no-console
                console.log('image cache is init');
                resolve();
            }, () => {
                window['isImageCacheAvailable'] = false;
            });
        });
    }
    else {
        return Promise.resolve();
    }
}
export function cacheFile(url, progress) {
    if (!isImageCacheAvailable()) {
        return Promise.resolve(url);
    }
    return imageCacheInit().then(() => {
        return new Promise((resolve, reject) => {
            ImgCache.isCached(url, function (src, success) {
                if (!success) {
                    return ImgCache.cacheFile(url, resolve, () => {
                        resolve();
                    }, progress);
                }
            });
        });
    });
}
export function getCachedFileURL(url) {
    if (!isImageCacheAvailable()) {
        return Promise.resolve(url);
    }
    return imageCacheInit().then(() => {
        return new Promise((resolve, reject) => {
            ImgCache.getCachedFileURL(url, (img_src, file_url) => {
                if (file_url === null) {
                    reject(null);
                }
                else {
                    if (isIOS() && isCordova()) {
                        return updatePathSessionId(file_url).then(updatedPath => resolve(updatedPath));
                    }
                    else if (isAndroid() && isCordova()) {
                        resolve(img_src);
                    }
                    else {
                        resolve(file_url);
                    }
                }
            });
        });
    });
}
export function getCachedFileBase64Data(url) {
    if (!isImageCacheAvailable()) {
        return Promise.resolve(url);
    }
    return imageCacheInit().then(() => {
        return new Promise((resolve, reject) => {
            ImgCache.getCachedFileBase64Data(url, (img_src, file_url) => {
                if (file_url === null) {
                    reject();
                }
                else {
                    resolve(file_url);
                }
            });
        });
    });
}

export declare function isImageCacheAvailable(): boolean;
export declare function imageCacheInit(): Promise<void>;
export declare function cacheFile(url: string, progress?: any): Promise<{}>;
export declare function getCachedFileURL(url: any): Promise<string>;
export declare function getCachedFileBase64Data(url: any): Promise<any>;

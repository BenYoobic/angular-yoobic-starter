export declare class ExifRestorer {
    protected KEY_STR: string;
    encode64(input: any): string;
    restore(origFileBase64: any, resizedFileBase64: any): any;
    exifManipulation(resizedFileBase64: any, segments: any): Uint8Array;
    getExifArray(segments: any): any;
    insertExif(resizedFileBase64: any, exifArray: any): any[];
    slice2Segments(rawImageArray: any): any[];
    decode64(input: any): any[];
}

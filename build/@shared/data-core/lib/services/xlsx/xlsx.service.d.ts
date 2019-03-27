export declare class Xlsx {
    constructor();
    readFile(nativeFile: File | Blob, type?: string, encoding?: string): Promise<string>;
    read(file: File): Promise<any[]>;
    exportToFile(content: any, type: any, encoding: any, filename: any): void;
    saveBlob(blob: Blob, filename: string): void;
    getBase64MimeType(base64: any): any;
    b64toBlob(b64Data: any, contentType?: any, sliceSize?: number): Blob;
    readSheets(file: File): Promise<any[]>;
    write(title: string, sheets: Array<{
        columns: Array<any>;
        data: Array<any>;
        title: string;
    }>): void;
    private datenum;
    private sheetFromArrayOfArrays;
    private s2ab;
}

import { IFolder, IFileOrFolder } from '@shared/stencil';
export declare class Folder extends IFolder {
    name: string;
    group: string;
}
export declare class FileOrFolder extends IFileOrFolder {
    name?: string;
    _filename?: string;
    mimeType?: string;
}

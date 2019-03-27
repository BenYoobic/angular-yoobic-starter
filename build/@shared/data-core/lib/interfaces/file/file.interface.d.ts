import { IFile } from '@shared/stencil';
import { Tenant } from '../tenant/tenant.interface';
export declare function onUrlChange(doc: any, data: any): void;
export declare class File extends IFile {
    _ect?: any;
    _downloadURL: string;
    _filename: string;
    size: number;
    mimeType: string;
    hideMobile: boolean;
    group: any;
    tags?: Array<string>;
    _tenant: Tenant;
    _tenantRef?: string;
}

import { IBackup } from '@shared/stencil';
export declare class Backup extends IBackup {
    date: Date;
    backup: {
        _id: string;
        name: string;
        description: string;
        badge: string;
    };
    collections: Array<string>;
}

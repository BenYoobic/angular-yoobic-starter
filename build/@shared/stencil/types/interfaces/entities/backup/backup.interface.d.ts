import { IEntity } from '../entity/entity.interface';
export declare class IBackup extends IEntity {
    date: Date;
    backup: {
        _id: string;
        name: string;
        description: string;
        badge: string;
    };
    collections: Array<string>;
}

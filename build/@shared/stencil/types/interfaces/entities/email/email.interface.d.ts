import { IEntity } from '../entity/entity.interface';
export declare class IEmailReport extends IEntity {
    comment: string;
    emails: Array<string>;
}
export declare class IUnblockEmails extends IEntity {
    emails: Array<string>;
}

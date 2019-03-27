import { IEntity } from '../entity/entity.interface';
export declare class IBlog extends IEntity {
    title: string;
    pubDate: Date;
    description: string;
    background?: string;
}

import { IEntity } from '../entity/entity.interface';
export declare class IWorkplaceGroups extends IEntity {
    name: string;
    icon: string;
    cover: string;
    description: string;
}
export declare class IWorkplacePost extends IEntity {
    comments: string;
    workplaceGroups: any;
}

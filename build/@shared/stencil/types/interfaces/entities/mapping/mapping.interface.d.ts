import { IEntity } from '../entity/entity.interface';
export declare class IIMapping extends IEntity {
    context: string;
    type: string;
    document: any;
}
export declare class ITrialMapping extends IEntity {
    introduction: any;
    introductionvideo: any;
    campaigntype: string;
}
export declare class IErrorMapping {
    data?: any;
    message?: string;
    statusCode?: number;
}

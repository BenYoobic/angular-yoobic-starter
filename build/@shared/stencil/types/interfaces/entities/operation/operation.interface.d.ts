import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';
export declare class IOperation extends IEntity {
    isCreation?: boolean;
    operationId: string;
    operation?: {
        accessToken?: IUser;
        remoteMethodName?: string;
        modelName?: string;
        ctxData?: string;
        currentInstance?: string;
        where?: string;
        daoMethodName?: string;
    };
    requestId?: string;
    remoteMethodName?: string;
    daoMethodName?: string;
    doc?: any;
}

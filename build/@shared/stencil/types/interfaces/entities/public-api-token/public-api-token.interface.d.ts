import { IEntity } from '../entity/entity.interface';
import { ITenant } from '../tenant/tenant.interface';
import { IUser } from '../user/user.interface';
export declare class IPublicApiToken extends IEntity {
    accessToken: {
        id: string;
    };
    user: IUser;
    userRef: string;
    _tenant: ITenant;
}

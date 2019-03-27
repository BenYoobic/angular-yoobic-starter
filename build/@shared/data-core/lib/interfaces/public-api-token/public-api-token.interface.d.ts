import { Tenant } from '../tenant/tenant.interface';
import { IPublicApiToken } from '@shared/stencil';
import { User } from '../user/user.interface';
export declare class PublicApiToken extends IPublicApiToken {
    accessToken: {
        id: string;
    };
    user: User;
    userRef: string;
    _tenant: Tenant;
}

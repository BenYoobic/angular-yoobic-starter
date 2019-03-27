import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';
import { ILocation } from '../location/location.interface';
import { IProduct } from '../product/product.interface';
export declare class IProductBatch extends IEntity {
    userRef?: string;
    user?: IUser;
    location?: ILocation;
    locationRef?: string;
    product?: IProduct;
    productRef?: string;
    aisle: string;
    date: Date;
    archived?: boolean;
    treatedDate?: Date;
    timeSpent?: number;
    removedCount?: number;
    isOutOfStock?: boolean;
    isNew?: boolean;
}
export declare class IProductBatchList {
    _id: string;
    total: number;
    treated: number;
    productsRef?: Array<string>;
}

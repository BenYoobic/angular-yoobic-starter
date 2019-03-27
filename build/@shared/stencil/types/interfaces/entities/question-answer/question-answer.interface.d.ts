import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';
export declare class IQuestionAnswer extends IEntity {
    _id: string;
    group: string | Array<string>;
    date?: Date;
    userRef: string;
    user: IUser;
    votesCount?: number;
    votesRef?: Array<string>;
    questionRef?: string;
    isVerified?: boolean;
    likesCount?: number;
    isLikedByMe?: boolean;
    viewsCount?: number;
    isViewedByMe?: boolean;
    parent?: IQuestionAnswer;
    isChild?: boolean;
    text: string;
    imageData?: string;
    verifiedBy?: IUser;
    verifiedByRef?: string;
    comments: Array<IQuestionAnswer>;
}

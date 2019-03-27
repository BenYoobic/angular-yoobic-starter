import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';
import { IQuestionAnswer } from '../question-answer/question-answer.interface';
export declare class IQuestion extends IEntity {
    _id: string;
    group: Array<string>;
    date?: Date;
    userRef: string;
    user: IUser;
    answersCount?: number;
    likesCount?: number;
    isLikedByMe?: boolean;
    viewsCount?: number;
    isViewedByMe?: boolean;
    answers: Array<IQuestionAnswer>;
    title: string;
    description: string;
    imageData?: string;
    tags?: Array<string>;
    language: string;
    isVerified?: boolean;
    verifiedByRef?: string;
}

import { IUser } from '../../entities/user/user.interface';
export interface IParticipant {
    userInfo?: {
        userId?: string;
        name?: string;
        status?: string;
    };
    user?: IUser;
    stream?: MediaStream;
    hasVideo?: boolean;
    hasAudio?: boolean;
    waitingToConnect?: boolean;
}

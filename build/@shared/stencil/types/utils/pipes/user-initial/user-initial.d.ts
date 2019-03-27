import { Pipe } from '../base';
import { IUser } from '../../../interfaces';
export declare class UserInitialPipe implements Pipe<IUser, string> {
    transform(user: IUser): string;
}

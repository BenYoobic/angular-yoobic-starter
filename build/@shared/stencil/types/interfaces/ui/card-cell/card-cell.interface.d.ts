import { IButton } from '../button/button.interface';
import { IUserStats } from '../../entities/user/user.interface';
export interface ICardCellEntry {
    imgSrc?: string;
    icon?: string;
    text?: string;
    subheading?: string;
    dueDate?: Date;
    actions?: Array<IButton>;
    isBadge?: boolean;
    userBadges?: IUserStats;
    flagged?: boolean;
    annotated?: boolean;
    validated?: boolean;
    noTruncate?: boolean;
    isLocked?: boolean;
}

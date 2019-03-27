import { IButton } from '../button/button.interface';
import { IBadgeEntry } from '../../entities/badge/badge.interface';
import { IUser } from '../../entities/user/user.interface';
import { IFile } from '../../entities/file/file.interface';
export declare type CardType = 'card-feed' | 'card-course' | 'card-course-row' | 'card-list' | 'card-default' | 'card-sticky' | 'card-cell' | 'card-tag' | 'card-tag-single' | 'card-image' | 'card-grid' | 'card-map';
export interface ICardEntry {
    heading?: string;
    headings?: Array<string>;
    subheadings?: string[];
    imgSrc?: string;
    topLeftBadge?: string;
    topRightBadge?: string;
    bottomLeftBadge?: string;
    bottomRightBadge?: string;
    type: CardType;
    icon?: string;
    tags?: string[];
    icons?: Array<{
        icon: string;
        value?: string;
        text?: string;
        handler?: () => void;
    }>;
    badges?: Array<IBadgeEntry>;
    description?: string;
    actions?: IButton[];
    topLeftIcon?: string;
    topRightIcon?: string;
    bottomLeftIcon?: string;
    bottomRightIcon?: string;
    animationName?: string;
    sharedIn?: string;
    groups?: Array<string>;
    bottomAction?: {
        name: string;
        handler?: () => void;
    };
    bottomActions?: Array<IButton>;
    user?: IUser;
    topActions?: Array<IButton>;
    document?: IFile;
    fieldTitle?: string;
    missionTitle?: string;
}

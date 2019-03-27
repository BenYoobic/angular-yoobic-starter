import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IUser, ICourse, IBadgeEntry } from '../../../index';
export declare class YooUserDetailComponent {
    user: IUser;
    stats: {
        lessonsCount: number;
        lessonsValidated: number;
        availablePoints: number;
        earnedPoints: number;
        earnedBadges: Array<string>;
    };
    courses: Array<ICourse>;
    courseSelected: EventEmitter<ICourse>;
    badgeSelected: EventEmitter<IBadgeEntry>;
    seeAllCourses: EventEmitter<boolean>;
    onSelectCourse(ev: CustomEvent<ICourse>): void;
    onSelectBadge(ev: CustomEvent<IBadgeEntry>): void;
    onSeeAllCourses(): void;
    getBadgeEntries(): Array<IBadgeEntry>;
    render(): JSX.Element;
}

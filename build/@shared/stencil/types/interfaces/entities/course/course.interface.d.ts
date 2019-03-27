import { IEntity } from '../entity/entity.interface';
import { IPlanWithStats } from '../plan/plan.interface';
export declare class ICourse extends IEntity {
    _id?: string;
    group?: Array<string>;
    planRef: string;
    ownerRef: string;
    assignmentDate: Date;
    creatorRef: string;
    finished: boolean;
    plan?: IPlanWithStats;
    finishedLessonsCount?: number;
    isLocked?: boolean;
}

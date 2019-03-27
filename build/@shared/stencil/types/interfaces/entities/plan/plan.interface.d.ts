import { IEntity } from '../entity/entity.interface';
export interface IPlan extends IEntity {
    _id: string | any;
    title: string;
    background: any;
    color?: any;
    group?: Array<string>;
    description?: string;
    archived?: any;
    enableJourney?: any;
    timeConstraintMode?: string;
    availableFor?: number;
    availableAfter?: number;
    availableFrom?: string;
    availableTo?: string;
    users?: any;
}
export interface IPlanWithStats extends IPlan {
    finishedCount?: number;
    lessonsFinished?: number;
    finished?: number;
    count?: number;
    progress?: number;
    duration?: number;
    averageDuration?: number;
    validatedCount?: number;
    availablePoints?: number;
    earnedPoints?: number;
    lessonsCount?: number;
}

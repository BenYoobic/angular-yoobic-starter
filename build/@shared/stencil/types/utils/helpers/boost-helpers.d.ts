import { IPlan, ILesson, ICourse } from '../../interfaces';
export declare enum DEFAULT_BADGES {
    CUSTOMER_HERO = "customerhero",
    INSTORE_EXPERT = "instoreexpert",
    ONBOARDING = "onboarding",
    OUTSTANDING_LEARNER = "outstandinglearner",
    PRODUCT_EXPERT = "productexpert",
    CROSS_SELLING_GENIUS = "crosssellinggenius"
}
export declare function getPlanDueDate(plan: IPlan, assignmentDate: string | Date): any;
export declare function getPlanStartDate(plan: IPlan, assignmentDate: string | Date): any;
export declare function isPlanInFuture(plan: IPlan, assignmentDate: string | Date): boolean;
export declare function getLessonTypeIcon(type: any): "yo-action-plan" | "yo-stop-watch" | "yo-play" | "yo-diploma";
export declare function getCourseProgress(course: ICourse): number;
export declare function isLessonCompleted(lesson: ILesson): boolean;
export declare function isQuiz(lessonType: string): boolean;
export declare function isTimedQuiz(lessonType: string): boolean;
export declare function isContentOnly(lessonType: string): boolean;

import { toDate, dateAdd, isDateAfter } from '../date';
import { isNumber, isUndefined } from 'lodash-es';
export var DEFAULT_BADGES;
(function (DEFAULT_BADGES) {
    DEFAULT_BADGES["CUSTOMER_HERO"] = "customerhero";
    DEFAULT_BADGES["INSTORE_EXPERT"] = "instoreexpert";
    DEFAULT_BADGES["ONBOARDING"] = "onboarding";
    DEFAULT_BADGES["OUTSTANDING_LEARNER"] = "outstandinglearner";
    DEFAULT_BADGES["PRODUCT_EXPERT"] = "productexpert";
    DEFAULT_BADGES["CROSS_SELLING_GENIUS"] = "crosssellinggenius";
})(DEFAULT_BADGES || (DEFAULT_BADGES = {}));
export function getPlanDueDate(plan, assignmentDate) {
    if (!plan) {
        return null;
    }
    if (!plan.timeConstraintMode) {
        return null; // throw warning/error ?
    }
    let planDueDate;
    if (plan.archived || !assignmentDate) {
        return null;
    }
    if (plan.timeConstraintMode === 'timeperiod') {
        if (!isNumber(plan.availableAfter) || !isNumber(plan.availableFor)) {
            return null; // throw warning/error ?
        }
        planDueDate = toDate(assignmentDate);
        planDueDate = dateAdd(dateAdd(planDueDate, 'days', plan.availableAfter), 'days', plan.availableFor);
    }
    else if (plan.timeConstraintMode === 'calendar') {
        if (!plan.availableTo) {
            return null; // throw warning/error ?
        }
        planDueDate = toDate(plan.availableTo);
    }
    else {
        return null; // this plan is not constrained by time
    }
    return planDueDate;
}
export function getPlanStartDate(plan, assignmentDate) {
    if (!plan.timeConstraintMode) {
        return null; // throw warning/error ?
    }
    let planStartDate;
    if (plan.archived || !assignmentDate) {
        return null;
    }
    if (plan.timeConstraintMode === 'timeperiod') {
        if (!isNumber(plan.availableAfter) || !isNumber(plan.availableFor)) {
            return null; // throw warning/error ?
        }
        planStartDate = toDate(assignmentDate);
        planStartDate = dateAdd(planStartDate, 'days', plan.availableAfter);
    }
    else if (plan.timeConstraintMode === 'calendar') {
        if (!plan.availableFrom) {
            return null; // throw warning/error ?
        }
        planStartDate = toDate(plan.availableFrom);
    }
    else {
        return null;
    }
    return planStartDate;
}
export function isPlanInFuture(plan, assignmentDate) {
    let now = new Date();
    let planStartDate = getPlanStartDate(plan, assignmentDate);
    return planStartDate ? isDateAfter(planStartDate, now) : false;
}
export function getLessonTypeIcon(type) {
    switch (type) {
        case 'video':
            return 'yo-play';
        case 'quizz':
            return 'yo-action-plan';
        case 'timedquizz':
            return 'yo-stop-watch';
        case 'document':
        default:
            return 'yo-diploma';
    }
}
export function getCourseProgress(course) {
    if (course.finishedLessonsCount && course.plan.lessonsCount > 0) {
        return (course.finishedLessonsCount / course.plan.lessonsCount) * 100;
    }
    return 0;
}
export function isLessonCompleted(lesson) {
    if (!isUndefined(lesson.description && lesson.description.minValue)) {
        // for lessons with min compliance, it is considered finished when the lesson has been completed and validated
        return lesson.status === 'finished' && lesson.validated === true;
    }
    else {
        return lesson.status === 'finished';
    }
}
export function isQuiz(lessonType) {
    return lessonType && lessonType !== 'document' && lessonType !== 'video';
}
export function isTimedQuiz(lessonType) {
    return lessonType === 'timedquizz';
}
export function isContentOnly(lessonType) {
    return lessonType === 'document' || lessonType === 'video';
}

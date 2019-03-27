/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core'; //, Injector
//, Injector
import { Translate } from '@shared/translate';
import { Models } from '@shared/data-core'; //Condition, Session,
//Condition, Session,
import { isPresent, FormFieldType, getUUID, answerIsValid } from '@shared/stencil';
import { isArray, isObject, forEach, filter, sortBy, isNumber, isBoolean } from 'lodash-es'; //cloneDeep, isFunction, keys, isEmpty,  indexOf, get, set, mergeWith, intersection, result,  isString, concat,
/**
 * @record
 */
export function FieldControl() { }
export class FormDynamicBuilder {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        //private builder: FormBuilder, private session: Session,, private coreConfig: CoreConfig, private log: Log, private injector: Injector
    }
    /**
     * @return {?}
     */
    generateFieldName() {
        return getUUID();
    }
    /**
     * @param {?} value
     * @param {?} answer
     * @param {?} field
     * @return {?}
     */
    answerIsValid(value, answer, field) {
        return answerIsValid(value, answer, field);
    }
    /**
     * @param {?} missiondescription
     * @return {?}
     */
    hasScoring(missiondescription) {
        if (missiondescription && missiondescription.scoring && missiondescription.scoring.length > 0) {
            // && _some(missiondescription.scoring, (score: any) => score.isActive)) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} mission
     * @param {?} data
     * @return {?}
     */
    calculateScoring(mission, data) {
        if (mission.description.scoring.length > 1) {
            mission.extraScores = {};
        }
        forEach(mission.description.scoring, (/**
         * @param {?} scoring
         * @return {?}
         */
        (scoring) => {
            //let scoring = _find(mission.description.scoring, (s: any) => s.isActive);
            /** @type {?} */
            let scoreValue = scoring.initialValue || 0;
            /** @type {?} */
            let scorePercentageBasis = scoring.percentageBasis || 0;
            forEach(data, (/**
             * @param {?} value
             * @param {?} key
             * @return {?}
             */
            (value, key) => {
                if (value && isArray(value.value)) {
                    forEach(value.value, (/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => {
                        if (v && isNumber(scoring[key + this.encodeScoringValue(v)])) {
                            /** @type {?} */
                            let numValue = scoring[key + this.encodeScoringValue(v)];
                            if (numValue < 0 && -numValue % 1337 === 0) {
                                scorePercentageBasis -= -numValue / 1337;
                            }
                            else {
                                scoreValue += numValue;
                            }
                        }
                    }));
                }
                else {
                    if (value && isNumber(scoring[key + this.encodeScoringValue(value.value)])) {
                        /** @type {?} */
                        let numValue = scoring[key + this.encodeScoringValue(value.value)];
                        if (numValue < 0 && -numValue % 1337 === 0) {
                            scorePercentageBasis -= -numValue / 1337;
                        }
                        else {
                            scoreValue += numValue;
                        }
                    }
                    else if (value && isNumber(value.value) && isNumber(scoring[key])) {
                        scoreValue += value.value * scoring[key];
                    }
                    else if (isBoolean(value.value) && scoring[key + 'value']) {
                        //not sure why we have the 'value' in the form creator
                        if (value.value && isNumber(scoring[key + 'value'].value)) {
                            scoreValue += scoring[key + 'value'].value;
                        }
                        else if (!value.value && isNumber(scoring[key + 'value'].novalue)) {
                            scoreValue += scoring[key + 'value'].novalue;
                        }
                    }
                }
                if (value && isPresent(value.value) && scoring[key + 'value'] && isNumber(scoring[key + 'value'].visible)) {
                    scorePercentageBasis += scoring[key + 'value'].visible;
                }
            }));
            if (scoring.isPercentage && scorePercentageBasis > 0) {
                scoreValue = Math.round((scoreValue * 100) / scorePercentageBasis);
            }
            /** @type {?} */
            let score = { value: scoreValue, isPercentage: scoring.isPercentage, title: scoring.title };
            if (scoring.isActive || mission.description.scoring.length === 1) {
                mission.score = score;
                if ((scoring.minValue || scoring.minValue === 0) && scoreValue < scoring.minValue) {
                    mission.validated = false;
                }
                else if ((scoring.minValue || scoring.minValue === 0) && scoreValue >= scoring.minValue) {
                    delete mission.validated;
                }
            }
            else {
                mission.extraScores[score.title] = score;
            }
        }));
    }
    /**
     * @param {?} mission
     * @param {?} slides
     * @param {?} data
     * @return {?}
     */
    calculateScoringQuizz(mission, slides, data) {
        /** @type {?} */
        let score = { total: 0, value: 0 };
        /** @type {?} */
        let fields = Models.getFieldsFromSlides(slides);
        forEach(fields, (/**
         * @param {?} field
         * @return {?}
         */
        field => {
            if (field.answer && field.answer.length > 0) {
                score.total += 1;
            }
            if (data[field.name] && this.answerIsValid(data[field.name].value, field.answer, field)) {
                score.value += 1;
            }
        }));
        mission.score = score;
    }
    /**
     * @param {?} formDefinition
     * @return {?}
     */
    hasTabs(formDefinition) {
        return formDefinition.some((/**
         * @param {?} f
         * @return {?}
         */
        f => f.tab && f.tab.length > 0));
    }
    /**
     * @param {?} formDefinition
     * @return {?}
     */
    getSlides(formDefinition) {
        /** @type {?} */
        let map = new Map();
        map.set('GENERAL', (/** @type {?} */ ({ title: this.translate.get('GENERAL'), items: [], order: 0 })));
        formDefinition.forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => {
            /** @type {?} */
            let tabName = this.getTabName(f);
            if (!f.tab) {
                map.get('GENERAL').items.push(f);
            }
            else if (map.has(tabName)) {
                map.get(tabName).items.push(f);
                if (f.tabCondition) {
                    map.get(tabName).condition = (/** @type {?} */ (f.tabCondition));
                }
            }
            else {
                map.set(tabName, (/** @type {?} */ ({ title: tabName, items: [f], condition: f.tabCondition })));
            }
        }));
        return filter(sortBy(Array.from(map.values()), (/**
         * @param {?} slide
         * @return {?}
         */
        slide => slide.title)), (/**
         * @param {?} slide
         * @return {?}
         */
        slide => slide.items.length > 0));
    }
    /**
     * @param {?} data
     * @param {?} fields
     * @return {?}
     */
    updateDataFieldType(data, fields) {
        data.nonapplicableCount = 0;
        data.satisfactoryCount = 0;
        data.unsatisfactoryCount = 0;
        forEach(fields, (/**
         * @param {?} field
         * @return {?}
         */
        field => {
            if (isObject(data[field.name])) {
                data[field.name].fieldType = field.type;
                data[field.name].fieldTitle = field.title;
                if (data[field.name] && data[field.name].value && field.type === FormFieldType.photo && field.values && (!data[field.name].tags || data[field.name].tags.length < 1)) {
                    data[field.name].tags = field.values;
                }
                else if (data[field.name] && data[field.name].value && field.type === FormFieldType.multiphotos && field.values) {
                    data[field.name].extraData = data[field.name].extraData || {};
                    data[field.name].value.forEach((/**
                     * @param {?} v
                     * @param {?} i
                     * @return {?}
                     */
                    (v, i) => {
                        data[field.name].extraData[i] = data[field.name].extraData[i] || {};
                        if (!data[field.name].extraData[i].tags || data[field.name].extraData[i].tags.length < 1) {
                            data[field.name].extraData[i].tags = field.values;
                        }
                    }));
                }
                if (field.shareToFeed) {
                    data[field.name].fieldShareToFeed = field.shareToFeed;
                }
                if (field.answer) {
                    data[field.name].answer = field.answer;
                    data[field.name].fieldValidity = this.answerIsValid(data[field.name].value, field.answer, field);
                }
                if (field.explanation) {
                    data[field.name].explanation = field.explanation;
                }
                if (field.valuesType) {
                    /** @type {?} */
                    let value = data[field.name].value;
                    /** @type {?} */
                    let type = field.valuesType.find((/**
                     * @param {?} t
                     * @return {?}
                     */
                    t => t.key === value));
                    if (type) {
                        data[field.name].valueType = type.value;
                    }
                }
                if (field.valuesType && data[field.name] && data[field.name].value) {
                    /** @type {?} */
                    let values = [].concat(data[field.name].value);
                    values.forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    key => {
                        /** @type {?} */
                        let type = field.valuesType.find((/**
                         * @param {?} t
                         * @return {?}
                         */
                        t => t.key === key));
                        if (type) {
                            if (type.value === 'satisfactory') {
                                data.satisfactoryCount += 1;
                            }
                            else if (type.value === 'unsatisfactory') {
                                data.unsatisfactoryCount += 1;
                            }
                            else if (type.value === 'nonapplicable') {
                                data.nonapplicableCount += 1;
                            }
                        }
                    }));
                }
            }
        }));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    getTabName(field) {
        /** @type {?} */
        let retVal = '';
        if (field.tabIndex) {
            retVal += field.tabIndex + '. ';
        }
        if (field.tab) {
            retVal += this.translate.get(field.tab);
        }
        return retVal;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    encodeScoringValue(v) {
        if (v && v.toString) {
            return v.toString().replace(/\./, '_');
        }
        else {
            return v;
        }
    }
}
FormDynamicBuilder.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FormDynamicBuilder.ctorParameters = () => [
    { type: Translate }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormDynamicBuilder.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1keW5hbWljLWJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9mb3JtLWR5bmFtaWMtYnVpbGRlci9mb3JtLWR5bmFtaWMtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDLENBQUMsWUFBWTs7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBNkIsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUMsQ0FBQyxxQkFBcUI7O0FBQzVGLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvRixPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDLENBQUMsK0dBQStHOzs7O0FBRTVNLGtDQUVDO0FBR0QsTUFBTSxPQUFPLGtCQUFrQjs7OztJQUM3QixZQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3RDLHVJQUF1STtJQUN6SSxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSztRQUNoQyxPQUFPLGFBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLGtCQUFzQztRQUMvQyxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxH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QzthQUFNO1lBQ0wsT0FBTyxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7OztZQXJNRixVQUFVOzs7O1lBVkYsU0FBUzs7Ozs7OztJQVlKLHVDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJzsgLy8sIEluamVjdG9yXG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBTbGlkZSwgTWlzc2lvbkRlc2NyaXB0aW9uLCBNb2RlbHMgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7IC8vQ29uZGl0aW9uLCBTZXNzaW9uLFxuaW1wb3J0IHsgaXNQcmVzZW50LCBGb3JtRmllbGRUeXBlLCBJRm9ybUZpZWxkLCBnZXRVVUlELCBhbnN3ZXJJc1ZhbGlkIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuaW1wb3J0IHsgaXNBcnJheSwgaXNPYmplY3QsIGZvckVhY2gsIGZpbHRlciwgc29ydEJ5LCBpc051bWJlciwgaXNCb29sZWFuIH0gZnJvbSAnbG9kYXNoLWVzJzsgLy9jbG9uZURlZXAsIGlzRnVuY3Rpb24sIGtleXMsIGlzRW1wdHksICBpbmRleE9mLCBnZXQsIHNldCwgbWVyZ2VXaXRoLCBpbnRlcnNlY3Rpb24sIHJlc3VsdCwgIGlzU3RyaW5nLCBjb25jYXQsXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRDb250cm9sIHtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybUR5bmFtaWNCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZSkge1xuICAgIC8vcHJpdmF0ZSBidWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBzZXNzaW9uOiBTZXNzaW9uLCwgcHJpdmF0ZSBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnLCBwcml2YXRlIGxvZzogTG9nLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICB9XG5cbiAgZ2VuZXJhdGVGaWVsZE5hbWUoKSB7XG4gICAgcmV0dXJuIGdldFVVSUQoKTtcbiAgfVxuXG4gIGFuc3dlcklzVmFsaWQodmFsdWUsIGFuc3dlciwgZmllbGQpIHtcbiAgICByZXR1cm4gYW5zd2VySXNWYWxpZCh2YWx1ZSwgYW5zd2VyLCBmaWVsZCk7XG4gIH1cblxuICBoYXNTY29yaW5nKG1pc3Npb25kZXNjcmlwdGlvbjogTWlzc2lvbkRlc2NyaXB0aW9uKSB7XG4gICAgaWYgKG1pc3Npb25kZXNjcmlwdGlvbiAmJiBtaXNzaW9uZGVzY3JpcHRpb24uc2NvcmluZyAmJiBtaXNzaW9uZGVzY3JpcHRpb24uc2NvcmluZy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyAmJiBfc29tZShtaXNzaW9uZGVzY3JpcHRpb24uc2NvcmluZywgKHNjb3JlOiBhbnkpID0+IHNjb3JlLmlzQWN0aXZlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVNjb3JpbmcobWlzc2lvbjogYW55LCBkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgaWYgKG1pc3Npb24uZGVzY3JpcHRpb24uc2NvcmluZy5sZW5ndGggPiAxKSB7XG4gICAgICBtaXNzaW9uLmV4dHJhU2NvcmVzID0ge307XG4gICAgfVxuICAgIGZvckVhY2gobWlzc2lvbi5kZXNjcmlwdGlvbi5zY29yaW5nLCAoc2NvcmluZzogYW55KSA9PiB7XG4gICAgICAvL2xldCBzY29yaW5nID0gX2ZpbmQobWlzc2lvbi5kZXNjcmlwdGlvbi5zY29yaW5nLCAoczogYW55KSA9PiBzLmlzQWN0aXZlKTtcbiAgICAgIGxldCBzY29yZVZhbHVlID0gc2NvcmluZy5pbml0aWFsVmFsdWUgfHwgMDtcbiAgICAgIGxldCBzY29yZVBlcmNlbnRhZ2VCYXNpcyA9IHNjb3JpbmcucGVyY2VudGFnZUJhc2lzIHx8IDA7XG4gICAgICBmb3JFYWNoKGRhdGEsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc0FycmF5KHZhbHVlLnZhbHVlKSkge1xuICAgICAgICAgIGZvckVhY2godmFsdWUudmFsdWUsIHYgPT4ge1xuICAgICAgICAgICAgaWYgKHYgJiYgaXNOdW1iZXIoc2NvcmluZ1trZXkgKyB0aGlzLmVuY29kZVNjb3JpbmdWYWx1ZSh2KV0pKSB7XG4gICAgICAgICAgICAgIGxldCBudW1WYWx1ZSA9IHNjb3Jpbmdba2V5ICsgdGhpcy5lbmNvZGVTY29yaW5nVmFsdWUodildO1xuICAgICAgICAgICAgICBpZiAobnVtVmFsdWUgPCAwICYmIC1udW1WYWx1ZSAlIDEzMzcgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzY29yZVBlcmNlbnRhZ2VCYXNpcyAtPSAtbnVtVmFsdWUgLyAxMzM3O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3JlVmFsdWUgKz0gbnVtVmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmFsdWUgJiYgaXNOdW1iZXIoc2NvcmluZ1trZXkgKyB0aGlzLmVuY29kZVNjb3JpbmdWYWx1ZSh2YWx1ZS52YWx1ZSldKSkge1xuICAgICAgICAgICAgbGV0IG51bVZhbHVlID0gc2NvcmluZ1trZXkgKyB0aGlzLmVuY29kZVNjb3JpbmdWYWx1ZSh2YWx1ZS52YWx1ZSldO1xuICAgICAgICAgICAgaWYgKG51bVZhbHVlIDwgMCAmJiAtbnVtVmFsdWUgJSAxMzM3ID09PSAwKSB7XG4gICAgICAgICAgICAgIHNjb3JlUGVyY2VudGFnZUJhc2lzIC09IC1udW1WYWx1ZSAvIDEzMzc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzY29yZVZhbHVlICs9IG51bVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgaXNOdW1iZXIodmFsdWUudmFsdWUpICYmIGlzTnVtYmVyKHNjb3Jpbmdba2V5XSkpIHtcbiAgICAgICAgICAgIHNjb3JlVmFsdWUgKz0gdmFsdWUudmFsdWUgKiBzY29yaW5nW2tleV07XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUudmFsdWUpICYmIHNjb3Jpbmdba2V5ICsgJ3ZhbHVlJ10pIHtcbiAgICAgICAgICAgIC8vbm90IHN1cmUgd2h5IHdlIGhhdmUgdGhlICd2YWx1ZScgaW4gdGhlIGZvcm0gY3JlYXRvclxuICAgICAgICAgICAgaWYgKHZhbHVlLnZhbHVlICYmIGlzTnVtYmVyKHNjb3Jpbmdba2V5ICsgJ3ZhbHVlJ10udmFsdWUpKSB7XG4gICAgICAgICAgICAgIHNjb3JlVmFsdWUgKz0gc2NvcmluZ1trZXkgKyAndmFsdWUnXS52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlLnZhbHVlICYmIGlzTnVtYmVyKHNjb3Jpbmdba2V5ICsgJ3ZhbHVlJ10ubm92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgc2NvcmVWYWx1ZSArPSBzY29yaW5nW2tleSArICd2YWx1ZSddLm5vdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlICYmIGlzUHJlc2VudCh2YWx1ZS52YWx1ZSkgJiYgc2NvcmluZ1trZXkgKyAndmFsdWUnXSAmJiBpc051bWJlcihzY29yaW5nW2tleSArICd2YWx1ZSddLnZpc2libGUpKSB7XG4gICAgICAgICAgc2NvcmVQZXJjZW50YWdlQmFzaXMgKz0gc2NvcmluZ1trZXkgKyAndmFsdWUnXS52aXNpYmxlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNjb3JpbmcuaXNQZXJjZW50YWdlICYmIHNjb3JlUGVyY2VudGFnZUJhc2lzID4gMCkge1xuICAgICAgICBzY29yZVZhbHVlID0gTWF0aC5yb3VuZCgoc2NvcmVWYWx1ZSAqIDEwMCkgLyBzY29yZVBlcmNlbnRhZ2VCYXNpcyk7XG4gICAgICB9XG4gICAgICBsZXQgc2NvcmUgPSB7IHZhbHVlOiBzY29yZVZhbHVlLCBpc1BlcmNlbnRhZ2U6IHNjb3JpbmcuaXNQZXJjZW50YWdlLCB0aXRsZTogc2NvcmluZy50aXRsZSB9O1xuICAgICAgaWYgKHNjb3JpbmcuaXNBY3RpdmUgfHwgbWlzc2lvbi5kZXNjcmlwdGlvbi5zY29yaW5nLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBtaXNzaW9uLnNjb3JlID0gc2NvcmU7XG4gICAgICAgIGlmICgoc2NvcmluZy5taW5WYWx1ZSB8fCBzY29yaW5nLm1pblZhbHVlID09PSAwKSAmJiBzY29yZVZhbHVlIDwgc2NvcmluZy5taW5WYWx1ZSkge1xuICAgICAgICAgIG1pc3Npb24udmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoKHNjb3JpbmcubWluVmFsdWUgfHwgc2NvcmluZy5taW5WYWx1ZSA9PT0gMCkgJiYgc2NvcmVWYWx1ZSA+PSBzY29yaW5nLm1pblZhbHVlKSB7XG4gICAgICAgICAgZGVsZXRlIG1pc3Npb24udmFsaWRhdGVkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtaXNzaW9uLmV4dHJhU2NvcmVzW3Njb3JlLnRpdGxlXSA9IHNjb3JlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2FsY3VsYXRlU2NvcmluZ1F1aXp6KG1pc3Npb246IGFueSwgc2xpZGVzOiBBcnJheTxTbGlkZT4sIGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBsZXQgc2NvcmUgPSB7IHRvdGFsOiAwLCB2YWx1ZTogMCB9O1xuICAgIGxldCBmaWVsZHMgPSBNb2RlbHMuZ2V0RmllbGRzRnJvbVNsaWRlcyhzbGlkZXMpO1xuICAgIGZvckVhY2goZmllbGRzLCBmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQuYW5zd2VyICYmIGZpZWxkLmFuc3dlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNjb3JlLnRvdGFsICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoZGF0YVtmaWVsZC5uYW1lXSAmJiB0aGlzLmFuc3dlcklzVmFsaWQoZGF0YVtmaWVsZC5uYW1lXS52YWx1ZSwgZmllbGQuYW5zd2VyLCBmaWVsZCkpIHtcbiAgICAgICAgc2NvcmUudmFsdWUgKz0gMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBtaXNzaW9uLnNjb3JlID0gc2NvcmU7XG4gIH1cblxuICBoYXNUYWJzKGZvcm1EZWZpbml0aW9uOiBBcnJheTxJRm9ybUZpZWxkPikge1xuICAgIHJldHVybiBmb3JtRGVmaW5pdGlvbi5zb21lKGYgPT4gZi50YWIgJiYgZi50YWIubGVuZ3RoID4gMCk7XG4gIH1cblxuICBnZXRTbGlkZXMoZm9ybURlZmluaXRpb246IEFycmF5PElGb3JtRmllbGQ+KSB7XG4gICAgbGV0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBTbGlkZT4oKTtcbiAgICBtYXAuc2V0KCdHRU5FUkFMJywgPFNsaWRlPnsgdGl0bGU6IHRoaXMudHJhbnNsYXRlLmdldCgnR0VORVJBTCcpLCBpdGVtczogW10sIG9yZGVyOiAwIH0pO1xuICAgIGZvcm1EZWZpbml0aW9uLmZvckVhY2goZiA9PiB7XG4gICAgICBsZXQgdGFiTmFtZSA9IHRoaXMuZ2V0VGFiTmFtZShmKTtcbiAgICAgIGlmICghZi50YWIpIHtcbiAgICAgICAgbWFwLmdldCgnR0VORVJBTCcpLml0ZW1zLnB1c2goZik7XG4gICAgICB9IGVsc2UgaWYgKG1hcC5oYXModGFiTmFtZSkpIHtcbiAgICAgICAgbWFwLmdldCh0YWJOYW1lKS5pdGVtcy5wdXNoKGYpO1xuICAgICAgICBpZiAoZi50YWJDb25kaXRpb24pIHtcbiAgICAgICAgICBtYXAuZ2V0KHRhYk5hbWUpLmNvbmRpdGlvbiA9IDxhbnk+Zi50YWJDb25kaXRpb247XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5zZXQodGFiTmFtZSwgPFNsaWRlPnsgdGl0bGU6IHRhYk5hbWUsIGl0ZW1zOiBbZl0sIGNvbmRpdGlvbjogZi50YWJDb25kaXRpb24gfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlcihzb3J0QnkoQXJyYXkuZnJvbShtYXAudmFsdWVzKCkpLCBzbGlkZSA9PiBzbGlkZS50aXRsZSksIHNsaWRlID0+IHNsaWRlLml0ZW1zLmxlbmd0aCA+IDApO1xuICB9XG5cbiAgdXBkYXRlRGF0YUZpZWxkVHlwZShkYXRhLCBmaWVsZHM6IEFycmF5PElGb3JtRmllbGQ+KSB7XG4gICAgZGF0YS5ub25hcHBsaWNhYmxlQ291bnQgPSAwO1xuICAgIGRhdGEuc2F0aXNmYWN0b3J5Q291bnQgPSAwO1xuICAgIGRhdGEudW5zYXRpc2ZhY3RvcnlDb3VudCA9IDA7XG5cbiAgICBmb3JFYWNoKGZpZWxkcywgZmllbGQgPT4ge1xuICAgICAgaWYgKGlzT2JqZWN0KGRhdGFbZmllbGQubmFtZV0pKSB7XG4gICAgICAgIGRhdGFbZmllbGQubmFtZV0uZmllbGRUeXBlID0gZmllbGQudHlwZTtcbiAgICAgICAgZGF0YVtmaWVsZC5uYW1lXS5maWVsZFRpdGxlID0gZmllbGQudGl0bGU7XG5cbiAgICAgICAgaWYgKGRhdGFbZmllbGQubmFtZV0gJiYgZGF0YVtmaWVsZC5uYW1lXS52YWx1ZSAmJiBmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLnBob3RvICYmIGZpZWxkLnZhbHVlcyAmJiAoIWRhdGFbZmllbGQubmFtZV0udGFncyB8fCBkYXRhW2ZpZWxkLm5hbWVdLnRhZ3MubGVuZ3RoIDwgMSkpIHtcbiAgICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdLnRhZ3MgPSBmaWVsZC52YWx1ZXM7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YVtmaWVsZC5uYW1lXSAmJiBkYXRhW2ZpZWxkLm5hbWVdLnZhbHVlICYmIGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUubXVsdGlwaG90b3MgJiYgZmllbGQudmFsdWVzKSB7XG4gICAgICAgICAgZGF0YVtmaWVsZC5uYW1lXS5leHRyYURhdGEgPSBkYXRhW2ZpZWxkLm5hbWVdLmV4dHJhRGF0YSB8fCB7fTtcbiAgICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdLnZhbHVlLmZvckVhY2goKHYsIGkpID0+IHtcbiAgICAgICAgICAgIGRhdGFbZmllbGQubmFtZV0uZXh0cmFEYXRhW2ldID0gZGF0YVtmaWVsZC5uYW1lXS5leHRyYURhdGFbaV0gfHwge307XG4gICAgICAgICAgICBpZiAoIWRhdGFbZmllbGQubmFtZV0uZXh0cmFEYXRhW2ldLnRhZ3MgfHwgZGF0YVtmaWVsZC5uYW1lXS5leHRyYURhdGFbaV0udGFncy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgIGRhdGFbZmllbGQubmFtZV0uZXh0cmFEYXRhW2ldLnRhZ3MgPSBmaWVsZC52YWx1ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmllbGQuc2hhcmVUb0ZlZWQpIHtcbiAgICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdLmZpZWxkU2hhcmVUb0ZlZWQgPSBmaWVsZC5zaGFyZVRvRmVlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmllbGQuYW5zd2VyKSB7XG4gICAgICAgICAgZGF0YVtmaWVsZC5uYW1lXS5hbnN3ZXIgPSBmaWVsZC5hbnN3ZXI7XG4gICAgICAgICAgZGF0YVtmaWVsZC5uYW1lXS5maWVsZFZhbGlkaXR5ID0gdGhpcy5hbnN3ZXJJc1ZhbGlkKGRhdGFbZmllbGQubmFtZV0udmFsdWUsIGZpZWxkLmFuc3dlciwgZmllbGQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWVsZC5leHBsYW5hdGlvbikge1xuICAgICAgICAgIGRhdGFbZmllbGQubmFtZV0uZXhwbGFuYXRpb24gPSBmaWVsZC5leHBsYW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmllbGQudmFsdWVzVHlwZSkge1xuICAgICAgICAgIGxldCB2YWx1ZSA9IGRhdGFbZmllbGQubmFtZV0udmFsdWU7XG4gICAgICAgICAgbGV0IHR5cGUgPSBmaWVsZC52YWx1ZXNUeXBlLmZpbmQodCA9PiB0LmtleSA9PT0gdmFsdWUpO1xuICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdLnZhbHVlVHlwZSA9IHR5cGUudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpZWxkLnZhbHVlc1R5cGUgJiYgZGF0YVtmaWVsZC5uYW1lXSAmJiBkYXRhW2ZpZWxkLm5hbWVdLnZhbHVlKSB7XG4gICAgICAgICAgbGV0IHZhbHVlczogQXJyYXk8YW55PiA9IFtdLmNvbmNhdChkYXRhW2ZpZWxkLm5hbWVdLnZhbHVlKTtcbiAgICAgICAgICB2YWx1ZXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBmaWVsZC52YWx1ZXNUeXBlLmZpbmQodCA9PiB0LmtleSA9PT0ga2V5KTtcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlLnZhbHVlID09PSAnc2F0aXNmYWN0b3J5Jykge1xuICAgICAgICAgICAgICAgIGRhdGEuc2F0aXNmYWN0b3J5Q291bnQgKz0gMTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlLnZhbHVlID09PSAndW5zYXRpc2ZhY3RvcnknKSB7XG4gICAgICAgICAgICAgICAgZGF0YS51bnNhdGlzZmFjdG9yeUNvdW50ICs9IDE7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZS52YWx1ZSA9PT0gJ25vbmFwcGxpY2FibGUnKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5ub25hcHBsaWNhYmxlQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRUYWJOYW1lKGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgbGV0IHJldFZhbCA9ICcnO1xuICAgIGlmIChmaWVsZC50YWJJbmRleCkge1xuICAgICAgcmV0VmFsICs9IGZpZWxkLnRhYkluZGV4ICsgJy4gJztcbiAgICB9XG4gICAgaWYgKGZpZWxkLnRhYikge1xuICAgICAgcmV0VmFsICs9IHRoaXMudHJhbnNsYXRlLmdldChmaWVsZC50YWIpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgZW5jb2RlU2NvcmluZ1ZhbHVlKHYpIHtcbiAgICBpZiAodiAmJiB2LnRvU3RyaW5nKSB7XG4gICAgICByZXR1cm4gdi50b1N0cmluZygpLnJlcGxhY2UoL1xcLi8sICdfJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgfVxufVxuIl19
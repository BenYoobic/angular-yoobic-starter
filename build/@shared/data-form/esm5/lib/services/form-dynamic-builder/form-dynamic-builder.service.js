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
var FormDynamicBuilder = /** @class */ (function () {
    function FormDynamicBuilder(translate) {
        this.translate = translate;
        //private builder: FormBuilder, private session: Session,, private coreConfig: CoreConfig, private log: Log, private injector: Injector
    }
    /**
     * @return {?}
     */
    FormDynamicBuilder.prototype.generateFieldName = /**
     * @return {?}
     */
    function () {
        return getUUID();
    };
    /**
     * @param {?} value
     * @param {?} answer
     * @param {?} field
     * @return {?}
     */
    FormDynamicBuilder.prototype.answerIsValid = /**
     * @param {?} value
     * @param {?} answer
     * @param {?} field
     * @return {?}
     */
    function (value, answer, field) {
        return answerIsValid(value, answer, field);
    };
    /**
     * @param {?} missiondescription
     * @return {?}
     */
    FormDynamicBuilder.prototype.hasScoring = /**
     * @param {?} missiondescription
     * @return {?}
     */
    function (missiondescription) {
        if (missiondescription && missiondescription.scoring && missiondescription.scoring.length > 0) {
            // && _some(missiondescription.scoring, (score: any) => score.isActive)) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} mission
     * @param {?} data
     * @return {?}
     */
    FormDynamicBuilder.prototype.calculateScoring = /**
     * @param {?} mission
     * @param {?} data
     * @return {?}
     */
    function (mission, data) {
        var _this = this;
        if (mission.description.scoring.length > 1) {
            mission.extraScores = {};
        }
        forEach(mission.description.scoring, (/**
         * @param {?} scoring
         * @return {?}
         */
        function (scoring) {
            //let scoring = _find(mission.description.scoring, (s: any) => s.isActive);
            /** @type {?} */
            var scoreValue = scoring.initialValue || 0;
            /** @type {?} */
            var scorePercentageBasis = scoring.percentageBasis || 0;
            forEach(data, (/**
             * @param {?} value
             * @param {?} key
             * @return {?}
             */
            function (value, key) {
                if (value && isArray(value.value)) {
                    forEach(value.value, (/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) {
                        if (v && isNumber(scoring[key + _this.encodeScoringValue(v)])) {
                            /** @type {?} */
                            var numValue = scoring[key + _this.encodeScoringValue(v)];
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
                    if (value && isNumber(scoring[key + _this.encodeScoringValue(value.value)])) {
                        /** @type {?} */
                        var numValue = scoring[key + _this.encodeScoringValue(value.value)];
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
            var score = { value: scoreValue, isPercentage: scoring.isPercentage, title: scoring.title };
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
    };
    /**
     * @param {?} mission
     * @param {?} slides
     * @param {?} data
     * @return {?}
     */
    FormDynamicBuilder.prototype.calculateScoringQuizz = /**
     * @param {?} mission
     * @param {?} slides
     * @param {?} data
     * @return {?}
     */
    function (mission, slides, data) {
        var _this = this;
        /** @type {?} */
        var score = { total: 0, value: 0 };
        /** @type {?} */
        var fields = Models.getFieldsFromSlides(slides);
        forEach(fields, (/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            if (field.answer && field.answer.length > 0) {
                score.total += 1;
            }
            if (data[field.name] && _this.answerIsValid(data[field.name].value, field.answer, field)) {
                score.value += 1;
            }
        }));
        mission.score = score;
    };
    /**
     * @param {?} formDefinition
     * @return {?}
     */
    FormDynamicBuilder.prototype.hasTabs = /**
     * @param {?} formDefinition
     * @return {?}
     */
    function (formDefinition) {
        return formDefinition.some((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.tab && f.tab.length > 0; }));
    };
    /**
     * @param {?} formDefinition
     * @return {?}
     */
    FormDynamicBuilder.prototype.getSlides = /**
     * @param {?} formDefinition
     * @return {?}
     */
    function (formDefinition) {
        var _this = this;
        /** @type {?} */
        var map = new Map();
        map.set('GENERAL', (/** @type {?} */ ({ title: this.translate.get('GENERAL'), items: [], order: 0 })));
        formDefinition.forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            /** @type {?} */
            var tabName = _this.getTabName(f);
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
        function (slide) { return slide.title; })), (/**
         * @param {?} slide
         * @return {?}
         */
        function (slide) { return slide.items.length > 0; }));
    };
    /**
     * @param {?} data
     * @param {?} fields
     * @return {?}
     */
    FormDynamicBuilder.prototype.updateDataFieldType = /**
     * @param {?} data
     * @param {?} fields
     * @return {?}
     */
    function (data, fields) {
        var _this = this;
        data.nonapplicableCount = 0;
        data.satisfactoryCount = 0;
        data.unsatisfactoryCount = 0;
        forEach(fields, (/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
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
                    function (v, i) {
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
                    data[field.name].fieldValidity = _this.answerIsValid(data[field.name].value, field.answer, field);
                }
                if (field.explanation) {
                    data[field.name].explanation = field.explanation;
                }
                if (field.valuesType) {
                    /** @type {?} */
                    var value_1 = data[field.name].value;
                    /** @type {?} */
                    var type = field.valuesType.find((/**
                     * @param {?} t
                     * @return {?}
                     */
                    function (t) { return t.key === value_1; }));
                    if (type) {
                        data[field.name].valueType = type.value;
                    }
                }
                if (field.valuesType && data[field.name] && data[field.name].value) {
                    /** @type {?} */
                    var values = [].concat(data[field.name].value);
                    values.forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) {
                        /** @type {?} */
                        var type = field.valuesType.find((/**
                         * @param {?} t
                         * @return {?}
                         */
                        function (t) { return t.key === key; }));
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
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FormDynamicBuilder.prototype.getTabName = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var retVal = '';
        if (field.tabIndex) {
            retVal += field.tabIndex + '. ';
        }
        if (field.tab) {
            retVal += this.translate.get(field.tab);
        }
        return retVal;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    FormDynamicBuilder.prototype.encodeScoringValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        if (v && v.toString) {
            return v.toString().replace(/\./, '_');
        }
        else {
            return v;
        }
    };
    FormDynamicBuilder.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FormDynamicBuilder.ctorParameters = function () { return [
        { type: Translate }
    ]; };
    return FormDynamicBuilder;
}());
export { FormDynamicBuilder };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormDynamicBuilder.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1keW5hbWljLWJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9mb3JtLWR5bmFtaWMtYnVpbGRlci9mb3JtLWR5bmFtaWMtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDLENBQUMsWUFBWTs7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBNkIsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUMsQ0FBQyxxQkFBcUI7O0FBQzVGLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvRixPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDLENBQUMsK0dBQStHOzs7O0FBRTVNLGtDQUVDO0FBRUQ7SUFFRSw0QkFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUN0Qyx1SUFBdUk7SUFDekksQ0FBQzs7OztJQUVELDhDQUFpQjs7O0lBQWpCO1FBQ0UsT0FBTyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7Ozs7O0lBRUQsMENBQWE7Ozs7OztJQUFiLFVBQWMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLO1FBQ2hDLE9BQU8sYUFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFFRCx1Q0FBVTs7OztJQUFWLFVBQVcsa0JBQXNDO1FBQy9DLElBQUksa0JBQWtCLElBQUksa0JBQWtCLENBQUMsT0FBTyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FB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LFVBQW1CLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNuQixPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQzs7Z0JBck1GLFVBQVU7Ozs7Z0JBVkYsU0FBUzs7SUFnTmxCLHlCQUFDO0NBQUEsQUF0TUQsSUFzTUM7U0FyTVksa0JBQWtCOzs7Ozs7SUFDakIsdUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnOyAvLywgSW5qZWN0b3JcbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcbmltcG9ydCB7IFNsaWRlLCBNaXNzaW9uRGVzY3JpcHRpb24sIE1vZGVscyB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJzsgLy9Db25kaXRpb24sIFNlc3Npb24sXG5pbXBvcnQgeyBpc1ByZXNlbnQsIEZvcm1GaWVsZFR5cGUsIElGb3JtRmllbGQsIGdldFVVSUQsIGFuc3dlcklzVmFsaWQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBpc0FycmF5LCBpc09iamVjdCwgZm9yRWFjaCwgZmlsdGVyLCBzb3J0QnksIGlzTnVtYmVyLCBpc0Jvb2xlYW4gfSBmcm9tICdsb2Rhc2gtZXMnOyAvL2Nsb25lRGVlcCwgaXNGdW5jdGlvbiwga2V5cywgaXNFbXB0eSwgIGluZGV4T2YsIGdldCwgc2V0LCBtZXJnZVdpdGgsIGludGVyc2VjdGlvbiwgcmVzdWx0LCAgaXNTdHJpbmcsIGNvbmNhdCxcblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZENvbnRyb2wge1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtRHluYW1pY0J1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlKSB7XG4gICAgLy9wcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIHNlc3Npb246IFNlc3Npb24sLCBwcml2YXRlIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByaXZhdGUgbG9nOiBMb2csIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gIH1cblxuICBnZW5lcmF0ZUZpZWxkTmFtZSgpIHtcbiAgICByZXR1cm4gZ2V0VVVJRCgpO1xuICB9XG5cbiAgYW5zd2VySXNWYWxpZCh2YWx1ZSwgYW5zd2VyLCBmaWVsZCkge1xuICAgIHJldHVybiBhbnN3ZXJJc1ZhbGlkKHZhbHVlLCBhbnN3ZXIsIGZpZWxkKTtcbiAgfVxuXG4gIGhhc1Njb3JpbmcobWlzc2lvbmRlc2NyaXB0aW9uOiBNaXNzaW9uRGVzY3JpcHRpb24pIHtcbiAgICBpZiAobWlzc2lvbmRlc2NyaXB0aW9uICYmIG1pc3Npb25kZXNjcmlwdGlvbi5zY29yaW5nICYmIG1pc3Npb25kZXNjcmlwdGlvbi5zY29yaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vICYmIF9zb21lKG1pc3Npb25kZXNjcmlwdGlvbi5zY29yaW5nLCAoc2NvcmU6IGFueSkgPT4gc2NvcmUuaXNBY3RpdmUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2FsY3VsYXRlU2NvcmluZyhtaXNzaW9uOiBhbnksIGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBpZiAobWlzc2lvbi5kZXNjcmlwdGlvbi5zY29yaW5nLmxlbmd0aCA+IDEpIHtcbiAgICAgIG1pc3Npb24uZXh0cmFTY29yZXMgPSB7fTtcbiAgICB9XG4gICAgZm9yRWFjaChtaXNzaW9uLmRlc2NyaXB0aW9uLnNjb3JpbmcsIChzY29yaW5nOiBhbnkpID0+IHtcbiAgICAgIC8vbGV0IHNjb3JpbmcgPSBfZmluZChtaXNzaW9uLmRlc2NyaXB0aW9uLnNjb3JpbmcsIChzOiBhbnkpID0+IHMuaXNBY3RpdmUpO1xuICAgICAgbGV0IHNjb3JlVmFsdWUgPSBzY29yaW5nLmluaXRpYWxWYWx1ZSB8fCAwO1xuICAgICAgbGV0IHNjb3JlUGVyY2VudGFnZUJhc2lzID0gc2NvcmluZy5wZXJjZW50YWdlQmFzaXMgfHwgMDtcbiAgICAgIGZvckVhY2goZGF0YSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlICYmIGlzQXJyYXkodmFsdWUudmFsdWUpKSB7XG4gICAgICAgICAgZm9yRWFjaCh2YWx1ZS52YWx1ZSwgdiA9PiB7XG4gICAgICAgICAgICBpZiAodiAmJiBpc051bWJlcihzY29yaW5nW2tleSArIHRoaXMuZW5jb2RlU2NvcmluZ1ZhbHVlKHYpXSkpIHtcbiAgICAgICAgICAgICAgbGV0IG51bVZhbHVlID0gc2NvcmluZ1trZXkgKyB0aGlzLmVuY29kZVNjb3JpbmdWYWx1ZSh2KV07XG4gICAgICAgICAgICAgIGlmIChudW1WYWx1ZSA8IDAgJiYgLW51bVZhbHVlICUgMTMzNyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNjb3JlUGVyY2VudGFnZUJhc2lzIC09IC1udW1WYWx1ZSAvIDEzMzc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcmVWYWx1ZSArPSBudW1WYWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2YWx1ZSAmJiBpc051bWJlcihzY29yaW5nW2tleSArIHRoaXMuZW5jb2RlU2NvcmluZ1ZhbHVlKHZhbHVlLnZhbHVlKV0pKSB7XG4gICAgICAgICAgICBsZXQgbnVtVmFsdWUgPSBzY29yaW5nW2tleSArIHRoaXMuZW5jb2RlU2NvcmluZ1ZhbHVlKHZhbHVlLnZhbHVlKV07XG4gICAgICAgICAgICBpZiAobnVtVmFsdWUgPCAwICYmIC1udW1WYWx1ZSAlIDEzMzcgPT09IDApIHtcbiAgICAgICAgICAgICAgc2NvcmVQZXJjZW50YWdlQmFzaXMgLT0gLW51bVZhbHVlIC8gMTMzNztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNjb3JlVmFsdWUgKz0gbnVtVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAmJiBpc051bWJlcih2YWx1ZS52YWx1ZSkgJiYgaXNOdW1iZXIoc2NvcmluZ1trZXldKSkge1xuICAgICAgICAgICAgc2NvcmVWYWx1ZSArPSB2YWx1ZS52YWx1ZSAqIHNjb3Jpbmdba2V5XTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZS52YWx1ZSkgJiYgc2NvcmluZ1trZXkgKyAndmFsdWUnXSkge1xuICAgICAgICAgICAgLy9ub3Qgc3VyZSB3aHkgd2UgaGF2ZSB0aGUgJ3ZhbHVlJyBpbiB0aGUgZm9ybSBjcmVhdG9yXG4gICAgICAgICAgICBpZiAodmFsdWUudmFsdWUgJiYgaXNOdW1iZXIoc2NvcmluZ1trZXkgKyAndmFsdWUnXS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgc2NvcmVWYWx1ZSArPSBzY29yaW5nW2tleSArICd2YWx1ZSddLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsdWUudmFsdWUgJiYgaXNOdW1iZXIoc2NvcmluZ1trZXkgKyAndmFsdWUnXS5ub3ZhbHVlKSkge1xuICAgICAgICAgICAgICBzY29yZVZhbHVlICs9IHNjb3Jpbmdba2V5ICsgJ3ZhbHVlJ10ubm92YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgJiYgaXNQcmVzZW50KHZhbHVlLnZhbHVlKSAmJiBzY29yaW5nW2tleSArICd2YWx1ZSddICYmIGlzTnVtYmVyKHNjb3Jpbmdba2V5ICsgJ3ZhbHVlJ10udmlzaWJsZSkpIHtcbiAgICAgICAgICBzY29yZVBlcmNlbnRhZ2VCYXNpcyArPSBzY29yaW5nW2tleSArICd2YWx1ZSddLnZpc2libGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc2NvcmluZy5pc1BlcmNlbnRhZ2UgJiYgc2NvcmVQZXJjZW50YWdlQmFzaXMgPiAwKSB7XG4gICAgICAgIHNjb3JlVmFsdWUgPSBNYXRoLnJvdW5kKChzY29yZVZhbHVlICogMTAwKSAvIHNjb3JlUGVyY2VudGFnZUJhc2lzKTtcbiAgICAgIH1cbiAgICAgIGxldCBzY29yZSA9IHsgdmFsdWU6IHNjb3JlVmFsdWUsIGlzUGVyY2VudGFnZTogc2NvcmluZy5pc1BlcmNlbnRhZ2UsIHRpdGxlOiBzY29yaW5nLnRpdGxlIH07XG4gICAgICBpZiAoc2NvcmluZy5pc0FjdGl2ZSB8fCBtaXNzaW9uLmRlc2NyaXB0aW9uLnNjb3JpbmcubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1pc3Npb24uc2NvcmUgPSBzY29yZTtcbiAgICAgICAgaWYgKChzY29yaW5nLm1pblZhbHVlIHx8IHNjb3JpbmcubWluVmFsdWUgPT09IDApICYmIHNjb3JlVmFsdWUgPCBzY29yaW5nLm1pblZhbHVlKSB7XG4gICAgICAgICAgbWlzc2lvbi52YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICgoc2NvcmluZy5taW5WYWx1ZSB8fCBzY29yaW5nLm1pblZhbHVlID09PSAwKSAmJiBzY29yZVZhbHVlID49IHNjb3JpbmcubWluVmFsdWUpIHtcbiAgICAgICAgICBkZWxldGUgbWlzc2lvbi52YWxpZGF0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pc3Npb24uZXh0cmFTY29yZXNbc2NvcmUudGl0bGVdID0gc2NvcmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjYWxjdWxhdGVTY29yaW5nUXVpenoobWlzc2lvbjogYW55LCBzbGlkZXM6IEFycmF5PFNsaWRlPiwgZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xuICAgIGxldCBzY29yZSA9IHsgdG90YWw6IDAsIHZhbHVlOiAwIH07XG4gICAgbGV0IGZpZWxkcyA9IE1vZGVscy5nZXRGaWVsZHNGcm9tU2xpZGVzKHNsaWRlcyk7XG4gICAgZm9yRWFjaChmaWVsZHMsIGZpZWxkID0+IHtcbiAgICAgIGlmIChmaWVsZC5hbnN3ZXIgJiYgZmllbGQuYW5zd2VyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2NvcmUudG90YWwgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRhW2ZpZWxkLm5hbWVdICYmIHRoaXMuYW5zd2VySXNWYWxpZChkYXRhW2ZpZWxkLm5hbWVdLnZhbHVlLCBmaWVsZC5hbnN3ZXIsIGZpZWxkKSkge1xuICAgICAgICBzY29yZS52YWx1ZSArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG1pc3Npb24uc2NvcmUgPSBzY29yZTtcbiAgfVxuXG4gIGhhc1RhYnMoZm9ybURlZmluaXRpb246IEFycmF5PElGb3JtRmllbGQ+KSB7XG4gICAgcmV0dXJuIGZvcm1EZWZpbml0aW9uLnNvbWUoZiA9PiBmLnRhYiAmJiBmLnRhYi5sZW5ndGggPiAwKTtcbiAgfVxuXG4gIGdldFNsaWRlcyhmb3JtRGVmaW5pdGlvbjogQXJyYXk8SUZvcm1GaWVsZD4pIHtcbiAgICBsZXQgbWFwID0gbmV3IE1hcDxzdHJpbmcsIFNsaWRlPigpO1xuICAgIG1hcC5zZXQoJ0dFTkVSQUwnLCA8U2xpZGU+eyB0aXRsZTogdGhpcy50cmFuc2xhdGUuZ2V0KCdHRU5FUkFMJyksIGl0ZW1zOiBbXSwgb3JkZXI6IDAgfSk7XG4gICAgZm9ybURlZmluaXRpb24uZm9yRWFjaChmID0+IHtcbiAgICAgIGxldCB0YWJOYW1lID0gdGhpcy5nZXRUYWJOYW1lKGYpO1xuICAgICAgaWYgKCFmLnRhYikge1xuICAgICAgICBtYXAuZ2V0KCdHRU5FUkFMJykuaXRlbXMucHVzaChmKTtcbiAgICAgIH0gZWxzZSBpZiAobWFwLmhhcyh0YWJOYW1lKSkge1xuICAgICAgICBtYXAuZ2V0KHRhYk5hbWUpLml0ZW1zLnB1c2goZik7XG4gICAgICAgIGlmIChmLnRhYkNvbmRpdGlvbikge1xuICAgICAgICAgIG1hcC5nZXQodGFiTmFtZSkuY29uZGl0aW9uID0gPGFueT5mLnRhYkNvbmRpdGlvbjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLnNldCh0YWJOYW1lLCA8U2xpZGU+eyB0aXRsZTogdGFiTmFtZSwgaXRlbXM6IFtmXSwgY29uZGl0aW9uOiBmLnRhYkNvbmRpdGlvbiB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyKHNvcnRCeShBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSksIHNsaWRlID0+IHNsaWRlLnRpdGxlKSwgc2xpZGUgPT4gc2xpZGUuaXRlbXMubGVuZ3RoID4gMCk7XG4gIH1cblxuICB1cGRhdGVEYXRhRmllbGRUeXBlKGRhdGEsIGZpZWxkczogQXJyYXk8SUZvcm1GaWVsZD4pIHtcbiAgICBkYXRhLm5vbmFwcGxpY2FibGVDb3VudCA9IDA7XG4gICAgZGF0YS5zYXRpc2ZhY3RvcnlDb3VudCA9IDA7XG4gICAgZGF0YS51bnNhdGlzZmFjdG9yeUNvdW50ID0gMDtcblxuICAgIGZvckVhY2goZmllbGRzLCBmaWVsZCA9PiB7XG4gICAgICBpZiAoaXNPYmplY3QoZGF0YVtmaWVsZC5uYW1lXSkpIHtcbiAgICAgICAgZGF0YVtmaWVsZC5uYW1lXS5maWVsZFR5cGUgPSBmaWVsZC50eXBlO1xuICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdLmZpZWxkVGl0bGUgPSBmaWVsZC50aXRsZTtcblxuICAgICAgICBpZiAoZGF0YVtmaWVsZC5uYW1lXSAmJiBkYXRhW2ZpZWxkLm5hbWVdLnZhbHVlICYmIGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUucGhvdG8gJiYgZmllbGQudmFsdWVzICYmICghZGF0YVtmaWVsZC5uYW1lXS50YWdzIHx8IGRhdGFbZmllbGQubmFtZV0udGFncy5sZW5ndGggPCAxKSkge1xuICAgICAgICAgIGRhdGFbZmllbGQubmFtZV0udGFncyA9IGZpZWxkLnZhbHVlcztcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhW2ZpZWxkLm5hbWVdICYmIGRhdGFbZmllbGQubmFtZV0udmFsdWUgJiYgZmllbGQudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5tdWx0aXBob3RvcyAmJiBmaWVsZC52YWx1ZXMpIHtcbiAgICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdLmV4dHJhRGF0YSA9IGRhdGFbZmllbGQubmFtZV0uZXh0cmFEYXRhIHx8IHt9O1xuICAgICAgICAgIGRhdGFbZmllbGQubmFtZV0udmFsdWUuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgZGF0YVtmaWVsZC5uYW1lXS5leHRyYURhdGFbaV0gPSBkYXRhW2ZpZWxkLm5hbWVdLmV4dHJhRGF0YVtpXSB8fCB7fTtcbiAgICAgICAgICAgIGlmICghZGF0YVtmaWVsZC5uYW1lXS5leHRyYURhdGFbaV0udGFncyB8fCBkYXRhW2ZpZWxkLm5hbWVdLmV4dHJhRGF0YVtpXS50YWdzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgZGF0YVtmaWVsZC5uYW1lXS5leHRyYURhdGFbaV0udGFncyA9IGZpZWxkLnZhbHVlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWVsZC5zaGFyZVRvRmVlZCkge1xuICAgICAgICAgIGRhdGFbZmllbGQubmFtZV0uZmllbGRTaGFyZVRvRmVlZCA9IGZpZWxkLnNoYXJlVG9GZWVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWVsZC5hbnN3ZXIpIHtcbiAgICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdLmFuc3dlciA9IGZpZWxkLmFuc3dlcjtcbiAgICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdLmZpZWxkVmFsaWRpdHkgPSB0aGlzLmFuc3dlcklzVmFsaWQoZGF0YVtmaWVsZC5uYW1lXS52YWx1ZSwgZmllbGQuYW5zd2VyLCBmaWVsZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLmV4cGxhbmF0aW9uKSB7XG4gICAgICAgICAgZGF0YVtmaWVsZC5uYW1lXS5leHBsYW5hdGlvbiA9IGZpZWxkLmV4cGxhbmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWVsZC52YWx1ZXNUeXBlKSB7XG4gICAgICAgICAgbGV0IHZhbHVlID0gZGF0YVtmaWVsZC5uYW1lXS52YWx1ZTtcbiAgICAgICAgICBsZXQgdHlwZSA9IGZpZWxkLnZhbHVlc1R5cGUuZmluZCh0ID0+IHQua2V5ID09PSB2YWx1ZSk7XG4gICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIGRhdGFbZmllbGQubmFtZV0udmFsdWVUeXBlID0gdHlwZS52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmllbGQudmFsdWVzVHlwZSAmJiBkYXRhW2ZpZWxkLm5hbWVdICYmIGRhdGFbZmllbGQubmFtZV0udmFsdWUpIHtcbiAgICAgICAgICBsZXQgdmFsdWVzOiBBcnJheTxhbnk+ID0gW10uY29uY2F0KGRhdGFbZmllbGQubmFtZV0udmFsdWUpO1xuICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IGZpZWxkLnZhbHVlc1R5cGUuZmluZCh0ID0+IHQua2V5ID09PSBrZXkpO1xuICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGUudmFsdWUgPT09ICdzYXRpc2ZhY3RvcnknKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5zYXRpc2ZhY3RvcnlDb3VudCArPSAxO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUudmFsdWUgPT09ICd1bnNhdGlzZmFjdG9yeScpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnVuc2F0aXNmYWN0b3J5Q291bnQgKz0gMTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlLnZhbHVlID09PSAnbm9uYXBwbGljYWJsZScpIHtcbiAgICAgICAgICAgICAgICBkYXRhLm5vbmFwcGxpY2FibGVDb3VudCArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFRhYk5hbWUoZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICBsZXQgcmV0VmFsID0gJyc7XG4gICAgaWYgKGZpZWxkLnRhYkluZGV4KSB7XG4gICAgICByZXRWYWwgKz0gZmllbGQudGFiSW5kZXggKyAnLiAnO1xuICAgIH1cbiAgICBpZiAoZmllbGQudGFiKSB7XG4gICAgICByZXRWYWwgKz0gdGhpcy50cmFuc2xhdGUuZ2V0KGZpZWxkLnRhYik7XG4gICAgfVxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBlbmNvZGVTY29yaW5nVmFsdWUodikge1xuICAgIGlmICh2ICYmIHYudG9TdHJpbmcpIHtcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKCkucmVwbGFjZSgvXFwuLywgJ18nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICB9XG59XG4iXX0=
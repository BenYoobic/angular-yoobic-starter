/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormFieldType } from '@shared/stencil';
import { MISSION_STATUS } from '../../interfaces/mission-description/mission-description.interface';
import { Models } from '../models/models.service';
import { cloneDeep, uniq, concat, forEach } from 'lodash-es';
var Missiondescriptions = /** @class */ (function () {
    function Missiondescriptions() {
    }
    /*
          Return the transform to extract the fields from a mission description
      */
    /*
            Return the transform to extract the fields from a mission description
        */
    /**
     * @param {?=} types
     * @return {?}
     */
    Missiondescriptions.getFieldTransform = /*
            Return the transform to extract the fields from a mission description
        */
    /**
     * @param {?=} types
     * @return {?}
     */
    function (types) {
        if (types === void 0) { types = []; }
        return Models.getFieldTransform(types);
    };
    /*
          Return the list of slide items fields from a mission description (mobile type)
      */
    /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    Missiondescriptions.getFields = /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    function (missiondescription, types, excludedTypes) {
        if (types === void 0) { types = []; }
        if (excludedTypes === void 0) { excludedTypes = []; }
        return Models.getFields(missiondescription, types, excludedTypes);
    };
    /*
          Return the list of slide items fields from an array of slides (mobile type)
      */
    /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    Missiondescriptions.getFieldsFromSlides = /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    function (slides, types, excludedTypes) {
        if (types === void 0) { types = []; }
        if (excludedTypes === void 0) { excludedTypes = []; }
        return Models.getFieldsFromSlides(slides, types, excludedTypes);
    };
    /*
          Return the list of form field from a mission description. Used in the mission data grid and form
      */
    /*
            Return the list of form field from a mission description. Used in the mission data grid and form
        */
    /**
     * @param {?} missiondescription
     * @param {?} translate
     * @param {?=} includeComments
     * @return {?}
     */
    Missiondescriptions.getFormFields = /*
            Return the list of form field from a mission description. Used in the mission data grid and form
        */
    /**
     * @param {?} missiondescription
     * @param {?} translate
     * @param {?=} includeComments
     * @return {?}
     */
    function (missiondescription, translate, includeComments) {
        if (includeComments === void 0) { includeComments = false; }
        /** @type {?} */
        var mobileFields = Models.getFields(missiondescription, null, ['information']);
        mobileFields = mobileFields.reduce((/**
         * @param {?} previous
         * @param {?} current
         * @return {?}
         */
        function (previous, current) {
            /** @type {?} */
            var retVal = cloneDeep(current);
            retVal.name += '.value';
            retVal.operators = Models.getFieldOperator(current);
            //retVal.type = Models.getFormFieldFromMobileField(retVal.type);
            previous.push(retVal);
            if (current.allowComments && includeComments) {
                retVal = cloneDeep(current);
                retVal.title = translate.polyglot(retVal.title) + ' .C';
                retVal.name += '.comments';
                retVal.type = FormFieldType.text;
                previous.push(retVal);
            }
            if (current.allowTime && includeComments) {
                retVal = cloneDeep(current);
                retVal.title = translate.polyglot(retVal.title) + ' .T';
                retVal.name += '.time';
                retVal.type = FormFieldType.datetime;
                previous.push(retVal);
            }
            return previous;
        }), []);
        if (missiondescription.type === 'service') {
            mobileFields.unshift({
                name: 'mission.status',
                title: 'STATUS',
                type: FormFieldType.autocomplete,
                translate: true,
                values: uniq(concat(MISSION_STATUS, [undefined])),
                handleUndefined: true,
                columnDefinition: { cellRenderer: 'missionStatusRenderer' },
                operators: Models.getFieldOperator({ type: FormFieldType.autocomplete })
            });
            mobileFields.unshift({
                name: 'mission.creatorDisplayName',
                title: 'REQUESTOR',
                type: FormFieldType.text,
                operators: Models.getFieldOperator({ type: FormFieldType.text })
            });
            mobileFields.unshift({
                name: 'mission._ect',
                title: 'CREATIONDATE',
                type: FormFieldType.datetime,
                operators: Models.getFieldOperator({ type: FormFieldType.datetime })
            });
        }
        if (missiondescription.scoring && missiondescription.scoring.length > 0) {
            forEach(missiondescription.scoring, (/**
             * @param {?} scoring
             * @return {?}
             */
            function (scoring) {
                if (scoring.isActive !== true) {
                    mobileFields.unshift({
                        name: 'extraScores.' + scoring.title + '.value',
                        title: scoring.title,
                        type: FormFieldType.number
                    });
                }
                else {
                    mobileFields.unshift({ name: 'score.value', title: scoring.title, type: FormFieldType.number });
                }
            }));
        }
        return mobileFields;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    Missiondescriptions.encodeScoringValue = /**
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
    Missiondescriptions.decorators = [
        { type: Injectable }
    ];
    return Missiondescriptions;
}());
export { Missiondescriptions };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2lvbmRlc2NyaXB0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21pc3Npb25kZXNjcmlwdGlvbnMvbWlzc2lvbmRlc2NyaXB0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RCxPQUFPLEVBQXNCLGNBQWMsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUdsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTdEO0lBQUE7SUFtR0EsQ0FBQztJQWpHQzs7UUFFSTs7Ozs7Ozs7SUFDRyxxQ0FBaUI7Ozs7Ozs7SUFBeEIsVUFBeUIsS0FBeUI7UUFBekIsc0JBQUEsRUFBQSxVQUF5QjtRQUNoRCxPQUFPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O1FBRUk7Ozs7Ozs7Ozs7SUFDRyw2QkFBUzs7Ozs7Ozs7O0lBQWhCLFVBQWlCLGtCQUFzQyxFQUFFLEtBQXlCLEVBQUUsYUFBaUM7UUFBNUQsc0JBQUEsRUFBQSxVQUF5QjtRQUFFLDhCQUFBLEVBQUEsa0JBQWlDO1FBQ25ILE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOztRQUVJOzs7Ozs7Ozs7O0lBQ0csdUNBQW1COzs7Ozs7Ozs7SUFBMUIsVUFBMkIsTUFBb0IsRUFBRSxLQUF5QixFQUFFLGFBQWlDO1FBQTVELHNCQUFBLEVBQUEsVUFBeUI7UUFB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R0YsVUFBVTs7SUFtR1gsMEJBQUM7Q0FBQSxBQW5HRCxJQW1HQztTQWxHWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRm9ybUZpZWxkLCBGb3JtRmllbGRUeXBlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IFJlc3BvbnNlT2JqZWN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9yZXNwb25zZS1vYmplY3QvcmVzcG9uc2Utb2JqZWN0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBNaXNzaW9uRGVzY3JpcHRpb24sIE1JU1NJT05fU1RBVFVTIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9taXNzaW9uLWRlc2NyaXB0aW9uL21pc3Npb24tZGVzY3JpcHRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IE1vZGVscyB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMuc2VydmljZSc7XG5pbXBvcnQgeyBTbGlkZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc2xpZGUvc2xpZGUuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgY2xvbmVEZWVwLCB1bmlxLCBjb25jYXQsIGZvckVhY2ggfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWlzc2lvbmRlc2NyaXB0aW9ucyB7XG4gIC8qXG4gICAgICAgIFJldHVybiB0aGUgdHJhbnNmb3JtIHRvIGV4dHJhY3QgdGhlIGZpZWxkcyBmcm9tIGEgbWlzc2lvbiBkZXNjcmlwdGlvblxuICAgICovXG4gIHN0YXRpYyBnZXRGaWVsZFRyYW5zZm9ybSh0eXBlczogQXJyYXk8c3RyaW5nPiA9IFtdKTogKHJlczogUmVzcG9uc2VPYmplY3QpID0+IFJlc3BvbnNlT2JqZWN0IHtcbiAgICByZXR1cm4gTW9kZWxzLmdldEZpZWxkVHJhbnNmb3JtKHR5cGVzKTtcbiAgfVxuXG4gIC8qXG4gICAgICAgIFJldHVybiB0aGUgbGlzdCBvZiBzbGlkZSBpdGVtcyBmaWVsZHMgZnJvbSBhIG1pc3Npb24gZGVzY3JpcHRpb24gKG1vYmlsZSB0eXBlKVxuICAgICovXG4gIHN0YXRpYyBnZXRGaWVsZHMobWlzc2lvbmRlc2NyaXB0aW9uOiBNaXNzaW9uRGVzY3JpcHRpb24sIHR5cGVzOiBBcnJheTxzdHJpbmc+ID0gW10sIGV4Y2x1ZGVkVHlwZXM6IEFycmF5PHN0cmluZz4gPSBbXSkge1xuICAgIHJldHVybiBNb2RlbHMuZ2V0RmllbGRzKG1pc3Npb25kZXNjcmlwdGlvbiwgdHlwZXMsIGV4Y2x1ZGVkVHlwZXMpO1xuICB9XG5cbiAgLypcbiAgICAgICAgUmV0dXJuIHRoZSBsaXN0IG9mIHNsaWRlIGl0ZW1zIGZpZWxkcyBmcm9tIGFuIGFycmF5IG9mIHNsaWRlcyAobW9iaWxlIHR5cGUpXG4gICAgKi9cbiAgc3RhdGljIGdldEZpZWxkc0Zyb21TbGlkZXMoc2xpZGVzOiBBcnJheTxTbGlkZT4sIHR5cGVzOiBBcnJheTxzdHJpbmc+ID0gW10sIGV4Y2x1ZGVkVHlwZXM6IEFycmF5PHN0cmluZz4gPSBbXSkge1xuICAgIHJldHVybiBNb2RlbHMuZ2V0RmllbGRzRnJvbVNsaWRlcyhzbGlkZXMsIHR5cGVzLCBleGNsdWRlZFR5cGVzKTtcbiAgfVxuXG4gIC8qXG4gICAgICAgIFJldHVybiB0aGUgbGlzdCBvZiBmb3JtIGZpZWxkIGZyb20gYSBtaXNzaW9uIGRlc2NyaXB0aW9uLiBVc2VkIGluIHRoZSBtaXNzaW9uIGRhdGEgZ3JpZCBhbmQgZm9ybVxuICAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Rm9ybUZpZWxkcyhtaXNzaW9uZGVzY3JpcHRpb246IE1pc3Npb25EZXNjcmlwdGlvbiwgdHJhbnNsYXRlLCBpbmNsdWRlQ29tbWVudHMgPSBmYWxzZSk6IEFycmF5PElGb3JtRmllbGQ+IHtcbiAgICBsZXQgbW9iaWxlRmllbGRzID0gTW9kZWxzLmdldEZpZWxkcyhtaXNzaW9uZGVzY3JpcHRpb24sIG51bGwsIFsnaW5mb3JtYXRpb24nXSk7XG4gICAgbW9iaWxlRmllbGRzID0gbW9iaWxlRmllbGRzLnJlZHVjZSgocHJldmlvdXM6IEFycmF5PElGb3JtRmllbGQ+LCBjdXJyZW50OiBJRm9ybUZpZWxkKSA9PiB7XG4gICAgICBsZXQgcmV0VmFsID0gY2xvbmVEZWVwKGN1cnJlbnQpO1xuICAgICAgcmV0VmFsLm5hbWUgKz0gJy52YWx1ZSc7XG4gICAgICByZXRWYWwub3BlcmF0b3JzID0gTW9kZWxzLmdldEZpZWxkT3BlcmF0b3IoY3VycmVudCk7XG4gICAgICAvL3JldFZhbC50eXBlID0gTW9kZWxzLmdldEZvcm1GaWVsZEZyb21Nb2JpbGVGaWVsZChyZXRWYWwudHlwZSk7XG4gICAgICBwcmV2aW91cy5wdXNoKHJldFZhbCk7XG5cbiAgICAgIGlmIChjdXJyZW50LmFsbG93Q29tbWVudHMgJiYgaW5jbHVkZUNvbW1lbnRzKSB7XG4gICAgICAgIHJldFZhbCA9IGNsb25lRGVlcChjdXJyZW50KTtcbiAgICAgICAgcmV0VmFsLnRpdGxlID0gdHJhbnNsYXRlLnBvbHlnbG90KHJldFZhbC50aXRsZSkgKyAnIC5DJztcbiAgICAgICAgcmV0VmFsLm5hbWUgKz0gJy5jb21tZW50cyc7XG4gICAgICAgIHJldFZhbC50eXBlID0gRm9ybUZpZWxkVHlwZS50ZXh0O1xuICAgICAgICBwcmV2aW91cy5wdXNoKHJldFZhbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50LmFsbG93VGltZSAmJiBpbmNsdWRlQ29tbWVudHMpIHtcbiAgICAgICAgcmV0VmFsID0gY2xvbmVEZWVwKGN1cnJlbnQpO1xuICAgICAgICByZXRWYWwudGl0bGUgPSB0cmFuc2xhdGUucG9seWdsb3QocmV0VmFsLnRpdGxlKSArICcgLlQnO1xuICAgICAgICByZXRWYWwubmFtZSArPSAnLnRpbWUnO1xuICAgICAgICByZXRWYWwudHlwZSA9IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWU7XG4gICAgICAgIHByZXZpb3VzLnB1c2gocmV0VmFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICB9LCBbXSk7XG4gICAgaWYgKG1pc3Npb25kZXNjcmlwdGlvbi50eXBlID09PSAnc2VydmljZScpIHtcbiAgICAgIG1vYmlsZUZpZWxkcy51bnNoaWZ0KHtcbiAgICAgICAgbmFtZTogJ21pc3Npb24uc3RhdHVzJyxcbiAgICAgICAgdGl0bGU6ICdTVEFUVVMnLFxuICAgICAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgICAgICB2YWx1ZXM6IHVuaXEoY29uY2F0KE1JU1NJT05fU1RBVFVTLCBbdW5kZWZpbmVkXSkpLFxuICAgICAgICBoYW5kbGVVbmRlZmluZWQ6IHRydWUsXG4gICAgICAgIGNvbHVtbkRlZmluaXRpb246IHsgY2VsbFJlbmRlcmVyOiAnbWlzc2lvblN0YXR1c1JlbmRlcmVyJyB9LFxuICAgICAgICBvcGVyYXRvcnM6IE1vZGVscy5nZXRGaWVsZE9wZXJhdG9yKHsgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUgfSlcbiAgICAgIH0pO1xuICAgICAgbW9iaWxlRmllbGRzLnVuc2hpZnQoe1xuICAgICAgICBuYW1lOiAnbWlzc2lvbi5jcmVhdG9yRGlzcGxheU5hbWUnLFxuICAgICAgICB0aXRsZTogJ1JFUVVFU1RPUicsXG4gICAgICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICAgICAgb3BlcmF0b3JzOiBNb2RlbHMuZ2V0RmllbGRPcGVyYXRvcih7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICAgICAgfSk7XG4gICAgICBtb2JpbGVGaWVsZHMudW5zaGlmdCh7XG4gICAgICAgIG5hbWU6ICdtaXNzaW9uLl9lY3QnLFxuICAgICAgICB0aXRsZTogJ0NSRUFUSU9OREFURScsXG4gICAgICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUsXG4gICAgICAgIG9wZXJhdG9yczogTW9kZWxzLmdldEZpZWxkT3BlcmF0b3IoeyB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGV0aW1lIH0pXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1pc3Npb25kZXNjcmlwdGlvbi5zY29yaW5nICYmIG1pc3Npb25kZXNjcmlwdGlvbi5zY29yaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvckVhY2gobWlzc2lvbmRlc2NyaXB0aW9uLnNjb3JpbmcsIHNjb3JpbmcgPT4ge1xuICAgICAgICBpZiAoc2NvcmluZy5pc0FjdGl2ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIG1vYmlsZUZpZWxkcy51bnNoaWZ0KHtcbiAgICAgICAgICAgIG5hbWU6ICdleHRyYVNjb3Jlcy4nICsgc2NvcmluZy50aXRsZSArICcudmFsdWUnLFxuICAgICAgICAgICAgdGl0bGU6IHNjb3JpbmcudGl0bGUsXG4gICAgICAgICAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlclxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1vYmlsZUZpZWxkcy51bnNoaWZ0KHsgbmFtZTogJ3Njb3JlLnZhbHVlJywgdGl0bGU6IHNjb3JpbmcudGl0bGUsIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG1vYmlsZUZpZWxkcztcbiAgfVxuXG4gIHN0YXRpYyBlbmNvZGVTY29yaW5nVmFsdWUodikge1xuICAgIGlmICh2ICYmIHYudG9TdHJpbmcpIHtcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKCkucmVwbGFjZSgvXFwuLywgJ18nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICB9XG59XG4iXX0=
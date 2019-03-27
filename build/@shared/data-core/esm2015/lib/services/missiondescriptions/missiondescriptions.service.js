/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormFieldType } from '@shared/stencil';
import { MISSION_STATUS } from '../../interfaces/mission-description/mission-description.interface';
import { Models } from '../models/models.service';
import { cloneDeep, uniq, concat, forEach } from 'lodash-es';
export class Missiondescriptions {
    /*
            Return the transform to extract the fields from a mission description
        */
    /**
     * @param {?=} types
     * @return {?}
     */
    static getFieldTransform(types = []) {
        return Models.getFieldTransform(types);
    }
    /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    static getFields(missiondescription, types = [], excludedTypes = []) {
        return Models.getFields(missiondescription, types, excludedTypes);
    }
    /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    static getFieldsFromSlides(slides, types = [], excludedTypes = []) {
        return Models.getFieldsFromSlides(slides, types, excludedTypes);
    }
    /*
            Return the list of form field from a mission description. Used in the mission data grid and form
        */
    /**
     * @param {?} missiondescription
     * @param {?} translate
     * @param {?=} includeComments
     * @return {?}
     */
    static getFormFields(missiondescription, translate, includeComments = false) {
        /** @type {?} */
        let mobileFields = Models.getFields(missiondescription, null, ['information']);
        mobileFields = mobileFields.reduce((/**
         * @param {?} previous
         * @param {?} current
         * @return {?}
         */
        (previous, current) => {
            /** @type {?} */
            let retVal = cloneDeep(current);
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
            scoring => {
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
    }
    /**
     * @param {?} v
     * @return {?}
     */
    static encodeScoringValue(v) {
        if (v && v.toString) {
            return v.toString().replace(/\./, '_');
        }
        else {
            return v;
        }
    }
}
Missiondescriptions.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2lvbmRlc2NyaXB0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21pc3Npb25kZXNjcmlwdGlvbnMvbWlzc2lvbmRlc2NyaXB0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RCxPQUFPLEVBQXNCLGNBQWMsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUdsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRzdELE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7O0lBSTlCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUF1QixFQUFFO1FBQ2hELE9BQU8sTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7Ozs7Ozs7SUFLRCxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFzQyxFQUFFLFFBQXVCLEVBQUUsRUFBRSxnQkFBK0IsRUFBRTtRQUNuSCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7Ozs7Ozs7SUFLRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBb0IsRUFBRSxRQUF1QixFQUFFLEVBQUUsZ0JBQStCLEVBQUU7UUFDM0csT0FBTyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNsRSxDQUFDOzs7Ozs7Ozs7O0lBS00sTUFBTSxDQUFDLGFBQWEsQ0FBQyxr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O2FBQ3JFLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkUsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU87Ozs7WUFBRSxPQUFPLENBQUMsRUFBRTtnQkFDNUMsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDN0IsWUFBWSxDQUFDLE9BQU8sQ0FBQzt3QkFDbkIsSUFBSSxFQUFFLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVE7d0JBQy9DLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSzt3QkFDcEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNO3FCQUMzQixDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUNqRztZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN4QzthQUFNO1lBQ0wsT0FBTyxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7OztZQWxHRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZvcm1GaWVsZCwgRm9ybUZpZWxkVHlwZSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBSZXNwb25zZU9iamVjdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvcmVzcG9uc2Utb2JqZWN0L3Jlc3BvbnNlLW9iamVjdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTWlzc2lvbkRlc2NyaXB0aW9uLCBNSVNTSU9OX1NUQVRVUyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbWlzc2lvbi1kZXNjcmlwdGlvbi9taXNzaW9uLWRlc2NyaXB0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNb2RlbHMgfSBmcm9tICcuLi9tb2RlbHMvbW9kZWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2xpZGUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3NsaWRlL3NsaWRlLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IGNsb25lRGVlcCwgdW5pcSwgY29uY2F0LCBmb3JFYWNoIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1pc3Npb25kZXNjcmlwdGlvbnMge1xuICAvKlxuICAgICAgICBSZXR1cm4gdGhlIHRyYW5zZm9ybSB0byBleHRyYWN0IHRoZSBmaWVsZHMgZnJvbSBhIG1pc3Npb24gZGVzY3JpcHRpb25cbiAgICAqL1xuICBzdGF0aWMgZ2V0RmllbGRUcmFuc2Zvcm0odHlwZXM6IEFycmF5PHN0cmluZz4gPSBbXSk6IChyZXM6IFJlc3BvbnNlT2JqZWN0KSA9PiBSZXNwb25zZU9iamVjdCB7XG4gICAgcmV0dXJuIE1vZGVscy5nZXRGaWVsZFRyYW5zZm9ybSh0eXBlcyk7XG4gIH1cblxuICAvKlxuICAgICAgICBSZXR1cm4gdGhlIGxpc3Qgb2Ygc2xpZGUgaXRlbXMgZmllbGRzIGZyb20gYSBtaXNzaW9uIGRlc2NyaXB0aW9uIChtb2JpbGUgdHlwZSlcbiAgICAqL1xuICBzdGF0aWMgZ2V0RmllbGRzKG1pc3Npb25kZXNjcmlwdGlvbjogTWlzc2lvbkRlc2NyaXB0aW9uLCB0eXBlczogQXJyYXk8c3RyaW5nPiA9IFtdLCBleGNsdWRlZFR5cGVzOiBBcnJheTxzdHJpbmc+ID0gW10pIHtcbiAgICByZXR1cm4gTW9kZWxzLmdldEZpZWxkcyhtaXNzaW9uZGVzY3JpcHRpb24sIHR5cGVzLCBleGNsdWRlZFR5cGVzKTtcbiAgfVxuXG4gIC8qXG4gICAgICAgIFJldHVybiB0aGUgbGlzdCBvZiBzbGlkZSBpdGVtcyBmaWVsZHMgZnJvbSBhbiBhcnJheSBvZiBzbGlkZXMgKG1vYmlsZSB0eXBlKVxuICAgICovXG4gIHN0YXRpYyBnZXRGaWVsZHNGcm9tU2xpZGVzKHNsaWRlczogQXJyYXk8U2xpZGU+LCB0eXBlczogQXJyYXk8c3RyaW5nPiA9IFtdLCBleGNsdWRlZFR5cGVzOiBBcnJheTxzdHJpbmc+ID0gW10pIHtcbiAgICByZXR1cm4gTW9kZWxzLmdldEZpZWxkc0Zyb21TbGlkZXMoc2xpZGVzLCB0eXBlcywgZXhjbHVkZWRUeXBlcyk7XG4gIH1cblxuICAvKlxuICAgICAgICBSZXR1cm4gdGhlIGxpc3Qgb2YgZm9ybSBmaWVsZCBmcm9tIGEgbWlzc2lvbiBkZXNjcmlwdGlvbi4gVXNlZCBpbiB0aGUgbWlzc2lvbiBkYXRhIGdyaWQgYW5kIGZvcm1cbiAgICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEZvcm1GaWVsZHMobWlzc2lvbmRlc2NyaXB0aW9uOiBNaXNzaW9uRGVzY3JpcHRpb24sIHRyYW5zbGF0ZSwgaW5jbHVkZUNvbW1lbnRzID0gZmFsc2UpOiBBcnJheTxJRm9ybUZpZWxkPiB7XG4gICAgbGV0IG1vYmlsZUZpZWxkcyA9IE1vZGVscy5nZXRGaWVsZHMobWlzc2lvbmRlc2NyaXB0aW9uLCBudWxsLCBbJ2luZm9ybWF0aW9uJ10pO1xuICAgIG1vYmlsZUZpZWxkcyA9IG1vYmlsZUZpZWxkcy5yZWR1Y2UoKHByZXZpb3VzOiBBcnJheTxJRm9ybUZpZWxkPiwgY3VycmVudDogSUZvcm1GaWVsZCkgPT4ge1xuICAgICAgbGV0IHJldFZhbCA9IGNsb25lRGVlcChjdXJyZW50KTtcbiAgICAgIHJldFZhbC5uYW1lICs9ICcudmFsdWUnO1xuICAgICAgcmV0VmFsLm9wZXJhdG9ycyA9IE1vZGVscy5nZXRGaWVsZE9wZXJhdG9yKGN1cnJlbnQpO1xuICAgICAgLy9yZXRWYWwudHlwZSA9IE1vZGVscy5nZXRGb3JtRmllbGRGcm9tTW9iaWxlRmllbGQocmV0VmFsLnR5cGUpO1xuICAgICAgcHJldmlvdXMucHVzaChyZXRWYWwpO1xuXG4gICAgICBpZiAoY3VycmVudC5hbGxvd0NvbW1lbnRzICYmIGluY2x1ZGVDb21tZW50cykge1xuICAgICAgICByZXRWYWwgPSBjbG9uZURlZXAoY3VycmVudCk7XG4gICAgICAgIHJldFZhbC50aXRsZSA9IHRyYW5zbGF0ZS5wb2x5Z2xvdChyZXRWYWwudGl0bGUpICsgJyAuQyc7XG4gICAgICAgIHJldFZhbC5uYW1lICs9ICcuY29tbWVudHMnO1xuICAgICAgICByZXRWYWwudHlwZSA9IEZvcm1GaWVsZFR5cGUudGV4dDtcbiAgICAgICAgcHJldmlvdXMucHVzaChyZXRWYWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudC5hbGxvd1RpbWUgJiYgaW5jbHVkZUNvbW1lbnRzKSB7XG4gICAgICAgIHJldFZhbCA9IGNsb25lRGVlcChjdXJyZW50KTtcbiAgICAgICAgcmV0VmFsLnRpdGxlID0gdHJhbnNsYXRlLnBvbHlnbG90KHJldFZhbC50aXRsZSkgKyAnIC5UJztcbiAgICAgICAgcmV0VmFsLm5hbWUgKz0gJy50aW1lJztcbiAgICAgICAgcmV0VmFsLnR5cGUgPSBGb3JtRmllbGRUeXBlLmRhdGV0aW1lO1xuICAgICAgICBwcmV2aW91cy5wdXNoKHJldFZhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfSwgW10pO1xuICAgIGlmIChtaXNzaW9uZGVzY3JpcHRpb24udHlwZSA9PT0gJ3NlcnZpY2UnKSB7XG4gICAgICBtb2JpbGVGaWVsZHMudW5zaGlmdCh7XG4gICAgICAgIG5hbWU6ICdtaXNzaW9uLnN0YXR1cycsXG4gICAgICAgIHRpdGxlOiAnU1RBVFVTJyxcbiAgICAgICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICAgICAgdmFsdWVzOiB1bmlxKGNvbmNhdChNSVNTSU9OX1NUQVRVUywgW3VuZGVmaW5lZF0pKSxcbiAgICAgICAgaGFuZGxlVW5kZWZpbmVkOiB0cnVlLFxuICAgICAgICBjb2x1bW5EZWZpbml0aW9uOiB7IGNlbGxSZW5kZXJlcjogJ21pc3Npb25TdGF0dXNSZW5kZXJlcicgfSxcbiAgICAgICAgb3BlcmF0b3JzOiBNb2RlbHMuZ2V0RmllbGRPcGVyYXRvcih7IHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlIH0pXG4gICAgICB9KTtcbiAgICAgIG1vYmlsZUZpZWxkcy51bnNoaWZ0KHtcbiAgICAgICAgbmFtZTogJ21pc3Npb24uY3JlYXRvckRpc3BsYXlOYW1lJyxcbiAgICAgICAgdGl0bGU6ICdSRVFVRVNUT1InLFxuICAgICAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgICAgIG9wZXJhdG9yczogTW9kZWxzLmdldEZpZWxkT3BlcmF0b3IoeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgICAgIH0pO1xuICAgICAgbW9iaWxlRmllbGRzLnVuc2hpZnQoe1xuICAgICAgICBuYW1lOiAnbWlzc2lvbi5fZWN0JyxcbiAgICAgICAgdGl0bGU6ICdDUkVBVElPTkRBVEUnLFxuICAgICAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGV0aW1lLFxuICAgICAgICBvcGVyYXRvcnM6IE1vZGVscy5nZXRGaWVsZE9wZXJhdG9yKHsgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRldGltZSB9KVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtaXNzaW9uZGVzY3JpcHRpb24uc2NvcmluZyAmJiBtaXNzaW9uZGVzY3JpcHRpb24uc2NvcmluZy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3JFYWNoKG1pc3Npb25kZXNjcmlwdGlvbi5zY29yaW5nLCBzY29yaW5nID0+IHtcbiAgICAgICAgaWYgKHNjb3JpbmcuaXNBY3RpdmUgIT09IHRydWUpIHtcbiAgICAgICAgICBtb2JpbGVGaWVsZHMudW5zaGlmdCh7XG4gICAgICAgICAgICBuYW1lOiAnZXh0cmFTY29yZXMuJyArIHNjb3JpbmcudGl0bGUgKyAnLnZhbHVlJyxcbiAgICAgICAgICAgIHRpdGxlOiBzY29yaW5nLnRpdGxlLFxuICAgICAgICAgICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtb2JpbGVGaWVsZHMudW5zaGlmdCh7IG5hbWU6ICdzY29yZS52YWx1ZScsIHRpdGxlOiBzY29yaW5nLnRpdGxlLCB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlciB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBtb2JpbGVGaWVsZHM7XG4gIH1cblxuICBzdGF0aWMgZW5jb2RlU2NvcmluZ1ZhbHVlKHYpIHtcbiAgICBpZiAodiAmJiB2LnRvU3RyaW5nKSB7XG4gICAgICByZXR1cm4gdi50b1N0cmluZygpLnJlcGxhY2UoL1xcLi8sICdfJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgfVxufVxuIl19
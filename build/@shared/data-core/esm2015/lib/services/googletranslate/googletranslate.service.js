/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Translate } from '@shared/translate';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
export class Googletranslate {
    constructor() { }
    /**
     * @param {?} query
     * @param {?} source
     * @param {?} target
     * @param {?} rq
     * @return {?}
     */
    static get(query, source, target, rq) {
        /** @type {?} */
        let sourceLang = this.fixLanguage(source);
        /** @type {?} */
        let targetLang = this.fixLanguage(target);
        if (sourceLang === targetLang) {
            return of(query);
        }
        else {
            /** @type {?} */
            let url = 'businesslogic/translate';
            return rq.post(url, { query, sourceLang, targetLang }, null, null, null, null, true).pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            response => {
                return response || query;
            })));
        }
    }
    /**
     * @param {?} language
     * @return {?}
     */
    static fixLanguage(language) {
        switch (language) {
            case 'us':
                return 'en';
            case 'zhs':
                return 'zh-CN';
            case 'zht':
                return 'zh-TW';
            case 'ua':
                return 'uk';
            case 'kr':
                return 'ko';
            case 'cz':
                return 'cs';
            case 'gr':
                return 'el';
            case 'br':
                return 'pt';
            default:
                return language;
        }
    }
    /**
     * @param {?} query
     * @param {?} source
     * @param {?} rq
     * @return {?}
     */
    static getAll(query, source, rq) {
        /** @type {?} */
        let observables = Translate.availablesLanguage
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        l => l !== source))
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        l => l !== 'key'))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        l => {
            return this.get(query, source, l, rq).pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            value => ({
                language: l,
                value: value || query
            }))));
        }));
        return forkJoin(observables);
    }
}
Googletranslate.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Googletranslate.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xldHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZ29vZ2xldHJhbnNsYXRlL2dvb2dsZXRyYW5zbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUc5QyxPQUFPLEVBQWMsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckMsTUFBTSxPQUFPLGVBQWU7SUFzRDFCLGdCQUFlLENBQUM7Ozs7Ozs7O0lBckRoQixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUUsTUFBYyxFQUFFLEVBQWE7O1lBQ2pFLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQzs7WUFDckMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQjthQUFNOztnQkFDRCxHQUFHLEdBQUcseUJBQXlCO1lBQ25DLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3ZGLEdBQUc7Ozs7WUFBQyxRQUFRLENBQUMsRUFBRTtnQkFDYixPQUFPLFFBQVEsSUFBSSxLQUFLLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQWdCO1FBQ2pDLFFBQVEsUUFBUSxFQUFFO1lBQ2hCLEtBQUssSUFBSTtnQkFDUCxPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssS0FBSztnQkFDUixPQUFPLE9BQU8sQ0FBQztZQUNqQixLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxPQUFPLENBQUM7WUFDakIsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxDQUFDO1lBQ2QsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxDQUFDO1lBQ2QsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxDQUFDO1lBQ2QsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxDQUFDO1lBQ2QsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxDQUFDO1lBQ2Q7Z0JBQ0UsT0FBTyxRQUFRLENBQUM7U0FDbkI7SUFDSCxDQUFDOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLEVBQWE7O1lBQ3BELFdBQVcsR0FBRyxTQUFTLENBQUMsa0JBQWtCO2FBQzNDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUM7YUFDekIsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBQzthQUN4QixHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUN4QyxHQUFHOzs7O1lBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNaLFFBQVEsRUFBRSxDQUFDO2dCQUNYLEtBQUssRUFBRSxLQUFLLElBQUksS0FBSzthQUN0QixDQUFDLEVBQUMsQ0FDSixDQUFDO1FBQ0osQ0FBQyxFQUFDO1FBQ0osT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7O1lBckRGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmb3JrSm9pbiwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdvb2dsZXRyYW5zbGF0ZSB7XG4gIHN0YXRpYyBnZXQocXVlcnk6IHN0cmluZywgc291cmNlOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nLCBycTogUmVxdWVzdG9yKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgc291cmNlTGFuZyA9IHRoaXMuZml4TGFuZ3VhZ2Uoc291cmNlKTtcbiAgICBsZXQgdGFyZ2V0TGFuZyA9IHRoaXMuZml4TGFuZ3VhZ2UodGFyZ2V0KTtcbiAgICBpZiAoc291cmNlTGFuZyA9PT0gdGFyZ2V0TGFuZykge1xuICAgICAgcmV0dXJuIG9mKHF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHVybCA9ICdidXNpbmVzc2xvZ2ljL3RyYW5zbGF0ZSc7XG4gICAgICByZXR1cm4gcnEucG9zdCh1cmwsIHsgcXVlcnksIHNvdXJjZUxhbmcsIHRhcmdldExhbmcgfSwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgdHJ1ZSkucGlwZShcbiAgICAgICAgbWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UgfHwgcXVlcnk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmaXhMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgc3dpdGNoIChsYW5ndWFnZSkge1xuICAgICAgY2FzZSAndXMnOlxuICAgICAgICByZXR1cm4gJ2VuJztcbiAgICAgIGNhc2UgJ3pocyc6XG4gICAgICAgIHJldHVybiAnemgtQ04nO1xuICAgICAgY2FzZSAnemh0JzpcbiAgICAgICAgcmV0dXJuICd6aC1UVyc7XG4gICAgICBjYXNlICd1YSc6XG4gICAgICAgIHJldHVybiAndWsnO1xuICAgICAgY2FzZSAna3InOlxuICAgICAgICByZXR1cm4gJ2tvJztcbiAgICAgIGNhc2UgJ2N6JzpcbiAgICAgICAgcmV0dXJuICdjcyc7XG4gICAgICBjYXNlICdncic6XG4gICAgICAgIHJldHVybiAnZWwnO1xuICAgICAgY2FzZSAnYnInOlxuICAgICAgICByZXR1cm4gJ3B0JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0QWxsKHF1ZXJ5OiBzdHJpbmcsIHNvdXJjZTogc3RyaW5nLCBycTogUmVxdWVzdG9yKSB7XG4gICAgbGV0IG9ic2VydmFibGVzID0gVHJhbnNsYXRlLmF2YWlsYWJsZXNMYW5ndWFnZVxuICAgICAgLmZpbHRlcihsID0+IGwgIT09IHNvdXJjZSlcbiAgICAgIC5maWx0ZXIobCA9PiBsICE9PSAna2V5JylcbiAgICAgIC5tYXAobCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChxdWVyeSwgc291cmNlLCBsLCBycSkucGlwZShcbiAgICAgICAgICBtYXAodmFsdWUgPT4gKHtcbiAgICAgICAgICAgIGxhbmd1YWdlOiBsLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlIHx8IHF1ZXJ5XG4gICAgICAgICAgfSkpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICByZXR1cm4gZm9ya0pvaW4ob2JzZXJ2YWJsZXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIl19
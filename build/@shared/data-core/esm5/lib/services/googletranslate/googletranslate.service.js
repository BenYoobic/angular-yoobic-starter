/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Translate } from '@shared/translate';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
var Googletranslate = /** @class */ (function () {
    function Googletranslate() {
    }
    /**
     * @param {?} query
     * @param {?} source
     * @param {?} target
     * @param {?} rq
     * @return {?}
     */
    Googletranslate.get = /**
     * @param {?} query
     * @param {?} source
     * @param {?} target
     * @param {?} rq
     * @return {?}
     */
    function (query, source, target, rq) {
        /** @type {?} */
        var sourceLang = this.fixLanguage(source);
        /** @type {?} */
        var targetLang = this.fixLanguage(target);
        if (sourceLang === targetLang) {
            return of(query);
        }
        else {
            /** @type {?} */
            var url = 'businesslogic/translate';
            return rq.post(url, { query: query, sourceLang: sourceLang, targetLang: targetLang }, null, null, null, null, true).pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                return response || query;
            })));
        }
    };
    /**
     * @param {?} language
     * @return {?}
     */
    Googletranslate.fixLanguage = /**
     * @param {?} language
     * @return {?}
     */
    function (language) {
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
    };
    /**
     * @param {?} query
     * @param {?} source
     * @param {?} rq
     * @return {?}
     */
    Googletranslate.getAll = /**
     * @param {?} query
     * @param {?} source
     * @param {?} rq
     * @return {?}
     */
    function (query, source, rq) {
        var _this = this;
        /** @type {?} */
        var observables = Translate.availablesLanguage
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l !== source; }))
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l !== 'key'; }))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        function (l) {
            return _this.get(query, source, l, rq).pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return ({
                language: l,
                value: value || query
            }); })));
        }));
        return forkJoin(observables);
    };
    Googletranslate.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Googletranslate.ctorParameters = function () { return []; };
    return Googletranslate;
}());
export { Googletranslate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xldHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZ29vZ2xldHJhbnNsYXRlL2dvb2dsZXRyYW5zbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUc5QyxPQUFPLEVBQWMsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckM7SUF1REU7SUFBZSxDQUFDOzs7Ozs7OztJQXJEVCxtQkFBRzs7Ozs7OztJQUFWLFVBQVcsS0FBYSxFQUFFLE1BQWMsRUFBRSxNQUFjLEVBQUUsRUFBYTs7WUFDakUsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDOztZQUNyQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDekMsSUFBSSxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQzdCLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xCO2FBQU07O2dCQUNELEdBQUcsR0FBRyx5QkFBeUI7WUFDbkMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssT0FBQSxFQUFFLFVBQVUsWUFBQSxFQUFFLFVBQVUsWUFBQSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDdkYsR0FBRzs7OztZQUFDLFVBQUEsUUFBUTtnQkFDVixPQUFPLFFBQVEsSUFBSSxLQUFLLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFFTSwyQkFBVzs7OztJQUFsQixVQUFtQixRQUFnQjtRQUNqQyxRQUFRLFFBQVEsRUFBRTtZQUNoQixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxJQUFJLENBQUM7WUFDZCxLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxPQUFPLENBQUM7WUFDakIsS0FBSyxLQUFLO2dCQUNSLE9BQU8sT0FBTyxDQUFDO1lBQ2pCLEtBQUssSUFBSTtnQkFDUCxPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssSUFBSTtnQkFDUCxPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssSUFBSTtnQkFDUCxPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssSUFBSTtnQkFDUCxPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssSUFBSTtnQkFDUCxPQUFPLElBQUksQ0FBQztZQUNkO2dCQUNFLE9BQU8sUUFBUSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7Ozs7OztJQUVNLHNCQUFNOzs7Ozs7SUFBYixVQUFjLEtBQWEsRUFBRSxNQUFjLEVBQUUsRUFBYTtRQUExRCxpQkFhQzs7WUFaSyxXQUFXLEdBQUcsU0FBUyxDQUFDLGtCQUFrQjthQUMzQyxNQUFNOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssTUFBTSxFQUFaLENBQVksRUFBQzthQUN6QixNQUFNOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssS0FBSyxFQUFYLENBQVcsRUFBQzthQUN4QixHQUFHOzs7O1FBQUMsVUFBQSxDQUFDO1lBQ0osT0FBTyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDeEMsR0FBRzs7OztZQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQztnQkFDWixRQUFRLEVBQUUsQ0FBQztnQkFDWCxLQUFLLEVBQUUsS0FBSyxJQUFJLEtBQUs7YUFDdEIsQ0FBQyxFQUhXLENBR1gsRUFBQyxDQUNKLENBQUM7UUFDSixDQUFDLEVBQUM7UUFDSixPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQixDQUFDOztnQkFyREYsVUFBVTs7OztJQXdEWCxzQkFBQztDQUFBLEFBeERELElBd0RDO1NBdkRZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmb3JrSm9pbiwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdvb2dsZXRyYW5zbGF0ZSB7XG4gIHN0YXRpYyBnZXQocXVlcnk6IHN0cmluZywgc291cmNlOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nLCBycTogUmVxdWVzdG9yKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgc291cmNlTGFuZyA9IHRoaXMuZml4TGFuZ3VhZ2Uoc291cmNlKTtcbiAgICBsZXQgdGFyZ2V0TGFuZyA9IHRoaXMuZml4TGFuZ3VhZ2UodGFyZ2V0KTtcbiAgICBpZiAoc291cmNlTGFuZyA9PT0gdGFyZ2V0TGFuZykge1xuICAgICAgcmV0dXJuIG9mKHF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHVybCA9ICdidXNpbmVzc2xvZ2ljL3RyYW5zbGF0ZSc7XG4gICAgICByZXR1cm4gcnEucG9zdCh1cmwsIHsgcXVlcnksIHNvdXJjZUxhbmcsIHRhcmdldExhbmcgfSwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgdHJ1ZSkucGlwZShcbiAgICAgICAgbWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UgfHwgcXVlcnk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmaXhMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgc3dpdGNoIChsYW5ndWFnZSkge1xuICAgICAgY2FzZSAndXMnOlxuICAgICAgICByZXR1cm4gJ2VuJztcbiAgICAgIGNhc2UgJ3pocyc6XG4gICAgICAgIHJldHVybiAnemgtQ04nO1xuICAgICAgY2FzZSAnemh0JzpcbiAgICAgICAgcmV0dXJuICd6aC1UVyc7XG4gICAgICBjYXNlICd1YSc6XG4gICAgICAgIHJldHVybiAndWsnO1xuICAgICAgY2FzZSAna3InOlxuICAgICAgICByZXR1cm4gJ2tvJztcbiAgICAgIGNhc2UgJ2N6JzpcbiAgICAgICAgcmV0dXJuICdjcyc7XG4gICAgICBjYXNlICdncic6XG4gICAgICAgIHJldHVybiAnZWwnO1xuICAgICAgY2FzZSAnYnInOlxuICAgICAgICByZXR1cm4gJ3B0JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0QWxsKHF1ZXJ5OiBzdHJpbmcsIHNvdXJjZTogc3RyaW5nLCBycTogUmVxdWVzdG9yKSB7XG4gICAgbGV0IG9ic2VydmFibGVzID0gVHJhbnNsYXRlLmF2YWlsYWJsZXNMYW5ndWFnZVxuICAgICAgLmZpbHRlcihsID0+IGwgIT09IHNvdXJjZSlcbiAgICAgIC5maWx0ZXIobCA9PiBsICE9PSAna2V5JylcbiAgICAgIC5tYXAobCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChxdWVyeSwgc291cmNlLCBsLCBycSkucGlwZShcbiAgICAgICAgICBtYXAodmFsdWUgPT4gKHtcbiAgICAgICAgICAgIGxhbmd1YWdlOiBsLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlIHx8IHF1ZXJ5XG4gICAgICAgICAgfSkpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICByZXR1cm4gZm9ya0pvaW4ob2JzZXJ2YWJsZXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIl19
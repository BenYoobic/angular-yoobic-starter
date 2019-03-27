/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { Translate } from '@shared/translate';
import { isBlank } from '@shared/stencil';
import { keys as _keys } from 'lodash-es';
var FilterPipe = /** @class */ (function () {
    function FilterPipe(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    FilterPipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        //value: array of values to filter
        //args[0]: string to match
        //args[1]: list of fields to use to compare
        //args[2]: not sure? seems to exlude if false
        //args[3]: use translation
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!args || !args[0]) {
            //&& !args[1]
            return value;
        }
        else if (value) {
            /** @type {?} */
            var translate_1 = args[3];
            return value.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (typeof item === 'string') {
                    return (item &&
                        _this.getStringToTest(item, translate_1)
                            .toLowerCase()
                            .indexOf(args[0].toLowerCase()) >= 0);
                }
                /** @type {?} */
                var keys = args[1] || _keys(item);
                keys = [].concat(keys);
                /** @type {?} */
                var retVal = false;
                for (var i = 0; i < keys.length; i++) {
                    /** @type {?} */
                    var key = keys[i];
                    if (args[0] && args[0].toLowerCase) {
                        if (typeof item[key] === 'string' || item[key] instanceof String) {
                            /** @type {?} */
                            var index = _this.getStringToTest(item[key], translate_1)
                                .toLowerCase()
                                .indexOf(args[0].toLowerCase());
                            retVal = retVal || (args[2] === false ? index < 0 : index >= 0);
                        }
                    }
                    else if (!args[0] && args[1]) {
                        /** @type {?} */
                        var bool = item.hasOwnProperty(key) && !isBlank(item[key]);
                        retVal = retVal || (args[2] === false ? !bool : bool);
                    }
                }
                return retVal;
            }));
        }
    };
    /**
     * @param {?} s
     * @param {?} translate
     * @return {?}
     */
    FilterPipe.prototype.getStringToTest = /**
     * @param {?} s
     * @param {?} translate
     * @return {?}
     */
    function (s, translate) {
        if (translate && this.translate) {
            return this.translate.get(s.toString().toUpperCase());
        }
        else {
            return s;
        }
    };
    FilterPipe.decorators = [
        { type: Pipe, args: [{ name: 'filter' },] }
    ];
    /** @nocollapse */
    FilterPipe.ctorParameters = function () { return [
        { type: Translate }
    ]; };
    return FilterPipe;
}());
export { FilterPipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FilterPipe.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvZmlsdGVyL2ZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxJQUFJLElBQUksS0FBSyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTFDO0lBSUUsb0JBQVksU0FBb0I7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7Ozs7O0lBRUQsOEJBQVM7Ozs7O0lBQVQsVUFBVSxLQUFpQjtRQUN6QixrQ0FBa0M7UUFDbEMsMEJBQTBCO1FBQzFCLDJDQUEyQztRQUMzQyw2Q0FBNkM7UUFDN0MsMEJBQTBCO1FBTDVCLGlCQTBDQztRQTFDNEIsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFPekMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyQixhQUFhO1lBQ2IsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNLElBQUksS0FBSyxFQUFFOztnQkFDWixXQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxJQUFJO2dCQUN0QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDNUIsT0FBTyxDQUNMLElBQUk7d0JBQ0osS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsV0FBUyxDQUFDOzZCQUNsQyxXQUFXLEVBQUU7NkJBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FDdkMsQ0FBQztpQkFDSDs7b0JBQ0csSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7b0JBRW5CLE1BQU0sR0FBRyxLQUFLO2dCQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7d0JBQ2hDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO3dCQUNsQyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksTUFBTSxFQUFFOztnQ0FDNUQsS0FBSyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFdBQVMsQ0FBQztpQ0FDbkQsV0FBVyxFQUFFO2lDQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQ2pDLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQ2pFO3FCQUNGO3lCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFOzs0QkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUMxRCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN2RDtpQkFDRjtnQkFDRCxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsb0NBQWU7Ozs7O0lBQWYsVUFBZ0IsQ0FBUyxFQUFFLFNBQWtCO1FBQzNDLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0wsT0FBTyxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7O2dCQTFERixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFOzs7O2dCQUpmLFNBQVM7O0lBK0RsQixpQkFBQztDQUFBLEFBM0RELElBMkRDO1NBMURZLFVBQVU7Ozs7OztJQUNyQiwrQkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBpc0JsYW5rIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IGtleXMgYXMgX2tleXMgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5AUGlwZSh7IG5hbWU6ICdmaWx0ZXInIH0pXG5leHBvcnQgY2xhc3MgRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlO1xuXG4gIGNvbnN0cnVjdG9yKHRyYW5zbGF0ZTogVHJhbnNsYXRlKSB7XG4gICAgdGhpcy50cmFuc2xhdGUgPSB0cmFuc2xhdGU7XG4gIH1cblxuICB0cmFuc2Zvcm0odmFsdWU6IEFycmF5PGFueT4sIC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICAvL3ZhbHVlOiBhcnJheSBvZiB2YWx1ZXMgdG8gZmlsdGVyXG4gICAgLy9hcmdzWzBdOiBzdHJpbmcgdG8gbWF0Y2hcbiAgICAvL2FyZ3NbMV06IGxpc3Qgb2YgZmllbGRzIHRvIHVzZSB0byBjb21wYXJlXG4gICAgLy9hcmdzWzJdOiBub3Qgc3VyZT8gc2VlbXMgdG8gZXhsdWRlIGlmIGZhbHNlXG4gICAgLy9hcmdzWzNdOiB1c2UgdHJhbnNsYXRpb25cblxuICAgIGlmICghYXJncyB8fCAhYXJnc1swXSkge1xuICAgICAgLy8mJiAhYXJnc1sxXVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIGxldCB0cmFuc2xhdGUgPSBhcmdzWzNdO1xuICAgICAgcmV0dXJuIHZhbHVlLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpdGVtICYmXG4gICAgICAgICAgICB0aGlzLmdldFN0cmluZ1RvVGVzdChpdGVtLCB0cmFuc2xhdGUpXG4gICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgIC5pbmRleE9mKGFyZ3NbMF0udG9Mb3dlckNhc2UoKSkgPj0gMFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGtleXMgPSBhcmdzWzFdIHx8IF9rZXlzKGl0ZW0pO1xuICAgICAgICBrZXlzID0gW10uY29uY2F0KGtleXMpO1xuXG4gICAgICAgIGxldCByZXRWYWwgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGFyZ3NbMF0gJiYgYXJnc1swXS50b0xvd2VyQ2FzZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtW2tleV0gPT09ICdzdHJpbmcnIHx8IGl0ZW1ba2V5XSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldFN0cmluZ1RvVGVzdChpdGVtW2tleV0sIHRyYW5zbGF0ZSlcbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIC5pbmRleE9mKGFyZ3NbMF0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgIHJldFZhbCA9IHJldFZhbCB8fCAoYXJnc1syXSA9PT0gZmFsc2UgPyBpbmRleCA8IDAgOiBpbmRleCA+PSAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCFhcmdzWzBdICYmIGFyZ3NbMV0pIHtcbiAgICAgICAgICAgIGxldCBib29sID0gaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICFpc0JsYW5rKGl0ZW1ba2V5XSk7IC8vaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGl0ZW1ba2V5XTtcbiAgICAgICAgICAgIHJldFZhbCA9IHJldFZhbCB8fCAoYXJnc1syXSA9PT0gZmFsc2UgPyAhYm9vbCA6IGJvb2wpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3RyaW5nVG9UZXN0KHM6IHN0cmluZywgdHJhbnNsYXRlOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAodHJhbnNsYXRlICYmIHRoaXMudHJhbnNsYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuZ2V0KHMudG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICB9XG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { Translate } from '../../services/translate/translate.service';
import { isUndefined } from 'lodash-es';
export class TranslatePipe {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    transform(value, ...args) {
        /** @type {?} */
        let interpolateParams;
        if (!isUndefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                /** @type {?} */
                let validArgs = args[0].replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":').replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        return this.translate.get(value, interpolateParams);
    }
}
TranslatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'translate'
            },] }
];
/** @nocollapse */
TranslatePipe.ctorParameters = () => [
    { type: Translate }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TranslatePipe.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90cmFuc2xhdGUvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvdHJhbnNsYXRlL3RyYW5zbGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUt4QyxNQUFNLE9BQU8sYUFBYTs7OztJQUN4QixZQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQzs7Ozs7O0lBRTVDLFNBQVMsQ0FBQyxLQUFhLEVBQUUsR0FBRyxJQUFjOztZQUNwQyxpQkFBMEI7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3hDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7O29CQUM3QyxTQUFTLEdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDO2dCQUM3SCxJQUFJO29CQUNGLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzNDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLE1BQU0sSUFBSSxXQUFXLENBQUMsd0VBQXdFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzFHO2FBQ0Y7aUJBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNqRSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdEQsQ0FBQzs7O1lBckJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsV0FBVzthQUNsQjs7OztZQUxRLFNBQVM7Ozs7Ozs7SUFPSixrQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90cmFuc2xhdGUvdHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICd0cmFuc2xhdGUnXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZSkge31cblxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgLi4uYXJnczogc3RyaW5nW10pOiBhbnkge1xuICAgIGxldCBpbnRlcnBvbGF0ZVBhcmFtcyE6IE9iamVjdDtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKGFyZ3NbMF0pICYmIGFyZ3MubGVuZ3RoKSB7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnICYmIGFyZ3NbMF0ubGVuZ3RoKSB7XG4gICAgICAgIGxldCB2YWxpZEFyZ3M6IHN0cmluZyA9IGFyZ3NbMF0ucmVwbGFjZSgvKFxcJyk/KFthLXpBLVowLTlfXSspKFxcJyk/KFxccyk/Oi9nLCAnXCIkMlwiOicpLnJlcGxhY2UoLzooXFxzKT8oXFwnKSguKj8pKFxcJykvZywgJzpcIiQzXCInKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpbnRlcnBvbGF0ZVBhcmFtcyA9IEpTT04ucGFyc2UodmFsaWRBcmdzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgV3JvbmcgcGFyYW1ldGVyIGluIFRyYW5zbGF0ZVBpcGUuIEV4cGVjdGVkIGEgdmFsaWQgT2JqZWN0LCByZWNlaXZlZDogJHthcmdzWzBdfWApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgICBpbnRlcnBvbGF0ZVBhcmFtcyA9IGFyZ3NbMF07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5nZXQodmFsdWUsIGludGVycG9sYXRlUGFyYW1zKTtcbiAgfVxufVxuIl19
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { Translate } from '../../services/translate/translate.service';
import { isUndefined } from 'lodash-es';
var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    TranslatePipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        /** @type {?} */
        var interpolateParams;
        if (!isUndefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                /** @type {?} */
                var validArgs = args[0].replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":').replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        return this.translate.get(value, interpolateParams);
    };
    TranslatePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'translate'
                },] }
    ];
    /** @nocollapse */
    TranslatePipe.ctorParameters = function () { return [
        { type: Translate }
    ]; };
    return TranslatePipe;
}());
export { TranslatePipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TranslatePipe.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90cmFuc2xhdGUvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvdHJhbnNsYXRlL3RyYW5zbGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV4QztJQUlFLHVCQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQzs7Ozs7O0lBRTVDLGlDQUFTOzs7OztJQUFULFVBQVUsS0FBYTtRQUFFLGNBQWlCO2FBQWpCLFVBQWlCLEVBQWpCLHFCQUFpQixFQUFqQixJQUFpQjtZQUFqQiw2QkFBaUI7OztZQUNwQyxpQkFBMEI7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3hDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7O29CQUM3QyxTQUFTLEdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDO2dCQUM3SCxJQUFJO29CQUNGLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzNDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLE1BQU0sSUFBSSxXQUFXLENBQUMsMEVBQXdFLElBQUksQ0FBQyxDQUFDLENBQUcsQ0FBQyxDQUFDO2lCQUMxRzthQUNGO2lCQUFNLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDakUsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7O2dCQXJCRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLFdBQVc7aUJBQ2xCOzs7O2dCQUxRLFNBQVM7O0lBeUJsQixvQkFBQztDQUFBLEFBdEJELElBc0JDO1NBbkJZLGFBQWE7Ozs7OztJQUNaLGtDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RyYW5zbGF0ZS90cmFuc2xhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3RyYW5zbGF0ZSdcbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlKSB7fVxuXG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSk6IGFueSB7XG4gICAgbGV0IGludGVycG9sYXRlUGFyYW1zITogT2JqZWN0O1xuICAgIGlmICghaXNVbmRlZmluZWQoYXJnc1swXSkgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgJiYgYXJnc1swXS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHZhbGlkQXJnczogc3RyaW5nID0gYXJnc1swXS5yZXBsYWNlKC8oXFwnKT8oW2EtekEtWjAtOV9dKykoXFwnKT8oXFxzKT86L2csICdcIiQyXCI6JykucmVwbGFjZSgvOihcXHMpPyhcXCcpKC4qPykoXFwnKS9nLCAnOlwiJDNcIicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGludGVycG9sYXRlUGFyYW1zID0gSlNPTi5wYXJzZSh2YWxpZEFyZ3MpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBXcm9uZyBwYXJhbWV0ZXIgaW4gVHJhbnNsYXRlUGlwZS4gRXhwZWN0ZWQgYSB2YWxpZCBPYmplY3QsIHJlY2VpdmVkOiAke2FyZ3NbMF19YCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICAgIGludGVycG9sYXRlUGFyYW1zID0gYXJnc1swXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmdldCh2YWx1ZSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICB9XG59XG4iXX0=
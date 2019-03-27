/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} blackList
 * @return {?}
 */
export function AutoUnsubscribe(blackList) {
    if (blackList === void 0) { blackList = []; }
    return (/**
     * @param {?} constructor
     * @return {?}
     */
    function (constructor) {
        /** @type {?} */
        var original = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnDestroy = (/**
         * @return {?}
         */
        function () {
            for (var prop in this) {
                /** @type {?} */
                var property = this[prop];
                if (blackList.indexOf(prop) < 0) {
                    if (property && typeof property.unsubscribe === 'function') {
                        property.unsubscribe();
                    }
                }
            }
            if (original && typeof original === 'function') {
                original.apply(this, arguments);
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3Vuc3Vic2NyaWJlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9kZWNvcmF0b3JzL2F1dG91bnN1YnNjcmliZS9hdXRvdW5zdWJzY3JpYmUuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLGVBQWUsQ0FBQyxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLGNBQTZCO0lBQzNEOzs7O0lBQU8sVUFBUyxXQUFXOztZQUNuQixRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXO1FBRWxELFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVzs7O1FBQUc7WUFDbEMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7O29CQUNmLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMzQixJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMvQixJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO3dCQUMxRCxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQ3hCO2lCQUNGO2FBQ0Y7WUFDRCxJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7Z0JBQzlDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQyxDQUFBLENBQUM7SUFDSixDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIEF1dG9VbnN1YnNjcmliZShibGFja0xpc3Q6IEFycmF5PHN0cmluZz4gPSBbXSkge1xuICByZXR1cm4gZnVuY3Rpb24oY29uc3RydWN0b3IpIHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZS5uZ09uRGVzdHJveTtcblxuICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gdGhpc1twcm9wXTtcbiAgICAgICAgaWYgKGJsYWNrTGlzdC5pbmRleE9mKHByb3ApIDwgMCkge1xuICAgICAgICAgIGlmIChwcm9wZXJ0eSAmJiB0eXBlb2YgcHJvcGVydHkudW5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHByb3BlcnR5LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob3JpZ2luYWwgJiYgdHlwZW9mIG9yaWdpbmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==
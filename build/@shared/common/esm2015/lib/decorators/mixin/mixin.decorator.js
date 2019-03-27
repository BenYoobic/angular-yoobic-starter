/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} baseCtors
 * @return {?}
 */
export function MixIn(baseCtors) {
    return (/**
     * @param {?} derivedCtor
     * @return {?}
     */
    function (derivedCtor) {
        baseCtors.forEach((/**
         * @param {?} baseCtor
         * @return {?}
         */
        baseCtor => {
            /** @type {?} */
            const fieldCollector = {};
            baseCtor.apply(fieldCollector);
            Object.getOwnPropertyNames(fieldCollector).forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => {
                derivedCtor.prototype[name] = fieldCollector[name];
            }));
            Object.getOwnPropertyNames(baseCtor.prototype).forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => {
                if (name !== 'constructor') {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                }
            }));
        }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4aW4uZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2RlY29yYXRvcnMvbWl4aW4vbWl4aW4uZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLEtBQUssQ0FBQyxTQUFxQjtJQUN6Qzs7OztJQUFPLFVBQVMsV0FBcUI7UUFDbkMsU0FBUyxDQUFDLE9BQU87Ozs7UUFBQyxRQUFRLENBQUMsRUFBRTs7a0JBQ3JCLGNBQWMsR0FBRyxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsQ0FBQyxFQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUQsSUFBSSxJQUFJLEtBQUssYUFBYSxFQUFFO29CQUMxQixXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3hEO1lBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gTWl4SW4oYmFzZUN0b3JzOiBGdW5jdGlvbltdKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZXJpdmVkQ3RvcjogRnVuY3Rpb24pIHtcbiAgICBiYXNlQ3RvcnMuZm9yRWFjaChiYXNlQ3RvciA9PiB7XG4gICAgICBjb25zdCBmaWVsZENvbGxlY3RvciA9IHt9O1xuICAgICAgYmFzZUN0b3IuYXBwbHkoZmllbGRDb2xsZWN0b3IpO1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZmllbGRDb2xsZWN0b3IpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGRlcml2ZWRDdG9yLnByb3RvdHlwZVtuYW1lXSA9IGZpZWxkQ29sbGVjdG9yW25hbWVdO1xuICAgICAgfSk7XG5cbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKG5hbWUgIT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xufVxuIl19
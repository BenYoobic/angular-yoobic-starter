/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { cloneDeep } from 'lodash-es';
var IModel = /** @class */ (function () {
    function IModel(className) {
        this.className = className;
        this.searchableFields = new Array();
        this.mappingFields = new Map();
        this._formFields = new Array();
        this.appearance = new Map();
    }
    Object.defineProperty(IModel.prototype, "formFields", {
        get: /**
         * @return {?}
         */
        function () {
            return cloneDeep(this._formFields);
        },
        set: /**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            this._formFields = f;
        },
        enumerable: true,
        configurable: true
    });
    return IModel;
}());
export { IModel };
if (false) {
    /** @type {?} */
    IModel.prototype.className;
    /** @type {?} */
    IModel.prototype.collectionName;
    /** @type {?} */
    IModel.prototype.searchableFields;
    /** @type {?} */
    IModel.prototype.fields;
    /** @type {?} */
    IModel.prototype.mappingFields;
    /** @type {?} */
    IModel.prototype.appearance;
    /** @type {?} */
    IModel.prototype.include;
    /** @type {?} */
    IModel.prototype.searchSubquery;
    /** @type {?} */
    IModel.prototype.feathersService;
    /** @type {?} */
    IModel.prototype.type;
    /** @type {?} */
    IModel.prototype.isCustom;
    /** @type {?} */
    IModel.prototype.detailComponent;
    /** @type {?} */
    IModel.prototype.icon;
    /**
     * @type {?}
     * @private
     */
    IModel.prototype._formFields;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvbW9kZWwvbW9kZWwuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXRDO0lBdUJFLGdCQUFZLFNBQVM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7UUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO0lBQzNDLENBQUM7SUFiRCxzQkFBVyw4QkFBVTs7OztRQUFyQjtZQUNFLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7OztRQUNELFVBQXNCLENBQW9CO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7OztPQUhBO0lBWUgsYUFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7Ozs7SUE3QkMsMkJBQWtCOztJQUNsQixnQ0FBdUI7O0lBQ3ZCLGtDQUFnQzs7SUFDaEMsd0JBQXNCOztJQUN0QiwrQkFBbUM7O0lBQ25DLDRCQUE2Qjs7SUFDN0IseUJBQXVCOztJQUN2QixnQ0FBMEU7O0lBQzFFLGlDQUF5Qjs7SUFDekIsc0JBQVU7O0lBQ1YsMEJBQW1COztJQUNuQixpQ0FBeUI7O0lBQ3pCLHNCQUFjOzs7OztJQUVkLDZCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElGb3JtRmllbGQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgY2xvbmVEZWVwIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuZXhwb3J0IGNsYXNzIElNb2RlbCB7XG4gIGNsYXNzTmFtZTogc3RyaW5nO1xuICBjb2xsZWN0aW9uTmFtZTogc3RyaW5nO1xuICBzZWFyY2hhYmxlRmllbGRzOiBBcnJheTxzdHJpbmc+O1xuICBmaWVsZHM6IEFycmF5PHN0cmluZz47XG4gIG1hcHBpbmdGaWVsZHM6IE1hcDxudW1iZXIsIHN0cmluZz47XG4gIGFwcGVhcmFuY2U6IE1hcDxzdHJpbmcsIGFueT47XG4gIGluY2x1ZGU6IEFycmF5PHN0cmluZz47XG4gIHNlYXJjaFN1YnF1ZXJ5OiB7IGNvbGxlY3Rpb25OYW1lOiBzdHJpbmc7IGZpZWxkOiBzdHJpbmc7IHZhbHVlczogc3RyaW5nIH07XG4gIGZlYXRoZXJzU2VydmljZT86IHN0cmluZztcbiAgdHlwZTogYW55O1xuICBpc0N1c3RvbT86IGJvb2xlYW47XG4gIGRldGFpbENvbXBvbmVudD86IHN0cmluZztcbiAgaWNvbj86IHN0cmluZztcblxuICBwcml2YXRlIF9mb3JtRmllbGRzOiBBcnJheTxJRm9ybUZpZWxkPjtcbiAgcHVibGljIGdldCBmb3JtRmllbGRzKCk6IEFycmF5PElGb3JtRmllbGQ+IHtcbiAgICByZXR1cm4gY2xvbmVEZWVwKHRoaXMuX2Zvcm1GaWVsZHMpO1xuICB9XG4gIHB1YmxpYyBzZXQgZm9ybUZpZWxkcyhmOiBBcnJheTxJRm9ybUZpZWxkPikge1xuICAgIHRoaXMuX2Zvcm1GaWVsZHMgPSBmO1xuICB9XG5cbiAgY29uc3RydWN0b3IoY2xhc3NOYW1lKSB7XG4gICAgdGhpcy5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgdGhpcy5zZWFyY2hhYmxlRmllbGRzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICB0aGlzLm1hcHBpbmdGaWVsZHMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPigpO1xuICAgIHRoaXMuX2Zvcm1GaWVsZHMgPSBuZXcgQXJyYXk8SUZvcm1GaWVsZD4oKTtcbiAgICB0aGlzLmFwcGVhcmFuY2UgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICB9XG59XG4iXX0=
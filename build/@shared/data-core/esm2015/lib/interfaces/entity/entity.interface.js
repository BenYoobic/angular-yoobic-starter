/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IAcl() { }
if (false) {
    /** @type {?} */
    IAcl.prototype.creator;
    /** @type {?} */
    IAcl.prototype.groups;
}
/**
 * @record
 */
export function IEntity() { }
if (false) {
    /** @type {?|undefined} */
    IEntity.prototype._id;
    /** @type {?|undefined} */
    IEntity.prototype._acl;
    /** @type {?|undefined} */
    IEntity.prototype._lmt;
    /** @type {?|undefined} */
    IEntity.prototype._ect;
}
/**
 * @record
 */
export function IProperty() { }
if (false) {
    /** @type {?|undefined} */
    IProperty.prototype.title;
    /** @type {?|undefined} */
    IProperty.prototype.type;
    /** @type {?} */
    IProperty.prototype.values;
}
export class Entity {
    /**
     * @param {?=} source
     */
    constructor(source) {
        if (typeof source === 'string' || typeof source === 'number' || typeof source === 'boolean' || typeof source === 'undefined') {
            this._id = source;
        }
    }
}
if (false) {
    /** @type {?} */
    Entity.prototype._id;
    /** @type {?} */
    Entity.prototype._acl;
    /** @type {?} */
    Entity.prototype._lmt;
    /** @type {?} */
    Entity.prototype._ect;
    /** @type {?} */
    Entity.prototype.properties;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2VudGl0eS9lbnRpdHkuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwQkFJQzs7O0lBSEMsdUJBQWdCOztJQUNoQixzQkFBK0M7Ozs7O0FBSWpELDZCQUtDOzs7SUFKQyxzQkFBZ0M7O0lBQ2hDLHVCQUFZOztJQUNaLHVCQUFjOztJQUNkLHVCQUFjOzs7OztBQUdoQiwrQkFJQzs7O0lBSEMsMEJBQWU7O0lBQ2YseUJBQWM7O0lBQ2QsMkJBQW1COztBQUdyQixNQUFNLE9BQU8sTUFBTTs7OztJQVFqQixZQUFZLE1BQVk7UUFDdEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxLQUFLLFNBQVMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDNUgsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7U0FDbkI7SUFDSCxDQUFDO0NBQ0Y7OztJQVpDLHFCQUF1Qzs7SUFDdkMsc0JBQW1COztJQUNuQixzQkFBcUI7O0lBQ3JCLHNCQUFxQjs7SUFFckIsNEJBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJQWNsIHtcbiAgY3JlYXRvcjogc3RyaW5nO1xuICBncm91cHM6IHsgcjogQXJyYXk8c3RyaW5nPjsgdzogQXJyYXk8c3RyaW5nPiB9O1xuICAvL3VzZXJzOiB7IHI6IEFycmF5PHN0cmluZz47IHc6IEFycmF5PHN0cmluZz4gfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRW50aXR5IHtcbiAgX2lkPzogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbjtcbiAgX2FjbD86IElBY2w7XG4gIF9sbXQ/OiBzdHJpbmc7XG4gIF9lY3Q/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BlcnR5IHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHR5cGU/OiBzdHJpbmc7XG4gIHZhbHVlczogQXJyYXk8YW55Pjtcbn1cblxuZXhwb3J0IGNsYXNzIEVudGl0eSBpbXBsZW1lbnRzIElFbnRpdHkge1xuICBwdWJsaWMgX2lkPzogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbjtcbiAgcHVibGljIF9hY2w/OiBJQWNsO1xuICBwdWJsaWMgX2xtdD86IHN0cmluZztcbiAgcHVibGljIF9lY3Q/OiBzdHJpbmc7XG5cbiAgcHVibGljIHByb3BlcnRpZXM/OiBJUHJvcGVydHlbXTtcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2U/OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHNvdXJjZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHNvdXJjZSA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBzb3VyY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLl9pZCA9IHNvdXJjZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
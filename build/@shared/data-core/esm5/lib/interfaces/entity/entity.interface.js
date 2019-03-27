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
var Entity = /** @class */ (function () {
    function Entity(source) {
        if (typeof source === 'string' || typeof source === 'number' || typeof source === 'boolean' || typeof source === 'undefined') {
            this._id = source;
        }
    }
    return Entity;
}());
export { Entity };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2VudGl0eS9lbnRpdHkuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwQkFJQzs7O0lBSEMsdUJBQWdCOztJQUNoQixzQkFBK0M7Ozs7O0FBSWpELDZCQUtDOzs7SUFKQyxzQkFBZ0M7O0lBQ2hDLHVCQUFZOztJQUNaLHVCQUFjOztJQUNkLHVCQUFjOzs7OztBQUdoQiwrQkFJQzs7O0lBSEMsMEJBQWU7O0lBQ2YseUJBQWM7O0lBQ2QsMkJBQW1COztBQUdyQjtJQVFFLGdCQUFZLE1BQVk7UUFDdEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxLQUFLLFNBQVMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDNUgsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUFiRCxJQWFDOzs7O0lBWkMscUJBQXVDOztJQUN2QyxzQkFBbUI7O0lBQ25CLHNCQUFxQjs7SUFDckIsc0JBQXFCOztJQUVyQiw0QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIElBY2wge1xuICBjcmVhdG9yOiBzdHJpbmc7XG4gIGdyb3VwczogeyByOiBBcnJheTxzdHJpbmc+OyB3OiBBcnJheTxzdHJpbmc+IH07XG4gIC8vdXNlcnM6IHsgcjogQXJyYXk8c3RyaW5nPjsgdzogQXJyYXk8c3RyaW5nPiB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFbnRpdHkge1xuICBfaWQ/OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xuICBfYWNsPzogSUFjbDtcbiAgX2xtdD86IHN0cmluZztcbiAgX2VjdD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcGVydHkge1xuICB0aXRsZT86IHN0cmluZztcbiAgdHlwZT86IHN0cmluZztcbiAgdmFsdWVzOiBBcnJheTxhbnk+O1xufVxuXG5leHBvcnQgY2xhc3MgRW50aXR5IGltcGxlbWVudHMgSUVudGl0eSB7XG4gIHB1YmxpYyBfaWQ/OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xuICBwdWJsaWMgX2FjbD86IElBY2w7XG4gIHB1YmxpYyBfbG10Pzogc3RyaW5nO1xuICBwdWJsaWMgX2VjdD86IHN0cmluZztcblxuICBwdWJsaWMgcHJvcGVydGllcz86IElQcm9wZXJ0eVtdO1xuXG4gIGNvbnN0cnVjdG9yKHNvdXJjZT86IGFueSkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygc291cmNlID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygc291cmNlID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIHNvdXJjZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuX2lkID0gc291cmNlO1xuICAgIH1cbiAgfVxufVxuIl19
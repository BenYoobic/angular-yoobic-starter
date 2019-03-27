/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IBounds() { }
if (false) {
    /** @type {?} */
    IBounds.prototype.northeast;
    /** @type {?} */
    IBounds.prototype.southwest;
}
/**
 * @record
 */
export function IGeometry() { }
if (false) {
    /** @type {?} */
    IGeometry.prototype.location;
    /** @type {?|undefined} */
    IGeometry.prototype.location_type;
    /** @type {?} */
    IGeometry.prototype.viewport;
    /** @type {?|undefined} */
    IGeometry.prototype.bounds;
}
/**
 * @record
 */
export function IAutocompleteInput() { }
if (false) {
    /** @type {?} */
    IAutocompleteInput.prototype.input;
    /** @type {?|undefined} */
    IAutocompleteInput.prototype.offset;
    /** @type {?|undefined} */
    IAutocompleteInput.prototype.location;
    /** @type {?|undefined} */
    IAutocompleteInput.prototype.radius;
    /** @type {?|undefined} */
    IAutocompleteInput.prototype.language;
    /** @type {?|undefined} */
    IAutocompleteInput.prototype.types;
    /** @type {?|undefined} */
    IAutocompleteInput.prototype.components;
}
/**
 * @record
 */
export function IAutocompletePrediction() { }
if (false) {
    /** @type {?} */
    IAutocompletePrediction.prototype.description;
    /** @type {?} */
    IAutocompletePrediction.prototype.place_id;
    /** @type {?} */
    IAutocompletePrediction.prototype.reference;
    /** @type {?} */
    IAutocompletePrediction.prototype.id;
    /** @type {?} */
    IAutocompletePrediction.prototype.terms;
    /** @type {?} */
    IAutocompletePrediction.prototype.types;
    /** @type {?} */
    IAutocompletePrediction.prototype.matched_substrings;
}
/**
 * @record
 */
export function IAutocompleteResponse() { }
if (false) {
    /** @type {?} */
    IAutocompleteResponse.prototype.status;
    /** @type {?} */
    IAutocompleteResponse.prototype.predictions;
    /** @type {?|undefined} */
    IAutocompleteResponse.prototype.error_message;
}
/**
 * @record
 */
export function INearbySearchInput() { }
if (false) {
    /** @type {?} */
    INearbySearchInput.prototype.location;
    /** @type {?} */
    INearbySearchInput.prototype.radius;
    /** @type {?|undefined} */
    INearbySearchInput.prototype.keyword;
    /** @type {?|undefined} */
    INearbySearchInput.prototype.language;
    /** @type {?|undefined} */
    INearbySearchInput.prototype.minprice;
    /** @type {?|undefined} */
    INearbySearchInput.prototype.maxprice;
    /** @type {?|undefined} */
    INearbySearchInput.prototype.name;
    /** @type {?|undefined} */
    INearbySearchInput.prototype.opennow;
    /** @type {?|undefined} */
    INearbySearchInput.prototype.rankby;
    /** @type {?|undefined} */
    INearbySearchInput.prototype.type;
    /** @type {?|undefined} */
    INearbySearchInput.prototype.types;
}
/**
 * @record
 */
export function INearbySearchResult() { }
if (false) {
    /** @type {?|undefined} */
    INearbySearchResult.prototype.icon;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.id;
    /** @type {?} */
    INearbySearchResult.prototype.geometry;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.name;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.opening_hours;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.photos;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.place_id;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.scope;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.alt_ids;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.price_level;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.rating;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.reference;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.types;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.vicinity;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.formatted_address;
    /** @type {?|undefined} */
    INearbySearchResult.prototype.permanently_closed;
}
/**
 * @record
 */
export function INearbySearchResponse() { }
if (false) {
    /** @type {?} */
    INearbySearchResponse.prototype.status;
    /** @type {?} */
    INearbySearchResponse.prototype.results;
    /** @type {?|undefined} */
    INearbySearchResponse.prototype.html_attributions;
    /** @type {?|undefined} */
    INearbySearchResponse.prototype.next_page_token;
    /** @type {?|undefined} */
    INearbySearchResponse.prototype.error_message;
}
/**
 * @record
 */
export function IGeocodeInput() { }
if (false) {
    /** @type {?|undefined} */
    IGeocodeInput.prototype.address;
    /** @type {?|undefined} */
    IGeocodeInput.prototype.bounds;
    /** @type {?|undefined} */
    IGeocodeInput.prototype.language;
    /** @type {?|undefined} */
    IGeocodeInput.prototype.region;
    /** @type {?|undefined} */
    IGeocodeInput.prototype.components;
}
/**
 * @record
 */
export function IGeocodeResult() { }
if (false) {
    /** @type {?|undefined} */
    IGeocodeResult.prototype.id;
    /** @type {?|undefined} */
    IGeocodeResult.prototype.types;
    /** @type {?|undefined} */
    IGeocodeResult.prototype.formatted_address;
    /** @type {?|undefined} */
    IGeocodeResult.prototype.address_components;
    /** @type {?|undefined} */
    IGeocodeResult.prototype.postcode_localities;
    /** @type {?|undefined} */
    IGeocodeResult.prototype.geometry;
    /** @type {?|undefined} */
    IGeocodeResult.prototype.partial_match;
    /** @type {?|undefined} */
    IGeocodeResult.prototype.place_id;
}
/**
 * @record
 */
export function IGeocodeResponse() { }
if (false) {
    /** @type {?} */
    IGeocodeResponse.prototype.status;
    /** @type {?} */
    IGeocodeResponse.prototype.results;
    /** @type {?|undefined} */
    IGeocodeResponse.prototype.error_message;
}
/**
 * @record
 */
export function IReverseGeocodeInput() { }
if (false) {
    /** @type {?|undefined} */
    IReverseGeocodeInput.prototype.latlng;
    /** @type {?|undefined} */
    IReverseGeocodeInput.prototype.place_id;
    /** @type {?|undefined} */
    IReverseGeocodeInput.prototype.language;
    /** @type {?|undefined} */
    IReverseGeocodeInput.prototype.result_type;
    /** @type {?|undefined} */
    IReverseGeocodeInput.prototype.location_type;
}
/**
 * @record
 */
export function IReverseGeocodeResponse() { }
if (false) {
    /** @type {?} */
    IReverseGeocodeResponse.prototype.status;
    /** @type {?} */
    IReverseGeocodeResponse.prototype.results;
    /** @type {?|undefined} */
    IReverseGeocodeResponse.prototype.error_message;
}
/**
 * @record
 */
export function IResolvedAddressLocationResultDebug() { }
if (false) {
    /** @type {?|undefined} */
    IResolvedAddressLocationResultDebug.prototype.stepsCompleted;
    /** @type {?|undefined} */
    IResolvedAddressLocationResultDebug.prototype.stepsSucceeded;
    /** @type {?|undefined} */
    IResolvedAddressLocationResultDebug.prototype.candidate;
    /** @type {?|undefined} */
    IResolvedAddressLocationResultDebug.prototype.geocode;
    /** @type {?|undefined} */
    IResolvedAddressLocationResultDebug.prototype.nearby;
    /** @type {?|undefined} */
    IResolvedAddressLocationResultDebug.prototype.predictions;
}
/**
 * @record
 */
export function IResolvedAddressLocationResult() { }
if (false) {
    /** @type {?} */
    IResolvedAddressLocationResult.prototype.source;
    /** @type {?} */
    IResolvedAddressLocationResult.prototype.address;
    /** @type {?} */
    IResolvedAddressLocationResult.prototype.coords;
    /** @type {?|undefined} */
    IResolvedAddressLocationResult.prototype.location_type;
    /** @type {?|undefined} */
    IResolvedAddressLocationResult.prototype.description;
}
/**
 * @record
 */
export function IResolvedAddressLocationInput() { }
if (false) {
    /** @type {?} */
    IResolvedAddressLocationInput.prototype.address;
    /** @type {?|undefined} */
    IResolvedAddressLocationInput.prototype.language;
    /** @type {?|undefined} */
    IResolvedAddressLocationInput.prototype.search;
    /** @type {?|undefined} */
    IResolvedAddressLocationInput.prototype.type;
    /** @type {?|undefined} */
    IResolvedAddressLocationInput.prototype.nearbyRadius;
    /** @type {?|undefined} */
    IResolvedAddressLocationInput.prototype.skipName;
    /** @type {?|undefined} */
    IResolvedAddressLocationInput.prototype.debug;
    /** @type {?|undefined} */
    IResolvedAddressLocationInput.prototype.limit;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlbWFwcy5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9nb29nbGVtYXBzL2dvb2dsZW1hcHMuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSw2QkFHQzs7O0lBRkMsNEJBQW1COztJQUNuQiw0QkFBbUI7Ozs7O0FBR3JCLCtCQUtDOzs7SUFKQyw2QkFBa0I7O0lBQ2xCLGtDQUF1Qjs7SUFDdkIsNkJBQWtCOztJQUNsQiwyQkFBaUI7Ozs7O0FBR25CLHdDQVFDOzs7SUFQQyxtQ0FBYzs7SUFDZCxvQ0FBZ0I7O0lBQ2hCLHNDQUFrQjs7SUFDbEIsb0NBQWdCOztJQUNoQixzQ0FBa0I7O0lBQ2xCLG1DQUFlOztJQUNmLHdDQUFvQjs7Ozs7QUFHdEIsNkNBa0JDOzs7SUFqQkMsOENBQW9COztJQUNwQiwyQ0FBaUI7O0lBQ2pCLDRDQUFrQjs7SUFDbEIscUNBQVc7O0lBQ1gsd0NBS0U7O0lBQ0Ysd0NBQXFCOztJQUNyQixxREFLRTs7Ozs7QUFHSiwyQ0FJQzs7O0lBSEMsdUNBQWU7O0lBQ2YsNENBQXVDOztJQUN2Qyw4Q0FBdUI7Ozs7O0FBR3pCLHdDQVlDOzs7SUFYQyxzQ0FBaUI7O0lBQ2pCLG9DQUFlOztJQUNmLHFDQUFpQjs7SUFDakIsc0NBQWtCOztJQUNsQixzQ0FBa0I7O0lBQ2xCLHNDQUFrQjs7SUFDbEIsa0NBQWM7O0lBQ2QscUNBQWtCOztJQUNsQixvQ0FBZ0I7O0lBQ2hCLGtDQUFjOztJQUNkLG1DQUFlOzs7OztBQUdqQix5Q0E2QkM7OztJQTVCQyxtQ0FBYzs7SUFDZCxpQ0FBWTs7SUFDWix1Q0FBb0I7O0lBQ3BCLG1DQUFjOztJQUNkLDRDQUVFOztJQUNGLHFDQU9FOztJQUNGLHVDQUFrQjs7SUFDbEIsb0NBQWU7O0lBQ2Ysc0NBR0U7O0lBQ0YsMENBQXFCOztJQUNyQixxQ0FBZ0I7O0lBQ2hCLHdDQUFtQjs7SUFDbkIsb0NBQWlCOztJQUNqQix1Q0FBa0I7O0lBQ2xCLGdEQUEyQjs7SUFDM0IsaURBQTZCOzs7OztBQUcvQiwyQ0FNQzs7O0lBTEMsdUNBQWU7O0lBQ2Ysd0NBQStCOztJQUMvQixrREFBNkI7O0lBQzdCLGdEQUF5Qjs7SUFDekIsOENBQXVCOzs7OztBQUd6QixtQ0FNQzs7O0lBTEMsZ0NBQWlCOztJQUNqQiwrQkFBZ0I7O0lBQ2hCLGlDQUFrQjs7SUFDbEIsK0JBQWdCOztJQUNoQixtQ0FBb0I7Ozs7O0FBR3RCLG9DQWVDOzs7SUFkQyw0QkFBWTs7SUFDWiwrQkFBaUI7O0lBQ2pCLDJDQUEyQjs7SUFDM0IsNENBTUU7O0lBQ0YsNkNBQStCOztJQUMvQixrQ0FBcUI7O0lBQ3JCLHVDQUF3Qjs7SUFDeEIsa0NBQWtCOzs7OztBQUdwQixzQ0FJQzs7O0lBSEMsa0NBQWU7O0lBQ2YsbUNBQTBCOztJQUMxQix5Q0FBdUI7Ozs7O0FBR3pCLDBDQU1DOzs7SUFMQyxzQ0FBZ0I7O0lBQ2hCLHdDQUFrQjs7SUFDbEIsd0NBQWtCOztJQUNsQiwyQ0FBcUI7O0lBQ3JCLDZDQUF1Qjs7Ozs7QUFHekIsNkNBSUM7OztJQUhDLHlDQUFlOztJQUNmLDBDQUEwQjs7SUFDMUIsZ0RBQXVCOzs7OztBQUd6Qix5REFPQzs7O0lBTkMsNkRBQTBCOztJQUMxQiw2REFBMEI7O0lBQzFCLHdEQUEyQjs7SUFDM0Isc0RBQTJCOztJQUMzQixxREFBMEI7O0lBQzFCLDBEQUErQjs7Ozs7QUFHakMsb0RBTUM7OztJQUxDLGdEQUFlOztJQUNmLGlEQUFnQjs7SUFDaEIsZ0RBQWdCOztJQUNoQix1REFBdUI7O0lBQ3ZCLHFEQUFxQjs7Ozs7QUFHdkIsbURBU0M7OztJQVJDLGdEQUFnQjs7SUFDaEIsaURBQWtCOztJQUNsQiwrQ0FBZ0I7O0lBQ2hCLDZDQUFjOztJQUNkLHFEQUFzQjs7SUFDdEIsaURBQW1COztJQUNuQiw4Q0FBZ0I7O0lBQ2hCLDhDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExuZyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmRzIHtcbiAgbm9ydGhlYXN0OiBJTGF0TG5nO1xuICBzb3V0aHdlc3Q6IElMYXRMbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdlb21ldHJ5IHtcbiAgbG9jYXRpb246IElMYXRMbmc7XG4gIGxvY2F0aW9uX3R5cGU/OiBzdHJpbmc7XG4gIHZpZXdwb3J0OiBJQm91bmRzO1xuICBib3VuZHM/OiBJQm91bmRzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvY29tcGxldGVJbnB1dCB7XG4gIGlucHV0OiBzdHJpbmc7XG4gIG9mZnNldD86IG51bWJlcjtcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG4gIHJhZGl1cz86IG51bWJlcjtcbiAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIHR5cGVzPzogc3RyaW5nO1xuICBjb21wb25lbnRzPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvY29tcGxldGVQcmVkaWN0aW9uIHtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcGxhY2VfaWQ6IHN0cmluZztcbiAgcmVmZXJlbmNlOiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG4gIHRlcm1zOiBbXG4gICAge1xuICAgICAgdmFsdWU6IHN0cmluZztcbiAgICAgIG9mZnNldDogbnVtYmVyO1xuICAgIH1cbiAgXTtcbiAgdHlwZXM6IEFycmF5PHN0cmluZz47XG4gIG1hdGNoZWRfc3Vic3RyaW5nczogW1xuICAgIHtcbiAgICAgIG9mZnNldDogbnVtYmVyO1xuICAgICAgbGVuZ3RoOiBudW1iZXI7XG4gICAgfVxuICBdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvY29tcGxldGVSZXNwb25zZSB7XG4gIHN0YXR1czogc3RyaW5nO1xuICBwcmVkaWN0aW9uczogSUF1dG9jb21wbGV0ZVByZWRpY3Rpb25bXTtcbiAgZXJyb3JfbWVzc2FnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTmVhcmJ5U2VhcmNoSW5wdXQge1xuICBsb2NhdGlvbjogc3RyaW5nO1xuICByYWRpdXM6IG51bWJlcjtcbiAga2V5d29yZD86IHN0cmluZztcbiAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIG1pbnByaWNlPzogbnVtYmVyO1xuICBtYXhwcmljZT86IG51bWJlcjtcbiAgbmFtZT86IHN0cmluZztcbiAgb3Blbm5vdz86IGJvb2xlYW47XG4gIHJhbmtieT86IHN0cmluZztcbiAgdHlwZT86IHN0cmluZztcbiAgdHlwZXM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5lYXJieVNlYXJjaFJlc3VsdCB7XG4gIGljb24/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICBnZW9tZXRyeTogSUdlb21ldHJ5O1xuICBuYW1lPzogc3RyaW5nO1xuICBvcGVuaW5nX2hvdXJzPzoge1xuICAgIG9wZW5fbm93OiBib29sZWFuO1xuICB9O1xuICBwaG90b3M/OiBbXG4gICAge1xuICAgICAgcGhvdG9fcmVmZXJlbmNlOiBzdHJpbmc7XG4gICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICBodG1sX2F0dHJpYnV0aW9ucz86IHN0cmluZ1tdO1xuICAgIH1cbiAgXTtcbiAgcGxhY2VfaWQ/OiBzdHJpbmc7XG4gIHNjb3BlPzogc3RyaW5nO1xuICBhbHRfaWRzPzoge1xuICAgIHBsYWNlX2lkOiBzdHJpbmc7XG4gICAgc2NvcGU6IHN0cmluZztcbiAgfTtcbiAgcHJpY2VfbGV2ZWw/OiBudW1iZXI7XG4gIHJhdGluZz86IG51bWJlcjtcbiAgcmVmZXJlbmNlPzogc3RyaW5nO1xuICB0eXBlcz86IHN0cmluZ1tdO1xuICB2aWNpbml0eT86IHN0cmluZztcbiAgZm9ybWF0dGVkX2FkZHJlc3M/OiBzdHJpbmc7XG4gIHBlcm1hbmVudGx5X2Nsb3NlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5lYXJieVNlYXJjaFJlc3BvbnNlIHtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIHJlc3VsdHM6IElOZWFyYnlTZWFyY2hSZXN1bHRbXTtcbiAgaHRtbF9hdHRyaWJ1dGlvbnM/OiBzdHJpbmdbXTtcbiAgbmV4dF9wYWdlX3Rva2VuPzogc3RyaW5nO1xuICBlcnJvcl9tZXNzYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElHZW9jb2RlSW5wdXQge1xuICBhZGRyZXNzPzogc3RyaW5nO1xuICBib3VuZHM/OiBzdHJpbmc7XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICByZWdpb24/OiBzdHJpbmc7XG4gIGNvbXBvbmVudHM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdlb2NvZGVSZXN1bHQge1xuICBpZD86IHN0cmluZztcbiAgdHlwZXM/OiBzdHJpbmdbXTtcbiAgZm9ybWF0dGVkX2FkZHJlc3M/OiBzdHJpbmc7XG4gIGFkZHJlc3NfY29tcG9uZW50cz86IFtcbiAgICB7XG4gICAgICB0eXBlczogc3RyaW5nO1xuICAgICAgbG9uZ19uYW1lOiBzdHJpbmc7XG4gICAgICBzaG9ydF9uYW1lOiBzdHJpbmc7XG4gICAgfVxuICBdO1xuICBwb3N0Y29kZV9sb2NhbGl0aWVzPzogc3RyaW5nW107XG4gIGdlb21ldHJ5PzogSUdlb21ldHJ5O1xuICBwYXJ0aWFsX21hdGNoPzogYm9vbGVhbjtcbiAgcGxhY2VfaWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdlb2NvZGVSZXNwb25zZSB7XG4gIHN0YXR1czogc3RyaW5nO1xuICByZXN1bHRzOiBJR2VvY29kZVJlc3VsdFtdO1xuICBlcnJvcl9tZXNzYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElSZXZlcnNlR2VvY29kZUlucHV0IHtcbiAgbGF0bG5nPzogc3RyaW5nO1xuICBwbGFjZV9pZD86IHN0cmluZztcbiAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIHJlc3VsdF90eXBlPzogc3RyaW5nO1xuICBsb2NhdGlvbl90eXBlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElSZXZlcnNlR2VvY29kZVJlc3BvbnNlIHtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIHJlc3VsdHM6IElHZW9jb2RlUmVzdWx0W107XG4gIGVycm9yX21lc3NhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlc29sdmVkQWRkcmVzc0xvY2F0aW9uUmVzdWx0RGVidWcge1xuICBzdGVwc0NvbXBsZXRlZD86IHN0cmluZ1tdO1xuICBzdGVwc1N1Y2NlZWRlZD86IHN0cmluZ1tdO1xuICBjYW5kaWRhdGU/OiBJR2VvY29kZVJlc3VsdDtcbiAgZ2VvY29kZT86IElHZW9jb2RlUmVzdWx0W107XG4gIG5lYXJieT86IElHZW9jb2RlUmVzdWx0W107XG4gIHByZWRpY3Rpb25zPzogSUdlb2NvZGVSZXN1bHRbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVzb2x2ZWRBZGRyZXNzTG9jYXRpb25SZXN1bHQgZXh0ZW5kcyBJUmVzb2x2ZWRBZGRyZXNzTG9jYXRpb25SZXN1bHREZWJ1ZyB7XG4gIHNvdXJjZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvb3JkczogSUxhdExuZztcbiAgbG9jYXRpb25fdHlwZT86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlc29sdmVkQWRkcmVzc0xvY2F0aW9uSW5wdXQge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICBzZWFyY2g/OiBzdHJpbmc7XG4gIHR5cGU/OiBzdHJpbmc7XG4gIG5lYXJieVJhZGl1cz86IG51bWJlcjtcbiAgc2tpcE5hbWU/OiBib29sZWFuO1xuICBkZWJ1Zz86IGJvb2xlYW47XG4gIGxpbWl0PzogbnVtYmVyO1xufVxuIl19
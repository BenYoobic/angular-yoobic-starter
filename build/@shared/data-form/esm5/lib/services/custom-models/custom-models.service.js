/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Network, Persistent } from '@shared/common';
import { Config, Requestor, Models, Broker } from '@shared/data-core';
import { CustomModel } from '../../interfaces/custom-model/custom-model.interface';
import { map } from 'rxjs/operators';
var CustomModels = /** @class */ (function () {
    function CustomModels(config, rq, broker, network) {
        this.config = config;
        this.rq = rq;
        this.broker = broker;
        this.network = network;
    }
    /**
     * @param {?} name
     * @param {?} customModel
     * @return {?}
     */
    CustomModels.prototype.registerModel = /**
     * @param {?} name
     * @param {?} customModel
     * @return {?}
     */
    function (name, customModel) {
        var _this = this;
        /** @type {?} */
        var properties = customModel.fields.map((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            /** @type {?} */
            var retVal = {};
            retVal[field.name] = {
                type: 'string'
            };
            return retVal;
        }));
        properties.unshift({
            _id: (/** @type {?} */ ({
                type: 'string',
                id: true,
                generated: true
            }))
        });
        customModel.properties = properties;
        customModel.permissions = 'private';
        return this.broker.upsert('custommodels', customModel).pipe(map((/**
         * @return {?}
         */
        function () {
            _this.registerModelForClient(customModel);
        })));
    };
    /**
     * @param {?} customModel
     * @return {?}
     */
    CustomModels.prototype.registerModelForClient = /**
     * @param {?} customModel
     * @return {?}
     */
    function (customModel) {
        Models.clearCollectionName(customModel.name);
        Models.setCollectionName(customModel.name, customModel.name, ['*'], [], null, customModel.feathersService, CustomModel, true);
        if (customModel.fields) {
            customModel.fields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                if (field) {
                    Models.addFormField(customModel.name, field);
                    if (field.searchable) {
                        Models.addSearchableField(customModel.name, field.name);
                    }
                }
            }));
        }
        if (customModel.appearance) {
            for (var key in customModel.appearance) {
                if (customModel.appearance.hasOwnProperty(key)) {
                    Models.addAppearance(customModel.name, key, customModel.appearance[key]);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    CustomModels.prototype.registerModelsForClient = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.network.isOffline()) {
            this.broker.getAll('custommodels', null, null, null, null, null, null, 10000).subscribe((/**
             * @param {?} ret
             * @return {?}
             */
            function (ret) {
                if (ret.data) {
                    _this.customModels = ret.data;
                    ret.data.forEach((/**
                     * @param {?} customModel
                     * @return {?}
                     */
                    function (customModel) {
                        _this.registerModelForClient(customModel);
                    }));
                }
            }));
        }
        else if (this.customModels) {
            this.customModels.forEach((/**
             * @param {?} customModel
             * @return {?}
             */
            function (customModel) {
                _this.registerModelForClient(customModel);
            }));
        }
    };
    CustomModels.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CustomModels.ctorParameters = function () { return [
        { type: Config },
        { type: Requestor },
        { type: Broker },
        { type: Network }
    ]; };
    tslib_1.__decorate([
        Persistent('custommodels.offline', false, null, true),
        tslib_1.__metadata("design:type", Array)
    ], CustomModels.prototype, "customModels", void 0);
    return CustomModels;
}());
export { CustomModels };
if (false) {
    /** @type {?} */
    CustomModels.prototype.customModels;
    /**
     * @type {?}
     * @protected
     */
    CustomModels.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    CustomModels.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    CustomModels.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    CustomModels.prototype.network;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1vZGVscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2N1c3RvbS1tb2RlbHMvY3VzdG9tLW1vZGVscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFHbkYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDO0lBSUUsc0JBQXNCLE1BQWMsRUFBWSxFQUFhLEVBQVksTUFBYyxFQUFZLE9BQWdCO1FBQTdGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBWSxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQVM7SUFBRyxDQUFDOzs7Ozs7SUFFdkgsb0NBQWE7Ozs7O0lBQWIsVUFBYyxJQUFZLEVBQUUsV0FBd0I7UUFBcEQsaUJBc0JDOztZQXJCSyxVQUFVLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxLQUFLOztnQkFDdkMsTUFBTSxHQUFHLEVBQUU7WUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNuQixJQUFJLEVBQUUsUUFBUTthQUNmLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLEVBQUM7UUFDRixVQUFVLENBQUMsT0FBTyxDQUFDO1lBQ2pCLEdBQUcsRUFBRSxtQkFBSztnQkFDUixJQUFJLEVB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VXlDO1FBQXRELFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzswQ0FBc0IsS0FBSztzREFBYztJQWtFakcsbUJBQUM7Q0FBQSxBQXBFRCxJQW9FQztTQW5FWSxZQUFZOzs7SUFDdkIsb0NBQStGOzs7OztJQUVuRiw4QkFBd0I7Ozs7O0lBQUUsMEJBQXVCOzs7OztJQUFFLDhCQUF3Qjs7Ozs7SUFBRSwrQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5ldHdvcmssIFBlcnNpc3RlbnQgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWcsIFJlcXVlc3RvciwgTW9kZWxzLCBCcm9rZXIgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5cbmltcG9ydCB7IEN1c3RvbU1vZGVsIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jdXN0b20tbW9kZWwvY3VzdG9tLW1vZGVsLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEN1c3RvbU1vZGVscyB7XG4gIEBQZXJzaXN0ZW50KCdjdXN0b21tb2RlbHMub2ZmbGluZScsIGZhbHNlLCBudWxsLCB0cnVlKSBwdWJsaWMgY3VzdG9tTW9kZWxzOiBBcnJheTxDdXN0b21Nb2RlbD47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLCBwcm90ZWN0ZWQgcnE6IFJlcXVlc3RvciwgcHJvdGVjdGVkIGJyb2tlcjogQnJva2VyLCBwcm90ZWN0ZWQgbmV0d29yazogTmV0d29yaykge31cblxuICByZWdpc3Rlck1vZGVsKG5hbWU6IHN0cmluZywgY3VzdG9tTW9kZWw6IEN1c3RvbU1vZGVsKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgcHJvcGVydGllcyA9IGN1c3RvbU1vZGVsLmZpZWxkcy5tYXAoZmllbGQgPT4ge1xuICAgICAgbGV0IHJldFZhbCA9IHt9O1xuICAgICAgcmV0VmFsW2ZpZWxkLm5hbWVdID0ge1xuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgfTtcbiAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfSk7XG4gICAgcHJvcGVydGllcy51bnNoaWZ0KHtcbiAgICAgIF9pZDogPGFueT57XG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgZ2VuZXJhdGVkOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gICAgY3VzdG9tTW9kZWwucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgY3VzdG9tTW9kZWwucGVybWlzc2lvbnMgPSAncHJpdmF0ZSc7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLnVwc2VydCgnY3VzdG9tbW9kZWxzJywgY3VzdG9tTW9kZWwpLnBpcGUoXG4gICAgICBtYXAoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyTW9kZWxGb3JDbGllbnQoY3VzdG9tTW9kZWwpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcmVnaXN0ZXJNb2RlbEZvckNsaWVudChjdXN0b21Nb2RlbDogQ3VzdG9tTW9kZWwpIHtcbiAgICBNb2RlbHMuY2xlYXJDb2xsZWN0aW9uTmFtZShjdXN0b21Nb2RlbC5uYW1lKTtcbiAgICBNb2RlbHMuc2V0Q29sbGVjdGlvbk5hbWUoY3VzdG9tTW9kZWwubmFtZSwgY3VzdG9tTW9kZWwubmFtZSwgWycqJ10sIFtdLCBudWxsLCBjdXN0b21Nb2RlbC5mZWF0aGVyc1NlcnZpY2UsIEN1c3RvbU1vZGVsLCB0cnVlKTtcbiAgICBpZiAoY3VzdG9tTW9kZWwuZmllbGRzKSB7XG4gICAgICBjdXN0b21Nb2RlbC5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgIE1vZGVscy5hZGRGb3JtRmllbGQoY3VzdG9tTW9kZWwubmFtZSwgZmllbGQpO1xuICAgICAgICAgIGlmIChmaWVsZC5zZWFyY2hhYmxlKSB7XG4gICAgICAgICAgICBNb2RlbHMuYWRkU2VhcmNoYWJsZUZpZWxkKGN1c3RvbU1vZGVsLm5hbWUsIGZpZWxkLm5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChjdXN0b21Nb2RlbC5hcHBlYXJhbmNlKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY3VzdG9tTW9kZWwuYXBwZWFyYW5jZSkge1xuICAgICAgICBpZiAoY3VzdG9tTW9kZWwuYXBwZWFyYW5jZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgTW9kZWxzLmFkZEFwcGVhcmFuY2UoY3VzdG9tTW9kZWwubmFtZSwga2V5LCBjdXN0b21Nb2RlbC5hcHBlYXJhbmNlW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJNb2RlbHNGb3JDbGllbnQoKSB7XG4gICAgaWYgKCF0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHRoaXMuYnJva2VyLmdldEFsbCgnY3VzdG9tbW9kZWxzJywgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgMTAwMDApLnN1YnNjcmliZShyZXQgPT4ge1xuICAgICAgICBpZiAocmV0LmRhdGEpIHtcbiAgICAgICAgICB0aGlzLmN1c3RvbU1vZGVscyA9IHJldC5kYXRhO1xuICAgICAgICAgIHJldC5kYXRhLmZvckVhY2goKGN1c3RvbU1vZGVsOiBDdXN0b21Nb2RlbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck1vZGVsRm9yQ2xpZW50KGN1c3RvbU1vZGVsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbU1vZGVscykge1xuICAgICAgdGhpcy5jdXN0b21Nb2RlbHMuZm9yRWFjaCgoY3VzdG9tTW9kZWw6IEN1c3RvbU1vZGVsKSA9PiB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJNb2RlbEZvckNsaWVudChjdXN0b21Nb2RlbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
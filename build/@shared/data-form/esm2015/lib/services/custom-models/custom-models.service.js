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
export class CustomModels {
    /**
     * @param {?} config
     * @param {?} rq
     * @param {?} broker
     * @param {?} network
     */
    constructor(config, rq, broker, network) {
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
    registerModel(name, customModel) {
        /** @type {?} */
        let properties = customModel.fields.map((/**
         * @param {?} field
         * @return {?}
         */
        field => {
            /** @type {?} */
            let retVal = {};
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
        () => {
            this.registerModelForClient(customModel);
        })));
    }
    /**
     * @param {?} customModel
     * @return {?}
     */
    registerModelForClient(customModel) {
        Models.clearCollectionName(customModel.name);
        Models.setCollectionName(customModel.name, customModel.name, ['*'], [], null, customModel.feathersService, CustomModel, true);
        if (customModel.fields) {
            customModel.fields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            field => {
                if (field) {
                    Models.addFormField(customModel.name, field);
                    if (field.searchable) {
                        Models.addSearchableField(customModel.name, field.name);
                    }
                }
            }));
        }
        if (customModel.appearance) {
            for (let key in customModel.appearance) {
                if (customModel.appearance.hasOwnProperty(key)) {
                    Models.addAppearance(customModel.name, key, customModel.appearance[key]);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    registerModelsForClient() {
        if (!this.network.isOffline()) {
            this.broker.getAll('custommodels', null, null, null, null, null, null, 10000).subscribe((/**
             * @param {?} ret
             * @return {?}
             */
            ret => {
                if (ret.data) {
                    this.customModels = ret.data;
                    ret.data.forEach((/**
                     * @param {?} customModel
                     * @return {?}
                     */
                    (customModel) => {
                        this.registerModelForClient(customModel);
                    }));
                }
            }));
        }
        else if (this.customModels) {
            this.customModels.forEach((/**
             * @param {?} customModel
             * @return {?}
             */
            (customModel) => {
                this.registerModelForClient(customModel);
            }));
        }
    }
}
CustomModels.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CustomModels.ctorParameters = () => [
    { type: Config },
    { type: Requestor },
    { type: Broker },
    { type: Network }
];
tslib_1.__decorate([
    Persistent('custommodels.offline', false, null, true),
    tslib_1.__metadata("design:type", Array)
], CustomModels.prototype, "customModels", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1vZGVscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2N1c3RvbS1tb2RlbHMvY3VzdG9tLW1vZGVscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFHbkYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE1BQU0sT0FBTyxZQUFZOzs7Ozs7O0lBR3ZCLFlBQXNCLE1BQWMsRUFBWSxFQUFhLEVBQVksTUFBYyxFQUFZLE9BQWdCO1FBQTdGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBWSxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQVM7SUFBRyxDQUFDOzs7Ozs7SUFFdkgsYUFBYSxDQUFDLElBQVksRUFBRSxXQUF3Qjs7WUFDOUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFOztnQkFDMUMsTUFBTSxHQUFHLEVBQUU7WUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNuQixJQUFJLEVBQUUsUUFBUTthQUNmLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLEVBQUM7UUFDRixVQUFVLENBQUMsT0FBTyxDQUFDO1lBQ2pCLEdBQUcsRUFBRSxtQkFBSztnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxFQUFFLEVBQUUsSUFBSTtnQkFDUixTQUFTLEVBQUUsSUFBSTthQUNoQixFQUFBO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDcEMsV0FBVyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUN6RCxHQUFHOzs7UUFBQyxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsc0JBQXNCLENBQUMsV0FBd0I7UUFDN0MsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsZUFBZSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5SCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1lBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO3dCQUNwQixNQUFNLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3pEO2lCQUNGO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRTtZQUMxQixLQUFLLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RDLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzlDLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUMxRTthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzVGLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDWixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztvQkFBQyxDQUFDLFdBQXdCLEVBQUUsRUFBRTt3QkFDNUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUMzQyxDQUFDLEVBQUMsQ0FBQztpQkFDSjtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxXQUF3QixFQUFFLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7O1lBbkVGLFVBQVU7Ozs7WUFQRixNQUFNO1lBQUUsU0FBUztZQUFVLE1BQU07WUFEakMsT0FBTzs7QUFVeUM7SUFBdEQsVUFBVSxDQUFDLHNCQUFzQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO3NDQUFzQixLQUFLO2tEQUFjOzs7SUFBL0Ysb0NBQStGOzs7OztJQUVuRiw4QkFBd0I7Ozs7O0lBQUUsMEJBQXVCOzs7OztJQUFFLDhCQUF3Qjs7Ozs7SUFBRSwrQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5ldHdvcmssIFBlcnNpc3RlbnQgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWcsIFJlcXVlc3RvciwgTW9kZWxzLCBCcm9rZXIgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5cbmltcG9ydCB7IEN1c3RvbU1vZGVsIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jdXN0b20tbW9kZWwvY3VzdG9tLW1vZGVsLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEN1c3RvbU1vZGVscyB7XG4gIEBQZXJzaXN0ZW50KCdjdXN0b21tb2RlbHMub2ZmbGluZScsIGZhbHNlLCBudWxsLCB0cnVlKSBwdWJsaWMgY3VzdG9tTW9kZWxzOiBBcnJheTxDdXN0b21Nb2RlbD47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLCBwcm90ZWN0ZWQgcnE6IFJlcXVlc3RvciwgcHJvdGVjdGVkIGJyb2tlcjogQnJva2VyLCBwcm90ZWN0ZWQgbmV0d29yazogTmV0d29yaykge31cblxuICByZWdpc3Rlck1vZGVsKG5hbWU6IHN0cmluZywgY3VzdG9tTW9kZWw6IEN1c3RvbU1vZGVsKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgcHJvcGVydGllcyA9IGN1c3RvbU1vZGVsLmZpZWxkcy5tYXAoZmllbGQgPT4ge1xuICAgICAgbGV0IHJldFZhbCA9IHt9O1xuICAgICAgcmV0VmFsW2ZpZWxkLm5hbWVdID0ge1xuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgfTtcbiAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfSk7XG4gICAgcHJvcGVydGllcy51bnNoaWZ0KHtcbiAgICAgIF9pZDogPGFueT57XG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgZ2VuZXJhdGVkOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gICAgY3VzdG9tTW9kZWwucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgY3VzdG9tTW9kZWwucGVybWlzc2lvbnMgPSAncHJpdmF0ZSc7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLnVwc2VydCgnY3VzdG9tbW9kZWxzJywgY3VzdG9tTW9kZWwpLnBpcGUoXG4gICAgICBtYXAoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyTW9kZWxGb3JDbGllbnQoY3VzdG9tTW9kZWwpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcmVnaXN0ZXJNb2RlbEZvckNsaWVudChjdXN0b21Nb2RlbDogQ3VzdG9tTW9kZWwpIHtcbiAgICBNb2RlbHMuY2xlYXJDb2xsZWN0aW9uTmFtZShjdXN0b21Nb2RlbC5uYW1lKTtcbiAgICBNb2RlbHMuc2V0Q29sbGVjdGlvbk5hbWUoY3VzdG9tTW9kZWwubmFtZSwgY3VzdG9tTW9kZWwubmFtZSwgWycqJ10sIFtdLCBudWxsLCBjdXN0b21Nb2RlbC5mZWF0aGVyc1NlcnZpY2UsIEN1c3RvbU1vZGVsLCB0cnVlKTtcbiAgICBpZiAoY3VzdG9tTW9kZWwuZmllbGRzKSB7XG4gICAgICBjdXN0b21Nb2RlbC5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgIE1vZGVscy5hZGRGb3JtRmllbGQoY3VzdG9tTW9kZWwubmFtZSwgZmllbGQpO1xuICAgICAgICAgIGlmIChmaWVsZC5zZWFyY2hhYmxlKSB7XG4gICAgICAgICAgICBNb2RlbHMuYWRkU2VhcmNoYWJsZUZpZWxkKGN1c3RvbU1vZGVsLm5hbWUsIGZpZWxkLm5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChjdXN0b21Nb2RlbC5hcHBlYXJhbmNlKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY3VzdG9tTW9kZWwuYXBwZWFyYW5jZSkge1xuICAgICAgICBpZiAoY3VzdG9tTW9kZWwuYXBwZWFyYW5jZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgTW9kZWxzLmFkZEFwcGVhcmFuY2UoY3VzdG9tTW9kZWwubmFtZSwga2V5LCBjdXN0b21Nb2RlbC5hcHBlYXJhbmNlW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJNb2RlbHNGb3JDbGllbnQoKSB7XG4gICAgaWYgKCF0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHRoaXMuYnJva2VyLmdldEFsbCgnY3VzdG9tbW9kZWxzJywgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgMTAwMDApLnN1YnNjcmliZShyZXQgPT4ge1xuICAgICAgICBpZiAocmV0LmRhdGEpIHtcbiAgICAgICAgICB0aGlzLmN1c3RvbU1vZGVscyA9IHJldC5kYXRhO1xuICAgICAgICAgIHJldC5kYXRhLmZvckVhY2goKGN1c3RvbU1vZGVsOiBDdXN0b21Nb2RlbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck1vZGVsRm9yQ2xpZW50KGN1c3RvbU1vZGVsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbU1vZGVscykge1xuICAgICAgdGhpcy5jdXN0b21Nb2RlbHMuZm9yRWFjaCgoY3VzdG9tTW9kZWw6IEN1c3RvbU1vZGVsKSA9PiB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJNb2RlbEZvckNsaWVudChjdXN0b21Nb2RlbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
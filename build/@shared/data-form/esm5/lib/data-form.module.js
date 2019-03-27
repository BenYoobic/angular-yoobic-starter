/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataCoreModule } from '@shared/data-core';
import { CommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';
import { CellRenderer } from './services/cell-renderer/cell-renderer.service';
import { Conditions } from './services/conditions/conditions.service';
import { FormDynamicBuilder } from './services/form-dynamic-builder/form-dynamic-builder.service';
import { Mapping } from './services/mapping/mapping.service';
import { Chart } from './services/chart/chart.service';
import { CustomModels } from './services/custom-models/custom-models.service';
/** @type {?} */
var PROVIDERS = [CellRenderer, Conditions, FormDynamicBuilder, Mapping, Chart, CustomModels];
var DataFormModule = /** @class */ (function () {
    function DataFormModule() {
    }
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    DataFormModule.forRoot = /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    function (configuredProviders) {
        if (configuredProviders === void 0) { configuredProviders = []; }
        return {
            ngModule: DataFormModule,
            providers: tslib_1.__spread(PROVIDERS, configuredProviders)
        };
    };
    DataFormModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    entryComponents: [],
                    imports: [FormsModule, ReactiveFormsModule, DataCoreModule, TranslateModule, CommonModule],
                    exports: [FormsModule, ReactiveFormsModule, DataCoreModule, TranslateModule, CommonModule]
                },] }
    ];
    return DataFormModule;
}());
export { DataFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDbEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7O0lBRXhFLFNBQVMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUM7QUFFOUY7SUFBQTtJQWFBLENBQUM7Ozs7O0lBTlEsc0JBQU87Ozs7SUFBZCxVQUFlLG1CQUF5QztRQUF6QyxvQ0FBQSxFQUFBLHdCQUF5QztRQUN0RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxtQkFBTSxTQUFTLEVBQUssbUJBQW1CLENBQUM7U0FDbEQsQ0FBQztJQUNKLENBQUM7O2dCQVpGLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUUsRUFBRTtvQkFDaEIsZUFBZSxFQUFFLEVBQUU7b0JBQ25CLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLFlBQVksQ0FBQztvQkFDMUYsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDO2lCQUMzRjs7SUFRRCxxQkFBQztDQUFBLEFBYkQsSUFhQztTQVBZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YUNvcmVNb2R1bGUgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5cbmltcG9ydCB7IENlbGxSZW5kZXJlciB9IGZyb20gJy4vc2VydmljZXMvY2VsbC1yZW5kZXJlci9jZWxsLXJlbmRlcmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZGl0aW9ucyB9IGZyb20gJy4vc2VydmljZXMvY29uZGl0aW9ucy9jb25kaXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybUR5bmFtaWNCdWlsZGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLWR5bmFtaWMtYnVpbGRlci9mb3JtLWR5bmFtaWMtYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcHBpbmcgfSBmcm9tICcuL3NlcnZpY2VzL21hcHBpbmcvbWFwcGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IENoYXJ0IH0gZnJvbSAnLi9zZXJ2aWNlcy9jaGFydC9jaGFydC5zZXJ2aWNlJztcbmltcG9ydCB7IEN1c3RvbU1vZGVscyB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tLW1vZGVscy9jdXN0b20tbW9kZWxzLnNlcnZpY2UnO1xuXG5jb25zdCBQUk9WSURFUlMgPSBbQ2VsbFJlbmRlcmVyLCBDb25kaXRpb25zLCBGb3JtRHluYW1pY0J1aWxkZXIsIE1hcHBpbmcsIENoYXJ0LCBDdXN0b21Nb2RlbHNdO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtdLFxuICBpbXBvcnRzOiBbRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIERhdGFDb3JlTW9kdWxlLCBUcmFuc2xhdGVNb2R1bGUsIENvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRGF0YUNvcmVNb2R1bGUsIFRyYW5zbGF0ZU1vZHVsZSwgQ29tbW9uTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhRm9ybU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyZWRQcm92aWRlcnM6IEFycmF5PFByb3ZpZGVyPiA9IFtdKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEYXRhRm9ybU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWy4uLlBST1ZJREVSUywgLi4uY29uZmlndXJlZFByb3ZpZGVyc11cbiAgICB9O1xuICB9XG59XG4iXX0=
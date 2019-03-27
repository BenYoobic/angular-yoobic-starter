/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const PROVIDERS = [CellRenderer, Conditions, FormDynamicBuilder, Mapping, Chart, CustomModels];
export class DataFormModule {
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    static forRoot(configuredProviders = []) {
        return {
            ngModule: DataFormModule,
            providers: [...PROVIDERS, ...configuredProviders]
        };
    }
}
DataFormModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                entryComponents: [],
                imports: [FormsModule, ReactiveFormsModule, DataCoreModule, TranslateModule, CommonModule],
                exports: [FormsModule, ReactiveFormsModule, DataCoreModule, TranslateModule, CommonModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzlFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDN0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQzs7TUFFeEUsU0FBUyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQztBQVE5RixNQUFNLE9BQU8sY0FBYzs7Ozs7SUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQkFBdUMsRUFBRTtRQUN0RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsR0FBRyxtQkFBbUIsQ0FBQztTQUNsRCxDQUFDO0lBQ0osQ0FBQzs7O1lBWkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxFQUFFO2dCQUNoQixlQUFlLEVBQUUsRUFBRTtnQkFDbkIsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDO2dCQUMxRixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7YUFDM0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YUNvcmVNb2R1bGUgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5cbmltcG9ydCB7IENlbGxSZW5kZXJlciB9IGZyb20gJy4vc2VydmljZXMvY2VsbC1yZW5kZXJlci9jZWxsLXJlbmRlcmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZGl0aW9ucyB9IGZyb20gJy4vc2VydmljZXMvY29uZGl0aW9ucy9jb25kaXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybUR5bmFtaWNCdWlsZGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLWR5bmFtaWMtYnVpbGRlci9mb3JtLWR5bmFtaWMtYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcHBpbmcgfSBmcm9tICcuL3NlcnZpY2VzL21hcHBpbmcvbWFwcGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IENoYXJ0IH0gZnJvbSAnLi9zZXJ2aWNlcy9jaGFydC9jaGFydC5zZXJ2aWNlJztcbmltcG9ydCB7IEN1c3RvbU1vZGVscyB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tLW1vZGVscy9jdXN0b20tbW9kZWxzLnNlcnZpY2UnO1xuXG5jb25zdCBQUk9WSURFUlMgPSBbQ2VsbFJlbmRlcmVyLCBDb25kaXRpb25zLCBGb3JtRHluYW1pY0J1aWxkZXIsIE1hcHBpbmcsIENoYXJ0LCBDdXN0b21Nb2RlbHNdO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtdLFxuICBpbXBvcnRzOiBbRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIERhdGFDb3JlTW9kdWxlLCBUcmFuc2xhdGVNb2R1bGUsIENvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRGF0YUNvcmVNb2R1bGUsIFRyYW5zbGF0ZU1vZHVsZSwgQ29tbW9uTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhRm9ybU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyZWRQcm92aWRlcnM6IEFycmF5PFByb3ZpZGVyPiA9IFtdKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEYXRhRm9ybU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWy4uLlBST1ZJREVSUywgLi4uY29uZmlndXJlZFByb3ZpZGVyc11cbiAgICB9O1xuICB9XG59XG4iXX0=
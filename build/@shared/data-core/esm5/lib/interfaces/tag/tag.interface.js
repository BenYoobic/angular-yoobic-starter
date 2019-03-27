/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { ITag } from '@shared/stencil';
var Tag = /** @class */ (function (_super) {
    tslib_1.__extends(Tag, _super);
    function Tag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Searchable('Tag'),
        tslib_1.__metadata("design:type", String)
    ], Tag.prototype, "tag", void 0);
    Tag = tslib_1.__decorate([
        Model({
            className: 'Tag',
            collectionName: 'tags',
            fields: ['*'],
            include: []
        })
    ], Tag);
    return Tag;
}(ITag));
export { Tag };
if (false) {
    /** @type {?} */
    Tag.prototype.tag;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL3RhZy90YWcuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUU5RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBUWQsK0JBQUk7OztJQUU3QixDQUFDO0lBRG9CO1FBQWxCLFVBQVUsQ0FBQyxLQUFLLENBQUM7O29DQUFhO0lBRHBCLEdBQUc7UUFOZixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsS0FBSztZQUNoQixjQUFjLEVBQUUsTUFBTTtZQUN0QixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDYixPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7T0FDVyxHQUFHLENBRWY7SUFBRCxVQUFDO0NBQUEsQ0FGd0IsSUFBSSxHQUU1QjtTQUZZLEdBQUc7OztJQUNkLGtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5cbmltcG9ydCB7IElUYWcgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdUYWcnLFxuICBjb2xsZWN0aW9uTmFtZTogJ3RhZ3MnLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBUYWcgZXh0ZW5kcyBJVGFnIHtcbiAgQFNlYXJjaGFibGUoJ1RhZycpIHRhZzogc3RyaW5nO1xufVxuIl19
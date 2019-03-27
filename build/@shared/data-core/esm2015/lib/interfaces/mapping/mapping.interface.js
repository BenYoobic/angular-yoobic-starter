/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { IIMapping, FormFieldType } from '@shared/stencil';
// import { ADMIN_FILES_TYPE, FORMCREATOR_FILES_TYPE } from '../constants/constants.interface';
// let conditions = {
//   isAdmin: 'context == "admin"',
//   isFormCreator: 'context == "formCreator"',
//   isNotTranslation: 'context!="translation"'
// };
let IMapping = 
// import { ADMIN_FILES_TYPE, FORMCREATOR_FILES_TYPE } from '../constants/constants.interface';
// let conditions = {
//   isAdmin: 'context == "admin"',
//   isFormCreator: 'context == "formCreator"',
//   isNotTranslation: 'context!="translation"'
// };
class IMapping extends IIMapping {
};
tslib_1.__decorate([
    Editable('IMapping', {
        required: true,
        type: FormFieldType.documentuploader,
        filterable: false,
        title: 'DOCUMENT',
        extensions: ['csv', 'application', 'xls', 'xlsx']
    }) //'xls', 'xlsx', //'xls', 'xlsx', , 'application'
    ,
    tslib_1.__metadata("design:type", Object)
], IMapping.prototype, "document", void 0);
// import { ADMIN_FILES_TYPE, FORMCREATOR_FILES_TYPE } from '../constants/constants.interface';
// let conditions = {
//   isAdmin: 'context == "admin"',
//   isFormCreator: 'context == "formCreator"',
//   isNotTranslation: 'context!="translation"'
// };
IMapping = tslib_1.__decorate([
    Model({ className: 'IMapping' })
], IMapping);
export { IMapping };
if (false) {
    /** @type {?} */
    IMapping.prototype.type;
    /** @type {?} */
    IMapping.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGluZy5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9tYXBwaW5nL21hcHBpbmcuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0lBVTlDLFFBQVE7Ozs7Ozs7TUFBUixRQUFTLFNBQVEsU0FBUztDQW9CdEMsQ0FBQTtBQURDO0lBUEMsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNwQixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxhQUFhLENBQUMsZ0JBQWdCO1FBQ3BDLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLEtBQUssRUFBRSxVQUFVO1FBQ2pCLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztLQUNsRCxDQUFDLENBQUMsaURBQWlEOzs7MENBQ3RDOzs7Ozs7O0FBbkJILFFBQVE7SUFEcEIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDO0dBQ3BCLFFBQVEsQ0FvQnBCO1NBcEJZLFFBQVE7OztJQVVuQix3QkFBYTs7SUFFYiw0QkFPYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBJSU1hcHBpbmcsIEZvcm1GaWVsZFR5cGUgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuLy8gaW1wb3J0IHsgQURNSU5fRklMRVNfVFlQRSwgRk9STUNSRUFUT1JfRklMRVNfVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMuaW50ZXJmYWNlJztcblxuLy8gbGV0IGNvbmRpdGlvbnMgPSB7XG4vLyAgIGlzQWRtaW46ICdjb250ZXh0ID09IFwiYWRtaW5cIicsXG4vLyAgIGlzRm9ybUNyZWF0b3I6ICdjb250ZXh0ID09IFwiZm9ybUNyZWF0b3JcIicsXG4vLyAgIGlzTm90VHJhbnNsYXRpb246ICdjb250ZXh0IT1cInRyYW5zbGF0aW9uXCInXG4vLyB9O1xuXG5ATW9kZWwoeyBjbGFzc05hbWU6ICdJTWFwcGluZycgfSlcbmV4cG9ydCBjbGFzcyBJTWFwcGluZyBleHRlbmRzIElJTWFwcGluZyB7XG4gIC8vIEBFZGl0YWJsZSgnSU1hcHBpbmcnLCB7XG4gIC8vICAgcmVxdWlyZWQ6IHRydWUsXG4gIC8vICAgYXV0b3NlbGVjdDogdHJ1ZSxcbiAgLy8gICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgLy8gICBjb25kaXRpb25hbFZhbHVlczogW3sgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzQWRtaW4sIEFETUlOX0ZJTEVTX1RZUEUgfSwgeyBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNGb3JtQ3JlYXRvciwgdmFsdWVzOiBGT1JNQ1JFQVRPUl9GSUxFU19UWVBFIH1dLFxuICAvLyAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdFRyYW5zbGF0aW9uLFxuICAvLyAgIGRlZmF1bHRWYWx1ZXM6IEFETUlOX0ZJTEVTX1RZUEUsXG4gIC8vICAgdHJhbnNsYXRlOiB0cnVlXG4gIC8vIH0pXG4gIHR5cGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0lNYXBwaW5nJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZG9jdW1lbnR1cGxvYWRlcixcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICB0aXRsZTogJ0RPQ1VNRU5UJyxcbiAgICBleHRlbnNpb25zOiBbJ2NzdicsICdhcHBsaWNhdGlvbicsICd4bHMnLCAneGxzeCddXG4gIH0pIC8vJ3hscycsICd4bHN4JywgLy8neGxzJywgJ3hsc3gnLCAsICdhcHBsaWNhdGlvbidcbiAgZG9jdW1lbnQ6IGFueTtcbn1cbiJdfQ==
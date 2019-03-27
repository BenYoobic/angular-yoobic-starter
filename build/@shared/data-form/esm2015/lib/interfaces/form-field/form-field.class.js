/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model, Editable, Entity, ROLES_CONDITIONS, FORM_FILES_IMAGE_FILTER } from '@shared/data-core';
import { FormFieldType, MOBILE_FORM_FIELDS_ALL } from '@shared/stencil';
import { map as _map } from 'lodash-es';
/** @type {?} */
let conditions = {
    isNotInformation: 'type!="information"',
    isNotInformationOrTask: 'type!="information" and type!="task"',
    isNotInformationOrDocumentOrImage: 'type!="information" and type!="image" and type!="document"',
    isInformation: 'type=="information"',
    isVideoplayer: 'type=="videoplayer"',
    isAutocomplete: 'type=="autocomplete"',
    isCatalog: 'type=="catalog"',
    isImage: 'type=="image"',
    isDocument: 'type=="document"',
    isPhoto: 'type=="photo" or type=="multiphotos"',
    isMultiPhotos: 'type=="multiphotos"',
    isImageRecognition: 'isImageRecognition==1',
    hasAllowLibrary: 'type=="photo" or type=="video" or type=="multiphotos" or type=="todo"',
    isPhotoOrVideo: 'type=="photo" or type=="video" or type=="multiphotos"',
    isEmailReport: 'type=="emailreport"',
    isSelect: 'type=="select"',
    isSelectImage: 'type=="selectimage"',
    isAdress: 'type=="address"',
    isNumber: 'type=="number"',
    isDate: 'type=="date"',
    isTodo: 'type=="todo"',
    isNumberOrRange: 'type=="number" or type=="range" or type=="knob"',
    isNumberOrRangeOrStarrating: 'type=="number" or type=="range" or type=="starrating"or type=="knob"',
    isStarRating: 'type=="starrating"',
    isAudioOrVideo: 'type=="audio" or type=="video"',
    isConnect: 'type == "connect"',
    isGame: 'type == "game"',
    isFormula: 'type=="formula"',
    hasValues: 'type=="todo" or type=="photo" or type=="multiphotos" or type=="ranking" or type=="select" or type=="selectmulti" or type=="selectbuttons" or type=="selectchat" or type=="selectbuttonsmulti" or type=="autocomplete" or type=="emailreport" or type=="selectimage" or type=="missingword" or type=="swipeselect" or type=="game"',
    missionIsQuizz: (/** @type {?} */ ({ type: 'missionDescriptionAttribute', key: 'quizz', value: true })),
    hasSentence: 'type=="missingword" or type=="swipeselect" or type=="selectchat"',
    hasMultiple: 'type=="autocomplete" or type=="selectchat" or type=="selectimage" ',
    isReadOnly: 'readonly == 1'
};
// export function setConnectAnswerHandler(value, controls, data, form, requestor, dialog, viewContainerRef, changeDetectorRef) {
//   dialog
//     .upsert(
//       {},
//       '',
//       viewContainerRef,
//       null,
//       [
//         {
//           name: 'connectAnswer',
//           title: 'CONNECT',
//           type: FormFieldType.connect,
//           connectMode: data.connectMode,
//           leftValues: data.leftValues,
//           rightValues: data.rightValues
//         }
//       ],
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       false,
//       null
//     )
//     .then(retVal => {
//       if (retVal) {
//         data.answer = flatMap(retVal['connectAnswer']);
//         changeDetectorRef.markForCheck();
//       }
//     });
// }
let FormField = 
// export function setConnectAnswerHandler(value, controls, data, form, requestor, dialog, viewContainerRef, changeDetectorRef) {
//   dialog
//     .upsert(
//       {},
//       '',
//       viewContainerRef,
//       null,
//       [
//         {
//           name: 'connectAnswer',
//           title: 'CONNECT',
//           type: FormFieldType.connect,
//           connectMode: data.connectMode,
//           leftValues: data.leftValues,
//           rightValues: data.rightValues
//         }
//       ],
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       false,
//       null
//     )
//     .then(retVal => {
//       if (retVal) {
//         data.answer = flatMap(retVal['connectAnswer']);
//         changeDetectorRef.markForCheck();
//       }
//     });
// }
class FormField extends Entity {
};
tslib_1.__decorate([
    Editable('FormField', { type: FormFieldType.text, visible: false }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "name", void 0);
tslib_1.__decorate([
    Editable('FormField', { type: FormFieldType.text, required: true }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'INSTRUCTIONS',
        type: FormFieldType.textarea,
        condition: conditions.isNotInformation,
        language: 'html'
    }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "description", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'VALUE',
        required: true,
        type: FormFieldType.textarea,
        condition: conditions.isInformation,
        language: 'html'
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "value", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'URL',
        required: true,
        type: FormFieldType.text,
        condition: conditions.isVideoplayer
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "url", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'SENTENCE',
        type: FormFieldType.textarea,
        condition: conditions.hasSentence
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "sentence", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'FORMULA',
        type: FormFieldType.textarea,
        condition: conditions.isFormula
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "formula", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        required: true,
        values: _map(MOBILE_FORM_FIELDS_ALL, 'type'),
        translate: true
    }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "type", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'GAME',
        type: FormFieldType.autocomplete,
        values: ['runner-game', 'memory-card-game'],
        translate: true,
        condition: conditions.isGame,
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "game", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        required: true,
        collectionName: 'catalogs',
        idOnly: true,
        condition: conditions.isCatalog
    }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "catalog", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.checkbox,
        condition: [conditions.isCatalog, 'presence != 1'],
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "inventory", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.checkbox,
        condition: [conditions.isCatalog, 'inventory != 1'],
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "presence", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'CUSTOMMODEL',
        type: FormFieldType.autocomplete,
        collectionName: 'custommodels',
        idAttributeName: 'name',
        idOnly: true,
        condition: conditions.isAutocomplete,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "collectionName", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.toggle,
        condition: conditions.isAutocomplete,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "filterByLocation", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions.hasValues
    }),
    tslib_1.__metadata("design:type", Array)
], FormField.prototype, "values", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'MODE',
        type: FormFieldType.autocomplete,
        values: ['dragndrop', 'drawing'],
        translate: true,
        condition: conditions.isConnect,
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "connectMode", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions.isConnect
    }),
    tslib_1.__metadata("design:type", Array)
], FormField.prototype, "leftValues", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions.isConnect
    }),
    tslib_1.__metadata("design:type", Array)
], FormField.prototype, "rightValues", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions.isGame
    }),
    tslib_1.__metadata("design:type", Array)
], FormField.prototype, "correctValues", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions.isGame
    }),
    tslib_1.__metadata("design:type", Array)
], FormField.prototype, "wrongValues", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        collectionName: 'user',
        multiple: true,
        required: false,
        tag: true,
        condition: [conditions.isTodo],
        advanced: true
    }),
    tslib_1.__metadata("design:type", Array)
], FormField.prototype, "userTags", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'IMAGE',
        type: FormFieldType.autocomplete,
        filters: FORM_FILES_IMAGE_FILTER,
        forceModal: true,
        hiddenFields: ['mimeType'],
        mode: 'tile',
        pageSize: 20,
        fixedPosition: true,
        collectionName: 'files',
        condition: conditions.isImage,
        columnDefinition: { name: '_filename' }
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "image", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'IMAGE',
        type: FormFieldType.autocomplete,
        multiple: true,
        filters: FORM_FILES_IMAGE_FILTER,
        forceModal: true,
        hiddenFields: ['mimeType'],
        mode: 'tile',
        pageSize: 20,
        fixedPosition: true,
        collectionName: 'files',
        condition: conditions.isSelectImage,
        columnDefinition: { name: '_filename' }
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "images", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'DOCUMENT',
        type: FormFieldType.autocomplete,
        collectionName: 'files',
        condition: conditions.isDocument,
        columnDefinition: { name: '_filename' }
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "document", void 0);
tslib_1.__decorate([
    Editable('FormField', { type: FormFieldType.checkbox, condition: conditions.hasMultiple }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "multiple", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'BUTTONS',
        type: FormFieldType.checkbox,
        condition: conditions.isStarRating
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "useButtons", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'MODE',
        type: FormFieldType.autocomplete,
        values: ['youtube', 'url'],
        translate: true,
        condition: conditions.isVideoplayer,
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "mode", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        visible: false,
        type: FormFieldType.autocomplete,
        tag: true,
        multiple: true,
        allowCustomTag: true,
        condition: conditions.missionIsQuizz,
        dynamicValues: 'values'
    }),
    tslib_1.__metadata("design:type", Array)
], FormField.prototype, "answer", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        visible: false,
        type: FormFieldType.textarea,
        condition: conditions.missionIsQuizz
    }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "explanation", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'EXPLANATIONDOCUMENT',
        type: FormFieldType.autocomplete,
        collectionName: 'files',
        condition: conditions.missionIsQuizz,
        columnDefinition: { name: '_filename' }
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "explanationDocument", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.number,
        condition: [conditions.isMultiPhotos],
        flex: 50,
        externalValidators: [{ externalFieldName: 'maxPhotos', rule: 'lower' }]
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "minPhotos", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.number,
        condition: [conditions.isMultiPhotos],
        flex: 50,
        required: true,
        externalValidators: [{ externalFieldName: 'minPhotos', rule: 'higher' }]
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "maxPhotos", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'MANDATORY',
        type: FormFieldType.checkbox,
        condition: conditions.isNotInformationOrDocumentOrImage,
        flex: 50
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "required", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'ALLOWCOMMENTS',
        type: FormFieldType.checkbox,
        condition: conditions.isNotInformation,
        flex: 50
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "allowComments", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'AUTORELOAD',
        type: FormFieldType.checkbox,
        condition: conditions.isNotInformation,
        flex: 50
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "autoreload", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'ALLOWTASK',
        type: FormFieldType.checkbox,
        condition: [conditions.isNotInformationOrTask, ROLES_CONDITIONS.hasTodo],
        flex: 50
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "allowTask", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'SHARETOFEED',
        type: FormFieldType.checkbox,
        flex: 50,
        condition: [conditions.isPhoto]
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "shareToFeed", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'ALLPHOTOSREQUIRED',
        type: FormFieldType.checkbox,
        flex: 100,
        condition: [conditions.isTodo]
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "allPhotosRequired", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.checkbox,
        condition: conditions.isAutocomplete,
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "clearable", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'ALLOWTIME',
        type: FormFieldType.checkbox,
        condition: [conditions.isNotInformation],
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "allowTime", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'ALLOWLIBRARY',
        type: FormFieldType.checkbox,
        condition: conditions.hasAllowLibrary,
        flex: 100
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "allowLibrary", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'GEOLOC',
        type: FormFieldType.checkbox,
        condition: conditions.isPhotoOrVideo,
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "saveGeoloc", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'ALLOWHISTORY',
        type: FormFieldType.checkbox,
        condition: [ROLES_CONDITIONS.hasTodoOrScore],
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "allowHistory", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'ALLOWOPENDETAILS',
        type: FormFieldType.checkbox,
        flex: 100,
        condition: conditions.isSelectImage,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "allowOpenDetails", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'LINKTOPREVIOUSQUESTION',
        type: FormFieldType.checkbox,
        flex: 100,
        condition: [conditions.isTodo],
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "linked", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'ALLOWANNOTATE',
        type: FormFieldType.checkbox,
        condition: [conditions.isPhoto],
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "allowAnnotate", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'SHOWUSERSEMAIL',
        type: FormFieldType.checkbox,
        condition: conditions.isEmailReport,
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "showUsers", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'HIDEMOBILE',
        type: FormFieldType.checkbox,
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "hideMobile", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'OTHER1',
        type: FormFieldType.checkbox,
        condition: conditions.isSelect,
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "allowOther", void 0);
tslib_1.__decorate([
    Editable('FormField', { type: FormFieldType.checkbox, flex: 100, advanced: true }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "readonly", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'RADIUS',
        type: FormFieldType.number,
        condition: conditions.isAdress,
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "radius", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'MIN',
        type: FormFieldType.number,
        condition: conditions.isNumberOrRange,
        flex: 100,
        advanced: false,
        externalValidators: [{ externalFieldName: 'max', rule: 'lower' }]
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "min", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'MAX',
        type: FormFieldType.number,
        condition: conditions.isNumberOrRangeOrStarrating,
        flex: 100,
        advanced: false,
        externalValidators: [{ externalFieldName: 'min', rule: 'higher' }]
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "max", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'STEP',
        type: FormFieldType.number,
        condition: conditions.isNumber,
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "step", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'MIN',
        type: FormFieldType.date,
        condition: conditions.isDate,
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Date)
], FormField.prototype, "minDate", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'MAX',
        type: FormFieldType.date,
        condition: conditions.isDate,
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Date)
], FormField.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'SHOWSERVICE',
        type: FormFieldType.checkbox,
        flex: 100,
        condition: ROLES_CONDITIONS.hasService,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "showService", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.number,
        condition: [conditions.isPhoto],
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "maxWidth", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.number,
        condition: [conditions.isPhoto],
        flex: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "maxHeight", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.toggle,
        condition: [conditions.isPhoto, ROLES_CONDITIONS.isAdmin],
        flex: 100,
        title: 'PHOTOLIVECOUNTER',
        advanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "isImageRecognition", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.toggle,
        condition: [conditions.isImageRecognition, ROLES_CONDITIONS.isAdmin],
        flex: 100,
        title: 'BACKGROUNDPROCESS',
        advanced: true,
        translate: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "isBackgroundProcess", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'DONTSAVEIFHIDDEN',
        type: FormFieldType.checkbox,
        flex: 100,
        advanced: true,
        condition: conditions.isReadOnly
    }),
    tslib_1.__metadata("design:type", Boolean)
], FormField.prototype, "dontSaveIfHidden", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        required: true,
        collectionName: 'algorithm',
        condition: conditions.isImageRecognition,
        flex: 100,
        title: 'ALGORITHM',
        advanced: true
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "imageRecognitionAlgorithm", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.json,
        title: 'DISPLAY',
        condition: conditions.isImageRecognition,
        filterable: false,
        sortable: false,
        suppressExport: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Object)
], FormField.prototype, "imageRecognitionDisplay", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'DURATIONMAX',
        type: FormFieldType.number,
        condition: conditions.isAudioOrVideo,
        flex: 100,
        max: 60
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "duration", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        type: FormFieldType.autocomplete,
        multiple: true,
        clearable: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Array)
], FormField.prototype, "condition", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'FLEX',
        type: FormFieldType.number,
        flex: 100,
        min: 0,
        max: 100,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "flex", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'LEGEND',
        type: FormFieldType.textarea,
        condition: conditions.isNotInformation,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], FormField.prototype, "caption", void 0);
tslib_1.__decorate([
    Editable('FormField', {
        title: 'REPORTORDER',
        type: FormFieldType.number,
        condition: [ROLES_CONDITIONS.hasTodoOrScore],
        flex: 100,
        min: 0,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Number)
], FormField.prototype, "reportOrder", void 0);
// export function setConnectAnswerHandler(value, controls, data, form, requestor, dialog, viewContainerRef, changeDetectorRef) {
//   dialog
//     .upsert(
//       {},
//       '',
//       viewContainerRef,
//       null,
//       [
//         {
//           name: 'connectAnswer',
//           title: 'CONNECT',
//           type: FormFieldType.connect,
//           connectMode: data.connectMode,
//           leftValues: data.leftValues,
//           rightValues: data.rightValues
//         }
//       ],
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       false,
//       null
//     )
//     .then(retVal => {
//       if (retVal) {
//         data.answer = flatMap(retVal['connectAnswer']);
//         changeDetectorRef.markForCheck();
//       }
//     });
// }
FormField = tslib_1.__decorate([
    Model({ className: 'FormField' })
], FormField);
export { FormField };
if (false) {
    /** @type {?} */
    FormField.prototype.name;
    /** @type {?} */
    FormField.prototype.title;
    /** @type {?} */
    FormField.prototype.icon;
    /** @type {?} */
    FormField.prototype.description;
    /** @type {?} */
    FormField.prototype.value;
    /** @type {?} */
    FormField.prototype.url;
    /** @type {?} */
    FormField.prototype.sentence;
    /** @type {?} */
    FormField.prototype.formula;
    /** @type {?} */
    FormField.prototype.header;
    /** @type {?} */
    FormField.prototype.filterName;
    /** @type {?} */
    FormField.prototype.type;
    /** @type {?} */
    FormField.prototype.game;
    /** @type {?} */
    FormField.prototype.catalog;
    /** @type {?} */
    FormField.prototype.inventory;
    /** @type {?} */
    FormField.prototype.presence;
    /** @type {?} */
    FormField.prototype.placeholder;
    /** @type {?} */
    FormField.prototype.visible;
    /** @type {?} */
    FormField.prototype.tag;
    /** @type {?} */
    FormField.prototype.collectionName;
    /** @type {?} */
    FormField.prototype.filterByLocation;
    /** @type {?} */
    FormField.prototype.values;
    /** @type {?} */
    FormField.prototype.connectMode;
    /** @type {?} */
    FormField.prototype.leftValues;
    /** @type {?} */
    FormField.prototype.rightValues;
    /** @type {?} */
    FormField.prototype.correctValues;
    /** @type {?} */
    FormField.prototype.wrongValues;
    /** @type {?} */
    FormField.prototype.userTags;
    /** @type {?} */
    FormField.prototype.image;
    /** @type {?} */
    FormField.prototype.images;
    /** @type {?} */
    FormField.prototype.document;
    /** @type {?} */
    FormField.prototype.multiple;
    /** @type {?} */
    FormField.prototype.useButtons;
    /** @type {?} */
    FormField.prototype.mode;
    /** @type {?} */
    FormField.prototype.answer;
    /** @type {?} */
    FormField.prototype.explanation;
    /** @type {?} */
    FormField.prototype.explanationDocument;
    /** @type {?} */
    FormField.prototype.sessionValues;
    /** @type {?} */
    FormField.prototype.filterable;
    /** @type {?} */
    FormField.prototype.columnDefinition;
    /** @type {?} */
    FormField.prototype.operators;
    /** @type {?} */
    FormField.prototype.hint;
    /** @type {?} */
    FormField.prototype.onChange;
    /** @type {?} */
    FormField.prototype.subQuery;
    /** @type {?} */
    FormField.prototype.isSubQuery;
    /** @type {?} */
    FormField.prototype.displayType;
    /** @type {?} */
    FormField.prototype.mapTransform;
    /** @type {?} */
    FormField.prototype.queryFields;
    /** @type {?} */
    FormField.prototype.defaultFields;
    /** @type {?} */
    FormField.prototype.hideLabel;
    /** @type {?} */
    FormField.prototype.fixedPosition;
    /** @type {?} */
    FormField.prototype.imageLayout;
    /** @type {?} */
    FormField.prototype.minPhotos;
    /** @type {?} */
    FormField.prototype.maxPhotos;
    /** @type {?} */
    FormField.prototype.required;
    /** @type {?} */
    FormField.prototype.allowComments;
    /** @type {?} */
    FormField.prototype.autoreload;
    /** @type {?} */
    FormField.prototype.allowTask;
    /** @type {?} */
    FormField.prototype.shareToFeed;
    /** @type {?} */
    FormField.prototype.allPhotosRequired;
    /** @type {?} */
    FormField.prototype.clearable;
    /** @type {?} */
    FormField.prototype.allowTime;
    /** @type {?} */
    FormField.prototype.allowLibrary;
    /** @type {?} */
    FormField.prototype.saveGeoloc;
    /** @type {?} */
    FormField.prototype.allowHistory;
    /** @type {?} */
    FormField.prototype.allowOpenDetails;
    /** @type {?} */
    FormField.prototype.showOnLocation;
    /** @type {?} */
    FormField.prototype.linked;
    /** @type {?} */
    FormField.prototype.allowAnnotate;
    /** @type {?} */
    FormField.prototype.showUsers;
    /** @type {?} */
    FormField.prototype.hideMobile;
    /** @type {?} */
    FormField.prototype.allowOther;
    /** @type {?} */
    FormField.prototype.readonly;
    /** @type {?} */
    FormField.prototype.radius;
    /** @type {?} */
    FormField.prototype.min;
    /** @type {?} */
    FormField.prototype.max;
    /** @type {?} */
    FormField.prototype.step;
    /** @type {?} */
    FormField.prototype.minDate;
    /** @type {?} */
    FormField.prototype.maxDate;
    /** @type {?} */
    FormField.prototype.showService;
    /** @type {?} */
    FormField.prototype.maxWidth;
    /** @type {?} */
    FormField.prototype.maxHeight;
    /** @type {?} */
    FormField.prototype.isImageRecognition;
    /** @type {?} */
    FormField.prototype.isBackgroundProcess;
    /** @type {?} */
    FormField.prototype.dontSaveIfHidden;
    /** @type {?} */
    FormField.prototype.imageRecognitionAlgorithm;
    /** @type {?} */
    FormField.prototype.imageRecognitionDisplay;
    /** @type {?} */
    FormField.prototype.duration;
    /** @type {?} */
    FormField.prototype.condition;
    /** @type {?} */
    FormField.prototype.flex;
    /** @type {?} */
    FormField.prototype.caption;
    /** @type {?} */
    FormField.prototype.reportOrder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2Zvcm0tZmllbGQvZm9ybS1maWVsZC5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xILE9BQU8sRUFBRSxhQUFhLEVBQWlDLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkcsT0FBTyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7O0lBRXBDLFVBQVUsR0FBRztJQUNmLGdCQUFnQixFQUFFLHFCQUFxQjtJQUN2QyxzQkFBc0IsRUFBRSxzQ0FBc0M7SUFDOUQsaUNBQWlDLEVBQUUsNERBQTREO0lBQy9GLGFBQWEsRUFBRSxxQkFBcUI7SUFDcEMsYUFBYSxFQUFFLHFCQUFxQjtJQUNwQyxjQUFjLEVBQUUsc0JBQXNCO0lBQ3RDLFNBQVMsRUFBRSxpQkFBaUI7SUFDNUIsT0FBTyxFQUFFLGVBQWU7SUFDeEIsVUFBVSxFQUFFLGtCQUFrQjtJQUM5QixPQUFPLEVBQUUsc0NBQXNDO0lBQy9DLGFBQWEsRUFBRSxxQkFBcUI7SUFDcEMsa0JBQWtCLEVBQUUsdUJBQXVCO0lBQzNDLGVBQWUsRUFBRSx1RUFBdUU7SUFDeEYsY0FBYyxFQUFFLHVEQUF1RDtJQUN2RSxhQUFhLEVBQUUscUJBQXFCO0lBQ3BDLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUIsYUFBYSxFQUFFLHFCQUFxQjtJQUNwQyxRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsZUFBZSxFQUFFLGlEQUFpRDtJQUNsRSwyQkFBMkIsRUFBRSxzRUFBc0U7SUFDbkcsWUFBWSxFQUFFLG9CQUFvQjtJQUNsQyxjQUFjLEVBQUUsZ0NBQWdDO0lBQ2hELFNBQVMsRUFBRSxtQkFBbUI7SUFDOUIsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixTQUFTLEVBQUUsaUJBQWlCO0lBQzVCLFNBQVMsRUFBRSxtVUFBbVU7SUFDOVUsY0FBYyxFQUFFLG1CQUFXLEVBQUUsSUFBSSxFQUFFLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFBO0lBQzdGLFdBQVcsRUFBRSxrRUFBa0U7SUFDL0UsV0FBVyxFQUFFLG9FQUFvRTtJQUNqRixVQUFVLEVBQUUsZUFBZTtDQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMENZLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUFULFNBQVUsU0FBUSxNQUFNO0NBMG5CcEMsQ0FBQTtBQXhuQkM7SUFEQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOzt1Q0FDdkQ7QUFHYjtJQURDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3dDQUN0RDtBQVVkO0lBTkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsY0FBYztRQUNyQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0I7UUFDdEMsUUFBUSxFQUFFLE1BQU07S0FDakIsQ0FBQzs7OENBQ2tCO0FBU3BCO0lBUEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsT0FBTztRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1FBQzVCLFNBQVMsRUFBRSxVQUFVLENBQUMsYUFBYTtRQUNuQyxRQUFRLEVBQUUsTUFBTTtLQUNqQixDQUFDOzt3Q0FDUztBQVFYO0lBTkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsS0FBSztRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1FBQ3hCLFNBQVMsRUFBRSxVQUFVLENBQUMsYUFBYTtLQUNwQyxDQUFDOztzQ0FDTztBQU9UO0lBTEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsVUFBVTtRQUNqQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxXQUFXO0tBQ2xDLENBQUM7OzJDQUNZO0FBT2Q7SUFMQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxTQUFTO1FBQ2hCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7S0FDaEMsQ0FBQzs7MENBQ1c7QUFXYjtJQU5DLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUM7UUFDNUMsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7dUNBQ1c7QUFVYjtJQVJDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLE1BQU07UUFDYixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsTUFBTSxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDO1FBQzNDLFNBQVMsRUFBRSxJQUFJO1FBQ2YsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNO1FBQzVCLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7dUNBQ1c7QUFTYjtJQVBDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsY0FBYyxFQUFFLFVBQVU7UUFDMUIsTUFBTSxFQUFFLElBQUk7UUFDWixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7S0FDaEMsQ0FBQzs7MENBQ2M7QUFPaEI7SUFMQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQztRQUNsRCxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7OzRDQUNpQjtBQU9uQjtJQUxDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1FBQzVCLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUM7UUFDbkQsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzsyQ0FDZ0I7QUFnQmxCO0lBVEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsYUFBYTtRQUNwQixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsY0FBYyxFQUFFLGNBQWM7UUFDOUIsZUFBZSxFQUFFLE1BQU07UUFDdkIsTUFBTSxFQUFFLElBQUk7UUFDWixTQUFTLEVBQUUsVUFBVSxDQUFDLGNBQWM7UUFDcEMsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOztpREFDcUI7QUFPdkI7SUFMQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixTQUFTLEVBQUUsVUFBVSxDQUFDLGNBQWM7UUFDcEMsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzttREFDd0I7QUFTMUI7SUFQQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxHQUFHLEVBQUUsSUFBSTtRQUNULFFBQVEsRUFBRSxJQUFJO1FBQ2QsY0FBYyxFQUFFLElBQUk7UUFDcEIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTO0tBQ2hDLENBQUM7c0NBQ00sS0FBSzt5Q0FBTTtBQVVuQjtJQVJDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLE1BQU07UUFDYixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztRQUNoQyxTQUFTLEVBQUUsSUFBSTtRQUNmLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUztRQUMvQixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7OzhDQUNrQjtBQVNwQjtJQVBDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLEdBQUcsRUFBRSxJQUFJO1FBQ1QsUUFBUSxFQUFFLElBQUk7UUFDZCxjQUFjLEVBQUUsSUFBSTtRQUNwQixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7S0FDaEMsQ0FBQztzQ0FDVSxLQUFLOzZDQUFNO0FBU3ZCO0lBUEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsR0FBRyxFQUFFLElBQUk7UUFDVCxRQUFRLEVBQUUsSUFBSTtRQUNkLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUztLQUNoQyxDQUFDO3NDQUNXLEtBQUs7OENBQU07QUFTeEI7SUFQQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxHQUFHLEVBQUUsSUFBSTtRQUNULFFBQVEsRUFBRSxJQUFJO1FBQ2QsY0FBYyxFQUFFLElBQUk7UUFDcEIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNO0tBQzdCLENBQUM7c0NBQ2EsS0FBSztnREFBTTtBQVMxQjtJQVBDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLEdBQUcsRUFBRSxJQUFJO1FBQ1QsUUFBUSxFQUFFLElBQUk7UUFDZCxjQUFjLEVBQUUsSUFBSTtRQUNwQixTQUFTLEVBQUUsVUFBVSxDQUFDLE1BQU07S0FDN0IsQ0FBQztzQ0FDVyxLQUFLOzhDQUFNO0FBa0J4QjtJQVRDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLGNBQWMsRUFBRSxNQUFNO1FBQ3RCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsUUFBUSxFQUFFLEtBQUs7UUFDZixHQUFHLEVBQUUsSUFBSTtRQUNULFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDOUIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDO3NDQUNRLEtBQUs7MkNBQVM7QUFleEI7SUFiQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxPQUFPO1FBQ2QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQzFCLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLEVBQUU7UUFDWixhQUFhLEVBQUUsSUFBSTtRQUNuQixjQUFjLEVBQUUsT0FBTztRQUN2QixTQUFTLEVBQUUsVUFBVSxDQUFDLE9BQU87UUFDN0IsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0tBQ3hDLENBQUM7O3dDQUNTO0FBZ0JYO0lBZEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsT0FBTztRQUNkLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQzFCLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLEVBQUU7UUFDWixhQUFhLEVBQUUsSUFBSTtRQUNuQixjQUFjLEVBQUUsT0FBTztRQUN2QixTQUFTLEVBQUUsVUFBVSxDQUFDLGFBQWE7UUFDbkMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0tBQ3hDLENBQUM7O3lDQUNVO0FBU1o7SUFQQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxVQUFVO1FBQ2pCLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxjQUFjLEVBQUUsT0FBTztRQUN2QixTQUFTLEVBQUUsVUFBVSxDQUFDLFVBQVU7UUFDaEMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0tBQ3hDLENBQUM7OzJDQUNZO0FBR2Q7SUFEQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7MkNBQ3pFO0FBT2xCO0lBTEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsU0FBUztRQUNoQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxZQUFZO0tBQ25DLENBQUM7OzZDQUNrQjtBQVVwQjtJQVJDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLE1BQU07UUFDYixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztRQUMxQixTQUFTLEVBQUUsSUFBSTtRQUNmLFNBQVMsRUFBRSxVQUFVLENBQUMsYUFBYTtRQUNuQyxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O3VDQUNXO0FBV2I7SUFUQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLEdBQUcsRUFBRSxJQUFJO1FBQ1QsUUFBUSxFQUFFLElBQUk7UUFDZCxjQUFjLEVBQUUsSUFBSTtRQUNwQixTQUFTLEVBQUUsVUFBVSxDQUFDLGNBQWM7UUFDcEMsYUFBYSxFQUFFLFFBQVE7S0FDeEIsQ0FBQztzQ0FDTSxLQUFLO3lDQUFNO0FBT25CO0lBTEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixPQUFPLEVBQUUsS0FBSztRQUNkLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixTQUFTLEVBQUUsVUFBVSxDQUFDLGNBQWM7S0FDckMsQ0FBQzs7OENBQ2tCO0FBU3BCO0lBUEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUscUJBQXFCO1FBQzVCLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxjQUFjLEVBQUUsT0FBTztRQUN2QixTQUFTLEVBQUUsVUFBVSxDQUFDLGNBQWM7UUFDcEMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0tBQ3hDLENBQUM7O3NEQUN1QjtBQXlCekI7SUFOQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ3JDLElBQUksRUFBRSxFQUFFO1FBQ1Isa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7S0FDeEUsQ0FBQzs7NENBQ2dCO0FBU2xCO0lBUEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDMUIsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUNyQyxJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxJQUFJO1FBQ2Qsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7S0FDekUsQ0FBQzs7NENBQ2dCO0FBUWxCO0lBTkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsV0FBVztRQUNsQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxpQ0FBaUM7UUFDdkQsSUFBSSxFQUFFLEVBQUU7S0FDVCxDQUFDOzsyQ0FDZ0I7QUFRbEI7SUFOQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxlQUFlO1FBQ3RCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixTQUFTLEVBQUUsVUFBVSxDQUFDLGdCQUFnQjtRQUN0QyxJQUFJLEVBQUUsRUFBRTtLQUNULENBQUM7O2dEQUNxQjtBQVF2QjtJQU5DLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1FBQzVCLFNBQVMsRUFBRSxVQUFVLENBQUMsZ0JBQWdCO1FBQ3RDLElBQUksRUFBRSxFQUFFO0tBQ1QsQ0FBQzs7NkNBQ2tCO0FBUXBCO0lBTkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsV0FBVztRQUNsQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztRQUN4RSxJQUFJLEVBQUUsRUFBRTtLQUNULENBQUM7OzRDQUNpQjtBQVFuQjtJQU5DLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLGFBQWE7UUFDcEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1FBQzVCLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztLQUNoQyxDQUFDOzs4Q0FDbUI7QUFRckI7SUFOQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxtQkFBbUI7UUFDMUIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1FBQzVCLElBQUksRUFBRSxHQUFHO1FBQ1QsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztLQUMvQixDQUFDOztvREFDeUI7QUFRM0I7SUFOQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixTQUFTLEVBQUUsVUFBVSxDQUFDLGNBQWM7UUFDcEMsSUFBSSxFQUFFLEdBQUc7UUFDVCxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7OzRDQUNpQjtBQVNuQjtJQVBDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLFdBQVc7UUFDbEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1FBQzVCLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4QyxJQUFJLEVBQUUsR0FBRztRQUNULFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7NENBQ2lCO0FBUW5CO0lBTkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsY0FBYztRQUNyQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxlQUFlO1FBQ3JDLElBQUksRUFBRSxHQUFHO0tBQ1YsQ0FBQzs7K0NBQ29CO0FBU3RCO0lBUEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixTQUFTLEVBQUUsVUFBVSxDQUFDLGNBQWM7UUFDcEMsSUFBSSxFQUFFLEdBQUc7UUFDVCxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7OzZDQUNrQjtBQVNwQjtJQVBDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLGNBQWM7UUFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1FBQzVCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsR0FBRztRQUNULFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7K0NBQ29CO0FBU3RCO0lBUEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsa0JBQWtCO1FBQ3pCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixJQUFJLEVBQUUsR0FBRztRQUNULFNBQVMsRUFBRSxVQUFVLENBQUMsYUFBYTtRQUNuQyxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O21EQUN3QjtBQVkxQjtJQVBDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLHdCQUF3QjtRQUMvQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsSUFBSSxFQUFFLEdBQUc7UUFDVCxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzlCLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7eUNBQ2M7QUFTaEI7SUFQQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxlQUFlO1FBQ3RCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksRUFBRSxHQUFHO1FBQ1QsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOztnREFDcUI7QUFTdkI7SUFQQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1FBQzVCLFNBQVMsRUFBRSxVQUFVLENBQUMsYUFBYTtRQUNuQyxJQUFJLEVBQUUsR0FBRztRQUNULFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7NENBQ2lCO0FBUW5CO0lBTkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsWUFBWTtRQUNuQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsSUFBSSxFQUFFLEdBQUc7UUFDVCxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7OzZDQUNrQjtBQVNwQjtJQVBDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLFFBQVE7UUFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxRQUFRO1FBQzlCLElBQUksRUFBRSxHQUFHO1FBQ1QsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzs2Q0FDa0I7QUFHcEI7SUFEQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJDQUNqRTtBQVNsQjtJQVBDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLFFBQVE7UUFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDMUIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxRQUFRO1FBQzlCLElBQUksRUFBRSxHQUFHO1FBQ1QsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzt5Q0FDYTtBQVVmO0lBUkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixTQUFTLEVBQUUsVUFBVSxDQUFDLGVBQWU7UUFDckMsSUFBSSxFQUFFLEdBQUc7UUFDVCxRQUFRLEVBQUUsS0FBSztRQUNmLGtCQUFrQixFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0tBQ2xFLENBQUM7O3NDQUNVO0FBVVo7SUFSQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNO1FBQzFCLFNBQVMsRUFBRSxVQUFVLENBQUMsMkJBQTJCO1FBQ2pELElBQUksRUFBRSxHQUFHO1FBQ1QsUUFBUSxFQUFFLEtBQUs7UUFDZixrQkFBa0IsRUFBRSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztLQUNuRSxDQUFDOztzQ0FDVTtBQVNaO0lBUEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsTUFBTTtRQUNiLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixTQUFTLEVBQUUsVUFBVSxDQUFDLFFBQVE7UUFDOUIsSUFBSSxFQUFFLEdBQUc7UUFDVCxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O3VDQUNXO0FBU2I7SUFQQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1FBQ3hCLFNBQVMsRUFBRSxVQUFVLENBQUMsTUFBTTtRQUM1QixJQUFJLEVBQUUsR0FBRztRQUNULFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQztzQ0FDTyxJQUFJOzBDQUFDO0FBU2Q7SUFQQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1FBQ3hCLFNBQVMsRUFBRSxVQUFVLENBQUMsTUFBTTtRQUM1QixJQUFJLEVBQUUsR0FBRztRQUNULFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQztzQ0FDTyxJQUFJOzBDQUFDO0FBU2Q7SUFQQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxhQUFhO1FBQ3BCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixJQUFJLEVBQUUsR0FBRztRQUNULFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO1FBQ3RDLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7OENBQ21CO0FBUXJCO0lBTkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDMUIsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBRztRQUNULFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7MkNBQ2U7QUFRakI7SUFOQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksRUFBRSxHQUFHO1FBQ1QsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzs0Q0FDZ0I7QUFTbEI7SUFQQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztRQUN6RCxJQUFJLEVBQUUsR0FBRztRQUNULEtBQUssRUFBRSxrQkFBa0I7UUFDekIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOztxREFDMEI7QUFVNUI7SUFSQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1FBQ3BFLElBQUksRUFBRSxHQUFHO1FBQ1QsS0FBSyxFQUFFLG1CQUFtQjtRQUMxQixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7O3NEQUMyQjtBQVM3QjtJQVBDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLGtCQUFrQjtRQUN6QixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7UUFDNUIsSUFBSSxFQUFFLEdBQUc7UUFDVCxRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxVQUFVLENBQUMsVUFBVTtLQUNqQyxDQUFDOzttREFDd0I7QUFXMUI7SUFUQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxRQUFRLEVBQUUsSUFBSTtRQUNkLGNBQWMsRUFBRSxXQUFXO1FBQzNCLFNBQVMsRUFBRSxVQUFVLENBQUMsa0JBQWtCO1FBQ3hDLElBQUksRUFBRSxHQUFHO1FBQ1QsS0FBSyxFQUFFLFdBQVc7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzs0REFDNkI7QUFXL0I7SUFUQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtRQUN4QixLQUFLLEVBQUUsU0FBUztRQUNoQixTQUFTLEVBQUUsVUFBVSxDQUFDLGtCQUFrQjtRQUN4QyxVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsS0FBSztRQUNmLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7MERBQzJCO0FBUzdCO0lBUEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsYUFBYTtRQUNwQixJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDMUIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxjQUFjO1FBQ3BDLElBQUksRUFBRSxHQUFHO1FBQ1QsR0FBRyxFQUFFLEVBQUU7S0FDUixDQUFDOzsyQ0FDZTtBQVFqQjtJQU5DLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7c0NBQ1MsS0FBSzs0Q0FBWTtBQVU1QjtJQVJDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsS0FBSyxFQUFFLE1BQU07UUFDYixJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDMUIsSUFBSSxFQUFFLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxHQUFHO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzt1Q0FDVztBQVFiO0lBTkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixTQUFTLEVBQUUsVUFBVSxDQUFDLGdCQUFnQjtRQUN0QyxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7OzBDQUNjO0FBVWhCO0lBUkMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixLQUFLLEVBQUUsYUFBYTtRQUNwQixJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDMUIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO1FBQzVDLElBQUksRUFBRSxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUM7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7OzhDQUNrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBem5CVCxTQUFTO0lBRHJCLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQztHQUNyQixTQUFTLENBMG5CckI7U0ExbkJZLFNBQVM7OztJQUNwQix5QkFDYTs7SUFFYiwwQkFDYzs7SUFFZCx5QkFBYTs7SUFFYixnQ0FNb0I7O0lBRXBCLDBCQU9XOztJQUVYLHdCQU1TOztJQUVULDZCQUtjOztJQUVkLDRCQUthOztJQUViLDJCQUFlOztJQUNmLCtCQUFtQjs7SUFFbkIseUJBTWE7O0lBRWIseUJBUWE7O0lBRWIsNEJBT2dCOztJQUVoQiw4QkFLbUI7O0lBRW5CLDZCQUtrQjs7SUFFbEIsZ0NBQW9COztJQUNwQiw0QkFBaUI7O0lBRWpCLHdCQUFhOztJQUViLG1DQVN1Qjs7SUFFdkIscUNBSzBCOztJQUUxQiwyQkFPbUI7O0lBRW5CLGdDQVFvQjs7SUFFcEIsK0JBT3VCOztJQUV2QixnQ0FPd0I7O0lBRXhCLGtDQU8wQjs7SUFFMUIsZ0NBT3dCOztJQVN4Qiw2QkFTd0I7O0lBRXhCLDBCQWFXOztJQUVYLDJCQWNZOztJQUVaLDZCQU9jOztJQUVkLDZCQUNrQjs7SUFFbEIsK0JBS29COztJQUVwQix5QkFRYTs7SUFFYiwyQkFTbUI7O0lBRW5CLGdDQUtvQjs7SUFFcEIsd0NBT3lCOztJQUV6QixrQ0FBc0I7O0lBQ3RCLCtCQUFvQjs7SUFDcEIscUNBQW9DOztJQUNwQyw4QkFBc0I7O0lBQ3RCLHlCQUFhOztJQUNiLDZCQUErQjs7SUFDL0IsNkJBQTRDOztJQUM1QywrQkFBb0I7O0lBRXBCLGdDQUFvQjs7SUFDcEIsaUNBQXVCOztJQUN2QixnQ0FBMkI7O0lBQzNCLGtDQUE2Qjs7SUFDN0IsOEJBQW1COztJQUNuQixrQ0FBdUI7O0lBQ3ZCLGdDQUFxQjs7SUFFckIsOEJBTWtCOztJQUVsQiw4QkFPa0I7O0lBRWxCLDZCQU1rQjs7SUFFbEIsa0NBTXVCOztJQUV2QiwrQkFNb0I7O0lBRXBCLDhCQU1tQjs7SUFFbkIsZ0NBTXFCOztJQUVyQixzQ0FNMkI7O0lBRTNCLDhCQU1tQjs7SUFFbkIsOEJBT21COztJQUVuQixpQ0FNc0I7O0lBRXRCLCtCQU9vQjs7SUFFcEIsaUNBT3NCOztJQUV0QixxQ0FPMEI7O0lBRzFCLG1DQUF3Qjs7SUFFeEIsMkJBT2dCOztJQUVoQixrQ0FPdUI7O0lBRXZCLDhCQU9tQjs7SUFFbkIsK0JBTW9COztJQUVwQiwrQkFPb0I7O0lBRXBCLDZCQUNrQjs7SUFFbEIsMkJBT2U7O0lBRWYsd0JBUVk7O0lBRVosd0JBUVk7O0lBRVoseUJBT2E7O0lBRWIsNEJBT2M7O0lBRWQsNEJBT2M7O0lBRWQsZ0NBT3FCOztJQUVyQiw2QkFNaUI7O0lBRWpCLDhCQU1rQjs7SUFFbEIsdUNBTzRCOztJQUU1Qix3Q0FRNkI7O0lBRTdCLHFDQU8wQjs7SUFFMUIsOENBUytCOztJQUUvQiw0Q0FTNkI7O0lBRTdCLDZCQU9pQjs7SUFFakIsOEJBTTRCOztJQUU1Qix5QkFRYTs7SUFFYiw0QkFNZ0I7O0lBRWhCLGdDQVFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmRpdGlvbiwgTW9kZWwsIEVkaXRhYmxlLCBFbnRpdHksIFJPTEVTX0NPTkRJVElPTlMsIEZPUk1fRklMRVNfSU1BR0VfRklMVEVSIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSUZvcm1GaWVsZCwgSUNvbHVtbkRlZmluaXRpb24sIE1PQklMRV9GT1JNX0ZJRUxEU19BTEwgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgbWFwIGFzIF9tYXAgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5sZXQgY29uZGl0aW9ucyA9IHtcbiAgaXNOb3RJbmZvcm1hdGlvbjogJ3R5cGUhPVwiaW5mb3JtYXRpb25cIicsXG4gIGlzTm90SW5mb3JtYXRpb25PclRhc2s6ICd0eXBlIT1cImluZm9ybWF0aW9uXCIgYW5kIHR5cGUhPVwidGFza1wiJyxcbiAgaXNOb3RJbmZvcm1hdGlvbk9yRG9jdW1lbnRPckltYWdlOiAndHlwZSE9XCJpbmZvcm1hdGlvblwiIGFuZCB0eXBlIT1cImltYWdlXCIgYW5kIHR5cGUhPVwiZG9jdW1lbnRcIicsXG4gIGlzSW5mb3JtYXRpb246ICd0eXBlPT1cImluZm9ybWF0aW9uXCInLFxuICBpc1ZpZGVvcGxheWVyOiAndHlwZT09XCJ2aWRlb3BsYXllclwiJyxcbiAgaXNBdXRvY29tcGxldGU6ICd0eXBlPT1cImF1dG9jb21wbGV0ZVwiJyxcbiAgaXNDYXRhbG9nOiAndHlwZT09XCJjYXRhbG9nXCInLFxuICBpc0ltYWdlOiAndHlwZT09XCJpbWFnZVwiJyxcbiAgaXNEb2N1bWVudDogJ3R5cGU9PVwiZG9jdW1lbnRcIicsXG4gIGlzUGhvdG86ICd0eXBlPT1cInBob3RvXCIgb3IgdHlwZT09XCJtdWx0aXBob3Rvc1wiJyxcbiAgaXNNdWx0aVBob3RvczogJ3R5cGU9PVwibXVsdGlwaG90b3NcIicsXG4gIGlzSW1hZ2VSZWNvZ25pdGlvbjogJ2lzSW1hZ2VSZWNvZ25pdGlvbj09MScsXG4gIGhhc0FsbG93TGlicmFyeTogJ3R5cGU9PVwicGhvdG9cIiBvciB0eXBlPT1cInZpZGVvXCIgb3IgdHlwZT09XCJtdWx0aXBob3Rvc1wiIG9yIHR5cGU9PVwidG9kb1wiJyxcbiAgaXNQaG90b09yVmlkZW86ICd0eXBlPT1cInBob3RvXCIgb3IgdHlwZT09XCJ2aWRlb1wiIG9yIHR5cGU9PVwibXVsdGlwaG90b3NcIicsXG4gIGlzRW1haWxSZXBvcnQ6ICd0eXBlPT1cImVtYWlscmVwb3J0XCInLFxuICBpc1NlbGVjdDogJ3R5cGU9PVwic2VsZWN0XCInLFxuICBpc1NlbGVjdEltYWdlOiAndHlwZT09XCJzZWxlY3RpbWFnZVwiJyxcbiAgaXNBZHJlc3M6ICd0eXBlPT1cImFkZHJlc3NcIicsXG4gIGlzTnVtYmVyOiAndHlwZT09XCJudW1iZXJcIicsXG4gIGlzRGF0ZTogJ3R5cGU9PVwiZGF0ZVwiJyxcbiAgaXNUb2RvOiAndHlwZT09XCJ0b2RvXCInLFxuICBpc051bWJlck9yUmFuZ2U6ICd0eXBlPT1cIm51bWJlclwiIG9yIHR5cGU9PVwicmFuZ2VcIiBvciB0eXBlPT1cImtub2JcIicsXG4gIGlzTnVtYmVyT3JSYW5nZU9yU3RhcnJhdGluZzogJ3R5cGU9PVwibnVtYmVyXCIgb3IgdHlwZT09XCJyYW5nZVwiIG9yIHR5cGU9PVwic3RhcnJhdGluZ1wib3IgdHlwZT09XCJrbm9iXCInLFxuICBpc1N0YXJSYXRpbmc6ICd0eXBlPT1cInN0YXJyYXRpbmdcIicsXG4gIGlzQXVkaW9PclZpZGVvOiAndHlwZT09XCJhdWRpb1wiIG9yIHR5cGU9PVwidmlkZW9cIicsXG4gIGlzQ29ubmVjdDogJ3R5cGUgPT0gXCJjb25uZWN0XCInLFxuICBpc0dhbWU6ICd0eXBlID09IFwiZ2FtZVwiJyxcbiAgaXNGb3JtdWxhOiAndHlwZT09XCJmb3JtdWxhXCInLFxuICBoYXNWYWx1ZXM6ICd0eXBlPT1cInRvZG9cIiBvciB0eXBlPT1cInBob3RvXCIgb3IgdHlwZT09XCJtdWx0aXBob3Rvc1wiIG9yIHR5cGU9PVwicmFua2luZ1wiIG9yIHR5cGU9PVwic2VsZWN0XCIgb3IgdHlwZT09XCJzZWxlY3RtdWx0aVwiIG9yIHR5cGU9PVwic2VsZWN0YnV0dG9uc1wiIG9yIHR5cGU9PVwic2VsZWN0Y2hhdFwiIG9yIHR5cGU9PVwic2VsZWN0YnV0dG9uc211bHRpXCIgb3IgdHlwZT09XCJhdXRvY29tcGxldGVcIiBvciB0eXBlPT1cImVtYWlscmVwb3J0XCIgb3IgdHlwZT09XCJzZWxlY3RpbWFnZVwiIG9yIHR5cGU9PVwibWlzc2luZ3dvcmRcIiBvciB0eXBlPT1cInN3aXBlc2VsZWN0XCIgb3IgdHlwZT09XCJnYW1lXCInLFxuICBtaXNzaW9uSXNRdWl6ejogPENvbmRpdGlvbj57IHR5cGU6ICdtaXNzaW9uRGVzY3JpcHRpb25BdHRyaWJ1dGUnLCBrZXk6ICdxdWl6eicsIHZhbHVlOiB0cnVlIH0sXG4gIGhhc1NlbnRlbmNlOiAndHlwZT09XCJtaXNzaW5nd29yZFwiIG9yIHR5cGU9PVwic3dpcGVzZWxlY3RcIiBvciB0eXBlPT1cInNlbGVjdGNoYXRcIicsXG4gIGhhc011bHRpcGxlOiAndHlwZT09XCJhdXRvY29tcGxldGVcIiBvciB0eXBlPT1cInNlbGVjdGNoYXRcIiBvciB0eXBlPT1cInNlbGVjdGltYWdlXCIgJyxcbiAgaXNSZWFkT25seTogJ3JlYWRvbmx5ID09IDEnXG59O1xuXG4vLyBleHBvcnQgZnVuY3Rpb24gc2V0Q29ubmVjdEFuc3dlckhhbmRsZXIodmFsdWUsIGNvbnRyb2xzLCBkYXRhLCBmb3JtLCByZXF1ZXN0b3IsIGRpYWxvZywgdmlld0NvbnRhaW5lclJlZiwgY2hhbmdlRGV0ZWN0b3JSZWYpIHtcbi8vICAgZGlhbG9nXG4vLyAgICAgLnVwc2VydChcbi8vICAgICAgIHt9LFxuLy8gICAgICAgJycsXG4vLyAgICAgICB2aWV3Q29udGFpbmVyUmVmLFxuLy8gICAgICAgbnVsbCxcbi8vICAgICAgIFtcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgIG5hbWU6ICdjb25uZWN0QW5zd2VyJyxcbi8vICAgICAgICAgICB0aXRsZTogJ0NPTk5FQ1QnLFxuLy8gICAgICAgICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY29ubmVjdCxcbi8vICAgICAgICAgICBjb25uZWN0TW9kZTogZGF0YS5jb25uZWN0TW9kZSxcbi8vICAgICAgICAgICBsZWZ0VmFsdWVzOiBkYXRhLmxlZnRWYWx1ZXMsXG4vLyAgICAgICAgICAgcmlnaHRWYWx1ZXM6IGRhdGEucmlnaHRWYWx1ZXNcbi8vICAgICAgICAgfVxuLy8gICAgICAgXSxcbi8vICAgICAgIG51bGwsXG4vLyAgICAgICBudWxsLFxuLy8gICAgICAgbnVsbCxcbi8vICAgICAgIG51bGwsXG4vLyAgICAgICBudWxsLFxuLy8gICAgICAgbnVsbCxcbi8vICAgICAgIG51bGwsXG4vLyAgICAgICBudWxsLFxuLy8gICAgICAgbnVsbCxcbi8vICAgICAgIG51bGwsXG4vLyAgICAgICBudWxsLFxuLy8gICAgICAgZmFsc2UsXG4vLyAgICAgICBudWxsXG4vLyAgICAgKVxuLy8gICAgIC50aGVuKHJldFZhbCA9PiB7XG4vLyAgICAgICBpZiAocmV0VmFsKSB7XG4vLyAgICAgICAgIGRhdGEuYW5zd2VyID0gZmxhdE1hcChyZXRWYWxbJ2Nvbm5lY3RBbnN3ZXInXSk7XG4vLyAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuLy8gfVxuXG5ATW9kZWwoeyBjbGFzc05hbWU6ICdGb3JtRmllbGQnIH0pXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkIGV4dGVuZHMgRW50aXR5IGltcGxlbWVudHMgSUZvcm1GaWVsZCB7XG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsIHZpc2libGU6IGZhbHNlIH0pXG4gIG5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LCByZXF1aXJlZDogdHJ1ZSB9KVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGljb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0lOU1RSVUNUSU9OUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNOb3RJbmZvcm1hdGlvbixcbiAgICBsYW5ndWFnZTogJ2h0bWwnXG4gIH0pXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdWQUxVRScsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNJbmZvcm1hdGlvbixcbiAgICBsYW5ndWFnZTogJ2h0bWwnXG4gIH0pXG4gIHZhbHVlOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdVUkwnLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNWaWRlb3BsYXllclxuICB9KVxuICB1cmw6IGFueTtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ1NFTlRFTkNFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5oYXNTZW50ZW5jZVxuICB9KVxuICBzZW50ZW5jZTogYW55O1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnRk9STVVMQScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNGb3JtdWxhXG4gIH0pXG4gIGZvcm11bGE6IGFueTtcblxuICBoZWFkZXI6IHN0cmluZztcbiAgZmlsdGVyTmFtZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHZhbHVlczogX21hcChNT0JJTEVfRk9STV9GSUVMRFNfQUxMLCAndHlwZScpLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZVxuICB9KVxuICB0eXBlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdHQU1FJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB2YWx1ZXM6IFsncnVubmVyLWdhbWUnLCAnbWVtb3J5LWNhcmQtZ2FtZSddLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNHYW1lLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0pXG4gIGdhbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2NhdGFsb2dzJyxcbiAgICBpZE9ubHk6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzQ2F0YWxvZ1xuICB9KVxuICBjYXRhbG9nOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzQ2F0YWxvZywgJ3ByZXNlbmNlICE9IDEnXSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBpbnZlbnRvcnk6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzQ2F0YWxvZywgJ2ludmVudG9yeSAhPSAxJ10sXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgcHJlc2VuY2U6IGJvb2xlYW47XG5cbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmlzaWJsZTogYm9vbGVhbjtcblxuICB0YWc6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdDVVNUT01NT0RFTCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdjdXN0b21tb2RlbHMnLFxuICAgIGlkQXR0cmlidXRlTmFtZTogJ25hbWUnLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNBdXRvY29tcGxldGUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgY29sbGVjdGlvbk5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNBdXRvY29tcGxldGUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgZmlsdGVyQnlMb2NhdGlvbjogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWc6IHRydWUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgYWxsb3dDdXN0b21UYWc6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmhhc1ZhbHVlc1xuICB9KVxuICB2YWx1ZXM6IEFycmF5PGFueT47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdNT0RFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB2YWx1ZXM6IFsnZHJhZ25kcm9wJywgJ2RyYXdpbmcnXSxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzQ29ubmVjdCxcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9KVxuICBjb25uZWN0TW9kZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRhZzogdHJ1ZSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBhbGxvd0N1c3RvbVRhZzogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNDb25uZWN0XG4gIH0pXG4gIGxlZnRWYWx1ZXM6IEFycmF5PGFueT47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGFnOiB0cnVlLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0Nvbm5lY3RcbiAgfSlcbiAgcmlnaHRWYWx1ZXM6IEFycmF5PGFueT47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGFnOiB0cnVlLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0dhbWVcbiAgfSlcbiAgY29ycmVjdFZhbHVlczogQXJyYXk8YW55PjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWc6IHRydWUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgYWxsb3dDdXN0b21UYWc6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzR2FtZVxuICB9KVxuICB3cm9uZ1ZhbHVlczogQXJyYXk8YW55PjtcblxuICAvLyBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgLy8gICB0eXBlOiBGb3JtRmllbGRUeXBlLmJ1dHRvbixcbiAgLy8gICBoYW5kbGVyOiBzZXRDb25uZWN0QW5zd2VySGFuZGxlcixcbiAgLy8gICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNDb25uZWN0XG4gIC8vIH0pXG4gIC8vIHNldEFuc3dlcjogYW55O1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAndXNlcicsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRhZzogdHJ1ZSxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzVG9kb10sXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgdXNlclRhZ3M6IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdJTUFHRScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgZmlsdGVyczogRk9STV9GSUxFU19JTUFHRV9GSUxURVIsXG4gICAgZm9yY2VNb2RhbDogdHJ1ZSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnbWltZVR5cGUnXSxcbiAgICBtb2RlOiAndGlsZScsXG4gICAgcGFnZVNpemU6IDIwLFxuICAgIGZpeGVkUG9zaXRpb246IHRydWUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzSW1hZ2UsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnX2ZpbGVuYW1lJyB9XG4gIH0pXG4gIGltYWdlOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdJTUFHRScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgZmlsdGVyczogRk9STV9GSUxFU19JTUFHRV9GSUxURVIsXG4gICAgZm9yY2VNb2RhbDogdHJ1ZSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnbWltZVR5cGUnXSxcbiAgICBtb2RlOiAndGlsZScsXG4gICAgcGFnZVNpemU6IDIwLFxuICAgIGZpeGVkUG9zaXRpb246IHRydWUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzU2VsZWN0SW1hZ2UsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnX2ZpbGVuYW1lJyB9XG4gIH0pXG4gIGltYWdlczogYW55O1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnRE9DVU1FTlQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZmlsZXMnLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0RvY3VtZW50LFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ19maWxlbmFtZScgfVxuICB9KVxuICBkb2N1bWVudDogYW55O1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LCBjb25kaXRpb246IGNvbmRpdGlvbnMuaGFzTXVsdGlwbGUgfSlcbiAgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdCVVRUT05TJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1N0YXJSYXRpbmdcbiAgfSlcbiAgdXNlQnV0dG9uczogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ01PREUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHZhbHVlczogWyd5b3V0dWJlJywgJ3VybCddLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNWaWRlb3BsYXllcixcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9KVxuICBtb2RlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGFnOiB0cnVlLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5taXNzaW9uSXNRdWl6eixcbiAgICBkeW5hbWljVmFsdWVzOiAndmFsdWVzJ1xuICB9KVxuICBhbnN3ZXI6IEFycmF5PGFueT47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMubWlzc2lvbklzUXVpenpcbiAgfSlcbiAgZXhwbGFuYXRpb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0VYUExBTkFUSU9ORE9DVU1FTlQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZmlsZXMnLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5taXNzaW9uSXNRdWl6eixcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdfZmlsZW5hbWUnIH1cbiAgfSlcbiAgZXhwbGFuYXRpb25Eb2N1bWVudDogYW55O1xuXG4gIHNlc3Npb25WYWx1ZXM6IHN0cmluZztcbiAgZmlsdGVyYWJsZTogYm9vbGVhbjtcbiAgY29sdW1uRGVmaW5pdGlvbjogSUNvbHVtbkRlZmluaXRpb247XG4gIG9wZXJhdG9yczogQXJyYXk8YW55PjtcbiAgaGludDogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlLCBkYXRhKSA9PiBhbnk7XG4gIHN1YlF1ZXJ5OiB7IGZpZWxkOiBzdHJpbmc7IHZhbHVlczogc3RyaW5nIH07XG4gIGlzU3ViUXVlcnk6IGJvb2xlYW47XG4gIC8vaXNGaWVsZFNlbGVjdG9yOiBib29sZWFuO1xuICBkaXNwbGF5VHlwZTogc3RyaW5nO1xuICBtYXBUcmFuc2Zvcm06IEZ1bmN0aW9uO1xuICBxdWVyeUZpZWxkczogQXJyYXk8c3RyaW5nPjtcbiAgZGVmYXVsdEZpZWxkczogQXJyYXk8c3RyaW5nPjtcbiAgaGlkZUxhYmVsOiBib29sZWFuO1xuICBmaXhlZFBvc2l0aW9uOiBib29sZWFuO1xuICBpbWFnZUxheW91dD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzTXVsdGlQaG90b3NdLFxuICAgIGZsZXg6IDUwLFxuICAgIGV4dGVybmFsVmFsaWRhdG9yczogW3sgZXh0ZXJuYWxGaWVsZE5hbWU6ICdtYXhQaG90b3MnLCBydWxlOiAnbG93ZXInIH1dXG4gIH0pXG4gIG1pblBob3RvczogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNNdWx0aVBob3Rvc10sXG4gICAgZmxleDogNTAsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZXh0ZXJuYWxWYWxpZGF0b3JzOiBbeyBleHRlcm5hbEZpZWxkTmFtZTogJ21pblBob3RvcycsIHJ1bGU6ICdoaWdoZXInIH1dXG4gIH0pXG4gIG1heFBob3RvczogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnTUFOREFUT1JZJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdEluZm9ybWF0aW9uT3JEb2N1bWVudE9ySW1hZ2UsXG4gICAgZmxleDogNTBcbiAgfSlcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdBTExPV0NPTU1FTlRTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdEluZm9ybWF0aW9uLFxuICAgIGZsZXg6IDUwXG4gIH0pXG4gIGFsbG93Q29tbWVudHM6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdBVVRPUkVMT0FEJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdEluZm9ybWF0aW9uLFxuICAgIGZsZXg6IDUwXG4gIH0pXG4gIGF1dG9yZWxvYWQ6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdBTExPV1RBU0snLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc05vdEluZm9ybWF0aW9uT3JUYXNrLCBST0xFU19DT05ESVRJT05TLmhhc1RvZG9dLFxuICAgIGZsZXg6IDUwXG4gIH0pXG4gIGFsbG93VGFzazogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ1NIQVJFVE9GRUVEJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDUwLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNQaG90b11cbiAgfSlcbiAgc2hhcmVUb0ZlZWQ6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdBTExQSE9UT1NSRVFVSVJFRCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBmbGV4OiAxMDAsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc1RvZG9dXG4gIH0pXG4gIGFsbFBob3Rvc1JlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzQXV0b2NvbXBsZXRlLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBjbGVhcmFibGU6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdBTExPV1RJTUUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc05vdEluZm9ybWF0aW9uXSxcbiAgICBmbGV4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgYWxsb3dUaW1lOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnQUxMT1dMSUJSQVJZJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5oYXNBbGxvd0xpYnJhcnksXG4gICAgZmxleDogMTAwXG4gIH0pXG4gIGFsbG93TGlicmFyeTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0dFT0xPQycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNQaG90b09yVmlkZW8sXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHNhdmVHZW9sb2M6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdBTExPV0hJU1RPUlknLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5oYXNUb2RvT3JTY29yZV0sXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGFsbG93SGlzdG9yeTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0FMTE9XT1BFTkRFVEFJTFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgZmxleDogMTAwLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1NlbGVjdEltYWdlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGFsbG93T3BlbkRldGFpbHM6IGJvb2xlYW47XG5cbiAgLy9ARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHsgdGl0bGU6ICdTSE9XT05MT0NBVElPTicsIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsIGZsZXg6IDEwMCwgIGFkdmFuY2VkOiB0cnVlIH0pXG4gIHNob3dPbkxvY2F0aW9uOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnTElOS1RPUFJFVklPVVNRVUVTVElPTicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBmbGV4OiAxMDAsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc1RvZG9dLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGxpbmtlZDogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0FMTE9XQU5OT1RBVEUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc1Bob3RvXSxcbiAgICBmbGV4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgYWxsb3dBbm5vdGF0ZTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ1NIT1dVU0VSU0VNQUlMJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0VtYWlsUmVwb3J0LFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBzaG93VXNlcnM6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdISURFTU9CSUxFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBoaWRlTW9iaWxlOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnT1RIRVIxJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1NlbGVjdCxcbiAgICBmbGV4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgYWxsb3dPdGhlcjogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCwgZmxleDogMTAwLCBhZHZhbmNlZDogdHJ1ZSB9KVxuICByZWFkb25seTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ1JBRElVUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzQWRyZXNzLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICByYWRpdXM6IG51bWJlcjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ01JTicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzTnVtYmVyT3JSYW5nZSxcbiAgICBmbGV4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IGZhbHNlLFxuICAgIGV4dGVybmFsVmFsaWRhdG9yczogW3sgZXh0ZXJuYWxGaWVsZE5hbWU6ICdtYXgnLCBydWxlOiAnbG93ZXInIH1dXG4gIH0pXG4gIG1pbjogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnTUFYJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNOdW1iZXJPclJhbmdlT3JTdGFycmF0aW5nLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogZmFsc2UsXG4gICAgZXh0ZXJuYWxWYWxpZGF0b3JzOiBbeyBleHRlcm5hbEZpZWxkTmFtZTogJ21pbicsIHJ1bGU6ICdoaWdoZXInIH1dXG4gIH0pXG4gIG1heDogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnU1RFUCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzTnVtYmVyLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBzdGVwOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdNSU4nLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNEYXRlLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBtaW5EYXRlOiBEYXRlO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnTUFYJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzRGF0ZSxcbiAgICBmbGV4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgbWF4RGF0ZTogRGF0ZTtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ1NIT1dTRVJWSUNFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDEwMCxcbiAgICBjb25kaXRpb246IFJPTEVTX0NPTkRJVElPTlMuaGFzU2VydmljZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBzaG93U2VydmljZTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzUGhvdG9dLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBtYXhXaWR0aDogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNQaG90b10sXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIG1heEhlaWdodDogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNQaG90bywgUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXSxcbiAgICBmbGV4OiAxMDAsXG4gICAgdGl0bGU6ICdQSE9UT0xJVkVDT1VOVEVSJyxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBpc0ltYWdlUmVjb2duaXRpb246IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc0ltYWdlUmVjb2duaXRpb24sIFJPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl0sXG4gICAgZmxleDogMTAwLFxuICAgIHRpdGxlOiAnQkFDS0dST1VORFBST0NFU1MnLFxuICAgIGFkdmFuY2VkOiB0cnVlLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZVxuICB9KVxuICBpc0JhY2tncm91bmRQcm9jZXNzOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnRE9OVFNBVkVJRkhJRERFTicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBmbGV4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzUmVhZE9ubHlcbiAgfSlcbiAgZG9udFNhdmVJZkhpZGRlbjogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2FsZ29yaXRobScsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzSW1hZ2VSZWNvZ25pdGlvbixcbiAgICBmbGV4OiAxMDAsXG4gICAgdGl0bGU6ICdBTEdPUklUSE0nLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGltYWdlUmVjb2duaXRpb25BbGdvcml0aG06IGFueTtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmpzb24sXG4gICAgdGl0bGU6ICdESVNQTEFZJyxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNJbWFnZVJlY29nbml0aW9uLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBpbWFnZVJlY29nbml0aW9uRGlzcGxheTogYW55O1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnRFVSQVRJT05NQVgnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0F1ZGlvT3JWaWRlbyxcbiAgICBmbGV4OiAxMDAsXG4gICAgbWF4OiA2MFxuICB9KVxuICBkdXJhdGlvbjogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBjb25kaXRpb246IEFycmF5PENvbmRpdGlvbj47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdGTEVYJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBmbGV4OiAxMDAsXG4gICAgbWluOiAwLFxuICAgIG1heDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGZsZXg6IG51bWJlcjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0xFR0VORCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNOb3RJbmZvcm1hdGlvbixcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBjYXB0aW9uOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdSRVBPUlRPUkRFUicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5oYXNUb2RvT3JTY29yZV0sXG4gICAgZmxleDogMTAwLFxuICAgIG1pbjogMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICByZXBvcnRPcmRlcjogbnVtYmVyO1xufVxuIl19
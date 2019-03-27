/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model, Editable, Entity, ROLES_CONDITIONS, FORM_FILES_IMAGE_FILTER } from '@shared/data-core';
import { FormFieldType, MOBILE_FORM_FIELDS_ALL } from '@shared/stencil';
import { map as _map } from 'lodash-es';
/** @type {?} */
var conditions = {
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
var FormField = /** @class */ (function (_super) {
    tslib_1.__extends(FormField, _super);
    function FormField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return FormField;
}(Entity));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2Zvcm0tZmllbGQvZm9ybS1maWVsZC5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xILE9BQU8sRUFBRSxhQUFhLEVBQWlDLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkcsT0FBTyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7O0lBRXBDLFVBQVUsR0FBRztJQUNmLGdCQUFnQixFQUFFLHFCQUFxQjtJQUN2QyxzQkFBc0IsRUFBRSxzQ0FBc0M7SUFDOUQsaUNBQWlDLEVBQUUsNERBQTREO0lBQy9GLGFBQWEsRUFBRSxxQkFBcUI7SUFDcEMsYUFBYSxFQUFFLHFCQUFxQjtJQUNwQyxjQUFjLEVBQUUsc0JBQXNCO0lBQ3RDLFNBQVMsRUFBRSxpQkFBaUI7SUFDNUIsT0FBTyxFQUFFLGVBQWU7SUFDeEIsVUFBVSxFQUFFLGtCQUFrQjtJQUM5QixPQUFPLEVBQUUsc0NBQXNDO0lBQy9DLGFBQWEsRUFBRSxxQkFBcUI7SUFDcEMsa0JBQWtCLEVBQUUsdUJBQXVCO0lBQzNDLGVBQWUsRUFBRSx1RUFBdUU7SUFDeEYsY0FBYyxFQUFFLHVEQUF1RDtJQUN2RSxhQUFhLEVBQUUscUJBQXFCO0lBQ3BDLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUIsYUFBYSxFQUFFLHFCQUFxQjtJQUNwQyxRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsZUFBZSxFQUFFLGlEQUFpRDtJQUNsRSwyQkFBMkIsRUFBRSxzRUFB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QStCOztJQUMvQiw2QkFBNEM7O0lBQzVDLCtCQUFvQjs7SUFFcEIsZ0NBQW9COztJQUNwQixpQ0FBdUI7O0lBQ3ZCLGdDQUEyQjs7SUFDM0Isa0NBQTZCOztJQUM3Qiw4QkFBbUI7O0lBQ25CLGtDQUF1Qjs7SUFDdkIsZ0NBQXFCOztJQUVyQiw4QkFNa0I7O0lBRWxCLDhCQU9rQjs7SUFFbEIsNkJBTWtCOztJQUVsQixrQ0FNdUI7O0lBRXZCLCtCQU1vQjs7SUFFcEIsOEJBTW1COztJQUVuQixnQ0FNcUI7O0lBRXJCLHNDQU0yQjs7SUFFM0IsOEJBTW1COztJQUVuQiw4QkFPbUI7O0lBRW5CLGlDQU1zQjs7SUFFdEIsK0JBT29COztJQUVwQixpQ0FPc0I7O0lBRXRCLHFDQU8wQjs7SUFHMUIsbUNBQXdCOztJQUV4QiwyQkFPZ0I7O0lBRWhCLGtDQU91Qjs7SUFFdkIsOEJBT21COztJQUVuQiwrQkFNb0I7O0lBRXBCLCtCQU9vQjs7SUFFcEIsNkJBQ2tCOztJQUVsQiwyQkFPZTs7SUFFZix3QkFRWTs7SUFFWix3QkFRWTs7SUFFWix5QkFPYTs7SUFFYiw0QkFPYzs7SUFFZCw0QkFPYzs7SUFFZCxnQ0FPcUI7O0lBRXJCLDZCQU1pQjs7SUFFakIsOEJBTWtCOztJQUVsQix1Q0FPNEI7O0lBRTVCLHdDQVE2Qjs7SUFFN0IscUNBTzBCOztJQUUxQiw4Q0FTK0I7O0lBRS9CLDRDQVM2Qjs7SUFFN0IsNkJBT2lCOztJQUVqQiw4QkFNNEI7O0lBRTVCLHlCQVFhOztJQUViLDRCQU1nQjs7SUFFaEIsZ0NBUW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZGl0aW9uLCBNb2RlbCwgRWRpdGFibGUsIEVudGl0eSwgUk9MRVNfQ09ORElUSU9OUywgRk9STV9GSUxFU19JTUFHRV9GSUxURVIgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJRm9ybUZpZWxkLCBJQ29sdW1uRGVmaW5pdGlvbiwgTU9CSUxFX0ZPUk1fRklFTERTX0FMTCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBtYXAgYXMgX21hcCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmxldCBjb25kaXRpb25zID0ge1xuICBpc05vdEluZm9ybWF0aW9uOiAndHlwZSE9XCJpbmZvcm1hdGlvblwiJyxcbiAgaXNOb3RJbmZvcm1hdGlvbk9yVGFzazogJ3R5cGUhPVwiaW5mb3JtYXRpb25cIiBhbmQgdHlwZSE9XCJ0YXNrXCInLFxuICBpc05vdEluZm9ybWF0aW9uT3JEb2N1bWVudE9ySW1hZ2U6ICd0eXBlIT1cImluZm9ybWF0aW9uXCIgYW5kIHR5cGUhPVwiaW1hZ2VcIiBhbmQgdHlwZSE9XCJkb2N1bWVudFwiJyxcbiAgaXNJbmZvcm1hdGlvbjogJ3R5cGU9PVwiaW5mb3JtYXRpb25cIicsXG4gIGlzVmlkZW9wbGF5ZXI6ICd0eXBlPT1cInZpZGVvcGxheWVyXCInLFxuICBpc0F1dG9jb21wbGV0ZTogJ3R5cGU9PVwiYXV0b2NvbXBsZXRlXCInLFxuICBpc0NhdGFsb2c6ICd0eXBlPT1cImNhdGFsb2dcIicsXG4gIGlzSW1hZ2U6ICd0eXBlPT1cImltYWdlXCInLFxuICBpc0RvY3VtZW50OiAndHlwZT09XCJkb2N1bWVudFwiJyxcbiAgaXNQaG90bzogJ3R5cGU9PVwicGhvdG9cIiBvciB0eXBlPT1cIm11bHRpcGhvdG9zXCInLFxuICBpc011bHRpUGhvdG9zOiAndHlwZT09XCJtdWx0aXBob3Rvc1wiJyxcbiAgaXNJbWFnZVJlY29nbml0aW9uOiAnaXNJbWFnZVJlY29nbml0aW9uPT0xJyxcbiAgaGFzQWxsb3dMaWJyYXJ5OiAndHlwZT09XCJwaG90b1wiIG9yIHR5cGU9PVwidmlkZW9cIiBvciB0eXBlPT1cIm11bHRpcGhvdG9zXCIgb3IgdHlwZT09XCJ0b2RvXCInLFxuICBpc1Bob3RvT3JWaWRlbzogJ3R5cGU9PVwicGhvdG9cIiBvciB0eXBlPT1cInZpZGVvXCIgb3IgdHlwZT09XCJtdWx0aXBob3Rvc1wiJyxcbiAgaXNFbWFpbFJlcG9ydDogJ3R5cGU9PVwiZW1haWxyZXBvcnRcIicsXG4gIGlzU2VsZWN0OiAndHlwZT09XCJzZWxlY3RcIicsXG4gIGlzU2VsZWN0SW1hZ2U6ICd0eXBlPT1cInNlbGVjdGltYWdlXCInLFxuICBpc0FkcmVzczogJ3R5cGU9PVwiYWRkcmVzc1wiJyxcbiAgaXNOdW1iZXI6ICd0eXBlPT1cIm51bWJlclwiJyxcbiAgaXNEYXRlOiAndHlwZT09XCJkYXRlXCInLFxuICBpc1RvZG86ICd0eXBlPT1cInRvZG9cIicsXG4gIGlzTnVtYmVyT3JSYW5nZTogJ3R5cGU9PVwibnVtYmVyXCIgb3IgdHlwZT09XCJyYW5nZVwiIG9yIHR5cGU9PVwia25vYlwiJyxcbiAgaXNOdW1iZXJPclJhbmdlT3JTdGFycmF0aW5nOiAndHlwZT09XCJudW1iZXJcIiBvciB0eXBlPT1cInJhbmdlXCIgb3IgdHlwZT09XCJzdGFycmF0aW5nXCJvciB0eXBlPT1cImtub2JcIicsXG4gIGlzU3RhclJhdGluZzogJ3R5cGU9PVwic3RhcnJhdGluZ1wiJyxcbiAgaXNBdWRpb09yVmlkZW86ICd0eXBlPT1cImF1ZGlvXCIgb3IgdHlwZT09XCJ2aWRlb1wiJyxcbiAgaXNDb25uZWN0OiAndHlwZSA9PSBcImNvbm5lY3RcIicsXG4gIGlzR2FtZTogJ3R5cGUgPT0gXCJnYW1lXCInLFxuICBpc0Zvcm11bGE6ICd0eXBlPT1cImZvcm11bGFcIicsXG4gIGhhc1ZhbHVlczogJ3R5cGU9PVwidG9kb1wiIG9yIHR5cGU9PVwicGhvdG9cIiBvciB0eXBlPT1cIm11bHRpcGhvdG9zXCIgb3IgdHlwZT09XCJyYW5raW5nXCIgb3IgdHlwZT09XCJzZWxlY3RcIiBvciB0eXBlPT1cInNlbGVjdG11bHRpXCIgb3IgdHlwZT09XCJzZWxlY3RidXR0b25zXCIgb3IgdHlwZT09XCJzZWxlY3RjaGF0XCIgb3IgdHlwZT09XCJzZWxlY3RidXR0b25zbXVsdGlcIiBvciB0eXBlPT1cImF1dG9jb21wbGV0ZVwiIG9yIHR5cGU9PVwiZW1haWxyZXBvcnRcIiBvciB0eXBlPT1cInNlbGVjdGltYWdlXCIgb3IgdHlwZT09XCJtaXNzaW5nd29yZFwiIG9yIHR5cGU9PVwic3dpcGVzZWxlY3RcIiBvciB0eXBlPT1cImdhbWVcIicsXG4gIG1pc3Npb25Jc1F1aXp6OiA8Q29uZGl0aW9uPnsgdHlwZTogJ21pc3Npb25EZXNjcmlwdGlvbkF0dHJpYnV0ZScsIGtleTogJ3F1aXp6JywgdmFsdWU6IHRydWUgfSxcbiAgaGFzU2VudGVuY2U6ICd0eXBlPT1cIm1pc3Npbmd3b3JkXCIgb3IgdHlwZT09XCJzd2lwZXNlbGVjdFwiIG9yIHR5cGU9PVwic2VsZWN0Y2hhdFwiJyxcbiAgaGFzTXVsdGlwbGU6ICd0eXBlPT1cImF1dG9jb21wbGV0ZVwiIG9yIHR5cGU9PVwic2VsZWN0Y2hhdFwiIG9yIHR5cGU9PVwic2VsZWN0aW1hZ2VcIiAnLFxuICBpc1JlYWRPbmx5OiAncmVhZG9ubHkgPT0gMSdcbn07XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBzZXRDb25uZWN0QW5zd2VySGFuZGxlcih2YWx1ZSwgY29udHJvbHMsIGRhdGEsIGZvcm0sIHJlcXVlc3RvciwgZGlhbG9nLCB2aWV3Q29udGFpbmVyUmVmLCBjaGFuZ2VEZXRlY3RvclJlZikge1xuLy8gICBkaWFsb2dcbi8vICAgICAudXBzZXJ0KFxuLy8gICAgICAge30sXG4vLyAgICAgICAnJyxcbi8vICAgICAgIHZpZXdDb250YWluZXJSZWYsXG4vLyAgICAgICBudWxsLFxuLy8gICAgICAgW1xuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgbmFtZTogJ2Nvbm5lY3RBbnN3ZXInLFxuLy8gICAgICAgICAgIHRpdGxlOiAnQ09OTkVDVCcsXG4vLyAgICAgICAgICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jb25uZWN0LFxuLy8gICAgICAgICAgIGNvbm5lY3RNb2RlOiBkYXRhLmNvbm5lY3RNb2RlLFxuLy8gICAgICAgICAgIGxlZnRWYWx1ZXM6IGRhdGEubGVmdFZhbHVlcyxcbi8vICAgICAgICAgICByaWdodFZhbHVlczogZGF0YS5yaWdodFZhbHVlc1xuLy8gICAgICAgICB9XG4vLyAgICAgICBdLFxuLy8gICAgICAgbnVsbCxcbi8vICAgICAgIG51bGwsXG4vLyAgICAgICBudWxsLFxuLy8gICAgICAgbnVsbCxcbi8vICAgICAgIG51bGwsXG4vLyAgICAgICBudWxsLFxuLy8gICAgICAgbnVsbCxcbi8vICAgICAgIG51bGwsXG4vLyAgICAgICBudWxsLFxuLy8gICAgICAgbnVsbCxcbi8vICAgICAgIG51bGwsXG4vLyAgICAgICBmYWxzZSxcbi8vICAgICAgIG51bGxcbi8vICAgICApXG4vLyAgICAgLnRoZW4ocmV0VmFsID0+IHtcbi8vICAgICAgIGlmIChyZXRWYWwpIHtcbi8vICAgICAgICAgZGF0YS5hbnN3ZXIgPSBmbGF0TWFwKHJldFZhbFsnY29ubmVjdEFuc3dlciddKTtcbi8vICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vLyB9XG5cbkBNb2RlbCh7IGNsYXNzTmFtZTogJ0Zvcm1GaWVsZCcgfSlcbmV4cG9ydCBjbGFzcyBGb3JtRmllbGQgZXh0ZW5kcyBFbnRpdHkgaW1wbGVtZW50cyBJRm9ybUZpZWxkIHtcbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgdmlzaWJsZTogZmFsc2UgfSlcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsIHJlcXVpcmVkOiB0cnVlIH0pXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgaWNvbjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnSU5TVFJVQ1RJT05TJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdEluZm9ybWF0aW9uLFxuICAgIGxhbmd1YWdlOiAnaHRtbCdcbiAgfSlcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ1ZBTFVFJyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0luZm9ybWF0aW9uLFxuICAgIGxhbmd1YWdlOiAnaHRtbCdcbiAgfSlcbiAgdmFsdWU6IGFueTtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ1VSTCcsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1ZpZGVvcGxheWVyXG4gIH0pXG4gIHVybDogYW55O1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnU0VOVEVOQ0UnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmhhc1NlbnRlbmNlXG4gIH0pXG4gIHNlbnRlbmNlOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdGT1JNVUxBJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0Zvcm11bGFcbiAgfSlcbiAgZm9ybXVsYTogYW55O1xuXG4gIGhlYWRlcjogc3RyaW5nO1xuICBmaWx0ZXJOYW1lOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdmFsdWVzOiBfbWFwKE1PQklMRV9GT1JNX0ZJRUxEU19BTEwsICd0eXBlJyksXG4gICAgdHJhbnNsYXRlOiB0cnVlXG4gIH0pXG4gIHR5cGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0dBTUUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHZhbHVlczogWydydW5uZXItZ2FtZScsICdtZW1vcnktY2FyZC1nYW1lJ10sXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0dhbWUsXG4gICAgcmVxdWlyZWQ6IHRydWVcbiAgfSlcbiAgZ2FtZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnY2F0YWxvZ3MnLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNDYXRhbG9nXG4gIH0pXG4gIGNhdGFsb2c6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNDYXRhbG9nLCAncHJlc2VuY2UgIT0gMSddLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGludmVudG9yeTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNDYXRhbG9nLCAnaW52ZW50b3J5ICE9IDEnXSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBwcmVzZW5jZTogYm9vbGVhbjtcblxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2aXNpYmxlOiBib29sZWFuO1xuXG4gIHRhZzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0NVU1RPTU1PREVMJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2N1c3RvbW1vZGVscycsXG4gICAgaWRBdHRyaWJ1dGVOYW1lOiAnbmFtZScsXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0F1dG9jb21wbGV0ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBjb2xsZWN0aW9uTmFtZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0F1dG9jb21wbGV0ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBmaWx0ZXJCeUxvY2F0aW9uOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRhZzogdHJ1ZSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBhbGxvd0N1c3RvbVRhZzogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaGFzVmFsdWVzXG4gIH0pXG4gIHZhbHVlczogQXJyYXk8YW55PjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ01PREUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHZhbHVlczogWydkcmFnbmRyb3AnLCAnZHJhd2luZyddLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNDb25uZWN0LFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0pXG4gIGNvbm5lY3RNb2RlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGFnOiB0cnVlLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0Nvbm5lY3RcbiAgfSlcbiAgbGVmdFZhbHVlczogQXJyYXk8YW55PjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWc6IHRydWUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgYWxsb3dDdXN0b21UYWc6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzQ29ubmVjdFxuICB9KVxuICByaWdodFZhbHVlczogQXJyYXk8YW55PjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWc6IHRydWUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgYWxsb3dDdXN0b21UYWc6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzR2FtZVxuICB9KVxuICBjb3JyZWN0VmFsdWVzOiBBcnJheTxhbnk+O1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRhZzogdHJ1ZSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBhbGxvd0N1c3RvbVRhZzogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNHYW1lXG4gIH0pXG4gIHdyb25nVmFsdWVzOiBBcnJheTxhbnk+O1xuXG4gIC8vIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAvLyAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYnV0dG9uLFxuICAvLyAgIGhhbmRsZXI6IHNldENvbm5lY3RBbnN3ZXJIYW5kbGVyLFxuICAvLyAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0Nvbm5lY3RcbiAgLy8gfSlcbiAgLy8gc2V0QW5zd2VyOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICd1c2VyJyxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdGFnOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNUb2RvXSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICB1c2VyVGFnczogQXJyYXk8c3RyaW5nPjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0lNQUdFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBmaWx0ZXJzOiBGT1JNX0ZJTEVTX0lNQUdFX0ZJTFRFUixcbiAgICBmb3JjZU1vZGFsOiB0cnVlLFxuICAgIGhpZGRlbkZpZWxkczogWydtaW1lVHlwZSddLFxuICAgIG1vZGU6ICd0aWxlJyxcbiAgICBwYWdlU2l6ZTogMjAsXG4gICAgZml4ZWRQb3NpdGlvbjogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2ZpbGVzJyxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNJbWFnZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdfZmlsZW5hbWUnIH1cbiAgfSlcbiAgaW1hZ2U6IGFueTtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0lNQUdFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBmaWx0ZXJzOiBGT1JNX0ZJTEVTX0lNQUdFX0ZJTFRFUixcbiAgICBmb3JjZU1vZGFsOiB0cnVlLFxuICAgIGhpZGRlbkZpZWxkczogWydtaW1lVHlwZSddLFxuICAgIG1vZGU6ICd0aWxlJyxcbiAgICBwYWdlU2l6ZTogMjAsXG4gICAgZml4ZWRQb3NpdGlvbjogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2ZpbGVzJyxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNTZWxlY3RJbWFnZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdfZmlsZW5hbWUnIH1cbiAgfSlcbiAgaW1hZ2VzOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdET0NVTUVOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzRG9jdW1lbnQsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnX2ZpbGVuYW1lJyB9XG4gIH0pXG4gIGRvY3VtZW50OiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsIGNvbmRpdGlvbjogY29uZGl0aW9ucy5oYXNNdWx0aXBsZSB9KVxuICBtdWx0aXBsZTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0JVVFRPTlMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzU3RhclJhdGluZ1xuICB9KVxuICB1c2VCdXR0b25zOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnTU9ERScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdmFsdWVzOiBbJ3lvdXR1YmUnLCAndXJsJ10sXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1ZpZGVvcGxheWVyLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0pXG4gIG1vZGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWc6IHRydWUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgYWxsb3dDdXN0b21UYWc6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLm1pc3Npb25Jc1F1aXp6LFxuICAgIGR5bmFtaWNWYWx1ZXM6ICd2YWx1ZXMnXG4gIH0pXG4gIGFuc3dlcjogQXJyYXk8YW55PjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5taXNzaW9uSXNRdWl6elxuICB9KVxuICBleHBsYW5hdGlvbjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnRVhQTEFOQVRJT05ET0NVTUVOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLm1pc3Npb25Jc1F1aXp6LFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ19maWxlbmFtZScgfVxuICB9KVxuICBleHBsYW5hdGlvbkRvY3VtZW50OiBhbnk7XG5cbiAgc2Vzc2lvblZhbHVlczogc3RyaW5nO1xuICBmaWx0ZXJhYmxlOiBib29sZWFuO1xuICBjb2x1bW5EZWZpbml0aW9uOiBJQ29sdW1uRGVmaW5pdGlvbjtcbiAgb3BlcmF0b3JzOiBBcnJheTxhbnk+O1xuICBoaW50OiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWUsIGRhdGEpID0+IGFueTtcbiAgc3ViUXVlcnk6IHsgZmllbGQ6IHN0cmluZzsgdmFsdWVzOiBzdHJpbmcgfTtcbiAgaXNTdWJRdWVyeTogYm9vbGVhbjtcbiAgLy9pc0ZpZWxkU2VsZWN0b3I6IGJvb2xlYW47XG4gIGRpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIG1hcFRyYW5zZm9ybTogRnVuY3Rpb247XG4gIHF1ZXJ5RmllbGRzOiBBcnJheTxzdHJpbmc+O1xuICBkZWZhdWx0RmllbGRzOiBBcnJheTxzdHJpbmc+O1xuICBoaWRlTGFiZWw6IGJvb2xlYW47XG4gIGZpeGVkUG9zaXRpb246IGJvb2xlYW47XG4gIGltYWdlTGF5b3V0Pzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNNdWx0aVBob3Rvc10sXG4gICAgZmxleDogNTAsXG4gICAgZXh0ZXJuYWxWYWxpZGF0b3JzOiBbeyBleHRlcm5hbEZpZWxkTmFtZTogJ21heFBob3RvcycsIHJ1bGU6ICdsb3dlcicgfV1cbiAgfSlcbiAgbWluUGhvdG9zOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc011bHRpUGhvdG9zXSxcbiAgICBmbGV4OiA1MCxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBleHRlcm5hbFZhbGlkYXRvcnM6IFt7IGV4dGVybmFsRmllbGROYW1lOiAnbWluUGhvdG9zJywgcnVsZTogJ2hpZ2hlcicgfV1cbiAgfSlcbiAgbWF4UGhvdG9zOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdNQU5EQVRPUlknLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzTm90SW5mb3JtYXRpb25PckRvY3VtZW50T3JJbWFnZSxcbiAgICBmbGV4OiA1MFxuICB9KVxuICByZXF1aXJlZDogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0FMTE9XQ09NTUVOVFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzTm90SW5mb3JtYXRpb24sXG4gICAgZmxleDogNTBcbiAgfSlcbiAgYWxsb3dDb21tZW50czogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0FVVE9SRUxPQUQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzTm90SW5mb3JtYXRpb24sXG4gICAgZmxleDogNTBcbiAgfSlcbiAgYXV0b3JlbG9hZDogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0FMTE9XVEFTSycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzTm90SW5mb3JtYXRpb25PclRhc2ssIFJPTEVTX0NPTkRJVElPTlMuaGFzVG9kb10sXG4gICAgZmxleDogNTBcbiAgfSlcbiAgYWxsb3dUYXNrOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnU0hBUkVUT0ZFRUQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgZmxleDogNTAsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc1Bob3RvXVxuICB9KVxuICBzaGFyZVRvRmVlZDogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0FMTFBIT1RPU1JFUVVJUkVEJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDEwMCxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzVG9kb11cbiAgfSlcbiAgYWxsUGhvdG9zUmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNBdXRvY29tcGxldGUsXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGNsZWFyYWJsZTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0FMTE9XVElNRScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzTm90SW5mb3JtYXRpb25dLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBhbGxvd1RpbWU6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdBTExPV0xJQlJBUlknLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmhhc0FsbG93TGlicmFyeSxcbiAgICBmbGV4OiAxMDBcbiAgfSlcbiAgYWxsb3dMaWJyYXJ5OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnR0VPTE9DJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1Bob3RvT3JWaWRlbyxcbiAgICBmbGV4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgc2F2ZUdlb2xvYzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0FMTE9XSElTVE9SWScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmhhc1RvZG9PclNjb3JlXSxcbiAgICBmbGV4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgYWxsb3dIaXN0b3J5OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnQUxMT1dPUEVOREVUQUlMUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBmbGV4OiAxMDAsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzU2VsZWN0SW1hZ2UsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgYWxsb3dPcGVuRGV0YWlsczogYm9vbGVhbjtcblxuICAvL0BFZGl0YWJsZSgnRm9ybUZpZWxkJywgeyB0aXRsZTogJ1NIT1dPTkxPQ0FUSU9OJywgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCwgZmxleDogMTAwLCAgYWR2YW5jZWQ6IHRydWUgfSlcbiAgc2hvd09uTG9jYXRpb246IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdMSU5LVE9QUkVWSU9VU1FVRVNUSU9OJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDEwMCxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzVG9kb10sXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgbGlua2VkOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnQUxMT1dBTk5PVEFURScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzUGhvdG9dLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBhbGxvd0Fubm90YXRlOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnU0hPV1VTRVJTRU1BSUwnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzRW1haWxSZXBvcnQsXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHNob3dVc2VyczogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0hJREVNT0JJTEUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGhpZGVNb2JpbGU6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdPVEhFUjEnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzU2VsZWN0LFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBhbGxvd090aGVyOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LCBmbGV4OiAxMDAsIGFkdmFuY2VkOiB0cnVlIH0pXG4gIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnUkFESVVTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNBZHJlc3MsXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHJhZGl1czogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnTUlOJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNOdW1iZXJPclJhbmdlLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogZmFsc2UsXG4gICAgZXh0ZXJuYWxWYWxpZGF0b3JzOiBbeyBleHRlcm5hbEZpZWxkTmFtZTogJ21heCcsIHJ1bGU6ICdsb3dlcicgfV1cbiAgfSlcbiAgbWluOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdNQVgnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc051bWJlck9yUmFuZ2VPclN0YXJyYXRpbmcsXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiBmYWxzZSxcbiAgICBleHRlcm5hbFZhbGlkYXRvcnM6IFt7IGV4dGVybmFsRmllbGROYW1lOiAnbWluJywgcnVsZTogJ2hpZ2hlcicgfV1cbiAgfSlcbiAgbWF4OiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdTVEVQJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNOdW1iZXIsXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHN0ZXA6IG51bWJlcjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ01JTicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0RhdGUsXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIG1pbkRhdGU6IERhdGU7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdNQVgnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNEYXRlLFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBtYXhEYXRlOiBEYXRlO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnU0hPV1NFUlZJQ0UnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgZmxleDogMTAwLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5oYXNTZXJ2aWNlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHNob3dTZXJ2aWNlOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNQaG90b10sXG4gICAgZmxleDogMTAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIG1heFdpZHRoOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc1Bob3RvXSxcbiAgICBmbGV4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgbWF4SGVpZ2h0OiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc1Bob3RvLCBST0xFU19DT05ESVRJT05TLmlzQWRtaW5dLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ1BIT1RPTElWRUNPVU5URVInLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGlzSW1hZ2VSZWNvZ25pdGlvbjogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzSW1hZ2VSZWNvZ25pdGlvbiwgUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXSxcbiAgICBmbGV4OiAxMDAsXG4gICAgdGl0bGU6ICdCQUNLR1JPVU5EUFJPQ0VTUycsXG4gICAgYWR2YW5jZWQ6IHRydWUsXG4gICAgdHJhbnNsYXRlOiB0cnVlXG4gIH0pXG4gIGlzQmFja2dyb3VuZFByb2Nlc3M6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdET05UU0FWRUlGSElEREVOJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDEwMCxcbiAgICBhZHZhbmNlZDogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNSZWFkT25seVxuICB9KVxuICBkb250U2F2ZUlmSGlkZGVuOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnYWxnb3JpdGhtJyxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNJbWFnZVJlY29nbml0aW9uLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ0FMR09SSVRITScsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgaW1hZ2VSZWNvZ25pdGlvbkFsZ29yaXRobTogYW55O1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuanNvbixcbiAgICB0aXRsZTogJ0RJU1BMQVknLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc0ltYWdlUmVjb2duaXRpb24sXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGltYWdlUmVjb2duaXRpb25EaXNwbGF5OiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdGl0bGU6ICdEVVJBVElPTk1BWCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzQXVkaW9PclZpZGVvLFxuICAgIGZsZXg6IDEwMCxcbiAgICBtYXg6IDYwXG4gIH0pXG4gIGR1cmF0aW9uOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdGb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiB0cnVlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGNvbmRpdGlvbjogQXJyYXk8Q29uZGl0aW9uPjtcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0ZMRVgnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGZsZXg6IDEwMCxcbiAgICBtaW46IDAsXG4gICAgbWF4OiAxMDAsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgZmxleDogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRm9ybUZpZWxkJywge1xuICAgIHRpdGxlOiAnTEVHRU5EJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdEluZm9ybWF0aW9uLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGNhcHRpb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Zvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ1JFUE9SVE9SREVSJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmhhc1RvZG9PclNjb3JlXSxcbiAgICBmbGV4OiAxMDAsXG4gICAgbWluOiAwLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHJlcG9ydE9yZGVyOiBudW1iZXI7XG59XG4iXX0=
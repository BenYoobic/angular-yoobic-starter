const h = window.DesignSystem.h;

import { m as translate, a6 as debounce, v as isAndroid, k as isCordova, L as querySelectorDeep, aa as querySelectorAllDeep, a7 as findParent, aA as FormFieldType, bf as getFieldValue, bg as cloneDeep, bh as lockSwipes, bi as isQuiz, bj as isTimedQuiz, x as getSession, b7 as disableKeyboardResize, ad as isIonic, aD as enableKeyboardResize, o as isIOS, bk as isRequired, bl as isReadonly, bm as isVisible, bn as hasValue, W as isWeb, a4 as getElementDimensions, bo as setFieldData, bp as isFunction, aB as isObject, aj as isArray, bq as assign, br as result, bs as getDistance, l as showToast, bt as getActiveElementShadow, a_ as showModal, bu as updateFormulas, bv as isFieldWithNoValue, bw as isEmpty, ax as hideShowTabbar, a5 as getAppContext, bx as findLastIndex, b6 as translateMulti, be as isIphoneX, by as isContentOnly, bz as evalInContext, bA as generateLabel, bB as getMissionStatusIconClass, bC as answerIsValid, ae as isNullOrUndefined, aN as setValidator, ay as showAlert, bD as remove, aQ as setValueAndValidateInput, ba as showActionSheet, bE as taskStyle } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';
import { a as CameraPreview } from './chunk-a9e7b546.js';

class YooFieldValidityComponent {
    renderExplanation() {
        return (h("div", { class: "explanation-container" },
            h("div", { class: "explanation-label" }, translate('WHY?')),
            h("div", { class: "explanation-text" }, this.explanation),
            this.explanationDocument ? [h("div", { class: "explanation-label" }, translate('EXTRA')), h("yoo-form-document", { document: this.explanationDocument })] : null));
    }
    render() {
        return [
            h("div", { class: 'validity-label ' + (this.isValid ? 'valid' : 'invalid') }, translate(this.isValid ? 'CORRECT' : 'INCORRECT')),
            !this.isValid && this.explanation ? this.renderExplanation() : null
        ];
    }
    static get is() { return "yoo-field-validity"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "explanation": {
            "type": String,
            "attr": "explanation"
        },
        "explanationDocument": {
            "type": "Any",
            "attr": "explanation-document"
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "type": Boolean,
            "attr": "is-valid"
        }
    }; }
    static get style() { return ":host {\n  display: block;\n  padding: var(--padding-10, 0.625rem) 0; }\n  :host .validity-label {\n    margin: var(--padding-10, 0.625rem) auto;\n    font-size: var(--font-m, 15px); }\n    :host .validity-label.valid {\n      color: var(--success, #04CC99); }\n    :host .validity-label.invalid {\n      color: var(--danger, #ff625f); }\n  :host .explanation-container {\n    font-size: var(--font-m, 15px); }\n    :host .explanation-container .explanation-label {\n      margin-bottom: var(--padding-10, 0.625rem);\n      color: var(--black, #000000); }\n    :host .explanation-container .explanation-text {\n      margin-bottom: var(--padding-10, 0.625rem);\n      color: var(--text-color, #807f83); }\n\n:host(.border) {\n  border-bottom: 1px solid var(--stable-30, #E6E6E6); }"; }
}

class YooFormDynamicComponent {
    constructor() {
        this.animated = false;
        this.progress = { value: 0 };
        this.gradientClass = 'gradient-success';
        this.timer = null; // in minutes
        this.activeIndex = 0;
        this.isKeyboardPresent = false;
        this.failedSubmission = [];
        this.isHistoryContentOverflowing = false;
        this.showHistoryModal = false;
        this.remainingTime = 0;
        this.steps = [];
        this.isWeb = false;
        this.blurOnScroll = true;
        this.isTabbarHidden = false;
        this.isFieldInSlot = true;
        this.currentScrollPosition = 0;
        this.windowHasFinishedResizing = true;
        this.continueEnabled = true;
        this.onKeyboardWillShow = debounce((event) => {
            if (event && !isAndroid() && !this.isInlineForm()) {
                let scrollSpacerHeight = event.keyboardHeight;
                this.setScrollSpacerHeight(scrollSpacerHeight);
            }
            let scrollSpacer = this.getElementFromCurrentSlide('.scroll-spacer');
            if (scrollSpacer) {
                scrollSpacer.classList.remove('bottom-bar');
            }
            this.isKeyboardPresent = true;
            if (isAndroid()) {
                this.windowHasFinishedResizing = false;
            }
        }, 500);
        this.slidesOptions = {
            autoplay: false,
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
            }
        };
        if (isAndroid() && isCordova()) {
            this.slidesOptions = Object.assign({}, this.slidesOptions, { width: window.innerWidth });
        }
    }
    get scrollInnerHeight() {
        return querySelectorDeep(this.host, 'yoo-ion-scroll').getBoundingClientRect().height;
    }
    get lockIndex() {
        return this.slidesState.map(state => state && state.locked);
    }
    onIonModalWillPresent() {
        if (this.focusedField) {
            this.focusedField = null;
        }
    }
    onInputFocused(ev) {
        if (this.isFieldInSlot && ev && ev.detail) {
            this.focusedField = ev.detail.host;
        }
    }
    updateData() {
        this.currentData = this.data || {};
    }
    async scrollToPoint(relativeScrollDistance, duration = 1000) {
        let currentSlide = querySelectorAllDeep(this.host, 'yoo-ion-slide')[this.activeIndex];
        let parentIonScroll = findParent(this.host, 'yoo-ion-scroll');
        let ionScroll = querySelectorDeep(currentSlide, 'yoo-ion-scroll');
        if (parentIonScroll) {
            let isScrollDistanceBiggerThanScroll = await parentIonScroll.isScrollDistanceBiggerThanScroll(relativeScrollDistance);
            if (isScrollDistanceBiggerThanScroll) {
                return parentIonScroll.scrollToBottom(0);
            }
            else {
                return parentIonScroll.scrollByPoint(0, relativeScrollDistance, duration);
            }
        }
        else if (ionScroll) {
            let isScrollDistanceBiggerThanScroll = await ionScroll.isScrollDistanceBiggerThanScroll(relativeScrollDistance);
            if (isScrollDistanceBiggerThanScroll) {
                return ionScroll.scrollToBottom(0);
            }
            else {
                return ionScroll.scrollByPoint(0, relativeScrollDistance, duration);
            }
        }
    }
    setScrollSpacerHeight(height) {
        let scrollSpacer = this.getElementFromCurrentSlide('.scroll-spacer');
        if (scrollSpacer) {
            scrollSpacer.setAttribute('style', `height: ${height}px !important;`);
        }
    }
    goToRecap() {
        if (this.ionSlides) {
            this.ionSlides.slideTo(0);
        }
    }
    forceFieldUpdate(field, fieldData, formSearch) {
        let el = this.getFieldByCode(field.name);
        if (el) {
            switch (field.type) {
                case FormFieldType.autocomplete:
                case FormFieldType.location:
                case FormFieldType.address:
                case FormFieldType.catalog:
                    let auto = el;
                    auto.updateValues(field.tmpValues);
                    break;
                case FormFieldType.emailreport:
                    let emailreport = el;
                    emailreport.updateValues(field.tmpValues, formSearch);
                    break;
                case FormFieldType.catalog:
                    let catalog = el;
                    catalog.updateValues(field.tmpValues);
                    break;
                case FormFieldType.video:
                    let videoValue = fieldData.value;
                    let videoElement = el;
                    if (videoValue) {
                        videoElement.setFieldValue(undefined, videoValue);
                    }
                    break;
                case FormFieldType.photo:
                case FormFieldType.multiphotos:
                    let photo = el;
                    if (fieldData) {
                        let value = fieldData.value;
                        let extraData = fieldData.extraData;
                        if (value && extraData) {
                            photo.updateData(value, extraData);
                        }
                        let imageRecognitionResults = fieldData.imageRecognitionResults;
                        if (imageRecognitionResults) {
                            photo.processImageRecognitionResults(imageRecognitionResults);
                        }
                        else {
                            photo.stopImageRecognitionProcess();
                        }
                        let geolocation = fieldData.geolocation;
                        if (geolocation) {
                            let index = fieldData.index;
                            photo.processGeoloc(geolocation, index);
                        }
                    }
                    if (field.tmpValues) {
                        photo.updateAutocompleteValues(field.tmpValues);
                    }
                    break;
            }
        }
    }
    afterFetchCustomData(field, data) {
        let el = this.getFieldByCode(field.name);
        if (el) {
            switch (field.type) {
                case FormFieldType.todo:
                    let todo = el;
                    todo.setSlides(data);
                    break;
                case FormFieldType.task:
                    let task = el;
                    task.setSlides(data);
                    break;
            }
        }
    }
    async findPreviousValue(fieldName) {
        let previousField;
        let previousValue;
        let previousExtra;
        this.slides.forEach(slide => {
            if (slide.items) {
                slide.items.forEach((f, i) => {
                    if (f.name === fieldName && i > 0) {
                        previousField = slide.items[i - 1];
                    }
                });
            }
        });
        if (previousField) {
            previousValue = getFieldValue(previousField, this.currentData, this.suffix);
            if (previousField.type === FormFieldType.photo && previousField.multiple !== true) {
                previousExtra = {
                    edit: getFieldValue(previousField, this.currentData, '.edit'),
                    texts: getFieldValue(previousField, this.currentData, '.texts')
                };
            }
            else if (previousField.type === FormFieldType.photo && previousField.multiple === true) {
                previousExtra = { extraData: getFieldValue(previousField, this.currentData, '.extraData') };
            }
        }
        return { field: cloneDeep(previousField), value: previousValue, extra: previousExtra };
    }
    onSlidePrevious() {
        if (this.ionSlides) {
            lockSwipes(this.ionSlides, false);
            this.ionSlides.slidePrev();
        }
    }
    onSlideNext(skipEmitEvent = false) {
        this.checkIfFirstSlideAndLockSwipePrev();
        if (this.formType === 'lesson' && !skipEmitEvent && this.showAnswers && isQuiz(this.lessonType) && !isTimedQuiz(this.lessonType)) {
            let field = this.slides[this.activeIndex].items[0];
            this.slideAnswered.emit({ index: this.activeIndex, field: field, data: this.data[field.name] });
            return;
        }
        if (this.ionSlides) {
            lockSwipes(this.ionSlides, false);
            this.ionSlides.slideNext();
        }
        else if (this.isWeb && (this.activeIndex !== (this.slides.length - 1))) {
            this.activeIndex += 1;
        }
    }
    /**
     * helps to deal with quick clicking/tapping to form buttons (next/finish),
     * which could emits several (eg. onSlideNext) events on the same slide
     * @param callback
     */
    continueIfEnabled(callback) {
        if (!this.continueEnabled) {
            return;
        }
        callback();
        this.continueEnabled = false;
        if (!this.continueTimeout) {
            this.continueTimeout = setTimeout(() => {
                this.continueEnabled = true;
                this.continueTimeout = null;
            }, 1000);
        }
    }
    highlightInvalidFields() {
        const invalidFieldCodes = Object.keys(this.fieldsState)
            .filter((code) => this.fieldsState[code].validity === false);
        this.setFormInputContainerInvalid(false, this.failedSubmission);
        this.setFormInputContainerInvalid(true, invalidFieldCodes);
    }
    goToSlide(index, animated) {
        lockSwipes(this.ionSlides, false);
        if (this.slidesState[index] && !this.getSlideState(index).locked) {
            if (this.ionSlides) {
                this.ionSlides.slideTo(this.showRecap !== false ? index + 1 : index, animated ? 200 : 0);
            }
            else if (this.isWeb) {
                this.activeIndex = index;
            }
        }
    }
    componentWillLoad() {
        this.session = getSession();
        this.currentData = this.data || {};
        this.fieldsState = {};
        this.slidesState = new Array(this.slides ? this.slides.length : 0);
        this.secondaryFieldsState = {};
        this.initValidity();
        this.updateState();
        if (isCordova()) {
            disableKeyboardResize(Keyboard);
        }
    }
    componentDidLoad() {
        if (isIonic()) {
            this.keyboardWillShowListener = this.onKeyboardWillShow.bind(this);
            window.addEventListener('keyboardWillShow', this.keyboardWillShowListener);
            this.keyboardDidShowListener = debounce(this.onKeyboardDidShow, 500).bind(this);
            window.addEventListener('keyboardDidShow', this.keyboardDidShowListener);
            this.keyboardWillHideListener = debounce(this.onKeyboardWillHide, 500).bind(this);
            window.addEventListener('keyboardWillHide', this.keyboardWillHideListener);
            this.resizeListener = debounce(this.onWindowResize, 500).bind(this);
            window.addEventListener('resize', this.resizeListener);
        }
        if (isCordova() && this.session.selectedMissionPage > -1 && this.slides && this.slides.length > 1) {
            let slideIndex = this.session.selectedMissionPage - 1;
            this.goToSlide(slideIndex, slideIndex < 2);
        }
        if (!this.showTabs) {
            setTimeout(() => {
                lockSwipes(this.ionSlides, true);
            }, 300);
        }
        this.checkIfFirstSlideAndLockSwipePrev();
        this.setSlidesHeight();
    }
    componentDidUpdate() {
        this.setSlidesHeight();
    }
    componentDidUnload() {
        if (isCordova()) {
            enableKeyboardResize(Keyboard);
            if (getSession().cameraStarted && isIOS() && CameraPreview) {
                CameraPreview.stopCamera().then((res) => {
                    getSession().cameraStarted = false;
                });
            }
        }
        clearInterval(this.timerInterval);
        if (isIonic()) {
            window.removeEventListener('keyboardWillShow', this.keyboardWillShowListener);
            window.removeEventListener('keyboardDidShow', this.keyboardDidShowListener);
            window.removeEventListener('keyboardWillHide', this.keyboardWillHideListener);
            window.removeEventListener('resize', this.resizeListener);
        }
    }
    checkIfFirstSlideAndLockSwipePrev() {
        // timeout -> wait swipe is done
        setTimeout(() => {
            if (this.ionSlides) {
                return this.ionSlides.getActiveIndex().then((slideIndex) => {
                    if (this.ionSlides) {
                        let slidePrevDisabled = !this.slides || (this.slides && slideIndex === 0);
                        this.ionSlides.lockSwipeToPrev(slidePrevDisabled);
                    }
                });
            }
        }, 500);
    }
    encodeFieldName(name) {
        return 'f-' + name.replace(/\./g, '-').replace(/_/g, '-');
    }
    getFieldByCode(name, host) {
        let code = this.encodeFieldName(name);
        return querySelectorDeep(host || this.host, '[attr-name=' + code + ']');
    }
    onIonScrollEnd() {
        this.blurOnScroll = true;
    }
    onIonScroll(ev) {
        if (this.blurOnScroll && this.windowHasFinishedResizing && ev && ev.detail && ((ev.detail.deltaY > 10) || ev.detail.deltaY < -10)) {
            this.blurInput();
        }
        if (ev && ev.detail) {
            this.currentScrollPosition = ev.detail.currentY;
        }
    }
    isInlineForm() {
        return this.host.classList.contains('inline');
    }
    onWindowResize() {
        if (isAndroid()) {
            this.blurOnScroll = false;
        }
    }
    initValidity() {
        if (this.slides && this.slides.map) {
            this.slides.map(slide => {
                slide.items.map(field => {
                    // for fields which are required && visible and have no value, we assign its validity to false for form validation purpose;
                    let fieldState = this.getFieldState(field);
                    if (isRequired(field, this.currentData, fieldState.visible, this.suffix, this.session)) {
                        this.initReadonlyAndVisible(field, fieldState);
                        if (fieldState.visible) {
                            this.initFieldValidity(field, fieldState);
                            this.setFieldState(field, fieldState);
                        }
                    }
                });
            });
        }
    }
    initReadonlyAndVisible(field, fieldState) {
        fieldState.readonly = isReadonly(field, this.currentData, this.suffix, this.session);
        if (field.secondary) {
            fieldState.visible = this.getSecondaryFieldState(field).visible === true && isVisible(field, fieldState.readonly, this.currentData, this.suffix, this.session);
        }
        else {
            fieldState.visible = isVisible(field, fieldState.readonly, this.currentData, this.suffix, this.session);
        }
        fieldState.hasValue = hasValue(field, this.currentData, this.suffix);
    }
    initFieldValidity(field, fieldState) {
        if (!this.fieldHasValue(field) && (isRequired(field, this.currentData, fieldState.visible, this.suffix, this.session))) {
            fieldState.validity = false;
        }
        else { //if (isNullOrUndefined(fieldState.validity)) {
            fieldState.validity = true;
        }
    }
    getSlideValidity(i, isValid) {
        if (this.slidesState[i].hasValue) {
            return isValid;
        }
        else {
            return (isValid ? true : null); // validity is set to true or null (not false)
        }
    }
    getFieldState(field) {
        return this.fieldsState[field.name] || {};
    }
    getSecondaryFieldState(field) {
        return this.secondaryFieldsState[field.name] || {};
    }
    getSlideState(slideIndex) {
        return this.slidesState[slideIndex] || {};
    }
    getElementFromCurrentSlide(selector) {
        let parentIonScroll = findParent(this.host, 'yoo-ion-scroll');
        if (parentIonScroll && !isWeb()) {
            return parentIonScroll;
        }
        else {
            let currentSlide = querySelectorAllDeep(this.host, 'yoo-ion-slide')[this.activeIndex];
            return currentSlide ? querySelectorDeep(currentSlide, selector) : null;
        }
    }
    isCurrentSlide(slideIndex) {
        return slideIndex === this.activeIndex;
    }
    updateSteps() {
        this.steps = this.slides.map((slide, index) => {
            let step = {
                title: slide.title,
                valid: this.slidesState && this.slidesState[index] && this.slidesState[index].validity ? true : this.failedSubmission.length > 0 ? false : null,
                validityPercentage: this.slidesState && this.slidesState[index] && this.slidesState[index].validityPercentage
            };
            return step;
        });
    }
    setSlideIsTabbarHidden() {
        let formElement = this.getElementFromCurrentSlide('.form-wrapper');
        let footer = this.getElementFromCurrentSlide('yoo-form-footer');
        if (footer && footer.style.transform === 'translateY(100px)' && formElement) {
            this.isTabbarHidden = true;
            formElement.classList.remove('bottom-bar');
        }
        else if (footer && footer.style.transform === 'translateY(0px)' && formElement) {
            this.isTabbarHidden = false;
            formElement.classList.add('bottom-bar');
        }
    }
    setFieldState(field, state) {
        this.fieldsState[field.name] = state;
    }
    setSecondaryFieldState(field, state) {
        this.secondaryFieldsState[field.name] = state;
    }
    setSlidesHeight() {
        if (this.slides && this.ionSlides) {
            let height;
            if (this.slides.length > 1) {
                if (this.host.classList && this.host.classList.contains('lesson-form')) {
                    height = Math.max(this.progressIndicator ? getElementDimensions(this.progressIndicator).height : 0, 50);
                }
                else {
                    height = Math.max(this.progressIndicator ? getElementDimensions(this.progressIndicator).height : 0, 90);
                }
            }
            else {
                height = 0;
            }
            this.ionSlides.setAttribute('style', `height: calc(100% - ${height}px);`);
        }
    }
    onToggleSecondaryField(field) {
        let state = this.getSecondaryFieldState(field);
        state.visible = state.visible === true ? false : true;
        this.setSecondaryFieldState(field, state);
        this.secondaryFieldsState = Object.assign({}, this.secondaryFieldsState);
    }
    onFieldChanged(ev, field) {
        ev.stopPropagation();
        setFieldData(field, ev.detail, this.currentData, this.suffix);
        if (isFunction(field.onChange)) {
            field.onChange(ev.detail, this.currentData, field);
        }
        if (field.allowTime) {
            setFieldData(field, new Date(), this.currentData, '.time');
        }
        setTimeout(() => {
            this.updateState();
            if (this.skipValidation || this.validity) {
                this.dataChanged.emit(this.currentData);
            }
            this.setDirty(true);
            if (this.failedSubmission.length > 0) {
                this.highlightInvalidFields();
            }
        }, 300);
    }
    onFieldClear(field, updateState = true) {
        setFieldData(field, null, this.currentData, this.suffix);
        if (updateState) {
            this.updateState();
        }
        if (this.skipValidation || this.validity) {
            this.dataChanged.emit(this.currentData);
        }
        this.setDirty(true);
    }
    setDirty(state) {
        this.dirty = state;
    }
    onFieldCommented(ev, field) {
        ev.stopPropagation();
        setFieldData(field, ev.detail, this.currentData, '.comments');
        let el = this.getFieldByCode(field.name);
        if (el) {
            let container = findParent(el, 'yoo-form-input-container');
            container.comments = ev.detail;
        }
        this.dataChanged.emit(this.currentData);
    }
    onFieldEditTask(ev, field) {
        ev.stopPropagation();
        setFieldData(field, ev.detail, this.currentData, '.tasks');
        this.dataChanged.emit(this.currentData);
    }
    onFieldValidityChanged(ev, field, slideIndex) {
        ev.stopPropagation();
        this.fieldsState = this.fieldsState || {};
        this.fieldsState[field.name] = this.fieldsState[field.name] || {};
        if (this.fieldsState[field.name].validity !== ev.detail) {
            this.fieldsState[field.name].validity = ev.detail;
            this.fieldsState = Object.assign({}, this.fieldsState);
            clearTimeout(this.updater);
            this.updater = setTimeout(() => this.updateState(), 300);
        }
        this.setFormInputContainerInvalid(!ev.detail, [field.name]);
    }
    onFieldFocused(name, element, type) {
        this.isFieldInSlot = false;
        // The next three lines is a temporary fix for an Ion Header bug
        if (isCordova()) {
            let content = findParent(this.host, 'yoo-ion-content');
            if (content && content.parentElement) {
                let header = querySelectorDeep(content.parentElement, 'yoo-ion-header');
                if (header && isIOS()) {
                    // Account for iOS StatusBar
                    header.classList.add('device-min-height');
                }
            }
        }
        this.focusedField = null;
        if (element) {
            this.focusedField = element;
        }
        else if (name) {
            let currentSlide = querySelectorAllDeep(this.host, 'yoo-ion-slide')[this.activeIndex];
            this.focusedField = this.getFieldByCode(name, currentSlide);
        }
        if (type === FormFieldType.autocomplete && isWeb() && this.isInlineForm()) {
            const WEB_AUTOCOMPLETE_HEIGHT = 260;
            this.setScrollSpacerHeight(WEB_AUTOCOMPLETE_HEIGHT);
        }
        setTimeout(() => {
            this.isFieldInSlot = true;
        }, 500);
    }
    onFieldExtraDataChanged(ev, field) {
        ev.stopPropagation();
        let data = ev.detail;
        if (!field) {
            return;
        }
        let fieldName = field.name;
        if (fieldName && fieldName.lastIndexOf('.') > 0) {
            fieldName = fieldName.substr(0, fieldName.lastIndexOf('.'));
        }
        if (field.extraDataFieldName) {
            fieldName = field.extraDataFieldName;
        }
        // image recognition results
        if ((field.type === FormFieldType.photo || field.type === FormFieldType.multiphotos) && field.isImageRecognition && (isObject(data) && data.key) || isArray(data)) { //&& isPresent(data.value)
            let dataArray = [].concat(data);
            dataArray.forEach(d => {
                let key = d.key;
                let value = d.value;
                let activeSlide;
                if (this.slides) {
                    this.slides.forEach(s => {
                        let found = false;
                        if (s.items) {
                            s.items.forEach(f => {
                                if (f.name === field.name) {
                                    found = true;
                                }
                            });
                        }
                        if (found) {
                            activeSlide = s;
                        }
                    });
                    if (activeSlide) {
                        let fieldIndex = activeSlide.items.indexOf(field);
                        for (let i = fieldIndex + 1; i < activeSlide.items.length; i++) {
                            if (activeSlide.items[i].title.toLowerCase() === key.toLowerCase()) {
                                let foundField = cloneDeep(activeSlide.items[i]);
                                let isVisibleProp = true;
                                if (foundField.condition) {
                                    //we have to pass the whole data because maybe some conditions are on other fields
                                    //we also have to disable the hide from mobile here
                                    foundField.hideMobile = false;
                                    foundField.readonly = false;
                                    isVisibleProp = isVisible(foundField, false, Object.assign({ [foundField.name]: { value } }, this.currentData), this.suffix);
                                }
                                if (isVisibleProp || !foundField.dontSaveIfHidden) {
                                    this.currentData[foundField.name] = { value };
                                }
                                break;
                            }
                        }
                    }
                }
            });
            this.extraDataChanged.emit(this.currentData);
        }
        else if (field.type === FormFieldType.multiphotos) {
            this.currentData[fieldName] = this.currentData[fieldName] || {};
            this.currentData[fieldName].extraData = data;
            this.extraDataChanged.emit(this.currentData);
        }
        else {
            if (this.currentData[fieldName]) {
                this.currentData[fieldName] = assign(this.currentData[fieldName], data);
            }
            else if (!result(this.currentData, fieldName) && (this.suffix || field.extraDataFieldName)) { // if not suffix (simple form), and no value then let s not overwrite the edit
                this.currentData[fieldName] = {};
                this.currentData[fieldName] = assign(this.currentData[fieldName], data);
            }
            this.extraDataChanged.emit(this.currentData);
        }
        this.updateState();
    }
    /** Get extra data for a field */
    getExtraData(field, data, isHistory = false) {
        let retVal = null;
        if (field.type === FormFieldType.photo) {
            retVal = this.currentData[field.name] ? {
                edit: this.currentData[field.name].edit,
                texts: this.currentData[field.name].texts,
                tags: this.currentData[field.name].tags,
                _geoloc: this.currentData[field.name]._geoloc,
                svgData: this.currentData[field.name].svgData,
                imageRecognitionResults: this.currentData[field.name].imageRecognitionResults
            } : null;
            if (isHistory && data[field.name]) {
                retVal = { edit: data[field.name].edit, texts: data[field.name].texts, tags: data[field.name].tags, _geoloc: data[field.name]._geoloc, svgData: data[field.name].svgData };
            }
        }
        if (field.type === FormFieldType.video) {
            retVal = this.currentData[field.name] ? { _geoloc: this.currentData[field.name]._geoloc } : null;
        }
        if (field.type === FormFieldType.multiphotos) {
            retVal = this.currentData[field.name] && this.currentData[field.name].extraData ? this.currentData[field.name].extraData : {};
        }
        if (this.geoloc && this.geoloc.length === 2 && retVal) {
            if (field.type !== FormFieldType.multiphotos) {
                if (retVal._geoloc && retVal._geoloc.length === 2) {
                    retVal.distance = getDistance(retVal._geoloc[1], retVal._geoloc[0], this.geoloc[1], this.geoloc[0]);
                }
            }
            else {
                if (retVal._geoloc && retVal._geoloc.length > 0) {
                    retVal.distance = [];
                    retVal._geoloc.forEach(geoloc => {
                        if (geoloc && geoloc.length === 2) {
                            retVal.distance.push(getDistance(geoloc[1], geoloc[0], this.geoloc[1], this.geoloc[0]));
                        }
                        else {
                            retVal.distance.push(null);
                        }
                    });
                }
            }
        }
        return retVal;
    }
    onSave(ev) {
        ev.stopPropagation();
        this.save.emit(this.currentData);
    }
    focusInvalidField(ev, displayToast) {
        const invalidFieldCodes = Object.keys(this.fieldsState)
            .filter((code) => this.fieldsState[code].validity === false);
        const invalidFieldsCount = invalidFieldCodes.length;
        let firstInvalidField = invalidFieldCodes
            .map((code) => this.getFieldByCode(code))
            .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
            .shift();
        if (invalidFieldsCount && displayToast) {
            showToast({
                message: translate(invalidFieldsCount > 1 ? 'INVALIDFIELDS' : 'INVALIDFIELD', { n: invalidFieldsCount }),
                duration: 2000,
                icon: 'yo-rejected2',
                cssClass: 'danger header'
            });
            this.failedSubmission = invalidFieldCodes;
        }
        if (firstInvalidField) {
            this.scrollToField(firstInvalidField, true);
            this.highlightInvalidFields();
        }
    }
    onIonSlideDidChange(ev) {
        ev.stopPropagation();
        this.ionSlides.getActiveIndex().then(index => {
            this.activeIndex = index;
            this.blurInput();
            this.lockSlideSwipe(index);
            this.slideChanged.emit({ index: index, isValid: this.getSlideState(index).hasValue, transition: this.slideTransition, isSummaryPage: (this.showRecap !== false && index === 0) });
            this.session.selectedMissionPage = index;
        });
        const FORM_COMPONENT_RENDER_TIME = 500;
        setTimeout(() => {
            this.setSlideIsTabbarHidden();
            if (this.failedSubmission.length > 0) {
                this.focusInvalidField(null, false);
            }
        }, FORM_COMPONENT_RENDER_TIME);
    }
    onIonSlideTouchEnd(ev) {
        ev.stopPropagation();
        this.slideTransition = 'swipe';
    }
    blurInput() {
        let activeElement = getActiveElementShadow();
        if ((activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') && !isWeb()) {
            activeElement.blur();
        }
    }
    isFirstSlide() {
        return this.activeIndex === 0;
    }
    lockSlideSwipe(index) {
        index = this.showRecap ? index - 1 : index;
        let lockSwipeToNext = index + 1 === this.slides.length ? false : this.getSlideState(index + 1).locked;
        let lockSwpieToPrev = index - 1 < 0 ? false : this.getSlideState(index - 1).locked;
        if (this.ionSlides) {
            this.ionSlides.lockSwipeToNext(lockSwipeToNext);
            this.ionSlides.lockSwipeToPrev(lockSwpieToPrev);
        }
    }
    slideHasAdvanced(slide) {
        return slide.items.some((field) => {
            return field.advanced && this.getFieldState(field).visible !== false;
        });
    }
    slideHasSecondary(slide) {
        return !this.forceReadonly && slide.items.some((field) => {
            return field.secondary;
        });
    }
    slideHasButton(slide) {
        return !this.forceReadonly && slide.items.some((field) => {
            return field.type === FormFieldType.button;
        });
    }
    slideHasToolbar(slide) {
        return this.slideHasAdvanced(slide) || this.slideHasSecondary(slide) || this.slideHasButton(slide);
    }
    onToggleSlideZoom(slideIndex) {
        let state = this.getSlideState(slideIndex);
        state.zoomed = state.zoomed ? false : true;
        this.slidesState = [...this.slidesState];
        let content = findParent(this.host, 'yoo-ion-content');
        if (content && state.zoomed) {
            // if (isCordova()) {
            //     StatusBar.hide();
            // }
            content.classList.add('absolute');
            this.host.classList.add('zoomed');
            lockSwipes(this.ionSlides, true);
        }
        else if (content && !state.zoomed) {
            // if (isCordova()) {
            //     StatusBar.show();
            // }
            content.classList.remove('absolute');
            this.host.classList.remove('zoomed');
            lockSwipes(this.ionSlides, false);
        }
    }
    onShowAdvancedFields(slide) {
        let fields = slide.items.filter(field => field.advanced && this.getFieldState(field).visible !== false);
        if (fields.length > 0) {
            fields = fields.map(field => {
                let retVal = Object.assign({}, field);
                retVal.advanced = false;
                return retVal;
            });
            let slides = [{ items: fields, title: translate('ADVANCED') }];
            let form = document.createElement('yoo-form-dynamic-dialog');
            form.slides = slides;
            form.showTabs = false;
            form.showRecap = false;
            form.forceReadonly = this.forceReadonly;
            form.data = cloneDeep(this.currentData);
            form.onFieldFetchData = (ev) => {
                this.fieldFetchData.emit(ev);
            };
            showModal(form).then(ret => {
                if (ret && ret.data) {
                    this.currentData = ret.data;
                    if (this.skipValidation || this.validity) {
                        this.dataChanged.emit(this.currentData);
                    }
                }
                form = null;
            });
        }
    }
    fieldHasValue(field) {
        return hasValue(field, this.currentData, this.suffix);
    }
    updateState() {
        let takenPhotos = 0;
        let totalPhotos = 0;
        let total = 0;
        let filed = 0;
        updateFormulas(this.slides, this.currentData, this.suffix);
        (this.slides || []).forEach((slide, i) => {
            let isValid = true;
            let totalRequiredFields = 0;
            let validFields = 0;
            if (slide.items.length === 0) {
                this.slidesState[i] = this.slidesState[i] || {};
                this.slidesState[i].hasValue = false;
                this.slidesState[i].validity = isValid;
            }
            (slide.items || []).forEach(field => {
                if (!field.advanced) {
                    if (field.readonly || isFieldWithNoValue(field)) {
                    }
                    else {
                        total += 1;
                        if (field.type === FormFieldType.photo) {
                            totalPhotos += 1;
                            if (this.fieldHasValue(field)) {
                                takenPhotos += 1;
                                filed += 1;
                            }
                        }
                        else if (this.fieldHasValue(field)) {
                            filed += 1;
                        }
                    }
                    let fieldState = this.getFieldState(field);
                    let wasHidden = !fieldState.visible;
                    this.initReadonlyAndVisible(field, fieldState);
                    let required = isRequired(field, this.currentData, fieldState.visible, this.suffix, this.session);
                    if (wasHidden && fieldState.visible) {
                        this.initFieldValidity(field, fieldState);
                    }
                    if (required === false) {
                        fieldState.validity = fieldState.validity === false && !field.required ? false : true;
                    }
                    else if (required === true && !fieldState.hasValue && field.type !== FormFieldType.checklist) {
                        fieldState.validity = false;
                    }
                    this.setFieldState(field, fieldState);
                    if (fieldState.hasValue && !isFieldWithNoValue(field) && !fieldState.visible && field.condition && !isEmpty(field.condition) && field.deleteOnHidden !== false && (!field.readonly || field.dontSaveIfHidden)) {
                        this.onFieldClear(field, false);
                    }
                    if (required && fieldState.visible) {
                        totalRequiredFields = totalRequiredFields + 1;
                    }
                    if (fieldState.validity && required && fieldState.visible) {
                        validFields = validFields + 1;
                    }
                    let validityPercentage = totalRequiredFields === 0 ? 100 : (validFields / totalRequiredFields) * 100;
                    isValid = isValid && (required && fieldState.visible ? fieldState.validity === true : fieldState.validity !== false);
                    this.slidesState[i] = this.slidesState[i] || {};
                    this.slidesState[i].hasValue = (this.slidesState[i].hasValue || (!isFieldWithNoValue(field) && this.fieldHasValue(field)));
                    this.slidesState[i].validity = this.getSlideValidity(i, isValid);
                    this.slidesState[i].validityPercentage = validityPercentage;
                }
            });
            this.slidesState[i].locked = this.isSlideLocked(slide);
        });
        this.progress = { value: (filed / total * 100), takenPhotos, totalPhotos };
        this.slidesState = [...this.slidesState];
        this.fieldsState = Object.assign({}, this.fieldsState);
        let newValidity = this.slidesState.every(state => state.validity || state.locked);
        if (newValidity !== this.validity) {
            this.validity = newValidity;
            this.formValidityChanged.emit(this.validity);
        }
        this.lockSlideSwipe(this.activeIndex);
    }
    getInputType(field) {
        switch (field.type) {
            case FormFieldType.text:
            case FormFieldType.number:
            case FormFieldType.tel:
            case FormFieldType.password:
            case FormFieldType.email:
                return field.type;
        }
        return FormFieldType.text;
    }
    onKeyboardDidShow(ev) {
        if (this.focusedField && ev) {
            this.scrollToField(this.focusedField, null, ev.keyboardHeight);
        }
        if (isAndroid()) {
            const ANDROID_WINDOW_RESIZE = 1000;
            setTimeout(() => {
                this.windowHasFinishedResizing = true;
            }, ANDROID_WINDOW_RESIZE);
        }
    }
    onKeyboardWillHide() {
        let scrollSpacer = this.getElementFromCurrentSlide('.scroll-spacer');
        if (scrollSpacer) {
            scrollSpacer.classList.add('bottom-bar');
        }
        if (!isAndroid() && !this.isInlineForm()) {
            this.setScrollSpacerHeight(100);
        }
        this.isKeyboardPresent = false;
    }
    onHideTabbar(ev) {
        let footer = this.getElementFromCurrentSlide('yoo-form-footer');
        let scrollSpacer = this.getElementFromCurrentSlide('.scroll-spacer');
        if (footer) {
            this.isTabbarHidden = hideShowTabbar(ev, footer, this.isTabbarHidden);
            if (this.isTabbarHidden && scrollSpacer) {
                scrollSpacer.classList.remove('bottom-bar');
            }
            else if (scrollSpacer) {
                scrollSpacer.classList.add('bottom-bar');
            }
        }
    }
    scrollToField(field, focus = false, keyboardHeight = null) {
        if (!field) {
            return;
        }
        const FIELD_LABEL_HEIGHT = 65;
        let elementPosition = field.getBoundingClientRect().top;
        let formElement = this.getElementFromCurrentSlide('form');
        if (formElement) {
            let topFormPosition = formElement.getBoundingClientRect().top;
            let scrollDistance = elementPosition - topFormPosition - FIELD_LABEL_HEIGHT;
            let doNotScroll = this.currentScrollPosition === 0 && scrollDistance < 0 && !this.host.classList.contains('inline');
            if (keyboardHeight) {
                //Checks if the field will be hidden by the keyboard
                //does not scroll if the field will still be visibil
                doNotScroll = formElement.getBoundingClientRect().bottom - keyboardHeight > field.getBoundingClientRect().bottom && (elementPosition > topFormPosition);
            }
            if (!doNotScroll) {
                this.blurOnScroll = false;
                this.scrollToPoint(scrollDistance, 0).then(() => {
                    if (focus) {
                        if (field['setFocus'] && typeof field['setFocus'] === 'function') {
                            field['setFocus']();
                        }
                    }
                });
            }
        }
    }
    setFormInputContainerInvalid(invalid, elementCodes) {
        if (this.failedSubmission && this.failedSubmission.length > 0) {
            let startingInvalidFormInputContainers = elementCodes.map((fieldCode) => {
                let element = this.getFieldByCode(fieldCode);
                if (element) {
                    return element.parentElement;
                }
            });
            startingInvalidFormInputContainers.forEach((formInputContainer) => {
                if (formInputContainer) {
                    formInputContainer.invalid = invalid;
                }
            });
        }
    }
    onFetchData(field, ev) {
        ev.stopPropagation();
        this.fieldFetchData.emit({ field, search: ev.detail });
    }
    onFetchCustomData(field, ev) {
        if (ev) {
            ev.stopPropagation();
        }
        this.fieldFetchCustomData.emit({ field, filters: ev ? ev.detail : null });
    }
    onImageRecognition(field, ev) {
        ev.stopPropagation();
        this.formImageRecognition.emit({ field, value: ev.detail });
    }
    onFieldGetGeoloc(field, ev) {
        ev.stopPropagation();
        this.formGetGeoloc.emit({ field, index: ev.detail });
    }
    onFieldGetMediaUrl(field, ev) {
        ev.stopPropagation();
        this.formGetMediaUrl.emit({ field, file: ev.detail });
    }
    onFieldGalleryOpened(field, ev) {
        ev.stopPropagation();
        let multiIndex = ev.detail;
        field = Object.assign({}, field, { multiIndex });
        this.galleryOpened.emit(field);
    }
    onFieldActionSheetOpened(field, ev) {
        ev.stopPropagation();
        let multiIndex = ev.detail;
        field = Object.assign({}, field, { multiIndex });
        this.actionSheetOpened.emit(field);
    }
    isSlideLocked(slide) {
        if (slide && slide.condition) {
            if (isArray(slide.condition) && slide.condition.length === 0) {
                return false;
            }
            let visible = isVisible(slide, false, this.currentData, this.suffix, this.session);
            return !visible;
        }
        else {
            return false;
        }
    }
    onTitleLinesChanged() {
        this.host.setAttribute('style', 'display: flex; flex-direction: column;');
    }
    renderHeader() {
        if (this.slides.length > 1) {
            return h("div", { class: {
                    'progress-container': true,
                    'border-bottom': getAppContext()['operations']
                } }, this.renderProgressContainer());
        }
    }
    renderProgressContainer() {
        this.updateSteps();
        let newClass = {};
        newClass[this.gradientClass] = true;
        if (this.slides.length > 1) {
            if (this.formType === 'lesson') {
                return h("yoo-progress-bar-core", { shape: "line", currentStep: this.activeIndex + 1, maxStep: this.steps.length, progressUnitLabel: "step" });
            }
            if (this.activeIndex === 0 && this.showRecap) {
                return h("div", { class: "header-recap" },
                    h("div", { class: "summary-title" }, translate('SUMMARY')),
                    h("div", { class: "progressbar-wrapper" },
                        h("yoo-progress-bar-core", { shape: "line", progressValue: this.progress.value })));
            }
            newClass['more-stable'] = true;
            return this.getProgressIndicator(this.showRecap ? this.activeIndex - 1 : this.activeIndex, newClass);
        }
    }
    getProgressIndicator(activeIndex, classes = {}) {
        return h("yoo-form-progress-indicator", { class: classes, ref: el => this.progressIndicator = el, onTitleLinesChanged: () => this.onTitleLinesChanged(), steps: this.steps, currentStep: activeIndex, onStepSelected: ev => { this.goToSlide(ev.detail, true); this.slideTransition = 'progress-indicator'; }, lockIndex: this.lockIndex, displayMode: "icon" });
    }
    renderRecap() {
        return this.showRecap !== false ? [
            h("yoo-ion-scroll", { forceOverscroll: false },
                h("div", { class: "flex flex-column" }, this.slides.map((s, slideIndex) => h("yoo-form-recap-step", { class: isCordova() ? '' : ' swiper-no-swiping', onClick: () => { this.goToSlide(slideIndex, slideIndex < 2); this.slideTransition = 'recap'; }, stepNumber: slideIndex + 1, mainTitle: s.title, subTitle: s.description, locked: this.getSlideState(slideIndex).locked, step: this.steps[slideIndex] }))),
                h("yoo-mission-score", { class: "light", charts: this.charts }),
                h("div", { class: "scroll-spacer bottom-bar" })),
            (this.isWeb ? null : this.renderRecapFooter())
        ]
            : null;
    }
    renderZoomButton(slideIndex) {
        let zoomed = this.getSlideState(slideIndex).zoomed;
        return this.showTabs ?
            h("div", { class: {
                    'zoom-button-container': true,
                    'mobile-padding': this.getSlideState(slideIndex).zoomed && isCordova(),
                    'maximize': !zoomed,
                    'minimize': zoomed
                } },
                h("div", { class: "flex" }),
                h("div", { class: {
                        'zoom-button': true
                    }, onClick: () => this.onToggleSlideZoom(slideIndex) },
                    h("yoo-icon", { class: zoomed ? 'yo-minimize' : 'yo-maximize' })))
            : null;
    }
    renderBody() {
        if (this.slides && this.slides.length > 0) {
            return (this.isWeb ? this.renderWebBody() : this.renderMobileBody());
        }
        return null;
    }
    renderMobileBody() {
        if (this.scrollable === false && this.slides.length === 1) {
            return this.renderFormContentFields(this.slides[0], 0);
        }
        return (h("yoo-ion-slides", { ref: el => this.ionSlides = el, pager: false, navigation: false, options: this.slidesOptions, onIonSlideDidChange: (ev) => this.onIonSlideDidChange(ev), onIonSlideTouchEnd: (ev) => this.onIonSlideTouchEnd(ev) },
            this.showRecap !== false ? h("yoo-ion-slide", { class: "recap" },
                " ",
                this.renderRecap(),
                " ") : null,
            this.slides.map((slide, slideIndex) => h("yoo-ion-slide", { class: {
                    'flex-column': true,
                    'dynamic': this.showTabs,
                    'bg-light': !this.showTabs,
                    'zoomed': this.getSlideState(slideIndex).zoomed,
                    'readonly': this.forceReadonly
                } }, this.renderFormContent(slide, slideIndex)))));
    }
    renderWebBody() {
        return (h("div", { class: "web-container flex-row" },
            h("div", { class: "left-panel" },
                " ",
                this.renderRecap(),
                " "),
            this.slides.map((slide, slideIndex) => this.isCurrentSlide(slideIndex) ?
                h("div", { class: "right-panel" },
                    this.renderFormContent(slide, slideIndex),
                    this.renderRecapFooter()) :
                null)));
    }
    getFormClasses(slideIndex, slide) {
        return {
            'form-wrapper': true,
            ' zoomed': this.getSlideState(slideIndex).zoomed,
            ' bottom-bar': true,
            ' bottom-toolbar': this.slideHasToolbar(slide)
        };
    }
    shouldRenderSlideContent(slide, slideIndex) {
        let shouldRenderOptionalFieldWithConditions = false;
        slide.items.map(field => {
            let fieldState = this.getFieldState(field);
            if (!isRequired(field, this.currentData, fieldState.visible, this.suffix, this.session) && (field.min || field.max)) {
                shouldRenderOptionalFieldWithConditions = true;
            }
        });
        return (Math.abs(this.activeIndex - (slideIndex + (this.showRecap && !this.isWeb ? 1 : 0))) <= 1) || (slide && slide.items && slide.items.some(f => f.isImageRecognition)) || shouldRenderOptionalFieldWithConditions;
    }
    getFieldVisibility(field) {
        let isFieldVisible = false;
        let readonly = this.getFieldState(field).readonly || this.forceReadonly;
        let withValue = hasValue(field, this.currentData, this.suffix);
        if (this.getFieldState(field).visible !== false && !field.advanced && !field.secondary) {
            isFieldVisible = true;
        }
        else if (field.secondary && this.getSecondaryFieldState(field).visible) {
            isFieldVisible = true;
        }
        if (readonly && !withValue) {
            isFieldVisible = false;
        }
        if (field.hideInReadOnly && readonly) {
            isFieldVisible = false;
        }
        return isFieldVisible;
    }
    nextAvailablePage(slideIndex) {
        let nextAvailablePageIndex = slideIndex + 1;
        if (this.slidesState[nextAvailablePageIndex] && this.getSlideState(nextAvailablePageIndex).locked) {
            this.slidesState.forEach((state, index) => {
                if (index > nextAvailablePageIndex && !state.locked && nextAvailablePageIndex <= slideIndex + 1) {
                    return nextAvailablePageIndex = index;
                }
            });
        }
        return nextAvailablePageIndex;
    }
    /** used in Boost to determine if the current question is dirty or the document has been viewed */
    isActiveFieldDirty() {
        if (this.slides && this.slides.length > this.activeIndex) {
            let activeField = this.slides[this.activeIndex].items[0];
            if ([FormFieldType.information.toString(), FormFieldType.image.toString()].indexOf(activeField.type) >= 0) {
                return true;
            }
            return this.currentData[activeField.name] && this.currentData[activeField.name].value;
        }
        return false;
    }
    renderFormContent(slide, slideIndex) {
        let lastUnlockedSlideIndex = findLastIndex(this.slidesState, s => s.locked !== true);
        return [
            this.shouldRenderSlideContent(slide, slideIndex) ?
                h("div", { class: {
                        'flex': true,
                        'slide-container': this.showTabs,
                        'slide-container no-shadow': !this.showTabs,
                        'zoomed': this.getSlideState(slideIndex).zoomed
                    } },
                    h("form", { class: this.getFormClasses(slideIndex, slide), onSubmit: () => false },
                        h("yoo-ion-scroll", { forceOverscroll: false, scrollEvents: true, onIonScroll: (ev) => this.onIonScroll(ev), onHideTabbar: (ev) => this.onHideTabbar(ev), onIonScrollEnd: () => this.onIonScrollEnd() }, this.renderFormContentFields(slide, slideIndex))),
                    this.renderToolbar(slide)) : h("div", { class: {
                    'flex slide-container': true,
                    'no-shadow': !this.showTabs
                } }),
            this.getSlideState(slideIndex).zoomed || this.isKeyboardPresent ? null : (slideIndex === lastUnlockedSlideIndex ? this.renderLastButton(lastUnlockedSlideIndex) : this.renderNextButton(slideIndex))
        ];
    }
    getFieldFlex(field) {
        if (!field.flex) {
            return { flex: '100' };
        }
        else {
            return { flex: field.flex.toString() };
        }
    }
    renderFormContentFields(slide, slideIndex) {
        let isPreviousFieldReadonlyAndVisible;
        //speed improvement
        let slideItems = slide.items.filter(f => this.getFieldVisibility(f)).reverse();
        return h("div", { class: "inputs-container" },
            slideIndex === 0 ? h("slot", null) : null,
            slideIndex === 0 ? h("slot", { name: "start" }) : null,
            this.renderReadonlyDetail(),
            slide.items.filter(field => field.type !== FormFieldType.button).map((field, inputIndex) => {
                let readonly = this.getFieldState(field).readonly || this.forceReadonly;
                let withValue = hasValue(field, this.currentData, this.suffix);
                let comments = getFieldValue(field, this.currentData, '.comments');
                if (field.secondary && withValue) {
                    let secondaryState = this.getSecondaryFieldState(field);
                    secondaryState.visible = withValue;
                    this.setSecondaryFieldState(field, secondaryState);
                }
                let isFieldVisible = this.getFieldVisibility(field);
                let fieldState = this.getFieldState(field);
                let required = isRequired(field, this.currentData, fieldState.visible, this.suffix, this.session);
                let previousReadonly = !readonly && isPreviousFieldReadonlyAndVisible && isFieldVisible;
                if (isFieldVisible) {
                    isPreviousFieldReadonlyAndVisible = readonly;
                }
                return [
                    h("div", { class: {
                            'field-placeholder': true,
                            [field.type]: true,
                            'invisible': !isFieldVisible,
                            'readonly': readonly,
                            'previous-readonly': previousReadonly,
                            'information': field.type === FormFieldType.information,
                            'last': slideItems[0] && slideItems[0].name === field.name
                        }, style: { zIndex: (slide.items.length - inputIndex + 1).toString() } },
                        field && field.header && isFieldVisible && h("div", { class: "field-header", innerHTML: translateMulti(field.header) }),
                        isFieldVisible ?
                            [
                                h("yoo-form-input-container", { class: {
                                        'swiper-no-swiping': !isCordova(),
                                        'no-border': field.type === FormFieldType.information || (field.answer && this.forceReadonly),
                                        'no-padding': field.type === FormFieldType.swipecards,
                                        'form-readonly': this.forceReadonly,
                                        'lesson': this.formType === 'lesson'
                                    }, field: field, required: required, readonly: readonly, forceReadonly: this.forceReadonly, comments: comments, onCommented: ev => this.onFieldCommented(ev, field), hideOptional: this.hideOptional, style: this.getFieldFlex(field), onCommentFocused: ev => this.onFieldFocused(null, ev.detail) }, this.renderInput(field, this.currentData, slideIndex, inputIndex, readonly)),
                                (this.renderHistory(field, slideIndex, inputIndex)),
                                field.answer && this.forceReadonly ? this.renderFieldValidity(field, this.currentData) : null
                            ] : null)
                ];
            }),
            slideIndex === 0 ? this.renderExtraButtons() : null,
            slideIndex === 0 ? h("div", { class: "slot-container-after" },
                h("slot", { name: "end" })) : null,
            this.scrollable !== false ? h("div", { class: "scroll-spacer" }) : null,
            slideIndex === this.slides.length - 1 || this.getSlideState(slideIndex).validity ? h("div", { class: "footer-spacer" }) : null);
    }
    renderExtraButtons() {
        if (this.extraButtons && this.extraButtons.length > 0) {
            return this.extraButtons.filter(b => b.isVisible ? b.isVisible(this.currentData) : true).map(button => {
                return h("div", { class: "extra-button-container" },
                    h("yoo-button", { class: 'stable squared x-medium' + (!isCordova() ? ' swiper-no-swiping' : ''), onClick: ev => {
                            if (button.handler && (!button.isDisabled || button.isDisabled(this.currentData) === false)) {
                                button.handler(this.currentData);
                            }
                        }, text: button.text ? button.text(this.currentData) : null, icon: button.icon ? button.icon(this.currentData) : null, disabled: button.isDisabled ? button.isDisabled(this.currentData) : false }));
            });
        }
    }
    renderReadonlyDetail() {
        if (this.forceReadonly) {
            if (this.detailComponent) {
                let TagType = this.detailComponent;
                return h(TagType, { item: this.data });
            }
        }
    }
    renderToolbar(slide) {
        return this.slideHasToolbar(slide) ?
            h("div", { class: {
                    'toolbar': true,
                    'with-padding': isIphoneX()
                } },
                slide.items.map(field => {
                    if (field.secondary && !this.forceReadonly) {
                        let state = this.getSecondaryFieldState(field);
                        return h("yoo-icon", { class: (field.icon || '') + (state.visible ? ' success' : ''), onClick: (ev) => this.onToggleSecondaryField(field) });
                    }
                }),
                this.slideHasButton(slide) && h("span", { class: "flex" }),
                slide.items.map(field => {
                    if (field.type === FormFieldType.button && isFunction(field.handler)) {
                        return h("yoo-button", { onClick: (ev) => this.onFieldButtonClick(field), text: translate(field.title || field.name), class: 'x-x-medium ' + (field.color || '') });
                    }
                }),
                this.slideHasAdvanced(slide) ? h("yoo-icon", { class: "yo-settings", onClick: (ev) => this.onShowAdvancedFields(slide) }) : null) : null;
    }
    onFieldButtonClick(field) {
        Promise.resolve(field.handler(this.currentData, field, this.injector)).then(() => {
            this.currentData = Object.assign({}, this.currentData);
        });
    }
    renderLastButton(lastUnlockedSlideIndex) {
        let clickFn;
        let performHandlerWhenDisabled = true;
        let isDisabled;
        if (this.validity) {
            isDisabled = false;
            clickFn = (e) => this.onSave(e);
        }
        else {
            isDisabled = true;
            clickFn = (e) => this.focusInvalidField(e, true);
        }
        if (this.formType === 'lesson') {
            isDisabled = !this.getLessonPageValidity(lastUnlockedSlideIndex);
            performHandlerWhenDisabled = false;
        }
        if (!this.showSave) {
            return null;
        }
        let hasPreviousButton = this.formType === 'lesson' && !isQuiz(this.lessonType);
        let buttons = [];
        if (hasPreviousButton) {
            buttons.push({
                type: 'goback',
                text: translate('GOBACK'),
                cssClass: (!isCordova() ? ' swiper-no-swiping' : ''),
                handler: () => this.onSlidePrevious()
            });
        }
        else if (this.showPreview) {
            buttons.push({
                type: 'preview',
                text: translate('PREVIEW'),
                cssClass: 'light outline ' + (!isCordova() ? ' swiper-no-swiping' : ''),
                handler: () => this.onOpenPreview()
            });
        }
        buttons.push({
            text: translate(this.formType !== 'lesson' || isQuiz(this.lessonType) ? 'SUBMIT' : 'FINISH'),
            cssClass: (this.gradientClass + (!hasPreviousButton ? ' large ' : '') + (!isCordova() ? ' swiper-no-swiping' : '')),
            disabled: isDisabled,
            performHandlerWhenDisabled: performHandlerWhenDisabled,
            handler: (ev) => this.continueIfEnabled(() => clickFn(ev))
        });
        return (h("yoo-form-footer", { buttons: buttons, timerStart: this.timer }));
    }
    renderNextButton(slideIndex) {
        let buttons = [{
                type: 'next',
                text: translate('NEXT'),
                cssClass: ('large ' + this.gradientClass + (!isCordova() ? ' swiper-no-swiping ' : '')),
                handler: () => this.goToSlide(this.nextAvailablePage(slideIndex), true)
            }];
        if (this.formType === 'lesson') {
            // disable swipe right when next button is disabled
            this.checkLockSwipeNext();
            buttons = this.getLessonButtons(slideIndex);
            if (this.ionSlides) {
                lockSwipes(this.ionSlides, true);
            }
        }
        return (h("yoo-form-footer", { buttons: buttons, timerStart: this.timer }));
    }
    checkLockSwipeNext() {
        const lock = !this.isActiveFieldDirty();
        this.slidesOptions['allowSlideNext'] = !lock;
        if (this.ionSlides) {
            this.ionSlides.lockSwipeToNext(lock);
        }
    }
    renderRecapFooter() {
        let buttons = [];
        if (this.validity) {
            if (this.showPreview) {
                buttons.push({
                    type: 'preview',
                    text: translate('PREVIEW'),
                    cssClass: 'light outline ' + (!isCordova() ? ' swiper-no-swiping' : ''),
                    handler: () => this.onOpenPreview()
                });
            }
            buttons.push({
                text: translate('SUBMIT'),
                cssClass: this.gradientClass + ' large',
                handler: (ev) => this.onSave(ev)
            });
        }
        else {
            buttons.push({
                text: translate(`${this.isWeb ? 'NEXT' : 'START'}`),
                cssClass: (this.gradientClass + ' large'),
                handler: () => this.continueIfEnabled(() => this.onSlideNext())
            });
        }
        return (h("yoo-form-footer", { buttons: buttons, timerStart: this.timer }));
    }
    onOpenPreview() {
        this.openPreview.emit('');
    }
    getLessonPageValidity(index) {
        let validity = true;
        (this.slides[index].items || []).forEach(field => {
            if (field.type === 'videoplayer' || field.type === 'document' || field.type === 'information' || field.type === 'image') {
                validity = this.isActiveFieldDirty();
            }
            else {
                let fieldState = this.getFieldState(field);
                if (!fieldState.validity) {
                    validity = false;
                }
            }
        });
        return validity;
    }
    getLessonButtons(slideIndex) {
        let buttons = [];
        const hasPreviousButton = slideIndex !== 0 && slideIndex !== this.slides.length - 1 && isContentOnly(this.lessonType);
        const lastButtonTranslationKey = (isQuiz(this.lessonType) && this.showAnswers && !isTimedQuiz(this.lessonType)) ? 'CHECK' : 'NEXT';
        if (hasPreviousButton) {
            buttons.push({
                type: 'goback',
                text: translate('GOBACK'),
                cssClass: !isCordova() ? ' swiper-no-swiping ' : '',
                handler: () => this.onSlidePrevious()
            });
        }
        buttons.push({
            text: translate(lastButtonTranslationKey),
            cssClass: ((!hasPreviousButton ? 'large ' : '') + this.gradientClass + (!isCordova() ? ' swiper-no-swiping ' : '')),
            disabled: !this.getLessonPageValidity(slideIndex),
            handler: () => this.continueIfEnabled(() => this.onSlideNext())
        });
        return buttons;
    }
    renderInput(field, data, slideIndex, inputIndex, readonly, cssClass, isHistory) {
        let fieldState = this.getFieldState(field);
        let required = isRequired(field, this.currentData, fieldState.visible, this.suffix, this.session);
        let validators = required && field.type !== (FormFieldType.checklist || FormFieldType.range) ? [{ name: 'required' }] : [];
        let value = getFieldValue(field, data, this.suffix);
        let TagType = 'yoo-form-unknown';
        let attrs = {
            value: value,
            readonly: readonly,
            clearable: true,
            name: field.name,
            isHistory: isHistory,
            //allowOcr: field.allowOcr,
            extraClass: field.extraClass,
            autofocus: field.autofocus
        };
        if (!readonly) {
            attrs = Object.assign({}, attrs, { validators: validators, onInputChanged: (ev) => this.onFieldChanged(ev, field), onValidityChanged: (ev) => this.onFieldValidityChanged(ev, field, slideIndex), onInputFocused: (ev) => {
                    let host = ev && ev.detail && ev.detail.host ? ev.detail.host : null;
                    this.onFieldFocused(field.name, host, field.type);
                } });
            if (field.externalValidators) {
                attrs = Object.assign({}, attrs, { externalValidators: field.externalValidators });
                attrs.validators.push({ name: field.type, options: Object.assign({ externalValidation: true, externalValue: undefined }, field.externalValidators[0], { required: required }) });
            }
        }
        let extraAttrs = {};
        switch (field.type) {
            case FormFieldType.text:
            case FormFieldType.number:
            case FormFieldType.tel:
            case FormFieldType.password:
            case FormFieldType.email:
                TagType = 'yoo-form-input';
                extraAttrs = {
                    min: field.min,
                    max: field.max,
                    type: this.getInputType(field),
                    step: field.step,
                    required: required,
                    iconPrefix: field.icon,
                    debounce: 500
                };
                if (attrs.validators) {
                    attrs.validators.push({ name: field.type, options: Object.assign({}, extraAttrs) });
                }
                break;
            case FormFieldType.date:
            case FormFieldType.datetime:
            case FormFieldType.time:
                TagType = 'yoo-form-date-time';
                extraAttrs = {
                    minDate: field.minDate,
                    maxDate: field.maxDate,
                    type: field.type,
                    allowOcr: field.allowOcr,
                    clearable: true
                };
                break;
            case FormFieldType.toggle:
                TagType = 'yoo-form-toggle';
                extraAttrs = {
                    type: 'line',
                    required: required
                };
                break;
            case FormFieldType.checkbox:
                TagType = 'yoo-form-checkbox';
                extraAttrs = {
                    type: 'line',
                    required: required
                };
                break;
            case FormFieldType.color:
                TagType = 'yoo-form-color-field';
                break;
            case FormFieldType.range:
                TagType = 'yoo-form-range';
                extraAttrs = {
                    min: field.min,
                    max: field.max,
                    type: this.getInputType(field),
                    double: false
                };
                break;
            case FormFieldType.autocomplete:
                TagType = 'yoo-form-autocomplete';
                if (field.conditionalValues) {
                    let values;
                    field.conditionalValues.forEach((c) => {
                        if (evalInContext(c.condition, this.currentData)) {
                            values = c.values;
                        }
                    });
                    field.values = values || field.defaultValues;
                }
                extraAttrs = {
                    multiple: field.multiple,
                    useTranslate: field.translate,
                    entityType: (field.collectionName || field.entityType),
                    values: field.values,
                    displayType: field.mode === 'tile' ? 'card-cell' : 'card-list',
                    allowCustomTag: field.allowCustomTag,
                    tag: field.tag,
                    idOnly: field.idOnly,
                    idAttributeName: field.idAttributeName,
                    placeholder: field.placeholder,
                    max: field.max,
                    tags: field.tags,
                    isLocal: field.isLocal,
                    customModel: field.customModel,
                    inline: this.isInlineForm(),
                    columnDefinition: field.columnDefinition,
                    onFetchData: (ev) => this.onFetchData(field, ev)
                };
                break;
            case FormFieldType.location:
                TagType = 'yoo-form-location';
                extraAttrs = {
                    multiple: field.multiple,
                    tags: field.tags,
                    onFetchData: (ev) => this.onFetchData(field, ev)
                };
                break;
            case FormFieldType.emailreport:
                TagType = 'yoo-form-emailreport';
                extraAttrs = {
                    stateful: field.stateful,
                    tags: field.tags,
                    fieldValues: field.values,
                    onFetchData: (ev) => this.onFetchData(field, ev)
                };
                break;
            case FormFieldType.catalog:
                TagType = 'yoo-form-catalog';
                extraAttrs = {
                    isPresence: field.presence,
                    isCheck: field.check,
                    isInventory: field.inventory,
                    catalog: field.catalog,
                    products: field.products,
                    tags: field.tags,
                    onFetchData: (ev) => this.onFetchData(field, ev)
                };
                break;
            case FormFieldType.productbatch:
                TagType = 'yoo-form-product-batch';
                break;
            case FormFieldType.address:
                TagType = 'yoo-form-autocomplete';
                extraAttrs = {
                    iconPrefix: 'yo-map',
                    multiple: false,
                    isLocal: false,
                    entityType: 'googlemaps',
                    displayType: 'card-list',
                    idOnly: field.idOnly,
                    idAttributeName: field.idAttributeName,
                    emptyState: 'map',
                    clearable: true,
                    columnDefinition: field.columnDefinition,
                    hideTags: true,
                    onFetchData: (ev) => this.onFetchData(field, ev)
                };
                break;
            case FormFieldType.textarea:
                if (field.language === 'html' && isWeb()) {
                    TagType = 'yoo-form-text-editor';
                }
                else {
                    TagType = 'yoo-form-text-area';
                }
                extraAttrs = {
                    maxRows: 5
                };
                break;
            case FormFieldType.json:
                TagType = 'yoo-form-json';
                break;
            // case FormFieldType.timer:
            //     TagType = 'yoo-form-timer';
            //     break;
            case FormFieldType.starrating:
                TagType = 'yoo-form-star-rating';
                extraAttrs = {
                    class: this.gradientClass,
                    type: field.useButtons ? 'button' : 'star',
                    max: field.max || 5
                };
                break;
            case FormFieldType.feedback:
                TagType = 'yoo-form-feedback';
                extraAttrs = {
                    class: this.gradientClass
                };
                break;
            case FormFieldType.signature:
                TagType = 'yoo-form-signature-pad';
                extraAttrs = {
                    required: required
                };
                break;
            case FormFieldType.ranking:
                TagType = 'yoo-form-ranking';
                extraAttrs = {
                    readonly: readonly,
                    values: field.values,
                    answers: field.answer
                };
                break;
            case FormFieldType.select:
            case FormFieldType.selectbuttons:
            case FormFieldType.selectbuttonsmulti:
            case FormFieldType.selectmulti:
            case FormFieldType.selectimage:
            case FormFieldType.selectchat:
            case FormFieldType.selectcard:
                let multiple = (field.type === FormFieldType.selectmulti || field.type === FormFieldType.selectbuttonsmulti || field.multiple);
                TagType = 'yoo-form-choice';
                extraAttrs = {
                    inputIndex: inputIndex,
                    slideIndex: slideIndex,
                    valuesColor: field.valuesColor,
                    values: readonly ? multiple ? [...value] : [value] : field.values,
                    images: field.images,
                    sentence: field.sentence,
                    description: field.description,
                    multiple: multiple,
                    allowOther: field.allowOther,
                    type: field.type === FormFieldType.selectbuttons || field.type === FormFieldType.selectbuttonsmulti ? 'button' :
                        (field.type === FormFieldType.selectcard ? 'card'
                            // : (field.type === FormFieldType.ranking ? 'ranking'
                            : (field.type === FormFieldType.selectchat ? 'chat'
                                : (field.type === FormFieldType.selectimage ? 'image' : 'radio'))),
                    required: field.required
                };
                break;
            case FormFieldType.photo:
            case FormFieldType.multiphotos:
                TagType = 'yoo-form-capture';
                extraAttrs = {
                    type: 'photo',
                    maxWidth: field.maxWidth,
                    saveGeoloc: field.saveGeoloc,
                    allowLibrary: field.allowLibrary,
                    allowAnnotate: field.allowAnnotate,
                    isImageRecognition: field.isImageRecognition,
                    algorithm: field.imageRecognitionAlgorithm,
                    algorithmDisplay: field.imageRecognitionDisplay,
                    isBackgroundProcess: field.isBackgroundProcess,
                    label: generateLabel(field),
                    multiple: field.type === FormFieldType.multiphotos,
                    min: field.minPhotos,
                    max: field.maxPhotos,
                    tags: field.values,
                    required: required,
                    duration: field.duration,
                    extraData: this.getExtraData(field, data, isHistory),
                    onExtraDataChanged: (ev) => this.onFieldExtraDataChanged(ev, field),
                    onImageRecognition: (ev) => this.onImageRecognition(field, ev),
                    onGetGeoloc: (ev) => this.onFieldGetGeoloc(field, ev),
                    useGallery: this.useGallery,
                    onGalleryOpened: (ev) => this.onFieldGalleryOpened(field, ev),
                    onActionSheetOpened: (ev) => this.onFieldActionSheetOpened(field, ev),
                    getMediaUrl: (ev) => this.onFieldGetMediaUrl(field, ev),
                    onFetchData: (ev) => this.onFetchData(field, ev)
                };
                if (attrs.validators && field.type === FormFieldType.multiphotos) {
                    attrs.validators.push({ name: field.type, options: Object.assign({}, extraAttrs) });
                }
                break;
            case FormFieldType.audio:
                TagType = 'yoo-form-capture';
                extraAttrs = {
                    type: 'audio',
                    duration: field.duration,
                    saveGeoloc: field.saveGeoloc,
                    label: generateLabel(field)
                };
                break;
            case FormFieldType.video:
                TagType = 'yoo-form-capture';
                extraAttrs = {
                    type: 'video',
                    duration: field.duration,
                    saveGeoloc: field.saveGeoloc,
                    allowLibrary: field.allowLibrary,
                    label: generateLabel(field),
                    onGetMediaurl: (ev) => this.onFieldGetMediaUrl(field, ev)
                };
                break;
            case FormFieldType.barcode:
                TagType = 'yoo-form-barcode';
                extraAttrs = {
                    required: required
                };
                break;
            case FormFieldType.document:
            case FormFieldType.image:
                TagType = 'yoo-form-document';
                let document = field.type === FormFieldType.document ? field.document : field.image;
                extraAttrs = {
                    type: field.type === FormFieldType.document ? 'document' : 'image',
                    document,
                    showDialog: document && document.preventDialog ? false : true,
                    useGallery: this.useGallery,
                    onGalleryOpened: (ev) => this.onFieldGalleryOpened(field, ev)
                };
                break;
            case FormFieldType.videoplayer:
                TagType = 'yoo-form-videoplayer';
                extraAttrs = {
                    type: field.mode,
                    source: field.url || field.value,
                    isVisible: slideIndex === this.activeIndex,
                    isInsideForm: true,
                    hideFullscreen: field.mode === 'url',
                    autoplay: false,
                    enableModalFullscreen: field.mode !== 'youtube' || isAndroid()
                };
                break;
            case FormFieldType.iframe:
                TagType = 'yoo-form-iframe';
                extraAttrs = {
                    source: field.url || field.value,
                    type: field.mode
                };
                break;
            case FormFieldType.formula:
                TagType = 'yoo-form-formula';
                break;
            case FormFieldType.checklist:
                TagType = 'yoo-form-checklist';
                extraAttrs = {
                    previousTasks: value ? value.previousTasks : [],
                    currentTasks: value ? value.currentTasks : [],
                    required: required
                };
                if (attrs.validators && field.type === FormFieldType.checklist) {
                    attrs.validators.push({ name: field.type, options: Object.assign({}, extraAttrs) });
                }
                break;
            case FormFieldType.todo:
                TagType = 'yoo-form-todo';
                extraAttrs = {
                    allPhotosRequired: field.allPhotosRequired,
                    allowLibrary: field.allowLibrary,
                    values: field.values,
                    linked: field.linked,
                    onFieldFetchData: (ev) => {
                        ev.stopPropagation();
                        this.fieldFetchData.emit(ev.detail);
                    },
                    onFetchCustomData: (ev) => this.onFetchCustomData(field, ev)
                };
                break;
            case FormFieldType.task:
                TagType = 'yoo-form-task';
                extraAttrs = {
                    linked: field.linked,
                    type: field.type,
                    hideTitle: true,
                    onFieldFetchData: (ev) => {
                        ev.stopPropagation();
                        this.fieldFetchData.emit(ev.detail);
                    },
                    onFetchCustomData: (ev) => this.onFetchCustomData(field, ev)
                };
                break;
            case FormFieldType.documentuploader:
                TagType = 'yoo-form-uploader';
                extraAttrs = {
                    multiple: field.multiple,
                    extensions: field.extensions
                };
                break;
            case FormFieldType.information:
                return field.value ? h("div", { class: "information", innerHTML: translateMulti(pipes.https.transform((field.value || '').replace(/&nbsp;/g, ''))) }) : null;
            case FormFieldType.numberpicker:
                TagType = 'yoo-form-number-picker';
                extraAttrs = {
                    min: field.min,
                    max: field.max
                };
                break;
            case FormFieldType.swipecards:
                TagType = 'yoo-form-swipe-cards';
                extraAttrs = {
                    label: field.title,
                    description: field.description,
                    instructionsDocument: field.instructionsDocument,
                    categories: field.categories,
                    values: field.values,
                    images: field.images,
                    answer: field.answer,
                    mode: field.mode,
                    required: field.required
                };
                break;
            case FormFieldType.missingword:
                TagType = 'yoo-form-missing-word';
                extraAttrs = {
                    sentence: field.sentence,
                    values: field.values,
                    answer: field.answer,
                    slideIndex: slideIndex
                };
                break;
            case FormFieldType.imagetagging:
                TagType = 'yoo-form-image-tagging';
                extraAttrs = {
                    values: field.values,
                    answer: field.answer,
                    imageData: field.image,
                    annotations: field.annotations,
                    slideIndex: slideIndex,
                    required: field.required
                };
                break;
            case FormFieldType.categorizewords:
                TagType = 'yoo-form-categorize-words';
                extraAttrs = {
                    categories: field.categories,
                    values: field.values,
                    answer: field.answer
                };
                break;
            case FormFieldType.connect:
                TagType = 'yoo-form-connect';
                extraAttrs = {
                    values: field.values,
                    answer: field.answer,
                    required: field.required
                };
                break;
            default:
                return h("div", { class: "font-small danger" },
                    " FormFieldType.",
                    field.type,
                    " is not supported");
        }
        if (field.placeholder && !extraAttrs.placeholder) {
            extraAttrs.placeholder = field.placeholder;
        }
        if (cssClass) {
            extraAttrs.class = extraAttrs.class || '';
            extraAttrs.class += ' ' + cssClass;
        }
        let taskFieldName;
        let taskField;
        let taskValue;
        if (field.allowTask && field.type !== FormFieldType.task) {
            taskFieldName = field.name + '_tasks';
            taskField = {
                type: FormFieldType.task,
                name: taskFieldName
            };
            taskValue = getFieldValue(field, this.currentData, '.tasks');
        }
        return [
            h(TagType, Object.assign({}, attrs, extraAttrs, { "attr-name": this.encodeFieldName(field.name) }), " "),
            taskField && !isHistory ? h("yoo-form-task", { type: field.type, value: taskValue, class: { 'tasks-container': true }, readonly: readonly, "attr-name": this.encodeFieldName(taskFieldName), onInputChanged: ev => this.onFieldEditTask(ev, field), onFieldFetchData: (ev) => {
                    ev.stopPropagation();
                    this.fieldFetchData.emit(ev.detail);
                }, onFetchCustomData: (ev) => this.onFetchCustomData(taskField, ev) }) : null
        ];
    }
    renderMissionStatus(historyData, type) {
        let HAS_STATUS = {};
        HAS_STATUS[FormFieldType.photo] = true;
        if (type && HAS_STATUS[type]) {
            let mission = historyData['mission'];
            let statusObj = getMissionStatusIconClass((mission));
            if (statusObj) {
                return h("div", { class: "square-icon" },
                    h("yoo-icon", { class: statusObj.class }),
                    h("span", { class: statusObj.style }, translate(statusObj.text)));
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    renderHistoryTopAction() {
        return h("div", { class: "history-top-action" },
            h("div", { class: "title" }, translate('HISTORY')));
    }
    renderHistoryHeader(avatarData, date) {
        return h("div", { class: "history-header" },
            h("div", { class: "avatar" },
                h("yoo-avatar", { class: "history", user: avatarData }, " ")),
            h("div", { class: "date" }, pipes.dateFormat.transform(date, 'L')));
    }
    renderHistory(field, slideIndex, inputIndex) {
        return this.history && this.history.length > 0 && !isFieldWithNoValue(field) && field.allowHistory && this.history.some(data => hasValue(field, data, this.suffix)) ?
            h("div", { class: "history swiper-no-swiping" },
                this.renderHistoryTopAction(),
                h("yoo-ion-scroll", { class: "relative", horizontalMode: true, showScrollbar: isWeb() }, this.history.map((data) => {
                    let newClass = {};
                    newClass[field.type] = true;
                    return hasValue(field, data, this.suffix) ?
                        h("div", { class: Object.assign({ 'square': true }, newClass) },
                            this.renderHistoryHeader(data.user, data.date),
                            h("div", { class: "square-content" },
                                h("div", { class: "overlay", onClick: ev => data ? this.showHistory.emit(data.missionRef) : null }),
                                this.renderInput(field, data, slideIndex, inputIndex, true, 'history', true))) : null;
                })))
            : null;
    }
    renderFieldValidity(field, data) {
        let value = getFieldValue(field, data, this.suffix);
        return h("yoo-field-validity", { class: 'border', isValid: answerIsValid(value, field.answer, field), explanation: field.explanation, explanationDocument: field.explanationDocument });
    }
    hostData() {
        return {
            class: Object.assign({ 
                // 'web': this.isWeb,
                'mission-form': this.formType, 'lesson-form': this.formType === 'lesson' }, getAppContext(), { 'absolute': this.scrollable !== false })
        };
    }
    render() {
        let retVal = [
            this.renderHeader(),
            this.renderBody()
        ];
        return retVal;
    }
    static get is() { return "yoo-form-dynamic"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "activeIndex": {
            "state": true
        },
        "afterFetchCustomData": {
            "method": true
        },
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "charts": {
            "type": "Any",
            "attr": "charts"
        },
        "currentData": {
            "state": true
        },
        "data": {
            "type": "Any",
            "attr": "data",
            "watchCallbacks": ["updateData"]
        },
        "detailComponent": {
            "type": String,
            "attr": "detail-component"
        },
        "dirty": {
            "type": Boolean,
            "attr": "dirty",
            "mutable": true
        },
        "extraButtons": {
            "type": "Any",
            "attr": "extra-buttons"
        },
        "failedSubmission": {
            "state": true
        },
        "fieldsState": {
            "state": true
        },
        "findPreviousValue": {
            "method": true
        },
        "forceFieldUpdate": {
            "method": true
        },
        "forceReadonly": {
            "type": Boolean,
            "attr": "force-readonly"
        },
        "formType": {
            "type": String,
            "attr": "form-type"
        },
        "geoloc": {
            "type": "Any",
            "attr": "geoloc"
        },
        "goToRecap": {
            "method": true
        },
        "goToSlide": {
            "method": true
        },
        "gradientClass": {
            "type": String,
            "attr": "gradient-class"
        },
        "hasOneFieldPerPage": {
            "type": Boolean,
            "attr": "has-one-field-per-page"
        },
        "hideOptional": {
            "type": Boolean,
            "attr": "hide-optional"
        },
        "highlightInvalidFields": {
            "method": true
        },
        "history": {
            "type": "Any",
            "attr": "history"
        },
        "host": {
            "elementRef": true
        },
        "injector": {
            "type": "Any",
            "attr": "injector"
        },
        "isHistoryContentOverflowing": {
            "state": true
        },
        "isKeyboardPresent": {
            "state": true
        },
        "lessonType": {
            "type": String,
            "attr": "lesson-type"
        },
        "onSlideNext": {
            "method": true
        },
        "onSlidePrevious": {
            "method": true
        },
        "progress": {
            "type": "Any",
            "attr": "progress",
            "mutable": true
        },
        "remainingTime": {
            "state": true
        },
        "scrollable": {
            "type": Boolean,
            "attr": "scrollable"
        },
        "scrollToPoint": {
            "method": true
        },
        "secondaryFieldsState": {
            "state": true
        },
        "setScrollSpacerHeight": {
            "method": true
        },
        "showAnswers": {
            "type": Boolean,
            "attr": "show-answers"
        },
        "showHistoryModal": {
            "state": true
        },
        "showPreview": {
            "type": Boolean,
            "attr": "show-preview"
        },
        "showRecap": {
            "type": Boolean,
            "attr": "show-recap"
        },
        "showSave": {
            "type": Boolean,
            "attr": "show-save"
        },
        "showTabs": {
            "type": Boolean,
            "attr": "show-tabs"
        },
        "skipValidation": {
            "type": Boolean,
            "attr": "skip-validation"
        },
        "slides": {
            "type": "Any",
            "attr": "slides"
        },
        "slidesState": {
            "state": true
        },
        "suffix": {
            "type": String,
            "attr": "suffix"
        },
        "timer": {
            "type": Number,
            "attr": "timer"
        },
        "useGallery": {
            "type": Boolean,
            "attr": "use-gallery"
        },
        "validity": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "dataChanged",
            "method": "dataChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "formValidityChanged",
            "method": "formValidityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "save",
            "method": "save",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fieldFetchData",
            "method": "fieldFetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "formImageRecognition",
            "method": "formImageRecognition",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "extraDataChanged",
            "method": "extraDataChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "formGetGeoloc",
            "method": "formGetGeoloc",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "formGetMediaUrl",
            "method": "formGetMediaUrl",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fieldFetchCustomData",
            "method": "fieldFetchCustomData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "galleryOpened",
            "method": "galleryOpened",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionSheetOpened",
            "method": "actionSheetOpened",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "showHistory",
            "method": "showHistory",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "openPreview",
            "method": "openPreview",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "slideChanged",
            "method": "slideChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "timeOut",
            "method": "timeOut",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "slideAnswered",
            "method": "slideAnswered",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:ionModalWillPresent",
            "method": "onIonModalWillPresent"
        }, {
            "name": "inputFocused",
            "method": "onInputFocused"
        }]; }
    static get style() { return ":host(.absolute) {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute; }\n\n:host {\n  --history-default-width: 180px; }\n\n\@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n\@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n\@-webkit-keyframes slideInRight {\n  from {\n    max-height: 0;\n    margin-left: -100vw; }\n  to {\n    max-height: 500px;\n    margin-left: 0; } }\n\n\@keyframes slideInRight {\n  from {\n    max-height: 0;\n    margin-left: -100vw; }\n  to {\n    max-height: 500px;\n    margin-left: 0; } }\n\n\@-webkit-keyframes fadeOutUp {\n  from {\n    height: 50px;\n    opacity: 1; }\n  to {\n    height: 0;\n    opacity: 0; } }\n\n\@keyframes fadeOutUp {\n  from {\n    height: 50px;\n    opacity: 1; }\n  to {\n    height: 0;\n    opacity: 0; } }\n\n:host .progress-container {\n  height: 90px;\n  margin-bottom: .5rem;\n  background: var(--light, #FFFFFF); }\n  :host .progress-container.border-bottom {\n    margin-bottom: 0;\n    border-bottom: 1px solid var(--stable-30, #E6E6E6); }\n  :host .progress-container > * {\n    display: block;\n    -webkit-animation-name: fadeIn;\n    animation-name: fadeIn;\n    -webkit-animation-duration: 700ms;\n    animation-duration: 700ms; }\n\n:host .summary-title {\n  padding: .8rem 0 0 1rem;\n  color: var(--black, #000000);\n  font-size: 27px; }\n\n:host .flex {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1; }\n\n:host .flex-column {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host .flex-row {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host .flex-center-center {\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  max-width: 100%; }\n\n:host .flex-center-space-around {\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n  max-width: 100%; }\n\n:host > form > yoo-ion-slides {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute; }\n\n:host yoo-ion-slides {\n  height: 100%; }\n  :host yoo-ion-slides yoo-ion-slide.readonly .slide-container yoo-ion-scroll {\n    padding: 1rem; }\n  :host yoo-ion-slides yoo-ion-slide.dynamic .header {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    line-height: 18px; }\n\n:host yoo-mission-score {\n  display: block;\n  margin: 1rem; }\n\n:host .information {\n  color: var(--text-color, #807f83); }\n  :host .information.readonly ul {\n    margin-left: 1rem; }\n  :host .information * {\n    -webkit-margin-before: 0;\n    margin-block-start: 0;\n    -webkit-margin-after: 0;\n    margin-block-end: 0; }\n    :host .information *:not(br):not(iframe):empty {\n      display: none; }\n\n:host .extra-button-container {\n  margin: 1rem;\n  margin-bottom: 0; }\n\n:host .swiper-container {\n  max-width: 100%; }\n\n:host .slide-zoom {\n  max-width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n:host .slide-container {\n  position: relative;\n  width: 100%;\n  margin: 1rem;\n  margin-top: 0;\n  margin-bottom: 0;\n  -webkit-transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);\n  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);\n  text-align: left; }\n  :host .slide-container.no-shadow {\n    margin: 0; }\n    :host .slide-container.no-shadow yoo-ion-scroll {\n      margin-bottom: 0;\n      padding: 0;\n      padding-top: 0rem;\n      padding-bottom: 2rem;\n      border-radius: 0;\n      -webkit-box-shadow: none;\n      box-shadow: none; }\n      :host .slide-container.no-shadow yoo-ion-scroll .field-placeholder:not(.readonly):not(.invisible) {\n        margin: 0; }\n  :host .slide-container > yoo-ion-scroll {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    padding: 0 0.5rem;\n    background: transparent; }\n  :host .slide-container .map-container {\n    position: relative;\n    height: 200px;\n    margin-top: 0.5rem;\n    border-radius: var(--border-radius-input, 5px);\n    overflow: hidden; }\n  :host .slide-container .toolbar {\n    top: auto;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    position: absolute;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    padding: 10px 20px;\n    border-top: 1px solid var(--stable-30, #E6E6E6);\n    background: var(--light, #FFFFFF);\n    color: var(--stable, #adadad);\n    font-size: 1.5rem;\n    text-align: left;\n    z-index: 1; }\n    :host .slide-container .toolbar yoo-icon {\n      margin-right: 2rem; }\n    :host .slide-container .toolbar.with-padding {\n      padding-bottom: 2rem; }\n    :host .slide-container .toolbar yoo-button {\n      display: inline;\n      padding: 0.5rem; }\n  :host .slide-container .toolbar-spacer {\n    height: 50px; }\n\n:host .form-wrapper {\n  position: relative;\n  width: 100%;\n  background-color: var(--light, #FFFFFF); }\n  :host .form-wrapper.bottom-toolbar {\n    height: calc(100% - 47px); }\n    :host .form-wrapper.bottom-toolbar .scroll-spacer {\n      height: 100px; }\n\n:host .swiper-container {\n  height: 100%; }\n\n:host .swiper-pagination-bullet-active {\n  background-color: var(--success, #04CC99) !important; }\n\n:host .scroll-spacer {\n  height: 100px; }\n\n:host .header {\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  padding-right: 1rem;\n  padding-left: 1rem;\n  font-weight: 400; }\n  :host .header yoo-icon {\n    padding-top: 4px;\n    font-size: var(--font-s, 13px); }\n\n:host .header-recap .progressbar-wrapper {\n  padding: 0.5rem 1rem; }\n\n:host .field-header {\n  margin: 0.5rem;\n  margin-top: 1.5rem;\n  margin-bottom: 0;\n  margin-left: 0.8rem;\n  font-size: var(--font-s, 13px);\n  font-weight: 600;\n  text-transform: uppercase; }\n\n:host .zoom-button-container {\n  position: absolute;\n  right: var(--padding-10, 0.625rem);\n  bottom: var(--padding-10, 0.625rem);\n  -ms-flex-direction: row;\n  flex-direction: row;\n  z-index: 1000; }\n  :host .zoom-button-container.minimize {\n    right: var(--padding-20, 1.25rem);\n    bottom: var(--padding-20, 1.25rem); }\n  :host .zoom-button-container .zoom-button {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 1.875rem;\n    height: 1.875rem;\n    border-radius: 50%;\n    background: var(--black, #000000);\n    line-height: 1.5rem;\n    text-align: center;\n    opacity: 0.6; }\n    :host .zoom-button-container .zoom-button yoo-icon {\n      color: var(--light, #FFFFFF); }\n  :host .zoom-button-container.mobile-padding {\n    padding-top: 1.625rem; }\n\n:host .font-small {\n  font-size: var(--font-xs, 10px); }\n\n:host .field-placeholder {\n  display: block;\n  width: 100%;\n  -webkit-animation-name: slideInRight;\n  animation-name: slideInRight;\n  -webkit-animation-duration: 200ms;\n  animation-duration: 200ms;\n  -webkit-animation-timing-function: ease;\n  animation-timing-function: ease; }\n  :host .field-placeholder.invisible {\n    -webkit-animation-name: fadeOutUp;\n    animation-name: fadeOutUp;\n    -webkit-animation-duration: 100ms;\n    animation-duration: 100ms; }\n\n:host .field-placeholder:not(.readonly):not(.invisible) {\n  position: relative;\n  margin-top: 0;\n  padding-bottom: 0;\n  background: var(--form-dynamic-field-background, #FFFFFF);\n  z-index: 0; }\n  :host .field-placeholder:not(.readonly):not(.invisible) yoo-form-input-container {\n    padding: 0.625rem 0.9375rem 0.625rem 0.9375rem; }\n    :host .field-placeholder:not(.readonly):not(.invisible) yoo-form-input-container.no-padding {\n      padding: 0; }\n  :host .field-placeholder:not(.readonly):not(.invisible).toggle yoo-form-input-container, :host .field-placeholder:not(.readonly):not(.invisible).checkbox yoo-form-input-container {\n    padding-top: 0; }\n  :host .field-placeholder:not(.readonly):not(.invisible).no-margin {\n    margin-bottom: 0; }\n\n:host .history {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  margin-top: 0.5rem;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--stable-light, #f1f1f1); }\n  :host .history .description {\n    font-size: var(--font-s, 13px); }\n  :host .history .history-top-action {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    margin: 0px 15px 0 15px;\n    font-size: var(--font-m, 15px); }\n    :host .history .history-top-action .title {\n      width: 100%;\n      color: var(--white);\n      text-align: left; }\n    :host .history .history-top-action .action {\n      width: 100%;\n      color: var(--success, #04CC99);\n      text-align: right; }\n  :host .history .outer-container .product-container {\n    margin-bottom: 16px; }\n    :host .history .outer-container .product-container .date,\n    :host .history .outer-container .product-container .subheading {\n      color: var(--text-color, #807f83);\n      font-size: 14px; }\n  :host .history .outer-container .inner-container {\n    margin-bottom: 16px;\n    background-color: lightblue; }\n    :host .history .outer-container .inner-container .toolbar {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-align: center;\n      align-items: center;\n      margin-bottom: 0.5rem;\n      padding: 0.5rem;\n      padding-left: 100px;\n      border-bottom: 1px solid var(--stable-light, #f1f1f1); }\n      :host .history .outer-container .inner-container .toolbar .title {\n        padding-top: 6px;\n        color: var(--black, #000000);\n        font-size: var(--font-xs, 10px); }\n      :host .history .outer-container .inner-container .toolbar .quantity {\n        color: var(--black, #000000);\n        text-align: center; }\n      :host .history .outer-container .inner-container .toolbar .price {\n        -ms-flex: 1;\n        flex: 1;\n        color: var(--black, #000000);\n        font-size: var(--font-m, 15px);\n        text-align: right;\n        white-space: nowrap; }\n      :host .history .outer-container .inner-container .toolbar .icon {\n        padding: 0 1rem;\n        color: var(--text-color, #807f83); }\n        :host .history .outer-container .inner-container .toolbar .icon.left {\n          font-size: var(--font-m, 15px);\n          text-align: left; }\n        :host .history .outer-container .inner-container .toolbar .icon.right {\n          font-size: var(--font-m, 15px);\n          text-align: right; }\n  :host .history .square {\n    position: relative;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    width: var(--history-default-width);\n    margin: var(--padding-10, 0.625rem) 0px var(--padding-10, 0.625rem) var(--padding-10, 0.625rem);\n    padding: 10px 0 10px 0;\n    padding: var(--padding-10, 0.625rem);\n    border-radius: 8px;\n    background-color: var(--light-card-background, #FFFFFF);\n    color: var(--stable-20);\n    font-size: 14px;\n    text-align: left;\n    -webkit-box-shadow: var(--history-shadow, 0px 3px 10px 3px rgba(40, 47, 54, 0.07));\n    box-shadow: var(--history-shadow, 0px 3px 10px 3px rgba(40, 47, 54, 0.07));\n    overflow: hidden;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n    :host .history .square.single-item {\n      width: 80vw; }\n      :host .history .square.single-item .square-content {\n        max-height: 1000px;\n        overflow: hidden; }\n    :host .history .square.catalog {\n      width: 230px; }\n      :host .history .square.catalog .square-content {\n        max-height: 300px;\n        overflow: hidden; }\n    :host .history .square.audio {\n      width: 350px; }\n    :host .history .square.select .square-content {\n      max-height: 40px;\n      overflow: hidden; }\n    :host .history .square.selectbuttonsmulti .square-content {\n      max-height: 44px;\n      overflow: hidden; }\n    :host .history .square.address .square-content, :host .history .square.location .square-content {\n      max-height: 40px;\n      overflow: hidden; }\n    :host .history .square.textarea .square-content {\n      max-height: 44px;\n      overflow: hidden; }\n    :host .history .square .history-header {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      margin-bottom: var(--padding-5, 0.3125rem);\n      color: var(--black, #000000);\n      font-size: var(--font-xs, 10px);\n      line-height: 20px; }\n      :host .history .square .history-header .avatar {\n        display: -ms-flexbox;\n        display: flex;\n        padding-right: 5px; }\n        :host .history .square .history-header .avatar yoo-avatar {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-align: center;\n          align-items: center;\n          margin-top: 0;\n          padding-top: 0;\n          border-top: 0; }\n      :host .history .square .history-header .at {\n        color: var(--stable, #adadad); }\n    :host .history .square .square-title,\n    :host .history .square .square-footer {\n      font-size: 14px;\n      text-align: left;\n      opacity: 0.5; }\n      :host .history .square .square-title div,\n      :host .history .square .square-footer div {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap; }\n      :host .history .square .square-title .square-icon,\n      :host .history .square .square-footer .square-icon {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        font-size: var(--font-m, 15px); }\n        :host .history .square .square-title .square-icon .icon-text,\n        :host .history .square .square-footer .square-icon .icon-text {\n          padding-left: 3px; }\n    :host .history .square .more-button,\n    :host .history .square .less-more {\n      display: none; }\n    :host .history .square.truncate .square-content {\n      max-height: 32px;\n      overflow: hidden; }\n    :host .history .square.truncate.starrating .square-content {\n      max-height: 30px; }\n    :host .history .square.truncate.task .square-content {\n      width: 350px; }\n    :host .history .square.truncate.multiphotos .square-content, :host .history .square.truncate.photo .square-content {\n      max-height: 70px; }\n    :host .history .square.truncate .more-button {\n      display: -ms-flexbox;\n      display: flex;\n      margin-left: auto;\n      float: right;\n      color: var(--stable, #adadad); }\n    :host .history .square .square-content {\n      position: relative;\n      text-align: left;\n      white-space: initial;\n      overflow: hidden; }\n      :host .history .square .square-content .overlay {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        background: transparent;\n        z-index: 9; }\n      :host .history .square .square-content yoo-form-capture {\n        --width-readonly-preview: 30px;\n        --height-readonly-preview: 30px;\n        --play-icon-size: 15px;\n        --camera-container-size: 33px;\n        --image-max-height: 70px; }\n      :host .history .square .square-content yoo-form-document[type=image] {\n        --height-image-container: 30px; }\n      :host .history .square .square-content yoo-card-file {\n        --height-image-container: 30px; }\n      :host .history .square .square-content yoo-form-signature-pad {\n        --height-image: 30px; }\n      :host .history .square .square-content yoo-form-videoplayer {\n        --height-youtube-wrapper: 30px; }\n\n:host(.mission-form) yoo-form-progress-indicator {\n  --scroll-container-color: var(--light, #FFFFFF);\n  --scroll-container-margin: 0 0 0.5rem 0; }\n\n:host(.mission-form) .scroll-spacer.bottom-bar {\n  height: 5.75rem; }\n\n:host(.mission-form) .slide-container {\n  background-color: transparent; }\n\n:host(.mission-form) .form-wrapper {\n  position: relative;\n  width: 100%; }\n  :host(.mission-form) .form-wrapper.zoomed {\n    height: 100% !important;\n    margin: 0; }\n\n:host(.mission-form) .field-placeholder:not(.readonly):not(.invisible) {\n  margin: 0;\n  border-bottom: 1px solid var(--stable-30, #E6E6E6); }\n  :host(.mission-form) .field-placeholder:not(.readonly):not(.invisible).last {\n    margin-bottom: 0.9375rem;\n    border: none;\n    border-bottom-left-radius: 0.5rem;\n    border-bottom-right-radius: 0.5rem; }\n  :host(.mission-form) .field-placeholder:not(.readonly):not(.invisible).information {\n    padding-bottom: 0;\n    border-bottom: none; }\n\n:host(.mission-form) .footer-spacer {\n  background-color: var(--light, #FFFFFF); }\n\n:host(.lesson-form) .progress-container {\n  height: auto;\n  margin-bottom: 0.5rem;\n  padding: 1rem;\n  padding-bottom: 0; }\n\n:host(.lesson-form) .swiper-container {\n  height: calc(100% - 3rem); }\n\n:host(.lesson-form) .form-wrapper {\n  border-radius: 0;\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n  :host(.lesson-form) .form-wrapper yoo-ion-scroll {\n    border-radius: 0; }\n\n:host(.web) .web-container {\n  width: 100%;\n  height: 100%; }\n  :host(.web) .web-container .left-panel,\n  :host(.web) .web-container .right-panel {\n    width: 100%;\n    height: 100%; }\n    :host(.web) .web-container .left-panel > yoo-ion-scroll,\n    :host(.web) .web-container .right-panel > yoo-ion-scroll {\n      position: relative;\n      width: 100%;\n      height: 100%; }\n  :host(.web) .web-container .right-panel {\n    position: relative; }\n    :host(.web) .web-container .right-panel .slide-container {\n      width: unset;\n      height: 100%;\n      margin-right: 0.5rem; }\n      :host(.web) .web-container .right-panel .slide-container yoo-ion-scroll {\n        min-height: 98%; }\n  :host(.web) .web-container .left-panel {\n    margin-left: var(--padding-15, 0.9375rem);\n    border-right: 1px solid var(--stable-light, #f1f1f1); }\n\n:host(.web:not(.mission-form)) .field-header {\n  -ms-flex-item-align: center;\n  align-self: center;\n  width: 100%;\n  max-width: 510px; }\n\n:host(.web:not(.mission-form)) .field-placeholder {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  :host(.web:not(.mission-form)) .field-placeholder yoo-form-input-container {\n    -ms-flex-item-align: center;\n    align-self: center;\n    width: 100%;\n    max-width: 500px; }\n\n:host(.inline) {\n  display: block;\n  position: initial;\n  top: initial;\n  right: initial;\n  bottom: initial;\n  left: initial; }\n  :host(.inline) yoo-ion-slide {\n    position: initial;\n    width: 100% !important; }\n    :host(.inline) yoo-ion-slide yoo-ion-scroll {\n      position: initial;\n      width: 100%;\n      padding: 0 !important;\n      padding-top: 0 !important;\n      contain: initial;\n      overflow: hidden; }\n    :host(.inline) yoo-ion-slide .scroll-spacer {\n      height: 0px; }\n    :host(.inline) yoo-ion-slide .footer-spacer {\n      height: 0px; }\n    :host(.inline) yoo-ion-slide .field-placeholder:not(.readonly):not(.invisible) {\n      padding-right: 2px;\n      padding-left: 0; }\n      :host(.inline) yoo-ion-slide .field-placeholder:not(.readonly):not(.invisible) yoo-form-input-container {\n        padding: 0 2px;\n        padding-bottom: 0.5rem; }\n\n:host(.inline.web.absolute) yoo-ion-slides {\n  overflow: visible; }\n  :host(.inline.web.absolute) yoo-ion-slides yoo-ion-slide {\n    overflow: visible; }\n    :host(.inline.web.absolute) yoo-ion-slides yoo-ion-slide yoo-ion-scroll {\n      overflow: visible; }\n\n:host(.inline.web.absolute) .scroll-spacer {\n  -webkit-transition: 0.3s;\n  transition: 0.3s; }\n\n:host(.inline.web.absolute) yoo-form-input-container {\n  max-width: unset; }\n\n:host(.zoomed) {\n  display: block !important; }\n\n:host(.flex) .inputs-container {\n  display: -ms-flexbox;\n  display: flex;\n  padding-top: 0.5em; }\n\n:host(.zoomed.iphone-x) .slide-container {\n  margin-top: var(--padding-40, 2.5rem); }\n\n:host(.zoomed.iphone-x) .form-wrapper {\n  -webkit-box-shadow: unset;\n  box-shadow: unset; }\n\n:host(.boost) yoo-icon.success {\n  color: var(--danger-light, #F46885) !important; }\n\n:host(.boost) .information {\n  color: var(--black, #000000); }"; }
}

class YooFormProgressIndicatorComponent {
    constructor() {
        this.steps = [];
        this.isCompleted = false;
        this.displayMode = 'number';
        this.shownSteps = 7;
        // Index position for the context menu
        this.contextStep = this.shownSteps - 2;
        this.MAX_STEPS = 7;
        this.STEP_SIZE = 135;
        this.collapsedSteps = [];
        this.visibleSteps = [];
    }
    componentWillLoad() {
        // check on load
        if (!isIonic()) {
            this.setStepNumber();
            // check on resize
            // check the body width here and set max steps accordingly
            this.resizeListener = debounce(this.setStepNumber, 500).bind(this);
            window.addEventListener('resize', this.resizeListener);
        }
    }
    componentDidLoad() {
        this.setProgressStyles();
        this.centerCurrentProgress();
    }
    componentDidUpdate() {
        this.setProgressStyles();
        this.centerCurrentProgress();
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    selectStep(event, index) {
        if (event) {
            this.stepSelected.emit(index);
            if (this.isCurrentStep(index)) {
                this.centerCurrentProgress();
            }
            else {
                this.textTruncate.hideText();
            }
        }
    }
    setStepNumber() {
        let dimensions = getElementDimensions(this.host.parentElement);
        let width = dimensions.width;
        let height = dimensions.height;
        if (this.host.classList.contains('vertical')) {
            this.shownSteps = Math.min(Math.floor(height / this.STEP_SIZE), this.MAX_STEPS - 1);
        }
        else {
            this.shownSteps = Math.min(Math.floor(width / this.STEP_SIZE), this.MAX_STEPS - 1);
        }
        this.contextStep = this.shownSteps - 1;
    }
    async centerCurrentProgress() {
        const TEXT_TRUNCATE_RENDER_TIME = 100;
        const textTruncate = this.textTruncate ? await this.textTruncate.getSingleLineTextElement() : undefined;
        const moreButton = this.textTruncate ? await this.textTruncate.getSingleLineButttonElement() : undefined;
        setTimeout(() => {
            if (this.scroll) {
                const PADDING = 15;
                let leftPosition = (this.scroll.getBoundingClientRect().left);
                let rightPostion = (this.scroll.getBoundingClientRect().right);
                let textTruncateRight = textTruncate ? textTruncate.getBoundingClientRect().right : 0;
                let currentCirclePosition = this.currentCircle ? this.currentCircle.getBoundingClientRect().left : 0;
                if (currentCirclePosition < 15 || moreButton) {
                    let distanceToLeft = currentCirclePosition - (leftPosition) - PADDING;
                    this.scroll.scrollByPoint(distanceToLeft, 0, 300);
                }
                else if (textTruncateRight > rightPostion) {
                    let distanceToRight = (textTruncateRight - rightPostion) + PADDING;
                    this.scroll.scrollByPoint(distanceToRight, 0, 300);
                }
            }
        }, TEXT_TRUNCATE_RENDER_TIME);
    }
    setProgressStyles() {
        const SIDE_PADDING = 15;
        const STEP_CONTAINER_WIDTH = 32;
        let scrollWidth = getElementDimensions(this.scroll).width;
        if (this.lastContainer) {
            this.lastContainer.setAttribute('style', `margin-right: ${scrollWidth - (SIDE_PADDING + STEP_CONTAINER_WIDTH)}px;`);
        }
        if (this.textTruncate) {
            this.textTruncate.setAttribute('style', `width: ${scrollWidth - (SIDE_PADDING * 2)}px;`);
        }
    }
    isCollapsed() {
        return this.steps.length > this.shownSteps + 1;
    }
    isValidStep(index) {
        return this.steps[index].valid;
    }
    isInvalidStep(index) {
        return this.steps[index].valid === false;
    }
    isContextStep(index) {
        return index === this.contextStep;
    }
    isContextMenuCompleted() {
        // Mark context menu as complete if the last step is the current step
        return this.currentStep === this.steps.length - 1;
    }
    isCurrentStep(index) {
        return index === this.currentStep;
    }
    isLastStep(index) {
        return index === this.steps.length - 1;
    }
    onTextTruncateStatusChange(ev) {
        const BASE_SCROLL_HEIGHT = 5;
        let titleHeight = BASE_SCROLL_HEIGHT;
        if (ev && ev.detail) {
            if (ev.detail.isTextVisible) {
                const VIEW_LESS_BUTTON_PADDING = 2;
                titleHeight = titleHeight + ev.detail.numberOfLines + VIEW_LESS_BUTTON_PADDING;
            }
            this.scrollContainer.setAttribute('style', `height: ${titleHeight}rem;`);
            this.titleLinesChanged.emit(titleHeight);
        }
    }
    renderCompletedIndicator() {
        return (this.visibleSteps.map((step, index) => h("div", { class: "step-container" },
            h("div", { class: "step-title" },
                h("span", null, step)),
            this.isContextStep(index) && this.isCollapsed() ?
                this.renderContextMenu()
                : h("div", { class: "step-circle completed", onClick: (event) => this.selectStep(event, index) },
                    h("span", { class: "completed-icon" },
                        h("yoo-icon", { class: "yo-check" }))),
            (index < this.visibleSteps.length - 1 ? h("div", { class: "progress-line" }) : null))));
    }
    renderContextMenu() {
        if (!isIonic()) {
            return ((this.isCompleted || this.isContextMenuCompleted() ?
                h("yoo-context-menu", null,
                    h("div", { slot: "trigger", class: "step-circle completed" },
                        h("span", { class: "completed-icon" },
                            h("yoo-icon", { class: "yo-more" }))),
                    h("div", { class: "context-container" }, this.collapsedSteps.map((step, index) => h("span", { onClick: (event) => this.selectStep(event, index) },
                        step,
                        h("yoo-icon", { class: "yo-check" })))))
                : h("yoo-context-menu", null,
                    h("div", { slot: "trigger", class: 'step-circle ' + (this.collapsedSteps.indexOf(this.steps[this.currentStep]) !== -1 ? 'current ' : ' ') + 'more' },
                        h("span", null,
                            h("yoo-icon", { class: "yo-more" }))),
                    h("div", { class: "context-container" }, this.collapsedSteps.map((step, index) => h("span", { class: this.isCurrentStep(index) ? 'context-current' : '', onClick: (event) => this.selectStep(event, index) },
                        step,
                        this.isValidStep(index) ? h("yoo-icon", { class: "yo-check" }) : null))))));
        }
        else {
            return null;
        }
    }
    renderStepContainer(step, index, lastIndex) {
        let displayIndex = index + 1;
        return (h("div", { class: {
                'step-container ': true,
                'last': this.isLastStep(index),
                'active': this.isCurrentStep(index)
            }, ref: (el) => {
                if (this.isLastStep(index)) {
                    this.lastContainer = el;
                }
            } },
            (!isIonic() && this.isContextStep(index) && this.isCollapsed() ? this.renderContextMenu()
                :
                    h("div", { class: { 'step-circle-outer': true, 'active': this.isCurrentStep(index) } },
                        h("div", { class: {
                                'step-circle ': true,
                                ' current': this.isCurrentStep(index),
                                ' completed': this.isValidStep(index) && !this.lockIndex[index],
                                ' invalid': this.isInvalidStep(index) && !this.lockIndex[index],
                                ' locked': this.lockIndex[index]
                            }, ref: (el) => {
                                if (this.isCurrentStep(index)) {
                                    this.currentCircle = el;
                                }
                            }, onClick: (event) => this.selectStep(event, index) }, this.displayMode === 'icon' ? this.renderIcon(index) : this.renderNumber(index)))),
            this.renderProgresLine(index, lastIndex),
            this.isCurrentStep(index) ? h("div", { class: "step-title" },
                h("yoo-text-truncate", { animationLoadTime: 300, ref: el => this.textTruncate = el, maxLine: 1, content: displayIndex + '. ' + translateMulti(step), onStatusChanges: (ev) => this.onTextTruncateStatusChange(ev) })) : null));
    }
    renderNumber(index) {
        return (this.lockIndex[index] ? h("yoo-icon", { class: "yo-lock" }) :
            h("span", null, this.isLastStep(index) ? this.steps.length : index + 1));
    }
    renderIcon(index) {
        let step = this.steps[index];
        if (this.isInvalidStep(index) && !this.lockIndex[index]) {
            return (h("yoo-icon", { class: "yo-rejected2" }));
        }
        else if (step.validityPercentage > 0 && step.validityPercentage < 100 && !this.lockIndex[index]) {
            return (h("div", { class: "percentage-fill", style: { 'height': `${step.validityPercentage}%` } }));
        }
        if (this.lockIndex[index]) {
            return (h("yoo-icon", { class: "yo-lock" }));
        }
        else if (this.isValidStep(index)) {
            return (h("yoo-icon", { class: "yo-thick" }));
        }
        else {
            return (h("yoo-icon", { class: "yo-step" }));
        }
    }
    isProgressCompleted(index, lastIndex) {
        let nextIndex = index === lastIndex ? index - 1 : index + 1;
        return (this.steps[index].valid && !this.lockIndex[index] && (this.steps[nextIndex].valid) && !this.lockIndex[nextIndex]);
    }
    renderProgresLine(index, lastIndex) {
        return (h("div", { class: {
                'progress-line': true,
                'first': index === 0,
                'last': index === lastIndex,
                'active': this.isCurrentStep(index),
                'active-next': index === lastIndex ? false : this.isCurrentStep(index + 1),
                'completed': this.isProgressCompleted(index, lastIndex)
            } }));
    }
    render() {
        let lastStep = this.steps[this.steps.length - 1];
        let lastIndex = this.steps.length - 1;
        // Collapse Items include all steps after the Context-Index (included) except for the last step
        if (!isIonic()) {
            this.collapsedSteps = this.steps.slice(this.contextStep, this.steps.length - 1);
            if (this.isCollapsed()) {
                this.visibleSteps = this.steps.slice(0, this.contextStep + 1);
                this.visibleSteps.push(lastStep);
            }
            else {
                this.visibleSteps = this.steps;
            }
        }
        else {
            this.visibleSteps = this.steps;
        }
        return (h("div", { class: "scroll-container", ref: el => this.scrollContainer = el },
            h("yoo-ion-scroll", { class: "horizontal no-scrollbar", ref: el => this.scroll = el },
                h("div", { class: "outer-container" }, this.isCompleted ? this.renderCompletedIndicator() :
                    this.visibleSteps.map((step, index) => this.renderStepContainer(step.title, index, lastIndex))))));
    }
    static get is() { return "yoo-form-progress-indicator"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "contextStep": {
            "state": true
        },
        "currentStep": {
            "type": Number,
            "attr": "current-step"
        },
        "displayMode": {
            "type": String,
            "attr": "display-mode"
        },
        "host": {
            "elementRef": true
        },
        "isCompleted": {
            "type": Boolean,
            "attr": "is-completed"
        },
        "lockIndex": {
            "type": "Any",
            "attr": "lock-index"
        },
        "shownSteps": {
            "state": true
        },
        "steps": {
            "type": "Any",
            "attr": "steps"
        }
    }; }
    static get events() { return [{
            "name": "stepSelected",
            "method": "stepSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "titleLinesChanged",
            "method": "titleLinesChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --scroll-container-color: unset;\n  --scroll-container-margin: unset; }\n  :host yoo-context-menu {\n    --width-dropdown-content: 11.25rem; }\n\n:host .scroll-container {\n  position: relative;\n  height: 5rem;\n  margin: var(--scroll-container-margin);\n  padding-bottom: var(--padding-10, 0.625rem);\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n  background-color: var(--scroll-container-color); }\n  :host .scroll-container yoo-ion-scroll {\n    padding: 0 var(--padding-15, 0.9375rem); }\n\n:host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  :host .outer-container .step-container {\n    position: relative;\n    width: 5rem;\n    padding-top: 0.75rem;\n    cursor: pointer; }\n    :host .outer-container .step-container.last {\n      width: auto;\n      margin-right: var(--padding-15, 0.9375rem); }\n    :host .outer-container .step-container.active {\n      padding-top: 0.5625rem; }\n    :host .outer-container .step-container .step-title {\n      display: -ms-flexbox;\n      display: flex;\n      position: absolute;\n      -ms-flex-pack: center;\n      justify-content: center;\n      padding: var(--padding-10, 0.625rem) 0;\n      font-size: var(--font-s, 13px);\n      overflow: visible; }\n    :host .outer-container .step-container .step-circle-outer {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 2.5rem;\n      height: 2.5rem; }\n      :host .outer-container .step-container .step-circle-outer.active {\n        border: 2px solid var(--black, #000000);\n        border-radius: 50%; }\n    :host .outer-container .step-container .step-circle {\n      border-radius: 50%;\n      display: -ms-flexbox;\n      display: flex;\n      position: relative;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 30px;\n      height: 30px;\n      background-color: var(--dark-10, #e6eaf0);\n      color: var(--light, #FFFFFF);\n      font-size: var(--font-m, 15px);\n      overflow: hidden;\n      z-index: 1; }\n      :host .outer-container .step-container .step-circle.more {\n        padding: 5.5px 8.5px;\n        cursor: context-menu; }\n      :host .outer-container .step-container .step-circle.completed {\n        background-color: var(--stable-30, #E6E6E6);\n        color: var(--accent, #1FB6FF); }\n      :host .outer-container .step-container .step-circle .percentage-fill {\n        top: auto;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        position: absolute;\n        -webkit-transition: 0.3s all;\n        transition: 0.3s all; }\n    :host .outer-container .step-container .progress-line {\n      top: 1.9375rem;\n      right: -4px;\n      bottom: auto;\n      left: 1rem;\n      position: absolute;\n      height: 1px;\n      background-color: var(--stable-light, #f1f1f1); }\n      :host .outer-container .step-container .progress-line.first {\n        left: 4px; }\n      :host .outer-container .step-container .progress-line.last {\n        right: 50%; }\n      :host .outer-container .step-container .progress-line.active {\n        left: 44px; }\n      :host .outer-container .step-container .progress-line.active-next {\n        right: 0; }\n  :host .outer-container .context-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n    :host .outer-container .context-container span {\n      position: relative;\n      width: 100%;\n      padding: 0.5rem 1rem;\n      border-bottom: 1px solid var(--stable-30, #E6E6E6);\n      line-height: 1.5; }\n      :host .outer-container .context-container span:last-child {\n        border-bottom: none; }\n      :host .outer-container .context-container span:hover {\n        background: var(--accent-05, #f4fbff);\n        color: var(--dark, #2b3648); }\n      :host .outer-container .context-container span.context-current {\n        font-weight: bold; }\n      :host .outer-container .context-container span yoo-icon {\n        top: 0.75rem;\n        right: 0.625rem;\n        bottom: auto;\n        left: auto;\n        position: absolute; }\n\n:host(.vertical) .outer-container {\n  -ms-flex-direction: column;\n  flex-direction: column;\n  max-width: 2rem; }\n  :host(.vertical) .outer-container .step-container {\n    position: relative;\n    padding-right: 0rem;\n    padding-bottom: 2.8125rem; }\n    :host(.vertical) .outer-container .step-container .step-title {\n      position: relative;\n      top: 2.3125rem;\n      right: 0px;\n      bottom: 0px;\n      left: 2.8125rem; }\n    :host(.vertical) .outer-container .step-container .step-circle {\n      padding: 4.5px 0.5px;\n      text-align: center; }\n      :host(.vertical) .outer-container .step-container .step-circle.completed .completed-icon {\n        text-align: center; }\n  :host(.vertical) .outer-container .progress-line {\n    top: 2.6875rem;\n    right: 0.875rem;\n    bottom: auto;\n    left: auto;\n    position: absolute;\n    width: 5px;\n    height: 8.45rem;\n    background-color: var(--stable-30, #E6E6E6);\n    z-index: -1; }\n    :host(.vertical) .outer-container .progress-line.faded {\n      background-color: var(--dark-10, #e6eaf0);\n      z-index: -2; }\n\n:host(.success) .outer-container .step-container .step-circle {\n  background-color: var(--success, #04CC99); }\n  :host(.success) .outer-container .step-container .step-circle.current {\n    border: 1px solid var(--success, #04CC99);\n    color: var(--success, #04CC99); }\n\n:host(.success) .outer-container .progress-line-container .progress-line {\n  background-color: var(--success, #04CC99); }\n\n:host(.success) .outer-container .step-container .step-circle.completed {\n  color: var(--success, #04CC99); }\n\n:host(.danger) .outer-container .step-container .step-circle {\n  background-color: var(--danger, #ff625f); }\n  :host(.danger) .outer-container .step-container .step-circle.current {\n    border: 1px solid var(--danger, #ff625f);\n    color: var(--danger, #ff625f); }\n\n:host(.danger) .outer-container .progress-line-container .progress-line {\n  background-color: var(--danger, #ff625f); }\n\n:host(.danger) .outer-container .step-container .step-circle.completed {\n  color: var(--danger, #ff625f); }\n\n:host(.warning) .outer-container .step-container .step-circle {\n  background-color: var(--warning, #ff6402); }\n  :host(.warning) .outer-container .step-container .step-circle.current {\n    border: 1px solid var(--warning, #ff6402);\n    color: var(--warning, #ff6402); }\n\n:host(.warning) .outer-container .progress-line-container .progress-line {\n  background-color: var(--warning, #ff6402); }\n\n:host(.warning) .outer-container .step-container .step-circle.completed {\n  color: var(--warning, #ff6402); }\n\n:host(.info) .outer-container .step-container .step-circle {\n  background-color: var(--info, #fc459e); }\n  :host(.info) .outer-container .step-container .step-circle.current {\n    border: 1px solid var(--info, #fc459e);\n    color: var(--info, #fc459e); }\n\n:host(.info) .outer-container .progress-line-container .progress-line {\n  background-color: var(--info, #fc459e); }\n\n:host(.info) .outer-container .step-container .step-circle.completed {\n  color: var(--info, #fc459e); }\n\n:host(.gradient-success) .outer-container .step-container .step-circle {\n  border: 1px solid var(--success, #04CC99);\n  background-color: var(--light, #FFFFFF);\n  color: var(--success, #04CC99); }\n  :host(.gradient-success) .outer-container .step-container .step-circle.completed {\n    background: var(--gradient-success, #04CC99);\n    color: var(--light, #FFFFFF) !important; }\n    :host(.gradient-success) .outer-container .step-container .step-circle.completed span {\n      color: var(--light, #FFFFFF); }\n  :host(.gradient-success) .outer-container .step-container .step-circle.invalid {\n    border: 1px solid var(--danger, #ff625f);\n    background-color: var(--danger, #ff625f);\n    color: var(--light, #FFFFFF) !important; }\n    :host(.gradient-success) .outer-container .step-container .step-circle.invalid span {\n      color: var(--light, #FFFFFF); }\n  :host(.gradient-success) .outer-container .step-container .step-circle.current-invalid {\n    border: 1px solid var(--danger, #ff625f);\n    color: var(--danger, #ff625f); }\n  :host(.gradient-success) .outer-container .step-container .step-circle.locked {\n    border: 1px solid var(--stable, #adadad);\n    background-color: var(--stable, #adadad);\n    color: var(--light, #FFFFFF); }\n  :host(.gradient-success) .outer-container .step-container .step-circle .percentage-fill {\n    background: var(--gradient-success, #04CC99); }\n\n:host(.gradient-success) .outer-container .step-container .progress-line.completed {\n  background-color: var(--success, #04CC99); }\n\n:host(.gradient-success) .outer-container .step-container .step-circle.completed {\n  border: 1px solid var(--success, #04CC99);\n  color: var(--gradient-success, #04CC99); }\n\n:host(.gradient-danger) .outer-container .step-container .step-circle {\n  border: 1px solid var(--danger, #ff625f);\n  background-color: var(--light, #FFFFFF);\n  color: var(--danger, #ff625f); }\n  :host(.gradient-danger) .outer-container .step-container .step-circle.completed {\n    background: var(--gradient-danger, #ff625f);\n    color: var(--light, #FFFFFF) !important; }\n    :host(.gradient-danger) .outer-container .step-container .step-circle.completed span {\n      color: var(--light, #FFFFFF); }\n  :host(.gradient-danger) .outer-container .step-container .step-circle.invalid {\n    border: 1px solid var(--danger, #ff625f);\n    background-color: var(--danger, #ff625f);\n    color: var(--light, #FFFFFF) !important; }\n    :host(.gradient-danger) .outer-container .step-container .step-circle.invalid span {\n      color: var(--light, #FFFFFF); }\n  :host(.gradient-danger) .outer-container .step-container .step-circle.current-invalid {\n    border: 1px solid var(--danger, #ff625f);\n    color: var(--danger, #ff625f); }\n  :host(.gradient-danger) .outer-container .step-container .step-circle.locked {\n    border: 1px solid var(--stable, #adadad);\n    background-color: var(--stable, #adadad);\n    color: var(--light, #FFFFFF); }\n  :host(.gradient-danger) .outer-container .step-container .step-circle .percentage-fill {\n    background: var(--gradient-danger, #ff625f); }\n\n:host(.gradient-danger) .outer-container .step-container .progress-line.completed {\n  background-color: var(--danger, #ff625f); }\n\n:host(.gradient-danger) .outer-container .step-container .step-circle.completed {\n  color: var(--gradient-danger, #ff625f); }\n\n:host(.more-stable) yoo-text-truncate {\n  --current-background-color: var(--stable-ultralight, #F5F5F5); }"; }
}

class YooFormRecapStepComponent {
    renderIcon() {
        if (this.step.valid === false && !this.locked) {
            return (h("yoo-icon", { class: "yo-rejected2" }));
        }
        else if (this.step.validityPercentage > 0 && this.step.validityPercentage < 100 && !this.locked) {
            return (h("div", { class: "percentage-fill", style: { 'height': `${this.step.validityPercentage}%` } }));
        }
        if (this.locked) {
            return (h("yoo-icon", { class: "yo-lock" }));
        }
        else if (this.step.valid) {
            return (h("yoo-icon", { class: "yo-thick" }));
        }
        else {
            return (h("yoo-icon", { class: "yo-step" }));
        }
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "icon-outer-container" },
                h("div", { class: {
                        'icon-container': true,
                        'locked': this.locked,
                        'valid': this.step.valid && !this.locked,
                        'invalid': this.step.valid === false && !this.locked,
                        'step': isNullOrUndefined(this.step.valid) && !this.locked
                    } }, this.renderIcon())),
            h("div", { class: "text-container" },
                h("div", { class: "step-container" }, translate('STEP') + ' ' + this.stepNumber),
                h("div", { class: "title-container" },
                    h("yoo-text-truncate", { class: "form-recap", maxLine: 2, content: translateMulti(this.mainTitle) })),
                h("div", { class: "subtitle-container" }, translateMulti(this.subTitle)))));
    }
    static get is() { return "yoo-form-recap-step"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "locked": {
            "type": Boolean,
            "attr": "locked"
        },
        "mainTitle": {
            "type": String,
            "attr": "main-title"
        },
        "step": {
            "type": "Any",
            "attr": "step"
        },
        "stepNumber": {
            "type": Number,
            "attr": "step-number"
        },
        "subTitle": {
            "type": String,
            "attr": "sub-title"
        }
    }; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  min-height: 5.625rem;\n  margin: var(--padding-10, 0.625rem) var(--padding-15, 0.9375rem);\n  border-radius: 5px;\n  background-color: var(--light-card-background, #FFFFFF);\n  text-align: left;\n  -webkit-box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08));\n  box-shadow: var(--tile-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.08)); }\n  :host .outer-container .icon-outer-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 4.0625rem;\n    height: 100%; }\n  :host .outer-container .icon-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 2.1875rem;\n    height: 2.1875rem;\n    border-radius: 50%;\n    color: var(--light, #FFFFFF);\n    font-size: 1rem; }\n    :host .outer-container .icon-container.locked {\n      background-color: var(--stable, #adadad); }\n    :host .outer-container .icon-container.valid {\n      background: var(--gradient-success, #04CC99); }\n    :host .outer-container .icon-container.invalid {\n      background: var(--danger, #ff625f); }\n    :host .outer-container .icon-container.step {\n      position: relative;\n      border: 1px solid var(--success, #04CC99);\n      color: var(--success, #04CC99);\n      overflow: hidden; }\n    :host .outer-container .icon-container .percentage-fill {\n      top: auto;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      position: absolute;\n      -webkit-transition: 0.3s all;\n      transition: 0.3s all;\n      background: var(--success, #04CC99); }\n  :host .outer-container .text-container {\n    width: calc(100% - 4.375rem);\n    padding: var(--padding-10, 0.625rem) var(--padding-5, 0.3125rem) var(--padding-10, 0.625rem) 0; }\n  :host .outer-container .step-container {\n    color: var(--black, #000000);\n    font-size: var(--font-m, 15px);\n    font-weight: bold;\n    letter-spacing: 1px;\n    line-height: 1.31;\n    text-transform: uppercase; }\n    :host .outer-container .step-container yoo-icon {\n      padding-right: var(--padding-5, 0.3125rem);\n      font-weight: bold; }\n  :host .outer-container .subtitle-container {\n    color: var(--text-color, #807f83);\n    font-size: var(--font-s, 13px); }"; }
}

class YooFormTaskComponent {
    constructor() {
        this.validators = [];
    }
    onTaskClicked(ev) {
        this.onAddNewTask();
    }
    setSlides(data) {
        this.slidesTask = data;
    }
    componentWillLoad() {
        setValidator(this);
        this.value = this.value || [];
        this.fetchCustomData.emit();
    }
    onAddNewTask() {
        this.upsertTask({ hasphoto: { value: true } }, -1);
    }
    onEditTask(task, index) {
        this.upsertTask(task, index);
    }
    onRemoveTask(task, index) {
        let message = translate('DELETETODOTASKCONFIRM') + ' "' + (task.text && task.text.value ? ' ' + task.text.value : '') + '"';
        showAlert(translate('DELETE'), [translate('CANCEL'), translate('OK')], null, message).then(ret => {
            if (ret === true) {
                remove(this.value, (t) => t === task);
                this.value = [...this.value];
                setValueAndValidateInput(this.value, this);
            }
        });
    }
    onShowActionSheet(task, index) {
        let buttons = [{
                type: 'edit',
                text: translate('EDIT'),
                handler: () => this.onEditTask(task, index)
            }, {
                type: 'delete',
                text: translate('DELETE'),
                cssClass: 'danger',
                handler: () => this.onRemoveTask(task, index)
            }];
        showActionSheet(buttons);
    }
    upsertTask(task, index) {
        let form = document.createElement('yoo-form-dynamic-dialog');
        form.slides = this.slidesTask;
        form.showTabs = false;
        form.showRecap = false;
        form.data = task;
        form.suffix = '.value';
        form.header = translate('ADDNEWACTION');
        form.onFieldFetchData = (ev) => {
            this.fieldFetchData.emit(ev);
        };
        showModal(form).then(ret => {
            if (ret && ret.data) {
                this.value = this.value || [];
                if (index < 0) {
                    this.value = [...this.value, ret.data];
                }
                else {
                    this.value[index] = ret.data;
                    this.value = [...this.value];
                }
                setValueAndValidateInput(this.value, this);
            }
            form = null;
        });
    }
    renderTasks() {
        return (this.value ? this.value.map((t, i) => {
            let tStyle = taskStyle(t.finished);
            return [
                h("div", { class: "task" },
                    h("div", { class: "task-part" }, (t.text.value ?
                        h("div", { class: tStyle.style + ' description-container' },
                            this.readonly ? null : h("yoo-icon", { class: tStyle.icon }),
                            h("div", { class: "text-container" },
                                h("span", { class: 'text ' + tStyle.breakText }, t.text.value)))
                        : null)),
                    this.isHistory ? null :
                        h("div", { class: "task-part" },
                            t.user && t.user.value ? h("yoo-avatar", { class: "xsmall", user: t.user.value }) : null,
                            t.duedate && t.duedate.value ? h("span", { class: "date" }, pipes.dateFormat.transform(t.duedate.value, 'L')) : null,
                            this.readonly ? null : h("yoo-button", { icon: "yo-more", class: "icon-only link-transparent-dark", onClick: (ev) => this.onShowActionSheet(t, i) }))),
                this.readonly ? null : h("div", { class: "border" })
            ];
        }) : null);
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.value && this.value.length > 0 ? [
            this.hideTitle ? null : h("div", { class: "title" }, translate('ACTIONS')),
            this.renderTasks()
        ] : null);
    }
    renderEditable() {
        return h("div", { class: (this.value && this.value.length) > 0 ? 'outer-container' : 'outer-container outer-container-empty' },
            (this.value && this.value.length > 0) ? h("div", { class: "title" }, translate('ACTIONS')) : null,
            this.renderTasks(),
            this.type === 'todo' || this.type === 'task' ?
                h("div", { class: 'success newtask ' + (this.value && this.value.length > 0 ? '' : ' nomargin'), onClick: ev => this.onAddNewTask() },
                    h("div", { class: "icon" },
                        h("yoo-icon", { class: "yo-plus" })),
                    translate('ADDNEWACTION')) : null);
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-task"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "hideTitle": {
            "type": Boolean,
            "attr": "hide-title"
        },
        "host": {
            "elementRef": true
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "setSlides": {
            "method": true
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "type": Boolean,
            "attr": "validity",
            "mutable": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fetchCustomData",
            "method": "fetchCustomData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fieldFetchData",
            "method": "fieldFetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "parent:taskClicked",
            "method": "onTaskClicked"
        }]; }
    static get style() { return ":host .readonly,\n:host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n  :host .readonly .task,\n  :host .outer-container .task {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    width: 100%;\n    background: var(--light, #FFFFFF);\n    line-height: 39px; }\n    :host .readonly .task .task-part,\n    :host .outer-container .task .task-part {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row; }\n      :host .readonly .task .task-part yoo-avatar,\n      :host .outer-container .task .task-part yoo-avatar {\n        --transform-avatar: translateY(5px);\n        margin-right: 0.5rem; }\n      :host .readonly .task .task-part .text,\n      :host .outer-container .task .task-part .text {\n        font-size: var(--font-l, 17px); }\n      :host .readonly .task .task-part .date,\n      :host .outer-container .task .task-part .date {\n        margin-right: 0.625rem;\n        color: var(--text-color, #807f83);\n        font-size: var(--font-s, 13px); }\n      :host .readonly .task .task-part yoo-button,\n      :host .outer-container .task .task-part yoo-button {\n        --width-icon-only-container: 0.25rem;\n        --font-size-icon: 1.125rem;\n        padding-top: 0.6875rem; }\n  :host .readonly .border,\n  :host .outer-container .border {\n    width: 100%;\n    height: 0;\n    border-top: 1px solid var(--stable-30, #E6E6E6); }\n  :host .readonly .title,\n  :host .outer-container .title {\n    font-size: var(--font-m, 15px); }\n  :host .readonly .newtask,\n  :host .outer-container .newtask {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    margin-top: 0.875rem;\n    font-size: var(--font-m, 15px); }\n    :host .readonly .newtask.nomargin,\n    :host .outer-container .newtask.nomargin {\n      margin-top: 0; }\n    :host .readonly .newtask .icon,\n    :host .outer-container .newtask .icon {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      margin-right: 0.125rem; }\n      :host .readonly .newtask .icon .yo-plus,\n      :host .outer-container .newtask .icon .yo-plus {\n        font-size: 0.5rem; }\n  :host .readonly .task,\n  :host .outer-container .task {\n    -ms-flex-align: start;\n    align-items: flex-start; }\n    :host .readonly .task .task-part yoo-icon,\n    :host .outer-container .task .task-part yoo-icon {\n      line-height: 39px; }\n    :host .readonly .task .task-part .description-container,\n    :host .outer-container .task .task-part .description-container {\n      display: -ms-flexbox;\n      display: flex; }\n    :host .readonly .task .task-part .text-container,\n    :host .outer-container .task .task-part .text-container {\n      padding: 7px 0 1rem 0.625rem;\n      line-height: 1.5rem; }\n      :host .readonly .task .task-part .text-container .text,\n      :host .outer-container .task .task-part .text-container .text {\n        color: var(--black, #000000);\n        font-size: var(--font-m, 15px); }\n    :host .readonly .task .task-part yoo-button,\n    :host .outer-container .task .task-part yoo-button {\n      padding-top: 0.2rem; }\n\n:host .readonly .task .task-part .break-text {\n  text-decoration: line-through; }\n\n:host .readonly .task .task-part .text {\n  margin-left: 0.625rem; }\n\n:host .readonly .task .task-part .subtitle {\n  color: #adadad; }\n\n:host .readonly .task .task-part .yo-circle {\n  color: #d0d0d0; }\n\n:host(.history) .readonly {\n  margin-top: 0 !important; }\n\n:host(.tasks-container) {\n  display: block;\n  margin-top: 1rem; }\n  :host(.tasks-container) .outer-container {\n    padding: var(--padding-10, 0.625rem) 0 0 0; }\n    :host(.tasks-container) .outer-container:not(.outer-container-empty) {\n      margin-bottom: 1rem; }\n  :host(.tasks-container) .outer-container-empty {\n    padding: 0; }"; }
}

export { YooFieldValidityComponent as YooFieldValidity, YooFormDynamicComponent as YooFormDynamic, YooFormProgressIndicatorComponent as YooFormProgressIndicator, YooFormRecapStepComponent as YooFormRecapStep, YooFormTaskComponent as YooFormTask };

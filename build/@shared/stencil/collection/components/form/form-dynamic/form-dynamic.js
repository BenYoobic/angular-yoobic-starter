import { FormFieldType } from '../../../interfaces';
import { getSession, showModal, showToast, querySelectorDeep, querySelectorAllDeep, findParent, getDistance, pipes, translate, isIonic, isCordova, translateMulti, isIphoneX, hasValue, isVisible, isReadonly, setFieldData, updateFormulas, getFieldValue, generateLabel, lockSwipes, getActiveElementShadow, isIOS, isFieldWithNoValue, getElementDimensions, getMissionStatusIconClass, evalInContext, disableKeyboardResize, enableKeyboardResize, hideShowTabbar, isQuiz, isAndroid, debounce, isTimedQuiz, isContentOnly, getAppContext, isWeb, isRequired, answerIsValid } from '../../../utils';
import { isObject, cloneDeep, assign, result, isEmpty, findLastIndex, isArray, isFunction } from 'lodash-es';
import { CameraPreview } from '@ionic-native/camera-preview';
export class YooFormDynamicComponent {
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
    static get style() { return "/**style-placeholder:yoo-form-dynamic:**/"; }
}

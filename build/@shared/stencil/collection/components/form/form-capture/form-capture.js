import { querySelectorDeep, querySelectorAllDeep, getSession, getVideoDevices, translate, isCordova, isIE, isIE11, isAndroid, translateMulti, moveToImageDirectory, read, isFile, getMimeType, isImage, setValidator, setValueAndValidateInput, cloudinary, showModal, showActionSheet, isIOS, updatePathSessionId, videos, audios, images, isNullOrUndefined, showAlert, isPixel, isIphoneX, getAppContext, getPicture, cleanupCamera } from '../../../utils';
import { PictureSourceType, MediaType } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';
import { MediaCapture } from '@ionic-native/media-capture';
import { StatusBar } from '@ionic-native/status-bar';
import { isNumber, omit, keys, isArray, clone, assign } from 'lodash-es';
export class YooFormCaptureComponent {
    constructor() {
        this.extraData = {};
        this.validators = [];
        this.isHistory = false;
        this.min = 1;
        this.max = 1;
        this.isSelectorMode = false;
        this.selectedIndex = [];
        this.overflowOffset = 4;
        this.cameraStarted = false;
    }
    updateAutocompleteValues(tags) {
        if (this.autocomplete && tags) {
            this.autocomplete.updateValues(tags);
        }
    }
    updateData(value, extraData) {
        this.isProcessing = false; // image recognition finish
        setValueAndValidateInput(value, this);
        this.updateExtraData(extraData);
    }
    /** If there is index, the field is a multiphoto */
    setFieldValue(index, data) {
        if (index === undefined) {
            setValueAndValidateInput(data, this);
        }
        else {
            let newValue = this.value ? [...this.value] : [];
            newValue[index] = data;
            setValueAndValidateInput(newValue, this);
        }
    }
    stopImageRecognitionProcess() {
        this.isProcessing = false;
    }
    processImageRecognitionResults(retVal) {
        this.extraData = this.extraData || {};
        if (this.multiple) {
            let markupImages = [].concat(retVal.markup_image);
            markupImages.forEach((image, index) => {
                this.extraData[index] = this.extraData[index] ? this.extraData[index] : {};
                this.extraData[index].edit = image;
                this.extraData[index].stitch = image;
                this.extraData[index].stitchMode = this.isStitch();
            });
        }
        else {
            this.extraData = Object.assign(this.extraData, { edit: retVal.markup_image });
        }
        this.imageRecognitionResults = [];
        this.imageRecognitionKpiKeys = keys(omit(retVal, ['time', 'original_image', 'markup_image', 'hiddenFields']));
        this.imageRecognitionKpiKeys = this.imageRecognitionKpiKeys.filter(key => key.toLowerCase().startsWith('delay_') === false);
        let keyValues = [];
        this.imageRecognitionKpiKeys.forEach(key => {
            let algoValue = retVal[key];
            if (isNumber(algoValue)) {
                algoValue = Math.round(algoValue * 100) / 100;
            }
            keyValues.push({ key, value: algoValue });
            let color = 'dark';
            if (algoValue === true) {
                color = 'success';
                algoValue = translate('true');
            }
            if (algoValue === false) {
                color = 'danger';
                algoValue = translate('false');
            }
            let hidden = retVal.hiddenFields && retVal.hiddenFields.indexOf(key) >= 0;
            this.imageRecognitionResults.push({ title: translate(key.toUpperCase()), color: color, value: algoValue, rawValue: retVal[key], hidden, key });
        });
        this.extraData.imageRecognitionResults = this.imageRecognitionResults;
        this.extraDataChanged.emit(keyValues);
        this.extraDataChanged.emit(this.extraData);
        this.isProcessing = false;
        this.validators = this.validators.map(v => {
            let validator = v;
            if (validator.name !== 'required') {
                validator.options.extraData = this.extraData;
            }
            return validator;
        });
        setValidator(this, null, true);
        //this.openPreview(this.multiple ? 0 : undefined);
    }
    processGeoloc(geolocation, index) {
        this.extraData = this.extraData || {};
        if (this.multiple && index !== undefined) {
            this.extraData._geoloc = this.extraData && this.extraData._geoloc ? this.extraData._geoloc : [];
            this.extraData._geoloc[index] = geolocation;
        }
        else {
            this.extraData._geoloc = geolocation;
        }
        this.extraDataChanged.emit(this.extraData);
    }
    componentWillLoad() {
        setValidator(this);
        this.initExtraData();
        this.initMultiObjects();
    }
    componentDidLoad() {
        this.fixSessionIdPath();
        this.getFileInputs();
        this.type = this.type || 'photo';
    }
    componentWillUpdate() {
        this.initMultiObjects();
    }
    componentDidUpdate() {
        this.getFileInputs();
    }
    componentDidUnload() {
        if (this.cameraStarted && isCordova() && isIOS()) {
            CameraPreview.stopCamera();
        }
    }
    initExtraData() {
        if (this.extraData) {
            if (isNullOrUndefined(this.value) && this.extraData.edit) {
                this.value = this.extraData.edit;
            }
            if (this.extraData.imageRecognitionResults) {
                this.imageRecognitionResults = this.extraData.imageRecognitionResults;
            }
        }
        this.initTags();
    }
    initMultiObjects() {
        if (this.multiple) {
            if (isNullOrUndefined(this.value)) {
                this.value = [];
            }
        }
    }
    initTags() {
        if (this.multiple) {
            for (let i = 0; i < this.max; i++) {
                this.extraData[i] = this.extraData[i] || {};
                this.extraData[i]['tags'] = this.extraData[i]['tags'] || {};
            }
        }
        else {
            this.extraData = this.extraData || {};
            this.extraData['tags'] = this.extraData['tags'] || {};
        }
    }
    getFileInputs() {
        if (this.multiple) {
            this.fileInputs = querySelectorAllDeep(this.host, '.camera-input');
        }
        else {
            this.fileInputs = querySelectorDeep(this.host, '.camera-input');
        }
    }
    removeAllCapture() {
        this.value = [];
        this.value.slice();
        setValueAndValidateInput(this.value, this);
    }
    getAddFileInput() {
        return querySelectorDeep(this.host, '.add-input');
    }
    updateExtraData(extraData) {
        this.extraData = assign(this.extraData || {}, extraData);
        this.extraDataChanged.emit(this.extraData);
    }
    getFieldValue(index) {
        return !this.multiple ? this.value : this.value[index];
    }
    /** for webcam, choose which device to take photo/video */
    capture(device, index) {
        if (isCordova()) {
            if (this.type === 'photo') {
                this.capturePhoto(false, index);
            }
            else if (this.type === 'audio') {
                this.captureAudio();
            }
            else if (this.type === 'video') {
                this.captureVideo();
            }
        }
        else {
            if (this.type === 'photo') {
                this.captureFromWebcam(device, index);
            }
        }
    }
    processImageData(imageData, index) {
        let promise;
        if (!imageData) {
            return promise = Promise.resolve(imageData);
        }
        if (isAndroid() && this.type === 'video' && imageData && imageData.indexOf('file://') < 0) {
            imageData = 'file://' + imageData;
        }
        if (imageData && imageData.indexOf('?') > 0) {
            imageData = imageData.substring(0, imageData.indexOf('?'));
        }
        if (imageData && imageData.startsWith && imageData.startsWith('data:image')) {
            promise = Promise.resolve(imageData);
        }
        else {
            if (isAndroid() && imageData.indexOf('tmp') < 0 && imageData.indexOf('cache') < 0) {
                promise = Promise.resolve(imageData);
            }
            else {
                promise = moveToImageDirectory(imageData, getSession().user ? getSession().user.disablePhotoOrientationAutoFix : false);
            }
        }
        return promise.then((newPath) => {
            if (this.shouldTagImage()) {
                this.showPhotoTagDialog(newPath).then((tag) => {
                    if (!isNullOrUndefined(tag.data)) {
                        this.updateTagData(tag, index);
                        this.setFieldValue(index, newPath);
                        this.clearPhotoEdit(index);
                        if (this.saveGeoloc) {
                            this.captureGeoloc(index);
                        }
                    }
                });
            }
            else {
                this.setFieldValue(index, newPath);
                this.clearPhotoEdit(index);
                if (this.saveGeoloc) {
                    this.captureGeoloc(index);
                }
            }
        });
    }
    showPhotoTagDialog(imageSrc, value) {
        let imageTag = document.createElement('yoo-form-capture-tag-dialog');
        imageTag.tags = this.tags;
        imageTag.imageSrc = imageSrc;
        imageTag.value = value;
        imageTag.addEventListener('fetchData', (ev) => {
            this.onFetchGridData(ev);
        });
        return showModal(imageTag, null, '', 'slideYEnterAnimation', 'slideYLeaveAnimation');
    }
    updateTagData(tag, index) {
        this.initTags();
        if (this.multiple) {
            if (this.extraData[index] && this.extraData[index].tags) {
                this.extraData[index].tags = tag.data;
            }
            else {
                this.extraData[0].tags = tag.data;
            }
        }
        else {
            this.extraData.tags = tag.data;
        }
        this.extraDataChanged.emit(this.extraData);
    }
    showCameraPreviewDialog(src, quality, isImageRecognition, maxWidth, max, extraClass, regularMode) {
        let cameraPreviewer = document.createElement('yoo-camera-preview-dialog');
        cameraPreviewer.imageData = src;
        cameraPreviewer.values = this.value;
        cameraPreviewer.quality = quality;
        cameraPreviewer.isImageRecognition = isImageRecognition;
        cameraPreviewer.maxWidth = maxWidth;
        cameraPreviewer.max = max;
        cameraPreviewer.cameraStarted = this.cameraStarted;
        cameraPreviewer.regularMode = regularMode;
        if (isCordova()) {
            if (isIOS() && !isIphoneX()) {
                StatusBar.hide();
            }
            else {
                StatusBar.styleLightContent();
            }
        }
        return showModal(cameraPreviewer, null, extraClass, 'slideYEnterAnimation', 'slideYLeaveAnimation').then(ret => {
            if (!regularMode) {
                this.cameraStarted = true;
            }
            else {
                getSession().cameraStarted = true;
            }
            if (isCordova()) {
                if (isIOS() && !isIphoneX()) {
                    StatusBar.show();
                }
                else {
                    StatusBar.styleDefault();
                }
            }
            cameraPreviewer = null;
            return ret && ret.data ? ret.data : null;
        });
    }
    capturePhoto(useLibrary, index) {
        let quality = this.isImageRecognition ? 100 : 70;
        let sourceType = useLibrary ? PictureSourceType.PHOTOLIBRARY : PictureSourceType.CAMERA;
        let mediaType = this.type === 'video' ? MediaType.VIDEO : MediaType.PICTURE;
        let isMultiMode = false; //this.multiple && isAndroid() ? true : false;
        let captureIndex = index;
        if (index === -1) {
            captureIndex = this.value && this.value.length - 1 > -1 ? this.value.length - 1 : -1;
        }
        let promise;
        if (this.algorithm && this.algorithm.stitch && !useLibrary) {
            this.showImageLoader = true;
            promise = this.showCameraPreviewDialog(this.value && captureIndex > -1 && this.value[captureIndex] ? this.value[captureIndex] : null, quality, this.isImageRecognition, this.maxWidth, this.max, 'camera-preview-visible');
        }
        else {
            //if (isIOS()){
            //    promise = this.showCameraPreviewDialog('', quality, this.isImageRecognition, this.maxWidth, this.max, 'camera-preview-visible', true);
            //} else {
            promise = getPicture(quality, sourceType, mediaType, isMultiMode, this.maxWidth, this.isImageRecognition, this.max);
            //}
        }
        return promise.then((imageData) => {
            if (!imageData && this.showImageLoader) {
                this.showImageLoader = false;
            }
            let newIndex = index;
            if (index < 0) {
                if (this.value && this.value.length) {
                    newIndex = this.value.length;
                }
                else {
                    newIndex = 0;
                }
            }
            if (isMultiMode) {
                let promises = imageData.map((d, ind) => {
                    return this.processImageData(d.fullPath, ind);
                });
                return Promise.all(promises).then(() => { });
            }
            else if (isArray(imageData)) {
                let promises = imageData.map((d, ind) => {
                    return this.processImageData(d, ind + newIndex);
                });
                return Promise.all(promises).then(() => { this.showImageLoader = false; });
            }
            else {
                if (imageData && imageData['data']) {
                    return this.processImageData(imageData['data'], newIndex);
                }
                return this.processImageData(imageData, newIndex);
            }
        }).catch((err) => {
            // console.log(err);
        });
    }
    captureVideo() {
        let options = { limit: 1, duration: this.duration || 60 };
        return MediaCapture.captureVideo(options).then((files) => {
            this.fixPathAndSetValue(files);
        });
    }
    captureAudio() {
        if (isPixel()) {
            this.noAudio();
            return;
        }
        let options = { limit: 1, duration: this.duration || 60 };
        return MediaCapture.captureAudio(options).then((files) => {
            this.fixPathAndSetValue(files);
        }).catch((err) => {
            if (err.code !== 3) {
                this.noAudio();
            }
        });
    }
    noAudio() {
        showAlert(translate('AUDIO'), [translate('OK')], null, translate('NOAUDIO'));
    }
    fixSessionIdPath() {
        if (isIOS() && isCordova() && this.value && typeof this.value !== 'undefined') {
            if (Array.isArray(this.value)) {
                let newValue = [];
                let promises = this.value.map((val, i) => {
                    return updatePathSessionId(val).then(res => {
                        newValue[i] = res;
                    });
                });
                Promise.all(promises).then(() => {
                    setValueAndValidateInput(newValue, this);
                });
            }
            else {
                updatePathSessionId(this.value).then(res => {
                    if (res && this.value !== res) {
                        setValueAndValidateInput(res, this);
                    }
                });
            }
        }
    }
    fixPathAndSetValue(files) {
        if (files && files.length > 0) {
            let path = files[0].fullPath;
            if (isIOS()) {
                path = 'file://' + path;
            }
            return moveToImageDirectory(path, getSession().user ? getSession().user.disablePhotoOrientationAutoFix : false).then((newPath) => {
                cleanupCamera();
                setValueAndValidateInput(newPath, this);
                if (this.saveGeoloc) {
                    this.captureGeoloc();
                }
            });
        }
    }
    captureFromWebcam(device, index) {
        let promise;
        let newIndex = index;
        if (index < 0) {
            if (this.value && this.value.length) {
                newIndex = this.value.length;
            }
            else {
                newIndex = 0;
            }
        }
        // if (this.algorithm && this.algorithm.stitch) {
        //     promise = showCameraPreviewDialog(this.value && newIndex > -1 && this.value[newIndex] ? this.value[newIndex] : null, 100, this.isImageRecognition, this.maxWidth, this.max, 'camera-preview-visible');
        // } else {
        let webcam = document.createElement('yoo-form-capture-webcam-dialog');
        webcam.device = device;
        promise = showModal(webcam);
        //}
        promise.then(ret => {
            if (ret && ret.data) {
                if (this.shouldTagImage()) {
                    this.showPhotoTagDialog(ret.data).then((tag) => {
                        if (!isNullOrUndefined(tag.data)) {
                            this.updateTagData(tag, newIndex);
                            this.setFieldValue(newIndex, ret.data);
                            this.clearPhotoEdit();
                            if (this.saveGeoloc) {
                                this.captureGeoloc();
                            }
                        }
                    });
                }
                else {
                    this.setFieldValue(newIndex, ret.data);
                    this.clearPhotoEdit();
                    if (this.saveGeoloc) {
                        this.captureGeoloc();
                    }
                }
            }
            webcam = null;
        });
    }
    captureFromDisk(index) {
        let targetElement = (index && index < 0 ? this.getAddFileInput() : this.getTargetElement(index));
        if (targetElement) {
            let event;
            if (isIE() || isIE11()) {
                event = document.createEvent('MouseEvent');
                event.initMouseEvent('click', false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            else {
                event = new MouseEvent('click', { bubbles: false });
            }
            targetElement.dispatchEvent(event);
        }
    }
    captureGeoloc(index) {
        if (this.saveGeoloc) {
            this.getGeoloc.emit(index);
        }
    }
    getIcon() {
        const ICON_CLASS = {
            'video': 'yo-videocamera',
            'audio': 'yo-microphone',
            'default': 'yo-camera'
        };
        let newClass = ICON_CLASS[this.type];
        if (!newClass) {
            newClass = ICON_CLASS['default'];
        }
        return newClass;
    }
    upload(index) {
        if (isCordova()) {
            this.capturePhoto(true, index);
        }
        else {
            this.captureFromDisk(index);
        }
    }
    onFetchGridData(ev) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }
    getTargetElement(index) {
        return index !== undefined ? Array.from(this.fileInputs).find((item, ind) => ind === index) : this.fileInputs;
    }
    onFileSelect(ev, index) {
        let targetElement = this.getTargetElement(index);
        let file = targetElement.files[0];
        if (isImage(file)) {
            read(file, 'blob')
                .then((data) => {
                if (this.shouldTagImage()) {
                    this.showPhotoTagDialog(data).then((tag) => {
                        if (!isNullOrUndefined(tag.data)) {
                            this.updateTagData(tag, index);
                            this.setFieldValue(index, data);
                            this.clearPhotoEdit(index);
                        }
                    });
                }
                else {
                    this.setFieldValue(index, data);
                    this.clearPhotoEdit(index);
                }
            });
        }
        else {
            this.setFieldValue(undefined, file);
        }
        // else if (isCordova() === false && this.type === 'video' && isFile(file)) {
        //     //we re uploading when in emulate to be able to have a video thumbnail, i m disabling it for now
        //     this.getMediaurl.emit(file);
        // }
        targetElement.value = null;
    }
    clearPhotoEdit(index) {
        if (!index && index !== 0) {
            if (this.extraData && (this.extraData.edit || (this.extraData.texts && this.extraData.texts.length > 0))) {
                this.extraData = { edit: null, texts: [], stitch: null };
                this.extraDataChanged.emit(this.extraData);
            }
        }
        else {
            if (this.extraData && this.extraData[index] && (this.extraData[index].edit || (this.extraData[index].texts && this.extraData[index].texts.length > 0))) {
                let newExtraData = {};
                delete this.extraData[index];
                Object.keys(this.extraData).forEach((item, i) => {
                    newExtraData[i] = this.extraData[item];
                });
                // Object.keys(obj).filter(k => obj[k]).sort((a,b) => a-b).reduce((acc, cur) => { acc[cur] = obj[cur]; return acc }, {})
                this.extraDataChanged.emit(newExtraData);
            }
        }
    }
    clearPhotoTag(index) {
        if (this.onHasTag(index)) {
            let newExtraData = {};
            if (this.multiple) {
                delete this.extraData[index];
                Object.keys(this.extraData).forEach((item, i) => {
                    newExtraData[i] = this.extraData[item];
                });
                this.extraDataChanged.emit(newExtraData);
            }
            else {
                this.extraData['tags'] = {};
                newExtraData = this.extraData;
            }
            this.extraDataChanged.emit(newExtraData);
        }
    }
    openPhotoEditorPreview(index, forceReadonly = false) {
        let photoEditor = document.createElement('yoo-photo-editor');
        photoEditor.readonly = forceReadonly || !this.allowAnnotate;
        photoEditor.isModal = true;
        photoEditor.src = this.getFieldValue(index);
        if (index === undefined) {
            if (this.extraData) {
                if (this.isStitch()) {
                    photoEditor.isStitch = this.extraData.stitch ? true : false;
                }
                photoEditor.annotatedImgSrc = this.extraData.edit;
                photoEditor.texts = this.extraData.texts;
                photoEditor.svgData = this.extraData.svgData;
            }
        }
        else {
            if (this.extraData && this.extraData[index]) {
                if (this.isStitch()) {
                    photoEditor.src = this.extraData[index].stitch || photoEditor.src;
                    photoEditor.isStitch = this.extraData[index].stitch ? true : false;
                    photoEditor.annotatedImgSrc = this.extraData[index].edit === this.extraData[index].stitch ? null : this.extraData[index].edit;
                }
                else {
                    photoEditor.annotatedImgSrc = this.extraData[index].edit;
                }
                photoEditor.texts = this.extraData[index].texts;
                photoEditor.svgData = this.extraData[index].svgData;
            }
        }
        showModal(photoEditor).then((retVal) => this.onAfterAnnotate(index, retVal));
    }
    /**
     * Need to handle this differently depending on whether we have are opening the preview from the image
     * or whether we are simply viewing the photo in readonly mode
     */
    openPreview(index, forceReadonly = false) {
        if (this.type === 'photo') {
            if (this.multiple && (!this.imageRecognitionResults || this.imageRecognitionResults.length === 0)) {
                this.renderMultiplePreview(index);
            }
            else {
                this.openPhotoEditorPreview(index, forceReadonly);
            }
        }
        else {
            // use document viewer for audio and video mode
            let file;
            if (isFile(this.value)) {
                file = this.value;
            }
            else {
                let newPath = this.value.toString();
                file = { _filename: newPath, _downloadURL: newPath, mimeType: getMimeType(newPath) };
            }
            let documentViewer = document.createElement('yoo-form-document-dialog');
            documentViewer.document = file;
            documentViewer.modalTitle = translate(this.type);
            showModal(documentViewer).then(ret => { });
        }
    }
    openGallery(index) {
        this.galleryOpened.emit(index);
    }
    onAnnotate(index) {
        let photoEditor = document.createElement('yoo-photo-editor');
        photoEditor.readonly = false;
        // Base 64 of the image
        photoEditor.src = this.getFieldValue(index);
        if (index === undefined) {
            if (this.extraData) {
                photoEditor.annotatedImgSrc = this.extraData.edit;
                photoEditor.texts = this.extraData.texts;
                photoEditor.svgData = this.extraData.svgData;
            }
        }
        else {
            if (this.extraData && this.extraData[index]) {
                photoEditor.annotatedImgSrc = this.extraData[index].edit;
                photoEditor.texts = this.extraData[index].texts;
                photoEditor.svgData = this.extraData[index].svgData;
                photoEditor.src = this.extraData[index].stitch || photoEditor.src;
            }
        }
        showModal(photoEditor).then((retVal) => this.onAfterAnnotate(index, retVal));
    }
    onAfterAnnotate(index, retVal) {
        if (retVal && retVal.data) {
            let extraData = { edit: retVal.data.canvasData, texts: retVal.data.texts, svgData: retVal.data.svgData };
            if (index === undefined) {
                this.extraData = Object.assign({}, extraData);
            }
            else {
                let tempData = clone(this.extraData);
                tempData[index] = assign(tempData[index] || {}, extraData);
                this.extraData = tempData;
            }
            this.extraDataChanged.emit(this.extraData);
        }
    }
    deleteCapture(index) {
        if (this.type === 'photo' && this.multiple && isArray(this.value)) {
            this.value.splice(index, 1);
            this.value = this.value.slice();
            setValueAndValidateInput(this.value, this);
            this.clearPhotoEdit(index);
            this.clearImageRecognition();
        }
        else {
            this.value = null;
            setValueAndValidateInput(this.value, this);
            if (this.type === 'photo') {
                this.clearPhotoEdit();
                this.clearImageRecognition();
            }
        }
        this.clearPhotoTag(index);
    }
    clearImageRecognition() {
        if (this.imageRecognitionKpiKeys && this.imageRecognitionKpiKeys.length > 0) {
            let keyValues = [];
            this.imageRecognitionKpiKeys.forEach(key => {
                keyValues.push({ key, value: null });
            });
            this.extraDataChanged.emit(keyValues);
        }
        if (this.extraData && this.extraData.imageRecognitionResults) {
            this.extraData.imageRecognitionResults = [];
        }
        this.extraDataChanged.emit(this.extraData);
    }
    isRequired(index) {
        return (index ? this.required && (index < this.min) : this.required);
    }
    async addCaptureButtons(buttons, index) {
        let textPrefix = 'TAKEANEW';
        if (isCordova()) {
            buttons.push({
                text: translate(textPrefix + this.type.toUpperCase()),
                handler: () => this.capture(null, index)
            });
        }
        else if (!isCordova() && this.type === 'photo') {
            this.devices = await getVideoDevices();
            if (this.devices && this.devices.length > 0) {
                this.devices.forEach((device, i) => {
                    buttons.push({
                        text: translate(textPrefix + this.type.toUpperCase()) + ':<br/> ' + (device.label || 'WEBCAM ' + i),
                        handler: () => this.capture(device, index)
                    });
                });
            }
        }
    }
    isValueValid() {
        if (this.multiple) {
            return isArray(this.value) && this.value.length > 0;
        }
        else {
            return this.value !== undefined && this.value !== null;
        }
    }
    onImageRecognition(ev) {
        if (this.isValueValid() && this.algorithm && !this.isProcessing) { //&& !this.isOffline
            // emit image recognition event
            this.imageRecognition.emit(this.value);
            this.isProcessing = true;
        }
    }
    isStitch() {
        return this.algorithm && this.algorithm.stitch;
    }
    onShowImageRecoKpis(ev) {
        let photoView = document.createElement('yoo-form-capture-view-dialog');
        photoView.label = translateMulti('KPIS');
        photoView.imageRecognitionResults = this.imageRecognitionResults;
        photoView.imageRecognitionDisplay = this.algorithmDisplay;
        photoView.isStitch = this.isStitch();
        showModal(photoView).then(ret => { });
    }
    onShowMaximumCaptureReached() {
        let description = translate('MAXIMUMCAPTUREREACHED');
        showAlert('', [translate('OK')], null, description);
    }
    async onShowActionSheet(value, index) {
        if ((index && index < 0 && this.max && this.value && this.value.length === this.max)) {
            this.onShowMaximumCaptureReached();
            return;
        }
        else if (this.isProcessing) {
            return;
        }
        else {
            this.actionSheetOpened.emit(index);
            let buttons = [];
            if (!value) {
                await this.addCaptureButtons(buttons, index);
                if (this.allowLibrary === true || (!isCordova() && (this.type === 'video' || this.type === 'audio'))) {
                    buttons.push({
                        text: translate('IMPORTFROMLIBRARY'),
                        handler: () => this.upload(index)
                    });
                }
            }
            else {
                const forceReadonly = true;
                buttons.push({
                    text: translate(this.type === 'photo' ? 'VIEWPHOTO' : 'VIEW'),
                    handler: () => this.openPreview(index, forceReadonly)
                });
                if (this.allowLibrary === true) {
                    buttons.push({
                        text: translate('IMPORTFROMLIBRARY'),
                        handler: () => this.upload(index)
                    });
                }
                if (this.type === 'photo' && this.allowAnnotate) {
                    buttons.push({
                        text: translate('ANNOTATE'),
                        handler: () => this.onAnnotate(index)
                    });
                }
                await this.addCaptureButtons(buttons, index);
                buttons.push({
                    text: translate(this.type === 'photo' ? 'DELETEPHOTO' : 'DELETE'),
                    handler: () => this.deleteCapture(index)
                });
            }
            if (this.shouldTagImage() && value) {
                buttons.push({
                    text: this.onHasTag(index) ? translate('EDITTAG') : translate('ADDNEWTAG'),
                    handler: () => {
                        let tagsData;
                        if (this.multiple) {
                            if (this.extraData && this.extraData[index] && this.extraData[index].tags) {
                                tagsData = this.extraData[index].tags;
                            }
                        }
                        else {
                            if (this.extraData && this.extraData.tags) {
                                tagsData = this.extraData.tags;
                            }
                        }
                        this.showPhotoTagDialog(value, tagsData).then((tag) => {
                            if (!isNullOrUndefined(tag.data)) {
                                this.updateTagData(tag, index);
                            }
                        });
                    }
                });
            }
            if (buttons.length === 1 && (this.type !== 'photo' || isCordova())) {
                buttons[0].handler();
            }
            else if (buttons.length > 0) {
                showActionSheet(buttons);
            }
        }
    }
    hasExtraData(index, isMultiple = false) {
        if (this.extraData) {
            if (isMultiple && this.extraData[index] && this.extraData[index].edit) {
                return true;
            }
            else if (isMultiple && this.extraData[index] && this.extraData[index].texts) {
            }
            else if (!isMultiple) {
                return this.extraData.edit ? true : this.extraData.texts ? true : false;
            }
        }
        return false;
    }
    onAddFileSelect() {
        if (this.value) {
            let targetElement = this.getAddFileInput();
            let initialFileSize = this.value.length;
            let allowedSize = this.max - initialFileSize;
            let files = Array.from(targetElement.files).slice(0, allowedSize);
            let newArr = [];
            let promises = files.map((imagegFile, index) => {
                if (isImage(imagegFile)) {
                    return read(imagegFile, 'blob').then((data) => {
                        newArr[index] = data;
                    });
                }
            });
            Promise.all(promises).then(() => {
                this.value = [...this.value, ...newArr];
                setValueAndValidateInput(this.value, this);
                targetElement.value = null;
            });
        }
    }
    isAllItemSelected() {
        return this.selectedIndex.length === this.value.length;
    }
    isItemSelected(index) {
        let foundIndex = this.selectedIndex.indexOf(index);
        return typeof foundIndex !== 'undefined' && foundIndex > -1;
    }
    unselectAll() {
        this.selectedIndex = [];
        this.selectedIndex.slice();
    }
    selectAll() {
        if (isArray(this.value)) {
            let arrayKeys = Array.from(this.value.keys());
            this.selectedIndex = [...arrayKeys];
        }
    }
    onItemSelect(index) {
        if (this.isItemSelected(index)) {
            this.selectedIndex.splice(this.selectedIndex.indexOf(index), 1);
            this.selectedIndex = [...this.selectedIndex];
        }
        else {
            this.selectedIndex = [...this.selectedIndex, index];
        }
    }
    onDeleteSelect() {
        let newValue = [...this.value];
        this.selectedIndex.sort().reverse().forEach(index => {
            newValue.splice(index, 1);
            this.clearPhotoEdit(index);
        });
        this.value = [...newValue];
        setValueAndValidateInput(this.value, this);
        this.clearImageRecognition();
        this.toggleSelectorMode();
    }
    toggleSelectorMode() {
        this.isSelectorMode = !this.isSelectorMode;
        this.selectedIndex = [];
    }
    getAcceptExtension() {
        let extensions;
        switch (this.type) {
            case 'video':
                extensions = videos;
                break;
            case 'audio':
                extensions = audios;
                break;
            case 'photo':
            default:
                extensions = images;
                break;
        }
        return extensions && extensions.length > 0 ? extensions.map(e => '.' + e).join(',') : null;
    }
    renderEditIcon() {
        return (h("div", { class: "edit-icon-container" },
            h("span", { class: "edit-icon" },
                h("yoo-icon", { class: "yo-brush" }))));
    }
    renderAudio() {
        return h("yoo-card-file", { class: 'document', type: this.type, _downloadURL: this.value });
    }
    renderPreviewPlayIcon() {
        return (this.type === 'video' && this.readonly ?
            h("div", { class: "control-container" },
                h("yoo-icon", { class: "yo-play" }))
            : null);
    }
    renderPreview() {
        return h("yoo-img", { type: "back", class: "preview", onClick: (ev) => this.handleImageClick(), src: cloudinary(this.value, 500, 500) },
            this.type === 'video' ? h("div", { class: "overlay" }) : null,
            this.renderPreviewPlayIcon());
    }
    handleImageClick(index) {
        if (this.readonly && this.useGallery) {
            this.openGallery(index);
        }
        else if (this.multiple && index > -1) {
            this.renderMultiplePreview(index);
        }
        else {
            this.openPreview();
        }
    }
    renderMultiplePreview(index) {
        if (this.readonly && this.useGallery) {
            this.openGallery(index);
        }
        else if (this.value && isArray(this.value) && this.value.length > 0) {
            let photoEditors = document.createElement('yoo-photo-editors');
            photoEditors.index = index;
            photoEditors.isReadonly = true;
            // Add any extra data to the items
            photoEditors.items = this.value.map(((v, valueIndex) => {
                let item = { value: v };
                if (this.extraData[valueIndex]) {
                    item = {
                        value: v,
                        edit: this.extraData[valueIndex].edit,
                        texts: this.extraData[valueIndex].texts,
                        svgData: this.extraData[valueIndex].svgData
                    };
                }
                return item;
            }));
            showModal(photoEditors);
        }
        else if (this.allowAnnotate) {
            this.onAnnotate(index);
        }
    }
    shouldRotateImage(path) {
        if (path && path.includes) {
            return path.includes('rotate_image');
        }
        else {
            return false;
        }
    }
    renderSingle() {
        if (this.readonly) {
            return h("div", { class: "readonly-container" },
                this.type === 'audio' ? this.renderAudio() : this.renderPreview(),
                this.extraData && this.extraData.distance ? h("div", { class: "distance" },
                    h("yoo-icon", { class: "yo-map" }),
                    h("span", null, this.extraData.distance)) : null,
                this.hasExtraData() && !this.isHistory ? this.renderEditIcon() : null);
        }
        else {
            return h("div", { class: "single" },
                this.renderCameraContainer(this.value, this.extraData),
                this.isImageRecognition && !this.isBackgroundProcess && this.renderButtonContainer());
        }
    }
    renderCaptureStatus() {
        let value = this.value || [];
        return value && h("div", { class: "capture-status" },
            this.required &&
                h("div", { class: "status" }, value.length > this.min ?
                    translate('PHOTOTAKEN', { 'captured_number': `${this.min}/${this.min}` }) :
                    translate('PHOTOTAKEN', { 'captured_number': `${value.length}/${this.min}` })),
            this.max && this.max > 0 &&
                h("div", { class: {
                        'status': true,
                        'max-reached': value.length === this.max
                    } }, translate('MAXIMUMCAPTURE', { 'captured_number': `${value.length}/${this.max}` })),
            value.length > 0 && h("div", { class: "action", onClick: () => { this.toggleSelectorMode(); } }, translate('SELECT2')));
    }
    renderMultiple() {
        let value = this.value || [];
        if (this.readonly) {
            return value.map && value.map((v, index) => {
                return v ? h("div", { class: "readonly-container multiple" },
                    h("yoo-img", { type: "back", class: "preview", onClick: ev => this.handleImageClick(index), src: cloudinary(v, 500, 500) }),
                    this.extraData && this.extraData.distance && this.extraData.distance[index] ? h("div", { class: "distance" },
                        h("yoo-icon", { class: "yo-map" }),
                        h("span", null, this.extraData.distance[index])) : null,
                    this.hasExtraData(index, this.multiple) && !this.isHistory ? this.renderEditIcon() : null) : null;
            });
        }
        else {
            return this.isSelectorMode ? this.renderMultipleInSelectMode() : this.renderMultipleInNormalMode();
        }
    }
    checkImageOverflow() {
        if (this.value && isArray(this.value) && this.value.length) {
            return this.value.length > this.overflowOffset;
        }
        else {
            return false;
        }
    }
    renderBottomAction() {
        return h("div", { class: {
                'bottom-action-container': true,
                'active': this.selectedIndex.length > 0
            }, onClick: () => { this.onDeleteSelect(); } },
            " ",
            translate('DELETE'));
    }
    renderTopAction() {
        return h("div", { class: "top-action-container" },
            h("div", { class: "left-action" }, this.isAllItemSelected() ?
                h("div", { onClick: () => { this.unselectAll(); } }, translate('UNSELECTALL')) :
                h("div", { onClick: () => { this.selectAll(); } }, translate('SELECTALL'))),
            h("div", { class: "right-action", onClick: () => { this.toggleSelectorMode(); } }, 'Cancel'));
    }
    renderCameraContainerInSelectMode(item, index) {
        return h("div", { class: {
                'camera-selector-container': true,
                'rotate': this.shouldRotateImage(item)
            }, onClick: () => { this.onItemSelect(index); } },
            item ? h("yoo-img", { type: "back", class: "preview", src: cloudinary(item, 500, 500) }) : null,
            h("yoo-icon", { class: "yo-circle" }),
            this.isItemSelected(index) ? h("yoo-icon", { class: "yo-check success" }) : null);
    }
    renderMultipleInSelectMode() {
        let value = this.value || [];
        return h("div", { class: "multiple selector-mode" },
            this.renderTopAction(),
            isArray(value) && value.length > 0 ?
                value.map((item, index) => {
                    return this.renderCameraContainerInSelectMode(item, index);
                })
                : null,
            this.renderBottomAction());
    }
    renderMultipleInNormalMode() {
        let value = this.value || [];
        return h("div", { class: "multiple" },
            this.showImageLoader ? h("yoo-loader", { class: "absolute large backdrop" }) : null,
            this.renderCaptureStatus(),
            this.renderAddCameraContainer(),
            isArray(value) && value.length > 0 ?
                value.map((item, index) => {
                    return this.renderCameraContainer(item, this.extraData[index], index);
                })
                : null,
            this.isImageRecognition && !this.isBackgroundProcess ? this.renderButtonContainer() : null);
    }
    renderAddCameraContainer(index = -1) {
        return h("div", { class: "camera-container", onClick: (ev) => this.onShowActionSheet(null, index) },
            h("input", { multiple: true, class: "add-input", type: "file", onChange: () => this.onAddFileSelect(), accept: this.getAcceptExtension() }),
            h("yoo-icon", { class: this.getIcon() + ' success' }));
    }
    renderProgressBar() {
        let progressLineParams = {
            uploadingMode: true
        };
        return h("div", { class: "progressbar-wrapper" },
            h("yoo-progress-bar-core", { shape: "line", percentColorScheme: false, progressParameters: progressLineParams }));
    }
    renderCameraContainer(value, extraData, index) {
        return h("div", { class: {
                'camera-container': true,
                'rotate': this.shouldRotateImage(value)
            }, onClick: (ev) => this.onShowActionSheet(value, index) },
            h("input", { class: "camera-input", type: "file", onChange: (ev) => this.onFileSelect(ev, index), accept: this.getAcceptExtension() }),
            value ? h("yoo-img", { type: "back", class: "preview", src: cloudinary(value, 500, 500) }) : null,
            extraData && extraData.edit ? h("yoo-img", { type: "back", class: "edit", src: cloudinary(extraData.edit, 340, 250) }) : null,
            value && !this.multiple ? h("div", { class: "overlay" }) : null,
            !this.multiple ? h("yoo-icon", { class: this.getIcon() + (value ? ' always-light' : ' success') }) : null,
            this.onHasTag(index) && h("div", { class: "tag-icon-container" },
                h("yoo-icon", { class: "yo-tag" })));
    }
    renderButtonContainer() {
        return [
            h("div", { class: "button-container" },
                h("yoo-button", { class: "x-medium gradient-success full-width", onClick: (ev) => this.onImageRecognition(ev), disabled: this.isProcessing || !this.isValueValid(), text: !this.isProcessing ? translate('PHOTOLIVECOUNTER') : translate('PROCESSING') + '...' }),
                this.imageRecognitionResults && this.imageRecognitionResults.length > 0 && this.algorithmDisplay &&
                    h("yoo-button", { class: "x-medium dark show-kpi full-width", onClick: (ev) => this.onShowImageRecoKpis(ev), text: translate('SHOWIMAGERECOKPIS') }))
        ];
    }
    renderReadonly() {
        if (!this.value) {
            return null;
        }
        let overflown = this.isHistory && this.checkImageOverflow();
        return [h("div", { class: {
                    'readonly': true,
                    'truncate': overflown
                }, ref: el => this.readonlyDiv = el }, !this.multiple ? this.renderSingle() : this.renderMultiple()),
            (this.imageRecognitionResults && this.imageRecognitionResults.length > 0 && this.algorithmDisplay ? h("div", { class: "button-container" },
                h("yoo-button", { class: "x-medium dark full-width", onClick: (ev) => this.onShowImageRecoKpis(ev), text: translate('SHOWIMAGERECOKPIS') })) : null),
            (overflown ? h("div", { class: "more-button", ref: el => this.moreButtonDiv = el, onClick: () => this.onToggleMore() }, translate('MORE')) : null)
        ];
    }
    onToggleMore() {
        if (this.readonlyDiv && this.readonlyDiv.classList.contains('truncate')) {
            this.readonlyDiv.classList.remove('truncate');
            this.moreButtonDiv.innerHTML = translate('VIEWLESS');
        }
        else {
            this.readonlyDiv.classList.add('truncate');
            this.moreButtonDiv.innerHTML = translate('MORE');
        }
    }
    onHasTag(index) {
        if (index > -1) {
            return this.extraData && this.extraData[index] && this.extraData[index].tags.length > 0;
        }
        else {
            return this.extraData && this.extraData.tags && this.extraData.tags.length > 0;
        }
    }
    shouldTagImage() {
        return this.tags && this.tags.length > 0;
    }
    renderEditable() {
        return h("div", { class: {
                'outer-container': true,
                'uploading': this.isProcessing
            } },
            this.isProcessing ? h("div", { class: "upload-overlay" }) : null,
            this.isProcessing ? this.renderProgressBar() : null,
            !this.multiple ? this.renderSingle() : this.renderMultiple());
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext(), { 'audio': this.type && this.type === 'audio' && this.isHistory })
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-capture"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "algorithm": {
            "type": "Any",
            "attr": "algorithm"
        },
        "algorithmDisplay": {
            "type": "Any",
            "attr": "algorithm-display"
        },
        "allowAnnotate": {
            "type": Boolean,
            "attr": "allow-annotate"
        },
        "allowLibrary": {
            "type": Boolean,
            "attr": "allow-library"
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "extraData": {
            "type": "Any",
            "attr": "extra-data",
            "mutable": true
        },
        "host": {
            "elementRef": true
        },
        "imageRecognitionResults": {
            "state": true
        },
        "isBackgroundProcess": {
            "type": Boolean,
            "attr": "is-background-process"
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "isImageRecognition": {
            "type": Boolean,
            "attr": "is-image-recognition"
        },
        "isProcessing": {
            "state": true
        },
        "isSelectorMode": {
            "state": true
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "maxWidth": {
            "type": Number,
            "attr": "max-width"
        },
        "min": {
            "type": Number,
            "attr": "min"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "processGeoloc": {
            "method": true
        },
        "processImageRecognitionResults": {
            "method": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "saveGeoloc": {
            "type": Boolean,
            "attr": "save-geoloc"
        },
        "selectedIndex": {
            "state": true
        },
        "setFieldValue": {
            "method": true
        },
        "showImageLoader": {
            "state": true
        },
        "stopImageRecognitionProcess": {
            "method": true
        },
        "tags": {
            "type": "Any",
            "attr": "tags"
        },
        "type": {
            "type": String,
            "attr": "type",
            "mutable": true
        },
        "updateAutocompleteValues": {
            "method": true
        },
        "updateData": {
            "method": true
        },
        "useGallery": {
            "type": Boolean,
            "attr": "use-gallery"
        },
        "validators": {
            "type": "Any",
            "attr": "validators",
            "mutable": true
        },
        "validity": {
            "state": true
        },
        "value": {
            "type": String,
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
            "name": "imageRecognition",
            "method": "imageRecognition",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "getGeoloc",
            "method": "getGeoloc",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "getMediaurl",
            "method": "getMediaurl",
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
            "name": "extraDataChanged",
            "method": "extraDataChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fetchData",
            "method": "fetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-capture:**/"; }
}

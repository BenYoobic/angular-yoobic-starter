import { querySelectorDeep, translate, isCordova, isWKWebView, isWeb, isBase64, isTargetSpan, closeModal, cleanupWKWebViewImagePath, showAlert, cloudinary, setDotAnnotations, adjustTextArea, isTargetTextArea, isCanvasCurrentTarget, isDotAnnotation, isTextAnnotation, isTextBackgroundOff, isTextBackgroundOn, isTextMode, isDrawMode, isZoomMode, isAnnotationMode, isLandscape, isPortrait, isCloudinaryLink, disableKeyboardResize, enableKeyboardResize, parseSVG, limitDragPosition, scaleSVGData, downloadFile, showActionSheet, getAppContext, isIOS, showModal, getCurrentLanguage, getSession, isFullScreenFalse, isSafari, WHITE, BLACK, computeViewboxZoom, isSameViewbox } from '../../../index';
import interact from 'interactjs';
export class YooPhotoEditorComponent {
    constructor() {
        /**
        * True when the annotatedImgSrc is stitched after image recognition is applied to it.
        */
        this.isStitch = false;
        /**
         * Specifies whether the editor is being opened in stitch mode
         */
        this.stitchMode = false;
        /**
         * Specifies whether we should rotate this image for camera preview component where image is has wrong orientation
         */
        this.rotateImage = false;
        /**
         * Specifies whether the header should be disabled
         */
        this.disableHeader = false;
        /**
         * Specifies whether the photo-editor is opened in edit mode from inside the photo-editors gallery
         */
        this.editInPhotoEditors = false;
        /**
         * Controls the current alignment of the textarea when creating or editing a text-only annotation
         */
        this.currentTextAlignment = 'center'; // 'left' | 'center' | 'right'
        /**
         * Controls the background color of the textarea when creating or editing a text-only annotation
         */
        this.backgroundStatus = 'off';
        /**
         * String containing the hex code for the current color. When in drawing mode, this will correspond to the color of the SVG drawing.
         * In the text mode, this controls the color of the text (if backgroundStatus = 'off') or the color of the textarea's background (if backgroundStatus = 'on')
         */
        this.currentColor = '#FFFFFF';
        /**
         * The submode in which the editor is currently in.
         */
        this.editorMode = 'zoom';
        /**
         * Used to force a re-render of the component once the image has finished loading
         */
        this.photoHasLoaded = false;
        /**
         * Used to control the UI when the user is creating a dot annotation, upon clicking on the annotation overlay.
         */
        this.isAnnotating = false;
        /**
         * Used to control the appearance of the trash can used to delete an annotation. This will be true when either a text annotation
         * or a dot annotation starts being dragged and becomes false when the user drops the annotation
         */
        this.isDragging = false;
        this.googleStorageApiUrl = 'storage.googleapis.com';
        this.isSVGReplaced = false;
        this.updatedTextAnnotation = {};
        this.colors = [WHITE, BLACK, '#1FB6FF', '#04CC99', '#fed05b', '#ff6402', '#ff625f', '#fc459e', '#7754e3'];
        this.lineWidth = 4;
        this.isDrawing = false;
        this.isEditing = false; // Controls drawings and type: text annotations
        this.isUpdatingText = false;
        this.imageFocus = false;
        this.afterUndo = false;
        this.isTextButtonClicked = false;
        this.drawCanvasEdit = true;
        this.isTooltipShowing = false;
        /**
         * Controls the mouse move event so that it only calls the handler after mouseDown
         */
        this.handleMouseMove = false;
        this.scale = 1;
        this.scrollX = 0;
        this.scrollY = 0;
        this.imageTopPosition = 0;
        this.imageLeftPosition = 0;
        this.imageHeight = 0;
        this.imageWidth = 0;
        this.history = { undos: [] };
        this.localAnnotations = [];
        this.currentX = 0;
        this.currentY = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.editorState = {
            hasDrawings: false,
            hasTextAnnotations: false,
            hasDotAnnotations: false,
            hasAnnotationMoved: false,
            hasInitialTexts: false,
            hasInitialDrawings: false,
            hasStitch: false,
            hasInitialSVG: false,
            isDiscarded: false
        };
        this.initialEditorState = {};
    }
    handleUpdatedTexts(newTexts) {
        this.localAnnotations = newTexts;
        this.host.forceUpdate();
    }
    handleUpdatedSVGData(newSvgData) {
        this.editSvg = parseSVG(newSvgData);
        this.isSVGReplaced = false;
        this.host.forceUpdate();
    }
    handleSrcUpdate() {
        this.treatImageSrc();
        this.host.forceUpdate();
    }
    componentWillLoad() {
        this.localAnnotations = setDotAnnotations(this.texts) || [];
        this.predefinedComments = [];
        if (getSession() && getSession().photoAnnotationTranslations) {
            this.predefinedComments = getSession().photoAnnotationTranslations.map(translation => {
                return translation[getCurrentLanguage()];
            });
        }
        this.treatImageSrc();
        if (this.localAnnotations.length > 0) {
            this.editorState.hasInitialTexts = true;
        }
        if (this.svgData) {
            this.editorState.hasInitialSVG = true;
        }
        if (this.annotatedImgSrc) {
            if (this.stitchMode) {
                this.editorState.hasStitch = this.stitchMode;
            }
            else {
                // If it has edit and SVG Data, then we assume it is v6 - photos that were annotated on v6
                // cannot be annotated on v4, unless we support this later on by adding some sort of identifier on
                // images that have been annotated in v4 - this only applies for drawings
                this.editorState.hasInitialDrawings = true;
            }
        }
        this.initialEditorState = Object.assign({}, this.editorState);
        if (isCordova() && isIOS() && !this.readonly) {
            disableKeyboardResize(Keyboard);
        }
    }
    async componentDidLoad() {
        this.getDOMElements();
        this.initialWindowHeight = window.innerHeight;
        // Need to reset this before passing the src again to avoid an issue in iOS where
        // onload is only fired the very first time, once the image is cached it does not fire
        // any more and causes issues
        // https://bugs.chromium.org/p/chromium/issues/detail?id=7731
        this.image.src = '';
        this.image = await this.onImageLoaded();
        this.afterImageLoaded();
        this.setImageOrientation();
        if (this.canvas) {
            this.canvasContext = this.canvas.getContext('2d');
        }
        this.initInteract();
        this.photoHasLoaded = true;
    }
    afterImageLoaded() {
        this.savePhotoDimensions();
        this.saveImagePosition();
        // If SVG Data exists, we add it at this point so that it appears when the component
        // Re-renders right below
        this.setSVGData();
        this.adjustOverlaysContainer();
    }
    adjustOverlaysContainer() {
        if (this.overlaysContainer) {
            this.overlaysContainer.style.width = `${this.imageWidth}px`;
            // If the image takes full height, there is a tooltip related bug when tooltips are too high
            this.overlaysContainer.style.height = `${this.imageHeight - 0.5}px`;
        }
    }
    onImageLoaded() {
        return new Promise((resolve, reject) => {
            if (this.image) {
                this.image.onload = () => {
                    resolve(this.image);
                };
                this.image.onerror = (err) => {
                    reject(err);
                };
                this.image.src = this.treatedSrc;
            }
        });
    }
    componentWillUpdate() {
        // This avoids annotations getting lost on re-render in some cases
        this.localAnnotations = [...this.localAnnotations];
    }
    areImageDimensionsCorrect() {
        return this.image.height === this.imageHeight && this.image.width === this.imageWidth;
    }
    //TODO: separate the different parts of this function into their own methods
    componentDidUpdate() {
        this.getDOMElements();
        // If the image needs to be changed to portrait, we need to adjust
        if (!this.areImageDimensionsCorrect() && isPortrait(this.imageOrientation)) {
            this.afterImageLoaded();
            this.host.forceUpdate();
        }
        // ISSUE comes from mismatching viewboxes acrosss devices,
        // need to fix as follows
        // create a function to detect if the viewBox is different
        // if it is, then should store the difference in width and height between the two
        // then we divide this by two and if the image had previous annotations with different viewbox,
        // the position of the drawing should be scaled by those amounts 
        // Remove the last child after didUpdate to avoid issues
        if (this.afterUndo && this.svg && this.svg.lastChild) {
            this.svg.removeChild(this.svg.lastChild);
            this.afterUndo = false;
        }
        if (this.drawCanvasEdit) {
            this.drawEditedImage();
            this.drawCanvasEdit = false;
        }
        if (this.annotatedImgSrc && this.svgData && this.editSvg && !this.isSVGReplaced) {
            this.svg.parentElement.replaceChild(this.editSvg, this.svg);
            this.svg = querySelectorDeep(this.host, '.drawing-container');
            this.isSVGReplaced = true;
        }
        if (isTextMode(this.editorMode)) {
            if (!this.isUpdatingText && this.isTextButtonClicked) {
                this.isTextButtonClicked = false;
                this.focusTextInput(this.textModeTextArea);
            }
        }
        else if (isAnnotationMode(this.editorMode)) {
            if (this.isAnnotating) {
                this.focusTextInput(this.dotAnnotationTextArea);
            }
        }
    }
    componentDidUnload() {
        if (isCordova()) {
            this.clearInteractEvents();
            if (!this.readonly && isIOS()) {
                enableKeyboardResize(Keyboard);
            }
        }
    }
    treatImageSrc() {
        if (this.src) {
            let src = this.src;
            if (isBase64(src)) {
                this.treatedSrc = src;
            }
            else if (isWKWebView()) {
                src = cleanupWKWebViewImagePath(this.src);
                this.treatedSrc = src;
            }
            else {
                src = cloudinary(src);
                this.treatedSrc = src;
            }
        }
    }
    getDOMElements() {
        let svgPath;
        if (this.svg && this.svg.firstChild) {
            svgPath = this.svg.innerHTML;
        }
        this.svg = querySelectorDeep(this.host, '.drawing-container');
        if (svgPath) {
            this.svg.innerHTML = svgPath;
        }
        this.currentViewbox = this.svg.viewBox;
    }
    isFeedImage() {
        return this.host.classList.contains('feed-image');
    }
    focusTextInput(textArea) {
        if (textArea) {
            textArea.focus();
        }
    }
    setSVGData() {
        if (this.svgData) {
            let scaledSVGData = scaleSVGData(this.svgData, this.imageWidth, this.imageHeight);
            this.editSvg = parseSVG(scaledSVGData);
        }
    }
    initInteract() {
        // Required when in Cordova and readonly mode for the tap event on dot annotations
        this.initInteractDraggable();
        if (!this.readonly) {
            this.initInteractDropZone();
        }
    }
    clearInteractEvents() {
        // Remove interact to avoid event duplication
        // We only want to do this when we are not in a photo-editors context, otherwise if we try
        // to edit from the photo-editors, once the second instance of the photo-editor is closed
        // the events will disappear from the photo-editor instance in the photo-editors
        if (!this.editInPhotoEditors) {
            interact('div[draggable="true"]').unset();
        }
        if (!this.readonly) {
            interact('.delete-annotation').unset();
        }
    }
    initInteractDraggable() {
        const draggable = interact('div[draggable="true"]').draggable({
            inertia: true,
            restrict: {
                restriction: 'parent'
            },
            onmove: (event) => {
                if (!this.readonly && this.deleteFabButtonContainer) {
                    this.isDragging = true;
                    this.deleteFabButtonContainer.classList.add('fade-in');
                    this.handleDraggableMove(event);
                }
            },
            onend: (event) => {
                if (!this.readonly && this.deleteFabButtonContainer) {
                    this.handleDragEnd(event);
                    this.isDragging = false;
                    this.deleteFabButtonContainer.classList.remove('fade-in');
                    this.editorState.hasAnnotationMoved = true;
                    this.editorState.isDiscarded = false;
                }
            }
        });
        if (isCordova() && isIOS()) {
            // There is an issue on iOS where this tap seems to be triggered many times in the photo-editors
            // This could be because the interactable is added to all photo editors rather than just one
            draggable.on('tap', (event) => {
                this.handleTap(event);
            });
        }
        // Handle the click event when we have a textarea i.e. a text annotation to avoid it 
        // being triggered from the drag - this is only needed on the web side
        if (isWeb()) {
            draggable.on('tap', (event) => {
                this.handleTextAnnotationWebTap(event);
            });
        }
    }
    handleTextAnnotationWebTap(event) {
        if (isTargetTextArea(event)) {
            // Current target is the draggable object with the id corresponding to the right annotation
            const draggableTextAnnotation = event.currentTarget;
            let annotationIndex = parseInt(draggableTextAnnotation.id, 10);
            let annotation = this.localAnnotations[annotationIndex];
            this.onAddTextClicked(event, annotation);
        }
    }
    initInteractDropZone() {
        interact('.delete-annotation').dropzone({
            accept: 'div[draggable="true"]',
            overlap: 0.01,
            ondragenter: (event) => {
                // Animation is embedded in fab-button.scss
                this.deleteFabButton.classList.add('delete-animation');
                event.relatedTarget.classList.add('deleting');
            },
            ondragleave: (event) => {
                this.deleteFabButton.classList.remove('delete-animation');
                event.relatedTarget.classList.remove('deleting');
            },
            ondrop: (event) => {
                let draggableAnnotation = event.relatedTarget;
                let annotationIndex = parseInt(draggableAnnotation.id, 10);
                if (draggableAnnotation.classList.contains('deleting')) {
                    draggableAnnotation.classList.remove('deleting');
                }
                this.deleteFabButton.classList.remove('delete-animation');
                this.localAnnotations.splice(annotationIndex, 1);
                if (this.localAnnotations.length === 0) {
                    this.editorState.hasTextAnnotations = false;
                    this.editorState.hasAnnotationMoved = false;
                    this.editorState.hasDotAnnotations = false;
                    this.editorState.hasInitialTexts = false;
                    this.editorState.isDiscarded = false;
                }
            }
        });
    }
    savePhotoDimensions() {
        if (this.image) {
            let width = this.image.width;
            let height = this.image.height;
            if (this.rotateImage) {
                // Flip with width and height when image is rotated
                width = this.image.height;
                height = this.image.width;
            }
            this.imageWidth = width;
            this.imageHeight = height;
        }
    }
    saveImagePosition() {
        const pageHeight = window.innerHeight;
        const pageWidth = window.innerWidth;
        if (this.photoEditorContainer) {
            const editorHeight = this.photoEditorContainer ? this.photoEditorContainer.clientHeight : 0;
            const editorWidth = this.photoEditorContainer ? this.photoEditorContainer.clientWidth : 0;
            if (isWeb() || isFullScreenFalse()) {
                this.imageTopPosition = (editorHeight - this.imageHeight) / 2;
                this.imageLeftPosition = (pageWidth - editorWidth) / 2;
            }
            else {
                this.imageTopPosition = (pageHeight - this.imageHeight) / 2;
                this.imageLeftPosition = (pageWidth - this.imageWidth) / 2;
            }
        }
    }
    setImageOrientation() {
        // These values are fixed for web modals that are centered
        // const WEB_MODAL_WIDTH = 640;
        const WEB_MODAL_HEIGHT = 700;
        if (isCloudinaryLink(this.src) && this.isFeedImage()) {
            // If we are dealing with a feed image, we always default to landscape mode
            this.imageOrientation = 'landscape';
        }
        else {
            if (this.image) {
                const maxHeight = isWeb() ? WEB_MODAL_HEIGHT : isFullScreenFalse() ? this.photoEditorContainer.clientHeight : window.innerHeight;
                if (this.imageHeight > maxHeight) {
                    this.imageOrientation = 'portrait';
                }
                else {
                    this.imageOrientation = 'landscape';
                }
            }
        }
    }
    onTextInput(event) {
        let textInput = event.target;
        let text = textInput.value;
        let span = textInput.nextSibling;
        span.innerHTML = text;
    }
    serializeSvg(svg) {
        let s = new XMLSerializer();
        return s.serializeToString(svg);
    }
    onSave() {
        let savedData = {
            canvasData: this.canvasDataInMemory,
            height: this.imageHeight,
            width: this.imageWidth,
            svgData: this.serializeSvg(this.svg),
            texts: this.localAnnotations
        };
        // Clear previous history on save
        this.history.undos = [];
        closeModal(savedData);
    }
    onAddTextClicked(event, annotation) {
        if (!this.readonly) {
            if (event && isTargetTextArea(event) && !this.isUpdatingText) {
                this.isUpdatingText = true;
                this.updatedTextAnnotationTextArea = event.target;
                this.updatedTextAnnotation = annotation;
                // Update the current color
                this.currentColor = annotation.styles.textColor;
                if (annotation.styles.backgroundColor.includes('rgb')) {
                    this.backgroundStatus = 'on';
                }
            }
            this.isTextButtonClicked = true;
            this.isEditing = true;
            // Re-render
            this.editorMode = 'text';
        }
    }
    onDrawClicked() {
        this.isEditing = true;
        this.editorMode = 'draw';
    }
    onCancelClicked() {
        // Remove the annotation area reference if the user cancels
        this.dotAnnotationTextArea = null;
        // Re-render to return to the initial state
        this.editorMode = 'zoom';
        this.isAnnotating = false;
    }
    onAnnotateClicked() {
        // Re-render to make the annotation-overlay appear in the DOM
        this.editorMode = 'annotation';
    }
    onAnnotationOverlayClicked(event) {
        if (isAnnotationMode(this.editorMode) && !this.readonly && !this.dotAnnotationTextArea) {
            this.annotationPosition = this.getXYFromEvent(event);
            this.placeholderAnnotationPosition = Object.assign({}, this.annotationPosition);
            // In landscape, the position is relative to the image so we need adjust the height for the dot placeholder
            // this is because the xy position comes from the annotation overlay (in portrait it covers the whole viewport)
            if (isLandscape(this.imageOrientation)) {
                this.placeholderAnnotationPosition.y = (Math.abs(this.annotationPosition.y) + this.imageTopPosition);
            }
            else if (isPortrait(this.imageOrientation)) {
                this.placeholderAnnotationPosition.x = (Math.abs(this.annotationPosition.x) + this.imageLeftPosition);
            }
            this.isAnnotating = true;
        }
    }
    showAlertAndAction(action, translations) {
        showAlert(translate(translations[0]), [translate(translations[1]), translate(translations[2])], null, translate(translations[3]), 'photo-editor-alert').then(discardChanges => {
            if (discardChanges) {
                switch (action) {
                    case 'close':
                        closeModal(null);
                        break;
                    case 'clear':
                        this.saveEditState();
                        this.resetEditorState();
                        this.isEditing = false;
                        this.clearState();
                        break;
                }
                // Clear all relevant variables
            }
        });
    }
    onClearClicked() {
        if (!this.isDirty()) {
            return;
        }
        let translations = new Array('DISCARDPHOTO', 'KEEP', 'DISCARD', 'AREYOUSURE');
        this.showAlertAndAction('clear', translations);
    }
    resetEditorState() {
        this.editorState.hasDrawings = false;
        this.editorState.hasTextAnnotations = false;
        this.editorState.hasDotAnnotations = false;
        this.editorState.hasAnnotationMoved = false;
        this.editorState.hasInitialTexts = false;
        this.editorState.hasInitialDrawings = false;
        this.editorState.hasInitialSVG = false;
        this.editorState.hasStitch = false;
        this.editorState.isDiscarded = true;
    }
    onAlignTextClicked() {
        const TEXT_ALIGN_STATES = {
            left: 'center',
            center: 'right',
            right: 'left'
        };
        this.currentTextAlignment = TEXT_ALIGN_STATES[this.currentTextAlignment];
        if (this.updatedTextAnnotation && this.isUpdatingText) {
            this.updatedTextAnnotation.styles.textAlignment = this.currentTextAlignment;
        }
    }
    onColorChanged(event) {
        this.currentColor = event.detail;
        if (isTextMode(this.editorMode)) {
            if (isTextBackgroundOn(this.backgroundStatus)) {
                this.toggleBackgroundColor();
            }
            else {
                if (this.textModeTextArea && !this.isUpdatingText) {
                    this.textModeTextArea.style.color = this.currentColor;
                }
                else if (this.updatedTextAnnotationTextArea && this.isUpdatingText) {
                    this.updatedTextAnnotationTextArea.style.color = this.currentColor;
                }
            }
        }
    }
    onTextBackgroundClicked() {
        const TEXT_BACKGROUND_STATES = {
            on: 'off',
            off: 'on'
        };
        this.backgroundStatus = TEXT_BACKGROUND_STATES[this.backgroundStatus];
        this.toggleBackgroundColor();
    }
    onDoneClicked() {
        if (isTextMode(this.editorMode)) {
            // RESET default to white for the next annotation
            this.currentColor = WHITE;
            if (this.textModeTextArea && !this.isUpdatingText) {
                this.saveTextAnnotation(this.textModeTextArea);
            }
            else if (this.isUpdatingText && this.updatedTextAnnotationTextArea) {
                this.saveTextAnnotation(this.updatedTextAnnotationTextArea);
                this.isUpdatingText = false;
                // Clear reference to the updated text annotation
                this.updatedTextAnnotation = null;
                this.updatedTextAnnotationTextArea = null;
            }
            this.backgroundStatus = 'off';
            this.currentTextAlignment = 'center';
        }
        else if (isAnnotationMode(this.editorMode)) {
            // Need to create the annotation and add it to the DOM at the correct position
            this.isAnnotating = false;
            if (this.dotAnnotationTextArea) {
                this.saveDotAnnotation();
            }
        }
        this.isEditing = false;
        this.editorMode = 'zoom';
    }
    onZoomClick() {
        if (this.readonly) {
            this.zoomClicked.emit(true);
            this.hideText();
        }
    }
    onBackButtonClicked() {
        if (!this.hasEditorStateChanged()) {
            closeModal(null);
            return;
        }
        let translations = new Array('DISCARDPHOTO', 'KEEP', 'DISCARD', 'AREYOUSURE');
        this.showAlertAndAction('close', translations);
    }
    onSingleSliderChanged(event) {
        if (isTextMode(this.editorMode)) {
            let pixelFont = event.detail;
            let remFont = pixelFont / 16;
            this.changeTextInputFontSize(remFont);
            if (this.textModeTextArea && !this.isUpdatingText) {
                adjustTextArea(this.textModeTextArea);
            }
            else if (this.updatedTextAnnotationTextArea && this.isUpdatingText) {
                adjustTextArea(this.updatedTextAnnotationTextArea, false);
            }
        }
        else if (isDrawMode(this.editorMode)) {
            this.lineWidth = event.detail;
        }
    }
    onUndoClicked() {
        if (this.editorState.hasDrawings) {
            this.restoreLastState();
        }
    }
    saveTextAnnotation(textArea) {
        let percentX;
        let percentY;
        let widthHeightRatio;
        let textAreaPosition = { x: 0, y: 0 };
        // Calculate the percentage position of the text so that it can be recovered
        textAreaPosition.x = textArea.offsetLeft;
        textAreaPosition.y = textArea.offsetTop;
        let textColor = textArea.style.color;
        const text = textArea.value;
        const backgroundColor = textArea.style.backgroundColor;
        const fontSize = textArea.style.fontSize;
        const width = textArea.style.width;
        const height = textArea.style.height;
        const textAlignment = this.currentTextAlignment;
        // UPDATE TEXT - This flow is for when the user is updating the text or size of the textarea
        if (this.isUpdatingText && this.updatedTextAnnotation) {
            // this refers to the annotation object currently being updated
            if (this.isNotEmptyText(text)) {
                //TODO: make a method using destructuring to populate this object
                // Compute new position
                [percentX, percentY, widthHeightRatio] = this.computeAnnotationWidthHeightRatio(textAreaPosition);
                this.updatedTextAnnotation.percent_x = percentX;
                this.updatedTextAnnotation.percent_y = percentY;
                this.updatedTextAnnotation.width_height_ratio = widthHeightRatio;
                this.updatedTextAnnotation.text = text;
                this.updatedTextAnnotation.styles.textAlignment = textAlignment;
                this.updatedTextAnnotation.styles.textColor = textColor;
                this.updatedTextAnnotation.styles.backgroundColor = backgroundColor;
                this.updatedTextAnnotation.styles.fontSize = fontSize;
                this.updatedTextAnnotation.styles.width = width;
                this.updatedTextAnnotation.styles.height = height;
                this.editorState.hasTextAnnotations = true;
                this.editorState.isDiscarded = false;
            }
            // ADD NEW TEXT
        }
        else {
            if (textColor === '') {
                textColor = WHITE;
            }
            if (this.isNotEmptyText(text)) {
                [percentX, percentY, widthHeightRatio] = this.computeAnnotationWidthHeightRatio(textAreaPosition);
                let styles = {
                    textColor,
                    backgroundColor,
                    fontSize,
                    width,
                    height,
                    textAlignment
                };
                let newAnnotation = {
                    text,
                    type: 'text',
                    percent_x: percentX,
                    percent_y: percentY,
                    width_height_ratio: widthHeightRatio,
                    styles
                };
                this.localAnnotations.push(newAnnotation);
                this.editorState.hasTextAnnotations = true;
                this.editorState.isDiscarded = false;
            }
        }
    }
    updateAnnotationPosition(annotation, updatedPosition) {
        [annotation.percent_x, annotation.percent_y, annotation.width_height_ratio] = this.computeAnnotationWidthHeightRatio(updatedPosition);
        return annotation;
    }
    saveDotAnnotation() {
        if (this.dotAnnotationTextArea.value !== '') {
            let percentX;
            let percentY;
            let widthHeightRatio;
            [percentX, percentY, widthHeightRatio] = this.computeAnnotationWidthHeightRatio(this.annotationPosition);
            let newAnnotation = {
                text: this.dotAnnotationTextArea.value,
                type: 'dot',
                percent_x: percentX,
                percent_y: percentY,
                width_height_ratio: widthHeightRatio
            };
            this.localAnnotations.push(newAnnotation);
            this.editorState.hasDotAnnotations = true;
            this.editorState.isDiscarded = false;
        }
        // Empty the annotation are object for the next annotation - maybe better to handle this with a state
        this.dotAnnotationTextArea = null;
    }
    computeAnnotationWidthHeightRatio(position) {
        let percentX = isWeb() ? position.x / this.imageWidth : position.x / this.imageWidth;
        let percentY = isWeb() ? position.y / this.imageHeight : isPortrait(this.imageOrientation) ? position.y / this.initialWindowHeight : position.y / this.imageHeight;
        let widthHeightRatio = this.imageWidth / this.imageHeight;
        return [percentX, percentY, widthHeightRatio];
    }
    toggleBackgroundColor() {
        if (isTextBackgroundOn(this.backgroundStatus)) {
            if (this.textModeTextArea && !this.isUpdatingText) {
                this.setTextAreaBackground(this.textModeTextArea);
            }
            else if (this.updatedTextAnnotationTextArea && this.isUpdatingText) {
                this.setTextAreaBackground(this.updatedTextAnnotationTextArea);
            }
        }
        else if (isTextBackgroundOff(this.backgroundStatus)) {
            if (this.textModeTextArea && !this.isUpdatingText) {
                this.removeTextAreaBackground(this.textModeTextArea);
            }
            else if (this.updatedTextAnnotationTextArea && this.isUpdatingText) {
                this.removeTextAreaBackground(this.updatedTextAnnotationTextArea);
            }
        }
    }
    setTextAreaBackground(textArea) {
        let _currentColor = this.currentColor;
        textArea.style.background = _currentColor;
        this.isColorWhite() ? textArea.style.color = BLACK : textArea.style.color = WHITE;
        if (this.updatedTextAnnotation && this.updatedTextAnnotation.styles) {
            this.updatedTextAnnotation.styles.textColor = this.isColorWhite() ? BLACK : WHITE;
            this.updatedTextAnnotation.styles.backgroundColor = _currentColor;
        }
    }
    //TODO: this can be turned into a pure function
    removeTextAreaBackground(textArea) {
        textArea.style.background = 'none';
        textArea.style.color = this.currentColor;
        textArea.setAttribute('caret-color', this.currentColor);
    }
    changeTextInputFontSize(fontSize) {
        if (this.textModeTextArea) {
            this.textModeTextArea.style.setProperty('font-size', `${fontSize}rem`);
        }
        if (this.updatedTextAnnotationTextArea && this.isUpdatingText) {
            this.updatedTextAnnotationTextArea.style.setProperty('font-size', `${fontSize}rem`);
            this.updatedTextAnnotation.styles.fontSize = `${fontSize}rem`;
        }
    }
    onCanvasMouseDown(event) {
        event.stopPropagation();
        if (isDrawMode(this.editorMode) && !this.readonly) {
            this.handleMouseMove = true;
            this.handleEventStart(event);
        }
    }
    onCanvasMouseUp(event) {
        event.stopPropagation();
        if (isDrawMode(this.editorMode) && !this.readonly) {
            this.isDrawing = false;
            this.handleMouseMove = false;
            this.handleEventEnd(event);
        }
    }
    onCanvasMouseMove(event) {
        event.stopPropagation();
        if (isDrawMode(this.editorMode) && !this.readonly && this.handleMouseMove) {
            this.handleMove(event);
        }
    }
    onCanvasTouchStart(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isDrawMode(this.editorMode) && !this.readonly) {
            if (this.zoomComponent) {
                this.zoomComponent.lockPan = true;
            }
            this.handleEventStart(event);
        }
    }
    onCanvasTouchEnd(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isDrawMode(this.editorMode) && !this.readonly) {
            // finished drawing
            this.isDrawing = false;
            this.handleEventEnd(event);
        }
    }
    onCanvasTouchMove(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isDrawMode(this.editorMode) && !this.readonly) {
            if (this.zoomComponent) {
                this.zoomComponent.lockPan = true;
            }
            this.handleMove(event);
        }
    }
    handleDragEnd(event) {
        const targetAnnotation = event.target;
        if (targetAnnotation) {
            // The lastDragPosition will be the last position recorded when the drag ends
            this.updateDraggedAnnotation(targetAnnotation, this.lastDragPosition);
            this.editorState.hasAnnotationMoved = true;
            this.editorState.isDiscarded = false;
        }
    }
    handleTap(event) {
        const tooltip = event.currentTarget.querySelector('yoo-tooltip');
        if (tooltip) {
            if (this.isTooltipShowing) {
                // tooltip._tippy.hide();
            }
            else {
                tooltip._tippy.show();
            }
        }
    }
    handleDraggableMove(event) {
        let targetAnnotation = event.target;
        this.initialDragPosition = {
            x: parseFloat(targetAnnotation.style.left),
            y: parseFloat(targetAnnotation.style.top)
        };
        // Keep the dragged position in the data-x/data-y attributes
        let posX = this.initialDragPosition.x + event.dx;
        let posY = this.initialDragPosition.y + event.dy;
        // Need the dimensions of the annotation in order to restrict the drag
        let annotationDimensions = {
            width: targetAnnotation.clientWidth,
            height: targetAnnotation.clientHeight
        };
        // Text Annotations have the dimensions on the TextArea
        if (targetAnnotation.firstChild.tagName === 'TEXTAREA') {
            annotationDimensions.width = targetAnnotation.firstChild.clientWidth;
            annotationDimensions.height = targetAnnotation.firstChild.clientHeight;
        }
        let restrictedPosition = {
            x: posX,
            y: posY
        };
        restrictedPosition = limitDragPosition(restrictedPosition, this.imageHeight, this.imageWidth, annotationDimensions, isPortrait(this.imageOrientation));
        targetAnnotation.style.top = `${restrictedPosition.y}px`;
        targetAnnotation.style.left = `${restrictedPosition.x}px`;
        this.lastDragPosition = restrictedPosition;
    }
    updateDraggedAnnotation(targetAnnotation, updatedPosition) {
        const annotationIndex = parseInt(targetAnnotation.id, 10);
        let annotation = this.localAnnotations[annotationIndex];
        const updatedAnnotation = this.updateAnnotationPosition(annotation, updatedPosition);
        this.localAnnotations[annotationIndex] = updatedAnnotation;
    }
    isDotAnnotationContainer(target) {
        return target.classList.contains('annotation-container');
    }
    onDragOver(event) {
        if (!this.readonly) {
            event.preventDefault();
        }
    }
    onTooltipShown(tippy) {
        this.isTooltipShowing = true;
        this.setTooltipStyles(tippy);
    }
    setTooltipStyles(tippy) {
        const popperInstance = tippy.popper.firstChild;
        popperInstance.style.paddingTop = '10px';
        popperInstance.style.paddingBottom = '10px';
        popperInstance.style.wordBreak = 'break-word';
    }
    handleEventStart(event) {
        const xy = this.getXYFromEvent(event);
        this.lastX = xy.x;
        this.lastY = xy.y;
        this.canvasContext.beginPath();
        this.setSVGPathAttributes();
        this.currentSVGPathD = '';
        this.svg.appendChild(this.currentSVGPath);
        this.isDrawing = true;
        // Save state at the start of draw so it works
        this.saveEditState();
    }
    handleMove(event) {
        const xy = this.getXYFromEvent(event);
        if (this.isDrawing) {
            this.currentX = xy.x;
            this.currentY = xy.y;
            this.drawLine(this.lastX, this.lastY, this.currentX, this.currentY);
            this.lastX = this.currentX;
            this.lastY = this.currentY;
            this.canvasDataInMemory = this.canvas.toDataURL();
            event.stopPropagation();
        }
    }
    handleEventEnd(event) {
        // this.saveEditState();
    }
    getXYFromEvent(event) {
        let coords = { x: 0, y: 0 };
        [coords.x, coords.y] = this.getXY(event, coords);
        /**
         * We do not run this part when in emulate and fullscreen = false
         */
        if (isCanvasCurrentTarget(event) && !isWeb() && !isFullScreenFalse()) {
            [coords.x, coords.y] = this.getXYWithParent(event, coords);
        }
        if (isDrawMode(this.editorMode) && !isSameViewbox(this.imageHeight, this.imageWidth, this.currentViewbox)) {
            const viewboxZoom = computeViewboxZoom(this.imageHeight, this.imageWidth, this.currentViewbox);
            coords.x /= viewboxZoom;
            coords.y /= viewboxZoom;
        }
        if (isWeb()) {
            return coords;
        }
        else {
            return this.getXYWithZoomTransforms(coords);
        }
    }
    saveTransforms(event) {
        let { currentScale, adjustDeltaX, adjustDeltaY } = event.detail;
        this.scale = currentScale;
        this.scrollX = adjustDeltaX;
        this.scrollY = adjustDeltaY;
    }
    getXY(event, { x, y }) {
        // Safari and Firefox go into this block (drawings, annotations), Chrome goes here when clicking annotation overlay
        // iOS goes into this block for dot annotations
        if (event.offsetX !== undefined) {
            x = event.offsetX;
            y = event.offsetY;
            // If the user cliks the text span, we need to use clientY and clientX instead when in emulate
            if (isTargetSpan(event) && !isFullScreenFalse()) {
                y = event.clientY - this.imageTopPosition;
                x = event.clientX;
            }
            // We use the offset when in fullscreen mode and clicking on the span, y position should always be the center of the image
            if (isTargetSpan(event) && isFullScreenFalse()) {
                y = this.imageHeight / 2;
                x = event.clientX - this.imageLeftPosition;
            }
        }
        else {
            if (event.targetTouches && event.targetTouches[0]) {
                // Account for touchEvent offset on Chrome emulate and for Firefox (if TouchSimulation is ON)
                if (!isCordova() && isLandscape(this.imageOrientation)) {
                    x = event.targetTouches[0].pageX - this.imageLeftPosition;
                    y = event.targetTouches[0].pageY - this.imageTopPosition;
                }
                else {
                    // iOS && Android go here (drawings)
                    // Only needs to be done for touch events during drawing mode
                    x = event.targetTouches[0].pageX;
                    y = event.targetTouches[0].pageY;
                    // Account for targetTouches offset when doing drawings
                    if (isDrawMode(this.editorMode)) {
                        y = y - this.imageTopPosition;
                        x = x - this.imageLeftPosition;
                    }
                }
            }
            if (event.type === 'touchend' && event.changedTouches[0]) {
                x = event.changedTouches[0].pageX;
                y = event.changedTouches[0].pageY;
            }
        }
        return [x, y];
    }
    /* Compute XY if the canvas has a parent element */
    getXYWithParent(event, { x, y }) {
        let parent = event.currentTarget ? event.currentTarget.offsetParent : null;
        if (parent) {
            while (parent) {
                x -= parent.offsetLeft;
                y -= parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        else if (event.currentTarget) {
            x = x - event.currentTarget.offsetLeft;
            y = y - event.currentTarget.offsetTop;
        }
        return [x, y];
    }
    getXYWithZoomTransforms({ x, y }) {
        // Overflow --> number of pixels that are outside the zoomed view
        let overflowX = (this.scale * this.imageWidth) - this.imageWidth;
        let overflowY = (this.scale * this.imageHeight) - this.imageHeight;
        // Edges --> actual positions of the top and left edge of the zoomed-in frame
        let leftEdge = this.scrollX > 0 ? overflowX / 2 - this.scrollX * this.scale : overflowX / 2 + (Math.abs(this.scrollX) * this.scale);
        let topEdge = this.scrollY > 0 ? overflowY / 2 - this.scrollY * this.scale : overflowY / 2 + (Math.abs(this.scrollY) * this.scale);
        let finalCoords = { x: (x + leftEdge) / this.scale, y: (y + topEdge) / this.scale };
        return finalCoords;
    }
    // https://stackoverflow.com/questions/10546135/appending-path-child-within-svg-using-javascript
    drawLine(lastX, lastY, currentX, currentY) {
        this.editorState.hasDrawings = true;
        this.editorState.isDiscarded = false;
        // M --> moveTo; L --> lineTo
        this.currentSVGPathD += `M${lastX} ${lastY} L${currentX} ${currentY}`;
        this.currentSVGPath.setAttributeNS(null, 'd', this.currentSVGPathD);
        this.canvasContext.moveTo(lastX, lastY);
        this.canvasContext.lineTo(currentX, currentY);
        this.canvasContext.lineWidth = this.lineWidth;
        this.canvasContext.strokeStyle = this.currentColor;
        this.canvasContext.stroke();
    }
    setSVGPathAttributes() {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'stroke', this.currentColor);
        path.setAttributeNS(null, 'stroke-width', this.lineWidth.toString());
        path.setAttributeNS(null, 'opacity', '1');
        this.currentSVGPath = path;
    }
    clearState() {
        // Clear SVG
        if (this.svg) {
            while (this.svg.lastChild && this.svg.lastChild.nodeName === 'path') {
                this.svg.removeChild(this.svg.lastChild);
            }
        }
        if (this.annotatedImgSrc) {
            this.annotatedImgSrc = null;
        }
        this.clearCanvas();
        this.editorState.isDiscarded = true;
        this.editorMode = 'zoom';
        this.host.forceUpdate();
    }
    clearCanvas() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Reset canvas data that will be emitted
        this.canvasDataInMemory = this.canvas.toDataURL();
        this.localAnnotations = [];
    }
    restoreLastState() {
        if (this.history.undos.length > 0) {
            const previousState = this.history.undos.pop();
            let image = new Image();
            image.onload = () => {
                // Clear the canvas
                this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.canvasContext.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
                this.canvasDataInMemory = this.canvas.toDataURL();
            };
            image.src = previousState.canvasData;
            if (this.svg) {
                if (this.history.undos.length === 0) {
                    this.editorState.isDiscarded = false;
                    this.editorState.hasDrawings = false;
                }
                this.afterUndo = true;
                this.host.forceUpdate();
            }
        }
    }
    drawEditedImage() {
        if (this.annotatedImgSrc) {
            if (this.annotatedImgSrc.toString().startsWith('http') && this.annotatedImgSrc.toString().indexOf(this.googleStorageApiUrl) < 0) {
                this.editImage.crossOrigin = 'Anonymous';
            }
            // Draw the previous edit image on the canvas
            this.editImage.onload = () => {
                if (this.editImage) {
                    this.canvasContext.imageSmoothingEnabled = false;
                    this.canvasContext.drawImage(this.editImage, 0, 0, this.imageWidth, this.imageHeight);
                    this.canvasDataInMemory = this.canvas.toDataURL();
                }
            };
            this.editImage.src = this.annotatedImgSrc;
        }
    }
    saveEditState() {
        if (isTextMode(this.editorMode)) {
            // Canvas resize once the keyboard shows up in Android; so need to use canvas data before resizing
            this.history.undos.push({ data: this.canvasDataInMemory, width: this.canvas.width, height: this.canvas.height, texts: [...this.localAnnotations] });
        }
        else {
            this.history.undos.push(this.getEditState());
        }
    }
    showMoreActionSheet() {
        showActionSheet([
            { text: translate('DOWNLOAD'), isVisible: () => true, handler: () => downloadFile(this.src, this.description) }
        ]);
    }
    getEditState() {
        let canvas = this.canvas;
        let editState = {
            canvasData: canvas.toDataURL(),
            width: canvas.width || this.imageWidth,
            height: canvas.height || this.imageHeight,
            texts: [...this.localAnnotations],
            svgData: this.serializeSvg(this.svg),
            svgElement: this.svg
        };
        return editState;
    }
    getAnnotationTopPosition(annotation) {
        if (this.canvas) {
            const top = `${(Math.abs(annotation.percent_y) * (isPortrait(this.imageOrientation) ? this.initialWindowHeight : this.imageHeight))}px`;
            return top;
        }
    }
    getAnnotationLeftPosition(annotation) {
        if (this.canvas) {
            const left = `${(this.imageWidth * annotation.percent_x)}px`;
            return left;
        }
    }
    onAddPredefinedCommentsClicked() {
        let autoCompleteDialog = document.createElement('yoo-form-autocomplete-dialog');
        autoCompleteDialog.multiple = true;
        autoCompleteDialog.displayType = 'card-list';
        autoCompleteDialog.openFullscreen = true;
        autoCompleteDialog.values = this.predefinedComments;
        showModal(autoCompleteDialog, {}, null, 'slideYEnterAnimation', 'slideYLeaveAnimation', true).then(retVal => {
            if (retVal && retVal.data) {
                const predefinedComments = retVal.data;
                if (isTextMode(this.editorMode) && !this.isUpdatingText) {
                    this.addPredefinedCommentInTextarea(this.textModeTextArea, predefinedComments);
                }
                else if (isAnnotationMode(this.editorMode)) {
                    this.addPredefinedCommentInTextarea(this.dotAnnotationTextArea, predefinedComments);
                }
                else if (isTextMode(this.editorMode) && this.isUpdatingText) {
                    this.addPredefinedCommentInTextarea(this.updatedTextAnnotationTextArea, predefinedComments);
                }
            }
            autoCompleteDialog = null;
        });
    }
    addPredefinedCommentInTextarea(textArea, predefinedComments) {
        if (textArea && predefinedComments) {
            const previousTextValue = textArea.value;
            let finalComment = '';
            predefinedComments.forEach(comment => {
                finalComment += `${comment}\n`;
            });
            const finalText = `${previousTextValue}${previousTextValue !== '' ? '\n' : ''}${finalComment}`;
            textArea.value = finalText;
            textArea.innerHTML = finalText;
            adjustTextArea(textArea);
        }
    }
    renderColorPicker() {
        return (h("yoo-color-selector", { class: "color-selector", colors: this.colors, onColorChanged: (event) => this.onColorChanged(event) }));
    }
    renderWriteTools() {
        return (this.isEditing || this.isAnnotating ?
            h("div", { class: {
                    'toolbar-edit': true,
                    'annotating': this.isAnnotating,
                    'toolbar-edit-drawmode': isDrawMode(this.editorMode),
                    'portrait': isPortrait(this.imageOrientation)
                } },
                this.renderTextModeToolbar(),
                isDrawMode(this.editorMode) && h("div", { class: "undo", onClick: () => this.onUndoClicked() },
                    h("span", null, translate('UNDO'))),
                this.isAnnotating && isAnnotationMode(this.editorMode) && h("div", { class: "cancel", onClick: () => this.onCancelClicked() },
                    h("span", null, translate('CANCEL'))),
                this.isAnnotating && isAnnotationMode(this.editorMode) && this.renderPredefinedCommentsButton(),
                h("div", { class: {
                        'done': true,
                        'text': isTextMode(this.editorMode)
                    }, onClick: () => this.onDoneClicked() },
                    h("span", null, translate('DONE'))))
            : this.renderMenuToolbar());
    }
    renderPredefinedCommentsButton() {
        return this.predefinedComments.length > 0 && h("div", { class: "predefined-comments", onClick: () => this.onAddPredefinedCommentsClicked() },
            h("span", null,
                h("yoo-icon", { class: "yo-text-predefined" })));
    }
    renderTextModeToolbar() {
        return (isTextMode(this.editorMode) &&
            h("div", { class: "text-editor-tools" },
                h("div", { class: "align-text", onClick: () => this.onAlignTextClicked() },
                    h("span", null,
                        h("yoo-icon", { class: 'yo-align-' + this.currentTextAlignment }))),
                h("div", { class: "text-background", onClick: () => this.onTextBackgroundClicked() },
                    h("span", null,
                        h("yoo-icon", { class: 'yo-background-' + this.backgroundStatus }))),
                this.renderPredefinedCommentsButton()));
    }
    renderModalToolbar() {
        return [
            isPortrait(this.imageOrientation) && h("div", { class: "toolbar-shadow-portrait" }),
            this.isModal &&
                h("div", { ref: (el) => this.modalToolbar = el, class: `action-buttons ${(isPortrait(this.imageOrientation) ? 'shadow' : '')}` },
                    h("div", { class: {
                            'close': true,
                            'back-button': this.isBackBtn
                        } },
                        h("yoo-button", { icon: this.isBackBtn ? 'yo-left' : 'yo-close', class: "icon-only transparent", onClick: () => this.onBackButtonClicked() })),
                    h("div", { class: "more" },
                        h("yoo-button", { icon: "yo-more", class: "icon-only transparent", onClick: () => this.showMoreActionSheet() })))
        ];
    }
    renderMenuToolbar() {
        return ([
            h("div", { class: {
                    'action-buttons': true,
                    'portrait': isPortrait(this.imageOrientation)
                }, style: {
                    'opacity': isAnnotationMode(this.editorMode) ? '0' : '1'
                } },
                h("div", { class: "close menu" },
                    h("span", { onClick: () => this.onBackButtonClicked() },
                        h("yoo-icon", { class: "yo-left" }))),
                h("div", { class: "editing-tools" },
                    h("div", { class: "clear", onClick: () => this.onClearClicked() },
                        h("span", null,
                            h("yoo-icon", { class: "yo-rubber" }))),
                    h("div", { class: "draw", onClick: () => this.onDrawClicked() },
                        h("span", null,
                            h("yoo-icon", { class: "yo-brush" }))),
                    h("div", { class: "annotate", onClick: () => this.onAnnotateClicked() },
                        h("span", null,
                            h("yoo-icon", { class: "yo-dot" }))),
                    h("div", { class: "add-text", onClick: () => this.onAddTextClicked() },
                        h("span", null,
                            h("yoo-icon", { class: "yo-type-tool" })))))
        ]);
    }
    getCanvasEvents() {
        let eventsToBind = {};
        if (isCordova()) {
            eventsToBind = {
                onTouchStart: (event) => this.onCanvasTouchStart(event),
                onTouchEnd: (event) => this.onCanvasTouchEnd(event),
                onTouchMove: (event) => this.onCanvasTouchMove(event)
            };
        }
        else if (isSafari()) {
            eventsToBind = {
                onMouseDown: (event) => this.onCanvasMouseDown(event),
                onMouseUp: (event) => this.onCanvasMouseUp(event),
                onMouseMove: (event) => this.onCanvasMouseMove(event)
            };
        }
        else {
            // Chrome, Firefox
            eventsToBind = {
                onPointerDown: (event) => this.onCanvasTouchStart(event),
                onPointerUp: (event) => this.onCanvasTouchEnd(event),
                onPointerMove: (event) => this.onCanvasTouchMove(event)
            };
        }
        return eventsToBind;
    }
    renderCanvas() {
        return (h("canvas", Object.assign({ class: {
                'canvas': true,
                'editing': this.isEditing,
                'text-mode': isTextMode(this.editorMode)
            }, width: this.imageWidth, height: this.imageHeight, ref: el => this.canvas = el }, this.getCanvasEvents())));
    }
    renderAnnotationMode() {
        return (isAnnotationMode(this.editorMode) &&
            h("div", { class: "annotations-overlay", onClick: (event) => this.onAnnotationOverlayClicked(event) }, this.isAnnotating ?
                h("textarea", { ref: (el) => this.dotAnnotationTextArea = el, class: "dot-annotation-input", style: {
                        maxWidth: `${this.imageWidth}px`
                    }, onInput: (event) => {
                        let textArea = event.target;
                        adjustTextArea(textArea, false);
                    }, wrap: "off" })
                : !this.isUpdatingText && h("span", { class: "annotation-placeholder" }, translate('TAPTOINSERTCOMMENT'))));
    }
    onDotAnnotationTextareaBlur(event) {
        this.onDoneClicked();
    }
    renderTextMode() {
        return (this.isEditing && isTextMode(this.editorMode) && !this.isUpdatingText &&
            h("div", { class: `text-input-container text-${this.currentTextAlignment}` },
                h("textarea", { ref: (el) => this.textModeTextArea = el, wrap: "off", class: "text-input", style: { maxWidth: `${this.imageWidth}px`, maxHeight: `${this.imageHeight}px` }, onInput: (event) => {
                        let textArea = event.target;
                        adjustTextArea(textArea);
                    } })));
    }
    renderAnnotationsPlaceholder() {
        let dotAnnotations = this.localAnnotations.filter((annotation) => isDotAnnotation(annotation));
        return h("div", { class: "annotations-placeholder", ref: (el) => this.annotationsPlaceholder = el },
            this.photoHasLoaded ? this.localAnnotations.map((annotation, index) => {
                // For each annotation type we pass the index as the ID of the annotation
                // This way we can recover the correct one from the originalElement moved
                // during the drag event; dotIndex ensures the dotAnnotations are numbered correctly
                if (isTextAnnotation(annotation)) {
                    return (this.isUpdatingText && this.isUpdatedTextAnnotation(annotation) ?
                        h("div", { class: 'text-annotation-update ' + `text-${this.currentTextAlignment}` }, this.renderTextAnnotationTextArea(annotation)) :
                        this.renderTextAnnotation(annotation, false, index));
                }
                else if (isDotAnnotation(annotation)) {
                    const dotIndex = dotAnnotations.indexOf(annotation);
                    return this.renderDotAnnotation(annotation, dotIndex, index);
                }
            }) : null,
            isLandscape(this.imageOrientation) ? this.renderDeleteAnnotationButton() : null);
    }
    getTextAnnotationStyles(annotation) {
        return {
            color: annotation.styles.textColor,
            background: annotation.styles.backgroundColor,
            fontSize: annotation.styles.fontSize,
            width: annotation.styles.width,
            height: annotation.styles.height
        };
    }
    hideText() {
        if (this.readonly && !this.isFeedImage()) {
            this.imageFocus = !this.imageFocus;
            if (this.modalToolbar) {
                //TODO: can refactor this to add a class instead and offload the work to css
                if (this.imageFocus && this.descriptionContainer) {
                    this.descriptionContainer.style.display = 'none';
                    this.modalToolbar.style.display = 'none';
                }
                else {
                    this.descriptionContainer.style.display = 'block';
                    this.modalToolbar.style.display = 'flex';
                }
            }
        }
    }
    renderTextAnnotation(annotation, updating, index) {
        let zIndex = updating ? '11' : '3';
        return (h("div", { class: "text-annotation-container", id: `${index}`, draggable: true, style: {
                top: this.getAnnotationTopPosition(annotation),
                left: this.getAnnotationLeftPosition(annotation),
                zIndex,
                width: annotation.styles.width,
                height: annotation.styles.height
            } }, this.renderTextAnnotationTextArea(annotation)));
    }
    renderTextAnnotationTextArea(annotation) {
        return (h("textarea", { id: annotation.text, class: `text-annotation text-${annotation.styles.textAlignment}`, wrap: "off", value: annotation.text, onClick: (event) => {
                if (!isWeb()) {
                    this.onAddTextClicked(event, annotation);
                }
            }, onInput: (event) => {
                let textArea = event.target;
                adjustTextArea(textArea, false);
            }, innerHTML: annotation.text, style: Object.assign({ maxWidth: `${this.imageWidth}px`, maxHeight: `${this.imageHeight}px` }, this.getTextAnnotationStyles(annotation)) }));
    }
    renderDotAnnotation(annotation, dotIndex, index) {
        return (h("div", { id: `${index}`, class: "annotation-container", draggable: true, style: { top: this.getAnnotationTopPosition(annotation), left: this.getAnnotationLeftPosition(annotation) } },
            h("yoo-tooltip", { id: `${index}`, content: annotation.text, options: {
                    theme: 'dark',
                    placement: 'top',
                    flipBehavior: ['right', 'left', 'bottom'],
                    size: 'medium',
                    distance: '10',
                    onShow: (tippy) => this.onTooltipShown(tippy),
                    onHide: () => {
                        this.isTooltipShowing = false;
                    },
                    appendTo: this.annotationsPlaceholder,
                    trigger: 'click',
                    // touchHold: isCordova() && isIOS(),
                    zIndex: 99999
                } },
                h("div", { class: "tooltip-number" }, dotIndex + 1))));
    }
    renderDeleteAnnotationButton() {
        return (h("yoo-fab-container", { ref: (el) => this.deleteFabButtonContainer = el, class: "bottom center delete-annotation" },
            h("yoo-fab-button", { class: "large delete", ref: (el) => this.deleteFabButton = el, icon: "yo-delete", buttonClass: "icon-only-delete" })));
    }
    renderSlider() {
        const textMode = isTextMode(this.editorMode);
        const MAX_FONT_SIZE = 35, MIN_FONT_SIZE = 10, MAX_LINE_WIDTH = 15, MIN_LINE_WIDTH = 1, INITIAL_FONT_SIZE = 20, INITIAL_LINE_WIDTH = 4;
        return isIOS() && isCordova() ? h("yoo-slider", { onSingleSliderChanged: (event) => this.onSingleSliderChanged(event), showTriangleBackground: true, orientation: "vertical", primaryValue: textMode ? INITIAL_FONT_SIZE : this.lineWidth || INITIAL_LINE_WIDTH, minValue: textMode ? MIN_FONT_SIZE : MIN_LINE_WIDTH, maxValue: textMode ? MAX_FONT_SIZE : MAX_LINE_WIDTH, isDoubleSlider: false }) :
            h("yoo-form-slider", { minimum: textMode ? MIN_FONT_SIZE : MIN_LINE_WIDTH, maximum: textMode ? MAX_FONT_SIZE : MAX_LINE_WIDTH, initialValue: textMode ? INITIAL_FONT_SIZE : this.lineWidth, onSingleSliderChanged: (event) => this.onSingleSliderChanged(event), hideLabel: true, hideReferences: true, class: "triangle t-vertical" });
    }
    renderSrcImage() {
        return (h("img", { class: "image", ref: (el) => this.image = el, src: this.treatedSrc }));
    }
    renderSVG() {
        const height = this.imageHeight;
        const width = this.imageWidth;
        return (h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "drawing-container", height: height, width: width, viewBox: `0 0 ${width} ${height}` }));
    }
    renderEditedImage() {
        return (h("img", { ref: el => this.editImage = el, class: {
                'image edit': true
            } }));
    }
    renderNewAnnotationsPlaceholder() {
        return (h("div", { class: "new-annotations-placeholder" }, this.isAnnotating && h("div", { class: "annotation-container", style: {
                top: `${this.placeholderAnnotationPosition.y}px`,
                left: `${this.placeholderAnnotationPosition.x}px`,
                zIndex: '10'
            } })));
    }
    renderPhotoEditorBody() {
        return (h("div", { class: "photo-editor-body" },
            this.renderSrcImage(),
            this.renderCanvas(),
            h("div", { class: "overlays-container", ref: (el) => this.overlaysContainer = el },
                this.annotatedImgSrc && this.renderEditedImage(),
                this.renderSVG(),
                this.renderTextMode(),
                this.renderAnnotationsPlaceholder(),
                this.renderAnnotationMode()),
            this.renderNewAnnotationsPlaceholder(),
            h("div", { ref: (el) => this.descriptionContainer = el, class: "description-container" }, this.description && h("span", null, this.description)),
            h("div", { class: "annotation-delete-container" }, isPortrait(this.imageOrientation) && this.renderDeleteAnnotationButton()),
            this.isEditing && !this.stitchMode && this.renderSlider(),
            this.isEditing && !this.stitchMode && this.renderColorPicker()));
    }
    // UTILITY METHODS
    isCurrentColor(color) {
        return (this.currentColor === color);
    }
    isSaveButtonVisible() {
        return !this.isDragging && isZoomMode(this.editorMode) && this.hasEditorStateChanged() && this.isDirty();
    }
    isColorWhite(color) {
        if (color) {
            return color === WHITE;
        }
        return this.currentColor === WHITE;
    }
    isNotEmptyText(text) {
        return text !== '';
    }
    areTouchMovesWithinDistance(start, end, threshold) {
        if (!end || !start) {
            return false;
        }
        return !(Math.abs(end.x - start.x) > threshold || Math.abs(end.y - start.y) > threshold);
    }
    isUpdatedTextAnnotation(annotation) {
        return annotation === this.updatedTextAnnotation;
    }
    hasEditorStateChanged() {
        for (let state in this.editorState) {
            if (this.editorState[state] !== this.initialEditorState[state]) {
                if (state === 'isDiscarded') {
                    continue;
                }
                return true;
            }
        }
        return false;
    }
    isDirty() {
        let { hasTextAnnotations, hasDrawings, hasDotAnnotations, hasAnnotationMoved, hasInitialSVG, hasInitialDrawings, hasInitialTexts, hasStitch, isDiscarded } = this.editorState;
        // If there was nothing initially and isDiscarded is true, we return false since the save button should not show
        // If there were initial annotations and we discard them, we return true since the save button should show
        return (this.hasInitialAnnotations() && isDiscarded) ? true : (!this.hasInitialAnnotations && isDiscarded) ?
            false : hasTextAnnotations || hasDrawings || hasDotAnnotations || hasAnnotationMoved || hasInitialSVG
            || hasInitialDrawings || (hasInitialTexts !== this.initialEditorState.hasInitialTexts) || hasStitch;
    }
    hasInitialAnnotations() {
        let { hasInitialSVG, hasInitialDrawings, hasInitialTexts, hasStitch } = this.initialEditorState;
        return hasInitialSVG || hasInitialDrawings || hasInitialTexts || hasStitch;
    }
    hostData() {
        return {
            class: Object.assign({ ['readonly']: this.readonly, [this.imageOrientation]: true, 'without-svg': !this.svgData, 'with-svg-data': this.svgData, 'with-annotated-image': this.annotatedImgSrc, 'with-stitch-image': this.isStitch, 'stitch-mode': this.stitchMode, 'rotate-image': this.rotateImage }, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "photo-editor-container", ref: (el) => this.photoEditorContainer = el },
            (this.stitchMode || this.isFeedImage() || this.disableHeader) ? null : (this.readonly ? this.renderModalToolbar() : this.renderWriteTools()),
            isWeb() ? this.renderPhotoEditorBody() :
                h("yoo-zoom", { onClick: () => this.onZoomClick(), onTransformsChanged: (event) => this.saveTransforms(event), ref: (el) => this.zoomComponent = el }, this.renderPhotoEditorBody()),
            this.isSaveButtonVisible() &&
                h("yoo-fab-container", { id: "save-annotation", class: "large bottom center", onClick: () => this.onSave() },
                    h("yoo-fab-button", { class: "save gradient-success", icon: "yo-thick" }))));
    }
    static get is() { return "yoo-photo-editor"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "annotatedImgSrc": {
            "type": String,
            "attr": "annotated-img-src",
            "mutable": true
        },
        "backgroundStatus": {
            "state": true
        },
        "currentColor": {
            "state": true
        },
        "currentTextAlignment": {
            "state": true
        },
        "description": {
            "type": String,
            "attr": "description"
        },
        "disableHeader": {
            "type": Boolean,
            "attr": "disable-header"
        },
        "editInPhotoEditors": {
            "type": Boolean,
            "attr": "edit-in-photo-editors"
        },
        "editorMode": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "isAnnotating": {
            "state": true
        },
        "isBackBtn": {
            "type": Boolean,
            "attr": "is-back-btn"
        },
        "isDragging": {
            "state": true
        },
        "isModal": {
            "type": Boolean,
            "attr": "is-modal"
        },
        "isStitch": {
            "type": Boolean,
            "attr": "is-stitch"
        },
        "photoHasLoaded": {
            "state": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "rotateImage": {
            "type": Boolean,
            "attr": "rotate-image"
        },
        "src": {
            "type": String,
            "attr": "src",
            "watchCallbacks": ["handleSrcUpdate"]
        },
        "stitchMode": {
            "type": Boolean,
            "attr": "stitch-mode"
        },
        "svgData": {
            "type": String,
            "attr": "svg-data",
            "watchCallbacks": ["handleUpdatedSVGData"]
        },
        "texts": {
            "type": "Any",
            "attr": "texts",
            "watchCallbacks": ["handleUpdatedTexts"]
        }
    }; }
    static get events() { return [{
            "name": "zoomClicked",
            "method": "zoomClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-photo-editor:**/"; }
}

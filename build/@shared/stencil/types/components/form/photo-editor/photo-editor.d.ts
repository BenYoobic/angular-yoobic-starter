import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IPhotoEditorData, XYPoint, IPhotoAnnotation, IZoomTransform } from '../../../interfaces';
import { EditorMode } from '../../../index';
export declare class YooPhotoEditorComponent {
    /**
     * Specifies whether the component is in readonly mode
     */
    readonly: boolean;
    /**
     * The source of the image to display
     */
    src: string;
    /**
     * The source of the edited image to overlay over the original source. This can be a stitched image or a photo with drawings from v4.
     * If there is no stitching, this image is hidden for photos that have drawings added on v6.
     */
    annotatedImgSrc: string;
    /**
    * True when the annotatedImgSrc is stitched after image recognition is applied to it.
    */
    isStitch: boolean;
    /**
     * Description of an image which appears at the bottom of the photo-editor when previewing an image from a form-image-choice input
     */
    description: string;
    /**
     * Array of text annotations to render. These can be both dot and text annotations
     */
    texts: Array<IPhotoAnnotation>;
    /**
     * A string containing the serialized SVG with the drawings. This string is then parsed to render an SVGElement in the DOM.
     */
    svgData: string;
    /**
     * Should be true when the photo-editor is opened in a modal. It works in combination with the isBackButton property.
     */
    isModal: boolean;
    /**
     * If isModal is true, this property will render a back button if set to true and a cross if set to false, on the top-left corner of the photo-editor.
     */
    isBackBtn: boolean;
    /**
     * Specifies whether the editor is being opened in stitch mode
     */
    stitchMode: boolean;
    /**
     * Specifies whether we should rotate this image for camera preview component where image is has wrong orientation
     */
    rotateImage: boolean;
    /**
     * Specifies whether the header should be disabled
     */
    disableHeader: boolean;
    /**
     * Specifies whether the photo-editor is opened in edit mode from inside the photo-editors gallery
     */
    editInPhotoEditors: boolean;
    /**
     * Controls the current alignment of the textarea when creating or editing a text-only annotation
     */
    currentTextAlignment: string;
    /**
     * Controls the background color of the textarea when creating or editing a text-only annotation
     */
    backgroundStatus: string;
    /**
     * String containing the hex code for the current color. When in drawing mode, this will correspond to the color of the SVG drawing.
     * In the text mode, this controls the color of the text (if backgroundStatus = 'off') or the color of the textarea's background (if backgroundStatus = 'on')
     */
    currentColor: string;
    /**
     * The submode in which the editor is currently in.
     */
    editorMode: EditorMode;
    /**
     * Used to force a re-render of the component once the image has finished loading
     */
    photoHasLoaded: boolean;
    /**
     * Used to control the UI when the user is creating a dot annotation, upon clicking on the annotation overlay.
     */
    isAnnotating: boolean;
    /**
     * Used to control the appearance of the trash can used to delete an annotation. This will be true when either a text annotation
     * or a dot annotation starts being dragged and becomes false when the user drops the annotation
     */
    isDragging: boolean;
    /**
     * Emitted when the yoo-zoom component inside the editor is clicked when in readonly mode
     */
    zoomClicked: EventEmitter<boolean>;
    host: HTMLStencilElement;
    /**
    * The orientation of the image which is set when the photo first loads.
    */
    private imageOrientation;
    private googleStorageApiUrl;
    /**
     * Treated image src - this is the src passed to the central image
     */
    private treatedSrc;
    /**
     * The main image to be rendered
     */
    private image;
    /**
     * The img tag of the annotatedImgSrc
     */
    private editImage;
    private canvas;
    private canvasContext;
    private zoomComponent;
    private deleteFabButtonContainer;
    private deleteFabButton;
    private overlaysContainer;
    private annotationsPlaceholder;
    private textModeTextArea;
    private updatedTextAnnotationTextArea;
    private dotAnnotationTextArea;
    private photoEditorContainer;
    private descriptionContainer;
    private modalToolbar;
    private svg;
    private editSvg;
    private currentSVGPath;
    private currentSVGPathD;
    private isSVGReplaced;
    private updatedTextAnnotation;
    private colors;
    private lineWidth;
    private currentViewbox;
    private isDrawing;
    private isEditing;
    private isUpdatingText;
    private imageFocus;
    private afterUndo;
    private isTextButtonClicked;
    private drawCanvasEdit;
    private isTooltipShowing;
    /**
     * Controls the mouse move event so that it only calls the handler after mouseDown
     */
    private handleMouseMove;
    private scale;
    private scrollX;
    private scrollY;
    private imageTopPosition;
    private imageLeftPosition;
    private imageHeight;
    private imageWidth;
    /**
     * Store initial window height to solve keyboard issues on Android
     */
    private initialWindowHeight;
    private history;
    private annotationPosition;
    private placeholderAnnotationPosition;
    private localAnnotations;
    /**
     * Array of predefined comments that the user may add to its photos.
     */
    private predefinedComments;
    private currentX;
    private currentY;
    private lastX;
    private lastY;
    private initialDragPosition;
    private lastDragPosition;
    private editorState;
    /**
     * This variable is necessary to be able to combine drawings from different annotation sessions at the canvas level
     * This is to ensure that the correct drawings will appear in the annotation preview
     */
    private canvasDataInMemory;
    private initialEditorState;
    handleUpdatedTexts(newTexts: Array<IPhotoAnnotation>): void;
    handleUpdatedSVGData(newSvgData: string): void;
    handleSrcUpdate(): void;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    afterImageLoaded(): void;
    adjustOverlaysContainer(): void;
    onImageLoaded(): Promise<HTMLImageElement>;
    componentWillUpdate(): void;
    areImageDimensionsCorrect(): boolean;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    treatImageSrc(): void;
    getDOMElements(): void;
    isFeedImage(): boolean;
    focusTextInput(textArea: HTMLTextAreaElement): void;
    setSVGData(): void;
    initInteract(): void;
    clearInteractEvents(): void;
    initInteractDraggable(): void;
    handleTextAnnotationWebTap(event: any): void;
    initInteractDropZone(): void;
    savePhotoDimensions(): void;
    saveImagePosition(): void;
    setImageOrientation(): void;
    onTextInput(event: any): void;
    serializeSvg(svg: SVGElement): string;
    onSave(): void;
    onAddTextClicked(event?: any, annotation?: IPhotoAnnotation): void;
    onDrawClicked(): void;
    onCancelClicked(): void;
    onAnnotateClicked(): void;
    onAnnotationOverlayClicked(event: any): void;
    showAlertAndAction(action: string, translations: string[]): void;
    onClearClicked(): void;
    resetEditorState(): void;
    onAlignTextClicked(): void;
    onColorChanged(event: CustomEvent<string>): void;
    onTextBackgroundClicked(): void;
    onDoneClicked(): void;
    onZoomClick(): void;
    onBackButtonClicked(): void;
    onSingleSliderChanged(event: CustomEvent<number>): void;
    onUndoClicked(): void;
    saveTextAnnotation(textArea: HTMLTextAreaElement): void;
    updateAnnotationPosition(annotation: IPhotoAnnotation, updatedPosition: XYPoint): IPhotoAnnotation;
    saveDotAnnotation(): void;
    computeAnnotationWidthHeightRatio(position: XYPoint): number[];
    toggleBackgroundColor(): void;
    setTextAreaBackground(textArea: HTMLTextAreaElement): void;
    removeTextAreaBackground(textArea: HTMLTextAreaElement): void;
    changeTextInputFontSize(fontSize: number): void;
    onCanvasMouseDown(event: any): void;
    onCanvasMouseUp(event: any): void;
    onCanvasMouseMove(event: any): void;
    onCanvasTouchStart(event: any): void;
    onCanvasTouchEnd(event: any): void;
    onCanvasTouchMove(event: any): void;
    handleDragEnd(event: any): void;
    handleTap(event: any): void;
    handleDraggableMove(event: any): void;
    updateDraggedAnnotation(targetAnnotation: HTMLDivElement, updatedPosition: XYPoint): void;
    isDotAnnotationContainer(target: any): any;
    onDragOver(event: any): void;
    onTooltipShown(tippy: any): void;
    setTooltipStyles(tippy: any): void;
    handleEventStart(event: any): void;
    handleMove(event: any): void;
    handleEventEnd(event: any): void;
    getXYFromEvent(event: any): XYPoint;
    saveTransforms(event: CustomEvent<IZoomTransform>): void;
    getXY(event: any, { x, y }: XYPoint): number[];
    getXYWithParent(event: any, { x, y }: XYPoint): number[];
    getXYWithZoomTransforms({ x, y }: XYPoint): XYPoint;
    drawLine(lastX: number, lastY: number, currentX: number, currentY: number): void;
    setSVGPathAttributes(): void;
    clearState(): void;
    clearCanvas(): void;
    restoreLastState(): void;
    drawEditedImage(): void;
    saveEditState(): void;
    showMoreActionSheet(): void;
    getEditState(): IPhotoEditorData;
    getAnnotationTopPosition(annotation: IPhotoAnnotation): string;
    getAnnotationLeftPosition(annotation: IPhotoAnnotation): string;
    onAddPredefinedCommentsClicked(): void;
    addPredefinedCommentInTextarea(textArea: HTMLTextAreaElement, predefinedComments: string[]): void;
    renderColorPicker(): JSX.Element;
    renderWriteTools(): JSX.Element;
    renderPredefinedCommentsButton(): JSX.Element;
    renderTextModeToolbar(): JSX.Element;
    renderModalToolbar(): JSX.Element;
    renderMenuToolbar(): JSX.Element;
    getCanvasEvents(): {};
    renderCanvas(): JSX.Element;
    renderAnnotationMode(): JSX.Element;
    onDotAnnotationTextareaBlur(event: any): void;
    renderTextMode(): JSX.Element;
    renderAnnotationsPlaceholder(): JSX.Element;
    getTextAnnotationStyles(annotation: IPhotoAnnotation): {
        color: string;
        background: string;
        fontSize: string;
        width: string;
        height: string;
    };
    hideText(): void;
    renderTextAnnotation(annotation: IPhotoAnnotation, updating?: boolean, index?: number): JSX.Element;
    renderTextAnnotationTextArea(annotation: any): JSX.Element;
    renderDotAnnotation(annotation: IPhotoAnnotation, dotIndex: number, index: number): JSX.Element;
    renderDeleteAnnotationButton(): JSX.Element;
    renderSlider(): JSX.Element;
    renderSrcImage(): JSX.Element;
    renderSVG(): JSX.Element;
    renderEditedImage(): JSX.Element;
    renderNewAnnotationsPlaceholder(): JSX.Element;
    renderPhotoEditorBody(): JSX.Element;
    isCurrentColor(color: string): boolean;
    isSaveButtonVisible(): boolean;
    isColorWhite(color?: string): boolean;
    isNotEmptyText(text: string): boolean;
    areTouchMovesWithinDistance(start: any, end: any, threshold: any): boolean;
    isUpdatedTextAnnotation(annotation: IPhotoAnnotation): boolean;
    hasEditorStateChanged(): boolean;
    isDirty(): boolean;
    hasInitialAnnotations(): boolean;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IFormField, ISlide, FormFieldType, IFormSearch, IGridSearch, ITodoTaskSimple, IFormProgress, IButton, IEntityAction, IMissionScoring, IChartDefinition, ISessionService } from '../../../interfaces';
import { ScrollDetail } from '../../../utils/ionic';
interface IFieldState {
    validity?: boolean;
    visible?: boolean;
    zoomed?: boolean;
    readonly?: boolean;
    hasValue?: boolean;
}
export declare class YooFormDynamicComponent {
    slides: Array<ISlide>;
    data: Object;
    history: Array<any>;
    showTabs: boolean;
    showRecap: boolean;
    showPreview: boolean;
    showAnswers: boolean;
    hasOneFieldPerPage: boolean;
    suffix: string;
    forceReadonly: boolean;
    skipValidation: boolean;
    showSave: boolean;
    detailComponent: string;
    geoloc: Array<number>;
    animated: boolean;
    formType: string;
    dirty: boolean;
    scrollable: boolean;
    progress: IFormProgress;
    gradientClass: string;
    extraButtons?: Array<IEntityAction>;
    lessonType: string;
    useGallery: boolean;
    timer: number;
    charts: Array<{
        score: IMissionScoring;
        chart: IChartDefinition;
    }>;
    hideOptional: boolean;
    injector: any;
    host: HTMLStencilElement;
    currentData: Object;
    fieldsState: {
        [key: string]: IFieldState;
    };
    secondaryFieldsState: {
        [key: string]: {
            visible?: boolean;
        };
    };
    slidesState: Array<{
        validity?: boolean;
        visible?: boolean;
        zoomed?: boolean;
        hasValue?: boolean;
        locked?: boolean;
        validityPercentage?: number;
    }>;
    activeIndex: number;
    validity: boolean;
    isKeyboardPresent: boolean;
    failedSubmission: Array<string>;
    isHistoryContentOverflowing: boolean;
    showHistoryModal: boolean;
    remainingTime: number;
    dataChanged: EventEmitter<any>;
    formValidityChanged: EventEmitter<any>;
    save: EventEmitter<any>;
    fieldFetchData: EventEmitter<IFormSearch>;
    formImageRecognition: EventEmitter<any>;
    extraDataChanged: EventEmitter<any>;
    formGetGeoloc: EventEmitter<any>;
    formGetMediaUrl: EventEmitter<any>;
    fieldFetchCustomData: EventEmitter<{
        field: IFormField;
        filters: any;
    }>;
    galleryOpened: EventEmitter<IFormField>;
    actionSheetOpened: EventEmitter<IFormField>;
    showHistory: EventEmitter<string>;
    openPreview: EventEmitter<string>;
    slideChanged: EventEmitter<any>;
    timeOut: EventEmitter<any>;
    slideAnswered: EventEmitter<any>;
    protected slidesOptions: any;
    protected timerInterval: any;
    protected session: ISessionService;
    private resizeListener;
    private keyboardWillShowListener;
    private keyboardDidShowListener;
    private keyboardWillHideListener;
    private steps;
    private ionSlides;
    private updater;
    private isWeb;
    private blurOnScroll;
    private focusedField;
    private progressIndicator;
    private isTabbarHidden;
    private isFieldInSlot;
    private currentScrollPosition;
    private slideTransition;
    private windowHasFinishedResizing;
    private continueEnabled;
    private continueTimeout;
    private onKeyboardWillShow;
    constructor();
    readonly scrollInnerHeight: number;
    readonly lockIndex: boolean[];
    onIonModalWillPresent(): void;
    onInputFocused(ev: any): void;
    updateData(): void;
    scrollToPoint(relativeScrollDistance: number, duration?: number): Promise<any>;
    setScrollSpacerHeight(height: number): void;
    goToRecap(): void;
    forceFieldUpdate(field: IFormField, fieldData?: any, formSearch?: IFormSearch): void;
    afterFetchCustomData(field: IFormField, data: any): void;
    findPreviousValue(fieldName: string): Promise<{
        field: IFormField;
        value: any;
        extra: any;
    }>;
    onSlidePrevious(): void;
    onSlideNext(skipEmitEvent?: boolean): void;
    /**
     * helps to deal with quick clicking/tapping to form buttons (next/finish),
     * which could emits several (eg. onSlideNext) events on the same slide
     * @param callback
     */
    private continueIfEnabled;
    highlightInvalidFields(): void;
    goToSlide(index: number, animated: boolean): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    private checkIfFirstSlideAndLockSwipePrev;
    private encodeFieldName;
    private getFieldByCode;
    onIonScrollEnd(): void;
    onIonScroll(ev: CustomEvent<ScrollDetail>): void;
    isInlineForm(): boolean;
    onWindowResize(): void;
    initValidity(): void;
    initReadonlyAndVisible(field: IFormField, fieldState: IFieldState): void;
    initFieldValidity(field: IFormField, fieldState: IFieldState): void;
    getSlideValidity(i: number, isValid: boolean): boolean;
    getFieldState(field: IFormField): IFieldState;
    getSecondaryFieldState(field: IFormField): {
        visible?: boolean;
    };
    getSlideState(slideIndex: number): {
        validity?: boolean;
        visible?: boolean;
        zoomed?: boolean;
        hasValue?: boolean;
        locked?: boolean;
        validityPercentage?: number;
    };
    getElementFromCurrentSlide(selector: string): HTMLElement;
    isCurrentSlide(slideIndex: number): boolean;
    updateSteps(): void;
    setSlideIsTabbarHidden(): void;
    setFieldState(field: IFormField, state: IFieldState): void;
    setSecondaryFieldState(field: IFormField, state: any): void;
    setSlidesHeight(): void;
    onToggleSecondaryField(field: IFormField): void;
    onFieldChanged(ev: CustomEvent<any>, field: IFormField): void;
    onFieldClear(field: IFormField, updateState?: boolean): void;
    setDirty(state: boolean): void;
    onFieldCommented(ev: CustomEvent<string>, field: IFormField): void;
    onFieldEditTask(ev: CustomEvent<Array<ITodoTaskSimple>>, field: IFormField): void;
    onFieldValidityChanged(ev: CustomEvent<boolean>, field: IFormField, slideIndex: number): void;
    onFieldFocused(name: string, element?: HTMLElement, type?: string): void;
    onFieldExtraDataChanged(ev: CustomEvent, field: IFormField): void;
    /** Get extra data for a field */
    getExtraData(field: IFormField, data?: any, isHistory?: boolean): any;
    onSave(ev: MouseEvent): void;
    focusInvalidField(ev: MouseEvent, displayToast: boolean): void;
    onIonSlideDidChange(ev: CustomEvent<any>): void;
    onIonSlideTouchEnd(ev: CustomEvent<any>): void;
    blurInput(): void;
    isFirstSlide(): boolean;
    lockSlideSwipe(index: number): void;
    slideHasAdvanced(slide: ISlide): boolean;
    slideHasSecondary(slide: ISlide): boolean;
    slideHasButton(slide: ISlide): boolean;
    slideHasToolbar(slide: ISlide): boolean;
    onToggleSlideZoom(slideIndex: number): void;
    onShowAdvancedFields(slide: ISlide): void;
    fieldHasValue(field: IFormField): boolean;
    updateState(): void;
    getInputType(field: IFormField): FormFieldType.email | FormFieldType.number | FormFieldType.password | FormFieldType.tel | FormFieldType.text | FormFieldType.text;
    onKeyboardDidShow(ev: any): void;
    onKeyboardWillHide(): void;
    onHideTabbar(ev: any): void;
    private scrollToField;
    setFormInputContainerInvalid(invalid: boolean, elementCodes: Array<string>): void;
    onFetchData(field: IFormField, ev: CustomEvent<IGridSearch>): void;
    onFetchCustomData(field: IFormField, ev?: CustomEvent<any>): void;
    onImageRecognition(field: IFormField, ev: CustomEvent<any>): void;
    onFieldGetGeoloc(field: IFormField, ev: CustomEvent<any>): void;
    onFieldGetMediaUrl(field: IFormField, ev: CustomEvent<any>): void;
    onFieldGalleryOpened(field: IFormField, ev: CustomEvent<number>): void;
    onFieldActionSheetOpened(field: IFormField, ev: CustomEvent<number>): void;
    isSlideLocked(slide: ISlide): boolean;
    onTitleLinesChanged(): void;
    renderHeader(): JSX.Element;
    renderProgressContainer(): JSX.Element;
    private getProgressIndicator;
    renderRecap(): JSX.Element[];
    renderZoomButton(slideIndex: number): JSX.Element;
    renderBody(): JSX.Element;
    renderMobileBody(): JSX.Element;
    renderWebBody(): JSX.Element;
    private getFormClasses;
    shouldRenderSlideContent(slide: ISlide, slideIndex: number): boolean;
    getFieldVisibility(field: any): boolean;
    nextAvailablePage(slideIndex: number): number;
    /** used in Boost to determine if the current question is dirty or the document has been viewed */
    isActiveFieldDirty(): boolean;
    renderFormContent(slide: ISlide, slideIndex: number): JSX.Element[];
    getFieldFlex(field: IFormField): {
        flex: string;
    };
    renderFormContentFields(slide: ISlide, slideIndex: number): JSX.Element;
    renderExtraButtons(): JSX.Element[];
    renderReadonlyDetail(): JSX.Element;
    renderToolbar(slide: ISlide): JSX.Element;
    onFieldButtonClick(field: IFormField): void;
    renderLastButton(lastUnlockedSlideIndex: number): JSX.Element;
    renderNextButton(slideIndex: number): JSX.Element;
    private checkLockSwipeNext;
    renderRecapFooter(): JSX.Element;
    onOpenPreview(): void;
    getLessonPageValidity(index: number): boolean;
    getLessonButtons(slideIndex: number): Array<IButton>;
    renderInput(field: IFormField, data: any, slideIndex: number, inputIndex: number, readonly: boolean, cssClass?: string, isHistory?: boolean): JSX.Element;
    renderMissionStatus(historyData: any, type: string): JSX.Element;
    renderHistoryTopAction(): JSX.Element;
    renderHistoryHeader(avatarData: any, date: any): JSX.Element;
    renderHistory(field: IFormField, slideIndex: number, inputIndex: number): JSX.Element;
    renderFieldValidity(field: IFormField, data: any): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element[];
}
export {};

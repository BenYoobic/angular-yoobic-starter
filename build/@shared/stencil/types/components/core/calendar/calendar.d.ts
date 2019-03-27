import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ICalendarMarker, IDateChange } from '../../../interfaces';
import { CalendarDisplayMode, INavBarTab, ScrollDetail } from '../../../index';
export declare class YooCalendarComponent {
    displayMode: CalendarDisplayMode;
    markers: Array<ICalendarMarker>;
    isDatePicker: boolean;
    maxDate: Date;
    minDate: Date;
    isRange: boolean;
    dateRange: Date[];
    activeDay: Date;
    dateChanged: EventEmitter<IDateChange>;
    dateRangeChanged: EventEmitter<IDateChange[]>;
    dayClicked: EventEmitter<boolean>;
    displayModeChanged: EventEmitter<CalendarDisplayMode>;
    extraMonthsLoaded: EventEmitter<IDateChange>;
    todaySelected: EventEmitter<Date>;
    swipeHorizontal: EventEmitter<string>;
    slideChanged: boolean;
    activeDayState: Date;
    rangeLowerBound: Date;
    rangeUpperBound: Date;
    host: HTMLStencilElement;
    /**
     * Necessary to format the days of the week with the pipe and add correct locals
     */
    private weeks;
    private weekdays;
    private renderedGreyDays;
    private slides;
    private infiniteScroll;
    private calendarScroll;
    private renderedMonths;
    private renderedMonthsWeeks;
    private activeDays;
    private activeWeek;
    private initialSlide;
    private cachedSlides;
    private currentSlideIndex;
    private singleRange;
    private activeYear;
    /**
     * The initial active day when the calendar is opened
     */
    private initialActiveDay;
    /**
     * Reference to the middle of the next three months (after the initial three) should the infinite scroll be triggered
     */
    private loadedNextMonthDay;
    /**
     * Reference to the middle of the previous three months (after the initial three) should the scroll to top be triggered
     */
    private loadedPreviousMonthDay;
    private calendarWebTabs;
    setActiveDay(day: Date): void;
    setDisplayMode(mode: CalendarDisplayMode): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    isActiveDay(day: Date): boolean;
    isNextYear(day: Date): boolean;
    isPreviousYear(day: Date): boolean;
    isInDateRange(date: Date, rangeLowerBound: Date, rangeUpperBound: Date): boolean;
    isGreyDay(day: Date, monthIndex: number): boolean;
    isWeekDisplay(): boolean;
    isMonthDisplay(): boolean;
    /**
     * Generate the start and end date for 3 months (previous, current, next)
     */
    generateTimespan(day: Date): Date[];
    /**
     *
     * @param currentDay the first day of the Month or Week
     * @param endDay the last day of the Month or Week
     */
    generateCalendarDays(currentDay: Date, endDay: Date): [Date[][], string[]];
    generatePreviousMonthGreyDays(currentDay: Date): any[][];
    generateCurrentMonthDays(currentDay: Date, endDay: Date, weeks: any, startCount: any): any;
    generateNextMonthGreyDays(firstDayInNextMonth: Date, lastWeek: Date[]): any[][];
    onSlideChanged(event: CustomEvent<any>): Promise<void>;
    onNextMobile(activeSlideIndex: number): void;
    onPreviousMobile(activeSlideIndex: number): void;
    onNext(): void;
    onPrevious(): void;
    onSetToday(): void;
    onSelectDay(day: Date): void;
    onWebCalendarTabSelected(event: CustomEvent<INavBarTab>): void;
    handleTabChange(tabTitle: string): void;
    emitDateRange(): void;
    getMarkers(day: Date): boolean;
    getDayClass(day: Date, slideIndex: number): string;
    onChangeModeClicked(mode: CalendarDisplayMode): void;
    renderMobileCalendar(): JSX.Element;
    renderWebCalendar(): JSX.Element;
    renderDay(day: Date, monthIndex: number): JSX.Element;
    renderMarkers(day: Date): JSX.Element;
    renderWeekHeader(): JSX.Element;
    renderWeeks(weeks: Date[][], monthIndex: any): JSX.Element;
    renderWeekDaysWeb(): JSX.Element;
    renderSingleWeekViewWeb(): JSX.Element;
    onInfiniteScroll(event: CustomEvent<void>): void;
    handleScroll(event: ScrollDetail): void;
    renderInfiniteScroll(): JSX.Element;
    renderCalendarHeaderWeb(): JSX.Element;
    renderWeekDaysMobile(slideIndex: number): JSX.Element[];
    renderCalendarModeToggle(): JSX.Element;
    renderActiveMonth(activeDay: Date, longMonth?: boolean): JSX.Element;
    renderMobileCalendarControls(): JSX.Element[];
    renderCalendarHeaderMobile(): JSX.Element;
    hostData(): {
        class: {
            [x: string]: any;
            'range-picker': boolean;
            'date-picker': boolean;
            'min-max': Date;
            'web': any;
        };
    };
    render(): JSX.Element;
}

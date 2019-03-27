import { translate, isIonic, pipes, dateFormat, resetTime, weekdaysShort, startOf, endOf, dateAdd, dateSub, getYear, isToday, isSameDate, isDateAfter, isDateBefore, shiftSlidesToNext, shiftSlidesToPrevious, isWeb } from '../../../index';
import { isArray } from 'lodash-es';
const MONTHS_TO_ADD = 3;
export class YooCalendarComponent {
    constructor() {
        this.displayMode = 'month';
        this.isRange = false;
        this.slideChanged = true;
        this.weekdays = weekdaysShort();
        this.renderedMonths = [-1, 0, 1];
        this.initialSlide = 1;
        this.cachedSlides = 1;
        this.currentSlideIndex = 1;
        this.singleRange = false;
        this.calendarWebTabs = [
            {
                title: translate('TODAY'),
                value: 'today'
            },
            {
                title: translate('WEEK'),
                value: 'week'
            },
            {
                title: translate('MONTH'),
                value: 'month'
            }
        ];
    }
    setActiveDay(day) {
        const prevActiveDay = dateAdd(day, this.displayMode, -1);
        const nextActiveDay = dateAdd(day, this.displayMode, 1);
        if (!this.initialActiveDay) {
            this.initialActiveDay = day;
        }
        let monthStartDay = startOf(day, 'month');
        let monthEndDay = endOf(day, 'month');
        const [previousMonthStartDay, previousMonthEndDay, timeSpanStart, timeSpanEnd, nextMonthStartDay, nextMonthEndDay] = this.generateTimespan(day);
        // Current month
        const [weeks, greyDays] = this.generateCalendarDays(timeSpanStart, timeSpanEnd);
        if (this.isWeekDisplay() && weeks.length === 1) {
            this.activeWeek = weeks;
        }
        // Previous Month 
        const [prevWeeks, prevGreyDays] = this.generateCalendarDays(previousMonthStartDay, previousMonthEndDay);
        // Next Month
        const [nextWeeks, nextGreyDays] = this.generateCalendarDays(nextMonthStartDay, nextMonthEndDay);
        // These variables will always be undefined on mobile but added a check just to be safe
        if ((!this.loadedNextMonthDay && !this.loadedPreviousMonthDay) || isIonic()) {
            this.activeDays = [prevActiveDay, day, nextActiveDay];
            this.weeks = weeks;
            this.renderedMonthsWeeks = [prevWeeks, this.weeks, nextWeeks];
            this.renderedGreyDays = [prevGreyDays, greyDays, nextGreyDays];
        }
        // To ensure we load the markers for 3 months at a time on web, we change the monthStartDay and monthEndDay
        if (isWeb()) {
            monthStartDay = previousMonthStartDay;
            monthEndDay = nextMonthEndDay;
        }
        this.dateChanged.emit({ date: day, startDate: timeSpanStart, endDate: timeSpanEnd, mode: this.displayMode, monthStartDay, monthEndDay });
        this.activeDayState = day;
    }
    setDisplayMode(mode) {
        this.displayMode = mode;
        // Compute the active day to force a re-render
        this.setActiveDay(this.activeDayState);
    }
    componentWillLoad() {
        let _activeDay;
        if (this.isRange && isArray(this.activeDay)) {
            // If we have a range just set the initial active dat to be a new date
            _activeDay = this.activeDay[0];
        }
        else {
            this.activeDay ? _activeDay = this.activeDay : _activeDay = new Date();
        }
        if (this.dateRange) {
            this.rangeLowerBound = resetTime(this.dateRange[0]);
            this.rangeUpperBound = resetTime(this.dateRange[1]);
        }
        if (this.maxDate && isDateAfter(_activeDay, this.maxDate)) {
            _activeDay = this.maxDate;
            this.setActiveDay(_activeDay);
        }
        else if (this.minDate && isDateBefore(_activeDay, this.minDate)) {
            _activeDay = this.minDate;
            this.setActiveDay(_activeDay);
        }
        else {
            this.setActiveDay(_activeDay);
        }
        this.activeYear = getYear(dateFormat(this.activeDayState, 'YYYY'));
    }
    componentDidLoad() {
        if (this.calendarScroll) {
            const CALENDAR_SCROLL_HEIGHT = 250;
            this.calendarScroll.scrollByPoint(0, CALENDAR_SCROLL_HEIGHT, 50);
        }
    }
    isActiveDay(day) {
        return dateFormat(day, 'L') === dateFormat(this.activeDayState, 'L');
    }
    isNextYear(day) {
        let nextYearFromToday = getYear(dateFormat(day, 'YYYY'));
        return this.activeYear < nextYearFromToday;
    }
    isPreviousYear(day) {
        let lastYearFromToday = getYear(dateFormat(day, 'YYYY'));
        return this.activeYear > lastYearFromToday;
    }
    isInDateRange(date, rangeLowerBound, rangeUpperBound) {
        if (isDateBefore(date, rangeLowerBound)) {
            return false;
        }
        if (this.rangeUpperBound ? isDateAfter(date, rangeUpperBound) : isDateAfter(date, rangeLowerBound)) {
            return false;
        }
        // Date is in the range
        return true;
    }
    // Grey days are either not in the current month, below the min date or above the max date
    isGreyDay(day, monthIndex) {
        if (this.minDate && isDateBefore(day, this.minDate)) {
            return true;
        }
        if (this.maxDate && isDateAfter(day, this.maxDate)) {
            return true;
        }
        const dayToCheck = dateFormat(day, 'L');
        return this.renderedGreyDays[monthIndex].indexOf(dayToCheck) > -1;
    }
    isWeekDisplay() {
        return this.displayMode === 'week';
    }
    isMonthDisplay() {
        return this.displayMode === 'month';
    }
    /**
     * Generate the start and end date for 3 months (previous, current, next)
     */
    generateTimespan(day) {
        const timeSpanStart = startOf(day, this.displayMode);
        const timeSpanEnd = endOf(day, this.displayMode);
        const previousMonthStartDay = dateSub(timeSpanStart, `${this.displayMode}s`, 1);
        const previousMonthEndDay = dateSub(timeSpanEnd, `${this.displayMode}s`, 1);
        const nextMonthStartDay = dateAdd(timeSpanStart, `${this.displayMode}s`, 1);
        const nextMonthEndDay = dateAdd(timeSpanEnd, `${this.displayMode}s`, 1);
        return [
            previousMonthStartDay,
            previousMonthEndDay,
            timeSpanStart,
            timeSpanEnd,
            nextMonthStartDay,
            nextMonthEndDay
        ];
    }
    /**
     *
     * @param currentDay the first day of the Month or Week
     * @param endDay the last day of the Month or Week
     */
    generateCalendarDays(currentDay, endDay) {
        let weeks = [
            []
        ];
        let greyDays = [];
        let startCount = 0;
        if (this.isMonthDisplay()) {
            [weeks[0], greyDays] = this.generatePreviousMonthGreyDays(currentDay);
            startCount = greyDays.length;
        }
        weeks = this.generateCurrentMonthDays(currentDay, endDay, weeks, startCount);
        // Keep only populated weeks
        weeks = weeks.filter(w => w.length > 0);
        let lastWeek = weeks[weeks.length - 1];
        let nextMonthGreyDays = [];
        let firstDayInNextMonth = dateAdd(endDay, 'days', 1);
        [lastWeek, nextMonthGreyDays] = this.generateNextMonthGreyDays(firstDayInNextMonth, lastWeek);
        greyDays = [...greyDays, ...nextMonthGreyDays];
        weeks[weeks.length - 1] = lastWeek;
        return [weeks, greyDays];
    }
    generatePreviousMonthGreyDays(currentDay) {
        let firstWeek = [];
        let previousMonthGreyDays = [];
        let count = 0;
        // First day of the current week
        let indexOfStartWeekDay = this.weekdays.indexOf(dateFormat(currentDay, 'eeeeee'));
        if (indexOfStartWeekDay > 0) {
            while (count < indexOfStartWeekDay) {
                // All all days of the last month which belong to the same week as the current day to the display and record them as greyed out
                let dayInLastMonth = dateSub(currentDay, 'days', indexOfStartWeekDay - count);
                previousMonthGreyDays.push(dateFormat(dayInLastMonth, 'L'));
                firstWeek.push(dayInLastMonth);
                count += 1;
            }
        }
        return [firstWeek, previousMonthGreyDays];
    }
    generateCurrentMonthDays(currentDay, endDay, weeks, startCount) {
        let weekIndex = 0, count = startCount;
        while (currentDay <= endDay) {
            weeks[weekIndex].push(currentDay);
            // Increment the day
            currentDay = dateAdd(currentDay, 'days', 1);
            count += 1;
            if (count > 6) {
                // reset count, increment week index
                count = 0;
                weekIndex += 1;
                weeks[weekIndex] = [];
            }
        }
        return weeks;
    }
    generateNextMonthGreyDays(firstDayInNextMonth, lastWeek) {
        let endCount = 0;
        let nextMonthGreyDays = [];
        while (lastWeek.length < 7) {
            let dayInNextMonth = dateAdd(firstDayInNextMonth, 'days', endCount);
            nextMonthGreyDays.push(dateFormat(dayInNextMonth, 'L'));
            lastWeek.push(dayInNextMonth);
            endCount += 1;
        }
        return [lastWeek, nextMonthGreyDays];
    }
    async onSlideChanged(event) {
        if (this.slides) {
            // Initial active index = 1;
            this.slides.getActiveIndex().then(activeIndex => {
                if (activeIndex !== null) {
                    if (activeIndex > this.currentSlideIndex) {
                        this.onNextMobile(activeIndex - 1);
                    }
                    else if (activeIndex < this.currentSlideIndex) {
                        this.onPreviousMobile(activeIndex + 1);
                    }
                }
            });
        }
    }
    onNextMobile(activeSlideIndex) {
        if (this.slides) {
            this.renderedMonths = shiftSlidesToNext(activeSlideIndex, this.renderedMonths, this.cachedSlides);
            try {
                this.slides.slideTo(activeSlideIndex, 0, false);
                this.slides.update();
            }
            catch (err) { }
        }
        this.onNext();
    }
    onPreviousMobile(activeSlideIndex) {
        if (this.slides) {
            this.renderedMonths = shiftSlidesToPrevious(activeSlideIndex, this.renderedMonths, this.cachedSlides);
            try {
                this.slides.slideTo(activeSlideIndex, 0, false);
                this.slides.update();
            }
            catch (err) { }
        }
        this.onPrevious();
    }
    onNext() {
        if (this.isDatePicker) {
            this.renderedMonths.push(this.renderedMonths[this.renderedMonths.length - 1] + 1);
            this.renderedMonths.shift();
        }
        let nextDate = dateAdd(this.activeDayState, this.displayMode, 1);
        if (this.maxDate && isDateAfter(dateFormat(nextDate, 'Ld'), this.maxDate)) {
            this.setActiveDay(this.maxDate);
        }
        else {
            this.setActiveDay(nextDate);
        }
        this.swipeHorizontal.emit('next');
    }
    onPrevious() {
        if (this.isDatePicker) {
            this.renderedMonths.unshift(this.renderedMonths[0] - 1);
            this.renderedMonths.pop();
        }
        let previousDate = dateSub(this.activeDayState, this.displayMode, 1);
        if (this.minDate && isDateBefore(dateFormat(previousDate, 'Ld'), this.minDate)) {
            this.setActiveDay(this.minDate);
        }
        else {
            this.setActiveDay(previousDate);
        }
        this.swipeHorizontal.emit('previous');
    }
    onSetToday() {
        this.setActiveDay(new Date());
        this.todaySelected.emit(this.activeDay);
    }
    onSelectDay(day) {
        this.dayClicked.emit(true);
        if (this.isRange && !this.rangeLowerBound) {
            this.rangeLowerBound = day;
        }
        else if (this.isRange && this.rangeUpperBound) {
            // Different conditions - here if max is defined -min always exists
            this.singleRange = false;
            if (isDateAfter(day, this.rangeUpperBound)) {
                this.rangeUpperBound = day;
            }
            else if (isDateBefore(day, this.rangeLowerBound)) {
                this.rangeLowerBound = day;
            }
            else if (isDateAfter(day, this.rangeLowerBound) && isDateBefore(day, this.rangeUpperBound)) {
                this.rangeUpperBound = day;
            }
            else if (isSameDate(day, this.rangeUpperBound)) {
                this.rangeLowerBound = day;
                this.rangeUpperBound = null;
            }
            else if (isSameDate(day, this.rangeLowerBound)) {
                this.singleRange = true;
                this.rangeLowerBound = day;
                this.rangeUpperBound = null;
            }
            this.emitDateRange();
        }
        else if (this.isRange) {
            this.singleRange = false;
            if (isDateAfter(day, this.rangeLowerBound)) {
                this.rangeUpperBound = day;
            }
            else if (isDateBefore(day, this.rangeLowerBound)) {
                this.rangeLowerBound = day;
            }
            else if (isSameDate(day, this.rangeLowerBound)) {
                // Lower Bound becomes the only selected day in this case
                this.singleRange = true;
                this.rangeLowerBound = day;
            }
            this.emitDateRange();
        }
        else {
            if (isWeb) {
                this.activeDayState = day;
                this.dateChanged.emit({
                    date: day,
                    startDate: startOf(day, this.displayMode),
                    endDate: endOf(day, this.displayMode),
                    mode: this.displayMode,
                    monthStartDay: startOf(day, 'month'),
                    monthEndDay: endOf(day, 'month')
                });
            }
            else {
                this.setActiveDay(day);
            }
        }
    }
    onWebCalendarTabSelected(event) {
        const selectedTab = event.detail;
        this.handleTabChange(selectedTab.value);
    }
    handleTabChange(tabTitle) {
        switch (tabTitle) {
            case 'month':
            case 'week':
                this.setDisplayMode(tabTitle);
                break;
            case 'today':
                this.onSetToday();
        }
    }
    emitDateRange() {
        let lowerBoundChange = { date: this.rangeLowerBound, mode: this.displayMode };
        if (this.singleRange) {
            this.dateRangeChanged.emit([lowerBoundChange, lowerBoundChange]);
        }
        else {
            let upperBoundChange = { date: this.rangeUpperBound, mode: this.displayMode };
            this.dateRangeChanged.emit([lowerBoundChange, upperBoundChange]);
        }
    }
    getMarkers(day) {
        if (this.markers) {
            let marker = this.markers.find(m => m._id === dateFormat(day, 'YYYY-MM-dd'));
            return marker ? true : false;
        }
        return false;
    }
    getDayClass(day, slideIndex) {
        let dayClass = 'day ';
        if (isToday(day)) {
            dayClass += 'today ';
        }
        if ((this.isActiveDay(day) && !this.isRange)) {
            dayClass += 'active ';
        }
        if (this.isGreyDay(day, slideIndex)) {
            dayClass += 'grey-day ';
        }
        if (this.isRange && this.rangeLowerBound && this.isInDateRange(day, this.rangeLowerBound, this.rangeUpperBound) && !this.singleRange) {
            dayClass += 'in-range ';
            if (isSameDate(day, this.rangeLowerBound)) {
                dayClass += 'first-day ';
            }
            else if (isSameDate(day, this.rangeUpperBound)) {
                dayClass += 'last-day ';
            }
        }
        else if (this.isRange && this.singleRange && isSameDate(day, this.rangeLowerBound)) {
            dayClass += 'single-range';
        }
        return dayClass;
    }
    onChangeModeClicked(mode) {
        this.setDisplayMode(mode);
        this.displayModeChanged.emit(mode);
    }
    renderMobileCalendar() {
        return ([
            this.renderCalendarHeaderMobile(),
            this.isDatePicker ?
                this.renderedMonths.map((slide, index) => {
                    if (index === 1) {
                        return h("div", { class: "mobile-days" },
                            this.renderWeekHeader(),
                            this.renderWeekDaysMobile(index));
                    }
                }) :
                h("div", { class: "calendar-container" },
                    h("yoo-ion-slides", { ref: (el) => this.slides = el, initialSlide: this.initialSlide, options: { autoplay: false }, onIonSlideDidChange: (event) => this.onSlideChanged(event) }, this.renderedMonths.map((slide, index) => {
                        return h("yoo-ion-slide", { class: "ion-slide" },
                            h("div", { class: "mobile-days" },
                                this.renderWeekHeader(),
                                this.renderWeekDaysMobile(index)));
                    })))
        ]);
    }
    renderWebCalendar() {
        return ([
            this.renderCalendarHeaderWeb(),
            h("div", { class: "days" },
                this.renderWeekHeader(),
                this.renderWeekDaysWeb())
        ]);
    }
    renderDay(day, monthIndex) {
        return (day &&
            h("div", { class: this.getDayClass(day, monthIndex), onClick: this.onSelectDay.bind(this, day) },
                h("div", { class: "day-number" }, pipes.dateFormat.transform(day, 'd')),
                h("div", { class: "markers" }, this.renderMarkers(day))));
    }
    renderMarkers(day) {
        return ([
            this.getMarkers(day) ? h("div", { class: "marker no-count" }, this.getMarkers(day)) : ''
        ]);
    }
    renderWeekHeader() {
        return (h("div", { class: "week-header" }, this.weeks[0].map((day) => h("div", { class: "day" },
            h("div", { class: "day-text" }, pipes.dateFormat.transform(day, `${isWeb() ? 'eee' : 'eeeeee'}`))))));
    }
    renderWeeks(weeks, monthIndex) {
        return weeks.map((days) => h("div", { class: `week mode-${this.displayMode}` }, days.map(day => this.renderDay(day, monthIndex))));
    }
    renderWeekDaysWeb() {
        return (h("yoo-ion-scroll", { class: "relative", ref: (el) => this.calendarScroll = el, scrollEvents: true, onIonScroll: (event) => this.handleScroll(event.detail) },
            this.isMonthDisplay() ?
                h("div", { class: "months" }, this.renderedMonths.map((value, index) => {
                    return (h("div", { class: "web-days" },
                        this.renderActiveMonth(this.activeDays[index]),
                        this.renderWeeks(this.renderedMonthsWeeks[index], index)));
                })) : this.renderSingleWeekViewWeb(),
            this.renderInfiniteScroll()));
    }
    renderSingleWeekViewWeb() {
        return (h("div", { class: "weeks" },
            h("div", { class: "web-days" }, this.renderWeeks(this.activeWeek, 0))));
    }
    onInfiniteScroll(event) {
        if (this.loadedNextMonthDay) {
            this.loadedNextMonthDay = dateAdd(this.loadedNextMonthDay, 'months', MONTHS_TO_ADD);
        }
        else {
            this.loadedNextMonthDay = dateAdd(this.initialActiveDay, 'months', MONTHS_TO_ADD);
        }
        const [previousMonthStartDay, previousMonthEndDay, timeSpanStart, timeSpanEnd, nextMonthStartDay, nextMonthEndDay] = this.generateTimespan(this.loadedNextMonthDay);
        const [loadedNextMonthWeeks, loadedNextMonthGreyDays] = this.generateCalendarDays(timeSpanStart, timeSpanEnd);
        const [previousMonthWeeks, previousMonthGreyDays] = this.generateCalendarDays(previousMonthStartDay, previousMonthEndDay);
        const [nextMonthWeeks, nextMonthGreyDays] = this.generateCalendarDays(nextMonthStartDay, nextMonthEndDay);
        this.renderedMonthsWeeks = [...this.renderedMonthsWeeks, previousMonthWeeks, loadedNextMonthWeeks, nextMonthWeeks];
        this.renderedMonths = [...this.renderedMonths, 0, 0, 0];
        this.renderedGreyDays = [...this.renderedGreyDays, previousMonthGreyDays, loadedNextMonthGreyDays, nextMonthGreyDays];
        this.activeDays = [...this.activeDays, previousMonthStartDay, timeSpanStart, nextMonthStartDay];
        this.infiniteScroll.complete();
        this.extraMonthsLoaded.emit({
            date: timeSpanStart,
            startDate: startOf(timeSpanStart, this.displayMode),
            endDate: endOf(timeSpanStart, this.displayMode),
            mode: this.displayMode,
            monthStartDay: previousMonthStartDay,
            monthEndDay: nextMonthStartDay
        });
        this.host.forceUpdate();
    }
    handleScroll(event) {
        // Scroll is at his maximum at the top
        if (event.currentY === 0 && this.isMonthDisplay()) {
            if (this.loadedPreviousMonthDay) {
                this.loadedPreviousMonthDay = dateSub(this.loadedPreviousMonthDay, 'months', MONTHS_TO_ADD);
            }
            else {
                this.loadedPreviousMonthDay = dateSub(this.initialActiveDay, 'months', MONTHS_TO_ADD);
            }
            const [previousMonthStartDay, previousMonthEndDay, timeSpanStart, timeSpanEnd, nextMonthStartDay, nextMonthEndDay] = this.generateTimespan(this.loadedPreviousMonthDay);
            const [loadedPreviousMonthWeeks, loadedPreviousMonthGreyDays] = this.generateCalendarDays(timeSpanStart, timeSpanEnd);
            const [previousMonthWeeks, previousMonthGreyDays] = this.generateCalendarDays(previousMonthStartDay, previousMonthEndDay);
            const [nextMonthWeeks, nextMonthGreyDays] = this.generateCalendarDays(nextMonthStartDay, nextMonthEndDay);
            this.renderedMonthsWeeks = [previousMonthWeeks, loadedPreviousMonthWeeks, nextMonthWeeks, ...this.renderedMonthsWeeks];
            this.renderedMonths = [0, 0, 0, ...this.renderedMonths];
            this.renderedGreyDays = [previousMonthGreyDays, loadedPreviousMonthGreyDays, nextMonthGreyDays, ...this.renderedGreyDays];
            this.activeDays = [previousMonthStartDay, timeSpanStart, nextMonthStartDay, ...this.activeDays];
            this.extraMonthsLoaded.emit({
                date: timeSpanStart,
                startDate: startOf(timeSpanStart, this.displayMode),
                endDate: endOf(timeSpanStart, this.displayMode),
                mode: this.displayMode,
                monthStartDay: previousMonthStartDay,
                monthEndDay: nextMonthStartDay
            });
            this.host.forceUpdate();
        }
    }
    renderInfiniteScroll() {
        return (h("yoo-ion-infinite-scroll", { ref: (el) => this.infiniteScroll = el, threshold: '8%', disabled: this.isWeekDisplay(), onIonInfinite: ev => this.onInfiniteScroll(ev) },
            h("yoo-ion-infinite-scroll-content", { loadingSpinner: "dots" })));
    }
    renderCalendarHeaderWeb() {
        return (h("yoo-navbar", { class: "items-space-around small", onTabSelected: (event) => this.onWebCalendarTabSelected(event), selectedTab: this.calendarWebTabs[2], tabs: this.calendarWebTabs }));
    }
    renderWeekDaysMobile(slideIndex) {
        return (this.renderedMonthsWeeks[slideIndex].map(days => h("div", { class: 'week mode-' + this.displayMode }, days.map(day => this.renderDay(day, slideIndex)))));
    }
    renderCalendarModeToggle() {
        return (h("div", { class: "calendar-tools" },
            h("span", { class: 'calendar-toggle today', onClick: this.onSetToday.bind(this) }, translate('TODAY')),
            h("span", { class: {
                    'calendar-toggle': true,
                    'active': this.isWeekDisplay()
                }, onClick: this.onChangeModeClicked.bind(this, 'week') }, translate('WEEK')),
            h("span", { class: {
                    'calendar-toggle': true,
                    'active': this.isMonthDisplay()
                }, onClick: this.onChangeModeClicked.bind(this, 'month') }, translate('MONTH'))));
    }
    renderActiveMonth(activeDay, longMonth = true) {
        return h("span", { class: "active-month" }, activeDay && (this.isPreviousYear(activeDay) || this.isNextYear(activeDay)) ? pipes.dateFormat.transform(activeDay, `MMM${longMonth ? 'M' : ''} YYYY`) : pipes.dateFormat.transform(activeDay, `MMM${longMonth ? 'M' : ''}`));
    }
    renderMobileCalendarControls() {
        return ([
            h("span", { onClick: this.onPrevious.bind(this), class: "prev-month" },
                h("yoo-icon", { class: "yo-left" })),
            this.renderActiveMonth(this.activeDays[1], false),
            h("span", { onClick: this.onNext.bind(this), class: "next-month" },
                h("yoo-icon", { class: "yo-right" }))
        ]);
    }
    renderCalendarHeaderMobile() {
        return (h("div", { class: "mobile-calendar-header" },
            h("div", { class: "active-month-container" }, this.renderMobileCalendarControls()),
            !this.isDatePicker && this.renderCalendarModeToggle()));
    }
    hostData() {
        return {
            class: {
                'range-picker': this.isRange,
                'date-picker': this.isDatePicker,
                'min-max': this.minDate || this.maxDate,
                [this.displayMode]: true,
                'web': isWeb()
            }
        };
    }
    render() {
        return ([
            isIonic() || this.isDatePicker ? this.renderMobileCalendar() : this.renderWebCalendar()
        ]);
    }
    static get is() { return "yoo-calendar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "activeDay": {
            "type": "Any",
            "attr": "active-day"
        },
        "activeDayState": {
            "state": true
        },
        "dateRange": {
            "type": "Any",
            "attr": "date-range"
        },
        "displayMode": {
            "type": String,
            "attr": "display-mode",
            "mutable": true
        },
        "host": {
            "elementRef": true
        },
        "isDatePicker": {
            "type": Boolean,
            "attr": "is-date-picker"
        },
        "isRange": {
            "type": Boolean,
            "attr": "is-range"
        },
        "markers": {
            "type": "Any",
            "attr": "markers"
        },
        "maxDate": {
            "type": "Any",
            "attr": "max-date"
        },
        "minDate": {
            "type": "Any",
            "attr": "min-date"
        },
        "rangeLowerBound": {
            "state": true
        },
        "rangeUpperBound": {
            "state": true
        },
        "setActiveDay": {
            "method": true
        },
        "setDisplayMode": {
            "method": true
        },
        "slideChanged": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "dateChanged",
            "method": "dateChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "dateRangeChanged",
            "method": "dateRangeChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "dayClicked",
            "method": "dayClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "displayModeChanged",
            "method": "displayModeChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "extraMonthsLoaded",
            "method": "extraMonthsLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "todaySelected",
            "method": "todaySelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "swipeHorizontal",
            "method": "swipeHorizontal",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-calendar:**/"; }
}

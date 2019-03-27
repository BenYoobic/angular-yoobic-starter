import { FormFieldType } from '../../../interfaces';
import { isNullOrUndefined, dateFormat, dateAdd, formatMinMaxDate, getHours, getMinutes, setDateMinutes, setAnimation, querySelectorDeep, pipes, blurActiveElement, translate, isCordova, isAndroid, getCurrentLanguage, setValidator, onInputBlurred, setValueAndValidateInput, onInputFocused, onInputClear, convertValueForInputType, getTimeDisplayValue, setDateHours, findParent, getElementDimensions, dateSub, isIOS, showModal, getSession, closeModal } from '../../../utils';
import { getAppContext } from '../../../index';
import { DatePicker } from '@ionic-native/date-picker';
import { isArray } from 'lodash-es';
const MINUTES_INCREMENT_SIZE = 1;
const CALENDAR_SIZE = 450;
export class YooFormDateTimeComponent {
    constructor() {
        this.type = 'date';
        this.validators = [];
        this.externalValidators = [];
        this.clearable = true;
        this.nativePickerLabelColor = '#04CC99';
        this.isSchedule = false;
        this.isRange = false;
        this.isCordovaDatePicker = false;
        this.isNativeDatePickerOpen = false;
        this.isCustomDatePickerOpen = false;
        this.dateDisplayFormat = 'L';
        this.datetimeDisplayFormat = 'L LT';
        this.timeDisplayFormat = 'LT';
        this.is24Hour = true;
        this.needsScrolling = true;
        this.preventDateChange = false;
    }
    isClickBlur(event) {
        if (this.isCustomDatePickerOpen && event.path) {
            let clickPath = event.path;
            for (let i = 0; i < clickPath.length; i++) {
                let element = clickPath[i];
                if (element.tagName === 'YOO-CALENDAR' || element.tagName === 'YOO-FORM-TIME') {
                    return;
                }
            }
            this.isCustomDatePickerOpen = false;
            this.currentTime = null;
            this.needsScrolling = true;
            onInputBlurred(event, this, '.outer-container');
        }
    }
    async getElement() {
        return this;
    }
    componentWillLoad() {
        setValidator(this);
        this.is24Hour = getCurrentLanguage() !== 'en';
        if (!this.is24Hour) {
            this.datetimeDisplayFormat = 'Pp';
            this.timeDisplayFormat = 'LTP';
        }
        this.isCordovaDatePicker = isCordova() && [FormFieldType.date.toString(), FormFieldType.time.toString(), FormFieldType.datetime.toString()].indexOf(this.type) >= 0;
        switch (this.type) {
            case FormFieldType.date:
                this.iconPrefix = this.allowOcr ? 'yo-barcode' : 'yo-calendar';
                break;
            case FormFieldType.datetime:
                this.iconPrefix = 'yo-date-time';
                break;
            case FormFieldType.time:
                this.iconPrefix = 'yo-alarm';
                break;
        }
    }
    componentDidLoad() {
        this.contentParent = findParent(this.host, 'yoo-ion-content');
        this.inputContainer = findParent(this.host, 'yoo-form-input-container');
        this.ionScroll = findParent(this.host, 'yoo-ion-scroll');
        if (this.autofocus && this.inputField) {
            this.inputField.click();
        }
    }
    componentDidUpdate() {
        if (this.isCustomDatePickerOpen && this.needsScrolling) {
            let contentHeight = getElementDimensions(this.contentParent).height;
            let inputContainerPosition = this.inputContainer.getBoundingClientRect().top;
            let shouldScroll = inputContainerPosition + CALENDAR_SIZE > contentHeight;
            const TOP_PADDING = 150;
            if (shouldScroll && this.ionScroll) {
                this.ionScroll.scrollByPoint(0, inputContainerPosition - TOP_PADDING, 50);
            }
            this.needsScrolling = false;
        }
    }
    animateCalendar(open, timeout = 100) {
        setTimeout(() => {
            let calendarPickerContainer = querySelectorDeep(this.host, '.calendar-picker-container');
            setAnimation('fade', calendarPickerContainer, { open });
        }, timeout);
    }
    isTimeInput(inputType) {
        return inputType === FormFieldType.time;
    }
    isDateTimeInput(inputType) {
        return inputType === FormFieldType.datetime;
    }
    isDateInput(inputType) {
        return inputType === FormFieldType.date;
    }
    onInputChanged(ev) {
        let inputValue = querySelectorDeep(this.host, 'input').value; //ev.target.value WHY NOT USE this.inputField? 
        let value = convertValueForInputType(inputValue, this.type);
        setValueAndValidateInput(value, this);
    }
    getDisplayValue() {
        if (isNullOrUndefined(this.value)) {
            return null;
        }
        if (this.isRange) {
            if (this.value[0] && this.value[1] && typeof this.value === 'object') {
                let lowerBound = dateFormat(this.value[0], this.dateDisplayFormat);
                let upperBound = dateFormat(this.value[1], this.dateDisplayFormat);
                return `${lowerBound} - ${upperBound}`;
            }
        }
        let formattedDate;
        switch (this.type) {
            case FormFieldType.time: {
                return getTimeDisplayValue(this.value, this.is24Hour);
            }
            case FormFieldType.date:
                return dateFormat(this.value, this.dateDisplayFormat);
            case FormFieldType.datetime:
                formattedDate = dateFormat(this.value, this.datetimeDisplayFormat);
                let dateTime = formattedDate.split(' ');
                return `${dateTime[0]} ${translate('AT')} ${dateTime[1]} ${!this.is24Hour ? dateTime[2] : ''}`;
            default:
                return this.value;
        }
    }
    onInputClick(ev) {
        const ANDROID_NATIVE_DATE_PICKER_LOAD_TIME = 1000;
        ev.stopPropagation();
        if (this.isCordovaDatePicker && !this.isRange) {
            blurActiveElement(ev);
            // Picker only opens in Android if it receives a date object
            // https://github.com/VitaliiBlagodir/cordova-plugin-datepicker/commit/473f1bdc31bc68163b85bdb842516ed320876fa3
            let initValue = this.value ? isAndroid() && typeof this.value === 'string' ?
                new Date(this.value) : this.value
                : new Date();
            let { minDate, maxDate } = formatMinMaxDate(this.minDate, this.maxDate);
            if (!this.isNativeDatePickerOpen) {
                this.isNativeDatePickerOpen = true;
                if (isAndroid()) {
                    //This is to fix an issue with the Android back button
                    //Another istance of the date picker can not be opened once a date picker is open
                    setTimeout(() => {
                        this.isNativeDatePickerOpen = false;
                    }, ANDROID_NATIVE_DATE_PICKER_LOAD_TIME);
                }
                DatePicker.show({
                    date: initValue,
                    mode: this.type === FormFieldType.datetime ? 'datetime' : this.type,
                    is24Hour: getCurrentLanguage() !== 'en',
                    maxDate,
                    minDate,
                    okText: translate('OK'),
                    cancelText: translate('CANCEL'),
                    todayText: translate('TODAY'),
                    doneButtonLabel: translate('DONE'),
                    doneButtonColor: this.nativePickerLabelColor,
                    cancelButtonColor: this.nativePickerLabelColor,
                    cancelButtonLabel: translate('CANCEL'),
                    minuteInterval: MINUTES_INCREMENT_SIZE,
                    locale: getCurrentLanguage(),
                    nowText: translate('NOW'),
                    androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
                }).then((date) => {
                    // When the picker is closed used 'Cancel', the date is undefined
                    this.isNativeDatePickerOpen = false;
                    if (date) {
                        let value = convertValueForInputType(date, this.type);
                        setValueAndValidateInput(value, this);
                    }
                }, (err) => {
                    this.isNativeDatePickerOpen = false;
                }).catch((err) => {
                    this.isNativeDatePickerOpen = false;
                });
            }
        }
        else {
            if (!this.isCustomDatePickerOpen) {
                // this.animateCalendar(true);
                this.isCustomDatePickerOpen = true;
                if (this.value) {
                    this.preventDateChange = true;
                }
            }
        }
    }
    onDateInputFocused(ev) {
        // prevent the native date picker fired up when the input is focused
        if (this.isCordovaDatePicker) {
            ev.stopPropagation();
            ev.preventDefault();
            return;
        }
        onInputFocused(ev, this, '.outer-container');
    }
    onClearClicked(event) {
        event.stopPropagation();
        onInputClear(event, this);
        if (this.isCustomDatePickerOpen) {
            this.isCustomDatePickerOpen = false;
            this.currentTime = null;
        }
    }
    getReadOnlyValue() {
        switch (this.type) {
            case FormFieldType.date:
                return pipes.dateFormat.transform(this.value, this.dateDisplayFormat);
            case FormFieldType.datetime:
                return pipes.dateFormat.transform(this.value, this.datetimeDisplayFormat);
            case FormFieldType.time:
                return pipes.dateFormat.transform(this.value, this.timeDisplayFormat);
            default:
                return pipes.dateFormat.transform(this.value, this.dateDisplayFormat);
        }
    }
    updateTimeValue(originalDate, newTime) {
        let updatedValue = originalDate;
        let newHours = getHours(newTime);
        let newMinutes = getMinutes(newTime);
        updatedValue = setDateHours(updatedValue, newHours);
        updatedValue = setDateMinutes(updatedValue, newMinutes);
        return updatedValue;
    }
    onToggle(event, htmlElement) {
        event.stopPropagation();
        if (this.isCustomDatePickerOpen) {
            // this.animateCalendar(false, 0);
            this.isCustomDatePickerOpen = false;
            this.needsScrolling = true;
            onInputBlurred(event, htmlElement, '.outer-container');
        }
        else if (!this.isCustomDatePickerOpen) {
            this.isCustomDatePickerOpen = true;
            if (this.value) {
                // Do nothing if toggled when there is already a value
                this.preventDateChange = true;
            }
            if (this.currentTime) {
                this.currentTime = null;
            }
        }
    }
    onDateChanged(event) {
        if (!this.isRange && !this.preventDateChange) {
            let newDate = new Date(event.detail.date);
            if (!this.isDateInput(this.type)) {
                if (this.currentTime) {
                    let currentHours = getHours(this.currentTime);
                    let currentMinutes = getMinutes(this.currentTime);
                    newDate = dateAdd(newDate, 'h', currentHours);
                    newDate = dateAdd(newDate, 'mm', currentMinutes);
                }
            }
            let value = convertValueForInputType(newDate, this.type);
            this.currentTime = value;
            setValueAndValidateInput(value, this);
        }
        this.preventDateChange = false;
    }
    onDateRangeChanged(event) {
        let dateRange = event.detail;
        let lowerBound = dateRange[0].date;
        let upperBound = dateRange[1].date;
        let formattedLowerBound = convertValueForInputType(lowerBound, 'date');
        if (upperBound) {
            let formattedUpperBound = convertValueForInputType(upperBound, 'date');
            let formattedRange = [formattedLowerBound, formattedUpperBound];
            setValueAndValidateInput(formattedRange, this);
        }
        else {
            setValueAndValidateInput(formattedLowerBound, this);
        }
        // IOS display bug - it was not refreshing the values without it
        if (isIOS()) {
            this.inputField.value = this.getDisplayValue();
        }
    }
    onTimeInputChanged(event) {
        this.currentTime = event.detail;
        if (this.isTimeInput(this.type)) {
            setValueAndValidateInput(this.currentTime, this);
        }
        else if (this.isSchedule && !isCordova()) {
            // Here we simply increment/decrement time to avoid changing dates
            let updatedValue = this.updateTimeValue(this.value, this.currentTime);
            setValueAndValidateInput(updatedValue, this);
        }
    }
    onCalendarDayClicked() {
        if (this.isDateInput(this.type) && this.isCustomDatePickerOpen && !this.isRange) {
            this.isCustomDatePickerOpen = false;
        }
    }
    onAmPmToggled(event) {
        if (!this.is24Hour) {
            const timePeriod = event.detail;
            if (timePeriod === 'AM') {
                // We subtract 12h to the current time
                const updatedDate = dateSub(this.value, 'h', 12);
                setValueAndValidateInput(updatedDate, this);
            }
            else if (timePeriod === 'PM') {
                // We add 12h to the current time
                const updatedDate = dateAdd(this.value, 'h', 12);
                setValueAndValidateInput(updatedDate, this);
            }
        }
    }
    onTriggerOCR() {
        if (!this.isShowingOcr) {
            this.isShowingOcr = true;
            let dialog = document.createElement('yoo-form-barcode-dialog');
            dialog.mainMode = 'ocr';
            let scannedSuccessListener = (ev) => {
                this.isShowingOcr = false;
                if (ev && ev.detail) {
                    setValueAndValidateInput(ev.detail, this);
                    this.value = ev.detail;
                }
                closeModal(dialog);
            };
            dialog.addEventListener('scannedSuccess', scannedSuccessListener);
            showModal(dialog).then(() => {
                if (dialog) {
                    dialog.removeEventListener('scannedSuccess', scannedSuccessListener);
                    dialog = null;
                }
            });
        }
    }
    renderInputField() {
        let displayValue = this.getDisplayValue();
        return (h("input", { class: (this.isCordovaDatePicker ? 'native' : ''), readonly: true, ref: (el) => this.inputField = el, placeholder: !this.placeholdertolabel ? this.placeholder : '', value: displayValue, required: this.required, onInput: ev => this.onInputChanged(ev), onFocus: ev => this.onDateInputFocused(ev), onClick: ev => this.onInputClick(ev) }));
    }
    renderNativeInput() {
        return (h("div", { class: 'outer-container ' + (this.isSchedule ? 'hidden' : '') },
            this.iconPrefix ?
                h("div", { class: "icon-prefix", onClick: ev => this.onInputClick(ev) },
                    h("yoo-icon", { class: this.iconPrefix })) : null,
            h("div", { class: "input-container flex" }, this.renderInputField()),
            this.validity === false &&
                h("div", { class: 'icon-suffix invalid' },
                    h("yoo-icon", { class: 'yo-rejected2' })),
            this.value && this.clearable ?
                h("div", { class: "icon-suffix clear", onClick: ev => this.onClearClicked(ev) },
                    h("yoo-icon", { class: "yo-cross" }))
                : null,
            this.allowOcr && getSession().hasScandit && h("div", { class: "icon-suffix ocr", onClick: (ev) => this.onTriggerOCR() },
                h("yoo-icon", { class: "yo-camera" })),
            !isCordova() ?
                h("div", { class: "icon-suffix toggle", onClick: (event) => this.onToggle(event, this) }, this.isCustomDatePickerOpen ? h("yoo-icon", { class: "yo-up" }) : h("yoo-icon", { class: "yo-down" })) : null));
    }
    renderTimeInput() {
        return (h("yoo-form-time", { class: {
                'time-only': this.isTimeInput(this.type)
            }, onInputChanged: (event) => this.onTimeInputChanged(event), onAmPmToggled: (event) => this.onAmPmToggled(event), value: this.value, maxDate: this.maxDate, minDate: this.minDate, clearable: this.clearable, isSchedule: this.isSchedule }));
    }
    renderEditable() {
        return [
            this.renderNativeInput(),
            (!isCordova() && this.isCustomDatePickerOpen) || this.isSchedule || (isCordova() && this.isRange && this.isCustomDatePickerOpen) ?
                h("div", { class: "calendar-picker-container" },
                    !this.isTimeInput(this.type) ? h("yoo-calendar", { class: 'calendar-picker ' + (this.type), isRange: this.isRange, isDatePicker: true, maxDate: this.maxDate, activeDay: this.value, minDate: this.isSchedule ? dateSub(new Date(), 'd', 1) : this.minDate, dateRange: this.value && isArray(this.value) && this.value.length === 2 ? this.value : null, onDateChanged: (event) => this.onDateChanged(event), onDateRangeChanged: (event) => this.onDateRangeChanged(event), onDayClicked: () => this.onCalendarDayClicked() }) : null,
                    !isCordova() && (this.isTimeInput(this.type) || this.isDateTimeInput(this.type) || this.isSchedule) ?
                        this.renderTimeInput()
                        : isCordova() && this.isSchedule ? this.renderTimeInput() : null)
                : null
        ];
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.getReadOnlyValue());
    }
    hostData() {
        return {
            class: Object.assign({ 'schedule': this.isSchedule }, getAppContext(true), { [this.extraClass]: true })
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-date-time"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowOcr": {
            "type": Boolean,
            "attr": "allow-ocr"
        },
        "autofocus": {
            "type": Boolean,
            "attr": "autofocus"
        },
        "clearable": {
            "type": Boolean,
            "attr": "clearable"
        },
        "externalValidators": {
            "type": "Any",
            "attr": "external-validators"
        },
        "extraClass": {
            "type": String,
            "attr": "extra-class"
        },
        "getElement": {
            "method": true
        },
        "host": {
            "elementRef": true
        },
        "iconSuffix": {
            "type": String,
            "attr": "icon-suffix"
        },
        "isCordovaDatePicker": {
            "state": true
        },
        "isCustomDatePickerOpen": {
            "state": true
        },
        "isNativeDatePickerOpen": {
            "state": true
        },
        "isRange": {
            "type": Boolean,
            "attr": "is-range"
        },
        "isSchedule": {
            "type": Boolean,
            "attr": "is-schedule"
        },
        "maxDate": {
            "type": "Any",
            "attr": "max-date"
        },
        "minDate": {
            "type": "Any",
            "attr": "min-date"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "nativePickerLabelColor": {
            "type": String,
            "attr": "native-picker-label-color"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "placeholdertolabel": {
            "type": Boolean,
            "attr": "placeholdertolabel"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "validators": {
            "type": "Any",
            "attr": "validators",
            "mutable": true
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
            "name": "iconClicked",
            "method": "iconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:click",
            "method": "isClickBlur"
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-date-time:**/"; }
}

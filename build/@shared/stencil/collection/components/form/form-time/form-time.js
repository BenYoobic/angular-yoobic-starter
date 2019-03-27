import { setValidator, translate, dateFormat, roundToNearestMinutes, isCordova, isAndroid, getRoundedMinutes, onInputFocused, formatMinMaxDate, blurActiveElement, convertValueForInputType, getTimeDisplayValue, getCurrentLanguage, dateAdd, pipes, dateSub, getHours, setValueAndValidateInput, onInputClear, onInputBlurred } from '../../../utils';
import { DatePicker } from '@ionic-native/date-picker';
const MINUTES_INCREMENT_SIZE = 5;
export class YooFormTimeComponent {
    constructor() {
        this.validators = [];
        this.type = 'time';
        this.clearable = true;
        this.isSchedule = false;
        this.is24Hour = true;
        this.isCordovaTimePicker = false;
        this.isCordovaTimePickerOpen = false;
        this.timePeriod = 'AM';
    }
    componentWillLoad() {
        setValidator(this);
        this.isCordovaTimePicker = isCordova();
        this.is24Hour = getCurrentLanguage() !== 'en';
        if (this.value) {
            this.setAmPm(this.value);
        }
        else {
            this.value = new Date();
            this.setAmPm(this.value);
        }
    }
    incrementValue(date = new Date(), timePortion = 'h') {
        let incrementedTime;
        date = roundToNearestMinutes(date, MINUTES_INCREMENT_SIZE);
        if (timePortion === 'ampm') {
            this.toggleAmPm();
            return;
        }
        else {
            this.setAmPm(date);
            if (timePortion === 'h') {
                incrementedTime = dateAdd(date, 'h', 1);
            }
            else if (timePortion === 'min') {
                incrementedTime = dateAdd(date, 'mm', MINUTES_INCREMENT_SIZE);
            }
        }
        setValueAndValidateInput(incrementedTime.toISOString(), this);
    }
    decrementValue(date = new Date(), timePortion = 'h') {
        let decrementedTime;
        date = roundToNearestMinutes(date, MINUTES_INCREMENT_SIZE);
        if (timePortion === 'ampm') {
            this.toggleAmPm();
            return;
        }
        else {
            this.setAmPm(date);
            if (timePortion === 'h') {
                decrementedTime = dateSub(date, 'h', 1);
            }
            else if (timePortion === 'min') {
                decrementedTime = dateSub(date, 'mm', MINUTES_INCREMENT_SIZE);
            }
        }
        setValueAndValidateInput(decrementedTime.toISOString(), this);
    }
    isAm(date) {
        return getHours(date) <= 12 ? true : false;
    }
    setAmPm(date) {
        if (!this.is24Hour) {
            if (this.isAm(date)) {
                this.timePeriod = 'AM';
            }
            else {
                this.timePeriod = 'PM';
            }
        }
    }
    toggleAmPm() {
        if (!this.is24Hour) {
            if (this.timePeriod === 'AM') {
                this.timePeriod = 'PM';
            }
            else if (this.timePeriod === 'PM') {
                this.timePeriod = 'AM';
            }
            this.amPmToggled.emit(this.timePeriod);
        }
    }
    onInputChanged(ev) {
    }
    onInputClick(ev) {
        const ANDROID_NATIVE_TIME_PICKER_LOAD_TIME = 1000;
        ev.stopPropagation();
        if (this.isCordovaTimePicker) {
            blurActiveElement(ev);
            // Picker only opens in Android if it receives a date object
            // https://github.com/VitaliiBlagodir/cordova-plugin-datepicker/commit/473f1bdc31bc68163b85bdb842516ed320876fa3
            let initValue = this.value ? isAndroid() && typeof this.value === 'string' ?
                new Date(this.value) : this.value
                : new Date();
            initValue = roundToNearestMinutes(initValue, 5);
            let { minDate, maxDate } = formatMinMaxDate(this.minDate, this.maxDate);
            if (!this.isCordovaTimePickerOpen) {
                this.isCordovaTimePickerOpen = true;
                if (isAndroid()) {
                    //This is to fix an issue with the Android back button
                    //Another istance of the time picker can not be opened once a date picker is open
                    setTimeout(() => {
                        this.isCordovaTimePicker = false;
                    }, ANDROID_NATIVE_TIME_PICKER_LOAD_TIME);
                }
                DatePicker.show({
                    date: initValue,
                    mode: this.type,
                    is24Hour: this.is24Hour,
                    maxDate,
                    minDate,
                    okText: translate('OK'),
                    cancelText: translate('CANCEL'),
                    todayText: translate('TODAY'),
                    nowText: this.isSchedule ? '' : translate('NOW'),
                    doneButtonLabel: translate('DONE'),
                    cancelButtonLabel: translate('CANCEL'),
                    locale: getCurrentLanguage(),
                    minuteInterval: MINUTES_INCREMENT_SIZE,
                    androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
                }).then(date => {
                    this.isCordovaTimePickerOpen = false;
                    let value = convertValueForInputType(date, this.type);
                    setValueAndValidateInput(value, this);
                }, (err) => {
                    this.isCordovaTimePickerOpen = false;
                }).catch(() => {
                    this.isCordovaTimePickerOpen = false;
                });
            }
        }
        else {
            if (!this.isCordovaTimePickerOpen) {
                this.isCordovaTimePickerOpen = true;
            }
        }
    }
    onDateInputFocused(ev) {
        // prevent the native date picker fired up when the input is focused
        if (this.isCordovaTimePicker) {
            ev.stopPropagation();
            ev.preventDefault();
            return;
        }
        onInputFocused(ev, this, '.outer-container');
    }
    onClearClicked(ev) {
        onInputClear(ev, this);
    }
    renderTimeControls(timePortion) {
        return (h("div", { class: "time-controls-container" },
            h("div", { class: "time-control-up", onClick: () => this.incrementValue(this.value, timePortion) },
                h("yoo-icon", { class: "yo-up" })),
            h("div", { class: "time-control-down", onClick: () => this.decrementValue(this.value, timePortion) },
                h("yoo-icon", { class: "yo-down" }))));
    }
    renderMinutesInput() {
        return (h("div", { class: "minutes-container" },
            h("input", { class: "input-minutes", type: "text", value: this.value ? getRoundedMinutes(this.value) : getRoundedMinutes(new Date()), required: this.required, readonly: true }),
            this.renderTimeControls('min')));
    }
    renderAmPmContainer() {
        return (h("div", { class: "am-pm-container" },
            h("input", { class: "input-am-pm", type: "text", value: this.timePeriod, required: this.required, readonly: true }),
            this.renderTimeControls('ampm')));
    }
    getDisplayHours(value) {
        let hours = getHours(value);
        if (!this.is24Hour) {
            // e.g. 03:30 PM
            let amPmTime = dateFormat(this.value ? this.value : new Date(), 'hh:mm a');
            let splitTime = amPmTime.split(':');
            hours = splitTime[0];
        }
        return hours;
    }
    renderHoursInput() {
        return (h("div", { class: "hours-container" },
            h("input", { class: "input-hours", type: "text", value: this.value ? this.getDisplayHours(this.value) : this.getDisplayHours(new Date()), required: this.required, readonly: true }),
            this.renderTimeControls('h')));
    }
    renderInputField() {
        return (h("input", { class: (this.isCordovaTimePicker ? 'native' : ''), type: "", value: getTimeDisplayValue(this.value), required: this.required, onInput: ev => this.onInputChanged(ev), onFocus: ev => this.onDateInputFocused(ev), onClick: ev => this.onInputClick(ev), onBlur: ev => onInputBlurred(ev, this, '.outer-container') }));
    }
    renderNativeInput() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "icon-prefix" },
                h("yoo-icon", { class: "yo-alarm" })),
            h("div", { class: "input-container flex" }, this.renderInputField()),
            this.value && this.clearable ?
                h("div", { class: "icon-suffix clear", onClick: ev => this.onClearClicked(ev) },
                    h("yoo-icon", { class: "yo-cross icon-close" }))
                : null,
            h("div", { class: "icon-suffix toggle" },
                h("yoo-icon", { class: "yo-down" }))));
    }
    renderCustomInput() {
        return (h("div", { class: "time-input-container" },
            h("div", { class: "time-input-header" }, translate('TIME')),
            h("div", { class: "flex time-inputs" },
                this.renderHoursInput(),
                this.renderMinutesInput(),
                !this.is24Hour && !isCordova() ? this.renderAmPmContainer() : null)));
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, pipes.dateFormat.transform(this.value, 'LT'));
    }
    renderEditable() {
        return (isCordova() ? this.renderNativeInput() : this.renderCustomInput());
    }
    hostData() {
        return {
            class: {
                'cordova': isCordova()
            }
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-time"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "clearable": {
            "type": Boolean,
            "attr": "clearable"
        },
        "host": {
            "elementRef": true
        },
        "is24Hour": {
            "state": true
        },
        "isCordovaTimePicker": {
            "state": true
        },
        "isCordovaTimePickerOpen": {
            "state": true
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
        "timePeriod": {
            "state": true
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
            "name": "amPmToggled",
            "method": "amPmToggled",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-time:**/"; }
}

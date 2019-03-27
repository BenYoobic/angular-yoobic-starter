import { hideShowTabbar, getAppContext, isWeb } from '../../../index';
import { getSession } from '../../../utils';
export class YooFormFooterComponent {
    constructor() {
        this.timerStart = null; // in seconds
        this.isTabbarHidden = false;
    }
    onListenTimerCounterValue(ev) {
        this.session.timerCountDownState = ev.detail;
    }
    onHideShowTabbar(ev) {
        this.isTabbarHidden = hideShowTabbar(ev, this.host, this.isTabbarHidden);
    }
    componentWillLoad() {
        this.session = getSession();
    }
    onButtonClick(ev, button) {
        if (!button.disabled || button.performHandlerWhenDisabled) {
            button.handler(ev);
        }
    }
    renderButton(button, index) {
        return (h("div", { class: { 'button-container': true, 'first': (index === 0 && this.timerStart === null) } },
            h("yoo-button", { onClick: (ev => this.onButtonClick(ev, button)), text: button.text, icon: button.icon, class: 'footer ' + button.cssClass, disabled: button.disabled, isLoading: button.isLoading })));
    }
    renderTimer() {
        const SECOND_COEFFICIENT = 60;
        let countDownProgressParams = {
            countDownMode: true,
            countDownStartValue: this.timerStart * SECOND_COEFFICIENT,
            circleWidth: isWeb() ? 20 : 45
        };
        return (h("div", { class: "button-container first" },
            h("yoo-progress-bar-core", { shape: "circle", progressParameters: countDownProgressParams })));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "mission-footer" },
            this.timerStart !== null && this.renderTimer(),
            this.buttons &&
                this.buttons.map((button, index) => this.renderButton(button, index))));
    }
    static get is() { return "yoo-form-footer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "buttons": {
            "type": "Any",
            "attr": "buttons"
        },
        "host": {
            "elementRef": true
        },
        "onHideShowTabbar": {
            "method": true
        },
        "timerStart": {
            "type": "Any",
            "attr": "timer-start"
        }
    }; }
    static get listeners() { return [{
            "name": "sendTimerCountDownState",
            "method": "onListenTimerCounterValue"
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-footer:**/"; }
}

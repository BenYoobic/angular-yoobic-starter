import { translate, getPeriodOfDay } from '../../../index'; //'../../../../stencil';
export class YooWelcomeBannerComponent {
    constructor() {
        this.mainText = '';
    }
    render() {
        return (h("div", { class: "container" },
            h("h1", { class: "text" }, this.user ? translate('HELLO_USER', {
                day_period: translate(getPeriodOfDay()),
                user_firstname: this.user.firstName ? this.user.firstName : this.user.username
            }) : translate(this.mainText)),
            this.subText ? h("h3", { class: "sub-text" },
                translate(this.subText),
                " ") : null));
    }
    static get is() { return "yoo-welcome-banner"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "mainText": {
            "type": String,
            "attr": "main-text"
        },
        "subText": {
            "type": String,
            "attr": "sub-text"
        },
        "user": {
            "type": "Any",
            "attr": "user"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-welcome-banner:**/"; }
}

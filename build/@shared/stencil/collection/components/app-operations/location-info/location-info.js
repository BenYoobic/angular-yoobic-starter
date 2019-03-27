import { pipes, translate } from '../../../index'; //'../../../../stencil';
export class YooLocationInfoComponent {
    render() {
        if (!this.location.info && !this.location.contactname && !this.location.contactemail && !this.location.contactphone) {
            return;
        }
        return h("div", { class: "outer-container" },
            h("div", { class: "menu-content" },
                h("span", null, translate('MAINCONTACT')),
                (this.location.contactname && h("div", { class: "menu-content-contact name", innerHTML: this.location.contactname })),
                (this.location.contactemail && h("div", null,
                    h("a", { href: 'email:' + this.location.contactemail, class: "menu-content-contact email", innerHTML: this.location.contactemail }))),
                (this.location.contactphone && h("div", null,
                    h("a", { href: 'tel:' + this.location.contactphone, class: "menu-content-contact phone", innerHTML: this.location.contactphone })))),
            this.location && this.location.info && h("div", { class: "info", innerHTML: pipes.https.transform(this.location.info) }));
    }
    static get is() { return "yoo-location-info"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "location": {
            "type": "Any",
            "attr": "location"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-location-info:**/"; }
}

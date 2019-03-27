import { translate } from '../../../index';
export class YooFormCreatorBlockSimpleComponent {
    render() {
        return (h("div", { class: "container" },
            h("div", { class: 'icon-container form-icon ' + this.formField.category },
                h("yoo-icon", { class: this.formField.icon + ' always-light' })),
            h("div", { class: "title" }, translate(this.formField.title)),
            h("div", { class: "icon-container plus" },
                h("yoo-icon", { class: "yo-plus always-light" }))));
    }
    static get is() { return "yoo-form-creator-block-simple"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "formField": {
            "type": "Any",
            "attr": "form-field"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-form-creator-block-simple:**/"; }
}

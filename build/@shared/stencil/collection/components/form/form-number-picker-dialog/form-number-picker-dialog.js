import { closeModal, isWeb, translate } from '../../../utils';
const HEADER_HEIGHT = 44;
export class YooFormNumberPickerDialogComponent {
    constructor() {
        this.fullscreen = false;
    }
    handleModalPresent(ev) {
        if (this.selectedElement) {
            setTimeout(() => {
                this.selectedElement.scrollIntoView();
            }, 100);
        }
    }
    componentDidLoad() {
        this.selection = this.value;
    }
    componentDidUnload() {
        this.value = null;
        this.selection = null;
        this.selectedElement = null;
    }
    get fullScrollHeight() {
        let pageHeight = window.innerHeight;
        return pageHeight - HEADER_HEIGHT;
    }
    getDialogTitle() {
        return translate('PICKANUMBER');
    }
    onItemSelect(ev, itemValue) {
        ev.stopPropagation();
        this.selection = itemValue;
        closeModal(this.selection);
    }
    render() {
        const web = isWeb();
        let numberValues = this.values.length + this.values[0];
        return (h("div", { class: "outer-container" },
            h("yoo-ion-toolbar", { color: "light", class: "aautocomplete" },
                h("yoo-ion-title", null, this.getDialogTitle())),
            h("div", { class: "content" },
                h("yoo-ion-scroll", null, this.values.map(i => h("div", { ref: this.value === i ? el => this.selectedElement = el : null, class: this.value === i ? 'item-selected numberpicker' : 'numberpicker', onClick: (ev) => this.onItemSelect(ev, i) },
                    h("div", { class: numberValues === i + 1 ? 'lastElement center' : 'center' },
                        " ",
                        i)))),
                h("div", { class: { 'footer-background bottom': true } }),
                h("div", { class: { 'footer-background middle': true, 'web': web } }),
                h("div", { class: { 'footer-background top': true, 'web': web } }))));
    }
    static get is() { return "yoo-form-number-picker-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "fullscreen": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "selection": {
            "state": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        },
        "values": {
            "type": "Any",
            "attr": "values",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "swipedUp",
            "method": "swipedUp",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "swipedDown",
            "method": "swipedDown",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:ionModalDidPresent",
            "method": "handleModalPresent"
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-number-picker-dialog:**/"; }
}

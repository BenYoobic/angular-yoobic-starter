import { createColorClasses } from '../../../utils/ionic';
import { querySelectorAllDeep } from '../../../utils';
export class YooIonItemDividerComponent {
    componentDidLoad() {
        // Change the button size to small for each ion-button in the item
        // unless the size is explicitly set
        const buttons = querySelectorAllDeep(this.el, 'yoo-ion-button');
        for (let i = 0; i < buttons.length; i++) {
            if (!buttons[i].size) {
                buttons[i].size = 'small';
            }
        }
    }
    hostData() {
        return {
            class: createColorClasses(this.color)
        };
    }
    render() {
        return [
            h("slot", { name: "start" }),
            h("div", { class: "item-divider-inner" },
                h("div", { class: "item-divider-wrapper" },
                    h("slot", null)),
                h("slot", { name: "end" }))
        ];
    }
    static get is() { return "yoo-ion-item-divider"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "el": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-ion-item-divider:**/"; }
}

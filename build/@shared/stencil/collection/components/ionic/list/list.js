import { getAppContext } from '../../../index';
export class YooIonListComponent {
    constructor() {
        /**
         * If true, the list will have margin around it and rounded corners. Defaults to `false`.
         */
        this.inset = false;
    }
    /**
     * Get the [Item Sliding](../../item-sliding/ItemSliding) that is currently open.
     */
    async getOpenItem() {
        return this.openItem;
    }
    /**
     * Set an [Item Sliding](../../item-sliding/ItemSliding) as the open item.
     */
    setOpenItem(itemSliding) {
        this.openItem = itemSliding;
    }
    /**
     * Close the sliding items. Items can also be closed from the [Item Sliding](../../item-sliding/ItemSliding).
     * Returns a boolean value of whether it closed an item or not.
     */
    async closeSlidingItems() {
        if (this.openItem) {
            this.openItem.close();
            this.openItem = undefined;
            return true;
        }
        return false;
    }
    hostData() {
        return {
            class: Object.assign({ [`list-lines-${this.lines}`]: !!this.lines, 'list-inset': this.inset, [`list-${'ios'}-lines-${this.lines}`]: !!this.lines }, getAppContext())
        };
    }
    static get is() { return "yoo-ion-list"; }
    static get properties() { return {
        "closeSlidingItems": {
            "method": true
        },
        "getOpenItem": {
            "method": true
        },
        "inset": {
            "type": Boolean,
            "attr": "inset"
        },
        "lines": {
            "type": String,
            "attr": "lines"
        },
        "setOpenItem": {
            "method": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-ion-list:**/"; }
}

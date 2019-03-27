import { querySelectorDeep, querySelectorAllDeep } from '../../../utils';
export class YooFabContainerComponent {
    constructor() {
        this.animated = false;
        this.activated = false;
        this.toggleActive = () => {
            this.activated = !this.activated;
        };
    }
    render() {
        // select the button that triggers the list
        const fabBtn = querySelectorDeep(this.host, 'yoo-fab-button');
        fabBtn.toggleActive = this.toggleActive;
        fabBtn.activated = this.activated;
        const fabLists = querySelectorAllDeep(this.host, 'yoo-fab-list');
        fabBtn.parentHasList = (fabLists.length > 0);
        // Propagate the activated prop to all lists
        for (let i = 0; i < fabLists.length; i++) {
            fabLists[i].activated = this.activated;
            fabLists[i].animated = this.animated;
        }
        return (h("slot", null));
    }
    static get is() { return "yoo-fab-container"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "activated": {
            "state": true
        },
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-fab-container:**/"; }
}

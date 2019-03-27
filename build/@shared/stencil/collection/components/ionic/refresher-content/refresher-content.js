import { getAppContext } from '../../../utils'; //, setAnimation, animations
export class YooIonRefresherContentComponent {
    render() {
        return [
            h("div", { class: "refresher-pulling" },
                h("div", { class: "refresher-pulling-icon" },
                    h("yoo-icon", { class: "yo-pull-to-refresh" })),
                this.pullingText &&
                    h("div", { class: "refresher-pulling-text", innerHTML: this.pullingText })),
            h("div", { class: "refresher-refreshing" },
                h("div", { class: "refresher-refreshing-icon" }, getAppContext()['boost'] ? h("img", { src: "assets/loader/loading_thin_boost.svg" }) : h("img", { src: "assets/loader/loading_thin.svg" })),
                this.refreshingText &&
                    h("div", { class: "refresher-refreshing-text", innerHTML: this.refreshingText }))
        ];
    }
    static get is() { return "yoo-ion-refresher-content"; }
    static get properties() { return {
        "pullingText": {
            "type": String,
            "attr": "pulling-text"
        },
        "refreshingText": {
            "type": String,
            "attr": "refreshing-text"
        }
    }; }
}

import { pipes, translate, translateMulti } from '../../../index'; //'../../../../stencil';
export class YooDashboardDetailComponent {
    render() {
        return (h("div", { class: "container" },
            h("div", { class: "title" }, translateMulti(this.dashboard.title)),
            h("div", { class: "description", innerHTML: translateMulti(this.dashboard.description || '') }),
            this.dashboard._lmt ? h("div", { class: "date" },
                " ",
                translate('EDITEDON'),
                ":  ",
                pipes.dateFormat.transform(this.dashboard._lmt, 'L')) : null));
    }
    static get is() { return "yoo-dashboard-detail"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "dashboard": {
            "type": "Any",
            "attr": "dashboard"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-dashboard-detail:**/"; }
}

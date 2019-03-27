const h = window.DesignSystem.h;

import { b6 as translateMulti, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';
import './index.js';

class YooDashboardDetailComponent {
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
    static get style() { return ":host .container {\n  padding: 0.5rem; }\n  :host .container .title {\n    font-size: var(--font-l, 17px); }\n  :host .container .description html,\n  :host .container .description body,\n  :host .container .description div,\n  :host .container .description span,\n  :host .container .description applet,\n  :host .container .description object,\n  :host .container .description iframe,\n  :host .container .description h1,\n  :host .container .description h2,\n  :host .container .description h3,\n  :host .container .description h4,\n  :host .container .description h5,\n  :host .container .description h6,\n  :host .container .description p,\n  :host .container .description blockquote,\n  :host .container .description pre,\n  :host .container .description a,\n  :host .container .description abbr,\n  :host .container .description acronym,\n  :host .container .description address,\n  :host .container .description big,\n  :host .container .description cite,\n  :host .container .description code,\n  :host .container .description del,\n  :host .container .description dfn,\n  :host .container .description em,\n  :host .container .description font,\n  :host .container .description img,\n  :host .container .description ins,\n  :host .container .description kbd,\n  :host .container .description q,\n  :host .container .description s,\n  :host .container .description samp,\n  :host .container .description small,\n  :host .container .description strike,\n  :host .container .description strong,\n  :host .container .description sub,\n  :host .container .description sup,\n  :host .container .description tt,\n  :host .container .description var,\n  :host .container .description dl,\n  :host .container .description dt,\n  :host .container .description dd,\n  :host .container .description ol,\n  :host .container .description ul,\n  :host .container .description li,\n  :host .container .description fieldset,\n  :host .container .description form,\n  :host .container .description label,\n  :host .container .description legend,\n  :host .container .description table,\n  :host .container .description caption,\n  :host .container .description tbody,\n  :host .container .description tfoot,\n  :host .container .description thead,\n  :host .container .description tr,\n  :host .container .description th,\n  :host .container .description td {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    outline: 0;\n    font-weight: inherit;\n    font-style: inherit;\n    font-size: 100%;\n    font-family: inherit;\n    vertical-align: baseline;\n    -webkit-margin-before: 0;\n    -webkit-margin-after: 0;\n    -webkit-margin-start: 0;\n    -webkit-margin-end: 0; }\n  :host .container .date {\n    color: var(--text-color, #807f83); }"; }
}

export { YooDashboardDetailComponent as YooDashboardDetail };

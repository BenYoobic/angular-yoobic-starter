import { h } from '../design-system.core.js';

import { b6 as translateMulti } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooPolyglotComponent {
    render() {
        return translateMulti(this.text || '') || '';
    }
    static get is() { return "yoo-polyglot"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get style() { return ""; }
}

export { YooPolyglotComponent as YooPolyglot };

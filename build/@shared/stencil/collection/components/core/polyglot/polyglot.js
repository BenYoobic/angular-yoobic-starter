import { translateMulti } from '../../../utils';
export class YooPolyglotComponent {
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
    static get style() { return "/**style-placeholder:yoo-polyglot:**/"; }
}

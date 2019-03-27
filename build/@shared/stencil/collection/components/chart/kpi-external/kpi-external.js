export class YooKpiExternalComponent {
    render() {
        return (this.config && this.config.url ? h("iframe", { src: this.config.url }) : null);
    }
    static get is() { return "yoo-kpi-external"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "definition": {
            "type": "Any",
            "attr": "definition"
        },
        "host": {
            "elementRef": true
        },
        "isFullScreen": {
            "type": Boolean,
            "attr": "is-full-screen"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-kpi-external:**/"; }
}

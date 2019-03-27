export class YooToolbarComponent {
    constructor() {
        this.showActive = false;
        this.colors = ['accent', 'danger', 'success', 'info', 'warning', 'dark-60'];
    }
    onClick(action) {
        if (action && action.handler) {
            action.handler();
            if (this.showActive) {
                this.activeAction = action;
            }
        }
    }
    getColor(i) {
        return this.colors[i % this.colors.length];
    }
    render() {
        return this.actions ? (h("div", { class: "container" },
            h("div", { class: "actions" }, this.actions.map((a, i) => h("div", { onClick: this.onClick.bind(this, a), class: 'action ' + (this.activeAction === a ? 'active' : '') },
                h("div", { class: "circle-container" },
                    h("div", { class: 'circle-border border-' + this.getColor(i) }),
                    h("div", { class: 'circle ' + this.getColor(i) },
                        h("yoo-icon", { class: a.icon }))),
                h("div", { class: "label" }, a.title)))))) :
            (h("div", { class: "container" },
                h("slot", null)));
    }
    static get is() { return "yoo-toolbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "actions": {
            "type": "Any",
            "attr": "actions"
        },
        "activeAction": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "showActive": {
            "type": Boolean,
            "attr": "show-active"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-toolbar:**/"; }
}

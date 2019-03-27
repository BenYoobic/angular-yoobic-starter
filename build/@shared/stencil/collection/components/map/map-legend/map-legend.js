import { translate, getMapCSSClasses, setAnimation, animations, getAppContext } from '../../../utils';
export class YooMapLegendComponent {
    constructor() {
        this.filterGroups = [];
        this.legendVisible = false;
    }
    componentWillLoad() {
        this.legendColors = getMapCSSClasses();
    }
    onCloseClicked() {
        this.legendVisible = false;
        setAnimation(animations.backgroundFade, this.legendToggleContainer, { open: true });
    }
    toggleLegend() {
        this.legendVisible = true;
        setAnimation(animations.backgroundFade, this.mapLegendContainer, { open: true, duration: 300 });
    }
    renderLegendHeader() {
        return ([
            h("div", { class: "legend-header" },
                h("span", null, translate('LEGEND'))),
            h("div", { class: "close", onClick: () => this.onCloseClicked() },
                h("yoo-icon", { class: "yo-close" }))
        ]);
    }
    renderFilter(filter) {
        return (h("div", { id: filter.value, class: "filter", onClick: () => this.filterClicked.emit(filter) },
            h("div", { class: "filter-count", style: { 'background': `var(--${this.legendColors[filter.value]})` } },
                h("span", null, filter.count)),
            h("span", { class: "filter-title" }, translate(filter.title)),
            h("yoo-form-checkbox", { value: filter.visible })));
    }
    renderMapLegendContainer() {
        return (h("div", { class: "map-legend-container", ref: (el) => this.mapLegendContainer = el },
            h("div", { class: "legend-header-container" }, this.renderLegendHeader()),
            h("div", { class: "filter-group" }, this.filterGroups.map((filter) => {
                return this.renderFilter(filter);
            }))));
    }
    renderLegendToogleContainer() {
        return (h("div", { ref: (el) => this.legendToggleContainer = el, class: "legend-toggle-container", onClick: () => this.toggleLegend() },
            h("yoo-icon", { class: "yo-info" })));
    }
    hostData() {
        return {
            class: Object.assign({ 'open': this.legendVisible }, getAppContext())
        };
    }
    render() {
        return (this.legendVisible ? this.renderMapLegendContainer() : this.renderLegendToogleContainer());
    }
    static get is() { return "yoo-map-legend"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "filterGroups": {
            "type": "Any",
            "attr": "filter-groups"
        },
        "host": {
            "elementRef": true
        },
        "legendVisible": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "filterClicked",
            "method": "filterClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-map-legend:**/"; }
}

import { translate, isWeb } from '../../../index';
import { isString } from 'lodash-es';
export class YooPropertyCardComponent {
    isPositive(value) {
        if (value.isPositive === true || value.isPositive === false) {
            return value.isPositive;
        }
        return value.delta > 0;
    }
    isGrowing(value) {
        if (value.isGrowing === true || value.isGrowing === false) {
            return value.isGrowing;
        }
        return value.delta > 0;
    }
    getArrowIconClassName(value) {
        if (value.delta === 0) {
            return;
        }
        return this.isGrowing(value) ? 'yo-big-arrow-up' : 'yo-big-arrow-down';
    }
    getChartIconClassName(value) {
        if (value.delta === 0) {
            return;
        }
        return this.isGrowing(value) ? 'yo-chart-up' : 'yo-chart-down';
    }
    getDeltaColor(value) {
        if (value.delta === 0) {
            return;
        }
        return this.isPositive(value) ? 'success' : 'danger';
    }
    renderDelta(value, orientation = 'column') {
        if (value.delta === null || value.delta === undefined) {
            return null; // (<div class="delta"><div class="chart-container"><yoo-icon class="yo-no-data"></yoo-icon></div></div>);
        }
        let content = value.delta;
        let deltaContent = [value.delta, value.deltaSign || null].join(' ');
        if (orientation !== 'row') {
            content = [
                h("yoo-icon", { class: (this.getArrowIconClassName(value)) }),
                h("span", null, deltaContent),
                h("div", { class: "chart-container" },
                    h("yoo-icon", { class: (this.getChartIconClassName(value)) }))
            ];
        }
        return (h("div", { class: 'delta ' + (this.getDeltaColor(value)), style: { color: value.colorHex } }, content));
    }
    renderTitle(value) {
        return h("div", { class: "title" },
            h("span", null, translate(value.title)));
    }
    renderNumber(value, orientation = 'column') {
        return (h("div", { class: "number" },
            value.value && h("span", null, value.value),
            orientation === 'column' && value.isPercent && h("span", null, "%")));
    }
    renderColumns(property) {
        return [
            property.values.map((value) => h("div", { class: "p-column" },
                h("div", { class: "top" }, this.renderDelta(value)),
                h("div", { class: "bottom" },
                    this.renderNumber(value),
                    value.title && this.renderTitle(value))))
        ];
    }
    renderGrid(property) {
        return (h("div", { class: "p-type-grid-scroll-container swiper-no-swiping" },
            h("yoo-ion-scroll", { class: "relative", horizontalMode: true, showScrollbar: true },
                h("div", { class: "inner-container" },
                    h("div", { class: 'p-row header ' + property.headers.length }),
                    property.values.map((r) => h("div", { class: 'p-row ' }, r.values.map((value) => (value ? h("span", { class: (value.truncate ? 'break-lines' : null) },
                        " ",
                        isString(value) ? value : translate(value.title),
                        " ") : null))))))));
    }
    getValueArr(value) {
        return [...Array.from(value.keys())];
    }
    renderKpiGrid(property) {
        return (h("div", { class: "p-type-grid-scroll-container swiper-no-swiping" },
            h("yoo-ion-scroll", { class: "relative", horizontalMode: true, showScrollbar: true },
                h("div", { class: "inner-container" }, property.headers.map((value, index) => {
                    return h("div", { class: "p-column" },
                        h("div", { class: "p-column-header" }, value),
                        this.getValueArr(property.values).map((x, valueIdx) => {
                            return h("div", { class: 'p-column-item' }, (property.values[valueIdx].values)[index]);
                        }));
                })))));
    }
    renderRows(p) {
        return [
            p.values.map((value) => h("div", { class: "p-row" },
                value.title && this.renderTitle(value),
                value.value && this.renderNumber(value, 'row'),
                value.delta && this.renderDelta(value, 'row')))
        ];
    }
    // TODO: is this work in progress
    renderChart(p) {
        return h("div", null);
    }
    renderHtml(property) {
        return h("div", null, property.value);
    }
    renderPropertyTitle(property) {
        return (h("div", { class: `details-title ${property.type}` }, translate(property.title)));
    }
    renderPropertyEntity(property) {
        switch (property.type) {
            case 'columns': {
                return this.renderColumns(property);
            }
            case 'grid': {
                return this.host.classList.contains('kpi') ? this.renderKpiGrid(property) : this.renderGrid(property);
            }
            case 'rows': {
                return this.renderRows(property);
            }
            case 'chart': {
                return this.renderChart(property);
            }
            case 'html': {
                return this.renderHtml(property);
            }
            default:
                return null;
        }
    }
    renderPropertyType(property) {
        return (h("div", { class: 'p-type-' + property.type }, this.renderPropertyEntity(property)));
    }
    renderProperty(property) {
        return (h("div", { class: "details" },
            property.title && this.renderPropertyTitle(property),
            property.type && this.renderPropertyType(property)));
    }
    hostData() {
        return {
            class: {
                'web': isWeb()
            }
        };
    }
    render() {
        const TagType = isWeb() ? 'yoo-ion-content' : 'div';
        return (this.properties &&
            h(TagType, { class: "outer-container" }, this.properties.map((property) => this.renderProperty(property))));
    }
    static get is() { return "yoo-property-card"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "extraClass": {
            "type": String,
            "attr": "extra-class"
        },
        "host": {
            "elementRef": true
        },
        "properties": {
            "type": "Any",
            "attr": "properties"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-property-card:**/"; }
}

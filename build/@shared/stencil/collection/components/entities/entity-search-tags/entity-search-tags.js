import { getAppContext } from '../../../utils';
import { isString } from 'lodash-es';
export class YooEntitySearchTagsComponent {
    constructor() {
        this.values = [];
        this.selects = [];
        this.slidesOptions = {
            spaceBetween: 10,
            freeMode: true
        };
    }
    componentWillLoad() {
        this.selects = this.values;
    }
    isSelected(item) {
        for (let select of this.selects) {
            if (item.tag === select.tag) {
                return true;
            }
        }
        return false;
    }
    updateSelects(item) {
        let selects = this.selects;
        let index = selects.findIndex(s => s._id === item._id);
        if (index > -1) {
            selects.splice(index, 1);
            return selects;
        }
        else {
            selects.push(item);
            return selects;
        }
    }
    onSelect(ev, item) {
        ev.stopPropagation();
        this.selects = [...this.updateSelects(item)];
        this.select.emit(this.selects);
    }
    onFilterAdvanced() {
        this.filterAdvanced.emit(true);
    }
    renderLi(item) {
        return (h("div", { class: 'menu-item ' + (this.isSelected(item) ? 'selected' : ''), onClick: (ev) => this.onSelect(ev, item) }, item.tag));
    }
    hostData() {
        return {
            class: Object.assign({ 'swiper-no-swiping': true }, getAppContext())
        };
    }
    render() {
        let filterCount = 0;
        if (this.sortsAndFilters && this.sortsAndFilters.filters) {
            filterCount += this.sortsAndFilters.filters.length;
        }
        if (this.sortsAndFilters && this.sortsAndFilters.sorts) {
            filterCount += this.sortsAndFilters.sorts.length;
        }
        return (h("div", { class: 'outer-container ' + (this.tags ? '' : 'margin') + (this.hideAdvancedFilters ? '' : (filterCount > 0 ? ' advanced-filters-count' : ' advanced-filters')) }, this.tags ?
            [!this.hideAdvancedFilters ?
                    h("yoo-button", { onClick: () => this.onFilterAdvanced(), icon: "yo-filter", text: filterCount > 0 ? filterCount.toString() : null, class: 'fab no-shadow' + (filterCount > 0 ? ' reverse-order' : ' icon-only') }) : h("div", { class: "button-spacer" }),
                h("yoo-ion-scroll", { class: "horizontal" },
                    h("div", { class: "button-spacer" }),
                    this.tags.filter(value => value && value.tag && isString(value.tag)).map(value => {
                        return (this.renderLi(value));
                    }),
                    h("div", { class: "button-spacer" }))]
            : h("div", { class: "placeholder" })));
    }
    static get is() { return "yoo-entity-search-tags"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "hideAdvancedFilters": {
            "type": Boolean,
            "attr": "hide-advanced-filters"
        },
        "host": {
            "elementRef": true
        },
        "selects": {
            "state": true
        },
        "slidesOptions": {
            "state": true
        },
        "sortsAndFilters": {
            "type": "Any",
            "attr": "sorts-and-filters"
        },
        "tags": {
            "type": "Any",
            "attr": "tags"
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "select",
            "method": "select",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "filterAdvanced",
            "method": "filterAdvanced",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-entity-search-tags:**/"; }
}

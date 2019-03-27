const h = window.DesignSystem.h;

import { a6 as debounce, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooTabsComponent {
    constructor() {
        this.titles = [];
        this.selected = 0;
        this.numberTabsDisplayed = 4;
    }
    selectedChange(newValue) {
        if (newValue < this.titles.length && newValue >= 0) {
            this.selectedTab = this.titles[newValue];
        }
    }
    titlesChange(newValue) {
        if (this.selected < this.titles.length) {
            this.selectedTab = this.titles[this.selected];
        }
    }
    setMaximumTabDisplayable(newValue) {
        const maxWidthTitle = 100;
        const maxHeightTitle = 70;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let displayableTabs;
        if (this.host.classList.contains('vertical')) {
            displayableTabs = Math.floor((height / maxHeightTitle)) - 1;
        }
        else {
            displayableTabs = Math.floor((width / maxWidthTitle)) - 1;
        }
        if (newValue < displayableTabs) {
            this.tabsDisplayed = newValue;
        }
        else {
            this.tabsDisplayed = displayableTabs;
        }
    }
    componentWillLoad() {
        if (this.selected < this.titles.length) {
            this.selectedTab = this.titles[this.selected];
        }
        this.setMaximumTabDisplayable(this.numberTabsDisplayed);
        this.resizeListener = debounce(this.onResize, 500).bind(this);
        window.addEventListener('resize', this.resizeListener);
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    onResize() {
        this.setMaximumTabDisplayable(this.numberTabsDisplayed);
    }
    handleClickTab(title) {
        this.selectedTab = title;
        this.tabChanged.emit(title);
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "tab-selector" },
                this.titles.slice(0, this.tabsDisplayed).map((title) => h("div", { class: 'tab-title' + ((this.selectedTab === title) ? ' active-title' : ''), onClick: () => this.handleClickTab(title) }, title)),
                this.tabsDisplayed < this.titles.length ?
                    h("div", { class: "tab-title" },
                        h("yoo-context-menu", { class: this.host.classList.contains('vertical') ? 'tab-vertical' : 'tab' },
                            h("div", { slot: "trigger", class: "tab-title-other" },
                                translate('OTHER1'),
                                " ",
                                h("span", { class: this.host.className.indexOf('vertical') !== -1 ? 'yo-right' : 'yo-arrow-dropdown' })),
                            this.titles.slice(this.tabsDisplayed).map((title, index) => h("div", { class: 'other-title dropdown-entry' + ((index) ? ' border-bottom' : ''), onClick: () => this.handleClickTab(title), "data-yoo-context-menu": true }, title))))
                    : null),
            h("div", { class: "tab-content" }, this.titles.map((title) => h("div", { class: this.selectedTab === title ? 'selected-tab' : 'undisplayed-tab' },
                h("slot", { name: title }))))));
    }
    static get is() { return "yoo-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "numberTabsDisplayed": {
            "type": Number,
            "attr": "number-tabs-displayed",
            "watchCallbacks": ["setMaximumTabDisplayable"]
        },
        "selected": {
            "type": Number,
            "attr": "selected",
            "watchCallbacks": ["selectedChange"]
        },
        "selectedTab": {
            "state": true
        },
        "tabsDisplayed": {
            "state": true
        },
        "titles": {
            "type": "Any",
            "attr": "titles",
            "watchCallbacks": ["titlesChange"]
        }
    }; }
    static get events() { return [{
            "name": "tabChanged",
            "method": "tabChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  background: var(--light, #FFFFFF);\n  color: var(--stable, #adadad); }\n  :host .outer-container .tab-selector {\n    border-bottom-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--dark-10, #e6eaf0);\n    width: 100%; }\n    :host .outer-container .tab-selector .tab-title {\n      display: inline-block;\n      padding: 1rem;\n      -webkit-transform: translateY(1px);\n      transform: translateY(1px); }\n    :host .outer-container .tab-selector .tab-title:hover {\n      border-bottom-width: 0.1rem;\n      border-top-width: 0rem;\n      border-right-width: 0rem;\n      border-bottom-width: 0rem;\n      border-left-width: 0rem;\n      border-style: solid;\n      border-color: var(--success, #04CC99);\n      color: var(--success, #04CC99);\n      cursor: pointer; }\n    :host .outer-container .tab-selector .tab-title:focus {\n      border-top-width: 0.1rem;\n      border-right-width: 0.1rem;\n      border-bottom-width: 0.1rem;\n      border-left-width: 0.1rem;\n      border-style: solid;\n      border-radius: 0.2rem;\n      border-color: var(--success, #04CC99);\n      outline-width: 0rem; }\n    :host .outer-container .tab-selector .tab-title.active-title {\n      border-bottom-width: 0.1rem;\n      border-top-width: 0rem;\n      border-right-width: 0rem;\n      border-bottom-width: 0rem;\n      border-left-width: 0rem;\n      border-style: solid;\n      border-color: var(--success, #04CC99);\n      color: var(--success, #04CC99); }\n  :host .outer-container .tab-content {\n    padding: 1rem; }\n    :host .outer-container .tab-content .undisplayed-tab {\n      display: none; }\n    :host .outer-container .tab-content .selected-tab {\n      display: block;\n      width: 100%; }\n\n:host(.vertical).accent .outer-container {\n  color: var(--stable, #adadad); }\n  :host(.vertical).accent .outer-container .tab-selector .tab-title:hover {\n    border-right-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--accent, #1FB6FF);\n    color: var(--accent, #1FB6FF); }\n  :host(.vertical).accent .outer-container .tab-selector .tab-title:focus {\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-style: solid;\n    border-radius: 0.2rem;\n    border-color: var(--accent, #1FB6FF);\n    outline-width: 0rem; }\n  :host(.vertical).accent .outer-container .tab-selector .tab-title.active-title {\n    border-right-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--accent, #1FB6FF);\n    color: var(--accent, #1FB6FF); }\n\n:host(.vertical).danger .outer-container {\n  color: var(--stable, #adadad); }\n  :host(.vertical).danger .outer-container .tab-selector .tab-title:hover {\n    border-right-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--danger, #ff625f);\n    color: var(--danger, #ff625f); }\n  :host(.vertical).danger .outer-container .tab-selector .tab-title:focus {\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-style: solid;\n    border-radius: 0.2rem;\n    border-color: var(--danger, #ff625f);\n    outline-width: 0rem; }\n  :host(.vertical).danger .outer-container .tab-selector .tab-title.active-title {\n    border-right-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--danger, #ff625f);\n    color: var(--danger, #ff625f); }\n\n:host(.vertical).info .outer-container {\n  color: var(--stable, #adadad); }\n  :host(.vertical).info .outer-container .tab-selector .tab-title:hover {\n    border-right-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--info, #fc459e);\n    color: var(--info, #fc459e); }\n  :host(.vertical).info .outer-container .tab-selector .tab-title:focus {\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-style: solid;\n    border-radius: 0.2rem;\n    border-color: var(--info, #fc459e);\n    outline-width: 0rem; }\n  :host(.vertical).info .outer-container .tab-selector .tab-title.active-title {\n    border-right-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--info, #fc459e);\n    color: var(--info, #fc459e); }\n\n:host(.vertical) .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  :host(.vertical) .outer-container .tab-selector {\n    border-right-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--dark-10, #e6eaf0);\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: unset; }\n    :host(.vertical) .outer-container .tab-selector .tab-title {\n      display: inline;\n      padding: 1rem;\n      -webkit-transform: translateX(2px) !important;\n      transform: translateX(2px) !important; }\n    :host(.vertical) .outer-container .tab-selector .tab-title:hover {\n      border-right-width: 0.1rem;\n      border-top-width: 0rem;\n      border-right-width: 0rem;\n      border-bottom-width: 0rem;\n      border-left-width: 0rem;\n      border-style: solid;\n      border-color: var(--success, #04CC99);\n      color: var(--success, #04CC99); }\n    :host(.vertical) .outer-container .tab-selector .tab-title.active-title {\n      border-right-width: 0.1rem;\n      border-top-width: 0rem;\n      border-right-width: 0rem;\n      border-bottom-width: 0rem;\n      border-left-width: 0rem;\n      border-style: solid;\n      border-color: var(--success, #04CC99);\n      color: var(--success, #04CC99); }\n\n:host(.accent) .outer-container {\n  color: var(--stable, #adadad); }\n  :host(.accent) .outer-container .tab-selector .tab-title:hover {\n    border-bottom-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--accent, #1FB6FF);\n    color: var(--accent, #1FB6FF); }\n  :host(.accent) .outer-container .tab-selector .tab-title:focus {\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-style: solid;\n    border-radius: 0.2rem;\n    border-color: var(--accent, #1FB6FF);\n    outline-width: 0rem; }\n  :host(.accent) .outer-container .tab-selector .tab-title.active-title {\n    border-bottom-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--accent, #1FB6FF);\n    color: var(--accent, #1FB6FF); }\n\n:host(.danger) .outer-container {\n  color: var(--stable, #adadad); }\n  :host(.danger) .outer-container .tab-selector .tab-title:hover {\n    border-bottom-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--danger, #ff625f);\n    color: var(--danger, #ff625f); }\n  :host(.danger) .outer-container .tab-selector .tab-title:focus {\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-style: solid;\n    border-radius: 0.2rem;\n    border-color: var(--danger, #ff625f);\n    outline-width: 0rem; }\n  :host(.danger) .outer-container .tab-selector .tab-title.active-title {\n    border-bottom-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--danger, #ff625f);\n    color: var(--danger, #ff625f); }\n\n:host(.info) .outer-container {\n  color: var(--stable, #adadad); }\n  :host(.info) .outer-container .tab-selector .tab-title:hover {\n    border-bottom-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--info, #fc459e);\n    color: var(--info, #fc459e); }\n  :host(.info) .outer-container .tab-selector .tab-title:focus {\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-style: solid;\n    border-radius: 0.2rem;\n    border-color: var(--info, #fc459e);\n    outline-width: 0rem; }\n  :host(.info) .outer-container .tab-selector .tab-title.active-title {\n    border-bottom-width: 0.1rem;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-bottom-width: 0rem;\n    border-left-width: 0rem;\n    border-style: solid;\n    border-color: var(--info, #fc459e);\n    color: var(--info, #fc459e); }"; }
}

export { YooTabsComponent as YooTabs };

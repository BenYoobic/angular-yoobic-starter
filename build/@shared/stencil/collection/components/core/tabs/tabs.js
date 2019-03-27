import { translate, debounce } from '../../../utils';
export class YooTabsComponent {
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
    static get style() { return "/**style-placeholder:yoo-tabs:**/"; }
}

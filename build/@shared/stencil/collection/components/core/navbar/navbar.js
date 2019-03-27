import { getElementDimensions, querySelectorAllDeep, translate, animations, setAnimation, getAppContext, debounce } from '../../../utils';
const DROPDOWN_WIDTH = 40;
const ANIMATION_LOAD_TIME = 200;
export class YooNavbarComponent {
    constructor() {
        this.withLine = false;
        this.swipeableIndicator = false;
        this.scrollTabs = false;
        this.slidesOffsetBefore = 0;
        this.reduceFontSize = 10;
        this.showDropdown = false;
        this.loading = true;
        this.elementWidths = [];
        this.scrollByUser = true;
        this.currentScroll = 0;
        this.innerContainers = [];
    }
    onSelectedSwipeIndexChange(newIndex) {
        if (newIndex >= 0) {
            this.navSlides.slideTo(newIndex);
        }
    }
    checkSelectedTab() {
        if (!this.selectedTab) {
            this.setSelectedTab(this.tabs[0]);
            this.selectedTabIndex = 0;
        }
        else {
            this.selectedTabIndex = this.tabs.indexOf(this.selectedTab);
        }
        this.numberOfVisibleItems = this.tabs.length;
    }
    async onSelectScrollTab(tab, index) {
        const isToRight = (index > this.selectedTabIndex);
        const previousIndex = this.selectedTabIndex;
        if (this.selectedTab && this.selectedTab.value !== tab.value) {
            if (this.host.classList.contains('swipeable') && this.navSlides) {
                let activeIndex = await this.navSlides.getActiveIndex();
                index = activeIndex;
            }
            this.setSelectedTab(tab);
            this.selectedTabIndex = index;
            this.tabSelectedIsToRight.emit(isToRight);
        }
        if (this.elementWidths && this.elementWidths[index] && !this.host.classList.contains('swipeable')) {
            this.scrollToTab(this.getElementWidth(index, true), this.getElementWidth(index), isToRight, index, previousIndex);
        }
    }
    onScrollTabChanged() {
        setTimeout(() => {
            if (this.selectedTabIndex > 0) {
                this.onSelectScrollTab(this.selectedTab, this.selectedTabIndex);
            }
        }, ANIMATION_LOAD_TIME);
    }
    setActive(i) {
        this.setSelectedTab(this.tabs[i]);
        this.selectedTabIndex = i;
        this.numberOfVisibleItems = this.tabs.length;
    }
    getActiveIndex() {
        return Promise.resolve(this.tabs.indexOf(this.selectedTab));
    }
    componentWillLoad() {
        if (this.tabs) {
            this.checkSelectedTab();
        }
    }
    componentDidLoad() {
        this.elementWidths = this.width;
        setTimeout(() => {
            this.elementWidths = this.width;
            this.hostWidth = getElementDimensions(this.host).width;
            this.resizePage();
            this.setSlideOffset();
            this.loading = false;
        }, ANIMATION_LOAD_TIME);
        this.resizeListener = debounce(this.resizePage, 500).bind(this);
        window.addEventListener('resize', this.resizeListener);
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    setSelectedTab(tab) {
        if (!this.selectedTab || this.selectedTab.value !== tab.value) {
            this.selectedTab = tab;
            this.tabSelected.emit(tab);
        }
    }
    get dropDownWidth() {
        return this.activeTitleInDropdown ? this.getElementWidth(this.selectedTabIndex) + 20 : DROPDOWN_WIDTH;
    }
    get width() {
        let elementWidth = 0;
        let tabs = Array.from(querySelectorAllDeep(this.host, '.inner-container'));
        let width = tabs.map(tab => {
            elementWidth += tab.clientWidth;
            return { width: tab.clientWidth, accumulatedWidth: elementWidth };
        });
        return width;
    }
    get activeTitleInDropdown() {
        return this.tabs.slice(0, this.numberOfVisibleItems).findIndex(i => i === this.selectedTab) < 0;
    }
    getElementWidth(index, accumulatedWidth = false) {
        let elementWidth = this.elementWidths[index];
        if (elementWidth) {
            if (accumulatedWidth) {
                return elementWidth.accumulatedWidth;
            }
            else {
                return elementWidth.width;
            }
        }
        else {
            return 0;
        }
    }
    async onIonSlideDidChange() {
        let activeIndex = await this.navSlides.getActiveIndex();
        this.setSelectedTab(this.tabs[activeIndex]);
    }
    setSlideOffset() {
        const HALF_SLIDE_WIDTH = window.innerWidth * 0.2;
        this.slidesOffsetBefore = (this.hostWidth / 2) - HALF_SLIDE_WIDTH;
    }
    onSelectSwipeableTab(index) {
        this.navSlides.slideTo(index, 300);
    }
    onSelectTab(tab, index) {
        if (this.host.classList.contains('swipeable')) {
            this.onSelectSwipeableTab(index);
        }
        else {
            this.onSelectScrollTab(tab, index);
        }
    }
    scrollToTab(tabPosition, tabWidth, isToRight, index, previousIndex) {
        this.scrollByUser = false;
        let tabs = Array.from(querySelectorAllDeep(this.host, '.inner-container'));
        this.applyTabStyles(true, tabs);
        this.activeBarWidth = this.getElementWidth(index);
        if (this.activeBar) {
            this.activeBar.setAttribute('style', `display: block;`);
        }
        const PADDING = 40;
        let maxNavbarPosition = this.currentScroll + this.hostWidth;
        let minNavbarPosition = this.currentScroll;
        if (this.scroll) {
            if (tabPosition > maxNavbarPosition) {
                let newScrollPosition = (tabPosition - maxNavbarPosition) + this.currentScroll + PADDING;
                this.scroll.scrollToPoint(newScrollPosition, 0, 500);
                this.scrollActiveBar((PADDING + (tabPosition - maxNavbarPosition)), index, previousIndex);
            }
            else if ((tabPosition - tabWidth) < minNavbarPosition) {
                let newScrollPosition = this.currentScroll - (minNavbarPosition - (tabPosition - tabWidth)) - PADDING;
                this.scroll.scrollToPoint(newScrollPosition, 0, 500);
                this.scrollActiveBar(((PADDING + (minNavbarPosition - (tabPosition - tabWidth))) * -1), index, previousIndex);
            }
            else {
                let smallPadding = isToRight ? 10 : -10;
                this.scroll.scrollToPoint((this.currentScroll + smallPadding), 0, 500);
                this.scrollActiveBar(smallPadding, index, previousIndex);
            }
        }
        else {
            this.scrollActiveBar(0, index, previousIndex);
        }
        setTimeout(() => {
            if (this.activeBar) {
                this.activeBar.setAttribute('style', `display: none;`);
                this.applyTabStyles(false, tabs);
                this.scrollByUser = true;
            }
        }, 500);
    }
    applyTabStyles(add, tabs) {
        tabs.forEach((tab) => {
            if (add) {
                tab.classList.add('block-color');
            }
            else {
                tab.classList.remove('block-color');
            }
        });
    }
    scrollActiveBar(scrollOffset = 0, index, previousIndex) {
        if (this.activeBar && this.elementWidths && this.elementWidths[this.selectedTabIndex]) {
            let currentLeft = this.activeBarLeftPosition;
            this.activeBarLeftPosition = this.getElementWidth(this.selectedTabIndex, true) - this.getElementWidth(this.selectedTabIndex) - scrollOffset - this.currentScroll;
            if (index !== undefined && index === 0) {
                this.activeBarLeftPosition = 0;
            }
            else if (index === this.tabs.length - 1) {
                this.activeBarLeftPosition = (this.hostWidth - this.activeBarWidth);
            }
            setAnimation(animations.leftSlide, this.activeBar, { startPosition: currentLeft, endPosition: this.activeBarLeftPosition, duration: 300, startWidth: this.getElementWidth(previousIndex), endWidth: this.activeBarWidth });
        }
    }
    getNumberOfVisibleItems(hostWidth, elementWidths) {
        if (elementWidths.length === 0) {
            return this.tabs ? this.tabs.length : 0;
        }
        else if (hostWidth <= elementWidths[0].accumulatedWidth) {
            return 1;
        }
        else if (elementWidths[elementWidths.length - 1].accumulatedWidth <= hostWidth) {
            return elementWidths.length;
        }
        else {
            return elementWidths.findIndex((i) => {
                return i.accumulatedWidth > hostWidth;
            });
        }
    }
    onIonScroll(ev) {
        if (ev && ev.detail) {
            if (this.scrollByUser) {
                this.activeBarLeftPosition = this.activeBarLeftPosition + (this.currentScroll - ev.detail.currentX);
            }
            this.currentScroll = ev.detail.currentX;
        }
    }
    resizePage() {
        let totalTabs = this.tabs ? this.tabs.length : 0;
        let elementDifference = totalTabs - this.getNumberOfVisibleItems(this.hostWidth, this.elementWidths);
        this.scrollTabs = elementDifference > 0;
    }
    actionBtnClicked() {
        this.actionButtonClicked.emit(true);
    }
    renderTab(tab, index, array, wrapperType = '') {
        return (h("yoo-tappable", { class: "center" },
            h("div", { class: 'inner-container ' + wrapperType + ' ' + (this.selectedTab === tab ? (this.withLine ? ' active-line' : ' active') : (this.withLine ? ' line' : '')) + ' tab' + index + (index === array.length - 1 ? ' last' : ''), onClick: () => this.onSelectTab(tab, index), ref: el => this.innerContainers[index] = el },
                tab.notif && h("div", { class: "notification" }),
                h("div", { class: 'text-container' + ` font-size-${this.reduceFontSize}` + (this.selectedTab === tab ? ' active' : '') },
                    h("span", { class: {
                            'wrap-title': this.host.classList.contains('swipeable')
                        } }, tab.title)))));
    }
    renderSwipeable() {
        return [
            h("div", { class: "slide-container" },
                h("yoo-ion-slides", { onIonSlideWillChange: () => this.onIonSlideDidChange(), options: { width: window.innerWidth * 0.4, centeredSlides: true, slidesOffsetBefore: this.slidesOffsetBefore }, ref: el => this.navSlides = el }, this.tabs.slice(0, this.numberOfVisibleItems).map((tab, index, array) => h("yoo-ion-slide", null, this.renderTab(tab, index, array, 'inside-slide'))))),
            this.swipeableIndicator && h("div", { class: "active-indicator" }),
            this.swipeableIndicator && h("div", { class: "shadow-border" })
        ];
    }
    renderScrollable() {
        return [
            this.scrollTabs ?
                h("div", { class: "scroll-container" },
                    h("yoo-ion-scroll", { class: {
                            'horizontal no-scrollbar': true,
                            'vertical-center': this.host.classList.contains('swipeable')
                        }, scrollEvents: true, ref: el => this.scroll = el, onIonScroll: (ev) => this.onIonScroll(ev) }, this.tabs.slice(0, this.numberOfVisibleItems).map((tab, index, array) => this.renderTab(tab, index, array))))
                : this.tabs.slice(0, this.numberOfVisibleItems).map((tab, index, array) => this.renderTab(tab, index, array)),
            h("div", { class: "active-bar", ref: el => this.activeBar = el }),
            this.showDropdown ? [
                h("yoo-context-menu", null,
                    h("div", { class: 'inner-container' + (this.activeTitleInDropdown ? ' active' : ''), slot: "trigger", id: "dropdown" },
                        this.activeTitleInDropdown ? this.selectedTab.title : translate('MORE'),
                        " ",
                        h("span", { class: "icon" },
                            h("yoo-icon", { class: "yo-arrow-dropdown" }))),
                    this.tabs.slice(this.numberOfVisibleItems, this.tabs.length).map((tab, i) => h("div", { class: 'dropdown' + (this.selectedTab === tab ? ' active' : '') + ' tab' + i, onClick: () => this.onSelectTab(tab, i) }, tab.title)))
            ]
                : null,
            this.actionBtnText ? h("yoo-button", { class: 'medium ' + this.host.className, text: this.actionBtnText, onClick: () => this.actionBtnClicked() }) : ''
        ];
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (this.tabs ? ([
            h("div", { class: {
                    'outer-container': true,
                    'scroll': this.scrollTabs,
                    'loading': this.loading
                } }, this.host.classList.contains('swipeable') ? this.renderSwipeable() : this.renderScrollable())
        ]) : null);
    }
    static get is() { return "yoo-navbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "actionBtnText": {
            "type": String,
            "attr": "action-btn-text"
        },
        "getActiveIndex": {
            "method": true
        },
        "host": {
            "elementRef": true
        },
        "loading": {
            "state": true
        },
        "numberOfVisibleItems": {
            "state": true
        },
        "reduceFontSize": {
            "state": true
        },
        "scrollTabs": {
            "type": Boolean,
            "attr": "scroll-tabs",
            "mutable": true,
            "watchCallbacks": ["onScrollTabChanged"]
        },
        "selectedSwipeIndex": {
            "type": Number,
            "attr": "selected-swipe-index",
            "watchCallbacks": ["onSelectedSwipeIndexChange"]
        },
        "selectedTab": {
            "type": "Any",
            "attr": "selected-tab",
            "mutable": true,
            "watchCallbacks": ["onSelectScrollTab"]
        },
        "setActive": {
            "method": true
        },
        "showDropdown": {
            "state": true
        },
        "slidesOffsetBefore": {
            "state": true
        },
        "swipeableIndicator": {
            "type": Boolean,
            "attr": "swipeable-indicator"
        },
        "tabs": {
            "type": "Any",
            "attr": "tabs",
            "watchCallbacks": ["checkSelectedTab"]
        },
        "withLine": {
            "type": Boolean,
            "attr": "with-line"
        }
    }; }
    static get events() { return [{
            "name": "tabSelected",
            "method": "tabSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "tabSelectedIsToRight",
            "method": "tabSelectedIsToRight",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionButtonClicked",
            "method": "actionButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-navbar:**/"; }
}

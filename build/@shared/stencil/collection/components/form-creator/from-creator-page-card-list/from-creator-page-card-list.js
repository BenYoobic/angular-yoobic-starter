export class YooFromCreatorPageCardListComponent {
    onPageIndexSelected(newIndex) {
        this.selectPageIndexState = newIndex;
    }
    componentWillLoad() {
        this.selectPageIndexState = this.selectedPageIndex;
    }
    onPageClicked(event, pageIndex) {
        event.stopPropagation();
        this.pageClicked.emit(pageIndex);
    }
    renderPageCards() {
        return (this.missionSlides.map((slide, index) => {
            const selected = (!this.selectPageIndexState && index === 0) || (this.selectPageIndexState === index);
            const pageEntry = {
                pageTitle: slide.title,
                pageNumber: index + 1,
                selected,
                blockNumber: slide.items.length
            };
            return h("yoo-form-creator-page-card", { pageCardEntry: pageEntry, onPageClicked: (event) => this.onPageClicked(event, index) });
        }));
    }
    render() {
        return (h("yoo-ion-scroll", { class: "relative", horizontalMode: true },
            h("div", { class: "cards-container" }, this.renderPageCards())));
    }
    static get is() { return "yoo-from-creator-page-card-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "missionSlides": {
            "type": "Any",
            "attr": "mission-slides"
        },
        "selectedPageIndex": {
            "type": Number,
            "attr": "selected-page-index",
            "watchCallbacks": ["onPageIndexSelected"]
        },
        "selectPageIndexState": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "pageClicked",
            "method": "pageClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-from-creator-page-card-list:**/"; }
}

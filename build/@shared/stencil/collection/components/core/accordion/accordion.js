import { isNullOrUndefined, setAnimation, animations, translate } from '../../../index';
export class YooAccordionComponent {
    constructor() {
        /**
         * Enable or disable multiple selection
         */
        this.allowMultipleSelection = false;
        /**
         * If true, each item will have a border bottom of 1px
         */
        this.showBottomBorder = false;
        /**
         * Entries are the strings that will populate each row of the accordion
         */
        this.entries = [];
        this.items = [];
        this.accordionContentContainers = [];
        this.accordionSelectors = [];
        this.shouldAnimateAfterReRender = false;
    }
    onTitlesChange() {
        const newTitle = this.entries.findIndex((title, index) => title.title !== this.items[index].title);
        if (newTitle > -1) {
            this.items = this.populateItems();
        }
    }
    componentWillLoad() {
        this.items = this.populateItems();
    }
    componentDidUpdate() {
        if (this.shouldAnimateAfterReRender) {
            this.animateTransition(this.selectedIndex, false);
            this.shouldAnimateAfterReRender = false;
        }
    }
    populateItems(selectedValue) {
        return this.entries.map((item) => {
            const selected = selectedValue === undefined ? (item.selected ? true : false) : selectedValue;
            return { title: item.title, selected, subItemCount: item.subItemCount, actionButton: item.actionButton };
        });
    }
    reRenderItems() {
        this.items = [...this.items];
    }
    closeSingleSelection(index) {
        if (!isNullOrUndefined(index)) {
            this.items[index].selected = false;
        }
    }
    openItem(index) {
        this.items[index].selected = true;
    }
    isAnItemSelected() {
        return this.items.some(item => item.selected === true);
    }
    handleMultiSelect(item, index) {
        // Multiple Selection turned on
        if (item.selected) {
            this.closeSingleSelection(index);
            this.animateTransition(index, true);
        }
        else {
            // selectedIndex in multi context corresponds to the last item to be selected
            this.selectedIndex = index;
            this.openItem(index);
            this.shouldAnimateAfterReRender = true;
        }
        this.reRenderItems();
    }
    handleSingleDeselect(index) {
        const shouldCollapseUp = true;
        this.selectedIndex = null;
        this.previousSelectedIndex = index;
        this.animateTransition(index, shouldCollapseUp);
        this.closeSingleSelection(index);
        this.reRenderItems();
    }
    handleSingleSelect(index) {
        this.previousSelectedIndex = this.selectedIndex;
        this.selectedIndex = index;
        this.openItem(this.selectedIndex);
        this.closeSingleSelection(this.previousSelectedIndex);
        // When selecting a new item we need the animation to be triggered after the component
        // is rendered
        this.shouldAnimateAfterReRender = true;
        this.reRenderItems();
    }
    onAccordionClick(item, index) {
        if (index >= 0) {
            if (item.selected && !this.allowMultipleSelection) {
                this.handleSingleDeselect(index);
            }
            else if (!item.selected && !this.allowMultipleSelection) {
                this.handleSingleSelect(index);
            }
            else {
                this.handleMultiSelect(item, index);
            }
            this.accordionSelected.emit(index);
        }
        else {
            this.onMasterTitleClicked();
        }
    }
    onMasterTitleClicked() {
        if (this.isAnItemSelected()) {
            this.items = this.populateItems(false);
        }
        else {
            this.items = this.populateItems(true);
        }
        this.reRenderItems();
    }
    animateTransition(currentIndex, isAnimatedUp) {
        const distance = this.accordionContentContainers[currentIndex].clientHeight;
        let count = 0;
        // Animating the items one by one
        this.items.map((_item, itemIndex) => {
            if (this.previousSelectedIndex > currentIndex) {
                const animationNumber = this.previousSelectedIndex - this.selectedIndex;
                if (itemIndex > currentIndex && animationNumber > count) {
                    setAnimation(animations.slideVertical, this.accordionSelectors[itemIndex], { up: false, distance, open: true });
                    count += 1;
                }
            }
            else if (currentIndex > this.previousSelectedIndex && (this.previousSelectedIndex !== null)) {
                const animationNumber = currentIndex - this.previousSelectedIndex;
                if (itemIndex > this.previousSelectedIndex && animationNumber > count) {
                    setAnimation(animations.slideVertical, this.accordionSelectors[itemIndex], { up: true, distance, open: true });
                    count += 1;
                }
            }
            else {
                if (itemIndex > currentIndex) {
                    setAnimation(animations.slideVertical, this.accordionSelectors[itemIndex], { up: isAnimatedUp, distance, open: true });
                }
            }
        });
    }
    renderIconPair(item, buttonPair) {
        return (h("div", { class: "icon" },
            h("yoo-icon", { class: item.selected ? buttonPair[1] : buttonPair[0] })));
    }
    renderAccordionTitle(item, index, masterTitle = false) {
        return (h("div", { class: {
                'title-container': true,
                'master-title': masterTitle,
                'active-title': item.selected
            }, onClick: () => this.onAccordionClick(item, index) },
            h("div", { class: "left-container" },
                this.iconPairLeft && this.renderIconPair(item, this.iconPairLeft),
                h("div", { class: "title" }, translate(item.title)),
                item.subItemCount && h("span", { class: "count" }, item.subItemCount)),
            h("div", { class: "right-container" },
                item.actionButton && this.renderActionButton(item.actionButton),
                this.iconPairRight && this.renderIconPair(item, this.iconPairRight))));
    }
    renderActionButton(actionButton) {
        return (h("yoo-button", { onClick: () => actionButton.handler(), text: actionButton.text, class: actionButton.cssClass || '' }));
    }
    renderSlot(item, index) {
        return (h("div", { ref: el => (this.accordionContentContainers[index] = el), class: item.selected ? 'selected-accordion' : 'undisplayed-accordion' },
            h("slot", { name: item.title })));
    }
    renderMasterTitle() {
        const item = { title: this.masterTitle, selected: this.isAnItemSelected() };
        return this.renderAccordionTitle(item, -1, true);
    }
    hostData() {
        return {
            class: {
                'bottom-border': this.showBottomBorder
            }
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.masterTitle && this.renderMasterTitle(),
            this.items.map((item, index) => h("div", { class: "accordion-selector", ref: (el) => this.accordionSelectors[index] = el },
                this.renderAccordionTitle(item, index),
                this.renderSlot(item, index)))));
    }
    static get is() { return "yoo-accordion"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowMultipleSelection": {
            "type": Boolean,
            "attr": "allow-multiple-selection"
        },
        "entries": {
            "type": "Any",
            "attr": "entries",
            "watchCallbacks": ["onTitlesChange"]
        },
        "host": {
            "elementRef": true
        },
        "iconPairLeft": {
            "type": "Any",
            "attr": "icon-pair-left"
        },
        "iconPairRight": {
            "type": "Any",
            "attr": "icon-pair-right"
        },
        "items": {
            "state": true
        },
        "masterTitle": {
            "type": String,
            "attr": "master-title"
        },
        "showBottomBorder": {
            "type": Boolean,
            "attr": "show-bottom-border"
        }
    }; }
    static get events() { return [{
            "name": "accordionSelected",
            "method": "accordionSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-accordion:**/"; }
}

import { getAppContext, translate } from '../../../index';
import { MOBILE_FORM_FIELDS, MOBILE_FORM_FIELDS_ADVANCED, FormFieldCategory, FORM_FIELD_CATEGORIES } from '../../../interfaces';
// For an unknown reason the exports below were not working from `../../../interfaces`.
import { ARROW_PAIR } from '../../../interfaces/ui/accordion/accordion.interface';
import { DEVICE_LIST } from '../../../interfaces/ui/devices/device.interface';
import { FormCreatorLeftMenuOptions } from '../../../interfaces/ui/form-creator/form-creator.interface';
export class YooFormCreatorComponent {
    constructor() {
        this.showLivePreview = true;
        this.selectedLeftSelection = FormCreatorLeftMenuOptions.blocks;
        this.selectedPageIndex = 0;
        this.slides = [];
        this.simpleFormBlocks = { information: [] };
    }
    setSelectedPage(index) {
        this.selectedPageIndex = index;
    }
    componentWillLoad() {
        this.slides = this.missionDescription.slides;
        this.deviceList = DEVICE_LIST.map((device) => {
            const item = {
                text: device.displayTitle,
                handler: () => this.onSelectedDeviceClicked(device)
            };
            return item;
        });
        this.selectedDevice = DEVICE_LIST[0];
        this.setSelectedDeviceColors();
        this.setSimpleFormBlockArrays();
    }
    componentDidLoad() {
    }
    componentWillUpdate() {
        this.setSelectedDeviceColors();
    }
    componentDidUpdate() {
        if (this.slides && this.slides.length > 0 && this.selectedDevice) {
            this.selectedDeviceChanged.emit({ loaded: true });
        }
    }
    isSelectedLeftMenu(leftMenu) {
        return leftMenu === this.selectedLeftSelection;
    }
    setSimpleFormBlockArrays() {
        FORM_FIELD_CATEGORIES.forEach(category => {
            this.simpleFormBlocks[category] = [];
        });
        const formFields = [...MOBILE_FORM_FIELDS, ...MOBILE_FORM_FIELDS_ADVANCED];
        formFields.forEach((field) => {
            this.simpleFormBlocks[field.category].push(field);
        });
    }
    setSelectedDeviceColors() {
        if (this.selectedDevice.colors) {
            this.selectedDeviceColors = this.selectedDevice.colors.map(color => color.hexCode);
        }
    }
    onLeftMenuIconSelected(leftMenuIcon) {
        this.selectedLeftSelection = leftMenuIcon;
    }
    onSelectedDeviceClicked(device) {
        this.selectedDeviceChanged.emit({ loaded: false });
        this.selectedDevice = device;
    }
    onHelpClicked() { }
    onSaveCloseClicked(ev) {
        ev.stopPropagation();
        this.saveCloseClicked.emit();
    }
    onToggleLivePreviewClicked() {
        const TRANSITION_DURATION = 300;
        this.livePreview.classList.toggle('hide');
        setTimeout(() => {
            this.showLivePreview = !this.showLivePreview;
        }, TRANSITION_DURATION);
    }
    onColorChanged(event) {
        const selectedColorHex = event.detail;
        const [selectedColor] = this.selectedDevice.colors.filter((color) => color.hexCode === selectedColorHex);
        this.selectedDevice.selectedColor = selectedColor;
        this.selectedDevice = Object.assign({}, this.selectedDevice);
    }
    onAddNewPage() {
    }
    onPageClicked(event) {
        this.selectedPageIndex = event.detail;
        this.pageHeaderClicked.emit(event.detail);
    }
    renderHeader() {
        return (h("yoo-form-creator-header", { formTitle: this.missionDescription.title, isLivePreviewVisible: this.showLivePreview, onHelpClicked: () => this.onHelpClicked(), onSaveCloseClicked: (ev) => this.onSaveCloseClicked(ev), onToggleLivePreviewClicked: () => this.onToggleLivePreviewClicked() }));
    }
    renderContent() {
        return (h("div", { class: "content" },
            this.renderLeftMenu(),
            this.renderLeftSelection(),
            this.renderFormContent(),
            this.renderLivePreview()));
    }
    renderLeftMenu() {
        return (h("div", { class: "left-menu" },
            this.renderIcon(FormCreatorLeftMenuOptions.blocks),
            this.renderIcon(FormCreatorLeftMenuOptions.logic),
            this.renderIcon(FormCreatorLeftMenuOptions.scoring),
            this.renderIcon(FormCreatorLeftMenuOptions.translate)));
    }
    renderIcon(leftMenuOption) {
        const icon = leftMenuOption === FormCreatorLeftMenuOptions.blocks ? 'categories' : leftMenuOption;
        return (h("yoo-icon", { onClick: () => this.onLeftMenuIconSelected(leftMenuOption), class: {
                [`yo-${icon}`]: true,
                [this.isSelectedLeftMenu(leftMenuOption) ? 'success' : 'stable']: true
            } }));
    }
    renderLeftSelection() {
        return (h("div", { class: "left-selection" },
            h("yoo-ion-scroll", { class: "relative" }, this.renderLeftSelectionContent())));
    }
    renderLeftSelectionContent() {
        switch (this.selectedLeftSelection) {
            case 'blocks':
                return this.renderBlockCategorySelection();
            case 'logic':
                return this.renderLogicSelection();
            case 'scoring':
                return this.renderScoringSelection();
            case 'translate':
                return this.renderTranslateSelection();
        }
    }
    renderBlockCategorySelection() {
        const entries = FORM_FIELD_CATEGORIES.map((category) => {
            return { title: category.toUpperCase(), selected: true, subItemCount: this.simpleFormBlocks[category].length };
        });
        return (h("yoo-accordion", { masterTitle: this.selectedLeftSelection.toUpperCase(), class: "sub-accordion", entries: entries, iconPairLeft: ARROW_PAIR, showBottomBorder: true, allowMultipleSelection: true }, FORM_FIELD_CATEGORIES.map(category => h("div", { slot: category.toUpperCase() },
            h("div", { class: "category-block-selection" }, this.simpleFormBlocks[category].map(field => this.renderSimpleBlock(field, category)))))));
    }
    renderLogicSelection() {
        const entries = [{ title: 'CONDITION', selected: true }, { title: 'ACTION', selected: true }];
        const formField = { title: 'PLACEHOLDER', icon: 'yo-info', category: FormFieldCategory.information };
        return (h("yoo-accordion", { class: "sub-accordion", entries: entries, iconPairLeft: ARROW_PAIR, showBottomBorder: true, allowMultipleSelection: true },
            h("div", { slot: "CONDITION" },
                h("yoo-form-creator-block-simple", { formField: formField })),
            h("div", { slot: "ACTION" },
                h("yoo-form-creator-block-simple", { formField: formField }))));
    }
    renderScoringSelection() {
        const entries = [
            { title: 'COMPLIANCESCORING', selected: true },
            { title: 'SECONDARYSCORING', selected: true },
            { title: 'BLOCKSCORING', selected: true }
        ];
        const formField = { title: 'PLACEHOLDER', icon: 'yo-info', category: FormFieldCategory.information };
        return (h("yoo-accordion", { class: "sub-accordion", entries: entries, iconPairLeft: ARROW_PAIR, showBottomBorder: true, allowMultipleSelection: true },
            h("div", { slot: "COMPLIANCESCORING" },
                h("yoo-form-creator-block-simple", { formField: formField })),
            h("div", { slot: "SECONDARYSCORING" },
                h("yoo-form-creator-block-simple", { formField: formField })),
            h("div", { slot: "BLOCKSCORING" },
                h("yoo-form-creator-block-simple", { formField: formField }))));
    }
    renderTranslateSelection() {
        const entries = [{ title: 'TRANSLATE', selected: true }];
        const formField = { title: 'PLACEHOLDER', icon: 'yo-info', category: FormFieldCategory.information };
        return (h("yoo-accordion", { class: "sub-accordion", entries: entries, iconPairLeft: ARROW_PAIR, showBottomBorder: true, allowMultipleSelection: true },
            h("div", { slot: "TRANSLATE" },
                h("yoo-form-creator-block-simple", { formField: formField }))));
    }
    renderSimpleBlock(field, category) {
        if (field.category === category) {
            const formField = { title: field.title, icon: field.icon, category: field.category };
            return (h("yoo-form-creator-block-simple", { formField: formField }));
        }
    }
    renderFormContent() {
        const newPageButton = { text: translate('NEWPAGE'), cssClass: 'small new-page', handler: () => this.onAddNewPage() };
        return (h("div", { class: "form-content" },
            h("yoo-accordion", { class: "pages-accordion", entries: [{ title: 'PAGES', subItemCount: this.slides.length, selected: true, actionButton: newPageButton }, { title: 'CONTENT', selected: true }], iconPairLeft: ARROW_PAIR, showBottomBorder: true, allowMultipleSelection: true },
                h("div", { slot: "PAGES" },
                    h("yoo-from-creator-page-card-list", { missionSlides: this.slides, onPageClicked: (event) => this.onPageClicked(event), selectedPageIndex: this.selectedPageIndex })),
                h("div", { slot: "CONTENT" }, this.renderFormContentBlocks()))));
    }
    renderFormContentBlocks() {
        const formField = { title: 'PLACEHOLDER', icon: 'yo-info', category: FormFieldCategory.information };
        return (h("yoo-form-creator-block-expandable", { formField: formField }));
    }
    renderLivePreview() {
        const selectedDevice = this.selectedDevice && this.selectedDevice.device ? this.selectedDevice.device : '';
        return (h("div", { ref: (el) => this.livePreview = el, class: { 'live-preview': true } },
            this.renderLivePreviewHeader(),
            h("yoo-ion-scroll", { class: "relative" },
                h("div", { class: { 'device-container': true, [selectedDevice]: true } }, this.showLivePreview && [
                    this.selectedDevice.colors &&
                        h("yoo-color-selector", { colors: this.selectedDeviceColors, showTickIcon: false, onColorChanged: (event) => this.onColorChanged(event) }),
                    h("yoo-device", { deviceEntry: this.selectedDevice }, this.renderFormDynamic())
                ]))));
    }
    renderLivePreviewHeader() {
        return (h("div", { class: "live-preview-header" },
            h("div", { class: "title" }, translate('LIVEPREVIEW')),
            h("yoo-context-menu", { contentButtons: this.deviceList, contentPosition: { top: '3.125rem', right: '2rem', bottom: 'auto', left: 'auto' }, onClick: (ev) => ev.stopPropagation() },
                h("div", { class: "icon-container" },
                    h("yoo-icon", { class: "yo-more stable" })))));
    }
    renderFormDynamic() {
        return (h("div", { class: "form-dynamic-slot-container" },
            h("slot", { name: "livePreview" })));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "container" },
            this.renderHeader(),
            this.renderContent()));
    }
    static get is() { return "yoo-form-creator"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "missionDescription": {
            "type": "Any",
            "attr": "mission-description"
        },
        "selectedDevice": {
            "state": true
        },
        "selectedLeftSelection": {
            "state": true
        },
        "selectedPageIndex": {
            "state": true
        },
        "setSelectedPage": {
            "method": true
        },
        "showLivePreview": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "saveCloseClicked",
            "method": "saveCloseClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "pageHeaderClicked",
            "method": "pageHeaderClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "selectedDeviceChanged",
            "method": "selectedDeviceChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-creator:**/"; }
}

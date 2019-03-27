import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMissionDescription, FormFieldCategory, IFormFieldDescription } from '../../../interfaces';
import { IDeviceEntry, IDevice } from '../../../interfaces/ui/devices/device.interface';
import { FormCreatorLeftMenuOptions } from '../../../interfaces/ui/form-creator/form-creator.interface';
export declare class YooFormCreatorComponent {
    /**
     * The campaign being edited in the form creator
     */
    missionDescription: IMissionDescription;
    saveCloseClicked: EventEmitter<void>;
    pageHeaderClicked: EventEmitter<number>;
    selectedDeviceChanged: EventEmitter<{
        loaded: boolean;
    }>;
    showLivePreview: boolean;
    selectedDevice: IDeviceEntry;
    selectedLeftSelection: FormCreatorLeftMenuOptions;
    selectedPageIndex: number;
    host: HTMLStencilElement;
    private slides;
    private deviceList;
    private livePreview;
    private selectedDeviceColors;
    private simpleFormBlocks;
    setSelectedPage(index: number): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    isSelectedLeftMenu(leftMenu: string): boolean;
    setSimpleFormBlockArrays(): void;
    setSelectedDeviceColors(): void;
    onLeftMenuIconSelected(leftMenuIcon: FormCreatorLeftMenuOptions): void;
    onSelectedDeviceClicked(device: IDevice): void;
    onHelpClicked(): void;
    onSaveCloseClicked(ev: CustomEvent<void>): void;
    onToggleLivePreviewClicked(): void;
    onColorChanged(event: CustomEvent<string>): void;
    onAddNewPage(): void;
    onPageClicked(event: CustomEvent<number>): void;
    renderHeader(): JSX.Element;
    renderContent(): JSX.Element;
    renderLeftMenu(): JSX.Element;
    renderIcon(leftMenuOption: FormCreatorLeftMenuOptions): JSX.Element;
    renderLeftSelection(): JSX.Element;
    renderLeftSelectionContent(): JSX.Element;
    renderBlockCategorySelection(): JSX.Element;
    renderLogicSelection(): JSX.Element;
    renderScoringSelection(): JSX.Element;
    renderTranslateSelection(): JSX.Element;
    renderSimpleBlock(field: IFormFieldDescription, category: FormFieldCategory): JSX.Element;
    renderFormContent(): JSX.Element;
    renderFormContentBlocks(): JSX.Element;
    renderLivePreview(): JSX.Element;
    renderLivePreviewHeader(): JSX.Element;
    renderFormDynamic(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

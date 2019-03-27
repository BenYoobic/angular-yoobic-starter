import { IFormField } from '../../entities/form-field/form-field.interface';
import { ISlide } from '../../entities/slide/slide.interface';
import { IEntityAction } from '../../entities/entity/entity.interface';
export interface IModalEntry {
    heading?: string;
    headingIcons?: IModalIcon[];
    hasHeader?: boolean;
    hasFooter?: boolean;
    footerText?: string;
    content?: HTMLElement;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    cssClass?: string;
    animationName?: string;
    animationProp?: any;
    primaryFn?: Function;
    withYooCtrl?: boolean;
    scrollEnabled?: boolean;
}
export interface IModalIcon {
    icon?: string;
    handler?: () => void;
}
export interface IModalUpsertConfig {
    collectionName?: string | any;
    formDefinition?: Array<IFormField>;
    slides?: Array<ISlide>;
    suffix?: string;
    editable?: boolean;
    secondaryActions?: Array<IEntityAction>;
    extraValidators?: Array<any>;
    extraButtons?: Array<IEntityAction>;
    footerButtons?: Array<IEntityAction>;
    ignoreRequired?: boolean;
    readonly?: boolean;
    skipValidation?: boolean;
    title?: string;
    saveText?: string;
    showSaveAsFooter?: boolean;
    hideSaveButton?: boolean;
    cancelText?: string;
    allowEdit?: boolean;
    width?: string;
    height?: any;
    isFullscreen?: boolean;
    canMove?: boolean;
    cssClass?: string;
    hideCloseButton?: boolean;
    keepValueFields?: Array<string>;
}

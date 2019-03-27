import { IEntitiesAction, IEntityAction } from '../../entities/entity/entity.interface';
export interface IToastEntry {
    message?: string;
    icon?: string;
    cssClass?: string;
    closeButtonText?: string;
    duration?: number;
    position?: ToastPosition;
    showCloseButton?: boolean;
    progressEvent?: any;
    showBackdrop?: boolean;
    image?: string;
    extraButtons?: Array<IEntityAction | IEntitiesAction>;
}
export declare type ToastPosition = 'top' | 'bottom';

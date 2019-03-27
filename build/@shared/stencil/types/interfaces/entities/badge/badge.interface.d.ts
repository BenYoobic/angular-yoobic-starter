import { IEntity } from '../entity/entity.interface';
export interface IBadgeEntry extends IEntity {
    text?: string;
    closable?: boolean;
    iconLeft?: string;
    iconRight?: string;
    cssClass?: string;
    progressClass?: string;
}

import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IUser } from '../../../interfaces';
export declare class YooAvatarComponent {
    imgSrc: string;
    topRightIcon: string;
    topLeftIcon: string;
    bottomRightIcon: string;
    bottomLeftIcon: string;
    user: IUser;
    icon: string;
    iconText: string;
    reversedColor: boolean;
    hasPending: boolean;
    topRightClicked: EventEmitter<boolean>;
    topLeftClicked: EventEmitter<boolean>;
    bottomRightClicked: EventEmitter<boolean>;
    bottomLeftClicked: EventEmitter<boolean>;
    host: HTMLStencilElement;
    hasImageData(): string;
    hasImageSource(): string;
    hasIcon(): string;
    hasIconText(): string;
    hasInitial(): IUser;
    renderAvatarWithImage(source: any): JSX.Element;
    renderAvatarWithIcon(): JSX.Element;
    renderAvatarWithIconText(): JSX.Element;
    renderAvatarWithInitial(): JSX.Element;
    renderBasedOnSource(): JSX.Element;
    render(): JSX.Element;
}
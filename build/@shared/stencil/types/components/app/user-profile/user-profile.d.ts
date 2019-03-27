import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IUser, IProfileConfig, IProfileConfigItem } from '../../../index';
export declare class YooUserProfileComponent {
    user: IUser;
    config: IProfileConfig;
    clicked: EventEmitter<string>;
    host: HTMLStencilElement;
    onClicked(item: any): void;
    renderLi(item: IProfileConfigItem): JSX.Element;
    render(): JSX.Element;
}

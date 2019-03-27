import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IUserRank } from '../../../interfaces';
export declare class YooPodiumComponent {
    usersRanked: Array<IUserRank>;
    select: EventEmitter<IUserRank>;
    host: HTMLStencilElement;
    private userRankedContainerEl;
    componentDidLoad(): void;
    private getUserOnPosition;
    private onAvatarClicked;
    renderRichAvatar(userRank: IUserRank): JSX.Element;
    private renderRank;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}

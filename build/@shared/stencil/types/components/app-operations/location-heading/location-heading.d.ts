import '../../../stencil.core';
import { ILocation } from '../../../index';
export declare class YooLocationHeadingComponent {
    location: ILocation;
    lastVisitDate: Date;
    host: HTMLStencilElement;
    onIconClick(): void;
    renderVipBagde(): JSX.Element;
    renderTags(): JSX.Element;
    hostData(): {
        class: {
            'vip': boolean;
        };
    };
    render(): JSX.Element;
}

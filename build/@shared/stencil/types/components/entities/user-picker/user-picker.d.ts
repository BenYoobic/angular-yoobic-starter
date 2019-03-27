import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IUser } from '../../../interfaces';
export declare class YooUserPickerComponent {
    currentUser: IUser;
    usersList: IUser[];
    userSelected: EventEmitter<IUser>;
    filterClicked: EventEmitter<boolean>;
    selectedUser: IUser;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    isCurrentUserInList(): boolean;
    onFilterClicked(): void;
    onUserSelected(user: IUser): void;
    renderUsersList(): JSX.Element;
    render(): JSX.Element;
}

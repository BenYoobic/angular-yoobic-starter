import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ValidatorEntry, AsyncValidator, Validator, IFile } from '../../../interfaces';
interface ICardPosition {
    x?: number;
    y?: number;
    rotation?: number;
}
export declare class YooFormSwipeCardsComponent {
    label: string;
    description: string;
    instructionsDocument: IFile;
    value: Array<Array<string>>;
    answer: Array<Array<string>>;
    values: Array<string | any>;
    images: Array<IFile>;
    categories: Array<string>;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    placeholder: string;
    readonly: boolean;
    mode: 'text' | 'image' | 'textimage';
    required: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    showInstructions: boolean;
    isCardIndexCurrent: Array<boolean>;
    cardPositions: Array<ICardPosition>;
    swipingClass: string;
    host: HTMLStencilElement;
    validity: boolean;
    requiredWatch(): void;
    componentWillLoad(): void;
    validate(): boolean;
    transformString(cardIndex: number): string;
    interactSetPosition(cardIndex: number, coordinates: any): void;
    initInteract(): void;
    initInteractDraggable(): void;
    swipeCard(direction: string, cardIndex: number): void;
    hideCard(directionIndex: number, cardIndex: number): void;
    resetCardPosition(cardIndex: number): void;
    isCurrentCardIndexFirst(): boolean;
    isSwiped(cardIndex: number): boolean;
    areAllCardsSwiped(): boolean;
    onClickArrow(direction: string): void;
    unSwipeCard(): void;
    hideInstructions(): void;
    renderCardText(cardIndex: number): string;
    renderCard(cardIndex: number, isCurrent: boolean): JSX.Element;
    renderInstructionsContainer(): JSX.Element;
    renderButtons(): JSX.Element;
    renderEditable(): JSX.Element;
    renderReadonly(): JSX.Element;
    render(): JSX.Element;
}
export {};

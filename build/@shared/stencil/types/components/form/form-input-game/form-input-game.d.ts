import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooFormInputGameComponent {
    gameName: string;
    phaser: any;
    fieldId: string;
    name: string;
    gameOver: EventEmitter<boolean>;
    isGameOver: boolean;
    host: HTMLStencilElement;
    private gameProps;
    private game;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    setGameProps(): void;
    init(): void;
    render(): JSX.Element;
}

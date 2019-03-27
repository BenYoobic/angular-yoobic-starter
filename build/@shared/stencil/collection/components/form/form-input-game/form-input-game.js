import * as fromGame from '../../games';
export class YooFormInputGameComponent {
    constructor() {
        this.gameName = fromGame.games.runner;
        this.fieldId = 'game-div';
        this.gameProps = null; // test purpose
    }
    componentDidLoad() {
        setTimeout(() => this.init(), 300);
    }
    componentWillUpdate() {
        // console.log('Comp Phaser will Upload, isGameOver?, event emitted by Stencil !', this.isGameOver);
        if (this.isGameOver) {
            this.gameOver.emit(true);
        }
    }
    setGameProps() {
        this.gameProps = { fieldId: this.fieldId };
        // console.log('gameProps', this.gameProps);
    }
    init() {
        this.game = fromGame.gameFactory(this.gameName);
        this.game.gameover.subscribe(val => {
            this.isGameOver = val;
        });
        // console.log('game', this.game);
        this.setGameProps();
        this.game.initWithPhaser(this.gameProps, this.phaser);
    }
    render() {
        return (h("div", null,
            h("div", { class: "outer-container", id: this.fieldId })));
    }
    static get is() { return "yoo-form-input-game"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "fieldId": {
            "type": String,
            "attr": "field-id"
        },
        "gameName": {
            "type": String,
            "attr": "game-name"
        },
        "host": {
            "elementRef": true
        },
        "isGameOver": {
            "state": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "phaser": {
            "type": "Any",
            "attr": "phaser"
        }
    }; }
    static get events() { return [{
            "name": "gameOver",
            "method": "gameOver",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-input-game:**/"; }
}

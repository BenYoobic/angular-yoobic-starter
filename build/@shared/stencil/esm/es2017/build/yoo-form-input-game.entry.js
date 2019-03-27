import { h } from '../design-system.core.js';

import { c as Subject } from './chunk-c535de07.js';

const DEFAULT_ASSETS_DIR = 'assets/game';
class AbstractGame {
    constructor() {
        this.gameover = new Subject();
    }
    initWithPhaser(props, phaser) {
        AbstractGame._phaser = phaser;
        if (props.assetDir) {
            this.assetDir = props.assetDir;
        }
        else {
            this.assetDir = DEFAULT_ASSETS_DIR;
        }
        this.fieldId = props.fieldId;
        this.initGameInstance(props);
        //this.gameInstance = this.gameInstance; ??
    }
    initGameInstance(_props) {
        return null;
    }
    getPreloadGame() {
        return null;
    }
    getCreateGame() {
        return null;
    }
    getUpdateGame() {
        return null;
    }
}
AbstractGame._phaser = null;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function shuffle(array) {
    let i, j = 0, temp = null;
    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class CardGame extends AbstractGame {
    constructor() {
        super();
        this.config = {
            gameWidth: 400,
            gameHeight: 600
        };
        this.values = [];
        this.correctValues = [];
        this.wrongValues = [];
        this.gameOptions = {
            cardScale: 1,
            cardWidth: 167,
            cardHeight: 243,
            flipSpeed: 190,
            flipZoom: 1.5,
            initViewDuration: 10000,
            backgroundColor: '#fff',
            mainLabelColor: '#41307c',
            cardTextColor: '#1d1f35',
            correctAnswerColor: '#44C3AA'
        };
        this.REVEALED_FRAME = 1;
        this.cards = [];
        this.texts = [];
        this.flippingCards = [];
        this.lastPickedCards = [];
    }
    initGameInstance(props) {
        // custom props added
        this.values = props.values;
        this.correctValues = props.correctValues;
        this.wrongValues = props.wrongValues;
        this.gameInstance = new AbstractGame._phaser.Game(this.config.gameWidth, this.config.gameHeight, AbstractGame._phaser.AUTO, props.fieldId, {
            preload: () => this.getPreloadGame(),
            create: () => this.getCreateGame(),
            update: () => this.getUpdateGame()
        });
    }
    getPreloadGame() {
        this.gameInstance.load.spritesheet('card', this.assetDir + '/card_sprite.png', this.gameOptions.cardWidth, this.gameOptions.cardHeight);
    }
    getCreateGame() {
        this.gameInstance.stage.backgroundColor = this.gameOptions.backgroundColor;
        this.resetGameData();
        this.initDeck();
        this.initHUD();
    }
    initDeck() {
        this.gameOptions.cardScale = Math.min(this.gameInstance.world.width / 2 / this.gameOptions.cardWidth, this.gameInstance.world.height / 2 / this.gameOptions.cardHeight) - 0.05;
        this.gameOptions.flipZoom = this.gameOptions.cardScale * 1.5;
        let positions = [
            { x: 10, y: 15 },
            {
                x: this.gameInstance.world.width - this.gameOptions.cardWidth * this.gameOptions.cardScale - 5,
                y: 15
            },
            {
                x: 10,
                y: this.gameInstance.world.height - this.gameOptions.cardHeight * this.gameOptions.cardScale - 15
            },
            {
                x: this.gameInstance.world.width - this.gameOptions.cardWidth * this.gameOptions.cardScale - 5,
                y: this.gameInstance.world.height - this.gameOptions.cardHeight * this.gameOptions.cardScale - 15
            }
        ];
        shuffle(positions);
        for (let i = 0; i < this.values.length; i++) {
            this.cards[i] = this.createCard(i, positions[i], true);
            this.texts[i] = this.createCardText(this.cards[i]);
            this.createFlippingTweens(i, this.cards[i], this.texts[i]);
        }
        setTimeout(() => {
            this.hideAllCards();
            this.mainLabel.setText('');
        }, this.gameOptions.initViewDuration);
    }
    initHUD() {
        let fontSize = Math.round(Math.min(this.gameInstance.world.height * 0.05, this.gameInstance.world.width * 0.05));
        this.mainLabel = this.gameInstance.add.text(0, 0, 'MEMORY-GAME-INSTRUCTIONS', {
            fontSize: fontSize + 'px',
            fontWeight: 'bold',
            fill: '#fff',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
            backgroundColor: this.gameOptions.mainLabelColor
        });
        this.mainLabel.setTextBounds(0, this.gameInstance.world.height / 2 - 15, this.gameInstance.world.width, 30);
    }
    playerHasWon() {
        let hasWon = true;
        this.cards.forEach(card => {
            if (!card.data.solved) {
                hasWon = false;
            }
        });
        return hasWon;
    }
    createCard(cardIndex, pos, initRevealed) {
        let card = this.gameInstance.add.sprite((this.gameOptions.cardScale * this.gameOptions.cardWidth) / 2 + pos.x, (this.gameOptions.cardScale * this.gameOptions.cardHeight) / 2 + pos.y, 'card');
        if (initRevealed) {
            card.frame = 1;
        }
        card.data = {
            idx: cardIndex,
            text: this.values[cardIndex],
            revealed: initRevealed === true,
            solved: false
        };
        card.anchor.set(0.5); // setting card anchor points to its center
        card.scale.set(this.gameOptions.cardScale);
        return card;
    }
    createCardText(sprite) {
        let style = {
            fontSize: '20px',
            fill: this.gameOptions.cardTextColor,
            wordWrap: true,
            wordWrapWidth: sprite.width,
            align: 'center',
            backgroundColor: 'transparent'
        };
        let text = this.gameInstance.add.text(sprite.x, sprite.y, sprite.data.revealed ? sprite.data.text : '', style);
        text.anchor.set(0.5);
        return text;
    }
    createFlippingTweens(cardIndex, card, text) {
        // waiting for player input
        card.inputEnabled = true;
        card.events.onInputDown.add(() => {
            this.onTapCard(cardIndex, card);
        });
        // first tween: we raise and flip the card and text
        card.flipCardTween = this.gameInstance.add.tween(card.scale).to({ x: 0, y: this.gameOptions.flipZoom }, this.gameOptions.flipSpeed / 2, AbstractGame._phaser.Easing.Linear.None);
        card.flipTextTween = this.gameInstance.add.tween(text.scale).to({ x: 0, y: this.gameOptions.flipZoom }, this.gameOptions.flipSpeed / 2, AbstractGame._phaser.Easing.Linear.None);
        // once the card and text are flipped, we change the card's frame and call the second tween
        card.flipCardTween.onComplete.add(() => {
            card.frame = 1 - card.frame;
            if (card.frame === this.REVEALED_FRAME) {
                card.data.revealed = true;
                text.setText(this.values[cardIndex]);
            }
            else {
                card.data.revealed = false;
                text.setText('');
            }
            card.backflipCardTween.start();
            card.backflipTextTween.start();
        });
        // second tween: we complete the flip and lower the card
        card.backflipCardTween = this.gameInstance.add.tween(card.scale).to({ x: this.gameOptions.cardScale, y: this.gameOptions.cardScale }, this.gameOptions.flipSpeed / 2, AbstractGame._phaser.Easing.Linear.None);
        card.backflipTextTween = this.gameInstance.add.tween(text.scale).to({ x: this.gameOptions.cardScale, y: this.gameOptions.cardScale }, this.gameOptions.flipSpeed / 2, AbstractGame._phaser.Easing.Linear.None);
        card.backflipCardTween.onComplete.add(() => {
            this.flippingCards[cardIndex] = false;
            this.computeGameState();
        }, this); // once the card has been placed down on the table, we can flip it again
    }
    onTapCard(cardIndex, card) {
        if (!this.isSomeCardFlipping() && !card.data.revealed && this.canFlipAnotherCard()) {
            this.flippingCards[cardIndex] = true;
            this.lastPickedCards.push(card.data.idx);
            card.flipCardTween.start();
            card.flipTextTween.start();
        }
    }
    isSomeCardFlipping() {
        return this.flippingCards.indexOf(true) >= 0;
    }
    canFlipAnotherCard() {
        return (this.cards.reduce((nbRevealedCards, card) => {
            if (card.data.revealed === true && card.data.solved === false) {
                nbRevealedCards++;
            }
            return nbRevealedCards;
        }, 0) < 2);
    }
    hideAllCards() {
        for (let i = 0; i < this.values.length; i++) {
            if (this.cards[i].data.revealed === true && this.cards[i].data.solved === false) {
                this.flippingCards[i] = true;
                this.cards[i].flipCardTween.start();
                this.cards[i].flipTextTween.start();
            }
        }
    }
    computeGameState() {
        let isGameOver = false;
        if (this.lastPickedCards.length === 2) {
            if (this.lastPickedCards.indexOf(0) >= 0 && this.lastPickedCards.indexOf(1) >= 0) {
                this.cards[0].data.solved = true;
                this.cards[1].data.solved = true;
                this.texts[0].addColor(this.gameOptions.correctAnswerColor, 0);
                this.texts[1].addColor(this.gameOptions.correctAnswerColor, 0);
            }
            if (this.lastPickedCards.indexOf(2) >= 0 && this.lastPickedCards.indexOf(3) >= 0) {
                this.cards[2].data.solved = true;
                this.cards[3].data.solved = true;
                this.texts[2].addColor(this.gameOptions.correctAnswerColor, 0);
                this.texts[3].addColor(this.gameOptions.correctAnswerColor, 0);
            }
            isGameOver = this.playerHasWon();
        }
        if (this.lastPickedCards.length >= 2) {
            this.lastPickedCards = [];
            setTimeout(() => this.hideAllCards(), 800);
        }
        if (isGameOver) {
            this.mainLabel.setText('GAMEOVER');
            // this.mainLabel.addColor(this.gameOptions.correctAnswerColor, 0);
            //this.gameover.emit(this.score);
        }
    }
    resetGameData() {
        this.cards = [];
        this.texts = [];
        this.flippingCards = [];
        this.lastPickedCards = [];
    }
}

class ExampleGame extends AbstractGame {
    constructor() {
        super();
        this.config = {
            gameWidth: 400,
            gameHeight: 600
        };
    }
    // Re implementation of the init game Instance to switch between game configs
    // config for small/large size for example
    initGameInstance(props) {
        this.gameInstance = new AbstractGame._phaser.Game(this.config.gameWidth, this.config.gameHeight, AbstractGame._phaser.AUTO, props.fieldId, {
            preload: () => this.getPreloadGame(),
            create: () => this.getCreateGame(),
            update: () => this.getUpdateGame()
        });
    }
    getPreloadGame() {
        // implement
    }
    getCreateGame() {
        // implement
    }
    emitGameOver() {
        this.gameover.next(true);
    }
}

class RunnerGame extends AbstractGame {
    constructor() {
        super(...arguments);
        this.gameWidth = 300;
        this.gameHeight = 200;
        this.wrongValues = [];
        this.correctValues = [];
        this.fontStyle = {
            font: '15px Arial',
            fill: '#fff',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        this.isPaused = true;
        this.isGameOver = false;
        this.words = [];
        this.clouds = [];
        this.cloudSpeeds = [];
        this.backgrounds = [];
        this.blockSpeed = 3;
        this.nextJump = 0;
    }
    // Define how to init
    initGameInstance(props) {
        this.gameInstance = new AbstractGame._phaser.Game(this.gameWidth, this.gameHeight, AbstractGame._phaser.AUTO, props.fieldId, {
            preload: () => this.getPreloadGame(),
            create: () => this.getCreateGame(),
            update: () => this.getUpdateGame()
        });
    }
    getPreloadGame() {
        this.gameInstance.load.image('sky', this.assetDir + '/sky.png');
        this.gameInstance.load.image('ground', this.assetDir + '/ground.png');
        this.gameInstance.load.image('cloud', this.assetDir + '/cloud.png');
        this.gameInstance.load.image('bg_hill_1', this.assetDir + '/bg_hill_1.png');
        this.gameInstance.load.image('bg_hill_2', this.assetDir + '/bg_hill_2.png');
        this.gameInstance.load.image('block', this.assetDir + '/block.png');
        this.gameInstance.load.spritesheet('mario', this.assetDir + '/mario.png', 50, 50);
    }
    getCreateGame() {
        this.gameInstance.physics.startSystem(AbstractGame._phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.resetGameData();
        this.initBackgroundElements();
        this.initCollectibleObjects();
        this.initHUD();
        this.initPlayer();
        this.initListeners();
    }
    getUpdateGame() {
        if (this.gameInstance && this.gameInstance.physics && this.gameInstance.physics.arcade) {
            this.gameInstance.physics.arcade.collide(this.player, this.groundTile); // Collide the player with the ground
            this.gameInstance.physics.arcade.overlap(this.player, this.block, this.handleCollision, null, this);
        }
        if (!this.isPaused && !this.isGameOver) {
            if (this.isJumping) {
                this.player.loadTexture('mario', 5);
                this.jumpNow();
            }
            else {
                this.player.animations.play('walk');
            }
            for (let i = 0; i < this.backgrounds.length; i++) {
                let background = this.backgrounds[i];
                if (background.x > -600) {
                    background.x -= 4;
                }
                else {
                    background.x = this.gameInstance.world.width + 600;
                }
            }
            for (let i = 0; i < this.clouds.length; i++) {
                let cloud = this.clouds[i];
                if (cloud.x > -100) {
                    cloud.x -= this.cloudSpeeds[i];
                }
                else {
                    cloud.x = 500;
                }
            }
            if (this.block.x > -250) {
                this.block.x -= this.blockSpeed;
            }
            else {
                this.block.x = this.gameInstance.world.width + 250;
                this.remainingWordsText.setText('WORDS');
                if (this.words.length > 0) {
                    // next word
                    this.currentWord = this.words.shift();
                    this.block.removeChild(this.blockLabel);
                    this.blockLabel = this.gameInstance.add.text(40, 5, this.currentWord, this.fontStyle);
                    this.block.addChild(this.blockLabel);
                }
                else {
                    this.player.loadTexture('mario', 5);
                    this.gameOver();
                }
            }
        }
        else {
            this.player.animations.stop();
        }
    }
    initBackgroundElements() {
        this.gameInstance.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, 'sky'); // A simple background for our game
        for (let i = 0; i < 4; i++) {
            let operator = getRandomInt(1, 4) === 2 ? 1 : -1;
            let cloud = this.gameInstance.add.sprite(this.gameInstance.world.width / 2 + operator * (30 * i), i * 30 + 80, 'cloud');
            cloud.anchor.set(0.5, 0.5);
            cloud.alpha = Math.random();
            this.clouds.push(cloud);
            this.cloudSpeeds.push(getRandomInt(0, 5) + 2);
        }
        this.backgrounds.push(this.gameInstance.add.sprite(0, this.gameInstance.world.height - 100, 'bg_hill_1'));
        this.backgrounds.push(this.gameInstance.add.sprite(800, this.gameInstance.world.height - 100, 'bg_hill_2'));
        this.groundTile = this.gameInstance.add.tileSprite(0, this.gameInstance.world.height - 16, this.gameInstance.world.width, this.gameInstance.world.height, 'ground');
        this.gameInstance.physics.arcade.enable(this.groundTile);
        this.groundTile.body.allowGravity = false;
        this.groundTile.body.immovable = true; // This stops it from falling away when you jump on it
    }
    initCollectibleObjects() {
        this.block = this.gameInstance.add.sprite(this.gameInstance.world.width + 500, this.gameInstance.world.height - 60, 'block');
        this.block.animations.add('spin');
        this.block.animations.play('spin', 2, true);
        this.remainingWordsText = this.gameInstance.add.text(16, 20, 'WORDS' + ':' + this.words.length, this.fontStyle);
        this.currentWord = this.words.shift();
        this.blockLabel = this.gameInstance.add.text(40, 5, this.currentWord, this.fontStyle);
        this.block.addChild(this.blockLabel);
        this.gameInstance.physics.arcade.enable(this.block);
    }
    initHUD() {
        this.centeredLabel = this.gameInstance.add.text(0, 0, 'START', this.fontStyle);
        this.centeredLabel.setTextBounds(0, this.gameInstance.world.height / 2 - 15, this.gameInstance.world.width, 30);
        this.centeredLabel.inputEnabled = true;
        this.centeredLabel.events.onInputDown.add(() => {
            this.isPaused = false;
            this.centeredLabel.setText('');
            this.centeredLabel.inputEnabled = false;
        });
        this.pauseLabel = this.gameInstance.add.text(this.gameInstance.world.width - 100, 20, 'PAUSE', this.fontStyle);
        this.pauseLabel.inputEnabled = true;
        this.pauseLabel.events.onInputDown.add(() => {
            this.pauseUnPauseGame();
        });
    }
    initPlayer() {
        // The player and its settings
        this.player = this.gameInstance.add.sprite(30, this.gameInstance.world.height - 70, 'mario');
        // We need to enable physics on the player
        this.gameInstance.physics.arcade.enable(this.player);
        // Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 700;
        this.player.body.collideWorldBounds = true;
        // add animations, walking
        this.player.animations.add('walk', [1, 2, 3, 4], 20, true);
    }
    initListeners() {
        this.gameInstance.input.onDown.add(() => {
            if (!this.isPaused && !this.isGameOver) {
                this.isJumping = true;
            }
        });
        this.gameInstance.input.onUp.add(() => {
            if (!this.isPaused && !this.isGameOver) {
                this.isJumping = false;
            }
        });
    }
    pauseUnPauseGame() {
        if (this.isPaused) {
            this.isPaused = false;
            this.gameInstance.state.resume();
            this.centeredLabel.setText('');
            this.pauseLabel.setText('PAUSE');
        }
        else {
            this.isPaused = true;
            this.gameInstance.state.pause();
            this.pauseLabel.setText('PAUSE');
        }
    }
    jumpNow() {
        if (this.gameInstance.time.now > this.nextJump) {
            this.player.body.velocity.y = -400;
            this.nextJump = this.gameInstance.time.now + 1500;
        }
    }
    handleCollision(player, block) {
        block.x = this.gameInstance.world.width + 500;
        if (this.wrongValues.indexOf(this.currentWord) >= 0) {
            player.loadTexture('mario', 6);
            this.gameOver();
        }
        else {
            this.score++;
            this.remainingWordsText.setText('WORDS' + ':' + this.words.length);
            if (this.words.length > 0) {
                this.currentWord = this.words.shift();
                block.removeChild(this.blockLabel);
                this.blockLabel = this.gameInstance.add.text(40, 5, this.currentWord, this.fontStyle);
                block.addChild(this.blockLabel);
            }
            else {
                player.loadTexture('mario', 5);
                this.gameOver();
            }
        }
    }
    resetGameData() {
        this.score = 0;
        this.clouds = [];
        this.cloudSpeeds = [];
        this.block = {
            x: -250
        };
        this.isGameOver = false;
        this.isPaused = true;
        this.isJumping = false;
    }
    gameOver() {
        this.centeredLabel.setText('GAMEOVER');
        this.pauseLabel.setText('');
        this.isGameOver = true;
        this.gameover.next(true);
    }
}

const games = {
    runner: 'Runner',
    card: 'Card',
    example: 'Example'
};
function gameFactory(name) {
    switch (name) {
        case games.runner:
            return new RunnerGame();
        case games.card:
            return new CardGame();
        case games.example:
            return new ExampleGame();
        default:
            return null;
    }
}

class YooFormInputGameComponent {
    constructor() {
        this.gameName = games.runner;
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
        this.game = gameFactory(this.gameName);
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
    static get style() { return ""; }
}

export { YooFormInputGameComponent as YooFormInputGame };

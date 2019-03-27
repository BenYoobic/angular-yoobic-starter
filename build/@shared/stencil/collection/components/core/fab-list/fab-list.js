import { setAnimation, querySelectorAllDeep } from '../../../utils';
export class YooFabListComponent {
    constructor() {
        this.animated = false;
        this.side = 'top';
        this.mini = false;
        this.activated = false;
    }
    activatedChanged(activated) {
        if (this.animated) {
            this.animatedDisplay(activated);
        }
        else {
            this.nonAnimatedDisplay(activated);
        }
    }
    componentWillLoad() {
        this.host.classList.add(this.side);
    }
    animatedDisplay(activated) {
        const yooBtns = querySelectorAllDeep(this.host, '.fab-button');
        const btnsArray = Array.from(Array(yooBtns.length).keys());
        const timeoutAnimated = 100;
        const buttonSize = 60;
        btnsArray.forEach(i => {
            setTimeout(() => {
                if (activated) {
                    yooBtns[i].classList.add('show');
                    setAnimation('fab', yooBtns[i], { distance: (buttonSize), direction: this.side, open: true });
                }
                else {
                    setAnimation('fab', yooBtns[i], { distance: (buttonSize), direction: this.side, open: false });
                    setTimeout(() => {
                        yooBtns[i].classList.remove('show');
                    }, 100);
                }
                if (this.mini) {
                    yooBtns[i].classList.add('mini');
                }
            }, (this.activated ? (timeoutAnimated * i) : (timeoutAnimated * (yooBtns.length - i))));
        });
    }
    nonAnimatedDisplay(activated) {
        const yooBtns = querySelectorAllDeep(this.host, '.fab-button');
        const btnsArray = Array.from(Array(yooBtns.length).keys());
        const timeoutNotAnimated = activated ? 30 : 0;
        btnsArray.forEach(i => {
            setTimeout(() => {
                activated ? yooBtns[i].classList.add('show') : yooBtns[i].classList.remove('show');
                if (this.mini) {
                    yooBtns[i].classList.add('mini');
                }
            }, timeoutNotAnimated * i);
        });
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "yoo-fab-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "activated": {
            "type": Boolean,
            "attr": "activated",
            "watchCallbacks": ["activatedChanged"]
        },
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "host": {
            "elementRef": true
        },
        "mini": {
            "type": Boolean,
            "attr": "mini"
        },
        "side": {
            "type": String,
            "attr": "side"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-fab-list:**/"; }
}

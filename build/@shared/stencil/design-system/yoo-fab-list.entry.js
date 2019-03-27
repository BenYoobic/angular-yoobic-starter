const h = window.DesignSystem.h;

import { aa as querySelectorAllDeep, a8 as setAnimation } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooFabListComponent {
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
    static get style() { return ":host {\n  position: absolute;\n  top: 0;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  min-width: 2.625rem;\n  min-height: 2.625rem; }\n\n:host(.right) {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  left: 3.125rem;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n\n:host(.right[mini]) {\n  margin: 0.1875rem 0; }\n\n:host(.left) {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  right: 3.125rem;\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse; }\n\n:host(.left[mini]) {\n  margin: 0.1875rem 0; }\n\n:host(.top) {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  top: auto;\n  bottom: 3.125rem;\n  -ms-flex-direction: column-reverse;\n  flex-direction: column-reverse; }\n\n:host(.top[mini]) {\n  margin: 0 0.25rem; }\n\n:host(.bottom) {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  top: 3.125rem; }\n\n:host(.bottom[mini]) {\n  margin: 0 0.25rem; }"; }
}

export { YooFabListComponent as YooFabList };

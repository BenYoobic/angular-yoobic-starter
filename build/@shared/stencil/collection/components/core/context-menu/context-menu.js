import { translate, debounce, findParent } from '../../../index';
const ANIMATION_DURATION = 300;
export class YooContextMenuComponent {
    constructor() {
        this.contentPosition = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
        this.insideScroll = false;
        this.opened = false;
    }
    onContextMenuOpened() {
        if (this.opened) {
            this.toggle();
        }
    }
    open() {
        this.opened = true;
    }
    close() {
        this.opened = false;
    }
    componentWillLoad() {
        this.setupListeners();
    }
    componentDidUpdate() {
        if (this.insideScroll) {
            this.checkPosition();
        }
    }
    componentDidUnload() {
        this.removeListeners();
    }
    setupListeners() {
        this.toggleWindowListener = debounce(this.toggleWindow, 0).bind(this);
        window.addEventListener('click', this.toggleWindowListener);
        window.addEventListener('touchstart', this.toggleWindowListener);
    }
    removeListeners() {
        window.addEventListener('click', this.toggleWindowListener);
        window.addEventListener('touchstart', this.toggleWindowListener);
    }
    checkPosition() {
        const parentIonScroll = findParent(this.host, 'yoo-ion-scroll');
        if (parentIonScroll && this.dropdownContent && this.dropdownContent.classList.contains('show')) {
            const scrollLeft = parentIonScroll.getBoundingClientRect().left;
            const scrollRight = parentIonScroll.getBoundingClientRect().right;
            const contentLeft = this.dropdownContent.getBoundingClientRect().left;
            const contentright = this.dropdownContent.getBoundingClientRect().right;
            if (contentLeft < scrollLeft) {
                this.dropdownContent.style.left = '0px';
            }
            if (contentright > scrollRight) {
                this.dropdownContent.style.right = '0px';
            }
        }
    }
    toggle() {
        if (!this.opened) {
            this.contextMenuOpened.emit(true);
            setTimeout(() => {
                this.open();
            }, 50);
        }
        else {
            this.close();
            this.contextMenuClosed.emit(true);
        }
    }
    toggleWindow() {
        if (this.opened) {
            this.close();
            setTimeout(() => {
                this.contextMenuClosed.emit(true);
            }, ANIMATION_DURATION);
        }
    }
    onItemClick(item) {
        if (item && item.handler) {
            item.handler();
        }
        this.toggle();
    }
    render() {
        return [
            h("span", { "aria-haspopup": "true", "aria-expanded": "false", onClick: () => this.toggle() },
                h("slot", null)),
            h("div", { class: `${this.opened ? 'show' : ''} dropdown-content`, ref: (el) => this.dropdownContent = el, style: {
                    'top': this.contentPosition.top,
                    'right': this.contentPosition.right,
                    'bottom': this.contentPosition.bottom,
                    'left': this.contentPosition.left
                } }, this.contentButtons && this.contentButtons.length > 0 &&
                this.contentButtons.map((item) => {
                    const contentClass = item.cssClass ? item.cssClass : 'black';
                    return h("div", { class: { 'content': true, [contentClass]: true }, onClick: () => this.onItemClick(item) },
                        h("span", { class: "content-detail" },
                            h("yoo-icon", { class: item.icon }),
                            translate(item.text)));
                }))
        ];
    }
    static get is() { return "yoo-context-menu"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "close": {
            "method": true
        },
        "contentButtons": {
            "type": "Any",
            "attr": "content-buttons"
        },
        "contentPosition": {
            "type": "Any",
            "attr": "content-position"
        },
        "host": {
            "elementRef": true
        },
        "insideScroll": {
            "type": Boolean,
            "attr": "inside-scroll"
        },
        "open": {
            "method": true
        },
        "opened": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "contextMenuOpened",
            "method": "contextMenuOpened",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "contextMenuClosed",
            "method": "contextMenuClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:contextMenuOpened",
            "method": "onContextMenuOpened"
        }]; }
    static get style() { return "/**style-placeholder:yoo-context-menu:**/"; }
}

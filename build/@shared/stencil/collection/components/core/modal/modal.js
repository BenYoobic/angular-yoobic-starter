import { setAnimation, querySelectorDeep, getAppContext, debounce } from '../../../utils';
export class YooModalComponent {
    constructor() {
        this.hasHeader = true;
        this.closeIcon = true;
    }
    onInputBarRawChange() {
        // resize the modal to adjust slim scroll if the input bar take more or less space
        setTimeout(() => this.resize(), 100);
    }
    /**
     * Dismiss the modal overlay after it has been presented.
     */
    async dismiss(data, role) {
        // await dismiss(this, data, role, 'modalLeave', iosLeaveAnimation, mdLeaveAnimation);
        // await detachComponent(this.delegate, this.usersElement);
    }
    close() {
        if (this.animationProp) {
            this.animationProp.open = false;
        }
        this.closed.emit(true);
        this.animation(false);
    }
    resize() {
        let ionScroll = querySelectorDeep(this.host, 'yoo-ion-scroll');
        if (ionScroll) {
            if (ionScroll.height === this.getSizeContainer().height) {
                ionScroll.refresh();
            }
            else {
                ionScroll.height = this.getSizeContainer().height;
            }
        }
    }
    componentDidLoad() {
        this.setContentInModal();
        this.animation(true);
        this.resizeListener = debounce(this.resize, 500).bind(this);
        window.addEventListener('resize', this.resizeListener);
    }
    componentDidUpdate() {
        this.setContentInModal();
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    onPrimaryButtonClick(ev) {
        if (ev) {
            this.primaryButtonClicked.emit(true);
            this.primaryFn();
        }
    }
    animation(open, sentFromClose) {
        if (this.animationName) {
            if (this.animationName === 'sticky_up') {
                const padding = 16;
                const modalHeight = (querySelectorDeep(this.host, 'div.outer-container').clientHeight);
                setAnimation(this.animationName, this.host, { open: open, distance: (((window.innerHeight / 2) + padding) - (modalHeight / 2)), modalHeight: modalHeight });
            }
            else {
                setAnimation(this.animationName, querySelectorDeep(this.host, '.outer-container'), (sentFromClose ? { open: open, up: true } : (this.animationProp ? this.animationProp : { open: open })));
            }
        }
    }
    setContentInModal() {
        if (this.scrollEnabled) {
            if (this.content) {
                let slim = document.createElement('yoo-ion-scroll');
                querySelectorDeep(this.host, 'div.modal-scroll-container').appendChild(slim);
                slim.appendChild(this.content);
            }
            this.resize();
        }
        else if (this.content) {
            querySelectorDeep(this.host, 'div.modal-body').appendChild(this.content);
        }
    }
    getSizeContainer() {
        let modalContainer = querySelectorDeep(this.host, '.modal-scroll-container');
        let maxHeight = window.innerHeight;
        if (modalContainer) {
            let modalHeader = querySelectorDeep(this.host, '.modal-header');
            if (modalHeader) {
                maxHeight -= modalHeader.clientHeight;
            }
            let modalFooter = querySelectorDeep(this.host, '.modal-footer');
            if (modalFooter) {
                maxHeight -= modalFooter.clientHeight;
            }
            return { height: Math.min((modalContainer.clientHeight), maxHeight) + 'px', width: modalContainer.clientWidth + 'px' };
        }
        return { height: '', width: '' };
    }
    renderHeadingIcons(headingIcons) {
        return headingIcons.map((headingIcon) => h("yoo-icon", { class: 'icon ' + headingIcon.icon, onClick: headingIcon.handler ? () => headingIcon.handler() : null }));
    }
    hostData() {
        return {
            class: Object.assign({ ['custom-controller']: this.withYooCtrl }, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.hasHeader ?
                h("div", { class: "modal-header" },
                    h("span", { class: 'icons ' + (this.headingIcons ? '' : 'hide-icon') }, this.headingIcons ? this.renderHeadingIcons(this.headingIcons) : null),
                    h("div", { class: "inner-header" },
                        h("span", { class: "modal-heading" }, this.heading)),
                    this.closeIcon ? h("span", { class: "close-icon", onClick: () => this.close() },
                        h("yoo-icon", { class: "yo-close" })) : h("span", null))
                : null,
            h("div", { class: "modal-body" },
                h("div", { class: "modal-scroll-container" },
                    h("yoo-ion-scroll", { class: 'relative ' + (this.cssClass || '') },
                        h("slot", null)))),
            this.hasFooter ?
                h("div", { class: "modal-footer" },
                    this.footerText ? h("div", { class: "footer-text" },
                        h("span", null, this.footerText)) : null,
                    h("div", { class: "footer-buttons" },
                        this.secondaryButtonText ? h("div", { class: "secondary-button squared" },
                            h("yoo-button", { class: "dark", onClick: () => this.close(), text: this.secondaryButtonText })) : null,
                        this.primaryButtonText ? h("div", { class: "primary-button squared" },
                            h("yoo-button", { class: "accent", onClick: (event) => this.onPrimaryButtonClick(event), text: this.primaryButtonText })) : null,
                        h("slot", { name: "footer-slot" }))) : null));
    }
    static get is() { return "yoo-modal"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "animationName": {
            "type": String,
            "attr": "animation-name"
        },
        "animationProp": {
            "type": "Any",
            "attr": "animation-prop"
        },
        "close": {
            "method": true
        },
        "closeIcon": {
            "type": Boolean,
            "attr": "close-icon"
        },
        "content": {
            "type": "Any",
            "attr": "content"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "footerText": {
            "type": String,
            "attr": "footer-text"
        },
        "hasFooter": {
            "type": Boolean,
            "attr": "has-footer"
        },
        "hasHeader": {
            "type": Boolean,
            "attr": "has-header"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "headingIcons": {
            "type": "Any",
            "attr": "heading-icons"
        },
        "host": {
            "elementRef": true
        },
        "overlayId": {
            "type": Number,
            "attr": "overlay-id"
        },
        "primaryButtonText": {
            "type": String,
            "attr": "primary-button-text"
        },
        "primaryFn": {
            "type": "Any",
            "attr": "primary-fn"
        },
        "resize": {
            "method": true
        },
        "scrollEnabled": {
            "type": Boolean,
            "attr": "scroll-enabled"
        },
        "secondaryButtonText": {
            "type": String,
            "attr": "secondary-button-text"
        },
        "withYooCtrl": {
            "type": Boolean,
            "attr": "with-yoo-ctrl"
        }
    }; }
    static get events() { return [{
            "name": "primaryButtonClicked",
            "method": "primaryButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "closed",
            "method": "closed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "rowNumberChanged",
            "method": "onInputBarRawChange"
        }]; }
    static get style() { return "/**style-placeholder:yoo-modal:**/"; }
}

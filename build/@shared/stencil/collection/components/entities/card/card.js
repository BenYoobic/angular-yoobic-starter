import { cloudinary, resizeObserve, debounce, querySelectorDeep } from '../../../utils';
const MAX_AVATAR_DISPLAY = 4;
export class YooCardComponent {
    constructor() {
        this.imgSrc = '../../assets/empty-states/empty.svg';
        this.avatarImgs = [];
        this.isActivable = false;
        this.isUserCard = false;
        this.avatarShape = 'rectangle';
        this.hasMenu = false;
        this.isActive = false;
        this.imageWidth = 340;
        this.imageHeight = 160;
    }
    //private intersectionObserver: IntersectionObserver;
    componentWillLoad() {
        // if (this.type === 'list') {
        //     this.host.classList.add('list-mode');
        // }
        this.horizontal = this.host.classList.contains('horizontal');
    }
    componentDidLoad() {
        let image = querySelectorDeep(this.host, '.image');
        this.resizeObserver = resizeObserve(image, (target, width, height, left, top, entry) => {
            debounce(this.onImageResize.bind(this), 1000)(target, width, height, left, top, entry);
        });
        //let container = querySelectorDeep(this.host, '.outer-container');
        // this.intersectionObserver = intersectionObserve(this.host, (entries, observer) => {
        //     entries.forEach(entry => {
        //         if (entry.intersectionRatio > 0) {
        //             //entry.target.classList.add('in-view');
        //            this.animationName ? setAnimation(this.animationName, [container], {open: true}) : setAnimation(animations.slideInStaggered, [container]);
        //         } else {
        //             //entry.target.classList.add('in-view');
        //             this.animationName ? setAnimation(this.animationName, [container], {open: false}) : setAnimation(animations.fade, [container], {open: false});
        //         }
        //     });
        // }, {
        //     rootMargin: '30px',
        //     threshold: [0, 0.25, 0.75, 1]
        // });
        // this.intersectionObserver.observe(this.host);
    }
    componentDidUnload() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        // if (this.intersectionObserver) {
        //     this.intersectionObserver.disconnect();
        // }
    }
    onCheckboxToggled(event) {
        event.detail === true ? this.isActive = true : this.isActive = false;
        this.active.emit(this.isActive);
    }
    onActionButtonClick() {
        this.actionPress.emit(true);
    }
    renderCardImage() {
        if (this.avatarShape === 'rectangle') {
            return (h("yoo-img", { type: "back", class: "image", src: cloudinary(this.imgSrc, this.imageWidth, this.imageHeight) }));
        }
        else if (this.avatarShape === 'circle') {
            return (h("yoo-avatar", { class: "large", imgSrc: this.imgSrc }));
        }
    }
    onImageResize(target, width, height, left, top, entry) {
        // this.imageWidth = width;
        // this.imageHeight = height;
    }
    renderImageContainerContent() {
        return ([this.topLeftBadge ? (h("div", { class: 'top-left' + (this.isActivable ? ' active' : '') },
                h("yoo-badge", { text: this.topLeftBadge, class: this.host.className }))) : null,
            this.topRightBadge ? (h("div", { class: "top-right" },
                h("yoo-badge", { text: this.topRightBadge, class: this.host.className }))) : null,
            this.bottomLeftBadge ? (h("div", { class: "bottom-left" },
                h("yoo-badge", { text: this.bottomLeftBadge, class: this.host.className }))) : null,
            this.bottomRightBadge ? (h("div", { class: "bottom-right" },
                h("yoo-badge", { text: this.bottomRightBadge, class: this.host.className }))) : null,
            this.renderCardImage(),
            this.isActivable ?
                h("yoo-form-checkbox", { class: this.host.className, onInputChanged: (event) => this.onCheckboxToggled(event) })
                : null]);
    }
    renderHeadingContainerContent() {
        return ([h("div", { class: "heading-container" },
                this.heading ? h("span", { class: "card-heading" }, this.heading) : null,
                this.date ? h("span", { class: "date-card" }, this.date) : null,
                this.hasMenu ?
                    h("yoo-context-menu", null,
                        h("div", { slot: "trigger" },
                            h("span", { class: "menu-icon" },
                                h("yoo-icon", { class: "yo-more-v" }))),
                        h("div", { class: "context-container" },
                            h("slot", { name: "menu-slot" })))
                    : null),
            (this.subheadings ? this.subheadings.map((item) => h("div", { class: "subheading-container", innerHTML: item })) : null),
            (this.badges ?
                h("div", { class: "badges-container" }, this.badges.map((item) => h("yoo-tag", { class: "round outline dark", icon: item.iconLeft, text: item.text, closable: item.closable })))
                : null)
        ]);
    }
    renderBottomContent() {
        return ([h("div", { class: "avatar-container" }, this.avatarImgs.map((avatarSrc, index) => {
                if (index < MAX_AVATAR_DISPLAY) {
                    return (h("yoo-avatar", { class: "medium", imgSrc: avatarSrc }));
                }
            })),
            this.actionButtonTitle ?
                h("div", { class: "action-button-container" },
                    h("yoo-button", { text: this.actionButtonTitle, class: this.host.className + ' squared', onClick: () => this.onActionButtonClick() })) : null]);
    }
    render() {
        return (this.horizontal ? (h("div", { class: 'outer-container ' + ((this.isActive) ? 'active' : '') },
            h("div", { class: "image-container" }, this.renderImageContainerContent()),
            h("div", { class: "status-container" }),
            h("div", { class: 'content-container ' + (this.heading === undefined && this.subheadings === undefined ? 'center' : '') },
                h("div", { class: "top-container" }, this.renderHeadingContainerContent()),
                h("div", { class: "slot-container" },
                    h("slot", { name: "content-slot" }),
                    h("div", { class: "inner-container" }, this.renderBottomContent()))))) :
            (h("div", { class: 'outer-container' + ((this.isActive) ? ' active' : '') },
                h("div", { class: "image-container" }, this.renderImageContainerContent()),
                h("div", { class: "status-container" }),
                h("div", { class: "content-container" },
                    this.renderHeadingContainerContent(),
                    h("div", { class: "slot-container" },
                        h("slot", { name: "content-slot" })),
                    this.renderBottomContent()))));
    }
    static get is() { return "yoo-card"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "actionButtonTitle": {
            "type": String,
            "attr": "action-button-title"
        },
        "animationName": {
            "type": String,
            "attr": "animation-name"
        },
        "avatarImgs": {
            "type": "Any",
            "attr": "avatar-imgs"
        },
        "avatarShape": {
            "type": String,
            "attr": "avatar-shape"
        },
        "badges": {
            "type": "Any",
            "attr": "badges"
        },
        "bottomLeftBadge": {
            "type": String,
            "attr": "bottom-left-badge"
        },
        "bottomRightBadge": {
            "type": String,
            "attr": "bottom-right-badge"
        },
        "date": {
            "type": String,
            "attr": "date"
        },
        "hasMenu": {
            "type": Boolean,
            "attr": "has-menu"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "horizontal": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "imageHeight": {
            "state": true
        },
        "imageWidth": {
            "state": true
        },
        "imgSrc": {
            "type": String,
            "attr": "img-src"
        },
        "isActivable": {
            "type": Boolean,
            "attr": "is-activable"
        },
        "isActive": {
            "state": true
        },
        "isUserCard": {
            "type": Boolean,
            "attr": "is-user-card"
        },
        "subheadings": {
            "type": "Any",
            "attr": "subheadings"
        },
        "topLeftBadge": {
            "type": String,
            "attr": "top-left-badge"
        },
        "topRightBadge": {
            "type": String,
            "attr": "top-right-badge"
        }
    }; }
    static get events() { return [{
            "name": "active",
            "method": "active",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionPress",
            "method": "actionPress",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-card:**/"; }
}

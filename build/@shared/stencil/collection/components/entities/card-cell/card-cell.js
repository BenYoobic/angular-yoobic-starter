import { cloudinary, showActionSheet, execHandlerAndStopEvent, getAppContext, isWeb } from '../../../utils';
export class YooCardCellComponent {
    constructor() {
        this.imageWidth = 80;
        this.imageHeight = 80;
    }
    presentActionSheet() {
        // IONIC ACTION SHEETS
        showActionSheet(this.entry.actions.map(item => {
            item.icon = null;
            return item;
        }));
    }
    onContextMenuToggled(opened) {
        this.moreActionsClicked.emit(opened);
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return [
            h("div", { class: "outer-container" },
                h("div", { class: 'image-container' + (this.entry.isBadge ? ' badge' : '') },
                    this.entry ?
                        this.entry.icon && !this.entry.imgSrc ?
                            h("div", { class: "icon-container" },
                                h("yoo-icon", { class: this.entry.icon }))
                            : this.entry.imgSrc ?
                                h("yoo-img", { type: "back", disabled: this.entry.isLocked, class: "image", src: cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight) }, this.entry.isLocked && h("yoo-icon", { class: "yo-lock" }))
                                : null
                        : null,
                    h("yoo-icon", { class: "image-overlay yo-check" })),
                this.entry && this.entry.text ?
                    h("div", { class: "text-container" },
                        this.entry.noTruncate ?
                            h("span", { class: 'text' + (this.entry.isBadge ? ' badge' : '') }, this.entry.text)
                            : h("span", { class: "text-truncate" }, this.entry.text),
                        this.entry && this.entry.subheading && h("span", { class: "subheading" }, this.entry.subheading),
                        h("span", { class: "date-label" }, this.entry.dueDate ? this.entry.dueDate.toLocaleDateString() : null)) : null,
                !isWeb() && this.entry && this.entry.actions && this.entry.actions.length > 0 ?
                    h("div", { class: "action-container" },
                        h("div", { class: "icon-action", onClick: (ev) => execHandlerAndStopEvent(ev, () => this.presentActionSheet()) },
                            h("yoo-icon", { class: "yo-more" })))
                    : null,
                this.host.classList.contains('photo-video') ? h("div", { class: "icon-overlay" },
                    h("yoo-icon", { class: "yo-play" })) : null,
                this.entry && this.entry.flagged ? h("div", { class: "icon-overlay bottom-left" },
                    h("div", { class: "icon-overlay-container" },
                        h("yoo-icon", { class: "yo-flag light" }))) : null,
                this.entry && this.entry.annotated ? h("div", { class: "icon-overlay bottom-right" },
                    h("div", { class: "icon-overlay-container" },
                        h("yoo-icon", { class: "yo-pen light" }))) : null,
                this.entry && this.entry.validated ? h("div", { class: "validated" }) : (this.entry && this.entry.validated === false ? h("div", { class: "validated danger" }) : null),
                isWeb() && this.entry && this.entry.actions && this.entry.actions.length > 0 && (h("div", { class: "icon-overlay top-right" },
                    h("yoo-context-menu", { contentButtons: this.entry.actions, contentPosition: { top: '30px', right: '-5px', bottom: 'auto', left: 'auto' }, insideScroll: true, onContextMenuOpened: () => this.onContextMenuToggled(true), onContextMenuClosed: () => this.onContextMenuToggled(false), onClick: (ev) => ev.stopPropagation() },
                        h("div", { class: "icon-overlay-container" },
                            h("yoo-icon", { class: "yo-more light" }))))))
        ];
    }
    static get is() { return "yoo-card-cell"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "entry": {
            "type": "Any",
            "attr": "entry"
        },
        "host": {
            "elementRef": true
        },
        "imageHeight": {
            "state": true
        },
        "imageWidth": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "moreActionsClicked",
            "method": "moreActionsClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-card-cell:**/"; }
}

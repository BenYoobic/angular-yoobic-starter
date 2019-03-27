import { cloudinary, execHandlerAndStopEvent, showActionSheet, getAppContext } from '../../../utils';
export class YooCardQuestionComponent {
    constructor() {
        this.imageWidth = 335;
        this.imageHeight = 260;
    }
    componentWillLoad() {
    }
    isAnswer() {
        return this.host.classList.contains('questionsanswers');
    }
    renderCardImage() {
        return (this.entry && this.entry.imgSrc ?
            h("yoo-img", { type: "back", class: "image", src: cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight) })
            : null);
    }
    renderImageContainerContent() {
        return ([(this.entry ?
                [this.entry.topLeftBadge ? (h("div", { class: "badge-top-left" },
                        h("yoo-badge", { text: this.entry.topLeftBadge, class: this.host.className + 'transparent round' }))) : null,
                    this.entry.topRightBadge ? (h("div", { class: "badge-top-right" },
                        h("yoo-badge", { text: this.entry.topRightBadge, class: this.host.className + 'transparent round' }))) : null,
                    this.entry.bottomLeftBadge ? (h("div", { class: "badge-bottom-left" },
                        h("yoo-badge", { text: this.entry.bottomLeftBadge, class: this.host.className + 'transparent round' }))) : null,
                    this.entry.bottomRightBadge ? (h("div", { class: "badge-bottom-right" },
                        h("yoo-badge", { text: this.entry.bottomRightBadge, class: this.host.className + 'transparent round' }))) : null,
                    this.entry.bottomLeftIcon ? (h("div", null,
                        h("span", { class: "bottom-left-icon inner-icon" },
                            h("yoo-icon", { class: this.entry.bottomLeftIcon })))) : null,
                    this.entry.bottomRightIcon ? (h("div", null,
                        h("span", { class: "bottom-right-icon inner-icon" },
                            h("yoo-icon", { class: this.entry.bottomRightIcon })))) : null,
                    this.entry.topLeftIcon ? (h("div", null,
                        h("span", { class: "top-left-icon inner-icon" },
                            h("yoo-icon", { class: this.entry.topLeftIcon })))) : null,
                    this.entry.topRightIcon ? (h("div", null,
                        h("span", { class: "top-right-icon inner-icon" },
                            h("yoo-icon", { class: this.entry.topRightIcon })))) : null]
                : null),
            this.renderCardImage()]);
    }
    renderEntryDescription() {
        let maxLine = this.entry && !this.entry.imgSrc && !this.entry.document ? 5 : 1;
        return (h("div", { class: 'description' + (this.isAnswer() ? ' answer' : '') },
            h("yoo-text-truncate", { maxLine: maxLine, content: this.entry.description, onToggled: (ev) => this.viewMoreToggled.emit(ev.detail), hideMoreButton: false })));
    }
    renderQuestionTags() {
        return h("div", { class: 'hashtags' }, this.entry && this.entry.tags && this.entry.tags.map(a => a && h("span", { class: "hashtag", innerHTML: `#${a.toLowerCase()} ` })));
    }
    renderTopActions() {
        return (h("div", { class: "top-actions" }, this.entry.topActions.map(a => h("span", { class: a.textClass, onClick: (ev) => execHandlerAndStopEvent(ev, a.handler) }, a.text))));
    }
    renderBottomActions() {
        return (h("div", { class: 'bottom-actions' }, this.entry.bottomActions.map(a => h("div", { class: a.cssClass, onClick: (ev) => execHandlerAndStopEvent(ev, a.handler) },
            a.icon && h("yoo-icon", { class: a.icon }),
            a.text && h("span", { class: `icon-text ${a.textClass}` }, a.text)))));
    }
    renderTopIcons() {
        return this.entry.icons.map(icon => h("span", { class: 'top-icon ' + (icon.text ? 'text' : ''), onClick: (ev) => execHandlerAndStopEvent(ev, icon.handler) },
            icon.text && h("span", { class: "icon-text" }, icon.text),
            " ",
            h("yoo-icon", { class: icon.icon })));
    }
    onShowActions(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        if (this.entry && this.entry.actions && this.entry.actions.length > 0) {
            showActionSheet(this.entry.actions);
        }
    }
    renderTop() {
        return (h("div", { class: "top" },
            h("yoo-avatar", { class: "list-small", imgSrc: this.entry ? this.entry.icon : null, user: this.entry ? this.entry.user : null }),
            h("div", { class: "heading" }, this.entry.headings ? this.entry.headings.map(heading => h("span", null, heading)) : h("span", null, this.entry.heading || '')),
            !this.isAnswer() &&
                h("div", { class: 'top-icons' + (this.entry.imgSrc ? '' : ' no-img') }, this.entry.icons && this.entry.icons.length && this.renderTopIcons()),
            !this.isAnswer() && this.entry.topActions && this.renderTopActions()));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.renderTop(),
            h("div", { class: "content-container" },
                this.entry && this.entry.imgSrc ?
                    h("div", { class: "image-container" }, this.renderImageContainerContent()) : null,
                this.entry ?
                    h("div", { class: 'under-img' + (this.entry.imgSrc ? '' : ' no-img') },
                        this.entry.description ? this.renderEntryDescription() : null,
                        h("div", { class: "bottom-container" },
                            this.entry.subheadings.map(subheading => h("div", { class: "subheading" }, subheading)),
                            this.entry.bottomActions ? this.renderBottomActions() : null),
                        this.entry.tags ? this.renderQuestionTags() : null) : null)));
    }
    static get is() { return "yoo-card-question"; }
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
            "name": "bottomActionClicked",
            "method": "bottomActionClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "viewMoreToggled",
            "method": "viewMoreToggled",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-card-question:**/"; }
}

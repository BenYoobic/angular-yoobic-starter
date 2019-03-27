import { translate, cloudinary, execHandlerAndStopEvent, showActionSheet, getAppContext, translateMulti, isWeb } from '../../../utils';
export class YooCardFeedComponent {
    constructor() {
        this.imageWidth = 335;
        this.imageHeight = 260;
        this.isPhotos = false;
    }
    componentWillLoad() {
        this.isPhotos = this.host.classList.contains('photos');
    }
    isBlog() {
        return this.host.classList.contains('blog');
    }
    renderCardImage() {
        return (this.entry && this.entry.imgSrc ?
            h("yoo-img", { type: "back", class: "image", showFallback: this.isBlog(), src: cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight) })
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
        maxLine = this.isBlog() ? 2 : maxLine;
        return (this.isPhotos ?
            h("div", { class: "feed-description photos" },
                translate('DERIVEDFROM'),
                h("mark", null,
                    " ",
                    ' "' + translateMulti(this.entry.fieldTitle) + '" '),
                translate('IN'),
                h("mark", null,
                    " ",
                    ' "' + translateMulti(this.entry.missionTitle) + '" '),
                translate('MISSION'))
            :
                h("div", { class: "feed-description" },
                    h("yoo-text-truncate", { maxLine: maxLine, showBreakLine: true, content: translateMulti(this.entry.description), onToggled: (ev) => this.viewMoreToggled.emit(ev.detail), hideMoreButton: this.isBlog() })));
    }
    renderFeedBadges() {
        return (h("div", { class: "feed-badges" }, this.entry.badges.map((item) => h("yoo-badge", { class: item.cssClass ? item.cssClass : '', "icon-left": item.iconLeft, text: item.text, closable: item.closable }))));
    }
    renderFeedTags() {
        return h("div", { class: 'feed-hashtags' }, this.entry && this.entry.tags && this.entry.tags.map(a => a && h("span", { class: "hashtag", innerHTML: `#${a.toLowerCase()} ` })));
    }
    renderTopActions() {
        return (h("div", { class: 'info-feed' }, this.entry.topActions.map(a => h("span", { onClick: (ev) => execHandlerAndStopEvent(ev, a.handler) }, a.text))));
    }
    renderBottomActions() {
        return h("div", { class: "feed-bottom-action", onClick: (ev) => {
                this.bottomActionClicked.emit(true);
                execHandlerAndStopEvent(ev, this.entry.bottomAction.handler);
            } },
            h("span", { id: "action" }, this.entry.bottomAction.name));
    }
    renderFeedIcons() {
        return this.entry.icons.map(icon => h("span", { class: 'feed-icon ' + (icon.text ? 'text' : ''), onClick: (ev) => execHandlerAndStopEvent(ev, icon.handler) },
            icon.text ? h("span", { class: "icon-text" }, icon.text) : null,
            " ",
            h("yoo-icon", { class: icon.icon })));
    }
    renderFeedDocument() {
        return h("div", { class: "feed-document-container" },
            h("yoo-form-document", { showDialog: false, document: this.entry.document }));
    }
    onShowActions(ev) {
        if (!isWeb()) {
            ev.stopPropagation();
            ev.preventDefault();
            if (this.entry && this.entry.actions && this.entry.actions.length > 0) {
                showActionSheet(this.entry.actions);
            }
        }
    }
    renderFeedSubheading() {
        return [
            this.entry && this.entry.subheadings && this.entry.subheadings.length ?
                this.entry.subheadings.map(sub => sub ? h("span", { class: "feed-subheading" },
                    sub,
                    ".") : null)
                : null,
            this.entry && this.entry.groups && this.entry.groups.length > 0 ?
                h("span", { class: "feed-subheading" },
                    " ",
                    this.entry.sharedIn ? this.entry.sharedIn : translate('SHAREDIN'),
                    this.entry.groups.slice(0, 1).map(g => [h("span", null, " "), h("span", { class: "feed-group", onClick: () => this.groupClicked.emit(g) }, g)]))
                : null
        ];
    }
    renderPhotosSubheading() {
        return (this.entry && this.entry.subheadings && this.entry.subheadings.length ?
            h("div", { class: "feed-subheading" },
                this.entry.subheadings[0],
                ' at ',
                h("mark", null, this.entry.subheadings[1])) :
            null);
    }
    renderMoreButton() {
        return (h("div", { class: "feed-menu", onClick: (ev) => this.onShowActions(ev) },
            h("yoo-icon", { class: "yo-more" })));
    }
    renderFeedTop() {
        return (h("div", { class: "feed-top" },
            h("yoo-avatar", { class: "small", imgSrc: this.entry ? this.entry.icon : null, user: this.entry ? this.entry.user : null }),
            h("div", { class: "feed-heading" },
                this.entry && this.entry.heading ? h("span", null, this.entry.heading) : null,
                h("div", null, this.isPhotos ? this.renderPhotosSubheading() : this.renderFeedSubheading())),
            this.entry && this.entry.actions && this.entry.actions.length > 0 && (isWeb() ?
                h("yoo-context-menu", { contentButtons: this.entry.actions, contentPosition: { top: '45px', right: '60px', bottom: 'auto', left: 'auto' }, insideScroll: true, onClick: (ev) => ev.stopPropagation() }, this.renderMoreButton())
                :
                    this.renderMoreButton())));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: {
                'outer-container': true,
                'blog': this.isBlog()
            } },
            this.renderFeedTop(),
            h("div", { class: "content-container" },
                this.entry && this.entry.imgSrc ?
                    h("div", { class: "image-container" }, this.renderImageContainerContent()) : null,
                this.entry ?
                    h("div", { class: 'feed-under-img' + (this.entry.imgSrc ? '' : ' no-img') },
                        this.entry.document && !this.entry.imgSrc ? this.renderFeedDocument() : null,
                        this.entry.description && !this.entry.imgSrc ? this.renderEntryDescription() : null,
                        this.entry.tags && !this.entry.imgSrc ? this.renderFeedTags() : null,
                        h("div", null, this.entry.badges ? this.renderFeedBadges() : null),
                        h("div", { class: 'feed-icons' + (this.entry.imgSrc ? '' : ' no-img') }, this.entry.icons && this.entry.icons.length ? this.renderFeedIcons() : null),
                        this.entry.topActions ? this.renderTopActions() : null,
                        this.entry.description && this.entry.imgSrc ? this.renderEntryDescription() : null,
                        this.entry.tags && this.entry.imgSrc ? this.renderFeedTags() : null,
                        this.entry.bottomAction && this.entry.bottomAction.name ? this.renderBottomActions() : null) : null)));
    }
    static get is() { return "yoo-card-feed"; }
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
            "name": "groupClicked",
            "method": "groupClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
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
    static get style() { return "/**style-placeholder:yoo-card-feed:**/"; }
}

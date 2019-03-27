import { execHandlerAndStopEvent, isCloudinaryLink, cloudinary, showImageModal, findParent, translate, isFirefox, isDarkTheme, getAppContext, isWeb } from '../../../utils';
import { isNumber } from 'lodash-es';
const MAX_AVATAR_DISPLAY = 3;
export class YooCardListComponent {
    constructor() {
        this.avatarImgs = [];
        this.isActivable = false;
        this.isCollapsed = false;
        this.isActive = false;
        this.imageWidth = 340;
        this.imageHeight = 160;
        this.showContextMenu = false;
        this.isMap = false;
    }
    get isFormChoice() {
        return this.host.classList.contains('form-choice');
    }
    componentWillLoad() {
        if (this.entry && this.entry.isMap) {
            this.isMap = true;
        }
    }
    componentDidLoad() {
        let parentScroll = findParent(this.host, 'yoo-ion-scroll.horizontal');
        if (parentScroll && this.entry.isCollapsible) {
            let parentEntity = findParent(this.host, 'yoo-entity');
            if (parentEntity) {
                parentEntity.classList.add('collapsed');
            }
            this.isCollapsed = true;
        }
    }
    onCheckboxToggled(event) {
        event.detail === 'checked' ? this.isActive = true : this.isActive = false;
        this.active.emit(this.isActive);
    }
    onActionButtonClick() {
        this.actionPress.emit(true);
    }
    renderAvatar() {
        let orderUser = this.entry.users ? this.entry.users.sort((a, b) => {
            return a.imageData && b.imageData ? 0 : !b.imageData ? -1 : 1;
        }) : [];
        let avatarSize = this.entry && this.entry.avatarSize ? this.entry.avatarSize : 'list-small';
        let avatarClass = {
            'main': true,
            [avatarSize]: true
        };
        return (this.entry && (!this.entry.users || !this.entry.users.length) ?
            h("yoo-avatar", { class: avatarClass, imgSrc: this.entry.imgSrc, icon: this.entry.icon, iconText: this.entry.iconText, hasPending: this.entry.hasPending })
            : this.entry && this.entry.users && this.entry.users.length === 1 ?
                h("yoo-avatar", { class: avatarClass, imgSrc: this.entry.imgSrc, user: this.entry.users[0] })
                : this.entry && this.entry.users ?
                    h("div", { class: "multiple-avatar-container" },
                        h("div", { class: "top-avatars" }, orderUser.slice(0, 2).map((user, index) => {
                            return h("yoo-avatar", { class: "xsmall", user: user });
                        })),
                        h("div", { class: "avatar-row" },
                            orderUser.slice(2, 3).map((user, index) => {
                                return h("yoo-avatar", { class: "xsmall", user: user });
                            }),
                            this.entry.users.length > 3 ?
                                h("div", { class: "avatar-hidden" },
                                    h("span", null,
                                        "+",
                                        this.entry.users.length - 3))
                                : null))
                    : null);
    }
    renderCardImage() {
        return (this.host.classList.contains('language') ?
            h("div", { class: "flag-container" },
                h("yoo-icon", { class: this.entry.icon }))
            : this.renderAvatar());
    }
    renderBottomContent() {
        return ([
            this.avatarImgs && this.avatarImgs.length > 0 ?
                h("div", { class: "avatar-container" }, this.avatarImgs.map((imageSrc, index) => {
                    if (index < MAX_AVATAR_DISPLAY) {
                        return (h("yoo-avatar", { class: "xsmall avatar-image", imgSrc: imageSrc }));
                    }
                    else if (index === MAX_AVATAR_DISPLAY) {
                        return (h("yoo-avatar", { class: "xsmall counter", reversedColor: true, iconText: '+' + String(this.entry.usersInline.length - MAX_AVATAR_DISPLAY) }));
                    }
                })) : null,
            this.actionButtonTitle ?
                h("div", { class: "action-button-container" },
                    h("yoo-button", { text: this.actionButtonTitle, class: this.host.className + ' squared', onClick: () => this.onActionButtonClick() })) : null
        ]);
    }
    renderKpiContainer() {
        return (this.entry.isCollapsible && !this.isCollapsed && this.entry && this.entry.kpiData && this.entry.kpiData.length > 0 ?
            h("div", { class: "kpi-containers" }, this.entry && this.entry.kpiData ? this.entry.kpiData.map((kpi, index) => {
                const positiveVariation = kpi.variation > 0;
                const lastIndex = this.entry.kpiData.length - 1;
                return ([
                    h("div", { class: "kpi-container" },
                        h("div", { class: "category" }, translate(kpi.category.toUpperCase())),
                        h("span", { class: "kpi-value" },
                            isNumber(kpi.value) ? kpi.value.toLocaleString() : '',
                            kpi.extraSymbol),
                        h("div", { class: {
                                'kpi-variation': true,
                                'positive': positiveVariation,
                                'negative': !positiveVariation
                            } }, !kpi.variation || kpi.variation === 0 ?
                            h("div", { class: "no-variation" }) : [
                            h("yoo-icon", { class: `yo-big-arrow-${positiveVariation ? 'up' : 'down'}` }),
                            h("div", null,
                                Math.abs(Math.round(kpi.variation * 100) / 100),
                                "%")
                        ])),
                    index === lastIndex ? null : h("div", { class: "separator" })
                ]);
            }) : null)
            : null);
    }
    renderImageContainerContent() {
        let hasSubheading = this.entry.subheadings && this.entry.subheadings[0] !== '' && !this.isMap || (this.isMap && !this.isCollapsed);
        return ([this.entry.topLeftBadge ? (h("div", { class: 'top-left' + (this.isActivable ? ' active' : '') },
                h("yoo-badge", { text: this.entry.topLeftBadge, class: "notification-medium danger" }),
                "}")) : null,
            this.entry.topRightBadge ? (h("div", { class: "top-right" },
                h("yoo-badge", { text: !this.entry.vip ? this.entry.topRightBadge : '', iconLeft: this.entry.vip ? 'yo-star' : '', class: {
                        "notification-medium danger": !this.entry.vip,
                        'small round energized icon-only': this.entry.vip
                    } }))) : null,
            this.entry.bottomLeftBadge ? (h("div", { class: { 'bottom-left': true, 'subheading': hasSubheading } },
                h("yoo-badge", { text: this.entry.bottomLeftBadge, class: "notification-medium danger" }))) : null,
            this.entry.bottomRightBadge ? (h("div", { class: { 'bottom-right': true, 'subheading': hasSubheading } },
                h("yoo-badge", { text: this.entry.bottomRightBadge, class: this.entry.bottomRightBadgeCssClass ? this.entry.bottomRightBadgeCssClass : 'notification-medium danger' }))) : null,
            this.renderCardImage(),
            this.isActivable ?
                h("yoo-form-checkbox", { class: this.host.className, onInputChanged: (event) => this.onCheckboxToggled(event) })
                : null]);
    }
    imageClicked(imagePath) {
        showImageModal(imagePath);
    }
    onListCollapsed(ev) {
        ev.stopPropagation();
        this.isCollapsed = !this.isCollapsed;
        this.listCollapsed.emit({ collapsed: this.isCollapsed, item: this.entry });
        let scrollParent = findParent(this.host, 'yoo-ion-scroll');
        if (scrollParent) {
            scrollParent.classList.add('list-open');
        }
    }
    hasUsersInline() {
        return this.entry && this.entry.usersInline && this.entry.usersInline.length > 0;
    }
    renderPointsContainerContent() {
        return ([h("div", { class: "points-container" },
                h("div", { class: "icon-container" },
                    h("yoo-icon", { class: "yo-star" })),
                h("div", { class: "points" }, this.entry.points),
                h("yoo-icon", { class: "yo-right" }))]);
    }
    renderInlineUsers() {
        return (h("div", { class: "avatar-box" },
            h("div", { class: "avatar-container" },
                h("ul", null,
                    this.entry.usersInline.map((user, userIndex) => {
                        if (userIndex < MAX_AVATAR_DISPLAY) {
                            return (h("li", { class: 'avatar-item ' + (!isFirefox() ? 'not-firefox' : '') },
                                h("yoo-avatar", { class: 'xsmall' + (user.imageData ? ' avatar-image' : ''), user: user })));
                        }
                    }),
                    this.entry.usersInline.length > MAX_AVATAR_DISPLAY ?
                        h("li", { class: 'avatar-item ' + (!isFirefox() ? 'not-firefox' : '') },
                            h("yoo-avatar", { class: "xsmall counter", reversedColor: true, iconText: '+' + String(this.entry.usersInline.length - MAX_AVATAR_DISPLAY) })) : null))));
    }
    renderHeading() {
        return (h("div", { class: {
                'card-heading': true,
                'with-users': this.hasUsersInline()
            } },
            h("span", { innerHTML: this.entry.heading })));
    }
    renderDistance() {
        return (h("div", { class: "distance-box" },
            h("yoo-icon", { class: "yo-pin" }),
            h("span", { class: "icon-text" }, this.entry.distance)));
    }
    renderProgress() {
        return (h("div", { class: 'progress-box ' + (this.entry.progressClass || '') },
            h("span", { class: "icon-text" }, this.entry.progress)));
    }
    renderCollapsibleControls() {
        return (h("div", { class: "collapse-container", onClick: (ev) => this.onListCollapsed(ev) },
            h("yoo-icon", { class: {
                    'yo-down': this.isCollapsed,
                    'yo-up': !this.isCollapsed
                } })));
    }
    renderTopActions() {
        return (h("div", { class: "top-actions" }, this.entry.topActions.map(a => h("span", { onClick: (ev) => execHandlerAndStopEvent(ev, a.handler) }, a.text))));
    }
    renderHeadingContainerBottom() {
        let showMoreButton = this.entry.actions && this.entry.actions.length > 0 && isWeb();
        return (this.entry &&
            h("div", { class: { 'badges-container': true, 'show-more': showMoreButton } },
                this.entry.badges ? this.entry.badges.map((item) => h("yoo-badge", { class: item.cssClass ? item.cssClass : '', iconLeft: item.iconLeft, text: item.text, closable: item.closable }))
                    : null,
                this.entry.tags ? this.entry.tags.slice(0, 3).map(a => h("span", { class: "hashtag", innerHTML: `#${a} ` }))
                    : null,
                this.entry.icons ? this.entry.icons.map(icon => icon && icon.icon ?
                    h("span", { class: "card-icon", onClick: (ev) => execHandlerAndStopEvent(ev, icon.handler) },
                        h("yoo-icon", { class: icon.icon }),
                        ' ' + icon.value ? icon.value : '')
                    : null)
                    : null,
                this.entry.bottomActions ?
                    h("div", { class: "row-action" }, this.entry.bottomActions.map(a => h("span", { class: "bottom-action", onClick: (ev) => execHandlerAndStopEvent(ev, a.handler) }, a.text)))
                    : null,
                showMoreButton &&
                    h("yoo-context-menu", { contentButtons: this.entry.actions, contentPosition: { top: '1.625rem', right: '0.3125rem', bottom: 'auto', left: 'auto' } },
                        h("div", { class: "more-button" },
                            h("yoo-icon", { class: "yo-more dark" })))));
    }
    renderHeadingContainerContent() {
        return ([h("div", { class: "heading-container" },
                this.entry.heading ? this.renderHeading() : null,
                this.entry.date ? h("div", { class: "date-card" },
                    h("span", { class: "date-card-text" }, this.entry.date)) : null,
                this.hasUsersInline() ? this.renderInlineUsers() : null,
                this.entry.distance ? this.renderDistance() : null,
                this.entry.progress || this.entry.progress === 0 ? this.renderProgress() : null,
                this.entry.isCollapsible && !this.isFormChoice ? this.renderCollapsibleControls() : null),
            (this.entry.topActions && this.entry.topActions.length ? this.renderTopActions() : null),
            (this.entry.subheadings) && this.entry.subheadings.map((item, index) => {
                {
                    if (isCloudinaryLink(item)) {
                        return (h("yoo-img", { type: "back", class: "subheading-container comment-image", onClick: () => this.imageClicked(item), src: cloudinary(item, 200, 200) }));
                    }
                    else {
                        return (item && h("div", { class: "subheading-container", innerHTML: item.replace ? item.replace(/<p>&nbsp;<\/p>/g, '') : item }));
                    }
                }
            }),
            (this.hasHeadingBottomContent() && this.renderHeadingContainerBottom())
        ]);
    }
    hasHeadingBottomContent() {
        return (this.entry.badges || this.entry.tags || this.entry.icons || this.entry.bottomActions) && !this.entry.isCollapsible;
    }
    onItemTouchStart() {
        if (this.outerDiv && this.outerDiv.classList) {
            this.outerDiv.classList.add('tapped');
        }
    }
    onItemTouchEnd() {
        if (this.outerDiv && this.outerDiv.classList) {
            this.outerDiv.classList.remove('tapped');
        }
    }
    getExtraClasses() {
        let extraClasses = ' ';
        if (this.host.classList.contains('userranks')) {
            extraClasses += 'userranks';
        }
        return extraClasses;
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext(), { 'collapsed': this.entry.isCollapsible && this.isCollapsed, 'open': this.entry.isCollapsible && !this.isCollapsed, 'map': this.isMap, 'vip': this.entry.vip, 'firefox': isFirefox(), 'is-dark-theme': isDarkTheme() })
        };
    }
    render() {
        return ([
            this.entry &&
                h("div", { class: 'outer-container' + this.getExtraClasses(), ref: el => this.outerDiv = el, onTouchStart: () => { this.onItemTouchStart(); }, onTouchEnd: () => { this.onItemTouchEnd(); } },
                    this.entry.rank && (this.entry.points !== undefined) ?
                        h("div", { class: "rank-container" }, this.entry.rank) : null,
                    this.entry.imgSrc || this.entry.users || this.entry.icon || this.entry.iconText ?
                        h("div", { class: "image-container" }, this.renderImageContainerContent()) : null,
                    h("div", { class: {
                            'content-container': true,
                            'has-image ': this.entry.imgSrc !== undefined || this.entry.icon !== undefined,
                            'center': this.entry.heading === undefined && this.entry.subheadings === undefined
                        } },
                        h("div", { class: {
                                'top-container': true,
                                'leaderboard': this.entry.rank !== undefined && this.entry.points !== undefined
                            } },
                            this.renderHeadingContainerContent(),
                            this.entry.rank && (this.entry.points !== undefined) ? this.renderPointsContainerContent() : null),
                        h("div", { class: "slot-container" },
                            h("slot", { name: "content-slot" }),
                            h("div", { class: "inner-container" }, this.renderBottomContent())))),
            this.renderKpiContainer()
        ]);
    }
    static get is() { return "yoo-card-list"; }
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
        "entry": {
            "type": "Any",
            "attr": "entry"
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
        "isActivable": {
            "type": Boolean,
            "attr": "is-activable"
        },
        "isActive": {
            "state": true
        },
        "isCollapsed": {
            "type": Boolean,
            "attr": "is-collapsed",
            "mutable": true
        },
        "showContextMenu": {
            "state": true
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
        }, {
            "name": "listCollapsed",
            "method": "listCollapsed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-card-list:**/"; }
}

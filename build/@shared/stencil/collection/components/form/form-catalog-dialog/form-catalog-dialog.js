import { closeModal, pipes, translate, getElementDimensions, querySelectorDeep, cloudinary, showImageModal } from '../../../utils';
export class YooFormCatalogDialogComponent {
    constructor() {
        this.pictureWidth = 300;
        this.pictureHeight = 195;
        this.MIN_WIDTH_TABLET = 500;
    }
    componentDidLoad() {
        this.sizeContainer = getElementDimensions(this.innerContainer).width;
        this.tabletMod = this.sizeContainer > this.MIN_WIDTH_TABLET;
        this.pictureWidth = !this.tabletMod ? this.sizeContainer : 300;
        this.sizeText = getElementDimensions(this.textContainer).height;
        this.topTagPosition = Math.ceil((this.pictureWidth + this.sizeText) / 5) * 5 - 5;
        this.tagsContainer = querySelectorDeep(this.host, '.horizontal');
        this.tagsContainer.style.top = `${this.topTagPosition}px`;
        this.imageContainer.style.height = `${this.host.clientWidth}px`;
    }
    componentDidUpdate() {
        this.imageContainer.style.height = `${this.host.clientWidth}px`;
    }
    onClose() {
        closeModal(null);
    }
    onShowImage() {
        showImageModal(this.product.image._downloadURL, this.product.image._filename, true);
    }
    renderHeader() {
        return h("yoo-ion-header", { class: "shadow", "no-border": true },
            h("yoo-ion-toolbar", { color: "light" },
                h("yoo-ion-buttons", { slot: "start" },
                    h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onClose() },
                        h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                h("yoo-ion-title", null, translate('PRODUCT'))));
    }
    renderTag(tag) {
        return h("span", { class: "bg-light tag-item" }, tag);
    }
    renderContent() {
        return h("yoo-ion-content", { scrollEnabled: true, class: "bg-light" },
            h("div", { class: "inner-container", ref: el => this.innerContainer = el },
                h("div", { onClick: () => this.onShowImage(), ref: el => this.imageContainer = el, class: 'image-container ' + (this.tabletMod ? 'tablet-mod' : '') },
                    h("yoo-img", { type: "back", class: "image", src: cloudinary(this.product.image._downloadURL, this.pictureWidth, this.pictureHeight, null, null, null, null, true) })),
                h("div", { class: "text-container", ref: el => this.textContainer = el },
                    h("div", { class: "row-container" },
                        h("div", { class: "title" }, translate('TITLE')),
                        h("div", { class: "value" }, this.product.title)),
                    this.product.price ? h("div", { class: "row-container" },
                        h("div", { class: "title" }, translate('PRICE')),
                        h("div", { class: "value" }, pipes.currency.transform(this.product.price))) : null,
                    this.product.color ? h("div", { class: "row-container" },
                        h("div", { class: "title" }, translate('COLOR')),
                        h("div", { class: "value" }, this.product.color)) : null,
                    this.product.reference ? h("div", { class: "row-container" },
                        h("div", { class: "title" }, translate('REFERENCE')),
                        h("div", { class: "value" }, this.product.reference)) : null,
                    this.product.shortdescription || this.product.description ? h("div", { class: "row-container description" },
                        h("div", { class: "title" }, translate('DESCRIPTION')),
                        h("div", { class: "value", innerHTML: this.product.shortdescription || this.product.description })) : null),
                h("div", { class: "tags" },
                    h("yoo-ion-scroll", { class: "horizontal" },
                        h("div", { class: "button-spacer" }),
                        this.product.tags ? this.product.tags.map(value => {
                            return (this.renderTag(value));
                        }) : null,
                        h("div", { class: "button-spacer" })))));
    }
    render() {
        return [
            this.renderHeader(),
            this.renderContent()
        ];
    }
    static get is() { return "yoo-form-catalog-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "pictureHeight": {
            "state": true
        },
        "pictureWidth": {
            "state": true
        },
        "product": {
            "type": "Any",
            "attr": "product"
        },
        "sizeText": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-form-catalog-dialog:**/"; }
}

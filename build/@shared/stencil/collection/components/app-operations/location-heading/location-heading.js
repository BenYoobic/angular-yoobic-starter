import { showImageModal, translate, pipes } from '../../../index'; //getGoogleMapStreeView
export class YooLocationHeadingComponent {
    onIconClick() {
        let image = this.location.imageData; // || getGoogleMapStreeView(this.location, window.innerWidth, window.innerHeight);
        if (image) {
            showImageModal(image, this.location.title);
        }
    }
    renderVipBagde() {
        return (h("div", { class: "top-right-vip" },
            h("yoo-badge", { iconLeft: 'yo-star', class: "round energized icon-only" })));
    }
    renderTags() {
        return (this.location.tags && h("div", { class: "tags-container" }, this.location.tags.slice(0, 5).map(tag => {
            return h("span", { class: "hashtag", innerHTML: `#${tag.toLowerCase()}` });
        })));
    }
    hostData() {
        return {
            class: {
                'vip': this.location.vip
            }
        };
    }
    render() {
        let image = this.location.imageData; // || getGoogleMapStreeView(this.location, 70, 70);
        return (h("div", { class: "outer-container" },
            h("div", { class: "image-container", onClick: () => this.onIconClick() },
                h("yoo-avatar", { class: "medium", imgSrc: image, icon: 'yo-store success' }),
                this.location.vip && this.renderVipBagde()),
            h("div", { class: "text-container" },
                h("div", { class: "title" }, this.location.title),
                h("div", { class: "address" },
                    h("div", null, this.location.address),
                    this.renderTags()),
                this.lastVisitDate && h("div", { class: "last-visit" },
                    h("span", { class: "black" },
                        translate('VISIT'),
                        ":"),
                    h("span", null,
                        "\u00A0",
                        pipes.dateFormat.transform(this.lastVisitDate, 'L LT'))),
                this.location.countVisits && h("div", { class: "last-visit" },
                    h("span", { class: "black" },
                        translate('VISITCOUNT'),
                        ":"),
                    h("span", null,
                        "\u00A0",
                        this.location.countVisits.toString())))));
    }
    static get is() { return "yoo-location-heading"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "lastVisitDate": {
            "type": "Any",
            "attr": "last-visit-date"
        },
        "location": {
            "type": "Any",
            "attr": "location"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-location-heading:**/"; }
}

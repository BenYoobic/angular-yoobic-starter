import { getAppContext, translate } from '../../../index';
export class YooFormCreatorHeaderComponent {
    constructor() {
        this.secondaryActions = [
            { text: translate('IMPORTCSV'), icon: 'yo-file-csv', handler: () => this.exportClicked.emit() },
            { text: translate('EXPORTTOCSV'), icon: 'yo-export', handler: () => this.importClicked.emit() }
        ];
    }
    renderLogoImage() {
        const src = getAppContext()['boost'] ? 'boost' : 'operations';
        return (h("div", { class: "image-container" },
            h("yoo-img", { class: "header-logo", src: `assets/logo/${src}_simple.svg` })));
    }
    renderBreadCrumbs() {
        return (h("div", { class: "title" },
            h("div", { class: "stable" }, translate('CAMPAIGNCREATOR')),
            h("div", { class: "stable" }, "/"),
            h("span", null, this.formTitle)));
    }
    renderButtons() {
        return (h("div", { class: "buttons-container" },
            h("div", { class: "icon-container", onClick: () => this.helpClicked.emit() },
                h("yoo-icon", { class: "yo-help stable" })),
            h("div", { class: "icon-container context-menu" },
                h("yoo-context-menu", { class: "flex-column", contentButtons: this.secondaryActions, contentPosition: { top: '4rem', right: 'auto', bottom: 'auto', left: '1rem' } },
                    h("yoo-button", { class: "secondary-actions icon-only", icon: "yo-more" }))),
            h("yoo-button", { onClick: () => this.saveCloseClicked.emit(), class: "success", text: "SAVEANDCLOSE" }),
            h("div", { onClick: () => this.toggleLivePreviewClicked.emit(), class: "icon-container end" },
                h("yoo-icon", { class: {
                        'yo-sidebar-right': true,
                        'stable': !this.isLivePreviewVisible,
                        'success': this.isLivePreviewVisible
                    } }))));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return [
            this.renderLogoImage(),
            this.renderBreadCrumbs(),
            this.renderButtons()
        ];
    }
    static get is() { return "yoo-form-creator-header"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "formTitle": {
            "type": String,
            "attr": "form-title"
        },
        "host": {
            "elementRef": true
        },
        "isLivePreviewVisible": {
            "type": Boolean,
            "attr": "is-live-preview-visible"
        }
    }; }
    static get events() { return [{
            "name": "helpClicked",
            "method": "helpClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "saveCloseClicked",
            "method": "saveCloseClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "toggleLivePreviewClicked",
            "method": "toggleLivePreviewClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "exportClicked",
            "method": "exportClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "importClicked",
            "method": "importClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-creator-header:**/"; }
}

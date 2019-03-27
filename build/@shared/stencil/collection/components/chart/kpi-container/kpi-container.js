import { showActionSheet, translate, isWeb } from '../../../utils';
export class YooKpiContainerComponent {
    onShowDialog(index) {
        this.showDetail.emit(index);
    }
    onShowMore() {
        showActionSheet([
            { text: translate('SHARE') + ' : ' + translate('FEEDS'), handler: () => this.share.emit('feeds') }
        ]);
    }
    onKpiClick(ev) {
        ev.stopPropagation();
        this.kpiClick.emit(ev.detail);
    }
    onKpiDoubleClick(ev) {
        ev.stopPropagation();
        this.kpiDoubleClick.emit(ev.detail);
    }
    onKpiLegendItemClick(ev) {
        ev.stopPropagation();
        this.kpiLegendItemClick.emit(ev.detail);
    }
    renderKpiContent() {
        if (!this.config) {
            return h("yoo-loader", { class: "absolute large" });
        }
        return [
            this.config.photos && this.config.photos.length > 0 && this.type === 'carousel' ?
                this.config.photos.map((photo, index) => {
                    return h("div", { class: 'kpi-container ' + this.type, onClick: () => this.onShowDialog(index) }, this.renderKpi(photo.value));
                })
                :
                    h("div", { class: 'kpi-container ' + this.type, onClick: (ev) => this.onShowDialog() }, this.renderKpi())
        ];
    }
    // There may be more than one photo in the config, which is not the case for the other KPIs
    renderKpi(photoSrc) {
        return (h("yoo-kpi", { config: this.config, photoSrc: photoSrc, type: this.type, isFullScreen: this.isFullScreen, isFullHeight: this.isFullHeight, definition: this.definition, onKpiClick: ev => this.onKpiClick(ev), onKpiDoubleClick: ev => this.onKpiDoubleClick(ev), onKpiLegendItemClick: ev => this.onKpiLegendItemClick(ev) }));
    }
    hostData() {
        return {
            class: {
                'web': isWeb()
            }
        };
    }
    render() {
        return h("div", { class: {
                'container': true,
                'fullscreen': this.isFullScreen,
                'full-height': this.isFullHeight
            } },
            this.isFullScreen || this.hideHeader ? null : h("div", { class: "heading" },
                h("span", null, this.heading)),
            h("slot", { name: "start" }),
            h("div", { class: "content" }, this.renderKpiContent()),
            h("slot", null));
    }
    static get is() { return "yoo-kpi-container"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "definition": {
            "type": "Any",
            "attr": "definition"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "hideHeader": {
            "type": Boolean,
            "attr": "hide-header"
        },
        "host": {
            "elementRef": true
        },
        "isFullHeight": {
            "type": Boolean,
            "attr": "is-full-height"
        },
        "isFullScreen": {
            "type": Boolean,
            "attr": "is-full-screen"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get events() { return [{
            "name": "showDetail",
            "method": "showDetail",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "kpiClick",
            "method": "kpiClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "kpiDoubleClick",
            "method": "kpiDoubleClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "kpiLegendItemClick",
            "method": "kpiLegendItemClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "share",
            "method": "share",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-kpi-container:**/"; }
}

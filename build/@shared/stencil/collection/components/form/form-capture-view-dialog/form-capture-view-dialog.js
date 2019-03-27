import { closeModal, isWeb, lockSwipes, isIOS, isCordova } from '../../../utils';
import { cloneDeep, orderBy } from 'lodash-es';
export class YooFormCaptureViewDialogComponent {
    componentWillLoad() {
        if (this.imageRecognitionResults && this.imageRecognitionResults.length > 0 && this.imageRecognitionDisplay && this.imageRecognitionDisplay.length > 0) {
            this.properties = [];
            this.imageRecognitionDisplay.forEach(display => {
                switch (display.type) {
                    case 'list':
                    case 'grid':
                        let values = cloneDeep(this.imageRecognitionResults);
                        if (display.filter) {
                            values = values.filter(r => r.key.toUpperCase().indexOf(display.filter.toUpperCase()) >= 0);
                        }
                        if (display.filters) {
                            values = values.filter(r => display.filters.map(k => k.toUpperCase()).indexOf(r.key.toUpperCase()) >= 0);
                        }
                        if (display.value !== null && display.value !== undefined) {
                            values = values.filter(r => r.rawValue === display.value.toString());
                        }
                        if (display.factor) {
                            values.forEach(v => v.value * display.factor);
                        }
                        if (display.sort) {
                            values = orderBy(values, v => v.value * (display.sort === 'desc' ? -1 : 1));
                        }
                        if (display.limit) {
                            values = values.slice(0, display.limit);
                        }
                        let rows = values.map(v => ({ values: [v.title, v.value + (display.unit ? display.unit : '')], color: v.color }));
                        if (display.rows) {
                            rows = [];
                            display.rows.forEach((row) => {
                                let rowValues = [];
                                row.forEach((r, i) => {
                                    if (i === 0) {
                                        rowValues.push(r);
                                    }
                                    else {
                                        if (r) {
                                            let kpi = this.imageRecognitionResults.find(k => k.key === r);
                                            if (kpi) {
                                                rowValues.push(kpi.value);
                                            }
                                            else {
                                                rowValues.push(null);
                                            }
                                        }
                                        else {
                                            rowValues.push(null);
                                        }
                                    }
                                });
                                rows.push({ values: rowValues, color: null });
                            });
                        }
                        this.properties.push({
                            title: display.title,
                            type: 'grid',
                            headers: display.headers || ['KPI', 'Value'],
                            values: rows
                        });
                        break;
                }
            });
        }
    }
    componentDidLoad() {
        if (!this.edit && !this.preview) {
            //setTimeout(() => {
            lockSwipes(this.ionSlides, true);
            //}, 300);
        }
    }
    onCancel() {
        closeModal(null);
    }
    getResultColor(color) {
        if (color) {
            if (color === 'balanced') {
                return 'success';
            }
            if (color === 'assertive') {
                return 'danger';
            }
            return color;
        }
        return 'black';
    }
    renderWebBody() {
        return h("yoo-ion-content", { scrollEnabled: false },
            h("div", { class: "images" },
                !(this.edit && this.isStitch) ? h("yoo-img", { class: "preview", src: this.preview }) : null,
                this.edit ? h("yoo-img", { class: "preview edit", src: this.edit }) : null,
                this.imageRecognitionResults && this.imageRecognitionResults.length > 0 ?
                    h("div", { class: "image-recos" }, this.imageRecognitionResults.map((result) => {
                        return !result.hidden ? h("div", { class: 'image-reco' },
                            h("div", { class: "title" },
                                result.title,
                                ":"),
                            h("div", { class: 'image-reco-value ' + this.getResultColor(result.color) }, result.value)) : null;
                    })) : null));
    }
    renderMobileBody() {
        return h("yoo-ion-content", { class: "bg-dark-05", scrollEnabled: false },
            h("yoo-ion-slides", { ref: el => this.ionSlides = el, pager: this.imageRecognitionResults && this.imageRecognitionResults.length > 0 && (this.edit || this.preview) ? true : false },
                this.preview || this.edit ?
                    h("yoo-ion-slide", null,
                        h("div", { class: "images" },
                            !(this.edit && this.isStitch) ? h("yoo-img", { class: "preview", src: this.preview }) : null,
                            this.edit ? h("yoo-img", { class: "preview edit", src: this.edit }) : null)) : null,
                this.imageRecognitionResults && this.imageRecognitionResults.length > 0 ?
                    h("yoo-ion-slide", null,
                        h("yoo-ion-scroll", null, this.properties && this.properties.length > 0 ?
                            [h("yoo-property-card", { class: "kpi swiper-no-swiping", properties: this.properties }),
                                (isIOS() && isCordova()) && h("div", { class: "scroll-spacer" })]
                            : h("div", { class: "image-recos swiper-no-swiping" }, this.imageRecognitionResults.map((result, i) => {
                                return !result.hidden ? h("div", { class: 'image-reco' + ((i % 2 === 0) ? ' contrasted' : '') },
                                    h("div", { class: "title" },
                                        result.title,
                                        ":"),
                                    h("div", { class: 'image-reco-value ' + this.getResultColor(result.color) }, result.value)) : null;
                            })))) : null));
    }
    render() {
        return [
            h("yoo-ion-header", { class: "shadow", "no-border": true },
                h("yoo-ion-toolbar", { color: "light" },
                    h("yoo-ion-buttons", { slot: "start" },
                        h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                            h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                    h("yoo-ion-title", null, this.label))),
            isWeb() ? this.renderWebBody() : this.renderMobileBody()
        ];
    }
    static get is() { return "yoo-form-capture-view-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowAnnotate": {
            "type": Boolean,
            "attr": "allow-annotate"
        },
        "edit": {
            "type": "Any",
            "attr": "edit"
        },
        "host": {
            "elementRef": true
        },
        "imageRecognitionDisplay": {
            "type": "Any",
            "attr": "image-recognition-display"
        },
        "imageRecognitionResults": {
            "type": "Any",
            "attr": "image-recognition-results"
        },
        "isStitch": {
            "type": Boolean,
            "attr": "is-stitch"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "preview": {
            "type": "Any",
            "attr": "preview"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-form-capture-view-dialog:**/"; }
}

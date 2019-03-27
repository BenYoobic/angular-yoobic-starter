import { h } from '../design-system.core.js';

import { Q as closeModal } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';

class YooFormDynamicHistoryDialogComponent {
    renderHistoryHeader(avatarData, date, time) {
        return h("div", { class: "history-header" },
            h("div", { class: "avatar" },
                h("yoo-avatar", { class: "history", user: avatarData }, " ")),
            h("div", { class: "date" },
                pipes.dateFormat.transform(date, 'L'),
                " ",
                h("span", { class: "at" }, ' at '),
                time));
    }
    onCancel() {
        closeModal(null);
    }
    renderDialogHeader() {
        return h("div", { class: "dialog-header", onClick: () => this.onCancel() }, " Click me to close");
    }
    render() {
        return [(this.isModal ? this.renderDialogHeader() : null), h("slot", null)];
        // return <div class="history-container">
        //     {this.historyData.map((data) => {
        //     let newClass = {};
        //     newClass[this.field.type] = true;
        //     return hasValue(this.field, data, this.suffix) ? <div class={{
        //         'square': true,
        //         ...newClass
        //     }}
        //     >
        //         {this.renderHistoryHeader(data.user, data.date, '09:13')}
        //         <div class="square-content">
        //         {this.renderInput(this.field, data, slideIndex, inputIndex, true, 'history', true)}
        //         </div>
        //         <div class="more-button">{translate('MORE')}</div>
        //         <div class="less-button">{translate('VIEWLESS')}</div>
        //     </div> : null;
        // })}
        // </div>;
    }
    static get is() { return "yoo-form-dynamic-history-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "field": {
            "type": "Any",
            "attr": "field"
        },
        "historyData": {
            "type": "Any",
            "attr": "history-data"
        },
        "host": {
            "elementRef": true
        },
        "isModal": {
            "type": "Any",
            "attr": "is-modal"
        },
        "suffix": {
            "type": "Any",
            "attr": "suffix"
        }
    }; }
    static get style() { return ""; }
}

export { YooFormDynamicHistoryDialogComponent as YooFormDynamicHistoryDialog };

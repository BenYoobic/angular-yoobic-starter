import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../../utils/ionic';
export class YooIonActionSheetControllerComponent {
    constructor() {
        this.actionSheets = new Map();
    }
    actionSheetWillPresent(ev) {
        this.actionSheets.set(ev.target.overlayId, ev.target);
    }
    actionSheetWillDismiss(ev) {
        this.actionSheets.delete(ev.target.overlayId);
    }
    escapeKeyUp(event) {
        if (event && event.key === 'escape') {
            removeLastOverlay(this.actionSheets);
        }
    }
    /**
     * Create an action sheet overlay with action sheet options.
     */
    async create(opts) {
        return createOverlay(this.doc.createElement('yoo-action-sheet'), opts);
    }
    /**
     * Dismiss the open action sheet overlay.
     */
    async dismiss(data, role, actionSheetId = -1) {
        return dismissOverlay(data, role, this.actionSheets, actionSheetId, 'YOO-ACTION-SHEET');
    }
    /**
     * Get the most recently opened action sheet overlay.
     */
    async getTop() {
        return getTopOverlay(this.actionSheets);
    }
    static get is() { return "yoo-ion-action-sheet-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
    static get listeners() { return [{
            "name": "body:ionModalWillPresent",
            "method": "actionSheetWillPresent"
        }, {
            "name": "body:ionActionSheetWillDismiss",
            "method": "actionSheetWillDismiss"
        }, {
            "name": "body:ionActionSheetDidUnload",
            "method": "actionSheetWillDismiss"
        }, {
            "name": "body:keyup",
            "method": "escapeKeyUp"
        }]; }
}

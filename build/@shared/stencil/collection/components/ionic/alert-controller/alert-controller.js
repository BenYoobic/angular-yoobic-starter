import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../../utils/ionic';
export class YooIonAlertControllerComponent {
    constructor() {
        this.alerts = new Map();
    }
    alertWillPresent(ev) {
        this.alerts.set(ev.target.overlayId, ev.target);
    }
    alertWillDismiss(ev) {
        this.alerts.delete(ev.target.overlayId);
    }
    escapeKeyUp(event) {
        if (event && event.key === 'escape') {
            removeLastOverlay(this.alerts);
        }
    }
    /**
     * Create an alert overlay with alert options
     */
    async create(opts) {
        return createOverlay(this.doc.createElement('yoo-alert'), opts);
    }
    /**
     * Dismiss the open alert overlay.
     */
    async dismiss(data, role, alertId = -1) {
        return dismissOverlay(data, role, this.alerts, alertId, 'YOO-ALERT');
    }
    /**
     * Get the most recently opened alert overlay.
     */
    async getTop() {
        return getTopOverlay(this.alerts);
    }
    static get is() { return "yoo-ion-alert-controller"; }
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
            "method": "alertWillPresent"
        }, {
            "name": "body:ionAlertWillDismiss",
            "method": "alertWillDismiss"
        }, {
            "name": "body:ionAlertDidUnload",
            "method": "alertWillDismiss"
        }, {
            "name": "body:keyup",
            "method": "escapeKeyUp"
        }]; }
}

import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../../utils/ionic';
export class YooIonToastControllerComponent {
    constructor() {
        this.toasts = new Map();
    }
    toastWillPresent(ev) {
        this.toasts.set(ev.target.overlayId, ev.target);
    }
    toastWillDismiss(ev) {
        this.toasts.delete(ev.target.overlayId);
    }
    escapeKeyUp(event) {
        if (event && event.key === 'escape') {
            removeLastOverlay(this.toasts);
        }
    }
    /**
     * Create a toast overlay with toast options.
     */
    async create(opts) {
        return createOverlay(this.doc.createElement('yoo-toast'), opts);
    }
    /**
     * Dismiss the open toast overlay.
     */
    async dismiss(data, role, toastId = -1) {
        return dismissOverlay(data, role, this.toasts, toastId, 'YOO-TOAST');
    }
    /**
     * Get the most recently opened toast overlay.
     */
    async getTop() {
        return getTopOverlay(this.toasts);
    }
    static get is() { return "yoo-ion-toast-controller"; }
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
            "name": "body:ionToastWillPresent",
            "method": "toastWillPresent"
        }, {
            "name": "body:ionToastWillDismiss",
            "method": "toastWillDismiss"
        }, {
            "name": "body:ionToastDidUnload",
            "method": "toastWillDismiss"
        }, {
            "name": "body:keyup",
            "method": "escapeKeyUp"
        }]; }
}

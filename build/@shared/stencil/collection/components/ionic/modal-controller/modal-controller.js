import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../../utils/ionic';
export class YooIonModalControllerComponent {
    constructor() {
        this.modals = new Map();
        this.topOverlayID = 0;
    }
    modalWillPresent(ev) {
        this.modals.set(ev.target.overlayId, ev.target);
        this.topOverlayID = ev.target.overlayId;
    }
    modalWillDismiss(ev) {
        this.modals.delete(ev.target.overlayId);
        this.topOverlayID = this.topOverlayID - 1;
    }
    escapeKeyUp(event) {
        if (event && event.key === 'escape') {
            let topOverlayElement = this.modals.get(this.topOverlayID);
            if (topOverlayElement && topOverlayElement.classList.contains('modal')) {
                removeLastOverlay(this.modals);
            }
        }
    }
    /**
     * Create a modal overlay with modal options.
     */
    async create(opts) {
        return createOverlay(this.doc.createElement('yoo-ion-modal'), opts, opts.host);
    }
    /**
     * Dismiss the open modal overlay.
     */
    async dismiss(data, role, modalId = -1) {
        return dismissOverlay(data, role, this.modals, modalId, 'YOO-ION-MODAL');
    }
    /**
     * Get the most recently opened modal overlay.
     */
    async getTop() {
        return getTopOverlay(this.modals);
    }
    static get is() { return "yoo-ion-modal-controller"; }
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
            "method": "modalWillPresent"
        }, {
            "name": "body:ionModalWillDismiss",
            "method": "modalWillDismiss"
        }, {
            "name": "body:ionModalDidUnload",
            "method": "modalWillDismiss"
        }, {
            "name": "body:keyup",
            "method": "escapeKeyUp"
        }]; }
}

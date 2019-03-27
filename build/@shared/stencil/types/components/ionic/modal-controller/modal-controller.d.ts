import { OverlayController } from '../../../utils/ionic';
export declare class YooIonModalControllerComponent implements OverlayController {
    doc: Document;
    private modals;
    private topOverlayID;
    protected modalWillPresent(ev: any): void;
    protected modalWillDismiss(ev: any): void;
    protected escapeKeyUp(event: any): void;
    /**
     * Create a modal overlay with modal options.
     */
    create(opts?: any): Promise<any>;
    /**
     * Dismiss the open modal overlay.
     */
    dismiss(data?: any, role?: string, modalId?: number): Promise<void>;
    /**
     * Get the most recently opened modal overlay.
     */
    getTop(): Promise<HTMLYooModalElement>;
}

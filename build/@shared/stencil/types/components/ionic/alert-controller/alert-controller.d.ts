import { IAlertEntry } from '../../../interfaces';
import { OverlayController } from '../../../utils/ionic';
export declare class YooIonAlertControllerComponent implements OverlayController {
    doc: Document;
    private alerts;
    protected alertWillPresent(ev: any): void;
    protected alertWillDismiss(ev: any): void;
    protected escapeKeyUp(event: any): void;
    /**
     * Create an alert overlay with alert options
     */
    create(opts?: IAlertEntry): Promise<HTMLYooAlertElement>;
    /**
     * Dismiss the open alert overlay.
     */
    dismiss(data?: any, role?: string, alertId?: number): Promise<void>;
    /**
     * Get the most recently opened alert overlay.
     */
    getTop(): Promise<HTMLYooAlertElement>;
}

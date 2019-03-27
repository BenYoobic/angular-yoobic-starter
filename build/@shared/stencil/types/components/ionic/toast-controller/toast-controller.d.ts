import { IToastEntry } from '../../../interfaces';
import { OverlayController } from '../../../utils/ionic';
export declare class YooIonToastControllerComponent implements OverlayController {
    doc: Document;
    private toasts;
    protected toastWillPresent(ev: any): void;
    protected toastWillDismiss(ev: any): void;
    protected escapeKeyUp(event: any): void;
    /**
     * Create a toast overlay with toast options.
     */
    create(opts?: IToastEntry): Promise<HTMLYooToastElement>;
    /**
     * Dismiss the open toast overlay.
     */
    dismiss(data?: any, role?: string, toastId?: number): Promise<void>;
    /**
     * Get the most recently opened toast overlay.
     */
    getTop(): Promise<HTMLYooToastElement>;
}

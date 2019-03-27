import { IActionSheet } from '../../../interfaces';
import { OverlayController } from '../../../utils/ionic';
export declare class YooIonActionSheetControllerComponent implements OverlayController {
    doc: Document;
    private actionSheets;
    protected actionSheetWillPresent(ev: any): void;
    protected actionSheetWillDismiss(ev: any): void;
    protected escapeKeyUp(event: any): void;
    /**
     * Create an action sheet overlay with action sheet options.
     */
    create(opts?: IActionSheet): Promise<HTMLYooActionSheetElement>;
    /**
     * Dismiss the open action sheet overlay.
     */
    dismiss(data?: any, role?: string, actionSheetId?: number): Promise<void>;
    /**
     * Get the most recently opened action sheet overlay.
     */
    getTop(): Promise<HTMLYooActionSheetElement>;
}

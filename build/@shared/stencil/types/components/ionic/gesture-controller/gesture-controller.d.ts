import { EventEmitter } from '../../../stencil.core';
import { BlockerConfig, GestureConfig } from '../../../utils/ionic';
import { BlockerDelegate } from './gesture';
export declare class YooIonGestureControllerComponent {
    /**
     * Event emitted when a gesture has been captured.
     */
    ionGestureCaptured: EventEmitter<string>;
    private gestureId;
    private requestedStart;
    private disabledGestures;
    private disabledScroll;
    private capturedId;
    /**
     * Creates a gesture delegate based on the GestureConfig passed
     */
    create(config: GestureConfig): Promise<any>;
    /**
     * Creates a blocker that will block any other gesture events from firing. Set in the ion-gesture component.
     */
    createBlocker(opts?: BlockerConfig): Promise<BlockerDelegate>;
    start(gestureName: string, id: number, priority: number): boolean;
    capture(gestureName: string, id: number, priority: number): boolean;
    release(id: number): void;
    disableGesture(gestureName: string, id: number): void;
    enableGesture(gestureName: string, id: number): void;
    disableScroll(id: number): void;
    enableScroll(id: number): void;
    canStart(gestureName: string): boolean;
    isCaptured(): boolean;
    isScrollDisabled(): boolean;
    isDisabled(gestureName: string): boolean;
    private newID;
}

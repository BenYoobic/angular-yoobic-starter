import { EventListenerEnable, QueueApi } from '../../../stencil.core';
import { GestureCallback, GestureDetail } from '../../../utils/ionic';
export declare class YooIonGestureComponent {
    /**
     * What component to attach listeners to.
     */
    attachTo: string | HTMLElement;
    /**
     * If true, the current gesture will disabling scrolling interactions
     */
    disableScroll: boolean;
    /**
     * What direction to listen for gesture changes
     */
    direction: string;
    /**
     * Name for the gesture action
     */
    gestureName: string;
    /**
     * What priority the gesture should take. The higher the number, the higher the priority.
     */
    gesturePriority: number;
    /**
     * If the event should use passive event listeners
     */
    passive: boolean;
    /**
     * The max angle for the gesture
     */
    maxAngle: number;
    /**
     * How many pixels of change the gesture should wait for before triggering the action.
     */
    threshold: number;
    /**
     * Function to execute to see if gesture can start. Return boolean
     */
    canStart?: GestureCallback;
    /**
     * Function to execute when the gesture will start
     */
    onWillStart?: (_: GestureDetail) => Promise<void>;
    /**
     * Function to execute when the gesture has start
     */
    onStart?: GestureCallback;
    /**
     * Function to execute when the gesture has moved
     */
    onMove?: GestureCallback;
    /**
     * Function to execute when the gesture has end
     */
    onEnd?: GestureCallback;
    /**
     * Function to execute when the gesture has not been captured
     */
    notCaptured?: GestureCallback;
    /**
   * If true, the current gesture interaction is disabled
   */
    disabled: boolean;
    queue: QueueApi;
    enableListener: EventListenerEnable;
    gestureCtrl: HTMLYooIonGestureControllerElement;
    isServer: boolean;
    private detail;
    private positions;
    private gesture?;
    private lastTouch;
    private pan;
    private hasCapturedPan;
    private hasStartedPan;
    private hasFiredStart;
    private isMoveQueued;
    constructor();
    protected disabledChanged(isDisabled: boolean): void;
    onTouchStart(ev: TouchEvent): void;
    onMouseDown(ev: MouseEvent): void;
    onTouchMove(ev: TouchEvent): void;
    onMoveMove(ev: TouchEvent): void;
    onTouchCancel(ev: TouchEvent): void;
    onMouseUp(ev: TouchEvent): void;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private pointerDown;
    private pointerMove;
    private fireOnMove;
    private calcGestureData;
    private tryToCapturePan;
    private fireOnStart;
    private abortGesture;
    private reset;
    private pointerUp;
    private enableMouse;
    private enableTouch;
    private enable;
}

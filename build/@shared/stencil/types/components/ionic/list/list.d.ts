export declare class YooIonListComponent {
    /**
     * How the bottom border should be displayed on all items.
     */
    lines?: 'full' | 'inset' | 'none';
    /**
     * If true, the list will have margin around it and rounded corners. Defaults to `false`.
     */
    inset: boolean;
    private openItem?;
    /**
     * Get the [Item Sliding](../../item-sliding/ItemSliding) that is currently open.
     */
    getOpenItem(): Promise<HTMLYooIonItemSlidingElement>;
    /**
     * Set an [Item Sliding](../../item-sliding/ItemSliding) as the open item.
     */
    setOpenItem(itemSliding: HTMLYooIonItemSlidingElement | undefined): void;
    /**
     * Close the sliding items. Items can also be closed from the [Item Sliding](../../item-sliding/ItemSliding).
     * Returns a boolean value of whether it closed an item or not.
     */
    closeSlidingItems(): Promise<boolean>;
    hostData(): {
        class: any;
    };
}

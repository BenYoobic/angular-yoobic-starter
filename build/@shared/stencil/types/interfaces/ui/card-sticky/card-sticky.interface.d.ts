export interface ICardStickyEntry {
    category?: string;
    title?: string;
    subheadings?: Array<string>;
    postedBy?: string;
    buttonText?: string;
    handler?: () => void;
    imgSrc?: string;
    isLocked?: boolean;
}

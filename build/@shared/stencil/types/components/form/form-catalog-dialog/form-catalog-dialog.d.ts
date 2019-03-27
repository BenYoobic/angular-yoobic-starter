import '../../../stencil.core';
import { IProduct } from '../../../interfaces';
export declare class YooFormCatalogDialogComponent {
    heading: string;
    product: IProduct;
    pictureWidth: number;
    pictureHeight: number;
    sizeText: number;
    host: HTMLStencilElement;
    private sizeContainer;
    private innerContainer;
    private textContainer;
    private imageContainer;
    private topTagPosition;
    private tagsContainer;
    private MIN_WIDTH_TABLET;
    private tabletMod;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    onClose(): void;
    onShowImage(): void;
    renderHeader(): JSX.Element;
    renderTag(tag: string): JSX.Element;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}

import '../../../stencil.core';
export declare class YooBackgroundBlurComponent {
    imageUrl: string;
    width: number;
    height: number;
    private imgSrc;
    private opacity;
    private blur;
    private cropMode;
    private imageFlag;
    private gradientLayer;
    componentWillLoad(): Promise<void>;
    componentWillUpdate(): Promise<void>;
    private getWidth;
    private getHeight;
    private prepareImgSrc;
    private getBackgroundImageCss;
    render(): JSX.Element;
}

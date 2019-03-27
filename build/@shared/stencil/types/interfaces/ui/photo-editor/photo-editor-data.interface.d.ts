export interface IPhotoEditorData {
    canvasData?: string;
    height?: number;
    width?: number;
    svgData?: string;
    svgElement?: SVGElement;
    texts?: IPhotoAnnotation[];
}
export interface IZoomTransform {
    currentScale: number;
    adjustDeltaX: number;
    adjustDeltaY: number;
}
export interface XYPoint {
    x: number;
    y: number;
}
export interface IPhotoAnnotation {
    percent_x?: number;
    percent_y?: number;
    width_height_ratio?: number;
    text?: string;
    title?: string;
    type?: 'dot' | 'text';
    styles?: IPhotoTextAnnotationStyles;
}
export interface IPhotoTextAnnotationStyles {
    fontSize?: string;
    textColor?: string;
    backgroundColor?: string;
    width?: string;
    height?: string;
    textAlignment?: string;
}
export interface IPhotoEditorState {
    isDiscarded?: boolean;
    hasDrawings?: boolean;
    hasTextAnnotations?: boolean;
    hasDotAnnotations?: boolean;
    hasAnnotationMoved?: boolean;
    hasInitialTexts?: boolean;
    hasInitialDrawings?: boolean;
    hasInitialSVG?: boolean;
    hasStitch?: boolean;
}

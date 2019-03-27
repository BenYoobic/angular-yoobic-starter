// ALL texts coming from the previous version are DOT annotations so we set them as such should they exist
export function setDotAnnotations(texts) {
    if (texts) {
        texts.map(annotation => {
            if (annotation.type !== null && !isTextAnnotation(annotation)) {
                annotation.type = 'dot';
            }
            return annotation;
        });
        return texts;
    }
}
export function adjustTextArea(target, adjustWidth = true) {
    target.style.overflow = 'hidden';
    target.style.height = '1px';
    if (adjustWidth) {
        target.style.width = '1px';
    }
    target.style.height = `${target.scrollHeight}px`;
    // Add some extra pixels to get around the issue where annotations get cropped on iOS if they were created in Android
    target.style.width = `${target.scrollWidth + 5}px`;
}
export function limitDragPosition(finalPosition, imageHeight, imageWidth, containerDimensions, isPortraitImage) {
    if (finalPosition.x < 0) {
        finalPosition.x = 0;
    }
    if (finalPosition.x + containerDimensions.width > imageWidth) {
        finalPosition.x = imageWidth - containerDimensions.width;
    }
    if (finalPosition.y < 0) {
        finalPosition.y = 0;
    }
    if (isPortraitImage && finalPosition.y < 50) {
        finalPosition.y = 50;
    }
    if (finalPosition.y + containerDimensions.height > imageHeight) {
        finalPosition.y = imageHeight - containerDimensions.height;
    }
    return finalPosition;
}
export function hasAnnotationMoved(oldAnnotation, updatedAnnotation) {
    if (oldAnnotation.percent_x !== updatedAnnotation.percent_x) {
        return true;
    }
    else if (oldAnnotation.percent_y !== updatedAnnotation.percent_y) {
        return true;
    }
    return false;
}
// This function will appropriately scale all the SVG annotations
// Each SVG will have the viewbox corresponding to the width and height of the original SVG
// We only need to modify the width and height to make it work
export function scaleSVGData(svgData, width, height) {
    return svgData.replace(/height="[0-9]+"/, `height="${height}"`).replace(/width="[0-9]+"/, `width="${width}"`);
}
function extractViewBoxValues(viewbox) {
    // Viewbox format '0 0 width height'
    const viewboxWidth = viewbox.baseVal.width;
    const viewboxHeight = viewbox.baseVal.height;
    return [viewboxWidth, viewboxHeight];
}
export function isSameViewbox(currentHeight, currentWidth, viewbox) {
    const [viewboxWidth, viewboxHeight] = extractViewBoxValues(viewbox);
    return viewboxWidth === currentWidth && viewboxHeight === currentHeight;
}
export function computeViewboxZoom(currentHeight, currentWidth, viewbox) {
    const [viewboxWidth] = extractViewBoxValues(viewbox);
    const viewboxZoomValue = currentWidth / viewboxWidth;
    return viewboxZoomValue;
}
export function parseSVG(svgData) {
    const parser = new DOMParser();
    const svgOverlay = parser.parseFromString(svgData, 'image/svg+xml');
    return svgOverlay.firstChild;
}
export function isTextBackgroundOn(backgroundStatus) {
    return backgroundStatus === 'on';
}
export function isTextBackgroundOff(backgroundStatus) {
    return backgroundStatus === 'off';
}
export function isTextMode(editorMode) {
    return editorMode === 'text';
}
export function isDrawMode(editorMode) {
    return editorMode === 'draw';
}
export function isZoomMode(editorMode) {
    return editorMode === 'zoom';
}
export function isAnnotationMode(editorMode) {
    return editorMode === 'annotation';
}
export function isLandscape(imageOrientation) {
    return imageOrientation === 'landscape';
}
export function isPortrait(imageOrientation) {
    return imageOrientation === 'portrait';
}
export function isCanvasCurrentTarget(event) {
    if (event.currentTarget) {
        return event.currentTarget.tagName === 'CANVAS';
    }
    return false;
}
export function isTargetSpan(event) {
    return event.target.tagName === 'SPAN';
}
export function isTargetTextArea(event) {
    if (event && event.target) {
        return event.target.tagName === 'TEXTAREA';
    }
}
export function isDotAnnotation(annotation) {
    return annotation.type === 'dot';
}
export function isTextAnnotation(annotation) {
    return annotation.type === 'text';
}
export function isItemAnnotated(item) {
    return item.edit || item.texts;
}

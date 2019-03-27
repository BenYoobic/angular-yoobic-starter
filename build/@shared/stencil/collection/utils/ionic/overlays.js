let lastId = 1;
export const BACKDROP = 'backdrop';
export function isFullScreenFalse() {
    return location && location.search && location.search.indexOf('fullscreen=false') >= 0;
}
export function createOverlay(element, opts, host) {
    // convert the passed in overlay options into props
    // that get passed down into the new overlay
    Object.assign(element, opts);
    element.overlayId = lastId++;
    // append the overlay element to the document body
    const doc = element.ownerDocument;
    let isFullscreen = true;
    let appRoot;
    if (isFullScreenFalse()) {
        isFullscreen = false;
    }
    if (host) {
        host.appendChild(element);
    }
    else {
        if (!isFullscreen) {
            appRoot = doc.querySelector('yoo-device');
        }
        else {
            appRoot = doc.querySelector('yoo-app') || doc.body;
        }
        appRoot.appendChild(element);
    }
    return element.componentOnReady();
}
export function dismissOverlay(data, role, overlays, id, type) {
    id = id >= 0 ? id : getHighestMacthingTypeId(overlays, type);
    const overlay = overlays.get(id);
    if (!overlay) {
        return Promise.resolve();
    }
    return overlay.dismiss(data, role);
}
export function getTopOverlay(overlays) {
    return overlays.get(getHighestId(overlays));
}
export function getHighestId(overlays) {
    let minimum = -1;
    if (overlays) {
        overlays.forEach((_, id) => {
            if (id > minimum) {
                minimum = id;
            }
        });
    }
    return minimum;
}
export function getHighestMacthingTypeId(overlays, type) {
    let highestMatchingId = -1;
    if (overlays) {
        overlays.forEach((overlay, id) => {
            if (id > highestMatchingId && overlay.tagName === type) {
                highestMatchingId = id;
            }
        });
    }
    return highestMatchingId;
}
export function removeLastOverlay(overlays) {
    const toRemove = getTopOverlay(overlays);
    return toRemove ? toRemove.dismiss() : Promise.resolve();
}
export async function present(overlay, name, 
//iosEnterAnimation: AnimationBuilder,
animationFn, opts) {
    if (overlay.presented) {
        return;
    }
    overlay.presented = true;
    if (overlay.host) {
        overlay.host.classList.remove('safari');
    }
    overlay.willPresent.emit();
    // get the user's animation fn if one was provided
    //const animationBuilder = overlay.enterAnimation;
    //await overlayAnimation(overlay, animationBuilder, overlay.host, opts);
    await animationFn();
    overlay.didPresent.emit();
}
export async function dismiss(overlay, data, role, overlayDismiss, name, 
// iosLeaveAnimation: AnimationBuilder,
animationFn, opts) {
    if (!overlay.presented) {
        return;
    }
    overlay.presented = false;
    overlay.willDismiss.emit({ data, role, overlayDismiss });
    await animationFn();
    overlay.didDismiss.emit({ data, role, overlayDismiss });
    overlay.host.remove();
}
export function autoFocus(containerEl) {
    const focusableEls = containerEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    if (focusableEls.length > 0) {
        const el = focusableEls[0];
        el.focus();
        return el;
    }
    return null;
}
export function eventMethod(element, eventName, callback) {
    let resolve;
    const promise = new Promise(r => (resolve = r));
    onceEvent(element, eventName, (event) => {
        const detail = event.detail;
        if (callback) {
            callback(detail);
        }
        resolve(detail);
    });
    return promise;
}
export function onceEvent(element, eventName, callback) {
    const handler = (ev) => {
        element.removeEventListener(eventName, handler);
        callback(ev);
    };
    element.addEventListener(eventName, handler);
}
export function isCancel(role) {
    return role === 'cancel' || role === BACKDROP;
}

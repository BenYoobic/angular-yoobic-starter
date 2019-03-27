
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, cmpTags, HTMLElementPrototype, App, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    if (cmpTags) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = cmpTags + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        y = doc.head.querySelector('meta[charset]');
        doc.head.insertBefore(x, y ? y.nextSibling : doc.head.firstChild);
    }
    createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype);
    resourcesUrl = resourcesUrl || App.resourcesUrl;
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (!resourcesUrl && y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}
function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
    (win['s-apps'] = win['s-apps'] || []).push(namespace);
    if (!HTMLElementPrototype.componentOnReady) {
        HTMLElementPrototype.componentOnReady = function componentOnReady() {
            /*tslint:disable*/
            var elm = this;
            function executor(resolve) {
                if (elm.nodeName.indexOf('-') > 0) {
                    // window hasn't loaded yet and there's a
                    // good chance this is a custom element
                    var apps = win['s-apps'];
                    var appsReady = 0;
                    // loop through all the app namespaces
                    for (var i = 0; i < apps.length; i++) {
                        // see if this app has "componentOnReady" setup
                        if (win[apps[i]].componentOnReady) {
                            // this app's core has loaded call its "componentOnReady"
                            if (win[apps[i]].componentOnReady(elm, resolve)) {
                                // this component does belong to this app and would
                                // have fired off the resolve fn
                                // let's stop here, we're good
                                return;
                            }
                            appsReady++;
                        }
                    }
                    if (appsReady < apps.length) {
                        // not all apps are ready yet
                        // add it to the queue to be figured out when they are
                        (win['s-cr'] = win['s-cr'] || []).push([elm, resolve]);
                        return;
                    }
                }
                // not a recognized app component
                resolve(null);
            }
            // callback wasn't provided, let's return a promise
            if (win.Promise) {
                // use native/polyfilled promise
                return new win.Promise(executor);
            }
            // promise may not have been polyfilled yet
            return { then: executor };
        };
    }
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "DesignSystem","design-system",0,"design-system.core.js","es5-build-disabled.js","hydrated","yoo-about,yoo-accordion,yoo-action-sheet,yoo-ag-grid,yoo-alert,yoo-amap,yoo-app,yoo-audio-player,yoo-avatar,yoo-background-blur,yoo-badge,yoo-banner,yoo-barcode,yoo-barcode-dialog,yoo-breadcrumbs,yoo-button,yoo-button-group,yoo-calendar,yoo-camera-preview-dialog,yoo-campaign-editor-recap,yoo-campaign-heading,yoo-card,yoo-card-cell,yoo-card-course,yoo-card-course-row,yoo-card-feed,yoo-card-file,yoo-card-image,yoo-card-lesson,yoo-card-list,yoo-card-media,yoo-card-placeholder,yoo-card-question,yoo-card-sticky,yoo-chart,yoo-chat,yoo-chat-message,yoo-color-selector,yoo-contact-detail,yoo-context-menu,yoo-count-down,yoo-course-detail,yoo-dashboard-detail,yoo-date,yoo-device,yoo-empty-state,yoo-entity,yoo-entity-search,yoo-entity-search-dialog,yoo-entity-search-filters,yoo-entity-search-recent,yoo-entity-search-sorts,yoo-entity-search-tags,yoo-fab-button,yoo-fab-container,yoo-fab-list,yoo-feed-detail,yoo-field-validity,yoo-form-autocomplete,yoo-form-autocomplete-dialog,yoo-form-barcode,yoo-form-barcode-dialog,yoo-form-capture,yoo-form-capture-tag-dialog,yoo-form-capture-view-dialog,yoo-form-capture-webcam-dialog,yoo-form-catalog,yoo-form-catalog-dialog,yoo-form-categorize-words,yoo-form-checkbox,yoo-form-checklist,yoo-form-choice,yoo-form-color-field,yoo-form-color-picker,yoo-form-connect,yoo-form-creator,yoo-form-creator-block-expandable,yoo-form-creator-block-simple,yoo-form-creator-header,yoo-form-creator-page-card,yoo-form-date-time,yoo-form-document,yoo-form-document-dialog,yoo-form-dynamic,yoo-form-dynamic-dialog,yoo-form-dynamic-history-dialog,yoo-form-emailreport,yoo-form-feedback,yoo-form-footer,yoo-form-formula,yoo-form-iframe,yoo-form-image-tagging,yoo-form-input,yoo-form-input-container,yoo-form-input-game,yoo-form-json,yoo-form-location,yoo-form-missing-word,yoo-form-number-picker,yoo-form-number-picker-dialog,yoo-form-product-batch,yoo-form-progress-indicator,yoo-form-radio,yoo-form-radio-group,yoo-form-range,yoo-form-ranking,yoo-form-recap-step,yoo-form-signature-pad,yoo-form-signature-pad-dialog,yoo-form-slider,yoo-form-star-rating,yoo-form-swipe-cards,yoo-form-task,yoo-form-text-area,yoo-form-text-editor,yoo-form-time,yoo-form-timer,yoo-form-todo,yoo-form-todo-dialog,yoo-form-todo-single,yoo-form-toggle,yoo-form-uploader,yoo-form-videoplayer,yoo-from-creator-page-card-list,yoo-grid,yoo-healthscore,yoo-healthscore-dialog,yoo-icon,yoo-img,yoo-info-text,yoo-input-bar,yoo-ion-action-sheet-controller,yoo-ion-alert-controller,yoo-ion-button,yoo-ion-buttons,yoo-ion-content,yoo-ion-footer,yoo-ion-gesture,yoo-ion-gesture-controller,yoo-ion-header,yoo-ion-infinite-scroll,yoo-ion-infinite-scroll-content,yoo-ion-item,yoo-ion-item-divider,yoo-ion-item-options,yoo-ion-item-sliding,yoo-ion-list,yoo-ion-modal,yoo-ion-modal-controller,yoo-ion-refresher,yoo-ion-refresher-content,yoo-ion-scroll,yoo-ion-slide,yoo-ion-slides,yoo-ion-title,yoo-ion-toast-controller,yoo-ion-toolbar,yoo-kpi,yoo-kpi-container,yoo-kpi-external,yoo-language-selector,yoo-lesson-badges,yoo-lesson-detail,yoo-lesson-heading,yoo-lesson-highscores,yoo-lesson-question-result,yoo-loader,yoo-location-heading,yoo-location-info,yoo-location-map,yoo-login,yoo-map,yoo-map-gl,yoo-map-js,yoo-map-legend,yoo-memo-list,yoo-memo-list-dialog,yoo-mission-contents,yoo-mission-detail,yoo-mission-heading,yoo-mission-results,yoo-mission-score,yoo-mission-todo,yoo-mobile-tabbar,yoo-modal,yoo-navbar,yoo-pagination,yoo-photo-editor,yoo-photo-editors,yoo-pivot-table,yoo-podium,yoo-polyglot,yoo-profile,yoo-progress-bar-circle,yoo-progress-bar-core,yoo-progress-bar-line,yoo-progress-bar-semi-circle,yoo-progress-loader,yoo-property-card,yoo-question-detail,yoo-reset-password,yoo-result-dialog,yoo-rete,yoo-scandit,yoo-slider,yoo-slider-scale,yoo-sticky,yoo-swipe-container,yoo-tabs,yoo-tappable,yoo-text-truncate,yoo-tile,yoo-toast,yoo-toolbar,yoo-tooltip,yoo-transition,yoo-user-detail,yoo-user-picker,yoo-user-profile,yoo-walkthrough,yoo-web-menu,yoo-welcome-banner,yoo-zebra,yoo-zoom",HTMLElement.prototype);
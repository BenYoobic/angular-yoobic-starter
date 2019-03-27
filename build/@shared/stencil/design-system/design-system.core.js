/*! Built with http://stenciljs.com */
((w,d,x,n,h,c,r)=>{((s)=>{s&&(r=s.getAttribute('data-resources-url'))})(d.querySelector("script[data-namespace='design-system']"));
/**
 * SSR Attribute Names
 */
const SSR_VNODE_ID = 'ssrv';

/**
 * Default style mode id
 */
const DEFAULT_STYLE_MODE = '$';

/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */ const EMPTY_OBJ = {};

/**
 * Key Name to Key Code Map
 */ const KEY_CODE_MAP = {
  'enter': 13,
  'escape': 27,
  'space': 32,
  'tab': 9,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40
};

function getScopeId(cmpMeta, mode) {
  return 'sc-' + cmpMeta.tagNameMeta + (mode && mode !== DEFAULT_STYLE_MODE ? '-' + mode : '');
}

function getElementScopeId(scopeId, isHostElement) {
  return scopeId + (isHostElement ? '-h' : '-s');
}

function initStyleTemplate(domApi, cmpMeta, encapsulation, style, styleMode, perf) {
  if (style) {
    false;
    // we got a style mode for this component, let's create an id for this style
    const styleModeId = cmpMeta.tagNameMeta + (styleMode || DEFAULT_STYLE_MODE);
    if (!cmpMeta[styleModeId]) {
      // use <template> elements to clone styles
      // create the template element which will hold the styles
      // adding it to the dom via <template> so that we can
      // clone this for each potential shadow root that will need these styles
      // otherwise it'll be cloned and added to document.body.head
      // but that's for the renderer to figure out later
      const templateElm = domApi.$createElement('template');
      // keep a reference to this template element within the
      // Constructor using the style mode id as the key
            cmpMeta[styleModeId] = templateElm;
      {
        // hot module replacement enabled
        // add a style id attribute, but only useful during dev
        const styleContent = [ '<style', ` data-style-tag="${cmpMeta.tagNameMeta}"` ];
        domApi.$setAttribute(templateElm, 'data-tmpl-style-tag', cmpMeta.tagNameMeta), styleMode && (styleContent.push(` data-style-mode="${styleMode}"`), 
        domApi.$setAttribute(templateElm, 'data-tmpl-style-mode', styleMode)), (2 /* ScopedCss */ === encapsulation || 1 /* ShadowDom */ === encapsulation && !domApi.$supportsShadowDom) && (styleContent.push(' data-style-scoped="true"'), 
        domApi.$setAttribute(templateElm, 'data-tmpl-style-scoped', 'true')), styleContent.push('>'), 
        styleContent.push(style), styleContent.push('</style>'), templateElm.innerHTML = styleContent.join('');
      }
      // add our new template element to the head
      // so it can be cloned later
      domApi.$appendChild(domApi.$doc.head, templateElm);
    }
    false;
  }
}

const attachStyles = (plt, domApi, cmpMeta, hostElm) => {
  // first see if we've got a style for a specific mode
  // either this host element should use scoped css
  // or it wants to use shadow dom but the browser doesn't support it
  // create a scope id which is useful for scoped css
  // and add the scope attribute to the host
  // create the style id w/ the host element's mode
  let styleId = cmpMeta.tagNameMeta + DEFAULT_STYLE_MODE;
  let styleTemplate = cmpMeta[styleId];
  // if (true || true) {
    const shouldScopeCss = 2 /* ScopedCss */ === cmpMeta.encapsulationMeta || 1 /* ShadowDom */ === cmpMeta.encapsulationMeta && !plt.domApi.$supportsShadowDom;
  if (shouldScopeCss && (hostElm['s-sc'] = styleTemplate ? getScopeId(cmpMeta, hostElm.mode) : getScopeId(cmpMeta)), 
  styleTemplate) {
    // cool, we found a style template element for this component
    let styleContainerNode = domApi.$doc.head;
    // if this browser supports shadow dom, then let's climb up
    // the dom and see if we're within a shadow dom
        if (domApi.$supportsShadowDom) if (1 /* ShadowDom */ === cmpMeta.encapsulationMeta) 
    // we already know we're in a shadow dom
    // so shadow root is the container for these styles
    styleContainerNode = hostElm.shadowRoot; else {
      // climb up the dom and see if we're in a shadow dom
      const rootEl = hostElm.getRootNode();
      rootEl.host && (styleContainerNode = rootEl);
    }
    // if this container element already has these styles
    // then there's no need to apply them again
    // create an object to keep track if we'ready applied this component style
        let appliedStyles = plt.componentAppliedStyles.get(styleContainerNode);
    // check if we haven't applied these styles to this container yet
    if (appliedStyles || plt.componentAppliedStyles.set(styleContainerNode, appliedStyles = {}), 
    !appliedStyles[styleId]) {
      let styleElm;
      {
        // this browser supports the <template> element
        // and all its native content.cloneNode() goodness
        // clone the template element to create a new <style> element
        styleElm = styleTemplate.content.cloneNode(true), 
        // remember we don't need to do this again for this element
        appliedStyles[styleId] = true;
        // let's make sure we put the styles below the <style data-styles> element
        // so any visibility css overrides the default
        const dataStyles = styleContainerNode.querySelectorAll('[data-styles]');
        domApi.$insertBefore(styleContainerNode, styleElm, dataStyles.length && dataStyles[dataStyles.length - 1].nextSibling || styleContainerNode.firstChild);
      }
    }
  }
};

const isDef = v => null != v;

const toLowerCase = str => str.toLowerCase();

const dashToPascalCase = str => toLowerCase(str).split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join('');

const noop = () => {};

const updateAttribute = (elm, memberName, newValue, isBooleanAttr = 'boolean' === typeof newValue, isXlinkNs) => {
  isXlinkNs = memberName !== (memberName = memberName.replace(/^xlink\:?/, '')), null == newValue || isBooleanAttr && (!newValue || 'false' === newValue) ? isXlinkNs ? elm.removeAttributeNS(XLINK_NS, toLowerCase(memberName)) : elm.removeAttribute(memberName) : 'function' !== typeof newValue && (newValue = isBooleanAttr ? '' : newValue.toString(), 
  isXlinkNs ? elm.setAttributeNS(XLINK_NS, toLowerCase(memberName), newValue) : elm.setAttribute(memberName, newValue));
};

const XLINK_NS = 'http://www.w3.org/1999/xlink';

const setAccessor = (plt, elm, memberName, oldValue, newValue, isSvg, isHostElement) => {
  if ('class' !== memberName || isSvg) if ('style' === memberName) {
    for (const prop in oldValue) newValue && null != newValue[prop] || (/-/.test(prop) ? elm.style.removeProperty(prop) : elm.style[prop] = '');
    for (const prop in newValue) oldValue && newValue[prop] === oldValue[prop] || (/-/.test(prop) ? elm.style.setProperty(prop, newValue[prop]) : elm.style[prop] = newValue[prop]);
  } else if ('o' !== memberName[0] || 'n' !== memberName[1] || !/[A-Z]/.test(memberName[2]) || memberName in elm) if ('list' !== memberName && 'type' !== memberName && !isSvg && (memberName in elm || -1 !== [ 'object', 'function' ].indexOf(typeof newValue) && null !== newValue) || false) {
    // Properties
    // - list and type are attributes that get applied as values on the element
    // - all svgs get values as attributes not props
    // - check if elm contains name or if the value is array, object, or function
    const cmpMeta = plt.getComponentMeta(elm);
    cmpMeta && cmpMeta.membersMeta && cmpMeta.membersMeta[memberName] ? (
    // we know for a fact that this element is a known component
    // and this component has this member name as a property,
    // let's set the known @Prop on this element
    // set it directly as property on the element
    setProperty(elm, memberName, newValue), isHostElement && cmpMeta.membersMeta[memberName].reflectToAttrib && 
    // we also want to set this data to the attribute
    updateAttribute(elm, cmpMeta.membersMeta[memberName].attribName, newValue, 4 /* Boolean */ === cmpMeta.membersMeta[memberName].propType)) : 'ref' !== memberName && (
    // this member name is a property on this element, but it's not a component
    // this is a native property like "value" or something
    // also we can ignore the "ref" member name at this point
    setProperty(elm, memberName, null == newValue ? '' : newValue), null != newValue && false !== newValue || plt.domApi.$removeAttribute(elm, memberName));
  } else null != newValue && 'key' !== memberName ? ('htmlfor' === memberName && console.error(`Attribute "htmlfor" set on ${elm.tagName.toLowerCase()}, with the lower case "f" must be replaced with a "htmlFor" (capital "F")`), 
  // Element Attributes
  updateAttribute(elm, memberName, newValue)) : (isSvg || plt.domApi.$hasAttribute(elm, memberName) && (null == newValue || false === newValue)) && 
  // remove svg attribute
  plt.domApi.$removeAttribute(elm, memberName); else 
  // Event Handlers
  // so if the member name starts with "on" and the 3rd characters is
  // a capital letter, and it's not already a member on the element,
  // then we're assuming it's an event listener
  // standard event
  // the JSX attribute could have been "onMouseOver" and the
  // member name "onmouseover" is on the element's prototype
  // so let's add the listener "mouseover", which is all lowercased
  memberName = toLowerCase(memberName) in elm ? toLowerCase(memberName.substring(2)) : toLowerCase(memberName[2]) + memberName.substring(3), 
  newValue ? newValue !== oldValue && 
  // add listener
  plt.domApi.$addEventListener(elm, memberName, newValue, 0) : 
  // remove listener
  plt.domApi.$removeEventListener(elm, memberName, 0); else if (oldValue !== newValue) {
    const oldList = parseClassList(oldValue);
    const newList = parseClassList(newValue);
    // remove classes in oldList, not included in newList
        const toRemove = oldList.filter(item => !newList.includes(item));
    const classList = parseClassList(elm.className).filter(item => !toRemove.includes(item));
    // add classes from newValue that are not in oldList or classList
        const toAdd = newList.filter(item => !oldList.includes(item) && !classList.includes(item));
    classList.push(...toAdd), elm.className = classList.join(' ');
  }
};

const parseClassList = value => null == value || '' === value ? [] : value.trim().split(/\s+/);

/**
 * Attempt to set a DOM property to the given value.
 * IE & FF throw for certain property-value combinations.
 */ const setProperty = (elm, name, value) => {
  try {
    elm[name] = value;
  } catch (e) {}
};

const updateElement = (plt, oldVnode, newVnode, isSvgMode, memberName) => {
  // if the element passed in is a shadow root, which is a document fragment
  // then we want to be adding attrs/props to the shadow root's "host" element
  // if it's not a shadow root, then we add attrs/props to the same element
  const elm = 11 /* DocumentFragment */ === newVnode.elm.nodeType && newVnode.elm.host ? newVnode.elm.host : newVnode.elm;
  const oldVnodeAttrs = oldVnode && oldVnode.vattrs || EMPTY_OBJ;
  const newVnodeAttrs = newVnode.vattrs || EMPTY_OBJ;
  // remove attributes no longer present on the vnode by setting them to undefined
  for (memberName in oldVnodeAttrs) newVnodeAttrs && null != newVnodeAttrs[memberName] || null == oldVnodeAttrs[memberName] || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode, newVnode.ishost);
  // add new & update changed attributes
  for (memberName in newVnodeAttrs) memberName in oldVnodeAttrs && newVnodeAttrs[memberName] === ('value' === memberName || 'checked' === memberName ? elm[memberName] : oldVnodeAttrs[memberName]) || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.ishost);
};

let isSvgMode = false;

const createRendererPatch = (plt, domApi) => {
  // createRenderer() is only created once per app
  // the patch() function which createRenderer() returned is the function
  // which gets called numerous times by each component
  // internal variables to be reused per patch() call
  let useNativeShadowDom, scopeId, checkSlotFallbackVisibility, checkSlotRelocate, contentRef, hostTagName, hostElm;
  const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm, i, elm, childNode, newVNode, oldVNode) => {
    if (newVNode = newParentVNode.vchildren[childIndex], useNativeShadowDom || (
    // remember for later we need to check to relocate nodes
    checkSlotRelocate = true, 'slot' === newVNode.vtag && (scopeId && 
    // scoped css needs to add its scoped id to the parent element
    domApi.$addClass(parentElm, scopeId + '-s'), newVNode.vchildren ? 
    // slot element has fallback content
    // still create an element that "mocks" the slot element
    newVNode.isSlotFallback = true : 
    // slot element does not have fallback content
    // create an html comment we'll use to always reference
    // where actual slot content should sit next to
    newVNode.isSlotReference = true)), isDef(newVNode.vtext)) 
    // create text node
    newVNode.elm = domApi.$createTextNode(newVNode.vtext); else if (newVNode.isSlotReference) 
    // create a slot reference html text node
    newVNode.elm = domApi.$createTextNode(''); else {
      if (
      // create element
      elm = newVNode.elm = isSvgMode || 'svg' === newVNode.vtag ? domApi.$createElementNS('http://www.w3.org/2000/svg', newVNode.vtag) : domApi.$createElement(newVNode.isSlotFallback ? 'slot-fb' : newVNode.vtag), 
      plt.isDefinedComponent(elm) && plt.isCmpReady.delete(hostElm), isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode, 
      // add css classes, attrs, props, listeners, etc.
      updateElement(plt, null, newVNode, isSvgMode), isDef(scopeId) && elm['s-si'] !== scopeId && 
      // if there is a scopeId and this is the initial render
      // then let's add the scopeId as an attribute
      domApi.$addClass(elm, elm['s-si'] = scopeId), newVNode.vchildren) for (i = 0; i < newVNode.vchildren.length; ++i) 
      // create the node
      childNode = createElm(oldParentVNode, newVNode, i, elm), 
      // return node could have been null
      childNode && 
      // append our new node
      domApi.$appendChild(elm, childNode);
      'svg' === newVNode.vtag && (
      // Only reset the SVG context when we're exiting SVG element
      isSvgMode = false);
    }
    return newVNode.elm['s-hn'] = hostTagName, (newVNode.isSlotFallback || newVNode.isSlotReference) && (
    // remember the content reference comment
    newVNode.elm['s-sr'] = true, 
    // remember the content reference comment
    newVNode.elm['s-cr'] = contentRef, 
    // remember the slot name, or empty string for default slot
    newVNode.elm['s-sn'] = newVNode.vname || '', 
    // check if we've got an old vnode for this slot
    oldVNode = oldParentVNode && oldParentVNode.vchildren && oldParentVNode.vchildren[childIndex], 
    oldVNode && oldVNode.vtag === newVNode.vtag && oldParentVNode.elm && 
    // we've got an old slot vnode and the wrapper is being replaced
    // so let's move the old slot content back to it's original location
    putBackInOriginalLocation(oldParentVNode.elm)), newVNode.elm;
  };
  const putBackInOriginalLocation = (parentElm, recursive, i, childNode) => {
    plt.tmpDisconnected = true;
    const oldSlotChildNodes = domApi.$childNodes(parentElm);
    for (i = oldSlotChildNodes.length - 1; i >= 0; i--) childNode = oldSlotChildNodes[i], 
    childNode['s-hn'] !== hostTagName && childNode['s-ol'] && (
    // this child node in the old element is from another component
    // remove this node from the old slot's parent
    domApi.$remove(childNode), 
    // and relocate it back to it's original location
    domApi.$insertBefore(parentReferenceNode(childNode), childNode, referenceNode(childNode)), 
    // remove the old original location comment entirely
    // later on the patch function will know what to do
    // and move this to the correct spot in need be
    domApi.$remove(childNode['s-ol']), childNode['s-ol'] = null, checkSlotRelocate = true), 
    recursive && putBackInOriginalLocation(childNode, recursive);
    plt.tmpDisconnected = false;
  };
  const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx, containerElm, childNode) => {
    const contentRef = parentElm['s-cr'];
    for (containerElm = contentRef && domApi.$parentNode(contentRef) || parentElm, containerElm.shadowRoot && domApi.$tagName(containerElm) === hostTagName && (containerElm = containerElm.shadowRoot); startIdx <= endIdx; ++startIdx) vnodes[startIdx] && (childNode = isDef(vnodes[startIdx].vtext) ? domApi.$createTextNode(vnodes[startIdx].vtext) : createElm(null, parentVNode, startIdx, parentElm), 
    childNode && (vnodes[startIdx].elm = childNode, domApi.$insertBefore(containerElm, childNode, referenceNode(before))));
  };
  const removeVnodes = (vnodes, startIdx, endIdx, node) => {
    for (;startIdx <= endIdx; ++startIdx) isDef(vnodes[startIdx]) && (node = vnodes[startIdx].elm, 
    // we're removing this element
    // so it's possible we need to show slot fallback content now
    checkSlotFallbackVisibility = true, node['s-ol'] ? 
    // remove the original location comment
    domApi.$remove(node['s-ol']) : 
    // it's possible that child nodes of the node
    // that's being removed are slot nodes
    putBackInOriginalLocation(node, true), 
    // remove the vnode's element from the dom
    domApi.$remove(node));
  };
  const isSameVnode = (vnode1, vnode2) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (vnode1.vtag === vnode2.vtag && vnode1.vkey === vnode2.vkey) {
      if ('slot' === vnode1.vtag) return vnode1.vname === vnode2.vname;
      return true;
    }
    return false;
  };
  const referenceNode = node => {
    if (node && node['s-ol']) 
    // this node was relocated to a new location in the dom
    // because of some other component's slot
    // but we still have an html comment in place of where
    // it's original location was according to it's original vdom
    return node['s-ol'];
    return node;
  };
  const parentReferenceNode = node => {
    return domApi.$parentNode(node['s-ol'] ? node['s-ol'] : node);
  };
  const patchVNode = (oldVNode, newVNode, defaultHolder) => {
    const elm = newVNode.elm = oldVNode.elm;
    const oldChildren = oldVNode.vchildren;
    const newChildren = newVNode.vchildren;
    // test if we're rendering an svg element, or still rendering nodes inside of one
    // only add this to the when the compiler sees we're using an svg somewhere
    isSvgMode = newVNode.elm && isDef(domApi.$parentElement(newVNode.elm)) && void 0 !== newVNode.elm.ownerSVGElement, 
    isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode, 
    isDef(newVNode.vtext) ? (defaultHolder = elm['s-cr']) ? 
    // this element has slotted content
    domApi.$setTextContent(domApi.$parentNode(defaultHolder), newVNode.vtext) : oldVNode.vtext !== newVNode.vtext && 
    // update the text content for the text only vnode
    // and also only if the text is different than before
    domApi.$setTextContent(elm, newVNode.vtext) : (
    // element node
    'slot' !== newVNode.vtag && 
    // either this is the first render of an element OR it's an update
    // AND we already know it's possible it could have changed
    // this updates the element's css classes, attrs, props, listeners, etc.
    updateElement(plt, oldVNode, newVNode, isSvgMode), isDef(oldChildren) && isDef(newChildren) ? 
    // looks like there's child vnodes for both the old and new vnodes
    ((parentElm, oldCh, newVNode, newCh, idxInOld, i, node, elmToMove) => {
      let oldStartIdx = 0, newStartIdx = 0;
      let oldEndIdx = oldCh.length - 1;
      let oldStartVnode = oldCh[0];
      let oldEndVnode = oldCh[oldEndIdx];
      let newEndIdx = newCh.length - 1;
      let newStartVnode = newCh[0];
      let newEndVnode = newCh[newEndIdx];
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) if (null == oldStartVnode) 
      // Vnode might have been moved left
      oldStartVnode = oldCh[++oldStartIdx]; else if (null == oldEndVnode) oldEndVnode = oldCh[--oldEndIdx]; else if (null == newStartVnode) newStartVnode = newCh[++newStartIdx]; else if (null == newEndVnode) newEndVnode = newCh[--newEndIdx]; else if (isSameVnode(oldStartVnode, newStartVnode)) patchVNode(oldStartVnode, newStartVnode), 
      oldStartVnode = oldCh[++oldStartIdx], newStartVnode = newCh[++newStartIdx]; else if (isSameVnode(oldEndVnode, newEndVnode)) patchVNode(oldEndVnode, newEndVnode), 
      oldEndVnode = oldCh[--oldEndIdx], newEndVnode = newCh[--newEndIdx]; else if (isSameVnode(oldStartVnode, newEndVnode)) 
      // Vnode moved right
      'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldStartVnode.elm)), 
      patchVNode(oldStartVnode, newEndVnode), domApi.$insertBefore(parentElm, oldStartVnode.elm, domApi.$nextSibling(oldEndVnode.elm)), 
      oldStartVnode = oldCh[++oldStartIdx], newEndVnode = newCh[--newEndIdx]; else if (isSameVnode(oldEndVnode, newStartVnode)) 
      // Vnode moved left
      'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldEndVnode.elm)), 
      patchVNode(oldEndVnode, newStartVnode), domApi.$insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm), 
      oldEndVnode = oldCh[--oldEndIdx], newStartVnode = newCh[++newStartIdx]; else {
        for (
        // createKeyToOldIdx
        idxInOld = null, i = oldStartIdx; i <= oldEndIdx; ++i) if (oldCh[i] && isDef(oldCh[i].vkey) && oldCh[i].vkey === newStartVnode.vkey) {
          idxInOld = i;
          break;
        }
        isDef(idxInOld) ? (elmToMove = oldCh[idxInOld], elmToMove.vtag !== newStartVnode.vtag ? node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm) : (patchVNode(elmToMove, newStartVnode), 
        oldCh[idxInOld] = void 0, node = elmToMove.elm), newStartVnode = newCh[++newStartIdx]) : (
        // new element
        node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm), 
        newStartVnode = newCh[++newStartIdx]), node && domApi.$insertBefore(parentReferenceNode(oldStartVnode.elm), node, referenceNode(oldStartVnode.elm));
      }
      oldStartIdx > oldEndIdx ? addVnodes(parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].elm, newVNode, newCh, newStartIdx, newEndIdx) : newStartIdx > newEndIdx && removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    })(elm, oldChildren, newVNode, newChildren) : isDef(newChildren) ? (
    // no old child vnodes, but there are new child vnodes to add
    isDef(oldVNode.vtext) && 
    // the old vnode was text, so be sure to clear it out
    domApi.$setTextContent(elm, ''), 
    // add the new vnode children
    addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1)) : isDef(oldChildren) && 
    // no new child vnodes, but there are old child vnodes to remove
    removeVnodes(oldChildren, 0, oldChildren.length - 1)), 
    // reset svgMode when svg node is fully patched
    isSvgMode && 'svg' === newVNode.vtag && (isSvgMode = false);
  };
  const updateFallbackSlotVisibility = (elm, childNode, childNodes, i, ilen, j, slotNameAttr, nodeType) => {
    for (childNodes = domApi.$childNodes(elm), i = 0, ilen = childNodes.length; i < ilen; i++) if (childNode = childNodes[i], 
    1 /* ElementNode */ === domApi.$nodeType(childNode)) {
      if (childNode['s-sr']) for (
      // this is a slot fallback node
      // get the slot name for this slot reference node
      slotNameAttr = childNode['s-sn'], 
      // by default always show a fallback slot node
      // then hide it if there are other slots in the light dom
      childNode.hidden = false, j = 0; j < ilen; j++) if (childNodes[j]['s-hn'] !== childNode['s-hn']) if (
      // this sibling node is from a different component
      nodeType = domApi.$nodeType(childNodes[j]), '' !== slotNameAttr) {
        // this is a named fallback slot node
        if (1 /* ElementNode */ === nodeType && slotNameAttr === domApi.$getAttribute(childNodes[j], 'slot')) {
          childNode.hidden = true;
          break;
        }
      } else 
      // this is a default fallback slot node
      // any element or text node (with content)
      // should hide the default fallback slot node
      if (1 /* ElementNode */ === nodeType || 3 /* TextNode */ === nodeType && '' !== domApi.$getTextContent(childNodes[j]).trim()) {
        childNode.hidden = true;
        break;
      }
      // keep drilling down
            updateFallbackSlotVisibility(childNode);
    }
  };
  const relocateNodes = [];
  const relocateSlotContent = (elm, childNodes, childNode, node, i, ilen, j, hostContentNodes, slotNameAttr, nodeType) => {
    for (childNodes = domApi.$childNodes(elm), i = 0, ilen = childNodes.length; i < ilen; i++) {
      if (childNode = childNodes[i], childNode['s-sr'] && (node = childNode['s-cr'])) for (
      // first got the content reference comment node
      // then we got it's parent, which is where all the host content is in now
      hostContentNodes = domApi.$childNodes(domApi.$parentNode(node)), slotNameAttr = childNode['s-sn'], 
      j = hostContentNodes.length - 1; j >= 0; j--) node = hostContentNodes[j], node['s-cn'] || node['s-nr'] || node['s-hn'] === childNode['s-hn'] || (
      // let's do some relocating to its new home
      // but never relocate a content reference node
      // that is suppose to always represent the original content location
      nodeType = domApi.$nodeType(node), ((3 /* TextNode */ === nodeType || 8 /* CommentNode */ === nodeType) && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && null === domApi.$getAttribute(node, 'slot') && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && domApi.$getAttribute(node, 'slot') === slotNameAttr) && (
      // it's possible we've already decided to relocate this node
      relocateNodes.some(r => r.nodeToRelocate === node) || (
      // made some changes to slots
      // let's make sure we also double check
      // fallbacks are correctly hidden or shown
      checkSlotFallbackVisibility = true, node['s-sn'] = slotNameAttr, 
      // add to our list of nodes to relocate
      relocateNodes.push({
        slotRefNode: childNode,
        nodeToRelocate: node
      }))));
      1 /* ElementNode */ === domApi.$nodeType(childNode) && relocateSlotContent(childNode);
    }
  };
  return (hostElement, oldVNode, newVNode, useNativeShadowDomVal, encapsulation, ssrPatchId, i, relocateNode, orgLocationNode, refNode, parentNodeRef, insertBeforeNode) => {
    if (
    // patchVNode() is synchronous
    // so it is safe to set these variables and internally
    // the same patch() call will reference the same data
    hostElm = hostElement, hostTagName = domApi.$tagName(hostElm), contentRef = hostElm['s-cr'], 
    useNativeShadowDom = useNativeShadowDomVal, 
    // get the scopeId
    scopeId = hostElm['s-sc'], 
    // always reset
    checkSlotRelocate = checkSlotFallbackVisibility = false, 
    // synchronous patch
    patchVNode(oldVNode, newVNode), checkSlotRelocate) {
      for (relocateSlotContent(newVNode.elm), i = 0; i < relocateNodes.length; i++) relocateNode = relocateNodes[i], 
      relocateNode.nodeToRelocate['s-ol'] || (
      // add a reference node marking this node's original location
      // keep a reference to this node for later lookups
      orgLocationNode = domApi.$createTextNode(''), orgLocationNode['s-nr'] = relocateNode.nodeToRelocate, 
      domApi.$insertBefore(domApi.$parentNode(relocateNode.nodeToRelocate), relocateNode.nodeToRelocate['s-ol'] = orgLocationNode, relocateNode.nodeToRelocate));
      // while we're moving nodes around existing nodes, temporarily disable
      // the disconnectCallback from working
            for (plt.tmpDisconnected = true, i = 0; i < relocateNodes.length; i++) {
        relocateNode = relocateNodes[i], 
        // by default we're just going to insert it directly
        // after the slot reference node
        parentNodeRef = domApi.$parentNode(relocateNode.slotRefNode), insertBeforeNode = domApi.$nextSibling(relocateNode.slotRefNode), 
        orgLocationNode = relocateNode.nodeToRelocate['s-ol'];
        while (orgLocationNode = domApi.$previousSibling(orgLocationNode)) if ((refNode = orgLocationNode['s-nr']) && refNode && refNode['s-sn'] === relocateNode.nodeToRelocate['s-sn'] && parentNodeRef === domApi.$parentNode(refNode) && (refNode = domApi.$nextSibling(refNode)) && refNode && !refNode['s-nr']) {
          insertBeforeNode = refNode;
          break;
        }
        (!insertBeforeNode && parentNodeRef !== domApi.$parentNode(relocateNode.nodeToRelocate) || domApi.$nextSibling(relocateNode.nodeToRelocate) !== insertBeforeNode) && relocateNode.nodeToRelocate !== insertBeforeNode && (
        // remove the node from the dom
        domApi.$remove(relocateNode.nodeToRelocate), 
        // add it back to the dom but in its new home
        domApi.$insertBefore(parentNodeRef, relocateNode.nodeToRelocate, insertBeforeNode));
      }
      // done moving nodes around
      // allow the disconnect callback to work again
            plt.tmpDisconnected = false;
    }
    // return our new vnode
    return checkSlotFallbackVisibility && updateFallbackSlotVisibility(newVNode.elm), 
    // always reset
    relocateNodes.length = 0, newVNode;
  };
};

const callNodeRefs = (vNode, isDestroy) => {
  vNode && (vNode.vattrs && vNode.vattrs.ref && vNode.vattrs.ref(isDestroy ? null : vNode.elm), 
  vNode.vchildren && vNode.vchildren.forEach(vChild => {
    callNodeRefs(vChild, isDestroy);
  }));
};

const createQueueClient = (App, win) => {
  {
    let congestion = 0;
    let rafPending = false;
    const now = () => win.performance.now();
    const async = false !== App.asyncQueue;
    const resolved = Promise.resolve();
    const highPriority = [];
    const domReads = [];
    const domWrites = [];
    const domWritesLow = [];
    const queueTask = queue => cb => {
      // queue dom reads
      queue.push(cb), rafPending || (rafPending = true, App.raf(flush));
    };
    const consume = queue => {
      for (let i = 0; i < queue.length; i++) try {
        queue[i](now());
      } catch (e) {
        console.error(e);
      }
      queue.length = 0;
    };
    const consumeTimeout = (queue, timeout) => {
      let i = 0;
      let ts;
      while (i < queue.length && (ts = now()) < timeout) try {
        queue[i++](ts);
      } catch (e) {
        console.error(e);
      }
      i === queue.length ? queue.length = 0 : 0 !== i && queue.splice(0, i);
    };
    const flush = () => {
      congestion++, 
      // always force a bunch of medium callbacks to run, but still have
      // a throttle on how many can run in a certain time
      // DOM READS!!!
      consume(domReads);
      const timeout = async ? now() + 7 * Math.ceil(congestion * (1 / 22)) : Infinity;
      // DOM WRITES!!!
            consumeTimeout(domWrites, timeout), consumeTimeout(domWritesLow, timeout), 
      domWrites.length > 0 && (domWritesLow.push(...domWrites), domWrites.length = 0), 
      (rafPending = domReads.length + domWrites.length + domWritesLow.length > 0) ? 
      // still more to do yet, but we've run out of time
      // let's let this thing cool off and try again in the next tick
      App.raf(flush) : congestion = 0;
    };
    return App.raf || (App.raf = win.requestAnimationFrame.bind(win)), {
      tick(cb) {
        // queue high priority work to happen in next tick
        // uses Promise.resolve() for next tick
        highPriority.push(cb), 1 === highPriority.length && resolved.then(() => consume(highPriority));
      },
      read: queueTask(domReads),
      write: queueTask(domWrites)
    };
  }
};

function initElementListeners(plt, elm) {
  // so the element was just connected, which means it's in the DOM
  // however, the component instance hasn't been created yet
  // but what if an event it should be listening to get emitted right now??
  // let's add our listeners right now to our element, and if it happens
  // to receive events between now and the instance being created let's
  // queue up all of the event data and fire it off on the instance when it's ready
  const cmpMeta = plt.getComponentMeta(elm);
  cmpMeta.listenersMeta && 
  // we've got listens
  cmpMeta.listenersMeta.forEach(listenMeta => {
    // go through each listener
    listenMeta.eventDisabled || 
    // only add ones that are not already disabled
    plt.domApi.$addEventListener(elm, listenMeta.eventName, function createListenerCallback(plt, elm, eventMethodName, val) {
      // create the function that gets called when the element receives
      // an event which it should be listening for
      return ev => {
        // get the instance if it exists
        val = plt.instanceMap.get(elm), val ? 
        // instance is ready, let's call it's member method for this event
        val[eventMethodName](ev) : (
        // instance is not ready!!
        // let's queue up this event data and replay it later
        // when the instance is ready
        val = plt.queuedEvents.get(elm) || [], val.push(eventMethodName, ev), plt.queuedEvents.set(elm, val));
      };
    }(plt, elm, listenMeta.eventMethodName), 1, listenMeta.eventCapture, listenMeta.eventPassive);
  });
}

function generateDevInspector(namespace, win, plt, components) {
  const devInspector = win.devInspector = win.devInspector || {};
  return devInspector.apps = devInspector.apps || [], devInspector.apps.push(function generateDevInspectorApp(namespace, plt, components) {
    const app = {
      namespace,
      getInstance: elm => {
        if (elm && elm.tagName) return Promise.all([ getComponentMeta(plt, elm.tagName), getComponentInstance(plt, elm) ]).then(results => {
          if (results[0] && results[1]) {
            const cmp = {
              meta: results[0],
              instance: results[1]
            };
            return cmp;
          }
          return null;
        });
        return Promise.resolve(null);
      },
      getComponent: tagName => {
        return getComponentMeta(plt, tagName);
      },
      getComponents: () => {
        return Promise.all(components.map(cmp => {
          return getComponentMeta(plt, cmp[0]);
        })).then(metadata => {
          return metadata.filter(m => m);
        });
      }
    };
    return app;
  }(namespace, plt, components)), devInspector.getInstance || (devInspector.getInstance = (elm => {
    return Promise.all(devInspector.apps.map(app => {
      return app.getInstance(elm);
    })).then(results => {
      return results.find(instance => !!instance);
    });
  })), devInspector.getComponents || (devInspector.getComponents = (() => {
    const appsMetadata = [];
    return devInspector.apps.forEach(app => {
      appsMetadata.push(app.getComponents());
    }), Promise.all(appsMetadata).then(appMetadata => {
      const allMetadata = [];
      return appMetadata.forEach(metadata => {
        metadata.forEach(m => {
          allMetadata.push(m);
        });
      }), allMetadata;
    });
  })), devInspector;
}

function getComponentMeta(plt, tagName) {
  const elm = {
    nodeName: tagName
  };
  const internalMeta = plt.getComponentMeta(elm);
  if (!internalMeta || !internalMeta.componentConstructor) return Promise.resolve(null);
  const cmpCtr = internalMeta.componentConstructor;
  const members = function getMembersMeta(properties) {
    return Object.keys(properties).reduce((membersMap, memberKey) => {
      const prop = properties[memberKey];
      let category;
      const member = {
        name: memberKey
      };
      if (prop.state) category = 'states', member.watchers = prop.watchCallbacks || []; else if (prop.elementRef) category = 'elements'; else if (prop.method) category = 'methods'; else {
        category = 'props';
        let type = 'any';
        prop.type && (type = prop.type, 'function' === typeof prop.type && (type = prop.type.name)), 
        member.type = type.toLowerCase(), member.mutable = prop.mutable || false, member.connect = prop.connect || '-', 
        member.context = prop.connect || '-', member.watchers = prop.watchCallbacks || [];
      }
      return membersMap[category].push(member), membersMap;
    }, {
      props: [],
      states: [],
      elements: [],
      methods: []
    });
  }(cmpCtr.properties || {});
  const listeners = (internalMeta.listenersMeta || []).map(listenerMeta => {
    return {
      event: listenerMeta.eventName,
      capture: listenerMeta.eventCapture,
      disabled: listenerMeta.eventDisabled,
      passive: listenerMeta.eventPassive,
      method: listenerMeta.eventMethodName
    };
  });
  const emmiters = cmpCtr.events || [];
  const meta = Object.assign({
    tag: cmpCtr.is,
    bundle: internalMeta.bundleIds || 'unknown',
    encapsulation: cmpCtr.encapsulation || 'none'
  }, members, {
    events: {
      emmiters,
      listeners
    }
  });
  return Promise.resolve(meta);
}

function getComponentInstance(plt, elm) {
  return Promise.resolve(plt.instanceMap.get(elm));
}

/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */ const stack = [];

function h$1(nodeName, vnodeData) {
  let children = null;
  let lastSimple = false;
  let simple = false;
  let i = arguments.length;
  let vkey;
  let vname;
  for (;i-- > 2; ) stack.push(arguments[i]);
  while (stack.length > 0) {
    let child = stack.pop();
    if (child && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else 'boolean' === typeof child && (child = null), 
    (simple = 'function' !== typeof nodeName) && (null == child ? child = '' : 'number' === typeof child ? child = String(child) : 'string' !== typeof child && (simple = false)), 
    simple && lastSimple ? children[children.length - 1].vtext += child : null === children ? children = [ simple ? {
      vtext: child
    } : child ] : children.push(simple ? {
      vtext: child
    } : child), lastSimple = simple;
  }
  if (null != vnodeData) {
    if (
    // normalize class / classname attributes
    vnodeData.className && (vnodeData.class = vnodeData.className), 'object' === typeof vnodeData.class) {
      for (i in vnodeData.class) vnodeData.class[i] && stack.push(i);
      vnodeData.class = stack.join(' '), stack.length = 0;
    }
    null != vnodeData.key && (vkey = vnodeData.key), null != vnodeData.name && (vname = vnodeData.name);
  }
  if ('function' === typeof nodeName) 
  // nodeName is a functional component
  return nodeName(vnodeData, children || [], utils);
  return {
    vtag: nodeName,
    vchildren: children,
    vtext: void 0,
    vattrs: vnodeData,
    vkey,
    vname,
    elm: void 0,
    ishost: false
  };
}

const utils = {
  'forEach': (children, cb) => children.forEach(cb),
  'map': (children, cb) => children.map(cb)
};

const initHostSnapshot = (domApi, cmpMeta, hostElm, hostSnapshot, attribName) => {
  if (
  // the host element has connected to the dom
  // and we've waited a tick to make sure all frameworks
  // have finished adding attributes and child nodes to the host
  // before we go all out and hydrate this beast
  // let's first take a snapshot of its original layout before render
  hostElm.mode || (
  // looks like mode wasn't set as a property directly yet
  // first check if there's an attribute
  // next check the app's global
  hostElm.mode = domApi.$getMode(hostElm)), 
  // if the slot polyfill is required we'll need to put some nodes
  // in here to act as original content anchors as we move nodes around
  // host element has been connected to the DOM
  hostElm['s-cr'] || domApi.$getAttribute(hostElm, SSR_VNODE_ID) || domApi.$supportsShadowDom && 1 /* ShadowDom */ === cmpMeta.encapsulationMeta || (
  // only required when we're NOT using native shadow dom (slot)
  // or this browser doesn't support native shadow dom
  // and this host element was NOT created with SSR
  // let's pick out the inner content for slot projection
  // create a node to represent where the original
  // content was first placed, which is useful later on
  hostElm['s-cr'] = domApi.$createTextNode(''), hostElm['s-cr']['s-cn'] = true, domApi.$insertBefore(hostElm, hostElm['s-cr'], domApi.$childNodes(hostElm)[0])), 
  !domApi.$supportsShadowDom && 1 /* ShadowDom */ === cmpMeta.encapsulationMeta) 
  // this component should use shadow dom
  // but this browser doesn't support it
  // so let's polyfill a few things for the user
  try {
    !window.HTMLElement || 'shadowRoot' in window.HTMLElement.prototype || (hostElm.shadowRoot = hostElm);
  } catch (e) {}
  return 1 /* ShadowDom */ === cmpMeta.encapsulationMeta && domApi.$supportsShadowDom && !hostElm.shadowRoot && 
  // this component is using shadow dom
  // and this browser supports shadow dom
  // add the read-only property "shadowRoot" to the host element
  domApi.$attachShadow(hostElm, {
    mode: 'open'
  }), 
  // create a host snapshot object we'll
  // use to store all host data about to be read later
  hostSnapshot = {
    $attributes: {}
  }, 
  // loop through and gather up all the original attributes on the host
  // this is useful later when we're creating the component instance
  cmpMeta.membersMeta && Object.keys(cmpMeta.membersMeta).forEach(memberName => {
    (attribName = cmpMeta.membersMeta[memberName].attribName) && (hostSnapshot.$attributes[attribName] = domApi.$getAttribute(hostElm, attribName));
  }), hostSnapshot;
};

const registerWithParentComponent = (plt, elm, ancestorHostElement) => {
  // find the first ancestor host element (if there is one) and register
  // this element as one of the actively loading child elements for its ancestor
  ancestorHostElement = elm;
  while (ancestorHostElement = plt.domApi.$parentElement(ancestorHostElement)) 
  // climb up the ancestors looking for the first registered component
  if (plt.isDefinedComponent(ancestorHostElement)) {
    // we found this elements the first ancestor host element
    // if the ancestor already loaded then do nothing, it's too late
    plt.isCmpReady.has(elm) || (
    // keep a reference to this element's ancestor host element
    // elm._ancestorHostElement = ancestorHostElement;
    plt.ancestorHostElementMap.set(elm, ancestorHostElement), 
    // ensure there is an array to contain a reference to each of the child elements
    // and set this element as one of the ancestor's child elements it should wait on
    (ancestorHostElement['s-ld'] = ancestorHostElement['s-ld'] || []).push(elm));
    break;
  }
};

const parseComponentLoader = (cmpRegistryData, i, cmpData) => {
  // tag name will always be lower case
  // parse member meta
  // this data only includes props that are attributes that need to be observed
  // it does not include all of the props yet
  const [tagNameMeta, bundleIds, , memberData, encapsulationMeta, listenerMeta] = cmpRegistryData;
  const membersMeta = {
    // every component defaults to always have
    // the mode and color properties
    // but only color should observe any attribute changes
    'color': {
      attribName: 'color'
    }
  };
  if (memberData) for (i = 0; i < memberData.length; i++) cmpData = memberData[i], 
  membersMeta[cmpData[0]] = {
    memberType: cmpData[1],
    reflectToAttrib: !!cmpData[2],
    attribName: 'string' === typeof cmpData[3] ? cmpData[3] : cmpData[3] ? cmpData[0] : 0,
    propType: cmpData[4]
  };
  return {
    tagNameMeta,
    // map of the bundle ids
    // can contain modes, and array of esm and es5 bundle ids
    bundleIds,
    membersMeta: Object.assign({}, membersMeta),
    // encapsulation
    encapsulationMeta,
    // parse listener meta
    listenersMeta: listenerMeta ? listenerMeta.map(parseListenerData) : void 0
  };
};

const parseListenerData = listenerData => ({
  eventName: listenerData[0],
  eventMethodName: listenerData[1],
  eventDisabled: !!listenerData[2],
  eventPassive: !!listenerData[3],
  eventCapture: !!listenerData[4]
});

const parsePropertyValue = (propType, propValue) => {
  // ensure this value is of the correct prop type
  // we're testing both formats of the "propType" value because
  // we could have either gotten the data from the attribute changed callback,
  // which wouldn't have Constructor data yet, and because this method is reused
  // within proxy where we don't have meta data, but only constructor data
  if (isDef(propValue) && 'object' !== typeof propValue && 'function' !== typeof propValue) {
    if (propType === Boolean || 4 /* Boolean */ === propType) 
    // per the HTML spec, any string value means it is a boolean true value
    // but we'll cheat here and say that the string "false" is the boolean false
    return 'false' !== propValue && ('' === propValue || !!propValue);
    if (propType === Number || 8 /* Number */ === propType) 
    // force it to be a number
    return parseFloat(propValue);
    if (propType === String || 2 /* String */ === propType) 
    // could have been passed as a number or boolean
    // but we still want it as a string
    return propValue.toString();
    // redundant return here for better minification
        return propValue;
  }
  // not sure exactly what type we want
  // so no need to change to a different type
    return propValue;
};

const reflectInstanceValuesToHostAttributes = (properties, instance, reflectHostAttr) => {
  return properties && Object.keys(properties).forEach(memberName => {
    properties[memberName].reflectToAttr && (reflectHostAttr = reflectHostAttr || {}, 
    reflectHostAttr[memberName] = instance[memberName]);
  }), reflectHostAttr;
};

const queueUpdate = (plt, elm, perf) => {
  // we're actively processing this component
  plt.processingCmp.add(elm), 
  // only run patch if it isn't queued already
  plt.isQueuedForUpdate.has(elm) || (plt.isQueuedForUpdate.set(elm, true), 
  // run the patch in the next tick
  // vdom diff and patch the host element for differences
  plt.isAppLoaded ? 
  // app has already loaded
  // let's queue this work in the dom write phase
  plt.queue.write(() => update(plt, elm, perf)) : 
  // app hasn't finished loading yet
  // so let's use next tick to do everything
  // as fast as possible
  plt.queue.tick(() => update(plt, elm, perf)));
};

const update = async (plt, elm, perf, isInitialLoad, instance, ancestorHostElement) => {
  // everything is async, so somehow we could have already disconnected
  // this node, so be sure to do nothing if we've already disconnected
  if (perf.mark(`update_start:${elm.nodeName.toLowerCase()}:${elm['s-id']}`), 
  // no longer queued for update
  plt.isQueuedForUpdate.delete(elm), !plt.isDisconnectedMap.has(elm)) {
    if (instance = plt.instanceMap.get(elm), isInitialLoad = !instance, isInitialLoad) {
      if (ancestorHostElement = plt.ancestorHostElementMap.get(elm), ancestorHostElement && !ancestorHostElement['s-rn']) 
      // this is the intial load
      // this element has an ancestor host element
      // but the ancestor host element has NOT rendered yet
      // so let's just cool our jets and wait for the ancestor to render
      return void (ancestorHostElement['s-rc'] = ancestorHostElement['s-rc'] || []).push(() => {
        // this will get fired off when the ancestor host element
        // finally gets around to rendering its lazy self
        update(plt, elm, perf);
      });
      // haven't created a component instance for this host element yet!
      // create the instance from the user's component class
      // https://www.youtube.com/watch?v=olLxrojmvMg
            if (instance = initComponentInstance(plt, elm, plt.hostSnapshotMap.get(elm), perf), 
      instance) 
      // this is the initial load and the instance was just created
      // fire off the user's componentWillLoad method (if one was provided)
      // componentWillLoad only runs ONCE, after instance's element has been
      // assigned as the host element, but BEFORE render() has been called
      try {
        instance.componentWillLoad && await instance.componentWillLoad();
      } catch (e) {
        plt.onError(e, 3 /* WillLoadError */ , elm);
      }
    } else if (instance) 
    // component already initialized, this is an update
    // already created an instance and this is an update
    // fire off the user's componentWillUpdate method (if one was provided)
    // componentWillUpdate runs BEFORE render() has been called
    // but only BEFORE an UPDATE and not before the intial render
    // get the returned promise (if one was provided)
    try {
      instance.componentWillUpdate && await instance.componentWillUpdate();
    } catch (e) {
      plt.onError(e, 5 /* WillUpdateError */ , elm);
    }
    // if this component has a render function, let's fire
    // it off and generate a vnode for this
        ((plt, cmpMeta, hostElm, instance, perf) => {
      try {
        // if this component has a render function, let's fire
        // it off and generate the child vnodes for this host element
        // note that we do not create the host element cuz it already exists
        const hostMeta = cmpMeta.componentConstructor.host;
        const encapsulation = cmpMeta.componentConstructor.encapsulation;
        // test if this component should be shadow dom
        // and if so does the browser supports it
                const useNativeShadowDom = 'shadow' === encapsulation && plt.domApi.$supportsShadowDom;
        let reflectHostAttr;
        let rootElm = hostElm;
        if (reflectHostAttr = reflectInstanceValuesToHostAttributes(cmpMeta.componentConstructor.properties, instance), 
        // this component SHOULD use native slot/shadow dom
        // this browser DOES support native shadow dom
        // and this is the first render
        // let's create that shadow root
        // test if this component should be shadow dom
        // and if so does the browser supports it
        useNativeShadowDom && (rootElm = hostElm.shadowRoot), !hostElm['s-rn']) {
          // attach the styles this component needs, if any
          // this fn figures out if the styles should go in a
          // shadow root or if they should be global
          plt.attachStyles(plt, plt.domApi, cmpMeta, hostElm);
          const scopeId = hostElm['s-sc'];
          scopeId && (plt.domApi.$addClass(hostElm, getElementScopeId(scopeId, true)), 'scoped' === encapsulation && plt.domApi.$addClass(hostElm, getElementScopeId(scopeId)));
        }
        if (instance.render || instance.hostData || hostMeta || reflectHostAttr) {
          // tell the platform we're actively rendering
          // if a value is changed within a render() then
          // this tells the platform not to queue the change
          plt.activeRender = true;
          const vnodeChildren = instance.render && instance.render();
          let vnodeHostData;
          if (
          // user component provided a "hostData()" method
          // the returned data/attributes are used on the host element
          vnodeHostData = instance.hostData && instance.hostData(), vnodeHostData && cmpMeta.membersMeta) {
            const foundHostKeys = Object.keys(vnodeHostData).reduce((err, k) => {
              if (cmpMeta.membersMeta[k]) return err.concat(k);
              if (cmpMeta.membersMeta[dashToPascalCase(k)]) return err.concat(dashToPascalCase(k));
              return err;
            }, []);
            if (foundHostKeys.length > 0) throw new Error('The following keys were attempted to be set with hostData() from the ' + `${cmpMeta.tagNameMeta} component: ${foundHostKeys.join(', ')}. ` + 'If you would like to modify these please set @Prop({ mutable: true, reflectToAttr: true}) on the @Prop() decorator.');
          }
          reflectHostAttr && (vnodeHostData = vnodeHostData ? Object.assign(vnodeHostData, reflectHostAttr) : reflectHostAttr), 
          // tell the platform we're done rendering
          // now any changes will again queue
          plt.activeRender = false;
          // looks like we've got child nodes to render into this host element
          // or we need to update the css class/attrs on the host element
          const hostVNode = h$1(null, vnodeHostData, vnodeChildren);
          // if we haven't already created a vnode, then we give the renderer the actual element
          // if this is a re-render, then give the renderer the last vnode we already created
                    const oldVNode = plt.vnodeMap.get(hostElm) || {};
          oldVNode.elm = rootElm, 
          // only care if we're reflecting values to the host element
          hostVNode.ishost = true, 
          // each patch always gets a new vnode
          // the host element itself isn't patched because it already exists
          // kick off the actual render and any DOM updates
          plt.vnodeMap.set(hostElm, plt.render(hostElm, oldVNode, hostVNode, useNativeShadowDom, encapsulation));
        }
        // update styles!
                // it's official, this element has rendered
        hostElm['s-rn'] = true, hostElm['s-rc'] && (
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        hostElm['s-rc'].forEach(cb => cb()), hostElm['s-rc'] = null);
      } catch (e) {
        plt.activeRender = false, plt.onError(e, 8 /* RenderError */ , hostElm, true);
      }
    })(plt, plt.getComponentMeta(elm), elm, instance), perf.mark(`update_end:${elm.nodeName.toLowerCase()}:${elm['s-id']}`), 
    perf.measure(`update:${elm.nodeName.toLowerCase()}:${elm['s-id']}`, `update_start:${elm.nodeName.toLowerCase()}:${elm['s-id']}`, `update_end:${elm.nodeName.toLowerCase()}:${elm['s-id']}`), 
    elm['s-init'](), elm['s-hmr-load'] && elm['s-hmr-load']();
  }
};

const defineMember = (plt, property, elm, instance, memberName, hostSnapshot, perf, hostAttributes, hostAttrValue) => {
  if (property.type || property.state) {
    const values = plt.valuesMap.get(elm);
    !property.state && true && (!property.attr || void 0 !== values[memberName] && '' !== values[memberName] || 
    // check the prop value from the host element attribute
    (hostAttributes = hostSnapshot && hostSnapshot.$attributes) && isDef(hostAttrValue = hostAttributes[property.attr]) && (
    // looks like we've got an attribute value
    // let's set it to our internal values
    values[memberName] = parsePropertyValue(property.type, hostAttrValue)), 
    // client-side
    // within the browser, the element's prototype
    // already has its getter/setter set, but on the
    // server the prototype is shared causing issues
    // so instead the server's elm has the getter/setter
    // directly on the actual element instance, not its prototype
    // so on the browser we can use "hasOwnProperty"
    elm.hasOwnProperty(memberName) && (
    // @Prop or @Prop({mutable:true})
    // property values on the host element should override
    // any default values on the component instance
    void 0 === values[memberName] && (values[memberName] = parsePropertyValue(property.type, elm[memberName])), 
    // for the client only, let's delete its "own" property
    // this way our already assigned getter/setter on the prototype kicks in
    // the very special case is to NOT do this for "mode"
    'mode' !== memberName && delete elm[memberName])), instance.hasOwnProperty(memberName) && void 0 === values[memberName] && (
    // @Prop() or @Prop({mutable:true}) or @State()
    // we haven't yet got a value from the above checks so let's
    // read any "own" property instance values already set
    // to our internal value as the source of getter data
    // we're about to define a property and it'll overwrite this "own" property
    values[memberName] = instance[memberName]), property.watchCallbacks && (values[WATCH_CB_PREFIX + memberName] = property.watchCallbacks.slice()), 
    // add getter/setter to the component instance
    // these will be pointed to the internal data set from the above checks
    definePropertyGetterSetter(instance, memberName, function getComponentProp(values) {
      // component instance prop/state getter
      // get the property value directly from our internal values
      return values = plt.valuesMap.get(plt.hostElementMap.get(this)), values && values[memberName];
    }, function setComponentProp(newValue, elm) {
      // component instance prop/state setter (cannot be arrow fn)
      elm = plt.hostElementMap.get(this), elm && (property.state || property.mutable ? setValue(plt, elm, memberName, newValue, perf) : console.warn(`@Prop() "${memberName}" on "${elm.tagName}" cannot be modified.`));
    });
  } else if (property.elementRef) 
  // @Element()
  // add a getter to the element reference using
  // the member name the component meta provided
  definePropertyValue(instance, memberName, elm); else if (property.method) 
  // @Method()
  // add a property "value" on the host element
  // which we'll bind to the instance's method
  definePropertyValue(elm, memberName, instance[memberName].bind(instance)); else if (property.context) {
    // @Prop({ context: 'config' })
    const contextObj = plt.getContextItem(property.context);
    void 0 !== contextObj && definePropertyValue(instance, memberName, contextObj.getContext && contextObj.getContext(elm) || contextObj);
  } else property.connect && 
  // @Prop({ connect: 'ion-loading-ctrl' })
  definePropertyValue(instance, memberName, plt.propConnect(property.connect));
};

const setValue = (plt, elm, memberName, newVal, perf, instance, values) => {
  // get the internal values object, which should always come from the host element instance
  // create the _values object if it doesn't already exist
  values = plt.valuesMap.get(elm), values || plt.valuesMap.set(elm, values = {});
  const oldVal = values[memberName];
  // check our new property value against our internal value
    if (newVal !== oldVal && (
  // gadzooks! the property's value has changed!!
  // set our new value!
  // https://youtu.be/dFtLONl4cNc?t=22
  values[memberName] = newVal, instance = plt.instanceMap.get(elm), instance)) {
    {
      const watchMethods = values[WATCH_CB_PREFIX + memberName];
      if (watchMethods) 
      // this instance is watching for when this property changed
      for (let i = 0; i < watchMethods.length; i++) try {
        // fire off each of the watch methods that are watching this property
        instance[watchMethods[i]].call(instance, newVal, oldVal, memberName);
      } catch (e) {
        console.error(e);
      }
    }
    !plt.activeRender && elm['s-rn'] && 
    // looks like this value actually changed, so we've got work to do!
    // but only if we've already rendered, otherwise just chill out
    // queue that we need to do an update, but don't worry about queuing
    // up millions cuz this function ensures it only runs once
    queueUpdate(plt, elm, perf);
  }
};

const definePropertyValue = (obj, propertyKey, value) => {
  // minification shortcut
  Object.defineProperty(obj, propertyKey, {
    configurable: true,
    value
  });
};

const definePropertyGetterSetter = (obj, propertyKey, get, set) => {
  // minification shortcut
  Object.defineProperty(obj, propertyKey, {
    configurable: true,
    get,
    set
  });
};

const WATCH_CB_PREFIX = 'wc-';

const initComponentInstance = (plt, elm, hostSnapshot, perf, instance, componentConstructor, queuedEvents, i) => {
  try {
    false, 
    // using the user's component class, let's create a new instance
    componentConstructor = plt.getComponentMeta(elm).componentConstructor, instance = new componentConstructor(), 
    // ok cool, we've got an host element now, and a actual instance
    // and there were no errors creating the instance
    // let's upgrade the data on the host element
    // and let the getters/setters do their jobs
    ((plt, cmpConstructor, elm, instance, hostSnapshot, perf) => {
      // at this point we've got a specific node of a host element, and created a component class instance
      // and we've already created getters/setters on both the host element and component class prototypes
      // let's upgrade any data that might have been set on the host element already
      // and let's have the getters/setters kick in and do their jobs
      // let's automatically add a reference to the host element on the instance
      plt.hostElementMap.set(instance, elm), 
      // create the values object if it doesn't already exist
      // this will hold all of the internal getter/setter values
      plt.valuesMap.has(elm) || plt.valuesMap.set(elm, {}), 
      // get the properties from the constructor
      // and add default "mode" and "color" properties
      Object.entries(Object.assign({
        color: {
          type: String
        }
      }, cmpConstructor.properties, {
        mode: {
          type: String
        }
      })).forEach(([memberName, property]) => {
        // define each of the members and initialize what their role is
        defineMember(plt, property, elm, instance, memberName, hostSnapshot, perf);
      });
    })(plt, componentConstructor, elm, instance, hostSnapshot, perf), 
    // add each of the event emitters which wire up instance methods
    // to fire off dom events from the host element
    function initEventEmitters(plt, cmpEvents, instance) {
      if (cmpEvents) {
        const elm = plt.hostElementMap.get(instance);
        cmpEvents.forEach(eventMeta => {
          instance[eventMeta.method] = {
            emit: data => plt.emitEvent(elm, eventMeta.name, {
              bubbles: eventMeta.bubbles,
              composed: eventMeta.composed,
              cancelable: eventMeta.cancelable,
              detail: data
            })
          };
        });
      }
    }(plt, componentConstructor.events, instance);
    try {
      if (
      // replay any event listeners on the instance that
      // were queued up between the time the element was
      // connected and before the instance was ready
      queuedEvents = plt.queuedEvents.get(elm), queuedEvents) {
        // events may have already fired before the instance was even ready
        // now that the instance is ready, let's replay all of the events that
        // we queued up earlier that were originally meant for the instance
        for (i = 0; i < queuedEvents.length; i += 2) 
        // data was added in sets of two
        // first item the eventMethodName
        // second item is the event data
        // take a look at initElementListener()
        instance[queuedEvents[i]](queuedEvents[i + 1]);
        plt.queuedEvents.delete(elm);
      }
    } catch (e) {
      plt.onError(e, 2 /* QueueEventsError */ , elm);
    }
  } catch (e) {
    // something done went wrong trying to create a component instance
    // create a dumby instance so other stuff can load
    // but chances are the app isn't fully working cuz this component has issues
    instance = {}, plt.onError(e, 7 /* InitInstanceError */ , elm, true);
  }
  return plt.instanceMap.set(elm, instance), instance;
};

const propagateComponentReady = (plt, elm, index, ancestorsActivelyLoadingChildren, ancestorHostElement, cb) => {
  if (
  // we're no longer processing this component
  plt.processingCmp.delete(elm), 
  // load events fire from bottom to top
  // the deepest elements load first then bubbles up
  (ancestorHostElement = plt.ancestorHostElementMap.get(elm)) && (
  // ok so this element already has a known ancestor host element
  // let's make sure we remove this element from its ancestor's
  // known list of child elements which are actively loading
  ancestorsActivelyLoadingChildren = ancestorHostElement['s-ld'], ancestorsActivelyLoadingChildren && (index = ancestorsActivelyLoadingChildren.indexOf(elm), 
  index > -1 && 
  // yup, this element is in the list of child elements to wait on
  // remove it so we can work to get the length down to 0
  ancestorsActivelyLoadingChildren.splice(index, 1), 
  // the ancestor's initLoad method will do the actual checks
  // to see if the ancestor is actually loaded or not
  // then let's call the ancestor's initLoad method if there's no length
  // (which actually ends up as this method again but for the ancestor)
  ancestorsActivelyLoadingChildren.length || ancestorHostElement['s-init'] && ancestorHostElement['s-init']()), 
  plt.ancestorHostElementMap.delete(elm)), plt.onAppReadyCallbacks.length && !plt.processingCmp.size) 
  // we've got some promises waiting on the entire app to be done processing
  // so it should have an empty queue and no longer rendering
  while (cb = plt.onAppReadyCallbacks.shift()) cb();
};

const isDisconnected = (domApi, elm) => {
  while (elm) {
    if (!domApi.$parentNode(elm)) return 9 /* DocumentNode */ !== domApi.$nodeType(elm);
    elm = domApi.$parentNode(elm);
  }
};

function hmrStart(plt, cmpMeta, elm, hmrVersionId) {
  // ¯\_(ツ)_/¯
  // keep the existing state
  // forget the constructor
  cmpMeta.componentConstructor = null, 
  // no sir, this component has never loaded, not once, ever
  plt.isCmpLoaded.delete(elm), plt.isCmpReady.delete(elm);
  // forget the instance
  const instance = plt.instanceMap.get(elm);
  instance && (plt.hostElementMap.delete(instance), plt.instanceMap.delete(elm)), 
  // detatch any event listeners that may have been added
  // because we're not passing an exact event name it'll
  // remove all of this element's event, which is good
  plt.domApi.$removeEventListener(elm), plt.hasListenersMap.delete(elm), cmpMeta.listenersMeta = null, 
  // create a callback for when this component finishes hmr
  elm['s-hmr-load'] = (() => {
    // finished hmr for this element
    delete elm['s-hmr-load'], function hmrFinish(plt, cmpMeta, elm) {
      plt.hasListenersMap.has(elm) || (plt.hasListenersMap.set(elm, true), 
      // initElementListeners works off of cmp metadata
      // but we just got new data from the constructor
      // so let's update the cmp metadata w/ constructor listener data
      cmpMeta.componentConstructor && cmpMeta.componentConstructor.listeners && (cmpMeta.listenersMeta = cmpMeta.componentConstructor.listeners.map(lstn => {
        const listenerMeta = {
          eventMethodName: lstn.method,
          eventName: lstn.name,
          eventCapture: !!lstn.capture,
          eventPassive: !!lstn.passive,
          eventDisabled: !!lstn.disabled
        };
        return listenerMeta;
      }), initElementListeners(plt, elm)));
    }(plt, cmpMeta, elm);
  }), 
  // create the new host snapshot from the element
  plt.hostSnapshotMap.set(elm, initHostSnapshot(plt.domApi, cmpMeta, elm)), 
  // request the bundle again
  plt.requestBundle(cmpMeta, elm, hmrVersionId);
}

const proxyHostElementPrototype = (plt, membersEntries, hostPrototype, perf) => {
  membersEntries.forEach(([memberName, member]) => {
    // add getters/setters
    const memberType = member.memberType;
    3 /* PropMutable */ & memberType && true ? 
    // @Prop() or @Prop({ mutable: true })
    definePropertyGetterSetter(hostPrototype, memberName, function getHostElementProp() {
      // host element getter (cannot be arrow fn)
      // yup, ugly, srynotsry
      return (plt.valuesMap.get(this) || {})[memberName];
    }, function setHostElementProp(newValue) {
      // host element setter (cannot be arrow fn)
      setValue(plt, this, memberName, parsePropertyValue(member.propType, newValue), perf);
    }) : 32 /* Method */ === memberType && 
    // @Method()
    // add a placeholder noop value on the host element's prototype
    // incase this method gets called before setup
    definePropertyValue(hostPrototype, memberName, noop);
  });
};

const initHostElement = (plt, cmpMeta, HostElementConstructor, hydratedCssClass, perf) => {
  if (
  // let's wire up our functions to the host element's prototype
  // we can also inject our platform into each one that needs that api
  // note: these cannot be arrow functions cuz "this" is important here hombre
  HostElementConstructor.connectedCallback = function() {
    // coolsville, our host element has just hit the DOM
    ((plt, cmpMeta, elm, perf) => {
      // initialize our event listeners on the host element
      // we do this now so that we can listening to events that may
      // have fired even before the instance is ready
      plt.hasListenersMap.has(elm) || (
      // it's possible we've already connected
      // then disconnected
      // and the same element is reconnected again
      plt.hasListenersMap.set(elm, true), initElementListeners(plt, elm)), 
      // this element just connected, which may be re-connecting
      // ensure we remove it from our map of disconnected
      plt.isDisconnectedMap.delete(elm), plt.hasConnectedMap.has(elm) || (plt.hasConnectedComponent = true, 
      plt.processingCmp.add(elm), 
      // first time we've connected
      plt.hasConnectedMap.set(elm, true), 
      // register this component as an actively
      // loading child to its parent component
      registerWithParentComponent(plt, elm), 
      // add to the queue to load the bundle
      // it's important to have an async tick in here so we can
      // ensure the "mode" attribute has been added to the element
      // place in high priority since it's not much work and we need
      // to know as fast as possible, but still an async tick in between
      plt.queue.tick(() => {
        // start loading this component mode's bundle
        // if it's already loaded then the callback will be synchronous
        plt.hostSnapshotMap.set(elm, initHostSnapshot(plt.domApi, cmpMeta, elm)), plt.requestBundle(cmpMeta, elm);
      }));
    })(plt, cmpMeta, this);
  }, HostElementConstructor.disconnectedCallback = function() {
    // the element has left the builing
    ((plt, elm, perf) => {
      // only disconnect if we're not temporarily disconnected
      // tmpDisconnected will happen when slot nodes are being relocated
      if (!plt.tmpDisconnected && isDisconnected(plt.domApi, elm)) {
        // ok, let's officially destroy this thing
        // set this to true so that any of our pending async stuff
        // doesn't continue since we already decided to destroy this node
        // elm._hasDestroyed = true;
        plt.isDisconnectedMap.set(elm, true), 
        // double check that we've informed the ancestor host elements
        // that they're good to go and loaded (cuz this one is on its way out)
        propagateComponentReady(plt, elm), 
        // since we're disconnecting, call all of the JSX ref's with null
        callNodeRefs(plt.vnodeMap.get(elm), true);
        {
          // call instance componentDidUnload
          // if we've created an instance for this
          const instance = plt.instanceMap.get(elm);
          instance && instance.componentDidUnload && 
          // call the user's componentDidUnload if there is one
          instance.componentDidUnload();
        }
        // detatch any event listeners that may have been added
        // because we're not passing an exact event name it'll
        // remove all of this element's event, which is good
                plt.domApi.$removeEventListener(elm), plt.hasListenersMap.delete(elm), 
        // clear any references to other elements
        // more than likely we've already deleted these references
        // but let's double check there pal
        [ plt.ancestorHostElementMap, plt.onReadyCallbacksMap, plt.hostSnapshotMap ].forEach(wm => wm.delete(elm));
      }
    })(plt, this);
  }, HostElementConstructor['s-init'] = function() {
    ((plt, elm, hydratedCssClass, perf, instance, onReadyCallbacks, hasCmpLoaded) => {
      // all is good, this component has been told it's time to finish loading
      // it's possible that we've already decided to destroy this element
      // check if this element has any actively loading child elements
      if ((instance = plt.instanceMap.get(elm)) && !plt.isDisconnectedMap.has(elm) && (!elm['s-ld'] || !elm['s-ld'].length)) {
        // cool, so at this point this element isn't already being destroyed
        // and it does not have any child elements that are still loading
        // all of this element's children have loaded (if any)
        plt.isCmpReady.set(elm, true), (hasCmpLoaded = plt.isCmpLoaded.has(elm)) || (
        // remember that this component has loaded
        // isCmpLoaded map is useful to know if we should fire
        // the lifecycle componentDidLoad() or componentDidUpdate()
        plt.isCmpLoaded.set(elm, true), 
        // ensure we remove any child references cuz it doesn't matter at this point
        elm['s-ld'] = void 0, 
        // add the css class that this element has officially hydrated
        plt.domApi.$addClass(elm, hydratedCssClass));
        try {
          // fire off the ref if it exists
          callNodeRefs(plt.vnodeMap.get(elm)), 
          // fire off the user's elm.componentOnReady() callbacks that were
          // put directly on the element (well before anything was ready)
          (onReadyCallbacks = plt.onReadyCallbacksMap.get(elm)) && (onReadyCallbacks.forEach(cb => cb(elm)), 
          plt.onReadyCallbacksMap.delete(elm)), !hasCmpLoaded && instance.componentDidLoad ? instance.componentDidLoad() : hasCmpLoaded && instance.componentDidUpdate && instance.componentDidUpdate();
        } catch (e) {
          plt.onError(e, 4 /* DidLoadError */ , elm);
        }
        // ( •_•)
        // ( •_•)>⌐■-■
        // (⌐■_■)
        // load events fire from bottom to top
        // the deepest elements load first then bubbles up
        propagateComponentReady(plt, elm);
      }
    })(plt, this, hydratedCssClass);
  }, HostElementConstructor.forceUpdate = function() {
    queueUpdate(plt, this, perf);
  }, HostElementConstructor['s-hmr'] = function(hmrVersionId) {
    hmrStart(plt, cmpMeta, this, hmrVersionId);
  }, cmpMeta.membersMeta) {
    const entries = Object.entries(cmpMeta.membersMeta);
    {
      let attrToProp = {};
      entries.forEach(([propName, {attribName}]) => {
        attribName && (attrToProp[attribName] = propName);
      }), attrToProp = Object.assign({}, attrToProp), HostElementConstructor.attributeChangedCallback = function(attribName, _oldVal, newVal) {
        // the browser has just informed us that an attribute
        // on the host element has changed
        (function attributeChangedCallback(attrPropsMap, elm, attribName, newVal) {
          // look up to see if we have a property wired up to this attribute name
          const propName = attrPropsMap[toLowerCase(attribName)];
          propName && (
          // there is not need to cast the value since, it's already casted when
          // the prop is setted
          elm[propName] = (null !== newVal || 'boolean' !== typeof elm[propName]) && newVal);
        })(attrToProp, this, attribName, newVal);
      };
    }
    // add getters/setters to the host element members
    // these would come from the @Prop and @Method decorators that
    // should create the public API to this component
        proxyHostElementPrototype(plt, entries, HostElementConstructor, perf);
  }
};

const proxyProp = (domApi, controllerComponents, ctrlTag, proxyMethodName) => (function() {
  const args = arguments;
  return loadComponent(domApi, controllerComponents, ctrlTag).then(ctrlElm => ctrlElm[proxyMethodName].apply(ctrlElm, args));
});

const loadComponent = (domApi, controllerComponents, ctrlTag, ctrlElm, body) => {
  if (ctrlElm = controllerComponents[ctrlTag], body = domApi.$doc.body, body) return ctrlElm || (ctrlElm = body.querySelector(ctrlTag)), 
  ctrlElm || (ctrlElm = controllerComponents[ctrlTag] = domApi.$createElement(ctrlTag), 
  domApi.$appendChild(body, ctrlElm)), ctrlElm.componentOnReady();
  return Promise.resolve();
};

// esm build which uses es module imports and dynamic imports
((namespace, Context, win, doc, resourcesUrl, hydratedCssClass, components) => {
  const perf = win.performance;
  const cmpRegistry = {
    'html': {}
  };
  const controllerComponents = {};
  const App = win[namespace] = win[namespace] || {};
  const domApi = ((App, win, doc) => {
    // using the $ prefix so that closure is
    // cool with property renaming each of these
    const unregisterListenerFns = new WeakMap();
    const domApi = {
      $doc: doc,
      $supportsShadowDom: !!doc.documentElement.attachShadow,
      $supportsEventOptions: false,
      $nodeType: node => node.nodeType,
      $createElement: tagName => doc.createElement(tagName),
      $createElementNS: (namespace, tagName) => doc.createElementNS(namespace, tagName),
      $createTextNode: text => doc.createTextNode(text),
      $createComment: data => doc.createComment(data),
      $insertBefore: (parentNode, childNode, referenceNode) => parentNode.insertBefore(childNode, referenceNode),
      // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
      // and it's polyfilled in es5 builds
      $remove: node => node.remove(),
      $appendChild: (parentNode, childNode) => parentNode.appendChild(childNode),
      $addClass: (elm, cssClass) => {
        elm.classList.add(cssClass);
      },
      $childNodes: node => node.childNodes,
      $parentNode: node => node.parentNode,
      $nextSibling: node => node.nextSibling,
      $previousSibling: node => node.previousSibling,
      $tagName: elm => toLowerCase(elm.nodeName),
      $getTextContent: node => node.textContent,
      $setTextContent: (node, text) => node.textContent = text,
      $getAttribute: (elm, key) => elm.getAttribute(key),
      $setAttribute: (elm, key, val) => elm.setAttribute(key, val),
      $removeAttribute: (elm, key) => elm.removeAttribute(key),
      $hasAttribute: (elm, key) => elm.hasAttribute(key),
      $getMode: elm => elm.getAttribute('mode') || (App.Context || {}).mode,
      $elementRef: (elm, referenceName) => {
        if ('child' === referenceName) return elm.firstElementChild;
        if ('parent' === referenceName) return domApi.$parentElement(elm);
        if ('body' === referenceName) return doc.body;
        if ('document' === referenceName) return doc;
        if ('window' === referenceName) return win;
        return elm;
      },
      $addEventListener: (assignerElm, eventName, listenerCallback, assignerId, useCapture, usePassive, attachTo, eventListenerOpts, splt, assignersEventName) => {
        // remember the original name before we possibly change it
        let attachToElm = assignerElm;
        let eventListener = listenerCallback;
        // get the existing unregister listeners for
        // this element from the unregister listeners weakmap
                let assignersUnregListeners = unregisterListenerFns.get(assignerElm);
        assignersEventName = eventName + assignerId, assignersUnregListeners && assignersUnregListeners[assignersEventName] && 
        // removed any existing listeners for this event for the assigner element
        // this element already has this listener, so let's unregister it now
        assignersUnregListeners[assignersEventName](), 'string' === typeof attachTo ? 
        // attachTo is a string, and is probably something like
        // "parent", "window", or "document"
        // and the eventName would be like "mouseover" or "mousemove"
        attachToElm = domApi.$elementRef(assignerElm, attachTo) : 'object' === typeof attachTo ? 
        // we were passed in an actual element to attach to
        attachToElm = attachTo : (
        // depending on the event name, we could actually be attaching
        // this element to something like the document or window
        splt = eventName.split(':'), splt.length > 1 && (
        // document:mousemove
        // parent:touchend
        // body:keyup.enter
        attachToElm = domApi.$elementRef(assignerElm, splt[0]), eventName = splt[1])), attachToElm && (
        // test to see if we're looking for an exact keycode
        splt = eventName.split('.'), splt.length > 1 && (
        // looks like this listener is also looking for a keycode
        // keyup.enter
        eventName = splt[0], eventListener = (ev => {
          // wrap the user's event listener with our own check to test
          // if this keyboard event has the keycode they're looking for
          ev.keyCode === KEY_CODE_MAP[splt[1]] && listenerCallback(ev);
        })), 
        // create the actual event listener options to use
        // this browser may not support event options
        eventListenerOpts = domApi.$supportsEventOptions ? {
          capture: !!useCapture,
          passive: !!usePassive
        } : !!useCapture, 
        // ok, good to go, let's add the actual listener to the dom element
        App.ael(attachToElm, eventName, eventListener, eventListenerOpts), assignersUnregListeners || 
        // we don't already have a collection, let's create it
        unregisterListenerFns.set(assignerElm, assignersUnregListeners = {}), 
        // add the unregister listener to this element's collection
        assignersUnregListeners[assignersEventName] = (() => {
          // looks like it's time to say goodbye
          attachToElm && App.rel(attachToElm, eventName, eventListener, eventListenerOpts), 
          assignersUnregListeners[assignersEventName] = null;
        }));
      },
      $removeEventListener: (elm, eventName, assignerId, assignersUnregListeners) => {
        // get the unregister listener functions for this element
        (assignersUnregListeners = unregisterListenerFns.get(elm)) && (
        // this element has unregister listeners
        eventName ? 
        // passed in one specific event name to remove
        assignersUnregListeners[eventName + assignerId] && assignersUnregListeners[eventName + assignerId]() : 
        // remove all event listeners
        Object.keys(assignersUnregListeners).forEach(assignersEventName => {
          assignersUnregListeners[assignersEventName] && assignersUnregListeners[assignersEventName]();
        }));
      },
      $dispatchEvent: (elm, eventName, data, e) => {
        // create and return the custom event, allows for cancel checks
        return e = new win.CustomEvent(eventName, data), elm && elm.dispatchEvent(e), e;
      },
      $parentElement: (elm, parentNode) => 
      // if the parent node is a document fragment (shadow root)
      // then use the "host" property on it
      // otherwise use the parent node
      (parentNode = domApi.$parentNode(elm)) && 11 /* DocumentFragment */ === domApi.$nodeType(parentNode) ? parentNode.host : parentNode
    };
    domApi.$setAttributeNS = ((elm, namespaceURI, qualifiedName, val) => elm.setAttributeNS(namespaceURI, qualifiedName, val)), 
    domApi.$attachShadow = ((elm, shadowRootInit) => elm.attachShadow(shadowRootInit)), 
    win.location.search.indexOf('shadow=false') > 0 && (
    // by adding ?shadow=false it'll force the slot polyfill
    // only add this check when in dev mode
    domApi.$supportsShadowDom = false), App.ael || (App.ael = ((elm, eventName, cb, opts) => elm.addEventListener(eventName, cb, opts)), 
    App.rel = ((elm, eventName, cb, opts) => elm.removeEventListener(eventName, cb, opts)));
    // test if this browser supports event options or not
    try {
      win.addEventListener('e', null, Object.defineProperty({}, 'passive', {
        get: () => domApi.$supportsEventOptions = true
      }));
    } catch (e) {}
    return domApi;
  })(App, win, doc);
  const rootElm = domApi.$doc.documentElement;
  // keep a global set of tags we've already defined
    const globalDefined = win['s-defined'] = win['s-defined'] || {};
  const defineComponent = (cmpMeta, HostElementConstructor) => {
    win.customElements.get(cmpMeta.tagNameMeta) || (
    // define the custom element
    // initialize the members on the host element prototype
    // keep a ref to the metadata with the tag as the key
    initHostElement(plt, cmpRegistry[cmpMeta.tagNameMeta] = cmpMeta, HostElementConstructor.prototype, hydratedCssClass, perf), 
    // add which attributes should be observed
    // at this point the membersMeta only includes attributes which should
    // be observed, it does not include all props yet, so it's safe to
    // loop through all of the props (attrs) and observed them
    // set the array of all the attributes to keep an eye on
    // https://www.youtube.com/watch?v=RBs21CFBALI
    HostElementConstructor.observedAttributes = Object.values(cmpMeta.membersMeta).map(member => member.attribName).filter(attribName => !!attribName), 
    win.customElements.define(cmpMeta.tagNameMeta, HostElementConstructor));
  };
  // create the platform api which is used throughout common core code
    const plt = {
    domApi,
    defineComponent,
    getComponentMeta: elm => cmpRegistry[domApi.$tagName(elm)],
    getContextItem: contextKey => Context[contextKey],
    isClient: true,
    isDefinedComponent: elm => !!(globalDefined[domApi.$tagName(elm)] || plt.getComponentMeta(elm)),
    onError: (err, type, elm) => console.error(err, type, elm && elm.tagName),
    queue: Context.queue = createQueueClient(App, win),
    requestBundle: (cmpMeta, elm, hmrVersionId) => {
      {
        // self loading module using built-in browser's import()
        // this is when not using a 3rd party bundler
        // and components are able to lazy load themselves
        // through standardized browser APIs
        const bundleId = cmpMeta.bundleIds;
        const useScopedCss = !domApi.$supportsShadowDom;
        let url = resourcesUrl + bundleId + (useScopedCss ? '.sc' : '') + '.entry.js';
        hmrVersionId && (url += '?s-hmr=' + hmrVersionId), 
        // dynamic es module import() => woot!
        import(url).then(importedModule => {
          try {
            // get the component constructor from the module
            // initialize this component constructor's styles
            // it is possible for the same component to have difficult styles applied in the same app
            cmpMeta.componentConstructor = importedModule[dashToPascalCase(cmpMeta.tagNameMeta)], 
            initStyleTemplate(domApi, cmpMeta, cmpMeta.encapsulationMeta, cmpMeta.componentConstructor.style, cmpMeta.componentConstructor.styleMode), 
            // bundle all loaded up, let's continue
            queueUpdate(plt, elm, perf);
          } catch (e) {
            // oh man, something's up
            console.error(e), 
            // provide a bogus component constructor
            // so the rest of the app acts as normal
            cmpMeta.componentConstructor = class {};
          }
        }, err => console.error(err, url));
      }
    },
    activeRender: false,
    isAppLoaded: false,
    tmpDisconnected: false,
    attachStyles,
    ancestorHostElementMap: new WeakMap(),
    componentAppliedStyles: new WeakMap(),
    hasConnectedMap: new WeakMap(),
    hasListenersMap: new WeakMap(),
    isCmpLoaded: new WeakMap(),
    isCmpReady: new WeakMap(),
    hostElementMap: new WeakMap(),
    hostSnapshotMap: new WeakMap(),
    instanceMap: new WeakMap(),
    isDisconnectedMap: new WeakMap(),
    isQueuedForUpdate: new WeakMap(),
    onReadyCallbacksMap: new WeakMap(),
    queuedEvents: new WeakMap(),
    vnodeMap: new WeakMap(),
    valuesMap: new WeakMap(),
    processingCmp: new Set(),
    onAppReadyCallbacks: []
  };
  // set App Context
  Context.isServer = Context.isPrerender = !(Context.isClient = true), Context.window = win, 
  Context.location = win.location, Context.document = doc, Context.resourcesUrl = Context.publicPath = resourcesUrl, 
  Context.enableListener = ((instance, eventName, enabled, attachTo, passive) => (function enableEventListener(plt, instance, eventName, shouldEnable, attachTo, passive) {
    if (instance) {
      // cool, we've got an instance, it's get the element it's on
      const elm = plt.hostElementMap.get(instance);
      const cmpMeta = plt.getComponentMeta(elm);
      if (cmpMeta && cmpMeta.listenersMeta) 
      // alrighty, so this cmp has listener meta
      if (shouldEnable) {
        // we want to enable this event
        // find which listen meta we're talking about
        const listenMeta = cmpMeta.listenersMeta.find(l => l.eventName === eventName);
        listenMeta && 
        // found the listen meta, so let's add the listener
        plt.domApi.$addEventListener(elm, eventName, ev => instance[listenMeta.eventMethodName](ev), 1, listenMeta.eventCapture, void 0 === passive ? listenMeta.eventPassive : !!passive, attachTo);
      } else 
      // we're disabling the event listener
      // so let's just remove it entirely
      plt.domApi.$removeEventListener(elm, eventName, 1);
    }
  })(plt, instance, eventName, enabled, attachTo, passive)), plt.emitEvent = Context.emit = ((elm, eventName, data) => domApi.$dispatchEvent(elm, Context.eventNameFn ? Context.eventNameFn(eventName) : eventName, data)), 
  plt.propConnect = (ctrlTag => ((domApi, controllerComponents, ctrlTag) => ({
    'create': proxyProp(domApi, controllerComponents, ctrlTag, 'create'),
    'componentOnReady': proxyProp(domApi, controllerComponents, ctrlTag, 'componentOnReady')
  }))(domApi, controllerComponents, ctrlTag)), 
  // add the h() fn to the app's global namespace
  App.h = h$1, App.Context = Context, 
  // create a method that returns a promise
  // which gets resolved when the app's queue is empty
  // and app is idle, works for both initial load and updates
  App.onReady = (() => new Promise(resolve => plt.queue.write(() => plt.processingCmp.size ? plt.onAppReadyCallbacks.push(resolve) : resolve()))), 
  // create the renderer that will be used
  plt.render = createRendererPatch(plt, domApi), 
  // setup the root element which is the mighty <html> tag
  // the <html> has the final say of when the app has loaded
  rootElm['s-ld'] = [], rootElm['s-rn'] = true, 
  // this will fire when all components have finished loaded
  rootElm['s-init'] = (() => {
    plt.isCmpReady.set(rootElm, App.loaded = plt.isAppLoaded = true), domApi.$dispatchEvent(win, 'appload', {
      detail: {
        namespace
      }
    });
  }), generateDevInspector(namespace, win, plt, components), components.map(parseComponentLoader).forEach(cmpMeta => defineComponent(cmpMeta, class extends HTMLElement {})), 
  plt.hasConnectedComponent || 
  // we just defined call the custom elements but no
  // connectedCallbacks happened, so no components in the dom :(
  rootElm['s-init'](), 
  // create the componentOnReady fn
  ((plt, App, win, apps, queuedComponentOnReadys, i) => {
    if (
    // add componentOnReady() to the App object
    // this also is used to know that the App's core is ready
    App.componentOnReady = ((elm, resolve) => {
      if (!elm.nodeName.includes('-')) return resolve(null), false;
      const cmpMeta = plt.getComponentMeta(elm);
      if (cmpMeta) if (plt.isCmpReady.has(elm)) 
      // element has already loaded, pass the resolve the element component
      // so we know that the resolve knows it this element is an app component
      resolve(elm); else {
        // element hasn't loaded yet or it has an update in progress
        // add this resolve specifically to this elements on ready queue
        const onReadyCallbacks = plt.onReadyCallbacksMap.get(elm) || [];
        onReadyCallbacks.push(resolve), plt.onReadyCallbacksMap.set(elm, onReadyCallbacks);
      }
      // return a boolean if this app recognized this element or not
            return !!cmpMeta;
    }), queuedComponentOnReadys) {
      // we've got some componentOnReadys in the queue before the app was ready
      for (i = queuedComponentOnReadys.length - 1; i >= 0; i--) 
      // go through each element and see if this app recongizes it
      App.componentOnReady(queuedComponentOnReadys[i][0], queuedComponentOnReadys[i][1]) && 
      // turns out this element belongs to this app
      // remove the resolve from the queue so in the end
      // all that's left in the queue are elements not apart of any apps
      queuedComponentOnReadys.splice(i, 1);
      for (i = 0; i < apps.length; i++) if (!win[apps[i]].componentOnReady) 
      // there is at least 1 apps that isn't ready yet
      // so let's stop here cuz there's still app cores loading
      return;
      // if we got to this point then that means all of the apps are ready
      // and they would have removed any of their elements from queuedComponentOnReadys
      // so let's do the cleanup of the  remaining queuedComponentOnReadys
            for (i = 0; i < queuedComponentOnReadys.length; i++) 
      // resolve any queued componentsOnReadys that are left over
      // since these elements were not apart of any apps
      // call the resolve fn, but pass null so it's know this wasn't a known app component
      queuedComponentOnReadys[i][1](null);
      queuedComponentOnReadys.length = 0;
    }
  })(plt, App, win, win['s-apps'], win['s-cr']), 
  // notify that the app has initialized and the core script is ready
  // but note that the components have not fully loaded yet
  App.initialized = true;
})(n, x, w, d, r, h, c);
})(window,document,{},"DesignSystem","hydrated",[["yoo-about","yoo-about",1,[["app",1,0,1,2],["host",64],["linkedin",1,0,1,2],["logo",1,0,1,2],["twitter",1,0,1,2],["version",1,0,1,2]],1],["yoo-accordion","yoo-accordion",1,[["allowMultipleSelection",1,0,"allow-multiple-selection",4],["entries",1],["host",64],["iconPairLeft",1],["iconPairRight",1],["items",16],["masterTitle",1,0,"master-title",2],["showBottomBorder",1,0,"show-bottom-border",4]],1],["yoo-action-sheet","yoo-action-sheet",1,[["buttons",1],["cardHeader",1],["cssClass",1,0,"css-class",2],["dismiss",32],["footer",1],["heading",1,0,1,2],["host",64],["keyboardClose",1,0,"keyboard-close",4],["onActionSelected",32],["onDidDismiss",32],["onWillDismiss",32],["overlayId",1,0,"overlay-id",8],["present",32],["willAnimate",1,0,"will-animate",4]],1,[["ionActionSheetDidPresent","lifecycle"],["ionActionSheetWillPresent","lifecycle"],["ionActionSheetWillDismiss","lifecycle"],["ionActionSheetDidDismiss","lifecycle"]]],["yoo-ag-grid","yoo-ag-grid",1,[["config",1],["host",64]],1],["yoo-alert","yoo-alert",1,[["buttons",1],["cssClass",1,0,"css-class",2],["dismiss",32],["header",1,0,1,2],["host",64],["icon",1,0,1,2],["img",1,0,1,2],["keyboardClose",1,0,"keyboard-close",4],["message",1,0,1,2],["onDidDismiss",32],["onWillDismiss",32],["overlayId",1,0,"overlay-id",8],["present",32],["rename",1,0,1,4],["renameValue",2,0,"rename-value",2],["willAnimate",1,0,"will-animate",4]],1,[["ionAlertDidPresent","lifecycle"],["ionAlertWillPresent","lifecycle"],["ionAlertWillDismiss","lifecycle"],["ionAlertDidDismiss","lifecycle"]]],["yoo-amap","yoo-amap",1,[["filterGroups",2],["host",64],["isLoading",16],["mapEntry",1]],1],["yoo-app","yoo-app",1,[["getSession",1],["host",64],["isDarkTheme",1,0,"is-dark-theme",4],["isOffline",1,0,"is-offline",4],["language",1,0,1,2]]],["yoo-audio-player","yoo-ag-grid",1,[["_downloadURL",1,0,"_download-u-r-l",2],["currentProgressTime",16],["currentStatus",16],["displayMode",1,0,"display-mode",2],["host",64]],1],["yoo-avatar","yoo-avatar",1,[["bottomLeftIcon",1,0,"bottom-left-icon",2],["bottomRightIcon",1,0,"bottom-right-icon",2],["hasPending",1,0,"has-pending",4],["host",64],["icon",1,0,1,2],["iconText",1,0,"icon-text",2],["imgSrc",1,0,"img-src",2],["reversedColor",1,0,"reversed-color",4],["topLeftIcon",1,0,"top-left-icon",2],["topRightIcon",1,0,"top-right-icon",2],["user",1]],1],["yoo-background-blur","yoo-background-blur",1,[["height",1,0,1,8],["imageUrl",1,0,"image-url",2],["width",1,0,1,8]],1],["yoo-badge","yoo-badge",1,[["closable",1,0,1,4],["closed",16],["host",64],["iconLeft",1,0,"icon-left",2],["iconRight",1,0,"icon-right",2],["isHistory",1,0,"is-history",4],["text",1,0,1,2]],1],["yoo-banner","yoo-banner",1,[["animationName",1,0,"animation-name",2],["closeable",1,0,1,4],["closed",16],["heading",1,0,1,2],["host",64],["icon",1,0,1,2],["link",1,0,1,2],["text",1,0,1,2]],1],["yoo-barcode","yoo-ag-grid",1,[["height",1,0,1,8],["host",64],["type",1,0,1,2],["value",1,0,1,2]],1],["yoo-barcode-dialog","yoo-barcode-dialog",1,[["heading",1,0,1,2],["host",64],["type",1,0,1,2],["value",1,0,1,2]],1],["yoo-breadcrumbs","yoo-breadcrumbs",1,[["host",64],["items",1],["visibleItems",16]],1],["yoo-button","yoo-button",1,[["badge",1,0,1,2],["badgeClass",1,0,"badge-class",2],["bgColor",1,0,"bg-color",2],["disabled",1,1,1,4],["hasMoreBtn",16],["host",64],["icon",1,0,1,2],["isLoading",1,0,"is-loading",4],["setMaxWidth",1,0,"set-max-width",4],["text",1,0,1,2],["textOverflown",16],["translateText",1,0,"translate-text",4]],1],["yoo-button-group","yoo-button-group",1,[["dropdownTitle",1,0,"dropdown-title",2],["host",64],["isDropdown",1,0,"is-dropdown",4]],1],["yoo-calendar","yoo-accordion",1,[["activeDay",1],["activeDayState",16],["dateRange",1],["displayMode",2,0,"display-mode",2],["host",64],["isDatePicker",1,0,"is-date-picker",4],["isRange",1,0,"is-range",4],["markers",1],["maxDate",1],["minDate",1],["rangeLowerBound",16],["rangeUpperBound",16],["setActiveDay",32],["setDisplayMode",32],["slideChanged",16]],1],["yoo-camera-preview-dialog","yoo-camera-preview-dialog",1,[["cameraStarted",1,0,"camera-started",4],["flashMode",16],["host",64],["imageData",1,0,"image-data",2],["isImageRecognition",1,0,"is-image-recognition",4],["isProcessing",16],["listviewItems",16],["max",1,0,1,8],["maxWidth",1,0,"max-width",8],["quality",1,0,1,8],["regularMode",1,0,"regular-mode",4],["showCapturedImage",16],["showLoader",16],["values",1]],1],["yoo-campaign-editor-recap","yoo-campaign-editor-recap",1,[["campaign",1],["host",64]],1],["yoo-campaign-heading","yoo-campaign-heading",1,[["alwaysExpanded",1,0,"always-expanded",4],["campaign",1],["host",64],["showMore",16],["showSecondaryActions",16]],1],["yoo-card","yoo-ag-grid",1,[["actionButtonTitle",1,0,"action-button-title",2],["animationName",1,0,"animation-name",2],["avatarImgs",1],["avatarShape",1,0,"avatar-shape",2],["badges",1],["bottomLeftBadge",1,0,"bottom-left-badge",2],["bottomRightBadge",1,0,"bottom-right-badge",2],["date",1,0,1,2],["hasMenu",1,0,"has-menu",4],["heading",1,0,1,2],["horizontal",16],["host",64],["imageHeight",16],["imageWidth",16],["imgSrc",1,0,"img-src",2],["isActivable",1,0,"is-activable",4],["isActive",16],["isUserCard",1,0,"is-user-card",4],["subheadings",1],["topLeftBadge",1,0,"top-left-badge",2],["topRightBadge",1,0,"top-right-badge",2]],1],["yoo-card-cell","yoo-ag-grid",1,[["entry",1],["host",64],["imageHeight",16],["imageWidth",16]],1],["yoo-card-course","yoo-card-course",1,[["entry",1],["host",64]],1],["yoo-card-course-row","yoo-card-course-row",1,[["entry",1],["host",64]],1],["yoo-card-feed","yoo-ag-grid",1,[["entry",1],["host",64],["imageHeight",16],["imageWidth",16]],1],["yoo-card-file","yoo-ag-grid",1,[["_downloadURL",1,0,"_download-u-r-l",2],["heading",1,0,1,2],["host",64],["icon",1,0,1,2],["iconClass",1,0,"icon-class",2],["imgSrc",1,0,"img-src",2],["isClosable",1,0,"is-closable",4],["subheading",1,0,1,2],["type",1,0,1,2]],1],["yoo-card-image","yoo-ag-grid",1,[["entry",1],["host",64],["imageHeight",16],["imageWidth",16]],1],["yoo-card-lesson","yoo-ag-grid",1,[["host",64],["lesson",1]],1],["yoo-card-list","yoo-ag-grid",1,[["actionButtonTitle",1,0,"action-button-title",2],["animationName",1,0,"animation-name",2],["avatarImgs",1],["entry",1],["horizontal",16],["host",64],["imageHeight",16],["imageWidth",16],["isActivable",1,0,"is-activable",4],["isActive",16],["isCollapsed",2,0,"is-collapsed",4],["showContextMenu",16]],1],["yoo-card-media","yoo-card-media",1,[["bottomActions",1],["extraActions",1],["host",64],["participant",1],["showEmptyPlaceholder",16],["showRedialButton",16]],1],["yoo-card-placeholder","yoo-ag-grid",1,[["displayType",1,0,"display-type",2],["entityType",1,0,"entity-type",2],["header",1,0,1,2],["host",64]],1],["yoo-card-question","yoo-ag-grid",1,[["entry",1],["host",64],["imageHeight",16],["imageWidth",16]],1],["yoo-card-sticky","yoo-ag-grid",1,[["entry",1],["host",64],["imageHeight",16],["imageWidth",16],["showEllipsis",16],["type",1,0,1,2]],1],["yoo-chart","yoo-chart",1,[["config",1,0,1,1],["definition",1],["host",64],["isFullScreen",1,0,"is-full-screen",4]],1],["yoo-chat","yoo-chat",1,[["closeIcon",1,0,"close-icon",2],["deleteModeEnabled",1,0,"delete-mode-enabled",4],["displayLoadMore",1,0,"display-load-more",4],["enableKeyboardResizing",1,0,"enable-keyboard-resizing",4],["heading",1,0,1,2],["host",64],["inputPlaceHolder",1,0,"input-place-holder",2],["isMultiple",1,0,"is-multiple",4],["loaded",16],["messages",1],["scrollHeight",16],["scrollToBottom",32],["scrollToTop",32],["usersTyping",1]],1],["yoo-chat-message","yoo-accordion",1,[["hideEmptyCheckbox",1,0,"hide-empty-checkbox",4],["host",64],["isFirst",1,0,"is-first",4],["isGroup",1,0,"is-group",4],["isLast",1,0,"is-last",4],["isNextImage",1,0,"is-next-image",4],["message",2]],1],["yoo-color-selector","yoo-accordion",1,[["colors",1],["currentColor",16],["host",64],["showTickIcon",1,0,"show-tick-icon",4]],1],["yoo-contact-detail","yoo-contact-detail",1,[["canChat",1,0,"can-chat",4],["host",64],["isUser",1,0,"is-user",4],["item",1]],1],["yoo-context-menu","yoo-context-menu",1,[["close",32],["contentButtons",1],["contentPosition",1],["host",64],["insideScroll",1,0,"inside-scroll",4],["open",32],["opened",16]],1,[["body:contextMenuOpened","onContextMenuOpened"]]],["yoo-count-down","yoo-count-down",1,[["host",64],["start",2,0,1,8]],1],["yoo-course-detail","yoo-course-detail",1,[["course",1],["courseProgress",2,0,"course-progress",8],["planDueDate",1,0,"plan-due-date",2]],1],["yoo-dashboard-detail","yoo-dashboard-detail",1,[["dashboard",1],["host",64]],1],["yoo-date","yoo-date",1,[["date",1],["format",1,0,1,2],["getPausedTime",32],["host",64],["pauseTimer",32],["resumeTimer",32],["startTime",1,0,"start-time",8],["time",16],["timerMode",1,0,"timer-mode",4]],1],["yoo-device","yoo-accordion",1,[["deviceEntry",1],["host",64]],1],["yoo-empty-state","yoo-empty-state",1,[["emptyText",1,0,"empty-text",2],["emptyTitle",16],["fadeIn",1,0,"fade-in",4],["hasText",1,0,"has-text",4],["host",64],["iconSrc",16],["type",1,0,1,2]],1],["yoo-entity","yoo-ag-grid",1,[["bottomActions",1],["clearable",1,0,1,4],["columnDefinition",1],["customModel",1],["displayType",1,0,"display-type",2],["entityType",1,0,"entity-type",2],["host",64],["iconColor",1,0,"icon-color",2],["icons",1],["isCollapsible",1,0,"is-collapsible",4],["isFramed",1,0,"is-framed",4],["isHistory",1,0,"is-history",4],["isMap",1,0,"is-map",4],["item",1,0,1,1],["items",1],["readonly",1,0,1,4],["secondaryActions",1],["secondaryActionsDropdown",1,0,"secondary-actions-dropdown",4],["topActions",1],["useTranslate",1,0,"use-translate",4]],1],["yoo-entity-search","yoo-entity-search",1,[["config",1],["host",64],["isLoading",16],["removeData",32],["updateData",32],["upsertData",32]],1],["yoo-entity-search-dialog","yoo-accordion",1,[["host",64],["isDirty",16],["model",1],["values",2]],1,[["hideTabbar","onHideTabbar"]]],["yoo-entity-search-filters","yoo-accordion",1,[["fields",1],["filters",16],["header",1,0,1,2],["host",64],["values",1]],1],["yoo-entity-search-recent","yoo-entity-search",1,[["header",1,0,1,2],["host",64],["setValues",32],["values",1]],1],["yoo-entity-search-sorts","yoo-accordion",1,[["fields",1],["header",1,0,1,2],["host",64],["sorts",16],["values",1]],1],["yoo-entity-search-tags","yoo-accordion",1,[["hideAdvancedFilters",1,0,"hide-advanced-filters",4],["host",64],["selects",16],["slidesOptions",16],["sortsAndFilters",1],["tags",1],["values",1]],1],["yoo-fab-button","yoo-fab-button",1,[["activated",1,0,1,4],["activatedState",16],["buttonClass",1,0,"button-class",2],["disabled",1,0,1,4],["fabEntry",1],["host",64],["icon",1,0,1,2],["inContainer",16],["inList",16],["label",1,0,1,2],["parentHasList",1,0,"parent-has-list",4],["text",1,0,1,2],["toggleActive",1]],1],["yoo-fab-container","yoo-fab-button",1,[["activated",16],["animated",1,0,1,4],["host",64]],1],["yoo-fab-list","yoo-fab-list",1,[["activated",1,0,1,4],["animated",1,0,1,4],["host",64],["mini",1,0,1,4],["side",1,0,1,2]],1],["yoo-feed-detail","yoo-feed-detail",1,[["feed",1],["hasGradient",16],["host",64],["imageEnlarged",16],["isOffline",1,0,"is-offline",4],["treatedSrc",16]],1],["yoo-field-validity","yoo-field-validity",1,[["explanation",1,0,1,2],["explanationDocument",1,0,"explanation-document",1],["host",64],["isValid",1,0,"is-valid",4]],1],["yoo-form-autocomplete","yoo-form-autocomplete",1,[["allowCustomTag",1,0,"allow-custom-tag",4],["asyncValidators",1],["clear",32],["clearable",1,0,1,4],["columnDefinition",1],["customModel",1],["displayType",1,0,"display-type",2],["emptyState",1,0,"empty-state",2],["entityType",1,0,"entity-type",2],["extraButtons",1],["hideContainer",32],["hideSelectionFromInput",1,0,"hide-selection-from-input",4],["hideTags",1,0,"hide-tags",4],["host",64],["iconPrefix",1,0,"icon-prefix",2],["idAttributeName",1,0,"id-attribute-name",2],["idOnly",1,0,"id-only",4],["inline",1,0,1,4],["isHistory",1,0,"is-history",4],["isLocal",2,0,"is-local",4],["max",1,0,1,8],["multiple",1,0,1,4],["name",1,0,1,2],["pageSize",2,0,"page-size",8],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["selection",16],["setValue",32],["showEmptyItemsAddNewTag",16],["showFormInput",16],["tag",1,0,1,4],["tagType",1,0,"tag-type",2],["tags",1],["updateValues",32],["useTranslate",1,0,"use-translate",4],["validators",1],["validity",2,0,1,4],["value",2,0,1,1],["values",2]],1],["yoo-form-autocomplete-dialog","yoo-ag-grid",1,[["allowCustomTag",1,0,"allow-custom-tag",4],["customModel",1],["displayType",1,0,"display-type",2],["emptyState",1,0,"empty-state",2],["entityType",1,0,"entity-type",2],["fullscreen",16],["hideTags",1,0,"hide-tags",4],["host",64],["idAttributeName",1,0,"id-attribute-name",2],["idOnly",1,0,"id-only",4],["isLoading",1,0,"is-loading",4],["isLocal",1,0,"is-local",4],["multiple",1,0,1,4],["openFullscreen",1,0,"open-fullscreen",4],["originalEntityType",1,0,"original-entity-type",2],["selection",16],["tag",1,0,1,4],["tags",1],["useTranslate",1,0,"use-translate",4],["value",2],["values",1]],1,[["searchInputFocused","onSwipeUp"]]],["yoo-form-barcode","yoo-form-barcode",1,[["asyncValidators",1],["hideValue",1,0,"hide-value",4],["host",64],["name",1,0,1,2],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["validators",1],["value",2,0,1,2]],1],["yoo-form-barcode-dialog","yoo-accordion",1,[["close",32],["enableKeyboardResizing",1,0,"enable-keyboard-resizing",4],["fnBarcodeResult",2,0,"fn-barcode-result",1],["fnOcrResult",2,0,"fn-ocr-result",1],["host",64],["inputMode",16],["mainMode",2,0,"main-mode",2],["ocrRegexes",1],["restartOcrScanner",32],["selectedOcrRegex",16],["textManualInput",16],["value",2,0,1,2]],1],["yoo-form-capture","yoo-camera-preview-dialog",1,[["algorithm",1],["algorithmDisplay",1,0,"algorithm-display",1],["allowAnnotate",1,0,"allow-annotate",4],["allowLibrary",1,0,"allow-library",4],["asyncValidators",1],["duration",1,0,1,8],["extraData",2,0,"extra-data",1],["host",64],["imageRecognitionResults",16],["isBackgroundProcess",1,0,"is-background-process",4],["isHistory",1,0,"is-history",4],["isImageRecognition",1,0,"is-image-recognition",4],["isProcessing",16],["isSelectorMode",16],["label",1,0,1,2],["max",1,0,1,8],["maxWidth",1,0,"max-width",8],["min",1,0,1,8],["multiple",1,0,1,4],["name",1,0,1,2],["placeholder",1,0,1,2],["processGeoloc",32],["processImageRecognitionResults",32],["readonly",1,0,1,4],["required",1,0,1,4],["saveGeoloc",1,0,"save-geoloc",4],["selectedIndex",16],["setFieldValue",32],["showImageLoader",16],["stopImageRecognitionProcess",32],["tags",1],["type",2,0,1,2],["updateAutocompleteValues",32],["updateData",32],["useGallery",1,0,"use-gallery",4],["validators",2],["validity",16],["value",2,0,1,2]],1],["yoo-form-capture-tag-dialog","yoo-camera-preview-dialog",1,[["host",64],["imageHeight",1,0,"image-height",8],["imageSrc",1,0,"image-src",2],["imageWidth",1,0,"image-width",8],["tags",1],["value",1,0,1,1]],1],["yoo-form-capture-view-dialog","yoo-camera-preview-dialog",1,[["allowAnnotate",1,0,"allow-annotate",4],["edit",1,0,1,1],["host",64],["imageRecognitionDisplay",1,0,"image-recognition-display",1],["imageRecognitionResults",1],["isStitch",1,0,"is-stitch",4],["label",1,0,1,2],["preview",1,0,1,1]],1],["yoo-form-capture-webcam-dialog","yoo-ag-grid",1,[["device",1,0,1,1],["host",64]],1],["yoo-form-catalog","yoo-form-barcode",1,[["asyncValidators",1],["catalog",1,0,1,2],["host",64],["isCheck",1,0,"is-check",4],["isHistory",1,0,"is-history",4],["isInventory",1,0,"is-inventory",4],["isPresence",1,0,"is-presence",4],["multiple",1,0,1,4],["name",1,0,1,2],["notFoundError",16],["products",1],["readonly",1,0,1,4],["tags",1],["updateValues",32],["validators",1],["validity",2,0,1,4],["value",2]],1],["yoo-form-catalog-dialog","yoo-form-barcode",1,[["heading",1,0,1,2],["host",64],["pictureHeight",16],["pictureWidth",16],["product",1],["sizeText",16]],1],["yoo-form-categorize-words","yoo-form-categorize-words",1,[["answer",2],["asyncValidators",1],["categories",2],["host",64],["isValid",32],["readonly",1,0,1,4],["required",1,0,1,4],["type",1,0,1,2],["validators",1],["validity",2,0,1,4],["value",2],["values",2]],1],["yoo-form-checkbox","yoo-form-checkbox",1,[["asyncValidators",1],["header",1,0,1,2],["host",64],["name",1,0,1,2],["onCheckboxClick",32],["readonly",1,0,1,4],["required",1,0,1,4],["type",1,1,1,2],["validators",1],["value",2,0,1,4]],1],["yoo-form-checklist","yoo-form-checklist",1,[["asyncValidators",1],["currentTasks",1],["host",64],["isHistory",1,0,"is-history",4],["multiple",1,0,1,4],["name",1,0,1,2],["placeholder",1,0,1,2],["previousTasks",1],["readonly",1,0,1,4],["validators",1],["value",2]],1],["yoo-form-choice","yoo-form-choice",1,[["allowOther",1,0,"allow-other",4],["asyncValidators",1],["description",1,0,1,2],["host",64],["images",1],["inputIndex",1,0,"input-index",8],["isHistory",1,0,"is-history",4],["multiple",1,0,1,4],["name",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["selection",16],["sentence",1,0,1,2],["showOther",16],["slideIndex",1,0,"slide-index",8],["type",1,0,1,2],["useTranslate",1,0,"use-translate",4],["validators",1],["validity",2,0,1,4],["value",2,0,1,1],["values",2],["valuesColor",1]],1],["yoo-form-color-field","yoo-form-color-field",1,[["hexInput",1,0,"hex-input",4],["host",64],["hsvaInput",1,0,"hsva-input",4],["name",1,0,1,2],["position",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["rgbaInput",1,0,"rgba-input",4],["value",2,0,1,1]],1],["yoo-form-color-picker","yoo-form-color-picker",1,[["color",1,0,1,2],["currentColor",16],["hideLabel",1,0,"hide-label",4],["host",64]],1],["yoo-form-connect","yoo-form-connect",1,[["answer",2],["asyncValidators",1],["host",64],["isValid",32],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["type",1,0,1,2],["validators",1],["validity",2,0,1,4],["value",2],["values",2]],1],["yoo-form-creator","yoo-accordion",1,[["host",64],["missionDescription",1],["selectedDevice",16],["selectedLeftSelection",16],["selectedPageIndex",16],["setSelectedPage",32],["showLivePreview",16]],1],["yoo-form-creator-block-expandable","yoo-accordion",1,[["formField",1],["host",64],["isExpanded",16]],1],["yoo-form-creator-block-simple","yoo-accordion",1,[["formField",1],["host",64]],1],["yoo-form-creator-header","yoo-accordion",1,[["formTitle",1,0,"form-title",2],["host",64],["isLivePreviewVisible",1,0,"is-live-preview-visible",4]],1],["yoo-form-creator-page-card","yoo-accordion",1,[["host",64],["pageCardEntry",1]],1],["yoo-form-date-time","yoo-accordion",1,[["allowOcr",1,0,"allow-ocr",4],["autofocus",1,0,1,4],["clearable",1,0,1,4],["externalValidators",1],["extraClass",1,0,"extra-class",2],["getElement",32],["host",64],["iconSuffix",1,0,"icon-suffix",2],["isCordovaDatePicker",16],["isCustomDatePickerOpen",16],["isNativeDatePickerOpen",16],["isRange",1,0,"is-range",4],["isSchedule",1,0,"is-schedule",4],["maxDate",1],["minDate",1],["name",1,0,1,2],["nativePickerLabelColor",1,0,"native-picker-label-color",2],["placeholder",1,0,1,2],["placeholdertolabel",1,0,1,4],["readonly",1,0,1,4],["required",1,0,1,4],["type",1,0,1,2],["validators",2],["validity",2,0,1,4],["value",2,0,1,1]],1,[["body:click","isClickBlur"]]],["yoo-form-document","yoo-form-document",1,[["document",1],["host",64],["name",1,0,1,2],["readonly",1,0,1,4],["showDialog",1,0,"show-dialog",4],["type",1,0,1,2],["useGallery",1,0,"use-gallery",4],["validity",2,0,1,4]],1],["yoo-form-document-dialog","yoo-form-document-dialog",1,[["document",1],["host",64],["isAnimationFinished",1,0,"is-animation-finished",4],["isLoading",16],["modalMode",1,0,"modal-mode",4],["modalTitle",1,0,"modal-title",2],["previousPlayerState",1,0,"previous-player-state",8],["startTime",1,0,"start-time",1],["type",2,0,1,2]],1],["yoo-form-dynamic","yoo-field-validity",1,[["activeIndex",16],["afterFetchCustomData",32],["animated",1,0,1,4],["charts",1],["currentData",16],["data",1],["detailComponent",1,0,"detail-component",2],["dirty",2,0,1,4],["extraButtons",1],["failedSubmission",16],["fieldsState",16],["findPreviousValue",32],["forceFieldUpdate",32],["forceReadonly",1,0,"force-readonly",4],["formType",1,0,"form-type",2],["geoloc",1],["goToRecap",32],["goToSlide",32],["gradientClass",1,0,"gradient-class",2],["hasOneFieldPerPage",1,0,"has-one-field-per-page",4],["hideOptional",1,0,"hide-optional",4],["highlightInvalidFields",32],["history",1],["host",64],["injector",1,0,1,1],["isHistoryContentOverflowing",16],["isKeyboardPresent",16],["lessonType",1,0,"lesson-type",2],["onSlideNext",32],["onSlidePrevious",32],["progress",2],["remainingTime",16],["scrollToPoint",32],["scrollable",1,0,1,4],["secondaryFieldsState",16],["setScrollSpacerHeight",32],["showAnswers",1,0,"show-answers",4],["showHistoryModal",16],["showPreview",1,0,"show-preview",4],["showRecap",1,0,"show-recap",4],["showSave",1,0,"show-save",4],["showTabs",1,0,"show-tabs",4],["skipValidation",1,0,"skip-validation",4],["slides",1],["slidesState",16],["suffix",1,0,1,2],["timer",1,0,1,8],["useGallery",1,0,"use-gallery",4],["validity",16]],1,[["body:ionModalWillPresent","onIonModalWillPresent"],["inputFocused","onInputFocused"]]],["yoo-form-dynamic-dialog","yoo-ag-grid",1,[["currentData",16],["data",1],["forceReadonly",1,0,"force-readonly",4],["header",1,0,1,2],["host",64],["onFieldFetchData",1,0,"on-field-fetch-data",1],["showRecap",1,0,"show-recap",4],["showTabs",1,0,"show-tabs",4],["slides",1],["suffix",1,0,1,2],["validity",16]],1],["yoo-form-dynamic-history-dialog","yoo-form-dynamic-history-dialog",1,[["field",1,0,1,1],["historyData",1,0,"history-data",1],["host",64],["isModal",1,0,"is-modal",1],["suffix",1,0,1,1]],1],["yoo-form-emailreport","yoo-form-emailreport",1,[["asyncValidators",1],["fieldValues",1],["host",64],["name",1,0,1,2],["readonly",1,0,1,4],["stateful",1,0,1,4],["tags",1],["updateValues",32],["validators",1],["validity",2,0,1,4],["value",2]],1],["yoo-form-feedback","yoo-form-feedback",1,[["asyncValidators",1],["host",64],["isHistory",1,0,"is-history",4],["name",1,0,1,2],["readonly",1,0,1,4],["validators",1],["value",2,0,1,8]],1],["yoo-form-footer","yoo-accordion",1,[["buttons",1],["host",64],["onHideShowTabbar",32],["timerStart",1,0,"timer-start",1]],1,[["sendTimerCountDownState","onListenTimerCounterValue"]]],["yoo-form-formula","yoo-form-formula",1,[["asyncValidators",1],["host",64],["name",1,0,1,2],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["type",1,0,1,2],["validators",1],["validity",2,0,1,4],["value",2,0,1,8]],1],["yoo-form-iframe","yoo-form-iframe",1,[["asyncValidators",1],["host",64],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["source",1,0,1,2],["type",1,0,1,2],["validators",1],["value",2,0,1,1]],1],["yoo-form-image-tagging","yoo-form-image-tagging",1,[["annotations",1],["answer",1],["asyncValidators",1],["host",64],["imageData",1],["isRendered",16],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["slideIndex",1,0,"slide-index",8],["type",1,0,1,2],["validators",1],["validity",16],["value",2],["values",2]],1],["yoo-form-input","yoo-form-input",1,[["asyncValidators",1],["autocapitalize",1,0,1,2],["autocorrect",1,0,1,2],["clear",32],["clearable",1,0,1,4],["debounce",1,0,1,8],["disabled",1,0,1,4],["externalValidators",1],["forceValueUpdate",1,0,"force-value-update",4],["getElement",32],["host",64],["iconPrefix",1,0,"icon-prefix",2],["iconSuffix",1,0,"icon-suffix",2],["inputType",16],["isValidityNotEmpty",32],["max",1,1,1,2],["min",1,1,1,2],["name",1,0,1,2],["placeholder",1,0,1,2],["placeholdertolabel",1,0,1,4],["readonly",1,0,1,4],["required",1,0,1,4],["setFocus",32],["showPasswordToggle",1,0,"show-password-toggle",4],["step",1,0,1,8],["tooltip",1,0,1,2],["type",1,0,1,2],["uiValidation",1],["validators",1],["validity",2,0,1,4],["value",2,0,1,1]],1],["yoo-form-input-container","yoo-form-input-container",1,[["checkboxLine",16],["comments",1,0,1,2],["field",1],["forceReadonly",1,0,"force-readonly",4],["formLocation",16],["hideOptional",1,0,"hide-optional",4],["host",64],["invalid",1,0,1,4],["readonly",1,0,1,4],["required",1,0,1,4],["showComments",16],["toggleLine",16]],1],["yoo-form-input-game","yoo-form-input-game",1,[["fieldId",1,0,"field-id",2],["gameName",1,0,"game-name",2],["host",64],["isGameOver",16],["name",1,0,1,2],["phaser",1,0,1,1]],1],["yoo-form-json","yoo-form-json",1,[["asyncValidators",1],["host",64],["readonly",1,0,1,4],["required",1,0,1,4],["validators",1],["value",2,0,1,2]],1],["yoo-form-location","yoo-form-location",1,[["aroundMe",16],["asyncValidators",1],["host",64],["isHistory",1,0,"is-history",4],["multiple",1,0,1,4],["name",1,0,1,2],["readonly",1,0,1,4],["tags",1],["updateValues",32],["validators",1],["validity",2,0,1,4],["value",2]],1],["yoo-form-missing-word","yoo-form-missing-word",1,[["answer",2],["asyncValidators",1],["host",64],["isRendered",16],["isValid",32],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["sentence",2,0,1,2],["slideIndex",1,0,"slide-index",8],["type",1,0,1,2],["validators",1],["validity",2,0,1,4],["value",2],["values",2]],1],["yoo-form-number-picker","yoo-form-number-picker",1,[["asyncValidators",1],["clearable",1,0,1,4],["host",64],["isValid",32],["max",1,0,1,8],["min",1,0,1,8],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["selection",16],["setValue",32],["type",1,0,1,2],["validators",1],["validity",2,0,1,4],["value",2,0,1,8]],1],["yoo-form-number-picker-dialog","yoo-form-number-picker",1,[["fullscreen",16],["host",64],["selection",16],["value",2,0,1,1],["values",2]],1,[["body:ionModalDidPresent","handleModalPresent"]]],["yoo-form-product-batch","yoo-form-product-batch",1,[["asyncValidators",1],["host",64],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["type",1,0,1,2],["validators",1],["value",2]],1],["yoo-form-progress-indicator","yoo-field-validity",1,[["contextStep",16],["currentStep",1,0,"current-step",8],["displayMode",1,0,"display-mode",2],["host",64],["isCompleted",1,0,"is-completed",4],["lockIndex",1],["shownSteps",16],["steps",1]],1],["yoo-form-radio","yoo-form-radio",1,[["disabled",1,0,1,4],["host",64],["name",1,0,1,2],["state",2,0,1,2],["text",1,0,1,2]],1],["yoo-form-radio-group","yoo-form-radio-group",1,[["host",64],["items",16],["multiple",1,0,1,4],["name",1,0,1,2],["values",1]],1],["yoo-form-range","yoo-form-range",1,[["asyncValidators",1],["double",1,0,1,4],["host",64],["max",1,0,1,8],["min",1,0,1,8],["name",1,0,1,2],["placeholder",1,0,1,2],["readonly",1,0,1,4],["validators",1],["validity",2,0,1,4],["value",2,0,1,8]],1],["yoo-form-ranking","yoo-form-ranking",1,[["answers",1],["host",64],["readonly",1,0,1,4],["required",1,0,1,4],["value",2],["values",1]],1],["yoo-form-recap-step","yoo-field-validity",1,[["host",64],["locked",1,0,1,4],["mainTitle",1,0,"main-title",2],["step",1],["stepNumber",1,0,"step-number",8],["subTitle",1,0,"sub-title",2]],1],["yoo-form-signature-pad","yoo-form-signature-pad",1,[["asyncValidators",1],["host",64],["isHistory",1,0,"is-history",4],["name",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["validators",1],["value",2,0,1,2]],1],["yoo-form-signature-pad-dialog","yoo-form-signature-pad",1,[["hasContent",16],["host",64],["isAnimationFinished",1,0,"is-animation-finished",4],["readonly",1,0,1,4],["value",1,0,1,2]],1],["yoo-form-slider","yoo-form-slider",1,[["disabled",1,0,1,4],["doubleSlider",1,0,"double-slider",4],["hideLabel",1,0,"hide-label",4],["hideReferences",1,0,"hide-references",4],["host",64],["initialLowValue",2,0,"initial-low-value",8],["initialValue",1,0,"initial-value",8],["maximum",2,0,1,8],["minimum",2,0,1,8],["name",1,0,1,2],["secondValue",16],["step",1,0,1,8],["triangleColor",1,0,"triangle-color",2],["value",16]],1],["yoo-form-star-rating","yoo-ag-grid",1,[["asyncValidators",1],["host",64],["isHistory",1,0,"is-history",4],["max",1,0,1,8],["name",1,0,1,2],["readonly",1,0,1,4],["type",1,0,1,2],["validators",1],["value",2,0,1,8]],1],["yoo-form-swipe-cards","yoo-form-swipe-cards",1,[["answer",1],["asyncValidators",1],["cardPositions",16],["categories",2],["description",1,0,1,2],["host",64],["images",2],["instructionsDocument",1],["isCardIndexCurrent",16],["label",1,0,1,2],["mode",1,0,1,2],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["showInstructions",16],["swipingClass",16],["validators",1],["value",2],["values",2]],1],["yoo-form-task","yoo-field-validity",1,[["asyncValidators",1],["hideTitle",1,0,"hide-title",4],["host",64],["isHistory",1,0,"is-history",4],["name",1,0,1,2],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["setSlides",32],["type",1,0,1,2],["validators",1],["validity",2,0,1,4],["value",2]],1,[["parent:taskClicked","onTaskClicked"]]],["yoo-form-text-area","yoo-ag-grid",1,[["asyncValidators",1],["clear",32],["disableEnter",1,0,"disable-enter",4],["host",64],["initialRows",1,0,"initial-rows",8],["maxRows",1,0,"max-rows",8],["name",1,0,1,2],["placeholder",1,0,1,2],["readonly",1,0,1,4],["resizable",1,0,1,2],["rows",16],["setFocus",32],["validateInput",1,0,"validate-input",4],["validators",1],["validity",2,0,1,4],["value",2,0,1,2]],1],["yoo-form-text-editor","yoo-form-text-editor",1,[["asyncValidators",1],["host",64],["readonly",1,0,1,4],["required",1,0,1,4],["validators",1],["value",2,0,1,2]],1],["yoo-form-time","yoo-accordion",1,[["asyncValidators",1],["clearable",1,0,1,4],["host",64],["is24Hour",16],["isCordovaTimePicker",16],["isCordovaTimePickerOpen",16],["isSchedule",1,0,"is-schedule",4],["maxDate",1],["minDate",1],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["timePeriod",16],["type",1,0,1,2],["validators",1],["validity",2,0,1,4],["value",2,0,1,1]],1],["yoo-form-timer","yoo-form-timer",1,[["calculatedTime",16],["host",64],["name",1,0,1,2],["smallWindowSize",16],["timeChanged",32]],1],["yoo-form-todo","yoo-form-todo",1,[["allPhotosRequired",1,0,"all-photos-required",4],["allowLibrary",1,0,"allow-library",4],["asyncValidators",1],["host",64],["linked",1,0,1,4],["name",1,0,1,2],["placeholder",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["setSlides",32],["type",1,0,1,2],["validators",1],["validity",2,0,1,4],["value",2],["values",1]],1],["yoo-form-todo-dialog","yoo-form-todo",1,[["allPhotosRequired",1,0,"all-photos-required",4],["allowLibrary",1,0,"allow-library",4],["host",64],["linked",1,0,1,4],["onFieldFetchData",1,0,"on-field-fetch-data",1],["slidesTodo",1],["slidesTodoTask",1],["todo",2],["validity",16],["values",1]],1,[["fieldFetchData","onInternalFieldFetchData"],["dataChanged","onDataChanged"],["inputChanged","onInputChanged"],["enterPressed","onEnterPressed"]]],["yoo-form-todo-single","yoo-form-todo-single",1,[["host",64],["readonly",1,0,1,4],["showComments",16],["type",1,0,1,2],["values",1],["valuesState",16]],1],["yoo-form-toggle","yoo-ag-grid",1,[["asyncValidators",1],["header",1,0,1,2],["host",64],["name",1,0,1,2],["readonly",1,0,1,4],["required",1,0,1,4],["type",1,1,1,2],["validators",1],["value",2,0,1,4]],1],["yoo-form-uploader","yoo-form-uploader",1,[["asyncValidators",1],["extensions",1],["host",64],["multiple",1,0,1,4],["readonly",1,0,1,4],["required",1,0,1,4],["validators",1],["value",2,0,1,4]]],["yoo-form-videoplayer","yoo-ag-grid",1,[["autoplay",1,0,1,4],["disableHeader",1,0,"disable-header",4],["disableSeekbar",2,0,"disable-seekbar",4],["enableModalFullscreen",1,0,"enable-modal-fullscreen",4],["fullscreen",1,0,1,4],["fullscreenModal",16],["getCurrentTime",32],["hideFullscreen",1,0,"hide-fullscreen",4],["host",64],["isInsideForm",1,0,"is-inside-form",4],["isModal",1,0,"is-modal",4],["isVisible",1,0,"is-visible",4],["mediaType",1,0,"media-type",2],["modalMode",1,0,"modal-mode",4],["name",1,0,1,2],["pauseVideo",32],["playsOnFullscreen",1,0,"plays-on-fullscreen",4],["poster",16],["previousPlayerState",1,0,"previous-player-state",8],["readonly",1,0,1,4],["source",1,0,1,2],["startTime",1,0,"start-time",1],["type",1,0,1,1],["updateCurrentTime",32],["url",16],["videoPlayed",16],["wrapperHeight",16]],1],["yoo-from-creator-page-card-list","yoo-accordion",1,[["host",64],["missionSlides",1],["selectPageIndexState",16],["selectedPageIndex",1,0,"selected-page-index",8]],1],["yoo-grid","yoo-ag-grid",1,[["allowCustomTag",1,0,"allow-custom-tag",4],["animated",1,0,1,4],["bottomActions",1],["clearSelection",32],["clearTags",1,0,"clear-tags",4],["closeItemsSliding",32],["columnDefs",1],["currentPosition",1],["customModel",1],["direction",1,0,1,2],["displayModes",1],["displayType",2,0,"display-type",2],["emptyState",1,0,"empty-state",2],["emptyStateButtonText",1,0,"empty-state-button-text",2],["emptyStateDescription",1,0,"empty-state-description",2],["emptyStateHandler",1],["entityType",1,0,"entity-type",2],["extraClass",1,0,"extra-class",2],["forceAddNewTag",1,0,"force-add-new-tag",4],["forceHeading",1,0,"force-heading",4],["globalActions",1],["gridConfig",1],["hasVerticalLine",1,0,"has-vertical-line",4],["headerDivs",16],["headerFn",1],["heading",1,0,1,2],["hideAdvancedFilters",1,0,"hide-advanced-filters",4],["hideEmptyState",1,0,"hide-empty-state",4],["hideFooter",1,0,"hide-footer",4],["hideHeader",1,0,"hide-header",4],["hideRefreshButton",1,0,"hide-refresh-button",4],["hideTags",1,0,"hide-tags",4],["hideTotal",1,0,"hide-total",4],["host",64],["iconDisplayNext",16],["icons",1],["idAttributeName",1,0,"id-attribute-name",2],["idOnly",1,0,"id-only",4],["infiniteScrollDisabled",1,0,"infinite-scroll-disabled",4],["initialSelection",1],["isCollapsible",1,0,"is-collapsible",4],["isCompact",1,0,"is-compact",4],["isFrameExpanded",16],["isFramed",1,0,"is-framed",4],["isGeoLocEntity",1,0,"is-geo-loc-entity",4],["isLoading",1,0,"is-loading",4],["isLocal",1,0,"is-local",4],["isReadonly",1,0,"is-readonly",4],["isSelectAll",16],["isSelectionMode",2,0,"is-selection-mode",4],["items",1],["keepSelection",1,0,"keep-selection",4],["loadMoreButton",1,0,"load-more-button",4],["markers",16],["model",1],["multiple",1,0,1,4],["pageSize",2,0,"page-size",8],["progress",1,0,1,8],["progressCss",1,0,"progress-css",2],["progressbarAlignMode",1,0,"progressbar-align-mode",2],["pullToRefresh",32],["resetSearchText",32],["scrollItem",32],["scrollable",1,0,1,4],["search",1,0,1,2],["searchBarPlaceholder",1,0,"search-bar-placeholder",2],["searchFieldOutsideComponent",1,0,"search-field-outside-component",4],["secondaryActions",1],["secondaryActionsDropdown",1,0,"secondary-actions-dropdown",4],["selectedTags",1],["selection",16],["showActionsAsMore",1,0,"show-actions-as-more",4],["showCreate",1,0,"show-create",4],["showFilters",1,0,"show-filters",4],["showGlobalActions",1,0,"show-global-actions",4],["showSearch",1,0,"show-search",4],["slidesOptions",16],["sortsAndFilters",2],["subheading",1,0,1,2],["tags",1],["topActions",1],["total",1,0,1,8],["useTranslate",1,0,"use-translate",4],["valuesColor",1]],1],["yoo-healthscore","yoo-healthscore",1,[["displayMode",1,0,"display-mode",2],["evolutions",16],["host",64],["modalHost",1],["score",16],["scores",1]],1],["yoo-healthscore-dialog","yoo-healthscore",1,[["evolution",16],["evolutions",1],["hideToolbar",1,0,"hide-toolbar",4],["host",64],["selectedMode",16]],1],["yoo-icon","yoo-ag-grid",1],["yoo-img","yoo-img",1,[["alt",1,0,1,2],["contain",1,0,1,4],["disabled",1,0,1,4],["finalSrc",16],["height",1,0,1,2],["host",64],["isElementVisible",16],["loadStrategy",1,0,"load-strategy",2],["showFallback",1,0,"show-fallback",4],["showFallbackIcon",16],["src",1,0,1,2],["type",1,0,1,2]],2],["yoo-info-text","yoo-info-text",1,[["host",64],["text",1,0,1,2]],1],["yoo-input-bar","yoo-chat",1,[["actionText",1,0,"action-text",2],["focusInputField",32],["focusOnOpen",1,0,"focus-on-open",4],["hasTextInside",16],["host",64],["icon",1,0,1,2],["iconAction",1,0,"icon-action",2],["keepFocusAfterAction",1,0,"keep-focus-after-action",4],["placeholder",2,0,1,2],["replyToUser",2],["topIndication",1,0,"top-indication",2],["value",2,0,1,2]],1],["yoo-ion-action-sheet-controller","yoo-action-sheet",0,[["create",32],["dismiss",32],["doc",4,0,0,0,"document"],["getTop",32]],0,[["body:ionModalWillPresent","actionSheetWillPresent"],["body:ionActionSheetWillDismiss","actionSheetWillDismiss"],["body:ionActionSheetDidUnload","actionSheetWillDismiss"],["body:keyup","escapeKeyUp"]]],["yoo-ion-alert-controller","yoo-alert",0,[["create",32],["dismiss",32],["doc",4,0,0,0,"document"],["getTop",32]],0,[["body:ionModalWillPresent","alertWillPresent"],["body:ionAlertWillDismiss","alertWillDismiss"],["body:ionAlertDidUnload","alertWillDismiss"],["body:keyup","escapeKeyUp"]]],["yoo-ion-button","yoo-ion-button",1,[["buttonType",2,0,"button-type",2],["color",1,0,1,2],["disabled",1,1,1,4],["el",64],["expand",1,1,1,2],["fill",2,1,1,2],["href",1,0,1,2],["keyFocus",16],["routerDirection",1,0,"router-direction",2],["shape",1,1,1,2],["size",1,1,1,2],["strong",1,0,1,4],["tapAnimation",1,0,"tap-animation",4],["type",1,0,1,2]],1],["yoo-ion-buttons","yoo-ag-grid",1,[["halfScreen",1,0,"half-screen",4]],2],["yoo-ion-content","yoo-ag-grid",1,[["el",64],["forceOverscroll",1,0,"force-overscroll",4],["fullscreen",1,0,1,4],["getScrollElement",32],["queue",4,0,0,0,"queue"],["scrollEnabled",1,0,"scroll-enabled",4],["scrollEvents",1,0,"scroll-events",4]],2,[["body:ionNavDidChange","onNavChanged"]]],["yoo-ion-footer","yoo-ion-footer",1],["yoo-ion-gesture","yoo-ion-gesture",0,[["attachTo",1,0,"attach-to",2],["canStart",1],["direction",1,0,1,2],["disableScroll",1,0,"disable-scroll",4],["disabled",1,0,1,4],["enableListener",4,0,0,0,"enableListener"],["gestureCtrl",8,0,0,0,"yoo-ion-gesture-controller"],["gestureName",1,0,"gesture-name",2],["gesturePriority",1,0,"gesture-priority",8],["isServer",4,0,0,0,"isServer"],["maxAngle",1,0,"max-angle",8],["notCaptured",1],["onEnd",1],["onMove",1],["onStart",1],["onWillStart",1],["passive",1,0,1,4],["queue",4,0,0,0,"queue"],["threshold",1,0,1,8]],0,[["touchstart","onTouchStart",0,1],["mousedown","onMouseDown",0,1],["touchmove","onTouchMove",0,1],["document:mousemove","onMoveMove",0,1],["touchcancel","onTouchCancel",0,1],["touchend","onTouchCancel",0,1],["document:mouseup","onMouseUp",0,1]]],["yoo-ion-gesture-controller","yoo-ion-gesture",0,[["create",32],["createBlocker",32]]],["yoo-ion-header","yoo-ag-grid",1],["yoo-ion-infinite-scroll","yoo-accordion",1,[["complete",32],["disabled",1,0,1,4],["el",64],["enableListener",4,0,0,0,"enableListener"],["isLoading",16],["position",1,0,1,2],["queue",4,0,0,0,"queue"],["threshold",1,0,1,2],["waitFor",32]],0,[["scroll","onScroll",0,1]]],["yoo-ion-infinite-scroll-content","yoo-ag-grid",1,[["loadingSpinner",2,0,"loading-spinner",2],["loadingText",1,0,"loading-text",2]]],["yoo-ion-item","yoo-accordion",1,[["button",1,0,1,4],["color",1,0,1,2],["detail",1,0,1,4],["detailIcon",1,0,"detail-icon",2],["disabled",1,0,1,4],["el",64],["href",1,0,1,2],["lines",1,0,1,2],["routerDirection",1,0,"router-direction",2],["state",1,0,1,2]],1,[["ionStyle","itemStyle"]]],["yoo-ion-item-divider","yoo-ag-grid",1,[["color",1,0,1,2],["el",64]],1],["yoo-ion-item-options","yoo-accordion",1,[["el",64],["fireSwipeEvent",32],["side",1,0,1,2]]],["yoo-ion-item-sliding","yoo-accordion",1,[["close",32],["el",64],["getOpenAmount",32],["getSlidingRatio",32],["slidingType",1,0,"sliding-type",2],["state",16],["updateOptions",32]]],["yoo-ion-list","yoo-accordion",1,[["closeSlidingItems",32],["getOpenItem",32],["inset",1,0,1,4],["lines",1,0,1,2],["setOpenItem",32]]],["yoo-ion-modal","yoo-ion-modal",1,[["component",1,0,1,2],["componentInstance",2,0,"component-instance",1],["componentProps",1],["cssClass",1,0,"css-class",2],["delegate",1],["dismiss",32],["displayFullscreenButton",1,0,"display-fullscreen-button",4],["enableBackdropDismiss",1,0,"enable-backdrop-dismiss",4],["enterAnimation",1,0,"enter-animation",2],["forceCustomAnimationOnWeb",1,0,"force-custom-animation-on-web",4],["fullscreen",16],["host",64],["keyboardClose",1,0,"keyboard-close",4],["leaveAnimation",1,0,"leave-animation",2],["onDidDismiss",32],["onWillDismiss",32],["overlayId",1,0,"overlay-id",8],["present",32],["showBackdrop",1,0,"show-backdrop",4],["willAnimate",1,0,"will-animate",4]],2,[["ionDismiss","onDismiss"],["ionBackdropTap","onBackdropTap"],["ionModalDidPresent","lifecycle"],["ionModalWillPresent","lifecycle"],["ionModalWillDismiss","lifecycle"],["ionModalDidDismiss","lifecycle"],["ionModalDidPresent","onDidPresent"],["searchInputFocused","onInputFocused"],["inputFocused","onInputFocused"],["swipedUp","onInputFocused"],["swipedDown","onSwipeDown"]]],["yoo-ion-modal-controller","yoo-ion-modal",0,[["create",32],["dismiss",32],["doc",4,0,0,0,"document"],["getTop",32]],0,[["body:ionModalWillPresent","modalWillPresent"],["body:ionModalWillDismiss","modalWillDismiss"],["body:ionModalDidUnload","modalWillDismiss"],["body:keyup","escapeKeyUp"]]],["yoo-ion-refresher","yoo-accordion",1,[["cancel",32],["closeDuration",1,0,"close-duration",2],["complete",32],["disabled",1,0,1,4],["el",64],["getProgress",32],["pullMax",1,0,"pull-max",8],["pullMin",1,0,"pull-min",8],["queue",4,0,0,0,"queue"],["snapbackDuration",1,0,"snapback-duration",2],["state",16]]],["yoo-ion-refresher-content","yoo-accordion",0,[["pullingText",1,0,"pulling-text",2],["refreshingText",1,0,"refreshing-text",2]]],["yoo-ion-scroll","yoo-ion-scroll",1,[["el",64],["forceOverscroll",2,0,"force-overscroll",4],["height",1,0,1,2],["horizontalMode",1,0,"horizontal-mode",4],["isScrollDistanceBiggerThanScroll",32],["queue",4,0,0,0,"queue"],["refresh",32],["scrollByPoint",32],["scrollEvents",1,0,"scroll-events",4],["scrollToBottom",32],["scrollToPoint",32],["scrollToTop",32],["showScrollbar",1,0,"show-scrollbar",4]],1,[["scroll","onScroll",0,1],["window:mousewheel","onMouseWheel",0,1],["mouseover","onMouseEnter",0,1],["mouseout","onMouseLeave",0,1]]],["yoo-ion-slide","yoo-ion-slide",1],["yoo-ion-slides","yoo-ion-slide",1,[["el",64],["getActiveIndex",32],["getPreviousIndex",32],["initialSlide",1,0,"initial-slide",8],["isBeginning",32],["isEnd",32],["length",32],["lockSwipeToNext",32],["lockSwipeToPrev",32],["lockSwipes",32],["navigation",1,0,1,4],["options",1,0,1,1],["pager",1,0,1,4],["scrollbar",1,0,1,4],["slideNext",32],["slidePrev",32],["slideTo",32],["startAutoplay",32],["stopAutoplay",32],["syncSlideHeight",32],["update",32]],0,[["body:keyup","onkeypress"],["ionSlideChanged","onSlideChanged"]]],["yoo-ion-title","yoo-ion-title",1,[["color",1,0,1,2],["halfScreen",1,0,"half-screen",4]],1],["yoo-ion-toast-controller","yoo-ion-toast-controller",0,[["create",32],["dismiss",32],["doc",4,0,0,0,"document"],["getTop",32]],0,[["body:ionToastWillPresent","toastWillPresent"],["body:ionToastWillDismiss","toastWillDismiss"],["body:ionToastDidUnload","toastWillDismiss"],["body:keyup","escapeKeyUp"]]],["yoo-ion-toolbar","yoo-ion-toolbar",1,[["animateOnLoad",1,0,"animate-on-load",4],["centerTitle",1,0,"center-title",4],["color",1,0,1,2],["halfScreen",1,0,"half-screen",4],["host",64],["secondary",1,0,1,4],["translucent",1,0,1,4]],1],["yoo-kpi","yoo-kpi",1,[["config",1,0,1,1],["definition",1],["host",64],["isFullHeight",1,0,"is-full-height",4],["isFullScreen",1,0,"is-full-screen",4],["photoSrc",1,0,"photo-src",2],["type",1,0,1,2]],1],["yoo-kpi-container","yoo-kpi",1,[["config",1,0,1,1],["definition",1],["heading",1,0,1,2],["hideHeader",1,0,"hide-header",4],["host",64],["isFullHeight",1,0,"is-full-height",4],["isFullScreen",1,0,"is-full-screen",4],["type",1,0,1,2]],1],["yoo-kpi-external","yoo-kpi",1,[["config",1,0,1,1],["definition",1],["host",64],["isFullScreen",1,0,"is-full-screen",4]],1],["yoo-language-selector","yoo-banner",1,[["currentLanguage",1,0,"current-language",2],["host",64],["languages",1],["topPosition",1,0,"top-position",8]],1],["yoo-lesson-badges","yoo-lesson-badges",1,[["badges",1],["host",64]],1],["yoo-lesson-detail","yoo-lesson-badges",1,[["assignmentDate",1],["highscores",1],["host",64],["lesson",1],["lessonData",1],["scrollHeight",16]],1],["yoo-lesson-heading","yoo-lesson-badges",1,[["assignmentDate",1],["host",64],["lesson",1]],1],["yoo-lesson-highscores","yoo-lesson-badges",1,[["host",64],["ranks",1]],1],["yoo-lesson-question-result","yoo-lesson-question-result",1,[["earnedBadge",1,0,"earned-badge",2],["earnedPoints",1,0,"earned-points",8],["explanationDocument",1],["footerActions",2],["host",64],["lessonMinForCompliance",1,0,"lesson-min-for-compliance",8],["lessonTitle",1,0,"lesson-title",2],["lessonType",1,0,"lesson-type",2],["nbAnswered",1,0,"nb-answered",8],["nextLesson",1],["questionExplanation",1,0,"question-explanation",2],["resultType",1,0,"result-type",2],["showHeader",1,0,"show-header",4],["validated",1,0,1,4]],1],["yoo-loader","yoo-loader",1,[["height",1,0,1,8],["host",64],["maxValue",1,0,"max-value",8],["progress",1,0,1,8],["showFinishAnimation",1,0,"show-finish-animation",4],["showLoadingAnimation",32],["text",1,0,1,2]],1],["yoo-location-heading","yoo-location-heading",1,[["host",64],["lastVisitDate",1],["location",1]],1],["yoo-location-info","yoo-location-info",1,[["host",64],["location",1]],1],["yoo-location-map","yoo-location-map",1,[["host",64],["location",1,0,1,1]],1],["yoo-login","yoo-banner",1,[["backgroundColor",1,0,"background-color",2],["backgroundSrc",1,0,"background-src",2],["borderClass",1,0,"border-class",2],["buttonClass",1,0,"button-class",2],["currentLanguage",1,0,"current-language",2],["deviceInputFocused",16],["emailLabel",1,0,"email-label",2],["error",2,0,1,2],["forgotPasswordText",1,0,"forgot-password-text",2],["host",64],["inputFocused",16],["language",16],["languages",1],["leftPanelFooterText",1,0,"left-panel-footer-text",2],["leftPanelMobileHeaderIcon",1,0,"left-panel-mobile-header-icon",2],["leftPanelWebHeaderIcon",1,0,"left-panel-web-header-icon",2],["loading",1,0,1,4],["loginButtonText",1,0,"login-button-text",2],["magicLinkButtonText",1,0,"magic-link-button-text",2],["pageWidthSize",16],["passwordInputChanged",16],["passwordLabel",1,0,"password-label",2],["rememberMeText",1,0,"remember-me-text",2],["resetPasswordButtonText",1,0,"reset-password-button-text",2],["setStatusBarColor",32],["showLeftPanel",16],["showRememberMe",1,0,"show-remember-me",4],["showSupport",16],["version",1,0,1,2],["videoBackgroundUrl",1,0,"video-background-url",2],["videoHeaderIcon",2,0,"video-header-icon",2],["webLoginFormSubtitle",1,0,"web-login-form-subtitle",2],["webLoginFormTitle",1,0,"web-login-form-title",2],["webSubtitleText",1],["webTitleText",1,0,"web-title-text",2]],1],["yoo-map","yoo-amap",1,[["currentLanguage",1,0,"current-language",2],["disableZoom",1,0,"disable-zoom",4],["filterGroups",1],["fitToMarkers",1,0,"fit-to-markers",4],["flyTo",32],["forceReRender",16],["getCenter",32],["gridMapCardCollapsed",1,0,"grid-map-card-collapsed",4],["groupBy",1,0,"group-by",2],["host",64],["icon",1,0,1,2],["isChinese",16],["isGridMap",1,0,"is-grid-map",4],["isModal",1,0,"is-modal",4],["legendColors",1],["mapEntry",1],["markers",1],["maxZoom",1,0,"max-zoom",8],["minZoom",1,0,"min-zoom",8],["position",1],["setProps",32],["showControls",1,0,"show-controls",4],["showDirections",1,0,"show-directions",4],["showFullscreenControl",1,0,"show-fullscreen-control",4],["showGetDirectionsButton",1,0,"show-get-directions-button",4],["showLegend",1,0,"show-legend",4],["useCluster",1,0,"use-cluster",4],["zoom",2,0,1,8]],1,[["listCollapsed","onCardListCollapsed"]]],["yoo-map-gl","yoo-amap",1,[["filterGroups",2],["flyTo",32],["getCenter",32],["host",64],["isLoading",16],["isMaximized",16],["mapEntry",1],["markers",1]],1],["yoo-map-js","yoo-amap",1,[["filterGroups",2],["flyTo",32],["host",64],["isLoading",16],["mapEntry",1],["markers",2]],1],["yoo-map-legend","yoo-ag-grid",1,[["filterGroups",1],["host",64],["legendVisible",16]],1],["yoo-memo-list","yoo-memo-list",1,[["collapse",16],["forceRefresh",16],["host",64],["memos",1],["modalHost",1],["showEllipsis",16],["type",1,0,1,2]],1],["yoo-memo-list-dialog","yoo-memo-list",1,[["host",64],["memo",1],["type",1,0,1,2]],1],["yoo-mission-contents","yoo-mission-contents",1,[["host",64],["photosNumber",1,0,"photos-number",8],["questionsNumber",1,0,"questions-number",8],["slidesNumber",1,0,"slides-number",8]],1],["yoo-mission-detail","yoo-mission-contents",1,[["charts",1],["host",64],["isBookable",1],["linkedField",1],["linkedFieldValue",1,0,"linked-field-value",1],["mission",1],["networkScore",1,0,"network-score",8],["photosNumber",1,0,"photos-number",8],["progress",1],["questionsNumber",1,0,"questions-number",8],["scrollHeight",16],["serviceSlides",1],["slidesNumber",1,0,"slides-number",8],["tagContainer",1,0,"tag-container",2]],1,[["hideTabbar","onHideTabbar"]]],["yoo-mission-heading","yoo-ag-grid",1,[["host",64],["mission",1],["progress",1,0,1,8]],1],["yoo-mission-results","yoo-ag-grid",1,[["charts",1],["hasAudit",1,0,"has-audit",4],["host",64],["mission",1],["networkScore",1,0,"network-score",8],["nonapplicableCount",1,0,"nonapplicable-count",8],["satisfactoryCount",1,0,"satisfactory-count",8],["unsatisfactoryCount",1,0,"unsatisfactory-count",8]],1],["yoo-mission-score","yoo-ag-grid",1,[["charts",1],["header",1,0,1,2],["host",64],["networkScore",1,0,"network-score",8]],1],["yoo-mission-todo","yoo-mission-todo",1,[["host",64],["mission",1],["missionState",16],["readonly",1,0,1,4]],1],["yoo-mobile-tabbar","yoo-mobile-tabbar",1,[["activeIndex",16],["host",64],["items",1],["setActiveIcon",32]],1],["yoo-modal","yoo-modal",1,[["animationName",1,0,"animation-name",2],["animationProp",1],["close",32],["closeIcon",1,0,"close-icon",4],["content",1],["cssClass",1,0,"css-class",2],["dismiss",32],["footerText",1,0,"footer-text",2],["hasFooter",1,0,"has-footer",4],["hasHeader",1,0,"has-header",4],["heading",1,0,1,2],["headingIcons",1],["host",64],["overlayId",1,0,"overlay-id",8],["primaryButtonText",1,0,"primary-button-text",2],["primaryFn",1],["resize",32],["scrollEnabled",1,0,"scroll-enabled",4],["secondaryButtonText",1,0,"secondary-button-text",2],["withYooCtrl",1,0,"with-yoo-ctrl",4]],1,[["rowNumberChanged","onInputBarRawChange"]]],["yoo-navbar","yoo-accordion",1,[["actionBtnText",1,0,"action-btn-text",2],["getActiveIndex",32],["host",64],["loading",16],["numberOfVisibleItems",16],["reduceFontSize",16],["scrollTabs",2,0,"scroll-tabs",4],["selectedSwipeIndex",1,0,"selected-swipe-index",8],["selectedTab",2],["setActive",32],["showDropdown",16],["slidesOffsetBefore",16],["swipeableIndicator",1,0,"swipeable-indicator",4],["tabs",1],["withLine",1,0,"with-line",4]],1],["yoo-pagination","yoo-ag-grid",1,[["currentPage",1,0,"current-page",8],["host",64],["itemsPerPage",1,0,"items-per-page",8],["maxPagerSize",1,0,"max-pager-size",8],["pagerSize",16],["showTotal",1,0,"show-total",4],["totalItems",1,0,"total-items",8],["totalVisible",16]],1],["yoo-photo-editor","yoo-fab-button",1,[["annotatedImgSrc",2,0,"annotated-img-src",2],["backgroundStatus",16],["currentColor",16],["currentTextAlignment",16],["description",1,0,1,2],["disableHeader",1,0,"disable-header",4],["editInPhotoEditors",1,0,"edit-in-photo-editors",4],["editorMode",16],["host",64],["isAnnotating",16],["isBackBtn",1,0,"is-back-btn",4],["isDragging",16],["isModal",1,0,"is-modal",4],["isStitch",1,0,"is-stitch",4],["photoHasLoaded",16],["readonly",1,0,1,4],["rotateImage",1,0,"rotate-image",4],["src",1,0,1,2],["stitchMode",1,0,"stitch-mode",4],["svgData",1,0,"svg-data",2],["texts",1]],2],["yoo-photo-editors","yoo-photo-editors",1,[["canAnnotate",1,0,"can-annotate",4],["canChat",1,0,"can-chat",4],["currentIndex",16],["hideCloseButton",1,0,"hide-close-button",4],["hideContainer",16],["host",64],["index",1,0,1,8],["isLight",1,0,"is-light",4],["isReadonly",1,0,"is-readonly",4],["items",2,0,1,1],["updatePhoto",32]],2,[["pinched","handlePinchZoom"]]],["yoo-pivot-table","yoo-kpi",1,[["config",1],["definition",1],["host",64],["isFullScreen",1,0,"is-full-screen",4]],1],["yoo-podium","yoo-podium",1,[["host",64],["usersRanked",1]],1],["yoo-polyglot","yoo-polyglot",1,[["host",64],["text",1,0,1,2]],1],["yoo-profile","yoo-profile",1,[["activeItem",16],["config",1],["disableProfileLink",1,0,"disable-profile-link",4],["extraClasses",1,0,"extra-classes",2],["host",64],["isPreview",1,0,"is-preview",4],["modalHost",1],["selectedTitle",1,0,"selected-title",2],["showProfileHeader",1,0,"show-profile-header",4]],2,[["bottomRightClicked","onProfileEdit"]]],["yoo-progress-bar-circle","yoo-progress-bar-circle",1,[["addBaseClass",1],["allowNonAvailableValue",1,0,"allow-non-available-value",4],["circleElement",16],["getFormatedLabelToDisplay",1],["host",64],["percentColorScheme",1,0,"percent-color-scheme",4],["progressAnimationDuration",1,0,"progress-animation-duration",8],["progressColorClassAttribute",1],["progressCoreParameters",1],["progressCustomParameters",2],["progressInstance",1,0,"progress-instance",1],["progressLabelClassAttribute",1,0,"progress-label-class-attribute",2],["progressUnitLabel",1,0,"progress-unit-label",2],["progressValue",1,0,"progress-value",8],["timerDisplay",16]],1],["yoo-progress-bar-core","yoo-progress-bar-core",1,[["allowNonAvailableValue",1,0,"allow-non-available-value",4],["currentStep",1,0,"current-step",8],["horizontalAlign",1,0,"horizontal-align",2],["host",64],["loadedProgressContainer",16],["maxStep",1,0,"max-step",8],["maxValue",1,0,"max-value",8],["percentColorScheme",1,0,"percent-color-scheme",4],["progressAnimationDuration",1,0,"progress-animation-duration",8],["progressLabelColor",2,0,"progress-label-color",2],["progressLabelFontSize",1,0,"progress-label-font-size",2],["progressParameters",2,0,"progress-parameters",1],["progressUnitLabel",1,0,"progress-unit-label",2],["progressValue",1,0,"progress-value",8],["properColorProgress",16],["shape",1,0,1,2],["updatedProgress",16],["updatedStep",16],["verticalAlign",1,0,"vertical-align",2]],1],["yoo-progress-bar-line","yoo-progress-bar-line",1,[["addBaseClass",1],["allowNonAvailableValue",1,0,"allow-non-available-value",4],["getFormatedLabelToDisplay",1],["host",64],["percentColorScheme",1,0,"percent-color-scheme",4],["progressAnimationDuration",1,0,"progress-animation-duration",8],["progressColorClassAttribute",1],["progressCoreParameters",1],["progressCustomParameters",1],["progressInstance",1,0,"progress-instance",1],["progressLabelClassAttribute",1,0,"progress-label-class-attribute",2],["progressStepValues",1],["progressUnitLabel",1,0,"progress-unit-label",2],["progressValue",1,0,"progress-value",8],["updatedProgressValue",16]],1],["yoo-progress-bar-semi-circle","yoo-progress-bar-semi-circle",1,[["addBaseClass",1],["allowNonAvailableValue",1,0,"allow-non-available-value",4],["getFormatedLabelToDisplay",1],["host",64],["percentColorScheme",1,0,"percent-color-scheme",4],["progressAnimationDuration",1,0,"progress-animation-duration",8],["progressColorClassAttribute",1],["progressCoreParameters",1],["progressCustomParameters",2],["progressInstance",1,0,"progress-instance",1],["progressLabelClassAttribute",1,0,"progress-label-class-attribute",2],["progressUnitLabel",1,0,"progress-unit-label",2],["progressValue",1,0,"progress-value",8]],1],["yoo-progress-loader","yoo-progress-loader",1,[["host",64],["logo",1,0,1,2],["progress",1,0,1,8],["progressBarClass",1,0,"progress-bar-class",2]],1],["yoo-property-card","yoo-camera-preview-dialog",1,[["extraClass",1,0,"extra-class",2],["host",64],["properties",1]],1],["yoo-question-detail","yoo-question-detail",1,[["actions",16],["host",64],["imageHeight",16],["imageWidth",16],["question",1]],1],["yoo-reset-password","yoo-reset-password",1,[["borderClass",1,0,"border-class",2],["buttonClass",1,0,"button-class",2],["heading",1,0,1,2],["host",64],["isMagicLink",1,0,"is-magic-link",4],["showTitle",1,0,"show-title",4],["subheading",1,0,1,2],["validateInput",16]],1],["yoo-result-dialog","yoo-result-dialog",1,[["buttonText",1,0,"button-text",2],["heading",1,0,1,2],["host",64],["subheading",1,0,1,2],["success",1,0,1,4]],1],["yoo-rete","yoo-rete",1],["yoo-scandit","yoo-accordion",1,[["cleanUpScandit",32],["currentOcrRegex",1],["host",64],["isScanditSupported",16],["isScannerInit",16],["pauseScanning",32],["restartOcrScanner",32],["scanMode",1,0,"scan-mode",2]],1],["yoo-slider","yoo-fab-button",1,[["host",64],["isDoubleSlider",1,0,"is-double-slider",4],["maxValue",1,0,"max-value",8],["minValue",1,0,"min-value",8],["orientation",1,0,1,2],["primaryValue",1,0,"primary-value",8],["secondaryValue",1,0,"secondary-value",8],["showTriangleBackground",1,0,"show-triangle-background",4],["slotDimension",16]],1],["yoo-slider-scale","yoo-form-slider",1,[["host",64],["sliderValue",1,0,"slider-value",8],["triangleBackgroundColor",1,0,"triangle-background-color",2],["type",1,0,1,2]],1],["yoo-sticky","yoo-sticky",1,[["bottom",1,0,1,2],["host",64],["top",1,0,1,2]],1],["yoo-swipe-container","yoo-ag-grid",1,[["controlOnly",1,0,"control-only",4],["hammerOptions",1],["host",64],["showSwipeControl",1,0,"show-swipe-control",4]],2],["yoo-tabs","yoo-tabs",1,[["host",64],["numberTabsDisplayed",1,0,"number-tabs-displayed",8],["selected",1,0,1,8],["selectedTab",16],["tabsDisplayed",16],["titles",1]],1],["yoo-tappable","yoo-tappable",1,[["host",64],["hovered",16],["tapped",16]],1,[["touchstart","onTouchDown",0,1],["mouseover","onMouseOver",0,1],["mouseleave","onMouseOut",0,1]]],["yoo-text-truncate","yoo-ag-grid",1,[["animationLoadTime",1,0,"animation-load-time",8],["content",1,0,1,2],["expanded",16],["forceRefresh",16],["getSingleLineButttonElement",32],["getSingleLineTextElement",32],["hideMoreButton",1,0,"hide-more-button",4],["hideText",32],["host",64],["maxLine",2,0,"max-line",8],["showBreakLine",1,0,"show-break-line",4],["showEllipsis",16],["showText",32],["updateTruncate",32]],1],["yoo-tile","yoo-tile",1,[["host",64],["icon",1,0,1,2],["text",1,0,1,2],["value",1,0,1,2]],1],["yoo-toast","yoo-toast",1,[["closeButtonText",1,0,"close-button-text",2],["count",1,0,1,8],["cssClass",1,0,"css-class",2],["dismiss",32],["duration",1,0,1,8],["extraButtons",1],["host",64],["icon",1,0,1,2],["image",1,0,1,2],["keyboardClose",1,0,"keyboard-close",4],["message",1,0,1,2],["onDidDismiss",32],["onWillDismiss",32],["overlayId",1,0,"overlay-id",8],["position",2,0,1,2],["present",32],["progress",16],["progressEvent",1,0,"progress-event",1],["renameValue",16],["showBackdrop",1,0,"show-backdrop",4],["showCloseButton",1,0,"show-close-button",4],["willAnimate",1,0,"will-animate",4]],1,[["ionToastDidPresent","lifecycle"],["ionToastWillPresent","lifecycle"],["ionToastWillDismiss","lifecycle"],["ionToastDidDismiss","lifecycle"]]],["yoo-toolbar","yoo-ag-grid",1,[["actions",1],["activeAction",16],["host",64],["showActive",1,0,"show-active",4]],1],["yoo-tooltip","yoo-accordion",1,[["content",1,0,1,2],["cssOnly",1,0,"css-only",4],["host",64],["options",1,0,1,1],["placement",1,0,1,2]],2],["yoo-transition","yoo-transition",1,[["heading",1,0,1,2],["host",64],["icon",1,0,1,2],["image",1,0,1,2],["subHeading",1,0,"sub-heading",2],["type",1,0,1,2]],1],["yoo-user-detail","yoo-user-detail",1,[["courses",1],["stats",1],["user",1]],1],["yoo-user-picker","yoo-user-picker",1,[["currentUser",1],["host",64],["selectedUser",16],["usersList",1]],1],["yoo-user-profile","yoo-user-profile",1,[["config",1],["host",64],["user",1]],1],["yoo-walkthrough","yoo-walkthrough",1,[["config",1],["host",64],["isEnd",32],["lastSlide",16],["lockSwipes",32],["slideNext",32],["update",32]],1],["yoo-web-menu","yoo-web-menu",1,[["activePage",1,0,"active-page",2],["activePreviewPage",16],["host",64],["leftEntry",1],["rightEntry",1]],2,[["body:ionModalDidDismiss","onIonModalDidDismiss"]]],["yoo-welcome-banner","yoo-welcome-banner",1,[["host",64],["mainText",1,0,"main-text",2],["subText",1,0,"sub-text",2],["user",1]],1],["yoo-zebra","yoo-zebra",1,[["appId",1,0,"app-id",2],["host",64]],1],["yoo-zoom","yoo-fab-button",1,[["host",64],["initialScale",1,0,"initial-scale",8],["lockPan",2,0,"lock-pan",4]],2]]);
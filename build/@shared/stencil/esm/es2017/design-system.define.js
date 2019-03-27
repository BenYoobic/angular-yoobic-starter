
// DesignSystem: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './design-system.core.js';
import { COMPONENTS } from './design-system.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}

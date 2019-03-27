const h = window.DesignSystem.h;

import { a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooIonFooterComponent {
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    static get is() { return "yoo-ion-footer"; }
    static get style() { return ".footer-ios yoo-ion-toolbar:first-child {\n  --border-width: 0.55px 0 0; }\n\n.footer-ios[no-border] yoo-ion-toolbar:first-child {\n  --border-width: 0; }\n\n:host, yoo-ion-footer {\n  display: block;\n  position: relative;\n  -ms-flex-order: 1;\n  order: 1;\n  width: 100%;\n  z-index: 11; }\n\nyoo-ion-footer {\n  border-top: 1px solid var(--footer-border-top-color, #E6E6E6);\n  background: var(--light, #FFFFFF);\n  z-index: 1; }\n  yoo-ion-footer.no-border {\n    border-top: none; }\n\nyoo-ion-footer.iphone-x:not(.tabbar) {\n  padding-bottom: var(--padding-20, 1.25rem) !important; }"; }
}

export { YooIonFooterComponent as YooIonFooter };

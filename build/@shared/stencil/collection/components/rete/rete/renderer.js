export class StencilRenderPlugin {
    constructor() {
        this.name = 'stencil';
    }
    install(editor) {
        editor.on('rendernode', ({ el, node, component, bindSocket, bindControl }) => {
            //if (component.render && component.render !== 'alight') return;
            el.innerHTML = '<div style="background:red; width:200px; height:200px"></div>';
            //node._alight = nodeAl.bootstrap(el, { node, isSelected, bindSocket, bindControl, toClassName, Array });
        });
    }
}

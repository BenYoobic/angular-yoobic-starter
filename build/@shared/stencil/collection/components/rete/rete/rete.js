import Rete from 'rete';
import ConnectionPlugin from 'rete-connection-plugin';
import { StencilRenderPlugin } from './renderer';
//import VueRenderPlugin from 'rete-vue-render-plugin';
const numSocket = new Rete.Socket('Number value');
class NumComponent extends Rete.Component {
    constructor() {
        super('Number');
    }
    builder(node) {
        let out = new Rete.Output('num', 'Number', numSocket);
        node.addOutput(out);
        return Promise.resolve();
    }
    worker(node, inputs, outputs) {
        outputs[0] = node.data.num;
    }
    static get is() { return "yoo-rete"; }
    static get style() { return "/**style-placeholder:yoo-rete:**/"; }
}
export class YooReteComponent {
    constructor() {
    }
    componentWillLoad() {
    }
    componentDidLoad() {
        if (this.container) {
            this.editor = new Rete.NodeEditor('demo@0.1.0', this.container);
            this.editor.use(ConnectionPlugin);
            this.editor.use(new StencilRenderPlugin());
            const numComponent = new NumComponent();
            this.editor.register(numComponent);
            const engine = new Rete.Engine('demo@0.1.0');
            engine.register(numComponent);
            this.editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
                await engine.abort();
                await engine.process(this.editor.toJSON());
            });
            numComponent.createNode({ num: 5 }).then((n) => {
                n.position = [80, 20];
                this.editor.addNode(n);
            });
        }
    }
    componentDidUnload() {
        if (this.editor) {
            this.editor.clear();
        }
    }
    render() {
        return h("div", { ref: el => this.container = el, class: "node-editor", style: { width: '100%', height: '100%' } });
    }
    static get is() { return "yoo-rete"; }
    static get style() { return "/**style-placeholder:yoo-rete:**/"; }
}

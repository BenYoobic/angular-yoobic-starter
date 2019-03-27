import '../../../stencil.core';
import { NodeEditor } from 'rete';
export declare class YooReteComponent {
    protected container: HTMLElement;
    protected editor: NodeEditor;
    constructor();
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): JSX.Element;
}

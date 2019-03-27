import { Pipe } from '../base';
import { getProtocol, isWKWebView } from '../../config';
import { cleanupWKWebViewImagePath } from '../../helpers/common-helpers';
export class HttpsPipe extends Pipe {
    transform(value) {
        if (value && value.replace) {
            let protocol = getProtocol();
            value = value.replace(/http:/g, protocol);
            if (isWKWebView() && value.indexOf('file:') >= 0) {
                value = cleanupWKWebViewImagePath(value);
            }
        }
        return value;
    }
}

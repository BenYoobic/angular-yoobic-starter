import { isZebraScanner } from '../../../utils';
import { WebIntent } from '@ionic-native/web-intent';
export class YooZebraComponent {
    componentDidLoad() {
        if (isZebraScanner()) {
            this.onInitZebraScanner();
        }
    }
    getAppId() {
        return this.appId;
    }
    onInitZebraScanner() {
        if (WebIntent) {
            WebIntent.registerBroadcastReceiver({
                filterActions: [
                    this.getAppId() + '.ACTION',
                    'com.symbol.datawedge.api.RESULT_ACTION'
                ],
                filterCategories: [
                    'android.intent.category.DEFAULT'
                ]
            }).subscribe((intent) => {
                if (intent && intent.extras['com.motorolasolutions.emdk.datawedge.data_string']) {
                    let result = intent.extras['com.motorolasolutions.emdk.datawedge.data_string'];
                    this.scannedSuccess.emit(result);
                }
            });
            WebIntent.sendBroadcast({
                action: 'com.symbol.datawedge.api.ACTION',
                extras: {
                    'com.symbol.datawedge.api.CREATE_PROFILE': 'OperationsV6'
                }
            });
            let profileConfig = {
                'PROFILE_NAME': 'OperationsV6',
                'PROFILE_ENABLED': 'true',
                'CONFIG_MODE': 'UPDATE',
                'PLUGIN_CONFIG': {
                    'PLUGIN_NAME': 'BARCODE',
                    'RESET_CONFIG': 'true',
                    'PARAM_LIST': {}
                },
                'APP_LIST': [{
                        'PACKAGE_NAME': this.getAppId(),
                        'ACTIVITY_LIST': ['*']
                    }]
            };
            WebIntent.sendBroadcast({
                action: 'com.symbol.datawedge.api.ACTION',
                extras: {
                    'com.symbol.datawedge.api.SET_CONFIG': profileConfig,
                    'SEND_RESULT': this.requestResultCodes
                }
            });
            let profileConfig2 = {
                'PROFILE_NAME': 'OperationsV6',
                'PROFILE_ENABLED': 'true',
                'CONFIG_MODE': 'UPDATE',
                'PLUGIN_CONFIG': {
                    'PLUGIN_NAME': 'INTENT',
                    'RESET_CONFIG': 'true',
                    'PARAM_LIST': {
                        'intent_output_enabled': 'true',
                        'intent_action': this.getAppId() + '.ACTION',
                        'intent_delivery': '2' // Broadcast  
                    }
                }
            };
            WebIntent.sendBroadcast({
                action: 'com.symbol.datawedge.api.ACTION',
                extras: {
                    'com.symbol.datawedge.api.SET_CONFIG': profileConfig2,
                    'SEND_RESULT': this.requestResultCodes
                }
            });
        }
    }
    render() {
        return '';
    }
    static get is() { return "yoo-zebra"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "appId": {
            "type": String,
            "attr": "app-id"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get events() { return [{
            "name": "scannedSuccess",
            "method": "scannedSuccess",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-zebra:**/"; }
}

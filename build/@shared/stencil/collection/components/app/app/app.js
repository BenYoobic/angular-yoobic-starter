import { imageCacheInit, isCordova, isAndroid, loadTranslations } from '../../../utils';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
export class YooAppComponent {
    constructor() {
        imageCacheInit();
    }
    onDarkThemeChanged() {
        this.darkThemeChanged.emit(this.isDarkTheme);
    }
    //@Watch('language')
    onLanguageChange() {
        if (this.language) {
            return fetch('./assets/i18n/' + this.language + '.json')
                .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }
                return response.json();
            })
                .then(json => {
                //console.log(json);
                loadTranslations(json);
                this.host.forceUpdate();
            });
        }
    }
    componentWillLoad() {
        // window.oncontextmenu = function (event) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     return false;
        // };
        this.backbuttonListener = (e) => {
            e.preventDefault();
        };
        document.addEventListener('backbutton', this.backbuttonListener, false);
        if (this.language) {
            this.onLanguageChange();
        }
    }
    componentDidLoad() {
        if (isCordova()) {
            let orientation = isAndroid() ? 'portrait-primary' : 'portrait';
            ScreenOrientation.lock(orientation);
            if (isAndroid()) {
                StatusBar.styleLightContent();
            }
        }
    }
    componentDidUnload() {
        document.removeEventListener('backbutton', this.backbuttonListener, false);
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "yoo-app"; }
    static get properties() { return {
        "getSession": {
            "type": "Any",
            "attr": "get-session"
        },
        "host": {
            "elementRef": true
        },
        "isDarkTheme": {
            "type": Boolean,
            "attr": "is-dark-theme",
            "watchCallbacks": ["onDarkThemeChanged"]
        },
        "isOffline": {
            "type": Boolean,
            "attr": "is-offline"
        },
        "language": {
            "type": String,
            "attr": "language"
        }
    }; }
    static get events() { return [{
            "name": "darkThemeChanged",
            "method": "darkThemeChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-app:**/"; }
}

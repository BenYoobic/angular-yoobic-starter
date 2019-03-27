const h = window.DesignSystem.h;

import { m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooEmptyStateComponent {
    constructor() {
        this.hasText = true;
        this.fadeIn = false;
        this._iconMap = {
            // Default
            'admin': 'admin',
            'archived': 'archived',
            'areamanager': 'areamanager',
            'barcode': 'barcode',
            'blog': 'blog',
            'briefcase': 'briefcase',
            'calendar': 'calendar',
            'campaign': 'campaign',
            'category': 'category',
            'channel': 'channel',
            'chat': 'chat',
            'check': 'check',
            'contact': 'contact',
            'customformfield': 'customformfield',
            'dashboard': 'dashboard',
            'database': 'database',
            'emailblocked': 'emailblocked',
            'empty': 'empty',
            'feed': 'feed',
            'fielduser': 'fielduser',
            'file': 'file',
            'filter': 'filter',
            'folder': 'folder',
            'folder_blue': 'folder_blue',
            'geocoding': 'geocoding',
            'group': 'group',
            'hq': 'hq',
            'image': 'image',
            'inbox': 'inbox',
            'inventory': 'inventory',
            'location': 'location',
            'map': 'map',
            'memo': 'memo',
            'mission': 'mission',
            'nodata': 'nodata',
            'note': 'note',
            'notemplate': 'notemplate',
            'notification': 'notification',
            'page': 'page',
            'paperplane': 'paperplane',
            'payments': 'payments',
            'pharmaone': 'pharmaone',
            'photo': 'photo',
            'poll': 'poll',
            'publish': 'publish',
            'reject': 'reject',
            'request': 'request',
            'requestraised': 'requestraised',
            'score': 'score',
            'security': 'security',
            'service': 'service',
            'speedometer': 'speedometer',
            'splineroyal': 'splineroyal',
            'storemanager': 'storemanager',
            'subscription': 'subscription',
            'team': 'team',
            'template': 'template',
            'todo': 'todo',
            'translations': 'translations',
            'user': 'user',
            'usertrial': 'usertrial',
            'videocall': 'videocall',
            'welcomeuser': 'welcomeuser',
            // Operations
            'missions': 'mission',
            'feeds': 'feed',
            'users': 'user',
            'files': 'file',
            'products': 'empty',
            'locations': 'location',
            'groups': 'group',
            'memos': 'memo',
            'tenants': 'team',
            'emails': 'user',
            'productbatch': 'productbatch',
            'missiondescriptions': 'campaign',
            'history': 'history',
            'visit': 'visit',
            'photosplaceholder': 'photosplaceholder',
            'notificationsplaceholder': 'notificationsplaceholder',
            'historyplaceholder': 'historyplaceholder',
            'chatplaceholder': 'chatplaceholder',
            'notesplaceholder': 'notesplaceholder',
            'contactsplaceholder': 'contactsplaceholder',
            // Boost
            'lessons': 'to-do',
            'courses': 'courses',
            'userranks': 'leaderboard',
            'questions': 'questions',
            'answers': 'questions',
            'analytics': 'analytics'
        };
        this._titleMap = {
            // Boost
            'lessons': 'EMPTY_TITLE_LESSONS',
            'courses': 'EMPTY_TITLE_COURSES',
            'userranks': 'EMPTY_TITLE_USERRANKS',
            'questions': 'EMPTY_TITLE_QUESTIONS',
            'answers': 'EMPTY_TITLE_ANSWERS',
            'analytics': 'EMPTY_TITLE_ANALYTICS'
        };
        this._textMap = {
            // Boost
            'lessons': 'EMPTY_TEXT_LESSONS',
            'courses': 'EMPTY_TEXT_COURSES',
            'userranks': 'EMPTY_TEXT_USERRANKS',
            'questions': 'EMPTY_TEXT_QUESTIONS',
            'answers': 'EMPTY_TEXT_ANSWERS',
            'analytics': 'EMPTY_TEXT_ANALYTICS'
        };
    }
    componentWillLoad() {
        this.iconSrc = this.getIconSrc();
    }
    componentDidLoad() {
        //setAnimation(animations.shake, this.host, { duration: 1000 });
        if (this.fadeIn) {
            const FADE_IN_DURATION = 500;
            setTimeout(() => {
                this.host.classList.add('show');
            }, FADE_IN_DURATION);
        }
    }
    getIconSrc() {
        const icon = this._iconMap[this.type] || 'empty';
        return `/assets/empty-states/${icon}.svg`;
    }
    getEmptyTitle() {
        return this._titleMap[this.type] || '';
    }
    getEmptyText() {
        return this.emptyText ? translate(this.emptyText) : (this._textMap[this.type] || 'LISTEMPTY');
    }
    hostData() {
        return {
            class: {
                'fade-in': this.fadeIn
            }
        };
    }
    render() {
        return (h("div", { class: "container" },
            h("img", { src: this.getIconSrc() }),
            this.hasText && this.getEmptyTitle() !== '' && h("h4", { class: "empty-title" }, translate(this.getEmptyTitle())),
            this.hasText && h("div", { class: "empty-text" }, translate(this.getEmptyText())),
            h("slot", null)));
    }
    static get is() { return "yoo-empty-state"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "emptyText": {
            "type": String,
            "attr": "empty-text"
        },
        "emptyTitle": {
            "state": true
        },
        "fadeIn": {
            "type": Boolean,
            "attr": "fade-in"
        },
        "hasText": {
            "type": Boolean,
            "attr": "has-text"
        },
        "host": {
            "elementRef": true
        },
        "iconSrc": {
            "state": true
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return ":host {\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%; }\n\n.container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  margin: auto;\n  text-align: center; }\n  .container img {\n    width: 100%;\n    max-height: 240px;\n    padding: 1rem; }\n  .container .empty-title {\n    margin: 3rem 0 1rem 0;\n    color: var(--black, #000000); }\n  .container .empty-text {\n    padding: 1rem;\n    color: var(--text-color, #807f83);\n    font-size: var(--font-m, 15px);\n    opacity: 0.7; }\n\n:host(.empty-state-framed) .container {\n  padding-top: 0; }\n  :host(.empty-state-framed) .container .empty-text {\n    display: none !important; }\n  :host(.empty-state-framed) .container img {\n    max-width: 100px;\n    max-height: 158px; }\n\n:host(.empty-state-grid) {\n  -ms-flex-direction: row !important;\n  flex-direction: row !important; }\n  :host(.empty-state-grid) .container img {\n    padding-bottom: 0.5rem; }\n  :host(.empty-state-grid) .container .empty-text {\n    padding-top: 0; }\n\n:host(.header-padding) {\n  top: 3.625rem !important; }\n  :host(.header-padding) .container .img {\n    padding-bottom: 0 !important; }\n\n:host(.small) .container {\n  padding: 0; }\n  :host(.small) .container img {\n    height: 160px !important;\n    padding: 0; }\n\n:host(.xsmall) .container {\n  position: relative;\n  padding: 0;\n  -webkit-transform: translateY(-30%);\n  transform: translateY(-30%); }\n  :host(.xsmall) .container img {\n    height: 100px !important;\n    padding: 0; }\n\n:host(.absolute) {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n\n:host(.absolute-top-20) {\n  position: absolute;\n  top: 20%; }\n\n:host(.x-large) .container img {\n  max-height: 330px; }\n\n:host(.fade-in) .container {\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n  opacity: 0; }\n\n:host(.fade-in.show) .container {\n  opacity: 1; }"; }
}

export { YooEmptyStateComponent as YooEmptyState };

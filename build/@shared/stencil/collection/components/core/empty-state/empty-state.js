import { translate } from '../../../utils';
export class YooEmptyStateComponent {
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
    static get style() { return "/**style-placeholder:yoo-empty-state:**/"; }
}

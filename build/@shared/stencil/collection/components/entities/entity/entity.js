import { FormFieldType } from '../../../interfaces';
import { getUserDisplayName, execHandlerAndStopEvent, getSession, pipes, translate, translateMulti, getCurrentLanguage, getMissionStateBadges, isPresent, getAppContext, getMissionDataStateBadge, getIcon, getPlanDueDate, getProductBatchDateBadge, getProductBatchProgressColor, 
//getGoogleMapStreeView,
fileHasIcon, isPlanInFuture, getCampaignStateBadges, isWeb } from '../../../utils';
import { createThemedClasses } from '../../../utils/ionic';
import { isString, compact, isNumber, isArray, keys } from 'lodash-es';
export class YooEntityComponent {
    constructor() {
        this.items = [];
        this.secondaryActionsDropdown = false;
    }
    onEntityClosed() {
        this.closed.emit(true);
    }
    getCustomModelValue(key, data, fields) {
        let field = fields.find(f => f.name === key);
        if (key === '_ect' || field && (field.type === FormFieldType.date || field.type === FormFieldType.datetime)) {
            return pipes.dateFormat.transform(data[key], ...[(!field || field.type === FormFieldType.date) ? 'L' : 'L LT']);
        }
        else if (key === 'location' && data[key]) {
            return data[key].title;
        }
        else if (key === 'catalog' && data[key]) {
            let count = 0;
            keys(data[key]).forEach((k) => {
                if (k !== 'total' && k !== 'price' && isNumber(data[key][k])) {
                    count += data[key][k];
                }
            });
            let retVal = pipes.decimal.transform(count) + ' ' + translate(count > 1 ? 'PRODUCTS' : 'PRODUCT');
            if (data[key].price) {
                retVal += ' - ' + pipes.currency.transform(data[key].price);
            }
            return retVal;
        }
        else {
            return data[key];
        }
    }
    onListCollapsed(event) {
        const isCollapsed = event.detail.collapsed;
        if (isCollapsed) {
            this.host.classList.add('collapsed');
            this.host.classList.remove('open');
        }
        else {
            this.host.classList.add('open');
            this.host.classList.remove('collapsed');
        }
        this.collapsed.emit(event.detail);
    }
    onCardCellMoreActionClicked(event) {
        if (event && event.detail) {
            this.host.classList.add('context-menu-open');
        }
        else if (event && !event.detail) {
            this.host.classList.remove('context-menu-open');
        }
    }
    hostData() {
        return {
            class: Object.assign({}, createThemedClasses(null, (this.entityType ? this.entityType : '')), createThemedClasses(null, (this.displayType ? this.displayType : '')), { 'map': this.isMap }, getAppContext())
        };
    }
    render() {
        if (this.item) {
            let isOffline = this.item._id && this.item._id.startsWith && this.item._id.startsWith('offline_');
            let extraClasses = ' ';
            if (isOffline) {
                extraClasses += 'offline ';
            }
            if (this.isFramed) {
                extraClasses += 'framed ';
            }
            if (this.displayType === 'card-sticky') {
                let entry = {};
                if (this.entityType === 'feeds') {
                    let feedSticky = this.item;
                    entry = {
                        category: feedSticky.tags && feedSticky.tags.length > 0 ? feedSticky.tags[0].toUpperCase() : '',
                        title: feedSticky.description,
                        buttonText: translate('READMORE'),
                        subheadings: [pipes.timeAgo.transform(feedSticky._ect || new Date())],
                        postedBy: this.item.user && this.item.user._id ? getUserDisplayName(this.item.user) : null,
                        handler: () => { },
                        imgSrc: feedSticky.image ? feedSticky.image._downloadURL : null
                    };
                    return (h("yoo-card-sticky", { entry: entry, type: this.entityType, class: (this.entityType || 'simple') + extraClasses }));
                }
                else if (this.entityType === 'courses') {
                    let course = this.item;
                    const dueDate = getPlanDueDate(course.plan, course.assignmentDate);
                    entry = {
                        title: course.plan.title,
                        imgSrc: course.plan.background._downloadURL,
                        subheadings: [
                            (course.plan.lessonsCount || 0) + ' ' + translate((course.plan.lessonsCount || 0) > 1 ? 'LESSONS' : 'LESSON')
                        ],
                        isLocked: dueDate && isPlanInFuture(course.plan, course.assignmentDate)
                    };
                    return (h("yoo-card-sticky", { entry: entry, type: this.entityType, class: (this.entityType || 'simple') + extraClasses }));
                }
            }
            else if (this.displayType === 'card-feed') {
                let entry = { type: this.displayType };
                if (this.entityType === 'feeds') {
                    let feed = this.item;
                    entry = {
                        heading: feed.user && feed.user._id ? getUserDisplayName(feed.user) : feed.missiondescription ? feed.missiondescription.title : '',
                        subheadings: [pipes.timeAgo.transform(feed._ect || new Date())],
                        description: translateMulti(feed.description),
                        tags: feed.tags,
                        imgSrc: feed.image ? feed.image._downloadURL : null,
                        icon: feed.missiondescription && feed.missiondescription.icon && (!feed.user || !feed.user._id) ? feed.missiondescription.icon._downloadURL : null,
                        user: feed.user,
                        bottomLeftIcon: feed.document ? 'yo-attachment' : null,
                        document: feed.document,
                        type: this.displayType,
                        badges: isOffline ? [{ text: translate('PENDINGOFFLINE'), cssClass: 'small round stable-light' }] : null,
                        groups: [].concat(feed.group)
                    };
                }
                else if (this.entityType === 'blog') {
                    let blog = this.item;
                    entry = {
                        heading: translateMulti(blog.title),
                        subheadings: [pipes.timeAgo.transform(blog.pubDate)],
                        description: translateMulti(blog.description),
                        icon: blog.background,
                        imgSrc: blog.background,
                        type: this.displayType
                    };
                }
                else if (this.entityType === 'photos') {
                    let photo = this.item;
                    entry = {
                        heading: photo.userDisplayname,
                        subheadings: photo.location ? [pipes.timeAgo.transform(photo.date), photo.location.title] : [],
                        description: translateMulti(photo.address),
                        imgSrc: photo.type === 'audio' ? null : photo.value,
                        icon: photo.type === 'audio' ? 'yo-microphone' : null,
                        user: photo.user,
                        type: this.displayType,
                        fieldTitle: photo.title,
                        missionTitle: photo.missiondescription ? photo.missiondescription.title : '',
                        tags: photo.tags,
                        bottomLeftIcon: photo.edit || photo.svgData || photo.texts ? 'yo-pen' : null
                    };
                }
                else if (this.entityType === 'questions') {
                    let question = this.item;
                    let userRole = question.user.role;
                    entry = {
                        headings: [
                            (question.user && question.user._id ? getUserDisplayName(question.user) : ''),
                            translate(userRole)
                        ],
                        subheadings: [
                            pipes.timeAgo.transform(question._ect || new Date()),
                            question.answersCount >= 0 ? question.answersCount + ' ' + translate('ANSWERS') : ''
                        ],
                        description: translateMulti(question.title),
                        tags: question.tags,
                        imgSrc: question.imageData ? question.imageData : null,
                        user: question.user,
                        type: this.displayType,
                        groups: [].concat(question.group)
                    };
                }
                else if (this.entityType === 'questionsanswers') {
                    let answer = this.item;
                    let userRole = answer.user ? answer.user.role : null;
                    entry = {
                        headings: [
                            (answer.user && answer.user._id ? getUserDisplayName(answer.user) : ''),
                            translate(userRole)
                        ],
                        subheadings: [pipes.dateFormat.transform(answer.date, 'fromNow')],
                        description: translateMulti(answer.text),
                        imgSrc: answer.imageData ? answer.imageData : null,
                        user: answer.user,
                        type: this.displayType,
                        groups: [].concat(answer.group),
                        bottomActions: this.bottomActions ? this.bottomActions.filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                            return {
                                text: a.text(this.item),
                                icon: a.icon ? a.icon(this.item) : '',
                                handler: a.handler ? () => a.handler(this.item) : () => { },
                                textClass: a.textClass ? a.textClass(this.item) : '',
                                cssClass: a.cssClass ? a.cssClass(this.item) : ''
                            };
                        }) : null
                    };
                }
                entry.icons = (this.icons || []).filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                    return {
                        icon: a.icon(this.item),
                        handler: () => a.handler(this.item),
                        text: a.text ? a.text(this.item) : ''
                    };
                });
                entry.topActions = this.topActions && this.topActions.filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                    return {
                        text: a.text(this.item),
                        textClass: a.textClass ? a.textClass(this.item) : '',
                        handler: () => a.handler(this.item)
                    };
                });
                entry.bottomAction = this.bottomActions && this.bottomActions.filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                    return {
                        name: a.text(this.item),
                        textClass: a.textClass ? a.textClass(this.item) : '',
                        handler: () => a.handler(this.item)
                    };
                })[0];
                entry.actions = this.secondaryActions ? this.secondaryActions.filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                    return { text: a.text(this.item), icon: a.icon ? a.icon(this.item) : '', handler: () => a.handler(this.item) };
                }) : null;
                if (this.entityType === 'questions' || this.entityType === 'questionsanswers') {
                    return (h("yoo-card-question", { entry: entry, class: (this.entityType || 'simple') + extraClasses, onViewMoreToggled: (ev) => { ev.stopPropagation(); this.viewMoreToggled.emit(ev.detail); } }));
                }
                else {
                    return (h("yoo-card-feed", { entry: entry, class: (this.entityType || 'simple') + extraClasses, onViewMoreToggled: (ev) => { ev.stopPropagation(); this.viewMoreToggled.emit(ev.detail); } }));
                }
            }
            else if (this.displayType === 'card-list' || this.displayType === 'card-map') {
                let entry = {};
                let isActivable = false;
                if (this.entityType === 'missions') {
                    let mission = this.item;
                    let badges = getMissionStateBadges(mission);
                    if (mission.type === 'visit') {
                        entry = {
                            heading: translate('VISIT') + ': ' + (mission.visitDescription || ''),
                            subheadings: getSession().user && getSession().user.locationRef === mission.locationRef ? [] : mission.location && mission.location.title ? [mission.location.title] : [],
                            date: pipes.dateFormat.transform(mission.finishedDate, 'L LT')
                        };
                    }
                    else {
                        entry = {
                            heading: translateMulti(mission.title),
                            subheadings: getSession().user && getSession().user.locationRef === mission.locationRef ? [] : mission.location && mission.location.title ? [mission.location.title] : [],
                            tags: mission.tags,
                            badges: [],
                            usersInline: mission.owner && mission.ownerRef && mission.ownerRef !== getSession().userId ? [mission.owner] : mission.isAssigned && mission.creatorRef !== getSession().userId ? [mission.creator] : [],
                            date: mission.duedate && mission.status !== 'finished' && mission.status !== 'archived' ? pipes.timeAgo.transform(mission.duedate) :
                                (mission.status === 'finished' && mission.finishedDate ? pipes.dateFormat.transform(mission.finishedDate, 'L LT') : null)
                        };
                        if (badges) {
                            entry.badges = badges;
                        }
                        if (mission.status === 'finished' && mission.score && isNumber(mission.score.value)) {
                            entry.badges.push({ iconLeft: 'yo-award-trophy-star-1', text: mission.score.value.toLocaleString() + (mission.score.isPercentage ? '%' : ''), cssClass: 'small round black' });
                        }
                        if (mission.type === 'todo' && mission.todo && mission.todo.values) {
                            let finished = mission.todo.values.filter(t => t.finished && t.finished.value === true).length;
                            let total = mission.todo.values.length;
                            entry.badges.push({ text: finished + '/' + total, cssClass: 'small round' });
                        }
                    }
                }
                else if (this.entityType === 'missiondescriptions') {
                    let campaign = this.item;
                    let badges = getCampaignStateBadges(campaign);
                    entry = {
                        heading: translateMulti(campaign.title),
                        subheadings: [translateMulti(campaign.text)],
                        icon: campaign.icon ? null : campaign.background ? null : 'yo-campaign',
                        imgSrc: campaign.icon ? campaign.icon._downloadURL : campaign.background ? campaign.background._downloadURL : null,
                        badges: isWeb() ? badges : null,
                        tags: campaign.tags
                    };
                }
                else if (this.entityType === 'missiondatas') {
                    let data = this.item;
                    let badge = getMissionDataStateBadge(data);
                    entry = {
                        heading: translateMulti(data.mission.title),
                        subheadings: getSession().user && getSession().user.locationRef === data.locationRef ? [] : data.location && data.location.title ? [data.location.title] : [],
                        tags: data.tags,
                        badges: [],
                        usersInline: data.user && data.userRef && data.userRef !== getSession().userId ? [data.user] : [],
                        date: pipes.timeAgo.transform(data.date)
                    };
                    if (badge) {
                        entry.badges.push(badge);
                    }
                }
                else if (this.entityType === 'users' || this.entityType === 'user' || this.entityType === 'contacts') {
                    let user = this.item;
                    entry = {
                        heading: getUserDisplayName(user),
                        subheadings: this.entityType === 'contacts' || !user._lmt ? [] : [translate('LASTSEEN') + ': ' + pipes.timeAgo.transform(user._lmt)],
                        tags: user.tags,
                        users: [user]
                    };
                }
                else if (this.entityType === 'feeds') {
                    let feed = this.item;
                    entry = {
                        heading: translateMulti(feed.description),
                        date: pipes.dateFormat.transform(feed.date, 'fromNow'),
                        users: [feed.user],
                        avatarSize: 'small'
                    };
                }
                else if (this.entityType === 'feedsComments') {
                    let comment = this.item;
                    entry = {
                        heading: '<b>' + getUserDisplayName(comment.user) + '</b>',
                        subheadings: [comment.text],
                        date: pipes.dateFormat.transform(comment.date, 'fromNow'),
                        users: [comment.user],
                        avatarSize: 'small',
                        isChildComment: comment.isChild
                    };
                }
                else if (this.entityType === 'photos') {
                    let photo = this.item;
                    entry = {
                        heading: photo.missiondescription ? photo.missiondescription.title : '' + ' ' + photo.title,
                        subheadings: photo.address ? [photo.address] : [],
                        date: pipes.dateFormat.transform(photo.date, 'fromNow'),
                        imgSrc: photo.type === 'audio' ? null : photo.value,
                        icon: photo.type === 'audio' ? 'yo-microphone' : null,
                        usersInline: [photo.user],
                        tags: photo.tags,
                        avatarSize: 'list-xlarge'
                    };
                }
                else if (this.entityType === 'files' || (this.entityType === 'filesFolders' && this.item.fftype === 'file')) {
                    let file = this.item;
                    let directory = '';
                    if (file.container && file.container.name) {
                        directory = file.container.name + ' ';
                    }
                    entry = {
                        heading: file._filename,
                        icon: file.icon || getIcon(file),
                        imgSrc: fileHasIcon(file) ? null : file.imgSrc || file._downloadURL,
                        avatarSize: 'list-small',
                        subheadings: [directory + pipes.fileSize.transform(file.size)] //, //, file.mimeType
                        //badges: [{ iconLeft: getIcon(file), cssClass: 'small round black' }]
                    };
                }
                else if (this.entityType === 'folders' || (this.entityType === 'filesFolders' && this.item.fftype === 'folder')) {
                    let f = this.item;
                    let directory = '';
                    extraClasses += 'folders ';
                    if (f.container && f.container.name) {
                        directory = f.container.name + ' ';
                    }
                    entry = {
                        heading: f.name,
                        imgSrc: f.fftype === 'folder' || this.entityType === 'folders' ? './assets/empty-states/folder_blue.svg' : f.imgSrc,
                        icon: f.icon,
                        avatarSize: 'list-small',
                        subheadings: []
                    };
                    if (f.stats) {
                        entry.subheadings = [directory + f.stats.map(s => {
                                return '<span>' + translate(s.title) + ': ' + pipes.decimal.transform(s.value) + '</span>';
                            }).join()];
                    }
                }
                else if (this.entityType === 'unsplash') {
                    let unsplash = this.item;
                    entry = {
                        imgSrc: unsplash.thumb,
                        heading: unsplash.title
                    };
                }
                else if (this.entityType === 'notifications') {
                    entry = {
                        heading: translateMulti(this.item.title),
                        subheadings: [translateMulti(this.item.body)],
                        date: this.item.scheduledDate || this.item._ect ? pipes.dateFormat.transform(this.item.scheduledDate || this.item._ect, 'fromNow') : null,
                        users: this.item.sender ? [this.item.sender] : null,
                        icon: this.item.mode === 'email' ? 'yo-email' : 'yo-notification'
                    };
                }
                else if (this.entityType === 'channel') {
                    let lastMessage = this.item.lastMessage || '';
                    if (this.item.lastMessageAlternate) {
                        lastMessage = '<b>' + lastMessage + '</b>';
                    }
                    entry = {
                        heading: this.item.others ? getUserDisplayName(this.item.others[0]) : '',
                        date: this.item.lastMessageDate ? pipes.dateFormat.transform(this.item.lastMessageDate, 'fromNow') : null,
                        subheadings: [lastMessage],
                        bottomRightBadge: this.item.isOnline ? ' ' : null,
                        bottomRightBadgeCssClass: 'notification-mini success',
                        users: this.item.others ? [this.item.others[0]] : []
                    };
                }
                else if (this.entityType === 'channels') {
                    let lastMessage = this.item.lastMessage || '';
                    if (this.item.lastMessageAlternate) {
                        lastMessage = '<b>' + lastMessage + '</b>';
                    }
                    entry = {
                        heading: this.item.name,
                        date: this.item.lastMessageDate ? pipes.dateFormat.transform(this.item.lastMessageDate, 'fromNow') : null,
                        subheadings: [lastMessage],
                        users: this.item.users
                    };
                }
                else if (this.entityType === 'environnement') {
                    entry = {
                        heading: this.item.title
                    };
                }
                else if (this.entityType === 'publicAPITokens') {
                    let token = this.item;
                    entry = {
                        heading: token.user.username,
                        subheadings: [token._tenant.name],
                        date: pipes.dateFormat.transform(token._lmt, 'L LT'),
                        users: [token.user]
                    };
                }
                else if (this.entityType === 'translations') {
                    let translation = this.item;
                    entry = {
                        heading: translation[getCurrentLanguage()] || translation.key,
                        subheadings: [],
                        //date: pipes.dateFormat.transform(translation._ect, 'L LT'),
                        badges: translation.isPhotoAnnotation ? [{
                                text: translate('PHOTO'),
                                cssClass: 'small round accent',
                                progressClass: 'gradient-success'
                            }] : []
                    };
                }
                else if (this.entityType === 'googlemaps') {
                    entry = {
                        heading: this.item.address
                    };
                }
                else if (this.entityType === 'notes') {
                    let note = this.item;
                    entry = {
                        heading: note.text,
                        date: pipes.dateFormat.transform(note._lmt, 'fromNow'),
                        users: [note.owner]
                    };
                }
                else if (this.entityType === 'dashboards') {
                    let dashboard = this.item;
                    entry = {
                        heading: dashboard.title,
                        date: pipes.dateFormat.transform(dashboard._lmt, 'fromNow'),
                        subheadings: [dashboard.description]
                    };
                }
                else if (this.entityType === 'locations' || this.entityType === 'visits') {
                    let loc = this.item;
                    entry = {
                        heading: loc.title,
                        distance: loc.distance ? pipes.distance.transform(loc.distance) : null,
                        hasPending: loc.hasAvailableMissions || loc.availableMissions > 0,
                        subheadings: [
                            loc.address,
                            (`<span class="black">${translate('VISIT')}: ${loc.lastVisit ? pipes.dateFormat.transform(loc.lastVisit, 'fromNow') : translate('NOTAVAILABLE')} </span>`)
                        ],
                        //tags: loc.tags,
                        imgSrc: loc.imageData,
                        icon: 'yo-store success',
                        avatarSize: 'small',
                        kpiData: loc.kpiData,
                        isMap: this.isMap,
                        isCollapsible: this.isCollapsible && loc.kpiData && isArray(loc.kpiData) && loc.kpiData.length > 0,
                        date: isPresent(loc.kpiValue) ? pipes.number.transform(loc.kpiValue) : null,
                        vip: loc.vip
                    };
                    if (this.isCollapsible && loc.kpiData && isArray(loc.kpiData) && loc.kpiData.length > 0) {
                        this.host.classList.add('collapsible');
                        extraClasses += ' collapsible';
                    }
                    if (this.host.classList.contains('no-kpi')) {
                        extraClasses += ' no-kpi';
                    }
                    if (loc.vip) {
                        entry.topRightBadge = 'yo-star';
                    }
                }
                else if (this.entityType === 'locationtypes') {
                    let locType = this.item;
                    entry = {
                        heading: locType.name,
                        tags: locType.group,
                        date: locType.count ? locType.count.toLocaleString() : null
                    };
                }
                else if (this.entityType === 'geofilters') {
                    let filter = this.item;
                    entry = {
                        heading: getUserDisplayName(filter.user),
                        subheadings: compact([
                            filter.locationsRef && filter.locationsRef.length > 0 ? filter.locationsRef.length.toLocaleString() + ' ' + translate(filter.locationsRef.length > 1 ? 'LOCATIONS' : 'LOCATION') : null,
                            filter.locationtypesRef && filter.locationtypesRef.length > 0 ? filter.locationtypesRef.length.toLocaleString() + ' ' + translate(filter.locationtypesRef.length > 1 ? 'LOCATIONTYPES' : 'LOCATIONTYPE') : null
                        ]),
                        users: [filter.user],
                        avatarSize: 'small'
                    };
                }
                else if (this.entityType === 'products') {
                    let product = this.item;
                    if (product.outofstock) {
                        extraClasses += ' outofstock ';
                    }
                    entry = {
                        heading: product.title,
                        subheadings: [
                            product.price > 0 && this.host.classList.contains('simple') === false ? '<span class="subheading-price">' + pipes.currency.transform(product.price) + '</span>' : null,
                            product.shortdescription,
                            product.reference ? '<span class="subheading-grey">' + product.reference + '</span>' : null
                        ],
                        badges: product.outofstock ? [{ text: translate('OUTOFSTOCK'), cssClass: 'small round danger' }] : null,
                        tags: product.tags,
                        icon: product.image && product.image._downloadURL ? null : 'yo-photo-library',
                        imgSrc: product.image && product.image._downloadURL ? product.image._downloadURL : null,
                        avatarSize: this.isHistory || this.host.classList.contains('simple') ? 'list-xmedium' : 'list-xlarge'
                    };
                }
                else if (this.entityType === 'productbatch') {
                    let productBatch = this.item;
                    let badge = getProductBatchDateBadge(productBatch);
                    entry = {
                        heading: productBatch.product ? productBatch.product.title : 'NA',
                        badges: badge ? [badge] : [],
                        topLeftBadge: productBatch.removedCount > 0 ? productBatch.removedCount.toLocaleString() : null,
                        subheadings: [
                            productBatch.product ? productBatch.product.reference : '',
                            ...(getSession().user && getSession().user.locationRef === productBatch.locationRef ? [] : productBatch.location && productBatch.location.title ? [productBatch.location.title + ' - ' + productBatch.aisle] : [])
                        ],
                        tags: productBatch.tags,
                        icon: productBatch.product && productBatch.product.image && productBatch.product.image._downloadURL ? null : 'yo-photo-library',
                        avatarSize: 'list-xmedium',
                        imgSrc: productBatch.product && productBatch.product.image && productBatch.product.image._downloadURL ? productBatch.product.image._downloadURL : null //, // './assets/empty-states/image.svg',
                        //date: productBatch.archived ? Math.round(productBatch.timeSpent) + ' s' : null// (productBatch.date ? pipes.timeAgo.transform(productBatch.date) : null)
                    };
                    if (productBatch.archived || productBatch.isOutOfStock) {
                        extraClasses += ' archived ';
                    }
                }
                else if (this.entityType === 'productbatchlist') {
                    let productbatchList = this.item;
                    let progress = productbatchList.total > 0 ? (Math.round(productbatchList.treated / productbatchList.total * 100)) : 0;
                    entry = {
                        heading: translate(productbatchList._id),
                        subheadings: [
                            productbatchList.treated + '/' + productbatchList.total + ' ' + translate('PRODUCTS')
                        ],
                        progress: progress + '%',
                        progressClass: getProductBatchProgressColor(progress)
                    };
                }
                else if (this.entityType === 'memolist') {
                    let memoList = this.item;
                    entry = {
                        heading: translate(memoList._id[0]),
                        subheadings: [
                            memoList.done + '/' + memoList.total + ' ' + translate('TASKS')
                        ],
                        usersInline: memoList.users
                    };
                }
                else if (this.entityType === 'memos') {
                    let memo = this.item;
                    entry = {
                        heading: memo.title,
                        subheadings: [
                            memo.description
                        ],
                        usersInline: memo.users,
                        date: memo.duedate ? pipes.timeAgo.transform(memo.duedate) : null
                    };
                    isActivable = true;
                }
                else if (this.entityType === 'calendarEvents') {
                    let calendarEvent = this.item;
                    entry = {
                        heading: calendarEvent.title,
                        subheadings: [
                            calendarEvent.description
                        ],
                        usersInline: calendarEvent.users,
                        date: calendarEvent.startDate ? pipes.dateFormat.transform(calendarEvent.startDate, 'L') : null
                    };
                }
                else if (this.entityType === 'tableau') {
                    let tableau = this.item;
                    entry = {
                        heading: tableau.path,
                        subheadings: [
                            tableau._tenant.name
                        ]
                    };
                }
                else if (this.entityType === 'version') {
                    let version = this.item;
                    entry = {
                        heading: version.title,
                        subheadings: [
                            version.version
                        ]
                    };
                }
                else if (this.entityType === 'courses') {
                    let course = this.item;
                    entry = {
                        heading: course.plan ? course.plan.title : null,
                        date: course.assignmentDate ? pipes.dateFormat.transform(course.assignmentDate, 'fromNow') : null
                    };
                }
                else if (this.entityType === 'lessons') {
                    let lesson = this.item;
                    return h("yoo-card-lesson", { lesson: lesson, class: this.host.className });
                }
                else if (this.entityType === 'userranks') {
                    let userrank = this.item;
                    let user = this.item.user;
                    entry = {
                        heading: getUserDisplayName(user),
                        rank: userrank.rank,
                        points: userrank.points,
                        users: [user]
                    };
                }
                else if (this.entityType === 'questions') {
                    let question = this.item;
                    entry = {
                        heading: translateMulti(question.title),
                        date: pipes.dateFormat.transform(question.date, 'fromNow'),
                        users: [question.user],
                        avatarSize: 'small'
                    };
                }
                else if (this.entityType === 'questionsanswers') {
                    let answer = this.item;
                    entry = {
                        heading: getUserDisplayName(answer.user),
                        subheadings: [answer.text],
                        date: pipes.dateFormat.transform(answer.date, 'fromNow'),
                        users: [answer.user],
                        avatarSize: 'small'
                    };
                }
                else if (this.entityType === 'mediacapturedevices') {
                    let device = this.item;
                    entry = {
                        heading: device.label
                    };
                }
                else if (this.entityType === 'videocallusers') {
                    entry = {
                        heading: getUserDisplayName(this.item),
                        users: [this.item]
                    };
                }
                else if (this.entityType === 'operations') {
                    let op = this.item;
                    entry = {
                        heading: op.remoteMethodName ? translate(op.remoteMethodName.toUpperCase()) : ((op.operation ? op.operation.remoteMethodName : '') || op.daoMethodName || op.operationId),
                        subheadings: [op.operationId, op.operation && op.operation.accessToken ? getUserDisplayName(op.operation.accessToken) : null],
                        date: pipes.dateFormat.transform(op._ect, 'L LT'),
                        users: op.operation && op.operation.accessToken ? [op.operation.accessToken] : null,
                        avatarSize: 'small',
                        badges: op.isCreation ? [{
                                text: translate('CREATE'),
                                cssClass: 'small round accent',
                                progressClass: 'gradient-success'
                            }] : []
                    };
                }
                else if (this.entityType === 'regex') {
                    entry = {
                        heading: this.item.title
                    };
                }
                else if (this.customModel && this.customModel.appearance && this.customModel.appearance.size > 0) {
                    entry = {};
                    this.customModel.appearance.forEach((value, key) => {
                        let v = [].concat(value);
                        let array = compact(v.map(t => this.getCustomModelValue(t, this.item, this.customModel.formFields)));
                        let finalValue = array.length > 1 ? array.join(' - ') : array.join('');
                        if (key === 'title') {
                            entry.heading = finalValue;
                        }
                        else if (key === 'description') {
                            entry.subheadings = array;
                        }
                        else {
                            entry[key] = finalValue;
                        }
                    });
                }
                else {
                    entry = {};
                    let defaultTitle = (this.item.title || this.item.name || this.item._id || (isString(this.item) || isNumber(this.item) ? this.item : '')).toString();
                    if (this.item.title === false || this.item._id === false) {
                        defaultTitle = 'false';
                    }
                    let title = this.useTranslate ? translate(defaultTitle.toUpperCase()) : defaultTitle;
                    entry.heading = title;
                    if (this.item.description) {
                        entry.subheadings = [this.item.description];
                    }
                    if (this.item.background && this.item.background._downloadURL) {
                        entry.imgSrc = this.item.background._downloadURL;
                    }
                    if (this.item.icon && this.item.icon._downloadURL) {
                        entry.imgSrc = this.item.icon._downloadURL;
                    }
                    else if (isString(this.item.icon)) {
                        entry.icon = this.item.icon;
                    }
                    else if (this.entityType === 'groups') {
                        entry.iconText = this.item._id;
                        entry.subheadings = [this.item._id];
                    }
                    else if (this.entityType === 'tenants') {
                        entry.iconText = defaultTitle;
                    }
                    if (this.item.badge) {
                        entry.badges = [{ text: this.item.badge }];
                    }
                }
                entry.icons = (this.icons || []).filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                    return { icon: a.icon(this.item), handler: () => a.handler(this.item) };
                });
                entry.topActions = this.topActions ? this.topActions.filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                    return { text: a.text(this.item), handler: () => a.handler(this.item) };
                }) : null;
                entry.bottomActions = this.bottomActions ? this.bottomActions.filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                    return { text: a.text(this.item), handler: () => a.handler(this.item) };
                }) : null;
                entry.actions = this.secondaryActionsDropdown && this.secondaryActions ? this.secondaryActions.filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                    return { text: a.text(this.item), icon: a.icon(this.item), handler: () => a.handler(this.item) };
                }) : null;
                if (this.host.classList.contains('catalog-display')) {
                    extraClasses += 'catalog-display';
                }
                if (this.host.classList.contains('no-text-break')) {
                    extraClasses += 'no-text-break';
                }
                if (this.isHistory) {
                    extraClasses += ' history';
                }
                if (this.host.classList.contains('form-choice')) {
                    extraClasses += ' form-choice';
                    entry.isCollapsible = true;
                }
                if (this.iconColor) {
                    this.host.style.setProperty('--icon-color', this.iconColor);
                }
                if (this.host.classList.contains('full-width')) {
                    extraClasses += ' full-width';
                }
                if (this.item && (this.item._id === getSession().userId)) {
                    extraClasses += ' current';
                }
                return h("yoo-card-list", { entry: entry, class: (this.customModel ? 'custom-model' : (this.entityType || 'simple ')) + extraClasses, isActivable: isActivable, onListCollapsed: (ev) => this.onListCollapsed(ev) });
            }
            else if (this.displayType === 'card-cell') {
                let entry = {};
                if (this.entityType === 'files' || (this.entityType === 'filesFolders' && this.item.fftype === 'file')) {
                    let file = this.item;
                    entry = {
                        imgSrc: fileHasIcon(file) ? null : file.imgSrc || file._downloadURL,
                        icon: file.icon || getIcon(file),
                        text: file._filename
                    };
                }
                else if (this.entityType === 'folders' || (this.entityType === 'filesFolders' && this.item.fftype === 'folder')) {
                    let f = this.item;
                    entry = {
                        imgSrc: './assets/empty-states/folder_blue.svg',
                        icon: f.icon,
                        text: f.name
                    };
                }
                else if (this.entityType === 'courses' || this.entityType === 'plans') {
                    const plan = this.entityType === 'courses' ? this.item.plan : (this.item.plan || this.item);
                    const dueDate = getPlanDueDate(plan, this.item.assignmentDate);
                    if (plan) {
                        entry = {
                            imgSrc: plan.background ? plan.background._downloadURL : null,
                            subheading: (plan.lessonsCount || 0) + ' ' + translate('LESSONS'),
                            text: plan.title,
                            dueDate: dueDate,
                            noTruncate: true,
                            isLocked: dueDate && isPlanInFuture(plan, this.item.assignmentDate)
                        };
                    }
                }
                else if (this.entityType === 'photos') {
                    let photo = this.item;
                    entry = {
                        imgSrc: photo.type === 'audio' ? null : photo.value,
                        icon: photo.type === 'audio' ? 'yo-microphone' : null,
                        flagged: photo.flagged,
                        annotated: photo.edit || photo.svgData || photo.texts ? true : false,
                        validated: photo.validated
                    };
                }
                else if (this.entityType === 'unsplash') {
                    let unsplash = this.item;
                    entry = {
                        imgSrc: unsplash.thumb,
                        text: unsplash.title
                    };
                }
                else if (this.entityType === 'apps') {
                    let app = this.item;
                    entry = {
                        text: translate(app.toUpperCase()),
                        imgSrc: './assets/apps/' + app + '.svg'
                    };
                }
                else if (this.entityType === 'badges') {
                    let badge = this.item;
                    entry = {
                        imgSrc: badge.cssClass,
                        text: badge.text,
                        isBadge: true,
                        noTruncate: true
                    };
                }
                entry.actions = this.secondaryActions ? this.secondaryActions.filter(a => a.isVisible ? a.isVisible(this.item) : true).map(a => {
                    return { text: a.text(this.item), icon: a.icon(this.item), handler: () => a.handler(this.item), cssClass: a.cssClass ? a.cssClass(this.item) : '' };
                }) : null;
                return h("yoo-card-cell", { entry: entry, class: (this.entityType || 'simple') + extraClasses + (this.item.type === 'video' ? ' photo-video' : ''), onMoreActionsClicked: (ev) => this.onCardCellMoreActionClicked(ev) });
            }
            else if (this.displayType === 'card-tag' || this.displayType === 'card-tag-single') {
                let text;
                let closable = !this.readonly && this.clearable;
                let defaultText = (this.item.title || this.item.name || this.item._id || (isString(this.item) || isNumber(this.item) ? this.item : '')).toString();
                switch (this.entityType) {
                    case 'users':
                    case 'user':
                        let user = this.item;
                        if (this.displayType === 'card-tag') {
                            return (h("yoo-avatar", { class: "msmall entity-display", user: user }));
                        }
                        text = getUserDisplayName(user);
                        break;
                    case 'unsplash':
                        return h("yoo-avatar", { class: "msmall entity-display", imgSrc: defaultText });
                    case 'feeds':
                        let feed = this.item;
                        text = feed.title;
                        break;
                    case 'blog':
                        text = this.item.title;
                        break;
                    case 'missions':
                        let mission = this.item;
                        text = mission.title;
                        break;
                    case 'feedsComments':
                        let comment = this.item;
                        text = comment.text;
                        break;
                    case 'files':
                        let file = this.item;
                        text = file._filename;
                        break;
                    case 'folders':
                        let f = this.item;
                        text = f.name;
                        break;
                    case 'notifications':
                        text = translateMulti(this.item.title);
                        break;
                    case 'channels':
                        text = this.item.name;
                        break;
                    case 'environnement':
                        text = this.item.title;
                        break;
                    case 'googlemaps':
                        text = this.item.address;
                        break;
                    case 'translations':
                        text = this.item[getCurrentLanguage()] || this.item.key;
                        break;
                    case 'missiondescriptions':
                        text = this.item.title;
                        break;
                    case 'tenants':
                        break;
                    case 'mediacapturedevices':
                        text = this.item.label;
                        break;
                    default:
                        if (this.customModel && this.customModel.appearance && this.customModel.appearance.has('title')) {
                            text = [].concat(this.customModel.appearance.get('title')).map(t => this.getCustomModelValue(t, this.item, this.customModel.formFields)).join(' ');
                        }
                        else {
                            text = null;
                        }
                        break;
                }
                if (this.columnDefinition && this.columnDefinition.name) {
                    text = this.item[this.columnDefinition.name];
                }
                text = text || defaultText;
                if (text && this.useTranslate) {
                    text = text.toUpperCase();
                }
                text = translateMulti(text);
                if (this.readonly) {
                    return (h("yoo-badge", { isHistory: this.isHistory, class: { 'readonly': this.readonly, 'autocomplete': this.host.classList.contains('autocomplete') }, closable: closable, text: text }));
                }
                let tagClass = getAppContext()['boost'] ? 'gradient-danger-light' : 'gradient-success';
                return (h("yoo-badge", { isHistory: this.isHistory, class: {
                        [tagClass]: this.displayType === 'card-tag',
                        'single': this.displayType !== 'card-tag',
                        'readonly': this.readonly,
                        [extraClasses]: true,
                        'autocomplete': this.host.classList.contains('autocomplete')
                    }, text: text, closable: closable, onTagClosed: (ev) => execHandlerAndStopEvent(ev, () => this.onEntityClosed()) }));
            }
            else if (this.displayType === 'card-image') {
                let entry = {};
                if (this.entityType === 'missiondescriptions') {
                    let missionDescription = this.item;
                    entry = {
                        title: missionDescription.title,
                        imgSrc: missionDescription.background ? missionDescription.background._downloadURL : null
                    };
                }
                else if (this.entityType === 'custommodels') {
                    let customModel = this.item;
                    entry = {
                        title: customModel.title,
                        imgSrc: customModel.background ? customModel.background._downloadURL : null
                    };
                }
                return (h("yoo-card-image", { entry: entry, class: (this.entityType || 'simple') + extraClasses }));
            }
            else if (this.displayType === 'card-course' || this.displayType === 'card-course-row') {
                let entry = this.item;
                let dueDate = getPlanDueDate(entry.plan, entry.assignmentDate);
                entry.isLocked = dueDate && isPlanInFuture(entry.plan, entry.assignmentDate);
                let TagType = `yoo-${this.displayType}`;
                let attrs = {
                    entry: entry,
                    class: (this.entityType || 'simple') + extraClasses
                };
                return [
                    h(TagType, Object.assign({}, attrs))
                ];
            }
            else if (this.displayType === 'card-default') {
                let entry;
                entry = this.item;
                return (h("yoo-card-default", { entry: entry, class: (this.entityType || 'simple') + extraClasses }));
            }
            else {
                return (h("yoo-card", { heading: this.item.title, subheadings: this.item.subheadings, class: (this.entityType || 'simple') + extraClasses }));
            }
        }
        return h("div", null);
    }
    static get is() { return "yoo-entity"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "bottomActions": {
            "type": "Any",
            "attr": "bottom-actions"
        },
        "clearable": {
            "type": Boolean,
            "attr": "clearable"
        },
        "columnDefinition": {
            "type": "Any",
            "attr": "column-definition"
        },
        "customModel": {
            "type": "Any",
            "attr": "custom-model"
        },
        "displayType": {
            "type": String,
            "attr": "display-type"
        },
        "entityType": {
            "type": String,
            "attr": "entity-type"
        },
        "host": {
            "elementRef": true
        },
        "iconColor": {
            "type": String,
            "attr": "icon-color"
        },
        "icons": {
            "type": "Any",
            "attr": "icons"
        },
        "isCollapsible": {
            "type": Boolean,
            "attr": "is-collapsible"
        },
        "isFramed": {
            "type": Boolean,
            "attr": "is-framed"
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "isMap": {
            "type": Boolean,
            "attr": "is-map"
        },
        "item": {
            "type": "Any",
            "attr": "item"
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "secondaryActions": {
            "type": "Any",
            "attr": "secondary-actions"
        },
        "secondaryActionsDropdown": {
            "type": Boolean,
            "attr": "secondary-actions-dropdown"
        },
        "topActions": {
            "type": "Any",
            "attr": "top-actions"
        },
        "useTranslate": {
            "type": Boolean,
            "attr": "use-translate"
        }
    }; }
    static get events() { return [{
            "name": "closed",
            "method": "closed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "collapsed",
            "method": "collapsed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "viewMoreToggled",
            "method": "viewMoreToggled",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-entity:**/"; }
}

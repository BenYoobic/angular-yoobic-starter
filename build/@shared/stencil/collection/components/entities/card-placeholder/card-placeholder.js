export class YooCardPlaceholderComponent {
    renderCardFeed() {
        return (h("div", { class: "outer-container card-feed" },
            h("div", { class: "animated-background" },
                h("div", { class: "feed-top" },
                    h("div", { class: "masker feed-heading-left" }),
                    h("div", { class: "masker feed-heading-middle" }),
                    h("div", { class: "masker feed-heading-right" }),
                    h("div", { class: "masker feed-heading-right-2" }),
                    h("div", { class: "masker feed-heading-bottom-2" }),
                    h("div", { class: "masker feed-heading-bottom" })),
                h("div", { class: "feed-under-img" },
                    h("div", { class: "masker feed-under-img-top" }),
                    h("div", { class: "masker feed-under-img-middle" }),
                    h("div", { class: "feed-icon" },
                        h("div", { class: "masker feed-icon-left" }),
                        h("div", { class: "masker feed-icon-left-2" }),
                        h("div", { class: "masker feed-icon-bottom" })),
                    h("div", { class: "feed-like" },
                        h("div", { class: "masker feed-like-left" }),
                        h("div", { class: "masker feed-like-bottom" })),
                    h("div", { class: "feed-description" },
                        h("div", { class: "masker feed-description-bottom" }))))));
    }
    renderCardDashboard() {
        let classList = ['pulsing', 'stripe'];
        if (this.header) {
            classList.push(this.header);
            classList.push('header');
        }
        return (h("div", { class: classList.join(' ') }));
    }
    renderCardCourse() {
        return (h("div", { class: "outer-container card-course" },
            h("div", { class: "inner-container course-image pulsing" }),
            h("div", { class: "inner-container course-title pulsing" }),
            h("div", { class: "inner-container course-content pulsing" }),
            h("div", { class: "inner-container course-badge" },
                h("div", { class: "badge pulsing" },
                    h("yoo-icon", { class: "yo-star" })),
                h("div", { class: "due-date pulsing" })),
            h("div", { class: "inner-container course-lessons-count pulsing" }),
            h("div", { class: "inner-container course-progress pulsing" })));
    }
    renderCardQuestion() {
        return (h("div", { class: "outer-container card-questions" },
            h("div", { class: "container top" },
                h("div", { class: "avatar pulsing" }),
                h("div", { class: "user-info" },
                    h("div", { class: "name pulsing" }),
                    h("div", { class: "store pulsing" })),
                h("yoo-icon", { class: "yo-like" })),
            h("div", { class: "container question pulsing" }),
            h("div", { class: "container subquestion" },
                h("div", { class: "post-date pulsing" }),
                h("div", { class: "answers-count pulsing" })),
            h("div", { class: "extra pulsing" }, "#"),
            h("div", { class: "separator first" }),
            h("div", { class: "container top" },
                h("div", { class: "avatar pulsing" }),
                h("div", { class: "user-info" },
                    h("div", { class: "name pulsing" }),
                    h("div", { class: "store pulsing" })),
                h("yoo-icon", { class: "yo-like" })),
            h("div", { class: "container image pulsing" }),
            h("div", { class: "container question pulsing" }),
            h("div", { class: "container subquestion" },
                h("div", { class: "post-date pulsing" }),
                h("div", { class: "answers-count pulsing" })),
            h("div", { class: "extra pulsing" }, "#"),
            h("div", { class: "separator last" })));
    }
    renderCardQuestionAnswers() {
        return (h("div", { class: "outer-container card-question-answers" },
            h("div", { class: "container top" },
                h("div", { class: "avatar pulsing" }),
                h("div", { class: "user-info" },
                    h("div", { class: "name pulsing" }),
                    h("div", { class: "store pulsing" }))),
            h("div", { class: "container answer first pulsing" }),
            h("div", { class: "container answer last pulsing" }),
            h("div", { class: "container subanswer" },
                h("div", { class: "post-date pulsing" }),
                h("div", { class: "reply pulsing" }),
                h("yoo-icon", { class: "yo-like" })),
            h("div", { class: "separator" })));
    }
    renderCardList() {
        let entity = this.entityType;
        if (['missions', 'memolist', 'visits', 'contacts', 'notes', 'productbatchlist', 'custommodels'].indexOf(entity) !== -1) {
            return this.renderCardDashboard();
        }
        if (this.header === 'search') {
            return this.renderCardDashboard();
        }
        if (entity === 'lessons') {
            return this.renderCardListLessons();
        }
        if (entity === 'userranks') {
            return this.renderUserRanks();
        }
        return (h("div", { class: 'outer-container card-list ' + entity },
            h("div", { class: "animated-background" },
                (entity !== 'environnement') && (entity !== 'locations') && (entity !== 'dashboards') ?
                    h("div", { class: "image-container" },
                        h("div", { class: "masker container-image" }),
                        (entity !== 'feedsComments' ?
                            h("div", { class: "masker container-image-2" })
                            : null))
                    : null,
                h("div", { class: "content-container" },
                    h("div", { class: "masker container-top" }),
                    ((entity !== 'environnement') ?
                        h("div", { class: "masker container-left" })
                        : null),
                    ((entity !== 'filesFolders') && (entity !== 'files') && (entity !== 'environnement')) ?
                        h("div", { class: "masker container-middle" })
                        : null,
                    (entity === 'feedsComments') ?
                        h("div", { class: "masker container-middle-2" })
                        : null,
                    ((entity === 'notifications') || (entity === 'dashboards') || (entity === 'locations') || (entity === 'missiondescriptions') || (entity === 'environnement') ?
                        h("div", { class: "masker container-right" })
                        : null),
                    ((entity === 'locations') || (entity === 'dashboards') || (entity === 'missiondescriptions')) ?
                        h("div", { class: "masker container-right-2" })
                        : null,
                    h("div", { class: "masker container-bottom" })))));
    }
    renderCardListLessons() {
        return (h("div", { class: "outer-container card-list lessons" },
            h("div", { class: "icon-container pulsing" }),
            h("div", { class: "info-container" },
                h("div", { class: "title-container pulsing" }),
                h("div", { class: "order-container pulsing" }),
                h("div", { class: "remaining-points-container" },
                    h("yoo-icon", { class: "yo-star" }),
                    h("div", { class: "inner-text pulsing" }))),
            h("div", { class: "extra-icon-container" })));
    }
    renderCardListViews() {
        return (h("div", { class: "outer-container card-list views" },
            h("div", { class: "animated-background" },
                h("div", { class: "image-container" },
                    h("div", { class: "masker container-image" }),
                    h("div", { class: "masker container-image-2" })),
                h("div", { class: "content-container" },
                    h("div", { class: "masker container-top" }),
                    h("div", { class: "masker container-left" }),
                    h("div", { class: "masker container-right" }),
                    h("div", { class: "masker container-bottom" })))));
    }
    renderUserRanks() {
        return (h("div", { class: "outer-container userranks" },
            h("div", { class: "rank-container pulsing" }),
            h("div", { class: "avatar pulsing" }),
            h("div", { class: "name pulsing" }),
            h("yoo-icon", { class: "yo-star pulsing" })));
    }
    renderCardSticky() {
        return (h("div", { class: "outer-container card-sticky" },
            h("div", { class: "gradient-container animated-background" },
                h("div", { class: "text-container" },
                    h("div", { class: "category" },
                        h("div", { class: "masker category-content" })),
                    h("div", { class: "title" },
                        h("div", { class: "masker title-content" })),
                    h("div", { class: "button-card" },
                        h("div", { class: "masker button-content" }))))));
    }
    renderCardCell() {
        return (h("div", { class: {
                'outer-container card-cell': true,
                'header': this.header === 'search'
            } },
            h("div", { class: "animated-background" }, this.header ? h("div", { class: "header" }) : [
                h("div", { class: "masker" }),
                h("div", { class: "masker" }),
                h("div", { class: "masker" }),
                h("div", { class: "masker" })
            ])));
    }
    render() {
        switch (this.displayType) {
            case 'card-sticky': {
                return (this.renderCardSticky());
            }
            case 'card-list': {
                return (this.renderCardList());
            }
            case 'card-feed': {
                switch (this.entityType) {
                    case 'feeds': {
                        return (this.renderCardFeed());
                    }
                    case 'blog': {
                        return (this.renderCardFeed());
                    }
                    case 'questions': {
                        return (this.renderCardQuestion());
                    }
                    case 'questionsanswers': {
                        return (this.renderCardQuestionAnswers());
                    }
                }
                break;
            }
            case 'card-course': {
                return (this.renderCardCourse());
            }
            case 'card-cell': {
                return this.renderCardCell();
            }
            default: {
                return (this.renderCardList());
            }
        }
    }
    static get is() { return "yoo-card-placeholder"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "displayType": {
            "type": String,
            "attr": "display-type"
        },
        "entityType": {
            "type": String,
            "attr": "entity-type"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-card-placeholder:**/"; }
}

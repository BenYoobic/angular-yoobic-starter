import { setValidator, setValueAndValidateInput, cloudinary, translate, translateMulti, showImagePhotoEditorsModal, getAppContext, isCordova, isIOS, isTablet } from '../../../utils';
import interact from 'interactjs';
import { findIndex, isEqual, isArray, shuffle } from 'lodash-es';
export class YooFormChoiceComponent {
    constructor() {
        this.multiple = false;
        this.values = [];
        this.validators = [];
        this.images = [];
        this.selection = [];
    }
    componentWillLoad() {
        setValidator(this);
        if (getAppContext()['boost']) {
            if (this.images && this.images.length > 0 && this.values) {
                let imageItems = this.images;
                let valueItems = this.values;
                let shuffledItems = valueItems.map((valueItem, index) => {
                    return {
                        valueItem,
                        _downloadURL: imageItems[index]._downloadURL
                    };
                });
                this.values = this.values ? shuffle(shuffledItems) : [];
            }
        }
    }
    componentDidLoad() {
        if (this.value) {
            this.selection = [].concat(this.value || []);
        }
        if (this.type === 'ranking') {
            if (isCordova()) {
                this.clearInteractEvents();
            }
            this.initInteract();
        }
        this.updateShowOther();
    }
    validate() {
        let isValid = true;
        const rankingIsValid = isArray(this.value) && this.value.length === this.values.length;
        if (this.required && (!this.value || (this.type === 'ranking' && !rankingIsValid))) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validity = isValid;
        }
        this.validityChanged.emit(this.validity);
        return this.validity;
    }
    initInteract() {
        if (!this.readonly) {
            this.initInteractDraggable();
            this.initInteractDroppable();
        }
    }
    clearInteractEvents() {
        interact('div.item').unset();
    }
    initInteractDraggable() {
        interact(`div.item.item-${this.slideIndex}-${this.inputIndex}`)
            .draggable({
            inertia: true,
            onmove: (ev) => {
                this.dragMoveListener(ev);
                if (ev.target && ev.target.classList) {
                    ev.target.classList.add('drag-target');
                }
            },
            onend: (ev) => {
                this.dragEndListener(ev);
                if (ev.target && ev.target.classList) {
                    ev.target.classList.remove('drag-target');
                }
            }
        })
            .on('tap', (ev) => {
            if (ev && ev.target && ev.target.dataset && isCordova() && isIOS()) {
                let index = ev.target.dataset.index;
                if (this.type === 'ranking' && index) {
                    let item = this.values[index];
                    if (this.value && this.value.indexOf(item) >= 0) {
                        this.onRankedItemClick(index);
                    }
                    else {
                        this.onItemClick(index);
                    }
                }
            }
        });
    }
    initInteractDroppable() {
        interact('.droppable', {
            context: this.outerContainerElement
        }).dropzone({
            overlap: 0.55,
            ondragenter: (ev) => {
                if (ev.target && ev.target.classList) {
                    ev.target.classList.add('drop-target');
                }
            },
            ondragleave: (ev) => {
                if (ev.target && ev.target.classList) {
                    ev.target.classList.remove('drop-target');
                }
            },
            ondrop: (ev) => this.onDropWord(ev)
        });
    }
    onDropWord(event) {
        if (event.target && event.relatedTarget) {
            let droppedWord = event.relatedTarget.lastChild.textContent;
            let itemHeight = 50;
            let stepY = 30;
            let move = event.dragEvent.clientY - event.dragEvent.clientY0;
            let shift = 0;
            if (Math.abs(move) > itemHeight) {
                shift = Math.round(move / itemHeight);
            }
            else if (Math.abs(move) % itemHeight > stepY) {
                shift += Math.sign(move);
            }
            if (shift !== 0) {
                this.updateRanking(droppedWord, shift);
            }
            event.target.classList.remove('drop-target');
        }
    }
    dragMoveListener(event) {
        let target = event.target, 
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx, y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        if (target) {
            // translate the element
            target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            // update the position attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    }
    dragEndListener(event) {
        let target = event.target;
        if (target) {
            // reset translate transformation
            let move = Math.floor(target.getAttribute('data-y') / 50);
            target.style.webkitTransform = target.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
            // reset the position attributes
            target.setAttribute('data-x', 0);
            target.setAttribute('data-y', 0);
            let children = target.children;
            let text = children[children.length > 1 ? 1 : 0].textContent;
            let currIndex = this.values.indexOf(text);
            // compute new value[] according to drag movement
            this.updateRank(currIndex, move, text);
        }
    }
    updateRank(valuesIndex, move, currItem) {
        if (this.value && this.value.length > 0) {
            let currRank = this.value.indexOf(currItem);
            let isRanked = true;
            if (currRank < 0) {
                isRanked = false;
                let remaining = this.values.slice();
                this.value.forEach(element => {
                    remaining.splice(remaining.indexOf(element), 1);
                });
                currRank = remaining.indexOf(currItem) + this.value.length;
            }
            let newRank = currRank + move;
            newRank = newRank < 0 ? 0 : newRank >= this.value.length ? this.value.length - 1 : newRank;
            this.updateValue(currRank, newRank, isRanked, valuesIndex);
        }
        else {
            this.value = [];
            this.value.push(this.values[valuesIndex]);
        }
    }
    updateValue(oldRank, newRank, isRanked, valueIndex) {
        let tmp = this.value.slice();
        if (!isRanked) {
            tmp.push(this.values[valueIndex]);
            oldRank = tmp.length - 1;
        }
        if (newRank >= tmp.length) {
            let i = newRank - tmp.length + 1;
            while (i--) {
                tmp.push(undefined);
            }
        }
        tmp.splice(newRank, 0, tmp.splice(oldRank, 1)[0]);
        this.value = tmp.slice();
    }
    ;
    calculateColumn(size) {
        this.sizeColumn = '';
        if (size === 1) {
            this.sizeColumn = 'singleColumn';
        }
        else {
            this.sizeColumn = 'doubleColumn';
        }
    }
    calculateButton(size) {
        this.sizeButton = '';
        this.widthButton = {};
        if (size === 1) {
            this.sizeButton = 'large';
            this.widthButton = { 'width': '100%' };
        }
        else {
            this.widthButton = { 'width': '49%' };
        }
    }
    convertToEntities(values) {
        let valuesEntity = [];
        if (values.map) {
            values.map((value) => {
                let valueEntity = { _id: value, title: translateMulti(value) };
                valuesEntity = [...valuesEntity, valueEntity];
            });
        }
        return valuesEntity;
    }
    convertToChoiceFormat(valuesEntity) {
        let values = [];
        if (valuesEntity.map) {
            valuesEntity.map((valueEntity) => {
                let value = valueEntity._id;
                values = [...values, value];
            });
        }
        return values;
    }
    getValuesWithOther() {
        let valuesOther = [...this.values];
        if (this.allowOther && !this.multiple) {
            valuesOther.push(translate('OTHER'));
        }
        return valuesOther;
    }
    setShowOther(value) {
        this.showOther = value;
        // wait for a while the textarea to be presented
        setTimeout(() => {
            if (this.showOther && this.textareaRef) {
                this.textareaRef.focus();
            }
        }, 50);
    }
    updateShowOther() {
        if (this.allowOther && this.value && this.values && this.values.indexOf(this.value) < 0) {
            this.setShowOther(true);
        }
    }
    onInput(ev) {
        ev.stopPropagation();
        this.textareaValue = ev.target.value;
        this.selection = [this.textareaValue];
        setValueAndValidateInput(this.multiple ? this.selection : (this.selection.length > 0 ? this.selection[0] : null), this);
        this.updateShowOther();
    }
    onOpenImage(text, index) {
        let items = this.images.map((item, i) => {
            item.imageTitle = this.values[i];
            return item;
        });
        showImagePhotoEditorsModal(items, index);
    }
    onItemSelect(item) {
        if (item === translate('OTHER')) {
            this.value = null;
            this.selection = [];
            this.setShowOther(true);
        }
        else {
            let index = this.selection.indexOf(item);
            if (this.multiple) {
                if (index >= 0) {
                    this.selection.splice(index, 1);
                    this.selection = [...this.selection];
                }
                else {
                    this.selection = [...this.selection, item];
                }
            }
            else {
                if (index >= 0) {
                    this.selection = [];
                }
                else {
                    this.selection = [item];
                }
            }
            setValueAndValidateInput(this.multiple ? this.selection : (this.selection.length > 0 ? this.selection[0] : null), this);
            this.setShowOther(false);
        }
    }
    onItemSelectRadio(item) {
        if (item === null) {
            this.onItemSelect(item);
        }
        else if (this.multiple) {
            this.selection = this.convertToChoiceFormat(item);
            setValueAndValidateInput(this.selection, this);
        }
        else {
            this.onItemSelect(item._id);
        }
    }
    isSelected(item) {
        let selection = [].concat(this.selection);
        let index = findIndex(selection, (s) => isEqual(item, s));
        return index >= 0;
    }
    onItemClick(index) {
        if (this.type === 'ranking') {
            let item = this.values[index];
            let value = isArray(this.value) ? this.value : [];
            value = [...value, item];
            setValueAndValidateInput(value, this);
        }
    }
    updateRanking(word, steps) {
        let from = this.value.findIndex(w => w === word);
        let to = from + steps;
        if (to < 0 || to > this.value.length) {
            return;
        }
        else {
            let tempValue = this.value.filter(w => w !== word);
            tempValue.splice(to, 0, word);
            this.value = tempValue;
            setValueAndValidateInput(this.value, this);
        }
    }
    onRankedItemClick(index) {
        if (isArray(this.value)) {
            let value = [...this.value];
            value.splice(index, 1);
            setValueAndValidateInput(value, this);
        }
    }
    onTextAreaFocused() {
        let evDetail = { host: this.textareaRef };
        this.inputFocused.emit(evDetail);
    }
    renderButton() {
        let valuesSize = this.values.length;
        this.calculateColumn(valuesSize);
        this.calculateButton(valuesSize);
        return h("div", { class: 'grid-container ' + this.sizeColumn }, this.values.map((item) => {
            return this.renderItem(item);
        }));
    }
    renderRadio() {
        let valuesOther = this.getValuesWithOther();
        let valuesEntity = this.convertToEntities(valuesOther);
        let initialEntity = null;
        if (this.showOther) {
            initialEntity = valuesEntity.find(v => v._id === translate('OTHER'));
        }
        else if (this.value) {
            initialEntity = this.convertToEntities(!Array.isArray(this.value) ? [this.value] : this.value);
        }
        return [this.values ?
                h("yoo-grid", { class: "radio-button-choice form-choice no-animation", items: valuesEntity, initialSelection: initialEntity, keepSelection: true, multiple: this.multiple, displayType: 'card-list', onSelect: (ev) => this.onItemSelectRadio(ev.detail), hideHeader: true, hideFooter: true, isLocal: true, useTranslate: this.useTranslate, animated: false, valuesColor: this.valuesColor }) : null,
            (this.showOther ?
                h("div", { class: "input-zone" },
                    h("textarea", { ref: el => this.textareaRef = el, value: this.textareaValue, onInput: (ev) => this.onInput(ev), onFocus: () => this.onTextAreaFocused() }))
                : null)];
    }
    getColor(value) {
        if (this.valuesColor && value) {
            if (!this.isSelected(value)) {
                return '';
            }
            let color = this.valuesColor.find(e => e.key === value);
            return color && color.value ? color.value : '';
        }
    }
    getBackgroundClass(value) {
        if (this.valuesColor && value) {
            let color = this.valuesColor.find(e => e.key === value);
            if (color && color.value) {
                return '';
            }
        }
        return 'gradient-success';
    }
    renderItem(item) {
        return (h("yoo-button", { style: this.widthButton, onClick: () => this.onItemSelect(item), text: this.useTranslate ? translate(item.toUpperCase()) : translateMulti(item), class: 'btn-form-choice ' + this.sizeButton + ' ' + (this.isSelected(item) ? this.getBackgroundClass(item) : 'outline'), bgColor: this.getColor(item) }));
    }
    renderRanking() {
        return [this.value && this.value.map ? this.value.map((v, index) => {
                return h("div", { "data-index": index, class: `item item-${this.slideIndex}-${this.inputIndex} droppable`, onClick: (ev) => this.onRankedItemClick(index) },
                    h("span", { class: "badge-inner" }, index + 1),
                    h("span", null, translateMulti(v)));
            }) : null,
            this.values ? this.values.map((v, ind) => {
                return !this.value || this.value.indexOf(v) === -1 ? h("div", { "data-index": ind, class: `item item-${this.slideIndex}-${this.inputIndex}`, onClick: () => this.onItemClick(ind) },
                    h("span", null, translateMulti(v))) : null;
            }) : null];
    }
    renderChat() {
        let sentenceMessage = {
            content: translateMulti(this.sentence),
            isAlternate: false
        };
        return h("div", { class: "messages-container" },
            !this.description && h("div", { class: "chat-title" }, translate('THECLIENTASKS')),
            h("div", { class: "chat-item" },
                h("yoo-chat-message", { hideEmptyCheckbox: true, message: sentenceMessage })),
            h("div", { class: "chat-title alternate" }, translate('WHATSTHECORRECTRESPONSE')),
            this.values ? this.values.map(v => {
                let message = {
                    content: v,
                    isAlternate: true
                };
                return h("yoo-chat-message", { class: this.isSelected(v) ? '' : 'choice', message: message, onClick: () => this.onItemSelect(v) });
            }) : null);
    }
    renderCard() {
        return (h("div", { class: "card-container" }, this.values.map(item => {
            return (h("div", { class: { 'card-select': true, 'selected': this.isSelected(item.value) }, onClick: () => this.onItemSelect(item.value) },
                h("div", { class: "card-heading" }, translate(item.title)),
                h("div", { class: "card-description" }, translate(item.description)),
                h("div", { class: "check-container" },
                    h("yoo-icon", { class: "yo-check" }))));
        })));
    }
    renderImage() {
        if (getAppContext()['boost']) {
            return (h("div", { class: 'images-container' }, this.values ? this.values.map((v, ind) => {
                return (h("div", { onClick: this.isHistory ? () => { this.onOpenImage(v.valueItem, ind); } : null, class: {
                        'image-container': true,
                        'twoline-description': v.valueItem.length > 30 && !isTablet(),
                        'twoline-description-tablet': v.valueItem.length > 30 && isTablet()
                    } },
                    this.isHistory ? null : [
                        h("div", { onClick: () => { showImagePhotoEditorsModal(this.values, ind); }, class: "maximize-container" },
                            h("yoo-icon", { class: "yo-maximize" }))
                    ],
                    h("div", { class: 'image-content', onClick: !this.readonly ? (ev) => this.onItemSelect(v.valueItem) : null },
                        v._downloadURL && h("yoo-img", { type: "back", class: "image boost-image", src: cloudinary(v._downloadURL, 98, 98, null, null, null, null, true) }),
                        !this.readonly ? h("yoo-form-checkbox", { class: "btn-form-choice", value: this.isSelected(v.valueItem) }) : null,
                        h("div", { class: "text boost-text" }, v.valueItem))));
            }) : null));
        }
        return (h("div", { class: "images-container" }, this.values ? this.values.map((v, ind) => {
            return (h("div", { onClick: this.isHistory ? () => { this.onOpenImage(v, ind); } : null, class: "image-container" },
                h("div", { class: 'image-content', onClick: !this.readonly ? (ev) => this.onItemSelect(v) : null },
                    this.images[ind] && this.images[ind]._downloadURL ? h("yoo-img", { type: "back", class: "image", src: cloudinary(this.images[ind]._downloadURL, 98, 98, null, null, null, null, true) }) : null,
                    !this.readonly ? h("yoo-form-checkbox", { class: "btn-form-choice", value: this.isSelected(v) }) : null,
                    h("div", { class: "text" }, v)),
                this.isHistory ? null : [
                    h("div", { onClick: () => { this.onOpenImage(v, ind); }, class: "maximize-container" },
                        h("yoo-icon", { class: "yo-maximize" }))
                ]));
        }) : null));
    }
    renderReadonlyRanking() {
        return [
            this.value && this.value.map ? this.value.map((v, index) => h("div", { class: "item" },
                h("span", { class: "badge-inner" }, index + 1),
                h("span", null, translateMulti(v)))) : null
        ];
    }
    renderReadonlyChat() {
        return [
            this.value ? h("span", null, translateMulti(this.value)) : null
        ];
    }
    renderReadOnlyImage(value) {
        let image = this.images.find(img => img._filename === value);
        return (h("div", { class: "image-container" },
            h("div", { class: 'image-content' }, image && image._downloadURL ?
                h("yoo-img", { type: "back", class: "image", src: cloudinary(image._downloadURL, 98, 98, null, null, null, null, true) }) : null)));
    }
    renderReadonly() {
        if (this.type === 'ranking') {
            return this.renderReadonlyRanking();
        }
        else if (this.type === 'chat') {
            return this.renderReadonlyChat();
        }
        else if (this.type === 'image') {
            return this.renderImage();
        }
        else {
            return this.value ? [].concat(this.value).map(v => {
                let color = this.getColor(v);
                let style = {};
                if (color) {
                    style = { color: color };
                }
                return h("div", { class: "text", innerHTML: translateMulti(v), style: style });
            }) : null;
        }
    }
    renderEditable() {
        switch (this.type) {
            case 'radio':
                return this.renderRadio();
            case 'ranking':
                return this.renderRanking();
            case 'chat':
                return this.sentence ? this.renderChat() : null;
            case 'image':
                return this.renderImage();
            case 'button':
                return this.renderButton();
            case 'card':
                return this.renderCard();
        }
    }
    renderTextHistory() {
        return this.value ? [].concat(this.value).map((v, index) => {
            let color = this.getColor(v);
            let style = {};
            if (color) {
                style = { color: color };
            }
            return h("span", { class: "text", innerHTML: (index !== 0 ? ', ' : '') + v, style: style });
        }) : null;
    }
    hostData() {
        return {
            class: Object.assign({ 'swiper-no-swiping': this.type === 'image' }, getAppContext())
        };
    }
    render() {
        return (this.readonly ? h("div", { class: "readonly" }, this.renderReadonly()) :
            h("div", { ref: el => this.outerContainerElement = el, class: {
                    'outer-container': true,
                    'droppable': this.type === 'ranking'
                } }, this.values && this.renderEditable()));
    }
    static get is() { return "yoo-form-choice"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowOther": {
            "type": Boolean,
            "attr": "allow-other"
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "description": {
            "type": String,
            "attr": "description"
        },
        "host": {
            "elementRef": true
        },
        "images": {
            "type": "Any",
            "attr": "images"
        },
        "inputIndex": {
            "type": Number,
            "attr": "input-index"
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "selection": {
            "state": true
        },
        "sentence": {
            "type": String,
            "attr": "sentence"
        },
        "showOther": {
            "state": true
        },
        "slideIndex": {
            "type": Number,
            "attr": "slide-index"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "useTranslate": {
            "type": Boolean,
            "attr": "use-translate"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "type": Boolean,
            "attr": "validity",
            "mutable": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        },
        "values": {
            "type": "Any",
            "attr": "values",
            "mutable": true
        },
        "valuesColor": {
            "type": "Any",
            "attr": "values-color"
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-choice:**/"; }
}

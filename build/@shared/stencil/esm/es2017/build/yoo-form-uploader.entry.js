import { h } from '../design-system.core.js';

import { aQ as setValueAndValidateInput } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { J as getMimeType } from './chunk-262e5ad4.js';

/*!
 * FilePondPluginFileValidateType 1.2.4
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

const plugin = ({ addFilter, utils }) => {
  // get quick reference to Type utils
  const {
    Type,
    isString,
    replaceInString,
    guesstimateMimeType,
    getExtensionFromFilename,
    getFilenameFromURL
  } = utils;

  const mimeTypeMatchesWildCard = (mimeType, wildcard) => {
    const mimeTypeGroup = (/^[^/]+/.exec(mimeType) || []).pop(); // image/png -> image
    const wildcardGroup = wildcard.slice(0, -2); // image/* -> image
    return mimeTypeGroup === wildcardGroup;
  };

  const isValidMimeType = (acceptedTypes, userInputType) =>
    acceptedTypes.some(acceptedType => {
      // accepted is wildcard mime type
      if (/\*$/.test(acceptedType)) {
        return mimeTypeMatchesWildCard(userInputType, acceptedType);
      }

      // is normal mime type
      return acceptedType === userInputType;
    });

  const getItemType = item => {
    // if the item is a url we guess the mime type by the extension
    let type = '';
    if (isString(item)) {
      const filename = getFilenameFromURL(item);
      const extension = getExtensionFromFilename(filename);
      if (extension) {
        type = guesstimateMimeType(extension);
      }
    } else {
      type = item.type;
    }

    return type;
  };

  const validateFile = (item, acceptedFileTypes, typeDetector) => {
    // no types defined, everything is allowed \o/
    if (acceptedFileTypes.length === 0) {
      return true;
    }

    // gets the item type
    const type = getItemType(item);

    // no type detector, test now
    if (!typeDetector) {
      return isValidMimeType(acceptedFileTypes, type);
    }

    // use type detector
    return new Promise((resolve, reject) => {
      typeDetector(item, type)
        .then(detectedType => {
          if (isValidMimeType(acceptedFileTypes, detectedType)) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  };

  const applyMimeTypeMap = map => acceptedFileType =>
    map[acceptedFileType] === null
      ? false
      : map[acceptedFileType] || acceptedFileType;

  // setup attribute mapping for accept
  addFilter('SET_ATTRIBUTE_TO_OPTION_MAP', map =>
    Object.assign(map, {
      accept: 'acceptedFileTypes'
    })
  );

  // filtering if an item is allowed in hopper
  addFilter('ALLOW_HOPPER_ITEM', (file, { query }) => {
    // if we are not doing file type validation exit
    if (!query('GET_ALLOW_FILE_TYPE_VALIDATION')) {
      return true;
    }

    // we validate the file against the accepted file types
    return validateFile(file, query('GET_ACCEPTED_FILE_TYPES'));
  });

  // called for each file that is loaded
  // right before it is set to the item state
  // should return a promise
  addFilter(
    'LOAD_FILE',
    (file, { query }) =>
      new Promise((resolve, reject) => {
        if (!query('GET_ALLOW_FILE_TYPE_VALIDATION')) {
          resolve(file);
          return;
        }

        const acceptedFileTypes = query('GET_ACCEPTED_FILE_TYPES');

        // custom type detector method
        const typeDetector = query('GET_FILE_VALIDATE_TYPE_DETECT_TYPE');

        // if invalid, exit here
        const validationResult = validateFile(
          file,
          acceptedFileTypes,
          typeDetector
        );

        const handleRejection = () => {
          const acceptedFileTypesMapped = acceptedFileTypes
            .map(
              applyMimeTypeMap(
                query('GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP')
              )
            )
            .filter(label => label !== false);

          reject({
            status: {
              main: query('GET_LABEL_FILE_TYPE_NOT_ALLOWED'),
              sub: replaceInString(
                query('GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES'),
                {
                  allTypes: acceptedFileTypesMapped.join(', '),
                  allButLastType: acceptedFileTypesMapped
                    .slice(0, -1)
                    .join(', '),
                  lastType:
                    acceptedFileTypesMapped[acceptedFileTypesMapped.length - 1]
                }
              )
            }
          });
        };

        // has returned new filename immidiately
        if (typeof validationResult === 'boolean') {
          if (!validationResult) {
            return handleRejection();
          }
          return resolve(file);
        }

        // is promise
        validationResult
          .then(() => {
            resolve(file);
          })
          .catch(handleRejection);
      })
  );

  // expose plugin
  return {
    // default options
    options: {
      // Enable or disable file type validation
      allowFileTypeValidation: [true, Type.BOOLEAN],

      // What file types to accept
      acceptedFileTypes: [[], Type.ARRAY],
      // - must be comma separated
      // - mime types: image/png, image/jpeg, image/gif
      // - extensions: .png, .jpg, .jpeg ( not enabled yet )
      // - wildcards: image/*

      // label to show when a type is not allowed
      labelFileTypeNotAllowed: ['File is of invalid type', Type.STRING],

      // nicer label
      fileValidateTypeLabelExpectedTypes: [
        'Expects {allButLastType} or {lastType}',
        Type.STRING
      ],

      // map mime types to extensions
      fileValidateTypeLabelExpectedTypesMap: [{}, Type.OBJECT],

      // Custom function to detect type of file
      fileValidateTypeDetectType: [null, Type.FUNCTION]
    }
  };
};

// fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser) {
  document.dispatchEvent(
    new CustomEvent('FilePond:pluginloaded', { detail: plugin })
  );
}

if (FilePond) {
    FilePond.registerPlugin(plugin);
}
class YooFormUploaderComponent {
    constructor() {
        this.validators = [];
        this.required = false;
    }
    requiredWatch() {
        this.validate();
    }
    componentDidLoad() {
        if (this.inputElement && !this.readonly) {
            if (FilePond) {
                this.pond = FilePond.create(this.inputElement, {
                    maxFiles: this.multiple ? null : 1,
                    required: this.required,
                    allowMultiple: this.multiple,
                    acceptedFileTypes: this.extensions ? this.extensions.map(ext => getMimeType(ext)) : []
                    //fileValidateTypeLabelExpectedTypesMap: 
                });
                this.pond.on('updatefiles', () => {
                    let files = this.pond.getFiles();
                    if (files && files.length > 0) {
                        files = files.map(f => f.file);
                        if (this.multiple) {
                            setValueAndValidateInput(files, this);
                        }
                        else {
                            setValueAndValidateInput(files[0], this);
                        }
                    }
                    else {
                        setValueAndValidateInput(null, this);
                    }
                });
            }
        }
    }
    componentDidUnload() {
        if (this.pond) {
            this.pond.destroy();
        }
    }
    validate() {
        let isValid = true;
        if (this.required && !this.value) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validity = isValid;
            this.validityChanged.emit(isValid);
        }
        return this.validity;
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.value);
    }
    renderEditable() {
        return h("div", { class: "container" },
            h("input", { ref: el => this.inputElement = el, type: "file" }));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-uploader"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "extensions": {
            "type": "Any",
            "attr": "extensions"
        },
        "host": {
            "elementRef": true
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required",
            "watchCallbacks": ["requiredWatch"]
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": Boolean,
            "attr": "value",
            "mutable": true
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
    static get style() { return "/*!\n * FilePond 4.3.4\n * Licensed under MIT, https://opensource.org/licenses/MIT/\n * Please visit https://pqina.nl/filepond/ for details.\n */\n\n/* eslint-disable */\n.filepond--assistant{position:absolute;overflow:hidden;height:1px;width:1px;padding:0;border:0;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%);white-space:nowrap}.filepond--browser.filepond--browser{position:absolute;margin:0;padding:0;left:1em;top:1.75em;width:calc(100% - 2em);opacity:0;font-size:0}.filepond--drip{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;opacity:.1;pointer-events:none;border-radius:.5em;background:rgba(0,0,0,.01)}.filepond--drip-blob{-webkit-transform-origin:center center;transform-origin:center center;width:8em;height:8em;margin-left:-4em;margin-top:-4em;background:#292625;border-radius:50%}.filepond--drip-blob,.filepond--drop-label{position:absolute;top:0;left:0;will-change:transform,opacity}.filepond--drop-label{right:0;margin:0;color:#4f4f4f;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;height:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.filepond--drop-label.filepond--drop-label label{display:block;margin:0;padding:.5em}.filepond--drop-label label{cursor:default;font-size:.875em;font-weight:400;text-align:center;line-height:1.5}.filepond--label-action{text-decoration:underline;-webkit-text-decoration-skip:ink;text-decoration-skip-ink:auto;-webkit-text-decoration-color:#a7a4a4;text-decoration-color:#a7a4a4;cursor:pointer}.filepond--root[data-disabled] .filepond--drop-label label{opacity:.5}.filepond--file-action-button.filepond--file-action-button{font-size:1em;width:1.625em;height:1.625em;font-family:inherit;line-height:inherit;margin:0;padding:0;border:none;outline:none;will-change:transform,opacity}.filepond--file-action-button.filepond--file-action-button svg{width:100%;height:100%}.filepond--file-action-button.filepond--file-action-button:after{position:absolute;left:-.75em;right:-.75em;top:-.75em;bottom:-.75em;content:\"\"}.filepond--file-action-button{cursor:auto;color:#fff;border-radius:50%;background-color:rgba(0,0,0,.5);background-image:none;-webkit-box-shadow:0 0 0 0 hsla(0,0%,100%,0);box-shadow:0 0 0 0 hsla(0,0%,100%,0);-webkit-transition:-webkit-box-shadow .25s ease-in;transition:-webkit-box-shadow .25s ease-in;transition:box-shadow .25s ease-in;transition:box-shadow .25s ease-in, -webkit-box-shadow .25s ease-in}.filepond--file-action-button:focus,.filepond--file-action-button:hover{-webkit-box-shadow:0 0 0 .125em hsla(0,0%,100%,.9);box-shadow:0 0 0 .125em hsla(0,0%,100%,.9)}.filepond--file-action-button[disabled]{color:hsla(0,0%,100%,.5);background-color:rgba(0,0,0,.25)}.filepond--file-info{position:static;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex:1;flex:1;margin:0 .5em 0 0;min-width:0;will-change:transform,opacity;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.filepond--file-info *{margin:0}.filepond--file-info .filepond--file-info-main{font-size:.75em;line-height:1.2;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:100%}.filepond--file-info .filepond--file-info-sub{font-size:.625em;opacity:.5;-webkit-transition:opacity .25s ease-in-out;transition:opacity .25s ease-in-out;white-space:nowrap}.filepond--file-info .filepond--file-info-sub:empty{display:none}.filepond--file-status{position:static;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:end;align-items:flex-end;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;margin:0;min-width:2.25em;text-align:right;will-change:transform,opacity;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.filepond--file-status *{margin:0;white-space:nowrap}.filepond--file-status .filepond--file-status-main{font-size:.75em;line-height:1.2}.filepond--file-status .filepond--file-status-sub{font-size:.625em;opacity:.5;-webkit-transition:opacity .25s ease-in-out;transition:opacity .25s ease-in-out}.filepond--file-wrapper.filepond--file-wrapper{border:none;margin:0;padding:0;min-width:0;height:100%}.filepond--file-wrapper.filepond--file-wrapper>legend{position:absolute;overflow:hidden;height:1px;width:1px;padding:0;border:0;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%);white-space:nowrap}.filepond--file{position:static;display:-ms-flexbox;display:flex;height:100%;-ms-flex-align:start;align-items:flex-start;padding:.5625em;color:#fff;border-radius:.5em}.filepond--file .filepond--file-status{margin-left:auto;margin-right:2.25em}.filepond--file .filepond--processing-complete-indicator{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:3}.filepond--file .filepond--file-action-button,.filepond--file .filepond--processing-complete-indicator,.filepond--file .filepond--progress-indicator{position:absolute}.filepond--file [data-align*=left]{left:.5625em}.filepond--file [data-align*=right]{right:.5625em}.filepond--file [data-align*=center]{left:calc(50% - .8125em)}.filepond--file [data-align*=bottom]{bottom:1.125em}.filepond--file [data-align=center]{top:calc(50% - .8125em)}.filepond--file .filepond--progress-indicator{margin-top:.1875em}.filepond--file .filepond--progress-indicator[data-align*=right]{margin-right:.1875em}.filepond--file .filepond--progress-indicator[data-align*=left]{margin-left:.1875em}[data-filepond-item-state*=error] .filepond--file-info,[data-filepond-item-state*=invalid] .filepond--file-info,[data-filepond-item-state=cancelled] .filepond--file-info{margin-right:2.25em}[data-filepond-item-state=processing-complete] .filepond--action-revert-item-processing svg{-webkit-animation:fall .5s linear .125s both;animation:fall .5s linear .125s both}[data-filepond-item-state=processing-complete] .filepond--file-info-sub,[data-filepond-item-state=processing-complete] .filepond--file-status-sub{opacity:0}[data-filepond-item-state=processing-complete] .filepond--action-revert-item-processing~.filepond--file-info .filepond--file-info-sub,[data-filepond-item-state=processing-complete] .filepond--action-revert-item-processing~.filepond--file-status .filepond--file-status-sub{opacity:.5}[data-filepond-item-state*=error] .filepond--file-wrapper,[data-filepond-item-state*=error] .filepond--panel,[data-filepond-item-state*=invalid] .filepond--file-wrapper,[data-filepond-item-state*=invalid] .filepond--panel{-webkit-animation:shake .65s linear both;animation:shake .65s linear both}[data-filepond-item-state*=busy] .filepond--progress-indicator svg{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}\@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@-webkit-keyframes shake{10%,90%{-webkit-transform:translateX(-.0625em);transform:translateX(-.0625em)}20%,80%{-webkit-transform:translateX(.125em);transform:translateX(.125em)}30%,50%,70%{-webkit-transform:translateX(-.25em);transform:translateX(-.25em)}40%,60%{-webkit-transform:translateX(.25em);transform:translateX(.25em)}}\@keyframes shake{10%,90%{-webkit-transform:translateX(-.0625em);transform:translateX(-.0625em)}20%,80%{-webkit-transform:translateX(.125em);transform:translateX(.125em)}30%,50%,70%{-webkit-transform:translateX(-.25em);transform:translateX(-.25em)}40%,60%{-webkit-transform:translateX(.25em);transform:translateX(.25em)}}\@-webkit-keyframes fall{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}70%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}to{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}\@keyframes fall{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}70%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}to{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}.filepond--hopper[data-hopper-state=drag-over]>*{pointer-events:none}.filepond--hopper[data-hopper-state=drag-over]:after{content:\"\";position:absolute;left:0;top:0;right:0;bottom:0;z-index:100}.filepond--progress-indicator{z-index:103}.filepond--file-action-button{z-index:102}.filepond--file-status{z-index:101}.filepond--file-info{z-index:100}.filepond--item{position:absolute;top:0;left:0;right:0;z-index:1;padding:0;margin:.25em;will-change:transform,opacity}.filepond--item>.filepond--panel{z-index:-1}.filepond--item>.filepond--panel .filepond--panel-bottom{-webkit-box-shadow:0 .0625em .125em -.0625em rgba(0,0,0,.25);box-shadow:0 .0625em .125em -.0625em rgba(0,0,0,.25)}.filepond--item-panel{background-color:#64605e}[data-filepond-item-state=processing-complete] .filepond--item-panel{background-color:#369763}[data-filepond-item-state*=error] .filepond--item-panel,[data-filepond-item-state*=invalid] .filepond--item-panel{background-color:#c44e47}.filepond--item-panel{border-radius:.5em;-webkit-transition:background-color .25s;transition:background-color .25s}.filepond--list-scroller{position:absolute;top:0;left:0;right:0;margin:0;will-change:transform}.filepond--list-scroller[data-state=overflow]{overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling:touch;-webkit-mask:-webkit-gradient(linear,left top, left bottom,from(#000),to(transparent));-webkit-mask:linear-gradient(180deg,#000 calc(100% - .5em),transparent);mask:-webkit-gradient(linear,left top, left bottom,from(#000),to(transparent));mask:linear-gradient(180deg,#000 calc(100% - .5em),transparent)}.filepond--list-scroller[data-state=overflow] .filepond--list{bottom:0;right:0}.filepond--list-scroller::-webkit-scrollbar{background:transparent}.filepond--list-scroller::-webkit-scrollbar:vertical{width:1em}.filepond--list-scroller::-webkit-scrollbar:horizontal{height:0}.filepond--list-scroller::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.3);border-radius:99999px;border:.3125em solid transparent;background-clip:content-box}.filepond--list.filepond--list{position:absolute;top:0;margin:0;padding:0;list-style-type:none;will-change:transform}.filepond--list{left:.75em;right:.75em}.filepond--root[data-style-panel-layout~=integrated]{width:100%;height:100%;max-width:none;margin:0}.filepond--root[data-style-panel-layout~=circle] .filepond--panel-root,.filepond--root[data-style-panel-layout~=integrated] .filepond--panel-root{border-radius:0}.filepond--root[data-style-panel-layout~=circle] .filepond--panel-root>*,.filepond--root[data-style-panel-layout~=integrated] .filepond--panel-root>*{display:none}.filepond--root[data-style-panel-layout~=circle] .filepond--drop-label,.filepond--root[data-style-panel-layout~=integrated] .filepond--drop-label{bottom:0;height:auto;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;z-index:7}.filepond--root[data-style-panel-layout~=circle] .filepond--item-panel,.filepond--root[data-style-panel-layout~=integrated] .filepond--item-panel{display:none}.filepond--root[data-style-panel-layout~=compact] .filepond--list-scroller,.filepond--root[data-style-panel-layout~=integrated] .filepond--list-scroller{overflow:hidden;height:100%;margin-top:0;margin-bottom:0}.filepond--root[data-style-panel-layout~=compact] .filepond--list,.filepond--root[data-style-panel-layout~=integrated] .filepond--list{left:0;right:0;height:100%}.filepond--root[data-style-panel-layout~=compact] .filepond--item,.filepond--root[data-style-panel-layout~=integrated] .filepond--item{margin:0}.filepond--root[data-style-panel-layout~=compact] .filepond--file-wrapper,.filepond--root[data-style-panel-layout~=integrated] .filepond--file-wrapper{height:100%}.filepond--root[data-style-panel-layout~=circle]{border-radius:99999rem;overflow:hidden}.filepond--root[data-style-panel-layout~=circle]>.filepond--panel{border-radius:inherit}.filepond--root[data-style-panel-layout~=circle] .filepond--file-info,.filepond--root[data-style-panel-layout~=circle] .filepond--file-status,.filepond--root[data-style-panel-layout~=circle]>.filepond--panel>*{display:none}.filepond--panel-root{border-radius:.5em;background-color:#f1f0ef}.filepond--panel{position:absolute;left:0;top:0;right:0;margin:0;height:100%!important;pointer-events:none}.filepond-panel:not([data-scalable=false]){height:auto!important}.filepond--panel[data-scalable=false]>div{display:none}.filepond--panel[data-scalable=true]{-webkit-transform-style:preserve-3d;transform-style:preserve-3d;background-color:transparent!important;border:none!important}.filepond--panel-bottom,.filepond--panel-center,.filepond--panel-top{position:absolute;left:0;top:0;right:0;margin:0;padding:0}.filepond--panel-bottom,.filepond--panel-top{height:.5em}.filepond--panel-top{border-bottom-left-radius:0!important;border-bottom-right-radius:0!important;border-bottom:none!important}.filepond--panel-top:after{content:\"\";position:absolute;height:2px;left:0;right:0;bottom:-1px;background-color:inherit}.filepond--panel-bottom,.filepond--panel-center{will-change:transform;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:left top;transform-origin:left top;-webkit-transform:translate3d(0,.5em,0);transform:translate3d(0,.5em,0)}.filepond--panel-bottom{border-top-left-radius:0!important;border-top-right-radius:0!important;border-top:none!important}.filepond--panel-bottom:before{content:\"\";position:absolute;height:2px;left:0;right:0;top:-1px;background-color:inherit}.filepond--panel-center{height:100px!important;border-top:none!important;border-bottom:none!important;border-radius:0!important}.filepond--panel-center:not([style]){visibility:hidden}.filepond--progress-indicator{position:static;width:1.25em;height:1.25em;color:#fff;margin:0;pointer-events:none;will-change:transform,opacity}.filepond--progress-indicator svg{width:100%;height:100%;vertical-align:top;transform-box:fill-box}.filepond--progress-indicator path{fill:none;stroke:currentColor}.filepond--list-scroller{z-index:6}.filepond--drop-label{z-index:5}.filepond--drip{z-index:3}.filepond--root>.filepond--panel{z-index:2}.filepond--browser{z-index:1}.filepond--root{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;margin-bottom:1em;font-size:1rem;line-height:normal;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-weight:450;text-align:left;text-rendering:optimizeLegibility;direction:ltr;contain:layout style size}.filepond--root *{font-size:inherit;-webkit-box-sizing:inherit;box-sizing:inherit;line-height:inherit}.filepond--root[data-disabled]{pointer-events:none}.filepond--root .filepond--drop-label{min-height:4.75em}.filepond--root .filepond--list-scroller{margin-top:1em;margin-bottom:1em}\n:host .filepond--root {\n  position: relative;\n  margin-bottom: 1em;\n  font-family: \"Lato\" !important;\n  font-size: 1rem;\n  line-height: normal;\n  text-align: left;\n  text-rendering: optimizeLegibility;\n  contain: layout style size;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  direction: ltr; }"; }
}

export { YooFormUploaderComponent as YooFormUploader };

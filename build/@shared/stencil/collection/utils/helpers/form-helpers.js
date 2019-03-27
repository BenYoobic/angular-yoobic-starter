import * as filtrex_ from 'filtrex';
const filtrex = filtrex_.default;
import { isBlank, isPresent, isFile, getSession } from './common-helpers';
import { FormFieldType } from '../../interfaces';
import { translate } from '../translate';
import { isArray, indexOf, isString, isNull, isUndefined, isObject, isEmpty, map, clone, isNumber, isBoolean, concat, intersection, isEqual, set, sortBy } from 'lodash-es';
import * as objectPath_ from 'object-path';
const objectPath = objectPath_.default;
export function isVisible(field, readonly = false, data, suffix = '', session = getSession()) {
    let retVal = !(field.visible === false);
    if (field.visible === false && !field.condition) {
        retVal = false;
    }
    else if (field.hideMobile) {
        retVal = false;
    }
    else {
        if ((readonly || field.readonly === true) && !field.condition) {
            retVal = hasValue(field, data, suffix);
        }
        else if ((readonly || field.readonly === true) && field.condition) {
            retVal = hasValue(field, data, suffix);
            retVal = retVal && (isString(field.condition) ? evalInContext(field.condition, data) : evalConditionsInContext(concat(field.condition, []), data, suffix, session));
        }
        else if (field.condition && isString(field.condition)) {
            retVal = evalInContext(field.condition, data);
        }
        else if (field.condition && ((isArray(field.condition) && field.condition.length > 0) || isObject(field.condition))) {
            retVal = evalConditionsInContext(concat(field.condition, []), data, suffix, session);
        }
        else {
            //cases : Single Condition, Array of conditions
            //type: field or tags
        }
    }
    if (retVal === 0) {
        retVal = false;
    }
    return retVal;
}
export function isRequired(field, data, visible, suffix = '', session = getSession()) {
    let retVal = false;
    if (visible === false) {
        retVal = false;
    }
    else if (field.required === true) {
        retVal = true;
    }
    else if (field.required === false) {
        retVal = false;
    }
    else if (!isBlank(field.required) && isString(field.required)) {
        retVal = evalInContext(field.required, data);
    }
    else if (!isBlank(field.required) && ((isArray(field.required) && field.required.length > 0) || isObject(field.required))) {
        retVal = evalConditionsInContext(concat(field.required, []), data, suffix, session);
    }
    return retVal;
}
export function isReadonly(field, data, suffix = '', session = getSession()) {
    let retVal = false;
    if (field.readonly === true) {
        retVal = true;
    }
    else if (field.readonly === false) {
        retVal = false;
    }
    else if (!isBlank(field.readonly) && isString(field.readonly)) {
        retVal = evalInContext(field.readonly, data);
    }
    else if (!isBlank(field.readonly) && ((isArray(field.readonly) && field.readonly.length > 0) || isObject(field.readonly))) {
        retVal = evalConditionsInContext(concat(field.readonly, []), data, suffix, session);
    }
    return retVal;
}
export function isFieldWithNoValue(field) {
    return field.type === FormFieldType.information || field.type === FormFieldType.image || field.type === FormFieldType.document || field.type === FormFieldType.videoplayer;
}
export function hasValue(field, data, suffix = '') {
    if (isFieldWithNoValue(field)) {
        //field.type === FormFieldType.information ||
        return true;
    }
    let options = getNameAndData(field, data, suffix);
    let retVal = false;
    if (isPresent(options.data) && options.data !== '') {
        retVal = true;
        // if (isArray(options.data) && (<Array<any>>options.data).length === 0) {
        //     retVal = false;
        // };
        // Check whether options.data is an object or array; Then check whether it is empty
        if (isObject(options.data) && !isFile(options.data) && isEmpty(options.data)) {
            retVal = false;
        }
        if (field.type === FormFieldType.todo && (!options.data || !options.data.values || options.data.values.length <= 0)) {
            retVal = false;
        }
    }
    return retVal;
}
export function evalConditionsInContext(conditions, data, suffix = '', session = {}) {
    let valid = true;
    for (let condition of conditions) {
        if (isString(condition)) {
            valid = valid && evalInContext(condition, data);
        }
        else if (condition.type === 'field') {
            let expression;
            if (condition.field.type === FormFieldType.selectmulti || condition.field.type === FormFieldType.selectbuttonsmulti) {
                expression = 'contains(getAttributeValue(' + '"' + condition.field.name + suffix + '"), "' + condition.values + '", "' + condition.operator + '")';
            }
            else if (condition.field.type === FormFieldType.select || condition.field.type === FormFieldType.selectbuttons || condition.field.type === FormFieldType.autocomplete) {
                expression = 'contains(getAttributeValue(' + '"' + condition.field.name + suffix + '"), "' + condition.values + '", "' + condition.operator + '")';
            }
            else {
                let value = condition.value;
                if (!value && value !== false && value !== 0) {
                    value = condition.values;
                }
                if (condition.operator === '>=' || condition.operator === '<=' || condition.operator === 'greaterthan' || condition.operator === 'lessthan') {
                    let op = condition.operator === 'greaterthan' ? '>=' : condition.operator === 'lessthan' ? '<=' : condition.operator;
                    let separator = '';
                    if (condition.field.type === FormFieldType.date || condition.field.type === FormFieldType.datetime || condition.field.type === FormFieldType.time) {
                        separator = '"';
                    }
                    expression = 'getAttributeValue(' + '"' + condition.field.name + suffix + '")' + op + separator + value + separator;
                }
                else {
                    let op = condition.operator === 'equals' || condition.operator === '===' ? '==' : condition.operator === 'notequals' || condition.operator === '!==' ? '!=' : '==';
                    expression = 'toStringAndUppercase(getAttributeValue(' + '"' + condition.field.name + suffix + '"))' + op + 'toStringAndUppercase(' + '"' + value + '"' + ')';
                }
            }
            let retVal = evalInContext(expression, data);
            valid = valid && retVal;
        }
        else if (condition.type === 'tags') {
            if (!session || !session.selectedLocation) {
                valid = valid && true;
            }
            else {
                let retVal = condition.operator === 'in' || !condition.operator ? intersection(session.selectedLocation.tags, condition.tags).length > 0 : intersection(session.selectedLocation.tags, condition.tags).length === 0;
                valid = valid && retVal;
            }
        }
        else if (condition.type === 'groups' || condition.type === 'roles') {
            let groups = condition.type === 'groups' ? session.groups : session.roles;
            let retVal = condition.operator === 'in' ? intersection(groups, condition.group).length > 0 : intersection(groups, condition.group).length === 0;
            valid = valid && retVal;
        }
        else if (condition.type === 'missionDescriptionAttribute') {
            if (!session.selectedMissionDescription) {
                valid = valid && true;
            }
            else {
                let retVal = isEqual(session.selectedMissionDescription[condition.key], condition.value);
                valid = valid && retVal;
            }
        }
        else if (isString(condition)) {
            let retVal = evalInContext(condition, data);
            valid = valid && retVal;
        }
    }
    return valid;
}
export function updateFormulas(slides = [], data, suffix = '') {
    let fields = [];
    let didUpdate = false;
    if (slides) {
        slides.forEach(slide => {
            if (slide && slide.items) {
                fields = fields.concat(slide.items);
            }
        });
    }
    if (fields && fields.length > 0) {
        fields.forEach(field => {
            if (field.type === FormFieldType.formula) {
                let formula = field.formula;
                if (formula) {
                    let toReplace = [];
                    for (let name in fields) {
                        let f = fields[name];
                        if (formula.indexOf(f.title) >= 0) {
                            toReplace.push({ original: f.title, replacement: f.name + suffix });
                            //formula = formula.replace(new RegExp(f.title, 'g'), 'getAttributeValue("' + f.name + '")');
                        }
                    }
                    toReplace = sortBy(toReplace, o => -o.original.length);
                    toReplace.forEach(o => {
                        formula = formula.replace(new RegExp(o.original, 'g'), 'getAttributeValue("' + o.replacement + '")');
                    });
                    let value = evalInContext(formula, data, true);
                    if (isNumber(value) && !isNaN(value) && isFinite(value)) {
                        value = Math.round(value * 100) / 100;
                    }
                    else {
                        value = null;
                    }
                    setFieldData(field, value, data, suffix);
                }
            }
        });
    }
    return didUpdate;
}
export function setFieldData(field, value, data, suffix) {
    let nameAndData = getNameAndData(field, data, suffix);
    set(data, nameAndData.name, value);
}
export function evalInContext(js, data, rawValue = false) {
    let extraFunctions = {
        getAttributeValue: filtrexGetAttributeValue(data),
        contains: filtrexContains,
        isNullOrEmpty: filtrexIsNullOrEmpty,
        toStringAndUppercase: filtrexToStringAndUppercase,
        endsWith: filtrexEndsWith,
        indexOf: filtrexIndexOf(data),
        length: filtrexLength(data)
    };
    if (typeof js !== 'string') {
        return true;
    }
    let flattenContext = data;
    if (js.indexOf('.') > 0) {
        flattenContext = slenderizeObject(data);
    }
    try {
        let expression = filtrex(js, extraFunctions);
        let retVal = expression(flattenContext || {});
        if (rawValue) {
            return retVal;
        }
        return !!retVal;
    }
    catch (err) {
        window['console'].log(err);
    }
    return true;
}
function filtrexContains(array, values, contains) {
    if (!array || (isArray(array) && array.length === 0)) {
        array = [];
    }
    if (!isArray(array)) {
        array = [array];
    }
    let val = values.split(',');
    let found = 0;
    for (let v of val) {
        if (indexOf(array, v) >= 0) {
            found++;
        }
    }
    switch (contains) {
        case 'in':
        case 'contains':
            return found >= 1;
        case 'notin':
        case 'notcontains':
            return found === 0;
        case 'containsall':
            return found === val.length;
        case 'equals':
        case '===':
            return val.length === array.length && found === val.length;
        case 'notequals':
        case '!==':
            return val.length === array.length && found === 0;
    }
}
function filtrexIsNullOrEmpty(value) {
    if (isBlank(value) || value.length === 0) {
        return true;
    }
    return false;
}
function filtrexGetAttributeValue(data) {
    let f = key => {
        return objectPath.get(data, key);
    };
    return f;
}
function filtrexToStringAndUppercase(value) {
    if (value != null && value !== undefined && value.toString) {
        return value.toString().toUpperCase();
    }
    return value;
}
function filtrexIndexOf(data) {
    return (path, value) => {
        let array = objectPath.get(data, path);
        if (array && array.indexOf) {
            return array.indexOf(value);
        }
        return -1;
    };
}
function filtrexEndsWith(value, searchString) {
    if (value && value.endsWith) {
        return value.endsWith(searchString);
    }
    return false;
}
function filtrexLength(data) {
    return path => {
        let temp = objectPath.get(data, path);
        if (isArray(temp)) {
            let array = temp;
            if (array && array.indexOf) {
                return array.length;
            }
        }
        else if (isString(temp) && !isNull(temp) && !isUndefined(temp)) {
            return temp.length;
        }
        else if (isObject(temp) && !isEmpty(temp)) {
            return 1;
        }
        return 0;
    };
}
function slenderizeObject(fatObject) {
    let propertyIdentifiers = [];
    let slenderObject = {};
    function processNode(theNode, _propertyIdentifiers, _slenderObject) {
        theNode = theNode || {};
        _propertyIdentifiers = _propertyIdentifiers || [];
        let retVal = map(theNode, (value, key) => {
            let myKeys = clone(_propertyIdentifiers);
            let ret = {};
            myKeys.push(key);
            // if value is a string, number or boolean
            if (isString(value) || isNumber(value) || isBoolean(value)) {
                // build a keyString to use as a property identifier
                let keyString = myKeys.join('.');
                // add a property with that identifier and childNode as the value to our return object
                ret[keyString] = _slenderObject[keyString] = value;
            }
            else {
                // Call processNode recursively if value isn't a leaf node type (string, number or boolean)
                processNode(value, myKeys, _slenderObject);
                ret = value;
            }
            return ret;
        });
        return retVal;
    }
    processNode(fatObject, propertyIdentifiers, slenderObject);
    return slenderObject;
}
export function isNumberField(field) {
    return field.type === FormFieldType.number || field.type === FormFieldType.numberpicker || field.type === FormFieldType.range || field.type === FormFieldType.starrating;
}
export function isBooleanField(field) {
    return field.type === FormFieldType.checkbox || field.type === FormFieldType.toggle;
}
export function isPhotoField(field) {
    return field.type === FormFieldType.photo || field.type === FormFieldType.signature || (field.type === FormFieldType.autocomplete && field.collectionName === 'files');
}
export function isMultiPhotosField(field) {
    return field.type === FormFieldType.multiphotos;
}
export function isPhotoOrMultiPhotosField(field) {
    return isPhotoField(field) || isMultiPhotosField(field);
}
export function isVideoField(field) {
    return field.type === FormFieldType.video;
}
export function isDateTimeField(field) {
    return field.type === FormFieldType.date || field.type === FormFieldType.datetime;
}
export function isIntervalField(field) {
    return field.type === FormFieldType.number || field.type === FormFieldType.starrating || field.type === FormFieldType.date || field.type === FormFieldType.datetime || field.type === FormFieldType.time;
}
export function isMultipleField(field) {
    switch (field.type) {
        case FormFieldType.selectmulti:
        case FormFieldType.selectbuttonsmulti:
        case FormFieldType.ranking:
            return true;
        case FormFieldType.autocomplete:
            return field.multiple === true;
    }
    return false;
}
export function isColoredField(field) {
    switch (field.type) {
        case FormFieldType.select:
        case FormFieldType.selectmulti:
        case FormFieldType.selectbuttons:
        case FormFieldType.selectbuttonsmulti:
            return true;
    }
    return false;
}
export function answerIsValid(value, answer, field) {
    let ignoreOrder = field.type !== FormFieldType.ranking && field.type !== FormFieldType.missingword && field.type !== FormFieldType.categorizewords && field.type !== FormFieldType.connect && field.type !== FormFieldType.swipecards;
    if (isNumberField(field)) {
        answer = [].concat(answer).map(a => a - 0);
    }
    if (isBooleanField(field)) {
        answer = [].concat(answer).map(a => !isNull(a) && !isUndefined(a) && (a === 'true' || a === true || a.toUpperCase() === this.translate.get('true').toUpperCase()));
    }
    if (answer && answer.sort && ignoreOrder) {
        return isEqual(answer.sort(), [].concat(value).sort());
    }
    else if (field.type === FormFieldType.connect && answer && value) {
        let tempValue = [];
        let tempAnswer = [];
        value.forEach(el => {
            tempValue.push(el.sort());
        });
        answer.forEach(el => {
            tempAnswer.push(el.sort());
        });
        value = tempValue.sort();
        answer = tempAnswer.sort();
        return isEqual([].concat(answer), [].concat(value));
    }
    else if (field.type === FormFieldType.swipecards && answer && value) {
        let errorFound = value.findIndex((category, i) => {
            if (!answer[i]) {
                return true;
            }
            return !isEqual([].concat(category.sort()), [].concat(answer[i].sort()));
        });
        return errorFound < 0;
    }
    else if (field.type === FormFieldType.categorizewords && answer && value) {
        let isInvalid = value
            .map((answerContainer, index) => {
            return answerContainer.sort().toString() === answer[index].sort().toString();
        })
            .some((answerContainer) => {
            return answerContainer === false;
        });
        return !isInvalid;
    }
    else if (answer) {
        return isEqual([].concat(answer), [].concat(value));
    }
    return false;
}
export function getFieldPath(field, suffix) {
    return field.name + (suffix ? suffix : '');
}
export function getFieldValue(field, initialData, suffix) {
    let name = getFieldPath(field, suffix);
    let data = objectPath.get(initialData, name);
    //let data = result(initialData, name);
    return data;
}
function getNameAndData(field, initialData, suffix) {
    let name = getFieldPath(field, suffix);
    let data = getFieldValue(field, initialData, suffix);
    return { name: name, data: data };
}
/**
 * Generates the field label name
 */
export function generateLabel(field) {
    let label;
    if (!field.description) {
        if (field.title) {
            label = translate(field.title);
        }
        else {
            label = field.name || '';
            if (label && label.toString) {
                label = label.toString();
            }
            if (label && isString(label)) {
                label = translate(label.toUpperCase());
            }
        }
    }
    return label;
}

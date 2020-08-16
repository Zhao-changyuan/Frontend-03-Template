const css = require('css');

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [{type: 'document', children: []}];

// 加入一个新的函数，addCSSRules，这里我们把CSS规则暂存到一个数组里
let rules = []
function addCSSRules(text) {
    let ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

function match(element, selector) {
    if (!selector || !element.attributes) {
        return false;
    }

    if (selector.charAt(0) === '#') {
        var attr = element.attributes.filter(attr => attr.name === 'id')[0]
        if (attr && attr.value === selector.replace('#', '')) {
            return true;
        } 
    }
     if (selector.charAt(0) === '.') {
        var attr = element.attributes.filter(attr => attr.name === 'class')[0]
        var classSelector = selector.replace('.', '')

        // 支持空格的class选择器
        if (attr && attr.value.trim().split(' ').some(item => item === classSelector)) {
            return true;
        }
    }

    // 复合选择器正则
    var patternStr = `(${element.tagName})?((\\.[a-zA-Z_]+[a-zA-Z0-9_\\-]*)*)(#[a-zA-Z_]+[a-zA-Z0-9_\\-]*)?`
    var regExp = new RegExp(patternStr, 'g')

    var matchs = regExp.exec(selector);
    let tagMatched = false;
    let classMatched = false;
    let idMatched = false;
    let matchedArr = []
    
    if (matchs[1]) {
        tagMatched = true;
        if (matchs[1] === element.tagName) {
            matchedArr.push(true)
        } else {
            matchedArr.push(false)
        }
    }

    if (matchs[2]) {
        classMatched = true;
        let classAttr = element.attributes.filter(attr => attr.name === 'class')[0]
        if (classAttr) {
            let classItems = classAttr.value.split(' ')
            let flag = matchs[2].slice(1).split('.').every(item => {
                return classItems.filter(item1 => item1 === item)[0]
            })
            matchedArr.push(flag)
        } else {
            matchedArr.push(false)
        }
    }

    if (matchs[4]) {
        idMatched = true;
        let idAttr = element.attributes.filter(attr => attr.name === 'id')[0]
        if (idAttr && idAttr.value === matchs[4].slice(1)) {
            matchedArr.push(true)
        } else {
            matchedArr.push(false)
        }
    }

    if (matchedArr.length === 0) {
        return false;
    } else {
        return matchedArr.every(item => item);
    }

    
    
    /* if (regExp.test(selector)) {
        return true;
    } else {
        if (element.tagName === selector) {
            return true;
        }
    }

    return false; */
}

function specificity(selector) {
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(' ');
    for (let part of selectorParts) {
        // 复合选择器正则
        var patternStr = `([a-zA-Z_]+[a-zA-Z0-9_\\-]*)?((\\.[a-zA-Z_]+[a-zA-Z0-9_\\-]*)*)(#[a-zA-Z_]+[a-zA-Z0-9_\\-]*)?`
        var regExp = new RegExp(patternStr, 'g')
        var matchs = regExp.exec(part);
        
        if (matchs[1]) {
            p[3] += 1;
        }

        if (matchs[2]) {
            p[2] += matchs[2].slice(1).split('.').length;
        }

        if (matchs[4]) {
            p[1] += 1;
        }

        /* if (part.charAt(0) === '#') {
            p[1] += 1;
        } else if (part.charAt(0) === '.') {
            p[2] += 1;
        } else {
            p[3] += 1;
        } */
    }

    return p;
}

function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0];
    }
    if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1];
    }
    if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2];
    }

    return sp1[3] - sp2[3];
}

function computeCSS(element) {
    // console.log(rules);
    // console.log('compute CSS for Element', element);

    var elements = stack.slice().reverse();

    if (!element.computedStyle) {
        element.computedStyle = {}
    }

    for (let rule of rules) {
        var selectorParts = rule.selectors[0].split(' ').reverse();
        
        if (!match(element, selectorParts[0])) {
            continue;
        }

        let matched = false;

        var j = 1;
        for(let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++;
            }
        }
        if (j >= selectorParts.length) {
            matched = true;
        }

        if (matched) {
            let sp = specificity(rule.selectors[0]);
            let computedStyle = element.computedStyle;

            for (let declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {}
                }

                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }
            }

            // 如果匹配到，我们要加入
            // console.log('Element', element, 'matched rule', rule);
        }
    }
}

function emit(token) {
    let top = stack[stack.length - 1];

    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: [],
        };

        element.tagName = token.tagName;

        for (let p in token) {
            if (p != 'type' && p !== 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p],
                });
            }
        }

        computeCSS(element);

        top.children.push(element);

        // element.parent = top;

        if (!token.isSelfClosing) {
            stack.push(element)
        }

        currentTextNode = null;
    } else if (token.type === 'endTag') {
        if (top.tagName != token.tagName) {
            throw new Error('Tag start end doesn\'t match!');
        } else {
            if (top.tagName === 'style') {
                addCSSRules(top.children[0].content);
            }

            stack.pop()
        }

        currentTextNode = null;
    } else if (token.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: ''
            };

            top.children.push(currentTextNode);
        }

        currentTextNode.content += token.content;
    }
}


const EOF = Symbol('EOF'); // EOF: End of File

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        emit({
            type: 'EOF'
        });

        return ;
    } else {
        emit({
            type: 'text',
            content: c
        });
        return data;
    }
}

function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        };

        return tagName(c);
    } else {
        return ;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        };

        return tagName(c);
    } else if (c === '>') {
        // 报错
    } else if (c === EOF) {
        // 报错
    } else {

    }
}

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);

        return data;
    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName;
    } else if (c === '>') {
        emit(currentToken);

        return data;
    } else {
        currentToken.tagName += c
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '>' || c === '/' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }

        return attributeName(c);
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f] $/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === '"' || c === "'" || c === '<') {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f] $/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeValue;
    } else if (c === '"') {
        return doubleQuotedAttributeValue;
    } else if (c === "'") {
        return singleQuotedAttributeValue;
    } else if (c === '>') {

    } else {
        return UnquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if (c === '"') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if (c === "'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);

        return data;
    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if(c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);

        return data;
    } else if (c === '\u0000') {

    } else if (c === '"' || c === "'" || c === '<' || c === '=' || c === '`') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}

function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if(c === 'EOF') {

    } else {
        
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data

    for(let c of html) {
        state = state(c);
    }

    state = state(EOF);
    // console.log(stack[0]);
    return stack[0];
}
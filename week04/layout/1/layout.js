
/**
 * 获取元素的样式
 * 
 * 对CSS样式的属性值进行预处理
 * 例如：12px, 得到纯数字12
 * @param {Object} element 
 */
function getStyle(element) {
    if (!element.style) {
        element.style = {};
    }

    for (let prop in element.computedStyle) {
        let p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        // 预处理 XXpx 和 数字
        if (element.style[prop].toString().match(/ps$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
        if (element.style[prop].toString().match(/^[0-9\.]$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
    }

    return element.style;
}

/**
 * 对元素进行排版
 * @param {Object} element 
 */
function layout(element) {

    if (!element.computedStyle) {
        return ;
    }

    let elementStyle = getStyle(element);

    // 仅支持flex排版
    if (elementStyle.display !== 'flex') {
        return ;
    }

    let items = element.children.filter(e => e.type === 'element');

    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
    });

    let style = elementStyle;

    // 方便后面统一判断
    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    })

    // flex相关属性设置默认值
    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row';
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start';
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap';
    }
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch';
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase;

    
}

module.exports.layout = layout
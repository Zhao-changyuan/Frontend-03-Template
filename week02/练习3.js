
/**
 * 
 * @param {string} str 当前查找的源字符串
 * @param {string} target 待查找的目标字符串
 * @param {number} curIndex 当前检查的字符在target中的位置
 */
function checkChar(str, target, curIndex) {
    let over = false

    if (str.length <= 1 || target.length <= 1) {
        over = true
    }

    if (str[0] === target[curIndex]) {
        curIndex++

        if (curIndex === target.length) {
            over = true
        }
    } else {
        curIndex = 0
    }
    str = str.substring(1)

    return {over, str, curIndex}
}

/**
 * 判断str中是否存在abcdef子串
 * @param {string} str 
 * @returns true/false
 */
function queryAbcdef(str) {
    let target = 'abcdef'
    let curIndex = 0

    while(true) {
        let result = checkChar(str, target, curIndex)
        if (result.over) {
            if (result.curIndex === target.length) {
                return true;
            } else {
                return false;
            }

            break;
        } else {
            str = result.str
            curIndex = result.curIndex
        }
    }

    return false;
}

console.log(queryAbcdef('abceeedef'));
console.log(queryAbcdef('222abceeedeabcdeff'));
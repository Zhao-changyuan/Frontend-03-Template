

/**
 * 计算模式串失配时，模式串需要向右移动的位数
 * @param {string} p 
 */
function getNext(p) {
    let pLen = p.length;
    let next = [-1];
    let k = -1;
    let j = 0;

    while(j < pLen - 1) {
        if (k === -1 || p[j] === p[k]) {
            k++;
            j++;

            next[j] = k;
        } else {
            k = next[k];
        }
    }

    return next;
}

/**
 * 1. 状态机kmp
 * @param {*} s 
 * @param {*} p 
 */
function kmpSearch(s, p) {
    let i = 0; // s当前匹配位置
    let j = 0; // p当前匹配位置
    let sLen = s.length;
    let pLen = p.length;
    let next = getNext(p);
    let state = {state: start, s, p, i, j, next};

    while(state.i <= sLen && state.j <= pLen) {
        state = state.state(state.s, state.p, state.i, state.j, state.next);
    }

    return state.state === end;
}

function end(s, p, i, j, next) {
    return end;
}

function start(s, p, i, j, next) {
    if (j === p.length) {
        return {state: end, s, p, i, j: j+1, next};
    }

    if (j === -1 || s[i] === p[j]) {
        return {state: start, s, p, i: i+1, j: j+1, next};
    } else {
        return {state: start, s, p, i, j: next[j], next};
    }
}


console.log(kmpSearch('abcabcabx', 'abcabx'));
// console.log(kmpSearch('BBC ABCDAB ABCDABCDABDE', 'ABCDABD'));


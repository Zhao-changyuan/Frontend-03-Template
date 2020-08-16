var element = {
    tagName: 'div'
}

// var str = `(${element.tagName})+(.[a-zA-Z_]+)+(#([a-zA-Z_]+)+`
// var str = `(${element.tagName})?((\\.[a-zA-Z_]+[a-zA-Z0-9_\\-]*)*)(#[a-zA-Z_]+[a-zA-Z0-9_\\-]*)?`
// console.log(str);
// var regExp = new RegExp(str, 'g')
// regExp.test('div');
// let matchs = regExp.exec('div');
// console.log(RegExp.$1);
// console.log(RegExp.$2);
// console.log(RegExp.$3);

// console.log(specificity('div div .cls'));
// console.log(specificity('.div #id'));
// console.log(specificity('#div'));
console.log(specificity('div .cla2 a.clas#div'));

function specificity(selector) {
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(' ');
    for (let part of selectorParts) {
        if (part.charAt(0) === '#') {
            p[1] += 1;
        } else if (part.charAt(0) === '.') {
            p[2] += 1;
        } else {
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
        }
    }

    return p;
}
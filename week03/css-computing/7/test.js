var element = {
    tagName: 'div'
}

// var str = `(${element.tagName})+(.[a-zA-Z_]+)+(#([a-zA-Z_]+)+`
var str = `(${element.tagName})?((\\.[a-zA-Z_]+[a-zA-Z0-9_\\-]*)*)(#[a-zA-Z_]+[a-zA-Z0-9_\\-]*)?`
console.log(str);
var regExp = new RegExp(str, 'g')
regExp.test('div');
let matchs = regExp.exec('div');
console.log(RegExp.$1);
console.log(RegExp.$2);
console.log(RegExp.$3);
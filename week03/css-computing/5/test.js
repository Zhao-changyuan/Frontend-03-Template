var element = {
    tagName: 'div'
}

// var str = `(${element.tagName})+(.[a-zA-Z_]+)+(#([a-zA-Z_]+)+`
var str = `(${element.tagName})*(.[a-zA-Z_]+\\S*)*(#[a-zA-Z_]+\\S*)*`
console.log(str);
var regExp = new RegExp(str, 'g')

console.log(regExp.test('.nav'));
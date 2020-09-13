学习笔记

# 1.重学HTML

## 1.1 HTML的定义：XML与SGML
### DTD与XML namespace
nbsp no-break space = non-breaking space, U+00A0 ISOnum
如果想要出现多个空格，还是应该去使用CSS里面的white-space属性去控制。

&quot; "
&amp;  &
&lt;   <
&gt;   >

## 1.2 HTML标签语义

## 1.3 HTML语法


**合法元素**
* Element: <tagname>...</tagname>
* Text: text
* Comment: <!--comments-->
* DocumentType: <!DOCTYPE html>
* ProcessingInstruction: <?a 1?>
* CDATA: <![CDATA[ ]]>

**字符引用**
&#161;
&amp;
&lt;
&quot;

# 2.浏览器API
## 2.1 DOM API
* 节点
* 事件
* iterator, 已过时
* Range

**导航类操作**
* parentNode                * parentElement
* childNodes                * children
* firstChild                * firstElementChild
* lastChild                 * lastElementChild
* nextSibling               * nextElementSibling
* previousSibling           * previousElementSibling

**修改操作**
* appendChild
* insertBefore
* removeChild
* replaceChild

**高级操作**
* compareDocumentPosition是一个用于比较两个节点中关系的函数。
* contains 检查一个节点是否包含另一个节点的函数。
* isEqualNode 检查两个节点是否完全相同。
* isSameNode 姜茶两个节点是否是同一个节点，实际上在JavaScript中可以使用“===”。
* cloneNode 复制一个节点，如果传入参数true，则会连同子节点做深拷贝。

## 2.2 事件 API
事件的对象模型

**Event:冒泡与捕获**
先捕获再冒泡
冒泡的过程更符合人类的直觉。

## 2.3 Range API

```js
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
var range = document.getSelection().getRangeAt(0);
```

* range.setStartBefore
* range.setEndBefore
* range.StartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents

**最主要的两个操作**
```js
var fragment = range.extractContents();
range.insertNode(document.createTextNode('aaaa'));
```
## 2.4 CSSOM
和CSS语言相对应的模型。

**document.styleSheets**
* document.styleSheets
* 案例

**Rules**
* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule('p {color:pink;}', 0)
* document.styleSheets[0].removeRule(0)

* CSSStyleRule 重点
* CSSCharsetRule
* CSSImportRule
* CSSMediaRule
* CSSFontFaceRule
* CSSPageRule
* CSSNamespaceRule
* CSSKeyframesRule
* CSSKeyframeRule
* CSSSupportsRule
* ... ...

**CSSStyleRule**
* selectorText String
* style K-V结构

**getComputedStyle**
* window.getComputedStyle(elt, pseudoElt);
   * elt想要获取的元素
   * pseudoElt可选，伪元素

## 2.5 CSSOM View
主要跟浏览器绘制上去的视图相关。

**window**
* window.innerHeight, window.innerWidth      viewport
* window.outerWidth, window.outerHeight
* window.devicePixelRatio
* window.screen
   * window.screen.width
   * window.screen.height
   * window.screen.availWidth
   * window.screen.availHeight

**Window API**
* window.open("about:blank", "_blank", "width=100,height=100,left=100,right:100")
* moveTo(x, y)
* moveBy(x, y)
* resizeTo(x, y)
* resizeBy(x, y)

**scroll**
* scrollTop
* scrollLeft
* scrollWidth
* scrollHeight
* scroll(x, y) scrollTo(x, y)
* scrollBy(x, y)
* scrollIntoView()

* window
   * scrollX
   * scrollY
   * scroll(x, y)
   * scrollBy(x, y)

**layout**
在element上。

* getClientRects()
* getBoundingClientRect()
伪元素也会参与到获取生成盒的过程中。 

## 2.6 其他API

**标准化组织**
* khronos
   * WebGL
* ECMA
   * ECMAScript
* WHATWG
   * HTML
* W3C
  * webaudio
  * CG/WG
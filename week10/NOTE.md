学习笔记
使用LL算法构建AST

# 1. 四则运算
* TokenNumber:
   * 1 2 3 4 5 6 7 8 9 0的组合
* Operator: + - * /之一
* Whitespace: <SP>
* LineTerminator: <LF><CR>

## 四则运算
<Expression>::=
    <AdditiveEcpression><EOF>

<AdditiveExpression>::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression>::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>

## LL语法分析

<AdditiveExpression>::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

# 2. 正则表达式

# 3. LL词法分析
处理不认识的字符或格式，使用yield编程一个完全异步的形式。
使用正则表达式取处理一些简单的词法问题。

# 4. LL语法分析（一）

# 5. LL语法分析（二）
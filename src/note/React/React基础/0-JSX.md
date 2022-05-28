# JSX 基础

jsx 全称 JavaScript XML 。

## XML 与 JSON 

XML 早期用于存储和运输数据。

```xml
<student>
	<name>Tom</name>
	<age>19</age>
</studenmt>
```

JSON 

```json
{
	"name": "Tom",
	"age": 19
}
```

##  jsx 语法规则

1.写虚拟 DOM 时，不要写引号。

2.标签中混入 JS 表达式时，要使用花括号 {} 。

3.样式的类名指定不要用 class ，要用 className 。

4.内联样式，要用 style={{key: value}} 的形式去写。

> 此处的第一个 {} 源于规则2，内部的 {} 表明这是一个括号。

5.虚拟 DOM 只能有一个根标签。

6.标签必须闭合。

7.标签首字母

+ 若小写字母开头，则将该标签转为 html 同名元素，若 html 中无该标签中的同名元素，则报错
+ 若大写字母开头， react 就去渲染对应的组件，若组件没有报错，则报错。

# 深入 JSX

从原理上，JSX 是 React.createElement() 的语法糖。如果想要测试不同的 JSX 会转换成什么样的 JavaScript 代码，可以使用 [在线的 Babel 编译器](https://babeljs.io/repl/#)。

## React 必须在作用域内

参考下面这个示例：

```jsx
import React from 'react'
function Demo() {
    return <div>Hello, JSX</div>
}
```

虽然我们没有直接使用导入的 React，但是仍然需要导入，这是因为导入 React 才规定了这是 JSX 的代码作用域。

## JSX 中的点语法

我们可以使用点语法来引用一个 React 组件。这在一个模块中需要导出许多 React 组件时会非常方便。

```jsx
import React from 'react'

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

## 在运行时选择类型

如果你想通过通用表达式来动态决定 JSX 元素类型，那么需要首先将它赋值给大写字母开头的变量。这通常用于根据不同属性 props 来渲染不同组件的情况下：

```jsx
import React from 'react'
import { One, Two } from './demo'

const components = {
    one: One,
    two: Two
}

function Num(props) {
    const SpecificNumber = components[props.numType]
    return <SpecificNumber number={props.num}/>
}
```

## Props 默认值为 "True"

如果没有给 prop 赋值，那么它将取默认值 true，因此以下两个 JSX 表达式是等价的：

```jsx
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

但是有其他的地方需要注意：

在 ES6 中，{foo} 简写语法表示了 {foo: foo}，但在此处直接含义为 {foo: true}，因此**可能存在歧异**。因此更加推荐后者这种偏 HTML 的写法。

## 其他子元素

### 空格与空行问题

JSX 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。因此以下的几种方式都是等价的：

```jsx
<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
```

### 布尔类型、Null 以及 Undefined 将会忽略

false，null，undefined，和 true 是合法的子元素。但它们并不会被渲染。以下的 JSX 表达式渲染结果相同：

```jsx
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

这有助于依据特定条件来渲染其他的 React 元素。例如，在以下 JSX 中，仅当  showHeader  为  true  时，才会渲染  \<Header />  组件：

```jsx
<div>
  	{showHeader && <Header />}  
    <Content />
</div>
```

值得注意的是有一些 [“falsy” 值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)，如数字  0 ，仍然会被 React 渲染。例如，以下代码并不会像你预期那样工作，因为当  props.messages  是空数组时， 0  仍然会被渲染：

```jsx
<div>
  {props.messages.length &&    <MessageList messages={props.messages} />
  }
</div>
```

要解决这个问题，确保  &&  之前的表达式总是布尔值：

```jsx
<div>
  {props.messages.length > 0 &&    <MessageList messages={props.messages} />
  }
</div>
```

反之，如果你想渲染  false 、 true 、 null 、 undefined  等值，你需要先将它们转换为字符串：

```jsx
<div>
  My JavaScript variable is {String(myVariable)}.</div>
```

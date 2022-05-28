# 简介

Hook 是 React v16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

注意：

1. 完全可选。
2. 100% 向后兼容。
3. 现在可用。

# 概览

什么是 Hook ？

Hook 是一些可以让你在函数组件中“钩入” React state 以及生命周期等特性的函数。（因此，Hook 不能在 class 组件中使用。）

使用规则：

Hook 本身就是 JS 函数，但是使用它们会有两个额外的规则：

+ 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
+ 只能在 React 的函数组件中调用 Hook，而不要在其他的 JS 函数中调用。

> 有 [linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks) 来自动执行这些规则。

什么时候我们会使用 Hook：

如果在编写函数组件并意识到需要向其添加一些 React 特性时，我们以前的做法是必须将其转为 class，但是现在可以在现有的函数组件中使用 Hook。

# State Hook

原本的函数组件由于没有 state 属性，因此我们常称为无状态组件。但是 Hook 可以为无状态组件引入 state，此时我们会称为函数组件了。

## 引入 useState

```jsx
import React, { useState } from 'react'
```

## 声明 State 变量

```jsx
import React, { useState } from 'react'

function Demo() {
    const [count, setCount] = useState(0)
}
```

> 上面的代码声明了一个叫 count 的 state 变量。

调用 useState 方法的时候做了什么？

> 简单来说，它定义了一个 state 变量。而 useState 是一种新方法，与 class 里面的 this.state 提供的功能完全相同。

useState 的参数问题。

> 接收唯一参数，我们对新建的 state 属性进行赋值，且赋值可以是 Number 和 String。

useState 的返回值问题。

> 返回值为当前 state 以及更新 state 的函数。

## 读取 state

在 Hook 中，我们想要读取 state 属性，我们可以直接使用：

```jsx
<p> You clicked { count } times.</p>
```

## 更新 State

在 useState 返回的更新对应的 State 参数的函数，接收一个参数，State 的改变值。

# Effect Hook

Effect Hook 可以让你在函数组件中执行副作用操作。

可以把 useEffect Hook 当作 componentDidMount，componentDidUpdate 和 componentWillUnmount 三个函数的组合。

## 引入 useEffect

```jsx
import React, { useState, useEffect } from 'react'
```

## 使用 useEffect

传递一个函数，这样在组件挂载成功后、任意一次重新渲染前、卸载前调用。

```jsx
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {    document.title = `You clicked ${count} times`;  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## effect 的清楚机制

我们向 useEffect 传入了一个函数作为调用函数，但是这个函数可以继续返回一个函数。

这个函数称为清除函数。当该组件卸载的时候就会调用该清除函数。（因此可以取消消息的订阅。）

## 使用多个 Effect 实现关注点分离

使用 Hook 其中一个目的就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。

Hook 通过使用多个 effect 来将不相关逻辑分离到不同的 effect 中。

## 通过跳过 Effect 进行性能优化

在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。

这是很常见的需求，所以它被内置到了 useEffect 的 Hook API  中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect  的第二个可选参数即可：

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

# Hook 规则

## 基本规则

React 提供了 [linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks) 来自动执行这些规则。

1. 只在最顶层使用 Hook

不要在循环，条件或嵌套函数中调用 Hook，确保你总是在 React 函数的最顶层调用它们。遵守这条规则，就能确保 Hook 在每一次渲染中都**按照同样的顺序**被调用。

2. 只在 React 函数中调用

不要在普通的 JS 函数中调用 Hook。可以在

+ React 函数组件中调用 Hook
+ 在自定义 Hook 中调用其他 Hook。

## ESLint 插件

有 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 的 ESLint 插件来强制执行这两条规则。

React 可能在后续版本默认添加此插件到 React 脚手架以及类似的工具包中。

```shell
npm install eslint-plugin-react-hooks --save-dev
```



```json
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```

# 自定义 Hook

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

除去 Hook，React 有两种流行的方式来共享组件之间的状态逻辑：props 属性和高阶组件。而 Hook 可以在不增加组件的情况下解决类似的问题。

## 提取自定义 Hook

当我们想要在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。而组件和 Hook 都是函数，所以也同样适用这种方式。

自定义 Hook 是一个函数，名称以 use 开头，函数内部可以调用其他的 Hook。

自定义 Hook 不需要具有特殊的标识。我们可以自由决定它的参数以及它的返回值（如果存在返回值）。

## 使用自定义 Hook

像函数调用一样正常使用即可。但是要关注下列问题：

在两个组件中使用相同的 Hook 会共享 state 吗？不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

自定义 Hook 如何获取独立的 state？正常使用 useState 和 useEffect 即可。

## 在多个 Hook 之间传递消息

由于 Hook 本身就是函数，因此我们可以在它们之间传递消息。

> 很显然吧，没有笔记了。

## useYourImagination()

自定义 Hook 解决了以前在 React 组件中无法灵活共享逻辑的问题，因此创建涵盖各种场景的自定义 Hook，如表单处理、动画、订阅声明、计时器，甚至可能还有其他我们没想到的场景。更重要的是，创建自定义 Hook 就像使用 React 内置的功能一样简单。

当需要管理内部状态时，可能更容易选择 redux 中的 reducer 来书写，但是我们可以编写类似于 reducer 的 useReducer Hook 来实现。

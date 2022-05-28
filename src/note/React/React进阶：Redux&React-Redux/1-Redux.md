# Redux 组成

+ Store

储存数据的唯一位置。

+ State 状态

也就是数据。

+ Action 事件

Action 是把数据从应用传到 store 的载体，也是 store 中数据的唯一来源。

+ Reducer 

Reducer 本质就是一个函数，用来响应发送过来的 Action，然后经过处理后，将 state 发送到 Store。

# 安装

```bash
npm install --save redux
```

# Action

## Action

Action 是把数据从应用传递到 store 的有效载荷，也是 store 数据的唯一来源。

Action 本质上就是 JavaScript 中的普通对象，且内部必须有一个使用字符串类型的 `type` 属性来表示将要执行的动作，而 Action 对象内部的其他结构，完全是由自己决定，例如：

```js
const TODO_ADD = 'TODO_ADD'
const addAction = {
    type: TODO_ADD,
    payload: 'Hello Redux'
}
```

当应用规模逐渐变大时，可以使用单独的模块来存放 Action 的类型：

```js
import { TODO_ADD, TODO_REMOVE } from '../actionTypes'
```

## Action Creator

同种类型、但是不同的消息传递需要不同的 Action。此时可以定义一个函数生成 Action，这个函数就叫做 Action Creator：

```jsx
const TYPE = 'action'
function actionCreator(payload) {
    return {
        type: TYPE,
        payload
    }
}
const action = actionCreator('this is a test')
```

# Reducer

Reducer 的作用是指定了如何处理 Action 中传递过来的数据，并最终将其发送到 Store。

Reducer 本质是一个函数，将原本的状态 initState 和传递过来的 action 作为参数，最终返回一个新的状态 state：

```jsx
const reducer = (initState, action) => {
    ...
    return newState
}
```

当我们第一次执行 Reducer 函数时，并没有原状态，因此我们需要通过指定默认值的方式，来对对状态进行初始化：

```jsx
const defaultState = 0
const reducer = (initState = defaultState, action) => {
    if (action.type == 'action') {
        return action.payload
    } else {
        return initState
    }
}
const state = reducer(0, {
    type: 'action',
    payload: 'this is a test'
})
```

实际应用中，Reducer 不需要手动调用，`dispatch` 方法会自动触发 Reducer 的自动执行。因此，Store 需要在一开始的时候就知道 Reducer 是谁，而我们只需要在 createStore 的时候就将 Reducer 传入 store 即可：

```jsx
import { createStore } from 'redux';
const store = createStore(reducer);
```

# Store

## Store

Store 是用于保存数据的地方，可以将它看成一个容器。整个应用只能有一个 Store。

Redux 提供 `createStore` 方法函数，用于生成 Store：

```jsx
import { createStore } from 'redux'
const store = createStore(Reducer)
```

createStore 函数接收 Reducer 作为参数，返回新生成的 Store 对象。

## State

Store 对象包含所有数据。如果想要得到某个时刻的数据 `state`，那么可以通过 `getState()` 方法得到：

```jsx
const state = store.getState()
```

## dispatch 方法

在上面我们介绍了 Action 事件，如果发出 Action，就是通过 `store.dispatch()` 方法：

```jsx
store.dispatch(action)
```

由于 `Store` 在最开始创建的时候，就已经指定了 `reducer`，因此我们通过 `store.dispatch` 方法发送 `Action` 的时候，就会自动执行前面指定的 `reducer` 了。

## subscribe 方法

我们可以使用 `store.subscribe` 方法设置监听函数，一旦 State 发生变化，该函数就会自动执行。

```jsx
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
```

`store.subscribe` 方法返回一个函数，调用这个函数就可以解除监听：

```jsx
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```

通常，当状态 State 发生改变时，我们会重新渲染根组件 `App`，因此我们只需要在最外层的 `index` 中进行 `subscribe` 订阅。

# 纯函数

Reducer 函数最重要的特征是，它是一个**纯函数**。纯函数的一个特点是，对于同样的输入，必定得到同样的输出。

纯函数是函数式编程的概念，必须遵守以下一些约束：

+ 不得改写参数
+ 不能调用系统 I/O 的 API
+ 不能调用 `Date.now()` 或者 `Math.random()` 等不纯的方法，因为每次会得到不一样的结果

# 实例：加减器

此处的实例只是为了展示简单的 Redux 使用，因此并不涉及太复杂的功能，力求精简：实现一个简单的 +1 与 -1 计算器。

首先我们分析所需 Action 有哪些：+1 与 -1。因此，在 action type 上，我们只需要设置 +1 与 -1 所对应的 type。居于此，设置 `reducer` 方法：

```jsx
const defaultValue = 1

export const reducer = (initState = defaultValue, action) => {
    if (action.type === 'add') {
        return initState + 1
    } else if (action.type === 'sub') {
        return initState - 1
    } else {
        return initState
    }
}
```

在确定好 `reducer` 后，我们便可以创建 `store`：

```jsx
import { createStore } from "redux"
import { reducer } from "../Reducer";

export const store = createStore(reducer)
```

随后，便在根文件 `index` 中订阅消息。值得注意的是，由于最开始并没有状态 `state` 的变化，因此我们需要先手动执行第一次渲染：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './Component/Store'

const render = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

render() // 第一次手动渲染

store.subscribe(render)
```

最后就是在根组件 `App` 中解构对应的方法，并获取数据：

```jsx
import {store} from "./Component/Store";

const add = () => {
    store.dispatch({
        type: 'add'
    })
}

const sub = () => {
    store.dispatch({
        type: 'sub'
    })
}

function App() {
    return (
        <div>
            <button onClick={add}>+1</button>
            <div>{store.getState()}</div>
            <button onClick={sub}>-1</button>
        </div>
    );
}

export default App;
```

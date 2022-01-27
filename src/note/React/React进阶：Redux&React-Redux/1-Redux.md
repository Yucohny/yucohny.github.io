# 安装

```shell
npm install --save redux
```

# Store

Store 是用于保存数据的地方，可以将它看成一个容器。整个应用只能有一个 Store。

Redux 提供 createStore 整个函数，用来生成 Store：

```react
import { createStore } from 'redux'
const store = createStore(fn)
```

createStore 函数接收另一个函数作为参数，返回新生成的 Store 对象。

> 这个函数就是 Reducer，下面会提到。

# State

Store 对象包含所有数据。如果想要得到某个时刻的 State 数据，可以通过 getState() 函数得到：

```react
const state = store.getState()
```

# Action

State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

Action 是一个对象，其中的 type 属性是必须的，表示 Action 的名称：

```react
const action = {
    type: 'action',
    payload: 'this is a test'
}
```

上面的 Action 对象名称是 action，它携带的信息是字符串 this is a test。

Action 用于**描述**当前的变化，而改变 State 的方式就是传递 Action。

## Action Creator

不同的消息传递需要不同的 Action。此时可以定义一个函数生成 Action，这个函数叫做 Action Creator。

```react
const TYPE = 'action'
function actionCreator(text) {
    return {
        type: TYPE,
        text
    }
}
const action = actionCreator('this is a test')
```

# dispatch

如果想要发出 Action，就需要使用 store.dispatch()：

```react
store.dispatch(action)
```

store.dispatch 接受一个 Action 对象作为参数，将这个 Action 发送出去。

# Reducer

disptach 用于将 Action 传递给 Store，那么 Store 就需要根据这个 Action 更新内部的状态 State。新 State 的计算过程就是 Reducer。

Reducer 本质是一个函数，接收传递过来的 Action 与原本的 State 作为参数，返回一个新的状态 State：

```react
const reducer = (state, action) => {
    ...
    return new_state
}
```

由于第一次执行 Reducer 的时候并没有旧 State，那么此时我们需要对状态进行初始化（即默默认值）：

```react
const defaultState = 0
const reducer = (state = defaultState, action) => {
    if (action.type == 'action') {
        return action.payload
    } else {
        return state
    }
}
const state = reducer(0, {
    type: 'action',
    payload: 'this is a test'
})
```

实际应用中，Reducer 函数不需要手动调用，dispatch 方法会自动触发 Reducer 的自动执行。因此，Store 需要在一开始的时候就知道 Reducer 是谁，而我们只需要在 createStore 的时候就将 Reducer 传入 store 即可：

```react
import { createStore } from 'redux';
const store = createStore(reducer);
```

因此，每当 store 执行 dispatch 的时候，都会将 Action 对象作为参数调用 Reducer。

# 纯函数

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

纯函数是函数式编程的概念，必须遵守以下一些约束。

+ 不得改写参数
+ 不能调用系统 I/O 的API
+ 不能调用 Date.now() 或者 Math.random() 等不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法：

```react
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

# subscribe

可以使用 subscribe 方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

```react
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
```

subscribe 方法返回一个函数，调用这个函数就可以解除监听：

```react
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```

# 实例：加减器

src/index.js

```react
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from "./Component/Store/store";

const render = () => ReactDOM.render(<App/>, document.getElementById('root'));
render()
store.subscribe(render)
```

src/App.js

```react
import React, {Component} from "react";
import Counter from "./Component/Counter";
import { store } from "./Component/Store/store";

export default class App extends Component {
    add = () => {
        store.dispatch({
            type: 'add'
        })
    }

    sub = () => {
        store.dispatch({
            type: 'sub'
        })
    }

    render() {
        return (
            <Counter value={store.getState()} add={this.add} sub={this.sub}/>
        );
    }
}
```

src/Component/Counter/index.js

```react
import React, { Component } from "react"

export  default class Counter extends Component {
    render() {
        const { value, add, sub } = this.props
        return (
            <div>
                <button onClick={add}>
                    +
                </button>
                <div>
                    { value }
                </div>
                <button onClick={sub}>
                    -
                </button>
            </div>
        )
    }
}
```

src/Component/Reducer/reducer.js

```react
const defaultState = 1

export const reducer = (state = defaultState, action) => {
    console.log(state)
    if (action.type === 'add') {
        console.log('add', state + 1)
        return state + 1
    } else if (action.type === 'sub') {
        console.log('sub', state - 1)
        return state - 1
    } else {
        return state
    }
}
```

src/Component/Store/store.js

```react
import { createStore } from "redux"
import { reducer } from "../Reducer/reducer";

export const store = createStore(reducer)
```

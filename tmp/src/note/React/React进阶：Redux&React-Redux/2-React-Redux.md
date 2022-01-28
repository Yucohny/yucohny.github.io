# UI 组件

React-Redux 将所有组件分成两大类：UI 组件和容器组件。

UI 组件有以下几个特征。

+ 只负责 UI 的呈现，不带有任何业务逻辑
+ 没有状态（即不使用 state）
+ 所有数据都由参数 props 提供
+ 不使用任何 React-Redux 的 API

# 容器组件

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 React-Redux 的 API

React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

# connect()

connect 方法用于从 UI 组件中生成容器组件：

```react
import { connect } from 'react-redux'
const ContainerBox = connect()(Box)
```

上面的代码中，Box 是 UI 组件，connect 方法得到的 ContainerBox 就是对应的容器组件。

但是由于这个容器组件没有定义业务逻辑，上面这个容器组件毫无意义，只是 UI 组件的一个简单的包装层而已。

如果需要定义业务逻辑，需要有下面两个信息：

1. 输入逻辑：外部的数据（即容器组件的 State），如何传递至内部（即 UI 组件的 props 属性）。
2. 输出逻辑：用户放出的动作（即 UI 组件的属性）如何变为 Action 对象， 从 UI 组件中传递出去。

结合上面这两点，可以将 connect 方法的完整 API 归结如下：

```react
import { connect } from 'react-redux'
const ContainerBox = connect(
	mapStateToProps,
    mapPropsToAction
)(Box)
```

# mapStateToProps()

mapStateToProps 方法用于将容器组件的 state 映射到 UI 组件的 props。因此，该方法应该返回一个对象，里面的每一个键值对都是一个映射。

如下面的例子：

```react
const mapStateToProps = (state) => {
    return {
        value: calcValue(state.value, state.type)
    }
}
```

上面的代码中，mapStateToProps 是一个函数，接收 state 作为参数，然后返回一个对象。这个对象具有一个 value 属性，代表者对应 UI 组件的同名参数。

后面的 calcValue() 也是一个函数，接收原本的状态值 value 作为参数，返回一个计算结果。

如下：

```react
const calcValue = (value, type) => {
    if (type == 'add') {
        return value + 1
    } else if (type == 'sub') {
        return value - 1
    } else {
        return value
    }
}
```

mapStateToProps 会订阅 Store，每当 State 更新时，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

mapStateToProps 第一个对象是 state，可以接收第二个参数代表容器组件的 props 对象。

connect 方法可以省略 mapStateToProps 参数，如果这样，UI 组件将不会订阅 Store，即 Store 的更新不会引起 UI 组件的重新渲染。

# mapPropsToAction()

mapPropsToAction 是 connect 函数的第二个参数，用来建立 UI 组件的参数到 store.dispatch 方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
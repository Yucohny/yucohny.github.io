# state

## 在构造器中初始化 state 

```jsx
class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHappy: true
        }
    }
    render() {
        const {isHappy} = this.state
        return <h2>I’m {isHappy ? 'happy' : 'sad'} today.</h2>
    }
}
// 渲染组件
ReactDOM.render(<Weather/>, document.getElementById('test'))
```

## setState() 

状态 state 不可直接更改，应该使用内置 API ， setState() 进行更新，且此更新属于合并性质，不是直接替换。

```jsx
class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHappy: true
        }
        this.changeMood = this.changeMood.bind(this)
    }
    render() {
        const {isHappy} = this.state
        return <h2 onClick={this.changeMood}>I’m {isHappy ? 'happy' : 'sad'} today.</h2>
    }
    changeMood() {
        const {isHappy} = this.state
        this.setState({
            isHappy: !isHappy
        })
    }
}
ReactDOM.render(<Weather/>, document.getElementById('test'))
```

由于箭头函数 ()=>{} 中的 this 是没有指向的，会自动指向箭头函数外层的 this ，故我们可以将上面的代码简化如下：

```jsx
class Weather extends React.Component {
    state = {
        isHappy: true
    }
    render() {
        const {isHappy} = this.state
        return <h2 onClick={this.changeMood}>I’m {isHappy ? 'happy' : 'sad'} today.</h2>
    }
    changeMood = () => {
        const {isHappy} = this.state
        this.setState({
            isHappy: !isHappy
        })
    }
}
ReactDOM.render(<Weather/>, document.getElementById('test'))
```

由于这种书写方式更加简洁明了，因此常用这一种书写方式。



#  props 

> 注意： props 是只读的，不可修改

## 基本使用

在渲染组件时， react 会自动把标签内的属性以对象的形式传到组件属性 props 中：

```jsx
class Info extends React.Component {
    render() {
        const {name, age, sex} = this.props
        return (
            <ul>
                <li>{name}</li>
                <li>{age}</li>
                <li>{sex}</li>
            </ul>
        )
    }
}
ReactDOM.render(<Info name="小红" age="18" sex="女"/>, document.getElementById('test1'))
ReactDOM.render(<Info name="小蓝" age="18" sex="男"/>, document.getElementById('test2'))
```

## 利用展开运算符简写

需要注意的是，展开运算符并不能直接展开对象的可遍历属性，此处可以如此书写是因为经过了 babel 与 react 编译后得到的语法糖：

```jsx
class Info extends React.Component {
    render() {
        const {name, age, sex} = this.props
        return (
            <ul>
                <li>{name}</li>
                <li>{age}</li>
                <li>{sex}</li>
            </ul>
        )
    }
}
let obj1 = {name: "小红", age: "18", sex: "女"}
let obj2 = {name: "小蓝", age: "18", sex: "男"}
ReactDOM.render(<Info {...obj1}/>, document.getElementById('test1'))
ReactDOM.render(<Info {...obj2}/>, document.getElementById('test2'))
```

## 对 props 属性进行限制

在对组件标签属性进行限制，首先需要引入 prop-types.js 包，如下：

```jsx
import PropTypes from 'prop-types'
```

随后在组件属性 propTypes 与 defaultProps 中对各项属性进行限制

### 限制属性数据类型

```jsx
Demo.propTypes = {
    name: PropTypes.string
}
```

> 注意：当限制属性为某个数据类型时，必须要将该数据类型首字母小写，如上；而如果限制属性为函数，应该书写为 func 

### 限制属性必要性

```jsx
Demo.propTypes = {
    name: PropTypes.isRequired
}
```

### 限制属性初始值

```jsx
Demo.defaultProps = {
    name: '你没有名字'
}
```

### 限制单个子元素

可以通过 PropTypes.element 来确保传递给组件的 children 中只包含一个元素。

```jsx
MyComponent.propTypes = {
    children: PropTypes.element.isRequired
}
```



### 简写方式

我们可以将 propTypes 与 defaultProps 属性放入组件类中定义，并且声明为 static 属性，这样就可以避免在组件类的外部单独进行限制。

## 构造器中的 props 

在 React 中，构造函数仅用于以下两种情况：

+ 通过给 this.state 赋值对象来初始化内部 state 
+ 为事件处理函数绑定实例。

在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前调用 super(props) 。否则， this.props 在构造函数中可能会出现未定义的 bug 。

构造器是否接受 props ，是否传递给 super ，取决于是否希望在构造器中通过 this 访问 props 

## 函数式组件中的 props 

函数中接受的参数 props 即为标签内部属性。

```jsx
function Demo(props) {
    console.log(props)
    return (
        <li>{props.name}</li>
        <li>{props.age}</li>
    )
}
```

## 子元素

包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 props.children 传递给外层组件。

如下面的这个例子：

```jsx
<MyComponent>Hello world!</MyComponent>
```

此时 props.children 就只是 Hello world! 字符串。

# Refs

## 使用 Refs 的场景

官方文档中，提出了下面几种场景：

1. 管理焦点，文本选择或媒体播放。
2. 触发强制动画。
3. 集成第三方 DOM 库。

注意：

1. 避免使用 refs 来做任何可以通过声明式实现来完成的事情。

2. 勿过度使用 Refs。

其中 ref 属性的值作为 key ，当前标签的所有信息作为 value 放入对象 refs 中。

## 字符串形式的 ref 

直接将 ref 属性设置为字符串即可，但是这种方式已经用得很少了，甚至已经是官方**不推荐**的使用方法。

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div ref="div">Test</div>
        )
    }
}
ReactDOM.render(<Demo/>, document.getElementById('test'))
```

## 回调函数形式的 ref 

在回调函数中进行赋值

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div ref={curNode => this.div = curNode}>Test</div>
        )
    }
}
ReactDOM.render(<Demo/>, document.getElementById('test'))
```

## createRef 形式的 ref 

我们可以通过 React.createRef() 创建 Refs，并通过 ref 属性附加到 React 元素：

```jsx
class Demo extends React.Component {
    myRef = React.createRef()
    render() {
        return (
        	<div ref={this.myRef}/>
        )
    }
}
```

当创建的 Ref 被传递给 render 中渲染的元素时，我们可以在 Ref 的 current 属性中访问该元素：

```jsx
const node = this.myRef.current
```

要注意的时，Ref 的值根据节点的类型而有所不同：

+ 当 ref 属性用于 HTML 元素时，createRef() 创建的 Ref 将会接收底层 DOM 元素作为其 current 属性。

> React 会在组件挂载时给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值。ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新。

+ 当 ref 属性用于自定义 class 组件时，Ref 接收组件的挂载实例作为其 current 属性。
+ 我们不能在函数组件上使用 ref 属性，因为它们没有实例。

> 严格来说，应该是默认情况下，不能再函数组件上使用 ref 属性。
>
> 如果要在函数组件中使用 ref，你可以使用 forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件。
>
> 不管怎样，你可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件。
